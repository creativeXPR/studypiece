// MTH 209 · Approximations · Lesson 1: binomial expansion.

export default {
  id: 'binomial-expansion',
  title: 'Binomial expansion',
  covers: 'The binomial theorem, the binomial series for any power, approximating √1.02 and 0.98⁵',
  minutes: 14,
  sections: [
    {
      name: 'The binomial theorem',
      terms: [
        ['Binomial theorem', '$(a + x)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} x^r$ for a positive integer $n$, with $\\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}$.'],
        ['Binomial series', '$(1 + x)^n = 1 + nx + \\dfrac{n(n-1)}{2!}x^2 + \\dfrac{n(n-1)(n-2)}{3!}x^3 + \\cdots$ for any $n$, valid when $|x| < 1$.'],
      ],
      screens: [
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
        {
          type: 'bridge',
          title: 'Expansions: set.',
          recap: [
            'Positive integer $n$: a finite expansion with $\\binom{n}{r}$ coefficients.',
            'Any other $n$: an infinite series, valid only for $|x| < 1$.',
          ],
          why: 'Now use it to approximate numbers by hand.',
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
          type: 'reveal',
          eyebrow: 'The recipe',
          title: 'Approximating a power by hand',
          cards: [
            { title: '1 · Get the form $(1 + x)^n$', text: 'Write the number as $(1 + x)^n$ with $x$ small, factoring out $a^n$ if needed: $\\sqrt{4.08} = 2(1 + 0.02)^{1/2}$.' },
            { title: '2 · Check validity', text: 'For a non-integer or negative $n$ you need $|x| < 1$.' },
            { title: '3 · Expand', text: 'Write $1 + nx + \\frac{n(n-1)}{2!}x^2 + \\cdots$ and substitute.' },
            { title: '4 · Stop when terms are tiny', text: 'Keep going until the next term is smaller than the accuracy asked for.' },
          ],
          note: 'The smaller $|x|$ is, the faster the terms shrink and the fewer you need.',
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
