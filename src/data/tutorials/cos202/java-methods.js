// COS 202 · Intro to Java · Module 8: modularity, methods, overloading, recursion, modules.

export default {
  id: 'java-methods',
  title: 'Methods and modularity',
  covers: 'modular code, defining and calling methods, parameters, return values, void, pass by value, overloading, recursion, Java modules',
  minutes: 9,
  sections: [
    {
      name: 'Name a job, reuse it',
      terms: [
        ['Modularity', 'Splitting a program into independent pieces. Each is easy to test and reuse, and hides its details from the rest.'],
        ['Method', 'A named block of code you can call whenever you need it. Pattern: `static int add(int a, int b) { return a + b; }`'],
        ['Parameter', 'An input variable in a method’s definition. The value you pass in a call is the ==argument==.'],
        ['return / void', '`return` sends a value back and ends the method. `void` means the method returns nothing.'],
        ['Pass by value', 'A method receives a **copy** of a primitive, so changing it inside doesn’t affect the caller.'],
      ],
      screens: [
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'A method is a small machine',
          body: 'Put values in, get one out. Think of a blender: you don’t need to see inside to use it. Watch the highlight **jump**, then come back.',
          code: `public class Main {
    static int add(int a, int b) {
        int sum = a + b;
        return sum;
    }

    public static void main(String[] args) {
        int result = add(3, 7);
        System.out.println(result);
    }
}`,
          frames: [
            { line: 8, note: 'Java always starts in `main`. To find `result`, it must call `add`.' },
            { line: 2, note: 'Jump to `add`. The 3 and 7 land in the ==parameters== `a` and `b`.', set: { a: 3, b: 7 } },
            { line: 3, note: 'Do the work.', set: { sum: 10 } },
            { line: 4, note: '`return` carries 10 back to where the call happened.' },
            { line: 8, note: 'Back in `main`: `add(3, 7)` is replaced by 10, then stored. The method’s own variables are gone.', drop: ['a', 'b', 'sum'], set: { result: 10 } },
            { line: 9, note: 'Print the result.', print: '10' },
          ],
          cta: 'Read the first line',
        },
        {
          type: 'reveal',
          eyebrow: 'Anatomy',
          title: 'static int add(int a, int b)',
          body: 'The first line of a method tells you everything about how to use it.',
          cards: [
            { title: 'static', text: 'Lets you call it directly without creating an object. You will learn what objects are soon; until then, write `static`.' },
            { title: 'int', text: 'The ==return type==: what kind of value comes back. `void` means nothing comes back.' },
            { title: 'add', text: 'The name. Choose a verb that says what it does.' },
            { title: '(int a, int b)', text: 'The ==parameters==: typed inputs. A call must match them: `add(3, 7)`.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Should the method return a value, or be `void`?',
          buckets: [
            { id: 'ret', label: 'Returns a value' },
            { id: 'void', label: 'void' },
          ],
          items: [
            { text: 'Calculate the area of a circle', bucket: 'ret', why: 'The caller needs the answer: `double circleArea(double r)`.' },
            { text: 'Print a greeting', bucket: 'void', why: 'It does an action and has nothing to hand back.' },
            { text: 'Check whether a number is even', bucket: 'ret', why: 'It answers with a `boolean`.' },
            { text: 'Print a report', bucket: 'void', why: 'It only displays things.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Does the original change?',
          body: 'A method receives a ==copy== of a primitive value, like a photocopy of a form.',
          code: `static void addTen(int x) {
    x = x + 10;
}

public static void main(String[] args) {
    int n = 5;
    addTen(n);
    System.out.println(n);
}`,
          options: [
            { out: '5', correct: true, why: 'Only the copy `x` changed. To keep the change, return it: `n = addTen(n);`' },
            { out: '15', why: '`x` is a copy, so `n` isn’t touched.' },
            { out: '10', why: 'Nothing here sets `n` to 10.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Reverse an array',
          body: 'Write `reverse(int[] arr)`. It returns a **new** array holding the values in reverse order, and leaves `arr` unchanged. For `{1, 2, 3}` it returns `{3, 2, 1}`.',
          starter: `public class Main {
    static int[] reverse(int[] arr) {
        // your code here
        return arr;
    }

    public static void main(String[] args) {
        int[] r = reverse(new int[] {1, 2, 3});
        System.out.println(r[0]);
    }
}
`,
          tests: [
            { label: '`{1, 2, 3}` gives `{3, 2, 1}`', expr: 'Main.reverse(new int[] {1, 2, 3})', expect: [3, 2, 1] },
            { label: 'A single value still works', expr: 'Main.reverse(new int[] {9})', expect: [9] },
            { label: 'The original array is unchanged', body: 'int[] a = {1, 2}; Main.reverse(a); return a;', expect: [1, 2] },
          ],
          hints: ['Make the new array: `int[] out = new int[arr.length];`', 'Position `i` in `out` takes `arr[arr.length - 1 - i]`.'],
          solution: {
            code: `public class Main {
    static int[] reverse(int[] arr) {
        int[] out = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            out[i] = arr[arr.length - 1 - i];
        }
        return out;
    }

    public static void main(String[] args) {
        int[] r = reverse(new int[] {1, 2, 3});
        System.out.println(r[0]);
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**A new array of the same size**, so the original stays untouched.' },
              { lines: [4, 6], text: '**Mirror the position.** When `i` is 0 it takes the last slot; when `i` is 1 it takes the one before that.' },
              { lines: [7, 7], text: '**Hand back the new array.**' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'You can package code.',
          recap: ['A method takes inputs and may return one value.', 'Primitive arguments are copied.'],
          why: 'Next: one name for several methods, and a method that calls itself.',
        },
      ],
    },
    {
      name: 'Overloading, recursion and modules',
      terms: [
        ['Overloading', 'Several methods share a name but differ in the number or types of parameters. Return type alone isn’t enough.'],
        ['Recursion', 'A method calling itself on a smaller version of the problem.'],
        ['Base case', 'The condition that stops recursion. Without one, you get a `StackOverflowError`.'],
        ['Java module', 'Since Java 9, a named group of packages described in `module-info.java`, stating what it `exports` and what it `requires`.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Overloading',
          title: 'Same name, different inputs',
          body: 'With ==overloading==, Java picks the version whose parameters match the call.',
          code: `static int multiply(int a, int b) {
    return a * b;
}

static double multiply(double a, double b) {
    return a * b;
}

static int multiply(int a, int b, int c) {
    return a * b * c;
}

public static void main(String[] args) {
    System.out.println(multiply(3, 4));
    System.out.println(multiply(2.5, 4.0));
    System.out.println(multiply(2, 3, 4));
}`,
          options: [
            { out: '12\n10.0\n24', correct: true, why: 'Two `int`s, two `double`s and three `int`s each match exactly one version.' },
            { out: '12\n10\n24', why: 'The `double` version returns a `double`, so it prints `10.0`.' },
            { out: '12.0\n10.0\n24.0', why: 'The `int` versions return `int`s.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Which pair is **not** a valid overload?',
          options: [
            { text: '`int f(int a)` and `double f(int a)`', correct: true, why: 'Only the return type differs. From the call `f(2)`, Java couldn’t tell which you mean.' },
            { text: '`int f(int a)` and `int f(double a)`', why: 'Valid: the parameter types differ.' },
            { text: '`int f(int a)` and `int f(int a, int b)`', why: 'Valid: the number of parameters differs.' },
          ],
        },
        {
          type: 'trace',
          eyebrow: 'Recursion',
          title: 'A method that calls itself',
          body: 'Imagine a queue, where you ask the person ahead “what number are you?”, and they ask the next. The first person answers (the ==base case==), and the answers pass back.',
          code: `public class Main {
    static int factorial(int n) {
        if (n == 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(3));
    }
}`,
          frames: [
            { line: 8, note: 'Call `factorial(3)`.' },
            { line: 3, note: '`n` is 3, not 1, so keep going.', set: { n: 3 } },
            { line: 4, note: 'To work out `3 * factorial(2)`, this call has to **wait** for `factorial(2)`.' },
            { line: 3, note: 'A new call, with its own `n`: 2. Not 1, so keep going.', set: { n: 2 } },
            { line: 4, note: '`2 * factorial(1)` waits too.' },
            { line: 3, note: 'A new call: `n` is 1. **Base case!** Return 1.', set: { n: 1 } },
            { line: 4, note: 'Back one call: `n` is 2 again, and `2 * 1` returns 2.', set: { n: 2 } },
            { line: 4, note: 'Back again: `n` is 3, and `3 * 2` returns 6.', set: { n: 3 } },
            { line: 8, note: 'Print the answer.', drop: ['n'], print: '6' },
          ],
          cta: 'Write one',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Recursive power',
          body: 'Write `power(base, exp)` using recursion, not a loop. Any number to the power 0 is 1, which is your base case. Otherwise, `power(2, 5)` is `2 * power(2, 4)`.',
          starter: `public class Main {
    static int power(int base, int exp) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(power(2, 5));
    }
}
`,
          tests: [
            { label: '`power(2, 5)` is 32', expr: 'Main.power(2, 5)', expect: 32 },
            { label: '`power(7, 0)` is 1', expr: 'Main.power(7, 0)', expect: 1 },
            { expr: 'Main.power(3, 3)', expect: 27, hidden: true },
            { label: 'Calls itself, with no loop', src: '\\b(for|while)\\b', absent: true, fail: 'Solve this one with recursion, not a loop.' },
            { src: 'power\\s*\\(', min: 3, fail: 'Inside `power`, call `power` again.', hidden: true },
          ],
          hints: ['Base case: `if (exp == 0) return 1;`', 'Recursive step: `return base * power(base, exp - 1);`'],
          solution: {
            code: `public class Main {
    static int power(int base, int exp) {
        if (exp == 0) return 1;
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        System.out.println(power(2, 5));
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**Base case first**: this is what stops the calls.' },
              { lines: [4, 4], text: '**A smaller problem** each time, since `exp` falls towards 0.' },
            ],
          },
        },
        {
          type: 'reveal',
          eyebrow: 'Bigger still',
          title: 'From methods to modules',
          body: 'Code grows in layers, and each layer groups the one below it.',
          cards: [
            { title: 'Method', text: 'One job.' },
            { title: 'Class', text: 'Related methods and data.' },
            { title: 'Package', text: 'Related classes, like a folder: `java.util`.' },
            { title: 'Module', text: 'Related packages, since Java 9. A `module-info.java` file names it, lists what it `exports` to others, and what it `requires`. The benefits: strong encapsulation, reliable configuration and a scalable structure.' },
          ],
        },
        {
          type: 'finish',
          title: 'You think in pieces now.',
          body: 'Methods are the bricks of everything ahead. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
