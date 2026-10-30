// COS 202 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Code goes between backticks, or triple backticks for a block.

export default {
  "code": "COS 202",
  "updated": "2026-10-30",
  "title": "Advanced Object-Oriented Programming (Java)",
  "sets": [
    {
      "id": "QS001",
      "title": "Java toolkit: types, control flow, arrays and methods",
      "questions": [
        {
          "question": "Where does a Java program start running?",
          "options": [
            "`public static void main(String[] args)`",
            "The first line of the file",
            "The class constructor",
            "The first method in the file"
          ],
          "answer": 0,
          "explanation": "The JVM looks for `main` with exactly that signature."
        },
        {
          "question": "A `public class Student` must be saved in a file named",
          "options": [
            "`Student.class`",
            "Any `.java` file",
            "`Student.java`",
            "`student.java`"
          ],
          "answer": 2,
          "explanation": "The file name must match a public class exactly, capitals included. `.class` is what the compiler produces."
        },
        {
          "question": "Which of these is not a primitive type?",
          "options": [
            "`int`",
            "`char`",
            "`String`",
            "`boolean`"
          ],
          "answer": 2,
          "explanation": "`String` is a class. The eight primitives are `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`."
        },
        {
          "question": "What does this print?\n```\nSystem.out.println(7 / 2);\nSystem.out.println(7 % 2);\nSystem.out.println(7 / 2.0);\n```",
          "options": [
            "```\n3\n1\n3\n```",
            "```\n3.5\n1\n3.5\n```",
            "```\n3\n3\n3.5\n```",
            "```\n3\n1\n3.5\n```"
          ],
          "answer": 3,
          "explanation": "Two `int`s give integer division, `%` is the remainder, and one `double` makes the division decimal."
        },
        {
          "question": "What does this print?\n```\nSystem.out.println(\"a\" + 1 + 2);\nSystem.out.println(1 + 2 + \"a\");\n```",
          "options": [
            "```\na12\n12a\n```",
            "```\na3\n12a\n```",
            "```\na12\n3a\n```",
            "```\na3\n3a\n```"
          ],
          "answer": 2,
          "explanation": "`+` works left to right. Once text is on the left it joins; `1 + 2` is added before any text appears."
        },
        {
          "question": "What does this print?\n```\nint x = 5;\nint y = x++;\nint z = ++x;\nSystem.out.println(x + \" \" + y + \" \" + z);\n```",
          "options": [
            "`7 6 7`",
            "`7 5 7`",
            "`6 5 6`",
            "`7 5 6`"
          ],
          "answer": 1,
          "explanation": "`x++` uses the old value (5), then adds one. `++x` adds first, so `z` is 7."
        },
        {
          "question": "What is wrong with this code?\n```\nint x = 5\nSystem.out.println(x);\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "The first statement has no `;`, so the code won’t compile."
        },
        {
          "question": "What is wrong with this code?\n```\nint total = 0;\nfor (int i = 1; i < 10; i++) {\n    total += i;\n}\n// total should be the sum of 1 to 10\nSystem.out.println(total);\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 1,
          "explanation": "It compiles, but `i < 10` stops at 9. Summing up to 10 needs `i <= 10`."
        },
        {
          "question": "What is wrong with this code?\n```\nint x = 5;\nif (x = 5) {\n    System.out.println(\"five\");\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`=` assigns, and an `int` isn’t a `boolean`, so an `if` won’t accept it. Comparison uses `==`."
        },
        {
          "question": "What does this print?\n```\nint day = 2;\nswitch (day) {\n    case 1: System.out.print(\"A\");\n    case 2: System.out.print(\"B\");\n    case 3: System.out.print(\"C\");\n        break;\n    case 4: System.out.print(\"D\");\n}\n```",
          "options": [
            "`B`",
            "`BC`",
            "`BCD`",
            "`ABC`"
          ],
          "answer": 1,
          "explanation": "It jumps to `case 2` and falls through until the `break`."
        },
        {
          "question": "What does this print?\n```\nint i = 0;\nwhile (i < 3) {\n    System.out.print(i);\n    i++;\n}\nSystem.out.print(i);\n```",
          "options": [
            "`012`",
            "`123`",
            "`0123`",
            "`01233`"
          ],
          "answer": 2,
          "explanation": "The loop prints 0, 1, 2. It ends with `i` at 3, which the last line prints."
        },
        {
          "question": "What does this print?\n```\nint i = 10;\ndo {\n    System.out.print(i);\n} while (i < 5);\n```",
          "options": [
            "`(nothing)`",
            "`10`",
            "`5`",
            "`105`"
          ],
          "answer": 1,
          "explanation": "A `do`-`while` tests its condition after the body, so the body always runs once."
        },
        {
          "question": "What does this print?\n```\nfor (int i = 0; i < 3; i++) {\n    if (i == 1) continue;\n    System.out.print(i);\n}\n```",
          "options": [
            "`0`",
            "`012`",
            "`01`",
            "`02`"
          ],
          "answer": 3,
          "explanation": "`continue` skips the rest of this pass only; `break` would leave the loop."
        },
        {
          "question": "`int[] a = new int[5];` What is the index of the last element?",
          "options": [
            "`6`",
            "`4`",
            "`5`",
            "`a.length`"
          ],
          "answer": 1,
          "explanation": "Indexes run from `0` to `length - 1`."
        },
        {
          "question": "What are the elements of `new boolean[3]` at the start?",
          "options": [
            "All `null`",
            "Undefined until set",
            "All `false`",
            "All `true`"
          ],
          "answer": 2,
          "explanation": "`new` fills arrays with defaults: `0` for numbers, `false` for `boolean`, `null` for objects."
        },
        {
          "question": "What does this print?\n```\nint[] a = {1, 2, 3};\nint[] b = a;\nb[0] = 9;\nSystem.out.println(a[0] + \" \" + a.length);\n```",
          "options": [
            "`9 2`",
            "`1 3`",
            "`9 3`",
            "`1 2`"
          ],
          "answer": 2,
          "explanation": "`b = a` copies the reference, so both names share one array."
        },
        {
          "question": "Does this code compile?\n```\nint[] a = {1, 2, 3};\nSystem.out.println(a.length());\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Arrays have a `length` field, with no brackets. `length()` is for `String`."
        },
        {
          "question": "What is wrong with this code?\n```\nint[] a = {1, 2, 3};\nfor (int i = 0; i <= a.length; i++) {\n    System.out.println(a[i]);\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but `i` reaches 3, which throws `ArrayIndexOutOfBoundsException`. Use `<`."
        },
        {
          "question": "What does this print?\n```\nint[][] m = { {1, 2, 3}, {4, 5, 6} };\nSystem.out.println(m.length + \" \" + m[0].length + \" \" + m[1][0]);\n```",
          "options": [
            "`3 2 4`",
            "`2 3 2`",
            "`2 3 4`",
            "`6 3 4`"
          ],
          "answer": 2,
          "explanation": "2 rows, 3 columns, and row 1 column 0 is `4`."
        },
        {
          "question": "How many elements does `new int[3][5][7]` hold?",
          "options": [
            "105",
            "15",
            "21",
            "35"
          ],
          "answer": 0,
          "explanation": "The total size is the product of the dimensions: 3 × 5 × 7."
        },
        {
          "question": "What does this print?\n```\nstatic void add(int x, int[] a) {\n    x = 100;\n    a[0] = 100;\n}\n\npublic static void main(String[] args) {\n    int x = 1;\n    int[] a = {1};\n    add(x, a);\n    System.out.println(x + \" \" + a[0]);\n}\n```",
          "options": [
            "`1 100`",
            "`100 100`",
            "`1 1`",
            "`100 1`"
          ],
          "answer": 0,
          "explanation": "Java copies arguments. The `int` copy changes alone, but the array reference still points at the same array."
        },
        {
          "question": "In `static int add(int x, int y)`, what are `x` and `y`?",
          "options": [
            "Fields",
            "Parameters",
            "Return values",
            "Arguments"
          ],
          "answer": 1,
          "explanation": "Parameters are in the definition. Arguments are the values passed in a call, like `add(5, 3)`."
        },
        {
          "question": "Does this code compile?\n```\nstatic void show() {\n    return 5;\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A `void` method can’t return a value."
        },
        {
          "question": "Does this code compile?\n```\nstatic int f(int x) { return x; }\nstatic double f(int x) { return x; }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Overloads must differ in their parameters. A different return type alone isn’t enough."
        },
        {
          "question": "What does this print?\n```\nstatic String f(int x) { return \"int\"; }\nstatic String f(double x) { return \"double\"; }\nstatic String f(String x) { return \"String\"; }\n\npublic static void main(String[] args) {\n    System.out.println(f(1) + f(1.0) + f(\"1\"));\n}\n```",
          "options": [
            "`intdoubleString`",
            "`doubledoubleString`",
            "`intdoubleint`",
            "`intintString`"
          ],
          "answer": 0,
          "explanation": "Overloading is resolved at compile time from the arguments’ types."
        }
      ]
    },
    {
      "id": "QS002",
      "title": "Recursion, searching and sorting",
      "questions": [
        {
          "question": "Every recursive method needs",
          "options": [
            "A base case that stops the calls",
            "A loop",
            "Two parameters",
            "A `static` modifier"
          ],
          "answer": 0,
          "explanation": "Without a base case the calls never end, and Java throws `StackOverflowError`."
        },
        {
          "question": "A recursive method with no base case will",
          "options": [
            "Return `0`",
            "Run once",
            "Throw `StackOverflowError` when run",
            "Fail to compile"
          ],
          "answer": 2,
          "explanation": "It compiles, so it is a semantic error. The call stack eventually runs out of space."
        },
        {
          "question": "What does this print?\n```\nstatic int sum(int k) {\n    if (k > 0) return k + sum(k - 1);\n    return 0;\n}\n\npublic static void main(String[] args) {\n    System.out.println(sum(5));\n}\n```",
          "options": [
            "`15`",
            "`5`",
            "`10`",
            "`0`"
          ],
          "answer": 0,
          "explanation": "`5 + 4 + 3 + 2 + 1 + 0`."
        },
        {
          "question": "What does this print?\n```\nstatic int f(int n) {\n    if (n <= 1) return 1;\n    return n * f(n - 1);\n}\n\npublic static void main(String[] args) {\n    System.out.println(f(4));\n}\n```",
          "options": [
            "`4`",
            "`10`",
            "`24`",
            "`16`"
          ],
          "answer": 2,
          "explanation": "This is factorial: 4 × 3 × 2 × 1."
        },
        {
          "question": "What does this print?\n```\nstatic int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\npublic static void main(String[] args) {\n    System.out.println(fib(7));\n}\n```",
          "options": [
            "`21`",
            "`8`",
            "`7`",
            "`13`"
          ],
          "answer": 3,
          "explanation": "The sequence is 0, 1, 1, 2, 3, 5, 8, 13, and index 7 is 13."
        },
        {
          "question": "What does this print?\n```\nstatic void go(int n) {\n    if (n == 0) return;\n    System.out.print(n);\n    go(n - 1);\n}\n\npublic static void main(String[] args) {\n    go(3);\n}\n```",
          "options": [
            "`123`",
            "`3`",
            "`321`",
            "`3210`"
          ],
          "answer": 2,
          "explanation": "The print comes before the call, so values appear on the way down."
        },
        {
          "question": "What does this print?\n```\nstatic void go(int n) {\n    if (n == 0) return;\n    go(n - 1);\n    System.out.print(n);\n}\n\npublic static void main(String[] args) {\n    go(3);\n}\n```",
          "options": [
            "`3`",
            "`123`",
            "`321`",
            "`0123`"
          ],
          "answer": 1,
          "explanation": "The print comes after the call, so it waits, and values appear on the way back up."
        },
        {
          "question": "What does this print?\n```\nstatic void go(int n) {\n    if (n == 0) return;\n    System.out.print(n);\n    go(n - 1);\n    System.out.print(n);\n}\n\npublic static void main(String[] args) {\n    go(2);\n}\n```",
          "options": [
            "`2121`",
            "`1221`",
            "`212`",
            "`2112`"
          ],
          "answer": 3,
          "explanation": "Down: 2, 1. Back up, deepest first: 1, 2."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int fact(int n) {\n    return n * fact(n - 1);\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles, but there is no base case, so calling it overflows the stack."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int sum(int k) {\n    if (k == 0) return 0;\n    return k + sum(k + 1);\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles, but `k + 1` moves away from the base case. It must be `k - 1`."
        },
        {
          "question": "While a recursive call is running, the calling method is",
          "options": [
            "Copied to a new thread",
            "Running at the same time",
            "Suspended on the call stack, waiting for the result",
            "Finished and removed"
          ],
          "answer": 2,
          "explanation": "Each call waits on the stack, and results combine on the way back."
        },
        {
          "question": "Binary search only works when the data is",
          "options": [
            "All positive",
            "Unsorted",
            "Stored in a `String`",
            "Sorted"
          ],
          "answer": 3,
          "explanation": "It discards half the range based on order, so the order must be there."
        },
        {
          "question": "About how many comparisons does binary search need for 1,000,000 sorted items?",
          "options": [
            "1,000,000",
            "20",
            "1,000",
            "500,000"
          ],
          "answer": 1,
          "explanation": "It halves the range each time, and 2 to the power of 20 is about a million."
        },
        {
          "question": "The worst case for linear search on `n` items is",
          "options": [
            "1 comparison",
            "About `log₂ n` comparisons",
            "`n / 2` comparisons",
            "`n` comparisons"
          ],
          "answer": 3,
          "explanation": "The key may be last, or missing, so every element gets checked."
        },
        {
          "question": "Binary search is an example of which approach?",
          "options": [
            "Polymorphism",
            "Divide and conquer",
            "Inheritance",
            "Brute force"
          ],
          "answer": 1,
          "explanation": "It splits the problem and continues on one part."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int find(int[] a, int key) {\n    int low = 0, high = a.length - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (a[mid] == key) return mid;\n        if (a[mid] < key) low = mid;\n        else high = mid - 1;\n    }\n    return -1;\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "`low = mid` can leave the range unchanged, looping forever. It must be `low = mid + 1`."
        },
        {
          "question": "What does this print?\n```\nint[] a = {2, 4, 6, 8, 10};\nint low = 0, high = 4, steps = 0;\nwhile (low <= high) {\n    int mid = (low + high) / 2;\n    steps++;\n    if (a[mid] == 8) break;\n    if (a[mid] < 8) low = mid + 1;\n    else high = mid - 1;\n}\nSystem.out.println(steps);\n```",
          "options": [
            "`3`",
            "`2`",
            "`1`",
            "`4`"
          ],
          "answer": 1,
          "explanation": "First the middle is 6, too small. Then the range is 8 and 10; its middle is 8."
        },
        {
          "question": "After pass `i` of selection sort,",
          "options": [
            "Only neighbours have been compared",
            "The first `i` elements are the `i` smallest, in order",
            "The whole array is sorted",
            "The last `i` elements are sorted"
          ],
          "answer": 1,
          "explanation": "Each pass places the smallest remaining element at the front of the unsorted part."
        },
        {
          "question": "How many passes does selection sort need for `n` elements?",
          "options": [
            "`n + 1`",
            "`n`",
            "`n - 1`",
            "`2n`"
          ],
          "answer": 2,
          "explanation": "Once all but one are placed, the last is in place too."
        },
        {
          "question": "What does this print?\n```\nint[] a = {5, 2, 8, 1};\nfor (int i = 0; i < 2; i++) {\n    int s = i;\n    for (int j = i + 1; j < a.length; j++) {\n        if (a[j] < a[s]) s = j;\n    }\n    int t = a[i]; a[i] = a[s]; a[s] = t;\n}\nSystem.out.println(java.util.Arrays.toString(a));\n```",
          "options": [
            "`[1, 2, 8, 5]`",
            "`[1, 5, 8, 2]`",
            "`[1, 2, 5, 8]`",
            "`[2, 5, 1, 8]`"
          ],
          "answer": 0,
          "explanation": "Two passes: 1 swaps with 5, then 2 is already in place."
        },
        {
          "question": "Which sort repeatedly swaps neighbouring elements that are out of order?",
          "options": [
            "Selection sort",
            "Insertion sort",
            "Binary sort",
            "Bubble sort"
          ],
          "answer": 3,
          "explanation": "The largest “bubbles” to the end on each pass."
        },
        {
          "question": "Which sort works like arranging playing cards in your hand?",
          "options": [
            "Bubble sort",
            "Selection sort",
            "Insertion sort",
            "Linear sort"
          ],
          "answer": 2,
          "explanation": "Each new element slides back into place among those already sorted."
        },
        {
          "question": "What is wrong with this code?\n```\nint[] a = {3, 1};\nint t = a[0];\na[0] = a[1];\na[1] = a[0];\nSystem.out.println(a[0] + \" \" + a[1]);\n// should print 1 3\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 0,
          "explanation": "It compiles, but `a[0]` was already overwritten. The last assignment should use the saved `t`."
        },
        {
          "question": "What does this print?\n```\nint[] a = {3, 1, 2};\nfor (int i = 0; i < a.length - 1; i++) {\n    if (a[i] > a[i + 1]) {\n        int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n    }\n}\nSystem.out.println(java.util.Arrays.toString(a));\n```",
          "options": [
            "`[3, 1, 2]`",
            "`[1, 2, 3]`",
            "`[1, 3, 2]`",
            "`[2, 1, 3]`"
          ],
          "answer": 1,
          "explanation": "One bubble pass carries 3 to the end, which happens to finish this short array."
        },
        {
          "question": "To swap two array elements safely you need",
          "options": [
            "A second array",
            "A loop",
            "A temporary variable",
            "A `final` variable"
          ],
          "answer": 2,
          "explanation": "Save one value first: `int t = a[i]; a[i] = a[j]; a[j] = t;`."
        }
      ]
    },
    {
      "id": "QS003",
      "title": "Classes, objects, constructors and encapsulation",
      "questions": [
        {
          "question": "A class is best described as",
          "options": [
            "A running program",
            "A kind of variable",
            "A blueprint for creating objects",
            "An instance of an object"
          ],
          "answer": 2,
          "explanation": "An object is an instance built from that blueprint."
        },
        {
          "question": "An object has state, behaviour and",
          "options": [
            "Inheritance",
            "A constructor",
            "Identity",
            "A package"
          ],
          "answer": 2,
          "explanation": "Identity means it is its own object, even if another holds the same values."
        },
        {
          "question": "Which keyword creates an object?",
          "options": [
            "`this`",
            "`create`",
            "`class`",
            "`new`"
          ],
          "answer": 3,
          "explanation": "`new` allocates the object, runs a constructor and gives back a reference."
        },
        {
          "question": "What does this print?\n```\nclass Car {\n    int speed;\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        System.out.println(c.speed + \" \" + c.name);\n    }\n}\n```",
          "options": [
            "`null null`",
            "` `",
            "`0 null`",
            "`0 `"
          ],
          "answer": 2,
          "explanation": "Fields get default values: `0` for numbers, `null` for references."
        },
        {
          "question": "What does this print?\n```\nclass Car {\n    int speed;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car a = new Car();\n        Car b = a;\n        b.speed = 80;\n        Car c = new Car();\n        System.out.println(a.speed + \" \" + (a == b) + \" \" + (a == c));\n    }\n}\n```",
          "options": [
            "`0 false false`",
            "`80 true false`",
            "`80 true true`",
            "`0 true false`"
          ],
          "answer": 1,
          "explanation": "`b = a` copies the reference, while `c` is a separate object."
        },
        {
          "question": "Using a method on a reference that is `null` throws",
          "options": [
            "`ArithmeticException`",
            "`IllegalStateException`",
            "`NullPointerException`",
            "`NumberFormatException`"
          ],
          "answer": 2,
          "explanation": "The reference points at no object, so there is nothing to call the method on."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Book {\n    String title;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b;\n        b = null;\n        b.title = \"Java\";\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but `b` is `null`, so the assignment throws `NullPointerException`."
        },
        {
          "question": "A constructor must have",
          "options": [
            "A `void` return type",
            "At least one parameter",
            "The `static` modifier",
            "The class’s name and no return type"
          ],
          "answer": 3,
          "explanation": "Add a return type, even `void`, and it becomes an ordinary method."
        },
        {
          "question": "Does this code compile?\n```\nclass Car {\n    int year;\n    Car(int year) { this.year = year; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Once you write any constructor, Java stops supplying the default one, so `new Car()` has nothing to call."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Car {\n    int year;\n    void Car(int year) { this.year = year; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car(2024);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "`void Car` is a method, not a constructor, so `new Car(2024)` matches nothing and won’t compile."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    int x;\n    A(int x) { x = x; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new A(5).x);\n    }\n}\n```",
          "options": [
            "`5`",
            "`0`",
            "`1`",
            "`null`"
          ],
          "answer": 1,
          "explanation": "`x = x` assigns the parameter to itself. The field keeps its default."
        },
        {
          "question": "In a constructor, `this.name = name;` means",
          "options": [
            "Call the parent’s constructor",
            "Set this object’s field to the parameter’s value",
            "Create a new object",
            "Set the parameter to the field’s value"
          ],
          "answer": 1,
          "explanation": "`this.name` is the field, and plain `name` is the parameter hiding it."
        },
        {
          "question": "What does a copy constructor do?",
          "options": [
            "Copies a class",
            "Builds a new object from an existing one’s values",
            "Returns the same object",
            "Duplicates a reference only"
          ],
          "answer": 1,
          "explanation": "For example `Point(Point p) { x = p.x; y = p.y; }`."
        },
        {
          "question": "A private constructor",
          "options": [
            "Stops inheritance of fields only",
            "Makes every field private",
            "Runs before `main`",
            "Stops other classes from using `new` on this class"
          ],
          "answer": 3,
          "explanation": "Only code inside the class can then create objects."
        },
        {
          "question": "What does this print?\n```\nclass P {\n    int v;\n    P() { this(7); }\n    P(int v) { this.v = v; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new P().v);\n    }\n}\n```",
          "options": [
            "`null`",
            "`0`",
            "`1`",
            "`7`"
          ],
          "answer": 3,
          "explanation": "`this(7)` calls the other constructor of the same class."
        },
        {
          "question": "Does this code compile?\n```\nclass P {\n    int v;\n    P() {\n        v = 1;\n        this(7);\n    }\n    P(int v) { this.v = v; }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`this(...)` must be the first statement of a constructor."
        },
        {
          "question": "Encapsulation means",
          "options": [
            "Inheriting from a class",
            "Keeping data private and controlling access through methods",
            "Having many forms of a method",
            "Hiding a class in a package only"
          ],
          "answer": 1,
          "explanation": "Private fields plus public getters and setters, where rules can be enforced."
        },
        {
          "question": "Which is the correct getter for a private `int age`?",
          "options": [
            "`public int getAge(int age) { age = age; }`",
            "`private int age() { return this; }`",
            "`public void getAge() { return age; }`",
            "`public int getAge() { return age; }`"
          ],
          "answer": 3,
          "explanation": "A getter is public, returns the field’s type, and takes nothing."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Course {\n    private int unit;\n    public void setUnit(int unit) {\n        unit = unit;\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but it assigns the parameter to itself. It must be `this.unit = unit;`."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Course {\n    private int unit;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Course c = new Course();\n        c.unit = 3;\n    }\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 1,
          "explanation": "`unit` is private, so another class can’t use it. It needs a public setter."
        },
        {
          "question": "What is the main benefit of a setter over a public field?",
          "options": [
            "It makes the field static",
            "It uses less memory",
            "It runs faster",
            "It can validate the value before storing it"
          ],
          "answer": 3,
          "explanation": "A public field accepts any value; a setter can throw on a bad one."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Course {\n    private int unit;\n    public void setUnit(int unit) {\n        if (unit < 0) throw new IllegalArgumentException(\"Bad unit\");\n        this.unit = unit;\n    }\n}\n// A unit must be positive.\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 1,
          "explanation": "It compiles, but `0` gets through. A positive unit needs `unit <= 0` as the rejection test."
        },
        {
          "question": "What does this print?\n```\nclass Box {\n    private int n;\n    public Box add(int k) { n += k; return this; }\n    public int get() { return n; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new Box().add(2).add(3).get());\n    }\n}\n```",
          "options": [
            "`0`",
            "`2`",
            "`3`",
            "`5`"
          ],
          "answer": 3,
          "explanation": "`return this` hands back the same object, so the calls chain."
        },
        {
          "question": "What does this print?\n```\nclass S {\n    String name;\n    S(String n) { name = n; }\n    @Override public String toString() { return \"S:\" + name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new S(\"Ada\"));\n    }\n}\n```",
          "options": [
            "`S@1`",
            "`Ada`",
            "`S`",
            "`S:Ada`"
          ],
          "answer": 3,
          "explanation": "`println` calls `toString()` on an object automatically."
        },
        {
          "question": "Is there an error here?\n```\nclass S {\n    String name;\n    S(String name) { this.name = name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        S a = new S(\"Ada\");\n        S b = new S(\"Ada\");\n        System.out.println(a == b);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 1,
          "explanation": "It is legal and it prints `false`: `==` asks whether they are the same object, which they aren’t. Nothing here claims otherwise."
        }
      ]
    },
    {
      "id": "QS004",
      "title": "Access and non-access modifiers",
      "questions": [
        {
          "question": "Which modifier allows access from every class?",
          "options": [
            "`protected`",
            "`private`",
            "No modifier",
            "`public`"
          ],
          "answer": 3,
          "explanation": "`public` has no limits."
        },
        {
          "question": "`private` members can be used",
          "options": [
            "Anywhere",
            "Inside the same package",
            "In subclasses only",
            "Only inside their own class"
          ],
          "answer": 3,
          "explanation": "`private` stops at the class boundary."
        },
        {
          "question": "A member with no access modifier can be used",
          "options": [
            "Only in subclasses",
            "Only inside its class",
            "Everywhere",
            "Only inside the same package"
          ],
          "answer": 3,
          "explanation": "That is default (package) access."
        },
        {
          "question": "`protected` allows access from",
          "options": [
            "Only the same class",
            "Only subclasses in the same package",
            "Every class",
            "The same package, and subclasses anywhere"
          ],
          "answer": 3,
          "explanation": "It is default access plus subclasses."
        },
        {
          "question": "Rank from most open to most closed.",
          "options": [
            "`private`, default, `protected`, `public`",
            "`public`, `protected`, default, `private`",
            "`protected`, `public`, default, `private`",
            "`public`, default, `protected`, `private`"
          ],
          "answer": 1,
          "explanation": "`protected` is wider than default because it adds subclasses."
        },
        {
          "question": "Does this code compile?\n```\npublic class A { }\npublic class B { }\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "One file can hold only one public top-level class, named after the file."
        },
        {
          "question": "What is wrong with this code?\n```\nclass P {\n    private int age = 30;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new P().age);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "“age has private access in P”: this won’t compile."
        },
        {
          "question": "Is there an error here?\n```\npublic class Main {\n    private int age = 30;\n\n    public static void main(String[] args) {\n        System.out.println(new Main().age);\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 1,
          "explanation": "This `main` is inside the same class as the field, so `private` allows it."
        },
        {
          "question": "A `final` variable",
          "options": [
            "Can’t be read",
            "Can’t be reassigned",
            "Must be private",
            "Is shared by all objects"
          ],
          "answer": 1,
          "explanation": "`final` locks the value once it is set."
        },
        {
          "question": "A `final` class",
          "options": [
            "Can’t be inherited from",
            "Must be abstract",
            "Can’t be instantiated",
            "Has only final fields"
          ],
          "answer": 0,
          "explanation": "It can still be created with `new`; it just can’t have subclasses."
        },
        {
          "question": "A `final` method",
          "options": [
            "Must be static",
            "Can’t be called",
            "Can’t be overridden",
            "Can’t have parameters"
          ],
          "answer": 2,
          "explanation": "Subclasses inherit it, but can’t replace it."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    final int x = 10;\n\n    public static void main(String[] args) {\n        Main m = new Main();\n        m.x = 50;\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "You can’t assign a value to a `final` variable."
        },
        {
          "question": "Does this code compile?\n```\nfinal class A { }\nclass B extends A { }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "A `final` class can’t be extended."
        },
        {
          "question": "Does this code compile?\n```\nclass A {\n    final void f() { }\n}\n\nclass B extends A {\n    void f() { }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A `final` method can’t be overridden."
        },
        {
          "question": "Does this code compile?\n```\nabstract final class A { }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`abstract` needs a subclass and `final` forbids one, so they can’t be combined."
        },
        {
          "question": "A `static` field is",
          "options": [
            "Shared by all objects of the class",
            "Copied into each object",
            "Impossible to change",
            "Always private"
          ],
          "answer": 0,
          "explanation": "There is one copy, belonging to the class."
        },
        {
          "question": "What does this print?\n```\nclass C {\n    static int n = 0;\n    int m = 0;\n    C() { n++; m++; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new C();\n        new C();\n        C c = new C();\n        System.out.println(C.n + \" \" + c.m);\n    }\n}\n```",
          "options": [
            "`1 1`",
            "`1 3`",
            "`3 3`",
            "`3 1`"
          ],
          "answer": 3,
          "explanation": "`n` is shared and reaches 3. Each object has its own `m`."
        },
        {
          "question": "What is wrong with this code?\n```\npublic class Main {\n    int count = 0;\n\n    public static void main(String[] args) {\n        count = 5;\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`main` is static, so it has no object. It can’t use the instance field `count` directly."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    static void hello() { System.out.println(\"hi\"); }\n\n    public static void main(String[] args) {\n        hello();\n        Main.hello();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 0,
          "explanation": "A static method can be called directly, or through the class’s name, with no object."
        },
        {
          "question": "Why can you call `Math.sqrt(9)` without `new Math()`?",
          "options": [
            "`Math` is abstract",
            "`Math` is an interface",
            "`sqrt` is private",
            "`sqrt` is a static method"
          ],
          "answer": 3,
          "explanation": "Static methods belong to the class."
        },
        {
          "question": "A typical constant is declared as",
          "options": [
            "`public abstract double PI = 3.14;`",
            "`public static final double PI = 3.14;`",
            "`private double PI = 3.14;`",
            "`final static void PI = 3.14;`"
          ],
          "answer": 1,
          "explanation": "Shared by everyone (`static`), and never changing (`final`)."
        },
        {
          "question": "`abstract` on a method means",
          "options": [
            "It has no body, and a subclass supplies one",
            "It is final",
            "It runs automatically",
            "It can’t be called"
          ],
          "answer": 0,
          "explanation": "For example `abstract void run();`."
        },
        {
          "question": "Which modifier makes a field skipped when an object is serialized?",
          "options": [
            "`synchronized`",
            "`static final`",
            "`transient`",
            "`volatile`"
          ],
          "answer": 2,
          "explanation": "`transient` fields aren’t saved with the object."
        },
        {
          "question": "Which modifier lets only one thread at a time run a method on an object?",
          "options": [
            "`final`",
            "`synchronized`",
            "`volatile`",
            "`transient`"
          ],
          "answer": 1,
          "explanation": "It takes the object’s lock."
        },
        {
          "question": "Which modifier means a value is never cached per thread, and always read from main memory?",
          "options": [
            "`transient`",
            "`synchronized`",
            "`volatile`",
            "`abstract`"
          ],
          "answer": 2,
          "explanation": "That is the definition of `volatile`."
        }
      ]
    },
    {
      "id": "QS005",
      "title": "Inheritance and polymorphism",
      "questions": [
        {
          "question": "Which keyword makes one class inherit from another?",
          "options": [
            "`implements`",
            "`inherits`",
            "`super`",
            "`extends`"
          ],
          "answer": 3,
          "explanation": "`class Dog extends Animal`."
        },
        {
          "question": "Inheritance represents which relationship?",
          "options": [
            "PART-OF",
            "IS-A",
            "HAS-A",
            "USES-A"
          ],
          "answer": 1,
          "explanation": "A `Dog` IS-A `Animal`."
        },
        {
          "question": "`class Car extends FourWheeler` and `class FourWheeler extends Vehicle` is",
          "options": [
            "Hierarchical inheritance",
            "Multiple inheritance",
            "Single inheritance",
            "Multilevel inheritance"
          ],
          "answer": 3,
          "explanation": "It is a chain of classes."
        },
        {
          "question": "`Car extends Vehicle` and `Bus extends Vehicle` is",
          "options": [
            "Multiple inheritance",
            "Hybrid inheritance",
            "Hierarchical inheritance",
            "Multilevel inheritance"
          ],
          "answer": 2,
          "explanation": "Many subclasses share one superclass."
        },
        {
          "question": "How does Java support multiple inheritance?",
          "options": [
            "Through `extends A, B`",
            "Through interfaces only",
            "It doesn’t, in any form",
            "Through nested classes"
          ],
          "answer": 1,
          "explanation": "A class can implement many interfaces, but extend only one class."
        },
        {
          "question": "Does this code compile?\n```\nclass A { }\nclass B { }\nclass C extends A, B { }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "A class can extend only one class, which avoids the diamond problem."
        },
        {
          "question": "`class Bus extends Vehicle implements Fare` is an example of",
          "options": [
            "Overloading",
            "Single inheritance only",
            "Multilevel inheritance",
            "Hybrid inheritance"
          ],
          "answer": 3,
          "explanation": "It mixes class inheritance and interfaces."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    A() { System.out.print(\"A\"); }\n}\n\nclass B extends A {\n    B() { System.out.print(\"B\"); }\n}\n\nclass C extends B {\n    C() { System.out.print(\"C\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new C();\n    }\n}\n```",
          "options": [
            "`C`",
            "`AC`",
            "`CBA`",
            "`ABC`"
          ],
          "answer": 3,
          "explanation": "Each constructor calls its parent’s first, so the top of the chain finishes first."
        },
        {
          "question": "Does this code compile?\n```\nclass P {\n    P(String n) { }\n}\n\nclass C extends P {\n    C() { }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Java inserts `super()`, but `P` has no no-argument constructor. `C` must call `super(\"...\")`."
        },
        {
          "question": "What is wrong with this code?\n```\nclass P {\n    P(String n) { }\n}\n\nclass C extends P {\n    int age;\n    C(String n, int a) {\n        age = a;\n        super(n);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "`super(...)` must be the first statement of a constructor."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Person { }\n\nclass Student extend Person { }\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "The keyword is `extends`."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    String f() { return \"A\"; }\n}\n\nclass B extends A {\n    @Override\n    String f() { return super.f() + \"B\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new B().f());\n    }\n}\n```",
          "options": [
            "`B`",
            "`A`",
            "`AB`",
            "`BA`"
          ],
          "answer": 2,
          "explanation": "`super.f()` calls the parent’s version first."
        },
        {
          "question": "A subclass can’t directly use its parent’s",
          "options": [
            "`public` methods",
            "`private` fields",
            "`protected` fields",
            "`public` fields"
          ],
          "answer": 1,
          "explanation": "It inherits them, but must reach them through the parent’s public methods."
        },
        {
          "question": "What is wrong with this code?\n```\nclass P {\n    private String name = \"x\";\n}\n\nclass C extends P {\n    String show() { return name; }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "`name` is private to `P`, even for a subclass."
        },
        {
          "question": "Overriding means a subclass",
          "options": [
            "Calls the parent’s constructor",
            "Adds a method with different parameters",
            "Redefines a parent’s method with the same signature",
            "Hides a private field"
          ],
          "answer": 2,
          "explanation": "Different parameters would be overloading."
        },
        {
          "question": "Overriding is resolved",
          "options": [
            "At runtime",
            "By the class loader only",
            "When the file is saved",
            "At compile time"
          ],
          "answer": 0,
          "explanation": "The object’s real type decides. Overloading is resolved at compile time."
        },
        {
          "question": "What does `@Override` do?",
          "options": [
            "Makes a method final",
            "Makes the compiler check that the method really overrides one",
            "Makes a method run faster",
            "Is required for overriding to work"
          ],
          "answer": 1,
          "explanation": "It is optional, but it catches typos."
        },
        {
          "question": "Does this code compile?\n```\nclass A {\n    void run() { }\n}\n\nclass B extends A {\n    @Override\n    void Run() { }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`Run` isn’t `run`, so it overrides nothing, and `@Override` reports it."
        },
        {
          "question": "What does this print?\n```\nclass Animal {\n    String sound() { return \"...\"; }\n}\n\nclass Dog extends Animal {\n    @Override\n    String sound() { return \"Bark\"; }\n}\n\nclass Cat extends Animal { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal[] pets = { new Dog(), new Cat() };\n        for (Animal p : pets) System.out.print(p.sound() + \" \");\n    }\n}\n```",
          "options": [
            "`Bark ...`",
            "`Bark`",
            "`... ...`",
            "`Bark Meow`"
          ],
          "answer": 0,
          "explanation": "The object decides, and `Cat` inherits the parent’s version."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Animal { }\n\nclass Dog extends Animal {\n    void bark() { }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.bark();\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 1,
          "explanation": "The variable’s type decides what you may call, and `Animal` has no `bark`. It needs a cast."
        },
        {
          "question": "Does this code compile?\n```\nclass Animal { }\n\nclass Dog extends Animal { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Animal();\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "Every Dog is an Animal, but not every Animal is a Dog."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Animal { }\n\nclass Dog extends Animal { }\n\nclass Cat extends Animal { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Cat();\n        Dog d = (Dog) a;\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "The cast compiles, but it throws `ClassCastException` when run, because the object is a `Cat`."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    String who() { return \"A\"; }\n    String hi() { return who(); }\n}\n\nclass B extends A {\n    @Override\n    String who() { return \"B\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        A a = new B();\n        System.out.println(a.hi());\n    }\n}\n```",
          "options": [
            "`null`",
            "`A`",
            "`AB`",
            "`B`"
          ],
          "answer": 3,
          "explanation": "`hi` lives in `A`, but its call to `who()` still runs the object’s version."
        },
        {
          "question": "`print(int)` and `print(String)` in one class are an example of",
          "options": [
            "Inheritance",
            "Overloading: compile-time polymorphism",
            "Encapsulation",
            "Overriding: runtime polymorphism"
          ],
          "answer": 1,
          "explanation": "Same name, different parameters."
        },
        {
          "question": "Which is a limitation of deep inheritance hierarchies?",
          "options": [
            "Tight coupling: parent changes can break subclasses",
            "Objects can’t be created",
            "Methods can’t be overridden",
            "Code can’t be reused"
          ],
          "answer": 0,
          "explanation": "Keep hierarchies simple, and prefer interfaces or composition where you can."
        }
      ]
    },
    {
      "id": "QS006",
      "title": "Abstraction and interfaces",
      "questions": [
        {
          "question": "Abstraction focuses on",
          "options": [
            "What an object does, not how",
            "Keeping fields private",
            "Reusing a parent’s code",
            "How an object does its work"
          ],
          "answer": 0,
          "explanation": "A TV remote is the classic example: press the button, and ignore the wiring."
        },
        {
          "question": "Java achieves abstraction with",
          "options": [
            "Only packages",
            "Only `private` fields",
            "Abstract classes and interfaces",
            "Arrays and methods"
          ],
          "answer": 2,
          "explanation": "Encapsulation is what relies on private fields."
        },
        {
          "question": "Does this code compile?\n```\nabstract class Shape { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Shape();\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "An abstract class can’t be created with `new`."
        },
        {
          "question": "Does this code compile?\n```\nabstract class Shape { }\n\nclass Circle extends Shape { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 1,
          "explanation": "A variable may have the abstract type, and a concrete subclass supplies the object."
        },
        {
          "question": "What is wrong with this code?\n```\nabstract class Shape {\n    abstract double area() { }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "An abstract method has no body: end it with `;`."
        },
        {
          "question": "Does this code compile?\n```\nclass Shape {\n    abstract double area();\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "A class with an abstract method must itself be declared `abstract`."
        },
        {
          "question": "Does this code compile?\n```\nabstract class Shape {\n    abstract double area();\n}\n\nclass Circle extends Shape { }\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A concrete subclass must implement every abstract method, or be abstract too."
        },
        {
          "question": "An abstract class can contain",
          "options": [
            "Only constants",
            "Nothing but method headers",
            "Only abstract methods",
            "Abstract methods, concrete methods, fields and constructors"
          ],
          "answer": 3,
          "explanation": "That is why it is called partial abstraction."
        },
        {
          "question": "Why would an abstract class have a constructor?",
          "options": [
            "To make its methods static",
            "So `new` can create it",
            "It wouldn’t: it can’t have one",
            "Subclasses call it with `super(...)` to set shared fields"
          ],
          "answer": 3,
          "explanation": "It still has state to initialise, even though it is never created directly."
        },
        {
          "question": "What does this print?\n```\nabstract class S {\n    S() { System.out.print(\"S \"); }\n    abstract int a();\n    int twice() { return 2 * a(); }\n}\n\nclass T extends S {\n    T() { System.out.print(\"T \"); }\n    @Override int a() { return 3; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        S s = new T();\n        System.out.print(s.twice());\n    }\n}\n```",
          "options": [
            "`S T 3`",
            "`S T 6`",
            "`T 6`",
            "`T S 6`"
          ],
          "answer": 1,
          "explanation": "The parent’s constructor runs first, and `twice` uses the subclass’s `a`."
        },
        {
          "question": "An interface is",
          "options": [
            "A kind of object",
            "A class with no name",
            "A package of classes",
            "A contract of behaviour that classes implement"
          ],
          "answer": 3,
          "explanation": "It says what a class can do."
        },
        {
          "question": "A class uses an interface with the keyword",
          "options": [
            "`implements`",
            "`uses`",
            "`extends`",
            "`interface`"
          ],
          "answer": 0,
          "explanation": "Class to class is `extends`; class to interface is `implements`."
        },
        {
          "question": "An interface extends another interface with",
          "options": [
            "It can’t",
            "`extends`",
            "`implements`",
            "`super`"
          ],
          "answer": 1,
          "explanation": "`interface B extends A`. Only a class implements."
        },
        {
          "question": "Variables in an interface are always",
          "options": [
            "`protected abstract`",
            "Instance fields",
            "`private`",
            "`public static final`"
          ],
          "answer": 3,
          "explanation": "So they are constants."
        },
        {
          "question": "What is wrong with this code?\n```\ninterface V {\n    int WHEELS = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        V.WHEELS = 2;\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 1,
          "explanation": "Interface variables are `final`."
        },
        {
          "question": "Does this code compile?\n```\ninterface V { }\n\npublic class Main {\n    public static void main(String[] args) {\n        V v = new V();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "An interface can’t be created with `new`."
        },
        {
          "question": "What is wrong with this code?\n```\ninterface V {\n    void go();\n}\n\nclass B implements V {\n    void go() { }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "Interface methods are public, and an implementation can’t reduce that. It must be `public void go()`."
        },
        {
          "question": "What is wrong with this code?\n```\nabstract class P { }\n\nclass C implements P { }\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "`P` is a class, so `C` must use `extends`. This mix-up is a favourite of bug-hunt questions."
        },
        {
          "question": "Does this code compile?\n```\ninterface A { void a(); }\ninterface B { void b(); }\n\nclass C implements A, B {\n    public void a() { }\n    public void b() { }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 0,
          "explanation": "A class can implement several interfaces."
        },
        {
          "question": "What does this print?\n```\ninterface S {\n    double area();\n}\n\nclass Q1 implements S {\n    public double area() { return 4; }\n}\n\nclass D1 implements S {\n    public double area() { return 3; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        S[] all = { new Q1(), new D1() };\n        double t = 0;\n        for (S s : all) t += s.area();\n        System.out.println(t);\n    }\n}\n```",
          "options": [
            "`7`",
            "`4.0`",
            "`0.0`",
            "`7.0`"
          ],
          "answer": 3,
          "explanation": "That is dynamic dispatch. A `double` prints with `.0`."
        },
        {
          "question": "Which suits a capability shared by unrelated classes, like `Flyable`?",
          "options": [
            "A `final` class",
            "An interface",
            "An abstract class",
            "A static method"
          ],
          "answer": 1,
          "explanation": "Birds and planes share no parent, but both can fly."
        },
        {
          "question": "What does this print?\n```\ninterface G {\n    default String hi() { return \"Hi\"; }\n}\n\nclass A1 implements G { }\n\nclass B1 implements G {\n    public String hi() { return \"Hey\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new A1().hi() + new B1().hi());\n    }\n}\n```",
          "options": [
            "`HeyHey`",
            "`Hey`",
            "`HiHey`",
            "`HiHi`"
          ],
          "answer": 2,
          "explanation": "A default method is inherited, and can be overridden."
        },
        {
          "question": "Does this code compile?\n```\ninterface G {\n    static String hi() { return \"Hi\"; }\n}\n\nclass A1 implements G { }\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new A1().hi());\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Static interface methods aren’t inherited. Call `G.hi()`."
        },
        {
          "question": "A functional interface has",
          "options": [
            "Exactly one abstract method",
            "No methods at all",
            "Exactly one field",
            "Only default methods"
          ],
          "answer": 0,
          "explanation": "That one method is what a lambda supplies. Default and static methods don’t count."
        },
        {
          "question": "What does this print?\n```\ninterface Calc {\n    int run(int x, int y);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calc add = (x, y) -> x + y;\n        Calc mul = (x, y) -> x * y;\n        System.out.println(add.run(2, 3) + mul.run(2, 3));\n    }\n}\n```",
          "options": [
            "`6`",
            "`11`",
            "`56`",
            "`5`"
          ],
          "answer": 1,
          "explanation": "`5 + 6`: both results are `int`s, so `+` adds them."
        }
      ]
    },
    {
      "id": "QS007",
      "title": "The Java API: Strings, collections and iterators",
      "questions": [
        {
          "question": "Which package is available without an `import`?",
          "options": [
            "`javax.swing`",
            "`java.io`",
            "`java.lang`",
            "`java.util`"
          ],
          "answer": 2,
          "explanation": "That is why `String` and `Math` just work."
        },
        {
          "question": "`ArrayList` lives in",
          "options": [
            "`java.lang`",
            "`java.util`",
            "`javax.swing`",
            "`java.awt`"
          ],
          "answer": 1,
          "explanation": "`import java.util.ArrayList;`"
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> a = new ArrayList<>();\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "Without `import java.util.ArrayList;` the name is unknown."
        },
        {
          "question": "What does this print?\n```\nString s = \"Java Code\";\nSystem.out.println(s.length() + \" \" + s.charAt(1) + \" \" + s.indexOf(\"Code\"));\n```",
          "options": [
            "`9 a 6`",
            "`9 a 5`",
            "`8 a 5`",
            "`9 J 5`"
          ],
          "answer": 1,
          "explanation": "The space counts, and indexes start at 0."
        },
        {
          "question": "What does this print?\n```\nString s = \"Programming\";\nSystem.out.println(s.substring(3, 7));\n```",
          "options": [
            "`ogram`",
            "`gram`",
            "`gramm`",
            "`ogra`"
          ],
          "answer": 1,
          "explanation": "`substring(a, b)` runs from `a` up to, but not including, `b`."
        },
        {
          "question": "What does this print?\n```\nString s = \"java\";\ns.toUpperCase();\nSystem.out.println(s);\ns = s.toUpperCase();\nSystem.out.println(s);\n```",
          "options": [
            "```\nJAVA\nJAVA\n```",
            "```\njava\njava\n```",
            "```\nJAVA\njava\n```",
            "```\njava\nJAVA\n```"
          ],
          "answer": 3,
          "explanation": "Strings are immutable. The first result was thrown away."
        },
        {
          "question": "What does this print?\n```\nString a = new String(\"Hi\");\nString b = new String(\"Hi\");\nSystem.out.println((a == b) + \" \" + a.equals(b));\n```",
          "options": [
            "`true true`",
            "`true false`",
            "`false false`",
            "`false true`"
          ],
          "answer": 3,
          "explanation": "`==` compares objects; `equals` compares contents."
        },
        {
          "question": "What is wrong with this code?\n```\nString code = new String(\"COS\");\nif (code == \"COS\") {\n    System.out.println(\"match\");\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 0,
          "explanation": "It compiles, but `==` compares objects, so `match` never prints. Use `equals`."
        },
        {
          "question": "What is wrong with this code?\n```\nString s = \"abc\";\nSystem.out.println(s.length);\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 1,
          "explanation": "For a `String`, `length()` is a method."
        },
        {
          "question": "Which converts the text `\"42\"` to an `int`?",
          "options": [
            "`(int) \"42\"`",
            "`Int.parse(\"42\")`",
            "`Integer.parseInt(\"42\")`",
            "`\"42\".toInt()`"
          ],
          "answer": 2,
          "explanation": "A cast can’t convert text."
        },
        {
          "question": "`Integer.parseInt(\"abc\")` throws",
          "options": [
            "`ArithmeticException`",
            "`NullPointerException`",
            "`NumberFormatException`",
            "`ClassCastException`"
          ],
          "answer": 2,
          "explanation": "The text isn’t a number."
        },
        {
          "question": "What does this print?\n```\nint a = Integer.parseInt(\"20\");\nString b = \"20\";\nSystem.out.println(a + 1);\nSystem.out.println(b + 1);\n```",
          "options": [
            "```\n201\n201\n```",
            "```\n21\n21\n```",
            "```\n201\n21\n```",
            "```\n21\n201\n```"
          ],
          "answer": 3,
          "explanation": "A number adds; text joins."
        },
        {
          "question": "Does this code compile?\n```\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<int> a = new ArrayList<>();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Generics need a class. Use the wrapper `Integer`."
        },
        {
          "question": "How do you get the number of items in an `ArrayList` called `list`?",
          "options": [
            "`list.length`",
            "`list.count`",
            "`list.size()`",
            "`list.length()`"
          ],
          "answer": 2,
          "explanation": "Arrays use `.length`, strings `.length()`, collections `.size()`."
        },
        {
          "question": "What is wrong with this code?\n```\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> a = new ArrayList<>();\n        a.add(\"x\");\n        System.out.println(a[0]);\n    }\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "Square brackets only work on arrays. Use `a.get(0)`."
        },
        {
          "question": "What does this print?\n```\njava.util.ArrayList<String> c = new java.util.ArrayList<>();\nc.add(\"A\");\nc.add(\"B\");\nc.add(1, \"X\");\nc.remove(0);\nSystem.out.println(c + \" \" + c.size());\n```",
          "options": [
            "`[B, X] 2`",
            "`[A, B] 2`",
            "`[A, X, B] 3`",
            "`[X, B] 2`"
          ],
          "answer": 3,
          "explanation": "The insert gives `[A, X, B]`, and removing index 0 shifts the rest left."
        },
        {
          "question": "The main advantage of `ArrayList` over an array is",
          "options": [
            "Its size can grow and shrink",
            "It uses `[]` for access",
            "It needs no `import`",
            "It stores primitives directly"
          ],
          "answer": 0,
          "explanation": "An array’s size is fixed once created."
        },
        {
          "question": "What does this print?\n```\njava.util.Stack<Integer> s = new java.util.Stack<>();\ns.push(1);\ns.push(2);\ns.push(3);\ns.pop();\nSystem.out.println(s.peek() + \" \" + s.size());\n```",
          "options": [
            "`2 2`",
            "`1 2`",
            "`3 2`",
            "`2 3`"
          ],
          "answer": 0,
          "explanation": "Last in, first out: `pop` removes 3, and `peek` looks at 2 without removing it."
        },
        {
          "question": "What does this print?\n```\njava.util.Queue<Integer> q = new java.util.LinkedList<>();\nq.offer(1);\nq.offer(2);\nq.offer(3);\nq.poll();\nSystem.out.println(q.peek() + \" \" + q.size());\n```",
          "options": [
            "`2 2`",
            "`3 2`",
            "`1 2`",
            "`1 3`"
          ],
          "answer": 0,
          "explanation": "First in, first out: `poll` removes 1."
        },
        {
          "question": "A stack is",
          "options": [
            "First in, first out",
            "Last in, first out",
            "Fixed in size",
            "Sorted automatically"
          ],
          "answer": 1,
          "explanation": "Like a pile of plates."
        },
        {
          "question": "Which suits people waiting in line at a bank?",
          "options": [
            "A constant",
            "A queue",
            "A stack",
            "A 2D array"
          ],
          "answer": 1,
          "explanation": "The first to arrive is served first."
        },
        {
          "question": "Which two methods drive an `Iterator` forward?",
          "options": [
            "`start()` and `run()`",
            "`hasNext()` and `next()`",
            "`hasMore()` and `get()`",
            "`size()` and `get()`"
          ],
          "answer": 1,
          "explanation": "`hasNext` asks, and `next` moves on and returns the item."
        },
        {
          "question": "Removing from a list directly during a for-each loop usually throws",
          "options": [
            "`IllegalStateException`",
            "`ConcurrentModificationException`",
            "`NullPointerException`",
            "`ClassCastException`"
          ],
          "answer": 1,
          "explanation": "The hidden iterator notices the list changed behind its back."
        },
        {
          "question": "The safe way to remove elements while looping over a list is",
          "options": [
            "The iterator’s `remove()`",
            "`list.clear()` in the loop",
            "Setting the element to `null`",
            "`list.remove(i)` inside a for-each"
          ],
          "answer": 0,
          "explanation": "`it.remove()` keeps the iterator in step with the list."
        },
        {
          "question": "What does this print?\n```\njava.util.List<Integer> a = new java.util.ArrayList<>(java.util.List.of(1, -2, -3, 4));\nfor (int i = 0; i < a.size(); i++) {\n    if (a.get(i) < 0) a.remove(i);\n}\nSystem.out.println(a);\n```",
          "options": [
            "`[1, 4]`",
            "`[1, -3, 4]`",
            "`[-2, -3]`",
            "`[1, -2, 4]`"
          ],
          "answer": 1,
          "explanation": "After removing index 1, `-3` shifts into that slot and gets skipped. That is the classic indexed-removal bug."
        }
      ]
    },
    {
      "id": "QS008",
      "title": "Exceptions",
      "questions": [
        {
          "question": "An exception is",
          "options": [
            "A kind of loop",
            "A compile error",
            "A class that can’t be used",
            "An object describing a problem while a program runs"
          ],
          "answer": 3,
          "explanation": "If nothing catches it, the program stops."
        },
        {
          "question": "What does this print?\n```\ntry {\n    System.out.print(\"A\");\n    int x = 1 / 0;\n    System.out.print(\"B\");\n} catch (ArithmeticException e) {\n    System.out.print(\"C\");\n} finally {\n    System.out.print(\"D\");\n}\nSystem.out.print(\"E\");\n```",
          "options": [
            "`ACDE`",
            "`ABCDE`",
            "`ACD`",
            "`ACE`"
          ],
          "answer": 0,
          "explanation": "The rest of the `try` is skipped, `finally` always runs, and the program continues."
        },
        {
          "question": "What does this print?\n```\ntry {\n    System.out.print(\"A\");\n} catch (RuntimeException e) {\n    System.out.print(\"B\");\n} finally {\n    System.out.print(\"C\");\n}\n```",
          "options": [
            "`AC`",
            "`ABC`",
            "`A`",
            "`BC`"
          ],
          "answer": 0,
          "explanation": "With no exception, the `catch` is skipped, but `finally` still runs."
        },
        {
          "question": "What does this print?\n```\nstatic int f() {\n    try {\n        return 1;\n    } finally {\n        System.out.print(\"F \");\n    }\n}\n\npublic static void main(String[] args) {\n    System.out.print(f());\n}\n```",
          "options": [
            "`F 1`",
            "`F`",
            "`1`",
            "`1 F`"
          ],
          "answer": 0,
          "explanation": "`finally` runs before the method actually returns."
        },
        {
          "question": "`10 / 0` with `int`s throws",
          "options": [
            "`ArithmeticException`",
            "`NullPointerException`",
            "Nothing: it gives `Infinity`",
            "`NumberFormatException`"
          ],
          "answer": 0,
          "explanation": "Only floating-point division gives `Infinity`."
        },
        {
          "question": "What does this print?\n```\nSystem.out.println(10.0 / 0);\n```",
          "options": [
            "`Infinity`",
            "`NaN`",
            "`10.0`",
            "`0.0`"
          ],
          "answer": 0,
          "explanation": "Floating-point division by zero doesn’t throw."
        },
        {
          "question": "`String s = null; s.length();` throws",
          "options": [
            "`ClassCastException`",
            "`ArrayIndexOutOfBoundsException`",
            "`NullPointerException`",
            "`NumberFormatException`"
          ],
          "answer": 2,
          "explanation": "The reference points at no object."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"x\");\n        } catch (Exception e) {\n        } catch (NumberFormatException e) {\n        }\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "`Exception` already catches everything below it, so the second catch could never run. Specific goes first."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"x\");\n        } catch (NumberFormatException e) {\n        } catch (Exception e) {\n        }\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 1,
          "explanation": "Specific first, then general."
        },
        {
          "question": "What is wrong with this code?\n```\ntry {\n    int n = 1;\n} finaly {\n    System.out.println(\"done\");\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "The keyword is `finally`."
        },
        {
          "question": "Unchecked exceptions are subclasses of",
          "options": [
            "`IOException`",
            "`Error` only",
            "`Object` only",
            "`RuntimeException`"
          ],
          "answer": 3,
          "explanation": "The compiler doesn’t force you to handle them."
        },
        {
          "question": "Which is a checked exception?",
          "options": [
            "`ArithmeticException`",
            "`NullPointerException`",
            "`NumberFormatException`",
            "`IOException`"
          ],
          "answer": 3,
          "explanation": "Checked exceptions must be caught or declared."
        },
        {
          "question": "Does this code compile?\n```\nclass E extends Exception { }\n\nclass A {\n    void f() {\n        throw new E();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`E` is checked. `f` must catch it, or declare `throws E`."
        },
        {
          "question": "Does this code compile?\n```\nclass E extends RuntimeException { }\n\nclass A {\n    void f() {\n        throw new E();\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 1,
          "explanation": "`E` is unchecked, so no declaration is required."
        },
        {
          "question": "`throw` and `throws`: which is true?",
          "options": [
            "`throw` raises an exception; `throws` declares one in a method’s header",
            "They are interchangeable",
            "`throws` raises an exception; `throw` declares one",
            "Both go only in a method’s header"
          ],
          "answer": 0,
          "explanation": "`throw new X();` is an action; `void f() throws X` is a warning label."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic void f(int u) {\n    if (u <= 0) throw IllegalArgumentException(\"Bad\");\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "An exception is an object, so it needs `new`."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic void f(int u) {\n    if (u <= 0) throws new IllegalArgumentException(\"Bad\");\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "In the body, the keyword is `throw`. `throws` belongs in the header."
        },
        {
          "question": "What does this print?\n```\nstatic void c() { throw new IllegalStateException(\"x\"); }\n\nstatic void b() {\n    c();\n    System.out.print(\"B\");\n}\n\npublic static void main(String[] args) {\n    try {\n        b();\n        System.out.print(\"M\");\n    } catch (IllegalStateException e) {\n        System.out.print(e.getMessage());\n    }\n    System.out.print(\"E\");\n}\n```",
          "options": [
            "`BMxE`",
            "`xE`",
            "`xME`",
            "`BxE`"
          ],
          "answer": 1,
          "explanation": "It propagates through `b` and skips everything until the `catch`."
        },
        {
          "question": "When an exception isn’t caught in a method, it",
          "options": [
            "Is ignored",
            "Stops only that line",
            "Travels up to the method that called it",
            "Becomes a compile error"
          ],
          "answer": 2,
          "explanation": "That is propagation. If nothing catches it, the program stops."
        },
        {
          "question": "Which exception suits “a CGPA was requested with too few courses”?",
          "options": [
            "`ArithmeticException`",
            "`IllegalStateException`",
            "`NumberFormatException`",
            "`IOException`"
          ],
          "answer": 1,
          "explanation": "The object isn’t ready. A bad value passed in would be `IllegalArgumentException`."
        },
        {
          "question": "Which exception suits a method being passed a negative credit unit?",
          "options": [
            "`NullPointerException`",
            "`ClassCastException`",
            "`IllegalArgumentException`",
            "`IllegalStateException`"
          ],
          "answer": 2,
          "explanation": "A bad argument was passed in."
        },
        {
          "question": "To write your own checked exception, extend",
          "options": [
            "`Throwable` is required",
            "`RuntimeException`",
            "`Exception`",
            "`Error`"
          ],
          "answer": 2,
          "explanation": "Extending `RuntimeException` would make it unchecked."
        },
        {
          "question": "What does this print?\n```\nclass MyEx extends Exception {\n    MyEx(String m) { super(m); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            throw new MyEx(\"oops\");\n        } catch (MyEx e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}\n```",
          "options": [
            "`MyEx`",
            "`MyEx: oops`",
            "`oops`",
            "`null`"
          ],
          "answer": 2,
          "explanation": "`super(m)` stores the message for `getMessage()`."
        },
        {
          "question": "Is `NumberFormatException` caught by `catch (IllegalArgumentException e)`?",
          "options": [
            "No, they are unrelated",
            "Only with `throws`",
            "Yes, it is a subclass",
            "Only inside `finally`"
          ],
          "answer": 2,
          "explanation": "A catch handles the named class and all its subclasses."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int parse(String s) {\n    try {\n        return Integer.parseInt(s);\n    } catch (NumberFormatException e) {\n    }\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "If the exception is caught, the method reaches its end with no value: “missing return statement”."
        }
      ]
    },
    {
      "id": "QS009",
      "title": "Swing, events and threads",
      "questions": [
        {
          "question": "Which class is the top-level window in Swing?",
          "options": [
            "`JPanel`",
            "`JLabel`",
            "`JFrame`",
            "`Window1`"
          ],
          "answer": 2,
          "explanation": "`JPanel` only groups components inside a window."
        },
        {
          "question": "Swing components like `JButton` are in the package",
          "options": [
            "`java.lang`",
            "`java.util`",
            "`javax.swing`",
            "`java.swing`"
          ],
          "answer": 2,
          "explanation": "Layouts like `FlowLayout` are in `java.awt`."
        },
        {
          "question": "Which component is best for many lines of output?",
          "options": [
            "`JTextArea`",
            "`JLabel`",
            "`JComboBox`",
            "`JTextField`"
          ],
          "answer": 0,
          "explanation": "`JTextField` holds a single line."
        },
        {
          "question": "Which component gives a drop-down list?",
          "options": [
            "`JComboBox`",
            "`JTextArea`",
            "`JFrame`",
            "`JScrollPane`"
          ],
          "answer": 0,
          "explanation": "A fixed list also prevents invalid input."
        },
        {
          "question": "To make a `JTextArea` scroll, you",
          "options": [
            "Set a `FlowLayout`",
            "Call `setScroll(true)`",
            "Use a `JPanel`",
            "Add it inside a `JScrollPane`"
          ],
          "answer": 3,
          "explanation": "`frame.add(new JScrollPane(area));`"
        },
        {
          "question": "Why might a window never appear, with no error at all?",
          "options": [
            "`setVisible(true)` was never called",
            "It has no title",
            "It has no `pack()`",
            "There is no `JPanel`"
          ],
          "answer": 0,
          "explanation": "A frame starts hidden."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        JFrame f = new JFrame(\"Hi\");\n        f.add(new JLabel(\"Hello\"));\n        f.pack();\n        f.setVisible(false);\n    }\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles and runs, but no window ever appears."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\nimport java.awt.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        JFrame f = new JFrame(\"Hi\");\n        f.setLayout(new FlowLayout);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "Creating an object needs brackets: `new FlowLayout()`."
        },
        {
          "question": "What does `JFrame.EXIT_ON_CLOSE` do?",
          "options": [
            "Hides the window only",
            "Saves the window’s state",
            "Ends the program when the window closes",
            "Stops the window from closing"
          ],
          "answer": 2,
          "explanation": "Without it, closing the window leaves the program running."
        },
        {
          "question": "Which layout arranges components left to right, wrapping like text?",
          "options": [
            "`FlowLayout`",
            "`JPanel`",
            "`GridLayout`",
            "`BorderLayout`"
          ],
          "answer": 0,
          "explanation": "It is the default layout of a `JPanel`."
        },
        {
          "question": "`BorderLayout` has which regions?",
          "options": [
            "Rows and columns of equal cells",
            "NORTH, SOUTH, EAST, WEST and CENTER",
            "LEFT, RIGHT and MIDDLE",
            "TOP and BOTTOM only"
          ],
          "answer": 1,
          "explanation": "It is the default layout of a `JFrame`."
        },
        {
          "question": "`new GridLayout(3, 2)` makes",
          "options": [
            "3 rows and 2 columns",
            "6 rows",
            "3 components",
            "2 rows and 3 columns"
          ],
          "answer": 0,
          "explanation": "Rows come first."
        },
        {
          "question": "In event-driven programming, code runs",
          "options": [
            "In response to events like clicks",
            "Before `main`",
            "Only at compile time",
            "Strictly from top to bottom"
          ],
          "answer": 0,
          "explanation": "You register handlers, and Swing calls them."
        },
        {
          "question": "Which interface handles a button click?",
          "options": [
            "`ButtonEvent`",
            "`Comparable`",
            "`Runnable`",
            "`ActionListener`"
          ],
          "answer": 3,
          "explanation": "Its one method is `actionPerformed(ActionEvent e)`."
        },
        {
          "question": "How do you attach a listener to a button `b`?",
          "options": [
            "`b.addActionListener(listener);`",
            "`listener.add(b);`",
            "`b.onClick = listener;`",
            "`b.setListener(listener);`"
          ],
          "answer": 0,
          "explanation": "The button keeps a list of its listeners."
        },
        {
          "question": "Why can a lambda replace an anonymous `ActionListener`?",
          "options": [
            "Swing converts all classes",
            "It is an abstract class",
            "It has no methods",
            "It has exactly one abstract method"
          ],
          "answer": 3,
          "explanation": "That makes it a functional interface."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\n\nclass A {\n    JTextField f = new JTextField();\n    String read() { return f.getText.trim(); }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`getText` is a method, so it needs brackets."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\n\nclass A {\n    JComboBox<String> box = new JComboBox<>(new String[] {\"Card\", \"Cash\"});\n    String pick() {\n        if (\"Cash\".equals(box.getSelectedItem())) return \"Card\";\n        return \"Card\";\n    }\n}\n// Choosing Cash should give \"Cash\".\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but both paths return `Card`."
        },
        {
          "question": "Does this code compile?\n```\nimport javax.swing.*;\n\nclass A {\n    JComboBox<String> box = new JComboBox<>(new String[] {\"A\"});\n    String pick() { return box.getSelectedItem(); }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`getSelectedItem()` returns `Object`, so it needs a cast to `String`."
        },
        {
          "question": "`JOptionPane.showMessageDialog(...)` is used to",
          "options": [
            "Read a file",
            "Show a pop-up message",
            "Close the program",
            "Add a button"
          ],
          "answer": 1,
          "explanation": "Commonly with `JOptionPane.ERROR_MESSAGE` for validation errors."
        },
        {
          "question": "What does `getText()` on a `JTextField` always return?",
          "options": [
            "A `String`",
            "An `Object`",
            "`null` when empty",
            "An `int`, if the text is a number"
          ],
          "answer": 0,
          "explanation": "Convert it with `parseInt` or `parseDouble`. An empty field gives `\"\"`."
        },
        {
          "question": "What does this print? (Assume `main` declares `throws Exception`.)\n```\nThread t = new Thread(() -> System.out.print(Thread.currentThread().getName()), \"w\");\nt.run();\nSystem.out.print(\" \");\nt.start();\nt.join();\n```",
          "options": [
            "`main main`",
            "`w w`",
            "`main w`",
            "`w main`"
          ],
          "answer": 2,
          "explanation": "`run()` is an ordinary call, on `main`. `start()` creates the new thread."
        },
        {
          "question": "Which method makes the current thread wait until `t` finishes?",
          "options": [
            "`t.wait()`",
            "`t.sleep()`",
            "`t.run()`",
            "`t.join()`"
          ],
          "answer": 3,
          "explanation": "`sleep` waits for a fixed time; `join` waits for the thread to end."
        },
        {
          "question": "Two threads running `count++` on a shared field may lose updates because",
          "options": [
            "Java runs only one thread",
            "`int` fields are read-only",
            "Threads can’t share data",
            "`count++` is several steps that can interleave"
          ],
          "answer": 3,
          "explanation": "It is a read, an add and a write. Use `synchronized` to let one thread in at a time."
        },
        {
          "question": "A long download inside `actionPerformed` will",
          "options": [
            "Freeze the window",
            "Close the window",
            "Run on its own thread automatically",
            "Fail to compile"
          ],
          "answer": 0,
          "explanation": "Listeners run on the Event Dispatch Thread, so slow work belongs on another thread."
        }
      ]
    }
  ]
};
