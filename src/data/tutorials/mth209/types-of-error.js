// MTH 209 · Error analysis · Lesson 1: types of error, chopping and rounding, absolute and relative error.

export default {
  id: 'types-of-error',
  title: 'Types of error',
  covers: 'Gross, truncation and round-off errors; chopping vs symmetric rounding; absolute and relative error',
  minutes: 14,
  sections: [
    {
      name: 'Where errors come from',
      terms: [
        ['Gross error (blunder)', 'A human mistake, e.g. writing $0.5791$ instead of $0.5971$.'],
        ['Truncation error', 'Error from replacing an infinite process by a finite one, e.g. stopping a series after a few terms.'],
        ['Round-off error', 'Error from keeping only a limited number of digits, e.g. $\\frac23 \\approx 0.667$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Error analysis · Lesson 1',
          title: 'Every numerical answer is approximate',
          body: 'Bisection gave $1.05$, not $1.04709\\ldots$. Linear interpolation gave $\\ln 2 \\approx 0.3584$. Numerical methods trade exactness for answers we can actually compute.\n\nSo we must ask: **how wrong** might the answer be, and **why**? Errors come in a few distinct types.',
          cta: 'Meet them',
        },
        {
          type: 'reveal',
          eyebrow: 'Types of error',
          title: 'Three sources',
          cards: [
            { title: 'Gross / blunder', text: 'A **mistake**: copying $0.5971$ as $0.5791$, pressing the wrong key. Avoided by care and checking.' },
            { title: 'Truncation', text: 'An **infinite process cut short**: $(1 + x)^{1/2} = 1 + \\frac12x - \\frac18x^2 + \\cdots$ stopped after 3 terms. The dropped terms are the error.' },
            { title: 'Round-off', text: '**Limited digits**: $\\frac23 = 0.6666\\ldots$ stored as $0.667$. Done by chopping or by symmetric rounding.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which type of error is each one?',
          buckets: [
            { id: 'g', label: 'Gross' },
            { id: 't', label: 'Truncation' },
            { id: 'r', label: 'Round-off' },
          ],
          items: [
            { text: 'Copying $3.1416$ as $3.1461$', bucket: 'g', why: '**A transposition mistake** is a blunder.' },
            { text: 'Using $e^x \\approx 1 + x + \\frac{x^2}{2}$', bucket: 't', why: '**The rest of the series is dropped**: truncation.' },
            { text: 'Storing $\\frac13$ as $0.3333$', bucket: 'r', why: '**Limited digits**: round-off.' },
            { text: 'Stopping bisection after 5 steps', bucket: 't', why: '**An infinite process stopped early** is truncation.' },
            { text: 'A calculator showing $\\sqrt2 = 1.414213562$', bucket: 'r', why: '**$\\sqrt2$ has infinitely many digits**; the display rounds.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Truncation example',
          title: '$e^{0.2}$ from the first 3 terms',
          body: '$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$$\n\nKeeping 3 terms: $e^{0.2} \\approx 1 + 0.2 + \\frac{0.04}{2} = 1.22$.\n\nThe truncation error is the sum of the dropped terms:\n$$\\frac{(0.2)^3}{6} + \\frac{(0.2)^4}{24} + \\cdots = 0.00133 + 0.00007 + \\cdots \\approx 0.0014.$$\n\nIndeed $e^{0.2} = 1.2214$. The truncation error is less than $10^{-2}$.',
        },
        {
          type: 'bridge',
          title: 'Sources: identified.',
          recap: [
            '**Gross**: mistakes. **Truncation**: infinite process cut short. **Round-off**: limited digits.',
            '$e^{0.2} \\approx 1.22$ with truncation error $\\approx 0.0014$.',
          ],
          why: 'Round-off can be done two ways. The next part compares them.',
        },
      ],
    },
    {
      name: 'Chopping and rounding',
      terms: [
        ['Chopping', 'Drop the extra digits. Error bound: $10^{E - d}$ for a number $0.d_1d_2\\ldots \\times 10^E$ kept to $d$ digits.'],
        ['Symmetric rounding', 'Add 1 to the last kept digit if the first discarded digit is $\\ge 5$, then chop. Error bound: $\\frac12 \\times 10^{E - d}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Chopping',
          title: 'A 4-digit machine stores $72.32451$',
          body: 'Normalised form: $72.32451 = 0.7232451 \\times 10^2$.\n\nChopping to 4 digits keeps $0.7232 \\times 10^2 = 72.32$ and **drops** $451$:\n$$72.32451 = (0.7232 + 0.451 \\times 10^{-4}) \\times 10^2.$$\n\nThe chopping error is $0.451 \\times 10^{-4} \\times 10^2 = 0.00451$.\n\nIn general, if $x_t = f_t \\times 10^E + g_t \\times 10^{E - d}$ with $0 \\le g_t < 1$, the chopping error is $g_t \\times 10^{E - d} < 10^{E - d}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Symmetric rounding',
          prompt: 'Round $0.666666$ to 3 decimal places by symmetric rounding.',
          options: [
            { text: '$0.666$', why: 'That’s chopping. The first discarded digit is 6, which is $\\ge 5$.' },
            { text: '$0.667$', correct: true, why: 'The first discarded digit (6) is $\\ge 5$, so the last kept digit goes up by 1.' },
            { text: '$0.67$', why: 'That’s 2 decimal places.' },
            { text: '$0.6667$', why: 'That’s 4 decimal places.' },
          ],
          explain: 'Symmetric rounding is never more than half a unit out in the last place, so its error bound is half that of chopping.',
        },
        {
          type: 'bridge',
          title: 'Rounding: compared.',
          recap: [
            'Chopping error $< 10^{E - d}$; symmetric rounding error $\\le \\frac12 \\times 10^{E - d}$.',
          ],
          why: 'Last part: how we measure the size of an error.',
        },
      ],
    },
    {
      name: 'Measuring error',
      terms: [
        ['Absolute error', '$|\\varepsilon| = |x_t - X|$, where $x_t$ is the true value and $X$ the approximation.'],
        ['Relative error', '$\\dfrac{|x_t - X|}{|x_t|}$ = absolute error ÷ true value, often as a percentage.'],
        ['Correct to d decimal places', '$x$ rounded to $x_d$ with $|x - x_d| \\le \\frac12 \\times 10^{-d}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Definitions',
          title: 'Absolute and relative error',
          body: 'Let $x_t$ be the true value and $X$ an approximation. The error is $\\varepsilon = x_t - X$ and\n$$\\text{absolute error} = |\\varepsilon| = |x_t - X|,\\qquad \\text{relative error} = \\frac{|x_t - X|}{|x_t|}.$$\n\nAn error of 1 cm is tiny when measuring a road but huge when measuring a screw. Relative error captures that.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: '$\\pi$ is approximated by $3.14$. What is the relative error?',
          options: [
            { text: '$0.00159$', why: 'That’s the absolute error. Divide by $\\pi$.' },
            { text: '$0.000507$, about $0.051\\%$', correct: true, why: '$\\frac{|3.14159 - 3.14|}{3.14159} = \\frac{0.00159}{3.14159} = 0.000507$.' },
            { text: '$0.0507$', why: 'That’s $5\\%$; check the division.' },
            { text: '$3.14$', why: 'That’s the approximation itself.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Rounding to d decimal places',
          title: 'Half a unit in the last place',
          body: '$x$ is rounded to $d$ decimal places, $x_d$, if\n$$|\\varepsilon| = |x - x_d| \\le \\tfrac12 \\times 10^{-d}.$$\n\nExample: $x = \\frac17 = 0.1428571\\ldots$\n**$d = 2$:** $x_2 = 0.14$, $|\\varepsilon| = 0.0028571 \\le 0.005$ ✓\n**$d = 4$:** $x_4 = 0.1429$, $|\\varepsilon| = 0.0000429 \\le 0.00005$ ✓',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A value is quoted as $24.5$, correct to 1 d.p. What is its maximum possible error?',
          options: [
            { text: '$0.5$', why: 'That would be correct to the nearest whole number.' },
            { text: '$0.05$', correct: true, why: '$\\frac12 \\times 10^{-1} = 0.05$: the true value is between $24.45$ and $24.55$.' },
            { text: '$0.005$', why: 'That’s for 2 d.p.' },
            { text: '$0.1$', why: 'That’s a whole unit in the last place; rounding gives half of it.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can classify and measure errors.',
          body: 'Next: how errors spread through sums, products and quotients.',
        },
      ],
    },
  ],
};
