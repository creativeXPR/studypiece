// STA 221 · Estimation · Lesson 1: confidence intervals for a mean, critical values, the vocabulary
// (interval, limits, level, coefficient), the finite population version and the sample size.
import { HOURS, MU, SIGMA, areaPts, axis, curvePts, fmt1, mean, sampleOf } from './campus';
import { fmt, gauss, normalPdf, rng } from './stat';

const SE20 = SIGMA / Math.sqrt(20);
const CX = (v) => 20 + ((v - 4) / 13) * 300; // hours 4–17 across the picture
const XBARS = Array.from({ length: 20 }, (_, k) => mean(sampleOf(3251 + k).map((i) => HOURS[i])));
const dens = (v) => 105 - 240 * normalPdf(v, MU, SE20);
const hoop = (x, i, step, k) => {
  const lo = x - 1.96 * SE20;
  const hi = x + 1.96 * SE20;
  const hit = lo <= MU && MU <= hi;
  return [
    { id: `h${k}`, line: [CX(lo), 128 + i * 6.2, CX(hi), 128 + i * 6.2], kind: hit ? 'b' : 'd', o: step },
    { id: `hd${k}`, dot: [CX(x), 128 + i * 6.2], r: 2.2, kind: hit ? 'b' : 'd', o: step },
  ];
};

const scene = {
  aria: 'The bell of sample means with its middle 95% shaded, then intervals built around sample means, most of which catch μ',
  steps: [
    { say: 'Back to the pile of sample means (samples of $20$ students): a bell centred on $\\mu$, with standard error SE $= \\frac{\\sigma}{\\sqrt n}$.' },
    { say: 'Shade the **middle 95%** of the bell. It reaches $1.96$ standard errors either side of $\\mu$. So $95\\%$ of all samples give an $\\bar x$ inside the shaded zone.' },
    { say: 'In real life we don’t know $\\mu$; we only have **our** $\\bar x$ (the dot). Turn the idea around: reach $1.96$ SE either side of $\\bar x$. This range is a **confidence interval**.' },
    { say: 'If our $\\bar x$ landed in the shaded zone, it is within $1.96$ SE of $\\mu$, so our interval **catches** $\\mu$. Think of throwing a hoop at a peg: the peg ($\\mu$) never moves; the hoop does.' },
    { say: 'Throw more hoops: take new samples. Green hoops catch $\\mu$; red ones miss.', action: { label: 'Take another sample', need: 4 } },
    { say: 'Fast-forward to $20$ samples: about $19$ hoops catch $\\mu$, about $1$ misses. That is what **95% confidence** means: the **method** catches $\\mu$ $95\\%$ of the time.' },
    { say: 'Written as a formula: $\\bar x \\pm 1.96\\dfrac{\\sigma}{\\sqrt n}$. The part after $\\pm$ is the **margin of error**. Want $99\\%$? Use a wider hoop: $2.58$ instead of $1.96$.' },
  ],
  draw: (step, presses) => {
    const shapes = [
      { id: 'bell', curve: curvePts(dens, 4, 17, { at: CX }), kind: 'e' },
      ...axis('ax', 105, { at: CX, ticks: [6, 8, 10, 12, 14, 16].map((v) => [v, String(v)]) }),
      { id: 'mid', area: areaPts(dens, MU - 1.96 * SE20, MU + 1.96 * SE20, 105, { at: CX }), kind: 'e', o: step >= 1 && step <= 3 ? 1 : 0 },
      { id: 'midl', text: [CX(MU) + 46, 60], label: 'middle 95%', kind: 'e', size: 11, o: step >= 1 && step <= 3 ? 1 : 0 },
      { id: 'mu', vline: CX(MU), y1: 22, y2: 252, kind: 'a', dash: true },
      { id: 'mul', text: [CX(MU), 16], label: `μ = ${fmt1(MU)}`, kind: 'a', size: 11 },
    ];
    const shown = step < 2 ? 0 : step === 2 || step === 3 ? 1 : step === 4 ? Math.min(1 + presses, 12) : 20;
    for (let k = 0; k < 20; k++) shapes.push(...hoop(XBARS[k], k, k < shown ? 1 : 0, k));
    shapes.push({ id: 'count', text: [300, 120], label: `${XBARS.slice(0, shown).filter((x) => Math.abs(x - MU) <= 1.96 * SE20).length} of ${shown} catch μ`, kind: 'b', size: 11, anchor: 'end', o: step >= 4 ? 1 : 0 });
    return shapes;
  },
};

const Z = (() => { const r = rng(2213); return Array.from({ length: 20 }, () => gauss(r)); })();
const LEVELS = [[0.9, 1.645], [0.95, 1.96], [0.99, 2.58]];
const PLAY_SD = 10;

export default {
  id: 'confidence-intervals',
  title: 'Confidence intervals for a mean',
  covers: 'Interval estimates x̄ ± z σ/√n, what 95% confidence means, interval, limits, level and coefficient, critical values 1.645, 1.96, 2.58, the finite population version, sample size n = (zσ/E)²',
  minutes: 15,
  sections: [
    {
      name: 'The interval',
      terms: [
        ['Confidence interval for μ', '$\\bar x \\pm z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}$ (use $s$ if $\\sigma$ is unknown and $n$ large).'],
        ['Margin of error', '$E = z_{\\alpha/2} \\times$ SE, the part after $\\pm$.'],
        ['Vocabulary', 'Interval: the range $[t_1, t_2]$. Limits: its two ends. Level: $100(1 - \\alpha)\\%$. Coefficient: $1 - \\alpha$. Critical value: $z_{\\alpha/2}$.'],
        ['Critical values', '$90\\% \\to 1.645$, $95\\% \\to 1.96$, $97.5\\% \\to 2.24$, $98\\% \\to 2.33$, $99\\% \\to 2.58$.'],
        ['Meaning', '$95\\%$ of intervals built this way contain $\\mu$. Never "a $95\\%$ probability that $\\mu$ is in this interval".'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'For a large sample, the sample mean $\\bar X$ is approximately normal with mean $\\mu$ and standard error',
          options: [
            { text: '$\\frac{\\sigma}{\\sqrt n}$', correct: true, why: 'The Central Limit Theorem.' },
            { text: '$\\sigma$', why: 'Averages wobble less than single values.' },
            { text: '$\\frac{\\sigma}{n}$', why: 'It shrinks with $\\sqrt n$, not $n$.' },
            { text: '$\\frac{\\sigma^2}{n}$', why: 'That is the variance; the SE is its square root.' },
          ],
        },
        { type: 'custom', widget: 'scene', eyebrow: 'Estimation · Lesson 1', title: 'From the bell to the hoop', graph: scene },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Change the level and the sample size',
          body: 'The dashed line is the true mean $\\mu = 50$. Each bar is the interval from one sample: green if it catches $\\mu$, red if it misses. Change the confidence level and the sample size.',
          graph: {
            x: [38, 62], y: [0, 21], xs: [[40], [45], [50], [55], [60]], ys: [],
            param: { label: 'sample size $n$', min: 16, max: 100, step: 4, value: 36 },
            views: ['90%', '95%', '99%'],
            segs: [
              { kind: 'guide', at: () => [50, 0, 50, 21] },
              ...Z.flatMap((z, i) => {
                const ends = (n, v) => {
                  const se = PLAY_SD / Math.sqrt(n);
                  const m = 50 + z * se;
                  return [m - LEVELS[v][1] * se, i + 1, m + LEVELS[v][1] * se, i + 1];
                };
                const hit = (v) => Math.abs(z) < LEVELS[v][1];
                return [
                  { kind: 'ok', at: ends, show: (n, v) => hit(v) },
                  { kind: 'bad', at: ends, show: (n, v) => !hit(v) },
                ];
              }),
            ],
            read: (n, v) => {
              const hits = Z.filter((z) => Math.abs(z) < LEVELS[v][1]).length;
              return `${hits} of 20 intervals catch $\\mu$. Margin $E = ${LEVELS[v][1]} \\times \\frac{10}{\\sqrt{${n}}} = ${fmt((LEVELS[v][1] * PLAY_SD) / Math.sqrt(n))}$`;
            },
            need: 5,
            action: 'Try all three levels and change n',
          },
          asides: [{ label: 'Note', text: 'Higher confidence → wider hoops. Bigger sample → narrower hoops. Which hoops miss depends only on luck, not on $n$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$64$ flats: mean service charge ₦$58.4$k, $s = 6.4$k. Find the $90\\%$, $95\\%$ and $99\\%$ intervals.',
          body: 'SE $= \\frac{6.4}{\\sqrt{64}} = 0.8$.\n\n$90\\%$: $58.4 \\pm 1.645(0.8) = (57.08, 59.72)$.\n$95\\%$: $58.4 \\pm 1.96(0.8) = (56.83, 59.97)$.\n$99\\%$: $58.4 \\pm 2.58(0.8) = (56.34, 60.46)$.\n\nWe are $95\\%$ confident that the mean charge of all flats is between ₦$56.83$k and ₦$59.97$k. More confidence, wider interval.\n\n**Finite version.** If there were only $N = 600$ flats (without replacement): SE $= 0.8\\sqrt{\\frac{536}{599}} = 0.7568$, giving $(56.92, 59.88)$.',
          asides: [{ label: 'Exam tip', text: 'Say "we are $95\\%$ confident", never "there is a $95\\%$ probability that $\\mu$ lies in…": $\\mu$ is fixed, it is either in or not.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A sample of $100$ has mean $72.5$ and $s = 8$. The $95\\%$ confidence interval for $\\mu$ is',
          options: [
            { text: '$(70.93, 74.07)$', correct: true, why: 'SE $= 0.8$; $72.5 \\pm 1.96(0.8) = 72.5 \\pm 1.568$.' },
            { text: '$(56.82, 88.18)$', why: 'That uses $\\sigma = 8$ instead of the SE $= \\frac{8}{\\sqrt{100}}$.' },
            { text: '$(71.18, 73.82)$', why: 'That is the $90\\%$ interval ($1.645$).' },
            { text: '$(70.44, 74.56)$', why: 'That is the $99\\%$ interval ($2.58$).' },
          ],
        },
        {
          type: 'bridge',
          title: 'Intervals: set.',
          recap: ['$\\bar x \\pm z \\cdot \\text{SE}$.', '$1.645$, $1.96$, $2.58$ for $90$, $95$, $99\\%$.', 'More confidence, wider; bigger $n$, narrower.'],
          why: 'One more question type: how big a sample do I need?',
        },
      ],
    },
    {
      name: 'Critical values and sample size',
      terms: [
        ['Any critical value', 'Split $\\alpha$ into two tails and find the $z$ whose left area is $1 - \\frac\\alpha2$.'],
        ['Sample size', '$n = \\left(\\dfrac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^2$, always rounded **up**.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Critical values',
          title: 'One-six-four-five, one-nine-six, two-five-eight',
          body: 'Learn $90 \\to 1.645$, $95 \\to 1.96$, $99 \\to 2.58$ by heart.\n\nFor any other level, split $\\alpha$ into two tails. For $97.5\\%$: $\\alpha = 0.025$, $\\frac\\alpha2 = 0.0125$, so find $\\Phi(z) = 0.9875$: $z = 2.24$.',
        },
        {
          type: 'story',
          eyebrow: 'Sample size',
          title: 'To within $\\pm 2$ units with $95\\%$ confidence, $\\sigma = 12$',
          body: 'Set $E = z\\frac{\\sigma}{\\sqrt n}$ and solve for $n$:\n$$n = \\left(\\frac{1.96 \\times 12}{2}\\right)^2 = 11.76^2 = 138.3 \\Rightarrow n = 139.$$\nRounding down to $138$ would make the margin slightly bigger than $2$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'The critical value for a $98\\%$ confidence interval is',
          options: [
            { text: '$2.33$', correct: true, why: '$\\frac\\alpha2 = 0.01$, so $\\Phi(z) = 0.99$: $z = 2.33$.' },
            { text: '$2.05$', why: 'That leaves $2\\%$ in **one** tail. Split $\\alpha$ between two tails.' },
            { text: '$2.58$', why: 'That is for $99\\%$.' },
            { text: '$1.96$', why: 'That is for $95\\%$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Confidence intervals: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
