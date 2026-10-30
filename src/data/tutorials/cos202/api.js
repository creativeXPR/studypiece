// COS 202 · Using the Java API · Lesson 1: packages, String methods and wrapper classes.

export default {
  id: 'api',
  title: 'Packages, Strings and wrappers',
  covers: 'Packages and import, using the API, String methods, equals vs ==, wrapper classes, parsing numbers',
  minutes: 13,
  sections: [
    {
      name: 'Standing on the API',
      terms: [
        ['Package', 'A named group of related classes, like a folder: `java.util`, `javax.swing`.'],
        ['import', 'Lets you use a class by its short name: `import java.util.ArrayList;`. `java.lang` (String, Math) is always available.'],
        ['API', 'The ready-made classes Java ships with, and the rules for using them.'],
        ['equals vs ==', '`==` asks “the same object?”. `equals` asks “the same contents?”. Compare strings with `equals`.'],
        ['Wrapper class', 'An object version of a primitive: `Integer`, `Double`, `Boolean`, `Character`. Java converts between them automatically.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Using the Java API · Lesson 1',
          title: 'Don’t write what Java already has',
          body: 'The ==API== holds thousands of classes, grouped into ==packages==. To use one, import it at the very top of your file:\n\n`import java.util.ArrayList;` one class\n\n`import javax.swing.*;` a whole package\n\nYou can organise your own code the same way, with `package school.records;` as the file’s first line.\n\nOnly `java.lang` needs no import, which is why `String` and `Math` just work.',
          cta: 'Strings next',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'String methods',
          body: 'Strings are **immutable**: their methods return a new string and never change the original.',
          code: `public static void main(String[] args) {
    String s = "Java Code";
    System.out.println(s.length());
    System.out.println(s.charAt(1));
    System.out.println(s.substring(0, 4));
    System.out.println(s.indexOf("Code"));
    s.toUpperCase();
    System.out.println(s);
}`,
          options: [
            { out: '9\na\nJava\n5\nJava Code', correct: true, why: 'Index 1 is the second letter, `substring(0, 4)` stops **before** index 4, and `toUpperCase()` returned a new string that nobody kept.' },
            { out: '9\nJ\nJava\n5\nJava Code', why: 'Indexes start at 0, so `charAt(1)` is `a`.' },
            { out: '9\na\nJava\n5\nJAVA CODE', why: 'Strings never change. It would need `s = s.toUpperCase();`.' },
            { out: '9\na\nJava \n5\nJava Code', why: '`substring(0, 4)` covers indexes 0 to 3: no space.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'equals or ==?',
          code: `public static void main(String[] args) {
    String a = new String("Cash");
    String b = new String("Cash");
    System.out.println(a == b);
    System.out.println(a.equals(b));
    System.out.println("cash".equalsIgnoreCase(a));
}`,
          options: [
            { out: 'false\ntrue\ntrue', correct: true, why: 'Two separate objects with equal contents: `==` is false, `equals` is true.' },
            { out: 'true\ntrue\ntrue', why: '`new` always builds a separate object, so `==` is false.' },
            { out: 'false\nfalse\ntrue', why: '`equals` compares the characters, and they match.' },
            { out: 'true\nfalse\nfalse', why: 'It’s the other way round.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Reading a number',
          body: 'This should read `text` as a number and add 5, and print `Yes` when `code` is `"COS"`.',
          code: `import java.util.ArrayList

public class Main {
    public static void main(String[] args) {
        String text = "37";
        int n = text;
        System.out.println(n + 5);
        String code = new String("COS");
        if (code == "COS") {
            System.out.println("Yes");
        }
        System.out.println(code.length);
    }
}`,
          errors: [
            { line: 1, kind: 'syntax', fixes: ['import java.util.ArrayList;', 'import java.util.ArrayList.*', 'include java.util.ArrayList;'], why: 'An import is a statement, so it needs a `;`.' },
            { line: 6, kind: 'syntax', fixes: ['int n = Integer.parseInt(text);', 'int n = (int) text;', 'int n = text.toInt();'], why: 'A `String` isn’t an `int`, and a cast can’t convert it. Use `Integer.parseInt`.' },
            { line: 9, kind: 'semantic', fixes: ['if (code.equals("COS")) {', 'if (code = "COS") {', 'if (code === "COS") {'], why: 'It compiles, but `==` compares objects, so this is false and `Yes` never prints.' },
            { line: 12, kind: 'syntax', fixes: ['System.out.println(code.length());', 'System.out.println(code.size());', 'System.out.println(length(code));'], why: 'For a `String`, `length()` is a method. Arrays are the ones with a `.length` field.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'How do you get the size?',
          buckets: [
            { id: 'field', label: '.length' },
            { id: 'len', label: '.length()' },
            { id: 'size', label: '.size()' },
          ],
          items: [
            { text: 'An array: `int[] a`', bucket: 'field', why: 'Arrays have a field: `a.length`.' },
            { text: 'A `String`', bucket: 'len', why: 'Strings have a method: `s.length()`.' },
            { text: 'An `ArrayList`', bucket: 'size', why: 'Collections use `list.size()`.' },
            { text: 'A row of a 2D array', bucket: 'field', why: 'A row is an array: `m[0].length`.' },
          ],
          explain: 'Mixing these up is one of the most common compile errors in exams.',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Work with text',
          body: 'Write `countVowels(s)`, counting `a e i o u` in either case.\n\nWrite `isPalindrome(s)`, which is `true` when `s` reads the same backwards, ignoring case.\n\nWrite `sum(a, b)`, which takes two numeric `String`s and returns their sum as an `int`.',
          starter: `public class Main {
    static int countVowels(String s) {
        // your code here
        return 0;
    }

    static boolean isPalindrome(String s) {
        // your code here
        return false;
    }

    static int sum(String a, String b) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Ibadan"));
        System.out.println(isPalindrome("Level"));
        System.out.println(sum("20", "22"));
    }
}
`,
          tests: [
            { label: '`countVowels("Ibadan")` is 3', expr: 'Main.countVowels("Ibadan")', expect: 3 },
            { label: '`isPalindrome("Level")` is true', expr: 'Main.isPalindrome("Level")', expect: true },
            { label: '`isPalindrome("Java")` is false', expr: 'Main.isPalindrome("Java")', expect: false },
            { label: '`sum("20", "22")` is 42', expr: 'Main.sum("20", "22")', expect: 42 },
            { expr: 'Main.countVowels("")', expect: 0, hidden: true },
            { expr: 'Main.countVowels("XYZ")', expect: 0, hidden: true },
            { expr: 'Main.isPalindrome("a")', expect: true, hidden: true },
            { expr: 'Main.sum("-5", "5")', expect: 0, hidden: true },
          ],
          hints: ['Lower-case the string first, then test each `charAt(i)`. `"aeiou".indexOf(c) >= 0` is a neat check.', '`new StringBuilder(s).reverse().toString()` reverses text. Compare with `equalsIgnoreCase`.'],
          solution: {
            code: `public class Main {
    static int countVowels(String s) {
        int count = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if ("aeiou".indexOf(c) >= 0) count++;
        }
        return count;
    }

    static boolean isPalindrome(String s) {
        String back = new StringBuilder(s).reverse().toString();
        return s.equalsIgnoreCase(back);
    }

    static int sum(String a, String b) {
        return Integer.parseInt(a) + Integer.parseInt(b);
    }

    public static void main(String[] args) {
        System.out.println(countVowels("Ibadan"));
        System.out.println(isPalindrome("Level"));
        System.out.println(sum("20", "22"));
    }
}
`,
            steps: [
              { lines: [4, 6], text: '**Lower-case once**, so you never need to check `A` and `a` separately.' },
              { lines: [11, 12], text: '**The API does the work:** `StringBuilder` reverses, and `equalsIgnoreCase` compares.' },
              { lines: [16, 16], text: '**Parse, then add.** Without parsing, `+` would join the text: `2022`.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Strings and the API: done.',
          body: 'You can find, import and use what Java already provides. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
