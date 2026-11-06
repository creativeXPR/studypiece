// MTH 209 · Finite differences · Exam practice, shaped on past examination questions: deriving
// Δ⁴f, ∇⁴f and δ⁴f from the definitions, proving the E-operator identities, a difference table for
// x³ with step 0.1, and approximating a derivative with the central difference.

export default {
  id: 'exam-differences',
  title: 'Exam practice: finite differences',
  covers: 'Exam-style questions: defining Δ, ∇ and δ and deriving fourth differences, proving Δ = E − 1, E² = (Δ + 1)², δ = E^½∇ = E^−½Δ, δ² = ∇Δ and DE = ED, a difference table for x³, and approximating a derivative',
  minutes: 22,
  sections: [
    {
      name: 'Derivations and proofs',
      terms: [
        ['Definitions', '$\\Delta f_k = f_{k+1} - f_k$, $\\nabla f_k = f_k - f_{k-1}$, $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$, $Ef_k = f_{k+1}$.'],
        ['Fourth differences', 'Coefficients $1, -4, 6, -4, 1$ (binomial, alternating signs).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam practice',
          title: 'Derive, prove, tabulate',
          body: 'Difference questions come in three flavours: **derive** a higher difference from the definitions, **prove** an operator identity using $E$, and **build a table**.\n\nThe trick for every derivation: write the operator in terms of $E$, expand with the binomial theorem, and read off shifts. $\\Delta^4 = (E - 1)^4 = E^4 - 4E^3 + 6E^2 - 4E + 1$.',
          cta: 'Start',
        },
        {
          type: 'choice',
          eyebrow: 'Question 1(i)',
          prompt: 'By first defining $\\Delta$, show that $\\Delta^4 f_k = $',
          options: [
            { text: '$f_{k+4} - 4f_{k+3} + 6f_{k+2} - 4f_{k+1} + f_k$', correct: true, why: '$\\Delta = E - 1$, so $\\Delta^4 = (E - 1)^4$ and $E^jf_k = f_{k+j}$.' },
            { text: '$f_{k+4} + 4f_{k+3} + 6f_{k+2} + 4f_{k+1} + f_k$', why: 'The signs alternate: $(E - 1)^4$, not $(E + 1)^4$.' },
            { text: '$f_{k+4} - f_k$', why: 'That is only the total change over 4 steps.' },
            { text: '$f_k - 4f_{k-1} + 6f_{k-2} - 4f_{k-3} + f_{k-4}$', why: 'That is $\\nabla^4 f_k$, looking backwards.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Question 1(iii)',
          prompt: '$\\delta^4 f_k = $',
          options: [
            { text: '$f_{k+2} - 4f_{k+1} + 6f_k - 4f_{k-1} + f_{k-2}$', correct: true, why: '$\\delta^4 = (E^{\\frac12} - E^{-\\frac12})^4 = E^2 - 4E + 6 - 4E^{-1} + E^{-2}$: centred on $f_k$.' },
            { text: '$f_{k+4} - 4f_{k+3} + 6f_{k+2} - 4f_{k+1} + f_k$', why: 'That is the forward difference.' },
            { text: '$f_{k+\\frac12} - f_{k-\\frac12}$', why: 'That is $\\delta f_k$ only.' },
            { text: '$f_{k+2} + 4f_{k+1} + 6f_k + 4f_{k-1} + f_{k-2}$', why: 'Signs alternate.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Question 2(iii)',
          prompt: 'Prove $\\delta = E^{\\frac12}\\nabla = E^{-\\frac12}\\Delta$. Order the lines.',
          items: [
            '$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12} = (E^{\\frac12} - E^{-\\frac12})f_k$, so $\\delta = E^{\\frac12} - E^{-\\frac12}$.',
            'Factor out $E^{\\frac12}$: $\\delta = E^{\\frac12}(1 - E^{-1}) = E^{\\frac12}\\nabla$, since $\\nabla = 1 - E^{-1}$.',
            'Factor out $E^{-\\frac12}$: $\\delta = E^{-\\frac12}(E - 1) = E^{-\\frac12}\\Delta$, since $\\Delta = E - 1$. ∎',
          ],
        },
        {
          type: 'order',
          eyebrow: 'Question 2(v)',
          prompt: 'Prove $DE = ED$, where $D = \\frac{d}{dx}$ and $Ef(x) = f(x + h)$.',
          items: [
            'For any differentiable $f$: $(DE)f(x) = D\\big(f(x + h)\\big) = f\'(x + h)$.',
            '$(ED)f(x) = E\\big(f\'(x)\\big) = f\'(x + h)$.',
            'The two agree for every $f$, so $DE = ED$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Question 2(iv)',
          prompt: 'The key step in proving $\\delta^2 = \\nabla\\Delta$ is',
          options: [
            { text: '$\\delta^2 = E - 2 + E^{-1} = (E - 1)(1 - E^{-1})$', correct: true, why: 'And $(E - 1) = \\Delta$, $(1 - E^{-1}) = \\nabla$.' },
            { text: '$\\delta^2 = \\Delta^2 + \\nabla^2$', why: 'Not an identity.' },
            { text: '$\\delta = \\Delta\\nabla$', why: 'It is $\\delta^2$ that equals $\\Delta\\nabla$.' },
            { text: '$E^2 = (\\Delta + 1)^2$', why: 'True, but not what is needed here.' },
          ],
        },
      ],
    },
    {
      name: 'Tables and estimates',
      terms: [
        ['Polynomial check', 'For $x^3$ with step $h$: $\\Delta^3 = 3!h^3$, higher differences $0$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 3',
          title: 'Construct a table of finite differences for $f(x) = x^3$, $x = 5.0$ to $5.5$, $h = 0.1$. Use it to determine $\\Delta^3$, $\\Delta^4$ and $\\Delta^5$.',
          graph: {
            steps: [
              { ask: '$f(5.1) = $', answer: 132.651, tol: 0.0005, hint: '$5.1^3$.' },
              { ask: '$\\Delta f_0 = f(5.1) - f(5.0) = $', answer: 7.651, tol: 0.0005, hint: '$132.651 - 125$.' },
              { ask: '$\\Delta^2 f_0 = $', answer: 0.306, tol: 0.0005, hint: '$\\Delta f_1 - \\Delta f_0 = 7.957 - 7.651$.' },
              { ask: '$\\Delta^3 f = $ (constant)', answer: 0.006, tol: 0.0001, hint: '$0.312 - 0.306$; in fact $3!h^3 = 6(0.001)$.' },
              { ask: '$\\Delta^4 f = $ and $\\Delta^5 f = $', answer: 0, tol: 0.00001, hint: 'Differences of a constant column.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Question 4',
          title: 'Using the central difference with $h = 1$, approximate the derivative of $f(t) = t^2 + 2t$ at $t = -3$.',
          body: '$f\'(t) \\approx \\frac{\\delta f(t)}{h} = \\frac{f(t + \\frac12) - f(t - \\frac12)}{1}$.',
          graph: {
            steps: [
              { ask: '$f(-2.5) = $', answer: 1.25, tol: 0.001, hint: '$6.25 - 5$.' },
              { ask: '$f(-3.5) = $', answer: 5.25, tol: 0.001, hint: '$12.25 - 7$.' },
              { ask: '$f\'(-3) \\approx$', answer: -4, tol: 0.001, hint: '$1.25 - 5.25$. Exact: $2t + 2 = -4$; the central difference is exact for quadratics.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Newton’s forward formula suits values near the start of a table', correct: true, why: 'It uses the top diagonal.' },
            { text: 'Newton’s backward formula suits values near the end', correct: true, why: 'It uses the bottom diagonal.' },
            { text: '$\\Delta\\nabla = \\nabla\\Delta = \\delta^2$', correct: true, why: 'All equal $E - 2 + E^{-1}$.' },
            { text: '$\\nabla = E - 1$', why: '$\\nabla = 1 - E^{-1}$; $\\Delta = E - 1$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Finite differences: exam ready.',
          body: 'Methods, ready for revision:',
        },
      ],
    },
  ],
};
