// SPO 101 · pictures for Ade's cold-drink kiosk, the course's running example: a notebook of
// (temperature, bottles sold) days turning into a pattern, a line's misses and its loss, the loss
// valley with a ball rolling down it (gradient descent), and what the step size does.
import { frame, view } from '../mth209/plot';

// Twelve days at the kiosk: top temperature (°C) and bottles sold.
export const TEMPS = [26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36];
export const BOTTLES = [14, 18, 31, 38, 47, 53, 58, 71, 77, 92, 96, 108];
export const BEST = 9.85; // the slope training finds

// The model: below 25 °C almost nobody buys; each degree above adds w bottles.
const predict = (w, t) => w * (t - 25);
export const loss = (w) => TEMPS.reduce((s, t, i) => s + (BOTTLES[i] - predict(w, t)) ** 2, 0) / TEMPS.length;
const steep = (w) => (loss(w + 0.001) - loss(w - 0.001)) / 0.002;

// The temperature–bottles picture, shared by the scenes below.
const kiosk = () => view(22.6, 37.5, -12, 128);
function kioskAxes(v) {
  return [
    ...v.axis([26, 28, 30, 32, 34, 36]),
    ...v.yaxis([0, 50, 100], 24),
    { id: 'xl', text: [v.X(37.3), v.Y(0) + 0.35], label: '°C', kind: 's', size: 11, anchor: 'end' },
    { id: 'yl', text: [v.X(24.3), v.Y(124)], label: 'bottles', kind: 's', size: 11, anchor: 'start' },
  ];
}
const days = (v, n) => TEMPS.map((t, i) => ({ id: `d${i}`, pt: v.P(t, BOTTLES[i]), kind: 'a', r: 4, o: i < n ? 1 : 0 }));
const line = (v, w, kind = 'c') => ({ id: 'line', path: [v.P(25, 0), v.P(37, predict(w, 37))], kind });

export const notebookScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Ade’s notebook',
  graph: {
    steps: [
      { say: 'Every evening Ade writes two numbers: the day’s top **temperature** and how many **bottles** he sold. Day one: $26$ °C, $14$ bottles. Each day becomes one dot.' },
      { say: 'A week of dots. On their own they are just a record of the past.', action: { label: 'Add a week' } },
      { say: 'All twelve days. Now a **pattern** shows: the hotter the day, the more he sells, rising fairly steadily.', action: { label: 'Add the rest' } },
      { say: 'Draw one straight line that follows the dots as closely as possible. That line is a **model**: a simple rule, learned from the examples, linking temperature to sales.', action: { label: 'Draw the pattern' } },
      { say: 'Tomorrow’s forecast is $34$ °C. Go up from $34$ to the line, then across: about **89 bottles**. Ade now has a sensible order, worked out from his own data. That is machine learning in one picture.', action: { label: 'Ask about 34 °C' } },
    ],
    draw: (step, presses) => {
      const v = kiosk();
      const shown = presses >= 2 ? 12 : presses >= 1 ? 7 : 1;
      const items = [...kioskAxes(v), ...days(v, shown)];
      if (presses >= 3) items.push(line(v, BEST));
      if (presses >= 4) {
        const y = predict(BEST, 34);
        items.push(
          { id: 'up', seg: [v.P(34, 0), v.P(34, y)], kind: 'e' },
          { id: 'across', seg: [v.P(34, y), v.P(24, y)], kind: 'e' },
          { id: 'ans', pt: v.P(34, y), kind: 'e', r: 5 },
          { id: 'ansl', text: [v.X(24.4), v.Y(y) + 0.3], label: '≈ 89', kind: 'e', size: 13, anchor: 'start' },
        );
      }
      return frame(items, presses >= 4 ? 'forecast $34$ °C → about $89$ bottles' : `${shown} day${shown > 1 ? 's' : ''} recorded`);
    },
  },
};

const MISS_STEPS = [6, 8, 10, 14];
export const missesScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'How wrong is a line?',
  graph: {
    steps: [
      { say: 'Try the slope $w = 6$: six extra bottles per degree. Each red bar is a ==miss==: the gap between what Ade really sold and what the line predicted. This line sits too low; almost every miss is big.' },
      { say: 'Tilt the line up. At $w = 8$ the bars shrink; at $w = 10$ they almost vanish. Watch the score at the bottom fall.', action: { label: 'Steeper', need: 2 } },
      { say: 'Too far, $w = 14$, and the misses grow again, now with the line **above** the dots. Somewhere between is a best slope, and the score tells us where.', action: { label: 'Even steeper' } },
    ],
    draw: (step, presses) => {
      const v = kiosk();
      const w = MISS_STEPS[Math.min(presses, 3)];
      const items = [...kioskAxes(v), ...days(v, 12), line(v, w)];
      TEMPS.forEach((t, i) => items.push({ id: `m${i}`, seg: [v.P(t, BOTTLES[i]), v.P(t, predict(w, t))], kind: 'd', dash: false }));
      return frame(items, `slope $w = ${w}$ · average squared miss $= ${Math.round(loss(w))}$`);
    },
  },
};

// The loss valley: loss against the slope w.
const valley = () => view(3, 17, -130, 2000);
function valleyAxes(v) {
  return [
    ...v.axis([4, 6, 8, 10, 12, 14, 16]),
    { id: 'xl', text: [v.X(16.9), v.Y(0) + 0.35], label: 'slope w', kind: 's', size: 11, anchor: 'end' },
    { id: 'yl', text: [v.X(3.2), v.Y(1940)], label: 'loss', kind: 's', size: 11, anchor: 'start' },
    v.graph((w) => loss(w), 'valley', 's', 3, 17, 90),
  ];
}
const walk = (w0, rate, n) => {
  const ws = [w0];
  for (let i = 0; i < n; i++) ws.push(ws[i] - rate * steep(ws[i]));
  return ws;
};
const ball = (v, w, kind = 'e') => ({ id: 'ball', pt: v.P(w, Math.min(loss(w), 2600)), kind, r: 7 });
const trail = (v, ws, kind = 'e') =>
  ws.slice(1).map((w, i) => ({ id: `tr${i}`, seg: [v.P(ws[i], Math.min(loss(ws[i]), 2600)), v.P(w, Math.min(loss(w), 2600))], kind, dash: false }));

export const valleyScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'The loss valley',
  graph: {
    steps: [
      { say: 'Every slope $w$ gets one score, its ==loss==. Plot loss against $w$ and you get a **valley**. The four lines we tried are four dots on it. Training means finding the bottom.' },
      { say: 'A computer can’t see the whole valley; it only feels the ground where it stands. Put a ball at $w = 4$. The ground slopes down to the right, so **move right**.', action: { label: 'Drop the ball' } },
      { say: 'Each step: measure how steep the ground is, then move a little downhill. Steep ground means a big step; flatter ground near the bottom means smaller steps.', action: { label: 'Take a step', need: 4 } },
      { say: 'The ball settles at $w \\approx 9.85$, the bottom of the valley: the best line. This is ==gradient descent==, and it is how almost every modern model is trained, from this one-knob line to chatbots with billions of knobs.' },
    ],
    draw: (step, presses) => {
      const v = valley();
      const items = [...valleyAxes(v)];
      MISS_STEPS.forEach((w, i) => items.push({ id: `tried${i}`, pt: v.P(w, loss(w)), kind: 'c', r: 4, o: presses >= 1 ? 0.45 : 1 }));
      if (presses >= 1) {
        const ws = walk(4, 0.006, Math.max(0, presses - 1));
        if (step >= 3) ws.push(...walk(ws.at(-1), 0.006, 8).slice(1));
        items.push(...trail(v, ws), ball(v, ws.at(-1)));
        const w = ws.at(-1);
        return frame(items, `ball at $w = ${w.toFixed(2)}$ · loss $${Math.round(loss(w))}$`);
      }
      return frame(items, 'loss for each slope');
    },
  },
};

const RATES = [
  [0.0012, 'tiny steps', 6],
  [0.02, 'big steps', 6],
  [0.024, 'too big', 5],
];
export const stepSizeScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'How big a step?',
  graph: {
    steps: [
      { say: 'How far to move each time is a setting we choose, the ==learning rate==. With **tiny steps** the ball creeps: six steps and it is still far from the bottom. Safe, but slow.' },
      { say: '**Big steps**: the ball jumps past the bottom, lands on the other side, and zig-zags in. It gets there, wobbling.', action: { label: 'Bigger steps' } },
      { say: '**Too big**: every jump lands higher than the last and the ball flies out of the valley. The loss explodes instead of shrinking. Picking the learning rate is one of the first things practitioners tune.', action: { label: 'Too big' } },
    ],
    draw: (step, presses) => {
      const v = valley();
      const [rate, name, n] = RATES[Math.min(presses, 2)];
      const ws = walk(5, rate, n);
      const kind = presses >= 2 ? 'd' : 'e';
      const items = [...valleyAxes(v), ...trail(v, ws, kind), ball(v, ws.at(-1), kind)];
      return frame(items, `${name} (learning rate $${rate}$) · after ${n} steps $w = ${ws.at(-1).toFixed(1)}$`);
    },
  },
};
