// MTH 209 · Initial value problems in ODEs · Lesson 3: Euler's method.

export default {
  id: 'euler',
  title: 'Euler’s method',
  covers: 'Mesh points, deriving yᵢ₊₁ = yᵢ + h f(xᵢ, yᵢ) from Taylor’s series, y′ = y − x² + 1 with h = 0.5, error vs step size',
  minutes: 16,
  sections: [
    {
      name: 'Deriving the method',
      terms: [
        ['Mesh points', '$x_i = a + ih$, $i = 0, 1, \\ldots, n$, with step size $h = \\dfrac{b - a}{n}$.'],
        ['Euler’s method', '$y_0 = \\alpha$, $y_{i+1} = y_i + h\\,f(x_i, y_i)$, $i = 0, 1, \\ldots, n - 1$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Initial value problems · Lesson 3',
          title: 'Walk along the tangent',
          body: 'There are many methods for solving a differential equation numerically. ==Euler’s method== is the simplest.\n\nFor the well-posed IVP\n$$y\' = \\frac{dy}{dx} = f(x, y),\\quad a \\le x \\le b,\\quad y(a) = \\alpha,$$\nwe don’t find a formula for $y(x)$. Instead we find **approximate values of $y$ at a set of points** across $[a, b]$, by repeatedly stepping a short distance along the tangent line.',
          cta: 'Set up the points',
        },
        {
          type: 'story',
          eyebrow: 'Mesh points',
          title: 'Split $[a, b]$ into $n$ equal steps',
          body: 'Divide $[a, b]$ into $n$ equal subintervals of width\n$$h = \\frac{b - a}{n}.$$\nThe ==mesh points== are\n$$x_0 = a,\\ x_1 = a + h,\\ x_2 = a + 2h,\\ \\ldots,\\ x_n = a + nh = b,$$\nthat is, $x_i = a + ih$. We will compute $y_i \\approx y(x_i)$ at each one.',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'For $0 \\le x \\le 2$ with $h = 0.5$, what are $n$ and the mesh points?',
          options: [
            { text: '$n = 4$: $x = 0, 0.5, 1.0, 1.5, 2.0$', correct: true, why: '$n = \\frac{2 - 0}{0.5} = 4$ steps, so 5 mesh points.' },
            { text: '$n = 5$: $x = 0, 0.5, 1.0, 1.5, 2.0$', why: 'Five mesh points but only $4$ steps: $n = \\frac{b - a}{h} = 4$.' },
            { text: '$n = 4$: $x = 0.5, 1.0, 1.5, 2.0$', why: 'The first mesh point is $x_0 = a = 0$.' },
            { text: '$n = 2$: $x = 0, 1, 2$', why: 'That uses $h = 1$, not $0.5$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The derivation',
          title: 'Cut Taylor’s series after the first derivative',
          body: 'Expand $y$ about $x_i$ by Taylor’s series:\n$$y(x_i + h) = y(x_i) + h\\,y\'(x_i) + \\frac{h^2}{2!}y\'\'(x_i) + \\frac{h^3}{3!}y\'\'\'(x_i) + \\cdots$$\nFor small $h$ the $h^2$ and higher terms are tiny. Dropping them (this is the ==truncation error==) and using $y\'(x_i) = f(x_i, y(x_i))$:\n$$y(x_{i+1}) \\approx y(x_i) + h\\,f(x_i, y(x_i)).$$\nWriting $y_i$ for the approximation gives ==Euler’s method==:\n$$y_0 = \\alpha,\\qquad y_{i+1} = y_i + h\\,f(x_i, y_i),\\quad i = 0, 1, \\ldots, n - 1.$$',
        },
        {
          type: 'bridge',
          title: 'Method: derived.',
          recap: [
            'Mesh: $x_i = a + ih$, $h = \\frac{b - a}{n}$.',
            'Step: $y_{i+1} = y_i + h\\,f(x_i, y_i)$, from Taylor’s series cut after $h\\,y\'$.',
          ],
          why: 'Now a full worked example.',
        },
      ],
    },
    {
      name: 'Worked example',
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$y\' = y - x^2 + 1$, $0 \\le x \\le 2$, $y(0) = 0.5$, $h = 0.5$',
          body: 'Here $f(x, y) = y - x^2 + 1$, $x_0 = 0$, $y_0 = 0.5$, and the mesh points are $0, 0.5, 1.0, 1.5, 2.0$.\n\n$$y_1 = y_0 + h\\,f(x_0, y_0) = 0.5 + 0.5\\,(0.5 - 0^2 + 1) = 0.5 + 0.75 = 1.25.$$\n\nSo $y(0.5) \\approx 1.25$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $y_2 \\approx y(1.0)$, using $x_1 = 0.5$, $y_1 = 1.25$.',
          options: [
            { text: '$2.25$', correct: true, why: '$1.25 + 0.5\\,(1.25 - 0.5^2 + 1) = 1.25 + 0.5(2) = 2.25$.' },
            { text: '$2.375$', why: 'Use $x_1 = 0.5$ in $f$, not $x_0 = 0$: $f = 1.25 - 0.25 + 1 = 2$.' },
            { text: '$3.25$', why: 'Multiply $f$ by $h = 0.5$ before adding.' },
            { text: '$2.0$', why: '$2$ is $f(x_1, y_1)$. The new value is $y_1 + h f = 1.25 + 1 = 2.25$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'All four steps, and the true values',
          body: '$$\\begin{array}{c|c|c|c|c} i & x_i & y_i\\ (\\text{Euler}) & y(x_i)\\ (\\text{exact}) & \\text{error} \\\\ \\hline 0 & 0 & 0.5 & 0.5 & 0 \\\\ 1 & 0.5 & 1.25 & 1.4256 & 0.18 \\\\ 2 & 1.0 & 2.25 & 2.6409 & 0.39 \\\\ 3 & 1.5 & 3.375 & 4.0092 & 0.63 \\\\ 4 & 2.0 & 4.4375 & 5.3055 & 0.87 \\end{array}$$\n\n$y_3 = 2.25 + 0.5(2.25 - 1 + 1) = 3.375$ and $y_4 = 3.375 + 0.5(3.375 - 2.25 + 1) = 4.4375$. The exact solution is $y = (x + 1)^2 - 0.5e^x$.\n\nWith $h = 0.25$ (8 steps) Euler gives $y(2) \\approx 4.7797$: the error drops from $0.87$ to $0.53$. Euler is ==first order==: halving $h$ roughly halves the error.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Use Euler’s method with $h = 0.1$ on $y\' = x + y$, $y(0) = 1$ to estimate $y(0.2)$.',
          options: [
            { text: '$1.22$', correct: true, why: '$y_1 = 1 + 0.1(0 + 1) = 1.1$; $y_2 = 1.1 + 0.1(0.1 + 1.1) = 1.22$. (Exact: $1.2428$.)' },
            { text: '$1.2$', why: 'Recompute $f$ at the new point: $f(0.1, 1.1) = 1.2$, not $1$.' },
            { text: '$1.11$', why: 'That is the exact value at $x = 0.1$, not Euler at $x = 0.2$.' },
            { text: '$1.32$', why: 'Multiply $f$ by $h = 0.1$: $1.1 + 0.12 = 1.22$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Euler’s method gives approximations only at the mesh points.', correct: true, why: '**Discrete values**, not a continuous formula.' },
            { text: 'A smaller step size $h$ usually gives a more accurate answer.', correct: true, why: '**First order**: the error is roughly proportional to $h$.' },
            { text: 'Euler’s method comes from keeping the first two terms of Taylor’s series.', correct: true, why: '**$y(x + h) \\approx y(x) + h\\,y\'(x)$**.' },
            { text: 'Errors stay the same size at every step.', why: '**They accumulate**: in the table they grow from $0.18$ to $0.87$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Derive Euler’s method',
          body: 'Consider $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$. Choose $n$, let $h = \\frac{b - a}{n}$ and $x_i = a + ih$, $i = 0, 1, \\ldots, n$. By Taylor’s series,\n$$y(x_{i+1}) = y(x_i) + h\\,y\'(x_i) + \\frac{h^2}{2}y\'\'(\\xi_i)$$\nfor some $\\xi_i \\in (x_i, x_{i+1})$. Since $y\'(x_i) = f(x_i, y(x_i))$, neglecting the remainder term gives\n$$y_0 = \\alpha,\\qquad y_{i+1} = y_i + h\\,f(x_i, y_i),\\quad i = 0, 1, \\ldots, n - 1,$$\nwhere $y_i \\approx y(x_i)$. This is Euler’s method.',
        },
        {
          type: 'finish',
          title: 'Initial value problems: done.',
          body: 'That completes every MTH 209 topic. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
