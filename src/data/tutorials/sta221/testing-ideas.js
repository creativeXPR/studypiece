// STA 221 · Hypothesis Testing · Lesson 1: hypotheses, test statistic, critical region and value,
// level of significance, Type I and Type II errors, power, and one or two tails.
import { CLAIM, MU, SE20, XBAR_TEST, areaPts, axis, curvePts, fmt1 } from './campus';
import { Phi, fmt, normalPdf, shade } from './stat';

const TX = (v) => 20 + ((v - 5) / 13) * 300; // hours 5–18 across the picture
const LO = CLAIM - 1.96 * SE20;
const HI = CLAIM + 1.96 * SE20;
const h0 = (v) => 150 - 260 * normalPdf(v, CLAIM, SE20);
const h1 = (v) => 150 - 260 * normalPdf(v, MU, SE20);
const BETA = Phi((HI - MU) / SE20) - Phi((LO - MU) / SE20);

const trial = {
  aria: 'The bell of sample means if the claim were true, its 5% tails, our sample mean in a tail, and the bell if the truth were different',
  steps: [
    { say: 'A newspaper claims: "students here study **13 hours** a week on average". We can’t check all 400, so we put the claim on trial. The claim is the **null hypothesis** H₀: $\\mu = 13$, presumed innocent.' },
    { say: 'If H₀ were true, samples of $20$ would give $\\bar x$ values piling up in this bell, centred on $13$ (spread: the standard error).' },
    { say: `Most $\\bar x$ land near $13$. Landing far out in a tail would be **surprising** if H₀ were true. Mark the outer $5\\%$ (both tails): beyond $${fmt1(LO)}$ or $${fmt1(HI)}$. This is the **critical region**.` },
    { say: `Now the evidence: our sample of $20$ has $\\bar x = ${fmt1(XBAR_TEST)}$. It lands **in the critical region**. Too surprising to believe H₀, so we **reject H₀**: the claim doesn’t fit the data.` },
    { say: 'Careful! Even when H₀ **is** true, $5\\%$ of samples land in those tails just by bad luck. Rejecting a true H₀ is a **Type I error**. Its chance is the size of the tails: the **level of significance** $\\alpha = 5\\%$.' },
    { say: `Now suppose the truth is really $\\mu = ${fmt1(MU)}$ (green bell). Samples landing in the **middle** zone make us keep H₀ although it is false: a **Type II error**. Its chance, the green area in the middle, is $\\beta \\approx ${fmt(BETA, 2)}$.` },
    { say: `The rest of the green bell lands in the tails: there we correctly reject the false claim. That chance is the **power** of the test, $1 - \\beta \\approx ${fmt(1 - BETA, 2)}$.` },
  ],
  draw: (step) => [
    { id: 'h0', curve: curvePts(h0, 5, 18, { at: TX }), kind: 'a', o: step >= 1 ? 1 : 0 },
    { id: 'claim', vline: TX(CLAIM), y1: 34, y2: 154, kind: 'a', dash: true },
    { id: 'claiml', text: [TX(CLAIM), 28], label: 'H₀: μ = 13', kind: 'a', size: 12 },
    { id: 'tl', area: areaPts(h0, 5, LO, 150, { at: TX }), kind: 'd', o: step >= 2 && step <= 4 ? 1 : 0 },
    { id: 'tr', area: areaPts(h0, HI, 18, 150, { at: TX }), kind: 'd', o: step >= 2 && step <= 4 ? 1 : 0 },
    { id: 'crl', vline: TX(LO), y1: 110, y2: 154, kind: 'd', o: step >= 2 ? 1 : 0 },
    { id: 'crr', vline: TX(HI), y1: 110, y2: 154, kind: 'd', o: step >= 2 ? 1 : 0 },
    { id: 'crlab', text: [TX(HI) + 6, 120], label: step === 4 ? 'α = 5% in the tails' : 'critical region', kind: 'd', size: 10, anchor: 'start', o: step >= 2 && step <= 4 ? 1 : 0 },
    ...axis('ax', 150, { at: TX, ticks: [6, 8, 10, 12, 14, 16].map((v) => [v, String(v)]) }),
    { id: 'xb', dot: [TX(XBAR_TEST), step >= 3 ? 146 : 20], r: 5, kind: 'd', o: step >= 3 && step <= 4 ? 1 : 0 },
    { id: 'xbl', text: [TX(XBAR_TEST), 136], label: `x̄ = ${fmt1(XBAR_TEST)}`, kind: 'd', size: 11, o: step >= 3 && step <= 4 ? 1 : 0 },
    { id: 'h1', curve: curvePts((v) => h1(v) + 90, 5, 18, { at: TX }), kind: 'b', o: step >= 5 ? 1 : 0 },
    { id: 'beta', area: areaPts((v) => h1(v) + 90, LO, HI, 240, { at: TX }), kind: 'b', o: step === 5 ? 1 : 0 },
    { id: 'power', area: areaPts((v) => h1(v) + 90, 5, LO, 240, { at: TX }), kind: 'c', o: step === 6 ? 1 : 0 },
    { id: 'h1lab', text: [TX(MU) - 30, 178], label: `truth: μ = ${fmt1(MU)}`, kind: 'b', size: 11, anchor: 'end', o: step >= 5 ? 1 : 0 },
    ...axis('ax2', 240, { at: TX, ticks: [6, 8, 10, 12, 14, 16].map((v) => [v, String(v)]), o: step >= 5 ? 1 : 0 }),
    { id: 'blab', text: [TX(12), 212], label: step === 5 ? 'β' : step === 6 ? 'power' : '', kind: step === 5 ? 'b' : 'c', size: 13, o: step >= 5 ? 1 : 0 },
  ],
};

const SHIFT = [2, 3.5];

export default {
  id: 'testing-ideas',
  title: 'The language of hypothesis testing',
  covers: 'Simple and composite hypotheses, null and alternative hypotheses, test statistic, critical region, best critical region, level of significance, critical value, Type I and Type II errors, power, one- and two-tailed tests',
  minutes: 15,
  sections: [
    {
      name: 'A trial for a claim',
      terms: [
        ['Null hypothesis H₀', 'The "no effect" claim, always with $=$: $\\theta = \\theta_0$.'],
        ['Alternative H₁', 'What holds if there is an effect: $\\theta \\ne \\theta_0$, $\\theta > \\theta_0$ or $\\theta < \\theta_0$.'],
        ['Simple / composite', 'Simple fixes the parameter at one value ($\\theta = \\theta_0$); composite does not ($\\theta > \\theta_0$).'],
        ['Test statistic', 'The number computed from the sample to decide ($z$, $\\chi^2$, $F$).'],
        ['Critical region', 'The values of the test statistic that lead to rejecting H₀; its size is $\\alpha$. The **best** critical region has the most power.'],
        ['Level of significance α', 'The size of the critical region, usually $5\\%$ or $1\\%$. **Critical value**: its boundary, e.g. $\\pm 1.96$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'An estimator whose darts are centred on the bullseye, $E(\\hat\\theta) = \\theta$, is',
          options: [
            { text: 'unbiased', correct: true, why: 'Right on average.' },
            { text: 'efficient', why: 'Efficient is about a tight group (small variance).' },
            { text: 'consistent', why: 'Consistent is about closing in as $n$ grows.' },
            { text: 'sufficient', why: 'Sufficient is about using all the information.' },
          ],
        },
        { type: 'custom', widget: 'scene', eyebrow: 'Hypothesis Testing · Lesson 1', title: 'Put the claim on trial', graph: trial },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A machine should fill $500$ ml. You suspect it has drifted. Which pair of hypotheses is right?',
          options: [
            { text: 'H₀: $\\mu = 500$, H₁: $\\mu \\ne 500$', correct: true, why: 'H₀ holds the claimed value with "$=$"; "drifted" means changed either way.' },
            { text: 'H₀: $\\mu \\ne 500$, H₁: $\\mu = 500$', why: 'The equals sign always goes in H₀.' },
            { text: 'H₀: $\\mu > 500$, H₁: $\\mu < 500$', why: 'H₀ is the "no change" value, $\\mu = 500$.' },
            { text: 'H₀: $\\bar x = 500$, H₁: $\\bar x \\ne 500$', why: 'Hypotheses are about the parameter $\\mu$, not the statistic $\\bar x$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The set-up: done.',
          recap: ['H₀ has "$=$"; H₁ is the effect.', 'Reject H₀ when the statistic falls in the critical region.'],
          why: 'A decision can be wrong in two different ways.',
        },
      ],
    },
    {
      name: 'Two kinds of error',
      terms: [
        ['Type I error', 'Rejecting H₀ when it is true. Probability $\\alpha$.'],
        ['Type II error', 'Accepting H₀ when it is false. Probability $\\beta$.'],
        ['Power', '$1 - \\beta$: the chance of rejecting a false H₀, i.e. of detecting a real effect.'],
        ['Tails', 'H₁: $\\ne$ → two-tailed ($\\pm 1.96$ at $5\\%$); $>$ → right ($1.645$); $<$ → left ($-1.645$). At $1\\%$: $2.58$ and $2.33$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'The courtroom',
          title: 'H₀ = "the accused is innocent"',
          cards: [
            { title: 'Type I (α)', text: 'Jailing an innocent person: rejecting a **true** H₀. One innocent jailed: Type **One**.' },
            { title: 'Type II (β)', text: 'Freeing a guilty person: accepting a **false** H₀.' },
            { title: 'Power (1 − β)', text: 'The court’s ability to convict the truly guilty: rejecting H₀ when it is false.' },
            { title: 'The trade-off', text: 'Demanding stronger proof (smaller $\\alpha$) protects the innocent but frees more of the guilty ($\\beta$ rises). Only more evidence (bigger $n$) cuts both.' },
          ],
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Move the critical value: α and β pull against each other',
          body: 'Blue curve: the test statistic if H₀ is true. Green dashed curve: if H₁ is true. Everything right of the line is the critical region. Shaded right of it under H₀: $\\alpha$. Shaded left of it under H₁: $\\beta$.',
          graph: {
            x: [-3.2, 7], y: [0, 0.45], xs: [[-2], [0], [2], [4], [6]], ys: [],
            param: { label: 'critical value', min: 0.5, max: 3.5, step: 0.05, value: 1.65 },
            views: ['Small sample', 'Large sample'],
            rects: [
              { kind: 'up', at: (c) => shade((x) => normalPdf(x), c, 7) },
              { kind: 'low', at: (c, v) => shade((x) => normalPdf(x, SHIFT[v]), -3.2, c) },
            ],
            curves: [{ kind: 'main', f: (x) => normalPdf(x) }, { kind: 'alt', f: (x, c, v) => normalPdf(x, SHIFT[v]) }],
            segs: [{ kind: 'guide', at: (c) => [c, 0, c, 0.45] }],
            read: (c, v) => {
              const a = 1 - Phi(c);
              const b = Phi(c - SHIFT[v]);
              return `$\\alpha \\approx ${fmt(a, 3)}$, $\\beta \\approx ${fmt(b, 3)}$, power $1 - \\beta \\approx ${fmt(1 - b, 3)}$`;
            },
            need: 5,
            action: 'Move the line, then switch to a large sample',
          },
          asides: [{ label: 'Note', text: 'A bigger sample pulls the two curves apart, so both errors can shrink at once.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A test has $\\alpha = 0.05$ and $\\beta = 0.20$. Its power is',
          options: [
            { text: '$0.80$', correct: true, why: 'Power $= 1 - \\beta$.' },
            { text: '$0.95$', why: 'That is $1 - \\alpha$, the chance of correctly accepting a true H₀.' },
            { text: '$0.25$', why: 'Power does not add the two errors.' },
            { text: '$0.20$', why: 'That is $\\beta$, the Type II error.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'H₀: "the new drug is no better than the old one". A **Type II** error is',
          options: [
            { text: 'deciding it is no better when it really is better', correct: true, why: 'Accepting a false H₀: a better drug is thrown away.' },
            { text: 'deciding it is better when it isn’t', why: 'That is a Type I error (rejecting a true H₀).' },
            { text: 'testing too few patients', why: 'That may cause errors, but it is not the definition.' },
            { text: 'choosing $\\alpha = 5\\%$', why: '$\\alpha$ is the chance of a Type I error.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'One tail or two?',
          title: 'The alternative points the way',
          body: '"Changed", "different", "differs" → $\\ne$: two tails, split $\\alpha$.\n"Increased", "more than", "exceeds" → $>$: right tail.\n"Decreased", "less than", "below" → $<$: left tail.\n\n**Two-tailed:** $|z| > 1.96$ at $5\\%$, $|z| > 2.58$ at $1\\%$.\n**One-tailed:** $z > 1.645$ (or $< -1.645$) at $5\\%$; $2.33$ at $1\\%$.',
          asides: [{ label: 'Exam tip', text: '"Define Type I error, Type II error and power" is close to guaranteed. Give the definition, its symbol ($\\alpha$, $\\beta$, $1 - \\beta$) and the decision table.' }],
        },
        {
          type: 'finish',
          title: 'The language of testing: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
