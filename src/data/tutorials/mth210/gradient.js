// MTH 210 · Vector Calculus · Lesson 1: scalar and vector fields, the operator del, the gradient,
// the directional derivative, the greatest rate of change and gradients of functions of r.
import { num } from './vec';

const PHI = [
  { f: (x, y) => x * x + y * y, g: (x, y) => [2 * x, 2 * y], tex: 'x^2 + y^2', grad: '(2x, 2y)' },
  { f: (x, y) => x * y, g: (x, y) => [y, x], tex: 'xy', grad: '(y, x)' },
  { f: (x, y) => x + 2 * y, g: () => [1, 2], tex: 'x + 2y', grad: '(1, 2)' },
];

export default {
  id: 'gradient',
  title: 'Fields, del and the gradient',
  covers: 'Scalar and vector fields, the operator del, grad φ, the directional derivative with a unit vector, the direction and size of the greatest rate of change, gradients of r², 1/r, ln r and rⁿ',
  minutes: 17,
  sections: [
    {
      name: 'Fields and the gradient',
      terms: [
        ['Scalar field', '$\\phi(x, y, z)$: a number at every point, e.g. temperature, pressure, potential.'],
        ['Vector field', '$\\vec F(x, y, z) = F_1\\vec i + F_2\\vec j + F_3\\vec k$: a vector at every point, e.g. velocity, force.'],
        ['Del', '$\\nabla = \\vec i\\dfrac{\\partial}{\\partial x} + \\vec j\\dfrac{\\partial}{\\partial y} + \\vec k\\dfrac{\\partial}{\\partial z}$, a vector operator.'],
        ['Gradient', '$\\nabla\\phi = \\dfrac{\\partial\\phi}{\\partial x}\\vec i + \\dfrac{\\partial\\phi}{\\partial y}\\vec j + \\dfrac{\\partial\\phi}{\\partial z}\\vec k$: a vector field from a scalar field.'],
        ['Meaning of grad', '$\\nabla\\phi$ points where $\\phi$ increases fastest, at right angles to the level curves; $\\|\\nabla\\phi\\|$ is that fastest rate.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Vector Calculus · Lesson 1',
          title: 'A number everywhere, or an arrow everywhere',
          body: 'A ==scalar field== gives a number at each point (the temperature in a room). A ==vector field== gives an arrow at each point (the wind).\n\nThe operator ==del== turns one into the other:\n$$\\nabla\\phi = \\frac{\\partial\\phi}{\\partial x}\\vec i + \\frac{\\partial\\phi}{\\partial y}\\vec j + \\frac{\\partial\\phi}{\\partial z}\\vec k.$$\nThis is the ==gradient==: an arrow pointing **uphill**.',
          cta: 'See the hill',
        },
        {
          type: 'custom',
          widget: 'field',
          eyebrow: 'See it',
          title: 'Gradient arrows point uphill, across the level curves',
          body: 'Shading shows $\\phi$ (darker = bigger); the thin lines are level curves $\\phi = $ constant. The arrows are $\\nabla\\phi$. Tap anywhere to read the gradient there.',
          graph: {
            x: [-3, 3], y: [-2.2, 2.2], n: 11,
            views: ['x² + y²', 'xy', 'x + 2y'],
            phi: (x, y, P, v) => PHI[v].f(x, y),
            F: (x, y, P, v) => PHI[v].g(x, y),
            probe: [1, 1],
            probeArrow: (x, y, P, v) => PHI[v].g(x, y),
            read: (P, v, p) => {
              const g = PHI[v].g(p[0], p[1]);
              return `$\\phi = ${PHI[v].tex}$, $\\nabla\\phi = ${PHI[v].grad}$. At $(${num(p[0])}, ${num(p[1])})$: $\\nabla\\phi = (${num(g[0])}, ${num(g[1])})$, rate $\\|\\nabla\\phi\\| \\approx ${num(Math.hypot(...g))}$`;
            },
            need: 4,
            action: 'Tap a few points and try each field',
          },
          asides: [{ label: 'Note', text: 'Where the level curves bunch together, the hill is steep and the arrows are long.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$\\phi = 3x^2y - y^3z^2$. Find $\\nabla\\phi$ at $(1, -2, -1)$',
          body: 'Differentiate with respect to each variable, holding the others fixed:\n$$\\nabla\\phi = 6xy\\,\\vec i + (3x^2 - 3y^2z^2)\\,\\vec j - 2y^3z\\,\\vec k.$$\nAt $(1, -2, -1)$: $6(1)(-2) = -12$; $3 - 3(4)(1) = -9$; $-2(-8)(-1) = -16$.\n$$\\nabla\\phi = -12\\vec i - 9\\vec j - 16\\vec k.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $\\phi = x^2 + y^2 + xz$, find $\\nabla\\phi$.',
          options: [
            { text: '$(2x + z,\\ 2y,\\ x)$', correct: true, why: '$\\frac{\\partial}{\\partial z}(xz) = x$, and $\\frac{\\partial}{\\partial x}(xz) = z$.' },
            { text: '$(2x + z,\\ 2y,\\ z)$', why: '$\\frac{\\partial}{\\partial z}(xz) = x$, not $z$.' },
            { text: '$(2x,\\ 2y,\\ xz)$', why: 'Differentiate $xz$ with respect to $x$ too: it gives $z$.' },
            { text: '$2x + 2y + x$', why: 'The gradient is a **vector**, one component per variable.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Gradient: set.',
          recap: ['$\\nabla\\phi$ = the vector of partial derivatives.', 'It points uphill, across the level curves.'],
          why: 'Next: the rate of change in any direction you choose.',
        },
      ],
    },
    {
      name: 'Directional derivative',
      terms: [
        ['Directional derivative', '$D_{\\vec a}\\phi = \\nabla\\phi \\cdot \\hat a$, with $\\hat a = \\dfrac{\\vec A}{\\|\\vec A\\|}$ the **unit** vector in the direction $\\vec A$.'],
        ['Greatest rate', 'Largest in the direction of $\\nabla\\phi$; the largest value is $\\|\\nabla\\phi\\|$.'],
        ['Gradients of r', '$\\nabla r^n = n r^{n-2}\\vec r$: $\\nabla r^2 = 2\\vec r$, $\\nabla\\frac1r = -\\dfrac{\\vec r}{r^3}$, $\\nabla\\ln r = \\dfrac{\\vec r}{r^2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Directional derivative',
          title: 'Dot the gradient with a unit vector',
          body: '$$D_{\\vec a}\\phi = \\nabla\\phi \\cdot \\hat a, \\qquad \\hat a = \\frac{\\vec A}{\\|\\vec A\\|}.$$\n**Example.** $\\phi = x^2 + y^2 + xz$ at $P(2, -1, 3)$ in the direction $\\vec A = \\vec i + 2\\vec j + \\vec k$.\n\n$\\nabla\\phi(2, -1, 3) = (4 + 3, -2, 2) = (7, -2, 2)$; $\\hat a = \\frac{1}{\\sqrt6}(1, 2, 1)$.\n$$D_{\\vec a}\\phi = \\frac{7 - 4 + 2}{\\sqrt6} = \\frac{5}{\\sqrt6} \\approx 2.04.$$',
          asides: [{ label: 'Exam tip', text: 'Forgetting to make the direction a **unit** vector is the most common lost mark here.' }],
        },
        {
          type: 'story',
          eyebrow: 'Towards a point',
          title: '$\\phi = 4e^{2x - y + z}$ at $(1, 1, -1)$, towards $(-3, 5, 6)$',
          body: '$\\nabla\\phi = (8, -4, 4)e^{2x - y + z}$; at $(1, 1, -1)$ the exponent is $0$, so $\\nabla\\phi = (8, -4, 4)$.\n\n**Direction = target minus point:** $\\vec A = (-4, 4, 7)$, $\\|\\vec A\\| = 9$.\n$$D_{\\vec a}\\phi = \\frac{-32 - 16 + 28}{9} = -\\frac{20}{9}.$$\nNegative: $\\phi$ **decreases** that way.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: '$\\phi = x^2y^3z^6$. What is the greatest rate of change of $\\phi$ at $(1, 1, 1)$, and in which direction?',
          options: [
            { text: '$7$, along $2\\vec i + 3\\vec j + 6\\vec k$', correct: true, why: '$\\nabla\\phi = (2xy^3z^6, 3x^2y^2z^6, 6x^2y^3z^5) = (2, 3, 6)$ at $(1, 1, 1)$, and $\\sqrt{4 + 9 + 36} = 7$.' },
            { text: '$11$, along $2\\vec i + 3\\vec j + 6\\vec k$', why: '$2 + 3 + 6 = 11$ is not a length. Use $\\sqrt{4 + 9 + 36}$.' },
            { text: '$49$, along $\\vec i + \\vec j + \\vec k$', why: 'The direction is $\\nabla\\phi$, and the rate is its length, not its square.' },
            { text: '$1$, along any direction', why: '$\\phi(1, 1, 1) = 1$, but the rate is $\\|\\nabla\\phi\\|$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Functions of $r$',
          title: 'One rule for all powers of $r$',
          body: 'With $\\vec r = x\\vec i + y\\vec j + z\\vec k$ and $r = \\|\\vec r\\|$: $\\frac{\\partial r}{\\partial x} = \\frac xr$, so $\\nabla r = \\frac{\\vec r}{r}$, and by the chain rule\n$$\\nabla r^n = n r^{n-2}\\vec r.$$\n$n = 2$: $\\nabla r^2 = 2\\vec r$. $n = -1$: $\\nabla\\frac1r = -\\frac{\\vec r}{r^3}$. $n = 3$: $\\nabla r^3 = 3r\\vec r$. Also $\\nabla\\ln r = \\frac{\\vec r}{r^2}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: '$\\nabla\\left(\\dfrac{1}{r^2}\\right) = $',
          options: [
            { text: '$-\\dfrac{2\\vec r}{r^4}$', correct: true, why: '$n = -2$: $-2r^{-4}\\vec r$.' },
            { text: '$-\\dfrac{2\\vec r}{r^3}$', why: 'The power is $n - 2 = -4$.' },
            { text: '$-\\dfrac{2}{r^3}$', why: 'A gradient is a vector: it carries $\\vec r$.' },
            { text: '$\\dfrac{2\\vec r}{r^4}$', why: 'The sign is negative: $1/r^2$ decreases outwards.' },
          ],
        },
        {
          type: 'finish',
          title: 'Fields and the gradient: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
