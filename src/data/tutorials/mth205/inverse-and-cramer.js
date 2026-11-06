// MTH 205 · Systems · Lesson 3: square systems with det A ≠ 0. X = A⁻¹B (undo the motion) and the
// proof that it is the unique solution; the inverse method; Cramer's rule seen as areas
// (the parallelogram on î and X has area y; after A it has area det A · y).
import { A, ID } from './la';

export default {
  id: 'inverse-and-cramer',
  title: 'Inverse method and Cramer’s rule',
  covers: 'Unique solution X = A⁻¹B when A is non-singular and its proof, solving by the inverse method, Cramer’s rule x_i = D_i / D and why it works geometrically, when each method applies',
  minutes: 16,
  sections: [
    {
      name: 'Undo the motion',
      terms: [
        ['Theorem', 'If $A^{-1}$ exists ($|A| \\neq 0$), $AX = B$ has the unique solution $X = A^{-1}B$.'],
        ['Singular case', 'If $|A| = 0$, $AX = B$ has either no solution or infinitely many, depending on consistency.'],
        ['Inverse method', 'Find $A^{-1}$, then multiply: $X = A^{-1}B$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'A system $AX = B$ is consistent exactly when',
          options: [
            { text: '$\\operatorname{rank}A = \\operatorname{rank}(A|B)$', correct: true, why: '$B$ adds no new direction: it is reachable.' },
            { text: '$\\det A = 0$', why: 'That only says the solution isn’t unique **if** one exists.' },
            { text: '$B = 0$', why: 'Then it is homogeneous (always consistent), but many non-homogeneous systems are consistent too.' },
            { text: '$\\operatorname{rank}A < \\operatorname{rank}(A|B)$', why: 'That is the **inconsistent** case.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'One target, one arrow',
          body: 'When $|A| \\neq 0$, why is there exactly one solution, and why is it $A^{-1}B$?',
          graph: {
            steps: [
              { say: 'Here is the target $B = (4, 5)$, already sitting in the **moved** plane of $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$. Which arrow got sent there?', action: { label: 'Apply A' } },
              { say: 'Simply run the motion backwards. $A^{-1}$ carries $B$ back to the arrow it came from: $X = A^{-1}B = (1, 2)$. Multiplying $AX = B$ by $A^{-1}$ on the left says exactly this.', action: { label: 'Undo with A⁻¹' } },
              { say: 'Could two different arrows $X_1 \\neq X_2$ both land on $B$? Then $AX_1 = AX_2$, and undoing gives $X_1 = A^{-1}AX_1 = A^{-1}AX_2 = X_2$. A motion that can be undone never sends two arrows to one place. Unique. That’s the whole proof.' },
            ],
            draw: (step, presses) => ({
              M: presses >= 2 ? ID : presses >= 1 ? A : ID,
              R: 5.4,
              items: [{ id: 'x', vec: [1, 2], kind: 'a', label: presses === 1 ? 'AX' : 'X', o: presses >= 1 ? 1 : 0.25 }, { id: 'b', pt: [4, 5], kind: 'c', label: 'B', fixed: true }],
            }),
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Show that if $A^{-1}$ exists, $AX = B$ has the unique solution $X = A^{-1}B$.',
          items: [
            'Since $|A| \\neq 0$, $A^{-1}$ exists. Premultiply $AX = B$ by $A^{-1}$: $A^{-1}AX = A^{-1}B$.',
            'So $IX = A^{-1}B$, i.e. $X = A^{-1}B$ (and this does satisfy $AX = AA^{-1}B = B$).',
            'For uniqueness, suppose $AX_1 = B$ and $AX_2 = B$. Then $AX_1 = AX_2$.',
            'Premultiplying by $A^{-1}$ gives $X_1 = X_2$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Solve $5x - y = 7$, $3x + 2y = 12$ by the inverse method.',
          body: '$A = \\begin{pmatrix} 5 & -1 \\\\ 3 & 2 \\end{pmatrix}$, $B = \\begin{pmatrix} 7 \\\\ 12 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$|A| = $', answer: 13, tol: 0, hint: '$5 \\cdot 2 - (-1)(3)$.' },
              { ask: '$A^{-1} = \\frac{1}{13}\\begin{pmatrix} 2 & p \\\\ -3 & 5 \\end{pmatrix}$ with $p = $', answer: 1, tol: 0, hint: 'Negate $b = -1$.' },
              { ask: '$x = \\frac{1}{13}(2 \\cdot 7 + 1 \\cdot 12) = $', answer: 2, tol: 0, hint: '$\\frac{26}{13}$.' },
              { ask: '$y = \\frac{1}{13}(-3 \\cdot 7 + 5 \\cdot 12) = $', answer: 3, tol: 0, hint: '$\\frac{39}{13}$.' },
            ],
          },
        },
        {
          type: 'bridge',
          title: 'Invertible means: one arrow per target.',
          recap: ['$X = A^{-1}B$, unique.', 'Singular: none or infinitely many.'],
          why: 'Next: a shortcut that never computes $A^{-1}$ at all.',
        },
      ],
    },
    {
      name: 'Cramer’s rule',
      terms: [
        ['Cramer’s rule', 'If $D = |A| \\neq 0$: $x_i = \\frac{D_i}{D}$, where $D_i$ is $|A|$ with column $i$ replaced by $B$.'],
        ['Why', 'The area (volume) built from the unknown $X$ and the other basis vectors equals $x_i$; the motion multiplies it by $D$, giving $D_i$.'],
        ['When', 'Only for square systems with $D \\neq 0$. It is handy for $2 \\times 2$ and $3 \\times 3$, or when only one unknown is wanted.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Unknowns hidden in an area',
          graph: {
            steps: [
              { say: 'Here’s a sneaky way to get $y$ without solving. Draw the parallelogram on $\\hat\\imath$ and the unknown arrow $X = (x, y)$. Its base is $1$ and its height is $y$, so its **area is $y$**.' },
              { say: 'Now apply $A$. Every area is multiplied by $D = \\det A$, so the new parallelogram has area $D \\cdot y$.', action: { label: 'Apply A' } },
              { say: 'But we know its sides! They are $A\\hat\\imath$ (the first column of $A$) and $AX = B$. So its area is also the determinant with those columns: $D_y = \\begin{vmatrix} 2 & 4 \\\\ 1 & 5 \\end{vmatrix} = 6$.' },
              { say: 'Same area, two ways: $D \\cdot y = D_y$, so $y = \\frac{D_y}{D} = \\frac{6}{3} = 2$. That is Cramer’s rule: replace the column of the unknown by $B$, take the determinant, divide by $D$. The same story with a parallelogram on $X$ and $\\hat\\jmath$ gives $x$.' },
            ],
            draw: (step, presses) => ({
              M: presses >= 1 ? A : ID,
              R: 5.4,
              items: [
                { id: 'par', poly: [[0, 0], [1, 0], [2, 2], [1, 2]], kind: 'c' },
                { id: 'i', vec: [1, 0], kind: 'b', label: presses >= 1 ? 'Aî' : 'î' },
                { id: 'x', vec: [1, 2], kind: 'a', label: presses >= 1 ? 'B' : 'X' },
              ],
              note: presses >= 1 ? 'area $= D \\cdot y = 3y = 6$' : 'area $= y$',
            }),
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Solve $2x - y + 3z = 2$, $x + 3y - z = 11$, $2x - 2y + 5z = 3$',
          body: '$D = \\begin{vmatrix} 2 & -1 & 3 \\\\ 1 & 3 & -1 \\\\ 2 & -2 & 5 \\end{vmatrix} = 2(15 - 2) + 1(5 + 2) + 3(-2 - 6) = 26 + 7 - 24 = 9$.\n\nReplace each column by $B = (2, 11, 3)$ in turn:\n$D_x = \\begin{vmatrix} 2 & -1 & 3 \\\\ 11 & 3 & -1 \\\\ 3 & -2 & 5 \\end{vmatrix} = -9$, $\\;D_y = 45$, $\\;D_z = 27$.\n\nSo $x = \\frac{-9}{9} = -1$, $y = \\frac{45}{9} = 5$, $z = \\frac{27}{9} = 3$.\n\n**Check** in equation 2: $-1 + 15 - 3 = 11$ ✓.',
          asides: [{ label: 'Remark', text: 'For a $3 \\times 3$ system you still check $|A| \\neq 0$ for a unique solution, but Cramer’s rule avoids computing $A^{-1}$ (nine cofactors) entirely.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Check $D_x$ for that system yourself.',
          body: '$D_x = \\begin{vmatrix} 2 & -1 & 3 \\\\ 11 & 3 & -1 \\\\ 3 & -2 & 5 \\end{vmatrix}$, expanded along the first row.',
          graph: {
            steps: [
              { ask: 'First term: $2\\begin{vmatrix} 3 & -1 \\\\ -2 & 5 \\end{vmatrix} = $', answer: 26, tol: 0, hint: '$2(15 - 2)$.' },
              { ask: 'Second term: $-(-1)\\begin{vmatrix} 11 & -1 \\\\ 3 & 5 \\end{vmatrix} = $', answer: 58, tol: 0, hint: '$+1 \\cdot (55 + 3)$.' },
              { ask: 'Third term: $3\\begin{vmatrix} 11 & 3 \\\\ 3 & -2 \\end{vmatrix} = $', answer: -93, tol: 0, hint: '$3(-22 - 9)$.' },
              { ask: '$D_x = $', answer: -9, tol: 0, hint: '$26 + 58 - 93$.' },
              { ask: '$x = D_x / D = $', answer: -1, tol: 0, hint: '$D = 9$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'Cramer’s rule cannot be used when',
          options: [
            { text: '$|A| = 0$', correct: true, why: 'You would divide by $D = 0$; the system then has none or infinitely many solutions.' },
            { text: 'some entries of $B$ are negative', why: 'Signs of $B$ don’t matter.' },
            { text: 'the system is $3 \\times 3$', why: 'It works for any square size with $D \\neq 0$.' },
            { text: 'one of the solutions is $0$', why: 'Then $D_i = 0$ and $x_i = 0$: fine.' },
          ],
        },
        {
          type: 'finish',
          title: 'Inverse method and Cramer’s rule: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
