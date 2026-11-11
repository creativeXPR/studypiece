// MTH 209 · Idea B, lesson 3: linear (fixed-point) iteration. Part 1 uses x² − x − 1 = 0 rewritten
// two ways (one converges, one diverges) and the |g′| < 1 test; Part 2 does the past-paper
// "construct iteration formulas and state your observations" questions.

export default {
  id: 'linear-iteration',
  title: 'Linear iteration',
  covers: 'Rewriting f(x) = 0 as x = g(x), iterating, the |g′(x)| < 1 condition, and stating observations',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Fixed point', 'A value with $x = g(x)$. If $f(x) = 0$ is rewritten as $x = g(x)$, its fixed points are the roots.'],
        ['Linear iteration', '$x_{n+1} = g(x_n)$: feed each answer back in.'],
        ['Convergence condition', 'Near the root, if $|g\'(x)| < 1$ the iteration converges; if $|g\'(x)| > 1$ it moves away.'],
      ],
      steps: [
        'Rearrange $f(x) = 0$ into $x = g(x)$. There are usually several ways; try each.',
        'Check $|g\'(x)| < 1$ near the root (or at the start value). Smaller means faster.',
        'Start from the given $x_0$ and compute $x_1 = g(x_0)$, $x_2 = g(x_1)$, …',
        'Stop when two successive values agree to the required accuracy.',
        'State your observations: converges or diverges, steadily or oscillating, fast or slow, and why ($|g\'|$ and its sign).',
      ],
      examples: [
        {
          title: '$x^2 - x - 1 = 0$, two ways',
          question: 'Rewrite $x^2 - x - 1 = 0$ as $x = 1 + \\tfrac1x$ and as $x = x^2 - 1$. Which iteration finds the root near $1.6$?',
          steps: ['$g(x) = 1 + \\tfrac1x$: $g\'(x) = -\\tfrac{1}{x^2} \\approx -0.38$ near $1.6$, so $|g\'| < 1$.', 'From $x_0 = 1$: $2, 1.5, 1.6667, 1.6, 1.625, 1.6154, 1.6190, 1.6176, \\ldots \\to 1.618$.', '$g(x) = x^2 - 1$: $g\'(x) = 2x \\approx 3.2$, so $|g\'| > 1$.', 'From $1.5$: $1.25, 0.5625, -0.684, \\ldots$ It runs away.'],
          answer: '$x = 1 + \\tfrac1x$ converges (oscillating, since $g\' < 0$) to $1.618$; $x = x^2 - 1$ diverges.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 3',
          title: 'Feed the answer back in',
          body: 'Bisection and regula falsi trap the root in a bracket. **Linear iteration** drops the bracket and uses the first engine of the course: **iterate until it settles**.\n\nRewrite $f(x) = 0$ as $x = g(x)$, guess $x_0$, and keep applying $g$. If the values settle, they settle on a root. The skill is choosing a $g$ that settles.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Why $|g\'| < 1$ decides everything',
          body: 'Suppose $p$ is the root, so $p = g(p)$. Near $p$, $g$ is almost a straight line of slope $g\'(p)$, so\n$$x_{n+1} - p \\approx g\'(p)\\,(x_n - p).$$\nEach step **multiplies the error by $g\'(p)$**. If $|g\'(p)| < 1$ the error shrinks: it converges. If $|g\'(p)| > 1$ it grows: it diverges. If $g\'(p) < 0$ the error flips sign each time, so the values **oscillate** around the root.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Linear iteration, step by step',
          body: '1. Rearrange $f(x) = 0$ as $x = g(x)$ (there are many ways).\n2. Check $|g\'(x)| < 1$ near the root.\n3. Iterate $x_{n+1} = g(x_n)$ from $x_0$.\n4. Stop when two successive values agree.\n5. **State observations:** converges or diverges, steady or oscillating, fast or slow, with the reason.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2 - x - 1 = 0$, two rearrangements',
          body: '**$x = 1 + \\tfrac1x$:** $g\' = -\\tfrac{1}{x^2} \\approx -0.38$, so $|g\'| < 1$. From $x_0 = 1$: $2, 1.5, 1.667, 1.6, 1.625, 1.615, \\ldots \\to 1.618$, settling and **oscillating** (because $g\' < 0$).\n\n**$x = x^2 - 1$:** $g\' = 2x \\approx 3.2$. From $1.5$: $1.25, 0.5625, -0.684, \\ldots$ It **diverges**.\n\nSame equation, same root: only the rearrangement differs.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$x = 1 + \\tfrac1x$ from $x_0 = 1.6$',
          graph: {
            steps: [
              { ask: '$x_1 = 1 + \\tfrac{1}{1.6}$?', answer: 1.625, tol: 0.0001, hint: '$\\tfrac{1}{1.6} = 0.625$.' },
              { ask: '$x_2 = 1 + \\tfrac{1}{1.625}$, to 4 dp?', answer: 1.6154, tol: 0.0001, hint: '$\\tfrac{1}{1.625} = 0.61538$.' },
              { ask: '$|g\'(1.618)| = \\tfrac{1}{1.618^2}$, to 2 dp?', answer: 0.38, tol: 0.01, hint: '$1.618^2 = 2.618$.' },
              { ask: 'The values go up, down, up… because…', options: ['$g\'$ is negative', '$g\'$ is bigger than 1', 'of a rounding error'], answer: 0, hint: 'A negative slope flips the error each step.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Construct** iteration formulas for an equation and use them from given starting values “to 3 dp”, then **state your observations**.\n• **Decide** whether given formulas (like $x_{n+1} = 10 - x_n^3 + 4x_n^2$) can be used to compute the root, and if not, **give the reason**.\n• **Write out** suitable iteration formulas for an equation such as $\\sin x + x - 1 = 0$.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Write each rearrangement clearly as $x_{n+1} = g(x_n)$.',
        'Give $g\'(x)$ and its size near the start value or root; this is your **reason** for convergence or divergence.',
        'Tabulate $n$ and $x_n$ to at least one more dp than asked for.',
        'Observation sentence: “converges to … (monotonically / oscillating) because $|g\'| = \\ldots < 1$” or “diverges because $|g\'| = \\ldots > 1$”.',
        'Different rearrangements can converge to **different roots**: say which root each one finds.',
      ],
      examples: [
        {
          title: '$2x^3 - 7x + 2 = 0$, two formulas',
          question: 'Construct iteration formulas and use them to obtain roots to 3 dp, using $x_0 = 1$ and/or $x_0 = 2$. State your observations.',
          steps: ['$x = \\tfrac{2x^3 + 2}{7}$: $g\' = \\tfrac{6x^2}{7} \\approx 0.07$ near $0.29$. From $x_0 = 1$: $0.5714, 0.3390, 0.2968, 0.2932, 0.2929, \\ldots \\to 0.293$.', '$x = \\sqrt[3]{\\tfrac{7x - 2}{2}}$: $g\' \\approx 0.39$ near $1.7$. From $x_0 = 2$: $1.8171, 1.7501, 1.7241, 1.7139, 1.7098, 1.7082, 1.7075, 1.7073, \\ldots \\to 1.707$.', 'Observation: each formula finds a **different** root; the first converges fast ($|g\'|$ small), the second slowly ($|g\'| \\approx 0.39$).'],
          answer: 'Roots $0.293$ and $1.707$ (the third root, $-2$, shows in the table of values).',
        },
        {
          title: '$x^3 - 4x^2 + x - 10 = 0$ from $x_0 = 4$',
          question: 'Decide whether $x_{n+1} = 10 - x_n^3 + 4x_n^2$ or $x_{n+1} = \\tfrac{4x_n^2 - x_n + 10}{x_n^2}$ can find the root to 5 sf.',
          steps: ['(i) From $4$: $10, -590, \\ldots$ It diverges: $g\'(x) = -3x^2 + 8x \\approx -21$ near the root, so $|g\'| > 1$.', '(ii) $g(x) = 4 - \\tfrac1x + \\tfrac{10}{x^2}$, $g\'(x) = \\tfrac{1}{x^2} - \\tfrac{20}{x^3} \\approx -0.20$ near $4.3$: converges.', '(ii) settles at $4.3069$.'],
          answer: '(i) cannot be used (diverges); (ii) gives $4.3069$ (5 sf).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: '“State your observations”',
          body: '“Construct iteration formula(s) for $2x^3 - 7x + 2 = 0$ and use them to obtain roots to 3 dp. You may use $x_0 = 1$ and/or $x_0 = 2$. State your observations, if any.”\n\n**What the examiner wants:** at least two rearrangements; the iterations in a table; and an **observation** for each: which root it found, how fast, and why ($|g\'|$). Both worked solutions are in **Examples**.',
          asides: [{ label: 'Exam tip', text: '“State your observations” is worth marks every time. Always say whether it converged or diverged, which root it found, how quickly, and the reason ($|g\'|$ below or above 1).' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$x = \\tfrac{2x^3 + 2}{7}$ from $x_0 = 1$',
          graph: {
            steps: [
              { ask: '$x_1 = \\tfrac{2(1)^3 + 2}{7}$, to 4 dp?', answer: 0.5714, tol: 0.0001, hint: '$\\tfrac47$.' },
              { ask: '$x_2 = \\tfrac{2(0.5714)^3 + 2}{7}$, to 4 dp?', answer: 0.339, tol: 0.0002, hint: '$0.5714^3 = 0.1866$.' },
              { ask: 'It settles at $0.293$. $g\'(x) = \\tfrac{6x^2}{7}$ there, to 2 dp?', answer: 0.07, tol: 0.01, hint: '$\\tfrac{6(0.0858)}{7}$.' },
              { ask: 'Observation:', options: ['Converges quickly and steadily, since $0 < g\' \\ll 1$', 'Diverges', 'Oscillates, since $g\' < 0$'], answer: 0, hint: '$g\'$ is small and positive.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'For $x^3 - 4x^2 + x - 10 = 0$, a student uses $x_{n+1} = 10 - x_n^3 + 4x_n^2$ from $x_0 = 4$, gets $10, -590, \\ldots$, and keeps going. What should they have written?',
          options: [
            { text: '“This formula diverges because $|g\'(x)| = |{-3x^2} + 8x| > 1$ near the root, so it cannot be used.”', correct: true, why: 'The question asks whether each formula can be used, and why not if not. Divergence with a reason is the answer.' },
            { text: 'Keep iterating until it comes back', why: 'With $|g\'| \\approx 21$ the error is multiplied by about 21 each step. It never comes back.' },
            { text: 'Start from a different $x_0$', why: 'The problem is $g$ itself, not the start value.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$\\sin x + x - 1 = 0$ by $x = 1 - \\sin x$',
          graph: {
            steps: [
              { ask: 'From $x_0 = 0.5$ (radians), $x_1 = 1 - \\sin 0.5$, to 4 dp?', answer: 0.5206, tol: 0.0001, hint: '$\\sin 0.5 = 0.4794$.' },
              { ask: '$x_2 = 1 - \\sin(0.5206)$, to 4 dp?', answer: 0.5026, tol: 0.0002, hint: '$\\sin 0.5206 = 0.4974$.' },
              { ask: '$g\'(x) = -\\cos x$. Near the root $0.511$, $|g\'|$ to 2 dp?', answer: 0.87, tol: 0.01, hint: '$\\cos 0.511$.' },
              { ask: 'Observation:', options: ['Converges, but slowly and oscillating, since $g\' \\approx -0.87$', 'Converges fast', 'Diverges'], answer: 0, hint: 'Negative and close to $-1$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can iterate, and say why it works.',
          body: '**Summary:** rewrite as $x = g(x)$; each step multiplies the error by about $g\'$; $|g\'| < 1$ converges, $|g\'| > 1$ diverges, $g\' < 0$ oscillates; always state observations with the reason.\n\n**Next:** **Newton-Raphson** is a specially built $g$ with $g\'(\\text{root}) = 0$, so the error shrinks dramatically each step. It comes straight from the Taylor series.',
        },
      ],
    },
  ],
};
