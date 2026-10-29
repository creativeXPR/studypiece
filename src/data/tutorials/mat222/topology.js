// MAT 222 · Warm-up: open, closed and compact subsets of ℝ.

const inside = (x) => Math.min(x, 1 - x);

export default {
  id: 'topology',
  title: 'Open, closed and compact sets',
  covers: 'Open and closed sets, limit points, closed ⇔ contains its limit points, Heine–Borel',
  minutes: 14,
  sections: [
    {
      name: 'Open and closed sets',
      terms: [
        ['Open set', '$S \\subseteq \\mathbb{R}$ is open if for each $x \\in S$ there is $\\varepsilon > 0$ with $(x - \\varepsilon, x + \\varepsilon) \\subseteq S$.'],
        ['Closed set', '$S$ is closed if its complement $\\mathbb{R} \\setminus S$ is open.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Warm-up',
          title: 'Why sets come before functions',
          body: 'Later you will meet theorems like “a continuous function on $[a, b]$ has a maximum”. They are **false** on $(a, b)$: $f(x) = x$ on $(0, 1)$ never reaches its top.\n\nThe difference is the kind of set. This warm-up gives the three words that explain it: ==open==, ==closed== and ==compact==.',
          cta: 'Start',
        },
        {
          type: 'story',
          eyebrow: 'Definition',
          title: 'Open: every point has breathing room',
          body: 'A set $S \\subseteq \\mathbb{R}$ is ==open== if around **each** of its points you can fit a small interval that stays inside $S$:\n$$\\forall x \\in S\\ \\ \\exists \\varepsilon > 0 :\\ (x - \\varepsilon, x + \\varepsilon) \\subseteq S.$$\n\nA set is ==closed== if its complement $\\mathbb{R} \\setminus S$ is open.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Look for breathing room',
          body: 'Slide the point $x$ along the number line. For $(0, 1)$ an interval always fits; for $[0, 1]$, watch what happens at the ends.',
          graph: {
            x: [-0.3, 1.3], y: [-1, 1], xs: [[0], [0.5, '½'], [1]], ys: [],
            views: ['(0, 1)', '[0, 1]'],
            param: { label: 'point $x$', min: 0, max: 1, step: 0.05, value: 0.5 },
            curves: [{ f: () => 0, from: 0, to: 1, kind: 'main' }],
            rects: [{ kind: 'strip', at: (x) => (inside(x) > 0 ? [[x - inside(x), 0.4, 2 * inside(x), 0.8]] : []) }],
            dots: [
              { at: () => [0, 0], kind: 'hole', show: (x, v) => v === 0 },
              { at: () => [1, 0], kind: 'hole', show: (x, v) => v === 0 },
              { at: () => [0, 0], kind: 'ok', show: (x, v) => v === 1 },
              { at: () => [1, 0], kind: 'ok', show: (x, v) => v === 1 },
              { at: (x) => [x, 0], kind: 'dot' },
            ],
            ok: (x, v) => !(v === 1 && (x === 0 || x === 1)),
            read: (x, v) => {
              if (x > 0 && x < 1) return `$x = ${x}$: take $\\varepsilon = ${inside(x).toFixed(2)}$; the strip stays inside.`;
              if (v === 0) return `$x = ${x}$ is **not** in $(0, 1)$, so it needs no room. Every point that is in has room: **open**.`;
              return `$x = ${x} \\in [0, 1]$, but every interval around it pokes outside: $[0, 1]$ is **not open** (it is closed).`;
            },
            need: 4,
            action: 'Try the middle and both ends, in both views',
          },
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Open, closed, both or neither?',
          buckets: [
            { id: 'o', label: 'Open only' },
            { id: 'c', label: 'Closed only' },
            { id: 'b', label: 'Both' },
            { id: 'n', label: 'Neither' },
          ],
          items: [
            { text: '$(a, b)$', bucket: 'o', why: '**Open interval**: room around every point.' },
            { text: '$[a, b]$', bucket: 'c', why: '**Closed**: its complement $(-\\infty, a) \\cup (b, \\infty)$ is open.' },
            { text: '$\\mathbb{R}$ and $\\emptyset$', bucket: 'b', why: '**Both**: each is the complement of the other, and both are open.' },
            { text: '$[0, 1)$', bucket: 'n', why: '**Neither**: no room at $0$, and $1$ is a limit point it misses.' },
            { text: '$\\{0\\} \\cup \\{\\frac1n : n \\in \\mathbb{N}\\}$', bucket: 'c', why: '**Closed**: it contains its only limit point, $0$.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'The rules',
          title: 'Unions and intersections',
          cards: [
            { title: 'Open sets', text: 'Any union of open sets is open. A **finite** intersection of open sets is open.' },
            { title: 'Why “finite”?', text: '$\\bigcap_{n=1}^{\\infty} \\left(-\\frac1n, 1 + \\frac1n\\right) = [0, 1]$, which is not open.' },
            { title: 'Closed sets', text: 'Any intersection of closed sets is closed. A **finite** union of closed sets is closed.' },
            { title: 'Why “finite” again?', text: '$\\bigcup_{n} \\left[\\frac1n, 1\\right] = (0, 1]$, which is not closed.' },
          ],
          note: 'Structure theorem: a non-empty set is open if and only if it is a union of countably many pairwise disjoint open intervals.',
        },
        {
          type: 'bridge',
          title: 'Open and closed: set.',
          recap: ['Open: an ε-interval fits around every point.', 'Closed: the complement is open.'],
          why: 'Now the tool that links closed sets to sequences: limit points.',
        },
      ],
    },
    {
      name: 'Limit points and compactness',
      terms: [
        ['Limit point (cluster point)', '$x$ is a limit point of $S$ if every interval $(x - \\varepsilon, x + \\varepsilon)$ contains a point of $S$ other than $x$.'],
        ['Compact set', 'A set $K$ such that every open cover has a finite subcover. In $\\mathbb{R}$ (Heine–Borel): compact ⇔ closed and bounded.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Definition',
          title: 'Limit points: where the set piles up',
          body: '$x$ is a ==limit point== (cluster point, accumulation point) of $S$ if every interval around $x$ contains a point of $S$ **other than $x$ itself**.\n\nA limit point need **not** belong to $S$: $0$ is a limit point of $\\{\\frac1n : n \\in \\mathbb{N}\\}$ but is not in it.',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'What are the limit points of $S = \\{\\frac1n : n \\in \\mathbb{N}\\}$?',
          options: [
            { text: 'Only $0$', correct: true, why: 'The points $\\frac1n$ crowd towards $0$. Each $\\frac1n$ itself is isolated: a small interval around it holds no other point of $S$.' },
            { text: 'Every $\\frac1n$', why: 'Around $\\frac1n$ a small enough interval holds no other point of $S$, so $\\frac1n$ is isolated.' },
            { text: '$0$ and $1$', why: '$1$ is isolated: $(\\frac12, \\frac32)$ contains no other point of $S$.' },
            { text: 'There are none', why: 'Every interval around $0$ contains infinitely many $\\frac1n$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The key theorem',
          title: 'Closed ⇔ contains all its limit points',
          body: 'So $\\{\\frac1n\\}$ is **not** closed (it misses $0$), while $\\{0\\} \\cup \\{\\frac1n\\}$ **is** closed.\n\nA set $K$ is ==compact== if every open cover of $K$ has a finite subcover. In $\\mathbb{R}$ there is a much easier test:\n\n**Heine–Borel theorem.** $K \\subseteq \\mathbb{R}$ is compact if and only if it is **closed and bounded**.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which sets are compact?',
          options: [
            { text: '$[0, 1]$', correct: true, why: '**Closed and bounded.**' },
            { text: '$\\{0\\} \\cup \\{\\frac1n : n \\in \\mathbb{N}\\}$', correct: true, why: '**Closed** (it has its limit point) **and bounded**.' },
            { text: 'Any finite set', correct: true, why: '**Finite sets** have no limit points, so they are closed, and they are bounded.' },
            { text: '$(0, 1)$', why: '**Not closed**: it misses its limit points $0$ and $1$.' },
            { text: '$[0, \\infty)$', why: '**Not bounded.**' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: $S$ is closed if and only if it contains all its limit points',
          body: '**(⇒)** Let $S$ be closed, so $C = \\mathbb{R} \\setminus S$ is open. Suppose a limit point $x$ of $S$ is not in $S$. Then $x \\in C$, so some $(x - \\varepsilon, x + \\varepsilon) \\subseteq C$. That interval contains no point of $S$, contradicting that $x$ is a limit point. So $x \\in S$.\n\n**(⇐)** Suppose $S$ contains all its limit points, and let $x \\in C$. Then $x$ is not a limit point of $S$, so some $(x - \\varepsilon, x + \\varepsilon)$ contains no point of $S$ (and $x \\notin S$). Hence $(x - \\varepsilon, x + \\varepsilon) \\subseteq C$, so $C$ is open and $S$ is closed. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'Warm-up: done.',
          body: 'You now have the language of open, closed and compact sets. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
