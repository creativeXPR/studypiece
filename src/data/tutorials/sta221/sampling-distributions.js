// STA 221 · Sampling · Lesson 2: how many samples there are, building a sampling distribution by
// hand, the standard error, and standard deviation versus standard error.

// Probability bars [value, probability] for the population {1, 3, 5, 7} and the mean of samples of 2.
const BARS = [
  [[1, 0.25], [3, 0.25], [5, 0.25], [7, 0.25]],
  [[2, 1 / 6], [3, 1 / 6], [4, 2 / 6], [5, 1 / 6], [6, 1 / 6]],
  [[1, 1 / 16], [2, 2 / 16], [3, 3 / 16], [4, 4 / 16], [5, 3 / 16], [6, 2 / 16], [7, 1 / 16]],
];

export default {
  id: 'sampling-distributions',
  title: 'Sampling distributions and the standard error',
  covers: 'Number of possible samples Nⁿ and ᴺCₙ, the sampling distribution of a statistic, building one by listing all samples, mean of the sample means, the standard error, standard deviation versus standard error',
  minutes: 14,
  sections: [
    {
      name: 'Every possible sample',
      terms: [
        ['Number of samples', 'With replacement: $N^n$. Without replacement: ${}^NC_n = \\dfrac{N!}{n!(N - n)!}$.'],
        ['Sampling distribution', 'The values a statistic takes over **all** possible samples of size $n$, with how often each occurs.'],
        ['Standard error (SE)', 'The standard deviation of a sampling distribution. For the mean: $\\sigma_{\\bar x}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Sampling · Lesson 2',
          title: 'A statistic wobbles',
          body: 'Take a sample and work out its mean. Take another sample: you get a slightly different mean. List the mean of **every** possible sample, with how often each value occurs, and you have the ==sampling distribution== of the mean.\n\nIts standard deviation, the ==standard error==, says how much the statistic wobbles from sample to sample.',
        },
        {
          type: 'story',
          eyebrow: 'Counting samples',
          title: 'How many samples of size $n$ from $N$ units?',
          body: '**With replacement:** each of the $n$ draws has all $N$ choices again: $N^n$.\n**Without replacement:** just choose $n$ of the $N$: ${}^NC_n = \\frac{N!}{n!(N - n)!}$.\n\n**Example.** Samples of size $3$ from $6$ units: $6^3 = 216$ with replacement; ${}^6C_3 = 20$ without.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'How many samples of size $2$ can be drawn **without** replacement from $\\{1, 3, 5, 7\\}$?',
          options: [
            { text: '$6$', correct: true, why: '${}^4C_2 = \\frac{4!}{2!\\,2!} = 6$.' },
            { text: '$16$', why: 'That is $4^2$, with replacement.' },
            { text: '$8$', why: 'Use ${}^NC_n$ with $N = 4$, $n = 2$.' },
            { text: '$12$', why: 'That counts ordered pairs without repeats; samples are unordered.' },
          ],
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'From the population to the sampling distribution',
          body: 'Population $\\{1, 3, 5, 7\\}$, samples of size $2$. Bar heights are probabilities.',
          graph: {
            x: [0, 8], y: [0, 0.42], xs: [[1], [2], [3], [4], [5], [6], [7]], ys: [[0.25, '¼']],
            views: ['Population', 'Means, without', 'Means, with'],
            rects: [{ kind: 'up', at: (p, v) => BARS[v].map(([x, h]) => [x - 0.35, h, 0.7, h]) }],
            segs: [{ kind: 'guide', at: () => [4, 0, 4, 0.42] }],
            read: (p, v) => [
              '$\\mu = 4$ and $\\sigma^2 = \\frac{9 + 1 + 1 + 9}{4} = 5$',
              '$6$ samples; means $2, 3, 4, 4, 5, 6$. Mean of means $= 4 = \\mu$, variance $\\frac{10}{6} = \\frac53$, SE $\\approx 1.291$',
              '$16$ samples. Mean of means $= 4 = \\mu$, variance $= \\frac{\\sigma^2}{n} = \\frac52$',
            ][v],
            need: 3,
            action: 'Look at all three',
          },
          asides: [{ label: 'Note', text: 'Both sampling distributions are centred on $\\mu = 4$, and both are narrower than the population: averages are calmer than single values.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Check the formula',
          body: 'Without replacement, the standard error of the mean is\n$$\\sigma_{\\bar x} = \\frac{\\sigma}{\\sqrt n}\\sqrt{\\frac{N - n}{N - 1}} = \\frac{\\sqrt5}{\\sqrt2}\\sqrt{\\frac23} = \\sqrt{\\frac53} \\approx 1.291,$$\nexactly what the list gave. With replacement it is simply $\\frac{\\sigma}{\\sqrt n}$, so the variance is $\\frac52$.',
          asides: [{ label: 'Exam tip', text: 'When listing samples, write the count first ($N^n$ or ${}^NC_n$) and make sure your list has exactly that many.' }],
        },
        {
          type: 'reveal',
          eyebrow: 'Three points of interest',
          title: 'What to say about any sampling distribution of the mean',
          body: 'Given a sampling distribution, an exam often asks for its "points of interest". There are three, and the $\\{1, 3, 5, 7\\}$ example shows all of them.',
          cards: [
            { title: '1 · Its mean', text: 'The mean of the sample means equals the population mean: $\\mu_{\\bar x} = \\mu$. Here $4 = 4$: $\\bar X$ is **unbiased**.' },
            { title: '2 · Its spread', text: 'Its variance is $\\frac{\\sigma^2}{n}$ (with replacement), or $\\frac{\\sigma^2}{n}\\cdot\\frac{N - n}{N - 1}$ (without). Here $\\frac52$ and $\\frac53$. It is **smaller** than the population variance $5$.' },
            { title: '3 · Its shape', text: 'It is more bunched in the middle than the population, and tends to the **normal** shape as $n$ grows (Central Limit Theorem). Here the flat population gives a peaked, symmetric distribution of means.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Sampling distributions: set.',
          recap: ['$N^n$ samples with replacement, ${}^NC_n$ without.', 'The mean of the sample means is $\\mu$.', 'Its standard deviation is the standard error.'],
          why: 'Two words students mix up: standard deviation and standard error.',
        },
      ],
    },
    {
      name: 'SD versus SE',
      terms: [
        ['Standard deviation (SD)', 'Spread of the individual values; describes the data; does not shrink as $n$ grows.'],
        ['Standard error (SE)', 'Spread of the sample means about $\\mu$; describes how accurate $\\bar x$ is; shrinks as $n$ grows: $\\frac{\\sigma}{\\sqrt n}$.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Side by side',
          title: 'SD = spread of the Data; SE = Error of the Estimate',
          cards: [
            { title: 'Standard deviation', text: 'How far **individual** values spread about their mean ($\\sigma$ or $s$). It settles near $\\sigma$ however big the sample.' },
            { title: 'Standard error', text: 'How far **sample means** spread about $\\mu$: $\\sigma_{\\bar x} = \\frac{\\sigma}{\\sqrt n}$. Bigger samples, smaller error.' },
            { title: 'Which is smaller?', text: 'The SE, since $\\sqrt n > 1$ for $n \\ge 2$. One student’s height varies a lot; the average of $50$ hardly moves.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A population has $\\sigma = 12$. What is the standard error of the mean for samples of $36$?',
          options: [
            { text: '$2$', correct: true, why: '$\\frac{12}{\\sqrt{36}} = \\frac{12}{6} = 2$.' },
            { text: '$12$', why: 'That is the standard deviation of single values.' },
            { text: '$\\frac13$', why: 'Divide by $\\sqrt{36} = 6$, not by $36$.' },
            { text: '$4$', why: '$\\sqrt{36} = 6$, so $\\frac{12}{6} = 2$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think',
          prompt: 'To **halve** the standard error of the mean, the sample size must be',
          options: [
            { text: 'multiplied by $4$', correct: true, why: 'SE $= \\frac{\\sigma}{\\sqrt n}$; $\\sqrt{4n} = 2\\sqrt n$.' },
            { text: 'doubled', why: 'Doubling $n$ only divides the SE by $\\sqrt2 \\approx 1.41$.' },
            { text: 'halved', why: 'A smaller sample gives a **bigger** SE.' },
            { text: 'squared', why: 'Four times the sample is enough.' },
          ],
        },
        {
          type: 'finish',
          title: 'Sampling distributions: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
