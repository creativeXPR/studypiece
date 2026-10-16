// GES 103 · Chapter 6 · Lesson 3: inferential statistics and choosing the right test (notes 6.13–6.14).

const HOOK = [
  ['Compare the two averages and see which is bigger', 'Descriptive, not inferential', 'A gap in your sample might be chance. Inferential tests judge whether it holds for the population.'],
  ['Run a t-test', 'A good instinct', 'Two different groups compared on a mean: the independent-samples t-test, if parametric assumptions hold.'],
  ['Ask more students', 'Helpful, but not a test', 'Bigger samples help, but you still need a test to judge the difference.'],
  ['Use chi-square', 'Close, but…', 'Chi-square compares categories (counts). For comparing average spending, a t-test fits.'],
];

export default {
  id: 'which-test',
  title: 'Which test do I use?',
  covers: 'Inferential statistics, parametric vs non-parametric, pre-analysis checks, choosing a test',
  minutes: 15,
  sections: [
    {
      name: 'Inference',
      terms: [
        ['Inferential statistics', 'Using a sample to judge a population, via hypothesis testing and confidence intervals.'],
        ['Parametric tests', 'Need a normal distribution and interval/ratio data; more powerful. Regression, Pearson, t-test, ANOVA.'],
        ['Non-parametric tests', 'For nominal/ordinal data and very small samples; less powerful. Spearman, chi-square, Kruskal-Wallis.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'charts',
          eyebrow: 'Chapter 6 · Lesson 3',
          title: 'Which test do I use?',
          body: 'Your survey shows that students in Hall A spend more at bukas each week than students in Hall B.\n\nBut you only surveyed 100 students from each hall. Is the difference real, or just luck in who you happened to ask?',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'charts',
          poll: 'hook',
          prompt: 'How would you find out whether the difference is real?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Let’s find out.',
          pollBody: 'This lesson ends with a tool that picks the right test for any question like this one.',
        },
        {
          type: 'story',
          eyebrow: 'Inferential statistics',
          title: 'From a sample, judge the population.',
          body: 'Descriptive statistics describe your sample. ==Inferential statistics== use that sample to judge the whole population, through **hypothesis testing** and **confidence intervals**.\n\nThe first choice is between two families of tests.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Parametric or non-parametric?',
          buckets: [
            { id: 'p', label: 'Parametric', hint: 'from “parameter”' },
            { id: 'n', label: 'Non-parametric' },
          ],
          items: [
            { text: 'Needs a normal distribution', bucket: 'p', why: '**A normal distribution** is a parametric assumption.' },
            { text: 'Interval or ratio (continuous) data', bucket: 'p', why: '**Continuous data** suits parametric tests.' },
            { text: 'More powerful', bucket: 'p', why: '**Parametric tests are more powerful** at detecting real differences.' },
            { text: 'Regression, Pearson correlation, t-test, ANOVA', bucket: 'p', why: '**These four** are parametric.' },
            { text: 'Suits nominal and ordinal data, and very small samples', bucket: 'n', why: '**Categorical data and tiny samples** need non-parametric tests.' },
            { text: 'Spearman’s rho, chi-square, Kruskal-Wallis', bucket: 'n', why: '**These three** are non-parametric.' },
          ],
          explain: 'Non-parametric tests are used when the data fail parametric assumptions, at the cost of being less powerful.',
        },
        {
          type: 'bridge',
          title: 'Inference: framed.',
          recap: [
            '**Inferential statistics**: judge the population from a sample (hypothesis tests, confidence intervals).',
            '**Parametric**: normal, continuous, more powerful. **Non-parametric**: categorical or small samples, less powerful.',
          ],
          why: 'Before running any test, you check your data. Skipping these checks is how good studies reach wrong conclusions.',
        },
      ],
    },
    {
      name: 'Pre-analysis checks',
      terms: [
        ['Cronbach’s alpha', 'Measures a scale’s internal consistency (do items “hang together”?); ideally above 0.7.'],
        ['Missing data', 'Give it a special code (e.g. 9 or 0); report any suspicious pattern.'],
        ['Outliers', 'Extreme values; parametric tests are sensitive to them. Remove if insignificant.'],
        ['Data manipulation', 'Totalling scores (reverse negative items first), transforming skewed variables, collapsing categories.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Pre-analysis checks',
          title: 'Four checks before you test',
          cards: [
            { title: 'Reliability', text: 'Do the items in a scale “hang together”? Measured by **Cronbach’s alpha**, ideally **above 0.7**. Short scales (under 10 items) may give about 0.5; then report the mean inter-item correlation.' },
            { title: 'Missing data', text: 'Give missing answers a **special code** (e.g. 9 or 0), and report any suspicious pattern.' },
            { title: 'Normality', text: 'A symmetrical, **bell-shaped** curve. Check with skewness and kurtosis, histograms and box plots (SPSS “Explore”).' },
            { title: 'Outliers', text: '**Extreme values**. Parametric tests are sensitive to them. Remove them if they’re insignificant.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Your 12-item “satisfaction with food” scale has a Cronbach’s alpha of 0.82. What does that tell you?',
          options: [
            { text: 'The scale is unreliable.', why: 'Above 0.7 is the target. 0.82 is good.' },
            { text: 'The items hang together well: good internal consistency.', correct: true, why: 'Alpha above 0.7 means the items measure the same thing consistently.' },
            { text: '82% of students are satisfied.', why: 'Alpha measures consistency, not how satisfied anyone is.' },
            { text: 'The data are not normal.', why: 'Alpha says nothing about normality.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Think deeper',
          prompt: 'Which of these are legitimate data manipulations listed in your notes?',
          options: [
            { text: 'Reversing negatively worded items before adding up a total score', correct: true, why: '**Reverse negative items first**, otherwise they cancel out the positive ones.' },
            { text: 'Collapsing age into young, middle and old', correct: true, why: '**Collapsing a continuous variable** into groups is listed.' },
            { text: 'Reducing staff rank to junior and senior', correct: true, why: '**Reducing categories** is listed.' },
            { text: 'Deleting respondents whose answers you disagree with', why: '**That’s falsifying data**, not a legitimate manipulation.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Checks: complete.',
          recap: [
            '**Cronbach’s alpha** > 0.7; code **missing data**; check **normality** (SPSS Explore); handle **outliers**.',
            'Manipulate carefully: reverse negative items, transform skewed variables, collapse categories.',
          ],
          why: 'Data checked. Now the big question: which test? It depends on whether you’re exploring relationships or differences.',
        },
      ],
    },
    {
      name: 'Choosing a test',
      terms: [
        ['Relationship tests', 'Pearson r (alt: Spearman), partial correlation, multiple regression (N > 50 + 8m), logistic regression, factor analysis.'],
        ['Difference tests', 'Chi-square; t-tests (alt: Mann-Whitney U, Wilcoxon); ANOVA (alt: Kruskal-Wallis, Friedman); two-way ANOVA; MANOVA; ANCOVA.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'testFinder',
          eyebrow: 'Test finder',
          title: 'Answer a few questions. Get the right test.',
          body: 'Statistical tests serve two purposes: exploring **relationships** and exploring **differences between groups**. Work through at least two research questions.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Match each parametric test to its non-parametric alternative.',
          buckets: [
            { id: 'p', label: 'Pearson correlation' },
            { id: 'i', label: 'Independent t-test' },
            { id: 'pt', label: 'Paired t-test' },
            { id: 'a', label: 'One-way ANOVA' },
          ],
          items: [
            { text: 'Spearman’s rank order (rho)', bucket: 'p', why: '**Spearman** is the alternative to Pearson.' },
            { text: 'Mann-Whitney U', bucket: 'i', why: '**Mann-Whitney U** is the alternative to the independent-samples t-test.' },
            { text: 'Wilcoxon signed rank', bucket: 'pt', why: '**Wilcoxon** is the alternative to the paired-samples t-test.' },
            { text: 'Kruskal-Wallis', bucket: 'a', why: '**Kruskal-Wallis** is the alternative to one-way between-groups ANOVA.' },
          ],
          explain: 'And the **Friedman test** replaces one-way repeated-measures ANOVA.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'You plan a multiple regression with 5 independent variables. By the Tabachnick and Fidell rule, what is the minimum sample size?',
          options: [
            { text: 'More than 55', why: 'The rule is N > 50 + 8m, not 50 + m.' },
            { text: 'More than 90', correct: true, why: 'N > 50 + 8 × 5 = 90.' },
            { text: 'More than 150', why: 'That’s the rough guide for factor analysis (Pallant 2005).' },
            { text: 'Exactly 5', why: 'Far too few for any regression.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A chi-square test compares sex (male/female) with buka use (yes/no). One cell has an expected frequency of 3. What’s the problem?',
          options: [
            { text: 'Nothing. Chi-square works with any numbers.', why: 'Chi-square has one key assumption about cell sizes.' },
            { text: 'It breaks the assumption that the lowest expected frequency in any cell should be at least 5.', correct: true, why: 'With an expected count below 5, the chi-square result isn’t trustworthy.' },
            { text: 'Chi-square needs normal data.', why: 'Chi-square is non-parametric, so it doesn’t assume normality.' },
            { text: 'Sex can’t be used in statistics.', why: 'Categorical variables like sex are exactly what chi-square is for.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Choosing a test: sorted.',
          recap: [
            '**Relationships**: Pearson (Spearman), partial correlation, multiple regression (N > 50 + 8m), logistic regression, factor analysis.',
            '**Differences**: chi-square (cells ≥ 5), t-tests, ANOVAs, two-way ANOVA, MANOVA, ANCOVA, each with alternatives.',
          ],
          why: 'Final case: pick the test for five real research questions.',
        },
      ],
    },
    {
      name: 'Case file',
      screens: [
        {
          type: 'recall',
          poll: 'hook',
          eyebrow: 'Back to the start',
          title: 'Is Hall A’s higher spending real?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'Two different groups, one continuous measure: the independent-samples t-test. If the data aren’t normal, use Mann-Whitney U.',
        },
        {
          type: 'story',
          art: 'charts',
          eyebrow: 'Case file',
          title: 'Five research questions',
          body: 'Your research group has five questions about student food habits. Pick the right test for each.\n\nThe last one has more than one right answer.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: '“Do students in UI and Lead City University differ in average weekly food spending?”',
          options: [
            { text: 'Independent-samples t-test', correct: true, why: 'Two different groups compared on a mean. It’s even the notes’ own example (UI vs Lead City staff).' },
            { text: 'Paired-samples t-test', why: 'Paired is for the same people measured twice.' },
            { text: 'Chi-square', why: 'Spending is continuous, not a category count.' },
            { text: 'Factor analysis', why: 'Factor analysis condenses items. It doesn’t compare groups.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: '“Does a nutrition talk change students’ healthy-eating scores?” The same students are measured before and after.',
          options: [
            { text: 'Independent-samples t-test', why: 'The groups aren’t independent. They’re the same people.' },
            { text: 'Paired-samples t-test', correct: true, why: 'The same group measured twice, before and after an intervention.' },
            { text: 'MANOVA', why: 'There’s only one outcome here.' },
            { text: 'Logistic regression', why: 'The outcome is a continuous score, not a category.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: '“Do students from four faculties differ in average buka visits per week?”',
          options: [
            { text: 'Independent-samples t-test', why: 'A t-test compares only two groups.' },
            { text: 'One-way between-groups ANOVA, with post hoc tests to find where the difference is', correct: true, why: 'Three or more different groups on one continuous outcome is one-way ANOVA.' },
            { text: 'Pearson correlation', why: 'Faculty is a grouping variable, not a continuous one.' },
            { text: 'Wilcoxon signed rank', why: 'That’s for the same people measured twice, and non-parametric.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: '“Is there a relationship between pocket money and number of meals skipped?” Both are continuous, but the data are badly skewed.',
          options: [
            { text: 'Pearson correlation', why: 'Pearson is parametric and assumes normal data. These aren’t normal.' },
            { text: 'Spearman’s rank order correlation', correct: true, why: 'The non-parametric alternative to Pearson, for when assumptions fail.' },
            { text: 'Chi-square', why: 'Both variables are continuous, not categorical.' },
            { text: 'ANCOVA', why: 'ANCOVA compares group means while controlling for a covariate.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: '“Does turnover intention rise with age, and is that different for men and women?” Which statements are correct?',
          options: [
            { text: 'Two independent variables (age group and sex) on one outcome call for a two-way ANOVA.', correct: true, why: '**Two IVs, one DV** is two-way ANOVA.' },
            { text: 'A two-way ANOVA shows main effects and an interaction effect.', correct: true, why: '**Main effects plus interaction** is what two-way ANOVA gives you.' },
            { text: '“Rising with age, but only for women” would be an interaction effect.', correct: true, why: '**One variable’s effect depending on the other** is an interaction. It’s the notes’ own example.' },
            { text: 'Chi-square is the best test here.', why: '**Turnover intention is a continuous score**, and there are two predictors.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can pick the right test.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
