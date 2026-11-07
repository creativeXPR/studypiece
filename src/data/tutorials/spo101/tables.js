// SPO 101 · Data · Lesson 1: data as a table (rows = examples, columns = features and label),
// pandas DataFrames, picking columns, averages and filtering rows.
import { MONTH_DF_PY, MONTH_PY } from './kiosk-data';

export default {
  id: 'tables',
  title: 'Data as a table',
  covers: 'Rows and columns, pandas DataFrames, choosing columns, averages, filtering rows',
  minutes: 16,
  sections: [
    {
      name: 'Rows and columns',
      terms: [
        ['Row', 'One example: for Ade, one day.'],
        ['Column', 'One kind of information recorded for every example: temperature, rain, bottles.'],
        ['Dataset', 'A collection of examples, usually a table.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does `sum(bottles) / len(bottles)` work out?',
          options: [
            { text: 'The average bottles per day', correct: true, why: 'Total divided by how many.' },
            { text: 'The total bottles', why: 'That is just `sum(bottles)`.' },
            { text: 'The number of days', why: 'That is `len(bottles)`.' },
            { text: 'The best day', why: 'That is `max(bottles)`.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 3 · Data',
          title: 'Ade keeps a better notebook',
          body: 'Ade noticed that temperature isn’t the whole story. For a month he also writes whether it **rained** and whether it was **market day** (every third day, when the market is busiest).\n\nNow each day has four numbers. Rain and market are recorded as $1$ for yes and $0$ for no, because models work with numbers.\n\nThe natural way to hold this is a **table**: one ==row== per day, one ==column== per kind of information.',
        },
        {
          type: 'reveal',
          eyebrow: 'Reading a table',
          title: 'The first rows of Ade’s month',
          body: '`temp  rain  market  bottles`\n`  29     0       1       54`\n`  37     0       0      115`\n`  29     0       0       42`\n`  25     0       1       15`\n`  25     1       0        0`',
          cards: [
            { title: 'A row', text: 'One day. The first row: $29$ °C, no rain, market day, $54$ bottles.' },
            { title: 'Feature columns', text: '`temp`, `rain`, `market`: the inputs a model may use.' },
            { title: 'The label column', text: '`bottles`: the answer we want to predict.' },
            { title: 'Day 5', text: 'Rain on a cool day: nobody bought anything.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Ade’s month has 30 days and records temperature, rain, market day and bottles. How big is the table?',
          options: [
            { text: '30 rows and 4 columns', correct: true, why: 'One row per day, one column per thing recorded.' },
            { text: '4 rows and 30 columns', why: 'By convention, each example (day) is a row.' },
            { text: '30 rows and 1 column', why: 'Four things are recorded each day.' },
            { text: '120 rows', why: 'That counts every single number; the table is 30 × 4.' },
          ],
        },
      ],
    },
    {
      name: 'Tables in Python: pandas',
      terms: [
        ['pandas', 'The Python library for tables. Almost every data project starts with `import pandas as pd`.'],
        ['DataFrame', 'pandas’ name for a table. By habit it is often stored in a variable called `df`.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'A library for tables',
          title: 'Meet pandas',
          body: '==pandas== is the library data scientists use for tables. You load it like this:\n\n`import pandas as pd`\n\n`as pd` gives it a short nickname, so you type `pd.` instead of `pandas.` every time. Everyone uses this nickname.\n\nA pandas table is called a ==DataFrame==. You can build one from lists, giving each column a name:\n\n`df = pd.DataFrame({"temp": temp, "bottles": bottles})`\n\nThe curly brackets `{ }` pair each column name (in quotes) with its list, using a colon.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ade’s month as a table',
          body: 'The four lists are loaded. pandas takes a few seconds to load the first time.',
          graph: {
            packages: ['pandas'],
            setup: `import pandas as pd\n${MONTH_PY}`,
            tasks: [
              { ask: 'Run it: build the table and show its first 5 rows with `df.head()`.', code: 'df = pd.DataFrame({"temp": temp, "rain": rain, "market": market, "bottles": bottles})\nprint(df.head())', test: 'len(df) == 30', hint: 'Run it as it is.', solution: 'df = pd.DataFrame({"temp": temp, "rain": rain, "market": market, "bottles": bottles})\nprint(df.head())', done: 'A table. The numbers on the left (0 to 4) are the row positions, counted from 0 like list positions.' },
              { ask: 'Print how many rows the table has.', code: 'print()', expect: '30', hint: '`len` works on tables too: `print(len(df))`.', solution: 'print(len(df))' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Picking a column',
          title: '`df["bottles"]`',
          body: 'Square brackets with a column name in quotes pick out one column:\n\n`df["bottles"]`\n\nA column comes with handy functions, written after a dot:\n\n`df["bottles"].mean()` is the average, `.max()` the largest, `.min()` the smallest.\n\nAnd `df.describe()` summarises every column at once: count, mean, smallest, largest and more.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Ask the table questions',
          body: 'The table `df` is loaded.',
          graph: {
            packages: ['pandas'],
            setup: MONTH_DF_PY,
            tasks: [
              { ask: 'Print the average bottles per day.', code: 'print(df["bottles"].mean())', expect: '47.36666666666667', hint: 'Run it as it is.', solution: 'print(df["bottles"].mean())' },
              { ask: 'Print the **hottest** temperature of the month.', code: 'print()', expect: '37', hint: 'Pick the column and use `.max()`: `print(df["temp"].max())`.', solution: 'print(df["temp"].max())', done: '$37$ °C.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Choosing rows',
          title: 'Only the rainy days',
          body: 'To keep only some rows, put a yes-or-no question inside the square brackets:\n\n`rainy = df[df["rain"] == 1]`\n\nRead it from the inside: `df["rain"] == 1` asks, for every row, “did it rain?” (`True` or `False`). `df[ ... ]` keeps only the rows where the answer is `True`.\n\nThis is called ==filtering==. It is how you compare groups.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Does rain matter?',
          body: 'The table `df` is loaded.',
          graph: {
            packages: ['pandas'],
            setup: MONTH_DF_PY,
            tasks: [
              { ask: 'Run it: the average sales on rainy days.', code: 'rainy = df[df["rain"] == 1]\nprint(len(rainy), "rainy days")\nprint(rainy["bottles"].mean())', expect: '8 rainy days\n21.5', hint: 'Run it as it is.', solution: 'rainy = df[df["rain"] == 1]\nprint(len(rainy), "rainy days")\nprint(rainy["bottles"].mean())' },
              { ask: 'Now the average on **dry** days (rain is `0`), rounded with `round(..., 1)`.', code: 'dry = df[]\nprint(round(dry["bottles"].mean(), 1))', expect: '56.8', hint: 'Inside the brackets: `df["rain"] == 0`.', solution: 'dry = df[df["rain"] == 0]\nprint(round(dry["bottles"].mean(), 1))', done: '$56.8$ on dry days against $21.5$ on rainy days. Rain clearly matters.' },
              { ask: 'Your turn to investigate: the average on **market days** (`market` is `1`), rounded to 1 decimal place.', code: 'print()', expect: '55.5', hint: 'Combine the two steps: `print(round(df[df["market"] == 1]["bottles"].mean(), 1))`.', solution: 'print(round(df[df["market"] == 1]["bottles"].mean(), 1))', done: '$55.5$, against $47.4$ overall. Market days help too.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can explore a table.',
          body: 'Rows, columns, pandas, averages and filters. Next: drawing the data, because a picture shows what a table hides.',
        },
      ],
    },
  ],
};
