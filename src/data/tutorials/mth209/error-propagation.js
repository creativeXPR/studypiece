// MTH 209 · Idea A, lesson 2: error propagation. Part 1 shows on simple numbers (3 ± 0.1, 2 ± 0.1)
// that absolute errors add in sums and differences, relative errors add in products and quotients,
// and a function multiplies the error by |f′|. Part 2 does the past-paper round-off questions.

export default {
  id: 'error-propagation',
  title: 'Errors in sums, products and functions',
  covers: 'How errors grow through +, −, ×, ÷ and functions; maximum round-off error and limits',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Error in a sum or difference', 'At most the sum of the absolute errors: $|\\varepsilon_1| + |\\varepsilon_2|$.'],
        ['Error in a product or quotient', 'The relative error is at most the sum of the relative errors: $\\dfrac{|\\varepsilon_1|}{|x_1|} + \\dfrac{|\\varepsilon_2|}{|x_2|}$.'],
        ['Error in a function', '$\\Delta f \\approx |f\'(x)|\\,\\Delta x$: the slope magnifies or shrinks the error.'],
      ],
      steps: [
        'Write each number with its error: $x_1 \\pm \\varepsilon_1$, $x_2 \\pm \\varepsilon_2$. A rounded number has error $\\tfrac12$ unit of its last digit.',
        'Sum or difference: add the **absolute** errors (even for a difference).',
        'Product or quotient: add the **relative** errors, then multiply by the result to get the absolute error.',
        'Function of one number: $\\Delta f \\approx |f\'(x)|\\,\\Delta x$.',
        'Limits: the true value lies between result $-$ error and result $+$ error.',
      ],
      examples: [
        {
          title: '$3 \\pm 0.1$ and $2 \\pm 0.1$',
          question: 'Find the maximum error in the sum, the product, and in $f(x) = x^2$ at $x = 3 \\pm 0.1$.',
          steps: ['Sum $5$: error $\\le 0.1 + 0.1 = 0.2$.', 'Product $6$: relative error $\\le \\tfrac{0.1}{3} + \\tfrac{0.1}{2} = 0.0833$, so absolute error $\\le 6 \\times 0.0833 = 0.5$.', '$f = x^2$: $f\'(3) = 6$, so $\\Delta f \\approx 6 \\times 0.1 = 0.6$.'],
          answer: 'Sum $5 \\pm 0.2$; product $6 \\pm 0.5$; $x^2 = 9 \\pm 0.6$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea A · Lesson 2',
          title: 'Errors travel through calculations',
          body: 'Last lesson measured the error in one number. But we rarely stop at one number: we add, multiply and feed numbers into functions.\n\n**Question for this lesson:** if each input is a little wrong, how wrong can the answer be? This is **error propagation**, and it tells you how many digits of a result you can trust.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Worst case: the errors pile up',
          body: 'Take $x = 3 \\pm 0.1$ and $y = 2 \\pm 0.1$.\n\n**Adding:** $x + y$ could be as big as $3.1 + 2.1$ or as small as $2.9 + 1.9$. So $5 \\pm 0.2$: the **absolute errors add**.\n\n**Multiplying:** $3.1 \\times 2.1 = 6.51$ and $2.9 \\times 1.9 = 5.51$, about $6 \\pm 0.5$. Here it is the **relative errors** that add: $\\tfrac{0.1}{3} + \\tfrac{0.1}{2} \\approx 0.083$, and $0.083 \\times 6 = 0.5$.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Propagating any error',
          body: '1. Write each number as value $\\pm$ error. A rounded number is out by at most half a unit of its last digit.\n2. **Sum or difference:** add the absolute errors.\n3. **Product or quotient:** add the relative errors, then times the result.\n4. **Function:** $\\Delta f \\approx |f\'(x)|\\,\\Delta x$, because near $x$ the curve is almost a straight line of slope $f\'(x)$.\n5. **Limits:** result $\\pm$ error.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$f(x) = x^2$ at $x = 3 \\pm 0.1$',
          body: '**Step 1.** $x = 3$, $\\Delta x = 0.1$.\n\n**Step 4.** $f\'(x) = 2x$, so $f\'(3) = 6$ and $\\Delta f \\approx 6 \\times 0.1 = 0.6$.\n\n**Step 5.** $x^2 = 9 \\pm 0.6$. Check: $2.9^2 = 8.41$ and $3.1^2 = 9.61$, which is $0.59$ and $0.61$ away. The slope rule is right to first order.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$x = 3 \\pm 0.1$, $y = 2 \\pm 0.1$',
          graph: {
            steps: [
              { ask: 'Maximum error in $x - y$?', answer: 0.2, tol: 0.001, hint: 'Differences add absolute errors too.' },
              { ask: 'Relative error of $xy$ (to 3 dp)?', answer: 0.083, tol: 0.001, hint: '$\\tfrac{0.1}{3} + \\tfrac{0.1}{2}$.' },
              { ask: 'Absolute error of $xy$?', answer: 0.5, tol: 0.01, hint: 'Relative error $\\times 6$.' },
            ],
            after: 'The difference $1 \\pm 0.2$ is $20\\%$ uncertain, though each input was only a few percent off. Subtracting close numbers loses accuracy.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Derive:** given $y_1, y_2$ with approximations $Y_1, Y_2$ and errors $\\varepsilon_1, \\varepsilon_2$, find the error in a sum, difference and product.\n• **Show that:** the relative error of $xy$ is at most $\\left|\\tfrac{\\alpha}{X}\\right| + \\left|\\tfrac{\\beta}{Y}\\right|$, and the same for a quotient.\n• **Compute:** evaluate an expression from rounded data, estimate the maximum error, and give the limits of the true value.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'For a derivation, start from $X = x + \\varepsilon$. Product: $XY = (x+\\alpha)(y+\\beta) = xy + x\\beta + y\\alpha + \\alpha\\beta$; drop $\\alpha\\beta$ (tiny), then divide by $xy$.',
        'For “maximum round-off error”: each decimal number is off by $\\tfrac12$ unit of its last digit; integers are exact.',
        'Work out the value first, then the relative error (product or quotient) or $|f\'|\\Delta x$ (function), then the limits.',
        'Mistake: subtracting errors in a difference. They always add, because the worst case is when they point opposite ways.',
        'Mistake: adding absolute errors in a product. Add relative errors there.',
      ],
      examples: [
        {
          title: '$\\dfrac{2.362 \\times 1.76}{1.46 \\times 0.785}$ and its limits',
          question: 'Evaluate, then assuming the maximum round-off error in each number, find the limits of the true value.',
          steps: ['Value $= 3.6272$.', 'Round-off: $2.362 \\pm 0.0005$, $1.76 \\pm 0.005$, $1.46 \\pm 0.005$, $0.785 \\pm 0.0005$.', 'Relative error $\\le \\tfrac{0.0005}{2.362} + \\tfrac{0.005}{1.76} + \\tfrac{0.005}{1.46} + \\tfrac{0.0005}{0.785} = 0.00711$.', 'Absolute error $\\le 3.6272 \\times 0.00711 = 0.0258$.', 'Limits: $3.6014$ to $3.6530$.'],
          answer: '$3.6272$, with the true value between $3.6014$ and $3.6530$.',
        },
        {
          title: '$x^2 - 2 + \\tfrac{1}{x^2}$ at $x = 1.473$',
          question: 'Evaluate, and estimate the maximum error if $1.473$ carries the maximum round-off error.',
          steps: ['Value $= 0.6306$.', '$\\Delta x = 0.0005$.', '$f\'(x) = 2x - \\tfrac{2}{x^3} = 2.3202$ at $x = 1.473$.', '$\\Delta f \\approx 2.3202 \\times 0.0005 = 0.00116$.'],
          answer: '$0.6306 \\pm 0.0012$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'A quotient from rounded data',
          body: '“Evaluate $\\dfrac{2.362 \\times 1.76}{1.46 \\times 0.785}$. Then, assuming maximum round-off error in your data, estimate the limits between which your value lies.”\n\n**What the examiner wants:** the value; the round-off of each number (half a unit of its last digit); the relative errors added, because it is all products and quotients; the absolute error; and the two limits. Everything is in **Examples** in your notes.',
          asides: [{ label: 'Exam tip', text: 'State the round-off of each number before using it ($1.76 \\pm 0.005$, not $\\pm 0.0005$). It depends on that number’s own last digit.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$\\dfrac{2.362 \\times 1.76}{1.46 \\times 0.785}$',
          graph: {
            steps: [
              { ask: 'Value, to 4 dp?', answer: 3.6272, tol: 0.0001, hint: 'Multiply the top, multiply the bottom, divide.' },
              { ask: 'Sum of the four relative errors (to 5 dp)?', answer: 0.00711, tol: 0.00002, hint: '$\\tfrac{0.0005}{2.362} + \\tfrac{0.005}{1.76} + \\tfrac{0.005}{1.46} + \\tfrac{0.0005}{0.785}$.' },
              { ask: 'Absolute error, to 4 dp?', answer: 0.0258, tol: 0.0002, hint: '$3.6272 \\times 0.00711$.' },
              { ask: 'Lower limit of the true value?', answer: 3.6014, tol: 0.0003, hint: '$3.6272 - 0.0258$.' },
            ],
            after: 'The true value lies between $3.6014$ and $3.6530$: only about two digits of $3.6272$ can be trusted.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'For $x - y$ with $x = 5.2 \\pm 0.05$ and $y = 3.1 \\pm 0.05$, a student writes “error $= 0.05 - 0.05 = 0$”. What is right?',
          options: [
            { text: 'Error $\\le 0.05 + 0.05 = 0.1$', correct: true, why: 'In the worst case the two errors point opposite ways, so they add.' },
            { text: 'Error $= 0$, as written', why: 'That assumes both errors are equal and the same sign, which isn’t known.' },
            { text: 'Error $= 0.05$', why: 'Each input contributes its full error.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$x^2 - 2 + \\tfrac{1}{x^2}$ at $x = 1.473$',
          graph: {
            steps: [
              { ask: 'Value, to 4 dp?', answer: 0.6306, tol: 0.0001, hint: '$1.473^2 = 2.1697$; then subtract $2$ and add $\\tfrac{1}{2.1697}$.' },
              { ask: '$f\'(x) = 2x - \\tfrac{2}{x^3}$ at $1.473$, to 4 dp?', answer: 2.3202, tol: 0.0002, hint: '$2.946 - \\tfrac{2}{3.1960}$.' },
              { ask: 'Maximum error, $|f\'(x)| \\times 0.0005$?', answer: 0.00116, tol: 0.00002, hint: '$2.3202 \\times 0.0005$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can track an error through a calculation.',
          body: '**Summary:** sums and differences add absolute errors; products and quotients add relative errors; a function multiplies the error by $|f\'|$; rounded data are out by half a unit of the last digit.\n\n**Next:** the **binomial expansion**, the first way to swap a hard expression for an easy polynomial. Its dropped terms are a truncation error you can now measure.',
        },
      ],
    },
  ],
};
