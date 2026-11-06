// STA 221 · ANOVA · Lesson 2: why ANOVA, assumptions, factor, level, treatment and response, the
// split of total variation, the short-cut formulas, the one-way ANOVA table and the F test.
import { fmt } from './stat';

const E = [-2, -1, 0, 1, 2];
const JIT = [0.07, -0.14, 0.14, -0.07, 0];
const NOISE = [1, 3];
const groupMean = (j, s) => 50 + (j - 1) * s;
const F = (s, v) => (2 * s * s) / (NOISE[v] * NOISE[v]);

// The fertiliser example: yields of 12 plots under three fertilisers.
const YIELDS = [[20, 24, 22, 26], [28, 30, 27, 31, 29], [23, 25, 24]];
const GX = [80, 170, 260];
const YY = (v) => 236 - (v - 17) * 12;
const GMEAN = [23, 29, 24];
const GRAND = 25.75;
const jit = (k) => [-14, -5, 4, 13, 22][k] - 4;
const groups = {
  aria: 'Twelve plot yields in three fertiliser groups, with the grand mean, group means, and arrows for between-group and within-group variation',
  steps: [
    { say: 'Twelve plots of land, three fertilisers (A, B, C). Each dot is one plot’s yield in kg. Do the fertilisers give the **same** mean yield?' },
    { say: `First, the mean of **all 12** yields: the **grand mean**, $${GRAND}$ (dashed line).` },
    { say: 'Next, each fertiliser’s own mean: $23$, $29$ and $24$ (short lines).' },
    { say: '**Between-group variation:** how far each group mean sits from the grand mean (green arrows). If the fertilisers all worked the same, these would be small.' },
    { say: '**Within-group variation:** how far each plot sits from its **own** group mean (red arrows). That is ordinary plot-to-plot randomness.' },
    { say: 'Now compare: the green arrows are long next to the red ones. The groups differ by **more** than random wobble can explain.' },
    { say: 'ANOVA turns that comparison into one number: $F = \\dfrac{\\text{between-groups mean square}}{\\text{within-groups mean square}} = 12.97$. If the fertilisers were really equal, $F$ would be near $1$. Here it beats the table value $4.26$: the fertilisers **differ**.' },
  ],
  draw: (step) => {
    const shapes = [];
    YIELDS.forEach((ys, g) => ys.forEach((v, k) => {
      shapes.push({ id: `y${g}${k}`, dot: [GX[g] + jit(k), YY(v)], r: 5, kind: ['a', 'b', 'c'][g] });
      shapes.push({ id: `w${g}${k}`, bar: [GX[g] + jit(k) - 1, Math.max(YY(v), YY(GMEAN[g]))], w: 2, h: step >= 4 ? Math.abs(YY(v) - YY(GMEAN[g])) : 0, kind: 'd', o: step >= 4 ? 1 : 0, delay: k * 60 });
    }));
    shapes.push({ id: 'grand', line: [30, YY(GRAND), 320, YY(GRAND)], kind: 's', dash: true, o: step >= 1 ? 1 : 0 });
    shapes.push({ id: 'grandl', text: [318, YY(GRAND) - 6], label: `grand mean ${GRAND}`, kind: 's', size: 10, anchor: 'end', o: step >= 1 ? 1 : 0 });
    GMEAN.forEach((m, g) => {
      shapes.push({ id: `gm${g}`, line: [GX[g] - 28, YY(m), GX[g] + 28, YY(m)], kind: ['a', 'b', 'c'][g], o: step >= 2 ? 1 : 0 });
      shapes.push({ id: `gml${g}`, text: [GX[g] - 32, YY(m) + 4], label: String(m), kind: ['a', 'b', 'c'][g], size: 11, anchor: 'end', o: step >= 2 ? 1 : 0 });
      shapes.push({ id: `bt${g}`, bar: [GX[g] + 34, Math.max(YY(m), YY(GRAND))], w: 5, h: step >= 3 ? Math.abs(YY(m) - YY(GRAND)) : 0, kind: 'b', o: step >= 3 ? 1 : 0 });
      shapes.push({ id: `lab${g}`, text: [GX[g], 252], label: ['A', 'B', 'C'][g], kind: ['a', 'b', 'c'][g], size: 13 });
    });
    shapes.push({ id: 'F', text: [170, 22], label: 'F = 12.97 > 4.26', kind: 'd', size: 14, o: step >= 6 ? 1 : 0 });
    return shapes;
  },
};

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
        { type: 'custom', widget: 'scene', eyebrow: 'ANOVA · Lesson 2', title: 'Between the groups, within the groups', graph: groups },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
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
        ['One-way model', '$x_{ij} = \\mu + \\alpha_j + \\varepsilon_{ij}$, errors independent $N(0, \\sigma^2)$; H₀: all $\\alpha_j = 0$.'],
        ['Short-cut', '$CF = \\frac{T^2}{n}$; $SST = \\sum x^2 - CF$; $SSB = \\sum\\frac{T_j^2}{n_j} - CF$; $SSW = SST - SSB$.'],
        ['Degrees of freedom', 'Between $k - 1$; within $n - k$; total $n - 1$.'],
        ['Mean squares', '$MSB = \\frac{SSB}{k - 1}$, $MSW = \\frac{SSW}{n - k}$, $F = \\frac{MSB}{MSW}$.'],
        ['Decision', 'Reject H₀ if $F > F_\\alpha(k - 1, n - k)$: numerator df across, denominator df down.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The model',
          title: 'Write the model first',
          body: 'One-way ANOVA (a completely randomised design) assumes each observation is\n$$x_{ij} = \\mu + \\alpha_j + \\varepsilon_{ij}, \\qquad i = 1, \\dots, n_j,\\ j = 1, \\dots, k,$$\nwhere $\\mu$ is the overall mean, $\\alpha_j$ the effect of treatment $j$ (with $\\sum n_j\\alpha_j = 0$), and $\\varepsilon_{ij}$ independent $N(0, \\sigma^2)$ errors.\n\nThe hypotheses are then about the effects:\n$$H_0: \\alpha_1 = \\alpha_2 = \\cdots = \\alpha_k = 0 \\quad (\\text{all means equal}), \\qquad H_1: \\text{not all } \\alpha_j = 0.$$',
          asides: [{ label: 'Exam tip', text: '"Conduct an ANOVA with a suitable model": write the model, its assumptions (normal, equal variance, independent errors), H₀ and H₁, then the table, decision and conclusion.' }],
        },
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
