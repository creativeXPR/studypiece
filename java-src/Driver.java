import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * StudyPiece's Java runner, used in the browser through CheerpJ (see runner.js).
 * One call compiles the learner's files and, if that worked, runs a class from them:
 *
 *   Driver <outDir> <mainClass or -> <arg or -> <source files...>
 *
 * The compiler log goes to outDir/javac.txt. Every run loads its classes through a
 * fresh class loader, so code from an earlier run can never answer for a later one.
 */
public class Driver {
  public static void main(String[] args) throws Exception {
    File dir = new File(args[0]);
    dir.mkdirs();
    String main = args[1];
    String arg = args[2];
    String[] javac = new String[args.length - 3 + 6];
    javac[0] = "-d"; javac[1] = dir.getPath(); javac[2] = "-nowarn";
    javac[3] = "-encoding"; javac[4] = "UTF-8"; javac[5] = "-g";
    System.arraycopy(args, 3, javac, 6, args.length - 3);

    StringWriter log = new StringWriter();
    int code = com.sun.tools.javac.Main.compile(javac, new PrintWriter(log, true));
    write(new File(dir, "javac.txt"), code + "\n" + log);
    if (code != 0 || main.equals("-")) return;

    URLClassLoader loader = new URLClassLoader(new URL[] { dir.toURI().toURL() }, Driver.class.getClassLoader());
    Thread.currentThread().setContextClassLoader(loader);
    Method m = loader.loadClass(main).getMethod("main", String[].class);
    try {
      m.invoke(null, (Object) (arg.equals("-") ? new String[0] : new String[] { arg }));
    } catch (InvocationTargetException e) {
      Throwable t = e.getCause();
      System.err.println("Exception in thread \"main\" " + t);
      for (StackTraceElement s : t.getStackTrace()) {
        if (s.getClassName().startsWith("sun.reflect") || s.getClassName().startsWith("java.lang.reflect")) break;
        System.err.println("\tat " + s);
      }
    }
  }

  static void write(File f, String text) throws Exception {
    Writer w = new OutputStreamWriter(new FileOutputStream(f), "UTF-8");
    w.write(text);
    w.close();
  }
}
