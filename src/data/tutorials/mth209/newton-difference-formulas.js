// MTH 209 · Finite differences · Lesson 2: the shift operator E and Newton's forward/backward formulas.

export default {
  id: 'newton-difference-formulas',
  title: 'Operators and Newton’s difference formulas',
  covers: 'E, Δ = E − 1, ∇ = 1 − E⁻¹, δ = E^½ − E^−½, δ² = Δ∇; Newton forward and backward interpolation',
  minutes: 18,
  sections: [
    {
      name: 'Symbolic operators',
      terms: [
        ['Shift (step-up) operator E', '$Ef_k = f_{k+1}$, $E^{-1}f_k = f_{k-1}$, $E^jf_k = f_{k+j}$.'],
        ['Operator relations', '$\\Delta = E - 1$, $\\nabla = 1 - E^{-1}$, $\\delta = E^{\\frac12} - E^{-\\frac12}$, $\\delta^2 = \\Delta\\nabla$.'],
        ['Averaging operator μ', '$\\mu f_k = \\frac12\\left(f_{k+\\frac12} + f_{k-\\frac12}\\right)$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Finite differences · Lesson 2',
          title: 'Treat the operators like algebra',
          body: 'The ==shift operator== $E$ moves one step forward along the table:\n$$Ef_k = f_{k+1},\\qquad E^{-1}f_k = f_{k-1},\\qquad E^jf_k = f_{k+j}.$$\n\nEvery difference operator can be written in terms of $E$. Then formulas can be found by ordinary algebra, such as the binomial theorem.',
          cta: 'Show me',
        },
        {
          type: 'story',
          eyebrow: 'Δ in terms of E',
          title: '$\\Delta = E - 1$',
          body: '$$\\Delta f_k = f_{k+1} - f_k = Ef_k - E^0f_k = (E - 1)f_k.$$\n\nSo $\\Delta = E - 1$, i.e. $E = 1 + \\Delta$. Then\n$$\\Delta^2 f_k = f_{k+2} - 2f_{k+1} + f_k = (E^2 - 2E + 1)f_k = (E - 1)^2f_k,$$\nand in general $\\Delta^n = (E - 1)^n$, $E^n = (1 + \\Delta)^n$.',
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
          type: 'story',
          eyebrow: 'Proof',
          title: '$\\delta^2 = \\Delta\\nabla$',
          body: '$$\\begin{aligned} \\delta^2 &= (E^{\\frac12} - E^{-\\frac12})^2 = E - 2 + E^{-1} \\\\ &= (E - 1) - (1 - E^{-1}) \\\\ &= E(1 - E^{-1}) - 1(1 - E^{-1}) \\\\ &= (E - 1)(1 - E^{-1}) = \\Delta\\nabla. \\end{aligned}$$\n\nThe operators also **commute**: $\\Delta\\nabla = \\nabla\\Delta$, and $DE = ED$ for the derivative $D$.',
        },
        {
          type: 'bridge',
          title: 'Operators: related.',
          recap: [
            '$\\Delta = E - 1$, $\\nabla = 1 - E^{-1}$, $\\delta = E^{\\frac12} - E^{-\\frac12}$.',
            '$\\delta^2 = E - 2 + E^{-1} = \\Delta\\nabla$.',
          ],
          why: 'Now the payoff: Newton’s interpolation formulas drop straight out of $E = 1 + \\Delta$.',
        },
      ],
    },
    {
      name: 'Newton’s formulas',
      terms: [
        ['Newton forward difference formula', '$f_r = f_0 + r\\Delta f_0 + \\frac{r(r-1)}{2!}\\Delta^2f_0 + \\frac{r(r-1)(r-2)}{3!}\\Delta^3f_0 + \\cdots$, where $x = x_0 + rh$.'],
        ['Newton backward difference formula', '$f_r = f_n + r\\nabla f_n + \\frac{r(r+1)}{2!}\\nabla^2f_n + \\frac{r(r+1)(r+2)}{3!}\\nabla^3f_n + \\cdots$, where $x = x_n + rh$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Forward formula',
          title: 'Expand $(1 + \\Delta)^r$',
          body: 'To estimate $f$ at $x = x_0 + rh$ (with $r$ not necessarily a whole number), use $f_r = E^rf_0 = (1 + \\Delta)^rf_0$ and the binomial expansion:\n$$f_r = f_0 + r\\Delta f_0 + \\frac{r(r - 1)}{2!}\\Delta^2f_0 + \\frac{r(r - 1)(r - 2)}{3!}\\Delta^3f_0 + \\cdots$$\n\nThis is ==Newton’s forward difference formula==. It uses the **top diagonal** of the difference table, so use it near the **start** of the table.',
        },
        {
          type: 'story',
          eyebrow: 'Backward formula',
          title: 'Expand $(1 - \\nabla)^{-r}$',
          body: 'From $\\nabla = 1 - E^{-1}$: $E^{-1} = 1 - \\nabla$, so $E^r = (1 - \\nabla)^{-r}$:\n$$f_r = f_n + r\\nabla f_n + \\frac{r(r + 1)}{2!}\\nabla^2f_n + \\frac{r(r + 1)(r + 2)}{3!}\\nabla^3f_n + \\cdots$$\nwith $x = x_n + rh$ (so $r < 0$ inside the table).\n\nThis is ==Newton’s backward difference formula==. It uses the **bottom diagonal**, so use it near the **end** of the table.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Population of a town',
          body: '$$\\begin{array}{c|c|c|c|c|c} \\text{Year} & y & \\Delta y & \\Delta^2 y & \\Delta^3 y & \\Delta^4 y \\\\ \\hline 1891 & 46 & 20 & -5 & 2 & -3 \\\\ 1901 & 66 & 15 & -3 & -1 & \\\\ 1911 & 81 & 12 & -4 & & \\\\ 1921 & 93 & 8 & & & \\\\ 1931 & 101 & & & & \\end{array}$$\n\nEstimate the population in **1895** and in **1925**. Here $h = 10$.',
        },
        {
          type: 'choice',
          eyebrow: '1895 · find r',
          prompt: '1895 is near the start, so use the forward formula from $x_0 = 1891$. What is $r$?',
          options: [
            { text: '$0.4$', correct: true, why: '$1895 = 1891 + 10r \\implies r = 0.4$.' },
            { text: '$4$', why: 'Divide by $h = 10$.' },
            { text: '$-0.6$', why: 'That’s for 1925 measured from 1931.' },
            { text: '$0.5$', why: '1895 is 4 years after 1891, not 5.' },
          ],
        },
        {
          type: 'story',
          eyebrow: '1895 · substitute',
          title: 'Use the top diagonal: $46, 20, -5, 2, -3$',
          body: '$$\\begin{aligned} f_{1895} &= 46 + 0.4(20) + \\frac{0.4(-0.6)}{2}(-5) + \\frac{0.4(-0.6)(-1.6)}{6}(2) \\\\ &\\quad + \\frac{0.4(-0.6)(-1.6)(-2.6)}{24}(-3) \\\\ &= 46 + 8 + 0.6 + 0.128 + 0.1248 = 54.85. \\end{aligned}$$\n\nPopulation in 1895 $\\approx$ **54.85** (thousand).',
        },
        {
          type: 'choice',
          eyebrow: '1925 · backward formula',
          prompt: 'Use the backward formula from $x_n = 1931$ with the bottom diagonal $101, 8, -4, -1, -3$. What is $r$, and the estimate?',
          options: [
            { text: '$r = -0.6$, estimate $96.84$', correct: true, why: '$1925 = 1931 + 10r \\implies r = -0.6$. Then $101 - 4.8 + 0.48 + 0.056 + 0.1008 = 96.84$.' },
            { text: '$r = 0.6$, estimate $105.8$', why: '1925 is **before** 1931, so $r$ is negative.' },
            { text: '$r = 0.4$, estimate $97.41$', why: 'That comes from expanding about 1921 with fewer differences. The question asks for the backward formula from 1931, which uses the whole bottom diagonal.' },
            { text: '$r = -6$, estimate $53$', why: 'Divide the gap by $h = 10$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'The forward formula uses $\\frac{r(r - 1)}{2!}$; the backward formula uses $\\frac{r(r + 1)}{2!}$.', correct: true, why: '**Forward: $(1 + \\Delta)^r$. Backward: $(1 - \\nabla)^{-r}$**, which flips the signs.' },
            { text: 'Use the forward formula near the start of a table and the backward formula near the end.', correct: true, why: '**Each uses the differences nearest its own end**, which keeps $|r|$ small and the terms shrinking.' },
            { text: 'For data from a cubic, terms beyond $\\Delta^3$ are zero.', correct: true, why: '**Fourth and higher differences of a cubic vanish**, so the formula is exact.' },
            { text: '$r$ is always a whole number.', why: '**$r = \\frac{x - x_0}{h}$** is usually a fraction: that’s the point of interpolating.' },
          ],
        },
        {
          type: 'finish',
          title: 'Finite differences: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
