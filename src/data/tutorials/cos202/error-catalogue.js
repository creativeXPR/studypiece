// COS 202 · Exam lab · Lesson 1: the error catalogue. Syntax vs semantic, then rapid bug hunts.

export default {
  id: 'error-catalogue',
  title: 'The error catalogue',
  covers: 'Syntax vs semantic errors, the most common slips in each, and a run of exam-style bug hunts',
  minutes: 18,
  sections: [
    {
      name: 'Know your enemy',
      terms: [
        ['Syntax error', 'Breaks the rules of Java, so the code does not compile.'],
        ['Semantic error', 'The code compiles, but it doesn’t do what it should, because the logic or meaning is wrong.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam lab · Lesson 1',
          title: 'One question settles it',
          body: 'Ask: **would the compiler accept this line?**\n\nIf not, it is a ==syntax error==: missing `;`, misspelt keyword, wrong type, unknown name.\n\nIf yes, but the result is wrong or it crashes when run, it is a ==semantic error==: wrong condition, wrong variable, missing base case.\n\nThe method that works in an exam: read the heading (how many of each?), then scan for syntax first, line by line. Then trace the logic to find the semantic ones.',
          cta: 'Sort 12 slips',
        },
        {
          type: 'sort',
          eyebrow: 'The catalogue',
          prompt: 'Syntax or semantic?',
          buckets: [
            { id: 'syn', label: 'Syntax: won’t compile' },
            { id: 'sem', label: 'Semantic: compiles, but wrong' },
          ],
          items: [
            { text: 'Missing `;`', bucket: 'syn', why: 'Every statement needs one.' },
            { text: '`class A extend B`', bucket: 'syn', why: 'The keyword is `extends`.' },
            { text: '`array.length()` or `text.length`', bucket: 'syn', why: 'Arrays use `.length`; strings use `.length()`.' },
            { text: 'Calling `getText` without brackets', bucket: 'syn', why: 'A method call needs `()`.' },
            { text: '`super(name)` after another statement', bucket: 'syn', why: 'It must be the constructor’s first line.' },
            { text: 'Not implementing an abstract method', bucket: 'syn', why: 'A concrete class must implement them all.' },
            { text: '`i <= a.length` in a loop', bucket: 'sem', why: 'It compiles, then runs off the end of the array.' },
            { text: 'Comparing strings with `==`', bucket: 'sem', why: 'It compiles, but compares objects, not text.' },
            { text: '`x = x` in a constructor', bucket: 'sem', why: 'It compiles, but the field never gets set.' },
            { text: 'Re-declaring a field’s type in a constructor', bucket: 'sem', why: '`ArrayList<X> list = new …` makes a local variable, and the field stays `null`.' },
            { text: '`>` where `<` was meant', bucket: 'sem', why: 'A backwards condition compiles happily.' },
            { text: '`7 / 2` when you need 3.5', bucket: 'sem', why: 'Integer division compiles, and silently drops the decimal part.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Catalogue learned.',
          recap: ['Won’t compile: syntax.', 'Compiles, but wrong: semantic.'],
          why: 'Now the drill: five rapid bug hunts, in exam format.',
        },
      ],
    },
    {
      name: 'The drill',
      screens: [
        {
          type: 'bug',
          eyebrow: 'Drill 1 of 5',
          title: 'Person class',
          code: `public class Person {
    private String name;

    public person(String name) { this.name = name; }
    public String getName() { return name; }
    public void setName(String name) { name = name; }
    public int nameLength() { return name.length }
}`,
          errors: [
            { line: 4, kind: 'syntax', fixes: ['public Person(String name) { this.name = name; }', 'public void person(String name) { this.name = name; }', 'public new Person(String name) { this.name = name; }'], why: 'A constructor’s name must match the class exactly, capital included.' },
            { line: 6, kind: 'semantic', fixes: ['public void setName(String name) { this.name = name; }', 'public void setName(String name) { name = this.name; }', 'public void setName(String n) { n = name; }'], why: 'It assigns the parameter to itself, so the setter does nothing.' },
            { line: 7, kind: 'syntax', fixes: ['public int nameLength() { return name.length(); }', 'public int nameLength() { return name.size(); }', 'public int nameLength() { return length(name); }'], why: 'Strings use `length()`, and the statement needs `;`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Drill 2 of 5',
          title: 'Course class',
          code: `class Course {
    private String code;
    private int creditUnit;
    private String grade;

    public Course(String code, int creditUnit, String grade) {
        this.code = code;
        this.creditUnit = creditUnit;
        this.grade = grade;
    }

    public String getCode() { return code; }
    public int getCreditUnit() { return grade; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade }
}`,
          errors: [
            { line: 13, kind: 'syntax', fixes: ['public int getCreditUnit() { return creditUnit; }', 'public String getCreditUnit() { return grade; }', 'public int getCreditUnit() { return code; }'], why: 'A `String` can’t be returned as an `int`, and it’s the wrong field anyway.' },
            { line: 15, kind: 'syntax', fixes: ['public void setGrade(String grade) { this.grade = grade; }', 'public void setGrade(String grade) { this.grade == grade; }', 'public void setGrade(grade) { this.grade = grade; }'], why: 'A missing `;`.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Drill 3 of 5',
          title: 'Register a course',
          body: 'Null courses must be refused. `courses` is a list held by the student.',
          code: `import java.util.ArrayList;

class Student {
    private ArrayList<String> courses;

    public Student() {
        ArrayList<String> courses = new ArrayList<>();
    }

    public void register(String course) {
        if (course != null) {
            throw new IllegalArgumentException("Course cannot be null.");
        }
        courses.add(course);
    }

    public int count() {
        return courses.size;
    }
}`,
          errors: [
            { line: 7, kind: 'semantic', fixes: ['courses = new ArrayList<>();', 'this.courses = courses;', 'new ArrayList<String>();'], why: 'This declares a new local variable, so the field stays `null`.' },
            { line: 11, kind: 'semantic', fixes: ['if (course == null) {', 'if (course.equals(null)) {', 'if (course = null) {'], why: 'The condition is backwards: it rejects every real course.' },
            { line: 18, kind: 'syntax', fixes: ['return courses.size();', 'return courses.length;', 'return size(courses);'], why: '`size` is a method.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Drill 4 of 5',
          title: 'Calculate the CGPA',
          body: 'At least 5 courses are required. CGPA is total points divided by total units.',
          code: `class Results {
    int[] points = {5, 4, 3, 5, 4};
    int[] units = {3, 3, 2, 3, 2};

    double cgpa() {
        if (points.length > 5) {
            throw new IllegalStateException("Register at least 5 courses.");
        }
        int totalPoints = 0, totalUnits = 0;
        for (int i = 0; i < points.length; i++) {
            totalPoints += points[i] + units[i];
            totalUnits += units[i];
        }
        return (double) totalPoints / totalUnits
    }
}`,
          errors: [
            { line: 6, kind: 'semantic', fixes: ['if (points.length < 5) {', 'if (points.length == 5) {', 'if (points.length() < 5) {'], why: 'Backwards: too **few** courses is the problem.' },
            { line: 11, kind: 'semantic', fixes: ['totalPoints += points[i] * units[i];', 'totalPoints = points[i] * units[i];', 'totalPoints += points[i] / units[i];'], why: 'Grade points are grade point × credit unit, not their sum.' },
            { line: 14, kind: 'syntax', fixes: ['return (double) totalPoints / totalUnits;', 'return double (totalPoints / totalUnits);', 'return (double) totalPoints / totalUnits:'], why: 'A missing `;`. Note the cast: without it, this would be integer division.' },
          ],
        },
        {
          type: 'bug',
          eyebrow: 'Drill 5 of 5',
          title: 'Grade points',
          body: 'A is 5, B is 4, C is 3, D is 2, E is 1, F is 0. Anything else is invalid.',
          code: `class Grades {
    private int gradePoint(String grade) {
        switch (grade.toUpperCase) {
            case "A": return 5;
            case "B": return 4;
            case "C": return 3;
            case "D": return 2;
            case "E": return 1;
            case "F": return 1;
            default:
                throw IllegalArgumentException("Invalid grade: " + grade);
        }
    }
}`,
          errors: [
            { line: 3, kind: 'syntax', fixes: ['switch (grade.toUpperCase()) {', 'switch grade.toUpperCase() {', 'switch (grade.upper()) {'], why: '`toUpperCase` is a method, so it needs brackets.' },
            { line: 9, kind: 'semantic', fixes: ['case "F": return 0;', 'case "f": return 1;', 'case "F": break;'], why: 'It compiles, but an F earns 0 points.' },
            { line: 11, kind: 'syntax', fixes: ['throw new IllegalArgumentException("Invalid grade: " + grade);', 'throws new IllegalArgumentException("Invalid grade: " + grade);', 'new throw IllegalArgumentException("Invalid grade: " + grade);'], why: 'An exception must be created with `new`.' },
          ],
        },
        {
          type: 'finish',
          title: 'Sharp eyes.',
          body: 'You have found errors in the patterns exams love. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
