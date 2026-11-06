// MTH 205 · Eigenvalues · Lesson 3: Cayley–Hamilton and the minimal polynomial. Each factor
// (A − λI) of the characteristic polynomial kills one eigen-direction, so together they kill the
// whole plane: p(A) = 0. Uses: inverses and powers. The minimal polynomial: monic, least degree,
// m(A) = 0; it divides the characteristic polynomial (division algorithm proof), has the same
// irreducible factors, and is found by testing candidates.
import { A, ID, minusL } from './la';

const ZERO = [0, 0, 0, 0];

export default {
  id: 'cayley-hamilton',
  title: 'Cayley–Hamilton and the minimal polynomial',
  covers: 'The Cayley–Hamilton theorem and why it holds, verifying it, using it to find A⁻¹ and powers of A, monic polynomials, the minimal polynomial and its properties (m(A) = 0, monic, divides the characteristic polynomial, same irreducible factors), finding it, and its applications',
  minutes: 20,
  sections: [
    {
      name: 'A matrix satisfies its own equation',
      terms: [
        ['Cayley–Hamilton theorem', 'Every square matrix satisfies its characteristic equation: if $P_A(\\lambda) = |A - \\lambda I|$, then $P_A(A) = 0$ (the zero matrix).'],
        ['Inverse from C–H', 'If $A^2 - (\\operatorname{tr}A)A + (\\det A)I = 0$ and $\\det A \\neq 0$, then $A^{-1} = \\frac{1}{\\det A}\\big((\\operatorname{tr}A)I - A\\big)$. In general, solve the C–H equation for $I$ and factor out $A$.'],
        ['Powers from C–H', 'Use the equation to replace $A^n$ by lower powers again and again.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The characteristic polynomial of $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ is',
          options: [
            { text: '$\\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3)$', correct: true, why: '$\\lambda^2 - (\\operatorname{tr})\\lambda + \\det$.' },
            { text: '$\\lambda^2 + 4\\lambda + 3$', why: 'The middle coefficient is **minus** the trace.' },
            { text: '$\\lambda^2 - 3$', why: 'Don’t forget the trace term.' },
            { text: '$(\\lambda - 2)^2$', why: 'That ignores the off-diagonal $1$s.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'An experiment',
          title: 'Plug the matrix into its own polynomial',
          graph: {
            steps: [
              { say: 'A strange idea: put the **matrix** $A$ into its own characteristic polynomial $p(\\lambda) = (\\lambda - 1)(\\lambda - 3)$. That means the motion $p(A) = (A - I)(A - 3I)$. What does it do to the plane?' },
              { say: 'First $A - 3I$. It crushes the $\\lambda = 3$ eigen-line (purple) to $0$, and flattens **everything** onto the $\\lambda = 1$ eigen-line (amber).', action: { label: 'Apply A − 3I' } },
              { say: 'Now $A - I$. It crushes exactly the $\\lambda = 1$ line, and that line is all that’s left. Everything lands on $0$!', action: { label: 'Then A − I' } },
              { say: '$p(A)$ is the **zero matrix**. Each factor $(A - \\lambda_i I)$ wipes out one eigen-direction, and together they wipe out the whole space. This is the ==Cayley–Hamilton theorem==: every square matrix satisfies its own characteristic equation.' },
            ],
            draw: (step, presses) => {
              const M = presses >= 2 ? ZERO : presses >= 1 ? minusL(A, 3) : ID;
              return {
                M,
                R: 4,
                items: [
                  { id: 'l3', span: [1, 1], kind: 'e', fixed: true, o: 0.45 },
                  { id: 'l1', span: [-1, 1], kind: 'c', fixed: true, o: 0.45 },
                  { id: 'u', vec: [1, 1], kind: 'e' },
                  { id: 'w', vec: [-1, 1], kind: 'c' },
                  { id: 'z', vec: [1.5, -0.4], kind: 'a' },
                ],
                note: presses >= 2 ? '$(A - I)(A - 3I) = 0$' : undefined,
              };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'Why is that true in general?',
          title: 'The adjugate proof, gently',
          body: 'The picture works whenever there are enough eigenvectors. For **every** matrix, exams use this argument.\n\nFor any square $M$: $M\\operatorname{adj}(M) = |M|I$. Take $M = A - \\lambda I$:\n$$(A - \\lambda I)\\operatorname{adj}(A - \\lambda I) = p(\\lambda)I.$$\nThe entries of $\\operatorname{adj}(A - \\lambda I)$ are polynomials in $\\lambda$ of degree at most $n - 1$, so write it as $B_0 + B_1\\lambda + \\dots + B_{n-1}\\lambda^{n-1}$ with constant matrices $B_k$.\n\nMultiply out and match the coefficient of each power $\\lambda^k$ on both sides: you get $n + 1$ matrix equations. Multiply the one for $\\lambda^k$ by $A^k$ (on the left) and **add them all**: the left side telescopes to $0$, and the right side is exactly $p(A)$. So $p(A) = 0$. That’s the whole proof.',
          asides: [{ label: 'Trap', text: 'You can’t just "substitute $\\lambda = A$" into $|A - \\lambda I|$: that would give $|A - A| = 0$, a **number**, but $p(A)$ is a **matrix**. That’s why the proof matches coefficients.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Verify Cayley–Hamilton for $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$, then use it.',
          body: '$p(\\lambda) = \\lambda^2 - 3\\lambda - 4$.',
          graph: {
            steps: [
              { ask: '$A^2 = \\begin{pmatrix} 7 & 6 \\\\ 9 & c \\end{pmatrix}$ with $c = $', answer: 10, tol: 0, hint: 'Row 2 times column 2: $3 \\cdot 2 + 2 \\cdot 2$.' },
              { ask: 'Top-left entry of $A^2 - 3A - 4I$', answer: 0, tol: 0, hint: '$7 - 3 - 4$.', done: 'All entries are $0$: verified' },
              { ask: 'From $A^2 - 3A = 4I$: $A(A - 3I) = 4I$, so $A^{-1} = \\frac14(A - 3I)$. Its top-left entry $= $', answer: -0.5, tol: 0.001, hint: '$\\frac14(1 - 3)$.' },
              { ask: 'Its bottom-left entry $= $', answer: 0.75, tol: 0.001, hint: '$\\frac14 \\cdot 3$.' },
              { ask: '$A^3 = A \\cdot A^2 = A(3A + 4I) = 3A^2 + 4A = aA + 12I$ with $a = $', answer: 13, tol: 0, hint: 'Replace $A^2$ again: $3(3A + 4I) + 4A$.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: '$p(A) = 0$, always.',
          recap: ['Each factor kills one eigen-direction.', 'Use it for $A^{-1}$ and high powers.'],
          why: 'Next: sometimes a **smaller** polynomial already kills $A$.',
        },
      ],
    },
    {
      name: 'The minimal polynomial',
      terms: [
        ['Monic', 'Leading coefficient $1$, e.g. $x^3 + x^2 + 1$ (but not $2x + 1$).'],
        ['Minimal polynomial $m(\\lambda)$', 'The monic polynomial of least degree with $m(A) = 0$. (For a linear map $T$: least degree with $m(T) = 0$.)'],
        ['Divides', 'If $f(A) = 0$ then $m \\mid f$. In particular $m(\\lambda)$ divides the characteristic polynomial.'],
        ['Same factors', '$m$ and $P_A$ have the same irreducible factors: every eigenvalue is a root of $m$.'],
        ['To find it', 'Factor $P_A$. Try the products containing **each** distinct factor at least once, smallest degree first. The first one that gives the zero matrix is $m$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'A shortcut',
          title: 'When one factor kills a whole plane',
          body: 'Take $A = \\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$, with $P_A(\\lambda) = (\\lambda - 1)^2(\\lambda - 4)$. Cayley–Hamilton says $(A - I)^2(A - 4I) = 0$.\n\nBut look at the eigen-directions: for $\\lambda = 1$ there is a whole **plane** of eigenvectors ($x + y + z = 0$). One copy of $A - I$ crushes that entire plane at once; applying it twice is overkill. And indeed\n$$(A - I)(A - 4I) = 0$$\nalready. The smallest monic polynomial that kills $A$ is called the ==minimal polynomial==: here $m(\\lambda) = (\\lambda - 1)(\\lambda - 4)$.',
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Why $m$ divides every polynomial that kills $A$',
          body: 'Suppose some polynomial $f$ also kills $A$: $f(A) = 0$. Is $m$ hiding inside $f$? Let’s divide and see what’s left over.\n\nThe division algorithm gives $f(\\lambda) = m(\\lambda)q(\\lambda) + r(\\lambda)$, where $r = 0$ or $\\deg r < \\deg m$.\n\nNow put $A$ in: $0 = f(A) = m(A)q(A) + r(A) = 0 \\cdot q(A) + r(A)$, so $r(A) = 0$.\n\nBut if $r \\neq 0$, it would be a polynomial **smaller** than $m$ that kills $A$ (divide by its leading coefficient to make it monic). That contradicts $m$ being minimal. So $r = 0$ and $m \\mid f$. With $f = P_A$ (Cayley–Hamilton), $m$ divides the characteristic polynomial. That’s the whole proof.',
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove: the minimal polynomial $m(\\lambda)$ of $A$ divides every polynomial $f(\\lambda)$ with $f(A) = 0$.',
          items: [
            'By the division algorithm, $f(\\lambda) = m(\\lambda)q(\\lambda) + r(\\lambda)$ with $r = 0$ or $\\deg r < \\deg m$.',
            'Substituting $A$: $0 = f(A) = m(A)q(A) + r(A) = r(A)$.',
            'If $r \\neq 0$, then $r$ (made monic) has $r(A) = 0$ and smaller degree than $m$, contradicting minimality.',
            'Hence $r = 0$, so $f(\\lambda) = m(\\lambda)q(\\lambda)$ and $m \\mid f$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Find the minimal polynomial of $A = \\begin{pmatrix} 2 & 2 & -5 \\\\ 3 & 7 & -15 \\\\ 1 & 2 & -4 \\end{pmatrix}$.',
          body: 'Its characteristic polynomial is $(\\lambda - 1)^2(\\lambda - 3)$.',
          graph: {
            steps: [
              { ask: 'Check: $\\operatorname{tr}A = $', answer: 5, tol: 0, hint: '$2 + 7 - 4$; and $1 + 1 + 3 = 5$ ✓.' },
              { ask: 'Smallest candidate containing both factors has degree', answer: 2, tol: 0, hint: '$(\\lambda - 1)(\\lambda - 3)$.' },
              { ask: 'Top-left entry of $(A - I)(A - 3I)$', answer: 0, tol: 0, hint: 'Row $(1, 2, -5)$ of $A - I$ times column $(-1, 3, 1)$ of $A - 3I$.' },
              { ask: 'In fact $(A - I)(A - 3I) = 0$. So $m(\\lambda)$ is', options: ['$(\\lambda - 1)(\\lambda - 3)$', '$(\\lambda - 1)^2(\\lambda - 3)$', '$\\lambda - 1$'], answer: 0, hint: 'The smallest candidate that works.' },
              { ask: 'Use $m$: $A^2 - 4A + 3I = 0$ gives $A^{-1} = \\frac13(4I - A)$. Top-left entry of $A^{-1}$', answer: 0.6667, tol: 0.002, hint: '$\\frac13(4 - 2)$.' },
            ],
          },
        },
        {
          type: 'reveal',
          eyebrow: 'Why it matters',
          title: 'What the minimal polynomial is good for',
          cards: [
            { title: 'Reducing big expressions', text: 'For any $P(\\lambda)$, divide: $P = Q m + R$. Since $m(A) = 0$, $P(A) = R(A)$, a polynomial of degree $< \\deg m$. E.g. above, $\\lambda^3 = (\\lambda + 4)m(\\lambda) + 13\\lambda - 12$, so $A^3 = 13A - 12I$.' },
            { title: 'Inverses', text: 'If $m(0) \\neq 0$, then $A$ is invertible and $A^{-1}$ is a polynomial in $A$: solve $m(A) = 0$ for $I$.' },
            { title: 'Diagonalizable or not (Ch 3, 6)', text: '$A$ is diagonalizable exactly when $m$ has **no repeated factor**: each $(A - \\lambda I)$ kills its whole eigenspace in one go. A repeated factor signals a Jordan block.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'A matrix has characteristic polynomial $(\\lambda - 2)^3(\\lambda + 1)$. Which could be its minimal polynomial?',
          options: [
            { text: '$(\\lambda - 2)(\\lambda + 1)$', correct: true, why: 'Contains each distinct factor and divides $P_A$.' },
            { text: '$(\\lambda - 2)^2(\\lambda + 1)$', correct: true, why: 'Also possible: it depends on the matrix.' },
            { text: '$(\\lambda - 2)^3$', why: 'Missing the factor $(\\lambda + 1)$: every eigenvalue must be a root of $m$.' },
            { text: '$(\\lambda - 2)^4(\\lambda + 1)$', why: 'Too big: $m$ must divide $P_A$.' },
            { text: '$2(\\lambda - 2)(\\lambda + 1)$', why: 'Not monic.' },
          ],
        },
        {
          type: 'finish',
          title: 'Cayley–Hamilton and minimal polynomial: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
