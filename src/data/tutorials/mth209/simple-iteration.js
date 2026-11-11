// MTH 209 · Idea B, lesson 9: the method of simple iteration (SIM) for linear systems. Part 1 uses
// 4x + y = 5, x + 4y = 5; Part 2 does the 4 × 4 class example with the α test and error bound, and
// a 3 × 3 final question.

export default {
  id: 'simple-iteration',
  title: 'Simple iteration',
  covers: 'X = CX + F, the α and β convergence tests, iterating to 2 dp, and the error bound',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Simple iteration (SIM)', 'Rewrite $AX = B$ as $X = CX + F$ and iterate $X^{(k+1)} = CX^{(k)} + F$.'],
        ['$c_{ij}$, $f_i$', '$c_{ij} = -\\dfrac{a_{ij}}{a_{ii}}$ for $i \\ne j$, $c_{ii} = 0$, $f_i = \\dfrac{b_i}{a_{ii}}$ (needs $a_{ii} \\ne 0$).'],
        ['Convergence test', '$\\alpha = \\max_i \\sum_j |c_{ij}| < 1$ (rows) or $\\beta = \\max_j \\sum_i |c_{ij}| < 1$ (columns). Either is enough.'],
        ['Diagonally dominant', 'Each diagonal coefficient is bigger than the rest of its row put together, which makes $\\alpha < 1$.'],
      ],
      steps: [
        'Solve equation $i$ for $x_i$: $x_i = \\tfrac{1}{a_{ii}}\\left(b_i - \\sum_{j \\ne i} a_{ij}x_j\\right)$.',
        'Check convergence: for each row, (sum of |off-diagonal entries|) ÷ |diagonal entry|; the largest is $\\alpha$. Need $\\alpha < 1$.',
        'Start from $X^{(0)}$ (often $F$, or zeros).',
        'Compute **all** new values from the **old** ones: $X^{(k+1)} = CX^{(k)} + F$.',
        'Stop when two successive iterates agree to the required dp. Error bound: $|x_i - x_i^{(k)}| \\le \\tfrac{\\alpha}{1 - \\alpha}\\max_j|x_j^{(k)} - x_j^{(k-1)}|$.',
      ],
      examples: [
        {
          title: '$4x + y = 5$, $x + 4y = 5$',
          question: 'Solve by simple iteration from $(0, 0)$.',
          steps: ['$x = \\tfrac{5 - y}{4}$, $y = \\tfrac{5 - x}{4}$.', 'Row sums $\\tfrac14$, so $\\alpha = 0.25 < 1$: converges.', '$(1.25, 1.25)$, $(0.9375, 0.9375)$, $(1.0156, 1.0156)$, $(0.9961, 0.9961)$, …'],
          answer: 'Converges to $(1, 1)$; each step cuts the error to about a quarter.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 9',
          title: 'Guess, improve, repeat',
          body: 'The direct methods (inverse, LU, Gaussian) do a fixed amount of work. For a big system that is a lot of arithmetic.\n\n**Simple iteration** brings back the engine from linear iteration: write the system as $X = CX + F$, guess $X$, and keep improving. It works beautifully when the diagonal is strong.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Each equation updates its own unknown',
          body: 'In $4x + y = 5$ the $x$ dominates, so solve it for $x$: $x = \\tfrac{5 - y}{4}$. Likewise $y = \\tfrac{5 - x}{4}$. Guess $(0, 0)$ and update both:\n$$(0, 0) \\to (1.25, 1.25) \\to (0.9375, 0.9375) \\to (1.0156, 1.0156) \\to \\cdots \\to (1, 1).$$\nEach step multiplies the error by at most $\\alpha = \\tfrac14$, the largest row sum of $|c_{ij}|$. Just like $|g\'| < 1$ before.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'SIM, step by step',
          body: '1. Solve equation $i$ for $x_i$.\n2. **Convergence check:** each row’s off-diagonal $|a_{ij}|$ summed, ÷ $|a_{ii}|$; the largest is $\\alpha$; need $\\alpha < 1$.\n3. Start from $X^{(0)}$ (often $F = (b_i/a_{ii})$).\n4. New values all from the **previous** iterate.\n5. Stop when two iterates agree; error $\\le \\tfrac{\\alpha}{1 - \\alpha} \\times$ (largest change).',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$4x + y = 5$, $x + 4y = 5$',
          body: '**Step 1.** $x = \\tfrac{5 - y}{4}$, $y = \\tfrac{5 - x}{4}$.\n\n**Step 2.** Row sums $\\tfrac14$ and $\\tfrac14$, so $\\alpha = 0.25 < 1$: it will converge.\n\n**Steps 3–4.** From $(0, 0)$: $(1.25, 1.25)$, $(0.9375, 0.9375)$, $(1.015625, 1.015625)$, $(0.996094, 0.996094)$.\n\n**Step 5.** Last change $0.0195$; error $\\le \\tfrac{0.25}{0.75} \\times 0.0195 = 0.0065$. True answer $(1, 1)$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$',
          graph: {
            steps: [
              { ask: 'Row 3 sum: $\\tfrac{2 + 2}{10}$?', answer: 0.4, tol: 0.001, hint: 'Off-diagonal sum ÷ diagonal.' },
              { ask: 'Rows give $0.2, 0.3, 0.4$. So $\\alpha = $?', answer: 0.4, tol: 0.001, hint: 'The largest.' },
              { ask: 'From $X^{(0)} = (0, 0, 0)$, $x_1^{(1)} = \\tfrac{12}{10}$?', answer: 1.2, tol: 0.001, hint: 'All old values are $0$.' },
              { ask: '$x_3^{(2)} = \\tfrac{14 - 2(1.2) - 2(1.3)}{10}$ using $X^{(1)} = (1.2, 1.3, 1.4)$?', answer: 0.9, tol: 0.001, hint: '$\\tfrac{9}{10}$.' },
            ],
            after: '$X^{(2)} = (0.93, 0.92, 0.90)$, $X^{(3)} = (1.018, 1.024, 1.030)$, heading to $(1, 1, 1)$.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Explain** rewriting $AX = B$ as $X = CX + F$: give $c_{ij}$, $c_{ii}$, $f_i$ and the condition on $a_{ii}$.\n• **State** the convergence conditions ($\\alpha < 1$ rows, $\\beta < 1$ columns) and the error bound.\n• **Solve** “by the method of simple iteration, correct to 2 dp”, showing the convergence check.\n• **Explain** why the diagonal must dominate, and why to reorder equations first.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Step 1 is always the convergence check: write each row sum, then $\\alpha < 1$. It earns marks on its own.',
        'Start from $X^{(0)} = F$ (each $\\tfrac{b_i}{a_{ii}}$) unless told otherwise.',
        'Tabulate: $k$, $x_1, \\ldots, x_n$, largest change. Use every old value in a sweep; don’t mix in new ones (that is Gauss-Seidel).',
        'Stop when two rows agree at the required dp; give the error bound $\\tfrac{\\alpha}{1 - \\alpha} \\times$ largest change.',
        'If a diagonal entry is not the largest in its row, reorder the equations first, or $|c_{ij}|$ can exceed $1$ and it diverges.',
      ],
      examples: [
        {
          title: 'The $4 \\times 4$ class example',
          question: 'Solve $20.9x_1 + 1.2x_2 + 2.1x_3 + 0.9x_4 = 21.70$, $1.2x_1 + 21.2x_2 + 1.5x_3 + 2.5x_4 = 27.46$, $2.1x_1 + 1.5x_2 + 19.8x_3 + 1.3x_4 = 28.76$, $0.9x_1 + 2.5x_2 + 1.3x_3 + 32.1x_4 = 49.72$ by SIM, correct to 2 dp.',
          steps: ['$x_1 = \\tfrac{1}{20.9}(21.70 - 1.2x_2 - 2.1x_3 - 0.9x_4)$, and so on.', 'Row sums $0.20, 0.25, 0.25, 0.15$: $\\alpha \\approx 0.25 < 1$.', '$X^{(0)} = F = (1.04, 1.30, 1.45, 1.55)$.', '$X^{(1)} = (0.75, 0.95, 1.14, 1.36)$, $X^{(2)} = (0.81, 1.01, 1.21, 1.41)$, $X^{(3)} = (0.80, 1.00, 1.20, 1.40)$, $X^{(4)} = (0.80, 1.00, 1.20, 1.40)$.'],
          answer: '$X = (0.80, 1.00, 1.20, 1.40)$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The class example, to 2 dp',
          body: '“Solve by the method of simple iteration, correct to 2 dp: $20.9x_1 + 1.2x_2 + 2.1x_3 + 0.9x_4 = 21.70$, … (4 equations).”\n\n**What the examiner wants:** each $x_i$ written as $\\tfrac{1}{a_{ii}}(b_i - \\ldots)$; the row sums and $\\alpha < 1$; $X^{(0)} = F$; an iteration table; the stopping reason; ideally the error bound. All of it is in **Examples**.',
          asides: [{ label: 'Exam tip', text: 'Calculator trick: store $x_1..x_4$ in memories. For SIM, don’t overwrite any memory until all four new values are computed.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'First sweep of the class example',
          graph: {
            steps: [
              { ask: 'Row 1 sum $\\tfrac{1.2 + 2.1 + 0.9}{20.9}$, to 2 dp?', answer: 0.2, tol: 0.005, hint: '$\\tfrac{4.2}{20.9}$.' },
              { ask: '$f_1 = \\tfrac{21.70}{20.9}$, to 2 dp?', answer: 1.04, tol: 0.005, hint: 'That is $x_1^{(0)}$.' },
              { ask: '$x_1^{(1)} = \\tfrac{1}{20.9}(21.70 - 1.2(1.30) - 2.1(1.45) - 0.9(1.55))$, to 2 dp?', answer: 0.75, tol: 0.006, hint: '$\\tfrac{15.70}{20.9}$.' },
              { ask: 'Iterates settle at $(0.80, 1.00, 1.20, 1.40)$. Error bound $\\tfrac{\\alpha}{1 - \\alpha}$ with $\\alpha = 0.25$?', answer: 0.3333, tol: 0.001, hint: '$\\tfrac{0.25}{0.75}$.' },
            ],
            after: 'So the error is at most a third of the last change.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'Doing SIM, a student computes the new $x_1$, then uses that new $x_1$ straight away to compute the new $x_2$. What is wrong?',
          options: [
            { text: 'That is Gauss-Seidel. SIM uses only the previous iterate’s values in each sweep', correct: true, why: 'If the question says SIM, every new value comes from the old vector.' },
            { text: 'Nothing; it’s faster', why: 'It is faster, but it is a different method. Named method only.' },
            { text: 'They should start from $x_4$', why: 'Order isn’t the issue; using new values is.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'SIM, 3 iterations, error bound',
          graph: {
            steps: [
              { ask: 'Same $3 \\times 3$ system: $X^{(2)} = (0.93, 0.92, 0.90)$. $x_1^{(3)} = \\tfrac{12 - 0.92 - 0.90}{10}$?', answer: 1.018, tol: 0.0005, hint: '$\\tfrac{10.18}{10}$.' },
              { ask: 'Largest change from $X^{(2)}$ to $X^{(3)} = (1.018, 1.024, 1.030)$?', answer: 0.13, tol: 0.002, hint: '$|1.030 - 0.90|$.' },
              { ask: 'Error bound $\\tfrac{0.4}{0.6} \\times 0.13$, to 3 dp?', answer: 0.087, tol: 0.001, hint: '$\\tfrac23 \\times 0.13$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can iterate a linear system.',
          body: '**Summary:** $x_i = \\tfrac{1}{a_{ii}}(b_i - \\sum a_{ij}x_j)$; check $\\alpha < 1$ first; all new values from the old vector; stop when iterates agree; error $\\le \\tfrac{\\alpha}{1 - \\alpha} \\times$ change.\n\n**Next:** **Gauss-Seidel**, one small change (use each new value straight away) that roughly halves the number of iterations.',
        },
      ],
    },
  ],
};
