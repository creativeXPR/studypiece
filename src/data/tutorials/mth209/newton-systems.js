// MTH 209 · Systems of non-linear equations · Lesson 2: Newton's method for systems.

export default {
  id: 'newton-systems',
  title: 'Newton’s method for systems',
  covers: 'The Jacobian matrix, x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − J⁻¹F, a full 3 × 3 example, when to stop',
  minutes: 18,
  sections: [
    {
      name: 'From one equation to n',
      terms: [
        ['Jacobian matrix', '$J(x) = \\left[\\dfrac{\\partial f_i}{\\partial x_j}\\right]$: row $i$ holds the partial derivatives of $f_i$ with respect to $x_1, \\ldots, x_n$.'],
        ['Newton’s method for systems', '$x^{(k+1)} = x^{(k)} - J^{-1}(x^{(k)})\\,F(x^{(k)})$, $k = 0, 1, 2, \\ldots$, provided $J(x^{(k)})$ is non-singular.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of non-linear equations · Lesson 2',
          title: 'Newton-Raphson, upgraded',
          body: 'For one equation you know the Newton-Raphson step\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}.$$\n\nFor a system $F(x) = 0$, two things change. First, $f(x_n)$ becomes the **vector** $F(x^{(k)})$. Second, the derivative $f\'$ becomes a **matrix** of partial derivatives, the ==Jacobian== $J(x)$, and dividing by it becomes multiplying by $J^{-1}$.',
          cta: 'Meet the Jacobian',
        },
        {
          type: 'story',
          eyebrow: 'The Jacobian',
          title: 'Every partial derivative, in a grid',
          body: 'For $F = (f_1, \\ldots, f_n)^T$:\n$$J(x) = \\begin{bmatrix} \\dfrac{\\partial f_1}{\\partial x_1} & \\dfrac{\\partial f_1}{\\partial x_2} & \\cdots & \\dfrac{\\partial f_1}{\\partial x_n} \\\\ \\vdots & & & \\vdots \\\\ \\dfrac{\\partial f_n}{\\partial x_1} & \\dfrac{\\partial f_n}{\\partial x_2} & \\cdots & \\dfrac{\\partial f_n}{\\partial x_n} \\end{bmatrix}$$\n**Row** = which function, **column** = which variable.\n\nExample: for $F = \\begin{pmatrix} x_1^2 + x_2^2 + x_3^2 - 1 \\\\ 2x_1^2 + x_2^2 - 4x_3 \\\\ 3x_1^2 - 4x_2 + x_3^2 \\end{pmatrix}$, row 1 is $\\begin{pmatrix} 2x_1 & 2x_2 & 2x_3 \\end{pmatrix}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'What is row 2 of the Jacobian, from $f_2 = 2x_1^2 + x_2^2 - 4x_3$?',
          options: [
            { text: '$\\begin{pmatrix} 4x_1 & 2x_2 & -4 \\end{pmatrix}$', correct: true, why: '$\\frac{\\partial f_2}{\\partial x_1} = 4x_1$, $\\frac{\\partial f_2}{\\partial x_2} = 2x_2$, $\\frac{\\partial f_2}{\\partial x_3} = -4$.' },
            { text: '$\\begin{pmatrix} 2x_1 & 2x_2 & -4 \\end{pmatrix}$', why: 'The derivative of $2x_1^2$ is $4x_1$.' },
            { text: '$\\begin{pmatrix} 4x_1 & 2x_2 & -4x_3 \\end{pmatrix}$', why: '$-4x_3$ differentiates to the constant $-4$.' },
            { text: '$\\begin{pmatrix} 4x_1 & 2x_2 & 0 \\end{pmatrix}$', why: '$f_2$ does depend on $x_3$, through $-4x_3$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The method',
          title: 'Newton’s iteration and when to stop',
          body: 'If $x^{(k)}$ is close to the root $x$, write $x = x^{(k)} + \\varepsilon^{(k)}$. When $J$ is non-singular ($|J| \\ne 0$), the correction is $\\varepsilon^{(k)} \\approx -J^{-1}(x^{(k)})F(x^{(k)})$, giving\n$$x^{(k+1)} = x^{(k)} - J^{-1}(x^{(k)})\\,F(x^{(k)}),\\quad k = 0, 1, 2, \\ldots$$\n\n**Stopping rule:** stop when $\\|x^{(k)} - x^{(k-1)}\\| \\le \\varepsilon$. If no tolerance is given, use $\\varepsilon = 10^{-3}$.\n\n**Tip:** instead of inverting $J$, you can solve $J(x^{(k)})\\,y = -F(x^{(k)})$ for $y$ and set $x^{(k+1)} = x^{(k)} + y$. It is the same step.',
        },
        {
          type: 'bridge',
          title: 'Method: set.',
          recap: [
            '$J(x) = \\left[\\frac{\\partial f_i}{\\partial x_j}\\right]$ replaces $f\'$.',
            '$x^{(k+1)} = x^{(k)} - J^{-1}F$, stop when successive iterates agree.',
          ],
          why: 'Now one full step on a 3 × 3 system.',
        },
      ],
    },
    {
      name: 'Worked example',
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Solve with $x^{(0)} = (0.5, 0.5, 0.5)^T$',
          body: '$$\\begin{aligned} x_1^2 + x_2^2 + x_3^2 &= 1 \\\\ 2x_1^2 + x_2^2 - 4x_3 &= 0 \\\\ 3x_1^2 - 4x_2 + x_3^2 &= 0 \\end{aligned}$$\n\nAt $x^{(0)}$:\n$$F(x^{(0)}) = \\begin{pmatrix} 0.25 + 0.25 + 0.25 - 1 \\\\ 0.5 + 0.25 - 2 \\\\ 0.75 - 2 + 0.25 \\end{pmatrix} = \\begin{pmatrix} -0.25 \\\\ -1.25 \\\\ -1.0 \\end{pmatrix},\\qquad J(x^{(0)}) = \\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 1 & -4 \\\\ 3 & -4 & 1 \\end{pmatrix}.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\det J(x^{(0)})$.',
          options: [
            { text: '$-40$', correct: true, why: '$1(1 - 16) - 1(2 + 12) + 1(-8 - 3) = -15 - 14 - 11 = -40$.' },
            { text: '$40$', why: 'Check the signs: every bracket is negative here.' },
            { text: '$-8$', why: 'Expand fully: $1(1 \\cdot 1 - (-4)(-4)) - 1(2 \\cdot 1 - (-4)(3)) + 1(2(-4) - 1 \\cdot 3)$.' },
            { text: '$0$', why: 'If it were $0$, Newton’s method would fail at this step.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'The inverse and the first step',
          body: 'From the adjoint, $J^{-1}(x^{(0)}) = -\\frac{1}{40}\\begin{pmatrix} -15 & -5 & -5 \\\\ -14 & -2 & 6 \\\\ -11 & 7 & -1 \\end{pmatrix} = \\begin{pmatrix} \\frac38 & \\frac18 & \\frac18 \\\\ \\frac{7}{20} & \\frac{1}{20} & -\\frac{3}{20} \\\\ \\frac{11}{40} & -\\frac{7}{40} & \\frac{1}{40} \\end{pmatrix}.$\n\n$$J^{-1}F = \\begin{pmatrix} \\frac38(-0.25) + \\frac18(-1.25) + \\frac18(-1) \\\\ \\frac{7}{20}(-0.25) + \\frac{1}{20}(-1.25) - \\frac{3}{20}(-1) \\\\ \\frac{11}{40}(-0.25) - \\frac{7}{40}(-1.25) + \\frac{1}{40}(-1) \\end{pmatrix} = \\begin{pmatrix} -0.375 \\\\ 0 \\\\ 0.125 \\end{pmatrix}.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'So what is $x^{(1)} = x^{(0)} - J^{-1}F$?',
          options: [
            { text: '$(0.875,\\ 0.5,\\ 0.375)^T$', correct: true, why: '$(0.5 + 0.375,\\ 0.5 - 0,\\ 0.5 - 0.125)$.' },
            { text: '$(0.125,\\ 0.5,\\ 0.625)^T$', why: 'You added $J^{-1}F$. The formula subtracts it.' },
            { text: '$(-0.375,\\ 0,\\ 0.125)^T$', why: 'That is the correction $J^{-1}F$ itself, not the new iterate.' },
            { text: '$(0.875,\\ 0.5,\\ 0.625)^T$', why: 'Third component: $0.5 - 0.125 = 0.375$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Repeat until the iterates agree',
          body: 'Recompute $F$ and $J$ at each new point and repeat:\n$$\\begin{array}{c|ccc|c} k & x_1 & x_2 & x_3 & \\text{change} \\\\ \\hline 0 & 0.5 & 0.5 & 0.5 & \\\\ 1 & 0.87500 & 0.50000 & 0.37500 & 0.375 \\\\ 2 & 0.78982 & 0.49662 & 0.36993 & 0.085 \\\\ 3 & 0.78521 & 0.49661 & 0.36992 & 0.0046 \\\\ 4 & 0.78520 & 0.49661 & 0.36992 & 0.000014 \\end{array}$$\n\n(“change” is $\\|x^{(k)} - x^{(k-1)}\\|_\\infty$.) With $\\varepsilon = 10^{-3}$ we stop at $k = 4$: $x \\approx (0.78520,\\ 0.49661,\\ 0.36992)^T$.\n\nNotice the error roughly **squares** each step ($0.085 \\to 0.0046 \\to 0.000014$): Newton converges quadratically.',
        },
        {
          type: 'sort',
          eyebrow: 'Compare the methods',
          prompt: 'Fixed-point iteration or Newton’s method?',
          buckets: [
            { id: 'fp', label: 'Fixed-point iteration' },
            { id: 'nt', label: 'Newton’s method' },
          ],
          items: [
            { text: 'Needs the Jacobian at every step', bucket: 'nt', why: '**Newton** recomputes $J(x^{(k)})$ and solves with it each step.' },
            { text: 'Converges quadratically near the root', bucket: 'nt', why: '**Newton**: the number of correct digits roughly doubles each step.' },
            { text: 'Needs the system rewritten as $x = G(x)$', bucket: 'fp', why: '**Fixed point**: solve equation $i$ for $x_i$.' },
            { text: 'Convergence guaranteed by $\\left|\\frac{\\partial g_i}{\\partial x_j}\\right| \\le \\frac{K}{n}$, $K < 1$', bucket: 'fp', why: '**Fixed-point theorem** condition.' },
          ],
          explain: 'Newton is faster but each step costs more; fixed-point steps are cheap but slow.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe Newton’s method for $F(x) = 0$',
          body: 'Consider the system $f_i(x_1, \\ldots, x_n) = 0$, $i = 1, \\ldots, n$, written $F(x) = 0$. Compute the Jacobian matrix\n$$J(x) = \\left[\\frac{\\partial f_i}{\\partial x_j}\\right],\\quad i, j = 1, \\ldots, n.$$\nIf $x^{(k)}$ approximates the root and $J(x^{(k)})$ is non-singular, the next approximation is\n$$x^{(k+1)} = x^{(k)} - J^{-1}(x^{(k)})\\,F(x^{(k)}),\\quad k = 0, 1, 2, \\ldots,$$\nstarting from a given $x^{(0)}$. Stop when $\\|x^{(k)} - x^{(k-1)}\\| \\le \\varepsilon$ for the required tolerance $\\varepsilon$.',
        },
        {
          type: 'finish',
          title: 'Non-linear systems: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
