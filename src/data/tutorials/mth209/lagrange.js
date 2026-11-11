// MTH 209 · Idea C, lesson 4: higher-degree interpolation with Lagrange polynomials. Part 1 builds
// P₂ through (0, 1), (1, 3), (2, 7); Part 2 does ln 2.7 from three points (2023), sin 1.15 with n = 2, 3
// (2016), and the polynomial through (2, 5), (3, 2), (4, 5).

export default {
  id: 'lagrange',
  title: 'Higher-degree interpolation',
  covers: 'Lagrange polynomials through three or more points, evaluating them, and the interpolation error',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Lagrange basis', '$L_i(x) = \\prod_{j \\ne i}\\dfrac{x - x_j}{x_i - x_j}$: equals $1$ at $x_i$ and $0$ at every other $x_j$.'],
        ['Lagrange polynomial', '$P_n(x) = \\sum_i f_i L_i(x)$: the unique polynomial of degree $\\le n$ through $n + 1$ points.'],
        ['Interpolation error', '$f(x) - P_n(x) = \\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_i (x - x_i)$ for some $\\xi$ in the interval.'],
      ],
      steps: [
        'Choose $n + 1$ points close to $x$ (degree $n$).',
        'Write each $L_i(x)$: the product over the other points of $\\dfrac{x - x_j}{x_i - x_j}$.',
        'Evaluate each $L_i$ at your $x$ (or expand if the polynomial is asked for).',
        '$P_n(x) = \\sum f_i L_i(x)$.',
        'Error: compare with the true value, or bound it with $\\tfrac{f^{(n+1)}}{(n+1)!}\\prod(x - x_i)$.',
      ],
      examples: [
        {
          title: 'Through $(0, 1)$, $(1, 3)$, $(2, 7)$',
          question: 'Find $P_2$ and evaluate it at $x = 0.5$.',
          steps: ['$L_0 = \\tfrac{(x - 1)(x - 2)}{(0 - 1)(0 - 2)} = \\tfrac{(x - 1)(x - 2)}{2}$, $L_1 = \\tfrac{x(x - 2)}{-1}$, $L_2 = \\tfrac{x(x - 1)}{2}$.', '$P_2 = 1 \\cdot L_0 + 3L_1 + 7L_2 = x^2 + x + 1$.', '$P_2(0.5) = 0.25 + 0.5 + 1 = 1.75$.'],
          answer: '$P_2(x) = x^2 + x + 1$; $P_2(0.5) = 1.75$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea C · Lesson 4',
          title: 'Follow the bend',
          body: 'A straight line can’t follow a curve. Through **three** points goes exactly one parabola; through four, one cubic. Using it instead of a chord follows the bend and shrinks the error.\n\n**Lagrange’s** recipe writes that polynomial down directly, with no equations to solve.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Switches that turn on at one point',
          body: 'Build a little polynomial $L_i(x)$ that is **$1$ at $x_i$** and **$0$ at every other point**. For points $0, 1, 2$:\n$$L_0 = \\frac{(x - 1)(x - 2)}{(0 - 1)(0 - 2)},$$\nwhich is $1$ at $0$ and $0$ at $1$ and $2$. Then $P(x) = f_0L_0 + f_1L_1 + f_2L_2$ takes the value $f_i$ at each $x_i$: it passes through every point.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Lagrange interpolation, step by step',
          body: '1. $n + 1$ points near $x$.\n2. $L_i(x) = \\prod_{j \\ne i}\\dfrac{x - x_j}{x_i - x_j}$.\n3. Evaluate each $L_i$ at $x$.\n4. $P_n(x) = \\sum f_i L_i(x)$.\n5. Error: true minus estimate, or $\\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod(x - x_i)$.\n\nCheck: the $L_i(x)$ always add up to $1$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Through $(0, 1)$, $(1, 3)$, $(2, 7)$',
          body: '**Step 2.** $L_0 = \\tfrac{(x - 1)(x - 2)}{2}$, $L_1 = -x(x - 2)$, $L_2 = \\tfrac{x(x - 1)}{2}$.\n\n**Step 3.** At $x = 0.5$: $L_0 = 0.375$, $L_1 = 0.75$, $L_2 = -0.125$ (sum $1$ ✓).\n\n**Step 4.** $P_2(0.5) = 1(0.375) + 3(0.75) + 7(-0.125) = 1.75$.\n\nExpanded, $P_2(x) = x^2 + x + 1$, which does pass through all three points.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$P_2(3)$ for the same points',
          graph: {
            steps: [
              { ask: '$L_0(3) = \\tfrac{(3 - 1)(3 - 2)}{2}$?', answer: 1, tol: 0.001, hint: '$\\tfrac{2}{2}$.' },
              { ask: '$L_1(3) = -3(3 - 2)$?', answer: -3, tol: 0.001, hint: '$-3$.' },
              { ask: '$L_2(3) = \\tfrac{3(3 - 1)}{2}$?', answer: 3, tol: 0.001, hint: '$\\tfrac{6}{2}$.' },
              { ask: '$P_2(3) = 1(1) + 3(-3) + 7(3)$?', answer: 13, tol: 0.001, hint: 'And $3^2 + 3 + 1 = 13$. ✓' },
            ],
            after: 'Outside the data ($x = 3$) this is extrapolation: allowed, but riskier.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Construct** the quadratic (or cubic) interpolating polynomial from a table, **evaluate** it at a point, and **find the error** to a given dp.\n• **Use** Lagrange polynomials of degree $n = 2, 3$ to estimate a value and compare.\n• **Find and sketch** the polynomial through given points.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Write each $L_i(x)$ as a fraction first, then put the number in. Keep 5–6 dp.',
        'Sum check: $\\sum L_i(x) = 1$ catches most arithmetic slips.',
        'For “find the polynomial”, expand $\\sum f_iL_i$ and collect powers; check it passes through every point.',
        'Choose points around $x$; a higher degree with nearby points usually lowers the error.',
        'Mistake: in $L_i$, including the factor $(x - x_i)$ itself. Skip $j = i$.',
      ],
      examples: [
        {
          title: '$\\ln 2.7$ from $(2, 0.69315)$, $(2.5, 0.91629)$, $(3, 1.09861)$',
          question: 'Construct $P_2$ for $f(x) = \\ln x$, approximate $\\ln 2.7$, and find the error to 5 dp.',
          steps: ['At $x = 2.7$: $L_0 = \\tfrac{(0.2)(-0.3)}{(-0.5)(-1)} = -0.12$, $L_1 = \\tfrac{(0.7)(-0.3)}{(0.5)(-0.5)} = 0.84$, $L_2 = \\tfrac{(0.7)(0.2)}{(1)(0.5)} = 0.28$ (sum $1$ ✓).', '$P_2(2.7) = 0.69315(-0.12) + 0.91629(0.84) + 1.09861(0.28) = 0.99412$.', 'True $\\ln 2.7 = 0.99325$: error $-0.00086$.'],
          answer: '$\\ln 2.7 \\approx 0.99412$, error $-0.00086$ (linear interpolation gave $0.00403$).',
        },
        {
          title: 'Polynomial through $(2, 5)$, $(3, 2)$, $(4, 5)$',
          question: 'Determine the polynomial whose graph passes through the points.',
          steps: ['$L_0 = \\tfrac{(x - 3)(x - 4)}{2}$, $L_1 = -(x - 2)(x - 4)$, $L_2 = \\tfrac{(x - 2)(x - 3)}{2}$.', '$P = 5L_0 + 2L_1 + 5L_2$; expand and collect.', '$P(x) = 3x^2 - 18x + 29$. Check: $P(3) = 27 - 54 + 29 = 2$ ✓.'],
          answer: '$P(x) = 3x^2 - 18x + 29$, a parabola with its lowest point at $(3, 2)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Quadratic interpolation for $\\ln 2.7$',
          body: '“Consider the quadratic interpolating polynomial for $f(x) = \\ln x$ using $(2, 0.69315)$, $(2.5, 0.91629)$, $(3, 1.09861)$. Evaluate $P_2(x)$, approximate $\\ln 2.7$, and determine the error to 5 dp.”\n\n**What the examiner wants:** each $L_i$ written, then evaluated at $2.7$; the weighted sum; and the error against the true $\\ln 2.7$.',
          asides: [{ label: 'Exam tip', text: 'Check $L_0 + L_1 + L_2 = 1$ before multiplying by the $f$ values. It is a 10-second check that catches sign slips.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$\\ln 2.7$ by $P_2$',
          graph: {
            steps: [
              { ask: '$L_0(2.7) = \\tfrac{(2.7 - 2.5)(2.7 - 3)}{(2 - 2.5)(2 - 3)}$?', answer: -0.12, tol: 0.001, hint: '$\\tfrac{-0.06}{0.5}$.' },
              { ask: '$L_1(2.7) = \\tfrac{(2.7 - 2)(2.7 - 3)}{(2.5 - 2)(2.5 - 3)}$?', answer: 0.84, tol: 0.001, hint: '$\\tfrac{-0.21}{-0.25}$.' },
              { ask: '$L_2(2.7)$ (they sum to 1)?', answer: 0.28, tol: 0.001, hint: '$1 + 0.12 - 0.84$.' },
              { ask: '$P_2(2.7)$, to 5 dp?', answer: 0.99412, tol: 0.00003, hint: '$-0.08318 + 0.76968 + 0.30761$.' },
            ],
            after: 'True $0.99325$: error $-0.00086$, about five times smaller than linear interpolation’s $0.00403$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student writes $L_1(x) = \\dfrac{(x - 2)(x - 2.5)(x - 3)}{(2.5 - 2)(2.5 - 3)}$. What is wrong?',
          options: [
            { text: 'The factor $(x - 2.5)$ for its own point must be left out', correct: true, why: '$L_1$ multiplies over the **other** points only; including $(x - x_1)$ makes it $0$ at $x_1$ instead of $1$.' },
            { text: 'The denominator should include $(2.5 - 2.5)$', why: 'That would divide by zero.' },
            { text: 'Nothing', why: 'It now vanishes at $x = 2.5$, where it should equal $1$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Polynomial through $(2, 5)$, $(3, 2)$, $(4, 5)$',
          graph: {
            steps: [
              { ask: 'It is $P(x) = ax^2 + bx + c$ with $a = 3$. Coefficient $b$?', answer: -18, tol: 0.001, hint: 'Symmetric about $x = 3$, so $-\\tfrac{b}{2a} = 3$.' },
              { ask: 'Constant $c$ (use $P(3) = 2$)?', answer: 29, tol: 0.001, hint: '$27 - 54 + c = 2$.' },
              { ask: 'Check $P(4)$?', answer: 5, tol: 0.001, hint: '$48 - 72 + 29$.' },
            ],
            after: '$P(x) = 3x^2 - 18x + 29$: a parabola opening upward with minimum $(3, 2)$.',
          },
        },
        {
          type: 'finish',
          title: 'Idea C is complete.',
          body: '**Summary:** $P_n(x) = \\sum f_iL_i(x)$ with $L_i = \\prod_{j \\ne i}\\tfrac{x - x_j}{x_i - x_j}$; the $L_i$ sum to $1$; more nearby points follow the curve better; error $\\tfrac{f^{(n+1)}}{(n+1)!}\\prod(x - x_i)$.\n\n**Idea C in one line:** rebuild a function from a table, with differences to see its shape and polynomials to fill the gaps.\n\n**Next, Idea D:** following a **rate of change** step by step, starting with when an initial value problem has a unique solution.',
        },
      ],
    },
  ],
};
