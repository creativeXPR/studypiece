// MTH 209 · Approximations · Lesson 3: the exponential series.

export default {
  id: 'exponential-series',
  title: 'The exponential series',
  covers: 'eˣ = Σ xⁿ/n!, computing e^0.5 and e, how many terms you need, e^0.2 to 4 d.p.',
  minutes: 12,
  sections: [
    {
      name: 'The series for eˣ',
      terms: [
        ['Exponential series', '$e^x = 1 + x + \\dfrac{x^2}{2!} + \\dfrac{x^3}{3!} + \\cdots = \\sum_{n=0}^{\\infty}\\dfrac{x^n}{n!}$, valid for every real $x$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Approximations · Lesson 3',
          title: 'The easiest Maclaurin series of all',
          body: 'For $f(x) = e^x$, **every** derivative is $e^x$ again, so at $x = 0$ every derivative equals $1$.\n\nPut that into Maclaurin’s formula:\n$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\cdots = \\sum_{n=0}^{\\infty}\\frac{x^n}{n!}.$$\n\nThis is the ==exponential series==. Because $n!$ grows so fast, it converges for **every** $x$.',
          cta: 'Use it',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'What is the coefficient of $x^4$ in the series for $e^x$?',
          options: [
            { text: '$\\dfrac{1}{24}$', correct: true, why: '$\\frac{x^4}{4!}$ and $4! = 24$.' },
            { text: '$\\dfrac14$', why: 'Divide by $4!$, not $4$.' },
            { text: '$1$', why: 'Every derivative at $0$ is $1$, but each term is still divided by $n!$.' },
            { text: '$-\\dfrac{1}{24}$', why: 'All terms of $e^x$ are positive. Alternating signs belong to $e^{-x}$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Compute $e^{0.5}$',
          body: '$$\\begin{array}{c|c|c} n & \\dfrac{0.5^n}{n!} & \\text{running sum} \\\\ \\hline 0 & 1 & 1 \\\\ 1 & 0.5 & 1.5 \\\\ 2 & 0.125 & 1.625 \\\\ 3 & 0.0208333 & 1.6458333 \\\\ 4 & 0.0026042 & 1.6484375 \\\\ 5 & 0.0002604 & 1.6486979 \\\\ 6 & 0.0000217 & 1.6487196 \\\\ 7 & 0.0000016 & 1.6487212 \\end{array}$$\n\nTrue value $1.6487213$. Each term is the previous one $\\times \\frac{x}{n}$, which saves you recomputing factorials.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'To get $e = e^1$ correct to 4 d.p., where can you stop?',
          options: [
            { text: 'After the $\\frac{1}{7!}$ term: $e \\approx 2.71825$, which rounds to $2.7183$', correct: true, why: 'The next term is $\\frac{1}{8!} \\approx 0.0000248$ and the whole tail is under $0.00003$, smaller than $0.00005$. So 8 terms ($n = 0$ to $7$) suffice.' },
            { text: 'After the $\\frac{1}{4!}$ term', why: 'That gives $2.70833$: the next term $\\frac{1}{5!} = 0.0083$ is far too big.' },
            { text: 'After the $\\frac{1}{5!}$ term', why: 'That gives $2.71667$: still out in the third decimal place.' },
            { text: 'You need infinitely many terms', why: 'For a fixed accuracy, a finite number of terms is enough.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Series: in use.',
          recap: [
            '$e^x = \\sum \\frac{x^n}{n!}$ for every $x$.',
            'Stop when the next term is smaller than the accuracy you need.',
          ],
          why: 'Two more things: negative $x$, and a full exam answer.',
        },
      ],
    },
    {
      name: 'Negative powers and accuracy',
      screens: [
        {
          type: 'story',
          eyebrow: 'Negative x',
          title: '$e^{-x}$: the signs alternate',
          body: 'Replace $x$ by $-x$:\n$$e^{-x} = 1 - x + \\frac{x^2}{2!} - \\frac{x^3}{3!} + \\cdots$$\nFor $e^{-1}$: $1 - 1 + 0.5 - 0.166667 + 0.041667 - 0.008333 + 0.001389 = 0.368056$, against the true $0.367879$.\n\nIn an ==alternating series== with shrinking terms, the error is smaller than the **first term you leave out**. Here that is $\\frac{1}{7!} \\approx 0.0002$.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'The exponential series converges for every real $x$.', correct: true, why: '**All $x$**: $\\frac{x^n}{n!} \\to 0$ for any fixed $x$.' },
            { text: 'Fewer terms are needed for $e^{0.1}$ than for $e^{2}$.', correct: true, why: '**Smaller $|x|$**, faster-shrinking terms.' },
            { text: 'Each term equals the previous term times $\\frac{x}{n}$.', correct: true, why: '**Ratio of terms**: $\\frac{x^n/n!}{x^{n-1}/(n-1)!} = \\frac{x}{n}$.' },
            { text: 'The series for $e^{-x}$ has all positive terms.', why: '**Odd powers are negative**: the signs alternate.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the method',
          prompt: 'Put the steps for evaluating $e^x$ to a given accuracy in order.',
          items: [
            'Write $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$ and substitute $x$.',
            'Compute each term from the last one by multiplying by $\\frac{x}{n}$.',
            'Keep a running total.',
            'Stop when the next term is smaller than the accuracy asked for.',
            'Round the total to the required decimal places.',
          ],
          explain: 'Set the work out as a table of $n$, term and running sum, like the $e^{0.5}$ example.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Use the exponential series to evaluate $e^{0.2}$ to 4 d.p.',
          body: '$$e^{x} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\cdots,\\quad x = 0.2:$$\n$$e^{0.2} = 1 + 0.2 + 0.02 + 0.0013333 + 0.0000667 + \\cdots = 1.2214000.$$\nThe next term is $\\frac{0.2^5}{5!} \\approx 0.0000027 < 0.00005$, so it cannot change the 4th decimal place. Hence $e^{0.2} = 1.2214$ (4 d.p.).',
        },
        {
          type: 'finish',
          title: 'Approximations: done.',
          body: 'You’ve covered the binomial, Taylor, Maclaurin and exponential series. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
