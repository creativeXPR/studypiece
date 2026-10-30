// COS 202 · Java toolkit · Lesson 3: methods, parameters, return values and overloading.

export default {
  id: 'methods',
  title: 'Methods and overloading',
  covers: 'Declaring and calling methods, parameters and arguments, return values, void, pass by value, overloading',
  minutes: 13,
  sections: [
    {
      name: 'Methods',
      terms: [
        ['Method', 'A named block of code inside a class that runs only when called. Also called a function.'],
        ['Parameter / argument', 'A parameter is the variable in the method’s definition; an argument is the value passed in the call.'],
        ['void', 'The method returns nothing. Any other return type must `return` a value on every path.'],
        ['Pass by value', 'Java copies each argument. Changing a parameter `int` doesn’t change the caller’s variable.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Java toolkit · Lesson 3',
          title: 'Write it once, call it often',
          body: 'A ==method== packages behaviour behind a name:\n\n`static int add(int x, int y) { return x + y; }`\n\nRead it left to right: `static` (belongs to the class), `int` (what it gives back), `add` (its name), `x` and `y` (its ==parameters==).\n\nCall it with ==arguments==: `int z = add(5, 3);`',
          cta: 'Follow a call',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Does the method change x?',
          code: `static void change(int x, int[] a) {
    x = 99;
    a[0] = 99;
}

public static void main(String[] args) {
    int x = 1;
    int[] a = {1, 2};
    change(x, a);
    System.out.println(x);
    System.out.println(a[0]);
}`,
          options: [
            { out: '1\n99', correct: true, why: 'Java copies arguments. The `int` copy changes alone, but the copy of `a` still points at the **same array**, so the change shows.' },
            { out: '99\n99', why: '`x` inside `change` is a separate copy of the number.' },
            { out: '1\n1', why: 'Both variables refer to one array, so writing to `a[0]` is seen by the caller.' },
            { out: '99\n1', why: 'It is the other way round: the primitive is safe, the array’s contents are shared.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The square that isn’t',
          body: 'This should print `25`.',
          code: `public class Main {
    static void square(int n) {
        return n * n;
    }

    public static void main(String[] args) {
        int result = square(5);
        System.out.println(result + result);
    }
}`,
          errors: [
            { line: 2, kind: 'syntax', fixes: ['static int square(int n) {', 'static square(int n) {', 'static void int square(int n) {'], why: 'A `void` method can’t return a value, so this won’t compile. The return type must be `int`.' },
            { line: 8, kind: 'semantic', fixes: ['System.out.println(result);', 'System.out.println(result * result);', 'System.out.println("result");'], why: 'It compiles, but prints 50. The program should print the result once.' },
          ],
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'Returning true or false',
          code: `static boolean isPass(int mark) {
    if (mark >= 40) {
        return true;
    } else {
        return false;
    }
}`,
          options: [
            { code: `static boolean isPass(int mark) {
    return mark >= 40;
}`, correct: true, why: 'The comparison **already is** a `boolean`. Return it directly.' },
            { code: `static boolean isPass(int mark) {
    boolean result = false;
    if (mark >= 40) result = true;
    return result;
}`, why: 'Still correct, but it adds an extra variable.' },
            { code: `static boolean isPass(int mark) {
    return mark > 40;
}`, why: 'Short, but it changes the meaning: 40 would fail.' },
          ],
          points: ['`return condition;` replaces `if … return true; else return false;`.'],
        },
        {
          type: 'bridge',
          title: 'Methods: clear.',
          recap: ['Arguments are copied into parameters.', 'A non-`void` method must return a value.'],
          why: 'Can two methods share a name? Yes.',
        },
      ],
    },
    {
      name: 'Overloading',
      terms: [
        ['Overloading', 'Several methods share a name but differ in their parameter types or count. The compiler picks one at compile time.'],
      ],
      screens: [
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Which one gets called?',
          body: 'Java chooses by the **arguments’ types**. The return type alone can’t tell two overloads apart.',
          code: `static String show(int x) { return "int"; }
static String show(double x) { return "double"; }
static String show(String x) { return "String"; }
static String show(int x, int y) { return "two"; }

public static void main(String[] args) {
    System.out.println(show(3));
    System.out.println(show(3.0));
    System.out.println(show("3"));
    System.out.println(show(3, 3));
}`,
          options: [
            { out: 'int\ndouble\nString\ntwo', correct: true, why: 'Each call matches exactly one parameter list.' },
            { out: 'int\nint\nString\ntwo', why: '`3.0` has a decimal point, so it is a `double`.' },
            { out: 'double\ndouble\nString\ntwo', why: 'An exact match wins: `3` is an `int`.' },
            { out: 'int\ndouble\nint\ntwo', why: 'Double quotes make `"3"` a `String`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'An overloaded area calculator',
          body: 'Write three methods all named `area`:\n\n`area(int side)` returns a square’s area as an `int`.\n\n`area(double w, double h)` returns a rectangle’s area.\n\n`area(double r)` returns a circle’s area, using `Math.PI`.',
          starter: `public class Main {
    // your three area methods here

    public static void main(String[] args) {
        System.out.println(area(3));
        System.out.println(area(2.0, 3.5));
        System.out.println(area(1.0));
    }
}
`,
          tests: [
            { label: 'Square: `area(3)` is 9', expr: 'Main.area(3)', expect: 9 },
            { label: 'Rectangle: `area(2.0, 3.5)` is 7', expr: 'Main.area(2.0, 3.5)', expect: 7, tol: 1e-9 },
            { label: 'Circle: `area(1.0)` is π', expr: 'Main.area(1.0)', expect: 3.14159265, tol: 1e-6 },
            { label: 'The square version returns an `int`', check: 'Main.class.getDeclaredMethod("area", int.class).getReturnType() == int.class' },
            { expr: 'Main.area(10)', expect: 100, hidden: true },
          ],
          hints: ['Each is a separate method with its own parameter list.', 'A circle’s area is `Math.PI * r * r`.'],
          solution: {
            code: `public class Main {
    static int area(int side) {
        return side * side;
    }

    static double area(double w, double h) {
        return w * h;
    }

    static double area(double r) {
        return Math.PI * r * r;
    }

    public static void main(String[] args) {
        System.out.println(area(3));
        System.out.println(area(2.0, 3.5));
        System.out.println(area(1.0));
    }
}
`,
            steps: [
              { lines: [2, 4], text: '**One `int`:** the square.' },
              { lines: [6, 8], text: '**Two `double`s:** a different count of parameters.' },
              { lines: [10, 12], text: '**One `double`:** the same count as the square, but a different type, so it is still legal.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Methods: done.',
          body: 'Your toolkit is ready. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
