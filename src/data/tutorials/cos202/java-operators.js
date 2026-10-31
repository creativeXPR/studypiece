// COS 202 · Intro to Java · Module 3: arithmetic, assignment, relational and logical operators.

export default {
  id: 'java-operators',
  title: 'Operators and expressions',
  covers: 'arithmetic, integer division, modulus, compound assignment, increment, comparisons, AND, OR, NOT, precedence, the ternary operator',
  minutes: 8,
  sections: [
    {
      name: 'Doing maths',
      terms: [
        ['Modulus', '`%` gives the remainder: `10 % 3` is `1`. `n % 2 == 0` means `n` is even.'],
        ['Integer division', '`int / int` drops the decimals: `10 / 3` is `3`. `10.0 / 3` gives 3.33…'],
        ['Compound assignment', '`x += 5` is short for `x = x + 5`. Also `-=`, `*=`, `/=`, `%=`.'],
        ['Increment', '`x++` adds 1 after its value is used; `++x` adds 1 before.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Maths symbols',
          title: 'Two of these will surprise you',
          cards: [
            { title: '+  -  *', text: 'Add, subtract, multiply: `10 * 3` is `30`.' },
            { title: '/  divide', text: 'Two whole numbers give a whole number: `10 / 3` is `3`. The rest is thrown away.' },
            { title: '%  remainder', text: 'What is left after dividing: `10 % 3` is `1`. Called ==modulus==.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Whole or decimal?',
          body: 'If **either** number has a decimal point, the answer keeps its decimals.',
          code: `public static void main(String[] args) {
    System.out.println(10 / 4);
    System.out.println(10.0 / 4);
    System.out.println(10 % 4);
}`,
          options: [
            { out: '2\n2.5\n2', correct: true, why: '`10 / 4` drops the .5. `10.0 / 4` keeps it. 4 goes into 10 twice, leaving a remainder of 2.' },
            { out: '2.5\n2.5\n2', why: 'Two `int`s give an `int`, so the first line is `2`.' },
            { out: '2\n2.5\n2.5', why: '`%` is the remainder, not division.' },
          ],
        },
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'Shortcuts for changing a variable',
          body: 'Programs change variables constantly, so Java has short forms. Note that `=` means **store**, not “equals”.',
          code: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        x = x + 5;
        x += 5;
        x *= 2;
        x--;
        System.out.println(x);
    }
}`,
          frames: [
            { line: 3, note: 'Store 10 in `x`.', set: { x: 10 } },
            { line: 4, note: 'Work out the right side first (10 + 5), then store it back in `x`.', set: { x: 15 } },
            { line: 5, note: '`x += 5` is the short way to write the line above.', set: { x: 20 } },
            { line: 6, note: '`x *= 2` means `x = x * 2`.', set: { x: 40 } },
            { line: 7, note: '`x--` takes away 1. `x++` adds 1.', set: { x: 39 } },
            { line: 8, note: 'Prints the final value.', print: '39' },
          ],
          cta: 'One more trap',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'x++ or ++x?',
          body: 'Both add 1. The difference is **when**: `x++` uses the old value first; `++x` adds first.',
          code: `public static void main(String[] args) {
    int a = 5;
    System.out.println(a++);
    System.out.println(a);
    int b = 5;
    System.out.println(++b);
}`,
          options: [
            { out: '5\n6\n6', correct: true, why: '`a++` prints the old 5, then `a` becomes 6. `++b` becomes 6 first, then prints.' },
            { out: '6\n6\n6', why: '`a++` hands over its value **before** adding, so the first line is 5.' },
            { out: '5\n6\n5', why: '`++b` adds **before** handing over the value.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Maths is sorted.',
          recap: ['`int / int` drops decimals; `%` gives the remainder.', '`x += 5` means `x = x + 5`.'],
          why: 'Next: questions with a true or false answer, which power every decision.',
        },
      ],
    },
    {
      name: 'True or false',
      terms: [
        ['Relational operators', '`==`, `!=`, `>`, `<`, `>=`, `<=` compare two values and give a `boolean`.'],
        ['Logical operators', '`&&` is true when both sides are true. `||` is true when at least one is. `!` flips a value.'],
        ['Precedence', 'Brackets first, then `++ --`, then `* / %`, then `+ -`, then comparisons, then `== !=`, then `&&`, then `||`.'],
        ['Ternary operator', '`condition ? a : b` gives `a` when true and `b` when false: a one-line if-else.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Asking questions',
          title: 'Comparisons answer true or false',
          body: '`5 > 3` is `true`. `5 == 3` is `false`. `5 != 3` is `true`.\n\nThe classic slip: `=` **stores** a value, `==` **asks** whether two values are equal.\n\nCombine questions with logic. Take `age >= 16 && hasId`:\n\n`&&` (AND): true only if **both** sides are true.\n\n`||` (OR): true if **at least one** side is true.\n\n`!` (NOT): flips true and false.',
          cta: 'Try some',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'With `int x = 7;`, which expressions are `true`?',
          options: [
            { text: '`x > 5 && x < 10`', correct: true, why: '**True:** both sides hold.' },
            { text: '`x < 3 || x > 6`', correct: true, why: '**True:** the right side holds, and that is enough for OR.' },
            { text: '`!(x == 7)`', why: '**False:** `x == 7` is true, and `!` flips it.' },
            { text: '`x % 2 == 0`', why: '**False:** 7 leaves a remainder of 1, so it is odd.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Precedence',
          title: 'Who goes first?',
          body: 'As in school maths: brackets first, then `*`, `/`, `%`, then `+` and `-`. Equal ranks go left to right. When unsure, add brackets.',
          code: `public static void main(String[] args) {
    System.out.println(10 + 4 * 3);
    System.out.println((10 + 4) * 3);
    System.out.println(15 % 4 + 2 * 3);
}`,
          options: [
            { out: '22\n42\n9', correct: true, why: '`4 * 3` first gives 22. Brackets first gives 42. `15 % 4` is 3 and `2 * 3` is 6, so 9.' },
            { out: '42\n42\n9', why: '`*` goes before `+`, so the first line is `10 + 12`.' },
            { out: '22\n42\n27', why: '`%` and `*` both go before `+`, so it is `3 + 6`.' },
          ],
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'A valid score, and a one-line decision',
          body: 'A score is valid from 0 to 100, including both ends. The `? :` is the ==ternary operator==: `condition ? ifTrue : ifFalse`.',
          code: `public static void main(String[] args) {
    int score = 72;
    boolean valid = score >= 0 [[&&]] score [[<=]] 100;
    String status = (score >= 40) [[?]] "Pass" [[:]] "Fail";
    System.out.println(valid + " " + status);
}`,
          bank: ['||', '<', '=', ';'],
          explain: 'Both limits must hold, so AND. The ternary picks one of two values and is handy for short choices.',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Average of three marks',
          body: 'Marks `70`, `85` and `80` are stored for you. Print their exact average, `78.33333333333333`.\n\nWatch out: adding three `int`s and dividing by `3` loses the decimals.',
          starter: `public class Main {
    public static void main(String[] args) {
        int a = 70, b = 85, c = 80;
        int average = (a + b + c) / 3;
        System.out.println(average);
    }
}
`,
          tests: [
            { label: 'Prints `78.33333333333333`', main: 'Main', out: '78.33333333333333' },
          ],
          hints: ['The result must be stored in a `double`.', 'Divide by `3.0`, or cast: `(double) (a + b + c) / 3`. Keep the brackets around the sum.'],
          solution: {
            code: `public class Main {
    public static void main(String[] args) {
        int a = 70, b = 85, c = 80;
        double average = (a + b + c) / 3.0;
        System.out.println(average);
    }
}
`,
            steps: [
              { lines: [4, 4], text: '**One decimal number is enough.** With `3.0` the division keeps its decimals, and `double` can store them. The brackets make the sum happen first.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can calculate and compare.',
          body: 'Every decision in a program rests on this. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
