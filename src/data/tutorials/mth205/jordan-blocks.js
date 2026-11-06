// MTH 205 · Jordan form · Lesson 1: when diagonalization fails. The shear (2 1; 0 2) = 2I + N:
// N slides ĵ onto î and crushes î, so ĵ → î → 0 is a Jordan chain and ĵ a generalized eigenvector.
// Jordan blocks, the Jordan canonical form, generalized eigenspaces K_λ, T-invariant subspaces and
// the theorems about them, and the two conditions for diagonalizability.
import { ID, SHEAR } from './la';

const N = [0, 1, 0, 0];
const ZERO = [0, 0, 0, 0];

export default {
  id: 'jordan-blocks',
  title: 'When diagonalization fails: Jordan blocks',
  covers: 'Algebraic and geometric multiplicity again, the shear as stretch plus slide, nilpotent parts, generalized eigenvectors and Jordan chains, Jordan blocks and the Jordan canonical form, T-invariant subspaces, generalized eigenspaces K_λ and their properties, and the conditions for a linear operator to be diagonalizable',
  minutes: 20,
  sections: [
    {
      name: 'Stretch plus slide',
      terms: [
        ['Jordan block', '$J_k(\\lambda)$: the $k \\times k$ matrix with $\\lambda$ on the diagonal, $1$ just above it, $0$ elsewhere. E.g. $J_3(\\lambda) = \\begin{pmatrix} \\lambda & 1 & 0 \\\\ 0 & \\lambda & 1 \\\\ 0 & 0 & \\lambda \\end{pmatrix}$.'],
        ['Generalized eigenvector', '$v \\neq 0$ with $(T - \\lambda I)^pv = 0$ for some positive integer $p$. (Ordinary eigenvectors are the case $p = 1$.)'],
        ['Jordan chain', '$v_p \\to v_{p-1} \\to \\dots \\to v_1 \\to 0$, each arrow being $T - \\lambda I$. The last nonzero vector $v_1$ is an eigenvector.'],
        ['Jordan canonical form', 'If the characteristic polynomial splits, there is a basis (a ==Jordan canonical basis==) in which $[T] = J = \\operatorname{diag}(J_1, \\dots, J_k)$, each $J_i$ a Jordan block. $J$ is unique up to the order of blocks.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The shear $\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$ is not diagonalizable because',
          options: [
            { text: '$\\lambda = 2$ has AM $= 2$ but only one eigen-direction (GM $= 1$)', correct: true, why: 'Only the $x$-axis stays on its line.' },
            { text: 'its determinant is $0$', why: 'Its determinant is $4$.' },
            { text: 'it has no eigenvalues', why: 'It has $\\lambda = 2$.' },
            { text: 'it isn’t symmetric', why: 'Many non-symmetric matrices are diagonalizable.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Jordan form · Lesson 1',
          title: 'If not diagonal, then what?',
          body: 'Diagonalization needs a full grid of eigenvectors. When some eigenvalue is short of eigenvectors (GM $<$ AM), no basis makes the matrix diagonal.\n\nBut there is a "next best" form, almost diagonal, that **every** matrix can reach (once its characteristic polynomial splits, e.g. over $\\mathbb C$): the ==Jordan canonical form==. To see what it looks like, take the shear apart.',
          cta: 'Take it apart',
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'A shear is a stretch plus a slide',
          graph: {
            steps: [
              { say: 'Here is the shear $S = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$ in action. It stretches everything by $2$ **and** slides the plane sideways.', action: { label: 'Apply S' } },
              { say: 'Split it: $S = 2I + N$ with $N = S - 2I = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$. The $2I$ part is the stretch. Look at what the leftover $N$ does on its own.', action: { label: 'Apply N = S − 2I' } },
              { say: '$N$ crushes $\\hat\\imath$ to $0$ ($\\hat\\imath$ is the eigenvector), and it slides $\\hat\\jmath$ **onto** $\\hat\\imath$. Everything lands on the $x$-axis.' },
              { say: 'Apply $N$ once more: $\\hat\\imath$ is crushed, so now **everything** is $0$: $N^2 = 0$.', action: { label: 'Apply N again' } },
              { say: 'So $\\hat\\jmath$ isn’t an eigenvector ($N\\hat\\jmath \\neq 0$), but $N^2\\hat\\jmath = 0$: it is a ==generalized eigenvector==. The ==Jordan chain== $\\hat\\jmath \\to \\hat\\imath \\to 0$ is all the structure there is. In the basis $(\\hat\\imath, \\hat\\jmath)$ the matrix is "$\\lambda$ on the diagonal, $1$ just above": a ==Jordan block==.' },
            ],
            draw: (step, presses) => {
              const M = presses >= 3 ? ZERO : presses >= 2 ? N : presses >= 1 ? SHEAR : ID;
              return {
                M,
                R: 3.4,
                items: [
                  { id: 'ax', span: [1, 0], kind: 'e', fixed: true, o: 0.5 },
                  { id: 'i', vec: [1, 0], kind: 'b', label: 'î' },
                  { id: 'j', vec: [0, 1], kind: 'd', label: 'ĵ' },
                ],
                note: presses >= 3 ? '$N^2 = 0$' : presses >= 2 ? '$N\\hat\\jmath = \\hat\\imath$, $\\;N\\hat\\imath = 0$' : undefined,
              };
            },
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'Which matrix is a single $3 \\times 3$ Jordan block for $\\lambda = 5$?',
          options: [
            { text: '$\\begin{pmatrix} 5 & 1 & 0 \\\\ 0 & 5 & 1 \\\\ 0 & 0 & 5 \\end{pmatrix}$', correct: true, why: '$5$ on the diagonal, $1$s just above.' },
            { text: '$\\begin{pmatrix} 5 & 0 & 0 \\\\ 1 & 5 & 0 \\\\ 0 & 1 & 5 \\end{pmatrix}$', why: 'The $1$s go just **above** the diagonal (this is the transpose).' },
            { text: '$\\begin{pmatrix} 5 & 1 & 1 \\\\ 0 & 5 & 1 \\\\ 0 & 0 & 5 \\end{pmatrix}$', why: 'Only the superdiagonal has $1$s; the corner is $0$.' },
            { text: '$\\begin{pmatrix} 5 & 1 & 0 \\\\ 0 & 5 & 0 \\\\ 0 & 0 & 5 \\end{pmatrix}$', why: 'That is two blocks: $J_2(5)$ and $J_1(5)$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Jordan block = stretch by $\\lambda$ + slide along a chain.',
          recap: ['$(A - \\lambda I)$ moves each chain vector one step down.', 'Generalized eigenvectors: killed by a **power** of $A - \\lambda I$.'],
          why: 'Next: the spaces these chains live in.',
        },
      ],
    },
    {
      name: 'Generalized eigenspaces',
      terms: [
        ['$T$-invariant', 'A subspace $W$ with $T(W) \\subseteq W$.'],
        ['Generalized eigenspace', '$K_\\lambda = \\{v \\in V : (T - \\lambda I)^pv = 0 \\text{ for some } p \\ge 1\\}$. It contains the eigenspace $E_\\lambda$.'],
        ['Theorem 1', '(a) $K_\\lambda$ is a $T$-invariant subspace containing $E_\\lambda$. (b) For $\\mu \\neq \\lambda$, $T - \\mu I$ restricted to $K_\\lambda$ is one-to-one.'],
        ['Theorem 2', 'If the characteristic polynomial splits and $\\lambda$ has multiplicity $m$: $\\dim K_\\lambda \\le m$, in fact $= m$, and $K_\\lambda = \\ker(T - \\lambda I)^m$.'],
        ['Theorem 3', 'If the characteristic polynomial splits with distinct eigenvalues $\\lambda_1, \\dots, \\lambda_k$, the union of bases of the $K_{\\lambda_i}$ is a basis of $V$.'],
        ['Diagonalizable', '$T$ is diagonalizable $\\iff$ its characteristic polynomial splits and, for each $\\lambda$, AM $=$ GM, i.e. $\\operatorname{nullity}(T - \\lambda I) = $ multiplicity, i.e. $E_\\lambda = K_\\lambda$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The picture',
          title: 'Eigenspace vs generalized eigenspace',
          body: 'For the shear: $E_2$ is just the $x$-axis (crushed by $N$ in one go). But $\\hat\\jmath$ is crushed in **two** goes. Collect everything that is crushed eventually and you get $K_2 = \\ker N^2$: the whole plane.\n\nSo while eigenspaces can be too small to fill the space, the ==generalized eigenspaces== always fill it exactly: $\\dim K_\\lambda = $ the algebraic multiplicity, and together they give a basis of $V$. Jordan form is just diagonalization done with $K_\\lambda$ instead of $E_\\lambda$.\n\nAnd you can now read off the diagonalizability test: it works exactly when nothing needs a second go, $E_\\lambda = K_\\lambda$ for every $\\lambda$.',
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Why $K_\\lambda$ is $T$-invariant',
          body: 'If $v$ gets crushed eventually, does $Tv$ also get crushed eventually? Let’s see.\n\nThe key fact: $T$ and $T - \\lambda I$ can be applied in either order, since $T(T - \\lambda I) = T^2 - \\lambda T = (T - \\lambda I)T$. So they also commute with powers: $(T - \\lambda I)^pT = T(T - \\lambda I)^p$.\n\nNow if $(T - \\lambda I)^pv = 0$, then\n$$(T - \\lambda I)^p(Tv) = T\\big((T - \\lambda I)^pv\\big) = T(0) = 0.$$\nSo $Tv \\in K_\\lambda$ too. And $K_\\lambda$ contains $E_\\lambda$ (take $p = 1$). That’s the whole proof of Theorem 1(a).',
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove that $K_\\lambda$ is $T$-invariant.',
          items: [
            'Let $v \\in K_\\lambda$, so $(T - \\lambda I)^pv = 0$ for some $p \\ge 1$.',
            '$T$ commutes with $T - \\lambda I$, hence with $(T - \\lambda I)^p$.',
            'So $(T - \\lambda I)^p(Tv) = T\\big((T - \\lambda I)^pv\\big) = T(0) = 0$.',
            'Thus $Tv \\in K_\\lambda$, i.e. $T(K_\\lambda) \\subseteq K_\\lambda$. ∎',
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Every eigenvector is a generalized eigenvector', correct: true, why: 'Take $p = 1$.' },
            { text: '$\\dim K_\\lambda$ equals the algebraic multiplicity of $\\lambda$ (when the characteristic polynomial splits)', correct: true, why: 'Theorem 2.' },
            { text: '$\\dim E_\\lambda$ always equals the algebraic multiplicity', why: '**False:** for the shear $\\dim E_2 = 1 < 2$.' },
            { text: 'A matrix is diagonalizable iff every Jordan block is $1 \\times 1$', correct: true, why: 'Then $J$ is diagonal.' },
            { text: 'Every real matrix has a real Jordan form', why: '**False:** the characteristic polynomial must split; a rotation’s doesn’t over $\\mathbb R$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Jordan blocks: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
