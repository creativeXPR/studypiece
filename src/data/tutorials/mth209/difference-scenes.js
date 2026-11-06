// MTH 209 · Chapter 4 pictures. A difference table for x³ that builds itself one column at a time
// until the third differences come out constant (6), and Newton's forward formula as the cubic
// curve through the population table, read at 1895 and 1925.
import { frame, view } from './plot';

const XS = [1, 2, 3, 4, 5];
const COLS = (() => {
  const c = [XS.map((x) => x ** 3)];
  for (let k = 0; k < 3; k++) c.push(c[k].slice(1).map((v, i) => v - c[k][i]));
  return c;
})();
const HEAD = ['x³', 'Δ', 'Δ²', 'Δ³'];

export const differenceTableScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A table that reveals its polynomial',
  graph: {
    steps: [
      { say: 'Values of $x^3$ at $x = 1, 2, 3, 4, 5$: $1, 8, 27, 64, 125$. Nothing obvious yet.' },
      { say: 'Take the differences of neighbours: $\\Delta f = 7, 19, 37, 61$. Each sits **between** the two values it came from.', action: { label: 'First differences' } },
      { say: 'Differences of those: $\\Delta^2 f = 12, 18, 24$. Still changing, but more gently.', action: { label: 'Second differences' } },
      { say: 'Once more: $\\Delta^3 f = 6, 6$. **Constant!** For a polynomial of degree $n$, the $n$th differences are constant (here $n = 3$, and $3! = 6$), and every higher difference is $0$. That is how a table tells you its degree, and why a wrong entry stands out at once.', action: { label: 'Third differences' } },
    ],
    draw: (step, presses) => {
      const shown = Math.min(presses, 3) + 1;
      const items = [];
      const colX = (c) => -4.6 + c * 2.9;
      const rowY = (r) => 3.2 - r * 1.6;
      COLS.forEach((col, c) => {
        items.push({ id: `h${c}`, text: [colX(c), 4.3], label: HEAD[c], kind: c === 3 ? 'c' : 'a', o: c < shown ? 1 : 0 });
        col.forEach((val, r) => {
          const y = rowY(r + c / 2);
          items.push({ id: `v${c}_${r}`, text: [colX(c), y], label: String(val), kind: c === 3 ? 'c' : c === 0 ? 'a' : 's', size: 15, o: c < shown ? 1 : 0 });
          if (c > 0) {
            items.push({ id: `l${c}_${r}a`, seg: [[colX(c - 1) + 0.5, rowY(r + (c - 1) / 2) + 0.15], [colX(c) - 0.7, y + 0.15]], kind: 's', o: c < shown ? 0.5 : 0 });
            items.push({ id: `l${c}_${r}b`, seg: [[colX(c - 1) + 0.5, rowY(r + 1 + (c - 1) / 2) + 0.15], [colX(c) - 0.7, y + 0.15]], kind: 's', o: c < shown ? 0.5 : 0 });
          }
        });
      });
      return frame(items);
    },
  },
};

// Population 1891–1931 and Newton's forward polynomial from the top diagonal 46, 20, −5, 2, −3.
const YEARS = [1891, 1901, 1911, 1921, 1931];
const POP = [46, 66, 81, 93, 101];
const TOP = [46, 20, -5, 2, -3];
function newtonForward(year) {
  const r = (year - 1891) / 10;
  let s = TOP[0];
  let term = 1;
  for (let k = 1; k < TOP.length; k++) {
    term *= (r - (k - 1)) / k;
    s += term * TOP[k];
  }
  return s;
}

export const newtonFormulaScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'One curve through the whole table',
  graph: {
    steps: [
      { say: 'A town’s population (thousands) every ten years. We want 1895 and 1925, which fall **between** census years.' },
      { say: 'Newton’s forward formula builds the one polynomial (degree $4$ here) that passes through all five points, using the top diagonal of the difference table.', action: { label: 'Draw the polynomial' } },
      { say: 'Read it off. Near the **start** of the table use the forward formula: $1895$ gives $54.85$. Near the **end**, the backward formula uses the bottom diagonal: $1925$ gives $96.84$. Both formulas describe the same curve; they just start from different ends.' },
    ],
    draw: (step, presses) => {
      const v = view(1886, 1936, 35, 108);
      const items = [...v.axis([1891, 1901, 1911, 1921, 1931], 35)];
      YEARS.forEach((y, i) => items.push({ id: `p${i}`, pt: v.P(y, POP[i]), kind: 'a', label: String(POP[i]) }));
      if (presses >= 1) items.push(v.graph(newtonForward, 'nf', 'c', 1889, 1933, 60));
      if (step >= 2) {
        [[1895, 54.85], [1925, 96.84]].forEach(([y, p], i) => items.push({ id: `r${i}`, seg: [v.P(y, 35), v.P(y, p)], kind: 'e' }, { id: `q${i}`, pt: v.P(y, p), kind: 'e', label: String(p), r: 4 }));
      }
      return frame(items);
    },
  },
};
