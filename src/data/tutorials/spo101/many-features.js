// SPO 101 · Fitting a line · Lesson 3: several features at once (temperature, rain, market day),
// one weight per feature, reading the weights, and predicting with scikit-learn.
import { MONTH_DF_PY } from './kiosk-data';

const FIT = `from sklearn.linear_model import LinearRegression

X = df[["temp", "rain", "market"]]
y = df["bottles"]
model = LinearRegression()
model.fit(X, y)

for name, weight in zip(X.columns, model.coef_):
    print(name, round(weight, 1))`;

export default {
  id: 'many-features',
  title: 'Many features',
  covers: 'Linear regression with several features, one weight per feature, reading weights, predicting, limits of the story weights tell',
  minutes: 14,
  sections: [
    {
      name: 'One weight per feature',
      terms: [
        ['Linear regression', 'A model that predicts a number by multiplying each feature by its weight, adding them up, and adding the bias.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In scikit-learn, what is the difference between `fit` and `predict`?',
          options: [
            { text: '`fit` learns the knobs from data; `predict` uses them on new inputs', correct: true, why: 'Train once with `fit`, then `predict` as often as you like.' },
            { text: 'They do the same thing', why: '`fit` changes the model; `predict` doesn’t.' },
            { text: '`predict` must come first', why: 'You can’t predict before learning.' },
            { text: '`fit` draws a picture', why: 'It finds the weights; no picture.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 4 · Lesson 3',
          title: 'Temperature isn’t everything',
          body: 'Chapter 3 showed that rain cuts sales and market days lift them. A model that only sees temperature can’t know that.\n\nThe fix is natural: give **each feature its own weight**, and add them up.\n$$\\text{bottles} = w_1 \\times \\text{temp} + w_2 \\times \\text{rain} + w_3 \\times \\text{market} + b$$\n\nThis is ==linear regression==, one of the most used models in the world. Training finds all four knobs at once: the same bowl, now in four directions.',
        },
        {
          type: 'choice',
          eyebrow: 'Think first',
          prompt: 'Rain is recorded as $1$ (rained) or $0$ (dry). What sign do you expect its weight $w_2$ to have?',
          options: [
            { text: 'Negative', correct: true, why: 'On a rainy day, $w_2 \\times 1$ is added. For sales to drop, $w_2$ must be negative. On a dry day, $w_2 \\times 0 = 0$: no effect.' },
            { text: 'Positive', why: 'That would mean rain increases sales.' },
            { text: 'Exactly zero', why: 'Zero would mean rain makes no difference, but Chapter 3 showed it does.' },
            { text: 'It depends on the temperature', why: 'In this model each weight is one fixed number.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Fit all three features',
          body: '`df[["temp", "rain", "market"]]` (double brackets) picks three columns as a table. `zip` pairs each column name with its weight. Loading the libraries takes a moment the first time.',
          graph: {
            packages: ['pandas', 'scikit-learn'],
            setup: MONTH_DF_PY,
            tasks: [
              { ask: 'Run it to see each feature’s weight.', code: FIT, expect: 'temp 8.3\nrain -16.4\nmarket 17.7', hint: 'Run it as it is.', solution: FIT, done: 'Each degree adds about $8$ bottles, rain takes away about $16$, a market day adds about $18$.' },
              { ask: 'Predict tomorrow: $34$ °C, dry, market day. Run it.', code: 'tomorrow = pd.DataFrame({"temp": [34], "rain": [0], "market": [1]})\nprint(round(model.predict(tomorrow)[0]))', expect: '97', hint: 'Run it as it is.', solution: 'tomorrow = pd.DataFrame({"temp": [34], "rain": [0], "market": [1]})\nprint(round(model.predict(tomorrow)[0]))', done: '$97$ bottles. A temperature-only model would have said about $81$, and Ade would have sold out.' },
              { ask: 'Same day but **rainy** and not a market day. Change the numbers and run.', code: 'tomorrow = pd.DataFrame({"temp": [34], "rain": [0], "market": [1]})\nprint(round(model.predict(tomorrow)[0]))', expect: '63', hint: 'Set `"rain": [1]` and `"market": [0]`.', solution: 'tomorrow = pd.DataFrame({"temp": [34], "rain": [1], "market": [0]})\nprint(round(model.predict(tomorrow)[0]))', done: '$63$: same heat, very different day.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Reading the weights',
      screens: [
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'The market weight is $17.7$. What does that mean in plain words?',
          options: [
            { text: 'With the same weather, a market day sells about 18 more bottles', correct: true, why: 'A weight says how much the prediction changes when that feature goes up by 1 and the others stay the same.' },
            { text: 'Market days sell 17.7 bottles', why: 'It is the **extra** amount, added on top of the rest.' },
            { text: '17.7% of sales come from market days', why: 'Weights are in bottles here, not percentages.' },
            { text: 'Market days are 17.7 °C hotter', why: 'The weight is about bottles, not temperature.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Careful',
          title: 'Weights tell a story, with limits',
          body: 'Weights are easy to explain, which is why people love linear models. Two warnings worth raising in any discussion:\n\n**Units matter.** The temperature weight looks small ($8.3$) but temperatures vary by more than $10$ degrees, so temperature still matters most. Compare effects, not raw weights.\n\n**Weights aren’t proof of cause.** If two features always move together (say, market days were also always hot), the model can’t tell which one deserves the credit.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A straight-line model is fitted on sales against temperature. What can it **never** capture?',
          options: [
            { text: 'Sales that rise with heat and then fall when it gets dangerously hot', correct: true, why: 'A linear model can only go up (or down) at a constant rate. Curves need other models, such as trees or neural networks (Chapters 6 and 7).' },
            { text: 'Sales going up with heat', why: 'That is exactly what a positive slope captures.' },
            { text: 'The effect of rain', why: 'Add rain as a feature, as you just did.' },
            { text: 'Predictions for new days', why: 'Predicting new days is its whole job.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Describing a regression',
          body: '**“We fitted a linear regression on three features. Holding the others fixed, each degree adds about 8 bottles, rain removes about 16 and market days add about 18.”**\n\n“Holding the others fixed” is the phrase that shows you understand what a weight means.\n\nBut is the model any good? So far it has only been checked on the days it learned from. That is the subject of the next chapter.',
        },
        {
          type: 'finish',
          title: 'You can build a real model.',
          body: 'Linear regression with several features, trained and used with scikit-learn. Next: testing it honestly.',
        },
      ],
    },
  ],
};
