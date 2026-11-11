// SPO 101 · Chapter 3 pictures: a month of sales as a strip of dots stacking into a histogram,
// and the temperature–sales scatter where colouring the rainy days reveals a second pattern.
import { frame, view } from '../plot';
import { MONTH } from './kiosk-data';

const B = MONTH.bottles;
const BIN = 20;
const bins = Array.from({ length: 7 }, (_, k) => B.filter((b) => b >= k * BIN && b < (k + 1) * BIN).length);
const MEAN = B.reduce((s, b) => s + b, 0) / B.length;

export const histogramScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'From a list to a shape',
  graph: {
    steps: [
      { say: 'A month of sales, one dot per day, placed by how many bottles were sold. Thirty numbers in a row are hard to read.' },
      { say: 'Sort the days into bins of $20$ bottles ($0$–$19$, $20$–$39$, …) and stack each bin’s days into a bar. This picture is a ==histogram==.', action: { label: 'Stack into bins' } },
      { say: 'Now the shape speaks: most days sell under $80$; a few days sell over $100$. Those rare big days matter: on them Ade could run out.' },
      { say: 'The dashed line is the **mean** (average), $47.4$ bottles. Half the days sold less than $47$ (the **median**). A model that always guessed $47$ would be a sensible starting point: a ==baseline==.', action: { label: 'Mark the average' } },
    ],
    draw: (step, presses) => {
      const v = view(-8, 145, -1.5, 10);
      const items = [...v.axis([0, 20, 40, 60, 80, 100, 120, 140])];
      const seen = Array(7).fill(0);
      B.forEach((b, i) => {
        const k = Math.floor(b / BIN);
        const y = presses >= 1 ? 0.5 + seen[k]++ : 0.4;
        const x = presses >= 1 ? k * BIN + BIN / 2 : b;
        items.push({ id: `d${i}`, pt: v.P(x, y), kind: 'a', r: 4 });
      });
      if (presses >= 1) {
        bins.forEach((n, k) => n && items.push({ id: `bar${k}`, poly: [v.P(k * BIN + 1, 0), v.P((k + 1) * BIN - 1, 0), v.P((k + 1) * BIN - 1, n), v.P(k * BIN + 1, n)], kind: 'a', o: 0.35 }));
        bins.forEach((n, k) => items.push({ id: `bn${k}`, text: [v.X(k * BIN + BIN / 2), v.Y(n + 0.3) + 0.15], label: String(n), kind: 's', size: 11 }));
      }
      if (presses >= 2) items.push({ id: 'mean', seg: [v.P(MEAN, 0), v.P(MEAN, 9.4)], kind: 'd' }, { id: 'meanl', text: [v.X(MEAN) + 0.2, v.Y(9.2)], label: 'mean 47.4', kind: 'd', size: 12, anchor: 'start' });
      return frame(items, presses >= 1 ? 'days in each range of bottles sold' : 'one dot per day: bottles sold');
    },
  },
};

export const rainScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A hidden second pattern',
  graph: {
    steps: [
      { say: 'The month’s days: temperature across, bottles up. Hotter days still sell more, but the dots are far more scattered than in Ade’s first notebook.' },
      { say: 'Colour the **rainy** days red. They sit well below the others at the same temperature: when it rains, people stay away.', action: { label: 'Colour rainy days' } },
      { say: 'Dry days averaged $57$ bottles; rainy days only $22$. Temperature alone can’t explain that. A second feature, rain, carries real information, and a good model should use both (Chapter 4).' },
    ],
    draw: (step, presses) => {
      const v = view(22.6, 38.5, -12, 140);
      const items = [
        ...v.axis([24, 26, 28, 30, 32, 34, 36]),
        ...v.yaxis([0, 50, 100], 24),
        { id: 'xl', text: [v.X(38.3), v.Y(0) + 0.35], label: '°C', kind: 's', size: 11, anchor: 'end' },
        { id: 'yl', text: [v.X(24.3), v.Y(135)], label: 'bottles', kind: 's', size: 11, anchor: 'start' },
      ];
      MONTH.temp.forEach((t, i) => items.push({ id: `d${i}`, pt: v.P(t, B[i]), kind: presses >= 1 && MONTH.rain[i] ? 'd' : 'a', r: 4 }));
      if (step >= 2) {
        items.push({ id: 'dry', seg: [v.P(24, 56.8), v.P(38, 56.8)], kind: 'a' }, { id: 'dryl', text: [v.X(38), v.Y(56.8) + 0.3], label: 'dry avg 57', kind: 'a', size: 11, anchor: 'end' });
        items.push({ id: 'wet', seg: [v.P(24, 21.5), v.P(38, 21.5)], kind: 'd' }, { id: 'wetl', text: [v.X(38), v.Y(21.5) - 0.55], label: 'rainy avg 22', kind: 'd', size: 11, anchor: 'end' });
      }
      return frame(items, presses >= 1 ? 'red: rainy days' : '30 days');
    },
  },
};
