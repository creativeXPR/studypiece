// STA 221 · Sampling · Exam practice: worked exam-style questions on chapter 1.
export default {
  id: 'exam-sampling',
  title: 'Exam practice: sampling',
  covers: 'Exam-style questions: parameter or statistic, systematic and stratified samples, distinguishing methods, listing samples, probabilities about x̄ with and without replacement, sample size, difference of two means',
  minutes: 15,
  sections: [
    {
      name: 'Methods and sampling distributions',
      terms: [
        ['Systematic', '$k = \\frac Nn$; random start, then add $k$.'],
        ['Stratified', '$n_h = \\frac{N_h}{N} \\times n$.'],
        ['Check a listing', 'The mean of the sample means equals $\\mu$; with replacement their variance is $\\frac{\\sigma^2}{n}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: '(a) A town’s $1{,}000$ traders are $300$ food sellers, $450$ clothing sellers and $250$ others. Allocate a stratified sample of $60$. (b) Distinguish stratified from cluster sampling, and quota from stratified sampling.',
          body: '**(a)** $n_h = \\frac{N_h}{N}n$: food $= \\frac{300}{1000}(60) = 18$, clothing $= 27$, others $= 15$. Total $60$ ✓.\n\n**(b)** **Stratified:** split into groups that **differ** from each other; sample some units from **every** group. **Cluster:** split into many **similar** groups; choose **some** groups and study the units in them.\n\n**Quota vs stratified:** both fill a set number from each group, but in quota sampling the interviewer **chooses** who (non-random); in stratified sampling the units are chosen **at random**.',
          asides: [{ label: 'Exam tip', text: 'For "distinguish" questions, use two columns (Method A | Method B) with matching rows: how units are chosen, when it is used, its weakness.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'A lecturer interviews the first $30$ students who walk into the hall. This is',
          options: [
            { text: 'convenience sampling: early arrivals may differ from others', correct: true, why: 'Whoever is easiest to reach; punctual students may be more serious, so the sample is biased.' },
            { text: 'systematic sampling', why: 'There is no random start and no fixed interval $k$.' },
            { text: 'simple random sampling', why: 'Not every student had an equal chance.' },
            { text: 'cluster sampling', why: 'No groups were chosen at random.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'A population is $2, 5, 8$. List all samples of size $2$ with replacement, find the sampling distribution of $\\bar x$, and verify $\\mu_{\\bar x} = \\mu$ and $\\sigma_{\\bar x}^2 = \\frac{\\sigma^2}{n}$.',
          body: '$\\mu = 5$, $\\sigma^2 = \\frac{9 + 0 + 9}{3} = 6$.\n\n$3^2 = 9$ samples: $(2,2), (2,5), (2,8), (5,2), (5,5), (5,8), (8,2), (8,5), (8,8)$ with means $2, 3.5, 5, 3.5, 5, 6.5, 5, 6.5, 8$.\n\nSo $\\bar x = 2, 3.5, 5, 6.5, 8$ with frequencies $1, 2, 3, 2, 1$.\n\n$\\mu_{\\bar x} = \\frac{45}{9} = 5 = \\mu$ ✓. $\\sigma_{\\bar x}^2 = \\frac{9 + 2(2.25) + 0 + 2(2.25) + 9}{9} = \\frac{27}{9} = 3 = \\frac62$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'How many samples of size $3$ can be drawn from $6$ units (i) with replacement, (ii) without?',
          options: [
            { text: '$216$ and $20$', correct: true, why: '$6^3 = 216$; ${}^6C_3 = \\frac{6!}{3!\\,3!} = 20$.' },
            { text: '$18$ and $20$', why: 'With replacement is $6^3$, not $6 \\times 3$.' },
            { text: '$216$ and $120$', why: '$120$ counts ordered selections; samples are unordered.' },
            { text: '$729$ and $20$', why: 'That is $3^6$; it should be $N^n = 6^3$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'A population is $2, 4, 6, 8$. Form the sampling distribution of the mean for samples of size $2$ drawn without replacement, and state three points of interest about it.',
          body: '$\\mu = 5$, $\\sigma^2 = \\frac{9 + 1 + 1 + 9}{4} = 5$.\n\n${}^4C_2 = 6$ samples: $\\{2,4\\}, \\{2,6\\}, \\{2,8\\}, \\{4,6\\}, \\{4,8\\}, \\{6,8\\}$ with means $3, 4, 5, 5, 6, 7$. So $\\bar x = 3, 4, 5, 6, 7$ with probabilities $\\frac16, \\frac16, \\frac26, \\frac16, \\frac16$.\n\n**Points of interest:**\n**1.** Mean of the sample means $= \\frac{30}{6} = 5 = \\mu$: $\\bar X$ is unbiased.\n**2.** Variance $= \\frac{4 + 1 + 0 + 0 + 1 + 4}{6} = \\frac53 = \\frac{\\sigma^2}{n}\\cdot\\frac{N - n}{N - 1} = \\frac52\\cdot\\frac23$ ✓, smaller than $\\sigma^2 = 5$.\n**3.** Shape: symmetric and peaked at $\\mu$, though the population is flat; it tends to normal as $n$ grows.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Distinguish between de jure and de facto enumeration. Give one advantage of each.',
          body: '**De facto:** each person is counted **where they are found** at the census moment (e.g. census night). *Advantage:* simple and quick to carry out, with little risk of double counting.\n\n**De jure:** each person is counted at their **usual place of residence**, wherever they were at the census moment. *Advantage:* it gives the permanent population of each area, which is what planning (schools, hospitals, roads) needs.\n\nA weakness of de facto: places with many visitors look bigger than they are. A weakness of de jure: "usual residence" must be defined, and people may be missed or counted twice.',
        },
        {
          type: 'bridge',
          title: 'Methods: practised.',
          recap: ['Allocate strata in proportion; check the total.', 'List samples after writing how many there should be.'],
          why: 'Now the calculation questions.',
        },
      ],
    },
    {
      name: 'Probability questions',
      terms: [
        ['Sample size for a mean', '$n = \\left(\\dfrac{z\\sigma}{E}\\right)^2$, rounded **up**.'],
        ['Two tails', '$P(|D| > d) = 2[1 - \\Phi(z)]$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 5',
          title: 'A population of $1{,}000$ items has mean $150$ g and $\\sigma = 20$ g. A sample of $100$ is drawn without replacement. Find $P(\\bar X > 153)$. Repeat with replacement and comment.',
          body: '**Without replacement:** SE $= \\frac{20}{10}\\sqrt{\\frac{900}{999}} = 2(0.9492) = 1.8983$; $z = \\frac{3}{1.8983} = 1.58$; $P = 1 - 0.9429 = 0.0571$.\n\n**With replacement:** SE $= 2$, $z = 1.50$, $P = 1 - 0.9332 = 0.0668$.\n\n**Comment:** sampling $10\\%$ of a finite population without replacement reduces the standard error, so extreme sample means are less likely.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 6',
          title: '(a) State the Central Limit Theorem. (b) With $\\sigma = 10$, how large must $n$ be for $\\bar x$ to be within $2$ units of $\\mu$ with probability at least $0.95$?',
          body: '**(a)** For large $n$, the sampling distribution of the mean is approximately normal with mean $\\mu$ and variance $\\frac{\\sigma^2}{n}$, whatever the population distribution ($n \\ge 30$ is usually large enough).\n\n**(b)** Need $1.96 \\times \\frac{10}{\\sqrt n} \\le 2$, so $\\sqrt n \\ge 9.8$, $n \\ge 96.04$. Take $n = 97$.',
          asides: [{ label: 'Exam tip', text: 'Always round a sample size **up**: $96$ would give a margin slightly over $2$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 7',
          title: 'Machine A fills packets with mean $250$ g, $\\sigma = 8$ g; machine B with mean $248$ g, $\\sigma = 6$ g. Samples of $40$ from A and $50$ from B. Find $P(\\bar X_A < \\bar X_B)$.',
          body: 'Mean of $\\bar X_A - \\bar X_B$: $250 - 248 = 2$. SE $= \\sqrt{\\frac{64}{40} + \\frac{36}{50}} = \\sqrt{2.32} = 1.5232$.\n$$P(\\bar X_A - \\bar X_B < 0) = P\\left(Z < \\frac{0 - 2}{1.5232}\\right) = \\Phi(-1.31) = 0.0951.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Scores have $\\sigma = 15$. Two samples of $60$ and $80$ come from the same population. $P$(their means differ by more than $4$) is (SE $= 2.5617$, $\\Phi(1.56) = 0.9406$)',
          options: [
            { text: '$0.1188$', correct: true, why: '$z = \\frac{4}{2.5617} = 1.56$; two tails: $2(1 - 0.9406)$.' },
            { text: '$0.0594$', why: '"Differ by" has no direction: count both tails.' },
            { text: '$0.8812$', why: 'That is the chance they differ by **less** than $4$.' },
            { text: '$0.9406$', why: 'Use the tail areas beyond $\\pm 1.56$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Bottles: $\\mu = 500$ ml, $\\sigma = 12$ ml, $n = 36$. Find $P(\\bar X < 497)$. Use $\\Phi(1.5) = 0.9332$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Standard error $\\sigma_{\\bar x} = \\frac{\\sigma}{\\sqrt n} = $', answer: 2, hint: 'Divide $\\sigma = 12$ by $\\sqrt{36} = 6$.' },
              { ask: '$z = \\frac{497 - 500}{\\sigma_{\\bar x}} = $', answer: -1.5, hint: 'Subtract the mean first ($-3$), then divide by the SE, not by $\\sigma$.' },
              { ask: '$P(\\bar X < 497) = P(Z < -1.5) = 1 - \\Phi(1.5) = $', answer: 0.0668, tol: 0.0005, hint: 'The left tail below $-1.5$ is the same size as the right tail above $1.5$: $1 - 0.9332$.' },
            ],
            after: '**Answer:** $P(\\bar X < 497) = 0.0668$.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A school has $500$ JSS, $400$ SSS science and $300$ SSS arts students. Draw a sample of $60$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Systematic sampling: the interval $k = \\frac Nn = $', answer: 20, hint: '$N = 1200$ students in all, $n = 60$.' },
              { ask: 'Stratified, proportional: number of JSS students $= \\frac{500}{1200} \\times 60 = $', answer: 25, hint: 'Multiply the stratum’s share of the population by $60$.' },
              { ask: 'Science students $= $', answer: 20, hint: '$\\frac{400}{1200} \\times 60$.' },
              { ask: 'Arts students $= $', answer: 15, hint: '$\\frac{300}{1200} \\times 60$. Check: the three must add to $60$.' },
            ],
            after: '**Answer:** $k = 20$; $25 + 20 + 15 = 60$.',
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Machine A: mean $250$ g, $\\sigma = 8$; machine B: mean $248$ g, $\\sigma = 6$. Samples of $40$ and $50$. Find $P(\\bar X_A < \\bar X_B)$. Use $\\Phi(1.31) = 0.9049$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: 'Mean of $\\bar X_A - \\bar X_B = $', answer: 2, hint: '$\\mu_A - \\mu_B$.' },
              { ask: 'SE $= \\sqrt{\\frac{8^2}{40} + \\frac{6^2}{50}} = $', answer: 1.5232, tol: 0.002, hint: 'Square the SDs: $\\frac{64}{40} + \\frac{36}{50} = 2.32$, then take the square root. Variances add.' },
              { ask: '$z = \\frac{0 - 2}{\\text{SE}} = $ (2 d.p.)', answer: -1.31, tol: 0.006, hint: '$\\bar X_A < \\bar X_B$ means the difference is below $0$.' },
              { ask: '$P = \\Phi(-1.31) = 1 - \\Phi(1.31) = $', answer: 0.0951, tol: 0.0005, hint: '$1 - 0.9049$.' },
            ],
            after: '**Answer:** $P(\\bar X_A < \\bar X_B) = 0.0951$.',
          },
        },
        {
          type: 'finish',
          title: 'Chapter 1 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
