// MTH 205 · Inner products · Lesson 2: the Gram–Schmidt process as "subtract the shadow". In 2D
// the second arrow loses its lean toward the first and becomes perpendicular; then everything is
// shrunk to length 1. General formula, a 3D worked example, and why each new vector is orthogonal.
import { ID } from './la';

const n10 = Math.sqrt(10);
const n25 = Math.sqrt(2.5);
const W = [
  { v1: [3, 1], v2: [1, 2] },
  { v1: [3, 1], v2: [1, 2] },
  { v1: [3, 1], v2: [1, 2] },
  { v1: [3, 1], v2: [-0.5, 1.5] },
  { v1: [3 / n10, 1 / n10], v2: [-0.5 / n25, 1.5 / n25] },
];

export default {
  id: 'gram-schmidt',
  title: 'Gram–Schmidt orthogonalization',
  covers: 'Building an orthogonal basis from any basis by subtracting projections, the Gram–Schmidt formulas w_k = v_k − Σ ⟨v_k, w_i⟩/⟨w_i, w_i⟩ w_i, normalising to an orthonormal basis, why each new vector is orthogonal to the earlier ones, a full 3D example',
  minutes: 16,
  sections: [
    {
      name: 'Remove the lean',
      terms: [
        ['Gram–Schmidt', 'From a basis $\\{v_1, \\dots, v_n\\}$: $w_1 = v_1$; $\\;w_2 = v_2 - \\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}w_1$; $\\;w_3 = v_3 - \\frac{\\langle v_3, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}w_1 - \\frac{\\langle v_3, w_2 \\rangle}{\\langle w_2, w_2 \\rangle}w_2$; and so on.'],
        ['General step', '$w_k = v_k - c_{k1}w_1 - \\dots - c_{k,k-1}w_{k-1}$ with $c_{ki} = \\frac{\\langle v_k, w_i \\rangle}{\\langle w_i, w_i \\rangle}$: subtract the shadow of $v_k$ on each earlier $w_i$.'],
        ['Orthonormal', 'Finally divide each $w_k$ by its norm: $u_k = \\frac{w_k}{\\|w_k\\|}$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The shadow (projection) of $v$ on $w$ is',
          options: [
            { text: '$\\frac{\\langle v, w \\rangle}{\\langle w, w \\rangle}w$', correct: true, why: 'A multiple of $w$, with the right length.' },
            { text: '$\\langle v, w \\rangle$', why: 'That’s a number; the shadow is an arrow along $w$.' },
            { text: '$\\frac{\\langle v, w \\rangle}{\\langle v, v \\rangle}v$', why: 'That would be along $v$. The shadow lies on the line of $w$.' },
            { text: '$v - w$', why: 'That’s the difference, not a projection.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Straightening a basis',
          graph: {
            steps: [
              { say: 'Start with any basis: $v_1 = (3, 1)$ and $v_2 = (1, 2)$. They span the plane, but they aren’t perpendicular. We want a basis that is.' },
              { say: 'Keep the first one as it is: $w_1 = v_1$.' },
              { say: '$v_2$ **leans** towards $w_1$, and that lean is exactly its shadow on $w_1$: $\\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}w_1 = \\frac{5}{10}w_1$ (amber).' },
              { say: 'Remove the lean: $w_2 = v_2 - \\frac12 w_1 = (-0.5, 1.5)$. Now it stands straight up from $w_1$. Check: $\\langle w_2, w_1 \\rangle = -1.5 + 1.5 = 0$ ✓.' },
              { say: 'Finally shrink each to length $1$: $u_1 = \\frac{w_1}{\\sqrt{10}}$, $u_2 = \\frac{w_2}{\\sqrt{2.5}}$. An ==orthonormal basis== of the same plane. That is the whole ==Gram–Schmidt process==: subtract shadows, then normalise.' },
            ],
            draw: (step) => {
              const w = W[step];
              return {
                M: ID,
                R: 3,
                items: [
                  { id: 'l1', span: [3, 1], kind: 's', fixed: true, o: step >= 2 && step <= 3 ? 0.35 : 0 },
                  { id: 'v1', vec: w.v1, kind: 'a', label: step >= 4 ? 'u₁' : step >= 1 ? 'w₁' : 'v₁' },
                  { id: 'sh', vec: [1.5, 0.5], kind: 'c', w: 4, o: step === 2 || step === 3 ? 1 : 0 },
                  { id: 'drop', seg: [[1, 2], [1.5, 0.5]], kind: 's', o: step === 2 ? 1 : 0 },
                  { id: 'v2', vec: w.v2, kind: 'e', label: step >= 4 ? 'u₂' : step >= 3 ? 'w₂' : 'v₂' },
                ],
              };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'Why is that true?',
          title: 'Why each new $w_k$ is perpendicular to all the earlier ones',
          body: 'Check $w_2$ against $w_1$, using the axioms:\n$$\\langle w_2, w_1 \\rangle = \\langle v_2, w_1 \\rangle - \\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}\\langle w_1, w_1 \\rangle = \\langle v_2, w_1 \\rangle - \\langle v_2, w_1 \\rangle = 0.$$\nThe number $c = \\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}$ was chosen precisely to make this zero.\n\nFor $w_k$ and an earlier $w_i$: the earlier $w$’s are already perpendicular to each other, so in $\\langle w_k, w_i \\rangle$ every subtracted shadow vanishes **except** the one along $w_i$, and that one cancels $\\langle v_k, w_i \\rangle$ exactly. Zero again.\n\nAnd no $w_k$ is $0$: if it were, $v_k$ would be a combination of $v_1, \\dots, v_{k-1}$, but those are independent. Each $w_k$ is built from $v_1, \\dots, v_k$, so the span never changes. That’s the whole proof.',
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Order the steps for producing an orthonormal basis from a basis $\\{v_1, v_2, v_3\\}$.',
          items: [
            'Let $w_1 = v_1$.',
            'Let $w_2 = v_2 - \\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}w_1$.',
            'Let $w_3 = v_3 - \\frac{\\langle v_3, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}w_1 - \\frac{\\langle v_3, w_2 \\rangle}{\\langle w_2, w_2 \\rangle}w_2$.',
            'Normalise: $u_i = \\frac{w_i}{\\|w_i\\|}$; then $\\{u_1, u_2, u_3\\}$ is orthonormal.',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Apply Gram–Schmidt to $v_1 = (1, 1, 1)$, $v_2 = (0, 1, 1)$, $v_3 = (0, 0, 1)$ in $\\mathbb R^3$.',
          body: 'Fractions are fine, e.g. `-2/3`.',
          graph: {
            steps: [
              { ask: '$\\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle} = $', answer: 0.6667, tol: 0.002, hint: '$\\frac{0 + 1 + 1}{3}$.' },
              { ask: '$w_2 = v_2 - \\frac23 w_1$. Its first entry', answer: -0.6667, tol: 0.002, hint: '$0 - \\frac23$.', done: '$w_2 = \\left(-\\frac23, \\frac13, \\frac13\\right)$' },
              { ask: '$\\frac{\\langle v_3, w_2 \\rangle}{\\langle w_2, w_2 \\rangle} = $', answer: 0.5, tol: 0.002, hint: '$\\frac{1/3}{4/9 + 1/9 + 1/9} = \\frac{1/3}{2/3}$.' },
              { ask: '$w_3 = v_3 - \\frac13 w_1 - \\frac12 w_2$. Its second entry', answer: -0.5, tol: 0.002, hint: '$0 - \\frac13 - \\frac12 \\cdot \\frac13$.' },
              { ask: 'and its third entry', answer: 0.5, tol: 0.002, hint: '$1 - \\frac13 - \\frac16$.', done: '$w_3 = \\left(0, -\\frac12, \\frac12\\right)$' },
              { ask: '$\\|w_3\\| = $ (3 d.p.)', answer: 0.707, tol: 0.002, hint: '$\\sqrt{\\frac14 + \\frac14} = \\frac{1}{\\sqrt2}$.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements about Gram–Schmidt are true?',
          options: [
            { text: 'The $w$’s span the same space as the $v$’s', correct: true, why: 'Each $w_k$ is $v_k$ minus a combination of earlier vectors, and vice versa.' },
            { text: 'It works with any inner product, not only the dot product', correct: true, why: 'It only uses the axioms.' },
            { text: 'If the $v$’s are already orthogonal, it leaves them unchanged (before normalising)', correct: true, why: 'All the shadows are $0$.' },
            { text: 'Changing the order of the $v$’s gives the same $w$’s', why: '**False:** the first vector is kept, so the order matters.' },
          ],
        },
        {
          type: 'finish',
          title: 'Gram–Schmidt: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
