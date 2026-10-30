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
          type: 'story',
          eyebrow: 'Exceptions · Lesson 2',
          title: 'throw raises it, throws warns about it',
          body: '`void setUnit(int u) {`\n\n`    if (u <= 0) throw new IllegalArgumentException("Bad unit");`\n\n`}`\n\n==throw== is an action, followed by a new exception object.\n\n==throws== is a label on a method: `void save() throws IOException`.\n\nTwo handy ones: `IllegalArgumentException` (a bad value was passed in) and `IllegalStateException` (the object isn’t ready, like computing a CGPA with too few courses).',
          cta: 'Follow one up the stack',
        },
        {
          type: 'predict',
          eyebrow: 'Exam favourite',
          title: 'Up the call stack',
          code: `static void c() {
    System.out.println("c start");
    throw new IllegalStateException("oops");
}

static void b() {
    System.out.println("b start");
    c();
    System.out.println("b end");
}

public static void main(String[] args) {
    try {
        b();
        System.out.println("main end");
    } catch (IllegalStateException e) {
        System.out.println("caught " + e.getMessage());
    }
}`,
          options: [
            { out: 'b start\nc start\ncaught oops', correct: true, why: 'The exception leaves `c`, skips the rest of `b`, skips the rest of the `try`, and lands in the `catch`.' },
            { out: 'b start\nc start\nb end\ncaught oops', why: 'Nothing in `b` catches it, so `b end` is skipped.' },
            { out: 'b start\nc start\nb end\nmain end', why: 'A thrown exception interrupts every caller until it is caught.' },
            { out: 'c start\nb start\ncaught oops', why: '`b` starts first, then calls `c`.' },
          ],
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
          type: 'finish',
          title: 'Exceptions: done.',
          body: 'You can raise, pass on, catch and design exceptions. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
