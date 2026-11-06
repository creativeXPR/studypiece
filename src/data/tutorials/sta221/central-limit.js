// STA 221 · Sampling · Lesson 4: the bell appearing in the x̄ pile as n grows (the Central Limit
// Theorem), the three properties of x̄, probabilities with z (and the fpc), and the difference of two
// means shown as two piles subtracted.
import { HOURS, MU, SIGMA, X, axis, curvePts, fmt1, mean, pile, sampleOf } from './campus';
import { fmt, gauss, normalPdf, rng } from './stat';

const NS = [20, 2, 5, 30];
const MEANS_BY_N = NS.map((n, j) => Array.from({ length: 300 }, (_, k) => mean(sampleOf(5000 + 1000 * j + k, n).map((i) => HOURS[i]))));
const PILES = MEANS_BY_N.map((ms) => pile(ms, 245, { cols: 1, step: 2.4, width: 0.25 }));
const TOP = pile(HOURS, 92, { step: 2.4, gap: 2.4 });
const bell = (n) => curvePts((v) => 245 - 3.5 - 300 * 0.25 * normalPdf(v, MU, SIGMA / Math.sqrt(n)) * 2.4, 1, 26);

const clt = {
  aria: 'The lopsided pile of student hours on top; below, the pile of sample means becomes a symmetric bell as the sample size grows',
  steps: [
    { say: 'Look at the students (top): the pile is **lopsided**, with a long tail of hard workers on the right. Yet the pile of $\\bar x$ values from samples of $20$ (bottom) looked like a symmetric hill. Coincidence?' },
    { say: 'Try **tiny** samples: just $n = 2$ students each. Now the $\\bar x$ pile is wide and still lopsided, a lot like the students themselves.' },
    { say: 'Samples of $n = 5$: the pile is narrower, and the lopsided tail is **shrinking**.' },
    { say: 'Samples of $n = 30$: a narrow, **symmetric bell**. The lopsidedness has averaged away.' },
    { say: 'Lay a normal curve with centre $\\mu$ and spread $\\frac{\\sigma}{\\sqrt n}$ over it: a near-perfect fit. This is the **Central Limit Theorem**.' },
    { say: '**The Central Limit Theorem:** for large $n$ (about $30$ or more), the sample mean is approximately **normal**, with mean $\\mu$ and standard error $\\frac{\\sigma}{\\sqrt n}$, **whatever** shape the population has. So any question about $\\bar x$ becomes a normal-curve question.' },
  ],
  draw: (step) => {
    const j = [0, 1, 2, 3, 3, 3][step];
    const shapes = HOURS.map((h, i) => ({ id: `p${i}`, dot: TOP[i], r: 1.4, kind: 'a', o: 0.6 }));
    shapes.push(...axis('top', 92));
    shapes.push({ id: 'mu', vline: X(MU), y1: 18, y2: 248, kind: 'a', dash: true });
    shapes.push({ id: 'mul', text: [X(MU), 12], label: `μ = ${fmt1(MU)}`, kind: 'a', size: 11 });
    MEANS_BY_N[j].forEach((m, k) => shapes.push({ id: `m${k}`, dot: PILES[j][k], r: 1.4, kind: 'e', delay: k * 2 }));
    shapes.push(...axis('low', 245));
    shapes.push({ id: 'nlab', text: [300, 140], label: `n = ${NS[j]}`, kind: 'e', size: 14, anchor: 'end' });
    shapes.push({ id: 'bell', curve: bell(30), kind: 'd', o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 'belllab', text: [X(MU) + 34, 160], label: 'normal curve', kind: 'd', size: 11, anchor: 'start', o: step >= 4 ? 1 : 0 });
    return shapes;
  },
};

// Bulbs: x̄_A ~ N(1200, 90²/50), x̄_B ~ N(1150, 120²/60), difference ~ N(50, 402).
const SA = 90 / Math.sqrt(50);
const SB = 120 / Math.sqrt(60);
const SD = Math.sqrt(SA * SA + SB * SB);
const HX = (v) => 20 + ((v - 1080) / 160) * 300; // hours 1080–1240 for the two means
const DX = (v) => 20 + ((v + 30) / 160) * 300; // difference −30 … 130
const hump = (mu, sd, base, at, k = 1800) => curvePts((v) => base - k * normalPdf(v, mu, sd), mu - 3.6 * sd, mu + 3.6 * sd, { at });
const diff = {
  aria: 'Two bell curves for the mean bulb lifetimes of brands A and B, and a wider bell for their difference',
  steps: [
    { say: 'Brand A bulbs last $1{,}200$ hours on average. Test $50$ of them: their mean $\\bar x_A$ wobbles around $1{,}200$, in a bell with SE $\\frac{90}{\\sqrt{50}} \\approx 12.7$.' },
    { say: 'Brand B: mean $1{,}150$ hours. Test $60$: $\\bar x_B$ wobbles around $1{,}150$, SE $\\frac{120}{\\sqrt{60}} \\approx 15.5$.' },
    { say: 'Now ask about the **gap** $\\bar x_A - \\bar x_B$. Each time we test both brands we get one gap. Its bell is centred at $1200 - 1150 = 50$.' },
    { say: `Notice the gap’s bell is **wider** than either: $\\sqrt{12.7^2 + 15.5^2} \\approx ${fmt(SD)}$. Two wobbly numbers make a wobblier difference: **variances add**, even when you subtract.` },
  ],
  draw: (step) => [
    { id: 'a', curve: hump(1200, SA, 100, HX, 2200), kind: 'a' },
    { id: 'al', text: [HX(1200), 24], label: 'x̄A', kind: 'a', size: 12 },
    { id: 'b', curve: hump(1150, SB, 100, HX, 2200), kind: 'b', o: step >= 1 ? 1 : 0 },
    { id: 'bl', text: [HX(1150), 36], label: 'x̄B', kind: 'b', size: 12, o: step >= 1 ? 1 : 0 },
    ...axis('h', 100, { at: HX, ticks: [1100, 1150, 1200].map((v) => [v, String(v)]) }),
    { id: 'd', curve: hump(50, SD, 225, DX, 4200), kind: 'e', o: step >= 2 ? 1 : 0 },
    { id: 'dl', text: [DX(50), 132], label: 'x̄A − x̄B', kind: 'e', size: 12, o: step >= 2 ? 1 : 0 },
    ...axis('d', 225, { at: DX, ticks: [0, 50, 100].map((v) => [v, String(v)]), o: step >= 2 ? 1 : 0 }),
    { id: 'sdl', text: [DX(50 + SD) + 4, 180], label: `SE ≈ ${fmt(SD)}`, kind: 'e', size: 11, anchor: 'start', o: step >= 3 ? 1 : 0 },
  ],
};

const POPS = [
  { draw: (r) => 10 * r(), mu: 5, sd: 10 / Math.sqrt(12), name: 'flat' },
  { draw: (r) => -2 * Math.log(r() || 1e-9), mu: 2, sd: 2, name: 'skewed' },
  { draw: (r) => (r() < 0.5 ? 2 : 8) + 0.8 * gauss(r), mu: 5, sd: Math.sqrt(0.64 + 9), name: 'two humps' },
];
const W = 0.25;
const cache = new Map();
function hist(n, v) {
  const key = `${n}|${v}`;
  if (!cache.has(key)) {
    const r = rng(1000 + 37 * n + v);
    const counts = new Array(40).fill(0);
    const M = 1500;
    for (let i = 0; i < M; i++) {
      let s = 0;
      for (let j = 0; j < n; j++) s += POPS[v].draw(r);
      const b = Math.floor(s / n / W);
      if (b >= 0 && b < 40) counts[b]++;
    }
    cache.set(key, counts.map((c, b) => [b * W, c / (M * W), W, c / (M * W)]));
  }
  return cache.get(key);
}

export default {
  id: 'central-limit',
  title: 'The Central Limit Theorem',
  covers: 'Centre, spread and shape of the sampling distribution of x̄, σ/√n, the finite population correction, the Central Limit Theorem, probabilities about x̄ with z, the difference of two means',
  minutes: 20,
  sections: [
    {
      name: 'The sample mean',
      terms: [
        ['Centre', '$\\mu_{\\bar x} = \\mu$: the sample mean is unbiased.'],
        ['Spread', '$\\sigma_{\\bar x} = \\dfrac{\\sigma}{\\sqrt n}$; for a finite population without replacement, multiply by $\\sqrt{\\dfrac{N - n}{N - 1}}$ (the **fpc**).'],
        ['Central Limit Theorem', 'For large $n$ ($n \\ge 30$), $\\bar X$ is approximately normal with mean $\\mu$ and variance $\\frac{\\sigma^2}{n}$, **whatever** the population’s shape.'],
        ['z for a mean', '$z = \\dfrac{\\bar x - \\mu}{\\sigma/\\sqrt n}$ (use $s$ for $\\sigma$ if unknown and $n$ large).'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The standard deviation of the pile of sample means is called the',
          options: [
            { text: 'standard error', correct: true, why: 'It measures how much $\\bar x$ wobbles from sample to sample.' },
            { text: 'standard deviation of the population', why: 'That is the spread of single students, which is wider.' },
            { text: 'variance', why: 'The variance is the square of a standard deviation.' },
            { text: 'parameter', why: 'It is a property of the sampling distribution, called the standard error.' },
          ],
        },
        {
          type: 'choice',
          poll: 'cltGuess',
          eyebrow: 'Sampling · Lesson 4',
          prompt: 'Waiting times are very lopsided: most short, a few very long. If you average the waits of $30$ random customers, again and again, what shape will those averages make?',
          options: [{ text: 'The same lopsided shape' }, { text: 'A symmetric bell' }, { text: 'A flat shape' }],
          pollTitle: 'A bell, almost every time.',
          pollBody: 'That is the **Central Limit Theorem**. See it happen on the next screen.',
        },
        { type: 'custom', widget: 'scene', eyebrow: 'See it', title: 'The bell appears', graph: clt },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Try it on other shapes',
          body: 'Each bar chart shows $1{,}500$ sample means. At $n = 1$ you see the population itself. Raise $n$: whatever the starting shape, the means pile into a bell (the curve is $N(\\mu, \\sigma^2/n)$) that gets narrower.',
          graph: {
            x: [0, 10], y: [0, 1.15], xs: [[0], [2], [4], [5], [6], [8], [10]], ys: [],
            param: { label: 'sample size $n$', min: 1, max: 30, step: 1, value: 1 },
            views: ['Flat', 'Skewed', 'Two humps'],
            rects: [{ kind: 'up', at: (n, v) => hist(n, v) }],
            curves: [{ kind: 'main', f: (x, n, v) => normalPdf(x, POPS[v].mu, POPS[v].sd / Math.sqrt(n)), from: 0, to: 10 }],
            read: (n, v) => `${n === 1 ? 'The population itself. ' : ''}$\\mu_{\\bar x} = ${fmt(POPS[v].mu)}$, $\\sigma_{\\bar x} = \\frac{${fmt(POPS[v].sd)}}{\\sqrt{${n}}} \\approx ${fmt(POPS[v].sd / Math.sqrt(n))}$`,
            need: 6,
            action: 'Raise n for at least two shapes',
          },
        },
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'State the Central Limit Theorem',
          body: 'If $n$ is large, the sampling distribution of the mean is approximately normal, whatever the shape of the population:\n$$\\bar X \\approx N\\left(\\mu, \\frac{\\sigma^2}{n}\\right), \\qquad Z = \\frac{\\bar X - \\mu}{\\sigma/\\sqrt n} \\approx N(0, 1).$$\nAs a working rule, $n \\ge 30$ is large. If the population is itself normal, $\\bar X$ is exactly normal for any $n$.',
          asides: [{ label: 'Exam tip', text: 'Give all three parts: (i) large $n$; (ii) the sampling distribution of the mean is approximately normal; (iii) mean $\\mu$, variance $\\sigma^2/n$, whatever the population. Add $n \\ge 30$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Bottles: $\\mu = 500$ ml, $\\sigma = 12$ ml, $n = 36$',
          body: '$\\sigma_{\\bar x} = \\frac{12}{\\sqrt{36}} = 2$.\n\n**(a)** $P(\\bar X < 497)$: $z = \\frac{497 - 500}{2} = -1.5$, $P = 1 - \\Phi(1.5) = 1 - 0.9332 = 0.0668$.\n\n**(b)** $P(496 < \\bar X < 503)$: $z_1 = -2$, $z_2 = 1.5$:\n$$P = \\Phi(1.5) - \\Phi(-2) = 0.9332 - 0.0228 = 0.9104.$$',
          asides: [{ label: 'Exam tip', text: 'The most common mistake is dividing by $\\sigma$ instead of $\\sigma/\\sqrt n$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Finite population',
          title: '$500$ students, $\\mu = 62$, $\\sigma = 10$; sample of $64$ without replacement. $P(\\bar X > 64)$?',
          body: 'Finite population **and** without replacement: use the correction factor.\n$$\\sigma_{\\bar x} = \\frac{10}{\\sqrt{64}}\\sqrt{\\frac{500 - 64}{500 - 1}} = 1.25(0.9348) = 1.1684.$$\n$z = \\frac{2}{1.1684} = 1.71$, so $P = 1 - 0.9564 = 0.0436$.\n\nWith replacement: SE $= 1.25$, $z = 1.60$, $P = 0.0548$. The correction makes the SE smaller.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Tyres last $\\mu = 40{,}000$ km, $\\sigma = 3{,}200$ km. For $64$ tyres, $P(\\bar X < 39{,}500)$ is (use $\\Phi(1.25) = 0.8944$)',
          options: [
            { text: '$0.1056$', correct: true, why: 'SE $= \\frac{3200}{8} = 400$, $z = -1.25$, $P = 1 - 0.8944$.' },
            { text: '$0.8944$', why: 'That is the area **above** $39{,}500$.' },
            { text: '$0.4364$', why: 'You used $\\sigma$ instead of $\\sigma/\\sqrt n$: $z = -0.16$.' },
            { text: '$0.2112$', why: 'That counts both tails. "Less than" is the left tail only.' },
          ],
        },
        {
          type: 'bridge',
          title: 'One mean: set.',
          recap: ['$\\bar X \\approx N(\\mu, \\sigma^2/n)$ for large $n$.', 'Use the fpc for finite $N$ without replacement.'],
          why: 'Exams also compare two samples: the difference of two means.',
        },
      ],
    },
    {
      name: 'Difference of two means',
      terms: [
        ['Difference of means', '$\\bar X_1 - \\bar X_2$ has mean $\\mu_1 - \\mu_2$ and SE $\\sqrt{\\dfrac{\\sigma_1^2}{n_1} + \\dfrac{\\sigma_2^2}{n_2}}$.'],
        ['Same population', 'Mean difference $0$, SE $= \\sigma\\sqrt{\\dfrac{1}{n_1} + \\dfrac{1}{n_2}}$.'],
        ['Variances add', 'Subtracting two uncertain values never makes the result less uncertain: always $+$ under the root.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'See it', title: 'Two means, one gap', graph: diff },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Bulbs: A lasts $1{,}200$ h ($\\sigma = 90$), B lasts $1{,}150$ h ($\\sigma = 120$); samples of $50$ and $60$. $P(\\bar X_A - \\bar X_B \\ge 80)$?',
          body: '**Mean of the difference:** $1200 - 1150 = 50$.\n**SE:** $\\sqrt{\\frac{90^2}{50} + \\frac{120^2}{60}} = \\sqrt{162 + 240} = 20.05$.\n**z:** $\\frac{80 - 50}{20.05} = 1.50$, so $P = 1 - 0.9332 = 0.0668$.',
        },
        {
          type: 'story',
          eyebrow: 'Two tails',
          title: 'Same hostel: $\\mu = 70$ kg, $\\sigma = 5$ kg; groups of $40$ and $50$. $P$(means differ by more than $2$ kg)?',
          body: 'Same population: mean difference $0$, SE $= 5\\sqrt{\\frac{1}{40} + \\frac{1}{50}} = 1.0607$.\n\n"Differ by" has no direction: both tails.\n$$P(|\\bar X_1 - \\bar X_2| > 2) = 2\\left[1 - \\Phi\\left(\\frac{2}{1.0607}\\right)\\right] = 2[1 - \\Phi(1.89)] = 0.0588.$$',
          asides: [{ label: 'Exam tip', text: '"Differ by" → two tails. "A exceeds B by" → one tail.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Machine A: $\\mu = 250$ g, $\\sigma = 8$; machine B: $\\mu = 248$ g, $\\sigma = 6$. Samples of $40$ and $50$. The SE of $\\bar X_A - \\bar X_B$ is',
          options: [
            { text: '$\\sqrt{\\frac{64}{40} + \\frac{36}{50}} \\approx 1.52$', correct: true, why: 'Variances add: $1.6 + 0.72 = 2.32$.' },
            { text: '$\\sqrt{\\frac{64}{40} - \\frac{36}{50}} \\approx 0.94$', why: 'Variances always **add**, even for a difference.' },
            { text: '$\\frac{8}{\\sqrt{40}} - \\frac{6}{\\sqrt{50}}$', why: 'Add the variances under one square root.' },
            { text: '$\\sqrt{\\frac{8}{40} + \\frac{6}{50}}$', why: 'Square the standard deviations first.' },
          ],
        },
        {
          type: 'finish',
          title: 'The Central Limit Theorem: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
