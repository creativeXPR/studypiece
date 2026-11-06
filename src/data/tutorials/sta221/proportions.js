// STA 221 · Estimation · Lesson 2: the sampling distribution of a sample proportion, the difference
// of two proportions, a confidence interval for p and the sample size for a proportion.
import { N, axis, curvePts } from './campus';
import { fmt, normalPdf, rng } from './stat';

// 160 of the 400 students own a laptop (p = 0.4).
const HAS = (() => {
  const r = rng(404);
  const idx = Array.from({ length: N }, (_, i) => i);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const yes = new Set(idx.slice(0, 160));
  return Array.from({ length: N }, (_, i) => (yes.has(i) ? 1 : 0));
})();
const PX = (v) => 40 + v * 260; // proportion 0–1 across the picture
const grid = (i) => [22 + 15.5 * (i % 20), 14 + 10 * Math.floor(i / 20)];
// The two stacks: students at 0 and at 1, 10 across, rising from y = 150.
const twoStacks = (() => {
  const seen = [0, 0];
  return HAS.map((v) => {
    const k = seen[v]++;
    return [PX(v) + ((k % 10) - 4.5) * 5, 150 - 4 - Math.floor(k / 10) * 4.4];
  });
})();
const PHATS = Array.from({ length: 200 }, (_, s) => {
  const r = rng(9000 + s);
  const pool = Array.from({ length: N }, (_, i) => i);
  let yes = 0;
  for (let k = 0; k < 50; k++) yes += HAS[pool.splice(Math.floor(r() * pool.length), 1)[0]];
  return yes / 50;
});
const PHAT_PILE = (() => {
  const seen = {};
  return PHATS.map((v) => {
    const k = (seen[v] = (seen[v] ?? 0) + 1) - 1;
    return [PX(v), 248 - 3.5 - k * 3.6];
  });
})();
const SEP = Math.sqrt((0.4 * 0.6) / 50);

const scene = {
  aria: 'Yes and no answers stacked at 0 and 1; their balance point is the proportion; sample proportions pile into a bell',
  steps: [
    { say: 'Same 400 students, a new question with only two answers: **do you own a laptop?** Green dots say yes.' },
    { say: 'Give every "yes" a score of $1$ and every "no" a score of $0$. Stack them: $240$ students at $0$, $160$ at $1$.' },
    { say: 'Where does this balance? $\\frac{160 \\times 1 + 240 \\times 0}{400} = 0.4$. The mean of the 0s and 1s is just the **proportion** who said yes: $p = 0.4$.' },
    { say: 'So a **proportion is a mean**. Everything we learned about $\\bar x$ carries straight over to the sample proportion $\\hat p$.' },
    { say: 'Ask $50$ students, many times. Each sample gives its own $\\hat p$. The values pile into a bell around $p = 0.4$: the **sampling distribution of** $\\hat p$.' },
    { say: `Its standard error: $\\sqrt{\\frac{pq}{n}} = \\sqrt{\\frac{0.4 \\times 0.6}{50}} \\approx ${fmt(SEP, 3)}$, where $q = 1 - p$. The $pq$ plays the part that $\\sigma^2$ played for means.` },
  ],
  draw: (step) => {
    const shapes = HAS.map((v, i) => ({ id: `p${i}`, dot: step === 0 ? grid(i) : twoStacks[i], r: step === 0 ? 3 : 1.9, kind: v ? 'b' : 's', o: step >= 4 ? 0.35 : 1, delay: step === 1 ? (i % 40) * 15 : 0 }));
    shapes.push(...axis('top', 150, { at: PX, ticks: [[0, '0 (no)'], [0.4, '0.4'], [1, '1 (yes)']], from: 20, to: 320, o: step >= 1 ? 1 : 0 }));
    shapes.push({ id: 'pline', vline: PX(0.4), y1: 50, y2: 252, kind: 'd', dash: true, o: step >= 2 ? 1 : 0 });
    shapes.push({ id: 'plab', text: [PX(0.4), 44], label: 'p = 0.4', kind: 'd', size: 12, o: step >= 2 ? 1 : 0 });
    PHATS.forEach((v, j) => shapes.push({ id: `h${j}`, dot: PHAT_PILE[j], r: 1.6, kind: 'e', o: step >= 4 ? 1 : 0, delay: step === 4 ? j * 5 : 0 }));
    shapes.push(...axis('low', 248, { at: PX, ticks: [0.2, 0.4, 0.6].map((v) => [v, String(v)]), from: 20, to: 320, o: step >= 4 ? 1 : 0 }));
    shapes.push({ id: 'bell', curve: curvePts((v) => 244.5 - 200 * 0.02 * normalPdf(v, 0.4, SEP) * 3.6, 0.15, 0.65, { at: PX }), kind: 'e', o: step >= 5 ? 1 : 0 });
    shapes.push({ id: 'phl', text: [PX(0.62), 200], label: 'p̂ values', kind: 'e', size: 11, anchor: 'start', o: step >= 4 ? 1 : 0 });
    return shapes;
  },
};


const P = 0.4;
function bars(n) {
  // Binomial probabilities, built up term by term, drawn as densities over p̂ = k/n.
  const out = [];
  let pk = (1 - P) ** n;
  for (let k = 0; k <= n; k++) {
    out.push([k / n - 0.5 / n, pk * n, 1 / n, pk * n]);
    pk *= ((n - k) / (k + 1)) * (P / (1 - P));
  }
  return out;
}

export default {
  id: 'proportions',
  title: 'Proportions',
  covers: 'A proportion as a mean of 0s and 1s, the sampling distribution of p̂ with SE √(pq/n), the finite population version, the difference of two proportions, a confidence interval for p, sample size n = z²pq/E²',
  minutes: 15,
  sections: [
    {
      name: 'One and two proportions',
      terms: [
        ['Sample proportion', '$\\hat p = \\frac xn$; for large $n$ approximately normal with mean $p$ and SE $\\sqrt{\\dfrac{pq}{n}}$, $q = 1 - p$.'],
        ['Why pq', 'Each unit scores $1$ (probability $p$) or $0$: its variance is $pq$, so the variance of the average is $\\frac{pq}{n}$.'],
        ['Two proportions', 'Mean $p_1 - p_2$, SE $\\sqrt{\\dfrac{p_1q_1}{n_1} + \\dfrac{p_2q_2}{n_2}}$; same population: $\\sqrt{pq\\left(\\dfrac1{n_1} + \\dfrac1{n_2}\\right)}$.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'Estimation · Lesson 2', title: 'A proportion is a mean in disguise', graph: scene },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Change the sample size',
          body: 'In a population, $40\\%$ have the attribute. The bars show how $\\hat p$ is spread over all samples of size $n$; the curve is $N\\left(0.4, \\frac{pq}{n}\\right)$.',
          graph: {
            x: [0, 0.8], y: [0, 12], xs: [[0], [0.2], [0.4], [0.6], [0.8]], ys: [],
            param: { label: 'sample size $n$', min: 10, max: 200, step: 10, value: 20 },
            rects: [{ kind: 'up', at: (n) => bars(n) }],
            curves: [{ kind: 'main', f: (x, n) => normalPdf(x, P, Math.sqrt((P * (1 - P)) / n)) }],
            read: (n) => `$\\sigma_{\\hat p} = \\sqrt{\\frac{0.4 \\times 0.6}{${n}}} \\approx ${fmt(Math.sqrt((P * (1 - P)) / n), 4)}$`,
            need: 4,
            action: 'Raise n',
          },
          asides: [{ label: 'Tip', text: 'A common check for "large": $np \\ge 5$ and $nq \\ge 5$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$40\\%$ of voters support a candidate. Sample of $200$.',
          body: 'SE $= \\sqrt{\\frac{0.4 \\times 0.6}{200}} = 0.03464$.\n\n**(a) More than $45\\%$:** $z = \\frac{0.45 - 0.40}{0.03464} = 1.44$, $P = 1 - 0.9251 = 0.0749$.\n**(b) Between $35\\%$ and $45\\%$:** $P = 2\\Phi(1.44) - 1 = 0.8502$.',
          asides: [{ label: 'Exam tip', text: 'Probability questions use the **given** $p$ in the SE. Convert counts to proportions first: "$50$ or fewer of $100$" means $\\hat p \\le 0.50$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Two proportions',
          title: 'Ripe oranges: $60\\%$ ripe; two samples of $50$. $P$(the numbers ripe differ by more than $5$)?',
          body: '$5$ oranges out of $50$ is a difference of $0.1$ in proportion. Same population, so mean difference $0$ and\n$$\\text{SE} = \\sqrt{0.6 \\times 0.4\\left(\\tfrac{1}{50} + \\tfrac{1}{50}\\right)} = 0.09798.$$\n"Differ by": two tails. $P = 2[1 - \\Phi(1.02)] = 2(0.1539) = 0.3078$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Town A: $30\\%$ own a generator; town B: $25\\%$. Samples of $150$ each. The SE of $\\hat p_A - \\hat p_B$ is',
          options: [
            { text: '$\\sqrt{\\frac{0.3(0.7)}{150} + \\frac{0.25(0.75)}{150}} \\approx 0.0515$', correct: true, why: 'Variances add: $0.0014 + 0.00125 = 0.00265$.' },
            { text: '$\\sqrt{\\frac{0.05(0.95)}{150}}$', why: 'Use each town’s $pq$ separately, then add.' },
            { text: '$\\sqrt{\\frac{0.3(0.7)}{150} - \\frac{0.25(0.75)}{150}}$', why: 'Variances always add.' },
            { text: '$\\frac{0.3(0.7)}{150} + \\frac{0.25(0.75)}{150}$', why: 'Take the square root of the sum.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Proportions: set.',
          recap: ['SE of $\\hat p$: $\\sqrt{pq/n}$.', 'Two proportions: add the two $\\frac{pq}{n}$ terms.'],
          why: 'Now a confidence interval for an unknown $p$.',
        },
      ],
    },
    {
      name: 'Interval for p',
      terms: [
        ['Interval for p', '$\\hat p \\pm z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p\\hat q}{n}}$ (uses $\\hat p$, because $p$ is unknown).'],
        ['Sample size for p', '$n = \\dfrac{z^2pq}{E^2}$; with no idea of $p$, use $p = 0.5$ (largest $pq$).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$780$ of $1{,}200$ adults support a policy. Find a $95\\%$ interval for $p$.',
          body: '$\\hat p = 0.65$, SE $= \\sqrt{\\frac{0.65 \\times 0.35}{1200}} = 0.01377$.\n$$0.65 \\pm 1.96(0.01377) = 0.65 \\pm 0.0270 = (0.623, 0.677).$$\nWe are $95\\%$ confident that between $62.3\\%$ and $67.7\\%$ of all adults support it.',
        },
        {
          type: 'story',
          eyebrow: 'Sample size',
          title: 'To within $\\pm 3$ points, $95\\%$ confidence, $p$ unknown',
          body: 'Use $p = 0.5$: $pq = 0.25$ is as large as it gets, so the sample is big enough whatever $p$ is.\n$$n = \\frac{1.96^2(0.25)}{0.03^2} = 1067.1 \\Rightarrow n = 1068.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: '$140$ of $400$ adults smoke. The $95\\%$ interval for the proportion of smokers is',
          options: [
            { text: '$(0.303, 0.397)$', correct: true, why: '$\\hat p = 0.35$, SE $= 0.02385$, margin $1.96 \\times 0.02385 = 0.0467$.' },
            { text: '$(0.288, 0.412)$', why: 'That is the $99\\%$ interval.' },
            { text: '$(0.326, 0.374)$', why: 'Multiply the SE by $1.96$.' },
            { text: '$(0.35, 0.65)$', why: 'Build $\\hat p \\pm z\\cdot$SE around $0.35$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Proportions: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
