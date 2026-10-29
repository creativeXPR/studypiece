// MAT 222 · Continuity on closed intervals · Lesson 3: uniform and Lipschitz continuity.
import { joinLesson } from './join';
import continuityDefinitions from './continuity-definitions';
import lipschitz from './lipschitz';

const sq = (x) => Math.sqrt(Math.max(0, x));

const closedAndLipschitz = {
  name: 'Closed intervals and Lipschitz examples',
  terms: [
    ['Uniform continuity theorem', 'A continuous $f : [a, b] \\to \\mathbb{R}$ is uniformly continuous on $[a, b]$.'],
    ['Lipschitz function', '$|f(x) - f(y)| \\le k|x - y|$ for all $x, y$ in the domain, for some constant $k$.'],
  ],
  screens: [
    {
      type: 'story',
      eyebrow: 'The theorem',
      title: 'On $[a, b]$, continuous means uniformly continuous',
      body: '**Theorem.** If $f : [a, b] \\to \\mathbb{R}$ is continuous, it is uniformly continuous.\n\n**Proof (contrapositive).** If not, there is $\\varepsilon > 0$ and points $x_n, y_n \\in [a, b]$ with $|x_n - y_n| < \\frac1n$ but $|f(x_n) - f(y_n)| \\ge \\varepsilon$. By Bolzano–Weierstrass a subsequence $x_{n_k} \\to c \\in [a, b]$; then $|y_{n_k} - c| \\le |y_{n_k} - x_{n_k}| + |x_{n_k} - c| \\to 0$ too. If $f$ were continuous at $c$, both $f(x_{n_k})$ and $f(y_{n_k})$ would tend to $f(c)$, so their difference would tend to $0$, not stay $\\ge \\varepsilon$. So $f$ is not continuous at $c$. $\\blacksquare$\n\nThat is why $\\frac1x$ fails on $(0, 1)$: the interval is not closed.',
    },
    {
      type: 'custom',
      widget: 'graph',
      eyebrow: 'See it',
      title: 'The Lipschitz cone for $\\sqrt x$',
      body: 'A function is Lipschitz with constant $k$ when, from **every** point, the graph stays inside the cone of slopes $\\pm k$. Here $k = \\frac12$. Move the point and compare $[1, \\infty)$ with $[0, 1]$.',
      graph: {
        x: [-0.1, 4.2], y: [-0.4, 2.4], xs: [[0], [1], [2], [3], [4]], ys: [[0], [1], [2]],
        views: ['on [1, ∞)', 'near 0'],
        param: { label: 'point $a$', min: 0, max: 3, step: 0.25, value: 1.5 },
        curves: [
          { f: sq, from: 0 },
          { f: (x, a) => sq(a) + 0.5 * (x - a), kind: 'guide' },
          { f: (x, a) => sq(a) - 0.5 * (x - a), kind: 'guide' },
        ],
        rects: [{ kind: 'strip', show: (a, v) => v === 0, at: () => [[1, 2.4, 3.2, 2.8]] }],
        dots: [{ kind: 'ok', at: (a) => [a, sq(a)] }],
        ok: (a) => a >= 1,
        read: (a) => (a >= 1
          ? `At $a = ${a}$: for $x, y \\ge 1$, $|\\sqrt x - \\sqrt y| = \\frac{|x - y|}{\\sqrt x + \\sqrt y} \\le \\frac12|x - y|$. The graph stays in the cone: **Lipschitz with $k = \\frac12$**.`
          : `At $a = ${a} < 1$ the graph escapes the slope-$\\frac12$ cone. Near $0$ the slope of $\\sqrt x$ is unbounded, so $\\sqrt x$ is **not Lipschitz on $[0, 1]$** (yet it is uniformly continuous there, being continuous on a closed interval).`),
        need: 4,
        action: 'Move a, including below 1',
      },
    },
    {
      type: 'choice',
      eyebrow: 'Your turn',
      prompt: 'Show $f(x) = 3x + 2$ is Lipschitz. What is the constant?',
      options: [
        { text: '$k = 3$, since $|f(x) - f(y)| = 3|x - y|$', correct: true, why: 'So for uniform continuity, given ε take $\\delta = \\frac\\varepsilon3$.' },
        { text: '$k = 2$', why: 'The constant term cancels: $|(3x + 2) - (3y + 2)| = 3|x - y|$.' },
        { text: '$k = 5$', why: 'Only the slope matters.' },
        { text: 'It is not Lipschitz on $\\mathbb{R}$', why: 'Linear functions are Lipschitz on all of $\\mathbb{R}$.' },
      ],
    },
    {
      type: 'sort',
      eyebrow: 'Sort them',
      prompt: 'On the given domain, which is it?',
      buckets: [
        { id: 'l', label: 'Lipschitz (so uniformly continuous)' },
        { id: 'u', label: 'Uniformly continuous, not Lipschitz' },
        { id: 'c', label: 'Continuous only' },
      ],
      items: [
        { text: '$\\sin x$ on $\\mathbb{R}$', bucket: 'l', why: '**Lipschitz**: $|\\sin x - \\sin y| \\le |x - y|$.' },
        { text: '$\\sqrt x$ on $[0, 1]$', bucket: 'u', why: '**Uniformly continuous** (closed interval) but the slope is unbounded near $0$.' },
        { text: '$\\frac1x$ on $(0, 1)$', bucket: 'c', why: '**Continuous only**: δ must shrink to $0$ near $0$.' },
        { text: '$x^2$ on $[0, 2]$', bucket: 'l', why: '**Lipschitz** with $k = 4$: $|x^2 - y^2| = |x + y||x - y| \\le 4|x - y|$.' },
        { text: '$x^2$ on $\\mathbb{R}$', bucket: 'c', why: '**Continuous only**: the needed δ shrinks as $|x|$ grows.' },
      ],
    },
    {
      type: 'finish',
      title: 'Uniform and Lipschitz continuity: done.',
      body: 'That completes continuity on closed intervals. Key terms, ready for revision:',
    },
  ],
};

export default joinLesson(
  {
    id: 'uniform-lipschitz',
    title: 'Uniform and Lipschitz continuity',
    covers: 'Continuity vs uniform continuity, 1/x on (0, 1), Lipschitz ⇒ uniformly continuous, continuous on [a, b] ⇒ uniformly continuous, √x and 3x + 2',
    minutes: 28,
  },
  continuityDefinitions,
  lipschitz,
  [closedAndLipschitz],
);
