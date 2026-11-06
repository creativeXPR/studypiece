// MTH 205 · Warm-up · Lesson 2: combining and undoing motions. A product AB is "do B, then A";
// order matters; the inverse undoes a motion and exists exactly when nothing is squashed;
// (AB)⁻¹ = B⁻¹A⁻¹ ("socks and shoes") and the transpose rules, as a proof walk.
import { A, ID, ROT90, iHat, jHat } from './la';

const SH_ROT = [1, -1, 1, 0]; // shear after rotate
const ROT_SH = [0, -1, 1, 1]; // rotate after shear

export default {
  id: 'combining-and-undoing',
  title: 'Combining and undoing motions',
  covers: 'Matrix product as composition (do the right-hand matrix first), why AB ≠ BA in general, the inverse as the motion that undoes A, when an inverse exists, the 2 × 2 inverse formula, (AB)⁻¹ = B⁻¹A⁻¹ and the transpose rules',
  minutes: 14,
  sections: [
    {
      name: 'One motion after another',
      terms: [
        ['Product $AB$', 'Do $B$ first, then $A$. Read right to left, like $f(g(x))$.'],
        ['Columns of $AB$', 'Column $j$ of $AB$ is $A$ applied to column $j$ of $B$: follow where $B$ sends $\\hat\\imath$, then move it by $A$.'],
        ['Order matters', 'In general $AB \\neq BA$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: '$\\det A = 0$ means, in pictures,',
          options: [
            { text: 'the plane is squashed onto a line or a point', correct: true, why: 'Zero area: some direction is crushed.' },
            { text: 'the plane is flipped over', why: 'Flipping gives a **negative** determinant.' },
            { text: 'nothing moves', why: 'Nothing moving is $A = I$, with $\\det = 1$.' },
            { text: 'the plane is rotated', why: 'Rotations keep area: $\\det = 1$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'A turn, then a shear',
          graph: {
            steps: [
              { say: 'Two motions: $R$, a quarter turn, and $S = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$, a shear that slides the top of the plane to the right.' },
              { say: 'First turn the plane with $R$.', action: { label: 'Turn (R)' } },
              { say: 'Now shear the **result** with $S$. The whole two-step motion is one matrix, written $SR$: the one done first sits on the **right**, like $f(g(x))$.', action: { label: 'Then shear (S)' } },
              { say: 'Where did $\\hat\\imath$ end up? $R$ sent it to $(0, 1)$, and $S$ sent that to $(1, 1)$. That is the first column of $SR = \\begin{pmatrix} 1 & -1 \\\\ 1 & 0 \\end{pmatrix}$. Multiplying matrices is just following $\\hat\\imath$ and $\\hat\\jmath$ through both motions.' },
              { say: 'Now the other order: shear first, then turn. $RS = \\begin{pmatrix} 0 & -1 \\\\ 1 & 1 \\end{pmatrix}$: a **different** grid. Order matters: $SR \\neq RS$.', action: { label: 'Swap the order' } },
            ],
            draw: (step, presses) => {
              const M = step >= 4 && presses >= 3 ? ROT_SH : step >= 2 && presses >= 2 ? SH_ROT : step >= 1 && presses >= 1 ? ROT90 : ID;
              return { M, R: 3.5, items: [{ id: 'sq', poly: [[0, 0], [1, 0], [1, 1], [0, 1]], kind: 'c' }, iHat(), jHat()] };
            },
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'For any two $2 \\times 2$ matrices, $\\det(AB)$ equals',
          options: [
            { text: '$\\det A \\cdot \\det B$', correct: true, why: '$B$ scales areas by $\\det B$, then $A$ scales them by $\\det A$: the factors multiply. This holds even though $AB \\neq BA$.' },
            { text: '$\\det A + \\det B$', why: 'Scalings **multiply**: doubling then tripling is $\\times 6$, not $\\times 5$.' },
            { text: 'it depends on the order', why: 'Areas scale by the same total either way: $\\det(AB) = \\det(BA)$.' },
            { text: '$0$', why: 'Only if one of them squashes the plane.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Products are chains of motions.',
          recap: ['$AB$: do $B$ first, then $A$.', 'Usually $AB \\neq BA$, but $\\det(AB) = \\det A\\det B$.'],
          why: 'Next: running a motion backwards.',
        },
      ],
    },
    {
      name: 'Undoing a motion',
      terms: [
        ['Inverse', '$A^{-1}$ undoes $A$: $A^{-1}A = AA^{-1} = I$.'],
        ['When it exists', '$A^{-1}$ exists $\\iff \\det A \\neq 0$ (nothing was squashed). Such $A$ is ==non-singular== or invertible; the invertible $n \\times n$ matrices form the group $GL_n(\\mathbb F)$.'],
        ['$2 \\times 2$ formula', '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.'],
        ['Socks and shoes', '$(AB)^{-1} = B^{-1}A^{-1}$ and $(AB)^T = B^TA^T$. Also $(A + B)^T = A^T + B^T$, $I^T = I$, $\\det A^T = \\det A$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Run it backwards',
          graph: {
            steps: [
              { say: 'Apply our friend $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$.', action: { label: 'Apply A' } },
              { say: 'Is there a motion that puts every arrow back where it started? Yes: $A^{-1} = \\frac{1}{3}\\begin{pmatrix} 2 & -1 \\\\ -1 & 2 \\end{pmatrix}$. Doing $A$ then $A^{-1}$ is doing nothing: $A^{-1}A = I$.', action: { label: 'Apply A⁻¹' } },
              { say: 'Now a squash ($\\det = 0$). A whole line of arrows lands on $0$. To undo it, $A^{-1}$ would have to send $0$ back to **all** of them at once: impossible. That is why $A^{-1}$ exists exactly when $\\det A \\neq 0$, and why the formula divides by $\\det A$.', action: { label: 'Squash' } },
            ],
            draw: (step, presses) => {
              const M = presses >= 3 ? [1, 2, 0.5, 1] : presses >= 2 ? ID : presses >= 1 ? A : ID;
              const items = [{ id: 'v', vec: [1, 1.5], kind: 'a', label: 'v' }, iHat(), jHat()];
              if (step >= 2) items.push({ id: 'n', span: [2, -1], kind: 'e', fixed: true });
              return { M, R: 4, items };
            },
          },
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Socks and shoes',
          body: 'You put on socks, then shoes. To undo it you take off the **shoes first**. Matrices are the same.',
          graph: {
            steps: [
              { say: 'Do $B$ (a turn) and then $A$: together that is $AB$.', action: { label: 'Do B, then A' } },
              { say: 'To get back, the last thing done must be undone first: undo $A$ with $A^{-1}$…', action: { label: 'Undo A' } },
              { say: '…and then undo $B$ with $B^{-1}$. We are home. So undoing $AB$ is "$A^{-1}$ first, then $B^{-1}$", which is written $B^{-1}A^{-1}$ (the first one done sits on the right).', action: { label: 'Undo B' } },
              { say: 'The algebra just confirms the picture: $(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AIA^{-1} = AA^{-1} = I$. So $(AB)^{-1} = B^{-1}A^{-1}$. That’s the whole proof.' },
            ],
            draw: (step, presses) => {
              const AB = [A[0] * 0 + A[1] * 1, -A[0], A[2] * 0 + A[3] * 1, -A[2]]; // A · ROT90
              const M = presses >= 3 ? ID : presses >= 2 ? ROT90 : presses >= 1 ? AB : ID;
              return { M, R: 4, items: [{ id: 'sq', poly: [[0, 0], [1, 0], [1, 1], [0, 1]], kind: 'c' }, iHat(), jHat()] };
            },
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Show that if $A, B \\in GL_n(\\mathbb F)$ then $(AB)^{-1} = B^{-1}A^{-1}$.',
          items: [
            'Since $A, B$ are invertible, $A^{-1}$ and $B^{-1}$ exist.',
            '$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1}$ by associativity.',
            '$= AIA^{-1} = AA^{-1} = I$, and similarly $(B^{-1}A^{-1})(AB) = I$.',
            'Hence $AB$ is invertible with $(AB)^{-1} = B^{-1}A^{-1}$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Find the inverse of $M = \\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}$.',
          body: 'Use $\\frac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$\\det M = $', answer: 1, tol: 0, hint: '$3 \\cdot 2 - 1 \\cdot 5$.' },
              { ask: 'Top-left entry of $M^{-1}$', answer: 2, tol: 0, hint: 'Swap $a$ and $d$: the top-left becomes $d = 2$.' },
              { ask: 'Top-right entry of $M^{-1}$', answer: -1, tol: 0, hint: 'Negate $b$.' },
              { ask: 'Bottom-left entry of $M^{-1}$', answer: -5, tol: 0, hint: 'Negate $c$.' },
              { ask: 'Bottom-right entry of $M^{-1}$', answer: 3, tol: 0, hint: 'It becomes $a = 3$.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which rules are true for all invertible $n \\times n$ matrices $A, B$?',
          options: [
            { text: '$(AB)^T = B^TA^T$', correct: true, why: '**True:** the order reverses, like the inverse.' },
            { text: '$(AB)^{-1} = A^{-1}B^{-1}$', why: '**False:** shoes before socks: $(AB)^{-1} = B^{-1}A^{-1}$.' },
            { text: '$\\det(A^{-1}) = \\frac{1}{\\det A}$', correct: true, why: '**True:** undoing a $\\times 3$ area change is a $\\times \\frac13$ change. Algebra: $\\det A\\det A^{-1} = \\det I = 1$.' },
            { text: '$(A + B)^T = A^T + B^T$', correct: true, why: '**True:** transpose entry by entry.' },
            { text: '$AB = BA$', why: '**False:** the turn and the shear showed it.' },
          ],
        },
        {
          type: 'finish',
          title: 'Combining and undoing: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
