import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermissions;
import java.security.PublicKey;
import java.security.Signature;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;
import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

/**
 * StudyPiece's Java runner (Cloud Run). The app posts a learner's source files; this
 * compiles them in-process (fast, the compiler stays warm) and runs the result in a
 * separate, sandboxed JVM: a security policy with no network, no process launching and
 * file access only inside its own run folder, a time limit, a memory limit and an
 * unprivileged user. Swing programs run on a virtual display and come back as pictures.
 *
 * POST /run  { files: { "Main.java": "..." }, main: "Main", mode: "run" | "test" | "swing", stdin: "..." }
 *   → { compiled, log, out, exit, timedOut, ms, report?, images? }
 * GET /health → ok   (the app calls this early so a cold start happens while the learner reads)
 *
 * Callers must send a Firebase ID token for the StudyPiece project (Authorization: Bearer),
 * or the X-Runner-Key set in the RUNNER_KEY environment variable.
 */
public class Runner {
  static final String PROJECT = env("FIREBASE_PROJECT", "quick-cbt");
  static final String KEY = env("RUNNER_KEY", "");
  // LOCAL=1 runs without the sandbox user and policy, for trying the runner on a dev machine.
  static final boolean LOCAL = env("LOCAL", "").equals("1");
  static final Path TMP = Path.of(env("TMP_ROOT", "/tmp"));
  static final Pattern FILE = Pattern.compile("[A-Za-z_][A-Za-z0-9_]{0,60}\\.java");
  static final Pattern CLASS = Pattern.compile("[A-Za-z_][A-Za-z0-9_]{0,60}");
  static final int MAX_SOURCE = 100_000;
  static final int MAX_OUTPUT = 20_000;
  static final Semaphore SLOTS = new Semaphore(Integer.parseInt(env("SLOTS", "3")));
  static final JavaCompiler JAVAC = ToolProvider.getSystemJavaCompiler();
  static final Map<String, long[]> RATE = new ConcurrentHashMap<>();
  static final HttpClient HTTP = HttpClient.newHttpClient();
  static volatile Map<String, PublicKey> certs = Map.of();
  static volatile long certsUntil = 0;

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(Integer.parseInt(env("PORT", "8080"))), 64);
    server.setExecutor(Executors.newFixedThreadPool(8));
    server.createContext("/health", ex -> reply(ex, 200, "ok", "text/plain"));
    server.createContext("/run", Runner::handle);
    server.start();
    System.out.println("Java runner listening");
  }

  static String env(String k, String d) {
    String v = System.getenv(k);
    return v == null || v.isEmpty() ? d : v;
  }

  // ---------------------------------------------------------------- HTTP

  static void handle(HttpExchange ex) throws IOException {
    try {
      cors(ex);
      if (ex.getRequestMethod().equals("OPTIONS")) { reply(ex, 204, "", "text/plain"); return; }
      if (!ex.getRequestMethod().equals("POST")) { reply(ex, 405, err("POST only"), "application/json"); return; }
      String who = caller(ex);
      if (who == null) { reply(ex, 401, err("Please sign in to run code."), "application/json"); return; }
      if (!allow(who)) { reply(ex, 429, err("Too many runs in a minute. Take a breath and try again."), "application/json"); return; }
      byte[] body = ex.getRequestBody().readNBytes(MAX_SOURCE + 20_000);
      Object parsed = Json.parse(new String(body, StandardCharsets.UTF_8));
      if (!(parsed instanceof Map)) { reply(ex, 400, err("Bad request"), "application/json"); return; }
      @SuppressWarnings("unchecked") Map<String, Object> req = (Map<String, Object>) parsed;
      if (!SLOTS.tryAcquire(25, TimeUnit.SECONDS)) { reply(ex, 503, err("The Java runner is busy. Try again in a moment."), "application/json"); return; }
      try {
        reply(ex, 200, run(req), "application/json");
      } finally {
        SLOTS.release();
      }
    } catch (BadRequest e) {
      reply(ex, 400, err(e.getMessage()), "application/json");
    } catch (Exception e) {
      e.printStackTrace();
      reply(ex, 500, err("The runner hit a problem: " + e.getClass().getSimpleName()), "application/json");
    }
  }

  static void cors(HttpExchange ex) {
    String origin = ex.getRequestHeaders().getFirst("Origin");
    if (origin != null && (origin.equals("https://studypiece.web.app") || origin.equals("https://studypiece.firebaseapp.com")
        || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:"))) {
      ex.getResponseHeaders().set("Access-Control-Allow-Origin", origin);
      ex.getResponseHeaders().set("Vary", "Origin");
      ex.getResponseHeaders().set("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Runner-Key");
      ex.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
      ex.getResponseHeaders().set("Access-Control-Max-Age", "86400");
    }
  }

  static void reply(HttpExchange ex, int code, String body, String type) throws IOException {
    byte[] b = body.getBytes(StandardCharsets.UTF_8);
    ex.getResponseHeaders().set("Content-Type", type + "; charset=utf-8");
    ex.getResponseHeaders().set("Cache-Control", "no-store");
    ex.sendResponseHeaders(code, code == 204 ? -1 : b.length);
    if (code != 204) try (OutputStream o = ex.getResponseBody()) { o.write(b); }
    ex.close();
  }

  static String err(String msg) {
    return "{\"error\":" + Json.str(msg) + "}";
  }

  static class BadRequest extends RuntimeException {
    private static final long serialVersionUID = 1L;
    BadRequest(String m) { super(m); }
  }

  // ---------------------------------------------------------------- who may run

  static String caller(HttpExchange ex) {
    String key = ex.getRequestHeaders().getFirst("X-Runner-Key");
    if (!KEY.isEmpty() && KEY.equals(key)) return "key";
    String auth = ex.getRequestHeaders().getFirst("Authorization");
    if (auth == null || !auth.startsWith("Bearer ")) return null;
    try {
      return verifyFirebase(auth.substring(7).trim());
    } catch (Exception e) {
      return null;
    }
  }

  /** Checks a Firebase ID token (RS256, signed by Google) and returns the user's uid. */
  static String verifyFirebase(String token) throws Exception {
    String[] p = token.split("\\.");
    if (p.length != 3) return null;
    Base64.Decoder b64 = Base64.getUrlDecoder();
    @SuppressWarnings("unchecked") Map<String, Object> head = (Map<String, Object>) Json.parse(new String(b64.decode(p[0]), StandardCharsets.UTF_8));
    @SuppressWarnings("unchecked") Map<String, Object> claims = (Map<String, Object>) Json.parse(new String(b64.decode(p[1]), StandardCharsets.UTF_8));
    if (!"RS256".equals(head.get("alg"))) return null;
    PublicKey keyFor = keys().get(String.valueOf(head.get("kid")));
    if (keyFor == null) return null;
    Signature sig = Signature.getInstance("SHA256withRSA");
    sig.initVerify(keyFor);
    sig.update((p[0] + "." + p[1]).getBytes(StandardCharsets.US_ASCII));
    if (!sig.verify(b64.decode(p[2]))) return null;
    long now = System.currentTimeMillis() / 1000;
    if (!PROJECT.equals(claims.get("aud"))) return null;
    if (!("https://securetoken.google.com/" + PROJECT).equals(claims.get("iss"))) return null;
    if (((Number) claims.get("exp")).longValue() < now - 30) return null;
    Object sub = claims.get("sub");
    return sub instanceof String s && !s.isEmpty() ? s : null;
  }

  static Map<String, PublicKey> keys() throws Exception {
    if (System.currentTimeMillis() < certsUntil) return certs;
    HttpResponse<String> r = HTTP.send(HttpRequest.newBuilder(URI.create(
        "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com")).build(), HttpResponse.BodyHandlers.ofString());
    @SuppressWarnings("unchecked") Map<String, Object> pem = (Map<String, Object>) Json.parse(r.body());
    CertificateFactory cf = CertificateFactory.getInstance("X.509");
    Map<String, PublicKey> next = new HashMap<>();
    for (Map.Entry<String, Object> e : pem.entrySet()) {
      X509Certificate c = (X509Certificate) cf.generateCertificate(new ByteArrayInputStream(((String) e.getValue()).getBytes(StandardCharsets.US_ASCII)));
      next.put(e.getKey(), c.getPublicKey());
    }
    certs = next;
    certsUntil = System.currentTimeMillis() + 3_600_000;
    return next;
  }

  /** At most 30 runs a minute per learner (per instance). */
  static boolean allow(String who) {
    long now = System.currentTimeMillis();
    long[] w = RATE.computeIfAbsent(who, k -> new long[] { now, 0 });
    synchronized (w) {
      if (now - w[0] > 60_000) { w[0] = now; w[1] = 0; }
      return ++w[1] <= 30;
    }
  }

  // ---------------------------------------------------------------- compile and run

  static String run(Map<String, Object> req) throws Exception {
    Object filesObj = req.get("files");
    if (!(filesObj instanceof Map<?, ?> files) || files.isEmpty() || files.size() > 12) throw new BadRequest("Send 1 to 12 source files.");
    String mode = String.valueOf(req.getOrDefault("mode", "run"));
    Object mainObj = req.get("main");
    String main = mainObj instanceof String s ? s : null;
    if (main != null && !CLASS.matcher(main).matches()) throw new BadRequest("Bad main class name.");
    String stdin = req.get("stdin") instanceof String s ? s : "";

    long t0 = System.nanoTime();
    Path dir = Files.createTempDirectory(TMP, "run-");
    try {
      int total = 0;
      List<String> args = new ArrayList<>(List.of("-d", dir.toString(), "-proc:none", "-nowarn", "-encoding", "UTF-8", "-g", "-Xmaxerrs", "20"));
      for (Map.Entry<?, ?> e : files.entrySet()) {
        String name = String.valueOf(e.getKey());
        String src = String.valueOf(e.getValue());
        if (!FILE.matcher(name).matches()) throw new BadRequest("Bad file name: " + name);
        total += src.length();
        if (total > MAX_SOURCE) throw new BadRequest("That's a lot of code! Keep it under 100 KB.");
        Path f = dir.resolve(name);
        Files.writeString(f, src);
        args.add(f.toString());
      }
      ByteArrayOutputStream javacLog = new ByteArrayOutputStream();
      int code = JAVAC.run(null, javacLog, javacLog, args.toArray(String[]::new));
      String log = javacLog.toString(StandardCharsets.UTF_8);
      StringBuilder out = new StringBuilder("{\"compiled\":").append(code == 0);
      out.append(",\"log\":").append(Json.str(log.replace(dir.toString() + "/", "")));
      if (code == 0 && main != null) {
        if (!LOCAL) {
          try (var walk = Files.walk(dir)) {
            walk.forEach(p -> { try { Files.setPosixFilePermissions(p, PosixFilePermissions.fromString(Files.isDirectory(p) ? "rwxrwxrwx" : "rw-rw-rw-")); } catch (IOException ignored) { } });
          }
        }
        Child c = child(dir, main, mode, stdin);
        out.append(",\"out\":").append(Json.str(c.out)).append(",\"exit\":").append(c.exit).append(",\"timedOut\":").append(c.timedOut);
        if (mode.equals("test")) {
          Path report = dir.resolve("report.json");
          out.append(",\"report\":").append(Files.exists(report) ? Json.str(Files.readString(report)) : "null");
        }
        if (mode.equals("swing")) {
          out.append(",\"images\":[");
          for (int i = 0; i < 6; i++) {
            Path png = dir.resolve("shot" + i + ".png");
            if (!Files.exists(png)) break;
            out.append(i > 0 ? "," : "").append('"').append(Base64.getEncoder().encodeToString(Files.readAllBytes(png))).append('"');
          }
          out.append(']');
        }
      }
      out.append(",\"ms\":").append((System.nanoTime() - t0) / 1_000_000).append('}');
      return out.toString();
    } finally {
      try (var walk = Files.walk(dir)) {
        walk.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete());
      }
    }
  }

  record Child(String out, int exit, boolean timedOut) { }

  static Child child(Path dir, String main, String mode, String stdin) throws Exception {
    long limit = mode.equals("test") ? 25 : mode.equals("swing") ? 12 : 10;
    // ulimit: at most 20 MB per file (the disk here is memory, so a flood could kill the
    // whole instance) and a cap on threads, then drop to an unprivileged user.
    List<String> cmd = new ArrayList<>(LOCAL ? List.of("java") : List.of(
        "/bin/sh", "-c", "ulimit -f 40000; ulimit -u 400; exec \"$@\"", "sh", "/sbin/su-exec", "nobody", "java",
        "-Djava.security.manager", "-Djava.security.policy=/app/sandbox.policy", "-Drun.dir=" + dir));
    cmd.addAll(List.of(
        "-Xmx128m", "-Xss2m", "-XX:MaxMetaspaceSize=96m", "-XX:ReservedCodeCacheSize=32m",
        "-XX:+UseSerialGC", "-XX:TieredStopAtLevel=1", "-Xshare:auto", "-XX:MaxJavaStackTraceDepth=24",
        "-Djava.io.tmpdir=" + dir, "-Duser.home=" + dir, "-Dfile.encoding=UTF-8",
        "-Dawt.useSystemAAFontSettings=on", "-Dswing.aatext=true",
        "-cp", dir + java.io.File.pathSeparator + env("RUNNER_JAR", "/app/runner.jar")));
    if (mode.equals("swing")) cmd.addAll(List.of("Shot", dir.toString(), main));
    else if (mode.equals("test")) cmd.addAll(List.of(main, dir.resolve("report.json").toString()));
    else cmd.add(main);
    ProcessBuilder pb = new ProcessBuilder(cmd).directory(dir.toFile()).redirectErrorStream(true);
    Map<String, String> envs = pb.environment();
    envs.clear();
    envs.put("PATH", System.getenv("PATH"));
    if (LOCAL) envs.put("SystemRoot", env("SystemRoot", ""));
    envs.put("DISPLAY", ":99");
    envs.put("HOME", dir.toString());
    Process p = pb.start();
    try (OutputStream in = p.getOutputStream()) {
      in.write(stdin.getBytes(StandardCharsets.UTF_8));
    } catch (IOException ignored) { }
    ByteArrayOutputStream buf = new ByteArrayOutputStream();
    Thread reader = new Thread(() -> {
      try (InputStream is = p.getInputStream()) {
        byte[] b = new byte[8192];
        int n;
        while ((n = is.read(b)) > 0) {
          synchronized (buf) {
            if (buf.size() < MAX_OUTPUT) buf.write(b, 0, Math.min(n, MAX_OUTPUT - buf.size()));
          }
          if (buf.size() >= MAX_OUTPUT) p.destroyForcibly();
        }
      } catch (IOException ignored) { }
    });
    reader.start();
    boolean finished = p.waitFor(limit, TimeUnit.SECONDS);
    if (!finished) p.destroyForcibly().waitFor(2, TimeUnit.SECONDS);
    reader.join(1000);
    String raw;
    synchronized (buf) { raw = buf.toString(StandardCharsets.UTF_8); }
    StringBuilder text = new StringBuilder();
    for (String line : raw.split("\n", -1)) {
      if (line.startsWith("Fontconfig error:")
          || line.startsWith("WARNING: A command line option has enabled the Security Manager")
          || line.startsWith("WARNING: The Security Manager is deprecated")) continue;
      if (text.length() > 0) text.append('\n');
      text.append(line);
    }
    if (buf.size() >= MAX_OUTPUT) text.append("\n… output cut off at 20 KB.");
    return new Child(text.toString(), finished ? p.exitValue() : -1, !finished);
  }
}
