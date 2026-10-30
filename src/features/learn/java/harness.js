// Turns a screen's `tests` into a Java class that checks the learner's code, and reads
// back what it reports. Test kinds (all optional `label`, `hidden`):
//   { expr: 'Main.factorial(5)', expect: 120 }          value of an expression (tol for decimals)
//   { body: 'Counter a = new Counter(); return Counter.count;', expect: 1 }
//   { check: 'isAbstract(Shape.class)' }                 a boolean that must be true
//   { expr: 'new Account(-5)', throws: 'IllegalArgumentException' }
//   { main: 'Main', out: 'Hello\n55' }                   what main prints
//   { body: 'Main.stars(3); return null;', out: '***' }  what a call prints
//   { src: 'factorial\\s*\\(', min: 2 }                  a pattern in the source (no Java needed)
//   { src: '\\bfor\\b|\\bwhile\\b', absent: true }       a pattern that must NOT appear
// Each Java test runs on its own thread with a time limit, so one endless loop fails
// one test instead of freezing the page.

const HELPERS = String.raw`
  interface Body { Object run() throws Throwable; }
  static final PrintStream REAL = System.out;
  static final StringBuilder JSON = new StringBuilder("[");

  static String q(String s) {
    if (s == null) return "null";
    StringBuilder b = new StringBuilder("\"");
    for (char c : s.toCharArray()) {
      if (c == '"' || c == '\\') b.append('\\').append(c);
      else if (c == '\n') b.append("\\n");
      else if (c == '\r') b.append("\\r");
      else if (c == '\t') b.append("\\t");
      else if (c < 32) b.append(String.format("\\u%04x", (int) c));
      else b.append(c);
    }
    return b.append('"').toString();
  }

  static String show(Object o) {
    if (o == null) return "null";
    if (o.getClass().isArray()) {
      StringBuilder b = new StringBuilder("[");
      for (int i = 0; i < Array.getLength(o); i++) b.append(i > 0 ? ", " : "").append(show(Array.get(o, i)));
      return b.append("]").toString();
    }
    return String.valueOf(o);
  }

  static void t(int i, final Body body) {
    final Object[] box = new Object[2];
    ByteArrayOutputStream buf = new ByteArrayOutputStream();
    Thread th = new Thread(new Runnable() {
      public void run() {
        try { box[0] = body.run(); } catch (Throwable e) { box[1] = e; }
      }
    });
    th.setDaemon(true);
    System.setOut(new PrintStream(buf, true));
    th.start();
    try { th.join(4000); } catch (InterruptedException e) { }
    System.setOut(REAL);
    String kind, v = "", x = "";
    if (th.isAlive()) kind = "T";
    else if (box[1] != null) {
      Throwable e = (Throwable) box[1];
      if (e instanceof InvocationTargetException && e.getCause() != null) e = e.getCause();
      kind = "E"; x = e.getClass().getSimpleName(); v = String.valueOf(e.getMessage());
    } else { kind = "V"; v = show(box[0]); }
    if (JSON.length() > 1) JSON.append(',');
    JSON.append("{\"i\":").append(i).append(",\"k\":\"").append(kind).append("\",\"v\":").append(q(v))
        .append(",\"x\":").append(q(x)).append(",\"out\":").append(q(buf.toString())).append('}');
  }

  static Object runMain(Class<?> c) throws Throwable {
    c.getMethod("main", String[].class).invoke(null, (Object) new String[0]);
    return null;
  }

  // Structure checks, for questions about how a class is built rather than what it returns.
  static boolean isAbstract(Class<?> c) { return Modifier.isAbstract(c.getModifiers()) && !c.isInterface(); }
  static boolean isInterface(Class<?> c) { return c.isInterface(); }
  static boolean isFinal(Class<?> c) { return Modifier.isFinal(c.getModifiers()); }
  static boolean extendsClass(Class<?> c, Class<?> p) { return c.getSuperclass() == p; }
  static boolean implementsIface(Class<?> c, Class<?> i) { return Arrays.asList(c.getInterfaces()).contains(i); }
  static boolean mods(int m, String want) {
    for (String w : want.trim().split("\\s+")) {
      if (w.equals("private") && !Modifier.isPrivate(m)) return false;
      if (w.equals("public") && !Modifier.isPublic(m)) return false;
      if (w.equals("protected") && !Modifier.isProtected(m)) return false;
      if (w.equals("static") && !Modifier.isStatic(m)) return false;
      if (w.equals("final") && !Modifier.isFinal(m)) return false;
      if (w.equals("abstract") && !Modifier.isAbstract(m)) return false;
    }
    return true;
  }
  static boolean fieldHas(Class<?> c, String f, String want) {
    try { return mods(c.getDeclaredField(f).getModifiers(), want); } catch (NoSuchFieldException e) { return false; }
  }
  static boolean methodHas(Class<?> c, String name, String want) {
    for (Method m : c.getDeclaredMethods()) if (m.getName().equals(name) && mods(m.getModifiers(), want)) return true;
    return false;
  }
  static boolean declares(Class<?> c, String name) {
    for (Method m : c.getDeclaredMethods()) if (m.getName().equals(name)) return true;
    return false;
  }
`;

const javaTests = (tests) => tests.map((t, i) => ({ t, i })).filter(({ t }) => !t.src);

function bodyOf(t) {
  if (t.main) return `return runMain(${t.main}.class);`;
  if (t.check) return `return (Object) (${t.check});`;
  if (t.expr) return `return (Object) (${t.expr});`;
  return t.body;
}

/** Java source for the test class, plus which line each test sits on (for error messages). */
export function buildTests(tests) {
  const head = ['import java.util.*;', 'import java.io.*;', 'import java.lang.reflect.*;', '', 'public class __Tests {'];
  const lineOf = {};
  const calls = javaTests(tests).map(({ t, i }, k) => {
    lineOf[head.length + 2 + k] = i;
    return `    t(${i}, new Body() { public Object run() throws Throwable { ${bodyOf(t)} } });`;
  });
  const src = [
    ...head,
    '  public static void main(String[] args) throws Exception {',
    ...calls,
    '    JSON.append(\']\');',
    '    Writer w = new OutputStreamWriter(new FileOutputStream(args[0]), "UTF-8");',
    '    w.write(JSON.toString());',
    '    w.close();',
    '  }',
    HELPERS,
    '}',
  ].join('\n');
  return { src, lineOf };
}

const norm = (s) => String(s ?? '').replace(/\r/g, '').split('\n').map((l) => l.trimEnd()).join('\n').trim();

export function javaValue(v) {
  if (Array.isArray(v)) return `[${v.map(javaValue).join(', ')}]`;
  return String(v);
}

function sameValue(t, got) {
  const want = t.expect;
  if (typeof want === 'number') {
    const g = Number(got);
    return Number.isFinite(g) && Math.abs(g - want) <= (t.tol ?? 1e-9);
  }
  return got === javaValue(want);
}

/** Pass/fail for one test from its Java report row (or the source, for `src` tests). */
export function judge(t, row, source) {
  if (t.src) {
    const n = (source.match(new RegExp(t.src, 'g')) || []).length;
    const ok = t.absent ? n === 0 : n >= (t.min ?? 1);
    return { ok, msg: ok ? '' : t.fail || (t.absent ? 'Your code still uses something this task rules out.' : 'Your code is missing a required piece.') };
  }
  if (!row) return { ok: false, msg: 'This check did not run.' };
  if (row.k === 'T') return { ok: false, msg: 'Took too long. Is there a loop or recursion that never stops?' };
  if (t.throws) {
    if (row.k === 'E' && row.x === t.throws) return { ok: true };
    return { ok: false, msg: row.k === 'E' ? `Threw ${row.x}, expected ${t.throws}.` : `Expected it to throw ${t.throws}, but it didn’t.` };
  }
  if (row.k === 'E') return { ok: false, msg: `Crashed with ${row.x}${row.v && row.v !== 'null' ? `: ${row.v}` : ''}.` };
  if (t.check) return row.v === 'true' ? { ok: true } : { ok: false, msg: t.fail || 'Not yet.' };
  if ('out' in t && norm(row.out) !== norm(t.out)) {
    return { ok: false, msg: `Printed:\n${norm(row.out) || '(nothing)'}\nExpected:\n${norm(t.out)}` };
  }
  if ('expect' in t && !sameValue(t, row.v)) return { ok: false, msg: `Expected ${javaValue(t.expect)}, got ${row.v}.` };
  return { ok: true };
}

/** javac output → [{ file, line, msg, code, caret, symbol, location }]. */
export function parseLog(log) {
  const lines = String(log || '').replace(/\r/g, '').split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(.+?\.java):(\d+): (error|warning): (.*)$/);
    if (!m) continue;
    const e = { file: m[1].split('/').pop(), line: Number(m[2]), kind: m[3], msg: m[4], code: lines[i + 1] ?? '', caret: lines[i + 2] ?? '' };
    for (let j = i + 3; j < i + 6 && j < lines.length; j++) {
      const s = lines[j].match(/^\s+symbol:\s+(.*)$/);
      const l = lines[j].match(/^\s+location:\s+(.*)$/);
      if (s) e.symbol = s[1];
      if (l) e.location = l[1];
    }
    if (e.kind === 'error') out.push(e);
  }
  return out;
}

// `public class Shape` must live in Shape.java; anything else goes in Main.java.
export function fileNameFor(source) {
  const m = source.match(/public\s+(?:final\s+|abstract\s+)*(?:class|interface|enum)\s+([A-Za-z_]\w*)/);
  return `${m ? m[1] : 'Main'}.java`;
}

export function mainClassOf(source) {
  const re = /(?:class|interface|enum)\s+([A-Za-z_]\w*)/g;
  const decls = [...source.matchAll(re)].map((m) => ({ name: m[1], at: m.index }));
  const mainAt = source.search(/static\s+void\s+main\s*\(/);
  if (mainAt < 0) return null;
  const owner = decls.filter((d) => d.at < mainAt).pop();
  return owner?.name ?? null;
}
