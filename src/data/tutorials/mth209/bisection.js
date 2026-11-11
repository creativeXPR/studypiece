// MTH 209 · Idea B, lesson 1: locating roots with a table of signs, and bisection. Part 1 uses
// x² − 2 on [1, 2]; Part 2 does the past-paper table questions (x³ − 10x + 4) and bisection to 3 dp.

export default {
  id: 'bisection',
  title: 'Locating roots and bisection',
  covers: 'Tables of signs, the intermediate value theorem, halving the bracket, and how many steps you need',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Root', 'A value $x$ with $f(x) = 0$: where the graph crosses the $x$-axis.'],
        ['Sign change', 'If $f$ is continuous and $f(a)$, $f(b)$ have opposite signs, a root lies between $a$ and $b$ (intermediate value theorem).'],
        ['Bisection', 'Halve the bracket $[a, b]$ at $c = \\tfrac{a + b}{2}$ and keep the half whose ends still have opposite signs.'],
      ],
      steps: [
        'Make a table of $f(x)$ at whole numbers (or given points). Every sign change marks an interval holding a root.',
        'Take a bracket $[a, b]$ with $f(a)f(b) < 0$.',
        'Find $c = \\tfrac{a + b}{2}$ and $f(c)$.',
        'If $f(a)f(c) < 0$, the root is in $[a, c]$; otherwise in $[c, b]$. Replace the bracket.',
        'Repeat until the bracket is shorter than the accuracy wanted. After $n$ steps its length is $\\tfrac{b - a}{2^n}$.',
      ],
      examples: [
        {
          title: '$x^2 - 2 = 0$ on $[1, 2]$',
          question: 'Use bisection on $[1, 2]$ to bracket $\\sqrt2$.',
          steps: ['$f(1) = -1 < 0$, $f(2) = 2 > 0$: a root lies between.', '$c = 1.5$, $f = 0.25 > 0$: keep $[1, 1.5]$.', '$c = 1.25$, $f = -0.4375$: keep $[1.25, 1.5]$.', '$c = 1.375$, $f = -0.1094$: keep $[1.375, 1.5]$.', '$c = 1.4375$, $f = 0.0664$: keep $[1.375, 1.4375]$.'],
          answer: 'The root is in $[1.375, 1.4375]$ ($\\sqrt2 = 1.4142$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 1',
          title: 'Where does it balance?',
          body: 'Idea A gave us the tools to measure error. Idea B uses them to **solve**: find $x$ with $f(x) = 0$, where no formula exists (try solving $x^3 - 10x + 4 = 0$ by algebra).\n\nEvery method starts the same way: **find roughly where the root is**. The simplest method, bisection, then closes in on it like a guessing game.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Trap it, then halve the trap',
          body: 'If $f(1) = -1$ and $f(2) = 2$, the graph goes from below the axis to above it, so it must **cross** somewhere between $1$ and $2$ (if $f$ has no jumps). That is the **intermediate value theorem**.\n\nNow test the midpoint $1.5$: $f(1.5) = 0.25 > 0$. The sign changes between $1$ and $1.5$, so the root is there. Each test **halves** the trap.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Bisection, step by step',
          body: '1. Table of $f(x)$; each **sign change** brackets a root.\n2. Take $[a, b]$ with $f(a)f(b) < 0$.\n3. $c = \\tfrac{a + b}{2}$; work out $f(c)$.\n4. Keep $[a, c]$ if $f(a)f(c) < 0$, else $[c, b]$.\n5. Repeat. After $n$ halvings the bracket is $\\tfrac{b - a}{2^n}$ long, so you can say in advance how many steps you need.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2 - 2 = 0$ on $[1, 2]$',
          body: '**Steps 1–2.** $f(1) = -1$, $f(2) = 2$: bracket $[1, 2]$.\n\n**Steps 3–4.** $c = 1.5$, $f = 0.25$ → $[1, 1.5]$. $c = 1.25$, $f = -0.4375$ → $[1.25, 1.5]$. $c = 1.375$, $f = -0.109$ → $[1.375, 1.5]$. $c = 1.4375$, $f = 0.066$ → $[1.375, 1.4375]$.\n\n**Step 5.** Four steps: length $\\tfrac{1}{16}$. The root $\\sqrt2 = 1.4142$ is inside.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$x^2 - 2$: the next step',
          graph: {
            steps: [
              { ask: 'Bracket $[1.375, 1.4375]$. Midpoint $c$?', answer: 1.40625, tol: 0.00001, hint: '$\\tfrac{1.375 + 1.4375}{2}$.' },
              { ask: '$f(c) = c^2 - 2$, to 4 dp?', answer: -0.0225, tol: 0.0002, hint: '$1.40625^2 = 1.97754$.' },
              { ask: 'New bracket?', options: ['$[1.40625, 1.4375]$', '$[1.375, 1.40625]$'], answer: 0, hint: '$f(c) < 0$ and $f(1.4375) > 0$.' },
              { ask: 'How many halvings of $[0, 1]$ make the bracket shorter than $0.001$?', answer: 10, tol: 0.1, hint: 'Need $2^n > 1000$; $2^{10} = 1024$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Locate:** “by constructing a table of values for $x \\in \\{-2, \\ldots, 2\\}$, find the intervals of possible roots”, or “in which of these intervals does the equation have roots?”\n• **Bisect** to a given number of decimal places, showing each bracket.\n• **How many steps** are needed for a given accuracy.\n• **Comment:** bisection always converges, but slowly (one binary digit per step).',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Show the table with every value, and say “sign change, so a root lies in $(a, b)$” for each interval.',
        'An interval with **no** sign change may still hold two roots (or none): say “no sign change” rather than “no root” unless you check further.',
        'If a table value is exactly $0$, that point **is** a root: state it.',
        'Lay out bisection as a table: $a$, $b$, $c$, $f(c)$, new bracket. Stop when both ends round to the same value at the required dp.',
        'Mistake: keeping the wrong half. Always compare the sign of $f(c)$ with the sign of $f(a)$.',
      ],
      examples: [
        {
          title: 'Which intervals hold roots of $x^3 - 10x + 4 = 0$?',
          question: 'Determine in which of $[-4, -3]$, $[4, 5]$, $[0, 1]$, $[2, 3]$ the equation $x^3 - 10x + 4 = 0$ has roots.',
          steps: ['$f(-4) = -20$, $f(-3) = 7$: sign change → root.', '$f(4) = 28$, $f(5) = 79$: no sign change.', '$f(0) = 4$, $f(1) = -5$: sign change → root.', '$f(2) = -8$, $f(3) = 1$: sign change → root.'],
          answer: 'Roots in $[-4, -3]$, $[0, 1]$, $[2, 3]$ (they are $-3.346$, $0.407$, $2.939$).',
        },
        {
          title: '$x^3 - 2x - 5 = 0$ on $[2, 3]$',
          question: 'Use bisection to locate the root in $[2, 3]$.',
          steps: ['$f(2) = -1$, $f(3) = 16$.', '$c = 2.5$, $f = 5.625$ → $[2, 2.5]$.', '$c = 2.25$, $f = 1.891$ → $[2, 2.25]$.', '$c = 2.125$, $f = 0.346$ → $[2, 2.125]$.', '$c = 2.0625$, $f = -0.351$ → $[2.0625, 2.125]$.', '$c = 2.09375$, $f = -0.0089$ → $[2.09375, 2.125]$.'],
          answer: 'The root is in $[2.09375, 2.125]$ (true $2.0946$).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Locate the roots',
          body: '“Determine in which of the intervals $[-4, -3]$, $[4, 5]$, $[0, 1]$, $[2, 3]$ the cubic $x^3 - 10x + 4 = 0$ has roots.”\n\n**What the examiner wants:** $f$ at both ends of **every** interval, the signs, and a sentence for each: “sign change, so a root lies in…” or “no sign change”. A cubic has at most three roots, so three sign changes accounts for all of them.',
          asides: [{ label: 'Exam tip', text: 'If a table value is exactly $0$ (like $f(-2) = 0$ for $2x^3 - 7x + 2$), that number **is** a root. Say so; it earns the mark.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$f(x) = x^3 - 10x + 4$',
          graph: {
            steps: [
              { ask: '$f(-4)$?', answer: -20, tol: 0.01, hint: '$-64 + 40 + 4$.' },
              { ask: '$f(-3)$?', answer: 7, tol: 0.01, hint: '$-27 + 30 + 4$.' },
              { ask: '$f(2)$ and $f(3)$ are $-8$ and $1$. Root in $[2, 3]$?', options: ['Yes, sign change', 'No'], answer: 0, hint: 'Negative to positive.' },
              { ask: '$f(4) = 28$, $f(5) = 79$. Root in $[4, 5]$?', options: ['No sign change', 'Yes'], answer: 0, hint: 'Both positive.' },
            ],
            after: 'Roots in $[-4, -3]$, $[0, 1]$ and $[2, 3]$: all three roots of the cubic found.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'Bracket $[2, 2.5]$ for $x^3 - 2x - 5$, with $f(2) = -1$. At $c = 2.25$, $f(c) = 1.89$. A student keeps $[2.25, 2.5]$. What is right?',
          options: [
            { text: 'Keep $[2, 2.25]$: $f(2) < 0 < f(2.25)$, so the sign change is there', correct: true, why: 'Compare the sign of $f(c)$ with $f(a)$; they differ, so the root is in $[a, c]$.' },
            { text: '$[2.25, 2.5]$ is right', why: '$f(2.25)$ and $f(2.5)$ are both positive: no sign change there.' },
            { text: 'Start again from $[2, 3]$', why: 'No need; just keep the correct half.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Bisection on $x^3 - 2x - 5$, $[2, 3]$',
          graph: {
            steps: [
              { ask: '$f(2.5)$?', answer: 5.625, tol: 0.001, hint: '$15.625 - 5 - 5$.' },
              { ask: 'After $c = 2.5, 2.25, 2.125$ the bracket is $[2, 2.125]$. Next $c$?', answer: 2.0625, tol: 0.0001, hint: 'The midpoint.' },
              { ask: '$f(2.0625)$, to 3 dp?', answer: -0.351, tol: 0.002, hint: '$2.0625^3 = 8.774$.' },
              { ask: 'New bracket?', options: ['$[2.0625, 2.125]$', '$[2, 2.0625]$'], answer: 0, hint: '$f(2.0625) < 0 < f(2.125)$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can trap a root and close in.',
          body: '**Summary:** a sign change traps a root; bisection halves the trap each step; after $n$ steps the bracket is $\\tfrac{b - a}{2^n}$; always slow, always safe.\n\n**Next:** **regula falsi** keeps the trap but cuts it more cleverly, with a straight line instead of the midpoint, so it usually closes in much faster.',
        },
      ],
    },
  ],
};
