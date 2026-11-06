// STA 221 · Mock Exam: six written questions across the course on a 60-minute clock. For each:
// the question (answer it on paper), a step check of the key numbers, then a model answer with the
// points that earn marks.

const question = (n, text, note) => ({ type: 'story', eyebrow: 'Mock exam', title: `Question ${n}`, body: `${text}\n\n${note}\n\nWrite your full answer on paper, then check it.`, cta: 'Check my answer' });
const check = (steps) => ({ type: 'custom', widget: 'calc', eyebrow: 'Check the key numbers', title: 'Enter your answers step by step', graph: { clock: true, steps } });
const model = (title, body) => ({ type: 'story', eyebrow: 'Model answer', title, body });

export default {
  id: 'mock-exam',
  title: 'Mock exam',
  covers: 'Six exam-style written questions covering sampling, estimation, hypothesis testing, chi-square, ANOVA and regression, on a 60-minute clock, with step checks and model answers',
  minutes: 60,
  sections: [
    {
      name: 'Before you start',
      terms: [
        ['Exam method', 'Write the formula, substitute, compute, then conclude in words. Most marks are for method.'],
        ['Checks', 'Probabilities lie between $0$ and $1$; $\\chi^2$, SS and $F$ are never negative; $|r| \\le 1$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Mock exam',
          title: 'Six questions, one hour, like the real thing',
          body: 'This mock covers the whole course. For each question:\n\n**1.** Read it and answer it **on paper**, with full working, as in the exam. No peeking at the lessons.\n\n**2.** Enter your key numbers step by step to check them.\n\n**3.** Compare with the **model answer** and its marking points.\n\nYou will need the $z$, $\\chi^2$ and $F$ values given in each question. Aim to finish within **60 minutes**.',
          asides: [{ label: 'Exam tip', text: 'Do the question you are surest of first, but keep an eye on the clock. A complete method with a small slip earns far more than a perfect half-answer.' }],
        },
        { type: 'custom', widget: 'mockClock', eyebrow: 'Ready?', title: 'Start the clock' },
        { type: 'bridge', title: 'Clock running.', recap: ['Answer on paper first.', 'Then check the numbers and read the model answer.'], why: 'Question 1 is next.' },
      ],
    },
    {
      name: 'Questions 1–2',
      terms: [
        ['Finite population SE', '$\\frac{\\sigma}{\\sqrt n}\\sqrt{\\frac{N - n}{N - 1}}$.'],
        ['Interval for p', '$\\hat p \\pm z\\sqrt{\\frac{\\hat p\\hat q}{n}}$.'],
      ],
      screens: [
        question(1, '(a) Define a parameter, a statistic and the standard error.\n\n(b) State the Central Limit Theorem.\n\n(c) A department’s $300$ students have mean score $68$, $\\sigma = 15$. A sample of $36$ is drawn without replacement. Find $P(\\bar X > 72)$. (Use $\\Phi(1.70) = 0.9554$.)', 'Sampling was without replacement from a finite population.'),
        check([
          { ask: 'SE without the correction, $\\frac{15}{\\sqrt{36}} = $', answer: 2.5, hint: '$\\sqrt{36} = 6$.' },
          { ask: 'Correction factor $\\sqrt{\\frac{300 - 36}{300 - 1}} = $ (4 d.p.)', answer: 0.9397, tol: 0.0005, hint: '$\\sqrt{\\frac{264}{299}}$.' },
          { ask: 'SE with the correction $= $ (4 d.p.)', answer: 2.3491, tol: 0.001, hint: '$2.5 \\times 0.9397$.' },
          { ask: '$z = \\frac{72 - 68}{\\text{SE}} = $ (2 d.p.)', answer: 1.7, tol: 0.006, hint: '$\\frac{4}{2.3491}$.' },
          { ask: '$P(\\bar X > 72) = $', answer: 0.0446, tol: 0.0005, hint: '"More than" is the right tail: $1 - \\Phi(1.70)$.' },
        ]),
        model('Question 1', '**(a)** A **parameter** is a number describing the population (e.g. $\\mu$, $\\sigma$, $p$): fixed but usually unknown. A **statistic** is a function of the sample values containing no unknown parameters (e.g. $\\bar x$, $s$, $\\hat p$). The **standard error** is the standard deviation of a statistic’s sampling distribution; for $\\bar X$ it is $\\frac{\\sigma}{\\sqrt n}$.\n\n**(b)** For large $n$ (about $30$ or more), the sampling distribution of the sample mean is approximately normal with mean $\\mu$ and variance $\\frac{\\sigma^2}{n}$, whatever the shape of the population.\n\n**(c)** Finite population, without replacement: SE $= \\frac{15}{6}\\sqrt{\\frac{264}{299}} = 2.3491$. $z = \\frac{72 - 68}{2.3491} = 1.70$. $P(\\bar X > 72) = 1 - 0.9554 = 0.0446$.\n\n**Marks for:** each definition; all three parts of the CLT; the correction factor; $z$; the right tail.'),
        question(2, '(a) Show that $\\bar X$ is an unbiased estimator of $\\mu$.\n\n(b) A sample of $64$ has $\\bar x = 42.5$ and $s = 9.6$. Find a $99\\%$ confidence interval for $\\mu$.\n\n(c) $132$ of $300$ students say they study at night. Find a $95\\%$ confidence interval for the proportion.', 'Critical values: $95\\% \\to 1.96$, $99\\% \\to 2.58$.'),
        check([
          { ask: '(b) SE $= \\frac{9.6}{\\sqrt{64}} = $', answer: 1.2, hint: '$\\sqrt{64} = 8$.' },
          { ask: '(b) Margin $= 2.58 \\times \\text{SE} = $', answer: 3.096, tol: 0.002, hint: '$2.58 \\times 1.2$.' },
          { ask: '(b) Lower limit $= $', answer: 39.4, tol: 0.006, hint: '$42.5 - 3.096$.' },
          { ask: '(b) Upper limit $= $', answer: 45.6, tol: 0.006, hint: '$42.5 + 3.096$.' },
          { ask: '(c) $\\hat p = $', answer: 0.44, hint: '$\\frac{132}{300}$.' },
          { ask: '(c) SE $= \\sqrt{\\frac{\\hat p\\hat q}{n}} = $ (4 d.p.)', answer: 0.0287, tol: 0.0002, hint: '$\\sqrt{\\frac{0.44 \\times 0.56}{300}}$.' },
          { ask: '(c) Lower limit $= $ (3 d.p.)', answer: 0.384, tol: 0.002, hint: '$0.44 - 1.96 \\times 0.0287$.' },
          { ask: '(c) Upper limit $= $ (3 d.p.)', answer: 0.496, tol: 0.002, hint: '$0.44 + 1.96 \\times 0.0287$.' },
        ]),
        model('Question 2', '**(a)** $E(\\bar X) = E\\left(\\frac1n\\sum X_i\\right) = \\frac1n\\sum E(X_i) = \\frac1n(n\\mu) = \\mu$, so $\\bar X$ is unbiased.\n\n**(b)** SE $= \\frac{9.6}{8} = 1.2$; $42.5 \\pm 2.58(1.2) = 42.5 \\pm 3.096 = (39.40, 45.60)$. We are $99\\%$ confident that $\\mu$ lies between $39.40$ and $45.60$.\n\n**(c)** $\\hat p = 0.44$, SE $= \\sqrt{\\frac{0.44 \\times 0.56}{300}} = 0.0287$; $0.44 \\pm 1.96(0.0287) = 0.44 \\pm 0.056 = (0.384, 0.496)$.\n\n**Marks for:** the expectation steps; the right critical value; SE; the interval in words.'),
        { type: 'bridge', title: 'Two down.', recap: ['Sampling and estimation done.'], why: 'Next: testing and χ².' },
      ],
    },
    {
      name: 'Questions 3–4',
      terms: [
        ['Five steps', 'Hypotheses → level and critical value → statistic → decision → conclusion.'],
        ['Expected count', '$E = \\frac{RC}{G}$; df $= (r - 1)(c - 1)$.'],
      ],
      screens: [
        question(3, '(a) Define Type I and Type II errors and the power of a test.\n\n(b) A manufacturer claims its components last $50$ hours on average, $\\sigma = 8$. A sample of $64$ lasts $48.2$ hours on average. Test the claim at $5\\%$ (i) against $\\mu \\ne 50$; (ii) against $\\mu < 50$.', 'Critical values at $5\\%$: two-tailed $\\pm 1.96$, one-tailed $-1.645$.'),
        check([
          { ask: 'SE $= \\frac{8}{\\sqrt{64}} = $', answer: 1, hint: '$\\sqrt{64} = 8$.' },
          { ask: '$z = \\frac{48.2 - 50}{\\text{SE}} = $', answer: -1.8, tol: 0.006, hint: 'Observed minus claimed, over the SE.' },
          { ask: '(i) Two-tailed decision', options: ['Reject H₀', 'Accept H₀'], answer: 1, hint: 'Is $|-1.80|$ bigger than $1.96$?' },
          { ask: '(ii) One-tailed decision (H₁: $\\mu < 50$)', options: ['Reject H₀', 'Accept H₀'], answer: 0, hint: 'Is $-1.80$ below $-1.645$?' },
        ]),
        model('Question 3', '**(a)** **Type I error:** rejecting H₀ when it is true (probability $\\alpha$). **Type II error:** accepting H₀ when it is false (probability $\\beta$). **Power:** $1 - \\beta$, the probability of rejecting a false H₀.\n\n**(b)** H₀: $\\mu = 50$. SE $= 1$, $z = -1.80$.\n**(i)** H₁: $\\mu \\ne 50$: $|-1.80| < 1.96$, accept H₀. The data are consistent with $50$ hours.\n**(ii)** H₁: $\\mu < 50$: $-1.80 < -1.645$, reject H₀. There is evidence the components last less than $50$ hours.\n\nThe one-tailed test puts all $5\\%$ in one tail, so its critical value is closer to $0$.\n\n**Marks for:** hypotheses; $z$; each critical value; each decision **in words**.'),
        question(4, 'Preferred subject by gender. Male: Maths $40$, Physics $30$, Chemistry $30$. Female: Maths $25$, Physics $35$, Chemistry $40$. Test at $5\\%$ whether subject preference depends on gender. ($\\chi^2_{0.05}(2) = 5.991$)', 'Find the expected counts first.'),
        check([
          { ask: 'Expected male–Maths $= \\frac{100 \\times 65}{200} = $', answer: 32.5, hint: 'Maths column total: $40 + 25 = 65$.' },
          { ask: 'Expected male–Chemistry $= $', answer: 35, hint: 'Chemistry column total: $30 + 40 = 70$.' },
          { ask: '$\\chi^2$ over all six cells $= $ (3 d.p.)', answer: 5.275, tol: 0.006, hint: 'Each row gives $\\frac{7.5^2}{32.5} + \\frac{2.5^2}{32.5} + \\frac{5^2}{35} = 2.637$.' },
          { ask: 'Degrees of freedom', answer: 2, tol: 0, hint: '$(2 - 1)(3 - 1)$.' },
          { ask: 'Decision', options: ['Preference depends on gender', 'No significant evidence of a relationship'], answer: 1, hint: 'Is $5.275$ bigger than $5.991$?' },
        ]),
        model('Question 4', 'H₀: subject preference is independent of gender.\n\nExpected (both rows): $32.5$, $32.5$, $35$.\n$$\\chi^2 = 2\\left(\\frac{7.5^2}{32.5} + \\frac{2.5^2}{32.5} + \\frac{5^2}{35}\\right) = 2(1.731 + 0.192 + 0.714) = 5.275.$$\ndf $= 2$; $5.275 < 5.991$: accept H₀. There is no significant evidence, at $5\\%$, that subject preference depends on gender.\n\n**Marks for:** the $E$ table; each $\\frac{(O - E)^2}{E}$; df; the decision in words.'),
        { type: 'bridge', title: 'Four down.', recap: ['Testing and χ² done.'], why: 'Last: ANOVA and regression.' },
      ],
    },
    {
      name: 'Questions 5–6',
      terms: [
        ['ANOVA short-cut', '$CF = \\frac{T^2}{n}$, $SST = \\sum x^2 - CF$, $SSB = \\sum\\frac{T_j^2}{n_j} - CF$.'],
        ['Regression', '$\\beta = \\frac{n\\sum xy - \\sum x\\sum y}{n\\sum x^2 - (\\sum x)^2}$, $\\alpha = \\bar y - \\beta\\bar x$.'],
      ],
      screens: [
        question(5, 'Yields under three treatments. A: $12, 15, 14, 13$. B: $18, 17, 20, 19$. C: $14, 16, 15$.\n\n(a) State the model and assumptions.\n\n(b) Test at $5\\%$ whether the treatment means are equal. ($F_{0.05}(2, 8) = 4.46$)', '$\\sum x^2 = 2785$.'),
        check([
          { ask: 'Grand total $T = $', answer: 173, tol: 0, hint: '$54 + 74 + 45$.' },
          { ask: '$CF = \\frac{T^2}{n} = $ (2 d.p.)', answer: 2720.82, tol: 0.02, hint: '$\\frac{173^2}{11}$.' },
          { ask: '$SST = $ (2 d.p.)', answer: 64.18, tol: 0.02, hint: '$2785 - 2720.82$.' },
          { ask: '$SSB = \\frac{54^2}{4} + \\frac{74^2}{4} + \\frac{45^2}{3} - CF = $ (2 d.p.)', answer: 52.18, tol: 0.02, hint: '$729 + 1369 + 675 - 2720.82$.' },
          { ask: '$SSW = $', answer: 12, tol: 0.02, hint: '$SST - SSB$.' },
          { ask: '$F = \\frac{SSB/2}{SSW/8} = $ (2 d.p.)', answer: 17.39, tol: 0.03, hint: '$\\frac{26.09}{1.5}$.' },
          { ask: 'Decision', options: ['The treatment means differ', 'The treatment means are equal'], answer: 0, hint: 'Is $17.39$ bigger than $4.46$?' },
        ]),
        model('Question 5', '**(a)** One-way model: $x_{ij} = \\mu + \\alpha_j + \\varepsilon_{ij}$, with errors independent $N(0, \\sigma^2)$. Assumptions: normal populations, equal variances, random independent samples. H₀: all $\\alpha_j = 0$ (equal means).\n\n**(b)** $T = 173$, $n = 11$, $CF = 2720.82$, $SST = 64.18$, $SSB = 52.18$, $SSW = 12.00$.\nBetween: df $2$, MS $26.09$. Within: df $8$, MS $1.50$. $F = 17.39$.\n$17.39 > 4.46$: reject H₀. The treatment means are not all equal (B, mean $18.5$, is highest).\n\n**Marks for:** the model and assumptions; $CF$; each SS; the table; the decision in words.'),
        question(6, 'For $8$ pairs: $\\sum x = 40$, $\\sum y = 96$, $\\sum xy = 540$, $\\sum x^2 = 240$, $\\sum y^2 = 1280$.\n\n(a) Find the regression line of $y$ on $x$.\n\n(b) Find $r$ and comment.\n\n(c) Estimate $y$ at $x = 6$.', 'Use the shared numerator.'),
        check([
          { ask: '$n\\sum xy - \\sum x\\sum y = $', answer: 480, tol: 0, hint: '$8(540) - 40(96)$.' },
          { ask: '$n\\sum x^2 - (\\sum x)^2 = $', answer: 320, tol: 0, hint: '$8(240) - 40^2$.' },
          { ask: '$\\beta = $', answer: 1.5, hint: '$\\frac{480}{320}$.' },
          { ask: '$\\alpha = \\bar y - \\beta\\bar x = $', answer: 4.5, hint: '$\\bar y = 12$, $\\bar x = 5$.' },
          { ask: '$r = \\frac{480}{\\sqrt{320 \\times 1024}} = $ (3 d.p.)', answer: 0.839, tol: 0.002, hint: '$n\\sum y^2 - (\\sum y)^2 = 10240 - 9216 = 1024$.' },
          { ask: '$\\hat y$ at $x = 6$: ', answer: 13.5, hint: '$4.5 + 1.5 \\times 6$.' },
        ]),
        model('Question 6', '**(a)** $\\beta = \\frac{8(540) - 40(96)}{8(240) - 40^2} = \\frac{480}{320} = 1.5$; $\\alpha = 12 - 1.5(5) = 4.5$: $\\hat y = 4.5 + 1.5x$.\n\n**(b)** $r = \\frac{480}{\\sqrt{320 \\times 1024}} = 0.839$: a strong positive linear relationship; $r^2 = 0.70$, so about $70\\%$ of the variation in $y$ is explained by $x$.\n\n**(c)** $\\hat y = 4.5 + 1.5(6) = 13.5$.\n\n**Marks for:** the sums; $\\beta$ then $\\alpha$; $r$ with direction **and** strength; the prediction.'),
        {
          type: 'story',
          eyebrow: 'Done',
          title: 'How did it go?',
          body: 'Go back over any step you got wrong or had to be shown: each one points to the lesson to revisit. When you can do all six on time, you are ready.\n\nFor timed practice in the exam format, take the **Exam focus** set in Practice (it is timed, one minute per question by default).',
        },
        { type: 'finish', title: 'Mock exam: done.', body: 'Formulas used:' },
      ],
    },
  ],
};
