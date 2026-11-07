// SPO 101 · Python from zero · Lesson 2: arithmetic symbols and their order, variables as
// labelled boxes (= means "store"), naming rules, updating a box, printing several things, comments.

export default {
  id: 'numbers-and-names',
  title: 'Numbers and names',
  covers: 'Arithmetic in Python, variables, = as “store”, good names, updating values, printing several things, comments',
  minutes: 16,
  sections: [
    {
      name: 'Python as a calculator',
      terms: [
        ['Operator', 'A symbol that does arithmetic: `+` add, `-` subtract, `*` multiply, `/` divide, `**` power.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does `print("Hi")` show?',
          options: [
            { text: 'Hi', correct: true, why: 'The quote marks only mark the start and end of the text; they aren’t shown.' },
            { text: '"Hi"', why: 'The quote marks are not shown.' },
            { text: 'print Hi', why: '`print` is the instruction, not part of what is shown.' },
            { text: 'An error', why: 'It is correct: lowercase `print`, brackets and quotes in pairs.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Keyboard maths',
          title: 'Five symbols to know',
          cards: [
            { title: '+ and -', text: 'Add and subtract, as usual: `5 + 2` is $7$, `5 - 2` is $3$.' },
            { title: '*', text: 'Multiply (the keyboard has no × key): `5 * 2` is $10$.' },
            { title: '/', text: 'Divide (no ÷ key): `5 / 2` is $2.5$.' },
            { title: '**', text: 'Power: `5 ** 2` means $5^2 = 25$.' },
            { title: '( )', text: 'Brackets inside a sum mean “work this out first”, as in maths: `(5 + 1) * 2` is $12$.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Which comes first?',
          body: 'Python follows the usual maths order: brackets, then powers, then `*` and `/`, then `+` and `-`.',
          code: 'print(10 - 2 * 3)\nprint((10 - 2) * 3)',
          options: [
            { out: '4\n24', correct: true, why: 'Line 1: $2 \\times 3 = 6$ first, then $10 - 6 = 4$. Line 2: the brackets first, $8$, then $8 \\times 3 = 24$.' },
            { out: '24\n24', why: 'Without brackets, `*` happens before `-`.' },
            { out: '4\n4', why: 'In line 2 the brackets make the subtraction happen first.' },
            { out: '24\n4', why: 'Check line 1: multiplication comes before subtraction.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ade’s takings',
          body: 'Ade sells each bottle for ₦300 and pays the supplier ₦220 for it. Write the sums inside `print( )`.',
          graph: {
            tasks: [
              { ask: 'He sold $47$ bottles today. Print how much money came in: $47$ times $300$.', code: 'print()', expect: '14100', hint: 'Inside the brackets: `47 * 300`.', solution: 'print(47 * 300)', done: '₦14,100 came in.' },
              { ask: 'Print his **profit**: money in ($47 \\times 300$) minus money out ($47 \\times 220$).', code: 'print()', expect: '3760', hint: '`print(47 * 300 - 47 * 220)`. The multiplications happen before the subtraction.', solution: 'print(47 * 300 - 47 * 220)', done: '₦3,760 profit.' },
              { ask: 'Same answer, shorter: profit per bottle is $300 - 220$. Print $47$ times that, using brackets.', code: 'print()', expect: '3760', hint: '`print(47 * (300 - 220))`. The brackets make the subtraction happen first.', solution: 'print(47 * (300 - 220))', done: 'Same ₦3,760: $47 \\times 80$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Variables: labelled boxes',
      terms: [
        ['Variable', 'A name that holds a value, like a labelled box. `temp = 34` puts $34$ in a box called `temp`.'],
        ['Assignment', 'The `=` sign in Python. It means “store the value on the right in the name on the left”.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Remembering things',
          title: 'A box with a label',
          body: 'Programs need to remember things: today’s temperature, the price, the total so far.\n\nA ==variable== is a box with a name on it. This line\n\n`temp = 34`\n\nmeans: make a box called `temp` and put $34$ in it. Read it as “temp **becomes** 34”.\n\nAfterwards, whenever you write `temp`, Python opens the box and uses what is inside, $34$.',
        },
        {
          type: 'story',
          eyebrow: 'Careful',
          title: '= means “store”, not “equals”',
          body: 'In maths, $=$ says two things are equal. In Python, `=` is an **instruction**: work out the right-hand side, then store the result in the name on the left.\n\nSo `total = 30 + 18` first works out $48$, then puts $48$ in the box `total`.\n\nThe name is always on the left. `34 = temp` is an error: you can’t store something inside the number 34.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ade’s rule of thumb',
          body: 'Ade reckons that above $25$ °C he sells about $10$ more bottles for every extra degree. Notice: `temp` in `print(temp)` has **no** quote marks, so Python shows what is in the box.',
          graph: {
            tasks: [
              { ask: 'Run it: store tomorrow’s temperature, then show it.', code: 'temp = 34\nprint(temp)', expect: '34', hint: 'Run it as it is.', solution: 'temp = 34\nprint(temp)', done: 'Python opened the box `temp` and showed $34$.' },
              { ask: 'The box is still there. Finish the line so `guess` holds `10 * (temp - 25)`, then run.', code: 'guess = \nprint(guess)', expect: '90', hint: 'After `guess = `, type `10 * (temp - 25)`.', solution: 'guess = 10 * (temp - 25)\nprint(guess)', done: '$10 \\times (34 - 25) = 90$ bottles. Python used the $34$ from the box.' },
              { ask: 'Change the first line to `temp = 30` and run all three lines.', code: 'temp = 34\nguess = 10 * (temp - 25)\nprint(guess)', expect: '50', hint: 'Change $34$ to $30$ in the first line only.', solution: 'temp = 30\nguess = 10 * (temp - 25)\nprint(guess)', done: 'New box contents, new answer. That’s the power of variables: change one value and everything that uses it follows.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Naming boxes',
          prompt: 'Names may use letters, digits and `_` (underscore), must not start with a digit, and can’t contain spaces. Which are allowed?',
          options: [
            { text: '`bottles_sold`', correct: true, why: '**Allowed.** Underscores stand in for spaces.' },
            { text: '`day2`', correct: true, why: '**Allowed.** Digits are fine after the first letter.' },
            { text: '`price`', correct: true, why: '**Allowed.** Short and clear.' },
            { text: '`bottles sold`', why: '**Not allowed.** A space splits it into two names.' },
            { text: '`2day`', why: '**Not allowed.** A name can’t start with a digit.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Capitals matter',
          prompt: 'You stored `temp = 34`, then wrote `print(Temp)`. What happens?',
          options: [
            { text: 'An error: Python has no box called `Temp`', correct: true, why: '`temp` and `Temp` are different names. Python reports a `NameError`.' },
            { text: 'It shows 34', why: 'Capital T makes it a different name.' },
            { text: 'It shows Temp', why: 'There are no quote marks, so Python looks for a box, not text.' },
            { text: 'It shows 0', why: 'Python doesn’t invent a value; it stops with an error.' },
          ],
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Updating a box',
          body: 'The right side is worked out first, using what is in the box now.',
          code: 'bottles = 40\nbottles = bottles + 12\nprint(bottles)',
          options: [
            { out: '52', correct: true, why: 'Line 2: take what is in the box ($40$), add $12$, put $52$ back in the same box.' },
            { out: '40', why: 'Line 2 changed the box before the print.' },
            { out: '12', why: 'It adds $12$ to the old value rather than replacing it.' },
            { out: 'bottles', why: 'No quote marks, so Python shows the value in the box, not the word.' },
          ],
        },
      ],
    },
    {
      name: 'Printing several things',
      terms: [
        ['Comment', 'A line (or end of a line) starting with `#`. Python ignores it; it is a note for people.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Commas and notes',
          title: 'Mixing text and numbers',
          body: '`print` can take several things at once, separated by **commas**. It shows them on one line with a space between each:\n\n`print("Guess:", guess, "bottles")` shows `Guess: 90 bottles`.\n\nThe text pieces are in quotes; `guess` isn’t, so its **value** is shown.\n\nAnything after a `#` is a ==comment==: a note for humans that Python skips, like `# price in naira`.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'A sentence for Ade',
          body: 'The first line is a comment. Python skips it.',
          graph: {
            setup: 'temp = 34\nguess = 10 * (temp - 25)',
            tasks: [
              { ask: 'The boxes `temp` ($34$) and `guess` ($90$) are ready. Run it.', code: '# tomorrow’s plan\nprint("Tomorrow:", temp, "degrees")', expect: 'Tomorrow: 34 degrees', hint: 'Run it as it is.', solution: '# tomorrow’s plan\nprint("Tomorrow:", temp, "degrees")', done: 'Three pieces, joined by spaces. The comment line did nothing.' },
              { ask: 'Make it show exactly: `Buy 90 bottles`', code: 'print("Buy", )', expect: 'Buy 90 bottles', hint: 'Three pieces: the text `"Buy"`, the box `guess`, and the text `"bottles"`, separated by commas.', solution: 'print("Buy", guess, "bottles")', done: 'Text in quotes, values from boxes, commas between.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can calculate and remember.',
          body: 'Arithmetic, variables and print. Next: lists, which hold a whole notebook of numbers, and loops, which do something for every one of them.',
        },
      ],
    },
  ],
};
