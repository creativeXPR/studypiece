// COS 202 · Using the Java API · Lesson 2: ArrayList, Stack and Queue.

export default {
  id: 'collections',
  title: 'ArrayList, Stack and Queue',
  covers: 'ArrayList methods and generics, arrays vs ArrayList, Stack (LIFO), Queue (FIFO)',
  minutes: 14,
  sections: [
    {
      name: 'ArrayList',
      terms: [
        ['ArrayList', 'A growable list: `ArrayList<String> list = new ArrayList<>();`. Methods: `add`, `get`, `set`, `remove`, `size`, `contains`.'],
        ['Generics', 'The type in angle brackets. It must be a class, so use `ArrayList<Integer>`, not `ArrayList<int>`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Using the Java API · Lesson 2',
          title: 'An array that grows',
          body: 'An array’s size is fixed. An ==ArrayList== grows and shrinks:\n\n`ArrayList<String> c = new ArrayList<>();`\n\n`c.add("COS202");`\n\n`c.get(0);` not `c[0]`\n\n`c.size();` not `c.length`\n\nIt holds **objects**, so numbers go in through wrappers: `ArrayList<Integer>`. It lives in `java.util`, so import it.',
          cta: 'Trace one',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Removing shifts everything',
          code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> c = new ArrayList<>();
        c.add("A");
        c.add("B");
        c.add("C");
        c.add(1, "X");
        c.remove(0);
        System.out.println(c);
        System.out.println(c.get(1));
        System.out.println(c.size());
    }
}`,
          options: [
            { out: '[X, B, C]\nB\n3', correct: true, why: '`add(1, "X")` inserts: `[A, X, B, C]`. `remove(0)` shifts the rest left.' },
            { out: '[B, X, C]\nX\n3', why: 'Inserting at index 1 puts `X` right after `A`.' },
            { out: '[A, X, B, C]\nX\n4', why: '`remove(0)` takes `A` out.' },
            { out: '[X, B, C]\nX\n3', why: 'After the shift, index 1 holds `B`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Registered courses',
          body: 'This should store marks and print how many there are, and the first one.',
          code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<int> marks = new ArrayList<>();
        marks.add(70);
        marks.add(55);
        System.out.println(marks.length);
        System.out.println(marks[0]);
    }
}`,
          errors: [
            { line: 5, kind: 'syntax', fixes: ['ArrayList<Integer> marks = new ArrayList<>();', 'ArrayList<Int> marks = new ArrayList<>();', 'ArrayList marks<int> = new ArrayList<>();'], why: 'Generics need a class, so use the wrapper `Integer`.' },
            { line: 8, kind: 'syntax', fixes: ['System.out.println(marks.size());', 'System.out.println(marks.length());', 'System.out.println(marks.count);'], why: 'Lists use `size()`.' },
            { line: 9, kind: 'syntax', fixes: ['System.out.println(marks.get(0));', 'System.out.println(marks.get[0]);', 'System.out.println(marks(0));'], why: 'Square brackets only work on arrays.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Work with a list of marks',
          body: 'Write `average(marks)`, returning the mean as a `double` (0 for an empty list), and `passes(marks)`, returning a **new** `ArrayList<Integer>` of the marks that are 40 or more.',
          starter: `import java.util.ArrayList;

public class Main {
    static double average(ArrayList<Integer> marks) {
        // your code here
        return 0;
    }

    static ArrayList<Integer> passes(ArrayList<Integer> marks) {
        // your code here
        return null;
    }

    public static void main(String[] args) {
        ArrayList<Integer> m = new ArrayList<>();
        m.add(70);
        m.add(30);
        m.add(50);
        System.out.println(average(m));
        System.out.println(passes(m));
    }
}
`,
          tests: [
            { label: 'Average of 70, 30, 50 is 50', body: 'java.util.ArrayList<Integer> m = new java.util.ArrayList<>(java.util.List.of(70, 30, 50)); return Main.average(m);', expect: 50, tol: 1e-9 },
            { label: 'The average keeps decimals', body: 'java.util.ArrayList<Integer> m = new java.util.ArrayList<>(java.util.List.of(1, 2)); return Main.average(m);', expect: 1.5, tol: 1e-9 },
            { label: '`passes` keeps 40 and above', body: 'java.util.ArrayList<Integer> m = new java.util.ArrayList<>(java.util.List.of(70, 30, 40)); return Main.passes(m);', expect: '[70, 40]' },
            { label: 'The original list is untouched', body: 'java.util.ArrayList<Integer> m = new java.util.ArrayList<>(java.util.List.of(70, 30)); Main.passes(m); return m.size();', expect: 2 },
            { expr: 'Main.average(new java.util.ArrayList<Integer>())', expect: 0, hidden: true },
            { body: 'return Main.passes(new java.util.ArrayList<Integer>()).size();', expect: 0, hidden: true },
          ],
          hints: ['`int / int` drops the decimal part: keep the total in a `double`.', 'Check for an empty list first, or you’ll divide by zero.'],
          solution: {
            code: `import java.util.ArrayList;

public class Main {
    static double average(ArrayList<Integer> marks) {
        if (marks.isEmpty()) return 0;
        double total = 0;
        for (int m : marks) total += m;
        return total / marks.size();
    }

    static ArrayList<Integer> passes(ArrayList<Integer> marks) {
        ArrayList<Integer> out = new ArrayList<>();
        for (int m : marks) {
            if (m >= 40) out.add(m);
        }
        return out;
    }

    public static void main(String[] args) {
        ArrayList<Integer> m = new ArrayList<>();
        m.add(70);
        m.add(30);
        m.add(50);
        System.out.println(average(m));
        System.out.println(passes(m));
    }
}
`,
            steps: [
              { lines: [5, 5], text: '**Guard the edge case:** an empty list has no average.' },
              { lines: [6, 8], text: '**A `double` total** keeps the decimals when dividing.' },
              { lines: [12, 16], text: '**Build a new list** instead of changing the one you were given.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'ArrayList: set.',
          recap: ['`add`, `get`, `size`, `remove`.', 'Use `Integer`, not `int`, in the angle brackets.'],
          why: 'Two more shapes for data: last in, and first in.',
        },
      ],
    },
    {
      name: 'Stack and Queue',
      terms: [
        ['Stack', 'Last in, first out (LIFO): `push`, `pop`, `peek`. Like a pile of plates.'],
        ['Queue', 'First in, first out (FIFO): `offer` or `add`, `poll`, `peek`. Often `new LinkedList<>()`. Like a line at the bank.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Plates and a line',
          code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Stack<Integer> s = new Stack<>();
        s.push(1);
        s.push(2);
        s.push(3);
        System.out.println(s.pop());

        Queue<Integer> q = new LinkedList<>();
        q.offer(1);
        q.offer(2);
        q.offer(3);
        System.out.println(q.poll());
        System.out.println(q.peek());
    }
}`,
          options: [
            { out: '3\n1\n2', correct: true, why: 'A stack gives back the newest (3). A queue gives back the oldest (1), and `peek` looks at the next without removing it.' },
            { out: '1\n1\n2', why: 'A stack is last in, first out.' },
            { out: '3\n3\n2', why: 'A queue is first in, first out.' },
            { out: '3\n1\n1', why: '`poll` removed 1, so the next in line is 2.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Do the brackets balance?',
          body: 'Write `balanced(s)` using a `Stack<Character>`: it is `true` when every `(`, `[` and `{` in `s` closes in the right order. Ignore all other characters.',
          starter: `import java.util.Stack;

public class Main {
    static boolean balanced(String s) {
        // your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(balanced("{ a[i] = (1 + 2); }"));
        System.out.println(balanced("( ]"));
    }
}
`,
          tests: [
            { label: 'Accepts nested brackets', expr: 'Main.balanced("{ a[i] = (1 + 2); }")', expect: true },
            { label: 'Rejects a mismatch', expr: 'Main.balanced("( ]")', expect: false },
            { label: 'Rejects an unclosed bracket', expr: 'Main.balanced("((")', expect: false },
            { label: 'Uses a `Stack`', src: 'Stack\\s*<', fail: 'Keep the open brackets on a `Stack<Character>`.' },
            { expr: 'Main.balanced(")")', expect: false, hidden: true },
            { expr: 'Main.balanced("")', expect: true, hidden: true },
            { expr: 'Main.balanced("([)]")', expect: false, hidden: true },
          ],
          hints: ['Push each opening bracket. On a closing one, the top of the stack must be its partner.', 'Check `isEmpty()` before `pop()`, and again at the very end.'],
          solution: {
            code: `import java.util.Stack;

public class Main {
    static boolean balanced(String s) {
        Stack<Character> open = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                open.push(c);
            } else if (c == ')' || c == ']' || c == '}') {
                if (open.isEmpty()) return false;
                char top = open.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return open.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(balanced("{ a[i] = (1 + 2); }"));
        System.out.println(balanced("( ]"));
    }
}
`,
            steps: [
              { lines: [7, 8], text: '**Openers wait** on the stack. The newest must close first: exactly last in, first out.' },
              { lines: [10, 10], text: '**Nothing open?** Then this closer has no partner.' },
              { lines: [11, 14], text: '**The top must match** the closing bracket.' },
              { lines: [17, 17], text: '**Finish empty:** anything left was never closed.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Collections: done.',
          body: 'List, stack and queue are all in your hands. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
