// MAT 222 · Continuity · Lesson 1: what continuity means (ε-δ, sequences, the three conditions).
import { joinLesson } from './join';
import threeConditions from './three-conditions';

const FN = [
  (x) => x * x,
  (x) => (Math.abs(x - 1) < 1e-9 ? 3 : x + 1),
  (x) => (x < 1 ? x : x + 1),
];
const VAL = [1, 3, 2];
const LIM = ['1', '2', 'none (left 1, right 2)'];

const meaning = {
  name: 'Continuity, three ways',
  terms: [
    ['Continuous at $c$', '$f : S \\to \\mathbb{R}$, $c \\in S$: for every $\\varepsilon > 0$ there is $\\delta > 0$ with $|f(x) - f(c)| < \\varepsilon$ whenever $x \\in S$, $|x - c| < \\delta$.'],
    ['Sequential criterion', '$f$ is continuous at $c$ ⇔ $f(x_n) \\to f(c)$ for every sequence $x_n \\in S$ with $x_n \\to c$.'],
    ['Continuous function', '$f$ is continuous at every point of its domain.'],
  ],
  screens: [
    {
      type: 'story',
      eyebrow: 'Continuity · Lesson 1',
      title: 'Nearby inputs, nearby outputs',
      body: '$f : S \\to \\mathbb{R}$ is ==continuous at== $c \\in S$ if for every $\\varepsilon > 0$ there is $\\delta > 0$ such that\n$$|f(x) - f(c)| < \\varepsilon \\quad \\text{whenever } x \\in S,\\ |x - c| < \\delta.$$\nCompare the limit: now the target is the **actual value** $f(c)$, and $x = c$ is allowed.',
      cta: 'See what can go wrong',
    },
    {
      type: 'custom',
      widget: 'graph',
      eyebrow: 'See it',
      title: 'Walk towards $c = 1$ from both sides',
      body: 'The dot is at $x = 1 + t$. Slide $t$ towards $0$ from the left and from the right, and compare where the values head with the value $f(1)$ (green).',
      graph: {
        x: [-0.2, 2.2], y: [-0.2, 4.2], xs: [[0], [1, 'c = 1'], [2]], ys: [[0], [1], [2], [3], [4]],
        views: ['x²', 'hole', 'jump'],
        param: { label: '$t$ (so $x = 1 + t$)', min: -0.8, max: 0.8, step: 0.1, value: -0.6 },
        curves: [{ f: (x, t, v) => FN[v](x), breaks: [1] }],
        dots: [
          { kind: 'hole', show: (t, v) => v === 1, at: () => [1, 2] },
          { kind: 'hole', show: (t, v) => v === 2, at: () => [1, 1] },
          { kind: 'ok', at: (t, v) => [1, VAL[v]] },
          { kind: 'dot', show: (t) => Math.abs(t) > 1e-9, at: (t, v) => [1 + t, FN[v](1 + t)] },
        ],
        ok: (t, v) => v === 0,
        read: (t, v) => `$f(1 + ${t}) = ${FN[v](1 + t).toFixed(2)}$. Values head to: **${LIM[v]}**; actual $f(1) = ${VAL[v]}$. ${['Equal: **continuous**.', 'Limit $2 \\ne 3$: **discontinuous**.', 'No limit: **discontinuous**.'][v]}`,
        need: 6,
        action: 'Approach from both sides in every view',
      },
    },
    {
      type: 'story',
      eyebrow: 'Proposition',
      title: 'Continuity through sequences',
      body: 'Let $c \\in S$.\n\n**1.** If $c$ is **not** a cluster point of $S$ (an isolated point), $f$ is automatically continuous at $c$: a small δ leaves only $x = c$.\n\n**2.** If $c$ **is** a cluster point, $f$ is continuous at $c$ ⇔ $\\lim_{x \\to c} f(x)$ exists and equals $f(c)$.\n\n**3.** $f$ is continuous at $c$ ⇔ for every sequence $x_n \\in S$ with $x_n \\to c$, $f(x_n) \\to f(c)$.',
    },
    {
      type: 'choice',
      eyebrow: 'Check',
      prompt: 'Using sequences, show the signum-type function $f(x) = -1$ for $x < 0$, $f(x) = 1$ for $x \\ge 0$ is not continuous at $0$.',
      options: [
        { text: 'Take $x_n = -\\frac1n \\to 0$: $f(x_n) = -1 \\to -1 \\ne f(0) = 1$', correct: true, why: 'One sequence whose values miss $f(0)$ is enough to break continuity.' },
        { text: 'Take $x_n = \\frac1n$: $f(x_n) = 1$', why: 'That sequence agrees with $f(0) = 1$, so it proves nothing.' },
        { text: 'Because $f$ is not defined at $0$', why: '$f(0) = 1$ is defined.' },
        { text: 'Because $f$ is bounded', why: 'Boundedness has nothing to do with it.' },
      ],
    },
    {
      type: 'bridge',
      title: 'Three faces of continuity.',
      recap: ['ε-δ with target $f(c)$.', 'Limit equals value.', 'Every sequence $x_n \\to c$ gives $f(x_n) \\to f(c)$.'],
      why: 'Next, the checklist version that exam questions love.',
    },
  ],
};

export default joinLesson(
  {
    id: 'continuity',
    title: 'What continuity means',
    covers: 'The ε-δ definition, the sequential criterion, isolated points, and the three conditions for continuity at a point',
    minutes: 18,
  },
  [meaning],
  threeConditions,
);
