// MTH 210 · Vector Calculus · Lesson 2: divergence, solenoidal fields, curl, irrotational and
// conservative fields, and finding a scalar potential.
const FIELDS = [
  { F: (x, y) => [x, y], name: '(x, y)', div: '2', curl: '\\vec 0', say: 'Arrows spread **out** from the origin: a source, positive divergence, no swirl.' },
  { F: (x, y) => [-y, x], name: '(-y, x)', div: '0', curl: '2\\vec k', say: 'Arrows go **round**: a swirl, curl $2\\vec k$ (anticlockwise), nothing spreads.' },
  { F: () => [1, 0.5], name: '(1, 0.5)', div: '0', curl: '\\vec 0', say: 'A **uniform** flow: no spreading, no swirl.' },
  { F: (x, y) => [y, 0], name: '(y, 0)', div: '0', curl: '-\\vec k', say: 'A **shear**: layers slide past each other. No spreading, but a paddle wheel would spin (clockwise).' },
];

export default {
  id: 'div-curl',
  title: 'Divergence and curl',
  covers: 'div V = ∇ · V, solenoidal fields, choosing a constant, curl V = ∇ × V by determinant, irrotational fields, conservative fields and the potential φ with F = ∇φ',
  minutes: 18,
  sections: [
    {
      name: 'Divergence',
      terms: [
        ['Divergence', '$\\nabla \\cdot \\vec V = \\dfrac{\\partial V_1}{\\partial x} + \\dfrac{\\partial V_2}{\\partial y} + \\dfrac{\\partial V_3}{\\partial z}$, a **scalar**: how much the field spreads out.'],
        ['Solenoidal', '$\\nabla \\cdot \\vec V = 0$ everywhere: no sources or sinks.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Vector Calculus · Lesson 2',
          title: 'Del dot: does the field spread out?',
          body: 'The ==divergence== of $\\vec V = V_1\\vec i + V_2\\vec j + V_3\\vec k$ is a **number field**:\n$$\\nabla \\cdot \\vec V = \\frac{\\partial V_1}{\\partial x} + \\frac{\\partial V_2}{\\partial y} + \\frac{\\partial V_3}{\\partial z}.$$\nDifferentiate each component by **its own** variable, then add. Positive: a source; negative: a sink; zero everywhere: ==solenoidal==.',
          cta: 'See four fields',
        },
        {
          type: 'custom',
          widget: 'field',
          eyebrow: 'See it',
          title: 'Spreading and swirling',
          body: 'Four flows. Imagine dropping dye (does it spread?) and a tiny paddle wheel (does it spin?).',
          graph: {
            x: [-3, 3], y: [-2.2, 2.2], n: 11,
            views: ['Source', 'Swirl', 'Uniform', 'Shear'],
            F: (x, y, P, v) => FIELDS[v].F(x, y),
            read: (P, v) => `$\\vec F = ${FIELDS[v].name}$: $\\nabla \\cdot \\vec F = ${FIELDS[v].div}$, $\\nabla \\times \\vec F = ${FIELDS[v].curl}$. ${FIELDS[v].say}`,
            need: 4,
            action: 'Look at all four fields',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$\\vec A = x^2z^2\\vec i - 2y^2z^2\\vec j + xy^2z\\vec k$. Find $\\nabla \\cdot \\vec A$ at $(1, -1, 1)$',
          body: '$$\\nabla \\cdot \\vec A = \\frac{\\partial}{\\partial x}(x^2z^2) + \\frac{\\partial}{\\partial y}(-2y^2z^2) + \\frac{\\partial}{\\partial z}(xy^2z) = 2xz^2 - 4yz^2 + xy^2.$$\nAt $(1, -1, 1)$: $2 + 4 + 1 = 7$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\lambda$ so that $\\vec V = (3x - 4y)\\vec i + (3z - 4y)\\vec j + (2x + \\lambda z)\\vec k$ is solenoidal.',
          options: [
            { text: '$\\lambda = 1$', correct: true, why: '$\\nabla \\cdot \\vec V = 3 - 4 + \\lambda = 0$.' },
            { text: '$\\lambda = -1$', why: '$3 + (-4) + \\lambda = 0$ gives $\\lambda = 1$.' },
            { text: '$\\lambda = 7$', why: 'The $y$-component gives $\\frac{\\partial}{\\partial y}(3z - 4y) = -4$, not $+4$.' },
            { text: '$\\lambda = 0$', why: 'Then $\\nabla \\cdot \\vec V = -1 \\ne 0$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Divergence: set.',
          recap: ['$\\nabla \\cdot \\vec V$ is a scalar: each component by its own variable.', 'Solenoidal means $\\nabla \\cdot \\vec V = 0$.'],
          why: 'Now the swirl: the curl.',
        },
      ],
    },
    {
      name: 'Curl and potentials',
      terms: [
        ['Curl', '$\\nabla \\times \\vec V = \\begin{vmatrix}\\vec i & \\vec j & \\vec k \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ V_1 & V_2 & V_3\\end{vmatrix}$, a **vector**: the rotation of the field.'],
        ['Irrotational', '$\\nabla \\times \\vec F = \\vec 0$.'],
        ['Conservative', '$\\vec F = \\nabla\\phi$ for some scalar potential $\\phi$. On a simply connected region: conservative $\\iff$ irrotational.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Curl',
          title: 'Del cross: a determinant again',
          body: '$$\\nabla \\times \\vec V = \\vec i\\left(\\frac{\\partial V_3}{\\partial y} - \\frac{\\partial V_2}{\\partial z}\\right) - \\vec j\\left(\\frac{\\partial V_3}{\\partial x} - \\frac{\\partial V_1}{\\partial z}\\right) + \\vec k\\left(\\frac{\\partial V_2}{\\partial x} - \\frac{\\partial V_1}{\\partial y}\\right).$$\n**Example.** $\\vec A = x^2z^2\\vec i - 2y^2z^2\\vec j + xy^2z\\vec k$:\n$$\\nabla \\times \\vec A = (2xyz + 4y^2z)\\vec i + (2x^2z - y^2z)\\vec j + 0\\,\\vec k.$$\nAt $(1, -1, 1)$: $(-2 + 4)\\vec i + (2 - 1)\\vec j = 2\\vec i + \\vec j$.',
          asides: [{ label: 'Exam tip', text: 'Same minus sign on the $\\vec j$ term as the cross product.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\nabla \\times \\vec V$ for $\\vec V = -y\\vec i + x\\vec j$.',
          options: [
            { text: '$2\\vec k$', correct: true, why: '$\\vec k\\left(\\frac{\\partial x}{\\partial x} - \\frac{\\partial(-y)}{\\partial y}\\right) = \\vec k(1 + 1)$.' },
            { text: '$\\vec 0$', why: 'This is the swirl field: it has curl.' },
            { text: '$0$', why: 'Curl is a vector; and here it is not zero.' },
            { text: '$-2\\vec k$', why: 'It is $\\frac{\\partial V_2}{\\partial x} - \\frac{\\partial V_1}{\\partial y} = 1 - (-1)$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Show $\\vec F = (6xy + z^3)\\vec i + (3x^2 - z)\\vec j + (3xz^2 - y)\\vec k$ is irrotational and find $\\phi$',
          body: '**Curl.** $\\vec i(-1 + 1) - \\vec j(3z^2 - 3z^2) + \\vec k(6x - 6x) = \\vec 0$ ✓. So $\\vec F = \\nabla\\phi$.\n\n**Integrate one component at a time.**\n$\\frac{\\partial\\phi}{\\partial x} = 6xy + z^3 \\Rightarrow \\phi = 3x^2y + xz^3 + g(y, z)$.\n$\\frac{\\partial\\phi}{\\partial y} = 3x^2 + g_y = 3x^2 - z \\Rightarrow g = -yz + h(z)$.\n$\\frac{\\partial\\phi}{\\partial z} = 3xz^2 - y + h\'(z) = 3xz^2 - y \\Rightarrow h = C$.\n$$\\phi = 3x^2y + xz^3 - yz + C.$$',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the method',
          prompt: 'Put the steps for finding a potential $\\phi$ in order.',
          items: [
            'Check $\\nabla \\times \\vec F = \\vec 0$.',
            'Integrate $F_1$ with respect to $x$, adding $g(y, z)$.',
            'Differentiate with respect to $y$, compare with $F_2$, find $g$ up to $h(z)$.',
            'Differentiate with respect to $z$, compare with $F_3$, find $h$.',
            'Write $\\phi$ with a constant $C$.',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\alpha, \\beta, \\gamma$ so that $\\vec V = (-4x - 3y + \\alpha z)\\vec i + (\\beta x + 3y + 5z)\\vec j + (4x + \\gamma y + 3z)\\vec k$ is irrotational.',
          options: [
            { text: '$\\alpha = 4,\\ \\beta = -3,\\ \\gamma = 5$', correct: true, why: '$\\nabla \\times \\vec V = \\vec i(\\gamma - 5) - \\vec j(4 - \\alpha) + \\vec k(\\beta + 3) = \\vec 0$.' },
            { text: '$\\alpha = -4,\\ \\beta = 3,\\ \\gamma = -5$', why: 'Each bracket must be $0$: $\\gamma - 5 = 0$ gives $\\gamma = 5$.' },
            { text: '$\\alpha = 4,\\ \\beta = 3,\\ \\gamma = 5$', why: 'The $\\vec k$ part is $\\beta - (-3) = \\beta + 3$, so $\\beta = -3$.' },
            { text: 'Any values', why: 'The curl depends on all three constants.' },
          ],
        },
        {
          type: 'finish',
          title: 'Divergence and curl: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
