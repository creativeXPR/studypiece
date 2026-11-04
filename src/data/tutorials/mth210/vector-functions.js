// MTH 210 · Curves · Lesson 1: vector-valued functions, domains, plane and space curves, graphing,
// orientation, reparametrization, tracing a given curve, limits and continuity.
import { num } from './vec';

const CURVES = [
  { r: (t) => [4 * Math.cos(t), 3 * Math.sin(t), 0], max: 2 * Math.PI, tex: '4\\cos t\\,\\vec i + 3\\sin t\\,\\vec j', tmax: '2\\pi' },
  { r: (t) => [4 * Math.cos(t * t), 3 * Math.sin(t * t), 0], max: Math.sqrt(2 * Math.PI), tex: '4\\cos(t^2)\\,\\vec i + 3\\sin(t^2)\\,\\vec j', tmax: '\\sqrt{2\\pi}' },
  { r: (t) => [2 * Math.cos(t), 2 * Math.sin(t), 0], max: 2 * Math.PI, tex: '2\\cos t\\,\\vec i + 2\\sin t\\,\\vec j', tmax: '2\\pi' },
  { r: (t) => [t, (t * t * t) / 4, 0], min: -2.6, max: 2.6, tex: 't\\,\\vec i + \\tfrac14t^3\\,\\vec j', tmax: '2.6' },
];

const helix = (t) => [2.5 * Math.cos(t), 2.5 * Math.sin(t), 0.4 * (t - 2 * Math.PI)];

export default {
  id: 'vector-functions',
  title: 'Vector functions and their graphs',
  covers: 'Vector-valued functions, component functions, domains, plane and space curves, graphing with a table, orientation, ellipse and helix, reparametrization, tracing ellipses, circles, hyperbolas and y = f(x), limits and continuity',
  minutes: 18,
  sections: [
    {
      name: 'Curves from vectors',
      terms: [
        ['Vector-valued function', '$\\vec r(t) = f(t)\\vec i + g(t)\\vec j$ (plane) or $f(t)\\vec i + g(t)\\vec j + h(t)\\vec k$ (space), with component functions $f, g, h$ of the parameter $t$.'],
        ['Domain', 'The $t$ values where **every** component is defined: the intersection of their domains.'],
        ['Plane / space curve', 'The path traced by the tips of $\\vec r(t)$ in standard position.'],
        ['Orientation', 'The direction the curve is traced as $t$ increases (arrows on the graph).'],
        ['Reparametrization', 'A different $\\vec r(t)$ tracing the same curve, e.g. $t \\to t^2$: same shape, different speed or interval.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Curves · Lesson 1',
          title: 'Let $t$ run, and the arrow tip draws a curve',
          body: 'A ==vector-valued function== gives a vector for each value of $t$:\n$$\\vec r(t) = f(t)\\vec i + g(t)\\vec j + h(t)\\vec k.$$\nDraw each $\\vec r(t)$ from the origin. The tips trace a **plane curve** (two components) or a **space curve** (three).\n\n**Domain.** $\\vec r(t) = \\sqrt{2 - t}\\,\\vec i + \\ln(t + 3)\\,\\vec j + e^t\\vec k$ needs $t \\le 2$ and $t > -3$: domain $(-3, 2]$.',
          cta: 'Trace some curves',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'The tip of $\\vec r(t)$ traces the curve',
          body: 'Slide $t$ and watch the arrow. Compare the first two: the same ellipse, traced at different speeds.',
          graph: {
            R: 4.2, flat: true,
            views: ['Ellipse', 'Ellipse, t²', 'Circle', 'y = x³/4'],
            params: [{ label: 'how far $t$ has run', min: 0, max: 1, step: 0.05, value: 0.3 }],
            draw: (P, v) => {
              const c = CURVES[v];
              const lo = c.min ?? 0;
              const t = lo + P[0] * (c.max - lo);
              return [
                { curve: c.r, from: lo, to: c.max, kind: 's', dash: true },
                { curve: c.r, from: lo, to: Math.max(lo + 1e-3, t), kind: 'a' },
                { arrow: [[0, 0, 0], c.r(t)], kind: 'd', label: 'r(t)' },
              ];
            },
            read: (P, v) => {
              const c = CURVES[v];
              const lo = c.min ?? 0;
              const t = lo + P[0] * (c.max - lo);
              const p = c.r(t);
              return `$\\vec r(t) = ${c.tex}$, $t = ${num(t)}$: tip at $(${num(p[0])}, ${num(p[1])})$`;
            },
            need: 5,
            action: 'Slide t on two different curves',
          },
          asides: [{ label: 'Note', text: '$4\\cos(t^2)\\vec i + 3\\sin(t^2)\\vec j$, $0 \\le t \\le \\sqrt{2\\pi}$, is a **reparametrization** of the ellipse: put $s = t^2$. So is $t^3$ with $0 \\le t \\le \\sqrt[3]{2\\pi}$.' }],
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'A space curve: the helix',
          body: '$\\vec r(t) = 2.5\\cos t\\,\\vec i + 2.5\\sin t\\,\\vec j + 0.4(t - 2\\pi)\\vec k$. Without the $\\vec k$ part it is a circle; the $\\vec k$ part lifts it steadily, like a spring. Drag to turn it.',
          graph: {
            R: 3,
            params: [{ label: '$t$', min: 0, max: 12.5, step: 0.25, value: 4 }],
            draw: (P) => [
              { curve: helix, from: 0, to: 4 * Math.PI, kind: 's', dash: true },
              { curve: helix, from: 0, to: Math.max(0.01, P[0]), kind: 'a', n: 240 },
              { pt: helix(P[0]), kind: 'd' },
            ],
            read: (P) => `$t = ${num(P[0])}$: height $z = ${num(0.4 * (P[0] - 2 * Math.PI))}$`,
            need: 3,
            action: 'Slide t and turn the picture',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'State the domain of $\\vec r(t) = 3\\tan t\\,\\vec i + 4\\sec t\\,\\vec j + 5t\\,\\vec k$.',
          options: [
            { text: 'All $t$ except $t = \\frac\\pi2(2k + 1)$, $k \\in \\mathbb Z$', correct: true, why: '$\\tan t$ and $\\sec t$ need $\\cos t \\ne 0$.' },
            { text: 'All real $t$', why: '$\\tan t$ is undefined where $\\cos t = 0$.' },
            { text: '$t \\ne k\\pi$', why: 'That is where $\\sin t = 0$; here we need $\\cos t \\ne 0$.' },
            { text: '$t > 0$', why: '$5t$ is defined for every $t$; only $\\tan$ and $\\sec$ restrict it.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Curves: set.',
          recap: ['$\\vec r(t)$ traces a curve; the domain is where every component works.', 'Reparametrizing changes the speed, not the shape.'],
          why: 'Now the reverse: given a curve, find an $\\vec r(t)$ for it.',
        },
      ],
    },
    {
      name: 'Tracing curves, limits',
      terms: [
        ['Ellipse', '$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$: $\\vec r(t) = a\\cos t\\,\\vec i + b\\sin t\\,\\vec j$ (from $\\cos^2 t + \\sin^2 t = 1$).'],
        ['Hyperbola', '$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$: $\\vec r(t) = a\\sec t\\,\\vec i + b\\tan t\\,\\vec j$ (from $\\sec^2 t - \\tan^2 t = 1$).'],
        ['y = f(x)', '$\\vec r(t) = t\\,\\vec i + f(t)\\,\\vec j$: any plane curve can be written this way.'],
        ['Limit', 'Take the limit of each component: $\\lim \\vec r(t) = (\\lim f)\\vec i + (\\lim g)\\vec j + (\\lim h)\\vec k$.'],
        ['Continuity at a', '$\\vec r(a)$ exists, $\\lim_{t \\to a}\\vec r(t)$ exists, and they are equal.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The recipe',
          title: 'Match the curve to a trig identity',
          body: '**Ellipse** $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$: write $\\left(\\frac x4\\right)^2 + \\left(\\frac y3\\right)^2 = 1$ and match $\\cos^2t + \\sin^2t = 1$:\n$$\\vec r(t) = 4\\cos t\\,\\vec i + 3\\sin t\\,\\vec j, \\quad 0 \\le t \\le 2\\pi.$$\n**Circle** $x^2 + y^2 = 4$: $\\vec r(t) = 2\\cos t\\,\\vec i + 2\\sin t\\,\\vec j$.\n\n**Hyperbola** $\\frac{x^2}{25} - \\frac{y^2}{16} = 1$: match $\\sec^2t - \\tan^2t = 1$: $\\vec r(t) = 5\\sec t\\,\\vec i + 4\\tan t\\,\\vec j$.\n\n**Any** $y = f(x)$: put $x = t$: $\\vec r(t) = t\\,\\vec i + f(t)\\,\\vec j$.',
          asides: [{ label: 'Note', text: 'Swapping $\\sin$ and $\\cos$ traces the same curve in the opposite orientation.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A vector function tracing $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$ is',
          options: [
            { text: '$3\\cos t\\,\\vec i + 5\\sin t\\,\\vec j$', correct: true, why: '$\\left(\\frac x3\\right)^2 + \\left(\\frac y5\\right)^2 = 1$.' },
            { text: '$9\\cos t\\,\\vec i + 25\\sin t\\,\\vec j$', why: 'Use the square roots: $a = 3$, $b = 5$.' },
            { text: '$3\\sec t\\,\\vec i + 5\\tan t\\,\\vec j$', why: 'That traces a hyperbola (minus sign).' },
            { text: '$5\\cos t\\,\\vec i + 3\\sin t\\,\\vec j$', why: 'That gives $\\frac{x^2}{25} + \\frac{y^2}{9} = 1$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Limits',
          title: 'One component at a time',
          body: '**Example.** $\\lim_{t \\to 2}\\left[\\sqrt{t^2 + 3t - 1}\\,\\vec i - (4t - 3)\\,\\vec j - \\sin\\frac{(t + 1)\\pi}{2}\\,\\vec k\\right]$:\n$$\\sqrt{9} = 3, \\qquad -(8 - 3) = -5, \\qquad -\\sin\\frac{3\\pi}{2} = 1.$$\nSo the limit is $3\\vec i - 5\\vec j + \\vec k$.\n\n**Continuity** at $t = a$ needs all three: $\\vec r(a)$ exists, the limit exists, they are equal. $3\\tan t\\,\\vec i + 4\\sec t\\,\\vec j + 5t\\,\\vec k$ is **not** continuous at $\\frac\\pi2$: $\\vec r\\left(\\frac\\pi2\\right)$ does not exist.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: '$\\lim_{t \\to 3}\\left[\\dfrac{2t - 4}{t + 1}\\vec i + \\dfrac{t}{t^2 + 1}\\vec j + (4t - 3)\\vec k\\right] = $',
          options: [
            { text: '$\\frac12\\vec i + \\frac{3}{10}\\vec j + 9\\vec k$', correct: true, why: '$\\frac24$, $\\frac{3}{10}$, $12 - 3$.' },
            { text: '$\\frac12\\vec i + \\frac34\\vec j + 9\\vec k$', why: '$t^2 + 1 = 10$ at $t = 3$.' },
            { text: '$2\\vec i + \\frac{3}{10}\\vec j + 9\\vec k$', why: '$\\frac{6 - 4}{3 + 1} = \\frac12$.' },
            { text: 'It does not exist', why: 'Every component is defined and continuous at $t = 3$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Vector functions: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
