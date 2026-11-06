// MTH 209 · Chapter 2 pictures. Linear interpolation as a straight line standing in for a curve
// (ln x, estimating ln 2: the nearer the second point, the smaller the gap), and Lagrange's basis
// polynomials as "switches" that are 1 at their own node and 0 at the others, weighted and added.
import { frame, view } from './plot';

const LN2 = Math.log(2);

export const linearInterpScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A straight line standing in for a curve',
  graph: {
    steps: [
      { say: 'Here is $y = \\ln x$, but pretend we only know two table values: $\\ln 1 = 0$ and $\\ln 6 = 1.7918$. We want $\\ln 2$.' },
      { say: 'Linear interpolation joins the two known points with a straight line, $P_1(x)$, and reads the answer off the **line**: $P_1(2) = 0.3584$.', action: { label: 'Draw the line' } },
      { say: 'The true value is $0.6931$: the red gap is the error, $0.3348$. The curve bends a lot between $1$ and $6$, and a straight line can’t follow a bend.' },
      { say: 'Use a nearer second point, $\\ln 4 = 1.3863$: the line hugs the curve more closely, $P_1(2) = 0.4621$. Nearer again, $\\ln 3$: $P_1(2) = 0.5493$, error $0.1438$. **The closer the points, the better the line copies the curve.**', action: { label: 'Move the point closer', need: 2 } },
    ],
    draw: (step, presses) => {
      const v = view(0.5, 6.5, -0.5, 2.2);
      const x2 = presses >= 3 ? 3 : presses >= 2 ? 4 : 6;
      const lineOn = presses >= 1;
      const slope = Math.log(x2) / (x2 - 1);
      const est = slope;
      const items = [...v.axis([1, 2, 3, 4, 5, 6]), v.graph(Math.log, 'ln', 's', 0.55, 6.5)];
      items.push({ id: 'p0', pt: v.P(1, 0), kind: 'a', label: '(1, 0)' }, { id: 'p1', pt: v.P(x2, Math.log(x2)), kind: 'a' });
      if (lineOn) items.push({ id: 'line', path: [v.P(0.7, slope * -0.3), v.P(6.3, slope * 5.3)], kind: 'c' });
      if (lineOn) items.push({ id: 'est', pt: v.P(2, est), kind: 'c', r: 4 });
      if (step >= 2) items.push({ id: 'gap', seg: [v.P(2, est), v.P(2, LN2)], kind: 'd', dash: false }, { id: 'true', pt: v.P(2, LN2), kind: 'b', r: 4 });
      return frame(items, lineOn ? `$P_1(2) = ${est.toFixed(4)}$, true $0.6931$, error $${(LN2 - est).toFixed(4)}$` : 'want $\\ln 2$');
    },
  },
};

// Lagrange basis for nodes 1, 2, 3 and data 4, 0, 12.
const NODES = [1, 2, 3];
const YS = [4, 0, 12];
const L = (k) => (x) => NODES.reduce((p, xj, j) => (j === k ? p : (p * (x - xj)) / (NODES[k] - xj)), 1);
const P2 = (x) => YS.reduce((s, y, k) => s + y * L(k)(x), 0);

export const lagrangeScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'One switch per point',
  graph: {
    steps: [
      { say: 'We want a curve through $(1, 4)$, $(2, 0)$ and $(3, 12)$. Lagrange’s trick: build one simple curve per point, then add them up.' },
      { say: '$L_0(x)$ is a parabola that equals $1$ at $x = 1$ and $0$ at the other two nodes. It is a ==switch== for the first point: on there, off everywhere else that matters.', action: { label: 'Show L₀' } },
      { say: '$L_1$ is the switch for $x = 2$ and $L_2$ for $x = 3$: each is $1$ at its own node and $0$ at the others.', action: { label: 'Show L₁ and L₂' } },
      { say: 'Now scale each switch by its point’s height and add: $P_2 = 4L_0 + 0L_1 + 12L_2$. At each node only one switch is on, so the sum passes **exactly** through every point. That is Lagrange’s formula.', action: { label: 'Weight and add' } },
    ],
    draw: (step, presses) => {
      const v = view(0.4, 3.6, -3, 14);
      const items = [...v.axis([1, 2, 3])];
      NODES.forEach((x, k) => items.push({ id: `n${k}`, pt: v.P(x, YS[k]), kind: 'a', label: `(${x}, ${YS[k]})` }));
      const sc = presses >= 3 ? 1 : 0;
      const kinds = ['e', 'c', 'b'];
      [0, 1, 2].forEach((k) => {
        const shown = (k === 0 && presses >= 1) || (k > 0 && presses >= 2);
        const scale = sc ? YS[k] : 4; // draw switches 4× taller so they are visible
        items.push({ ...v.graph((x) => scale * L(k)(x), `L${k}`, kinds[k], 0.5, 3.5, 60), o: shown ? (sc ? 0.45 : 1) : 0 });
      });
      if (presses >= 3) items.push(v.graph(P2, 'p2', 'a', 0.5, 3.5, 60));
      return frame(items, presses >= 3 ? '$P_2(x) = 4L_0 + 0L_1 + 12L_2 = 8x^2 - 28x + 24$' : presses >= 1 ? 'switches drawn 4× taller' : undefined);
    },
  },
};
