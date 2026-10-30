// COS 202 · Recursion and algorithms · Lesson 2: linear and binary search.

export default {
  id: 'searching',
  title: 'Searching',
  covers: 'Linear search, binary search on sorted data, divide and conquer, iterative and recursive versions',
  minutes: 12,
  sections: [
    {
      name: 'Linear and binary search',
      terms: [
        ['Linear search', 'Check each element in turn. Works on any array; up to `n` comparisons.'],
        ['Binary search', 'On a **sorted** array, compare with the middle and discard half each time; about `log₂ n` comparisons.'],
        ['Divide and conquer', 'Split a problem into smaller parts, solve them, and combine the results. Binary search keeps just one part.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Recursion and algorithms · Lesson 2',
          title: 'Two ways to find a name',
          body: '==Linear search== is flipping through a list from the start. It always works, but it can check everything.\n\n==Binary search== is how you use a dictionary: open the middle, then throw away the half that can’t hold your word.\n\nIn 1,000,000 sorted items, linear may need 1,000,000 checks; binary needs about **20**. The catch: the data **must be sorted**.',
          cta: 'Watch it halve',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'Find `23` in `{4, 8, 15, 16, 23, 42, 50}`',
          items: [
            '`low = 0`, `high = 6`, so `mid = 3`: `16`',
            '`16 < 23`, so search the right half: `low = 4`',
            '`mid = 5`: `42`',
            '`42 > 23`, so search the left half: `high = 4`',
            '`mid = 4`: `23`. Found at index 4.',
          ],
          explain: 'Each comparison cuts the remaining range roughly in half.',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'A search that never ends',
          body: 'This should return the index of `key`, or `-1` if it is missing.',
          code: `public class Main {
    static int find(int[] a, int key) {
        int low = 0, high = a.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (a[mid] == key) return mid;
            if (a[mid] < key) low = mid;
            else high = mid - 1;
        }
        return 0;
    }
}`,
          errors: [
            { line: 7, kind: 'semantic', fixes: ['if (a[mid] < key) low = mid + 1;', 'if (a[mid] < key) high = mid + 1;', 'if (a[mid] > key) low = mid;'], why: '`low = mid` can leave the range unchanged, which loops forever. The middle has already been checked, so skip past it.' },
            { line: 10, kind: 'semantic', fixes: ['return -1;', 'return low;', 'return a.length;'], why: 'It compiles, but `0` is a valid index, so a missing key looks found at the start.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Write both searches',
          body: 'Each method returns the index of `key`, or `-1` if it is missing. `binary` may assume `a` is sorted in ascending order.',
          starter: `public class Main {
    static int linear(int[] a, int key) {
        // your code here
        return -1;
    }

    static int binary(int[] a, int key) {
        // your code here
        return -1;
    }

    public static void main(String[] args) {
        int[] a = {4, 8, 15, 16, 23, 42};
        System.out.println(linear(a, 16));
        System.out.println(binary(a, 42));
    }
}
`,
          tests: [
            { label: '`linear` finds 16 in an unsorted array', expr: 'Main.linear(new int[]{9, 16, 3}, 16)', expect: 1 },
            { label: '`binary` finds 42 at index 5', expr: 'Main.binary(new int[]{4, 8, 15, 16, 23, 42}, 42)', expect: 5 },
            { label: '`binary` finds the first element', expr: 'Main.binary(new int[]{4, 8, 15, 16, 23, 42}, 4)', expect: 0 },
            { label: 'A missing key gives -1', expr: 'Main.binary(new int[]{4, 8, 15}, 9)', expect: -1 },
            { expr: 'Main.linear(new int[]{1, 2}, 7)', expect: -1, hidden: true },
            { expr: 'Main.binary(new int[]{}, 7)', expect: -1, hidden: true },
            { expr: 'Main.binary(new int[]{5}, 5)', expect: 0, hidden: true },
          ],
          hints: ['Binary: keep `low` and `high`, and loop while `low <= high`.', 'Move `low` to `mid + 1` or `high` to `mid - 1`, never just to `mid`.'],
          solution: {
            code: `public class Main {
    static int linear(int[] a, int key) {
        for (int i = 0; i < a.length; i++) {
            if (a[i] == key) return i;
        }
        return -1;
    }

    static int binary(int[] a, int key) {
        int low = 0, high = a.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (a[mid] == key) return mid;
            if (a[mid] < key) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] a = {4, 8, 15, 16, 23, 42};
        System.out.println(linear(a, 16));
        System.out.println(binary(a, 42));
    }
}
`,
            steps: [
              { lines: [3, 6], text: '**Linear:** check each index, and only report “missing” after the loop ends.' },
              { lines: [10, 12], text: '**Binary:** track the range that could still hold the key, and test its middle.' },
              { lines: [14, 15], text: '**Discard half.** The middle is ruled out too, hence `+ 1` and `- 1`.' },
            ],
            note: 'Binary search can also be recursive: `return binary(a, key, mid + 1, high);`. The range shrinks with every call, and `low > high` is the base case.',
          },
        },
        {
          type: 'finish',
          title: 'Searching: done.',
          body: 'Linear works anywhere; binary needs sorted data and is far faster. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
