// MTH 209 · Systems of linear equations · Lesson 1: general form and the matrix inverse method.

export default {
  id: 'matrix-inverse',
  title: 'The matrix inverse method',
  covers: 'General form, consistency, AX = B, X = A⁻¹B with A⁻¹ = adj A / det A, a worked example',
  minutes: 18,
  sections: [
    {
      name: 'Setting up',
      terms: [
        ['System of linear equations', '$\\sum_{j=1}^n a_{ij}x_j = b_i$, $i = 1, \\ldots, n$: $a_{ij}$ are the coefficients, $x_j$ the unknowns, $b_i$ the constants; $n \\times n$ is the order.'],
        ['Direct method', 'Gives the exact answer after a fixed number of steps (matrix inverse, LU, Gaussian).'],
        ['Iterative method', 'Produces approximations that converge to the answer (simple iteration, Gauss-Seidel).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of linear equations · Lesson 1',
          title: 'From one equation to many',
          body: '$2x + 4 = 0$ is solved in one step. But a system like\n$$2x + 4y = 0,\\qquad 2x + 3y = 4$$\nneeds more work, and real problems (structures, circuits, mixtures) give systems with dozens of unknowns.\n\nIn general:\n$$\\begin{aligned} a_{11}x_1 + a_{12}x_2 + \\cdots + a_{1n}x_n &= b_1 \\\\ &\\ \\ \\vdots \\\\ a_{n1}x_1 + a_{n2}x_2 + \\cdots + a_{nn}x_n &= b_n \\end{aligned}$$',
          cta: 'Name the parts',
        },
        {
          type: 'sort',
          eyebrow: 'Five methods',
          prompt: 'Which methods are direct, and which are iterative?',
          buckets: [
            { id: 'd', label: 'Direct', hint: 'exact in a fixed number of steps' },
            { id: 'i', label: 'Iterative', hint: 'converges step by step' },
          ],
          items: [
            { text: 'Matrix inverse', bucket: 'd', why: '**$X = A^{-1}B$** in one computation.' },
            { text: 'LU factorisation', bucket: 'd', why: '**Factorise, then two substitutions.**' },
            { text: 'Gaussian elimination', bucket: 'd', why: '**Eliminate, then back-substitute.**' },
            { text: 'Simple iteration (SIM)', bucket: 'i', why: '**$x^{(k+1)} = Cx^{(k)} + F$**, repeated.' },
            { text: 'Gauss-Seidel (GSM)', bucket: 'i', why: '**Like SIM, using new values at once.**' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam notice',
          title: 'Use the method you are told to use',
          body: 'If a question says “solve by the Gaussian method” and you use the matrix inverse method, you **lose the method marks** even with the right answer.\n\nA system is ==consistent== when it has **at least one solution**, and inconsistent when it has none. Fewer equations than unknowns does not make a system inconsistent: $2x + 4y + 3z = 2$, $4x + y + 6z = 3$ has 3 unknowns and only 2 equations, yet $z = 0$, $x = \\frac57$, $y = \\frac17$ solves it (it has infinitely many solutions).',
        },
        {
          type: 'bridge',
          title: 'Set-up: done.',
          recap: [
            'Direct: matrix inverse, LU, Gaussian. Iterative: SIM, Gauss-Seidel.',
            'Always use the named method.',
          ],
          why: 'First method: write the system as $AX = B$ and invert $A$.',
        },
      ],
    },
    {
      name: 'The method',
      terms: [
        ['Matrix inverse method', '$AX = B \\implies X = A^{-1}B$, with $A^{-1} = \\dfrac{1}{\\det A}\\operatorname{adj}A$, $\\det A \\neq 0$.'],
        ['Minor and cofactor', 'Minor $M_{ij}$: determinant left after deleting row $i$ and column $j$. Cofactor $C_{ij} = (-1)^{i+j}M_{ij}$.'],
        ['Adjoint', '$\\operatorname{adj}A$: the transpose of the matrix of cofactors.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: '$X = A^{-1}B$',
          body: 'Write the system as $AX = B$: $A$ is the coefficient matrix, $X$ the column of unknowns, $B$ the column of constants.\n\n**Theorem.** If there is a matrix $C$ with $CA = I$, then $C = A^{-1}$ and $X = A^{-1}B$.\n\n**Proof.** Premultiply $AX = B$ by $A^{-1}$:\n$$A^{-1}AX = A^{-1}B \\implies IX = A^{-1}B \\implies X = A^{-1}B.\\ \\blacksquare$$',
        },
        {
          type: 'order',
          eyebrow: 'The procedure',
          prompt: 'Put the steps of the matrix inverse method in order.',
          items: [
            'Find $\\det A$. If $\\det A = 0$, stop: $A^{-1}$ does not exist.',
            'Find $A^T$, the transpose of $A$.',
            'Find the cofactors of $A^T$, using the sign pattern $+ - +$. This is $\\operatorname{adj}A$.',
            'Write $A^{-1} = \\frac{1}{\\det A}\\operatorname{adj}A$.',
            'Compute $X = A^{-1}B$.',
          ],
          explain: 'Equivalently, find the cofactors of $A$ and then transpose. Both give $\\operatorname{adj}A$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example · Step 1',
          title: 'Solve $2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$',
          body: '$$A = \\begin{pmatrix} 2 & 3 & 4 \\\\ 1 & -2 & 1 \\\\ 2 & -1 & 3 \\end{pmatrix},\\quad B = \\begin{pmatrix} 0 \\\\ 3 \\\\ 1 \\end{pmatrix}.$$\n\nExpand along row 1:\n$$\\det A = 2\\begin{vmatrix} -2 & 1 \\\\ -1 & 3 \\end{vmatrix} - 3\\begin{vmatrix} 1 & 1 \\\\ 2 & 3 \\end{vmatrix} + 4\\begin{vmatrix} 1 & -2 \\\\ 2 & -1 \\end{vmatrix}$$\n$$= 2(-6 + 1) - 3(3 - 2) + 4(-1 + 4) = -10 - 3 + 12 = -1.$$\n\n$\\det A \\neq 0$, so the method works.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example · Steps 2–4',
          title: 'Adjoint and inverse',
          body: 'The cofactors (with signs), transposed, give\n$$\\operatorname{adj}A = \\begin{pmatrix} -5 & -13 & 11 \\\\ -1 & -2 & 2 \\\\ 3 & 8 & -7 \\end{pmatrix}.$$\n\nFor example, the $(1,1)$ entry is $+\\begin{vmatrix} -2 & 1 \\\\ -1 & 3 \\end{vmatrix} = -5$, and the $(1,2)$ entry is $C_{21} = -\\begin{vmatrix} 3 & 4 \\\\ -1 & 3 \\end{vmatrix} = -13$.\n\nSince $\\det A = -1$:\n$$A^{-1} = -\\operatorname{adj}A = \\begin{pmatrix} 5 & 13 & -11 \\\\ 1 & 2 & -2 \\\\ -3 & -8 & 7 \\end{pmatrix}.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Worked example · Step 5',
          prompt: 'Compute $X = A^{-1}B$ with $B = (0, 3, 1)^T$.',
          options: [
            { text: '$x_1 = 28,\\ x_2 = 4,\\ x_3 = -17$', correct: true, why: '$x_1 = 0 + 39 - 11 = 28$, $x_2 = 0 + 6 - 2 = 4$, $x_3 = 0 - 24 + 7 = -17$. Check eq. 2: $28 - 8 - 17 = 3$ ✓.' },
            { text: '$x_1 = -28,\\ x_2 = -4,\\ x_3 = 17$', why: 'That uses $\\operatorname{adj}A$ without dividing by $\\det A = -1$.' },
            { text: '$x_1 = 39,\\ x_2 = 6,\\ x_3 = -24$', why: 'Include all three products in each row: e.g. $x_1 = 5(0) + 13(3) - 11(1)$.' },
            { text: '$x_1 = 1,\\ x_2 = 2,\\ x_3 = -1$', why: 'That’s the answer to a different system.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Example: solved.',
          recap: [
            '$\\det A = -1$, $A^{-1} = -\\operatorname{adj}A$.',
            '$X = (28, 4, -17)^T$, checked in an original equation.',
          ],
          why: 'Two more examples, including a 2 × 2 shortcut.',
        },
      ],
    },
    {
      name: 'More examples',
      terms: [
        ['2 × 2 inverse', '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'The 2 × 2 system',
          prompt: 'Solve $2x + 4y = 0$, $2x + 3y = 4$ by the matrix inverse method.',
          options: [
            { text: '$x = 8$, $y = -4$', correct: true, why: '$\\det A = 6 - 8 = -2$. $A^{-1} = \\frac{1}{-2}\\begin{pmatrix} 3 & -4 \\\\ -2 & 2 \\end{pmatrix}$, so $X = \\frac{1}{-2}\\begin{pmatrix} -16 \\\\ 8 \\end{pmatrix} = \\begin{pmatrix} 8 \\\\ -4 \\end{pmatrix}$.' },
            { text: '$x = -8$, $y = 4$', why: 'Check the sign of $\\frac{1}{\\det A} = -\\frac12$.' },
            { text: '$x = 4$, $y = -2$', why: 'Then $2x + 3y = 2$, not 4.' },
            { text: 'No solution', why: '$\\det A = -2 \\neq 0$, so there is a unique solution.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Application',
          title: 'Mixing concrete',
          body: 'Three batches contain cement, granite and sand in the proportions $\\left(\\frac15, \\frac35, \\frac15\\right)$, $\\left(\\frac1{10}, \\frac5{10}, \\frac4{10}\\right)$, $\\left(\\frac25, \\frac35, 0\\right)$. How much of each batch makes 10 m³ with 2.6 m³ cement, 5.8 m³ granite and 1.6 m³ sand?\n\nOne equation per ingredient, multiplied by 10:\n$$\\begin{pmatrix} 2 & 1 & 4 \\\\ 6 & 5 & 6 \\\\ 2 & 4 & 0 \\end{pmatrix}X = \\begin{pmatrix} 26 \\\\ 58 \\\\ 16 \\end{pmatrix},\\quad \\det A = 20.$$\n$$X = \\frac{1}{20}\\begin{pmatrix} -24 & 16 & -14 \\\\ 12 & -8 & 12 \\\\ 14 & -6 & 4 \\end{pmatrix}\\begin{pmatrix} 26 \\\\ 58 \\\\ 16 \\end{pmatrix} = \\frac{1}{20}\\begin{pmatrix} 80 \\\\ 40 \\\\ 80 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 2 \\\\ 4 \\end{pmatrix}.$$\n\nUse 4, 2 and 4 m³. Check: $4 + 2 + 4 = 10$ ✓',
        },
        {
          type: 'multi',
          eyebrow: 'Quick tips',
          prompt: 'Which of these are good habits for the matrix inverse method?',
          options: [
            { text: 'Compute $\\det A$ first, and stop if it is 0.', correct: true, why: '**No inverse exists** when $\\det A = 0$.' },
            { text: 'Expand the determinant along the row or column with the most zeros.', correct: true, why: '**Fewer terms**, fewer mistakes.' },
            { text: 'Keep $\\frac{1}{\\det A}$ outside the matrix until the final multiplication.', correct: true, why: '**Avoids fractions** in every entry.' },
            { text: 'Ignore the $+ - +$ sign pattern when $\\det A$ is positive.', why: '**The sign pattern always applies**; most lost marks come from forgetting it.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can invert and solve.',
          body: 'Next: LU factorisation, which splits $A$ into two triangular matrices.',
        },
      ],
    },
  ],
};
