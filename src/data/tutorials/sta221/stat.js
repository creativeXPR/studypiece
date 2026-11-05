// Small statistics helpers for the STA 221 pictures (GraphLab configs).

// A seeded random number generator, so every student sees the same "random" samples.
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A standard normal draw from a uniform source (Box–Muller).
export const gauss = (r) => Math.sqrt(-2 * Math.log(r() || 1e-12)) * Math.cos(2 * Math.PI * r());

export const normalPdf = (x, mu = 0, sd = 1) => Math.exp(-0.5 * ((x - mu) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));

// Φ(z), the area to the left of z (Abramowitz–Stegun 7.1.26, error below 1e-7).
export function Phi(z) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + y) : 0.5 * (1 - y);
}

function lnGamma(x) {
  const g = [76.180091729471, -86.505320329417, 24.014098240831, -1.2317395724502, 0.0012086509738662, -0.000005395239385];
  let y = x;
  const tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
  let ser = 1.00000000019001;
  for (const c of g) ser += c / ++y;
  return -tmp + Math.log((2.506628274631 * ser) / x);
}

export const chi2Pdf = (x, k) => (x <= 0 ? 0 : Math.exp((k / 2 - 1) * Math.log(x) - x / 2 - (k / 2) * Math.LN2 - lnGamma(k / 2)));

export function fPdf(x, d1, d2) {
  if (x <= 0) return 0;
  const lnB = lnGamma(d1 / 2) + lnGamma(d2 / 2) - lnGamma((d1 + d2) / 2);
  return Math.exp((d1 / 2) * Math.log(d1 / d2) + (d1 / 2 - 1) * Math.log(x) - ((d1 + d2) / 2) * Math.log(1 + (d1 * x) / d2) - lnB);
}

// χ² values with 5% of the area to their right, for 1–30 degrees of freedom.
export const CHI05 = [null, 3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307, 19.675, 21.026, 22.362, 23.685, 24.996,
  26.296, 27.587, 28.869, 30.144, 31.41, 32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773];

// Thin strips under f between a and b, for shading an area in GraphLab (`rects`).
export function shade(f, a, b, n = 60) {
  const w = (b - a) / n;
  return Array.from({ length: n }, (_, i) => {
    const x = a + i * w;
    const h = f(x + w / 2);
    return [x, h, w, h];
  });
}

export const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;

export function fmt(x, d = 2) {
  const r = Math.round(x);
  return Math.abs(x - r) < 1e-9 ? String(r) : x.toFixed(d);
}
