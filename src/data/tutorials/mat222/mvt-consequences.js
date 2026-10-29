// MAT 222 · Mean value theorems · Lesson 3: what the MVT gives you.

const f = (x) => x ** 3 - 3 * x;
const d = (x) => 3 * x * x - 3;

export default {
  id: 'mvt-consequences',
  title: 'What the MVT gives you',
  covers: 'f′ = 0 ⇒ constant, f′ = g′ ⇒ f = g + c, sign of f′ and monotonicity, the first-derivative test, bounds from f′, Darboux’s theorem',
  minutes: 18,
  sections: [
    {
      name: 'Constant and monotone functions',
      terms: [
        ['Zero derivative', 'If $f$ is continuous on $[a, b]$, differentiable on $(a, b)$ and $f\' = 0$ there, then $f$ is constant on $[a, b]$.'],
        ['Equal derivatives', 'If $f\' = g\'$ on $(a, b)$ (both continuous on $[a, b]$), then $f = g + C$ for some constant $C$.'],
        ['Monotonicity test', '$f\' \\ge 0$ on $(a, b)$ ⇒ $f$ increasing on $[a, b]$; $f\' > 0$ ⇒ strictly increasing; similarly for $\\le 0$, $< 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Mean value theorems · Lesson 3',
          title: 'Local information, global conclusions',
          body: 'The derivative only describes $f$ near each point. The MVT turns that into facts about whole intervals, because it links $f(x) - f(a)$ to a single value $f\'(c)$:\n$$f(x) - f(a) = f\'(c)(x - a).$$\nRead that equation with different information about $f\'$ and you get a whole family of results.',
          cta: 'See the first',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: $f\' = 0$ on $(a, b)$ ⇒ $f$ is constant',
          body: 'Let $x \\in (a, b]$. $f$ is continuous on $[a, x]$ and differentiable on $(a, x)$, so by the MVT there is $c \\in (a, x)$ with\n$$f(x) - f(a) = f\'(c)(x - a) = 0.$$\nSo $f(x) = f(a)$ for every $x \\in [a, b]$: $f$ is constant. $\\blacksquare$\n\n**Corollary.** If $f\' = g\'$ on $(a, b)$, apply this to $f - g$: $f = g + C$.',
        },
        {
          type: 'choice',
          eyebrow: 'Use it',
          prompt: '$f(x) = \\sin^{-1}x$ and $g(x) = \\ln(x + \\sqrt{x^2 + 1})$ have $f\'(x) = \\frac{1}{\\sqrt{1 - x^2}}$ and $g\'(x) = \\frac{1}{\\sqrt{x^2 + 1}}$. What can you conclude?',
          options: [
            { text: '$f\' \\ne g\'$, so $f$ and $g$ do not differ by a constant', correct: true, why: 'If $f = g + C$ then $f\' = g\'$. Since the derivatives differ, $f - g$ is not constant (in particular $f \\ne g$).' },
            { text: '$f = g + C$', why: 'That needs $f\' = g\'$.' },
            { text: '$f = g$', why: 'Their derivatives already differ at $x = \\frac12$.' },
            { text: 'Nothing', why: 'Comparing derivatives does settle it.' },
          ],
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'The sign of $f\'$ decides the direction',
          body: '$f(x) = x^3 - 3x$, $f\'(x) = 3x^2 - 3$. Move $x$: where $f\' > 0$ the tangent climbs and $f$ is increasing; where $f\' < 0$ it falls.',
          graph: {
            x: [-2.2, 2.2], y: [-3, 3], xs: [[-2], [-1], [0], [1], [2]], ys: [[-2], [0], [2]],
            param: { label: 'point $x$', min: -2, max: 2, step: 0.1, value: -1.6 },
            curves: [
              { f },
              { f: (x, a) => f(a) + d(a) * (x - a), kind: 'ok', from: -2.2, to: 2.2 },
            ],
            rects: [{ kind: 'strip', at: () => [[-1, 3, 2, 6]] }],
            dots: [{ kind: 'dot', at: (a) => [a, f(a)] }],
            ok: (a) => Math.abs(d(a)) > 1e-9 && d(a) > 0,
            read: (a) => {
              const s = d(a);
              if (Math.abs(s) < 1e-6) return `$f'(${a}) = 0$: a turning point. $f'$ changes from ${a < 0 ? '$+$ to $-$: a **local maximum**' : '$-$ to $+$: a **local minimum**'}.`;
              return `$f'(${a}) = ${s.toFixed(2)}$ ${s > 0 ? '$> 0$: **increasing** here.' : '$< 0$: **decreasing** here (shaded region).'}`;
            },
            need: 5,
            action: 'Visit both turning points and both sides',
          },
        },
        {
          type: 'bridge',
          title: 'Direction from slope: set.',
          recap: ['$f\' = 0$ ⇒ constant; $f\' = g\'$ ⇒ $f = g + C$.', '$f\' > 0$ ⇒ strictly increasing; $f\' < 0$ ⇒ strictly decreasing.'],
          why: 'Two more consequences that turn up in exams.',
        },
      ],
    },
    {
      name: 'Extremum tests, bounds and Darboux',
      terms: [
        ['First-derivative test', 'If $f\' > 0$ on $(x_0 - \\delta, x_0)$ and $f\' < 0$ on $(x_0, x_0 + \\delta)$, $f$ has a local maximum at $x_0$ (reverse for a minimum).'],
        ['Darboux’s theorem', 'If $f$ is differentiable on $[a, b]$ and $r$ lies strictly between $f\'(a)$ and $f\'(b)$, then $f\'(c) = r$ for some $c \\in (a, b)$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'More consequences',
          title: 'Read the MVT four more ways',
          cards: [
            { title: 'First-derivative test', text: 'If $f\'$ changes from $+$ to $-$ at $x_0$, $f$ has a local maximum there; from $-$ to $+$, a local minimum. (Fermat gives a necessary condition; this gives a sufficient one.)' },
            { title: 'Bounds', text: 'If $m_1 \\le f\'(x) \\le M_1$ on $(a, b)$, then $m_1(b - a) \\le f(b) - f(a) \\le M_1(b - a)$.' },
            { title: 'Lipschitz from $f\'$', text: '$|\\cos x - \\cos y| = |\\sin c|\\,|x - y| \\le |x - y|$, by the MVT.' },
            { title: 'Darboux', text: 'Derivatives have the intermediate value property, even when they are not continuous.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'If $|f(x) - f(y)| \\le (x - y)^2$ for all $x, y$, what is $f$?',
          options: [
            { text: 'Constant', correct: true, why: '$\\left|\\frac{f(x) - f(y)}{x - y}\\right| \\le |x - y| \\to 0$ as $y \\to x$, so $f\'(x) = 0$ everywhere, hence $f$ is constant.' },
            { text: 'Linear', why: 'A non-constant linear $f$ has $|f(x) - f(y)| = k|x - y|$, not bounded by $(x - y)^2$ for close points.' },
            { text: 'Lipschitz but not differentiable', why: 'It is differentiable, with derivative $0$.' },
            { text: 'Any continuous function', why: '$f(x) = x$ breaks it at $x = 0$, $y = \\frac12$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove: $m_1 \\le f\' \\le M_1$ ⇒ $m_1(b - a) \\le f(b) - f(a) \\le M_1(b - a)$',
          body: 'By the MVT there is $c \\in (a, b)$ with $f(b) - f(a) = f\'(c)(b - a)$. Since $b - a > 0$ and $m_1 \\le f\'(c) \\le M_1$,\n$$m_1(b - a) \\le f\'(c)(b - a) \\le M_1(b - a),$$\nwhich is the claim. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'Consequences: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
