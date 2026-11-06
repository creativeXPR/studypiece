// MTH 209 · Chapter 1 pictures. One running equation, x³ − 2x − 5 = 0 (the one Newton used to show
// off his method; root 2.094551), seen through every method: bisection halving its bracket,
// Regula Falsi stuck at one end, cobwebs for x = g(x), Newton's tangents and the secant's chords.
// Drawn with the `plane` widget (identity matrix, no grid) so every point glides between steps.

export const F = (x) => x ** 3 - 2 * x - 5;
const FP = (x) => 3 * x * x - 2;

// Math box → plane coordinates (plane shows about ±6.4 across and ±5 up at R = 5).
function view(x0, x1, y0, y1) {
  const X = (x) => -5.6 + ((x - x0) / (x1 - x0)) * 11.2;
  const Y = (y) => -4.2 + ((y - y0) / (y1 - y0)) * 8.4;
  const P = (x, y) => [X(x), Y(y)];
  const graph = (fn, id = 'f', kind = 'a', a = x0, b = x1) => ({
    id,
    path: Array.from({ length: 81 }, (_, i) => {
      const x = a + ((b - a) * i) / 80;
      return P(x, Math.max(y0 - 1, Math.min(y1 + 1, fn(x))));
    }),
    kind,
  });
  const axis = (ticks) => [
    { id: 'xaxis', seg: [P(x0, 0), P(x1, 0)], kind: 's', dash: false },
    ...ticks.map((t, i) => ({ id: `tk${i}`, text: [X(t), Y(0) - 0.8], label: String(t), kind: 's', size: 11 })),
  ];
  return { X, Y, P, graph, axis };
}
const frame = (items, note) => ({ M: [1, 0, 0, 1], R: 5, grid: false, ghost: false, items, note });
const sign = (y) => (y < 0 ? 'd' : 'b');

// Bisection: halve [2, 3] four times, then zoom in on the tiny bracket.
function bisectSteps(n) {
  let a = 2;
  let b = 3;
  const mids = [];
  for (let i = 0; i < n; i++) {
    const c = (a + b) / 2;
    mids.push(c);
    if (F(a) * F(c) < 0) b = c;
    else a = c;
  }
  return { a, b, mids };
}

export const bisectScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Trap the root, then halve',
  graph: {
    steps: [
      { say: 'Here is $f(x) = x^3 - 2x - 5$. At $x = 2$ it is $-1$ (below the axis, red); at $x = 3$ it is $16$ (above, green). The graph is one unbroken curve, so somewhere in between it **must** cross the axis.' },
      { say: 'We don’t know where, so guess the middle, $c = 2.5$. $f(2.5) = 5.625$ is positive, like $f(3)$. So the crossing can’t be in $[2.5, 3]$: throw that half away.', action: { label: 'Halve' } },
      { say: 'Halve again: $f(2.25) = 1.89 > 0$. The root is in $[2, 2.25]$. Each halving keeps the half where the sign still changes.', action: { label: 'Halve again' } },
      { say: '$f(2.125) = 0.35 > 0$, then $f(2.0625) = -0.35 < 0$: the bracket is now $[2.0625, 2.125]$, sixteen times narrower than at the start.', action: { label: 'Two more halvings', need: 1 } },
      { say: 'Zoom in. The crossing is still trapped inside the amber bracket. Keep halving and the bracket closes in on $2.0946$: slowly (one binary digit per step), but it **never** loses the root.' },
    ],
    draw: (step, presses) => {
      const zoom = step >= 4;
      const v = zoom ? view(2.03, 2.16, -0.8, 0.8) : view(1.9, 3.1, -7, 18);
      const n = Math.min(presses >= 3 ? 4 : presses, 4);
      const { a, b, mids } = bisectSteps(n);
      const items = [...v.axis(zoom ? [2.0625, 2.125] : [2, 2.5, 3]), v.graph(F)];
      items.push({ id: 'br', path: [v.P(a, 0), v.P(b, 0)], kind: 'c' });
      items.push({ id: 'pa', pt: v.P(a, F(a)), kind: sign(F(a)) }, { id: 'pb', pt: v.P(b, F(b)), kind: sign(F(b)) });
      mids.forEach((c, i) => items.push({ id: `m${i}`, seg: [v.P(c, 0), v.P(c, F(c))], kind: 's' }, { id: `md${i}`, pt: v.P(c, F(c)), kind: sign(F(c)), r: 3 }));
      return frame(items, `bracket $[${+a.toFixed(4)},\\ ${+b.toFixed(4)}]$, width $${+(b - a).toFixed(4)}$`);
    },
  },
};

// Regula Falsi: chords from the left end to the fixed right end (3, 16).
function falsiSteps(n) {
  let a = 2;
  const b = 3;
  const cs = [];
  for (let i = 0; i < n; i++) {
    const c = (a * F(b) - b * F(a)) / (F(b) - F(a));
    cs.push({ from: a, c });
    a = c;
  }
  return { a, b, cs };
}

export const falsiScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Aim with a straight line',
  graph: {
    steps: [
      { say: 'Same curve, same bracket $[2, 3]$. But look at the heights: $f(2) = -1$ is tiny, $f(3) = 16$ is huge. The root must be much nearer $2$. The midpoint ignores that.' },
      { say: 'So join the two end points with a straight line (a ==chord==) and see where **it** crosses the axis: $c = 2.0588$. Much better than $2.5$!', action: { label: 'Draw the chord' } },
      { say: '$f(2.0588) < 0$, so it replaces the left end, and we draw the next chord to the same right end.', action: { label: 'Next chord' } },
      { say: 'Notice something? The right end $(3, 16)$ **never moves**: every new point lands on the left. The chords creep in from one side ($2.0588, 2.0813, 2.0896, \\ldots$). Fast at first, then slow. That one-sidedness is Regula Falsi’s weakness.', action: { label: 'Two more', need: 1 } },
    ],
    draw: (step, presses) => {
      const v = view(1.9, 3.1, -7, 18);
      const n = presses >= 3 ? 4 : presses;
      const { a, b, cs } = falsiSteps(n);
      const items = [...v.axis([2, 2.5, 3]), v.graph(F)];
      cs.forEach(({ from, c }, i) => items.push({ id: `ch${i}`, seg: [v.P(from, F(from)), v.P(b, F(b))], kind: i === cs.length - 1 ? 'c' : 's', dash: i !== cs.length - 1 }, { id: `c${i}`, pt: v.P(c, 0), kind: 'c', r: 3 }));
      items.push({ id: 'pa', pt: v.P(a, F(a)), kind: sign(F(a)) }, { id: 'pb', pt: v.P(b, F(b)), kind: 'b', label: step >= 3 ? 'stuck' : '' });
      return frame(items, cs.length ? `$c = ${cs[cs.length - 1].c.toFixed(4)}$` : '$f(2) = -1,\\ f(3) = 16$');
    },
  },
};

// Cobwebs for x = g(x).
function cobweb(g, x0, n) {
  const pts = [[x0, 0]];
  let x = x0;
  for (let i = 0; i < n; i++) {
    const y = g(x);
    pts.push([x, y], [y, y]);
    x = y;
  }
  return pts;
}
const GOOD = (x) => Math.cbrt(2 * x + 5);
const BAD = (x) => (x ** 3 - 5) / 2;

export const cobwebGoodScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Feeding answers back in, drawn',
  graph: {
    steps: [
      { say: 'Rewrite $x^3 - 2x - 5 = 0$ as $x = \\sqrt[3]{2x + 5}$, i.e. $x = g(x)$. Draw $y = g(x)$ (blue) and the line $y = x$ (grey). Where they meet, $x = g(x)$: that is our root.' },
      { say: 'Start at $x_0 = 0.5$. Go **up** to the curve: the height is $x_1 = g(x_0) = 1.817$. Then go **across** to the line $y = x$, which moves that height back onto the $x$-axis as the next input.', action: { label: 'One step' } },
      { say: 'Repeat: up to the curve, across to the line. The path is a staircase, and it walks straight into the crossing.', action: { label: 'More steps', need: 1 } },
      { say: 'Why does it close in? Near the crossing, $g$ is **flatter** than the line $y = x$: its slope is about $0.15$. Each step shrinks the gap to the root by that factor. A flat curve pulls you in.' },
    ],
    draw: (step, presses) => {
      const v = view(0, 3, 0, 3);
      const n = presses >= 2 ? 5 : presses;
      const web = cobweb(GOOD, 0.5, n).map(([x, y]) => v.P(x, y));
      return frame([
        { id: 'yx', path: [v.P(0, 0), v.P(3, 3)], kind: 's' },
        v.graph(GOOD, 'g', 'a'),
        ...v.axis([1, 2]),
        { id: 'web', path: web.length > 1 ? web : [web[0], web[0]], kind: 'c' },
        { id: 'root', pt: v.P(2.094551, 2.094551), kind: 'e', label: step >= 2 ? 'root' : '' },
      ], `$x_${n} = ${cobweb(GOOD, 0.5, n).at(-1)[0].toFixed(4)}$`);
    },
  },
};

export const cobwebBadScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'The same equation, rearranged badly',
  graph: {
    steps: [
      { say: 'Another rearrangement of the **same** equation: $x = \\frac{x^3 - 5}{2}$. Its curve (blue) crosses $y = x$ at the same root. Start right next to it, at $x_0 = 2$.' },
      { say: 'Up to the curve, across to the line… and we land **further** from the root: $x_1 = 1.5$, then $x_2 = -0.81$.', action: { label: 'Iterate' } },
      { say: 'It spirals away and never comes back ($x_4 = -13.1$). Here the curve is **steeper** than $y = x$ at the crossing (slope $\\approx 6.6$), so every step multiplies the error by about $6.6$. A steep curve throws you out.' },
      { say: 'So the rule is a picture: the iteration $x_{n+1} = g(x_n)$ converges near the root when $|g\'(x)| < 1$ there (flatter than $y = x$), and fails when $|g\'(x)| > 1$.' },
    ],
    draw: (step, presses) => {
      const v = view(-1.2, 3, -1.2, 3);
      const n = presses >= 1 ? 2 : 0;
      const web = cobweb(BAD, 2, n).map(([x, y]) => v.P(x, y));
      return frame([
        { id: 'yx', path: [v.P(-1.2, -1.2), v.P(3, 3)], kind: 's' },
        v.graph(BAD, 'g', 'a', -1.2, 2.45),
        ...v.axis([-1, 1, 2]),
        { id: 'web', path: web.length > 1 ? web : [web[0], web[0]], kind: 'd' },
        { id: 'root', pt: v.P(2.094551, 2.094551), kind: 'e', label: 'root' },
      ], step >= 2 ? '$x_3 = -2.77,\\ x_4 = -13.1$: diverging' : undefined);
    },
  },
};

// Newton: tangent lines from x₀ = 3.
function newtonSteps(x0, n) {
  const xs = [x0];
  for (let i = 0; i < n; i++) xs.push(xs[i] - F(xs[i]) / FP(xs[i]));
  return xs;
}

export const newtonScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Slide down the tangent',
  graph: {
    steps: [
      { say: 'Back to $f(x) = x^3 - 2x - 5$, starting from one guess, $x_0 = 3$. Up close, a smooth curve looks like a straight line: its **tangent**.' },
      { say: 'So follow the tangent at $(3, 16)$ down to the axis, as if the curve really were that line. It lands at $x_1 = 2.36$.', action: { label: 'Follow the tangent' } },
      { say: 'Do it again from $x_1$: the next tangent lands at $x_2 = 2.1272$, then $x_3 = 2.0951$.', action: { label: 'Again', need: 1 } },
      { say: 'Zoom in: $x_4 = 2.094552$, and the root is $2.094551$. The number of correct digits roughly **doubles** every step: ==quadratic convergence==. Nothing else in this chapter is that fast.' },
    ],
    draw: (step, presses) => {
      const zoom = step >= 3;
      const v = zoom ? view(2.085, 2.105, -0.15, 0.15) : view(1.9, 3.1, -7, 18);
      const n = presses >= 2 ? 3 : presses;
      const xs = newtonSteps(3, zoom ? 4 : n);
      const items = [...v.axis(zoom ? [2.09, 2.1] : [2, 2.5, 3]), v.graph(F)];
      for (let i = 0; i < xs.length - 1; i++) {
        const [x, nx] = [xs[i], xs[i + 1]];
        items.push({ id: `t${i}`, seg: [v.P(x, F(x)), v.P(nx, 0)], kind: 'c', dash: false }, { id: `u${i}`, seg: [v.P(nx, 0), v.P(nx, F(nx))], kind: 's' }, { id: `x${i}`, pt: v.P(nx, 0), kind: 'c', r: 3 });
      }
      items.push({ id: 'p0', pt: v.P(3, 16), kind: 'b', label: zoom ? '' : 'x₀' });
      return frame(items, `$x_${xs.length - 1} = ${xs.at(-1).toFixed(6)}$`);
    },
  },
};

export const newtonFailScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'When the tangent lies',
  graph: {
    steps: [
      { say: 'Newton trusts the tangent completely. What if we start where the curve is almost **flat**? Take $x_0 = 0.9$, near the bottom of the dip ($f\'(0.9) = 0.43$).' },
      { say: 'A nearly flat tangent crosses the axis very far away: $x_1 = 0.9 - \\frac{-6.071}{0.43} \\approx 15.0$. The guess has been thrown right off the picture.', action: { label: 'Follow the tangent' } },
      { say: 'That is why Newton needs a **good starting value** near the root, and why $f\'(x_n)$ close to $0$ is dangerous (dividing by a tiny slope). Bisection would never do this, which is the trade-off: speed vs safety.' },
    ],
    draw: (step, presses) => {
      const v = view(-0.5, 3.2, -9, 12);
      const x0 = 0.9;
      const far = x0 + (3.2 - x0);
      const items = [...v.axis([1, 2, 3]), v.graph(F), { id: 'p0', pt: v.P(x0, F(x0)), kind: 'd', label: 'x₀' }];
      if (presses >= 1) items.push({ id: 't', seg: [v.P(x0, F(x0)), v.P(far, F(x0) + FP(x0) * (far - x0))], kind: 'c', dash: false }, { id: 'away', text: [5.1, v.Y(-3.2)], label: '→ x₁ ≈ 15', kind: 'c', size: 12 });
      return frame(items, `$f'(${x0}) = ${FP(x0).toFixed(2)}$`);
    },
  },
};

// Secant vs Regula Falsi: the secant keeps the two most recent points.
function secantSteps(n) {
  const xs = [2, 3];
  for (let i = 0; i < n; i++) {
    const [p, q] = [xs.at(-2), xs.at(-1)];
    xs.push(q - (F(q) * (q - p)) / (F(q) - F(p)));
  }
  return xs;
}

export const secantScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Chords that move on',
  graph: {
    steps: [
      { say: 'The secant method also draws chords, like Regula Falsi. Start with $x_0 = 2$ and $x_1 = 3$: the first chord is the same, landing at $x_2 = 2.0588$.', action: { label: 'First chord' } },
      { say: 'Now the difference. Regula Falsi kept $(3, 16)$ to keep a bracket. The secant simply uses the **two newest** points, $x_1$ and $x_2$, even though they are on the same side.', action: { label: 'Next chord' } },
      { say: 'The old far point is dropped, so the chords stop pivoting around $(3, 16)$ and hug the curve near the root: $x_4 = 2.0948$, $x_5 = 2.094549$. Much faster than Regula Falsi’s crawl. The price: with no bracket, it is not guaranteed to converge.', action: { label: 'More chords', need: 1 } },
    ],
    draw: (step, presses) => {
      const zoom = presses >= 3;
      const v = zoom ? view(2.02, 2.14, -1, 1) : view(1.9, 3.1, -7, 18);
      const n = presses >= 3 ? 4 : presses;
      const xs = secantSteps(n);
      const items = [...v.axis(zoom ? [2.05, 2.1] : [2, 2.5, 3]), v.graph(F)];
      for (let i = 2; i < xs.length; i++) {
        const [p, q, r] = [xs[i - 2], xs[i - 1], xs[i]];
        const last = i === xs.length - 1;
        const far = Math.abs(p - r) > Math.abs(q - r) ? p : q;
        items.push({ id: `s${i}`, seg: [v.P(far, F(far)), v.P(r, 0)], kind: last ? 'c' : 's', dash: !last }, { id: `q${i}`, pt: v.P(q, F(q)), kind: sign(F(q)), r: 3 }, { id: `r${i}`, pt: v.P(r, 0), kind: 'c', r: 3 });
      }
      return frame(items, `$x_${xs.length - 1} = ${xs.at(-1).toFixed(6)}$`);
    },
  },
};
