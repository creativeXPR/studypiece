// COS 202 · Inheritance and polymorphism · Lesson 1: extends, IS-A and the five inheritance types.

export default {
  id: 'inheritance',
  title: 'Inheritance and IS-A',
  covers: 'extends, superclass and subclass, IS-A, single, multilevel, hierarchical, multiple and hybrid inheritance, what a subclass can do',
  minutes: 14,
  sections: [
    {
      name: 'Reusing a class',
      terms: [
        ['Inheritance', 'A class acquires the fields and methods of another with `extends`, reusing code and modelling an IS-A relationship.'],
        ['Superclass / subclass', 'The superclass is inherited from; the subclass inherits and may add or change things.'],
        ['IS-A', 'A subclass object is also a superclass object: a `Dog` IS-A `Animal`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Inheritance and polymorphism · Lesson 1',
          title: 'Write it once in the parent',
          body: '`class Animal { void eat() { … } }`\n\n`class Dog extends Animal { void bark() { … } }`\n\nA `Dog` now has **both** `eat()` and `bark()`. `Animal` is the ==superclass==, `Dog` the ==subclass==, and a Dog ==IS-A== Animal.\n\nA subclass can: use inherited members, add its own, override inherited methods, and call the parent’s constructor. It can’t see the parent’s `private` members directly, and it can’t extend a `final` class.',
          cta: 'Name the types',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which type of inheritance is each example?',
          buckets: [
            { id: 'single', label: 'Single' },
            { id: 'multi', label: 'Multilevel' },
            { id: 'hier', label: 'Hierarchical' },
            { id: 'iface', label: 'Multiple or hybrid (needs interfaces)' },
          ],
          items: [
            { text: '`Car extends Vehicle`', bucket: 'single', why: '**Single:** one subclass, one superclass.' },
            { text: '`Car extends FourWheeler`, `FourWheeler extends Vehicle`', bucket: 'multi', why: '**Multilevel:** a chain of classes.' },
            { text: '`Car extends Vehicle` and `Bus extends Vehicle`', bucket: 'hier', why: '**Hierarchical:** many subclasses share one superclass.' },
            { text: '`Duck implements Flyable, Swimmable`', bucket: 'iface', why: '**Multiple:** Java only allows this through interfaces.' },
            { text: '`Bus extends Vehicle implements Fare`', bucket: 'iface', why: '**Hybrid:** a mix of class and interface inheritance.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Why does `class C extends A, B` not compile?',
          options: [
            { text: 'Java classes can extend only one class', correct: true, why: 'If `A` and `B` both defined the same method, `C` wouldn’t know which to inherit: the **diamond problem**. Interfaces are the way around it.' },
            { text: 'The comma should be `and`', why: 'No syntax allows two superclasses.' },
            { text: '`C` must be abstract first', why: 'Being abstract doesn’t lift the one-superclass limit.' },
            { text: 'Only `final` classes can be extended twice', why: 'A `final` class can’t be extended at all.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Constructors run parent-first',
          code: `class Vehicle {
    Vehicle() { System.out.println("Vehicle"); }
}

class FourWheeler extends Vehicle {
    FourWheeler() { System.out.println("FourWheeler"); }
}

class Car extends FourWheeler {
    Car() { System.out.println("Car"); }
}

public class Main {
    public static void main(String[] args) {
        new Car();
    }
}`,
          options: [
            { out: 'Vehicle\nFourWheeler\nCar', correct: true, why: 'Each constructor calls its parent’s first, so the top of the chain finishes first.' },
            { out: 'Car\nFourWheeler\nVehicle', why: 'The parent must be ready before the child sets up.' },
            { out: 'Car', why: 'Every parent constructor runs too.' },
            { out: 'Vehicle\nCar', why: 'Every level of the chain runs, including `FourWheeler`.' },
          ],
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'Complete the hierarchy',
          code: `class Employee {
    String name;
}

class Manager [[extends]] Employee {
    int teamSize;
}

class SeniorManager extends [[Manager]] {
    double bonus;
}`,
          bank: ['implements', 'inherits', 'Employee', 'super'],
          explain: '`SeniorManager` has `name`, `teamSize` and `bonus`: that is multilevel inheritance.',
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'A multilevel hierarchy',
          body: 'Build `Employee` (field `String name`, method `describe()` returning `"Employee: " + name`), `Manager extends Employee` (field `int teamSize`), and `SeniorManager extends Manager` (field `double bonus`).\n\nAdd a method `isSenior()` to `SeniorManager` that returns `true` when `bonus > 1000`.',
          starter: `// your three classes here

public class Main {
    public static void main(String[] args) {
        SeniorManager s = new SeniorManager();
        s.name = "Ada";
        s.teamSize = 8;
        s.bonus = 5000;
        System.out.println(s.describe());
        System.out.println(s.isSenior());
    }
}
`,
          tests: [
            { label: '`Manager` extends `Employee`', check: 'extendsClass(Manager.class, Employee.class)' },
            { label: '`SeniorManager` extends `Manager`', check: 'extendsClass(SeniorManager.class, Manager.class)' },
            { label: 'A senior manager inherits `describe()`', body: 'SeniorManager s = new SeniorManager(); s.name = "Bo"; return s.describe();', expect: 'Employee: Bo' },
            { label: '`isSenior()` checks the bonus', body: 'SeniorManager s = new SeniorManager(); s.bonus = 2000; return s.isSenior();', expect: true },
            { label: 'Fields live on the right classes', check: 'fieldHas(Manager.class, "teamSize", "") && fieldHas(SeniorManager.class, "bonus", "") && !declares(Manager.class, "describe")' },
            { body: 'SeniorManager s = new SeniorManager(); s.bonus = 1000; return s.isSenior();', expect: false, hidden: true },
          ],
          hints: ['Put each field only in the class that introduces it.', 'A subclass needs no copy of `describe()`: it inherits it.'],
          solution: {
            code: `class Employee {
    String name;

    String describe() {
        return "Employee: " + name;
    }
}

class Manager extends Employee {
    int teamSize;
}

class SeniorManager extends Manager {
    double bonus;

    boolean isSenior() {
        return bonus > 1000;
    }
}

public class Main {
    public static void main(String[] args) {
        SeniorManager s = new SeniorManager();
        s.name = "Ada";
        s.teamSize = 8;
        s.bonus = 5000;
        System.out.println(s.describe());
        System.out.println(s.isSenior());
    }
}
`,
            steps: [
              { lines: [1, 7], text: '**The base class** holds what every employee shares.' },
              { lines: [9, 11], text: '**One level down:** adds only what is new.' },
              { lines: [13, 19], text: '**Two levels down:** `SeniorManager` has everything above it, plus its own.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Inheritance: done.',
          body: 'You can build and name any hierarchy. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
