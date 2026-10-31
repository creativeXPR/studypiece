// MTH 209 · Systems of linear equations · Lesson 2: lower and upper triangular (LU) factorisation.

export default {
  id: 'lu-factorisation',
  title: 'LU factorisation',
  covers: 'A = LU (Doolittle, lᵢᵢ = 1), equating entries, LY = B forward, UX = Y back, a worked example',
  minutes: 18,
  sections: [
    {
      name: 'The idea',
      terms: [
        ['LU factorisation', '$A = LU$ with $L$ lower triangular (1s on the diagonal) and $U$ upper triangular. Then $AX = B$ becomes $LY = B$, $UX = Y$.'],
        ['Forward substitution', 'Solve a lower-triangular system from the top: $y_1$ first.'],
        ['Back substitution', 'Solve an upper-triangular system from the bottom: $x_n$ first.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of linear equations · Lesson 2',
          title: 'Triangular systems are easy',
          body: 'A system like\n$$2x_1 + 3x_2 + 4x_3 = 0,\\quad -\\tfrac72x_2 - x_3 = 3,\\quad \\tfrac17x_3 = -\\tfrac{17}{7}$$\nsolves itself from the bottom up: $x_3$, then $x_2$, then $x_1$.\n\n==LU factorisation== writes a square matrix $A$ as $A = LU$, a **lower** times an **upper** triangular matrix, so a hard system becomes two easy ones.',
          cta: 'How?',
        },
        {
          type: 'story',
          eyebrow: 'Two triangular systems',
          title: '$AX = B \\implies LUX = B$',
          body: 'Put $Y = UX$. Then $AX = B$ becomes $LY = B$. So:\n\n**Step 1.** Factorise $A = LU$.\n**Step 2.** Solve $LY = B$ by **forward substitution** ($y_1$ first).\n**Step 3.** Solve $UX = Y$ by **back substitution** ($x_n$ first).\n\n$A$ must be **square**. We use Doolittle’s form, with 1s on the diagonal of $L$:\n$$\\begin{pmatrix} 1 & 0 & 0 \\\\ l_{21} & 1 & 0 \\\\ l_{31} & l_{32} & 1 \\end{pmatrix}\\begin{pmatrix} u_{11} & u_{12} & u_{13} \\\\ 0 & u_{22} & u_{23} \\\\ 0 & 0 & u_{33} \\end{pmatrix} = A.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why do we fix the diagonal entries of $L$ to 1?',
          options: [
            { text: '$L$ and $U$ together have $n^2 + n$ unknowns but $A$ gives only $n^2$ equations; fixing $n$ of them makes the factorisation unique', correct: true, why: 'With $l_{ii} = 1$, exactly $n^2$ unknowns remain, matching the $n^2$ entries of $A$ (Doolittle’s method).' },
            { text: 'Because $\\det L$ must equal $\\det A$', why: 'With $l_{ii} = 1$, $\\det L = 1$, not $\\det A$.' },
            { text: 'To make $L$ symmetric', why: 'A lower triangular matrix isn’t symmetric (unless it’s diagonal).' },
            { text: 'It is required for back substitution', why: 'Back substitution works on $U$, whatever $L$’s diagonal is.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The idea: set.',
          recap: [
            '$A = LU$; solve $LY = B$ forwards, then $UX = Y$ backwards.',
            'Doolittle: $l_{ii} = 1$ makes the factorisation unique.',
          ],
          why: 'How do we actually find $L$ and $U$? Multiply out and match entries.',
        },
      ],
    },
    {
      name: 'Finding L and U',
      terms: [
        ['Doolittle formulas (3 × 3)', '$u_{1j} = a_{1j}$; $l_{21} = \\frac{a_{21}}{u_{11}}$, $l_{31} = \\frac{a_{31}}{u_{11}}$; $u_{22} = a_{22} - l_{21}u_{12}$, $u_{23} = a_{23} - l_{21}u_{13}$; $l_{32} = \\frac{a_{32} - l_{31}u_{12}}{u_{22}}$; $u_{33} = a_{33} - l_{31}u_{13} - l_{32}u_{23}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example · Row 1',
          title: 'Factorise $A = \\begin{pmatrix} 2 & 3 & 4 \\\\ 1 & -2 & 1 \\\\ 2 & -1 & 3 \\end{pmatrix}$',
          body: 'Multiply $L$ by $U$ and equate entries with $A$, working **row of $U$, then column of $L$, then the next row of $U$**.\n\n**Row 1** of $LU$ is just $(u_{11}, u_{12}, u_{13})$, so\n$$u_{11} = 2,\\quad u_{12} = 3,\\quad u_{13} = 4.$$\n\n(Row 1 of $U$ is always row 1 of $A$.)',
        },
        {
          type: 'story',
          asides: [
            { label: 'Tip', text: 'Slips are easy here, so be very careful. Work one entry at a time, keep the 1s on the diagonal of $L$, and check that $LU$ gives back $A$.' },
          ],
          eyebrow: 'Worked example · Row 2',
          title: 'Entries $(2,1)$, $(2,2)$, $(2,3)$',
          body: '$$\\begin{aligned} 1 &= l_{21}u_{11} = 2l_{21} &&\\implies l_{21} = \\tfrac12 \\\\ -2 &= l_{21}u_{12} + u_{22} = \\tfrac32 + u_{22} &&\\implies u_{22} = -\\tfrac72 \\\\ 1 &= l_{21}u_{13} + u_{23} = 2 + u_{23} &&\\implies u_{23} = -1 \\end{aligned}$$',
        },
        {
          type: 'choice',
          eyebrow: 'Worked example · Row 3',
          prompt: '$l_{31} = \\frac{2}{2} = 1$. Entry $(3,2)$ gives $-1 = l_{31}u_{12} + l_{32}u_{22} = 3 - \\frac72l_{32}$. Find $l_{32}$.',
          options: [
            { text: '$\\frac87$', correct: true, why: '$\\frac72l_{32} = 3 + 1 = 4$, so $l_{32} = \\frac{8}{7}$.' },
            { text: '$-\\frac87$', why: 'Move $3$ across carefully: $-\\frac72l_{32} = -4$.' },
            { text: '$\\frac47$', why: 'Divide 4 by $\\frac72$: that’s $4 \\times \\frac27 = \\frac87$.' },
            { text: '$\\frac72$', why: 'That’s $|u_{22}|$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example · Last entry',
          title: '$u_{33}$, and the full factorisation',
          body: '$$3 = l_{31}u_{13} + l_{32}u_{23} + u_{33} = 4 - \\tfrac87 + u_{33} \\implies u_{33} = \\tfrac17.$$\n\n$$L = \\begin{pmatrix} 1 & 0 & 0 \\\\ \\frac12 & 1 & 0 \\\\ 1 & \\frac87 & 1 \\end{pmatrix},\\quad U = \\begin{pmatrix} 2 & 3 & 4 \\\\ 0 & -\\frac72 & -1 \\\\ 0 & 0 & \\frac17 \\end{pmatrix}.$$\n\nCheck: $\\det A = u_{11}u_{22}u_{33} = 2 \\cdot \\left(-\\frac72\\right) \\cdot \\frac17 = -1$ ✓ (as in the matrix inverse lesson).',
        },
        {
          type: 'bridge',
          title: 'L and U: found.',
          recap: [
            'Row 1 of $U$ = row 1 of $A$; column 1 of $L$ = column 1 of $A$ ÷ $a_{11}$.',
            'Then alternate: next row of $U$, next column of $L$.',
          ],
          why: 'Now the two substitutions.',
        },
      ],
    },
    {
      name: 'Solving',
      screens: [
        {
          type: 'story',
          eyebrow: 'Step 2 · Forward substitution',
          title: '$LY = B$ with $B = (0, 3, 1)^T$',
          body: '$$\\begin{aligned} y_1 &= 0 \\\\ \\tfrac12(0) + y_2 &= 3 &&\\implies y_2 = 3 \\\\ 1(0) + \\tfrac87(3) + y_3 &= 1 &&\\implies y_3 = -\\tfrac{17}{7} \\end{aligned}$$',
        },
        {
          type: 'choice',
          eyebrow: 'Step 3 · Back substitution',
          prompt: '$UX = Y$: $\\frac17x_3 = -\\frac{17}{7}$, $-\\frac72x_2 - x_3 = 3$, $2x_1 + 3x_2 + 4x_3 = 0$. Solve.',
          options: [
            { text: '$x_3 = -17,\\ x_2 = 4,\\ x_1 = 28$', correct: true, why: '$x_3 = -17$; $-\\frac72x_2 + 17 = 3 \\implies x_2 = 4$; $2x_1 + 12 - 68 = 0 \\implies x_1 = 28$. The same answer as the matrix inverse method.' },
            { text: '$x_3 = -17,\\ x_2 = -4,\\ x_1 = 34$', why: 'Check $x_2$: $-\\frac72x_2 = 3 - 17 = -14$, so $x_2 = 4$.' },
            { text: '$x_3 = -\\frac{17}{49},\\ \\ldots$', why: 'Divide by $\\frac17$, i.e. multiply by 7: $x_3 = -17$.' },
            { text: '$x_1 = 0,\\ x_2 = 3,\\ x_3 = 1$', why: 'That’s $B$, not $X$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about LU factorisation are true?',
          options: [
            { text: 'Once $A = LU$ is known, a new right-hand side needs only two quick substitutions.', correct: true, why: '**Factorise once, reuse many times**: the main advantage.' },
            { text: '$\\det A = u_{11}u_{22}\\cdots u_{nn}$.', correct: true, why: '**$\\det L = 1$**, so $\\det A = \\det U$.' },
            { text: 'If some $u_{ii} = 0$, the factorisation breaks down unless rows are interchanged.', correct: true, why: '**A zero pivot** means you can’t divide by $u_{ii}$ for the next column of $L$.' },
            { text: 'LU works for any rectangular matrix.', why: '**$A$ must be square** for this method.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Explain the LU method',
          body: 'Let $A$ be a square matrix with $A = LU$, where $L$ is lower triangular with $l_{ii} = 1$ and $U$ is upper triangular. Then\n$$AX = B \\implies LUX = B \\implies LY = B,\\quad Y = UX.$$\n**1.** Factorise $A = LU$ by multiplying $L$ by $U$ and equating entries to those of $A$.\n**2.** Solve $LY = B$ for $Y$ by forward substitution.\n**3.** Solve $UX = Y$ for $X$ by back substitution.',
        },
        {
          type: 'finish',
          title: 'You can factorise.',
          body: 'Next: Gaussian elimination, where $U$ appears as the reduced matrix.',
        },
      ],
    },
  ],
};
