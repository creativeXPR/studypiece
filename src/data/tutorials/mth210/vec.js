// Small vector helpers for the MTH 210 pictures (SpaceLab / FieldLab configs).
export const O = [0, 0, 0];
export const add = (a, b) => a.map((x, i) => x + b[i]);
export const sub = (a, b) => a.map((x, i) => x - b[i]);
export const mul = (k, a) => a.map((x) => k * x);
export const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a) => Math.sqrt(dot(a, a));
export const deg = (rad) => (rad * 180) / Math.PI;
export const det3 = (a, b, c) => dot(a, cross(b, c));

// A number for display: whole numbers stay whole, others get `d` decimals.
export function num(x, d = 2) {
  const r = Math.round(x);
  if (Math.abs(x - r) < 1e-9) return String(r);
  return x.toFixed(d);
}
export const tup = (a, d) => `(${a.map((x) => num(x, d)).join(',\\ ')})`;

// Dashed guide lines from a point down to the xy-plane and across to the axes.
export const guides = (p, kind = 's') => [
  { seg: [[p[0], p[1], 0], p], kind, dash: true },
  { seg: [[p[0], 0, 0], [p[0], p[1], 0]], kind, dash: true },
  { seg: [[0, p[1], 0], [p[0], p[1], 0]], kind, dash: true },
];

// Corners of the parallelogram spanned by a and b from point o.
export const gram = (a, b, o = O) => [o, add(o, a), add(add(o, a), b), add(o, b)];

// A square piece of the plane through o with normal n, half-width s.
export function patch(o, n, s = 2) {
  const e = Math.abs(n[0]) < 0.9 * norm(n) ? [1, 0, 0] : [0, 1, 0];
  const u0 = cross(n, e);
  const u = mul(1 / norm(u0), u0);
  const w0 = cross(n, u);
  const w = mul(1 / norm(w0), w0);
  const at = (p, q) => add(o, add(mul(p * s, u), mul(q * s, w)));
  return [at(-1, -1), at(1, -1), at(1, 1), at(-1, 1)];
}
