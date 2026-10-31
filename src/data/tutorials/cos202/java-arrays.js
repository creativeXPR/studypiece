// COS 202 · Intro to Java · Module 7: arrays, traversal, 2D arrays, java.util.Arrays.

export default {
  id: 'java-arrays',
  title: 'Arrays: many values, one name',
  covers: 'creating arrays, indexes, length, default values, for and for-each traversal, 2D arrays, java.util.Arrays',
  minutes: 7,
  sections: [
    {
      name: 'A row of boxes',
      terms: [
        ['Array', 'A fixed-size, ordered row of values of the same type. `int[] nums = {3, 6, 9};`'],
        ['Index', 'A slot’s position. The first is 0, the last is `length - 1`.'],
        ['length', '`nums.length` is the number of slots. No brackets, unlike `length()` on a String.'],
        ['for-each', '`for (int n : nums)` visits each value in turn. Use a normal `for` if you need the index or want to change slots.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Why arrays',
          title: 'One name for a whole row',
          body: 'Fifty marks would need fifty variables. An ==array== keeps them in one numbered row:\n\n`int[] marks = {70, 55, 88};`\n\n`marks[0]` is 70, `marks[1]` is 55, and `marks[2]` is 88.\n\nThree rules: the size is **fixed** once created, every value has the **same type**, and counting **starts at 0**.\n\nTo make an empty one, say how many slots: `int[] a = new int[5];` gives five zeros. (`double` slots start at `0.0`, `boolean` at `false`, `String` at `null`.)',
          cta: 'See one in action',
        },
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'A loop walks along the row',
          body: 'Arrays and loops belong together: `i` runs through the positions, so `marks[i]` reaches each value.',
          code: `public class Main {
    public static void main(String[] args) {
        int[] marks = {70, 55, 88};
        int total = 0;
        for (int i = 0; i < marks.length; i++) {
            total += marks[i];
        }
        System.out.println(total);
    }
}`,
          frames: [
            { line: 3, note: 'Three slots, positions 0, 1 and 2.', set: { marks: '{70, 55, 88}' } },
            { line: 4, note: 'A running total.', set: { total: 0 } },
            { line: 5, note: '`i` starts at **0**. `marks.length` is 3, and `0 < 3`.', set: { i: 0 } },
            { line: 6, note: '`marks[0]` is 70.', set: { total: 70 } },
            { line: 5, note: '`i` is 1, and `1 < 3`.', set: { i: 1 } },
            { line: 6, note: '`marks[1]` is 55.', set: { total: 125 } },
            { line: 5, note: '`i` is 2, and `2 < 3`.', set: { i: 2 } },
            { line: 6, note: '`marks[2]` is 88.', set: { total: 213 } },
            { line: 5, note: '`i` is 3. `3 < 3` is false, so stop. Good: `marks[3]` doesn’t exist.', set: { i: 3 } },
            { line: 8, note: 'Print the total.', drop: ['i'], print: '213' },
          ],
          cta: 'Spot the classic bug',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'One step too far',
          body: 'This should print all three values. It compiles, prints them, then crashes with `ArrayIndexOutOfBoundsException`.',
          code: `public class Main {
    public static void main(String[] args) {
        int[] a = {4, 8, 2};
        for (int i = 0; i <= a.length; i++) {
            System.out.println(a[i]);
        }
    }
}`,
          errors: [
            { line: 4, kind: 'semantic', fixes: ['for (int i = 0; i < a.length; i++) {', 'for (int i = 1; i <= a.length; i++) {', 'for (int i = 0; i <= a.length(); i++) {'], why: 'The last position is `length - 1`. With `<=`, `i` reaches 3 and `a[3]` doesn’t exist. Use `<`.' },
          ],
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'Just reading each value?',
          code: `public static void main(String[] args) {
    int[] a = {4, 8, 2};
    for (int i = 0; i < a.length; i++) {
        System.out.println(a[i]);
    }
}`,
          ask: 'Which is cleaner when you don’t need the position?',
          options: [
            { code: `public static void main(String[] args) {
    int[] a = {4, 8, 2};
    for (int x : a) {
        System.out.println(x);
    }
}`, correct: true, why: 'The ==for-each== loop reads “for each `x` in `a`”, and it can’t run off the end.' },
            { code: `public static void main(String[] args) {
    int[] a = {4, 8, 2};
    System.out.println(a[0]);
    System.out.println(a[1]);
    System.out.println(a[2]);
}`, why: 'It works for three values, but not for fifty, and it breaks if the array changes.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Find the highest mark',
          body: 'Print the largest value in `marks`, using a loop. Your program should keep working if the marks change.',
          starter: `public class Main {
    public static void main(String[] args) {
        int[] marks = {62, 91, 45, 78};
        // your code here
    }
}
`,
          tests: [
            { label: 'Prints `91`', main: 'Main', out: '91' },
            { label: 'Uses a loop', src: '\\b(for|while)\\b', fail: 'Walk through the array with a loop.' },
            { label: 'Doesn’t just print 91', src: 'println\\s*\\(\\s*91', absent: true, fail: 'Work out the answer rather than typing it.' },
          ],
          hints: ['Start with `int highest = marks[0];`', 'For each mark: `if (m > highest) highest = m;`'],
          solution: {
            code: `public class Main {
    public static void main(String[] args) {
        int[] marks = {62, 91, 45, 78};
        int highest = marks[0];
        for (int m : marks) {
            if (m > highest) {
                highest = m;
            }
        }
        System.out.println(highest);
    }
}
`,
            steps: [
              { lines: [4, 4], text: '**Start from a real value.** Starting at 0 would fail if every mark were negative.' },
              { lines: [5, 9], text: '**Keep the best so far.** The same idea as finding the largest of three.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'Rows handled.',
          recap: ['Positions run from 0 to `length - 1`.', 'A loop walks an array; for-each is the clean way to read it.'],
          why: 'Next: tables, and Java’s ready-made array tools.',
        },
      ],
    },
    {
      name: 'Tables and tools',
      terms: [
        ['2D array', 'An array of arrays: rows and columns. `grid[row][col]`, with `grid.length` rows.'],
        ['java.util.Arrays', 'Ready-made tools: `sort`, `toString`, `binarySearch`, `copyOf`, `equals`, `fill`.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Row first, then column',
          body: 'A ==2D array== is a table. Each row is itself an array, and positions still start at 0.',
          code: `public static void main(String[] args) {
    int[][] m = {
        {1, 2, 3},
        {4, 5, 6}
    };
    System.out.println(m[1][2]);
    System.out.println(m.length);
    System.out.println(m[0].length);
}`,
          options: [
            { out: '6\n2\n3', correct: true, why: 'Row 1 (the second) and column 2 (the third) hold 6. There are 2 rows, and row 0 has 3 values.' },
            { out: '2\n2\n3', why: 'Positions start at 0, and the row comes first: `m[1]` is `{4, 5, 6}`.' },
            { out: '6\n3\n2', why: '`m.length` counts rows; `m[0].length` counts the columns of that row.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'java.util.Arrays',
          title: 'Don’t rewrite what Java gives you',
          body: 'Add `import java.util.Arrays;` at the top of the file.',
          cards: [
            { title: 'sort', text: '`Arrays.sort(a)` puts the values in ascending order.' },
            { title: 'toString', text: '`Arrays.toString(a)` gives text like `[1, 2, 3]`. Printing `a` directly shows a memory code instead.' },
            { title: 'binarySearch', text: '`Arrays.binarySearch(a, 8)` finds the position of 8. The array must be sorted first.' },
            { title: 'copyOf', text: '`Arrays.copyOf(a, a.length)` makes a new array with the same values.' },
            { title: 'equals', text: '`Arrays.equals(a, b)` compares contents. `a == b` doesn’t.' },
            { title: 'fill', text: '`Arrays.fill(a, 7)` sets every slot to 7.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Sort, then search',
          code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] n = {5, 2, 8, 1};
        Arrays.sort(n);
        System.out.println(Arrays.toString(n));
        System.out.println(Arrays.binarySearch(n, 8));
    }
}`,
          options: [
            { out: '[1, 2, 5, 8]\n3', correct: true, why: 'After sorting, 8 sits at position 3.' },
            { out: '[5, 2, 8, 1]\n2', why: '`sort` changes the array itself, so 8 has moved.' },
            { out: '[1, 2, 5, 8]\n4', why: 'Positions start at 0, so the fourth slot is position 3.' },
          ],
        },
        {
          type: 'finish',
          title: 'Arrays: done.',
          body: 'You can store, walk and sort whole collections of values. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
