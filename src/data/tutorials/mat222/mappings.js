// MAT 222 · Functions and mappings · Lesson 2: injective, surjective, inverse, composition.

const FNS = [(x) => x * x, (x) => x ** 3, (x) => Math.exp(x)];

function sols(c, v) {
  if (v === 0) return c > 0 ? [-Math.sqrt(c), Math.sqrt(c)] : c === 0 ? [0] : [];
  if (v === 1) return [Math.cbrt(c)];
  return c > 0 ? [Math.log(c)] : [];
}

export default {
  id: 'mappings',
  title: 'One-to-one, onto, inverses and composition',
  covers: 'Injective, surjective and bijective maps, the inverse map, composition, associativity, g∘f = e ⇒ f injective and g surjective',
  minutes: 16,
  sections: [
    {
      name: 'Classifying mappings',
      terms: [
        ['Injective (one-to-one)', '$f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$: different inputs give different outputs.'],
        ['Surjective (onto)', '$f(X) = Y$: every $y \\in Y$ is the image of some $x$.'],
        ['Bijective', 'Both injective and surjective. Exactly then $f$ has an inverse $f^{-1} : Y \\to X$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Functions and mappings · Lesson 2',
          title: 'Two questions about any map',
          body: 'For $f : X \\to Y$ ask:\n\n**1. Do different inputs ever share an output?** If never, $f$ is ==injective== (one-to-one): $f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$.\n\n**2. Is every $y$ in the codomain hit?** If yes, $f$ is ==surjective== (onto): $f(X) = Y$.\n\nBoth together: ==bijective==.',
          cta: 'Test some maps',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'The horizontal-line test',
          title: 'Count how often each height is reached',
          body: 'Each $f : \\mathbb{R} \\to \\mathbb{R}$. Slide the height $c$. Injective means **at most one** crossing for every $c$; onto $\\mathbb{R}$ means **at least one** for every $c$.',
          graph: {
            x: [-2.5, 2.5], y: [-3.2, 3.2], xs: [[-2], [0], [2]], ys: [[-3], [0], [3]],
            views: ['x²', 'x³', 'eˣ'],
            param: { label: 'height $c$', min: -3, max: 3, step: 0.5, value: 1 },
            curves: [{ f: (x, c, v) => FNS[v](x) }],
            segs: [{ at: (c) => [-2.5, c, 2.5, c], kind: 'guide' }],
            dots: [0, 1].map((i) => ({ kind: 'ok', show: (c, v) => sols(c, v).length > i, at: (c, v) => [sols(c, v)[i] ?? 0, c] })),
            read: (c, v) => {
              const k = sols(c, v).length;
              const verdict = ['$x^2$: not injective (two crossings for $c > 0$), not onto (none for $c < 0$).', '$x^3$: exactly one crossing at every height, so **bijective**.', '$e^x$: at most one crossing (injective) but none for $c \\le 0$, so not onto $\\mathbb{R}$.'][v];
              return `$c = ${c}$: ${k} crossing${k === 1 ? '' : 's'}. ${verdict}`;
            },
            need: 5,
            action: 'Try several heights for each function',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Which change makes $f(x) = x^2$ bijective?',
          options: [
            { text: 'Take $f : [0, \\infty) \\to [0, \\infty)$', correct: true, why: 'Now each $y \\ge 0$ has exactly one preimage, $\\sqrt y$. Changing the domain and codomain changes the function.' },
            { text: 'Take $f : \\mathbb{R} \\to [0, \\infty)$', why: 'Onto, but $f(-1) = f(1)$: still not injective.' },
            { text: 'Take $f : [0, \\infty) \\to \\mathbb{R}$', why: 'Injective, but negative numbers are never hit.' },
            { text: 'Nothing can: squaring is never bijective', why: 'With the right domain and codomain it is.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The inverse',
          title: 'Only bijections can be undone',
          body: 'If $f : X \\to Y$ is bijective, define $f^{-1} : Y \\to X$ by $f^{-1}(y) = x$ where $f(x) = y$.\n\n**Surjectivity** guarantees such an $x$ exists; **injectivity** guarantees it is unique. So $f^{-1}$ is well defined, it is itself bijective, and $(f^{-1})^{-1} = f$.',
        },
        {
          type: 'bridge',
          title: 'Classification: set.',
          recap: ['Injective: no two inputs share an output.', 'Surjective: every target is hit.', 'Bijective ⇔ invertible.'],
          why: 'Next: chaining maps together.',
        },
      ],
    },
    {
      name: 'Composition',
      terms: [
        ['Composition $g \\circ f$', 'For $f : X \\to Y$ and $g : Y \\to Z$, $(g \\circ f)(x) = g(f(x))$, a map $X \\to Z$.'],
        ['Identity mapping $e_X$', '$e_X(x) = x$ for all $x \\in X$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Definition',
          title: 'First $f$, then $g$',
          body: 'If $f : X \\to Y$ and $g : Y \\to Z$, the ==composition== $g \\circ f : X \\to Z$ is\n$$(g \\circ f)(x) = g(f(x)).$$\nComposition is **associative**: $h \\circ (g \\circ f) = (h \\circ g) \\circ f$, since both send $x$ to $h(g(f(x)))$.\n\nIt is **not commutative**: with $f(x) = x + 1$ and $g(x) = x^2$, $g(f(x)) = (x + 1)^2$ but $f(g(x)) = x^2 + 1$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'With $f(x) = 2x$ and $g(x) = x + 3$, what is $(f \\circ g)(1)$?',
          options: [
            { text: '$8$', correct: true, why: 'Inside first: $g(1) = 4$, then $f(4) = 8$.' },
            { text: '$5$', why: 'That is $(g \\circ f)(1) = g(2) = 5$: the order matters.' },
            { text: '$6$', why: '$f \\circ g$ applies $g$ first.' },
            { text: '$4$', why: 'That is only $g(1)$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'A lemma examiners like',
          title: 'If $g \\circ f = e_X$, then $f$ is injective and $g$ is surjective',
          body: 'Let $f : X \\to Y$, $g : Y \\to X$ with $g \\circ f = e_X$.\n\n**$g$ is surjective:** for any $x \\in X$, $x = e_X(x) = g(f(x))$, so $x$ is the image of $f(x)$ under $g$.\n\n**$f$ is injective:** if $x_1 \\ne x_2$ then $e_X(x_1) \\ne e_X(x_2)$, so $g(f(x_1)) \\ne g(f(x_2))$, which forces $f(x_1) \\ne f(x_2)$.\n\n**Consequence:** $f$ and $g$ are mutually inverse bijections if and only if $g \\circ f = e_X$ **and** $f \\circ g = e_Y$.',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the steps of “$f \\circ g$ is injective when $f$ and $g$ are injective” in order.',
          items: [
            'Suppose $(f \\circ g)(x_1) = (f \\circ g)(x_2)$.',
            'Then $f(g(x_1)) = f(g(x_2))$.',
            'Since $f$ is injective, $g(x_1) = g(x_2)$.',
            'Since $g$ is injective, $x_1 = x_2$.',
            'Hence $f \\circ g$ is injective.',
          ],
          explain: 'Peel off the outer function first, then the inner one.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Define injective, surjective and bijective; when does $f^{-1}$ exist?',
          body: 'A mapping $f : X \\to Y$ is\n\n(i) **injective** if for any $x_1, x_2 \\in X$, $f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$;\n\n(ii) **surjective** if $f(X) = Y$, i.e. every $y \\in Y$ equals $f(x)$ for some $x \\in X$;\n\n(iii) **bijective** if it is both.\n\nIf $f$ is bijective, there is a well-defined mapping $f^{-1} : Y \\to X$ with $f^{-1}(y) = x \\iff f(x) = y$ (existence by surjectivity, uniqueness by injectivity). $f^{-1}$ is bijective and $f^{-1} \\circ f = e_X$, $f \\circ f^{-1} = e_Y$.',
        },
        {
          type: 'finish',
          title: 'Mappings: classified.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
