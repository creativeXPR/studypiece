// MAT 222 · Properties and the Fundamental Theorem · Lesson 1: properties of the integral.

const f = (x) => 0.4 + 0.5 * x * x;
const F = (x) => 0.4 * x + (0.5 * x ** 3) / 3;

function strips(a, b, n = 40) {
  const out = [];
  for (let k = 0; k < n; k++) {
    const x0 = a + ((b - a) * k) / n;
    const x1 = a + ((b - a) * (k + 1)) / n;
    const h = f((x0 + x1) / 2);
    out.push([x0, h, x1 - x0, h]);
  }
  return out;
}

export default {
  id: 'integral-properties',
  title: 'Properties of the integral',
  covers: 'Additivity over subintervals, ∫ₐᵃ = 0 and reversed limits, linearity, order, |∫f| ≤ ∫|f|, products and 1/f',
  minutes: 18,
  sections: [
    {
      name: 'Additivity',
      terms: [
        ['Additivity over subintervals', 'For bounded $f$ and $c \\in (a, b)$: $f \\in \\mathcal{R}[a, b]$ ⇔ $f \\in \\mathcal{R}[a, c]$ and $f \\in \\mathcal{R}[c, b]$, and then $\\int_a^b f = \\int_a^c f + \\int_c^b f$.'],
        ['Conventions', '$\\int_a^a f = 0$ and $\\int_b^a f = -\\int_a^b f$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Properties and the Fundamental Theorem · Lesson 1',
          title: 'Areas add up',
          body: 'Split $[a, b]$ at a point $c$: the area over $[a, b]$ should be the area over $[a, c]$ plus the area over $[c, b]$.\n\n**Theorem.** Let $f$ be bounded on $[a, b]$ and $c \\in (a, b)$. Then $f$ is integrable on $[a, b]$ **if and only if** it is integrable on both $[a, c]$ and $[c, b]$, and then\n$$\\int_a^b f = \\int_a^c f + \\int_c^b f.$$',
          cta: 'See it',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Move the cut point',
          body: '$f(x) = 0.4 + \\frac{x^2}{2}$ on $[0, 2]$. Green is $\\int_0^c f$, blue is $\\int_c^2 f$. Wherever you cut, the two add to the same total.',
          graph: {
            x: [-0.05, 2.05], y: [0, 2.6], xs: [[0, 'a'], [1], [2, 'b']], ys: [[0], [1], [2]],
            param: { label: 'cut point $c$', min: 0.2, max: 1.8, step: 0.1, value: 0.8 },
            rects: [
              { kind: 'low', at: (c) => strips(0, c) },
              { kind: 'tag', at: (c) => strips(c, 2) },
            ],
            curves: [{ f, from: 0, to: 2 }],
            segs: [{ at: (c) => [c, 0, c, 2.6], kind: 'guide' }],
            read: (c) => `$\\int_0^{${c}} f + \\int_{${c}}^2 f = ${F(c).toFixed(3)} + ${(F(2) - F(c)).toFixed(3)} = ${F(2).toFixed(3)} = \\int_0^2 f$.`,
            need: 4,
            action: 'Move the cut point',
          },
        },
        {
          type: 'story',
          asides: [
            { label: 'Note', text: 'Reading $a \\Leftrightarrow b$: $b$ is sufficient for $a$ (the $\\Leftarrow$ direction), and $b$ is necessary for $a$ (the $\\Rightarrow$ direction).' },
          ],
          eyebrow: 'Exam answer',
          title: 'Prove additivity (⇐ direction)',
          body: 'Let $f$ be integrable on $[a, c]$ and $[c, b]$, and $\\varepsilon > 0$. By Riemann’s criterion choose partitions $\\pi_1$ of $[a, c]$ and $\\pi_2$ of $[c, b]$ with\n$$U(f, \\pi_1) - L(f, \\pi_1) < \\tfrac\\varepsilon2, \\qquad U(f, \\pi_2) - L(f, \\pi_2) < \\tfrac\\varepsilon2.$$\nThen $\\pi = \\pi_1 \\cup \\pi_2$ is a partition of $[a, b]$, and sums over $\\pi$ split: $U(f, \\pi) = U(f, \\pi_1) + U(f, \\pi_2)$, likewise for $L$. So\n$$U(f, \\pi) - L(f, \\pi) < \\tfrac\\varepsilon2 + \\tfrac\\varepsilon2 = \\varepsilon,$$\nand $f$ is integrable on $[a, b]$. Also $L(f, \\pi_1) + L(f, \\pi_2) \\le \\int_a^c f + \\int_c^b f \\le U(f, \\pi_1) + U(f, \\pi_2)$, and $\\int_a^b f$ lies in the same interval of length $< \\varepsilon$, giving the equality. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Conventions',
          prompt: 'Why define $\\int_b^a f = -\\int_a^b f$?',
          options: [
            { text: 'So that $\\int_a^b = \\int_a^c + \\int_c^b$ holds for any order of $a$, $b$, $c$', correct: true, why: 'With $c = a$ it also forces $\\int_a^a f = 0$.' },
            { text: 'Because areas are negative', why: 'It is a convention about direction, not about area.' },
            { text: 'Because $f$ might be negative', why: 'The sign of $f$ is a separate matter.' },
            { text: 'It is a theorem, not a definition', why: 'For $b < a$ the integral is defined this way.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Additivity: set.',
          recap: ['Integrable on $[a, b]$ ⇔ integrable on both pieces.', '$\\int_a^b = \\int_a^c + \\int_c^b$.'],
          why: 'Now linearity, order and absolute values.',
        },
      ],
    },
    {
      name: 'Linearity, order and absolute value',
      terms: [
        ['Linearity', 'If $f, g \\in \\mathcal{R}[a, b]$ and $k \\in \\mathbb{R}$: $f + g$ and $kf$ are integrable, $\\int (f + g) = \\int f + \\int g$ and $\\int kf = k\\int f$.'],
        ['Order', 'If $f(x) \\le g(x)$ on $[a, b]$, then $\\int_a^b f \\le \\int_a^b g$.'],
        ['Absolute value', 'If $f \\in \\mathcal{R}[a, b]$ then $|f| \\in \\mathcal{R}[a, b]$ and $\\left|\\int_a^b f\\right| \\le \\int_a^b |f|$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove $f + g$ is integrable and $\\int (f + g) = \\int f + \\int g$',
          body: 'On each piece, $\\inf f + \\inf g \\le \\inf (f + g)$ and $\\sup (f + g) \\le \\sup f + \\sup g$, so for any $\\pi$:\n$$L(f, \\pi) + L(g, \\pi) \\le L(f + g, \\pi) \\le U(f + g, \\pi) \\le U(f, \\pi) + U(g, \\pi).$$\nGiven $\\varepsilon > 0$, choose $\\pi$ (a common refinement) with $U - L < \\frac\\varepsilon2$ for both $f$ and $g$. Then $U(f + g, \\pi) - L(f + g, \\pi) < \\varepsilon$, so $f + g$ is integrable. With a sequence $\\pi_n$ for which all gaps $\\to 0$, the squeeze gives\n$$\\int (f + g) = \\lim U(f + g, \\pi_n) = \\int f + \\int g. \\ \\blacksquare$$',
        },
        {
          type: 'reveal',
          eyebrow: 'The rest of the toolkit',
          title: 'Properties you can quote',
          cards: [
            { title: 'Scalars', text: '$\\int kf = k\\int f$. For $k < 0$, $U(kf, \\pi) = kL(f, \\pi)$ and $L(kf, \\pi) = kU(f, \\pi)$.' },
            { title: 'Order', text: 'If $f \\le g$, then $g - f \\ge 0$ has $L(g - f, \\pi) \\ge 0$, so $\\int g - \\int f = \\int (g - f) \\ge 0$.' },
            { title: 'Absolute value', text: 'On each piece $\\sup|f| - \\inf|f| \\le \\sup f - \\inf f$, so $|f|$ is integrable; and $-|f| \\le f \\le |f|$ gives $\\left|\\int f\\right| \\le \\int |f|$.' },
            { title: 'Products and reciprocals', text: 'If $f, g$ are integrable so is $fg$; and if $|f(x)| \\ge \\delta > 0$ on $[a, b]$, then $\\frac1f$ is integrable. Also $\\max\\{f, g\\}$, $\\min\\{f, g\\}$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true for integrable $f$ on $[a, b]$?',
          options: [
            { text: '$\\left|\\int_a^b f\\right| \\le \\int_a^b |f|$', correct: true, why: '**Yes**: from $-|f| \\le f \\le |f|$ and the order property.' },
            { text: 'If $|f|$ is integrable, so is $f$', why: '**No**: $f = 1$ on rationals, $-1$ on irrationals has $|f| = 1$ integrable but $f$ is not.' },
            { text: 'If $f \\ge 0$ then $\\int_a^b f \\ge 0$', correct: true, why: '**Yes**: every lower sum is $\\ge 0$.' },
            { text: '$\\int fg = \\int f \\cdot \\int g$', why: '**No**: $\\int_0^1 x \\cdot x = \\frac13$ but $\\frac12 \\cdot \\frac12 = \\frac14$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Properties: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
