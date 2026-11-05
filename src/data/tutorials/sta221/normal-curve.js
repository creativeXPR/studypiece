// STA 221 · Statistics from Zero · Lesson 2: the normal curve, z scores and reading the normal
// table (Φ), with the three rules for left, right and middle areas.
import { Phi, fmt, normalPdf, shade } from './stat';

const f = (x) => normalPdf(x);

export default {
  id: 'normal-curve',
  title: 'The normal curve and z scores',
  covers: 'The bell-shaped normal curve, z = (x − μ)/σ, the table Φ(z), left, right and middle areas, Φ(−a) = 1 − Φ(a), the 68–95–99.7 rule and 1.96',
  minutes: 13,
  sections: [
    {
      name: 'z scores and areas',
      terms: [
        ['Normal curve', 'The bell-shaped curve: symmetric about the mean $\\mu$, total area $1$, spread set by $\\sigma$.'],
        ['z score', '$z = \\dfrac{x - \\mu}{\\sigma}$: how many standard deviations $x$ is from the mean.'],
        ['Φ(z)', '$P(Z \\le z)$, the area to the **left** of $z$, read from the normal table.'],
        ['Three rules', '$P(Z > a) = 1 - \\Phi(a)$; $P(a < Z < b) = \\Phi(b) - \\Phi(a)$; $\\Phi(-a) = 1 - \\Phi(a)$.'],
        ['Landmarks', 'About $68\\%$ lies within $1\\sigma$, $95\\%$ within $1.96\\sigma$, $99.7\\%$ within $3\\sigma$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Statistics from Zero · Lesson 2',
          title: 'The shape almost everything takes',
          body: 'Heights, exam marks, the weights of bottles off a machine: plot enough of them and you get a ==normal curve==, a symmetric bell centred on the mean $\\mu$.\n\nAreas under the curve are **probabilities**, and the whole area is $1$.\n\nTo use one table for every normal curve, convert to a ==z score==:\n$$z = \\frac{x - \\mu}{\\sigma}.$$\n$z = 2$ means "two standard deviations above the mean".',
          cta: 'Shade some areas',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Areas under the standard normal curve',
          body: 'Move $z$ and switch between the three kinds of area. The table gives the **left** area $\\Phi(z)$; the other two come from it.',
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
            { text: '$0.0668$', correct: true, why: '$\\Phi(-1.5) = 1 - \\Phi(1.5) = 0.0668$.' },
            { text: '$0.9332$', why: 'That is the area left of $+1.5$. The curve is symmetric: left of $-1.5$ is the small tail.' },
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
        {
          type: 'finish',
          title: 'The normal curve: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
