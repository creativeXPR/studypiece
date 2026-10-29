// MAT 222 · Functions and mappings · Lesson 1: what a function is, images, pre-images, relations.

const sq = (x) => x * x;

export default {
  id: 'functions',
  title: 'What a function really is',
  covers: 'Domain and codomain, equal functions, restriction, image and pre-image, characteristic functions, functions as relations',
  minutes: 14,
  sections: [
    {
      name: 'The definition',
      terms: [
        ['Function (mapping) $f : X \\to Y$', 'A rule assigning to each $x \\in X$ exactly one $y = f(x) \\in Y$. $X$ is the domain, $Y$ the codomain, $x$ the argument (independent variable).'],
        ['Equal functions', '$f_1 = f_2$ if they have the same domain $X$ and $f_1(x) = f_2(x)$ for every $x \\in X$.'],
        ['Restriction $f|_A$', 'For $A \\subseteq X$, the function $A \\to Y$ that agrees with $f$ on $A$. $f$ is then an extension of $f|_A$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Functions and mappings · Lesson 1',
          title: 'Three things, not one',
          body: 'We say there is a function defined on $X$ with values in $Y$ if, by some rule $f$, to **each** $x \\in X$ there corresponds **exactly one** $y \\in Y$.\n\nSo a function is really a triple $(X, Y, f)$: the ==domain== $X$, the ==codomain== $Y$ (the set it maps into), and the ==rule== $f$. Change any one of them and you have a different function.',
          cta: 'Why that matters',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Are $f(x) = x^2$ on $\\mathbb{R}$ and $g(x) = x^2$ on $[0, \\infty)$ equal functions?',
          options: [
            { text: 'No: their domains differ', correct: true, why: 'Equal functions need the **same domain** and the same value at every point. $g$ is the restriction $f|_{[0, \\infty)}$.' },
            { text: 'Yes: same formula', why: 'The formula is only one part of the triple. The domains differ.' },
            { text: 'Yes: same values where both are defined', why: 'That makes $g$ a restriction of $f$, not equal to it.' },
            { text: 'Only if $x \\ge 0$', why: 'Equality is about the whole functions, not individual points.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Examples worth knowing',
          title: 'Functions you will meet again',
          cards: [
            { title: 'Characteristic function', text: '$\\chi_E(x) = 1$ if $x \\in E$, $0$ if $x \\notin E$. It turns a set into a function.' },
            { title: 'Projection', text: '$\\Pr_1 : X_1 \\times X_2 \\to X_1$, $(x_1, x_2) \\mapsto x_1$, picks out the first coordinate.' },
            { title: 'Identity', text: '$e_X : X \\to X$, $x \\mapsto x$.' },
            { title: 'Greatest integer', text: '$\\lfloor x \\rfloor$ = the largest integer $\\le x$. It will reappear in integration.' },
          ],
          note: 'Any combination like $6\\chi_{[0,4]} + 4\\chi_{[3,7]}$ is a step function: it takes finitely many constant values.',
        },
        {
          type: 'bridge',
          title: 'The triple: set.',
          recap: ['A function = domain + codomain + rule.', 'Each input gets exactly one output.'],
          why: 'Next: what a function does to whole sets.',
        },
      ],
    },
    {
      name: 'Images, pre-images and relations',
      terms: [
        ['Image $f(A)$', '$f(A) = \\{y \\in Y : y = f(x) \\text{ for some } x \\in A\\}$.'],
        ['Pre-image $f^{-1}(B)$', '$f^{-1}(B) = \\{x \\in X : f(x) \\in B\\}$. Defined for every $f$, even one with no inverse.'],
        ['Relation', 'Any set $R$ of ordered pairs, $R \\subseteq X \\times Y$. A function is a relation in which each $x$ appears in exactly one pair.'],
        ['Equivalence relation', 'A relation that is reflexive ($aRa$), symmetric ($aRb \\Rightarrow bRa$) and transitive ($aRb,\\ bRc \\Rightarrow aRc$).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Definitions',
          title: 'Push a set forward, pull a set back',
          body: 'For $A \\subseteq X$, the ==image== $f(A) = \\{f(x) : x \\in A\\}$: push every point of $A$ through $f$.\n\nFor $B \\subseteq Y$, the ==pre-image== $f^{-1}(B) = \\{x \\in X : f(x) \\in B\\}$: collect every input that lands in $B$.\n\nThe symbol $f^{-1}(B)$ is defined for **every** function, even one that has no inverse.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Image and pre-image of $f(x) = x^2$',
          body: 'In **Image**, the blue strip is $A = [\\frac12, a]$ on the $x$-axis and the yellow band is $f(A)$. In **Pre-image**, the yellow band is $B = [1, b]$ and the blue strips are $f^{-1}(B)$.',
          graph: {
            x: [-2.2, 2.2], y: [-0.3, 4.6], xs: [[-2], [-1], [0], [1], [2]], ys: [[0], [1], [4]],
            views: ['Image f(A)', 'Pre-image f⁻¹(B)'],
            param: { label: 'end point $a$ (or $b$)', min: 1, max: 2, step: 0.1, value: 1.5 },
            curves: [{ f: sq }],
            rects: [
              { kind: 'strip', show: (p, v) => v === 0, at: (p) => [[0.5, 4.6, p - 0.5, 4.9]] },
              { kind: 'band', show: (p, v) => v === 0, at: (p) => [[-2.2, sq(p), 4.4, sq(p) - 0.25]] },
              { kind: 'band', show: (p, v) => v === 1, at: (p) => [[-2.2, p * p, 4.4, p * p - 1]] },
              { kind: 'strip', show: (p, v) => v === 1, at: (p) => [[1, 4.6, p - 1, 4.9], [-p, 4.6, p - 1, 4.9]] },
            ],
            read: (p, v) => (v === 0
              ? `$f([\\tfrac12, ${p}]) = [\\tfrac14, ${sq(p).toFixed(2)}]$`
              : `$B = [1, ${(p * p).toFixed(2)}]$ gives $f^{-1}(B) = [-${p}, -1] \\cup [1, ${p}]$: two pieces, because $x^2$ is not one-to-one.`),
            need: 4,
            action: 'Move the slider in both views',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $f(x) = x^2$ on $\\mathbb{R}$, what is $f^{-1}([-4, -1])$?',
          options: [
            { text: '$\\emptyset$', correct: true, why: 'No real $x$ has $x^2$ negative, so no input lands in $[-4, -1]$.' },
            { text: '$[-2, -1]$', why: 'That would be inputs; check their outputs: $(-2)^2 = 4$, not in $[-4, -1]$.' },
            { text: '$[1, 2]$', why: 'Those outputs are $[1, 4]$, which is not in $[-4, -1]$.' },
            { text: 'It is undefined because $f$ has no inverse', why: 'Pre-images exist for every function.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Functions as relations',
          title: 'A function is a special set of pairs',
          body: 'A ==relation== $R$ is any set of ordered pairs $(x, y)$; we write $xRy$ for $(x, y) \\in R$. If $R \\subseteq X^2$ we say $R$ is a relation **on** $X$.\n\nA function is a relation where every $x$ in the domain appears in **exactly one** pair.\n\nExample: the diagonal $\\Delta = \\{(a, b) \\in X^2 : a = b\\}$ is the relation of equality. Parallelism of lines is reflexive, symmetric and transitive: an ==equivalence relation==.',
        },
        {
          type: 'sort',
          eyebrow: 'Sort the properties',
          prompt: 'Which property is each statement?',
          buckets: [
            { id: 'r', label: 'Reflexive' },
            { id: 's', label: 'Symmetric' },
            { id: 't', label: 'Transitive' },
          ],
          items: [
            { text: '$aRa$ for every $a$', bucket: 'r', why: '**Reflexive**: everything relates to itself.' },
            { text: '$aRb \\Rightarrow bRa$', bucket: 's', why: '**Symmetric**: the relation runs both ways.' },
            { text: '$aRb$ and $bRc \\Rightarrow aRc$', bucket: 't', why: '**Transitive**: it chains.' },
            { text: 'Every line is parallel to itself', bucket: 'r', why: '**Reflexive.**' },
            { text: 'If $a \\parallel b$ and $b \\parallel c$ then $a \\parallel c$', bucket: 't', why: '**Transitive.**' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Define a function, its image and the pre-image of a set',
          body: 'Let $X$ and $Y$ be sets. A function (mapping) $f : X \\to Y$ is a rule that assigns to each $x \\in X$ exactly one element $f(x) \\in Y$; $X$ is its domain and $Y$ its codomain. Equivalently, it is a relation $f \\subseteq X \\times Y$ such that each $x \\in X$ appears in exactly one pair.\n\nFor $A \\subseteq X$, the image of $A$ is $f(A) = \\{f(x) : x \\in A\\}$. For $B \\subseteq Y$, the pre-image of $B$ is $f^{-1}(B) = \\{x \\in X : f(x) \\in B\\}$.',
        },
        {
          type: 'finish',
          title: 'Functions: defined.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
