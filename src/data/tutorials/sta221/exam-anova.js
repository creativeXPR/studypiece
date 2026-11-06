// STA 221 · ANOVA · Exam practice: worked exam-style questions on chapter 5.
export default {
  id: 'exam-anova',
  title: 'Exam practice: ANOVA',
  covers: 'Exam-style questions: assumptions and terms, why ANOVA beats pairwise tests, a one-way ANOVA with unequal groups, completing a partial table, a two-way ANOVA with blocks',
  minutes: 16,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['Completing a table', 'SS add up; df add up; MS = SS ÷ df; F = MS ÷ MS(error).'],
        ['F table', '$F_\\alpha(\\text{numerator df}, \\text{denominator df})$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: '(a) State the assumptions of ANOVA. (b) Define factor, level, treatment and response with an example. (c) Why is ANOVA preferred to testing every pair of means?',
          body: '**(a)** Normal populations; equal variances; random, independent samples (NERI).\n\n**(b)** Comparing wheat yield under $3$ fertilisers: **response** = yield; **factor** = fertiliser; **levels** = the $3$ fertilisers used; **treatments** = the $3$ fertilisers being compared.\n\n**(c)** Testing many pairs at $5\\%$ each inflates the chance of at least one false "significant" result. ANOVA tests all the means in **one** test at a single level $\\alpha$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'Scores by teaching method — 1: $70, 75, 68, 77, 80$; 2: $65, 60, 72, 63$; 3: $82, 85, 78, 88, 80, 83$. Same mean effect? ($5\\%$)',
          body: '$T_1 = 370$ ($5$), $T_2 = 260$ ($4$), $T_3 = 496$ ($6$); $T = 1126$, $n = 15$, $\\sum x^2 = 85522$.\n\n$CF = \\frac{1126^2}{15} = 84525.07$; $SST = 996.93$.\n$SSB = \\frac{370^2}{5} + \\frac{260^2}{4} + \\frac{496^2}{6} - CF = 27380 + 16900 + 41002.67 - 84525.07 = 757.60$.\n$SSW = 996.93 - 757.60 = 239.33$.\n\nBetween: df $2$, MS $378.80$. Within: df $12$, MS $19.94$. $F = 18.99$.\n\n$F_{0.05}(2, 12) = 3.89$. $18.99 > 3.89$: reject H₀. The methods differ (means $74$, $65$, $82.7$; method 3 is best).',
          asides: [{ label: 'Exam tip', text: 'Unequal group sizes are fine: divide each $T_j^2$ by its **own** $n_j$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'One-way ANOVA with $4$ treatments and $24$ observations: $SSW = 120$, $SST = 180$. Which line of the completed table is right?',
          options: [
            { text: 'Between: SS $60$, df $3$, MS $20$, $F = 3.33$', correct: true, why: '$SSB = 180 - 120$; df $= k - 1$; $MSW = \\frac{120}{20} = 6$; $F = \\frac{20}{6}$.' },
            { text: 'Between: SS $60$, df $4$, MS $15$, $F = 2.5$', why: 'Between df $= k - 1 = 3$.' },
            { text: 'Between: SS $300$, df $3$, MS $100$', why: 'SS add up: $SSB = SST - SSW$.' },
            { text: 'Within: df $23$, MS $5.22$', why: 'Within df $= n - k = 20$; total df is $23$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Four maize varieties in five blocks. Variety totals $55, 74, 63, 84$; block totals $59, 51, 64, 45, 57$; $T = 276$, $\\sum x^2 = 3962$. Two-way ANOVA at $5\\%$.',
          body: '$c = 4$, $r = 5$; $CF = \\frac{276^2}{20} = 3808.8$.\n$SST = 3962 - 3808.8 = 153.2$.\n$SSC = \\frac{19526}{5} - CF = 96.4$.\n$SSR = \\frac{15452}{4} - CF = 54.2$.\n$SSE = 153.2 - 96.4 - 54.2 = 2.6$.\n\nVarieties: df $3$, MS $32.13$, $F_1 = \\frac{32.13}{0.2167} = 148.3$.\nBlocks: df $4$, MS $13.55$, $F_2 = 62.5$.\nError: df $12$, MS $0.2167$.\n\n$F_{0.05}(3, 12) = 3.49$ and $F_{0.05}(4, 12) = 3.26$: both are far exceeded. The varieties differ (variety 4 is best, mean $16.8$), and so do the blocks.',
        },
        {
          type: 'choice',
          eyebrow: 'Quick one',
          prompt: 'The critical value for the treatments in a one-way ANOVA with $k = 3$ groups and $n = 12$ observations is',
          options: [
            { text: '$F_{0.05}(2, 9) = 4.26$', correct: true, why: 'Numerator df $k - 1 = 2$, denominator df $n - k = 9$.' },
            { text: '$F_{0.05}(9, 2) = 19.38$', why: 'The order matters: numerator df first.' },
            { text: '$F_{0.05}(3, 12)$', why: 'Use $k - 1$ and $n - k$.' },
            { text: '$\\chi^2_{0.05}(2) = 5.991$', why: 'ANOVA uses the $F$ table.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Three teaching methods were tried on students grouped into four ability blocks, one student per method per block. (a) Is this one-way or two-way ANOVA? (b) Write a suitable model and its assumptions. (c) Outline the procedure.',
          body: '**(a)** Two-way: the rows are blocks (a second factor) and each block has exactly one value for each method, a randomised block design.\n\n**(b)** $x_{ij} = \\mu + \\alpha_j + \\beta_i + \\varepsilon_{ij}$, with $\\mu$ the overall mean, $\\alpha_j$ the method effect ($\\sum\\alpha_j = 0$), $\\beta_i$ the block effect ($\\sum\\beta_i = 0$), and errors $\\varepsilon_{ij}$ independent $N(0, \\sigma^2)$. Assumptions: normal populations, equal variances, random independent observations, no interaction between methods and blocks.\n\n**(c)** H₀: all $\\alpha_j = 0$ and H₀: all $\\beta_i = 0$. Compute $CF$, $SST$, $SSC$, $SSR$, $SSE$; fill the table (df $2$, $3$, $6$); $F_1 = \\frac{MSC}{MSE}$ against $F_{0.05}(2, 6)$, $F_2 = \\frac{MSR}{MSE}$ against $F_{0.05}(3, 6)$; conclude for methods and for blocks.',
          asides: [{ label: 'Exam tip', text: 'Results for this design: $F_1 = 42.25$ and $F_2 = 32.75$, so both methods and blocks differ (worked in the two-way lesson).' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Teaching methods. Totals $T_1 = 370$ ($n_1 = 5$), $T_2 = 260$ ($4$), $T_3 = 496$ ($6$); $T = 1126$, $n = 15$, $\\sum x^2 = 85522$. Complete the ANOVA.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: '$CF = \\frac{T^2}{n} = $ (2 d.p.)', answer: 84525.07, tol: 0.05, hint: '$\\frac{1126^2}{15}$.' },
              { ask: '$SST = \\sum x^2 - CF = $', answer: 996.93, tol: 0.05, hint: '$85522 - 84525.07$.' },
              { ask: '$SSB = \\frac{370^2}{5} + \\frac{260^2}{4} + \\frac{496^2}{6} - CF = $', answer: 757.6, tol: 0.05, hint: '$27380 + 16900 + 41002.67 - CF$.' },
              { ask: '$SSW = SST - SSB = $', answer: 239.33, tol: 0.05, hint: '$996.93 - 757.60$.' },
              { ask: '$MSB = \\frac{SSB}{k - 1} = $', answer: 378.8, tol: 0.05, hint: '$k = 3$ methods, so divide by $2$.' },
              { ask: '$MSW = \\frac{SSW}{n - k} = $ (2 d.p.)', answer: 19.94, tol: 0.02, hint: '$n - k = 15 - 3 = 12$.' },
              { ask: '$F = \\frac{MSB}{MSW} = $ (2 d.p.)', answer: 18.99, tol: 0.03, hint: '$\\frac{378.80}{19.94}$.' },
              { ask: 'With $F_{0.05}(2, 12) = 3.89$, the decision is', options: ['The methods differ', 'The methods are equal'], answer: 0, hint: 'Is $18.99$ bigger than $3.89$?' },
            ],
            after: '**Answer:** $F = 18.99 > 3.89$: reject H₀; method 3 (mean $82.7$) looks best.',
          },
        },
        {
          type: 'finish',
          title: 'Chapter 5 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
