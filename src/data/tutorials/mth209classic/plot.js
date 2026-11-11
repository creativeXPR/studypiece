// MTH 209 plotting helpers for `plane`-widget scenes: map a maths box onto the plane (identity
// matrix, no grid), draw graphs, axes and labels, so every point glides smoothly between steps.

// Math box → plane coordinates (the plane shows about ±6.4 across and ±5 up at R = 5).
export function view(x0, x1, y0, y1) {
  const X = (x) => -5.6 + ((x - x0) / (x1 - x0)) * 11.2;
  const Y = (y) => -4.2 + ((y - y0) / (y1 - y0)) * 8.4;
  const P = (x, y) => [X(x), Y(y)];
  // Values beyond the box are pinned a full box-height outside it, so the curve visibly leaves
  // the frame (the picture is clipped) instead of running flat along its edge.
  const span = y1 - y0;
  const graph = (fn, id = 'f', kind = 'a', a = x0, b = x1, n = 80) => ({
    id,
    path: Array.from({ length: n + 1 }, (_, i) => {
      const x = a + ((b - a) * i) / n;
      return P(x, Math.max(y0 - span, Math.min(y1 + span, fn(x))));
    }),
    kind,
  });
  const axis = (ticks, at = 0) => [
    { id: 'xaxis', seg: [P(x0, at), P(x1, at)], kind: 's', dash: false },
    ...ticks.map((t, i) => ({ id: `tk${i}`, text: [X(t), Y(at) - 0.8], label: String(t), kind: 's', size: 11 })),
  ];
  const yaxis = (ticks, at = 0) => [
    { id: 'yaxis', seg: [P(at, y0), P(at, y1)], kind: 's', dash: false },
    ...ticks.map((t, i) => ({ id: `ty${i}`, text: [X(at) - 0.45, Y(t) - 0.15], label: String(t), kind: 's', size: 11, anchor: 'end' })),
  ];
  return { X, Y, P, graph, axis, yaxis };
}

export const frame = (items, note) => ({ M: [1, 0, 0, 1], R: 5, grid: false, ghost: false, items, note });
export const sign = (y) => (y < 0 ? 'd' : 'b');
