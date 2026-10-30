// COS 202 · Java toolkit · Lesson 1: program anatomy, types, if/switch and loops.

export default {
  id: 'anatomy',
  title: 'Program anatomy, types and control flow',
  covers: 'class and main, primitive types, String, operators, if/else, switch, for and while loops',
  minutes: 15,
  sections: [
    {
      name: 'What a Java program is',
      terms: [
        ['Class', 'The container for all Java code. The file name must match a `public class`.'],
        ['main', '`public static void main(String[] args)` is where a program starts.'],
        ['Primitive types', '`int`, `double`, `boolean`, `char` (also `long`, `float`, `short`, `byte`). `String` is a class, not a primitive.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Java toolkit · Lesson 1',
          title: 'Every program has the same skeleton',
          body: 'All Java code lives inside a ==class==, and running a program starts at ==main==:\n\n`public class Main {`\n\n`    public static void main(String[] args) {`\n\n`        System.out.println("Hello");`\n\n`    }`\n\n`}`\n\nEvery statement ends with `;`. Every `{` needs a partner `}`. Java is **case-sensitive**: `string` and `String` are different things.',
          cta: 'Meet the types',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which type fits each value?',
          buckets: [
            { id: 'int', label: 'int' },
            { id: 'double', label: 'double' },
            { id: 'other', label: 'boolean, char or String' },
          ],
          items: [
            { text: '`42`', bucket: 'int', why: '`42` is a whole number: `int`.' },
            { text: '`3.14`', bucket: 'double', why: '`3.14` has a decimal point: `double`.' },
            { text: '`true`', bucket: 'other', why: '`true` is a `boolean`.' },
            { text: '`\'A\'`', bucket: 'other', why: 'Single quotes hold one `char`.' },
            { text: '`"A"`', bucket: 'other', why: 'Double quotes make a `String`, even with one letter.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Division and joining text',
          body: 'Two traps: `int / int` throws away the decimal part, and `+` joins text once a `String` is involved, reading left to right.',
          code: `public static void main(String[] args) {
    System.out.println(7 / 2);
    System.out.println(7 / 2.0);
    System.out.println(7 % 2);
    System.out.println("a" + 1 + 2);
    System.out.println(1 + 2 + "a");
}`,
          options: [
            { out: '3\n3.5\n1\na12\n3a', correct: true, why: '`7 / 2` is integer division, `%` is the remainder, and `+` works left to right: `"a" + 1` is text, but `1 + 2` is added first.' },
            { out: '3.5\n3.5\n1\na3\n3a', why: 'Two `int`s give an `int`: `7 / 2` is `3`. And once text is on the left, `+` joins: `a12`.' },
            { out: '3\n3.5\n1\na12\n12a', why: '`1 + 2` happens first, before any text appears, so it is `3a`.' },
            { out: '3\n3\n1\na3\n3a', why: 'One `double` makes the whole division decimal: `3.5`.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Skeleton and types: set.',
          recap: ['Code lives in a class; programs start at `main`.', '`int / int` drops the decimal part.'],
          why: 'Next: making decisions and repeating work.',
        },
      ],
    },
    {
      name: 'Decisions and loops',
      terms: [
        ['if / else', 'Runs a block only when its condition is true. Compare with `==`; assign with `=`.'],
        ['switch', 'Picks a case by value. Without `break`, execution falls through to the next case.'],
        ['for / while', '`for` suits a known number of repeats; `while` repeats as long as its condition holds.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'The missing break',
          body: 'A `switch` jumps to the matching `case`, then keeps going until it meets a `break`.',
          code: `public static void main(String[] args) {
    String grade = "B";
    switch (grade) {
        case "A": System.out.println(5);
        case "B": System.out.println(4);
        case "C": System.out.println(3);
            break;
        default: System.out.println(0);
    }
}`,
          options: [
            { out: '4\n3', correct: true, why: 'It jumps to `"B"`, prints 4, **falls through** to `"C"`, prints 3, then hits `break`.' },
            { out: '4', why: 'There is no `break` after `"B"`, so it carries on into `"C"`.' },
            { out: '5\n4\n3', why: 'It starts at the matching case, not at the top.' },
            { out: '4\n3\n0', why: 'The `break` stops it before `default`.' },
          ],
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'Add up the even numbers',
          body: 'Complete the method: it adds every even number from 1 to `n`.',
          code: `static int sumEvens(int n) {
    int total = 0;
    [[for]] (int i = 1; i <= n; i++) {
        if (i % 2 [[==]] 0) {
            total [[+=]] i;
        }
    }
    [[return]] total;
}`,
          bank: ['while', '=', '-=', 'break', 'void'],
          explain: '`%` gives the remainder, so `i % 2 == 0` means “even”. Note `==` compares, while `=` assigns.',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Is it a pass?',
          body: 'This should print `Pass` for marks of 40 and above.',
          code: `public class Main {
    public static void main(String[] args) {
        int mark = 40
        if (mark > 40) {
            System.out.println("Pass");
        } else {
            System.out.println("Fail");
        }
    }
}`,
          errors: [
            { line: 3, kind: 'syntax', fixes: ['int mark = 40;', 'int mark == 40;', 'mark = 40;'], why: 'Every statement needs a `;`. The code can’t compile without it.' },
            { line: 4, kind: 'semantic', fixes: ['if (mark >= 40) {', 'if (mark = 40) {', 'if (mark < 40) {'], why: 'It compiles, but a mark of exactly 40 wrongly fails. “40 and above” needs `>=`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Turn a score into a grade',
          body: 'Write `grade(score)` using the 5-point scale: 70+ is `A`, 60+ `B`, 50+ `C`, 45+ `D`, 40+ `E`, otherwise `F`. Return a `String`.',
          starter: `public class Main {
    static String grade(int score) {
        // your code here
        return "";
    }

    public static void main(String[] args) {
        System.out.println(grade(75));
    }
}
`,
          tests: [
            { label: '`grade(75)` is `A`', expr: 'Main.grade(75)', expect: 'A' },
            { label: '`grade(60)` is `B`', expr: 'Main.grade(60)', expect: 'B' },
            { label: '`grade(52)` is `C`', expr: 'Main.grade(52)', expect: 'C' },
            { label: '`grade(39)` is `F`', expr: 'Main.grade(39)', expect: 'F' },
            { expr: 'Main.grade(70)', expect: 'A', hidden: true },
            { expr: 'Main.grade(45)', expect: 'D', hidden: true },
            { expr: 'Main.grade(40)', expect: 'E', hidden: true },
          ],
          hints: ['Check from the top down: `if (score >= 70) return "A";`', 'After a `return`, the method stops, so you don’t need `else`.'],
          solution: {
            code: `public class Main {
    static String grade(int score) {
        if (score >= 70) return "A";
        if (score >= 60) return "B";
        if (score >= 50) return "C";
        if (score >= 45) return "D";
        if (score >= 40) return "E";
        return "F";
    }

    public static void main(String[] args) {
        System.out.println(grade(75));
    }
}
`,
            steps: [
              { lines: [3, 7], text: '**Highest first.** Each `if` only runs when all the higher grades have already failed, so no ranges are needed.' },
              { lines: [8, 8], text: '**Everything else** is an `F`. A method returning `String` must return on every path.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'The toolkit is open.',
          body: 'Types, decisions and loops are in place. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
