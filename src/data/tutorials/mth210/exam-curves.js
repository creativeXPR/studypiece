// MTH 210 · Curves · Exam practice: worked exam-style questions on chapter 6.
export default {
  id: 'exam-curves',
  title: 'Exam practice: curves',
  covers: 'Exam-style questions: domains, tracing an ellipse or hyperbola, limits and continuity, unit tangent, normal and binormal, curvature and torsion of a helix and a twisted cubic',
  minutes: 15,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['Helix', '$\\vec r = (a\\cos t, a\\sin t, ct)$: $\\kappa = \\dfrac{a}{a^2 + c^2}$, $\\tau = \\dfrac{c}{a^2 + c^2}$.'],
        ['Order of work', '$\\vec r\\,\'$, $\\vec r\\,\'\'$, $\\vec r\\,\'\'\'$ → $\\vec r\\,\' \\times \\vec r\\,\'\'$ → lengths → $\\kappa$, $\\tau$, $\\vec u$, $\\vec b$, $\\vec n$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'For $\\vec r(t) = 3\\cos t\\,\\vec i + 3\\sin t\\,\\vec j + 4t\\,\\vec k$, find $\\vec u$, $\\vec n$, $\\vec b$, $\\kappa$ and $\\tau$.',
          body: '**Derivatives.** $\\vec r\\,\' = (-3\\sin t, 3\\cos t, 4)$, $\\|\\vec r\\,\'\\| = \\sqrt{9 + 16} = 5$; $\\vec r\\,\'\' = (-3\\cos t, -3\\sin t, 0)$; $\\vec r\\,\'\'\' = (3\\sin t, -3\\cos t, 0)$.\n\n**Tangent.** $\\vec u = \\frac15(-3\\sin t, 3\\cos t, 4)$.\n\n**Cross.** $\\vec r\\,\' \\times \\vec r\\,\'\' = (12\\sin t, -12\\cos t, 9)$, length $\\sqrt{144 + 81} = 15$.\n\n**Binormal.** $\\vec b = \\frac15(4\\sin t, -4\\cos t, 3)$. **Normal.** $\\vec n = \\vec b \\times \\vec u = (-\\cos t, -\\sin t, 0)$.\n\n**Curvature.** $\\kappa = \\frac{15}{5^3} = \\frac{3}{25}$. **Torsion.** $(\\vec r\\,\' \\times \\vec r\\,\'\') \\cdot \\vec r\\,\'\'\' = 36\\sin^2 t + 36\\cos^2 t = 36$, so $\\tau = \\frac{36}{225} = \\frac{4}{25}$.',
          asides: [{ label: 'Exam tip', text: 'Check with the helix formulas: $a = 3$, $c = 4$ give $\\kappa = \\frac{3}{25}$ and $\\tau = \\frac{4}{25}$ ✓.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'The curvature of $\\vec r(t) = (\\cos t, \\sin t, t)$ is',
          options: [
            { text: '$\\frac12$', correct: true, why: '$a = 1$, $c = 1$: $\\kappa = \\frac{1}{1 + 1}$.' },
            { text: '$1$', why: 'That is a unit circle’s curvature; the climb makes the helix bend less.' },
            { text: '$\\frac{1}{\\sqrt2}$', why: '$\\|\\vec r\\,\' \\times \\vec r\\,\'\'\\| = \\sqrt2$ and $\\|\\vec r\\,\'\\|^3 = 2\\sqrt2$.' },
            { text: '$0$', why: 'A helix bends at every point.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'Write vector functions that trace (a) $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$, (b) $x^2 + y^2 = 4$, (c) $\\frac{x^2}{25} - \\frac{y^2}{16} = 1$.',
          body: '**(a)** $\\left(\\frac x4\\right)^2 + \\left(\\frac y3\\right)^2 = 1 \\leftrightarrow \\cos^2 t + \\sin^2 t = 1$: $\\vec r(t) = 4\\cos t\\,\\vec i + 3\\sin t\\,\\vec j$, $0 \\le t \\le 2\\pi$.\n\n**(b)** Radius $2$: $\\vec r(t) = 2\\cos t\\,\\vec i + 2\\sin t\\,\\vec j$.\n\n**(c)** $\\left(\\frac x5\\right)^2 - \\left(\\frac y4\\right)^2 = 1 \\leftrightarrow \\sec^2 t - \\tan^2 t = 1$: $\\vec r(t) = 5\\sec t\\,\\vec i + 4\\tan t\\,\\vec j$.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'A vector function for $y = x^2 - 3x$ is',
          options: [
            { text: '$t\\,\\vec i + (t^2 - 3t)\\,\\vec j$', correct: true, why: 'Put $x = t$, then $y = t^2 - 3t$.' },
            { text: '$(t^2 - 3t)\\,\\vec i + t\\,\\vec j$', why: 'That swaps $x$ and $y$: it traces $x = y^2 - 3y$.' },
            { text: '$\\cos t\\,\\vec i + \\sin t\\,\\vec j$', why: 'That is the unit circle.' },
            { text: '$t^2\\,\\vec i - 3t\\,\\vec j$', why: 'Then $x = t^2$, $y = -3t$, which is not $y = x^2 - 3x$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'State the domain of $\\vec r(t) = \\sqrt{2 - t}\\,\\vec i + \\ln(t + 3)\\,\\vec j + e^t\\vec k$, and evaluate $\\lim_{t \\to 3}\\left[(t^2 - 3t + 4)\\vec i + (4t + 3)\\vec j\\right]$.',
          body: '**Domain.** $\\sqrt{2 - t}$: $t \\le 2$. $\\ln(t + 3)$: $t > -3$. $e^t$: all $t$. Intersect: $\\{t : -3 < t \\le 2\\} = (-3, 2]$.\n\n**Limit.** Component by component: $9 - 9 + 4 = 4$ and $12 + 3 = 15$, so the limit is $4\\vec i + 15\\vec j$.',
        },
        {
          type: 'choice',
          eyebrow: 'Quick one',
          prompt: 'Is $\\vec r(t) = 3\\tan t\\,\\vec i + 4\\sec t\\,\\vec j + 5t\\,\\vec k$ continuous at $t = \\frac\\pi2$?',
          options: [
            { text: 'No: $\\vec r\\left(\\frac\\pi2\\right)$ does not exist', correct: true, why: '$\\tan\\frac\\pi2$ and $\\sec\\frac\\pi2$ are undefined, so the first condition fails.' },
            { text: 'Yes: $5t$ is continuous', why: 'Every component must be continuous.' },
            { text: 'Yes: the limit exists', why: '$\\tan t$ blows up near $\\frac\\pi2$.' },
            { text: 'Only from the left', why: 'It is not defined at $\\frac\\pi2$ at all.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 6 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
