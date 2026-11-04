// MTH 210 · Lines and Planes · Lesson 2: the plane through a point parallel to two vectors,
// point–normal and Cartesian forms, the plane through three points, and the forms side by side.
import { O, add, cross, mul, num, patch, sub, tup } from './vec';

const P0 = [0, 0, 1];
const nAt = (t) => [Math.sin(t), 0, Math.cos(t)];

const TA = [1, 1, 2];
const TB = [2, -5, 3];
const TC = [2, 1, 3];

export default {
  id: 'planes',
  title: 'Planes',
  covers: 'Normal vectors, point–normal form (r − a) · n = 0, Cartesian form ax + by + cz + d = 0, parametric form r = c + αa + βb, the plane through three points, a plane normal to a line, intercept form',
  minutes: 16,
  sections: [
    {
      name: 'Point and normal',
      terms: [
        ['Normal', 'A vector $\\vec n$ perpendicular to every vector lying in the plane.'],
        ['Point–normal form', '$(\\vec r - \\vec a) \\cdot \\vec n = 0$, for a plane through $\\vec a$ with normal $\\vec n$.'],
        ['Cartesian form', '$ax + by + cz + d = 0$; the coefficients give the normal $\\vec n = (a, b, c)$.'],
        ['Plane normal to a line', 'Use the line’s direction as $\\vec n$.'],
        ['Intercept form', '$\\dfrac xa + \\dfrac yb + \\dfrac zc = 1$: meets the axes at $a$, $b$, $c$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Lines and Planes · Lesson 2',
          title: 'A plane is everything at right angles to one arrow',
          body: 'A ==normal== $\\vec n$ is perpendicular to the plane. If $A$ is in the plane and $P$ is any point of it, then $\\vec{AP} = \\vec r - \\vec a$ lies in the plane, so\n$$(\\vec r - \\vec a) \\cdot \\vec n = 0.$$\nWith $\\vec r = (x, y, z)$ and $\\vec n = (a, b, c)$ this expands to\n$$ax + by + cz + d = 0.$$',
          cta: 'Tilt a plane',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Turn the normal, the plane follows',
          body: 'The plane passes through $A(0, 0, 1)$. The red arrow is $\\vec n$; the green arrow $\\vec{AP}$ always lies in the plane, at right angles to $\\vec n$.',
          graph: {
            R: 3,
            params: [{ label: 'tilt of $\\vec n$', min: 0, max: 1.2, step: 0.1, value: 0.5 }],
            draw: (P) => {
              const n = nAt(P[0]);
              const sq = patch(P0, n, 1.8);
              const inPlane = mul(1.5, sub(sq[1], sq[0]).map((x) => x / 3.6));
              return [
                { poly: sq, kind: 'a' },
                { arrow: [O, P0], kind: 's' },
                { pt: P0, kind: 'a', label: 'A' },
                { arrow: [P0, add(P0, mul(1.6, n))], kind: 'd', label: 'n' },
                { arrow: [P0, add(P0, inPlane)], kind: 'b', label: 'AP' },
              ];
            },
            read: (P) => {
              const n = nAt(P[0]);
              if (P[0] === 0) return '$\\vec n = (0, 0, 1)$: the flat plane $z = 1$';
              return `$\\vec n \\approx ${tup(n)}$: plane $${num(n[0])}x + ${num(n[2])}(z - 1) = 0$`;
            },
            need: 3,
            action: 'Tilt the normal',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Plane through $P(1, -2, 3)$ normal to the line $\\frac{x - 1}{4} = \\frac{y + 1}{-1} = \\frac z2$',
          body: 'The line’s direction is $(4, -1, 2)$, so take $\\vec n = (4, -1, 2)$:\n$$4(x - 1) - 1(y + 2) + 2(z - 3) = 0 \\Rightarrow 4x - y + 2z - 12 = 0.$$\nCheck with $P$: $4 + 2 + 6 - 12 = 0$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A normal to the plane $3x - 2y + z + 1 = 0$ is',
          options: [
            { text: '$(3, -2, 1)$', correct: true, why: 'Read the coefficients of $x$, $y$, $z$.' },
            { text: '$(3, -2, 1, 1)$', why: 'A normal in space has three components; $d$ is not part of it.' },
            { text: '$(1, 1, 1)$', why: '$(1, 1, 1) \\cdot (3, -2, 1) = 2$: not parallel to the normal.' },
            { text: '$(-3, 2, 1)$', why: 'Only the $x$ and $y$ signs flipped: not a multiple of $(3, -2, 1)$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Point–normal: set.',
          recap: ['$(\\vec r - \\vec a) \\cdot \\vec n = 0$ expands to $ax + by + cz + d = 0$.', 'The coefficients are the normal.'],
          why: 'Often you are given points, not a normal. Then the cross product makes one.',
        },
      ],
    },
    {
      name: 'Plane through three points',
      terms: [
        ['Parametric form', '$\\vec r = \\vec c + \\alpha\\vec a + \\beta\\vec b$: through $\\vec c$, parallel to $\\vec a$ and $\\vec b$.'],
        ['Three points', '$\\vec r = \\vec r_1 + s(\\vec r_2 - \\vec r_1) + t(\\vec r_3 - \\vec r_1)$; normal $\\vec n = \\vec{P_1P_2} \\times \\vec{P_1P_3}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The recipe',
          title: 'Two edges, then a cross product',
          body: 'For $P_1, P_2, P_3$ (not on one line):\n\n**Vector parametric form.** $\\vec r = \\vec r_1 + s\\,\\vec{P_1P_2} + t\\,\\vec{P_1P_3}$, $s, t \\in \\mathbb R$.\n\n**Cartesian form.** $\\vec n = \\vec{P_1P_2} \\times \\vec{P_1P_3}$, then $\\vec n \\cdot (\\vec r - \\vec r_1) = 0$.',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Through $A(1, 1, 2)$, $B(2, -5, 3)$, $C(2, 1, 3)$',
          body: 'Build the plane from the two edges, then add the normal.',
          graph: {
            R: 5,
            views: ['Points', 'Edges AB, AC', 'Normal'],
            draw: (P, v) => {
              const ab = sub(TB, TA);
              const ac = sub(TC, TA);
              const n = cross(ab, ac);
              const items = [{ pt: TA, kind: 'a', label: 'A' }, { pt: TB, kind: 'a', label: 'B' }, { pt: TC, kind: 'a', label: 'C' }];
              if (v >= 1) items.unshift({ poly: [add(TA, add(mul(-0.3, ab), mul(-0.6, ac))), add(TA, add(mul(1.3, ab), mul(-0.6, ac))), add(TA, add(mul(1.3, ab), mul(1.6, ac))), add(TA, add(mul(-0.3, ab), mul(1.6, ac)))], kind: 'c' });
              if (v >= 1) items.push({ arrow: [TA, TB], kind: 'b', label: 'AB', mid: true }, { arrow: [TA, TC], kind: 'b', label: 'AC', mid: true });
              if (v === 2) items.push({ arrow: [TA, add(TA, mul(0.3, n))], kind: 'd', label: 'n' });
              return items;
            },
            read: (P, v) => [
              'Three points, not on one line, fix one plane.',
              '$\\vec{AB} = (1, -6, 1)$, $\\vec{AC} = (1, 0, 1)$, so $\\vec r = (1, 1, 2) + s(1, -6, 1) + t(1, 0, 1)$',
              '$\\vec n = \\vec{AB} \\times \\vec{AC} = (-6, 0, 6) \\propto (-1, 0, 1)$: the plane is $z - x = 1$',
            ][v],
            need: 3,
            action: 'Step through the three views',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Plane through $A(1, 1, -2)$, $B(2, 5, 3)$, $C(-2, -1, 3)$, in both forms',
          body: '$\\vec{AB} = (1, 4, 5)$, $\\vec{AC} = (-3, -2, 5)$.\n\n**(a) Parametric.** $\\vec r = (1, 1, -2) + s(1, 4, 5) + t(-3, -2, 5)$.\n\n**(b) Cartesian.** $\\vec n = \\vec{AB} \\times \\vec{AC} = (30, -20, 10) = 10(3, -2, 1)$, so $3(x - 1) - 2(y - 1) + (z + 2) = 0$:\n$$3x - 2y + z + 1 = 0.$$\n**(c) Same plane.** Substitute $x = 1 + s - 3t$, $y = 1 + 4s - 2t$, $z = -2 + 5s + 5t$: $3x - 2y + z = -1$ for every $s, t$ ✓.',
          asides: [{ label: 'Exam tip', text: 'Scale the normal down ($(30, -20, 10) \\to (3, -2, 1)$) to keep the numbers small. Then check all three points.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'The plane through $(1, 2, 3)$, $(4, 1, 0)$, $(2, 5, -1)$ has normal $(13, 9, 10)$. Its equation is',
          options: [
            { text: '$13x + 9y + 10z = 61$', correct: true, why: '$13(1) + 9(2) + 10(3) = 61$; check $(4, 1, 0)$: $52 + 9 = 61$ ✓.' },
            { text: '$13x + 9y + 10z = 0$', why: 'That passes through the origin, which is not one of the points.' },
            { text: '$x + 2y + 3z = 32$', why: 'The coefficients must be the normal, not a point.' },
            { text: '$13x + 9y + 10z = 52$', why: 'Use a point: $13 + 18 + 30 = 61$.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Summary',
          title: 'Forms of a plane',
          cards: [
            { title: 'Cartesian', text: '$ax + by + cz + d = 0$, normal $(a, b, c)$.' },
            { title: 'Point–normal', text: '$(\\vec r - \\vec a) \\cdot \\vec n = 0$.' },
            { title: 'Parametric', text: '$\\vec r = \\vec c + \\alpha\\vec a + \\beta\\vec b$.' },
            { title: 'Intercept', text: '$\\frac xa + \\frac yb + \\frac zc = 1$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Planes: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
