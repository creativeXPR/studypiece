// COS 202 · Intro to Java · Module 2: variables, the eight primitive types, constants, casting.

export default {
  id: 'java-values',
  title: 'Variables and data types',
  covers: 'variables, naming rules, the eight primitive types, reference types, final constants, widening and narrowing casts',
  minutes: 8,
  sections: [
    {
      name: 'Boxes with names',
      terms: [
        ['Variable', 'A named place in memory holding a value that can change. Pattern: `type name = value;`'],
        ['Data type', 'The kind of value a variable holds, how much memory it uses, and what you can do with it.'],
        ['Primitive types', '`byte`, `short`, `int`, `long`, `float`, `double`, `char`, `boolean`. They store the value directly.'],
        ['Reference types', 'Classes such as `String`, plus arrays. They store the address of the data.'],
        ['camelCase', 'The naming habit for variables: `studentScore`, `isEnrolled`.'],
      ],
      screens: [
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'A variable is a labelled box',
          body: 'Picture a box with a name on it. Watch the **Memory** panel: the name stays, and the value inside can change.',
          code: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        System.out.println(age);
        age = 21;
        System.out.println(age);
        double gpa = 4.5;
        System.out.println("GPA: " + gpa);
    }
}`,
          frames: [
            { line: 3, note: 'Create a box for a whole number (`int`), name it `age`, and put 20 in it.', set: { age: 20 } },
            { line: 4, note: 'No quotes, so Java prints what is **inside** the box.', print: '20' },
            { line: 5, note: 'A new value replaces the old one. No type this time: the box already exists.', set: { age: 21 } },
            { line: 6, note: 'Same command, new result.', print: '21' },
            { line: 7, note: '`double` is for numbers with a decimal point.', set: { gpa: 4.5 } },
            { line: 8, note: '`+` joins the text and the value.', print: 'GPA: 4.5' },
          ],
          cta: 'Meet the types',
        },
        {
          type: 'reveal',
          eyebrow: 'Eight primitive types',
          title: 'Four families',
          body: 'In daily code you mostly need `int`, `double`, `boolean` and `char`. Exams ask about all eight, so note the sizes.',
          cards: [
            { title: 'Whole numbers', text: '`byte` 8 bits (-128 to 127), `short` 16 bits, `int` 32 bits (about ±2.1 billion), `long` 64 bits, written with an L: `99L`.' },
            { title: 'Decimals', text: '`float` 32 bits, written with an f: `3.14f`. `double` 64 bits, the default: `3.14`.' },
            { title: 'One character', text: '`char` 16 bits, in single quotes: `\'A\'`.' },
            { title: 'True or false', text: '`boolean` holds only `true` or `false`.' },
          ],
          note: '`String` holds text in double quotes, but it is a class (a ==reference type==), not a primitive. That is why its S is a capital.',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which type fits each value?',
          buckets: [
            { id: 'int', label: 'int' },
            { id: 'double', label: 'double' },
            { id: 'boolean', label: 'boolean' },
            { id: 'text', label: 'char or String' },
          ],
          items: [
            { text: 'Number of students: `200`', bucket: 'int', why: 'You can’t have half a student: a whole number.' },
            { text: 'Body temperature: `36.6`', bucket: 'double', why: 'It has a decimal point.' },
            { text: 'Has paid fees: `true`', bucket: 'boolean', why: 'Only two possibilities.' },
            { text: 'A grade: `\'A\'`', bucket: 'text', why: 'Single quotes hold one `char`.' },
            { text: 'A name: `"Amina"`', bucket: 'text', why: 'Double quotes make a `String`.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Naming rules',
          prompt: 'Which variable names are allowed?',
          options: [
            { text: '`totalScore`', correct: true, why: '**Allowed**, and good camelCase.' },
            { text: '`2ndPlace`', why: '**Not allowed:** a name can’t begin with a digit.' },
            { text: '`student name`', why: '**Not allowed:** no spaces.' },
            { text: '`_count`', correct: true, why: '**Allowed:** a name can begin with a letter, `_` or the dollar sign.' },
            { text: '`class`', why: '**Not allowed:** `class` is a Java keyword.' },
            { text: '`Age`', correct: true, why: '**Allowed**, but `Age` and `age` are two different variables.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Area of a room',
          body: 'Create an `int` called `length` holding 5 and an `int` called `width` holding 3. Create a third, `area`, equal to `length * width`.\n\nThen print `Area: 15` by joining text and `area`.',
          starter: `public class Main {
    public static void main(String[] args) {
        // your code here
    }
}
`,
          tests: [
            { label: 'Prints `Area: 15`', main: 'Main', out: 'Area: 15' },
            { label: 'Uses a variable called `area`', src: '\\bint\\s+area\\b', fail: 'Store the answer in `int area` first.' },
            { src: '\\blength\\s*\\*\\s*width\\b|\\bwidth\\s*\\*\\s*length\\b', fail: 'Calculate the area from `length` and `width`.', hidden: true },
          ],
          hints: ['`int length = 5;` creates the first box.', 'Text and a value join with `+`: `"Area: " + area`. Note the space after the colon.'],
          solution: {
            code: `public class Main {
    public static void main(String[] args) {
        int length = 5;
        int width = 3;
        int area = length * width;
        System.out.println("Area: " + area);
    }
}
`,
            steps: [
              { lines: [3, 4], text: '**Store the inputs** in named boxes.' },
              { lines: [5, 5], text: '**Calculate from the names**, so changing `length` later still works.' },
              { lines: [6, 6], text: '**Join and print.**' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'Values have homes now.',
          recap: ['A variable has a type, a name and a value.', 'Use `int`, `double`, `boolean`, `char` and `String` most.'],
          why: 'Next: values that must never change, and switching between types.',
        },
      ],
    },
    {
      name: 'Constants and casting',
      terms: [
        ['final', 'Makes a constant: the value can’t change once set. `final double PI = 3.14;`, named in CAPITALS.'],
        ['Widening', 'Small type to larger type, done automatically: `double d = 5;`'],
        ['Narrowing', 'Large type to smaller type, needing a cast: `int x = (int) 9.99;`. The decimal part is cut off, not rounded.'],
      ],
      screens: [
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'A constant stays constant',
          body: 'Adding `final` locks a variable, so nobody can change it by accident. Find the line Java will refuse.',
          code: `public class Main {
    public static void main(String[] args) {
        final int PASS_MARK = 40;
        PASS_MARK = 50;
        System.out.println(PASS_MARK);
    }
}`,
          errors: [
            { line: 4, kind: 'syntax', fixes: ['int newMark = 50;', 'final PASS_MARK = 50;', 'PASS_MARK == 50'], why: 'A `final` variable can’t be given a new value, so this won’t compile. Any rule the compiler enforces counts as a compile-time error.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Casting',
          title: 'Pouring between containers',
          body: 'Think of a small cup and a big jug. Pour the cup into the jug and nothing spills: that is ==widening==, and Java does it for you:\n\n`int x = 5;`\n\n`double d = x;`\n\nPour the jug into the cup and some may spill, so Java makes you say it on purpose. That is ==narrowing==, written with a ==cast==:\n\n`int y = (int) 9.99;`\n\nThe order, small to large: `byte`, `short`, `int`, `long`, `float`, `double`.',
          cta: 'Test it',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'What gets lost?',
          body: 'Run this in your head first.',
          code: `public static void main(String[] args) {
    int x = 5;
    double d = x;
    int y = (int) 9.99;
    System.out.println(d);
    System.out.println(y);
}`,
          options: [
            { out: '5.0\n9', correct: true, why: 'An `int` placed in a `double` gains `.0`. A cast chops off the decimal part, even .99.' },
            { out: '5\n10', why: 'A `double` always shows its decimal point, and casting never rounds up.' },
            { out: '5.0\n10', why: 'Casting **truncates**: it cuts off the decimals without rounding.' },
          ],
        },
        {
          type: 'finish',
          title: 'Data types: done.',
          body: 'You can store any value and convert between types. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
