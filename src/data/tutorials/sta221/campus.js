// The one university every STA 221 scene is set in, so each lesson builds on the last: the same
// 400 students, their weekly study hours (and later their exam scores), and helpers to draw them
// as dots stacked into a pile (a distribution) in the 340 × 260 Scene picture.
import { rng } from './stat';

export const N = 400;

// Weekly study hours: right-skewed, 1–29.
export const HOURS = (() => {
  const r = rng(2210);
  const draw = () => Math.round(2 + -4.4 * Math.log(r() || 1e-9) + -4.4 * Math.log(r() || 1e-9));
  return Array.from({ length: N }, () => {
    let h = draw();
    while (h > 29) h = draw(); // keep the long right tail inside the picture
    return h;
  });
})();

export const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
export const MU = mean(HOURS);
export const SIGMA = Math.sqrt(HOURS.reduce((s, h) => s + (h - MU) ** 2, 0) / N);

// Exam scores that rise with study hours, plus noise (used for correlation and regression).
export const SCORES = (() => {
  const r = rng(77);
  return HOURS.map((h) => {
    const g = Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
    return Math.max(15, Math.min(98, Math.round(38 + 2.1 * h + 8 * g)));
  });
})();

// Number line for hours: 0–30 maps to x = 20–320.
export const X = (h) => 20 + h * 10;

// Where each value sits in a stacked pile on the number line `at` with its base at y = base.
export function pile(list, base, { cols = 2, gap = 2.6, step = 4.2, at = X, width = 1 } = {}) {
  const seen = {};
  return list.map((v) => {
    const key = Math.round(v / width);
    const k = (seen[key] = (seen[key] ?? 0) + 1) - 1;
    const col = k % cols;
    const row = Math.floor(k / cols);
    return [at(key * width) + (cols === 2 ? (col ? gap : -gap) : 0), base - 3.5 - row * step];
  });
}

// An axis line with tick labels; `ticks` are [value, label] pairs placed with `at`.
export function axis(id, base, { o = 1, at = X, ticks = [0, 5, 10, 15, 20, 25, 30].map((h) => [h, String(h)]), from = 14, to = 326 } = {}) {
  return [
    { id: `${id}-ax`, line: [from, base, to, base], kind: 's', o },
    ...ticks.map(([v, label]) => ({ id: `${id}-t${v}`, text: [at(v), base + 14], label, kind: 's', size: 10, o })),
  ];
}

// The students in sample number `k` (20 by default), always the same for the same k.
export function sampleOf(k, n = 20) {
  const r = rng(700 + k);
  const pool = HOURS.map((_, i) => i);
  const out = [];
  while (out.length < n) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0]);
  return out;
}

export const fmt1 = (x) => x.toFixed(1);
export const fmt2 = (x) => x.toFixed(2);

// Points of a curve y = f(v) for v from `from` to `to`, mapped to the picture with `at`.
export function curvePts(f, from, to, { at = X, n = 80 } = {}) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const v = from + ((to - from) * i) / n;
    return [at(v), f(v)];
  });
}

// The area under y = f(v) between a and b, down to the baseline y = base.
export const areaPts = (f, a, b, base, opts) => [[(opts?.at ?? X)(a), base], ...curvePts(f, a, b, opts), [(opts?.at ?? X)(b), base]];

// Hypothesis testing (chapter 3): a claim that students study 13 hours a week, tested with one
// sample of 20 (sample 3253, whose mean falls well below the claim).
export const CLAIM = 13;
export const SE20 = SIGMA / Math.sqrt(20);
export const TEST_SAMPLE = sampleOf(3253);
export const XBAR_TEST = mean(TEST_SAMPLE.map((i) => HOURS[i]));
