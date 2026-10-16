// MTH 209 · Interpolation · Lesson 2: higher degree interpolation and Lagrange's formula.

export default {
  id: 'lagrange',
  title: 'Higher degree interpolation (Lagrange)',
  covers: 'Quadratic interpolation by solving for a₀, a₁, a₂, and Lagrange’s formula with basis functions Lₖ(x)',
  minutes: 16,
  sections: [
    {
      name: 'Solving for the coefficients',
      terms: [
        ['Interpolating polynomial', 'For $n + 1$ points with distinct $x$-values there is a unique polynomial $P_n(x)$ of degree $\\le n$ with $P_n(x_i) = y_i$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Interpolation · Lesson 2',
          title: 'Three points, one parabola',
          body: 'A straight line fits 2 points. Through **3** points we can fit a quadratic, through 4 a cubic, and so on: $n + 1$ points determine a polynomial of degree at most $n$.\n\nA curved interpolant follows a curved function much better than a straight line.',
          cta: 'Fit a quadratic',
        },
        {
          type: 'story',
          eyebrow: 'Method 1 · Solve for the coefficients',
          title: '$P_2(x) = a_0 + a_1x + a_2x^2$ through $(1, 4)$, $(2, 0)$, $(3, 12)$',
          body: 'Substitute each point:\n$$\\begin{aligned} P_2(1) &= a_0 + a_1 + a_2 = 4 \\\\ P_2(2) &= a_0 + 2a_1 + 4a_2 = 0 \\\\ P_2(3) &= a_0 + 3a_1 + 9a_2 = 12 \\end{aligned}$$\n\nSubtract consecutive equations: $a_1 + 3a_2 = -4$ and $a_1 + 5a_2 = 12$. Subtract again: $2a_2 = 16$, so $a_2 = 8$.',
        },
        {
          type: 'choice',
          eyebrow: 'Finish it',
          prompt: 'With $a_2 = 8$ and $a_1 + 3a_2 = -4$, $a_0 + a_1 + a_2 = 4$, what is $P_2(x)$?',
          options: [
            { text: '$P_2(x) = 24 - 28x + 8x^2$', correct: true, why: '$a_1 = -4 - 24 = -28$; $a_0 = 4 + 28 - 8 = 24$. Check: $P_2(2) = 24 - 56 + 32 = 0$ ✓.' },
            { text: '$P_2(x) = 20 - 28x + 8x^2$', why: 'Check $a_0$: $a_0 = 4 - a_1 - a_2 = 4 + 28 - 8 = 24$.' },
            { text: '$P_2(x) = 24 + 28x + 8x^2$', why: 'Then $P_2(1) = 60$, not 4.' },
            { text: '$P_2(x) = 8 - 28x + 24x^2$', why: 'The constant and the $x^2$ coefficient are swapped.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Method 1: done.',
          recap: [
            'Substitute each point into $a_0 + a_1x + a_2x^2$ and solve the $3 \\times 3$ system.',
            'Through $(1, 4)$, $(2, 0)$, $(3, 12)$: $P_2(x) = 24 - 28x + 8x^2$.',
          ],
          why: 'Solving a system every time is slow. Lagrange’s formula writes the answer down directly.',
        },
      ],
    },
    {
      name: 'Lagrange’s formula',
      terms: [
        ['Lagrange’s formula', '$P_n(x) = y_0L_0(x) + y_1L_1(x) + \\cdots + y_nL_n(x)$'],
        ['Lagrange basis function', '$L_k(x) = \\displaystyle\\prod_{j \\neq k}\\frac{x - x_j}{x_k - x_j}$: equal to 1 at $x_k$ and 0 at every other node.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The trick',
          title: 'Build a “switch” for each point',
          body: 'For each node $x_k$, build a polynomial $L_k(x)$ that is **1 at $x_k$** and **0 at every other node**. Then\n$$P_n(x) = y_0L_0(x) + y_1L_1(x) + \\cdots + y_nL_n(x)$$\nautomatically gives $P_n(x_k) = y_k$: every other term is switched off.\n\nTo be 0 at the other nodes, $L_k$ has a factor $(x - x_j)$ for each $j \\neq k$. Dividing by the same product at $x = x_k$ makes it 1 there:\n$$L_k(x) = \\frac{(x - x_0)\\cdots(x - x_{k-1})(x - x_{k+1})\\cdots(x - x_n)}{(x_k - x_0)\\cdots(x_k - x_{k-1})(x_k - x_{k+1})\\cdots(x_k - x_n)}.$$',
        },
        {
          type: 'story',
          eyebrow: 'Quadratic case',
          title: 'Three basis functions',
          body: '$$L_0(x) = \\frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)},$$\n$$L_1(x) = \\frac{(x - x_0)(x - x_2)}{(x_1 - x_0)(x_1 - x_2)},$$\n$$L_2(x) = \\frac{(x - x_0)(x - x_1)}{(x_2 - x_0)(x_2 - x_1)}.$$\n\nThe numerator of $L_k$ **skips** $x_k$; the denominator is the numerator evaluated at $x = x_k$.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'For nodes $1, 2, 3$, what is $L_1(x)$?',
          options: [
            { text: '$-(x - 1)(x - 3)$', correct: true, why: '$\\frac{(x - 1)(x - 3)}{(2 - 1)(2 - 3)} = \\frac{(x - 1)(x - 3)}{-1}$.' },
            { text: '$(x - 1)(x - 3)$', why: 'Check the denominator: $(2 - 1)(2 - 3) = -1$.' },
            { text: '$\\frac{(x - 2)(x - 3)}{2}$', why: 'That’s $L_0$: it skips $x_0 = 1$.' },
            { text: '$\\frac{(x - 1)(x - 2)}{2}$', why: 'That’s $L_2$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Use it',
          title: 'Estimate $P_2(2.5)$ for $(1, 4)$, $(2, 0)$, $(3, 12)$',
          body: 'At $x = 2.5$:\n$$L_0 = \\frac{(0.5)(-0.5)}{(-1)(-2)} = -0.125,\\quad L_1 = \\frac{(1.5)(-0.5)}{(1)(-1)} = 0.75,\\quad L_2 = \\frac{(1.5)(0.5)}{(2)(1)} = 0.375.$$\n\n$$P_2(2.5) = 4(-0.125) + 0(0.75) + 12(0.375) = -0.5 + 4.5 = 4.$$\n\nSame as $24 - 28(2.5) + 8(2.5)^2 = 4$ ✓. Notice $L_0 + L_1 + L_2 = 1$.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about Lagrange interpolation are true?',
          options: [
            { text: '$L_k(x_k) = 1$ and $L_k(x_j) = 0$ for $j \\neq k$.', correct: true, why: '**That’s the defining property** of the basis functions.' },
            { text: 'For 4 points, each $L_k$ has degree 3.', correct: true, why: '**Three factors** $(x - x_j)$ in each numerator.' },
            { text: 'The $L_k$ depend on the $y$-values.', why: '**Only the nodes $x_j$** appear in $L_k$. The $y_k$ just multiply them.' },
            { text: 'Data from a quadratic are reproduced exactly by quadratic interpolation.', correct: true, why: '**The interpolant is unique**, so it must be that quadratic.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'State Lagrange’s interpolation formula',
          body: 'Given $n + 1$ data points $(x_0, y_0), \\ldots, (x_n, y_n)$ with distinct $x_i$, the polynomial $P_n(x)$ of degree $\\le n$ with $P_n(x_i) = y_i$ is\n$$P_n(x) = y_0L_0(x) + y_1L_1(x) + \\cdots + y_nL_n(x),$$\nwhere\n$$L_k(x) = \\frac{(x - x_0)\\cdots(x - x_{k-1})(x - x_{k+1})\\cdots(x - x_n)}{(x_k - x_0)\\cdots(x_k - x_{k-1})(x_k - x_{k+1})\\cdots(x_k - x_n)},\\quad k = 0, 1, \\ldots, n.$$',
        },
        {
          type: 'finish',
          title: 'Interpolation: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
