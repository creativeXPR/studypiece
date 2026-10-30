// COS 202 · Using the Java API · Lesson 3: iterators and for-each.

export default {
  id: 'iterators',
  title: 'Iterators and for-each',
  covers: 'Iterator, hasNext, next and remove, for-each loops, ConcurrentModificationException, Enumeration',
  minutes: 9,
  sections: [
    {
      name: 'Walking through a collection',
      terms: [
        ['Iterator', 'An object that walks a collection: `hasNext()`, `next()`, and `remove()` for the last item returned.'],
        ['for-each', '`for (String s : list)` uses an iterator behind the scenes. Read-only for the list’s structure.'],
        ['ConcurrentModificationException', 'Thrown when a list is changed directly while being iterated.'],
        ['Enumeration', 'The older form of iterator: `hasMoreElements()` and `nextElement()`, with no remove.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Using the Java API · Lesson 3',
          title: 'A finger on the list',
          body: 'An ==iterator== works like a finger moving along a list:\n\n`Iterator<String> it = list.iterator();`\n\n`while (it.hasNext()) {`\n\n`    String s = it.next();`\n\n`}`\n\n`hasNext()` asks “is there another?”, and `next()` moves on and returns it. The ==for-each== loop is the same thing, written shorter.',
          cta: 'The classic trap',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Removing during a for-each',
          code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(List.of(1, 2, 3));
        try {
            for (int x : list) {
                if (x == 1) list.remove(0);
            }
            System.out.println(list);
        } catch (ConcurrentModificationException e) {
            System.out.println("Crashed");
        }
    }
}`,
          options: [
            { out: 'Crashed', correct: true, why: 'Changing the list directly behind the hidden iterator’s back throws `ConcurrentModificationException`.' },
            { out: '[2, 3]', why: 'The element is removed, but the loop’s next step detects the change and throws.' },
            { out: '[1, 2, 3]', why: '`list.remove(0)` does run before the crash.' },
            { out: '[3]', why: 'The loop never gets as far as a second removal.' },
          ],
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'Removing safely',
          code: `static void dropFails(List<Integer> marks) {
    for (int i = 0; i < marks.size(); i++) {
        if (marks.get(i) < 40) {
            marks.remove(i);
        }
    }
}`,
          ask: 'This skips an element after each removal. Which is correct?',
          options: [
            { code: `static void dropFails(List<Integer> marks) {
    Iterator<Integer> it = marks.iterator();
    while (it.hasNext()) {
        if (it.next() < 40) {
            it.remove();
        }
    }
}`, correct: true, why: '`it.remove()` removes safely and keeps the iterator in step.' },
            { code: `static void dropFails(List<Integer> marks) {
    for (int m : marks) {
        if (m < 40) marks.remove(Integer.valueOf(m));
    }
}`, why: 'That is the crash from the last screen.' },
            { code: `static void dropFails(List<Integer> marks) {
    Iterator<Integer> it = marks.iterator();
    while (it.hasNext()) {
        if (it.next() < 40) {
            marks.remove(0);
        }
    }
}`, why: 'It removes through the list, not the iterator: the wrong element, and then a crash.' },
          ],
          points: ['To remove while looping, use the **iterator’s** `remove()`.', 'After `list.remove(i)` in an indexed loop, the next element shifts into `i` and gets skipped.'],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Use an iterator',
          body: 'Write `removeNegatives(list)`, which removes every negative number **from the list it is given**, using an `Iterator`.',
          starter: `import java.util.*;

public class Main {
    static void removeNegatives(List<Integer> list) {
        // your code here
    }

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(4, -1, -2, 5));
        removeNegatives(nums);
        System.out.println(nums);
    }
}
`,
          tests: [
            { label: 'Removes neighbouring negatives', body: 'List<Integer> a = new ArrayList<>(List.of(4, -1, -2, 5)); Main.removeNegatives(a); return a;', expect: '[4, 5]' },
            { label: 'Keeps zero', body: 'List<Integer> a = new ArrayList<>(List.of(0, -3)); Main.removeNegatives(a); return a;', expect: '[0]' },
            { label: 'Uses an `Iterator`', src: 'Iterator\\s*<', fail: 'Get one with `list.iterator()`.' },
            { body: 'List<Integer> a = new ArrayList<>(); Main.removeNegatives(a); return a;', expect: '[]', hidden: true },
            { body: 'List<Integer> a = new ArrayList<>(List.of(-1, -2)); Main.removeNegatives(a); return a;', expect: '[]', hidden: true },
          ],
          hints: ['`while (it.hasNext())`, then call `it.next()` exactly once per pass.', 'Call `it.remove()`, not `list.remove(...)`.'],
          solution: {
            code: `import java.util.*;

public class Main {
    static void removeNegatives(List<Integer> list) {
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            if (it.next() < 0) {
                it.remove();
            }
        }
    }

    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(4, -1, -2, 5));
        removeNegatives(nums);
        System.out.println(nums);
    }
}
`,
            steps: [
              { lines: [5, 5], text: '**Ask the list** for an iterator.' },
              { lines: [7, 7], text: '**`next()` once per pass:** calling it twice would skip an element.' },
              { lines: [8, 8], text: '**`it.remove()`** removes the item `next()` just returned.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Iterators: done.',
          body: 'You can walk any collection safely. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
