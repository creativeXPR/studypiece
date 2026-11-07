// SPO 101 · Python from zero · Lesson 1: what a program is, the editor and Run button, print,
// brackets and quote marks, reading errors, and text versus numbers. Assumes nothing.

export default {
  id: 'first-program',
  title: 'Your first program',
  covers: 'What a program is, the editor and Run button, print, quote marks and brackets, errors, text and numbers',
  minutes: 16,
  sections: [
    {
      name: 'What a program is',
      terms: [
        ['Program', 'A list of instructions for a computer, carried out in order, one at a time.'],
        ['Programming language', 'A small set of words and symbols with exact meanings, used to write programs. Python is one.'],
        ['Code', 'The text of a program.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Python from zero',
          title: 'Computers only follow instructions',
          body: 'A computer can’t decide anything by itself. It does exactly what it is told, one instruction at a time, very fast.\n\nA list of instructions is called a ==program==, a bit like a recipe: do this, then this, then this.\n\nComputers don’t reliably understand everyday English, so we write instructions in a ==programming language==: a small set of words and symbols that each mean one exact thing. The written instructions are called ==code==.',
          cta: 'Why Python?',
        },
        {
          type: 'story',
          eyebrow: 'Python',
          title: 'The language of machine learning',
          body: '==Python== is a programming language that reads almost like English. It is the language machine learning is written in: the tools, the courses and the research all use it.\n\nYou don’t need to install anything yet. On the coming screens, Python runs right here in your browser, and nothing you type can harm your phone or computer. (A later chapter shows how to set it up on your own PC.)',
        },
        {
          type: 'reveal',
          eyebrow: 'Your workspace',
          title: 'Three things you’ll see on code screens',
          cards: [
            { title: 'The dark box', text: 'The ==editor==. You type your instructions here, like a notepad. Tap inside it to type.' },
            { title: 'The Run button', text: 'The big blue button. It hands your code to Python, which carries it out, top line first.' },
            { title: 'The Output box', text: 'Appears under the editor after a run. It shows what Python printed, or a message if it got confused.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'You give a computer a program with five instructions. What does it do?',
          options: [
            { text: 'Carries them out exactly, in order, from the first to the last', correct: true, why: 'Exactly as written, in order. That is why small typing mistakes matter.' },
            { text: 'Works out what you meant and fixes your mistakes', why: 'It can’t guess what you meant. It follows what you wrote.' },
            { text: 'Picks the most important one', why: 'It does all of them, in order.' },
            { text: 'Nothing until you explain them in English', why: 'The program itself is the explanation, written in Python.' },
          ],
        },
      ],
    },
    {
      name: 'Your first instruction',
      terms: [
        ['print', 'The instruction that shows something in the Output box: `print("Hello")`.'],
        ['Brackets ( )', 'Round brackets after an instruction hold the thing you give it.'],
        ['Quote marks " "', 'Mark where a piece of text starts and ends.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'One line, piece by piece',
          title: '`print("Hello, Ade!")`',
          body: '`print` is the name of an instruction. It means: **show this in the Output box**.\n\n`(` and `)` are round brackets. Whatever is between them is what you hand to `print`.\n\n`"` and `"` are quote marks. They tell Python **this is text**: start here, stop there. Python shows the text inside, without the quote marks.\n\nSo the whole line means: show the text Hello, Ade!',
          cta: 'Run it',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Make the computer speak',
          body: 'Press the blue **Run** button below.',
          graph: {
            tasks: [
              { ask: 'Press **Run**.', code: 'print("Hello, Ade!")', expect: 'Hello, Ade!', hint: 'Run the code exactly as it is.', solution: 'print("Hello, Ade!")', done: 'Your first program ran. The quote marks don’t appear: they only mark where the text starts and ends.' },
              { ask: 'Tap the dark box, replace **Ade** with your own name, then press **Run**.', code: 'print("Hello, Ade!")', match: '^Hello, (?!Ade!$).+', hint: 'Change only the name. Keep both quote marks and both brackets.', solution: 'print("Hello, Tunde!")', done: 'You changed a program and ran it again. That is most of what programmers do all day.' },
              { ask: 'A program can have many lines. Run this one and see which line prints first.', code: 'print("Cold drinks!")\nprint("300 naira each")', expect: 'Cold drinks!\n300 naira each', hint: 'Run it as it is.', solution: 'print("Cold drinks!")\nprint("300 naira each")', done: 'Top line first, then the next: Python reads from top to bottom.' },
            ],
          },
        },
        {
          type: 'order',
          eyebrow: 'Put it together',
          prompt: 'Put the pieces of a print line in the right order:',
          items: ['The instruction name `print`', 'An opening bracket `(`', 'An opening quote mark `"`', 'The text to show', 'A closing quote mark `"`', 'A closing bracket `)`'],
          explain: 'Instruction name, open bracket, open quote, the text, close quote, close bracket: `print("Hello")`.',
        },
        {
          type: 'story',
          eyebrow: 'Mistakes are normal',
          title: 'Errors are Python asking for help',
          body: 'Every character matters. If a quote mark or bracket is missing, or `print` is spelt `Print`, Python stops and shows an ==error message== instead.\n\nThe error isn’t a disaster and doesn’t break anything. It is Python saying “I got confused here.” The **last line** of the message names the problem. Here, a plain-English tip appears under it too.\n\nProfessional programmers see errors every few minutes. Fixing them is part of the job.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Bug fixing',
          title: 'Fix the broken lines',
          body: 'Each line below has one small mistake. Run it first to see the error, then fix it.',
          graph: {
            tasks: [
              { ask: 'This should show **Hello**. Run it, read the error, then fix it.', code: 'print("Hello)', expect: 'Hello', hint: 'The text has an opening quote mark but no closing one. Add `"` just before the `)`.', solution: 'print("Hello")', done: 'Fixed: every opening quote needs a closing quote.' },
              { ask: 'This should show **Hi**.', code: 'Print("Hi")', expect: 'Hi', hint: 'Python cares about capital letters: the instruction is `print`, all lowercase.', solution: 'print("Hi")', done: 'Fixed: `print` and `Print` are different words to Python.' },
              { ask: 'This should show **Thank you**.', code: 'print("Thank you"', expect: 'Thank you', hint: 'An opening bracket `(` with no closing bracket `)`. Add `)` at the end.', solution: 'print("Thank you")', done: 'Fixed: brackets come in pairs too.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Text and numbers',
      terms: [
        ['Text (string)', 'Letters, words or symbols inside quote marks: `"hello"`. Programmers call text a string.'],
        ['Number', 'Written without quote marks: `34`, `2.5`. Python can do arithmetic with numbers.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Two kinds of values',
          title: 'Text has quotes; numbers don’t',
          body: 'Python treats **text** and **numbers** differently.\n\n`print(2 + 3)` has no quote marks, so Python sees numbers and **works it out**: it shows `5`.\n\n`print("2 + 3")` has quote marks, so Python sees text and shows it **exactly as typed**: `2 + 3`.\n\nProgrammers call a piece of text a ==string== (a string of characters).',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Quotes or no quotes?',
          body: 'What does this show?',
          code: 'print("10 + 5")\nprint(10 + 5)',
          options: [
            { out: '10 + 5\n15', correct: true, why: 'The first line is text in quotes, shown as typed. The second is numbers, so Python works it out.' },
            { out: '15\n15', why: 'The quote marks in the first line make it text, so it isn’t worked out.' },
            { out: '10 + 5\n10 + 5', why: 'The second line has no quotes, so Python does the sum.' },
            { out: '15\n10 + 5', why: 'Python goes top to bottom, and the first line is the text one.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Let Python count',
          body: 'Numbers go inside the brackets **without** quote marks.',
          graph: {
            tasks: [
              { ask: 'Ade has $4$ crates with $12$ bottles in each. In Python, `*` means **times** (there is no × key). Run it.', code: 'print(4 * 12)', expect: '48', hint: 'Run it as it is.', solution: 'print(4 * 12)', done: '48 bottles. You will meet `*` everywhere in code.' },
              { ask: 'He sold $30$ bottles in the morning and $18$ in the afternoon. Print the total.', code: 'print()', expect: '48', hint: 'Put the sum inside the brackets: `print(30 + 18)`.', solution: 'print(30 + 18)', done: 'Python did the sum. No quote marks, so it was treated as numbers.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which line shows the number **48**?',
          options: [
            { text: '`print(4 * 12)`', correct: true, why: 'Numbers without quotes are worked out: $4 \\times 12 = 48$.' },
            { text: '`print("4 * 12")`', why: 'Quote marks make it text, so it shows `4 * 12`.' },
            { text: '`print(4 x 12)`', why: 'Python uses `*` for times. `x` would confuse it.' },
            { text: '`Print(4 * 12)`', why: 'Capital P: Python doesn’t know `Print`.' },
          ],
        },
        {
          type: 'finish',
          title: 'You wrote your first programs.',
          body: 'You can run code, show text and numbers, and fix small errors. Next: Python as a calculator, and how to make it remember things.',
        },
      ],
    },
  ],
};
