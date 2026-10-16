// MTH 209 · Solutions of equations · Lesson 4: the Newton-Raphson method.

export default {
  id: 'newton-raphson',
  title: 'The Newton-Raphson method',
  covers: 'Deriving xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ) from the tangent, x³ − 5x − 40 = 0, the cube root of 7',
  minutes: 16,
  sections: [
    {
      name: 'Deriving the formula',
      terms: [
        ['Newton-Raphson iteration', '$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$, $n \\ge 0$: follow the tangent at $x_n$ down to the $x$-axis.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Solutions of equations · Lesson 4',
          title: 'Slide down the tangent',
          body: 'Near a root, a smooth curve looks almost like a straight line: its **tangent**.\n\nSo from a guess $x_0$, draw the tangent to $y = f(x)$ at $P(x_0, f(x_0))$ and see where it meets the $x$-axis, at $Q$. That point $x_1$ is usually much closer to the root. Repeat from $x_1$.\n\nThis is the ==Newton-Raphson method==.',
          cta: 'Derive it',
        },
        {
          type: 'story',
          eyebrow: 'The derivation',
          title: 'Use the slope of the tangent',
          body: 'Let $B = (x_0, 0)$ be the point below $P$, so $PB = f(x_0)$. The tangent $PQ$ has slope $f\'(x_0)$, so in triangle $PBQ$:\n$$\\frac{PB}{QB} = f\'(x_0) \\implies QB = \\frac{PB}{f\'(x_0)} = \\frac{f(x_0)}{f\'(x_0)} = h.$$\n\n$Q$ is $h$ to the left of $B$, so\n$$x_1 = x_0 - h = x_0 - \\frac{f(x_0)}{f\'(x_0)}.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Generalise',
          prompt: 'Repeating the step from each new point gives which iteration?',
          options: [
            { text: '$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$', correct: true, why: 'Same construction at every step, from $(x_n, f(x_n))$.' },
            { text: '$x_{n+1} = x_n - \\dfrac{f\'(x_n)}{f(x_n)}$', why: 'Upside down: $h = \\frac{f}{f\'}$, height over slope.' },
            { text: '$x_{n+1} = x_n + \\dfrac{f(x_n)}{f\'(x_n)}$', why: 'With a plus sign you’d walk away from the root.' },
            { text: '$x_{n+1} = \\dfrac{x_n + x_{n-1}}{2}$', why: 'That’s an averaging step, not Newton-Raphson.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Formula: derived.',
          recap: [
            '$QB = \\frac{f(x_0)}{f\'(x_0)}$ from the tangent’s slope.',
            '$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}$.',
          ],
          why: 'Now a worked example: $x^3 - 5x - 40 = 0$.',
        },
      ],
    },
    {
      name: 'Worked example',
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Show a root of $x^3 - 5x - 40 = 0$ lies in $(3, 4)$',
          body: 'Let $f(x) = x^3 - 5x - 40$.\n$$f(3) = 27 - 15 - 40 = -28, \\qquad f(4) = 64 - 20 - 40 = 4.$$\n\n$f$ changes sign between $x = 3$ and $x = 4$, so the graph crosses the $x$-axis there: a root lies in $(3, 4)$.\n\nAlso $f\'(x) = 3x^2 - 5$, so\n$$x_{n+1} = x_n - \\frac{x_n^3 - 5x_n - 40}{3x_n^2 - 5}.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Choose x₀',
          prompt: 'Which starting value is more sensible?',
          options: [
            { text: '$x_0 = 3$, because it is smaller', why: 'Size isn’t the criterion; closeness to the root is.' },
            { text: '$x_0 = 4$, because $|f(4)| = 4$ is much smaller than $|f(3)| = 28$', correct: true, why: 'The curve is much nearer zero at 4, so the root is probably nearer 4.' },
            { text: '$x_0 = 3.5$, always the midpoint', why: 'Newton-Raphson doesn’t need a midpoint; a good single guess is enough.' },
            { text: '$x_0 = 0$', why: 'Far from the root: it would waste iterations (or fail).' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Iteration 1',
          prompt: '$f(4) = 4$ and $f\'(4) = 3(16) - 5 = 43$. Find $x_1$ (3 d.p.).',
          options: [
            { text: '$3.907$', correct: true, why: '$x_1 = 4 - \\frac{4}{43} = 4 - 0.0930 = 3.907$.' },
            { text: '$4.093$', why: 'Subtract, don’t add.' },
            { text: '$3.875$', why: 'That’s the secant/Regula Falsi first step from $3$ and $4$.' },
            { text: '$3.000$', why: 'That would be $4 - 43/43$; the numerator is $f(4) = 4$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Iteration 2 and 3',
          title: 'Converging fast',
          body: '$$\\begin{aligned} x_2 &= 3.907 - \\frac{(3.907)^3 - 5(3.907) - 40}{3(3.907)^2 - 5} = 3.907 - \\frac{0.104}{40.794} = 3.90445 \\\\ x_3 &= 3.90445 - \\frac{0.000075}{40.734} = 3.90445 \\end{aligned}$$\n\nThe change between $x_2$ and $x_3$ is tiny, so to 3 s.f. the **root is 3.90**.\n\nThe number of correct digits roughly **doubles** each step. That is ==quadratic convergence==.',
        },
        {
          type: 'story',
          eyebrow: 'Second example',
          title: 'The cube root of 7',
          body: '$\\sqrt[3]{7}$ is the root of $f(x) = x^3 - 7$, with $f\'(x) = 3x^2$:\n$$x_{n+1} = x_n - \\frac{x_n^3 - 7}{3x_n^2} = \\frac{2x_n^3 + 7}{3x_n^2}.$$\n\nFrom $x_0 = 2$:\n$$x_1 = \\frac{16 + 7}{12} = 1.9167,\\quad x_2 = 1.9129,\\quad x_3 = 1.9129.$$\n\nSo $\\sqrt[3]{7} = 1.913$ (3 d.p.).',
        },
        {
          type: 'bridge',
          title: 'Examples: solved.',
          recap: [
            '$x^3 - 5x - 40 = 0$: from $x_0 = 4$, $3.907 \\to 3.90445$, root $3.90$ (3 s.f.).',
            '$\\sqrt[3]{7}$: $x_{n+1} = \\frac{2x_n^3 + 7}{3x_n^2}$ gives $1.913$.',
          ],
          why: 'Newton-Raphson is fast, but it has weak spots.',
        },
      ],
    },
    {
      name: 'Strengths and limits',
      screens: [
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about Newton-Raphson are true?',
          options: [
            { text: 'It needs the derivative $f\'(x)$.', correct: true, why: '**Every step uses $f\'(x_n)$**. That’s its main cost.' },
            { text: 'It can fail if $f\'(x_n)$ is zero or close to zero.', correct: true, why: '**A flat tangent** meets the $x$-axis far away, or never.' },
            { text: 'It always needs a bracket with a sign change.', why: '**One starting value** is enough. (The sign change just helps choose $x_0$.)' },
            { text: 'Near a simple root it converges faster than bisection.', correct: true, why: '**Quadratic convergence**: correct digits roughly double each step.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Derive the Newton-Raphson formula',
          body: 'Let $x_0$ be an approximation to a root of $f(x) = 0$ and $P(x_0, f(x_0))$ the corresponding point on $y = f(x)$. The tangent at $P$ meets the $x$-axis at $Q(x_1, 0)$, a better approximation. With $B = (x_0, 0)$,\n$$\\frac{PB}{QB} = f\'(x_0),\\quad PB = f(x_0) \\implies QB = \\frac{f(x_0)}{f\'(x_0)}.$$\nHence $x_1 = x_0 - \\frac{f(x_0)}{f\'(x_0)}$, and repeating the process gives\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)},\\quad n \\ge 0.$$',
        },
        {
          type: 'finish',
          title: 'You can use Newton-Raphson.',
          body: 'Next: the secant method, Newton-Raphson without the derivative.',
        },
      ],
    },
  ],
};
