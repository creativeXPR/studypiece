// COS 202 · Abstraction and interfaces · Lesson 2: interfaces.

export default {
  id: 'interfaces',
  title: 'Interfaces',
  covers: 'Interfaces as contracts, implements, public static final variables, multiple interfaces, dynamic dispatch, abstract class vs interface',
  minutes: 13,
  sections: [
    {
      name: 'A contract',
      terms: [
        ['Interface', 'A contract of behaviour. A class `implements` it and supplies its abstract methods.'],
        ['Interface variables', 'Always `public static final`, so they are constants.'],
        ['Interface methods', 'Abstract methods are implicitly `public abstract`, so an implementing method must be `public`.'],
        ['Dynamic dispatch', 'Through an interface-typed variable, Java picks the object’s method at runtime.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Abstraction and interfaces · Lesson 2',
          title: 'Anything that can do this job',
          body: 'An ==interface== says **what** a class can do, and nothing about what it is:\n\n`interface Payable { double amountDue(); }`\n\n`class Invoice implements Payable {`\n\n`    public double amountDue() { return 500; }`\n\n`}`\n\nA class extends **one** class, but can implement **many** interfaces: `class Duck extends Bird implements Flyable, Swimmable`. That is how Java gets multiple inheritance of type.',
          cta: 'Sort them out',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Abstract class or interface?',
          buckets: [
            { id: 'abs', label: 'Abstract class' },
            { id: 'int', label: 'Interface' },
          ],
          items: [
            { text: 'Can have constructors', bucket: 'abs', why: 'An **abstract class** can. An interface has none.' },
            { text: 'A class can use many of them', bucket: 'int', why: 'A class can implement many **interfaces**, but extend only one class.' },
            { text: 'Can hold ordinary instance fields', bucket: 'abs', why: '**Abstract class:** interface variables are all constants.' },
            { text: 'Variables are `public static final`', bucket: 'int', why: 'Every **interface** variable is a constant.' },
            { text: 'Best when subclasses share state and code', bucket: 'abs', why: 'An **abstract class** is a partly built parent.' },
            { text: 'Best for a capability many unrelated classes share', bucket: 'int', why: 'Birds and planes are unrelated, but both can be `Flyable`.' },
          ],
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'extends or implements?',
          body: 'Class to class: `extends`. Class to interface: `implements`. Interface to interface: `extends`.',
          code: `interface Readable {
    String read();
}

interface Writable {
    void write(String s);
}

interface Both [[extends]] Readable, Writable { }

class Bird { }

class FileHandler [[implements]] Both {
    private String text = "";

    [[public]] String read() { return text; }

    public void write(String s) { text = s; }
}

class Duck [[extends]] Bird { }`,
          bank: ['inherits', 'private', 'abstract'],
          explain: 'Implementing methods must be `public`, because interface methods are.',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'A broken contract',
          body: 'A class can’t “implement” a class, and it must keep every promise.',
          code: `interface Vehicle {
    int WHEELS = 4;
    void speedUp(int by);
    int getSpeed();
}

class Bike implements Vehicle {
    private int speed;

    void speedUp(int by) { speed += by; }

    public int getSpeed() { return speed; }
}

public class Main {
    public static void main(String[] args) {
        Vehicle.WHEELS = 2;
        Vehicle v = new Vehicle();
        v.speedUp(3);
    }
}`,
          errors: [
            { line: 10, kind: 'syntax', fixes: ['public void speedUp(int by) { speed += by; }', 'private void speedUp(int by) { speed += by; }', 'void speedUp() { speed += 1; }'], why: 'Interface methods are public, and an implementation can’t make them less visible.' },
            { line: 17, kind: 'syntax', fixes: ['System.out.println(Vehicle.WHEELS);', 'final Vehicle.WHEELS = 2;', 'Vehicle.WHEELS == 2 = true;'], why: 'Interface variables are `final`: they can’t be reassigned.' },
            { line: 18, kind: 'syntax', fixes: ['Vehicle v = new Bike();', 'Vehicle v = Vehicle();', 'Bike v = new Vehicle();'], why: 'An interface can’t be created with `new`, but it can hold any implementing object.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Through the interface',
          code: `interface Shape {
    double area();
}

class Square implements Shape {
    public double area() { return 4; }
}

class Disc implements Shape {
    public double area() { return 3; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] all = { new Square(), new Disc(), new Square() };
        double sum = 0;
        for (Shape s : all) sum += s.area();
        System.out.println(sum);
    }
}`,
          options: [
            { out: '11.0', correct: true, why: '`4 + 3 + 4`, and a `double` prints with `.0`.' },
            { out: '11', why: '`sum` is a `double`, so it prints `11.0`.' },
            { out: '0.0', why: 'The classes supply real bodies, and Java runs them.' },
            { out: '12.0', why: 'Each object answers for itself: the `Disc` gives 3.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Things that can be paid',
          body: 'Write interface `Payable` with `double amountDue()`.\n\nImplement it in `Invoice(double total)`, whose amount due is its total, and in `Subscription(double monthly, int months)`, whose amount due is `monthly * months`.\n\nIn `Main`, write `static double totalDue(Payable[] bills)`.',
          starter: `// your Payable, Invoice and Subscription here

public class Main {
    static double totalDue(Payable[] bills) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        Payable[] bills = { new Invoice(500), new Subscription(100, 3) };
        System.out.println(totalDue(bills));
    }
}
`,
          tests: [
            { label: '`Payable` is an interface', check: 'isInterface(Payable.class)' },
            { label: 'Both classes implement it', check: 'implementsIface(Invoice.class, Payable.class) && implementsIface(Subscription.class, Payable.class)' },
            { label: 'Invoice amount', expr: 'new Invoice(500).amountDue()', expect: 500, tol: 1e-9 },
            { label: 'Subscription amount', expr: 'new Subscription(100, 3).amountDue()', expect: 300, tol: 1e-9 },
            { label: '`totalDue` adds them', main: 'Main', out: '800.0' },
            { expr: 'Main.totalDue(new Payable[]{})', expect: 0, hidden: true },
          ],
          hints: ['Implementing methods must be `public`.', 'The loop only needs `Payable`: `for (Payable p : bills)`.'],
          solution: {
            code: `interface Payable {
    double amountDue();
}

class Invoice implements Payable {
    private double total;
    Invoice(double total) { this.total = total; }
    public double amountDue() { return total; }
}

class Subscription implements Payable {
    private double monthly;
    private int months;

    Subscription(double monthly, int months) {
        this.monthly = monthly;
        this.months = months;
    }

    public double amountDue() { return monthly * months; }
}

public class Main {
    static double totalDue(Payable[] bills) {
        double sum = 0;
        for (Payable p : bills) sum += p.amountDue();
        return sum;
    }

    public static void main(String[] args) {
        Payable[] bills = { new Invoice(500), new Subscription(100, 3) };
        System.out.println(totalDue(bills));
    }
}
`,
            steps: [
              { lines: [1, 3], text: '**The contract:** anything `Payable` can report what it owes.' },
              { lines: [8, 8], text: '**Public**, because the contract’s method is.' },
              { lines: [26, 26], text: '**Dynamic dispatch:** two unrelated classes, one loop.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Interfaces: done.',
          body: 'You can write against what objects do, not what they are. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
