// MTH 209 · Chapter 8 pictures, all on y' = y − x² + 1 (solutions y = (x + 1)² + Ce^x): a slope
// field where the initial condition picks out one curve; nearby starts staying nearby (well posed);
// and Euler's method walking along tangents, drifting from the true curve, and improving as h halves.
import { frame, view } from './plot';

const f = (x, y) => y - x * x + 1;
const sol = (y0) => (x) => (x + 1) ** 2 + (y0 - 1) * Math.exp(x);
const v = view(-0.1, 2.1, -0.5, 6);

function field() {
  const items = [];
  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 9; j++) {
      const x = 0.1 + i * 0.2;
      const y = j * 0.65;
      const s = f(x, y);
      // Draw a short segment of fixed screen length in the slope direction.
      const dx = 0.07;
      const [a, b] = [v.P(x - dx, y - s * dx), v.P(x + dx, y + s * dx)];
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      const k = 0.42 / len;
      const c = v.P(x, y);
      items.push({ id: `f${i}_${j}`, seg: [[c[0] - (c[0] - a[0]) * k, c[1] - (c[1] - a[1]) * k], [c[0] + (b[0] - c[0]) * k, c[1] + (b[1] - c[1]) * k]], kind: 's', dash: false, o: 0.45 });
    }
  }
  return items;
}

export const slopeFieldScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A differential equation is a field of slopes',
  graph: {
    steps: [
      { say: 'The equation $y\' = y - x^2 + 1$ tells you the **slope** at every point $(x, y)$. Draw a little dash with that slope everywhere: a ==slope field==.' },
      { say: 'Any curve that follows the dashes is a solution. There are infinitely many, one through every starting height: $y = (x + 1)^2 + Ce^x$ for every constant $C$.', action: { label: 'Show some solutions' } },
      { say: 'The ==initial condition== $y(0) = 0.5$ picks out exactly **one** of them (blue). That is an initial value problem: a DE plus where to start.', action: { label: 'Apply y(0) = 0.5' } },
    ],
    draw: (step, presses) => {
      const items = [...v.axis([0, 1, 2], -0.5), ...field()];
      [-0.5, 0, 1, 1.5, 2].forEach((y0, i) => items.push({ ...v.graph(sol(y0), `s${i}`, 'e', 0, 2), o: presses >= 1 ? (presses >= 2 ? 0.25 : 0.8) : 0 }));
      items.push({ ...v.graph(sol(0.5), 'main', 'a', 0, 2), o: presses >= 2 ? 1 : 0 }, { id: 'p0', pt: v.P(0, 0.5), kind: 'a', label: 'y(0) = 0.5', o: presses >= 2 ? 1 : 0 });
      return frame(items);
    },
  },
};

export const wellPosedScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Nudge the start, watch the answer',
  graph: {
    steps: [
      { say: 'A computer never solves exactly $y(0) = 0.5$: rounding nudges the start a little. Is that dangerous?' },
      { say: 'Start at $0.45$ and $0.55$ instead. The two curves stay close to the true one (shaded band) across the whole interval. Because $f$ is Lipschitz in $y$ (here $\\left|\\frac{\\partial f}{\\partial y}\\right| = 1$), small changes in the start give small changes in the answer: the problem is ==well posed==.', action: { label: 'Nudge the start' } },
      { say: 'And two solution curves can never cross: if they met, the same point would have two futures. That is the uniqueness theorem in one picture.' },
    ],
    draw: (step, presses) => {
      const items = [...v.axis([0, 1, 2], -0.5), ...field()];
      const nudged = presses >= 1;
      const lo = sol(0.45);
      const hi = sol(0.55);
      if (nudged) items.push({ id: 'band', poly: [...Array.from({ length: 21 }, (_, i) => v.P(i * 0.1, lo(i * 0.1))), ...Array.from({ length: 21 }, (_, i) => v.P(2 - i * 0.1, hi(2 - i * 0.1)))], kind: 'c' });
      items.push(v.graph(sol(0.5), 'main', 'a', 0, 2));
      items.push({ ...v.graph(lo, 'lo', 'c', 0, 2), o: nudged ? 1 : 0 }, { ...v.graph(hi, 'hi', 'c', 0, 2), o: nudged ? 1 : 0 });
      return frame(items, nudged ? 'start $0.5 \\pm 0.05$: at $x = 2$ the curves differ by $\\pm 0.37$' : undefined);
    },
  },
};

function euler(h) {
  const pts = [[0, 0.5]];
  let [x, y] = [0, 0.5];
  while (x < 2 - 1e-9) {
    y += h * f(x, y);
    x += h;
    pts.push([x, y]);
  }
  return pts;
}

export const eulerScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Walk along the tangent',
  graph: {
    steps: [
      { say: 'The true solution of $y\' = y - x^2 + 1$, $y(0) = 0.5$ is the blue curve. Euler only knows the starting point and the slope there: $f(0, 0.5) = 1.5$.' },
      { say: 'So walk along that slope for one step, $h = 0.5$: $y_1 = 0.5 + 0.5(1.5) = 1.25$. Then take the slope at the **new** point and walk again.', action: { label: 'One step' } },
      { say: 'Step by step: $1.25, 2.25, 3.375, 4.4375$. Each step follows a tangent that is already slightly off, so the errors pile up: $0.87$ by $x = 2$.', action: { label: 'Finish' } },
      { say: 'Halve the step, $h = 0.25$: the walk hugs the curve better and the error at $x = 2$ roughly halves ($0.53$). Euler’s error is proportional to $h$: accurate but slow to improve.', action: { label: 'Halve h' } },
    ],
    draw: (step, presses) => {
      const vv = view(-0.1, 2.1, 0, 5.8);
      const items = [...vv.axis([0, 0.5, 1, 1.5, 2], 0), vv.graph(sol(0.5), 'true', 'a', 0, 2)];
      const big = euler(0.5);
      const n = presses >= 2 ? 4 : presses;
      const walk = big.slice(0, n + 1).map(([x, y]) => vv.P(x, y));
      items.push({ id: 'e1', path: walk.length > 1 ? walk : [walk[0], walk[0]], kind: 'c' });
      big.slice(0, n + 1).forEach(([x, y], i) => items.push({ id: `d${i}`, pt: vv.P(x, y), kind: 'c', r: 3 }));
      if (presses >= 3) items.push({ id: 'e2', path: euler(0.25).map(([x, y]) => vv.P(x, y)), kind: 'e' });
      return frame(items, presses >= 3 ? 'error at $x = 2$: $h = 0.5 \\to 0.87$, $\\;h = 0.25 \\to 0.53$' : n ? `$y_${n} = ${big[n][1]}$` : undefined);
    },
  },
};
