// SPO 101 · Python from zero · Lesson 5: functions (def, inputs, return, calling), Ade's first
// model as a function, and loading ready-made tools with import.

export default {
  id: 'functions',
  title: 'Your own instructions',
  covers: 'Functions: def, inputs, return and calling; a model as a function; import',
  minutes: 14,
  sections: [
    {
      name: 'Functions',
      terms: [
        ['Function', 'A named, reusable recipe. `def` creates one; writing its name with brackets runs it.'],
        ['Input (argument)', 'The value you hand to a function inside the brackets: in `predict(34)` it is $34$.'],
        ['return', 'Hands the function’s answer back to whoever called it.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which line asks “is `temp` equal to 30?” without changing anything?',
          options: [
            { text: '`temp == 30`', correct: true, why: 'Two equals signs ask a question; the answer is `True` or `False`.' },
            { text: '`temp = 30`', why: 'One `=` stores $30$ in `temp`.' },
            { text: '`if temp:`', why: 'That doesn’t compare with $30$.' },
            { text: '`temp > 30`', why: 'That asks “more than”, not “equal to”.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Recipes with names',
          title: 'You’ve been using functions all along',
          body: '`print`, `len`, `sum` and `max` are ==functions==: named recipes. You **call** one by writing its name and brackets, with the input inside: `len(temps)`.\n\nSome functions just do something (`print` shows text). Others hand back an answer you can use: `len(temps)` gives $12$, which you can store or print.\n\nNow you’ll make your own.',
        },
        {
          type: 'story',
          eyebrow: 'Making one',
          title: 'Ade’s rule as a function',
          body: '`def predict(t):`\n`    return 10 * (t - 25)`\n\n`def` means **define**: “I’m making a new function.”\n`predict` is the name you choose.\n`(t)` says it takes one input, which will be called `t` inside.\nThe colon and the indented line are the recipe.\n`return` means: **work this out and hand it back**.\n\nDefining it does nothing visible yet. It only teaches Python the recipe. Calling `predict(34)` runs it with `t` as $34$, and gives back $90$.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ade’s first model',
          body: 'Remember: the line under `def` must be indented by 4 spaces.',
          graph: {
            tasks: [
              { ask: 'Finish the recipe: after `return`, type `10 * (t - 25)`. Then run.', code: 'def predict(t):\n    return \n\nprint(predict(34))', expect: '90', hint: 'Line 2 should read `    return 10 * (t - 25)`.', solution: 'def predict(t):\n    return 10 * (t - 25)\n\nprint(predict(34))', done: 'You defined a function and called it with $34$.' },
              { ask: 'Use it again: print the guess for a $28$ °C day.', code: 'print()', expect: '30', hint: 'Call the function inside print: `print(predict(28))`.', solution: 'print(predict(28))', done: 'Write the recipe once, use it as often as you like.' },
              { ask: 'Use it in a loop: print a guess for each of `[29, 31, 33]`.', code: 'for t in [29, 31, 33]:\n    print()', expect: '40\n60\n80', hint: 'Inside the loop: `print(predict(t))`.', solution: 'for t in [29, 31, 33]:\n    print(predict(t))', done: 'Functions and loops together: a prediction for every input.' },
            ],
          },
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'Two inputs',
          body: 'A function can take several inputs, separated by commas.',
          code: 'def profit(sold, price):\n    return sold * (price - 220)\n\nprint(profit(10, 300))',
          options: [
            { out: '800', correct: true, why: '`sold` is $10$ and `price` is $300$: $10 \\times (300 - 220) = 800$.' },
            { out: '3000', why: 'That is the money in; the function subtracts the ₦220 cost first.' },
            { out: '80', why: 'That’s the profit on one bottle; it is multiplied by $10$.' },
            { out: 'profit', why: 'The function is called, and its answer is printed.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'In `predict`, the $10$ (bottles per degree) is Ade’s gut feeling. What does machine learning change?',
          options: [
            { text: 'It chooses that number from his past data, so it fits the real days best', correct: true, why: 'The shape of the recipe stays; the number, called a ==parameter==, is learned. That’s Chapter 4.' },
            { text: 'It makes the function longer', why: 'It can stay this short. What changes is how the number is chosen.' },
            { text: 'It removes the need for data', why: 'Learning needs data.' },
            { text: 'Nothing: 10 is always right', why: 'His notebook suggests a slightly different number, as you’ll see.' },
          ],
          explain: 'A trained model is, in the end, a function: features go in, a prediction comes out.',
        },
      ],
    },
    {
      name: 'Borrowing tools',
      terms: [
        ['Library (package)', 'A collection of ready-made functions someone else wrote, which you load with `import`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Standing on shoulders',
          title: 'import: other people’s functions',
          body: 'Nobody writes everything from scratch. Thousands of ready-made functions are bundled into ==libraries== (also called packages).\n\n`import statistics` loads one that comes with Python. After that, `statistics.median(bottles)` uses its `median` function: the name of the library, a dot, then the function.\n\nMachine learning runs on a few famous libraries you will meet in this course: **pandas** for tables, **NumPy** for fast maths, **scikit-learn** for classic models, and **PyTorch** for neural networks.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Your first import',
          body: 'The median is the middle value when the list is sorted.',
          graph: {
            setup: 'bottles = [14, 18, 31, 38, 47, 53, 58, 71, 77, 92, 96, 108]',
            tasks: [
              { ask: 'Run it: the median bottles sold.', code: 'import statistics\n\nprint(statistics.median(bottles))', expect: '55.5', hint: 'Run it as it is.', solution: 'import statistics\n\nprint(statistics.median(bottles))', done: 'With an even number of values, the median is halfway between the middle two: $53$ and $58$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'What you can now read',
          body: 'Look how far you’ve come. You can read code like this and say what it does:\n\n`import statistics`\n`def predict(t):`\n`    return 10 * (t - 25)`\n`for t in temps:`\n`    if t >= 32:`\n`        print(t, predict(t))`\n\nIt loads a library, defines a model, loops over the data, and makes a decision for each day. That is the skeleton of real machine-learning code.',
        },
        {
          type: 'finish',
          title: 'Python from zero: done.',
          body: 'Printing, numbers, variables, lists, loops, decisions, functions and libraries. Next chapter: real data, in tables.',
        },
      ],
    },
  ],
};
