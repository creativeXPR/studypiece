// STA 221 · Statistics from Zero · Lesson 1: data, the Σ sign, the mean, deviations, variance
// and standard deviation (dividing by N or by n − 1), and the mean of grouped data.
import { fmt, mean } from './stat';

const BASE = [44, 47, 49, 50, 50, 51, 53, 56];
const LIFT = [0.3, 0.3, 0.3, 0.3, 0.6, 0.3, 0.3, 0.3];
const at = (s) => BASE.map((x) => 50 + s * (x - 50));
const sd = (xs) => Math.sqrt(xs.reduce((t, x) => t + (x - mean(xs)) ** 2, 0) / xs.length);

export default {
  id: 'mean-and-spread',
  title: 'Averages and spread',
  covers: 'Data and the Σ sign, the mean, deviations, the variance and standard deviation, dividing by N or n − 1, the mean and variance of grouped data',
  minutes: 12,
  sections: [
    {
      name: 'Centre and spread',
      terms: [
        ['Σ (sigma)', '"Add them all up": $\\sum x = x_1 + x_2 + \\cdots + x_n$.'],
        ['Mean', '$\\bar x = \\dfrac{\\sum x}{n}$: the balance point of the data.'],
        ['Deviation', '$x - \\bar x$: how far one value is from the mean. Deviations always add to $0$.'],
        ['Variance', 'The average squared deviation. Population: $\\sigma^2 = \\dfrac{\\sum(x - \\mu)^2}{N}$. Sample: $s^2 = \\dfrac{\\sum(x - \\bar x)^2}{n - 1}$.'],
        ['Standard deviation', 'The square root of the variance, in the same units as the data.'],
      ],
      screens: [
        {
          type: 'choice',
          poll: 'twoClasses',
          eyebrow: 'Statistics from Zero · Lesson 1',
          prompt: 'Two classes both average $50$ in a test. Class A scored $49$, $50$, $51$. Class B scored $20$, $50$, $80$. Are the classes the same?',
          options: [
            { text: 'Yes: same average' },
            { text: 'No: B is far more spread out' },
            { text: 'Can’t tell without more data' },
          ],
          pollTitle: 'Same centre, different spread.',
          pollBody: 'The average alone hides how spread out the scores are. Statistics always needs **two** numbers: a centre (the mean) and a spread (the standard deviation).',
        },
        {
          type: 'story',
          eyebrow: 'The mean',
          title: 'Add up, divide by how many',
          body: 'The sign $\\sum$ (sigma) means "add them all up". For the data $4, 7, 9, 10, 15$:\n$$\\sum x = 45, \\qquad \\bar x = \\frac{\\sum x}{n} = \\frac{45}{5} = 9.$$\nThe ==mean== $\\bar x$ ("x-bar") is the balance point of the data.',
          cta: 'Now the spread',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'The standard deviation measures the spread',
          body: 'Eight scores, mean $50$. Spread them out and watch the shaded band (mean ± one standard deviation) grow. The mean stays put.',
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
          eyebrow: 'Variance step by step',
          title: 'Deviations, squared, averaged',
          body: 'Data $4, 7, 9, 10, 15$ with $\\bar x = 9$.\n\n**Step 1 · Deviations** $x - \\bar x$: $-5, -2, 0, 1, 6$ (they add to $0$, always).\n**Step 2 · Square them** so negatives don’t cancel: $25, 4, 0, 1, 36$; total $\\sum(x - \\bar x)^2 = 66$.\n**Step 3 · Average them.** For a sample, divide by $n - 1$:\n$$s^2 = \\frac{66}{4} = 16.5, \\qquad s = \\sqrt{16.5} \\approx 4.06.$$\nFor a whole population, divide by $N$ instead: $\\sigma^2 = \\frac{\\sum(x - \\mu)^2}{N}$.',
          asides: [{ label: 'Note', text: 'Why $n - 1$ for a sample? It makes $s^2$ right on average (unbiased). You will prove this in the Estimation chapter.' }],
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
          title: 'Use the class mid-points',
          body: 'When data come in a frequency table, use each class mid-point $x$ with its frequency $f$:\n$$\\bar x = \\frac{\\sum fx}{\\sum f}, \\qquad s^2 = \\frac{\\sum f(x - \\bar x)^2}{n - 1}.$$\n**Example.** Heights $150$–$154$, $155$–$159$, $\\dots$ have mid-points $152, 157, \\dots$ Multiply each by its frequency, add, divide by the total frequency.',
        },
        {
          type: 'finish',
          title: 'Averages and spread: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
