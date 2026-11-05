// STA 221 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "STA 221",
  "updated": "2026-11-05",
  "title": "Statistical Inference",
  "sets": [
    {
      "id": "QS001",
      "title": "Sampling and sampling distributions",
      "questions": [
        {
          "question": "Statistical inference is",
          "options": [
            "drawing conclusions about a population from a sample, using probability to measure their reliability",
            "a complete count of a population",
            "describing a sample without generalising",
            "choosing a sampling frame"
          ],
          "answer": 0,
          "explanation": "Its two jobs are estimation and hypothesis testing."
        },
        {
          "question": "A number describing a population, such as $\\mu$, is a",
          "options": [
            "statistic",
            "estimate",
            "parameter",
            "sampling unit"
          ],
          "answer": 2,
          "explanation": "Parameter goes with population; statistic goes with sample."
        },
        {
          "question": "The mean salary of all $2{,}000$ employees of a firm is ₦$92{,}000$. This is a",
          "options": [
            "statistic",
            "parameter",
            "estimator",
            "sampling error"
          ],
          "answer": 1,
          "explanation": "It was computed from everybody, so it is a parameter."
        },
        {
          "question": "$64\\%$ of $500$ sampled students own a laptop. The $64\\%$ is a",
          "options": [
            "statistic",
            "parameter",
            "census",
            "sampling frame"
          ],
          "answer": 0,
          "explanation": "It comes from a sample: $\\hat p = 0.64$ estimates $p$."
        },
        {
          "question": "A complete numbered list of all units in the population is the",
          "options": [
            "sampling unit",
            "census",
            "stratum",
            "sampling frame"
          ],
          "answer": 3,
          "explanation": "Samples are drawn from the frame."
        },
        {
          "question": "The estimator is to the estimate as",
          "options": [
            "the cake is to the recipe",
            "the recipe is to the cake",
            "the population is to the sample",
            "the sample is to the census"
          ],
          "answer": 1,
          "explanation": "The estimator is the rule; the estimate is the number it gives for one sample."
        },
        {
          "question": "All possible tosses of a coin form a population that is",
          "options": [
            "finite and real",
            "finite and hypothetical",
            "infinite and real",
            "infinite and hypothetical"
          ],
          "answer": 3,
          "explanation": "It is imagined by repeating a process forever."
        },
        {
          "question": "Testing how long bulbs last makes a census impossible because",
          "options": [
            "the population is too small",
            "bulbs are all identical",
            "the test destroys the units",
            "a census is always cheaper"
          ],
          "answer": 2,
          "explanation": "Measuring a bulb’s lifetime burns it out: \"Destroyed\" in DIRT CS."
        },
        {
          "question": "In stratified sampling, units are taken from",
          "options": [
            "some randomly chosen clusters only",
            "every stratum, in proportion to its size",
            "the most convenient stratum",
            "one stratum chosen at random"
          ],
          "answer": 1,
          "explanation": "Some from every group: $n_h = \\frac{N_h}{N}n$."
        },
        {
          "question": "In cluster sampling, we",
          "options": [
            "choose some groups at random and study the units in them",
            "take some units from every group",
            "take every $k$th unit from a list",
            "let the interviewer fill quotas"
          ],
          "answer": 0,
          "explanation": "All (or a sample) from some groups."
        },
        {
          "question": "A register of $840$ farmers; systematic sample of $35$. The sampling interval is",
          "options": [
            "$35$",
            "$24$",
            "$805$",
            "$29400$"
          ],
          "answer": 1,
          "explanation": "$k = \\frac{N}{n} = \\frac{840}{35}$."
        },
        {
          "question": "$1{,}000$ traders: $300$ food, $450$ clothing, $250$ others. In a proportional stratified sample of $60$, the clothing sellers number",
          "options": [
            "$20$",
            "$45$",
            "$27$",
            "$15$"
          ],
          "answer": 2,
          "explanation": "$\\frac{450}{1000} \\times 60 = 27$."
        },
        {
          "question": "Quota sampling differs from stratified sampling because",
          "options": [
            "the interviewer chooses who fills each quota",
            "it uses no groups",
            "it always gives an unbiased sample",
            "it needs a complete sampling frame"
          ],
          "answer": 0,
          "explanation": "Within groups, quota sampling is not random."
        },
        {
          "question": "The number of samples of size $3$ from $6$ units **without** replacement is",
          "options": [
            "$216$",
            "$18$",
            "$120$",
            "$20$"
          ],
          "answer": 3,
          "explanation": "${}^6C_3 = \\frac{6!}{3!\\,3!} = 20$."
        },
        {
          "question": "The number of samples of size $2$ from $4$ units **with** replacement is",
          "options": [
            "$16$",
            "$6$",
            "$8$",
            "$12$"
          ],
          "answer": 0,
          "explanation": "$N^n = 4^2$."
        },
        {
          "question": "The mean of the sampling distribution of $\\bar X$ is",
          "options": [
            "$\\frac{\\mu}{n}$",
            "$\\frac{\\sigma}{\\sqrt n}$",
            "$\\mu$",
            "$\\bar x$"
          ],
          "answer": 2,
          "explanation": "$\\bar X$ is unbiased: $\\mu_{\\bar x} = \\mu$."
        },
        {
          "question": "The standard error of the mean (infinite population) is",
          "options": [
            "$\\frac{\\sigma}{n}$",
            "$\\sigma$",
            "$\\frac{\\sigma}{\\sqrt n}$",
            "$\\frac{\\sigma^2}{n}$"
          ],
          "answer": 2,
          "explanation": "$\\frac{\\sigma^2}{n}$ is the variance; its square root is the SE."
        },
        {
          "question": "The finite population correction factor is",
          "options": [
            "$\\sqrt{\\frac{N - 1}{N - n}}$",
            "$\\frac{n}{N}$",
            "$\\sqrt{\\frac{n}{N}}$",
            "$\\sqrt{\\frac{N - n}{N - 1}}$"
          ],
          "answer": 3,
          "explanation": "Use it for a finite population sampled without replacement."
        },
        {
          "question": "The Central Limit Theorem says that for large $n$ the sampling distribution of the mean is",
          "options": [
            "approximately normal with mean $\\mu$ and variance $\\frac{\\sigma^2}{n}$, whatever the population",
            "exactly the same shape as the population",
            "approximately normal only if the population is normal",
            "uniform with mean $\\mu$"
          ],
          "answer": 0,
          "explanation": "The working rule for large is $n \\ge 30$."
        },
        {
          "question": "Compared with the standard deviation of the data, the standard error of the mean",
          "options": [
            "is larger",
            "is smaller and shrinks as $n$ grows",
            "is the same",
            "grows as $n$ grows"
          ],
          "answer": 1,
          "explanation": "SE $= \\frac{\\sigma}{\\sqrt n} < \\sigma$ for $n \\ge 2$."
        },
        {
          "question": "To halve the standard error of the mean, the sample size must be",
          "options": [
            "multiplied by $4$",
            "doubled",
            "halved",
            "multiplied by $\\sqrt2$"
          ],
          "answer": 0,
          "explanation": "$\\frac{\\sigma}{\\sqrt{4n}} = \\frac12 \\cdot \\frac{\\sigma}{\\sqrt n}$."
        },
        {
          "question": "Bottles: $\\mu = 500$ ml, $\\sigma = 12$ ml, $n = 36$. $P(\\bar X < 497)$ is (use $\\Phi(1.5) = 0.9332$)",
          "options": [
            "$0.9332$",
            "$0.4013$",
            "$0.1336$",
            "$0.0668$"
          ],
          "answer": 3,
          "explanation": "SE $= 2$, $z = -1.5$, $P = 1 - 0.9332$."
        },
        {
          "question": "Tyres: $\\mu = 40{,}000$ km, $\\sigma = 3{,}200$, $n = 64$. The standard error is",
          "options": [
            "$50$",
            "$3200$",
            "$400$",
            "$625$"
          ],
          "answer": 2,
          "explanation": "$\\frac{3200}{\\sqrt{64}} = 400$."
        },
        {
          "question": "For independent samples, the standard error of $\\bar X_1 - \\bar X_2$ is",
          "options": [
            "$\\sqrt{\\frac{\\sigma_1^2}{n_1} - \\frac{\\sigma_2^2}{n_2}}$",
            "$\\sqrt{\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}}$",
            "$\\frac{\\sigma_1}{\\sqrt{n_1}} - \\frac{\\sigma_2}{\\sqrt{n_2}}$",
            "$\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}$"
          ],
          "answer": 1,
          "explanation": "Variances add, even for a difference; then take the square root."
        },
        {
          "question": "\"The two sample means differ by more than $2$\" calls for",
          "options": [
            "the right tail only",
            "the left tail only",
            "$\\Phi(z)$",
            "both tails: $2[1 - \\Phi(z)]$"
          ],
          "answer": 3,
          "explanation": "\"Differ by\" has no direction."
        }
      ]
    },
    {
      "id": "QS002",
      "title": "Estimation and proportions",
      "questions": [
        {
          "question": "The $95\\%$ confidence interval for $\\mu$ is",
          "options": [
            "$\\bar x \\pm 1.96\\sigma$",
            "$\\bar x \\pm 1.96\\frac{\\sigma}{\\sqrt n}$",
            "$\\mu \\pm 1.96\\frac{\\sigma}{\\sqrt n}$",
            "$\\bar x \\pm 1.645\\frac{\\sigma}{\\sqrt n}$"
          ],
          "answer": 1,
          "explanation": "Centred on the sample mean, with $1.96$ standard errors either side."
        },
        {
          "question": "The critical value for a $99\\%$ confidence interval is",
          "options": [
            "$1.96$",
            "$2.33$",
            "$2.58$",
            "$1.645$"
          ],
          "answer": 2,
          "explanation": "$90 \\to 1.645$, $95 \\to 1.96$, $99 \\to 2.58$."
        },
        {
          "question": "The critical value for a $90\\%$ confidence interval is",
          "options": [
            "$1.28$",
            "$1.645$",
            "$1.96$",
            "$2.58$"
          ],
          "answer": 1,
          "explanation": "$5\\%$ in each tail."
        },
        {
          "question": "A sample of $100$ has $\\bar x = 72.5$, $s = 8$. The $95\\%$ interval is",
          "options": [
            "$(70.93, 74.07)$",
            "$(56.82, 88.18)$",
            "$(71.18, 73.82)$",
            "$(70.44, 74.56)$"
          ],
          "answer": 0,
          "explanation": "SE $= 0.8$, margin $1.568$."
        },
        {
          "question": "$64$ flats, $\\bar x = 58.4$, $s = 6.4$. The standard error is",
          "options": [
            "$0.1$",
            "$6.4$",
            "$1.6$",
            "$0.8$"
          ],
          "answer": 3,
          "explanation": "$\\frac{6.4}{8}$."
        },
        {
          "question": "Raising the confidence level from $95\\%$ to $99\\%$ makes the interval",
          "options": [
            "narrower",
            "the same width",
            "wider",
            "shift to the right"
          ],
          "answer": 2,
          "explanation": "To be surer of catching $\\mu$ you need a bigger hoop."
        },
        {
          "question": "The correct way to report a $95\\%$ interval $(56.83, 59.97)$ is",
          "options": [
            "we are $95\\%$ confident that $\\mu$ lies between $56.83$ and $59.97$",
            "there is a $95\\%$ probability that $\\mu$ is in $(56.83, 59.97)$",
            "$95\\%$ of the data lie in $(56.83, 59.97)$",
            "$\\mu = 58.4$ with probability $0.95$"
          ],
          "answer": 0,
          "explanation": "$\\mu$ is fixed: it is either in the interval or not."
        },
        {
          "question": "The two end points of a confidence interval are called the",
          "options": [
            "confidence coefficients",
            "confidence limits",
            "critical values",
            "confidence levels"
          ],
          "answer": 1,
          "explanation": "The interval is the range; the limits are its ends."
        },
        {
          "question": "How large a sample estimates $\\mu$ to within $\\pm 2$ with $95\\%$ confidence if $\\sigma = 12$?",
          "options": [
            "$138$",
            "$12$",
            "$139$",
            "$24$"
          ],
          "answer": 2,
          "explanation": "$\\left(\\frac{1.96 \\times 12}{2}\\right)^2 = 138.3$, rounded up."
        },
        {
          "question": "The standard error of a sample proportion is",
          "options": [
            "$\\frac{pq}{n}$",
            "$\\sqrt{\\frac{p}{n}}$",
            "$\\frac{p}{\\sqrt n}$",
            "$\\sqrt{\\frac{pq}{n}}$"
          ],
          "answer": 3,
          "explanation": "A proportion is a mean of 0s and 1s with variance $pq$."
        },
        {
          "question": "$40\\%$ of voters support a candidate; $n = 200$. $P(\\hat p > 0.45)$ is (use $\\Phi(1.44) = 0.9251$)",
          "options": [
            "$0.0749$",
            "$0.9251$",
            "$0.1498$",
            "$0.4251$"
          ],
          "answer": 0,
          "explanation": "SE $= 0.03464$, $z = 1.44$."
        },
        {
          "question": "In a probability question about $\\hat p$, the standard error uses",
          "options": [
            "the given population $p$",
            "the sample $\\hat p$",
            "$p = 0.5$ always",
            "$\\hat p$ and $p$ averaged"
          ],
          "answer": 0,
          "explanation": "The interval for an unknown $p$ uses $\\hat p$; probability questions use the known $p$."
        },
        {
          "question": "$780$ of $1{,}200$ adults support a policy. The $95\\%$ interval for $p$ is",
          "options": [
            "$(0.638, 0.662)$",
            "$(0.615, 0.685)$",
            "$(0.623, 0.677)$",
            "$(0.35, 0.65)$"
          ],
          "answer": 2,
          "explanation": "$\\hat p = 0.65$, SE $= 0.01377$, margin $0.027$."
        },
        {
          "question": "With no idea of $p$, the sample size for a proportion uses $p = $",
          "options": [
            "$0$",
            "$1$",
            "$0.5$",
            "$0.05$"
          ],
          "answer": 2,
          "explanation": "$pq$ is largest ($0.25$) at $p = 0.5$, so the sample is big enough whatever $p$ is."
        },
        {
          "question": "For $\\pm 0.04$ with $95\\%$ confidence and $p$ unknown, $n = $",
          "options": [
            "$600$",
            "$385$",
            "$25$",
            "$601$"
          ],
          "answer": 3,
          "explanation": "$\\frac{1.96^2(0.25)}{0.04^2} = 600.25$, rounded up."
        },
        {
          "question": "Two samples of $50$ oranges from a basket that is $60\\%$ ripe. A difference of $5$ ripe oranges is a difference in proportion of",
          "options": [
            "$0.1$",
            "$5$",
            "$0.05$",
            "$0.6$"
          ],
          "answer": 0,
          "explanation": "$\\frac{5}{50} = 0.1$. Convert counts to proportions first."
        },
        {
          "question": "An estimator $\\hat\\theta$ is unbiased if",
          "options": [
            "$\\text{Var}(\\hat\\theta) = 0$",
            "$\\hat\\theta = \\theta$ for every sample",
            "$E(\\hat\\theta) = 0$",
            "$E(\\hat\\theta) = \\theta$"
          ],
          "answer": 3,
          "explanation": "Right on average."
        },
        {
          "question": "Of two unbiased estimators, the more efficient one has the",
          "options": [
            "larger variance",
            "larger bias",
            "larger sample",
            "smaller variance"
          ],
          "answer": 3,
          "explanation": "Tighter around the target."
        },
        {
          "question": "$\\text{RE}(\\hat\\theta_1, \\hat\\theta_2) = $",
          "options": [
            "$\\frac{\\text{Var}(\\hat\\theta_1)}{\\text{Var}(\\hat\\theta_2)}$",
            "$\\frac{\\text{Var}(\\hat\\theta_2)}{\\text{Var}(\\hat\\theta_1)}$",
            "$\\text{Var}(\\hat\\theta_1) - \\text{Var}(\\hat\\theta_2)$",
            "$\\frac{E(\\hat\\theta_1)}{E(\\hat\\theta_2)}$"
          ],
          "answer": 1,
          "explanation": "Above $1$ means $\\hat\\theta_1$ is more efficient."
        },
        {
          "question": "$S^2 = \\frac1n\\sum(X_i - \\bar X)^2$ has expectation",
          "options": [
            "$\\frac{n - 1}{n}\\sigma^2$",
            "$\\sigma^2$",
            "$\\frac{n}{n - 1}\\sigma^2$",
            "$\\frac{\\sigma^2}{n}$"
          ],
          "answer": 0,
          "explanation": "It underestimates $\\sigma^2$; dividing by $n - 1$ fixes it."
        },
        {
          "question": "For $4, 7, 9, 10, 15$, the unbiased estimate of $\\sigma^2$ is",
          "options": [
            "$13.2$",
            "$16.5$",
            "$66$",
            "$9$"
          ],
          "answer": 1,
          "explanation": "$\\sum(x - \\bar x)^2 = 66$, divided by $n - 1 = 4$."
        },
        {
          "question": "$X_1, X_2$ independent with mean $\\mu$, variance $\\sigma^2$. $\\text{Var}\\left(\\frac{X_1 + X_2}{2}\\right) = $",
          "options": [
            "$\\sigma^2$",
            "$\\frac{\\sigma^2}{4}$",
            "$2\\sigma^2$",
            "$\\frac{\\sigma^2}{2}$"
          ],
          "answer": 3,
          "explanation": "$\\frac14(\\sigma^2 + \\sigma^2)$: constants come out squared."
        },
        {
          "question": "$T = \\frac{X_1 + 2X_2 + 3X_3}{6}$ is unbiased for $\\mu$ because",
          "options": [
            "it uses three observations",
            "its weights add to $1$",
            "its variance is small",
            "the weights are increasing"
          ],
          "answer": 1,
          "explanation": "$E(T) = \\frac{1 + 2 + 3}{6}\\mu = \\mu$."
        },
        {
          "question": "The Cramér–Rao lower bound for unbiased estimators of $\\theta$ is",
          "options": [
            "$nI(\\theta)$",
            "$\\frac{I(\\theta)}{n}$",
            "$\\frac{1}{nI(\\theta)}$",
            "$\\frac{1}{I(\\theta)}$"
          ],
          "answer": 2,
          "explanation": "$I(\\theta) = -E\\left[\\frac{\\partial^2}{\\partial\\theta^2}\\ln f\\right]$."
        },
        {
          "question": "An unbiased estimator whose variance equals the Cramér–Rao bound is",
          "options": [
            "the minimum variance unbiased estimator",
            "biased",
            "inconsistent",
            "the least efficient estimator"
          ],
          "answer": 0,
          "explanation": "No unbiased estimator can do better."
        }
      ]
    },
    {
      "id": "QS003",
      "title": "Hypothesis testing",
      "questions": [
        {
          "question": "The null hypothesis always contains",
          "options": [
            "a \"greater than\" sign",
            "the equals sign and the claimed value",
            "the sample statistic",
            "the level of significance"
          ],
          "answer": 1,
          "explanation": "H₀: $\\theta = \\theta_0$."
        },
        {
          "question": "$\\theta > \\theta_0$ is a",
          "options": [
            "composite hypothesis",
            "simple hypothesis",
            "null hypothesis",
            "critical region"
          ],
          "answer": 0,
          "explanation": "It does not fix $\\theta$ at one value."
        },
        {
          "question": "A Type I error is",
          "options": [
            "accepting H₀ when it is false",
            "rejecting H₀ when it is false",
            "accepting H₀ when it is true",
            "rejecting H₀ when it is true"
          ],
          "answer": 3,
          "explanation": "Its probability is $\\alpha$."
        },
        {
          "question": "A Type II error is",
          "options": [
            "rejecting H₀ when it is true",
            "accepting H₀ when it is false",
            "rejecting H₀ when it is false",
            "choosing the wrong $\\alpha$"
          ],
          "answer": 1,
          "explanation": "Its probability is $\\beta$."
        },
        {
          "question": "The power of a test is",
          "options": [
            "$1 - \\alpha$",
            "$\\alpha$",
            "$1 - \\beta$",
            "$\\beta$"
          ],
          "answer": 2,
          "explanation": "The chance of rejecting a false H₀."
        },
        {
          "question": "A test has $\\alpha = 0.05$ and $\\beta = 0.2$. Its power is",
          "options": [
            "$0.8$",
            "$0.95$",
            "$0.25$",
            "$0.75$"
          ],
          "answer": 0,
          "explanation": "$1 - 0.2$."
        },
        {
          "question": "The level of significance is",
          "options": [
            "the probability of a Type II error",
            "the probability of a Type I error",
            "the power",
            "the test statistic"
          ],
          "answer": 1,
          "explanation": "The size of the critical region."
        },
        {
          "question": "For a fixed sample size, making $\\alpha$ smaller",
          "options": [
            "makes $\\beta$ larger",
            "makes $\\beta$ smaller",
            "leaves $\\beta$ unchanged",
            "increases the power"
          ],
          "answer": 0,
          "explanation": "Stronger proof protects the innocent but frees more of the guilty. Only a bigger $n$ cuts both."
        },
        {
          "question": "In the courtroom picture, jailing an innocent person is",
          "options": [
            "a Type II error",
            "the power",
            "a correct decision",
            "a Type I error"
          ],
          "answer": 3,
          "explanation": "Rejecting a true H₀."
        },
        {
          "question": "The set of values of the test statistic that lead to rejecting H₀ is the",
          "options": [
            "acceptance region",
            "critical region",
            "confidence interval",
            "sampling frame"
          ],
          "answer": 1,
          "explanation": "Its size is $\\alpha$."
        },
        {
          "question": "For H₁: $\\mu \\ne \\mu_0$ at $5\\%$, reject H₀ if",
          "options": [
            "$z > 1.645$",
            "$|z| > 1.645$",
            "$|z| > 1.96$",
            "$|z| > 2.58$"
          ],
          "answer": 2,
          "explanation": "Two tails, $2.5\\%$ each."
        },
        {
          "question": "For H₁: $\\mu > \\mu_0$ at $5\\%$, reject H₀ if",
          "options": [
            "$|z| > 1.96$",
            "$z < -1.645$",
            "$z > 2.33$",
            "$z > 1.645$"
          ],
          "answer": 3,
          "explanation": "All $5\\%$ in the right tail."
        },
        {
          "question": "For H₁: $\\mu < \\mu_0$ at $1\\%$, reject H₀ if",
          "options": [
            "$z < -2.58$",
            "$z > 2.33$",
            "$|z| > 2.58$",
            "$z < -2.33$"
          ],
          "answer": 3,
          "explanation": "Left tail, $1\\%$."
        },
        {
          "question": "\"The machine has drifted from $500$ ml\" gives the alternative",
          "options": [
            "$\\mu > 500$",
            "$\\mu < 500$",
            "$\\mu \\ne 500$",
            "$\\mu = 500$"
          ],
          "answer": 2,
          "explanation": "Drifted means changed, either way."
        },
        {
          "question": "$\\sigma = 12$, $n = 36$, $\\bar x = 496$, H₀: $\\mu = 500$. The test statistic is",
          "options": [
            "$z = -0.33$",
            "$z = -12$",
            "$z = -2.00$",
            "$z = 2.00$"
          ],
          "answer": 2,
          "explanation": "$\\frac{496 - 500}{12/6}$."
        },
        {
          "question": "With $z = -2.00$ and H₁: $\\mu \\ne 500$, the decision is",
          "options": [
            "reject H₀ at $5\\%$ but accept it at $1\\%$",
            "reject at both $5\\%$ and $1\\%$",
            "accept at both levels",
            "accept at $5\\%$, reject at $1\\%$"
          ],
          "answer": 0,
          "explanation": "$2.00 > 1.96$ but $2.00 < 2.58$."
        },
        {
          "question": "Bags: $\\mu_0 = 80$, $\\sigma = 12$, $n = 49$, $\\bar x = 83.6$. Then $z = $",
          "options": [
            "$0.30$",
            "$14.7$",
            "$3.6$",
            "$2.10$"
          ],
          "answer": 3,
          "explanation": "$\\frac{3.6}{12/7}$."
        },
        {
          "question": "$108$ of $200$ customers prefer a product; H₀: $p = 0.6$. The test statistic is",
          "options": [
            "$z = -0.06$",
            "$z = -1.73$",
            "$z = 1.73$",
            "$z = -1.22$"
          ],
          "answer": 1,
          "explanation": "$\\hat p = 0.54$, SE $= \\sqrt{\\frac{0.6 \\times 0.4}{200}} = 0.03464$."
        },
        {
          "question": "With $z = -1.73$: two-tailed at $5\\%$ we accept H₀, but against H₁: $p < 0.6$ we",
          "options": [
            "reject H₀",
            "accept H₀",
            "cannot decide",
            "must use $1.96$"
          ],
          "answer": 0,
          "explanation": "$-1.73 < -1.645$: the one-tailed critical value is closer to $0$."
        },
        {
          "question": "In a two-proportion test with $x_1 = 45$, $x_2 = 30$, $n_1 = n_2 = 150$, the pooled $\\bar p$ is",
          "options": [
            "$0.25$",
            "$0.5$",
            "$0.10$",
            "$0.30$"
          ],
          "answer": 0,
          "explanation": "$\\frac{45 + 30}{300}$."
        },
        {
          "question": "School A: $n = 60$, $\\bar x = 68$, $s = 10$; B: $n = 50$, $\\bar x = 64$, $s = 12$. The SE of the difference is",
          "options": [
            "$4.55$",
            "$0.94$",
            "$22$",
            "$2.13$"
          ],
          "answer": 3,
          "explanation": "$\\sqrt{\\frac{100}{60} + \\frac{144}{50}} = \\sqrt{4.547}$."
        },
        {
          "question": "A p-value is",
          "options": [
            "the probability that H₀ is true",
            "the level of significance",
            "the probability, if H₀ is true, of a result at least as extreme as the one observed",
            "the power of the test"
          ],
          "answer": 2,
          "explanation": "Reject H₀ when the p-value is below $\\alpha$."
        },
        {
          "question": "If H₀ is accepted, we should conclude",
          "options": [
            "H₀ is proved true",
            "H₁ is proved false",
            "the data are not strong enough to reject H₀",
            "the test was wrong"
          ],
          "answer": 2,
          "explanation": "Never say H₀ is proved."
        },
        {
          "question": "A supplier claims at most $10\\%$ defective. The right alternative is",
          "options": [
            "$p > 0.10$",
            "$p \\ne 0.10$",
            "$p < 0.10$",
            "$p = 0.10$"
          ],
          "answer": 0,
          "explanation": "Only more defectives would break the claim."
        },
        {
          "question": "H₀: the new drug is no better. A Type I error here is",
          "options": [
            "deciding it is no better when it is",
            "deciding the drug is better when it is not",
            "testing too few patients",
            "using a one-tailed test"
          ],
          "answer": 1,
          "explanation": "Rejecting a true H₀."
        }
      ]
    },
    {
      "id": "QS004",
      "title": "Chi-square tests",
      "questions": [
        {
          "question": "A chi-square variable with $\\nu$ df is",
          "options": [
            "a sum of $\\nu$ squared independent standard normals",
            "a difference of two normals",
            "the ratio of two variances",
            "a normal variable with mean $\\nu$"
          ],
          "answer": 0,
          "explanation": "$\\chi^2 = Z_1^2 + \\cdots + Z_\\nu^2$."
        },
        {
          "question": "The mean and variance of $\\chi^2$ with $10$ df are",
          "options": [
            "$10$ and $10$",
            "$0$ and $1$",
            "$10$ and $20$",
            "$20$ and $10$"
          ],
          "answer": 2,
          "explanation": "Mean $\\nu$, variance $2\\nu$."
        },
        {
          "question": "Which is NOT a property of the chi-square distribution?",
          "options": [
            "It is symmetric about its mean",
            "It is never negative",
            "There is one curve for each df",
            "It approaches the normal for large df"
          ],
          "answer": 0,
          "explanation": "It is skewed to the right."
        },
        {
          "question": "$\\chi^2_{0.05}(10) = $",
          "options": [
            "$3.940$",
            "$15.987$",
            "$18.307$",
            "$20.483$"
          ],
          "answer": 2,
          "explanation": "The value with $5\\%$ of the area to its right."
        },
        {
          "question": "For $24$ df, the value with $5\\%$ of the area to its **left** is",
          "options": [
            "$\\chi^2_{0.05}(24) = 36.415$",
            "$-36.415$",
            "$24$",
            "$\\chi^2_{0.95}(24) = 13.848$"
          ],
          "answer": 3,
          "explanation": "$5\\%$ to the left means $95\\%$ to the right."
        },
        {
          "question": "Which is NOT a condition for the $\\chi^2$ test of counts?",
          "options": [
            "Expected frequencies at least $5$",
            "Raw counts, not percentages",
            "The data must be normally distributed",
            "Independent observations"
          ],
          "answer": 2,
          "explanation": "The test is non-parametric: RICE-5."
        },
        {
          "question": "An expected frequency below $5$ should be",
          "options": [
            "ignored",
            "doubled",
            "merged with a neighbouring category",
            "replaced by $5$"
          ],
          "answer": 2,
          "explanation": "Then recount the categories for the df."
        },
        {
          "question": "Pearson's chi-square statistic is",
          "options": [
            "$\\sum\\frac{(O - E)^2}{E}$",
            "$\\sum\\frac{(O - E)^2}{O}$",
            "$\\sum(O - E)$",
            "$\\sum\\frac{O - E}{E}$"
          ],
          "answer": 0,
          "explanation": "Squared mismatch scaled by the expected count."
        },
        {
          "question": "The rejection region of a $\\chi^2$ test of counts is",
          "options": [
            "always two tails",
            "the left tail",
            "always the right tail",
            "either, depending on H₁"
          ],
          "answer": 2,
          "explanation": "Only a big mismatch counts against H₀."
        },
        {
          "question": "A die rolled $120$ times gives $25, 17, 15, 23, 24, 16$. $\\chi^2 = $",
          "options": [
            "$100$",
            "$5.0$",
            "$20$",
            "$0.83$"
          ],
          "answer": 1,
          "explanation": "$E = 20$; squared gaps add to $100$; $\\frac{100}{20}$."
        },
        {
          "question": "For the die, df and table value are",
          "options": [
            "$6$ and $12.592$",
            "$119$ and large",
            "$5$ and $1.145$",
            "$5$ and $11.070$"
          ],
          "answer": 3,
          "explanation": "$k - 1 = 5$; $\\chi^2_{0.05}(5) = 11.070$."
        },
        {
          "question": "Seeds in ratio $9 : 3 : 3 : 1$, $n = 160$. The expected counts are",
          "options": [
            "$40, 40, 40, 40$",
            "$90, 30, 30, 10$",
            "$9, 3, 3, 1$",
            "$95, 25, 28, 12$"
          ],
          "answer": 1,
          "explanation": "$160 \\times \\frac{9}{16}$, and so on."
        },
        {
          "question": "Fitting a Poisson to $5$ categories with $\\lambda$ estimated from the data, df $= $",
          "options": [
            "$4$",
            "$3$",
            "$5$",
            "$2$"
          ],
          "answer": 1,
          "explanation": "$k - 1 - m = 5 - 1 - 1$."
        },
        {
          "question": "In a contingency table, the expected frequency of a cell is",
          "options": [
            "$\\frac{\\text{grand total}}{\\text{number of cells}}$",
            "$\\text{row total} \\times \\text{column total}$",
            "the observed count",
            "$\\frac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}$"
          ],
          "answer": 3,
          "explanation": "\"RC over G\"."
        },
        {
          "question": "The df for a $3 \\times 4$ contingency table is",
          "options": [
            "$12$",
            "$11$",
            "$7$",
            "$6$"
          ],
          "answer": 3,
          "explanation": "$(3 - 1)(4 - 1)$."
        },
        {
          "question": "Study time by faculty gives $\\chi^2 = 4.631$ with $2$ df ($\\chi^2_{0.05}(2) = 5.991$). Conclusion:",
          "options": [
            "no significant evidence of a relationship",
            "study time depends on faculty",
            "the test is invalid",
            "reject H₀ at $5\\%$"
          ],
          "answer": 0,
          "explanation": "$4.631 < 5.991$: accept independence."
        },
        {
          "question": "Opinion by gender gives $\\chi^2 = 8.167$, df $= 2$. At $5\\%$,",
          "options": [
            "opinion is independent of gender",
            "more data are needed",
            "df should be $5$",
            "opinion depends on gender"
          ],
          "answer": 3,
          "explanation": "$8.167 > 5.991$."
        },
        {
          "question": "Yates' correction is used for",
          "options": [
            "goodness of fit with many categories",
            "$2 \\times 2$ tables, especially with small expected counts",
            "ANOVA tables",
            "the variance test"
          ],
          "answer": 1,
          "explanation": "It subtracts $0.5$ from each $|O - E|$."
        },
        {
          "question": "Yates' correction makes the $\\chi^2$ value",
          "options": [
            "smaller, so significance is harder to reach",
            "larger",
            "negative",
            "unchanged"
          ],
          "answer": 0,
          "explanation": "It is conservative."
        },
        {
          "question": "Vaccinated $10$ / $90$, not vaccinated $25$ / $75$ (infected / not). Yates' $\\chi^2$ is",
          "options": [
            "$7.792$",
            "$3.841$",
            "$6.788$",
            "$0.5$"
          ],
          "answer": 2,
          "explanation": "$7.792$ is the uncorrected value."
        },
        {
          "question": "Three separate samples of $100$ compared on pass rates is a test of",
          "options": [
            "independence",
            "goodness of fit",
            "a variance",
            "homogeneity"
          ],
          "answer": 3,
          "explanation": "Several samples compared: homogeneity."
        },
        {
          "question": "Pass $70, 60, 80$ and fail $30, 40, 20$ in three schools gives $\\chi^2 = 9.524$. At $5\\%$,",
          "options": [
            "the pass rates differ",
            "the pass rates are equal",
            "df $= 5$",
            "Yates' correction is required"
          ],
          "answer": 0,
          "explanation": "df $= 2$, $9.524 > 5.991$."
        },
        {
          "question": "Testing H₀: $\\sigma^2 = \\sigma_0^2$ uses",
          "options": [
            "$\\chi^2 = \\sum\\frac{(O - E)^2}{E}$",
            "$\\chi^2 = \\frac{(n - 1)s^2}{\\sigma_0^2}$ with $n - 1$ df",
            "$z = \\frac{s - \\sigma_0}{\\sigma_0}$",
            "$F = \\frac{s^2}{\\sigma_0}$"
          ],
          "answer": 1,
          "explanation": "Assumes a normal population."
        },
        {
          "question": "Rods: $\\sigma_0 = 0.5$, $n = 20$, $s = 0.65$. $\\chi^2 = $",
          "options": [
            "$32.11$",
            "$24.7$",
            "$33.80$",
            "$1.69$"
          ],
          "answer": 0,
          "explanation": "$\\frac{19 \\times 0.4225}{0.25}$. Square the standard deviations."
        },
        {
          "question": "Yule's coefficient for $a = 30$, $b = 20$, $c = 10$, $d = 40$ is",
          "options": [
            "$-0.714$",
            "$0.714$",
            "$0.5$",
            "$1000$"
          ],
          "answer": 1,
          "explanation": "$\\frac{1200 - 200}{1200 + 200}$."
        }
      ]
    },
    {
      "id": "QS005",
      "title": "Analysis of variance",
      "questions": [
        {
          "question": "One-way ANOVA tests",
          "options": [
            "H₀: all variances are different",
            "H₀: two means differ",
            "H₀: all treatment means are equal",
            "whether data are normal"
          ],
          "answer": 2,
          "explanation": "Against H₁: not all equal."
        },
        {
          "question": "ANOVA is preferred to testing every pair of means because",
          "options": [
            "many pairwise tests inflate the chance of a false significant result",
            "pairwise tests need larger samples",
            "ANOVA needs no assumptions",
            "pairwise tests cannot use $z$"
          ],
          "answer": 0,
          "explanation": "One test at one level $\\alpha$."
        },
        {
          "question": "Which is NOT an assumption of ANOVA?",
          "options": [
            "Normal populations",
            "Equal population variances",
            "Equal sample sizes",
            "Random, independent samples"
          ],
          "answer": 2,
          "explanation": "NERI. Unequal group sizes are allowed."
        },
        {
          "question": "Comparing production on different days of the week, the factor is",
          "options": [
            "production volume",
            "the day of the week",
            "Monday",
            "the F ratio"
          ],
          "answer": 1,
          "explanation": "Production is the response; each day is a level."
        },
        {
          "question": "In one-way ANOVA, $SST = $",
          "options": [
            "$SSB - SSW$",
            "$SSB \\times SSW$",
            "$\\frac{SSB}{SSW}$",
            "$SSB + SSW$"
          ],
          "answer": 3,
          "explanation": "Total variation = between + within."
        },
        {
          "question": "The correction factor is",
          "options": [
            "$CF = \\frac{T^2}{n}$",
            "$CF = \\frac{T}{n}$",
            "$CF = \\sum x^2$",
            "$CF = \\frac{n}{T^2}$"
          ],
          "answer": 0,
          "explanation": "$T$ is the grand total."
        },
        {
          "question": "$SSB$ by the short-cut is",
          "options": [
            "$\\sum x^2 - CF$",
            "$SST + SSW$",
            "$\\sum\\frac{T_j^2}{n_j} - CF$",
            "$\\frac{T^2}{n}$"
          ],
          "answer": 2,
          "explanation": "Each treatment total squared over its own size."
        },
        {
          "question": "With $k$ treatments and $n$ observations, the within df is",
          "options": [
            "$k - 1$",
            "$n - 1$",
            "$(k - 1)(n - 1)$",
            "$n - k$"
          ],
          "answer": 3,
          "explanation": "Each sample contributes $n_j - 1$."
        },
        {
          "question": "The F ratio in one-way ANOVA is",
          "options": [
            "$\\frac{MSW}{MSB}$",
            "$\\frac{MSB}{MSW}$",
            "$\\frac{SSB}{SSW}$",
            "$MSB - MSW$"
          ],
          "answer": 1,
          "explanation": "Mean squares, not sums of squares."
        },
        {
          "question": "A large F suggests that",
          "options": [
            "all means are equal",
            "the treatment means are not all equal",
            "the variances are unequal",
            "the samples are too small"
          ],
          "answer": 1,
          "explanation": "Between-group variation outweighs random error."
        },
        {
          "question": "Yields A: $20, 24, 22, 26$; B: $28, 30, 27, 31, 29$; C: $23, 25, 24$ give $SST = 124.25$, $SSB = 92.25$. $SSW = $",
          "options": [
            "$32.00$",
            "$216.50$",
            "$92.25$",
            "$1.35$"
          ],
          "answer": 0,
          "explanation": "$124.25 - 92.25$."
        },
        {
          "question": "For the yields, $F = \\frac{46.125}{3.556} = 12.97$ against $F_{0.05}(2, 9) = 4.26$. Conclusion:",
          "options": [
            "all fertilisers are equal",
            "the test needs blocks",
            "the fertilisers do not all give the same mean yield",
            "use $\\chi^2$ instead"
          ],
          "answer": 2,
          "explanation": "$12.97 > 4.26$."
        },
        {
          "question": "$4$ treatments, $24$ observations, $SSW = 120$, $SST = 180$. $F = $",
          "options": [
            "$0.5$",
            "$1.5$",
            "$2.67$",
            "$3.33$"
          ],
          "answer": 3,
          "explanation": "$MSB = \\frac{60}{3} = 20$, $MSW = \\frac{120}{20} = 6$."
        },
        {
          "question": "In the F table $F_\\alpha(\\nu_1, \\nu_2)$, $\\nu_1$ is",
          "options": [
            "the numerator (between) df",
            "the denominator df",
            "the total df",
            "the number of observations"
          ],
          "answer": 0,
          "explanation": "Columns are the numerator df."
        },
        {
          "question": "For $k = 3$ groups and $n = 15$ observations, the treatment test uses",
          "options": [
            "$F_{0.05}(2, 12)$",
            "$F_{0.05}(12, 2)$",
            "$F_{0.05}(3, 15)$",
            "$F_{0.05}(2, 14)$"
          ],
          "answer": 0,
          "explanation": "$k - 1 = 2$, $n - k = 12$."
        },
        {
          "question": "A block in a randomised block design is",
          "options": [
            "one treatment applied to all units",
            "a group of units alike in a nuisance factor, receiving every treatment once",
            "a random sample of treatments",
            "the error term"
          ],
          "answer": 1,
          "explanation": "Blocking removes the nuisance variation from the error."
        },
        {
          "question": "In two-way ANOVA, $SST = $",
          "options": [
            "$SSC + SSE$",
            "$SSC + SSR + SSE$",
            "$SSC \\times SSR$",
            "$SSC + SSR - SSE$"
          ],
          "answer": 1,
          "explanation": "Treatments, blocks and error."
        },
        {
          "question": "With $c$ treatments and $r$ blocks, the error df is",
          "options": [
            "$rc - 1$",
            "$c + r - 2$",
            "$(c - 1)(r - 1)$",
            "$rc - c$"
          ],
          "answer": 2,
          "explanation": "Check: $(c - 1) + (r - 1) + (c - 1)(r - 1) = rc - 1$."
        },
        {
          "question": "$SSC$ in two-way ANOVA is",
          "options": [
            "$\\frac{\\sum T_j^2}{c} - CF$",
            "$\\frac{\\sum T_j^2}{r} - CF$",
            "$\\frac{\\sum B_i^2}{c} - CF$",
            "$\\sum x^2 - CF$"
          ],
          "answer": 1,
          "explanation": "Column totals squared over the number of rows."
        },
        {
          "question": "$SSR$ in two-way ANOVA is",
          "options": [
            "$\\frac{\\sum B_i^2}{r} - CF$",
            "$\\frac{\\sum T_j^2}{r} - CF$",
            "$\\frac{\\sum B_i^2}{c} - CF$",
            "$SST - SSC$"
          ],
          "answer": 2,
          "explanation": "Block (row) totals squared over the number of columns."
        },
        {
          "question": "Four varieties in five blocks: error df $= $",
          "options": [
            "$16$",
            "$19$",
            "$7$",
            "$12$"
          ],
          "answer": 3,
          "explanation": "$3 \\times 4$."
        },
        {
          "question": "Teaching methods: $SST = 251.67$, $SSC = 112.67$, $SSR = 131$. $SSE = $",
          "options": [
            "$8.00$",
            "$139.00$",
            "$120.67$",
            "$-8.00$"
          ],
          "answer": 0,
          "explanation": "$251.67 - 112.67 - 131$."
        },
        {
          "question": "Two-way ANOVA gives a negative SSE. This means",
          "options": [
            "there is an arithmetic error",
            "blocks have no effect",
            "treatments are equal",
            "use its absolute value"
          ],
          "answer": 0,
          "explanation": "Sums of squares can never be negative."
        },
        {
          "question": "Two-way ANOVA gives two F tests:",
          "options": [
            "one for means and one for variances",
            "one for each block",
            "one for error and one for total",
            "one for treatments and one for blocks"
          ],
          "answer": 3,
          "explanation": "$F_1 = \\frac{MSC}{MSE}$, $F_2 = \\frac{MSR}{MSE}$."
        },
        {
          "question": "In a partly filled ANOVA table, MS for a row is",
          "options": [
            "SS times its df",
            "df divided by SS",
            "F times the error MS of another table",
            "SS divided by its df"
          ],
          "answer": 3,
          "explanation": "Then F = MS ÷ MS(error)."
        }
      ]
    },
    {
      "id": "QS006",
      "title": "Correlation and regression",
      "questions": [
        {
          "question": "Pearson's $r$ measures",
          "options": [
            "cause and effect",
            "any curved relationship",
            "the strength of a linear relationship",
            "the slope of the line"
          ],
          "answer": 2,
          "explanation": "From $-1$ to $1$."
        },
        {
          "question": "$r = 0$ means",
          "options": [
            "no relationship of any kind",
            "a perfect relationship",
            "no linear relationship (a curved one may still exist)",
            "the variables are equal"
          ],
          "answer": 2,
          "explanation": "$r$ only measures straight-line patterns."
        },
        {
          "question": "$r = -0.85$ describes",
          "options": [
            "a weak relationship",
            "no relationship",
            "a very strong positive relationship",
            "a very strong negative linear relationship"
          ],
          "answer": 3,
          "explanation": "Direction from the sign, strength from $|r|$."
        },
        {
          "question": "$r = 0.3$ describes",
          "options": [
            "a weak positive relationship",
            "a strong positive relationship",
            "a weak negative relationship",
            "no relationship"
          ],
          "answer": 0,
          "explanation": "$0.20$–$0.39$ is weak."
        },
        {
          "question": "If $r = 0.9$, the fraction of the variation in $y$ explained by the line is",
          "options": [
            "$90\\%$",
            "$95\\%$",
            "$81\\%$",
            "$10\\%$"
          ],
          "answer": 2,
          "explanation": "$r^2 = 0.81$."
        },
        {
          "question": "A strong correlation between ice-cream sales and drownings shows",
          "options": [
            "ice cream causes drowning",
            "they move together, perhaps both driven by hot weather",
            "drowning causes ice-cream sales",
            "the data are wrong"
          ],
          "answer": 1,
          "explanation": "Correlation is not causation."
        },
        {
          "question": "Which is a property of $r$?",
          "options": [
            "It is unchanged by a change of origin or positive scale",
            "It has the units of $y$",
            "It can exceed $1$",
            "$r_{xy} \\ne r_{yx}$"
          ],
          "answer": 0,
          "explanation": "It is a pure number between $-1$ and $1$."
        },
        {
          "question": "If your calculation gives $|r| = 1.3$,",
          "options": [
            "the relationship is very strong",
            "use $r^2$ instead",
            "there is an arithmetic error",
            "round it to $1$"
          ],
          "answer": 2,
          "explanation": "$|r|$ can never exceed $1$."
        },
        {
          "question": "$n = 6$, $\\sum x = 36$, $\\sum y = 168$, $\\sum xy = 1142$. The shared numerator $n\\sum xy - \\sum x\\sum y$ is",
          "options": [
            "$804$",
            "$1142$",
            "$6048$",
            "$-804$"
          ],
          "answer": 0,
          "explanation": "$6852 - 6048$."
        },
        {
          "question": "With numerator $804$ and $n\\sum x^2 - (\\sum x)^2 = 252$, $\\beta = $",
          "options": [
            "$3.190$",
            "$0.313$",
            "$804$",
            "$0.9994$"
          ],
          "answer": 0,
          "explanation": "$\\frac{804}{252}$."
        },
        {
          "question": "The regression line always passes through",
          "options": [
            "the origin",
            "$(0, \\bar y)$",
            "the first data point",
            "$(\\bar x, \\bar y)$"
          ],
          "answer": 3,
          "explanation": "$\\alpha = \\bar y - \\beta\\bar x$."
        },
        {
          "question": "The intercept of the regression line of $y$ on $x$ is",
          "options": [
            "$\\alpha = \\bar x - \\beta\\bar y$",
            "$\\alpha = \\bar y$",
            "$\\alpha = \\bar y - \\beta\\bar x$",
            "$\\alpha = \\beta\\bar x$"
          ],
          "answer": 2,
          "explanation": "\"y-bar minus beta x-bar\"."
        },
        {
          "question": "$\\beta$ and $r$ always have the same sign because",
          "options": [
            "$\\beta = r$",
            "each is less than $1$ in size",
            "the line passes through the origin",
            "they share the numerator and have positive denominators"
          ],
          "answer": 3,
          "explanation": "$S = n\\sum xy - \\sum x\\sum y$."
        },
        {
          "question": "The method of least squares chooses $\\alpha$ and $\\beta$ to minimise",
          "options": [
            "$\\sum(y_i - \\alpha - \\beta x_i)$",
            "$\\sum(y_i - \\alpha - \\beta x_i)^2$",
            "$\\sum|x_i - \\bar x|$",
            "$r^2$"
          ],
          "answer": 1,
          "explanation": "The total squared error $Q$."
        },
        {
          "question": "The first normal equation is",
          "options": [
            "$\\sum xy = \\alpha\\sum x + \\beta\\sum x^2$",
            "$\\sum y = \\alpha + \\beta\\sum x$",
            "$\\sum x = n\\alpha + \\beta\\sum y$",
            "$\\sum y = n\\alpha + \\beta\\sum x$"
          ],
          "answer": 3,
          "explanation": "From $\\frac{\\partial Q}{\\partial\\alpha} = 0$."
        },
        {
          "question": "The second normal equation is",
          "options": [
            "$\\sum y = n\\alpha + \\beta\\sum x$",
            "$\\sum xy = \\alpha\\sum x + \\beta\\sum x^2$",
            "$\\sum xy = n\\alpha + \\beta\\sum x$",
            "$\\sum x^2 = \\alpha\\sum x + \\beta\\sum xy$"
          ],
          "answer": 1,
          "explanation": "From $\\frac{\\partial Q}{\\partial\\beta} = 0$."
        },
        {
          "question": "$\\hat y = 33.99 + 4.073x$ (hours studied, score). The slope means",
          "options": [
            "each extra hour goes with about $4.07$ more marks",
            "the score is $4.07$ with no study",
            "$4.07$ hours are needed to pass",
            "$r = 4.07$"
          ],
          "answer": 0,
          "explanation": "The change in $y$ per unit of $x$."
        },
        {
          "question": "The hours data cover $2$ to $13$ hours. Predicting the score at $20$ hours is",
          "options": [
            "interpolation",
            "extrapolation, and unreliable",
            "reliable because $r$ is high",
            "impossible to calculate"
          ],
          "answer": 1,
          "explanation": "It gave $115.4$, impossible for a score out of $100$."
        },
        {
          "question": "$n = 10$, $\\sum x = 120$, $\\sum y = 480$, $\\sum xy = 6080$, $\\sum x^2 = 1560$. The line is",
          "options": [
            "$\\hat y = 48 + 2.667x$",
            "$\\hat y = 16 + 2.667x$",
            "$\\hat y = 2.667 + 16x$",
            "$\\hat y = 16 + 0.375x$"
          ],
          "answer": 1,
          "explanation": "$\\beta = \\frac{3200}{1200}$, $\\alpha = 48 - 32$."
        },
        {
          "question": "The regression of $x$ on $y$ has slope",
          "options": [
            "$\\frac{n\\sum xy - \\sum x\\sum y}{n\\sum x^2 - (\\sum x)^2}$",
            "$\\frac1\\beta$",
            "$r$",
            "$\\frac{n\\sum xy - \\sum x\\sum y}{n\\sum y^2 - (\\sum y)^2}$"
          ],
          "answer": 3,
          "explanation": "Same numerator, but the $y$ bracket below. And $r^2 = \\beta_{yx}\\beta_{xy}$."
        },
        {
          "question": "Spearman's rank correlation is",
          "options": [
            "$r_s = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)}$",
            "$r_s = 1 - \\frac{\\sum d^2}{n^2}$",
            "$r_s = \\frac{6\\sum d^2}{n(n^2 - 1)}$",
            "$r_s = 1 + \\frac{6\\sum d}{n}$"
          ],
          "answer": 0,
          "explanation": "$d$ is the difference in ranks."
        },
        {
          "question": "Two values tie for 3rd and 4th place. Each gets rank",
          "options": [
            "$3$",
            "$4$",
            "$7$",
            "$3.5$"
          ],
          "answer": 3,
          "explanation": "The average of the ranks they occupy."
        },
        {
          "question": "$10$ essays, $\\sum d^2 = 12$. $r_s = $",
          "options": [
            "$0.073$",
            "$0.927$",
            "$0.88$",
            "$-0.927$"
          ],
          "answer": 1,
          "explanation": "$1 - \\frac{72}{990}$."
        },
        {
          "question": "$n = 10$: numerator $890$, brackets $4644$ and $35425$. $r = $",
          "options": [
            "$0.069$",
            "$0.192$",
            "$0.69$",
            "$0.025$"
          ],
          "answer": 0,
          "explanation": "$\\frac{890}{\\sqrt{4644 \\times 35425}} = \\frac{890}{12826}$: very weak."
        },
        {
          "question": "With $r \\approx 0.07$, the fitted regression line",
          "options": [
            "gives very accurate predictions",
            "cannot be calculated",
            "is nearly useless for prediction",
            "has a negative slope"
          ],
          "answer": 2,
          "explanation": "$r^2 < 0.5\\%$ of the variation is explained."
        }
      ]
    },
    {
      "id": "QS007",
      "title": "Exam focus",
      "questions": [
        {
          "question": "\"State the Central Limit Theorem.\" The full answer includes",
          "options": [
            "the population becomes normal for large $n$",
            "$\\bar X$ is exactly normal for any $n$",
            "the sample variance equals $\\sigma^2$",
            "large $n$; $\\bar X$ approximately normal; mean $\\mu$, variance $\\frac{\\sigma^2}{n}$, whatever the population"
          ],
          "answer": 3,
          "explanation": "Add the rule of thumb $n \\ge 30$."
        },
        {
          "question": "$500$ students, $\\mu = 62$, $\\sigma = 10$; $64$ sampled without replacement. The SE of $\\bar X$ is",
          "options": [
            "$1.25$",
            "$1.1684$",
            "$0.156$",
            "$10$"
          ],
          "answer": 1,
          "explanation": "$1.25\\sqrt{\\frac{436}{499}} = 1.25(0.9348)$."
        },
        {
          "question": "Bulbs: A $1200$ h ($\\sigma = 90$, $n = 50$), B $1150$ h ($\\sigma = 120$, $n = 60$). The SE of $\\bar X_A - \\bar X_B$ is",
          "options": [
            "$9.69$",
            "$402$",
            "$30$",
            "$20.05$"
          ],
          "answer": 3,
          "explanation": "$\\sqrt{162 + 240} = \\sqrt{402}$."
        },
        {
          "question": "How large must $n$ be for $\\bar x$ to be within $2$ of $\\mu$ with probability $0.95$, if $\\sigma = 10$?",
          "options": [
            "$97$",
            "$96$",
            "$10$",
            "$25$"
          ],
          "answer": 0,
          "explanation": "$1.96\\frac{10}{\\sqrt n} \\le 2$ gives $n \\ge 96.04$."
        },
        {
          "question": "Grouped heights: $\\sum f = 100$, $\\sum f(x - \\bar x)^2 = 2681$. The unbiased variance is",
          "options": [
            "$26.81$",
            "$2681$",
            "$27.08$",
            "$5.20$"
          ],
          "answer": 2,
          "explanation": "Divide by $n - 1 = 99$."
        },
        {
          "question": "$140$ of $400$ adults smoke. The $95\\%$ interval for $p$ is",
          "options": [
            "$(0.288, 0.412)$",
            "$(0.326, 0.374)$",
            "$(0.303, 0.397)$",
            "$(0.35, 0.65)$"
          ],
          "answer": 2,
          "explanation": "SE $= 0.02385$, margin $0.0467$."
        },
        {
          "question": "Which of $T_1 = \\frac{X_1 + X_2}{2}$, $T_3 = \\frac{X_1 + X_2 + X_3}{2}$, $T_4 = \\frac{X_1 + X_2 + X_3}{3}$ is biased?",
          "options": [
            "$T_1$",
            "$T_4$",
            "None of them",
            "$T_3$"
          ],
          "answer": 3,
          "explanation": "Its weights add to $\\frac32$."
        },
        {
          "question": "$\\text{RE}(T_4, T_1)$ for $T_4 = \\bar X_3$ and $T_1 = \\frac{X_1 + X_2}{2}$ is",
          "options": [
            "$0.67$",
            "$1$",
            "$3$",
            "$1.5$"
          ],
          "answer": 3,
          "explanation": "$\\frac{\\sigma^2/2}{\\sigma^2/3}$."
        },
        {
          "question": "For a Poisson sample, the Cramér–Rao bound for unbiased estimators of $\\lambda$ is",
          "options": [
            "$\\frac{1}{n\\lambda}$",
            "$\\frac\\lambda n$",
            "$\\lambda$",
            "$\\frac{\\lambda^2}{n}$"
          ],
          "answer": 1,
          "explanation": "$I(\\lambda) = \\frac1\\lambda$, so $\\frac{1}{nI} = \\frac\\lambda n$; $\\bar X$ attains it."
        },
        {
          "question": "Power of a test is defined as",
          "options": [
            "the probability of rejecting H₀ when it is true",
            "the probability of rejecting H₀ when it is false",
            "the probability of accepting H₀",
            "$1 - \\alpha$"
          ],
          "answer": 1,
          "explanation": "$1 - \\beta$."
        },
        {
          "question": "School A ($68$) vs B ($64$) gives $z = 1.88$. At $5\\%$:",
          "options": [
            "different at both",
            "no difference either way",
            "A is lower",
            "no difference two-tailed, but A is higher one-tailed"
          ],
          "answer": 3,
          "explanation": "$1.645 < 1.88 < 1.96$."
        },
        {
          "question": "Town P $45/150$, town Q $30/150$ prefer brand X. At $5\\%$, $z = $",
          "options": [
            "$1.00$: no difference",
            "$2.00$: the proportions differ",
            "$2.00$: no difference",
            "$15$: differ"
          ],
          "answer": 1,
          "explanation": "Pooled $\\bar p = 0.25$, SE $= 0.05$."
        },
        {
          "question": "Calls per minute fitted to a Poisson: $\\chi^2 = 0.74$, df $= 3$. Conclusion:",
          "options": [
            "the Poisson does not fit",
            "df must be $4$",
            "the Poisson distribution fits well",
            "use Yates' correction"
          ],
          "answer": 2,
          "explanation": "$0.74 < 7.815$."
        },
        {
          "question": "Agree/neutral/disagree by gender: $\\chi^2 = 8.167$, df $= 2$. Conclusion at $5\\%$:",
          "options": [
            "opinion is independent of gender",
            "accept H₀",
            "opinion depends on gender",
            "df $= 6$"
          ],
          "answer": 2,
          "explanation": "$8.167 > 5.991$."
        },
        {
          "question": "Treatment: $18$ recovered, $12$ not; placebo: $7$, $23$. Yates' $\\chi^2$ is",
          "options": [
            "$6.857$",
            "$8.297$",
            "$3.841$",
            "$25$"
          ],
          "answer": 0,
          "explanation": "$8.297$ is the uncorrected value."
        },
        {
          "question": "Travel by faculty (three samples of $100$): $\\chi^2 = 24.0$. Test and df:",
          "options": [
            "independence, df $= 8$",
            "homogeneity, df $= 4$",
            "goodness of fit, df $= 2$",
            "homogeneity, df $= 2$"
          ],
          "answer": 1,
          "explanation": "Three samples compared on a $3 \\times 3$ table."
        },
        {
          "question": "Variance should be $16$; $25$ measurements give $s^2 = 26.5$. $\\chi^2 = $",
          "options": [
            "$41.41$",
            "$1.66$",
            "$39.75$",
            "$7.72$"
          ],
          "answer": 2,
          "explanation": "$\\frac{24 \\times 26.5}{16}$; df $= 24$, $39.75 > 36.415$."
        },
        {
          "question": "Methods with $T = 370, 260, 496$ ($n_j = 5, 4, 6$) and $CF = 84525.07$. $SSB = $",
          "options": [
            "$757.60$",
            "$996.93$",
            "$239.33$",
            "$85282.67$"
          ],
          "answer": 0,
          "explanation": "$27380 + 16900 + 41002.67 - CF$."
        },
        {
          "question": "That ANOVA has $F = 18.99$ against $F_{0.05}(2, 12) = 3.89$. Conclusion:",
          "options": [
            "the teaching methods differ",
            "the methods are equal",
            "the blocks differ",
            "accept H₀"
          ],
          "answer": 0,
          "explanation": "$18.99 > 3.89$."
        },
        {
          "question": "Maize: $SST = 153.2$, $SSC = 96.4$, $SSR = 54.2$. $SSE$ and error df ($4$ varieties, $5$ blocks) are",
          "options": [
            "$2.6$ and $16$",
            "$56.8$ and $12$",
            "$150.6$ and $19$",
            "$2.6$ and $12$"
          ],
          "answer": 3,
          "explanation": "$153.2 - 96.4 - 54.2$; $(4 - 1)(5 - 1)$."
        },
        {
          "question": "For $10$ pairs, $r = 0.858$. The coefficient of determination is",
          "options": [
            "$0.736$",
            "$0.858$",
            "$0.926$",
            "$0.142$"
          ],
          "answer": 0,
          "explanation": "$r^2$."
        },
        {
          "question": "$\\hat y = 16 + 2.667x$ fitted for $x$ from $6$ to $18$. At $x = 15$, $\\hat y = $",
          "options": [
            "$56$",
            "$40$",
            "$42.67$",
            "$56.67$"
          ],
          "answer": 0,
          "explanation": "$16 + 2.667 \\times 15 = 56.0$."
        },
        {
          "question": "Deriving the normal equations starts by",
          "options": [
            "setting $r = 1$",
            "setting $\\frac{\\partial Q}{\\partial\\alpha} = 0$ and $\\frac{\\partial Q}{\\partial\\beta} = 0$ for $Q = \\sum(y_i - \\alpha - \\beta x_i)^2$",
            "assuming the line passes through the origin",
            "differentiating $\\sum y$ with respect to $x$"
          ],
          "answer": 1,
          "explanation": "Minimise the total squared error."
        },
        {
          "question": "Two judges' ranks give $\\sum d^2 = 3.5$ for $8$ contestants. $r_s = $",
          "options": [
            "$0.042$",
            "$0.56$",
            "$0.958$",
            "$0.995$"
          ],
          "answer": 2,
          "explanation": "$1 - \\frac{21}{504}$."
        },
        {
          "question": "\"Distinguish between a census, a population and a sample.\" The best answer is",
          "options": [
            "the population is the whole group; a census studies all of it; a sample studies part of it",
            "a census is a sample of the population",
            "a population is a part of a sample",
            "they mean the same thing"
          ],
          "answer": 0,
          "explanation": "Write one clear sentence for each."
        }
      ]
    }
  ]
};
