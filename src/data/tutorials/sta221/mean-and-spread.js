// STA 221 · Statistics from Zero · Lesson 1: the mean as a balance point, Σ, deviations, why they
// cancel, squaring them into variance, the standard deviation as a typical distance, n − 1, and
// grouped data. Built step by step with Scenes, then practised.
import { X, axis } from './campus';
import { fmt, mean } from './stat';

const EIGHT = [4, 7, 9, 10, 15, 6, 12, 9];
const M8 = mean(EIGHT);
const A = [8, 9, 10, 10, 11, 12];
const B = [3, 6, 9, 11, 14, 17];
const sq = (xs) => xs.map((x) => (x - 10) ** 2);
const VAR_A = mean(sq(A));
const VAR_B = mean(sq(B));

// Dots on a number line, stacked when values repeat.
function stack(list, base, step = 9) {
  const seen = {};
  return list.map((v) => {
    const k = (seen[v] = (seen[v] ?? 0) + 1) - 1;
    return [X(v), base - 5 - k * step];
  });
}
const S8 = stack(EIGHT, 190);
const ROW8 = (i) => [40 + i * 37, 60];

const centre = {
  aria: 'Eight students’ study hours placed on a number line, with the mean as a balance point',
  steps: [
    { say: 'Eight students tell us how many hours they study each week.' },
    { say: 'Put each student on a **number line** at their hours. Two students both study $9$ hours, so they stack.' },
    { say: 'Imagine the line is a seesaw. Where would it **balance**? Slide the pivot until the two sides weigh the same…' },
    { say: `It balances at $${fmt(M8)}$ hours. That balance point is the **mean**.` },
    { say: `To find it without a seesaw: **add** all the hours and **divide** by how many students. $\\frac{4 + 7 + 9 + 10 + 15 + 6 + 12 + 9}{8} = \\frac{72}{8} = ${fmt(M8)}$.` },
    { say: 'Shorthand: the Greek letter $\\sum$ (sigma) means "add them all up". So the mean is $\\bar x = \\dfrac{\\sum x}{n}$, where $n$ is how many values there are.' },
  ],
  draw: (step) => {
    const shapes = EIGHT.map((h, i) => ({ id: `d${i}`, dot: step >= 1 ? S8[i] : ROW8(i), r: 6, kind: 'a', delay: step === 1 ? i * 70 : 0 }));
    EIGHT.forEach((h, i) => shapes.push({ id: `l${i}`, text: step >= 1 ? [S8[i][0], S8[i][1] - 11] : [ROW8(i)[0], ROW8(i)[1] - 14], label: `${h}`, kind: 'a', size: 11, o: step >= 3 ? 0 : 1 }));
    shapes.push(...axis('ax', 190, { o: step >= 1 ? 1 : 0 }));
    const pivot = step === 2 ? X(4) : X(M8);
    shapes.push({ id: 'pivot', text: [step >= 2 ? pivot : X(M8), 205], label: '▲', kind: 'd', size: 16, o: step >= 2 ? 1 : 0, delay: step === 2 ? 300 : 0 });
    shapes.push({ id: 'mline', vline: X(M8), y1: 110, y2: 190, kind: 'd', o: step >= 3 ? 1 : 0 });
    shapes.push({ id: 'mlab', text: [X(M8), 102], label: step >= 5 ? `x̄ = ${fmt(M8)}` : `mean = ${fmt(M8)}`, kind: 'd', size: 13, o: step >= 3 ? 1 : 0 });
    shapes.push({ id: 'sum', text: [170, 40], label: '4 + 7 + 9 + 10 + 15 + 6 + 12 + 9 = 72', kind: 'e', size: 12, o: step === 4 ? 1 : 0 });
    return shapes;
  },
};

// The spread scene: class A on top (y = 95), class B below (y = 215); both have mean 10.
const SA = stack(A, 95, 9);
const SB = stack(B, 215, 9);
const spread = {
  aria: 'Two classes with the same mean but different spread; deviations drawn as arrows and squares',
  steps: [
    { say: 'Two classes. Both have a mean of $10$ hours. Are they the same?' },
    { say: 'No! In class A everyone is close to $10$. In class B, students are **spread out**. The mean alone can’t tell them apart. We need a number for **spread**.' },
    { say: 'Look at class B. For each student, draw an arrow from the mean to the student. Its length is the student’s **deviation**, $x - \\bar x$. Left arrows count as negative.' },
    { say: 'Try averaging the arrows: the left ones cancel the right ones **exactly**. Deviations always add up to $0$. Useless as a measure!' },
    { say: 'Fix: **square** each deviation, so every one counts as positive. Picture each square literally: a box whose side is the arrow.' },
    { say: `Now average the squares: $\\frac{49 + 16 + 1 + 1 + 16 + 49}{6} = ${fmt(VAR_B)}$. This average square is the **variance**.` },
    { say: `The variance is in "hours squared". Take the side of that average box: $\\sqrt{${fmt(VAR_B)}} \\approx ${fmt(Math.sqrt(VAR_B))}$ hours. This is the **standard deviation**: a typical distance from the mean.` },
    { say: `Class A’s boxes are tiny: its standard deviation is only $${fmt(Math.sqrt(VAR_A))}$. Same mean, very different spread, and now we have the number that shows it.` },
  ],
  draw: (step) => {
    const shapes = [];
    A.forEach((v, i) => shapes.push({ id: `a${i}`, dot: SA[i], r: 5, kind: 'b', o: step >= 2 && step <= 6 ? 0.35 : 1 }));
    B.forEach((v, i) => shapes.push({ id: `b${i}`, dot: SB[i], r: 5, kind: 'a' }));
    shapes.push(...axis('ta', 95), ...axis('tb', 215));
    shapes.push({ id: 'labA', text: [24, 30], label: 'Class A', kind: 'b', size: 12, anchor: 'start' });
    shapes.push({ id: 'labB', text: [24, 145], label: 'Class B', kind: 'a', size: 12, anchor: 'start' });
    shapes.push({ id: 'mA', vline: X(10), y1: 40, y2: 95, kind: 'd' }, { id: 'mB', vline: X(10), y1: 150, y2: 215, kind: 'd' });
    // Deviation arrows (as lines) for class B, drawn just above the axis.
    B.forEach((v, i) => shapes.push({ id: `dev${i}`, line: [X(10), 203 - i * 8, X(v), 203 - i * 8], kind: v < 10 ? 'c' : 'e', o: step >= 2 && step <= 4 ? 1 : 0 }));
    shapes.push({ id: 'zero', text: [250, 160], label: '−7 −4 −1 +1 +4 +7 = 0', kind: 'c', size: 12, o: step === 3 ? 1 : 0 });
    // Squares: one edge along each deviation, rising above the axis.
    B.forEach((v, i) => {
      const d = Math.abs(v - 10) * 10;
      shapes.push({ id: `sq${i}`, bar: [Math.min(X(10), X(v)), 215], w: d, h: step >= 4 && step <= 5 ? Math.min(d, 70) : 0, kind: v < 10 ? 'c' : 'e', o: step >= 4 && step <= 5 ? 1 : 0, delay: i * 80 });
    });
    const side = Math.sqrt(VAR_B) * 10;
    shapes.push({ id: 'avgsq', bar: [X(10), 215], w: side, h: step >= 5 && step <= 6 ? side : 0, kind: 'd', o: step >= 5 && step <= 6 ? 1 : 0 });
    shapes.push({ id: 'bandB', bar: [X(10) - side, 215], w: 2 * side, h: step >= 6 ? 62 : 0, kind: 'a', o: step >= 6 ? 0.8 : 0 });
    const sideA = Math.sqrt(VAR_A) * 10;
    shapes.push({ id: 'bandA', bar: [X(10) - sideA, 95], w: 2 * sideA, h: step >= 7 ? 55 : 0, kind: 'b', o: step >= 7 ? 0.8 : 0 });
    shapes.push({ id: 'sdB', text: [X(10) + side + 6, 172], label: `SD ≈ ${fmt(Math.sqrt(VAR_B))}`, kind: 'a', size: 12, anchor: 'start', o: step >= 6 ? 1 : 0 });
    shapes.push({ id: 'sdA', text: [X(10) + sideA + 6, 55], label: `SD ≈ ${fmt(Math.sqrt(VAR_A))}`, kind: 'b', size: 12, anchor: 'start', o: step >= 7 ? 1 : 0 });
    return shapes;
  },
};

const BASE = [44, 47, 49, 50, 50, 51, 53, 56];
const LIFT = [0.3, 0.3, 0.3, 0.3, 0.6, 0.3, 0.3, 0.3];
const at = (s) => BASE.map((x) => 50 + s * (x - 50));
const sd = (xs) => Math.sqrt(xs.reduce((t, x) => t + (x - mean(xs)) ** 2, 0) / xs.length);

export default {
  id: 'mean-and-spread',
  title: 'Averages and spread',
  covers: 'The mean as a balance point, the Σ sign, deviations and why they add to zero, squaring into the variance, the standard deviation as a typical distance, dividing by N or n − 1, grouped data',
  minutes: 15,
  sections: [
    {
      name: 'The centre',
      terms: [
        ['Σ (sigma)', '"Add them all up": $\\sum x = x_1 + x_2 + \\cdots + x_n$.'],
        ['Mean', 'The balance point of the data: $\\bar x = \\dfrac{\\sum x}{n}$.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'Statistics from Zero · Lesson 1', title: 'Where is the middle?', graph: centre },
        {
          type: 'choice',
          eyebrow: 'Think about it',
          prompt: 'A ninth student who studies $27$ hours joins the eight. Which way does the balance point move?',
          options: [
            { text: 'Right, towards $27$', correct: true, why: `A heavy weight far out on the right tips the seesaw: the new mean is $\\frac{72 + 27}{9} = 11$.` },
            { text: 'Left', why: 'The new student sits to the right of the balance point.' },
            { text: 'It stays at $9$', why: 'Adding a value away from the mean always moves the mean towards it.' },
            { text: 'It jumps to $27$', why: 'One student out of nine only nudges the balance point.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The centre: set.',
          recap: ['The mean is where the data balance.', '$\\bar x = \\frac{\\sum x}{n}$.'],
          why: 'But a centre alone hides a lot.',
        },
      ],
    },
    {
      name: 'The spread',
      terms: [
        ['Deviation', '$x - \\bar x$: how far one value is from the mean. Deviations always add to $0$.'],
        ['Variance', 'The average **squared** deviation. Population: $\\sigma^2 = \\dfrac{\\sum(x - \\mu)^2}{N}$. Sample: $s^2 = \\dfrac{\\sum(x - \\bar x)^2}{n - 1}$.'],
        ['Standard deviation', 'The square root of the variance: a typical distance from the mean, in the data’s own units.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'See it', title: 'Same mean, different spread', graph: spread },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Stretch the data, watch the standard deviation',
          body: 'Eight scores with mean $50$. The shaded band is mean ± one standard deviation.',
          graph: {
            x: [28, 72], y: [0, 1], xs: [[30], [40], [50], [60], [70]], ys: [],
            param: { label: 'spread', min: 0.5, max: 3, step: 0.5, value: 1 },
            rects: [{ kind: 'band', at: (s) => { const d = sd(at(s)); return [[50 - d, 1, 2 * d, 1]]; } }],
            segs: [{ kind: 'guide', at: () => [50, 0, 50, 1] }],
            dots: BASE.map((_, i) => ({ kind: 'ok', at: (s) => [at(s)[i], LIFT[i]] })),
            read: (s) => `mean $= 50$, standard deviation $\\sigma \\approx ${fmt(sd(at(s)))}$`,
            need: 4,
            action: 'Squeeze and stretch the data',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'The whole recipe on $4, 7, 9, 10, 15$',
          body: '**1 · Mean:** $\\bar x = \\frac{45}{5} = 9$.\n**2 · Deviations** $x - \\bar x$: $-5, -2, 0, 1, 6$ (they add to $0$, as always).\n**3 · Square them:** $25, 4, 0, 1, 36$; total $\\sum(x - \\bar x)^2 = 66$.\n**4 · Average them.** For a **sample**, divide by $n - 1$: $s^2 = \\frac{66}{4} = 16.5$.\n**5 · Square root:** $s = \\sqrt{16.5} \\approx 4.06$.\n\nFor a whole **population**, divide by $N$ instead: $\\sigma^2 = \\frac{\\sum(x - \\mu)^2}{N}$.',
          asides: [{ label: 'Note', text: 'Why $n - 1$ for a sample? A sample’s mean sits in the middle of its own data, so its squares come out a little too small. Dividing by $n - 1$ makes up for it. You will see this happen in the Estimation chapter.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the sample variance $s^2$ of $2, 4, 6$.',
          options: [
            { text: '$4$', correct: true, why: '$\\bar x = 4$, deviations $-2, 0, 2$, squares add to $8$, and $\\frac{8}{3 - 1} = 4$.' },
            { text: '$\\frac83$', why: 'That divides by $n = 3$: the population formula. For a sample use $n - 1 = 2$.' },
            { text: '$0$', why: 'The deviations add to $0$; their **squares** do not.' },
            { text: '$2$', why: 'That is the standard deviation, $\\sqrt4$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Grouped data',
          title: 'When data come in a frequency table',
          body: 'Use each class **mid-point** $x$ with its frequency $f$ (how many students are in that class):\n$$\\bar x = \\frac{\\sum fx}{\\sum f}, \\qquad s^2 = \\frac{\\sum f(x - \\bar x)^2}{n - 1}.$$\nIt is the same recipe: every student in a class is treated as sitting at the mid-point.',
        },
        { type: 'finish', title: 'Averages and spread: done.', body: 'Key terms, ready for revision:' },
      ],
    },
  ],
};
