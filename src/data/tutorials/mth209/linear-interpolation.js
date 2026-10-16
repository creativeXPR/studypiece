// MTH 209 · Interpolation · Lesson 1: linear interpolation.

export default {
  id: 'linear-interpolation',
  title: 'Linear interpolation',
  covers: 'Deriving P₁(x) through two points, worked examples, estimating ln 2 and its error',
  minutes: 14,
  sections: [
    {
      name: 'Deriving P₁(x)',
      terms: [
        ['Interpolation', 'Finding a formula, often a polynomial, whose graph passes through given points $(x_0, y_0), \\ldots, (x_n, y_n)$, then using it to estimate values in between.'],
        ['Linear interpolant', '$P_1(x) = \\dfrac{x_1 - x}{x_1 - x_0}y_0 + \\dfrac{x - x_0}{x_1 - x_0}y_1$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Interpolation · Lesson 1',
          title: 'Reading between the lines of a table',
          body: 'A table gives $\\tan 0.10$ and $\\tan 0.15$, but you need $\\tan 0.12$. A census gives populations for 1891 and 1901, but you need 1895.\n\n==Interpolation== finds a formula, usually a polynomial, that passes **exactly** through the given points, and uses it to estimate values in between.\n\nThe simplest case: two points, one straight line.',
          cta: 'Build the line',
        },
        {
          type: 'story',
          eyebrow: 'Step 1 · Set up',
          title: 'A line through two points',
          body: 'Given $(x_0, y_0)$ and $(x_1, y_1)$, look for $P_1(x) = a_0 + a_1x$ with $P_1(x_0) = y_0$ and $P_1(x_1) = y_1$:\n$$a_0 + a_1x_0 = y_0, \\qquad a_0 + a_1x_1 = y_1.$$\n\nSubtract the first from the second:\n$$(x_1 - x_0)a_1 = y_1 - y_0 \\implies a_1 = \\frac{y_1 - y_0}{x_1 - x_0},$$\nand $a_0 = y_0 - x_0a_1$.',
        },
        {
          type: 'story',
          eyebrow: 'Step 2 · Substitute',
          title: 'Rearrange into the symmetric form',
          body: '$$P_1(x) = y_0 + \\frac{y_1 - y_0}{x_1 - x_0}(x - x_0).$$\n\nCollect the $y_0$ and $y_1$ terms:\n$$P_1(x) = y_0\\left(1 - \\frac{x - x_0}{x_1 - x_0}\\right) + \\frac{x - x_0}{x_1 - x_0}y_1 = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1.$$\n\nEach $y$ is multiplied by a **weight**; the two weights add up to 1.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'What is the weight on $y_0$ when $x = x_0$?',
          options: [
            { text: '$1$', correct: true, why: '$\\frac{x_1 - x_0}{x_1 - x_0} = 1$, and the weight on $y_1$ is $0$, so $P_1(x_0) = y_0$ ✓.' },
            { text: '$0$', why: 'At $x = x_0$, $y_0$ must count fully.' },
            { text: '$\\frac12$', why: 'That’s at the midpoint.' },
            { text: '$x_0$', why: 'The weights are pure numbers between 0 and 1 (inside the interval).' },
          ],
        },
        {
          type: 'bridge',
          title: 'P₁(x): derived.',
          recap: [
            '$P_1(x) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1$.',
            'Equivalent slope form: $P_1(x) = y_0 + \\frac{y_1 - y_0}{x_1 - x_0}(x - x_0)$.',
          ],
          why: 'Now three worked examples.',
        },
      ],
    },
    {
      name: 'Worked examples',
      screens: [
        {
          type: 'story',
          eyebrow: 'Example 1',
          title: 'Find $P_1(x)$ through $(2, 3)$ and $(5, 7)$',
          body: '$$P_1(x) = \\frac{5 - x}{5 - 2}(3) + \\frac{x - 2}{5 - 2}(7) = (5 - x) + \\frac73(x - 2).$$\n\nSimplify: $5 - x + \\frac73x - \\frac{14}{3} = \\frac{4x + 1}{3}$.\n\nCheck: $P_1(2) = \\frac93 = 3$ ✓ and $P_1(5) = \\frac{21}{3} = 7$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Example 2',
          prompt: 'Given $(0.82, 2.270500)$ and $(0.83, 2.293319)$, find $P_1(0.826)$.',
          options: [
            { text: '$2.2842$', correct: true, why: 'Weights: $\\frac{0.83 - 0.826}{0.01} = 0.4$ and $\\frac{0.826 - 0.82}{0.01} = 0.6$. So $0.4(2.270500) + 0.6(2.293319) = 0.90820 + 1.37599 = 2.2842$.' },
            { text: '$2.2819$', why: 'The weights are the wrong way round: $0.826$ is nearer $0.83$, so $y_1$ gets the larger weight.' },
            { text: '$2.2933$', why: 'That’s just $y_1$.' },
            { text: '$4.5638$', why: 'That’s $y_0 + y_1$; the weights must add to 1.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Example 3',
          title: 'Estimate $\\ln 2$ from $\\ln 1 = 0$ and $\\ln 6 = 1.7918$',
          body: '$$P_1(x) = \\frac{6 - x}{5}(0) + \\frac{x - 1}{5}(1.7918) = 0.3584(x - 1).$$\n\nSo $\\ln 2 \\approx P_1(2) = 0.3584$.\n\nTrue value: $\\ln 2 = 0.6931$.\n$$\\text{Error} = 0.6931 - 0.3584 = 0.3347,$$\n$$\\text{Relative error} = \\frac{0.3347}{0.6931} \\times 100\\% = 48.3\\%.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why is the $\\ln 2$ estimate so poor?',
          options: [
            { text: 'The formula was applied wrongly', why: 'The arithmetic is right. The problem is the data.' },
            { text: '$\\ln x$ curves a lot over $[1, 6]$, so a straight line is a poor fit there', correct: true, why: 'Linear interpolation is good only over short intervals where the curve is nearly straight. Using $(1, 0)$ and $(4, 1.3863)$ already gives $0.4621$.' },
            { text: '$\\ln 6$ was rounded', why: 'Rounding to 4 d.p. is far too small to cause a 48% error.' },
            { text: 'Linear interpolation can never estimate logarithms', why: 'It can, with points close enough together.' },
          ],
          explain: 'Fixes: use points closer to $x = 2$, or a higher-degree polynomial (next lesson).',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Derive the linear interpolation formula',
          body: 'Let $P_1(x) = a_0 + a_1x$ with $P_1(x_i) = y_i$, $i = 0, 1$:\n$a_0 + a_1x_0 = y_0$, $a_0 + a_1x_1 = y_1$.\nSubtracting, $a_1 = \\frac{y_1 - y_0}{x_1 - x_0}$, and $a_0 = y_0 - x_0\\frac{y_1 - y_0}{x_1 - x_0}$. Hence\n$$P_1(x) = y_0 + \\frac{y_1 - y_0}{x_1 - x_0}(x - x_0) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1.$$',
        },
        {
          type: 'finish',
          title: 'You can interpolate linearly.',
          body: 'Next: higher-degree interpolation with Lagrange’s formula.',
        },
      ],
    },
  ],
};
