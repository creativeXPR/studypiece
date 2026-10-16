// MTH 209 · Solutions of equations · Lesson 2: Regula Falsi (method of false position).

export default {
  id: 'regula-falsi',
  title: 'Regula Falsi (false position)',
  covers: 'The secant line through (a, f(a)) and (b, f(b)), deriving c = (af(b) − bf(a))/(f(b) − f(a))',
  minutes: 15,
  sections: [
    {
      name: 'Deriving the formula',
      terms: [
        ['Regula Falsi', 'A bracketing method: instead of the midpoint, use the point where the straight line joining $(a, f(a))$ and $(b, f(b))$ crosses the $x$-axis.'],
        ['False position point', '$c = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Solutions of equations · Lesson 2',
          title: 'Bisection ignores useful information',
          body: 'Suppose $f(a) = -0.01$ and $f(b) = 50$. The root is surely much nearer $a$ than $b$, yet bisection still guesses the midpoint.\n\nThe ==Regula Falsi== method (method of false position) uses the **sizes** of $f(a)$ and $f(b)$, not just their signs. It combines the **guaranteed convergence** of bisection with the **speed** of linear interpolation.',
          cta: 'How?',
        },
        {
          type: 'story',
          eyebrow: 'Step 1 · The secant line',
          title: 'Join the two end points',
          body: 'Suppose $f(a)f(b) < 0$. Join $(a, f(a))$ and $(b, f(b))$ by a straight line, the ==secant line==. Its equation is\n$$y - f(a) = \\frac{f(b) - f(a)}{b - a}(x - a).$$\n\nThe point $x = c$ where this line crosses the $x$-axis is our new estimate.',
        },
        {
          type: 'story',
          eyebrow: 'Step 2 · Set y = 0 at x = c',
          title: 'Solve for $c$',
          body: 'Put $y = 0$, $x = c$:\n$$-f(a) = \\frac{f(b) - f(a)}{b - a}(c - a) \\implies c - a = \\frac{-f(a)(b - a)}{f(b) - f(a)}.$$\n\nSo\n$$c = a - \\frac{f(a)(b - a)}{f(b) - f(a)} = \\frac{a\\,(f(b) - f(a)) - f(a)(b - a)}{f(b) - f(a)}.$$\n\nExpand the top: $a f(b) - a f(a) - b f(a) + a f(a) = a f(b) - b f(a)$.',
        },
        {
          type: 'choice',
          eyebrow: 'Step 3 · The result',
          prompt: 'So the false position point is…',
          options: [
            { text: '$c = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$', correct: true, why: 'The $a f(a)$ terms cancel, leaving $a f(b) - b f(a)$ on top.' },
            { text: '$c = \\dfrac{a f(a) - b f(b)}{f(a) - f(b)}$', why: 'The $f$-values are paired with the wrong ends. Check: it doesn’t reduce to $a$ when $f(a) = 0$.' },
            { text: '$c = \\dfrac{a + b}{2}$', why: 'That’s bisection.' },
            { text: '$c = a - \\dfrac{f(a)}{f\'(a)}$', why: 'That’s Newton-Raphson.' },
          ],
          explain: 'Sanity check: if $f(a) = 0$ then $c = \\frac{a f(b)}{f(b)} = a$, the root itself. ✓',
        },
        {
          type: 'story',
          eyebrow: 'Step 4 · Keep the bracket',
          title: 'Then update just like bisection',
          body: 'From the sign of $f(c)$, decide whether the root lies in $[a, c]$ or $[c, b]$, update the bracket, and repeat until successive values of $c$ agree to the required accuracy.\n\nBecause a sign change is always kept, Regula Falsi **cannot lose the root**.',
        },
        {
          type: 'bridge',
          title: 'Formula: derived.',
          recap: [
            'Secant line through $(a, f(a))$, $(b, f(b))$; set $y = 0$ at $x = c$.',
            '$c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$, then keep the half with the sign change.',
          ],
          why: 'Now a worked example.',
        },
      ],
    },
    {
      name: 'Worked example',
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Root of $x^3 - 5x + 1 = 0$ between $0$ and $1$',
          body: 'Let $f(x) = x^3 - 5x + 1$. Then $f(0) = 1$ and $f(1) = 1 - 5 + 1 = -3$. Opposite signs, so a root lies in $[0, 1]$.\n\n**Iteration 1** ($a = 0$, $b = 1$):\n$$c_1 = \\frac{0 \\cdot (-3) - 1 \\cdot 1}{-3 - 1} = \\frac{-1}{-4} = 0.25.$$\n$f(0.25) = 0.015625 - 1.25 + 1 = -0.2344$.',
        },
        {
          type: 'choice',
          eyebrow: 'Iteration 2',
          prompt: '$f(0) = 1 > 0$ and $f(0.25) = -0.2344 < 0$. Which bracket do we use next?',
          options: [
            { text: '$[0, 0.25]$', correct: true, why: 'The sign change is between $0$ and $0.25$.' },
            { text: '$[0.25, 1]$', why: '$f(0.25)$ and $f(1)$ are both negative.' },
            { text: '$[0, 0.5]$', why: 'Regula Falsi always moves an end to $c$, here $0.25$.' },
            { text: '$[0.125, 0.25]$', why: 'That’s not where the end points come from.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Iteration 2',
          prompt: 'With $a = 0$, $b = 0.25$: $f(a) = 1$, $f(b) = -0.2344$. Find $c_2$ (4 d.p.).',
          options: [
            { text: '$0.1250$', why: 'That’s the bisection midpoint.' },
            { text: '$0.2025$', correct: true, why: '$c_2 = \\frac{0(-0.2344) - 0.25(1)}{-0.2344 - 1} = \\frac{-0.25}{-1.2344} = 0.2025$.' },
            { text: '$0.2344$', why: 'That’s $|f(b)|$, not a new $x$.' },
            { text: '$0.2500$', why: 'That’s the old end point.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The table',
          title: 'Until two estimates agree to 3 s.f.',
          body: '$$\\begin{array}{c|c|c|c} a & b & c & f(c) \\\\ \\hline 0 & 1 & 0.25 & -0.2344 \\\\ 0 & 0.25 & 0.202532 & -0.004351 \\\\ 0 & 0.202532 & 0.201654 & -0.000072 \\\\ 0 & 0.201654 & 0.201640 & -0.000001 \\end{array}$$\n\n$c_3 = 0.201654$ and $c_4 = 0.201640$ are both $0.202$ to 3 s.f., so we stop.\n\n**Root $\\approx 0.202$** (3 s.f.). Bisection on the same interval needs about 10 steps for this accuracy.',
          note: '$c_2 = 0.2025$ rounds to $0.203$ (3 s.f.), so $c_2$ and $c_3$ do not yet agree. Always compare enough digits.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about Regula Falsi are true?',
          options: [
            { text: 'It needs a starting bracket with $f(a)f(b) < 0$.', correct: true, why: '**Like bisection**, it starts from a sign change.' },
            { text: 'It always keeps the root inside the current bracket.', correct: true, why: '**The bracket is updated by sign**, so the root can’t escape.' },
            { text: 'It needs $f\'(x)$.', why: '**No derivative**: only $f(a)$ and $f(b)$.' },
            { text: 'Its new point is the midpoint of $[a, b]$.', why: '**It uses the secant line’s $x$-intercept**, weighted by $f(a)$ and $f(b)$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe the Regula Falsi method',
          body: 'Suppose $f(a)f(b) < 0$, so by the intermediate value theorem a root lies in $[a, b]$. Instead of the midpoint, join $(a, f(a))$ and $(b, f(b))$ by the secant line\n$$y - f(a) = \\frac{f(b) - f(a)}{b - a}(x - a).$$\nIt meets the $x$-axis at\n$$c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}.$$\nFrom the sign of $f(c)$ decide whether the root lies in $[a, c]$ or $[c, b]$, update the bracket, and repeat until successive values of $c$ agree to the required accuracy.',
        },
        {
          type: 'finish',
          title: 'You can use false position.',
          body: 'Next: linear iteration, which rewrites the equation as $x = g(x)$.',
        },
      ],
    },
  ],
};
