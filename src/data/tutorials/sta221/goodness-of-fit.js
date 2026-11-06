// STA 221 · Chi-Square · Lesson 2: the χ² goodness-of-fit test (fair die, a stated ratio, and a
// fitted Poisson with one df lost for the estimated mean).
import { areaPts, axis, curvePts } from './campus';
import { CHI05, chi2Pdf, fmt } from './stat';

const FACE = (f) => 45 + (f - 1) * 50;
const BY = (n) => 160 - n * 4; // count → y, base 160
const PARTS = BASE_PARTS();
function BASE_PARTS() { return [25, 17, 15, 23, 24, 16].map((o) => ((o - 20) ** 2) / 20); }
const CXG = (v) => 30 + v * 18; // χ² 0–15 in the lower strip
const c5 = (v) => 250 - 300 * chi2Pdf(v, 5);

const die = {
  aria: 'Six bars for 120 die rolls against an expected line of 20; the gaps are squared, scaled and added into χ², then placed on the χ² curve',
  steps: [
    { say: 'Roll a die $120$ times. If it is fair, each face should come up about $\\frac{120}{6} = 20$ times: the **expected** count (dashed line).' },
    { say: 'The **observed** counts: $25, 17, 15, 23, 24, 16$. None is exactly $20$; some gap is just luck. The question: are the gaps **too big** for luck?' },
    { say: 'Measure each gap as $\\frac{(O - E)^2}{E}$: square it so ups and downs don’t cancel, and divide by $E$ so a gap of $5$ counts more when only $20$ were expected than when $200$ were.' },
    { say: `Add them all up: $\\chi^2 = \\sum\\frac{(O - E)^2}{E} = ${fmt(PARTS.reduce((s, x) => s + x, 0), 1)}$. One number for the total mismatch.` },
    { say: `How big is "too big"? Compare with the $\\chi^2$ curve for $6 - 1 = 5$ degrees of freedom. The surprising $5\\%$ starts at $${CHI05[5]}$; our $5.0$ sits comfortably in the ordinary part. **No evidence the die is unfair.**` },
  ],
  draw: (step) => {
    const obs = [25, 17, 15, 23, 24, 16];
    const shapes = obs.map((o, i) => ({ id: `bar${i}`, bar: [FACE(i + 1) - 15, 160], w: 30, h: step >= 1 ? o * 4 : 0, kind: 'a', delay: i * 80 }));
    shapes.push({ id: 'exp', line: [20, BY(20), 320, BY(20)], kind: 'd', dash: true });
    shapes.push({ id: 'expl', text: [4, BY(20) + 4], label: 'E', kind: 'd', size: 12, anchor: 'start' });
    obs.forEach((o, i) => {
      shapes.push({ id: `gap${i}`, line: [FACE(i + 1), BY(o), FACE(i + 1), BY(20)], kind: 'c', o: step >= 2 ? 1 : 0 });
      shapes.push({ id: `part${i}`, text: [FACE(i + 1), Math.min(BY(o), BY(20)) - 8], label: step >= 2 ? fmt(PARTS[i], 2) : String(o), kind: step >= 2 ? 'c' : 'a', size: 11, o: step >= 1 ? 1 : 0 });
      shapes.push({ id: `face${i}`, text: [FACE(i + 1), 174], label: String(i + 1), kind: 's', size: 11 });
    });
    shapes.push({ id: 'base', line: [20, 160, 320, 160], kind: 's' });
    shapes.push({ id: 'sum', text: [170, 196], label: 'χ² = 1.25 + 0.45 + 1.25 + 0.45 + 0.80 + 0.80 = 5.0', kind: 'c', size: 12, o: step === 3 ? 1 : 0 });
    shapes.push({ id: 'c5', curve: curvePts(c5, 0.1, 15, { at: CXG }), kind: 'e', o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 't5', area: areaPts(c5, CHI05[5], 15, 250, { at: CXG }), kind: 'd', o: step >= 4 ? 1 : 0 });
    shapes.push(...axis('cx', 250, { at: CXG, ticks: [0, 5, 10, 15].map((v) => [v, String(v)]), o: step >= 4 ? 0.9 : 0 }));
    shapes.push({ id: 'mark', vline: CXG(5), y1: 195, y2: 252, kind: 'c', o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 'markl', text: [CXG(5), 190], label: 'our 5.0', kind: 'c', size: 11, o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 'crit', text: [CXG(CHI05[5]) + 4, 226], label: '5% beyond 11.07', kind: 'd', size: 10, anchor: 'start', o: step >= 4 ? 1 : 0 });
    return shapes;
  },
};

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
          eyebrow: 'Quick recall',
          prompt: 'A $\\chi^2$ distribution with $5$ degrees of freedom has mean',
          options: [
            { text: '$5$', correct: true, why: 'The mean is its own name tag: $\\nu$.' },
            { text: '$10$', why: '$10$ is its variance, $2\\nu$.' },
            { text: '$0$', why: '$\\chi^2$ is never negative; its mean is $\\nu$.' },
            { text: '$11.07$', why: 'That is the $5\\%$ critical value.' },
          ],
        },
        {
          type: 'choice',
          poll: 'dieGuess',
          eyebrow: 'Chi-Square · Lesson 2',
          prompt: 'A die is rolled $120$ times. Face $6$ comes up $16$ times instead of the expected $20$. Is the die loaded?',
          options: [{ text: 'Yes, $16 \\ne 20$' }, { text: 'Not necessarily: that could be chance' }, { text: 'Only if it’s far from 20' }],
          pollTitle: 'How far is "too far"?',
          pollBody: 'Some mismatch always happens by chance. The $\\chi^2$ statistic measures the **total** mismatch across all faces, and the table says when it is too big to blame on luck.',
        },
        { type: 'custom', widget: 'scene', eyebrow: 'See it', title: 'Gaps between observed and expected', graph: die },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
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
