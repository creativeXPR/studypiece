// MTH 209 · Part A · Lesson 4: the standard series and building new ones from them. The binomial
// theorem (n a positive integer) and binomial series (any rational n, |x| < 1), the exponential
// series with e and e^−x, hyperbolic functions, and combining series (ln(1 + 5x + 4x²),
// (e⁶ − 1)/e³). Every number below was recomputed in Python (see docs/mth209-rebuild.md).
import { binomialScene } from './series-scenes';

export default {
  id: 'standard-series',
  title: 'The standard series, and building new ones',
  covers: 'The standard series with their ranges; the binomial theorem and binomial coefficients; the binomial series for any rational power and where it is valid; the exponential series, e and e^−x; sinh, cosh and tanh; combining known series to expand new functions and prove identities',
  minutes: 16,
  sections: [
    {
      name: 'Binomial',
      terms: [
        ['Binomial theorem', '$(x + y)^n = \\sum_{k=0}^{n}\\binom{n}{k}x^{n-k}y^k$ for a positive integer $n$, with $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$. It stops after $n + 1$ terms.'],
        ['Binomial series', '$(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots$ for any rational $n$; infinite, valid only for $|x| < 1$.'],
        ['$(a + x)^n$', 'Factor out first: $(a + x)^n = a^n\\left(1 + \\frac{x}{a}\\right)^n$, valid for $|x| < |a|$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part A · Lesson 4',
          title: "Don't differentiate every time",
          body: "Taylor's theorem can expand anything, but differentiating again and again is slow. A handful of series, known by heart with their ranges, build almost everything else:\n• $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$, every $x$\n• $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$, every $x$\n• $\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots$, every $x$\n• $\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$, $-1 < x \\le 1$\n• $\\tan^{-1}x = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots$, $|x| \\le 1$\n• $(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\cdots$, $|x| < 1$",
          cta: 'Start with binomial',
        },
        {
          type: 'story',
          eyebrow: 'Binomial theorem',
          title: 'When $n$ is a positive integer, it stops',
          body: '$$(x + y)^n = x^n + nx^{n-1}y + \\frac{n(n-1)}{2!}x^{n-2}y^2 + \\cdots + y^n = \\sum_{k=0}^{n}\\binom{n}{k}x^{n-k}y^k$$\nwith $\\binom{n}{r} = \\frac{n(n-1)\\cdots(n - r + 1)}{r!} = \\frac{n!}{r!(n-r)!}$ and $\\binom{n}{0} = 1$.\n\nPut $x = 1$, $y = x$: $(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\cdots + x^n$. For a positive integer $n$ the coefficients reach 0 after $x^n$, so the sum is **finite** and exact for every $x$.',
        },
        {
          type: 'choice',
          eyebrow: 'Quick check',
          prompt: 'What is the coefficient of $x^2$ in $(2 + x)^4$?',
          options: [
            { text: '$24$', correct: true, why: '$\\binom42 \\cdot 2^2 = 6 \\times 4 = 24$.' },
            { text: '$6$', why: 'That is $\\binom42$ alone; multiply by $2^{4-2} = 4$.' },
            { text: '$12$', why: '$\\binom42 = 6$, not 3.' },
            { text: '$32$', why: 'That is the coefficient of $x$: $\\binom41 \\cdot 2^3$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Binomial series',
          title: 'Any rational $n$: infinite, and only for $|x| < 1$',
          body: 'The same formula works for negative or fractional $n$, but the coefficients **never** reach 0, so the series is infinite:\n$$(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots,\\quad |x| < 1.$$\nWhy $|x| < 1$? Take $n = -1$: $(1 + x)^{-1} = 1 - x + x^2 - x^3 + \\cdots$, the geometric series, which converges only for $|x| < 1$.\n\nExample: $(1 + x)^{-2} = 1 - 2x + 3x^2 - 4x^3 + 5x^4 - \\cdots$',
        },
        binomialScene,
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Expand $(1 + 3x)^{3/2}$ in ascending powers of $x$ up to $x^3$. For what $x$ is it valid?',
          body: 'Put $n = \\frac32$ and write $3x$ in place of $x$.',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$: $\\frac32 \\cdot 3 = $', answer: 4.5, tol: 0.0001, hint: '$n \\times 3$.' },
              { ask: 'Coefficient of $x^2$: $\\frac{(\\frac32)(\\frac12)}{2!} \\cdot 9 = $', answer: 3.375, tol: 0.0001, hint: '$\\frac38 \\times 9 = \\frac{27}{8}$.' },
              { ask: 'Coefficient of $x^3$: $\\frac{(\\frac32)(\\frac12)(-\\frac12)}{3!} \\cdot 27 = $', answer: -1.6875, tol: 0.0001, hint: '$-\\frac{1}{16} \\times 27 = -\\frac{27}{16}$.' },
              { ask: 'Valid for $|x| < $ (4 d.p.)', answer: 0.3333, tol: 0.0001, hint: 'Need $|3x| < 1$.', done: '$1 + \\frac92x + \\frac{27}{8}x^2 - \\frac{27}{16}x^3 + \\cdots$, valid for $|x| < \\frac13$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Exponential and combining',
      terms: [
        ['$e$ and $e^{-x}$', '$e = 1 + 1 + \\frac{1}{2!} + \\frac{1}{3!} + \\cdots = 2.718\\ldots$; $e^{-x} = 1 - x + \\frac{x^2}{2!} - \\frac{x^3}{3!} + \\cdots$'],
        ['Hyperbolic functions', '$\\sinh x = \\frac{e^x - e^{-x}}{2} = x + \\frac{x^3}{3!} + \\cdots$, $\\cosh x = \\frac{e^x + e^{-x}}{2} = 1 + \\frac{x^2}{2!} + \\cdots$, $\\tanh x = \\frac{\\sinh x}{\\cosh x}$.'],
        ['Combining', 'Use algebra first (factorise, log rules, $e^ae^b = e^{a+b}$), then substitute known series.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Inside the range',
          title: 'Use $(1 + x)^{1/2} = 1 + \\frac12x - \\frac18x^2 + \\frac1{16}x^3 - \\cdots$ to estimate $\\sqrt{1.1}$.',
          body: 'Here $x = 0.1$, safely inside $|x| < 1$. For $\\sqrt{4.4}$, factor first: $2(1 + 0.1)^{1/2}$.',
          graph: {
            steps: [
              { ask: '$-\\frac18(0.01) = $ (5 d.p.)', answer: -0.00125, tol: 0.000001, hint: '$0.01 \\div 8$, negative.' },
              { ask: '$\\sqrt{1.1} \\approx 1 + 0.05 - 0.00125 + \\frac{0.001}{16} = $ (7 d.p.)', answer: 1.0488125, tol: 0.0000002, hint: '$\\frac{0.001}{16} = 0.0000625$.', done: 'True value $1.0488088$: four terms agree to 5 d.p.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Watch out',
          prompt: "Why can't $(1 + x)^{1/2}$ give $\\sqrt{4}$ by putting $x = 3$?",
          options: [
            { text: 'The terms grow instead of shrinking, because $|x| > 1$', correct: true, why: 'The terms run $1,\\ 1.5,\\ -1.125,\\ 1.6875,\\ -3.164, \\ldots$: they never settle.' },
            { text: 'You need more terms, but it gets there eventually', why: 'Outside $|x| < 1$ no number of terms works.' },
            { text: '$n = \\frac12$ is not allowed in the binomial series', why: 'Any rational $n$ is allowed; only $x$ is restricted.' },
          ],
          explain: 'Factor first: $\\sqrt{4.4} = 2(1 + 0.1)^{1/2}$ brings $x$ back inside the range.',
        },
        {
          type: 'story',
          eyebrow: 'Exponential series',
          title: '$e^x$, $e$, and the hyperbolic functions',
          body: '$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots,\\ \\text{every } x$$\n• $x = 1$: $e = 1 + 1 + \\frac12 + \\frac16 + \\frac1{24} + \\frac1{120} + \\frac1{720} = 2.718$\n• $x \\to -x$: $e^{-x} = 1 - x + \\frac{x^2}{2!} - \\frac{x^3}{3!} + \\cdots$, the signs alternate\n• Subtract or add, then halve: $\\sinh x = \\frac{e^x - e^{-x}}{2} = x + \\frac{x^3}{3!} + \\frac{x^5}{5!} + \\cdots$ (odd powers) and $\\cosh x = \\frac{e^x + e^{-x}}{2} = 1 + \\frac{x^2}{2!} + \\cdots$ (even powers)',
        },
        {
          type: 'order',
          eyebrow: 'Prove it',
          prompt: 'Prove that $\\frac{e^6 - 1}{e^3} = 2\\left(3 + \\frac{3^3}{3!} + \\frac{3^5}{5!} + \\cdots\\right)$. Order the lines.',
          items: [
            '$\\frac{e^6 - 1}{e^3} = e^3 - e^{-3}$.',
            '$e^3 = 1 + 3 + \\frac{3^2}{2!} + \\frac{3^3}{3!} + \\frac{3^4}{4!} + \\cdots$',
            'Put $x = -3$: $e^{-3} = 1 - 3 + \\frac{3^2}{2!} - \\frac{3^3}{3!} + \\frac{3^4}{4!} - \\cdots$',
            'Subtract: even powers cancel, odd powers double, so $e^3 - e^{-3} = 2\\left(3 + \\frac{3^3}{3!} + \\frac{3^5}{5!} + \\cdots\\right)$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Combining',
          title: 'Expand $\\ln(1 + 5x + 4x^2)$ as a series in $x$ up to $x^4$.',
          body: 'Factorise: $1 + 5x + 4x^2 = (1 + x)(1 + 4x)$, so it equals $\\ln(1 + x) + \\ln(1 + 4x)$. Put $4x$ in place of $x$ in the second.',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$: $1 + 4 = $', answer: 5, tol: 0.0001, hint: 'From $x$ and $4x$.' },
              { ask: 'Coefficient of $x^2$: $-\\frac{1 + 16}{2} = $', answer: -8.5, tol: 0.0001, hint: '$-\\frac{x^2}{2} - \\frac{(4x)^2}{2}$.' },
              { ask: 'Coefficient of $x^3$: $\\frac{1 + 64}{3} = $ (4 d.p.)', answer: 21.6667, tol: 0.0002, hint: '$\\frac{x^3}{3} + \\frac{(4x)^3}{3}$.' },
              { ask: 'Coefficient of $x^4$: $-\\frac{1 + 256}{4} = $', answer: -64.25, tol: 0.0001, hint: '$-\\frac{x^4}{4} - \\frac{(4x)^4}{4}$.', done: '$5x - \\frac{17}{2}x^2 + \\frac{65}{3}x^3 - \\frac{257}{4}x^4 + \\cdots$, valid for $-\\frac14 < x \\le \\frac14$ (the $4x$ series sets the range).' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can build a series for almost anything.',
          body: 'The standard series and their ranges, the binomial theorem and series, the exponential and hyperbolic series, and combining them. Next: exam practice on Part A.',
        },
      ],
    },
  ],
};
