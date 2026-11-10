// MTH 209 · Part B · Lesson 1: bracket and halve. Table of signs and the intermediate value
// theorem; bisection with its stopping rule and step count; regula falsi as the smarter guess
// inside the same bracket. Replaces bisection.js and regula-falsi.js. Numbers recomputed in Python.
import { bisectScene, falsiScene } from './equation-scenes';

export default {
  id: 'bracketing',
  title: 'Bracket and halve: bisection and regula falsi',
  covers: 'Table of signs, the intermediate value theorem, the bisection method with its stopping rule and the number of steps an accuracy needs, and regula falsi (false position) with its formula and behaviour',
  minutes: 16,
  sections: [
    {
      name: 'Bisection',
      terms: [
        ['Intermediate value theorem', 'If $f$ is continuous on $[a, b]$ and $f(a)f(b) < 0$, there is at least one root between $a$ and $b$.'],
        ['Bisection step', '$c = \\frac{a + b}{2}$; keep whichever half, $[a, c]$ or $[c, b]$, still has a sign change.'],
        ['Steps for accuracy ε', 'Width $\\frac{b - a}{2^n} < \\varepsilon$ needs $n > \\dfrac{\\ln\\frac{b - a}{\\varepsilon}}{\\ln 2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part B · Lesson 1',
          title: 'Most equations have no formula',
          body: '**Where we are:** Part A gave us error and series. Part B is the first job on the map: **solving**, finding where $f(x) = 0$.\n\n**The problem:** the quadratic formula handles $5x^2 + 11x - 17 = 0$, but nothing similar solves $x^3 - 5x + 1 = 0$ or $x = \\cos x$.\n\n**The plan:** trap the root in an interval, then shrink the interval. **Engine:** iteration, repeating one simple step until the answer settles.',
          cta: 'Show me',
        },
        bisectScene,
        {
          type: 'story',
          eyebrow: 'Why it works',
          title: 'A sign change traps a root',
          body: 'A **continuous** curve that is below the axis at $a$ and above it at $b$ must cross in between: the ==intermediate value theorem==. So $f(a)f(b) < 0$ guarantees a root in $[a, b]$.\n\n**The method follows from that:** take $c = \\frac{a + b}{2}$. If $f(c) = 0$, stop. Otherwise one half still has a sign change, so it still holds a root: keep that half and repeat. Stop when two successive $c$ agree to the accuracy asked for.\n\n**How many steps?** The width halves each time, $\\frac{b - a}{2^n}$. For width below $\\varepsilon$: $n > \\frac{\\ln((b - a)/\\varepsilon)}{\\ln 2}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Table of signs',
          prompt: 'For $f(x) = 5x^2 + 11x - 17$: $f(0) = -17$, $f(1) = -1$, $f(2) = 25$. Where must a root lie?',
          options: [
            { text: 'Between $1$ and $2$', correct: true, why: '$f(1) < 0 < f(2)$: a sign change, so by the theorem a root lies in $(1, 2)$.' },
            { text: 'Between $0$ and $1$', why: 'Both values are negative: no sign change.' },
            { text: 'At $x = 1$', why: '$f(1) = -1 \\neq 0$.' },
            { text: 'We need a graph to tell', why: 'The sign change is all the theorem needs.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example (notes)',
          title: 'Solve $5x^2 + 11x - 17 = 0$ to 3 s.f.',
          body: '$$\\begin{array}{c|c|c|c} a & b & c & f(c) \\\\ \\hline 1 & 2 & 1.5 & 10.75 \\\\ 1 & 1.5 & 1.25 & 4.5625 \\\\ 1 & 1.25 & 1.125 & 1.7031 \\\\ 1 & 1.125 & 1.0625 & 0.3320 \\\\ 1 & 1.0625 & 1.03125 & -0.3389 \\\\ 1.03125 & 1.0625 & 1.046875 & -0.0046 \\\\ 1.046875 & 1.0625 & 1.0546875 & 0.1634 \\end{array}$$\n• **Each row (the idea):** $f(c)$ has the sign of one end; replace that end, so the sign change stays inside.\n• **Stop (the rule):** $1.046875$ and $1.0546875$ are both $1.05$ to 3 s.f.\n\nRoot $\\approx 1.05$; the formula gives $1.04709$ ✓',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Starting from $[1, 2]$, how many bisections guarantee the root of $5x^2 + 11x - 17 = 0$ to within $0.0005$?',
          body: 'Use $n > \\frac{\\ln((b - a)/\\varepsilon)}{\\ln 2}$ with the width below $\\varepsilon = 0.0005$.',
          graph: {
            steps: [
              { ask: '$\\frac{b - a}{\\varepsilon} = $', answer: 2000, tol: 0.5, hint: '$\\frac{1}{0.0005}$.' },
              { ask: '$\\frac{\\ln 2000}{\\ln 2} = $ (2 d.p.)', answer: 10.97, tol: 0.01, hint: '$\\frac{7.6009}{0.6931}$.' },
              { ask: 'Smallest whole $n$', answer: 11, tol: 0.001, hint: 'Round up.', done: 'Reliable but slow: about 3.3 steps per decimal place.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Regula falsi',
      terms: [
        ['Regula falsi (false position)', 'Keep the bracket, but replace the midpoint by the $x$-intercept of the line through $(a, f(a))$ and $(b, f(b))$.'],
        ['False position point', '$c = \\dfrac{af(b) - bf(a)}{f(b) - f(a)}$'],
      ],
      screens: [
        falsiScene,
        {
          type: 'story',
          eyebrow: 'The idea, then the method',
          title: 'Use the sizes, not just the signs',
          body: 'If $f(a) = -0.01$ and $f(b) = 50$, the root is surely near $a$, yet bisection still guesses the middle. **Idea:** draw the straight line through $(a, f(a))$ and $(b, f(b))$ and take where it crosses the axis.\n\nSet $y = 0$ in $y - f(a) = \\frac{f(b) - f(a)}{b - a}(x - a)$ and simplify:\n$$c = \\frac{af(b) - bf(a)}{f(b) - f(a)}.$$\nThen update the bracket **by sign, exactly as in bisection**, so the root can never escape. Weakness: on a curved $f$ one end often sticks, and $c$ creeps in from one side.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Worked, then your turn',
          title: 'Regula falsi for $x^3 - 5x + 1 = 0$ on $[0, 1]$.',
          body: '$f(0) = 1$, $f(1) = -3$, so $c_1 = \\frac{0(-3) - 1(1)}{-3 - 1} = 0.25$ and $f(0.25) = -0.234375$. Sign change in $[0, 0.25]$.',
          graph: {
            steps: [
              { ask: '$c_2 = \\frac{0 \\cdot f(0.25) - 0.25 \\cdot 1}{-0.234375 - 1} = $ (6 d.p.)', answer: 0.202532, tol: 0.000002, hint: '$\\frac{-0.25}{-1.234375}$.' },
              { ask: '$f(c_2) = $ (6 d.p.)', answer: -0.004351, tol: 0.000003, hint: '$c_2^3 - 5c_2 + 1$.' },
              { ask: 'Next bracket', options: ['$[0, 0.202532]$', '$[0.202532, 0.25]$'], answer: 0, hint: '$f(0) > 0 > f(c_2)$: keep the sign change.' },
              { ask: '$c_3 = $ (6 d.p.)', answer: 0.201654, tol: 0.000003, hint: 'Same formula with $b = 0.202532$.', done: 'Notice $a = 0$ never moved: the one-sided creep.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true of both bisection and regula falsi?',
          options: [
            { text: 'They need a starting bracket with $f(a)f(b) < 0$.', correct: true, why: '**The sign change** is what the theorem needs.' },
            { text: 'They can never lose the root.', correct: true, why: '**The bracket is updated by sign**, so it always holds a root.' },
            { text: 'They need $f\'(x)$.', why: '**Only values of $f$.** Newton (Lesson 3) needs $f\'$.' },
            { text: 'Both halve the bracket every step.', why: '**Only bisection** halves; regula falsi can shrink slowly from one side.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe bisection and regula falsi',
          body: 'If $f$ is continuous on $[a, b]$ and $f(a)f(b) < 0$, a root lies in $(a, b)$ by the intermediate value theorem.\n\n**Bisection:** take $c = \\frac{a + b}{2}$; from the sign of $f(c)$ keep $[a, c]$ or $[c, b]$; repeat until two successive values agree to the required accuracy. Slow, but it never fails.\n\n**Regula falsi:** take instead $c = \\frac{af(b) - bf(a)}{f(b) - f(a)}$, where the line through $(a, f(a))$ and $(b, f(b))$ meets the $x$-axis; update the bracket by sign in the same way. Usually faster than bisection, and it also never loses the root.',
        },
        {
          type: 'finish',
          title: 'You can trap and shrink a root.',
          body: 'Next: drop the bracket and feed the answer back in, with $x = g(x)$.',
        },
      ],
    },
  ],
};
