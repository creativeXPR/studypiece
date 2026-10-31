// COS 202 · Intro to Java · Module 6: for, while, do-while, nested loops, break and continue.

export default {
  id: 'java-loops',
  title: 'Loops: repeating work',
  covers: 'for, while, do-while, choosing a loop, infinite loops, break, continue, nested loops',
  minutes: 8,
  sections: [
    {
      name: 'Three loops',
      terms: [
        ['for', '`for (start; condition; update) { }`. Best when you know how many repeats you need.'],
        ['while', 'Checks its condition **before** each repeat, so it may run zero times. Best when you don’t know how many.'],
        ['do-while', 'Checks its condition **after** each repeat, so it always runs at least once. Good for menus.'],
        ['Infinite loop', 'A loop whose condition never becomes false, usually from forgetting to update the variable.'],
      ],
      screens: [
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'The loop that adds up',
          body: 'A ==loop== repeats a block. This pattern, a running total, is one of the most used in programming. Watch `i` and `sum` in **Memory**.',
          code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 3; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}`,
          frames: [
            { line: 3, note: 'The total starts empty.', set: { sum: 0 } },
            { line: 4, note: '**Start:** `i` is 1. **Condition:** is `1 <= 3`? Yes, so enter the loop.', set: { i: 1 } },
            { line: 5, note: 'Add `i` to the total.', set: { sum: 1 } },
            { line: 4, note: '**Update:** `i++` makes `i` 2. Is `2 <= 3`? Yes.', set: { i: 2 } },
            { line: 5, note: 'Add again.', set: { sum: 3 } },
            { line: 4, note: '`i` becomes 3. Is `3 <= 3`? Yes.', set: { i: 3 } },
            { line: 5, note: 'Add again.', set: { sum: 6 } },
            { line: 4, note: '`i` becomes 4. Is `4 <= 3`? **No**, so the loop ends.', set: { i: 4 } },
            { line: 7, note: 'Carry on after the loop. `i` was created by the loop, so it is gone. `sum` remains.', drop: ['i'], print: '6' },
          ],
          cta: 'Other loops',
        },
        {
          type: 'reveal',
          eyebrow: 'The family',
          title: 'Same idea, three shapes',
          cards: [
            { title: 'for', text: '`for (int i = 1; i <= 5; i++) { }`. Everything is on one line: start, condition, update. For a **known count**.' },
            { title: 'while', text: '`while (count > 0) { count--; }`. Checks first, so it can run zero times. For an **unknown count**, such as reading until the user types 0.' },
            { title: 'do-while', text: '`do { } while (choice != 0);`. Runs, then checks. Always **at least once**, so it suits menus.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'The false condition',
          body: 'Here the condition is false from the very start. Which loop still runs?',
          code: `public static void main(String[] args) {
    int a = 10;
    while (a < 5) {
        System.out.println("while");
    }
    do {
        System.out.println("do");
    } while (a < 5);
}`,
          options: [
            { out: 'do', correct: true, why: '`while` checks first and never enters. `do-while` runs its body first and checks afterwards.' },
            { out: 'while\ndo', why: '`while` checks before running, and `10 < 5` is false.' },
            { out: '', why: '`do-while` always runs at least once.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The loop that never ends',
          body: 'This should print 5, 4, 3, 2, 1 and stop.',
          code: `public class Main {
    public static void main(String[] args) {
        int count = 5;
        while (count > 0) {
            System.out.println(count);
            count++;
        }
    }
}`,
          errors: [
            { line: 6, kind: 'semantic', fixes: ['count--;', 'count = 5;', 'count + 1;'], why: '`count` only grows, so `count > 0` stays true: an ==infinite loop==. It compiles, then never stops. Counting down needs `count--`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Multiples of 3',
          body: 'Print every multiple of 3 from 1 to 20, one per line. Then print `Count: 6`, where 6 is calculated by your program.',
          starter: `public class Main {
    public static void main(String[] args) {
        // your code here
    }
}
`,
          tests: [
            { label: 'Prints 3 to 18, then the count', main: 'Main', out: '3\n6\n9\n12\n15\n18\nCount: 6' },
            { label: 'Uses a loop', src: '\\b(for|while)\\b', fail: 'Let a loop do the repeating.' },
          ],
          hints: ['Loop `i` from 1 to 20. `i % 3 == 0` means `i` is a multiple of 3.', 'Create `int count = 0;` before the loop and do `count++` for each multiple.'],
          solution: {
            code: `public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 1; i <= 20; i++) {
            if (i % 3 == 0) {
                System.out.println(i);
                count++;
            }
        }
        System.out.println("Count: " + count);
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**The counter** starts at 0, outside the loop, so it survives between repeats.' },
              { lines: [4, 8], text: '**Visit every number**, and act only on multiples of 3.' },
              { lines: [10, 10], text: '**After the loop**, print the count once.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'Three loops down.',
          recap: ['Known count: `for`. Unknown: `while`. At least once: `do-while`.', 'A loop must make progress towards ending.'],
          why: 'Next: steering a loop, and loops inside loops.',
        },
      ],
    },
    {
      name: 'Steering and nesting',
      terms: [
        ['break', 'Leaves the loop at once and continues after it.'],
        ['continue', 'Skips the rest of this repeat and moves on to the next one.'],
        ['Nested loop', 'A loop inside a loop. The inner loop runs fully for **each** repeat of the outer one: useful for rows and columns.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'break or continue',
          body: '`break` leaves the loop. `continue` skips to the next repeat. `print` stays on the same line.',
          code: `public static void main(String[] args) {
    for (int i = 1; i <= 5; i++) {
        if (i == 4) break;
        System.out.print(i + " ");
    }
    System.out.println();
    for (int i = 1; i <= 5; i++) {
        if (i == 2) continue;
        System.out.print(i + " ");
    }
}`,
          options: [
            { out: '1 2 3 \n1 3 4 5', correct: true, why: 'The first loop stops completely at 4. The second skips only 2.' },
            { out: '1 2 3 5 \n1 3 4 5', why: '`break` ends the whole loop, so 5 is never reached.' },
            { out: '1 2 3 \n1', why: '`continue` skips only that one repeat and doesn’t leave the loop.' },
          ],
        },
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'A loop inside a loop',
          body: 'For **every** row, the inner loop runs from the start. This is how you draw tables and patterns.',
          code: `public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 2; row++) {
            for (int col = 1; col <= 2; col++) {
                System.out.println(row + "," + col);
            }
        }
    }
}`,
          frames: [
            { line: 3, note: 'Outer loop: row 1.', set: { row: 1 } },
            { line: 4, note: 'Inner loop starts at column 1.', set: { col: 1 } },
            { line: 5, note: 'Print the pair.', print: '1,1' },
            { line: 4, note: 'Column 2. The row hasn’t changed.', set: { col: 2 } },
            { line: 5, note: 'Print the pair.', print: '1,2' },
            { line: 3, note: 'The inner loop finished, so the outer one moves to row 2.', set: { row: 2 } },
            { line: 4, note: 'The inner loop **starts over** at column 1.', set: { col: 1 } },
            { line: 5, note: 'Print the pair.', print: '2,1' },
            { line: 4, note: 'Column 2.', set: { col: 2 } },
            { line: 5, note: 'Print the pair. 2 rows times 2 columns is 4 lines.', print: '2,2' },
          ],
          cta: 'Draw with it',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'A star triangle',
          body: 'Use nested loops to print:\n\n`*`\n\n`**`\n\n`***`\n\n`****`\n\nRow 1 has 1 star, row 2 has 2 stars, and so on.',
          starter: `public class Main {
    public static void main(String[] args) {
        // your code here
    }
}
`,
          tests: [
            { label: 'Prints the triangle', main: 'Main', out: '*\n**\n***\n****' },
            { label: 'Uses nested loops', src: '\\bfor\\b|\\bwhile\\b', min: 2, fail: 'Use one loop for rows and another for stars.' },
          ],
          hints: ['Outer loop: `row` from 1 to 4. Inner loop: `star` from 1 to `row`.', 'Inside use `System.out.print("*");`. After the inner loop, `System.out.println();` starts the next row.'],
          solution: {
            code: `public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 4; row++) {
            for (int star = 1; star <= row; star++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**One repeat for each row.**' },
              { lines: [4, 6], text: '**The inner limit changes.** It stops at `row`, which is what makes the triangle grow.' },
              { lines: [7, 7], text: '**End the row** after its stars are done.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can repeat anything.',
          body: 'Sequence, selection and iteration: you now have all three. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
