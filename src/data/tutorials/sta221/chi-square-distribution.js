// STA 221 · Chi-Square · Lesson 1: the chi-square distribution, its properties, reading the table,
// the types of chi-square statistic, the conditions (RICE-5) and the test for a variance.
import { CHI05, chi2Pdf, fmt, shade } from './stat';

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
        {
          type: 'story',
          eyebrow: 'Chi-Square · Lesson 1',
          title: 'Square some normals and add them up',
          body: 'If $Z_1, \\dots, Z_\\nu$ are independent standard normal variables, then\n$$\\chi^2 = Z_1^2 + Z_2^2 + \\cdots + Z_\\nu^2$$\nhas a ==chi-square distribution== with $\\nu$ ==degrees of freedom==.\n\nIt shows up in two places: testing a **variance**, and comparing **observed and expected counts**.',
          cta: 'Change the df',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
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
