// SPO 101 · Data · Lesson 3: real data is messy. Reading a CSV file, missing values, duplicates,
// numbers typed as words, impossible values, and "garbage in, garbage out".

const RAW = `day,temp,rain,bottles
1,29,no,54
2,37,no,115
3,29,no,42
4,25,no,15
5,25,yes,0
6,33,yes,
7,27,no,35
8,33,no,75
8,33,no,75
9,27,yes,1
10,26,no,230
11,thirty-three,no,78
12,33,no,72`;

const SETUP = `import pandas as pd\nimport io\nraw = """${RAW}"""`;
const LOADED = `${SETUP}\ndf = pd.read_csv(io.StringIO(raw))`;

export default {
  id: 'messy-data',
  title: 'Messy data',
  covers: 'CSV files, missing values, duplicates, wrong types, impossible values, cleaning with pandas',
  minutes: 16,
  sections: [
    {
      name: 'What goes wrong',
      terms: [
        ['CSV file', 'A plain text file of a table: one row per line, values separated by commas. The most common data format.'],
        ['Missing value', 'A blank where a value should be. pandas shows it as `NaN` (“not a number”).'],
        ['Data cleaning', 'Finding and fixing problems in data before using it.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'One huge sales day is added to the month. Which summary barely moves?',
          options: [
            { text: 'The median', correct: true, why: 'It depends only on the middle position.' },
            { text: 'The mean', why: 'The mean adds every value, so it jumps.' },
            { text: 'The maximum', why: 'The maximum becomes the huge day.' },
            { text: 'The total', why: 'The total grows by the whole amount.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 3 · Data',
          title: 'Ade’s nephew types up the notebook',
          body: 'Ade’s nephew copies the paper notebook into a ==CSV file==: a text file where each line is a row and commas separate the values. The first line holds the column names.\n\n`day,temp,rain,bottles`\n`1,29,no,54`\n`2,37,no,115`\n\nBut people make mistakes when typing, notebooks get smudged, and some days get skipped. Real data is **always** messy. Professionals spend more time cleaning data than building models.',
        },
        {
          type: 'reveal',
          eyebrow: 'Spot the problems',
          title: 'Five things that went wrong',
          body: '`6,33,yes,`\n`8,33,no,75`\n`8,33,no,75`\n`10,26,no,230`\n`11,thirty-three,no,78`',
          cards: [
            { title: 'Missing value', text: 'Day 6 has no bottles number: the end of the line is blank.' },
            { title: 'Duplicate row', text: 'Day 8 was typed twice. Counting it twice would mislead the model.' },
            { title: 'Impossible value', text: 'Day 10: $230$ bottles on a cool $26$ °C day, when the best day ever was $129$. Probably $23$ with an extra $0$.' },
            { title: 'Wrong type', text: 'Day 11’s temperature is written in words. A model needs the number $33$.' },
            { title: 'Words for yes/no', text: 'Rain is “yes”/“no”. Models need numbers, so these become $1$ and $0$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why does any of this matter if the model is clever?',
          options: [
            { text: 'A model learns whatever is in the data, mistakes included', correct: true, why: 'The saying is **garbage in, garbage out**. A $230$ on a cool day would pull Ade’s line badly out of shape.' },
            { text: 'It doesn’t: models ignore mistakes automatically', why: 'They can’t tell a typo from a real day.' },
            { text: 'Only because Python crashes on messy data', why: 'Often it doesn’t crash; it quietly learns the wrong thing, which is worse.' },
            { text: 'It only matters for big datasets', why: 'Small datasets suffer most: one bad row is a big share.' },
          ],
        },
      ],
    },
    {
      name: 'Cleaning with pandas',
      terms: [
        ['Imputation', 'Filling a missing value with a sensible stand-in, such as the median.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Load and inspect',
          body: 'The file’s text is in the variable `raw`. `pd.read_csv` turns CSV text into a table (`io.StringIO` lets it read text as if it were a file).',
          graph: {
            packages: ['pandas'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it: load the file and show the whole table.', code: 'df = pd.read_csv(io.StringIO(raw))\nprint(df)', test: 'len(df) == 13', hint: 'Run it as it is.', solution: 'df = pd.read_csv(io.StringIO(raw))\nprint(df)', done: 'Spot the `NaN` on day 6: that is pandas marking the missing value.' },
              { ask: 'Count the missing values in the `bottles` column: `isna()` asks “is it missing?” for each row, and `sum()` counts the `True`s.', code: 'print(df["bottles"].isna().sum())', expect: '1', hint: 'Run it as it is.', solution: 'print(df["bottles"].isna().sum())', done: 'One missing value.' },
              { ask: 'Count the duplicated rows with `df.duplicated().sum()`.', code: 'print()', expect: '1', hint: '`print(df.duplicated().sum())`.', solution: 'print(df.duplicated().sum())', done: 'One duplicate: the second copy of day 8.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Fix it, one problem at a time',
          body: 'The messy table `df` is loaded. Each fix replaces the old column or table with a cleaned one.',
          graph: {
            packages: ['pandas'],
            setup: LOADED,
            tasks: [
              { ask: 'Remove the duplicate, then print how many rows are left.', code: 'df = df.drop_duplicates()\nprint(len(df))', expect: '12', hint: 'Run it as it is.', solution: 'df = df.drop_duplicates()\nprint(len(df))', done: '12 rows: one per day.' },
              { ask: 'Fix the temperature typed in words, and turn the column into whole numbers (`astype(int)`). Print the hottest day.', code: 'df["temp"] = df["temp"].replace("thirty-three", "33").astype(int)\nprint(df["temp"].max())', expect: '37', hint: 'Run it as it is.', solution: 'df["temp"] = df["temp"].replace("thirty-three", "33").astype(int)\nprint(df["temp"].max())', done: 'Now every temperature is a number.' },
              { ask: 'Turn rain into numbers: `"yes"` becomes `1`, `"no"` becomes `0`. Print the number of rainy days.', code: 'df["rain"] = df["rain"].map({"yes": 1, "no": 0})\nprint(df["rain"].sum())', expect: '3', hint: 'Run it as it is.', solution: 'df["rain"] = df["rain"].map({"yes": 1, "no": 0})\nprint(df["rain"].sum())', done: '`map` swaps each value using the pairs in the curly brackets.' },
              { ask: 'Day 10’s $230$ is impossible. Ade checks his paper notebook: it was $23$. Fix it, then print the largest bottles value.', code: 'df.loc[df["day"] == 10, "bottles"] = 23\nprint(df["bottles"].max())', expect: '115.0', hint: 'Run it as it is. `df.loc[which rows, which column]` picks one cell to change.', solution: 'df.loc[df["day"] == 10, "bottles"] = 23\nprint(df["bottles"].max())', done: 'Fixed at the source: the best fix is always to check the original record.' },
              { ask: 'Day 6 is still missing and the notebook page is smudged. Fill it with the **median** of the other days, then count missing values again.', code: 'df["bottles"] = df["bottles"].fillna(df["bottles"].median())\nprint(df["bottles"].isna().sum())', expect: '0', hint: 'Run it as it is.', solution: 'df["bottles"] = df["bottles"].fillna(df["bottles"].median())\nprint(df["bottles"].isna().sum())', done: 'Clean. Filling in a stand-in value is called ==imputation==. Always say in your report that you did it.' },
            ],
          },
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'A sensible routine for any new dataset:',
          items: [
            'Load it and look at the first rows',
            'Count missing values and duplicates',
            'Check each column has the right kind of value',
            'Draw it to spot impossible values and outliers',
            'Fix at the source if you can; otherwise fill or remove, and write down what you did',
          ],
          explain: 'Writing down every cleaning step matters: others must be able to repeat your work and judge your results.',
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Talking about data quality',
          body: '**“We removed one duplicate, corrected one entry against the original record, converted rain to 0/1, and imputed one missing sales value with the median.”**\n\nAt any talk or meeting, the questions “where did the data come from?” and “how was it cleaned?” are always fair. Now you can answer them, and ask them.',
        },
        {
          type: 'finish',
          title: 'You can clean data.',
          body: 'Missing values, duplicates, wrong types, impossible values. Next chapter: back to fitting lines, now with real tools.',
        },
      ],
    },
  ],
};
