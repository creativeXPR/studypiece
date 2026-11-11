// MTH 209 · Idea B, lesson 10: Gauss-Seidel. Part 1 compares it with SIM on 4x + y = 5, x + 4y = 5;
// Part 2 solves the 4 × 4 class example by GSM and handles a system that must be reordered first.

export default {
  id: 'gauss-seidel',
  title: 'Gauss-Seidel',
  covers: 'Using each new value at once, comparing with simple iteration, and reordering for convergence',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Gauss-Seidel method (GSM)', 'Like simple iteration, but each new $x_i^{(k+1)}$ is used immediately for the remaining unknowns in the same sweep.'],
        ['Component form ($3 \\times 3$)', '$x_1^{(k+1)} = f_1 + c_{12}x_2^{(k)} + c_{13}x_3^{(k)}$; $x_2^{(k+1)} = f_2 + c_{21}x_1^{(k+1)} + c_{23}x_3^{(k)}$; $x_3^{(k+1)} = f_3 + c_{31}x_1^{(k+1)} + c_{32}x_2^{(k+1)}$.'],
      ],
      steps: [
        'Rewrite each equation for its own unknown, as in SIM.',
        'Check diagonal dominance ($\\alpha < 1$). If an equation’s largest coefficient is not on the diagonal, reorder the equations.',
        'Compute $x_1^{(k+1)}$ from old values.',
        'Compute $x_2^{(k+1)}$ using the **new** $x_1^{(k+1)}$, then $x_3^{(k+1)}$ using both new values, and so on.',
        'Stop when two successive iterates agree at the required dp.',
      ],
      examples: [
        {
          title: '$4x + y = 5$, $x + 4y = 5$ by GSM',
          question: 'Solve by Gauss-Seidel from $(0, 0)$ and compare with SIM.',
          steps: ['$x^{(1)} = \\tfrac{5 - 0}{4} = 1.25$; $y^{(1)} = \\tfrac{5 - 1.25}{4} = 0.9375$ (new $x$ used).', '$x^{(2)} = \\tfrac{5 - 0.9375}{4} = 1.015625$; $y^{(2)} = 0.996094$.', '$x^{(3)} = 1.000977$; $y^{(3)} = 0.999756$.'],
          answer: 'Within $0.001$ of $(1, 1)$ after 3 sweeps; SIM needed about 5.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea B · Lesson 10',
          title: 'Why wait?',
          body: 'In simple iteration, by the time you compute $x_2^{(k+1)}$ you already have a better $x_1$, but SIM ignores it until the next sweep.\n\n**Gauss-Seidel** uses each new value the moment it is found. Same formulas, one change, and it typically converges in about half the iterations.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Fresh values, straight away',
          body: '$4x + y = 5$, $x + 4y = 5$, from $(0, 0)$:\n\n**SIM:** $x = 1.25$, $y = 1.25$ (both from the old zeros).\n**GSM:** $x = 1.25$, then $y = \\tfrac{5 - 1.25}{4} = 0.9375$, using the **new** $x$.\n\nAfter 3 sweeps GSM is at $(1.0010, 0.9998)$; SIM is still at $(1.0156, 1.0156)$. Up-to-date values shrink the error faster.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Gauss-Seidel, step by step',
          body: '1. Rewrite each equation for its own unknown.\n2. Check diagonal dominance; **reorder** equations if needed.\n3. $x_1^{(k+1)}$ from old values.\n4. $x_2^{(k+1)}$ with the new $x_1$; $x_3^{(k+1)}$ with the new $x_1$, $x_2$; …\n5. Stop when two iterates agree.\n\nLabel superscripts carefully so the examiner sees which values are new.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$4x + y = 5$, $x + 4y = 5$',
          body: '**Sweep 1.** $x^{(1)} = \\tfrac{5 - 0}{4} = 1.25$; $y^{(1)} = \\tfrac{5 - 1.25}{4} = 0.9375$.\n\n**Sweep 2.** $x^{(2)} = \\tfrac{5 - 0.9375}{4} = 1.015625$; $y^{(2)} = \\tfrac{5 - 1.015625}{4} = 0.996094$.\n\n**Sweep 3.** $x^{(3)} = 1.000977$; $y^{(3)} = 0.999756$.\n\nThree sweeps to $0.001$; SIM needs about five for the same accuracy.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$',
          graph: {
            steps: [
              { ask: 'From $(0, 0, 0)$: $x_1^{(1)} = \\tfrac{12}{10}$?', answer: 1.2, tol: 0.001, hint: 'Old values are all $0$.' },
              { ask: '$x_2^{(1)} = \\tfrac{13 - 2(1.2) - 0}{10}$?', answer: 1.06, tol: 0.001, hint: 'Use the **new** $x_1 = 1.2$.' },
              { ask: '$x_3^{(1)} = \\tfrac{14 - 2(1.2) - 2(1.06)}{10}$?', answer: 0.948, tol: 0.001, hint: 'Both new values.' },
            ],
            after: '$X^{(2)} = (0.9992, 1.0054, 0.9991)$, $X^{(3)} = (0.9996, 1.0002, 1.0001)$: about 4 sweeps to 3 dp, where SIM needs about 8.',
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define** GSM and state its main difference from SIM.\n• **Write** the component form for a $3 \\times 3$, showing which values are from iteration $k + 1$ and which from $k$.\n• **Compare** GSM and SIM on the same system (a table of iterates, and which needs fewer).\n• **Explain** why a system must be reordered before GSM can converge.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Calculator trick: store $x_1..x_n$ in memories and update each one as soon as it is computed (the opposite of SIM).',
        'Show superscripts, e.g. $x_2^{(1)} = \\tfrac{1}{21.2}(27.46 - 1.2x_1^{(1)} - 1.5x_3^{(0)} - 2.5x_4^{(0)})$.',
        'Expect about half the iterations of SIM. If GSM takes longer, you probably used old values.',
        'Not diagonally dominant? Reorder so each $x_i$ comes from the equation where it has the biggest coefficient.',
        'Mistake: using SIM when GSM is asked for. The iterates differ, so the method marks are lost even if the final answer is right.',
      ],
      examples: [
        {
          title: 'The $4 \\times 4$ class example by GSM',
          question: 'Solve the class system by Gauss-Seidel, correct to 2 dp, from $X^{(0)} = (1.04, 1.30, 1.45, 1.55)$.',
          steps: ['$x_1^{(1)} = \\tfrac{1}{20.9}(21.70 - 1.2(1.30) - 2.1(1.45) - 0.9(1.55)) = 0.7512$.', '$x_2^{(1)} = \\tfrac{1}{21.2}(27.46 - 1.2(0.7512) - 1.5(1.45) - 2.5(1.55)) = 0.9674$ (new $x_1$ used).', '$X^{(1)} = (0.7512, 0.9674, 1.1978, 1.4040)$, $X^{(2)} = (0.8019, 0.9996, 1.1996, 1.4000)$, $X^{(3)} = (0.8001, 1.0000, 1.2000, 1.4000)$.'],
          answer: '$X = (0.80, 1.00, 1.20, 1.40)$ in about 3 sweeps (SIM took 4 to 5).',
        },
        {
          title: '$x_1 + 6x_2 = 7$, $5x_1 + x_2 = 6$',
          question: 'Why can’t GSM be applied as written? Rearrange it and do two sweeps from $(0, 0)$.',
          steps: ['As written, $x_1 = 7 - 6x_2$: $|c_{12}| = 6 > 1$, so it diverges.', 'Swap the equations: $5x_1 + x_2 = 6$, $x_1 + 6x_2 = 7$ (diagonally dominant).', 'Sweep 1: $x_1 = 1.2$, $x_2 = \\tfrac{7 - 1.2}{6} = 0.9667$.', 'Sweep 2: $x_1 = \\tfrac{6 - 0.9667}{5} = 1.0067$, $x_2 = 0.9989$.'],
          answer: 'Converges to $(1, 1)$ after reordering.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The class example by Gauss-Seidel',
          body: '“Solve the system by the Gauss-Seidel method, correct to 2 dp. Use $X^{(0)} = (1.04, 1.30, 1.45, 1.55)$. Compare the number of iterations with SIM.”\n\n**What the examiner wants:** $x_1^{(1)}$, then $x_2^{(1)}$ written with the **new** $x_1^{(1)}$ visible, and so on; the stopping rule; the comparison (about 3 sweeps against SIM’s 5).',
          asides: [{ label: 'Exam tip', text: 'If the question says “use the Gauss-Seidel method” and you do SIM, the working is different, so method marks are lost even with the right final answer.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: 'First sweep, class example',
          graph: {
            steps: [
              { ask: '$x_1^{(1)} = \\tfrac{15.70}{20.9}$, to 4 dp?', answer: 0.7512, tol: 0.0002, hint: '$21.70 - 1.56 - 3.045 - 1.395 = 15.70$.' },
              { ask: '$x_2^{(1)} = \\tfrac{1}{21.2}(27.46 - 1.2(0.7512) - 1.5(1.45) - 2.5(1.55))$, to 4 dp?', answer: 0.9674, tol: 0.0003, hint: 'Numerator $27.46 - 0.9014 - 2.175 - 3.875$.' },
              { ask: 'After sweep 3 the values are $(0.8001, 1.0000, 1.2000, 1.4000)$. Answer to 2 dp, $x_1 = $?', answer: 0.8, tol: 0.001, hint: 'Round.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the problem',
          prompt: 'GSM on $x_1 + 6x_2 = 7$, $5x_1 + x_2 = 6$ (as written) blows up. Why, and what fixes it?',
          options: [
            { text: 'Each equation is solved for the unknown with the small coefficient, so $|c_{ij}| > 1$; swap the equations', correct: true, why: 'After swapping, $5x_1 + x_2 = 6$ and $x_1 + 6x_2 = 7$ are diagonally dominant and GSM converges to $(1, 1)$.' },
            { text: 'GSM never works on $2 \\times 2$ systems', why: 'It works fine once the diagonal dominates.' },
            { text: 'The starting guess is bad', why: 'The trouble is the arrangement, not the start.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Reordered: $5x_1 + x_2 = 6$, $x_1 + 6x_2 = 7$',
          graph: {
            steps: [
              { ask: 'From $(0, 0)$: $x_1^{(1)} = \\tfrac{6}{5}$?', answer: 1.2, tol: 0.001, hint: '$\\tfrac{6 - 0}{5}$.' },
              { ask: '$x_2^{(1)} = \\tfrac{7 - 1.2}{6}$, to 4 dp?', answer: 0.9667, tol: 0.0002, hint: 'New $x_1$.' },
              { ask: '$x_1^{(2)} = \\tfrac{6 - 0.9667}{5}$, to 4 dp?', answer: 1.0067, tol: 0.0002, hint: 'Newest $x_2$.' },
            ],
            after: 'Then $x_2^{(2)} = 0.9989$: closing on $(1, 1)$.',
          },
        },
        {
          type: 'finish',
          title: 'You can run Gauss-Seidel.',
          body: '**Summary:** same formulas as SIM, but each new value is used at once; about twice as fast; needs diagonal dominance, so reorder first if necessary; label superscripts.\n\n**Next:** **non-linear systems**, where the equations involve $\\cos$, $e^x$ and squares. The fixed-point idea carries over, with a convergence condition built from partial derivatives.',
        },
      ],
    },
  ],
};
