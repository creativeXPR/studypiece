// MTH 210 · Products · Lesson 1: the dot product, the angle between vectors, scalar and vector
// projections, and work done.
import { O, add, deg, dot, mul, norm, num } from './vec';

// b lies in the floor; a swings in the tilted plane spanned by b and e2.
const B = [1.6, 3.6, 0];
const E1 = mul(1 / norm(B), B);
const E2 = mul(1 / norm([-3.6, 1.6, 2.4]), [-3.6, 1.6, 2.4]);
const aAt = (t) => add(mul(3.2 * Math.cos(t), E1), mul(3.2 * Math.sin(t), E2));

export default {
  id: 'dot-product',
  title: 'The dot product',
  covers: 'a · b in components and as |a||b|cos θ, properties, perpendicular vectors, the angle between two vectors, scalar and vector projections, work done',
  minutes: 16,
  sections: [
    {
      name: 'Dot product and angles',
      terms: [
        ['Dot (scalar) product', '$\\vec a \\cdot \\vec b = a_1b_1 + a_2b_2 + a_3b_3 = \\|\\vec a\\|\\|\\vec b\\|\\cos\\theta$. The answer is a **scalar**.'],
        ['Perpendicular test', '$\\vec a \\cdot \\vec b = 0 \\iff \\vec a \\perp \\vec b$ (non-zero vectors).'],
        ['Angle between vectors', '$\\cos\\theta = \\dfrac{\\vec a \\cdot \\vec b}{\\|\\vec a\\|\\|\\vec b\\|}$, $0 \\le \\theta \\le 180°$.'],
        ['Unit vector rules', '$\\vec i \\cdot \\vec i = \\vec j \\cdot \\vec j = \\vec k \\cdot \\vec k = 1$, $\\vec i \\cdot \\vec j = \\vec j \\cdot \\vec k = \\vec k \\cdot \\vec i = 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Products · Lesson 1',
          title: 'Multiply matching parts, then add',
          body: 'The ==dot product== of $\\vec a = (a_1, a_2, a_3)$ and $\\vec b = (b_1, b_2, b_3)$ is a **number**:\n$$\\vec a \\cdot \\vec b = a_1b_1 + a_2b_2 + a_3b_3 = \\|\\vec a\\|\\,\\|\\vec b\\|\\cos\\theta,$$\nwhere $\\theta$ is the angle between them.\n\n**Example.** $(1, 2, 2) \\cdot (3, 0, 4) = 3 + 0 + 8 = 11$.',
          cta: 'Turn the angle',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'The sign of $\\vec a \\cdot \\vec b$ follows the angle',
          body: 'Swing $\\vec a$ around $\\vec b$. The red arrow is the part of $\\vec a$ that lies along $\\vec b$.',
          graph: {
            R: 4, floor: true,
            params: [{ label: 'turn $\\vec a$', min: 0, max: 3.1, step: 0.1, value: 0.8 }],
            draw: (P) => {
              const a = aAt(P[0]);
              const shadow = mul(dot(a, E1), E1);
              return [
                { seg: [mul(-4, E1), mul(4.2, E1)], kind: 's', thin: true },
                { arrow: [O, B], kind: 'b', label: 'b' },
                { arrow: [O, a], kind: 'a', label: 'a' },
                { seg: [a, shadow], kind: 's', dash: true },
                ...(norm(shadow) > 0.05 ? [{ arrow: [O, shadow], kind: 'd' }] : []),
              ];
            },
            read: (P) => {
              const a = aAt(P[0]);
              const d = dot(a, B);
              const th = deg(Math.acos(d / (norm(a) * norm(B))));
              const kind = Math.abs(d) < 0.3 ? 'nearly **perpendicular**' : d > 0 ? '**acute**: positive' : '**obtuse**: negative';
              return `$\\theta \\approx ${num(th, 0)}°$, $\\vec a \\cdot \\vec b \\approx ${num(d, 1)}$: ${kind}`;
            },
            need: 4,
            action: 'Swing a past 90°',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For which value of $t$ are $\\vec a = (2, t, 1)$ and $\\vec b = (1, 2, -4)$ perpendicular?',
          options: [
            { text: '$t = 1$', correct: true, why: '$\\vec a \\cdot \\vec b = 2 + 2t - 4 = 2t - 2 = 0$.' },
            { text: '$t = -1$', why: '$2 - 2 - 4 = -4 \\ne 0$.' },
            { text: '$t = 2$', why: '$2 + 4 - 4 = 2 \\ne 0$.' },
            { text: 'No value works', why: 'Set $\\vec a \\cdot \\vec b = 0$ and solve.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'The angle between $\\vec a = (1, 2, 2)$ and $\\vec b = (3, 0, 4)$',
          body: '$\\vec a \\cdot \\vec b = 3 + 0 + 8 = 11$, $\\|\\vec a\\| = \\sqrt{9} = 3$, $\\|\\vec b\\| = \\sqrt{25} = 5$.\n$$\\cos\\theta = \\frac{11}{3 \\times 5} = \\frac{11}{15} \\Rightarrow \\theta = \\cos^{-1}(0.7333) \\approx 42.83°.$$\nWith direction cosines it is the same: $\\left(\\frac13, \\frac23, \\frac23\\right) \\cdot \\left(\\frac35, 0, \\frac45\\right) = \\frac{11}{15}$.',
          asides: [{ label: 'Note', text: 'Three ways to the angle: the dot product, direction cosines ($\\cos\\theta = l_1l_2 + m_1m_2 + n_1n_2$), or the cross product ($\\sin\\theta = \\frac{\\|\\vec a \\times \\vec b\\|}{\\|\\vec a\\|\\|\\vec b\\|}$).' }],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which are true?',
          options: [
            { text: '$\\vec a \\cdot \\vec a = \\|\\vec a\\|^2$', correct: true, why: '$\\theta = 0$, so $\\vec a \\cdot \\vec a = \\|\\vec a\\|^2\\cos 0$.' },
            { text: '$\\vec i \\cdot \\vec j = 0$', correct: true, why: 'The axes are perpendicular.' },
            { text: '$\\vec a \\cdot \\vec b = \\vec b \\cdot \\vec a$', correct: true, why: 'The dot product is commutative.' },
            { text: '$\\vec a \\cdot \\vec b = 0$ means $\\vec a = \\vec 0$ or $\\vec b = \\vec 0$.', why: 'They may just be **perpendicular**.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Dot product: set.',
          recap: ['$\\vec a \\cdot \\vec b = a_1b_1 + a_2b_2 + a_3b_3 = \\|\\vec a\\|\\|\\vec b\\|\\cos\\theta$.', 'Zero means perpendicular; negative means obtuse.'],
          why: 'Next: two uses that come up in every exam, projections and work.',
        },
      ],
    },
    {
      name: 'Projections and work',
      terms: [
        ['Scalar projection', '$\\operatorname{comp}_{\\vec b}\\vec a = \\dfrac{\\vec a \\cdot \\vec b}{\\|\\vec b\\|}$: how far $\\vec a$ reaches along $\\vec b$.'],
        ['Vector projection', '$\\operatorname{proj}_{\\vec b}\\vec a = \\dfrac{\\vec a \\cdot \\vec b}{\\|\\vec b\\|^2}\\,\\vec b$: that reach, as a vector along $\\vec b$.'],
        ['Work done', '$W = \\vec F \\cdot \\vec d$ for a constant force $\\vec F$ moving through displacement $\\vec d$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Projections',
          title: 'The shadow of $\\vec a$ on $\\vec b$',
          body: 'The red arrow in the last picture is the ==vector projection==. Its signed length is the ==scalar projection==:\n$$\\operatorname{comp}_{\\vec b}\\vec a = \\frac{\\vec a \\cdot \\vec b}{\\|\\vec b\\|}, \\qquad \\operatorname{proj}_{\\vec b}\\vec a = \\frac{\\vec a \\cdot \\vec b}{\\|\\vec b\\|^2}\\,\\vec b.$$\n**Example.** $\\vec a = (3, -2, 4)$ onto $\\vec b = (1, 5, -1)$: $\\vec a \\cdot \\vec b = 3 - 10 - 4 = -11$, $\\|\\vec b\\| = \\sqrt{27}$.\n$$\\operatorname{comp} = \\frac{-11}{\\sqrt{27}} \\approx -2.117, \\qquad \\operatorname{proj} = -\\frac{11}{27}(1, 5, -1).$$\nThe minus sign says $\\vec a$ points partly **against** $\\vec b$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the scalar projection of $\\vec b = (2, 2, 1)$ onto $\\vec a = (4, -1, 2)$.',
          options: [
            { text: '$\\frac{8}{\\sqrt{21}}$', correct: true, why: '$\\vec b \\cdot \\vec a = 8 - 2 + 2 = 8$ and $\\|\\vec a\\| = \\sqrt{21}$. Divide by the length of the vector you project **onto**.' },
            { text: '$\\frac83$', why: 'You divided by $\\|\\vec b\\| = 3$. Project **onto** $\\vec a$: divide by $\\|\\vec a\\|$.' },
            { text: '$\\frac{8}{21}$', why: 'That is the factor in the vector projection, $\\frac{8}{21}\\vec a$.' },
            { text: '$8$', why: 'Divide the dot product by $\\|\\vec a\\|$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Work done',
          title: 'Only the part of the force along the motion does work',
          body: '$$W = \\vec F \\cdot \\vec d = \\|\\vec F\\|\\|\\vec d\\|\\cos\\theta.$$\n**Example (two forces).** $\\vec F_1 = 4\\vec i + 3\\vec j - 3\\vec k$ and $\\vec F_2 = 3\\vec i + \\vec j - \\vec k$ move a particle from $(1, 2, 1)$ to $(5, 4, 1)$.\n\n**Step 1 · Resultant.** $\\vec F = \\vec F_1 + \\vec F_2 = (7, 4, -4)$.\n**Step 2 · Displacement.** $\\vec d = (5, 4, 1) - (1, 2, 1) = (4, 2, 0)$.\n**Step 3.** $W = 28 + 8 + 0 = 36$ J.',
          asides: [{ label: 'Exam tip', text: 'With several forces, add them first, then dot with the displacement. The displacement is **end minus start**.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: '$\\vec F = 6\\vec i - 2\\vec j + 3\\vec k$ N moves a particle from $A(1, -2, 3)$ to $B(5, 1, 7)$. Find the work done.',
          options: [
            { text: '$30$ J', correct: true, why: '$\\vec d = (4, 3, 4)$, so $W = 24 - 6 + 12 = 30$.' },
            { text: '$42$ J', why: 'Check the sign: $(-2)(3) = -6$.' },
            { text: '$49$ J', why: 'That uses the position of $B$. Use the displacement $B - A$.' },
            { text: '$7$ J', why: 'Multiply matching components, then add.' },
          ],
        },
        {
          type: 'finish',
          title: 'The dot product: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
