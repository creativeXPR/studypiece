// COS 202 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Code goes between backticks, or triple backticks for a block.

export default {
  "code": "COS 202",
  "updated": "2026-11-08",
  "title": "Advanced Object-Oriented Programming (Java)",
  "sets": [
    {
      "id": "QS001",
      "title": "Java toolkit: types, control flow, arrays and methods",
      "questions": [
        {
          "question": "Where does a Java program start running?",
          "options": [
            "The first line of the file",
            "`public static void main(String[] args)`",
            "The class constructor",
            "The first method in the file"
          ],
          "answer": 1,
          "explanation": "The JVM looks for `main` with exactly that signature. Code is not simply run from the first line of the file; without a matching `main`, nothing starts."
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
          "explanation": "The file name must match a public class exactly, capitals included. `.class` is what the compiler produces. Lowercase `student.java` fails on case-sensitive systems and is rejected by the compiler for a public class."
        },
        {
          "question": "Which of these is not a primitive type?",
          "options": [
            "`int`",
            "`char`",
            "`boolean`",
            "`String`"
          ],
          "answer": 3,
          "explanation": "`String` is a class. The eight primitives are `byte`, `short`, `int`, `long`, `float`, `double`, `char` and `boolean`. It is easy to mistake `String` for a primitive because it is so common, but a String variable holds a reference to an object."
        },
        {
          "question": "What does this print?\n```\nSystem.out.println(7 / 2);\nSystem.out.println(7 % 2);\nSystem.out.println(7 / 2.0);\n```",
          "options": [
            "```\n3\n1\n3.5\n```",
            "```\n3\n1\n3\n```",
            "```\n3.5\n1\n3.5\n```",
            "```\n3\n3\n3.5\n```"
          ],
          "answer": 0,
          "explanation": "Two `int`s give integer division, `%` is the remainder, and one `double` makes the division decimal. The tempting `3` on the last line forgets that `2.0` is a `double`, which turns the whole division into real division."
        },
        {
          "question": "What does this print?\n```\nSystem.out.println(\"a\" + 1 + 2);\nSystem.out.println(1 + 2 + \"a\");\n```",
          "options": [
            "```\na12\n12a\n```",
            "```\na12\n3a\n```",
            "```\na3\n12a\n```",
            "```\na3\n3a\n```"
          ],
          "answer": 1,
          "explanation": "`+` works left to right. Once text is on the left it joins; `1 + 2` is added before any text appears. Many expect `a3`, but `\"a\" + 1` is already text, so the 2 is joined on rather than added."
        },
        {
          "question": "What does this print?\n```\nint x = 5;\nint y = x++;\nint z = ++x;\nSystem.out.println(x + \" \" + y + \" \" + z);\n```",
          "options": [
            "`7 6 7`",
            "`6 5 6`",
            "`7 5 7`",
            "`7 5 6`"
          ],
          "answer": 2,
          "explanation": "`x++` uses the old value (5), then adds one. `++x` adds first, so `z` is 7. The tempting `7 6 7` assumes `x++` gives the new value; postfix hands back the value from before the increment."
        },
        {
          "question": "What is wrong with this code?\n```\nint x = 5\nSystem.out.println(x);\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "The first statement has no `;`, so the code won’t compile. A missing semicolon is caught by the compiler, which is exactly what makes it a syntax error rather than a semantic one."
        },
        {
          "question": "What is wrong with this code?\n```\nint total = 0;\nfor (int i = 1; i < 10; i++) {\n    total += i;\n}\n// total should be the sum of 1 to 10\nSystem.out.println(total);\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles, but `i < 10` stops at 9. Summing up to 10 needs `i <= 10`. Nothing is reported by the compiler, which is why off-by-one mistakes count as semantic errors."
        },
        {
          "question": "What is wrong with this code?\n```\nint x = 5;\nif (x = 5) {\n    System.out.println(\"five\");\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "`=` assigns, and an `int` isn’t a `boolean`, so an `if` won’t accept it. Comparison uses `==`. In some languages `if (x = 5)` compiles; Java refuses because the condition must be a `boolean`."
        },
        {
          "question": "What does this print?\n```\nint day = 2;\nswitch (day) {\n    case 1: System.out.print(\"A\");\n    case 2: System.out.print(\"B\");\n    case 3: System.out.print(\"C\");\n        break;\n    case 4: System.out.print(\"D\");\n}\n```",
          "options": [
            "`B`",
            "`BCD`",
            "`ABC`",
            "`BC`"
          ],
          "answer": 3,
          "explanation": "It jumps to `case 2` and falls through until the `break`. `B` alone would need a `break` after `case 2`; and the `break` after C stops it reaching D."
        },
        {
          "question": "What does this print?\n```\nint i = 0;\nwhile (i < 3) {\n    System.out.print(i);\n    i++;\n}\nSystem.out.print(i);\n```",
          "options": [
            "`012`",
            "`123`",
            "`01233`",
            "`0123`"
          ],
          "answer": 3,
          "explanation": "The loop prints 0, 1, 2. It ends with `i` at 3, which the last line prints. The tempting `012` forgets the final `print(i)` after the loop, when `i` has become 3."
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
          "explanation": "A `do`-`while` tests its condition after the body, so the body always runs once. A plain `while (i < 5)` would print nothing here; do-while is the loop that always runs once."
        },
        {
          "question": "What does this print?\n```\nfor (int i = 0; i < 3; i++) {\n    if (i == 1) continue;\n    System.out.print(i);\n}\n```",
          "options": [
            "`0`",
            "`02`",
            "`012`",
            "`01`"
          ],
          "answer": 1,
          "explanation": "`continue` skips the rest of this pass only; `break` would leave the loop. `01` would be what `break` gives, since it leaves the loop entirely at `i == 1`."
        },
        {
          "question": "`int[] a = new int[5];` What is the index of the last element?",
          "options": [
            "`6`",
            "`5`",
            "`4`",
            "`a.length`"
          ],
          "answer": 2,
          "explanation": "Indexes run from `0` to `length - 1`. `a.length` (5) is one past the end; using it as an index throws `ArrayIndexOutOfBoundsException`."
        },
        {
          "question": "What are the elements of `new boolean[3]` at the start?",
          "options": [
            "All `null`",
            "Undefined until set",
            "All `true`",
            "All `false`"
          ],
          "answer": 3,
          "explanation": "`new` fills arrays with defaults: `0` for numbers, `false` for `boolean`, `null` for objects. `null` is the default only for arrays of objects such as `String[]`."
        },
        {
          "question": "What does this print?\n```\nint[] a = {1, 2, 3};\nint[] b = a;\nb[0] = 9;\nSystem.out.println(a[0] + \" \" + a.length);\n```",
          "options": [
            "`9 3`",
            "`9 2`",
            "`1 3`",
            "`1 2`"
          ],
          "answer": 0,
          "explanation": "`b = a` copies the reference, so both names share one array. `1 3` would need a real copy, made with `a.clone()` or `Arrays.copyOf`."
        },
        {
          "question": "Does this code compile?\n```\nint[] a = {1, 2, 3};\nSystem.out.println(a.length());\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Arrays have a `length` field, with no brackets. `length()` is for `String`. Mixing up `length` (arrays), `length()` (Strings) and `size()` (collections) is a favourite exam trap."
        },
        {
          "question": "What is wrong with this code?\n```\nint[] a = {1, 2, 3};\nfor (int i = 0; i <= a.length; i++) {\n    System.out.println(a[i]);\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 0,
          "explanation": "It compiles, but `i` reaches 3, which throws `ArrayIndexOutOfBoundsException`. Use `<`. The compiler can’t know the index will run past the end, so the mistake only appears when it runs."
        },
        {
          "question": "What does this print?\n```\nint[][] m = { {1, 2, 3}, {4, 5, 6} };\nSystem.out.println(m.length + \" \" + m[0].length + \" \" + m[1][0]);\n```",
          "options": [
            "`3 2 4`",
            "`2 3 2`",
            "`6 3 4`",
            "`2 3 4`"
          ],
          "answer": 3,
          "explanation": "2 rows, 3 columns, and row 1 column 0 is `4`. `3 2 4` swaps rows and columns: `m.length` counts the rows."
        },
        {
          "question": "How many elements does `new int[3][5][7]` hold?",
          "options": [
            "15",
            "21",
            "105",
            "35"
          ],
          "answer": 2,
          "explanation": "The total size is the product of the dimensions: 3 × 5 × 7. 35 multiplies only the last two dimensions; every one of the 3 × 5 rows has 7 slots."
        },
        {
          "question": "What does this print?\n```\nstatic void add(int x, int[] a) {\n    x = 100;\n    a[0] = 100;\n}\n\npublic static void main(String[] args) {\n    int x = 1;\n    int[] a = {1};\n    add(x, a);\n    System.out.println(x + \" \" + a[0]);\n}\n```",
          "options": [
            "`100 100`",
            "`1 100`",
            "`1 1`",
            "`100 1`"
          ],
          "answer": 1,
          "explanation": "Java copies arguments. The `int` copy changes alone, but the array reference still points at the same array. `100 100` assumes Java passes the int by reference; only the array, an object, is shared."
        },
        {
          "question": "In `static int add(int x, int y)`, what are `x` and `y`?",
          "options": [
            "Fields",
            "Return values",
            "Parameters",
            "Arguments"
          ],
          "answer": 2,
          "explanation": "Parameters are in the definition. Arguments are the values passed in a call, like `add(5, 3)`. “Arguments” is the tempting wrong answer: those are the actual values in a call."
        },
        {
          "question": "Does this code compile?\n```\nstatic void show() {\n    return 5;\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A `void` method can’t return a value. Remove the 5 (`return;`) or change `void` to `int` to make it compile."
        },
        {
          "question": "Does this code compile?\n```\nstatic int f(int x) { return x; }\nstatic double f(int x) { return x; }\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "Overloads must differ in their parameters. A different return type alone isn’t enough. At a call like `f(3)` Java couldn’t tell which version you meant, so it forbids the pair."
        },
        {
          "question": "What does this print?\n```\nstatic String f(int x) { return \"int\"; }\nstatic String f(double x) { return \"double\"; }\nstatic String f(String x) { return \"String\"; }\n\npublic static void main(String[] args) {\n    System.out.println(f(1) + f(1.0) + f(\"1\"));\n}\n```",
          "options": [
            "`doubledoubleString`",
            "`intdoubleint`",
            "`intintString`",
            "`intdoubleString`"
          ],
          "answer": 3,
          "explanation": "Overloading is resolved at compile time from the arguments’ types. `1` is an int literal and `1.0` a double literal, so each call matches its exact type."
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
            "A loop",
            "A base case that stops the calls",
            "Two parameters",
            "A `static` modifier"
          ],
          "answer": 1,
          "explanation": "Without a base case the calls never end, and Java throws `StackOverflowError`. A loop isn’t needed at all: the repeated calls do the repeating."
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
          "explanation": "It compiles, so it is a semantic error. The call stack eventually runs out of space. It is tempting to expect a compile error, but the compiler doesn’t check whether recursion ends."
        },
        {
          "question": "What does this print?\n```\nstatic int sum(int k) {\n    if (k > 0) return k + sum(k - 1);\n    return 0;\n}\n\npublic static void main(String[] args) {\n    System.out.println(sum(5));\n}\n```",
          "options": [
            "`5`",
            "`10`",
            "`0`",
            "`15`"
          ],
          "answer": 3,
          "explanation": "`5 + 4 + 3 + 2 + 1 + 0`. `10` forgets the first call, which contributes the 5 itself."
        },
        {
          "question": "What does this print?\n```\nstatic int f(int n) {\n    if (n <= 1) return 1;\n    return n * f(n - 1);\n}\n\npublic static void main(String[] args) {\n    System.out.println(f(4));\n}\n```",
          "options": [
            "`24`",
            "`4`",
            "`10`",
            "`16`"
          ],
          "answer": 0,
          "explanation": "This is factorial: 4 × 3 × 2 × 1. `10` would be 4 + 3 + 2 + 1; the method multiplies."
        },
        {
          "question": "What does this print?\n```\nstatic int fib(int n) {\n    if (n <= 1) return n;\n    return fib(n - 1) + fib(n - 2);\n}\n\npublic static void main(String[] args) {\n    System.out.println(fib(7));\n}\n```",
          "options": [
            "`21`",
            "`13`",
            "`8`",
            "`7`"
          ],
          "answer": 1,
          "explanation": "The sequence is 0, 1, 1, 2, 3, 5, 8, 13, and index 7 is 13. `21` is index 8; counting from `fib(0) = 0` puts 13 at index 7."
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
          "explanation": "The print comes before the call, so values appear on the way down. `3210` would need the base case to print too, but it returns before printing."
        },
        {
          "question": "What does this print?\n```\nstatic void go(int n) {\n    if (n == 0) return;\n    go(n - 1);\n    System.out.print(n);\n}\n\npublic static void main(String[] args) {\n    go(3);\n}\n```",
          "options": [
            "`3`",
            "`321`",
            "`0123`",
            "`123`"
          ],
          "answer": 3,
          "explanation": "The print comes after the call, so it waits, and values appear on the way back up. Each call finishes only after its inner call returns, so the deepest (1) prints first."
        },
        {
          "question": "What does this print?\n```\nstatic void go(int n) {\n    if (n == 0) return;\n    System.out.print(n);\n    go(n - 1);\n    System.out.print(n);\n}\n\npublic static void main(String[] args) {\n    go(2);\n}\n```",
          "options": [
            "`2112`",
            "`2121`",
            "`1221`",
            "`212`"
          ],
          "answer": 0,
          "explanation": "Down: 2, 1. Back up, deepest first: 1, 2. `212` misses that each call prints twice: once before and once after the recursive call."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int fact(int n) {\n    return n * fact(n - 1);\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but there is no base case, so calling it overflows the stack. Calling `fact(3)` goes 3, 2, 1, 0, -1 … and never stops, because nothing says “stop at 1”."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int sum(int k) {\n    if (k == 0) return 0;\n    return k + sum(k + 1);\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles, but `k + 1` moves away from the base case. It must be `k - 1`. Each call should get closer to the base case; here `k` grows forever until the stack overflows."
        },
        {
          "question": "While a recursive call is running, the calling method is",
          "options": [
            "Copied to a new thread",
            "Running at the same time",
            "Finished and removed",
            "Suspended on the call stack, waiting for the result"
          ],
          "answer": 3,
          "explanation": "Each call waits on the stack, and results combine on the way back. Recursion is not parallel: only the newest call is active, and the others wait."
        },
        {
          "question": "Binary search only works when the data is",
          "options": [
            "Sorted",
            "All positive",
            "Unsorted",
            "Stored in a `String`"
          ],
          "answer": 0,
          "explanation": "It discards half the range based on order, so the order must be there. On unsorted data it can throw away the half that contains the answer."
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
          "explanation": "It halves the range each time, and 2 to the power of 20 is about a million. One million comparisons is the worst case for linear search, not binary search."
        },
        {
          "question": "The worst case for linear search on `n` items is",
          "options": [
            "1 comparison",
            "About `log₂ n` comparisons",
            "`n` comparisons",
            "`n / 2` comparisons"
          ],
          "answer": 2,
          "explanation": "The key may be last, or missing, so every element gets checked. `n / 2` is the average when the key is present; the worst case checks everything."
        },
        {
          "question": "Binary search is an example of which approach?",
          "options": [
            "Polymorphism",
            "Inheritance",
            "Brute force",
            "Divide and conquer"
          ],
          "answer": 3,
          "explanation": "It splits the problem and continues on one part. Brute force would mean checking every item, which is what linear search does."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int find(int[] a, int key) {\n    int low = 0, high = a.length - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (a[mid] == key) return mid;\n        if (a[mid] < key) low = mid;\n        else high = mid - 1;\n    }\n    return -1;\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "`low = mid` can leave the range unchanged, looping forever. It must be `low = mid + 1`. For example, with `low = 3` and `high = 4`, `mid` is 3 again and again."
        },
        {
          "question": "What does this print?\n```\nint[] a = {2, 4, 6, 8, 10};\nint low = 0, high = 4, steps = 0;\nwhile (low <= high) {\n    int mid = (low + high) / 2;\n    steps++;\n    if (a[mid] == 8) break;\n    if (a[mid] < 8) low = mid + 1;\n    else high = mid - 1;\n}\nSystem.out.println(steps);\n```",
          "options": [
            "`2`",
            "`3`",
            "`1`",
            "`4`"
          ],
          "answer": 0,
          "explanation": "First the middle is 6, too small. Then the range is 8 and 10; its middle is 8. Only two comparisons are needed, which is why `3` and `4` overcount."
        },
        {
          "question": "After pass `i` of selection sort,",
          "options": [
            "Only neighbours have been compared",
            "The whole array is sorted",
            "The first `i` elements are the `i` smallest, in order",
            "The last `i` elements are sorted"
          ],
          "answer": 2,
          "explanation": "Each pass places the smallest remaining element at the front of the unsorted part. The whole array is only guaranteed sorted after the final pass."
        },
        {
          "question": "How many passes does selection sort need for `n` elements?",
          "options": [
            "`n + 1`",
            "`n`",
            "`2n`",
            "`n - 1`"
          ],
          "answer": 3,
          "explanation": "Once all but one are placed, the last is in place too. `n` passes would waste one: when only one element is left, it is already in place."
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
          "explanation": "Two passes: 1 swaps with 5, then 2 is already in place. `[1, 2, 5, 8]` is the fully sorted array, which would need a third pass."
        },
        {
          "question": "Which sort repeatedly swaps neighbouring elements that are out of order?",
          "options": [
            "Selection sort",
            "Bubble sort",
            "Insertion sort",
            "Binary sort"
          ],
          "answer": 1,
          "explanation": "The largest “bubbles” to the end on each pass. Selection sort swaps once per pass, from wherever the minimum is, not between neighbours."
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
          "explanation": "Each new element slides back into place among those already sorted. Selection sort instead scans for the smallest card each time."
        },
        {
          "question": "What is wrong with this code?\n```\nint[] a = {3, 1};\nint t = a[0];\na[0] = a[1];\na[1] = a[0];\nSystem.out.println(a[0] + \" \" + a[1]);\n// should print 1 3\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles, but `a[0]` was already overwritten. The last assignment should use the saved `t`. After `a[0] = a[1]`, both slots hold 1, so the code prints `1 1`."
        },
        {
          "question": "What does this print?\n```\nint[] a = {3, 1, 2};\nfor (int i = 0; i < a.length - 1; i++) {\n    if (a[i] > a[i + 1]) {\n        int t = a[i]; a[i] = a[i + 1]; a[i + 1] = t;\n    }\n}\nSystem.out.println(java.util.Arrays.toString(a));\n```",
          "options": [
            "`[3, 1, 2]`",
            "`[1, 3, 2]`",
            "`[2, 1, 3]`",
            "`[1, 2, 3]`"
          ],
          "answer": 3,
          "explanation": "One bubble pass carries 3 to the end, which happens to finish this short array. A single bubble pass doesn’t always sort; `[3, 2, 1]` would still be unsorted after it."
        },
        {
          "question": "To swap two array elements safely you need",
          "options": [
            "A second array",
            "A temporary variable",
            "A loop",
            "A `final` variable"
          ],
          "answer": 1,
          "explanation": "Save one value first: `int t = a[i]; a[i] = a[j]; a[j] = t;`. Without the temporary, the first assignment destroys the value you still need."
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
            "A blueprint for creating objects",
            "A running program",
            "A kind of variable",
            "An instance of an object"
          ],
          "answer": 0,
          "explanation": "An object is an instance built from that blueprint. “An instance of an object” is backwards: objects are instances of classes."
        },
        {
          "question": "An object has state, behaviour and",
          "options": [
            "Inheritance",
            "A constructor",
            "A package",
            "Identity"
          ],
          "answer": 3,
          "explanation": "Identity means it is its own object, even if another holds the same values. A constructor builds an object, but it isn’t one of the three things every object has."
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
          "explanation": "`new` allocates the object, runs a constructor and gives back a reference. `this` refers to an object that already exists; it never creates one."
        },
        {
          "question": "What does this print?\n```\nclass Car {\n    int speed;\n    String name;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n        System.out.println(c.speed + \" \" + c.name);\n    }\n}\n```",
          "options": [
            "`0 null`",
            "`null null`",
            "` `",
            "`0 `"
          ],
          "answer": 0,
          "explanation": "Fields get default values: `0` for numbers, `null` for references. `null null` is wrong because an `int` field can’t be null; it defaults to 0."
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
          "explanation": "`b = a` copies the reference, while `c` is a separate object. `80 true true` assumes `new` reuses objects, but every `new` makes a separate one."
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
          "explanation": "The reference points at no object, so there is nothing to call the method on. It is a runtime exception, so the compiler won’t warn you."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Book {\n    String title;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b;\n        b = null;\n        b.title = \"Java\";\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but `b` is `null`, so the assignment throws `NullPointerException`. Declaring `Book b` doesn’t create a Book; only `new Book()` would."
        },
        {
          "question": "A constructor must have",
          "options": [
            "The class’s name and no return type",
            "A `void` return type",
            "At least one parameter",
            "The `static` modifier"
          ],
          "answer": 0,
          "explanation": "Add a return type, even `void`, and it becomes an ordinary method. `void` is the tempting choice, but adding any return type turns it into a method."
        },
        {
          "question": "Does this code compile?\n```\nclass Car {\n    int year;\n    Car(int year) { this.year = year; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Once you write any constructor, Java stops supplying the default one, so `new Car()` has nothing to call. Adding `Car() { }` yourself would make `new Car()` legal again."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Car {\n    int year;\n    void Car(int year) { this.year = year; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Car c = new Car(2024);\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`void Car` is a method, not a constructor, so `new Car(2024)` matches nothing and won’t compile. The class does compile; only the `new Car(2024)` line fails, which still makes the program a syntax error."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    int x;\n    A(int x) { x = x; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new A(5).x);\n    }\n}\n```",
          "options": [
            "`5`",
            "`1`",
            "`null`",
            "`0`"
          ],
          "answer": 3,
          "explanation": "`x = x` assigns the parameter to itself. The field keeps its default. Fix it with `this.x = x;`."
        },
        {
          "question": "In a constructor, `this.name = name;` means",
          "options": [
            "Set this object’s field to the parameter’s value",
            "Call the parent’s constructor",
            "Create a new object",
            "Set the parameter to the field’s value"
          ],
          "answer": 0,
          "explanation": "`this.name` is the field, and plain `name` is the parameter hiding it. The reverse direction, field into parameter, is the classic mix-up."
        },
        {
          "question": "What does a copy constructor do?",
          "options": [
            "Copies a class",
            "Returns the same object",
            "Builds a new object from an existing one’s values",
            "Duplicates a reference only"
          ],
          "answer": 2,
          "explanation": "For example `Point(Point p) { x = p.x; y = p.y; }`. Simply writing `Point b = a;` would copy only the reference, not the values."
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
          "explanation": "Only code inside the class can then create objects. Singletons and utility classes use this so that objects can be made only in controlled ways."
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
          "explanation": "`this(7)` calls the other constructor of the same class. `0` would be the default value if `this(7)` didn’t pass 7 on."
        },
        {
          "question": "Does this code compile?\n```\nclass P {\n    int v;\n    P() {\n        v = 1;\n        this(7);\n    }\n    P(int v) { this.v = v; }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "`this(...)` must be the first statement of a constructor. Moving `this(7)` to the top makes it compile."
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
          "explanation": "Private fields plus public getters and setters, where rules can be enforced. Inheriting from a class is inheritance, a different pillar of OOP."
        },
        {
          "question": "Which is the correct getter for a private `int age`?",
          "options": [
            "`public int getAge(int age) { age = age; }`",
            "`private int age() { return this; }`",
            "`public int getAge() { return age; }`",
            "`public void getAge() { return age; }`"
          ],
          "answer": 2,
          "explanation": "A getter is public, returns the field’s type, and takes nothing. A getter taking a parameter, or returning `void`, can’t hand back the field."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Course {\n    private int unit;\n    public void setUnit(int unit) {\n        unit = unit;\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 1,
          "explanation": "It compiles, but it assigns the parameter to itself. It must be `this.unit = unit;`. The private field silently stays 0, so the bug only shows in wrong results."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Course {\n    private int unit;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Course c = new Course();\n        c.unit = 3;\n    }\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`unit` is private, so another class can’t use it. It needs a public setter. Access is checked at compile time, so the code never gets as far as running."
        },
        {
          "question": "What is the main benefit of a setter over a public field?",
          "options": [
            "It can validate the value before storing it",
            "It makes the field static",
            "It uses less memory",
            "It runs faster"
          ],
          "answer": 0,
          "explanation": "A public field accepts any value; a setter can throw on a bad one. Speed and memory are almost the same either way; control is the point."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Course {\n    private int unit;\n    public void setUnit(int unit) {\n        if (unit < 0) throw new IllegalArgumentException(\"Bad unit\");\n        this.unit = unit;\n    }\n}\n// A unit must be positive.\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 1,
          "explanation": "It compiles, but `0` gets through. A positive unit needs `unit <= 0` as the rejection test. A value of 0 passes `unit < 0`, so this rule lets an invalid unit through."
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
          "explanation": "`return this` hands back the same object, so the calls chain. Without `return this`, each `add` would have nothing to call `.add` on."
        },
        {
          "question": "What does this print?\n```\nclass S {\n    String name;\n    S(String n) { name = n; }\n    @Override public String toString() { return \"S:\" + name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new S(\"Ada\"));\n    }\n}\n```",
          "options": [
            "`S:Ada`",
            "`S@1`",
            "`Ada`",
            "`S`"
          ],
          "answer": 0,
          "explanation": "`println` calls `toString()` on an object automatically. Without the override, it would print something like `S@1b6d3586`."
        },
        {
          "question": "Is there an error here?\n```\nclass S {\n    String name;\n    S(String name) { this.name = name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        S a = new S(\"Ada\");\n        S b = new S(\"Ada\");\n        System.out.println(a == b);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 2,
          "explanation": "It is legal and it prints `false`: `==` asks whether they are the same object, which they aren’t. Nothing here claims otherwise. Comparing contents would need an `equals` method in `S`."
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
          "explanation": "`public` has no limits. `protected` still blocks classes in other packages unless they are subclasses."
        },
        {
          "question": "`private` members can be used",
          "options": [
            "Anywhere",
            "Inside the same package",
            "Only inside their own class",
            "In subclasses only"
          ],
          "answer": 2,
          "explanation": "`private` stops at the class boundary. Even subclasses can’t touch a parent’s private members directly."
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
          "explanation": "That is default (package) access. It is easy to think “no modifier” means public, but it limits access to the package."
        },
        {
          "question": "`protected` allows access from",
          "options": [
            "The same package, and subclasses anywhere",
            "Only the same class",
            "Only subclasses in the same package",
            "Every class"
          ],
          "answer": 0,
          "explanation": "It is default access plus subclasses. It is wider than default access because subclasses in other packages get in too."
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
          "explanation": "`protected` is wider than default because it adds subclasses. Putting default above `protected` is the usual slip."
        },
        {
          "question": "Does this code compile?\n```\npublic class A { }\npublic class B { }\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "One file can hold only one public top-level class, named after the file. Move one class to its own file, or drop `public` from one of them."
        },
        {
          "question": "What is wrong with this code?\n```\nclass P {\n    private int age = 30;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new P().age);\n    }\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 1,
          "explanation": "“age has private access in P”: this won’t compile. Main needs a public getter, such as `getAge()`, to read it."
        },
        {
          "question": "Is there an error here?\n```\npublic class Main {\n    private int age = 30;\n\n    public static void main(String[] args) {\n        System.out.println(new Main().age);\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 2,
          "explanation": "This `main` is inside the same class as the field, so `private` allows it. Private limits code to the same class, and `main` is inside `Main`."
        },
        {
          "question": "A `final` variable",
          "options": [
            "Can’t be read",
            "Must be private",
            "Is shared by all objects",
            "Can’t be reassigned"
          ],
          "answer": 3,
          "explanation": "`final` locks the value once it is set. Being shared by all objects is what `static` means, not `final`."
        },
        {
          "question": "A `final` class",
          "options": [
            "Must be abstract",
            "Can’t be instantiated",
            "Can’t be inherited from",
            "Has only final fields"
          ],
          "answer": 2,
          "explanation": "It can still be created with `new`; it just can’t have subclasses. “Can’t be instantiated” describes `abstract`, not `final`."
        },
        {
          "question": "A `final` method",
          "options": [
            "Must be static",
            "Can’t be called",
            "Can’t have parameters",
            "Can’t be overridden"
          ],
          "answer": 3,
          "explanation": "Subclasses inherit it, but can’t replace it. It can still be called and inherited; only replacing it is forbidden."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    final int x = 10;\n\n    public static void main(String[] args) {\n        Main m = new Main();\n        m.x = 50;\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "You can’t assign a value to a `final` variable. A `final` field can be set once, in its declaration or in a constructor."
        },
        {
          "question": "Does this code compile?\n```\nfinal class A { }\nclass B extends A { }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "A `final` class can’t be extended. `String` is a famous final class for exactly this reason."
        },
        {
          "question": "Does this code compile?\n```\nclass A {\n    final void f() { }\n}\n\nclass B extends A {\n    void f() { }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A `final` method can’t be overridden. Remove `final` from A, or rename B’s method, to make it compile."
        },
        {
          "question": "Does this code compile?\n```\nabstract final class A { }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`abstract` needs a subclass and `final` forbids one, so they can’t be combined. An abstract class only makes sense if something can extend it."
        },
        {
          "question": "A `static` field is",
          "options": [
            "Copied into each object",
            "Impossible to change",
            "Shared by all objects of the class",
            "Always private"
          ],
          "answer": 2,
          "explanation": "There is one copy, belonging to the class. “Copied into each object” describes instance fields."
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
          "explanation": "`n` is shared and reaches 3. Each object has its own `m`. `3 3` would need `m` to be static too; each new C starts its own `m` at 0."
        },
        {
          "question": "What is wrong with this code?\n```\npublic class Main {\n    int count = 0;\n\n    public static void main(String[] args) {\n        count = 5;\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "`main` is static, so it has no object. It can’t use the instance field `count` directly. Create an object (`new Main().count = 5`) or make `count` static."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    static void hello() { System.out.println(\"hi\"); }\n\n    public static void main(String[] args) {\n        hello();\n        Main.hello();\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 1,
          "explanation": "A static method can be called directly, or through the class’s name, with no object. Both calls compile and print “hi”."
        },
        {
          "question": "Why can you call `Math.sqrt(9)` without `new Math()`?",
          "options": [
            "`Math` is abstract",
            "`Math` is an interface",
            "`sqrt` is a static method",
            "`sqrt` is private"
          ],
          "answer": 2,
          "explanation": "Static methods belong to the class. Math’s constructor is in fact private, so `new Math()` wouldn’t even compile."
        },
        {
          "question": "A typical constant is declared as",
          "options": [
            "`public abstract double PI = 3.14;`",
            "`private double PI = 3.14;`",
            "`final static void PI = 3.14;`",
            "`public static final double PI = 3.14;`"
          ],
          "answer": 3,
          "explanation": "Shared by everyone (`static`), and never changing (`final`). Constants are written in capitals by convention."
        },
        {
          "question": "`abstract` on a method means",
          "options": [
            "It is final",
            "It runs automatically",
            "It has no body, and a subclass supplies one",
            "It can’t be called"
          ],
          "answer": 2,
          "explanation": "For example `abstract void run();`. A class with an abstract method must itself be abstract."
        },
        {
          "question": "Which modifier makes a field skipped when an object is serialized?",
          "options": [
            "`synchronized`",
            "`static final`",
            "`volatile`",
            "`transient`"
          ],
          "answer": 3,
          "explanation": "`transient` fields aren’t saved with the object. It is used for fields such as passwords or caches that shouldn’t be stored."
        },
        {
          "question": "Which modifier lets only one thread at a time run a method on an object?",
          "options": [
            "`synchronized`",
            "`final`",
            "`volatile`",
            "`transient`"
          ],
          "answer": 0,
          "explanation": "It takes the object’s lock. `volatile` only makes a variable’s latest value visible; it doesn’t make threads take turns."
        },
        {
          "question": "Which modifier means a value is never cached per thread, and always read from main memory?",
          "options": [
            "`transient`",
            "`volatile`",
            "`synchronized`",
            "`abstract`"
          ],
          "answer": 1,
          "explanation": "That is the definition of `volatile`. `synchronized` is the tempting answer, but it controls which thread runs a block, not how a single variable is read."
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
            "`extends`",
            "`inherits`",
            "`super`"
          ],
          "answer": 1,
          "explanation": "`class Dog extends Animal`. `implements` is for interfaces, and `inherits` isn’t a Java keyword."
        },
        {
          "question": "Inheritance represents which relationship?",
          "options": [
            "PART-OF",
            "HAS-A",
            "IS-A",
            "USES-A"
          ],
          "answer": 2,
          "explanation": "A `Dog` IS-A `Animal`. HAS-A describes composition: a Student HAS-A list of courses."
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
          "explanation": "It is a chain of classes. Hierarchical would be several classes sharing one parent, not a chain."
        },
        {
          "question": "`Car extends Vehicle` and `Bus extends Vehicle` is",
          "options": [
            "Hierarchical inheritance",
            "Multiple inheritance",
            "Hybrid inheritance",
            "Multilevel inheritance"
          ],
          "answer": 0,
          "explanation": "Many subclasses share one superclass. Multilevel would be a chain; here two classes share one parent."
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
          "explanation": "A class can implement many interfaces, but extend only one class. Interfaces are the way round the diamond problem that `extends A, B` would cause."
        },
        {
          "question": "Does this code compile?\n```\nclass A { }\nclass B { }\nclass C extends A, B { }\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A class can extend only one class, which avoids the diamond problem. Make B an interface and write `class C extends A implements B`."
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
          "explanation": "It mixes class inheritance and interfaces. Single inheritance alone would have no interface involved."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    A() { System.out.print(\"A\"); }\n}\n\nclass B extends A {\n    B() { System.out.print(\"B\"); }\n}\n\nclass C extends B {\n    C() { System.out.print(\"C\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new C();\n    }\n}\n```",
          "options": [
            "`C`",
            "`AC`",
            "`ABC`",
            "`CBA`"
          ],
          "answer": 2,
          "explanation": "Each constructor calls its parent’s first, so the top of the chain finishes first. `CBA` is the tempting order, but each constructor’s first job is to call its parent’s."
        },
        {
          "question": "Does this code compile?\n```\nclass P {\n    P(String n) { }\n}\n\nclass C extends P {\n    C() { }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Java inserts `super()`, but `P` has no no-argument constructor. `C` must call `super(\"...\")`. Fix it with `C() { super(\"default\"); }`."
        },
        {
          "question": "What is wrong with this code?\n```\nclass P {\n    P(String n) { }\n}\n\nclass C extends P {\n    int age;\n    C(String n, int a) {\n        age = a;\n        super(n);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "`super(...)` must be the first statement of a constructor. Swap the two lines so `super(n)` comes first."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Person { }\n\nclass Student extend Person { }\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "The keyword is `extends`. One missing letter turns a keyword into an unknown word."
        },
        {
          "question": "What does this print?\n```\nclass A {\n    String f() { return \"A\"; }\n}\n\nclass B extends A {\n    @Override\n    String f() { return super.f() + \"B\"; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new B().f());\n    }\n}\n```",
          "options": [
            "`B`",
            "`A`",
            "`BA`",
            "`AB`"
          ],
          "answer": 3,
          "explanation": "`super.f()` calls the parent’s version first. `B` alone would be printed if the override didn’t call `super.f()`."
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
          "explanation": "It inherits them, but must reach them through the parent’s public methods. Protected and public members are directly usable in subclasses."
        },
        {
          "question": "What is wrong with this code?\n```\nclass P {\n    private String name = \"x\";\n}\n\nclass C extends P {\n    String show() { return name; }\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`name` is private to `P`, even for a subclass. Making `name` protected, or adding a public getter, fixes it."
        },
        {
          "question": "Overriding means a subclass",
          "options": [
            "Calls the parent’s constructor",
            "Adds a method with different parameters",
            "Hides a private field",
            "Redefines a parent’s method with the same signature"
          ],
          "answer": 3,
          "explanation": "Different parameters would be overloading. Adding a method with different parameters is overloading."
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
          "explanation": "The object’s real type decides. Overloading is resolved at compile time. The compiler only checks that the method exists; which version runs is settled when it runs."
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
          "explanation": "It is optional, but it catches typos. Overriding works without it; the annotation just guards against mistakes."
        },
        {
          "question": "Does this code compile?\n```\nclass A {\n    void run() { }\n}\n\nclass B extends A {\n    @Override\n    void Run() { }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "`Run` isn’t `run`, so it overrides nothing, and `@Override` reports it. Without `@Override` it would compile, quietly adding a new method called `Run`."
        },
        {
          "question": "What does this print?\n```\nclass Animal {\n    String sound() { return \"...\"; }\n}\n\nclass Dog extends Animal {\n    @Override\n    String sound() { return \"Bark\"; }\n}\n\nclass Cat extends Animal { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal[] pets = { new Dog(), new Cat() };\n        for (Animal p : pets) System.out.print(p.sound() + \" \");\n    }\n}\n```",
          "options": [
            "`Bark`",
            "`... ...`",
            "`Bark Meow`",
            "`Bark ...`"
          ],
          "answer": 3,
          "explanation": "The object decides, and `Cat` inherits the parent’s version. `Bark Meow` invents a method Cat never defined."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Animal { }\n\nclass Dog extends Animal {\n    void bark() { }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.bark();\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "The variable’s type decides what you may call, and `Animal` has no `bark`. It needs a cast. Writing `((Dog) a).bark()` compiles, because the cast promises the object is a Dog."
        },
        {
          "question": "Does this code compile?\n```\nclass Animal { }\n\nclass Dog extends Animal { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Dog d = new Animal();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Every Dog is an Animal, but not every Animal is a Dog. `Animal a = new Dog();` is the legal direction."
        },
        {
          "question": "What is wrong with this code?\n```\nclass Animal { }\n\nclass Dog extends Animal { }\n\nclass Cat extends Animal { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Cat();\n        Dog d = (Dog) a;\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 0,
          "explanation": "The cast compiles, but it throws `ClassCastException` when run, because the object is a `Cat`. Check first with `if (a instanceof Dog)` to avoid the exception."
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
          "explanation": "`hi` lives in `A`, but its call to `who()` still runs the object’s version. `A` is tempting because `hi` is defined in A, but dispatch always uses the object’s class."
        },
        {
          "question": "`print(int)` and `print(String)` in one class are an example of",
          "options": [
            "Inheritance",
            "Encapsulation",
            "Overloading: compile-time polymorphism",
            "Overriding: runtime polymorphism"
          ],
          "answer": 2,
          "explanation": "Same name, different parameters. Overriding would need the same parameters, in a subclass."
        },
        {
          "question": "Which is a limitation of deep inheritance hierarchies?",
          "options": [
            "Objects can’t be created",
            "Tight coupling: parent changes can break subclasses",
            "Methods can’t be overridden",
            "Code can’t be reused"
          ],
          "answer": 1,
          "explanation": "Keep hierarchies simple, and prefer interfaces or composition where you can. Inheritance does allow reuse; the cost is that classes become tightly tied together."
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
          "explanation": "A TV remote is the classic example: press the button, and ignore the wiring. How an object does its work is the detail that abstraction hides."
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
          "explanation": "Encapsulation is what relies on private fields. Packages organise code; they don’t describe behaviour."
        },
        {
          "question": "Does this code compile?\n```\nabstract class Shape { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Shape();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "An abstract class can’t be created with `new`. Create a concrete subclass instead, such as `new Circle()`."
        },
        {
          "question": "Does this code compile?\n```\nabstract class Shape { }\n\nclass Circle extends Shape { }\n\npublic class Main {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 0,
          "explanation": "A variable may have the abstract type, and a concrete subclass supplies the object. Using the abstract type for the variable is the whole point of abstraction."
        },
        {
          "question": "What is wrong with this code?\n```\nabstract class Shape {\n    abstract double area() { }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "An abstract method has no body: end it with `;`. The `{ }` body is what’s wrong; `abstract double area();` is correct."
        },
        {
          "question": "Does this code compile?\n```\nclass Shape {\n    abstract double area();\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "A class with an abstract method must itself be declared `abstract`. Either add `abstract` to the class or give `area` a body."
        },
        {
          "question": "Does this code compile?\n```\nabstract class Shape {\n    abstract double area();\n}\n\nclass Circle extends Shape { }\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "A concrete subclass must implement every abstract method, or be abstract too. Circle needs `double area() { … }`, or must itself be abstract."
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
          "explanation": "That is why it is called partial abstraction. “Only abstract methods” describes the original idea of an interface."
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
          "explanation": "It still has state to initialise, even though it is never created directly. The tempting “it can’t have one” is false: abstract classes often do."
        },
        {
          "question": "What does this print?\n```\nabstract class S {\n    S() { System.out.print(\"S \"); }\n    abstract int a();\n    int twice() { return 2 * a(); }\n}\n\nclass T extends S {\n    T() { System.out.print(\"T \"); }\n    @Override int a() { return 3; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        S s = new T();\n        System.out.print(s.twice());\n    }\n}\n```",
          "options": [
            "`S T 3`",
            "`T 6`",
            "`S T 6`",
            "`T S 6`"
          ],
          "answer": 2,
          "explanation": "The parent’s constructor runs first, and `twice` uses the subclass’s `a`. `T 6` forgets that S’s constructor runs first, because of the implicit `super()`."
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
          "explanation": "It says what a class can do. An interface can’t be an object; you can’t `new` it."
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
          "explanation": "Class to class is `extends`; class to interface is `implements`. `extends` is for class to class, or interface to interface."
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
          "explanation": "`interface B extends A`. Only a class implements. Interfaces can extend several other interfaces at once."
        },
        {
          "question": "Variables in an interface are always",
          "options": [
            "`protected abstract`",
            "Instance fields",
            "`public static final`",
            "`private`"
          ],
          "answer": 2,
          "explanation": "So they are constants. Instance fields would need an object, and interfaces can’t be instantiated."
        },
        {
          "question": "What is wrong with this code?\n```\ninterface V {\n    int WHEELS = 4;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        V.WHEELS = 2;\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "Interface variables are `final`. Assigning to a final variable is caught by the compiler."
        },
        {
          "question": "Does this code compile?\n```\ninterface V { }\n\npublic class Main {\n    public static void main(String[] args) {\n        V v = new V();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "An interface can’t be created with `new`. A class must implement it, or you can use an anonymous class or lambda."
        },
        {
          "question": "What is wrong with this code?\n```\ninterface V {\n    void go();\n}\n\nclass B implements V {\n    void go() { }\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "Interface methods are public, and an implementation can’t reduce that. It must be `public void go()`. Adding `public` fixes it."
        },
        {
          "question": "What is wrong with this code?\n```\nabstract class P { }\n\nclass C implements P { }\n```",
          "options": [
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing",
            "No error"
          ],
          "answer": 0,
          "explanation": "`P` is a class, so `C` must use `extends`. This mix-up is a favourite of bug-hunt questions. Use `class C extends P { }`."
        },
        {
          "question": "Does this code compile?\n```\ninterface A { void a(); }\ninterface B { void b(); }\n\nclass C implements A, B {\n    public void a() { }\n    public void b() { }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 1,
          "explanation": "A class can implement several interfaces. This is how Java offers multiple inheritance of type."
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
          "explanation": "That is dynamic dispatch. A `double` prints with `.0`. `7` is tempting but `t` is a double, so it prints `7.0`."
        },
        {
          "question": "Which suits a capability shared by unrelated classes, like `Flyable`?",
          "options": [
            "A `final` class",
            "An abstract class",
            "A static method",
            "An interface"
          ],
          "answer": 3,
          "explanation": "Birds and planes share no parent, but both can fly. An abstract class would force birds and planes into one family tree."
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
          "explanation": "A default method is inherited, and can be overridden. `HeyHey` forgets that A1 doesn’t override `hi`, so it keeps the default."
        },
        {
          "question": "Does this code compile?\n```\ninterface G {\n    static String hi() { return \"Hi\"; }\n}\n\nclass A1 implements G { }\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(new A1().hi());\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Static interface methods aren’t inherited. Call `G.hi()`. Unlike default methods, static ones belong only to the interface."
        },
        {
          "question": "A functional interface has",
          "options": [
            "No methods at all",
            "Exactly one field",
            "Only default methods",
            "Exactly one abstract method"
          ],
          "answer": 3,
          "explanation": "That one method is what a lambda supplies. Default and static methods don’t count. `Runnable`, `Comparator` and `ActionListener` are examples."
        },
        {
          "question": "What does this print?\n```\ninterface Calc {\n    int run(int x, int y);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calc add = (x, y) -> x + y;\n        Calc mul = (x, y) -> x * y;\n        System.out.println(add.run(2, 3) + mul.run(2, 3));\n    }\n}\n```",
          "options": [
            "`11`",
            "`6`",
            "`56`",
            "`5`"
          ],
          "answer": 0,
          "explanation": "`5 + 6`: both results are `int`s, so `+` adds them. `56` would be text joining, but both operands are ints."
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
          "explanation": "That is why `String` and `Math` just work. `java.util` holds `ArrayList` and `Scanner`, which do need imports."
        },
        {
          "question": "`ArrayList` lives in",
          "options": [
            "`java.lang`",
            "`javax.swing`",
            "`java.awt`",
            "`java.util`"
          ],
          "answer": 3,
          "explanation": "`import java.util.ArrayList;` It is not in `java.lang`, so it always needs an import."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> a = new ArrayList<>();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Without `import java.util.ArrayList;` the name is unknown. The error is “cannot find symbol: class ArrayList”."
        },
        {
          "question": "What does this print?\n```\nString s = \"Java Code\";\nSystem.out.println(s.length() + \" \" + s.charAt(1) + \" \" + s.indexOf(\"Code\"));\n```",
          "options": [
            "`9 a 5`",
            "`9 a 6`",
            "`8 a 5`",
            "`9 J 5`"
          ],
          "answer": 0,
          "explanation": "The space counts, and indexes start at 0. `9 a 6` counts from 1; “Code” starts at index 5."
        },
        {
          "question": "What does this print?\n```\nString s = \"Programming\";\nSystem.out.println(s.substring(3, 7));\n```",
          "options": [
            "`ogram`",
            "`gramm`",
            "`gram`",
            "`ogra`"
          ],
          "answer": 2,
          "explanation": "`substring(a, b)` runs from `a` up to, but not including, `b`. `gramm` includes position 7, but the end index is excluded."
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
          "explanation": "Strings are immutable. The first result was thrown away. The first `println` still shows lowercase because `s` was never reassigned."
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
          "explanation": "`==` compares objects; `equals` compares contents. `true true` would need both variables to refer to one object, but each `new` makes its own."
        },
        {
          "question": "What is wrong with this code?\n```\nString code = new String(\"COS\");\nif (code == \"COS\") {\n    System.out.println(\"match\");\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 2,
          "explanation": "It compiles, but `==` compares objects, so `match` never prints. Use `equals`. It isn’t a syntax error because comparing references with `==` is legal; it just answers the wrong question."
        },
        {
          "question": "What is wrong with this code?\n```\nString s = \"abc\";\nSystem.out.println(s.length);\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "For a `String`, `length()` is a method. `length` without brackets is for arrays."
        },
        {
          "question": "Which converts the text `\"42\"` to an `int`?",
          "options": [
            "`(int) \"42\"`",
            "`Integer.parseInt(\"42\")`",
            "`Int.parse(\"42\")`",
            "`\"42\".toInt()`"
          ],
          "answer": 1,
          "explanation": "A cast can’t convert text. A cast like `(int) \"42\"` only converts between compatible types, and a String isn’t a number."
        },
        {
          "question": "`Integer.parseInt(\"abc\")` throws",
          "options": [
            "`ArithmeticException`",
            "`NullPointerException`",
            "`ClassCastException`",
            "`NumberFormatException`"
          ],
          "answer": 3,
          "explanation": "The text isn’t a number. ArithmeticException is for maths problems such as dividing by zero."
        },
        {
          "question": "What does this print?\n```\nint a = Integer.parseInt(\"20\");\nString b = \"20\";\nSystem.out.println(a + 1);\nSystem.out.println(b + 1);\n```",
          "options": [
            "```\n21\n201\n```",
            "```\n201\n201\n```",
            "```\n21\n21\n```",
            "```\n201\n21\n```"
          ],
          "answer": 0,
          "explanation": "A number adds; text joins. `201` on both lines forgets that `a` was parsed into a real number."
        },
        {
          "question": "Does this code compile?\n```\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<int> a = new ArrayList<>();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "Generics need a class. Use the wrapper `Integer`. `ArrayList<Integer>` works, and Java boxes ints automatically."
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
          "explanation": "Arrays use `.length`, strings `.length()`, collections `.size()`. `length` is for arrays and `length()` for Strings, which makes this a common mix-up."
        },
        {
          "question": "What is wrong with this code?\n```\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> a = new ArrayList<>();\n        a.add(\"x\");\n        System.out.println(a[0]);\n    }\n}\n```",
          "options": [
            "Syntax error: it won’t compile",
            "No error",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 0,
          "explanation": "Square brackets only work on arrays. Use `a.get(0)`. `a.get(0)` is the list equivalent of `a[0]`."
        },
        {
          "question": "What does this print?\n```\njava.util.ArrayList<String> c = new java.util.ArrayList<>();\nc.add(\"A\");\nc.add(\"B\");\nc.add(1, \"X\");\nc.remove(0);\nSystem.out.println(c + \" \" + c.size());\n```",
          "options": [
            "`[B, X] 2`",
            "`[X, B] 2`",
            "`[A, B] 2`",
            "`[A, X, B] 3`"
          ],
          "answer": 1,
          "explanation": "The insert gives `[A, X, B]`, and removing index 0 shifts the rest left. `[A, X, B] 3` forgets the `remove(0)` at the end."
        },
        {
          "question": "The main advantage of `ArrayList` over an array is",
          "options": [
            "It uses `[]` for access",
            "It needs no `import`",
            "Its size can grow and shrink",
            "It stores primitives directly"
          ],
          "answer": 2,
          "explanation": "An array’s size is fixed once created. It can’t store primitives directly; it boxes them."
        },
        {
          "question": "What does this print?\n```\njava.util.Stack<Integer> s = new java.util.Stack<>();\ns.push(1);\ns.push(2);\ns.push(3);\ns.pop();\nSystem.out.println(s.peek() + \" \" + s.size());\n```",
          "options": [
            "`1 2`",
            "`3 2`",
            "`2 3`",
            "`2 2`"
          ],
          "answer": 3,
          "explanation": "Last in, first out: `pop` removes 3, and `peek` looks at 2 without removing it. `3 2` forgets that `pop` already removed the 3."
        },
        {
          "question": "What does this print?\n```\njava.util.Queue<Integer> q = new java.util.LinkedList<>();\nq.offer(1);\nq.offer(2);\nq.offer(3);\nq.poll();\nSystem.out.println(q.peek() + \" \" + q.size());\n```",
          "options": [
            "`3 2`",
            "`1 2`",
            "`1 3`",
            "`2 2`"
          ],
          "answer": 3,
          "explanation": "First in, first out: `poll` removes 1. `3 2` treats it like a stack, but a queue serves the oldest first."
        },
        {
          "question": "A stack is",
          "options": [
            "Last in, first out",
            "First in, first out",
            "Fixed in size",
            "Sorted automatically"
          ],
          "answer": 0,
          "explanation": "Like a pile of plates. First in, first out describes a queue."
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
          "explanation": "The first to arrive is served first. A stack would serve the last person to arrive first."
        },
        {
          "question": "Which two methods drive an `Iterator` forward?",
          "options": [
            "`start()` and `run()`",
            "`hasMore()` and `get()`",
            "`hasNext()` and `next()`",
            "`size()` and `get()`"
          ],
          "answer": 2,
          "explanation": "`hasNext` asks, and `next` moves on and returns the item. Calling `next()` when `hasNext()` is false throws `NoSuchElementException`."
        },
        {
          "question": "Removing from a list directly during a for-each loop usually throws",
          "options": [
            "`IllegalStateException`",
            "`NullPointerException`",
            "`ClassCastException`",
            "`ConcurrentModificationException`"
          ],
          "answer": 3,
          "explanation": "The hidden iterator notices the list changed behind its back. Use `it.remove()` or `removeIf(...)` instead."
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
          "explanation": "`it.remove()` keeps the iterator in step with the list. Removing by index inside a for-each loop is exactly what triggers the exception."
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
          "explanation": "After removing index 1, `-3` shifts into that slot and gets skipped. That is the classic indexed-removal bug. `[1, 4]` is what you’d want; looping backwards from the end, or `removeIf`, gets it."
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
            "An object describing a problem while a program runs",
            "A class that can’t be used"
          ],
          "answer": 2,
          "explanation": "If nothing catches it, the program stops. A compile error happens before the program runs; exceptions happen while it runs."
        },
        {
          "question": "What does this print?\n```\ntry {\n    System.out.print(\"A\");\n    int x = 1 / 0;\n    System.out.print(\"B\");\n} catch (ArithmeticException e) {\n    System.out.print(\"C\");\n} finally {\n    System.out.print(\"D\");\n}\nSystem.out.print(\"E\");\n```",
          "options": [
            "`ABCDE`",
            "`ACD`",
            "`ACDE`",
            "`ACE`"
          ],
          "answer": 2,
          "explanation": "The rest of the `try` is skipped, `finally` always runs, and the program continues. `ABCDE` would mean B runs, but execution leaves the try block at the division."
        },
        {
          "question": "What does this print?\n```\ntry {\n    System.out.print(\"A\");\n} catch (RuntimeException e) {\n    System.out.print(\"B\");\n} finally {\n    System.out.print(\"C\");\n}\n```",
          "options": [
            "`ABC`",
            "`A`",
            "`BC`",
            "`AC`"
          ],
          "answer": 3,
          "explanation": "With no exception, the `catch` is skipped, but `finally` still runs. `A` alone forgets that finally runs even when nothing goes wrong."
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
          "explanation": "`finally` runs before the method actually returns. `1 F` is tempting, but the value is only printed after `f()` has fully returned."
        },
        {
          "question": "`10 / 0` with `int`s throws",
          "options": [
            "`NullPointerException`",
            "`ArithmeticException`",
            "Nothing: it gives `Infinity`",
            "`NumberFormatException`"
          ],
          "answer": 1,
          "explanation": "Only floating-point division gives `Infinity`. Integer division by zero has no sensible answer, so Java throws."
        },
        {
          "question": "What does this print?\n```\nSystem.out.println(10.0 / 0);\n```",
          "options": [
            "`NaN`",
            "`10.0`",
            "`Infinity`",
            "`0.0`"
          ],
          "answer": 2,
          "explanation": "Floating-point division by zero doesn’t throw. `NaN` would be `0.0 / 0`; a non-zero number over zero gives Infinity."
        },
        {
          "question": "`String s = null; s.length();` throws",
          "options": [
            "`ClassCastException`",
            "`ArrayIndexOutOfBoundsException`",
            "`NumberFormatException`",
            "`NullPointerException`"
          ],
          "answer": 3,
          "explanation": "The reference points at no object. The fix is a null check before calling methods on `s`."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"x\");\n        } catch (Exception e) {\n        } catch (NumberFormatException e) {\n        }\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 0,
          "explanation": "`Exception` already catches everything below it, so the second catch could never run. Specific goes first. The compiler reports the second catch as unreachable."
        },
        {
          "question": "Does this code compile?\n```\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            int n = Integer.parseInt(\"x\");\n        } catch (NumberFormatException e) {\n        } catch (Exception e) {\n        }\n    }\n}\n```",
          "options": [
            "No",
            "Yes"
          ],
          "answer": 1,
          "explanation": "Specific first, then general. The narrow catch handles parsing errors and anything else falls through to `Exception`."
        },
        {
          "question": "What is wrong with this code?\n```\ntry {\n    int n = 1;\n} finaly {\n    System.out.println(\"done\");\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 1,
          "explanation": "The keyword is `finally`. A misspelled keyword is always a syntax error."
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
          "explanation": "The compiler doesn’t force you to handle them. `IOException` is checked, so the compiler insists you handle it."
        },
        {
          "question": "Which is a checked exception?",
          "options": [
            "`IOException`",
            "`ArithmeticException`",
            "`NullPointerException`",
            "`NumberFormatException`"
          ],
          "answer": 0,
          "explanation": "Checked exceptions must be caught or declared. The other three all extend RuntimeException, so they are unchecked."
        },
        {
          "question": "Does this code compile?\n```\nclass E extends Exception { }\n\nclass A {\n    void f() {\n        throw new E();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`E` is checked. `f` must catch it, or declare `throws E`. Adding `throws E` to `f()` makes it compile."
        },
        {
          "question": "Does this code compile?\n```\nclass E extends RuntimeException { }\n\nclass A {\n    void f() {\n        throw new E();\n    }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 0,
          "explanation": "`E` is unchecked, so no declaration is required. Unchecked exceptions may be declared, but don’t have to be."
        },
        {
          "question": "`throw` and `throws`: which is true?",
          "options": [
            "They are interchangeable",
            "`throws` raises an exception; `throw` declares one",
            "`throw` raises an exception; `throws` declares one in a method’s header",
            "Both go only in a method’s header"
          ],
          "answer": 2,
          "explanation": "`throw new X();` is an action; `void f() throws X` is a warning label. Swapping them is the classic slip."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic void f(int u) {\n    if (u <= 0) throw IllegalArgumentException(\"Bad\");\n}\n```",
          "options": [
            "No error",
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "An exception is an object, so it needs `new`. Write `throw new IllegalArgumentException(\"Bad\");`."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic void f(int u) {\n    if (u <= 0) throws new IllegalArgumentException(\"Bad\");\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "In the body, the keyword is `throw`. `throws` belongs in the header. Using `throws` inside a method body is a syntax error."
        },
        {
          "question": "What does this print?\n```\nstatic void c() { throw new IllegalStateException(\"x\"); }\n\nstatic void b() {\n    c();\n    System.out.print(\"B\");\n}\n\npublic static void main(String[] args) {\n    try {\n        b();\n        System.out.print(\"M\");\n    } catch (IllegalStateException e) {\n        System.out.print(e.getMessage());\n    }\n    System.out.print(\"E\");\n}\n```",
          "options": [
            "`BMxE`",
            "`xME`",
            "`BxE`",
            "`xE`"
          ],
          "answer": 3,
          "explanation": "It propagates through `b` and skips everything until the `catch`. `BxE` is tempting, but B’s print comes after the call to `c()`, which never returns normally."
        },
        {
          "question": "When an exception isn’t caught in a method, it",
          "options": [
            "Is ignored",
            "Stops only that line",
            "Becomes a compile error",
            "Travels up to the method that called it"
          ],
          "answer": 3,
          "explanation": "That is propagation. If nothing catches it, the program stops. Uncaught exceptions are never silently ignored."
        },
        {
          "question": "Which exception suits “a CGPA was requested with too few courses”?",
          "options": [
            "`IllegalStateException`",
            "`ArithmeticException`",
            "`NumberFormatException`",
            "`IOException`"
          ],
          "answer": 0,
          "explanation": "The object isn’t ready. A bad value passed in would be `IllegalArgumentException`. Nothing was mis-typed and no arithmetic failed; the object just isn’t in a state to answer."
        },
        {
          "question": "Which exception suits a method being passed a negative credit unit?",
          "options": [
            "`NullPointerException`",
            "`IllegalArgumentException`",
            "`ClassCastException`",
            "`IllegalStateException`"
          ],
          "answer": 1,
          "explanation": "A bad argument was passed in. IllegalStateException would mean the object itself was in the wrong state."
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
          "explanation": "Extending `RuntimeException` would make it unchecked. RuntimeException is the parent for unchecked exceptions instead."
        },
        {
          "question": "What does this print?\n```\nclass MyEx extends Exception {\n    MyEx(String m) { super(m); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            throw new MyEx(\"oops\");\n        } catch (MyEx e) {\n            System.out.println(e.getMessage());\n        }\n    }\n}\n```",
          "options": [
            "`MyEx`",
            "`MyEx: oops`",
            "`null`",
            "`oops`"
          ],
          "answer": 3,
          "explanation": "`super(m)` stores the message for `getMessage()`. `MyEx: oops` is what `e.toString()` would give, not `getMessage()`."
        },
        {
          "question": "Is `NumberFormatException` caught by `catch (IllegalArgumentException e)`?",
          "options": [
            "Yes, it is a subclass",
            "No, they are unrelated",
            "Only with `throws`",
            "Only inside `finally`"
          ],
          "answer": 0,
          "explanation": "A catch handles the named class and all its subclasses. NumberFormatException extends IllegalArgumentException, so the catch matches it."
        },
        {
          "question": "What is wrong with this code?\n```\nstatic int parse(String s) {\n    try {\n        return Integer.parseInt(s);\n    } catch (NumberFormatException e) {\n    }\n}\n```",
          "options": [
            "No error",
            "Syntax error: it won’t compile",
            "Semantic error: it compiles, but does the wrong thing"
          ],
          "answer": 1,
          "explanation": "If the exception is caught, the method reaches its end with no value: “missing return statement”. Return a value in the catch (or after it), or rethrow, to fix it."
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
            "`JFrame`",
            "`JLabel`",
            "`Window1`"
          ],
          "answer": 1,
          "explanation": "`JPanel` only groups components inside a window. A JPanel can’t stand on its own as a window."
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
          "explanation": "Layouts like `FlowLayout` are in `java.awt`. `java.swing` doesn’t exist; Swing is an extension package, hence the `x`."
        },
        {
          "question": "Which component is best for many lines of output?",
          "options": [
            "`JLabel`",
            "`JComboBox`",
            "`JTextField`",
            "`JTextArea`"
          ],
          "answer": 3,
          "explanation": "`JTextField` holds a single line. A JLabel shows text but the user can’t scroll through long output."
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
          "explanation": "A fixed list also prevents invalid input. A JScrollPane adds scrolling, not choices."
        },
        {
          "question": "To make a `JTextArea` scroll, you",
          "options": [
            "Set a `FlowLayout`",
            "Add it inside a `JScrollPane`",
            "Call `setScroll(true)`",
            "Use a `JPanel`"
          ],
          "answer": 1,
          "explanation": "`frame.add(new JScrollPane(area));` `setScroll(true)` isn’t a real method."
        },
        {
          "question": "Why might a window never appear, with no error at all?",
          "options": [
            "It has no title",
            "It has no `pack()`",
            "`setVisible(true)` was never called",
            "There is no `JPanel`"
          ],
          "answer": 2,
          "explanation": "A frame starts hidden. A missing `pack()` gives a tiny window, but it still appears."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        JFrame f = new JFrame(\"Hi\");\n        f.add(new JLabel(\"Hello\"));\n        f.pack();\n        f.setVisible(false);\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 0,
          "explanation": "It compiles and runs, but no window ever appears. It isn’t a syntax error: `setVisible(false)` is a perfectly legal call."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\nimport java.awt.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        JFrame f = new JFrame(\"Hi\");\n        f.setLayout(new FlowLayout);\n    }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "Creating an object needs brackets: `new FlowLayout()`. Without the brackets Java looks for a variable called FlowLayout."
        },
        {
          "question": "What does `JFrame.EXIT_ON_CLOSE` do?",
          "options": [
            "Hides the window only",
            "Saves the window’s state",
            "Stops the window from closing",
            "Ends the program when the window closes"
          ],
          "answer": 3,
          "explanation": "Without it, closing the window leaves the program running. The default only hides the window."
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
          "explanation": "It is the default layout of a `JPanel`. GridLayout makes equal cells instead."
        },
        {
          "question": "`BorderLayout` has which regions?",
          "options": [
            "Rows and columns of equal cells",
            "LEFT, RIGHT and MIDDLE",
            "TOP and BOTTOM only",
            "NORTH, SOUTH, EAST, WEST and CENTER"
          ],
          "answer": 3,
          "explanation": "It is the default layout of a `JFrame`. Rows and columns of equal cells describe GridLayout."
        },
        {
          "question": "`new GridLayout(3, 2)` makes",
          "options": [
            "6 rows",
            "3 rows and 2 columns",
            "3 components",
            "2 rows and 3 columns"
          ],
          "answer": 1,
          "explanation": "Rows come first. Swapping them to 2 rows and 3 columns is the usual slip."
        },
        {
          "question": "In event-driven programming, code runs",
          "options": [
            "Before `main`",
            "In response to events like clicks",
            "Only at compile time",
            "Strictly from top to bottom"
          ],
          "answer": 1,
          "explanation": "You register handlers, and Swing calls them. After setting up the window, main finishes and the event thread waits for the user."
        },
        {
          "question": "Which interface handles a button click?",
          "options": [
            "`ButtonEvent`",
            "`Comparable`",
            "`ActionListener`",
            "`Runnable`"
          ],
          "answer": 2,
          "explanation": "Its one method is `actionPerformed(ActionEvent e)`. `Runnable` is for code to run on a thread, not for clicks."
        },
        {
          "question": "How do you attach a listener to a button `b`?",
          "options": [
            "`listener.add(b);`",
            "`b.onClick = listener;`",
            "`b.setListener(listener);`",
            "`b.addActionListener(listener);`"
          ],
          "answer": 3,
          "explanation": "The button keeps a list of its listeners. Several listeners can be attached to the same button."
        },
        {
          "question": "Why can a lambda replace an anonymous `ActionListener`?",
          "options": [
            "It has exactly one abstract method",
            "Swing converts all classes",
            "It is an abstract class",
            "It has no methods"
          ],
          "answer": 0,
          "explanation": "That makes it a functional interface. Any interface with a single abstract method can be written as a lambda."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\n\nclass A {\n    JTextField f = new JTextField();\n    String read() { return f.getText.trim(); }\n}\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "No error",
            "Syntax error: it won’t compile"
          ],
          "answer": 2,
          "explanation": "`getText` is a method, so it needs brackets. `getText()` with brackets fixes it."
        },
        {
          "question": "What is wrong with this code?\n```\nimport javax.swing.*;\n\nclass A {\n    JComboBox<String> box = new JComboBox<>(new String[] {\"Card\", \"Cash\"});\n    String pick() {\n        if (\"Cash\".equals(box.getSelectedItem())) return \"Card\";\n        return \"Card\";\n    }\n}\n// Choosing Cash should give \"Cash\".\n```",
          "options": [
            "Semantic error: it compiles, but does the wrong thing",
            "Syntax error: it won’t compile",
            "No error"
          ],
          "answer": 0,
          "explanation": "It compiles, but both paths return `Card`. The first return should be `\"Cash\"`."
        },
        {
          "question": "Does this code compile?\n```\nimport javax.swing.*;\n\nclass A {\n    JComboBox<String> box = new JComboBox<>(new String[] {\"A\"});\n    String pick() { return box.getSelectedItem(); }\n}\n```",
          "options": [
            "Yes",
            "No"
          ],
          "answer": 1,
          "explanation": "`getSelectedItem()` returns `Object`, so it needs a cast to `String`. Write `(String) box.getSelectedItem()`."
        },
        {
          "question": "`JOptionPane.showMessageDialog(...)` is used to",
          "options": [
            "Read a file",
            "Close the program",
            "Add a button",
            "Show a pop-up message"
          ],
          "answer": 3,
          "explanation": "Commonly with `JOptionPane.ERROR_MESSAGE` for validation errors. It is the quickest way to show a validation error."
        },
        {
          "question": "What does `getText()` on a `JTextField` always return?",
          "options": [
            "An `Object`",
            "A `String`",
            "`null` when empty",
            "An `int`, if the text is a number"
          ],
          "answer": 1,
          "explanation": "Convert it with `parseInt` or `parseDouble`. An empty field gives `\"\"`. Even when the user typed digits, it is still text until you parse it."
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
          "explanation": "`run()` is an ordinary call, on `main`. `start()` creates the new thread. `w w` assumes `run()` starts a thread, but only `start()` does."
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
          "explanation": "`sleep` waits for a fixed time; `join` waits for the thread to end. `wait()` is a different, lower-level mechanism tied to locks."
        },
        {
          "question": "Two threads running `count++` on a shared field may lose updates because",
          "options": [
            "`count++` is several steps that can interleave",
            "Java runs only one thread",
            "`int` fields are read-only",
            "Threads can’t share data"
          ],
          "answer": 0,
          "explanation": "It is a read, an add and a write. Use `synchronized` to let one thread in at a time. Java certainly runs threads at the same time; that is why the steps can interleave."
        },
        {
          "question": "A long download inside `actionPerformed` will",
          "options": [
            "Close the window",
            "Freeze the window",
            "Run on its own thread automatically",
            "Fail to compile"
          ],
          "answer": 1,
          "explanation": "Listeners run on the Event Dispatch Thread, so slow work belongs on another thread. Move the slow work to a separate thread, or use a SwingWorker."
        }
      ]
    }
  ]
};
