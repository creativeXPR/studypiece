// MAT 222 · Properties and the Fundamental Theorem · Lesson 2: tagged Riemann sums and their convergence.

const f = (x) => x * x;
const N = 6;

function tagged(t) {
  const out = [];
  for (let k = 0; k < N; k++) {
    const x = (k + t) / N;
    out.push([k / N, f(x), 1 / N, f(x)]);
  }
  return out;
}
const S = (t) => tagged(t).reduce((s, [, h, w]) => s + h * w, 0);
const L = (() => { let s = 0; for (let k = 0; k < N; k++) s += f(k / N) / N; return s; })();
const U = (() => { let s = 0; for (let k = 1; k <= N; k++) s += f(k / N) / N; return s; })();

export default {
  id: 'riemann-sums',
  title: 'Riemann sums and why they converge',
  covers: 'Tags and Riemann sums S(f, π, ξ), L ≤ S ≤ U, |S − ∫f| ≤ U − L, convergence of tagged sums as ‖π‖ → 0, limits of sums as integrals',
  minutes: 16,
  sections: [
    {
      name: 'Tagged sums',
      terms: [
        ['Tag', 'A choice of points $\\xi = (\\xi_1, \\dots, \\xi_n)$ with $\\xi_k \\in [x_{k-1}, x_k]$, one in each subinterval of $\\pi$.'],
        ['Riemann sum', '$S(f, \\pi, \\xi) = \\sum_{k=1}^n f(\\xi_k)\\Delta x_k$.'],
        ['Sandwich', '$L(f, \\pi) \\le S(f, \\pi, \\xi) \\le U(f, \\pi)$ for every tag $\\xi$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Properties and the Fundamental Theorem · Lesson 2',
          title: 'Forget sup and inf: just pick a point',
          body: 'Upper and lower sums need the sup and inf on every piece, which can be hard to find. A ==Riemann sum== is simpler: in each piece pick **any** point $\\xi_k$ (a ==tag==) and use the height $f(\\xi_k)$:\n$$S(f, \\pi, \\xi) = \\sum_{k=1}^n f(\\xi_k)\\,\\Delta x_k.$$\nSince $m_k \\le f(\\xi_k) \\le M_k$,\n$$L(f, \\pi) \\le S(f, \\pi, \\xi) \\le U(f, \\pi).$$',
          cta: 'Move the tags',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Every tag choice lands between $L$ and $U$',
          body: '$f(x) = x^2$ on $[0, 1]$ with six equal pieces. The slider places every tag at the same relative position in its piece: $0$ is the left end, $1$ the right end.',
          graph: {
            x: [-0.03, 1.03], y: [0, 1.05], xs: [[0], [0.5, '½'], [1]], ys: [[0], [1]],
            param: { label: 'tag position $t$ in each piece', min: 0, max: 1, step: 0.1, value: 0.5 },
            rects: [{ kind: 'tag', at: (t) => tagged(t) }],
            curves: [{ f, from: 0, to: 1 }],
            dots: Array.from({ length: N }, (_, k) => ({ kind: 'ok', at: (t) => [(k + t) / N, f((k + t) / N)] })),
            read: (t) => `$L = ${L.toFixed(4)} \\le S = ${S(t).toFixed(4)} \\le U = ${U.toFixed(4)}$. The true value $\\frac13 \\approx 0.3333$ is in the same window.`,
            need: 4,
            action: 'Try left ends, right ends and midpoints',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: for integrable $f$, $\\left|S(f, \\pi, \\xi) - \\int_a^b f\\right| \\le U(f, \\pi) - L(f, \\pi)$',
          body: 'Both $S(f, \\pi, \\xi)$ and $\\int_a^b f$ lie in the interval $[L(f, \\pi), U(f, \\pi)]$:\n$$L(f, \\pi) \\le S(f, \\pi, \\xi) \\le U(f, \\pi), \\qquad L(f, \\pi) \\le \\int_a^b f \\le U(f, \\pi).$$\nTwo numbers in an interval differ by at most its length, so\n$$\\left|S(f, \\pi, \\xi) - \\int_a^b f\\right| \\le U(f, \\pi) - L(f, \\pi). \\ \\blacksquare$$',
        },
        {
          type: 'bridge',
          title: 'Tags: set.',
          recap: ['A Riemann sum uses any point in each piece.', '$L \\le S \\le U$, so $S$ is within $U - L$ of the integral.'],
          why: 'So as the pieces shrink, every Riemann sum closes in on the integral.',
        },
      ],
    },
    {
      name: 'Convergence of Riemann sums',
      terms: [
        ['Convergence theorem', 'If $f \\in \\mathcal{R}[a, b]$: for every $\\varepsilon > 0$ there is $\\delta > 0$ such that $\\left|S(f, \\pi, \\xi) - \\int_a^b f\\right| < \\varepsilon$ for every partition with $\\|\\pi\\| < \\delta$ and every tag $\\xi$. That is, $\\lim_{\\|\\pi\\| \\to 0} S(f, \\pi, \\xi) = \\int_a^b f$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'Fine partitions, any tags, same limit',
          body: '**Theorem (convergence of tagged Riemann sums).** Let $f$ be Riemann integrable on $[a, b]$. Then for any $\\varepsilon > 0$ there is $\\delta > 0$ such that for **every** partition with $\\|\\pi\\| < \\delta$ and **every** choice of tags,\n$$\\left|S(f, \\pi, \\xi) - \\int_a^b f(x)\\,dx\\right| < \\varepsilon.$$\nEquivalently $\\lim_{\\|\\pi\\| \\to 0} S(f, \\pi, \\xi) = \\int_a^b f$, uniformly in the tags.\n\n**Proof.** By Darboux’s criterion there is δ with $U(f, \\pi) - L(f, \\pi) < \\varepsilon$ whenever $\\|\\pi\\| < \\delta$; combine with the previous inequality. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Using right-end tags on the uniform partition, $\\lim_{n \\to \\infty} \\frac{b - a}{n}\\sum_{k=1}^{n} f\\!\\left(a + \\frac{k(b - a)}{n}\\right) = $',
          options: [
            { text: '$\\int_a^b f(x)\\,dx$, for any integrable $f$', correct: true, why: 'It is $S(f, \\pi_n, \\xi)$ with $\\xi_k = x_k$, and $\\|\\pi_n\\| = \\frac{b - a}{n} \\to 0$.' },
            { text: '$f(b) - f(a)$', why: 'That would be an integral of $f\'$, not of $f$.' },
            { text: '$U(f, \\pi_n)$', why: 'Only for increasing $f$ do right ends give the upper sum.' },
            { text: 'It need not exist', why: 'For integrable $f$ it always converges to $\\int_a^b f$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Use it backwards',
          prompt: 'Evaluate $\\lim_{n \\to \\infty} \\frac1n \\sum_{k=1}^{n} \\left(\\frac kn\\right)^2$.',
          options: [
            { text: '$\\frac13$', correct: true, why: 'It is a Riemann sum for $\\int_0^1 x^2\\,dx$ with right-end tags.' },
            { text: '$1$', why: 'The terms average $x^2$ over $[0, 1]$, not $1$.' },
            { text: '$\\frac12$', why: 'That would be $\\int_0^1 x\\,dx$.' },
            { text: '$\\infty$', why: 'The factor $\\frac1n$ keeps it bounded.' },
          ],
        },
        {
          type: 'finish',
          title: 'Riemann sums: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
