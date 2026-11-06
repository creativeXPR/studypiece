// MTH 209 · Error analysis · Exam practice, shaped on past examination questions: types of error,
// absolute and relative error and rounding to d places, errors in sums, differences and products
// (with the product and quotient inequalities), and limits for computed expressions.

export default {
  id: 'exam-errors',
  title: 'Exam practice: errors',
  covers: 'Exam-style questions: types of approximation error, absolute and relative error, rounding to d decimal places, errors in sum, difference, product and quotient with proofs, maximum error of an expression and the limits of a computed value',
  minutes: 22,
  sections: [
    {
      name: 'Definitions and proofs',
      terms: [
        ['Absolute / relative error', '$|x_t - X|$ and $\\frac{|x_t - X|}{|x_t|}$.'],
        ['Rounded to $d$ d.p.', '$|x - x_d| \\le \\frac12 \\times 10^{-d}$.'],
        ['Sum / difference', 'Errors add: $|\\varepsilon| \\le |\\varepsilon_1| + |\\varepsilon_2|$.'],
        ['Product / quotient', 'Relative errors add: $\\le \\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$.'],
      ],
      screens: [
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
          type: 'choice',
          eyebrow: 'Question 1(a)',
          prompt: 'If $X$ has an infinite representation, "$X$ has been rounded off to $d$ decimal places" means its approximation $x_d$ satisfies',
          options: [
            { text: '$|X - x_d| \\le \\frac12 \\times 10^{-d}$', correct: true, why: 'Within half a unit of the last kept place.' },
            { text: '$|X - x_d| \\le 10^{-d}$', why: 'That is the chopping bound; rounding halves it.' },
            { text: '$x_d$ has exactly $d$ significant figures', why: 'Decimal places count after the point, not significant figures.' },
            { text: '$|X - x_d| = 0$', why: 'An infinite expansion can’t be stored exactly.' },
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
          title: '$y_1$, $y_2$ have approximations $Y_1$, $Y_2$ with errors $\\varepsilon_1$, $\\varepsilon_2$. Take $Y_1 = 15.36$ (2 d.p.), $Y_2 = 27.1$ (1 d.p.). Find the maximum error in the sum, the difference and the product.',
          graph: {
            steps: [
              { ask: '$|\\varepsilon_1| \\le $', answer: 0.005, tol: 0.0001, hint: 'Half a unit in the 2nd place.' },
              { ask: '$|\\varepsilon_2| \\le $', answer: 0.05, tol: 0.001, hint: 'Half a unit in the 1st place.' },
              { ask: 'Max error in $Y_1 + Y_2$ (and in $Y_1 - Y_2$)', answer: 0.055, tol: 0.0005, hint: 'Errors add for both.' },
              { ask: 'Max error in $Y_1Y_2$: $Y_1|\\varepsilon_2| + Y_2|\\varepsilon_1| = $ (4 d.p.)', answer: 0.9035, tol: 0.0006, hint: '$15.36(0.05) + 27.1(0.005)$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Calculations',
      terms: [
        ['Function of one value', 'Max error in $f(x) \\approx |f\'(x)| \\times |\\varepsilon|$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Evaluate $x^2 - 2 + \\frac{1}{x^2}$ at $x = 1.473$ and estimate the maximum error, taking the integer coefficients as exact and $1.473$ as correct to 3 d.p.',
          graph: {
            steps: [
              { ask: 'Value (5 d.p.)', answer: 0.63062, tol: 0.00003, hint: '$2.169729 - 2 + 0.460891$.' },
              { ask: '$|\\varepsilon_x| \\le $', answer: 0.0005, tol: 0.00001, hint: 'Correct to 3 d.p.' },
              { ask: '$f\'(x) = 2x - \\frac{2}{x^3}$ at $1.473$ (4 d.p.)', answer: 2.3202, tol: 0.0003, hint: '$2.946 - 0.6258$.' },
              { ask: 'Maximum error $\\approx |f\'| \\times 0.0005 = $ (6 d.p.)', answer: 0.00116, tol: 0.00002, hint: '$2.3202 \\times 0.0005$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Evaluate $\\frac{2.362 \\times 1.76}{1.46 \\times 0.785}$ and, assuming maximum round-off error in each number, find the limits between which the value lies.',
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
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'In a sum or difference, absolute errors add', correct: true, why: '$|\\varepsilon_1 \\pm \\varepsilon_2| \\le |\\varepsilon_1| + |\\varepsilon_2|$.' },
            { text: 'In a product or quotient, relative errors add', correct: true, why: 'The rectangle picture: two strips plus a negligible corner.' },
            { text: 'Subtracting two nearly equal numbers can make the relative error huge', correct: true, why: 'The absolute error stays, but the result is tiny.' },
            { text: 'Chopping and rounding have the same maximum error', why: 'Chopping: up to $10^{-d}$; rounding: up to $\\frac12 \\times 10^{-d}$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Errors: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
