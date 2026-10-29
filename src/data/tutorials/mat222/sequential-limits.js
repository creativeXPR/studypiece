// MAT 222 · Limits · Lesson 3: the sequential criterion and the limit theorems.

const s1 = (n) => 1 / (n * Math.PI);
const s2 = (n) => 1 / (2 * n * Math.PI + Math.PI / 2);

export default {
  id: 'sequential-limits',
  title: 'Limits through sequences',
  covers: 'The sequential criterion, proving a limit does not exist, the algebra of limits, the squeeze corollary, one-sided limits',
  minutes: 18,
  sections: [
    {
      name: 'The sequential criterion',
      terms: [
        ['Sequential criterion', '$f(x) \\to L$ as $x \\to c$ ⇔ for every sequence $(x_n)$ in $S \\setminus \\{c\\}$ with $x_n \\to c$, $f(x_n) \\to L$.'],
        ['Divergence test', 'If two sequences $x_n \\to c$, $y_n \\to c$ (never equal to $c$) give $f(x_n)$, $f(y_n)$ with different limits, then $\\lim_{x \\to c} f(x)$ does not exist.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Limits · Lesson 3',
          title: 'Trade ε-δ for sequences',
          body: '**Lemma.** Let $c$ be a cluster point of $S$ and $f : S \\to \\mathbb{R}$. Then\n$$\\lim_{x \\to c} f(x) = L \\iff f(x_n) \\to L \\text{ for every sequence } x_n \\in S \\setminus \\{c\\},\\ x_n \\to c.$$\n\nThis is the easiest way to show a limit **does not exist**: find two sequences heading to $c$ whose $f$-values disagree.',
          cta: 'Watch it happen',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: '$\\sin\\frac1x$ has no limit at $0$; $x \\sin\\frac1x$ does',
          body: 'Green dots: $x_n = \\frac{1}{n\\pi}$. Red dots: $y_n = \\frac{1}{2n\\pi + \\pi/2}$. Both sequences go to $0$. Raise $n$ and compare the heights.',
          graph: {
            x: [-0.02, 0.34], y: [-1.25, 1.25], xs: [[0], [0.1], [0.2], [0.3]], ys: [[-1], [0], [1]],
            views: ['sin(1/x)', 'x·sin(1/x)'],
            param: { label: 'how many terms $n$', min: 1, max: 12, step: 1, value: 3 },
            curves: [
              { f: (x, n, v) => (x <= 0 ? NaN : v === 0 ? Math.sin(1 / x) : x * Math.sin(1 / x)), from: 0.004, n: 1400 },
              { f: (x) => x, kind: 'guide', show: (n, v) => v === 1 },
              { f: (x) => -x, kind: 'guide', show: (n, v) => v === 1 },
            ],
            dots: Array.from({ length: 12 }, (_, i) => i + 1).flatMap((k) => [
              { kind: 'ok', show: (n) => k <= n, at: (n, v) => [s1(k), v === 0 ? Math.sin(1 / s1(k)) : s1(k) * Math.sin(1 / s1(k))] },
              { kind: 'dot', show: (n) => k <= n, at: (n, v) => [s2(k), v === 0 ? Math.sin(1 / s2(k)) : s2(k) * Math.sin(1 / s2(k))] },
            ]),
            read: (n, v) => (v === 0
              ? '$f(x_n) = \\sin(n\\pi) = 0 \\to 0$ but $f(y_n) = \\sin(2n\\pi + \\frac\\pi2) = 1 \\to 1$. Two different limits, so $\\lim_{x \\to 0} \\sin\\frac1x$ **does not exist**.'
              : 'Both sequences now give values $\\to 0$. Indeed $-|x| \\le x\\sin\\frac1x \\le |x|$ (dashed), so by the squeeze $\\lim_{x \\to 0} x\\sin\\frac1x = 0$.'),
            need: 4,
            action: 'Raise n, then switch view',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Using sequences, why does $f(x) = 1$ for $x \\in \\mathbb{Q}$, $0$ for $x \\notin \\mathbb{Q}$ have no limit at any $x_0$?',
          options: [
            { text: 'Rationals $r_n \\to x_0$ give $f(r_n) = 1$; irrationals $s_n \\to x_0$ give $f(s_n) = 0$', correct: true, why: 'Both kinds of point crowd every $x_0$, and the two sequences of values converge to different numbers.' },
            { text: 'Because $f$ is not defined at $x_0$', why: '$f$ is defined everywhere; the problem is the disagreement near $x_0$.' },
            { text: 'Because $f$ takes only two values', why: 'A function taking two values can have limits (e.g. a step function away from its jump).' },
            { text: 'Because $x_0$ is not a cluster point', why: 'Every real number is a cluster point of $\\mathbb{R}$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Sequences: in hand.',
          recap: ['Limit ⇔ every sequence $x_n \\to c$ gives $f(x_n) \\to L$.', 'Two sequences with different limits ⇒ no limit.'],
          why: 'Sequences also prove the limit theorems in one line each.',
        },
      ],
    },
    {
      name: 'The limit theorems',
      terms: [
        ['Algebra of limits', 'If $f \\to L$ and $g \\to M$ as $x \\to c$: $f \\pm g \\to L \\pm M$, $fg \\to LM$, and $f/g \\to L/M$ when $M \\ne 0$.'],
        ['Squeeze', 'If $f \\le g \\le h$ near $c$ and $\\lim f = \\lim h = L$, then $\\lim g = L$.'],
        ['One-sided limits', '$\\lim_{x \\to c} f(x) = L$ ⇔ $\\lim_{x \\to c^-} f(x) = L = \\lim_{x \\to c^+} f(x)$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Corollaries',
          title: 'What sequences give you for free',
          cards: [
            { title: 'Algebra', text: '$\\lim(f \\pm g) = \\lim f \\pm \\lim g$, $\\lim(fg) = \\lim f \\cdot \\lim g$, $\\lim \\frac fg = \\frac{\\lim f}{\\lim g}$ if $\\lim g \\ne 0$. Each follows from the same rule for sequences.' },
            { title: 'Order', text: 'If $f(x) \\le g(x)$ near $c$ and both limits exist, then $\\lim f \\le \\lim g$. Not necessarily $<$: $-x^2 \\le x^2$ yet both tend to $0$.' },
            { title: 'Squeeze', text: 'If $f \\le g \\le h$ near $c$ and $f, h \\to L$, then $g \\to L$.' },
            { title: 'One-sided', text: 'The limit exists and equals $L$ exactly when the left and right limits both exist and equal $L$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\lim_{x \\to 0} x^2 \\cos\\frac1x$.',
          options: [
            { text: '$0$, by the squeeze $-x^2 \\le x^2\\cos\\frac1x \\le x^2$', correct: true, why: '$|\\cos\\frac1x| \\le 1$, and both bounds tend to $0$.' },
            { text: 'It does not exist, because $\\cos\\frac1x$ has no limit', why: 'The algebra rule needs both limits to exist, but the squeeze does not.' },
            { text: '$1$', why: '$\\cos\\frac1x$ oscillates; multiplying by $x^2 \\to 0$ flattens it to $0$.' },
            { text: '$0 \\cdot \\lim \\cos\\frac1x$', why: 'You cannot split the product: $\\lim \\cos\\frac1x$ does not exist.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Prove $\\lim_{x \\to c} x^2 = c^2$ for any $c$',
          body: 'Let $\\varepsilon > 0$ and choose $\\delta = \\min\\left\\{1, \\frac{\\varepsilon}{2|c| + 1}\\right\\}$.\n\nIf $|x - c| < \\delta$ then $|x - c| < 1$, so $|x| < |c| + 1$ and $|x + c| \\le |x| + |c| < 2|c| + 1$. Hence\n$$|x^2 - c^2| = |x + c|\\,|x - c| < (2|c| + 1)\\,\\delta \\le \\varepsilon.$$\nThe first restriction ($\\delta \\le 1$) bounds the extra factor; the second finishes the job.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove the sequential criterion (⇒ direction)',
          body: 'Suppose $f(x) \\to L$ as $x \\to c$, and let $(x_n)$ be a sequence in $S \\setminus \\{c\\}$ with $x_n \\to c$. Let $\\varepsilon > 0$. There is $\\delta > 0$ such that $|f(x) - L| < \\varepsilon$ whenever $x \\in S \\setminus \\{c\\}$ and $|x - c| < \\delta$. Since $x_n \\to c$, there is $M$ with $|x_n - c| < \\delta$ for all $n \\ge M$. Then $|f(x_n) - L| < \\varepsilon$ for all $n \\ge M$, so $f(x_n) \\to L$.\n\n(⇐, by contrapositive: if $f \\not\\to L$, some $\\varepsilon$ fails for every $\\delta = \\frac1n$; pick $x_n$ with $|x_n - c| < \\frac1n$ and $|f(x_n) - L| \\ge \\varepsilon$. Then $x_n \\to c$ but $f(x_n) \\not\\to L$.) $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'Sequential limits: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
