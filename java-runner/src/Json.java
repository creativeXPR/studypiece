import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Just enough JSON for the runner: parse objects, arrays, strings, numbers, booleans, null. */
final class Json {
  private final String s;
  private int i;

  private Json(String s) { this.s = s; }

  static Object parse(String text) {
    Json j = new Json(text);
    j.ws();
    Object v = j.value();
    j.ws();
    if (j.i != text.length()) throw new Runner.BadRequest("Bad JSON");
    return v;
  }

  static String str(String v) {
    if (v == null) return "null";
    StringBuilder b = new StringBuilder(v.length() + 16).append('"');
    for (int k = 0; k < v.length(); k++) {
      char c = v.charAt(k);
      switch (c) {
        case '"' -> b.append("\\\"");
        case '\\' -> b.append("\\\\");
        case '\n' -> b.append("\\n");
        case '\r' -> b.append("\\r");
        case '\t' -> b.append("\\t");
        default -> {
          if (c < 0x20 || c == 0x2028 || c == 0x2029) b.append(String.format("\\u%04x", (int) c));
          else b.append(c);
        }
      }
    }
    return b.append('"').toString();
  }

  private void ws() {
    while (i < s.length() && Character.isWhitespace(s.charAt(i))) i++;
  }

  private Object value() {
    if (i >= s.length()) throw new Runner.BadRequest("Bad JSON");
    char c = s.charAt(i);
    if (c == '{') return object();
    if (c == '[') return array();
    if (c == '"') return string();
    if (s.startsWith("true", i)) { i += 4; return Boolean.TRUE; }
    if (s.startsWith("false", i)) { i += 5; return Boolean.FALSE; }
    if (s.startsWith("null", i)) { i += 4; return null; }
    return number();
  }

  private Map<String, Object> object() {
    Map<String, Object> m = new LinkedHashMap<>();
    i++;
    ws();
    if (peek('}')) { i++; return m; }
    while (true) {
      ws();
      String k = string();
      ws();
      expect(':');
      ws();
      m.put(k, value());
      ws();
      if (peek(',')) { i++; continue; }
      expect('}');
      return m;
    }
  }

  private List<Object> array() {
    List<Object> a = new ArrayList<>();
    i++;
    ws();
    if (peek(']')) { i++; return a; }
    while (true) {
      ws();
      a.add(value());
      ws();
      if (peek(',')) { i++; continue; }
      expect(']');
      return a;
    }
  }

  private String string() {
    expect('"');
    StringBuilder b = new StringBuilder();
    while (i < s.length()) {
      char c = s.charAt(i++);
      if (c == '"') return b.toString();
      if (c != '\\') { b.append(c); continue; }
      char e = s.charAt(i++);
      switch (e) {
        case 'n' -> b.append('\n');
        case 't' -> b.append('\t');
        case 'r' -> b.append('\r');
        case 'b' -> b.append('\b');
        case 'f' -> b.append('\f');
        case 'u' -> { b.append((char) Integer.parseInt(s.substring(i, i + 4), 16)); i += 4; }
        default -> b.append(e);
      }
    }
    throw new Runner.BadRequest("Bad JSON");
  }

  private Number number() {
    int start = i;
    while (i < s.length() && "+-0123456789.eE".indexOf(s.charAt(i)) >= 0) i++;
    if (start == i) throw new Runner.BadRequest("Bad JSON");
    String n = s.substring(start, i);
    return n.contains(".") || n.contains("e") || n.contains("E") ? (Number) Double.parseDouble(n) : (Number) Long.parseLong(n);
  }

  private boolean peek(char c) { return i < s.length() && s.charAt(i) == c; }

  private void expect(char c) {
    if (!peek(c)) throw new Runner.BadRequest("Bad JSON");
    i++;
  }
}
