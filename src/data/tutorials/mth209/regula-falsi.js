// MTH 209 · Idea B, lesson 2: regula falsi (false position). Part 1 derives c = (a f(b) − b f(a)) /
// (f(b) − f(a)) from the chord and uses x² − 2 on [1, 2]; Part 2 does the class example x³ − 5x + 1
// on [0, 1] to 3 dp and x³ − 2x − 5.

export default {
  id: 'regula-falsi',
  title: 'Regula falsi',
  covers: 'Cutting the bracket with a chord: the formula, the steps, and when it is slow',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Regula falsi (false position)', 'Join $(a, f(a))$ and $(b, f(b))$ with a straight line; where it crosses the $x$-axis is the next estimate $c$.'],
        ['False position formula', '$c = \\dfrac{a\\,f(b) - b\\,f(a)}{f(b) - f(a)}$'],
      ],
      steps: [
        'Check $f(a)$ and $f(b)$ have opposite signs.',
        'Compute $c = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$ and $f(c)$.',
        'Keep $[a, c]$ if $f(a)f(c) < 0$, otherwise $[c, b]$ (the same rule as bisection).',
        'Repeat until two successive values of $c$ agree to the required accuracy.',
      ],
      examples: [
        {
          title: '$x^2 - 2 = 0$ on $[1, 2]$',
          question: 'Apply regula falsi twice to $x^2 - 2$ on $[1, 2]$.',
          steps: ['$f(1) = -1$, $f(2) = 2$.', '$c = \\tfrac{1(2) - 2(-1)}{2 - (-1)} = \\tfrac43 = 1.3333$, $f = -0.2222$: keep $[1.3333, 2]$.', '$c = \\tfrac{1.3333(2) - 2(-0.2222)}{2 + 0.2222} = 1.4$, $f = -0.04$: keep $[1.4, 2]$.'],
          answer: '$1.3333 \\to 1.4 \\to 1.4118 \\to 1.4138$, closing on $\\sqrt2 = 1.4142$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 2',
          title: 'A smarter cut',
          body: 'Bisection ignores the **values** of $f$: it cuts at the middle even when $f(a) = -0.01$ and $f(b) = 100$, so the root is obviously near $a$.\n\n**Regula falsi** (“false position”) uses those values. It keeps bisection’s safe bracket but cuts where a straight line says the root should be.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Draw the chord',
          body: 'Join $(a, f(a))$ to $(b, f(b))$ with a straight line. Near the root the curve is almost straight, so where the **line** crosses the $x$-axis is a good guess for where the **curve** does.\n\nSetting $y = 0$ in the line through the two points and solving for $x$ gives\n$$c = \\frac{a\\,f(b) - b\\,f(a)}{f(b) - f(a)}.$$',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Regula falsi, step by step',
          body: '1. Check $f(a)$ and $f(b)$ have opposite signs.\n2. $c = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$; work out $f(c)$.\n3. Keep the half with the sign change, exactly as in bisection.\n4. Stop when two successive $c$ values agree to the accuracy asked for.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2 - 2 = 0$ on $[1, 2]$',
          body: '**Step 1.** $f(1) = -1$, $f(2) = 2$.\n\n**Step 2.** $c = \\dfrac{1(2) - 2(-1)}{2 - (-1)} = \\dfrac43 = 1.3333$, $f(c) = -0.2222$.\n\n**Step 3.** $f(c) < 0$ like $f(1)$, so keep $[1.3333, 2]$.\n\n**Repeat:** $1.4$, then $1.4118$, then $1.4138$. After four steps it is within $0.0004$ of $\\sqrt2$; bisection was still $0.02$ away.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$x^2 - 2$ on $[1.3333, 2]$',
          graph: {
            steps: [
              { ask: '$f(1.3333)$, to 4 dp?', answer: -0.2222, tol: 0.0003, hint: '$1.3333^2 - 2$.' },
              { ask: 'Next $c = \\dfrac{1.3333(2) - 2(-0.2222)}{2 - (-0.2222)}$, to 4 dp?', answer: 1.4, tol: 0.0005, hint: 'Top $3.1110$, bottom $2.2222$.' },
              { ask: 'Keep which bracket?', options: ['$[1.4, 2]$', '$[1.3333, 1.4]$'], answer: 0, hint: '$f(1.4) = -0.04 < 0$, like the left end.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Derive** the formula for $c$ from the straight line through $(a, f(a))$ and $(b, f(b))$.\n• **Find a root** “lying between $x = 0$ and $x = 1$ using the regula falsi method, correct to 3 dp”.\n• **Compare** with bisection: both keep a bracket and always converge; regula falsi is usually faster, but one end can get stuck.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Start by **verifying** the sign change: “$f(0) = 1 > 0$, $f(1) = -3 < 0$, so by the intermediate value theorem a root lies in $(0, 1)$.”',
        'Set out each step as: $c = \\ldots$, $f(c) = \\ldots$, “thus the root is in $[\\ldots]$”.',
        'Keep at least 6 dp while working; round only the final answer.',
        'Stop when two successive $c$ values agree at the required dp, and say so.',
        'Mistake: copying the sign of $f(c)$ wrongly, which sends you to the wrong half. Check each sign.',
      ],
      examples: [
        {
          title: '$x^3 - 5x + 1 = 0$ on $[0, 1]$, to 3 dp',
          question: 'Find the root of $x^3 - 5x + 1 = 0$ lying between $0$ and $1$ by regula falsi, correct to 3 dp.',
          steps: ['$f(0) = 1$, $f(1) = -3$: a root lies in $(0, 1)$.', '$c_1 = \\tfrac{0(-3) - 1(1)}{-3 - 1} = 0.25$, $f = -0.234375$: root in $[0, 0.25]$.', '$c_2 = 0.2025316$, $f = -0.0043506$: root in $[0, 0.2025316]$.', '$c_3 = 0.2016543$, $f = -0.0000715$.', '$c_2$ and $c_3$ both round to $0.202$.'],
          answer: 'Root $= 0.202$ (3 dp).',
        },
        {
          title: '$x^3 - 2x - 5 = 0$ on $[2, 3]$',
          question: 'Apply regula falsi to $x^3 - 2x - 5$ on $[2, 3]$.',
          steps: ['$f(2) = -1$, $f(3) = 16$.', '$c_1 = \\tfrac{2(16) - 3(-1)}{16 + 1} = 2.058824$, $f = -0.3908$.', '$c_2 = 2.081264$, $c_3 = 2.089639$, $c_4 = 2.092740$, …', 'Each step moves less, and the right end $3$ never moves.'],
          answer: 'Creeping up to $2.0946$; the fixed end slows it down.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Correct to 3 decimal places',
          body: '“Find the root of $x^3 - 5x + 1 = 0$ lying between $x = 0$ and $x = 1$ using the regula falsi method, correct to 3 dp.”\n\n**What the examiner wants:** the sign check first; then each $c$ with its $f(c)$ and the new bracket; and a clear stopping reason (“two successive values agree to 3 dp”). The full solution is in **Examples**.',
          asides: [{ label: 'Exam tip', text: 'If the question says “regula falsi”, don’t switch to bisection or Newton, even to check. Only the named method earns the method marks.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$x^3 - 5x + 1$ on $[0, 1]$',
          graph: {
            steps: [
              { ask: '$c_1 = \\dfrac{0 \\cdot f(1) - 1 \\cdot f(0)}{f(1) - f(0)}$ with $f(0) = 1$, $f(1) = -3$?', answer: 0.25, tol: 0.0001, hint: '$\\tfrac{-1}{-4}$.' },
              { ask: '$f(0.25)$, to 6 dp?', answer: -0.234375, tol: 0.000001, hint: '$0.015625 - 1.25 + 1$.' },
              { ask: 'New bracket?', options: ['$[0, 0.25]$', '$[0.25, 1]$'], answer: 0, hint: '$f(0) > 0 > f(0.25)$.' },
              { ask: '$c_2 = \\dfrac{0 \\cdot f(0.25) - 0.25 \\cdot f(0)}{f(0.25) - f(0)}$, to 4 dp?', answer: 0.2025, tol: 0.0001, hint: '$\\tfrac{-0.25}{-1.234375}$.' },
            ],
            after: 'Next $c_3 = 0.20165$. Since $c_2$ and $c_3$ both round to $0.202$, the root is $0.202$ to 3 dp.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the weakness',
          prompt: 'On $x^3 - 2x - 5$, $[2, 3]$, the estimates go $2.0588, 2.0813, 2.0896, 2.0927, \\ldots$ and the end $3$ never moves. Why is it slow?',
          options: [
            { text: 'One end stays fixed, so the chord always pivots on it and the bracket never shrinks from that side', correct: true, why: 'The curve bends the same way throughout, so every chord lands on the same side of the root. This is regula falsi’s known weakness.' },
            { text: 'The formula is being used wrongly', why: 'These values are correct; it is the method that is slow here.' },
            { text: 'Regula falsi never converges', why: 'It does always converge (it keeps a bracket), just slowly here.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Regula falsi on $x^3 - 2x - 5$, $[2, 3]$',
          graph: {
            steps: [
              { ask: '$f(2)$ and $f(3)$ are $-1$ and $16$. $c_1 = \\dfrac{2(16) - 3(-1)}{16 - (-1)}$, to 6 dp?', answer: 2.058824, tol: 0.000002, hint: '$\\tfrac{35}{17}$.' },
              { ask: '$f(c_1)$, to 4 dp?', answer: -0.3908, tol: 0.0003, hint: '$2.058824^3 - 2(2.058824) - 5$.' },
              { ask: 'New bracket?', options: ['$[2.058824, 3]$', '$[2, 2.058824]$'], answer: 0, hint: '$f(c_1) < 0$, like $f(2)$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can cut a bracket with a chord.',
          body: '**Summary:** $c = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$; keep the half with the sign change; usually faster than bisection, but a fixed end can slow it down.\n\n**Next:** **linear iteration** drops the bracket altogether: rewrite $f(x) = 0$ as $x = g(x)$ and feed each answer back in. Faster when it works, and you will learn to tell when it does.',
        },
      ],
    },
  ],
};
