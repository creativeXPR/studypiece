// MTH 209 · Idea D, lesson 1: initial value problems and when they have a unique solution. Part 1
// builds definitions, convex sets and the Lipschitz condition on f = 2y; Part 2 does the class examples
// (|xy| with L = 2; y′ = 1 + x sin(xy) with L = 4) and well-posedness.

export default {
  id: 'ivp',
  title: 'IVPs and unique solutions',
  covers: 'What an IVP is, general against particular solutions, convex sets, the Lipschitz condition, uniqueness and well-posedness',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Initial value problem (IVP)', 'A differential equation together with conditions on the solution at the starting point, e.g. $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$. An $n$th-order equation needs $n$ initial conditions.'],
        ['Lipschitz condition', '$|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$ for all $(x, y_1), (x, y_2)$ in $D$; $L$ is the Lipschitz constant.'],
        ['Convex set', '$D$ is convex if the segment between any two of its points stays inside $D$.'],
        ['Well-posed', 'The IVP has a unique solution, and small changes to the problem cause only small changes to the solution.'],
      ],
      steps: [
        'Write the IVP in the form $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$, and identify $f$ and $D$.',
        'Find $\\dfrac{\\partial f}{\\partial y}$ (treat $x$ as a constant).',
        'Bound $\\left|\\dfrac{\\partial f}{\\partial y}\\right| \\le L$ on $D$ using the largest values of $x$, $y$ and $|\\sin|, |\\cos| \\le 1$. On a convex $D$ this gives the Lipschitz condition with constant $L$.',
        'Or show it directly: $|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$.',
        'Conclude: $f$ continuous and Lipschitz in $y$ on $D$, so the IVP has a unique solution.',
      ],
      examples: [
        {
          title: '$f(x, y) = 2y$',
          question: 'Show $f(x, y) = 2y$ satisfies a Lipschitz condition.',
          steps: ['$|f(x, y_1) - f(x, y_2)| = |2y_1 - 2y_2| = 2|y_1 - y_2|$.', 'So $L = 2$ (equivalently $\\left|\\tfrac{\\partial f}{\\partial y}\\right| = 2$).'],
          answer: 'Lipschitz with $L = 2$; so $y\' = 2y$, $y(0) = 1$ has a unique solution ($y = e^{2x}$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea D · Lesson 1',
          title: 'Following change',
          body: 'Ideas A–C handled numbers and tables. Idea D handles **change**: a rate $y\' = f(x, y)$ plus a starting value, and the question “where does $y$ go?”. That is an **initial value problem**, and it describes swinging pendulums, cooling tea and growing populations.\n\nBefore computing anything, numerical analysis asks: **does the problem have exactly one answer?**',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'One starting point, one path',
          body: 'A differential equation alone has a **general** solution: a whole family of curves. The **initial condition** picks one, the **particular** solution. (A second-order equation like the pendulum’s $\\theta\'\' + \\tfrac gL\\sin\\theta = 0$ needs two: position and speed.)\n\nTo be sure only **one** curve fits, $f$ must not change too wildly with $y$: $|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$. That is the **Lipschitz condition**.',
          asides: [{ label: 'Exam tip', text: 'Define an IVP as a differential equation **with its initial conditions**, and say that their number equals the order of the equation.' }],
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Showing a unique solution',
          body: '1. Write $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$; identify $D$.\n2. $\\dfrac{\\partial f}{\\partial y}$, holding $x$ fixed.\n3. Bound $\\left|\\tfrac{\\partial f}{\\partial y}\\right| \\le L$ on $D$ (largest $|x|$, $|y|$; $|\\sin|, |\\cos| \\le 1$).\n4. Or directly: $|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$.\n5. Continuous and Lipschitz ⇒ unique solution.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$f(x, y) = 2y$',
          body: '**Step 4.** $|f(x, y_1) - f(x, y_2)| = |2y_1 - 2y_2| = 2|y_1 - y_2|$, so $L = 2$.\n\n**Step 3 (same answer).** $\\tfrac{\\partial f}{\\partial y} = 2$, so $L = 2$.\n\n**Step 5.** $y\' = 2y$, $y(0) = 1$ has exactly one solution, $y = e^{2x}$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$y\' = y\\cos x$ on $0 \\le x \\le \\pi$',
          graph: {
            steps: [
              { ask: '$\\tfrac{\\partial f}{\\partial y}$ for $f = y\\cos x$ is…', options: ['$\\cos x$', '$-y\\sin x$', '$y$'], answer: 0, hint: 'Treat $x$ as a constant.' },
              { ask: 'Largest $|\\cos x|$, so $L = $?', answer: 1, tol: 0.001, hint: '$|\\cos x| \\le 1$.' },
              { ask: 'So the IVP with $y(0) = 1$…', options: ['has a unique solution', 'may have several solutions'], answer: 0, hint: '$f$ is continuous and Lipschitz.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define:** IVP, general and particular solution, convex set, Lipschitz condition, well-posed.\n• **Show** that a given $f$ satisfies a Lipschitz condition on $D$, and find $L$.\n• **Show** that a given IVP has a unique solution.\n• **State** the existence-and-uniqueness theorem.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'For $|xy|$-type functions: $||x||y_1| - |x||y_2|| \\le |x|\\,|y_1 - y_2|$, then use the largest $|x|$ on $D$.',
        'For $\\tfrac{\\partial f}{\\partial y}$ with products like $\\sin(xy)$: chain rule gives $x\\cos(xy)$, so $\\tfrac{\\partial}{\\partial y}[x\\sin(xy)] = x^2\\cos(xy)$.',
        'Bound with the largest $|x|$ and $|\\cos| \\le 1$, and state $L$.',
        'Finish with the theorem: “$f$ is continuous and satisfies a Lipschitz condition in $y$ on $D$, so the IVP has a unique solution.”',
        'Mistake: differentiating with respect to $x$. The Lipschitz condition is about $y$.',
      ],
      examples: [
        {
          title: '$f(x, y) = |xy|$ on $1 \\le x \\le 2$, $-3 \\le y \\le 4$',
          question: 'Show that $f$ satisfies a Lipschitz condition on $D$.',
          steps: ['$|f(x, y_1) - f(x, y_2)| = ||xy_1| - |xy_2|| = |x|\\,||y_1| - |y_2||$.', '$\\le |x|\\,|y_1 - y_2|$ (reverse triangle inequality).', '$\\le 2|y_1 - y_2|$, since $|x| \\le 2$ on $D$.'],
          answer: 'Lipschitz with $L = 2$.',
        },
        {
          title: '$y\' = 1 + x\\sin(xy)$, $0 \\le x \\le 2$, $y(0) = 0$',
          question: 'Show there is a unique solution.',
          steps: ['$f = 1 + x\\sin(xy)$; $\\tfrac{\\partial f}{\\partial y} = x \\cdot x\\cos(xy) = x^2\\cos(xy)$.', '$|x^2\\cos(xy)| \\le 2^2 \\times 1 = 4$ on $D$.', '$D$ is convex, so $f$ is Lipschitz in $y$ with $L = 4$; $f$ is continuous.'],
          answer: 'The IVP has a unique solution.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Show there is a unique solution',
          body: '“Show that there is a unique solution to the IVP $y\' = 1 + x\\sin(xy)$, $0 \\le x \\le 2$, $y(0) = 0$.”\n\n**What the examiner wants:** $f$ identified; $\\tfrac{\\partial f}{\\partial y}$ by the chain rule; a bound $L$ with reasons ($x \\le 2$, $|\\cos| \\le 1$); and the theorem cited to conclude.',
          asides: [{ label: 'Exam tip', text: 'In numerical analysis, always check that an IVP has a unique solution before solving it numerically. Otherwise the numbers may mean nothing.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$y\' = 1 + x\\sin(xy)$',
          graph: {
            steps: [
              { ask: '$\\tfrac{\\partial f}{\\partial y}$ is…', options: ['$x^2\\cos(xy)$', '$x\\cos(xy)$', '$\\sin(xy) + xy\\cos(xy)$'], answer: 0, hint: 'Chain rule: the inside $xy$ differentiates to $x$, times the $x$ outside.' },
              { ask: 'On $0 \\le x \\le 2$, the largest $|x^2\\cos(xy)|$, so $L = $?', answer: 4, tol: 0.001, hint: '$2^2 \\times 1$.' },
              { ask: 'Conclusion:', options: ['Unique solution, since $f$ is continuous and Lipschitz in $y$', 'No solution', 'Infinitely many solutions'], answer: 0, hint: 'Cite the theorem.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'To check the Lipschitz condition for $f = 1 + x\\sin(xy)$, a student computes $\\tfrac{\\partial f}{\\partial x}$. What is wrong?',
          options: [
            { text: 'The condition is about how $f$ changes with $y$, so use $\\tfrac{\\partial f}{\\partial y}$', correct: true, why: '$|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$ compares two $y$ values at the same $x$.' },
            { text: 'Nothing; either derivative works', why: 'Only the $y$-derivative controls the Lipschitz constant.' },
            { text: 'They should use $\\tfrac{d^2f}{dx^2}$', why: 'No second derivatives are needed.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$f(x, y) = |xy|$ on $1 \\le x \\le 2$, $-3 \\le y \\le 4$',
          graph: {
            steps: [
              { ask: '$|f(x, y_1) - f(x, y_2)| \\le |x|\\,|y_1 - y_2|$. Largest $|x|$ on $D$?', answer: 2, tol: 0.001, hint: '$x$ runs from $1$ to $2$.' },
              { ask: 'So $L = $?', answer: 2, tol: 0.001, hint: 'The bound on $|x|$.' },
            ],
            after: '$f$ satisfies a Lipschitz condition on $D$ with $L = 2$. The $y$-range doesn’t matter here; only $x$ appears in the bound.',
          },
        },
        {
          type: 'finish',
          title: 'You can show an IVP is well-behaved.',
          body: '**Summary:** an IVP is an ODE plus initial conditions; Lipschitz in $y$ ($|\\partial f/\\partial y| \\le L$ on a convex $D$) plus continuity gives a unique solution; well-posed adds stability.\n\n**Next:** **Euler’s method**, which actually computes the solution, step by step along the slope. It is the Taylor series cut after one term.',
        },
      ],
    },
  ],
};
