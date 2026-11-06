// STA 221 · Correlation and Regression · Exam practice: worked exam-style questions on chapter 6.
export default {
  id: 'exam-regression',
  title: 'Exam practice: correlation and regression',
  covers: 'Exam-style questions: regression from sums only, r and r², a very weak r, Spearman’s rank correlation, Yule’s Q, deriving the normal equations',
  minutes: 16,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['Shared numerator', '$S = n\\sum xy - \\sum x\\sum y$: $\\beta = \\frac{S}{n\\sum x^2 - (\\sum x)^2}$, $r = \\frac{S}{\\sqrt{[n\\sum x^2 - (\\sum x)^2][n\\sum y^2 - (\\sum y)^2]}}$.'],
        ['Tiny r', 'A line can always be computed, but with $|r|$ near $0$ it is nearly useless for prediction.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'For $10$ pairs ($x$ from $6$ to $18$): $\\sum x = 120$, $\\sum y = 480$, $\\sum xy = 6080$, $\\sum x^2 = 1560$, $\\sum y^2 = 24200$. (a) Line of $y$ on $x$. (b) $r$ and $r^2$. (c) $y$ at $x = 15$. (d) Trust an estimate at $x = 40$?',
          body: 'Numerator $= 10(6080) - 120(480) = 3200$; $10(1560) - 120^2 = 1200$; $10(24200) - 480^2 = 11600$.\n\n**(a)** $\\beta = \\frac{3200}{1200} = 2.667$, $\\alpha = 48 - 2.667(12) = 16$: $\\hat y = 16 + 2.667x$.\n**(b)** $r = \\frac{3200}{\\sqrt{1200 \\times 11600}} = 0.858$, $r^2 = 0.736$: a very strong positive relationship; about $74\\%$ of the variation in $y$ is explained by $x$.\n**(c)** $\\hat y = 16 + 2.667(15) = 56$.\n**(d)** No: $x = 40$ is far outside $6$–$18$. That would be extrapolation.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'For $n = 10$: $\\sum x = 796$, $\\sum y = 1305$, $\\sum xy = 103967$, $\\sum x^2 = 63826$, $\\sum y^2 = 173845$. Fit the line, find $r$, and predict $y$ at $x = 56$.',
          body: 'Numerator $= 10(103967) - 796(1305) = 1039670 - 1038780 = 890$.\n$10(63826) - 796^2 = 4644$; $10(173845) - 1305^2 = 35425$.\n\n$\\beta = \\frac{890}{4644} = 0.1916$; $\\alpha = 130.5 - 0.1916(79.6) = 115.25$: $\\hat y = 115.25 + 0.1916x$.\n\n$r = \\frac{890}{\\sqrt{4644 \\times 35425}} = \\frac{890}{12826} = 0.069$.\n\nAt $x = 56$: $\\hat y = 115.25 + 0.1916(56) \\approx 125.98$.\n\n**Comment:** $r \\approx 0.07$ is a **very weak** relationship ($r^2 < 0.5\\%$), so the line is nearly useless for prediction even though it can be computed.',
          asides: [{ label: 'Exam tip', text: 'Always state $r$ and comment on it, even when the question only asks for the line. A tiny $r$ is the key point here.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'If $r = 0.858$, the fraction of the variation in $y$ explained by the line is',
          options: [
            { text: '$73.6\\%$', correct: true, why: '$r^2 = 0.858^2 = 0.736$.' },
            { text: '$85.8\\%$', why: 'That is $r$; the explained fraction is $r^2$.' },
            { text: '$92.6\\%$', why: 'That is $\\sqrt{0.858}$. Square $r$ instead.' },
            { text: '$14.2\\%$', why: 'That is $1 - r$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'For $y_i = \\alpha + \\beta x_i + \\varepsilon_i$: (a) derive the normal equations; (b) obtain $\\hat\\beta$ and $\\hat\\alpha$; (c) show the line passes through $(\\bar x, \\bar y)$ and explain why $\\hat\\beta$ and $r$ share a sign.',
          body: '**(a)** Minimise $Q = \\sum(y_i - \\alpha - \\beta x_i)^2$:\n$\\frac{\\partial Q}{\\partial\\alpha} = -2\\sum(y_i - \\alpha - \\beta x_i) = 0 \\Rightarrow \\sum y = n\\alpha + \\beta\\sum x$.\n$\\frac{\\partial Q}{\\partial\\beta} = -2\\sum x_i(y_i - \\alpha - \\beta x_i) = 0 \\Rightarrow \\sum xy = \\alpha\\sum x + \\beta\\sum x^2$.\n\n**(b)** From the first, $\\alpha = \\bar y - \\beta\\bar x$. Substituting and multiplying by $n$: $\\hat\\beta = \\frac{n\\sum xy - \\sum x\\sum y}{n\\sum x^2 - (\\sum x)^2}$, $\\hat\\alpha = \\bar y - \\hat\\beta\\bar x$.\n\n**(c)** At $x = \\bar x$: $\\hat y = \\bar y - \\hat\\beta\\bar x + \\hat\\beta\\bar x = \\bar y$. $\\hat\\beta$ and $r$ have the same numerator and positive denominators, so the same sign.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Two examiners’ rankings of $10$ essays give $\\sum d^2 = 12$. Spearman’s $r_s$ is',
          options: [
            { text: '$0.927$', correct: true, why: '$1 - \\frac{6 \\times 12}{10 \\times 99} = 1 - \\frac{72}{990}$.' },
            { text: '$0.073$', why: 'That is $\\frac{72}{990}$; subtract it from $1$.' },
            { text: '$0.993$', why: 'Keep the $6$: $1 - \\frac{6\\sum d^2}{n(n^2 - 1)} = 1 - \\frac{72}{990}$.' },
            { text: '$-0.927$', why: 'Small rank differences mean strong **agreement**: positive.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'For $10$ pairs: $\\sum x = 120$, $\\sum y = 480$, $\\sum xy = 6080$, $\\sum x^2 = 1560$, $\\sum y^2 = 24200$. Find the line, $r$, and $\\hat y$ at $x = 15$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Shared numerator $n\\sum xy - \\sum x\\sum y = $', answer: 3200, hint: '$10(6080) - 120(480)$.' },
              { ask: '$n\\sum x^2 - (\\sum x)^2 = $', answer: 1200, hint: '$10(1560) - 120^2$.' },
              { ask: '$\\beta = $ (3 d.p.)', answer: 2.667, tol: 0.002, hint: 'Numerator over the $x$ bracket: $\\frac{3200}{1200}$.' },
              { ask: '$\\alpha = \\bar y - \\beta\\bar x = $', answer: 16, tol: 0.02, hint: '$\\bar y = 48$, $\\bar x = 12$: $48 - 2.667 \\times 12$.' },
              { ask: '$n\\sum y^2 - (\\sum y)^2 = $', answer: 11600, hint: '$10(24200) - 480^2$.' },
              { ask: '$r = \\frac{3200}{\\sqrt{1200 \\times 11600}} = $ (3 d.p.)', answer: 0.858, tol: 0.002, hint: '$\\sqrt{1200 \\times 11600} = 3730.9$.' },
              { ask: '$\\hat y$ at $x = 15$: ', answer: 56, tol: 0.06, hint: '$16 + 2.667 \\times 15$.' },
            ],
            after: '**Answer:** $\\hat y = 16 + 2.667x$, $r = 0.858$ (very strong positive), $\\hat y(15) = 56$.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Two examiners rank $10$ essays; the rank differences give $\\sum d^2 = 12$. Find Spearman’s $r_s$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: '$6\\sum d^2 = $', answer: 72, hint: '$6 \\times 12$.' },
              { ask: '$n(n^2 - 1) = $', answer: 990, hint: '$10 \\times 99$.' },
              { ask: '$r_s = 1 - \\frac{72}{990} = $ (3 d.p.)', answer: 0.927, tol: 0.002, hint: '$\\frac{72}{990} = 0.073$.' },
            ],
            after: '**Answer:** $r_s = 0.927$: the examiners agree very closely.',
          },
        },
        {
          type: 'finish',
          title: 'Chapter 6 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
