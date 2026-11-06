// MTH 205 · Mock Exam: six written questions across the course on a 60-minute clock. For each: the
// question (answer it on paper, including the proof part), a step check of the key numbers, then a
// model answer with the points that earn marks.

const question = (n, text, note) => ({ type: 'story', eyebrow: 'Mock exam', title: `Question ${n}`, body: `${text}${note ? `\n\n${note}` : ''}\n\nWrite your full answer on paper, then check it.`, cta: 'Check my answer' });
const check = (steps) => ({ type: 'custom', widget: 'calc', eyebrow: 'Check the key numbers', title: 'Enter your answers step by step', graph: { clock: true, steps } });
const model = (title, body) => ({ type: 'story', eyebrow: 'Model answer', title, body });

export default {
  id: 'mock-exam',
  title: 'Mock exam',
  covers: 'Six exam-style written questions covering systems of equations, eigenvalues and Cayley–Hamilton, minimal polynomials and diagonalization, inner products and orthogonal diagonalization, bilinear and quadratic forms, and Jordan form, each with a proof, on a 60-minute clock, with step checks and model answers',
  minutes: 60,
  sections: [
    {
      name: 'Before you start',
      terms: [
        ['Exam method', 'State the method, show every reduction, conclude in words. Proofs: say what you assume, what you show, and why each line follows.'],
        ['Checks', 'Trace $=$ sum of eigenvalues, determinant $=$ product; substitute solutions and eigenvectors back; check $AQ = QJ$ instead of inverting.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Mock exam',
          title: 'Six questions, one hour, like the real thing',
          body: 'This mock covers the whole course, with a proof in every question. For each one:\n\n**1.** Read it and answer it **on paper**, with full working, as in the exam. No peeking at the lessons.\n\n**2.** Enter your key numbers step by step to check them.\n\n**3.** Compare with the **model answer** and its marking points.\n\nAim to finish within **60 minutes**.',
          asides: [{ label: 'Exam tip', text: 'Picture each question before you compute: what is crushed, what is reachable, which directions only stretch. A picture tells you the shape of the answer and catches mistakes.' }],
        },
        { type: 'custom', widget: 'mockClock', eyebrow: 'Ready?', title: 'Start the clock' },
        { type: 'bridge', title: 'Clock running.', recap: ['Answer on paper first.', 'Then check the numbers and read the model answer.'], why: 'Question 1 is next.' },
      ],
    },
    {
      name: 'Questions 1–2',
      terms: [
        ['Cramer', '$x_i = D_i / D$.'],
        ['Cayley–Hamilton', '$p(A) = 0$.'],
      ],
      screens: [
        question(1, '(a) Define a consistent system of linear equations, and state the rank condition for consistency.\n\n(b) Show that $x + 2y + z = 3$, $2x + 5y - z = -4$, $3x - 2y - z = 5$ has a unique solution and find it by Cramer’s rule.\n\n(c) Prove that if $A^{-1}$ exists, $AX = B$ has exactly one solution.'),
        check([
          { ask: '$D = |A| = $', answer: -28, tol: 0, hint: '$1(-5 - 2) - 2(-2 + 3) + 1(-4 - 15)$.' },
          { ask: '$D_x = $', answer: -56, tol: 0, hint: 'Replace column 1 by $(3, -4, 5)$.' },
          { ask: '$x = $', answer: 2, tol: 0, hint: '$D_x / D$.' },
          { ask: '$D_y = $', answer: 28, tol: 0, hint: 'Replace column 2 by $(3, -4, 5)$.' },
          { ask: '$y = $', answer: -1, tol: 0, hint: '$D_y / D$.' },
          { ask: '$z = $', answer: 3, tol: 0, hint: '$D_z = -84$; or substitute into equation 1.' },
        ]),
        model('Question 1', '**(a)** A system is **consistent** if it has at least one solution. $AX = B$ is consistent iff $\\operatorname{rank}A = \\operatorname{rank}(A|B)$.\n\n**(b)** $D = -28 \\neq 0$, so the solution is unique. $D_x = -56$, $D_y = 28$, $D_z = -84$, so $x = 2$, $y = -1$, $z = 3$. Check: $2 - 2 + 3 = 3$ ✓.\n\n**(c)** Premultiply $AX = B$ by $A^{-1}$: $X = A^{-1}B$, which is a solution since $A(A^{-1}B) = B$. If $AX_1 = AX_2 = B$ then premultiplying $AX_1 = AX_2$ by $A^{-1}$ gives $X_1 = X_2$. ∎\n\n**Marks for:** both definitions; $D \\neq 0$ stated; each $D_i$; the existence **and** uniqueness parts of the proof.'),
        question(2, '(a) Define an eigenvalue and an eigenvector of a linear map $T: V \\to V$.\n\n(b) Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix} 4 & 1 \\\\ -2 & 1 \\end{pmatrix}$.\n\n(c) Verify the Cayley–Hamilton theorem for $A$ and use it to find $A^{-1}$.\n\n(d) Prove that $\\lambda$ is an eigenvalue of $A$ iff $|A - \\lambda I| = 0$.'),
        check([
          { ask: '$|A - \\lambda I| = \\lambda^2 - 5\\lambda + c$, $c = $', answer: 6, tol: 0, hint: '$\\det A = 4 + 2$.' },
          { ask: 'Smaller eigenvalue', answer: 2, tol: 0, hint: '$(\\lambda - 2)(\\lambda - 3)$.' },
          { ask: 'Eigenvector for $\\lambda = 2$: $(1, y)$, $y = $', answer: -2, tol: 0, hint: '$A - 2I$: $2x + y = 0$.' },
          { ask: 'Eigenvector for $\\lambda = 3$: $(1, y)$, $y = $', answer: -1, tol: 0, hint: '$A - 3I$: $x + y = 0$.' },
          { ask: '$A^2 = \\begin{pmatrix} 14 & 5 \\\\ -10 & d \\end{pmatrix}$, $d = $', answer: -1, tol: 0, hint: '$-2 \\cdot 1 + 1 \\cdot 1$.' },
          { ask: '$A^{-1} = \\frac16(5I - A)$: top-left entry', answer: 0.1667, tol: 0.002, hint: '$\\frac16(5 - 4)$.' },
        ]),
        model('Question 2', '**(a)** $\\lambda \\in \\mathbb F$ is an eigenvalue of $T$ if $T(v) = \\lambda v$ for some $v \\neq 0$; such $v$ is an eigenvector.\n\n**(b)** $\\lambda^2 - 5\\lambda + 6 = 0$: $\\lambda = 2$ with $v = k(1, -2)$; $\\lambda = 3$ with $v = k(1, -1)$, $k \\neq 0$.\n\n**(c)** $A^2 - 5A + 6I = \\begin{pmatrix} 14 - 20 + 6 & 5 - 5 \\\\ -10 + 10 & -1 - 5 + 6 \\end{pmatrix} = 0$ ✓. So $A(5I - A) = 6I$ and $A^{-1} = \\frac16\\begin{pmatrix} 1 & -1 \\\\ 2 & 4 \\end{pmatrix}$.\n\n**(d)** $\\lambda$ eigenvalue $\\iff \\exists v \\neq 0$, $Av = \\lambda v \\iff (A - \\lambda I)v = 0$ has a nonzero solution $\\iff A - \\lambda I$ is singular $\\iff |A - \\lambda I| = 0$. ∎\n\n**Marks for:** $v \\neq 0$ in the definition; the characteristic equation; eigenvectors as families; the C–H check; each "iff" link justified.'),
        { type: 'bridge', title: 'Two down.', recap: ['Systems and eigenvalues done.'], why: 'Next: diagonalization and inner products.' },
      ],
    },
    {
      name: 'Questions 3–4',
      terms: [
        ['Minimal polynomial', 'Smallest monic $m$ with $m(A) = 0$.'],
        ['Orthogonal diagonalization', '$P^TAP = D$, $P$ orthogonal.'],
      ],
      screens: [
        question(3, 'Let $A = \\begin{pmatrix} 3 & 1 & 1 \\\\ 1 & 3 & 1 \\\\ 1 & 1 & 3 \\end{pmatrix}$.\n\n(a) Find the eigenvalues and the minimal polynomial of $A$.\n\n(b) Show that $A$ is diagonalizable and find $P$ and $D$ with $P^{-1}AP = D$.\n\n(c) Prove that the minimal polynomial divides every polynomial $f$ with $f(A) = 0$.'),
        check([
          { ask: 'Eigenvalue with eigenvector $(1, 1, 1)$', answer: 5, tol: 0, hint: 'Each row sums to $5$.' },
          { ask: 'The double eigenvalue', answer: 2, tol: 0, hint: 'Trace $9 = 5 + 2\\lambda$.' },
          { ask: '$|A| = $', answer: 20, tol: 0, hint: '$5 \\cdot 2 \\cdot 2$.' },
          { ask: 'GM of $\\lambda = 2$', answer: 2, tol: 0, hint: '$A - 2I$ is all ones: rank $1$.' },
          { ask: 'Degree of the minimal polynomial', answer: 2, tol: 0, hint: '$(A - 2I)(A - 5I) = 0$.' },
        ]),
        model('Question 3', '**(a)** $|A - \\lambda I| = -(\\lambda - 2)^2(\\lambda - 5)$. Candidates for $m$ must contain both factors; $(A - 2I)(A - 5I) = 0$ (all-ones matrix times a matrix whose columns sum to $0$), so $m(\\lambda) = (\\lambda - 2)(\\lambda - 5)$.\n\n**(b)** $E_5$: $(1, 1, 1)$. $E_2$: $x + y + z = 0$, basis $(-1, 1, 0), (-1, 0, 1)$. GM $=$ AM for both, so three independent eigenvectors:\n$P = \\begin{pmatrix} 1 & -1 & -1 \\\\ 1 & 1 & 0 \\\\ 1 & 0 & 1 \\end{pmatrix}$, $D = \\operatorname{diag}(5, 2, 2)$.\n\n**(c)** Division algorithm: $f = mq + r$ with $r = 0$ or $\\deg r < \\deg m$. Then $0 = f(A) = m(A)q(A) + r(A) = r(A)$; if $r \\neq 0$ it (made monic) would contradict the minimality of $m$. So $r = 0$ and $m \\mid f$. ∎\n\n**Marks for:** the characteristic polynomial; testing the candidate; eigenspace bases; GM $=$ AM argument; matching order in $P$ and $D$; the division algorithm proof.'),
        question(4, '(a) State the four axioms of a real inner product.\n\n(b) Apply Gram–Schmidt to $v_1 = (1, 0, 1)$, $v_2 = (1, 1, 0)$ to get an orthonormal set.\n\n(c) Prove that eigenvectors of a real symmetric matrix belonging to distinct eigenvalues are orthogonal.'),
        check([
          { ask: '$\\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle} = $', answer: 0.5, tol: 0.001, hint: '$\\frac{1 + 0 + 0}{2}$.' },
          { ask: '$w_2 = v_2 - \\frac12 w_1 = \\left(\\frac12, 1, c\\right)$, $c = $', answer: -0.5, tol: 0.001, hint: '$0 - \\frac12 \\cdot 1$.' },
          { ask: '$\\langle w_1, w_2 \\rangle = $', answer: 0, tol: 0.001, hint: '$\\frac12 + 0 - \\frac12$.' },
          { ask: '$\\|w_2\\| = $ (3 d.p.)', answer: 1.225, tol: 0.002, hint: '$\\sqrt{\\frac14 + 1 + \\frac14} = \\sqrt{1.5}$.' },
        ]),
        model('Question 4', '**(a)** For all $u, v, w \\in V$, $k \\in \\mathbb R$: $\\langle u, v \\rangle = \\langle v, u \\rangle$; $\\langle u + v, w \\rangle = \\langle u, w \\rangle + \\langle v, w \\rangle$; $\\langle ku, v \\rangle = k\\langle u, v \\rangle$; $\\langle v, v \\rangle \\ge 0$ with equality iff $v = 0$.\n\n**(b)** $w_1 = (1, 0, 1)$, $w_2 = (1, 1, 0) - \\frac12(1, 0, 1) = \\left(\\frac12, 1, -\\frac12\\right)$. Orthonormal set: $u_1 = \\frac{1}{\\sqrt2}(1, 0, 1)$, $u_2 = \\frac{1}{\\sqrt6}(1, 2, -1)$.\n\n**(c)** $\\lambda_1(v_1 \\cdot v_2) = Av_1 \\cdot v_2 = v_1^TA^Tv_2 = v_1^TAv_2 = \\lambda_2(v_1 \\cdot v_2)$, so $(\\lambda_1 - \\lambda_2)(v_1 \\cdot v_2) = 0$; as $\\lambda_1 \\neq \\lambda_2$, $v_1 \\cdot v_2 = 0$. ∎\n\n**Marks for:** all four axioms; the projection coefficient; orthogonality check; normalising; using $A^T = A$ explicitly.'),
        { type: 'bridge', title: 'Four down.', recap: ['Diagonalization and inner products done.'], why: 'Last: forms and Jordan.' },
      ],
    },
    {
      name: 'Questions 5–6',
      terms: [
        ['Quadratic form', '$q = x^TAx$, reduce with $x = PX$.'],
        ['Jordan', 'Blocks $=$ GM; sizes from ranks.'],
      ],
      screens: [
        question(5, '(a) Define a bilinear form on $V$ and show that $B(u, v) = u^TAv$ is bilinear on $\\mathbb R^n$.\n\n(b) For $B(u, v) = u_1v_1 + 2u_1v_2 - u_2v_2$, find its matrix in the basis $\\{(1, 0), (1, 1)\\}$.\n\n(c) Reduce $q = 3x^2 + 2xy + 3y^2$ to principal axes and name the curve $q = 4$.'),
        check([
          { ask: '(b) $B(v_1, v_2)$ with $v_1 = (1, 0)$, $v_2 = (1, 1)$', answer: 3, tol: 0, hint: '$1 + 2 - 0$.' },
          { ask: '(b) $B(v_2, v_1)$', answer: 1, tol: 0, hint: '$u = (1, 1)$, $v = (1, 0)$: only $u_1v_1$.' },
          { ask: '(b) $B(v_2, v_2)$', answer: 2, tol: 0, hint: '$1 + 2 - 1$.' },
          { ask: '(c) Larger eigenvalue of $\\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}$', answer: 4, tol: 0, hint: '$\\lambda^2 - 6\\lambda + 8$.' },
          { ask: '(c) Smaller eigenvalue', answer: 2, tol: 0, hint: 'The other root.' },
        ]),
        model('Question 5', '**(a)** $B: V \\times V \\to \\mathbb F$ is bilinear if it is linear in each variable with the other fixed. For $u^TAv$: $(au_1 + bu_2)^TAv = au_1^TAv + bu_2^TAv$ and $u^TA(av_1 + bv_2) = au^TAv_1 + bu^TAv_2$.\n\n**(b)** $a_{ij} = B(v_i, v_j)$: $\\begin{pmatrix} 1 & 3 \\\\ 1 & 2 \\end{pmatrix}$ (equivalently $P^TAP$ with $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & -1 \\end{pmatrix}$, $P = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$).\n\n**(c)** $A = \\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}$, eigenvalues $4$ (eigenvector $\\frac{1}{\\sqrt2}(1, 1)$) and $2$ (eigenvector $\\frac{1}{\\sqrt2}(-1, 1)$). With $x = PX$: $q = 4X^2 + 2Y^2$. $q = 4$ is the **ellipse** $X^2 + \\frac{Y^2}{2} = 1$, axes along $(1, 1)$ and $(-1, 1)$.\n\n**Marks for:** the definition; both linearity checks; each $a_{ij}$; the symmetric matrix (half the cross term); orthonormal $P$; naming the curve.'),
        question(6, '(a) Define a Jordan block and a generalized eigenvector.\n\n(b) Find the Jordan canonical form $J$ of $A = \\begin{pmatrix} 1 & 1 \\\\ -1 & 3 \\end{pmatrix}$ and an invertible $Q$ with $Q^{-1}AQ = J$.\n\n(c) Prove that the generalized eigenspace $K_\\lambda$ is $T$-invariant.'),
        check([
          { ask: 'The (double) eigenvalue', answer: 2, tol: 0, hint: '$\\lambda^2 - 4\\lambda + 4$.' },
          { ask: '$\\operatorname{rank}(A - 2I)$', answer: 1, tol: 0, hint: '$\\begin{pmatrix} -1 & 1 \\\\ -1 & 1 \\end{pmatrix}$.' },
          { ask: 'Number of Jordan blocks', answer: 1, tol: 0, hint: '$2 - 1$.' },
          { ask: 'Chain: $v_2 = (1, 0)$, $v_1 = (A - 2I)v_2 = (-1, y)$, $y = $', answer: -1, tol: 0, hint: 'First column of $A - 2I$.' },
        ]),
        model('Question 6', '**(a)** A Jordan block $J_k(\\lambda)$ is $k \\times k$ with $\\lambda$ on the diagonal, $1$ on the superdiagonal, $0$ elsewhere. A generalized eigenvector for $\\lambda$ is $v \\neq 0$ with $(T - \\lambda I)^pv = 0$ for some $p \\ge 1$.\n\n**(b)** $|A - \\lambda I| = (\\lambda - 2)^2$; $\\operatorname{rank}(A - 2I) = 1$, so GM $= 1$: one block, $J = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$. With $v_2 = (1, 0)$, $v_1 = (A - 2I)v_2 = (-1, -1)$: $Q = \\begin{pmatrix} -1 & 1 \\\\ -1 & 0 \\end{pmatrix}$. Check $AQ = \\begin{pmatrix} -2 & 1 \\\\ -2 & -1 \\end{pmatrix} = QJ$ ✓.\n\n**(c)** If $(T - \\lambda I)^pv = 0$, then since $T$ commutes with $(T - \\lambda I)^p$: $(T - \\lambda I)^p(Tv) = T(T - \\lambda I)^pv = 0$, so $Tv \\in K_\\lambda$. ∎\n\n**Marks for:** both definitions; GM from the rank; the chain built top-down; $Q$ with the eigenvector first; the check; commuting in the proof.'),
        {
          type: 'story',
          eyebrow: 'Done',
          title: 'How did it go?',
          body: 'Go back over any step you got wrong or had to be shown: each points to the lesson to revisit. When you can do all six on time, **including the proofs**, you are ready.\n\nFor timed multiple-choice practice, take the **Exam focus** set in Practice.',
        },
        { type: 'finish', title: 'Mock exam: done.', body: 'Methods used:' },
      ],
    },
  ],
};
