// MAT 222 · The Riemann integral · Lesson 1: partitions, refinements, lower and upper sums.

const f = (x) => 1 + Math.sin(2 * x) * 0.6 + x * 0.3;

// Lower/upper rectangles for f on [0, 3] with the given break points.
function bars(points, kind) {
  const out = [];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    let lo = Infinity;
    let hi = -Infinity;
    for (let k = 0; k <= 60; k++) {
      const y = f(a + ((b - a) * k) / 60);
      lo = Math.min(lo, y);
      hi = Math.max(hi, y);
    }
    const h = kind === 'low' ? lo : hi;
    out.push([a, h, b - a, h]);
  }
  return out;
}
const total = (r) => r.reduce((s, [, h, w]) => s + h * w, 0);
const partition = (n) => Array.from({ length: n + 1 }, (_, k) => (3 * k) / n);

export default {
  id: 'partitions-sums',
  title: 'Partitions, upper and lower sums',
  covers: 'Partitions and their gauge, refinements, m_k and M_k, L(f, π) ≤ U(f, π), refining raises L and lowers U, L(f, π₁) ≤ U(f, π₂)',
  minutes: 18,
  sections: [
    {
      name: 'Partitions and the two sums',
      terms: [
        ['Partition $\\pi$ of $[a, b]$', 'A finite set $\\{x_0, x_1, \\dots, x_n\\}$ with $a = x_0 < x_1 < \\cdots < x_n = b$. Its subintervals $[x_{k-1}, x_k]$ cover $[a, b]$ and overlap only at end points.'],
        ['Gauge (norm, mesh) $\\|\\pi\\|$', '$\\max_k (x_k - x_{k-1})$, the length of the longest subinterval.'],
        ['$m_k$, $M_k$', '$m_k = \\inf\\{f(x) : x \\in [x_{k-1}, x_k]\\}$, $M_k = \\sup\\{f(x) : x \\in [x_{k-1}, x_k]\\}$.'],
        ['Lower and upper sums', '$L(f, \\pi) = \\sum_{k=1}^{n} m_k \\Delta x_k$, $U(f, \\pi) = \\sum_{k=1}^{n} M_k \\Delta x_k$, where $\\Delta x_k = x_k - x_{k-1}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The Riemann integral · Lesson 1',
          title: 'Four questions about $\\int_a^b f(x)\\,dx$',
          body: '**1.** What does $\\int_a^b f(x)\\,dx$ mean? **2.** When does it exist? **3.** How do we compute it? **4.** What are its properties?\n\nThe idea: squeeze the area under $f$ between rectangles that sit **below** the graph and rectangles that rise **above** it. If the two can be made as close as we like, the area is pinned down. All we need is that $f$ is **bounded** on $[a, b]$.',
          cta: 'Build the rectangles',
        },
        {
          type: 'story',
          eyebrow: 'Definitions',
          title: 'Chop, then take the lowest and highest values',
          body: 'A ==partition== $\\pi = \\{x_0, \\dots, x_n\\}$ of $[a, b]$ has $a = x_0 < x_1 < \\cdots < x_n = b$, with lengths $\\Delta x_k = x_k - x_{k-1}$ and ==gauge== $\\|\\pi\\| = \\max_k \\Delta x_k$.\n\nOn each piece, $m_k = \\inf f$ and $M_k = \\sup f$. Then\n$$L(f, \\pi) = \\sum_{k=1}^n m_k \\Delta x_k, \\qquad U(f, \\pi) = \\sum_{k=1}^n M_k \\Delta x_k.$$\n$L$ is the area of rectangles below the graph, $U$ of rectangles above it.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Refining squeezes the gap',
          body: 'Green: lower rectangles. Yellow: upper rectangles. Increase the number of pieces $n$ and watch $L$ rise, $U$ fall and the gap $U - L$ shrink.',
          graph: {
            x: [-0.05, 3.05], y: [0, 2.6], xs: [[0, 'a'], [1], [2], [3, 'b']], ys: [[0], [1], [2]],
            param: { label: 'pieces $n$', min: 1, max: 24, step: 1, value: 2 },
            rects: [
              { kind: 'up', at: (n) => bars(partition(n), 'up') },
              { kind: 'low', at: (n) => bars(partition(n), 'low') },
            ],
            curves: [{ f, from: 0, to: 3 }],
            read: (n) => {
              const L = total(bars(partition(n), 'low'));
              const U = total(bars(partition(n), 'up'));
              return `$n = ${n}$: $L = ${L.toFixed(3)}$, $U = ${U.toFixed(3)}$, $U - L = ${(U - L).toFixed(3)}$.`;
            },
            need: 5,
            action: 'Raise n step by step',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove $L(f, \\pi) \\le U(f, \\pi)$, and bound both',
          body: 'On each subinterval, by definition of inf and sup, $m_k \\le M_k$. Multiply by $\\Delta x_k > 0$ and add:\n$$L(f, \\pi) = \\sum m_k \\Delta x_k \\le \\sum M_k \\Delta x_k = U(f, \\pi).$$\nIf $m \\le f(x) \\le M$ on $[a, b]$, then $m \\le m_k$ and $M_k \\le M$, and $\\sum \\Delta x_k = b - a$, so\n$$m(b - a) \\le L(f, \\pi) \\le U(f, \\pi) \\le M(b - a).$$',
        },
        {
          type: 'bridge',
          title: 'The sums: defined.',
          recap: ['$L$ uses infima, $U$ uses suprema.', '$m(b - a) \\le L \\le U \\le M(b - a)$.'],
          why: 'What happens when we add points to a partition?',
        },
      ],
    },
    {
      name: 'Refinements',
      terms: [
        ['Refinement', '$\\pi^*$ is a refinement of $\\pi$ if $\\pi \\subseteq \\pi^*$ (it has all of $\\pi$’s points, and possibly more).'],
        ['Refinement lemma', 'If $\\pi^*$ refines $\\pi$: $L(f, \\pi) \\le L(f, \\pi^*) \\le U(f, \\pi^*) \\le U(f, \\pi)$.'],
        ['Any two partitions', '$L(f, \\pi_1) \\le U(f, \\pi_2)$ for all partitions $\\pi_1, \\pi_2$.'],
      ],
      screens: [
        {
          type: 'story',
          asides: [
            { label: 'Note', text: 'Adding even one point gives a refinement, and every partition is a refinement of itself.' },
          ],
          eyebrow: 'Exam answer',
          title: 'Refining raises $L$ and lowers $U$',
          body: 'It suffices to add one point $y$ inside a subinterval $[x_{k-1}, x_k]$, splitting it into $[x_{k-1}, y]$ and $[y, x_k]$ with infima $m\'_k$, $m\'\'_k$.\n\nEach piece is a subset of $[x_{k-1}, x_k]$, and an inf over a **smaller** set is **larger**: $m_k \\le m\'_k$ and $m_k \\le m\'\'_k$. Hence\n$$m_k(x_k - x_{k-1}) = m_k(y - x_{k-1}) + m_k(x_k - y) \\le m\'_k(y - x_{k-1}) + m\'\'_k(x_k - y).$$\nAll other terms are unchanged, so $L(f, \\pi) \\le L(f, \\pi^*)$. The same argument with sups gives $U(f, \\pi^*) \\le U(f, \\pi)$. Add points one at a time for a general refinement. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Why is $L(f, \\pi_1) \\le U(f, \\pi_2)$ for **any** two partitions?',
          options: [
            { text: '$\\pi_1 \\cup \\pi_2$ refines both: $L(\\pi_1) \\le L(\\pi_1 \\cup \\pi_2) \\le U(\\pi_1 \\cup \\pi_2) \\le U(\\pi_2)$', correct: true, why: 'The common refinement sits between them, using the refinement lemma twice.' },
            { text: 'Because $\\pi_1 \\subseteq \\pi_2$', why: 'The partitions may be unrelated; that is why we pass to $\\pi_1 \\cup \\pi_2$.' },
            { text: 'Because $L \\le U$ for the same partition', why: 'True, but the partitions here differ.' },
            { text: 'It is false in general', why: 'Every lower sum is below every upper sum.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$f(x) = \\frac1x$ on $[1, 2]$, four equal pieces',
          body: '$\\pi = \\{1, \\frac54, \\frac32, \\frac74, 2\\}$, $\\Delta x_k = \\frac14$. $f$ is decreasing, so $M_k$ is at the left end and $m_k$ at the right end:\n$$U = \\tfrac14\\left(1 + \\tfrac45 + \\tfrac23 + \\tfrac47\\right) \\approx 0.7595, \\qquad L = \\tfrac14\\left(\\tfrac45 + \\tfrac23 + \\tfrac47 + \\tfrac12\\right) \\approx 0.6345.$$\nThe true value $\\ln 2 \\approx 0.6931$ lies between them.',
        },
        {
          type: 'finish',
          title: 'Partitions and sums: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
