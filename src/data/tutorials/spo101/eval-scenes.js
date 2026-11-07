// SPO 101 · Chapter 5 pictures: locking test days in a drawer and checking the line on them, and a
// curve that memorises eight noisy days (zero training error) but fails badly on new ones.
import { frame, view } from '../mth209/plot';
import { MONTH } from './kiosk-data';

const kiosk = () => view(22.6, 38.5, -20, 140);
const axes = (v) => [
  ...v.axis([24, 26, 28, 30, 32, 34, 36]),
  ...v.yaxis([0, 50, 100], 24),
  { id: 'xl', text: [v.X(38.3), v.Y(0) + 0.35], label: '°C', kind: 's', size: 11, anchor: 'end' },
];
function lineFit(xs, ys) {
  const n = xs.length;
  const mx = xs.reduce((s, x) => s + x, 0) / n;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  const w = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  return (x) => my + w * (x - mx);
}

const SPLIT = 24;
const trainFit = lineFit(MONTH.temp.slice(0, SPLIT), MONTH.bottles.slice(0, SPLIT));
export const trainTestScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Lock some days in a drawer',
  graph: {
    steps: [
      { say: 'Ade’s 30 days. Before training anything, set the **last 6 days** aside and don’t look at them. They are the ==test set==, locked in a drawer.', action: { label: 'Lock away 6 days' } },
      { say: 'Train on the other 24 days only, the ==training set==. The line fits them well, but of course it does: it was built to fit them.', action: { label: 'Train on 24 days' } },
      { say: 'Now unlock the drawer. The orange days are new to the model, like tomorrow will be. The red bars are its misses on them. **This** is the honest score.', action: { label: 'Open the drawer' } },
    ],
    draw: (step, presses) => {
      const v = kiosk();
      const items = [...axes(v)];
      MONTH.temp.forEach((t, i) => {
        const test = i >= SPLIT;
        const hidden = test && presses >= 1 && presses < 3;
        items.push({ id: `d${i}`, pt: v.P(t, MONTH.bottles[i]), kind: test && presses >= 1 ? 'c' : 'a', r: 4, o: hidden ? 0.12 : 1 });
      });
      if (presses >= 2) items.push({ id: 'line', path: [v.P(23.5, trainFit(23.5)), v.P(38, trainFit(38))], kind: 'e' });
      if (presses >= 3) {
        MONTH.temp.slice(SPLIT).forEach((t, k) => items.push({ id: `m${k}`, seg: [v.P(t, MONTH.bottles[SPLIT + k]), v.P(t, trainFit(t))], kind: 'd', dash: false }));
      }
      const note = presses >= 3 ? 'orange: test days the model never saw' : presses >= 1 ? '24 training days (6 hidden)' : '30 days';
      return frame(items, note);
    },
  },
};

// Eight noisy training days and six new days.
const TX = [24, 26, 27, 29, 31, 33, 35, 37];
const TY = [5, 30, 18, 50, 48, 82, 72, 112];
const NX = [25, 28, 30, 32, 34, 36];
const NY = [8, 28, 45, 63, 82, 98];
const wiggle = (x) => TX.reduce((s, xk, k) => s + TY[k] * TX.reduce((p, xj, j) => (j === k ? p : (p * (x - xj)) / (xk - xj)), 1), 0);
const straight = lineFit(TX, TY);
const mae = (f, xs, ys) => xs.reduce((s, x, i) => s + Math.abs(ys[i] - f(x)), 0) / xs.length;

export const overfitScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Memorising versus learning',
  graph: {
    steps: [
      { say: 'Eight days of a noisy week (some days are oddly high or low by chance). Two models will learn from them.' },
      { say: 'Model 1: a straight line. It misses most dots a little: average miss $9$ bottles on these days.', action: { label: 'Fit a line' } },
      { say: 'Model 2: a bendy curve with enough knobs to pass **exactly** through every dot. Training error: $0$. It looks perfect.', action: { label: 'Fit a bendy curve' } },
      { say: 'Now six new days arrive (orange). The line misses them by about $4$ bottles on average. The bendy curve misses by about $30$: it swings wildly between the dots because it memorised the noise. That is ==overfitting==.', action: { label: 'Bring new days' } },
    ],
    draw: (step, presses) => {
      const v = kiosk();
      const items = [...axes(v)];
      TX.forEach((x, i) => items.push({ id: `t${i}`, pt: v.P(x, TY[i]), kind: 'a', r: 4 }));
      if (presses >= 1) items.push({ id: 'line', path: [v.P(23.5, straight(23.5)), v.P(38, straight(38))], kind: 'e', o: presses >= 2 ? 0.5 : 1 });
      if (presses >= 2) items.push(v.graph(wiggle, 'wig', 'd', 23.8, 37.2, 160));
      if (presses >= 3) NX.forEach((x, i) => items.push({ id: `n${i}`, pt: v.P(x, NY[i]), kind: 'c', r: 5 }));
      let note = '8 training days';
      if (presses >= 3) note = `new days: line misses ${mae(straight, NX, NY).toFixed(1)}, curve misses ${mae(wiggle, NX, NY).toFixed(1)}`;
      else if (presses >= 2) note = 'curve: training miss $0$';
      else if (presses >= 1) note = `line: training miss ${mae(straight, TX, TY).toFixed(1)}`;
      return frame(items, note);
    },
  },
};
