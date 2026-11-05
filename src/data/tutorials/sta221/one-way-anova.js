// STA 221 · ANOVA · Lesson 1: why ANOVA, assumptions, factor, level, treatment and response, the
// split of total variation, the short-cut formulas, the one-way ANOVA table and the F test.
import { fmt } from './stat';

const E = [-2, -1, 0, 1, 2];
const JIT = [0.07, -0.14, 0.14, -0.07, 0];
const NOISE = [1, 3];
const groupMean = (j, s) => 50 + (j - 1) * s;
const F = (s, v) => (2 * s * s) / (NOISE[v] * NOISE[v]);

export default {
  id: 'one-way-anova',
  title: 'One-way ANOVA',
  covers: 'Comparing several means at once, why not pairwise tests, uses, assumptions (NERI), response, factor, level and treatment, SST = SSB + SSW, the correction factor short-cut, degrees of freedom, mean squares, the F ratio and the ANOVA table',
  minutes: 18,
  sections: [
    {
      name: 'The idea',
      terms: [
        ['ANOVA', 'Tests H₀: $\\mu_1 = \\mu_2 = \\cdots = \\mu_k$ against H₁: not all equal, in **one** test.'],
        ['Split of variation', 'Total $=$ between samples $+$ within samples: $SST = SSB + SSW$.'],
        ['F ratio', '$F = \\dfrac{\\text{between-samples mean square}}{\\text{within-samples mean square}}$; big $F$ → reject H₀.'],
        ['Assumptions (NERI)', '**N**ormal populations, **E**qual variances, **R**andom and **I**ndependent samples.'],
        ['Terms', 'Response: what is measured. Factor: what may affect it. Levels: its values. Treatments: the levels compared.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'ANOVA · Lesson 1',
          title: 'Compare many means in one go',
          body: 'Three fertilisers, three groups of plots. Are the mean yields all the same?\n\nTesting each pair at $5\\%$ (with $5$ treatments that is $10$ pairs) gives a big chance that one pair looks "significant" by pure luck. ==Analysis of variance== asks the single question "are **all** the means equal?" at one level of significance.\n\nThe trick: compare the variation **between** the groups with the variation **within** them.',
          cta: 'Pull the groups apart',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Between-group spread against within-group spread',
          body: 'Three groups of five (dots); short lines mark the group means, the dashed line the grand mean. Pull the group means apart, and compare with lots of noise inside the groups. $F$ must beat $F_{0.05}(2, 12) = 3.89$.',
          graph: {
            x: [0.4, 3.6], y: [35, 65], xs: [[1, 'A'], [2, 'B'], [3, 'C']], ys: [[40], [50], [60]],
            param: { label: 'gap between group means', min: 0, max: 6, step: 0.5, value: 1 },
            views: ['Little noise', 'Lots of noise'],
            segs: [
              { kind: 'guide', at: () => [0.4, 50, 3.6, 50] },
              ...[0, 1, 2].map((j) => ({ kind: 'main', at: (s) => [j + 0.75, groupMean(j, s), j + 1.25, groupMean(j, s)] })),
            ],
            dots: [0, 1, 2].flatMap((j) => E.map((e, i) => ({ kind: 'ok', at: (s, v) => [j + 1 + JIT[i], groupMean(j, s) + e * NOISE[v]] }))),
            ok: (s, v) => F(s, v) > 3.89,
            read: (s, v) => `$F = \\frac{MSB}{MSW} = ${fmt(F(s, v), 2)}$ ${F(s, v) > 3.89 ? '$> 3.89$: **reject** "all means equal"' : '$< 3.89$: **accept** H₀'}`,
            need: 5,
            action: 'Find the gap that becomes significant, in both views',
          },
          asides: [{ label: 'Note', text: 'If the treatments all work the same, the group means scatter only as much as random error allows and $F$ is near $1$. A real difference swells the between-groups variation and $F$ grows.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'We compare production on Monday to Friday. The **factor** is',
          options: [
            { text: 'the day of the week', correct: true, why: 'It is the variable thought to affect the response. Each day is a level (treatment).' },
            { text: 'the production volume', why: 'That is the response variable, what is measured.' },
            { text: 'Monday', why: 'Monday is one level of the factor.' },
            { text: 'the F ratio', why: 'That is the test statistic.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The idea: set.',
          recap: ['One test for "all means equal".', '$F$ = between ÷ within.', 'Assumptions: NERI.'],
          why: 'Now the arithmetic, using totals so the numbers stay whole.',
        },
      ],
    },
    {
      name: 'The ANOVA table',
      terms: [
        ['Short-cut', '$CF = \\frac{T^2}{n}$; $SST = \\sum x^2 - CF$; $SSB = \\sum\\frac{T_j^2}{n_j} - CF$; $SSW = SST - SSB$.'],
        ['Degrees of freedom', 'Between $k - 1$; within $n - k$; total $n - 1$.'],
        ['Mean squares', '$MSB = \\frac{SSB}{k - 1}$, $MSW = \\frac{SSW}{n - k}$, $F = \\frac{MSB}{MSW}$.'],
        ['Decision', 'Reject H₀ if $F > F_\\alpha(k - 1, n - k)$: numerator df across, denominator df down.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Yields: A: $20, 24, 22, 26$; B: $28, 30, 27, 31, 29$; C: $23, 25, 24$. Same mean yield? ($5\\%$)',
          body: '**Totals:** $T_A = 92$ ($n = 4$), $T_B = 145$ ($5$), $T_C = 72$ ($3$); $T = 309$, $n = 12$, $\\sum x^2 = 8081$.\n\n$CF = \\frac{309^2}{12} = 7956.75$.\n$SST = 8081 - 7956.75 = 124.25$.\n$SSB = \\frac{92^2}{4} + \\frac{145^2}{5} + \\frac{72^2}{3} - CF = 2116 + 4205 + 1728 - 7956.75 = 92.25$.\n$SSW = 124.25 - 92.25 = 32.00$.\n\n**Table:** Between: SS $92.25$, df $2$, MS $46.125$, $F = 12.97$. Within: SS $32.00$, df $9$, MS $3.556$. Total: $124.25$, df $11$.\n\n$F_{0.05}(2, 9) = 4.26$. $12.97 > 4.26$: reject H₀. The fertilisers differ (B, mean $29$, looks best).',
          asides: [{ label: 'Tip', text: 'Check by definition: means $23, 29, 24$, grand mean $25.75$; $SSB = 4(2.75^2) + 5(3.25^2) + 3(1.75^2) = 92.25$ ✓.' }],
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the method',
          prompt: 'Put the steps of a one-way ANOVA in order.',
          items: [
            'State H₀: all treatment means equal; H₁: not all equal.',
            'Find each $T_j$, $n_j$, the grand total $T$, $n$ and $\\sum x^2$.',
            'Compute $CF$, then $SST$, $SSB$ and $SSW$.',
            'Find the df, the mean squares and $F$.',
            'Compare $F$ with $F_\\alpha(k - 1, n - k)$ and conclude in words.',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Complete the table: $4$ treatments, $24$ observations, $SSW = 120$, $SST = 180$. Then $F = $',
          options: [
            { text: '$3.33$', correct: true, why: '$SSB = 60$; $MSB = \\frac{60}{3} = 20$; $MSW = \\frac{120}{20} = 6$; $F = \\frac{20}{6}$. ($> F_{0.05}(3, 20) = 3.10$: reject.)' },
            { text: '$0.5$', why: 'Divide each SS by its own df before taking the ratio.' },
            { text: '$1.5$', why: 'That uses total SS. $SSB = SST - SSW = 60$.' },
            { text: '$2.67$', why: 'Within df $= n - k = 20$, not $n - 1$.' },
          ],
        },
        {
          type: 'finish',
          title: 'One-way ANOVA: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
