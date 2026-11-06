// MTH 205 · Systems · Lesson 2: non-homogeneous systems AX = B. Which arrow lands on b? One (A
// invertible), a whole shifted line (b in the column space of a squash) or none (b off it).
// Augmented matrix, consistency (rank A = rank (A|B)), general solution = particular + null space,
// the k-parameter system.
import { A, ID } from './la';

const SQ = [1, 2, 0.5, 1];
const SOLS = [-2, -1, 0, 1].map((t) => [4 + 2 * t, -t]);

export default {
  id: 'nonhomogeneous-systems',
  title: 'Non-homogeneous systems',
  covers: 'Non-homogeneous systems AX = B, the augmented matrix, column space, consistency and the rank test rank A = rank (A|B), unique, infinitely many or no solutions, general solution = particular solution + solution of the homogeneous system, systems with a parameter k',
  minutes: 18,
  sections: [
    {
      name: 'Which arrow lands on b?',
      terms: [
        ['Non-homogeneous system', '$AX = B$ with not all $b_i = 0$.'],
        ['Augmented matrix', '$(A|B)$: the coefficient matrix with the column $B$ attached.'],
        ['Column space', 'All outputs $AX$: everything the motion can reach. $AX = B$ has a solution exactly when $B$ is in it.'],
        ['Consistent', 'Has at least one solution $\\iff \\operatorname{rank}A = \\operatorname{rank}(A|B)$.'],
        ['General solution', '$X = X_p + X_h$: one particular solution plus every solution of $AX = 0$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The solutions of $AX = 0$ are',
          options: [
            { text: 'the vectors $A$ crushes to $0$ (the null space)', correct: true, why: 'And there are $n - r$ independent ones.' },
            { text: 'only $X = 0$, always', why: 'Only when nothing is crushed ($r = n$).' },
            { text: 'all outputs of $A$', why: 'That is the column space: what $A$ reaches.' },
            { text: 'none, sometimes', why: '$X = 0$ always works.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Aim at a target',
          graph: {
            steps: [
              { say: 'Now the right-hand side is a target point $b$, not $0$. The system $AX = b$ asks: **which arrow does $A$ send to $b$?** Here $b = (4, 5)$.' },
              { say: 'For $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, exactly one arrow hits: $X = (1, 2)$. Nothing is squashed, so different arrows land in different places: a ==unique solution==.', action: { label: 'Apply A' } },
              { say: 'Now a squash. Before it acts, look at the purple dots: they lie on a line. Press the button and watch where they go.', action: { label: 'Apply the squash' } },
              { say: 'Every output now lies on one line, the ==column space== (blue). All the dots landed on the same target $b = (4, 2)$, which is on that line: **infinitely many solutions**.' },
              { say: 'But the target $b\' = (2, 3)$ is **off** the line. No arrow can ever land there: **no solution**. The system is ==inconsistent==.' },
            ],
            draw: (step, presses) => {
              const M = presses >= 2 ? SQ : presses >= 1 && step < 2 ? A : ID;
              const items = [];
              if (step <= 1) {
                items.push({ id: 'b', pt: [4, 5], kind: 'c', label: 'b', fixed: true }, { id: 'x', vec: [1, 2], kind: 'a', label: step === 1 && presses >= 1 ? 'AX' : 'X' });
              } else {
                items.push({ id: 'col', span: [2, 1], kind: 'a', fixed: true, o: presses >= 2 ? 0.8 : 0 });
                SOLS.forEach((p, i) => items.push({ id: `s${i}`, pt: p, kind: 'e' }));
                items.push({ id: 'b1', pt: [4, 2], kind: 'c', label: 'b', fixed: true, o: step >= 3 ? 1 : 0.35 });
                items.push({ id: 'b2', pt: [2, 3], kind: 'd', label: 'b′', fixed: true, o: step >= 4 ? 1 : 0.35 });
              }
              return { M, R: 5.4, items };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'The rank test',
          title: 'Is the target reachable?',
          body: 'The outputs of $A$ are combinations of its **columns** (that’s the column space). So $AX = B$ is solvable exactly when $B$ is a combination of the columns of $A$.\n\nTest it by attaching $B$ as an extra column: the ==augmented matrix== $(A|B)$.\n**$B$ reachable:** it adds no new direction, so $\\operatorname{rank}(A|B) = \\operatorname{rank}A$: ==consistent==.\n**$B$ unreachable:** it adds a new direction, so $\\operatorname{rank}(A|B) = \\operatorname{rank}A + 1$: inconsistent. In echelon form you see a row $(0 \\; 0 \\; \\cdots \\; 0 \\mid c)$ with $c \\neq 0$, i.e. "$0 = c$".',
        },
        {
          type: 'reveal',
          eyebrow: 'Three possible answers',
          title: '$n$ unknowns, $r = \\operatorname{rank}A$',
          cards: [
            { title: 'Unique solution', text: '$\\operatorname{rank}A = \\operatorname{rank}(A|B) = n$. Nothing is crushed; one arrow hits $B$. For square $A$: $\\det A \\neq 0$.' },
            { title: 'Infinitely many', text: '$\\operatorname{rank}A = \\operatorname{rank}(A|B) = r < n$. A whole shifted copy of the null space hits $B$, with $n - r$ free parameters.' },
            { title: 'No solution', text: '$\\operatorname{rank}A < \\operatorname{rank}(A|B)$. $B$ is outside the column space.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Why the solutions are a shifted null space',
          body: 'Those purple dots formed a line parallel to the null space. Coincidence? Let’s see.',
          graph: {
            steps: [
              { say: 'Take one solution $X_p = (4, 0)$, and any other solution $X = (2, 1)$. Both are sent to $b$.' },
              { say: 'Look at the step between them, $X - X_p$ (dashed). Where does $A$ send it?', action: { label: 'Apply the squash' } },
              { say: 'To $0$! Because $A(X - X_p) = AX - AX_p = b - b = 0$. So the difference of two solutions is always in the null space…' },
              { say: '…and the other way round, $X_p$ plus anything crushed is still a solution: $A(X_p + X_h) = b + 0 = b$. So **all** solutions are $X = X_p + X_h$: one particular solution, shifted along the null space. That’s the whole proof.' },
            ],
            draw: (step, presses) => ({
              M: presses >= 1 ? SQ : ID,
              R: 5,
              items: [
                { id: 'null', span: [2, -1], kind: 'e', fixed: true, o: step >= 2 ? 0.6 : 0 },
                { id: 'xp', vec: [4, 0], kind: 'a', label: 'Xₚ' },
                { id: 'x', vec: [2, 1], kind: 'c', label: 'X' },
                { id: 'd', seg: [[4, 0], [2, 1]], kind: 'e' },
              ],
            }),
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Show that if $X_p$ is a solution of $AX = B$, then every solution is $X_p + X_h$ with $AX_h = 0$.',
          items: [
            'Let $X$ be any solution, so $AX = B$, and $AX_p = B$.',
            'Then $A(X - X_p) = AX - AX_p = B - B = 0$.',
            'So $X_h = X - X_p$ solves $AX_h = 0$, and $X = X_p + X_h$.',
            'Conversely, if $AX_h = 0$ then $A(X_p + X_h) = B + 0 = B$. ∎',
          ],
        },
        {
          type: 'bridge',
          title: 'Reachable or not: that is the question.',
          recap: ['Consistent $\\iff \\operatorname{rank}A = \\operatorname{rank}(A|B)$.', 'Solutions $= X_p + $ null space.'],
          why: 'Next: exam-style systems, including the famous "find $k$".',
        },
      ],
    },
    {
      name: 'Exam-style systems',
      terms: [
        ['Parameter systems', 'For square $A$ depending on $k$: $\\det A \\neq 0$ gives a unique solution; at the values where $\\det A = 0$, compare $\\operatorname{rank}A$ with $\\operatorname{rank}(A|B)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Show $3x + 4y + 6z + w = 1$, $3x + 4y - 3z + 2w = 2$ is consistent, and solve it',
          body: '$(A|B) = \\left(\\begin{array}{cccc|c} 3 & 4 & 6 & 1 & 1 \\\\ 3 & 4 & -3 & 2 & 2 \\end{array}\\right) \\xrightarrow{R_2 - R_1} \\left(\\begin{array}{cccc|c} 3 & 4 & 6 & 1 & 1 \\\\ 0 & 0 & -9 & 1 & 1 \\end{array}\\right)$.\n\n$\\operatorname{rank}A = \\operatorname{rank}(A|B) = 2$: **consistent**, with $4 - 2 = 2$ free unknowns ($y$ and $w$).\n\nFrom row 2: $z = \\frac{w - 1}{9}$. From row 1: $3x = 1 - 4y - 6z - w$, so $x = \\frac{5}{9} - \\frac{4}{3}y - \\frac{5}{9}w$.\n\nSolution: $\\left(\\frac59 - \\frac43 s - \\frac59 t,\\; s,\\; \\frac{t - 1}{9},\\; t\\right)$ for any $s, t \\in \\mathbb R$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Show that $x + y = -1$, $2x + y - 3z = -1$, $y + 4z = 4$ is consistent and solve it.',
          body: 'Reduce $(A|B)$ on paper first.',
          graph: {
            steps: [
              { ask: '$\\det A = $', answer: -1, tol: 0, hint: 'Expand $\\begin{vmatrix} 1 & 1 & 0 \\\\ 2 & 1 & -3 \\\\ 0 & 1 & 4 \\end{vmatrix}$ along the first row: $1(4 + 3) - 1(8 - 0) + 0$.' },
              { ask: 'So the system has', options: ['a unique solution', 'infinitely many solutions', 'no solution'], answer: 0, hint: '$\\det A \\neq 0$: nothing is squashed.' },
              { ask: '$z = $', answer: 5, tol: 0, hint: 'Eliminate: $R_2 - 2R_1$ gives $-y - 3z = 1$; add $R_3$: $z = 5$.' },
              { ask: '$y = $', answer: -16, tol: 0, hint: '$y = 4 - 4z$.' },
              { ask: '$x = $', answer: 15, tol: 0, hint: '$x = -1 - y$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'The classic',
          title: 'For which $k$ does $kx + y + z = 1$, $x + ky + z = 1$, $x + y + kz = 1$ have one, none or many solutions?',
          body: '$\\det A = \\begin{vmatrix} k & 1 & 1 \\\\ 1 & k & 1 \\\\ 1 & 1 & k \\end{vmatrix} = (k - 1)^2(k + 2)$.\n\n**$k \\neq 1, -2$:** $\\det A \\neq 0$, **unique** solution ($x = y = z = \\frac{1}{k + 2}$).\n\n**$k = 1$:** all three equations are $x + y + z = 1$. $\\operatorname{rank}A = \\operatorname{rank}(A|B) = 1 < 3$: **infinitely many** (a whole plane of solutions, $2$ parameters).\n\n**$k = -2$:** adding all three rows of $A$ gives $(0, 0, 0)$ but adding the right sides gives $3$: "$0 = 3$". $\\operatorname{rank}A = 2 < \\operatorname{rank}(A|B) = 3$: **no solution**.',
          asides: [{ label: 'Exam method', text: 'Factorise $\\det A$ first. Then treat each root of $\\det A = 0$ separately by row-reducing $(A|B)$ with that value of $k$ substituted.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'In the system above with $k = -2$, the system is inconsistent because',
          options: [
            { text: '$\\operatorname{rank}A = 2$ but $\\operatorname{rank}(A|B) = 3$', correct: true, why: '$B$ points in a direction the columns can’t reach.' },
            { text: '$\\det A = 0$', why: '$\\det A = 0$ only says "not unique". At $k = 1$, $\\det A = 0$ too, yet there are infinitely many solutions.' },
            { text: '$\\operatorname{rank}A = 3$', why: 'At $k = -2$ the rows of $A$ add to $0$, so the rank is less than $3$.' },
            { text: 'there are more unknowns than equations', why: 'There are $3$ of each.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which are true for $AX = B$ with $A$ an $m \\times n$ matrix?',
          options: [
            { text: 'If $\\operatorname{rank}A = \\operatorname{rank}(A|B) = n$ the solution is unique', correct: true, why: '**True:** no free variables.' },
            { text: 'If it has two different solutions it has infinitely many', correct: true, why: '**True:** their difference $X_h \\neq 0$ is in the null space, and $X_p + tX_h$ works for every $t$.' },
            { text: 'If $m < n$ it always has a solution', why: '**False:** $x + y = 1$, $x + y = 2$ has none.' },
            { text: 'It is consistent iff $B$ is a combination of the columns of $A$', correct: true, why: '**True:** that is what "in the column space" means.' },
          ],
        },
        {
          type: 'finish',
          title: 'Non-homogeneous systems: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
