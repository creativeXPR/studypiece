// COS 202 · Inheritance and polymorphism · Lesson 3: overriding, overloading and runtime polymorphism.

export default {
  id: 'polymorphism',
  title: 'Overriding and polymorphism',
  covers: 'Overriding vs overloading, @Override, compile-time and runtime polymorphism, dynamic dispatch, arrays of a parent type',
  minutes: 13,
  sections: [
    {
      name: 'Many forms',
      terms: [
        ['Polymorphism', '“Many forms”: one call behaves differently depending on the object.'],
        ['Overriding', 'A subclass redefines a parent’s method with the **same signature**. Resolved at runtime (runtime polymorphism).'],
        ['Overloading', 'Same name, **different parameters**, usually in one class. Resolved at compile time.'],
        ['@Override', 'Asks the compiler to confirm that this method really overrides one. Catches typos.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Inheritance and polymorphism · Lesson 3',
          title: 'Same call, different behaviour',
          body: 'A parent variable can hold a child object, because a Dog IS-A Animal:\n\n`Animal a = new Dog();`\n\n`a.sound();`\n\nThe **variable’s type** decides what you may call. The **object’s type** decides which version runs. That is ==polymorphism==: Java picks the method at runtime.',
          cta: 'See it run',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Which sound?',
          code: `class Animal {
    void sound() { System.out.println("Some sound"); }
}

class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}

class Cat extends Animal { }

public class Main {
    public static void main(String[] args) {
        Animal[] pets = { new Dog(), new Cat(), new Animal() };
        for (Animal p : pets) {
            p.sound();
        }
    }
}`,
          options: [
            { out: 'Bark\nSome sound\nSome sound', correct: true, why: 'The object decides. `Dog` overrides; `Cat` doesn’t, so it inherits the parent’s version.' },
            { out: 'Some sound\nSome sound\nSome sound', why: 'The variable’s type doesn’t choose the version. The object’s type does.' },
            { out: 'Bark\nMeow\nSome sound', why: '`Cat` has no `sound` of its own.' },
            { out: 'Bark', why: 'The loop visits all three objects.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Overriding or overloading?',
          buckets: [
            { id: 'ride', label: 'Overriding' },
            { id: 'load', label: 'Overloading' },
          ],
          items: [
            { text: 'Same signature in a subclass', bucket: 'ride', why: '**Overriding** replaces the parent’s version.' },
            { text: 'Same name, different parameters', bucket: 'load', why: '**Overloading** adds another version.' },
            { text: 'Decided at runtime', bucket: 'ride', why: '**Overriding** follows the object’s real type.' },
            { text: 'Decided at compile time', bucket: 'load', why: '**Overloading** follows the arguments’ types.' },
            { text: '`print(int)` and `print(String)`', bucket: 'load', why: 'Different parameter types: **overloading**.' },
            { text: 'Needs inheritance', bucket: 'ride', why: 'Only a subclass can **override**.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'An override that doesn’t',
          body: 'Each shape should report its own area. Use `Shape` as the variable’s type.',
          code: `class Shape {
    double area() { return 0; }
}

class Square extends Shape {
    double side = 2;

    @Override
    double Area() { return side * side; }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Square();
        System.out.println(s.side);
        System.out.println(s.area());
    }
}`,
          errors: [
            { line: 9, kind: 'syntax', fixes: ['double area() { return side * side; }', 'void area() { return side * side; }', 'double area(double side) { return side * side; }'], why: '`Area` isn’t `area`, so it overrides nothing, and `@Override` makes the compiler say so.' },
            { line: 15, kind: 'syntax', fixes: ['System.out.println(((Square) s).side);', 'System.out.println(s.getSide);', 'System.out.println(Shape.side);'], why: 'The variable’s type is `Shape`, which has no `side`. A cast tells the compiler it is really a `Square`.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Which method can a subclass **not** override?',
          options: [
            { text: 'A `final` method', correct: true, why: '`final` locks a method. `private` methods can’t be overridden either, since subclasses can’t see them, and `static` ones are hidden rather than overridden.' },
            { text: 'A `public` method', why: 'Those are the usual ones to override.' },
            { text: 'A `protected` method', why: 'Subclasses can see and override these.' },
            { text: 'A method that returns `void`', why: 'The return type doesn’t stop overriding.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'A choir of animals',
          body: 'Write `Animal` with `String sound()` returning `"..."`. Override it in `Dog` (`"Bark"`) and `Cat` (`"Meow"`), using `@Override`.\n\nIn `Main`, write `static String chorus(Animal[] pets)`, which joins every sound with a space. It must work for any `Animal`.',
          starter: `// your Animal, Dog and Cat classes here

public class Main {
    static String chorus(Animal[] pets) {
        // your code here
        return "";
    }

    public static void main(String[] args) {
        Animal[] pets = { new Dog(), new Cat(), new Animal() };
        System.out.println(chorus(pets));
    }
}
`,
          tests: [
            { label: '`Dog` and `Cat` extend `Animal`', check: 'extendsClass(Dog.class, Animal.class) && extendsClass(Cat.class, Animal.class)' },
            { label: 'Each overrides `sound()`', check: 'declares(Dog.class, "sound") && declares(Cat.class, "sound")' },
            { label: 'A Dog held as an Animal barks', body: 'Animal a = new Dog(); return a.sound();', expect: 'Bark' },
            { label: '`chorus` joins the sounds', expr: 'Main.chorus(new Animal[]{ new Dog(), new Cat() })', expect: 'Bark Meow' },
            { label: 'Uses `@Override`', src: '@Override', min: 2, fail: 'Mark both overriding methods with `@Override`.' },
            { label: 'No `instanceof` needed', src: 'instanceof', absent: true, fail: 'Let polymorphism choose the method instead of checking the type.' },
            { expr: 'Main.chorus(new Animal[]{ new Animal() })', expect: '...', hidden: true },
            { expr: 'Main.chorus(new Animal[]{})', expect: '', hidden: true },
          ],
          hints: ['Loop over the array and call `sound()` on each: Java picks the right version.', 'Only add a space between sounds, not after the last. `String.join` or an `if` both work.'],
          solution: {
            code: `class Animal {
    String sound() { return "..."; }
}

class Dog extends Animal {
    @Override
    String sound() { return "Bark"; }
}

class Cat extends Animal {
    @Override
    String sound() { return "Meow"; }
}

public class Main {
    static String chorus(Animal[] pets) {
        String out = "";
        for (int i = 0; i < pets.length; i++) {
            if (i > 0) out += " ";
            out += pets[i].sound();
        }
        return out;
    }

    public static void main(String[] args) {
        Animal[] pets = { new Dog(), new Cat(), new Animal() };
        System.out.println(chorus(pets));
    }
}
`,
            steps: [
              { lines: [5, 13], text: '**Override** with the exact same signature. `@Override` catches any slip.' },
              { lines: [20, 20], text: '**Polymorphism:** the same call, and each object answers its own way.' },
            ],
            note: 'Add a `Cow` tomorrow and `chorus` keeps working without a single change. That is the point.',
          },
        },
        {
          type: 'finish',
          title: 'Polymorphism: done.',
          body: 'One interface, many forms. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
