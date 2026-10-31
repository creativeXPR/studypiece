// MTH 209 · Systems of linear equations · Lesson 4: the method of simple iteration (SIM).

export default {
  id: 'simple-iteration',
  title: 'The method of simple iteration',
  covers: 'X = CX + F, cᵢⱼ = −aᵢⱼ/aᵢᵢ, fᵢ = bᵢ/aᵢᵢ, the convergence test α < 1, the error estimate',
  minutes: 18,
  sections: [
    {
      name: 'Setting up X = CX + F',
      terms: [
        ['Simple iteration (SIM)', 'Rewrite $AX = B$ as $X = CX + F$ and iterate $x^{(k+1)} = Cx^{(k)} + F$ from an initial vector $x^{(0)}$.'],
        ['Entries of C and F', '$c_{ij} = -\\dfrac{a_{ij}}{a_{ii}}\\ (i \\neq j)$, $c_{ii} = 0$, $f_i = \\dfrac{b_i}{a_{ii}}$, provided $a_{ii} \\neq 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of linear equations · Lesson 4',
          title: 'Solve each equation for its own unknown',
          body: 'Direct methods do a fixed amount of work. For large systems where each unknown dominates its own equation, ==iterative methods== are often simpler: guess, improve, repeat.\n\nTake equation $i$ and solve it for $x_i$:\n$$x_i = \\frac{1}{a_{ii}}\\Big(b_i - \\sum_{j \\neq i} a_{ij}x_j\\Big).$$\n\nIn matrix form this is $X = CX + F$, with\n$$c_{ij} = -\\frac{a_{ij}}{a_{ii}}\\ (i \\neq j),\\quad c_{ii} = 0,\\quad f_i = \\frac{b_i}{a_{ii}}.$$',
          cta: 'Iterate it',
        },
        {
          type: 'story',
          asides: [
            { label: 'Tip', text: 'A quick convergence check: when $x^{(k)}$ and $x^{(k-1)}$ agree at 2 d.p., you have converged to that accuracy.' },
          ],
          eyebrow: 'The iteration',
          title: '$x^{(k+1)} = Cx^{(k)} + F$',
          body: 'Start from an initial vector $x^{(0)}$ (often $F$ itself, or $0$) and compute\n$$x^{(k+1)}_i = c_{i1}x^{(k)}_1 + c_{i2}x^{(k)}_2 + \\cdots + c_{in}x^{(k)}_n + f_i,\\quad k = 0, 1, 2, \\ldots$$\n\n**Every** component of $x^{(k+1)}$ is computed from the **old** vector $x^{(k)}$. Stop when two successive iterates agree to the required number of decimal places.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'For $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$, which is the correct rearrangement for $x_2$?',
          options: [
            { text: '$x_2 = \\frac{1}{10}(13 - 2x_1 - x_3)$', correct: true, why: 'Equation 2 solved for $x_2$: $10x_2 = 13 - 2x_1 - x_3$.' },
            { text: '$x_2 = \\frac{1}{10}(12 - 10x_1 - x_3)$', why: 'Use equation 2, where $x_2$ has the large coefficient.' },
            { text: '$x_2 = 13 - 2x_1 - x_3$', why: 'Divide by $a_{22} = 10$.' },
            { text: '$x_2 = \\frac{1}{10}(13 + 2x_1 + x_3)$', why: 'The other terms change sign when moved across.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Set-up: done.',
          recap: [
            '$x_i = \\frac{1}{a_{ii}}(b_i - \\sum_{j \\neq i} a_{ij}x_j)$, i.e. $X = CX + F$.',
            'SIM: compute all of $x^{(k+1)}$ from $x^{(k)}$.',
          ],
          why: 'Before iterating, always check that it will converge.',
        },
      ],
    },
    {
      name: 'Convergence and error',
      terms: [
        ['Convergence condition', 'Sufficient: $\\sum_j |c_{ij}| \\le \\alpha < 1$ for every row $i$, or $\\sum_i |c_{ij}| \\le \\beta < 1$ for every column $j$. In practice: diagonal dominance.'],
        ['Error estimate', '$|x_i - x^{(k)}_i| \\le \\dfrac{\\alpha}{1 - \\alpha}\\max_j |x^{(k)}_j - x^{(k-1)}_j|$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Convergence',
          title: 'Row sums of $|c_{ij}|$ below 1',
          body: 'The iteration converges to the exact solution $X = \\lim_{k\\to\\infty}x^{(k)}$, for **any** starting vector, if\n$$\\sum_{j=1}^n |c_{ij}| \\le \\alpha < 1\\ \\text{for every } i \\quad\\text{or}\\quad \\sum_{i=1}^n |c_{ij}| \\le \\beta < 1\\ \\text{for every } j.$$\n\nShortcut: row sum $=$ (sum of $|$off-diagonal entries$|$) $\\div |$diagonal entry$|$. So the diagonal entries must be **large** compared with the others in their row: the system is ==diagonally dominant==.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'For $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$, find $\\alpha$.',
          options: [
            { text: '$0.4$', correct: true, why: 'Row sums: $\\frac{2}{10} = 0.2$, $\\frac{3}{10} = 0.3$, $\\frac{4}{10} = 0.4$. $\\alpha = 0.4 < 1$, hence the iteration converges.' },
            { text: '$0.2$', why: 'Take the **largest** row sum.' },
            { text: '$0.9$', why: 'That adds all row sums together.' },
            { text: '$4$', why: 'Divide by the diagonal entry 10.' },
          ],
          explain: 'Always state “$\\alpha < 1$, hence the iteration converges”. It carries marks.',
        },
        {
          type: 'story',
          eyebrow: 'Iterate (from x⁽⁰⁾ = 0)',
          title: 'The table',
          body: '$$\\begin{array}{c|c|c|c|c} k & x_1 & x_2 & x_3 & \\text{max change} \\\\ \\hline 0 & 0 & 0 & 0 & - \\\\ 1 & 1.2 & 1.3 & 1.4 & 1.4 \\\\ 2 & 0.93 & 0.92 & 0.90 & 0.5 \\\\ 3 & 1.018 & 1.024 & 1.030 & 0.13 \\\\ 4 & 0.9946 & 0.9934 & 0.9916 & 0.0384 \\\\ 5 & 1.0015 & 1.0019 & 1.0024 & 0.0108 \\\\ 6 & 0.9996 & 0.9995 & 0.9993 & 0.0031 \\end{array}$$\n\nFor example $x^{(2)}_1 = \\frac{1}{10}(12 - 1.3 - 1.4) = 0.93$. The iterates zig-zag in to the exact solution $(1, 1, 1)$.',
        },
        {
          type: 'choice',
          eyebrow: 'Error estimate',
          prompt: 'After $k = 3$ the largest change is $0.13$ and $\\alpha = 0.4$. Bound the error $|x_i - x^{(3)}_i|$.',
          options: [
            { text: '$\\frac{0.4}{0.6}(0.13) \\approx 0.087$', correct: true, why: '$\\frac{\\alpha}{1 - \\alpha}\\max|x^{(3)}_j - x^{(2)}_j| = 0.667 \\times 0.13 = 0.087$. The true error is $0.03$, within the bound.' },
            { text: '$0.4 \\times 0.13 = 0.052$', why: 'The factor is $\\frac{\\alpha}{1 - \\alpha}$, not $\\alpha$.' },
            { text: '$0.13$', why: 'The change alone isn’t the error bound.' },
            { text: '$\\frac{0.6}{0.4}(0.13) = 0.195$', why: 'The fraction is upside down.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'A larger example',
          title: 'The 4 × 4 system, to 2 d.p.',
          body: '$$\\begin{aligned} 20.9x_1 + 1.2x_2 + 2.1x_3 + 0.9x_4 &= 21.70 \\\\ 1.2x_1 + 21.2x_2 + 1.5x_3 + 2.5x_4 &= 27.46 \\\\ 2.1x_1 + 1.5x_2 + 19.8x_3 + 1.3x_4 &= 28.76 \\\\ 0.9x_1 + 2.5x_2 + 1.3x_3 + 32.1x_4 &= 49.72 \\end{aligned}$$\n\nRow sums $\\approx 0.20, 0.24, 0.25, 0.15$, so $\\alpha \\approx 0.25 < 1$. Starting from $x^{(0)} = F = (1.04, 1.30, 1.45, 1.55)$:\n$$x^{(1)} = (0.75, 0.95, 1.14, 1.36),\\quad x^{(2)} = (0.81, 1.01, 1.21, 1.41),\\ \\ldots$$\nAfter about 6 iterations: $X = (0.80, 1.00, 1.20, 1.40)$.',
        },
        {
          type: 'finish',
          title: 'You can iterate a system.',
          body: 'Next: Gauss-Seidel, the same idea with one small change that makes it faster.',
        },
      ],
    },
  ],
};
