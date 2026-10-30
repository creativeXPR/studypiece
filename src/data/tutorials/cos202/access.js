// COS 202 · Modifiers · Lesson 1: access modifiers.

export default {
  id: 'access',
  title: 'Access modifiers',
  covers: 'public, private, protected and default access, classes, attributes and methods, packages',
  minutes: 9,
  sections: [
    {
      name: 'Who can see what',
      terms: [
        ['public', 'Accessible from every class.'],
        ['private', 'Accessible only inside its own class.'],
        ['default (no modifier)', 'Accessible only inside the same package.'],
        ['protected', 'Accessible inside the same package, and from subclasses anywhere.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Modifiers · Lesson 1',
          title: 'Four levels of access',
          body: 'From most open to most closed:\n\n`public`: a public park. Everyone can enter.\n\n`protected`: same package, plus subclasses anywhere.\n\n**default** (write nothing): same package only.\n\n`private`: your house key. Only this class can use it.\n\nThe rule of thumb: make fields `private`, and methods only as open as they need to be.',
          cta: 'Sort them',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which modifier gives exactly this access?',
          buckets: [
            { id: 'pub', label: 'public' },
            { id: 'pro', label: 'protected' },
            { id: 'def', label: 'default' },
            { id: 'pri', label: 'private' },
          ],
          items: [
            { text: 'Only inside its own class', bucket: 'pri', why: '`private` stops at the class boundary.' },
            { text: 'Any class, anywhere', bucket: 'pub', why: '`public` has no limits.' },
            { text: 'Same package only', bucket: 'def', why: 'Writing no modifier means package access.' },
            { text: 'Same package, or a subclass elsewhere', bucket: 'pro', why: '`protected` adds subclasses to package access.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Reaching into someone’s house',
          body: 'This should print the person’s name and age.',
          code: `class Person {
    public String name = "John";
    private int age = 30;

    public int getAge() {
        return age;
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p.name);
        System.out.println(p.age);
    }
}`,
          errors: [
            { line: 14, kind: 'syntax', fixes: ['System.out.println(p.getAge());', 'System.out.println(Person.age);', 'System.out.println(p.private.age);'], why: '`age` is private, so this class can’t use it: “age has private access in Person”. It won’t compile. Use the public getter.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'How many `public` top-level classes can one `.java` file have?',
          options: [
            { text: 'At most one, and the file must share its name', correct: true, why: '`public class Main` must live in `Main.java`. Other classes in the file have no modifier.' },
            { text: 'As many as you like', why: 'The compiler rejects a second public class in one file.' },
            { text: 'Exactly one, always', why: 'A file doesn’t need a public class at all.' },
            { text: 'None: classes can’t be public', why: 'Classes can be `public` or have default access.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Open only what is needed',
          body: 'Write class `Wallet` with a **private** field `cash` (`int`, starting at 0), a **public** method `add(int amount)`, a **public** `getCash()`, and a **private** helper `isValid(int amount)` that returns whether `amount` is positive.\n\n`add` must use `isValid` and ignore bad amounts.',
          starter: `// your Wallet class here

public class Main {
    public static void main(String[] args) {
        Wallet w = new Wallet();
        w.add(500);
        w.add(-200);
        System.out.println(w.getCash());
    }
}
`,
          tests: [
            { label: '`cash` is private', check: 'fieldHas(Wallet.class, "cash", "private")' },
            { label: '`isValid` is private', check: 'methodHas(Wallet.class, "isValid", "private")' },
            { label: '`add` and `getCash` are public', check: 'methodHas(Wallet.class, "add", "public") && methodHas(Wallet.class, "getCash", "public")' },
            { label: 'Good amounts are added', body: 'Wallet w = new Wallet(); w.add(5); w.add(6); return w.getCash();', expect: 11 },
            { label: 'Bad amounts are ignored', main: 'Main', out: '500' },
            { body: 'Wallet w = new Wallet(); w.add(0); return w.getCash();', expect: 0, hidden: true },
          ],
          hints: ['Inside `add`: `if (isValid(amount)) cash += amount;`', 'A private method can be called from anywhere in its own class.'],
          solution: {
            code: `class Wallet {
    private int cash;

    public void add(int amount) {
        if (isValid(amount)) cash += amount;
    }

    public int getCash() {
        return cash;
    }

    private boolean isValid(int amount) {
        return amount > 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Wallet w = new Wallet();
        w.add(500);
        w.add(-200);
        System.out.println(w.getCash());
    }
}
`,
            steps: [
              { lines: [2, 2], text: '**Private data:** only `Wallet` can change the cash.' },
              { lines: [4, 10], text: '**Public methods** are the only way in, and the only way to read it.' },
              { lines: [12, 14], text: '**Private helper:** other classes don’t need to know it exists.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Access modifiers: done.',
          body: 'You can choose who sees what. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
