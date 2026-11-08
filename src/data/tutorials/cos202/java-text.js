// COS 202 · Intro to Java · Module 4: Strings and keyboard input with Scanner.

export default {
  id: 'java-text',
  title: 'Text and keyboard input',
  covers: 'String methods, zero-based positions, immutability, equals versus ==, joining text, reading input with Scanner',
  minutes: 7,
  sections: [
    {
      name: 'Working with text',
      terms: [
        ['String', 'A sequence of characters. A class, and ==immutable==: methods return a new String rather than changing the old one.'],
        ['Index', 'A character’s position, counted from 0. In `"Hello"`, `H` is at index 0.'],
        ['equals', 'Compares the content of two Strings. `==` only asks whether they are the same object in memory.'],
        ['Common methods', '`length`, `charAt`, `substring`, `toUpperCase`, `toLowerCase`, `contains`, `replace`, `trim`, `indexOf`.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What is `17 % 5`?',
          options: [
            { text: '3', why: 'That’s `17 / 5`.' },
            { text: '3.4', why: 'That’s the real-number division.' },
            { text: '2', correct: true, why: '`%` gives the remainder: 17 = 3 × 5 + 2.' },
            { text: '0', why: 'Only if 5 divided 17 exactly.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Text',
          title: 'A String is a row of numbered boxes',
          body: 'Each character has a position called an ==index==, **starting from 0**:\n\n`H   e   l   l   o`\n\n`0   1   2   3   4`\n\nSo `"Hello".charAt(0)` is `H`, and `"Hello".length()` is 5, while the last index is 4.\n\nThe dot means “ask this String to do something”. `length()` is a ==method==: a named action. The round brackets are how you call it.',
          cta: 'See what they can do',
        },
        {
          type: 'reveal',
          eyebrow: 'String toolkit',
          title: 'Open each group',
          cards: [
            { title: 'Measure and pick', text: '`"Hi".length()` is 2. `"Hi".charAt(0)` is `H`. `"Hello".indexOf("l")` is 2, the first match.' },
            { title: 'Cut', text: '`"Hello".substring(1, 3)` is `el`: from index 1 up to, **but not including**, index 3.' },
            { title: 'Change case', text: '`"hi".toUpperCase()` is `HI`. `"HI".toLowerCase()` is `hi`.' },
            { title: 'Clean and swap', text: '`"  hi  ".trim()` is `hi`. `"cat".replace(\'c\', \'b\')` is `bat`.' },
            { title: 'Ask', text: '`"Hello".contains("ell")` is `true`. `"a".equals("a")` is `true`.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Slice and join',
          body: 'One idea at a time: positions start at 0, `substring` stops before its end, and `+` joins.',
          code: `public static void main(String[] args) {
    String course = "cos202";
    System.out.println(course.length());
    System.out.println(course.substring(0, 3).toUpperCase());
    System.out.println("Age: " + 21);
    course.toUpperCase();
    System.out.println(course);
}`,
          options: [
            { out: '6\nCOS\nAge: 21\ncos202', correct: true, why: 'Strings are ==immutable==: `toUpperCase()` makes a **new** String. Nothing stored it, so `course` stays lowercase.' },
            { out: '6\nCOS\nAge: 21\nCOS202', why: 'The method returned a new String, which was never stored. To keep it: `course = course.toUpperCase();`' },
            { out: '5\nCOS2\nAge: 21\ncos202', why: 'There are 6 characters, and `substring(0, 3)` stops before index 3.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Exam favourite',
          prompt: 'How should you check whether two Strings hold the same text?',
          options: [
            { text: '`a.equals(b)`', correct: true, why: '`equals` compares the characters. For any case, use `equalsIgnoreCase`.' },
            { text: '`a == b`', why: 'For Strings, `==` asks whether both are the **same object in memory**, so it can be false for identical text.' },
            { text: '`a = b`', why: 'A single `=` stores a value and doesn’t compare anything.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Text is under control.',
          recap: ['Positions start from 0.', 'Compare Strings with `equals`.'],
          why: 'Next: letting the user type something in.',
        },
      ],
    },
    {
      name: 'Reading from the keyboard',
      terms: [
        ['Scanner', 'Connects a program to the keyboard. `import java.util.Scanner;` then `new Scanner(System.in)`.'],
        ['Reading methods', '`nextLine()` reads a full line, `next()` one word, `nextInt()` a whole number, `nextDouble()` a decimal.'],
        ['import', 'Brings in a ready-made tool from Java’s library. It goes at the very top of the file.'],
      ],
      screens: [
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'A program that listens',
          body: 'Suppose the user types `Ada`, then `20`. The `Scanner` waits for each one.',
          code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();
        System.out.println(name + " is " + age);
        sc.close();
    }
}`,
          stdin: 'Ada\n20\n',
          frames: [
            { line: 1, note: '`Scanner` lives in Java’s library, so bring it in. This line sits above the class.' },
            { line: 5, note: 'Create a Scanner connected to the keyboard (`System.in`).', set: { sc: 'keyboard' } },
            { line: 6, note: 'The program **waits**. The user types `Ada`, and the whole line goes into `name`.', set: { name: '"Ada"' } },
            { line: 7, note: 'It waits again. `nextInt()` turns the typed `20` into a number.', set: { age: 20 } },
            { line: 8, note: 'Join and print.', print: 'Ada is 20' },
            { line: 9, note: 'Close the Scanner when you finish with it.' },
          ],
          cta: 'Now you try',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Next year’s age',
          body: 'Read a name, then an age. Print the name in capitals, then the age next year. If the user types `Ada` and `20`, print:\n\n`ADA`\n\n`21`\n\nThe **▶ Run** button feeds in those two answers for you.',
          stdin: 'Ada\n20\n',
          starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // your code here
    }
}
`,
          tests: [
            { label: 'Ada, 20 prints `ADA` and `21`', body: 'System.setIn(new ByteArrayInputStream("Ada\\n20\\n".getBytes())); Main.main(new String[0]); return null;', out: 'ADA\n21' },
            { body: 'System.setIn(new ByteArrayInputStream("Tolu\\n17\\n".getBytes())); Main.main(new String[0]); return null;', out: 'TOLU\n18', hidden: true },
          ],
          hints: ['`String name = sc.nextLine();` then `int age = sc.nextInt();`', '`name.toUpperCase()` makes the capitals. Add 1 with `age + 1`.'],
          solution: {
            code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        int age = sc.nextInt();
        System.out.println(name.toUpperCase());
        System.out.println(age + 1);
        sc.close();
    }
}
`,
            steps: [
              { lines: [6, 7], text: '**Read in the order the user types**: the right method for each kind of value.' },
              { lines: [8, 9], text: '**Work on the values and print them.** A real program reads different answers every time, so don’t write `ADA` directly.' },
            ],
          },
        },
        {
          type: 'predict',
          eyebrow: 'Project · Tobi’s records app',
          title: 'Tidy the student’s name',
          body: 'Names arrive typed in all sorts of ways. String methods clean them.\n\nWhat does it print?',
          code: `public class Main {
    public static void main(String[] args) {
        String name = "  tobi adewale ";
        name = name.trim();
        String first = name.substring(0, 4);
        System.out.println(first.toUpperCase());
        System.out.println(name.length());
        System.out.println(name.equals("tobi adewale"));
    }
}`,
          options: [
            { out: 'TOBI\n12\ntrue', correct: true, why: '`trim()` strips the outer spaces (12 characters left); `substring(0, 4)` is positions 0–3, “tobi”.' },
            { out: 'TOBI\n15\ntrue', why: '`trim()` removed the spaces at both ends, so the length is 12.' },
            { out: 'tobi\n12\ntrue', why: '`toUpperCase()` returns the capitalised copy, and that is what’s printed.' },
            { out: 'TOBI\n12\nfalse', why: 'After trimming, the text matches exactly, so `equals` is true.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: '`name.toUpperCase();` on its own line leaves `name` unchanged. Why?',
          options: [
            { text: 'toUpperCase only works on literals', why: 'It works on any String.' },
            { text: 'Strings are immutable: the method returns a new String, which was thrown away', correct: true, why: 'Write `name = name.toUpperCase();` to keep the result.' },
            { text: 'It needs an argument', why: 'It takes none.' },
            { text: 'Java forgot to save it', why: 'Nothing is saved unless you assign the returned String.' },
          ],
        },
        {
          type: 'finish',
          title: 'Your programs can talk back.',
          body: 'You can handle text and read input. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
