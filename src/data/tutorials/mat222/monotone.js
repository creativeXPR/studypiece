// MAT 222 · Continuity · Lesson 3: monotone functions and their one-sided limits.

const f = (x) => (x < 1 ? x / 2 : x < 2 ? x / 2 + 0.75 : x / 2 + 1.25);
const left = (c) => (c <= 1 ? c / 2 : c <= 2 ? c / 2 + 0.75 : c / 2 + 1.25);
const right = (c) => (c < 1 ? c / 2 : c < 2 ? c / 2 + 0.75 : c / 2 + 1.25);

export default {
  id: 'monotone',
  title: 'Monotone functions and their one-sided limits',
  covers: 'Increasing, decreasing and strictly monotone functions, one-sided limits as sup and inf, the only discontinuities are jumps',
  minutes: 14,
  sections: [
    {
      name: 'Monotone functions',
      terms: [
        ['Increasing', '$x < y \\Rightarrow f(x) \\le f(y)$ (strictly increasing: $f(x) < f(y)$).'],
        ['Decreasing', '$x < y \\Rightarrow f(x) \\ge f(y)$ (strictly decreasing: $f(x) > f(y)$).'],
        ['Monotone', 'Either increasing or decreasing.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Continuity · Lesson 3',
          title: 'Functions that never turn back',
          body: '$f : S \\to \\mathbb{R}$ is ==increasing== if $x < y \\Rightarrow f(x) \\le f(y)$, and ==strictly increasing== if $x < y \\Rightarrow f(x) < f(y)$. Decreasing and strictly decreasing are defined by flipping the inequalities.\n\nA function that is increasing or decreasing is ==monotone==.\n\nMonotone functions are well behaved: their one-sided limits **always exist** and can be found from a sup or an inf.',
          cta: 'See why',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'One-sided limits as sup and inf',
          body: 'This increasing function has jumps at $1$ and $2$. Move $c$: the left limit is $\\sup\\{f(x) : x < c\\}$ (red) and the right limit is $\\inf\\{f(x) : x > c\\}$ (green).',
          graph: {
            x: [0, 3], y: [0, 3], xs: [[0], [1], [2], [3]], ys: [[0], [1], [2], [3]],
            param: { label: 'point $c$', min: 0.25, max: 2.75, step: 0.25, value: 0.75 },
            curves: [{ f, breaks: [1, 2] }],
            segs: [{ at: (c) => [c, 0, c, 3], kind: 'guide' }],
            dots: [
              { kind: 'dot', at: (c) => [c, left(c)] },
              { kind: 'ok', at: (c) => [c, right(c)] },
            ],
            ok: (c) => Math.abs(left(c) - right(c)) < 1e-9,
            read: (c) => (Math.abs(left(c) - right(c)) < 1e-9
              ? `At $c = ${c}$: left limit $= ${left(c).toFixed(3)} =$ right limit, so $f$ is continuous here.`
              : `At $c = ${c}$: left limit $${left(c).toFixed(3)}$, right limit $${right(c).toFixed(3)}$: a **jump** of $${(right(c) - left(c)).toFixed(2)}$.`),
            need: 5,
            action: 'Move c, including onto c = 1 and c = 2',
          },
        },
        {
          type: 'story',
          eyebrow: 'Proposition',
          title: 'Monotone one-sided limits',
          body: 'Let $f$ be **increasing** on $S$ and $g$ **decreasing**. If $c$ is a cluster point of $S \\cap (-\\infty, c)$:\n$$\\lim_{x \\to c^-} f(x) = \\sup\\{f(x) : x < c\\}, \\qquad \\lim_{x \\to c^-} g(x) = \\inf\\{g(x) : x < c\\}.$$\nIf $c$ is a cluster point of $S \\cap (c, \\infty)$:\n$$\\lim_{x \\to c^+} f(x) = \\inf\\{f(x) : x > c\\}, \\qquad \\lim_{x \\to c^+} g(x) = \\sup\\{g(x) : x > c\\}.$$\nSimilarly $\\lim_{x \\to \\infty} f(x) = \\sup\\{f(x) : x \\in S\\}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Consequence',
          prompt: 'What kind of discontinuity can a monotone function have?',
          options: [
            { text: 'Only jumps', correct: true, why: 'Both one-sided limits always exist (they are a sup and an inf), so the only way to fail is for them to differ: a jump. No oscillation, no blow-up inside the interval.' },
            { text: 'Any kind', why: 'Oscillation and blow-up both break monotonicity.' },
            { text: 'Only removable ones', why: 'A removable discontinuity would need $f(c)$ out of line with both sides, which breaks monotonicity.' },
            { text: 'None: monotone functions are continuous', why: '$\\lfloor x \\rfloor$ is increasing yet jumps at every integer.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: if $f$ is increasing, $\\lim_{x \\to c^-} f(x) = \\sup\\{f(x) : x < c,\\ x \\in S\\}$',
          body: 'Let $L = \\sup\\{f(x) : x \\in S, x < c\\}$ (finite, since $f(x) \\le f(c)$ bounds the set when $c \\in S$; in general assume the set is bounded above). Let $\\varepsilon > 0$. Since $L - \\varepsilon$ is not an upper bound, there is $x_0 \\in S$, $x_0 < c$, with $f(x_0) > L - \\varepsilon$. Let $\\delta = c - x_0$. If $x \\in S$ and $c - \\delta < x < c$, then $x > x_0$, so by monotonicity\n$$L - \\varepsilon < f(x_0) \\le f(x) \\le L.$$\nHence $|f(x) - L| < \\varepsilon$, so $\\lim_{x \\to c^-} f(x) = L$. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'Continuity: complete.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
