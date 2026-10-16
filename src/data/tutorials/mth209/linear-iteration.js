// MTH 209 · Solutions of equations · Lesson 3: linear (fixed-point) iteration.

export default {
  id: 'linear-iteration',
  title: 'Linear iteration: x = g(x)',
  covers: 'Rearranging f(x) = 0 as x = g(x), iterating x₍ₙ₊₁₎ = g(xₙ), and when it converges',
  minutes: 14,
  sections: [
    {
      name: 'The idea',
      terms: [
        ['Linear (fixed-point) iteration', 'Rearrange $f(x) = 0$ as $x = g(x)$, choose $x_0$, and repeat $x_{n+1} = g(x_n)$.'],
        ['Fixed point', 'A value $\\alpha$ with $g(\\alpha) = \\alpha$. It is a root of $f(x) = 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Solutions of equations · Lesson 3',
          title: 'Feed the answer back in',
          body: 'Type any number into a calculator and press **cos** again and again (in radians). The display settles on $0.7391\\ldots$, the solution of $x = \\cos x$.\n\nThat is ==linear iteration==: write the equation as $x = g(x)$, then keep feeding each answer back into $g$:\n$$x_1 = g(x_0),\\quad x_2 = g(x_1),\\quad \\ldots,\\quad x_{n+1} = g(x_n).$$',
          cta: 'Try one',
        },
        {
          type: 'choice',
          eyebrow: 'Step 1 · Rearrange',
          prompt: 'Which is a rearrangement of $x^2 - 3x + 1 = 0$ into the form $x = g(x)$?',
          options: [
            { text: '$x = \\frac13(1 + x^2)$', correct: true, why: 'Move $3x$ across: $3x = 1 + x^2$, then divide by 3.' },
            { text: '$x = \\frac13(1 - x^2)$', why: 'Check the sign: $x^2 - 3x + 1 = 0 \\implies 3x = x^2 + 1$.' },
            { text: '$x = 3x^2 + 1$', why: 'That doesn’t follow from the equation.' },
            { text: '$x = x^2 - 3x + 1$', why: 'That would need $f(x) = x$, not $f(x) = 0$.' },
          ],
          explain: 'In general: $x_{n+1} = \\frac13(1 + x_n^2)$.',
        },
        {
          type: 'story',
          eyebrow: 'Step 2 · Iterate',
          title: 'From $x_0 = 0$',
          body: '$$\\begin{aligned} x_1 &= \\tfrac13(1 + 0^2) = 0.3333 \\\\ x_2 &= \\tfrac13(1 + 0.3333^2) = 0.3704 \\\\ x_3 &= \\tfrac13(1 + 0.3704^2) = 0.3791 \\\\ x_4 &= 0.3812 \\\\ x_5 &= 0.3818 \\\\ x_6 &= 0.3819 \\end{aligned}$$\n\nThe change from $x_5$ to $x_6$ is very small, so the root is **0.382** (3 d.p.). Exact value: $\\frac{3 - \\sqrt5}{2} = 0.38197$ ✓',
        },
        {
          type: 'bridge',
          title: 'The idea: working.',
          recap: [
            'Rearrange $f(x) = 0$ to $x = g(x)$; iterate $x_{n+1} = g(x_n)$.',
            'Stop when successive values agree to the accuracy required.',
          ],
          why: 'But not every rearrangement works. The next part shows how to tell.',
        },
      ],
    },
    {
      name: 'When does it converge?',
      terms: [
        ['Convergence condition', 'The iteration converges to the root $\\alpha$ (from a close enough $x_0$) if $|g\'(x)| < 1$ near $\\alpha$. If $|g\'(\\alpha)| > 1$ it moves away.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The test',
          title: 'Look at $|g\'(x)|$ near the root',
          body: 'Near the root $\\alpha$, the error is multiplied by roughly $g\'(\\alpha)$ at every step:\n$$x_{n+1} - \\alpha = g(x_n) - g(\\alpha) \\approx g\'(\\alpha)(x_n - \\alpha).$$\n\nSo:\n**$|g\'(\\alpha)| < 1$**: errors shrink, the iteration **converges**.\n**$|g\'(\\alpha)| > 1$**: errors grow, it **diverges**.\n\nThe smaller $|g\'|$ is, the faster it converges.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'For the root $\\alpha = 0.382$ of $x^2 - 3x + 1 = 0$, which rearrangements converge?',
          buckets: [
            { id: 'c', label: 'Converges', hint: '|g′(α)| < 1' },
            { id: 'd', label: 'Diverges', hint: '|g′(α)| > 1' },
          ],
          items: [
            { text: '$x = \\frac13(1 + x^2)$', bucket: 'c', why: '**$g\'(x) = \\frac{2x}{3} \\approx 0.25$** at $0.382$.' },
            { text: '$x = 3 - \\frac1x$', bucket: 'd', why: '**$g\'(x) = \\frac{1}{x^2} \\approx 6.9$** at $0.382$. (It converges to the other root, $2.618$, instead.)' },
            { text: '$x = x^2 - 2x + 1$', bucket: 'd', why: '**$g\'(x) = 2x - 2 \\approx -1.24$**, and $|-1.24| > 1$.' },
          ],
          explain: 'Same equation, different $g$: the choice of rearrangement decides everything.',
        },
        {
          type: 'story',
          eyebrow: 'Second example',
          title: '$x^3 - 5x + 1 = 0$, root between $0$ and $1$',
          body: 'Rearrange: $5x = 1 + x^3$, so $x_{n+1} = \\frac15(1 + x_n^3)$. Here $g\'(x) = \\frac35x^2 \\approx 0.02$ near $0.2$: very small, so very fast.\n\nFrom $x_0 = 0$:\n$$x_1 = 0.2,\\quad x_2 = \\tfrac15(1 + 0.008) = 0.2016,\\quad x_3 = 0.20164.$$\n\nRoot $\\approx$ **0.202** (3 s.f.), the same root Regula Falsi found.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'For $x_{n+1} = \\frac15(1 + x_n^3)$, why did it converge in only 3 steps, while $x_{n+1} = \\frac13(1 + x_n^2)$ needed 6?',
          options: [
            { text: 'Because $|g\'|$ is about $0.02$ instead of about $0.25$', correct: true, why: 'Each step multiplies the error by about $|g\'(\\alpha)|$. $0.02$ shrinks it far faster than $0.25$.' },
            { text: 'Because the root is smaller', why: 'The size of the root isn’t what matters; $|g\'|$ is.' },
            { text: 'Because cubic equations are easier', why: 'Not in general. It’s the rearrangement that matters.' },
            { text: 'Because $x_0 = 0$ is a root', why: '$f(0) = 1 \\neq 0$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe linear iteration',
          body: 'Given $f(x) = 0$, rearrange it in the form $x = g(x)$. Given an initial value $x_0$, compute\n$$x_1 = g(x_0),\\ x_2 = g(x_1),\\ \\ldots,\\ x_{n+1} = g(x_n),$$\nwhere $x_0, x_1, \\ldots$ are successive approximations to the root. Stop when two successive values agree to the required accuracy.\n\nThe iteration converges to a root $\\alpha$ if $|g\'(x)| < 1$ in a neighbourhood of $\\alpha$ containing $x_0$.',
        },
        {
          type: 'finish',
          title: 'You can iterate.',
          body: 'Next: Newton-Raphson, the fastest method in the course.',
        },
      ],
    },
  ],
};
