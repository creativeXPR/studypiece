// MTH 209 · Idea A, lesson 3: binomial expansion. Part 1 builds (1 + x)ⁿ for whole n, then any n
// with |x| < 1, on simple cases ((1 + x)³, √1.1). Part 2 handles the exam forms: factoring out to get
// (1 + u)ⁿ, multiplying two series to x³, and negative powers.

export default {
  id: 'binomial',
  title: 'Binomial expansion',
  covers: 'Expanding (1 + x)ⁿ for any n, when it is valid, and multiplying series to a given power',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Binomial series', '$(1 + x)^n = 1 + nx + \\dfrac{n(n-1)}{2!}x^2 + \\dfrac{n(n-1)(n-2)}{3!}x^3 + \\cdots$'],
        ['Validity', 'For a whole number $n \\ge 0$ the series stops and holds for all $x$. For any other $n$ it is infinite and holds only for $|x| < 1$.'],
      ],
      steps: [
        'Get the bracket into the form $(1 + u)^n$: factor out the constant if needed, e.g. $(2 + 3x)^{-1} = \\tfrac12\\left(1 + \\tfrac{3x}{2}\\right)^{-1}$.',
        'Write $1 + nu + \\tfrac{n(n-1)}{2!}u^2 + \\tfrac{n(n-1)(n-2)}{3!}u^3 + \\cdots$ with your $n$ and $u$.',
        'Simplify each term, keeping powers up to the one asked for.',
        'State validity: $|u| < 1$ (unless $n$ is a whole number $\\ge 0$).',
        'To approximate a number, choose $x$ so the bracket matches it, then add the terms.',
      ],
      examples: [
        {
          title: '$(1 + x)^{1/2}$ and $\\sqrt{1.1}$',
          question: 'Expand $(1 + x)^{1/2}$ to the $x^2$ term, and use it to estimate $\\sqrt{1.1}$.',
          steps: ['$n = \\tfrac12$: $1 + \\tfrac12x + \\tfrac{\\frac12(-\\frac12)}{2}x^2 = 1 + \\tfrac12x - \\tfrac18x^2$.', 'Valid for $|x| < 1$.', '$x = 0.1$: $1 + 0.05 - 0.00125 = 1.04875$.', 'True value $1.0488088$, error about $0.00006$.'],
          answer: '$\\sqrt{1.1} \\approx 1.04875$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea A · Lesson 3',
          title: 'Swapping a power for a polynomial',
          body: 'We can now measure errors. Next: **why approximating works at all**.\n\nExpressions like $\\sqrt{1.1}$ or $\\dfrac{1}{2 + 3x}$ are awkward to compute. The binomial expansion turns $(1 + x)^n$ into a polynomial, $1 + nx + \\cdots$, that only needs $+$ and $\\times$. Keep a few terms and the rest is a truncation error you can estimate.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Start with what you know',
          body: 'Multiply out $(1 + x)^3 = 1 + 3x + 3x^2 + x^3$. The coefficients follow a pattern: $1,\\ n,\\ \\tfrac{n(n-1)}{2!},\\ \\tfrac{n(n-1)(n-2)}{3!}$. With $n = 3$ that gives $1, 3, 3, 1$, and the next one is $0$, so it stops.\n\nUse the same pattern for $n = -1$ or $n = \\tfrac12$ and it **never stops**: an infinite series. It only adds up to the right answer when $|x| < 1$, so the terms shrink.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Expanding any binomial',
          body: '1. Make the bracket $(1 + u)^n$, factoring out a constant if needed.\n2. Write $1 + nu + \\tfrac{n(n-1)}{2!}u^2 + \\tfrac{n(n-1)(n-2)}{3!}u^3 + \\cdots$.\n3. Simplify, keeping the powers asked for.\n4. State validity, $|u| < 1$.\n5. To approximate a number, pick $x$ to match it and add the terms.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$(1 + x)^{-1}$',
          body: '**Steps 1–2.** $n = -1$, $u = x$: $1 + (-1)x + \\tfrac{(-1)(-2)}{2}x^2 + \\tfrac{(-1)(-2)(-3)}{6}x^3$.\n\n**Step 3.** $1 - x + x^2 - x^3 + \\cdots$\n\n**Step 4.** Valid for $|x| < 1$.\n\n**Step 5.** $\\tfrac{1}{1.1} = (1 + 0.1)^{-1} \\approx 1 - 0.1 + 0.01 - 0.001 = 0.909$. True: $0.90909\\ldots$',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$(1 + x)^{1/2}$ and $\\sqrt{1.1}$',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$ in $(1 + x)^{1/2}$?', answer: 0.5, tol: 0.001, hint: 'It is $n$.' },
              { ask: 'Coefficient of $x^2$, $\\tfrac{n(n-1)}{2}$ with $n = \\tfrac12$?', answer: -0.125, tol: 0.001, hint: '$\\tfrac{\\frac12 \\times (-\\frac12)}{2}$.' },
              { ask: 'So $\\sqrt{1.1} \\approx 1 + 0.05 - 0.00125 = $?', answer: 1.04875, tol: 0.00001, hint: 'Put $x = 0.1$.' },
            ],
            after: 'True $\\sqrt{1.1} = 1.0488088$: three terms are already correct to 4 dp.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Expand** to a given power, such as $(1 + \\tfrac12x)^6$ or $(2 + 3x)^{-1}$ “as far as the $x^3$ term”.\n• **Combine:** multiply or divide two expansions and collect powers up to $x^3$.\n• **Approximate** a number such as $\\sqrt{1.1}$ or $\\tfrac{1}{0.98}$.\n• **State** the range of $x$ for which the expansion is valid.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Factor out first: $(2 + 3x)^{-1} = 2^{-1}\\left(1 + \\tfrac{3x}{2}\\right)^{-1} = \\tfrac12\\left(1 + \\tfrac{3x}{2}\\right)^{-1}$, valid for $|x| < \\tfrac23$.',
        'Expand each factor only as far as the power asked for.',
        'Multiply out in a table: for $x^k$, add every product of a term in $x^i$ from one series and $x^j$ from the other with $i + j = k$.',
        'Mistake: forgetting to raise the factored constant to the power $n$ (it is $2^{-1}$, not $2$).',
        'Mistake: using the series when $|u| \\ge 1$; it no longer converges.',
      ],
      examples: [
        {
          title: '$\\dfrac{2 + (1 + \\frac12 x)^6}{2 + 3x}$ to $x^3$',
          question: 'Use the expansions of $(1 + \\tfrac12x)^6$ and $(2 + 3x)^{-1}$ to express this in ascending powers of $x$ as far as the $x^3$ term.',
          steps: ['$(1 + \\tfrac12x)^6 = 1 + 3x + \\tfrac{15}{4}x^2 + \\tfrac52x^3 + \\cdots$, so the top is $3 + 3x + \\tfrac{15}{4}x^2 + \\tfrac52x^3$.', '$(2 + 3x)^{-1} = \\tfrac12\\left(1 - \\tfrac32x + \\tfrac94x^2 - \\tfrac{27}{8}x^3 + \\cdots\\right)$, valid for $|x| < \\tfrac23$.', 'Multiply and collect: $x^0$: $3$; $x^1$: $3 - \\tfrac92 = -\\tfrac32$; $x^2$: $\\tfrac{27}{4} - \\tfrac92 + \\tfrac{15}{4} = 6$; $x^3$: $-\\tfrac{81}{8} + \\tfrac{27}{4} - \\tfrac{45}{8} + \\tfrac52 = -\\tfrac{13}{2}$.', 'Times $\\tfrac12$.'],
          answer: '$\\tfrac32 - \\tfrac34x + 3x^2 - \\tfrac{13}{4}x^3$.',
        },
        {
          title: '$(x + y)^{-4}$',
          question: 'Expand $(x + y)^{-4}$ using the binomial expansion.',
          steps: ['Factor out $x$: $(x + y)^{-4} = x^{-4}\\left(1 + \\tfrac{y}{x}\\right)^{-4}$.', '$n = -4$: $1 - 4u + 10u^2 - 20u^3 + \\cdots$ with $u = \\tfrac{y}{x}$.', 'Valid for $\\left|\\tfrac{y}{x}\\right| < 1$.'],
          answer: '$x^{-4}\\left(1 - \\tfrac{4y}{x} + \\tfrac{10y^2}{x^2} - \\tfrac{20y^3}{x^3} + \\cdots\\right)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Two expansions, one answer',
          body: '“Use the expansions for $(1 + \\tfrac12x)^6$ and $(2 + 3x)^{-1}$ to express $\\dfrac{2 + (1 + \\frac12x)^6}{2 + 3x}$ in ascending powers of $x$ as far as the $x^3$ term.”\n\n**What the examiner wants:** each expansion shown; the $2$ factored out of $(2 + 3x)^{-1}$; a tidy collection of each power; and the range $|x| < \\tfrac23$. The full solution is under **Examples** in the side panel.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'Building the answer',
          graph: {
            steps: [
              { ask: 'Coefficient of $x^2$ in $(1 + \\tfrac12x)^6$, i.e. $\\tbinom{6}{2}\\left(\\tfrac12\\right)^2$?', answer: 3.75, tol: 0.001, hint: '$15 \\times \\tfrac14$.' },
              { ask: '$(2 + 3x)^{-1} = \\tfrac12(1 + u)^{-1}$. What is $u$?', options: ['$\\tfrac{3x}{2}$', '$3x$', '$\\tfrac{2}{3x}$'], answer: 0, hint: 'Divide the bracket by $2$.' },
              { ask: 'Constant term of the final answer?', answer: 1.5, tol: 0.001, hint: 'Top constant $3$, times $\\tfrac12$.' },
              { ask: 'Coefficient of $x$ in the final answer?', answer: -0.75, tol: 0.001, hint: '$\\tfrac12\\left(3 - 3 \\times \\tfrac32\\right)$.' },
            ],
            after: 'Carrying on the same way: $\\tfrac32 - \\tfrac34x + 3x^2 - \\tfrac{13}{4}x^3$, valid for $|x| < \\tfrac23$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student writes $(2 + 3x)^{-1} = 2\\left(1 + \\tfrac{3x}{2}\\right)^{-1}$. What is wrong?',
          options: [
            { text: 'The factored $2$ must also be raised to $-1$: it should be $\\tfrac12$', correct: true, why: '$(2(1 + u))^{-1} = 2^{-1}(1 + u)^{-1}$.' },
            { text: 'Nothing', why: 'Check by putting $x = 0$: the left side is $\\tfrac12$, the right side is $2$.' },
            { text: 'It should be $(1 + 3x)^{-1}$', why: 'You can’t drop the $2$; factor it out properly.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$(1 - 2x)^{-1/2}$ to $x^3$',
          graph: {
            steps: [
              { ask: 'Coefficient of $x$?', answer: 1, tol: 0.001, hint: '$n u$ with $n = -\\tfrac12$, $u = -2x$.' },
              { ask: 'Coefficient of $x^2$?', answer: 1.5, tol: 0.001, hint: '$\\tfrac{(-\\frac12)(-\\frac32)}{2}(-2)^2$.' },
              { ask: 'Coefficient of $x^3$?', answer: 2.5, tol: 0.001, hint: '$\\tfrac{(-\\frac12)(-\\frac32)(-\\frac52)}{6}(-2)^3$.' },
              { ask: 'Valid for…', options: ['$|x| < \\tfrac12$', '$|x| < 1$', '$|x| < 2$'], answer: 0, hint: 'Need $|2x| < 1$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can expand any binomial.',
          body: '**Summary:** $(1 + u)^n = 1 + nu + \\tfrac{n(n-1)}{2!}u^2 + \\cdots$; factor out a constant (raised to the power $n$) to get the form $(1 + u)$; valid for $|u| < 1$ unless $n$ is a whole number.\n\n**Next:** the **Taylor series**, which does the same trick for *any* smooth function, not just powers. The binomial series turns out to be one special case of it.',
        },
      ],
    },
  ],
};
