// COS 202 · Intro to Java · Module 9: paradigms, scripting languages, design approaches.

export default {
  id: 'java-big-picture',
  title: 'Styles of programming',
  covers: 'imperative, functional, declarative and logic programming, scripting languages, top-down, bottom-up, structured, modular and object-oriented approaches',
  minutes: 8,
  sections: [
    {
      name: 'Different ways to think',
      terms: [
        ['Paradigm', 'A style of building programs.'],
        ['Imperative', 'Spell out **how**, step by step, with loops and `if`s.'],
        ['Functional', 'Compute by applying functions: ==pure functions==, ==immutable== data, and recursion instead of loops.'],
        ['Pure function', 'The same input always gives the same output, with no side effects.'],
        ['Higher-order function', 'A function that takes or returns another function. First-class functions can be stored and passed around like values.'],
        ['Lambda', 'A short unnamed function, available since Java 8: `n -> n * n`.'],
        ['Declarative', 'State **what** you want and let the system decide how. Examples: SQL, HTML, Java Streams.'],
        ['Logic programming', 'Give ==facts== and ==rules==, then ask ==queries==. The system searches using ==backtracking== and matches patterns by ==unification==. Prolog is the main language.'],
        ['Scripting language', 'High-level, usually interpreted and dynamically typed, made for automation and quick work. Examples: Python, JavaScript, PHP, Bash.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Intro to Java · Module 9',
          title: 'One goal, several styles',
          body: 'Imagine ordering a meal.\n\n==Imperative==: go into the kitchen and give every step. “Boil water, add rice, stir…” All the loops you wrote work like this.\n\n==Declarative==: tell the waiter “jollof rice, please”. You state **what**, and the kitchen decides **how**.\n\nA ==paradigm== is one of these styles. Java is mainly imperative and object-oriented, and it has borrowed from the others.',
          cta: 'Meet the styles',
        },
        {
          type: 'reveal',
          eyebrow: 'Four paradigms',
          title: 'Open each one',
          cards: [
            { title: 'Imperative', text: 'Think in **steps**: `for (...) { total += x; }`' },
            { title: 'Functional', text: 'Think in **transformations**: data flows through functions and is never changed. Example: Haskell.' },
            { title: 'Declarative', text: 'Think in **outcomes**. `SELECT name FROM students WHERE grade >= 50 ORDER BY name;` has no loop. HTML works this way too.' },
            { title: 'Logic', text: 'Think in **facts and rules**. In Prolog: `parent(tom, bob).` is a fact, and you can ask `?- parent(tom, X).` Used in AI and expert systems.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Pure or not',
          prompt: 'Which method is a ==pure function==?',
          options: [
            { text: '`int square(int x) { return x * x; }`', correct: true, why: 'Its output depends only on its input, and it changes nothing else. `square(4)` is always 16, so it is easy to test.' },
            { text: '`void increment() { count++; }`', why: 'It changes a variable outside itself: a ==side effect==.' },
            { text: '`int next() { count++; return count; }`', why: 'The same call gives a different result each time.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Java’s functional side',
          title: 'A stream reads like a sentence',
          body: 'A ==lambda== such as `n -> n * n` is a tiny unnamed function: “given `n`, give back `n * n`”. `filter` keeps values and `map` transforms them. You describe the result; the stream does the looping.',
          code: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4);
        numbers.stream()
            .filter(n -> n % 2 == 0)
            .map(n -> n * n)
            .forEach(System.out::println);
    }
}`,
          options: [
            { out: '4\n16', correct: true, why: 'Keep the evens (2 and 4), then square them.' },
            { out: '1\n4\n9\n16', why: '`filter` removes the odd numbers first.' },
            { out: '2\n4', why: '`map` squares what `filter` kept.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which paradigm does each one show?',
          buckets: [
            { id: 'imp', label: 'Imperative' },
            { id: 'fun', label: 'Functional' },
            { id: 'dec', label: 'Declarative' },
            { id: 'log', label: 'Logic' },
          ],
          items: [
            { text: '`for` loop adding to a total', bucket: 'imp', why: 'Every step is spelled out.' },
            { text: 'A pure function with recursion', bucket: 'fun', why: 'No changing state; recursion replaces the loop.' },
            { text: '`SELECT * FROM students;`', bucket: 'dec', why: 'SQL states what you want.' },
            { text: '`grandparent(X, Z) :- parent(X, Y), parent(Y, Z).`', bucket: 'log', why: 'A Prolog rule.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Scripting languages',
          title: 'Java’s quick-moving cousins',
          body: 'Python prints a list in 3 lines where Java needs a class and a `main`. Scripts trade strictness for speed of writing.',
          cards: [
            { title: 'Interpreted', text: 'Run line by line, with no separate compile step. Java is compiled first.' },
            { title: 'Dynamic typing', text: 'Python: `x = 5` and later `x = "hi"`. The type is decided while running. Java is ==statically typed==: `int x` stays an `int`.' },
            { title: 'Where they fit', text: 'JavaScript for web pages, PHP for web servers, Python for automation and AI, Bash and PowerShell for system tasks, Perl for text.' },
            { title: 'Where Java fits', text: 'Large systems, Android and business software, where strict checks pay off.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Styles: mapped.',
          recap: ['Imperative says how; declarative says what.', 'Pure functions have no side effects.'],
          why: 'Last part: how to organise your solution.',
        },
      ],
    },
    {
      name: 'Organising a solution',
      terms: [
        ['Top-down', 'Start with the big picture and break it into smaller parts (==stepwise refinement==).'],
        ['Bottom-up', 'Build small reusable pieces first, then combine them.'],
        ['Structured programming', 'Use only sequence, selection and iteration, with no `goto`. Each block has one entry and one exit.'],
        ['Modular programming', 'Split the work into independent units, each with a single job.'],
        ['Object-oriented approach', 'Model the problem as objects and the relationships between them.'],
        ['Single Responsibility', 'Each module or method should do one job only.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Approaches',
          title: 'Building a student result system',
          body: 'A paradigm is your style; an ==approach== is your strategy for attacking a problem.\n\n==Top-down==: start from “process results”, then break it into read data, calculate the average, decide the grade, print. Good for planning new systems.\n\n==Bottom-up==: first build `average()`, `grade()` and `printResult()`, then join them together. Good for reusable libraries.\n\nIn practice, programmers mix both: plan top-down, then build bottom-up.',
          cta: 'Match them up',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which approach is described?',
          buckets: [
            { id: 'top', label: 'Top-down' },
            { id: 'bottom', label: 'Bottom-up' },
            { id: 'struct', label: 'Structured' },
            { id: 'mod', label: 'Modular' },
            { id: 'oo', label: 'Object-oriented' },
          ],
          items: [
            { text: 'Big picture first, then details', bucket: 'top', why: 'Also called stepwise refinement.' },
            { text: 'Small components first, then the system', bucket: 'bottom', why: 'It grows upward from reusable parts.' },
            { text: 'Only sequence, selection and iteration; no `goto`', bucket: 'struct', why: 'Clear blocks with one way in and one way out.' },
            { text: 'Independent units, each with a single job', bucket: 'mod', why: 'Easier to test and maintain.' },
            { text: 'Models real things like `Patient` and `Doctor`', bucket: 'oo', why: 'The rest of this course is about exactly this.' },
          ],
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'Everything crammed into main',
          code: `public static void main(String[] args) {
    int[] s = {75, 60, 82, 55};
    int sum = 0;
    for (int x : s) sum += x;
    double avg = (double) sum / s.length;
    if (avg >= 50) System.out.println("Pass");
    else System.out.println("Fail");
}`,
          ask: 'Which version follows the Single Responsibility idea?',
          options: [
            { code: `static double average(int[] s) {
    int sum = 0;
    for (int x : s) sum += x;
    return (double) sum / s.length;
}

static String result(double avg) {
    return avg >= 50 ? "Pass" : "Fail";
}

public static void main(String[] args) {
    int[] s = {75, 60, 82, 55};
    System.out.println(result(average(s)));
}`, correct: true, why: 'Each method has **one job**, can be tested alone, and can be reused. `main` now reads like the plan.' },
            { code: `static void doEverything(int[] s) {
    int sum = 0;
    for (int x : s) sum += x;
    double avg = (double) sum / s.length;
    if (avg >= 50) System.out.println("Pass");
    else System.out.println("Fail");
}

public static void main(String[] args) {
    doEverything(new int[] {75, 60, 82, 55});
}`, why: 'The code just moved. One method still does every job.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Final challenge',
          title: 'A rule, written in Java',
          body: 'Logic programming states rules such as: “a student passes if their score is 40 or above **and** they attended at least 75% of classes.”\n\nWrite that rule as a pure method: `passes(int score, int attendance)` returns a `boolean`.',
          starter: `public class Main {
    static boolean passes(int score, int attendance) {
        // your code here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(passes(55, 80));
    }
}
`,
          tests: [
            { label: '`passes(55, 80)` is `true`', expr: 'Main.passes(55, 80)', expect: 'true' },
            { label: '`passes(35, 90)` is `false`', expr: 'Main.passes(35, 90)', expect: 'false' },
            { label: '`passes(70, 60)` is `false`', expr: 'Main.passes(70, 60)', expect: 'false' },
            { label: 'Exactly on both limits passes', expr: 'Main.passes(40, 75)', expect: 'true' },
          ],
          hints: ['A comparison already gives a `boolean`, so you can return it directly.', 'Join the two conditions with `&&`, and use `>=` for “or above”.'],
          solution: {
            code: `public class Main {
    static boolean passes(int score, int attendance) {
        return score >= 40 && attendance >= 75;
    }

    public static void main(String[] args) {
        System.out.println(passes(55, 80));
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**The rule is the code.** No `if` is needed: the expression is already true or false.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You’re ready for Java proper.',
          body: 'From zero to loops, arrays, methods and recursion. Next comes the Java Toolkit, then classes and objects. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
