// MTH 209 · Idea B, lesson 11: non-linear systems and fixed-point iteration. Part 1 builds the
// fixed-point theorem on a simple 2 × 2 (x = (1 + y²)/5, y = (1 + x²)/5); Part 2 does the class example
// (3x₁ − cos(x₂x₃) − ½ = 0, …) with K = 0.843 and the first iterate.

export default {
  id: 'fixed-point-systems',
  title: 'Non-linear systems: fixed points',
  covers: 'F(x) = 0 in several unknowns, fixed-point form G(x) = x, the convergence condition K < 1, and iterating',
  minutes: 14,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Non-linear system', '$f_i(x_1, \\ldots, x_n) = 0$ for $i = 1..n$, written $F(x) = 0$ with $F: \\mathbb R^n \\to \\mathbb R^n$.'],
        ['Fixed point', 'A point $p$ with $G(p) = p$.'],
        ['Fixed-point theorem', 'If $G$ is continuous on $D$, $G(x) \\in D$ for all $x \\in D$, and every $\\left|\\tfrac{\\partial g_i}{\\partial x_j}\\right| \\le \\tfrac{K}{n}$ on $D$ with $K < 1$, then $G$ has a unique fixed point in $D$, and $x^{(k)} = G(x^{(k-1)})$ converges to it from any $x^{(0)} \\in D$.'],
        ['Error bound', '$\\|x^{(k)} - p\\|_\\infty \\le \\dfrac{K^k}{1 - K}\\|x^{(1)} - x^{(0)}\\|_\\infty$.'],
      ],
      steps: [
        'Fixed-point form: solve equation $i$ for $x_i$, giving $x_i = g_i(x_1, \\ldots, x_n)$.',
        'Check $G$ maps $D$ into $D$: bound each $g_i$ on $D$ (use the extreme values of the variables).',
        'Bound every partial derivative $\\left|\\tfrac{\\partial g_i}{\\partial x_j}\\right|$ on $D$. The largest bound is $\\tfrac{K}{n}$; need $K < 1$.',
        'Conclude by the fixed-point theorem: a unique solution in $D$.',
        'Iterate $x^{(k)} = G(x^{(k-1)})$ from $x^{(0)}$ until $\\|x^{(k)} - x^{(k-1)}\\|_\\infty$ is below the tolerance.',
      ],
      examples: [
        {
          title: '$x = \\tfrac{1 + y^2}{5}$, $y = \\tfrac{1 + x^2}{5}$ on $D = [0, 1]^2$',
          question: 'Show there is a unique fixed point in $D$ and iterate from $(0, 0)$.',
          steps: ['On $D$, $g_1, g_2 \\in [0.2, 0.4] \\subset [0, 1]$: $G$ maps $D$ into $D$.', '$\\left|\\tfrac{\\partial g_1}{\\partial y}\\right| = \\tfrac{2y}{5} \\le 0.4$, same for $g_2$; the other partials are $0$. So $\\tfrac{K}{2} = 0.4$, $K = 0.8 < 1$.', 'Unique fixed point by the theorem.', '$(0.2, 0.2) \\to (0.208, 0.208) \\to (0.208653, 0.208653) \\to (0.208707, 0.208707)$.'],
          answer: 'Fixed point $\\approx (0.2087, 0.2087)$ (exactly $\\tfrac{5 - \\sqrt{21}}{2}$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 11',
          title: 'When the equations bend',
          body: 'Linear systems have straight-line equations. Many real problems (how far a plate sinks into soil under pressure, chemical balances) give **non-linear** equations: squares, $\\cos$, $e^x$, all at once.\n\nNo elimination works here. But the **fixed-point** idea from linear iteration does: rewrite the system as $x = G(x)$ and iterate.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Same engine, more dimensions',
          body: 'One equation: $x = g(x)$ converges if $|g\'| < 1$. Several: $x = G(x)$, and now $G$ has **partial derivatives** $\\tfrac{\\partial g_i}{\\partial x_j}$, one for each pair.\n\nThe condition becomes: every $\\left|\\tfrac{\\partial g_i}{\\partial x_j}\\right| \\le \\tfrac{K}{n}$ with $K < 1$. Then each step shrinks the error by at least a factor $K$, and $G$ also has to keep points inside $D$, so the iteration can’t escape.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Fixed-point iteration for a system',
          body: '1. Fixed-point form: solve equation $i$ for $x_i$.\n2. Bound each $g_i$ on $D$; confirm $G(D) \\subset D$.\n3. Bound every $\\left|\\tfrac{\\partial g_i}{\\partial x_j}\\right|$ on $D$; the largest is $\\tfrac{K}{n}$; need $K < 1$.\n4. Conclude: unique solution in $D$ (fixed-point theorem).\n5. Iterate until $\\|x^{(k)} - x^{(k-1)}\\|_\\infty <$ tolerance.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x = \\tfrac{1 + y^2}{5}$, $y = \\tfrac{1 + x^2}{5}$',
          body: '**Step 2.** On $D = [0, 1]^2$, both $g$’s lie in $[0.2, 0.4]$, inside $D$. ✓\n\n**Step 3.** $\\left|\\tfrac{\\partial g_1}{\\partial y}\\right| = \\tfrac{2y}{5} \\le 0.4$; $\\left|\\tfrac{\\partial g_2}{\\partial x}\\right| \\le 0.4$; the others are $0$. With $n = 2$: $\\tfrac{K}{2} = 0.4$, so $K = 0.8 < 1$.\n\n**Step 4.** Unique fixed point in $D$.\n\n**Step 5.** $(0.2, 0.2), (0.208, 0.208), (0.20865, 0.20865), (0.20871, 0.20871)$: it settles at $0.2087$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Checking the conditions',
          graph: {
            steps: [
              { ask: 'Largest value of $g_1 = \\tfrac{1 + y^2}{5}$ on $0 \\le y \\le 1$?', answer: 0.4, tol: 0.001, hint: 'Put $y = 1$.' },
              { ask: 'Largest $\\left|\\tfrac{\\partial g_1}{\\partial y}\\right| = \\tfrac{2y}{5}$ on $D$?', answer: 0.4, tol: 0.001, hint: 'At $y = 1$.' },
              { ask: 'With $n = 2$ unknowns, $K = n \\times 0.4 = $?', answer: 0.8, tol: 0.001, hint: '$\\tfrac{K}{n} = 0.4$.' },
              { ask: 'So…', options: ['A unique fixed point in $D$, since $K < 1$', 'No conclusion'], answer: 0, hint: 'Both conditions hold.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define** a non-linear system, $F: \\mathbb R^n \\to \\mathbb R^n$, and a fixed point.\n• **State** the fixed-point theorem and its error bound.\n• Three-part question: (1) **place** the system in fixed-point form; (2) **show** there is a unique solution on $D$; (3) **iterate** from $x^{(0)}$ until accurate to within $10^{-5}$ in the $\\ell_\\infty$ norm.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Part (1): solve the $i$-th equation for $x_i$, e.g. $3x_1 - \\cos(x_2x_3) - \\tfrac12 = 0 \\Rightarrow x_1 = \\tfrac13\\cos(x_2x_3) + \\tfrac16$.',
        'Part (2a): bound each $g_i$ by putting the extreme values ($\\pm1$) of the variables in; show each stays in $[-1, 1]$.',
        'Part (2b): differentiate each $g_i$ partially (other variables held constant); bound each with $|\\sin| \\le 1$, $|\\cos| \\le 1$, $|x_i| \\le 1$; take the largest as $\\tfrac{K}{n}$.',
        'Part (3): iterate, keeping 5–6 dp, and give $\\|x^{(k)} - x^{(k-1)}\\|_\\infty$ at each step.',
        'Mistake: using ordinary derivatives. With several variables, take partial derivatives.',
      ],
      examples: [
        {
          title: '$3x_1 - \\cos(x_2x_3) - \\tfrac12 = 0$, $x_1^2 - 81(x_2 + 0.1)^2 + \\sin x_3 + 1.06 = 0$, $e^{-x_1x_2} + 20x_3 + \\tfrac{10\\pi - 3}{3} = 0$',
          question: 'Place in fixed-point form, show a unique solution on $D = \\{-1 \\le x_i \\le 1\\}$, and iterate from $(0.1, 0.1, -0.1)$ to within $10^{-5}$.',
          steps: ['$g_1 = \\tfrac13\\cos(x_2x_3) + \\tfrac16$, $g_2 = \\tfrac19\\sqrt{x_1^2 + \\sin x_3 + 1.06} - 0.1$, $g_3 = -\\tfrac{1}{20}e^{-x_1x_2} - \\tfrac{10\\pi - 3}{60}$.', 'On $D$: $|g_1| \\le 0.50$, $|g_2| \\le 0.09$, $|g_3| \\le 0.61$, so $G(D) \\subset D$.', 'Partials: $\\left|\\tfrac{\\partial g_1}{\\partial x_2}\\right|, \\left|\\tfrac{\\partial g_1}{\\partial x_3}\\right| \\le 0.281$; $\\left|\\tfrac{\\partial g_2}{\\partial x_1}\\right| \\le 0.238$; $\\left|\\tfrac{\\partial g_2}{\\partial x_3}\\right| \\le 0.119$; $\\left|\\tfrac{\\partial g_3}{\\partial x_1}\\right|, \\left|\\tfrac{\\partial g_3}{\\partial x_2}\\right| \\le 0.136$.', '$\\tfrac{K}{3} = 0.281$, so $K = 0.843 < 1$: unique solution.', '$x^{(1)} = (0.499983, 0.009441, -0.523101)$, $x^{(2)} = (0.499996, 0.000026, -0.523363)$, …, converging by $k = 5$.'],
          answer: '$x = (0.5, 0, -\\tfrac{\\pi}{6}) = (0.5, 0, -0.523599)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The three-part class question',
          body: 'For $3x_1 - \\cos(x_2x_3) - \\tfrac12 = 0$, $x_1^2 - 81(x_2 + 0.1)^2 + \\sin x_3 + 1.06 = 0$, $e^{-x_1x_2} + 20x_3 + \\tfrac{10\\pi - 3}{3} = 0$:\n\n(1) place in fixed-point form; (2) show a unique solution on $D = \\{-1 \\le x_i \\le 1\\}$; (3) iterate from $(0.1, 0.1, -0.1)$ to within $10^{-5}$ in $\\ell_\\infty$.\n\n**What the examiner wants:** each $g_i$; the bounds on $g_i$; every partial derivative with its bound; $K$; the theorem cited; an iteration table.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'Bounds and the first iterate',
          graph: {
            steps: [
              { ask: '$\\left|\\tfrac{\\partial g_1}{\\partial x_2}\\right| = \\tfrac13|x_3\\sin(x_2x_3)| \\le \\tfrac13\\sin 1$, to 3 dp?', answer: 0.281, tol: 0.001, hint: '$\\sin 1 = 0.8415$.' },
              { ask: 'That is the largest bound, $\\tfrac{K}{3}$. So $K = $?', answer: 0.843, tol: 0.002, hint: '$3 \\times 0.281$.' },
              { ask: '$x_1^{(1)} = \\tfrac13\\cos(0.1 \\times (-0.1)) + \\tfrac16$, to 5 dp?', answer: 0.49998, tol: 0.00002, hint: '$\\cos(-0.01) \\approx 0.99995$.' },
              { ask: '$x_3^{(1)} = -\\tfrac{1}{20}e^{-0.01} - \\tfrac{10\\pi - 3}{60}$, to 4 dp?', answer: -0.5231, tol: 0.0002, hint: '$-0.04950 - 0.47360$.' },
            ],
            after: 'Iterating on: it settles at $(0.5, 0, -0.523599)$, which is $(\\tfrac12, 0, -\\tfrac{\\pi}{6})$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student finds the largest partial-derivative bound is $0.281$ and writes “$K = 0.281 < 1$, so unique”. What is wrong?',
          options: [
            { text: 'The bound is $\\tfrac{K}{n}$; with $n = 3$, $K = 0.843$. Still $< 1$, but $K$ must be stated correctly', correct: true, why: 'The theorem needs $|\\partial g_i/\\partial x_j| \\le K/n$. Here $K = 3 \\times 0.281 = 0.843$.' },
            { text: 'Nothing', why: 'They skipped the factor $n$.' },
            { text: '$K$ must be bigger than 1', why: 'The opposite: $K < 1$ is required.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$x_2^{(1)}$ for the class example',
          graph: {
            steps: [
              { ask: 'Inside the root: $x_1^2 + \\sin x_3 + 1.06$ at $(0.1, 0.1, -0.1)$, to 4 dp?', answer: 0.9702, tol: 0.0002, hint: '$0.01 - 0.0998 + 1.06$.' },
              { ask: '$\\sqrt{0.9702}$, to 4 dp?', answer: 0.985, tol: 0.0002, hint: 'Just under 1.' },
              { ask: '$x_2^{(1)} = \\tfrac{0.985}{9} - 0.1$, to 4 dp?', answer: 0.0094, tol: 0.0002, hint: '$0.10944 - 0.1$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can solve a non-linear system by fixed points.',
          body: '**Summary:** fixed-point form $x = G(x)$; check $G(D) \\subset D$; bound every partial by $\\tfrac{K}{n}$ with $K < 1$; cite the theorem; iterate to tolerance.\n\n**Next:** **Newton’s method for systems**, which replaces $f\'$ with the Jacobian matrix and converges much faster.',
        },
      ],
    },
  ],
};
