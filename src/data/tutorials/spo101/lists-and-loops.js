// SPO 101 · Python from zero · Lesson 3: lists (square brackets, positions from 0, len/sum/max),
// then for-loops explained word by word (the colon, the indented body), and running totals.

const DATA = 'temps = [26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36]\nbottles = [14, 18, 31, 38, 47, 53, 58, 71, 77, 92, 96, 108]';

export default {
  id: 'lists-and-loops',
  title: 'Lists and loops',
  covers: 'Lists, positions counted from 0, len, sum, max and min, for-loops, indentation, running totals',
  minutes: 18,
  sections: [
    {
      name: 'Lists',
      terms: [
        ['List', 'Many values kept in order in one variable: `[26, 27, 28]`.'],
        ['Index', 'A value’s position in a list, counted from 0: `temps[0]` is the first.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'After `price = 300`, what does `print(price * 2)` show?',
          options: [
            { text: '600', correct: true, why: 'Python opens the box `price` ($300$) and multiplies by $2$.' },
            { text: 'price * 2', why: 'No quote marks, so it is worked out, not shown as text.' },
            { text: '300', why: 'The `* 2` doubles it.' },
            { text: 'An error', why: '`price` was stored first, so Python knows it.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Many values in one box',
          title: 'Ade’s whole notebook',
          body: 'Ade has twelve days of temperatures. Twelve separate boxes (`day1`, `day2`, …) would be clumsy. Instead, use one ==list==:\n\n`temps = [26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36]`\n\n**Square brackets** `[ ]` hold the list; **commas** separate the values; the order is kept.\n\nIn machine learning, data is mostly long lists of numbers like this.',
        },
        {
          type: 'story',
          eyebrow: 'Positions',
          title: 'Counting starts at 0',
          body: 'Each value has a position, its ==index==. Python counts positions **from 0**: think of it as “how many steps from the start”.\n\n`temps[0]` is the first value, $26$ (zero steps in).\n`temps[1]` is the second, $27$.\n`temps[11]` is the twelfth and last, $36$.\n\nSquare brackets **after** a list name mean “the value at this position”.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Reading from the list',
          body: 'Ade’s two lists: `temps` (temperatures) and `bottles` (bottles sold), day by day in the same order.',
          graph: {
            tasks: [
              { ask: 'Run it to see the first day’s temperature.', code: `${DATA}\nprint(temps[0])`, expect: '26', hint: 'Run it as it is.', solution: `${DATA}\nprint(temps[0])` },
              { ask: 'Print the bottles sold on the **third** day. (Third means index $2$.)', code: 'print(bottles[])', expect: '31', hint: 'Day 1 is index 0, day 2 is index 1, so day 3 is index 2: `bottles[2]`.', solution: 'print(bottles[2])', done: '$31$ bottles on day 3.' },
            ],
          },
        },
        {
          type: 'reveal',
          eyebrow: 'Ready-made helpers',
          title: 'Instructions that work on whole lists',
          cards: [
            { title: 'len( )', text: '**Length**: how many values. `len(temps)` is $12$.' },
            { title: 'sum( )', text: 'Adds every value. `sum(bottles)` is the total sold.' },
            { title: 'max( ) and min( )', text: 'The largest and the smallest value.' },
            { title: 'Combine them', text: '`sum(bottles) / len(bottles)` is the **average**: total divided by how many.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Twelve days in one line each',
          body: 'The lists are already loaded.',
          graph: {
            setup: DATA,
            tasks: [
              { ask: 'Print how many days are in the notebook.', code: 'print(len(temps))', expect: '12', hint: 'Run it as it is.', solution: 'print(len(temps))' },
              { ask: 'Print the **total** bottles sold over all twelve days.', code: 'print()', expect: '703', hint: '`print(sum(bottles))`.', solution: 'print(sum(bottles))', done: '$703$ bottles in twelve days.' },
              { ask: 'Print the best day’s sales.', code: 'print()', expect: '108', hint: 'The largest value: `print(max(bottles))`.', solution: 'print(max(bottles))' },
              { ask: 'Print the **average** bottles per day.', code: 'print()', expect: '58.583333333333336', hint: 'Total divided by how many: `print(sum(bottles) / len(bottles))`.', solution: 'print(sum(bottles) / len(bottles))', done: 'About $58.6$ a day. An average is the simplest prediction of all: the same number every day, whatever the weather.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Loops',
      terms: [
        ['Loop', 'Repeats some lines once for each value in a list: `for t in temps:`'],
        ['Indentation', 'Spaces at the start of a line. In Python, 4 spaces mark the lines that belong to a loop (its body).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Doing it for every day',
          title: 'A loop, word by word',
          body: 'To use Ade’s rule of thumb on all twelve days, you don’t write twelve lines. You write a ==loop==:\n\n`for t in temps:`\n`    print(10 * (t - 25))`\n\n`for t in temps` means: take each value in `temps` in turn, and call it `t`.\n\nThe colon `:` at the end means “here comes what to repeat”.\n\nThe next line starts with **4 spaces**. That ==indentation== shows it belongs inside the loop. Python repeats it twelve times, with `t` being $26$, then $27$, and so on.',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Three times round',
          body: 'What does this show?',
          code: 'for n in [1, 2, 3]:\n    print(n * 10)\nprint("done")',
          options: [
            { out: '10\n20\n30\ndone', correct: true, why: 'The indented line runs once for each value. `print("done")` isn’t indented, so it runs once, after the loop.' },
            { out: '10\ndone\n20\ndone\n30\ndone', why: '`print("done")` isn’t indented, so it isn’t part of the loop.' },
            { out: '60\ndone', why: 'The loop doesn’t add; it prints each $n \\times 10$ separately.' },
            { out: '1\n2\n3\ndone', why: 'Each value is multiplied by $10$ before printing.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ade’s rule for every day',
          body: 'Press Tab in the editor to type 4 spaces.',
          graph: {
            setup: DATA,
            tasks: [
              { ask: 'Run it: a guess for every temperature in the notebook.', code: 'for t in temps:\n    print(t, "degrees: guess", 10 * (t - 25))', test: 'True', hint: 'Run it as it is. If you changed the spaces, put 4 spaces back before `print`.', solution: 'for t in temps:\n    print(t, "degrees: guess", 10 * (t - 25))', done: 'Twelve lines of output from two lines of code.' },
              { ask: 'Remove the 4 spaces before `print`, then run. (You’ll see an error on purpose.)', code: 'for t in temps:\n    print(t)', error: 'IndentationError', hint: 'Delete the spaces at the start of line 2 so `print` sits at the very left.', solution: 'for t in temps:\nprint(t)', done: 'Python stopped: after a colon, it expects indented lines.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'A useful pattern',
          title: 'Keeping a running total',
          body: 'Here is how `sum` works inside:\n\n`total = 0`\n`for b in bottles:`\n`    total = total + b`\n`print(total)`\n\nStart a box at $0$. Each time round the loop, add the next value to it. After the loop, the box holds the grand total.\n\nYou’ll see this “start at zero, add as you go” pattern again and again, including when a model adds up its mistakes.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Add it up yourself',
          body: 'The lists are loaded.',
          graph: {
            setup: DATA,
            tasks: [
              { ask: 'Run the running total.', code: 'total = 0\nfor b in bottles:\n    total = total + b\nprint(total)', expect: '703', hint: 'Run it as it is.', solution: 'total = 0\nfor b in bottles:\n    total = total + b\nprint(total)', done: '$703$, the same as `sum(bottles)`.' },
              { ask: 'Change it to add up the **money**: each bottle brings in ₦300, so add `b * 300` each time.', code: 'total = 0\nfor b in bottles:\n    total = total + b\nprint(total)', expect: '210900', hint: 'In line 3, change `+ b` to `+ b * 300`.', solution: 'total = 0\nfor b in bottles:\n    total = total + b * 300\nprint(total)', done: '₦210,900 over twelve days.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Why is `print(total)` **not** indented in the running-total program?',
          options: [
            { text: 'So it runs once, after the loop has finished', correct: true, why: 'Indented, it would print after every addition: twelve times.' },
            { text: 'Because print can never be indented', why: 'It can: then it would run every time round the loop.' },
            { text: 'To make it run first', why: 'Python still goes top to bottom; it runs after the loop.' },
            { text: 'It makes no difference', why: 'It does: indentation decides what is repeated.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can handle a whole dataset.',
          body: 'Lists hold the data; loops work through it. Next: making decisions with `if`.',
        },
      ],
    },
  ],
};
