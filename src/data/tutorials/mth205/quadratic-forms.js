// MTH 205 · Forms · Lesson 3: quadratic forms q(v) = B(v, v), the matrix of q (half the cross
// coefficients), polarization, and reduction to principal axes: q = 2x² + 2xy + 2y² (our A again)
// draws a tilted ellipse whose axes are A's eigenvectors; rotating to the eigen-grid removes the
// cross term, q = 3X² + Y².
import { ID } from './la';

const C = Math.SQRT1_2;
const R45 = [C, -C, C, C];
const ELL = Array.from({ length: 48 }, (_, k) => {
  const t = (2 * Math.PI * k) / 48;
  return [Math.cos(t), Math.sqrt(3) * Math.sin(t)]; // 3X² + Y² = 3
});

export default {
  id: 'quadratic-forms',
  title: 'Quadratic forms',
  covers: 'Quadratic forms q(v) = B(v, v) from symmetric bilinear forms, q(x) = xᵀAx = Σ a_ii x_i² + 2Σ a_ij x_i x_j, writing down the matrix of a quadratic form, polarization B(u, v) = ½(q(u + v) − q(u) − q(v)), and reducing a quadratic form to principal axes by orthogonal diagonalization',
  minutes: 18,
  sections: [
    {
      name: 'One vector, both slots',
      terms: [
        ['Quadratic form', '$q: V \\to \\mathbb F$ is a quadratic form if $q(v) = B(v, v)$ for some symmetric bilinear form $B$.'],
        ['Matrix form', 'With $A$ symmetric: $q(x) = x^TAx = \\sum_i a_{ii}x_i^2 + 2\\sum_{i < j}a_{ij}x_ix_j$.'],
        ['Reading $A$ off $q$', 'Diagonal: the coefficients of $x_i^2$. Off-diagonal $a_{ij} = a_{ji}$: **half** the coefficient of $x_ix_j$.'],
        ['Polarization', 'If $\\operatorname{char}\\mathbb F \\neq 2$: $B(u, v) = \\frac12\\big(q(u + v) - q(u) - q(v)\\big)$. So symmetric bilinear forms and quadratic forms match one-to-one.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'A bilinear form $B$ is symmetric exactly when',
          options: [
            { text: 'its matrix (in any basis) is symmetric', correct: true, why: '$a_{ij} = B(v_i, v_j) = B(v_j, v_i) = a_{ji}$.' },
            { text: 'its matrix is diagonal', why: 'Diagonal is a special kind of symmetric.' },
            { text: '$B(u, u) = 0$ for all $u$', why: 'That is "alternating".' },
            { text: 'it is an inner product', why: 'Inner products are symmetric, but symmetric forms needn’t be positive.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Forms · Lesson 3',
          title: 'Feed the same vector into both slots',
          body: 'Take the symmetric form $B(u, v) = u^TAv$ with our old friend $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ and put the **same** vector $x = (x, y)$ in both slots:\n$$q(x) = x^TAx = 2x^2 + 2xy + 2y^2.$$\nThat is a ==quadratic form==: every term has degree $2$. Notice the cross term: $2xy$ comes from $a_{12}xy + a_{21}yx = 1xy + 1xy$. That’s why off-diagonal entries are **half** the cross coefficient.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Write the symmetric matrix of $q(x, y) = 5x^2 - 6xy + 8y^2$.',
          graph: {
            steps: [
              { ask: '$a_{11} = $', answer: 5, tol: 0, hint: 'Coefficient of $x^2$.' },
              { ask: '$a_{12} = a_{21} = $', answer: -3, tol: 0, hint: 'Half of $-6$.' },
              { ask: '$a_{22} = $', answer: 8, tol: 0, hint: 'Coefficient of $y^2$.', done: '$A = \\begin{pmatrix} 5 & -3 \\\\ -3 & 8 \\end{pmatrix}$' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'The quadratic form with matrix $\\begin{pmatrix} 4 & -5 & 7 \\\\ -5 & -6 & 8 \\\\ 7 & 8 & 9 \\end{pmatrix}$ is',
          options: [
            { text: '$4x^2 - 6y^2 + 9z^2 - 10xy + 14xz + 16yz$', correct: true, why: 'Squares from the diagonal; each cross term is **twice** the off-diagonal entry.' },
            { text: '$4x^2 - 6y^2 + 9z^2 - 5xy + 7xz + 8yz$', why: 'Each off-diagonal entry appears twice ($a_{ij}$ and $a_{ji}$): double it.' },
            { text: '$4x^2 - 6y^2 + 9z^2$', why: 'Don’t drop the cross terms.' },
            { text: '$4x - 6y + 9z$', why: 'Quadratic forms have degree-$2$ terms.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Getting $B$ back from $q$ (polarization)',
          body: 'Knowing only the "diagonal" values $q(v) = B(v, v)$, can we recover all of $B$? Expand $q(u + v)$:\n$$q(u + v) = B(u + v, u + v) = B(u, u) + B(u, v) + B(v, u) + B(v, v) = q(u) + 2B(u, v) + q(v),$$\nusing symmetry for the middle. Solve for $B(u, v)$:\n$$B(u, v) = \\tfrac12\\big(q(u + v) - q(u) - q(v)\\big).$$\nSo $q$ determines $B$, provided we can divide by $2$ (characteristic $\\neq 2$ again!). That’s the whole proof of the one-to-one correspondence.',
        },
        {
          type: 'bridge',
          title: '$q(x) = x^TAx$.',
          recap: ['Diagonal = squares, off-diagonal = half the cross terms.', 'Polarization recovers $B$.'],
          why: 'Next: the picture, and getting rid of cross terms.',
        },
      ],
    },
    {
      name: 'Principal axes',
      terms: [
        ['Reduction', 'For real symmetric $A$, orthogonally diagonalize: $P^TAP = D$. With $x = PX$: $q = x^TAx = X^T(P^TAP)X = \\lambda_1X_1^2 + \\dots + \\lambda_nX_n^2$. No cross terms.'],
        ['Principal axes', 'The new axes are the (orthonormal) eigenvectors of $A$; the coefficients are its eigenvalues.'],
        ['Shape', 'In 2D, $q = c$ is an ellipse if both eigenvalues are positive (positive definite), a hyperbola if they have opposite signs.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'The ellipse hiding in $q$',
          graph: {
            steps: [
              { say: 'Draw every point where $q = 2x^2 + 2xy + 2y^2 = 3$. It is a **tilted ellipse**. The $2xy$ term is what tilts it.' },
              { say: 'Now add the eigen-lines of $A$, along $(1, 1)$ and $(-1, 1)$. The ellipse’s axes lie **exactly** along them. That’s not luck: they are the ==principal axes==.' },
              { say: 'Use the orthonormal eigenvectors as a new grid: a $45°$ rotation $P$. In those coordinates $X, Y$ (with $x = PX$) the ellipse sits straight. Rotate the picture back to see it.', action: { label: 'Straighten it' } },
              { say: 'Straight ellipse: $q = 3X^2 + Y^2$. The cross term is gone; the coefficients $3$ and $1$ are the **eigenvalues** of $A$. Reducing a quadratic form is just orthogonal diagonalization: $x = PX$ gives $q = X^T(P^TAP)X$.' },
            ],
            draw: (step, presses) => {
              const straight = presses >= 1 && step >= 2;
              return {
                M: straight ? ID : R45,
                R: 2.6,
                grid: straight,
                items: [
                  { id: 'e1', span: [1, 0], kind: 'e', o: step >= 1 ? 0.8 : 0 },
                  { id: 'e2', span: [0, 1], kind: 'c', o: step >= 1 ? 0.8 : 0 },
                  { id: 'ell', path: ELL, closed: true, kind: 'a' },
                  { id: 'lab', text: straight ? [1.5, 2.2] : [-1.6, 2.2], label: straight ? '3X² + Y² = 3' : '2x² + 2xy + 2y² = 3', kind: 'a', fixed: true },
                ],
              };
            },
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Reduce $q = 2x^2 + 4xy + 5y^2$ to principal axes.',
          graph: {
            steps: [
              { ask: '$A = \\begin{pmatrix} 2 & a \\\\ a & 5 \\end{pmatrix}$ with $a = $', answer: 2, tol: 0, hint: 'Half of $4$.' },
              { ask: 'Smaller eigenvalue of $A$', answer: 1, tol: 0, hint: '$\\lambda^2 - 7\\lambda + 6 = (\\lambda - 1)(\\lambda - 6)$.' },
              { ask: 'Larger eigenvalue', answer: 6, tol: 0, hint: 'The other root.' },
              { ask: 'Eigenvector for $\\lambda = 6$: $(1, y)$ with $y = $', answer: 2, tol: 0, hint: '$A - 6I$: $-4x + 2y = 0$.' },
              { ask: 'So $q = X^2 + 6Y^2$ is', options: ['an ellipse for $q = c > 0$ (positive definite)', 'a hyperbola'], answer: 0, hint: 'Both coefficients positive.' },
            ],
          },
        },
        {
          type: 'order',
          eyebrow: 'The procedure',
          prompt: 'Order the steps for reducing $q(x) = x^TAx$ to a sum of squares.',
          items: [
            'Write the symmetric matrix $A$ of $q$ (half the cross coefficients off the diagonal).',
            'Find the eigenvalues of $A$ and an orthonormal basis of eigenvectors (Gram–Schmidt if needed).',
            'Form the orthogonal $P$ from these eigenvectors and put $x = PX$.',
            'Then $q = \\lambda_1X_1^2 + \\dots + \\lambda_nX_n^2$.',
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements about $q(x) = x^TAx$ with $A$ real symmetric are true?',
          options: [
            { text: 'It can always be written with no cross terms in a suitable orthonormal basis', correct: true, why: 'Orthogonal diagonalization.' },
            { text: 'The coefficients after reduction are the eigenvalues of $A$', correct: true, why: '$P^TAP = D$.' },
            { text: 'If $A$ has a negative and a positive eigenvalue, $q = 1$ is a hyperbola (in 2D)', correct: true, why: '$\\lambda_1X^2 + \\lambda_2Y^2 = 1$ with opposite signs.' },
            { text: '$q(x) = x^TAx$ needs $A$ diagonal', why: 'Any symmetric $A$ works; diagonal only after reduction.' },
          ],
        },
        {
          type: 'finish',
          title: 'Quadratic forms: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
