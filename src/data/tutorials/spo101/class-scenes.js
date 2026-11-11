// SPO 101 · Chapter 6 pictures: an S-curve turning temperature into a sell-out probability, a
// decision tree carving the month into regions with two questions, and k-means finding customer
// groups by moving three centres back and forth.
import { frame, view } from '../plot';
import { MONTH } from './kiosk-data';

const SOLD = MONTH.bottles.map((b) => (b >= 80 ? 1 : 0));
const prob = (t) => 1 / (1 + Math.exp(-(1.12 * t - 38.615)));

export const sCurveScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'From a line to an S',
  graph: {
    steps: [
      { say: 'Each day is a dot: at the bottom ($0$) if Ade didn’t sell out, at the top ($1$) if he did. Sell-outs only happen on hot days.' },
      { say: 'A straight line through these dots goes below $0$ and above $1$. But we want a **chance**, which must stay between $0$ and $1$.', action: { label: 'Try a straight line' } },
      { say: 'So bend the line into an **S**: flat near $0$ on cool days, rising through the hot ones, flat near $1$ on the hottest. This is ==logistic regression==. At $34$ °C it says a $37\\%$ chance; at $37$ °C, $94\\%$.', action: { label: 'Bend it into an S' } },
      { say: 'To get a yes-or-no warning, pick a ==threshold==: warn when the chance is above $50\\%$, from about $34.5$ °C. Lower the threshold and you catch more sell-outs (higher recall) but raise more false alarms.', action: { label: 'Add a threshold' } },
    ],
    draw: (step, presses) => {
      const v = view(23, 38.5, -0.35, 1.3);
      const items = [
        ...v.axis([24, 26, 28, 30, 32, 34, 36, 38]),
        { id: 'one', seg: [v.P(23.5, 1), v.P(38.5, 1)], kind: 's' },
        { id: 'l1', text: [v.X(23.3), v.Y(1) - 0.15], label: '1', kind: 's', size: 11, anchor: 'end' },
        { id: 'l0', text: [v.X(23.3), v.Y(0) - 0.15], label: '0', kind: 's', size: 11, anchor: 'end' },
      ];
      MONTH.temp.forEach((t, i) => items.push({ id: `d${i}`, pt: v.P(t, SOLD[i] + (i % 3) * 0.02), kind: SOLD[i] ? 'd' : 'a', r: 4 }));
      if (presses === 1) items.push({ id: 'curve', path: [v.P(23.5, -0.3), v.P(38.5, 0.75)], kind: 'c' });
      if (presses >= 2) items.push(v.graph(prob, 'curve', 'c', 23.5, 38.5, 90));
      if (presses >= 3) {
        items.push({ id: 'half', seg: [v.P(23.5, 0.5), v.P(38.5, 0.5)], kind: 'e' }, { id: 'cut', seg: [v.P(34.48, -0.3), v.P(34.48, 1.25)], kind: 'e' });
        items.push({ id: 'warn', text: [v.X(36.4), v.Y(1.18)], label: 'warn', kind: 'e', size: 12 }, { id: 'quiet', text: [v.X(28), v.Y(1.18)], label: 'no warning', kind: 's', size: 12 });
      }
      return frame(items, presses >= 2 ? 'chance of selling out' : 'red: sold out (1) · blue: didn’t (0)');
    },
  },
};

const BUSY = MONTH.bottles.map((b) => (b >= 60 ? 1 : 0));
export const treeScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Twenty questions, learned',
  graph: {
    steps: [
      { say: 'The month again, now coloured by whether the day was **busy** ($60$+ bottles, green) or not (grey). Rainy days are drawn lower down, dry days higher up, so you can see both features.' },
      { say: 'A ==decision tree== looks for the single question that best separates green from grey. It tries every feature and every cut, and picks: **“Is it hotter than $32$ °C?”** Everything on the left is quiet.', action: { label: 'First question' } },
      { say: 'On the hot side, a second question cleans it up: **“Did it rain?”** Hot and dry: busy. Hot but rainy: not busy. Two learned questions get $29$ of $30$ days right.', action: { label: 'Second question' } },
    ],
    draw: (step, presses) => {
      const v = view(23, 38.5, -0.6, 2.2);
      const items = [
        ...v.axis([24, 26, 28, 30, 32, 34, 36, 38]),
        { id: 'dl', text: [v.X(23.2), v.Y(1.45)], label: 'dry', kind: 's', size: 11, anchor: 'start' },
        { id: 'rl', text: [v.X(23.2), v.Y(0.45)], label: 'rain', kind: 's', size: 11, anchor: 'start' },
        { id: 'mid', seg: [v.P(23, 1), v.P(38.5, 1)], kind: 's', o: 0.5 },
      ];
      MONTH.temp.forEach((t, i) => items.push({ id: `d${i}`, pt: v.P(t + ((i * 7) % 5) * 0.08 - 0.16, (MONTH.rain[i] ? 0.25 : 1.25) + ((i * 3) % 4) * 0.15), kind: BUSY[i] ? 'b' : 's', r: 4 }));
      if (presses >= 1) {
        items.push({ id: 'q1', seg: [v.P(32.5, -0.2), v.P(32.5, 2.1)], kind: 'e', dash: false });
        items.push({ id: 'left', poly: [v.P(23.2, 0), v.P(32.5, 0), v.P(32.5, 2.05), v.P(23.2, 2.05)], kind: 's', o: 0.12 });
      }
      if (presses >= 2) {
        items.push({ id: 'q2', seg: [v.P(32.5, 1), v.P(38.5, 1)], kind: 'e', dash: false });
        items.push({ id: 'hotdry', poly: [v.P(32.5, 1), v.P(38.4, 1), v.P(38.4, 2.05), v.P(32.5, 2.05)], kind: 'b', o: 0.15 });
      }
      return frame(items, presses >= 2 ? 'temp > 32 and dry → busy' : presses >= 1 ? 'temp > 32?' : 'green: busy day');
    },
  },
};

// Customers: visit hour and bottles bought per visit.
export const HOUR = [8.0, 8.2, 8.8, 7.5, 8.0, 9.5, 9.2, 13.3, 13.3, 13.0, 13.3, 13.5, 12.6, 13.7, 13.4, 18.4, 17.8, 17.9, 18.8, 17.3, 18.9, 18.3];
export const QTY = [7, 7, 6, 8, 6, 7, 7, 1, 3, 3, 1, 2, 1, 2, 3, 2, 2, 3, 1, 1, 1, 1];
const KIND = ['a', 'd', 'b'];
function kmeansHistory() {
  // Hour and quantity on comparable scales: one hour counts like one bottle here.
  let c = [[11, 5], [12, 2], [14, 3]];
  const hist = [];
  for (let it = 0; it < 4; it++) {
    const lab = HOUR.map((h, i) => {
      const d = c.map(([ch, cq]) => (h - ch) ** 2 + (QTY[i] - cq) ** 2);
      return d.indexOf(Math.min(...d));
    });
    hist.push({ c, lab });
    c = c.map((old, k) => {
      const mine = HOUR.map((h, i) => [h, QTY[i]]).filter((_, i) => lab[i] === k);
      return mine.length ? [mine.reduce((s, p) => s + p[0], 0) / mine.length, mine.reduce((s, p) => s + p[1], 0) / mine.length] : old;
    });
  }
  return hist;
}
const HIST = kmeansHistory();

export const kmeansScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Groups nobody named',
  graph: {
    steps: [
      { say: 'Each dot is one customer visit: the time of day across, the bottles bought up. Nobody has labelled them. Can the computer find groups by itself?' },
      { say: '==k-means== with $k = 3$: drop three centres (the crosses) anywhere. Colour each customer by the **nearest** centre.', action: { label: 'Drop 3 centres' } },
      { say: 'Move each centre to the **middle** of its coloured customers, then recolour by nearest centre again. Repeat.', action: { label: 'Move and recolour', need: 3 } },
      { say: 'Nothing changes any more: three groups. Early-morning visits buying $6$–$8$ bottles (traders stocking their stalls), lunchtime $1$–$3$ (office workers), evening $1$–$2$ (students). The algorithm found them; **naming** them took a human.' },
    ],
    draw: (step, presses) => {
      const v = view(6, 20.5, -1.5, 9.5);
      const items = [
        ...v.axis([7, 9, 11, 13, 15, 17, 19]),
        ...v.yaxis([2, 4, 6, 8], 6.5),
        { id: 'xl', text: [v.X(20.3), v.Y(0) + 0.35], label: 'hour', kind: 's', size: 11, anchor: 'end' },
        { id: 'yl', text: [v.X(6.8), v.Y(9.2)], label: 'bottles', kind: 's', size: 11, anchor: 'start' },
      ];
      const h = presses >= 1 ? HIST[Math.min(presses - 1, 3)] : null;
      HOUR.forEach((x, i) => items.push({ id: `p${i}`, pt: v.P(x, QTY[i]), kind: h ? KIND[h.lab[i]] : 's', r: 4 }));
      if (h) {
        h.c.forEach(([cx, cy], k) => {
          items.push({ id: `c${k}a`, seg: [v.P(cx - 0.35, cy - 0.35), v.P(cx + 0.35, cy + 0.35)], kind: KIND[k], dash: false });
          items.push({ id: `c${k}b`, seg: [v.P(cx - 0.35, cy + 0.35), v.P(cx + 0.35, cy - 0.35)], kind: KIND[k], dash: false });
        });
      }
      return frame(items, h ? `round ${Math.min(presses, 4)}` : '22 customer visits');
    },
  },
};
