// MTH 205 · Eigenvalues · Exam practice: eigenvalues and eigenvectors (2 × 2 and 3 × 3),
// Cayley–Hamilton, minimal polynomials, similarity proofs and definitions.

export default {
  id: 'exam-eigen',
  title: 'Exam practice: eigenvalues',
  covers: 'Exam-style questions: eigenvalues and eigenvectors of 2 × 2 and 3 × 3 matrices, eigenspaces, verifying Cayley–Hamilton, inverses and powers from it, minimal polynomials, proofs about similar matrices and eigenvalues, definitions',
  minutes: 24,
  sections: [
    {
      name: 'Calculations',
      terms: [
        ['Recipe', '$|A - \\lambda I| = 0$ → eigenvalues; for each, solve $(A - \\lambda I)v = 0$ → eigenspace basis.'],
        ['Checks', 'Sum of eigenvalues $= \\operatorname{tr}A$, product $= |A|$; substitute each eigenvector back.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'The eigen-questions you will meet',
          body: 'Three kinds keep coming back: **find** the eigenvalues and eigenvectors, **use** Cayley–Hamilton or the minimal polynomial, and **prove** a short theorem.\n\nFor every calculation keep the picture in mind: you are hunting for the directions the matrix only stretches, and $|A - \\lambda I| = 0$ is the squash test that finds the stretch factors.',
          cta: 'Start',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 1',
          title: 'Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$|A - \\lambda I| = \\lambda^2 - 3\\lambda + c$ with $c = $', answer: -4, tol: 0, hint: '$c = \\det A = 2 - 6$.' },
              { ask: 'Larger eigenvalue', answer: 4, tol: 0, hint: '$(\\lambda - 4)(\\lambda + 1)$.' },
              { ask: 'Smaller eigenvalue', answer: -1, tol: 0, hint: 'The other root.' },
              { ask: 'For $\\lambda = 4$, eigenvector $(2, y)$ with $y = $', answer: 3, tol: 0, hint: '$A - 4I = \\begin{pmatrix} -3 & 2 \\\\ 3 & -2 \\end{pmatrix}$: $-3x + 2y = 0$.' },
              { ask: 'For $\\lambda = -1$, eigenvector $(1, y)$ with $y = $', answer: -1, tol: 0, hint: '$A + I = \\begin{pmatrix} 2 & 2 \\\\ 3 & 3 \\end{pmatrix}$: $x + y = 0$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 2',
          title: 'Determine the eigenvalues and eigenvectors of $A = \\begin{pmatrix} -1 & -1 & 1 \\\\ -4 & 2 & 4 \\\\ -1 & 1 & 5 \\end{pmatrix}$.',
          body: 'Expand $|A - \\lambda I|$ carefully; the trace check is $\\lambda_1 + \\lambda_2 + \\lambda_3 = 6$.',
          graph: {
            steps: [
              { ask: '$|A| = $ (product of the eigenvalues)', answer: -24, tol: 0, hint: '$-1(10 - 4) + 1(-20 + 4) + 1(-4 + 2)$.' },
              { ask: 'The eigenvalues are $-2$, $2$ and', answer: 6, tol: 0, hint: 'Trace $6$: $-2 + 2 + \\lambda = 6$.' },
              { ask: 'For $\\lambda = -2$, eigenvector $(1, y, 0)$ with $y = $', answer: 1, tol: 0, hint: 'Row 1 of $A + 2I$: $x - y + z = 0$; row 3: $-x + y + 7z = 0$, so $z = 0$.' },
              { ask: 'For $\\lambda = 2$, eigenvector $(1, y, 1)$ with $y = $', answer: -2, tol: 0, hint: 'Row 1 of $A - 2I$: $-3x - y + z = 0$.' },
              { ask: 'For $\\lambda = 6$, eigenvector $(0, 1, z)$ with $z = $', answer: 1, tol: 0, hint: 'Row 1 of $A - 6I$: $-7x - y + z = 0$ with $x = 0$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Given $A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 2 \\end{pmatrix}$, verify that $A$ satisfies its characteristic equation and hence find $A^{-1}$.',
          graph: {
            steps: [
              { ask: '$p(\\lambda) = \\lambda^2 - 5\\lambda + c$ with $c = $', answer: 4, tol: 0, hint: '$\\det A = 6 - 2$.' },
              { ask: '$A^2 = \\begin{pmatrix} 11 & 5 \\\\ 10 & d \\end{pmatrix}$ with $d = $', answer: 6, tol: 0, hint: '$2 \\cdot 1 + 2 \\cdot 2$.' },
              { ask: 'Top-left of $A^2 - 5A + 4I$', answer: 0, tol: 0, hint: '$11 - 15 + 4$.', done: '$A^2 - 5A + 4I = 0$ ✓' },
              { ask: '$A^{-1} = \\frac14(5I - A)$. Top-left entry', answer: 0.5, tol: 0.001, hint: '$\\frac14(5 - 3)$.' },
              { ask: 'Bottom-left entry of $A^{-1}$', answer: -0.5, tol: 0.001, hint: '$\\frac14(0 - 2)$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Find the minimal polynomial of $B = \\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$|B| = $', answer: 4, tol: 0, hint: '$2(3) - 1(1) + 1(-1)$.' },
              { ask: 'Eigenvalue with eigenvector $(1, 1, 1)$', answer: 4, tol: 0, hint: 'Each row sums to $4$.' },
              { ask: 'The other eigenvalue (double)', answer: 1, tol: 0, hint: 'Trace $6 = 4 + \\lambda + \\lambda$.' },
              { ask: 'Is $(B - I)(B - 4I) = 0$?', options: ['Yes, so $m = (\\lambda - 1)(\\lambda - 4)$', 'No, so $m = (\\lambda - 1)^2(\\lambda - 4)$'], answer: 0, hint: '$B - I$ is all ones; $(B - I)(B - 4I)$: row $(1,1,1)$ times column $(-2, 1, 1)$ is $0$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Definitions and proofs',
      terms: [
        ['Eigenvalue of $T$', '$\\lambda \\in \\mathbb F$ with $T(v) = \\lambda v$ for some $v \\neq 0$.'],
        ['Characteristic polynomial', '$P_A(\\lambda) = |A - \\lambda I_n|$; its roots are the eigenvalues.'],
        ['Number of eigenvalues', 'An $n \\times n$ matrix has $n$ eigenvalues counted with multiplicity (over $\\mathbb C$): the degree of $P_A$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'Let $T: V \\to V$ be linear. A scalar $\\lambda$ is an eigenvalue of $T$ if',
          options: [
            { text: 'there is $v \\neq 0$ in $V$ with $T(v) = \\lambda v$', correct: true, why: '$v$ is then an eigenvector (characteristic vector).' },
            { text: '$T(v) = \\lambda v$ for every $v$', why: 'That makes $T = \\lambda I$, far too strong.' },
            { text: '$T(0) = \\lambda 0$', why: 'True for every $\\lambda$; that’s why $v \\neq 0$ is required.' },
            { text: '$|T| = \\lambda$', why: 'The determinant is the **product** of the eigenvalues.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Definition',
          prompt: 'Matrices $A, B \\in M_n(\\mathbb F)$ are similar if',
          options: [
            { text: '$B = P^{-1}AP$ for some $P \\in GL_n(\\mathbb F)$', correct: true, why: 'Same transformation in another basis (equivalently $B = PAP^{-1}$, using $P^{-1}$ instead).' },
            { text: '$B = P^TAP$ for some invertible $P$', why: 'That is **congruence**, which comes up with bilinear forms (Ch 5).' },
            { text: 'they have the same eigenvalues', why: 'Necessary, but not enough: $\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$ and $2I$ share eigenvalues but are not similar.' },
            { text: '$AB = BA$', why: 'That is "commuting", not similarity.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Prove that $A$ and $A^T$ have the same characteristic polynomial.',
          items: [
            '$(A - \\lambda I_n)^T = A^T - \\lambda I_n^T = A^T - \\lambda I_n$.',
            'A matrix and its transpose have the same determinant.',
            'So $P_{A^T}(\\lambda) = |A^T - \\lambda I_n| = |(A - \\lambda I_n)^T| = |A - \\lambda I_n|$.',
            'Hence $P_{A^T}(\\lambda) = P_A(\\lambda)$. ∎',
          ],
        },
        {
          type: 'order',
          eyebrow: 'Proof',
          prompt: 'Prove that similarity is **symmetric**.',
          items: [
            'Suppose $A$ is similar to $B$: $B = P^{-1}AP$ with $P \\in GL_n(\\mathbb F)$.',
            'Premultiply by $P$ and postmultiply by $P^{-1}$: $PBP^{-1} = A$.',
            'Write $Q = P^{-1} \\in GL_n(\\mathbb F)$; then $A = Q^{-1}BQ$.',
            'So $B$ is similar to $A$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Fill the gap',
          prompt: 'In proving "$\\lambda$ eigenvalue of $T$ ⇒ $\\lambda^2$ eigenvalue of $T^2$": $T^2(v) = T(T(v)) = T(\\lambda v) = \\;?$',
          options: [
            { text: '$\\lambda T(v) = \\lambda^2 v$, by linearity of $T$', correct: true, why: 'Scalars come out of linear maps.' },
            { text: '$T(\\lambda)T(v)$', why: '$T$ acts on vectors, not on the scalar $\\lambda$.' },
            { text: '$\\lambda^2 T(v)$', why: 'One $\\lambda$ comes out by linearity, the other from $T(v) = \\lambda v$.' },
            { text: '$2\\lambda v$', why: 'Applying twice **multiplies** the stretch.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Every square matrix satisfies its characteristic equation', correct: true, why: 'Cayley–Hamilton.' },
            { text: 'The minimal polynomial divides the characteristic polynomial', correct: true, why: 'Division-algorithm proof.' },
            { text: '$A$ is invertible iff $0$ is not an eigenvalue', correct: true, why: '$|A| = $ product of eigenvalues; $\\lambda = 0$ means something is crushed.' },
            { text: 'Similar matrices have the same eigenvectors', why: '**False:** same eigenvalues, but the eigenvectors are translated by $P^{-1}$.' },
            { text: 'The minimal and characteristic polynomials always coincide', why: '**False:** $\\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$ has $m$ of degree $2$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Eigenvalues: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
