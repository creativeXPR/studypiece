// MTH 205 · Forms · Lesson 1: bilinear forms. A machine taking two vectors to a number, linear in
// each slot separately; the signed-area (determinant) form as the picture; examples uᵀAv, dot
// product, B(v, u); the space B(V); the matrix of a form a_ij = B(v_i, v_j) and B(u, v) = [u]ᵀA[v];
// ψ_α: B(V) → Mₙ(F) is an isomorphism.
import { ID } from './la';

const V = [0.5, 1.5];
const US = [[2, 0.5], [2, 0.5], [4, 1], [2, 0.5]];
const VS = [V, V, V, [1, 3]];
const area = (u, v) => u[0] * v[1] - u[1] * v[0];

export default {
  id: 'bilinear-forms',
  title: 'Bilinear forms',
  covers: 'Bilinear forms B: V × V → F (linear in each variable), examples uᵀAv, the dot product, the determinant (signed area) and B(v, u), basic properties, the vector space B(V), the matrix representation ψ_α(B) with entries B(v_i, v_j), B(u, v) = [u]ᵀA[v], and ψ_α as an isomorphism',
  minutes: 18,
  sections: [
    {
      name: 'Two inputs, one number',
      terms: [
        ['Bilinear form', 'A map $B: V \\times V \\to \\mathbb F$ with, for all $a, b \\in \\mathbb F$ and $u, u_1, u_2, v, v_1, v_2 \\in V$: (i) $B(au_1 + bu_2, v) = aB(u_1, v) + bB(u_2, v)$; (ii) $B(u, av_1 + bv_2) = aB(u, v_1) + bB(u, v_2)$.'],
        ['In words', 'Linear in each variable when the other is held fixed.'],
        ['Basic facts', '$B(0, u) = B(u, 0) = 0$; $\\;B(u + v, w + s) = B(u, w) + B(u, s) + B(v, w) + B(v, s)$.'],
        ['Examples', '$B(u, v) = u^TAv$ for any $A \\in M_n(\\mathbb F)$; the dot product on $\\mathbb R^n$; $\\det(u \\; v)$ on $\\mathbb R^2$; and $\\gamma(u, v) = B(v, u)$ for any bilinear $B$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The dot product $u \\cdot v$ takes',
          options: [
            { text: 'two vectors and gives a number', correct: true, why: 'And it is linear in each vector: that is what "bilinear" will mean.' },
            { text: 'one vector and gives a vector', why: 'That is a linear transformation.' },
            { text: 'two vectors and gives a vector', why: 'The cross product does that, not the dot product.' },
            { text: 'one vector and gives a number', why: 'That is a linear functional (or a quadratic form, later).' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Forms · Lesson 1',
          title: 'Machines that eat two vectors',
          body: 'An inner product takes **two** vectors and returns a **number**. Drop the positivity and symmetry rules, keep only "linear in each slot", and you get a ==bilinear form==.\n\nThe determinant of a $2 \\times 2$ matrix is a beautiful example: $B(u, v) = \\det(u \\; v) = u_1v_2 - u_2v_1$, the **signed area** of the parallelogram on $u$ and $v$.',
          cta: 'See it',
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Area is linear in each side',
          graph: {
            steps: [
              { say: 'Here is the parallelogram on $u$ (blue) and $v$ (purple). Its signed area is $B(u, v) = u_1v_2 - u_2v_1$.' },
              { say: 'Hold $v$ fixed and think of the area as a function of $u$ alone. What happens when $u$ is doubled?' },
              { say: 'The base doubles, the height stays: the area **doubles**. $B(2u, v) = 2B(u, v)$. (And sliding $u$ by a sum adds the areas.) The area is linear in the **first** slot…' },
              { say: '…and, holding $u$ fixed, doubling $v$ doubles it too: linear in the **second** slot. Linear in each slot separately: that is exactly what ==bilinear== means. (Not linear in both at once: doubling **both** gives $4\\times$.)' },
            ],
            draw: (step) => {
              const u = US[step];
              const v = VS[step];
              return {
                M: ID,
                R: 3.6,
                items: [
                  { id: 'par', poly: [[0, 0], u, [u[0] + v[0], u[1] + v[1]], v], kind: 'c' },
                  { id: 'u', vec: u, kind: 'a', label: step === 2 ? '2u' : 'u' },
                  { id: 'v', vec: v, kind: 'e', label: step === 3 ? '2v' : 'v' },
                ],
                note: `$B = ${area(u, v)}$`,
              };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Every matrix gives a bilinear form',
          body: 'Take any $n \\times n$ matrix $A$ and define $B(u, v) = u^TAv$ (vectors as columns). Is it linear in $u$? Just let the matrix rules do the work:\n$$B(au_1 + bu_2, v) = (au_1 + bu_2)^TAv = (au_1^T + bu_2^T)Av = au_1^TAv + bu_2^TAv = aB(u_1, v) + bB(u_2, v).$$\nIn the second slot it is the same story: $u^TA(av_1 + bv_2) = au^TAv_1 + bu^TAv_2$. So $B$ is bilinear. That’s the whole proof, and you’ll soon see that **every** bilinear form on $\\mathbb F^n$ looks like this.\n\nThe dot product is $A = I$. The area form is $A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$.',
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Show that $B(u, v) = u^TAv$ is linear in the first variable.',
          items: [
            'Let $u_1, u_2, v \\in \\mathbb F^n$ and $a, b \\in \\mathbb F$.',
            '$B(au_1 + bu_2, v) = (au_1 + bu_2)^TAv$.',
            '$= (au_1^T + bu_2^T)Av = au_1^TAv + bu_2^TAv$.',
            '$= aB(u_1, v) + bB(u_2, v)$. ∎',
          ],
        },
        {
          type: 'bridge',
          title: 'Bilinear = linear in each slot.',
          recap: ['$u^TAv$, dot product, signed area.', '$B(0, u) = 0$.'],
          why: 'Next: every bilinear form has a matrix.',
        },
      ],
    },
    {
      name: 'The matrix of a bilinear form',
      terms: [
        ['Matrix representation', 'For an ordered basis $\\alpha = \\{v_1, \\dots, v_n\\}$ of $V$: $\\psi_\\alpha(B) = A = [a_{ij}]$ with $a_{ij} = B(v_i, v_j)$.'],
        ['Formula', '$B(u, v) = [u]_\\alpha^T\\,A\\,[v]_\\alpha$, where $[u]_\\alpha$ are the coordinates of $u$ in $\\alpha$.'],
        ['$\\mathcal B(V)$', 'The set of bilinear forms on $V$ is a vector space under $(B_1 + B_2)(u, v) = B_1(u, v) + B_2(u, v)$ and $(aB)(u, v) = aB(u, v)$.'],
        ['Isomorphism', '$\\psi_\\alpha: \\mathcal B(V) \\to M_{n \\times n}(\\mathbb F)$ is an isomorphism, so $\\dim\\mathcal B(V) = n^2$. For $V = \\mathbb F^n$ with the standard basis: every bilinear form is $u^TAv$ for a unique $A$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Four numbers decide everything (again)',
          body: 'Remember how a linear map was decided by where the basis vectors go? A bilinear form is decided by what it does to **pairs** of basis vectors.\n\nWrite $u = x_1v_1 + x_2v_2$ and $v = y_1v_1 + y_2v_2$ and expand using bilinearity:\n$$B(u, v) = \\sum_{i, j} x_iy_j\\,B(v_i, v_j).$$\nSo the $n^2$ numbers $a_{ij} = B(v_i, v_j)$ decide $B$ completely. Put them in a matrix $A$, and the sum is exactly $[u]^TA[v]$. That is the ==matrix of $B$ in the basis $\\alpha$==.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Let $B\\big((u_1, u_2), (v_1, v_2)\\big) = 2u_1v_1 + 3u_1v_2 + 4u_2v_1 - u_2v_2$. Find its matrix in the basis $\\alpha = \\{(1, 1), (1, -1)\\}$.',
          body: '$a_{ij} = B(v_i, v_j)$ with $v_1 = (1, 1)$, $v_2 = (1, -1)$.',
          graph: {
            steps: [
              { ask: '$a_{11} = B(v_1, v_1) = $', answer: 8, tol: 0, hint: '$2 + 3 + 4 - 1$.' },
              { ask: '$a_{12} = B(v_1, v_2) = $', answer: 4, tol: 0, hint: '$u = (1, 1)$, $v = (1, -1)$: $2 - 3 + 4 + 1$.' },
              { ask: '$a_{21} = B(v_2, v_1) = $', answer: 2, tol: 0, hint: '$u = (1, -1)$, $v = (1, 1)$: $2 + 3 - 4 + 1$.' },
              { ask: '$a_{22} = B(v_2, v_2) = $', answer: -6, tol: 0, hint: '$2 - 3 - 4 - 1$.', done: '$\\psi_\\alpha(B) = \\begin{pmatrix} 8 & 4 \\\\ 2 & -6 \\end{pmatrix}$' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'In the **standard** basis, the matrix of that same $B$ is',
          options: [
            { text: '$\\begin{pmatrix} 2 & 3 \\\\ 4 & -1 \\end{pmatrix}$', correct: true, why: 'With $\\hat\\imath, \\hat\\jmath$ the matrix just collects the coefficients: $a_{12}$ is the coefficient of $u_1v_2$, $a_{21}$ of $u_2v_1$.' },
            { text: '$\\begin{pmatrix} 2 & 4 \\\\ 3 & -1 \\end{pmatrix}$', why: '$a_{12} = B(\\hat\\imath, \\hat\\jmath)$: the coefficient of $u_1v_2$, which is $3$.' },
            { text: '$\\begin{pmatrix} 8 & 4 \\\\ 2 & -6 \\end{pmatrix}$', why: 'That’s the matrix in the basis $\\alpha$. The matrix depends on the basis.' },
            { text: '$\\begin{pmatrix} 2 & 0 \\\\ 0 & -1 \\end{pmatrix}$', why: 'Don’t drop the cross terms.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Define $B: \\mathbb R^2 \\times \\mathbb R^2 \\to \\mathbb R$ by $B(u, v) = \\det\\begin{pmatrix} u_1 & v_1 \\\\ u_2 & v_2 \\end{pmatrix}$. Find $A$ with $B(u, v) = u^TAv$.',
          graph: {
            steps: [
              { ask: '$a_{11} = B(\\hat\\imath, \\hat\\imath) = $', answer: 0, tol: 0, hint: 'Two equal columns: zero area.' },
              { ask: '$a_{12} = B(\\hat\\imath, \\hat\\jmath) = $', answer: 1, tol: 0, hint: '$\\det I$.' },
              { ask: '$a_{21} = B(\\hat\\jmath, \\hat\\imath) = $', answer: -1, tol: 0, hint: 'Swapping columns flips the sign.' },
              { ask: '$a_{22} = $', answer: 0, tol: 0, hint: 'Equal columns again.', done: '$A = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$' },
            ],
          },
        },
        {
          type: 'reveal',
          eyebrow: 'Why is that true?',
          title: '$\\psi_\\alpha$ is an isomorphism',
          body: 'The theorem says bilinear forms and $n \\times n$ matrices are "the same thing" once a basis is chosen. Open each part of the proof.',
          cards: [
            { title: 'Linear', text: '$\\psi_\\alpha(B + \\gamma)_{ij} = (B + \\gamma)(v_i, v_j) = B(v_i, v_j) + \\gamma(v_i, v_j)$, and $\\psi_\\alpha(aB)_{ij} = aB(v_i, v_j)$. So $\\psi_\\alpha(B + \\gamma) = \\psi_\\alpha(B) + \\psi_\\alpha(\\gamma)$ and $\\psi_\\alpha(aB) = a\\psi_\\alpha(B)$.' },
            { title: 'Injective', text: 'If $\\psi_\\alpha(B) = 0$ then $B(v_i, v_j) = 0$ for all $i, j$. By bilinearity $B(u, v) = \\sum x_iy_jB(v_i, v_j) = 0$ for all $u, v$. So $B = 0$: the kernel is $\\{0\\}$.' },
            { title: 'Surjective', text: 'Given any matrix $A$, define $B(u, v) = [u]_\\alpha^TA[v]_\\alpha$. It is bilinear, and $B(v_i, v_j) = e_i^TAe_j = a_{ij}$, so $\\psi_\\alpha(B) = A$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which maps $\\mathbb R^2 \\times \\mathbb R^2 \\to \\mathbb R$ are bilinear?',
          options: [
            { text: '$B(u, v) = 3u_1v_2 - u_2v_2$', correct: true, why: 'Every term is (entry of $u$)$\\times$(entry of $v$).' },
            { text: '$B(u, v) = u_1v_1 + 1$', why: '$B(0, v) = 1 \\neq 0$.' },
            { text: '$B(u, v) = u_1^2v_2$', why: '$B(2u, v) = 4B(u, v)$: not linear in $u$.' },
            { text: '$B(u, v) = u_1 + v_1$', why: '$B(u, 0) = u_1 \\neq 0$; that is linear in the pair, not bilinear.' },
            { text: '$B(u, v) = (u_1 + u_2)(v_1 - v_2)$', correct: true, why: 'Expand: every term is $u_iv_j$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Bilinear forms: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
