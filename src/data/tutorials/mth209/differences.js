// MTH 209 · Idea C, lesson 1: forward, backward and central differences and difference tables.
// Part 1 builds the table for x² with h = 1; Part 2 does the past-paper x³ table (h = 0.1), spotting an
// error in a table, and the central-difference derivative.

export default {
  id: 'differences',
  title: 'Forward, backward and central differences',
  covers: 'Δ, ∇ and δ, building a difference table, why a polynomial’s differences end, and spotting an error',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Forward difference', '$\\Delta f_k = f_{k+1} - f_k$ (look ahead).'],
        ['Backward difference', '$\\nabla f_k = f_k - f_{k-1}$ (look back).'],
        ['Central difference', '$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$ (look both ways, half a step).'],
        ['Difference table', 'Columns $f$, $\\Delta f$, $\\Delta^2 f$, …, each made by subtracting neighbours in the column before.'],
      ],
      steps: [
        'List $x_k = x_0 + kh$ and $f_k = f(x_k)$ in a column.',
        'Next column: each entry minus the one above it ($\\Delta f_k = f_{k+1} - f_k$).',
        'Repeat on each new column to get $\\Delta^2 f$, $\\Delta^3 f$, … (same numbers whether labelled $\\Delta$, $\\nabla$ or $\\delta$; only their positions differ).',
        'For a polynomial of degree $n$: $\\Delta^n f$ is constant ($= n!\\,a_n h^n$) and $\\Delta^{n+1} f = 0$.',
        'A single wrong entry $\\varepsilon$ spreads into higher columns with binomial coefficients ($\\varepsilon, -3\\varepsilon, 3\\varepsilon, -\\varepsilon$ in $\\Delta^3$), which is how to spot it.',
      ],
      examples: [
        {
          title: '$f(x) = x^2$ at $x = 0, 1, 2, 3, 4$',
          question: 'Build the difference table.',
          steps: ['$f$: $0, 1, 4, 9, 16$.', '$\\Delta f$: $1, 3, 5, 7$.', '$\\Delta^2 f$: $2, 2, 2$.', '$\\Delta^3 f$: $0, 0$.'],
          answer: 'Degree 2, so $\\Delta^2 f$ is constant ($2! \\times 1 \\times 1^2 = 2$) and $\\Delta^3 f = 0$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea C · Lesson 1',
          title: 'From a table, rebuild the function',
          body: 'Ideas A and B worked with formulas. Often you only have a **table**: census figures every 10 years, readings every hour, values of $\\sin x$ at a few points.\n\nIdea C rebuilds the function from such a table. Step one is to look at **differences** between neighbouring values. They reveal the shape, just as derivatives do for a formula.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Differences are derivatives in disguise',
          body: 'For $f(x) = x^2$ at $0, 1, 2, 3, 4$: values $0, 1, 4, 9, 16$. Subtract neighbours: $1, 3, 5, 7$. Again: $2, 2, 2$. Again: $0, 0$.\n\nA quadratic’s **second** differences are constant, just as its second derivative is constant. In general a degree-$n$ polynomial has constant $n$th differences and zero beyond. Forward ($\\Delta$), backward ($\\nabla$) and central ($\\delta$) differences are the same numbers, labelled from different positions.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Building a difference table',
          body: '1. Column of $x_k$ and $f_k$.\n2. $\\Delta f_k = f_{k+1} - f_k$: each entry minus the one above.\n3. Repeat for $\\Delta^2 f$, $\\Delta^3 f$, …\n4. Degree $n$ polynomial: $\\Delta^n f$ constant $= n!\\,a_nh^n$, then zeros.\n5. A wrong entry shows up as a $1, -3, 3, -1$ pattern in the third differences.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2$ with $h = 1$',
          body: '**$f$:** $0, 1, 4, 9, 16$\n**$\\Delta f$:** $1, 3, 5, 7$\n**$\\Delta^2 f$:** $2, 2, 2$\n**$\\Delta^3 f$:** $0, 0$\n\nCheck: $n = 2$, $a_2 = 1$, $h = 1$, so $\\Delta^2 f = 2! \\times 1 \\times 1 = 2$. ✓',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$f(x) = x^4$ at $x = 0, 1, 2, 3, 4$',
          graph: {
            steps: [
              { ask: 'Values are $0, 1, 16, 81, 256$. First forward difference $\\Delta f_0$?', answer: 1, tol: 0.001, hint: '$1 - 0$.' },
              { ask: '$\\Delta f$ row is $1, 15, 65, 175$. Then $\\Delta^2 f_0$?', answer: 14, tol: 0.001, hint: '$15 - 1$.' },
              { ask: 'Degree 4, $h = 1$: the constant $\\Delta^4 f = 4!$ = ?', answer: 24, tol: 0.001, hint: '$4 \\times 3 \\times 2 \\times 1$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define** $\\Delta$, $\\nabla$ and $\\delta$ with respect to $f_k$.\n• **Construct** a difference table for a given function and step, “as far as $\\Delta^5$ to 6 dp”, and read off $\\Delta^3$, $\\Delta^4$, $\\Delta^5$.\n• **Approximate a derivative** with a central difference, $f\'(t) \\approx \\tfrac{f(t + h) - f(t - h)}{2h}$.\n• **Locate** an error in a table.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Work to the decimals asked (e.g. 6 dp) in **every** column; differences lose significant figures quickly.',
        'Label columns $f$, $\\Delta f$, $\\Delta^2 f$, … and keep entries staggered between the rows they come from.',
        'For a polynomial, confirm with $\\Delta^n f = n!\\,a_nh^n$.',
        'Central-difference derivative: $f\'(t) \\approx \\dfrac{f(t + h) - f(t - h)}{2h}$; it is exact for quadratics.',
        'Mistake: subtracting the wrong way round ($f_k - f_{k+1}$). Always lower minus upper for $\\Delta$.',
      ],
      examples: [
        {
          title: '$f(x) = x^3$ for $x = 5.0$ to $5.5$, $h = 0.1$',
          question: 'Construct a finite difference table and determine $\\Delta^3$, $\\Delta^4$, $\\Delta^5$.',
          steps: ['$f$: $125, 132.651, 140.608, 148.877, 157.464, 166.375$.', '$\\Delta$: $7.651, 7.957, 8.269, 8.587, 8.911$.', '$\\Delta^2$: $0.306, 0.312, 0.318, 0.324$.', '$\\Delta^3$: $0.006, 0.006, 0.006$; $\\Delta^4 = 0$; $\\Delta^5 = 0$.'],
          answer: '$\\Delta^3 = 0.006 = 3! \\times 1 \\times 0.1^3$; $\\Delta^4 = \\Delta^5 = 0$.',
        },
        {
          title: 'Derivative of $t^2 + 2t$ at $t = -3$ by central differences',
          question: 'Approximate $f\'(-3)$ for $f(t) = t^2 + 2t$ using $h = 0.1$.',
          steps: ['$f(-2.9) = 8.41 - 5.8 = 2.61$; $f(-3.1) = 9.61 - 6.2 = 3.41$.', '$f\'(-3) \\approx \\tfrac{2.61 - 3.41}{0.2} = -4$.', 'Exact: $f\' = 2t + 2 = -4$. Central differences are exact for quadratics.'],
          answer: '$f\'(-3) = -4$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'A table for $x^3$',
          body: '“Construct a table of finite differences for $f(x) = x^3$ for $x = 5.0$ to $5.5$ with step $h = 0.1$. Use your table to determine $\\Delta^3$, $\\Delta^4$ and $\\Delta^5$.”\n\n**What the examiner wants:** the six values to 3 dp; every difference column; and the conclusion that $\\Delta^3$ is constant ($0.006$) and $\\Delta^4 = \\Delta^5 = 0$, with the reason (a cubic).',
          asides: [{ label: 'Exam tip', text: 'Explain the pattern: $\\Delta^3 = 3!\\,h^3 = 6 \\times 0.001 = 0.006$ for $x^3$. A reason earns more than the numbers alone.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$x^3$, $h = 0.1$',
          graph: {
            steps: [
              { ask: '$f(5.1) = 5.1^3$?', answer: 132.651, tol: 0.001, hint: '$26.01 \\times 5.1$.' },
              { ask: '$\\Delta f_0 = 132.651 - 125$?', answer: 7.651, tol: 0.001, hint: 'Lower minus upper.' },
              { ask: '$\\Delta^2 f_0 = 7.957 - 7.651$?', answer: 0.306, tol: 0.001, hint: 'Next column.' },
              { ask: '$\\Delta^3 f_0 = 0.312 - 0.306$?', answer: 0.006, tol: 0.0005, hint: 'Constant from here.' },
            ],
            after: '$\\Delta^3 = 0.006$ everywhere, so $\\Delta^4 = \\Delta^5 = 0$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the error',
          prompt: 'In a table of a smooth cubic, the $\\Delta^3$ column reads $0.006, 0.006, 0.013, -0.015, 0.027, -0.001, 0.006$. What happened?',
          options: [
            { text: 'One table value is wrong: an error $\\varepsilon$ adds $\\varepsilon, -3\\varepsilon, 3\\varepsilon, -\\varepsilon$ to four $\\Delta^3$ entries', correct: true, why: 'Here $\\varepsilon = 0.007$: $0.006 + 0.007$, $0.006 - 0.021$, $0.006 + 0.021$, $0.006 - 0.007$. Trace it back to the $f$ value.' },
            { text: 'The function is not a cubic', why: 'Most entries are 0.006; the disturbance is local, pointing to one bad value.' },
            { text: 'Rounding', why: 'Rounding gives tiny, random wobbles, not this symmetric pattern.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Central difference for $t^2 + 2t$ at $t = -3$',
          graph: {
            steps: [
              { ask: '$f(-2.9)$?', answer: 2.61, tol: 0.001, hint: '$8.41 - 5.8$.' },
              { ask: '$f(-3.1)$?', answer: 3.41, tol: 0.001, hint: '$9.61 - 6.2$.' },
              { ask: '$f\'(-3) \\approx \\tfrac{f(-2.9) - f(-3.1)}{0.2}$?', answer: -4, tol: 0.001, hint: '$\\tfrac{-0.8}{0.2}$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can build and read a difference table.',
          body: '**Summary:** $\\Delta f_k = f_{k+1} - f_k$, $\\nabla f_k = f_k - f_{k-1}$, $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$; a degree-$n$ polynomial has constant $\\Delta^n$; errors spread as binomial patterns.\n\n**Next:** treat $\\Delta$, $\\nabla$, $\\delta$ as **operators** with an algebra of their own (the shift $E$), and prove the identities that appear in every past paper.',
        },
      ],
    },
  ],
};
