// MTH 209 · Solutions of equations · Exam practice. Built from the shape of past examination
// questions: locating roots from a table of values, constructing iteration formulas and stating
// observations about convergence, testing given iterations, Newton-Raphson (including a repeated
// root), and choosing suitable iteration formulas for a transcendental equation.

export default {
  id: 'exam-equations',
  title: 'Exam practice: solving equations',
  covers: 'Exam-style questions: locating roots from a table of values, constructing iteration formulas and stating observations about convergence, deciding which iteration works and why, Newton-Raphson with observations, repeated roots, and iteration formulas for transcendental equations',
  minutes: 25,
  sections: [
    {
      name: 'Locate, iterate, observe',
      terms: [
        ['Locating roots', 'Tabulate $f$ at whole numbers; a sign change between neighbours traps a root. A value of exactly $0$ is a root.'],
        ['Convergence test', 'For $x_{n+1} = g(x_n)$ near a root $\\alpha$: converges if $|g\'(\\alpha)| < 1$, diverges if $|g\'(\\alpha)| > 1$. Smaller $|g\'|$ means faster.'],
        ['Observations', 'Say which formulas converge, to which root, how fast, and **why** (the size of $|g\'|$, or a near-zero $f\'$ for Newton).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'How these questions are set',
          body: 'Equation questions usually come in a chain: **(i)** tabulate $f$ to find where the roots are, **(ii)** construct iteration formulas and run them, **(iii)** use Newton-Raphson, and each time **"state your observations"**.\n\nThe observations carry real marks. Keep the pictures in mind: a cobweb pulls in when $g$ is flatter than $y = x$ and throws you out when it is steeper; a tangent that is nearly flat throws Newton far away.',
          cta: 'Start',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Given $f(x) = 2x^3 - 7x + 2 = 0$: (i) by first constructing a table of values of $f(x)$ for $x \\in \\{-2, -1, 0, 1, 2\\}$, find the intervals containing the roots.',
          graph: {
            steps: [
              { ask: '$f(-2) = $', answer: 0, tol: 0, hint: '$2(-8) + 14 + 2$.' },
              { ask: '$f(-1) = $', answer: 7, tol: 0, hint: '$-2 + 7 + 2$.' },
              { ask: '$f(0) = $', answer: 2, tol: 0, hint: 'Just the constant.' },
              { ask: '$f(1) = $', answer: -3, tol: 0, hint: '$2 - 7 + 2$.' },
              { ask: '$f(2) = $', answer: 4, tol: 0, hint: '$16 - 14 + 2$.' },
              { ask: 'So the roots are', options: ['$x = -2$ exactly, one in $(0, 1)$ and one in $(1, 2)$', 'one in $(-2, -1)$ and one in $(1, 2)$', 'only one, in $(0, 1)$'], answer: 0, hint: '$f(-2) = 0$, and the sign changes between $0$ and $1$, and between $1$ and $2$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1 (ii)',
          title: 'Construct iteration formulas and obtain the roots in $(0, 1)$ and $(1, 2)$ to 3 decimal places, using $x_0 = 1$ and/or $x_0 = 2$. State your observations.',
          body: 'Two rearrangements: $x = \\frac{2x^3 + 2}{7}$ and $x = \\sqrt[3]{\\frac{7x - 2}{2}}$.',
          graph: {
            steps: [
              { ask: 'With $x = \\frac{2x^3 + 2}{7}$ from $x_0 = 1$: $x_1 = $ (5 d.p.)', answer: 0.57143, tol: 0.00002, hint: '$\\frac{2 + 2}{7}$.' },
              { ask: '$x_2 = $ (5 d.p.)', answer: 0.33903, tol: 0.00002, hint: '$\\frac{2(0.57143)^3 + 2}{7}$.' },
              { ask: 'It settles on the root (3 d.p.)', answer: 0.293, tol: 0.0006, hint: '$x_3 = 0.29685$, $x_4 = 0.29319$, $x_5 = 0.29291$.' },
              { ask: 'Same formula from $x_0 = 2$: $x_1 = $ (4 d.p.)', answer: 2.5714, tol: 0.0002, hint: '$\\frac{16 + 2}{7}$.' },
              { ask: 'Then $x_2 = 5.14$, $x_3 = 39.2$, … Why?', options: ['At the root near $1.707$, $|g\'(x)| = \\frac{6x^2}{7} \\approx 2.5 > 1$: it diverges', 'The starting value was not a whole number', 'The formula is wrong'], answer: 0, hint: 'Compare the slope of $g$ with $1$ at that root.' },
              { ask: 'With $x = \\sqrt[3]{\\frac{7x - 2}{2}}$ from $x_0 = 2$: the root (3 d.p.)', answer: 1.707, tol: 0.0006, hint: '$x_1 = 1.81712$, $x_2 = 1.75006$, … it creeps down to $1.7071$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Model observations',
          title: 'What to write for (ii)',
          body: '**1.** $x = \\frac{2x^3 + 2}{7}$ converges from $x_0 = 1$ to the root $0.293$ (3 d.p.), because near it $|g\'(x)| = \\frac{6x^2}{7} \\approx 0.07 < 1$: very fast.\n\n**2.** The same formula **diverges** from $x_0 = 2$: near the root $1.707$ its slope is about $2.5 > 1$, so each step throws the estimate further away. One formula cannot find every root.\n\n**3.** $x = \\sqrt[3]{\\frac{7x - 2}{2}}$ converges from $x_0 = 2$ to $1.707$, slowly ($|g\'| \\approx 0.4$).\n\n(In fact the roots are $-2$ and $1 \\pm \\frac{1}{\\sqrt2} = 0.29289, 1.70711$.)',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1 (iii)',
          title: 'Use the Newton-Raphson formula for $f(x) = 2x^3 - 7x + 2$. Discuss your observations.',
          body: '$x_{n+1} = x_n - \\frac{2x_n^3 - 7x_n + 2}{6x_n^2 - 7}$.',
          graph: {
            steps: [
              { ask: 'From $x_0 = 2$: $x_1 = 2 - \\frac{4}{17} = $ (5 d.p.)', answer: 1.76471, tol: 0.00002, hint: '$f(2) = 4$, $f\'(2) = 17$.' },
              { ask: '$x_2 = $ (5 d.p.)', answer: 1.71008, tol: 0.00003, hint: 'One more Newton step.' },
              { ask: '$x_3 = $ (5 d.p.)', answer: 1.70712, tol: 0.00003, hint: 'Already correct to 4 d.p.' },
              { ask: 'From $x_0 = 1$: $f(1) = -3$, $f\'(1) = -1$, so $x_1 = $', answer: -2, tol: 0, hint: '$1 - \\frac{-3}{-1}$.' },
              { ask: 'Observation', options: ['From $x_0 = 1$ the tangent is shallow ($f\'(1) = -1$), so Newton jumps straight to the far root $-2$ instead of the nearby one', 'Newton cannot find $-2$', 'Newton diverges from $x_0 = 2$'], answer: 0, hint: 'A small $f\'$ throws the next estimate far away.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'Question 1: done.',
          recap: ['Tabulate, iterate, Newton, and observe each time.', 'Observations = which root, how fast, and why.'],
          why: 'More past-paper styles next.',
        },
      ],
    },
    {
      name: 'More exam styles',
      terms: [
        ['Newton for $x^ke^x$', '$x_{n+1} = \\frac{(k - 1)x_n + x_n^2}{k + x_n}$; the root $0$ has multiplicity $k$.'],
        ['Multiple roots', 'Newton converges only linearly to a repeated root: the tangents are nearly flat there.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Determine in which of the intervals $[-4, -3]$, $[4, 5]$, $[0, 1]$, $[2, 3]$ the cubic $x^3 - 10x + 4 = 0$ has roots.',
          graph: {
            steps: [
              { ask: '$f(-4) = $', answer: -20, tol: 0, hint: '$-64 + 40 + 4$.' },
              { ask: '$f(-3) = $', answer: 7, tol: 0, hint: '$-27 + 30 + 4$.' },
              { ask: '$f(4)$ and $f(5)$ are $28$ and $79$. Root in $[4, 5]$?', options: ['No: no sign change', 'Yes'], answer: 0, hint: 'Both positive.' },
              { ask: '$f(1) = $', answer: -5, tol: 0, hint: '$1 - 10 + 4$; and $f(0) = 4$.' },
              { ask: '$f(2) = -8$, $f(3) = $', answer: 1, tol: 0, hint: '$27 - 30 + 4$.', done: 'Roots in $[-4, -3]$, $[0, 1]$ and $[2, 3]$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'For $f(x) = x^3 - 4x^2 + x - 10$ with $x_0 = 4$, decide whether (i) $x_{n+1} = 10 - x_n^3 + 4x_n^2$, (ii) $x_{n+1} = \\frac{4x_n^2 - x_n + 10}{x_n^2}$ can be used to find the root to 5 significant figures.',
          graph: {
            steps: [
              { ask: '(i) $x_1 = $', answer: 10, tol: 0, hint: '$10 - 64 + 64$.' },
              { ask: '(i) $x_2 = $', answer: -590, tol: 0, hint: '$10 - 1000 + 400$.' },
              { ask: '(ii) $x_1 = $ (4 d.p.)', answer: 4.375, tol: 0.0002, hint: '$\\frac{64 - 4 + 10}{16}$.' },
              { ask: '(ii) the root to 5 s.f.', answer: 4.3069, tol: 0.00006, hint: '$4.2939, 4.3095, 4.3064, 4.3070, \\ldots$' },
              { ask: 'Reason', options: ['Near the root, (i) has $|g\'| \\approx 21 > 1$ (diverges) while (ii) has $|g\'| \\approx 0.20 < 1$ (converges)', 'Both diverge', '(i) converges faster'], answer: 0, hint: '$g_1\'(x) = -3x^2 + 8x$, $g_2\'(x) = \\frac{1}{x^2} - \\frac{20}{x^3}$, at $x \\approx 4.31$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Using Newton-Raphson, show that the solution of $x^ke^x = 0$ is given by $x_{n+1} = \\frac{(k - 1)x_n + x_n^2}{k + x_n}$. With $x_0 = 1$, find $x_5$ to 6 d.p. for $k = 1$ and $k = 2$ and explain the difference.',
          body: '$f\'(x) = (kx^{k-1} + x^k)e^x$, so $\\frac{f}{f\'} = \\frac{x}{k + x}$ and $x - \\frac{x}{k + x} = \\frac{(k - 1)x + x^2}{k + x}$.',
          graph: {
            steps: [
              { ask: '$k = 1$: $x_1 = \\frac{x_0^2}{1 + x_0} = $', answer: 0.5, tol: 0.0001, hint: '$\\frac{1}{2}$.' },
              { ask: '$k = 1$: $x_5 = $ (6 d.p.)', answer: 0, tol: 0.0000006, hint: '$0.5, 0.166667, 0.023810, 0.000554, 0.000000$.' },
              { ask: '$k = 2$: $x_1 = \\frac{x_0 + x_0^2}{2 + x_0} = $ (6 d.p.)', answer: 0.666667, tol: 0.000002, hint: '$\\frac{2}{3}$.' },
              { ask: '$k = 2$: $x_5 = $ (6 d.p.)', answer: 0.072003, tol: 0.000002, hint: '$0.416667, 0.244253, 0.135418, 0.072003$.' },
              { ask: 'Why is $k = 2$ so much slower?', options: ['$x = 0$ is a double root; Newton converges only linearly to repeated roots', 'The formula is wrong for $k = 2$', '$x_0 = 1$ is too far for $k = 2$ only'], answer: 0, hint: 'For $k = 1$ the root is simple: quadratic convergence.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Question 5',
          prompt: 'Which iteration formula for $\\sin x + x - 1 = 0$ (root $\\approx 0.511$) is suitable?',
          options: [
            { text: '$x_{n+1} = 1 - \\sin x_n$', correct: true, why: '$|g\'(x)| = |\\cos x| \\approx 0.87 < 1$ near the root: it converges (slowly, oscillating: $0.5206, 0.5026, 0.5183, \\ldots$).' },
            { text: '$x_{n+1} = \\sin^{-1}(1 - x_n)$', why: '$|g\'(x)| = \\frac{1}{\\sqrt{1 - (1 - x)^2}} \\approx 1.15 > 1$ near the root: it diverges.' },
            { text: '$x_{n+1} = 1 - x_n - \\sin x_n$', why: 'That isn’t a rearrangement of the equation: its fixed point satisfies $2x + \\sin x = 1$.' },
            { text: '$x_{n+1} = \\sin x_n + x_n - 1$', why: 'Its fixed points satisfy $\\sin x = 1$, a different equation.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which observations are correct?',
          options: [
            { text: 'Bisection always converges once $f(a)f(b) < 0$, but slowly', correct: true, why: 'It halves the bracket every step.' },
            { text: 'Regula Falsi can converge slowly because one end stays fixed', correct: true, why: 'The chords pivot about the same far point.' },
            { text: 'Newton-Raphson converges quadratically to a simple root from a good start', correct: true, why: 'Correct digits roughly double.' },
            { text: 'The secant method keeps a bracket around the root', why: '**False:** it uses the two newest points, bracket or not.' },
            { text: 'Any rearrangement $x = g(x)$ converges if $x_0$ is close enough', why: '**False:** it needs $|g\'| < 1$ at the root.' },
          ],
        },
        {
          type: 'finish',
          title: 'Solving equations: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
