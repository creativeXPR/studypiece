// MAT 222 · Differentiation · Lesson 2: arithmetic of derivatives, chain rule, inverse function rule.

export default {
  id: 'derivative-rules',
  title: 'The rules: arithmetic, chain rule, inverse functions',
  covers: 'Sum, product, scalar and quotient rules with proofs, the chain rule, the inverse function rule and why (f⁻¹)′ = 1/f′',
  minutes: 18,
  sections: [
    {
      name: 'Arithmetic and the chain rule',
      terms: [
        ['Sum, scalar', '$(f + g)\'(x_0) = f\'(x_0) + g\'(x_0)$, $(\\lambda f)\'(x_0) = \\lambda f\'(x_0)$.'],
        ['Product rule', '$(fg)\'(x_0) = f\'(x_0)g(x_0) + f(x_0)g\'(x_0)$.'],
        ['Quotient rule', '$\\left(\\frac fg\\right)\'(x_0) = \\frac{f\'(x_0)g(x_0) - f(x_0)g\'(x_0)}{[g(x_0)]^2}$, $g(x_0) \\ne 0$.'],
        ['Chain rule', 'If $f$ is differentiable at $x_0$ and $g$ at $f(x_0)$, then $(g \\circ f)\'(x_0) = g\'(f(x_0)) \\cdot f\'(x_0)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Differentiation · Lesson 2',
          title: 'Rules that save you from first principles',
          body: 'If $f$, $g$ are differentiable at $x_0$ and $\\lambda$ is a constant, then $f + g$, $fg$, $\\lambda f$ are differentiable at $x_0$, and so is $\\frac fg$ when $g(x_0) \\ne 0$:\n\n$(f + g)\' = f\' + g\'$ · $(\\lambda f)\' = \\lambda f\'$ · $(fg)\' = f\'g + fg\'$ · $\\left(\\frac fg\\right)\' = \\frac{f\'g - fg\'}{g^2}$.',
          cta: 'Why the product rule works',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove the product rule',
          body: 'Add and subtract $f(x)g(x_0)$:\n$$\\frac{f(x)g(x) - f(x_0)g(x_0)}{x - x_0} = f(x)\\frac{g(x) - g(x_0)}{x - x_0} + g(x_0)\\frac{f(x) - f(x_0)}{x - x_0}.$$\nAs $x \\to x_0$: $f(x) \\to f(x_0)$ (differentiable ⇒ continuous), and the two quotients tend to $g\'(x_0)$ and $f\'(x_0)$. Hence\n$$(fg)\'(x_0) = f(x_0)g\'(x_0) + g(x_0)f\'(x_0). \\ \\blacksquare$$',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'In the product-rule proof, why may we say $f(x) \\to f(x_0)$?',
          options: [
            { text: '$f$ is differentiable at $x_0$, hence continuous there', correct: true, why: 'That is exactly where the previous lesson’s theorem is used.' },
            { text: 'Because $f$ is a polynomial', why: 'The proof works for any differentiable $f$.' },
            { text: 'Because $g$ is continuous', why: 'We need continuity of $f$, not $g$.' },
            { text: 'It is an extra assumption', why: 'It follows from differentiability.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The chain rule',
          title: 'Rates multiply',
          body: '**Chain rule.** If $f$ is differentiable at $x_0$ and $g$ is differentiable at $f(x_0)$, then $g \\circ f$ is differentiable at $x_0$ and\n$$(g \\circ f)\'(x_0) = g\'(f(x_0)) \\cdot f\'(x_0).$$\n**Idea of the proof.** Write\n$$\\frac{g(f(x)) - g(f(x_0))}{x - x_0} = \\frac{g(f(x)) - g(f(x_0))}{f(x) - f(x_0)} \\cdot \\frac{f(x) - f(x_0)}{x - x_0},$$\nand let $x \\to x_0$; since $f$ is continuous, $f(x) \\to f(x_0)$. (A careful proof handles points where $f(x) = f(x_0)$.)',
        },
        {
          type: 'bridge',
          title: 'Arithmetic and chains: set.',
          recap: ['Product: add and subtract a cross term.', 'Chain: multiply the rates.'],
          why: 'Finally: the derivative of an inverse function.',
        },
      ],
    },
    {
      name: 'The inverse function rule',
      terms: [
        ['Inverse function rule', 'If $f : [a, b] \\to J$ is strictly monotone and continuous, differentiable at $x_0$ with $f\'(x_0) \\ne 0$, then $f^{-1}$ is differentiable at $y_0 = f(x_0)$ and $(f^{-1})\'(y_0) = \\frac{1}{f\'(x_0)}$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Reflect the graph, flip the slope',
          body: 'Blue is $f(x) = e^x$, green is $f^{-1}(y) = \\ln y$, its mirror image in $y = x$. Move $a$: the tangent slopes at mirror points are reciprocals.',
          graph: {
            x: [-2.3, 3.2], y: [-2.3, 3.2], xs: [[-2], [0], [1], [2], [3]], ys: [[-2], [0], [1], [2], [3]],
            param: { label: 'point $a$', min: -1.5, max: 1, step: 0.25, value: 0.25 },
            curves: [
              { f: Math.exp },
              { f: (x) => (x <= 0 ? NaN : Math.log(x)), kind: 'alt', from: 0.02, n: 400 },
              { f: (x) => x, kind: 'guide' },
              { f: (x, a) => Math.exp(a) + Math.exp(a) * (x - a), kind: 'ok', from: (-2.3), to: 3.2 },
              { f: (x, a) => a + (x - Math.exp(a)) / Math.exp(a), kind: 'ok' },
            ],
            dots: [
              { kind: 'dot', at: (a) => [a, Math.exp(a)] },
              { kind: 'ok', at: (a) => [Math.exp(a), a] },
            ],
            read: (a) => `At $x_0 = ${a}$: $f'(x_0) = e^{${a}} = ${Math.exp(a).toFixed(3)}$. At $y_0 = e^{${a}}$: $(f^{-1})'(y_0) = \\frac{1}{y_0} = ${(1 / Math.exp(a)).toFixed(3)} = \\frac{1}{f'(x_0)}$.`,
            need: 4,
            action: 'Move a a few times',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'State and prove the inverse function rule',
          body: '**Theorem.** Let $f : [a, b] \\to J$ ($J = f([a, b])$) be strictly monotone and continuous, differentiable at $x_0$ with $f\'(x_0) \\ne 0$, and let $y_0 = f(x_0)$. Then $f^{-1}$ is differentiable at $y_0$ and $(f^{-1})\'(y_0) = \\frac{1}{f\'(x_0)}$.\n\n**Proof.** $f$ is one-to-one and continuous, so $f^{-1}$ is one-to-one and continuous on $J$. For $y = f(x) \\ne y_0$ we have $x \\ne x_0$, and\n$$\\frac{f^{-1}(y) - f^{-1}(y_0)}{y - y_0} = \\frac{x - x_0}{f(x) - f(x_0)} = \\frac{1}{\\dfrac{f(x) - f(x_0)}{x - x_0}}.$$\nAs $y \\to y_0$, continuity of $f^{-1}$ gives $x \\to x_0$, so the right side tends to $\\frac{1}{f\'(x_0)}$. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Use the inverse function rule: if $f(x) = \\sin x$ on $[-\\frac\\pi2, \\frac\\pi2]$, then $(\\sin^{-1})\'(y) = $',
          options: [
            { text: '$\\dfrac{1}{\\sqrt{1 - y^2}}$', correct: true, why: '$(f^{-1})\'(y) = \\frac{1}{\\cos x}$ with $\\sin x = y$, and $\\cos x = \\sqrt{1 - y^2} \\ge 0$ on that interval.' },
            { text: '$\\dfrac{1}{\\cos y}$', why: 'Evaluate $f\'$ at $x = f^{-1}(y)$, not at $y$.' },
            { text: '$\\cos(\\sin^{-1} y)$', why: 'That is $f\'(x)$ itself; the rule takes its reciprocal.' },
            { text: '$-\\dfrac{1}{\\sqrt{1 - y^2}}$', why: 'Sine is increasing there, so its inverse has positive slope.' },
          ],
        },
        {
          type: 'finish',
          title: 'Differentiation: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
