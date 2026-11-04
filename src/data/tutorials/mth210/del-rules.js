// MTH 210 · Vector Calculus · Lesson 3: identities of del, the Laplacian, second derivatives,
// special cases, the four types of vector fields and Helmholtz's theorem.
const TYPES = [
  { F: (x, y) => [x, -y], name: '(x, -y)', tag: 'Solenoidal **and** irrotational', why: '$\\nabla \\cdot \\vec F = 1 - 1 = 0$ and $\\nabla \\times \\vec F = \\vec 0$. Then $\\vec F = \\nabla\\phi$ with $\\nabla^2\\phi = 0$: **Laplace**.' },
  { F: (x, y) => [x, y], name: '(x, y)', tag: 'Irrotational, **not** solenoidal', why: '$\\nabla \\times \\vec F = \\vec 0$ but $\\nabla \\cdot \\vec F = 2$. Then $\\vec F = \\nabla u$ with $\\nabla^2 u \\ne 0$: **Poisson**.' },
  { F: (x, y) => [-y, x], name: '(-y, x)', tag: 'Solenoidal, **not** irrotational', why: '$\\nabla \\cdot \\vec F = 0$ but $\\nabla \\times \\vec F = 2\\vec k$. Then $\\vec F = \\nabla \\times \\vec A$ (a vector potential).' },
  { F: (x, y) => [x - y, x + y], name: '(x - y, x + y)', tag: '**Neither**', why: '$\\nabla \\cdot \\vec F = 2$ and $\\nabla \\times \\vec F = 2\\vec k$: the general case $\\vec F = \\nabla\\phi + \\nabla \\times \\vec u$.' },
];

export default {
  id: 'del-rules',
  title: 'Del rules and types of fields',
  covers: 'Product rules for div and curl, ∇ · (A × B), the Laplacian and harmonic functions, curl grad = 0, div curl = 0, curl curl, special cases, the four types of vector fields with examples, Helmholtz',
  minutes: 17,
  sections: [
    {
      name: 'Identities',
      terms: [
        ['Sums', '$\\nabla$ of a sum is the sum: for grad, div and curl.'],
        ['Product rules', '$\\nabla \\cdot (\\phi\\vec A) = \\nabla\\phi \\cdot \\vec A + \\phi\\,\\nabla \\cdot \\vec A$; $\\nabla \\times (\\phi\\vec A) = \\nabla\\phi \\times \\vec A + \\phi\\,\\nabla \\times \\vec A$.'],
        ['Div of a cross', '$\\nabla \\cdot (\\vec A \\times \\vec B) = \\vec B \\cdot (\\nabla \\times \\vec A) - \\vec A \\cdot (\\nabla \\times \\vec B)$.'],
        ['Laplacian', '$\\nabla^2\\phi = \\nabla \\cdot \\nabla\\phi = \\phi_{xx} + \\phi_{yy} + \\phi_{zz}$; harmonic means $\\nabla^2\\phi = 0$.'],
        ['Second derivatives', '$\\nabla \\times \\nabla\\phi = \\vec 0$; $\\nabla \\cdot (\\nabla \\times \\vec A) = 0$; $\\nabla \\times (\\nabla \\times \\vec A) = \\nabla(\\nabla \\cdot \\vec A) - \\nabla^2\\vec A$.'],
        ['Facts about r', '$\\nabla \\cdot \\vec r = 3$, $\\nabla \\times \\vec r = \\vec 0$, $(\\vec B \\cdot \\nabla)\\vec r = \\vec B$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Vector Calculus · Lesson 3',
          title: 'The rules you will be asked to use',
          cards: [
            { title: 'div grad', text: '$\\nabla \\cdot \\nabla\\phi = \\nabla^2\\phi$, the **Laplacian**.' },
            { title: 'curl grad', text: '$\\nabla \\times \\nabla\\phi = \\vec 0$: gradients never swirl.' },
            { title: 'div curl', text: '$\\nabla \\cdot (\\nabla \\times \\vec A) = 0$: curls never spread.' },
            { title: 'div of φA', text: '$\\nabla\\phi \\cdot \\vec A + \\phi\\,\\nabla \\cdot \\vec A$, like the product rule.' },
            { title: 'div of A × B', text: '$\\vec B \\cdot (\\nabla \\times \\vec A) - \\vec A \\cdot (\\nabla \\times \\vec B)$.' },
          ],
          asides: [{ label: 'Note', text: 'Why curl grad $= \\vec 0$: each component is like $\\phi_{zy} - \\phi_{yz}$, which is $0$ because mixed partials are equal (Clairaut).' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'If $\\vec F$ and $\\vec G$ are irrotational, show $\\vec F \\times \\vec G$ is solenoidal',
          body: 'Use the div-of-a-cross rule:\n$$\\nabla \\cdot (\\vec F \\times \\vec G) = \\vec G \\cdot (\\nabla \\times \\vec F) - \\vec F \\cdot (\\nabla \\times \\vec G) = \\vec G \\cdot \\vec 0 - \\vec F \\cdot \\vec 0 = 0.$$\nSo $\\vec F \\times \\vec G$ is solenoidal. $\\blacksquare$',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Given $\\phi = 6x^3y^2z$, find $\\nabla^2\\phi$',
          body: '$\\nabla\\phi = (18x^2y^2z,\\ 12x^3yz,\\ 6x^3y^2)$, so\n$$\\nabla^2\\phi = \\nabla \\cdot \\nabla\\phi = 36xy^2z + 12x^3z + 0.$$\nAnd $\\frac1r$ is **harmonic**: $\\nabla^2\\frac1r = \\nabla \\cdot \\left(-\\frac{\\vec r}{r^3}\\right) = 0$ for $\\vec r \\ne \\vec 0$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'If $\\nabla \\times \\vec A = \\vec 0$, then $\\nabla \\cdot (\\vec A \\times \\vec r) = $',
          options: [
            { text: '$0$', correct: true, why: '$\\vec r \\cdot (\\nabla \\times \\vec A) - \\vec A \\cdot (\\nabla \\times \\vec r) = 0 - 0$, since $\\nabla \\times \\vec r = \\vec 0$.' },
            { text: '$3$', why: '$\\nabla \\cdot \\vec r = 3$, but this needs the div-of-a-cross rule.' },
            { text: '$\\vec A \\cdot \\vec r$', why: 'Both terms in the rule vanish.' },
            { text: '$\\vec 0$', why: 'A divergence is a scalar: $0$, not $\\vec 0$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Identities: set.',
          recap: ['curl grad $= \\vec 0$ and div curl $= 0$.', 'div grad is the Laplacian $\\nabla^2$.'],
          why: 'These two facts sort every field into one of four types.',
        },
      ],
    },
    {
      name: 'Types of vector fields',
      terms: [
        ['Solenoidal and irrotational', '$\\vec V = \\nabla\\phi$ with $\\nabla^2\\phi = 0$ (Laplace). E.g. electrostatic and gravitational fields in free space.'],
        ['Irrotational, not solenoidal', '$\\vec V = \\nabla u$ with $\\nabla^2 u \\ne 0$ (Poisson). E.g. the electrostatic field in a charged medium.'],
        ['Solenoidal, not irrotational', '$\\vec V = \\nabla \\times \\vec A$. E.g. the magnetic field in a conductor with a steady current; an incompressible fluid rotating.'],
        ['Neither', '$\\vec V = \\nabla\\phi + \\nabla \\times \\vec u$. E.g. a compressible liquid with rotation.'],
        ['Helmholtz', 'Any smooth field = an irrotational part $\\nabla\\phi$ + a solenoidal part $\\nabla \\times \\vec u$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'field',
          eyebrow: 'See it',
          title: 'Four types of field',
          body: 'One example of each type. Look for spreading (divergence) and swirling (curl).',
          graph: {
            x: [-3, 3], y: [-2.2, 2.2], n: 11,
            views: ['Both', 'Irrot.', 'Solen.', 'Neither'],
            F: (x, y, P, v) => TYPES[v].F(x, y),
            read: (P, v) => `$\\vec F = ${TYPES[v].name}$: ${TYPES[v].tag}. ${TYPES[v].why}`,
            need: 4,
            action: 'Look at all four types',
          },
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which are true?',
          options: [
            { text: 'A magnetic field $\\vec B = \\nabla \\times \\vec A$ has zero divergence.', correct: true, why: 'div curl $= 0$: no magnetic monopoles.' },
            { text: 'An electrostatic field $\\vec E = -\\nabla V$ has zero curl.', correct: true, why: 'curl grad $= \\vec 0$.' },
            { text: 'A field that is solenoidal and irrotational has a potential satisfying Laplace’s equation.', correct: true, why: '$\\vec V = \\nabla\\phi$ and $\\nabla \\cdot \\nabla\\phi = \\nabla^2\\phi = 0$.' },
            { text: 'Every field is either solenoidal or irrotational.', why: 'Some are **neither**; Helmholtz splits them into the two parts.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Classify $\\vec F = 3y^4z^2\\vec i + 4x^3z^2\\vec j - 3x^2y^2\\vec k$ using its divergence.',
          options: [
            { text: 'Solenoidal: $\\nabla \\cdot \\vec F = 0$', correct: true, why: 'Each component does not contain its own variable: $0 + 0 + 0$.' },
            { text: 'Not solenoidal: $\\nabla \\cdot \\vec F = 12y^3z^2$', why: 'Differentiate $3y^4z^2$ with respect to $x$, not $y$.' },
            { text: 'Irrotational, because the divergence is $0$', why: 'Irrotational is about the **curl**.' },
            { text: 'It cannot be classified', why: 'Compute $\\nabla \\cdot \\vec F$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Del rules and field types: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
