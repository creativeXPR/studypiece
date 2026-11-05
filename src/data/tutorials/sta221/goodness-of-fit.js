// STA 221 · Chi-Square · Lesson 2: the χ² goodness-of-fit test (fair die, a stated ratio, and a
// fitted Poisson with one df lost for the estimated mean).
import { fmt } from './stat';

const BASE = [25, 17, 15, 23, 24, 16];
const LOAD = [-2, -1, -1, -1, -1, 6];
const obs = (k) => BASE.map((o, i) => o + k * LOAD[i]);
const chi = (k) => obs(k).reduce((s, o) => s + (o - 20) ** 2 / 20, 0);

export default {
  id: 'goodness-of-fit',
  title: 'Goodness of fit',
  covers: 'χ² = Σ(O − E)²/E, expected frequencies from a theoretical distribution, df = k − 1 − m, a fair die, a 9:3:3:1 ratio, fitting a Poisson distribution, merging small expected frequencies',
  minutes: 15,
  sections: [
    {
      name: 'Does the data fit?',
      terms: [
        ['Pearson’s statistic', '$\\chi^2 = \\sum\\dfrac{(O - E)^2}{E}$: small when observed and expected agree.'],
        ['Expected', '$E_i = n \\times p_i$, with $p_i$ from the theoretical distribution.'],
        ['Degrees of freedom', '$k - 1 - m$: $k$ categories, $m$ parameters estimated from the data.'],
        ['Decision', 'Always right-tailed: reject H₀ if $\\chi^2 > \\chi^2_\\alpha(\\text{df})$.'],
      ],
      screens: [
        {
          type: 'choice',
          poll: 'dieGuess',
          eyebrow: 'Chi-Square · Lesson 2',
          prompt: 'A die is rolled $120$ times. Face $6$ comes up $16$ times instead of the expected $20$. Is the die loaded?',
          options: [{ text: 'Yes, $16 \\ne 20$' }, { text: 'Not necessarily: that could be chance' }, { text: 'Only if it’s far from 20' }],
          pollTitle: 'How far is "too far"?',
          pollBody: 'Some mismatch always happens by chance. The $\\chi^2$ statistic measures the **total** mismatch across all faces, and the table says when it is too big to blame on luck.',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Load the die until the test notices',
          body: 'Bars: observed counts for faces $1$–$6$ in $120$ rolls. Dashed line: expected $20$ each. Load the die towards $6$ and watch $\\chi^2$ grow past the table value $\\chi^2_{0.05}(5) = 11.070$.',
          graph: {
            x: [0.3, 6.7], y: [0, 42], xs: [[1], [2], [3], [4], [5], [6]], ys: [[20], [40]],
            param: { label: 'how loaded', min: 0, max: 4, step: 1, value: 0 },
            rects: [{ kind: 'up', at: (k) => obs(k).map((o, i) => [i + 0.7, o, 0.6, o]) }],
            segs: [{ kind: 'guide', at: () => [0.3, 20, 6.7, 20] }],
            ok: (k) => chi(k) <= 11.07,
            read: (k) => `$\\chi^2 = ${fmt(chi(k), 2)}$ ${chi(k) > 11.07 ? '$> 11.070$: **reject** "fair"' : '$< 11.070$: **accept** "fair"'}`,
            need: 5,
            action: 'Load the die step by step',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Is the die fair? Observed $25, 17, 15, 23, 24, 16$ in $120$ rolls',
          body: '**1.** H₀: the die is fair ($p_i = \\frac16$). H₁: it is not.\n**2.** $E_i = 120 \\times \\frac16 = 20$ for every face.\n**3.** $\\chi^2 = \\frac{25 + 9 + 25 + 9 + 16 + 16}{20} = \\frac{100}{20} = 5.0$.\n**4.** df $= 6 - 1 = 5$; $\\chi^2_{0.05}(5) = 11.070$. $5.0 < 11.070$: accept H₀.\n**5.** No evidence that the die is unfair.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Theory says seeds come in the ratio $9 : 3 : 3 : 1$. In $160$ seeds: $95, 25, 28, 12$.',
          body: '$E = 160 \\times \\frac{9}{16}, \\frac{3}{16}, \\frac{3}{16}, \\frac{1}{16} = 90, 30, 30, 10$.\n$$\\chi^2 = \\frac{5^2}{90} + \\frac{5^2}{30} + \\frac{2^2}{30} + \\frac{2^2}{10} = 0.278 + 0.833 + 0.133 + 0.400 = 1.644.$$\ndf $= 3$, $\\chi^2_{0.05}(3) = 7.815$. $1.644 < 7.815$: the data agree with $9 : 3 : 3 : 1$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'You fit a Poisson distribution to $5$ categories, estimating $\\lambda$ from the data. The degrees of freedom are',
          options: [
            { text: '$3$', correct: true, why: '$k - 1 - m = 5 - 1 - 1$: one more df is lost for estimating $\\lambda$.' },
            { text: '$4$', why: 'Subtract one more for the estimated parameter.' },
            { text: '$5$', why: 'At least one df is always lost, because the totals must agree.' },
            { text: '$2$', why: 'Only one parameter ($\\lambda$) was estimated.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Fitting a Poisson',
          title: 'Calls per minute over $200$ minutes: $0$: $44$, $1$: $70$, $2$: $52$, $3$: $24$, $4+$: $10$',
          body: '**Estimate λ:** $\\bar x = \\frac{0 + 70 + 104 + 72 + 40}{200} = 1.43$.\n**Probabilities** (use $P(x + 1) = P(x)\\frac{\\lambda}{x + 1}$): $0.2393, 0.3422, 0.2447, 0.1166$, and $P(\\ge 4) = 0.0572$.\n**Expected** ($\\times 200$): $47.86, 68.44, 48.94, 23.33, 11.43$ (all $\\ge 5$).\n$$\\chi^2 = 0.74, \\quad \\text{df} = 5 - 1 - 1 = 3, \\quad \\chi^2_{0.05}(3) = 7.815.$$\n$0.74 < 7.815$: the Poisson distribution fits well.',
          asides: [{ label: 'Exam tip', text: 'Check every $E \\ge 5$; if one is smaller, merge it with its neighbour **before** computing $\\chi^2$, and recount $k$.' }],
        },
        {
          type: 'finish',
          title: 'Goodness of fit: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
