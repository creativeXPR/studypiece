// MTH 205 · Forms · Lesson 2: change of basis for bilinear forms (congruence PᵀAP, versus
// similarity P⁻¹AP for linear maps), alternating / skew-symmetric / symmetric forms, B symmetric ⇔
// its matrix is symmetric, diagonalizable forms, the characteristic of a field, and the theorem
// that symmetric forms are diagonalizable when char F ≠ 2 (with the Z₂ counterexample).

export default {
  id: 'symmetric-bilinear',
  title: 'Congruence and symmetric forms',
  covers: 'Change of basis for bilinear forms ψ_τ(B) = Pᵀψ_α(B)P, congruent matrices, alternating, skew-symmetric and symmetric bilinear forms, B symmetric iff its matrix is symmetric, diagonalizable bilinear forms are symmetric, the characteristic of a field, every symmetric bilinear form is diagonalizable when char F ≠ 2, and the counterexample over Z₂',
  minutes: 18,
  sections: [
    {
      name: 'Changing basis: congruence',
      terms: [
        ['Congruent', '$B$ is congruent to $A$ if $B = P^TAP$ for some invertible $P$.'],
        ['Change of basis', 'If $P$ changes $\\tau$-coordinates into $\\alpha$-coordinates, then $\\psi_\\tau(B) = P^T\\psi_\\alpha(B)P$. So matrices of the same bilinear form are **congruent**.'],
        ['Contrast', 'Linear map: $P^{-1}AP$ (similar). Bilinear form: $P^TAP$ (congruent). They agree when $P$ is orthogonal.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The matrix of a bilinear form $B$ in a basis $\\{v_1, \\dots, v_n\\}$ has entries',
          options: [
            { text: '$a_{ij} = B(v_i, v_j)$', correct: true, why: 'Feed the form every pair of basis vectors.' },
            { text: '$a_{ij} = B(v_i, v_i)$', why: 'That only fills the diagonal.' },
            { text: 'the coordinates of $B(v_i)$', why: 'A bilinear form needs **two** inputs and gives a number.' },
            { text: '$a_{ij} = v_i \\cdot v_j$', why: 'Only when $B$ is the dot product.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Forms · Lesson 2',
          title: 'Why bilinear forms use $P^T$ instead of $P^{-1}$',
          body: 'A linear map has **one** input and **one** output, both described in the same language. Change language and you translate in ($P$) and out ($P^{-1}$): $P^{-1}AP$.\n\nA bilinear form has **two inputs** and outputs a plain number, which needs no translating. So both inputs are translated **in**. If $[u]_\\alpha = P[u]_\\tau$ then\n$$B(u, v) = [u]_\\alpha^TA[v]_\\alpha = (P[u]_\\tau)^TA(P[v]_\\tau) = [u]_\\tau^T(P^TAP)[v]_\\tau.$$\nSo in the new basis the matrix is $P^TAP$. Matrices related this way are called ==congruent==. That’s the whole proof of the change-of-basis theorem.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'The form $2u_1v_1 + 3u_1v_2 + 4u_2v_1 - u_2v_2$ has standard matrix $A = \\begin{pmatrix} 2 & 3 \\\\ 4 & -1 \\end{pmatrix}$. Change to the basis $\\{(1, 1), (1, -1)\\}$ with $P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}$.',
          body: 'Compute $P^TAP$.',
          graph: {
            steps: [
              { ask: '$AP = \\begin{pmatrix} 5 & a \\\\ 3 & 5 \\end{pmatrix}$ with $a = $', answer: -1, tol: 0, hint: 'Row 1 of $A$ times column 2 of $P$: $2 - 3$.' },
              { ask: 'Top-left of $P^TAP$', answer: 8, tol: 0, hint: 'Column 1 of $P$ dotted with column 1 of $AP$: $5 + 3$.' },
              { ask: 'Top-right of $P^TAP$', answer: 4, tol: 0, hint: '$(1, 1) \\cdot (-1, 5)$.' },
              { ask: 'Bottom-right of $P^TAP$', answer: -6, tol: 0, hint: '$(1, -1) \\cdot (-1, 5)$.', done: 'Same as computing $B(v_i, v_j)$ directly ✓' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'Same form, congruent matrices.',
          recap: ['$\\psi_\\tau(B) = P^T\\psi_\\alpha(B)P$.'],
          why: 'Next: the forms that can be made diagonal.',
        },
      ],
    },
    {
      name: 'Symmetric forms',
      terms: [
        ['Alternating', '$B(u, u) = 0$ for every $u$. (The area form: a vector with itself spans no area.)'],
        ['Skew-symmetric', '$B(u, v) = -B(v, u)$ for all $u, v$.'],
        ['Symmetric', '$B(u, v) = B(v, u)$ for all $u, v$. Theorem: $B$ is symmetric $\\iff \\psi_\\alpha(B)$ is a symmetric matrix.'],
        ['Diagonalizable form', 'There is an ordered basis $\\alpha$ with $\\psi_\\alpha(B)$ diagonal. Corollary: a diagonalizable bilinear form is symmetric (the converse can fail).'],
        ['Characteristic', 'The least $n \\ge 1$ with $n \\cdot 1 = 0$ in $\\mathbb F$ (or $0$ if none). $\\mathbb Z_2$ has characteristic $2$ since $1 + 1 = 0$; $\\mathbb R$, $\\mathbb Q$, $\\mathbb C$ have characteristic $0$.'],
        ['Main theorem', 'If $\\operatorname{char}\\mathbb F \\neq 2$, every symmetric bilinear form on a finite-dimensional $V$ is diagonalizable. On a real inner product space the diagonalizing basis can be chosen orthonormal.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Why is that true?',
          title: 'Symmetric form ⇔ symmetric matrix',
          cards: [
            { title: '⇒', text: 'If $B$ is symmetric, then $a_{ij} = B(v_i, v_j) = B(v_j, v_i) = a_{ji}$. So $\\psi_\\alpha(B)$ is symmetric.' },
            { title: '⇐', text: 'If $A = A^T$: $B(u, v) = [u]^TA[v]$ is a $1 \\times 1$ matrix, equal to its own transpose: $([u]^TA[v])^T = [v]^TA^T[u] = [v]^TA[u] = B(v, u)$.' },
            { title: 'Diagonalizable ⇒ symmetric', text: 'If $\\psi_\\alpha(B) = D$ is diagonal, then $D$ is symmetric, so by ⇐, $B$ is symmetric.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The key lemma',
          title: 'A nonzero symmetric form gives some $B(v, v) \\neq 0$, unless $2 = 0$',
          body: 'To diagonalize a symmetric form we build the basis one vector at a time, and each time we need a $v$ with $B(v, v) \\neq 0$. Does one always exist?\n\nSuppose $B(v, v) = 0$ for **every** $v$. Expand $B(u + v, u + v)$ using bilinearity and symmetry:\n$$0 = B(u + v, u + v) = B(u, u) + 2B(u, v) + B(v, v) = 2B(u, v).$$\nIf we can divide by $2$, then $B(u, v) = 0$ for all $u, v$: $B = 0$. So a **nonzero** symmetric form must have some $B(v, v) \\neq 0$. That’s the lemma, and it is exactly where $\\operatorname{char}\\mathbb F \\neq 2$ is needed.\n\nWith it, pick such a $v_1$, restrict $B$ to the vectors $w$ with $B(v_1, w) = 0$ (one dimension less) and repeat: the matrix comes out diagonal.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'The counterexample',
          title: 'Over $\\mathbb F = \\mathbb Z_2$, let $B\\big((u_1, u_2), (v_1, v_2)\\big) = u_1v_2 + u_2v_1$. Show $B$ is symmetric but not diagonalizable.',
          graph: {
            steps: [
              { ask: 'Is $B$ symmetric?', options: ['Yes: swapping $u, v$ gives the same terms', 'No'], answer: 0, hint: '$u_1v_2 + u_2v_1 = v_1u_2 + v_2u_1$.' },
              { ask: '$B(u, u) = 2u_1u_2$. In $\\mathbb Z_2$ this equals', answer: 0, tol: 0, hint: '$2 = 1 + 1 = 0$ in $\\mathbb Z_2$.' },
              { ask: 'So any diagonal matrix of $B$ (entries $B(v_i, v_i)$) would be', options: ['the zero matrix', 'the identity'], answer: 0, hint: 'Every diagonal entry is some $B(v, v) = 0$.' },
              { ask: 'But $B\\big((1, 0), (0, 1)\\big) = $', answer: 1, tol: 0, hint: '$1 \\cdot 1 + 0 \\cdot 0$.', done: '$B \\neq 0$, so no basis makes it diagonal: symmetric but not diagonalizable' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'Why does "diagonalizable ⇒ symmetric" hold for bilinear forms, but "symmetric ⇒ diagonalizable" can fail?',
          options: [
            { text: 'Diagonal matrices are always symmetric; the converse needs $B(v, v) \\neq 0$ for some $v$, which can fail when $2 = 0$', correct: true, why: 'In characteristic $2$, $B(u + v, u + v) = 2B(u, v)$ says nothing.' },
            { text: 'Symmetric matrices can’t be diagonal', why: 'Diagonal matrices are symmetric.' },
            { text: 'Because $P^TAP$ is never diagonal', why: 'Over $\\mathbb R$ it always can be, for symmetric $A$.' },
            { text: 'It never fails', why: 'The $\\mathbb Z_2$ example fails.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Classify the area form $B(u, v) = u_1v_2 - u_2v_1$ on $\\mathbb R^2$.',
          options: [
            { text: 'Alternating', correct: true, why: '$B(u, u) = u_1u_2 - u_2u_1 = 0$.' },
            { text: 'Skew-symmetric', correct: true, why: '$B(v, u) = v_1u_2 - v_2u_1 = -B(u, v)$.' },
            { text: 'Symmetric', why: 'Swapping changes the sign.' },
            { text: 'Diagonalizable', why: 'Diagonalizable forms are symmetric; this one isn’t.' },
          ],
        },
        {
          type: 'finish',
          title: 'Congruence and symmetric forms: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
