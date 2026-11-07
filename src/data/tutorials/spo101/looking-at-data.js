// SPO 101 · Data · Lesson 2: look before you model. Histograms, mean versus median, outliers,
// scatter plots and a hidden second feature (rain), correlation versus causation.
import { histogramScene, rainScene } from './data-scenes';
import { MONTH_DF_PY } from './kiosk-data';

export default {
  id: 'looking-at-data',
  title: 'Drawing the data',
  covers: 'Histograms, mean and median, outliers, scatter plots, hidden features, correlation versus causation',
  minutes: 14,
  sections: [
    {
      name: 'One column at a time',
      terms: [
        ['Histogram', 'Bars showing how many examples fall in each range of values.'],
        ['Mean', 'The average: add everything up and divide by how many.'],
        ['Median', 'The middle value when sorted. Unlike the mean, one extreme value barely moves it.'],
        ['Baseline', 'The simplest sensible prediction (like always guessing the average). Any real model must beat it.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does `df[df["rain"] == 1]` give you?',
          options: [
            { text: 'Only the rows (days) where it rained', correct: true, why: 'The question picks out the rows where the answer is `True`.' },
            { text: 'The rain column', why: 'That is `df["rain"]`.' },
            { text: 'The number of rainy days', why: 'You would need `len(...)` around it.' },
            { text: 'It changes every rain value to 1', why: '`==` asks; it doesn’t change anything.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 3 · Data',
          title: 'Look before you leap',
          body: 'The first rule of machine learning practice: **look at your data before you build anything.** Pictures reveal patterns, mistakes and surprises that a table of numbers hides.\n\nStart with one column. How are Ade’s daily sales spread out?',
        },
        histogramScene,
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'One day a school trip buys $600$ bottles. What happens to the mean and the median of the month?',
          options: [
            { text: 'The mean jumps up a lot; the median barely moves', correct: true, why: 'The mean adds up every value, so one huge day drags it up (to about $65$). The median only cares about the middle position, so it hardly changes.' },
            { text: 'Both jump up equally', why: 'The median only depends on which value is in the middle.' },
            { text: 'Neither changes', why: 'The mean includes every value, so it must change.' },
            { text: 'The median jumps; the mean barely moves', why: 'It’s the other way round.' },
          ],
          explain: 'A value far from all the others is an ==outlier==. Always ask whether it is real (a school trip) or a mistake (someone typed 600 instead of 60).',
        },
      ],
    },
    {
      name: 'Two columns together',
      terms: [
        ['Scatter plot', 'One dot per example, placed by two of its numbers, to see how they move together.'],
        ['Correlation', 'Two things rising or falling together. It doesn’t prove one causes the other.'],
      ],
      screens: [
        rainScene,
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'The whole month in one summary',
          body: '`describe()` gives every column’s count, mean, spread (std), smallest, quartiles and largest. `round(1)` keeps one decimal place.',
          graph: {
            packages: ['pandas'],
            setup: MONTH_DF_PY,
            tasks: [
              { ask: 'Run it and find the smallest and largest daily sales.', code: 'print(df.describe().round(1))', test: 'True', hint: 'Run it as it is.', solution: 'print(df.describe().round(1))', done: 'Look at the `bottles` column: min $0$, max $129$. The 50% row is the median, $47$.' },
              { ask: 'How strongly do temperature and sales move together? `corr()` gives a number from $-1$ to $1$; near $1$ means strongly together.', code: 'print(round(df["temp"].corr(df["bottles"]), 2))', expect: '0.92', hint: 'Run it as it is.', solution: 'print(round(df["temp"].corr(df["bottles"]), 2))', done: '$0.92$: a strong ==correlation==. Hot days and high sales go together.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Over the month, the days Ade wore his blue cap also had high sales (he only wears it in hot sun). Does the cap cause sales?',
          options: [
            { text: 'No: heat causes both the cap and the sales', correct: true, why: 'This is the classic trap: **correlation is not causation**. A hidden third thing (hot sun) drives both.' },
            { text: 'Yes: the numbers prove it', why: 'The numbers show they happen together, not that one causes the other.' },
            { text: 'Yes, if the correlation is above 0.5', why: 'No size of correlation proves cause by itself.' },
            { text: 'Only on market days', why: 'Market days don’t change the logic.' },
          ],
          explain: 'In discussions, “is that causal, or just correlated?” is one of the most respected questions you can ask.',
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'What exploration found',
          body: '**“Before modelling, we explored the data. Sales are right-skewed: most days under 80, a few over 100. Temperature correlates strongly with sales, 0.92, and rainy days sell about a third of dry days, so rain is a useful second feature.”**\n\n“Right-skewed” just means the long tail of rare big values is on the right of the histogram.',
        },
        {
          type: 'finish',
          title: 'You can read data with pictures.',
          body: 'Histograms, mean and median, outliers, scatter plots, correlation. Next: what to do when the data is messy, which it always is.',
        },
      ],
    },
  ],
};
