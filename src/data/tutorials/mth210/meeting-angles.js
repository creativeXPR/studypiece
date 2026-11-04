// MTH 210 · Lines and Planes · Lesson 3: where a line meets a plane, the angle between two planes,
// the angle between a line and a plane, the line where two planes meet, point–plane distance.
import { add, deg, mul, num } from './vec';

const FLOOR = [[-2.5, -2.5, 0], [2.5, -2.5, 0], [2.5, 2.5, 0], [-2.5, 2.5, 0]];

export default {
  id: 'meeting-angles',
  title: 'Meeting points and angles',
  covers: 'Line meets plane (substitute the parametric form), angle between two planes, angle between a line and a plane (sin θ), parallel and perpendicular cases, line of intersection of two planes, distance from a point to a plane',
  minutes: 18,
  sections: [
    {
      name: 'Line meets plane',
      terms: [
        ['Line meets plane', 'Write the line as $x = x_1 + at$, $y = y_1 + bt$, $z = z_1 + ct$; substitute into the plane; solve for $t$; put $t$ back.'],
        ['Line–plane angle', '$\\sin\\theta = \\dfrac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\|\\vec n\\|}$ ($\\vec d$ the line’s direction, $\\vec n$ the plane’s normal).'],
        ['Special cases', '$\\vec d \\cdot \\vec n = 0$: line **parallel** to the plane. $\\vec d = \\lambda\\vec n$: line **perpendicular** to the plane ($90°$).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Lines and Planes · Lesson 3',
          title: 'Substitute, solve, put back',
          body: '**Example.** Where does $\\frac{x - 1}{3} = \\frac{y + 2}{4} = \\frac{z - 5}{12}$ meet $2x - 6y + 3z = 8$?\n\n**Step 1 · Parametric.** $x = 1 + 3t$, $y = -2 + 4t$, $z = 5 + 12t$.\n**Step 2 · Substitute.** $2(1 + 3t) - 6(-2 + 4t) + 3(5 + 12t) = 8 \\Rightarrow 29 + 18t = 8 \\Rightarrow t = -\\frac76$.\n**Step 3 · Put back.** $\\left(1 - \\frac72,\\ -2 - \\frac{14}{3},\\ 5 - 14\\right) = \\left(-\\frac52, -\\frac{20}{3}, -9\\right)$.',
          cta: 'Tilt the line',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'The angle between a line and a plane',
          body: 'A line (blue) pierces the floor plane $z = 0$. Tilt it. The angle $\\theta$ is measured between the line and its **shadow** on the plane (dashed); the normal $\\vec n$ is red.',
          graph: {
            R: 3,
            params: [{ label: 'tilt of the line', min: 0, max: 1.5, step: 0.1, value: 0.6 }],
            draw: (P) => {
              const d = [0.4 * Math.cos(P[0]), Math.cos(P[0]), Math.sin(P[0])];
              return [
                { poly: FLOOR, kind: 'c' },
                { seg: [mul(-2.4, [d[0], d[1], 0]), mul(2.4, [d[0], d[1], 0])], kind: 's', dash: true },
                { seg: [mul(-2.4, d), mul(2.4, d)], kind: 'a' },
                { arrow: [[0, 0, 0], [0, 0, 1.6]], kind: 'd', label: 'n' },
                { pt: [0, 0, 0], kind: 'b' },
              ];
            },
            read: (P) => {
              const d = [0.4 * Math.cos(P[0]), Math.cos(P[0]), Math.sin(P[0])];
              const s = Math.abs(d[2]) / Math.hypot(...d);
              const th = deg(Math.asin(s));
              const tag = P[0] === 0 ? ': the line lies **parallel** to the plane ($\\vec d \\cdot \\vec n = 0$)' : th > 89 ? ': **perpendicular** ($\\vec d \\parallel \\vec n$)' : '';
              return `$\\sin\\theta = \\frac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\|\\vec n\\|} \\approx ${num(s, 3)}$, $\\theta \\approx ${num(th, 1)}°$${tag}`;
            },
            need: 4,
            action: 'Lay it flat, then stand it upright',
          },
          asides: [{ label: 'Exam tip', text: 'Line–plane uses **sin**, because $\\vec n$ is at $90°$ to the plane. Plane–plane and line–line use **cos**.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Angle between $\\frac{x - 1}{3} = \\frac{y + 2}{4} = \\frac{z - 3}{12}$ and $2x - 6y + 3z = 8$',
          body: '$\\vec d = (3, 4, 12)$, $\\|\\vec d\\| = 13$; $\\vec n = (2, -6, 3)$, $\\|\\vec n\\| = 7$; $\\vec d \\cdot \\vec n = 6 - 24 + 36 = 18$.\n$$\\sin\\theta = \\frac{18}{13 \\times 7} = \\frac{18}{91} \\Rightarrow \\theta \\approx 11.41°.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Where does $\\vec r(t) = t(3\\vec i + \\vec j - 2\\vec k)$ meet the plane $(\\vec r - \\vec i) \\cdot (2\\vec i - 3\\vec j + \\vec k) = 0$?',
          options: [
            { text: '$(6, 2, -4)$', correct: true, why: 'The plane is $\\vec r \\cdot (2, -3, 1) = 2$. On the line, $\\vec r \\cdot (2, -3, 1) = t(6 - 3 - 2) = t$, so $t = 2$.' },
            { text: '$(3, 1, -2)$', why: 'That is $t = 1$. Solve $t = 2$.' },
            { text: '$(1, 0, 0)$', why: 'That point is in the plane but not on the line.' },
            { text: 'They do not meet', why: '$\\vec d \\cdot \\vec n = 1 \\ne 0$, so the line is not parallel to the plane.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Line and plane: set.',
          recap: ['Meeting point: substitute the parametric line into the plane.', 'Angle: $\\sin\\theta = \\frac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\|\\vec n\\|}$.'],
          why: 'Now two planes.',
        },
      ],
    },
    {
      name: 'Two planes',
      terms: [
        ['Plane–plane angle', '$\\cos\\theta = \\dfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\|\\vec n_2\\|}$ (the angle between the normals).'],
        ['Parallel / perpendicular planes', 'Parallel $\\iff \\vec n_1 = \\lambda\\vec n_2$. Perpendicular $\\iff \\vec n_1 \\cdot \\vec n_2 = 0$.'],
        ['Line of intersection', 'Direction $\\vec n_1 \\times \\vec n_2$; a point by putting e.g. $z = 0$ and solving the two equations.'],
        ['Point–plane distance', '$D = \\dfrac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Two planes meet in a line',
          body: 'The floor is $z = 0$. Tilt the second plane about the $x$-axis. The angle between the planes equals the angle between their normals, and they meet along the red line.',
          graph: {
            R: 3,
            params: [{ label: 'tilt of the second plane', min: 0.2, max: 1.5, step: 0.1, value: 0.7 }],
            draw: (P) => {
              const t = P[0];
              const n2 = [0, -Math.sin(t), Math.cos(t)];
              const v = [0, Math.cos(t), Math.sin(t)];
              return [
                { poly: FLOOR, kind: 'c' },
                { poly: [add([-2.5, 0, 0], mul(-1.6, v)), add([2.5, 0, 0], mul(-1.6, v)), add([2.5, 0, 0], mul(2.2, v)), add([-2.5, 0, 0], mul(2.2, v))], kind: 'a' },
                { seg: [[-2.8, 0, 0], [2.8, 0, 0]], kind: 'd' },
                { arrow: [[1.5, 0, 0], [1.5, 0, 1.4]], kind: 'b', label: 'n₁' },
                { arrow: [[1.5, 0, 0], add([1.5, 0, 0], mul(1.4, n2))], kind: 'e', label: 'n₂' },
              ];
            },
            read: (P) => `$\\cos\\theta = \\vec n_1 \\cdot \\vec n_2 \\approx ${num(Math.cos(P[0]), 3)}$, so $\\theta \\approx ${num(deg(P[0]), 0)}°$. The red line has direction $\\vec n_1 \\times \\vec n_2 \\parallel \\vec i$.`,
            need: 3,
            action: 'Tilt the second plane',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked examples',
          title: 'Angles between planes',
          body: '**(1)** $x - y + z + 8 = 0$ and $3x + 2y - z - 1 = 0$: $\\vec n_1 \\cdot \\vec n_2 = 3 - 2 - 1 = 0$, so the planes are **perpendicular**.\n\n**(2)** $5x - y - 2z = 5$ and $y = 0$: $\\vec n_1 = (5, -1, -2)$, $\\vec n_2 = (0, 1, 0)$.\n$$\\cos\\theta = \\frac{|-1|}{\\sqrt{30} \\times 1} = \\frac{1}{\\sqrt{30}} \\Rightarrow \\theta \\approx 79.48°.$$',
        },
        {
          type: 'story',
          eyebrow: 'Line of intersection',
          title: 'Reduce $x - y + z - 3 = 0$, $x + y - 2z + 1 = 0$ to a line',
          body: '**Step 1 · A point.** Put $z = 0$: $x - y = 3$, $x + y = -1$, so $x = 1$, $y = -2$. Point $(1, -2, 0)$.\n\n**Step 2 · Direction.** $\\vec n_1 \\times \\vec n_2 = (1, -1, 1) \\times (1, 1, -2) = \\vec i(2 - 1) - \\vec j(-2 - 1) + \\vec k(1 + 1) = (1, 3, 2)$.\n$$\\frac{x - 1}{1} = \\frac{y + 2}{3} = \\frac z2.$$',
          asides: [{ label: 'Note', text: 'The line lies in both planes, so it is perpendicular to both normals: that is why its direction is $\\vec n_1 \\times \\vec n_2$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the distance from $P(2, -1, 4)$ to the plane $3x - 2y + 6z - 12 = 0$.',
          options: [
            { text: '$\\frac{20}{7}$', correct: true, why: '$\\frac{|6 + 2 + 24 - 12|}{\\sqrt{9 + 4 + 36}} = \\frac{20}{7}$.' },
            { text: '$\\frac{32}{7}$', why: 'Include $d = -12$ in the top: $|6 + 2 + 24 - 12| = 20$.' },
            { text: '$20$', why: 'Divide by $\\|\\vec n\\| = 7$.' },
            { text: '$\\frac{20}{49}$', why: 'Divide by $\\sqrt{49} = 7$, not $49$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'The direction of the line where $2x - y + z = 4$ meets $x + 2y - z = 1$ is',
          options: [
            { text: '$(-1, 3, 5)$', correct: true, why: '$(2, -1, 1) \\times (1, 2, -1) = \\vec i(1 - 2) - \\vec j(-2 - 1) + \\vec k(4 + 1)$.' },
            { text: '$(3, 1, 0)$', why: 'That adds the normals. Use their cross product.' },
            { text: '$(-1, -3, 5)$', why: 'Check the $\\vec j$ term: $-(-2 - 1) = +3$.' },
            { text: '$(2, -2, -1)$', why: 'That multiplies matching parts. Use the cross product.' },
          ],
        },
        {
          type: 'finish',
          title: 'Meeting points and angles: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
