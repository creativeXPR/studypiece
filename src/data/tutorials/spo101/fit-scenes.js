// SPO 101 · Chapter 4 pictures: a line with two knobs (slope and starting value) finding Ade's
// dots, and the loss as a bowl seen from above, with gradient descent rolling down its walls.
import { frame, view } from '../mth209/plot';
import { BOTTLES, TEMPS } from './kiosk-scenes';

const X = TEMPS.map((t) => t - 30);
const n = X.length;
const loss = (w, b) => X.reduce((s, x, i) => s + (BOTTLES[i] - w * x - b) ** 2, 0) / n;
const gw = (w, b) => X.reduce((s, x, i) => s - 2 * x * (BOTTLES[i] - w * x - b), 0) / n;
const gb = (w, b) => X.reduce((s, x, i) => s - 2 * (BOTTLES[i] - w * x - b), 0) / n;
export const BEST2 = [9.67, 49.72];

const kiosk = () => view(22.6, 37.5, -12, 128);
const axes = (v) => [
  ...v.axis([26, 28, 30, 32, 34, 36]),
  ...v.yaxis([0, 50, 100], 24),
  { id: 'xl', text: [v.X(37.3), v.Y(0) + 0.35], label: '°C', kind: 's', size: 11, anchor: 'end' },
];
const dots = (v) => TEMPS.map((t, i) => ({ id: `d${i}`, pt: v.P(t, BOTTLES[i]), kind: 'a', r: 4 }));
const line = (v, w, b) => ({ id: 'line', path: [v.P(24, w * -6 + b), v.P(37, w * 7 + b)], kind: 'c' });

const KNOBS = [
  [0, 47.4, 'flat at the average'],
  [5, 47.4, 'slope $5$'],
  [9.67, 47.4, 'slope $9.67$'],
  [9.67, 30, 'starting value too low'],
  [9.67, 49.72, 'best fit'],
];
export const twoKnobScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A line with two knobs',
  graph: {
    steps: [
      { say: 'Now the line gets two knobs. $b$ is the **starting value**: the sales on a $30$ °C day. $w$ is the **slope**: extra bottles per degree. With $w = 0$ the line is flat at the average: it ignores the temperature.' },
      { say: 'Turn up the slope knob $w$: the line tilts around the $30$ °C point until it follows the trend.', action: { label: 'Turn the slope knob', need: 2 } },
      { say: 'Now the starting-value knob $b$ lifts the whole line up or down without tilting it. Too low, and every prediction is short.', action: { label: 'Turn the starting knob' } },
      { say: 'The best pair is $w = 9.67$ and $b = 49.7$: about $50$ bottles on a $30$ °C day, plus $9.67$ per degree hotter. Training means finding **both** knobs at once.', action: { label: 'Best fit' } },
    ],
    draw: (step, presses) => {
      const v = kiosk();
      const [w, b, name] = KNOBS[Math.min(presses, 4)];
      const items = [...axes(v), ...dots(v), line(v, w, b), { id: 'k30', seg: [v.P(30, 0), v.P(30, b)], kind: 'e' }, { id: 'kb', pt: v.P(30, b), kind: 'e', r: 5 }];
      return frame(items, `${name}: $w = ${w}$, $b = ${b}$, loss $${Math.round(loss(w, b))}$`);
    },
  },
};

// The loss bowl from above: w across, b up, with contour rings around the best pair.
const bowl = () => view(-1, 17, -6, 66);
function ring(v, level, id) {
  const A = X.reduce((s, x) => s + x * x, 0) / n;
  const C = X.reduce((s, x) => s + x, 0) / n;
  const L0 = loss(...BEST2);
  const pts = [];
  for (let k = 0; k <= 72; k++) {
    const th = (2 * Math.PI * k) / 72;
    const [dw, db] = [Math.cos(th) / 6, Math.sin(th)]; // b varies over a wider range than w
    const q = A * dw * dw + 2 * C * dw * db + db * db;
    const r = Math.sqrt((level - L0) / q);
    pts.push(v.P(BEST2[0] + r * dw, BEST2[1] + r * db));
  }
  return { id, path: pts, kind: 's' };
}
function descent(lr, steps) {
  const p = [[1, 2]];
  for (let i = 0; i < steps; i++) {
    const [w, b] = p[i];
    p.push([w - lr * gw(w, b), b - lr * gb(w, b)]);
  }
  return p;
}

export const bowlScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'The loss bowl',
  graph: {
    steps: [
      { say: 'With two knobs, every pair $(w, b)$ has a loss. Picture the losses as a landscape, seen from above like a map: each ring joins pairs with the same loss, and the centre is the lowest point. One knob gave a valley; two knobs give a **bowl**.' },
      { say: 'Start the ball at a poor pair, $w = 1$ and $b = 2$. Gradient descent now measures the downhill direction for **both** knobs and steps both at once.', action: { label: 'Roll', need: 3 } },
      { say: 'The ball first races to fix the slope (the steep wall), then slides along the bowl’s long floor to fix the starting value. After many steps it settles at the centre, $w \\approx 9.67$, $b \\approx 49.7$. Real models do exactly this, with millions of knobs: a bowl in millions of directions.', action: { label: 'Keep rolling' } },
    ],
    draw: (step, presses) => {
      const v = bowl();
      const items = [
        ...v.axis([0, 4, 8, 12, 16]),
        ...v.yaxis([0, 20, 40, 60], -1),
        { id: 'xl', text: [v.X(16.8), v.Y(0) + 0.35], label: 'slope w', kind: 's', size: 11, anchor: 'end' },
        { id: 'yl', text: [v.X(-0.6), v.Y(64)], label: 'start b', kind: 's', size: 11, anchor: 'start' },
        ...[30, 150, 500, 1200].map((lv, i) => ring(v, lv, `r${i}`)),
        { id: 'best', pt: v.P(...BEST2), kind: 'b', r: 4 },
      ];
      const steps = presses >= 4 ? 120 : [0, 3, 8, 16][presses];
      const p = descent(0.05, steps);
      if (presses >= 1) items.push({ id: 'trail', path: p.map((q) => v.P(...q)), kind: 'e' });
      const [w, b] = p.at(-1);
      items.push({ id: 'ball', pt: v.P(w, b), kind: 'e', r: 6 });
      return frame(items, `$w = ${w.toFixed(2)}$, $b = ${b.toFixed(1)}$, loss $${Math.round(loss(w, b))}$`);
    },
  },
};
