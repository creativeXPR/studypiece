// COS 202 · Classes and objects · Lesson 2: constructors and this.

export default {
  id: 'constructors',
  title: 'Constructors and this',
  covers: 'What a constructor is, default, parameterised, copy and private constructors, this, the default constructor rule',
  minutes: 14,
  sections: [
    {
      name: 'Setting up an object',
      terms: [
        ['Constructor', 'Special code that runs when `new` creates an object. It has the class’s name and **no return type**, not even `void`.'],
        ['this', 'The current object. `this.name = name` separates a field from a parameter with the same name.'],
        ['Default constructor', 'If you write no constructor, Java supplies an empty one. As soon as you write any constructor, it stops.'],
        ['Copy constructor', 'Builds a new object from an existing one: `Point(Point p)`.'],
        ['Private constructor', 'Stops other classes from using `new` on this class.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Classes and objects · Lesson 2',
          title: 'Born ready',
          body: 'A ==constructor== gives a new object its starting values:\n\n`class Car {`\n\n`    int year;`\n\n`    Car(int year) { this.year = year; }`\n\n`}`\n\n`Car c = new Car(2024);`\n\nTwo rules examiners love: its name **matches the class exactly**, and it has **no return type**. Add `void` and it stops being a constructor.',
          cta: 'See the types',
        },
        {
          type: 'reveal',
          eyebrow: 'Four kinds',
          title: 'Open each constructor',
          cards: [
            { title: 'Default', text: '`Car() { }`: no parameters, starting values only.' },
            { title: 'Parameterised', text: '`Car(int year) { … }`: the caller chooses the values.' },
            { title: 'Copy', text: '`Car(Car other) { year = other.year; }`: a new object with the same values.' },
            { title: 'Private', text: '`private Car() { }`: only the class itself can create objects.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'The shadowed field',
          body: 'A parameter with the same name as a field hides it inside the constructor. Compare `a` and `b`.',
          code: `class A {
    int x;
    A(int x) { x = x; }
}

class B {
    int x;
    B(int x) { this.x = x; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new A(5).x);
        System.out.println(new B(5).x);
    }
}`,
          options: [
            { out: '0\n5', correct: true, why: 'In `A`, `x = x` assigns the parameter to itself, leaving the field at `0`. In `B`, `this.x` is the field.' },
            { out: '5\n5', why: 'Without `this`, both `x`s mean the parameter, so the field is never set.' },
            { out: '0\n0', why: '`this.x = x` does set the field in `B`.' },
            { out: '5\n0', why: 'It’s `A` that has the bug, not `B`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The constructor that isn’t',
          body: 'This should print `Toyota 2024`.',
          code: `class Car {
    String brand;
    int year;

    void Car(String brand, int year) {
        this.brand = brand;
        year = year;
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car("Toyota", 2024);
        System.out.println(c.brand + " " + c.year);
    }
}`,
          errors: [
            { line: 5, kind: 'syntax', fixes: ['Car(String brand, int year) {', 'void Car(String brand, year) {', 'public void Car() {'], why: 'With `void` it is an ordinary method, so `new Car("Toyota", 2024)` finds no matching constructor and won’t compile.' },
            { line: 7, kind: 'semantic', fixes: ['this.year = year;', 'year = this.year;', 'int year = year;'], why: 'It compiles, but it assigns the parameter to itself. The field stays `0`.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'A class has only `Car(int year)`. What does `new Car()` do?',
          options: [
            { text: 'It won’t compile: there is no no-argument constructor', correct: true, why: 'Java supplies a default constructor only when you write **none**. Add `Car() { }` if you want both.' },
            { text: 'It makes a car with `year` set to 0', why: 'That would need a no-argument constructor, and writing one with parameters removes the automatic one.' },
            { text: 'It calls `Car(int year)` with 0', why: 'Java never invents arguments.' },
            { text: 'It compiles but crashes when run', why: 'The compiler catches this first.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Three ways to build a Student',
          body: 'In class `Student` (fields `name` and `level`) write:\n\na **parameterised** constructor `Student(String name, int level)`,\n\na **default** constructor that sets name to `"Unknown"` and level to `100`,\n\nand a **copy** constructor `Student(Student other)`.',
          starter: `class Student {
    String name;
    int level;

    // your three constructors here
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Ada", 200);
        Student b = new Student();
        Student c = new Student(a);
        System.out.println(a.name + " " + b.name + " " + c.level);
    }
}
`,
          tests: [
            { label: 'Parameterised sets both fields', body: 'Student s = new Student("Ada", 200); return s.name + s.level;', expect: 'Ada200' },
            { label: 'Default gives Unknown, level 100', body: 'Student s = new Student(); return s.name + s.level;', expect: 'Unknown100' },
            { label: 'Copy has the same values', body: 'Student s = new Student(new Student("Bo", 300)); return s.name + s.level;', expect: 'Bo300' },
            { label: 'A copy is a separate object', body: 'Student a = new Student("Bo", 300); Student c = new Student(a); a.level = 400; return c.level;', expect: 300 },
            { label: '`main` runs', main: 'Main', out: 'Ada Unknown 200', hidden: true },
          ],
          hints: ['Constructors have no return type, and each one has a different parameter list.', 'In the copy constructor: `this.name = other.name;`'],
          solution: {
            code: `class Student {
    String name;
    int level;

    Student(String name, int level) {
        this.name = name;
        this.level = level;
    }

    Student() {
        this("Unknown", 100);
    }

    Student(Student other) {
        this(other.name, other.level);
    }
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student("Ada", 200);
        Student b = new Student();
        Student c = new Student(a);
        System.out.println(a.name + " " + b.name + " " + c.level);
    }
}
`,
            steps: [
              { lines: [5, 8], text: '**Parameterised:** `this.` separates each field from its parameter.' },
              { lines: [10, 12], text: '**`this(…)`** calls another constructor of the same class. It must be the first line.' },
              { lines: [14, 16], text: '**Copy:** a new object, built from another’s values. Setting the fields directly works too.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Constructors: done.',
          body: 'Objects now start life ready to use. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
