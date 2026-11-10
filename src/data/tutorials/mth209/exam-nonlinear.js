// MTH 209 · Systems of non-linear equations · Exam practice: writing F(x) = 0, rearranging to
// x = G(x) and checking the fixed-point theorem, the Jacobian, one or more Newton steps for a
// 3 × 3 system, comparing the two methods, and the definitions.

export default {
  id: 'exam-nonlinear',
  title: 'Exam practice: non-linear systems',
  covers: 'Exam-style questions: non-linear systems as F(x) = 0, fixed points and the fixed-point theorem with its conditions, the Jacobian matrix, Newton’s method for a 3 × 3 system, stopping rules and comparing the methods',
  minutes: 22,
  sections: [
    {
      name: 'Fixed points and Newton',
      terms: [
        ['Fixed-point theorem', '$G$ continuous on a box $D$ with $G(D) \\subseteq D$ ⇒ a fixed point exists; if also every $\\left|\\frac{\\partial g_i}{\\partial x_j}\\right| \\le \\frac{K}{n}$ with $K < 1$, it is unique and the iteration converges from any start in $D$.'],
        ['Newton', '$\\mathbf{x}^{(k+1)} = \\mathbf{x}^{(k)} - J^{-1}(\\mathbf{x}^{(k)})F(\\mathbf{x}^{(k)})$, needs $|J| \\ne 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'Non-linear systems, as set',
          body: 'Expect to write a system as $F(\\mathbf{x}) = 0$, rearrange it as $\\mathbf{x} = G(\\mathbf{x})$ and check the fixed-point theorem, build the Jacobian, take Newton steps, and say when to stop.',
          asides: [
            { label: 'Exam tip', text: 'Use the method the question names. For Newton, stop when $\\|\\mathbf{x}^{(k)} - \\mathbf{x}^{(k-1)}\\| \\le \\varepsilon$, checking every component.' },
          ],
          cta: 'Start',
        },
        {
          type: 'choice',
          eyebrow: 'Question 1',
          prompt: 'Which system is non-linear?',
          options: [
            { text: '$x_1^2 + x_2 = 3$, $x_1 - x_2 = 1$', correct: true, why: 'The $x_1^2$ term makes it non-linear.' },
            { text: '$2x_1 + 3x_2 = 5$, $x_1 - x_2 = 0$', why: 'Every term is a constant times an unknown.' },
            { text: '$x_1 + x_2 + x_3 = 1$, $x_1 - x_3 = 2$, $x_2 = 4$', why: 'All linear.' },
            { text: '$\\frac12x_1 = x_2$, $x_2 = 3$', why: 'Still linear.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Rewrite $3x_1 - \\cos(x_2x_3) - \\frac12 = 0$ (and two more equations) as $x = G(x)$ on $D = [-1, 1]^3$. If every partial derivative is at most $0.281$, does the fixed-point theorem guarantee convergence?',
          graph: {
            steps: [
              { ask: '$g_1 = \\frac13\\cos(x_2x_3) + c$ with $c = $ (4 d.p.)', answer: 0.1667, tol: 0.0002, hint: '$x_1 = \\frac13\\cos(x_2x_3) + \\frac16$.' },
              { ask: 'With $n = 3$, $K = n \\times 0.281 = $', answer: 0.843, tol: 0.001, hint: 'Each partial derivative $\\le \\frac{K}{n}$.' },
              { ask: 'Conclusion', options: ['$K < 1$: a unique fixed point in $D$, and the iteration converges', '$K > 1$: no conclusion'], answer: 0, hint: '$0.843 < 1$.' },
              { ask: 'From $(0.1, 0.1, -0.1)$: $x_1^{(1)} = \\frac13\\cos(-0.01) + \\frac16 = $ (5 d.p.)', answer: 0.49998, tol: 0.00002, hint: '$\\cos(0.01) = 0.99995$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Use Newton’s method once on $x_1^2 + x_2^2 + x_3^2 = 1$, $2x_1^2 + x_2^2 - 4x_3 = 0$, $3x_1^2 - 4x_2 + x_3^2 = 0$ from $\\mathbf{x}^{(0)} = (0.5, 0.5, 0.5)$.',
          body: '$J = \\begin{pmatrix} 2x_1 & 2x_2 & 2x_3 \\\\ 4x_1 & 2x_2 & -4 \\\\ 6x_1 & -4 & 2x_3 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$F_1(\\mathbf{x}^{(0)}) = $', answer: -0.25, tol: 0.0001, hint: '$0.75 - 1$.' },
              { ask: '$F_2(\\mathbf{x}^{(0)}) = $', answer: -1.25, tol: 0.0001, hint: '$0.5 + 0.25 - 2$.' },
              { ask: '$F_3(\\mathbf{x}^{(0)}) = $', answer: -1, tol: 0.0001, hint: '$0.75 - 2 + 0.25$.' },
              { ask: '$\\det J(\\mathbf{x}^{(0)}) = $', answer: -40, tol: 0.001, hint: '$J = \\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 1 & -4 \\\\ 3 & -4 & 1 \\end{pmatrix}$.' },
              { ask: '$x_1^{(1)} = $', answer: 0.875, tol: 0.0001, hint: '$\\mathbf{x}^{(1)} = (0.875, 0.5, 0.375)$.' },
              { ask: '$x_3^{(1)} = $', answer: 0.375, tol: 0.0001, hint: 'Third component of $\\mathbf{x}^{(0)} - J^{-1}F$.' },
            ],
          },
        },
        {
          type: 'order',
          eyebrow: 'Question 4',
          prompt: 'Order the steps of Newton’s method for $F(\\mathbf{x}) = 0$.',
          items: [
            'Choose a starting vector $\\mathbf{x}^{(0)}$ close to the solution.',
            'Evaluate $F(\\mathbf{x}^{(k)})$ and the Jacobian $J(\\mathbf{x}^{(k)})$; check $|J| \\ne 0$.',
            'Compute $\\mathbf{x}^{(k+1)} = \\mathbf{x}^{(k)} - J^{-1}(\\mathbf{x}^{(k)})F(\\mathbf{x}^{(k)})$.',
            'Stop when successive iterates agree to the required accuracy.',
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Newton converges much faster than fixed-point iteration near the root', correct: true, why: 'Quadratically: the tangents picture.' },
            { text: 'Newton needs the Jacobian at every step', correct: true, why: 'And its inverse (or a linear solve).' },
            { text: 'Fixed-point iteration needs $G(D) \\subseteq D$ for the theorem to apply', correct: true, why: 'Plus small partial derivatives for uniqueness and convergence.' },
            { text: 'Newton works from any starting point', why: 'It needs a start close enough, and $|J| \\ne 0$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Non-linear systems: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
