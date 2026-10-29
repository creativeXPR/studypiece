// MTH 209 · Initial value problems in ODEs · Lesson 2: unique solutions and well-posed problems.

export default {
  id: 'ivp-unique',
  title: 'Unique solutions and well-posed problems',
  covers: 'The existence and uniqueness theorem, y′ = 1 + x sin(xy), well-posed problems and perturbations',
  minutes: 14,
  sections: [
    {
      name: 'The uniqueness theorem',
      terms: [
        ['Existence and uniqueness theorem', 'If $D = \\{(x, y): a \\le x \\le b,\\ -\\infty < y < \\infty\\}$, $f$ is continuous on $D$ and satisfies a Lipschitz condition in $y$ on $D$, then $y\' = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$ has a unique solution $y(x)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Initial value problems · Lesson 2',
          title: 'Check before you compute',
          body: 'A numerical method will happily produce numbers for **any** IVP, even one with no solution or with several. Those numbers would be meaningless.\n\nSo in numerical analysis, before solving a DE we always **verify that it has a unique solution**. The Lipschitz condition is the tool.',
          cta: 'The theorem',
        },
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'Lipschitz in y ⟹ exactly one solution',
          body: 'Suppose $D = \\{(x, y): a \\le x \\le b,\\ -\\infty < y < \\infty\\}$ and $f(x, y)$ is continuous on $D$.\n\nIf $f$ satisfies a ==Lipschitz condition== on $D$ in the variable $y$, then the initial value problem\n$$y\'(x) = f(x, y),\\quad a \\le x \\le b,\\quad y(a) = \\alpha$$\nhas a ==unique solution== $y(x)$ for $a \\le x \\le b$.\n\nIn practice we show Lipschitz by bounding $\\left|\\frac{\\partial f}{\\partial y}\\right| \\le L$ on $D$ (the strip $D$ is convex).',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Show $y\' = 1 + x\\sin(xy)$, $0 \\le x \\le 2$, $y(0) = 0$ has a unique solution',
          body: 'Here $f(x, y) = 1 + x\\sin(xy)$, continuous on $D = \\{0 \\le x \\le 2,\\ -\\infty < y < \\infty\\}$.\n\nDifferentiate with respect to $y$, treating $x$ as a constant. By the chain rule $\\frac{\\partial}{\\partial y}\\sin(xy) = x\\cos(xy)$, so\n$$\\frac{\\partial f}{\\partial y} = x \\cdot x\\cos(xy) = x^2\\cos(xy).$$\nSince $|\\cos(xy)| \\le 1$ and $x^2 \\le 4$ on $D$:\n$$\\left|\\frac{\\partial f}{\\partial y}\\right| = |x^2\\cos(xy)| \\le 4.$$\nSo $f$ is Lipschitz in $y$ on $D$ with $L = 4$, and by the theorem the IVP has a **unique solution**.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $y\' = 2xy + x^2$, $0 \\le x \\le 1$, $y(0) = 1$, which Lipschitz constant works?',
          options: [
            { text: '$L = 2$, so the IVP has a unique solution', correct: true, why: '$\\frac{\\partial f}{\\partial y} = 2x$ and $|2x| \\le 2$ on $0 \\le x \\le 1$.' },
            { text: '$L = 3$', why: 'The $x^2$ term doesn’t involve $y$, so it vanishes when you differentiate with respect to $y$.' },
            { text: '$L = 1$', why: '$|2x|$ reaches $2$ at $x = 1$.' },
            { text: 'No $L$ exists, because $y$ is unbounded', why: 'Only $\\frac{\\partial f}{\\partial y} = 2x$ needs to be bounded, and it is.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Uniqueness: proved.',
          recap: [
            'Continuous $f$ + Lipschitz in $y$ on the strip ⟹ a unique solution.',
            'Show Lipschitz by bounding $\\left|\\frac{\\partial f}{\\partial y}\\right|$.',
          ],
          why: 'One more requirement: the problem must be well posed.',
        },
      ],
    },
    {
      name: 'Well-posed problems',
      terms: [
        ['Well-posed problem', 'An IVP that has a unique solution, and for which small perturbations of the equation and initial value cause only small changes in the solution: $|z(x) - y(x)| < k\\varepsilon$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Definition',
          title: 'Small errors in, small errors out',
          body: 'The IVP $\\frac{dy}{dx} = f(x, y)$, $a \\le x \\le b$, $y(a) = \\alpha$ is ==well posed== if:\n\n**1.** a unique solution $y(x)$ exists; and\n\n**2.** there are constants $\\varepsilon_0 > 0$ and $k > 0$ such that, for every $\\varepsilon$ with $\\varepsilon_0 > \\varepsilon > 0$, whenever $\\delta(x)$ is continuous with $|\\delta(x)| < \\varepsilon$ on $[a, b]$ and $|\\delta_0| < \\varepsilon$, the perturbed problem\n$$\\frac{dz}{dx} = f(x, z) + \\delta(x),\\quad z(a) = \\alpha + \\delta_0$$\nhas a unique solution $z(x)$ with $|z(x) - y(x)| < k\\varepsilon$ for all $x \\in [a, b]$.',
        },
        {
          type: 'story',
          eyebrow: 'Why it matters',
          title: 'Every computer perturbs the problem',
          body: 'Rounding errors mean a computer never solves the exact IVP. It solves a slightly **perturbed** one. If tiny perturbations could wreck the solution, no numerical answer could be trusted.\n\nGood news: the same conditions are enough. **If $f$ is continuous and satisfies a Lipschitz condition in $y$ on $D = \\{a \\le x \\le b,\\ -\\infty < y < \\infty\\}$, the IVP is well posed.**',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'A well-posed IVP must have a unique solution.', correct: true, why: '**Condition 1** of the definition.' },
            { text: 'Continuity plus a Lipschitz condition in $y$ on the strip guarantees a well-posed IVP.', correct: true, why: '**The well-posedness theorem.**' },
            { text: 'Bounding $\\left|\\frac{\\partial f}{\\partial y}\\right|$ on a convex set gives a Lipschitz constant.', correct: true, why: '**Mean value theorem** on a convex set.' },
            { text: 'If a numerical method returns numbers, the IVP must have a unique solution.', why: '**Methods don’t check**: you must verify uniqueness yourself.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the steps for showing an IVP has a unique solution in order.',
          items: [
            'Identify $f(x, y)$ and the domain $D = \\{a \\le x \\le b,\\ -\\infty < y < \\infty\\}$.',
            'Note that $f$ is continuous on $D$.',
            'Differentiate: find $\\frac{\\partial f}{\\partial y}$, treating $x$ as a constant.',
            'Bound it: $\\left|\\frac{\\partial f}{\\partial y}\\right| \\le L$ for all $(x, y) \\in D$.',
            'Conclude: $f$ is Lipschitz in $y$, so the IVP has a unique solution.',
          ],
          explain: 'Write the final sentence in full: it is where the theorem is actually used.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'State the existence and uniqueness theorem',
          body: 'Suppose that $D = \\{(x, y) \\mid a \\le x \\le b,\\ -\\infty < y < \\infty\\}$ and that $f(x, y)$ is continuous on $D$. If $f$ satisfies a Lipschitz condition on $D$ in the variable $y$, then the initial value problem\n$$y\'(x) = f(x, y),\\quad a \\le x \\le b,\\quad y(a) = \\alpha$$\nhas a unique solution $y(x)$ for $a \\le x \\le b$. Under the same conditions the problem is also well posed.',
        },
        {
          type: 'finish',
          title: 'Uniqueness: done.',
          body: 'Next: Euler’s method, the simplest way to approximate the solution. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
