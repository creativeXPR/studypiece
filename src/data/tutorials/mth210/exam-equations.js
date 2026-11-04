// MTH 210 · Vector Equations · Exam practice, including the two vector-equation questions from a
// first test.
export default {
  id: 'exam-equations',
  title: 'Exam practice: vector equations',
  covers: 'Exam-style questions: simultaneous vector equations, show that a · b = 0, unique and general solutions of cross product equations',
  minutes: 14,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['x · (x × y) = 0', '$\\vec x \\times \\vec y$ is perpendicular to both $\\vec x$ and $\\vec y$, so both dot products with it vanish.'],
        ['Unique x', '$\\vec x \\cdot \\vec a = k$ and $\\vec x \\times \\vec a = \\vec b$ give $\\vec x = \\dfrac{k\\vec a + \\vec a \\times \\vec b}{\\|\\vec a\\|^2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1 · from a first test',
          title: 'Solve for $\\vec x$: $3\\vec x - 2\\vec y = 4\\vec i - \\vec j + 5\\vec k$ and $\\vec x + \\vec y = 3\\vec i + 2\\vec j - \\vec k$.',
          body: '**Step 1 · Eliminate $\\vec y$.** Twice the second equation: $2\\vec x + 2\\vec y = 6\\vec i + 4\\vec j - 2\\vec k$. Add the first:\n$$5\\vec x = 10\\vec i + 3\\vec j + 3\\vec k \\Rightarrow \\vec x = 2\\vec i + \\tfrac35\\vec j + \\tfrac35\\vec k.$$\n**Step 2 · Find $\\vec y$ too.** $\\vec y = (3\\vec i + 2\\vec j - \\vec k) - \\vec x = \\vec i + \\frac75\\vec j - \\frac85\\vec k$.\n\n**Step 3 · Check** in the first equation: $3\\vec x - 2\\vec y = (6 - 2)\\vec i + \\left(\\frac95 - \\frac{14}{5}\\right)\\vec j + \\left(\\frac95 + \\frac{16}{5}\\right)\\vec k = 4\\vec i - \\vec j + 5\\vec k$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Solve $2\\vec x + \\vec y = 5\\vec i + \\vec j$ and $\\vec x - 2\\vec y = \\vec i - 7\\vec j$ for $\\vec y$.',
          options: [
            { text: '$\\vec y = \\frac35\\vec i + 3\\vec j$', correct: true, why: '$\\vec x = \\frac{11}{5}\\vec i - \\vec j$, then $\\vec y = (5\\vec i + \\vec j) - 2\\vec x$.' },
            { text: '$\\vec y = \\frac{11}{5}\\vec i - \\vec j$', why: 'That is $\\vec x$.' },
            { text: '$\\vec y = 3\\vec i + \\frac35\\vec j$', why: 'Check the components: $5 - \\frac{22}{5} = \\frac35$ for $\\vec i$.' },
            { text: '$\\vec y = -\\frac35\\vec i - 3\\vec j$', why: 'Check the signs by substituting back.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2 · from a first test',
          title: 'Given $p\\vec x + q\\vec y = \\vec a$ and $\\vec x \\times \\vec y = \\vec b$, show that $\\vec a \\cdot \\vec b = 0$.',
          body: 'Substitute both equations into $\\vec a \\cdot \\vec b$:\n$$\\vec a \\cdot \\vec b = (p\\vec x + q\\vec y) \\cdot (\\vec x \\times \\vec y) = p\\,\\vec x \\cdot (\\vec x \\times \\vec y) + q\\,\\vec y \\cdot (\\vec x \\times \\vec y).$$\n$\\vec x \\times \\vec y$ is **perpendicular to both** $\\vec x$ and $\\vec y$, so each dot product is $0$ (each is also a scalar triple product with a repeated vector):\n$$\\vec a \\cdot \\vec b = p(0) + q(0) = 0. \\ \\blacksquare$$',
          asides: [{ label: 'Exam tip', text: 'Say **why** each term is zero. A triple product with a repeated vector, like $\\vec x \\cdot (\\vec x \\times \\vec y)$, is always $0$: the box is flat.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Follow-up',
          prompt: 'With $\\vec x \\times \\vec y = \\vec b$, which of these is always $0$?',
          options: [
            { text: '$(2\\vec x - 5\\vec y) \\cdot \\vec b$', correct: true, why: 'Any combination of $\\vec x$ and $\\vec y$ is perpendicular to $\\vec x \\times \\vec y$.' },
            { text: '$\\vec b \\cdot \\vec b$', why: 'That is $\\|\\vec b\\|^2$, zero only if $\\vec b = \\vec 0$.' },
            { text: '$\\vec x \\cdot \\vec y$', why: 'Nothing says $\\vec x \\perp \\vec y$.' },
            { text: '$\\|\\vec x\\|\\|\\vec y\\| - \\|\\vec b\\|$', why: 'That is zero only when $\\vec x \\perp \\vec y$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Find the unique $\\vec x$ with $\\vec x \\cdot (\\vec i + \\vec j) = 3$ and $\\vec x \\times (\\vec i + \\vec j) = \\vec i - \\vec j + 2\\vec k$.',
          body: 'Let $\\vec a = \\vec i + \\vec j$, $\\vec b = \\vec i - \\vec j + 2\\vec k$. Check: $\\vec a \\cdot \\vec b = 1 - 1 + 0 = 0$ ✓.\n\n$\\|\\vec a\\|^2 = 2$ and $\\vec a \\times \\vec b = \\vec i(2) - \\vec j(2) + \\vec k(-1 - 1) = 2\\vec i - 2\\vec j - 2\\vec k$.\n$$\\vec x = \\frac{3\\vec a + \\vec a \\times \\vec b}{\\|\\vec a\\|^2} = \\frac{(3, 3, 0) + (2, -2, -2)}{2} = \\tfrac52\\vec i + \\tfrac12\\vec j - \\vec k.$$\nCheck: $\\vec x \\cdot \\vec a = \\frac52 + \\frac12 = 3$ ✓.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Does $\\vec x \\times (2\\vec i - \\vec j + \\vec k) = \\vec i + 3\\vec j + \\vec k$ have a solution? If so, find the general solution.',
          body: '$\\vec a = (2, -1, 1)$, $\\vec b = (1, 3, 1)$: $\\vec a \\cdot \\vec b = 2 - 3 + 1 = 0$, so **yes**.\n\n$\\|\\vec a\\|^2 = 6$ and $\\vec a \\times \\vec b = \\vec i(-1 - 3) - \\vec j(2 - 1) + \\vec k(6 + 1) = (-4, -1, 7)$.\n$$\\vec x = \\tfrac16(-4\\vec i - \\vec j + 7\\vec k) + \\lambda(2\\vec i - \\vec j + \\vec k), \\quad \\lambda \\in \\mathbb R.$$\nCheck ($\\lambda = 0$): $\\frac16(-4, -1, 7) \\times (2, -1, 1) = \\frac16(6, 18, 6) = (1, 3, 1)$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'The general solution of $\\vec x \\times \\vec k = \\vec i$ is',
          options: [
            { text: '$\\vec x = \\vec j + \\lambda\\vec k$', correct: true, why: 'With $\\vec a = \\vec k$, $\\vec b = \\vec i$: $\\dfrac{\\vec a \\times \\vec b}{\\|\\vec a\\|^2} = \\vec k \\times \\vec i = \\vec j$. Check: $\\vec j \\times \\vec k = \\vec i$ ✓.' },
            { text: '$\\vec x = -\\vec j + \\lambda\\vec k$', why: 'Check: $(-\\vec j) \\times \\vec k = -\\vec i$, the wrong sign.' },
            { text: '$\\vec x = \\vec i + \\lambda\\vec k$', why: '$\\vec i \\times \\vec k = -\\vec j$.' },
            { text: 'No solution', why: '$\\vec k \\cdot \\vec i = 0$, so it is solvable.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 3 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
