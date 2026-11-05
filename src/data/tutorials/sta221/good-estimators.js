// STA 221 · Estimation · Lesson 3: point and interval estimation, unbiasedness (x̄, and s² with
// n − 1), consistency, efficiency and relative efficiency, the MVUE and the Cramér–Rao bound.
import { gauss, rng } from './stat';

const DARTS = (() => { const r = rng(88); return Array.from({ length: 18 }, () => [gauss(r), gauss(r)]); })();
const KINDS = [
  { b: [0, 0], s: 0.35, say: '**Unbiased and efficient:** centred on the bullseye and tightly grouped. The best estimator.' },
  { b: [0, 0], s: 1.1, say: '**Unbiased but not efficient:** right on average, but widely scattered (large variance).' },
  { b: [1.5, 0.9], s: 0.35, say: '**Biased:** tightly grouped but centred in the wrong place. $E(\\hat\\theta) \\ne \\theta$.' },
  { b: [1.5, 0.9], s: 1.1, say: '**Biased and inefficient:** off-centre **and** scattered. The worst of both.' },
];
const ring = (rad) => (t) => [rad * Math.cos(t), rad * Math.sin(t), 0];

export default {
  id: 'good-estimators',
  title: 'What makes a good estimator',
  covers: 'Point and interval estimation, estimator as a random variable, unbiasedness and bias, x̄ unbiased, S² biased and s² with n − 1 unbiased, asymptotic unbiasedness and consistency, efficiency and relative efficiency, MVUE, the Cramér–Rao lower bound',
  minutes: 17,
  sections: [
    {
      name: 'Unbiased and efficient',
      terms: [
        ['Point estimate', 'One number, e.g. $\\bar x = 25$. **Interval estimate**: a range, e.g. $25 \\pm 2$.'],
        ['Unbiased', '$E(\\hat\\theta) = \\theta$. The bias is $B(\\hat\\theta) = E(\\hat\\theta) - \\theta$.'],
        ['Efficient', 'Of two unbiased estimators, the one with the **smaller variance**.'],
        ['Relative efficiency', '$\\text{RE}(\\hat\\theta_1, \\hat\\theta_2) = \\dfrac{\\text{Var}(\\hat\\theta_2)}{\\text{Var}(\\hat\\theta_1)}$; above $1$ means $\\hat\\theta_1$ is better.'],
        ['Consistent', '$\\hat\\theta_n$ gets arbitrarily close to $\\theta$ as $n \\to \\infty$ (e.g. unbiased with variance $\\to 0$).'],
        ['Rules', '$E(aX + bY) = aE(X) + bE(Y)$; $\\text{Var}(aX + bY) = a^2\\text{Var}(X) + b^2\\text{Var}(Y)$ for independent $X, Y$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Estimation · Lesson 3',
          title: 'Estimator = recipe, estimate = cake',
          body: '==Estimation== uses a statistic from a sample to estimate a population parameter. A rule such as $\\hat\\theta = \\frac1n(X_1 + \\cdots + X_n) = \\bar X$ is an **estimator**; since it depends on a random sample, it is itself a random variable. The number it gives for one sample, say $25$, is the **estimate**.\n\nSome rules are better than others. A good estimator is **unbiased**, **efficient** and **consistent**.',
          cta: 'Throw some darts',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'The dartboard',
          body: 'The bullseye is the parameter $\\theta$; each dart is the estimate from one sample.',
          graph: {
            R: 3.6, bare: true,
            views: ['Unbiased, tight', 'Unbiased, wide', 'Biased, tight', 'Biased, wide'],
            draw: (P, v) => {
              const { b, s } = KINDS[v];
              return [
                { curve: ring(3), from: 0, to: 2 * Math.PI, kind: 's' },
                { curve: ring(2), from: 0, to: 2 * Math.PI, kind: 's' },
                { curve: ring(1), from: 0, to: 2 * Math.PI, kind: 's' },
                { pt: [0, 0, 0], kind: 'c', label: 'θ' },
                ...DARTS.map(([x, y]) => ({ pt: [b[0] + s * x, b[1] + s * y, 0], kind: 'd' })),
              ];
            },
            read: (P, v) => KINDS[v].say,
            need: 4,
            action: 'Look at all four',
          },
          asides: [{ label: 'Memory trick', text: '**Unbiased** = centred on the bullseye. **Efficient** = tightly grouped. **Consistent** = more darts (bigger $n$) close in on the bullseye.' }],
        },
        {
          type: 'story',
          eyebrow: 'Proof',
          title: 'Show that $\\bar X$ is unbiased for $\\mu$',
          body: '$$E(\\bar X) = E\\left(\\frac1n\\sum_{i=1}^n X_i\\right) = \\frac1n\\sum_{i=1}^n E(X_i) = \\frac1n(n\\mu) = \\mu. \\ \\blacksquare$$\nThe proof only uses $E(X_i) = \\mu$, so $\\bar X$ is unbiased for **any** population.',
          asides: [{ label: 'Exam tip', text: 'Show every step: expand, use linearity, substitute $E(X_i) = \\mu$. The last line "$= \\mu$, hence unbiased" carries the mark.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$X_1, X_2, X_3$ have mean $\\mu$, variance $\\sigma^2$. Compare $T_1 = \\frac{X_1 + X_2}{2}$ and $T_4 = \\frac{X_1 + X_2 + X_3}{3}$.',
          body: '**Unbiased?** The weights add to $1$ in both, so $E(T_1) = E(T_4) = \\mu$.\n\n**Variances:** $\\sigma^2 \\times$ (sum of squared weights):\n$$\\text{Var}(T_1) = \\tfrac{2}{4}\\sigma^2 = \\tfrac{\\sigma^2}{2}, \\qquad \\text{Var}(T_4) = \\tfrac{3}{9}\\sigma^2 = \\tfrac{\\sigma^2}{3}.$$\n**RE**$(T_4, T_1) = \\frac{\\sigma^2/2}{\\sigma^2/3} = 1.5$: $T_4$ is more efficient. Using all the data pays.',
          asides: [{ label: 'Tip', text: 'For weighted estimators: unbiased ⇔ the weights add to $1$; variance $= \\sigma^2 \\times$ (sum of the squared weights).' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Is $T_3 = \\frac{X_1 + X_2 + X_3}{2}$ unbiased for $\\mu$?',
          options: [
            { text: 'No: $E(T_3) = \\frac{3\\mu}{2}$, bias $\\frac\\mu2$', correct: true, why: 'The weights $\\frac12, \\frac12, \\frac12$ add to $\\frac32$, not $1$.' },
            { text: 'Yes: it uses all three observations', why: 'Using all the data is not enough; the weights must add to $1$.' },
            { text: 'No: $E(T_3) = \\frac\\mu2$', why: '$E(T_3) = \\frac{\\mu + \\mu + \\mu}{2} = \\frac{3\\mu}{2}$.' },
            { text: 'Yes, its bias is $0$', why: 'Bias $= E(T_3) - \\mu = \\frac\\mu2$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For a normal sample, $\\text{Var(median)} \\approx 1.57\\frac{\\sigma^2}{n}$. The relative efficiency of the mean with respect to the median is',
          options: [
            { text: '$1.57$: the mean is more efficient', correct: true, why: '$\\frac{\\text{Var(median)}}{\\text{Var}(\\bar X)} = \\frac{1.57\\sigma^2/n}{\\sigma^2/n}$. The median needs about $57\\%$ more data.' },
            { text: '$0.64$: the median is more efficient', why: 'You flipped the ratio: RE$(\\hat\\theta_1, \\hat\\theta_2) = \\frac{\\text{Var}(\\hat\\theta_2)}{\\text{Var}(\\hat\\theta_1)}$.' },
            { text: '$1$: they are equally good', why: 'Their variances differ.' },
            { text: '$\\frac{\\sigma^2}{n}$', why: 'A relative efficiency is a pure number.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Unbiased and efficient: set.',
          recap: ['Unbiased: $E(\\hat\\theta) = \\theta$.', 'More efficient: smaller variance.', 'RE = other’s variance over this one’s.'],
          why: 'Now the classic proof: why the sample variance divides by $n - 1$.',
        },
      ],
    },
    {
      name: 'Why n − 1, and the best possible',
      terms: [
        ['Biased variance', '$S^2 = \\frac1n\\sum(X_i - \\bar X)^2$ has $E(S^2) = \\frac{n-1}{n}\\sigma^2$: biased, underestimates.'],
        ['Unbiased variance', '$s^2 = \\dfrac{1}{n - 1}\\sum(X_i - \\bar X)^2$ has $E(s^2) = \\sigma^2$.'],
        ['Asymptotically unbiased', '$\\lim_{n \\to \\infty}E(\\hat\\theta_n) = \\theta$, e.g. $S^2$.'],
        ['MVUE', 'The unbiased estimator with the smallest variance of all, for every value of $\\theta$.'],
        ['Cramér–Rao bound', '$\\text{Var}(\\hat\\theta) \\ge \\dfrac{1}{nI(\\theta)}$, $I(\\theta) = -E\\left[\\dfrac{\\partial^2}{\\partial\\theta^2}\\ln f(X; \\theta)\\right]$. An unbiased estimator that reaches it is the MVUE.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Proof',
          title: 'Dividing by $n$ underestimates $\\sigma^2$',
          body: 'Write $X_i - \\bar X = (X_i - \\mu) - (\\bar X - \\mu)$. Squaring and adding (using $\\sum(X_i - \\mu) = n(\\bar X - \\mu)$):\n$$\\sum(X_i - \\bar X)^2 = \\sum(X_i - \\mu)^2 - n(\\bar X - \\mu)^2.$$\nTake expectations, with $E(X_i - \\mu)^2 = \\sigma^2$ and $E(\\bar X - \\mu)^2 = \\frac{\\sigma^2}{n}$:\n$$E\\left[\\sum(X_i - \\bar X)^2\\right] = n\\sigma^2 - n\\cdot\\frac{\\sigma^2}{n} = (n - 1)\\sigma^2.$$\nSo dividing by $n$ gives $\\frac{n-1}{n}\\sigma^2$ (biased); dividing by $n - 1$ gives exactly $\\sigma^2$. $\\blacksquare$',
          asides: [{ label: 'Note', text: 'Why it happens: $\\bar x$ sits in the middle of the data, so the data always look a little closer to $\\bar x$ than to the true $\\mu$. Dividing by $n - 1$ makes up for that.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For the sample $4, 7, 9, 10, 15$ (with $\\sum(x - \\bar x)^2 = 66$), the unbiased estimate of $\\sigma^2$ is',
          options: [
            { text: '$16.5$', correct: true, why: '$\\frac{66}{5 - 1} = 16.5$.' },
            { text: '$13.2$', why: 'That divides by $n = 5$: biased.' },
            { text: '$66$', why: 'Divide the sum of squares by $n - 1$.' },
            { text: '$4.06$', why: 'That is $s$, the square root.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The best possible',
          title: 'The Cramér–Rao lower bound',
          body: 'No unbiased estimator can have a variance below\n$$\\frac{1}{nI(\\theta)}, \\qquad I(\\theta) = -E\\left[\\frac{\\partial^2}{\\partial\\theta^2}\\ln f(X; \\theta)\\right].$$\n**Example (normal mean, $\\sigma^2$ known).** $\\ln f = -\\frac12\\ln(2\\pi\\sigma^2) - \\frac{(x - \\mu)^2}{2\\sigma^2}$, so $\\frac{\\partial^2}{\\partial\\mu^2}\\ln f = -\\frac{1}{\\sigma^2}$ and $I(\\mu) = \\frac{1}{\\sigma^2}$. The bound is $\\frac{\\sigma^2}{n}$, which is exactly $\\text{Var}(\\bar X)$: $\\bar X$ is the **MVUE** of $\\mu$.',
          asides: [{ label: 'Note', text: 'The bound needs regularity conditions: $\\frac{\\partial}{\\partial\\theta}\\ln f$ exists, and differentiation and integration can be swapped (this fails when the range of $x$ depends on $\\theta$).' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For a Poisson sample, $I(\\lambda) = \\frac1\\lambda$. The Cramér–Rao bound for unbiased estimators of $\\lambda$ is',
          options: [
            { text: '$\\frac\\lambda n$', correct: true, why: '$\\frac{1}{nI(\\lambda)} = \\frac{\\lambda}{n}$, which $\\text{Var}(\\bar X)$ reaches: $\\bar X$ is the MVUE.' },
            { text: '$\\frac{1}{n\\lambda}$', why: 'Invert $nI(\\lambda) = \\frac n\\lambda$.' },
            { text: '$\\lambda$', why: 'The bound shrinks with $n$.' },
            { text: '$\\frac{\\lambda^2}{n}$', why: '$I(\\lambda) = \\frac1\\lambda$, so the bound is $\\frac\\lambda n$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Good estimators: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
