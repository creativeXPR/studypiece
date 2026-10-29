// MTH 209 · Initial value problems in ODEs · Lesson 1: IVPs, convex sets and the Lipschitz condition.

export default {
  id: 'ivp-intro',
  title: 'Initial value problems and the Lipschitz condition',
  covers: 'General vs particular solutions, the three kinds of IVP, convex sets, the Lipschitz condition, |xy| on a rectangle',
  minutes: 16,
  sections: [
    {
      name: 'What an IVP is',
      terms: [
        ['Initial value problem (IVP)', 'A differential equation (or system) together with conditions on the solution at the initial point, e.g. $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$.'],
        ['General vs particular solution', 'The general solution contains arbitrary constants; the initial conditions fix them, giving one particular solution.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Initial value problems · Lesson 1',
          title: 'A pendulum needs a starting point',
          body: 'A swinging pendulum of length $L$ obeys\n$$\\frac{d^2\\theta}{dt^2} + \\frac{g}{L}\\sin\\theta = 0,$$\nwhere $\\theta$ is the angle with the vertical and $g$ is the acceleration due to gravity.\n\nThis equation alone allows infinitely many motions. To know **which** one happens, you must say where the pendulum starts, $\\theta(t_0) = \\theta_0$, and how fast, $\\theta\'(t_0) = \\theta\'_0$. A differential equation plus such conditions is an ==initial value problem==.',
          cta: 'Define it',
        },
        {
          type: 'story',
          eyebrow: 'Definition',
          title: 'Conditions at the start',
          body: 'An ==initial value problem== is a differential equation, or a system of them, whose solution values are specified at the **initial point** (the beginning) of the interval.\n\nSolving a DE gives a ==general solution== with arbitrary constants. The initial conditions pin those constants down, leaving one ==particular solution==.\n\n**Rule:** the number of initial conditions equals the **order** of the differential equation.',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'How many initial conditions does $y\'\'\' + xy\' - y = \\sin x$ need?',
          options: [
            { text: 'Three: $y(a)$, $y\'(a)$ and $y\'\'(a)$', correct: true, why: 'It is third order, so three conditions: the value and the first two derivatives at $x = a$.' },
            { text: 'One: $y(a)$', why: 'One condition is enough only for a first-order equation.' },
            { text: 'Two: $y(a)$ and $y(b)$', why: 'Conditions at two different points make a boundary value problem, and here you need three.' },
            { text: 'Four', why: 'The order is 3 (highest derivative $y\'\'\'$).' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Three kinds',
          title: 'The IVPs we approximate',
          cards: [
            { title: '1 · One first-order equation', text: '$\\dfrac{dy}{dx} = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$.' },
            { title: '2 · A system of first-order equations', text: '$\\dfrac{dy_i}{dx} = f_i(x, y_1, \\ldots, y_n)$, $y_i(a) = \\alpha_i$, $i = 1, \\ldots, n$.' },
            { title: '3 · One nth-order equation', text: '$y^{(n)} = f(x, y, y\', \\ldots, y^{(n-1)})$ with $y(a) = \\alpha_1$, $y\'(a) = \\alpha_2$, …, $y^{(n-1)}(a) = \\alpha_n$: $n$ initial conditions.' },
          ],
          note: 'Before approximating any of them, we must check the problem actually has a unique solution. That needs the Lipschitz condition.',
        },
        {
          type: 'bridge',
          title: 'IVPs: defined.',
          recap: [
            'An IVP = a DE + conditions at the initial point.',
            'Number of initial conditions = order of the DE.',
          ],
          why: 'Next: the two ideas used to prove a unique solution exists.',
        },
      ],
    },
    {
      name: 'Convex sets and the Lipschitz condition',
      terms: [
        ['Convex set', '$D \\subset \\mathbb{R}^2$ is convex if, whenever $(x_1, y_1), (x_2, y_2) \\in D$, the point $((1-\\lambda)x_1 + \\lambda x_2,\\ (1-\\lambda)y_1 + \\lambda y_2)$ is in $D$ for every $\\lambda \\in [0, 1]$.'],
        ['Lipschitz condition', '$f(x, y)$ satisfies a Lipschitz condition in $y$ on $D$ if a constant $L > 0$ exists with $|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$ for all $(x, y_1), (x, y_2) \\in D$. $L$ is the Lipschitz constant.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Convex sets',
          title: 'Every connecting line stays inside',
          body: 'A set $D \\subset \\mathbb{R}^2$ is ==convex== if, whenever $(x_1, y_1)$ and $(x_2, y_2)$ are in $D$, so is\n$$\\big((1 - \\lambda)x_1 + \\lambda x_2,\\ (1 - \\lambda)y_1 + \\lambda y_2\\big)\\quad \\text{for every } \\lambda \\in [0, 1].$$\n\nIn pictures: the straight line joining **any** two points of $D$ lies **entirely** in $D$. A disc or a rectangle is convex. A crescent or a kidney shape is not: some connecting lines leave the shape.',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'Which set is convex?',
          options: [
            { text: '$D = \\{(x, y): a \\le x \\le b,\\ -\\infty < y < \\infty\\}$', correct: true, why: 'An infinite vertical strip: any segment between two points of it stays between $x = a$ and $x = b$.' },
            { text: 'A ring $\\{1 \\le x^2 + y^2 \\le 4\\}$', why: 'The segment joining $(-1.5, 0)$ and $(1.5, 0)$ passes through the hole.' },
            { text: 'A crescent moon shape', why: 'Lines joining its two tips leave the shape.' },
            { text: 'Two separate discs', why: 'A segment from one disc to the other crosses the gap.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Lipschitz condition',
          title: 'f can’t change faster than L times the change in y',
          body: 'A function $f(x, y)$ satisfies a ==Lipschitz condition== in $y$ on $D \\subset \\mathbb{R}^2$ if there is a constant $L > 0$ with\n$$|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|\\quad \\text{whenever } (x, y_1), (x, y_2) \\in D.$$\n$L$ is called the ==Lipschitz constant==.\n\nNotice $x$ is the **same** in both terms: only $y$ changes.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Show $f(x, y) = |xy|$ is Lipschitz on $D = \\{1 \\le x \\le 2,\\ -3 \\le y \\le 4\\}$',
          body: 'For $(x, y_1), (x, y_2) \\in D$:\n$$\\begin{aligned} |f(x, y_1) - f(x, y_2)| &= \\big||x y_1| - |x y_2|\\big| \\\\ &= |x|\\,\\big||y_1| - |y_2|\\big| \\\\ &\\le |x|\\,|y_1 - y_2| \\\\ &\\le 2|y_1 - y_2|, \\end{aligned}$$\nusing $\\big||y_1| - |y_2|\\big| \\le |y_1 - y_2|$ and $|x| \\le 2$ on $D$.\n\nSo $f$ satisfies a Lipschitz condition on $D$ with **$L = 2$**.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find a Lipschitz constant for $f(x, y) = x^2y$ on $D = \\{0 \\le x \\le 3,\\ -\\infty < y < \\infty\\}$.',
          options: [
            { text: '$L = 9$', correct: true, why: '$|x^2y_1 - x^2y_2| = x^2|y_1 - y_2| \\le 9|y_1 - y_2|$, since $x^2 \\le 9$ on $D$.' },
            { text: '$L = 3$', why: 'The factor is $x^2$, which can be as big as $3^2 = 9$.' },
            { text: '$L = 6$', why: 'That would be $\\frac{\\partial}{\\partial x}(x^2) = 2x$ at $x = 3$, but we need the factor multiplying $y$, which is $x^2$.' },
            { text: 'No Lipschitz constant exists because $y$ is unbounded', why: 'Only the factor multiplying $(y_1 - y_2)$ must be bounded, and $x^2 \\le 9$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'A quick test',
          title: 'Bound $\\partial f / \\partial y$',
          body: 'If $f$ is defined on a **convex** set $D$ and a constant $L > 0$ exists with\n$$\\left|\\frac{\\partial f}{\\partial y}(x, y)\\right| \\le L\\quad \\text{for all } (x, y) \\in D,$$\nthen $f$ satisfies a Lipschitz condition on $D$ with constant $L$.\n\nWhy: by the mean value theorem, $f(x, y_2) - f(x, y_1) = \\frac{\\partial f}{\\partial y}(x, \\xi)\\,(y_2 - y_1)$ for some $\\xi$ between $y_1$ and $y_2$. Convexity guarantees $(x, \\xi)$ is in $D$. For $x^2y$ above: $\\frac{\\partial f}{\\partial y} = x^2 \\le 9$. ✓',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Define the Lipschitz condition',
          body: 'A function $f(x, y)$ is said to satisfy a Lipschitz condition in the variable $y$ on a set $D \\subset \\mathbb{R}^2$ if a constant $L > 0$ exists such that\n$$|f(x, y_1) - f(x, y_2)| \\le L|y_1 - y_2|$$\nwhenever $(x, y_1), (x, y_2) \\in D$. The constant $L$ is called the Lipschitz constant for $f$.\n\nIf $D$ is convex and $\\left|\\frac{\\partial f}{\\partial y}\\right| \\le L$ on $D$, then $f$ satisfies a Lipschitz condition on $D$ with constant $L$.',
        },
        {
          type: 'finish',
          title: 'Lipschitz condition: done.',
          body: 'Next: using it to prove an IVP has exactly one solution. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
