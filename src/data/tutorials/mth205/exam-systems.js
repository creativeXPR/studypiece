// MTH 205 · Systems · Exam practice: full exam-style questions on homogeneous and
// non-homogeneous systems, parameter systems, the inverse method and Cramer's rule, plus the
// definitions and proofs that are asked for.

export default {
  id: 'exam-systems',
  title: 'Exam practice: systems',
  covers: 'Exam-style questions: trivial and non-trivial solutions, basis of a solution space, consistency, parameter systems, the inverse method with cofactors, Cramer’s rule, definitions and short proofs',
  minutes: 22,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Homogeneous', 'Reduce $A$; rank $r$; $n - r$ free variables; one basis vector per free variable.'],
        ['Non-homogeneous', 'Reduce $(A|B)$; compare ranks; solve upwards.'],
        ['$3 \\times 3$ inverse', '$A^{-1} = \\frac{1}{|A|}\\operatorname{adj}A$, where $\\operatorname{adj}A$ is the transpose of the cofactor matrix: row $i$ of $A^{-1}$ uses the cofactors $C_{1i}, C_{2i}, C_{3i}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'Write first, check after',
          body: 'Each question below is in exam form. Work it fully on paper (method, reduction, conclusion in words), then check your numbers step by step. A wrong step shows a hint; after two misses you can ask to see it.\n\nPicture every question as a motion: **what gets crushed** (homogeneous) or **can the target be reached** (non-homogeneous).',
          cta: 'Start',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Solve $x + 3y - 3z = 0$, $2x - 3y + z = 0$, $3x - 2y + 2z = 0$.',
          graph: {
            steps: [
              { ask: '$|A| = $', answer: -22, tol: 0, hint: '$1(-6 + 2) - 3(4 - 3) - 3(-4 + 9)$.' },
              { ask: 'Rank of $A$', answer: 3, tol: 0, hint: '$|A| \\neq 0$, so all three rows are independent.' },
              { ask: 'Dimension of the solution space', answer: 0, tol: 0, hint: '$n - r = 3 - 3$.' },
              { ask: 'Conclusion', options: ['Only the trivial solution $x = y = z = 0$', 'A line of solutions', 'No solution'], answer: 0, hint: 'Nothing is crushed except $0$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Find a basis for the solution space of $x + 2y - z = 0$, $2x + 5y + z = 0$, $x + 3y + 2z = 0$.',
          graph: {
            steps: [
              { ask: '$|A| = $', answer: 0, tol: 0, hint: '$1(10 - 3) - 2(4 - 1) - 1(6 - 5)$.' },
              { ask: 'Rank of $A$', answer: 2, tol: 0, hint: '$R_2 - 2R_1$ and $R_3 - R_1$ both give $(0, 1, 3)$.' },
              { ask: 'Take $z = 1$. Then $y = $', answer: -3, tol: 0, hint: 'Row $(0, 1, 3)$: $y + 3z = 0$.' },
              { ask: 'and $x = $', answer: 7, tol: 0, hint: '$x = -2y + z$.', done: 'Basis: $\\{(7, -3, 1)\\}$, dimension $1$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'For $x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$, find the values of $\\lambda, \\mu$ for which the system has (i) a unique solution, (ii) no solution, (iii) infinitely many solutions.',
          graph: {
            steps: [
              { ask: '$R_2 - R_1$ and $R_3 - R_1$, then $R_3 - R_2$: the last row becomes $(0, 0, \\lambda - a \\mid \\mu - 10)$ with $a = $', answer: 3, tol: 0, hint: '$R_3 - R_1 = (0, 1, \\lambda - 1 \\mid \\mu - 6)$; subtract $(0, 1, 2 \\mid 4)$.' },
              { ask: '(i) Unique solution when', options: ['$\\lambda \\neq 3$ (any $\\mu$)', '$\\lambda = 3$, $\\mu = 10$', '$\\mu \\neq 10$'], answer: 0, hint: 'Three leading entries need $\\lambda - 3 \\neq 0$.' },
              { ask: '(ii) No solution when', options: ['$\\lambda = 3$, $\\mu \\neq 10$', '$\\lambda = 3$, $\\mu = 10$', '$\\lambda \\neq 3$'], answer: 0, hint: 'The last row reads $0 = \\mu - 10 \\neq 0$.' },
              { ask: '(iii) Infinitely many when', options: ['$\\lambda = 3$, $\\mu = 10$', '$\\lambda \\neq 3$', '$\\mu = 0$'], answer: 0, hint: 'The last row becomes $0 = 0$: rank $2 < 3$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Solve $3x + 2y = 7$, $x - y = -1$ by Cramer’s rule.',
          graph: {
            steps: [
              { ask: '$D = $', answer: -5, tol: 0, hint: '$3(-1) - 2(1)$.' },
              { ask: '$D_x = \\begin{vmatrix} 7 & 2 \\\\ -1 & -1 \\end{vmatrix} = $', answer: -5, tol: 0, hint: '$-7 + 2$.' },
              { ask: '$D_y = \\begin{vmatrix} 3 & 7 \\\\ 1 & -1 \\end{vmatrix} = $', answer: -10, tol: 0, hint: '$-3 - 7$.' },
              { ask: '$x = $', answer: 1, tol: 0, hint: '$D_x / D$.' },
              { ask: '$y = $', answer: 2, tol: 0, hint: '$D_y / D$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 5',
          title: 'Solve $2x - y + 3z = 2$, $x + 3y - z = 11$, $2x - 2y + 5z = 3$ by the inverse method (find $x$).',
          body: '$x$ is the first row of $A^{-1}$ times $B$, and the first row of $A^{-1}$ is $\\frac{1}{|A|}(C_{11}, C_{21}, C_{31})$.',
          graph: {
            steps: [
              { ask: '$|A| = $', answer: 9, tol: 0, hint: '$2(13) + 1(7) + 3(-8)$.' },
              { ask: '$C_{11} = $', answer: 13, tol: 0, hint: '$+\\begin{vmatrix} 3 & -1 \\\\ -2 & 5 \\end{vmatrix}$.' },
              { ask: '$C_{21} = $', answer: -1, tol: 0, hint: '$-\\begin{vmatrix} -1 & 3 \\\\ -2 & 5 \\end{vmatrix} = -(-5 + 6)$.' },
              { ask: '$C_{31} = $', answer: -8, tol: 0, hint: '$+\\begin{vmatrix} -1 & 3 \\\\ 3 & -1 \\end{vmatrix} = 1 - 9$.' },
              { ask: '$x = \\frac{1}{9}(13 \\cdot 2 + (-1) \\cdot 11 + (-8) \\cdot 3) = $', answer: -1, tol: 0, hint: '$\\frac{26 - 11 - 24}{9}$.', done: 'Same as Cramer: $x = -1$, $y = 5$, $z = 3$' },
            ],
          },
        },
      ],
    },
    {
      name: 'Definitions and proofs',
      terms: [
        ['Subspace proof', 'If $AX_1 = 0$ and $AX_2 = 0$ then $A(aX_1 + bX_2) = aAX_1 + bAX_2 = 0$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'A system of linear equations over $\\mathbb F$ is ==consistent== if',
          options: [
            { text: 'it has at least one solution in $\\mathbb F$', correct: true, why: 'Equivalently $\\operatorname{rank}A = \\operatorname{rank}(A|B)$.' },
            { text: 'it has exactly one solution', why: 'Infinitely many solutions is consistent too.' },
            { text: 'its coefficient matrix is non-singular', why: 'That guarantees a unique solution, but singular systems can still be consistent.' },
            { text: 'all its constants are zero', why: 'That is the definition of **homogeneous**.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'The rank of a matrix $A$ is',
          options: [
            { text: 'the maximum number of linearly independent rows (equivalently columns)', correct: true, why: 'Row rank = column rank: the dimension of what survives the motion.' },
            { text: 'the number of rows of $A$', why: 'Dependent rows don’t count.' },
            { text: 'the number of nonzero entries', why: 'Count independent rows, e.g. leading entries in echelon form.' },
            { text: 'the determinant of $A$', why: 'The determinant is a number; the rank counts dimensions.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Show that the solution set $W$ of $AX = 0$ is a subspace of $\\mathbb F^n$.',
          items: [
            '$A0 = 0$, so $0 \\in W$ and $W$ is non-empty.',
            'Let $X_1, X_2 \\in W$ and $a, b \\in \\mathbb F$, so $AX_1 = AX_2 = 0$.',
            'Then $A(aX_1 + bX_2) = aAX_1 + bAX_2 = a0 + b0 = 0$.',
            'So $aX_1 + bX_2 \\in W$: $W$ is closed under linear combinations, hence a subspace. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Fill the gap',
          prompt: 'In the proof that $X = A^{-1}B$ is the unique solution, after "suppose $AX_1 = B$ and $AX_2 = B$", the key step is',
          options: [
            { text: '$AX_1 = AX_2$, then premultiply by $A^{-1}$ to get $X_1 = X_2$', correct: true, why: 'An invertible motion never sends two arrows to the same place.' },
            { text: '$X_1 + X_2 = 2B$', why: 'Nothing follows from adding them.' },
            { text: 'Postmultiply by $A^{-1}$: $X_1A^{-1} = X_2A^{-1}$', why: '$X_1$ is a column; the inverse must act from the **left**.' },
            { text: '$\\det X_1 = \\det X_2$', why: '$X_1, X_2$ are vectors, not square matrices.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'A $3 \\times 3$ system $AX = B$ has $|A| = 0$. Which could be true?',
          options: [
            { text: 'It has no solution', correct: true, why: 'If $B$ is outside the column space.' },
            { text: 'It has infinitely many solutions', correct: true, why: 'If $B$ is inside the column space.' },
            { text: 'It has exactly one solution', why: '**Impossible:** a squash crushes a line, so a solution would come with a whole line of them.' },
            { text: 'Cramer’s rule gives the solution', why: '**Impossible:** it divides by $D = 0$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Systems: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
