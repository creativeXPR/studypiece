// MTH 209 · Part C · Lesson 5: interpolation with any spacing. Linear interpolation derived from two
// points, the ln 2 example and why it is poor, the interpolation error term, a quadratic by solving
// for the coefficients, and Lagrange's formula with its basis "switches". Merges the old
// linear-interpolation lesson into this one (id kept). Numbers recomputed in Python.
import { lagrangeScene, linearInterpScene } from './interpolation-scenes';

export default {
  id: 'lagrange',
  title: 'Linear and Lagrange interpolation, and the error',
  covers: 'Linear interpolation P₁ derived from two points and written with weights, the ln 2 example and its error, the interpolation error term, a quadratic through three points by solving for a₀, a₁, a₂, and Lagrange’s formula with basis functions Lₖ(x)',
  minutes: 18,
  sections: [
    {
      name: 'Linear interpolation and its error',
      terms: [
        ['Linear interpolation', '$P_1(x) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1$: two weights that add to 1.'],
        ['Interpolation error', '$f(x) - P_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^{n}(x - x_i)$ for some $\\xi$ in the span of the nodes.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part C · Lesson 5',
          title: 'When the points are not evenly spaced',
          body: '**Where we are:** Newton\'s and Everett\'s formulas need **equally spaced** tables. Real data often are not.\n\n**The problem:** find a polynomial that passes **exactly** through given points, wherever they are, and use it between them.\n\n**The idea:** start with two points and a straight line; then build a "switch" for each point so any number of points works.',
          cta: 'Show me',
        },
        linearInterpScene,
        {
          type: 'story',
          eyebrow: 'The method',
          title: 'A line through two points, as weights',
          body: 'Look for $P_1(x) = a_0 + a_1x$ with $P_1(x_0) = y_0$, $P_1(x_1) = y_1$. Subtracting the two conditions gives $a_1 = \\frac{y_1 - y_0}{x_1 - x_0}$, so\n$$P_1(x) = y_0 + \\frac{y_1 - y_0}{x_1 - x_0}(x - x_0) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1.$$\nEach $y$ gets a **weight**; the weights add to 1, and the nearer point gets the larger one.\n\n**Example (notes):** through $(2, 3)$ and $(5, 7)$: $P_1(x) = \\frac{4x + 1}{3}$. Check $P_1(2) = 3$, $P_1(5) = 7$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Given $(0.82, 2.270500)$ and $(0.83, 2.293319)$, find $P_1(0.826)$.',
          options: [
            { text: '$2.2842$', correct: true, why: 'Weights $\\frac{0.83 - 0.826}{0.01} = 0.4$ and $\\frac{0.826 - 0.82}{0.01} = 0.6$: $0.4(2.270500) + 0.6(2.293319) = 2.2842$.' },
            { text: '$2.2819$', why: 'The weights are the wrong way round: $0.826$ is nearer $0.83$.' },
            { text: '$2.2933$', why: 'That is just $y_1$.' },
            { text: '$4.5638$', why: 'That is $y_0 + y_1$; the weights must add to 1.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example (notes)',
          title: 'Estimate $\\ln 2$ from $\\ln 1 = 0$ and $\\ln 6 = 1.7918$',
          body: '$$P_1(2) = \\frac{6 - 2}{5}(0) + \\frac{2 - 1}{5}(1.7918) = 0.3584.$$\nTrue $\\ln 2 = 0.6931$: error $0.3347$, about $48\\%$.\n\n**Why so poor? The error term says:**\n$$f(x) - P_1(x) = \\frac{f\'\'(\\xi)}{2!}(x - x_0)(x - x_1).$$\nWith $f\'\' = -\\frac{1}{x^2}$: $\\frac{-1/\\xi^2}{2}(2 - 1)(2 - 6) = \\frac{2}{\\xi^2}$, between $0.056$ and $2$. The actual $0.3347$ is inside. A big gap $(x - x_0)(x - x_1)$ and a strongly curved $f$ make a big error: use closer points, or more of them.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Estimate $\\ln 2$ by linear interpolation from $\\ln 1 = 0$ and $\\ln 3 = 1.0986$.',
          graph: {
            steps: [
              { ask: 'Weight on $y_1$ at $x = 2$: $\\frac{2 - 1}{3 - 1} = $', answer: 0.5, tol: 0.0001, hint: '$\\frac12$.' },
              { ask: '$P_1(2) = $ (4 d.p.)', answer: 0.5493, tol: 0.0001, hint: '$0.5 \\times 0 + 0.5 \\times 1.0986$.' },
              { ask: 'Error $= 0.6931 - P_1(2) = $ (4 d.p.)', answer: 0.1438, tol: 0.0002, hint: 'True minus estimate.' },
              { ask: 'Relative error (%, 1 d.p.)', answer: 20.7, tol: 0.15, hint: '$\\frac{0.1438}{0.6931} \\times 100$.', done: 'Closer points: the error falls from 48% to 21%, as the error term predicts.' },
            ],
          },
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
          eyebrow: 'More points',
          title: 'Three points, one parabola',
          body: '$n + 1$ points fix a polynomial of degree at most $n$, and a curve follows a curved $f$ far better than a line.\n\n**Direct way:** $P_2(x) = a_0 + a_1x + a_2x^2$ through $(1, 4)$, $(2, 0)$, $(3, 12)$:\n$$a_0 + a_1 + a_2 = 4,\\quad a_0 + 2a_1 + 4a_2 = 0,\\quad a_0 + 3a_1 + 9a_2 = 12.$$\nSubtracting: $a_1 + 3a_2 = -4$, $a_1 + 5a_2 = 12$, so $a_2 = 8$, $a_1 = -28$, $a_0 = 24$:\n$$P_2(x) = 8x^2 - 28x + 24.$$\nIt works, but needs a fresh system for every data set.',
        },
        lagrangeScene,
        {
          type: 'story',
          eyebrow: 'The idea, then the formula',
          title: 'One switch per point',
          body: 'For each node $x_k$ build $L_k(x)$: **1 at $x_k$**, **0 at every other node**. Then\n$$P_n(x) = y_0L_0(x) + y_1L_1(x) + \\cdots + y_nL_n(x)$$\ngives $P_n(x_k) = y_k$ automatically: every other term is switched off.\n\nTo vanish at the other nodes, $L_k$ has a factor $(x - x_j)$ for each $j \\neq k$; dividing by the same product at $x_k$ makes it 1 there. For three nodes:\n$$L_0 = \\frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)},\\ \\ L_1 = \\frac{(x - x_0)(x - x_2)}{(x_1 - x_0)(x_1 - x_2)},\\ \\ L_2 = \\frac{(x - x_0)(x - x_1)}{(x_2 - x_0)(x_2 - x_1)}.$$',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'For the same data $(1, 4)$, $(2, 0)$, $(3, 12)$, find $P_2(1.5)$ by Lagrange\'s formula.',
          body: '$L_0 = \\frac{(x - 2)(x - 3)}{(1 - 2)(1 - 3)}$, $L_1 = \\frac{(x - 1)(x - 3)}{(2 - 1)(2 - 3)}$, $L_2 = \\frac{(x - 1)(x - 2)}{(3 - 1)(3 - 2)}$.',
          graph: {
            steps: [
              { ask: '$L_0(1.5) = $', answer: 0.375, tol: 0.0005, hint: '$\\frac{(-0.5)(-1.5)}{(-1)(-2)}$.' },
              { ask: '$L_1(1.5) = $', answer: 0.75, tol: 0.0005, hint: '$\\frac{(0.5)(-1.5)}{(1)(-1)}$.' },
              { ask: '$L_2(1.5) = $', answer: -0.125, tol: 0.0005, hint: '$\\frac{(0.5)(-0.5)}{(2)(1)}$.' },
              { ask: '$P_2(1.5) = 4L_0 + 0L_1 + 12L_2 = $', answer: 0, tol: 0.0005, hint: '$1.5 - 1.5$.', done: 'Matches $8(1.5)^2 - 28(1.5) + 24 = 0$ ✓' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Derive linear interpolation; state Lagrange\'s formula and its error',
          body: '**Linear:** $P_1(x) = a_0 + a_1x$ with $P_1(x_i) = y_i$ gives $a_1 = \\frac{y_1 - y_0}{x_1 - x_0}$, $a_0 = y_0 - x_0a_1$, so $P_1(x) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1$.\n\n**Lagrange:** for $n + 1$ points with distinct $x_i$, $P_n(x) = \\sum_{k=0}^{n} y_kL_k(x)$ with $L_k(x) = \\prod_{j \\neq k}\\frac{x - x_j}{x_k - x_j}$.\n\n**Error:** $f(x) - P_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}\\prod_{i=0}^{n}(x - x_i)$ for some $\\xi$ between the smallest and largest of $x, x_0, \\ldots, x_n$.',
        },
        {
          type: 'finish',
          title: 'You can interpolate any table.',
          body: 'Part C is complete apart from its exam practice. Next, Part D: following a rate step by step. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
