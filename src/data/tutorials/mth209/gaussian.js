// MTH 209 · Idea B, lesson 8: Gaussian elimination. Part 1 eliminates on a 2 × 2 and states the
// general formulas b₁ⱼ = a₁ⱼ/a₁₁, aᵢⱼ⁽¹⁾ = aᵢⱼ − aᵢ₁b₁ⱼ; Part 2 completes the 4 × 4 class example
// and handles a zero pivot.

export default {
  id: 'gaussian',
  title: 'Gaussian elimination',
  covers: 'Eliminating unknowns stage by stage, the general formulas, zero pivots, and back substitution',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Gaussian method', 'Solve a system by the successive elimination of the unknowns, reaching an upper triangular system, then back-substitute.'],
        ['Pivot', 'The coefficient you divide by at each stage ($a_{11}$, then $a_{22}^{(1)}$, …). It must not be $0$.'],
        ['Direct method', 'Gives the answer in a fixed number of steps (inverse, LU, Gaussian), unlike iterative methods.'],
      ],
      steps: [
        'Write the system as an augmented table: coefficients plus the right-hand side as an extra column.',
        'Stage 1: divide row 1 by the pivot $a_{11}$: $b_{1j} = \\tfrac{a_{1j}}{a_{11}}$.',
        'Eliminate $x_1$ below: $a_{ij}^{(1)} = a_{ij} - a_{i1}b_{1j}$ (new = old − column entry × pivot-row entry).',
        'Repeat with the next pivot until the system is upper triangular.',
        'Back-substitute: last unknown first. If a pivot is $0$, swap with a lower row first.',
      ],
      examples: [
        {
          title: '$x + y = 3$, $2x + 3y = 8$',
          question: 'Solve by Gaussian elimination.',
          steps: ['Pivot $a_{11} = 1$: row 1 stays $x + y = 3$.', 'Row 2 $-$ 2 × row 1: $(3 - 2)y = 8 - 6$, so $y = 2$.', 'Back-substitute: $x = 3 - 2 = 1$.'],
          answer: '$x = 1$, $y = 2$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 8',
          title: 'Eliminate, then back-substitute',
          body: 'LU needed $L$ and $U$ worked out by matching entries. **Gaussian elimination** gets to the same upper triangle more directly: use equation 1 to remove $x_1$ from all the others, then equation 2 to remove $x_2$, and so on.\n\nIt is the method you already use on two equations at school, made systematic enough for any size.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Clear a column at a time',
          body: '$x + y = 3$ and $2x + 3y = 8$. Take $2 \\times$ (equation 1) away from equation 2: the $x$ disappears, leaving $y = 2$. Then $x = 1$.\n\nIn general: **divide** the pivot row so its leading coefficient is $1$, then **subtract** multiples of it to clear the column below. One formula does it all:\n$$\\text{new} = \\text{old} - (\\text{column entry}) \\times (\\text{pivot-row entry}).$$',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Gaussian elimination, step by step',
          body: '1. Augmented table: coefficients and the right-hand side.\n2. $b_{1j} = \\tfrac{a_{1j}}{a_{11}}$ (pivot row divided by the pivot).\n3. $a_{ij}^{(1)} = a_{ij} - a_{i1}b_{1j}$ for every row below.\n4. Repeat with the next pivot until upper triangular.\n5. Back-substitute from the bottom. A zero pivot means swap rows first.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$2x_1 + x_2 - x_3 = 1$, $x_1 + 3x_2 + 2x_3 = 13$, $3x_1 - x_2 + 4x_3 = 13$',
          body: '**Stage 1.** Pivot row: $x_1 + 0.5x_2 - 0.5x_3 = 0.5$. Row 2 $-$ row 1: $2.5x_2 + 2.5x_3 = 12.5$. Row 3 $-$ 3 × row 1: $-2.5x_2 + 5.5x_3 = 11.5$.\n\n**Stage 2.** Pivot row: $x_2 + x_3 = 5$. Row 3 $+$ 2.5 × it: $8x_3 = 24$.\n\n**Back-substitute.** $x_3 = 3$, $x_2 = 2$, $x_1 = 0.5 - 1 + 1.5 = 1$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A zero pivot',
          graph: {
            steps: [
              { ask: 'For $2x_2 + x_3 = 4$, $x_1 + x_2 + x_3 = 3$, $2x_1 + x_2 + 3x_3 = 6$, what is $a_{11}$?', answer: 0, tol: 0.001, hint: 'No $x_1$ in the first equation.' },
              { ask: 'The fix:', options: ['Swap equations 1 and 2', 'Divide by 0 anyway', 'Give up'], answer: 0, hint: 'Bring a row with a non-zero $x_1$ to the top.' },
              { ask: 'After swapping and eliminating you reach $1.5x_3 = 2$. $x_3$, to 4 dp?', answer: 1.3333, tol: 0.0002, hint: '$\\tfrac43$.' },
            ],
            after: 'Back-substitution gives $X = (\\tfrac13, \\tfrac43, \\tfrac43)$.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define** the Gaussian method in one sentence.\n• **Derive** the general $4 \\times 4$ algorithm: the assumption $a_{11} \\ne 0$, $b_{1j} = \\tfrac{a_{1j}}{a_{11}}$, $a_{ij}^{(1)} = a_{ij} - a_{i1}b_{1j}$ with index ranges, then stages 2 and 3, and the reduced system.\n• **Solve** a system to 4 dp, showing every stage.\n• **Explain** direct against iterative methods.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Use an augmented-matrix table; $j$ runs to $5$ for a $4 \\times 4$ (the right-hand side is column 5).',
        'Stage formulas: $b_{1j} = \\tfrac{a_{1j}}{a_{11}}$, $j = 2..5$; $a_{ij}^{(1)} = a_{ij} - a_{i1}b_{1j}$, $i = 2..4$. Stage 2: $b_{2j}^{(1)} = \\tfrac{a_{2j}^{(1)}}{a_{22}^{(1)}}$, $a_{ij}^{(2)} = a_{ij}^{(1)} - a_{i2}^{(1)}b_{2j}^{(1)}$, $i = 3, 4$.',
        'Label every intermediate value (for example $a_{24}^{(1)} = -8.7$); most marks are for the working.',
        'Watch signs on decimals: $-8.5 - (0.4)(0.5) = -8.7$, not $8.3$.',
        'Check the answer in the last equation you used.',
      ],
      examples: [
        {
          title: 'The $4 \\times 4$ class example',
          question: 'Solve $2.0x_1 + 1.0x_2 - 0.1x_3 + 1.0x_4 = 2.7$, $0.4x_1 + 0.5x_2 + 4.0x_3 - 8.5x_4 = 21.9$, $0.3x_1 - 1.0x_2 + 1.0x_3 + 5.2x_4 = -3.9$, $1.0x_1 + 0.2x_2 + 2.5x_3 - 1.0x_4 = 9.9$ by the Gaussian method.',
          steps: ['Stage 1: $b_{1j} = (0.5, -0.05, 0.5, 1.35)$. Row 2: $(0.3, 4.02, -8.7, 21.36)$; row 3: $(-1.15, 1.015, 5.05, -4.305)$; row 4: $(-0.3, 2.55, -1.5, 8.55)$.', 'Stage 2: $b_{2j} = (13.4, -29, 71.2)$. Row 3: $(16.425, -28.3, 77.575)$; row 4: $(6.57, -10.2, 29.91)$.', 'Stage 3: $b_{3j} = (-1.7230, 4.7230)$; row 4: $1.12x_4 = -1.12$.', 'Back-substitute: $x_4 = -1$, $x_3 = 4.7230 - 1.7230 = 3$, $x_2 = 71.2 - 13.4(3) - 29 = 2$, $x_1 = 1.35 - 1 + 0.15 + 0.5 = 1$.'],
          answer: '$X = (1, 2, 3, -1)$. Check row 4: $1 + 0.4 + 7.5 + 1 = 9.9$. ✓',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Complete the $4 \\times 4$',
          body: '“Solve by the Gaussian method: $2.0x_1 + 1.0x_2 - 0.1x_3 + 1.0x_4 = 2.7$, $0.4x_1 + 0.5x_2 + 4.0x_3 - 8.5x_4 = 21.9$, $0.3x_1 - 1.0x_2 + 1.0x_3 + 5.2x_4 = -3.9$, $1.0x_1 + 0.2x_2 + 2.5x_3 - 1.0x_4 = 9.9$.”\n\n**What the examiner wants:** each stage’s $b$ values and new coefficients, labelled; the reduced triangular system; back substitution; a check. All three stages are in **Examples**.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'Stage 1 of the $4 \\times 4$',
          graph: {
            steps: [
              { ask: '$b_{15} = \\tfrac{2.7}{2.0}$?', answer: 1.35, tol: 0.001, hint: 'Divide the right-hand side by the pivot.' },
              { ask: '$a_{24}^{(1)} = a_{24} - a_{21}b_{14} = -8.5 - (0.4)(0.5)$?', answer: -8.7, tol: 0.001, hint: 'Keep the minus sign of $-8.5$.' },
              { ask: '$a_{32}^{(1)} = -1.0 - (0.3)(0.5)$?', answer: -1.15, tol: 0.001, hint: 'Not $0$: $-1 - 0.15$.' },
              { ask: 'After all three stages, $1.12x_4 = -1.12$. So $x_4 = $?', answer: -1, tol: 0.001, hint: 'Divide.' },
            ],
            after: 'Back substitution then gives $x_3 = 3$, $x_2 = 2$, $x_1 = 1$.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student writes $a_{24}^{(1)} = 8.5 - (0.4)(0.5) = 8.3$. What went wrong?',
          options: [
            { text: 'The coefficient of $x_4$ in equation 2 is $-8.5$; the sign was dropped, so it should be $-8.7$', correct: true, why: 'Copy each coefficient with its sign. One lost sign wrecks every later stage.' },
            { text: 'They should add instead of subtract', why: 'The formula is right; the input sign is wrong.' },
            { text: 'Nothing', why: 'Check equation 2: the $x_4$ term is $-8.5x_4$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$2x_1 + x_2 - x_3 = 1$, $x_1 + 3x_2 + 2x_3 = 13$, $3x_1 - x_2 + 4x_3 = 13$',
          graph: {
            steps: [
              { ask: 'Stage 1, row 2: $a_{22}^{(1)} = 3 - (1)(0.5)$?', answer: 2.5, tol: 0.001, hint: '$b_{12} = 0.5$.' },
              { ask: 'Row 3: $a_{32}^{(1)} = -1 - (3)(0.5)$?', answer: -2.5, tol: 0.001, hint: 'Column entry $3$.' },
              { ask: 'After stage 2, $8x_3 = 24$. $x_3 = $?', answer: 3, tol: 0.001, hint: 'Divide.' },
              { ask: 'Then $x_2 + x_3 = 5$ gives $x_2 = $?', answer: 2, tol: 0.001, hint: '$5 - 3$.' },
            ],
            after: 'And $x_1 = 0.5 - 0.5(2) + 0.5(3) = 1$: $X = (1, 2, 3)$.',
          },
        },
        {
          type: 'finish',
          title: 'You can eliminate any system.',
          body: '**Summary:** divide the pivot row, subtract multiples to clear below ($a_{ij}^{(1)} = a_{ij} - a_{i1}b_{1j}$), repeat to a triangle, back-substitute; swap rows for a zero pivot; guard every sign.\n\n**Next:** the **iterative** methods. Instead of eliminating, guess and improve: **simple iteration**, with a test that says in advance whether it will converge.',
        },
      ],
    },
  ],
};
