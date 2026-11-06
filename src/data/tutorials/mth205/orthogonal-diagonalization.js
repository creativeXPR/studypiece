// MTH 205 · Inner products · Lesson 3: orthogonal matrices (motions that keep lengths and angles:
// rotations and reflections, Aᵀ = A⁻¹), orthogonal transformations, symmetric matrices have real
// eigenvalues and perpendicular eigenvectors, orthogonally diagonalizable ⇔ symmetric, and the
// procedure (eigenspace bases → Gram–Schmidt → normalise → P, PᵀAP = D).
import { ID } from './la';

const C = Math.SQRT1_2;
const R45 = [C, -C, C, C];
const AR45 = [3 * C, -C, 3 * C, C];
const t = Math.PI / 6;
const ROT30 = [Math.cos(t), -Math.sin(t), Math.sin(t), Math.cos(t)];
const REFL = [1, 0, 0, -1];

export default {
  id: 'orthogonal-diagonalization',
  title: 'Orthogonal matrices and orthogonal diagonalization',
  covers: 'Orthogonal matrices (AᵀA = I, A⁻¹ = Aᵀ) as rotations and reflections that preserve inner products, orthogonal transformations, orthogonally similar and orthogonally diagonalizable matrices, symmetric matrices have real eigenvalues and orthogonal eigenvectors, the equivalence of orthogonal diagonalizability, an orthonormal eigenbasis and symmetry, and the procedure with Gram–Schmidt',
  minutes: 20,
  sections: [
    {
      name: 'Rigid motions',
      terms: [
        ['Orthogonal matrix', 'A square $A$ with $A^{-1} = A^T$, i.e. $AA^T = A^TA = I$. Its columns (and rows) form an orthonormal set.'],
        ['Orthogonal transformation', '$T_A: \\mathbb R^n \\to \\mathbb R^n$, $T_A(x) = Ax$ with $A$ orthogonal. It preserves inner products, hence lengths and angles: a rotation or a reflection.'],
        ['Example', 'The rotation through $\\theta$: $\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$ is orthogonal.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Gram–Schmidt turns any basis into',
          options: [
            { text: 'an orthogonal basis of the same space (orthonormal after normalising)', correct: true, why: 'Subtract shadows, then divide by the norms.' },
            { text: 'the standard basis', why: 'It keeps the span but not the standard vectors.' },
            { text: 'a basis of eigenvectors', why: 'It knows nothing about any matrix.' },
            { text: 'a set of unit vectors only', why: 'Normalising alone doesn’t make them perpendicular.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Motions that keep the grid square',
          graph: {
            steps: [
              { say: 'Most matrices bend the grid: squares become slanted parallelograms. Some special ones move the plane **rigidly**: every length and every angle is kept.', action: { label: 'Rotate by 30°' } },
              { say: 'A rotation. The unit square is still a unit square; $\\hat\\imath$ and $\\hat\\jmath$ are still perpendicular and still of length $1$. So the **columns** of the matrix are orthonormal.' },
              { say: 'A reflection is rigid too (it flips, so $\\det = -1$). Matrices like these are called ==orthogonal==: their columns are an orthonormal set, which is the same as $A^TA = I$, i.e. $A^{-1} = A^T$.', action: { label: 'Reflect instead' } },
            ],
            draw: (step, presses) => ({
              M: presses >= 2 ? REFL : presses >= 1 ? ROT30 : ID,
              R: 3,
              items: [{ id: 'sq', poly: [[0, 0], [1, 0], [1, 1], [0, 1]], kind: presses >= 2 ? 'd' : 'c' }, { id: 'i', vec: [1, 0], kind: 'b', label: 'î' }, { id: 'j', vec: [0, 1], kind: 'd', label: 'ĵ' }],
            }),
          },
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Why $A^TA = I$ means "rigid"',
          body: 'Entry $(i, j)$ of $A^TA$ is (column $i$) $\\cdot$ (column $j$). So $A^TA = I$ says: each column has length $1$ (diagonal $1$s) and different columns are perpendicular (off-diagonal $0$s). The new $\\hat\\imath$ and $\\hat\\jmath$ form a perfect square grid.\n\nAnd then **all** inner products survive:\n$$Au \\cdot Av = (Au)^T(Av) = u^TA^TAv = u^TIv = u \\cdot v.$$\nSame inner products means same lengths ($\\|Au\\| = \\|u\\|$) and same angles. That’s the whole proof.',
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Show that an orthogonal matrix $A$ preserves the dot product, and hence lengths.',
          items: [
            'For $u, v \\in \\mathbb R^n$: $Au \\cdot Av = (Au)^T(Av) = u^TA^TAv$.',
            'Since $A$ is orthogonal, $A^TA = I$, so $Au \\cdot Av = u^Tv = u \\cdot v$.',
            'Taking $v = u$: $\\|Au\\|^2 = \\|u\\|^2$, so $\\|Au\\| = \\|u\\|$. ∎',
          ],
        },
        {
          type: 'bridge',
          title: 'Orthogonal = rigid.',
          recap: ['$A^{-1} = A^T$: inverses for free.', 'Rotations and reflections.'],
          why: 'Next: which matrices can be diagonalized by a rigid change of basis?',
        },
      ],
    },
    {
      name: 'Symmetric matrices',
      terms: [
        ['Orthogonally similar', '$B = P^TAP$ with $P$ orthogonal (so $P^T = P^{-1}$).'],
        ['Orthogonally diagonalizable', '$P^TAP = D$ diagonal for some orthogonal $P$.'],
        ['Theorem', 'For real $n \\times n$ $A$, these are equivalent: (a) $A$ is orthogonally diagonalizable; (b) $A$ has an orthonormal set of $n$ eigenvectors; (c) $A$ is symmetric.'],
        ['Symmetric facts', 'If $A^T = A$: all eigenvalues are real, and eigenvectors from different eigenspaces are orthogonal.'],
        ['Procedure', '1. Find a basis of each eigenspace. 2. Gram–Schmidt within each eigenspace and normalise. 3. These columns form an orthogonal $P$; $P^TAP = D$, eigenvalues in matching order.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Notice something',
          title: 'Perpendicular eigen-lines',
          graph: {
            steps: [
              { say: 'Our friend $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ is ==symmetric== ($A^T = A$). Its eigen-lines, $(1, 1)$ and $(-1, 1)$, are **perpendicular**. Coincidence?' },
              { say: 'Compare $B = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$, not symmetric. Its eigen-lines $(1, 1)$ and $(1, -2)$ meet at an awkward angle.' },
              { say: 'For a symmetric matrix the eigen-lines always meet at right angles. So we can choose the eigen-grid to be a **rotated square grid**: for $A$, a $45°$ rotation $P$ lines the grid up with the eigen-lines.', action: { label: 'Rotate the grid' } },
              { say: 'Now apply $A$: the rotated grid just stretches along itself ($\\times 3$ and $\\times 1$). So $P^TAP = \\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$ with $P$ orthogonal: $A$ is ==orthogonally diagonalizable==.', action: { label: 'Apply A' } },
            ],
            draw: (step, presses) => {
              const M = presses >= 2 ? AR45 : presses >= 1 ? R45 : ID;
              const nonSym = step === 1;
              return {
                M,
                R: 3.6,
                items: [
                  { id: 'e1', span: [1, 1], kind: 'e', fixed: true, o: 0.6 },
                  { id: 'e2', span: nonSym ? [1, -2] : [-1, 1], kind: 'c', fixed: true, o: 0.6 },
                  { id: 'i', vec: [1, 0], kind: 'b', o: step >= 2 ? 1 : 0 },
                  { id: 'j', vec: [0, 1], kind: 'd', o: step >= 2 ? 1 : 0 },
                ],
              };
            },
          },
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Why symmetric means perpendicular',
          body: 'Take eigenvectors $v_1, v_2$ of a symmetric $A$ with $\\lambda_1 \\neq \\lambda_2$. Let’s compute $Av_1 \\cdot v_2$ in two ways.',
          graph: {
            steps: [
              { say: '**Way 1.** $Av_1 = \\lambda_1v_1$, so $Av_1 \\cdot v_2 = \\lambda_1(v_1 \\cdot v_2)$.' },
              { say: '**Way 2.** Move $A$ across the dot: $Av_1 \\cdot v_2 = (Av_1)^Tv_2 = v_1^TA^Tv_2$. Here symmetry is used: $A^T = A$, so this is $v_1 \\cdot Av_2 = \\lambda_2(v_1 \\cdot v_2)$.' },
              { say: 'Same number, so $\\lambda_1(v_1 \\cdot v_2) = \\lambda_2(v_1 \\cdot v_2)$, i.e. $(\\lambda_1 - \\lambda_2)(v_1 \\cdot v_2) = 0$.' },
              { say: 'The eigenvalues differ, so $v_1 \\cdot v_2 = 0$: perpendicular. That’s the whole proof, and the only place symmetry was needed is "move $A$ across the dot". (A similar trick with complex conjugates shows every eigenvalue is real.)' },
            ],
            draw: () => ({
              M: ID,
              R: 3,
              items: [
                { id: 'v1', vec: [1.2, 1.2], kind: 'e', label: 'v₁' },
                { id: 'v2', vec: [-1, 1], kind: 'c', label: 'v₂' },
                { id: 'rt', path: [[0.25, 0.25], [0, 0.5], [-0.25, 0.25]], kind: 's' },
              ],
            }),
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove: if $A$ is real symmetric and $Av_1 = \\lambda_1v_1$, $Av_2 = \\lambda_2v_2$ with $\\lambda_1 \\neq \\lambda_2$, then $v_1 \\cdot v_2 = 0$.',
          items: [
            '$\\lambda_1(v_1 \\cdot v_2) = (\\lambda_1v_1) \\cdot v_2 = Av_1 \\cdot v_2$.',
            '$Av_1 \\cdot v_2 = v_1^TA^Tv_2 = v_1^TAv_2 = v_1 \\cdot (\\lambda_2v_2) = \\lambda_2(v_1 \\cdot v_2)$, using $A^T = A$.',
            'So $(\\lambda_1 - \\lambda_2)(v_1 \\cdot v_2) = 0$.',
            'Since $\\lambda_1 - \\lambda_2 \\neq 0$, $v_1 \\cdot v_2 = 0$. ∎',
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Find an orthogonal $P$ that diagonalizes $A = \\begin{pmatrix} 2 & -1 & -1 \\\\ -1 & 2 & -1 \\\\ -1 & -1 & 2 \\end{pmatrix}$',
          body: '**Eigenvalues.** $|A - \\lambda I| = -\\lambda(\\lambda - 3)^2$: $\\lambda = 0$ and $\\lambda = 3$ (twice).\n\n**Step 1: eigenspace bases.** $\\lambda = 0$: $(1, 1, 1)$. $\\;\\lambda = 3$: $A - 3I$ has every row $-(1, 1, 1)$, so $E_3$ is the plane $x + y + z = 0$, with basis $v_1 = (-1, 1, 0)$, $v_2 = (-1, 0, 1)$.\n\n**Step 2: Gram–Schmidt inside $E_3$** ($v_1, v_2$ aren’t perpendicular): $w_1 = (-1, 1, 0)$, $w_2 = v_2 - \\frac12 w_1 = \\left(-\\frac12, -\\frac12, 1\\right)$. ($E_0$ is already perpendicular to $E_3$: different eigenvalues.)\n\n**Step 3: normalise and assemble.**\n$$P = \\begin{pmatrix} \\frac{1}{\\sqrt3} & -\\frac{1}{\\sqrt2} & -\\frac{1}{\\sqrt6} \\\\ \\frac{1}{\\sqrt3} & \\frac{1}{\\sqrt2} & -\\frac{1}{\\sqrt6} \\\\ \\frac{1}{\\sqrt3} & 0 & \\frac{2}{\\sqrt6} \\end{pmatrix}, \\qquad P^TAP = \\begin{pmatrix} 0 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}.$$',
          asides: [{ label: 'Why Gram–Schmidt here?', text: 'Inside one eigenspace any basis is fine for ordinary diagonalization, but for an **orthogonal** $P$ the columns must be perpendicular. Different eigenspaces are perpendicular automatically; within one, you must make them so.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Orthogonally diagonalize $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: 'Unit eigenvector for $\\lambda = 3$: $\\frac{1}{\\sqrt2}(1, y)$ with $y = $', answer: 1, tol: 0, hint: 'Eigenvector $(1, 1)$, length $\\sqrt2$.' },
              { ask: 'Unit eigenvector for $\\lambda = 1$: $\\frac{1}{\\sqrt2}(-1, y)$ with $y = $', answer: 1, tol: 0, hint: 'Eigenvector $(-1, 1)$.' },
              { ask: '$P = \\frac{1}{\\sqrt2}\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$. $\\det P = $', answer: 1, tol: 0.001, hint: '$\\frac12(1 + 1)$: a rotation (by $45°$).' },
              { ask: 'Top-left entry of $P^TAP$', answer: 3, tol: 0.001, hint: 'The eigenvalue of the first column.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true for real matrices?',
          options: [
            { text: 'A matrix is orthogonally diagonalizable iff it is symmetric', correct: true, why: 'The main theorem of this lesson.' },
            { text: 'If $A$ is orthogonal then $\\det A = \\pm 1$', correct: true, why: '$\\det(A^TA) = (\\det A)^2 = \\det I = 1$.' },
            { text: 'Every diagonalizable matrix is orthogonally diagonalizable', why: '**False:** $\\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$ is diagonalizable but its eigenvectors aren’t perpendicular.' },
            { text: 'A symmetric matrix can have complex non-real eigenvalues', why: '**False:** symmetric real matrices have only real eigenvalues.' },
            { text: 'If $P$ is orthogonal, $P^{-1}AP = P^TAP$', correct: true, why: '$P^{-1} = P^T$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Orthogonal diagonalization: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
