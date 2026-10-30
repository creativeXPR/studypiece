// COS 202 · Inheritance and polymorphism · Lesson 2: super and constructor chains.

export default {
  id: 'super',
  title: 'super and constructor chains',
  covers: 'super(...) as the first statement, the implicit super(), super.method(), private fields through getters',
  minutes: 11,
  sections: [
    {
      name: 'Talking to the parent',
      terms: [
        ['super(...)', 'Calls the parent’s constructor. It must be the **first** statement of the subclass constructor.'],
        ['super.method()', 'Calls the parent’s version of a method, even when this class overrides it.'],
        ['Implicit super()', 'If you don’t call `super(...)`, Java inserts `super()`. That fails if the parent has no no-argument constructor.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Inheritance and polymorphism · Lesson 2',
          title: 'Let the parent set up its own fields',
          body: 'The parent’s `name` is `private`, so a subclass can’t assign it. It asks the parent instead:\n\n`class Student extends Person {`\n\n`    private String id;`\n\n`    Student(String name, String id) {`\n\n`        super(name);`\n\n`        this.id = id;`\n\n`    }`\n\n`}`\n\n`super(name)` must be the **very first line**. The parent is built before the child.',
          cta: 'Find the bugs',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Student records',
          body: '`Student` should build on `Person` and keep its own list of courses.',
          code: `import java.util.ArrayList;

class Person {
    private String name;
    public Person(String name) { this.name = name; }
    public String getName() { return name; }
}

class Student extend Person {
    private String id;
    private ArrayList<String> courses;

    public Student(String name, String id) {
        this.id = id;
        super(name);
        ArrayList<String> courses = new ArrayList<>();
    }

    public int count() { return courses.size(); }
}`,
          errors: [
            { line: 9, kind: 'syntax', fixes: ['class Student extends Person {', 'class Student implements Person {', 'class Student inherits Person {'], why: 'The keyword is `extends`. A misspelt keyword won’t compile.' },
            { line: 14, kind: 'syntax', fixes: ['super(name);', 'this.name = name;', 'id = this.id;'], why: '`super(...)` must come first, so swap these two lines.' },
            { line: 15, kind: 'syntax', fixes: ['this.id = id;', 'super.id = id;', 'super(id);'], why: 'This is the other half of the swap: the field is set after `super`.' },
            { line: 16, kind: 'semantic', fixes: ['courses = new ArrayList<>();', 'this.courses = courses;', 'ArrayList<String> this.courses = new ArrayList<>();'], why: 'It compiles, but it declares a **new local variable**. The field stays `null`, so `count()` throws `NullPointerException`.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Extending a method with super',
          code: `class Vehicle {
    String info() { return "Vehicle"; }
}

class Car extends Vehicle {
    @Override
    String info() { return super.info() + " > Car"; }
}

class Taxi extends Car {
    @Override
    String info() { return super.info() + " > Taxi"; }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Taxi().info());
    }
}`,
          options: [
            { out: 'Vehicle > Car > Taxi', correct: true, why: 'Each version asks its parent first, then adds its own part.' },
            { out: 'Taxi', why: '`super.info()` runs the parent’s version too.' },
            { out: 'Taxi > Car > Vehicle', why: 'The parent’s text comes first in each `return`.' },
            { out: 'Vehicle > Taxi', why: '`super` means the direct parent, so `Car` runs too.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'The parent has only `Person(String name)`. The child’s constructor doesn’t call `super`. What happens?',
          options: [
            { text: 'It won’t compile: the implicit `super()` finds no constructor', correct: true, why: 'Java tries `super()` and the parent has none with no arguments. Call `super(name)` yourself.' },
            { text: 'The name is set to `null`', why: 'The parent must be constructed, and no no-argument constructor exists.' },
            { text: 'Java passes the child’s arguments up automatically', why: 'Java never guesses arguments.' },
            { text: 'It compiles, then crashes', why: 'The compiler catches it.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Person and Student',
          body: 'Write `Person` with a **private** `name`, a constructor `Person(String name)` and `getName()`.\n\nWrite `Student extends Person` with a private `id`, a constructor `Student(String name, String id)` that uses `super`, `getId()`, and `toString()` returning `"Ada (UI/001)"` style text.',
          starter: `// your Person and Student classes here

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ada", "UI/001");
        System.out.println(s);
    }
}
`,
          tests: [
            { label: '`Student` extends `Person`', check: 'extendsClass(Student.class, Person.class)' },
            { label: '`name` stays private in `Person`', check: 'fieldHas(Person.class, "name", "private")' },
            { label: 'The inherited getter works', expr: 'new Student("Ada", "X").getName()', expect: 'Ada' },
            { label: '`getId()` returns the id', expr: 'new Student("Ada", "X").getId()', expect: 'X' },
            { label: '`toString()` is formatted', expr: 'new Student("Ada", "UI/001").toString()', expect: 'Ada (UI/001)' },
            { label: 'Uses `super(...)`', src: 'super\\s*\\(', fail: 'Pass the name up with `super(name);`.' },
            { main: 'Main', out: 'Ada (UI/001)', hidden: true },
          ],
          hints: ['First line of the constructor: `super(name);`', 'Inside `Student`, use `getName()`: `name` is private to `Person`.'],
          solution: {
            code: `class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

class Student extends Person {
    private String id;

    public Student(String name, String id) {
        super(name);
        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return getName() + " (" + id + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ada", "UI/001");
        System.out.println(s);
    }
}
`,
            steps: [
              { lines: [17, 17], text: '**`super(name)` first:** the parent sets up its own private field.' },
              { lines: [18, 18], text: '**Then the child’s own field.**' },
              { lines: [25, 28], text: '**The inherited getter** reads the private name. `println` calls `toString()` automatically.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'super: done.',
          body: 'Parents and children now cooperate. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
