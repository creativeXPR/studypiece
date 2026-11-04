// MTH 210 · Curves · Lesson 2: arc length, the unit tangent, principal normal and binormal,
// curvature and torsion, and the Serret–Frenet formulas.
import { add, cross, mul, norm, num } from './vec';

const A = 2.5;
const C = 0.4;
const r = (t) => [A * Math.cos(t), A * Math.sin(t), C * (t - 2 * Math.PI)];
const frame = (t) => {
  const d = [-A * Math.sin(t), A * Math.cos(t), C];
  const u = mul(1 / norm(d), d);
  const n = [-Math.cos(t), -Math.sin(t), 0];
  return { u, n, b: cross(u, n) };
};

export default {
  id: 'serret-frenet',
  title: 'Serret–Frenet: tangent, normal, binormal',
  covers: 'Arc length, the unit tangent u, curvature κ and radius of curvature, the principal normal n, the binormal b, torsion τ, the three Serret–Frenet formulas and their derivation, computing κ and τ',
  minutes: 18,
  sections: [
    {
      name: 'Three moving unit vectors',
      terms: [
        ['Unit tangent', '$\\vec u = \\dfrac{\\vec r\\,\'(t)}{\\|\\vec r\\,\'(t)\\|} = \\dfrac{d\\vec r}{ds}$, with arc length $s$: $\\frac{ds}{dt} = \\|\\vec r\\,\'(t)\\|$.'],
        ['Curvature', '$\\kappa = \\left\\|\\dfrac{d\\vec u}{ds}\\right\\| = \\dfrac{\\|\\vec r\\,\' \\times \\vec r\\,\'\'\\|}{\\|\\vec r\\,\'\\|^3}$; radius of curvature $\\rho = \\frac1\\kappa$.'],
        ['Principal normal', '$\\vec n = \\dfrac{d\\vec u/ds}{\\|d\\vec u/ds\\|}$: points towards the inside of the bend.'],
        ['Binormal', '$\\vec b = \\vec u \\times \\vec n = \\dfrac{\\vec r\\,\' \\times \\vec r\\,\'\'}{\\|\\vec r\\,\' \\times \\vec r\\,\'\'\\|}$.'],
        ['Right-handed set', '$\\vec u \\times \\vec n = \\vec b$, $\\vec n \\times \\vec b = \\vec u$, $\\vec b \\times \\vec u = \\vec n$, like $\\vec i, \\vec j, \\vec k$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Curves · Lesson 2',
          title: 'A little set of axes riding along the curve',
          body: 'As a particle moves along a space curve, three unit vectors travel with it:\n\n**Tangent** $\\vec u$: the direction of motion, $\\vec u = \\frac{\\vec r\\,\'}{\\|\\vec r\\,\'\\|}$.\n**Principal normal** $\\vec n$: the direction the curve is **turning**.\n**Binormal** $\\vec b = \\vec u \\times \\vec n$: perpendicular to both.',
          cta: 'Ride the helix',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: '$\\vec u$, $\\vec n$, $\\vec b$ on a helix',
          body: 'Blue $\\vec u$ (tangent), red $\\vec n$ (normal, pointing in to the axis), green $\\vec b$ (binormal). Slide $t$ and turn the picture: the three stay at right angles.',
          graph: {
            R: 3,
            params: [{ label: '$t$', min: 0, max: 12.5, step: 0.25, value: 3 }],
            draw: (P) => {
              const p = r(P[0]);
              const { u, n, b } = frame(P[0]);
              return [
                { curve: r, from: 0, to: 4 * Math.PI, kind: 's', n: 240 },
                { arrow: [p, add(p, mul(1.3, u))], kind: 'a', label: 'u' },
                { arrow: [p, add(p, mul(1.3, n))], kind: 'd', label: 'n' },
                { arrow: [p, add(p, mul(1.3, b))], kind: 'b', label: 'b' },
                { pt: p, kind: 's' },
              ];
            },
            read: () => `For this helix, $\\kappa = \\frac{a}{a^2 + c^2} = \\frac{2.5}{6.41} \\approx ${num(A / (A * A + C * C), 3)}$ and $\\tau = \\frac{c}{a^2 + c^2} \\approx ${num(C / (A * A + C * C), 3)}$ at every point`,
            need: 3,
            action: 'Slide t and turn the picture',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $\\vec r(t) = (\\cos t, \\sin t, t)$, find the unit tangent $\\vec u$.',
          options: [
            { text: '$\\frac{1}{\\sqrt2}(-\\sin t, \\cos t, 1)$', correct: true, why: '$\\vec r\\,\' = (-\\sin t, \\cos t, 1)$ has length $\\sqrt{\\sin^2 t + \\cos^2 t + 1} = \\sqrt2$.' },
            { text: '$(-\\sin t, \\cos t, 1)$', why: 'Its length is $\\sqrt2$: divide by it.' },
            { text: '$(-\\cos t, -\\sin t, 0)$', why: 'That is the principal normal $\\vec n$.' },
            { text: '$\\frac{1}{\\sqrt2}(\\cos t, \\sin t, t)$', why: 'Differentiate $\\vec r$ first.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The moving frame: set.',
          recap: ['$\\vec u = \\vec r\\,\' / \\|\\vec r\\,\'\\|$; $\\vec b \\parallel \\vec r\\,\' \\times \\vec r\\,\'\'$; $\\vec n = \\vec b \\times \\vec u$.', 'Curvature: how fast it bends. Torsion: how fast it twists.'],
          why: 'Now the three formulas that link them.',
        },
      ],
    },
    {
      name: 'The formulas',
      terms: [
        ['Serret–Frenet', '$\\dfrac{d\\vec u}{ds} = \\kappa\\vec n$, $\\quad \\dfrac{d\\vec b}{ds} = -\\tau\\vec n$, $\\quad \\dfrac{d\\vec n}{ds} = -\\kappa\\vec u + \\tau\\vec b$.'],
        ['Torsion', '$\\tau = \\dfrac{(\\vec r\\,\' \\times \\vec r\\,\'\') \\cdot \\vec r\\,\'\'\'}{\\|\\vec r\\,\' \\times \\vec r\\,\'\'\\|^2}$; radius of torsion $\\sigma = \\frac1\\tau$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Deriving them',
          title: 'Three lines of proof',
          body: '**(I)** By definition $\\vec n = \\frac{d\\vec u/ds}{\\kappa}$, so $\\frac{d\\vec u}{ds} = \\kappa\\vec n$.\n\n**(II)** Differentiate $\\vec b \\cdot \\vec u = 0$: $\\frac{d\\vec b}{ds} \\cdot \\vec u + \\vec b \\cdot \\kappa\\vec n = 0$, so $\\frac{d\\vec b}{ds} \\perp \\vec u$. From $\\vec b \\cdot \\vec b = 1$, $\\frac{d\\vec b}{ds} \\perp \\vec b$. So it is parallel to $\\vec n$: $\\frac{d\\vec b}{ds} = -\\tau\\vec n$.\n\n**(III)** Differentiate $\\vec n = \\vec b \\times \\vec u$:\n$$\\frac{d\\vec n}{ds} = (-\\tau\\vec n) \\times \\vec u + \\vec b \\times (\\kappa\\vec n) = \\tau\\vec b - \\kappa\\vec u.$$',
          asides: [{ label: 'Exam tip', text: 'For (III) you need $\\vec n \\times \\vec u = -\\vec b$ and $\\vec b \\times \\vec n = -\\vec u$: go round $u \\to n \\to b$ and reverse for a minus.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Curvature and torsion of $x = t$, $y = t^2$, $z = \\frac23t^3$',
          body: '$\\vec r\\,\' = (1, 2t, 2t^2)$, $\\vec r\\,\'\' = (0, 2, 4t)$, $\\vec r\\,\'\'\' = (0, 0, 4)$.\n$$\\vec r\\,\' \\times \\vec r\\,\'\' = (4t^2, -4t, 2), \\qquad \\|\\vec r\\,\' \\times \\vec r\\,\'\'\\| = 2(1 + 2t^2), \\qquad \\|\\vec r\\,\'\\| = 1 + 2t^2.$$\n$$\\kappa = \\frac{2(1 + 2t^2)}{(1 + 2t^2)^3} = \\frac{2}{(1 + 2t^2)^2}, \\qquad \\tau = \\frac{2 \\times 4}{4(1 + 2t^2)^2} = \\frac{2}{(1 + 2t^2)^2}.$$\nHere $\\kappa = \\tau$ at every point: at $t = 0$ both are $2$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Which Serret–Frenet formula is correct?',
          options: [
            { text: '$\\dfrac{d\\vec n}{ds} = -\\kappa\\vec u + \\tau\\vec b$', correct: true, why: 'From differentiating $\\vec n = \\vec b \\times \\vec u$.' },
            { text: '$\\dfrac{d\\vec u}{ds} = \\tau\\vec n$', why: 'The tangent turns with the **curvature**: $\\kappa\\vec n$.' },
            { text: '$\\dfrac{d\\vec b}{ds} = \\tau\\vec n$', why: 'There is a minus sign: $-\\tau\\vec n$.' },
            { text: '$\\dfrac{d\\vec n}{ds} = \\kappa\\vec u - \\tau\\vec b$', why: 'The signs are the other way round.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A plane curve (lying in one plane) has torsion',
          options: [
            { text: '$\\tau = 0$', correct: true, why: 'It never twists out of its plane, so $\\vec b$ is constant.' },
            { text: '$\\tau = \\kappa$', why: 'That happened for one special curve, not in general.' },
            { text: '$\\tau = 1$', why: 'Torsion measures twisting out of the plane: none here.' },
            { text: 'undefined', why: 'It is defined and equal to $0$ wherever $\\kappa \\ne 0$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Serret–Frenet: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
