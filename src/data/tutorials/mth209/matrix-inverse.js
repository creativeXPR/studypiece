// MTH 209 · Idea B, lesson 6: systems of linear equations, consistency, and the matrix inverse method.
// Part 1 uses a 2 × 2 system; Part 2 does the 3 × 3 class example and the 2021 past-paper system.

export default {
  id: 'matrix-inverse',
  title: 'Consistency and the matrix inverse',
  covers: 'AX = B, consistent and inconsistent systems, determinants, cofactors, adjoint and X = A⁻¹B',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['System of linear equations', '$a_{i1}x_1 + \\cdots + a_{in}x_n = b_i$ for $i = 1, \\ldots, n$; written $AX = B$. The $a_{ij}$ are coefficients, the $x_i$ unknowns, the $b_i$ constants, and $n \\times n$ the order.'],
        ['Consistent system', 'A system with at least one solution. Inconsistent: no solution at all.'],
        ['Matrix inverse method', 'If $\\det A \\ne 0$, then $X = A^{-1}B$ with $A^{-1} = \\dfrac{\\operatorname{adj} A}{\\det A}$.'],
      ],
      steps: [
        'Write the system as $AX = B$, showing $A$, $X$ and $B$.',
        'Find $\\det A$. If it is $0$, stop: $A^{-1}$ does not exist (no unique solution).',
        'Find the cofactor $C_{ij} = (-1)^{i+j}M_{ij}$ of every entry (sign pattern $+ - +$).',
        '$\\operatorname{adj} A$ is the transpose of the cofactor matrix. Then $A^{-1} = \\tfrac{1}{\\det A}\\operatorname{adj} A$.',
        '$X = A^{-1}B$. Check the answer in one original equation.',
      ],
      examples: [
        {
          title: '$2x + 4y = 0$, $2x + 3y = 4$',
          question: 'Solve by the matrix inverse method.',
          steps: ['$A = \\begin{pmatrix} 2 & 4 \\\\ 2 & 3 \\end{pmatrix}$, $B = \\begin{pmatrix} 0 \\\\ 4 \\end{pmatrix}$.', '$\\det A = 6 - 8 = -2$.', '$A^{-1} = \\tfrac{1}{-2}\\begin{pmatrix} 3 & -4 \\\\ -2 & 2 \\end{pmatrix}$ (swap the diagonal, negate the rest).', '$X = -\\tfrac12\\begin{pmatrix} -16 \\\\ 8 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -4 \\end{pmatrix}$.'],
          answer: '$x = 8$, $y = -4$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 6',
          title: 'Many equations at once',
          body: 'So far: one equation, one unknown. Real problems (mixing concrete from three batches, currents in a circuit) give **several equations in several unknowns**.\n\nFive methods solve them: matrix inverse, LU, Gaussian elimination (all **direct**), then simple iteration and Gauss-Seidel (**iterative**, the iterate-until-it-settles engine again). First, the inverse.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Divide by a matrix',
          body: 'One equation $ax = b$ is solved by $x = \\tfrac{b}{a}$, as long as $a \\ne 0$.\n\nA system $AX = B$ works the same way: multiply both sides by $A^{-1}$, the matrix with $A^{-1}A = I$, to get $X = A^{-1}B$. And “$a \\ne 0$” becomes **$\\det A \\ne 0$**.\n\nIf $\\det A = 0$ there is no unique answer: either no solution (**inconsistent**) or infinitely many.',
          asides: [{ label: 'Exam tip', text: '**Consistent** = at least one solution; **inconsistent** = none. Counting equations against unknowns does not decide it.' }],
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'The inverse method',
          body: '1. Write $AX = B$.\n2. $\\det A$ (stop if $0$).\n3. Every cofactor $C_{ij} = (-1)^{i+j}M_{ij}$ (signs $+ - +$, $- + -$, $+ - +$).\n4. $\\operatorname{adj} A$ = transpose of the cofactors; $A^{-1} = \\tfrac{\\operatorname{adj} A}{\\det A}$.\n5. $X = A^{-1}B$, then check in an equation.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$2x + 4y = 0$, $2x + 3y = 4$',
          body: '**Step 1.** $A = \\begin{pmatrix} 2 & 4 \\\\ 2 & 3 \\end{pmatrix}$, $B = \\begin{pmatrix} 0 \\\\ 4 \\end{pmatrix}$.\n\n**Step 2.** $\\det A = 2(3) - 4(2) = -2$.\n\n**Steps 3–4.** For $2 \\times 2$: swap the diagonal, negate the others: $A^{-1} = -\\tfrac12\\begin{pmatrix} 3 & -4 \\\\ -2 & 2 \\end{pmatrix}$.\n\n**Step 5.** $X = -\\tfrac12\\begin{pmatrix} -16 \\\\ 8 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -4 \\end{pmatrix}$. Check: $16 - 16 = 0$. ✓',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Consistent or not?',
          graph: {
            steps: [
              { ask: '$\\det\\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 1 & 0 & 1 \\end{pmatrix}$?', answer: 0, tol: 0.001, hint: 'Row 2 is twice row 1.' },
              { ask: 'With right-hand side $(4, 1, 2)$, the system is…', options: ['Inconsistent (no solution)', 'Consistent with one solution'], answer: 0, hint: 'Row 2 says $2(\\ldots) = 1$, but twice row 1 says it equals $8$.' },
              { ask: 'Can the inverse method be used?', options: ['No, $A^{-1}$ does not exist', 'Yes'], answer: 0, hint: '$\\det A = 0$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Write** the general $n \\times n$ system and name $a_{ij}$, $x_i$, $b_i$, the order.\n• **Define** consistent; decide whether a system is consistent.\n• **Express** a system as $AX = B$ and **solve** by the inverse method, showing $\\det A$, cofactors, $\\operatorname{adj} A$ and $A^{-1}$.\n• **Explain** why the method fails when $\\det A = 0$.\n• **Prove** $X = A^{-1}B$ from $AX = B$.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Expand $\\det A$ along the row or column with the most zeros.',
        'Write the full cofactor matrix before transposing; most lost marks come from the sign pattern.',
        'Keep $\\tfrac{1}{\\det A}$ outside the matrix until the final multiplication, to avoid fractions.',
        'If $\\det A = -1$, $A^{-1}$ is just $\\operatorname{adj} A$ with every sign flipped.',
        'Mistake: writing $A^{-1} = \\operatorname{adj} A$ and forgetting to divide by $\\det A$.',
      ],
      examples: [
        {
          title: '$2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$',
          question: 'Solve by the matrix inverse method.',
          steps: ['$\\det A = 2(-6 + 1) - 3(3 - 2) + 4(-1 + 4) = -10 - 3 + 12 = -1$.', '$\\operatorname{adj} A = \\begin{pmatrix} -5 & -13 & 11 \\\\ -1 & -2 & 2 \\\\ 3 & 8 & -7 \\end{pmatrix}$.', '$A^{-1} = -\\operatorname{adj} A = \\begin{pmatrix} 5 & 13 & -11 \\\\ 1 & 2 & -2 \\\\ -3 & -8 & 7 \\end{pmatrix}$.', '$X = A^{-1}\\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 39 - 11 \\\\ 6 - 2 \\\\ -24 + 7 \\end{pmatrix}$.'],
          answer: '$x_1 = 28$, $x_2 = 4$, $x_3 = -17$.',
        },
        {
          title: '$2a + 3b + c = 9$, $a + 2b + 3c = 6$, $3a + b + 2c = 8$',
          question: 'Express as $AX = B$ and solve for $X$.',
          steps: ['$\\det A = 2(4 - 3) - 3(2 - 9) + 1(1 - 6) = 18$.', '$A^{-1} = \\tfrac{1}{18}\\begin{pmatrix} 1 & -5 & 7 \\\\ 7 & 1 & -5 \\\\ -5 & 7 & 1 \\end{pmatrix}$.', '$X = \\tfrac{1}{18}\\begin{pmatrix} 9 - 30 + 56 \\\\ 63 + 6 - 40 \\\\ -45 + 42 + 8 \\end{pmatrix} = \\tfrac{1}{18}\\begin{pmatrix} 35 \\\\ 29 \\\\ 5 \\end{pmatrix}$.'],
          answer: '$a = \\tfrac{35}{18}$, $b = \\tfrac{29}{18}$, $c = \\tfrac{5}{18}$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'A $3 \\times 3$ by the inverse',
          body: '“Solve $2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$ using the matrix inverse method.”\n\n**What the examiner wants:** $AX = B$ written out; $\\det A$ with the expansion shown; the cofactor matrix with signs; $\\operatorname{adj} A$; $A^{-1}$; the product $A^{-1}B$; a check. The full solution is in **Examples**.',
          asides: [{ label: 'Exam tip', text: 'When told “using the matrix inverse method”, use only that method. Gaussian elimination with the right answer earns no method marks.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'The class example',
          graph: {
            steps: [
              { ask: '$\\det A = 2(-6 + 1) - 3(3 - 2) + 4(-1 + 4) = $?', answer: -1, tol: 0.001, hint: '$-10 - 3 + 12$.' },
              { ask: 'Cofactor $C_{11} = +\\det\\begin{pmatrix} -2 & 1 \\\\ -1 & 3 \\end{pmatrix}$?', answer: -5, tol: 0.001, hint: '$-6 + 1$.' },
              { ask: 'Since $\\det A = -1$, $A^{-1} = -\\operatorname{adj} A$. Its first row is $(5, 13, -11)$. So $x_1 = 5(0) + 13(3) - 11(1) = $?', answer: 28, tol: 0.001, hint: '$39 - 11$.' },
              { ask: '$x_3 = -3(0) - 8(3) + 7(1) = $?', answer: -17, tol: 0.001, hint: '$-24 + 7$.' },
            ],
            after: '$X = (28, 4, -17)$. Check equation 1: $56 + 12 - 68 = 0$. ✓',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'For the class example a student gets $X = (-28, -4, 17)$. What went wrong?',
          options: [
            { text: 'They used $A^{-1} = \\operatorname{adj} A$ and forgot to divide by $\\det A = -1$', correct: true, why: 'Every sign is flipped, which is exactly a missing factor of $-1$.' },
            { text: 'A wrong cofactor', why: 'One wrong cofactor would spoil some entries, not flip them all.' },
            { text: 'The system is inconsistent', why: '$\\det A = -1 \\ne 0$, so there is a unique solution.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$2a + 3b + c = 9$, $a + 2b + 3c = 6$, $3a + b + 2c = 8$',
          graph: {
            steps: [
              { ask: '$\\det A = 2(4 - 3) - 3(2 - 9) + 1(1 - 6)$?', answer: 18, tol: 0.001, hint: '$2 + 21 - 5$.' },
              { ask: 'First row of $\\operatorname{adj} A$ is $(1, -5, 7)$. So $a = \\tfrac{1}{18}(9 - 30 + 56)$, to 4 dp?', answer: 1.9444, tol: 0.0002, hint: '$\\tfrac{35}{18}$.' },
              { ask: '$c = \\tfrac{1}{18}(-5 \\cdot 9 + 7 \\cdot 6 + 1 \\cdot 8)$, to 4 dp?', answer: 0.2778, tol: 0.0002, hint: '$\\tfrac{5}{18}$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can solve a system by the inverse.',
          body: '**Summary:** $AX = B$; consistent means at least one solution; $\\det A \\ne 0$ gives the unique $X = \\tfrac{\\operatorname{adj} A}{\\det A}B$; watch the sign pattern and the division by $\\det A$.\n\n**Next:** **LU factorisation** solves the same system by splitting $A$ into two triangles, which is quicker, especially when $B$ changes.',
        },
      ],
    },
  ],
};
