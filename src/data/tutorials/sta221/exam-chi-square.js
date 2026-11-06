// STA 221 · Chi-Square · Exam practice: worked exam-style questions on chapter 4.
export default {
  id: 'exam-chi-square',
  title: 'Exam practice: chi-square',
  covers: 'Exam-style questions: properties and conditions, table values, goodness of fit to a ratio, independence, Yates’ correction, the variance test, homogeneity',
  minutes: 16,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['Which df?', 'Variance: $n - 1$. Goodness of fit: $k - 1 - m$. Tables: $(r - 1)(c - 1)$.'],
        ['Percentages?', 'Convert back to counts before computing $\\chi^2$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: '(a) State five properties of the χ² distribution and five conditions for the χ² test. (b) For $10$ df give the mean, variance and the value with $5\\%$ to its right.',
          body: '**(a) Properties:** never negative; skewed to the right; one curve for each df; mean $\\nu$ and variance $2\\nu$; approaches the normal for large df ($\\ge 30$). (Also: additive.)\n\n**Conditions (RICE-5):** random sample; independent observations; raw counts, not percentages; mutually exclusive and exhaustive categories; every expected frequency at least $5$.\n\n**(b)** Mean $10$, variance $20$, $\\chi^2_{0.05}(10) = 18.307$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'Opinion by gender: Male: Agree $60$, Neutral $25$, Disagree $15$; Female: $40$, $35$, $25$. Is opinion independent of gender? ($5\\%$)',
          body: '**1.** H₀: opinion is independent of gender.\n**2.** Expected: $\\frac{100 \\times 100}{200} = 50$, $\\frac{100 \\times 60}{200} = 30$, $\\frac{100 \\times 40}{200} = 20$ in both rows.\n**3.** $\\chi^2 = 2\\left(\\frac{10^2}{50} + \\frac{5^2}{30} + \\frac{5^2}{20}\\right) = 2(2 + 0.833 + 1.25) = 8.167$.\n**4.** df $= (2 - 1)(3 - 1) = 2$, $\\chi^2_{0.05}(2) = 5.991$. $8.167 > 5.991$: reject H₀.\n**5.** Opinion depends on gender.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Travel to campus, $100$ students from each of three faculties. Science: bus $45$, walk $35$, car $20$; Arts: $30, 40, 30$; Law: $25, 25, 50$. Every $E = 33.33$ and $\\chi^2 = 24.0$. The test and decision are',
          options: [
            { text: 'Homogeneity, df $= 4$, $24.0 > 9.488$: the patterns differ', correct: true, why: 'Three separate samples compared: homogeneity. df $= (3 - 1)(3 - 1) = 4$.' },
            { text: 'Goodness of fit, df $= 8$: the patterns agree', why: 'Several samples compared across categories is homogeneity, with df $= (r - 1)(c - 1)$.' },
            { text: 'Homogeneity, df $= 2$, reject', why: 'There are $3$ rows **and** $3$ columns: df $= 2 \\times 2$.' },
            { text: 'Independence, $24.0 < 26.2$: accept', why: 'Use $\\chi^2_{0.05}(4) = 9.488$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Of $30$ patients given a treatment, $18$ recovered; of $30$ given a placebo, $7$ recovered. Use Yates’ correction. What is the uncorrected value?',
          body: 'Table: treatment $18$ / $12$; placebo $7$ / $23$. Column totals $25$ and $35$; $n = 60$.\n$E = 12.5$ and $17.5$ in each row; every $|O - E| = 5.5$.\n$$\\chi^2_{\\text{Yates}} = 5^2\\left(\\tfrac{2}{12.5} + \\tfrac{2}{17.5}\\right) = 6.857.$$\nShortcut: $\\frac{60(|18 \\times 23 - 12 \\times 7| - 30)^2}{30 \\times 30 \\times 25 \\times 35} = \\frac{60 \\times 300^2}{787{,}500} = 6.857$ ✓.\n$6.857 > 3.841$: recovery is related to treatment. Uncorrected: $5.5^2(0.2743) = 8.297$.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Seeds should be in the ratio $9 : 3 : 3 : 1$; $160$ seeds give $95, 25, 28, 12$. With $\\chi^2 = 1.644$:',
          options: [
            { text: 'df $= 3$, $1.644 < 7.815$: the data agree with the ratio', correct: true, why: '$k - 1 = 3$; nothing estimated from the data.' },
            { text: 'df $= 4$, accept', why: 'df $= k - 1 = 3$.' },
            { text: 'df $= 3$, reject', why: '$1.644$ is far below $7.815$.' },
            { text: 'df $= 159$, accept', why: 'df depends on the number of categories, not the number of seeds.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'The variance of a process should be $16$. $25$ measurements give $s^2 = 26.5$. Has the variance increased? State the assumption.',
          body: '**Assumption:** the measurements come from a normal population.\nH₀: $\\sigma^2 = 16$, H₁: $\\sigma^2 > 16$.\n$$\\chi^2 = \\frac{24 \\times 26.5}{16} = 39.75, \\quad \\text{df} = 24, \\quad \\chi^2_{0.05}(24) = 36.415.$$\n$39.75 > 36.415$: reject H₀. The variance has increased.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Seeds should come in the ratio $9 : 3 : 3 : 1$. In $160$ seeds: $95, 25, 28, 12$. Test the ratio at $5\\%$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Expected count for the first type $= 160 \\times \\frac{9}{16} = $', answer: 90, hint: 'Each part of the ratio is $\\frac{160}{16} = 10$ seeds.' },
              { ask: 'Expected count for the last type $= $', answer: 10, hint: '$160 \\times \\frac{1}{16}$.' },
              { ask: '$\\chi^2 = \\frac{5^2}{90} + \\frac{5^2}{30} + \\frac{2^2}{30} + \\frac{2^2}{10} = $ (3 d.p.)', answer: 1.644, tol: 0.004, hint: '$0.278 + 0.833 + 0.133 + 0.400$.' },
              { ask: 'Degrees of freedom $= $', answer: 3, tol: 0, hint: '$k - 1$ with $k = 4$ categories.' },
              { ask: 'Table value $\\chi^2_{0.05}(3) = $', answer: 7.815, tol: 0.002, hint: 'From the $\\chi^2$ table, $3$ df, $5\\%$.' },
              { ask: 'Decision', options: ['The data agree with $9 : 3 : 3 : 1$', 'The data do not fit the ratio'], answer: 0, hint: 'Is $1.644$ bigger than $7.815$?' },
            ],
            after: '**Answer:** $1.644 < 7.815$: accept H₀.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Opinion by gender. Male: agree $60$, neutral $25$, disagree $15$. Female: $40$, $35$, $25$. Is opinion independent of gender? ($5\\%$)',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Expected male–agree $= \\frac{100 \\times 100}{200} = $', answer: 50, hint: 'Row total × column total ÷ grand total; the agree column totals $100$.' },
              { ask: 'Expected male–neutral $= $', answer: 30, hint: 'Neutral column total is $60$: $\\frac{100 \\times 60}{200}$.' },
              { ask: '$\\chi^2$ over all six cells $= $ (3 d.p.)', answer: 8.167, tol: 0.005, hint: 'Each row gives $\\frac{10^2}{50} + \\frac{5^2}{30} + \\frac{5^2}{20} = 4.083$; there are two rows.' },
              { ask: 'Degrees of freedom $= $', answer: 2, tol: 0, hint: '$(r - 1)(c - 1) = (2 - 1)(3 - 1)$.' },
              { ask: 'With $\\chi^2_{0.05}(2) = 5.991$, the decision is', options: ['Opinion depends on gender', 'Opinion is independent of gender'], answer: 0, hint: 'Is $8.167$ bigger than $5.991$?' },
            ],
            after: '**Answer:** $8.167 > 5.991$: reject independence.',
          },
        },
        {
          type: 'finish',
          title: 'Chapter 4 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
