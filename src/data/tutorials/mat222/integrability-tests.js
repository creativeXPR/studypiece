// MAT 222 · The Riemann integral · Lesson 3: Riemann's ε-criterion, the sequential criterion, Darboux.

const f = (x) => Math.exp(x) / 2;

function strips(n) {
  // For an increasing f, M_k − m_k = f(x_k) − f(x_{k−1}): the "staircase" of differences.
  const out = [];
  for (let k = 1; k <= n; k++) {
    const a = (k - 1) / n;
    const b = k / n;
    out.push([a, f(b), b - a, f(b) - f(a)]);
  }
  return out;
}

export default {
  id: 'integrability-tests',
  title: 'Tests for integrability',
  covers: 'Riemann’s ε-criterion with proof, the sequential (limit) criterion and computing the integral as lim U(f, πₙ), Darboux’s criterion',
  minutes: 18,
  sections: [
    {
      name: 'Riemann’s criterion',
      terms: [
        ['Riemann’s (ε-) criterion', 'A bounded $f$ is integrable on $[a, b]$ ⇔ for every $\\varepsilon > 0$ there is a partition $\\pi$ with $U(f, \\pi) - L(f, \\pi) < \\varepsilon$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The Riemann integral · Lesson 3',
          title: 'Checking every partition is impossible, so don’t',
          body: 'The definition needs the sup of **all** lower sums and the inf of **all** upper sums: infinitely many partitions. Riemann’s criterion says one well-chosen partition per ε is enough.\n\n**Riemann’s criterion.** A bounded $f : [a, b] \\to \\mathbb{R}$ is integrable ⇔ for every $\\varepsilon > 0$ there is a partition $\\pi$ with\n$$U(f, \\pi) - L(f, \\pi) < \\varepsilon.$$',
          cta: 'See why it works',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove Riemann’s criterion',
          body: '**(⇐)** For any $\\pi$, $L(f, \\pi) \\le \\underline\\int f \\le \\overline\\int f \\le U(f, \\pi)$, so $0 \\le \\overline\\int f - \\underline\\int f \\le U(f, \\pi) - L(f, \\pi) < \\varepsilon$. As ε is arbitrary, $\\overline\\int f = \\underline\\int f$.\n\n**(⇒)** Let $I = \\int_a^b f$ and $\\varepsilon > 0$. By the definitions of sup and inf there are partitions $\\pi_1, \\pi_2$ with\n$$L(f, \\pi_1) > I - \\tfrac\\varepsilon2, \\qquad U(f, \\pi_2) < I + \\tfrac\\varepsilon2.$$\nLet $\\pi = \\pi_1 \\cup \\pi_2$. Refining raises $L$ and lowers $U$, so\n$$I - \\tfrac\\varepsilon2 < L(f, \\pi) \\le U(f, \\pi) < I + \\tfrac\\varepsilon2,$$\nhence $U(f, \\pi) - L(f, \\pi) < \\varepsilon$. $\\blacksquare$',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the (⇒) direction in order.',
          items: [
            'Let $I = \\int_a^b f$ and $\\varepsilon > 0$.',
            'Pick $\\pi_1$ with $L(f, \\pi_1) > I - \\frac\\varepsilon2$ (sup property).',
            'Pick $\\pi_2$ with $U(f, \\pi_2) < I + \\frac\\varepsilon2$ (inf property).',
            'Take the common refinement $\\pi = \\pi_1 \\cup \\pi_2$.',
            'Then $U(f, \\pi) - L(f, \\pi) < \\varepsilon$.',
          ],
          explain: 'Refinement is what lets one partition do both jobs.',
        },
        {
          type: 'bridge',
          title: 'Riemann’s criterion: proved.',
          recap: ['Integrable ⇔ $U - L$ can be made $< \\varepsilon$.', 'Proof: sup/inf property, then a common refinement.'],
          why: 'Even easier: use a sequence of partitions.',
        },
      ],
    },
    {
      name: 'The sequential criterion and Darboux',
      terms: [
        ['Sequential (limit) criterion', '$f \\in \\mathcal{R}[a, b]$ ⇔ there is a sequence of partitions $\\pi_n$ with $\\lim_{n \\to \\infty} [U(f, \\pi_n) - L(f, \\pi_n)] = 0$. Then $\\int_a^b f = \\lim U(f, \\pi_n) = \\lim L(f, \\pi_n)$.'],
        ['Darboux’s criterion', '$f$ is integrable ⇔ for every $\\varepsilon > 0$ there is $\\delta > 0$ such that $U(f, \\pi) - L(f, \\pi) < \\varepsilon$ for every partition with $\\|\\pi\\| < \\delta$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The criterion you will use most',
          title: 'One sequence of partitions',
          body: '**Sequential criterion.** $f$ is integrable on $[a, b]$ ⇔ some sequence of partitions has $U(f, \\pi_n) - L(f, \\pi_n) \\to 0$. In that case\n$$\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} U(f, \\pi_n) = \\lim_{n \\to \\infty} L(f, \\pi_n),$$\nby the squeeze $L(f, \\pi_n) \\le \\int_a^b f \\le U(f, \\pi_n)$. So it both **proves** integrability and **computes** the integral. Usually $\\pi_n$ is the uniform partition into $n$ equal pieces.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'For increasing $f$, the gap is a staircase',
          body: 'For increasing $f$ on a uniform partition, $M_k - m_k = f(x_k) - f(x_{k-1})$. The yellow boxes are those differences; they stack to height $f(b) - f(a)$, each of width $\\frac{b - a}{n}$.',
          graph: {
            x: [-0.05, 1.05], y: [0.3, 1.5], xs: [[0, 'a = 0'], [0.5, '½'], [1, 'b = 1']], ys: [[0.5, '½'], [1], [1.36, 'f(b)']],
            param: { label: 'pieces $n$', min: 2, max: 30, step: 1, value: 4 },
            rects: [{ kind: 'up', at: (n) => strips(n) }],
            curves: [{ f, from: 0, to: 1 }],
            read: (n) => `$U - L = [f(b) - f(a)]\\,\\frac{b - a}{n} = \\frac{${(f(1) - f(0)).toFixed(3)}}{${n}} = ${((f(1) - f(0)) / n).toFixed(4)} \\to 0$.`,
            need: 4,
            action: 'Raise n',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Monotone $f$: show $U(f, \\pi_n) - L(f, \\pi_n) = [f(b) - f(a)]\\frac{b - a}{n}$',
          body: 'Let $f$ be increasing and $\\pi_n$ the uniform partition, $\\Delta x_k = \\frac{b - a}{n}$. On $[x_{k-1}, x_k]$, $m_k = f(x_{k-1})$ and $M_k = f(x_k)$. So\n$$U - L = \\sum_{k=1}^n [f(x_k) - f(x_{k-1})]\\frac{b - a}{n} = \\frac{b - a}{n}[f(x_n) - f(x_0)] = [f(b) - f(a)]\\frac{b - a}{n},$$\na telescoping sum. It tends to $0$, so by the sequential criterion **$f$ is Riemann integrable**. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'With $f(x) = x^2 + x$ on $[0, 2]$ and $\\pi_n = \\{\\frac{2i}{n}\\}$, what is $\\int_0^2 f$?',
          options: [
            { text: '$\\frac{14}{3}$', correct: true, why: '$f$ is increasing, $U - L = [f(2) - f(0)]\\frac2n = \\frac{12}{n} \\to 0$, and $\\lim U(f, \\pi_n) = \\frac83 + 2 = \\frac{14}{3}$.' },
            { text: '$6$', why: '$6 = f(2)$, the height, not the area.' },
            { text: '$\\frac83$', why: 'That is only $\\int_0^2 x^2$; add $\\int_0^2 x = 2$.' },
            { text: '$\\frac{20}{3}$', why: 'Recheck: $\\frac{2^3}{3} + \\frac{2^2}{2} = \\frac83 + 2$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Darboux’s criterion',
          title: 'Fine enough partitions always work',
          body: '**Darboux’s criterion.** A bounded $f$ is integrable on $[a, b]$ ⇔ for every $\\varepsilon > 0$ there is $\\delta > 0$ such that\n$$\\sum_{k=1}^n \\left(\\sup_{[x_{k-1}, x_k]} f - \\inf_{[x_{k-1}, x_k]} f\\right)\\Delta x_k < \\varepsilon$$\nfor **every** partition with $\\|\\pi\\| < \\delta$.\n\nSo there are four routes to integrability: the **definition**, the **ε-criterion**, the **limit criterion** and **Darboux**. Pick by what the question gives you.',
        },
        {
          type: 'finish',
          title: 'Integrability tests: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
