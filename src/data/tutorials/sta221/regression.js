// STA 221 · Correlation and Regression · Lesson 2: the model y = α + βx + ε, least squares, the
// normal equations, β and α, the shared numerator with r, prediction, interpolation and extrapolation.
import { fmt } from './stat';

const X = [2, 3, 5, 6, 8, 9, 10, 13];
const Y = [40, 48, 55, 58, 66, 72, 75, 86];
const BEST = 3128 / 768;
const line = (b) => (x) => 62.5 + b * (x - 7);
const Q = (b) => X.reduce((s, x, i) => s + (Y[i] - line(b)(x)) ** 2, 0);

export default {
  id: 'regression',
  title: 'The regression line',
  covers: 'The model y = α + βx + ε, the method of least squares, the normal equations, β = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²), α = ȳ − βx̄, the line through (x̄, ȳ), interpreting β, prediction, interpolation and extrapolation, regression of x on y',
  minutes: 18,
  sections: [
    {
      name: 'Least squares',
      terms: [
        ['Model', '$y_i = \\alpha + \\beta x_i + \\varepsilon_i$: $\\alpha$ the intercept, $\\beta$ the slope (change in $y$ per unit of $x$), $\\varepsilon$ the random error.'],
        ['Least squares', 'Choose $\\alpha, \\beta$ to minimise $Q = \\sum(y_i - \\alpha - \\beta x_i)^2$.'],
        ['Normal equations', '$\\sum y = n\\alpha + \\beta\\sum x$ and $\\sum xy = \\alpha\\sum x + \\beta\\sum x^2$.'],
        ['Slope and intercept', '$\\beta = \\dfrac{n\\sum xy - \\sum x\\sum y}{n\\sum x^2 - (\\sum x)^2}$, $\\ \\alpha = \\bar y - \\beta\\bar x$.'],
        ['Through the means', 'The line always passes through $(\\bar x, \\bar y)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Correlation and Regression · Lesson 2',
          title: 'From "how closely?" to "by how much?"',
          body: 'Correlation says how closely two variables follow a line. ==Regression== finds that line, $\\hat y = \\alpha + \\beta x$, so we can **predict** $y$ from $x$.\n\nThe model: $y_i = \\alpha + \\beta x_i + \\varepsilon_i$. The ==least squares== line makes the total squared error\n$$Q = \\sum(y_i - \\alpha - \\beta x_i)^2$$\nas small as possible.',
          cta: 'Fit it yourself',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Turn the line to make the squared errors smallest',
          body: 'Hours studied ($x$) and exam score ($y$) for $8$ students. The line pivots about $(\\bar x, \\bar y) = (7, 62.5)$; the dashed lines are the errors. Find the slope that makes $Q$ smallest.',
          graph: {
            x: [0, 15], y: [30, 95], xs: [[0], [5], [10], [15]], ys: [[40], [60], [80]],
            param: { label: 'slope $\\beta$', min: 2, max: 6, step: 0.05, value: 2.5 },
            curves: [{ kind: 'main', f: (x, b) => line(b)(x) }],
            segs: X.map((x, i) => ({ kind: 'guide', at: (b) => [x, Y[i], x, line(b)(x)] })),
            dots: X.map((x, i) => ({ kind: 'ok', at: () => [x, Y[i]] })),
            goal: (b) => Math.abs(b - BEST) < 0.06,
            ok: (b) => Math.abs(b - BEST) < 0.06,
            read: (b) => `$\\beta = ${fmt(b, 2)}$: $Q = \\sum(\\text{error})^2 = ${fmt(Q(b), 1)}$${Math.abs(b - BEST) < 0.06 ? ' — **the least squares line**' : ''}`,
            need: 3,
            action: 'Make Q as small as you can',
          },
        },
        {
          type: 'story',
          eyebrow: 'Derivation',
          title: 'The normal equations',
          body: 'At the minimum both partial derivatives are $0$:\n$$\\frac{\\partial Q}{\\partial\\alpha} = -2\\sum(y_i - \\alpha - \\beta x_i) = 0 \\Rightarrow \\sum y = n\\alpha + \\beta\\sum x \\quad (1)$$\n$$\\frac{\\partial Q}{\\partial\\beta} = -2\\sum x_i(y_i - \\alpha - \\beta x_i) = 0 \\Rightarrow \\sum xy = \\alpha\\sum x + \\beta\\sum x^2 \\quad (2)$$\nDividing (1) by $n$: $\\alpha = \\bar y - \\beta\\bar x$, so the line passes through $(\\bar x, \\bar y)$. Substituting into (2) and multiplying by $n$:\n$$\\beta = \\frac{n\\sum xy - \\sum x\\sum y}{n\\sum x^2 - (\\sum x)^2}.$$',
          asides: [{ label: 'Exam tip', text: 'Deriving the normal equations is a classic long question: differentiate $Q$ with respect to $\\alpha$, then $\\beta$, set each to zero, solve.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Why do $\\beta$ and $r$ always have the same sign?',
          options: [
            { text: 'They share the numerator $n\\sum xy - \\sum x\\sum y$, and both denominators are positive', correct: true, why: 'Compute that numerator once and use it for both.' },
            { text: 'Because $\\beta = r$', why: 'They are different numbers with the same sign.' },
            { text: 'Because the line passes through $(\\bar x, \\bar y)$', why: 'True, but that is not why the signs agree.' },
            { text: 'They don’t always', why: 'They always do: same numerator, positive denominators.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Least squares: set.',
          recap: ['Minimise the sum of squared errors.', 'Normal equations → $\\beta$, then $\\alpha = \\bar y - \\beta\\bar x$.'],
          why: 'Now use the line, and know when not to trust it.',
        },
      ],
    },
    {
      name: 'Fitting and predicting',
      terms: [
        ['Recipe', 'Columns $x, y, xy, x^2, y^2$ → shared numerator → $\\beta$ → $\\alpha$ → $r$ → line → interpret → predict.'],
        ['Interpolation', 'Predicting inside the range of the data: trustworthy.'],
        ['Extrapolation', 'Predicting outside the range: assumes the line carries on, and it may not.'],
        ['x on y', '$\\beta_{xy} = \\dfrac{n\\sum xy - \\sum x\\sum y}{n\\sum y^2 - (\\sum y)^2}$; and $r^2 = \\beta_{yx}\\beta_{xy}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Hours $x$: $2, 3, 5, 6, 8, 9, 10, 13$; score $y$: $40, 48, 55, 58, 66, 72, 75, 86$',
          body: '$n = 8$, $\\sum x = 56$, $\\sum y = 500$, $\\sum xy = 3891$, $\\sum x^2 = 488$, $\\sum y^2 = 32854$.\n\nNumerator $= 8(3891) - 56(500) = 3128$; $8(488) - 56^2 = 768$; $8(32854) - 500^2 = 12832$.\n\n**(a)** $r = \\frac{3128}{\\sqrt{768 \\times 12832}} = 0.996$: very strong positive; $r^2 = 0.993$.\n**(b)** $\\beta = \\frac{3128}{768} = 4.073$, $\\alpha = 62.5 - 4.073(7) = 33.99$: $\\hat y = 33.99 + 4.073x$. Each extra hour goes with about $4.07$ more marks.\n**(c)** $x = 7$: $\\hat y = 62.5$. $x = 20$: $\\hat y = 115.4$, impossible for a score out of $100$! The data only cover $2$–$13$ hours: that is **extrapolation**.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'With $\\hat y = 8.857 + 3.190x$ fitted for $x$ from $2$ to $10$, which prediction is more reliable?',
          options: [
            { text: 'At $x = 6$ ($\\hat y = 28.0$): it is inside the data range', correct: true, why: 'Interpolation. At $x = 20$ ($72.7$) we extrapolate far outside the data.' },
            { text: 'At $x = 20$: bigger $x$ gives a better fit', why: 'Outside the data we cannot know whether the line continues.' },
            { text: 'Both are equally reliable', why: 'Only predictions inside the observed range are trustworthy.' },
            { text: 'Neither, since $r < 1$', why: '$r \\approx 0.999$ here: interpolation is reliable.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'From sums only',
          prompt: '$n = 10$, $\\sum x = 120$, $\\sum y = 480$, $\\sum xy = 6080$, $\\sum x^2 = 1560$. The regression line of $y$ on $x$ is',
          options: [
            { text: '$\\hat y = 16 + 2.667x$', correct: true, why: '$\\beta = \\frac{60800 - 57600}{15600 - 14400} = \\frac{3200}{1200}$; $\\alpha = 48 - 2.667(12) = 16$.' },
            { text: '$\\hat y = 48 + 2.667x$', why: '$\\alpha = \\bar y - \\beta\\bar x$, not $\\bar y$.' },
            { text: '$\\hat y = 16 + 0.375x$', why: 'That flips the fraction for $\\beta$.' },
            { text: '$\\hat y = 2.667 + 16x$', why: 'The intercept and slope are swapped.' },
          ],
        },
        {
          type: 'finish',
          title: 'The regression line: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
