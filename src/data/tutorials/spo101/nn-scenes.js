// SPO 101 · Chapter 7 pictures: one neuron as a line with a bend (ReLU), two neurons making a peak,
// and more and more bends adding up to follow Ade's sales through the day.
import { frame, view } from '../mth209/plot';

const relu = (z) => Math.max(0, z);

export const neuronScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A line with a bend',
  graph: {
    steps: [
      { say: 'A ==neuron== starts like Ade’s line: multiply the input by a weight, add a bias. Here the input is the **hour of the day** and the output is a straight line.' },
      { say: 'Then comes the one new idea: a **bend**. Anything below zero is flattened to zero. This bend is called ==ReLU==. The neuron is now “off” before 10 o’clock and rises after.', action: { label: 'Apply the bend' } },
      { say: 'The neuron’s two knobs decide **where** the bend sits and **how steep** the rise is. Training can slide the bend anywhere.', action: { label: 'Turn the knobs' } },
      { say: 'Add a second neuron that bends **downwards** from 13 o’clock, and add the two outputs. Together they make a **peak**: rising all morning, falling after lunch. No straight line can do that. Two bends already can.', action: { label: 'Add a second neuron' } },
    ],
    draw: (step, presses) => {
      const v = view(6, 20, -4, 12);
      const items = [
        ...v.axis([7, 9, 11, 13, 15, 17, 19]),
        { id: 'xl', text: [v.X(19.8), v.Y(0) + 0.35], label: 'hour', kind: 's', size: 11, anchor: 'end' },
      ];
      let f = (x) => 0.8 * (x - 10);
      if (presses >= 1) f = (x) => relu(0.8 * (x - 10));
      if (presses >= 2) f = (x) => relu(1.5 * (x - 7));
      if (presses >= 3) {
        items.push({ ...v.graph((x) => relu(1.5 * (x - 7)), 'n1', 's', 6.5, 19.5, 120), o: 0.5 });
        items.push({ ...v.graph((x) => -relu(3 * (x - 13)), 'n2', 'd', 6.5, 19.5, 120), o: 0.5 });
        f = (x) => relu(1.5 * (x - 7)) - relu(3 * (x - 13));
      }
      items.push(v.graph(f, 'out', 'e', 6.5, 19.5, 120));
      const notes = ['$0.8 \\times (\\text{hour} - 10)$', 'ReLU: below zero becomes zero', 'new weight and bias: bend at 7, steeper', 'neuron 1 + neuron 2 = a peak at 13'];
      return frame(items, notes[Math.min(presses, 3)]);
    },
  },
};

export const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
export const SALES = [2, 4, 6, 9, 12, 15, 14, 10, 7, 6, 8, 9, 5];
const at = (h) => SALES[HOURS.indexOf(h)];
// Joining chosen hours with straight pieces is exactly a sum of ReLU neurons, one per inner joint.
const joined = (knots) => (x) => {
  const k = knots.findIndex((h, i) => x <= knots[i + 1] || i === knots.length - 2);
  const [a, b] = [knots[k], knots[k + 1]];
  return at(a) + ((at(b) - at(a)) * (x - a)) / (b - a);
};
const STAGES = [
  [[7, 19], 'no bends: a straight line'],
  [[7, 12, 19], '1 bend (1 neuron)'],
  [[7, 12, 15, 19], '2 bends'],
  [[7, 10, 12, 13, 15, 18, 19], '5 bends'],
  [HOURS, '11 bends'],
];

export const bendsScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Enough bends draw anything',
  graph: {
    steps: [
      { say: 'Ade’s sales hour by hour: slow in the morning, a lunchtime peak, a dip, a small evening rush as students pass. A straight line (no bends) misses almost all of it.' },
      { say: 'Give the model neurons. Each one adds a bend. One bend catches the lunchtime peak; two catch the afternoon dip.', action: { label: 'Add neurons', need: 2 } },
      { say: 'More neurons, more bends, closer fit. With enough bends a network can follow **any** curve: this is why neural networks are so flexible. (And why, with too many, they can overfit.)', action: { label: 'Add more', need: 2 } },
    ],
    draw: (step, presses) => {
      const v = view(6, 20, -3, 18);
      const [knots, name] = STAGES[Math.min(presses, 4)];
      const items = [
        ...v.axis([7, 9, 11, 13, 15, 17, 19]),
        { id: 'xl', text: [v.X(19.8), v.Y(0) + 0.35], label: 'hour', kind: 's', size: 11, anchor: 'end' },
        ...HOURS.map((h, i) => ({ id: `d${i}`, pt: v.P(h, SALES[i]), kind: 'a', r: 4 })),
        v.graph(joined(knots), 'net', 'e', 7, 19, 120),
      ];
      return frame(items, name);
    },
  },
};
