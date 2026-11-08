// COS 202 · Using the Java API · Lesson 2: ArrayList, Stack and Queue.
import { arrayListScene } from './memory-scenes';

export default {
  id: 'collections',
  title: 'ArrayList, Stack and Queue',
  covers: 'ArrayList methods and generics, arrays vs ArrayList, Stack (LIFO), Queue (FIFO)',
  minutes: 17,
  sections: [
    {
      name: 'ArrayList',
      terms: [
        ['ArrayList', 'A growable list: `ArrayList<String> list = new ArrayList<>();`. Methods: `add`, `get`, `set`, `remove`, `size`, `contains`.'],
        ['Generics', 'The type in angle brackets. It must be a class, so use `ArrayList<Integer>`, not `ArrayList<int>`.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does `Integer.parseInt("12") + 3` give?',
          options: [
            { text: '"123"', why: 'That would be the String "12" plus 3.' },
            { text: '123', why: 'After parsing, + is addition.' },
            { text: 'An exception', why: '"12" is a valid number.' },
            { text: '15', correct: true, why: 'parseInt turns the text into the int 12.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Using the Java API · Lesson 2',
          title: 'An array that grows',
          body: 'An array’s size is fixed. An ==ArrayList== grows and shrinks:\n\n`ArrayList<String> c = new ArrayList<>();`\n\n`c.add("COS202");`\n\n`c.get(0);` not `c[0]`\n\n`c.size();` not `c.length`\n\nIt holds **objects**, so numbers go in through wrappers: `ArrayList<Integer>`. It lives in `java.util`, so import it.',
          cta: 'Trace one',
        },
        arrayListScene,
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
          type: 'predict',
          eyebrow: 'Project · Tobi’s records app',
          title: 'Register and drop courses',
          body: 'An `ArrayList` grows as Tobi registers and shrinks when a course is dropped.\n\nWhat does it print?',
          code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> courses = new ArrayList<>();
        courses.add("MTH 201");
        courses.add("COS 202");
        courses.add("STA 221");
        courses.add(0, "GST 211");
        courses.remove("COS 202");
        System.out.println(courses);
        System.out.println(courses.size() + " " + courses.get(1));
    }
}`,
          options: [
            { out: '[GST 211, MTH 201, STA 221]\n3 MTH 201', correct: true, why: 'GST goes to the front, COS is removed by value and the rest close up: index 1 is MTH 201.' },
            { out: '[MTH 201, STA 221, GST 211]\n3 STA 221', why: '`add(0, ...)` inserts at the front, not the end.' },
            { out: '[GST 211, MTH 201, COS 202, STA 221]\n4 MTH 201', why: '`remove("COS 202")` removes it by value.' },
            { out: '[GST 211, MTH 201, STA 221]\n3 GST 211', why: '`get(1)` is the second item: MTH 201.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'When is a plain array still a better choice than an ArrayList?',
          options: [
            { text: 'Never', why: 'Fixed-size primitive data suits arrays well.' },
            { text: 'When you need to remove items', why: 'Removal is ArrayList’s strength.' },
            { text: 'When the size is fixed and known, and you want primitives without boxing, such as a 7-day sales table', correct: true, why: 'ArrayList only holds objects (Integer, not int) and shines when the size changes.' },
            { text: 'When the data is text', why: 'Both can hold Strings.' },
          ],
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
