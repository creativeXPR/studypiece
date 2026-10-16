// MTH 209 · Error analysis · Lesson 2: propagation of errors through +, −, ×, ÷.

export default {
  id: 'error-propagation',
  title: 'Error propagation',
  covers: 'How errors combine in sums, differences, products and quotients, with worked examples',
  minutes: 18,
  sections: [
    {
      name: 'Sums and differences',
      terms: [
        ['Error in a sum or difference', 'The maximum absolute error is the sum of the absolute errors: $|\\varepsilon_1| + |\\varepsilon_2|$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Error analysis · Lesson 2',
          title: 'Errors travel through calculations',
          body: 'If $x_1 \\approx X_1$ and $x_2 \\approx X_2$ are slightly wrong, then $X_1 + X_2$, $X_1X_2$ and $\\frac{X_1}{X_2}$ are wrong too. ==Error propagation== tells us **how wrong**.\n\nSet-up: let $x_1, x_2$ be the true values, $X_1, X_2$ the approximations, with errors $\\varepsilon_1, \\varepsilon_2$:\n$$x_1 = X_1 + \\varepsilon_1,\\qquad x_2 = X_2 + \\varepsilon_2.$$',
          cta: 'Start with addition',
        },
        {
          type: 'story',
          eyebrow: 'Addition',
          title: 'The errors add',
          body: '$$x_1 + x_2 = (X_1 + \\varepsilon_1) + (X_2 + \\varepsilon_2) = (X_1 + X_2) + (\\varepsilon_1 + \\varepsilon_2).$$\n\nSo the error in the sum is $\\varepsilon_1 + \\varepsilon_2$, and in the worst case\n$$|(x_1 + x_2) - (X_1 + X_2)| \\le |\\varepsilon_1| + |\\varepsilon_2|.$$\n\n**The error in a sum is (at most) the sum of the errors.**',
        },
        {
          type: 'choice',
          eyebrow: 'Subtraction',
          prompt: 'The error in $x_1 - x_2$ is $\\varepsilon_1 - \\varepsilon_2$. What is the worst-case bound?',
          options: [
            { text: '$|\\varepsilon_1| - |\\varepsilon_2|$', why: 'If $\\varepsilon_1 > 0$ and $\\varepsilon_2 < 0$, the errors reinforce each other.' },
            { text: '$|\\varepsilon_1| + |\\varepsilon_2|$', correct: true, why: '$|\\varepsilon_1 - \\varepsilon_2| \\le |\\varepsilon_1| + |-\\varepsilon_2| = |\\varepsilon_1| + |\\varepsilon_2|$. Subtracting does **not** cancel errors.' },
            { text: '$0$', why: 'Errors only cancel by luck; we want a guaranteed bound.' },
            { text: '$|\\varepsilon_1\\varepsilon_2|$', why: 'That’s a second-order term, usually negligible.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: '$15.36$ (2 d.p.), $27.1$ (1 d.p.) and $1.672$ (3 d.p.). What is the maximum error in $15.36 + 27.1 - 1.672$?',
          options: [
            { text: '$0.0555$', correct: true, why: '$0.005 + 0.05 + 0.0005 = 0.0555$. Each value contributes half a unit in its last place.' },
            { text: '$0.05$', why: 'Add the errors of all three numbers.' },
            { text: '$0.0445$', why: 'Subtraction still adds the error ($0.0005$), never removes it.' },
            { text: '$0.15$', why: 'The errors are halves of the last place: $0.005$, $0.05$, $0.0005$.' },
          ],
        },
        {
          type: 'bridge',
          title: '+ and −: done.',
          recap: [
            'Sum or difference: max absolute error $= |\\varepsilon_1| + |\\varepsilon_2|$.',
          ],
          why: 'Products and quotients work with **relative** errors instead.',
        },
      ],
    },
    {
      name: 'Products and quotients',
      terms: [
        ['Error in a product', 'Relative error of $X_1X_2$ $\\approx \\dfrac{|\\varepsilon_1|}{X_1} + \\dfrac{|\\varepsilon_2|}{X_2}$ (sum of relative errors); absolute error $\\approx X_1|\\varepsilon_2| + X_2|\\varepsilon_1|$.'],
        ['Error in a quotient', 'Relative error of $\\frac{X_1}{X_2}$ $\\le \\dfrac{|\\varepsilon_1|}{X_1} + \\dfrac{|\\varepsilon_2|}{X_2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Multiplication',
          title: 'Expand and drop the tiny term',
          body: '$$x_1x_2 = (X_1 + \\varepsilon_1)(X_2 + \\varepsilon_2) = X_1X_2 + X_1\\varepsilon_2 + X_2\\varepsilon_1 + \\varepsilon_1\\varepsilon_2.$$\n\n$\\varepsilon_1\\varepsilon_2$ is a product of two small errors, so it is **negligible**. Then\n$$x_1x_2 - X_1X_2 \\approx X_1\\varepsilon_2 + X_2\\varepsilon_1.$$\n\nDivide by $X_1X_2$:\n$$\\frac{x_1x_2 - X_1X_2}{X_1X_2} \\approx \\frac{\\varepsilon_1}{X_1} + \\frac{\\varepsilon_2}{X_2}.$$\n\n**The relative error of a product is the sum of the relative errors.**',
        },
        {
          type: 'story',
          eyebrow: 'Division',
          title: 'Same rule for quotients',
          body: '$$\\frac{x_1}{x_2} - \\frac{X_1}{X_2} = \\frac{X_2(X_1 + \\varepsilon_1) - X_1(X_2 + \\varepsilon_2)}{X_2(X_2 + \\varepsilon_2)} = \\frac{X_2\\varepsilon_1 - X_1\\varepsilon_2}{X_2^2\\left(1 + \\frac{\\varepsilon_2}{X_2}\\right)}.$$\n\nIgnoring $\\frac{\\varepsilon_2}{X_2}$ next to 1 and dividing by $\\frac{X_1}{X_2}$:\n$$\\text{relative error} \\approx \\frac{\\varepsilon_1}{X_1} - \\frac{\\varepsilon_2}{X_2},\\quad\\text{so}\\quad \\left|\\text{rel. error}\\right| \\le \\frac{|\\varepsilon_1|}{X_1} + \\frac{|\\varepsilon_2|}{X_2}.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Worked example 1',
          prompt: 'Find $\\frac{24.5}{12.37}$ and its maximum error. (Errors: $\\varepsilon_1 = 0.05$, $\\varepsilon_2 = 0.005$.)',
          options: [
            { text: '$1.981 \\pm 0.005$', correct: true, why: '$\\frac{24.5}{12.37} = 1.9806$. Max error $= \\left(\\frac{0.05}{24.5} + \\frac{0.005}{12.37}\\right) \\times 1.9806 = (0.00204 + 0.00040)(1.9806) = 0.0048 \\approx 0.005$.' },
            { text: '$2.053 \\pm 0.005$', why: 'Check the division: $24.5 \\div 12.37 = 1.9806$.' },
            { text: '$1.981 \\pm 0.055$', why: 'For a quotient, add **relative** errors, then multiply by the result.' },
            { text: '$1.981 \\pm 0$', why: 'Both inputs carry rounding error.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example 2',
          title: '$\\dfrac{15.36 + 27.1 - 1.672}{2.36 \\times 1.043}$',
          body: '**Numerator:** $40.788$, max error $\\varepsilon_1 = 0.005 + 0.05 + 0.0005 = 0.0555$.\n\n**Denominator:** $2.36 \\times 1.043 = 2.4615$, max error $\\varepsilon_2 = 2.36(0.0005) + 1.043(0.005) = 0.0064$.\n\n**Quotient:** $\\frac{40.788}{2.4615} = 16.571$, max error\n$$\\left(\\frac{0.0555}{40.788} + \\frac{0.0064}{2.4615}\\right) \\times 16.571 = 0.066.$$\n\nSo the value lies in $16.571 \\pm 0.066$.',
        },
        {
          type: 'sort',
          eyebrow: 'Sort the rules',
          prompt: 'Which kind of error adds for each operation?',
          buckets: [
            { id: 'a', label: 'Absolute errors add' },
            { id: 'r', label: 'Relative errors add' },
          ],
          items: [
            { text: 'Addition', bucket: 'a', why: '**Sum**: $|\\varepsilon_1| + |\\varepsilon_2|$.' },
            { text: 'Subtraction', bucket: 'a', why: '**Difference**: $|\\varepsilon_1| + |\\varepsilon_2|$, too.' },
            { text: 'Multiplication', bucket: 'r', why: '**Product**: $\\frac{|\\varepsilon_1|}{X_1} + \\frac{|\\varepsilon_2|}{X_2}$.' },
            { text: 'Division', bucket: 'r', why: '**Quotient**: same bound as the product.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Show the product rule',
          body: 'Let $|X - x| \\le \\alpha$ and $|Y - y| \\le \\beta$, where $X, Y$ are the true values and $x, y$ the approximations. Then $X = x + \\alpha$, $Y = y + \\beta$ (worst case) and\n$$XY = xy + x\\beta + y\\alpha + \\alpha\\beta.$$\nNeglecting $\\alpha\\beta$ and dividing by $XY \\approx xy$:\n$$\\left|\\frac{XY - xy}{XY}\\right| \\le \\left|\\frac{\\alpha}{X}\\right| + \\left|\\frac{\\beta}{Y}\\right|.$$',
        },
        {
          type: 'finish',
          title: 'Error analysis: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
