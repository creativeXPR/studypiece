// MTH 209 · Idea B, lesson 12: Newton's method for non-linear systems. Part 1 uses x² + y² = 2,
// x − y = 0 from (2, 1); Part 2 does the 3 × 3 class example with det J = −40 and the stopping test.

export default {
  id: 'newton-systems',
  title: 'Newton’s method for systems',
  covers: 'The Jacobian, x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − J⁻¹F, one full step by hand, and the stopping test',
  minutes: 14,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Jacobian', '$J(x) = \\left[\\dfrac{\\partial f_i}{\\partial x_j}\\right]$: row $i$ holds the partial derivatives of $f_i$.'],
        ['Newton for systems', '$x^{(k+1)} = x^{(k)} - J^{-1}(x^{(k)})F(x^{(k)})$, for $k = 0, 1, 2, \\ldots$, as long as $J$ is non-singular.'],
        ['Stopping test', 'Stop when $\\|x^{(k)} - x^{(k-1)}\\| \\le \\varepsilon$ for every component; $\\varepsilon = 10^{-3}$ if none is given.'],
      ],
      steps: [
        'Write $F(x) = (f_1, \\ldots, f_n)^T$ with every equation as $f_i = 0$.',
        'Write the Jacobian $J(x)$: row $i$ is $\\tfrac{\\partial f_i}{\\partial x_1}, \\ldots, \\tfrac{\\partial f_i}{\\partial x_n}$.',
        'At $x^{(k)}$, evaluate $F$ and $J$; find $\\det J$ (must be non-zero) and $J^{-1}$.',
        '$x^{(k+1)} = x^{(k)} - J^{-1}F$.',
        'Check every component’s change against $\\varepsilon$; repeat until all are below it.',
      ],
      examples: [
        {
          title: '$x^2 + y^2 = 2$, $x - y = 0$ from $(2, 1)$',
          question: 'Do Newton steps until the stopping test with $\\varepsilon = 10^{-3}$ is met.',
          steps: ['$F = (x^2 + y^2 - 2,\\ x - y)$, $J = \\begin{pmatrix} 2x & 2y \\\\ 1 & -1 \\end{pmatrix}$.', 'At $(2, 1)$: $F = (3, 1)$, $J = \\begin{pmatrix} 4 & 2 \\\\ 1 & -1 \\end{pmatrix}$, $\\det J = -6$.', '$J^{-1}F = -\\tfrac16\\begin{pmatrix} -1 & -2 \\\\ -1 & 4 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 0.8333 \\\\ -0.1667 \\end{pmatrix}$, so $x^{(1)} = (1.1667, 1.1667)$.', '$x^{(2)} = (1.0119, 1.0119)$, $x^{(3)} = (1.00007, 1.00007)$.', 'Changes: $0.155$, then $0.0118$, then the next is below $10^{-3}$.'],
          answer: 'Converges to $(1, 1)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 12',
          title: 'Newton, in several dimensions',
          body: 'Fixed-point iteration for systems works, but it can be slow (each step only shrinks the error by $K$). For one equation, Newton was much faster. The same is true for systems.\n\nThe one change: $f\'(x)$ becomes the **Jacobian matrix** $J$, and dividing by $f\'$ becomes multiplying by $J^{-1}$.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Tangent planes instead of a tangent line',
          body: 'One equation: follow the tangent, $x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$.\n\nSeveral: each $f_i$ is replaced by its tangent plane, using all its partial derivatives. Solving those linear equations together gives\n$$x^{(k+1)} = x^{(k)} - J^{-1}(x^{(k)})\\,F(x^{(k)}),$$\nwhere $J$ collects every $\\tfrac{\\partial f_i}{\\partial x_j}$. The linear-systems tools (determinant, inverse) do the work inside each step.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Newton for systems, step by step',
          body: '1. Write $F(x)$, each equation as $f_i = 0$.\n2. Jacobian $J$: row $i$ is the partial derivatives of $f_i$.\n3. At $x^{(k)}$: $F$, $J$, $\\det J \\ne 0$, $J^{-1}$.\n4. $x^{(k+1)} = x^{(k)} - J^{-1}F$.\n5. Stop when **every** component changes by at most $\\varepsilon$ ($10^{-3}$ if not given).',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2 + y^2 = 2$, $x - y = 0$ from $(2, 1)$',
          body: '**Steps 1–2.** $F = (x^2 + y^2 - 2,\\ x - y)$; $J = \\begin{pmatrix} 2x & 2y \\\\ 1 & -1 \\end{pmatrix}$.\n\n**Step 3.** At $(2, 1)$: $F = (3, 1)$, $J = \\begin{pmatrix} 4 & 2 \\\\ 1 & -1 \\end{pmatrix}$, $\\det J = -6$.\n\n**Step 4.** $J^{-1}F = (0.8333, -0.1667)$, so $x^{(1)} = (2 - 0.8333,\\ 1 + 0.1667) = (1.1667, 1.1667)$.\n\n**Step 5.** Then $(1.0119, 1.0119)$, then $(1.00007, 1.00007)$: done.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'The next step from $(1.1667, 1.1667)$',
          graph: {
            steps: [
              { ask: '$f_1 = x^2 + y^2 - 2$ at $(1.1667, 1.1667)$, to 4 dp?', answer: 0.7222, tol: 0.0005, hint: '$2 \\times 1.3611 - 2$.' },
              { ask: '$\\det J = 2x(-1) - 2y(1)$ there, to 4 dp?', answer: -4.6667, tol: 0.001, hint: '$-2.3333 - 2.3333$.' },
              { ask: 'Since $f_2 = 0$, both components drop by $\\tfrac{0.7222}{4.6667}$. New $x$, to 4 dp?', answer: 1.0119, tol: 0.0002, hint: '$1.1667 - 0.1548$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **State** Newton’s method for systems and define the Jacobian.\n• **Solve** a system by Newton from a given $x^{(0)}$: show $F$, $J$, $\\det J$, $J^{-1}$ and each iterate.\n• **State** when to stop, and apply the test.\n• **Explain** what goes wrong if $J$ is singular at an iterate.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Write $F$ and $J$ symbolically first, then substitute $x^{(k)}$.',
        'For a $3 \\times 3$ $J$, use the matrix inverse method (cofactors ÷ det); keep fractions such as $\\tfrac{1}{40}$.',
        'Show the subtraction $x^{(k)} - J^{-1}F$ component by component.',
        'Apply the stopping test to **every** component: if even one change is above $\\varepsilon$, do another step.',
        'Mistake: stopping on the answer the notes give (or the first one that “looks close”) without showing the test.',
      ],
      examples: [
        {
          title: '$x_1^2 + x_2^2 + x_3^2 = 1$, $2x_1^2 + x_2^2 - 4x_3 = 0$, $3x_1^2 - 4x_2 + x_3^2 = 0$',
          question: 'Solve by Newton’s method from $x^{(0)} = (0.5, 0.5, 0.5)$, with $\\varepsilon = 10^{-3}$.',
          steps: ['$J = \\begin{pmatrix} 2x_1 & 2x_2 & 2x_3 \\\\ 4x_1 & 2x_2 & -4 \\\\ 6x_1 & -4 & 2x_3 \\end{pmatrix}$.', 'At $x^{(0)}$: $F = (-0.25, -1.25, -1.0)$, $J = \\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 1 & -4 \\\\ 3 & -4 & 1 \\end{pmatrix}$, $\\det J = -40$.', '$x^{(1)} = x^{(0)} - J^{-1}F = (0.875, 0.5, 0.375)$.', '$x^{(2)} = (0.789817, 0.496622, 0.369932)$; $x^{(3)} = (0.785210, 0.496611, 0.369923)$.', 'Largest change from $x^{(2)}$ to $x^{(3)}$ is $0.0046 > 10^{-3}$, so step again: $x^{(4)} = (0.785197, 0.496611, 0.369923)$, change $0.000013 \\le 10^{-3}$. Stop.'],
          answer: '$x \\approx (0.7852, 0.4966, 0.3699)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The class example',
          body: '“Solve $x_1^2 + x_2^2 + x_3^2 = 1$, $2x_1^2 + x_2^2 - 4x_3 = 0$, $3x_1^2 - 4x_2 + x_3^2 = 0$ by Newton’s method with $x^{(0)} = (0.5, 0.5, 0.5)$.”\n\n**What the examiner wants:** $F(x)$ and $J(x)$; $F(x^{(0)})$, $J(x^{(0)})$, $\\det J = -40$ and $J^{-1}$; $x^{(1)} = (0.875, 0.5, 0.375)$; further iterates; and the stopping test applied at the end.',
          asides: [{ label: 'Exam tip', text: 'Stop only when **every** component’s change is $\\le \\varepsilon$. If even one is bigger, keep going. With no $\\varepsilon$ given, use $10^{-3}$.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'The first Newton step',
          graph: {
            steps: [
              { ask: '$f_2 = 2x_1^2 + x_2^2 - 4x_3$ at $(0.5, 0.5, 0.5)$?', answer: -1.25, tol: 0.001, hint: '$0.5 + 0.25 - 2$.' },
              { ask: '$\\det J$ for $\\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 1 & -4 \\\\ 3 & -4 & 1 \\end{pmatrix}$?', answer: -40, tol: 0.01, hint: '$1(1 - 16) - 1(2 + 12) + 1(-8 - 3)$.' },
              { ask: '$x_1^{(1)} = 0.5 - (J^{-1}F)_1$ with $(J^{-1}F)_1 = -0.375$?', answer: 0.875, tol: 0.001, hint: '$0.5 + 0.375$.' },
              { ask: 'Largest change from $x^{(2)}$ to $x^{(3)}$ is $0.0046$. With $\\varepsilon = 10^{-3}$, do you stop?', options: ['No, $0.0046 > 0.001$; one more step', 'Yes'], answer: 0, hint: 'Compare with $\\varepsilon$.' },
            ],
            after: '$x^{(4)}$ changes by only $0.000013$, so stop: $x \\approx (0.7852, 0.4966, 0.3699)$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student computes $x^{(1)} = x^{(0)} + J^{-1}F$. What is wrong?',
          options: [
            { text: 'It is minus: $x^{(1)} = x^{(0)} - J^{-1}F$, just as Newton subtracts $\\tfrac{f}{f\'}$', correct: true, why: 'The step moves against $F$; adding sends you away from the root.' },
            { text: 'It should be $J \\cdot F$, not $J^{-1}F$', why: 'You divide by the derivative, so it is the inverse.' },
            { text: 'Nothing', why: 'The sign matters.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Stop or continue?',
          graph: {
            steps: [
              { ask: '$x^{(3)} = (0.785210, 0.496611, 0.369923)$ and $x^{(4)} = (0.785197, 0.496611, 0.369923)$. Largest change, to 6 dp?', answer: 0.000013, tol: 0.000002, hint: '$0.785210 - 0.785197$.' },
              { ask: 'With $\\varepsilon = 10^{-3}$:', options: ['Stop: $0.000013 \\le 0.001$', 'Continue'], answer: 0, hint: 'All components are within $\\varepsilon$.' },
              { ask: 'Answer for $x_1$ to 4 dp?', answer: 0.7852, tol: 0.0001, hint: 'Round $0.785197$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Idea B is complete.',
          body: '**Summary:** $x^{(k+1)} = x^{(k)} - J^{-1}F$; build $J$ from partial derivatives; $\\det J \\ne 0$; stop when every component changes by at most $\\varepsilon$.\n\n**Idea B in one line:** trap or iterate towards where things balance, for one equation, linear systems and non-linear systems.\n\n**Next, Idea C:** rebuilding a function from a **table of values**, starting with **finite differences**.',
        },
      ],
    },
  ],
};
