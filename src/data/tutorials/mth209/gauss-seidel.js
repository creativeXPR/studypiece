// MTH 209 · Systems of linear equations · Lesson 5: the Gauss-Seidel method (GSM).

export default {
  id: 'gauss-seidel',
  title: 'The Gauss-Seidel method',
  covers: 'Using each new value at once, the 3 × 3 formulas, comparison with simple iteration',
  minutes: 14,
  sections: [
    {
      name: 'One small change',
      terms: [
        ['Gauss-Seidel method (GSM)', 'Like simple iteration, but each new value $x^{(k+1)}_i$ is used immediately to compute $x^{(k+1)}_{i+1}, \\ldots$'],
        ['GSM formula', '$x^{(k+1)}_i = f_i + \\sum_{j<i} c_{ij}x^{(k+1)}_j + \\sum_{j>i} c_{ij}x^{(k)}_j$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Systems of linear equations · Lesson 5',
          title: 'Use the newest values',
          body: 'In simple iteration, by the time you compute $x^{(1)}_2$ you already **know** $x^{(1)}_1$, a better value than $x^{(0)}_1$. Yet SIM ignores it.\n\nThe ==Gauss-Seidel method== uses each new value **as soon as it is computed**. For a $3 \\times 3$ system:\n$$\\begin{aligned} x^{(k+1)}_1 &= f_1 + c_{12}x^{(k)}_2 + c_{13}x^{(k)}_3 \\\\ x^{(k+1)}_2 &= f_2 + c_{21}x^{(k+1)}_1 + c_{23}x^{(k)}_3 \\\\ x^{(k+1)}_3 &= f_3 + c_{31}x^{(k+1)}_1 + c_{32}x^{(k+1)}_2 \\end{aligned}$$',
          cta: 'Try it',
        },
        {
          type: 'story',
          eyebrow: 'Worked example · k = 1',
          title: 'Same system as last lesson, from $x^{(0)} = 0$',
          body: '$10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$.\n\n$$x^{(1)}_1 = \\tfrac{1}{10}(12 - 0 - 0) = 1.2$$\n$$x^{(1)}_2 = \\tfrac{1}{10}(13 - 2(\\mathbf{1.2}) - 0) = 1.06$$\n\nNotice $x^{(1)}_2$ already uses the new $x^{(1)}_1 = 1.2$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Now compute $x^{(1)}_3 = \\frac{1}{10}(14 - 2x_1 - 2x_2)$ by Gauss-Seidel.',
          options: [
            { text: '$0.948$', correct: true, why: 'Use the new values: $\\frac{1}{10}(14 - 2.4 - 2.12) = \\frac{9.48}{10} = 0.948$.' },
            { text: '$1.4$', why: 'That’s the SIM value, using the old $x_1 = x_2 = 0$.' },
            { text: '$1.18$', why: 'Use **both** new values, $x_1 = 1.2$ and $x_2 = 1.06$.' },
            { text: '$0.9$', why: 'That’s SIM’s second iterate.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Compare',
          title: 'GSM vs SIM on the same system',
          body: '$$\\begin{array}{c|ccc|ccc} & & \\text{SIM} & & & \\text{GSM} & \\\\ k & x_1 & x_2 & x_3 & x_1 & x_2 & x_3 \\\\ \\hline 1 & 1.2 & 1.3 & 1.4 & 1.2 & 1.06 & 0.948 \\\\ 2 & 0.93 & 0.92 & 0.90 & 0.9992 & 1.0054 & 0.9991 \\\\ 3 & 1.018 & 1.024 & 1.030 & 0.9996 & 1.0002 & 1.0001 \\\\ 4 & 0.9946 & 0.9934 & 0.9916 & 1.0000 & 1.0000 & 1.0000 \\end{array}$$\n\nGauss-Seidel reaches $(1, 1, 1)$ to 3 d.p. after **3** iterations; SIM needs about **6**. On a larger $4 \\times 4$ diagonally dominant system, GSM took about 3 iterations against 5–6 for SIM.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'GSM uses the same rearranged equations as SIM.', correct: true, why: '**Same $C$ and $F$**; only the order of updating differs.' },
            { text: 'The same conditions ($\\alpha < 1$ or $\\beta < 1$) are sufficient for GSM to converge.', correct: true, why: '**Diagonal dominance** works for both.' },
            { text: 'GSM usually needs fewer iterations than SIM.', correct: true, why: '**Newer values** mean faster progress.' },
            { text: 'If a question asks for GSM, a correct SIM answer earns full marks.', why: '**The iterates differ**, so the method marks are lost.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why can’t GSM be applied as written to $x_1 + 6x_2 = 7$, $5x_1 + x_2 = 6$?',
          options: [
            { text: 'It isn’t diagonally dominant: row sums are $6$ and $5$. Swap the equations first.', correct: true, why: 'Rewritten as $5x_1 + x_2 = 6$, $x_1 + 6x_2 = 7$, the row sums are $\\frac15$ and $\\frac16$, both $< 1$, and GSM converges to $(1, 1)$.' },
            { text: 'Because $\\det A = 0$', why: '$\\det A = 1 - 30 = -29 \\neq 0$.' },
            { text: 'GSM only works for $3 \\times 3$ systems', why: 'It works for any $n \\times n$ system.' },
            { text: 'Because the right-hand sides are different', why: 'That doesn’t matter.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Define the Gauss-Seidel method',
          body: 'The Gauss-Seidel method is similar to the method of simple iteration. Given $x^{(0)}$, simple iteration obtains the whole of $x^{(1)}$ from $x^{(0)}$, whereas in GSM each new value $x^{(k+1)}_i$ is used immediately to compute $x^{(k+1)}_{i+1}$, and so on:\n$$x^{(k+1)}_i = f_i + \\sum_{j<i} c_{ij}x^{(k+1)}_j + \\sum_{j>i} c_{ij}x^{(k)}_j.$$\nThe same convergence conditions are sufficient, and GSM usually converges faster because it always uses the newest values.',
        },
        {
          type: 'finish',
          title: 'Linear systems: done.',
          body: 'You’ve now covered every linear-systems method in MTH 209. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
