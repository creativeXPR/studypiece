// MAT 222 · Limits · Lesson 1: cluster points, the ε-δ limit and its uniqueness.
import { joinLesson } from './join';
import limitDefinition from './limit-definition';
import limitUnique from './limit-unique';

const S = Array.from({ length: 40 }, (_, i) => 1 / (i + 1));

const clusterPoints = {
  name: 'Cluster points',
  terms: [
    ['Cluster point', '$x \\in \\mathbb{R}$ is a cluster point of $S \\subseteq \\mathbb{R}$ if for every $\\varepsilon > 0$, $(x - \\varepsilon, x + \\varepsilon) \\cap S \\setminus \\{x\\} \\ne \\emptyset$. It need not lie in $S$.'],
    ['Sequence test', '$x$ is a cluster point of $S$ ⇔ there is a sequence $(x_n)$ in $S$ with $x_n \\ne x$ and $x_n \\to x$.'],
  ],
  screens: [
    {
      type: 'story',
      eyebrow: 'Limits · Lesson 1',
      title: 'Where can a limit even be taken?',
      body: 'To talk about $\\lim_{x \\to c} f(x)$ we need points of the domain $S$ **arbitrarily close** to $c$; otherwise “$x$ close to $c$” is empty.\n\nSuch a $c$ is a ==cluster point== (accumulation point, limit point) of $S$: for every $\\varepsilon > 0$,\n$$(c - \\varepsilon, c + \\varepsilon) \\cap S \\setminus \\{c\\} \\ne \\emptyset.$$\nThe point $c$ itself need **not** be in $S$.',
      cta: 'See one',
    },
    {
      type: 'custom',
      widget: 'graph',
      eyebrow: 'See it',
      title: '$0$ is a cluster point of $\\{\\frac1n\\}$',
      body: 'The dots are $S = \\{1, \\frac12, \\frac13, \\dots\\}$. Shrink the window $(-\\varepsilon, \\varepsilon)$ around $0$ and count how many points of $S$ are still inside.',
      graph: {
        x: [-0.15, 1.05], y: [-1, 1], xs: [[0], [0.5, '½'], [1]], ys: [],
        param: { label: '$\\varepsilon$', min: 0.02, max: 0.6, step: 0.02, value: 0.4 },
        rects: [{ kind: 'strip', at: (e) => [[-e, 0.5, 2 * e, 1]] }],
        dots: [...S.map((s) => ({ kind: 'ok', at: () => [s, 0] })), { kind: 'hole', at: () => [0, 0] }],
        read: (e) => `$\\varepsilon = ${e}$: every $\\frac1n < ${e}$ is inside, i.e. **infinitely many** points (all $n > ${Math.floor(1 / e)}$). However small ε gets, the window is never empty: $0$ is a cluster point, though $0 \\notin S$.`,
        need: 4,
        action: 'Shrink ε a few times',
      },
    },
    {
      type: 'sort',
      eyebrow: 'Sort them',
      prompt: 'Cluster point of the set, or not?',
      buckets: [
        { id: 'y', label: 'Cluster point' },
        { id: 'n', label: 'Not a cluster point' },
      ],
      items: [
        { text: '$0$ for $S = (0, 1)$', bucket: 'y', why: '**Yes**: points of $(0, 1)$ come arbitrarily close to $0$.' },
        { text: '$\\frac12$ for $S = (0, 1)$', bucket: 'y', why: '**Yes**: every point of $[0, 1]$ is a cluster point of $(0, 1)$.' },
        { text: '$2$ for $S = (0, 1)$', bucket: 'n', why: '**No**: $(1.5, 2.5)$ misses $S$ entirely.' },
        { text: '$\\frac12$ for $S = \\{\\frac1n\\}$', bucket: 'n', why: '**No**: it is an isolated point of $S$.' },
        { text: '$\\sqrt2$ for $S = \\mathbb{Q}$', bucket: 'y', why: '**Yes**: rationals crowd every real number. The cluster points of $\\mathbb{Q}$ are all of $\\mathbb{R}$.' },
      ],
    },
    {
      type: 'story',
      eyebrow: 'Proposition',
      title: 'Cluster points through sequences',
      body: '$x$ is a cluster point of $S$ **if and only if** there is a sequence $(x_n)$ of points of $S$ with $x_n \\ne x$ for all $n$ and $x_n \\to x$.\n\n**(⇒)** For each $n$ pick $x_n \\in (x - \\frac1n, x + \\frac1n) \\cap S \\setminus \\{x\\}$ (non-empty since $x$ is a cluster point). Then $|x_n - x| < \\frac1n \\to 0$.\n\n**(⇐)** Given $\\varepsilon > 0$, eventually $|x_n - x| < \\varepsilon$, so $x_n \\in (x - \\varepsilon, x + \\varepsilon) \\cap S \\setminus \\{x\\}$.',
    },
    {
      type: 'bridge',
      title: 'Cluster points: set.',
      recap: ['A limit $\\lim_{x \\to c}$ is only defined at cluster points of the domain.', 'Cluster ⇔ reachable by a sequence of other points of the set.'],
      why: 'Now the definition of the limit itself.',
    },
  ],
};

export default joinLesson(
  {
    id: 'cluster-limit',
    title: 'Cluster points and the ε-δ limit',
    covers: 'Cluster points, the ε-δ definition of a limit symbol by symbol, and why a limit is unique',
    minutes: 26,
  },
  [clusterPoints],
  limitDefinition,
  limitUnique,
);
