// GES 103 · Chapter 6 · Lesson 2: preparing and describing quantitative data (notes 6.9–6.12).

const HOOK = [
  ['Add them up and divide by how many', 'The mean', 'Good, but one very old or very young person can drag it a long way.'],
  ['Line them up and take the middle one', 'The median', 'Resistant to extreme values. Your notes recommend it for interval data.'],
  ['Pick the age that appears most often', 'The mode', 'Quick, and the only average that works for categories like sex or faculty.'],
  ['It depends on the data', 'The statistician’s answer', 'Your notes: frequency and mode for categorical data, median for interval data, mean for ratio data.'],
];

export default {
  id: 'describing-data',
  title: 'Describing data',
  covers: 'Coding, cleaning, levels of analysis, mean, median, mode, standard deviation, skew',
  minutes: 15,
  sections: [
    {
      name: 'Preparing data',
      terms: [
        ['Data coding', 'Converting responses into numbers using a codebook (variable ID, label, values, measurement level).'],
        ['Data cleaning', 'Checking for errors (e.g. typing 22 instead of 2), which create outliers. For categorical variables, run frequencies.'],
        ['Univariate, bivariate, multivariate', 'One variable (description); two (relationships, cross-tabulation); more than two at once.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'charts',
          eyebrow: 'Chapter 6 · Lesson 2',
          title: 'Describing data',
          body: 'Your buka survey is back: 298 completed questionnaires. A stack of paper isn’t a finding yet.\n\nYour supervisor asks one question: “So, what’s the typical age of your respondents?”',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'charts',
          poll: 'hook',
          prompt: 'How would you work out the “typical” age?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Good starting point.',
          pollBody: 'All four answers are real. Each “average” tells a different story. You’ll get to play with all three shortly.',
        },
        {
          type: 'order',
          eyebrow: 'Before analysis',
          prompt: 'Put the preparation steps for quantitative data in order.',
          items: [
            '**Coding**: turn responses into numbers using a codebook',
            '**Data entry**: into SPSS, Excel or Access',
            '**Cleaning**: check for typing errors that create outliers',
            '**Recoding and transformation**, where needed',
          ],
          hint: 'You can’t clean data you haven’t entered, or enter data you haven’t coded.',
          explain: 'The main tool is **SPSS** (Statistical Package for the Social Sciences). The codebook is often prepared before fieldwork.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'In your codebook, Sex is coded Male = 1, Female = 2. While cleaning, you find a respondent coded 22. What most likely happened, and how do you catch errors like this?',
          options: [
            { text: 'A new sex category exists. Add it to the codebook.', why: 'It’s far more likely to be a typing error.' },
            { text: 'A typing error (22 instead of 2). Running descriptive frequencies on categorical variables catches it.', correct: true, why: 'Your notes use exactly this example. Frequencies show any value outside the codebook straight away.' },
            { text: 'The respondent is 22 years old.', why: 'Age would be a different variable in the codebook.' },
            { text: 'Nothing. Leave it, since it won’t matter.', why: 'Errors like this create outliers that distort results.' },
          ],
          explain: 'Sex (male/female) is measured at the **nominal** level. Age is measured at the **ratio** level.',
        },
        {
          type: 'sort',
          eyebrow: 'Levels of analysis',
          prompt: 'Univariate, bivariate or multivariate?',
          buckets: [
            { id: 'u', label: 'Univariate', hint: 'one variable' },
            { id: 'b', label: 'Bivariate', hint: 'two variables' },
            { id: 'm', label: 'Multivariate', hint: 'more than two' },
          ],
          items: [
            { text: 'What percentage of respondents are female?', bucket: 'u', why: '**Describing one variable** (sex) is univariate.' },
            { text: 'The average age of respondents', bucket: 'u', why: '**One variable** (age) described: univariate.' },
            { text: 'Do male and female students differ in how often they eat at bukas?', bucket: 'b', why: '**Two variables** (sex and buka visits): bivariate.' },
            { text: 'How do age, sex and faculty together affect buka visits?', bucket: 'm', why: '**Three predictors at once**: multivariate.' },
          ],
          explain: 'Bivariate and multivariate results are shown in a **contingency table** of percentages.',
        },
        {
          type: 'bridge',
          title: 'Data: prepared.',
          recap: [
            '**Code** (codebook) → **enter** (SPSS) → **clean** (frequencies catch 22-for-2 errors) → recode.',
            '**Univariate** (one), **bivariate** (two), **multivariate** (more).',
          ],
          why: 'Data is clean. Now: what’s the typical respondent like? Time for averages.',
        },
      ],
    },
    {
      name: 'Averages',
      terms: [
        ['Frequency distribution', 'Count, percentage and cumulative percentage for each value (e.g. Male 152 = 51.0%, Female 146 = 49.0%).'],
        ['Mean, median, mode', 'Mean = sum ÷ count. Median = middle value when ranked. Mode = most frequent value.'],
        ['Which average when', 'Frequency and mode for categorical data; median for interval data; mean for ratio data.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Frequency distribution',
          title: 'Start by counting.',
          body: 'A **frequency distribution** gives the count, percentage and cumulative percentage for each value.\n\nYour survey: ==Male 152 = 51.0%, Female 146 = 49.0%, Total 298.==\n\nYou can show it with histograms, bar charts or pie charts. Next: the three measures of central tendency.',
        },
        {
          type: 'custom',
          widget: 'averages',
          eyebrow: 'Measures of central tendency',
          title: 'Play with the averages.',
          body: 'These are your notes’ worked example: five ages, 22, 18, 32, 18 and 25. Change them and watch all three averages respond.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'For the original ages (22, 18, 32, 18, 25), what are the mean, median and mode?',
          options: [
            { text: 'Mean 23, median 22, mode 18', correct: true, why: 'Mean = 115 ÷ 5 = 23. Ranked 18, 18, 22, 25, 32, so the median is 22. 18 appears twice, so the mode is 18.' },
            { text: 'Mean 22, median 23, mode 18', why: 'You swapped the mean and the median. Mean = 115 ÷ 5.' },
            { text: 'Mean 23, median 18, mode 22', why: 'The median is the middle value of the ranked list: 18, 18, **22**, 25, 32.' },
            { text: 'Mean 25, median 22, mode 32', why: 'Add all five (115) and divide by 5.' },
          ],
          explain: 'The range is highest minus lowest: 18 to 32.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Your notes’ rule of thumb: which statistic suits which kind of data?',
          buckets: [
            { id: 'c', label: 'Frequency and mode', hint: 'categorical data' },
            { id: 'i', label: 'Median', hint: 'interval data' },
            { id: 'r', label: 'Mean', hint: 'ratio data' },
          ],
          items: [
            { text: 'Respondents’ faculty (Arts, Science, Law…)', bucket: 'c', why: '**Faculty** is categorical, so use frequency and mode.' },
            { text: 'Sex (male/female)', bucket: 'c', why: '**Sex** is categorical (nominal).' },
            { text: 'Satisfaction scored on a 1–10 scale', bucket: 'i', why: '**A rating scale** is treated as interval data, so use the median.' },
            { text: 'Age in years', bucket: 'r', why: '**Age** is ratio data, so use the mean.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'One respondent in a group of five is 60 years old; the others are all about 20. Which average best represents the “typical” age, and why?',
          options: [
            { text: 'The mean, because it uses every value.', why: 'Using every value is exactly the problem: the 60-year-old drags it far above what’s typical.' },
            { text: 'The median, because one extreme value barely moves it.', correct: true, why: 'You saw this in the playground: push one age to the maximum and the mean jumps while the median stays put.' },
            { text: 'The range, because it shows the gap.', why: 'The range measures spread, not the typical value.' },
            { text: 'None of them work.', why: 'The median handles this well.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Averages: mastered.',
          recap: [
            '**Mean** (sum ÷ count), **median** (middle when ranked), **mode** (most frequent). Worked example: 23, 22, 18.',
            'Categorical → frequency and mode; interval → median; ratio → mean. Extreme values pull the mean.',
          ],
          why: 'Two classes can share the same average age but look completely different. One is all 20-year-olds; the other mixes teenagers and grandparents. That’s spread.',
        },
      ],
    },
    {
      name: 'Spread & shape',
      terms: [
        ['Range', 'Highest minus lowest value.'],
        ['Standard deviation (S.D.)', 'Spread around the mean: about 68% within ±1 S.D., 95% within ±2, nearly all within ±3.'],
        ['Skewness', 'Positive: scores bunched at the low (left) end. Negative: bunched at the high (right) end. 0 = normal.'],
        ['Kurtosis', 'Positive: peaked, long thin tails. Negative: flat, many cases at the extremes. 0 = normal.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'bellCurve',
          eyebrow: 'Standard deviation',
          title: 'Stretch the bell curve.',
          body: 'Your notes’ example: mean age 30, standard deviation 10. Change the spread and check each band.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Mean age 30, S.D. 10. About what percentage of people are aged 20–40?',
          options: [
            { text: '50%', why: '20–40 is ±1 S.D. from the mean.' },
            { text: '68%', correct: true, why: '±1 S.D. covers about 68% of cases, the notes’ own example.' },
            { text: '95%', why: '95% is ±2 S.D.: ages 10–50 here.' },
            { text: '100%', why: 'Even ±3 S.D. doesn’t quite cover everyone.' },
          ],
          note: 'Your book says **99.9%** of cases fall within ±3 S.D. The standard figure is **99.7%**. Give the book’s figure if your exam asks for it.',
        },
        {
          type: 'reveal',
          eyebrow: 'Shape',
          title: 'Skewness and kurtosis check for normality.',
          body: 'For a perfectly normal distribution, both equal 0.',
          cards: [
            { title: 'Positive skew', text: 'Scores **bunched at the low (left) end**, with a long tail to the right.' },
            { title: 'Negative skew', text: 'Scores **bunched at the high (right) end**, with a long tail to the left.' },
            { title: 'Positive kurtosis', text: '**Peaked**: clustered in the centre, with long thin tails.' },
            { title: 'Negative kurtosis', text: '**Flat**: many cases at the extremes.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'In a very hard exam, most students score low and only a few score high. What shape is the distribution of scores?',
          options: [
            { text: 'Positively skewed', correct: true, why: 'Scores bunch at the low (left) end with a tail toward high scores: positive skew.' },
            { text: 'Negatively skewed', why: 'Negative skew means bunching at the high end, as in a very easy exam.' },
            { text: 'Perfectly normal', why: 'A normal curve is symmetrical. This one isn’t.' },
            { text: 'Negative kurtosis', why: 'Kurtosis is about peakedness, not which end the scores bunch at.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Spread and shape: understood.',
          recap: [
            '**Range** = highest − lowest. **S.D.**: about 68% within ±1, 95% within ±2, nearly all within ±3 (book: 99.9%; standard: 99.7%).',
            '**Skew**: positive bunches low, negative bunches high. **Kurtosis**: positive peaked, negative flat.',
          ],
          why: 'Your supervisor has more questions. Time to describe the buka data properly.',
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
          title: 'What’s the “typical” age?',
          body: 'Here’s what each approach from the start actually gives you.',
          rows: HOOK,
          after: 'There’s no single “right” average. There’s the right average for your data.',
        },
        {
          type: 'story',
          art: 'charts',
          eyebrow: 'Case file',
          title: 'The supervisor’s questions',
          body: 'You present your buka findings. Your supervisor fires off five questions.\n\nThe last two are the toughest in the lesson.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: '“What percentage of your respondents were male?” Which statistic answers this?',
          options: [
            { text: 'A frequency distribution', correct: true, why: 'Count and percentage per category: Male 152 = 51.0%.' },
            { text: 'The standard deviation', why: 'S.D. measures spread of a continuous variable.' },
            { text: 'The mean', why: 'You can’t average a category like sex.' },
            { text: 'Kurtosis', why: 'Kurtosis describes the shape of a distribution.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: '“Which faculty did respondents most often come from?” Which average?',
          options: [
            { text: 'Mean', why: 'Faculty is categorical, so there is nothing to average.' },
            { text: 'Median', why: 'Faculties can’t be ranked in a meaningful order.' },
            { text: 'Mode', correct: true, why: 'The most frequent category is the mode, the right choice for categorical data.' },
            { text: 'Range', why: 'Range needs numbers.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'Weekly buka spending has mean ₦4,000 and S.D. ₦500 in Hall A, and mean ₦4,000 and S.D. ₦2,000 in Hall B. What does this tell you?',
          options: [
            { text: 'Both halls spend the same, in the same way.', why: 'Same average, very different spread.' },
            { text: 'Hall A students spend similar amounts; Hall B’s spending varies much more.', correct: true, why: 'A smaller S.D. means values cluster tightly around the mean.' },
            { text: 'Hall B spends four times as much.', why: 'The means are equal. Only the spread differs.' },
            { text: 'Hall A has more students.', why: 'S.D. says nothing about group size.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'In Hall A (mean ₦4,000, S.D. ₦500), about 95% of students spend between…',
          options: [
            { text: '₦3,500 and ₦4,500', why: 'That’s ±1 S.D.: about 68%.' },
            { text: '₦3,000 and ₦5,000', correct: true, why: '±2 S.D. = ₦4,000 ± ₦1,000, covering about 95% of cases.' },
            { text: '₦2,500 and ₦5,500', why: 'That’s ±3 S.D.: nearly everyone.' },
            { text: '₦0 and ₦8,000', why: 'Far too wide for an S.D. of ₦500.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'A few wealthy students spend ₦20,000 a week while most spend about ₦3,000. Which statements are true?',
          options: [
            { text: 'The distribution is positively skewed.', correct: true, why: '**Most values bunch at the low end** with a long tail to the right.' },
            { text: 'The mean will be pulled above what most students spend.', correct: true, why: '**Extreme high values drag the mean up.**' },
            { text: 'The median is a better summary of typical spending here.', correct: true, why: '**The median resists extreme values.**' },
            { text: 'Skewness here is 0.', why: '**0 means perfectly symmetrical.** This distribution isn’t.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can describe any dataset.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
