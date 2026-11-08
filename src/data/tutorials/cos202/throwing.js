// COS 202 · Exceptions · Lesson 2: throw, throws, propagation and custom exceptions.

export default {
  id: 'throwing',
  title: 'throw, throws and custom exceptions',
  covers: 'throw vs throws, IllegalArgumentException and IllegalStateException, how exceptions propagate, writing your own exception',
  minutes: 12,
  sections: [
    {
      name: 'Raising the alarm',
      terms: [
        ['throw', 'A statement that raises an exception: `throw new IllegalArgumentException("…");`'],
        ['throws', 'In a method’s header: warns callers it may pass on a checked exception.'],
        ['Propagation', 'An uncaught exception travels up the call stack, method by method, until something catches it.'],
        ['Custom exception', 'Your own class extending `Exception` (checked) or `RuntimeException` (unchecked).'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'When does a `finally` block run?',
          options: [
            { text: 'Only if an exception happened', why: 'It runs either way.' },
            { text: 'After the try (and any catch), whether or not an exception happened', correct: true, why: 'It is the place for clean-up such as closing files.' },
            { text: 'Only if no exception happened', why: 'It runs either way.' },
            { text: 'Before the try', why: 'It runs after.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exceptions · Lesson 2',
          title: 'throw raises it, throws warns about it',
          body: '`void setUnit(int u) {`\n\n`    if (u <= 0) throw new IllegalArgumentException("Bad unit");`\n\n`}`\n\n==throw== is an action, followed by a new exception object.\n\n==throws== is a label on a method: `void save() throws IOException`.\n\nTwo handy ones: `IllegalArgumentException` (a bad value was passed in) and `IllegalStateException` (the object isn’t ready, like computing a CGPA with too few courses).',
          cta: 'Hunt the bugs',
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'CGPA guards',
          body: 'A student needs at least 5 courses before a CGPA can be calculated.',
          code: `class NotReadyException extends Exception {
    NotReadyException(String message) {
        super(message);
    }
}

class Student {
    private int courses;

    double cgpa() {
        if (courses > 5) {
            throw NotReadyException("Register at least 5 courses");
        }
        return 4.5;
    }
}`,
          errors: [
            { line: 10, kind: 'syntax', fixes: ['double cgpa() throws NotReadyException {', 'double cgpa() throw NotReadyException {', 'throws double cgpa() {'], why: '`NotReadyException` is checked, since it extends `Exception`, so the method must declare `throws`.' },
            { line: 11, kind: 'semantic', fixes: ['if (courses < 5) {', 'if (courses >= 5) {', 'if (courses == 5) {'], why: 'It compiles, but the condition is backwards: it rejects students with **enough** courses.' },
            { line: 12, kind: 'syntax', fixes: ['throw new NotReadyException("Register at least 5 courses");', 'throws new NotReadyException("Register at least 5 courses");', 'new throw NotReadyException("Register at least 5 courses");'], why: 'An exception is an object, so it needs `new`.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Your own exception',
          body: 'Write a **checked** exception `InsufficientFundsException`.\n\nWrite class `Account` with a constructor `Account(double balance)`, `getBalance()`, and `withdraw(double amount)`, which:\n\nthrows `IllegalArgumentException` if the amount isn’t positive,\n\nthrows `InsufficientFundsException` if the amount is more than the balance,\n\nand otherwise reduces the balance.',
          starter: `// your exception and Account class here

public class Main {
    public static void main(String[] args) {
        Account a = new Account(100);
        try {
            a.withdraw(30);
            a.withdraw(500);
        } catch (InsufficientFundsException e) {
            System.out.println("Refused: " + e.getMessage());
        }
        System.out.println(a.getBalance());
    }
}
`,
          tests: [
            { label: 'The exception is checked', check: 'Exception.class.isAssignableFrom(InsufficientFundsException.class) && !RuntimeException.class.isAssignableFrom(InsufficientFundsException.class)' },
            { label: 'A good withdrawal reduces the balance', body: 'Account a = new Account(100); a.withdraw(30); return a.getBalance();', expect: 70, tol: 1e-9 },
            { label: 'Too much is refused', body: 'new Account(100).withdraw(500); return null;', throws: 'InsufficientFundsException' },
            { label: 'A negative amount is rejected', body: 'new Account(100).withdraw(-1); return null;', throws: 'IllegalArgumentException' },
            { body: 'Account a = new Account(100); try { a.withdraw(500); } catch (InsufficientFundsException e) { } return a.getBalance();', expect: 100, tol: 1e-9, hidden: true },
            { body: 'Account a = new Account(100); a.withdraw(100); return a.getBalance();', expect: 0, tol: 1e-9, hidden: true },
            { body: 'new Account(100).withdraw(0); return null;', throws: 'IllegalArgumentException', hidden: true },
          ],
          hints: ['`class InsufficientFundsException extends Exception { … super(message); … }`', '`withdraw` must declare `throws InsufficientFundsException`. `IllegalArgumentException` is unchecked, so it needn’t be declared.'],
          solution: {
            code: `class InsufficientFundsException extends Exception {
    InsufficientFundsException(String message) {
        super(message);
    }
}

class Account {
    private double balance;

    Account(double balance) {
        this.balance = balance;
    }

    double getBalance() {
        return balance;
    }

    void withdraw(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be positive.");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Only " + balance + " available.");
        }
        balance -= amount;
    }
}

public class Main {
    public static void main(String[] args) {
        Account a = new Account(100);
        try {
            a.withdraw(30);
            a.withdraw(500);
        } catch (InsufficientFundsException e) {
            System.out.println("Refused: " + e.getMessage());
        }
        System.out.println(a.getBalance());
    }
}
`,
            steps: [
              { lines: [1, 5], text: '**Extending `Exception`** makes it checked. `super(message)` stores the text for `getMessage()`.' },
              { lines: [18, 18], text: '**`throws`** warns every caller that they must handle it.' },
              { lines: [19, 24], text: '**Check first, change last:** a refused withdrawal leaves the balance untouched.' },
            ],
          },
        },
        {
          type: 'predict',
          eyebrow: 'Project · Tobi’s records app',
          title: 'Refuse an impossible grade',
          body: 'The app should complain loudly about a grade that doesn’t exist.\n\nWhat does it print?',
          code: `public class Main {
    static int points(String g) {
        switch (g) {
            case "A": return 5;
            case "B": return 4;
            case "C": return 3;
            default: throw new IllegalArgumentException("No such grade: " + g);
        }
    }

    public static void main(String[] args) {
        try {
            System.out.println(points("B"));
            System.out.println(points("Z"));
            System.out.println(points("A"));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          options: [
            { out: '4\nNo such grade: Z', correct: true, why: '`throw` stops `points` immediately; control jumps to the catch, skipping the call for "A".' },
            { out: '4\nNo such grade: Z\n5', why: 'Once the exception is thrown, the rest of the try block is skipped.' },
            { out: '4\n0\n5', why: 'Z reaches `default`, which throws instead of returning.' },
            { out: 'No such grade: Z', why: 'The first call, `points("B")`, prints 4 before the error.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'What is the difference between `throw` and `throws`?',
          options: [
            { text: '`throw` actually raises an exception; `throws` in a method header warns callers it might', correct: true, why: '`void save() throws IOException` declares; `throw new IOException()` happens.' },
            { text: 'They are the same keyword in two spellings', why: 'They do different jobs.' },
            { text: '`throws` catches exceptions', why: 'catch does that.' },
            { text: '`throw` is only for checked exceptions', why: 'You can throw any exception.' },
          ],
        },
        {
          type: 'finish',
          title: 'Exceptions: done.',
          body: 'You can raise, pass on, catch and design exceptions. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
