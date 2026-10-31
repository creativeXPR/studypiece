// MAT 222 · The Riemann integral · Lesson 4: which functions are integrable.

const FN = [
  (x) => 0.6 + 0.8 * x * x,
  (x) => (x < 0.5 ? 0.5 : 1.2),
  null,
];

function sums(n, v) {
  const lo = [];
  const hi = [];
  for (let k = 1; k <= n; k++) {
    const a = (k - 1) / n;
    const b = k / n;
    let m;
    let M;
    if (v === 2) {
      m = 0;
      M = 1;
    } else {
      const ys = Array.from({ length: 41 }, (_, i) => FN[v](a + ((b - a) * i) / 40));
      if (v === 1 && a < 0.5 && b > 0.5) ys.push(0.5, 1.2);
      m = Math.min(...ys);
      M = Math.max(...ys);
    }
    lo.push([a, m, b - a, m]);
    hi.push([a, M, b - a, M]);
  }
  return { lo, hi };
}
const area = (r) => r.reduce((s, [, h, w]) => s + h * w, 0);

export default {
  id: 'integrable-classes',
  title: 'Which functions are integrable',
  covers: 'Class A: monotone functions; Class B: continuous functions; Class C: finitely many discontinuities; step functions, ⌊x⌋, and the Dirichlet function',
  minutes: 18,
  sections: [
    {
      name: 'Three classes of integrable functions',
      terms: [
        ['Class A', 'Every monotone $f : [a, b] \\to \\mathbb{R}$ is Riemann integrable.'],
        ['Class B', 'Every continuous $f : [a, b] \\to \\mathbb{R}$ is Riemann integrable.'],
        ['Class C', 'Every bounded $f : [a, b] \\to \\mathbb{R}$ with only finitely many discontinuities is Riemann integrable.'],
      ],
      screens: [
        {
          type: 'story',
          asides: [
            { label: 'Note', text: 'Continuous ⇒ integrable ⇒ bounded, and neither converse holds. Continuity is sufficient for integrability, not necessary.' },
          ],
          eyebrow: 'The Riemann integral · Lesson 4',
          title: 'Three big families, no computation needed',
          body: 'Checking integrability from scratch is slow. Three theorems settle it for most functions you’ll meet:\n\n**A. Monotone** functions on $[a, b]$ are integrable.\n**B. Continuous** functions on $[a, b]$ are integrable.\n**C. Bounded** functions with **finitely many** discontinuities are integrable.\n\nThe classes overlap: $x^2$ on $[0, 1]$ is in all three.',
          cta: 'See the pattern',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'When does $U - L$ shrink?',
          body: 'Compare a continuous function, a step function with one jump, and the Dirichlet function ($1$ on rationals, $0$ on irrationals). Raise $n$ in each.',
          graph: {
            x: [-0.05, 1.05], y: [0, 1.5], xs: [[0], [0.5, '½'], [1]], ys: [[0], [1]],
            views: ['Continuous', 'One jump', 'Dirichlet'],
            param: { label: 'pieces $n$', min: 1, max: 30, step: 1, value: 3 },
            rects: [
              { kind: 'up', at: (n, v) => sums(n, v).hi },
              { kind: 'low', at: (n, v) => sums(n, v).lo },
            ],
            curves: [
              { f: (x, n, v) => FN[v](x), show: (n, v) => v === 0, from: 0, to: 1 },
              { f: (x, n, v) => FN[v](x), show: (n, v) => v === 1, from: 0, to: 1, breaks: [0.5] },
              { f: () => 1, kind: 'guide', show: (n, v) => v === 2, from: 0, to: 1 },
              { f: () => 0, kind: 'guide', show: (n, v) => v === 2, from: 0, to: 1 },
            ],
            ok: (n, v) => v !== 2,
            read: (n, v) => {
              const { lo, hi } = sums(n, v);
              const gap = area(hi) - area(lo);
              return [
                `Continuous: $U - L = ${gap.toFixed(4)} \\to 0$. **Integrable.**`,
                `One jump: only the piece containing the jump has a big gap, of width $\\frac1n$: $U - L = ${gap.toFixed(4)} \\to 0$. **Integrable.**`,
                'Dirichlet: every piece contains rationals ($M_k = 1$) and irrationals ($m_k = 0$), so $U = 1$, $L = 0$ for **every** partition. $U - L = 1 \\not\\to 0$: **not integrable**.',
              ][v];
            },
            need: 6,
            action: 'Raise n in all three views',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: every monotone $f$ on $[a, b]$ is integrable (Class A)',
          body: 'Let $f$ be increasing (the decreasing case is similar). $f$ is bounded: $f(a) \\le f(x) \\le f(b)$. If $f(a) = f(b)$, $f$ is constant. Otherwise let $\\varepsilon > 0$ and take a partition $\\pi$ with every $\\Delta x_k < \\delta = \\frac{\\varepsilon}{f(b) - f(a)}$.\n\nOn each piece, $m_k = f(x_{k-1})$ and $M_k = f(x_k)$, so\n$$U(f, \\pi) - L(f, \\pi) = \\sum [f(x_k) - f(x_{k-1})]\\Delta x_k < \\delta \\sum [f(x_k) - f(x_{k-1})] = \\delta[f(b) - f(a)] = \\varepsilon.$$\nBy Riemann’s criterion, $f$ is integrable. $\\blacksquare$',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: every continuous $f$ on $[a, b]$ is integrable (Class B)',
          body: '$f$ is continuous on the closed interval, so it is bounded and **uniformly continuous**. Let $\\varepsilon > 0$. There is $\\delta > 0$ with $|f(x) - f(y)| < \\frac{\\varepsilon}{b - a}$ whenever $|x - y| < \\delta$.\n\nTake any partition with $\\|\\pi\\| < \\delta$. On each piece, $M_k$ and $m_k$ are attained (EVT) at points less than $\\delta$ apart, so $M_k - m_k < \\frac{\\varepsilon}{b - a}$. Hence\n$$U(f, \\pi) - L(f, \\pi) = \\sum (M_k - m_k)\\Delta x_k < \\frac{\\varepsilon}{b - a}\\sum \\Delta x_k = \\varepsilon.$$\nBy Riemann’s criterion, $f$ is integrable. $\\blacksquare$',
        },
        {
          type: 'bridge',
          title: 'The classes: set.',
          recap: ['Monotone: telescoping.', 'Continuous: uniform continuity.', 'Finitely many jumps: isolate them in tiny pieces.'],
          why: 'Test yourself on some famous examples.',
        },
      ],
    },
    {
      name: 'Examples and non-examples',
      terms: [
        ['Step function', '$g : [a, b] \\to \\mathbb{R}$ with a partition $\\{x_0, \\dots, x_n\\}$ and constants $\\alpha_i$ such that $g(x) = \\alpha_i$ on each $(x_{i-1}, x_i)$. Always integrable.'],
        ['Dirichlet function', '$D(x) = 1$ for $x \\in \\mathbb{Q}$, $0$ otherwise. Bounded, discontinuous everywhere, not integrable.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Integrable on the interval, or not?',
          buckets: [
            { id: 'y', label: 'Integrable' },
            { id: 'n', label: 'Not integrable' },
          ],
          items: [
            { text: '$\\lfloor x \\rfloor$ on $[-1, 3]$', bucket: 'y', why: '**Integrable**: increasing (Class A), with finitely many jumps (Class C).' },
            { text: 'Any step function on $[a, b]$', bucket: 'y', why: '**Integrable**: finitely many discontinuities.' },
            { text: '$D(x)$ (Dirichlet) on $[0, 1]$', bucket: 'n', why: '**Not integrable**: $U = 1$, $L = 0$ for every partition.' },
            { text: '$\\frac{\\sin x}{x}$, with $f(0) = 0$, on $[-1, 1]$', bucket: 'y', why: '**Integrable**: bounded with one discontinuity.' },
            { text: '$\\frac1x$, with $f(0) = 0$, on $[0, 1]$', bucket: 'n', why: '**Not integrable**: unbounded, and Riemann integrability needs a bounded function.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Evaluate $\\int_{-1}^{3} \\lfloor x \\rfloor\\,dx$.',
          options: [
            { text: '$2$', correct: true, why: 'On $[-1, 0)$, $[0, 1)$, $[1, 2)$, $[2, 3)$ the values are $-1, 0, 1, 2$, each over length $1$: $-1 + 0 + 1 + 2 = 2$.' },
            { text: '$3$', why: 'Don’t forget the piece $[-1, 0)$ where $\\lfloor x \\rfloor = -1$.' },
            { text: '$4$', why: 'That is the length of the interval.' },
            { text: '$6$', why: 'The value at $x = 3$ itself contributes nothing (a single point has width $0$).' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Compare',
          prompt: 'And $\\int_{-1}^{3} \\lfloor 2x \\rfloor\\,dx$?',
          options: [
            { text: '$6$', correct: true, why: 'On each piece $[\\frac k2, \\frac{k+1}2)$ the value is $k$, for $k = -2, \\dots, 5$. Sum of values $= 12$, each over width $\\frac12$: $\\int = 6$.' },
            { text: '$4$', why: 'That is $2\\int \\lfloor x \\rfloor$, but $\\lfloor 2x \\rfloor \\ne 2\\lfloor x \\rfloor$: at $x = \\frac12$, $\\lfloor 1 \\rfloor = 1$ while $2\\lfloor \\frac12 \\rfloor = 0$.' },
            { text: '$12$', why: 'You added the values but forgot each piece has width $\\frac12$.' },
            { text: '$2$', why: 'That is $\\int \\lfloor x \\rfloor$; the steps of $\\lfloor 2x \\rfloor$ are twice as frequent.' },
          ],
        },
        {
          type: 'finish',
          title: 'The Riemann integral: complete.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
