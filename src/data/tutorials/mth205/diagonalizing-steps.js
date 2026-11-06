// MTH 205 · Diagonalization · Lesson 2: the procedure. Three steps on a 3 × 3 example, algebraic
// and geometric multiplicity (GM = n − rank(A − λI)), the shear as the matrix that cannot be
// diagonalized, and computing powers with A^k = P D^k P⁻¹.
import { ID, SHEAR } from './la';

const S = 1.2;
const ARROWS = Array.from({ length: 8 }, (_, k) => [S * Math.cos((k * Math.PI) / 8), S * Math.sin((k * Math.PI) / 8)]);

export default {
  id: 'diagonalizing-steps',
  title: 'Diagonalizing step by step',
  covers: 'The procedure for diagonalizing an n × n matrix, a full 3 × 3 example with P and D, algebraic and geometric multiplicity, the test GM = AM for every eigenvalue, a matrix that is not diagonalizable, and computing A^k with P D^k P⁻¹',
  minutes: 20,
  sections: [
    {
      name: 'The procedure',
      terms: [
        ['Step 1', 'Find $n$ linearly independent eigenvectors (a basis of each eigenspace). If there aren’t $n$, stop: not diagonalizable.'],
        ['Step 2', 'Form $P = (P_1, P_2, \\dots, P_n)$ with these eigenvectors as columns.'],
        ['Step 3', '$P^{-1}AP = D = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n)$, in the same order as the columns of $P$.'],
        ['Check without $P^{-1}$', 'Verify $AP = PD$: it is quicker than computing $P^{-1}$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: '$A$ is diagonalizable exactly when',
          options: [
            { text: 'it has $n$ linearly independent eigenvectors', correct: true, why: 'They become the columns of $P$.' },
            { text: 'its eigenvalues are all distinct', why: 'Distinct is enough, but not necessary ($I$ is diagonal).' },
            { text: '$\\det A \\neq 0$', why: 'Invertibility is unrelated: $\\operatorname{diag}(0, 1)$ is diagonal but singular.' },
            { text: 'it is symmetric', why: 'Symmetric matrices are diagonalizable (Ch 4), but many others are too.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Determine whether $A = \\begin{pmatrix} -1 & 4 & -2 \\\\ -3 & 4 & 0 \\\\ -3 & 1 & 3 \\end{pmatrix}$ is diagonalizable; if so, diagonalize it.',
          body: '**Eigenvalues.** $|A - \\lambda I| = -(\\lambda - 1)(\\lambda - 2)(\\lambda - 3)$, so $\\lambda = 1, 2, 3$. (Check: trace $-1 + 4 + 3 = 6 = 1 + 2 + 3$ ✓.) Three distinct eigenvalues, so it **is** diagonalizable.\n\n**Step 1: eigenvectors.** Solve $(A - \\lambda I)v = 0$:\n$\\lambda = 1$: $v = (1, 1, 1)$; $\\;\\lambda = 2$: $v = (2, 3, 3)$; $\\;\\lambda = 3$: $v = (1, 3, 4)$.\n\n**Step 2.** $P = \\begin{pmatrix} 1 & 2 & 1 \\\\ 1 & 3 & 3 \\\\ 1 & 3 & 4 \\end{pmatrix}$.\n\n**Step 3.** $P^{-1}AP = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$.',
          asides: [{ label: 'Check', text: 'Column 2 of $AP$: $A(2, 3, 3) = (-2 + 12 - 6, -6 + 12, -6 + 3 + 9) = (4, 6, 6) = 2(2, 3, 3)$ ✓.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Redo the key steps for that $A$.',
          graph: {
            steps: [
              { ask: '$|A| = $ (product of eigenvalues)', answer: 6, tol: 0, hint: '$1 \\cdot 2 \\cdot 3$.' },
              { ask: 'For $\\lambda = 3$: $A - 3I$ has second row $(-3, 1, 0)$, so $y = ax$ with $a = $', answer: 3, tol: 0, hint: '$-3x + y = 0$.' },
              { ask: 'First row of $A - 3I$ is $(-4, 4, -2)$. With $x = 1$, $y = 3$: $z = $', answer: 4, tol: 0, hint: '$-4 + 12 - 2z = 0$.' },
              { ask: 'In $D$, the entry in the column where $P$ has $(2, 3, 3)$ is', answer: 2, tol: 0, hint: '$(2, 3, 3)$ is the eigenvector for $\\lambda = 2$.' },
            ],
          },
        },
        {
          type: 'order',
          eyebrow: 'The procedure',
          prompt: 'Put the steps for diagonalizing $A$ in order.',
          items: [
            'Solve $|A - \\lambda I| = 0$ for the eigenvalues.',
            'For each eigenvalue, find a basis of its eigenspace by solving $(A - \\lambda I)v = 0$.',
            'Check there are $n$ independent eigenvectors in total (else $A$ is not diagonalizable).',
            'Put them as the columns of $P$.',
            'Write $D$ with the eigenvalues in the matching order; $P^{-1}AP = D$.',
          ],
        },
        {
          type: 'bridge',
          title: 'Three steps, one check.',
          recap: ['Eigenvectors → columns of $P$.', 'Eigenvalues → diagonal of $D$, same order.'],
          why: 'Next: what goes wrong when eigenvalues repeat.',
        },
      ],
    },
    {
      name: 'When it fails',
      terms: [
        ['Algebraic multiplicity (AM)', 'How many times $\\lambda$ is a root of $|A - \\lambda I|$.'],
        ['Geometric multiplicity (GM)', '$\\dim$ of the eigenspace $= n - \\operatorname{rank}(A - \\lambda I)$: how many independent eigenvectors $\\lambda$ really has. Always $1 \\le \\text{GM} \\le \\text{AM}$.'],
        ['Test', '$A$ is diagonalizable $\\iff$ the characteristic polynomial splits and $\\text{GM}(\\lambda) = \\text{AM}(\\lambda)$ for every eigenvalue.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Not enough eigen-lines',
          graph: {
            steps: [
              { say: 'Meet the shear $\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$. Its characteristic polynomial is $(\\lambda - 2)^2$: one eigenvalue, $2$, counted twice (AM $= 2$). Watch eight arrows.', action: { label: 'Apply the shear' } },
              { say: 'Only the horizontal arrows stayed on their line (stretched $\\times 2$). Every other arrow was tilted. So $\\lambda = 2$ has just **one** eigen-direction: GM $= 1$.' },
              { say: 'To diagonalize a $2 \\times 2$ matrix we need two independent eigenvectors to build a grid. We have only one line. GM $<$ AM, so this shear is **not diagonalizable**, in any basis at all. (Chapter 6 shows the best we can do instead.)' },
            ],
            draw: (step, presses) => ({
              M: presses >= 1 ? SHEAR : ID,
              R: 4,
              items: [
                ...ARROWS.map((v, k) => ({ id: `l${k}`, span: v, fixed: true, kind: 's', o: 0.2 })),
                ...ARROWS.map((v, k) => ({ id: `a${k}`, vec: v, kind: k === 0 ? 'e' : 's', o: step >= 1 && k !== 0 ? 0.35 : 1 })),
                { id: 'ex', span: [1, 0], kind: 'e', fixed: true, o: step >= 1 ? 0.8 : 0 },
              ],
            }),
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Is $A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 1 & 2 & 0 \\\\ -3 & 5 & 2 \\end{pmatrix}$ diagonalizable?',
          body: 'Lower triangular, so the eigenvalues are on the diagonal.',
          graph: {
            steps: [
              { ask: 'AM of $\\lambda = 2$', answer: 2, tol: 0, hint: '$2$ appears twice on the diagonal.' },
              { ask: '$\\operatorname{rank}(A - 2I)$', answer: 2, tol: 0, hint: '$A - 2I = \\begin{pmatrix} -1 & 0 & 0 \\\\ 1 & 0 & 0 \\\\ -3 & 5 & 0 \\end{pmatrix}$: rows 1 and 3 are independent, row 2 is $-$row 1.' },
              { ask: 'GM of $\\lambda = 2$', answer: 1, tol: 0, hint: '$n - \\operatorname{rank} = 3 - 2$.' },
              { ask: 'So $A$ is', options: ['not diagonalizable (GM < AM)', 'diagonalizable'], answer: 0, hint: 'Only $1 + 1 = 2$ independent eigenvectors for a $3 \\times 3$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Use $B = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix} = PDP^{-1}$, $P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -2 \\end{pmatrix}$, $D = \\operatorname{diag}(5, 2)$, to find $B^5$.',
          body: '$P^{-1} = \\frac13\\begin{pmatrix} 2 & 1 \\\\ 1 & -1 \\end{pmatrix}$, so $B^k = \\frac13\\begin{pmatrix} 2 \\cdot 5^k + 2^k & 5^k - 2^k \\\\ 2 \\cdot 5^k - 2 \\cdot 2^k & 5^k + 2 \\cdot 2^k \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$5^5 = $', answer: 3125, tol: 0, hint: '$5^4 = 625$.' },
              { ask: 'Top-left of $B^5$', answer: 2094, tol: 0, hint: '$\\frac{2 \\cdot 3125 + 32}{3}$.' },
              { ask: 'Top-right of $B^5$', answer: 1031, tol: 0, hint: '$\\frac{3125 - 32}{3}$.' },
              { ask: 'Bottom-right of $B^5$', answer: 1063, tol: 0, hint: '$\\frac{3125 + 64}{3}$.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'A $3 \\times 3$ matrix has $|A - \\lambda I| = -(\\lambda - 4)^2(\\lambda + 1)$. Which are true?',
          options: [
            { text: 'It is diagonalizable iff $\\operatorname{rank}(A - 4I) = 1$', correct: true, why: 'GM$(4) = 3 - \\operatorname{rank}(A - 4I)$ must equal AM $= 2$.' },
            { text: 'It is definitely diagonalizable', why: 'Only if GM$(4) = 2$; a Jordan block is possible.' },
            { text: '$\\lambda = -1$ has exactly one independent eigenvector', correct: true, why: '$1 \\le$ GM $\\le$ AM $= 1$.' },
            { text: '$|A| = 16$', why: 'Product of eigenvalues: $4 \\cdot 4 \\cdot (-1) = -16$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Diagonalizing step by step: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
