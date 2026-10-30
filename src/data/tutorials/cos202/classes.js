// COS 202 · Classes and objects · Lesson 1: classes, objects, attributes, new, null.

export default {
  id: 'classes',
  title: 'Classes, objects and attributes',
  covers: 'Class as blueprint, objects with new, state, behaviour and identity, dot syntax, default values, references and null',
  minutes: 14,
  sections: [
    {
      name: 'Blueprints and objects',
      terms: [
        ['Class', 'A blueprint defining fields (state) and methods (behaviour).'],
        ['Object', 'An instance of a class, created with `new`. It has state, behaviour and identity.'],
        ['Attribute (field)', 'A variable that belongs to a class. Each object has its own copy, reached with dot syntax.'],
        ['null', 'A reference that points at no object. Using it throws `NullPointerException`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Classes and objects · Lesson 1',
          title: 'One blueprint, many objects',
          body: 'A ==class== is a blueprint; an ==object== is a thing built from it. `Car` is the class; your neighbour’s car is an object.\n\n`class Car { int speed; }`\n\n`Car a = new Car();`\n\n`a.speed = 80;`\n\nEvery object has **state** (its field values), **behaviour** (its methods) and **identity** (it is its own object, even if another holds the same values).',
          cta: 'Build some',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Each object has its own fields',
          code: `class Student {
    String name;
    int level;
}

public class Main {
    public static void main(String[] args) {
        Student a = new Student();
        Student b = new Student();
        a.name = "Ada";
        a.level = 200;
        System.out.println(a.name + " " + a.level);
        System.out.println(b.name + " " + b.level);
    }
}`,
          options: [
            { out: 'Ada 200\nnull 0', correct: true, why: '`b` is a separate object. Its fields keep their defaults: `null` for a `String`, `0` for an `int`.' },
            { out: 'Ada 200\nAda 200', why: 'Each object has its own fields. Only `static` fields are shared.' },
            { out: 'Ada 200\n 0', why: 'An unset `String` field is `null`, not empty text.' },
            { out: 'Ada 200', why: 'The second `println` still prints `b`’s default values.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Two names, one object',
          body: 'A variable of a class type holds a **reference** to an object, not the object itself.',
          code: `class Car {
    int speed;
}

public class Main {
    public static void main(String[] args) {
        Car a = new Car();
        Car b = a;
        b.speed = 80;
        System.out.println(a.speed);
        System.out.println(a == b);
        Car c = new Car();
        c.speed = 80;
        System.out.println(a == c);
    }
}`,
          options: [
            { out: '80\ntrue\nfalse', correct: true, why: '`b = a` copies the reference, so both name one car. `==` compares identity, so `c` (a different object with the same value) is not `==`.' },
            { out: '0\nfalse\nfalse', why: '`Car b = a` does not build a new car: only `new` does that.' },
            { out: '80\ntrue\ntrue', why: '`==` on objects asks “the same object?”, not “the same values?”.' },
            { out: '0\ntrue\nfalse', why: 'Changing the car through `b` is visible through `a`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'A book with no pages',
          body: 'This should create a book and print its title.',
          code: `class Book {
    String title;
    double price;
}

public class Main {
    public static void main(String[] args) {
        Book b = null;
        b.title = "Java";
        Book c = new book();
        System.out.println(b.title);
    }
}`,
          errors: [
            { line: 8, kind: 'semantic', fixes: ['Book b = new Book();', 'Book b = Book();', 'Book b;'], why: 'It compiles, but `b` points at nothing: the next line throws `NullPointerException`.' },
            { line: 10, kind: 'syntax', fixes: ['Book c = new Book();', 'Book c = new book;', 'book c = new book();'], why: 'Java is case-sensitive. There is no class called `book`, so this won’t compile.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Create a Book class',
          body: 'Write a class `Book` with fields `title`, `author` (both `String`) and `price` (`double`). Then in `main`, create a book, set its fields to `"Java"`, `"Ayo"` and `2500.0`, and print the title and price separated by a space.',
          starter: `// your Book class here

public class Main {
    public static void main(String[] args) {
        // create a Book, set its fields, print "Java 2500.0"
    }
}
`,
          tests: [
            { label: '`Book` has the three fields', body: 'Book b = new Book(); b.title = "T"; b.author = "A"; b.price = 1.5; return b.title + b.author + b.price;', expect: 'TA1.5' },
            { label: 'New books start with no title', body: 'return new Book().title;', expect: 'null' },
            { label: '`main` prints the title and price', main: 'Main', out: 'Java 2500.0' },
          ],
          hints: ['A class is just `class Book { … }` with the fields inside, and no `public` here (only one class per file can be public).', 'In `main`: `Book b = new Book();` then `b.title = "Java";` and so on.'],
          solution: {
            code: `class Book {
    String title;
    String author;
    double price;
}

public class Main {
    public static void main(String[] args) {
        Book b = new Book();
        b.title = "Java";
        b.author = "Ayo";
        b.price = 2500.0;
        System.out.println(b.title + " " + b.price);
    }
}
`,
            steps: [
              { lines: [1, 5], text: '**The blueprint:** three fields, and no objects yet.' },
              { lines: [9, 9], text: '**`new`** builds an object and gives back a reference to it.' },
              { lines: [10, 12], text: '**Dot syntax** sets this object’s fields.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Classes and objects: done.',
          body: 'Blueprints, objects, fields and references are clear. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
