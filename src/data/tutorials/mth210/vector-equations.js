// MTH 210 · Vector Equations · Lesson 1: solving linear vector equations and the standard dot
// and cross tricks (x × a = b, x · a = k with x × a = b, p x + (b · x) a = c).
import { O, add, cross, mul, tup } from './vec';

const A = [1, 1, 1];
const X0 = [1 / 3, 1 / 3, -2 / 3];

export default {
  id: 'vector-equations',
  title: 'Solving vector equations',
  covers: 'Simultaneous vector equations, x × a = b and when it has a solution, the general solution with λ, x · a = k with x × a = b, p x + (b · x) a = c, triple product equations',
  minutes: 18,
  sections: [
    {
      name: 'Linear vector equations',
      terms: [
        ['Linear vector equations', 'Solve like simultaneous equations: multiply and add to eliminate one unknown vector.'],
        ['Check', 'Substitute both answers back into the equation you did not use.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Vector Equations · Lesson 1',
          title: 'Same algebra as $2x + y = 5$',
          body: 'Vectors add and scale like numbers, so pairs of linear equations are solved by **elimination**.\n\n**Example.** Solve $2\\vec x + \\vec y = \\vec a$, $\\vec x - 2\\vec y = \\vec b$ with $\\vec a = 5\\vec i + \\vec j$, $\\vec b = \\vec i - 7\\vec j$.\n\n**Step 1 · Eliminate $\\vec y$.** Twice the first plus the second: $5\\vec x = 2\\vec a + \\vec b = 11\\vec i - 5\\vec j$, so $\\vec x = \\frac{11}{5}\\vec i - \\vec j$.\n**Step 2 · Back-substitute.** $\\vec y = \\vec a - 2\\vec x = \\frac35\\vec i + 3\\vec j$.\n**Step 3 · Check.** $\\vec x - 2\\vec y = \\vec i - 7\\vec j = \\vec b$. ✓',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Solve $\\vec x + \\vec y = 3\\vec i + \\vec j$ and $\\vec x - \\vec y = \\vec i + 5\\vec j$ for $\\vec x$.',
          options: [
            { text: '$\\vec x = 2\\vec i + 3\\vec j$', correct: true, why: 'Add: $2\\vec x = 4\\vec i + 6\\vec j$. Then $\\vec y = \\vec i - 2\\vec j$.' },
            { text: '$\\vec x = 4\\vec i + 6\\vec j$', why: 'That is $2\\vec x$. Divide by $2$.' },
            { text: '$\\vec x = \\vec i - 2\\vec j$', why: 'That is $\\vec y$.' },
            { text: '$\\vec x = 2\\vec i - 4\\vec j$', why: 'Adding the equations removes $\\vec y$: $(3 + 1)\\vec i + (1 + 5)\\vec j$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Elimination: set.',
          recap: ['Linear vector equations: eliminate, solve, back-substitute, check.'],
          why: 'When $\\vec x$ is inside a dot or cross product, we need two tricks.',
        },
      ],
    },
    {
      name: 'Dot and cross tricks',
      terms: [
        ['Trick 1 · dot', 'Dot both sides with a known vector to get a **number** such as $\\vec b \\cdot \\vec x$.'],
        ['Trick 2 · cross', 'Cross both sides with a known vector and expand with BAC − CAB.'],
        ['$\\vec x \\times \\vec a = \\vec b$', 'Has a solution only if $\\vec a \\cdot \\vec b = 0$. Then $\\vec x = \\dfrac{\\vec a \\times \\vec b}{\\|\\vec a\\|^2} + \\lambda\\vec a$, $\\lambda \\in \\mathbb R$.'],
        ['Add $\\vec x \\cdot \\vec a = k$', 'Fixes $\\lambda$: $\\vec x = \\dfrac{k\\vec a + \\vec a \\times \\vec b}{\\|\\vec a\\|^2}$, a unique vector.'],
        ['$p\\vec x + (\\vec b \\cdot \\vec x)\\vec a = \\vec c$', 'Dot with $\\vec b$: $\\vec b \\cdot \\vec x = \\dfrac{\\vec b \\cdot \\vec c}{p + \\vec a \\cdot \\vec b}$, then $\\vec x = \\dfrac{1}{p}\\left(\\vec c - (\\vec b \\cdot \\vec x)\\vec a\\right)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The big one',
          title: 'Solve $\\vec x \\times \\vec a = \\vec b$',
          body: '**Step 1 · Is there a solution?** $\\vec x \\times \\vec a$ is always perpendicular to $\\vec a$, so we need $\\vec a \\cdot \\vec b = 0$. If not, **no solution**.\n\n**Step 2 · Cross with $\\vec a$ on the left.** $\\vec a \\times (\\vec x \\times \\vec a) = \\vec a \\times \\vec b$. By BAC − CAB:\n$$\\vec x(\\vec a \\cdot \\vec a) - \\vec a(\\vec a \\cdot \\vec x) = \\vec a \\times \\vec b.$$\n**Step 3 · Solve.** The number $\\vec a \\cdot \\vec x$ is not fixed, so call it free:\n$$\\vec x = \\frac{\\vec a \\times \\vec b}{\\|\\vec a\\|^2} + \\lambda\\vec a, \\quad \\lambda \\in \\mathbb R.$$',
          cta: 'See all the solutions',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'A whole line of solutions',
          body: '$\\vec a = \\vec i + \\vec j + \\vec k$, $\\vec b = \\vec i - \\vec j$ (and $\\vec a \\cdot \\vec b = 0$). Slide $\\lambda$: the red $\\vec x$ moves along a line parallel to $\\vec a$, and $\\vec x \\times \\vec a$ stays equal to $\\vec b$.',
          graph: {
            R: 3, floor: true,
            params: [{ label: '$\\lambda$', min: -2, max: 2, step: 0.5, value: 0 }],
            draw: (P) => {
              const x = add(X0, mul(P[0], A));
              return [
                { seg: [add(X0, mul(-2.6, A)), add(X0, mul(2.6, A))], kind: 's', dash: true },
                { arrow: [O, A], kind: 'a', label: 'a' },
                { arrow: [O, x], kind: 'd', label: 'x' },
              ];
            },
            read: (P) => {
              const x = add(X0, mul(P[0], A));
              return `$\\vec x = ${tup(x)}$, and $\\vec x \\times \\vec a = ${tup(cross(x, A))} = \\vec b$ ✓`;
            },
            need: 4,
            action: 'Slide λ',
          },
          asides: [{ label: 'Note', text: 'Adding any multiple of $\\vec a$ to $\\vec x$ does not change $\\vec x \\times \\vec a$, because $\\vec a \\times \\vec a = \\vec 0$. That is why the answer has a free $\\lambda$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Does $\\vec x \\times (\\vec i + \\vec k) = \\vec j - \\vec k$ have a solution?',
          options: [
            { text: 'No, because $(\\vec i + \\vec k) \\cdot (\\vec j - \\vec k) = -1 \\ne 0$', correct: true, why: '$\\vec x \\times \\vec a$ is always perpendicular to $\\vec a$, so it cannot equal a $\\vec b$ with $\\vec a \\cdot \\vec b \\ne 0$.' },
            { text: 'Yes, $\\vec x = \\frac12(\\vec a \\times \\vec b) + \\lambda\\vec a$', why: 'The formula only applies when $\\vec a \\cdot \\vec b = 0$. Check that first.' },
            { text: 'Yes, exactly one', why: 'Even when solutions exist, there is a whole line of them.' },
            { text: 'Only if $\\vec x = \\vec 0$', why: '$\\vec 0 \\times \\vec a = \\vec 0 \\ne \\vec b$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Solve $\\vec x \\cdot \\vec a = 4$ and $\\vec x \\times \\vec a = \\vec b$, with $\\vec a = \\vec i + 2\\vec j + 2\\vec k$, $\\vec b = 2\\vec i - \\vec j$',
          body: 'Cross with $\\vec a$ as before: $\\vec x\\,\\|\\vec a\\|^2 - \\vec a(\\vec a \\cdot \\vec x) = \\vec a \\times \\vec b$. Now $\\vec a \\cdot \\vec x = 4$ is **given**, so\n$$\\vec x = \\frac{4\\vec a + \\vec a \\times \\vec b}{\\|\\vec a\\|^2}.$$\n$\\|\\vec a\\|^2 = 9$, $4\\vec a = (4, 8, 8)$, $\\vec a \\times \\vec b = (2, 4, -5)$:\n$$\\vec x = \\frac{(6, 12, 3)}{9} = \\frac13(2\\vec i + 4\\vec j + \\vec k).$$\nCheck: $\\vec x \\cdot \\vec a = \\frac13(2 + 8 + 2) = 4$ ✓.',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the method',
          prompt: 'Put the steps for solving $\\vec x \\times \\vec a = \\vec b$ in order.',
          items: [
            'Check that $\\vec a \\cdot \\vec b = 0$ (otherwise there is no solution).',
            'Cross both sides with $\\vec a$: $\\vec a \\times (\\vec x \\times \\vec a) = \\vec a \\times \\vec b$.',
            'Expand with BAC − CAB: $\\vec x\\|\\vec a\\|^2 - \\vec a(\\vec a \\cdot \\vec x) = \\vec a \\times \\vec b$.',
            'Make $\\vec x$ the subject, with $\\lambda$ for the free number $\\vec a \\cdot \\vec x / \\|\\vec a\\|^2$.',
            'Check one solution (say $\\lambda = 0$) in the original equation.',
          ],
        },
        {
          type: 'story',
          eyebrow: 'Trick 1 in action',
          title: 'Solve $3\\vec x + (\\vec x \\cdot \\vec b)\\vec a = \\vec c$ with $\\vec a = \\vec i - \\vec k$, $\\vec b = 2\\vec j + \\vec k$, $\\vec c = 6\\vec i + 3\\vec j$',
          body: '**Step 1 · Dot with $\\vec b$.** $3(\\vec b \\cdot \\vec x) + (\\vec b \\cdot \\vec x)(\\vec a \\cdot \\vec b) = \\vec b \\cdot \\vec c$.\nHere $\\vec a \\cdot \\vec b = -1$ and $\\vec b \\cdot \\vec c = 6$, so $2(\\vec b \\cdot \\vec x) = 6$: $\\vec b \\cdot \\vec x = 3$.\n\n**Step 2 · Substitute back.** $3\\vec x + 3\\vec a = \\vec c$, so $\\vec x = \\frac13(\\vec c - 3\\vec a) = \\frac13(3, 3, 3) = \\vec i + \\vec j + \\vec k$.\n\n**Check.** $\\vec x \\cdot \\vec b = 0 + 2 + 1 = 3$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Solve $\\vec x \\times (\\vec a \\times \\vec b) = \\vec c$ with $\\vec a = \\vec i$, $\\vec b = \\vec j$, $\\vec c = 2\\vec i + 3\\vec j$.',
          options: [
            { text: '$\\vec x = -3\\vec i + 2\\vec j + \\lambda\\vec k$', correct: true, why: '$\\vec a \\times \\vec b = \\vec k$, so solve $\\vec x \\times \\vec k = 2\\vec i + 3\\vec j$. Check: $(-3, 2, \\lambda) \\times (0, 0, 1) = (2, 3, 0)$.' },
            { text: '$\\vec x = 3\\vec i - 2\\vec j + \\lambda\\vec k$', why: 'Check: $(3, -2, 0) \\times (0, 0, 1) = (-2, -3, 0)$, the negative.' },
            { text: '$\\vec x = 2\\vec i + 3\\vec j$', why: 'Check: $(2, 3, 0) \\times \\vec k = (3, -2, 0) \\ne \\vec c$.' },
            { text: 'No solution', why: '$\\vec c \\cdot \\vec k = 0$, so solutions exist.' },
          ],
        },
        {
          type: 'finish',
          title: 'Vector equations: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
