// COS 202 · Intro to Java · Module 5: planning, pseudocode, flowcharts, if and switch.

export default {
  id: 'java-decisions',
  title: 'Planning and decisions',
  covers: 'sequence, selection and iteration, pseudocode, flowcharts, if, else, else-if ladders, nested if, switch and fall-through',
  minutes: 9,
  sections: [
    {
      name: 'Plan first',
      terms: [
        ['Control structures', 'Every program is built from three: ==sequence== (one after another), ==selection== (choose a path) and ==iteration== (repeat).'],
        ['Pseudocode', 'Program steps in plain English, using words like `BEGIN`, `INPUT`, `SET`, `IF`, `PRINT`, `END`. No strict rules.'],
        ['Flowchart', 'A diagram of the steps. Oval: start or end. Parallelogram: input or output. Rectangle: process. Diamond: decision.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Think before typing',
          title: 'Write the plan in plain English',
          body: 'Coding without a plan is like building a house without a drawing. ==Pseudocode== is that plan: the steps in simple English, with no fussy rules.\n\n`BEGIN`\n\n`INPUT score`\n\n`IF score >= 40 THEN PRINT "PASS"`\n\n`ELSE PRINT "FAIL"`\n\n`END`\n\nAnyone can read it, and each line turns into a line or two of Java.',
          cta: 'Now draw it',
        },
        {
          type: 'flow',
          eyebrow: 'Flowcharts',
          title: 'The same plan as a picture',
          body: 'A ==flowchart== shows the path a program takes. Drag the score and watch the path change.',
          cta: 'Check the steps',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'How do good programmers solve a problem?',
          items: [
            'Understand the problem: inputs, conditions, outputs',
            'Write pseudocode',
            'Draw a flowchart',
            'Write the Java code',
            'Test it with a few values and fix bugs',
          ],
        },
        {
          type: 'bridge',
          title: 'Plan ready.',
          recap: ['Pseudocode is the plan in words.', 'A diamond in a flowchart is a yes/no decision.'],
          why: 'Next: writing that decision in Java.',
        },
      ],
    },
    {
      name: 'Choosing a path',
      terms: [
        ['if / else', '`if` runs a block when its condition is true. `else` runs when it is false. Exactly one of them runs.'],
        ['else-if ladder', 'Tests conditions from the top and takes the **first** true one, so check the highest range first.'],
        ['Nested if', 'An `if` inside another `if`: the inner one is only reached when the outer one is true.'],
        ['switch', 'Matches one value against fixed `case`s. Without `break`, it ==falls through== into the next case.'],
      ],
      screens: [
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'Java skips the path not taken',
          body: 'Follow the highlight: the `else` line gets jumped over.',
          code: `public class Main {
    public static void main(String[] args) {
        int score = 55;
        if (score >= 40) {
            System.out.println("PASS");
        } else {
            System.out.println("FAIL");
        }
        System.out.println("Done");
    }
}`,
          frames: [
            { line: 3, note: 'Store the score.', set: { score: 55 } },
            { line: 4, note: 'Ask: is 55 at least 40? **Yes**, so go into this block.' },
            { line: 5, note: 'The “yes” path.', print: 'PASS' },
            { line: 9, note: 'The `else` block is skipped. The program carries on after the closing bracket.', print: 'Done' },
          ],
          cta: 'More than two paths',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Order matters on a ladder',
          body: 'An else-if ladder stops at the **first** true condition. This one checks the low mark first. What does a score of 75 get?',
          code: `public static void main(String[] args) {
    int score = 75;
    if (score >= 40) {
        System.out.println("E");
    } else if (score >= 60) {
        System.out.println("B");
    } else if (score >= 70) {
        System.out.println("A");
    }
}`,
          options: [
            { out: 'E', correct: true, why: '75 passes the very first test, so the rest are never looked at. Always check the **highest first**.' },
            { out: 'A', why: 'That would need `>= 70` to be checked first.' },
            { out: 'E\nB\nA', why: 'A ladder runs only one branch. Separate `if`s would run all three.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Nested if',
          title: 'A decision inside a decision',
          body: 'The inner question is only asked when the outer answer is yes.',
          code: `public static void main(String[] args) {
    int score = 78;
    boolean hasDocument = false;
    if (score >= 60) {
        if (hasDocument) {
            System.out.println("Admitted");
        } else {
            System.out.println("Bring documents");
        }
    } else {
        System.out.println("Denied");
    }
}`,
          options: [
            { out: 'Bring documents', correct: true, why: 'The score passes the outer test; the inner test fails, so its `else` runs.' },
            { out: 'Denied', why: 'That `else` belongs to the outer `if`, and the score did pass.' },
            { out: 'Admitted', why: '`hasDocument` is `false`, so that line is skipped.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'switch',
          title: 'The missing break',
          body: 'A ==switch== jumps to the matching `case`, then keeps running downward until a `break`. Forgetting `break` is called ==fall-through==.',
          code: `public static void main(String[] args) {
    int day = 2;
    switch (day) {
        case 1: System.out.println("Mon"); break;
        case 2: System.out.println("Tue");
        case 3: System.out.println("Wed"); break;
        default: System.out.println("Other");
    }
}`,
          options: [
            { out: 'Tue\nWed', correct: true, why: 'It jumps to case 2, prints `Tue`, has no `break`, falls into case 3, then stops at that `break`.' },
            { out: 'Tue', why: 'Case 2 has no `break`, so it keeps going.' },
            { out: 'Tue\nWed\nOther', why: 'The `break` in case 3 stops it before `default`.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Which tool?',
          prompt: 'Would you use if-else or switch?',
          buckets: [
            { id: 'if', label: 'if-else' },
            { id: 'switch', label: 'switch' },
          ],
          items: [
            { text: 'Score from 60 to 69', bucket: 'if', why: 'Ranges need comparisons like `>=`.' },
            { text: 'Day number 1 to 7 to a name', bucket: 'switch', why: 'Exact fixed values suit `switch`.' },
            { text: 'Age over 18 and has an ID', bucket: 'if', why: 'Two variables and logic: `if`.' },
            { text: 'Menu choice `\'a\'`, `\'b\'` or `\'c\'`', bucket: 'switch', why: 'Exact `char` values suit `switch`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Two mistakes, two kinds',
          body: 'This should print `Pass` for a mark of 40 or more.',
          code: `public class Main {
    public static void main(String[] args) {
        int mark = 40;
        if (mark = 40) {
            System.out.println("Top");
        }
        if (mark > 40) {
            System.out.println("Pass");
        }
    }
}`,
          errors: [
            { line: 4, kind: 'syntax', fixes: ['if (mark == 100) {', 'if (mark) {', 'if mark == 100 {'], why: '`=` stores a value and `if` needs a true or false, so this won’t compile. Compare with `==`.' },
            { line: 7, kind: 'semantic', fixes: ['if (mark >= 40) {', 'if (mark < 40) {', 'if (mark != 40) {'], why: 'It runs, but a mark of exactly 40 prints nothing. “40 or more” needs `>=`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'The largest of three',
          body: 'Read three whole numbers and print the largest. Use only `if` and `else`, with no `Math.max`.\n\n**Plan:** assume the first is the largest, then compare the others against it.',
          stdin: '3 9 5\n',
          starter: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        // your code here
    }
}
`,
          tests: [
            { label: '3, 9, 5 prints `9`', body: 'System.setIn(new ByteArrayInputStream("3 9 5".getBytes())); Main.main(new String[0]); return null;', out: '9' },
            { label: '8, 2, 1 prints `8`', body: 'System.setIn(new ByteArrayInputStream("8 2 1".getBytes())); Main.main(new String[0]); return null;', out: '8' },
            { label: '1, 2, 7 prints `7`', body: 'System.setIn(new ByteArrayInputStream("1 2 7".getBytes())); Main.main(new String[0]); return null;', out: '7' },
            { body: 'System.setIn(new ByteArrayInputStream("4 4 4".getBytes())); Main.main(new String[0]); return null;', out: '4', hidden: true },
            { label: 'No `Math.max`', src: 'Math\\.max', absent: true, fail: 'Solve this one with `if` statements.' },
          ],
          hints: ['Start with `int largest = a;`', 'Then `if (b > largest) largest = b;` and the same for `c`.'],
          solution: {
            code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        int largest = a;
        if (b > largest) {
            largest = b;
        }
        if (c > largest) {
            largest = c;
        }
        System.out.println(largest);
    }
}
`,
            steps: [
              { lines: [9, 9], text: '**Start with a guess**: the first number is the largest so far.' },
              { lines: [10, 15], text: '**Challenge the guess.** Separate `if`s, not a ladder, because both comparisons must happen.' },
              { lines: [16, 16], text: '**Print the winner.**' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Your programs can decide.',
          body: 'You can plan a solution and code its choices. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
