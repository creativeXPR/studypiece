// STA 121 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "STA 121",
  "title": "",
  "sets": [
    {
      "id": "QS001",
      "questions": [
        {
          "question": "A researcher stands outside a grocery store and asks every 10th person who exits to complete a survey. This is an example of:",
          "options": [
            "Simple Random Sampling",
            "Stratified Sampling",
            "Systematic Sampling",
            "Convenience Sampling"
          ],
          "answer": 2,
          "explanation": "Systematic sampling involves selecting individuals at a fixed, periodic interval (e.g., every 10th person), which is exactly what the researcher is doing."
        },
        {
          "question": "The entire group of individuals a researcher is interested in studying is called the:",
          "options": [
            "Sample",
            "Population",
            "Statistic",
            "Parameter"
          ],
          "answer": 1,
          "explanation": "By definition, the population is the entire set of individuals or items of interest."
        },
        {
          "question": "According to the Central Limit Theorem, for a large enough sample size, the sampling distribution of the sample mean will be:",
          "options": [
            "Approximately normal, regardless of the population's distribution",
            "Exactly normal, regardless of the population's distribution",
            "Approximately normal only if the population distribution is normal",
            "Identical to the population distribution"
          ],
          "answer": 0,
          "explanation": "The power of the CLT is that it states the sampling distribution of the mean becomes approximately normal for large samples (typically $n \\geq 30$), even if the original population distribution is skewed, uniform, or has any other shape."
        },
        {
          "question": "The mean of the sampling distribution of the sample mean $(\\bar{x})$ is always equal to:",
          "options": [
            "The sample mean",
            "The population mean $(\\mu)$",
            "The population standard deviation $(\\sigma)$",
            "Zero"
          ],
          "answer": 1,
          "explanation": "A fundamental property of the sampling distribution of $\\bar{x}$ is that its mean, denoted $\\mu_{\\bar{x}}$, is equal to the population mean, $\\mu$. This is true for any sample size."
        },
        {
          "question": "If the population standard deviation is $\\sigma$ and the sample size is $n$, the standard deviation of the sampling distribution of the sample mean is:",
          "options": [
            "$\\sigma$",
            "$\\sigma^2$",
            "$\\frac{\\sigma}{\\sqrt{n}}$",
            "$\\frac{\\sigma}{n}$"
          ],
          "answer": 2,
          "explanation": "The standard error of the mean quantifies how much the sample mean varies from sample to sample. Its formula is $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$."
        },
        {
          "question": "A 95% confidence interval for a population mean is calculated from a sample. The correct interpretation is:",
          "options": [
            "There is a 95% probability that the population mean lies within the interval",
            "95% of the sample data lies within the interval",
            "If we repeated the sampling process many times, 95% of the calculated intervals would contain the population mean",
            "The population mean is definitely within the interval"
          ],
          "answer": 2,
          "explanation": "The confidence level refers to the long-run success rate of the method, not the probability for any one specific interval. Once an interval is calculated, the population mean is either in it or not."
        },
        {
          "question": "Which of the following would result in a narrower confidence interval for a population mean?",
          "options": [
            "Increasing the confidence level (e.g., from 90% to 95%)",
            "Increasing the sample size",
            "Increasing the population standard deviation",
            "Increasing the variability in the sample"
          ],
          "answer": 1,
          "explanation": "A larger sample size $(n)$ reduces the standard error $(\\frac{\\sigma}{\\sqrt{n}})$, which is a component of the margin of error. A smaller margin of error results in a narrower confidence interval."
        },
        {
          "question": "The null hypothesis $(H_0)$ in a statistical test is:",
          "options": [
            "The hypothesis the researcher wants to prove",
            "The hypothesis of no effect, no difference, or status quo",
            "Always stated in terms of a sample statistic",
            "Proven true if the test is significant"
          ],
          "answer": 1,
          "explanation": "The null hypothesis represents a default position, a statement of 'no change' or 'no relationship.' The goal of the test is often to gather evidence against $H_0$."
        },
        {
          "question": "A p-value is the probability, assuming the null hypothesis is true, of obtaining a:",
          "options": [
            "Sample statistic as extreme as or more extreme than the one observed",
            "Population parameter as extreme as or more extreme than the one observed",
            "Sample statistic exactly equal to the one observed",
            "Null hypothesis that is true"
          ],
          "answer": 0,
          "explanation": "This is the precise definition of a p-value. It measures how compatible your data is with the null hypothesis. A small p-value indicates that your data is unlikely if $H_0$ were true."
        },
        {
          "question": "A result is called 'statistically significant' when:",
          "options": [
            "The p-value is large",
            "The p-value is small (typically less than the significance level $\\alpha$)",
            "The null hypothesis is true",
            "The sample size is large"
          ],
          "answer": 1,
          "explanation": "Statistical significance is a formal decision. If the p-value is less than the pre-determined significance level ($\\alpha$, often 0.05), we reject the null hypothesis and declare the result statistically significant."
        },
        {
          "question": "A Type I error occurs when we:",
          "options": [
            "Reject a true null hypothesis",
            "Fail to reject a false null hypothesis",
            "Reject a false null hypothesis",
            "Fail to reject a true null hypothesis"
          ],
          "answer": 0,
          "explanation": "A Type I error is a 'false positive.' We conclude there is an effect or difference when there really isn't one."
        },
        {
          "question": "The correlation coefficient, $r$, measures:",
          "options": [
            "The causal relationship between two variables",
            "The strength and direction of the linear relationship between two quantitative variables",
            "The average value of the two variables",
            "The slope of the regression line"
          ],
          "answer": 1,
          "explanation": "The correlation coefficient $(r)$ quantifies the degree to which two variables are linearly related. It ranges from -1 (perfect negative) to +1 (perfect positive)."
        },
        {
          "question": "A scatterplot shows a pattern where as variable $X$ increases, variable $Y$ tends to decrease. This indicates a:",
          "options": [
            "Positive correlation",
            "Negative correlation",
            "No correlation",
            "Curvilinear relationship"
          ],
          "answer": 1,
          "explanation": "A negative correlation means that as one variable increases, the other tends to decrease."
        },
        {
          "question": "In the regression equation $\\hat{y} = 5 + 2x$, the slope is:",
          "options": [
            "5",
            "2",
            "$x$",
            "$\\hat{y}$"
          ],
          "answer": 1,
          "explanation": "The coefficient in front of the $x$ variable is the slope. It represents the change in $y$ for a one-unit increase in $x$."
        },
        {
          "question": "The coefficient of determination, $R^2$, represents:",
          "options": [
            "The correlation between $x$ and $y$",
            "The proportion of the variation in $y$ that is explained by the linear relationship with $x$",
            "The slope of the regression line",
            "The intercept of the regression line"
          ],
          "answer": 1,
          "explanation": "$R^2$ is a key value in regression. It tells us what percentage of the total variability in the $y$-values can be accounted for by the linear regression on $x$."
        },
        {
          "question": "A population has a mean of 100 and standard deviation of 15. You take a simple random sample of size 100. What is the mean of the sampling distribution of $\\bar{x}$?",
          "options": [
            "15",
            "1.5",
            "100",
            "It cannot be determined"
          ],
          "answer": 2,
          "explanation": "The mean of the sampling distribution of $\\bar{x}$ is always the population mean, which is 100. The sample size does not affect this center."
        },
        {
          "question": "For the same population ($\\mu=100$, $\\sigma=15$) and sample size ($n=100$), what is the standard error of the mean?",
          "options": [
            "15",
            "1.5",
            "100",
            "10"
          ],
          "answer": 1,
          "explanation": "The standard error is $\\frac{\\sigma}{\\sqrt{n}} = \\frac{15}{\\sqrt{100}} = \\frac{15}{10} = 1.5$."
        },
        {
          "question": "As the sample size $(n)$ increases, the standard error of the mean:",
          "options": [
            "Increases",
            "Decreases",
            "Stays the same",
            "Becomes unpredictable"
          ],
          "answer": 1,
          "explanation": "Since the standard error is $\\frac{\\sigma}{\\sqrt{n}}$, as the denominator $(\\sqrt{n})$ gets larger, the overall value gets smaller. Larger samples lead to more precise estimates."
        },
        {
          "question": "The margin of error in a confidence interval for a population mean depends on all of the following EXCEPT:",
          "options": [
            "The sample size",
            "The population mean",
            "The confidence level",
            "The population standard deviation"
          ],
          "answer": 1,
          "explanation": "The margin of error is (Critical Value) $\\times$ (Standard Error). The standard error is $\\frac{\\sigma}{\\sqrt{n}}$, which depends on sample size and population standard deviation. The critical value depends on confidence level. It does not depend on the population mean itself."
        },
        {
          "question": "For a fixed sample size and population standard deviation, which confidence level will produce the widest interval?",
          "options": [
            "90%",
            "95%",
            "99%",
            "They will all be the same width"
          ],
          "answer": 2,
          "explanation": "A higher confidence level means you want to be more sure of capturing the true mean. To be more sure, you need to cast a wider net. The critical value is larger for a 99% interval."
        },
        {
          "question": "The power of a hypothesis test is:",
          "options": [
            "The probability of making a Type I error",
            "The probability of making a Type II error",
            "The probability of correctly rejecting a false null hypothesis",
            "The probability of correctly failing to reject a true null hypothesis"
          ],
          "answer": 2,
          "explanation": "Power is $(1 - \\beta)$, where $\\beta$ is the probability of a Type II error. It is the test's ability to detect an effect when there truly is one."
        },
        {
          "question": "A two-tailed test is used when:",
          "options": [
            "The alternative hypothesis is directional (e.g., $\\mu > 100$)",
            "The alternative hypothesis is non-directional (e.g., $\\mu \\neq 100$)",
            "The null hypothesis involves an inequality",
            "The sample size is small"
          ],
          "answer": 1,
          "explanation": "A two-tailed test is appropriate when we are interested in a deviation from $H_0$ in either direction. The rejection region is split between both tails of the distribution."
        },
        {
          "question": "If the correlation between height and weight is 0.70, then the coefficient of determination $R^2$ is:",
          "options": [
            "0.70",
            "0.49",
            "0.30",
            "1.40"
          ],
          "answer": 1,
          "explanation": "$R^2$ is the square of the correlation coefficient. $(0.70)^2 = 0.49$."
        },
        {
          "question": "A residual in regression is:",
          "options": [
            "The difference between the actual $y$-value and the predicted $y$-value $(\\hat{y})$",
            "The slope of the regression line",
            "The intercept of the regression line",
            "The correlation coefficient"
          ],
          "answer": 0,
          "explanation": "A residual is $e = y - \\hat{y}$. It is the vertical distance from an actual data point to the regression line."
        },
        {
          "question": "The primary goal of inferential statistics is to:",
          "options": [
            "Describe and summarize a dataset using graphs and numbers",
            "Make predictions or generalizations about a population based on sample data",
            "Collect data in an organized way",
            "Present data in a clear and understandable format"
          ],
          "answer": 1,
          "explanation": "Descriptive statistics summarize the data you have. Inferential statistics use that sample data to make conclusions (inferences) about a larger population. This includes confidence intervals and hypothesis testing."
        }
      ]
    },
    {
      "id": "QS002",
      "questions": [
        {
          "question": "Which of the following is a key advantage of stratified sampling over simple random sampling?",
          "options": [
            "It is always easier to implement",
            "It guarantees a perfectly representative sample",
            "It ensures representation from all important subgroups within the population",
            "It requires no prior knowledge of the population"
          ],
          "answer": 2,
          "explanation": "Stratified sampling involves dividing the population into homogeneous groups (strata) and sampling from each, which ensures that all segments of the population are represented in the sample."
        },
        {
          "question": "A numerical characteristic of a sample, such as the sample mean, is known as a:",
          "options": [
            "Population",
            "Parameter",
            "Statistic",
            "Census"
          ],
          "answer": 2,
          "explanation": "A statistic is a numerical value calculated from sample data (e.g., sample mean, sample proportion) and is used to estimate a population parameter."
        },
        {
          "question": "For the sampling distribution of the sample proportion $\\hat{p}$ to be approximately normal, which condition must be met?",
          "options": [
            "$n \\geq 30$",
            "The population must be normally distributed",
            "$np \\geq 5$ and $n(1-p) \\geq 5$",
            "The sample must be a simple random sample"
          ],
          "answer": 2,
          "explanation": "The rule of thumb for the normal approximation of a sample proportion is that the expected number of 'successes' $(np)$ and 'failures' $(n(1-p))$ should both be at least 5."
        },
        {
          "question": "If a population is normally distributed, what can be said about the sampling distribution of the sample mean for any sample size $n$?",
          "options": [
            "It is approximately normal only if $n$ is large",
            "It is exactly normal for any $n$",
            "It is skewed if $n$ is small",
            "It is uniform"
          ],
          "answer": 1,
          "explanation": "If the population itself is normally distributed, then the sampling distribution of the sample mean is also normally distributed, regardless of how small or large the sample size is."
        },
        {
          "question": "The standard error of the sample proportion $\\hat{p}$ is calculated as:",
          "options": [
            "$\\sqrt{p(1-p)}$",
            "$\\sqrt{\\frac{p(1-p)}{n}}$",
            "$\\frac{p(1-p)}{n}$",
            "$\\frac{p}{n}$"
          ],
          "answer": 1,
          "explanation": "The formula for the standard error of the sample proportion is $SE(\\hat{p}) = \\sqrt{\\frac{p(1-p)}{n}}$, where $p$ is the population proportion."
        },
        {
          "question": "When the population standard deviation $(\\sigma)$ is unknown, which distribution is used to construct a confidence interval for the mean?",
          "options": [
            "The standard normal (Z) distribution",
            "The t-distribution",
            "The binomial distribution",
            "The population distribution"
          ],
          "answer": 1,
          "explanation": "When $\\sigma$ is unknown, we use the sample standard deviation $(s)$ to estimate it. This introduces extra uncertainty, which is accounted for by using the t-distribution."
        },
        {
          "question": "The t-distribution is similar to the standard normal distribution except that it:",
          "options": [
            "Has a mean of 0",
            "Is symmetric and bell-shaped",
            "Has heavier tails, meaning it is more spread out",
            "Is defined by its mean and standard deviation"
          ],
          "answer": 2,
          "explanation": "The key difference is that the t-distribution has more probability in its tails than the normal distribution. This accounts for the added uncertainty of estimating $\\sigma$ with $s$."
        },
        {
          "question": "The significance level, denoted by $\\alpha$ (alpha), is:",
          "options": [
            "The probability of rejecting the null hypothesis when it is true (Type I error)",
            "The probability of failing to reject the null hypothesis when it is false (Type II error)",
            "The power of the test",
            "The same as the p-value"
          ],
          "answer": 0,
          "explanation": "Alpha is the threshold we set for how much risk of a Type I error we are willing to accept. It is the probability of rejecting a true null hypothesis."
        },
        {
          "question": "A Type II error occurs when we:",
          "options": [
            "Reject a true null hypothesis",
            "Fail to reject a false null hypothesis",
            "Reject a false null hypothesis",
            "Fail to reject a true null hypothesis"
          ],
          "answer": 1,
          "explanation": "A Type II error is a 'false negative.' We fail to detect an effect or difference that actually exists."
        },
        {
          "question": "Which of the following will increase the power of a test?",
          "options": [
            "Decreasing the sample size",
            "Increasing the significance level $(\\alpha)$",
            "Increasing the probability of a Type II error $(\\beta)$",
            "Making the alternative hypothesis less extreme"
          ],
          "answer": 1,
          "explanation": "Increasing $\\alpha$ (e.g., from 0.01 to 0.05) makes it easier to reject $H_0$, which increases the power. Increasing the sample size is the most common way to increase power."
        },
        {
          "question": "A test of $H_0: \\mu = 50$ vs. $H_1: \\mu > 50$ is a:",
          "options": [
            "Two-tailed test",
            "Left-tailed test",
            "Right-tailed test",
            "Non-directional test"
          ],
          "answer": 2,
          "explanation": "The alternative hypothesis $(\\mu > 50)$ specifies that the parameter is greater than the null value. This is a right-tailed test."
        },
        {
          "question": "The value of the correlation coefficient $r$ is always between:",
          "options": [
            "0 and 1",
            "-1 and 1",
            "$-\\infty$ and $\\infty$",
            "0 and 100"
          ],
          "answer": 1,
          "explanation": "By definition, the Pearson correlation coefficient $r$ always falls between -1 and +1, inclusive."
        },
        {
          "question": "A correlation of $r = 0.85$ indicates a:",
          "options": [
            "Strong positive linear relationship",
            "Weak positive linear relationship",
            "Strong negative linear relationship",
            "Weak negative linear relationship"
          ],
          "answer": 0,
          "explanation": "The closer $|r|$ is to 1, the stronger the linear relationship. A value of 0.85 is considered a strong positive correlation."
        },
        {
          "question": "In the regression equation $\\hat{y} = 5 + 2x$, the intercept is:",
          "options": [
            "5",
            "2",
            "$x$",
            "$\\hat{y}$"
          ],
          "answer": 0,
          "explanation": "The constant term (5) is the y-intercept. It is the predicted value of $y$ when $x = 0$."
        },
        {
          "question": "The slope in a regression equation represents:",
          "options": [
            "The predicted value of $y$ when $x=0$",
            "The average change in $y$ for a one-unit increase in $x$",
            "The strength of the correlation",
            "The value of the correlation coefficient"
          ],
          "answer": 1,
          "explanation": "This is the interpretation of the slope. If the slope is 2, it means that for every one-unit increase in $x$, we predict $y$ will increase by 2 units (on average)."
        },
        {
          "question": "A population is heavily skewed to the right. If we take a sample of size 50, the sampling distribution of the sample mean will be:",
          "options": [
            "Heavily skewed to the right, just like the population",
            "Approximately normal because of the Central Limit Theorem",
            "Uniformly distributed",
            "Skewed to the left"
          ],
          "answer": 1,
          "explanation": "With a sample size of 50 (which is generally considered 'large enough'), the CLT states that the sampling distribution of the mean will be approximately normal, even though the population is skewed."
        },
        {
          "question": "The standard error of the mean is affected by:",
          "options": [
            "The sample size and the population standard deviation",
            "The sample size and the sample mean",
            "The population mean and the population standard deviation",
            "The sample mean and the population mean"
          ],
          "answer": 0,
          "explanation": "The formula is $\\frac{\\sigma}{\\sqrt{n}}$. It depends directly on the population standard deviation $(\\sigma)$ and the sample size $(n)$."
        },
        {
          "question": "If you double the sample size from $n$ to $2n$, what happens to the standard error of the mean?",
          "options": [
            "It doubles",
            "It is halved",
            "It decreases by a factor of $\\sqrt{2}$",
            "It increases by a factor of $\\sqrt{2}$"
          ],
          "answer": 2,
          "explanation": "The original SE is $\\frac{\\sigma}{\\sqrt{n}}$. The new SE is $\\frac{\\sigma}{\\sqrt{2n}} = \\frac{\\sigma}{\\sqrt{2} \\cdot \\sqrt{n}} = \\frac{1}{\\sqrt{2}} \\cdot \\frac{\\sigma}{\\sqrt{n}}$. So it decreases by a factor of $\\sqrt{2}$."
        },
        {
          "question": "A researcher calculates a 90% confidence interval for a proportion to be (0.45, 0.55). This means:",
          "options": [
            "The sample proportion is 0.50",
            "The margin of error is 0.05",
            "There is a 90% chance the true proportion is between 0.45 and 0.55",
            "Both I and II are correct"
          ],
          "answer": 3,
          "explanation": "The interval is centered at the sample proportion: $(0.45+0.55)/2 = 0.50$. The margin of error is half the width: $(0.55-0.45)/2 = 0.05$. Statement III is the common misinterpretation."
        },
        {
          "question": "The degrees of freedom for a one-sample t-interval for the mean are:",
          "options": [
            "$n$",
            "$n - 1$",
            "$\\sigma$",
            "$Z$"
          ],
          "answer": 1,
          "explanation": "For a one-sample t-procedure, the degrees of freedom are calculated as $n - 1$. This is related to the number of independent pieces of information available to estimate the population standard deviation."
        },
        {
          "question": "As the degrees of freedom for a t-distribution increase, the distribution:",
          "options": [
            "Becomes more spread out",
            "Becomes more skewed",
            "Approaches the standard normal distribution",
            "Becomes uniform"
          ],
          "answer": 2,
          "explanation": "As the sample size (and thus the degrees of freedom) increases, our estimate $s$ becomes a better estimate of $\\sigma$. The extra uncertainty decreases, and the t-distribution approaches the Z-distribution."
        },
        {
          "question": "In a hypothesis test, if the p-value is 0.02 and the significance level is $\\alpha = 0.05$, the correct decision is to:",
          "options": [
            "Reject the null hypothesis",
            "Fail to reject the null hypothesis",
            "Accept the null hypothesis",
            "Accept the alternative hypothesis"
          ],
          "answer": 0,
          "explanation": "Since the p-value (0.02) is less than $\\alpha$ (0.05), we have sufficient evidence to reject the null hypothesis."
        },
        {
          "question": "If $R^2 = 0.64$ for a regression model, this means that:",
          "options": [
            "The correlation $r = 0.8$",
            "64% of the variation in $y$ is explained by the model",
            "The slope is 0.64",
            "Both I and II are possible (depending on the sign of $r$)"
          ],
          "answer": 3,
          "explanation": "$R^2$ is the square of the correlation coefficient $r$. So if $R^2=0.64$, then $r = \\pm 0.8$. The statement '64% of the variation is explained' is the direct interpretation of $R^2$."
        },
        {
          "question": "A residual plot that shows a random scatter of points around zero indicates:",
          "options": [
            "The linear model is appropriate",
            "The linear model is not appropriate",
            "There is a non-linear relationship",
            "The correlation is zero"
          ],
          "answer": 0,
          "explanation": "A random scatter in the residual plot suggests that the linear model has captured the underlying trend well, and there is no obvious pattern left in the errors."
        },
        {
          "question": "Correlation does not imply causation because:",
          "options": [
            "The correlation could be due to a lurking variable that affects both $x$ and $y$",
            "The relationship could be coincidental",
            "The direction of cause and effect could be reversed",
            "All of the above"
          ],
          "answer": 3,
          "explanation": "This is a fundamental principle of statistics. Just because two variables are correlated does not mean one causes the other. There could be a third variable influencing both, or it could be coincidence, or cause-and-effect could be reversed."
        }
      ]
    },
    {
      "id": "QS003",
      "questions": [
        {
          "question": "A list of every member of the population from which a sample is drawn is called a:",
          "options": [
            "Parameter list",
            "Sampling frame",
            "Statistic log",
            "Census record"
          ],
          "answer": 1,
          "explanation": "The sampling frame is the actual list of individuals from which the sample is selected. An imperfect sampling frame is a common source of sampling error."
        },
        {
          "question": "The Central Limit Theorem is considered 'central' to statistics because it:",
          "options": [
            "Was discovered by a scientist named Central",
            "Allows us to use normal probability calculations for inference about means, even when the population is not normal",
            "Is only useful for data that is centrally located",
            "Guarantees that the sample mean is always at the center of the data"
          ],
          "answer": 1,
          "explanation": "The CLT is 'central' because it justifies the use of the normal distribution for many statistical inference procedures (like confidence intervals and hypothesis tests for means) even when the underlying population data is not normal."
        },
        {
          "question": "A 95% confidence interval for the difference between two means is found to be (-2.5, 1.0). Based on this interval, what can we conclude?",
          "options": [
            "There is a significant difference between the two means",
            "There is no significant difference between the two means",
            "The first mean is larger than the second",
            "The second mean is larger than the first"
          ],
          "answer": 1,
          "explanation": "The interval contains 0. This means that a difference of 0 (meaning 'no difference') is a plausible value for the difference between the two population means. Therefore, we cannot conclude that there is a significant difference."
        },
        {
          "question": "The critical value $Z^*$ for a 98% confidence interval is approximately:",
          "options": [
            "1.96",
            "2.33",
            "2.05",
            "2.576"
          ],
          "answer": 1,
          "explanation": "For a 98% CI, the area in the tails is 2%. We need the Z-score that leaves 1% in each tail. This value is approximately 2.33."
        },
        {
          "question": "If a hypothesis test leads to failing to reject the null hypothesis, it:",
          "options": [
            "Proves the null hypothesis is true",
            "Proves the alternative hypothesis is false",
            "Means there is not enough evidence against the null hypothesis",
            "Means a Type I error has definitely been made"
          ],
          "answer": 2,
          "explanation": "'Failing to reject $H_0$' is a weak conclusion. It means the data did not provide strong enough evidence to conclude that $H_0$ is false. It does not mean $H_0$ is true."
        },
        {
          "question": "The least-squares regression line is the line that:",
          "options": [
            "Passes through the most data points",
            "Minimizes the sum of the squared residuals",
            "Maximizes the correlation coefficient",
            "Has a slope of 1"
          ],
          "answer": 1,
          "explanation": "The 'least-squares' criterion defines the best-fitting line as the one that makes the sum of the squared vertical distances (residuals) between the data points and the line as small as possible."
        },
        {
          "question": "A parameter is a numerical summary of a ______, while a statistic is a numerical summary of a ______.",
          "options": [
            "sample; population",
            "population; sample",
            "census; parameter",
            "statistic; parameter"
          ],
          "answer": 1,
          "explanation": "This is the fundamental distinction. Parameters describe populations; statistics describe samples."
        },
        {
          "question": "The standard deviation is the square root of the:",
          "options": [
            "Mean",
            "Variance",
            "Range",
            "IQR"
          ],
          "answer": 1,
          "explanation": "Variance $(\\sigma^2$ or $s^2)$ is the average of the squared deviations from the mean. The standard deviation $(\\sigma$ or $s)$ is its square root, which puts it back in the original units of the data."
        },
        {
          "question": "A Z-test statistic is calculated as $Z = \\frac{\\bar{x} - \\mu_0}{\\sigma/\\sqrt{n}}$. This measures:",
          "options": [
            "The difference between $\\bar{x}$ and $\\mu_0$ in units of the population standard deviation",
            "The difference between $\\bar{x}$ and $\\mu_0$ in units of the standard error",
            "The p-value of the test",
            "The power of the test"
          ],
          "answer": 1,
          "explanation": "The denominator $(\\sigma/\\sqrt{n})$ is the standard error. The Z-test statistic tells us how many standard errors the sample mean is from the hypothesized population mean."
        },
        {
          "question": "If the points on a scatterplot fall perfectly on a straight line with a positive slope, the correlation $r$ is:",
          "options": [
            "0",
            "1",
            "-1",
            "0.5"
          ],
          "answer": 1,
          "explanation": "If all points lie exactly on an upward-sloping line, it is a perfect positive linear relationship, so $r = 1$."
        },
        {
          "question": "The Law of Large Numbers states that as the number of trials increases, the:",
          "options": [
            "Sample mean approaches the population mean",
            "Sample standard deviation approaches zero",
            "Population mean becomes known",
            "Sample size becomes less important"
          ],
          "answer": 0,
          "explanation": "This is the core of the law of large numbers. It guarantees the stability of long-term results and is the reason why we trust large samples."
        },
        {
          "question": "A test of $H_0: p = 0.5$ vs. $H_1: p \\neq 0.5$ is conducted. The p-value is 0.07. At $\\alpha=0.05$, the conclusion is:",
          "options": [
            "Reject $H_0$. There is sufficient evidence that $p$ is not 0.5",
            "Fail to reject $H_0$. There is not sufficient evidence that $p$ is not 0.5",
            "Accept $H_0$. $p$ is exactly 0.5",
            "The test is inconclusive"
          ],
          "answer": 1,
          "explanation": "Since the p-value (0.07) is greater than $\\alpha$ (0.05), we fail to reject $H_0$. We do not have strong enough evidence to conclude that the proportion is different from 0.5."
        },
        {
          "question": "For a fixed sample size, if you decrease the significance level $\\alpha$ (e.g., from 0.05 to 0.01), the probability of a Type II error $(\\beta)$ will:",
          "options": [
            "Increase",
            "Decrease",
            "Stay the same",
            "Become zero"
          ],
          "answer": 0,
          "explanation": "Making $\\alpha$ smaller means you require stronger evidence to reject $H_0$. This makes it harder to reject $H_0$, which means you are more likely to fail to reject a false $H_0$, thereby increasing $\\beta$."
        },
        {
          "question": "The standard error measures:",
          "options": [
            "The accuracy of a sample statistic",
            "The bias in a sampling method",
            "The variability of a sample statistic from sample to sample",
            "The difference between a statistic and a parameter"
          ],
          "answer": 2,
          "explanation": "Accuracy relates to lack of bias and low variability combined. The standard error specifically measures variability (precision), not bias."
        },
        {
          "question": "If a sampling method is biased, taking a larger sample will:",
          "options": [
            "Eliminate the bias",
            "Reduce the bias",
            "Reduce the sampling error but not the bias",
            "Have no effect on either bias or error"
          ],
          "answer": 2,
          "explanation": "Bias is a systematic error in the sampling method itself (e.g., undercoverage). Increasing the sample size makes the sample more precise (reduces sampling error/variability) around the wrong value; it does not fix the fundamental flaw in the method that causes the bias."
        },
        {
          "question": "A confidence interval is valid if:",
          "options": [
            "The sample size is large",
            "The underlying assumptions (like randomness and normality/CLT) are met",
            "The population standard deviation is known",
            "The interval is wide enough"
          ],
          "answer": 1,
          "explanation": "The validity of any statistical procedure depends on its assumptions being reasonably met. For a CI, this includes having a random sample and either a normal population or a large enough sample for the CLT to apply."
        },
        {
          "question": "To cut the margin of error of a confidence interval for a mean in half, the sample size must be:",
          "options": [
            "Doubled",
            "Halved",
            "Quadrupled",
            "Increased by a factor of 8"
          ],
          "answer": 2,
          "explanation": "The margin of error is proportional to $1/\\sqrt{n}$. To halve the margin of error, you need to double the denominator $(\\sqrt{n})$. To double $\\sqrt{n}$, you must quadruple $n$."
        },
        {
          "question": "A researcher sets $\\alpha = 0.05$. This means they are willing to accept a:",
          "options": [
            "5% chance of rejecting a true null hypothesis",
            "5% chance of failing to reject a false null hypothesis",
            "95% chance of a Type II error",
            "5% chance that the null hypothesis is true"
          ],
          "answer": 0,
          "explanation": "By definition, $\\alpha$ is the probability of a Type I error: rejecting $H_0$ when it is actually true."
        },
        {
          "question": "Outliers can have a strong influence on:",
          "options": [
            "The correlation coefficient",
            "The regression line",
            "Both A and B",
            "Neither A nor B"
          ],
          "answer": 2,
          "explanation": "A single outlier, especially one with an extreme x-value, can dramatically change the slope of the regression line and the value of the correlation coefficient."
        },
        {
          "question": "If the correlation between two variables is zero, it means:",
          "options": [
            "There is no relationship between them",
            "There is no linear relationship between them",
            "They are independent",
            "The slope of the regression line is zero"
          ],
          "answer": 1,
          "explanation": "A correlation of zero means there is no linear trend. However, there could be a strong non-linear relationship (e.g., a U-shape). It also does not guarantee statistical independence."
        },
        {
          "question": "The finite population correction factor (FPC) is applied to the standard error when:",
          "options": [
            "The population is normal",
            "The sample size is large $(n \\geq 30)$",
            "The sample size is more than 5% of the population size",
            "The population standard deviation is unknown"
          ],
          "answer": 2,
          "explanation": "The FPC, $\\sqrt{\\frac{N-n}{N-1}}$, is used to reduce the standard error when we are sampling a significant fraction of the population without replacement. The rule of thumb is to use it when $n/N > 0.05$."
        },
        {
          "question": "A p-value of 0.90 indicates that:",
          "options": [
            "The null hypothesis is definitely true",
            "The alternative hypothesis is definitely true",
            "The sample data provides very little evidence against the null hypothesis",
            "A Type I error has been made"
          ],
          "answer": 2,
          "explanation": "A large p-value (like 0.90) means that the observed data is very likely to occur if the null hypothesis were true. Therefore, the data does not provide evidence to reject $H_0$."
        },
        {
          "question": "For a given sample size, a two-tailed test has a _____ critical value compared to a one-tailed test at the same $\\alpha$ level.",
          "options": [
            "Larger",
            "Smaller",
            "Same",
            "Unrelated"
          ],
          "answer": 0,
          "explanation": "For a two-tailed test, the significance level $\\alpha$ is split between two tails. To have, say, 2.5% in each tail (for $\\alpha=0.05$), you need a more extreme critical value than for a one-tailed test which puts the full 5% in one tail."
        },
        {
          "question": "The standard error of the estimate in regression measures:",
          "options": [
            "The standard deviation of the x-values",
            "The standard deviation of the y-values",
            "The typical distance between the observed y-values and the predicted y-values (the regression line)",
            "The slope of the regression line"
          ],
          "answer": 2,
          "explanation": "It is an estimate of the standard deviation of the residuals. It tells us, on average, how far the data points are from the regression line."
        },
        {
          "question": "A placebo is used in an experiment to:",
          "options": [
            "Ensure the study is double-blind",
            "Control for the psychological effects of receiving a treatment",
            "Increase the power of the study",
            "Guarantee a significant result"
          ],
          "answer": 1,
          "explanation": "A placebo is an inactive treatment that looks like the real treatment. It helps to isolate the actual physiological effect of the treatment from the placebo effect (improvement due to the belief that one is being treated)."
        }
      ]
    },
    {
      "id": "QS004",
      "questions": [
        {
          "question": "In a study on employee satisfaction, a company randomly selects 5 of its 20 departments and surveys every employee in those departments. This is an example of:",
          "options": [
            "Simple Random Sampling",
            "Stratified Sampling",
            "Cluster Sampling",
            "Systematic Sampling"
          ],
          "answer": 2,
          "explanation": "Cluster sampling involves dividing the population into clusters (departments), randomly selecting a few clusters, and then including all members within the chosen clusters."
        },
        {
          "question": "The primary goal of using a probability sampling method is to:",
          "options": [
            "Eliminate all sampling errors",
            "Minimize the cost and time of data collection",
            "Allow for the calculation of sampling error and reduce selection bias",
            "Ensure the sample is as large as possible"
          ],
          "answer": 2,
          "explanation": "Probability sampling allows every member of the population a known, non-zero chance of selection. This minimizes selection bias and allows statisticians to quantify the uncertainty (sampling error) associated with sample estimates."
        },
        {
          "question": "For a large enough sample size, the sampling distribution of the sample mean will be approximately normal:",
          "options": [
            "Only if the population is normal",
            "Regardless of the population's distribution",
            "Only if the population is symmetric",
            "Only if the population standard deviation is known"
          ],
          "answer": 1,
          "explanation": "This is the Central Limit Theorem. For large samples (typically $n \\geq 30$), the sampling distribution of the mean is approximately normal, even if the population distribution is not normal."
        },
        {
          "question": "The variability of a sampling distribution is primarily measured by its:",
          "options": [
            "Mean",
            "Standard Deviation (which is the Standard Error)",
            "Skewness",
            "Range"
          ],
          "answer": 1,
          "explanation": "The standard deviation of a sampling distribution has a special name: the standard error. It measures how spread out the sample statistics are from their own mean."
        },
        {
          "question": "A 95% confidence interval for a mean is (50, 60). Which statement is true?",
          "options": [
            "95% of the population values are between 50 and 60",
            "95% of the sample values are between 50 and 60",
            "We are 95% confident that the sample mean is between 50 and 60",
            "We are 95% confident that the population mean is between 50 and 60"
          ],
          "answer": 3,
          "explanation": "This is the standard, correct interpretation of a confidence interval for a population mean."
        },
        {
          "question": "When constructing a confidence interval for a mean, if the population standard deviation is known, one should use the:",
          "options": [
            "t-distribution",
            "Z-distribution",
            "Binomial distribution",
            "p-distribution"
          ],
          "answer": 1,
          "explanation": "The Z-distribution is appropriate when the population standard deviation $\\sigma$ is known. The t-distribution is used when $\\sigma$ is unknown and we must estimate it with the sample standard deviation $s$."
        },
        {
          "question": "A test of $H_0: \\mu = 100$ vs. $H_1: \\mu < 100$ is a ______ test.",
          "options": [
            "Two-tailed",
            "Right-tailed",
            "Left-tailed",
            "Non-directional"
          ],
          "answer": 2,
          "explanation": "The alternative hypothesis $(\\mu < 100)$ points to the left, so it is a left-tailed test."
        },
        {
          "question": "If the p-value is less than $\\alpha$, the test statistic falls in the:",
          "options": [
            "Acceptance region",
            "Rejection region",
            "Confidence interval",
            "Standard error"
          ],
          "answer": 1,
          "explanation": "The rejection region is defined by the critical value(s). If the p-value is less than $\\alpha$, it means the test statistic is more extreme than the critical value, placing it in the rejection region."
        },
        {
          "question": "For the same dataset, the correlation coefficient $r$ and the slope of the regression line $b_1$:",
          "options": [
            "Always have the same sign",
            "Always have opposite signs",
            "Are always equal",
            "Are not related"
          ],
          "answer": 0,
          "explanation": "The slope $b_1$ is calculated as $b_1 = r \\cdot (s_y / s_x)$. Since standard deviations $(s_y$ and $s_x)$ are always positive, the sign of the slope $b_1$ is determined by the sign of $r$. They will always be the same."
        },
        {
          "question": "A lurking variable is:",
          "options": [
            "A variable that is not included in the study but affects the interpretation of the relationship between the variables of interest",
            "An outlier in the dataset",
            "The dependent variable",
            "The variable on the x-axis"
          ],
          "answer": 0,
          "explanation": "A lurking variable is a hidden or unmeasured variable that can create a spurious correlation or hide a true relationship between the studied variables."
        },
        {
          "question": "The primary reason for conducting a sample rather than a census is:",
          "options": [
            "Samples are always more accurate than a census",
            "A census is only possible for small populations",
            "Samples are more practical and cost-effective for large populations",
            "Samples eliminate the need for statistical analysis"
          ],
          "answer": 2,
          "explanation": "While a census provides complete information, it is often prohibitively expensive, time-consuming, and logistically challenging for large populations. A well-designed sample can provide very accurate results much more efficiently."
        },
        {
          "question": "If you take every possible sample of size $n$ from a population and calculate the mean of each sample, the average of all those sample means will be:",
          "options": [
            "Exactly equal to the population mean",
            "Slightly less than the population mean",
            "Slightly more than the population mean",
            "Unrelated to the population mean"
          ],
          "answer": 0,
          "explanation": "This is the property of an unbiased estimator. The mean of the sampling distribution of $\\bar{x}$ is always equal to the population mean $\\mu$."
        },
        {
          "question": "All else being equal, a 99% confidence interval will be ______ a 95% confidence interval.",
          "options": [
            "Narrower than",
            "Wider than",
            "The same width as",
            "Unrelated to"
          ],
          "answer": 1,
          "explanation": "To be more confident that you have captured the parameter, you must allow for more uncertainty, which means a wider interval. The critical value $Z^*$ is larger for a 99% CI than for a 95% CI."
        },
        {
          "question": "The power of a test increases when:",
          "options": [
            "The sample size decreases",
            "The effect size (the difference from $H_0$) decreases",
            "The standard deviation increases",
            "The sample size increases"
          ],
          "answer": 3,
          "explanation": "Increasing the sample size is the most direct way to increase the power of a test, as it reduces the standard error and makes it easier to detect an effect."
        },
        {
          "question": "Extrapolation in regression refers to:",
          "options": [
            "Making a prediction for an x-value within the range of the observed data",
            "Making a prediction for an x-value outside the range of the observed data",
            "Calculating the correlation coefficient",
            "Finding the residual"
          ],
          "answer": 1,
          "explanation": "Extrapolation is using the regression model to predict for x-values beyond the scope of the data used to build the model. It is risky because the linear relationship may not hold outside the observed range."
        },
        {
          "question": "A market researcher stands in a shopping mall and approaches people who appear friendly to complete a survey. This method is most susceptible to:",
          "options": [
            "Sampling error",
            "Non-sampling error",
            "Coverage error",
            "Selection bias"
          ],
          "answer": 3,
          "explanation": "This is convenience sampling. The researcher's choice of who appears 'friendly' introduces a systematic bias, meaning certain types of people are more likely to be selected than others. This is a form of selection bias."
        },
        {
          "question": "The Central Limit Theorem requires that the samples be:",
          "options": [
            "From a normal population",
            "Large",
            "Random and independent",
            "All of the above"
          ],
          "answer": 2,
          "explanation": "The CLT has specific assumptions. The most important are that the sample observations are independent and randomly selected. The population does not need to be normal, and the sample only needs to be 'large' if the population is not normal."
        },
        {
          "question": "A researcher calculates a 95% CI for a mean as (100, 200). The probability that the population mean is between 100 and 200 is:",
          "options": [
            "0.95",
            "0.05",
            "Either 0 or 1",
            "Unknown"
          ],
          "answer": 2,
          "explanation": "This is a subtle but crucial point. The population mean is a fixed, unknown constant. It is either in the interval (100, 200) or it is not. There is no probability involved after the interval is calculated. The 95% refers to the confidence in the method, not in this specific interval."
        },
        {
          "question": "A statistically significant result (p < .05) means that:",
          "options": [
            "The effect is large and important",
            "The null hypothesis is false",
            "The result is unlikely to be due to chance alone",
            "The alternative hypothesis is proven"
          ],
          "answer": 2,
          "explanation": "This is the core meaning of statistical significance. It indicates the data is inconsistent with the null hypothesis, suggesting the observed effect is real and not just random noise. It does not speak to the size or importance of the effect."
        },
        {
          "question": "A residual plot that shows a curved pattern suggests that:",
          "options": [
            "The linear model is appropriate",
            "A non-linear model might be more appropriate",
            "The correlation is high",
            "There are no outliers"
          ],
          "answer": 1,
          "explanation": "A pattern in the residual plot indicates that the linear model is not capturing some systematic trend in the data. A curved pattern often suggests a non-linear relationship."
        },
        {
          "question": "In a two-stage sampling process, a researcher first randomly selects 50 schools from a list of all schools in a state, and then randomly selects 20 students from each of those 50 schools. The primary sampling units are the:",
          "options": [
            "Students",
            "Classrooms",
            "Schools",
            "The 20 selected students"
          ],
          "answer": 2,
          "explanation": "In the first stage of this multi-stage cluster sample, the clusters (schools) are the primary sampling units that are randomly selected."
        },
        {
          "question": "The t-distribution should be used instead of the Z-distribution when:",
          "options": [
            "The sample size is small",
            "The population standard deviation is unknown",
            "The sample is not random",
            "Both I and II"
          ],
          "answer": 3,
          "explanation": "We use the t-distribution specifically when the population standard deviation $\\sigma$ is unknown and we are using the sample standard deviation $s$ as an estimate. This is particularly important when the sample size is small."
        },
        {
          "question": "If a hypothesis test is performed and we fail to reject $H_0$, a possible error is:",
          "options": [
            "Type I error only",
            "Type II error only",
            "Either Type I or Type II error",
            "No error is possible"
          ],
          "answer": 1,
          "explanation": "If we fail to reject $H_0$, the only possible error is a Type II error (failing to reject a false $H_0$). A Type I error is rejecting a true $H_0$."
        },
        {
          "question": "The p-value for a two-tailed test is always:",
          "options": [
            "Half the p-value of a one-tailed test",
            "Twice the p-value of a one-tailed test",
            "The same as the p-value of a one-tailed test",
            "Unrelated to the p-value of a one-tailed test"
          ],
          "answer": 1,
          "explanation": "For a given test statistic, the two-tailed p-value is twice the area in one tail. So, it's twice the one-tailed p-value (if the effect is in the direction specified by the one-tailed test)."
        },
        {
          "question": "Random assignment in an experiment is used to:",
          "options": [
            "Ensure the sample is representative of the population",
            "Create treatment groups that are similar in all aspects before the treatment is applied",
            "Guarantee that the results will be significant",
            "Select which subjects will be in the study"
          ],
          "answer": 1,
          "explanation": "Random assignment is the cornerstone of a controlled experiment. It helps to balance out lurking variables across the treatment and control groups, allowing for a causal interpretation of the results."
        }
      ]
    },
    {
      "id": "QS005",
      "questions": [
        {
          "question": "A sampling technique where the population is ordered in some way and then individuals are selected at regular intervals after a random start is called:",
          "options": [
            "Stratified Sampling",
            "Cluster Sampling",
            "Systematic Sampling",
            "Judgmental Sampling"
          ],
          "answer": 2,
          "explanation": "This is the definition of systematic sampling. The random start is crucial to avoid bias if the list has a hidden periodic pattern."
        },
        {
          "question": "If a sample statistic consistently overestimates or underestimates a population parameter, the statistic is said to be:",
          "options": [
            "Inconsistent",
            "Biased",
            "Inefficient",
            "Random"
          ],
          "answer": 1,
          "explanation": "Bias occurs when the expected value of the sample statistic (the average over many samples) is not equal to the population parameter it is trying to estimate."
        },
        {
          "question": "The Law of Large Numbers in statistics states that:",
          "options": [
            "A large sample size guarantees an accurate estimate",
            "As a sample size increases, the sample mean will get closer to the population mean",
            "Large populations require large samples",
            "The sampling distribution becomes wider as the sample size increases"
          ],
          "answer": 1,
          "explanation": "The Law of Large Numbers formally says that as the number of observations in a sample increases, the sample mean $(\\bar{x})$ converges to the population mean $(\\mu)$."
        },
        {
          "question": "The standard error of the difference between two independent sample means $(\\bar{x}_1 - \\bar{x}_2)$ is calculated as:",
          "options": [
            "$SE_1 + SE_2$",
            "$\\sqrt{SE_1^2 + SE_2^2}$",
            "$\\frac{SE_1 + SE_2}{2}$",
            "$SE_1 \\times SE_2$"
          ],
          "answer": 1,
          "explanation": "The variances of independent random variables add. Since the standard error is a standard deviation, we square them to get variances, add the variances, and then take the square root: $\\sqrt{\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}}$ or $\\sqrt{SE_1^2 + SE_2^2}$."
        },
        {
          "question": "A confidence interval is often preferred over a point estimate because it:",
          "options": [
            "Is easier to calculate",
            "Provides a range of plausible values and gives a sense of the precision of the estimate",
            "Is always more accurate",
            "Guarantees that the parameter is within the interval"
          ],
          "answer": 1,
          "explanation": "A point estimate is a single number. A confidence interval provides that same number (the point estimate) plus a margin of error that conveys how uncertain we are. It gives both an estimate and a measure of its reliability."
        },
        {
          "question": "A test statistic is:",
          "options": [
            "A population parameter",
            "A number calculated from sample data that is used to evaluate the null hypothesis",
            "The same as the p-value",
            "The significance level"
          ],
          "answer": 1,
          "explanation": "The test statistic (e.g., Z, t) measures how far the sample statistic is from the null hypothesized value, in units of standard error. It is the key input for determining the p-value."
        },
        {
          "question": "The interquartile range (IQR) is a measure of:",
          "options": [
            "Center",
            "Spread (variability)",
            "Shape",
            "Skewness"
          ],
          "answer": 1,
          "explanation": "The IQR $(Q_3 - Q_1)$ measures the spread of the middle 50% of the data. It is a robust measure of variability."
        },
        {
          "question": "In a perfectly symmetric distribution, the mean and median are:",
          "options": [
            "Equal",
            "The mean is greater than the median",
            "The median is greater than the mean",
            "Unrelated"
          ],
          "answer": 0,
          "explanation": "In a symmetric, unimodal distribution, the mean, median, and mode are all located at the center of symmetry."
        },
        {
          "question": "A Z-score tells you:",
          "options": [
            "The mean of the data",
            "The standard deviation of the data",
            "How many standard deviations a value is from the mean",
            "The median of the data"
          ],
          "answer": 2,
          "explanation": "A Z-score standardizes a value by subtracting the mean and dividing by the standard deviation: $Z = \\frac{x - \\mu}{\\sigma}$."
        },
        {
          "question": "Two events are independent if:",
          "options": [
            "They cannot occur together",
            "The occurrence of one does not affect the probability of the other",
            "They always occur together",
            "Their probabilities add up to 1"
          ],
          "answer": 1,
          "explanation": "This is the definition of statistical independence. $P(A|B) = P(A)$ and $P(B|A) = P(B)$."
        },
        {
          "question": "A phone survey is conducted using randomly generated landline numbers. A potential source of bias in this study is:",
          "options": [
            "Sampling error",
            "The use of random numbers",
            "The exclusion of households without landlines",
            "The fact that it is a probability sample"
          ],
          "answer": 2,
          "explanation": "This is a classic example of coverage error. Many people, particularly younger individuals, rely exclusively on mobile phones. Excluding them from the sampling frame can introduce significant bias."
        },
        {
          "question": "The sampling distribution of the sample mean is approximately normal if:",
          "options": [
            "The sample size is large or the population is normal",
            "The sample size is small",
            "The population is skewed",
            "The sample is not random"
          ],
          "answer": 0,
          "explanation": "This is the key takeaway. The sampling distribution is normal if EITHER the population is normal (for any n) OR the sample size is large (by the CLT, even if the population isn't normal)."
        },
        {
          "question": "The formula for a confidence interval for a population proportion is $\\hat{p} \\pm Z^*\\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}$. This formula is valid when:",
          "options": [
            "$n \\geq 30$",
            "The sample is random and $n\\hat{p} \\geq 10$ and $n(1-\\hat{p}) \\geq 10$",
            "The population is normally distributed",
            "$\\hat{p}$ is greater than 0.5"
          ],
          "answer": 1,
          "explanation": "The conditions for using the normal approximation for a proportion are a random sample and a large enough sample size such that the number of successes and failures in the sample are both at least 10."
        },
        {
          "question": "A researcher wants to test if a new drug is more effective than the current one. The appropriate alternative hypothesis is:",
          "options": [
            "$H_1: p_{new} = p_{current}$",
            "$H_1: p_{new} < p_{current}$",
            "$H_1: p_{new} > p_{current}$",
            "$H_1: p_{new} \\neq p_{current}$"
          ],
          "answer": 2,
          "explanation": "'More effective' implies a directional claim. The researcher believes the new drug has a higher success rate (proportion, p) than the current one."
        },
        {
          "question": "For a very large sample size, the sampling distribution of the mean is very narrow. This means that:",
          "options": [
            "The sample mean is likely to be very close to the population mean",
            "The sample mean is likely to be very far from the population mean",
            "The population mean is changing",
            "The population has a small standard deviation"
          ],
          "answer": 0,
          "explanation": "A narrow sampling distribution means there is little variability in $\\bar{x}$. So, whatever value of $\\bar{x}$ you get from your single sample is very likely to be close to the center of the distribution, which is $\\mu$."
        },
        {
          "question": "A study on campus dining preferences sends an online survey to a simple random sample of student email addresses. The biggest potential for bias in this study likely comes from:",
          "options": [
            "Sampling error",
            "Selection bias",
            "Non-response bias",
            "Measurement bias"
          ],
          "answer": 2,
          "explanation": "Even with a perfect random sample, bias is introduced if the students who choose to respond to the survey have systematically different dining preferences than those who do not respond. This is non-response bias."
        },
        {
          "question": "The critical value for a hypothesis test is:",
          "options": [
            "The p-value",
            "The value that separates the rejection region from the non-rejection region",
            "The population parameter",
            "The sample statistic"
          ],
          "answer": 1,
          "explanation": "The critical value(s) are determined by the sampling distribution and the significance level $\\alpha$. If the test statistic is more extreme than the critical value, it falls in the rejection region."
        },
        {
          "question": "A 95% confidence interval corresponds to a two-tailed hypothesis test with a significance level of:",
          "options": [
            "0.01",
            "0.05",
            "0.10",
            "0.95"
          ],
          "answer": 1,
          "explanation": "A 95% confidence interval captures the central 95% of the sampling distribution. This leaves 5% in the tails, which corresponds to $\\alpha = 0.05$ for a two-tailed test."
        },
        {
          "question": "If a test is 'too powerful' (e.g., with a huge sample size), it might:",
          "options": [
            "Fail to detect a significant effect",
            "Detect a very small, practically insignificant effect as statistically significant",
            "Have a high probability of a Type II error",
            "Have a very small $\\alpha$"
          ],
          "answer": 1,
          "explanation": "With a huge sample size, the standard error becomes very small. This means even a tiny, trivial difference from the null hypothesis can be detected as 'statistically significant.' This highlights the difference between statistical significance and practical importance."
        },
        {
          "question": "A Type I error is sometimes called a:",
          "options": [
            "False negative",
            "False positive",
            "True positive",
            "True negative"
          ],
          "answer": 1,
          "explanation": "In the context of testing, a Type I error is a 'false positive' – we conclude there is an effect when there isn't one."
        },
        {
          "question": "In quota sampling, the researcher:",
          "options": [
            "Randomly selects individuals from the entire population",
            "Divides the population into groups and randomly selects individuals from each group until a quota is filled",
            "Divides the population into groups and non-randomly selects individuals from each group until a quota is filled",
            "Selects individuals who are easiest to reach"
          ],
          "answer": 2,
          "explanation": "Quota sampling is a non-probability method. The researcher identifies subgroups and sets quotas for each, but the selection of individuals within those groups is typically done by convenience or judgment, not random selection."
        },
        {
          "question": "The purpose of using a 'random start' in systematic sampling is to:",
          "options": [
            "Ensure the sample is as large as possible",
            "Introduce an element of chance and avoid bias from hidden periodicities in the list",
            "Make the sampling process faster",
            "Guarantee that every possible sample has an equal chance of being selected"
          ],
          "answer": 1,
          "explanation": "A random start ensures the process is not systematically aligned with a pattern in the list (e.g., selecting every 10th apartment in a building where each 10th apartment is a corner unit). This helps maintain the randomness of the sample."
        },
        {
          "question": "A researcher finds a p-value of 0.001. This means that the results are:",
          "options": [
            "Highly statistically significant",
            "Not statistically significant",
            "Practically significant",
            "Proof of the alternative hypothesis"
          ],
          "answer": 0,
          "explanation": "A p-value of 0.001 is much smaller than common alpha levels (0.05, 0.01), providing very strong evidence against the null hypothesis. However, it does not guarantee practical significance."
        },
        {
          "question": "Failing to reject a false null hypothesis is a:",
          "options": [
            "Type I error",
            "Type II error",
            "Correct decision",
            "Powerful decision"
          ],
          "answer": 1,
          "explanation": "This is the definition of a Type II error."
        },
        {
          "question": "The probability of a Type I error is controlled directly by:",
          "options": [
            "The researcher when they set the significance level $\\alpha$",
            "The sample size",
            "The p-value",
            "The power of the test"
          ],
          "answer": 0,
          "explanation": "The researcher chooses $\\alpha$ (e.g., 0.05), which is the maximum probability of a Type I error they are willing to accept."
        }
      ]
    },
    {
      "id": "QS006",
      "questions": [
        {
          "question": "A study aims to understand the reading habits of a city's residents. The researcher obtains a list of all registered voters and mails them a survey. The main problem with this sampling frame is:",
          "options": [
            "It is too expensive",
            "It excludes residents who are not registered to vote, leading to undercoverage",
            "It will result in a very large sampling error",
            "It uses a non-probability method"
          ],
          "answer": 1,
          "explanation": "The sampling frame (voter list) does not perfectly match the population of interest (all residents). This undercoverage can lead to bias if the reading habits of non-voters differ systematically from those of voters."
        },
        {
          "question": "A statistic is said to be an unbiased estimator of a parameter if:",
          "options": [
            "The statistic is always equal to the parameter",
            "The mean of its sampling distribution is equal to the parameter",
            "The sampling distribution of the statistic is normal",
            "The statistic is calculated from an unbiased sample"
          ],
          "answer": 1,
          "explanation": "This is the technical definition of an unbiased estimator. It means that, on average (over many samples), the estimator gets the right answer. The sample mean $\\bar{x}$ is an unbiased estimator of $\\mu$ because $\\mu_{\\bar{x}} = \\mu$."
        },
        {
          "question": "As the sample size increases, the shape of the sampling distribution of the mean:",
          "options": [
            "Becomes more skewed",
            "Becomes more normal (less skewed)",
            "Stays the same as the population shape",
            "Becomes uniform"
          ],
          "answer": 1,
          "explanation": "This is the essence of the CLT. Larger sample sizes cause the sampling distribution to more closely approximate a normal distribution, reducing any skewness present in the population distribution."
        },
        {
          "question": "For a population with a highly skewed distribution, a sample size of ______ is usually sufficient for the sampling distribution of the mean to be approximately normal.",
          "options": [
            "5",
            "15",
            "30",
            "100"
          ],
          "answer": 2,
          "explanation": "$n \\geq 30$ is a common rule of thumb for the CLT to kick in for non-normal populations. For more severe skewness, a larger sample size might be needed, but 30 is the standard benchmark."
        },
        {
          "question": "The standard error of the mean for a sample of size 25 is 4. If the sample size is increased to 100, the new standard error will be:",
          "options": [
            "1",
            "2",
            "8",
            "16"
          ],
          "answer": 1,
          "explanation": "SE is inversely proportional to $\\sqrt{n}$. If n is multiplied by 4 (from 25 to 100), $\\sqrt{n}$ is multiplied by 2. Therefore, the SE is divided by 2. New SE = 4 / 2 = 2."
        },
        {
          "question": "The sampling distribution of the sample mean is always normal if:",
          "options": [
            "The sample size is 30 or more",
            "The population is normal",
            "The sample is random",
            "The population mean is known"
          ],
          "answer": 1,
          "explanation": "This is a key point. If the population is normal, then the sampling distribution of $\\bar{x}$ is normal for any sample size, even n=1."
        },
        {
          "question": "If you were to take every possible sample of size n from a population and make a histogram of the sample means, the shape of that histogram would represent the:",
          "options": [
            "Population distribution",
            "Data distribution of one sample",
            "Sampling distribution of the mean",
            "Distribution of the population parameter"
          ],
          "answer": 2,
          "explanation": "This is a perfect description of how you would visualize a sampling distribution. The histogram's center, spread, and shape describe the behavior of the sample mean $\\bar{x}$."
        },
        {
          "question": "A 90% confidence interval for a mean is (25, 35). The p-value for testing $H_0: \\mu = 20$ vs. $H_1: \\mu \\neq 20$ would be:",
          "options": [
            "Greater than 0.10",
            "Less than 0.10",
            "Equal to 0.10",
            "Unknown"
          ],
          "answer": 1,
          "explanation": "The 90% CI does not contain 20. This means we would reject $H_0: \\mu = 20$ at the $\\alpha = 0.10$ level. Therefore, the p-value must be less than 0.10."
        },
        {
          "question": "A two-sample t-test is used to compare:",
          "options": [
            "A sample mean to a population mean",
            "The means of two independent groups",
            "The proportions of two groups",
            "The variances of two groups"
          ],
          "answer": 1,
          "explanation": "A two-sample t-test (or independent samples t-test) is used to determine if there is a significant difference between the means of two independent groups."
        },
        {
          "question": "If a 95% confidence interval for a difference in means includes 0, then the corresponding two-tailed hypothesis test at $\\alpha=0.05$ would:",
          "options": [
            "Reject $H_0$",
            "Fail to reject $H_0$",
            "Prove $H_0$ is true",
            "Prove $H_1$ is true"
          ],
          "answer": 1,
          "explanation": "If the interval for $(\\mu_1 - \\mu_2)$ includes 0, it means 'no difference' is a plausible value. Therefore, we would not reject the null hypothesis that $\\mu_1 - \\mu_2 = 0$."
        },
        {
          "question": "A small p-value means that the observed data is:",
          "options": [
            "Very likely if the null hypothesis is true",
            "Very unlikely if the null hypothesis is true",
            "Very likely if the alternative hypothesis is true",
            "Proof that the null hypothesis is false"
          ],
          "answer": 1,
          "explanation": "A small p-value indicates that the sample result (or something more extreme) would be a rare event if the null hypothesis were true. This casts doubt on $H_0$."
        },
        {
          "question": "The power of a test increases as the sample size increases because:",
          "options": [
            "The standard error decreases, making it easier to detect a true effect",
            "The p-value decreases",
            "The significance level $\\alpha$ increases",
            "The probability of a Type I error decreases"
          ],
          "answer": 0,
          "explanation": "A larger sample size reduces the standard error $(\\sigma/\\sqrt{n})$. This makes the sampling distribution narrower, so a true effect is less likely to be masked by random variation, making it easier to detect (higher power)."
        },
        {
          "question": "A test of $H_0: p = 0.6$ vs. $H_1: p > 0.6$ is conducted. The sample proportion is $\\hat{p} = 0.65$. The p-value is the probability, assuming p=0.6, of getting a sample proportion of:",
          "options": [
            "0.65",
            "0.65 or less",
            "0.65 or more",
            "0.6"
          ],
          "answer": 2,
          "explanation": "For a right-tailed test $(H_1: p > 0.6)$, the p-value is the probability of getting a sample proportion as large as 0.65 or even larger, assuming the true proportion is 0.6."
        },
        {
          "question": "If a hypothesis test is performed and the null hypothesis is actually true, the probability of making the correct decision is:",
          "options": [
            "$\\alpha$",
            "$\\beta$",
            "$1 - \\alpha$",
            "$1 - \\beta$"
          ],
          "answer": 2,
          "explanation": "If $H_0$ is true, the correct decision is to fail to reject $H_0$. The probability of this is $1 - P(\\text{Type I error}) = 1 - \\alpha$."
        },
        {
          "question": "A researcher gets a p-value of 0.06. This means:",
          "options": [
            "The null hypothesis should be rejected",
            "The null hypothesis should be accepted",
            "The result is not statistically significant at the $\\alpha=0.05$ level",
            "A Type II error has occurred"
          ],
          "answer": 2,
          "explanation": "Since 0.06 > 0.05, we fail to reject $H_0$ at the 0.05 significance level. The result is not statistically significant by the conventional standard."
        },
        {
          "question": "For a fixed $\\alpha$, increasing the sample size will ______ the power of the test.",
          "options": [
            "Increase",
            "Decrease",
            "Not affect",
            "Make unpredictable"
          ],
          "answer": 0,
          "explanation": "This is one of the primary reasons for calculating sample size before a study. A larger sample size gives the test more power to detect an effect if one exists."
        },
        {
          "question": "A confidence interval can be used to perform a two-tailed hypothesis test. If the interval does not contain the null hypothesized value, then:",
          "options": [
            "$H_0$ is proven true",
            "$H_0$ is rejected",
            "$H_0$ is not rejected",
            "The test is inconclusive"
          ],
          "answer": 1,
          "explanation": "If the null value is not in the confidence interval, it is not a plausible value for the parameter, so we reject $H_0$."
        },
        {
          "question": "The t-distribution is used for hypothesis testing when:",
          "options": [
            "The population is normal and $\\sigma$ is known",
            "The population is normal and $\\sigma$ is unknown",
            "The sample size is large, regardless of the population",
            "The data are categorical"
          ],
          "answer": 1,
          "explanation": "The t-test is specifically designed for situations where the population is approximately normal and the population standard deviation is unknown, so we use the sample standard deviation $s$."
        },
        {
          "question": "A p-value is calculated assuming:",
          "options": [
            "The alternative hypothesis is true",
            "The null hypothesis is true",
            "The sample is representative",
            "The power is high"
          ],
          "answer": 1,
          "explanation": "The entire calculation of the p-value is based on the assumption that the null hypothesis is true. It answers the question: 'How surprising is my data, if $H_0$ were actually true?'"
        },
        {
          "question": "The probability of rejecting the null hypothesis when it is false is:",
          "options": [
            "$\\alpha$",
            "$\\beta$",
            "$1 - \\alpha$",
            "$1 - \\beta$"
          ],
          "answer": 3,
          "explanation": "This is the definition of power. Power is the probability of correctly rejecting a false null hypothesis."
        },
        {
          "question": "A researcher wants to test if a mean is different from a standard value. The appropriate test is a:",
          "options": [
            "One-tailed test",
            "Two-tailed test",
            "Left-tailed test",
            "Right-tailed test"
          ],
          "answer": 1,
          "explanation": "'Different from' implies a non-directional hypothesis $(H_1: \\mu \\neq \\text{standard value})$, which requires a two-tailed test."
        },
        {
          "question": "If the p-value is greater than $\\alpha$, the conclusion is to:",
          "options": [
            "Reject $H_0$",
            "Fail to reject $H_0$",
            "Accept $H_0$",
            "Accept $H_1$"
          ],
          "answer": 1,
          "explanation": "The decision rule is: if p-value $\\leq \\alpha$, reject $H_0$. If p-value $> \\alpha$, fail to reject $H_0$."
        },
        {
          "question": "A test with low power is a concern because it:",
          "options": [
            "Has a high chance of a Type I error",
            "Has a high chance of a Type II error (missing a real effect)",
            "Is too sensitive to small effects",
            "Will always give a significant result"
          ],
          "answer": 1,
          "explanation": "Low power means the test is not very good at detecting a real effect when it exists. This leads to a high probability of a Type II error."
        },
        {
          "question": "The critical value for a left-tailed test with $\\alpha = 0.05$ is the Z-score that has:",
          "options": [
            "5% of the area to its right",
            "5% of the area to its left",
            "95% of the area to its right",
            "95% of the area to its left"
          ],
          "answer": 1,
          "explanation": "For a left-tailed test, the rejection region is in the left tail. With $\\alpha=0.05$, we want the Z-score that cuts off the bottom 5% of the distribution."
        },
        {
          "question": "A 90% confidence interval for a mean is (8, 12). The p-value for testing $H_0: \\mu = 7$ vs. $H_1: \\mu \\neq 7$ would be:",
          "options": [
            "Greater than 0.10",
            "Less than 0.10",
            "Equal to 0.10",
            "0.90"
          ],
          "answer": 1,
          "explanation": "The 90% CI does not contain 7. This means we would reject $H_0: \\mu = 7$ at the $\\alpha=0.10$ level. Therefore, the p-value must be less than 0.10."
        }
      ]
    },
    {
      "id": "QS007",
      "questions": [
        {
          "question": "Dividing a population of college students into strata based on their year (Freshman, Sophomore, etc.) and then taking a random sample from each stratum is an example of:",
          "options": [
            "Cluster Sampling",
            "Simple Random Sampling",
            "Stratified Sampling",
            "Quota Sampling"
          ],
          "answer": 2,
          "explanation": "The population is divided into subgroups (strata) based on a shared characteristic (year), and a random sample is taken from each stratum."
        },
        {
          "question": "The discrepancy between a sample statistic and the true population parameter it estimates, which occurs purely by chance, is called:",
          "options": [
            "Non-sampling error",
            "Measurement error",
            "Sampling error",
            "Bias"
          ],
          "answer": 2,
          "explanation": "Sampling error is the natural variation that occurs from one sample to another because a sample is only a part of the population. It is inherent in all sampling and can be reduced by increasing the sample size."
        },
        {
          "question": "Which of the following is an example of a non-probability sampling method?",
          "options": [
            "Simple Random Sampling",
            "Systematic Sampling",
            "Cluster Sampling",
            "Snowball Sampling"
          ],
          "answer": 3,
          "explanation": "Snowball sampling, where existing study subjects recruit future subjects from among their acquaintances, is a non-probability method because not everyone has a known chance of being selected."
        },
        {
          "question": "The Central Limit Theorem applies to:",
          "options": [
            "Only the sample mean",
            "The sample mean and the sample proportion",
            "Any sample statistic",
            "Only statistics from normal populations"
          ],
          "answer": 1,
          "explanation": "The CLT most commonly applies to the sample mean. However, a similar phenomenon occurs for the sample proportion (which is essentially a sample mean of 0s and 1s), and it can be extended to other statistics as well."
        },
        {
          "question": "A larger standard error implies that:",
          "options": [
            "The sample statistic is a more precise estimator",
            "The sample statistic is a less precise estimator",
            "The sample is biased",
            "The population standard deviation is small"
          ],
          "answer": 1,
          "explanation": "A larger standard error means the sample statistic (e.g., $\\bar{x}$) varies more from one sample to the next. This means a single estimate from one sample is less reliable or less precise."
        },
        {
          "question": "The sampling distribution of the sample mean is centered at the population mean. The sampling distribution of the sample proportion is centered at the:",
          "options": [
            "Sample proportion",
            "Population proportion",
            "Population mean",
            "Sample size"
          ],
          "answer": 1,
          "explanation": "Just as the mean of the $\\bar{x}$ distribution is $\\mu$, the mean of the $\\hat{p}$ distribution is the population proportion, $p$."
        },
        {
          "question": "The variability in the sampling distribution of a statistic comes from:",
          "options": [
            "Sampling error",
            "Non-sampling error",
            "Bias",
            "Measurement error"
          ],
          "answer": 0,
          "explanation": "The very existence of a sampling distribution—the fact that different samples give different values for the statistic—is due to sampling error, the chance variation inherent in random sampling."
        },
        {
          "question": "If you take all possible samples of size n from a population and calculate a confidence interval for the mean from each sample, what percentage of these intervals will contain the true population mean?",
          "options": [
            "0%",
            "5%",
            "95%",
            "100%"
          ],
          "answer": 2,
          "explanation": "This is the correct interpretation of a 95% confidence level. The '95%' refers to the long-run success rate of the method. If we repeated the sampling process many times, 95% of the resulting intervals would capture $\\mu$."
        },
        {
          "question": "A 90% confidence interval for a mean is calculated from a sample of size 25. The critical value used (from the t-distribution) will be ______ the critical value from the Z-distribution for a 90% interval.",
          "options": [
            "less than",
            "greater than",
            "equal to",
            "not comparable to"
          ],
          "answer": 1,
          "explanation": "The t-distribution has heavier tails than the Z-distribution. To capture the central 90% of the distribution, you have to go further out into the tails. Therefore, the t-critical value for a given confidence level is always larger than the corresponding Z-critical value."
        },
        {
          "question": "If a 95% confidence interval for a proportion is (0.28, 0.42), the point estimate $(\\hat{p})$ is:",
          "options": [
            "0.28",
            "0.42",
            "0.35",
            "0.07"
          ],
          "answer": 2,
          "explanation": "The point estimate is always the center of the confidence interval. $(0.28 + 0.42) / 2 = 0.35$."
        },
        {
          "question": "The margin of error for the interval in the previous question is:",
          "options": [
            "0.28",
            "0.42",
            "0.35",
            "0.07"
          ],
          "answer": 3,
          "explanation": "The margin of error is half the width of the interval. Width = 0.42 - 0.28 = 0.14. Margin of Error = 0.14 / 2 = 0.07."
        },
        {
          "question": "A poll reports that 55% of voters support a candidate with a margin of error of 3%. The confidence interval is:",
          "options": [
            "(52%, 55%)",
            "(55%, 58%)",
            "(52%, 58%)",
            "(3%, 55%)"
          ],
          "answer": 2,
          "explanation": "The interval is the point estimate plus and minus the margin of error: 55% ± 3% = (52%, 58%)."
        },
        {
          "question": "A confidence interval for the difference between two means is (5, 15). This suggests that:",
          "options": [
            "The first mean is larger than the second",
            "The second mean is larger than the first",
            "There is no significant difference",
            "The means are equal"
          ],
          "answer": 0,
          "explanation": "The interval estimates $(\\mu_1 - \\mu_2)$. An interval containing only positive values (5 to 15) suggests that the difference is positive, meaning $\\mu_1 - \\mu_2 > 0$, so $\\mu_1 > \\mu_2$."
        },
        {
          "question": "The $Z^*$ value for a 96% confidence interval is closest to:",
          "options": [
            "1.75",
            "2.05",
            "2.33",
            "1.96"
          ],
          "answer": 1,
          "explanation": "A 96% CI leaves 4% in the tails, or 2% in each tail. The Z-score that has 2% of the area to its right is approximately 2.05."
        },
        {
          "question": "A study finds a 95% CI for the mean cholesterol reduction to be (10, 20) mg/dL. A doctor says this means 95% of patients in the population will reduce their cholesterol by between 10 and 20 mg/dL. This interpretation is:",
          "options": [
            "Correct",
            "Incorrect",
            "Partially correct",
            "Impossible to judge"
          ],
          "answer": 1,
          "explanation": "This is a very common misinterpretation. The confidence interval is for the population mean reduction, not for the reduction of individual patients. The range of individual reductions will be much wider."
        },
        {
          "question": "When the sample size is small and the population is not normal, the confidence interval for the mean:",
          "options": [
            "Is still valid if we use the Z-distribution",
            "Is still valid if we use the t-distribution",
            "May not be valid, even if we use the t-distribution",
            "Will always be valid"
          ],
          "answer": 2,
          "explanation": "The t-distribution is more robust than the Z-distribution, but it still relies on the underlying population being not too far from normal, especially for small n. If the population is severely non-normal and n is small, neither Z nor t intervals may be reliable."
        },
        {
          "question": "The critical value $t^*$ for a 95% confidence interval with 15 degrees of freedom is:",
          "options": [
            "Less than 1.96",
            "Equal to 1.96",
            "Greater than 1.96",
            "Equal to 0.05"
          ],
          "answer": 2,
          "explanation": "For a given confidence level, the $t^*$ value is always larger than the $Z^*$ value. Since $Z^*$ for 95% is 1.96, $t^*$ with df=15 will be greater than 1.96 (it's approximately 2.131)."
        },
        {
          "question": "A wider confidence interval indicates:",
          "options": [
            "More precise estimation",
            "Less precise estimation",
            "A higher level of confidence",
            "Both II and III"
          ],
          "answer": 3,
          "explanation": "A wider interval means our estimate is less precise (we can only pin down the parameter to a wide range). This can be the result of wanting a higher confidence level, having a small sample size, or having high population variability."
        },
        {
          "question": "The center of a confidence interval for a population mean is always:",
          "options": [
            "The population mean $(\\mu)$",
            "The sample mean $(\\bar{x})$",
            "Zero",
            "The margin of error"
          ],
          "answer": 1,
          "explanation": "The confidence interval is constructed as $\\bar{x} \\pm$ (Margin of Error). Therefore, the sample mean $\\bar{x}$ is always the center of the interval."
        },
        {
          "question": "If a 99% confidence interval is calculated from the same data, it will be ______ a 95% confidence interval.",
          "options": [
            "Wider than",
            "Narrower than",
            "The same width as",
            "Sometimes wider, sometimes narrower"
          ],
          "answer": 0,
          "explanation": "To be more confident (99% vs. 95%), you must accept a wider range of plausible values for the parameter. The critical value is larger for a 99% CI, leading to a larger margin of error and a wider interval."
        },
        {
          "question": "The primary difference between a Z-interval and a t-interval for a population mean is:",
          "options": [
            "The center of the interval",
            "The calculation of the margin of error",
            "The interpretation of the confidence level",
            "The shape of the sampling distribution"
          ],
          "answer": 1,
          "explanation": "Both are centered at $\\bar{x}$. The difference is in how the margin of error is calculated: Z-interval uses $Z^* \\times (\\sigma/\\sqrt{n})$ and requires known $\\sigma$. t-interval uses $t^* \\times (s/\\sqrt{n})$ and is used when $\\sigma$ is unknown."
        },
        {
          "question": "If you were to calculate a 100% confidence interval for a mean, it would be:",
          "options": [
            "Very narrow",
            "A single point",
            "Infinitely wide",
            "The same as a 95% interval"
          ],
          "answer": 2,
          "explanation": "To be 100% confident that you have captured the parameter, you would have to account for every possible value the parameter could take, which means the interval would have to extend from $-\\infty$ to $+\\infty$."
        },
        {
          "question": "A researcher wants to estimate the average height of students with a 95% CI and a margin of error of 2 cm. A larger standard deviation in the population will require a:",
          "options": [
            "Smaller sample size",
            "Larger sample size",
            "Lower confidence level",
            "Smaller margin of error"
          ],
          "answer": 1,
          "explanation": "A larger population standard deviation $(\\sigma)$ means more variability, which leads to a larger standard error. To maintain the same margin of error, you need to counteract this by increasing the sample size (n) to reduce the standard error."
        },
        {
          "question": "In a confidence interval formula, the quantity (Critical Value) × (Standard Error) is called the:",
          "options": [
            "Point Estimate",
            "Confidence Level",
            "Margin of Error",
            "Parameter"
          ],
          "answer": 2,
          "explanation": "This is the definition of the margin of error. It is the amount added and subtracted from the point estimate to create the interval."
        },
        {
          "question": "A distribution that has a long tail to the right is called:",
          "options": [
            "Symmetric",
            "Skewed left",
            "Skewed right",
            "Normal"
          ],
          "answer": 2,
          "explanation": "Right-skewed (or positively skewed) distributions have a long tail on the right side. The mean is typically greater than the median in this case."
        }
      ]
    },
    {
      "id": "QS008",
      "questions": [
        {
          "question": "A researcher uses a computer to generate 500 random numbers to select 500 individuals from a list of 10,000. This is an example of:",
          "options": [
            "Systematic Sampling",
            "Simple Random Sampling",
            "Cluster Sampling",
            "Convenience Sampling"
          ],
          "answer": 1,
          "explanation": "Using a random number generator to select subjects from a list, where every set of 500 individuals has an equal chance of being chosen, is the classic method for obtaining a Simple Random Sample."
        },
        {
          "question": "In multistage sampling, the main advantage over single-stage cluster sampling is:",
          "options": [
            "It is always more representative",
            "It is simpler to implement",
            "It can be more cost-effective by narrowing down the geographic or administrative areas in stages",
            "It eliminates the need for a sampling frame"
          ],
          "answer": 2,
          "explanation": "Multistage sampling (e.g., randomly select states, then cities, then neighborhoods, then households) is often more practical and cost-effective than trying to create a single list for the entire population or visiting all households in a few large, widely dispersed clusters."
        },
        {
          "question": "The mean of the sampling distribution of the sample median is:",
          "options": [
            "Always equal to the population mean",
            "Always equal to the population median",
            "Not necessarily equal to the population median",
            "Always zero"
          ],
          "answer": 2,
          "explanation": "Unlike the sample mean, the sample median is not always an unbiased estimator of the population median, especially for non-symmetric distributions. The mean of its sampling distribution may not equal the population parameter."
        },
        {
          "question": "A population has a mean of 50 and a standard deviation of 5. The probability that the mean of a sample of size 36 is greater than 51 is found using the Z-score. The standard deviation used in that Z-score calculation is:",
          "options": [
            "5",
            "5/6",
            "5/36",
            "5/√36"
          ],
          "answer": 3,
          "explanation": "When calculating a Z-score for a sample mean, we use the standard error as the measure of variability. The standard error is $\\sigma/\\sqrt{n} = 5/\\sqrt{36} = 5/6$."
        },
        {
          "question": "If the sample size is equal to the population size, the standard error of the mean is:",
          "options": [
            "Equal to the population standard deviation",
            "Zero",
            "Impossible to calculate",
            "Infinite"
          ],
          "answer": 1,
          "explanation": "If you sample the entire population (a census), then your sample mean is the population mean. There is no uncertainty or variability from sample to sample. Therefore, the standard error, which measures that variability, is zero."
        },
        {
          "question": "The accuracy of a sample statistic as an estimator of a population parameter is determined by:",
          "options": [
            "Its bias and its variability (standard error)",
            "Its variability (standard error) alone",
            "Its bias alone",
            "The sample size alone"
          ],
          "answer": 0,
          "explanation": "A good estimator should be both accurate and precise. Accuracy is a combination of low bias (the estimator is correct on average) and high precision (low variability/standard error). You need both for a reliable estimate."
        },
        {
          "question": "A researcher calculates a 90% confidence interval for a mean as (25, 35). The p-value for testing $H_0: \\mu = 20$ vs. $H_1: \\mu \\neq 20$ would be:",
          "options": [
            "Greater than 0.10",
            "Less than 0.10",
            "Equal to 0.10",
            "Unknown"
          ],
          "answer": 1,
          "explanation": "The 90% CI does not contain 20. This means we would reject $H_0: \\mu = 20$ at the $\\alpha = 0.10$ level. Therefore, the p-value must be less than 0.10."
        },
        {
          "question": "The standard error of the mean is the standard deviation of the:",
          "options": [
            "Population",
            "Sample",
            "Sampling distribution of the mean",
            "Data distribution"
          ],
          "answer": 2,
          "explanation": "The standard error is specifically defined as the standard deviation of the sampling distribution of a statistic. For the mean, it's $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$."
        },
        {
          "question": "If a population has a highly skewed distribution, the sampling distribution of the mean will be approximately normal if:",
          "options": [
            "The sample size is small",
            "The sample size is large",
            "The population standard deviation is known",
            "We use the median instead of the mean"
          ],
          "answer": 1,
          "explanation": "This is the Central Limit Theorem. For populations that are not normal, the sampling distribution of the mean becomes approximately normal when the sample size is sufficiently large (usually $n \\geq 30$)."
        },
        {
          "question": "A 95% prediction interval for an individual observation is ______ a 95% confidence interval for the mean response.",
          "options": [
            "Wider than",
            "Narrower than",
            "The same width as",
            "Unrelated to"
          ],
          "answer": 0,
          "explanation": "It is much harder to predict a single, individual value than it is to estimate a mean. A prediction interval must account for the variability of the individual points around the mean, so it is always wider than a confidence interval for the mean."
        },
        {
          "question": "The central limit theorem is important because it allows us to use normal probability calculations for:",
          "options": [
            "Any dataset, regardless of shape",
            "The sampling distribution of the mean, even if the population isn't normal",
            "The population distribution itself",
            "The distribution of the sample data"
          ],
          "answer": 1,
          "explanation": "The power of the CLT is that it justifies inference procedures (like CIs and hypothesis tests) for means, even when the raw data is not normal, as long as the sample size is sufficiently large."
        },
        {
          "question": "A confounding variable is one that:",
          "options": [
            "Is the main variable of interest",
            "Is related to both the explanatory and response variables, making it difficult to determine the true relationship",
            "Has no effect on the study",
            "Is used to stratify the sample"
          ],
          "answer": 1,
          "explanation": "A confounder is a variable that is associated with both the independent and dependent variables. If not controlled for, it can create a spurious association or mask a real one."
        },
        {
          "question": "In a double-blind experiment:",
          "options": [
            "Neither the subjects nor the researchers who interact with them know which treatment a subject received",
            "The subjects are blindfolded",
            "The researchers know, but the subjects do not",
            "The subjects know, but the researchers do not"
          ],
          "answer": 0,
          "explanation": "Double-blinding prevents bias from both the participants (placebo effect) and the researchers (observer bias) from influencing the outcome."
        },
        {
          "question": "The main purpose of a control group in an experiment is to:",
          "options": [
            "Provide a baseline for comparison to the treatment group(s)",
            "Ensure the study is ethical",
            "Make the study larger",
            "Guarantee random assignment"
          ],
          "answer": 0,
          "explanation": "The control group provides a reference point. By comparing the treatment group to the control group, we can see what effect the treatment had over and above any other factors (like the passage of time or the placebo effect)."
        },
        {
          "question": "A census is preferable to a sample when:",
          "options": [
            "The population is very large",
            "The cost of sampling is high",
            "The population is small and easily accessible",
            "You need results quickly"
          ],
          "answer": 2,
          "explanation": "A census is feasible and often desirable when the population is small and well-defined. For large populations, a sample is almost always more practical."
        },
        {
          "question": "A study uses a voluntary response sample, where people can choose to call a number or click a link to give their opinion. This method is most likely to suffer from:",
          "options": [
            "Low sampling error",
            "Selection bias, as people with strong opinions are more likely to respond",
            "Perfect representation of the population",
            "A very large margin of error"
          ],
          "answer": 1,
          "explanation": "Voluntary response samples are notoriously biased because individuals who feel strongly about an issue (often negatively) are far more likely to participate. This leads to a sample that does not represent the views of the broader, less vocal population."
        },
        {
          "question": "In cluster sampling, the ideal scenario is for the clusters to be:",
          "options": [
            "As large as possible",
            "As heterogeneous (diverse) as possible, mirroring the population",
            "As homogeneous (similar) as possible internally",
            "Selected with a very small sampling interval"
          ],
          "answer": 1,
          "explanation": "In cluster sampling, you want each cluster to be a 'miniature population' that is heterogeneous. This way, even if you only sample a few clusters, you are still capturing the diversity of the entire population, making the sample more representative."
        },
        {
          "question": "A researcher calculates the average height from a sample of students. This average is a:",
          "options": [
            "Parameter because it describes a sample",
            "Statistic because it describes a sample",
            "Parameter because it describes a population",
            "Statistic because it describes a population"
          ],
          "answer": 1,
          "explanation": "Any number calculated from sample data is a statistic. The average height of the sample is a statistic $(\\bar{x})$. The average height of the entire population of students would be a parameter $(\\mu)$."
        },
        {
          "question": "The primary goal of random assignment in an experiment is to:",
          "options": [
            "Ensure the sample is representative of the population",
            "Create groups that are as similar as possible at the start of the experiment, so that any differences later can be attributed to the treatment",
            "Reduce sampling error",
            "Guarantee that every member of the population has an equal chance of being in the study"
          ],
          "answer": 1,
          "explanation": "Random assignment is a key component of experimental design, not sampling. It helps to eliminate confounding variables by distributing them evenly across treatment and control groups, allowing for causal inference."
        },
        {
          "question": "A study on the prevalence of a rare disease is most likely to use which sampling method to ensure it finds enough cases for analysis?",
          "options": [
            "Simple Random Sampling",
            "Stratified Sampling, oversampling the at-risk population",
            "Systematic Sampling",
            "Cluster Sampling"
          ],
          "answer": 1,
          "explanation": "For rare characteristics, a simple random sample might yield very few cases. Stratified sampling allows the researcher to 'oversample' from the stratum where the characteristic is more common (the at-risk population), ensuring a sufficient number of cases for a reliable analysis."
        },
        {
          "question": "The standard error of a statistic is a measure of:",
          "options": [
            "Its bias",
            "The variability of the sampling distribution",
            "The accuracy of the statistic",
            "Non-sampling errors"
          ],
          "answer": 1,
          "explanation": "The standard error is the standard deviation of the sampling distribution of a statistic. It measures how much the statistic varies from sample to sample due to random chance."
        },
        {
          "question": "A researcher wants to study the career goals of engineering majors. They go to the engineering library and surveys students they find there. This is an example of:",
          "options": [
            "Simple Random Sampling",
            "Stratified Sampling",
            "Cluster Sampling",
            "Convenience Sampling"
          ],
          "answer": 3,
          "explanation": "The researcher is selecting the most readily available subjects (those in the engineering library), which is the hallmark of convenience sampling. This method is highly prone to bias."
        },
        {
          "question": "The primary difference between stratified sampling and quota sampling is:",
          "options": [
            "The use of random selection within subgroups",
            "The number of subgroups used",
            "The goal of achieving a representative sample",
            "The size of the sample"
          ],
          "answer": 0,
          "explanation": "In stratified sampling (a probability method), selection within each stratum is random. In quota sampling (a non-probability method), selection within each quota group is typically non-random (e.g., by convenience)."
        },
        {
          "question": "A study on the effectiveness of a new drug uses a sample of patients from a single hospital. The greatest threat to the generalizability (external validity) of these findings is that:",
          "options": [
            "The sample size is too small",
            "Patients from one hospital may not be representative of all patients",
            "The doctors knew which drug was being administered",
            "Sampling error is too high"
          ],
          "answer": 1,
          "explanation": "The sample is drawn from a single, specific cluster (the hospital). Patients at this hospital might have different characteristics (socioeconomic status, severity of illness, etc.) than the broader population of patients, limiting how much we can generalize the results."
        },
        {
          "question": "A sampling method where the probability of selecting each possible sample of a given size is the same is called:",
          "options": [
            "Systematic Sampling",
            "Simple Random Sampling",
            "Stratified Sampling",
            "Cluster Sampling"
          ],
          "answer": 1,
          "explanation": "This is the definition of a Simple Random Sample (SRS). It gives every possible subset of the population of size n an equal chance of being the selected sample."
        }
      ]
    },
    {
      "id": "QS009",
      "questions": [
        {
          "question": "A researcher is interested in the average income of households in a large city. To save time and money, they decide to only survey households in the city's wealthiest neighborhood. The most significant error introduced is:",
          "options": [
            "Measurement error",
            "Non-response bias",
            "Sampling error",
            "Selection bias"
          ],
          "answer": 3,
          "explanation": "The researcher has systematically excluded a large portion of the population (non-wealthy neighborhoods). This deliberate selection of a non-representative group introduces severe selection bias."
        },
        {
          "question": "In a well-designed sample survey, the margin of error primarily accounts for:",
          "options": [
            "Non-sampling errors like measurement bias",
            "The fact that not everyone in the population was surveyed",
            "Errors in data recording",
            "The natural variation due to random sampling, known as sampling error"
          ],
          "answer": 3,
          "explanation": "The margin of error in a confidence interval quantifies the uncertainty that arises because we are using a sample to estimate a population parameter. It directly measures the potential size of the sampling error."
        },
        {
          "question": "The difference between a statistic and a parameter is often referred to as:",
          "options": [
            "Bias",
            "Sampling Error",
            "Standard Error",
            "Variance"
          ],
          "answer": 1,
          "explanation": "Sampling error is defined as the difference between a sample statistic (like $\\bar{x}$) and the population parameter (like $\\mu$) it is estimating. It occurs purely by chance due to the randomness of the sample."
        },
        {
          "question": "If you take every possible sample of size n from a population and calculate the mean of each sample, the average of all those sample means will be:",
          "options": [
            "Exactly equal to the population mean",
            "Slightly less than the population mean",
            "Slightly more than the population mean",
            "Unrelated to the population mean"
          ],
          "answer": 0,
          "explanation": "This is the property of an unbiased estimator. The mean of the sampling distribution of $\\bar{x}$ is always equal to the population mean $\\mu$."
        },
        {
          "question": "A population has a proportion of p = 0.2. You take a sample of size 100. What is the mean of the sampling distribution of the sample proportion $\\hat{p}$?",
          "options": [
            "0.2",
            "0.04",
            "20",
            "0.02"
          ],
          "answer": 0,
          "explanation": "The mean of the sampling distribution of $\\hat{p}$ is the population proportion, p. So, $\\mu_{\\hat{p}} = 0.2$."
        },
        {
          "question": "For the same scenario (p=0.2, n=100), what is the standard error of $\\hat{p}$?",
          "options": [
            "0.2",
            "0.04",
            "0.16",
            "0.0016"
          ],
          "answer": 1,
          "explanation": "$SE(\\hat{p}) = \\sqrt{\\frac{p(1-p)}{n}} = \\sqrt{\\frac{(0.2)(0.8)}{100}} = \\sqrt{\\frac{0.16}{100}} = \\sqrt{0.0016} = 0.04$."
        },
        {
          "question": "For which of the following sample sizes would the sampling distribution of $\\hat{p}$ be closest to a normal distribution, assuming p=0.5?",
          "options": [
            "n=10",
            "n=20",
            "n=50",
            "n=5"
          ],
          "answer": 2,
          "explanation": "The condition for normality is $np \\geq 10$ and $n(1-p) \\geq 10$. n=10: np=5; n=20: np=10 (just met); n=50: np=25 (well met); n=5: np=2.5. Larger n gives a better approximation."
        },
        {
          "question": "The standard error measures:",
          "options": [
            "The accuracy of a sample statistic",
            "The bias in a sampling method",
            "The variability of a sample statistic from sample to sample",
            "The difference between a statistic and a parameter"
          ],
          "answer": 2,
          "explanation": "Accuracy relates to lack of bias and low variability combined. The standard error specifically measures variability (precision), not bias."
        },
        {
          "question": "If the population distribution is uniform, the shape of the sampling distribution of the mean for a sample of size n=2 will be:",
          "options": [
            "Uniform",
            "Normal",
            "Triangular",
            "Skewed"
          ],
          "answer": 2,
          "explanation": "This is a known result. The sampling distribution of the mean for n=2 from a uniform population takes on a triangular shape. It becomes more normal as n increases, demonstrating the CLT in action."
        },
        {
          "question": "The Central Limit Theorem applies to:",
          "options": [
            "Only the sample mean",
            "The sample mean and the sample proportion",
            "Any sample statistic",
            "Only statistics from normal populations"
          ],
          "answer": 1,
          "explanation": "The CLT most commonly applies to the sample mean. However, a similar phenomenon occurs for the sample proportion (which is essentially a sample mean of 0s and 1s), and it can be extended to other statistics as well."
        },
        {
          "question": "A larger standard error implies that:",
          "options": [
            "The sample statistic is a more precise estimator",
            "The sample statistic is a less precise estimator",
            "The sample is biased",
            "The population standard deviation is small"
          ],
          "answer": 1,
          "explanation": "A larger standard error means the sample statistic (e.g., $\\bar{x}$) varies more from one sample to the next. This means a single estimate from one sample is less reliable or less precise."
        },
        {
          "question": "The sampling distribution of the sample mean is centered at the population mean. The sampling distribution of the sample proportion is centered at the:",
          "options": [
            "Sample proportion",
            "Population proportion",
            "Population mean",
            "Sample size"
          ],
          "answer": 1,
          "explanation": "Just as the mean of the $\\bar{x}$ distribution is $\\mu$, the mean of the $\\hat{p}$ distribution is the population proportion, p."
        },
        {
          "question": "For a very large sample size, the sampling distribution of the mean is very narrow. This means that:",
          "options": [
            "The sample mean is likely to be very close to the population mean",
            "The sample mean is likely to be very far from the population mean",
            "The population mean is changing",
            "The population has a small standard deviation"
          ],
          "answer": 0,
          "explanation": "A narrow sampling distribution means there is little variability in $\\bar{x}$. So, whatever value of $\\bar{x}$ you get from your single sample is very likely to be close to the center of the distribution, which is $\\mu$."
        },
        {
          "question": "The variability in the sampling distribution of a statistic comes from:",
          "options": [
            "Sampling error",
            "Non-sampling error",
            "Bias",
            "Measurement error"
          ],
          "answer": 0,
          "explanation": "The very existence of a sampling distribution—the fact that different samples give different values for the statistic—is due to sampling error, the chance variation inherent in random sampling."
        },
        {
          "question": "If you take all possible samples of size n from a population and calculate a confidence interval for the mean from each sample, what percentage of these intervals will contain the true population mean?",
          "options": [
            "0%",
            "5%",
            "95%",
            "100%"
          ],
          "answer": 2,
          "explanation": "This is the correct interpretation of a 95% confidence level. The '95%' refers to the long-run success rate of the method. If we repeated the sampling process many times, 95% of the resulting intervals would capture $\\mu$."
        },
        {
          "question": "The standard error of the difference between two independent sample means $(\\bar{x}_1 - \\bar{x}_2)$ is calculated as:",
          "options": [
            "$SE_1 + SE_2$",
            "$\\sqrt{SE_1^2 + SE_2^2}$",
            "$\\frac{SE_1 + SE_2}{2}$",
            "$SE_1 \\times SE_2$"
          ],
          "answer": 1,
          "explanation": "The variances of independent random variables add. Since the standard error is a standard deviation, we square them to get variances, add the variances, and then take the square root."
        },
        {
          "question": "The Central Limit Theorem requires that the samples be:",
          "options": [
            "From a normal population",
            "Large",
            "Random and independent",
            "All of the above"
          ],
          "answer": 2,
          "explanation": "The CLT has specific assumptions. The most important are that the sample observations are independent and randomly selected. The population does not need to be normal, and the sample only needs to be 'large' if the population is not normal."
        },
        {
          "question": "A statistic is said to be an unbiased estimator of a parameter if:",
          "options": [
            "The statistic is always equal to the parameter",
            "The mean of its sampling distribution is equal to the parameter",
            "The sampling distribution of the statistic is normal",
            "The statistic is calculated from an unbiased sample"
          ],
          "answer": 1,
          "explanation": "This is the technical definition of an unbiased estimator. It means that, on average (over many samples), the estimator gets the right answer."
        },
        {
          "question": "As the sample size increases, the shape of the sampling distribution of the mean:",
          "options": [
            "Becomes more skewed",
            "Becomes more normal (less skewed)",
            "Stays the same as the population shape",
            "Becomes uniform"
          ],
          "answer": 1,
          "explanation": "This is the essence of the CLT. Larger sample sizes cause the sampling distribution to more closely approximate a normal distribution, reducing any skewness present in the population distribution."
        },
        {
          "question": "For a population with a highly skewed distribution, a sample size of ______ is usually sufficient for the sampling distribution of the mean to be approximately normal.",
          "options": [
            "5",
            "15",
            "30",
            "100"
          ],
          "answer": 2,
          "explanation": "$n \\geq 30$ is a common rule of thumb for the CLT to kick in for non-normal populations. For more severe skewness, a larger sample size might be needed."
        },
        {
          "question": "The standard error of the mean for a sample of size 25 is 4. If the sample size is increased to 100, the new standard error will be:",
          "options": [
            "1",
            "2",
            "8",
            "16"
          ],
          "answer": 1,
          "explanation": "SE is inversely proportional to $\\sqrt{n}$. If n is multiplied by 4 (from 25 to 100), $\\sqrt{n}$ is multiplied by 2. Therefore, the SE is divided by 2. New SE = 4 / 2 = 2."
        },
        {
          "question": "The sampling distribution of the sample mean is always normal if:",
          "options": [
            "The sample size is 30 or more",
            "The population is normal",
            "The sample is random",
            "The population mean is known"
          ],
          "answer": 1,
          "explanation": "This is a key point. If the population is normal, then the sampling distribution of $\\bar{x}$ is normal for any sample size, even n=1."
        },
        {
          "question": "If you were to take every possible sample of size n from a population and make a histogram of the sample means, the shape of that histogram would represent the:",
          "options": [
            "Population distribution",
            "Data distribution of one sample",
            "Sampling distribution of the mean",
            "Distribution of the population parameter"
          ],
          "answer": 2,
          "explanation": "This is a perfect description of how you would visualize a sampling distribution. The histogram's center, spread, and shape describe the behavior of the sample mean $\\bar{x}$."
        },
        {
          "question": "The standard deviation of the sampling distribution of a statistic is called the standard error because:",
          "options": [
            "It measures how many standard mistakes we made",
            "It measures the typical error we make when using the sample statistic to estimate the parameter",
            "It is always a very small number",
            "It was named by a researcher named Error"
          ],
          "answer": 1,
          "explanation": "The 'error' in 'standard error' refers to the estimation error $(\\bar{x} - \\mu)$. The standard error is, roughly, the standard size of that error we can expect from using a sample."
        },
        {
          "question": "The mean of the sampling distribution of the sample median is:",
          "options": [
            "Always equal to the population mean",
            "Always equal to the population median",
            "Not necessarily equal to the population median",
            "Always zero"
          ],
          "answer": 2,
          "explanation": "Unlike the sample mean, the sample median is not always an unbiased estimator of the population median, especially for non-symmetric distributions."
        }
      ]
    },
    {
      "id": "QS010",
      "questions": [
        {
          "question": "A polling organization wants to ensure it gets opinions from a proportional number of Democrats, Republicans, and Independents. It uses voter registration lists to identify members of each group and then randomly selects a number from each group proportional to their size in the population. This is:",
          "options": [
            "Cluster Sampling",
            "Simple Random Sampling",
            "Stratified Sampling with proportional allocation",
            "Quota Sampling"
          ],
          "answer": 2,
          "explanation": "The population is divided into strata (political affiliations), and a random sample is taken from each. The sample size from each stratum is proportional to the stratum's size in the population, which is called proportional allocation."
        },
        {
          "question": "The 'Law of Large Numbers' in statistics states that:",
          "options": [
            "A large sample size guarantees an accurate estimate",
            "As a sample size increases, the sample mean will get closer to the population mean",
            "Large populations require large samples",
            "The sampling distribution becomes wider as the sample size increases"
          ],
          "answer": 1,
          "explanation": "The Law of Large Numbers formally says that as the number of observations in a sample increases, the sample mean $(\\bar{x})$ converges to the population mean $(\\mu)$."
        },
        {
          "question": "A list of all patients admitted to a hospital in a given year is an example of a:",
          "options": [
            "Parameter",
            "Statistic",
            "Sampling Frame",
            "Census"
          ],
          "answer": 3,
          "explanation": "This list includes every member of the population of interest (patients admitted that year), making it a census, not just a frame for sampling."
        },
        {
          "question": "The difference between a statistic and a parameter is often referred to as:",
          "options": [
            "Bias",
            "Sampling Error",
            "Standard Error",
            "Variance"
          ],
          "answer": 1,
          "explanation": "Sampling error is defined as the difference between a sample statistic (like $\\bar{x}$) and the population parameter (like $\\mu$) it is estimating."
        },
        {
          "question": "A study uses a voluntary response sample, where people can choose to call a number or click a link to give their opinion. This method is most likely to suffer from:",
          "options": [
            "Low sampling error",
            "Selection bias, as people with strong opinions are more likely to respond",
            "Perfect representation of the population",
            "A very large margin of error"
          ],
          "answer": 1,
          "explanation": "Voluntary response samples are notoriously biased because individuals who feel strongly about an issue (often negatively) are far more likely to participate."
        },
        {
          "question": "In cluster sampling, the ideal scenario is for the clusters to be:",
          "options": [
            "As large as possible",
            "As heterogeneous (diverse) as possible, mirroring the population",
            "As homogeneous (similar) as possible internally",
            "Selected with a very small sampling interval"
          ],
          "answer": 1,
          "explanation": "In cluster sampling, you want each cluster to be a 'miniature population' that is heterogeneous. This ensures the sample captures the diversity of the entire population."
        },
        {
          "question": "A researcher calculates the average height from a sample of students. This average is a:",
          "options": [
            "Parameter because it describes a sample",
            "Statistic because it describes a sample",
            "Parameter because it describes a population",
            "Statistic because it describes a population"
          ],
          "answer": 1,
          "explanation": "Any number calculated from sample data is a statistic. The average height of the sample is a statistic $(\\bar{x})$."
        },
        {
          "question": "The primary goal of random assignment in an experiment is to:",
          "options": [
            "Ensure the sample is representative of the population",
            "Create groups that are as similar as possible at the start of the experiment",
            "Reduce sampling error",
            "Guarantee that every member of the population has an equal chance of being in the study"
          ],
          "answer": 1,
          "explanation": "Random assignment helps to eliminate confounding variables by distributing them evenly across treatment and control groups, allowing for causal inference."
        },
        {
          "question": "If a sampling method is biased, taking a larger sample will:",
          "options": [
            "Eliminate the bias",
            "Reduce the bias",
            "Reduce the sampling error but not the bias",
            "Have no effect on either bias or error"
          ],
          "answer": 2,
          "explanation": "Bias is a systematic error in the sampling method itself. Increasing the sample size makes the sample more precise around the wrong value; it does not fix the fundamental flaw that causes the bias."
        },
        {
          "question": "A study on the prevalence of a rare disease is most likely to use which sampling method to ensure it finds enough cases for analysis?",
          "options": [
            "Simple Random Sampling",
            "Stratified Sampling, oversampling the at-risk population",
            "Systematic Sampling",
            "Cluster Sampling"
          ],
          "answer": 1,
          "explanation": "For rare characteristics, stratified sampling allows the researcher to 'oversample' from the stratum where the characteristic is more common, ensuring sufficient cases for analysis."
        },
        {
          "question": "The standard error of a statistic is a measure of:",
          "options": [
            "Its bias",
            "The variability of the sampling distribution",
            "The accuracy of the statistic",
            "Non-sampling errors"
          ],
          "answer": 1,
          "explanation": "The standard error is the standard deviation of the sampling distribution of a statistic. It measures how much the statistic varies from sample to sample."
        },
        {
          "question": "A researcher wants to study the career goals of engineering majors. They go to the engineering library and surveys students they find there. This is an example of:",
          "options": [
            "Simple Random Sampling",
            "Stratified Sampling",
            "Cluster Sampling",
            "Convenience Sampling"
          ],
          "answer": 3,
          "explanation": "The researcher is selecting the most readily available subjects, which is convenience sampling. This method is highly prone to bias."
        },
        {
          "question": "The primary difference between stratified sampling and quota sampling is:",
          "options": [
            "The use of random selection within subgroups",
            "The number of subgroups used",
            "The goal of achieving a representative sample",
            "The size of the sample"
          ],
          "answer": 0,
          "explanation": "In stratified sampling, selection within each stratum is random. In quota sampling, selection within each quota group is typically non-random."
        },
        {
          "question": "A study on the effectiveness of a new drug uses a sample of patients from a single hospital. The greatest threat to the generalizability of these findings is that:",
          "options": [
            "The sample size is too small",
            "Patients from one hospital may not be representative of all patients",
            "The doctors knew which drug was being administered",
            "Sampling error is too high"
          ],
          "answer": 1,
          "explanation": "Patients at one hospital might have different characteristics than the broader population, limiting generalizability."
        },
        {
          "question": "A sampling method where the probability of selecting each possible sample of a given size is the same is called:",
          "options": [
            "Systematic Sampling",
            "Simple Random Sampling",
            "Stratified Sampling",
            "Cluster Sampling"
          ],
          "answer": 1,
          "explanation": "This is the definition of a Simple Random Sample. It gives every possible subset of the population an equal chance of being selected."
        },
        {
          "question": "A researcher is interested in the average income of households in a large city. To save time and money, they decide to only survey households in the city's wealthiest neighborhood. The most significant error introduced is:",
          "options": [
            "Measurement error",
            "Non-response bias",
            "Sampling error",
            "Selection bias"
          ],
          "answer": 3,
          "explanation": "Systematically excluding non-wealthy neighborhoods introduces severe selection bias."
        },
        {
          "question": "In a well-designed sample survey, the margin of error primarily accounts for:",
          "options": [
            "Non-sampling errors like measurement bias",
            "The fact that not everyone in the population was surveyed",
            "Errors in data recording",
            "The natural variation due to random sampling"
          ],
          "answer": 3,
          "explanation": "The margin of error quantifies the uncertainty from using a sample to estimate a population parameter."
        },
        {
          "question": "A phone survey is conducted using randomly generated landline numbers. A potential source of bias in this study is:",
          "options": [
            "Sampling error",
            "The use of random numbers",
            "The exclusion of households without landlines",
            "The fact that it is a probability sample"
          ],
          "answer": 2,
          "explanation": "Excluding households without landlines creates coverage error, which can introduce significant bias."
        },
        {
          "question": "In quota sampling, the researcher:",
          "options": [
            "Randomly selects individuals from the entire population",
            "Divides the population into groups and randomly selects individuals from each group until a quota is filled",
            "Divides the population into groups and non-randomly selects individuals from each group until a quota is filled",
            "Selects individuals who are easiest to reach"
          ],
          "answer": 2,
          "explanation": "Quota sampling is a non-probability method where selection within quota groups is typically non-random."
        },
        {
          "question": "The purpose of using a 'random start' in systematic sampling is to:",
          "options": [
            "Ensure the sample is as large as possible",
            "Introduce an element of chance and avoid bias from hidden periodicities in the list",
            "Make the sampling process faster",
            "Guarantee that every possible sample has an equal chance of being selected"
          ],
          "answer": 1,
          "explanation": "A random start ensures the process is not systematically aligned with a pattern in the list."
        },
        {
          "question": "A parameter is best described as a:",
          "options": [
            "Characteristic of a sample",
            "Value that changes from sample to sample",
            "Fixed characteristic of a population",
            "Rule for calculating a sample statistic"
          ],
          "answer": 2,
          "explanation": "A parameter is a numerical value that describes a characteristic of an entire population."
        },
        {
          "question": "A researcher uses a computer to generate 500 random numbers to select 500 individuals from a list of 10,000. This is an example of:",
          "options": [
            "Systematic Sampling",
            "Simple Random Sampling",
            "Cluster Sampling",
            "Convenience Sampling"
          ],
          "answer": 1,
          "explanation": "Using a random number generator to select subjects is the classic method for obtaining a Simple Random Sample."
        },
        {
          "question": "In multistage sampling, the main advantage over single-stage cluster sampling is:",
          "options": [
            "It is always more representative",
            "It is simpler to implement",
            "It can be more cost-effective by narrowing down areas in stages",
            "It eliminates the need for a sampling frame"
          ],
          "answer": 2,
          "explanation": "Multistage sampling is often more practical and cost-effective than single-stage methods."
        },
        {
          "question": "The mean of the sampling distribution of the sample median is:",
          "options": [
            "Always equal to the population mean",
            "Always equal to the population median",
            "Not necessarily equal to the population median",
            "Always zero"
          ],
          "answer": 2,
          "explanation": "The sample median is not always an unbiased estimator of the population median."
        },
        {
          "question": "A population has a mean of 50 and a standard deviation of 5. The probability that the mean of a sample of size 36 is greater than 51 is found using the Z-score. The standard deviation used in that Z-score calculation is:",
          "options": [
            "5",
            "5/6",
            "5/36",
            "5/√36"
          ],
          "answer": 3,
          "explanation": "When calculating a Z-score for a sample mean, we use the standard error: $\\sigma/\\sqrt{n} = 5/\\sqrt{36}$."
        }
      ]
    }
  ]
};
