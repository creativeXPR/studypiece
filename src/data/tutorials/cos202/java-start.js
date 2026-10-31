// COS 202 · Intro to Java · Module 1: what a language is, levels, compiling, Hello World.

export default {
  id: 'java-start',
  title: 'What programming is, and your first program',
  covers: 'programming languages, syntax and semantics, the five generations, compilers and interpreters, bytecode and the JVM, Hello World',
  minutes: 9,
  sections: [
    {
      name: 'Talking to a computer',
      terms: [
        ['Programming language', 'A formal set of rules for writing instructions a computer can carry out.'],
        ['Syntax', 'The grammar: the rules for how a valid statement must be written.'],
        ['Semantics', 'The meaning: what a correctly written statement actually does.'],
        ['Abstraction', 'Hiding hardware details, so you write `int sum = 5 + 3;` instead of machine steps.'],
        ['Portability', 'The ability of a program to run on different kinds of computers.'],
        ['Generations', '1GL machine code, 2GL assembly, 3GL high-level (Java), 4GL very high-level (SQL), 5GL logic and AI (Prolog).'],
        ['Compiler', 'Translates the whole program before it runs. C and C++ work this way.'],
        ['Interpreter', 'Translates and runs line by line. Python and JavaScript work this way.'],
        ['Bytecode and JVM', 'Java compiles to bytecode (a `.class` file), and the Java Virtual Machine runs it on any computer.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Intro to Java · Module 1',
          title: 'A computer only obeys',
          body: 'A computer does exactly what it is told, very fast, and has no common sense. Think of a recipe followed word for word.\n\nDeep down it understands only **0s and 1s**. This line moves the number 97 into the processor:\n\n`10110000 01100001`\n\nNobody wants to write that. A ==programming language== lets you write instructions in near-English, and a tool translates them into 0s and 1s for you.',
          cta: 'Grammar and meaning',
        },
        {
          type: 'story',
          eyebrow: 'The two kinds of right',
          title: 'Syntax and semantics',
          body: 'Compare these: “Kill him, not spare him” and “Kill him not, spare him”. Same words, one comma moved, opposite meaning.\n\n==Syntax== is the grammar: is it written correctly? ==Semantics== is the meaning: does it do what you intended?\n\nA syntax mistake stops the program from running at all. A semantic mistake runs happily and gives the wrong answer, so it is harder to catch.',
          cta: 'Try telling them apart',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which kind of mistake is each one?',
          buckets: [
            { id: 'syntax', label: 'Syntax: won’t run' },
            { id: 'semantic', label: 'Semantic: wrong answer' },
          ],
          items: [
            { text: 'Forgetting the `;` at the end of a line', bucket: 'syntax', why: 'A broken grammar rule, so Java refuses to run it.' },
            { text: 'Typing `+` where you meant `*`', bucket: 'semantic', why: 'Perfectly valid Java, but it calculates the wrong thing.' },
            { text: 'Leaving out a closing `}`', bucket: 'syntax', why: 'Every opening bracket needs a partner.' },
            { text: 'Dividing by 3 when there are 4 marks', bucket: 'semantic', why: 'It runs, and the average is simply wrong.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Five generations',
          title: 'Each level moves further from the hardware',
          cards: [
            { title: '1GL Machine', text: '`10110000 01100001`. Pure binary, the only thing a processor runs directly. Fastest to run, hardest to write, and different for each kind of processor.' },
            { title: '2GL Assembly', text: '`MOV AX, 5`. Short words, one for each machine instruction. An ==assembler== converts it. Still tied to the hardware.' },
            { title: '3GL High-level', text: '`int sum = 5 + 3;`. Close to English and easy to read. Java, C++ and Python live here.' },
            { title: '4GL Very high-level', text: 'You state the result you want, as in SQL and MATLAB.' },
            { title: '5GL Logic and AI', text: 'You give facts and rules, and the system finds the answer, as in Prolog and Mercury.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Why is machine language fast to run but hard to write?',
          options: [
            { text: 'It needs no translation, but it is only 0s and 1s', correct: true, why: 'The processor runs it directly, while people struggle to read long rows of binary.' },
            { text: 'It is the newest kind of language', why: 'It is the oldest: first generation.' },
            { text: 'It works the same on every computer', why: 'The opposite: it is unique to each processor type.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Translators',
          title: 'Java does both kinds of translating',
          body: 'A ==compiler== translates the whole program first, like translating a book before anyone reads it. It runs fast, but must be redone for each kind of computer (C, C++).\n\nAn ==interpreter== translates line by line while running, like a live interpreter at a meeting. It is flexible but slower (Python, JavaScript).\n\nJava is a **hybrid**. It compiles to ==bytecode==, a halfway language, then the ==JVM== (Java Virtual Machine) runs that bytecode. Any computer with a JVM can run the same file.',
          cta: 'Follow a program',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'How does a Java program get from you to the screen?',
          items: [
            'You write `Hello.java`',
            '`javac Hello.java` compiles it and checks the grammar',
            'Bytecode appears in `Hello.class`',
            '`java Hello` starts the JVM',
            'The JVM runs the bytecode and you see the output',
          ],
          explain: 'In this course, **▶ Run** does all of this for you.',
        },
        {
          type: 'bridge',
          title: 'You know what a language is.',
          recap: ['Syntax is grammar; semantics is meaning.', 'Java compiles to bytecode, and the JVM runs it anywhere.'],
          why: 'Next: your first real program.',
        },
      ],
    },
    {
      name: 'Hello, Java',
      terms: [
        ['Class', 'The container that holds Java code. A `public class Hello` must be saved as `Hello.java`.'],
        ['main', '`public static void main(String[] args)` is where every program starts.'],
        ['println', '`System.out.println(...)` prints a line and moves to the next one. `print` stays on the same line.'],
        ['Comment', 'Text after `//` is a note for people. Java ignores it.'],
      ],
      screens: [
        {
          type: 'trace',
          eyebrow: 'Watch it run',
          title: 'Hello, World',
          body: 'Press **Next step** and follow the highlighted line. Java runs one line at a time, from the top of `main` down.',
          code: `public class Main {
    public static void main(String[] args) {
        // Print a message to the screen
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java");
    }
}`,
          frames: [
            { line: 2, note: 'Java looks for `main` and starts here. Always.' },
            { line: 3, note: 'A ==comment==: a note for people. Java skips it.' },
            { line: 4, note: 'Prints the text inside the quotes, then moves to a new line.', print: 'Hello, World!' },
            { line: 5, note: 'The next line runs next. Order matters.', print: 'Welcome to Java' },
            { line: 6, note: 'The end of `main`, so the program ends.' },
          ],
          cta: 'Name the parts',
        },
        {
          type: 'reveal',
          eyebrow: 'The skeleton',
          title: 'Open each part',
          body: 'You will write this skeleton in every program. For now, learn it like a greeting; every word gets explained in time.',
          cards: [
            { title: 'public class Main', text: 'A ==class== is a container for code. The file must be named after it: `Main.java`.' },
            { title: 'public static void main', text: 'The starting point. Without `main`, Java has nowhere to begin.' },
            { title: 'String[] args', text: 'Extra values the program can receive when started. You can ignore it for now.' },
            { title: 'System.out.println', text: 'The command that prints a line of text.' },
            { title: '{ } and ;', text: 'Curly brackets wrap a block of code, in pairs. A semicolon ends each instruction, like a full stop.' },
          ],
        },
        {
          type: 'code',
          eyebrow: 'Your turn',
          title: 'Your first program',
          body: 'Make the program print exactly these two lines:\n\n`I can code`\n\n`Java is next`\n\nType inside `main`, then press **▶ Run**. Mistakes cost nothing here.',
          starter: `public class Main {
    public static void main(String[] args) {
        // your code here
    }
}
`,
          tests: [
            { label: 'Prints both lines, in order', main: 'Main', out: 'I can code\nJava is next' },
          ],
          hints: ['Each line needs its own `System.out.println("...");`', 'Capital `S` in `System`. Double quotes around the text. A `;` at the end.'],
          solution: {
            code: `public class Main {
    public static void main(String[] args) {
        System.out.println("I can code");
        System.out.println("Java is next");
    }
}
`,
            steps: [
              { lines: [3, 4], text: '**One command for each line of output.** They run from top to bottom.' },
            ],
          },
        },
        {
          type: 'bug',
          eyebrow: 'Bug hunt',
          title: 'Spot what’s wrong',
          body: 'This should greet the user with `Hello`. Tap each wrong line, say which kind of mistake it is, and fix it.',
          code: `public class Main {
    public static void main(String[] args) {
        system.out.println("Hello");
        System.out.println("Bye")
    }
}`,
          errors: [
            { line: 3, kind: 'syntax', fixes: ['System.out.println("Hello");', 'SYSTEM.out.println("Hello");', 'system.out.print("Hello");'], why: 'Java is ==case-sensitive==: `system` and `System` are different words.' },
            { line: 4, kind: 'syntax', fixes: ['System.out.println("Bye");', 'System.out.println("Bye"):', 'System.out.println(Bye);'], why: 'Every instruction ends with `;`.' },
          ],
        },
        {
          type: 'finish',
          title: 'You’ve written real Java.',
          body: 'You know what a language is and how Java runs. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
