// MTH 209 · Part B · Lesson 5: Gaussian elimination and LU factorisation. Why row operations are
// allowed, the elimination formulas, row interchange, the class 4 × 4 example (stage 2 recomputed:
// 77.575, not 77.5), and Doolittle LU as elimination stored for reuse. Replaces gaussian.js and
// lu-factorisation.js. Numbers recomputed in Python with exact fractions.
import { eliminationScene } from './system-scenes';

export default {
  id: 'elimination-lu',
  title: 'Gaussian elimination and LU factorisation',
  covers: 'Why row operations keep the solution, Gaussian elimination with b₁ⱼ = a₁ⱼ/a₁₁ and a⁽¹⁾ᵢⱼ = aᵢⱼ − aᵢ₁b₁ⱼ, row interchange for a zero pivot, back substitution, a 4 × 4 worked example, and Doolittle LU factorisation with forward and back substitution',
  minutes: 20,
  sections: [
    {
      name: 'Gaussian elimination',
      terms: [
        ['Row operations', 'Swap two equations, multiply one by a non-zero number, or add a multiple of one to another. Each gives an equivalent system: same solution.'],
        ['Elimination step', 'Pivot row $\\div a_{kk}$: $b_{kj} = \\frac{a_{kj}}{a_{kk}}$. Then for each row below, $a^{(k)}_{ij} = a_{ij} - a_{ik}b_{kj}$.'],
        ['Row interchange', 'If a pivot is 0, swap in a lower row with a non-zero entry in that column.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part B · Lesson 5',
          title: 'Make it triangular, then it solves itself',
          body: '**Where we are:** the inverse works but costs many cofactors. **The problem:** do less work.\n\n**The idea:** a triangular system solves itself from the bottom up:\n$$x + 0.5y = 1.35,\\quad y = 2 \\implies y = 2,\\ x = 0.35.$$\nSo turn $A$ into a triangle **without moving the solution**. Row operations do exactly that: swapping, scaling or adding equations never changes which point satisfies them all.',
          cta: 'Show me',
        },
        eliminationScene,
        {
          type: 'story',
          eyebrow: 'The method',
          title: 'Clear one column at a time',
          body: '**Stage 1 (remove $x_1$ below row 1):** divide row 1 by the pivot $a_{11}$:\n$$b_{1j} = \\frac{a_{1j}}{a_{11}},$$\nthen subtract $a_{i1}$ times this row from each row $i$ below:\n$$a^{(1)}_{ij} = a_{ij} - a_{i1}b_{1j}.$$\n**Stage 2, 3, …:** repeat on the smaller system below.\n\n**Then back-substitute:** last equation gives $x_n$, the one above gives $x_{n-1}$, and so on. The right-hand side is treated as one more column ($j = n + 1$).',
        },
        {
          type: 'choice',
          eyebrow: 'Zero pivot',
          prompt: 'Solving $2x_2 + x_3 = 4$, $x_1 + x_2 + x_3 = 3$, $2x_1 + x_2 + 3x_3 = 6$, you find $a_{11} = 0$. What do you do?',
          options: [
            { text: 'Swap equations (1) and (2), then eliminate as usual', correct: true, why: 'Swapping is a row operation: the solution is unchanged, and the new pivot is $1$.' },
            { text: 'Conclude there is no solution', why: 'Only if every entry in that column below is also 0 (then $\\det A = 0$).' },
            { text: 'Divide by a tiny number like $0.0001$', why: 'That changes the problem and magnifies round-off.' },
            { text: 'Set $x_1 = 0$', why: 'There is no reason $x_1$ should be 0.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example (class)',
          title: 'A 4 × 4 system',
          body: '$$\\begin{aligned} 2.0x_1 + 1.0x_2 - 0.1x_3 + 1.0x_4 &= 2.7 \\\\ 0.4x_1 + 0.5x_2 + 4.0x_3 - 8.5x_4 &= 21.9 \\\\ 0.3x_1 - 1.0x_2 + 1.0x_3 + 5.2x_4 &= -3.9 \\\\ 1.0x_1 + 0.2x_2 + 2.5x_3 - 1.0x_4 &= 9.9 \\end{aligned}$$\n• **Stage 1 (remove $x_1$):** row 1 $\\div 2$: $x_1 + 0.5x_2 - 0.05x_3 + 0.5x_4 = 1.35$. E.g. $a^{(1)}_{24} = -8.5 - 0.4(0.5) = -8.7$.\n• **Stage 2 (remove $x_2$):** $x_2 + 13.4x_3 - 29x_4 = 71.2$, leaving $16.425x_3 - 28.3x_4 = 77.575$ and $6.57x_3 - 10.2x_4 = 29.91$.\n• **Stage 3 (remove $x_3$):** $x_3 - 1.7230x_4 = 4.7230$, leaving $1.12x_4 = -1.12$.\n• **Back-substitute:** $x_4 = -1$, $x_3 = 3$, $x_2 = 2$, $x_1 = 1$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Solve $2a + 3b + c = 9$, $a + 2b + 3c = 6$, $3a + b + 2c = 8$ by Gaussian elimination.',
          body: 'Row 1 $\\div 2$: $a + 1.5b + 0.5c = 4.5$. Then remove $a$, then $b$, then back-substitute.',
          graph: {
            steps: [
              { ask: 'Remove $a$: row 2 becomes $0.5b + 2.5c = $', answer: 1.5, tol: 0.0001, hint: '$6 - 1(4.5)$.' },
              { ask: 'and row 3 becomes $-3.5b + 0.5c = $', answer: -5.5, tol: 0.0001, hint: '$8 - 3(4.5)$.' },
              { ask: 'Row 2 $\\div 0.5$: $b + 5c = 3$. Remove $b$: $18c = 5$, so $c = $ (4 d.p.)', answer: 0.2778, tol: 0.0001, hint: '$0.5 + 3.5(5) = 18$; $-5.5 + 3.5(3) = 5$.' },
              { ask: '$b = 3 - 5c = $ (4 d.p.)', answer: 1.6111, tol: 0.0001, hint: 'Back-substitute.' },
              { ask: '$a = 4.5 - 1.5b - 0.5c = $ (4 d.p.)', answer: 1.9444, tol: 0.0001, hint: 'Back-substitute.', done: 'Check in equation 3: $3(1.9444) + 1.6111 + 2(0.2778) = 8$ ✓' },
            ],
          },
        },
      ],
    },
    {
      name: 'LU factorisation',
      terms: [
        ['LU (Doolittle)', '$A = LU$ with $L$ lower triangular, $l_{ii} = 1$, and $U$ upper triangular.'],
        ['Solving with LU', '$AX = B \\implies L(UX) = B$: solve $LY = B$ forward ($y_1$ first), then $UX = Y$ backward ($x_n$ first).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Keep the elimination, reuse it',
          body: 'Elimination turns $A$ into an upper triangle $U$; the multipliers it used form a lower triangle $L$, and $A = LU$.\n\n**Why bother?** Engineers often solve $AX = B$ for the **same** $A$ and many different $B$. Factorise once; then each new $B$ costs only two quick substitutions:\n$$AX = B \\implies L\\underbrace{(UX)}_{Y} = B:\\quad LY = B\\ \\text{(forward)},\\quad UX = Y\\ \\text{(back)}.$$\n**Doolittle:** fix $l_{ii} = 1$ so the factorisation is unique.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example (class)',
          title: 'Factorise $A = \\begin{pmatrix} 2 & 3 & 4 \\\\ 1 & -2 & 1 \\\\ 2 & -1 & 3 \\end{pmatrix}$',
          body: 'Multiply out $LU$ and equate entries with $A$, **row of $U$, then column of $L$**, so each equation has one unknown:\n• **Row 1 of $U$** = row 1 of $A$: $2, 3, 4$.\n• **Column 1 of $L$:** $l_{21} = \\frac12$, $l_{31} = \\frac22 = 1$.\n• **Row 2 of $U$:** $-2 = \\frac32 + u_{22} \\Rightarrow u_{22} = -\\frac72$; $1 = 2 + u_{23} \\Rightarrow u_{23} = -1$.\n• **Column 2 of $L$:** $-1 = 3 - \\frac72l_{32} \\Rightarrow l_{32} = \\frac87$.\n• **Last:** $3 = 4 - \\frac87 + u_{33} \\Rightarrow u_{33} = \\frac17$.\n$$L = \\begin{pmatrix} 1 & 0 & 0 \\\\ \\frac12 & 1 & 0 \\\\ 1 & \\frac87 & 1 \\end{pmatrix},\\ U = \\begin{pmatrix} 2 & 3 & 4 \\\\ 0 & -\\frac72 & -1 \\\\ 0 & 0 & \\frac17 \\end{pmatrix}$$',
        },
        {
          type: 'choice',
          eyebrow: 'Finish it',
          prompt: 'With $B = (0, 3, 1)^T$, forward substitution gives $Y = (0, 3, -\\frac{17}{7})$. Back substitution in $UX = Y$ gives',
          options: [
            { text: '$x_3 = -17,\\ x_2 = 4,\\ x_1 = 28$', correct: true, why: '$\\frac17x_3 = -\\frac{17}{7}$; $-\\frac72x_2 + 17 = 3 \\Rightarrow x_2 = 4$; $2x_1 + 12 - 68 = 0 \\Rightarrow x_1 = 28$. Same answer as the inverse method.' },
            { text: '$x_3 = -\\frac{17}{7},\\ x_2 = 3,\\ x_1 = 0$', why: 'That is $Y$, not $X$.' },
            { text: '$x_1 = 1,\\ x_2 = 2,\\ x_3 = -1$', why: 'Back-substitute from the bottom row.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Factorise $A = \\begin{pmatrix} 4 & 3 \\\\ 6 & 3 \\end{pmatrix}$ as $LU$ (Doolittle) and solve $AX = \\begin{pmatrix} 10 \\\\ 12 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$l_{21} = \\frac{6}{u_{11}} = $', answer: 1.5, tol: 0.0001, hint: '$u_{11} = 4$, $u_{12} = 3$ (row 1 of $A$).' },
              { ask: '$u_{22} = 3 - l_{21}u_{12} = $', answer: -1.5, tol: 0.0001, hint: '$3 - 1.5 \\times 3$.' },
              { ask: 'Forward: $y_1 = 10$, $y_2 = 12 - 1.5y_1 = $', answer: -3, tol: 0.0001, hint: '$12 - 15$.' },
              { ask: 'Back: $x_2 = \\frac{y_2}{u_{22}} = $', answer: 2, tol: 0.0001, hint: '$\\frac{-3}{-1.5}$.' },
              { ask: '$x_1 = \\frac{10 - 3x_2}{4} = $', answer: 1, tol: 0.0001, hint: '$\\frac{10 - 6}{4}$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe the Gaussian and LU methods',
          body: '**Gaussian:** divide equation 1 by $a_{11}$ ($b_{1j} = \\frac{a_{1j}}{a_{11}}$) and subtract multiples of it to remove $x_1$ from the equations below ($a^{(1)}_{ij} = a_{ij} - a_{i1}b_{1j}$). Repeat on the reduced system until it is upper triangular, interchanging rows if a pivot is zero, then back-substitute.\n\n**LU:** write $A = LU$ ($L$ lower triangular with $l_{ii} = 1$, $U$ upper triangular) by multiplying out and equating entries. Then $AX = B$ becomes $LY = B$, solved by forward substitution, and $UX = Y$, solved by back substitution.',
        },
        {
          type: 'finish',
          title: 'You can eliminate and factorise.',
          body: 'Both are direct: a fixed amount of work. Next: iterative methods, which improve a guess instead. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
