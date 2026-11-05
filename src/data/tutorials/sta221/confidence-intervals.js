// STA 221 · Estimation · Lesson 1: confidence intervals for a mean, critical values, the vocabulary
// (interval, limits, level, coefficient), the finite population version and the sample size.
import { fmt, gauss, rng } from './stat';

const Z = (() => { const r = rng(2213); return Array.from({ length: 20 }, () => gauss(r)); })();
const LEVELS = [[0.9, 1.645], [0.95, 1.96], [0.99, 2.58]];
const SIGMA = 10;

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
          type: 'story',
          eyebrow: 'Estimation · Lesson 1',
          title: 'A guess with a margin',
          body: 'A single number, $\\bar x$, is almost never exactly $\\mu$. So we give a range:\n$$\\bar x \\pm z_{\\alpha/2}\\frac{\\sigma}{\\sqrt n}.$$\nAbout $95\\%$ of sample means land within $1.96$ standard errors of $\\mu$. Turn that round: reach $1.96$ SE either side of **your** $\\bar x$, and for $95\\%$ of samples you catch $\\mu$.\n\nThink of throwing a hoop at a fixed peg. The peg ($\\mu$) never moves; the hoop does.',
          cta: 'Throw 20 hoops',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Twenty samples, twenty intervals',
          body: 'The dashed line is the true mean $\\mu = 50$. Each bar is the interval from one sample: green if it catches $\\mu$, red if it misses. Change the confidence level and the sample size.',
          graph: {
            x: [38, 62], y: [0, 21], xs: [[40], [45], [50], [55], [60]], ys: [],
            param: { label: 'sample size $n$', min: 16, max: 100, step: 4, value: 36 },
            views: ['90%', '95%', '99%'],
            segs: [
              { kind: 'guide', at: () => [50, 0, 50, 21] },
              ...Z.flatMap((z, i) => {
                const ends = (n, v) => {
                  const se = SIGMA / Math.sqrt(n);
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
              return `${hits} of 20 intervals catch $\\mu$. Margin $E = ${LEVELS[v][1]} \\times \\frac{10}{\\sqrt{${n}}} = ${fmt((LEVELS[v][1] * SIGMA) / Math.sqrt(n))}$`;
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
