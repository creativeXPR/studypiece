// STA 221 · Hypothesis Testing · Exam practice: worked exam-style questions on chapter 3.
export default {
  id: 'exam-testing',
  title: 'Exam practice: hypothesis testing',
  covers: 'Exam-style questions: definitions, Type I and II errors in words, power, z tests for a mean, a proportion, two means and two proportions, one- versus two-tailed conclusions',
  minutes: 14,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['Write-up', 'Hypotheses → level and critical value → statistic → decision → conclusion in context.'],
        ['Tails', '"Differ", "changed" → two tails. "More", "higher", "exceeds" → right. "Less", "below" → left.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'Define: simple and composite hypotheses; null and alternative hypotheses; Type I and Type II errors; power of a test; critical region.',
          body: '**Simple hypothesis:** fixes the parameter at one value ($\\theta = \\theta_0$). **Composite:** does not ($\\theta > \\theta_0$, $\\theta \\ne \\theta_0$).\n**Null H₀:** the "no effect" claim. **Alternative H₁:** what holds if there is an effect.\n**Type I error:** rejecting H₀ when it is true (probability $\\alpha$). **Type II error:** accepting H₀ when it is false (probability $\\beta$).\n**Power:** $1 - \\beta$, the probability of rejecting a false H₀.\n**Critical region:** the set of values of the test statistic for which H₀ is rejected; its size is $\\alpha$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'A firm claims its rice bags weigh $80$ kg on average, $\\sigma = 12$ kg. $49$ bags average $83.6$ kg. Test the claim at (a) $5\\%$, (b) $1\\%$.',
          body: '**1.** H₀: $\\mu = 80$, H₁: $\\mu \\ne 80$.\n**2.** Critical values $\\pm 1.96$ ($5\\%$), $\\pm 2.58$ ($1\\%$).\n**3.** $z = \\frac{83.6 - 80}{12/7} = \\frac{3.6}{1.7143} = 2.10$.\n**4.** (a) $2.10 > 1.96$: reject H₀. (b) $2.10 < 2.58$: accept H₀.\n**5.** At $5\\%$ the mean weight is not $80$ kg; at $1\\%$ the evidence is not strong enough to say so.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'School A: $n = 60$, mean $68$, $s = 10$. School B: $n = 50$, mean $64$, $s = 12$. (a) Is there a difference? (b) Is A higher? Explain why the answers can differ.',
          body: 'SE $= \\sqrt{\\frac{100}{60} + \\frac{144}{50}} = 2.1323$, $z = \\frac{4}{2.1323} = 1.88$.\n\n**(a)** H₁: $\\mu_A \\ne \\mu_B$: $1.88 < 1.96$, accept H₀.\n**(b)** H₁: $\\mu_A > \\mu_B$: $1.88 > 1.645$, reject H₀; A is higher.\n\nA one-tailed test puts all $5\\%$ in one tail, so its critical value ($1.645$) is smaller than the two-tailed one ($1.96$). A $z$ between them is significant one way but not the other.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Town P: $45$ of $150$ prefer brand X. Town Q: $30$ of $150$. At $5\\%$, do the proportions differ?',
          options: [
            { text: 'Yes: pooled $\\bar p = 0.25$, SE $= 0.05$, $z = 2.00 > 1.96$', correct: true, why: 'Reject H₀: $p_P = p_Q$.' },
            { text: 'No: $z = 1.00 < 1.96$', why: 'SE $= \\sqrt{0.25 \\times 0.75 \\times \\frac{2}{150}} = 0.05$, so $z = \\frac{0.10}{0.05} = 2$.' },
            { text: 'Yes: $z = 15$', why: 'Work with proportions ($0.30$ and $0.20$), not counts.' },
            { text: 'No: $z = 2.00 < 2.58$', why: '$2.58$ is the $1\\%$ value; the test is at $5\\%$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'A supplier claims **at most** $10\\%$ defective; $39$ of $300$ are defective. At $5\\%$:',
          options: [
            { text: 'H₁: $p > 0.1$; $z = 1.73 > 1.645$; the defective rate exceeds $10\\%$', correct: true, why: '$\\hat p = 0.13$, SE $= 0.01732$.' },
            { text: 'H₁: $p \\ne 0.1$; $z = 1.73 < 1.96$; accept the claim', why: 'The claim is one-sided.' },
            { text: 'H₁: $p > 0.1$; $z = 1.73 < 1.96$; accept', why: 'One-tailed at $5\\%$ uses $1.645$.' },
            { text: 'H₁: $p < 0.1$; reject', why: 'Fewer defectives would support the claim, not break it.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Give four applications of hypothesis testing, stating the test used in each.',
          body: '**1. A population mean:** is a machine still filling $500$ ml? $z = \\frac{\\bar x - \\mu_0}{\\sigma/\\sqrt n}$.\n**2. Two means or two proportions:** do two schools, or two towns, differ? $z$ test for a difference.\n**3. A variance:** has a process become less consistent? $\\chi^2 = \\frac{(n - 1)s^2}{\\sigma_0^2}$.\n**4. Counts:** is a die fair, or are opinion and gender related? $\\chi^2$ goodness of fit or independence.\n**5. Several means:** do three fertilisers give the same mean yield? ANOVA $F$ test.\n\nIn every case: hypotheses, level and critical value, test statistic, decision, conclusion in context.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A firm claims its rice bags average $80$ kg, $\\sigma = 12$. A sample of $49$ has mean $83.6$ kg. Test the claim at $5\\%$, then at $1\\%$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Step 1: the alternative hypothesis is', options: ['$\\mu \\ne 80$', '$\\mu > 80$', '$\\mu < 80$'], answer: 0, hint: 'The claim is tested either way: "is it $80$?"' },
              { ask: 'SE $= \\frac{12}{\\sqrt{49}} = $ (4 d.p.)', answer: 1.7143, tol: 0.0005, hint: '$\\sqrt{49} = 7$.' },
              { ask: '$z = \\frac{83.6 - 80}{\\text{SE}} = $ (2 d.p.)', answer: 2.1, tol: 0.006, hint: '$\\frac{3.6}{1.7143}$.' },
              { ask: 'Critical value at $5\\%$ (two-tailed): $\\pm$', answer: 1.96, tol: 0.001, hint: 'Two tails, $2.5\\%$ each.' },
              { ask: 'Decision at $5\\%$', options: ['Reject H₀', 'Accept H₀'], answer: 0, hint: 'Is $2.10$ beyond $1.96$?' },
              { ask: 'At $1\\%$ the critical value is $2.58$. Decision', options: ['Reject H₀', 'Accept H₀'], answer: 1, hint: 'Is $2.10$ beyond $2.58$?' },
            ],
            after: '**Conclusion:** at $5\\%$ the mean weight is not $80$ kg; at $1\\%$ the evidence is not strong enough.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Town P: $45$ of $150$ prefer brand X. Town Q: $30$ of $150$. Do the proportions differ? ($5\\%$)',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: '$\\hat p_P - \\hat p_Q = $', answer: 0.1, hint: '$0.30 - 0.20$.' },
              { ask: 'Pooled $\\bar p = \\frac{x_1 + x_2}{n_1 + n_2} = $', answer: 0.25, hint: '$\\frac{45 + 30}{300}$.' },
              { ask: 'SE $= \\sqrt{\\bar p\\bar q\\left(\\frac{1}{150} + \\frac{1}{150}\\right)} = $', answer: 0.05, tol: 0.0005, hint: '$\\sqrt{0.25 \\times 0.75 \\times \\frac{2}{150}}$.' },
              { ask: '$z = $', answer: 2, tol: 0.01, hint: '$\\frac{0.10}{0.05}$.' },
              { ask: 'Decision', options: ['Reject H₀: they differ', 'Accept H₀'], answer: 0, hint: 'Compare $2.00$ with $1.96$.' },
            ],
            after: '**Answer:** $z = 2.00 > 1.96$: the proportions differ.',
          },
        },
        {
          type: 'finish',
          title: 'Chapter 3 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
