// MTH 209 · Idea C, lesson 3: linear interpolation. Part 1 draws a line between two points on x²;
// Part 2 does the past-paper sin(1.15) question (each second point in turn, with errors) and ln 2.7.

export default {
  id: 'linear-interpolation',
  title: 'Linear interpolation',
  covers: 'A straight line between two table points, the formula, its error, and choosing the nearest points',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Interpolation', 'Estimating $f(x)$ at a point between the tabulated values.'],
        ['Linear interpolation', '$P_1(x) = f_0 + \\dfrac{x - x_0}{x_1 - x_0}(f_1 - f_0)$: the straight line through $(x_0, f_0)$ and $(x_1, f_1)$.'],
      ],
      steps: [
        'Pick two table points $(x_0, f_0)$, $(x_1, f_1)$, ideally either side of $x$ and as close to it as possible.',
        'Slope $= \\dfrac{f_1 - f_0}{x_1 - x_0}$.',
        '$P_1(x) = f_0 + (x - x_0) \\times$ slope.',
        'Error $= f(x) - P_1(x)$ when the true value is known; relative error $=$ error ÷ true value.',
        'Comment: nearer points and less curvature give smaller error.',
      ],
      examples: [
        {
          title: '$f(x) = x^2$ between $(1, 1)$ and $(3, 9)$',
          question: 'Estimate $f(2)$ by linear interpolation.',
          steps: ['Slope $= \\tfrac{9 - 1}{3 - 1} = 4$.', '$P_1(2) = 1 + (2 - 1)(4) = 5$.', 'True $f(2) = 4$: error $-1$, because the curve bends below the chord.'],
          answer: '$P_1(2) = 5$ (true $4$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea C · Lesson 3',
          title: 'Reading between the lines',
          body: 'A table gives $f$ only at certain points. What about in between, say the 2015 population from 2010 and 2020 census figures? **Interpolation** estimates it.\n\nThe simplest way: join the two nearest points with a **straight line** and read off the value. Quick, and often good enough, if the points are close.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Join the dots',
          body: 'Between $(x_0, f_0)$ and $(x_1, f_1)$ the line rises by $f_1 - f_0$ over a run of $x_1 - x_0$. Go a distance $x - x_0$ along it:\n$$P_1(x) = f_0 + \\frac{x - x_0}{x_1 - x_0}(f_1 - f_0).$$\nThe error comes from the **curvature** of $f$: the chord cuts across the curve. The closer the points, the less room to bend.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Linear interpolation, step by step',
          body: '1. Choose two points, close to $x$ and on either side if possible.\n2. Slope $= \\dfrac{f_1 - f_0}{x_1 - x_0}$.\n3. $P_1(x) = f_0 + (x - x_0) \\times$ slope.\n4. Error $= f(x) - P_1(x)$; relative error $=$ error ÷ $f(x)$.\n5. Comment on accuracy: nearer points are better.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2$ from $(1, 1)$ and $(3, 9)$',
          body: '**Step 2.** Slope $= \\tfrac{9 - 1}{3 - 1} = 4$.\n\n**Step 3.** $P_1(2) = 1 + (2 - 1) \\times 4 = 5$.\n\n**Step 4.** True $2^2 = 4$, so the error is $-1$ ($25\\%$ relative): the parabola sags below its chord.\n\n**Step 5.** Using $(1, 1)$ and $(2.5, 6.25)$ would be better, since the points are closer.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$\\ln 2.7$ from $\\ln 2.5 = 0.91629$ and $\\ln 3 = 1.09861$',
          graph: {
            steps: [
              { ask: 'Slope $\\tfrac{1.09861 - 0.91629}{0.5}$, to 5 dp?', answer: 0.36464, tol: 0.00002, hint: '$\\tfrac{0.18232}{0.5}$.' },
              { ask: '$P_1(2.7) = 0.91629 + 0.2 \\times 0.36464$, to 5 dp?', answer: 0.98922, tol: 0.00002, hint: '$0.91629 + 0.07293$.' },
              { ask: 'True $\\ln 2.7 = 0.99325$. Error, to 5 dp?', answer: 0.00403, tol: 0.00002, hint: '$0.99325 - 0.98922$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Estimate** a value by linear interpolation from a table.\n• **Vary** the second point (“choose the second data point to be each of the remaining points”), finding the error and relative error each time, and **comment** on accuracy.\n• **Explain** why the error grows as the points spread out.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Make a table: second point $x_1$ | slope | $P_1(x)$ | error | relative error.',
        'Use the true value (here $\\sin 1.15 = 0.91276$, calculator in radians) for the errors.',
        'Comment: the error grows as $x_1$ moves away, because the chord spans more curvature.',
        'Keep 4–5 dp; the errors are small differences of close numbers.',
        'Mistake: using degrees. These tables of $\\sin x$ are in radians.',
      ],
      examples: [
        {
          title: '$\\sin 1.15$ from $x_0 = 1.00$, $y_0 = 0.8415$',
          question: 'Using the table $x = 1.0, 1.25, 1.5, 1.75, 2.0$, $\\sin x = 0.8415, 0.9490, 0.9975, 0.9840, 0.9093$, estimate $\\sin 1.15$ by linear interpolation with the second point each of the four others. Find each error and relative error.',
          steps: ['$x_1 = 1.25$: $P = 0.8415 + 0.15 \\times \\tfrac{0.1075}{0.25} = 0.9060$; error $0.0068$, relative $0.0074$.', '$x_1 = 1.5$: $P = 0.8883$; error $0.0245$, relative $0.0268$.', '$x_1 = 1.75$: $P = 0.8700$; error $0.0428$, relative $0.0469$.', '$x_1 = 2.0$: $P = 0.8517$; error $0.0611$, relative $0.0669$.'],
          answer: 'Nearest point ($1.25$) is best; the error grows steadily as $x_1$ moves away (true $\\sin 1.15 = 0.9128$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: '$\\sin 1.15$, four ways',
          body: '“Use linear interpolation to estimate $\\sin(1.15)$ using the data point at $x_0 = 1.00$, $y_0 = 0.8415$, and choose the second data point to be each of the four remaining points. Comment on the accuracy. At each stage, find the error and relative error.”\n\n**What the examiner wants:** a neat table of the four estimates with errors, and a **comment**: the closer the second point, the better. The full table is in **Examples**.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$\\sin 1.15$ with $x_1 = 1.25$, then $2.0$',
          graph: {
            steps: [
              { ask: 'With $x_1 = 1.25$: $P = 0.8415 + 0.15 \\times \\tfrac{0.9490 - 0.8415}{0.25}$, to 4 dp?', answer: 0.906, tol: 0.0002, hint: '$0.15 \\times 0.43 = 0.0645$.' },
              { ask: 'Error $0.9128 - 0.9060$?', answer: 0.0068, tol: 0.0002, hint: 'True minus estimate.' },
              { ask: 'With $x_1 = 2.0$: $P = 0.8415 + 0.15 \\times \\tfrac{0.9093 - 0.8415}{1}$, to 4 dp?', answer: 0.8517, tol: 0.0002, hint: '$0.15 \\times 0.0678$.' },
              { ask: 'Comment:', options: ['The nearest second point gives the smallest error', 'The farthest point is best', 'They are all equally good'], answer: 0, hint: 'Compare $0.0068$ with $0.0611$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student gets $\\sin 1.15 \\approx 0.0200$ by interpolating between $\\sin 1.0$ and $\\sin 1.25$ on a calculator. What went wrong?',
          options: [
            { text: 'The calculator was in degrees; $\\sin x$ here is in radians', correct: true, why: '$\\sin 1° = 0.0175$. In radians $\\sin 1 = 0.8415$, matching the table.' },
            { text: 'The formula is wrong', why: 'The formula is fine; the values are wrong.' },
            { text: 'Interpolation can’t estimate $\\sin$', why: 'It can; the table values were miscomputed.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$\\sin 1.15$ with $x_1 = 1.5$',
          graph: {
            steps: [
              { ask: 'Slope $\\tfrac{0.9975 - 0.8415}{0.5}$?', answer: 0.312, tol: 0.0002, hint: '$\\tfrac{0.156}{0.5}$.' },
              { ask: '$P = 0.8415 + 0.15 \\times 0.312$, to 4 dp?', answer: 0.8883, tol: 0.0002, hint: '$0.8415 + 0.0468$.' },
              { ask: 'Relative error $\\tfrac{0.9128 - 0.8883}{0.9128}$, to 4 dp?', answer: 0.0268, tol: 0.0003, hint: '$\\tfrac{0.0245}{0.9128}$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can interpolate with a straight line.',
          body: '**Summary:** $P_1(x) = f_0 + \\tfrac{x - x_0}{x_1 - x_0}(f_1 - f_0)$; error comes from curvature; nearer points are better; report error and relative error.\n\n**Next:** **higher-degree interpolation**. Use three or more points and a curve (Lagrange’s polynomial) to follow the bend and shrink the error.',
        },
      ],
    },
  ],
};
