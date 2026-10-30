// COS 202 · Exceptions · Lesson 1: try, catch and finally.

export default {
  id: 'try-catch',
  title: 'try, catch and finally',
  covers: 'What exceptions are, try/catch/finally flow, multiple catches, checked vs unchecked, the common exceptions',
  minutes: 13,
  sections: [
    {
      name: 'When things go wrong',
      terms: [
        ['Exception', 'An object describing a problem while a program runs. If nothing catches it, the program stops.'],
        ['try / catch', '`try` holds risky code; a matching `catch` handles the problem, and the program continues after it.'],
        ['finally', 'Runs whether or not an exception happened. Used for clean-up.'],
        ['Unchecked', 'Subclasses of `RuntimeException`. The compiler doesn’t force you to handle them (programming mistakes, usually).'],
        ['Checked', 'Other exceptions, like `IOException`. You must `catch` them or declare `throws`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exceptions · Lesson 1',
          title: 'Plan for the crash',
          body: 'A user types `abc` where a number belongs. Without handling, the program dies. With it:\n\n`try {`\n\n`    int n = Integer.parseInt(text);`\n\n`} catch (NumberFormatException e) {`\n\n`    System.out.println("Enter a number");`\n\n`}`\n\nWhen a line in `try` throws, the rest of the `try` is **skipped** and Java jumps to the first matching `catch`. Catch specific exceptions, not just `Exception`.',
          cta: 'Trace the flow',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Trace the jump',
          code: `public static void main(String[] args) {
    try {
        System.out.println("A");
        int x = 10 / 0;
        System.out.println("B");
    } catch (ArithmeticException e) {
        System.out.println("C");
    } finally {
        System.out.println("D");
    }
    System.out.println("E");
}`,
          options: [
            { out: 'A\nC\nD\nE', correct: true, why: '`10 / 0` throws, so `B` is skipped. The catch runs, `finally` always runs, and the program carries on.' },
            { out: 'A\nB\nC\nD\nE', why: 'Once a line throws, the rest of the `try` is skipped.' },
            { out: 'A\nC\nE', why: '`finally` always runs.' },
            { out: 'A\nC\nD', why: 'The exception was handled, so the program continues to `E`.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which exception does each line throw?',
          buckets: [
            { id: 'nfe', label: 'NumberFormatException' },
            { id: 'npe', label: 'NullPointerException' },
            { id: 'aio', label: 'ArrayIndexOutOfBoundsException' },
            { id: 'ae', label: 'ArithmeticException' },
          ],
          items: [
            { text: '`Integer.parseInt("abc")`', bucket: 'nfe', why: 'Text that isn’t a number.' },
            { text: 'String s = null; `s.length()`', bucket: 'npe', why: 'Using a reference that points at nothing.' },
            { text: 'int[] a = new int[2]; `a[2]`', bucket: 'aio', why: 'The last index of two elements is 1.' },
            { text: '`10 / 0`', bucket: 'ae', why: 'Integer division by zero. (`10.0 / 0` gives `Infinity` instead.)' },
            { text: '`Double.parseDouble("")`', bucket: 'nfe', why: 'An empty string isn’t a number.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Catching in the wrong order',
          body: 'This should report a bad number, and catch anything else separately.',
          code: `public class Main {
    public static void main(String[] args) {
        try {
            int n = Integer.parseInt("abc");
            System.out.println(n);
        } catch (Exception e) {
            System.out.println("Something went wrong");
        } catch (NumberFormatException e) {
            System.out.println("Not a number");
        } finaly {
            System.out.println("Done");
        }
    }
}`,
          errors: [
            { line: 6, kind: 'syntax', fixes: ['} catch (NumberFormatException e) {', '} catch (Exception) {', '} catch Exception e {'], why: '`Exception` catches everything, so the specific catch after it could never run. Java refuses to compile that. Specific goes first.' },
            { line: 8, kind: 'syntax', fixes: ['} catch (Exception e) {', '} catch (NumberFormatException) {', '} else (Exception e) {'], why: 'This is the other half of the swap: general goes last.' },
            { line: 10, kind: 'syntax', fixes: ['} finally {', '} finaly() {', '} final {'], why: 'The keyword is `finally`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Never crash on bad input',
          body: 'Write `parseOr(text, fallback)`: it returns `text` as an `int`, or `fallback` if it isn’t a number.\n\nWrite `safeDivide(a, b)`, which returns `a / b` as an `int`, or `0` if `b` is zero. Use `try`/`catch` for both, and catch the **specific** exception.',
          starter: `public class Main {
    static int parseOr(String text, int fallback) {
        // your code here
        return 0;
    }

    static int safeDivide(int a, int b) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(parseOr("42", 0));
        System.out.println(parseOr("abc", -1));
        System.out.println(safeDivide(10, 0));
    }
}
`,
          tests: [
            { label: 'Parses a good number', expr: 'Main.parseOr("42", 0)', expect: 42 },
            { label: 'Falls back on bad text', expr: 'Main.parseOr("abc", -1)', expect: -1 },
            { label: 'Divides normally', expr: 'Main.safeDivide(10, 2)', expect: 5 },
            { label: 'Dividing by zero gives 0', expr: 'Main.safeDivide(10, 0)', expect: 0 },
            { label: 'Catches specific exceptions', src: 'catch\\s*\\(\\s*(Exception|Throwable)\\b', absent: true, fail: 'Catch `NumberFormatException` and `ArithmeticException`, not the general `Exception`.' },
            { expr: 'Main.parseOr("", 7)', expect: 7, hidden: true },
            { expr: 'Main.parseOr("-3", 7)', expect: -3, hidden: true },
          ],
          hints: ['`return` inside the `try`, and `return` the fallback inside the `catch`.', 'Integer division by zero throws `ArithmeticException`.'],
          solution: {
            code: `public class Main {
    static int parseOr(String text, int fallback) {
        try {
            return Integer.parseInt(text);
        } catch (NumberFormatException e) {
            return fallback;
        }
    }

    static int safeDivide(int a, int b) {
        try {
            return a / b;
        } catch (ArithmeticException e) {
            return 0;
        }
    }

    public static void main(String[] args) {
        System.out.println(parseOr("42", 0));
        System.out.println(parseOr("abc", -1));
        System.out.println(safeDivide(10, 0));
    }
}
`,
            steps: [
              { lines: [4, 4], text: '**The risky line** goes in `try`, and a successful `return` ends the method.' },
              { lines: [5, 6], text: '**A specific catch** handles only what you expected. Real bugs still show up.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'try and catch: done.',
          body: 'Your programs can now survive bad input. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
