// STA 221 · Correlation and Regression · Lesson 1: association, scatter diagrams, Yule's Q,
// correlation is not causation, Pearson's r and its properties, r², Spearman's rank correlation.
import { fmt, gauss, mean, rng } from './stat';

const PTS = (() => { const r = rng(4242); return Array.from({ length: 24 }, () => [gauss(r), gauss(r)]); })();
const XS = PTS.map(([x]) => Math.max(-2.4, Math.min(2.4, x)));
function ys(rho, v) {
  if (v === 1) return XS.map((x, i) => 0.9 * (x * x - 1.2) + 0.15 * PTS[i][1]);
  return XS.map((x, i) => rho * x + Math.sqrt(1 - rho * rho) * PTS[i][1]);
}
function pearson(y) {
  const mx = mean(XS);
  const my = mean(y);
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  XS.forEach((x, i) => { sxy += (x - mx) * (y[i] - my); sxx += (x - mx) ** 2; syy += (y[i] - my) ** 2; });
  return sxy / Math.sqrt(sxx * syy);
}
const words = (r) => {
  const a = Math.abs(r);
  const s = a < 0.2 ? 'very weak' : a < 0.4 ? 'weak' : a < 0.6 ? 'moderate' : a < 0.8 ? 'strong' : 'very strong';
  return `${s} ${r >= 0 ? 'positive' : 'negative'}`;
};

export default {
  id: 'correlation',
  title: 'Association and correlation',
  covers: 'Association, scatter diagrams, Yule’s coefficient of association Q, correlation versus causation, Pearson’s r formula and properties, describing r, the coefficient of determination r², Spearman’s rank correlation with ties',
  minutes: 16,
  sections: [
    {
      name: 'Association and r',
      terms: [
        ['Association', 'Knowing one variable tells you something about the other. Measured variables: scatter diagram. Attributes: contingency table.'],
        ['Yule’s Q', 'For a $2 \\times 2$ table: $Q = \\dfrac{ad - bc}{ad + bc}$, from $-1$ to $1$; $0$ means independent.'],
        ['Pearson’s r', '$r = \\dfrac{n\\sum xy - \\sum x\\sum y}{\\sqrt{[n\\sum x^2 - (\\sum x)^2][n\\sum y^2 - (\\sum y)^2]}}$.'],
        ['Properties of r', '$-1 \\le r \\le 1$; no units; $r_{xy} = r_{yx}$; unchanged by change of origin or (positive) scale; $r = 0$ means no **linear** relationship.'],
        ['r²', 'The coefficient of determination: the fraction of the variation in $y$ explained by the line.'],
        ['Not causation', 'A strong correlation only says two things move together; a third variable or coincidence may be responsible.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Correlation and Regression · Lesson 1',
          title: 'Do two things go together?',
          body: 'Two variables are ==associated== if knowing one tells you something about the other.\n\nFor two **measurements** (hours studied, exam score), draw a scatter diagram: points rising to the right show positive association, falling to the right negative, a shapeless cloud none.\n\n==Correlation== $r$ puts a number on how closely the points follow a **straight line**, from $-1$ to $+1$.',
          cta: 'Change the correlation',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'What different values of $r$ look like',
          body: 'Slide the strength of the relationship. Then look at the curve: a strong relationship can still have $r$ near $0$, because $r$ only measures **straight-line** relationships.',
          graph: {
            x: [-2.8, 2.8], y: [-3.2, 3.2], xs: [], ys: [],
            param: { label: 'strength', min: -1, max: 1, step: 0.1, value: 0.7 },
            views: ['Straight-line pattern', 'Curved pattern'],
            dots: XS.map((x, i) => ({ kind: 'ok', at: (rho, v) => [x, ys(rho, v)[i]] })),
            read: (rho, v) => {
              const r = pearson(ys(rho, v));
              return v === 1 ? `$r \\approx ${fmt(r, 2)}$: almost no **linear** relationship, yet $y$ clearly depends on $x$.` : `$r \\approx ${fmt(r, 2)}$: ${words(r)}`;
            },
            need: 5,
            action: 'Try strong, weak and negative values',
          },
        },
        {
          type: 'story',
          eyebrow: 'Describing r',
          title: 'Give the direction and the strength',
          body: '$|r|$: $0$–$0.19$ very weak; $0.20$–$0.39$ weak; $0.40$–$0.59$ moderate; $0.60$–$0.79$ strong; $0.80$–$1$ very strong. The sign gives the direction.\n\n**$r^2$**, the coefficient of determination: if $r = 0.9$, then $r^2 = 0.81$, so $81\\%$ of the variation in $y$ is explained by $x$.\n\n**Correlation is not causation.** Ice-cream sales and drownings rise together, but ice cream doesn’t cause drowning: hot weather drives both.',
          asides: [{ label: 'Exam tip', text: '"Comment on the relationship" needs direction **and** strength. Don’t stop at the number.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Describe $r = -0.85$.',
          options: [
            { text: 'A very strong negative linear relationship', correct: true, why: '$|r| \\ge 0.8$ and negative: $y$ falls as $x$ rises.' },
            { text: 'A weak relationship, because it is negative', why: 'The sign is the direction; $|r|$ gives the strength.' },
            { text: '$85\\%$ of $y$ is caused by $x$', why: 'Correlation is not causation, and $r^2 = 0.72$ is the explained fraction.' },
            { text: 'No relationship', why: 'That would be $r$ near $0$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Attributes',
          title: 'Yule’s Q for a $2 \\times 2$ table',
          body: 'Vaccinated: $a = 10$ infected, $b = 90$ not. Not vaccinated: $c = 25$, $d = 75$.\n$$Q = \\frac{ad - bc}{ad + bc} = \\frac{750 - 2250}{750 + 2250} = -0.5.$$\nA moderate negative association: being vaccinated goes with being infected less often. (The χ² test says whether an association **exists**; $Q$ says how **strong** it is.)',
        },
        {
          type: 'bridge',
          title: 'Correlation: set.',
          recap: ['$r$ measures straight-line closeness, from $-1$ to $1$.', 'State direction and strength; $r^2$ is the explained fraction.', 'Not causation.'],
          why: 'When the data are ranks, use Spearman’s coefficient.',
        },
      ],
    },
    {
      name: 'Pearson and Spearman by hand',
      terms: [
        ['Spearman’s rank correlation', '$r_s = 1 - \\dfrac{6\\sum d^2}{n(n^2 - 1)}$, with $d$ the difference between the two ranks.'],
        ['Ties', 'Give tied values the average of the ranks they occupy (two tied for 3rd and 4th each get $3.5$).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Advertising $x$: $2, 4, 5, 7, 8, 10$; sales $y$: $15, 22, 25, 31, 34, 41$ (₦’000). Find $r$.',
          body: 'Make columns $x, y, xy, x^2, y^2$ and add: $n = 6$, $\\sum x = 36$, $\\sum y = 168$, $\\sum xy = 1142$, $\\sum x^2 = 258$, $\\sum y^2 = 5132$.\n\nNumerator: $6(1142) - 36(168) = 804$.\nBrackets: $6(258) - 36^2 = 252$ and $6(5132) - 168^2 = 2568$.\n$$r = \\frac{804}{\\sqrt{252 \\times 2568}} = \\frac{804}{804.45} = 0.9994.$$\nAn almost perfect positive linear relationship.',
          asides: [{ label: 'Tip', text: 'Neither bracket can be negative, and $|r|$ can never exceed $1$. If either happens, a column total is wrong.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Two examiners rank $10$ essays',
          body: 'Examiner 1: $6, 4, 8, 3, 9, 1, 7, 2, 5, 10$.\nExaminer 2: $5, 6, 7, 2, 10, 1, 8, 3, 4, 9$.\n\n$d = 1, -2, 1, 1, -1, 0, -1, -1, 1, 1$, so $\\sum d^2 = 12$.\n$$r_s = 1 - \\frac{6(12)}{10(100 - 1)} = 1 - \\frac{72}{990} = 0.927.$$\nThe examiners agree very closely.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Yule’s Q for $a = 30$, $b = 20$, $c = 10$, $d = 40$ is',
          options: [
            { text: '$0.714$: a fairly strong positive association', correct: true, why: '$\\frac{1200 - 200}{1200 + 200} = \\frac{1000}{1400}$.' },
            { text: '$-0.714$', why: '$ad = 1200$ is bigger than $bc = 200$, so $Q$ is positive.' },
            { text: '$0.5$', why: '$Q = \\frac{ad - bc}{ad + bc}$.' },
            { text: '$1000$', why: 'Divide by $ad + bc$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Association and correlation: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
