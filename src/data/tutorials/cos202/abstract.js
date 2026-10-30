// COS 202 · Abstraction and interfaces · Lesson 1: abstract classes.

export default {
  id: 'abstract',
  title: 'Abstract classes',
  covers: 'Abstraction, abstract classes and methods, concrete methods, constructors in abstract classes, when to use them',
  minutes: 13,
  sections: [
    {
      name: 'What, not how',
      terms: [
        ['Abstraction', 'Hiding how something works and showing only what it does, like a TV remote or an ATM.'],
        ['Abstract class', 'Declared `abstract`; can’t be created with `new`. It may hold abstract and concrete methods, fields and constructors.'],
        ['Abstract method', 'Has no body (`abstract double area();`). Every concrete subclass must supply one.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Abstraction and interfaces · Lesson 1',
          title: 'A promise the children must keep',
          body: 'Press a TV remote’s button and the TV turns on. You don’t need to know how. That is ==abstraction==: **what**, not **how**.\n\n`abstract class Shape {`\n\n`    abstract double area();`\n\n`    void hello() { System.out.println("I am a shape"); }`\n\n`}`\n\nThere is no such thing as a plain “shape”, so `new Shape()` won’t compile. But every real shape **must** provide `area()`.',
          cta: 'Spot the rules',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about abstract classes are true?',
          options: [
            { text: 'They can have constructors', correct: true, why: '**True:** subclasses call them with `super(...)`.' },
            { text: 'They can have methods with bodies', correct: true, why: '**True:** concrete methods are shared by all subclasses.' },
            { text: 'You can create one with `new`', why: '**False:** only concrete subclasses can be created.' },
            { text: 'A variable can have an abstract type', correct: true, why: '**True:** `Shape s = new Circle(2);` is the usual pattern.' },
            { text: 'A subclass must implement every abstract method or be abstract itself', correct: true, why: '**True:** otherwise it won’t compile.' },
            { text: 'An abstract method can have a body', why: '**False:** it ends in `;` with no body.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Payment methods',
          body: 'Every payment method records an amount and a status. Cards take a 1.5% fee.',
          code: `abstract class PaymentMethod {
    protected double amountPaid;
    protected String status = "PENDING";

    public String printReceipt() {
        return "Paid: " + amountPaid + ", " + status;
    }

    public abstract void process(double amount) { }
}

class CardPayment extends PaymentMethod {
    @Override
    public void process(double amount) {
        amountPaid = amount * 0.015;
        status = "APPROVED";
    }
}`,
          errors: [
            { line: 9, kind: 'syntax', fixes: ['public abstract void process(double amount);', 'public void abstract process(double amount) { }', 'abstract public process(double amount);'], why: 'An abstract method has no body: end it with `;` instead of `{ }`.' },
            { line: 15, kind: 'semantic', fixes: ['amountPaid = amount * 1.015;', 'amountPaid = amount + 0.015;', 'amountPaid = 0.015;'], why: 'It compiles, but it charges only the fee. The total is the amount plus 1.5%: `amount * 1.015`.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Abstract parent, concrete child',
          code: `abstract class Shape {
    String color;

    Shape(String color) {
        System.out.println("Shape constructor");
        this.color = color;
    }

    abstract double area();

    String describe() {
        return color + " area " + area();
    }
}

class Square extends Shape {
    double side;

    Square(String color, double side) {
        super(color);
        this.side = side;
        System.out.println("Square constructor");
    }

    @Override
    double area() { return side * side; }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Square("Red", 3);
        System.out.println(s.describe());
    }
}`,
          options: [
            { out: 'Shape constructor\nSquare constructor\nRed area 9.0', correct: true, why: 'The parent’s constructor runs first. `describe()` lives in `Shape`, yet its `area()` call runs the `Square` version. And `double` prints as `9.0`.' },
            { out: 'Square constructor\nShape constructor\nRed area 9.0', why: '`super(color)` runs first.' },
            { out: 'Shape constructor\nSquare constructor\nRed area 9', why: '`area()` returns a `double`, which prints with `.0`.' },
            { out: 'Square constructor\nRed area 9.0', why: 'An abstract class’s constructor still runs.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'The Shape hierarchy',
          body: 'Write abstract class `Shape` with abstract `double area()`.\n\nWrite `Circle(double r)`, `Rectangle(double w, double h)` and `Triangle(double b, double h)`, each overriding `area()`.\n\nIn `Main`, write `static double total(Shape[] shapes)`, which returns the sum of all the areas.',
          starter: `// your Shape, Circle, Rectangle and Triangle here

public class Main {
    static double total(Shape[] shapes) {
        // your code here
        return 0;
    }

    public static void main(String[] args) {
        Shape[] shapes = { new Circle(1), new Rectangle(2, 3), new Triangle(4, 5) };
        for (Shape s : shapes) System.out.println(s.area());
        System.out.println(total(shapes));
    }
}
`,
          tests: [
            { label: '`Shape` is abstract', check: 'isAbstract(Shape.class)' },
            { label: '`area` is abstract in `Shape`', check: 'methodHas(Shape.class, "area", "abstract")' },
            { label: 'Circle area', expr: 'new Circle(1).area()', expect: 3.14159265, tol: 1e-6 },
            { label: 'Rectangle area', expr: 'new Rectangle(2, 3).area()', expect: 6, tol: 1e-9 },
            { label: 'Triangle area', expr: 'new Triangle(4, 5).area()', expect: 10, tol: 1e-9 },
            { label: '`total` adds them through `Shape`', expr: 'Main.total(new Shape[]{ new Rectangle(2, 3), new Triangle(4, 5) })', expect: 16, tol: 1e-9 },
            { check: 'extendsClass(Circle.class, Shape.class) && extendsClass(Rectangle.class, Shape.class) && extendsClass(Triangle.class, Shape.class)', hidden: true },
            { expr: 'Main.total(new Shape[]{})', expect: 0, hidden: true },
          ],
          hints: ['`abstract double area();` has no body.', 'A triangle’s area is `0.5 * b * h`.'],
          solution: {
            code: `abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    private double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
}

class Rectangle extends Shape {
    private double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}

class Triangle extends Shape {
    private double b, h;
    Triangle(double b, double h) { this.b = b; this.h = h; }
    @Override double area() { return 0.5 * b * h; }
}

public class Main {
    static double total(Shape[] shapes) {
        double sum = 0;
        for (Shape s : shapes) sum += s.area();
        return sum;
    }

    public static void main(String[] args) {
        Shape[] shapes = { new Circle(1), new Rectangle(2, 3), new Triangle(4, 5) };
        for (Shape s : shapes) System.out.println(s.area());
        System.out.println(total(shapes));
    }
}
`,
            steps: [
              { lines: [1, 3], text: '**The promise:** every shape has an area, but no general formula exists.' },
              { lines: [5, 21], text: '**The keepers:** each subclass supplies its own formula.' },
              { lines: [26, 26], text: '**Runtime polymorphism:** `total` never needs to know which shape it holds.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Abstract classes: done.',
          body: 'You can leave details to subclasses, and be sure they fill them in. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
