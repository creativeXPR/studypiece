// COS 202 · Classes and objects · Lesson 3: encapsulation, getters and setters, validation.

export default {
  id: 'encapsulation',
  title: 'Encapsulation',
  covers: 'private fields, public getters and setters, protecting data with validation, why it matters',
  minutes: 12,
  sections: [
    {
      name: 'Protecting the data',
      terms: [
        ['Encapsulation', 'Wrapping data and methods in a class and restricting direct access to the data.'],
        ['Getter / setter', 'Public methods that read (`getName()`) or change (`setName(…)`) a private field. A setter can reject bad values.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Classes and objects · Lesson 3',
          title: 'Keep the fields private',
          body: 'If `balance` is public, anyone can write `acc.balance = -5000;`. ==Encapsulation== stops that:\n\n**1.** Make the fields `private`.\n\n**2.** Provide public ==getters and setters==.\n\n**3.** Put the rules in the setter.\n\nThe class now controls its own data, and you can change how it works inside without breaking the code that uses it.',
          cta: 'Spot the better way',
        },
        {
          type: 'better',
          eyebrow: 'The better way',
          title: 'A wide-open account',
          code: `class Account {
    public double balance;
}`,
          ask: 'Which version protects the balance?',
          options: [
            { code: `class Account {
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive.");
        }
        balance += amount;
    }
}`, correct: true, why: 'The field is hidden, it can still be read, and it can only change through a method that checks the amount.' },
            { code: `class Account {
    private double balance;

    public void setBalance(double balance) {
        this.balance = balance;
    }
}`, why: 'It’s private in name only: the setter accepts any value, and nothing can read it back.' },
            { code: `class Account {
    private double balance;
}`, why: 'Safe, but useless: no other class can read or change it.' },
          ],
          points: ['**Private** data, **public** methods.', 'A setter earns its place when it **checks** something.'],
        },
        {
          type: 'fill',
          eyebrow: 'Build it',
          title: 'Complete the Person class',
          code: `class Person {
    [[private]] String name;

    public Person(String name) {
        [[this]].name = name;
    }

    public String getName() {
        [[return]] name;
    }

    public [[void]] setName(String name) {
        this.name = name;
    }
}`,
          bank: ['public', 'super', 'static', 'int'],
          explain: 'A getter returns the field; a setter returns nothing, so it is `void`.',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'The broken setter',
          body: 'A course’s credit unit must be positive. `getUnit` should give it back.',
          code: `class Course {
    private int unit;

    public int getUnit() {
        return unit
    }

    public void setUnit(int unit) {
        if (unit < 0) {
            throw new IllegalArgumentException("Bad unit");
        }
        unit = unit;
    }
}`,
          errors: [
            { line: 5, kind: 'syntax', fixes: ['return unit;', 'return unit:', 'return;'], why: 'A missing `;` stops compilation.' },
            { line: 9, kind: 'semantic', fixes: ['if (unit <= 0) {', 'if (unit > 0) {', 'if (unit == 0) {'], why: 'It compiles, but it accepts `0`, which isn’t positive.' },
            { line: 12, kind: 'semantic', fixes: ['this.unit = unit;', 'unit = this.unit;', 'int unit = unit;'], why: 'It compiles, but it only assigns the parameter to itself. The field never changes.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'An encapsulated Course',
          body: 'Write class `Course` with **private** fields `code` (`String`) and `unit` (`int`), a constructor `Course(String code, int unit)`, and public `getCode()`, `getUnit()` and `setUnit(int)`.\n\n`setUnit` must throw `IllegalArgumentException` if the unit isn’t positive, and the constructor must follow the same rule.',
          starter: `// your Course class here

public class Main {
    public static void main(String[] args) {
        Course c = new Course("COS202", 3);
        c.setUnit(2);
        System.out.println(c.getCode() + " " + c.getUnit());
    }
}
`,
          tests: [
            { label: 'Both fields are private', check: 'fieldHas(Course.class, "code", "private") && fieldHas(Course.class, "unit", "private")' },
            { label: 'Getters read the values', body: 'Course c = new Course("A", 3); return c.getCode() + c.getUnit();', expect: 'A3' },
            { label: '`setUnit` changes the unit', body: 'Course c = new Course("A", 3); c.setUnit(2); return c.getUnit();', expect: 2 },
            { label: '`setUnit(0)` is rejected', body: 'new Course("A", 3).setUnit(0); return null;', throws: 'IllegalArgumentException' },
            { body: 'new Course("A", -1); return null;', throws: 'IllegalArgumentException', hidden: true },
            { main: 'Main', out: 'COS202 2', hidden: true },
          ],
          hints: ['Write the check once in `setUnit`, then call `setUnit(unit)` from the constructor.', '`throw new IllegalArgumentException("…");` stops the method.'],
          solution: {
            code: `class Course {
    private String code;
    private int unit;

    public Course(String code, int unit) {
        this.code = code;
        setUnit(unit);
    }

    public String getCode() {
        return code;
    }

    public int getUnit() {
        return unit;
    }

    public void setUnit(int unit) {
        if (unit <= 0) {
            throw new IllegalArgumentException("Unit must be positive.");
        }
        this.unit = unit;
    }
}

public class Main {
    public static void main(String[] args) {
        Course c = new Course("COS202", 3);
        c.setUnit(2);
        System.out.println(c.getCode() + " " + c.getUnit());
    }
}
`,
            steps: [
              { lines: [2, 3], text: '**Private fields:** no outside class can touch them directly.' },
              { lines: [7, 7], text: '**Reuse the rule.** The constructor calls the setter, so the check lives in one place.' },
              { lines: [18, 23], text: '**Validate, then assign.** A bad value never reaches the field.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Encapsulation: done.',
          body: 'Your classes now guard their own data. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
