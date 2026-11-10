// MTH 209 · Part A · Lesson 2: error propagation. Derives the rules for sums, differences,
// products and quotients (with the quotient "show that"), the function rule, and works the notes'
// examples: 24.5/12.37 and (15.36 + 27.1 − 1.672)/(2.36 × 1.043). Loss of significance last.
// Every number below was recomputed in Python (see docs/mth209-rebuild.md).
import { productErrorScene } from './error-scenes';

export default {
  id: 'error-spread',
  title: 'How errors spread',
  covers: 'Error propagation: derivations for sums, differences, products and quotients, maximum absolute and relative errors, the error in a function, limits of a computed value, and loss of significance',
  minutes: 16,
  sections: [
    {
      name: 'The rules, derived',
      terms: [
        ['Sum / difference', '$x_1 \\pm x_2 - (X_1 \\pm X_2) = \\varepsilon_1 \\pm \\varepsilon_2$, so the error is at most $|\\varepsilon_1| + |\\varepsilon_2|$.'],
        ['Product', 'Relative error $\\le \\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$; absolute error $\\approx X_1|\\varepsilon_2| + X_2|\\varepsilon_1|$.'],
        ['Quotient', 'Relative error $\\le \\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$; absolute error $\\le$ that $\\times \\frac{X_1}{X_2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part A · Lesson 2',
          title: 'Errors travel through a calculation',
          body: 'Last lesson measured the error in one number. But every answer is **built** from numbers that already carry errors: $24.5$ correct to 1 d.p. is really $24.5 \\pm 0.05$.\n\nWrite each true value as $x_1 = X_1 + \\varepsilon_1$, $x_2 = X_2 + \\varepsilon_2$. Then ask: what error does $X_1 + X_2$, $X_1X_2$ or $\\frac{X_1}{X_2}$ carry? Exams ask you both to **derive** the rules and to **use** them.',
          cta: 'Derive them',
        },
        {
          type: 'story',
          eyebrow: 'Sums and differences',
          title: 'Absolute errors add, even when you subtract',
          body: '$$\\begin{aligned}x_1 + x_2 &= (X_1 + X_2) + (\\varepsilon_1 + \\varepsilon_2)\\\\ x_1 - x_2 &= (X_1 - X_2) + (\\varepsilon_1 - \\varepsilon_2)\\end{aligned}$$\nIn the worst case $\\varepsilon_1$ and $\\varepsilon_2$ have signs that reinforce, so for **both**:\n$$|\\text{error}| \\le |\\varepsilon_1| + |\\varepsilon_2|.$$\n\nExample: $15.36$ (2 d.p.), $27.1$ (1 d.p.) and $1.672$ (3 d.p.). The maximum error in $15.36 + 27.1 - 1.672$ is $0.005 + 0.05 + 0.0005 = 0.0555$.',
        },
        productErrorScene,
        {
          type: 'story',
          eyebrow: 'Products',
          title: 'Relative errors add',
          body: '$$x_1x_2 = (X_1 + \\varepsilon_1)(X_2 + \\varepsilon_2) = X_1X_2 + X_1\\varepsilon_2 + X_2\\varepsilon_1 + \\varepsilon_1\\varepsilon_2$$\n$\\varepsilon_1\\varepsilon_2$ is a product of two small errors: neglect it. So\n$$x_1x_2 - X_1X_2 \\approx X_1\\varepsilon_2 + X_2\\varepsilon_1.$$\nDivide by $X_1X_2$: the relative error is $\\frac{\\varepsilon_1}{X_1} + \\frac{\\varepsilon_2}{X_2}$, at most $\\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$.\n\nWith $X_1, X_2 > 0$ the worst case is errors of the same sign, giving absolute error $X_1|\\varepsilon_2| + X_2|\\varepsilon_1|$.',
        },
        {
          type: 'order',
          eyebrow: 'Show that: quotients',
          prompt: 'Show that the relative error of $\\frac{X_1}{X_2}$ is at most $\\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$. Order the lines.',
          items: [
            '$\\frac{x_1}{x_2} - \\frac{X_1}{X_2} = \\frac{X_1 + \\varepsilon_1}{X_2 + \\varepsilon_2} - \\frac{X_1}{X_2} = \\frac{X_2\\varepsilon_1 - X_1\\varepsilon_2}{X_2(X_2 + \\varepsilon_2)}$',
            '$\\varepsilon_2$ is small beside $X_2$, so the denominator $\\approx X_2^2$.',
            'Divide by $\\frac{X_1}{X_2}$: relative error $\\approx \\frac{\\varepsilon_1}{X_1} - \\frac{\\varepsilon_2}{X_2}$.',
            'Worst case, opposite signs: $\\le \\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$X_1 = 2.35$ and $X_2 = 1.26$, each correct to 2 d.p. Find the maximum errors in $X_1 + X_2$ and in $X_1X_2$.',
          graph: {
            steps: [
              { ask: 'Maximum error in $X_1 + X_2$', answer: 0.01, tol: 0.0001, hint: '$0.005 + 0.005$.' },
              { ask: '$X_1X_2 = $ (3 d.p.)', answer: 2.961, tol: 0.0005, hint: '$2.35 \\times 1.26$.' },
              { ask: 'Relative error $\\frac{0.005}{2.35} + \\frac{0.005}{1.26} = $ (6 d.p.)', answer: 0.006096, tol: 0.000002, hint: '$0.002128 + 0.003968$.' },
              { ask: 'Maximum absolute error of the product (5 d.p.)', answer: 0.01805, tol: 0.00003, hint: '$2.961 \\times 0.006096$, or $2.35(0.005) + 1.26(0.005)$.', done: '$X_1X_2 = 2.961 \\pm 0.018$' },
            ],
          },
        },
      ],
    },
    {
      name: 'Using the rules',
      terms: [
        ['Function of one value', 'An error $\\varepsilon$ in $x$ gives $|\\Delta f| \\approx |f\'(x)|\\,|\\varepsilon|$.'],
        ['Limits of a value', 'Value $\\pm$ maximum absolute error.'],
        ['Loss of significance', 'Subtracting nearly equal numbers keeps the absolute error but shrinks the answer, so the relative error explodes.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Worked: a quotient',
          title: 'Find $\\frac{24.5}{12.37}$ and its maximum error, where $24.5$ is correct to 1 d.p. and $12.37$ to 2 d.p.',
          graph: {
            steps: [
              { ask: '$\\frac{24.5}{12.37} = $ (4 d.p.)', answer: 1.9806, tol: 0.0001, hint: 'Divide.' },
              { ask: 'Relative error of $24.5$: $\\frac{0.05}{24.5} = $ (6 d.p.)', answer: 0.002041, tol: 0.000002, hint: 'Max error $0.05$ for 1 d.p.' },
              { ask: 'Relative error of $12.37$: $\\frac{0.005}{12.37} = $ (6 d.p.)', answer: 0.000404, tol: 0.000002, hint: 'Max error $0.005$ for 2 d.p.' },
              { ask: 'Maximum absolute error (4 d.p.)', answer: 0.0048, tol: 0.0001, hint: '$(0.002041 + 0.000404) \\times 1.9806$.', done: 'Value $1.9806 \\pm 0.0048$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Worked: mixed',
          title: 'Find $\\dfrac{15.36 + 27.1 - 1.672}{2.36 \\times 1.043}$ and its limits, each number rounded to its last place.',
          body: 'Numerator: errors add. Denominator: $X_1|\\varepsilon_2| + X_2|\\varepsilon_1|$. Quotient: relative errors add.',
          graph: {
            steps: [
              { ask: 'Numerator, and its max error is $0.0555$. Numerator $= $', answer: 40.788, tol: 0.0005, hint: '$15.36 + 27.1 - 1.672$.' },
              { ask: 'Denominator max error $2.36(0.0005) + 1.043(0.005) = $ (6 d.p.)', answer: 0.006395, tol: 0.000002, hint: '$0.00118 + 0.005215$. Denominator $= 2.46148$.' },
              { ask: 'Value $\\frac{40.788}{2.46148} = $ (4 d.p.)', answer: 16.5705, tol: 0.0002, hint: 'Divide.' },
              { ask: 'Relative error $\\frac{0.0555}{40.788} + \\frac{0.006395}{2.46148} = $ (5 d.p.)', answer: 0.00396, tol: 0.00002, hint: '$0.001361 + 0.002598$.' },
              { ask: 'Maximum absolute error (3 d.p.)', answer: 0.066, tol: 0.0006, hint: '$16.5705 \\times 0.00396$.', done: 'The value lies between $16.505$ and $16.636$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Functions',
          title: 'The slope magnifies the error',
          body: 'If $x$ carries error $\\varepsilon$, then $f(x + \\varepsilon) \\approx f(x) + \\varepsilon f\'(x)$, so\n$$|\\Delta f| \\approx |f\'(x)|\\,|\\varepsilon|.$$\n\nExample: $x = 2.0 \\pm 0.05$, $f(x) = x^3$. Then $f = 8$ and $|\\Delta f| \\approx 3(2)^2(0.05) = 0.6$. Check: $1.95^3 = 7.41$ and $2.05^3 = 8.62$, about $8 \\pm 0.6$ ✓.\n\nThis is the first term of a **Taylor series**, the engine of the next lesson.',
        },
        {
          type: 'choice',
          eyebrow: 'Watch out',
          prompt: '$3.142$ and $3.141$ are each correct to 3 d.p. What happens to the relative error of $3.142 - 3.141$?',
          options: [
            { text: 'It explodes: about $100\\%$', correct: true, why: 'The answer $0.001$ carries an absolute error up to $0.0005 + 0.0005 = 0.001$, as large as the answer itself.' },
            { text: 'It cancels to zero, because the errors subtract', why: 'In the worst case the errors reinforce: absolute errors add for differences too.' },
            { text: 'It stays about $0.016\\%$, the same as each input', why: 'The absolute error survives, but the answer has shrunk to $0.001$.' },
          ],
          explain: 'Loss of significance: rearrange a formula to avoid subtracting nearly equal numbers whenever you can.',
        },
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which errors add for each operation?',
          options: [
            { text: 'Sums and differences: absolute. Products and quotients: relative.', correct: true, why: 'Exactly the two rules derived above.' },
            { text: 'Sums: absolute. Differences: they subtract.', why: 'Worst case, they still add.' },
            { text: 'All four: relative errors add.', why: 'Only for products and quotients.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can track an error through any calculation.',
          body: 'Sums, differences, products, quotients and functions, with the proofs. Next: Taylor series, the engine behind the function rule.',
        },
      ],
    },
  ],
};
