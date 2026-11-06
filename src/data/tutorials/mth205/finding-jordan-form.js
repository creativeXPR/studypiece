// MTH 205 · Jordan form · Lesson 2: how to find the Jordan form (the full method). Number of blocks
// = GM; sizes from the ranks r_k = rank(A − λI)^k via "blocks of size ≥ k = r_{k−1} − r_k", shown
// with a dot diagram where N = A − λI pushes every chain down one step; chains built from the top
// vector down; Q and J = Q⁻¹AQ. Worked 2 × 2 and 3 × 3 examples, and the link to the minimal
// polynomial.
const COLS = [3, 2, 1]; // block sizes in the dot diagram
const X = [-1.6, 0, 1.6];
const rowY = (r) => -1.25 + 1.05 * r;

export default {
  id: 'finding-jordan-form',
  title: 'Finding the Jordan form',
  covers: 'The complete method for the Jordan canonical form: eigenvalues and algebraic multiplicities, number of Jordan blocks = geometric multiplicity, block sizes from the ranks of (A − λI)^k, building Jordan chains of generalized eigenvectors, assembling Q and checking J = Q⁻¹AQ, worked 2 × 2 and 3 × 3 examples, and the minimal polynomial from the block sizes',
  minutes: 24,
  sections: [
    {
      name: 'Counting the blocks',
      terms: [
        ['Number of blocks for $\\lambda$', '$= \\text{GM}(\\lambda) = n - \\operatorname{rank}(A - \\lambda I)$: one eigenvector per chain.'],
        ['Rank sequence', '$r_0 = n$, $\\;r_k = \\operatorname{rank}(A - \\lambda I)^k$. It decreases and stops at $n - m$ (where $m$ = AM).'],
        ['Block sizes', 'Number of $\\lambda$-blocks of size $\\ge k$ $= r_{k-1} - r_k$. Size exactly $k$: $r_{k-1} - 2r_k + r_{k+1}$.'],
        ['Total size', 'The $\\lambda$-blocks have total size $m$ = AM of $\\lambda$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'A generalized eigenvector for $\\lambda$ is a nonzero $v$ with',
          options: [
            { text: '$(A - \\lambda I)^pv = 0$ for some $p \\ge 1$', correct: true, why: 'Crushed eventually, maybe not at once.' },
            { text: '$Av = \\lambda v$ only', why: 'That is an ordinary eigenvector ($p = 1$).' },
            { text: '$Av = 0$', why: 'That is the null space of $A$ (eigenvalue $0$).' },
            { text: '$(A - \\lambda I)v \\neq 0$', why: 'That alone says nothing.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Chains on a conveyor belt',
          body: 'Each column of dots is one Jordan chain for $\\lambda$ (top: the generalized eigenvector you start from; bottom: the eigenvector). Here there are blocks of sizes $3$, $2$ and $1$, so $n = 6$.',
          graph: {
            steps: [
              { say: '$N = A - \\lambda I$ moves every dot **one step down** its column, and a bottom dot falls off to $0$. That is exactly how $A - \\lambda I$ acts on a Jordan chain.' },
              { say: 'Apply $N$ once: the bottom row falls off, **one dot per block**. So $\\operatorname{nullity}(N) = $ number of blocks $= 3$, i.e. $r_1 = \\operatorname{rank}N = 6 - 3 = 3$. Number of blocks $= \\text{GM}$.', action: { label: 'Apply N' } },
              { say: 'Apply $N$ again: the second row falls off too. It had one dot for each block of size $\\ge 2$: $2$ of them. $r_2 = 1$, and $r_1 - r_2 = 2$.', action: { label: 'Apply N again' } },
              { say: 'Once more: the last dot goes ($r_3 = 0$, $r_2 - r_3 = 1$ block of size $\\ge 3$). So from the ranks alone: $r_0 - r_1 = 3$ blocks, $r_1 - r_2 = 2$ of size $\\ge 2$, $r_2 - r_3 = 1$ of size $\\ge 3$: sizes $3, 2, 1$. That’s the whole idea of the method.', action: { label: 'Apply N again' } },
            ],
            draw: (step, presses) => {
              const k = Math.min(presses, 3);
              const items = [];
              COLS.forEach((h, c) => {
                for (let r = 0; r < h; r++) {
                  const at = r - k;
                  items.push({ id: `d${c}${r}`, pt: [X[c], rowY(Math.max(at, -0.6))], kind: ['e', 'a', 'c'][c], o: at < 0 ? 0 : 1, r: 6, fixed: true });
                }
                items.push({ id: `t${c}`, text: [X[c], rowY(3.1)], label: `size ${h}`, kind: ['e', 'a', 'c'][c], fixed: true });
              });
              items.push({ id: 'zero', text: [0, rowY(-0.95)], label: '0', kind: 's', fixed: true, o: k > 0 ? 1 : 0 });
              return { M: [1, 0, 0, 1], R: 2.6, grid: false, ghost: false, items, note: `$r_${k} = ${[6, 3, 1, 0][k]}$` };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'The method',
          title: 'Finding $J$ in five steps',
          body: '**1. Eigenvalues.** Factor $|A - \\lambda I|$; note each algebraic multiplicity $m$.\n**2. How many blocks.** For each $\\lambda$: GM $= n - \\operatorname{rank}(A - \\lambda I)$ blocks.\n**3. Block sizes.** Compute $r_k = \\operatorname{rank}(A - \\lambda I)^k$ until it stops at $n - m$. Blocks of size $\\ge k$: $r_{k-1} - r_k$.\n**4. Chains** (only if $Q$ is asked for). For a block of size $s$: pick $v_s$ with $(A - \\lambda I)^sv_s = 0$ but $(A - \\lambda I)^{s-1}v_s \\neq 0$; then $v_{s-1} = (A - \\lambda I)v_s$, …, $v_1 = (A - \\lambda I)v_2$ (an eigenvector).\n**5. Assemble.** $Q$ = the chains as columns, each written **bottom first** $(v_1, v_2, \\dots, v_s)$; then $Q^{-1}AQ = J$. Check with $AQ = QJ$.',
          asides: [{ label: 'Shortcuts', text: 'If AM $=$ GM for $\\lambda$, its blocks are all $1 \\times 1$. If GM $= 1$, there is one block of size AM. Only when GM is strictly between $1$ and AM do you need the ranks of higher powers.' }],
        },
        {
          type: 'order',
          eyebrow: 'The procedure',
          prompt: 'Order the steps for finding the Jordan form $J$ and a matrix $Q$ with $Q^{-1}AQ = J$.',
          items: [
            'Find the eigenvalues and their algebraic multiplicities.',
            'For each eigenvalue, the number of blocks is $n - \\operatorname{rank}(A - \\lambda I)$.',
            'Find the block sizes from $r_k = \\operatorname{rank}(A - \\lambda I)^k$: $r_{k-1} - r_k$ blocks of size $\\ge k$.',
            'Build each chain from its top vector down with $A - \\lambda I$.',
            'Put the chains into $Q$ (eigenvector first in each chain) and check $AQ = QJ$.',
          ],
        },
        {
          type: 'bridge',
          title: 'Ranks count the blocks.',
          recap: ['Blocks $=$ GM.', 'Size $\\ge k$: $r_{k-1} - r_k$.'],
          why: 'Now some full examples.',
        },
      ],
    },
    {
      name: 'Worked examples',
      terms: [
        ['Minimal polynomial', '$m(\\lambda) = \\prod(\\lambda - \\lambda_i)^{s_i}$ where $s_i$ is the size of the **largest** block for $\\lambda_i$.'],
        ['Characteristic polynomial', '$\\prod(\\lambda - \\lambda_i)^{m_i}$ (up to sign), $m_i$ = total size of the $\\lambda_i$-blocks.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Example 1',
          title: 'Find the Jordan form of $A = \\begin{pmatrix} 3 & 1 \\\\ -1 & 1 \\end{pmatrix}$ and $Q$ with $Q^{-1}AQ = J$.',
          body: '**1.** $|A - \\lambda I| = (3 - \\lambda)(1 - \\lambda) + 1 = \\lambda^2 - 4\\lambda + 4 = (\\lambda - 2)^2$: $\\lambda = 2$, AM $= 2$.\n\n**2.** $A - 2I = \\begin{pmatrix} 1 & 1 \\\\ -1 & -1 \\end{pmatrix}$ has rank $1$: GM $= 1$, so **one** block, of size $2$: $J = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$.\n\n**4.** Chain: pick $v_2$ **not** killed by $A - 2I$, e.g. $v_2 = (1, 0)$. Then $v_1 = (A - 2I)v_2 = (1, -1)$, an eigenvector.\n\n**5.** $Q = (v_1 \\; v_2) = \\begin{pmatrix} 1 & 1 \\\\ -1 & 0 \\end{pmatrix}$. Check: $AQ = \\begin{pmatrix} 2 & 3 \\\\ -2 & -1 \\end{pmatrix} = QJ$ ✓.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Find the Jordan form of $A = \\begin{pmatrix} 2 & 2 & 1 \\\\ 0 & 2 & -1 \\\\ 0 & 0 & 2 \\end{pmatrix}$.',
          body: '$N = A - 2I = \\begin{pmatrix} 0 & 2 & 1 \\\\ 0 & 0 & -1 \\\\ 0 & 0 & 0 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: 'AM of $\\lambda = 2$', answer: 3, tol: 0, hint: 'Triangular with $2, 2, 2$ on the diagonal.' },
              { ask: '$r_1 = \\operatorname{rank}N$', answer: 2, tol: 0, hint: 'Two nonzero, independent rows.' },
              { ask: '$N^2 = \\begin{pmatrix} 0 & 0 & c \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$ with $c = $', answer: -2, tol: 0, hint: 'Row 1 of $N$ times column 3 of $N$: $0 + 2(-1) + 0$.' },
              { ask: '$r_2 = \\operatorname{rank}N^2$', answer: 1, tol: 0, hint: 'One nonzero entry.' },
              { ask: 'Number of blocks $= r_0 - r_1 = $', answer: 1, tol: 0, hint: '$3 - 2$.' },
              { ask: 'So $J$ is', options: ['one block $J_3(2)$', '$J_2(2) \\oplus J_1(2)$', '$\\operatorname{diag}(2, 2, 2)$'], answer: 0, hint: 'One block holding all of AM $= 3$.' },
              { ask: 'Chain from $v_3 = (0, 0, 1)$: $v_2 = Nv_3 = (1, -1, 0)$, $v_1 = Nv_2 = (a, 0, 0)$ with $a = $', answer: -2, tol: 0, hint: '$N(1, -1, 0) = (0 - 2 + 0, 0, 0)$.', done: '$Q = \\begin{pmatrix} -2 & 1 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Find the Jordan form of $A = \\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$.',
          body: '$N = A - I = \\begin{pmatrix} 0 & 1 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$.',
          graph: {
            steps: [
              { ask: '$r_1 = \\operatorname{rank}N$', answer: 1, tol: 0, hint: 'One nonzero row.' },
              { ask: 'Number of blocks (GM)', answer: 2, tol: 0, hint: '$3 - 1$.' },
              { ask: '$r_2 = \\operatorname{rank}N^2$', answer: 0, tol: 0, hint: '$N^2 = 0$: row $(0, 1, 1)$ times any column of $N$ gives $0$.' },
              { ask: 'Blocks of size $\\ge 2$: $r_1 - r_2 = $', answer: 1, tol: 0, hint: '$1 - 0$.' },
              { ask: 'So the block sizes are', options: ['$2$ and $1$', '$3$', '$1, 1, 1$'], answer: 0, hint: 'Two blocks, total size $3$, one of size $\\ge 2$.', done: '$J = \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$' },
              { ask: 'Minimal polynomial degree', answer: 2, tol: 0, hint: 'Largest block has size $2$: $m = (\\lambda - 1)^2$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'A bigger one',
          title: '$A$ is $4 \\times 4$ with $|A - \\lambda I| = (\\lambda - 1)(\\lambda - 2)(\\lambda - 4)^2$, $\\operatorname{rank}(A - 4I) = 3$ and $\\operatorname{rank}(A - 4I)^2 = 2$. Find $J$.',
          graph: {
            steps: [
              { ask: 'GM of $\\lambda = 4$', answer: 1, tol: 0, hint: '$4 - 3$.' },
              { ask: 'Size of the $\\lambda = 4$ block', answer: 2, tol: 0, hint: 'One block holds all of AM $= 2$ (and $r_1 - r_2 = 1$ confirms one block of size $\\ge 2$).' },
              { ask: 'So $J$ is', options: ['$\\operatorname{diag}\\big(1, 2, J_2(4)\\big)$', '$\\operatorname{diag}(1, 2, 4, 4)$', '$J_4(4)$'], answer: 0, hint: 'Simple eigenvalues give $1 \\times 1$ blocks.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'A $4 \\times 4$ matrix has characteristic polynomial $(\\lambda - 3)^4$ and minimal polynomial $(\\lambda - 3)^2$. Which Jordan forms are possible?',
          options: [
            { text: '$J_2(3) \\oplus J_2(3)$', correct: true, why: 'Largest block $2$, total $4$.' },
            { text: '$J_2(3) \\oplus J_1(3) \\oplus J_1(3)$', correct: true, why: 'Largest block $2$, total $4$.' },
            { text: '$J_3(3) \\oplus J_1(3)$', why: 'Largest block $3$ would give $m = (\\lambda - 3)^3$.' },
            { text: '$\\operatorname{diag}(3, 3, 3, 3)$', why: 'All blocks $1 \\times 1$ would give $m = \\lambda - 3$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Finding the Jordan form: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
