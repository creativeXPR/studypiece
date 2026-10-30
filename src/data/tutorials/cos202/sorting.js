// COS 202 · Recursion and algorithms · Lesson 3: selection, bubble and insertion sort.

export default {
  id: 'sorting',
  title: 'Sorting',
  covers: 'Selection sort pass by pass, bubble sort, insertion sort, swapping, writing selection sort',
  minutes: 15,
  sections: [
    {
      name: 'Three simple sorts',
      terms: [
        ['Selection sort', 'Each pass finds the smallest remaining element and swaps it into place. After pass `i`, the first `i` elements are final.'],
        ['Bubble sort', 'Repeatedly swap neighbouring elements that are out of order. The largest “bubbles” to the end each pass.'],
        ['Insertion sort', 'Take each element in turn and slide it back into its place among those already sorted.'],
        ['Swap', 'Needs a temporary variable: `int t = a[i]; a[i] = a[j]; a[j] = t;`'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Recursion and algorithms · Lesson 3',
          title: 'Selection sort, one pass at a time',
          body: '==Selection sort==: find the smallest element, swap it to the front, then repeat on the rest.\n\n`Start:  29 10 14 37 13`\n\n`Pass 1: 10 29 14 37 13` (10 swaps with 29)\n\n`Pass 2: 10 13 14 37 29` (13 swaps with 29)\n\n`Pass 3: 10 13 14 37 29` (14 is already in place)\n\n`Pass 4: 10 13 14 29 37` (29 swaps with 37)\n\nAn array of `n` elements needs `n − 1` passes: the last element is then in place automatically.',
          cta: 'Your trace',
        },
        {
          type: 'choice',
          eyebrow: 'Trace it',
          prompt: 'Selection sort on `{8, 3, 5, 1}`. What does the array look like after **pass 2**?',
          options: [
            { text: '`{1, 3, 5, 8}`', correct: true, why: 'Pass 1 swaps 1 with 8: `{1, 3, 5, 8}`. Pass 2 finds 3 already in place.' },
            { text: '`{1, 3, 8, 5}`', why: 'Pass 1 swaps the smallest (1) with the first element (8), not with its neighbour.' },
            { text: '`{3, 1, 5, 8}`', why: 'That is more like bubble sort. Selection puts the smallest at the front first.' },
            { text: '`{3, 8, 5, 1}`', why: 'A pass finds the smallest of **all** the remaining elements.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort the sorts',
          prompt: 'Which algorithm does each sentence describe?',
          buckets: [
            { id: 's', label: 'Selection' },
            { id: 'b', label: 'Bubble' },
            { id: 'i', label: 'Insertion' },
          ],
          items: [
            { text: 'Finds the smallest of the rest, then swaps once', bucket: 's', why: '**Selection** makes at most one swap per pass.' },
            { text: 'Compares neighbours and swaps many times', bucket: 'b', why: '**Bubble** works on neighbouring pairs.' },
            { text: 'After a pass, the largest is at the end', bucket: 'b', why: '**Bubble** carries the largest to the end.' },
            { text: 'Like sorting playing cards in your hand', bucket: 'i', why: '**Insertion** slides each new card into place.' },
            { text: 'The first `i` elements are the `i` smallest', bucket: 's', why: 'That is **selection**’s guarantee after pass `i`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The swap that loses a number',
          body: 'This selection sort should sort `a` in ascending order.',
          code: `public class Main {
    static void sort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int small = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] > a[small]) small = j;
            }
            int t = a[i];
            a[i] = a[small];
            a[small] = a[i];
        }
    }
}`,
          errors: [
            { line: 6, kind: 'semantic', fixes: ['if (a[j] < a[small]) small = j;', 'if (a[j] < a[i]) i = j;', 'if (a[j] > a[small]) j = small;'], why: 'It compiles, but `>` finds the largest, so the array ends up in the wrong order.' },
            { line: 10, kind: 'semantic', fixes: ['a[small] = t;', 'a[i] = t;', 't = a[small];'], why: 'It compiles, but `a[i]` was overwritten on the line above, so the original value is lost. That is what the temporary `t` saved.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Write selection sort',
          body: 'Write `selectionSort(a)`, which sorts `a` **in place** in ascending order. `main` prints the result.',
          starter: `public class Main {
    static void selectionSort(int[] a) {
        // your code here
    }

    public static void main(String[] args) {
        int[] a = {34, 56, 4, 10, 77, 51, 93, 30, 5, 52};
        selectionSort(a);
        for (int x : a) System.out.print(x + " ");
        System.out.println();
    }
}
`,
          tests: [
            { label: 'Sorts a short array', body: 'int[] a = {8, 3, 5, 1}; Main.selectionSort(a); return a;', expect: [1, 3, 5, 8] },
            { label: '`main` prints the sorted array', main: 'Main', out: '4 5 10 30 34 51 52 56 77 93' },
            { label: 'Uses nested loops, no library sort', src: 'Arrays\\.sort', absent: true, fail: 'Write the passes yourself instead of calling `Arrays.sort`.' },
            { body: 'int[] a = {}; Main.selectionSort(a); return a;', expect: [], hidden: true },
            { body: 'int[] a = {2, 2, 1}; Main.selectionSort(a); return a;', expect: [1, 2, 2], hidden: true },
            { body: 'int[] a = {1, 2, 3}; Main.selectionSort(a); return a;', expect: [1, 2, 3], hidden: true },
          ],
          hints: ['Outer loop: `i` from 0 to `a.length - 2`. Remember the index of the smallest, starting at `i`.', 'Inner loop: `j` from `i + 1` to the end. After it, swap `a[i]` with `a[small]`.'],
          solution: {
            code: `public class Main {
    static void selectionSort(int[] a) {
        for (int i = 0; i < a.length - 1; i++) {
            int small = i;
            for (int j = i + 1; j < a.length; j++) {
                if (a[j] < a[small]) small = j;
            }
            int t = a[i];
            a[i] = a[small];
            a[small] = t;
        }
    }

    public static void main(String[] args) {
        int[] a = {34, 56, 4, 10, 77, 51, 93, 30, 5, 52};
        selectionSort(a);
        for (int x : a) System.out.print(x + " ");
        System.out.println();
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**`n − 1` passes.** Once all but one are placed, the last is too.' },
              { lines: [4, 7], text: '**Find the smallest** of the unsorted part. Keep its index, not its value, so you can swap.' },
              { lines: [8, 10], text: '**Swap** with a temporary variable, so nothing is lost.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Sorting: done.',
          body: 'You can trace three sorts and write selection sort from memory. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
