// MTH 209 · Systems of linear equations · Lesson 1: general form and the matrix inverse method.
import { eliminationScene } from './system-scenes';

export default {
  id: 'matrix-inverse',
  title: 'The matrix inverse method',
  covers: 'General form, consistency, AX = B, X = A⁻¹B with A⁻¹ = adj A / det A, a worked example',
  minutes: 15,
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
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which root-finding method is usually fastest once it is close to the root?',
          options: [
            { text: 'Newton-Raphson', correct: true, why: 'Each step roughly doubles the number of correct digits.' },
            { text: 'Bisection', why: 'The slowest: one binary digit per step. Its strength is that it never fails.' },
            { text: 'Linear iteration', why: 'Its error shrinks by about $|g\'(\\alpha)|$ per step: steady, not fast.' },
            { text: 'Regula Falsi', why: 'It often keeps one end fixed and creeps in from one side.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Part B · Lesson 4',
          title: 'From one equation to many',
          body: '**Where we are:** still solving, now **many equations at once**. Each linear equation is a line (or plane); the solution is where they all **cross**. Real problems (structures, circuits, mixtures) give dozens of unknowns. In general:\n$$\\begin{aligned} a_{11}x_1 + a_{12}x_2 + \\cdots + a_{1n}x_n &= b_1 \\\\ &\\ \\ \\vdots \\\\ a_{n1}x_1 + a_{n2}x_2 + \\cdots + a_{nn}x_n &= b_n \\end{aligned}$$',
          cta: 'Name the parts',
        },
        eliminationScene,
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
          asides: [
            { label: 'Exam tip', text: 'Be ready to define a consistent system: one with at least one solution.' },
          ],
          eyebrow: 'What can a system do?',
          title: 'One crossing, none, or infinitely many',
          body: 'Two lines in a plane can **cross once** (one solution), be **parallel** (none) or **coincide** (infinitely many); planes too.\n\nA system is ==consistent== when it has **at least one solution**, inconsistent when it has none. Fewer equations than unknowns does not make it inconsistent: $2x + 4y + 3z = 2$, $4x + y + 6z = 3$ has infinitely many solutions.\n\n**Why $\\det A$ matters:** $\\det A \\neq 0$ exactly when there is **one** crossing. $\\det A = 0$ means parallel or coinciding: no unique answer, and no $A^{-1}$.',
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
          body: 'Write the system as $AX = B$: $A$ is the coefficient matrix, $X$ the column of unknowns, $B$ the column of constants. **The idea:** undo $A$, just as $2x = 4$ is solved by multiplying by $\\frac12$.\n\n**Theorem.** If there is a matrix $C$ with $CA = I$, then $C = A^{-1}$ and $X = A^{-1}B$.\n\n**Proof.** Premultiply $AX = B$ by $A^{-1}$:\n$$A^{-1}AX = A^{-1}B \\implies IX = A^{-1}B \\implies X = A^{-1}B.\\ \\blacksquare$$',
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
          asides: [
            { label: 'Tip', text: 'Give final answers to 2 d.p. unless told otherwise. Keep your working in exact fractions for as long as you can, because they are more accurate than rounded decimals.' },
          ],
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
      ],
    },
    {
      name: 'More examples',
      terms: [
        ['2 × 2 inverse', '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Solve $x_1 + 2x_2 + 3x_3 = 2$, $x_2 + 4x_3 = -2$, $5x_1 + 6x_2 = 17$ by the matrix inverse method.',
          body: '$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{pmatrix}$, $X = A^{-1}B = \\frac{1}{|A|}(\\operatorname{adj}A)B$.',
          graph: {
            steps: [
              { ask: '$|A| = $', answer: 1, tol: 0, hint: '$1(0 - 24) - 2(0 - 20) + 3(0 - 5)$.' },
              { ask: 'Cofactor $C_{11} = $', answer: -24, tol: 0, hint: '$+\\begin{vmatrix} 1 & 4 \\\\ 6 & 0 \\end{vmatrix}$.' },
              { ask: '$x_1 = $', answer: 1, tol: 0, hint: 'Row 1 of $\\operatorname{adj}A$ is $(-24, 18, 5)$: $-48 - 36 + 85$.' },
              { ask: '$x_2 = $', answer: 2, tol: 0, hint: 'Row 2 of $\\operatorname{adj}A$ is $(20, -15, -4)$: $40 + 30 - 68$.' },
              { ask: '$x_3 = $', answer: -1, tol: 0, hint: 'Row 3 of $\\operatorname{adj}A$ is $(-5, 4, 1)$: $-10 - 8 + 17$.' },
            ],
          },
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
          body: 'The inverse needs many cofactors: fine for 3 × 3, heavy beyond. Next: Gaussian elimination and LU, which do far less work.',
        },
      ],
    },
  ],
};
