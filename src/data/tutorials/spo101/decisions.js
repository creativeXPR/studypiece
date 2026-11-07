// SPO 101 · Python from zero · Lesson 4: True and False, comparisons (== versus =), if / else,
// and decisions inside a loop (counting hot days).

const DATA = 'temps = [26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36]\nbottles = [14, 18, 31, 38, 47, 53, 58, 71, 77, 92, 96, 108]';

export default {
  id: 'decisions',
  title: 'Making decisions',
  covers: 'True and False, comparing values, == versus =, if and else, decisions inside a loop',
  minutes: 14,
  sections: [
    {
      name: 'Yes-or-no questions',
      terms: [
        ['Boolean', 'One of two values, `True` or `False`: the answer to a yes-or-no question.'],
        ['Comparison', '`>` greater than, `<` less than, `>=` at least, `<=` at most, `==` equal to, `!=` not equal to.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In `for t in temps:`, what is `t`?',
          options: [
            { text: 'Each temperature in turn, one per trip round the loop', correct: true, why: 'First $26$, then $27$, and so on to $36$.' },
            { text: 'The whole list', why: 'That’s `temps`. `t` takes one value at a time.' },
            { text: 'The number of days', why: 'That would be `len(temps)`.' },
            { text: 'A spelling mistake', why: 'It is a name you choose for “the current value”.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Asking questions',
          title: 'Python can answer yes or no',
          body: 'Ade wants a rule: **if** tomorrow is hotter than $30$ °C, buy extra crates.\n\nFirst Python needs to answer the question “is `temp` more than 30?”. Writing `temp > 30` asks exactly that, and the answer is one of two special values: `True` or `False` (capital first letter, no quote marks).\n\nThe comparison symbols: `>` more than, `<` less than, `>=` at least, `<=` at most, `==` equal to, `!=` not equal to.',
        },
        {
          type: 'story',
          eyebrow: 'A classic mix-up',
          title: '`=` stores; `==` asks',
          body: 'One `=` means **store**: `temp = 34` puts $34$ in the box.\n\nTwo, `==`, means **ask “are these equal?”**: `temp == 34` doesn’t change anything; it answers `True` or `False`.\n\nMixing them up is one of the most common beginner errors, so it’s worth saying aloud: “equals equals” is a question.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ask Python',
          body: 'Each print shows `True` or `False`.',
          graph: {
            tasks: [
              { ask: 'Run it.', code: 'temp = 34\nprint(temp > 30)\nprint(temp == 30)', expect: 'True\nFalse', hint: 'Run it as it is.', solution: 'temp = 34\nprint(temp > 30)\nprint(temp == 30)', done: '$34$ is more than $30$ (True) but not equal to $30$ (False).' },
              { ask: 'Ask whether `temp` is **at least** $34$.', code: 'print()', expect: 'True', hint: '“At least” is `>=`: `print(temp >= 34)`.', solution: 'print(temp >= 34)', done: '$34 \\ge 34$: True.' },
            ],
          },
        },
      ],
    },
    {
      name: 'if and else',
      terms: [
        ['if', 'Runs its indented lines only when the question after it is `True`.'],
        ['else', 'Runs its indented lines when the `if` question was `False`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Choosing what to do',
          title: 'if … else …',
          body: '`if temp > 30:`\n`    print("Buy 8 crates")`\n`else:`\n`    print("Buy 5 crates")`\n\n`if` is followed by a question and a colon. The indented line under it runs **only if** the answer is `True`.\n\n`else:` means “otherwise”. Its indented line runs only if the answer was `False`.\n\nExactly one of the two runs, never both. Same rules as loops: colon, then 4 spaces.',
        },
        {
          type: 'predict',
          eyebrow: 'Predict',
          title: 'A cool day',
          body: 'What does this show?',
          code: 'temp = 27\nif temp > 30:\n    print("Buy 8 crates")\nelse:\n    print("Buy 5 crates")',
          options: [
            { out: 'Buy 5 crates', correct: true, why: '$27 > 30$ is False, so the `if` part is skipped and the `else` part runs.' },
            { out: 'Buy 8 crates', why: 'That runs only when the question is True.' },
            { out: 'Buy 8 crates\nBuy 5 crates', why: 'Only one of the two parts ever runs.' },
            { out: 'False', why: 'The question is used to choose; it isn’t printed.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ade’s buying rule',
          body: 'Change the first line and run again to test the rule.',
          graph: {
            tasks: [
              { ask: 'Run it for $34$ °C.', code: 'temp = 34\nif temp > 30:\n    print("Buy 8 crates")\nelse:\n    print("Buy 5 crates")', expect: 'Buy 8 crates', hint: 'Run it as it is.', solution: 'temp = 34\nif temp > 30:\n    print("Buy 8 crates")\nelse:\n    print("Buy 5 crates")' },
              { ask: 'Now try a $28$ °C day.', code: 'temp = 34\nif temp > 30:\n    print("Buy 8 crates")\nelse:\n    print("Buy 5 crates")', expect: 'Buy 5 crates', hint: 'Change only the first line to `temp = 28`.', solution: 'temp = 28\nif temp > 30:\n    print("Buy 8 crates")\nelse:\n    print("Buy 5 crates")', done: 'Same program, different input, different decision.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Decisions in a loop',
          title: 'Counting the hot days',
          body: 'Put an `if` inside a loop to count only some values:\n\n`hot = 0`\n`for t in temps:`\n`    if t >= 32:`\n`        hot = hot + 1`\n`print(hot)`\n\nThe `if` is indented once (it belongs to the loop). The line under the `if` is indented **twice**, 8 spaces (it belongs to the `if`).',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'How many hot days?',
          body: 'Ade’s lists are loaded.',
          graph: {
            setup: DATA,
            tasks: [
              { ask: 'Run it: count the days of $32$ °C or more.', code: 'hot = 0\nfor t in temps:\n    if t >= 32:\n        hot = hot + 1\nprint(hot)', expect: '5', hint: 'Run it as it is.', solution: 'hot = 0\nfor t in temps:\n    if t >= 32:\n        hot = hot + 1\nprint(hot)', done: '5 hot days: $32, 33, 34, 35, 36$.' },
              { ask: 'Count the days when he sold **more than 50** bottles instead.', code: 'busy = 0\nfor b in bottles:\n    if :\n        busy = busy + 1\nprint(busy)', expect: '7', hint: 'The question after `if` is `b > 50`.', solution: 'busy = 0\nfor b in bottles:\n    if b > 50:\n        busy = busy + 1\nprint(busy)', done: '7 busy days. Counting how often something happens is how you’ll later score a model.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Ade’s rule “if hotter than 30, buy 8 crates” was **written by a person**. How is a machine-learning model different?',
          options: [
            { text: 'It learns where to draw the line (and how many crates) from past data', correct: true, why: 'A decision tree (Chapter 6) learns `if` questions like `temp > 30.5` from examples, instead of someone guessing them.' },
            { text: 'It never uses if-questions', why: 'Some models are literally learned stacks of if-questions.' },
            { text: 'It needs no data', why: 'Learning needs data.' },
            { text: 'There is no difference', why: 'The difference is who chooses the rule: a person or the data.' },
          ],
        },
        {
          type: 'finish',
          title: 'Your programs can decide.',
          body: 'Comparisons, `True` and `False`, `if` and `else`. Next: package a rule as your own instruction, a function.',
        },
      ],
    },
  ],
};
