// MTH 209 · Solutions of equations · Lesson 5: the secant method, and comparing all five methods.

const HOOK = [
  ['Bisection', 'Reliable, slow', 'About 10 halvings for 3 decimal places from a unit interval.'],
  ['Regula Falsi', 'Reliable, usually faster', 'Keeps a bracket, but one end can stay fixed for a long time.'],
  ['Newton-Raphson', 'Fastest near the root', 'Correct digits double each step, but it needs $f\'(x)$.'],
  ['Secant', 'Fast, no derivative', 'Nearly as fast as Newton-Raphson, but without a bracket it can wander off.'],
];

export default {
  id: 'secant',
  title: 'The secant method',
  covers: 'Newton-Raphson with f′ replaced by a backward difference; x³ − 5x − 40 from x₀ = 3, x₁ = 4; comparing methods',
  minutes: 16,
  sections: [
    {
      name: 'Deriving the formula',
      terms: [
        ['Secant method', '$x_{n+1} = x_n - f(x_n)\\dfrac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$, $n \\ge 1$. Needs two starting values $x_0$, $x_1$.'],
        ['Backward difference approximation', '$f\'(x_n) \\approx \\dfrac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Solutions of equations · Lesson 5',
          title: 'Newton-Raphson, without the derivative',
          body: 'Newton-Raphson is fast, but every step needs $f\'(x_n)$, and for some functions the derivative is messy or unknown.\n\nThe ==secant method== is a simplification of Newton-Raphson: replace the tangent by the **secant line through the last two points**.',
          cta: 'Derive it',
        },
        {
          type: 'choice',
          poll: 'hook',
          prompt: 'Which root-finding method do you think is the best one to use?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Noted.',
          pollBody: 'At the end of this lesson you’ll race all of them on the same equation.',
        },
        {
          type: 'story',
          eyebrow: 'The derivation',
          title: 'Replace $f\'(x_n)$ by a slope',
          body: 'Start from Newton-Raphson:\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}.$$\n\nApproximate the derivative by the **backward difference**, the slope through the last two points:\n$$f\'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}.$$\n\nSubstituting:\n$$x_{n+1} = x_n - f(x_n)\\,\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})},\\quad n \\ge 1.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'How many starting values does the secant method need?',
          options: [
            { text: 'One, like Newton-Raphson', why: 'The slope needs two points.' },
            { text: 'Two, $x_0$ and $x_1$', correct: true, why: 'The first slope is through $(x_0, f(x_0))$ and $(x_1, f(x_1))$.' },
            { text: 'Three', why: 'Two points define a line.' },
            { text: 'None', why: 'Every iterative method needs a start.' },
          ],
          explain: 'Unlike Regula Falsi, $f(x_0)$ and $f(x_1)$ **don’t** need opposite signs.',
        },
        {
          type: 'bridge',
          title: 'Formula: derived.',
          recap: [
            'Replace $f\'(x_n)$ in Newton-Raphson by $\\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$.',
            '$x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$, starting from $x_0$, $x_1$.',
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
          title: 'Root of $x^3 - 5x - 40 = 0$ near $x = 4$, to 3 s.f.',
          body: 'Use $x_0 = 3$, $x_1 = 4$. Let $f(x) = x^3 - 5x - 40$:\n$$f(x_0) = f(3) = 27 - 15 - 40 = -28,$$\n$$f(x_1) = f(4) = 64 - 20 - 40 = 4.$$\n\n**When $n = 1$:**\n$$x_2 = 4 - 4\\cdot\\frac{4 - 3}{4 - (-28)} = 4 - \\frac{4}{32} = 4 - \\frac18 = \\frac{31}{8} = 3.875.$$\n\nThen $f(x_2) = f(3.875) = -1.189453$.',
        },
        {
          type: 'choice',
          eyebrow: 'n = 2',
          prompt: 'Which two points does the secant method use next?',
          options: [
            { text: '$x_1 = 4$ and $x_2 = 3.875$, the two most recent', correct: true, why: 'The secant method always drops the oldest point.' },
            { text: '$x_0 = 3$ and $x_2 = 3.875$, to keep a sign change', why: 'That is what Regula Falsi would do.' },
            { text: '$x_0 = 3$ and $x_1 = 4$ again', why: 'Then nothing would improve.' },
            { text: 'Only $x_2$', why: 'A slope needs two points.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'n = 2, 3',
          title: 'The table',
          body: '$$x_3 = 3.875 - (-1.189453)\\frac{3.875 - 4}{-1.189453 - 4} = 3.903651$$\n\n$$\\begin{array}{c|c|c} n & x_n & f(x_n) \\\\ \\hline 0 & 3 & -28 \\\\ 1 & 4 & 4 \\\\ 2 & 3.875 & -1.189453 \\\\ 3 & 3.903651 & -0.032515 \\\\ 4 & 3.904456 & 0.000277 \\\\ 5 & 3.904449 & 0.000000 \\end{array}$$\n\n$x_4$ and $x_5$ agree to 3 s.f. (and to 5): **root $= 3.90$** (3 s.f.), matching Newton-Raphson.',
        },
        {
          type: 'bridge',
          title: 'Example: solved.',
          recap: [
            '$x_2 = 3.875$, $x_3 = 3.9037$, $x_4 = 3.90446$: root $3.90$ (3 s.f.).',
            'Always use the two most recent points.',
          ],
          why: 'Last part: put all five methods side by side.',
        },
      ],
    },
    {
      name: 'Compare the methods',
      terms: [
        ['Order of convergence', 'Bisection, Regula Falsi and linear iteration: linear (order 1). Secant: about 1.6. Newton-Raphson: quadratic (order 2).'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'rootRace',
          eyebrow: 'Race them',
          title: 'Four methods, one equation',
          body: 'All four methods are solving $x^3 - 5x - 40 = 0$ (root $3.904449$). Step each method and watch how fast the error falls.',
        },
        {
          type: 'recall',
          poll: 'hook',
          eyebrow: 'Back to the start',
          title: 'Which method is best?',
          body: 'It depends on what you value.',
          rows: HOOK,
          after: 'In the exam, use the method the question names. If it doesn’t name one, Newton-Raphson is usually quickest when $f\'$ is easy to find.',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Which methods need a starting bracket with $f(a)f(b) < 0$?',
          buckets: [
            { id: 'b', label: 'Needs a bracket' },
            { id: 'n', label: 'No bracket needed' },
          ],
          items: [
            { text: 'Bisection', bucket: 'b', why: '**Bisection** keeps a sign change at every step.' },
            { text: 'Regula Falsi', bucket: 'b', why: '**Regula Falsi** keeps a sign change too.' },
            { text: 'Newton-Raphson', bucket: 'n', why: '**One starting value** $x_0$ is enough.' },
            { text: 'Secant', bucket: 'n', why: '**Two starting values**, with any signs.' },
            { text: 'Linear iteration', bucket: 'n', why: '**One starting value** and a convergent $g$.' },
          ],
          explain: 'Bracketing methods are safe; the others are faster but can diverge from a bad start.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Derive the secant formula',
          body: 'The secant method is a simplification of the Newton-Raphson method\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}.$$\nThe derivative is approximated by the backward difference\n$$f\'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}.$$\nSubstituting into the Newton-Raphson formula gives the secant formula\n$$x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})},\\quad n \\ge 1.$$\nIt needs two initial values $x_0$, $x_1$ but no derivative, and they need not bracket the root.',
        },
        {
          type: 'finish',
          title: 'Equations: solved five ways.',
          body: 'You now know every root-finding method in MTH 209. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
