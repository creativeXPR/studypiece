// MTH 209 · Idea D, lesson 2: Euler's method. Part 1 derives yᵢ₊₁ = yᵢ + h f(xᵢ, yᵢ) from Taylor and
// uses y′ = y; Part 2 does the class example y′ = y − x² + 1 (h = 0.5) and the 2023 question
// y′ = −y²/(1 + x) to 5 dp.

export default {
  id: 'euler',
  title: 'Euler’s method',
  covers: 'Stepping along the slope: the formula from Taylor, mesh points, step size, and comparing with the exact solution',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Mesh points', '$x_i = a + ih$, $i = 0, 1, \\ldots, n$, with step $h = \\tfrac{b - a}{n}$.'],
        ['Euler’s method', '$y_{i+1} = y_i + h\\,f(x_i, y_i)$, $y_0 = \\alpha$.'],
        ['Local truncation error', 'The dropped Taylor term, about $\\tfrac{h^2}{2}y\'\'$ per step; the total error shrinks roughly in proportion to $h$.'],
      ],
      steps: [
        'Identify $f(x, y)$, $a$, $b$, $y(a) = \\alpha$ and $h$. Number of steps $n = \\tfrac{b - a}{h}$.',
        'List the mesh points $x_0 = a, x_1 = a + h, \\ldots$',
        'Apply $y_{i+1} = y_i + h\\,f(x_i, y_i)$, using the old $x_i$ and $y_i$ inside $f$.',
        'Tabulate $i$, $x_i$, $y_i$, $f(x_i, y_i)$, $y_{i+1}$.',
        'If the exact solution is known, compare and give the error at each mesh point.',
      ],
      examples: [
        {
          title: '$y\' = y$, $y(0) = 1$, $h = 0.1$',
          question: 'Estimate $y(0.2)$ by Euler’s method.',
          steps: ['$f(x, y) = y$; $n = \\tfrac{0.2}{0.1} = 2$.', '$y_1 = 1 + 0.1(1) = 1.1$.', '$y_2 = 1.1 + 0.1(1.1) = 1.21$.', 'Exact $e^{0.2} = 1.2214$; error $0.0114$.'],
          answer: '$y(0.2) \\approx 1.21$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea D · Lesson 2',
          title: 'Walk along the slope',
          body: 'Last lesson showed an IVP has one solution. Now we **compute** it. The equation $y\' = f(x, y)$ tells you the **slope** at every point. Euler’s idea: stand at the start, take a small step along the slope, look at the new slope, step again.\n\nIt is the simplest method for a well-posed IVP, and it is Taylor’s series again, cut after one term.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Taylor, one term',
          body: 'Taylor: $y(x + h) = y(x) + h\\,y\'(x) + \\tfrac{h^2}{2}y\'\'(x) + \\cdots$. Keep only the first two terms and use $y\' = f(x, y)$:\n$$y_{i+1} = y_i + h\\,f(x_i, y_i).$$\nThe answer is not a formula but a **table of values at the mesh points** $x_i = a + ih$. The dropped $\\tfrac{h^2}{2}y\'\'$ is the error per step: smaller $h$, smaller error.',
          asides: [{ label: 'Exam tip', text: 'Euler gives approximations only at the mesh points. State $n = \\tfrac{b - a}{h}$ and list every $x_i$ before you start.' }],
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Euler, step by step',
          body: '1. Identify $f$, $a$, $b$, $\\alpha$, $h$; $n = \\tfrac{b - a}{h}$.\n2. Mesh points $x_i = a + ih$.\n3. $y_{i+1} = y_i + h\\,f(x_i, y_i)$, using the **old** point inside $f$.\n4. Tabulate $x_i$, $y_i$, $f(x_i, y_i)$.\n5. Compare with the exact solution if known.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$y\' = y$, $y(0) = 1$, $h = 0.1$',
          body: '**Steps 1–2.** $f = y$; $x_0 = 0$, $x_1 = 0.1$, $x_2 = 0.2$.\n\n**Step 3.** $y_1 = 1 + 0.1(1) = 1.1$; $y_2 = 1.1 + 0.1(1.1) = 1.21$.\n\n**Step 5.** Exact $y = e^x$: $e^{0.2} = 1.2214$. Error $0.0114$: Euler undershoots because the slope keeps rising during each step.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$y\' = y - x^2 + 1$, $y(0) = 0.5$, $h = 0.5$',
          graph: {
            steps: [
              { ask: '$y_1 = 0.5 + 0.5(0.5 - 0 + 1)$?', answer: 1.25, tol: 0.001, hint: '$f(0, 0.5) = 1.5$.' },
              { ask: '$y_2 = 1.25 + 0.5(1.25 - 0.5^2 + 1)$?', answer: 2.25, tol: 0.001, hint: '$f(0.5, 1.25) = 2$.' },
              { ask: '$y_3 = 2.25 + 0.5(2.25 - 1^2 + 1)$?', answer: 3.375, tol: 0.001, hint: '$f(1, 2.25) = 2.25$.' },
            ],
            after: 'Then $y_4 = 3.375 + 0.5(3.375 - 2.25 + 1) = 4.4375$.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Derive** Euler’s method from Taylor’s series, and name the truncation error.\n• **Solve** an IVP by Euler’s method with a given $h$ (or a given number of steps), to a stated number of dp.\n• **Compare** with the exact solution and comment on the error and the effect of $h$.\n• **Distinguish** Euler (Taylor, first term) from higher-order methods in a sentence.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Write the scheme first: $y_{i+1} = y_i + h\\,f(x_i, y_i)$, $y_0 = \\alpha$.',
        'Table columns: $i$, $x_i$, $y_i$, $f(x_i, y_i)$, $y_{i+1}$; carry 6 dp and round at the end.',
        'If $h$ isn’t given, state the one you choose (e.g. $h = 0.1$) and why.',
        'Exact comparison: solve the ODE analytically when you can, and list the error at each mesh point.',
        'Mistake: using the **new** $y_{i+1}$ inside $f$. Euler uses only the current point.',
      ],
      examples: [
        {
          title: '$y\' = y - x^2 + 1$, $0 \\le x \\le 2$, $y(0) = 0.5$, $h = 0.5$',
          question: 'Solve by Euler’s method and compare with the exact solution $y = (x + 1)^2 - 0.5e^x$.',
          steps: ['Mesh points $0, 0.5, 1.0, 1.5, 2.0$ ($n = 4$).', '$y_1 = 0.5 + 0.5(1.5) = 1.25$.', '$y_2 = 1.25 + 0.5(2) = 2.25$.', '$y_3 = 2.25 + 0.5(2.25) = 3.375$.', '$y_4 = 3.375 + 0.5(2.125) = 4.4375$.', 'Exact $y(2) = 9 - 0.5e^2 = 5.3055$: error $0.868$.'],
          answer: '$y(2) \\approx 4.4375$; the large error is due to the large step $h = 0.5$.',
        },
        {
          title: '$y\' = -\\dfrac{y^2}{1 + x}$, $y(0) = 1$: $y(0.2)$ to 5 dp',
          question: 'Use Euler’s method to estimate $y(0.2)$ to 5 dp.',
          steps: ['No step size is given; take $h = 0.1$ (2 steps).', '$y_1 = 1 + 0.1\\left(-\\tfrac{1}{1}\\right) = 0.9$.', '$y_2 = 0.9 + 0.1\\left(-\\tfrac{0.81}{1.1}\\right) = 0.82636$.', 'Exact $y = \\tfrac{1}{1 + \\ln(1 + x)}$: $y(0.2) = 0.84579$.'],
          answer: '$y(0.2) \\approx 0.82636$ (with $h = 0.2$ in one step: $0.80000$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: '$y\' = -\\dfrac{y^2}{1 + x}$, $y(0) = 1$',
          body: '“Use Euler’s method to estimate $y(0.2)$ to 5 dp for the IVP $y\' = -\\dfrac{y^2}{1 + x}$, $y(0) = 1$.”\n\n**What the examiner wants:** the scheme written; a step size stated (none is given, so choose and say so, e.g. $h = 0.1$); the table of $x_i$, $y_i$, $f$; the answer to 5 dp. Comparing with the exact $0.84579$ shows understanding.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$h = 0.1$, two steps',
          graph: {
            steps: [
              { ask: '$f(0, 1) = -\\tfrac{1^2}{1 + 0}$?', answer: -1, tol: 0.001, hint: '$-1$.' },
              { ask: '$y_1 = 1 + 0.1(-1)$?', answer: 0.9, tol: 0.0001, hint: 'Step along the slope.' },
              { ask: '$f(0.1, 0.9) = -\\tfrac{0.81}{1.1}$, to 6 dp?', answer: -0.736364, tol: 0.000002, hint: '$0.81 \\div 1.1$.' },
              { ask: '$y_2 = 0.9 + 0.1(-0.736364)$, to 5 dp?', answer: 0.82636, tol: 0.00001, hint: '$0.9 - 0.073636$.' },
            ],
            after: 'Exact $0.84579$. Halving $h$ again would roughly halve the error.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'For $y_2$, a student computes $f$ at $(0.2, y_1)$ instead of $(0.1, y_1)$. What is wrong?',
          options: [
            { text: 'Euler evaluates $f$ at the current point $(x_1, y_1) = (0.1, 0.9)$, not at the next $x$', correct: true, why: 'The slope used for a step is the one at its starting point.' },
            { text: 'Nothing; either is fine', why: 'Using the end $x$ changes the method and the answer.' },
            { text: 'They should use $y_2$ inside $f$', why: '$y_2$ isn’t known yet; that is what you are computing.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'The class example, last step',
          graph: {
            steps: [
              { ask: '$y_3 = 3.375$ at $x_3 = 1.5$. $f(1.5, 3.375) = 3.375 - 2.25 + 1$?', answer: 2.125, tol: 0.001, hint: '$y - x^2 + 1$.' },
              { ask: '$y_4 = 3.375 + 0.5 \\times 2.125$?', answer: 4.4375, tol: 0.0001, hint: '$3.375 + 1.0625$.' },
              { ask: 'Exact $y(2) = 9 - 0.5e^2 = 5.3055$. Error, to 3 dp?', answer: 0.868, tol: 0.002, hint: '$5.3055 - 4.4375$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Idea D is complete, and so is the course.',
          body: '**Summary:** $y_{i+1} = y_i + h\\,f(x_i, y_i)$ from Taylor’s first term; answers at mesh points; smaller $h$ means smaller error.\n\n**The course in one line:** approximate step by step, and know how wrong you might be. Errors and series (A), solving (B), tables (C), change (D).\n\n**Next:** the **mock exam**, a timed paper in the lecturer’s style.',
        },
      ],
    },
  ],
};
