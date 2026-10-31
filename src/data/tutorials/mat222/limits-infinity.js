// MAT 222 · Limits · Lesson 4: limits at infinity and infinite limits.

const f1 = (x) => 1 / (Math.abs(x) + 1);
const f2 = (x) => (1 + x * x) / (1 + x);

export default {
  id: 'limits-infinity',
  title: 'Limits at infinity and infinite limits',
  covers: 'f(x) → L as x → ∞, f(x) → ∞ as x → ∞, the sequential versions, worked proofs, (x³+1)/(x+1)³ → 1 type limits',
  minutes: 16,
  sections: [
    {
      name: 'Limits at infinity',
      terms: [
        ['Limit at ∞', '$\\lim_{x \\to \\infty} f(x) = L$: for every $\\varepsilon > 0$ there is $M$ such that $|f(x) - L| < \\varepsilon$ whenever $x \\in S$, $x \\ge M$.'],
        ['Limit at −∞', 'The same with $x \\le M$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Limits · Lesson 4',
          title: 'Replace δ by a threshold $M$',
          body: 'Near infinity there is no “δ-window”. Instead: “far enough out”.\n\n$\\infty$ is a cluster point of $S$ if for every $M$ there is $x \\in S$ with $x \\ge M$. Then\n$$\\lim_{x \\to \\infty} f(x) = L \\iff \\forall \\varepsilon > 0\\ \\exists M :\\ x \\in S,\\ x \\ge M \\Rightarrow |f(x) - L| < \\varepsilon.$$\nThe limit, if it exists, is **unique**.',
          cta: 'See it',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: '$\\frac{1}{|x| + 1} \\to 0$ as $x \\to \\infty$',
          body: 'Choose ε. The threshold $M = \\frac1\\varepsilon - 1$ is the dashed line: beyond it the graph stays inside the yellow band $(-\\varepsilon, \\varepsilon)$.',
          graph: {
            x: [0, 20], y: [-0.25, 1.05], xs: [[0], [5], [10], [15], [20]], ys: [[0], [0.5, '½'], [1]],
            param: { label: '$\\varepsilon$', min: 0.05, max: 0.5, step: 0.05, value: 0.25 },
            rects: [{ kind: 'band', at: (e) => [[0, e, 20, 2 * e]] }],
            curves: [{ f: f1 }],
            segs: [{ at: (e) => [1 / e - 1, -0.25, 1 / e - 1, 1.05], kind: 'guide' }],
            read: (e) => `$\\varepsilon = ${e}$: take $M = \\frac1\\varepsilon - 1 = ${(1 / e - 1).toFixed(1)}$. For $x \\ge M$, $0 < \\frac1{x + 1} \\le \\frac1{M + 1} = \\varepsilon$.`,
            need: 4,
            action: 'Shrink ε and watch M move out',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'To prove $\\lim_{x \\to \\infty} \\frac{2x^3 - x^2}{x^3 + 2x^2 + 1} = 2$, what is the first move?',
          options: [
            { text: 'Divide top and bottom by $x^3$', correct: true, why: '$\\frac{2 - 1/x}{1 + 2/x + 1/x^3} \\to \\frac{2}{1} = 2$, using $\\frac1x \\to 0$ and the algebra of limits.' },
            { text: 'Substitute $x = \\infty$', why: '$\\infty$ is not a number; you must use limits.' },
            { text: 'Use L’Hôpital immediately', why: 'It works but is heavier than needed; dividing by the top power is the standard first step.' },
            { text: 'Factor $x - 2$', why: 'That helps limits at finite points, not at infinity.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Limits at ∞: set.',
          recap: ['δ becomes a threshold $M$.', 'Divide by the highest power for rational functions.'],
          why: 'What if the values themselves run off to infinity?',
        },
      ],
    },
    {
      name: 'Infinite limits',
      terms: [
        ['Infinite limit', '$\\lim_{x \\to \\infty} f(x) = \\infty$: for every $N$ there is $M$ such that $f(x) > N$ whenever $x \\in S$, $x \\ge M$.'],
        ['Limit +∞ at a point', '$\\lim_{x \\to c} f(x) = +\\infty$: for every $N$ there is $\\delta > 0$ with $f(x) > N$ whenever $0 < |x - c| < \\delta$.'],
      ],
      screens: [
        {
          type: 'story',
          asides: [
            { label: 'Exam tip', text: 'Often examined: be ready to say when $f$ tends to positive infinity, then prove it for a given function.' },
          ],
          eyebrow: 'Definition',
          title: 'Beat any height $N$',
          body: '$f$ ==diverges to infinity== as $x \\to \\infty$ if for every $N \\in \\mathbb{R}$ there is an $M$ such that\n$$f(x) > N \\quad \\text{whenever } x \\in S,\\ x \\ge M.$$\nWe write $\\lim_{x \\to \\infty} f(x) = \\infty$. At a point: $f(x) > N$ whenever $0 < |x - c| < \\delta$.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: '$\\frac{1 + x^2}{1 + x} \\to \\infty$',
          body: 'Pick a height $N$. The threshold $M = \\max\\{2N + 1, 1\\}$ (dashed) works: past it the graph clears the line $y = N$.',
          graph: {
            x: [0, 40], y: [0, 22], xs: [[0], [10], [20], [30], [40]], ys: [[0], [10], [20]],
            param: { label: 'height $N$', min: 2, max: 18, step: 2, value: 6 },
            curves: [{ f: f2 }],
            segs: [
              { at: (N) => [0, N, 40, N], kind: 'guide' },
              { at: (N) => [Math.max(2 * N + 1, 1), 0, Math.max(2 * N + 1, 1), 22], kind: 'guide' },
            ],
            dots: [{ kind: 'ok', at: (N) => [Math.max(2 * N + 1, 1), f2(Math.max(2 * N + 1, 1))] }],
            read: (N) => `$N = ${N}$: for $x \\ge M = ${2 * N + 1}$, $\\frac{1 + x^2}{1 + x} \\ge \\frac{x^2}{2x} = \\frac x2 > N$.`,
            need: 4,
            action: 'Raise N a few times',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Why is $\\frac{1 + x^2}{1 + x} \\ge \\frac{x}{2}$ for $x \\ge 1$?',
          options: [
            { text: '$1 + x^2 \\ge x^2$ and $1 + x \\le 2x$', correct: true, why: 'Make the top smaller and the bottom bigger: $\\frac{1 + x^2}{1 + x} \\ge \\frac{x^2}{2x} = \\frac x2$.' },
            { text: '$1 + x^2 \\le 2x$', why: 'False for large $x$.' },
            { text: 'By L’Hôpital', why: 'This is a plain inequality, no calculus needed.' },
            { text: 'It is only true at $x = 1$', why: 'It holds for all $x \\ge 1$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove $\\lim_{x \\to -1} \\frac{x^3 + 1}{(x + 1)^3} = +\\infty$',
          body: 'For $x \\ne -1$, $x^3 + 1 = (x + 1)(x^2 - x + 1)$, so\n$$f(x) = \\frac{x^2 - x + 1}{(x + 1)^2}.$$\nFor $|x + 1| < 1$, i.e. $-2 < x < 0$, the top $x^2 - x + 1 > 1$. Given $N > 0$, let $\\delta = \\min\\{1, \\frac{1}{\\sqrt N}\\}$. If $0 < |x + 1| < \\delta$ then\n$$f(x) > \\frac{1}{(x + 1)^2} > \\frac{1}{\\delta^2} \\ge N.$$\nHence $\\lim_{x \\to -1} f(x) = +\\infty$. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'Limits: complete.',
          body: 'You can now handle limits at points, at infinity and to infinity. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
