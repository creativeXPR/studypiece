// MTH 209 · Idea B, lesson 5: the secant method, and comparing all five root methods. Part 1 derives
// the secant formula from Newton with a backward difference and uses x² − 2; Part 2 does the class
// example x³ − 5x − 40 near 4 to 3 sf and a comparison question.

export default {
  id: 'secant',
  title: 'Secant, and comparing the methods',
  covers: 'Newton without a derivative, rounding carefully, and choosing between the five root methods',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Secant method', '$x_{n+1} = x_n - f(x_n)\\dfrac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$: Newton with $f\'$ replaced by the slope through the last two points.'],
        ['Bracketing method', 'Keeps a root trapped between two points of opposite sign (bisection, regula falsi): always converges.'],
        ['Open method', 'Does not keep a bracket (iteration, Newton, secant): faster, but can diverge.'],
      ],
      steps: [
        'Take two starting values $x_0$, $x_1$ (they need **not** bracket the root).',
        'Compute $f(x_0)$, $f(x_1)$.',
        '$x_{n+1} = x_n - f(x_n)\\dfrac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$.',
        'Drop the oldest point (whatever its sign) and repeat.',
        'Round only the value you report; carry the full value into the next step. Stop when two reported values agree.',
      ],
      examples: [
        {
          title: '$x^2 - 2 = 0$ with $x_0 = 1$, $x_1 = 2$',
          question: 'Apply the secant method to $x^2 - 2$.',
          steps: ['$f(1) = -1$, $f(2) = 2$.', '$x_2 = 2 - 2 \\cdot \\tfrac{2 - 1}{2 - (-1)} = 1.333333$.', '$x_3 = 1.4$, $x_4 = 1.414634$, $x_5 = 1.414211$.'],
          answer: 'Closing on $\\sqrt2 = 1.414214$ almost as fast as Newton.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 5',
          title: 'Newton, without the derivative',
          body: 'Newton needs $f\'(x)$. Sometimes $f\'$ is messy or unknown. The **secant method** replaces the tangent by a **secant**: the line through the last two points.\n\nIt looks like regula falsi, but with one key difference: it does **not** keep a bracket. That makes it faster, and less safe.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Slope from two points',
          body: 'Newton: $x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$. Replace $f\'(x_n)$ by the slope through the last two points (a backward difference, as in Idea C):\n$$f\'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}.$$\nSo\n$$x_{n+1} = x_n - f(x_n)\\,\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}.$$',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Secant, step by step',
          body: '1. Two starting values $x_0$, $x_1$. No sign change is needed.\n2. Work out $f(x_0)$, $f(x_1)$.\n3. Apply the formula to get $x_2$.\n4. Drop the **oldest** point, whatever its sign, and repeat.\n5. Round only what you report; keep the full value for the next step.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$x^2 - 2$ with $x_0 = 1$, $x_1 = 2$',
          body: '**Step 2.** $f(1) = -1$, $f(2) = 2$.\n\n**Step 3.** $x_2 = 2 - 2 \\cdot \\dfrac{2 - 1}{2 - (-1)} = 2 - \\tfrac23 = 1.333333$.\n\n**Step 4.** Now use $x_1 = 2$ and $x_2 = 1.333333$: $x_3 = 1.4$. Then $x_4 = 1.414634$, $x_5 = 1.414211$.\n\nNearly Newton’s speed, with no derivative needed.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Secant on $x^2 - 2$',
          graph: {
            steps: [
              { ask: 'With $x_1 = 2$, $x_2 = \\tfrac43$: $f(\\tfrac43)$, to 4 dp?', answer: -0.2222, tol: 0.0002, hint: '$\\tfrac{16}{9} - 2$.' },
              { ask: '$x_3 = \\tfrac43 - f(\\tfrac43)\\dfrac{\\frac43 - 2}{f(\\frac43) - f(2)}$, to 4 dp?', answer: 1.4, tol: 0.0003, hint: '$\\tfrac43 - (-0.2222)\\tfrac{-0.6667}{-2.2222}$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Comparing the methods',
          title: 'Which method, when?',
          body: '• **Bisection:** bracket; always converges; slow (one binary digit per step).\n• **Regula falsi:** bracket; always converges; usually faster, but a fixed end can stall it.\n• **Linear iteration:** no bracket; converges only if $|g\'| < 1$; speed set by $|g\'|$.\n• **Newton:** no bracket; very fast at a simple root; needs $f\'$; can jump or stall.\n• **Secant:** no bracket; nearly Newton’s speed without $f\'$; can diverge.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Write the formula, then substitute for each $n$ with all values shown.',
        'Use the unrounded $x_n$ in the next step, even when the question asks for 3 sf answers.',
        'Stop when two successive values agree at the stated precision, and say so.',
        'Comparison questions: mention bracket or not, guaranteed convergence or not, speed, and whether $f\'$ is needed.',
        'Mistake: keeping the point with the opposite sign (that is regula falsi). The secant method always drops the oldest point.',
      ],
      examples: [
        {
          title: '$x^3 - 5x - 40 = 0$ near $x = 4$, to 3 sf',
          question: 'Find the root of $x^3 - 5x - 40 = 0$ near $x = 4$ by the secant method, correct to 3 sf. Use $x_0 = 3$, $x_1 = 4$.',
          steps: ['$f(3) = 27 - 15 - 40 = -28$, $f(4) = 64 - 20 - 40 = 4$.', '$x_2 = 4 - 4 \\cdot \\tfrac{4 - 3}{4 - (-28)} = 4 - \\tfrac18 = 3.875$ (3 sf: $3.88$); $f(3.875) = -1.189453$.', '$x_3 = 3.875 - (-1.189453)\\tfrac{3.875 - 4}{-1.189453 - 4} = 3.903651$ (3 sf: $3.90$).', '$x_4 = 3.904456$ (3 sf: $3.90$).', '$x_3$ and $x_4$ agree to 3 sf.'],
          answer: 'Root $= 3.90$ (3 sf).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Three significant figures',
          body: '“Find the root of $x^3 - 5x - 40 = 0$ near $x = 4$ using the secant method, correct to 3 sf. Use $x_0 = 3$, $x_1 = 4$.”\n\n**What the examiner wants:** $f(x_0)$ and $f(x_1)$; the formula for each step with the numbers in; each $x_n$ reported to 3 sf **but** carried in full; and the stopping reason. The full solution is in **Examples**.',
          asides: [{ label: 'Exam tip', text: 'Report $x_2 = 3.88$ (3 sf) but compute the next step with $3.875$. Rounding early can change your final digits.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$x^3 - 5x - 40$ from $3$ and $4$',
          graph: {
            steps: [
              { ask: '$x_2 = 4 - 4 \\cdot \\dfrac{4 - 3}{4 - (-28)}$?', answer: 3.875, tol: 0.0001, hint: '$4 - \\tfrac{4}{32}$.' },
              { ask: '$f(3.875)$, to 4 dp?', answer: -1.1895, tol: 0.0002, hint: '$58.1855 - 19.375 - 40$.' },
              { ask: '$x_3 = 3.875 - (-1.189453)\\dfrac{3.875 - 4}{-1.189453 - 4}$, to 4 dp?', answer: 3.9037, tol: 0.0002, hint: 'The fraction is $\\tfrac{-0.125}{-5.189453} = 0.024087$.' },
              { ask: 'With $x_4 = 3.904456$, the root to 3 sf is…', answer: 3.9, tol: 0.001, hint: 'Both round to $3.90$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'After $x_0 = 3$, $x_1 = 4$, $x_2 = 3.875$, which two points does the secant method use to find $x_3$?',
          options: [
            { text: '$x_1 = 4$ and $x_2 = 3.875$: the two most recent, dropping the oldest', correct: true, why: 'The secant method always slides along to the two newest points, whatever their signs.' },
            { text: 'Whichever two points have opposite signs', why: 'Choosing by sign is regula falsi, not secant.' },
            { text: '$x_0 = 3$ and $x_1 = 4$, the starting pair', why: 'The starting pair is only for the first step.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Final question',
          prompt: 'You need a root of a complicated $f$ whose derivative is very messy, and you know only a rough starting area. Which method fits best, and why?',
          options: [
            { text: 'Secant: nearly as fast as Newton and needs no derivative', correct: true, why: 'If a bracket is known and safety matters most, regula falsi or bisection would be the safe choice instead.' },
            { text: 'Newton, because it is fastest', why: 'It needs $f\'$, which is messy here.' },
            { text: 'Bisection, because it is fastest', why: 'Bisection is the slowest, though the safest.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know all five root methods.',
          body: '**Summary:** secant is Newton with the slope from two points; it drops the oldest point; round only what you report. Bracketing methods are safe; open methods are fast but can diverge.\n\n**Next:** from one equation to **many at once**. Linear systems $AX = B$ start with consistency and the matrix inverse method.',
        },
      ],
    },
  ],
};
