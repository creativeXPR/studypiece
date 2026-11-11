// MTH 209 · Chapter 6 pictures. A 2 × 2 system is two lines meeting at the solution. Elimination
// turns one line about that point until it is level (y found at once); simple iteration hops
// diagonally around the solution; Gauss-Seidel walks a staircase between the lines straight in.
import { frame, view } from './plot';

const v = view(-0.5, 3.5, -0.6, 2.4);
// 4x + y = 9 and x + 3y = 5 meet at (2, 1).
const L1 = (x) => 9 - 4 * x;
const L2 = (x) => (5 - x) / 3;
const lines = () => [
  { id: 'l1', path: [v.P(1.6, L1(1.6)), v.P(2.45, L1(2.45))], kind: 'a' },
  { id: 'l2', path: [v.P(-0.5, L2(-0.5)), v.P(3.5, L2(3.5))], kind: 'e' },
  { id: 'n1', text: [v.X(1.62), v.Y(2.2)], label: '4x + y = 9', kind: 'a', anchor: 'end', size: 12 },
  { id: 'n2', text: [v.X(3.4), v.Y(0.25)], label: 'x + 3y = 5', kind: 'e', anchor: 'end', size: 12 },
  { id: 'sol', pt: v.P(2, 1), kind: 'b', label: '(2, 1)', r: 4 },
  ...v.axis([1, 2, 3]),
];

function path(kind, n) {
  let [x, y] = [0, 0];
  const pts = [v.P(0, 0)];
  for (let k = 0; k < n; k++) {
    if (kind === 'gs') {
      x = (9 - y) / 4;
      pts.push(v.P(x, y));
      y = (5 - x) / 3;
      pts.push(v.P(x, y));
    } else {
      [x, y] = [(9 - y) / 4, (5 - x) / 3];
      pts.push(v.P(x, y));
    }
  }
  return { pts, x, y };
}

export const jacobiScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Guess, improve, repeat',
  graph: {
    steps: [
      { say: 'A $2 \\times 2$ system is two lines; the solution is where they cross, $(2, 1)$. Solve each equation for its own unknown: $x = \\frac{9 - y}{4}$, $y = \\frac{5 - x}{3}$. Start from the guess $(0, 0)$.' },
      { say: 'Simple iteration updates **both** coordinates from the old point at once: $(0, 0) \\to (2.25, 1.667)$.', action: { label: 'One step' } },
      { say: 'Again and again: $(1.833, 0.917)$, $(2.021, 1.056)$, $(1.986, 0.993)$. The guesses hop around the crossing and close in. Each unknown dominates its own equation ($4 > 1$, $3 > 1$), which is what makes the hops shrink.', action: { label: 'Three more', need: 1 } },
    ],
    draw: (step, presses) => {
      const n = presses >= 2 ? 4 : presses;
      const { pts, x, y } = path('jac', n);
      return frame([...lines(), { id: 'p', path: pts.length > 1 ? pts : [pts[0], pts[0]], kind: 'c' }, { id: 'cur', pt: pts.at(-1), kind: 'c', r: 4 }], `$(${x.toFixed(3)},\\ ${y.toFixed(3)})$`);
    },
  },
};

export const seidelScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Use each new value at once',
  graph: {
    steps: [
      { say: 'Same lines, same start $(0, 0)$. Gauss-Seidel first updates $x$ from equation 1: the point slides **across** until it lands on the first line, $(2.25, 0)$.', action: { label: 'Update x' } },
      { say: 'Then it updates $y$ from equation 2 using that **new** $x$: the point slides **up** onto the second line, $(2.25, 0.917)$.', action: { label: 'Update y' } },
      { say: 'Across, up, across, up: a staircase that walks straight into the crossing. After 3 rounds it is at $(2.0017, 0.9994)$, where simple iteration needed 5. Using the newest values at once is the whole difference.', action: { label: 'Keep going', need: 1 } },
    ],
    draw: (step, presses) => {
      const half = presses >= 3 ? 6 : presses;
      const full = path('gs', 3).pts.slice(0, half + 1);
      const last = full.at(-1);
      return frame([...lines(), { id: 'p', path: full.length > 1 ? full : [full[0], full[0]], kind: 'c' }, { id: 'cur', pt: last, kind: 'c', r: 4 }]);
    },
  },
};

// Elimination: turn the line 3x − y = 5 about (2, 1) into y = 1 (R₂ − 3R₁ with R₁: x + 2y = 4).
const ve = view(-0.5, 4, -1.5, 3.5);
const through = (dx, dy) => {
  const n = Math.hypot(dx, dy);
  const [ux, uy] = [dx / n, dy / n];
  return [ve.P(2 - 3 * ux, 1 - 3 * uy), ve.P(2 + 3 * ux, 1 + 3 * uy)];
};

export const eliminationScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'What elimination does to the picture',
  graph: {
    steps: [
      { say: 'The system $x + 2y = 4$, $3x - y = 5$: two lines crossing at the solution $(2, 1)$.' },
      { say: 'Eliminate $x$: replace equation 2 by (equation 2) $- 3 \\times$ (equation 1), giving $-7y = -7$. In the picture, the second line **turns about the solution** until it is level: $y = 1$.', action: { label: 'Eliminate x' } },
      { say: 'The crossing never moved: row operations change the equations, not the solution. Now the level line gives $y = 1$ at once, and back substitution into $x + 2y = 4$ gives $x = 2$. Gaussian elimination does exactly this in $n$ dimensions: make the system triangular, then read off the unknowns from the bottom up.' },
    ],
    draw: (step, presses) => {
      const turned = presses >= 1;
      return frame([
        ...ve.axis([1, 2, 3]),
        { id: 'r1', path: through(2, -1), kind: 'a' },
        { id: 'r2', path: turned ? through(1, 0) : through(1, 3), kind: 'e' },
        { id: 't1', text: [ve.X(0.2), ve.Y(2.3)], label: 'x + 2y = 4', kind: 'a', anchor: 'start', size: 12 },
        { id: 't2', text: [ve.X(3.9), turned ? ve.Y(1.25) : ve.Y(3.1)], label: turned ? 'y = 1' : '3x − y = 5', kind: 'e', anchor: 'end', size: 12 },
        { id: 'sol', pt: ve.P(2, 1), kind: 'b', label: '(2, 1)', r: 4 },
      ]);
    },
  },
};
