// MTH 209 · Idea A, lesson 5: exponential and special series. Part 1 lists the series exams expect
// from memory (eˣ, ln(1 + x), tan⁻¹x) and substitution, on simple values (e^0.1). Part 2 does the
// past-paper forms: 2ˣ = e^(x ln 2), tan⁻¹(0.2) and ln(1.1) to 3 dp, and matching coefficients.

export default {
  id: 'special-series',
  title: 'Exponential and special series',
  covers: 'eˣ, 2ˣ, ln(1 + x) and tan⁻¹x from memory, substituting into series, and matching coefficients',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Exponential series', '$e^x = 1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots$, for every $x$.'],
        ['Logarithmic series', '$\\ln(1 + x) = x - \\dfrac{x^2}{2} + \\dfrac{x^3}{3} - \\cdots$, for $-1 < x \\le 1$.'],
        ['Inverse tangent series', '$\\tan^{-1}x = x - \\dfrac{x^3}{3} + \\dfrac{x^5}{5} - \\cdots$, for $|x| \\le 1$.'],
      ],
      steps: [
        'Pick the standard series that matches the shape: $e^{(\\cdot)}$, $\\ln(1 + \\cdot)$, $\\tan^{-1}(\\cdot)$, $(1 + \\cdot)^n$.',
        'Rewrite the expression into that shape: $2^x = e^{x\\ln 2}$, $e^{-x}$ means put $-x$, $\\ln(1.1) = \\ln(1 + 0.1)$.',
        'Substitute into the series and simplify, keeping the powers asked for.',
        'Check the validity range ($\\ln$ needs $-1 < x \\le 1$; $\\tan^{-1}$ needs $|x| \\le 1$).',
        'For “to $d$ dp”: add terms until the next one is smaller than $\\tfrac12 \\times 10^{-d}$, then round.',
      ],
      examples: [
        {
          title: '$e^{0.1}$ from three terms',
          question: 'Estimate $e^{0.1}$ using three terms of the exponential series.',
          steps: ['$e^x \\approx 1 + x + \\tfrac{x^2}{2}$.', '$x = 0.1$: $1 + 0.1 + 0.005 = 1.105$.', 'True $1.10517$; the next term $\\tfrac{0.001}{6} \\approx 0.00017$ is the error.'],
          answer: '$e^{0.1} \\approx 1.105$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea A · Lesson 5',
          title: 'The series to know by heart',
          body: 'Taylor series can be built for any function, but a few come up so often that exams expect them **from memory**: $e^x$, $\\ln(1 + x)$ and $\\tan^{-1}x$, alongside the binomial series.\n\nKnow these, and most series questions become “rewrite, substitute, simplify”, with no differentiating at all.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Three Maclaurin series',
          body: '$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots \\quad\\text{(all } x\\text{)}$$\n$$\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\cdots \\quad (-1 < x \\le 1)$$\n$$\\tan^{-1}x = x - \\frac{x^3}{3} + \\frac{x^5}{5} - \\cdots \\quad (|x| \\le 1)$$\nEach comes from the last lesson’s recipe. Notice that $\\ln$ and $\\tan^{-1}$ alternate in sign and have **no factorials**.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Using a standard series',
          body: '1. Spot the shape: $e^{(\\cdot)}$, $\\ln(1 + \\cdot)$, $\\tan^{-1}(\\cdot)$.\n2. Rewrite into it: $2^x = e^{x\\ln 2}$; $\\ln 1.1 = \\ln(1 + 0.1)$.\n3. Substitute and simplify.\n4. Check the validity range.\n5. For $d$ dp, stop when the next term is below $\\tfrac12 \\times 10^{-d}$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$e^{-x}$ and $e^{0.1}$',
          body: '**Steps 1–3.** Put $-x$ into the $e^x$ series: $e^{-x} = 1 - x + \\tfrac{x^2}{2} - \\tfrac{x^3}{6} + \\cdots$. Every odd power flips sign.\n\n**Step 5.** $e^{0.1} \\approx 1 + 0.1 + 0.005 = 1.105$. The next term, $\\tfrac{0.001}{6} = 0.00017$, shows this is good to 3 dp (true: $1.10517$).',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$\\ln(1.1)$ to 3 dp',
          graph: {
            steps: [
              { ask: 'In $\\ln(1 + x)$, what is $x$?', answer: 0.1, tol: 0.0001, hint: '$1.1 = 1 + 0.1$.' },
              { ask: 'Second term, $-\\tfrac{x^2}{2}$?', answer: -0.005, tol: 0.00001, hint: '$-\\tfrac{0.01}{2}$.' },
              { ask: 'Sum of $x - \\tfrac{x^2}{2} + \\tfrac{x^3}{3}$, to 6 dp?', answer: 0.095333, tol: 0.000002, hint: '$0.1 - 0.005 + 0.000333$.' },
              { ask: 'So $\\ln 1.1$ to 3 dp is…', answer: 0.095, tol: 0.0001, hint: 'The next term, $-0.000025$, can’t change the third decimal.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **State** the series for $\\tan^{-1}x$ and $\\ln(1 + x)$ “up to the $n$th term”, then **evaluate** $\\tan^{-1}(0.2)$ or $\\ln(1.1)$ to 3 dp.\n• **Rewrite and expand:** “by writing $2^x$ as $e^{x\\ln 2}$, find the expansion of $2^x$”.\n• **Match coefficients:** find constants $a, b$ so that $e^{-x} \\approx \\dfrac{1 + ax}{1 + bx}$ for small $x$.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        '$2^x$: write $2^x = e^{x\\ln 2}$, then use $e^u$ with $u = x\\ln 2$: $2^x = 1 + x\\ln 2 + \\tfrac{(x\\ln 2)^2}{2!} + \\tfrac{(x\\ln 2)^3}{3!} + \\cdots$',
        'Matching coefficients: expand both sides as series in $x$, set the coefficients of $1, x, x^2, \\ldots$ equal, and solve for the unknowns. You need as many equations as unknowns.',
        'To divide by $1 + bx$, multiply by $(1 + bx)^{-1} = 1 - bx + b^2x^2 - \\cdots$ (binomial).',
        'Mistake: using $\\ln(1 + x)$ with $|x| > 1$, e.g. $\\ln 3$ with $x = 2$. Rewrite first.',
        'Mistake: adding factorials to the $\\ln$ or $\\tan^{-1}$ series. They have plain $2, 3, 5$ denominators.',
      ],
      examples: [
        {
          title: '$\\tan^{-1}(0.2)$ to 3 dp',
          question: 'State the series for $\\tan^{-1}x$ and use it to evaluate $\\tan^{-1}(0.2)$ to 3 dp.',
          steps: ['$\\tan^{-1}x = x - \\tfrac{x^3}{3} + \\tfrac{x^5}{5} - \\cdots$, valid for $|x| \\le 1$.', '$x = 0.2$: $0.2 - \\tfrac{0.008}{3} + \\tfrac{0.00032}{5} = 0.2 - 0.0026667 + 0.000064 = 0.1973973$.', 'The next term is about $0.0000018$, too small to matter.'],
          answer: '$\\tan^{-1}(0.2) = 0.197$ to 3 dp.',
        },
        {
          title: '$e^{-x} \\approx \\dfrac{1 + ax}{1 + bx}$',
          question: 'Find non-zero constants $a$ and $b$ such that $e^{-x} = \\dfrac{1 + ax}{1 + bx}$ for small $x$.',
          steps: ['Right side: $(1 + ax)(1 - bx + b^2x^2 - \\cdots) = 1 + (a - b)x + (b^2 - ab)x^2 + \\cdots$', 'Left side: $1 - x + \\tfrac{x^2}{2} - \\cdots$', 'Match $x$: $a - b = -1$. Match $x^2$: $b(b - a) = \\tfrac12$, so $b = \\tfrac12$.', 'Then $a = b - 1 = -\\tfrac12$.'],
          answer: '$a = -\\tfrac12$, $b = \\tfrac12$: $e^{-x} \\approx \\dfrac{1 - x/2}{1 + x/2}$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: '$2^x$ as an exponential',
          body: '“By writing $2^x$ as $e^{x\\ln 2}$, find the expansion of $2^x$.”\n\n**What the examiner wants:** the substitution $u = x\\ln 2$ stated, then the $e^u$ series written out:\n$$2^x = 1 + x\\ln 2 + \\frac{(x\\ln 2)^2}{2!} + \\frac{(x\\ln 2)^3}{3!} + \\cdots$$\nLeave $\\ln 2$ in exact form unless asked for decimals. Check: at $x = 0.5$, four terms give $1.4136$, close to $\\sqrt2 = 1.4142$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'Matching: $e^{-x} \\approx \\dfrac{1 + ax}{1 + bx}$',
          graph: {
            steps: [
              { ask: 'The right side expands to $1 + (a - b)x + (b^2 - ab)x^2 + \\cdots$. Matching the $x$ term with $e^{-x}$ gives $a - b = $?', answer: -1, tol: 0.001, hint: 'The $x$ coefficient of $e^{-x}$ is $-1$.' },
              { ask: 'The $x^2$ term: $b(b - a) = \\tfrac12$. Since $b - a = 1$, $b = $?', answer: 0.5, tol: 0.001, hint: '$b \\times 1 = \\tfrac12$.' },
              { ask: 'Then $a = $?', answer: -0.5, tol: 0.001, hint: '$a = b - 1$.' },
            ],
            after: '$e^{-x} \\approx \\dfrac{1 - x/2}{1 + x/2}$: two unknowns, so match two coefficients ($x$ and $x^2$).',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student estimates $\\ln 3$ by putting $x = 2$ into $\\ln(1 + x) = x - \\tfrac{x^2}{2} + \\tfrac{x^3}{3} - \\cdots$ What is wrong?',
          options: [
            { text: 'The series only works for $-1 < x \\le 1$; with $x = 2$ the terms grow and it diverges', correct: true, why: '$2 - 2 + 2.67 - 4 + \\cdots$ never settles. Rewrite first, e.g. $\\ln 3 = \\ln\\left(\\tfrac{1 + 1/2}{1 - 1/2}\\right)$.' },
            { text: 'Nothing; just add more terms', why: 'More terms make it worse: they grow.' },
            { text: 'The series needs factorials', why: '$\\ln(1 + x)$ has no factorials.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$\\tan^{-1}(0.2)$ to 3 dp',
          graph: {
            steps: [
              { ask: 'Second term, $-\\tfrac{x^3}{3}$ at $x = 0.2$ (to 7 dp)?', answer: -0.0026667, tol: 0.0000002, hint: '$-\\tfrac{0.008}{3}$.' },
              { ask: 'Third term, $\\tfrac{x^5}{5}$?', answer: 0.000064, tol: 0.000001, hint: '$\\tfrac{0.00032}{5}$.' },
              { ask: '$\\tan^{-1}(0.2)$ to 3 dp?', answer: 0.197, tol: 0.0001, hint: '$0.2 - 0.0026667 + 0.000064 = 0.19740$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Idea A is complete.',
          body: '**Summary:** know $e^x$, $\\ln(1 + x)$ and $\\tan^{-1}x$ by heart; rewrite into their shape, substitute, check validity; match coefficients to find unknown constants.\n\n**Idea A in one line:** measure error, and swap hard functions for polynomials whose dropped terms *are* the error.\n\n**Next, Idea B:** finding where an equation balances, $f(x) = 0$, starting with **bisection**. Every method there is judged by the error ideas you now have.',
        },
      ],
    },
  ],
};
