// MTH 210 · Vector Basics · Lesson 2: unit vectors, direction cosines, direction angles and ratios.
import { O, deg, guides, mul, norm, num } from './vec';

export default {
  id: 'unit-vectors',
  title: 'Unit vectors and direction cosines',
  covers: 'Unit vectors, the unit vector along a given vector, direction cosines l, m, n, direction angles, l² + m² + n² = 1, direction ratios',
  minutes: 13,
  sections: [
    {
      name: 'Unit vectors',
      terms: [
        ['Unit vector', 'A vector of magnitude $1$. Along $\\vec v \\ne \\vec 0$: $\\hat v = \\dfrac{\\vec v}{\\|\\vec v\\|}$ (read "$v$ hat").'],
        ['$\\vec i, \\vec j, \\vec k$', 'The unit vectors along the $x$, $y$ and $z$ axes: $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Vector Basics · Lesson 2',
          title: 'Keep the direction, shrink the length to 1',
          body: 'A ==unit vector== has length $1$. It carries **direction only**.\n\nTo get the unit vector along $\\vec v$, divide by its length:\n$$\\hat v = \\frac{\\vec v}{\\|\\vec v\\|}.$$\n**Example.** $\\vec v = 3\\vec i + 4\\vec k$: $\\|\\vec v\\| = \\sqrt{9 + 16} = 5$, so $\\hat v = \\frac35\\vec i + \\frac45\\vec k$.',
          cta: 'Shrink one',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Same direction, length $1$',
          body: 'The blue arrow is $\\vec v$. The red arrow is $\\hat v$, which always has length $1$ however long $\\vec v$ is.',
          graph: {
            R: 4, floor: true,
            params: [
              { label: 'stretch $\\vec v$ by', min: 1, max: 4, step: 0.5, value: 2 },
            ],
            draw: (P) => {
              const v = mul(P[0], [1, 2, 2]);
              return [{ arrow: [O, v], kind: 'a', label: 'v' }, { arrow: [O, [1 / 3, 2 / 3, 2 / 3]], kind: 'd', label: 'v̂' }];
            },
            read: (P) => `$\\vec v = ${num(P[0])}(1, 2, 2)$, $\\|\\vec v\\| = ${num(3 * P[0])}$, but $\\hat v = \\left(\\tfrac13, \\tfrac23, \\tfrac23\\right)$ every time`,
            need: 3,
            action: 'Stretch v and watch v̂',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the unit vector in the direction of $\\vec a = 2\\vec i - 3\\vec j + 6\\vec k$.',
          options: [
            { text: '$\\frac17(2\\vec i - 3\\vec j + 6\\vec k)$', correct: true, why: '$\\|\\vec a\\| = \\sqrt{4 + 9 + 36} = 7$; divide every component by $7$.' },
            { text: '$\\frac15(2\\vec i - 3\\vec j + 6\\vec k)$', why: '$2 - 3 + 6 = 5$ is not the length. Square, add, root: $\\sqrt{49} = 7$.' },
            { text: '$2\\vec i - 3\\vec j + 6\\vec k$', why: 'That has length $7$, not $1$.' },
            { text: '$\\frac{1}{49}(2\\vec i - 3\\vec j + 6\\vec k)$', why: 'Divide by $\\|\\vec a\\| = 7$, not by $\\|\\vec a\\|^2$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Unit vectors: set.',
          recap: ['A unit vector has length $1$.', '$\\hat v = \\vec v / \\|\\vec v\\|$.'],
          why: 'The components of $\\hat v$ have a name of their own: direction cosines.',
        },
      ],
    },
    {
      name: 'Direction cosines',
      terms: [
        ['Direction angles', '$\\alpha, \\beta, \\gamma$: the angles a vector makes with the positive $x$, $y$ and $z$ axes.'],
        ['Direction cosines', '$l = \\cos\\alpha = \\dfrac{a_1}{\\|\\vec a\\|}$, $m = \\cos\\beta = \\dfrac{a_2}{\\|\\vec a\\|}$, $n = \\cos\\gamma = \\dfrac{a_3}{\\|\\vec a\\|}$.'],
        ['Key identity', '$l^2 + m^2 + n^2 = 1$, i.e. $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.'],
        ['Direction ratios', 'Any numbers proportional to $l : m : n$, e.g. the components $a_1 : a_2 : a_3$ themselves.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Direction cosines',
          title: 'Three angles fix a direction',
          body: 'Let $\\alpha, \\beta, \\gamma$ be the angles $\\vec a = (a_1, a_2, a_3)$ makes with the $x$, $y$, $z$ axes. The ==direction cosines== are\n$$(l, m, n) = (\\cos\\alpha, \\cos\\beta, \\cos\\gamma) = \\left(\\frac{a_1}{\\|\\vec a\\|}, \\frac{a_2}{\\|\\vec a\\|}, \\frac{a_3}{\\|\\vec a\\|}\\right).$$\nThat is exactly $\\hat a$, so its length is $1$:\n$$l^2 + m^2 + n^2 = 1.$$',
          cta: 'Measure the angles',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'The cosines always square-add to $1$',
          body: 'Move the vector. The read-out gives its direction cosines and angles.',
          graph: {
            R: 4, floor: true,
            params: [
              { label: '$a_1$', min: -4, max: 4, step: 1, value: 2 },
              { label: '$a_2$', min: -4, max: 4, step: 1, value: -1 },
              { label: '$a_3$', min: -4, max: 4, step: 1, value: 2 },
            ],
            draw: (P) => [...guides(P), { arrow: [O, P], kind: 'a', label: 'a' }],
            read: (P) => {
              const r = norm(P);
              if (!r) return 'The zero vector has **no direction**, so no direction cosines.';
              const c = P.map((x) => x / r);
              return `$l, m, n \\approx ${c.map((x) => num(x, 3)).join(',\\ ')}$; angles $\\approx ${c.map((x) => num(deg(Math.acos(x)), 1)).join('°,\\ ')}°$; $l^2 + m^2 + n^2 = 1$`;
            },
            need: 4,
            action: 'Try a few vectors',
          },
          asides: [{ label: 'Exam tip', text: 'A negative cosine means an **obtuse** angle (more than $90°$) with that axis.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Direction cosines of the line from $A(2, -1, 3)$ to $B(7, 3, -5)$',
          body: '$\\vec{AB} = (5, 4, -8)$, $\\|\\vec{AB}\\| = \\sqrt{25 + 16 + 64} = \\sqrt{105}$.\n$$(l, m, n) = \\left(\\frac{5}{\\sqrt{105}}, \\frac{4}{\\sqrt{105}}, -\\frac{8}{\\sqrt{105}}\\right) \\approx (0.488, 0.390, -0.781).$$\nAngles: $\\alpha \\approx 60.79°$, $\\beta \\approx 67.02°$, $\\gamma = \\cos^{-1}(-0.781) \\approx 141.33°$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A vector has direction ratios $2 : -3 : 6$ and magnitude $14$. Find the vector.',
          options: [
            { text: '$4\\vec i - 6\\vec j + 12\\vec k$', correct: true, why: '$\\sqrt{4 + 9 + 36} = 7$, so $(l, m, n) = \\left(\\frac27, -\\frac37, \\frac67\\right)$; times $14$ gives $(4, -6, 12)$.' },
            { text: '$28\\vec i - 42\\vec j + 84\\vec k$', why: 'That is $14 \\times (2, -3, 6)$, of length $98$. Make it a unit vector first.' },
            { text: '$2\\vec i - 3\\vec j + 6\\vec k$', why: 'That has length $7$, not $14$.' },
            { text: '$\\frac27\\vec i - \\frac37\\vec j + \\frac67\\vec k$', why: 'That is the unit vector. Multiply by $14$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check the identity',
          prompt: 'Can $\\frac12, \\frac12, \\frac12$ be the direction cosines of a vector?',
          options: [
            { text: 'No, because $\\frac14 + \\frac14 + \\frac14 \\ne 1$', correct: true, why: 'Direction cosines must satisfy $l^2 + m^2 + n^2 = 1$; here the sum is $\\frac34$.' },
            { text: 'Yes, they are all between $-1$ and $1$', why: 'That is needed, but $l^2 + m^2 + n^2 = 1$ must also hold.' },
            { text: 'Yes, they give $60°$ with every axis', why: 'No direction makes $60°$ with all three axes: $3\\cos^2 60° = \\frac34$.' },
            { text: 'Only if the vector has length $\\frac12$', why: 'Direction cosines do not depend on the length.' },
          ],
        },
        {
          type: 'finish',
          title: 'Unit vectors and direction cosines: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
