// STA 221 · Estimation · Exam practice: worked exam-style questions on chapter 2.
export default {
  id: 'exam-estimation',
  title: 'Exam practice: estimation',
  covers: 'Exam-style questions: confidence intervals from grouped data with and without the fpc, proportion probabilities, sample size for a proportion, comparing estimators, the Poisson MVUE',
  minutes: 16,
  sections: [
    {
      name: 'Intervals and proportions',
      terms: [
        ['Grouped data', '$\\bar x = \\frac{\\sum fx}{\\sum f}$, $s^2 = \\frac{\\sum f(x - \\bar x)^2}{n - 1}$ with class mid-points.'],
        ['Safe sample size', '$p = 0.5$ gives the largest $pq = 0.25$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'Heights of $100$ male students: $150$–$154$: $6$; $155$–$159$: $14$; $160$–$164$: $40$; $165$–$169$: $28$; $170$–$174$: $12$. (a) Unbiased estimates of the mean and variance. (b) $95\\%$ and $99\\%$ intervals. (c) Redo the $95\\%$ interval if there are only $800$ students, sampled without replacement.',
          body: '**(a)** Mid-points $152, 157, 162, 167, 172$; $\\sum fx = 16330$, so $\\bar x = 163.3$ cm. $\\sum f(x - \\bar x)^2 = 2681.0$, so $s^2 = \\frac{2681.0}{99} = 27.08$ and $s = 5.204$.\n\n**(b)** SE $= \\frac{5.204}{10} = 0.5204$.\n$95\\%$: $163.3 \\pm 1.020 = (162.28, 164.32)$. $99\\%$: $163.3 \\pm 1.343 = (161.96, 164.64)$.\n\n**(c)** SE $= 0.5204\\sqrt{\\frac{700}{799}} = 0.4871$: $163.3 \\pm 0.955 = (162.35, 164.25)$, slightly narrower.',
          asides: [{ label: 'Exam tip', text: '"Unbiased estimate of the variance" means divide by $n - 1$ ($99$ here), not $n$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: '$45\\%$ of a college’s students use the library daily. Sample of $120$. (a) $P$(at least $50\\%$ of the sample do)? (b) Repeat if the college has $1{,}500$ students, sampled without replacement.',
          body: '**(a)** SE $= \\sqrt{\\frac{0.45 \\times 0.55}{120}} = 0.04541$; $z = \\frac{0.05}{0.04541} = 1.10$; $P = 1 - 0.8643 = 0.1357$.\n\n**(b)** SE $= 0.04541\\sqrt{\\frac{1380}{1499}} = 0.04358$; $z = 1.15$; $P = 1 - 0.8749 = 0.1251$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Estimate a proportion to within $\\pm 0.04$ with $95\\%$ confidence. (a) Nothing known about $p$. (b) A pilot suggests $p \\approx 0.2$. (c) Why is (a) "safe"?',
          body: '**(a)** $n = \\frac{1.96^2(0.5)(0.5)}{0.04^2} = 600.25 \\Rightarrow 601$.\n**(b)** $n = \\frac{1.96^2(0.2)(0.8)}{0.04^2} = 384.16 \\Rightarrow 385$.\n**(c)** $pq$ is largest at $p = 0.5$, so (a) is big enough whatever $p$ turns out to be.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: '$25\\%$ of a city’s cars are over $10$ years old. Two samples of $80$. $P$(the proportions differ by more than $0.1$) is (SE $= 0.06847$, $\\Phi(1.46) = 0.9279$)',
          options: [
            { text: '$0.1442$', correct: true, why: '$z = \\frac{0.1}{0.06847} = 1.46$; two tails: $2(1 - 0.9279)$.' },
            { text: '$0.0721$', why: '"Differ by" is two-tailed.' },
            { text: '$0.8558$', why: 'That is the chance they differ by **less** than $0.1$.' },
            { text: '$0.0384$', why: 'That uses the SE of one proportion. A difference has SE $\\sqrt{pq\\left(\\frac1{80} + \\frac1{80}\\right)}$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Intervals: practised.',
          recap: ['Grouped data: mid-points, divisor $n - 1$.', 'The fpc narrows the interval.'],
          why: 'Now the theory questions on estimators.',
        },
      ],
    },
    {
      name: 'Estimator questions',
      terms: [
        ['Weighted estimator', 'Unbiased ⇔ weights add to $1$; variance $= \\sigma^2\\sum w_i^2$.'],
        ['MVUE check', 'Unbiased and variance equal to the Cramér–Rao bound.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Define estimation, estimator and estimate. Show that $\\bar X$ is an unbiased estimator of $\\mu$ but $S^2 = \\frac1n\\sum(X_i - \\bar X)^2$ is not an unbiased estimator of $\\sigma^2$.',
          body: '**Estimation:** using a statistic from a sample to estimate a population parameter. **Estimator:** the rule (a function of the sample, so a random variable), e.g. $\\bar X$. **Estimate:** the value it gives for one sample, e.g. $\\bar x = 25$.\n\n**Mean.** $E(\\bar X) = \\frac1n\\sum E(X_i) = \\frac1n(n\\mu) = \\mu$: unbiased.\n\n**Variance.** $\\sum(X_i - \\bar X)^2 = \\sum(X_i - \\mu)^2 - n(\\bar X - \\mu)^2$, so\n$$E\\left[\\sum(X_i - \\bar X)^2\\right] = n\\sigma^2 - n\\cdot\\frac{\\sigma^2}{n} = (n - 1)\\sigma^2.$$\nHence $E(S^2) = \\frac{n - 1}{n}\\sigma^2 \\ne \\sigma^2$: **biased** (bias $-\\frac{\\sigma^2}{n}$). Dividing by $n - 1$ instead gives the unbiased $s^2$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 5',
          title: 'State and explain the properties of a good estimator.',
          body: '**Unbiasedness:** $E(\\hat\\theta) = \\theta$; on average it hits the parameter. ($\\bar X$ for $\\mu$.)\n**Consistency:** $\\hat\\theta_n$ gets closer to $\\theta$ as $n$ grows, e.g. unbiased with variance $\\to 0$. ($\\text{Var}(\\bar X) = \\frac{\\sigma^2}{n} \\to 0$.)\n**Efficiency:** among unbiased estimators, the smallest variance; the best reaches the Cramér–Rao bound (the MVUE).\n**Sufficiency:** it uses all the information in the sample about $\\theta$. ($\\bar X$ is sufficient for $\\mu$; $X_1$ alone is not.)',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 6',
          title: '$X_1, X_2, X_3$: mean $\\mu$, variance $\\sigma^2$. $T_1 = \\frac{X_1 + X_2}{2}$, $T_2 = \\frac{X_1 + 2X_2 + 3X_3}{6}$, $T_3 = \\frac{X_1 + X_2 + X_3}{2}$, $T_4 = \\frac{X_1 + X_2 + X_3}{3}$. Which are unbiased? Which is most efficient?',
          body: '**Unbiased:** $T_1$, $T_2$, $T_4$ (weights add to $1$). $E(T_3) = \\frac{3\\mu}{2}$: bias $\\frac\\mu2$.\n\n**Variances:** $\\text{Var}(T_1) = \\frac{\\sigma^2}{2}$; $\\text{Var}(T_2) = \\frac{1 + 4 + 9}{36}\\sigma^2 = \\frac{7\\sigma^2}{18}$; $\\text{Var}(T_3) = \\frac{3\\sigma^2}{4}$; $\\text{Var}(T_4) = \\frac{\\sigma^2}{3}$.\n\n**Most efficient:** $T_4 = \\bar X$. RE$(T_4, T_1) = 1.5$; RE$(T_4, T_2) = \\frac{7/18}{1/3} = \\frac76 \\approx 1.17$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 7',
          title: 'For a Poisson sample, $f(x; \\lambda) = \\frac{e^{-\\lambda}\\lambda^x}{x!}$: find the Cramér–Rao bound and show $\\bar X$ is the MVUE of $\\lambda$.',
          body: '$\\ln f = -\\lambda + x\\ln\\lambda - \\ln x!$\n$\\frac{\\partial}{\\partial\\lambda}\\ln f = -1 + \\frac x\\lambda$, $\\quad \\frac{\\partial^2}{\\partial\\lambda^2}\\ln f = -\\frac{x}{\\lambda^2}$.\n$$I(\\lambda) = -E\\left[-\\frac{X}{\\lambda^2}\\right] = \\frac{E(X)}{\\lambda^2} = \\frac1\\lambda, \\qquad \\text{bound} = \\frac{1}{nI(\\lambda)} = \\frac\\lambda n.$$\n$E(\\bar X) = \\lambda$ (unbiased) and $\\text{Var}(\\bar X) = \\frac\\lambda n$, which equals the bound. So $\\bar X$ is the MVUE. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Quick one',
          prompt: '$s^2 = \\frac{1}{n - 1}\\sum(X_i - \\bar X)^2$ is unbiased because',
          options: [
            { text: '$E\\left[\\sum(X_i - \\bar X)^2\\right] = (n - 1)\\sigma^2$', correct: true, why: 'So dividing by $n - 1$ gives exactly $\\sigma^2$ on average.' },
            { text: '$E\\left[\\sum(X_i - \\bar X)^2\\right] = n\\sigma^2$', why: 'That would make the divisor-$n$ version unbiased, which it is not.' },
            { text: 'the deviations add to zero', why: 'True, but that alone does not give the expectation.' },
            { text: '$\\bar X$ is unbiased', why: 'That is a separate fact; the key is $(n - 1)\\sigma^2$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A sample of $100$ has $\\bar x = 72.5$ and $s = 8$. Find the $95\\%$ confidence interval for $\\mu$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Standard error $= \\frac{s}{\\sqrt n} = $', answer: 0.8, hint: '$\\frac{8}{\\sqrt{100}}$.' },
              { ask: 'Critical value for $95\\%$: $z_{\\alpha/2} = $', answer: 1.96, tol: 0.001, hint: 'One-six-four-five, one-nine-six, two-five-eight: $95\\%$ is the middle one.' },
              { ask: 'Margin of error $E = z \\times \\text{SE} = $', answer: 1.568, tol: 0.002, hint: '$1.96 \\times 0.8$.' },
              { ask: 'Lower limit $= \\bar x - E = $', answer: 70.93, tol: 0.006, hint: '$72.5 - 1.568$.' },
              { ask: 'Upper limit $= \\bar x + E = $', answer: 74.07, tol: 0.006, hint: '$72.5 + 1.568$.' },
            ],
            after: '**Answer:** $(70.93, 74.07)$. We are $95\\%$ confident that $\\mu$ lies in this interval.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$140$ of $400$ adults smoke. Find a $95\\%$ confidence interval for the proportion of smokers.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: '$\\hat p = $', answer: 0.35, hint: '$\\frac{140}{400}$.' },
              { ask: 'SE $= \\sqrt{\\frac{\\hat p\\hat q}{n}} = $ (4 d.p.)', answer: 0.0238, tol: 0.0002, hint: '$\\sqrt{\\frac{0.35 \\times 0.65}{400}}$.' },
              { ask: 'Margin $= 1.96 \\times \\text{SE} = $ (3 d.p.)', answer: 0.047, tol: 0.001, hint: '$1.96 \\times 0.02385$.' },
              { ask: 'Lower limit $= $', answer: 0.303, tol: 0.002, hint: '$0.35 - 0.0467$.' },
              { ask: 'Upper limit $= $', answer: 0.397, tol: 0.002, hint: '$0.35 + 0.0467$.' },
            ],
            after: '**Answer:** $(0.303, 0.397)$.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'How many observations estimate $\\mu$ to within $\\pm 2$ with $95\\%$ confidence, if $\\sigma = 12$?',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: '$\\frac{z\\sigma}{E} = \\frac{1.96 \\times 12}{2} = $', answer: 11.76, tol: 0.005, hint: '$1.96 \\times 12 = 23.52$, then divide by $2$.' },
              { ask: '$n = \\left(\\frac{z\\sigma}{E}\\right)^2 = $ (1 d.p.)', answer: 138.3, tol: 0.06, hint: 'Square $11.76$.' },
              { ask: 'Sample size to use: $n = $', answer: 139, tol: 0, hint: 'Always round a sample size **up**.' },
            ],
            after: '**Answer:** $n = 139$.',
          },
        },
        {
          type: 'finish',
          title: 'Chapter 2 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
