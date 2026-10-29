// MAT 222 · Mean value theorems · Lesson 1: extrema, Fermat's theorem and Rolle's theorem.

const f = (x) => x ** 3 - 6 * x * x + 8 * x;
const d = (x) => 3 * x * x - 12 * x + 8;
const C = (12 - Math.sqrt(48)) / 6; // ≈ 0.845

export default {
  id: 'fermat-rolle',
  title: 'Extrema, Fermat and Rolle',
  covers: 'Absolute and local extrema, Fermat’s theorem f′(x₀) = 0, critical points, Rolle’s theorem with proof, verifying Rolle for a given function',
  minutes: 18,
  sections: [
    {
      name: 'Extrema and Fermat’s theorem',
      terms: [
        ['Local maximum at $x_0$', 'There is an open interval $I \\ni x_0$ with $f(x) \\le f(x_0)$ for all $x \\in I \\cap E$. (Local minimum: $\\ge$.)'],
        ['Fermat’s theorem', 'If $f$ has a local extremum at an interior point $x_0$ and is differentiable there, then $f\'(x_0) = 0$.'],
        ['Critical point', 'A point $x_0$ where $f\'(x_0) = 0$ (or $f\'$ does not exist).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Mean value theorems · Lesson 1',
          title: 'Peaks and valleys',
          body: '$f$ has an ==absolute maximum== at $x_0$ if $f(x_0) \\ge f(x)$ for **all** $x$ in the domain, and a ==local maximum== if this holds just on some open interval around $x_0$. Minima are defined the same way with $\\le$.\n\nEvery absolute extremum at an interior point is local, but not conversely.\n\nThis lesson starts a chain: **Fermat ⇒ Rolle ⇒ MVT ⇒ Cauchy ⇒ Taylor**.',
          cta: 'Start the chain',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Fermat’s theorem: at an interior extremum, $f\'(x_0) = 0$',
          body: 'Suppose $f$ has a local **maximum** at $x_0$ and is differentiable there. For small $h \\ne 0$, $f(x_0 + h) \\le f(x_0)$, so $f(x_0 + h) - f(x_0) \\le 0$.\n\nFor $h > 0$: $\\frac{f(x_0 + h) - f(x_0)}{h} \\le 0$, so letting $h \\to 0^+$, $f\'(x_0) \\le 0$.\n\nFor $h < 0$: $\\frac{f(x_0 + h) - f(x_0)}{h} \\ge 0$, so letting $h \\to 0^-$, $f\'(x_0) \\ge 0$.\n\nTogether, $f\'(x_0) = 0$. (For a local minimum the inequalities reverse.) $\\blacksquare$',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'If $f\'(x_0) = 0$, $f$ has a local extremum at $x_0$.', why: '**False**: $x^3$ has $f\'(0) = 0$ but no extremum. Fermat is necessary, not sufficient.' },
            { text: 'An extremum can occur where $f\'$ does not exist.', correct: true, why: '**True**: $|x|$ has a minimum at $0$.' },
            { text: 'An extremum at an endpoint need not have $f\' = 0$.', correct: true, why: '**True**: $x$ on $[0, 1]$ has its maximum at $1$ with slope $1$.' },
            { text: 'A local minimum of $f$ is a local maximum of $-f$.', correct: true, why: '**True**: that is how the minimum case of Fermat reduces to the maximum case.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Fermat: proved.',
          recap: ['Interior extremum + differentiable ⇒ $f\' = 0$.', 'Proof: the right quotient is $\\le 0$, the left one $\\ge 0$.'],
          why: 'Combine Fermat with the extreme value theorem and you get Rolle.',
        },
      ],
    },
    {
      name: 'Rolle’s theorem',
      terms: [
        ['Rolle’s theorem', 'If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$ and $f(a) = f(b)$, then $f\'(c) = 0$ for some $c \\in (a, b)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'Same height at both ends ⇒ a flat tangent inside',
          body: '**Rolle’s theorem.** Suppose\n\n(i) $f$ is continuous on $[a, b]$;\n(ii) $f$ is differentiable on $(a, b)$;\n(iii) $f(a) = f(b)$.\n\nThen there is $c \\in (a, b)$ with $f\'(c) = 0$.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Find it',
          title: 'Hunt for the flat tangent',
          body: '$f(x) = x^3 - 6x^2 + 8x$ on $[0, 2]$: $f(0) = f(2) = 0$. Slide $c$ until the tangent is horizontal.',
          graph: {
            x: [-0.15, 2.15], y: [-1.2, 3.6], xs: [[0, 'a = 0'], [1], [2, 'b = 2']], ys: [[0], [1], [2], [3]],
            param: { label: 'point $c$', min: 0.05, max: 1.95, step: 0.005, value: 1.5 },
            curves: [
              { f, from: 0, to: 2 },
              { f: (x, c) => f(c) + d(c) * (x - c), kind: 'ok', from: 0, to: 2 },
            ],
            dots: [
              { kind: 'hole', at: () => [0, 0] },
              { kind: 'hole', at: () => [2, 0] },
              { kind: 'dot', at: (c) => [c, f(c)] },
            ],
            ok: (c) => Math.abs(d(c)) < 0.06,
            goal: (c) => Math.abs(d(c)) < 0.06,
            read: (c) => (Math.abs(d(c)) < 0.06
              ? `**Found it**: at $c \\approx ${C.toFixed(3)}$, $f'(c) = 3c^2 - 12c + 8 = 0$, i.e. $c = 2 - \\frac{2}{\\sqrt3}$.`
              : `$f'(${c.toFixed(3)}) = ${d(c).toFixed(3)}$: not flat yet.`),
            action: 'Slide c until the tangent is flat',
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove Rolle’s theorem',
          body: 'If $f$ is constant on $[a, b]$, then $f\'(c) = 0$ for every $c \\in (a, b)$.\n\nOtherwise, $f$ is continuous on the closed interval $[a, b]$, so by the **extreme value theorem** it attains a maximum and a minimum there. Since $f(a) = f(b)$ and $f$ is not constant, at least one of them is attained at some $c \\in (a, b)$, an **interior** point.\n\n$f$ is differentiable at $c$ and has a local extremum there, so by **Fermat’s theorem** $f\'(c) = 0$. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Check the hypotheses',
          prompt: 'Does Rolle’s theorem apply to $f(x) = \\sin\\left(\\frac\\pi2 x\\right)$ on $[-3, 3]$?',
          options: [
            { text: 'No: $f(-3) = 1 \\ne -1 = f(3)$', correct: true, why: 'Condition (iii) fails. (On $[-2, 2]$ it does apply: $f(\\pm2) = 0$, with $f\' = 0$ at $\\pm1$.)' },
            { text: 'Yes: $f$ is smooth', why: 'Smoothness covers (i) and (ii), but the end values must match.' },
            { text: 'No: $f$ is not differentiable', why: 'It is differentiable everywhere.' },
            { text: 'Yes, with $c = 0$', why: '$f\'(0) = \\frac\\pi2 \\ne 0$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Verify Rolle for $f(x) = x^4 - 4x^3 + 3x^2 + 2$ on $[1, 3]$',
          body: '(i) and (ii): a polynomial is continuous and differentiable everywhere.\n(iii) $f(1) = 1 - 4 + 3 + 2 = 2$ and $f(3) = 81 - 108 + 27 + 2 = 2$. ✓\n\nSo some $c \\in (1, 3)$ has $f\'(c) = 0$:\n$$f\'(x) = 4x^3 - 12x^2 + 6x = 2x(2x^2 - 6x + 3) = 0 \\Rightarrow x = 0 \\text{ or } x = \\frac{3 \\pm \\sqrt3}{2}.$$\nOnly $c = \\frac{3 + \\sqrt3}{2} \\approx 2.366$ lies in $(1, 3)$.',
        },
        {
          type: 'finish',
          title: 'Fermat and Rolle: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
