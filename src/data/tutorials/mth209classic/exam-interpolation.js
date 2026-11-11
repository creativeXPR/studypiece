// MTH 209 · Interpolation · Exam practice, shaped on past examination questions: linear
// interpolation with different second points and the errors, Lagrange of degree 2 and 3 from a
// table, a quadratic interpolant for ln x with its error, and a polynomial through three points.

export default {
  id: 'exam-interpolation',
  title: 'Exam practice: interpolation',
  covers: 'Exam-style questions: linear interpolation from a table with different data points and their errors, Lagrange interpolation of degree 2 and 3, the quadratic interpolant of ln x and its error, the polynomial through given points, derivation and definitions',
  minutes: 22,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Linear', '$P_1(x) = y_0 + \\frac{y_1 - y_0}{x_1 - x_0}(x - x_0)$.'],
        ['Lagrange', '$P_n(x) = \\sum y_kL_k(x)$, $L_k$ = product over $j \\ne k$ of $\\frac{x - x_j}{x_k - x_j}$.'],
        ['Error, relative error', 'Error = true − approximate; relative error = error ÷ true value.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'Interpolation questions, as set',
          body: 'Typical questions give a short table (often $\\sin x$ or $\\ln x$) and ask you to interpolate, then find the **error** and **relative error**, and comment on accuracy.\n\nKeep the picture: a polynomial standing in for a curve. Nearer points and higher degree follow the bends better, so the error shrinks.',
          cta: 'Start',
          asides: [{ label: 'Exam tip', text: 'If a question names a method, use that method: a correct answer by another method can lose the method marks.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Given $\\sin x$ at $x = 1.0, 1.25, 1.5, 1.75, 2.0$: $0.8415, 0.9490, 0.9975, 0.9840, 0.9093$. Use linear interpolation to estimate $\\sin(1.15)$ with $x_0 = 1.00$ and the second point each of the four others. Find the error and relative error each time. ($\\sin 1.15 = 0.91276$)',
          graph: {
            steps: [
              { ask: 'With $x_1 = 1.25$: $P_1(1.15) = $ (4 d.p.)', answer: 0.906, tol: 0.0001, hint: '$0.8415 + \\frac{0.9490 - 0.8415}{0.25}(0.15)$.' },
              { ask: 'Its error (4 d.p.)', answer: 0.0068, tol: 0.0002, hint: '$0.91276 - 0.9060$.' },
              { ask: 'With $x_1 = 1.5$: $P_1(1.15) = $ (4 d.p.)', answer: 0.8883, tol: 0.0001, hint: '$0.8415 + \\frac{0.9975 - 0.8415}{0.5}(0.15)$.' },
              { ask: 'With $x_1 = 2.0$: $P_1(1.15) = $ (4 d.p.)', answer: 0.8517, tol: 0.0001, hint: '$0.8415 + \\frac{0.9093 - 0.8415}{1}(0.15)$.' },
              { ask: 'Its relative error (%, 2 d.p.)', answer: 6.69, tol: 0.03, hint: '$\\frac{0.91276 - 0.8517}{0.91276} \\times 100$.' },
              { ask: 'Comment', options: ['The nearer the second point to $1.15$, the more accurate the estimate', 'All four estimates are equally accurate', 'The farthest point gives the best estimate'], answer: 0, hint: 'Errors $0.0068, 0.0245, 0.0428, 0.0611$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'From the same table, use Lagrange interpolation of degree $2$ (nodes $1.0, 1.25, 1.5$) and degree $3$ (nodes $1.0$ to $1.75$) to evaluate $\\sin(1.15)$.',
          graph: {
            steps: [
              { ask: 'Degree 2: $L_0(1.15) = \\frac{(1.15 - 1.25)(1.15 - 1.5)}{(1 - 1.25)(1 - 1.5)} = $', answer: 0.28, tol: 0.0005, hint: '$\\frac{(-0.1)(-0.35)}{(-0.25)(-0.5)}$.' },
              { ask: '$L_1(1.15) = $', answer: 0.84, tol: 0.0005, hint: '$\\frac{(0.15)(-0.35)}{(0.25)(-0.25)}$.' },
              { ask: '$L_2(1.15) = $', answer: -0.12, tol: 0.0005, hint: '$\\frac{(0.15)(-0.1)}{(0.5)(0.25)}$. (Check: $0.28 + 0.84 - 0.12 = 1$.)' },
              { ask: '$P_2(1.15) = $ (5 d.p.)', answer: 0.91308, tol: 0.00003, hint: '$0.28(0.8415) + 0.84(0.9490) - 0.12(0.9975)$.' },
              { ask: 'Degree 3 gives $P_3(1.15) = $ (5 d.p.)', answer: 0.91291, tol: 0.00003, hint: 'Add the node $1.75$; each $L_k$ now has three factors.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Construct the quadratic interpolating polynomial for $f(x) = \\ln x$ using $(2, 0.69315)$, $(2.5, 0.91629)$, $(3, 1.09861)$. Approximate $\\ln(2.7)$ and find the error to 5 d.p.',
          graph: {
            steps: [
              { ask: '$L_0(2.7) = \\frac{(2.7 - 2.5)(2.7 - 3)}{(2 - 2.5)(2 - 3)} = $', answer: -0.12, tol: 0.0005, hint: '$\\frac{(0.2)(-0.3)}{(-0.5)(-1)}$.' },
              { ask: '$L_1(2.7) = $', answer: 0.84, tol: 0.0005, hint: '$\\frac{(0.7)(-0.3)}{(0.5)(-0.5)}$.' },
              { ask: '$L_2(2.7) = $', answer: 0.28, tol: 0.0005, hint: '$\\frac{(0.7)(0.2)}{(1)(0.5)}$.' },
              { ask: '$P_2(2.7) = $ (5 d.p.)', answer: 0.99412, tol: 0.00002, hint: '$-0.12(0.69315) + 0.84(0.91629) + 0.28(1.09861)$.' },
              { ask: 'Error $= \\ln 2.7 - P_2(2.7) = 0.99325 - P_2(2.7) = $ (5 d.p.)', answer: -0.00087, tol: 0.00002, hint: 'True minus approximate (negative: an overestimate).' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Determine and sketch the graph of the polynomial through $(2, 5)$, $(3, 2)$, $(4, 5)$.',
          graph: {
            steps: [
              { ask: 'The points are symmetric about $x = $', answer: 3, tol: 0, hint: 'Equal heights at $2$ and $4$.' },
              { ask: 'So $P_2(x) = a(x - 3)^2 + 2$. From $P_2(2) = 5$: $a = $', answer: 3, tol: 0, hint: '$a(1) + 2 = 5$.' },
              { ask: 'Expanded: $P_2(x) = 3x^2 - 18x + c$, $c = $', answer: 29, tol: 0, hint: '$3(x^2 - 6x + 9) + 2$.' },
              { ask: 'The graph is', options: ['an upward parabola with minimum $(3, 2)$', 'a downward parabola with maximum $(3, 2)$', 'a straight line'], answer: 0, hint: '$a = 3 > 0$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Derivation and definitions',
      terms: [
        ['Uniqueness', 'Through $n + 1$ points with distinct $x$ there is exactly one polynomial of degree $\\le n$.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Derivation',
          prompt: 'Derive the linear interpolation formula. Put the lines in order.',
          items: [
            'Let $P_1(x) = a_0 + a_1x$ with $P_1(x_0) = y_0$ and $P_1(x_1) = y_1$.',
            'So $a_0 + a_1x_0 = y_0$ and $a_0 + a_1x_1 = y_1$.',
            'Subtracting, $a_1 = \\frac{y_1 - y_0}{x_1 - x_0}$, and $a_0 = y_0 - a_1x_0$.',
            'Hence $P_1(x) = y_0 + \\frac{y_1 - y_0}{x_1 - x_0}(x - x_0) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1$.',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'Interpolation means',
          options: [
            { text: 'finding a function (usually a polynomial) that passes exactly through given data points, to estimate values between them', correct: true, why: 'Between the tabulated points; outside them it is extrapolation.' },
            { text: 'finding the best straight line through scattered data', why: 'That is regression (least squares), which need not pass through the points.' },
            { text: 'finding the roots of a polynomial', why: 'That is root-finding (Chapter 1).' },
            { text: 'estimating values beyond the end of a table', why: 'That is extrapolation, which is much less reliable.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Through $4$ points with distinct $x$ there is a unique polynomial of degree at most $3$', correct: true, why: '$n + 1$ points fix a degree-$n$ polynomial.' },
            { text: 'The Lagrange basis values at any $x$ add up to $1$', correct: true, why: 'Interpolating the constant $1$ gives $1$.' },
            { text: 'A higher degree always gives a smaller error', why: 'Usually near the nodes, but not always; far from the data it can get worse.' },
            { text: 'Linear interpolation is exact for straight-line data', correct: true, why: 'A line reproduces a line.' },
          ],
        },
        {
          type: 'finish',
          title: 'Interpolation: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
