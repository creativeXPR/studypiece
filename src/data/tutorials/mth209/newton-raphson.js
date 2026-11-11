// MTH 209 · Idea B, lesson 4: Newton-Raphson. Part 1 derives xₙ₊₁ = xₙ − f/f′ from the tangent (first
// Taylor term) and uses x² − 2; Part 2 does the past-paper questions: the xᵏeˣ derivation with k = 1
// against k = 2, and the jump to a different root for 2x³ − 7x + 2.

export default {
  id: 'newton-raphson',
  title: 'Newton-Raphson',
  covers: 'Following the tangent: the formula from Taylor, very fast convergence, and when it misbehaves',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Newton-Raphson', '$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$: where the tangent at $x_n$ meets the $x$-axis.'],
        ['Quadratic convergence', 'Near a simple root the error is roughly squared each step, so the number of correct digits about doubles.'],
      ],
      steps: [
        'Write $f(x)$ and $f\'(x)$.',
        'Write the formula $x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$, simplified into one fraction if asked.',
        'From $x_0$, compute $x_1, x_2, \\ldots$, keeping extra digits.',
        'Stop when two successive values agree to the required accuracy.',
        'Watch for $f\'(x_n) \\approx 0$ (a flat tangent shoots far away) and repeated roots (slow).',
      ],
      examples: [
        {
          title: '$x^2 - 2 = 0$ from $x_0 = 1$',
          question: 'Use Newton-Raphson to find $\\sqrt2$ from $x_0 = 1$.',
          steps: ['$f = x^2 - 2$, $f\' = 2x$.', '$x_{n+1} = x_n - \\tfrac{x_n^2 - 2}{2x_n} = \\tfrac12\\left(x_n + \\tfrac{2}{x_n}\\right)$.', '$x_1 = 1.5$, $x_2 = 1.416667$, $x_3 = 1.414216$.', 'Correct digits: 1, 3, 6. They double each step.'],
          answer: '$\\sqrt2 = 1.414214$ after three steps.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 4',
          title: 'The fastest of the lot',
          body: 'Linear iteration multiplies the error by $g\'$ each step. What if we could build a $g$ with $g\' = 0$ at the root? Then the error would vanish almost instantly.\n\nThat is **Newton-Raphson**, and it comes straight from Idea A: keep the first two Taylor terms and solve.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Ride the tangent down',
          body: 'Near $x_n$, Taylor says $f(x) \\approx f(x_n) + f\'(x_n)(x - x_n)$: the **tangent line**. Where does the tangent hit zero?\n$$0 = f(x_n) + f\'(x_n)(x - x_n) \\;\\Rightarrow\\; x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}.$$\nNear a simple root this $g$ has $g\'(\\text{root}) = 0$, so the error is roughly **squared** each step.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Newton-Raphson, step by step',
          body: '1. Write $f(x)$ and $f\'(x)$.\n2. Write $x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$ (simplify to one fraction when asked to “show that”).\n3. Iterate from $x_0$, keeping extra digits.\n4. Stop when two successive values agree.\n5. Watch out: a near-zero $f\'$ throws the next guess far away, and a repeated root makes it slow.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$\\sqrt2$ from $x_0 = 1$',
          body: '**Steps 1–2.** $f = x^2 - 2$, $f\' = 2x$, so $x_{n+1} = x_n - \\dfrac{x_n^2 - 2}{2x_n} = \\tfrac12\\left(x_n + \\tfrac{2}{x_n}\\right)$.\n\n**Step 3.** $x_1 = 1.5$, $x_2 = 1.416667$, $x_3 = 1.414216$.\n\n**Step 4.** True $\\sqrt2 = 1.414214$. Correct digits went $1 \\to 3 \\to 6$: they **double** each step. (This is the calculator’s method from the map lesson.)',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$x^3 - 2x - 5 = 0$ from $x_0 = 2$',
          graph: {
            steps: [
              { ask: '$f(2)$?', answer: -1, tol: 0.001, hint: '$8 - 4 - 5$.' },
              { ask: '$f\'(x) = 3x^2 - 2$. $f\'(2)$?', answer: 10, tol: 0.001, hint: '$12 - 2$.' },
              { ask: '$x_1 = 2 - \\tfrac{-1}{10}$?', answer: 2.1, tol: 0.0001, hint: '$2 + 0.1$.' },
              { ask: '$x_2 = 2.1 - \\tfrac{f(2.1)}{f\'(2.1)}$ with $f(2.1) = 0.061$, $f\'(2.1) = 11.23$, to 4 dp?', answer: 2.0946, tol: 0.0001, hint: '$2.1 - 0.00543$.' },
            ],
            after: 'Next $x_3 = 2.094551$, and $x_2$ was already correct to 4 dp.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Show that** Newton for a given equation simplifies to a stated formula (e.g. for $x^k e^x = 0$).\n• **Compute** iterates to a given dp from a given $x_0$, sometimes for two parameter values.\n• **Explain** why one sequence converges faster than another (simple against repeated root).\n• **Discuss observations,** e.g. a start value that lands on a different root.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'For a “show that”: write $f$, $f\'$, substitute into $x - \\tfrac{f}{f\'}$, then simplify to the given form, showing the algebra.',
        'Factor out common terms first: for $x^k e^x$, $f\' = e^x x^{k-1}(k + x)$, so $\\tfrac{f}{f\'} = \\tfrac{x}{k + x}$.',
        'Tabulate $n$, $x_n$ to the required dp (plus one).',
        'Observations: a simple root gives very fast convergence; a **repeated** root gives slow, linear convergence; a start near $f\' = 0$ can jump to a far-off root.',
        'Mistake: forgetting the minus sign, or dividing $f\'$ by $f$.',
      ],
      examples: [
        {
          title: '$x^k e^x = 0$, $k = 1$ and $k = 2$',
          question: 'Show Newton gives $x_{n+1} = \\tfrac{(k-1)x_n + x_n^2}{k + x_n}$. From $x_0 = 1$, find $x_5$ to 6 dp for $k = 1$ and $k = 2$, and explain why one converges faster.',
          steps: ['$f = x^k e^x$, $f\' = e^x x^{k-1}(k + x)$, so $\\tfrac{f}{f\'} = \\tfrac{x}{k + x}$.', '$x_{n+1} = x_n - \\tfrac{x_n}{k + x_n} = \\tfrac{(k-1)x_n + x_n^2}{k + x_n}$.', '$k = 1$: $0.5, 0.166667, 0.023810, 0.000554, 0.000000$.', '$k = 2$: $0.666667, 0.416667, 0.244253, 0.135418, 0.072003$.', 'The root $x = 0$ is simple for $k = 1$ (fast) but double for $k = 2$ (slow, linear).'],
          answer: '$k = 1$: $x_5 = 0.000000$; $k = 2$: $x_5 = 0.072003$.',
        },
        {
          title: '$2x^3 - 7x + 2 = 0$ from $x_0 = 1$ and $x_0 = 2$',
          question: 'Use Newton-Raphson to find roots of $2x^3 - 7x + 2$. Discuss your observations.',
          steps: ['$f\' = 6x^2 - 7$.', 'From $x_0 = 1$: $f(1) = -3$, $f\'(1) = -1$, so $x_1 = 1 - \\tfrac{-3}{-1} = -2$, exactly a root.', 'From $x_0 = 2$: $1.764706, 1.710080, 1.707115, 1.707107$.', 'Observation: near $x = 1$ the tangent is almost flat ($f\' = -1$), so Newton jumps to the far root $-2$ instead of a nearby one.'],
          answer: 'Roots $-2$ (from $x_0 = 1$) and $1.707107$ (from $x_0 = 2$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Show the formula, then compare',
          body: '“Using Newton-Raphson, show that the solution of $x^k e^x = 0$ is given by $x_{n+1} = \\dfrac{(k-1)x_n + x_n^2}{k + x_n}$. Starting with $x_0 = 1$, calculate $x_5$ to 6 dp when $k = 1$ and $k = 2$. Explain why one sequence converges more than the other.”\n\n**What the examiner wants:** $f$ and $f\'$ with $e^x x^{k-1}$ factored out; the algebra to the given form; two tables; and the reason: **simple root** against **double root**.',
          asides: [{ label: 'Exam tip', text: 'Explaining speed: Newton is very fast at a simple root ($f\' \\ne 0$ there) but only linear at a repeated root ($f\' = 0$ there too). For $k = 2$, $x = 0$ is a double root.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$x^k e^x$ with $x_0 = 1$',
          graph: {
            steps: [
              { ask: '$k = 1$: $x_1 = \\tfrac{0 + 1^2}{1 + 1}$?', answer: 0.5, tol: 0.0001, hint: '$\\tfrac{x^2}{1 + x}$ at $x = 1$.' },
              { ask: '$k = 1$: $x_2 = \\tfrac{0.25}{1.5}$, to 6 dp?', answer: 0.166667, tol: 0.000001, hint: '$\\tfrac16$.' },
              { ask: '$k = 2$: $x_1 = \\tfrac{1 + 1}{2 + 1}$, to 6 dp?', answer: 0.666667, tol: 0.000001, hint: '$\\tfrac{x + x^2}{2 + x}$ at $x = 1$.' },
              { ask: 'Why is $k = 2$ slower?', options: ['$x = 0$ is a double root when $k = 2$', 'The formula is wrong for $k = 2$', 'The start value is too far'], answer: 0, hint: '$x^2e^x$ touches the axis at $0$.' },
            ],
            after: '$k = 1$ reaches $0.000000$ by $x_5$; $k = 2$ is still at $0.072003$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the observation',
          prompt: 'For $2x^3 - 7x + 2 = 0$, Newton from $x_0 = 1$ gives $x_1 = -2$, not the nearby root $1.707$. Why?',
          options: [
            { text: '$f\'(1) = -1$ is small, so the tangent is shallow and its zero lands far away, on the root $-2$', correct: true, why: 'A flat tangent sends Newton a long way. Here it happens to land exactly on another root.' },
            { text: 'Arithmetic error', why: '$1 - \\tfrac{-3}{-1} = -2$ is correct.' },
            { text: 'Newton always finds the smallest root', why: 'It finds whichever root the tangents lead to; the start matters.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$2x^3 - 7x + 2$ from $x_0 = 2$',
          graph: {
            steps: [
              { ask: '$f(2)$ and $f\'(2) = 6(4) - 7$. $x_1 = 2 - \\tfrac{4}{17}$, to 6 dp?', answer: 1.764706, tol: 0.000002, hint: '$f(2) = 16 - 14 + 2 = 4$.' },
              { ask: '$x_2$, to 4 dp? ($f(x_1) = 0.6383$, $f\'(x_1) = 11.6851$)', answer: 1.7101, tol: 0.0002, hint: '$1.764706 - 0.05463$.' },
              { ask: 'The root to 3 dp?', answer: 1.707, tol: 0.0006, hint: 'It settles at $1.707107$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can use, derive and judge Newton’s method.',
          body: '**Summary:** $x_{n+1} = x_n - \\tfrac{f}{f\'}$ from the tangent (the first Taylor term); digits double at a simple root; slow at a repeated root; a flat tangent can jump to another root.\n\n**Next:** the **secant method**, which is Newton without the derivative, and a side-by-side comparison of all five root methods.',
        },
      ],
    },
  ],
};
