// STA 221 · Statistics from Zero · Lesson 2: a pile of heights becomes the normal curve, areas are
// proportions, re-labelling the ruler in standard deviations gives z scores, and the table Φ(z).
import { areaPts, axis, curvePts } from './campus';
import { Phi, fmt, normalPdf, shade } from './stat';

// Heights of 1,000 adults: mean 165 cm, SD 6 cm, in 2 cm bins from 147 to 183.
const MU = 165;
const SD = 6;
const H = (v) => 20 + ((v - 147) / 36) * 300;
const BINS = Array.from({ length: 18 }, (_, i) => 147 + 2 * i);
const count = (b) => 1000 * (Phi((b + 2 - MU) / SD) - Phi((b - MU) / SD));
const BASE = 200;
const Y = (c) => BASE - c * 1.05; // 1 person = 1.05 px of height
const dens = (v) => Y(1000 * 2 * normalPdf(v, MU, SD));
const ZT = [-3, -2, -1, 0, 1, 2, 3];

const scene = {
  aria: 'A histogram of heights becoming the normal curve, then the ruler relabelled in z scores',
  steps: [
    { say: 'We measure the heights of **1,000 adults** and stack them in $2$ cm groups, just like the study-hours pile.' },
    { say: 'Look at the shape: a **symmetric hill**. Most people are near the middle; the further from the middle, the fewer people there are, on both sides equally.' },
    { say: 'Smooth off the steps and you get a famous curve: the **normal curve**. Heights, exam marks, measurement errors and many averages all pile up this way.' },
    { say: `The pile has a centre, the mean $\\mu = ${MU}$ cm, and a spread, the standard deviation $\\sigma = ${SD}$ cm.` },
    { say: `**Areas are proportions.** The shaded part, everyone taller than $171$ cm, holds about $${fmt(100 * (1 - Phi(1)), 1)}\\%$ of the people. The whole area is $1$ ($100\\%$).` },
    { say: 'Now a clever trick. Re-label the ruler in **standard deviations from the mean**: $165 \\to 0$, $171 \\to 1$, $159 \\to -1$, and so on.' },
    { say: 'These new numbers are **z scores**: $z = \\dfrac{x - \\mu}{\\sigma}$, "how many standard deviations from the mean". $171$ cm is $1$ SD above, so $z = 1$.' },
    { say: `Measured in z, **every** normal curve looks exactly the same. So one table does for all of them: it gives $\\Phi(z)$, the area to the **left** of $z$. Here $\\Phi(1) = ${Phi(1).toFixed(4)}$.` },
  ],
  draw: (step) => {
    const shapes = BINS.map((b, i) => ({ id: `b${i}`, bar: [H(b) + 0.5, BASE], w: H(b + 2) - H(b) - 1, h: step >= 0 ? count(b) * 1.05 : 0, kind: 'a', o: step >= 2 ? 0.35 : 1, delay: i * 40 }));
    const z = step >= 5;
    shapes.push(...axis('h', BASE, { at: z ? (t) => H(MU + SD * t) : H, ticks: z ? ZT.map((t) => [t, String(t)]) : [150, 155, 160, 165, 170, 175, 180].map((v) => [v, String(v)]) }));
    shapes.push({ id: 'zname', text: [330, BASE + 14], label: z ? 'z' : 'cm', kind: 's', size: 10 });
    shapes.push({ id: 'curve', curve: curvePts(dens, 147, 183, { at: H }), kind: 'a', o: step >= 2 ? 1 : 0 });
    shapes.push({ id: 'mu', vline: H(MU), y1: 40, y2: BASE, kind: 'd', dash: true, o: step >= 3 ? 1 : 0 });
    shapes.push({ id: 'mulab', text: [H(MU), 34], label: z ? 'z = 0' : 'μ = 165', kind: 'd', size: 12, o: step >= 3 ? 1 : 0 });
    shapes.push({ id: 'sdarrow', line: [H(MU), 120, H(MU + SD), 120], kind: 'c', o: step >= 3 && step <= 6 ? 1 : 0 });
    shapes.push({ id: 'sdlab', text: [H(MU + SD / 2), 113], label: 'σ = 6', kind: 'c', size: 11, o: step >= 3 && step <= 6 ? 1 : 0 });
    shapes.push({ id: 'tail', area: areaPts(dens, 171, 183, BASE, { at: H }), kind: 'c', o: step === 4 || step === 6 ? 1 : 0 });
    shapes.push({ id: 'taillab', text: [H(177), 150], label: `${fmt(100 * (1 - Phi(1)), 1)}%`, kind: 'c', size: 13, o: step === 4 ? 1 : 0 });
    shapes.push({ id: 'left', area: areaPts(dens, 147, 171, BASE, { at: H }), kind: 'b', o: step >= 7 ? 1 : 0 });
    shapes.push({ id: 'leftlab', text: [H(160), 150], label: `Φ(1) = ${Phi(1).toFixed(4)}`, kind: 'b', size: 13, o: step >= 7 ? 1 : 0 });
    return shapes;
  },
};

const f = (x) => normalPdf(x);

export default {
  id: 'normal-curve',
  title: 'The normal curve and z scores',
  covers: 'A pile of measurements becoming the normal curve, areas as proportions, z = (x − μ)/σ, the table Φ(z), left, right and middle areas, Φ(−a) = 1 − Φ(a), and the landmark 1.96',
  minutes: 15,
  sections: [
    {
      name: 'From a pile to a curve',
      terms: [
        ['Normal curve', 'The symmetric, bell-shaped pile: centred on the mean $\\mu$, spread set by $\\sigma$, total area $1$.'],
        ['Area = proportion', 'The area under the curve between two values is the fraction of the population between them.'],
        ['z score', '$z = \\dfrac{x - \\mu}{\\sigma}$: how many standard deviations $x$ is from the mean.'],
        ['Φ(z)', '$P(Z \\le z)$, the area to the **left** of $z$, read from the normal table.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'Statistics from Zero · Lesson 2', title: 'A hill made of people', graph: scene },
        {
          type: 'choice',
          eyebrow: 'Think about it',
          prompt: 'On the same curve, what fraction of people are **shorter** than $165$ cm (the mean)?',
          options: [
            { text: 'Half: $0.5$', correct: true, why: 'The curve is symmetric about the mean, so the area to the left of the middle is exactly half. In z terms, $\\Phi(0) = 0.5$.' },
            { text: 'All of them', why: 'Half the hill lies to the right of the mean.' },
            { text: '$0.8413$', why: 'That is the area left of $171$ cm ($z = 1$).' },
            { text: 'It depends on $\\sigma$', why: 'Whatever the spread, the mean cuts a symmetric hill in half.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The curve: set.',
          recap: ['Areas under the curve are proportions.', 'z measures distance from the mean in SDs.', 'The table gives the **left** area $\\Phi(z)$.'],
          why: 'Now use the table for any area you need.',
        },
      ],
    },
    {
      name: 'Reading areas',
      terms: [
        ['Three rules', '$P(Z > a) = 1 - \\Phi(a)$; $P(a < Z < b) = \\Phi(b) - \\Phi(a)$; $\\Phi(-a) = 1 - \\Phi(a)$.'],
        ['Landmarks', 'About $68\\%$ lies within $1\\sigma$, $95\\%$ within $1.96\\sigma$, $99.7\\%$ within $3\\sigma$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Left, right and middle areas',
          body: 'Move $z$ and switch between the three kinds of area. The table gives the **left** area; the other two come from it.',
          graph: {
            x: [-3.6, 3.6], y: [0, 0.45], xs: [[-3], [-2], [-1], [0], [1], [2], [3]], ys: [],
            param: { label: '$z$', min: -3, max: 3, step: 0.1, value: 1 },
            views: ['Left of z', 'Right of z', 'Between −z and z'],
            rects: [{ kind: 'band', at: (z, v) => (v === 0 ? shade(f, -3.6, z) : v === 1 ? shade(f, z, 3.6) : shade(f, -Math.abs(z), Math.abs(z))) }],
            curves: [{ f }],
            read: (z, v) => {
              if (v === 0) return `$P(Z \\le ${fmt(z, 1)}) = \\Phi(${fmt(z, 1)}) = ${Phi(z).toFixed(4)}$`;
              if (v === 1) return `$P(Z > ${fmt(z, 1)}) = 1 - \\Phi(${fmt(z, 1)}) = ${(1 - Phi(z)).toFixed(4)}$`;
              const a = Math.abs(z);
              return `$P(-${fmt(a, 1)} < Z < ${fmt(a, 1)}) = 2\\Phi(${fmt(a, 1)}) - 1 = ${(2 * Phi(a) - 1).toFixed(4)}$`;
            },
            need: 5,
            action: 'Try each view; find where the middle area is 95%',
          },
          asides: [{ label: 'Exam tip', text: 'Set $z = 1.96$ in the middle view: the area is $0.95$. That number, $1.96$, appears all through the course.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Heights: $\\mu = 165$ cm, $\\sigma = 6$ cm',
          body: '**(a)** $P(X > 171)$: $z = \\frac{171 - 165}{6} = 1$, so $P = 1 - \\Phi(1) = 1 - 0.8413 = 0.1587$.\n\n**(b)** $P(159 < X < 177)$: $z_1 = -1$, $z_2 = 2$, so\n$$P = \\Phi(2) - \\Phi(-1) = 0.9772 - (1 - 0.8413) = 0.8185.$$',
          asides: [{ label: 'Tip', text: '"More than", "at least", "exceeds" → right tail, $1 - \\Phi$. "Less than", "at most" → left tail, $\\Phi$. Sketch the curve and shade first.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Using $\\Phi(1.5) = 0.9332$, find $P(Z < -1.5)$.',
          options: [
            { text: '$0.0668$', correct: true, why: '$\\Phi(-1.5) = 1 - \\Phi(1.5) = 0.0668$: the small left tail mirrors the small right tail.' },
            { text: '$0.9332$', why: 'That is the area left of $+1.5$. Left of $-1.5$ is the small tail.' },
            { text: '$-0.9332$', why: 'Probabilities are never negative.' },
            { text: '$0.8664$', why: 'That is the middle area $2\\Phi(1.5) - 1$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Marks are normal with $\\mu = 60$, $\\sigma = 10$. Using $\\Phi(2) = 0.9772$, what fraction score above $80$?',
          options: [
            { text: '$0.0228$', correct: true, why: '$z = \\frac{80 - 60}{10} = 2$, and $1 - 0.9772 = 0.0228$.' },
            { text: '$0.9772$', why: 'That is the fraction **below** $80$.' },
            { text: '$0.2$', why: 'Convert to $z$ and use the table; areas are not proportional to distance.' },
            { text: '$0.0456$', why: 'That is both tails, beyond $\\pm 2$.' },
          ],
        },
        { type: 'finish', title: 'The normal curve: done.', body: 'Key terms, ready for revision:' },
      ],
    },
  ],
};
