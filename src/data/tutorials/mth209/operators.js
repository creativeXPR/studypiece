// MTH 209 · Part C · Lesson 2: the operator algebra. The shift operator E, writing Δ, ∇, δ and μ in
// terms of E, the standard proofs (δ² = Δ∇, δ = E^½∇ = E^−½Δ, E² = (Δ + 1)², DE = ED), and the link
// to Taylor's series, E = e^{hD}. Split out of newton-difference-formulas.js.

export default {
  id: 'operators',
  title: 'The operator algebra',
  covers: 'The shift operator E; Δ = E − 1, ∇ = 1 − E⁻¹, δ = E^½ − E^−½, μ; proofs of δ² = Δ∇, δ = E^½∇ = E^−½Δ, E² = (Δ + 1)² and DE = ED; higher differences in terms of table values; and E = e^{hD} from Taylor series',
  minutes: 12,
  sections: [
    {
      name: 'Operators as algebra',
      terms: [
        ['Shift operator E', '$Ef_k = f_{k+1}$, $E^{-1}f_k = f_{k-1}$, $E^jf_k = f_{k+j}$.'],
        ['Relations', '$\\Delta = E - 1$, $\\nabla = 1 - E^{-1}$, $\\delta = E^{\\frac12} - E^{-\\frac12}$, $\\delta^2 = \\Delta\\nabla$.'],
        ['Averaging operator μ', '$\\mu f_k = \\frac12\\left(f_{k+\\frac12} + f_{k-\\frac12}\\right)$, so $\\mu = \\frac12\\left(E^{\\frac12} + E^{-\\frac12}\\right)$.'],
        ['E and D', '$E = e^{hD}$, where $D = \\frac{d}{dx}$: Taylor\'s series in operator form.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part C · Lesson 2',
          title: 'Turn table-reading into algebra',
          body: '**Where we are:** Lesson 1 built difference tables by hand. **The problem:** relations like "$\\Delta^3f_0$ in terms of table values" or "$\\delta^2 = \\Delta\\nabla$" get messy written out entry by entry.\n\n**The idea:** give the move "one step along the table" a name, the ==shift operator== $E$:\n$$Ef_k = f_{k+1},\\qquad E^{-1}f_k = f_{k-1},\\qquad E^jf_k = f_{k+j}.$$\nWrite every difference in terms of $E$, and ordinary algebra (expanding brackets, the binomial theorem) does the work.',
          cta: 'Show me',
        },
        {
          type: 'story',
          eyebrow: 'The method',
          title: '$\\Delta = E - 1$, and the rest',
          body: '$$\\Delta f_k = f_{k+1} - f_k = Ef_k - f_k = (E - 1)f_k \\implies \\Delta = E - 1.$$\nIn the same way:\n• $\\nabla f_k = f_k - f_{k-1} = (1 - E^{-1})f_k$, so $\\nabla = 1 - E^{-1}$\n• $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$, so $\\delta = E^{\\frac12} - E^{-\\frac12}$\n• $\\mu f_k = \\frac12(f_{k+\\frac12} + f_{k-\\frac12})$, so $\\mu = \\frac12(E^{\\frac12} + E^{-\\frac12})$\n\n**Payoff:** $E = 1 + \\Delta$, so $E^2 = (\\Delta + 1)^2$ and $\\Delta^n = (E - 1)^n$: just expand.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Expand $\\Delta^3 = (E - 1)^3$ to write $\\Delta^3f_0$ in terms of table values.',
          options: [
            { text: '$f_3 - 3f_2 + 3f_1 - f_0$', correct: true, why: '$(E - 1)^3 = E^3 - 3E^2 + 3E - 1$, then apply to $f_0$. The coefficients $1, -3, 3, -1$ are why a wrong entry leaves that fingerprint (Lesson 3).' },
            { text: '$f_3 - f_0$', why: 'That is $(E^3 - 1)f_0$, not $(E - 1)^3f_0$.' },
            { text: '$f_3 + 3f_2 + 3f_1 + f_0$', why: 'The signs alternate: $(E - 1)^3$, not $(E + 1)^3$.' },
            { text: '$3f_1 - 3f_0$', why: 'That is $3\\Delta f_0$.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Match them',
          prompt: 'Match each operator to its expression in $E$.',
          buckets: [
            { id: 'f', label: 'Δ (forward)' },
            { id: 'b', label: '∇ (backward)' },
            { id: 'c', label: 'δ (central)' },
          ],
          items: [
            { text: '$E - 1$', bucket: 'f', why: '**$\\Delta f_k = Ef_k - f_k$**.' },
            { text: '$1 - E^{-1}$', bucket: 'b', why: '**$\\nabla f_k = f_k - E^{-1}f_k$**.' },
            { text: '$E^{\\frac12} - E^{-\\frac12}$', bucket: 'c', why: '**$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$**.' },
            { text: '$E^{-\\frac12}\\Delta$', bucket: 'c', why: '**$E^{-\\frac12}(E - 1) = E^{\\frac12} - E^{-\\frac12} = \\delta$**: central in terms of forward.' },
            { text: '$E^{\\frac12}\\nabla$', bucket: 'c', why: '**$E^{\\frac12}(1 - E^{-1}) = E^{\\frac12} - E^{-\\frac12} = \\delta$**: central in terms of backward.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Prove it',
          prompt: 'Prove that $\\delta^2 = \\Delta\\nabla$. Order the lines.',
          items: [
            '$\\delta^2 = \\left(E^{\\frac12} - E^{-\\frac12}\\right)^2 = E - 2 + E^{-1}$',
            '$= (E - 1) - (1 - E^{-1})$',
            '$= E(1 - E^{-1}) - 1(1 - E^{-1})$',
            '$= (E - 1)(1 - E^{-1}) = \\Delta\\nabla$. ∎',
          ],
        },
      ],
    },
    {
      name: 'Operators and Taylor',
      terms: [
        ['Commuting', 'The operators commute: $\\Delta\\nabla = \\nabla\\Delta$, $DE = ED$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Why it connects',
          title: '$E = e^{hD}$: Taylor in one symbol',
          body: 'Let $D = \\frac{d}{dx}$. Taylor\'s series (Part A) says\n$$Ef(x) = f(x + h) = f(x) + hDf(x) + \\frac{h^2D^2}{2!}f(x) + \\cdots = e^{hD}f(x).$$\nSo $E = e^{hD}$ and $\\Delta = e^{hD} - 1 \\approx hD$ for small $h$: that is why $\\frac{\\Delta f}{h}$ estimates $f\'$ (Lesson 1).\n\n**$DE = ED$:** $DEf(x) = \\frac{d}{dx}f(x + h) = f\'(x + h)$ and $EDf(x) = Ef\'(x) = f\'(x + h)$. Same result, so $DE = ED$.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which shows $\\delta = E^{-\\frac12}\\Delta$?',
          options: [
            { text: '$E^{-\\frac12}\\Delta = E^{-\\frac12}(E - 1) = E^{\\frac12} - E^{-\\frac12} = \\delta$', correct: true, why: 'Substitute $\\Delta = E - 1$ and multiply out.' },
            { text: '$E^{-\\frac12}\\Delta = E^{-\\frac12} - \\Delta = \\delta$', why: 'Operators multiply; you cannot subtract here.' },
            { text: '$\\delta = \\Delta - \\nabla$', why: 'That gives $E - 2 + E^{-1} = \\delta^2$, not $\\delta$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Define the operators; prove the relations',
          body: 'For a table $f_k = f(x_0 + kh)$: $Ef_k = f_{k+1}$; $\\Delta f_k = f_{k+1} - f_k$; $\\nabla f_k = f_k - f_{k-1}$; $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$; $\\mu f_k = \\frac12(f_{k+\\frac12} + f_{k-\\frac12})$.\n\n**Proofs:** $\\Delta f_k = (E - 1)f_k$, so $\\Delta = E - 1$ and $E^2 = (\\Delta + 1)^2$. $\\nabla = 1 - E^{-1}$. $\\delta = E^{\\frac12} - E^{-\\frac12} = E^{\\frac12}\\nabla = E^{-\\frac12}\\Delta$. $\\delta^2 = E - 2 + E^{-1} = (E - 1)(1 - E^{-1}) = \\Delta\\nabla$. $DEf(x) = f\'(x + h) = EDf(x)$, so $DE = ED$.',
        },
        {
          type: 'finish',
          title: 'You can do algebra with operators.',
          body: 'Next: put $E^r = (1 + \\Delta)^r$ through the binomial series and get Newton\'s interpolation formulas. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
