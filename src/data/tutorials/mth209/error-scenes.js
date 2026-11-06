// MTH 209 · Chapter 3 pictures. Rounding versus chopping on a number line (where each sends a
// value, and the largest possible error of each), and the product rule for errors as a rectangle
// whose sides grow by their errors: two thin strips plus a negligible corner.
import { frame, view } from './plot';

export const roundingScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Chopping vs rounding, on a ruler',
  graph: {
    steps: [
      { say: 'Zoom right in on the number line between $0.666$ and $0.667$. The value $0.666666\\ldots$ sits about two-thirds of the way along.' },
      { say: '==Chopping== to 3 d.p. just cuts the digits off: it always jumps **down** to $0.666$. The error can be almost a whole step, up to $10^{-3}$.', action: { label: 'Chop' } },
      { say: '==Symmetric rounding== jumps to the **nearest** mark, $0.667$. The farthest any value can be from its nearest mark is half a step: the error is at most $\\frac12 \\times 10^{-3}$. That is exactly what "correct to $d$ decimal places" means.', action: { label: 'Round' } },
    ],
    draw: (step, presses) => {
      const v = view(0.6655, 0.6675, -1, 1);
      const x = 2 / 3;
      const items = [...v.axis([0.666, 0.667])];
      items.push({ id: 'mid', seg: [v.P(0.6665, -0.25), v.P(0.6665, 0.25)], kind: 's' }, { id: 'midt', text: [v.X(0.6665), v.Y(0.45)], label: 'halfway', kind: 's', size: 10 });
      items.push({ id: 'x', pt: v.P(x, 0), kind: 'a', label: '0.666666…', r: 5 });
      if (presses >= 1) items.push({ id: 'chop', path: [v.P(x, 0.1), v.P(x, 0.55), v.P(0.666, 0.55), v.P(0.666, 0.1)], kind: 'd' }, { id: 'ct', text: [v.X(0.6663), v.Y(0.75)], label: 'chop: −0.000667', kind: 'd', size: 11 });
      if (presses >= 2) items.push({ id: 'round', path: [v.P(x, -0.1), v.P(x, -0.55), v.P(0.667, -0.55), v.P(0.667, -0.1)], kind: 'b' }, { id: 'rt', text: [v.X(0.66685), v.Y(-0.8)], label: 'round: +0.000333', kind: 'b', size: 11 });
      return frame(items);
    },
  },
};

export const productErrorScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Why relative errors add in a product',
  graph: {
    steps: [
      { say: 'Think of a product $X_1X_2$ as the **area** of a rectangle with sides $X_1$ and $X_2$.' },
      { say: 'Now each side is slightly wrong: the true sides are $X_1 + \\varepsilon_1$ and $X_2 + \\varepsilon_2$. The true area is bigger by the shaded pieces.', action: { label: 'Add the errors' } },
      { say: 'Two long strips, of areas $X_1\\varepsilon_2$ and $X_2\\varepsilon_1$, and a tiny corner $\\varepsilon_1\\varepsilon_2$. With small errors the corner is negligible (here it is exaggerated), so the error in the product is $\\approx X_1\\varepsilon_2 + X_2\\varepsilon_1$.' },
      { say: 'Divide by the area $X_1X_2$: $\\frac{\\text{error}}{X_1X_2} \\approx \\frac{\\varepsilon_1}{X_1} + \\frac{\\varepsilon_2}{X_2}$. **The relative error of a product is the sum of the relative errors.** Quotients obey the same bound.' },
    ],
    draw: (step, presses) => {
      const v = view(-0.5, 5.5, -0.5, 4);
      const [a, b, e1, e2] = [4, 2.6, 0.6, 0.45];
      const grown = presses >= 1;
      const items = [
        { id: 'rect', poly: [v.P(0, 0), v.P(a, 0), v.P(a, b), v.P(0, b)], kind: 'a' },
        { id: 'la', text: [v.X(a / 2), v.Y(-0.35)], label: 'X₁', kind: 'a' },
        { id: 'lb', text: [v.X(-0.3), v.Y(b / 2)], label: 'X₂', kind: 'a' },
        { id: 'area', text: [v.X(a / 2), v.Y(b / 2)], label: 'X₁X₂', kind: 'a', size: 16 },
      ];
      items.push({ id: 's1', poly: [v.P(0, b), v.P(a, b), v.P(a, b + e2), v.P(0, b + e2)], kind: 'c', o: grown ? 1 : 0 });
      items.push({ id: 's2', poly: [v.P(a, 0), v.P(a + e1, 0), v.P(a + e1, b), v.P(a, b)], kind: 'c', o: grown ? 1 : 0 });
      items.push({ id: 'cn', poly: [v.P(a, b), v.P(a + e1, b), v.P(a + e1, b + e2), v.P(a, b + e2)], kind: 'd', o: grown ? 1 : 0 });
      if (step >= 2) {
        items.push({ id: 't1', text: [v.X(a / 2), v.Y(b + e2 + 0.3)], label: 'X₁ε₂', kind: 'c' });
        items.push({ id: 't2', text: [v.X(a + e1 + 0.15), v.Y(b / 2)], label: 'X₂ε₁', kind: 'c', anchor: 'start' });
        items.push({ id: 't3', text: [v.X(a + e1 + 0.15), v.Y(b + e2 + 0.2)], label: 'ε₁ε₂ ≈ 0', kind: 'd', anchor: 'start' });
      }
      return frame(items);
    },
  },
};
