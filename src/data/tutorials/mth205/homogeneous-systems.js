// MTH 205 · Systems · Lesson 1: homogeneous systems Ax = 0. The solutions are the arrows A crushes
// to 0 (the null space); 0 is always one (trivial solution, always consistent); rank = dimensions
// that survive, n − r = dimensions crushed; row reduction to echelon form; basis of the solution
// space; the corollary r = n ⇒ trivial only, r < n ⇒ n − r independent solutions.
import { A, ID } from './la';

const SQ = [1, 2, 0.5, 1]; // squashes the line through (2, −1)
const LINE = [-1.5, -1, -0.5, 0.5, 1, 1.5].map((t) => [2 * t, -t]);

export default {
  id: 'homogeneous-systems',
  title: 'Homogeneous systems',
  covers: 'Homogeneous systems Ax = 0, the trivial solution, the solution space (null space), rank as the dimension of the output, dimension of the solution space n − r, solving by reduction to row echelon form, a basis of the solution space, and the corollary on trivial and non-trivial solutions',
  minutes: 18,
  sections: [
    {
      name: 'What gets crushed',
      terms: [
        ['Homogeneous system', 'All right-hand sides are $0$: $a_{i1}x_1 + \\dots + a_{in}x_n = 0$ for each $i$, i.e. $AX = 0$.'],
        ['Trivial solution', '$x_1 = \\dots = x_n = 0$. It always works, so a homogeneous system is **always consistent**.'],
        ['Solution space', 'All solutions of $AX = 0$: the vectors $A$ crushes to $0$. Also called the ==null space== (kernel) of $A$. It is a subspace.'],
        ['Rank $r$', 'The number of independent rows = independent columns = leading entries in echelon form = the dimension of the output (column space).'],
        ['Dimension theorem', '$\\dim(\\text{solution space}) = n - r$, where $n$ is the number of unknowns.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'If $\\det A = 0$, then $A$',
          options: [
            { text: 'crushes some nonzero vector to $0$', correct: true, why: 'Squashing flat sends a whole line onto the origin.' },
            { text: 'has an inverse', why: 'A squash can’t be undone: no inverse.' },
            { text: 'is the identity', why: '$\\det I = 1$.' },
            { text: 'flips the plane', why: 'Flipping gives a negative determinant.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Systems · Lesson 1',
          title: 'A system is a question about a motion',
          body: 'The system\n$$x + 2y = 0, \\qquad 0.5x + y = 0$$\nis the single equation $AX = 0$ with $A = \\begin{pmatrix} 1 & 2 \\\\ 0.5 & 1 \\end{pmatrix}$.\n\nRead it as a question about the motion $A$: **which arrows does $A$ send to the origin?** A system whose right-hand sides are all $0$ is called ==homogeneous==.',
          cta: 'Ask the motion',
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Which arrows land on 0?',
          graph: {
            steps: [
              { say: 'Here are some arrows, all on one dashed line through the origin. Keep your eye on them.' },
              { say: 'Apply $A$. The plane is squashed flat, and **every** arrow on that line lands on $0$. They are all solutions of $AX = 0$.', action: { label: 'Apply A' } },
              { say: 'So the solutions aren’t a lonely point: they form a whole line through the origin, the ==solution space== or ==null space==. Here every solution is a multiple of $(2, -1)$: $X = k(2, -1)$.' },
              { say: 'Notice the origin itself: $A0 = 0$ for **every** matrix. That is the ==trivial solution==, so a homogeneous system can never be inconsistent.' },
              { say: 'Compare a matrix that doesn’t squash, like $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$. The arrows stay spread out; only $0$ lands on $0$. Only the trivial solution.', action: { label: 'Try a non-squashing A' } },
            ],
            draw: (step, presses) => {
              const M = presses >= 2 ? A : presses >= 1 ? SQ : ID;
              const items = [{ id: 'ln', span: [2, -1], kind: 'e', fixed: true, o: 0.6 }];
              LINE.forEach((p, i) => items.push({ id: `p${i}`, pt: p, kind: 'e' }));
              items.push({ id: 'o', pt: [0, 0], kind: 'd', r: step === 3 ? 6 : 3 });
              return { M, R: 4, items };
            },
          },
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Count the dimensions',
          title: 'What survives, what is crushed',
          graph: {
            steps: [
              { say: 'The plane has $n = 2$ dimensions going **in**. Watch what comes **out** of the squash.', action: { label: 'Apply A' } },
              { say: 'Everything lands on one line: $1$ dimension survives. That number is the ==rank==: $r = 1$.' },
              { say: 'And $1$ dimension was crushed: the null space line. Every input dimension either survives or is crushed, so $\\dim(\\text{null space}) = n - r = 2 - 1 = 1$. This is the dimension theorem: $n = r + \\text{nullity}$.' },
            ],
            draw: (step, presses) => ({
              M: presses >= 1 ? SQ : ID,
              R: 4,
              items: [
                { id: 'out', span: [2, 1], kind: 'a', fixed: true, o: step >= 1 ? 0.9 : 0 },
                { id: 'ln', span: [2, -1], kind: 'e', fixed: true, o: step >= 2 ? 0.9 : 0 },
                { id: 'i', vec: [1, 0], kind: 'b', label: 'î' },
                { id: 'j', vec: [0, 1], kind: 'd', label: 'ĵ' },
              ],
              note: step >= 1 ? (step >= 2 ? 'rank $r = 1$, nullity $= n - r = 1$' : 'rank $r = 1$') : undefined,
            }),
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'A homogeneous system has $5$ unknowns and its coefficient matrix has rank $3$. The solution space has dimension',
          options: [
            { text: '$2$', correct: true, why: '$n - r = 5 - 3$: two dimensions are crushed, so there are $2$ independent solutions.' },
            { text: '$3$', why: '$3$ is the rank: what survives. The solutions are what’s crushed: $n - r$.' },
            { text: '$5$', why: 'Not everything is crushed: $3$ dimensions survive.' },
            { text: '$0$', why: 'Only when $r = n$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Solutions of $AX = 0$ = what $A$ crushes.',
          recap: ['Always consistent: $X = 0$ works.', 'Solution space = null space, dimension $n - r$.'],
          why: 'Next: finding that space by row reduction.',
        },
      ],
    },
    {
      name: 'Solving by row reduction',
      terms: [
        ['Method', 'Write $A$ → reduce to row echelon form (leading entries $1$) → solve from the bottom up, letting the non-leading (free) variables be parameters.'],
        ['Free variables', 'There are $n - r$ of them. Setting one free variable to $1$ and the others to $0$ gives one basis vector of the solution space.'],
        ['Corollary', 'If $r = n$, only the trivial solution. If $r < n$, there are $n - r$ linearly independent solutions and every solution is a linear combination of them.'],
        ['More unknowns than equations', 'If $m < n$ then $r \\le m < n$: a homogeneous system with more unknowns than equations always has non-trivial solutions.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Solve $x + y + z + w = 0$, $2x + 3y - z + w = 0$, $3x + 4y + 2w = 0$',
          body: '**Matrix form.** $\\begin{pmatrix} 1 & 1 & 1 & 1 \\\\ 2 & 3 & -1 & 1 \\\\ 3 & 4 & 0 & 2 \\end{pmatrix}X = 0$.\n\n**Reduce.** $R_2 - 2R_1$ and $R_3 - 3R_1$ both give $(0, 1, -3, -1)$; then $R_3 - R_2$ gives a zero row:\n$$\\begin{pmatrix} 1 & 1 & 1 & 1 \\\\ 0 & 1 & -3 & -1 \\\\ 0 & 0 & 0 & 0 \\end{pmatrix}.$$\nTwo leading entries, so $r = 2$, and $n - r = 4 - 2 = 2$ free variables: $z$ and $w$.\n\n**Solve upwards.** $y = 3z + w$, then $x = -y - z - w = -4z - 2w$. So\n$$X = z\\begin{pmatrix} -4 \\\\ 3 \\\\ 1 \\\\ 0 \\end{pmatrix} + w\\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 1 \\end{pmatrix}.$$\nThose two vectors are a ==basis== of the solution space: dimension $2 = n - r$, as promised.',
          asides: [{ label: 'Check every time', text: 'Substitute a basis vector back: $(-4, 3, 1, 0)$ gives $-4 + 3 + 1 + 0 = 0$ ✓, $-8 + 9 - 1 + 0 = 0$ ✓, $-12 + 12 + 0 + 0 = 0$ ✓.' }],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Why exactly $n - r$ independent solutions?',
          body: 'The corollary says: if $r < n$ there are $n - r$ independent solutions, and every solution is built from them. Here’s why, using the example you just saw.',
          graph: {
            steps: [
              { say: 'After reduction, each of the $r$ leading entries **pins down** one variable ($x$ and $y$ here) in terms of the rest. The other $n - r$ variables ($z$, $w$) are completely free: any values work.' },
              { say: 'Choose $z = 1, w = 0$: you get one solution, $u = (-4, 3, 1, 0)$. Choose $z = 0, w = 1$: another, $v = (-2, 1, 0, 1)$. One solution per free variable: $n - r$ of them.' },
              { say: 'Are they independent? Look at the free slots: $u$ has $(1, 0)$ there and $v$ has $(0, 1)$. No combination $au + bv$ can be $0$ unless $a = b = 0$. Independent.' },
              { say: 'Do they give **every** solution? Any solution has some values $z, w$ in the free slots, and once those are chosen the rest is forced: it must be $zu + wv$. So they span. A basis of size $n - r$: that’s the whole proof. And if $r = n$ there are no free variables, so only $X = 0$.' },
            ],
            draw: (step) => ({
              M: [1, 2, 0.5, 1],
              R: 4,
              ghost: true,
              grid: false,
              items: [
                { id: 'u', vec: [2, -1], kind: 'e', label: 'u', fixed: true, o: step >= 1 ? 1 : 0 },
                { id: 'ln', span: [2, -1], kind: 'e', fixed: true, o: step >= 3 ? 0.7 : 0.15 },
              ],
            }),
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Order the steps for finding a basis of the solution space of $AX = 0$.',
          items: [
            'Write the system in matrix form $AX = 0$.',
            'Reduce $A$ to row echelon form with leading entries $1$; read off the rank $r$.',
            'Write the leading variables in terms of the $n - r$ free variables.',
            'Set each free variable to $1$ in turn (others $0$) to get $n - r$ basis vectors.',
            'State the solution space as all linear combinations of these vectors.',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Solve $x + 2y - 5z + 4w = 0$, $2x - 3y + 2z + 3w = 0$, $4x - 7y + z - 6w = 0$.',
          body: 'Reduce to echelon form on paper. Take $w = 33k$ to avoid fractions.',
          graph: {
            steps: [
              { ask: 'Rank of the coefficient matrix', answer: 3, tol: 0, hint: 'Three nonzero rows remain after reduction.' },
              { ask: 'Dimension of the solution space', answer: 1, tol: 0, hint: '$n - r = 4 - 3$.' },
              { ask: 'With $w = 33k$: $z = $ (coefficient of $k$)', answer: -79, tol: 0, hint: 'The last echelon row gives $z + \\frac{79}{33}w = 0$.' },
              { ask: '$y = $ (coefficient of $k$)', answer: -159, tol: 0, hint: 'Substitute $z$ and $w$ into the second echelon row.' },
              { ask: '$x = $ (coefficient of $k$)', answer: -209, tol: 0, hint: 'Substitute into $x = -2y + 5z - 4w$.', done: 'Basis: $(-209, -159, -79, 33)$' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements about a homogeneous system $AX = 0$ ($m$ equations, $n$ unknowns) are true?',
          options: [
            { text: 'It is always consistent', correct: true, why: '**True:** $X = 0$ is always a solution.' },
            { text: 'If $m < n$ it has a non-trivial solution', correct: true, why: '**True:** $r \\le m < n$, so $n - r \\ge 1$.' },
            { text: 'If $A$ is square with $\\det A \\neq 0$, only the trivial solution', correct: true, why: '**True:** $r = n$; nothing is crushed.' },
            { text: 'Its solutions form a subspace', correct: true, why: '**True:** sums and multiples of crushed vectors are crushed: $A(u + v) = 0$, $A(ku) = 0$.' },
            { text: 'Its solution space has dimension $r$', why: '**False:** it is $n - r$; $r$ is what survives.' },
          ],
        },
        {
          type: 'finish',
          title: 'Homogeneous systems: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
