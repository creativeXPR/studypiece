// COS 202 · Modifiers · Lesson 2: non-access modifiers.
import { staticScene } from './memory-scenes';

export default {
  id: 'final-static',
  title: 'final, static and friends',
  covers: 'Constants with final, final methods and classes, static fields and methods, abstract, transient, synchronized, volatile',
  minutes: 13,
  sections: [
    {
      name: 'final and static',
      terms: [
        ['final', 'A final variable can’t be reassigned, a final method can’t be overridden, and a final class can’t be inherited.'],
        ['static', 'Belongs to the class, not to objects. All objects share a static field; a static method needs no object.'],
        ['Constant', '`public static final double PI = 3.14;`: shared by everyone and never changing. Named in capitals.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which access level do you get with no modifier at all?',
          options: [
            { text: 'public', why: 'You must write public explicitly.' },
            { text: 'private', why: 'Package access is wider than private.' },
            { text: 'protected', why: 'protected also includes subclasses elsewhere.' },
            { text: 'Package access: visible to classes in the same package', correct: true, why: 'It is often called default or package-private.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Modifiers · Lesson 2',
          title: 'Modifiers that add features',
          body: '==final== means “this can’t change”:\n\n`final int MAX = 10;` no reassigning.\n\n`final void pay()` no overriding.\n\n`final class Circle` no subclasses.\n\n==static== means “belongs to the class”: one copy, shared by all objects. Call it through the class: `Math.sqrt(9)` needs no `new Math()`.',
          cta: 'See it shared',
        },
        staticScene,
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'One counter, many objects',
          code: `class Counter {
    static int total = 0;
    int mine = 0;

    Counter() {
        total++;
        mine++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();
        Counter c = new Counter();
        System.out.println(Counter.total);
        System.out.println(c.mine);
    }
}`,
          options: [
            { out: '3\n1', correct: true, why: 'All objects share one `total`, so it reaches 3. Each object has its own `mine`, which is 1.' },
            { out: '1\n1', why: '`static` means one shared `total`, and each constructor adds to it.' },
            { out: '3\n3', why: '`mine` isn’t static, so each object starts its own at 0.' },
            { out: '1\n3', why: 'It’s the other way round: `total` is shared.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Static can’t see instance',
          body: 'Find what stops this from compiling.',
          code: `public class Main {
    final double RATE = 0.05;
    int count = 0;

    public static void main(String[] args) {
        Main m = new Main();
        m.RATE = 0.1;
        count = 5;
        System.out.println(m.RATE);
    }
}`,
          errors: [
            { line: 7, kind: 'syntax', fixes: ['System.out.println(m.RATE * 2);', 'm.final RATE = 0.1;', 'm.RATE == 0.1 = true;'], why: 'A `final` field can’t be assigned again, so this won’t compile. Read it instead.' },
            { line: 8, kind: 'syntax', fixes: ['m.count = 5;', 'Main.count = 5;', 'static count = 5;'], why: '`main` is static, so it has no object of its own. `count` belongs to an object: use `m.count`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'A shared rate and a static helper',
          body: 'Write class `BankAccount` with:\n\na constant `RATE` that is `public static final double`, value `0.05`,\n\na static `int` field `count` that goes up each time an account is created,\n\na constructor `BankAccount(double balance)`,\n\nand `interest()` that returns `balance * RATE`.\n\nAlso write class `MathUtils` with a static method `square(int n)`.',
          starter: `// your classes here

public class Main {
    public static void main(String[] args) {
        BankAccount a = new BankAccount(1000);
        new BankAccount(2000);
        System.out.println(a.interest());
        System.out.println(BankAccount.count);
        System.out.println(MathUtils.square(4));
    }
}
`,
          tests: [
            { label: '`RATE` is public static final', check: 'fieldHas(BankAccount.class, "RATE", "public static final")' },
            { label: '`interest()` of 1000 is 50', expr: 'new BankAccount(1000).interest()', expect: 50, tol: 1e-9 },
            { label: '`count` is static', check: 'fieldHas(BankAccount.class, "count", "static")' },
            { label: 'Each new account adds to `count`', body: 'int before = BankAccount.count; new BankAccount(1); new BankAccount(2); return BankAccount.count - before;', expect: 2 },
            { label: '`square` works without an object', expr: 'MathUtils.square(4)', expect: 16 },
            { check: 'methodHas(MathUtils.class, "square", "static")', hidden: true },
          ],
          hints: ['Increase `count` inside the constructor.', '`public static final double RATE = 0.05;`'],
          solution: {
            code: `class BankAccount {
    public static final double RATE = 0.05;
    static int count = 0;
    private double balance;

    BankAccount(double balance) {
        this.balance = balance;
        count++;
    }

    double interest() {
        return balance * RATE;
    }
}

class MathUtils {
    static int square(int n) {
        return n * n;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount a = new BankAccount(1000);
        new BankAccount(2000);
        System.out.println(a.interest());
        System.out.println(BankAccount.count);
        System.out.println(MathUtils.square(4));
    }
}
`,
            steps: [
              { lines: [2, 2], text: '**A constant:** one shared value that no object can change.' },
              { lines: [3, 8], text: '**A shared counter:** every constructor call adds to the same `count`.' },
              { lines: [17, 19], text: '**A static helper:** it uses no fields, so it needs no object.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'final and static: set.',
          recap: ['`final` locks; `static` shares.', 'Static code can’t use instance members without an object.'],
          why: 'A quick tour of the other four.',
        },
      ],
    },
    {
      name: 'The rest of the family',
      terms: [
        ['abstract', 'On a class: it can’t be instantiated. On a method: it has no body, and a subclass supplies one.'],
        ['transient', 'A field that is skipped when the object is serialized.'],
        ['synchronized', 'A method only one thread can run at a time on an object.'],
        ['volatile', 'A field never cached per thread; it is always read from main memory.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'Match them',
          prompt: 'Which modifier does each sentence describe?',
          buckets: [
            { id: 'a', label: 'abstract' },
            { id: 't', label: 'transient' },
            { id: 's', label: 'synchronized' },
            { id: 'v', label: 'volatile' },
          ],
          items: [
            { text: 'Has no body: a subclass provides it', bucket: 'a', why: '`abstract void run();` has no body.' },
            { text: 'Skipped when saving an object', bucket: 't', why: '`transient` fields aren’t serialized.' },
            { text: 'One thread at a time', bucket: 's', why: '`synchronized` methods lock the object.' },
            { text: 'Always read from main memory', bucket: 'v', why: '`volatile` values aren’t cached thread-locally.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Project · Tobi’s records app',
          title: 'Count every student',
          body: 'A static field is shared by all objects, which makes it a natural counter.\n\nWhat does it print?',
          code: `class Student {
    static int count = 0;
    static final double MAX_CGPA = 5.0;
    String name;

    Student(String name) {
        this.name = name;
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        new Student("Tobi");
        new Student("Ada");
        Student f = new Student("Femi");
        System.out.println(Student.count + " " + f.count + " " + Student.MAX_CGPA);
    }
}`,
          options: [
            { out: '3 3 5.0', correct: true, why: 'Three constructions, one shared field: 3, whether you read it through the class or an object.' },
            { out: '3 1 5.0', why: 'There is only one `count`, shared: reading it through `f` gives 3 too.' },
            { out: '1 1 5.0', why: 'Each constructor call adds 1 to the same shared count.' },
            { out: '3 3 5', why: '`MAX_CGPA` is a double, so it prints 5.0.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why can’t a `static` method use an instance field like `name` directly?',
          options: [
            { text: 'Static methods can’t use any variables', why: 'They can use static fields and their own locals.' },
            { text: 'Instance fields are private', why: 'Even public instance fields need an object.' },
            { text: 'A static method belongs to the class, so there is no particular object whose `name` it could mean', correct: true, why: 'Pass an object in, or make the method an instance method.' },
            { text: 'It is only a style rule', why: 'The compiler enforces it.' },
          ],
        },
        {
          type: 'finish',
          title: 'Modifiers: done.',
          body: 'You can read any modifier on any line. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
