// STA 221 · Chi-Square · Lesson 1: the chi-square distribution, its properties, reading the table,
// the types of chi-square statistic, the conditions (RICE-5) and the test for a variance.
import { areaPts, axis, curvePts } from './campus';
import { CHI05, chi2Pdf, fmt, gauss, rng, shade } from './stat';

const ZS = (() => { const r = rng(515); return Array.from({ length: 300 }, () => Array.from({ length: 5 }, () => gauss(r))); })();
const ZX = (v) => 170 + v * 38;
const CX = (v) => 20 + v * 20; // χ² from 0 to 15
// Stack values in bins of width w, three dots across, on the line at `at`, base y = 215.
function stack(vals, at, w, cols) {
  const seen = {};
  return vals.map((v) => {
    const b = Math.floor(v / w);
    const k = (seen[b] = (seen[b] ?? 0) + 1) - 1;
    return [at((b + 0.5) * w) + (cols === 3 ? ((k % 3) - 1) * 3 : 0), 211 - Math.floor(k / cols) * 2.6];
  });
}
const VALS = [ZS.map((z) => z[0]), ZS.map((z) => z[0] ** 2), ZS.map((z) => z[0] ** 2 + z[1] ** 2), ZS.map((z) => z.reduce((s, x) => s + x * x, 0))];
const POS = [stack(VALS[0], ZX, 0.25, 1), stack(VALS[1], CX, 0.5, 3), stack(VALS[2], CX, 0.5, 1), stack(VALS[3], CX, 0.5, 1)];
const curve5 = (v) => 213 - 300 * 0.5 * chi2Pdf(v, 5) * 2.6;

const build = {
  aria: 'Standard normal values squared and added, piling into chi-square shapes for 1, 2 and 5 degrees of freedom',
  steps: [
    { say: 'Start from $300$ values of $z$, from the standard normal bell: centred on $0$, as many negative as positive.' },
    { say: '**Square** every one. Negatives become positive, and small values get even smaller, so the pile crowds against $0$ with a long tail to the right. This is the **chi-square** ($\\chi^2$) distribution with **1 degree of freedom**.' },
    { say: 'Now **add two** squared values: $z_1^2 + z_2^2$. The pile spreads out to the right. That is $\\chi^2$ with **2 degrees of freedom**.' },
    { say: 'Add **five**: $z_1^2 + \\cdots + z_5^2$. The hump moves right and the shape becomes rounder: $\\chi^2$ with $5$ degrees of freedom. Its balance point is about $5$.' },
    { say: 'So: the sum of $\\nu$ squared standard normals is $\\chi^2$ with $\\nu$ degrees of freedom. Built from squares, it is **never negative**, it leans **right**, its mean is $\\nu$ and its variance $2\\nu$.' },
    { say: `Big values are rare: the last $5\\%$ of the area (the right tail) starts at $${CHI05[5]}$ for $5$ df. That number is what the $\\chi^2$ table gives: $\\chi^2_{0.05}(5) = ${CHI05[5]}$.` },
  ],
  draw: (step) => {
    const j = Math.min(step, 3);
    const shapes = POS[j].map((p, i) => ({ id: `z${i}`, dot: p, r: 1.4, kind: step >= 1 ? 'e' : 'a', o: VALS[j][i] > 15 ? 0 : 1, delay: (i % 60) * 6 }));
    shapes.push(...axis('z', 215, { at: ZX, ticks: [-3, -2, -1, 0, 1, 2, 3].map((v) => [v, String(v)]), o: step === 0 ? 1 : 0 }));
    shapes.push(...axis('c', 215, { at: CX, ticks: [0, 5, 10, 15].map((v) => [v, String(v)]), o: step >= 1 ? 1 : 0 }));
    shapes.push({ id: 'df', text: [300, 60], label: ['z', 'df = 1', 'df = 2', 'df = 5', 'df = 5', 'df = 5'][step], kind: step ? 'e' : 'a', size: 14, anchor: 'end' });
    shapes.push({ id: 'curve', curve: curvePts(curve5, 0.1, 15, { at: CX }), kind: 'd', o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 'mean5', vline: CX(5), y1: 100, y2: 218, kind: 'd', dash: true, o: step === 4 ? 1 : 0 });
    shapes.push({ id: 'tail', area: areaPts(curve5, CHI05[5], 15, 215, { at: CX }), kind: 'c', o: step >= 5 ? 1 : 0 });
    shapes.push({ id: 'taill', text: [CX(CHI05[5]) + 4, 180], label: `5% tail from ${CHI05[5]}`, kind: 'c', size: 11, anchor: 'start', o: step >= 5 ? 1 : 0 });
    return shapes;
  },
};

export default {
  id: 'chi-square-distribution',
  title: 'The chi-square distribution',
  covers: 'χ² as a sum of squared standard normals, degrees of freedom, properties (non-negative, right-skewed, mean ν, variance 2ν, additive), reading the χ² table for right, left and two tails, types of χ² statistic, conditions for the χ² test, the test for a population variance',
  minutes: 16,
  sections: [
    {
      name: 'The distribution',
      terms: [
        ['Chi-square', '$\\chi^2 = Z_1^2 + \\cdots + Z_\\nu^2$ for independent standard normals; $\\nu$ is the degrees of freedom.'],
        ['Properties', 'Never negative; skewed right; one curve per df; mean $\\nu$, variance $2\\nu$; near normal for $\\nu \\ge 30$; additive.'],
        ['Reading the table', 'Right tail: use $\\alpha$ directly, e.g. $\\chi^2_{0.05}(10) = 18.307$. Left tail: use $1 - \\alpha$. Two tails: $\\frac\\alpha2$ and $1 - \\frac\\alpha2$.'],
        ['Variance statistic', '$\\chi^2 = \\dfrac{(n - 1)s^2}{\\sigma^2}$ with $\\nu = n - 1$ (normal population).'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'Chi-Square · Lesson 1', title: 'Square some normals and add them up', graph: build },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'A family of curves, one per df',
          body: 'The shaded tail holds $5\\%$ of the area; its left edge is the table value $\\chi^2_{0.05}$. The dashed line is the mean.',
          graph: {
            x: [0, 40], y: [0, 0.5], xs: [[0], [10], [20], [30], [40]], ys: [],
            param: { label: 'degrees of freedom $\\nu$', min: 1, max: 20, step: 1, value: 5 },
            rects: [{ kind: 'up', at: (k) => shade((x) => chi2Pdf(x, k), CHI05[k], 40, 50) }],
            curves: [{ f: (x, k) => chi2Pdf(x, k), from: 0.05 }],
            segs: [{ kind: 'guide', at: (k) => [k, 0, k, 0.5] }],
            read: (k) => `$\\nu = ${k}$: mean $${k}$, variance $${2 * k}$, $\\chi^2_{0.05}(${k}) = ${fmt(CHI05[k], 3)}$`,
            need: 4,
            action: 'Slide from small to large df',
          },
          asides: [{ label: 'Memory trick', text: 'The mean is its own name tag: $\\chi^2$ with $10$ df has mean $10$ and variance $20$ (double it). As $\\nu$ grows the curve becomes more symmetric.' }],
        },
        {
          type: 'story',
          eyebrow: 'Reading the table',
          title: 'The table gives the area to the right',
          body: 'The curve is not symmetric, so each tail is looked up separately.\n\n**Right tail** (the usual case): use the area directly: $\\chi^2_{0.05}(10) = 18.307$.\n**Left tail:** the value with $5\\%$ to its **left** has $95\\%$ to its right: $\\chi^2_{0.95}(19) = 10.117$.\n**Both tails** at $5\\%$, $19$ df: $\\chi^2_{0.975} = 8.907$ and $\\chi^2_{0.025} = 32.852$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $24$ df, the value with $5\\%$ of the area to its **left** is found as',
          options: [
            { text: '$\\chi^2_{0.95}(24) = 13.848$', correct: true, why: '$5\\%$ to the left means $95\\%$ to the right.' },
            { text: '$\\chi^2_{0.05}(24) = 36.415$', why: 'That has $5\\%$ to its **right**.' },
            { text: '$-36.415$', why: 'Chi-square values are never negative; the curve is not symmetric.' },
            { text: '$24$', why: 'That is the mean.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The curve: set.',
          recap: ['Never negative, skewed right, mean $\\nu$, variance $2\\nu$.', 'The table gives right-tail areas.'],
          why: 'Before using it on counts, know its conditions and its first test: a variance.',
        },
      ],
    },
    {
      name: 'Conditions and the variance test',
      terms: [
        ['Conditions (RICE-5)', '**R**andom sample, **I**ndependent observations, raw **C**ounts (not %), **E**xclusive and exhaustive categories, every expected frequency at least **5**.'],
        ['Types', 'Pearson’s (the usual one), Yates’ (2 × 2 correction), goodness of fit, likelihood ratio, Mantel–Haenszel (ordinal, linear trend).'],
        ['Variance test', 'H₀: $\\sigma^2 = \\sigma_0^2$; $\\chi^2 = \\frac{(n-1)s^2}{\\sigma_0^2}$, df $= n - 1$; for H₁: $\\sigma^2 > \\sigma_0^2$ reject if $\\chi^2 > \\chi^2_\\alpha$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Conditions',
          title: 'RICE-5',
          cards: [
            { title: 'Random', text: 'The sample is randomly drawn.' },
            { title: 'Independent', text: 'The observations are independent of each other.' },
            { title: 'Counts', text: 'Raw frequencies, not percentages or ratios.' },
            { title: 'Exclusive', text: 'Each observation falls in exactly one category; the categories cover everything.' },
            { title: '5', text: 'Every **expected** frequency is at least $5$. If not, merge neighbouring categories.' },
          ],
          asides: [{ label: 'Note', text: 'The χ² test of counts is non-parametric: it does not need the data to be normal.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Rods should be cut with $\\sigma = 0.5$ mm. $20$ rods give $s = 0.65$ mm. Has the variability increased? ($5\\%$)',
          body: '**1.** H₀: $\\sigma^2 = 0.25$, H₁: $\\sigma^2 > 0.25$ (right-tailed).\n**2.** df $= 19$, $\\chi^2_{0.05}(19) = 30.144$.\n**3.** $\\chi^2 = \\frac{19 \\times 0.65^2}{0.5^2} = \\frac{19 \\times 0.4225}{0.25} = 32.11$.\n**4.** $32.11 > 30.144$: reject H₀.\n**5.** The machine has become less consistent.',
          asides: [{ label: 'Exam tip', text: 'Variance test? **Square** the standard deviations. Putting in $0.65$ and $0.5$ instead of $0.4225$ and $0.25$ is the classic slip. State the assumption: a normal population.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A process should have variance $16$. $25$ measurements give $s^2 = 26.5$. The test statistic and decision ($\\chi^2_{0.05}(24) = 36.415$) are',
          options: [
            { text: '$\\chi^2 = 39.75$: the variance has increased', correct: true, why: '$\\frac{24 \\times 26.5}{16} = 39.75 > 36.415$.' },
            { text: '$\\chi^2 = 41.41$: increased', why: 'Use $n - 1 = 24$, not $n = 25$.' },
            { text: '$\\chi^2 = 7.72$: no change', why: '$s^2$ is already a variance; do not take a square root.' },
            { text: '$\\chi^2 = 39.75$: no change', why: '$39.75$ is beyond $36.415$, in the critical region.' },
          ],
        },
        {
          type: 'finish',
          title: 'The chi-square distribution: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
