// STA 221 · Sampling · Lesson 3: piling up the x̄ of many samples (the sampling distribution),
// its centre at μ and its smaller spread (the standard error); then every possible sample of a tiny
// population by hand, with and without replacement; SD versus SE.
import { HOURS, MU, SIGMA, X, axis, fmt1, fmt2, mean, pile, sampleOf } from './campus';

const PILE_TOP = pile(HOURS, 95, { step: 2.6, gap: 2.4 });
const MEANS = Array.from({ length: 200 }, (_, k) => mean(sampleOf(1000 + k).map((i) => HOURS[i])));
const MEAN_OF_MEANS = mean(MEANS);
const SE = Math.sqrt(mean(MEANS.map((m) => (m - MEAN_OF_MEANS) ** 2)));
const LOW = pile(MEANS, 248, { cols: 1, step: 2.9, width: 0.25 });

const scene = {
  aria: 'Sample after sample: each sample mean drops onto a new line and the means pile up into a narrow hill around μ',
  steps: [
    { say: 'Remember: the whole university on top, one sample of $20$ students in the middle, and its mean $\\bar x$.' },
    { say: 'Now take that $\\bar x$ and **drop it** onto a new line at the bottom: a line just for sample means.' },
    { say: 'Take another sample, and another. Each new sample gives a new $\\bar x$, and each one drops onto the bottom line.', action: { label: 'Take another sample', need: 4 } },
    { say: 'Let’s fast-forward: **200 samples**, 200 values of $\\bar x$, all dropped onto the bottom line.' },
    { say: 'This pile of $\\bar x$ values has a name: the **sampling distribution of the mean**. It shows every value $\\bar x$ can take, and how often.' },
    { say: `Where does it balance? At $${fmt1(MEAN_OF_MEANS)}$, right under $\\mu = ${fmt1(MU)}$. On average, $\\bar x$ lands **on** $\\mu$: the sample mean is **unbiased**.` },
    { say: 'Now compare the **widths**. Single students spread over $1$ to $29$ hours; sample means huddle much closer to the middle. In a sample, high and low students cancel out: averages are **calmer** than individuals.' },
    { say: `The standard deviation of this bottom pile has its own name: the **standard error** (SE), how much $\\bar x$ typically wobbles. Here SE $\\approx ${fmt2(SE)}$, and theory says $\\frac{\\sigma}{\\sqrt n} = \\frac{${fmt2(SIGMA)}}{\\sqrt{20}} \\approx ${fmt2(SIGMA / Math.sqrt(20))}$.` },
  ],
  draw: (step, presses) => {
    const shapes = HOURS.map((h, i) => ({ id: `p${i}`, dot: PILE_TOP[i], r: 1.5, kind: 'a', o: 0.55 }));
    shapes.push(...axis('top', 95));
    shapes.push({ id: 'mu', vline: X(MU), y1: 22, y2: 248, kind: 'a', dash: true });
    shapes.push({ id: 'mulab', text: [X(MU), 16], label: `μ = ${fmt1(MU)}`, kind: 'a', size: 12 });
    const k = step === 2 ? presses : 0;
    const chosen = sampleOf(k);
    const hrs = chosen.map((i) => HOURS[i]);
    const mid = pile(hrs, 165, { cols: 1, step: 5.5 });
    const showMid = step <= 2;
    hrs.forEach((h, j) => shapes.push({ id: `s${j}`, dot: mid[j], r: 2.6, kind: 'd', o: showMid ? 1 : 0 }));
    shapes.push(...axis('mid', 165, { o: showMid ? 1 : 0 }));
    shapes.push({ id: 'xbar', vline: X(mean(hrs)), y1: 130, y2: 167, kind: 'd', o: showMid ? 1 : 0 });
    shapes.push({ id: 'xbarlab', text: [X(mean(hrs)), 125], label: `x̄ = ${fmt1(mean(hrs))}`, kind: 'd', size: 11, o: showMid ? 1 : 0 });
    // Hand-made x̄ dots from the early samples (step 1–2), then the 200 for steps 3+.
    const early = Array.from({ length: k + 1 }, (_, j) => mean(sampleOf(j).map((i) => HOURS[i])));
    const earlyPile = pile(early, 248, { cols: 1, step: 5.5, width: 0.25 });
    for (let j = 0; j < 12; j++) {
      const on = step >= 1 && step <= 2 && j < early.length;
      shapes.push({ id: `e${j}`, dot: on ? earlyPile[j] : [X(MU), 248], r: 3, kind: 'e', o: on ? 1 : 0 });
    }
    MEANS.forEach((m, j) => shapes.push({ id: `m${j}`, dot: step >= 3 ? LOW[j] : [X(m), 165], r: 1.5, kind: 'e', o: step >= 3 ? 1 : 0, delay: step === 3 ? j * 6 : 0 }));
    shapes.push(...axis('low', 248, { o: step >= 1 ? 1 : 0 }));
    shapes.push({ id: 'sdname', text: [170, 172], label: 'the sampling distribution of x̄', kind: 'e', size: 12, o: step >= 4 && step <= 5 ? 1 : 0 });
    shapes.push({ id: 'mom', vline: X(MEAN_OF_MEANS), y1: 175, y2: 252, kind: 'e', o: step >= 5 ? 1 : 0 });
    shapes.push({ id: 'popband', bar: [X(MU - SIGMA), 95], w: 20 * SIGMA, h: step >= 6 ? 70 : 0, kind: 'a', o: step >= 6 ? 0.7 : 0 });
    shapes.push({ id: 'seband', bar: [X(MEAN_OF_MEANS - SE), 248], w: 20 * SE, h: step >= 6 ? 80 : 0, kind: 'e', o: step >= 6 ? 0.8 : 0 });
    shapes.push({ id: 'sdlab', text: [X(MU + SIGMA) + 4, 40], label: `SD σ ≈ ${fmt1(SIGMA)}`, kind: 'a', size: 11, anchor: 'start', o: step >= 6 ? 1 : 0 });
    shapes.push({ id: 'selab', text: [X(MEAN_OF_MEANS + SE) + 4, 182], label: `SE ≈ ${fmt2(SE)}`, kind: 'e', size: 11, anchor: 'start', o: step >= 7 ? 1 : 0 });
    return shapes;
  },
};

// Every sample of size 2 from {1, 3, 5, 7}.
const S = (v) => 40 + v * 34;
const POP = [1, 3, 5, 7];
const PAIRS = [[1, 3], [1, 5], [1, 7], [3, 5], [3, 7], [5, 7]];
const WITH = POP.flatMap((a) => POP.map((b) => [a, b]));
const stackAt = (vals, base, step) => {
  const seen = {};
  return vals.map((v) => {
    const k = (seen[v] = (seen[v] ?? 0) + 1) - 1;
    return [S(v), base - 6 - k * step];
  });
};
const PAIR_MEANS = PAIRS.map(([a, b]) => (a + b) / 2);
const LOW6 = stackAt(PAIR_MEANS, 225, 13);
const LOW16 = stackAt(WITH.map(([a, b]) => (a + b) / 2), 225, 13);
const smallTicks = { at: S, ticks: [1, 2, 3, 4, 5, 6, 7].map((v) => [v, String(v)]), from: 36, to: 304 };

const tiny = {
  aria: 'The six samples of size two from 1, 3, 5, 7 and their means piled into a sampling distribution',
  steps: [
    { say: 'To see **exactly** what happens, shrink the population to just four numbers: $1, 3, 5, 7$. Their mean is $\\mu = 4$.' },
    { say: 'How many different samples of $2$ can we pick (without putting a number back)? List them: $\\{1,3\\}, \\{1,5\\}, \\{1,7\\}, \\{3,5\\}, \\{3,7\\}, \\{5,7\\}$. That is ${}^4C_2 = 6$.' },
    { say: 'Each sample has a mean: $2, 3, 4, 4, 5, 6$. Drop each mean onto a new line.' },
    { say: 'That is the **complete** sampling distribution: every possible $\\bar x$, with how often it happens. It balances at $4 = \\mu$, just like the big one did.' },
    { say: 'And it is **narrower** than the population: the values $1$–$7$ shrink to $2$–$6$. Variance of the population: $5$. Variance of the means: $\\frac{10}{6} = \\frac53$.' },
    { say: '**With replacement**, a number can be picked twice and order matters: $(1,1), (1,3), (3,1), \\dots$: $4^2 = 16$ samples. Their means pile into a neat triangle, still centred on $4$, with variance $\\frac{\\sigma^2}{n} = \\frac52$.' },
  ],
  draw: (step) => {
    const shapes = POP.map((v, i) => ({ id: `pop${i}`, dot: [S(v), 64], r: 9, kind: 'a' }));
    POP.forEach((v, i) => shapes.push({ id: `pl${i}`, text: [S(v), 68], label: String(v), kind: 's', size: 11 }));
    shapes.push(...axis('pa', 76, smallTicks));
    shapes.push({ id: 'mu', vline: S(4), y1: 34, y2: 229, kind: 'd', dash: true });
    shapes.push({ id: 'mul', text: [S(4), 28], label: 'μ = 4', kind: 'd', size: 12 });
    PAIRS.forEach(([a, b], i) => shapes.push({ id: `pair${i}`, text: [80 + (i % 3) * 90, 110 + Math.floor(i / 3) * 18], label: `{${a},${b}} → ${(a + b) / 2}`, kind: 'e', size: 10, o: step >= 1 && step <= 4 ? 1 : 0, delay: i * 80 }));
    PAIR_MEANS.forEach((m, i) => shapes.push({ id: `six${i}`, dot: step >= 2 && step <= 4 ? LOW6[i] : [80 + (i % 3) * 90, 110 + Math.floor(i / 3) * 18], r: 6, kind: 'e', o: step >= 2 && step <= 4 ? 1 : 0, delay: i * 120 }));
    WITH.forEach((_, i) => shapes.push({ id: `w${i}`, dot: LOW16[i], r: 6, kind: 'b', o: step >= 5 ? 1 : 0, delay: i * 50 }));
    shapes.push(...axis('pb', 225, { ...smallTicks, o: step >= 2 ? 1 : 0 }));
    shapes.push({ id: 'cnt', text: [190, 160], label: step >= 5 ? '16 samples (with replacement)' : '6 samples (without replacement)', kind: step >= 5 ? 'b' : 'e', size: 11, anchor: 'start', o: step >= 3 ? 1 : 0 });
    return shapes;
  },
};

export default {
  id: 'sampling-distributions',
  title: 'Sampling distributions and the standard error',
  covers: 'Piling up sample means, number of possible samples Nⁿ and ᴺCₙ, the sampling distribution of a statistic, building one by listing all samples, mean of the sample means, the standard error, standard deviation versus standard error',
  minutes: 18,
  sections: [
    {
      name: 'Every possible sample',
      terms: [
        ['Number of samples', 'With replacement: $N^n$. Without replacement: ${}^NC_n = \\dfrac{N!}{n!(N - n)!}$.'],
        ['Sampling distribution', 'The values a statistic takes over **all** possible samples of size $n$, with how often each occurs.'],
        ['Standard error (SE)', 'The standard deviation of a sampling distribution. For the mean: $\\sigma_{\\bar x}$.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'Sampling · Lesson 3', title: 'Pile up the sample means', graph: scene },
        {
          type: 'choice',
          eyebrow: 'Think about it',
          prompt: 'If each sample had $80$ students instead of $20$, how would the bottom pile change?',
          options: [
            { text: 'Narrower, still centred on $\\mu$', correct: true, why: 'Bigger samples cancel out more high and low students, so $\\bar x$ wobbles less. The centre stays at $\\mu$.' },
            { text: 'Wider', why: 'More students per sample means **less** wobble, not more.' },
            { text: 'It moves away from $\\mu$', why: 'The sample mean is unbiased for any sample size.' },
            { text: 'It looks like the student pile', why: 'It gets **further** from the student pile’s width as $n$ grows.' },
          ],
        },
        { type: 'custom', widget: 'scene', eyebrow: 'Every sample, by hand', title: 'A population of four numbers', graph: tiny },
        {
          type: 'story',
          eyebrow: 'The counting rule',
          title: 'How many samples of size $n$ from $N$ units?',
          body: '**With replacement:** each of the $n$ draws has all $N$ choices again: $N^n$.\n**Without replacement:** just choose $n$ of the $N$: ${}^NC_n = \\frac{N!}{n!(N - n)!}$.\n\n**Example.** Samples of size $3$ from $6$ units: $6^3 = 216$ with replacement; ${}^6C_3 = 20$ without.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'How many samples of size $2$ can be drawn **without** replacement from $\\{1, 3, 5, 7\\}$?',
          options: [
            { text: '$6$', correct: true, why: '${}^4C_2 = \\frac{4!}{2!\\,2!} = 6$.' },
            { text: '$16$', why: 'That is $4^2$, with replacement.' },
            { text: '$8$', why: 'Use ${}^NC_n$ with $N = 4$, $n = 2$.' },
            { text: '$12$', why: 'That counts ordered pairs without repeats; samples are unordered.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Check the formula',
          body: 'Without replacement, the standard error of the mean is\n$$\\sigma_{\\bar x} = \\frac{\\sigma}{\\sqrt n}\\sqrt{\\frac{N - n}{N - 1}} = \\frac{\\sqrt5}{\\sqrt2}\\sqrt{\\frac23} = \\sqrt{\\frac53} \\approx 1.291,$$\nexactly what the list gave. With replacement it is simply $\\frac{\\sigma}{\\sqrt n}$, so the variance is $\\frac52$.',
          asides: [{ label: 'Exam tip', text: 'When listing samples, write the count first ($N^n$ or ${}^NC_n$) and make sure your list has exactly that many.' }],
        },
        {
          type: 'reveal',
          eyebrow: 'Three points of interest',
          title: 'What to say about any sampling distribution of the mean',
          body: 'Given a sampling distribution, an exam often asks for its "points of interest". There are three, and the $\\{1, 3, 5, 7\\}$ example shows all of them.',
          cards: [
            { title: '1 · Its mean', text: 'The mean of the sample means equals the population mean: $\\mu_{\\bar x} = \\mu$. Here $4 = 4$: $\\bar X$ is **unbiased**.' },
            { title: '2 · Its spread', text: 'Its variance is $\\frac{\\sigma^2}{n}$ (with replacement), or $\\frac{\\sigma^2}{n}\\cdot\\frac{N - n}{N - 1}$ (without). Here $\\frac52$ and $\\frac53$. It is **smaller** than the population variance $5$.' },
            { title: '3 · Its shape', text: 'It is more bunched in the middle than the population, and tends to the **normal** shape as $n$ grows (Central Limit Theorem). Here the flat population gives a peaked, symmetric distribution of means.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Sampling distributions: set.',
          recap: ['$N^n$ samples with replacement, ${}^NC_n$ without.', 'The mean of the sample means is $\\mu$.', 'Its standard deviation is the standard error.'],
          why: 'Two words students mix up: standard deviation and standard error.',
        },
      ],
    },
    {
      name: 'SD versus SE',
      terms: [
        ['Standard deviation (SD)', 'Spread of the individual values; describes the data; does not shrink as $n$ grows.'],
        ['Standard error (SE)', 'Spread of the sample means about $\\mu$; describes how accurate $\\bar x$ is; shrinks as $n$ grows: $\\frac{\\sigma}{\\sqrt n}$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Side by side',
          title: 'SD = spread of the Data; SE = Error of the Estimate',
          cards: [
            { title: 'Standard deviation', text: 'How far **individual** values spread about their mean ($\\sigma$ or $s$). It settles near $\\sigma$ however big the sample.' },
            { title: 'Standard error', text: 'How far **sample means** spread about $\\mu$: $\\sigma_{\\bar x} = \\frac{\\sigma}{\\sqrt n}$. Bigger samples, smaller error.' },
            { title: 'Which is smaller?', text: 'The SE, since $\\sqrt n > 1$ for $n \\ge 2$. One student’s height varies a lot; the average of $50$ hardly moves.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A population has $\\sigma = 12$. What is the standard error of the mean for samples of $36$?',
          options: [
            { text: '$2$', correct: true, why: '$\\frac{12}{\\sqrt{36}} = \\frac{12}{6} = 2$.' },
            { text: '$12$', why: 'That is the standard deviation of single values.' },
            { text: '$\\frac13$', why: 'Divide by $\\sqrt{36} = 6$, not by $36$.' },
            { text: '$4$', why: '$\\sqrt{36} = 6$, so $\\frac{12}{6} = 2$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think',
          prompt: 'To **halve** the standard error of the mean, the sample size must be',
          options: [
            { text: 'multiplied by $4$', correct: true, why: 'SE $= \\frac{\\sigma}{\\sqrt n}$; $\\sqrt{4n} = 2\\sqrt n$.' },
            { text: 'doubled', why: 'Doubling $n$ only divides the SE by $\\sqrt2 \\approx 1.41$.' },
            { text: 'halved', why: 'A smaller sample gives a **bigger** SE.' },
            { text: 'squared', why: 'Four times the sample is enough.' },
          ],
        },
        {
          type: 'finish',
          title: 'Sampling distributions: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
