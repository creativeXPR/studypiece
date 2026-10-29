// MAT 222 · The Riemann integral · Lesson 2: completeness, upper and lower integrals, the definition.

export default {
  id: 'riemann-integral',
  title: 'Upper and lower integrals',
  covers: 'The completeness axiom, the sets of lower and upper sums, lower and upper integrals, Riemann integrability, constants and ∫₀¹ x² dx = ⅓ from the definition',
  minutes: 18,
  sections: [
    {
      name: 'From sums to integrals',
      terms: [
        ['Completeness axiom', 'Every non-empty subset of $\\mathbb{R}$ bounded above has a least upper bound (supremum); every non-empty subset bounded below has a greatest lower bound (infimum).'],
        ['Lower integral', '$\\underline{\\int_a^b} f = \\sup\\{L(f, \\pi) : \\pi \\text{ a partition of } [a, b]\\}$.'],
        ['Upper integral', '$\\overline{\\int_a^b} f = \\inf\\{U(f, \\pi) : \\pi \\text{ a partition of } [a, b]\\}$.'],
        ['Riemann integrable', 'A bounded $f$ on $[a, b]$ is Riemann integrable if $\\underline{\\int_a^b} f = \\overline{\\int_a^b} f$; the common value is $\\int_a^b f(x)\\,dx$. We write $f \\in \\mathcal{R}[a, b]$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The Riemann integral · Lesson 2',
          title: 'Why we need completeness',
          body: 'There are infinitely many partitions, so infinitely many lower sums. To speak of the **best** lower sum we need a supremum to exist.\n\n**Completeness axiom.** Every non-empty subset of $\\mathbb{R}$ that is bounded above has a supremum in $\\mathbb{R}$; every non-empty subset bounded below has an infimum.\n\nThe sets $\\mathcal{L}(f) = \\{L(f, \\pi)\\}$ and $\\mathcal{U}(f) = \\{U(f, \\pi)\\}$ are non-empty, and $\\mathcal{L}(f)$ is bounded above (by any upper sum) while $\\mathcal{U}(f)$ is bounded below (by any lower sum).',
          cta: 'Define the integrals',
        },
        {
          type: 'story',
          eyebrow: 'Definitions',
          title: 'The best lower sum and the best upper sum',
          body: '$$\\underline{\\int_a^b} f = \\sup_{\\pi} L(f, \\pi), \\qquad \\overline{\\int_a^b} f = \\inf_{\\pi} U(f, \\pi).$$\n**Lemma.** $\\underline{\\int_a^b} f \\le \\overline{\\int_a^b} f$, because every lower sum is below every upper sum.\n\n$f$ is ==Riemann integrable== on $[a, b]$ if the two are **equal**; their common value is $\\int_a^b f(x)\\,dx$. The lower integral is the best possible under-estimate of the area, the upper the best over-estimate.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For a constant $f(x) = c$ on $[a, b]$, what is $U(f, \\pi)$ for any partition?',
          options: [
            { text: '$c(b - a)$', correct: true, why: 'Every $M_k = c$, so $U = c\\sum \\Delta x_k = c(b - a)$. Likewise $L = c(b - a)$, so $\\int_a^b c\\,dx = c(b - a)$.' },
            { text: '$c$', why: 'Multiply by the total length $\\sum \\Delta x_k = b - a$.' },
            { text: 'It depends on $\\pi$', why: 'For a constant, every rectangle has the same height $c$.' },
            { text: '$0$', why: 'Only $U - L$ is $0$ here.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The definition: set.',
          recap: ['Lower integral = sup of lower sums; upper integral = inf of upper sums.', 'Integrable ⇔ they are equal.'],
          why: 'Now the classic computation from the definition.',
        },
      ],
    },
    {
      name: '∫₀¹ x² dx from the definition',
      screens: [
        {
          type: 'custom',
          widget: 'riemannSums',
          eyebrow: 'See it',
          title: '$\\int_0^1 x^2\\,dx$ by squeezing',
          body: 'Uniform partition $\\pi_n = \\{0, \\frac1n, \\frac2n, \\dots, 1\\}$. Switch between lower, upper and tagged sums and push $n$ up.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Show $f(x) = x^2$ is integrable on $[0, 1]$ and find $\\int_0^1 x^2\\,dx$',
          body: '$f$ is bounded ($0 \\le x^2 \\le 1$) and increasing on $[0, 1]$. On $[\\frac{k-1}{n}, \\frac kn]$: $m_k = \\frac{(k-1)^2}{n^2}$, $M_k = \\frac{k^2}{n^2}$, $\\Delta x_k = \\frac1n$. Using $\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$,\n$$U(f, \\pi_n) = \\frac{1}{n^3}\\sum_{k=1}^n k^2 = \\frac{(n + 1)(2n + 1)}{6n^2}, \\qquad L(f, \\pi_n) = \\frac{(n - 1)n(2n - 1)}{6n^3}.$$\n$U - L = \\frac{1}{n^3}\\left(n^2\\right) = \\frac1n \\to 0$, so $f$ is integrable, and\n$$\\int_0^1 x^2\\,dx = \\lim_{n \\to \\infty} U(f, \\pi_n) = \\lim \\left(\\frac13 + \\frac{1}{2n} + \\frac{1}{6n^2}\\right) = \\frac13.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Check',
          prompt: 'In that computation, why is $U - L = \\frac1n$?',
          options: [
            { text: 'The sums telescope: $\\frac{1}{n^3}\\sum (k^2 - (k - 1)^2) \\cdot n = \\frac{1}{n^3} \\cdot n^2$', correct: true, why: '$\\sum_{k=1}^n (M_k - m_k) = \\frac{1}{n^2}(n^2 - 0) = 1$, times $\\Delta x = \\frac1n$. This is the monotone pattern you’ll prove in general next lesson.' },
            { text: 'Because $x^2 \\le 1$', why: 'Boundedness alone gives no rate.' },
            { text: 'By the MVT', why: 'No MVT needed; it is a telescoping sum.' },
            { text: 'It is $\\frac{1}{n^2}$, not $\\frac1n$', why: 'Check: $U - L = \\frac{1}{n} \\cdot (f(1) - f(0)) = \\frac1n$.' },
          ],
        },
        {
          type: 'finish',
          title: 'The Riemann integral: defined.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
