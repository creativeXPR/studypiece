// COS 202 · Java toolkit · Lesson 2: arrays and 2D arrays.

export default {
  id: 'arrays',
  title: 'Arrays and 2D arrays',
  covers: 'Declaring and creating arrays, default values, length, traversing, min and max, 2D arrays and matrices',
  minutes: 15,
  sections: [
    {
      name: 'Arrays',
      terms: [
        ['Array', 'A fixed-size collection of values of one type, reached by index. The first index is `0`.'],
        ['arr.length', 'How many elements an array has. It is a field, so there are no brackets. The last index is `length - 1`.'],
        ['Default values', '`new` fills an array with `0` for numbers, `false` for `boolean` and `null` for objects.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Java toolkit · Lesson 2',
          title: 'A row of numbered boxes',
          body: 'An ==array== holds many values of **one type**. Its size is fixed once created.\n\n`int[] a = new int[4];` makes 4 boxes, all `0`.\n\n`int[] b = {10, 20, 30};` creates and fills in one go.\n\nReach a box by its index: `b[0]` is `10`, and `b[2]` is the last one. `b[3]` crashes with `ArrayIndexOutOfBoundsException`.',
          cta: 'Try it',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Defaults and length',
          code: `public static void main(String[] args) {
    int[] a = new int[3];
    a[1] = 7;
    System.out.println(a[0]);
    System.out.println(a[1]);
    System.out.println(a.length);
    String[] s = new String[2];
    System.out.println(s[0]);
}`,
          options: [
            { out: '0\n7\n3\nnull', correct: true, why: 'Numbers start at `0`, objects like `String` start at `null`, and `length` counts all the boxes.' },
            { out: '7\n0\n3\nnull', why: 'Index 1 is the **second** box. `a[0]` was never set.' },
            { out: '0\n7\n2\nnull', why: '`length` is the number of boxes (3), not the last index (2).' },
            { out: '0\n7\n3\n', why: 'An empty `String` box holds `null`, and printing it shows the word `null`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Off by one',
          body: 'This should add up every mark and print the total.',
          code: `public class Main {
    public static void main(String[] args) {
        int[] marks = {50, 60, 70};
        int total = 0;
        for (int i = 0; i <= marks.length; i++) {
            total += marks[i];
        }
        System.out.println(total)
    }
}`,
          errors: [
            { line: 5, kind: 'semantic', fixes: ['for (int i = 0; i < marks.length; i++) {', 'for (int i = 1; i <= marks.length; i++) {', 'for (int i = 0; i <= marks.length(); i++) {'], why: 'It compiles, but `i` reaches 3, one past the last index: `ArrayIndexOutOfBoundsException`. Use `<`.' },
            { line: 8, kind: 'syntax', fixes: ['System.out.println(total);', 'System.out.println(total):', 'System.out.print(total)'], why: 'The statement is missing its `;`.' },
          ],
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'Just reading every element?',
          code: `static int sum(int[] a) {
    int total = 0;
    for (int i = 0; i < a.length; i++) {
        total = total + a[i];
    }
    return total;
}`,
          ask: 'Which is cleaner when you don’t need the index?',
          options: [
            { code: `static int sum(int[] a) {
    int total = 0;
    for (int x : a) {
        total += x;
    }
    return total;
}`, correct: true, why: 'The **for-each** loop reads “for each `x` in `a`”, and it can’t run off the end.' },
            { code: `static int sum(int[] a) {
    int total = 0;
    int i = 0;
    while (i < a.length) {
        total = total + a[i];
        i = i + 1;
    }
    return total;
}`, why: 'Correct, but longer, and you have to manage `i` yourself.' },
            { code: `static int sum(int[] a) {
    int total = 0;
    for (int x : a) {
        total = x;
    }
    return total;
}`, why: 'This just keeps the last element. It needs `+=`.' },
          ],
          points: ['Use **for-each** to read every element.', 'Use an indexed `for` when you need the position, or when you change elements.'],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Find the maximum and minimum',
          body: 'Write `max(a)` and `min(a)`. Each array has at least one element. Don’t use any library methods.',
          starter: `public class Main {
    static int max(int[] a) {
        // your code here
        return 0;
    }

    static int min(int[] a) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        int[] nums = {4, 9, 1, 7, 3, 8, 2, 6};
        System.out.println("Max: " + max(nums));
        System.out.println("Min: " + min(nums));
    }
}
`,
          tests: [
            { label: '`max` of {4, 9, 1} is 9', expr: 'Main.max(new int[]{4, 9, 1})', expect: 9 },
            { label: '`min` of {4, 9, 1} is 1', expr: 'Main.min(new int[]{4, 9, 1})', expect: 1 },
            { label: '`main` prints both', main: 'Main', out: 'Max: 9\nMin: 1' },
            { expr: 'Main.max(new int[]{-5, -2, -9})', expect: -2, hidden: true },
            { expr: 'Main.min(new int[]{5})', expect: 5, hidden: true },
            { expr: 'Main.min(new int[]{3, 8, 2})', expect: 2, hidden: true },
          ],
          hints: ['Start your answer at `a[0]`, not `0`: an array of negatives has a maximum below 0.', 'Loop through the rest and replace your answer when you find something bigger.'],
          solution: {
            code: `public class Main {
    static int max(int[] a) {
        int best = a[0];
        for (int x : a) {
            if (x > best) best = x;
        }
        return best;
    }

    static int min(int[] a) {
        int best = a[0];
        for (int x : a) {
            if (x < best) best = x;
        }
        return best;
    }

    public static void main(String[] args) {
        int[] nums = {4, 9, 1, 7, 3, 8, 2, 6};
        System.out.println("Max: " + max(nums));
        System.out.println("Min: " + min(nums));
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**Start with a real element.** Starting at `0` would break for all-negative arrays.' },
              { lines: [4, 6], text: '**Keep the best so far.** Compare each element and replace when it wins.' },
              { lines: [11, 14], text: '`min` is the same idea with `<`.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'One dimension: done.',
          recap: ['Indexes run from `0` to `length - 1`.', 'Start max and min at `a[0]`.'],
          why: 'Now arrays of arrays: tables.',
        },
      ],
    },
    {
      name: '2D arrays',
      terms: [
        ['2D array', 'An array of arrays: `int[][] m = new int[rows][cols];`. Reach a cell with `m[row][col]`.'],
        ['Total size', 'The product of the dimensions: `new int[3][5][7]` holds 105 elements.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Reading a table',
          body: 'In a 2D array, `m.length` counts the **rows**, and `m[0].length` counts the columns in row 0.',
          code: `public static void main(String[] args) {
    int[][] m = { {1, 2, 3}, {4, 5, 6} };
    System.out.println(m.length);
    System.out.println(m[0].length);
    System.out.println(m[1][2]);
}`,
          options: [
            { out: '2\n3\n6', correct: true, why: '2 rows, 3 columns, and row 1 column 2 (both counted from 0) is `6`.' },
            { out: '3\n2\n6', why: '`m.length` counts rows: there are 2 inner arrays.' },
            { out: '2\n3\n2', why: '`m[1][2]` is row index 1, the second row.' },
            { out: '6\n3\n6', why: '`m.length` is the number of rows, not the number of cells.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Add two matrices',
          body: 'Write `add(a, b)`: it returns a new 2D array where each cell is `a[i][j] + b[i][j]`. Both matrices have the same shape.',
          starter: `public class Main {
    static int[][] add(int[][] a, int[][] b) {
        // your code here
        return null;
    }

    public static void main(String[] args) {
        int[][] a = { {1, 2}, {3, 4} };
        int[][] b = { {5, 6}, {7, 8} };
        int[][] c = add(a, b);
        for (int[] row : c) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }
}
`,
          tests: [
            { label: 'Adds two 2 × 2 matrices', expr: 'Main.add(new int[][]{{1, 2}, {3, 4}}, new int[][]{{5, 6}, {7, 8}})', expect: [[6, 8], [10, 12]] },
            { label: 'Prints in rows', main: 'Main', out: '6 8\n10 12' },
            { expr: 'Main.add(new int[][]{{1, 2, 3}}, new int[][]{{1, 1, 1}})', expect: [[2, 3, 4]], hidden: true },
            { expr: 'Main.add(new int[][]{{1}, {2}, {3}}, new int[][]{{0}, {0}, {1}})', expect: [[1], [2], [4]], hidden: true },
          ],
          hints: ['Create the result first: `new int[a.length][a[0].length]`.', 'Use two nested indexed loops: rows outside, columns inside.'],
          solution: {
            code: `public class Main {
    static int[][] add(int[][] a, int[][] b) {
        int[][] c = new int[a.length][a[0].length];
        for (int i = 0; i < a.length; i++) {
            for (int j = 0; j < a[i].length; j++) {
                c[i][j] = a[i][j] + b[i][j];
            }
        }
        return c;
    }

    public static void main(String[] args) {
        int[][] a = { {1, 2}, {3, 4} };
        int[][] b = { {5, 6}, {7, 8} };
        int[][] c = add(a, b);
        for (int[] row : c) {
            for (int x : row) System.out.print(x + " ");
            System.out.println();
        }
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**Make the result** with the same rows and columns as `a`.' },
              { lines: [4, 8], text: '**Nested loops** visit every cell, row by row.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Arrays: done.',
          body: 'You can create, traverse and search arrays and tables. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
