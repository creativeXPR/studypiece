// MTH 209 · Solutions of equations · Lesson 1: the bisection method.

export default {
  id: 'bisection',
  title: 'The bisection method',
  covers: 'Bracketing a root, the intermediate value theorem, halving until two values agree',
  minutes: 14,
  sections: [
    {
      name: 'The idea',
      terms: [
        ['Root of $f(x) = 0$', 'A value of $x$ where the graph of $y = f(x)$ crosses (or touches) the $x$-axis.'],
        ['Intermediate (mid) value theorem', 'If $f$ is continuous on $[a, b]$ and $f(a)$, $f(b)$ have opposite signs, there is at least one root between $a$ and $b$.'],
        ['Bracket', 'An interval $[a, b]$ with $f(a)f(b) < 0$, so it is known to contain a root.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Solutions of equations · Lesson 1',
          title: 'Some equations have no formula',
          body: 'You can solve $5x^2 + 11x - 17 = 0$ with the quadratic formula. But what about $x^3 - 5x - 40 = 0$, or $x = \\cos x$?\n\nFor most equations there is no neat formula. ==Numerical methods== find the root **approximately**, to any accuracy we ask for, by repeating a simple step.\n\nThe simplest of them all is ==bisection==: trap the root in an interval, then keep cutting the interval in half.',
          cta: 'Show me',
        },
        {
          type: 'story',
          eyebrow: 'The key theorem',
          title: 'A sign change traps a root',
          body: 'If $f$ is **continuous** on $[a, b]$ and $f(a)$ and $f(b)$ have **opposite signs**, i.e. $f(a)f(b) < 0$, then the graph must cross the $x$-axis somewhere between $a$ and $b$.\n\nThis is the ==intermediate (mid) value theorem==. It is the reason bisection works, so quote it in the exam.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'For $f(x) = 5x^2 + 11x - 17$: $f(0) = -17$, $f(1) = -1$, $f(2) = 25$. Where must a root lie?',
          options: [
            { text: 'Between $0$ and $1$', why: 'Both $f(0)$ and $f(1)$ are negative: no sign change there.' },
            { text: 'Between $1$ and $2$', correct: true, why: '$f(1) = -1 < 0$ and $f(2) = 25 > 0$: the sign changes, so a root lies in $(1, 2)$.' },
            { text: 'At $x = 1$', why: '$f(1) = -1 \\neq 0$, so $1$ is not a root, though it is close.' },
            { text: 'We can’t tell without a graph', why: 'The sign change is all the theorem needs.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'The rule',
          title: 'One bisection step',
          cards: [
            { title: '1 · Midpoint', text: 'Compute $c = \\dfrac{a + b}{2}$ and $f(c)$.' },
            { title: '2 · f(c) = 0?', text: 'Then $c$ is the root. Stop (this rarely happens exactly).' },
            { title: '3 · Same sign as f(a)?', text: 'The sign change is now between $c$ and $b$: replace $a$ by $c$.' },
            { title: '4 · Same sign as f(b)?', text: 'The sign change is between $a$ and $c$: replace $b$ by $c$.' },
          ],
          note: 'Stopping rule: stop when two successive values of $c$ agree to the accuracy asked for.',
        },
        {
          type: 'bridge',
          title: 'The idea: set.',
          recap: [
            'A sign change on a continuous $f$ traps a root (**intermediate value theorem**).',
            'Halve the bracket, keep the half with the sign change, repeat.',
          ],
          why: 'Now a worked example, one row at a time.',
        },
      ],
    },
    {
      name: 'Worked example',
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Solve $5x^2 + 11x - 17 = 0$ to 3 s.f.',
          body: 'Start with $a = 1$, $b = 2$ (we found $f(1) < 0 < f(2)$).\n\n**Row 1:** $c = \\frac{1 + 2}{2} = 1.5$, and\n$$f(1.5) = 5(2.25) + 16.5 - 17 = 10.75 > 0.$$\n$f(1.5)$ has the same sign as $f(b)$, so the root is in $[1, 1.5]$: replace $b$ by $1.5$.',
        },
        {
          type: 'choice',
          eyebrow: 'Row 2',
          prompt: 'Now $a = 1$, $b = 1.5$. The midpoint is $c = 1.25$ with $f(1.25) = 4.5625$. What is the next bracket?',
          options: [
            { text: '$[1.25, 1.5]$', why: '$f(1.25)$ and $f(1.5)$ are both positive: no sign change there.' },
            { text: '$[1, 1.25]$', correct: true, why: '$f(1) < 0 < f(1.25)$, so the sign change is in $[1, 1.25]$.' },
            { text: '$[1, 1.5]$', why: 'Each step must halve the bracket.' },
            { text: '$[1.125, 1.375]$', why: 'The new bracket always has the midpoint as one end.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The full table',
          title: 'Keep going until two values agree',
          body: '$$\\begin{array}{c|c|c|c} a & b & c & f(c) \\\\ \\hline 1 & 2 & 1.5 & 10.75 \\\\ 1 & 1.5 & 1.25 & 4.5625 \\\\ 1 & 1.25 & 1.125 & 1.7031 \\\\ 1 & 1.125 & 1.0625 & 0.3320 \\\\ 1 & 1.0625 & 1.03125 & -0.3389 \\\\ 1.03125 & 1.0625 & 1.046875 & -0.0046 \\\\ 1.046875 & 1.0625 & 1.0546875 & 0.1634 \\end{array}$$\n\nThe last two midpoints, $1.046875$ and $1.0546875$, are **both $1.05$ to 3 s.f.**, so we stop.\n\n**Root $\\approx 1.05$** (3 s.f.). The quadratic formula gives $1.04709\\ldots$ ✓',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the method',
          prompt: 'Put the steps of a bisection solution in order.',
          items: [
            'Find $a$, $b$ with $f(a)f(b) < 0$.',
            'Compute $c = \\frac{a + b}{2}$ and $f(c)$.',
            'Replace whichever of $a$, $b$ has the same sign as $f(c)$ by $c$.',
            'Repeat with the new, halved interval.',
            'Stop when two successive values of $c$ agree to the required accuracy.',
          ],
          explain: 'Present your working as a table with columns $a$, $b$, $c$, $f(c)$: it is quick to mark and quick to check.',
        },
        {
          type: 'bridge',
          title: 'Example: solved.',
          recap: [
            'Root of $5x^2 + 11x - 17 = 0$ in $[1, 2]$ is $1.05$ (3 s.f.).',
            'A table of $a, b, c, f(c)$ is the cleanest way to show the work.',
          ],
          why: 'Bisection always works, but it’s slow. How slow, exactly?',
        },
      ],
    },
    {
      name: 'Strengths and limits',
      terms: [
        ['Error after n bisections', 'The bracket has width $\\frac{b - a}{2^n}$, so the midpoint is within $\\frac{b - a}{2^{n+1}}$ of the root.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'How fast?',
          prompt: 'Starting with $[1, 2]$ (width 1), how many bisections make the bracket narrower than $0.001$?',
          options: [
            { text: '$3$', why: 'After 3 steps the width is $\\frac18 = 0.125$.' },
            { text: '$10$', correct: true, why: 'We need $2^{-n} < 0.001$, i.e. $2^n > 1000$. $2^9 = 512$ is too small; $2^{10} = 1024$ works.' },
            { text: '$100$', why: 'Far more than needed: halving shrinks the width quickly at first.' },
            { text: '$1000$', why: 'That confuses $2^n$ with $n$.' },
          ],
          explain: 'Each step gains about one binary digit, i.e. roughly 3.3 steps per decimal place. Reliable but slow.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about the bisection method are true?',
          options: [
            { text: 'It needs $f$ to be continuous and $f(a)f(b) < 0$ at the start.', correct: true, why: '**Continuity and a sign change** are what the theorem needs.' },
            { text: 'It never fails once a bracket is found.', correct: true, why: '**The bracket always contains a root**, and it halves every step.' },
            { text: 'It needs the derivative $f\'(x)$.', why: '**Only values of $f$** are used. Newton-Raphson is the one that needs $f\'$.' },
            { text: 'It is usually the fastest method.', why: '**It is the slowest** of the methods in this course; its strength is reliability.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe the bisection method',
          body: 'If $f$ is continuous on $[a, b]$ and $f(a)$, $f(b)$ have opposite signs, then by the **intermediate value theorem** there is at least one root in $(a, b)$.\n\nThe midpoint $c = \\frac{a + b}{2}$ is taken. From the sign of $f(c)$ we decide whether the root lies in $[a, c]$ or $[c, b]$, and that half becomes the new interval. The process is repeated until two successive values of $c$ agree to the required accuracy.\n\nThe method is **slow** (it needs many iterations) but **never fails** to produce the root.',
        },
        {
          type: 'finish',
          title: 'You can bisect.',
          body: 'Next: Regula Falsi keeps the bracket but makes a smarter guess than the midpoint.',
        },
      ],
    },
  ],
};
