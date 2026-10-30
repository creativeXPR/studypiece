// COS 202 · Exam lab · Lesson 2: two complete applications, built step by step.

const RECORDS = `import java.util.ArrayList;

class Person {
    private String name;

    public Person(String name) { this.name = name; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

class Course {
    private String code;
    private String title;
    private int unit;
    private String grade;

    public Course(String code, String title, int unit, String grade) {
        this.code = code;
        this.title = title;
        this.unit = unit;
        this.grade = grade;
    }

    public String getCode() { return code; }
    public String getTitle() { return title; }
    public int getUnit() { return unit; }
    public String getGrade() { return grade; }
}

class Student extends Person {
    private String id;
    private String department;
    private ArrayList<Course> courses = new ArrayList<>();

    public Student(String name, String id, String department) {
        super(name);
        this.id = id;
        this.department = department;
    }

    public String getId() { return id; }
    public String getDepartment() { return department; }
    public ArrayList<Course> getCourses() { return courses; }

    public void register(Course course) {
        if (course == null) throw new IllegalArgumentException("Course cannot be null.");
        courses.add(course);
    }

    public double cgpa() {
        if (courses.size() < 5) {
            throw new IllegalStateException("A student must register at least 5 courses.");
        }
        int points = 0, units = 0;
        for (Course c : courses) {
            points += gradePoint(c.getGrade()) * c.getUnit();
            units += c.getUnit();
        }
        return (double) points / units;
    }

    private int gradePoint(String grade) {
        switch (grade.toUpperCase()) {
            case "A": return 5;
            case "B": return 4;
            case "C": return 3;
            case "D": return 2;
            case "E": return 1;
            case "F": return 0;
            default: throw new IllegalArgumentException("Invalid grade: " + grade);
        }
    }
}
`;

const PAYMENT = `abstract class PaymentMethod {
    protected double amountPaid;
    protected String status = "PENDING";

    public String printReceipt() {
        return "Method : " + getClass().getSimpleName()
            + "\\nAmount paid : " + String.format("%.2f", amountPaid)
            + "\\nStatus : " + status;
    }

    public abstract void processPayment(double amount);
}

class CardPayment extends PaymentMethod {
    @Override
    public void processPayment(double amount) {
        amountPaid = amount * 1.015;
        status = "CARD APPROVED";
    }
}

class CashPayment extends PaymentMethod {
    @Override
    public void processPayment(double amount) {
        if (amount > 200000) {
            throw new IllegalArgumentException("Cash payments above 200,000 are not allowed.");
        }
        amountPaid = amount;
        status = "CASH RECEIVED";
    }
}
`;

const tailMain = `
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ada", "UI/CSC/2026/001", "Computer Science");
        s.register(new Course("CSC201", "Data Structures", 3, "A"));
        s.register(new Course("CSC203", "Architecture", 3, "B"));
        s.register(new Course("MTH201", "Mathematics II", 3, "A"));
        s.register(new Course("CSC205", "Programming II", 3, "B"));
        s.register(new Course("STA201", "Statistics", 2, "C"));
        System.out.println(s.getCourses().size());
        System.out.printf("%.2f%n", s.cgpa());
    }
}
`;

const courseStep = `import java.util.ArrayList;

class Person {
    private String name;

    public Person(String name) { this.name = name; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}

class Course {
    private String code;
    private String title;
    private int unit;
    private String grade;

    public Course(String code, String title, int unit, String grade) {
        this.code = code;
        this.title = title;
        this.unit = unit;
        this.grade = grade;
    }

    public String getCode() { return code; }
    public String getTitle() { return title; }
    public int getUnit() { return unit; }
    public String getGrade() { return grade; }
}

class Student extends Person {
    private String id;
    private String department;
    private ArrayList<Course> courses = new ArrayList<>();

    public Student(String name, String id, String department) {
        super(name);
        this.id = id;
        this.department = department;
    }

    public String getId() { return id; }
    public String getDepartment() { return department; }
    public ArrayList<Course> getCourses() { return courses; }

    // Write register, cgpa and a private gradePoint method here.
}
`;

const profileBody = `
class Profile {
    static String of(Student s) {
        StringBuilder b = new StringBuilder();
        b.append("Student ID : ").append(s.getId()).append("\\n");
        b.append("Name : ").append(s.getName()).append("\\n");
        b.append("Department : ").append(s.getDepartment()).append("\\n");
        b.append("Courses Registered: ").append(s.getCourses().size()).append("\\n");
        for (Course c : s.getCourses()) {
            b.append(c.getCode()).append(" ").append(c.getTitle()).append(" ")
             .append(c.getUnit()).append(" ").append(c.getGrade()).append("\\n");
        }
        b.append(String.format("CGPA : %.2f", s.cgpa()));
        return b.toString();
    }
}
`;

const reg = 'Student s = new Student("A", "X", "D"); s.register(new Course("1", "a", 3, "A")); s.register(new Course("2", "b", 3, "B")); s.register(new Course("3", "c", 3, "A")); s.register(new Course("4", "d", 3, "B")); s.register(new Course("5", "e", 2, "C"));';

// Highlights for "compare your steps": from the line holding `a` to the line holding `b`.
const span = (code, a, b = a) => {
  const lines = code.split('\n');
  const from = lines.findIndex((l) => l.includes(a));
  const to = lines.findIndex((l, i) => i >= from && l.includes(b));
  return [from + 1, to + 1];
};

const SOLUTION_1 = RECORDS + tailMain;

const SOLUTION_2 = `${RECORDS}${profileBody}
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ada", "UI/CSC/2026/001", "Computer Science");
        s.register(new Course("CSC201", "Data Structures", 3, "A"));
        s.register(new Course("CSC203", "Architecture", 3, "B"));
        s.register(new Course("MTH201", "Mathematics II", 3, "A"));
        s.register(new Course("CSC205", "Programming II", 3, "B"));
        s.register(new Course("STA201", "Statistics", 2, "C"));
        System.out.println(Profile.of(s));
    }
}
`;

const SOLUTION_3 = `import javax.swing.*;
import java.awt.*;
${RECORDS}
public class Main {
    static void wire(JButton register, JTextField code, JTextField unit,
                     JComboBox<String> grade, JTextArea output, Student student) {
        register.addActionListener(e -> {
            String c = code.getText().trim();
            if (c.isEmpty()) {
                output.setText("All fields are required.");
                return;
            }
            try {
                int u = Integer.parseInt(unit.getText().trim());
                if (u <= 0) {
                    output.setText("Credit unit must be a positive whole number.");
                    return;
                }
                String g = (String) grade.getSelectedItem();
                student.register(new Course(c, c, u, g));
                output.setText("Registered " + c + ". Total: " + student.getCourses().size());
            } catch (NumberFormatException ex) {
                output.setText("Credit unit must be a positive whole number.");
            }
        });
    }

    public static void main(String[] args) {
        Student student = new Student("Ada", "UI/CSC/2026/001", "Computer Science");
        JFrame frame = new JFrame("Student Records");
        frame.setLayout(new FlowLayout());
        JTextField code = new JTextField(8);
        JTextField unit = new JTextField(3);
        JComboBox<String> grade = new JComboBox<>(new String[] {"A", "B", "C", "D", "E", "F"});
        JButton register = new JButton("Register Course");
        JTextArea output = new JTextArea(5, 28);
        wire(register, code, unit, grade, output, student);
        frame.add(new JLabel("Code:"));
        frame.add(code);
        frame.add(new JLabel("Unit:"));
        frame.add(unit);
        frame.add(grade);
        frame.add(register);
        frame.add(new JScrollPane(output));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 240);
        frame.setVisible(true);
    }
}
`;

const SOLUTION_4 = `${PAYMENT}
public class Main {
    public static void main(String[] args) {
        PaymentMethod p = new CardPayment();
        p.processPayment(1000);
        System.out.println(p.printReceipt());
    }
}
`;

const SOLUTION_5 = `import javax.swing.*;
import java.awt.*;

${PAYMENT}
public class Main {
    static void wire(JButton pay, JTextField amount, JComboBox<String> method, JTextArea output) {
        pay.addActionListener(e -> {
            String text = amount.getText().trim();
            if (text.isEmpty()) {
                output.setText("Please enter an amount.");
                return;
            }
            try {
                double value = Double.parseDouble(text);
                if (value <= 0) {
                    output.setText("Amount must be greater than zero.");
                    return;
                }
                PaymentMethod payment;
                if ("Cash".equals(method.getSelectedItem())) {
                    payment = new CashPayment();
                } else {
                    payment = new CardPayment();
                }
                payment.processPayment(value);
                output.setText(payment.printReceipt());
            } catch (NumberFormatException ex) {
                output.setText("Please enter a valid number.");
            } catch (IllegalArgumentException ex) {
                output.setText(ex.getMessage());
            }
        });
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Payment Processing System");
        frame.setLayout(new FlowLayout());
        JTextField amount = new JTextField(10);
        JComboBox<String> method = new JComboBox<>(new String[] {"Card", "Cash"});
        JButton pay = new JButton("Process Payment");
        JTextArea output = new JTextArea(6, 28);
        wire(pay, amount, method, output);
        frame.add(new JLabel("Amount:"));
        frame.add(amount);
        frame.add(method);
        frame.add(pay);
        frame.add(new JScrollPane(output));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 260);
        frame.setVisible(true);
    }
}
`;

export default {
  id: 'build-apps',
  title: 'Build two full apps',
  covers: 'Student records with CGPA and a Swing front end, then a payment processor with an abstract class, exceptions and a window',
  minutes: 30,
  sections: [
    {
      name: 'Student records',
      terms: [
        ['CGPA', 'Sum of (grade point × credit unit), divided by the sum of credit units. A = 5, B = 4, C = 3, D = 2, E = 1, F = 0.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam lab · Lesson 2',
          title: 'Everything, in one program',
          body: 'This is the payoff. You’ll build **student records** in steps: classes, then the CGPA, a formatted profile and a window. Then a **payment processor**.\n\nThe plan always starts with the classes:\n\n`Person` (private name)\n\n`Student extends Person` (id, department, `ArrayList<Course>`)\n\n`Course` (code, title, unit, grade)\n\nEach step gives you a working starting point, so you can focus on the new part.',
          cta: 'Step 1',
        },
        {
          type: 'code',
          eyebrow: 'Step 1 of 4',
          title: 'Register courses and calculate the CGPA',
          body: 'The classes are written. Add to `Student`:\n\n`register(Course c)`, which throws `IllegalArgumentException` for `null`,\n\n`cgpa()`, which throws `IllegalStateException` for fewer than 5 courses,\n\nand a **private** `gradePoint(String grade)`, which accepts either case and throws `IllegalArgumentException` for anything other than A to F.',
          starter: courseStep + tailMain,
          tests: [
            { label: '`Student` extends `Person`', check: 'extendsClass(Student.class, Person.class)' },
            { label: 'Five courses give the right CGPA', body: `${reg} return s.cgpa();`, expect: 60 / 14, tol: 1e-9 },
            { label: 'Four courses are refused', body: 'Student s = new Student("A", "X", "D"); for (int i = 0; i < 4; i++) s.register(new Course("c", "t", 3, "A")); return s.cgpa();', throws: 'IllegalStateException' },
            { label: 'A null course is refused', body: 'new Student("A", "X", "D").register(null); return null;', throws: 'IllegalArgumentException' },
            { label: '`gradePoint` is private', check: 'methodHas(Student.class, "gradePoint", "private")' },
            { label: '`main` prints the count and CGPA', main: 'Main', out: '5\n4.29' },
            { body: 'Student s = new Student("A", "X", "D"); for (int i = 0; i < 5; i++) s.register(new Course("c", "t", 3, "f")); return s.cgpa();', expect: 0, tol: 1e-9, hidden: true },
            { body: 'Student s = new Student("A", "X", "D"); for (int i = 0; i < 5; i++) s.register(new Course("c", "t", 3, "Z")); return s.cgpa();', throws: 'IllegalArgumentException', hidden: true },
          ],
          hints: ['Loop over the courses, adding `gradePoint(c.getGrade()) * c.getUnit()` and `c.getUnit()` to two totals.', 'Cast before dividing: `(double) points / units`.'],
          solution: {
            code: SOLUTION_1,
            steps: [
              { lines: span(SOLUTION_1, 'if (course == null)', 'courses.add(course);'), text: '**Validate on the way in.** Bad data never reaches the list.' },
              { lines: span(SOLUTION_1, 'if (courses.size() < 5)', 'at least 5 courses'), text: '**Guard the state:** the object isn’t ready until 5 courses are in.' },
              { lines: span(SOLUTION_1, 'int points = 0', 'return (double) points / units;'), text: '**The formula:** weighted points over total units. Without the cast, it would be integer division.' },
              { lines: span(SOLUTION_1, 'switch (grade.toUpperCase())', 'default: throw'), text: '**A `switch` on the upper-cased grade** handles `a` and `A`, and rejects everything else.' },
            ],
          },
        },
        {
          type: 'code',
          eyebrow: 'Step 2 of 4',
          title: 'Print a formatted profile',
          body: 'Write `Profile.of(student)`, which returns these lines exactly:\n\n`Student ID : UI/CSC/2026/001`\n\n`Name : Ada`\n\n`Department : Computer Science`\n\n`Courses Registered: 5`\n\nThen one line per course: code, title, unit and grade, separated by single spaces. The last line is `CGPA : 4.29` (two decimals).',
          starter: `${RECORDS}
class Profile {
    static String of(Student s) {
        // your code here
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Ada", "UI/CSC/2026/001", "Computer Science");
        s.register(new Course("CSC201", "Data Structures", 3, "A"));
        s.register(new Course("CSC203", "Architecture", 3, "B"));
        s.register(new Course("MTH201", "Mathematics II", 3, "A"));
        s.register(new Course("CSC205", "Programming II", 3, "B"));
        s.register(new Course("STA201", "Statistics", 2, "C"));
        System.out.println(Profile.of(s));
    }
}
`,
          tests: [
            { label: 'The header lines are right', body: `${reg} return Profile.of(s).split("\\n")[0] + "|" + Profile.of(s).split("\\n")[3];`, expect: 'Student ID : X|Courses Registered: 5' },
            { label: 'One line per course', body: `${reg} return Profile.of(s).split("\\n")[4];`, expect: '1 a 3 A' },
            { label: 'The CGPA has two decimals', body: `${reg} String[] l = Profile.of(s).split("\\n"); return l[l.length - 1];`, expect: 'CGPA : 4.29' },
            { body: `${reg} return Profile.of(s).split("\\n").length;`, expect: 10, hidden: true },
          ],
          hints: ['A `StringBuilder` with `append` keeps it tidy.', '`String.format("CGPA : %.2f", s.cgpa())` rounds to two decimals.'],
          solution: {
            code: SOLUTION_2,
            steps: [
              { lines: span(SOLUTION_2, 'StringBuilder b ='), text: '**`StringBuilder`** builds long text efficiently.' },
              { lines: span(SOLUTION_2, 'for (Course c : s.getCourses())', '.append(c.getUnit())'), text: '**A for-each** gives one line per course.' },
              { lines: span(SOLUTION_2, 'String.format'), text: '**`String.format`** handles the two decimal places.' },
            ],
          },
        },
        {
          type: 'code',
          eyebrow: 'Step 3 of 4',
          title: 'Give it a window',
          body: 'Write `wire(register, code, unit, grade, output, student)`. Clicking `register` must:\n\nread the code and the unit, using `Integer.parseInt`,\n\nif the code is empty, set the output to `All fields are required.`,\n\nif the unit isn’t a positive whole number, set it to `Credit unit must be a positive whole number.`,\n\notherwise add a `Course` (use the code as its title too), and set the output to `Registered COS202. Total: 1`.',
          starter: `import javax.swing.*;
import java.awt.*;
${RECORDS}
public class Main {
    static void wire(JButton register, JTextField code, JTextField unit,
                     JComboBox<String> grade, JTextArea output, Student student) {
        // your code here
    }

    public static void main(String[] args) {
        Student student = new Student("Ada", "UI/CSC/2026/001", "Computer Science");
        JFrame frame = new JFrame("Student Records");
        frame.setLayout(new FlowLayout());
        JTextField code = new JTextField(8);
        JTextField unit = new JTextField(3);
        JComboBox<String> grade = new JComboBox<>(new String[] {"A", "B", "C", "D", "E", "F"});
        JButton register = new JButton("Register Course");
        JTextArea output = new JTextArea(5, 28);
        wire(register, code, unit, grade, output, student);
        frame.add(new JLabel("Code:"));
        frame.add(code);
        frame.add(new JLabel("Unit:"));
        frame.add(unit);
        frame.add(grade);
        frame.add(register);
        frame.add(new JScrollPane(output));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 240);
        frame.setVisible(true);
    }
}
`,
          tests: [
            { label: 'A good course registers', body: 'Student st = new Student("A", "X", "D"); JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("COS202"), new JTextField("3"), new JComboBox<>(new String[]{"A"}), o, st); b.doClick(); return o.getText();', expect: 'Registered COS202. Total: 1' },
            { label: 'The course really is stored', body: 'Student st = new Student("A", "X", "D"); JButton b = new JButton(); Main.wire(b, new JTextField("COS202"), new JTextField("3"), new JComboBox<>(new String[]{"B"}), new JTextArea(), st); b.doClick(); return st.getCourses().get(0).getGrade() + st.getCourses().get(0).getUnit();', expect: 'B3' },
            { label: 'An empty code is refused', body: 'Student st = new Student("A", "X", "D"); JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("  "), new JTextField("3"), new JComboBox<>(new String[]{"A"}), o, st); b.doClick(); return o.getText();', expect: 'All fields are required.' },
            { label: 'A bad unit is refused', body: 'Student st = new Student("A", "X", "D"); JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("C"), new JTextField("abc"), new JComboBox<>(new String[]{"A"}), o, st); b.doClick(); return o.getText();', expect: 'Credit unit must be a positive whole number.' },
            { body: 'Student st = new Student("A", "X", "D"); JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("C"), new JTextField("0"), new JComboBox<>(new String[]{"A"}), o, st); b.doClick(); return o.getText() + st.getCourses().size();', expect: 'Credit unit must be a positive whole number.0', hidden: true },
            { body: 'Student st = new Student("A", "X", "D"); JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("C"), new JTextField("-2"), new JComboBox<>(new String[]{"A"}), o, st); b.doClick(); return o.getText();', expect: 'Credit unit must be a positive whole number.', hidden: true },
          ],
          hints: ['`String g = (String) grade.getSelectedItem();` A combo box hands back an `Object`, so cast it.', 'Put `parseInt` in a `try`, and `catch (NumberFormatException ex)`.'],
          solution: {
            code: SOLUTION_3,
            steps: [
              { lines: span(SOLUTION_3, 'String c = code.getText()', 'All fields are required'), text: '**Empty first:** reject missing input before doing anything else.' },
              { lines: span(SOLUTION_3, 'int u = Integer.parseInt', 'Credit unit must'), text: '**Parse and validate:** two different failures, one clear message.' },
              { lines: span(SOLUTION_3, 'String g =', 'output.setText("Registered'), text: '**Then act:** cast the combo box’s `Object`, register, and report.' },
              { lines: span(SOLUTION_3, 'catch (NumberFormatException ex)'), text: '**A specific catch** instead of a general `Exception`.' },
            ],
          },
        },
        {
          type: 'code',
          eyebrow: 'Step 4 of 4',
          title: 'See the finished window',
          body: 'Press **▶ Run** to see your Student Records window. Then change its title to `UI Student Records` and check it.',
          swing: true,
          starter: `import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Student Records");
        frame.setLayout(new FlowLayout());
        frame.add(new JLabel("Name:"));
        frame.add(new JTextField(12));
        frame.add(new JLabel("Course:"));
        frame.add(new JTextField(8));
        frame.add(new JComboBox<>(new String[] {"A", "B", "C", "D", "E", "F"}));
        frame.add(new JButton("Register Course"));
        frame.add(new JButton("Calculate CGPA"));
        JTextArea area = new JTextArea(5, 28);
        area.setText("Student ID : UI/CSC/2026/001\\nCGPA : 4.29");
        frame.add(new JScrollPane(area));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 280);
        frame.setVisible(true);
    }
}
`,
          tests: [
            { label: 'The title is updated', src: 'new\\s+JFrame\\s*\\(\\s*"UI Student Records"\\s*\\)', fail: 'Change the text inside `new JFrame(...)`.' },
          ],
          explain: 'Inheritance, encapsulation, an `ArrayList`, exceptions and Swing, all in one program.',
        },
        {
          type: 'bridge',
          title: 'Student records: built.',
          recap: ['Classes first, then logic, then the window.', 'Validate input before you use it.'],
          why: 'One more: a payment processor.',
        },
      ],
    },
    {
      name: 'Payment processing',
      screens: [
        {
          type: 'code',
          eyebrow: 'Part 2',
          title: 'Build the payment classes',
          body: 'Write abstract class `PaymentMethod` with protected `amountPaid` (`double`) and `status` (`String`, starting as `"PENDING"`), a concrete `printReceipt()`, and abstract `processPayment(double amount)`.\n\n`CardPayment` adds a 1.5% fee, and sets the status to `CARD APPROVED`.\n\n`CashPayment` rejects amounts above 200,000 with `IllegalArgumentException`; otherwise it pays the amount exactly, and sets the status to `CASH RECEIVED`.\n\nThe receipt has three lines: `Method : CardPayment`, `Amount paid : 1015.00` (two decimals), `Status : CARD APPROVED`.',
          starter: `// your PaymentMethod, CardPayment and CashPayment here

public class Main {
    public static void main(String[] args) {
        PaymentMethod p = new CardPayment();
        p.processPayment(1000);
        System.out.println(p.printReceipt());
    }
}
`,
          tests: [
            { label: '`PaymentMethod` is abstract', check: 'isAbstract(PaymentMethod.class) && methodHas(PaymentMethod.class, "processPayment", "abstract")' },
            { label: 'Both payment types extend it', check: 'extendsClass(CardPayment.class, PaymentMethod.class) && extendsClass(CashPayment.class, PaymentMethod.class)' },
            { label: 'A card pays a 1.5% fee', main: 'Main', out: 'Method : CardPayment\nAmount paid : 1015.00\nStatus : CARD APPROVED' },
            { label: 'Cash pays the exact amount', body: 'PaymentMethod p = new CashPayment(); p.processPayment(500); return p.printReceipt();', expect: 'Method : CashPayment\nAmount paid : 500.00\nStatus : CASH RECEIVED' },
            { label: 'Large cash payments are refused', body: 'new CashPayment().processPayment(200001); return null;', throws: 'IllegalArgumentException' },
            { body: 'PaymentMethod p = new CashPayment(); p.processPayment(200000); return p.amountPaid;', expect: 200000, tol: 1e-9, hidden: true },
            { body: 'return new CardPayment().status;', expect: 'PENDING', hidden: true },
          ],
          hints: ['`getClass().getSimpleName()` gives the real class’s name, even from the parent.', 'A 1.5% fee means `amount * 1.015`. `String.format("%.2f", x)` gives two decimals.'],
          solution: {
            code: SOLUTION_4,
            steps: [
              { lines: [2, 3], text: '**`protected`:** subclasses can set these, but outside classes can’t.' },
              { lines: [5, 9], text: '**A concrete method in an abstract class:** shared by every payment type.' },
              { lines: [11, 11], text: '**The abstract promise:** each type processes payment its own way.' },
              { lines: [25, 27], text: '**Reject before changing anything.**' },
            ],
          },
        },
        {
          type: 'code',
          eyebrow: 'Final build',
          title: 'The Process Payment button',
          body: 'Write `wire(pay, amount, method, output)`. On click:\n\nempty amount: `Please enter an amount.`\n\nnot a number: `Please enter a valid number.`\n\nzero or negative: `Amount must be greater than zero.`\n\notherwise build the right payment from the drop-down (`"Cash"` or `"Card"`), process it, and show `printReceipt()`.\n\nIf processing throws `IllegalArgumentException`, show its message.',
          starter: `import javax.swing.*;
import java.awt.*;

${PAYMENT}
public class Main {
    static void wire(JButton pay, JTextField amount, JComboBox<String> method, JTextArea output) {
        // your code here
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("Payment Processing System");
        frame.setLayout(new FlowLayout());
        JTextField amount = new JTextField(10);
        JComboBox<String> method = new JComboBox<>(new String[] {"Card", "Cash"});
        JButton pay = new JButton("Process Payment");
        JTextArea output = new JTextArea(6, 28);
        wire(pay, amount, method, output);
        frame.add(new JLabel("Amount:"));
        frame.add(amount);
        frame.add(method);
        frame.add(pay);
        frame.add(new JScrollPane(output));
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 260);
        frame.setVisible(true);
    }
}
`,
          tests: [
            { label: 'A card payment shows a receipt', body: 'JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("1000"), new JComboBox<>(new String[]{"Card", "Cash"}), o); b.doClick(); return o.getText();', expect: 'Method : CardPayment\nAmount paid : 1015.00\nStatus : CARD APPROVED' },
            { label: 'Cash uses `CashPayment`', body: 'JButton b = new JButton(); JTextArea o = new JTextArea(); JComboBox<String> m = new JComboBox<>(new String[]{"Card", "Cash"}); m.setSelectedItem("Cash"); Main.wire(b, new JTextField("50"), m, o); b.doClick(); return o.getText();', expect: 'Method : CashPayment\nAmount paid : 50.00\nStatus : CASH RECEIVED' },
            { label: 'Empty input is refused', body: 'JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField(""), new JComboBox<>(new String[]{"Card"}), o); b.doClick(); return o.getText();', expect: 'Please enter an amount.' },
            { label: 'Text is refused', body: 'JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("abc"), new JComboBox<>(new String[]{"Card"}), o); b.doClick(); return o.getText();', expect: 'Please enter a valid number.' },
            { label: 'Zero is refused', body: 'JButton b = new JButton(); JTextArea o = new JTextArea(); Main.wire(b, new JTextField("0"), new JComboBox<>(new String[]{"Card"}), o); b.doClick(); return o.getText();', expect: 'Amount must be greater than zero.' },
            { body: 'JButton b = new JButton(); JTextArea o = new JTextArea(); JComboBox<String> m = new JComboBox<>(new String[]{"Cash"}); Main.wire(b, new JTextField("300000"), m, o); b.doClick(); return o.getText();', expect: 'Cash payments above 200,000 are not allowed.', hidden: true },
          ],
          hints: ['Declare the variable as the parent type: `PaymentMethod payment;`', 'Use one `try` with two catches: `NumberFormatException`, then `IllegalArgumentException`. Note the first is a subclass of the second, so it must come first.'],
          solution: {
            code: SOLUTION_5,
            steps: [
              { lines: span(SOLUTION_5, 'PaymentMethod payment;'), text: '**The parent type** can hold either payment: runtime polymorphism in action.' },
              { lines: span(SOLUTION_5, '"Cash".equals', 'payment = new CardPayment();'), text: '**`"Cash".equals(...)`** compares text, and is safe even if the selection is `null`.' },
              { lines: span(SOLUTION_5, 'catch (NumberFormatException ex)', 'ex.getMessage()'), text: '**Specific before general:** `NumberFormatException` is a kind of `IllegalArgumentException`.' },
            ],
            note: 'Every topic is here: an abstract class, overriding, polymorphism, exceptions, validation and Swing events.',
          },
        },
        {
          type: 'finish',
          title: 'You built it all.',
          body: 'Two complete applications, from classes to windows. If you can do this, you can handle what an exam asks. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
