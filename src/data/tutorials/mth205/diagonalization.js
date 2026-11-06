// MTH 205 · Diagonalization · Lesson 1: why and when. In the eigenvector grid A only stretches, so
// P⁻¹AP = D; powers become A^k = P D^k P⁻¹. Theorem: diagonalizable ⇔ n independent eigenvectors
// (AP = PD read column by column). Eigenvectors for distinct eigenvalues are independent.
import { A, A2, ID } from './la';

const A3 = [14, 13, 13, 14];
const V = [-1.05, 1.35]; // 0.15 b₁ + 1.2 b₂ with b₁ = (1, 1), b₂ = (−1, 1)

export default {
  id: 'diagonalization',
  title: 'Diagonalization',
  covers: 'Diagonalizable matrices (similar to a diagonal matrix), P⁻¹AP = D and AP = PD, columns of P as eigenvectors, the theorem that A is diagonalizable iff it has n linearly independent eigenvectors, eigenvectors of distinct eigenvalues are independent, powers A^k = P D^k P⁻¹',
  minutes: 18,
  sections: [
    {
      name: 'The natural grid',
      terms: [
        ['Diagonalizable', '$A$ is diagonalizable if it is similar to a diagonal matrix: $P^{-1}AP = D$ for some $P \\in GL_n(\\mathbb F)$.'],
        ['$AP = PD$', 'Equivalent to $P^{-1}AP = D$. Column by column: $AP_i = \\lambda_i P_i$, so the columns of $P$ are eigenvectors and the diagonal of $D$ holds their eigenvalues, in the same order.'],
        ['Powers', '$A^k = PD^kP^{-1}$, and $D^k = \\operatorname{diag}(\\lambda_1^k, \\dots, \\lambda_n^k)$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In the basis $b_1 = (1, 1)$, $b_2 = (-1, 1)$, the matrix $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ becomes',
          options: [
            { text: '$\\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$', correct: true, why: 'Her grid lines only stretch: $b_1 \\to 3b_1$, $b_2 \\to b_2$.' },
            { text: '$\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$', why: 'That is $A$ in **our** language.' },
            { text: '$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$', why: '$b_1$ is stretched by $3$.' },
            { text: '$\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$', why: 'That is the translator $P$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Powers the easy way',
          graph: {
            steps: [
              { say: 'Here is an arrow $v$. Computing $A^{10}v$ directly means multiplying matrices ten times. But write $v$ in the **eigen-grid**: $v = 0.15\\,b_1 + 1.2\\,b_2$.' },
              { say: 'Apply $A$. In eigen-coordinates it is easy to predict: the $b_1$ part is tripled, the $b_2$ part stays. $Av = 0.45\\,b_1 + 1.2\\,b_2$.', action: { label: 'Apply A' } },
              { say: 'Again: $A^2v = 1.35\\,b_1 + 1.2\\,b_2$.', action: { label: 'Again' } },
              { say: 'And again: $A^3v = 4.05\\,b_1 + 1.2\\,b_2$. In general $A^kv = 0.15 \\cdot 3^k\\,b_1 + 1.2\\,b_2$: no matrix multiplication at all. In matrices: $A^k = PD^kP^{-1}$ with $D^k = \\begin{pmatrix} 3^k & 0 \\\\ 0 & 1 \\end{pmatrix}$.', action: { label: 'Again' } },
            ],
            draw: (step, presses) => {
              const n = Math.min(presses, 3);
              return {
                M: [ID, A, A2, A3][n],
                R: 6,
                items: [
                  { id: 'l1', span: [1, 1], kind: 'e', fixed: true, o: 0.45 },
                  { id: 'l2', span: [-1, 1], kind: 'c', fixed: true, o: 0.45 },
                  { id: 'v', vec: V, kind: 'a', label: ['v', 'Av', 'A²v', 'A³v'][n] },
                ],
              };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Why $A^k = PD^kP^{-1}$',
          body: 'If $P^{-1}AP = D$ then $A = PDP^{-1}$. Now just write out $A^k$ and watch the translators cancel in pairs:\n$$A^k = (PDP^{-1})(PDP^{-1})\\cdots(PDP^{-1}) = PD(P^{-1}P)D(P^{-1}P)\\cdots DP^{-1} = PD^kP^{-1}.$$\nIn words: translate into the eigen-language once, stretch $k$ times (easy, it’s diagonal), translate back once. That’s the whole proof.',
        },
        {
          type: 'bridge',
          title: 'Diagonal = pure stretching in the right grid.',
          recap: ['$P^{-1}AP = D$.', '$A^k = PD^kP^{-1}$.'],
          why: 'Next: exactly when such a grid exists.',
        },
      ],
    },
    {
      name: 'When can we diagonalize?',
      terms: [
        ['Theorem', 'An $n \\times n$ matrix $A$ is diagonalizable $\\iff$ $A$ has $n$ linearly independent eigenvectors.'],
        ['Distinct eigenvalues', 'Eigenvectors $v_1, \\dots, v_k$ belonging to distinct eigenvalues $\\lambda_1, \\dots, \\lambda_k$ are linearly independent.'],
        ['Corollary', 'An $n \\times n$ matrix with $n$ distinct eigenvalues is diagonalizable.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Read $AP = PD$ one column at a time',
          body: 'Exams ask: "prove that $A$ is diagonalizable iff it has $n$ linearly independent eigenvectors". Let’s look at what $P^{-1}AP = D$ is secretly saying.',
          graph: {
            steps: [
              { say: 'Multiply $P^{-1}AP = D$ by $P$ on the left: $AP = PD$. Now look at it column by column. Column $i$ of $AP$ is $A$ applied to $P_i$, the $i$-th column of $P$.' },
              { say: 'Column $i$ of $PD$ is $P_i$ stretched by the $i$-th diagonal entry: $\\lambda_iP_i$. So $AP = PD$ says $AP_i = \\lambda_iP_i$ for every $i$.', action: { label: 'Apply A' } },
              { say: 'That is exactly "the columns of $P$ are eigenvectors". And $P$ must be invertible, which means its $n$ columns are **linearly independent**: they make a genuine grid.' },
              { say: 'Run it backwards: given $n$ independent eigenvectors, put them in $P$ (invertible, since the columns are independent); then $AP = PD$, so $P^{-1}AP = D$. Both directions hold: diagonalizable $\\iff$ $n$ independent eigenvectors. That’s the whole proof.' },
            ],
            draw: (step, presses) => ({
              M: presses >= 1 ? A : ID,
              R: 4,
              items: [
                { id: 'p1', vec: [1, 1], kind: 'e', label: presses >= 1 ? 'AP₁ = 3P₁' : 'P₁' },
                { id: 'p2', vec: [-1, 1], kind: 'c', label: presses >= 1 ? 'AP₂ = P₂' : 'P₂' },
              ],
            }),
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove: if $A$ is diagonalizable then $A$ has $n$ linearly independent eigenvectors.',
          items: [
            'Since $A$ is diagonalizable, there are $P \\in GL_n(\\mathbb F)$ and $D = \\operatorname{diag}(\\lambda_1, \\dots, \\lambda_n)$ with $P^{-1}AP = D$, i.e. $AP = PD$.',
            'Let $P_1, \\dots, P_n$ be the columns of $P$. Then $AP = (AP_1, \\dots, AP_n)$ and $PD = (\\lambda_1P_1, \\dots, \\lambda_nP_n)$.',
            'Comparing columns, $AP_i = \\lambda_iP_i$ for each $i$, and $P_i \\neq 0$, so each $P_i$ is an eigenvector.',
            'Since $P$ is invertible, its columns $P_1, \\dots, P_n$ are linearly independent. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Different stretch factors can’t share a line',
          body: 'Why are eigenvectors with **different** eigenvalues always independent? Try to break it and see what goes wrong.',
          graph: {
            steps: [
              { say: 'Suppose, for contradiction, that two eigenvectors with different eigenvalues were dependent: $v_2 = cv_1$. Then they’d lie on the **same line**.' },
              { say: 'But a line can only be stretched by one factor! Apply $A$: the line through $v_1$ is stretched by $\\lambda_1$, so $Av_2 = A(cv_1) = c\\lambda_1v_1 = \\lambda_1v_2$. Yet also $Av_2 = \\lambda_2v_2$.', action: { label: 'Apply A' } },
              { say: 'So $\\lambda_1v_2 = \\lambda_2v_2$, i.e. $(\\lambda_1 - \\lambda_2)v_2 = 0$. Since $\\lambda_1 \\neq \\lambda_2$, $v_2 = 0$: impossible for an eigenvector. So they are independent.' },
              { say: 'For more vectors the same idea works: take the **shortest** dependence $a_1v_1 + \\dots + a_kv_k = 0$; apply $A$, subtract $\\lambda_k$ times the original, and you get a **shorter** one (the $v_k$ term cancels, the others keep nonzero factors $\\lambda_i - \\lambda_k$). Contradiction. That’s the whole proof.' },
            ],
            draw: (step, presses) => ({
              M: presses >= 1 ? A : ID,
              R: 4,
              items: [
                { id: 'ln', span: [1, 1], kind: 'e', fixed: true, o: 0.5 },
                { id: 'v1', vec: [0.6, 0.6], kind: 'e', label: 'v₁' },
                { id: 'v2', vec: [-0.9, -0.9], kind: 'c', label: 'v₂ = cv₁?' },
              ],
            }),
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove: eigenvectors $v_1, v_2$ of $A$ with distinct eigenvalues $\\lambda_1 \\neq \\lambda_2$ are linearly independent.',
          items: [
            'Suppose $a_1v_1 + a_2v_2 = 0$. (1)',
            'Apply $A$: $a_1\\lambda_1v_1 + a_2\\lambda_2v_2 = 0$. (2)',
            'Subtract $\\lambda_2 \\times$ (1) from (2): $a_1(\\lambda_1 - \\lambda_2)v_1 = 0$.',
            'Since $\\lambda_1 \\neq \\lambda_2$ and $v_1 \\neq 0$, $a_1 = 0$; then (1) gives $a_2v_2 = 0$, so $a_2 = 0$. ∎',
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true for an $n \\times n$ matrix $A$?',
          options: [
            { text: 'If $A$ has $n$ distinct eigenvalues it is diagonalizable', correct: true, why: '**True:** $n$ eigenvectors from distinct eigenvalues are independent.' },
            { text: 'If $A$ is diagonalizable its eigenvalues are distinct', why: '**False:** $I$ is diagonal with all eigenvalues equal to $1$.' },
            { text: 'The columns of $P$ in $P^{-1}AP = D$ are eigenvectors of $A$', correct: true, why: '**True:** read $AP = PD$ column by column.' },
            { text: 'The order of eigenvalues in $D$ matches the order of columns in $P$', correct: true, why: '**True:** column $i$ of $P$ goes with $D_{ii}$.' },
            { text: 'Every matrix is diagonalizable over $\\mathbb R$', why: '**False:** the quarter turn (no real eigenvectors) and the shear (too few) are not.' },
          ],
        },
        {
          type: 'finish',
          title: 'Diagonalization: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
