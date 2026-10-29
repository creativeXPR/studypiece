// MAT 222 · Continuity on closed intervals · Lesson 1: boundedness and the extreme value theorem.

const VIEWS = [
  { f: (x) => x * x - x + 0.5, from: 0, to: 1, ends: 'closed', text: '$[0, 1]$, continuous: the minimum $\\frac14$ is attained at $x = \\frac12$ and the maximum $\\frac12$ at both ends. **EVT holds.**' },
  { f: (x) => x, from: 0, to: 1, ends: 'open', text: '$(0, 1)$, $f(x) = x$: $\\sup = 1$ and $\\inf = 0$ are never attained. **Fails: the interval is not closed.**' },
  { f: (x) => 1 / x, from: 0.12, to: 1, ends: 'half', text: '$(0, 1]$, $f(x) = \\frac1x$: unbounded above. **Fails: not closed, so not even bounded.**' },
];

export default {
  id: 'extreme-value',
  title: 'Bounded functions and the extreme value theorem',
  covers: 'Bounded functions, Bolzano–Weierstrass, continuous on [a, b] ⇒ bounded, the extreme (min–max) value theorem, absolute extrema',
  minutes: 18,
  sections: [
    {
      name: 'The boundedness theorem',
      terms: [
        ['Bounded function', '$f$ is bounded on $E$ if there is $M > 0$ with $|f(x)| \\le M$ for all $x \\in E$.'],
        ['Bolzano–Weierstrass theorem', 'Every bounded sequence of real numbers has a convergent subsequence.'],
        ['Boundedness theorem', 'If $f : [a, b] \\to \\mathbb{R}$ is continuous, then $f$ is bounded.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Continuity on closed intervals · Lesson 1',
          title: 'What a closed, bounded interval buys you',
          body: 'On $[a, b]$ a continuous function cannot run off to infinity and **must** reach a highest and lowest value. Both facts fail on open intervals.\n\nThe engine behind them is the ==Bolzano–Weierstrass theorem==: every bounded sequence has a convergent subsequence. A sequence trapped in $[a, b]$ must pile up somewhere in $[a, b]$.',
          cta: 'See the theorem fail and hold',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'When is a max and a min guaranteed?',
          body: 'Compare the three cases. Hollow ends are not in the domain.',
          graph: {
            x: [-0.1, 1.15], y: [-0.2, 2.6], xs: [[0], [0.5, '½'], [1]], ys: [[0], [1], [2]],
            views: ['[0,1]: x²−x+½', '(0,1): x', '(0,1]: 1/x'],
            curves: [{ f: (x, p, v) => VIEWS[v].f(x), from: 0, to: 1 }].map((c) => ({ ...c, f: (x, p, v) => (x < VIEWS[v].from || x > VIEWS[v].to ? NaN : VIEWS[v].f(x)) })),
            dots: [
              { kind: 'ok', show: (p, v) => v === 0, at: () => [0.5, 0.25] },
              { kind: 'ok', show: (p, v) => v === 0, at: () => [0, 0.5] },
              { kind: 'ok', show: (p, v) => v === 0, at: () => [1, 0.5] },
              { kind: 'hole', show: (p, v) => v === 1, at: () => [0, 0] },
              { kind: 'hole', show: (p, v) => v === 1, at: () => [1, 1] },
              { kind: 'ok', show: (p, v) => v === 2, at: () => [1, 1] },
            ],
            ok: (p, v) => v === 0,
            read: (p, v) => VIEWS[v].text,
            need: 3,
            action: 'Compare all three cases',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: continuous on $[a, b]$ ⇒ bounded',
          body: 'Suppose, for a contradiction, that $f$ is not bounded. Then for each $n \\in \\mathbb{N}$ there is $x_n \\in [a, b]$ with $|f(x_n)| \\ge n$.\n\nThe sequence $(x_n)$ is bounded ($a \\le x_n \\le b$), so by **Bolzano–Weierstrass** it has a convergent subsequence $x_{n_i} \\to x$. Since $a \\le x_{n_i} \\le b$, also $a \\le x \\le b$.\n\n$f$ is continuous at $x$, so $f(x_{n_i}) \\to f(x)$; a convergent sequence is bounded. But $|f(x_{n_i})| \\ge n_i \\ge i$ is unbounded. Contradiction, so $f$ is bounded. $\\blacksquare$',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the steps of the boundedness proof in order.',
          items: [
            'Assume $f$ is not bounded on $[a, b]$.',
            'Pick $x_n \\in [a, b]$ with $|f(x_n)| \\ge n$.',
            'Bolzano–Weierstrass: a subsequence $x_{n_i} \\to x \\in [a, b]$.',
            'Continuity: $f(x_{n_i}) \\to f(x)$, so $(f(x_{n_i}))$ is bounded.',
            'But $|f(x_{n_i})| \\ge n_i$: contradiction.',
          ],
          explain: 'Closedness is used when we say the limit $x$ is still in $[a, b]$.',
        },
        {
          type: 'bridge',
          title: 'Bounded: proved.',
          recap: ['Continuous on $[a, b]$ ⇒ bounded.', 'The proof: unbounded ⇒ a sequence, a convergent subsequence, a contradiction.'],
          why: 'Bounded is not enough: we want the bounds **attained**.',
        },
      ],
    },
    {
      name: 'The extreme value theorem',
      terms: [
        ['Absolute maximum at $c$', '$f(c) \\ge f(x)$ for all $x$ in the domain; absolute minimum: $f(c) \\le f(x)$ for all $x$.'],
        ['Extreme value (min–max) theorem', 'A continuous $f : [a, b] \\to \\mathbb{R}$ attains both an absolute maximum and an absolute minimum on $[a, b]$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'The bounds are attained',
          body: '**Extreme value theorem.** If $f : [a, b] \\to \\mathbb{R}$ is continuous, there are $c, d \\in [a, b]$ with\n$$f(c) \\le f(x) \\le f(d) \\quad \\text{for all } x \\in [a, b].$$\n$f(c)$ is the **minimum** and $f(d)$ the **maximum** value.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove the extreme value theorem',
          body: 'By the boundedness theorem, $f([a, b])$ is bounded, so $m = \\inf f([a, b])$ and $M = \\sup f([a, b])$ exist (completeness). By the definition of inf and sup there are sequences $x_n, y_n \\in [a, b]$ with $f(x_n) \\to m$ and $f(y_n) \\to M$.\n\nBy **Bolzano–Weierstrass** there are convergent subsequences $x_{n_i} \\to c$ and $y_{n_i} \\to d$, with $c, d \\in [a, b]$. By continuity,\n$$f(c) = \\lim f(x_{n_i}) = m, \\qquad f(d) = \\lim f(y_{n_i}) = M.$$\nSo $f$ attains its minimum at $c$ and its maximum at $d$. $\\blacksquare$',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which hypotheses can be dropped without breaking the EVT?',
          options: [
            { text: 'None: closed, bounded and continuous are all needed', correct: true, why: '**All three matter**: $x$ on $(0,1)$ (not closed), $x$ on $[0, \\infty)$ (not bounded), and a function with a jump can all fail.' },
            { text: 'Closedness', why: '$f(x) = x$ on $(0, 1)$ never reaches $0$ or $1$.' },
            { text: 'Boundedness of the interval', why: '$f(x) = x$ on $[0, \\infty)$ has no maximum.' },
            { text: 'Continuity', why: '$f(x) = x$ on $[0, 1)$, $f(1) = 0$ on $[0, 1]$ has no maximum.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the maximum and minimum of $f(x) = \\sqrt{1 - x^2}$ on $[-1, 1]$.',
          options: [
            { text: 'Max $1$ at $x = 0$; min $0$ at $x = \\pm1$', correct: true, why: '$f$ is continuous on the closed interval, so both are attained; $1 - x^2$ is largest at $0$ and smallest at the ends.' },
            { text: 'Max $1$, no minimum', why: 'The ends $\\pm1$ belong to the interval, so $0$ is attained.' },
            { text: 'Max at $x = 1$', why: '$f(1) = 0$, the smallest value.' },
            { text: 'No max: $f$ is not differentiable at $\\pm1$', why: 'The EVT needs only continuity, not differentiability.' },
          ],
        },
        {
          type: 'finish',
          title: 'Extreme values: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
