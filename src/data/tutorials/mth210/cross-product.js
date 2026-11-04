// MTH 210 · Products · Lesson 2: the cross product, its properties, area and the moment of a force.
import { O, add, cross, deg, gram, mul, norm, num } from './vec';

const A = [3, 0, 0];
const bAt = (t) => [2.5 * Math.cos(t), 2.5 * Math.sin(t), 0];

export default {
  id: 'cross-product',
  title: 'The cross product',
  covers: 'a × b by determinant, perpendicular to both, |a × b| = |a||b|sin θ, anti-commutativity, parallel vectors, i × j = k, area of a parallelogram and triangle, moment of a force',
  minutes: 16,
  sections: [
    {
      name: 'Cross product and area',
      terms: [
        ['Cross (vector) product', '$\\vec a \\times \\vec b = \\begin{vmatrix}\\vec i & \\vec j & \\vec k \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3\\end{vmatrix}$, a **vector** perpendicular to both $\\vec a$ and $\\vec b$.'],
        ['Magnitude', '$\\|\\vec a \\times \\vec b\\| = \\|\\vec a\\|\\|\\vec b\\|\\sin\\theta$ = the **area of the parallelogram** on $\\vec a$ and $\\vec b$.'],
        ['Order matters', '$\\vec a \\times \\vec b = -(\\vec b \\times \\vec a)$.'],
        ['Parallel test', '$\\vec a \\times \\vec b = \\vec 0 \\iff \\vec a \\parallel \\vec b$; in particular $\\vec a \\times \\vec a = \\vec 0$.'],
        ['Unit vectors', '$\\vec i \\times \\vec j = \\vec k$, $\\vec j \\times \\vec k = \\vec i$, $\\vec k \\times \\vec i = \\vec j$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Products · Lesson 2',
          title: 'A product that gives a vector',
          body: 'The ==cross product== is worked out as a determinant:\n$$\\vec a \\times \\vec b = \\vec i(a_2b_3 - a_3b_2) - \\vec j(a_1b_3 - a_3b_1) + \\vec k(a_1b_2 - a_2b_1).$$\nThe answer is a **vector**, perpendicular to both $\\vec a$ and $\\vec b$, with length $\\|\\vec a\\|\\|\\vec b\\|\\sin\\theta$.',
          asides: [{ label: 'Exam tip', text: 'Watch the **minus sign** on the $\\vec j$ term. It is the most common slip.' }],
          cta: 'See where it points',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Length of $\\vec a \\times \\vec b$ = area of the parallelogram',
          body: 'The red arrow is $\\vec a \\times \\vec b$, drawn at a quarter of its length. Open the angle and watch the area and the arrow grow together. Then flip the order.',
          graph: {
            R: 4, floor: true,
            params: [{ label: 'angle between $\\vec a$ and $\\vec b$', min: 0, max: 3.1, step: 0.1, value: 1.2 }],
            views: ['a × b', 'b × a'],
            draw: (P, v) => {
              const b = bAt(P[0]);
              const c = mul(v ? -0.25 : 0.25, cross(A, b));
              return [
                { poly: gram(A, b), kind: 'c' },
                { arrow: [O, A], kind: 'a', label: 'a' },
                { arrow: [O, b], kind: 'b', label: 'b' },
                ...(norm(c) > 0.05 ? [{ arrow: [O, c], kind: 'd', label: v ? 'b × a' : 'a × b' }] : []),
              ];
            },
            read: (P, v) => {
              const area = norm(cross(A, bAt(P[0])));
              const th = num(deg(P[0]), 0);
              if (area < 0.2) return `$\\theta \\approx ${th}°$: the vectors are (nearly) **parallel**, so $\\vec a \\times \\vec b \\approx \\vec 0$`;
              return `$\\theta \\approx ${th}°$, area $= 3 \\times 2.5 \\sin\\theta \\approx ${num(area, 2)}$. ${v ? '$\\vec b \\times \\vec a$ points **down**: the opposite way.' : '$\\vec a \\times \\vec b$ points **up**.'}`;
            },
            need: 4,
            action: 'Change the angle and flip the order',
          },
          asides: [{ label: 'Tip', text: 'Right-hand rule: curl the fingers of your right hand from $\\vec a$ towards $\\vec b$; your thumb points along $\\vec a \\times \\vec b$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Area of the parallelogram with sides $\\vec a = \\vec i + 2\\vec j + 2\\vec k$, $\\vec b = 2\\vec i - \\vec j$',
          body: '$$\\vec a \\times \\vec b = \\begin{vmatrix}\\vec i & \\vec j & \\vec k \\\\ 1 & 2 & 2 \\\\ 2 & -1 & 0\\end{vmatrix} = \\vec i(0 + 2) - \\vec j(0 - 4) + \\vec k(-1 - 4) = 2\\vec i + 4\\vec j - 5\\vec k.$$\nArea $= \\sqrt{4 + 16 + 25} = \\sqrt{45} = 3\\sqrt5 \\approx 6.71$ square units.\n\nA **triangle** with the same two sides has half this area: $\\frac12\\|\\vec a \\times \\vec b\\|$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $(1, 2, 3) \\times (0, 1, -1)$.',
          options: [
            { text: '$(-5, 1, 1)$', correct: true, why: '$\\vec i(-2 - 3) - \\vec j(-1 - 0) + \\vec k(1 - 0) = (-5, 1, 1)$.' },
            { text: '$(-5, -1, 1)$', why: 'The $\\vec j$ term has a minus in front: $-(-1 - 0) = +1$.' },
            { text: '$(5, -1, -1)$', why: 'That is $(0, 1, -1) \\times (1, 2, 3)$, the reverse order.' },
            { text: '$(0, 2, -3)$', why: 'That multiplies matching parts. The cross product uses the determinant.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which are true?',
          options: [
            { text: '$\\vec j \\times \\vec i = -\\vec k$', correct: true, why: 'Reversing $\\vec i \\times \\vec j = \\vec k$ flips the sign.' },
            { text: 'If $\\vec a \\times \\vec b = \\vec 0$ (non-zero vectors) then $\\vec a \\parallel \\vec b$.', correct: true, why: '$\\sin\\theta = 0$, so $\\theta = 0°$ or $180°$.' },
            { text: '$\\|\\vec a \\times \\vec b\\| = \\|\\vec a\\|\\|\\vec b\\|$ exactly when $\\vec a \\perp \\vec b$.', correct: true, why: '$\\sin 90° = 1$.' },
            { text: '$\\vec a \\times \\vec b = \\vec b \\times \\vec a$', why: 'Order matters: $\\vec a \\times \\vec b = -(\\vec b \\times \\vec a)$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Cross product: set.',
          recap: ['$\\vec a \\times \\vec b$ is perpendicular to both.', 'Its length is the parallelogram area; half of it is the triangle area.', 'Swapping the order flips the sign.'],
          why: 'One more use: turning effect, the moment of a force.',
        },
      ],
    },
    {
      name: 'Moment of a force',
      terms: [
        ['Moment about P', '$\\vec M_P = \\vec r \\times \\vec F$, with $\\vec r = \\vec{PA}$ from the pivot $P$ to the point $A$ where the force acts.'],
        ['Force of size F along d', 'First make it a vector: $\\vec F = F\\dfrac{\\vec d}{\\|\\vec d\\|}$.'],
        ['Force along AB', '$\\vec F = \\vec{AB}$, acting at $A$.'],
        ['Angular momentum', '$\\vec L = \\vec r \\times \\vec p$; also torque $\\vec\\tau = \\vec r \\times \\vec F$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'A spanner: $\\vec M = \\vec r \\times \\vec F$',
          body: 'A force (green) pushes the end of a spanner (blue) about the pivot at $O$. The moment (red) points along the bolt. Change where the force pushes.',
          graph: {
            R: 4, floor: true,
            params: [{ label: 'push angle', min: 0, max: 3.1, step: 0.1, value: 1.6 }],
            draw: (P) => {
              const r = [0, 3, 0];
              const f = [-2 * Math.sin(P[0]), 2 * Math.cos(P[0]), 0];
              const M = mul(0.4, cross(r, f));
              return [
                { arrow: [O, r], kind: 'a', label: 'r' },
                { arrow: [r, add(r, f)], kind: 'b', label: 'F' },
                ...(norm(M) > 0.05 ? [{ arrow: [O, M], kind: 'd', label: 'M' }] : []),
              ];
            },
            read: (P) => {
              const m = norm(cross([0, 3, 0], [-2 * Math.sin(P[0]), 2 * Math.cos(P[0]), 0]));
              return `$\\|\\vec M\\| = \\|\\vec r\\|\\|\\vec F\\|\\sin\\theta \\approx ${num(m, 2)}$. ${m < 0.3 ? 'Pushing **along** the spanner turns nothing.' : 'Pushing **across** the spanner turns it best.'}`;
            },
            need: 3,
            action: 'Push at different angles',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'A force along $A(1, -2, 4)$ to $B(5, 2, 3)$; moment about $P(-2, 3, 5)$',
          body: '**Step 1 · The force.** $\\vec F = \\vec{AB} = (4, 4, -1)$.\n**Step 2 · Pivot to force.** $\\vec r = \\vec{PA} = (1, -2, 4) - (-2, 3, 5) = (3, -5, -1)$.\n**Step 3 · Cross.**\n$$\\vec M_P = \\begin{vmatrix}\\vec i & \\vec j & \\vec k \\\\ 3 & -5 & -1 \\\\ 4 & 4 & -1\\end{vmatrix} = \\vec i(5 + 4) - \\vec j(-3 + 4) + \\vec k(12 + 20) = 9\\vec i - \\vec j + 32\\vec k.$$',
          asides: [{ label: 'Exam tip', text: 'Always $\\vec r \\times \\vec F$, with $\\vec r$ **from the pivot** to the point of action. $\\vec F \\times \\vec r$ gives the wrong sign.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A force $\\vec F = 2\\vec j$ acts at $A(1, 0, 0)$. Find its moment about the origin.',
          options: [
            { text: '$2\\vec k$', correct: true, why: '$\\vec r = \\vec i$, and $\\vec i \\times 2\\vec j = 2\\vec k$.' },
            { text: '$-2\\vec k$', why: 'That is $\\vec F \\times \\vec r$. Use $\\vec r \\times \\vec F$.' },
            { text: '$2$', why: 'A moment is a vector.' },
            { text: '$\\vec 0$', why: 'The force is perpendicular to $\\vec r$, so it turns the body.' },
          ],
        },
        {
          type: 'finish',
          title: 'The cross product: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
