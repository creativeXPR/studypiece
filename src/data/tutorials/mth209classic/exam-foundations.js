// MTH 209 · Part A · Exam practice, shaped on past examination questions: types of error, the
// product-rule proof, errors in sums, products, functions and quotients, matching coefficients,
// 2^x via e^(x ln 2), a quotient of binomial expansions, and tan⁻¹ / ln from their series.
// Merges the old exam-errors and exam-series lessons. Numbers recomputed in Python.

export default {
  id: 'exam-foundations',
  title: 'Exam practice: errors and series',
  covers: 'Exam-style questions: types of approximation error, rounding to d decimal places, the product error proof, maximum errors in sums, products, functions and quotients with limits, matching coefficients, expanding 2^x, combining binomial expansions, and evaluating tan⁻¹ x and ln(1 + x) from their series',
  minutes: 25,
  sections: [
    {
      name: 'Errors',
      terms: [
        ['Rounded to $d$ d.p.', '$|x - x_d| \\le \\frac12 \\times 10^{-d}$.'],
        ['Sum / difference', 'Absolute errors add: $|\\varepsilon| \\le |\\varepsilon_1| + |\\varepsilon_2|$.'],
        ['Product / quotient', 'Relative errors add: $\\le \\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$.'],
        ['Function of one value', 'Max error in $f(x) \\approx |f\'(x)| \\times |\\varepsilon|$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part A · Exam practice',
          title: 'Errors and series, as set',
          body: 'Part A questions come in two kinds: **errors** (define, prove, then compute a maximum error or the limits of a value) and **series** (combine expansions, match coefficients, evaluate to a given accuracy).\n\nEach question below is shaped on a past paper. Work each step, then check.',
          asides: [
            { label: 'Exam tip', text: 'If a question names a method (“by writing $2^x$ as $e^{x\\ln 2}$”, “use the expansions of…”), you must use that method. A correct answer by another route can lose the marks.' },
          ],
          cta: 'Start',
        },
        {
          type: 'reveal',
          eyebrow: 'Question 1(a)',
          title: 'Outline the types of approximation error',
          cards: [
            { title: 'Gross errors (blunders)', text: 'Human mistakes: copying a wrong digit, wrong formula, misreading a table. Avoided by care and checking.' },
            { title: 'Truncation errors', text: 'From cutting off an infinite process: stopping a series after a few terms, or an iteration after a few steps. E.g. $e^{0.2} \\approx 1 + 0.2 + 0.02$.' },
            { title: 'Round-off errors', text: 'From storing numbers with finitely many digits, by chopping or rounding. They can build up over long calculations.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Question 1(b)',
          prompt: 'With $|X - x| \\le \\alpha$, $|Y - y| \\le \\beta$, show $\\left|\\frac{XY - xy}{XY}\\right| \\le \\left|\\frac{\\alpha}{X}\\right| + \\left|\\frac{\\beta}{Y}\\right|$. Order the lines.',
          items: [
            'In the worst case $x = X - \\alpha$ and $y = Y - \\beta$.',
            'Then $xy = XY - X\\beta - Y\\alpha + \\alpha\\beta$, so $XY - xy = X\\beta + Y\\alpha - \\alpha\\beta$.',
            '$\\alpha\\beta$ is the product of two small errors: neglect it.',
            'Divide by $XY$: $\\left|\\frac{XY - xy}{XY}\\right| \\le \\left|\\frac{\\beta}{Y}\\right| + \\left|\\frac{\\alpha}{X}\\right|$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Take $Y_1 = 15.36$ (2 d.p.) and $Y_2 = 27.1$ (1 d.p.). Find the maximum error in the sum, the difference and the product.',
          graph: {
            steps: [
              { ask: '$|\\varepsilon_1| \\le $', answer: 0.005, tol: 0.0001, hint: 'Half a unit in the 2nd place.' },
              { ask: '$|\\varepsilon_2| \\le $', answer: 0.05, tol: 0.001, hint: 'Half a unit in the 1st place.' },
              { ask: 'Max error in $Y_1 + Y_2$ (and in $Y_1 - Y_2$)', answer: 0.055, tol: 0.0005, hint: 'Absolute errors add for both.' },
              { ask: 'Max error in $Y_1Y_2$: $Y_1|\\varepsilon_2| + Y_2|\\varepsilon_1| = $ (4 d.p.)', answer: 0.9035, tol: 0.0006, hint: '$15.36(0.05) + 27.1(0.005)$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Evaluate $x^2 - 2 + \\frac{1}{x^2}$ at $x = 1.473$ (correct to 3 d.p.) and estimate the maximum error.',
          graph: {
            steps: [
              { ask: 'Value (5 d.p.)', answer: 0.63062, tol: 0.00003, hint: '$2.169729 - 2 + 0.460891$.' },
              { ask: '$f\'(x) = 2x - \\frac{2}{x^3}$ at $1.473$ (4 d.p.)', answer: 2.3202, tol: 0.0003, hint: '$2.946 - 0.6258$.' },
              { ask: 'Maximum error $\\approx |f\'| \\times 0.0005 = $ (5 d.p.)', answer: 0.00116, tol: 0.00002, hint: '$2.3202 \\times 0.0005$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Evaluate $\\frac{2.362 \\times 1.76}{1.46 \\times 0.785}$ and, assuming maximum round-off error in each number, find the limits of the value.',
          graph: {
            steps: [
              { ask: 'Value (4 d.p.)', answer: 3.6272, tol: 0.0002, hint: '$\\frac{4.15712}{1.1461}$.' },
              { ask: 'Sum of relative errors $\\frac{0.0005}{2.362} + \\frac{0.005}{1.76} + \\frac{0.005}{1.46} + \\frac{0.0005}{0.785} = $ (5 d.p.)', answer: 0.00711, tol: 0.00003, hint: '$0.000212 + 0.002841 + 0.003425 + 0.000637$.' },
              { ask: 'Maximum absolute error (4 d.p.)', answer: 0.0258, tol: 0.0003, hint: '$3.6272 \\times 0.00711$.' },
              { ask: 'Lower limit (3 d.p.)', answer: 3.601, tol: 0.0015, hint: '$3.6272 - 0.0258$.' },
              { ask: 'Upper limit (3 d.p.)', answer: 3.653, tol: 0.0015, hint: '$3.6272 + 0.0258$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Series',
      terms: [
        ['Matching coefficients', 'Expand both sides as power series and equate the coefficients of $x, x^2, \\ldots$.'],
        ['$a^x$', '$a^x = e^{x\\ln a} = 1 + x\\ln a + \\frac{(x\\ln a)^2}{2!} + \\cdots$'],
        ['$\\tan^{-1}x$', '$x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots$, $|x| \\le 1$.'],
        ['$\\ln(1 + x)$', '$x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$, $-1 < x \\le 1$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 5',
          title: 'Determine non-zero constants $a$ and $b$ such that $e^{-x} \\approx \\frac{1 + ax}{1 + bx}$ for small $x$.',
          body: 'Multiply out: $(1 + bx)\\big(1 - x + \\frac{x^2}{2} - \\cdots\\big) = 1 + ax$, and compare coefficients.',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$: $b - 1 = a$. Coefficient of $x^2$: $\\frac12 - b = 0$, so $b = $', answer: 0.5, tol: 0.0001, hint: 'The right side has no $x^2$ term.' },
              { ask: '$a = $', answer: -0.5, tol: 0.0001, hint: '$a = b - 1$.', done: '$e^{-x} \\approx \\frac{2 - x}{2 + x}$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 6',
          title: 'By writing $2^x$ as $e^{x\\ln 2}$, find the expansion of $2^x$ (coefficients to 6 d.p.).',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$: $\\ln 2 = $', answer: 0.693147, tol: 0.000002, hint: 'From $e^u = 1 + u + \\cdots$ with $u = x\\ln 2$.' },
              { ask: 'Coefficient of $x^2$: $\\frac{(\\ln 2)^2}{2} = $', answer: 0.240227, tol: 0.000002, hint: '$\\frac{0.480453}{2}$.' },
              { ask: 'Coefficient of $x^3$: $\\frac{(\\ln 2)^3}{6} = $', answer: 0.055504, tol: 0.000002, hint: '$\\frac{0.333025}{6}$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 7',
          title: 'Use the expansions of $(1 + \\frac12x)^6$ and $(2 + 3x)^{-1}$ to express $\\frac{2 + (1 + \\frac12x)^6}{2 + 3x}$ in ascending powers of $x$ up to $x^3$.',
          body: '$(1 + \\frac12x)^6 = 1 + 3x + \\frac{15}{4}x^2 + \\frac52x^3 + \\cdots$; $\\;(2 + 3x)^{-1} = \\frac12\\big(1 - \\frac32x + \\frac94x^2 - \\frac{27}{8}x^3 + \\cdots\\big)$.',
          graph: {
            steps: [
              { ask: 'Constant term', answer: 1.5, tol: 0.0001, hint: '$\\frac{2 + 1}{2}$.' },
              { ask: 'Coefficient of $x$', answer: -0.75, tol: 0.0001, hint: '$\\frac12\\big(3 - \\frac92\\big)$.' },
              { ask: 'Coefficient of $x^2$', answer: 3, tol: 0.0001, hint: '$\\frac12\\big(\\frac{15}{4} - \\frac92 + \\frac{27}{4}\\big)$.' },
              { ask: 'Coefficient of $x^3$', answer: -3.25, tol: 0.0001, hint: '$\\frac12\\big(\\frac52 - \\frac{45}{8} + \\frac{27}{4} - \\frac{81}{8}\\big)$.', done: '$\\frac32 - \\frac34x + 3x^2 - \\frac{13}{4}x^3 + \\cdots$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 8',
          title: 'State the expansions of $\\tan^{-1}x$ and $\\ln(1 + x)$, hence evaluate $\\tan^{-1}(0.2)$ and $\\ln(1.1)$ to 3 d.p.',
          graph: {
            steps: [
              { ask: '$\\frac{0.2^3}{3} = $ (6 d.p.)', answer: 0.002667, tol: 0.000002, hint: '$\\frac{0.008}{3}$.' },
              { ask: '$\\tan^{-1}(0.2) \\approx 0.2 - 0.002667 + \\frac{0.2^5}{5} = $ (3 d.p.)', answer: 0.197, tol: 0.0005, hint: '$0.2 - 0.002667 + 0.000064 = 0.197397$.' },
              { ask: '$\\ln(1.1) \\approx 0.1 - \\frac{0.01}{2} + \\frac{0.001}{3} = $ (3 d.p.)', answer: 0.095, tol: 0.0005, hint: '$0.1 - 0.005 + 0.000333 = 0.095333$; the true value is $0.095310$.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Rounded to $d$ d.p. means $|x - x_d| \\le \\frac12 \\times 10^{-d}$', correct: true, why: 'Half a unit in the last kept place.' },
            { text: 'In a product or quotient, relative errors add', correct: true, why: 'The rectangle picture: two strips plus a negligible corner.' },
            { text: 'The series for $\\ln(1 + x)$ converges at $x = 2$', why: 'Valid only for $-1 < x \\le 1$.' },
            { text: 'Chopping and rounding have the same maximum error', why: 'Chopping: up to $10^{-d}$; rounding: up to $\\frac12 \\times 10^{-d}$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Part A: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
