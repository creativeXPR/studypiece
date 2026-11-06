// MTH 205 · Eigenvalues · Lesson 1: similar matrices. A change of basis is a change of language;
// P⁻¹AP is the same motion A described in the language whose basis vectors are the columns of P.
// Similarity is an equivalence relation; similar matrices share determinant, trace and
// characteristic polynomial; A and Aᵀ share the characteristic polynomial.
import { ID } from './la';

const P = [1, -1, 1, 1]; // columns b₁ = (1, 1), b₂ = (−1, 1)
const AP = [3, -1, 3, 1]; // A·P: her grid after A

export default {
  id: 'similar-matrices',
  title: 'Similar matrices',
  covers: 'Change of basis as translation between languages, P⁻¹AP as the same transformation in another basis, similar matrices B = P⁻¹AP (equivalently B = PAP⁻¹ with P replaced by P⁻¹), GLₙ(F), similarity as an equivalence relation, invariants (determinant, trace, characteristic polynomial, eigenvalues), and A and Aᵀ sharing the characteristic polynomial',
  minutes: 18,
  sections: [
    {
      name: 'Same motion, another language',
      terms: [
        ['Change-of-basis matrix', '$P$ has the new basis vectors as its columns. It turns new coordinates into ours; $P^{-1}$ turns ours into new.'],
        ['Similar matrices', '$B$ is similar to $A$ if $B = P^{-1}AP$ for some $P \\in GL_n(\\mathbb F)$ (the invertible $n \\times n$ matrices). Some books write $B = PAP^{-1}$: the same idea with $P$ and $P^{-1}$ swapped.'],
        ['Meaning', 'Similar matrices are **one** linear transformation written in two different bases.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: '$(AB)^{-1} = $',
          options: [
            { text: '$B^{-1}A^{-1}$', correct: true, why: 'Undo the last motion first: shoes, then socks.' },
            { text: '$A^{-1}B^{-1}$', why: 'The order reverses.' },
            { text: '$BA$', why: 'That isn’t an inverse at all.' },
            { text: '$\\frac{1}{AB}$', why: 'There is no dividing by matrices; use inverses.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Eigenvalues · Lesson 1',
          title: 'Two people, one motion',
          body: 'You describe arrows with $\\hat\\imath$ and $\\hat\\jmath$. A friend uses different basis arrows: $b_1 = (1, 1)$ and $b_2 = (-1, 1)$. When she says "the vector $(1, 1)$", she means $1b_1 + 1b_2$: a different arrow from yours!\n\nSame plane, same arrows, **two languages**. A matrix is written in a language too. So how would she write our friend $A$?',
          cta: 'Translate',
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Her grid',
          graph: {
            steps: [
              { say: 'Her basis arrows: $b_1 = (1, 1)$ (purple) and $b_2 = (-1, 1)$ (amber). Her grid is built from them.', action: { label: 'Show her grid' } },
              { say: 'The matrix $P = \\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$ (her basis vectors as columns) is a **translator**: it takes her coordinates and gives ours. Her $(1, 1)$ is $b_1 + b_2 = (0, 2)$ in ours: $P\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 2 \\end{pmatrix}$. And $P^{-1}$ translates back.' },
              { say: 'Now let $A$ act on her grid. Look: her grid lines just **stretch along themselves**. $b_1$ becomes $3b_1$, $b_2$ stays $b_2$.', action: { label: 'Apply A' } },
              { say: 'So in her language $A$ is simply $\\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$. To compute it: translate her vector into ours ($P$), apply $A$, translate back ($P^{-1}$): $P^{-1}AP = \\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$.' },
              { say: 'Two matrices that describe the **same motion** in two languages are called ==similar==: $B = P^{-1}AP$. (Her basis was the eigenvectors of $A$. That’s no accident, and it’s the whole idea of Chapter 3.)' },
            ],
            draw: (step, presses) => {
              const M = presses >= 2 ? AP : presses >= 1 ? P : ID;
              return {
                M,
                R: 4,
                items: [
                  { id: 'b1', vec: [1, 0], kind: 'e', label: M === ID ? 'î' : presses >= 2 ? '3b₁' : 'b₁' },
                  { id: 'b2', vec: [0, 1], kind: 'c', label: M === ID ? 'ĵ' : 'b₂' },
                  { id: 'w', pt: [1, 1], kind: 'a', label: step === 1 ? 'her (1,1)' : '', o: step === 1 ? 1 : 0 },
                ],
              };
            },
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'If $B = P^{-1}AP$, which of these must $A$ and $B$ share?',
          options: [
            { text: 'The determinant', correct: true, why: 'It is the same motion, so it scales area by the same factor. Algebra: $|P^{-1}AP| = |P^{-1}||A||P| = |A|$.' },
            { text: 'Every entry', why: 'Entries depend on the language: $A$ and $\\operatorname{diag}(3, 1)$ look nothing alike.' },
            { text: 'The first column', why: 'The first column is where **her** first basis arrow goes, written in **her** words: language-dependent.' },
            { text: 'Nothing at all', why: 'Anything describing the motion itself (area factor, stretch factors) is shared.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Similar = same motion, different basis.',
          recap: ['$P$: her coordinates → ours.', '$P^{-1}AP$: $A$ in her language.'],
          why: 'Next: why similarity behaves like "equals", and what it keeps.',
        },
      ],
    },
    {
      name: 'What similarity keeps',
      terms: [
        ['Equivalence relation', 'Similarity is reflexive ($A \\sim A$), symmetric ($A \\sim B \\Rightarrow B \\sim A$) and transitive ($A \\sim B$, $B \\sim C \\Rightarrow A \\sim C$).'],
        ['Invariants', 'Similar matrices have the same determinant, trace, characteristic polynomial and eigenvalues (but usually different eigenvectors: each written in its own language).'],
        ['Transpose', '$A$ and $A^T$ have the same characteristic polynomial: $|A^T - \\lambda I| = |(A - \\lambda I)^T| = |A - \\lambda I|$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Why is that true?',
          title: 'Similarity is an equivalence relation',
          body: 'Exams love "prove that similarity is an equivalence relation". Open each card: the picture first, then the line you write.',
          cards: [
            { title: 'Reflexive: $A \\sim A$', text: 'Speaking the same language needs no translator: use $P = I$. Write: $A = I^{-1}AI$ with $I \\in GL_n(\\mathbb F)$.' },
            { title: 'Symmetric: $A \\sim B \\Rightarrow B \\sim A$', text: 'If her description is $B = P^{-1}AP$, then yours is hers translated back: $A = PBP^{-1} = (P^{-1})^{-1}B(P^{-1})$, and $P^{-1} \\in GL_n(\\mathbb F)$.' },
            { title: 'Transitive: $A \\sim B$, $B \\sim C \\Rightarrow A \\sim C$', text: 'Two translators in a row are one translator. If $B = P^{-1}AP$ and $C = Q^{-1}BQ$ then $C = Q^{-1}P^{-1}APQ = (PQ)^{-1}A(PQ)$, and $PQ \\in GL_n(\\mathbb F)$.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove that similarity is **transitive**.',
          items: [
            'Suppose $A \\sim B$ and $B \\sim C$: $B = P^{-1}AP$ and $C = Q^{-1}BQ$ with $P, Q \\in GL_n(\\mathbb F)$.',
            'Substitute: $C = Q^{-1}(P^{-1}AP)Q = (Q^{-1}P^{-1})A(PQ)$.',
            'Since $(PQ)^{-1} = Q^{-1}P^{-1}$, this is $C = (PQ)^{-1}A(PQ)$.',
            '$PQ \\in GL_n(\\mathbb F)$ (product of invertibles), so $A \\sim C$. ∎',
          ],
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Same motion, same stretch factors',
          body: 'Eigenvalues are stretch factors of the **motion**, not of the language. So similar matrices should have the same eigenvalues. Let’s watch the algebra agree.\n\nThe trick is to slip $\\lambda I$ inside the translation. Since $P^{-1}(\\lambda I)P = \\lambda P^{-1}P = \\lambda I$:\n$$P^{-1}AP - \\lambda I = P^{-1}AP - P^{-1}(\\lambda I)P = P^{-1}(A - \\lambda I)P.$$\nNow take determinants, which multiply:\n$$|P^{-1}AP - \\lambda I| = |P^{-1}|\\,|A - \\lambda I|\\,|P| = |A - \\lambda I|,$$\nbecause $|P^{-1}||P| = 1$. Same characteristic polynomial, so same eigenvalues, same determinant (the constant term) and same trace. That’s the whole proof.',
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove that similar matrices have the same characteristic polynomial.',
          items: [
            'Let $B = P^{-1}AP$ with $P \\in GL_n(\\mathbb F)$.',
            'Using $\\lambda I_n = P^{-1}(\\lambda I_n)P$: $B - \\lambda I_n = P^{-1}(A - \\lambda I_n)P$.',
            'So $P_B(\\lambda) = |B - \\lambda I_n| = |P^{-1}|\\,|A - \\lambda I_n|\\,|P|$.',
            'Since $|P^{-1}||P| = |P^{-1}P| = 1$, $P_B(\\lambda) = |A - \\lambda I_n| = P_A(\\lambda)$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'To prove $A$ and $A^T$ have the same characteristic polynomial, the key fact is',
          options: [
            { text: '$|M^T| = |M|$, applied to $M = A - \\lambda I$, since $(A - \\lambda I)^T = A^T - \\lambda I$', correct: true, why: 'Transposing doesn’t change a determinant, and $I^T = I$.' },
            { text: '$A^T = A$', why: 'Only for symmetric matrices; the result holds for all $A$.' },
            { text: '$A^T = P^{-1}AP$ with $P = I$', why: 'That would make $A^T = A$.' },
            { text: '$(AB)^T = B^TA^T$', why: 'True, but not what is needed here.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Let $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$ and $P = \\begin{pmatrix} 1 & 1 \\\\ 1 & -2 \\end{pmatrix}$. Compute $B = P^{-1}AP$.',
          body: 'First compute $AP$, then $P^{-1}(AP)$.',
          graph: {
            steps: [
              { ask: '$|P| = $', answer: -3, tol: 0, hint: '$1(-2) - 1(1)$.' },
              { ask: '$AP = \\begin{pmatrix} 5 & q \\\\ 5 & -4 \\end{pmatrix}$ with $q = $', answer: 2, tol: 0, hint: 'Row 1 of $A$ times column 2 of $P$: $4(1) + 1(-2)$.' },
              { ask: 'Top-left entry of $B$', answer: 5, tol: 0, hint: '$P^{-1} = -\\frac13\\begin{pmatrix} -2 & -1 \\\\ -1 & 1 \\end{pmatrix}$; row 1 times column 1 of $AP$.' },
              { ask: 'Bottom-right entry of $B$', answer: 2, tol: 0, hint: 'Row 2 of $P^{-1}$ times column 2 of $AP$.' },
              { ask: 'Off-diagonal entries of $B$', answer: 0, tol: 0, hint: 'The columns of $P$ are eigenvectors of $A$.', done: '$B = \\operatorname{diag}(5, 2)$: same trace $7$, same determinant $10$' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: '$A$ and $B$ are similar. Which must be true?',
          options: [
            { text: '$\\operatorname{tr}A = \\operatorname{tr}B$', correct: true, why: 'Same characteristic polynomial, and the trace is (minus) its $\\lambda^{n-1}$ coefficient.' },
            { text: '$A$ and $B$ have the same eigenvalues', correct: true, why: 'Same motion, same stretch factors.' },
            { text: '$A$ and $B$ have the same eigenvectors', why: '**False:** each is written in its own basis. If $Av = \\lambda v$ then $B(P^{-1}v) = \\lambda(P^{-1}v)$.' },
            { text: '$A$ is invertible iff $B$ is', correct: true, why: 'Same determinant.' },
            { text: '$A = B$', why: '**False:** $A$ and $\\operatorname{diag}(3, 1)$ are similar but different.' },
          ],
        },
        {
          type: 'finish',
          title: 'Similar matrices: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
