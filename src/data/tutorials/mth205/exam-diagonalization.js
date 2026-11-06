// MTH 205 · Diagonalization · Exam practice: diagonalize 2 × 2 and 3 × 3 matrices (including a
// repeated eigenvalue that still works), decide diagonalizability, powers, and the proofs.

export default {
  id: 'exam-diagonalization',
  title: 'Exam practice: diagonalization',
  covers: 'Exam-style questions: diagonalizing 2 × 2 and 3 × 3 matrices, repeated eigenvalues with GM = AM, deciding diagonalizability, A^k from P D^k P⁻¹, definitions and proofs',
  minutes: 22,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Repeated eigenvalue', 'Still diagonalizable if its eigenspace has full dimension: GM $=$ AM.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Diagonalize $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$ and hence find $A^3$.',
          body: 'Eigenvalues $4, -1$ with eigenvectors $(2, 3)$, $(1, -1)$. Take $P = \\begin{pmatrix} 2 & 1 \\\\ 3 & -1 \\end{pmatrix}$, $D = \\operatorname{diag}(4, -1)$.',
          graph: {
            steps: [
              { ask: '$|P| = $', answer: -5, tol: 0, hint: '$2(-1) - 1(3)$.' },
              { ask: '$P^{-1} = -\\frac15\\begin{pmatrix} -1 & -1 \\\\ -3 & 2 \\end{pmatrix}$. Top-left entry of $P^{-1}$', answer: 0.2, tol: 0.001, hint: '$-\\frac15 \\cdot (-1)$.' },
              { ask: '$D^3 = \\operatorname{diag}(64, d)$ with $d = $', answer: -1, tol: 0, hint: '$(-1)^3$.' },
              { ask: 'Top-left of $A^3 = PD^3P^{-1}$', answer: 25, tol: 0, hint: '$\\frac15\\big(2 \\cdot 64 \\cdot 1 + 1 \\cdot (-1) \\cdot 3\\big) = \\frac{128 - 3}{5}$.' },
              { ask: 'Top-right of $A^3$', answer: 26, tol: 0, hint: '$\\frac15\\big(2 \\cdot 64 \\cdot 1 + 1 \\cdot (-1) \\cdot (-2)\\big) = \\frac{128 + 2}{5}$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Show that $B = \\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$ is diagonalizable even though an eigenvalue repeats.',
          graph: {
            steps: [
              { ask: 'Eigenvalues are $4$ and $1$; AM of $\\lambda = 1$ is', answer: 2, tol: 0, hint: 'Trace $6 = 4 + 1 + 1$.' },
              { ask: '$\\operatorname{rank}(B - I)$', answer: 1, tol: 0, hint: '$B - I$ is the all-ones matrix: every row is the same.' },
              { ask: 'GM of $\\lambda = 1$', answer: 2, tol: 0, hint: '$3 - 1$.' },
              { ask: 'One basis of $E_1$: $(1, -1, 0)$ and $(1, 0, c)$ with $c = $', answer: -1, tol: 0, hint: '$E_1$: $x + y + z = 0$.' },
              { ask: 'Conclusion', options: ['Diagonalizable: $P = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 0 \\\\ 1 & 0 & -1 \\end{pmatrix}$, $D = \\operatorname{diag}(4, 1, 1)$', 'Not diagonalizable'], answer: 0, hint: 'GM = AM for both eigenvalues.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Is $C = \\begin{pmatrix} 3 & 1 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 5 \\end{pmatrix}$ diagonalizable?',
          graph: {
            steps: [
              { ask: 'AM of $\\lambda = 3$', answer: 2, tol: 0, hint: 'Upper triangular: read the diagonal.' },
              { ask: '$\\operatorname{rank}(C - 3I)$', answer: 2, tol: 0, hint: '$C - 3I = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}$.' },
              { ask: 'GM of $\\lambda = 3$', answer: 1, tol: 0, hint: '$3 - 2$.' },
              { ask: 'Conclusion', options: ['Not diagonalizable', 'Diagonalizable'], answer: 0, hint: 'GM $<$ AM: the top-left $2 \\times 2$ corner is a shear.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Definitions and proofs',
      terms: [
        ['Key identity', '$A = PDP^{-1} \\Rightarrow A^k = PD^kP^{-1}$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'A square matrix $A$ is diagonalizable if',
          options: [
            { text: 'it is similar to a diagonal matrix', correct: true, why: 'There is an invertible $P$ with $P^{-1}AP$ diagonal.' },
            { text: 'it is diagonal', why: 'Diagonal matrices are diagonalizable, but so are many others.' },
            { text: 'its determinant is the product of its diagonal entries', why: 'True for triangular matrices; that isn’t the definition.' },
            { text: 'it equals its transpose', why: 'That is "symmetric".' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Show that if $P^{-1}AP = D$ then $A^k = PD^kP^{-1}$ for every positive integer $k$.',
          items: [
            'From $P^{-1}AP = D$: $A = PDP^{-1}$.',
            '$A^2 = (PDP^{-1})(PDP^{-1}) = PD(P^{-1}P)DP^{-1} = PD^2P^{-1}$.',
            'Suppose $A^k = PD^kP^{-1}$. Then $A^{k+1} = A^kA = PD^kP^{-1}PDP^{-1} = PD^{k+1}P^{-1}$.',
            'By induction, $A^k = PD^kP^{-1}$ for all $k \\ge 1$. ∎',
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Prove: if $A$ has $n$ linearly independent eigenvectors then $A$ is diagonalizable.',
          items: [
            'Let $P_1, \\dots, P_n$ be independent eigenvectors with $AP_i = \\lambda_iP_i$.',
            'Let $P = (P_1, \\dots, P_n)$ and $D = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n)$.',
            'Then $AP = (AP_1, \\dots, AP_n) = (\\lambda_1P_1, \\dots, \\lambda_nP_n) = PD$.',
            'The columns of $P$ are independent, so $P$ is invertible and $P^{-1}AP = D$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Fill the gap',
          prompt: 'Why is the matrix $P$ of eigenvectors invertible in the proof above?',
          options: [
            { text: 'Its columns are linearly independent', correct: true, why: 'Independent columns ⇔ nothing is crushed ⇔ $|P| \\neq 0$.' },
            { text: 'Eigenvectors are nonzero', why: 'Nonzero isn’t enough: two nonzero columns can still be parallel.' },
            { text: '$D$ is diagonal', why: 'That says nothing about $P$.' },
            { text: '$A$ is invertible', why: '$A$ may be singular; $P$ is invertible anyway.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which matrices are diagonalizable over $\\mathbb R$?',
          options: [
            { text: '$\\begin{pmatrix} 1 & 4 \\\\ 0 & 3 \\end{pmatrix}$', correct: true, why: 'Distinct eigenvalues $1, 3$.' },
            { text: '$\\begin{pmatrix} 5 & 0 \\\\ 0 & 5 \\end{pmatrix}$', correct: true, why: 'Already diagonal.' },
            { text: '$\\begin{pmatrix} 5 & 1 \\\\ 0 & 5 \\end{pmatrix}$', why: 'A shear: GM $= 1 <$ AM $= 2$.' },
            { text: '$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$', why: 'No real eigenvalues (a rotation).' },
            { text: '$\\begin{pmatrix} 2 & 3 \\\\ 3 & 2 \\end{pmatrix}$', correct: true, why: 'Symmetric, eigenvalues $5$ and $-1$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Diagonalization: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
