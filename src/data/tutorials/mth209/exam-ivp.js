// MTH 209 · Initial value problems · Exam practice, shaped on past examination questions: Euler's
// method to 5 d.p., the Taylor series method for an IVP, verifying the Lipschitz condition and
// uniqueness, and the definitions of IVP and well-posedness.

export default {
  id: 'exam-ivp',
  title: 'Exam practice: initial value problems',
  covers: 'Exam-style questions: Euler’s method to a given accuracy, the Taylor series method for y\' = f(x, y), the Lipschitz condition and the existence and uniqueness theorem, well-posed problems, definitions',
  minutes: 22,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Euler', '$y_{i+1} = y_i + hf(x_i, y_i)$.'],
        ['Taylor method', '$y(x_0 + h) = y_0 + hy\'_0 + \\frac{h^2}{2!}y\'\'_0 + \\frac{h^3}{3!}y\'\'\'_0 + \\cdots$, differentiating the DE to get $y\'\', y\'\'\'$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'IVP questions, as set',
          body: 'Expect: **step** an IVP with Euler’s method (or the Taylor method) to a given number of decimal places, **verify** a Lipschitz condition and conclude that the solution is unique, and **define** the terms.\n\nThe pictures: Euler walks along tangents and drifts; the Taylor method copies the solution near the start using its derivatives there; Lipschitz means nearby starts stay nearby.',
          cta: 'Start',
          asides: [{ label: 'Exam tip', text: 'If a question names a method, use that method: a correct answer by another method can lose the method marks.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Use Euler’s method ($h = 0.1$) to estimate $y(0.2)$ to 5 d.p. for $y\' = \\frac{-y^2}{1 + x}$, $y(0) = 1$.',
          graph: {
            steps: [
              { ask: '$y_1 = 1 + 0.1 \\times f(0, 1) = $', answer: 0.9, tol: 0.00001, hint: '$f(0, 1) = -1$.' },
              { ask: '$y_2 = $ (5 d.p.)', answer: 0.82636, tol: 0.00002, hint: '$0.9 + 0.1 \\times \\frac{-0.81}{1.1}$.' },
              { ask: 'The exact value is $\\frac{1}{1 + \\ln 1.2} = 0.84579$. Error (5 d.p.)', answer: 0.01943, tol: 0.00003, hint: '$0.84579 - 0.82636$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'If $y\' = 3x + y^2$ and $y = 1.2$ when $x = 1$, use the Taylor series method to approximate $y$ at $x = 1.1$.',
          body: 'Differentiate: $y\'\' = 3 + 2yy\'$, $y\'\'\' = 2(y\')^2 + 2yy\'\'$.',
          graph: {
            steps: [
              { ask: '$y\'(1) = $', answer: 4.44, tol: 0.0001, hint: '$3 + 1.44$.' },
              { ask: '$y\'\'(1) = $', answer: 13.656, tol: 0.001, hint: '$3 + 2(1.2)(4.44)$.' },
              { ask: '$y\'\'\'(1) = $ (4 d.p.)', answer: 72.2016, tol: 0.001, hint: '$2(4.44)^2 + 2(1.2)(13.656)$.' },
              { ask: '$y(1.1) \\approx$ (4 d.p.)', answer: 1.7243, tol: 0.0002, hint: '$1.2 + 0.1(4.44) + \\frac{0.01}{2}(13.656) + \\frac{0.001}{6}(72.2016)$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Use the Taylor series to solve $y\' = -xy$, $y(0) = 1$, correct to 4 d.p. at $x = 0.1$ and $x = 0.3$.',
          body: 'Derivatives at $0$: $y = 1$, $y\' = 0$, $y\'\' = -1$, $y\'\'\' = 0$, $y^{(4)} = 3$, so $y \\approx 1 - \\frac{x^2}{2} + \\frac{x^4}{8} - \\cdots$.',
          graph: {
            steps: [
              { ask: '$y(0.1) \\approx$ (4 d.p.)', answer: 0.995, tol: 0.00005, hint: '$1 - 0.005 + 0.0000125$.' },
              { ask: '$y(0.3) \\approx$ (4 d.p.)', answer: 0.956, tol: 0.00005, hint: '$1 - 0.045 + 0.0010125$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Theory',
      terms: [
        ['Uniqueness theorem', '$f$ continuous on $D = \\{a \\le x \\le b, -\\infty < y < \\infty\\}$ and Lipschitz in $y$ ⇒ the IVP has a unique solution.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Question 4',
          prompt: 'Show that $f(x, y) = |xy|$ satisfies a Lipschitz condition on $D = \\{1 \\le x \\le 2, -3 \\le y \\le 4\\}$. Order the lines.',
          items: [
            'For $(x, y_1), (x, y_2) \\in D$: $|f(x, y_1) - f(x, y_2)| = \\big||xy_1| - |xy_2|\\big|$.',
            '$= |x|\\,\\big||y_1| - |y_2|\\big| \\le |x|\\,|y_1 - y_2|$.',
            'Since $|x| \\le 2$ on $D$, this is $\\le 2|y_1 - y_2|$.',
            'So $f$ is Lipschitz in $y$ on $D$ with Lipschitz constant $L = 2$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'An initial value problem is',
          options: [
            { text: 'a differential equation (or system) whose solution values are specified at the initial point of the interval', correct: true, why: 'E.g. $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$.' },
            { text: 'a differential equation with conditions at both ends of the interval', why: 'That is a boundary value problem.' },
            { text: 'any differential equation with a unique solution', why: 'Uniqueness is a property to check, not the definition.' },
            { text: 'an equation solved by Euler’s method', why: 'Euler is one method for IVPs.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Euler’s method is the Taylor method cut after the first derivative', correct: true, why: '$y(x + h) \\approx y(x) + hy\'(x)$.' },
            { text: 'Halving $h$ roughly halves Euler’s error', correct: true, why: 'Its global error is proportional to $h$.' },
            { text: 'If $\\left|\\frac{\\partial f}{\\partial y}\\right| \\le L$ on a convex set, $f$ is Lipschitz there with constant $L$', correct: true, why: 'By the mean value theorem.' },
            { text: 'A numerical method can be trusted even if the IVP has no unique solution', why: 'Check uniqueness (and well-posedness) first.' },
          ],
        },
        {
          type: 'finish',
          title: 'Initial value problems: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
