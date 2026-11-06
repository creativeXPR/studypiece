// MTH 209 · Chapter 7 pictures. A non-linear system as two curves (circle x² + y² = 4 and parabola
// y = x² − 1) whose crossing is the solution; fixed-point iteration spiralling in slowly; Newton's
// method replacing each curve by its tangent line and jumping to where the tangents cross.
import { frame, view } from './plot';

const v = view(-0.3, 2.6, -1.3, 2.3);
const circle = Array.from({ length: 61 }, (_, i) => {
  const t = (Math.PI / 2) * (i / 60) - 0.6;
  return v.P(2 * Math.cos(t), 2 * Math.sin(t));
});
const curves = () => [
  ...v.axis([1, 2]),
  { id: 'circ', path: circle, kind: 'a' },
  v.graph((x) => x * x - 1, 'par', 'e', -0.3, 1.85),
  { id: 'tc', text: [v.X(0.9), v.Y(2.05)], label: 'x² + y² = 4', kind: 'a', size: 12 },
  { id: 'tp', text: [v.X(1.95), v.Y(2.15)], label: 'y = x² − 1', kind: 'e', size: 12, anchor: 'start' },
];
const SOL = [1.51749, 1.302776];

export const fixedPointScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Solving a system = finding a crossing',
  graph: {
    steps: [
      { say: 'Two equations, $x^2 + y^2 = 4$ (blue circle) and $y = x^2 - 1$ (purple parabola). A solution must satisfy **both**, so it is a point on both curves: where they cross.' },
      { say: 'Fixed-point form: solve each equation for one unknown, $x = \\sqrt{y + 1}$ and $y = \\sqrt{4 - x^2}$, i.e. $\\mathbf{x} = G(\\mathbf{x})$. From $(1, 1)$, apply $G$ again and again.', action: { label: 'Iterate' } },
      { say: 'The points spiral in towards the crossing $(1.5175, 1.3028)$: $(1.414, 1.414)$, $(1.554, 1.259)$, $(1.503, 1.319)$… It converges because $G$’s partial derivatives are small enough here, but it is slow: each step only shrinks the error by about a third.', action: { label: 'More', need: 1 } },
    ],
    draw: (step, presses) => {
      const n = presses >= 2 ? 7 : presses ? 2 : 0;
      let [x, y] = [1, 1];
      const pts = [v.P(x, y)];
      for (let k = 0; k < n; k++) {
        x = Math.sqrt(y + 1);
        y = Math.sqrt(4 - x * x);
        pts.push(v.P(x, y));
      }
      return frame([...curves(), { id: 'sol', pt: v.P(...SOL), kind: 'b', r: 4 }, { id: 'it', path: pts.length > 1 ? pts : [pts[0], pts[0]], kind: 'c' }, { id: 'cur', pt: pts.at(-1), kind: 'c', r: 4 }], `$(${x.toFixed(4)},\\ ${y.toFixed(4)})$`);
    },
  },
};

// Newton: at each iterate, the tangent (linearised) line of each curve; they cross at the next iterate.
function newtonPath(n) {
  const pts = [[1, 1]];
  for (let k = 0; k < n; k++) {
    const [x, y] = pts[k];
    const F = [x * x + y * y - 4, x * x - y - 1];
    const J = [[2 * x, 2 * y], [2 * x, -1]];
    const d = J[0][0] * J[1][1] - J[0][1] * J[1][0];
    const dx = (F[0] * J[1][1] - J[0][1] * F[1]) / d;
    const dy = (J[0][0] * F[1] - F[0] * J[1][0]) / d;
    pts.push([x - dx, y - dy]);
  }
  return pts;
}
const tangentLine = ([x, y], which) => {
  // Linearisation of f = 0 at (x, y): grad·(p − q) = −f, drawn as a segment.
  const [g, f] = which === 0 ? [[2 * x, 2 * y], x * x + y * y - 4] : [[2 * x, -1], x * x - y - 1];
  const n = Math.hypot(...g);
  const base = [x - (f * g[0]) / (n * n), y - (f * g[1]) / (n * n)];
  const dir = [-g[1] / n, g[0] / n];
  return [v.P(base[0] - 1.6 * dir[0], base[1] - 1.6 * dir[1]), v.P(base[0] + 1.6 * dir[0], base[1] + 1.6 * dir[1])];
};

export const newtonSystemScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Newton: trust the tangents',
  graph: {
    steps: [
      { say: 'Same two curves, starting at $(1, 1)$. Newton’s idea in one variable was: replace the curve by its tangent. With two equations, replace **each** curve by its tangent line (the linearisation that the Jacobian describes).', action: { label: 'Draw the tangent lines' } },
      { say: 'Two straight lines are easy to solve: they cross at $(1.667, 1.333)$. Jump there. That jump is exactly $\\mathbf{x}^{(1)} = \\mathbf{x}^{(0)} - J^{-1}F$.', action: { label: 'Jump' } },
      { say: 'New tangents, new crossing: $(1.5242, 1.3030)$, then $(1.517505, 1.302776)$. Three steps for 5 correct digits, where fixed-point iteration needed many more. Like Newton-Raphson, it doubles the correct digits each step once close.', action: { label: 'Repeat', need: 1 } },
    ],
    draw: (step, presses) => {
      const k = presses >= 3 ? 3 : presses >= 2 ? 1 : 0;
      const pts = newtonPath(3);
      const at = pts[k];
      const items = [...curves(), { id: 'sol', pt: v.P(...SOL), kind: 'b', r: 4 }];
      items.push({ id: 'trail', path: pts.slice(0, k + 1).map((p) => v.P(...p)).concat(k === 0 ? [v.P(...pts[0])] : []), kind: 'c' });
      items.push({ id: 'cur', pt: v.P(...at), kind: 'c', r: 4 });
      const show = presses >= 1;
      items.push({ id: 'ta', path: tangentLine(at, 0), kind: 'a', o: show ? 0.6 : 0 }, { id: 'tb', path: tangentLine(at, 1), kind: 'e', o: show ? 0.6 : 0 });
      return frame(items, `$\\mathbf{x}^{(${k})} = (${at[0].toFixed(4)},\\ ${at[1].toFixed(4)})$`);
    },
  },
};
