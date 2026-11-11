// MTH 209 · Systems of linear equations · Exam practice, shaped on the practice examination and
// past papers: consistency, the matrix inverse method (including when it fails), the concrete
// mixture problem, Gaussian elimination, LU, and the two iterative methods with their conditions.

export default {
  id: 'exam-linear-systems',
  title: 'Exam practice: linear systems',
  covers: 'Exam-style questions: consistency, the matrix inverse method and why it fails for a singular matrix, the concrete mixture problem, Gaussian elimination, LU factorisation, simple iteration and Gauss-Seidel with their convergence conditions, definitions and the use-the-stated-method rule',
  minutes: 25,
  sections: [
    {
      name: 'Direct methods',
      terms: [
        ['Use the stated method', 'If a question names a method, using another earns no method marks.'],
        ['Consistent', 'At least one solution; rank of $A$ = rank of $(A|B)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'Five methods, one rule',
          body: 'Linear-systems questions name the method: matrix inverse, LU, Gaussian, simple iteration or Gauss-Seidel. **Use exactly that method**: another method, even with the right answer, loses the method marks.\n\nKeep the pictures: a direct method makes the system triangular without moving the solution; an iterative method walks guesses towards the crossing, and only converges when each unknown dominates its own equation.',
          cta: 'Start',
        },
        {
          type: 'choice',
          eyebrow: 'Question 1',
          prompt: 'Is the system $2x + 4y + 3z = 2$, $4x + y + 6z = 3$ consistent?',
          options: [
            { text: 'Yes: rank $A$ = rank $(A|B) = 2$, so it has (infinitely many) solutions', correct: true, why: 'Two independent equations in three unknowns, no contradiction: one free unknown.' },
            { text: 'No: there are fewer equations than unknowns', why: 'Fewer equations does not make a system inconsistent; it makes the solution non-unique.' },
            { text: 'No: the coefficient matrix is not square', why: 'Consistency is about solutions existing, not about shape.' },
            { text: 'Yes, with exactly one solution', why: 'With $3$ unknowns and rank $2$ there is a free unknown.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Question 2',
          prompt: 'Why does the matrix inverse method fail for $x_1 + 2x_2 + 3x_3 = 4$, $2x_1 + 4x_2 + 6x_3 = 1$, $x_1 + x_3 = 2$?',
          options: [
            { text: '$|A| = 0$ (row 2 of $A$ is twice row 1), so $A^{-1}$ does not exist; and since $1 \\neq 2 \\times 4$ the system is inconsistent', correct: true, why: 'Parallel planes with different right-hand sides never meet.' },
            { text: 'The right-hand sides are not all equal', why: 'The right-hand sides can be anything.' },
            { text: 'There is a zero coefficient', why: 'Zero coefficients are fine; a zero determinant is the problem.' },
            { text: 'The method only works for $2 \\times 2$ systems', why: 'It works for any square non-singular system.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Concrete mixture. Batches have cement : granite : sand $= \\frac15 : \\frac35 : \\frac15$, $\\frac1{10} : \\frac5{10} : \\frac4{10}$ and $\\frac25 : \\frac35 : 0$. Find the amounts $x_1, x_2, x_3$ (m³) giving $2.6$ m³ cement, $5.8$ m³ granite and $1.6$ m³ sand.',
          body: 'Multiply each equation by $10$: $2x_1 + x_2 + 4x_3 = 26$, $6x_1 + 5x_2 + 6x_3 = 58$, $2x_1 + 4x_2 = 16$.',
          graph: {
            steps: [
              { ask: '$|A| = $', answer: 20, tol: 0.001, hint: '$2(0 - 24) - 1(0 - 12) + 4(24 - 10)$.' },
              { ask: '$x_1 = $', answer: 4, tol: 0.001, hint: 'Solve by the inverse (or check by substitution).' },
              { ask: '$x_2 = $', answer: 2, tol: 0.001, hint: 'From $2x_1 + 4x_2 = 16$.' },
              { ask: '$x_3 = $', answer: 4, tol: 0.001, hint: 'From $2x_1 + x_2 + 4x_3 = 26$.' },
              { ask: 'Check: $x_1 + x_2 + x_3 = $', answer: 10, tol: 0.001, hint: 'The total volume.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Question 4',
          prompt: 'For $2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$ ($|A| = -1$, solution $(28, 4, -17)$), a student uses $A^{-1} = \\operatorname{adj}A$ and ignores $|A|$. What do they get?',
          options: [
            { text: '$(-28, -4, 17)$: every sign is wrong, because they forgot to divide by $|A| = -1$', correct: true, why: '$A^{-1} = \\frac{\\operatorname{adj}A}{|A|}$; dividing by $-1$ flips every sign.' },
            { text: 'The correct answer, since $|A| = -1$ doesn’t matter', why: 'Dividing by $-1$ changes every sign.' },
            { text: 'Nothing: the method fails', why: 'It runs, but gives the wrong signs.' },
            { text: '$(28, 4, -17)$ divided by $9$', why: 'The determinant is $-1$, not $9$.' },
          ],
        },
      ],
    },
    {
      name: 'Iterative methods',
      terms: [
        ['Convergence', 'Each unknown must dominate its own equation: row sums $\\sum_{j \\ne i}\\frac{|a_{ij}|}{|a_{ii}|} < 1$.'],
        ['Error bound (SIM)', '$|x_i - x_i^{(k)}| \\le \\frac{\\alpha}{1 - \\alpha}\\max_i|x_i^{(k)} - x_i^{(k-1)}|$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 5',
          title: 'For $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$: check convergence, then do one Gauss-Seidel step from $0$.',
          graph: {
            steps: [
              { ask: 'Largest row sum $\\alpha = \\max_i \\sum_{j\\ne i}\\frac{|a_{ij}|}{|a_{ii}|} = $', answer: 0.4, tol: 0.0001, hint: 'Rows give $0.2$, $0.3$, $0.4$.' },
              { ask: 'Converges?', options: ['Yes: $\\alpha < 1$', 'No'], answer: 0, hint: 'Each unknown dominates its own equation.' },
              { ask: 'GSM $x_1^{(1)} = $', answer: 1.2, tol: 0.0001, hint: '$\\frac{12}{10}$.' },
              { ask: 'GSM $x_2^{(1)} = $', answer: 1.06, tol: 0.0001, hint: '$\\frac{13 - 2(1.2)}{10}$.' },
              { ask: 'GSM $x_3^{(1)} = $', answer: 0.948, tol: 0.0001, hint: '$\\frac{14 - 2(1.2) - 2(1.06)}{10}$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 6',
          title: 'After $k = 3$ simple-iteration steps on the same system, the largest change between iterates is $0.13$. Bound the error in $x^{(3)}$.',
          graph: {
            steps: [
              { ask: '$\\frac{\\alpha}{1 - \\alpha} = $ (4 d.p.)', answer: 0.6667, tol: 0.0002, hint: '$\\frac{0.4}{0.6}$.' },
              { ask: 'Error bound $\\le$ (4 d.p.)', answer: 0.0867, tol: 0.0002, hint: '$0.6667 \\times 0.13$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Question 7',
          prompt: 'Why can’t Gauss-Seidel be applied as written to $x_1 + 6x_2 = 7$, $5x_1 + x_2 = 6$?',
          options: [
            { text: 'Neither unknown dominates its own equation; swap the equations first so it does ($5x_1 + x_2 = 6$ first)', correct: true, why: 'Then $\\frac15 < 1$ and $\\frac16 < 1$: it converges.' },
            { text: 'The system has no solution', why: 'It has the solution $(1, 1)$.' },
            { text: 'Gauss-Seidel only works for $3 \\times 3$ systems', why: 'Size doesn’t matter.' },
            { text: 'The coefficients are integers', why: 'Irrelevant.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Matrix inverse, LU and Gaussian elimination are direct methods', correct: true, why: 'A fixed number of steps.' },
            { text: 'Simple iteration and Gauss-Seidel are iterative methods', correct: true, why: 'Guess, improve, repeat.' },
            { text: 'Gauss-Seidel usually converges faster than simple iteration', correct: true, why: 'It uses new values at once.' },
            { text: 'LU factorisation works for non-square matrices', why: '$A$ must be square.' },
          ],
        },
        {
          type: 'finish',
          title: 'Linear systems: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
