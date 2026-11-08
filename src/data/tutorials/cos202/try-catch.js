// COS 202 · Exceptions · Lesson 1: try, catch and finally.
import { exceptionScene } from './memory-scenes';

export default {
  id: 'try-catch',
  title: 'try, catch and finally',
  covers: 'What exceptions are, try/catch/finally flow, multiple catches, checked vs unchecked, the common exceptions',
  minutes: 15,
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
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which Iterator method safely removes the current item?',
          options: [
            { text: '`it.delete()`', why: 'There is no such method.' },
            { text: '`list.remove(i)` inside for-each', why: 'That throws ConcurrentModificationException.' },
            { text: '`it.next(null)`', why: 'next takes no arguments.' },
            { text: '`it.remove()`', correct: true, why: 'It removes the item most recently returned by `next()`.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exceptions · Lesson 1',
          title: 'Plan for the crash',
          body: 'A user types `abc` where a number belongs. Without handling, the program dies. With it:\n\n`try {`\n\n`    int n = Integer.parseInt(text);`\n\n`} catch (NumberFormatException e) {`\n\n`    System.out.println("Enter a number");`\n\n`}`\n\nWhen a line in `try` throws, the rest of the `try` is **skipped** and Java jumps to the first matching `catch`. Catch specific exceptions, not just `Exception`.',
          cta: 'Trace the flow',
        },
        exceptionScene,
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
          type: 'predict',
          eyebrow: 'Project · Tobi’s records app',
          title: 'A typo in a score',
          body: 'The score was typed as "7O" (a letter O). The app must not crash.\n\nWhat does it print?',
          code: `public class Main {
    public static void main(String[] args) {
        String[] typed = {"72", "7O", "65"};
        int total = 0;
        for (String t : typed) {
            try {
                total += Integer.parseInt(t);
            } catch (NumberFormatException e) {
                System.out.println("Bad score: " + t);
            } finally {
                System.out.println("checked " + t);
            }
        }
        System.out.println(total);
    }
}`,
          options: [
            { out: 'checked 72\nBad score: 7O\nchecked 7O\nchecked 65\n137', correct: true, why: 'The bad score is caught and reported; `finally` runs for every score; the good ones add to 137.' },
            { out: 'checked 72\nBad score: 7O\nchecked 65\n137', why: '`finally` runs after the catch for "7O" too.' },
            { out: 'Bad score: 7O\n137', why: '`finally` runs every time, error or not.' },
            { out: 'checked 72\nBad score: 7O', why: 'The exception is caught, so the loop carries on.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why is `catch (Exception e) { }` with an empty body a bad habit?',
          options: [
            { text: 'It doesn’t compile', why: 'It compiles.' },
            { text: 'It catches nothing', why: 'It catches almost everything.' },
            { text: 'It silently hides every error, so bugs go unnoticed and data quietly goes wrong', correct: true, why: 'Catch the specific exception you expect, and at least report it.' },
            { text: 'It makes the program slower', why: 'Speed isn’t the issue.' },
          ],
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
