// MAT 222 · Differentiation · Lesson 1: the derivative, ε-δ form, differentiable ⇒ continuous.

const F = [(x) => x * x, (x) => Math.abs(x)];
const X0 = [1, 0];

export default {
  id: 'derivative',
  title: 'The derivative',
  covers: 'Tangent as a limit of chords, the definition and its ε-δ form, f(x) = x², √x and xⁿ from first principles, differentiable ⇒ continuous, |x| and left/right derivatives',
  minutes: 18,
  sections: [
    {
      name: 'Defining the derivative',
      terms: [
        ['Differentiable at $x_0$', '$f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$ exists. Equivalently $\\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}$ exists.'],
        ['Newton (difference) quotient', '$\\frac{f(x) - f(x_0)}{x - x_0}$: the slope of the chord from $x_0$ to $x$.'],
        ['ε-δ form', '$f\'(x_0) = L$ if for every $\\varepsilon > 0$ there is $\\delta > 0$ with $\\left|\\frac{f(x) - f(x_0)}{x - x_0} - L\\right| < \\varepsilon$ whenever $0 < |x - x_0| < \\delta$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Differentiation · Lesson 1',
          title: 'A tangent is a chord that has shrunk',
          body: 'A chord joins $(x_0, f(x_0))$ and $(x_0 + h, f(x_0 + h))$; its slope is the ==Newton quotient==\n$$\\frac{f(x_0 + h) - f(x_0)}{h}.$$\nLet the second point slide in ($h \\to 0$). If the slopes settle on a number, that number is the slope of the tangent: the ==derivative==\n$$f\'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}.$$\nFor this, $x_0$ must be a limit point of the domain.',
          cta: 'Shrink a chord',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Chords into a tangent',
          body: 'Slide $h$ towards $0$ from both sides and read the chord’s slope. For $x^2$ at $1$ the slopes agree; for $|x|$ at $0$ they don’t.',
          graph: {
            x: [-1.6, 2.2], y: [-0.6, 3.2], xs: [[-1], [0], [1], [2]], ys: [[0], [1], [2], [3]],
            views: ['x² at 1', '|x| at 0'],
            param: { label: 'step $h$', min: -1, max: 1, step: 0.1, value: 0.8 },
            curves: [
              { f: (x, h, v) => F[v](x) },
              { f: (x, h, v) => (Math.abs(h) < 1e-9 ? NaN : F[v](X0[v]) + ((F[v](X0[v] + h) - F[v](X0[v])) / h) * (x - X0[v])), kind: 'ok' },
            ],
            dots: [
              { kind: 'dot', at: (h, v) => [X0[v], F[v](X0[v])] },
              { kind: 'ok', show: (h) => Math.abs(h) > 1e-9, at: (h, v) => [X0[v] + h, F[v](X0[v] + h)] },
            ],
            read: (h, v) => {
              if (Math.abs(h) < 1e-9) return 'At $h = 0$ the quotient is $\\frac00$: the derivative is the **limit** as $h \\to 0$, not the value at $0$.';
              const q = (F[v](X0[v] + h) - F[v](X0[v])) / h;
              return v === 0
                ? `Chord slope $= \\frac{(1 + h)^2 - 1}{h} = 2 + h = ${q.toFixed(2)}$, heading to $f'(1) = 2$ from either side.`
                : `Chord slope $= \\frac{|h|}{h} = ${q.toFixed(0)}$. From the right it is $1$, from the left $-1$: **no derivative at $0$**.`;
            },
            need: 6,
            action: 'Shrink h from both sides in both views',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked examples',
          title: 'Three derivatives from first principles',
          body: '**$f(x) = x^2$:** $\\displaystyle \\lim_{h \\to 0} \\frac{(x_0 + h)^2 - x_0^2}{h} = \\lim_{h \\to 0} (2x_0 + h) = 2x_0$.\n\n**$f(x) = \\sqrt x$, $x_0 > 0$:** multiply by the conjugate,\n$$\\frac{\\sqrt x - \\sqrt{x_0}}{x - x_0} = \\frac{1}{\\sqrt x + \\sqrt{x_0}} \\to \\frac{1}{2\\sqrt{x_0}}.$$\n**$f(x) = x^n$:** $x^n - x_0^n = (x - x_0)\\sum_{k=0}^{n-1} x^{n-1-k}x_0^k$, so the quotient tends to $\\sum_{k=0}^{n-1} x_0^{n-1} = nx_0^{n-1}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'From first principles, $f(x) = x^2 + x$ has $f\'(2) = $',
          options: [
            { text: '$5$', correct: true, why: '$\\frac{(2 + h)^2 + (2 + h) - 6}{h} = \\frac{5h + h^2}{h} = 5 + h \\to 5$.' },
            { text: '$6$', why: 'That is $f(2)$, not the slope.' },
            { text: '$4$', why: 'You dropped the derivative of the $x$ term.' },
            { text: '$2x + 1$', why: 'That is $f\'(x)$ in general; evaluate it at $x = 2$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The derivative: defined.',
          recap: ['$f\'(x_0)$ is the limit of chord slopes.', 'Compute it by simplifying the Newton quotient before letting $h \\to 0$.'],
          why: 'How does differentiability relate to continuity?',
        },
      ],
    },
    {
      name: 'Differentiable ⇒ continuous',
      terms: [
        ['Theorem', 'If $f$ is differentiable at $x_0$, then $f$ is continuous at $x_0$. The converse is false.'],
        ['Left and right derivatives', '$f\'_-(x_0) = \\lim_{x \\to x_0^-} \\frac{f(x) - f(x_0)}{x - x_0}$, $f\'_+(x_0) = \\lim_{x \\to x_0^+} \\frac{f(x) - f(x_0)}{x - x_0}$. $f\'(x_0)$ exists ⇔ both exist and are equal.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: differentiable at $x_0$ ⇒ continuous at $x_0$',
          body: 'For $x \\ne x_0$ in the domain,\n$$f(x) - f(x_0) = \\frac{f(x) - f(x_0)}{x - x_0} \\cdot (x - x_0).$$\nTake limits as $x \\to x_0$, using the product rule for limits:\n$$\\lim_{x \\to x_0} [f(x) - f(x_0)] = f\'(x_0) \\cdot 0 = 0.$$\nHence $\\lim_{x \\to x_0} f(x) = f(x_0)$, so $f$ is continuous at $x_0$. $\\blacksquare$\n\n**Corollary.** If $f$ is discontinuous at $x_0$, it is not differentiable there.',
        },
        {
          type: 'sort',
          eyebrow: 'Sort the scenarios',
          prompt: 'At $x_0 = 0$, which is each function?',
          buckets: [
            { id: 'b', label: 'Continuous and differentiable' },
            { id: 'c', label: 'Continuous, not differentiable' },
            { id: 'n', label: 'Neither' },
          ],
          items: [
            { text: '$x^2$', bucket: 'b', why: '**Both**: $f\'(0) = 0$.' },
            { text: '$|x|$', bucket: 'c', why: '**Continuous only**: left derivative $-1$, right derivative $1$.' },
            { text: '$\\operatorname{sgn}(x)$', bucket: 'n', why: '**Neither**: it jumps, and discontinuous ⇒ not differentiable.' },
            { text: '$\\sqrt[3]{x}$', bucket: 'c', why: '**Continuous only**: the quotient $\\frac{x^{1/3}}{x} = x^{-2/3} \\to \\infty$ (vertical tangent).' },
            { text: '$x^2 \\sin\\frac1x$, $f(0) = 0$', bucket: 'b', why: '**Both**: $\\left|\\frac{h^2 \\sin(1/h)}{h}\\right| \\le |h| \\to 0$, so $f\'(0) = 0$.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Going further',
          title: 'How badly can it fail?',
          cards: [
            { title: 'Corners', text: '$|x|$: one-sided derivatives exist but differ.' },
            { title: 'Vertical tangents', text: '$\\sqrt[3]x$ at $0$: the quotient blows up.' },
            { title: 'Everywhere at once', text: 'Weierstrass’ function $\\sum_{n=0}^{\\infty} a^n \\cos(b^n \\pi x)$ ($0 < a < 1$, $b$ odd, $ab > 1 + \\frac32\\pi$) is continuous everywhere but differentiable **nowhere**.' },
          ],
        },
        {
          type: 'finish',
          title: 'The derivative: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
