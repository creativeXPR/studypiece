// MTH 205 · Jordan form · Exam practice: Jordan forms from ranks, chains and Q, possible Jordan
// forms from the characteristic and minimal polynomials, diagonalizability, definitions and proofs.

export default {
  id: 'exam-jordan',
  title: 'Exam practice: Jordan form',
  covers: 'Exam-style questions: Jordan canonical form of 2 × 2 and 3 × 3 matrices, Jordan chains and the matrix Q, possible Jordan forms from given polynomials, the diagonalizability conditions, definitions and proofs about generalized eigenspaces',
  minutes: 22,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Blocks', 'Number $= n - \\operatorname{rank}(A - \\lambda I)$; sizes $\\ge k$: $r_{k-1} - r_k$.'],
        ['Chain', '$v_1 = (A - \\lambda I)v_2$, with $v_2$ not in $\\ker(A - \\lambda I)$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Find the Jordan form $J$ of $A = \\begin{pmatrix} 5 & -1 \\\\ 4 & 1 \\end{pmatrix}$ and a matrix $Q$ with $Q^{-1}AQ = J$.',
          graph: {
            steps: [
              { ask: '$\\operatorname{tr}A = $', answer: 6, tol: 0, hint: '$5 + 1$.' },
              { ask: '$|A| = $', answer: 9, tol: 0, hint: '$5 + 4$.' },
              { ask: 'So $(\\lambda - 3)^2$: the eigenvalue is', answer: 3, tol: 0, hint: '$\\lambda^2 - 6\\lambda + 9$.' },
              { ask: '$\\operatorname{rank}(A - 3I)$', answer: 1, tol: 0, hint: '$A - 3I = \\begin{pmatrix} 2 & -1 \\\\ 4 & -2 \\end{pmatrix}$: rows proportional.' },
              { ask: 'So $J = $', options: ['$\\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$', '$\\begin{pmatrix} 3 & 0 \\\\ 0 & 3 \\end{pmatrix}$'], answer: 0, hint: 'GM $= 2 - 1 = 1$: one block.' },
              { ask: 'Chain: $v_2 = (1, 0)$, $v_1 = (A - 3I)v_2 = (2, b)$ with $b = $', answer: 4, tol: 0, hint: 'First column of $A - 3I$.', done: '$Q = \\begin{pmatrix} 2 & 1 \\\\ 4 & 0 \\end{pmatrix}$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Find the Jordan form of $A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$ and its minimal polynomial.',
          graph: {
            steps: [
              { ask: 'AM of $\\lambda = 2$', answer: 2, tol: 0, hint: 'Read the diagonal.' },
              { ask: '$\\operatorname{rank}(A - 2I)$', answer: 2, tol: 0, hint: '$A - 2I = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$.' },
              { ask: 'GM of $\\lambda = 2$', answer: 1, tol: 0, hint: '$3 - 2$.' },
              { ask: '$J$ is', options: ['$J_2(2) \\oplus (3)$, i.e. $A$ itself', '$\\operatorname{diag}(2, 2, 3)$', '$J_3(2)$'], answer: 0, hint: 'One block of size $2$ for $\\lambda = 2$, and $(3)$.' },
              { ask: 'Degree of the minimal polynomial', answer: 3, tol: 0, hint: '$m = (\\lambda - 2)^2(\\lambda - 3)$: largest $2$-block has size $2$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'A $5 \\times 5$ matrix has only the eigenvalue $\\lambda = 0$, with $\\operatorname{rank}A = 3$, $\\operatorname{rank}A^2 = 1$, $\\operatorname{rank}A^3 = 0$. Find its Jordan form.',
          graph: {
            steps: [
              { ask: 'Number of blocks $= 5 - r_1 = $', answer: 2, tol: 0, hint: '$5 - 3$.' },
              { ask: 'Blocks of size $\\ge 2$: $r_1 - r_2 = $', answer: 2, tol: 0, hint: '$3 - 1$.' },
              { ask: 'Blocks of size $\\ge 3$: $r_2 - r_3 = $', answer: 1, tol: 0, hint: '$1 - 0$.' },
              { ask: 'So the block sizes are', options: ['$3$ and $2$', '$3, 1, 1$', '$2, 2, 1$'], answer: 0, hint: 'Two blocks, both $\\ge 2$, one $\\ge 3$, total $5$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Definitions and proofs',
      terms: [
        ['Conditions', '$T$ diagonalizable $\\iff$ the characteristic polynomial splits and, for each $\\lambda$, its multiplicity equals $\\operatorname{nullity}(T - \\lambda I)$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'The generalized eigenspace of $T$ for $\\lambda$ is',
          options: [
            { text: '$K_\\lambda = \\{v : (T - \\lambda I)^pv = 0 \\text{ for some positive integer } p\\}$', correct: true, why: 'Everything crushed eventually by $T - \\lambda I$.' },
            { text: '$E_\\lambda = \\{v : Tv = \\lambda v\\}$', why: 'That is the (ordinary) eigenspace, the case $p = 1$.' },
            { text: '$\\{v : Tv = 0\\}$', why: 'That is the kernel of $T$.' },
            { text: 'the span of all eigenvectors of $T$', why: 'That mixes different eigenvalues.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'A subspace $W$ of $V$ is $T$-invariant if',
          options: [
            { text: '$T(W) \\subseteq W$', correct: true, why: '$T$ never takes a vector of $W$ outside $W$.' },
            { text: '$T(w) = w$ for every $w \\in W$', why: 'That is "fixed pointwise", much stronger.' },
            { text: '$T(W) = V$', why: 'That says $T$ maps $W$ onto everything.' },
            { text: '$W = \\ker T$', why: 'Kernels are invariant, but so are many other subspaces.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Show that the eigenspace $E_\\lambda$ is $T$-invariant.',
          items: [
            'Let $v \\in E_\\lambda$, so $T(v) = \\lambda v$.',
            'Then $T(T(v)) = T(\\lambda v) = \\lambda T(v)$ by linearity.',
            'So $T(v)$ satisfies $T(w) = \\lambda w$ with $w = T(v)$, i.e. $T(v) \\in E_\\lambda$.',
            'Hence $T(E_\\lambda) \\subseteq E_\\lambda$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Fill the gap',
          prompt: 'In a Jordan chain $v_1, \\dots, v_s$ for $\\lambda$ (with $(A - \\lambda I)v_{i} = v_{i-1}$, $v_0 = 0$), column $i$ of $AQ$ equals',
          options: [
            { text: '$Av_i = \\lambda v_i + v_{i-1}$: a $\\lambda$ on the diagonal and a $1$ just above it in $J$', correct: true, why: 'That is exactly the Jordan block pattern.' },
            { text: '$Av_i = \\lambda v_i$', why: 'Only for $v_1$, the eigenvector.' },
            { text: '$Av_i = v_{i+1}$', why: 'The chain goes **down**: $(A - \\lambda I)v_i = v_{i-1}$.' },
            { text: '$Av_i = 0$', why: 'Only if $\\lambda = 0$ and $i = 1$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which are true for a matrix whose characteristic polynomial splits?',
          options: [
            { text: 'The number of Jordan blocks for $\\lambda$ equals $\\dim E_\\lambda$', correct: true, why: 'Each chain contributes one eigenvector.' },
            { text: 'The sizes of the $\\lambda$-blocks add up to the algebraic multiplicity', correct: true, why: 'They fill $K_\\lambda$, of dimension AM.' },
            { text: 'The largest $\\lambda$-block’s size is the exponent of $(\\lambda - \\lambda_i)$ in the minimal polynomial', correct: true, why: 'A size-$s$ block needs $(J - \\lambda I)^s$ to vanish.' },
            { text: 'Two matrices with the same characteristic polynomial have the same Jordan form', why: '**False:** $J_2(3)$ and $\\operatorname{diag}(3, 3)$ share $(\\lambda - 3)^2$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Jordan form: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
