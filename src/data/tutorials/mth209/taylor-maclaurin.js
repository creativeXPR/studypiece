// MTH 209 · Approximations · Lesson 2: Taylor and Maclaurin series.

export default {
  id: 'taylor-maclaurin',
  title: 'Taylor and Maclaurin series',
  covers: 'Matching derivatives at a point, the series for sin x, cos x and ln(1 + x), cos 0.2, √4.1, truncation error',
  minutes: 16,
  sections: [
    {
      name: 'Building the series',
      terms: [
        ['Taylor series', '$f(a + h) = f(a) + hf\'(a) + \\dfrac{h^2}{2!}f\'\'(a) + \\dfrac{h^3}{3!}f\'\'\'(a) + \\cdots$: the expansion of $f$ about the point $a$.'],
        ['Maclaurin series', 'The Taylor series about $a = 0$: $f(x) = f(0) + xf\'(0) + \\dfrac{x^2}{2!}f\'\'(0) + \\cdots$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Approximations · Lesson 2',
          title: 'Copy a function near one point',
          body: 'Suppose you know everything about $f$ at one point $a$: its value, its slope, its curvature, and so on. Can you rebuild $f$ nearby?\n\nYes. Choose a polynomial that matches $f(a)$, then $f\'(a)$, then $f\'\'(a)$, … The more derivatives you match, the further the copy stays accurate. Carried on forever, this is the ==Taylor series== of $f$ about $a$.',
          cta: 'See the formula',
        },
        {
          type: 'story',
          eyebrow: 'The formula',
          title: 'Taylor about $a$, Maclaurin about $0$',
          body: 'With $h$ the step away from $a$:\n$$f(a + h) = f(a) + hf\'(a) + \\frac{h^2}{2!}f\'\'(a) + \\frac{h^3}{3!}f\'\'\'(a) + \\cdots + \\frac{h^n}{n!}f^{(n)}(a) + \\cdots$$\n\nSetting $a = 0$ and $h = x$ gives the ==Maclaurin series==:\n$$f(x) = f(0) + xf\'(0) + \\frac{x^2}{2!}f\'\'(0) + \\frac{x^3}{3!}f\'\'\'(0) + \\cdots$$\n\nEach term is (derivative at the point) $\\times$ (step)$^n$ $\\div\\ n!$.',
        },
        {
          type: 'reveal',
          eyebrow: 'Derive one',
          title: 'The Maclaurin series of $\\sin x$',
          cards: [
            { title: 'Derivatives', text: '$f = \\sin x$, $f\' = \\cos x$, $f\'\' = -\\sin x$, $f\'\'\' = -\\cos x$, then the cycle repeats.' },
            { title: 'Values at 0', text: '$f(0) = 0$, $f\'(0) = 1$, $f\'\'(0) = 0$, $f\'\'\'(0) = -1$, $f^{(4)}(0) = 0$, $f^{(5)}(0) = 1$, …' },
            { title: 'Substitute', text: '$\\sin x = 0 + x + 0 - \\dfrac{x^3}{3!} + 0 + \\dfrac{x^5}{5!} - \\cdots$' },
            { title: 'Result', text: '$\\sin x = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\dfrac{x^7}{7!} + \\cdots$, valid for every $x$.' },
          ],
          note: 'In the same way, $\\cos x = 1 - \\dfrac{x^2}{2!} + \\dfrac{x^4}{4!} - \\cdots$ (only even powers).',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $f(x) = \\ln(1 + x)$, $f\'(x) = \\frac{1}{1+x}$, $f\'\'(x) = -\\frac{1}{(1+x)^2}$, $f\'\'\'(x) = \\frac{2}{(1+x)^3}$. What is the $x^3$ term of its Maclaurin series?',
          options: [
            { text: '$\\dfrac{x^3}{3}$', correct: true, why: '$\\frac{x^3}{3!}f\'\'\'(0) = \\frac{x^3}{6}(2) = \\frac{x^3}{3}$. So $\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots$' },
            { text: '$\\dfrac{2x^3}{3}$', why: 'Divide by $3! = 6$, not $3$: $\\frac{2}{6} = \\frac13$.' },
            { text: '$-\\dfrac{x^3}{3}$', why: '$f\'\'\'(0) = +2$, so the $x^3$ term is positive.' },
            { text: '$\\dfrac{x^3}{3!}$', why: 'You still need to multiply by $f\'\'\'(0) = 2$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Series: built.',
          recap: [
            'Taylor: expand $f(a + h)$ in powers of $h$ using derivatives at $a$.',
            'Maclaurin: the special case $a = 0$.',
          ],
          why: 'Now use them to approximate values, and measure the error.',
        },
      ],
    },
    {
      name: 'Using the series',
      terms: [
        ['Truncation error', 'After $n$ terms the error is the remainder $R_n = \\dfrac{h^{n+1}}{(n+1)!}f^{(n+1)}(\\xi)$ for some $\\xi$ between $a$ and $a + h$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Find $\\cos 0.2$ to 6 d.p.',
          body: '$$\\cos 0.2 = 1 - \\frac{0.2^2}{2!} + \\frac{0.2^4}{4!} - \\cdots = 1 - 0.02 + 0.0000667 - \\cdots = 0.980067$$\nThe next term, $\\frac{0.2^6}{6!} \\approx 0.0000001$, is too small to change 6 d.p.\n\nTrue value: $0.9800666\\ldots$ ✓ (angles in **radians**).',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Use four terms of $\\ln(1 + x)$ to estimate $\\ln 1.1$.',
          options: [
            { text: '$0.09531$', correct: true, why: '$0.1 - \\frac{0.01}{2} + \\frac{0.001}{3} - \\frac{0.0001}{4} = 0.1 - 0.005 + 0.000333 - 0.000025 = 0.095308$. True: $0.095310$.' },
            { text: '$0.09500$', why: 'That stops after two terms. Add $+\\frac{x^3}{3}$ and $-\\frac{x^4}{4}$.' },
            { text: '$0.10536$', why: 'That is $-\\ln 0.9$. Here $x = +0.1$, so the signs alternate $+, -, +, -$.' },
            { text: '$0.09534$', why: 'Remember the fourth term, $-\\frac{0.1^4}{4} = -0.000025$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Taylor about a point',
          title: 'Estimate $\\sqrt{4.1}$ by expanding about $a = 4$',
          body: '$f(x) = \\sqrt x$: $f(4) = 2$, $f\'(x) = \\frac{1}{2\\sqrt x}$ so $f\'(4) = \\frac14$, $f\'\'(x) = -\\frac{1}{4x^{3/2}}$ so $f\'\'(4) = -\\frac{1}{32}$.\n\nWith $h = 0.1$:\n$$\\sqrt{4.1} \\approx 2 + 0.1\\left(\\tfrac14\\right) + \\frac{0.1^2}{2!}\\left(-\\tfrac{1}{32}\\right) = 2 + 0.025 - 0.000156 = 2.024844.$$\nTrue: $2.0248457$. Choose $a$ where $f$ and its derivatives are **easy** (here $\\sqrt4 = 2$) and $h$ is **small**.',
        },
        {
          type: 'sort',
          eyebrow: 'Know the ranges',
          prompt: 'For which $x$ is each series valid?',
          buckets: [
            { id: 'all', label: 'Every real x' },
            { id: 'lim', label: 'Only a limited range' },
          ],
          items: [
            { text: '$e^x$', bucket: 'all', why: '**All $x$**: the factorials win.' },
            { text: '$\\sin x$ and $\\cos x$', bucket: 'all', why: '**All $x$** (in radians).' },
            { text: '$\\ln(1 + x)$', bucket: 'lim', why: '**$-1 < x \\le 1$** only.' },
            { text: '$(1 + x)^{-1}$', bucket: 'lim', why: '**$|x| < 1$** only.' },
          ],
          explain: 'Always state the range of validity when you write a series: it is part of the answer.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Obtain the Maclaurin series of $\\ln(1 + x)$ up to $x^4$',
          body: 'Let $f(x) = \\ln(1 + x)$. Then\n$$f\'(x) = (1 + x)^{-1},\\ f\'\'(x) = -(1 + x)^{-2},\\ f\'\'\'(x) = 2(1 + x)^{-3},\\ f^{(4)}(x) = -6(1 + x)^{-4},$$\nso $f(0) = 0$, $f\'(0) = 1$, $f\'\'(0) = -1$, $f\'\'\'(0) = 2$, $f^{(4)}(0) = -6$. By Maclaurin’s theorem,\n$$\\ln(1 + x) = 0 + x - \\frac{x^2}{2!} + \\frac{2x^3}{3!} - \\frac{6x^4}{4!} + \\cdots = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\cdots,$$\nvalid for $-1 < x \\le 1$.',
        },
        {
          type: 'finish',
          title: 'Taylor and Maclaurin: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
