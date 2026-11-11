// MTH 209 · Idea A, lesson 4: Taylor and Maclaurin series. Part 1 builds the series from matching
// derivatives on a simple polynomial (x² + x about 1) and eˣ; Part 2 does cos 2x and the Taylor
// series method for an IVP (y′ = 3x + y², a past-paper question).

export default {
  id: 'taylor',
  title: 'Taylor and Maclaurin series',
  covers: 'Copying a function near a point with a polynomial, the remainder, and the Taylor method for y′ = f(x, y)',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Taylor series about $a$', '$f(x) = f(a) + f\'(a)(x - a) + \\dfrac{f\'\'(a)}{2!}(x - a)^2 + \\dfrac{f\'\'\'(a)}{3!}(x - a)^3 + \\cdots$'],
        ['Maclaurin series', 'The Taylor series about $a = 0$: $f(0) + f\'(0)x + \\dfrac{f\'\'(0)}{2!}x^2 + \\cdots$'],
        ['Remainder', 'Stopping after the $x^n$ term leaves error $\\dfrac{f^{(n+1)}(\\xi)}{(n+1)!}(x - a)^{n+1}$ for some $\\xi$ between $a$ and $x$.'],
      ],
      steps: [
        'Choose the point $a$: $a = 0$ for Maclaurin, or the given point.',
        'Differentiate $f$ as many times as you need terms.',
        'Evaluate each derivative **at $a$**, not at $x$.',
        'Build $f(a) + f\'(a)(x - a) + \\tfrac{f\'\'(a)}{2!}(x - a)^2 + \\tfrac{f\'\'\'(a)}{3!}(x - a)^3 + \\cdots$, with the factorials.',
        'To estimate, put in the value of $x$. The first dropped term shows the size of the error.',
      ],
      examples: [
        {
          title: '$f(x) = x^2 + x$ about $a = 1$',
          question: 'Write the Taylor series of $x^2 + x$ about $x = 1$.',
          steps: ['$f(1) = 2$, $f\'(x) = 2x + 1$ so $f\'(1) = 3$, $f\'\'(x) = 2$, and higher derivatives are $0$.', '$f(x) = 2 + 3(x - 1) + \\tfrac22(x - 1)^2$.', 'Check at $x = 2$: $2 + 3 + 1 = 6 = 2^2 + 2$.'],
          answer: '$2 + 3(x - 1) + (x - 1)^2$, exact because $f$ is a polynomial.',
        },
        {
          title: '$e^{0.5}$ from four terms',
          question: 'Use the Maclaurin series of $e^x$ to four terms to estimate $e^{0.5}$.',
          steps: ['Every derivative of $e^x$ is $e^x$, and equals $1$ at $0$.', '$e^x \\approx 1 + x + \\tfrac{x^2}{2} + \\tfrac{x^3}{6}$.', '$x = 0.5$: $1 + 0.5 + 0.125 + 0.0208333 = 1.6458333$.', 'True $1.6487213$: error $0.0029$.'],
          answer: '$e^{0.5} \\approx 1.64583$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea A · Lesson 4',
          title: 'Any smooth function, as a polynomial',
          body: 'The binomial series did this for $(1 + x)^n$. The **Taylor series** does it for any smooth function: $e^x$, $\\cos x$, $\\ln x$, even the unknown solution $y(x)$ of a differential equation.\n\nIt is the second engine of the whole course. Newton’s method, finite differences and Euler’s method are all Taylor series cut short.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Match the value, the slope, the bend…',
          body: 'To copy $f$ near a point $a$, build a polynomial that agrees with $f$ at $a$ in **value**, **slope** ($f\'$), **bend** ($f\'\'$), and so on.\n\nA term $c_k(x - a)^k$ has $k$-th derivative $k!\\,c_k$ at $a$. To match $f^{(k)}(a)$ we need $c_k = \\dfrac{f^{(k)}(a)}{k!}$. That is where the factorials come from.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Building a Taylor series',
          body: '1. Choose $a$ ($a = 0$ gives the **Maclaurin** series).\n2. Differentiate as many times as you need terms.\n3. Evaluate each derivative **at $a$**.\n4. Write $f(a) + f\'(a)(x - a) + \\tfrac{f\'\'(a)}{2!}(x - a)^2 + \\tfrac{f\'\'\'(a)}{3!}(x - a)^3 + \\cdots$\n5. Substitute $x$ to estimate. The first dropped term is roughly the error.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2 + x$ about $a = 1$',
          body: '**Steps 1–3.** $f(1) = 2$; $f\'(x) = 2x + 1$, so $f\'(1) = 3$; $f\'\'(x) = 2$; every higher derivative is $0$.\n\n**Step 4.** $f(x) = 2 + 3(x - 1) + \\tfrac{2}{2!}(x - 1)^2 = 2 + 3(x - 1) + (x - 1)^2$.\n\n**Step 5.** Check at $x = 2$: $2 + 3 + 1 = 6$, and $2^2 + 2 = 6$. For a polynomial the series is exact; for other functions it goes on forever.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$e^{0.5}$ from the Maclaurin series',
          graph: {
            steps: [
              { ask: 'Every derivative of $e^x$ at $x = 0$ equals…?', answer: 1, tol: 0.001, hint: '$e^0$.' },
              { ask: 'Third term, $\\tfrac{x^2}{2!}$ at $x = 0.5$?', answer: 0.125, tol: 0.0001, hint: '$\\tfrac{0.25}{2}$.' },
              { ask: '$1 + 0.5 + 0.125 + \\tfrac{0.125}{6}$, to 5 dp?', answer: 1.64583, tol: 0.00001, hint: 'The last term is $0.0208333$.' },
            ],
            after: 'True $e^{0.5} = 1.64872$. The next term, $\\tfrac{0.5^4}{24} = 0.0026$, is about the size of the error.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Expand:** the Maclaurin series of $\\cos 2x$, $e^{-x}$ or $\\ln(1 + x)$ to a given power.\n• **Estimate** a value from the series, and bound the error with the remainder.\n• **Taylor method for an ODE:** given $y\' = f(x, y)$ and $y(a)$, find $y\'(a), y\'\'(a), \\ldots$ and estimate $y$ at a nearby point.\n• **Distinguish** the Taylor series method from other ODE methods, in a sentence.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'For $\\cos(kx)$, $\\sin(kx)$ or $e^{kx}$: either differentiate directly, or substitute $kx$ into the known series of $\\cos x$, $\\sin x$ or $e^x$ (faster).',
        'Taylor method for $y\' = f(x, y)$, $y(a)$ given: (1) $y\'(a) = f(a, y(a))$; (2) differentiate the equation itself to get $y\'\'$, $y\'\'\'$, using the chain rule on $y$; (3) put in $a$; (4) $y(a + h) \\approx y + hy\' + \\tfrac{h^2}{2}y\'\' + \\tfrac{h^3}{6}y\'\'\'$.',
        'Mistake: evaluating derivatives at $x$ instead of $a$.',
        'Mistake: forgetting the factorials $2!, 3!, \\ldots$',
        'Mistake: in the ODE method, treating $y$ as a constant when differentiating. $\\tfrac{d}{dx}(y^2) = 2yy\'$.',
      ],
      examples: [
        {
          title: 'Maclaurin series of $\\cos 2x$',
          question: 'Find the Maclaurin series of $\\cos 2x$ up to $x^4$, and use it to estimate $\\cos 0.2$.',
          steps: ['$\\cos u = 1 - \\tfrac{u^2}{2!} + \\tfrac{u^4}{4!} - \\cdots$; put $u = 2x$.', '$\\cos 2x = 1 - 2x^2 + \\tfrac23x^4 - \\cdots$', '$\\cos 0.2$ means $x = 0.1$: $1 - 0.02 + 0.0000667 = 0.9800667$.', 'True $0.9800666$.'],
          answer: '$1 - 2x^2 + \\tfrac23x^4$; $\\cos 0.2 \\approx 0.98007$.',
        },
        {
          title: 'Taylor method: $y\' = 3x + y^2$, $y(1) = 1.2$',
          question: 'Use the Taylor series method to approximate $y$ when $x = 1.1$.',
          steps: ['$y\'(1) = 3(1) + 1.2^2 = 4.44$.', 'Differentiate: $y\'\' = 3 + 2yy\'$, so $y\'\'(1) = 3 + 2(1.2)(4.44) = 13.656$.', 'Again: $y\'\'\' = 2(y\')^2 + 2yy\'\'$, so $y\'\'\'(1) = 2(4.44)^2 + 2(1.2)(13.656) = 72.2016$.', '$h = 0.1$: $y(1.1) \\approx 1.2 + 0.444 + \\tfrac{0.01}{2}(13.656) + \\tfrac{0.001}{6}(72.2016) = 1.7243$.'],
          answer: '$y(1.1) \\approx 1.7243$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The Taylor method for an ODE',
          body: '“If $y\' = 3x + y^2$, use the Taylor series method to approximate $y$ when $x = 1.1$, given that $y = 1.2$ when $x = 1$.”\n\n**What the examiner wants:** $y\'(1)$ from the equation; $y\'\'$ and $y\'\'\'$ found by differentiating the equation (with the chain rule on $y$); each evaluated at $x = 1$; then the series with $h = 0.1$, every term shown.',
          asides: [{ label: 'Exam tip', text: 'Lay it out as a table: $y$, $y\'$, $y\'\'$, $y\'\'\'$ at $x = 1$, then the sum. It makes every mark easy to award.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$y\' = 3x + y^2$, $y(1) = 1.2$',
          graph: {
            steps: [
              { ask: '$y\'(1) = 3(1) + 1.2^2 = $?', answer: 4.44, tol: 0.001, hint: '$3 + 1.44$.' },
              { ask: '$y\'\' = 3 + 2yy\'$. Value at $x = 1$?', answer: 13.656, tol: 0.001, hint: '$3 + 2(1.2)(4.44)$.' },
              { ask: '$y\'\'\' = 2(y\')^2 + 2yy\'\'$. Value at $x = 1$?', answer: 72.2016, tol: 0.001, hint: '$2(4.44)^2 + 2(1.2)(13.656)$.' },
              { ask: '$y(1.1) \\approx 1.2 + 0.1(4.44) + \\tfrac{0.01}{2}(13.656) + \\tfrac{0.001}{6}(72.2016)$, to 4 dp?', answer: 1.7243, tol: 0.0001, hint: '$1.2 + 0.444 + 0.06828 + 0.01203$.' },
            ],
            after: 'Each term is smaller than the last, a sign the series is settling. Keep one more term if the question asks for more accuracy.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'For $y\' = 3x + y^2$, a student writes $y\'\' = 3 + 2y$. What went wrong?',
          options: [
            { text: '$y$ depends on $x$, so $\\tfrac{d}{dx}(y^2) = 2y\\,y\'$, not $2y$', correct: true, why: 'Chain rule: $y$ is a function of $x$.' },
            { text: 'Nothing; that is right', why: 'It treats $y$ as if it were $x$.' },
            { text: 'It should be $y\'\' = 3$', why: 'The $y^2$ term does not vanish.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Maclaurin series of $\\cos 2x$',
          graph: {
            steps: [
              { ask: 'Coefficient of $x^2$?', answer: -2, tol: 0.001, hint: '$-\\tfrac{(2x)^2}{2!}$.' },
              { ask: 'Coefficient of $x^4$ (to 4 dp)?', answer: 0.6667, tol: 0.001, hint: '$\\tfrac{(2x)^4}{4!} = \\tfrac{16x^4}{24}$.' },
              { ask: 'Estimate $\\cos 0.2$ (put $x = 0.1$), to 5 dp?', answer: 0.98007, tol: 0.00001, hint: '$1 - 0.02 + \\tfrac23(0.0001)$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can build a Taylor series.',
          body: '**Summary:** match value, slope and bend at $a$, so $c_k = \\tfrac{f^{(k)}(a)}{k!}$; Maclaurin is $a = 0$; the first dropped term sizes the error; for $y\' = f(x, y)$, differentiate the equation itself.\n\n**Next:** the **standard series** ($e^x$, $2^x$, $\\ln(1 + x)$, $\\tan^{-1}x$) that exams expect from memory, and the trick of matching coefficients.',
        },
      ],
    },
  ],
};
