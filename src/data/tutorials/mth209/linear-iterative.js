// MTH 209 · Part B · Lesson 6: iterative methods for linear systems. X = CX + F, why the row-sum
// test α < 1 makes it converge (the error shrinks by α each step, like |g′| < 1), the error bound
// α/(1 − α) from a geometric series, and Gauss-Seidel. Replaces simple-iteration.js and
// gauss-seidel.js. Numbers recomputed in Python.
import { jacobiScene, seidelScene } from './system-scenes';

export default {
  id: 'linear-iterative',
  title: 'Simple iteration and Gauss-Seidel',
  covers: 'Rearranging AX = B as X = CX + F, the method of simple iteration, the convergence test α < 1 (diagonal dominance) and why it works, the error bound α/(1 − α) × largest change, the Gauss-Seidel method, and choosing between direct and iterative methods',
  minutes: 18,
  sections: [
    {
      name: 'Simple iteration',
      terms: [
        ['X = CX + F', 'Solve equation $i$ for $x_i$: $c_{ij} = -\\frac{a_{ij}}{a_{ii}}$ ($i \\neq j$), $c_{ii} = 0$, $f_i = \\frac{b_i}{a_{ii}}$.'],
        ['Simple iteration (SIM)', '$x^{(k+1)} = Cx^{(k)} + F$: every new component uses the old vector.'],
        ['Convergence test', 'Every row sum $\\sum_j |c_{ij}| \\le \\alpha < 1$ (or every column sum $\\le \\beta < 1$): the system is diagonally dominant.'],
        ['Error bound', '$|x_i - x^{(k)}_i| \\le \\frac{\\alpha}{1 - \\alpha}\\max_j |x^{(k)}_j - x^{(k-1)}_j|$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part B · Lesson 6',
          title: 'Guess, improve, repeat: for systems',
          body: '**Where we are:** direct methods (inverse, elimination, LU) do a fixed amount of work. For large systems where each unknown **dominates its own equation**, there is a simpler way: the iteration engine from Lesson 2, now with vectors.\n\n**The idea:** solve equation $i$ for $x_i$, guess all the unknowns, and feed the guesses back in:\n$$x_i = \\frac{1}{a_{ii}}\\Big(b_i - \\sum_{j \\neq i} a_{ij}x_j\\Big).$$\nIn matrix form, $X = CX + F$ with $c_{ij} = -\\frac{a_{ij}}{a_{ii}}$, $c_{ii} = 0$, $f_i = \\frac{b_i}{a_{ii}}$.',
          cta: 'Show me',
        },
        jacobiScene,
        {
          type: 'story',
          eyebrow: 'Why it converges',
          title: 'Each step multiplies the error by at most α',
          body: 'The solution satisfies $X = CX + F$; the iterate satisfies $x^{(k+1)} = Cx^{(k)} + F$. Subtract: the error $e^{(k)} = X - x^{(k)}$ obeys $e^{(k+1)} = Ce^{(k)}$, so each component of the new error is at most $\\sum_j |c_{ij}| \\times$ the largest old error. If every row sum is $\\le \\alpha < 1$:\n$$\\max|e^{(k+1)}| \\le \\alpha\\,\\max|e^{(k)}|,$$\nthe error shrinks like $\\alpha^k$ from **any** start. Exactly the $|g\'| < 1$ test from Lesson 2, for vectors.\n\n**Error bound:** the remaining changes form a geometric series $\\alpha + \\alpha^2 + \\cdots = \\frac{\\alpha}{1 - \\alpha}$ times the last change.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply the test',
          prompt: 'For $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$, find $\\alpha$.',
          options: [
            { text: '$0.4$', correct: true, why: 'Row sums: $\\frac{1 + 1}{10} = 0.2$, $\\frac{2 + 1}{10} = 0.3$, $\\frac{2 + 2}{10} = 0.4$. Largest is $0.4 < 1$: converges.' },
            { text: '$0.2$', why: 'Take the **largest** row sum.' },
            { text: '$0.9$', why: 'That adds all the row sums together.' },
            { text: '$4$', why: 'Divide by the diagonal entry 10.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Worked (class), then your turn',
          title: 'Simple iteration for the same system from $x^{(0)} = 0$.',
          body: 'Every component of $x^{(k+1)}$ uses the **old** vector. Solution: $(1, 1, 1)$.',
          graph: {
            steps: [
              { ask: '$x^{(1)} = (1.2, 1.3, ?)$: $x_3^{(1)} = $', answer: 1.4, tol: 0.0001, hint: '$\\frac{14}{10}$.' },
              { ask: '$x_1^{(2)} = \\frac{12 - 1.3 - 1.4}{10} = $', answer: 0.93, tol: 0.0001, hint: 'Old values only.' },
              { ask: '$x_3^{(2)} = \\frac{14 - 2(1.2) - 2(1.3)}{10} = $', answer: 0.9, tol: 0.0001, hint: '$\\frac{9}{10}$.' },
              { ask: 'After $k = 3$ the largest change is $0.13$. Error bound $\\frac{0.4}{0.6}(0.13) = $ (3 d.p.)', answer: 0.087, tol: 0.0005, hint: '$\\frac{\\alpha}{1 - \\alpha} \\times$ largest change.', done: '$x^{(3)} = (1.018, 1.024, 1.030)$: true error $0.03$, inside the bound.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Gauss-Seidel',
      terms: [
        ['Gauss-Seidel (GSM)', '$x^{(k+1)}_i = f_i + \\sum_{j<i} c_{ij}x^{(k+1)}_j + \\sum_{j>i} c_{ij}x^{(k)}_j$: use each new value at once.'],
      ],
      screens: [
        seidelScene,
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Why wait? Use the newest values',
          body: 'By the time SIM computes $x^{(1)}_2$, it already **knows** $x^{(1)}_1$, which is closer to the answer than $x^{(0)}_1$, yet it ignores it. **Gauss-Seidel** uses each new value as soon as it exists:\n$$x^{(1)}_1 = \\tfrac{1}{10}(12 - 0 - 0) = 1.2,\\qquad x^{(1)}_2 = \\tfrac{1}{10}(13 - 2(\\mathbf{1.2}) - 0) = 1.06.$$\nSame $C$ and $F$, same convergence test; better information at each step, so it usually needs about **half** the iterations.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Gauss-Seidel: from $x^{(1)} = (1.2, 1.06, 0.948)$, compute $x^{(2)}$.',
          graph: {
            steps: [
              { ask: '$x_1^{(2)} = \\frac{12 - 1.06 - 0.948}{10} = $ (4 d.p.)', answer: 0.9992, tol: 0.0001, hint: '$\\frac{9.992}{10}$.' },
              { ask: '$x_2^{(2)} = \\frac{13 - 2x_1^{(2)} - 0.948}{10} = $ (4 d.p.)', answer: 1.0054, tol: 0.0001, hint: 'Use the **new** $x_1 = 0.9992$.' },
              { ask: '$x_3^{(2)} = \\frac{14 - 2x_1^{(2)} - 2x_2^{(2)}}{10} = $ (4 d.p.)', answer: 0.9991, tol: 0.0001, hint: 'Both new values.', done: 'GSM reaches $(1, 1, 1)$ to 3 d.p. in 3 iterations; SIM needs about 6.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Watch out',
          prompt: 'Why can\'t GSM be applied as written to $x_1 + 6x_2 = 7$, $5x_1 + x_2 = 6$?',
          options: [
            { text: 'It isn\'t diagonally dominant (row sums $6$ and $5$). Swap the equations first.', correct: true, why: 'Swapped: $5x_1 + x_2 = 6$, $x_1 + 6x_2 = 7$ has row sums $\\frac15$ and $\\frac16$, both below 1.' },
            { text: 'Because $\\det A = 0$', why: '$\\det A = 1 - 30 = -29 \\neq 0$.' },
            { text: 'GSM only works for $3 \\times 3$ systems', why: 'It works for any size.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Describe SIM and GSM, with the convergence condition',
          body: 'Rewrite $AX = B$ as $X = CX + F$ with $c_{ij} = -\\frac{a_{ij}}{a_{ii}}$ ($i \\neq j$), $c_{ii} = 0$, $f_i = \\frac{b_i}{a_{ii}}$.\n\n**SIM:** $x^{(k+1)} = Cx^{(k)} + F$, every component from the old vector. **GSM:** $x^{(k+1)}_i = f_i + \\sum_{j<i} c_{ij}x^{(k+1)}_j + \\sum_{j>i} c_{ij}x^{(k)}_j$, each new value used at once.\n\nBoth converge from any $x^{(0)}$ if $\\sum_j |c_{ij}| \\le \\alpha < 1$ for every $i$ (or column sums $\\le \\beta < 1$), and then $|x_i - x^{(k)}_i| \\le \\frac{\\alpha}{1 - \\alpha}\\max_j|x^{(k)}_j - x^{(k-1)}_j|$. Stop when successive iterates agree to the required accuracy.',
        },
        {
          type: 'finish',
          title: 'You can iterate a system.',
          body: 'Direct or iterative? Direct for small or awkward systems; iterative for large, diagonally dominant ones. Next: exam practice, then systems that are not linear. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
