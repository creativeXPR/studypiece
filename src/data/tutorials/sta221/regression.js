// STA 221 · Correlation and Regression · Lesson 2: the model y = α + βx + ε, least squares, the
// normal equations, β and α, the shared numerator with r, prediction, interpolation and extrapolation.
import { HOURS, SCORES } from './campus';
import { fmt, mean } from './stat';

// Ten students with study hours spread from 2 to 20.
const TEN = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((h) => HOURS.findIndex((x, i) => x === h && i > h * 7));
const TX = TEN.map((i) => HOURS[i]);
const TY = TEN.map((i) => SCORES[i]);
const MX = mean(TX);
const MY = mean(TY);
const B_BEST = TX.reduce((s, x, k) => s + (x - MX) * (TY[k] - MY), 0) / TX.reduce((s, x) => s + (x - MX) ** 2, 0);
const A_BEST = MY - B_BEST * MX;
const RX = (h) => 34 + h * 13;
const RY = (s) => 244 - (s - 25) * 2.9;
const SLOPES = [0, 0, 0, 0, 0.9, B_BEST, B_BEST, B_BEST];
const lineAt = (b, h) => MY + b * (h - MX);
const Qof = (b) => TX.reduce((s, x, k) => s + (TY[k] - lineAt(b, x)) ** 2, 0);
const fit = {
  aria: 'Ten students on a scatter; a line through the mean point tilts until the squares of the vertical errors have the smallest total area',
  steps: [
    { say: 'Ten of our students: hours across, exam score up. We want one straight line to **predict** score from hours.' },
    { say: 'Start with a line through the **middle of the data**, the point $(\\bar x, \\bar y)$, lying flat for now.' },
    { say: 'Each student’s **error** (residual) is the vertical gap between their dot and the line: how far off the line’s prediction is.' },
    { say: `Square each error and draw it as a real **square**. The total area is $Q = \\sum(\\text{error})^2 \\approx ${fmt(Qof(0), 0)}$. The best line is the one that makes this area **smallest**: the method of **least squares**.` },
    { say: `Tilt the line up a little: the squares shrink. $Q \\approx ${fmt(Qof(0.9), 0)}$.` },
    { say: `Keep tilting to the best slope: $Q \\approx ${fmt(Qof(B_BEST), 0)}$, the smallest possible. Tilt any further and the squares grow again.` },
    { say: `This **least squares line** is $\\hat y = \\alpha + \\beta x$ with slope $\\beta \\approx ${fmt(B_BEST, 2)}$ (each extra hour ≈ $${fmt(B_BEST, 1)}$ more marks) and intercept $\\alpha = \\bar y - \\beta\\bar x \\approx ${fmt(A_BEST, 1)}$. It always passes through $(\\bar x, \\bar y)$.` },
    { say: `Predict inside the data (**interpolation**): at $10$ hours, $\\hat y \\approx ${fmt(A_BEST + 10 * B_BEST, 0)}$. Far outside it (**extrapolation**), say $40$ hours, the line would promise $${fmt(A_BEST + 40 * B_BEST, 0)}$ marks: impossible. Only trust the line where you have data.` },
  ],
  draw: (step) => {
    const b = SLOPES[step];
    const shapes = Array.from({ length: 41 }, (_, k) => {
      const h = (k / 40) * 22;
      return { id: `l${k}`, dot: [RX(h), RY(lineAt(b, h))], r: 1.3, kind: 'a', o: step >= 1 ? 1 : 0 };
    });
    TX.forEach((x, k) => {
      const yp = RY(TY[k]);
      const yl = RY(lineAt(b, x));
      const gap = Math.abs(yp - yl);
      const side = Math.min(gap, 60);
      shapes.push({ id: `sq${k}`, bar: [RX(x) + side > 334 ? RX(x) - side : RX(x), Math.max(yp, yl)], w: side, h: step >= 3 && step <= 5 ? side : 0, kind: 'c', o: step >= 3 && step <= 5 ? 1 : 0 });
      shapes.push({ id: `res${k}`, bar: [RX(x) - 0.8, Math.max(yp, yl)], w: 1.6, h: step >= 2 && step <= 5 ? gap : 0, kind: 'd', o: step >= 2 && step <= 5 ? 1 : 0 });
      shapes.push({ id: `p${k}`, dot: [RX(x), yp], r: 4.5, kind: 'e' });
    });
    shapes.push({ id: 'mp', dot: [RX(MX), RY(MY)], r: 5, kind: 'd', o: step >= 1 && step <= 2 ? 1 : 0 });
    shapes.push({ id: 'xax', line: [28, 244, 330, 244], kind: 's' });
    [0, 5, 10, 15, 20].forEach((h) => shapes.push({ id: `xt${h}`, text: [RX(h), 256], label: String(h), kind: 's', size: 10 }));
    shapes.push({ id: 'Q', text: [320, 30], label: step >= 3 && step <= 5 ? `Q ≈ ${fmt(Qof(b), 0)}` : '', kind: 'c', size: 13, anchor: 'end' });
    shapes.push({ id: 'eq', text: [320, 30], label: step >= 6 ? `ŷ = ${fmt(A_BEST, 1)} + ${fmt(B_BEST, 2)}x` : '', kind: 'a', size: 13, anchor: 'end' });
    return shapes;
  },
};

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
        { type: 'custom', widget: 'scene', eyebrow: 'Correlation and Regression · Lesson 2', title: 'The line with the smallest squares', graph: fit },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
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
