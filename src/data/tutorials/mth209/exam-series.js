// MTH 209 · Approximations · Exam practice, shaped on past examination questions: constants in a
// rational approximation of e^−x, the expansion of 2^x via e^(x ln 2), a quotient of binomial
// expansions up to x³, and evaluating tan⁻¹(0.2) and ln(1.1) from their series.

export default {
  id: 'exam-series',
  title: 'Exam practice: series',
  covers: 'Exam-style questions: matching coefficients to find constants in an approximation, expanding 2^x as e^(x ln 2), combining binomial expansions up to x³, and evaluating tan⁻¹ x and ln(1 + x) from their series',
  minutes: 22,
  sections: [
    {
      name: 'Expansions',
      terms: [
        ['Matching coefficients', 'Expand both sides as power series and equate the coefficients of $x, x^2, \\ldots$.'],
        ['$a^x$', '$a^x = e^{x\\ln a} = 1 + x\\ln a + \\frac{(x\\ln a)^2}{2!} + \\cdots$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'Series questions, as set',
          body: 'Expect three things: **combine** known expansions (binomial, exponential, logarithm), **match coefficients** to find unknown constants, and **evaluate** a function to a given accuracy by summing terms until they stop mattering.\n\nThe picture behind all of them: a polynomial copying a curve near $x = 0$, good while $x$ is small.',
          cta: 'Start',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Determine non-zero constants $a$ and $b$ such that $e^{-x} \\approx \\frac{1 + ax}{1 + bx}$ for small $x$.',
          body: 'Multiply out: $(1 + bx)\\big(1 - x + \\frac{x^2}{2} - \\cdots\\big) = 1 + ax$, and compare coefficients.',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$: $b - 1 = a$. Coefficient of $x^2$: $\\frac12 - b = 0$, so $b = $', answer: 0.5, tol: 0.0001, hint: 'The right side has no $x^2$ term.' },
              { ask: '$a = $', answer: -0.5, tol: 0.0001, hint: '$a = b - 1$.', done: '$e^{-x} \\approx \\frac{1 - \\frac{x}{2}}{1 + \\frac{x}{2}} = \\frac{2 - x}{2 + x}$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
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
          eyebrow: 'Question 3',
          title: 'Use the expansions of $(1 + \\frac12x)^6$ and $(2 + 3x)^{-1}$ to express $\\frac{2 + (1 + \\frac12x)^6}{2 + 3x}$ in ascending powers of $x$ up to $x^3$.',
          body: '$(1 + \\frac12x)^6 = 1 + 3x + \\frac{15}{4}x^2 + \\frac52x^3 + \\cdots$; $\\;(2 + 3x)^{-1} = \\frac12\\big(1 - \\frac32x + \\frac94x^2 - \\frac{27}{8}x^3 + \\cdots\\big)$.',
          graph: {
            steps: [
              { ask: 'Constant term', answer: 1.5, tol: 0.0001, hint: '$\\frac{2 + 1}{2}$.' },
              { ask: 'Coefficient of $x$', answer: -0.75, tol: 0.0001, hint: '$\\frac12\\big(3 - \\frac92\\big)$: numerator $3 + 3x + \\cdots$ times $\\frac12(1 - \\frac32x)$.' },
              { ask: 'Coefficient of $x^2$', answer: 3, tol: 0.0001, hint: '$\\frac12\\big(\\frac{15}{4} - \\frac92 + \\frac{27}{4}\\big)$.' },
              { ask: 'Coefficient of $x^3$', answer: -3.25, tol: 0.0001, hint: '$\\frac12\\big(\\frac52 - \\frac{45}{8} + \\frac{27}{4} - \\frac{81}{8}\\big)$.', done: '$\\frac32 - \\frac34x + 3x^2 - \\frac{13}{4}x^3 + \\cdots$' },
            ],
          },
        },
      ],
    },
    {
      name: 'Evaluating functions',
      terms: [
        ['$\\tan^{-1}x$', '$x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots$, $|x| \\le 1$.'],
        ['$\\ln(1 + x)$', '$x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$, $-1 < x \\le 1$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'State the expansions of $\\tan^{-1}x$ and $\\ln(1 + x)$, hence evaluate $\\tan^{-1}(0.2)$ and $\\ln(1.1)$ to 3 d.p.',
          graph: {
            steps: [
              { ask: '$\\frac{0.2^3}{3} = $ (6 d.p.)', answer: 0.002667, tol: 0.000002, hint: '$\\frac{0.008}{3}$.' },
              { ask: '$\\tan^{-1}(0.2) \\approx 0.2 - 0.002667 + \\frac{0.2^5}{5} = $ (3 d.p.)', answer: 0.197, tol: 0.0005, hint: '$0.2 - 0.002667 + 0.000064 = 0.197397$.' },
              { ask: '$\\ln(1.1) \\approx 0.1 - \\frac{0.01}{2} + \\frac{0.001}{3} = $ (3 d.p.)', answer: 0.095, tol: 0.0005, hint: '$0.1 - 0.005 + 0.000333 = 0.095333$; more terms give $0.09531$.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'The exponential series converges for every $x$', correct: true, why: '$n!$ eventually beats $x^n$.' },
            { text: 'The series for $\\ln(1 + x)$ converges at $x = 1$ but not at $x = 2$', correct: true, why: 'Valid for $-1 < x \\le 1$.' },
            { text: 'For an alternating series with shrinking terms, the error is less than the first omitted term', correct: true, why: 'Useful for knowing when to stop.' },
            { text: 'Maclaurin series need the derivatives at $x = 1$', why: 'Maclaurin is about $x = 0$; Taylor about a general $a$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Series: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
