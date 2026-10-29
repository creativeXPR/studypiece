// MAT 222 · Properties and the Fundamental Theorem · Lesson 3: FTC I and II, MVT for integrals, substitution, parts.

const g = (t) => 1 + Math.cos(t);
const G = (x) => x + Math.sin(x);

function under(x, n = 48) {
  const out = [];
  for (let k = 0; k < n; k++) {
    const a = (x * k) / n;
    const b = (x * (k + 1)) / n;
    const h = g((a + b) / 2);
    out.push([a, h, b - a, h]);
  }
  return out;
}

export default {
  id: 'ftc',
  title: 'The Fundamental Theorem of Calculus',
  covers: 'FTC I (evaluating ∫f′ = f(b) − f(a)) and FTC II (differentiating G(x) = ∫ₐˣ g), continuity of G, antiderivatives, MVT for integrals, substitution, integration by parts',
  minutes: 24,
  sections: [
    {
      name: 'The two halves of the theorem',
      terms: [
        ['FTC I (integrals of derivatives)', 'If $f : [a, b] \\to \\mathbb{R}$ is integrable and $F$ is differentiable on $[a, b]$ with $F\' = f$, then $\\int_a^b f(x)\\,dx = F(b) - F(a)$.'],
        ['FTC II (derivatives of integrals)', 'If $g$ is integrable on $[a, b]$ and $G(x) = \\int_a^x g(t)\\,dt$, then $G$ is continuous on $[a, b]$; and if $g$ is continuous at $c$, $G$ is differentiable at $c$ with $G\'(c) = g(c)$.'],
        ['Antiderivative', '$F$ with $F\' = f$. It is unique up to an added constant.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Properties and the Fundamental Theorem · Lesson 3',
          title: 'Differentiation and integration undo each other',
          body: 'The Fundamental Theorem of Calculus links the two central operations:\n\n**FTC I** evaluates the integral of a function once differentiated: if $F\' = f$, then $\\int_a^b f = F(b) - F(a)$.\n\n**FTC II** differentiates an integral: if $G(x) = \\int_a^x g(t)\\,dt$ and $g$ is continuous, then $G\' = g$.',
          cta: 'Watch the area grow',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: '$G(x)$ is the area so far; its slope is $g(x)$',
          body: '$g(t) = 1 + \\cos t$. The shaded area up to $x$ is $G(x) = \\int_0^x g = x + \\sin x$. Switch to the second view to see $G$ itself, with the tangent slope at $x$ equal to the current height of $g$.',
          graph: {
            x: [-0.1, 6.4], y: [0, 6.6], xs: [[0], [Math.PI, 'π'], [2 * Math.PI, '2π']], ys: [[0], [2], [4], [6]],
            views: ['Area under g', 'Graph of G'],
            param: { label: '$x$', min: 0.2, max: 6.2, step: 0.2, value: 1.6 },
            rects: [{ kind: 'low', show: (x, v) => v === 0, at: (x) => under(x) }],
            curves: [
              { f: g, show: (x, v) => v === 0, from: 0 },
              { f: G, show: (x, v) => v === 1, from: 0 },
              { f: (t, x) => G(x) + g(x) * (t - x), kind: 'ok', show: (x, v) => v === 1, from: 0 },
            ],
            dots: [
              { kind: 'dot', show: (x, v) => v === 0, at: (x) => [x, g(x)] },
              { kind: 'dot', show: (x, v) => v === 1, at: (x) => [x, G(x)] },
            ],
            read: (x) => `$G(${x}) = ${x} + \\sin ${x} = ${G(x).toFixed(3)}$ and $G'(${x}) = g(${x}) = 1 + \\cos ${x} = ${g(x).toFixed(3)}$.`,
            need: 5,
            action: 'Move x in both views',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove FTC I: $\\int_a^b f = F(b) - F(a)$',
          body: 'Let $\\pi = \\{x_0, \\dots, x_n\\}$ be any partition. By the **MVT** on each $[x_{k-1}, x_k]$ there is $\\xi_k$ with\n$$F(x_k) - F(x_{k-1}) = F\'(\\xi_k)\\Delta x_k = f(\\xi_k)\\Delta x_k.$$\nSince $m_k \\le f(\\xi_k) \\le M_k$, summing gives\n$$L(f, \\pi) \\le \\sum_{k=1}^n [F(x_k) - F(x_{k-1})] = F(b) - F(a) \\le U(f, \\pi).$$\nThis holds for every $\\pi$, so $\\underline\\int f \\le F(b) - F(a) \\le \\overline\\int f$. As $f$ is integrable these are equal: $\\int_a^b f = F(b) - F(a)$. $\\blacksquare$',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove FTC II: $G$ is continuous, and $G\'(c) = g(c)$ where $g$ is continuous',
          body: '**Continuity.** $g$ is integrable, hence bounded: $|g| \\le M$. For $x, y \\in [a, b]$, $|G(x) - G(y)| = \\left|\\int_y^x g\\right| \\le M|x - y|$. So $G$ is Lipschitz, hence (uniformly) continuous.\n\n**Derivative.** Let $g$ be continuous at $c$ and $\\varepsilon > 0$: there is δ with $|g(t) - g(c)| < \\varepsilon$ when $|t - c| < \\delta$. For $0 < |x - c| < \\delta$, since $(x - c)g(c) = \\int_c^x g(c)\\,dt$,\n$$\\left|\\frac{G(x) - G(c)}{x - c} - g(c)\\right| = \\frac{1}{|x - c|}\\left|\\int_c^x [g(t) - g(c)]\\,dt\\right| \\le \\frac{1}{|x - c|}\\,\\varepsilon|x - c| = \\varepsilon.$$\nSo $G\'(c) = g(c)$. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'If $G(x) = \\int_1^x \\frac{\\sin t}{t}\\,dt$, what is $G\'(\\pi)$?',
          options: [
            { text: '$0$', correct: true, why: 'By FTC II, $G\'(x) = \\frac{\\sin x}{x}$, and $\\sin\\pi = 0$.' },
            { text: '$\\frac1\\pi$', why: 'Evaluate the integrand at $\\pi$: $\\frac{\\sin \\pi}{\\pi} = 0$.' },
            { text: '$-1$', why: 'You differentiated the integrand; FTC II just evaluates it.' },
            { text: 'It needs the integral computed first', why: 'FTC II gives the derivative directly.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The FTC: proved.',
          recap: ['FTC I: MVT on each piece, then squeeze between $L$ and $U$.', 'FTC II: $G$ is Lipschitz; at a point of continuity $G\' = g$.'],
          why: 'Three consequences finish the course.',
        },
      ],
    },
    {
      name: 'Consequences',
      terms: [
        ['MVT for integrals', 'If $g$ is continuous on $[a, b]$, there is $c \\in (a, b)$ with $\\int_a^b g = (b - a)g(c)$.'],
        ['Substitution', 'If $f$ is continuous and $\\varphi : [\\alpha, \\beta] \\to [a, b]$ is continuously differentiable, $\\int_\\alpha^\\beta f(\\varphi(t))\\varphi\'(t)\\,dt = \\int_{\\varphi(\\alpha)}^{\\varphi(\\beta)} f(x)\\,dx$.'],
        ['Integration by parts', 'If $u, v$ are differentiable on $[a, b]$ with continuous derivatives, $\\int_a^b u v\'\\,dx = [uv]_a^b - \\int_a^b u\' v\\,dx$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'The MVT for integrals',
          body: '**Corollary.** If $g$ is continuous on $[a, b]$, there is $c \\in (a, b)$ with $\\int_a^b g(x)\\,dx = (b - a)\\,g(c)$.\n\n**Proof.** Let $G(x) = \\int_a^x g$. By FTC II, $G$ is differentiable with $G\' = g$. Apply the **MVT** to $G$:\n$$g(c) = G\'(c) = \\frac{G(b) - G(a)}{b - a} = \\frac{1}{b - a}\\int_a^b g. \\ \\blacksquare$$\nSo $g(c)$ is the **average value** of $g$ on $[a, b]$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Substitution and integration by parts',
          body: '**Substitution.** Let $F$ be an antiderivative of $f$. By the chain rule $\\frac{d}{dt}F(\\varphi(t)) = f(\\varphi(t))\\varphi\'(t)$. FTC I applied twice gives\n$$\\int_\\alpha^\\beta f(\\varphi(t))\\varphi\'(t)\\,dt = F(\\varphi(\\beta)) - F(\\varphi(\\alpha)) = \\int_{\\varphi(\\alpha)}^{\\varphi(\\beta)} f(x)\\,dx.$$\n**Integration by parts.** By the product rule $(uv)\' = u\'v + uv\'$, all continuous, hence integrable. FTC I gives\n$$[uv]_a^b = \\int_a^b u\'v + \\int_a^b uv\' \\ \\Rightarrow\\ \\int_a^b uv\' = [uv]_a^b - \\int_a^b u\'v.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Use parts to evaluate $\\int_0^1 x e^x\\,dx$.',
          options: [
            { text: '$1$', correct: true, why: '$u = x$, $v\' = e^x$: $[xe^x]_0^1 - \\int_0^1 e^x = e - (e - 1) = 1$.' },
            { text: '$e$', why: 'Subtract $\\int_0^1 e^x\\,dx = e - 1$.' },
            { text: '$e - 1$', why: 'That is only $\\int_0^1 e^x$.' },
            { text: '$\\frac e2$', why: 'Integration by parts, not substitution, is the tool here.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Remarks worth a mark',
          title: 'What the FTC does and does not say',
          cards: [
            { title: 'Continuity is needed', text: 'Every continuous function is the derivative of something (its integral, by FTC II). But some integrable functions have **no** antiderivative, e.g. a step function.' },
            { title: 'Uniqueness', text: 'If $F$ and $G$ are antiderivatives of $f$, $(F - G)\' = 0$, so $F = G + C$.' },
            { title: 'Why it matters', text: 'FTC I and II together let you compute definite integrals from antiderivatives instead of limits of sums.' },
          ],
        },
        {
          type: 'finish',
          title: 'MAT 222: complete.',
          body: 'From functions to the Fundamental Theorem: you have covered the whole course. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
