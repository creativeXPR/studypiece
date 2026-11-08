// COS 202 · Abstraction and interfaces · Lesson 3: default, static and private interface methods, lambdas.

export default {
  id: 'modern-interfaces',
  title: 'Default, static and private methods',
  covers: 'JDK 8 default and static methods, functional interfaces and lambdas, JDK 9 private methods, extending interfaces',
  minutes: 14,
  sections: [
    {
      name: 'Interfaces with bodies',
      terms: [
        ['Default method', 'JDK 8. A body in an interface; inherited, and can be overridden. Lets an interface grow without breaking its classes.'],
        ['Static method', 'JDK 8. Called through the interface’s name; not inherited.'],
        ['Private method', 'JDK 9. A helper for default and static methods; invisible to implementing classes.'],
        ['Functional interface', 'Exactly one abstract method, so it can be written as a lambda.'],
        ['Lambda', 'A short way to supply that one method: `(x, y) -> x + y`.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'How many interfaces can one class implement?',
          options: [
            { text: 'One', why: 'That limit applies to extends.' },
            { text: 'Two', why: 'There is no such limit.' },
            { text: 'None, if it extends a class', why: 'It can do both.' },
            { text: 'As many as it needs', correct: true, why: 'A class can extend only one class but implement any number of interfaces.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Abstraction and interfaces · Lesson 3',
          title: 'Adding to a contract without breaking it',
          body: 'Add a new abstract method to an interface and every implementing class stops compiling. ==Default methods== fix that:\n\n`interface Vehicle {`\n\n`    void drive();`\n\n`    default void honk() { System.out.println("Beep"); }`\n\n`}`\n\nExisting classes inherit `honk()` for free, and may override it.',
          cta: 'Meet the others',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which kind of interface method is this?',
          buckets: [
            { id: 'def', label: 'default' },
            { id: 'sta', label: 'static' },
            { id: 'pri', label: 'private' },
          ],
          items: [
            { text: 'Inherited, and can be overridden', bucket: 'def', why: '**default** methods are inherited.' },
            { text: 'Called as `Vehicle.create()`', bucket: 'sta', why: '**static** methods are called through the interface, and aren’t inherited.' },
            { text: 'A helper hidden from implementing classes', bucket: 'pri', why: '**private** (JDK 9) methods are internal.' },
            { text: 'Added in JDK 9', bucket: 'pri', why: '**private** came a version after the other two.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Mixed-up rules',
          body: 'Three rules were broken here.',
          code: `interface Greeter {
    default String hello() { return "Hi"; }
    static String bye() { return "Bye"; }
}

@FunctionalInterface
interface Calc {
    int compute(int x, int y);
    int other(int x);
}

class Friend implements Greeter {
    String hello() { return "Hey"; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Friend().bye());
    }
}`,
          errors: [
            { line: 9, kind: 'syntax', fixes: ['default int other(int x) { return x; }', 'int other(int x, int y);', 'abstract int other(int x);'], why: 'A functional interface has **exactly one** abstract method, so `@FunctionalInterface` rejects a second. A default method is allowed.' },
            { line: 13, kind: 'syntax', fixes: ['public String hello() { return "Hey"; }', 'private String hello() { return "Hey"; }', 'default String hello() { return "Hey"; }'], why: 'The interface’s method is public, so an override must be too.' },
            { line: 18, kind: 'syntax', fixes: ['System.out.println(Greeter.bye());', 'System.out.println(Friend.bye());', 'System.out.println(new Greeter().bye());'], why: 'Static interface methods aren’t inherited. Call them through the interface’s name.' },
          ],
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'Write a lambda',
          body: 'The lambda’s parameters and result must match the interface’s one method.',
          code: `@FunctionalInterface
interface Calculator {
    int compute(int x, int y);
}

class Demo {
    static int run() {
        Calculator add = (x, y) [[->]] x + y;
        return add.[[compute]](2, 3);
    }
}`,
          bank: ['=>', 'add', '=', 'run'],
          explain: 'A lambda is an object that implements the interface, so you call the interface’s method on it. In Java, the arrow is `->`.',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'A lambda and a default method',
          body: 'Write a functional interface `StringTransformer` with `String transform(String s)`, plus a **default** method `twice(String s)` that applies `transform` two times.\n\nIn `Main`, set the static field `UPPER` to a **lambda** that converts to upper case, and `EXCITED` to one that adds `"!"`.',
          starter: `// your StringTransformer interface here

public class Main {
    static StringTransformer UPPER = null; // replace null with a lambda
    static StringTransformer EXCITED = null; // replace null with a lambda

    public static void main(String[] args) {
        System.out.println(UPPER.transform("java"));
        System.out.println(EXCITED.twice("wow"));
    }
}
`,
          tests: [
            { label: '`StringTransformer` is an interface', check: 'isInterface(StringTransformer.class)' },
            { label: '`UPPER` makes upper case', expr: 'Main.UPPER.transform("java")', expect: 'JAVA' },
            { label: '`EXCITED` adds `!`', expr: 'Main.EXCITED.transform("hi")', expect: 'hi!' },
            { label: '`twice` applies it two times', expr: 'Main.EXCITED.twice("hi")', expect: 'hi!!' },
            { label: 'Uses lambdas', src: '->', min: 2, fail: 'Write each transformer as a lambda: `s -> s.toUpperCase()`.' },
            { label: '`twice` is a default method', src: 'default\\s+String\\s+twice', fail: 'Declare it as `default String twice(String s) { … }`.' },
          ],
          hints: ['A lambda with one parameter needs no brackets: `s -> s + "!"`.', '`default String twice(String s) { return transform(transform(s)); }`'],
          solution: {
            code: `@FunctionalInterface
interface StringTransformer {
    String transform(String s);

    default String twice(String s) {
        return transform(transform(s));
    }
}

public class Main {
    static StringTransformer UPPER = s -> s.toUpperCase();
    static StringTransformer EXCITED = s -> s + "!";

    public static void main(String[] args) {
        System.out.println(UPPER.transform("java"));
        System.out.println(EXCITED.twice("wow"));
    }
}
`,
            steps: [
              { lines: [3, 3], text: '**One abstract method** makes it functional. Default methods don’t count.' },
              { lines: [5, 7], text: '**A default method** can call the abstract one: the object supplies it.' },
              { lines: [11, 12], text: '**Lambdas:** no class, no `new`, just the one method’s behaviour.' },
            ],
          },
        },
        {
          type: 'predict',
          eyebrow: 'Project · Tobi’s records app',
          title: 'A grading rule as a lambda',
          body: 'A functional interface has one abstract method, so a lambda can supply it.\n\nWhat does it print?',
          code: `interface GradeRule {
    String grade(int score);

    default String report(int score) {
        return score + " is " + grade(score);
    }
}

public class Main {
    public static void main(String[] args) {
        GradeRule strict = s -> s >= 70 ? "pass" : "fail";
        GradeRule lenient = s -> s >= 40 ? "pass" : "fail";
        System.out.println(strict.report(65));
        System.out.println(lenient.report(65));
    }
}`,
          options: [
            { out: '65 is fail\n65 is pass', correct: true, why: 'Each lambda supplies `grade`; the default method `report` builds the sentence around it.' },
            { out: '65 is pass\n65 is pass', why: 'The strict rule needs 70.' },
            { out: 'fail\npass', why: '`report` adds the score and “is” in front.' },
            { out: 'Compile error: interfaces can’t have bodies', why: 'Since Java 8, default methods have bodies.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'What does a default method let a library author do safely?',
          options: [
            { text: 'Make interfaces instantiable', why: 'You still can’t `new` an interface.' },
            { text: 'Give interfaces instance fields', why: 'Interfaces still have no instance fields.' },
            { text: 'Add a new method to an existing interface without breaking every class that already implements it', correct: true, why: 'Old implementers inherit the default body; that is how `forEach` was added to Java’s collections.' },
            { text: 'Remove methods', why: 'Defaults only add.' },
          ],
        },
        {
          type: 'finish',
          title: 'Modern interfaces: done.',
          body: 'Abstraction and interfaces are complete. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
