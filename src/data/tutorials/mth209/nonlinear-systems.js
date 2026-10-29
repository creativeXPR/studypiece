// MTH 209 · Systems of non-linear equations · Lesson 1: definitions, fixed points and convergence.

export default {
  id: 'nonlinear-systems',
  title: 'Definitions, fixed points and convergence',
  covers: 'F(x) = 0 for F: ℝⁿ → ℝⁿ, fixed points, the convergence theorem, a 3 × 3 fixed-point iteration',
  minutes: 18,
  sections: [
    {
      name: 'Non-linear systems and fixed points',
      terms: [
        ['System of non-linear equations', '$f_i(x_1, \\ldots, x_n) = 0$ for $i = 1, \\ldots, n$, written $F(x) = 0$ where $F = (f_1, \\ldots, f_n)^T$ maps $\\mathbb{R}^n$ into $\\mathbb{R}^n$.'],
        ['Fixed point', 'A point $p$ with $G(p) = p$: the function $G$ leaves it unchanged.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of non-linear equations · Lesson 1',
          title: 'When the equations bend',
          body: 'Real problems are rarely linear. The pressure needed to sink a circular plate into soil, the balance of a chemical reaction, the forces in a structure: each leads to several equations with squares, sines or exponentials of the unknowns, all to be solved **together**.\n\nThe matrix methods of the last chapter can’t do this. We need new tools: ==fixed-point iteration== and ==Newton’s method==.',
          cta: 'Set it up',
        },
        {
          type: 'story',
          eyebrow: 'Notation',
          title: 'One vector equation: $F(x) = 0$',
          body: 'A system of $n$ non-linear equations in $n$ unknowns\n$$f_1(x_1, \\ldots, x_n) = 0,\\ \\ldots,\\ f_n(x_1, \\ldots, x_n) = 0$$\nis written as one vector equation $F(x) = 0$, where $x = (x_1, \\ldots, x_n)^T$ and\n$$F(x) = \\big(f_1(x), f_2(x), \\ldots, f_n(x)\\big)^T,\\qquad F: \\mathbb{R}^n \\to \\mathbb{R}^n.$$\n\nExample:\n$$\\begin{aligned} 3x_1 - \\cos(x_2x_3) - \\tfrac12 &= 0 \\\\ x_1^2 - 81(x_2 + 0.1)^2 + \\sin x_3 + 1.06 &= 0 \\\\ e^{-x_1x_2} + 20x_3 + \\tfrac{10\\pi - 3}{3} &= 0 \\end{aligned}$$\nHere $F: \\mathbb{R}^3 \\to \\mathbb{R}^3$.',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Which of these systems is non-linear?',
          options: [
            { text: '$x^2 + y^2 = 4,\\ x - y = 1$', correct: true, why: 'The squares $x^2$, $y^2$ make it non-linear, even though the second equation is linear.' },
            { text: '$2x + 3y = 5,\\ x - y = 1$', why: 'Both equations are linear: each unknown appears only to the first power.' },
            { text: '$x + 2y + z = 1,\\ y - z = 0,\\ 3x = 6$', why: 'Linear: no products, powers or functions of the unknowns.' },
            { text: '$0.5x - 0.2y = 1,\\ 4y = x$', why: 'Decimal coefficients are fine: it is still linear.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The key idea',
          title: 'Fixed points',
          body: 'A function $G$ from $D \\subset \\mathbb{R}^n$ into $\\mathbb{R}^n$ has a ==fixed point== at $p \\in D$ if\n$$G(p) = p.$$\nThe point doesn’t move when you apply $G$. For example, $g(x) = x^2$ has fixed points at $x = 0$ and $x = 1$.\n\nTo solve $F(x) = 0$, rewrite it as $x = G(x)$, usually by **solving the $i$th equation for $x_i$**. Then a fixed point of $G$ is exactly a solution of the system, and we can hunt for it by iterating $x^{(k)} = G(x^{(k-1)})$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Solve the first equation $3x_1 - \\cos(x_2x_3) - \\frac12 = 0$ for $x_1$. What is $g_1$?',
          options: [
            { text: '$g_1 = \\frac13\\cos(x_2x_3) + \\frac16$', correct: true, why: '$3x_1 = \\cos(x_2x_3) + \\frac12$, so $x_1 = \\frac13\\cos(x_2x_3) + \\frac16$.' },
            { text: '$g_1 = 3\\cos(x_2x_3) + \\frac12$', why: 'Divide by 3 rather than multiplying.' },
            { text: '$g_1 = \\frac13\\cos(x_2x_3) - \\frac16$', why: 'Moving $-\\frac12$ across makes it $+\\frac12$, and $\\frac12 \\div 3 = +\\frac16$.' },
            { text: '$g_1 = \\cos(x_2x_3) + \\frac12$', why: 'You still have to divide by the coefficient 3.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Fixed points: set.',
          recap: [
            '$F(x) = 0$ with $F: \\mathbb{R}^n \\to \\mathbb{R}^n$.',
            'Rewrite as $x = G(x)$; a fixed point of $G$ solves the system.',
          ],
          why: 'But does the iteration actually converge? A theorem tells us when.',
        },
      ],
    },
    {
      name: 'The convergence theorem',
      terms: [
        ['Fixed-point theorem', 'If $G$ is continuous and maps $D = \\{a_i \\le x_i \\le b_i\\}$ into itself, it has a fixed point in $D$. If also $\\left|\\frac{\\partial g_i}{\\partial x_j}\\right| \\le \\frac{K}{n}$ on $D$ with $K < 1$, the fixed point is unique and $x^{(k)} = G(x^{(k-1)})$ converges to it from any $x^{(0)} \\in D$.'],
        ['Error bound', '$\\|x^{(k)} - p\\|_\\infty \\le \\dfrac{K^k}{1 - K}\\,\\|x^{(1)} - x^{(0)}\\|_\\infty$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'When fixed-point iteration must work',
          body: 'Let $D = \\{(x_1, \\ldots, x_n): a_i \\le x_i \\le b_i\\}$ and suppose $G: D \\to \\mathbb{R}^n$ is continuous.\n\n**1. Existence.** If $G(x) \\in D$ whenever $x \\in D$, then $G$ has a fixed point in $D$.\n\n**2. Uniqueness and convergence.** If, in addition, every partial derivative of the component functions is continuous and there is a constant $K < 1$ with\n$$\\left|\\frac{\\partial g_i(x)}{\\partial x_j}\\right| \\le \\frac{K}{n}\\quad \\text{for all } x \\in D,\\ \\text{all } i, j,$$\nthen the fixed point $p$ is unique, $x^{(k)} = G(x^{(k-1)})$ converges to $p$ for **any** $x^{(0)} \\in D$, and\n$$\\|x^{(k)} - p\\|_\\infty \\le \\frac{K^k}{1 - K}\\,\\|x^{(1)} - x^{(0)}\\|_\\infty.$$',
        },
        {
          type: 'reveal',
          eyebrow: 'Worked example',
          title: 'Rewrite the 3 × 3 system as $x = G(x)$ on $D = [-1, 1]^3$',
          cards: [
            { title: '$g_1$', text: '$x_1 = \\frac13\\cos(x_2x_3) + \\frac16$' },
            { title: '$g_2$', text: '$x_2 = \\frac19\\sqrt{x_1^2 + \\sin x_3 + 1.06} - 0.1$' },
            { title: '$g_3$', text: '$x_3 = -\\frac{1}{20}e^{-x_1x_2} - \\frac{10\\pi - 3}{60}$' },
            { title: 'G maps D into D', text: 'For $-1 \\le x_i \\le 1$: $g_1 \\in [-0.17, 0.5]$, $g_2 \\in [-0.05, 0.09]$, $g_3 \\in [-0.61, -0.49]$. All inside $[-1, 1]$, so a fixed point exists in $D$.' },
          ],
          note: 'Each $g_i$ comes from solving equation $i$ for $x_i$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Bound the partial derivatives',
          body: 'On $D$ the largest partial derivatives are:\n$$\\left|\\frac{\\partial g_1}{\\partial x_2}\\right| = \\tfrac13|x_3||\\sin(x_2x_3)| \\le \\tfrac13\\sin 1 \\approx 0.281,\\qquad \\left|\\frac{\\partial g_1}{\\partial x_3}\\right| \\le 0.281,$$\n$$\\left|\\frac{\\partial g_2}{\\partial x_1}\\right| = \\frac{|x_1|}{9\\sqrt{x_1^2 + \\sin x_3 + 1.06}} \\le \\frac{1}{9\\sqrt{0.218}} \\approx 0.238,\\qquad \\left|\\frac{\\partial g_2}{\\partial x_3}\\right| \\le 0.119,$$\n$$\\left|\\frac{\\partial g_3}{\\partial x_1}\\right|,\\ \\left|\\frac{\\partial g_3}{\\partial x_2}\\right| \\le \\frac{e}{20} \\approx 0.14,$$\nand the rest are $0$. So every $\\left|\\frac{\\partial g_i}{\\partial x_j}\\right| \\le 0.281$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'With $n = 3$ and every partial derivative at most $0.281$, what is $K$, and does the theorem apply?',
          options: [
            { text: '$K = 3 \\times 0.281 = 0.843 < 1$: yes, the fixed point is unique and the iteration converges', correct: true, why: 'We need $\\frac{K}{n} \\ge 0.281$, so $K = 0.843$, which is less than 1.' },
            { text: '$K = 0.281$, so it converges', why: 'The bound is $\\frac{K}{n}$, so $K = n \\times 0.281$.' },
            { text: '$K = 0.281 / 3 = 0.094$', why: 'Multiply by $n$, don’t divide: $\\frac{K}{3} = 0.281$.' },
            { text: '$K = 0.843 > 1$, so it may diverge', why: '$0.843$ is less than $1$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Iterate from $x^{(0)} = (0.1, 0.1, -0.1)^T$',
          body: '$$x^{(1)}_1 = \\tfrac13\\cos\\big((0.1)(-0.1)\\big) + \\tfrac16 = 0.49998$$\n\n$$\\begin{array}{c|ccc|c} k & x_1 & x_2 & x_3 & \\text{change} \\\\ \\hline 0 & 0.1 & 0.1 & -0.1 & \\\\ 1 & 0.49998 & 0.00944 & -0.52310 & 0.42 \\\\ 2 & 0.49999 & 0.00003 & -0.52336 & 0.0094 \\\\ 3 & 0.50000 & 0.00001 & -0.52360 & 0.00023 \\\\ 4 & 0.50000 & 0.00000 & -0.52360 & 1.2{\\times}10^{-5} \\\\ 5 & 0.50000 & 0.00000 & -0.52360 & 3{\\times}10^{-7} \\end{array}$$\n\n(“change” is $\\|x^{(k)} - x^{(k-1)}\\|_\\infty$.) Stop when $\\|x^{(k)} - x^{(k-1)}\\|_\\infty < 10^{-5}$: at $k = 5$. The solution is $(0.5,\\ 0,\\ -0.5236)$, in fact $\\left(\\frac12, 0, -\\frac{\\pi}{6}\\right)$.',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the method',
          prompt: 'Put the steps of a fixed-point solution in order.',
          items: [
            'Solve the $i$th equation for $x_i$ to get $x = G(x)$.',
            'Show that $G$ maps $D$ into $D$ (a fixed point exists).',
            'Bound every $\\left|\\frac{\\partial g_i}{\\partial x_j}\\right| \\le \\frac{K}{n}$ and check $K < 1$ (unique, convergent).',
            'Iterate $x^{(k)} = G(x^{(k-1)})$ from $x^{(0)}$.',
            'Stop when $\\|x^{(k)} - x^{(k-1)}\\|_\\infty$ is below the tolerance.',
          ],
          explain: 'The first three steps are the proof; the last two are the computation. Exam questions usually ask for both.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'State the fixed-point theorem for systems',
          body: 'Let $D = \\{(x_1, \\ldots, x_n)^T: a_i \\le x_i \\le b_i,\\ i = 1, \\ldots, n\\}$ and let $G$ be a continuous function from $D \\subset \\mathbb{R}^n$ into $\\mathbb{R}^n$ with $G(x) \\in D$ whenever $x \\in D$. Then $G$ has a fixed point in $D$.\n\nSuppose, in addition, that all the component functions of $G$ have continuous partial derivatives and a constant $K < 1$ exists with\n$$\\left|\\frac{\\partial g_i(x)}{\\partial x_j}\\right| \\le \\frac{K}{n}\\quad \\text{whenever } x \\in D,\\ j = 1, \\ldots, n,$$\nfor each component $g_i$. Then the sequence $x^{(k)} = G(x^{(k-1)})$, $k \\ge 1$, converges to the unique fixed point $p \\in D$ for any $x^{(0)} \\in D$, and\n$$\\|x^{(k)} - p\\|_\\infty \\le \\frac{K^k}{1 - K}\\,\\|x^{(1)} - x^{(0)}\\|_\\infty.$$',
        },
        {
          type: 'finish',
          title: 'Fixed-point iteration: done.',
          body: 'Next: Newton’s method, which converges much faster. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
