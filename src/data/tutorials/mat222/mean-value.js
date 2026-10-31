// MAT 222 · Mean value theorems · Lesson 2: the MVT and Cauchy's MVT.

export default {
  id: 'mean-value',
  title: 'The mean value theorem and Cauchy’s MVT',
  covers: 'The MVT with proof and geometric meaning, Cauchy’s generalised MVT with proof, verifying them for given functions, a root-existence application',
  minutes: 20,
  sections: [
    {
      name: 'The mean value theorem',
      terms: [
        ['Mean value theorem (MVT)', 'If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then $f\'(c) = \\frac{f(b) - f(a)}{b - a}$ for some $c \\in (a, b)$.'],
      ],
      screens: [
        {
          type: 'story',
          asides: [
            { label: 'Note', text: 'If $f$ satisfies Rolle’s theorem it also satisfies the MVT, but the converse is not generally true.' },
          ],
          eyebrow: 'Mean value theorems · Lesson 2',
          title: 'Rolle, tilted',
          body: 'Drop Rolle’s condition $f(a) = f(b)$. The chord from $(a, f(a))$ to $(b, f(b))$ is now tilted, with slope $\\frac{f(b) - f(a)}{b - a}$.\n\n**MVT.** If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, there is $c \\in (a, b)$ with\n$$f\'(c) = \\frac{f(b) - f(a)}{b - a}.$$\nGeometrically: somewhere the tangent is **parallel to the chord**. In motion: at some instant your speed equals your average speed.',
          cta: 'Find the point',
        },
        {
          type: 'custom',
          widget: 'meanValue',
          eyebrow: 'Find it',
          title: 'Make the tangent parallel to the chord',
          body: '$f(x) = x^3 - 3x^2 + 2x + 1$ on $[0, 3]$: the chord has slope $\\frac{7 - 1}{3} = 2$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove the MVT from Rolle',
          body: 'Let $m = \\frac{f(b) - f(a)}{b - a}$, the slope of the chord $y = m(x - a) + f(a)$. Let $h$ be the vertical gap between the graph and the chord:\n$$h(x) = f(x) - [m(x - a) + f(a)].$$\n$h$ is continuous on $[a, b]$ and differentiable on $(a, b)$, and $h(a) = 0 = h(b)$. By **Rolle**, $h\'(c) = 0$ for some $c \\in (a, b)$. But $h\'(c) = f\'(c) - m$, so\n$$f\'(c) = m = \\frac{f(b) - f(a)}{b - a}. \\ \\blacksquare$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $f(x) = x^2$ on $[1, 3]$, which $c$ does the MVT give?',
          options: [
            { text: '$c = 2$', correct: true, why: 'Chord slope $\\frac{9 - 1}{2} = 4$, and $f\'(c) = 2c = 4$ gives $c = 2$.' },
            { text: '$c = 4$', why: '$4$ is the slope; $c$ must lie in $(1, 3)$.' },
            { text: '$c = \\sqrt5$', why: 'Solve $2c = 4$.' },
            { text: 'There is none: $f(1) \\ne f(3)$', why: 'That would block Rolle, not the MVT.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The MVT: proved.',
          recap: ['Tangent parallel to the chord somewhere inside.', 'Proof: apply Rolle to graph minus chord.'],
          why: 'Now compare two functions at once: Cauchy’s MVT.',
        },
      ],
    },
    {
      name: 'Cauchy’s mean value theorem',
      terms: [
        ['Cauchy’s MVT', 'If $f, g$ are continuous on $[a, b]$ and differentiable on $(a, b)$, then $f\'(c)[g(b) - g(a)] = g\'(c)[f(b) - f(a)]$ for some $c \\in (a, b)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'Two functions, one common point',
          body: '**Cauchy’s (generalised) MVT.** Let $f$ and $g$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there is $c \\in (a, b)$ with\n$$f\'(c)[g(b) - g(a)] = g\'(c)[f(b) - f(a)].$$\nIf also $g(b) \\ne g(a)$ and $g\'(c) \\ne 0$:\n$$\\frac{f\'(c)}{g\'(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}.$$\nWith $g(x) = x$ this is the ordinary MVT.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove Cauchy’s MVT',
          body: 'Define\n$$h(x) = f(x)[g(b) - g(a)] - g(x)[f(b) - f(a)], \\quad x \\in [a, b].$$\n$h$ is continuous on $[a, b]$ and differentiable on $(a, b)$. Also\n$$h(a) = f(a)g(b) - g(a)f(b) = h(b).$$\nBy **Rolle**, $h\'(c) = 0$ for some $c \\in (a, b)$, i.e.\n$$f\'(c)[g(b) - g(a)] - g\'(c)[f(b) - f(a)] = 0. \\ \\blacksquare$$',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the steps of Cauchy’s MVT proof in order.',
          items: [
            'Define $h(x) = f(x)[g(b) - g(a)] - g(x)[f(b) - f(a)]$.',
            'Note $h$ is continuous on $[a, b]$ and differentiable on $(a, b)$.',
            'Check $h(a) = f(a)g(b) - g(a)f(b) = h(b)$.',
            'Apply Rolle: $h\'(c) = 0$ for some $c \\in (a, b)$.',
            'Expand $h\'(c) = 0$ to get the result.',
          ],
          explain: 'The whole trick is choosing $h$ so that $h(a) = h(b)$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked exam question',
          title: 'Show $3x = (\\pi^2 - 2)\\sin x - x\\cos x$ has a root in $(0, \\pi)$',
          body: 'Take $f(x) = x^3 + x^2\\sin x$ and $g(x) = x\\cos x - \\sin x$ on $[0, \\pi]$. Both are continuous and differentiable.\n\n$f(0) = 0$, $f(\\pi) = \\pi^3$; $g(0) = 0$, $g(\\pi) = -\\pi$.\n$f\'(x) = 3x^2 + 2x\\sin x + x^2\\cos x$, $g\'(x) = -x\\sin x$.\n\nCauchy gives $c \\in (0, \\pi)$ with $f\'(c)(-\\pi) = g\'(c)\\pi^3$, i.e. $-f\'(c) = -c\\sin c \\cdot \\pi^2$:\n$$3c^2 + 2c\\sin c + c^2\\cos c = \\pi^2 c\\sin c.$$\nDivide by $c > 0$: $3c + 2\\sin c + c\\cos c = \\pi^2\\sin c$, i.e. $3c = (\\pi^2 - 2)\\sin c - c\\cos c$. So $c$ is a root. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'Mean value theorems: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
