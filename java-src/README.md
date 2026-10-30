# In-browser Java

Live Swing windows ("Try it live") compile and run code on the learner's device with [CheerpJ](https://cheerpj.com)
(a JVM in WebAssembly, Community licence, loaded from the CheerpJ CDN). The app serves two jars
from `public/java/`:

- `javac.jar`: the JDK 8 compiler (`com.sun.tools.javac`, `com.sun.source`, `com.sun.tools.doclint`)
  taken from a JDK 8 `tools.jar` and trimmed to those packages (about 4.9 MB instead of 18 MB).
- `driver.jar`: `Driver.java` from this folder. One call compiles the learner's files and runs a
  class from them through a fresh class loader (see `src/features/learn/java/cheerpj.js`).

Rebuild the driver after editing it (needs any JDK and the JDK 8 `tools.jar` on the classpath):

```bash
javac --release 8 -cp path/to/tools.jar -d build java-src/Driver.java
jar cf public/java/driver.jar -C build Driver.class
```
