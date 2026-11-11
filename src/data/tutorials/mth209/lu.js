// MTH 209 · Idea B, lesson 7: LU (lower and upper triangular) factorisation. Part 1 factors a 2 × 2
// matrix; Part 2 does the 3 × 3 class example (where rounding 1/7 spoils the answer) and a reuse
// question.

export default {
  id: 'lu',
  title: 'LU factorisation',
  covers: 'Splitting A into L and U, forward and back substitution, and keeping fractions',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['LU factorisation', '$A = LU$, with $L$ lower triangular (1s on the diagonal) and $U$ upper triangular.'],
        ['Forward substitution', 'Solve $LY = B$ from the top down: $y_1$ first.'],
        ['Back substitution', 'Solve $UX = Y$ from the bottom up: $x_n$ first.'],
      ],
      steps: [
        'Write $L$ with 1s on its diagonal and unknowns $l_{ij}$ below; $U$ with unknowns $u_{ij}$ on and above the diagonal.',
        'Multiply $LU$ and match it to $A$ entry by entry. Row 1 of $U$ is row 1 of $A$; then $l_{i1} = \\tfrac{a_{i1}}{u_{11}}$; then alternate rows of $U$ and columns of $L$.',
        'Solve $LY = B$ by forward substitution.',
        'Solve $UX = Y$ by back substitution.',
        'Keep fractions exact until the end; check that $\\det A = u_{11}u_{22}u_{33}$.',
      ],
      examples: [
        {
          title: '$2x_1 + x_2 = 3$, $4x_1 + 5x_2 = 9$',
          question: 'Solve by LU factorisation.',
          steps: ['$u_{11} = 2$, $u_{12} = 1$; $l_{21} = \\tfrac42 = 2$; $u_{22} = 5 - 2(1) = 3$.', '$L = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$.', '$LY = B$: $y_1 = 3$, $2(3) + y_2 = 9 \\Rightarrow y_2 = 3$.', '$UX = Y$: $3x_2 = 3 \\Rightarrow x_2 = 1$; $2x_1 + 1 = 3 \\Rightarrow x_1 = 1$.'],
          answer: '$x_1 = 1$, $x_2 = 1$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 7',
          title: 'Triangles are easy',
          body: 'The inverse method needs a lot of cofactors. But one kind of system is easy: a **triangular** one. If the first equation has one unknown, the second two, and so on, you just solve them in order.\n\n**LU factorisation** splits $A$ into a lower triangle $L$ and an upper triangle $U$, turning one hard solve into two easy ones.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'One hard solve becomes two easy ones',
          body: 'If $A = LU$, then $AX = B$ is $L(UX) = B$. Call $UX = Y$:\n\n• First solve $LY = B$: lower triangle, so go **top-down** (forward substitution).\n• Then solve $UX = Y$: upper triangle, so go **bottom-up** (back substitution).\n\nTo find $L$ and $U$, multiply out $LU$ with unknown entries and match it to $A$.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'LU, step by step',
          body: '1. $L$: 1s on the diagonal, $l_{ij}$ below. $U$: $u_{ij}$ on and above.\n2. Match $LU = A$: row 1 of $U$ = row 1 of $A$; $l_{i1} = a_{i1}/u_{11}$; then alternate.\n3. $LY = B$ top-down.\n4. $UX = Y$ bottom-up.\n5. Keep fractions; check $\\det A = u_{11}u_{22}\\cdots$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$2x_1 + x_2 = 3$, $4x_1 + 5x_2 = 9$',
          body: '**Steps 1–2.** $u_{11} = 2$, $u_{12} = 1$; $l_{21} = \\tfrac42 = 2$; $u_{22} = 5 - 2 \\cdot 1 = 3$. So $L = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$.\n\n**Step 3.** $y_1 = 3$; $2(3) + y_2 = 9 \\Rightarrow y_2 = 3$.\n\n**Step 4.** $3x_2 = 3 \\Rightarrow x_2 = 1$; $2x_1 + 1 = 3 \\Rightarrow x_1 = 1$.\n\n**Step 5.** $\\det A = 2 \\times 3 = 6 = 10 - 4$. ✓',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Same $L$, $U$, new right-hand side',
          graph: {
            steps: [
              { ask: 'With $B = (4, 11)$: $y_1 = 4$. Then $y_2 = 11 - 2y_1$?', answer: 3, tol: 0.001, hint: 'Forward substitution.' },
              { ask: '$3x_2 = y_2$, so $x_2 = $?', answer: 1, tol: 0.001, hint: 'Back substitution starts at the bottom.' },
              { ask: '$2x_1 + x_2 = 4$, so $x_1 = $?', answer: 1.5, tol: 0.001, hint: '$\\tfrac{4 - 1}{2}$.' },
            ],
            after: 'No refactorising: once you have $L$ and $U$, any new $B$ is just two quick substitutions. That is LU’s big advantage.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Explain** the method: $A$ square, the forms of $L$ and $U$, how $AX = B$ becomes $LY = B$ and $UX = Y$.\n• **Factorise** a $3 \\times 3$ matrix (find all the $l_{ij}$ and $u_{ij}$), then **solve**.\n• **Reuse** $L$, $U$ for a new $B$, and say what advantage that shows.\n• **Explain** why a zero $u_{11}$ (or any zero $u_{ii}$) needs rows swapped first.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Order of work for $3 \\times 3$: $u_{11}, u_{12}, u_{13}$; then $l_{21}, l_{31}$; then $u_{22}, u_{23}$; then $l_{32}$; then $u_{33}$.',
        'Formulas: $u_{22} = a_{22} - l_{21}u_{12}$, $u_{23} = a_{23} - l_{21}u_{13}$, $l_{32} = \\tfrac{a_{32} - l_{31}u_{12}}{u_{22}}$, $u_{33} = a_{33} - l_{31}u_{13} - l_{32}u_{23}$.',
        'Keep fractions such as $\\tfrac87$ and $\\tfrac17$ exact. Rounding them early changes the answer.',
        'Check: $\\det A = u_{11}u_{22}u_{33}$, and substitute $X$ into one equation.',
        'Mistake: solving $UX = B$ directly and skipping $LY = B$.',
      ],
      examples: [
        {
          title: 'The class example by LU',
          question: 'Solve $2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$ by LU.',
          steps: ['$u_{11} = 2$, $u_{12} = 3$, $u_{13} = 4$; $l_{21} = \\tfrac12$, $l_{31} = 1$.', '$u_{22} = -2 - \\tfrac32 = -\\tfrac72$; $u_{23} = 1 - 2 = -1$.', '$l_{32} = \\tfrac{-1 - 3}{-7/2} = \\tfrac87$; $u_{33} = 3 - 4 - \\tfrac87(-1) = \\tfrac17$.', '$LY = B$: $y = (0, 3, 1 - \\tfrac87 \\cdot 3) = (0, 3, -\\tfrac{17}{7})$.', '$UX = Y$: $\\tfrac17x_3 = -\\tfrac{17}{7} \\Rightarrow x_3 = -17$; $-\\tfrac72x_2 + 17 = 3 \\Rightarrow x_2 = 4$; $2x_1 + 12 - 68 = 0 \\Rightarrow x_1 = 28$.'],
          answer: '$X = (28, 4, -17)$, exact. Rounding $\\tfrac17$ to $0.14$ gives $(28.31, 4.06, -17.2)$ instead.',
        },
        {
          title: '$2x_1 + x_2 + x_3 = 3$, $4x_1 + 3x_2 + 3x_3 = 7$, $8x_1 + 7x_2 + 9x_3 = 19$',
          question: 'Factorise $A = LU$ and solve.',
          steps: ['$L = \\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 4 & 3 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 2 \\end{pmatrix}$.', '$LY = B$: $Y = (3, 1, 4)$.', '$UX = Y$: $x_3 = 2$, $x_2 = -1$, $x_1 = 1$.'],
          answer: '$X = (1, -1, 2)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The class example, again',
          body: '“Solve the system from the matrix inverse lesson by the lower and upper triangular factorisation method.”\n\n**What the examiner wants:** every $l_{ij}$ and $u_{ij}$ shown as an equation from matching $LU = A$; $L$ and $U$ written out; $LY = B$ solved top-down; $UX = Y$ bottom-up. Note $u_{33} = \\tfrac17$: keep it as a fraction.',
          asides: [{ label: 'Exam tip', text: 'Give answers to 2 dp unless told otherwise, but keep fractions while working. Rounding $\\tfrac17$ to $0.14$ early turns $(28, 4, -17)$ into $(28.31, 4.06, -17.2)$.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'Factorising the class matrix',
          graph: {
            steps: [
              { ask: '$l_{21} = \\tfrac{a_{21}}{u_{11}} = \\tfrac12$. Then $u_{22} = -2 - l_{21} \\cdot 3$?', answer: -3.5, tol: 0.001, hint: '$-2 - 1.5$.' },
              { ask: '$l_{32} = \\tfrac{a_{32} - l_{31}u_{12}}{u_{22}} = \\tfrac{-1 - 3}{-3.5}$, to 4 dp?', answer: 1.1429, tol: 0.0002, hint: '$\\tfrac87$.' },
              { ask: '$u_{33} = 3 - 1 \\cdot 4 - \\tfrac87(-1)$, to 4 dp?', answer: 0.1429, tol: 0.0002, hint: '$-1 + \\tfrac87 = \\tfrac17$.' },
              { ask: 'Check: $u_{11}u_{22}u_{33} = 2 \\times (-3.5) \\times \\tfrac17 = $?', answer: -1, tol: 0.001, hint: 'It should equal $\\det A$.' },
            ],
            after: 'Then $Y = (0, 3, -\\tfrac{17}{7})$ and $X = (28, 4, -17)$, the same as the inverse method.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'Why can’t $A = \\begin{pmatrix} 0 & 1 \\\\ 1 & 1 \\end{pmatrix}$ be written as $LU$ (with 1s on the diagonal of $L$) as it stands?',
          options: [
            { text: '$u_{11} = 0$, so $l_{21} = \\tfrac{1}{0}$ is undefined; swap the rows first', correct: true, why: 'Every $u_{ii}$ must be non-zero. Interchanging rows fixes it.' },
            { text: '$A$ is singular', why: '$\\det A = -1 \\ne 0$; it is invertible.' },
            { text: '$A$ is not square', why: 'It is $2 \\times 2$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$2x_1 + x_2 + x_3 = 3$, $4x_1 + 3x_2 + 3x_3 = 7$, $8x_1 + 7x_2 + 9x_3 = 19$',
          graph: {
            steps: [
              { ask: '$l_{21} = \\tfrac42$, $l_{31} = \\tfrac82$. $u_{22} = 3 - 2(1)$?', answer: 1, tol: 0.001, hint: '$a_{22} - l_{21}u_{12}$.' },
              { ask: '$l_{32} = \\tfrac{7 - 4(1)}{1}$?', answer: 3, tol: 0.001, hint: '$\\tfrac{a_{32} - l_{31}u_{12}}{u_{22}}$.' },
              { ask: '$u_{33} = 9 - 4(1) - 3(1)$?', answer: 2, tol: 0.001, hint: '$a_{33} - l_{31}u_{13} - l_{32}u_{23}$.' },
              { ask: '$Y = (3, 1, 4)$. Back-substitute: $x_3 = $?', answer: 2, tol: 0.001, hint: '$2x_3 = 4$.' },
            ],
            after: 'Then $x_2 = 1 - 2 = -1$ and $x_1 = \\tfrac{3 + 1 - 2}{2} = 1$: $X = (1, -1, 2)$.',
          },
        },
        {
          type: 'finish',
          title: 'You can factorise and solve.',
          body: '**Summary:** $A = LU$; solve $LY = B$ top-down, then $UX = Y$ bottom-up; keep fractions; reuse $L$, $U$ for new $B$; a zero pivot needs a row swap.\n\n**Next:** **Gaussian elimination** reaches the same upper triangle $U$ directly, by eliminating unknowns one at a time.',
        },
      ],
    },
  ],
};
