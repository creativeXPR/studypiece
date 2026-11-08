// MTH 209 · Approximations · Lesson 1: binomial expansion.
import { binomialScene } from './series-scenes';

export default {
  id: 'binomial-expansion',
  title: 'Binomial expansion',
  covers: 'The binomial theorem, the binomial series for any power, approximating √1.02 and 0.98⁵',
  minutes: 13,
  sections: [
    {
      name: 'The binomial theorem',
      terms: [
        ['Binomial theorem', '$(a + x)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} x^r$ for a positive integer $n$, with $\\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}$.'],
        ['Binomial series', '$(1 + x)^n = 1 + nx + \\dfrac{n(n-1)}{2!}x^2 + \\dfrac{n(n-1)(n-2)}{3!}x^3 + \\cdots$ for any $n$, valid when $|x| < 1$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The shift operator satisfies',
          options: [
            { text: '$E = 1 + \\Delta$', correct: true, why: '$\\Delta f_k = f_{k+1} - f_k = (E - 1)f_k$.' },
            { text: '$E = 1 - \\Delta$', why: 'That mixes it up with $E^{-1} = 1 - \\nabla$.' },
            { text: '$E = \\Delta^2$', why: '$E$ shifts one step; $\\Delta = E - 1$.' },
            { text: '$E = \\delta$', why: '$\\delta = E^{1/2} - E^{-1/2}$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Approximations · Lesson 1',
          title: 'How does a calculator know √1.02?',
          body: 'A calculator can only add and multiply. So to give $\\sqrt{1.02}$, $\\ln 1.1$ or $e^{0.5}$ it uses a ==series==: a sum of simple powers that gets closer and closer to the true value.\n\nThis chapter builds the four series you need: the **binomial**, **Taylor**, **Maclaurin** and **exponential** series. We start with the binomial.',
          cta: 'Start',
        },
        {
          type: 'story',
          eyebrow: 'Positive whole powers',
          title: 'The binomial theorem',
          body: 'For a positive integer $n$:\n$$(a + x)^n = a^n + \\binom{n}{1}a^{n-1}x + \\binom{n}{2}a^{n-2}x^2 + \\cdots + x^n,$$\nwhere $\\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}$. The series **stops** after $n + 1$ terms.\n\nThe ==general term== (the $(r+1)$th term) is $\\binom{n}{r}a^{n-r}x^r$.\n\nExample: $(2 + x)^4 = 16 + 32x + 24x^2 + 8x^3 + x^4$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'In $(2 + x)^4$, where does the coefficient $24$ of $x^2$ come from?',
          options: [
            { text: '$\\binom{4}{2} \\cdot 2^2 = 6 \\times 4$', correct: true, why: 'General term with $r = 2$: $\\binom{4}{2}2^{4-2}x^2 = 6 \\cdot 4 x^2 = 24x^2$.' },
            { text: '$4 \\times 2 \\times 3$', why: 'Use $\\binom{n}{r}a^{n-r}$: here $\\binom{4}{2} = 6$ and $a^{n-r} = 2^2 = 4$.' },
            { text: '$\\binom{4}{2} \\cdot 2^4$', why: 'The power of $a$ is $n - r = 2$, not $n$.' },
            { text: '$2^4 + 2^3$', why: 'Each term is a single product, not a sum.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Any power',
          title: 'The binomial series',
          body: 'When $n$ is negative or a fraction, the expansion **never stops**:\n$$(1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots$$\n\nIt only converges for ==$|x| < 1$==. Outside that range the terms grow and the sum is meaningless.\n\nFor $(a + x)^n$, first take out $a^n$: $(a + x)^n = a^n\\left(1 + \\frac{x}{a}\\right)^n$, valid for $|x| < |a|$.',
        },
        binomialScene,
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'What are the first three terms of $(1 + x)^{-1}$?',
          options: [
            { text: '$1 - x + x^2$', correct: true, why: '$n = -1$: $1 + (-1)x + \\frac{(-1)(-2)}{2}x^2 = 1 - x + x^2$.' },
            { text: '$1 + x + x^2$', why: 'That is $(1 - x)^{-1}$. With $n = -1$ the $x$ term is $-x$.' },
            { text: '$1 - x - x^2$', why: '$\\frac{(-1)(-2)}{2!} = +1$, so the $x^2$ term is positive.' },
            { text: '$1 - x$', why: 'For a negative power the series doesn’t stop: there is an $x^2$ term and more.' },
          ],
        },
      ],
    },
    {
      name: 'Approximating with it',
      terms: [
        ['Truncation', 'Stopping an infinite series after a few terms. The neglected terms are the truncation error, and they are tiny when $|x|$ is small.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Approximate $\\sqrt{1.02}$',
          body: 'Write $\\sqrt{1.02} = (1 + 0.02)^{1/2}$, so $n = \\frac12$ and $x = 0.02$:\n$$(1 + x)^{1/2} \\approx 1 + \\tfrac12 x + \\frac{\\frac12\\left(-\\frac12\\right)}{2!}x^2 = 1 + \\tfrac12 x - \\tfrac18 x^2.$$\n$$\\sqrt{1.02} \\approx 1 + 0.01 - 0.00005 = 1.00995.$$\n\nThe true value is $1.0099505\\ldots$: three terms already give 6 correct figures, because $x^3 = 0.000008$ is tiny.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Use $(1 - x)^5$ with $x = 0.02$ to find $0.98^5$ to 4 d.p.',
          options: [
            { text: '$0.9039$', correct: true, why: '$1 - 5(0.02) + 10(0.02)^2 - 10(0.02)^3 + \\cdots = 1 - 0.1 + 0.004 - 0.00008 = 0.90392$.' },
            { text: '$0.9000$', why: 'Only two terms. The $x^2$ term $+0.004$ matters at 4 d.p.' },
            { text: '$0.9040$', why: 'Don’t forget the $x^3$ term, $-10(0.02)^3 = -0.00008$.' },
            { text: '$1.1041$', why: 'That is $1.02^5$. Here $x = -0.02$, so the signs alternate.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Use three terms of the binomial series to evaluate $\\frac{1}{\\sqrt{1.04}} = (1 + 0.04)^{-1/2}$.',
          body: '$(1 + x)^n \\approx 1 + nx + \\frac{n(n - 1)}{2!}x^2$, with $n = -\\frac12$, $x = 0.04$.',
          graph: {
            steps: [
              { ask: '$nx = $', answer: -0.02, tol: 1e-05, hint: '$-\\frac12 \\times 0.04$.' },
              { ask: '$\\frac{n(n - 1)}{2}x^2 = $', answer: 0.0006, tol: 1e-06, hint: '$\\frac{(-\\frac12)(-\\frac32)}{2}(0.0016) = \\frac38(0.0016)$.' },
              { ask: 'Sum of three terms (4 d.p.)', answer: 0.9806, tol: 5e-05, hint: '$1 - 0.02 + 0.0006$. True value $0.980581$.' },
              { ask: 'Is the series valid here?', options: ['Yes: $|0.04| < 1$', 'No'], answer: 0, hint: 'Is $|x| < 1$?' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: '$(1 + x)^{1/2}$ can be expanded as a series only for $|x| < 1$.', correct: true, why: '**Fractional power**: the series needs $|x| < 1$.' },
            { text: '$(1 + x)^6$ has exactly 7 terms.', correct: true, why: '**Positive integer $n$**: $n + 1 = 7$ terms.' },
            { text: '$(3 + x)^{-2} = \\frac19\\left(1 + \\frac{x}{3}\\right)^{-2}$, valid for $|x| < 3$.', correct: true, why: '**Factor out $a^n$** $= 3^{-2}$, then need $\\left|\\frac{x}{3}\\right| < 1$.' },
            { text: 'The expansion of $(1 + x)^{-1}$ is valid at $x = 2$.', why: 'At $x = 2$ the terms $1 - 2 + 4 - 8 + \\cdots$ blow up: **need $|x| < 1$**.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Expand $(1 - 2x)^{-1/2}$ up to $x^3$ and state when it is valid',
          body: 'Use $(1 + u)^n$ with $u = -2x$ and $n = -\\frac12$:\n$$\\begin{aligned} (1 - 2x)^{-1/2} &= 1 + \\left(-\\tfrac12\\right)(-2x) \\\\ &\\quad + \\frac{\\left(-\\frac12\\right)\\left(-\\frac32\\right)}{2!}(-2x)^2 \\\\ &\\quad + \\frac{\\left(-\\frac12\\right)\\left(-\\frac32\\right)\\left(-\\frac52\\right)}{3!}(-2x)^3 + \\cdots \\\\ &= 1 + x + \\tfrac32 x^2 + \\tfrac52 x^3 + \\cdots \\end{aligned}$$\nValid when $|{-2x}| < 1$, that is $|x| < \\frac12$.',
        },
        {
          type: 'finish',
          title: 'Binomial expansion: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
