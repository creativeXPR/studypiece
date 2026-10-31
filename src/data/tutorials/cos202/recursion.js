// COS 202 · Recursion and algorithms · Lesson 1: recursion (base case, tracing, factorial, Fibonacci).

const SUM = `public class Main {
    static int sum(int k) {
        if (k > 0) {
            return k + sum(k - 1);   // recursive step
        } else {
            return 0;                // base case
        }
    }

    public static void main(String[] args) {
        System.out.println(sum(10));
    }
}
`;

const SOLUTION = `public class Main {
    static long factorial(int n) {
        if (n <= 1) return 1;              // base case: 0! = 1! = 1
        return n * factorial(n - 1);       // n! = n × (n-1)!
    }

    static int fibonacci(int n) {
        if (n <= 1) return n;              // fib(0) = 0, fib(1) = 1
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
        System.out.println("5! = " + factorial(5));
    }
}
`;

export default {
  id: 'recursion',
  title: 'Recursion',
  covers: 'Base case and recursive step, tracing the call stack, StackOverflowError, factorial and Fibonacci, writing and debugging recursive methods',
  minutes: 20,
  sections: [
    {
      name: 'Calling yourself',
      terms: [
        ['Recursion', 'A method calling itself to solve a smaller copy of the same problem.'],
        ['Base case', 'The simplest input, answered directly without another call. It stops the recursion.'],
        ['Recursive step', 'Do a little work, then call the method on a smaller input that moves towards the base case.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Recursion and algorithms · Lesson 1',
          title: 'A method that calls itself',
          body: '==Recursion== is when a method calls **itself** to solve a smaller copy of the same problem.\n\nEvery recursive method has two parts:\n\n**1. The base case:** the simplest input, answered straight away with no more calls. This is what stops it.\n\n**2. The recursive step:** do a little work, then call the method again on a **smaller** input, one step closer to the base case.',
          cta: 'See one run',
        },
        {
          type: 'code',
          eyebrow: 'Try it',
          title: 'Run your first recursive method',
          body: '`sum(k)` adds `k + (k − 1) + … + 1`. Press **▶ Run** to see `sum(10)`. Then change `main` so it prints `sum(100)`, and press **Check my code**.',
          starter: SUM,
          tests: [
            { label: '`main` prints the sum of 1 to 100', main: 'Main', out: '5050' },
            { label: '`sum(10)` still returns 55', expr: 'Main.sum(10)', expect: 55 },
          ],
          hints: ['Only one number in `main` needs to change.'],
          solution: {
            code: SUM.replace('sum(10)', 'sum(100)'),
            steps: [{ lines: [11, 11], text: 'Only the argument changes: `sum(100)` works out `100 + 99 + … + 1 = 5050`, one call per number.' }],
          },
          explain: 'Behind that one line, `sum` ran **101 times**: `sum(100)`, `sum(99)`, … down to `sum(0)`, the base case.',
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'Complete the factorial method',
          body: '`n!` (n factorial) is `n × (n − 1) × … × 1`, and `0! = 1! = 1`. Drop the right words into the gaps.',
          code: `static int factorial(int n) {
    [[if]] (n <= 1) {
        [[return]] 1;
    }
    return n * [[factorial]](n - 1);
}`,
          bank: ['while', 'break', 'void', 'sum'],
          explain: 'The `if` is the **base case**, and `factorial(n - 1)` is the **recursive step**: `5! = 5 × 4!`.',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'What happens when a recursive method has **no** base case?',
          options: [
            { text: 'It calls itself forever until Java throws a `StackOverflowError`', correct: true, why: 'Each call takes a little memory on the call stack. Without a base case the calls never stop, and the stack runs out.' },
            { text: 'It returns `0`', why: 'Nothing tells it to return. It just keeps calling itself.' },
            { text: 'The code won’t compile', why: 'It compiles fine: the compiler doesn’t check that recursion stops. That makes it a **semantic** error.' },
            { text: 'It runs once and stops', why: 'Every call makes another call, so it never stops by itself.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Recursion: unlocked.',
          recap: ['A base case stops the calls.', 'A recursive step shrinks the problem.'],
          why: 'Next: follow the calls one by one, as an examiner will ask you to.',
        },
      ],
    },
    {
      name: 'Tracing the calls',
      terms: [
        ['Call stack', 'Each call waits on the stack until the call it made returns; results combine on the way back up.'],
        ['StackOverflowError', 'Thrown when calls never reach a base case and the stack runs out of space.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The call stack',
          title: 'Down to the base, then back up',
          body: 'When `sum(3)` runs, it can’t finish until `sum(2)` answers, which waits for `sum(1)`, which waits for `sum(0)`. Each waiting call sits on the ==call stack==.\n\n`sum(3) = 3 + sum(2)`\n`       = 3 + (2 + sum(1))`\n`       = 3 + (2 + (1 + sum(0)))`\n`       = 3 + (2 + (1 + 0)) = 6`\n\nThe calls go **down** until the base case, then the answers come back **up** and combine.',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'What does this print?',
          code: `static int sum(int k) {
    if (k == 0) return 0;
    return k + sum(k - 1);
}

public static void main(String[] args) {
    System.out.println(sum(4));
}`,
          options: [
            { out: '10', correct: true, why: '`4 + 3 + 2 + 1 + 0 = 10`.' },
            { out: '4', why: 'That is only the first call’s `k`. Every call adds its own `k`.' },
            { out: '6', why: 'That is `sum(3)`. Don’t forget the `4` from the first call.' },
            { out: '0', why: '`0` is only what the base case returns; the other calls add to it on the way back up.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Code before and after the call',
          body: 'Lines **before** the recursive call run on the way down. Lines **after** it wait, and run on the way back up.',
          code: `static void count(int n) {
    if (n == 0) return;
    System.out.println("down " + n);
    count(n - 1);
    System.out.println("up " + n);
}

public static void main(String[] args) {
    count(2);
}`,
          options: [
            { out: 'down 2\ndown 1\nup 1\nup 2', correct: true, why: 'Both “down” lines print first. Then the waiting calls finish in reverse order: the deepest one (`n = 1`) first.' },
            { out: 'down 2\nup 2\ndown 1\nup 1', why: '`up 2` can’t print until `count(1)` has completely finished.' },
            { out: 'down 2\ndown 1\nup 2\nup 1', why: 'The waiting calls finish in **reverse** order, deepest first.' },
            { out: 'down 2\ndown 1', why: 'The lines after the recursive call still run, once each call returns.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'Order the steps of `factorial(3)`',
          items: [
            '`factorial(3)` calls `factorial(2)`',
            '`factorial(2)` calls `factorial(1)`',
            '`factorial(1)` hits the base case and returns `1`',
            '`factorial(2)` returns `2 × 1 = 2`',
            '`factorial(3)` returns `3 × 2 = 6`',
          ],
          explain: 'Calls go down to the base case; results come back up, each multiplying as it returns.',
        },
        {
          type: 'bridge',
          title: 'You can trace it.',
          recap: ['Calls stack up until the base case.', 'Code after the call runs on the way back, deepest first.'],
          why: 'Now spot what goes wrong in broken recursive code.',
        },
      ],
    },
    {
      name: 'Debug and improve',
      terms: [
        ['Syntax error', 'Breaks Java’s grammar, so the code won’t compile (a missing `;`, a misspelt keyword).'],
        ['Semantic error', 'The code compiles but does the wrong thing, or fails when it runs.'],
      ],
      screens: [
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'This class won’t do its job',
          body: 'It should print `5!` and the 6th Fibonacci number.',
          code: `public class Recursion {
    static int factorial(int n) {
        return n * factorial(n - 1);
    }

    static int fibonacci(int n) {
        if (n <= 1) return n
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    static void main(String[] args) {
        System.out.println(factorial(5));
        System.out.println(fibonacci(6));
    }
}`,
          errors: [
            {
              line: 3,
              kind: 'semantic',
              fixes: ['if (n <= 1) return 1; return n * factorial(n - 1);', 'return n * factorial(n);', 'return factorial(n - 1);'],
              why: 'No base case, so it never stops: a `StackOverflowError` at run time. It compiles, so it is semantic.',
            },
            {
              line: 7,
              kind: 'syntax',
              fixes: ['if (n <= 1) return n;', 'if (n <= 1) return n:', 'if (n < 1) return n'],
              why: 'A statement must end with `;`, so it won’t compile.',
            },
            {
              line: 11,
              kind: 'semantic',
              fixes: ['public static void main(String[] args) {', 'static int main(String[] args) {', 'public void main(String[] args) {'],
              why: 'It compiles, but Java can only start a program from `public static void main`. Without `public` it reports “main method not found”.',
            },
          ],
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'Too many base cases',
          code: `static int sum(int k) {
    if (k == 0) return 0;
    if (k == 1) return 1;
    if (k == 2) return 3;
    return k + sum(k - 1);
}`,
          ask: 'Which version is cleaner and safer?',
          options: [
            { code: `static int sum(int k) {
    if (k <= 0) return 0;
    return k + sum(k - 1);
}`, correct: true, why: 'One base case covers 0 **and** any negative input, and the recursive step does the rest.' },
            { code: `static int sum(int k) {
    return k + sum(k - 1);
}`, why: 'Shorter, but with no base case it never stops.' },
            { code: `static int sum(int k) {
    if (k == 0) return 0;
    if (k == 1) return 1;
    return k + sum(k - 1);
}`, why: 'Still an extra base case, and `sum(-1)` would skip past 0 and never stop.' },
          ],
          points: ['Keep **one** base case where you can: extra ones are noise.', 'Use `<=` rather than `==`, so bad input like `-3` still stops.'],
        },
        {
          type: 'bridge',
          title: 'Bugs squashed.',
          recap: ['Missing base case: semantic (it compiles, then overflows).', 'Missing `;`: syntax (it won’t compile).'],
          why: 'Time to write recursion yourself.',
        },
      ],
    },
    {
      name: 'Write it yourself',
      terms: [
        ['Factorial', '`n! = n × (n − 1)!`, with `0! = 1! = 1`.'],
        ['Fibonacci', '`0, 1, 1, 2, 3, 5, 8, …`: each term is the sum of the two before it.'],
      ],
      screens: [
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Factorial and Fibonacci',
          body: 'Write both methods **recursively** (no loops inside them). `factorial(5)` should return `120`, and `fibonacci(n)` should give the n-th term of `0, 1, 1, 2, 3, 5, 8, …`.',
          starter: `public class Main {
    // Return n! (n factorial). 0! = 1 and 1! = 1.
    static long factorial(int n) {
        // your code here
        return 0;
    }

    // Return the n-th Fibonacci number: 0, 1, 1, 2, 3, 5, 8, ...
    static int fibonacci(int n) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        System.out.println();
        System.out.println("5! = " + factorial(5));
    }
}
`,
          tests: [
            { label: '`factorial(5)` returns 120', expr: 'Main.factorial(5)', expect: 120 },
            { label: '`factorial(1)` returns 1', expr: 'Main.factorial(1)', expect: 1 },
            { label: '`fibonacci(6)` returns 8', expr: 'Main.fibonacci(6)', expect: 8 },
            { label: '`fibonacci(1)` returns 1', expr: 'Main.fibonacci(1)', expect: 1 },
            { label: '`factorial` calls itself', src: '\\bfactorial\\s*\\(', min: 3, fail: '`factorial` should call `factorial(n - 1)`: that is what makes it recursive.' },
            { label: '`fibonacci` calls itself', src: '\\bfibonacci\\s*\\(', min: 4, fail: '`fibonacci` should call itself twice: `fibonacci(n - 1) + fibonacci(n - 2)`.' },
            { expr: 'Main.factorial(0)', expect: 1, hidden: true },
            { expr: 'Main.fibonacci(0)', expect: 0, hidden: true },
            { expr: 'Main.factorial(15)', expect: 1307674368000, hidden: true },
            { main: 'Main', out: '0 1 1 2 3 5 8 13 21 34\n5! = 120', hidden: true },
          ],
          hints: ['Start each method with its base case: `if (n <= 1) return …;`', 'factorial: `n * factorial(n - 1)`. fibonacci: add the two previous terms.'],
          solution: {
            code: SOLUTION,
            steps: [
              { lines: [3, 3], text: '**Base case first.** `0!` and `1!` are both 1, so `n <= 1` covers them, and it even stops bad input like `-2`.' },
              { lines: [4, 4], text: '**Recursive step.** `n! = n × (n − 1)!`: do one multiplication and let the smaller call do the rest.' },
              { lines: [8, 8], text: '**Two base cases in one line.** `fib(0) = 0` and `fib(1) = 1`, so returning `n` itself handles both.' },
              { lines: [9, 9], text: '**Two recursive calls.** Each term is the sum of the two before it. It recomputes the same terms many times: fine for small `n`, slow for big ones.' },
              { lines: [12, 18], text: '`main` only calls the methods and prints the results.' },
            ],
            note: 'Why `long` for factorial? `13!` is already bigger than the largest `int` (about 2.1 billion), so an `int` would silently give wrong answers.',
          },
        },
        {
          type: 'code',
          eyebrow: 'Bonus',
          title: 'Put it in a window',
          body: 'Press **▶ Run** and your window appears below. Then rename the button to `Compute` and run it again. Want to type in it? Choose **Try it live**. Chapter 9 explains every line.',
          swing: true,
          starter: `import javax.swing.*;
import java.awt.*;

public class Main {
    static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Factorial");
        frame.setLayout(new FlowLayout());
        JTextField input = new JTextField(5);
        JButton button = new JButton("Go");
        JLabel result = new JLabel("Type a number");

        button.addActionListener(e -> {
            int n = Integer.parseInt(input.getText().trim());
            result.setText(n + "! = " + factorial(n));
        });

        frame.add(input);
        frame.add(button);
        frame.add(result);
        frame.setSize(340, 120);
        frame.setVisible(true);
    }
}
`,
          tests: [
            { label: 'The button says `Compute`', src: 'new\\s+JButton\\s*\\(\\s*"Compute"\\s*\\)', fail: 'Change `new JButton("Go")` to `new JButton("Compute")`.' },
          ],
          explain: 'A button, a text box and your recursive method, working together. That’s a GUI program.',
        },
        {
          type: 'finish',
          title: 'Recursion: done.',
          body: 'You can trace, debug and write recursive methods. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
