// MTH 210 · Vector Calculus · Exam practice: worked exam-style questions on chapter 5.
export default {
  id: 'exam-calculus',
  title: 'Exam practice: vector calculus',
  covers: 'Exam-style questions: gradient and directional derivative, greatest rate of change, divergence and curl at a point, solenoidal constants, irrotational constants and the potential, identities',
  minutes: 16,
  sections: [
    {
      name: 'Gradient questions',
      terms: [
        ['Directional derivative', '$\\nabla\\phi \\cdot \\hat a$ with a **unit** vector.'],
        ['Greatest rate', '$\\|\\nabla\\phi\\|$, in the direction of $\\nabla\\phi$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'Let $\\phi = x^2yz - 4xyz^2$. Find the directional derivative of $\\phi$ at $P(1, 3, 1)$ in the direction $2\\vec i - \\vec j - 2\\vec k$.',
          body: '**Step 1 · Gradient.** $\\nabla\\phi = (2xyz - 4yz^2,\\ x^2z - 4xz^2,\\ x^2y - 8xyz)$.\n\n**Step 2 · At $P$.** $(6 - 12,\\ 1 - 4,\\ 3 - 24) = (-6, -3, -21)$.\n\n**Step 3 · Unit vector.** $\\hat a = \\frac{(2, -1, -2)}{\\sqrt{4 + 1 + 4}} = \\frac13(2, -1, -2)$.\n\n**Step 4 · Dot.** $D_{\\vec a}\\phi = \\frac13(-12 + 3 + 42) = \\frac{33}{3} = 11$.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'For $\\phi = x^2 + y^2 + xz$ at $(2, -1, 3)$, the directional derivative along $\\vec i + 2\\vec j + \\vec k$ is',
          options: [
            { text: '$\\frac{5}{\\sqrt6}$', correct: true, why: '$\\nabla\\phi = (7, -2, 2)$, and $(7 - 4 + 2)/\\sqrt6$.' },
            { text: '$5$', why: 'Divide by $\\|(1, 2, 1)\\| = \\sqrt6$.' },
            { text: '$\\sqrt6$', why: 'The $z$-component of $\\nabla\\phi$ is $x = 2$, not $z$.' },
            { text: '$\\frac{9}{\\sqrt6}$', why: 'Check the $\\vec j$ term: $(-2)(2) = -4$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'Let $\\phi = x^2y^3z^6$. (a) In what direction from $P(1, 1, 1)$ is the rate of change of $\\phi$ greatest? (b) What is that rate?',
          body: '$\\nabla\\phi = (2xy^3z^6,\\ 3x^2y^2z^6,\\ 6x^2y^3z^5)$, so $\\nabla\\phi(1, 1, 1) = (2, 3, 6)$.\n\n**(a)** Direction $2\\vec i + 3\\vec j + 6\\vec k$ (unit vector $\\frac17(2, 3, 6)$).\n\n**(b)** Greatest rate $= \\sqrt{4 + 9 + 36} = 7$.',
        },
        {
          type: 'bridge',
          title: 'Gradient questions: practised.',
          recap: ['Gradient → evaluate → unit vector → dot.'],
          why: 'Now divergence and curl.',
        },
      ],
    },
    {
      name: 'Divergence and curl questions',
      terms: [
        ['Potential', 'Integrate $F_1$ in $x$, then fix the "constants" with $F_2$ and $F_3$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'For $\\vec A = x^2z^2\\vec i - 2y^2z^2\\vec j + xy^2z\\vec k$, find $\\nabla \\cdot \\vec A$ and $\\nabla \\times \\vec A$ at $(1, -1, 1)$.',
          body: '**Divergence.** $2xz^2 - 4yz^2 + xy^2 \\to 2 + 4 + 1 = 7$.\n\n**Curl.**\n$\\vec i$: $\\frac{\\partial}{\\partial y}(xy^2z) - \\frac{\\partial}{\\partial z}(-2y^2z^2) = 2xyz + 4y^2z$.\n$\\vec j$: $-\\left[\\frac{\\partial}{\\partial x}(xy^2z) - \\frac{\\partial}{\\partial z}(x^2z^2)\\right] = -(y^2z - 2x^2z)$.\n$\\vec k$: $\\frac{\\partial}{\\partial x}(-2y^2z^2) - \\frac{\\partial}{\\partial y}(x^2z^2) = 0$.\n\nAt $(1, -1, 1)$: $\\nabla \\times \\vec A = 2\\vec i + \\vec j$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Find $\\alpha, \\beta, \\gamma$ so that $\\vec V = (-4x - 3y + \\alpha z)\\vec i + (\\beta x + 3y + 5z)\\vec j + (4x + \\gamma y + 3z)\\vec k$ is irrotational, and find $\\phi$ with $\\vec V = \\nabla\\phi$.',
          body: '$\\nabla \\times \\vec V = \\vec i(\\gamma - 5) - \\vec j(4 - \\alpha) + \\vec k(\\beta + 3) = \\vec 0$, so $\\alpha = 4$, $\\beta = -3$, $\\gamma = 5$.\n\n**Potential.**\n$\\phi = -2x^2 - 3xy + 4xz + g(y, z)$;\n$\\phi_y = -3x + g_y = -3x + 3y + 5z \\Rightarrow g = \\frac32y^2 + 5yz + h(z)$;\n$\\phi_z = 4x + 5y + h\'(z) = 4x + 5y + 3z \\Rightarrow h = \\frac32z^2$.\n$$\\phi = -2x^2 + \\tfrac32y^2 + \\tfrac32z^2 - 3xy + 5yz + 4xz + C.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'A potential for $\\vec F = 2xy\\,\\vec i + x^2\\,\\vec j + 2z\\,\\vec k$ is',
          options: [
            { text: '$\\phi = x^2y + z^2 + C$', correct: true, why: '$\\phi_x = 2xy$, $\\phi_y = x^2$, $\\phi_z = 2z$ ✓.' },
            { text: '$\\phi = x^2y + x^2 + z^2$', why: 'Then $\\phi_x = 2xy + 2x \\ne 2xy$.' },
            { text: '$\\phi = 2xy + x^2 + 2z$', why: 'That adds the components. Integrate instead.' },
            { text: 'None: $\\vec F$ is not conservative', why: '$\\nabla \\times \\vec F = \\vec k(2x - 2x) = \\vec 0$, so it is.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 5',
          title: 'Show that $\\nabla \\cdot \\left(\\dfrac{\\vec r}{r^3}\\right) = 0$ for $\\vec r \\ne \\vec 0$.',
          body: 'With $V_1 = x r^{-3}$:\n$$\\frac{\\partial V_1}{\\partial x} = r^{-3} + x(-3r^{-4})\\frac xr = \\frac{1}{r^3} - \\frac{3x^2}{r^5}.$$\nThe same for $y$ and $z$. Adding:\n$$\\nabla \\cdot \\frac{\\vec r}{r^3} = \\frac{3}{r^3} - \\frac{3(x^2 + y^2 + z^2)}{r^5} = \\frac{3}{r^3} - \\frac{3}{r^3} = 0. \\ \\blacksquare$$',
        },
        {
          type: 'choice',
          eyebrow: 'Quick one',
          prompt: '$\\nabla \\times (\\nabla\\phi)$ for any smooth $\\phi$ is',
          options: [
            { text: '$\\vec 0$', correct: true, why: 'Mixed partial derivatives cancel in pairs.' },
            { text: '$\\nabla^2\\phi$', why: 'That is div grad.' },
            { text: '$0$', why: 'Curl gives a vector: $\\vec 0$.' },
            { text: '$\\nabla\\phi$', why: 'Curl of a gradient vanishes.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 5 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
