// MTH 210 · Lines and Planes · Lesson 1: the vector, parametric and symmetric equations of a line,
// the two cases, dividing a segment, points on a line, and two lines meeting, parallel or skew.
import { O, add, mul, num, tup } from './vec';

const A = [1, -1, 1];
const D = [-1, 2, 1];

const PAIRS = [
  { a1: [-2, -2, 1], d1: [1, 1, 0], a2: [2, -2, 1], d2: [-1, 1, 0] },
  { a1: [-2, -2, 1], d1: [1, 1, 0], a2: [2, -2, 2.6], d2: [-1, 1, 0] },
  { a1: [-2, -2, 1], d1: [1, 1, 0], a2: [-2, 0, 2.2], d2: [1, 1, 0] },
];

export default {
  id: 'lines',
  title: 'Lines in space',
  covers: 'Vector equation r = a + λb, parametric and symmetric forms, the line through two points, dividing a segment in a ratio, testing a point, intersecting, parallel and skew lines, distance from a point to a line',
  minutes: 18,
  sections: [
    {
      name: 'Three forms of a line',
      terms: [
        ['Vector form', '$\\vec r = \\vec a + \\lambda\\vec b$: through the point $\\vec a$, parallel to $\\vec b$.'],
        ['Parametric form', '$x = a_1 + \\lambda b_1$, $y = a_2 + \\lambda b_2$, $z = a_3 + \\lambda b_3$.'],
        ['Symmetric (Cartesian) form', '$\\dfrac{x - a_1}{b_1} = \\dfrac{y - a_2}{b_2} = \\dfrac{z - a_3}{b_3}$: numerators give a point, denominators the direction.'],
        ['Through two points', '$\\vec r = \\vec a + \\lambda(\\vec b - \\vec a)$.'],
        ['Dividing a segment', '$\\mu\\vec{AP} = \\lambda\\vec{PB} \\Rightarrow \\vec r = \\dfrac{\\mu\\vec a + \\lambda\\vec b}{\\lambda + \\mu}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Lines and Planes · Lesson 1',
          title: 'A point and a direction fix a line',
          body: 'Start at a point $A$ (position vector $\\vec a$) and move any multiple of a direction $\\vec b$:\n$$\\vec r = \\vec a + \\lambda\\vec b, \\quad \\lambda \\in \\mathbb R.$$\nSplit into components for the **parametric** form, then solve each for $\\lambda$ for the **symmetric** form:\n$$\\frac{x - a_1}{b_1} = \\frac{y - a_2}{b_2} = \\frac{z - a_3}{b_3} \\ (= \\lambda).$$',
          cta: 'Walk along a line',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Every $\\lambda$ gives a point of the line',
          body: '$\\vec r = (1, -1, 1) + \\lambda(-1, 2, 1)$. Slide $\\lambda$ and watch the red point $P$ walk along the line.',
          graph: {
            R: 4.5, floor: true,
            params: [{ label: '$\\lambda$', min: -1.5, max: 1.5, step: 0.5, value: 1 }],
            draw: (P) => {
              const p = add(A, mul(P[0], D));
              return [
                { seg: [add(A, mul(-1.7, D)), add(A, mul(1.7, D))], kind: 's' },
                { arrow: [O, A], kind: 'a', label: 'a', mid: true },
                { arrow: [A, add(A, D)], kind: 'b', label: 'b' },
                { pt: p, kind: 'd', label: 'P' },
              ];
            },
            read: (P) => `$\\lambda = ${num(P[0])}$: $P = ${tup(add(A, mul(P[0], D)))}$`,
            need: 4,
            action: 'Slide λ, including negative values',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Line through $(1, 2, -3)$ parallel to $(3, -2, 4)$. Is $(4, 0, 1)$ on it?',
          body: '$$\\vec r = (1, 2, -3) + \\lambda(3, -2, 4), \\qquad \\frac{x - 1}{3} = \\frac{y - 2}{-2} = \\frac{z + 3}{4}.$$\nFor $(4, 0, 1)$: $\\frac{3}{3} = 1$, $\\frac{-2}{-2} = 1$, $\\frac{4}{4} = 1$. **All equal**, so it is on the line ($\\lambda = 1$).\n\nIf the three values disagree, the point is **not** on the line.',
          asides: [{ label: 'Exam tip', text: 'Before reading off a point and direction, make the coefficient of $x$, $y$, $z$ equal to $1$. For $\\frac{3x + 1}{2}$, write $\\frac{x + \\frac13}{\\frac23}$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Does $(7, 4, 0)$ lie on $\\vec r = (1, -2, -3) + \\lambda(2, 3, 1)$?',
          options: [
            { text: 'No: $x$ and $z$ need $\\lambda = 3$ but $y$ needs $\\lambda = 2$', correct: true, why: 'One $\\lambda$ must work for all three. (At $\\lambda = 3$ the line is at $(7, 7, 0)$.)' },
            { text: 'Yes, at $\\lambda = 3$', why: 'Check $y$: $-2 + 3(3) = 7 \\ne 4$.' },
            { text: 'Yes, at $\\lambda = 2$', why: 'Check $x$: $1 + 2(2) = 5 \\ne 7$.' },
            { text: 'Yes, because $x$ and $z$ agree', why: 'All three components must agree.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Two points',
          title: 'The direction is $\\vec b - \\vec a$',
          body: 'Through $A$ and $B$: $\\vec r = \\vec a + \\lambda(\\vec b - \\vec a)$.\n\n**Dividing in a ratio.** If $\\mu\\vec{AP} = \\lambda\\vec{PB}$, then $\\mu(\\vec r - \\vec a) = \\lambda(\\vec b - \\vec r)$, so\n$$\\vec r = \\frac{\\mu\\vec a + \\lambda\\vec b}{\\lambda + \\mu}.$$\n**Example.** $\\vec a = (1, -2, 4)$, $\\vec b = (6, 3, -1)$, $2\\vec{AP} = 3\\vec{PB}$: $5\\vec r = 2\\vec a + 3\\vec b = (20, 5, 5)$, so $\\vec r = (4, 1, 1)$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the line through $P(-2, 5, 1)$ parallel to the vector from $A(1, -1, 2)$ to $B(4, 3, -2)$.',
          options: [
            { text: '$\\frac{x + 2}{3} = \\frac{y - 5}{4} = \\frac{z - 1}{-4}$', correct: true, why: '$\\vec{AB} = (3, 4, -4)$; through $(-2, 5, 1)$.' },
            { text: '$\\frac{x - 2}{3} = \\frac{y + 5}{4} = \\frac{z + 1}{-4}$', why: 'The point is $(-2, 5, 1)$: $x - (-2) = x + 2$.' },
            { text: '$\\frac{x + 2}{5} = \\frac{y - 5}{2} = \\frac{z - 1}{0}$', why: 'That adds $A$ and $B$. Use $B - A$.' },
            { text: '$\\frac{x - 1}{3} = \\frac{y + 1}{4} = \\frac{z - 2}{-4}$', why: 'That passes through $A$, not $P$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Lines: set.',
          recap: ['$\\vec r = \\vec a + \\lambda\\vec b$; numerators give the point, denominators the direction.', 'A point is on the line only if one $\\lambda$ fits all three components.'],
          why: 'Next: what can happen when two lines meet, or don’t.',
        },
      ],
    },
    {
      name: 'Two lines',
      terms: [
        ['Parallel lines', '$\\vec b_1 = k\\vec b_2$ for some scalar $k$.'],
        ['Intersecting lines', 'Equating components gives one $\\mu, \\lambda$ that works in **all three** equations.'],
        ['Skew lines', 'Not parallel and no common point: they pass each other in space.'],
        ['Point–line distance', '$D = \\dfrac{\\|\\vec{P_0A} \\times \\vec d\\|}{\\|\\vec d\\|}$ for the line through $P_0$ with direction $\\vec d$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Meet, skew or parallel',
          body: 'Turn each picture to see the difference. Skew lines look as if they cross from some angles, but they never touch.',
          graph: {
            R: 4, floor: true,
            views: ['Meet', 'Skew', 'Parallel'],
            draw: (P, v) => {
              const { a1, d1, a2, d2 } = PAIRS[v];
              const items = [
                { seg: [add(a1, mul(-0.6, d1)), add(a1, mul(4.6, d1))], kind: 'a' },
                { seg: [add(a2, mul(-0.6, d2)), add(a2, mul(4.6, d2))], kind: 'b' },
              ];
              if (v === 0) items.push({ pt: [0, 0, 1], kind: 'd', label: 'meet' });
              if (v === 1) items.push({ seg: [[0, 0, 1], [0, 0, 2.6]], kind: 'd', dash: true });
              return items;
            },
            read: (P, v) => [
              'Directions $(1, 1, 0)$ and $(-1, 1, 0)$: not parallel, and one $\\mu, \\lambda$ solves all three equations. **They meet** at $(0, 0, 1)$.',
              'Same directions, but the green line is lifted: the $z$-equation fails. Not parallel, no common point: **skew**. The red dashes show the gap.',
              'Both directions are $(1, 1, 0)$: **parallel**. They never meet (unless they are the same line).',
            ][v],
            need: 4,
            action: 'Look at all three, and turn the skew one',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Do $\\vec r_1 = (4, 2, -6) + \\mu(-8, 1, -2)$ and $\\vec r_2 = (-2, 1, -2) + \\lambda(-9, 2, 5)$ meet?',
          body: '**Step 1 · Parallel?** $(-8, 1, -2)$ is not a multiple of $(-9, 2, 5)$. No.\n\n**Step 2 · Equate components.**\n$$4 - 8\\mu = -2 - 9\\lambda, \\quad 2 + \\mu = 1 + 2\\lambda, \\quad -6 - 2\\mu = -2 + 5\\lambda.$$\n**Step 3 · Solve two.** The second gives $\\mu = 2\\lambda - 1$; the first then gives $\\lambda = 2$, $\\mu = 3$.\n\n**Step 4 · Test the third.** Left $= -6 - 6 = -12$, right $= -2 + 10 = 8$. They disagree: **no common point**. The lines are **skew**.',
          asides: [{ label: 'Exam tip', text: 'Always test the third equation. Two equations in two unknowns can always be solved; the third decides.' }],
        },
        {
          type: 'story',
          eyebrow: 'Distance from a point to a line',
          title: 'Area divided by base',
          body: 'For a line through $P_0$ with direction $\\vec d$ and a point $A$:\n$$D = \\frac{\\|\\vec{P_0A} \\times \\vec d\\|}{\\|\\vec d\\|}.$$\n**Example.** $A(5, 4, 1)$ and $\\frac{x - 6}{5} = \\frac{y + 15}{1} = \\frac{z - 14}{8}$: $P_0 = (6, -15, 14)$, $\\vec d = (5, 1, 8)$, $\\vec{P_0A} = (-1, 19, -13)$.\n$$\\vec{P_0A} \\times \\vec d = (165, -57, -96), \\qquad D = \\sqrt{\\frac{39690}{90}} = \\sqrt{441} = 21.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the distance from $A(0, 0, 0)$ to the line $\\vec r = (1, 0, 0) + \\lambda(0, 1, 0)$.',
          options: [
            { text: '$1$', correct: true, why: '$\\vec{P_0A} = (-1, 0, 0)$, $\\vec{P_0A} \\times (0, 1, 0) = (0, 0, -1)$, length $1$; $\\|\\vec d\\| = 1$.' },
            { text: '$0$', why: 'The origin is not on the line: every point of it has $x = 1$.' },
            { text: '$\\sqrt2$', why: 'Use the cross product formula: the closest point is $(1, 0, 0)$.' },
            { text: '$\\frac12$', why: 'Area $1$ divided by base $1$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Lines in space: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
