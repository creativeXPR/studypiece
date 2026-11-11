// MTH 209 · Idea C, lesson 2: the operators E, Δ, ∇, δ and their identities. Part 1 builds E and the
// rules on simple functions; Part 2 does the proofs set in every past paper (Δ = E − 1, E² = (Δ + 1)²,
// δ = E^½∇ = E^−½Δ, δ² = ∇Δ, DE = ED) and the Δ⁴, ∇⁴, δ⁴ expansions.

export default {
  id: 'operators',
  title: 'The operators E, Δ, ∇ and δ',
  covers: 'The shift operator E, writing every difference in terms of E, proving the identities, and expanding Δ⁴, ∇⁴, δ⁴',
  minutes: 13,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Shift operator $E$', '$Ef(x) = f(x + h)$, so $Ef_k = f_{k+1}$ and $E^n f_k = f_{k+n}$ (any $n$, including $\\tfrac12$ and negatives).'],
        ['In terms of $E$', '$\\Delta = E - 1$, $\\nabla = 1 - E^{-1}$, $\\delta = E^{\\frac12} - E^{-\\frac12}$.'],
        ['Differential operator $D$', '$Df(x) = f\'(x)$.'],
      ],
      steps: [
        'Define each operator by what it does to $f_k$: $Ef_k = f_{k+1}$, $\\Delta f_k = f_{k+1} - f_k$, $\\nabla f_k = f_k - f_{k-1}$, $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$.',
        'Rewrite the right side using $E$: e.g. $\\Delta f_k = Ef_k - f_k = (E - 1)f_k$.',
        'Since this holds for every $f_k$, conclude the operator identity: $\\Delta = E - 1$.',
        'Treat operators like algebra: they multiply (apply one after another) and powers expand by the binomial theorem.',
        'Expand $\\Delta^n = (E - 1)^n$, $\\nabla^n = (1 - E^{-1})^n$, $\\delta^n = (E^{\\frac12} - E^{-\\frac12})^n$, then turn each $E^m f_k$ back into $f_{k+m}$.',
      ],
      examples: [
        {
          title: 'Prove $\\Delta = E - 1$',
          question: 'By first defining $E$, prove $\\Delta = E - 1$.',
          steps: ['Define $Ef_k = f_{k+1}$.', '$\\Delta f_k = f_{k+1} - f_k = Ef_k - f_k = (E - 1)f_k$.', 'True for every $f_k$, so $\\Delta = E - 1$.'],
          answer: '$\\Delta = E - 1$.',
        },
        {
          title: '$\\Delta^2 f_k$ in terms of $f$',
          question: 'Expand $\\Delta^2 f_k$.',
          steps: ['$\\Delta^2 = (E - 1)^2 = E^2 - 2E + 1$.', '$\\Delta^2 f_k = f_{k+2} - 2f_{k+1} + f_k$.'],
          answer: '$f_{k+2} - 2f_{k+1} + f_k$.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea C · Lesson 2',
          title: 'Differences as machines',
          body: 'Last lesson computed differences number by number. This lesson treats $\\Delta$, $\\nabla$ and $\\delta$ as **operators**: machines that act on a function. All of them can be built from one simple machine, the **shift** $E$.\n\nThis lesson matters: **every past paper** asks you to prove these identities.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Everything is a shift',
          body: 'Define $Ef_k = f_{k+1}$: shift one step forward. Then\n$$\\Delta f_k = f_{k+1} - f_k = Ef_k - f_k = (E - 1)f_k,$$\nso **$\\Delta = E - 1$**. Likewise $\\nabla = 1 - E^{-1}$ (shift back) and $\\delta = E^{\\frac12} - E^{-\\frac12}$ (half a step each way).\n\nOperators multiply by doing one after another, so ordinary algebra works: $\\Delta^2 = (E - 1)^2 = E^2 - 2E + 1$.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Proving an operator identity',
          body: '1. Define each operator on $f_k$.\n2. Rewrite the right side with $E$.\n3. Holds for every $f_k$ ⇒ operator identity.\n4. Multiply operators like algebra.\n5. To expand a power: binomial theorem, then $E^m f_k = f_{k+m}$.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Prove $\\delta^2 = \\nabla\\Delta$',
          body: '**Steps 1–2.** $\\nabla = 1 - E^{-1}$, $\\Delta = E - 1$, $\\delta = E^{\\frac12} - E^{-\\frac12}$.\n\n**Step 4.** $\\nabla\\Delta = (1 - E^{-1})(E - 1) = E - 1 - 1 + E^{-1} = E - 2 + E^{-1}$.\n\nAnd $\\delta^2 = (E^{\\frac12} - E^{-\\frac12})^2 = E - 2 + E^{-1}$.\n\n**Step 3.** The same operator, so $\\delta^2 = \\nabla\\Delta$. ∎',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Expanding $\\Delta^3 f_k$',
          graph: {
            steps: [
              { ask: '$(E - 1)^3 = E^3 - 3E^2 + 3E - 1$. Coefficient of $f_{k+2}$ in $\\Delta^3 f_k$?', answer: -3, tol: 0.001, hint: '$E^2f_k = f_{k+2}$.' },
              { ask: 'Coefficient of $f_k$?', answer: -1, tol: 0.001, hint: 'The constant term, $-1$.' },
              { ask: 'Check with $x^3$ ($h = 1$): $f_3 - 3f_2 + 3f_1 - f_0 = 27 - 24 + 3 - 0 = $?', answer: 6, tol: 0.001, hint: '$3! = 6$, as last lesson predicted.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define** $\\Delta$, $\\nabla$, $\\delta$ on $f_k$, then **derive** $\\Delta^4 f_k$, $\\nabla^4 f_k$, $\\delta^4 f_k$ (or $\\delta^3 f_k$).\n• **Define** $E$, then **prove**: $\\Delta = E - 1$; $E^2 = (\\Delta + 1)^2$; $\\delta = E^{\\frac12}\\nabla = E^{-\\frac12}\\Delta$; $\\delta^2 = \\nabla\\Delta$; $DE = ED$.\n• These appear **almost word for word every year**: learn the proofs.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        '$E^2 = (\\Delta + 1)^2$: from $\\Delta = E - 1$, $E = \\Delta + 1$; square both sides.',
        '$\\delta = E^{\\frac12}\\nabla$: $E^{\\frac12}(1 - E^{-1}) = E^{\\frac12} - E^{-\\frac12} = \\delta$. And $E^{-\\frac12}\\Delta = E^{-\\frac12}(E - 1) = E^{\\frac12} - E^{-\\frac12} = \\delta$.',
        '$DE = ED$: $DEf(x) = \\tfrac{d}{dx}f(x + h) = f\'(x + h)$ and $EDf(x) = E f\'(x) = f\'(x + h)$. Equal for every $f$.',
        '$\\Delta^4 f_k = f_{k+4} - 4f_{k+3} + 6f_{k+2} - 4f_{k+1} + f_k$; $\\nabla^4 f_k = f_k - 4f_{k-1} + 6f_{k-2} - 4f_{k-3} + f_{k-4}$; $\\delta^4 f_k = f_{k+2} - 4f_{k+1} + 6f_k - 4f_{k-1} + f_{k-2}$.',
        '$\\delta^3 f_k = f_{k+\\frac32} - 3f_{k+\\frac12} + 3f_{k-\\frac12} - f_{k-\\frac32}$. Coefficients follow Pascal’s triangle with alternating signs.',
      ],
      examples: [
        {
          title: 'Derive $\\nabla^4 f_k$',
          question: 'By first defining $\\nabla$, derive $\\nabla^4 f_k$.',
          steps: ['$\\nabla f_k = f_k - f_{k-1} = (1 - E^{-1})f_k$, so $\\nabla = 1 - E^{-1}$.', '$\\nabla^4 = (1 - E^{-1})^4 = 1 - 4E^{-1} + 6E^{-2} - 4E^{-3} + E^{-4}$.', 'Apply to $f_k$ using $E^{-m}f_k = f_{k-m}$.'],
          answer: '$\\nabla^4 f_k = f_k - 4f_{k-1} + 6f_{k-2} - 4f_{k-3} + f_{k-4}$.',
        },
        {
          title: 'Prove $\\delta = E^{\\frac12}\\nabla = E^{-\\frac12}\\Delta$',
          question: 'Using $\\nabla = 1 - E^{-1}$, $\\Delta = E - 1$, $\\delta = E^{\\frac12} - E^{-\\frac12}$.',
          steps: ['$E^{\\frac12}\\nabla = E^{\\frac12}(1 - E^{-1}) = E^{\\frac12} - E^{-\\frac12}$.', '$E^{-\\frac12}\\Delta = E^{-\\frac12}(E - 1) = E^{\\frac12} - E^{-\\frac12}$.', 'Both equal $\\delta$.'],
          answer: '$\\delta = E^{\\frac12}\\nabla = E^{-\\frac12}\\Delta$. ∎',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'The question set every year',
          body: '“By first defining the step-up operator $E$, prove that (i) $\\Delta = E - 1$, (ii) $E^2 = (\\Delta + 1)^2$, (iii) $\\delta = E^{\\frac12}\\nabla = E^{-\\frac12}\\Delta$, (iv) $\\delta^2 = \\nabla\\Delta$, (v) $DE = ED$.”\n\n**What the examiner wants:** the definition $Ef_k = f_{k+1}$ first; each proof starting from definitions; the “for every $f_k$” step; and a clean conclusion. All five are under **Steps** in the side panel.',
          asides: [{ label: 'Exam tip', text: 'Write the definition of each operator before using it. “By first defining…” means the definitions carry marks.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Guided',
          prompt: 'To prove $E^2 = (\\Delta + 1)^2$, what do you establish first?',
          options: [
            { text: '$\\Delta = E - 1$, from $\\Delta f_k = f_{k+1} - f_k = Ef_k - f_k$', correct: true, why: 'Then $E = \\Delta + 1$, and squaring gives $E^2 = (\\Delta + 1)^2$. Every identity follows this pattern: define, rewrite with $E$, then algebra.' },
            { text: '$\\delta^2 = \\nabla\\Delta$', why: 'That is a different identity; it doesn’t lead to $E^2$.' },
            { text: '$E^2 f_k = f_{k+2}$ alone', why: 'True, but you need the link between $E$ and $\\Delta$ first.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student writes $\\nabla^4 f_k = f_{k+4} - 4f_{k+3} + 6f_{k+2} - 4f_{k+1} + f_k$. What is wrong?',
          options: [
            { text: 'That is $\\Delta^4 f_k$. $\\nabla$ looks back, so it should be $f_k - 4f_{k-1} + 6f_{k-2} - 4f_{k-3} + f_{k-4}$', correct: true, why: '$\\nabla = 1 - E^{-1}$ uses negative shifts.' },
            { text: 'The coefficients are wrong', why: 'The $1, 4, 6, 4, 1$ pattern is right; the indices are not.' },
            { text: 'Nothing', why: 'Forward and backward differences point opposite ways.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: 'Using $\\delta^4 f_k$',
          graph: {
            steps: [
              { ask: 'In $\\delta^4 f_k = f_{k+2} - 4f_{k+1} + 6f_k - 4f_{k-1} + f_{k-2}$, the coefficient of $f_k$?', answer: 6, tol: 0.001, hint: 'The middle of $1, 4, 6, 4, 1$.' },
              { ask: 'For $f(x) = x^4$, $h = 1$, at $k = 2$: $f_4 - 4f_3 + 6f_2 - 4f_1 + f_0 = 256 - 324 + 96 - 4 + 0 = $?', answer: 24, tol: 0.001, hint: 'It is $4! = 24$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can prove the operator identities.',
          body: '**Summary:** $E$ shifts; $\\Delta = E - 1$, $\\nabla = 1 - E^{-1}$, $\\delta = E^{\\frac12} - E^{-\\frac12}$; operators obey algebra; powers expand with Pascal’s triangle and alternating signs.\n\n**Next:** use the table to **estimate between the points**, starting with the simplest case: **linear interpolation**.',
        },
      ],
    },
  ],
};
