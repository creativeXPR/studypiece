// MAT 222 · Continuity · Lesson 2: building continuous functions, composition, types of discontinuity.
import { joinLesson } from './join';
import sin2xOverX from './sin2x-over-x';

const KINDS = [
  { f: (x) => (Math.abs(x) < 1e-9 ? NaN : Math.sin(2 * x) / x), hole: [0, 2], dot: [0, 1], text: '**Removable**: the limit $2$ exists but $f(0) = 1 \\ne 2$. Redefine $f(0) = 2$ and the gap closes.' },
  { f: (x) => (x < 0 ? -1 : 1), hole: [0, -1], dot: [0, 1], text: '**Jump**: left limit $-1$, right limit $1$. Both one-sided limits exist but differ.' },
  { f: (x) => 1 / (x * x) / 4, text: '**Infinite**: $f(x) \\to \\infty$ as $x \\to 0$. No finite limit at all.' },
  { f: (x) => (Math.abs(x) < 1e-9 ? NaN : Math.sin(1 / x)), text: '**Oscillating (essential)**: $\\sin\\frac1x$ swings between $-1$ and $1$ infinitely often; no one-sided limit exists.' },
];

const building = {
  name: 'Building and breaking continuity',
  terms: [
    ['Algebra of continuous functions', 'If $f$, $g$ are continuous at $c$: $f \\pm g$, $fg$, $\\lambda f$ are continuous at $c$, and $f/g$ is if $g(c) \\ne 0$.'],
    ['Composition', 'If $g$ is continuous at $c$ and $f$ is continuous at $g(c)$, then $f \\circ g$ is continuous at $c$.'],
    ['Removable discontinuity', '$\\lim_{x \\to c} f(x)$ exists but differs from $f(c)$ (or $f(c)$ is undefined).'],
    ['Jump discontinuity', 'Both one-sided limits exist but are different.'],
  ],
  screens: [
    {
      type: 'story',
      eyebrow: 'Continuity · Lesson 2',
      title: 'Build big continuous functions from small ones',
      body: 'If $f$ and $g$ are continuous at $c$, so are $f + g$, $f - g$, $fg$ and $\\lambda f$, and $\\frac fg$ when $g(c) \\ne 0$. Each follows from the matching rule for sequences.\n\nStart from $x$ and constants and you get every **polynomial**: $p(x) = a_d x^d + \\cdots + a_0$ is continuous everywhere, since $p(x_n) \\to p(c)$ whenever $x_n \\to c$.',
      cta: 'Next: composition',
    },
    {
      type: 'story',
      eyebrow: 'Proposition',
      title: 'Composition keeps continuity',
      body: 'Let $g : A \\to B$ be continuous at $c$ and $f : B \\to \\mathbb{R}$ continuous at $g(c)$. Then $f \\circ g$ is continuous at $c$.\n\n**Proof.** Let $x_n \\to c$ in $A$. Since $g$ is continuous at $c$, $g(x_n) \\to g(c)$. Since $f$ is continuous at $g(c)$, $f(g(x_n)) \\to f(g(c))$. So $f \\circ g$ is continuous at $c$. $\\blacksquare$\n\nAlso: $\\sin$ and $\\cos$ are continuous, since $|\\sin x - \\sin c| \\le |x - c|$ and $|\\cos x - \\cos c| \\le |x - c|$.',
    },
    {
      type: 'custom',
      widget: 'graph',
      eyebrow: 'See it',
      title: 'Four ways to break continuity at $0$',
      body: 'Tap through the four kinds of discontinuity. The hollow circle is where the graph heads; the solid dot is the actual value.',
      graph: {
        x: [-2, 2], y: [-2, 2.6], xs: [[-1], [0], [1]], ys: [[-1], [0], [1], [2]],
        views: ['Removable', 'Jump', 'Infinite', 'Oscillating'],
        curves: [{ f: (x, p, v) => KINDS[v].f(x), n: 1200, breaks: [0] }],
        dots: [
          { kind: 'hole', show: (p, v) => !!KINDS[v].hole, at: (p, v) => KINDS[v].hole ?? [0, NaN] },
          { kind: 'ok', show: (p, v) => !!KINDS[v].dot, at: (p, v) => KINDS[v].dot ?? [0, NaN] },
        ],
        read: (p, v) => KINDS[v].text,
        need: 4,
        action: 'Look at all four kinds',
      },
    },
    {
      type: 'sort',
      eyebrow: 'Classify',
      prompt: 'Which kind of discontinuity at $x = 3$?',
      buckets: [
        { id: 'r', label: 'Removable' },
        { id: 'j', label: 'Jump' },
        { id: 'i', label: 'Infinite' },
      ],
      items: [
        { text: '$f(x) = \\frac{x^2 - 9}{x - 3}$, $f(3) = 0$', bucket: 'r', why: '**Removable**: the limit is $6$, the value $0$.' },
        { text: '$f(x) = -x^2 + 4$ for $x \\le 3$, $4x - 8$ for $x > 3$', bucket: 'j', why: '**Jump**: left limit $-5$, right limit $4$.' },
        { text: '$f(x) = \\frac{1}{x - 3}$, $f(3) = 0$', bucket: 'i', why: '**Infinite**: the values blow up near $3$.' },
        { text: '$f(x) = \\lfloor x \\rfloor$', bucket: 'j', why: '**Jump**: left limit $2$, right limit $3$.' },
      ],
    },
    {
      type: 'bridge',
      title: 'Building and breaking: set.',
      recap: ['Sums, products, quotients and compositions of continuous functions are continuous.', 'Discontinuities: removable, jump, infinite, oscillating.'],
      why: 'Now a full exam question on one removable discontinuity.',
    },
  ],
};

export default joinLesson(
  {
    id: 'discontinuities',
    title: 'Building continuous functions, and where they break',
    covers: 'Algebra and composition of continuous functions, polynomials, sin and cos, the kinds of discontinuity, sin 2x/x worked in full',
    minutes: 22,
  },
  [building],
  sin2xOverX,
);
