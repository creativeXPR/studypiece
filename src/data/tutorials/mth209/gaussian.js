// MTH 209 · Systems of linear equations · Lesson 3: the Gaussian (elimination) method.

export default {
  id: 'gaussian',
  title: 'The Gaussian method',
  covers: 'Successive elimination: b₁ⱼ = a₁ⱼ/a₁₁, a⁽¹⁾ᵢⱼ = aᵢⱼ − aᵢ₁b₁ⱼ, row interchange, a 4 × 4 worked example',
  minutes: 20,
  sections: [
    {
      name: 'The algorithm',
      terms: [
        ['Gaussian method', 'Successive elimination of the unknowns, reducing the system to an upper triangular system, then back substitution.'],
        ['Stage 1 formulas', '$b_{1j} = \\dfrac{a_{1j}}{a_{11}}$; $a^{(1)}_{ij} = a_{ij} - a_{i1}b_{1j}$ for $i \\ge 2$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of linear equations · Lesson 3',
          title: 'Eliminate, then back-substitute',
          body: 'The ==Gaussian method== eliminates the unknowns one at a time: use equation 1 to remove $x_1$ from every equation below it, then equation 2 to remove $x_2$, and so on. What remains is **upper triangular**, solved by back substitution.\n\nWrite the right-hand side as an extra column: for a $4 \\times 4$ system, $b_i$ becomes $a_{i5}$.',
          cta: 'Stage 1',
        },
        {
          type: 'story',
          eyebrow: 'Stage 1 · Normalise the pivot row',
          title: 'Divide equation (1) by $a_{11}$',
          body: 'Assuming $a_{11} \\neq 0$:\n$$x_1 + b_{12}x_2 + b_{13}x_3 + b_{14}x_4 = b_{15},\\qquad b_{1j} = \\frac{a_{1j}}{a_{11}},\\ j = 2, \\ldots, 5.$$\n\n**Eliminate $x_1$** from equations (2), (3), (4): multiply this new equation by $a_{21}, a_{31}, a_{41}$ and subtract:\n$$a^{(1)}_{ij} = a_{ij} - a_{i1}b_{1j},\\qquad i = 2, 3, 4;\\ j = 2, \\ldots, 5.$$\n\nIn words: **new = old − (column entry) × (pivot-row entry)**.',
        },
        {
          type: 'story',
          eyebrow: 'Stages 2 and 3',
          title: 'Repeat on the smaller system',
          body: 'Divide the new equation (2) by $a^{(1)}_{22}$:\n$$b_{2j} = \\frac{a^{(1)}_{2j}}{a^{(1)}_{22}},\\qquad a^{(2)}_{ij} = a^{(1)}_{ij} - a^{(1)}_{i2}b_{2j},\\ i = 3, 4.$$\n\nThen divide by $a^{(2)}_{33}$:\n$$b_{3j} = \\frac{a^{(2)}_{3j}}{a^{(2)}_{33}},\\qquad a^{(3)}_{4j} = a^{(2)}_{4j} - a^{(2)}_{43}b_{3j}.$$\n\n**Back substitution:**\n$$x_4 = \\frac{a^{(3)}_{45}}{a^{(3)}_{44}},\\ x_3 = b_{35} - b_{34}x_4,\\ x_2 = b_{25} - b_{23}x_3 - b_{24}x_4,\\ x_1 = b_{15} - b_{12}x_2 - b_{13}x_3 - b_{14}x_4.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Zero pivot',
          prompt: 'Solving $2x_2 + x_3 = 4$, $x_1 + x_2 + x_3 = 3$, $2x_1 + x_2 + 3x_3 = 6$, you find $a_{11} = 0$. What do you do?',
          options: [
            { text: 'Interchange equations (1) and (2), then eliminate as usual', correct: true, why: 'Swapping equations doesn’t change the solution. Here you get $x_1 = \\frac13$, $x_2 = \\frac43$, $x_3 = \\frac43$.' },
            { text: 'Conclude there is no solution', why: 'Only if every entry below in that column is also 0 (then $\\det A = 0$).' },
            { text: 'Divide by a tiny number like $0.0001$', why: 'That changes the problem and amplifies rounding errors.' },
            { text: 'Set $x_1 = 0$', why: 'There’s no reason $x_1$ should be 0.' },
          ],
          explain: 'Best choice: swap in the equation with the **largest** entry in that column (partial pivoting), to keep rounding errors small.',
        },
        {
          type: 'bridge',
          title: 'Algorithm: set.',
          recap: [
            '$b_{1j} = \\frac{a_{1j}}{a_{11}}$, $a^{(1)}_{ij} = a_{ij} - a_{i1}b_{1j}$; repeat on the smaller system.',
            'Zero pivot: interchange rows. Then back-substitute.',
          ],
          why: 'Now a full 4 × 4 worked example.',
        },
      ],
    },
    {
      name: 'Worked example',
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example · Stage 1',
          title: 'A 4 × 4 system',
          body: '$$\\begin{aligned} 2.0x_1 + 1.0x_2 - 0.1x_3 + 1.0x_4 &= 2.7 \\\\ 0.4x_1 + 0.5x_2 + 4.0x_3 - 8.5x_4 &= 21.9 \\\\ 0.3x_1 - 1.0x_2 + 1.0x_3 + 5.2x_4 &= -3.9 \\\\ 1.0x_1 + 0.2x_2 + 2.5x_3 - 1.0x_4 &= 9.9 \\end{aligned}$$\n\nDivide (1) by $a_{11} = 2.0$:\n$$x_1 + 0.5x_2 - 0.05x_3 + 0.5x_4 = 1.35.$$\nSo $b_{12} = 0.5$, $b_{13} = -0.05$, $b_{14} = 0.5$, $b_{15} = 1.35$.',
        },
        {
          type: 'choice',
          eyebrow: 'Stage 1 · Watch the sign',
          prompt: 'Find $a^{(1)}_{24} = a_{24} - a_{21}b_{14}$, with $a_{24} = -8.5$, $a_{21} = 0.4$, $b_{14} = 0.5$.',
          options: [
            { text: '$-8.7$', correct: true, why: '$-8.5 - 0.4(0.5) = -8.5 - 0.2 = -8.7$.' },
            { text: '$-8.3$', why: 'Subtracting $0.2$ from $-8.5$ makes it **more** negative.' },
            { text: '$8.7$', why: 'The sign of $-8.5$ is kept.' },
            { text: '$-8.5$', why: 'You must subtract $a_{21}b_{14} = 0.2$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Stage 1 · All new coefficients',
          title: 'Remove $x_1$ from equations (2)–(4)',
          body: '$$\\begin{aligned} 0.3x_2 + 4.02x_3 - 8.7x_4 &= 21.36 \\\\ -1.15x_2 + 1.015x_3 + 5.05x_4 &= -4.305 \\\\ -0.3x_2 + 2.55x_3 - 1.5x_4 &= 8.55 \\end{aligned}$$\n\nFor example $a^{(1)}_{32} = -1.0 - 0.3(0.5) = -1.15$.',
        },
        {
          type: 'story',
          eyebrow: 'Stages 2 and 3',
          title: 'Keep eliminating',
          body: '**Stage 2.** Divide by $0.3$: $x_2 + 13.4x_3 - 29x_4 = 71.2$. Eliminate $x_2$:\n$$16.425x_3 - 28.3x_4 = 77.5,\\qquad 6.57x_3 - 10.2x_4 = 29.91.$$\n\n**Stage 3.** Divide by $16.425$: $x_3 - 1.7230x_4 = 4.7230$. Eliminate $x_3$:\n$$a^{(3)}_{44} = -10.2 - 6.57(-1.7230) = 1.12,\\quad a^{(3)}_{45} = 29.91 - 6.57(4.7230) = -1.12.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Back substitution',
          prompt: 'The reduced system ends with $1.12x_4 = -1.12$, $x_3 - 1.7230x_4 = 4.7230$, $x_2 + 13.4x_3 - 29x_4 = 71.2$, $x_1 + 0.5x_2 - 0.05x_3 + 0.5x_4 = 1.35$. Solve.',
          options: [
            { text: '$x_1 = 1,\\ x_2 = 2,\\ x_3 = 3,\\ x_4 = -1$', correct: true, why: '$x_4 = -1$; $x_3 = 4.7230 - 1.7230 = 3$; $x_2 = 71.2 - 40.2 - 29 = 2$; $x_1 = 1.35 - 1 + 0.15 + 0.5 = 1$. Check eq. (4): $1 + 0.4 + 7.5 + 1 = 9.9$ ✓.' },
            { text: '$x_1 = 1,\\ x_2 = 2,\\ x_3 = 3,\\ x_4 = 1$', why: '$x_4 = \\frac{-1.12}{1.12} = -1$.' },
            { text: '$x_1 = -1,\\ x_2 = 3,\\ x_3 = 2,\\ x_4 = 1$', why: 'Work from the bottom: $x_4$ first.' },
            { text: '$x_1 = 1.35,\\ x_2 = 71.2,\\ x_3 = 4.723,\\ x_4 = -1.12$', why: 'Those are right-hand sides, not solutions.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Quick tips',
          prompt: 'Which habits make the Gaussian method safer?',
          options: [
            { text: 'Work in an augmented-matrix table with the right-hand side as an extra column.', correct: true, why: '**Every formula acts on whole rows**, so nothing is forgotten.' },
            { text: 'Write each intermediate value with its label, e.g. $a^{(1)}_{24} = -8.7$.', correct: true, why: '**Most marks are for the working.**' },
            { text: 'Check the answer in the last original equation.', correct: true, why: '**30 seconds** catches sign slips.' },
            { text: 'Switch to the matrix inverse method if the numbers get messy.', why: '**Use the named method**, or lose the method marks.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can eliminate.',
          body: 'Next: iterative methods. Simple iteration and Gauss-Seidel.',
        },
      ],
    },
  ],
};
