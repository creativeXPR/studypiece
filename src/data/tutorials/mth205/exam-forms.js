// MTH 205 · Forms · Exam practice: matrices of bilinear forms, congruence, polarization, matrices of
// quadratic forms, reduction to principal axes, definitions and proofs.

export default {
  id: 'exam-forms',
  title: 'Exam practice: bilinear and quadratic forms',
  covers: 'Exam-style questions: matrix of a bilinear form in a basis, congruence, symmetric and skew forms, polarization, matrix of a quadratic form, reduction to a sum of squares, definitions and proofs',
  minutes: 22,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Matrix in a basis', '$a_{ij} = B(v_i, v_j)$, or $P^TAP$ from the standard matrix.'],
        ['Quadratic form', 'Diagonal = squares; off-diagonal = half the cross terms.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Let $B(u, v) = u_1v_1 - 2u_1v_2 + 3u_2v_1 + u_2v_2$ on $\\mathbb R^2$. Find $\\psi_\\alpha(B)$ for $\\alpha = \\{(1, 0), (1, 1)\\}$.',
          graph: {
            steps: [
              { ask: '$B(v_1, v_1) = $', answer: 1, tol: 0, hint: '$u = v = (1, 0)$: only $u_1v_1$ survives.' },
              { ask: '$B(v_1, v_2) = $', answer: -1, tol: 0, hint: '$u = (1, 0)$, $v = (1, 1)$: $1 - 2$.' },
              { ask: '$B(v_2, v_1) = $', answer: 4, tol: 0, hint: '$u = (1, 1)$, $v = (1, 0)$: $1 + 3$.' },
              { ask: '$B(v_2, v_2) = $', answer: 3, tol: 0, hint: '$1 - 2 + 3 + 1$.', done: '$\\psi_\\alpha(B) = \\begin{pmatrix} 1 & -1 \\\\ 4 & 3 \\end{pmatrix}$' },
              { ask: 'Is $B$ symmetric?', options: ['No: the matrix isn’t symmetric', 'Yes'], answer: 0, hint: '$-1 \\neq 4$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'For $q(x, y) = x^2 + 4xy + 3y^2$, use polarization to find $B\\big((1, 0), (0, 1)\\big)$.',
          graph: {
            steps: [
              { ask: '$q(1, 1) = $', answer: 8, tol: 0, hint: '$1 + 4 + 3$.' },
              { ask: '$q(1, 0) + q(0, 1) = $', answer: 4, tol: 0, hint: '$1 + 3$.' },
              { ask: '$B = \\frac12(8 - 4) = $', answer: 2, tol: 0, hint: 'It equals $a_{12}$: half of the cross coefficient $4$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Reduce $q = 2x^2 - 4xy - y^2$ to a sum of squares and name the curve $q = 6$.',
          graph: {
            steps: [
              { ask: '$A = \\begin{pmatrix} 2 & a \\\\ a & -1 \\end{pmatrix}$, $a = $', answer: -2, tol: 0, hint: 'Half of $-4$.' },
              { ask: 'Positive eigenvalue', answer: 3, tol: 0, hint: '$\\lambda^2 - \\lambda - 6 = (\\lambda - 3)(\\lambda + 2)$.' },
              { ask: 'Negative eigenvalue', answer: -2, tol: 0, hint: 'The other root.' },
              { ask: 'Eigenvector for $\\lambda = 3$: $(2, y)$ with $y = $', answer: -1, tol: 0, hint: '$A - 3I$: $-x - 2y = 0$.' },
              { ask: '$q = 3X^2 - 2Y^2 = 6$ is', options: ['a hyperbola', 'an ellipse', 'a pair of points'], answer: 0, hint: 'Opposite signs.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Find the symmetric matrix $A$ of $q = x^2 + 2y^2 - z^2 + 6xy - 4yz$.',
          graph: {
            steps: [
              { ask: '$a_{12} = $', answer: 3, tol: 0, hint: 'Half of $6$.' },
              { ask: '$a_{13} = $', answer: 0, tol: 0, hint: 'There is no $xz$ term.' },
              { ask: '$a_{23} = $', answer: -2, tol: 0, hint: 'Half of $-4$.' },
              { ask: '$a_{33} = $', answer: -1, tol: 0, hint: 'Coefficient of $z^2$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Definitions and proofs',
      terms: [
        ['Congruent', '$B = P^TAP$, $P$ invertible.'],
        ['Quadratic form', '$q(v) = B(v, v)$, $B$ symmetric bilinear.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'Let $V$ be a vector space over $\\mathbb F$. A bilinear form on $V$ is a map $B: V \\times V \\to \\mathbb F$ such that',
          options: [
            { text: 'it is linear in each variable when the other is held fixed', correct: true, why: '$B(au_1 + bu_2, v) = aB(u_1, v) + bB(u_2, v)$ and similarly in $v$.' },
            { text: '$B(u, v) = B(v, u)$', why: 'That is the extra condition for **symmetric** forms.' },
            { text: '$B(v, v) > 0$ for $v \\neq 0$', why: 'Positivity belongs to inner products.' },
            { text: '$B(u + v, w + s) = B(u, w) + B(v, s)$', why: 'Bilinearity gives four terms, not two.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Prove: if $\\psi_\\alpha(B) = A$ and $P$ changes $\\tau$-coordinates to $\\alpha$-coordinates, then $\\psi_\\tau(B) = P^TAP$.',
          items: [
            'For all $u, v$: $[u]_\\alpha = P[u]_\\tau$ and $[v]_\\alpha = P[v]_\\tau$.',
            '$B(u, v) = [u]_\\alpha^TA[v]_\\alpha = (P[u]_\\tau)^TA(P[v]_\\tau)$.',
            '$= [u]_\\tau^T(P^TAP)[v]_\\tau$ for all $u, v$.',
            'The matrix of $B$ in $\\tau$ is unique, so $\\psi_\\tau(B) = P^TAP$: the two matrices are congruent. ∎',
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Prove: a diagonalizable bilinear form on a finite-dimensional space is symmetric.',
          items: [
            'Let $\\alpha$ be a basis with $\\psi_\\alpha(B) = D$ diagonal.',
            'A diagonal matrix is symmetric: $D^T = D$.',
            'For any $u, v$: $B(u, v) = [u]^TD[v]$, a $1 \\times 1$ matrix equal to its transpose $[v]^TD^T[u] = [v]^TD[u] = B(v, u)$.',
            'So $B$ is symmetric. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Fill the gap',
          prompt: 'To prove $\\psi_\\alpha$ is injective: if $\\psi_\\alpha(B) = 0$ then $B(v_i, v_j) = 0$ for all $i, j$, so for $u = \\sum a_iv_i$, $w = \\sum b_jv_j$:',
          options: [
            { text: '$B(u, w) = \\sum_{i, j}a_ib_jB(v_i, v_j) = 0$, so $B = 0$', correct: true, why: 'Bilinearity spreads $B$ over all pairs of basis vectors.' },
            { text: '$B(u, w) = B(u, u)$', why: 'There is no reason for that.' },
            { text: '$u = w = 0$', why: '$u, w$ are arbitrary.' },
            { text: '$\\det\\psi_\\alpha(B) \\neq 0$', why: 'The matrix is zero, so its determinant is $0$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which are true?',
          options: [
            { text: 'Congruent matrices represent the same bilinear form in different bases', correct: true, why: '$\\psi_\\tau(B) = P^T\\psi_\\alpha(B)P$.' },
            { text: 'Similar matrices represent the same bilinear form in different bases', why: '**False:** bilinear forms change by $P^TAP$; similar matrices represent the same **linear map**.' },
            { text: '$\\dim\\mathcal B(V) = n^2$ when $\\dim V = n$', correct: true, why: '$\\mathcal B(V) \\cong M_{n \\times n}(\\mathbb F)$.' },
            { text: 'Over $\\mathbb R$, every symmetric bilinear form is diagonalizable', correct: true, why: '$\\operatorname{char}\\mathbb R = 0 \\neq 2$.' },
            { text: 'Over $\\mathbb Z_2$, every symmetric bilinear form is diagonalizable', why: '**False:** $u_1v_2 + u_2v_1$ is a counterexample.' },
          ],
        },
        {
          type: 'finish',
          title: 'Forms: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
