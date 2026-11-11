// MTH 209 · Part D · Lesson 4: the Taylor series method for y′ = f(x, y). Euler keeps one Taylor
// term; keeping y″ (found by differentiating f with the chain rule) gives the order-2 method, and
// more derivatives give higher orders. Local vs global error and what halving h does.
// Every number below was recomputed in Python (see docs/mth209-rebuild.md).

export default {
  id: 'taylor-method',
  title: 'The Taylor series method',
  covers: "The Taylor series method for an IVP: finding y'' and higher derivatives from y' = f(x, y) by the chain rule, the order-2 step, comparing with Euler's method, local and global error, and the effect of halving the step",
  minutes: 14,
  sections: [
    {
      name: 'More terms than Euler',
      terms: [
        ['Taylor series method (order 2)', "$y_{i+1} = y_i + hy'_i + \\frac{h^2}{2!}y''_i$, with $y'_i = f(x_i, y_i)$ and $y''_i$ from differentiating $f$."],
        ["Finding $y''$", "Differentiate $y' = f(x, y)$ with respect to $x$, remembering $y$ depends on $x$: $y'' = f_x + f_y\\,y'$."],
        ['Order $n$', "Keep terms up to $\\frac{h^n}{n!}y^{(n)}$. Euler's method is order 1."],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part D · Lesson 4',
          title: 'Euler threw away most of Taylor',
          body: "Euler's method keeps two terms of the Taylor series:\n$$y(x + h) = y + hy' + \\frac{h^2}{2!}y'' + \\frac{h^3}{3!}y''' + \\cdots$$\nThe first term it drops, $\\frac{h^2}{2}y''$, is its error at every step.\n\nThe **Taylor series method** keeps more terms. The only new work: find $y''$ (and $y'''$, …) from the differential equation itself.",
          cta: 'Show me',
        },
        {
          type: 'story',
          eyebrow: 'The method',
          title: 'Differentiate the equation',
          body: "From $y' = f(x, y)$, differentiate with respect to $x$. Because $y$ is a function of $x$, use the chain rule:\n$$y'' = \\frac{\\partial f}{\\partial x} + \\frac{\\partial f}{\\partial y}\\,y'.$$\nExample: $y' = x + y$ gives $y'' = 1 + y' = 1 + x + y$.\n\nThen at each mesh point compute $y'_i$, $y''_i$ and step:\n$$y_{i+1} = y_i + hy'_i + \\frac{h^2}{2}y''_i.$$",
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: "For $y' = y - x^2 + 1$, what is $y''$?",
          options: [
            { text: "$y'' = y - x^2 + 1 - 2x$", correct: true, why: "$y'' = y' - 2x$, and $y' = y - x^2 + 1$." },
            { text: "$y'' = -2x$", why: "You forgot that $y$ depends on $x$: $\\frac{d}{dx}y = y'$." },
            { text: "$y'' = y - 2x$", why: "Differentiating $y$ gives $y'$, which is $y - x^2 + 1$, not $y$." },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: "Taylor vs Euler on $y' = y - x^2 + 1$",
          body: "With $y(0) = 0.5$ and $h = 0.5$. Step 1: $y'_0 = 0.5 - 0 + 1 = 1.5$, $y''_0 = 1.5 - 0 = 1.5$:\n$$y_1 = 0.5 + 0.5(1.5) + \\frac{0.25}{2}(1.5) = 1.4375.$$\n$$\\begin{array}{c|c|c|c} x & \\text{Taylor (order 2)} & \\text{Euler} & \\text{exact} \\\\ \\hline 0.5 & 1.437500 & 1.250000 & 1.425639 \\\\ 1.0 & 2.679688 & 2.250000 & 2.640859 \\\\ 1.5 & 4.104492 & 3.375000 & 4.009155 \\\\ 2.0 & 5.513550 & 4.437500 & 5.305472 \\end{array}$$\nSame step size, one extra term: the error at $x = 2$ falls from $0.87$ to $0.21$.",
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: "Use the Taylor series method of order 2 with $h = 0.1$ on $y' = x + y$, $y(0) = 1$, to estimate $y(0.2)$.",
          body: "$y'' = 1 + x + y$.",
          graph: {
            steps: [
              { ask: "$y'_0 = $", answer: 1, tol: 0.0001, hint: '$0 + 1$.' },
              { ask: "$y''_0 = $", answer: 2, tol: 0.0001, hint: '$1 + 0 + 1$.' },
              { ask: '$y_1 = 1 + 0.1(1) + 0.005(2) = $', answer: 1.11, tol: 0.00001, hint: '$\\frac{h^2}{2} = 0.005$.' },
              { ask: "$y'_1 = 0.1 + 1.11 = 1.21$, $y''_1 = 2.21$. $y_2 = $ (5 d.p.)", answer: 1.24205, tol: 0.000006, hint: '$1.11 + 0.1(1.21) + 0.005(2.21)$.', done: 'Exact $y(0.2) = 2e^{0.2} - 1.2 = 1.24281$. Euler gives only $1.22$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Going further',
          title: 'Higher orders: keep differentiating',
          body: "For $y' = -xy$, $y(0) = 1$:\n• $y'' = -y - xy'$\n• $y''' = -2y' - xy''$\n• $y^{(4)} = -3y'' - xy'''$\nAt $x = 0$: $y' = 0$, $y'' = -1$, $y''' = 0$, $y^{(4)} = 3$. So\n$$y(x) \\approx 1 - \\frac{x^2}{2} + \\frac{3x^4}{4!} = 1 - \\frac{x^2}{2} + \\frac{x^4}{8}.$$\nAt $x = 0.3$: $1 - 0.045 + 0.0010125 = 0.9560$ (4 d.p.), matching the exact $e^{-x^2/2} = 0.9560$.",
        },
      ],
    },
    {
      name: 'Errors and step size',
      terms: [
        ['Local error', 'The error made in one step: about $h^{n+1}$ for a method of order $n$ (the first dropped Taylor term).'],
        ['Global error', 'The error after reaching a fixed $x$: about $h^n$ for order $n$, because $\\frac{1}{h}$ steps each add a local error.'],
        ['Halving $h$', "Order 1 (Euler): the global error roughly halves. Order 2: it roughly quarters."],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Errors',
          title: 'Local error and global error',
          body: "A method of **order $n$** drops the term $\\frac{h^{n+1}}{(n+1)!}y^{(n+1)}$, so each step has a **local error** about $h^{n+1}$. Reaching a fixed $x$ takes about $\\frac{1}{h}$ steps, so the **global error** is about $h^n$.\n\nFor $y' = x + y$ at $x = 0.2$:\n$$\\begin{array}{c|c|c} h & \\text{Euler error} & \\text{Taylor-2 error} \\\\ \\hline 0.1 & 0.0228 & 0.00076 \\\\ 0.05 & 0.0118 & 0.00020 \\end{array}$$\nHalving $h$: Euler's error **halves**, Taylor-2's **quarters**.",
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: "Euler's method with $h = 0.1$ has error $0.04$ at $x = 1$. Roughly what error do you expect with $h = 0.025$?",
          options: [
            { text: '$0.01$', correct: true, why: 'Order 1: the error is proportional to $h$, and $h$ is divided by 4.' },
            { text: '$0.0025$', why: 'That would be order 2 ($h^2$).' },
            { text: '$0.04$', why: 'A smaller step does reduce the error.' },
            { text: '$0.02$', why: 'That is for halving $h$; here $h$ is quartered.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about the Taylor series method are true?',
          options: [
            { text: "Euler's method is the Taylor series method of order 1.", correct: true, why: 'It keeps only the $hy\'$ term.' },
            { text: "$y''$ is found by differentiating $f(x, y)$, treating $y$ as a function of $x$.", correct: true, why: "$y'' = f_x + f_y\\,y'$." },
            { text: 'Higher order means a smaller error for the same $h$, at the cost of more differentiation.', correct: true, why: 'That trade-off is why it suits simple $f$.' },
            { text: "It needs no initial condition.", why: "Every step starts from $y_0 = y(x_0)$: it is still an IVP." },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe the Taylor series method',
          body: "For $y' = f(x, y)$, $y(x_0) = y_0$, with step $h$ and $x_i = x_0 + ih$, expand by Taylor's series:\n$$y(x_{i+1}) = y(x_i) + hy'(x_i) + \\frac{h^2}{2!}y''(x_i) + \\cdots + \\frac{h^n}{n!}y^{(n)}(x_i) + O(h^{n+1}).$$\nThe derivatives come from the equation: $y' = f$, $y'' = f_x + f_yy'$, and so on. Dropping the remainder gives the method of order $n$:\n$$y_{i+1} = y_i + hy'_i + \\frac{h^2}{2!}y''_i + \\cdots + \\frac{h^n}{n!}y^{(n)}_i.$$\nEuler's method is the case $n = 1$. The local error is $O(h^{n+1})$ and the global error $O(h^n)$.",
        },
        {
          type: 'finish',
          title: 'You can step with Taylor.',
          body: 'Euler is order 1; keep more terms for more accuracy. Next: exam practice on Part D.',
        },
      ],
    },
  ],
};
