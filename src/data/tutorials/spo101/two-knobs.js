// SPO 101 · Fitting a line · Lesson 2: slope and starting value (weight and bias), the loss bowl,
// gradient descent on two knobs in Python, then the same fit in one line with scikit-learn.
import { bowlScene, twoKnobScene } from './fit-scenes';
import { NOTEBOOK_PY } from './kiosk-data';

const LOSS2 = `${NOTEBOOK_PY}\n\ndef loss(w, b):\n    total = 0\n    for t, y in zip(temps, bottles):\n        miss = y - (w * (t - 30) + b)\n        total = total + miss ** 2\n    return total / len(temps)`;
const TRAIN2 = `w = 1
b = 2
learning_rate = 0.05
nudge = 0.001

for step in range(300):
    slope_w = (loss(w + nudge, b) - loss(w - nudge, b)) / (2 * nudge)
    slope_b = (loss(w, b + nudge) - loss(w, b - nudge)) / (2 * nudge)
    w = w - learning_rate * slope_w
    b = b - learning_rate * slope_b

print(round(w, 2), round(b, 1), round(loss(w, b), 1))`;

export default {
  id: 'two-knobs',
  title: 'Two knobs',
  covers: 'Slope and starting value (weight and bias), the loss bowl, gradient descent on two parameters, scikit-learn’s LinearRegression',
  minutes: 16,
  sections: [
    {
      name: 'Slope and starting value',
      terms: [
        ['Weight', 'A knob that multiplies a feature (the slope $w$).'],
        ['Bias (intercept)', 'A knob added on at the end (the starting value $b$): the prediction when the feature is at its reference point.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In gradient descent, what is the **learning rate**?',
          options: [
            { text: 'How big a step to take downhill each time', correct: true, why: 'Too small is slow; too big overshoots and can blow up.' },
            { text: 'How fast the computer is', why: 'It is a setting of the method, not of the hardware.' },
            { text: 'The final loss', why: 'The loss is what is being reduced.' },
            { text: 'The number of examples', why: 'That is the size of the dataset.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 4 · Lesson 2',
          title: 'Freeing the line',
          body: 'Ade’s first model forced the line through $0$ bottles at $25$ °C. That was a guess, and guesses built into a model are risky.\n\nBetter: give the line a second knob and let the data decide both.\n$$\\text{bottles} = w \\times (\\text{temp} - 30) + b$$\n\n$w$ is the slope, as before. $b$ is the sales on a $30$ °C day, the ==bias== or starting value. (Measuring from $30$ just makes $b$ easy to read.)',
        },
        twoKnobScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'The trained knobs are $w = 9.67$ and $b = 49.7$. What does the model predict for a $32$ °C day?',
          options: [
            { text: 'About $69$ bottles', correct: true, why: '$9.67 \\times (32 - 30) + 49.7 = 19.3 + 49.7 = 69.0$.' },
            { text: 'About $50$ bottles', why: 'That’s the $30$ °C prediction; add $2 \\times 9.67$.' },
            { text: 'About $309$ bottles', why: 'Use $32 - 30 = 2$, not $32$.' },
            { text: 'About $59$ bottles', why: 'That adds only one degree’s worth.' },
          ],
        },
      ],
    },
    {
      name: 'Rolling in a bowl',
      terms: [
        ['Parameters', 'All the knobs a model learns. This model has two; large language models have billions.'],
        ['scikit-learn', 'A Python library of ready-made classic models. `LinearRegression` fits lines.'],
      ],
      screens: [
        bowlScene,
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Train two knobs',
          body: 'Ade’s 12 days and `loss(w, b)` are loaded. Each step measures the downhill slope for each knob by nudging it, then moves both.',
          graph: {
            setup: LOSS2,
            tasks: [
              { ask: 'Run 300 steps from $w = 1$, $b = 2$. It prints the final $w$, $b$ and loss.', code: TRAIN2, test: 'abs(w - 9.67) < 0.05 and abs(b - 49.72) < 0.2', hint: 'Run it as it is. If you changed it, use **Show me**.', solution: TRAIN2, done: 'Both knobs found: the same best line as in the picture.' },
              { ask: 'Try only $30$ steps: change `range(300)` to `range(30)`. Is the line finished?', code: TRAIN2, test: 'abs(b - 49.72) > 1', hint: 'Change `300` to `30` in the `for` line.', solution: TRAIN2.replace('range(300)', 'range(30)'), done: 'Not yet: the slope is nearly right but $b$ is still short, because the ball is still sliding along the bowl’s floor. Training longer helps.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Using the tools',
          title: 'The same fit in one line',
          body: 'Writing gradient descent yourself shows how training works. In practice you use a library. **scikit-learn** fits a line like this:\n\n`from sklearn.linear_model import LinearRegression`\n`model = LinearRegression()`\n`model.fit(X, y)`\n\n`X` is the table of features and `y` the labels. `fit` finds the best knobs. Afterwards, `model.coef_` holds the weights and `model.intercept_` the bias. (For a straight line it uses an exact formula instead of rolling a ball, but the answer is the same bottom of the bowl.)',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'scikit-learn does it for you',
          body: 'The double square brackets make `X` a table with one column (one row per day), the shape scikit-learn expects. Loading scikit-learn takes a little while the first time.',
          graph: {
            packages: ['scikit-learn'],
            setup: NOTEBOOK_PY,
            tasks: [
              { ask: 'Run it.', code: 'from sklearn.linear_model import LinearRegression\n\nX = [[t - 30] for t in temps]\ny = bottles\nmodel = LinearRegression()\nmodel.fit(X, y)\nprint(round(model.coef_[0], 2), round(model.intercept_, 1))', expect: '9.67 49.7', hint: 'Run it as it is.', solution: 'from sklearn.linear_model import LinearRegression\n\nX = [[t - 30] for t in temps]\ny = bottles\nmodel = LinearRegression()\nmodel.fit(X, y)\nprint(round(model.coef_[0], 2), round(model.intercept_, 1))', done: 'The same $w = 9.67$ and $b = 49.7$ your gradient descent found.' },
              { ask: 'Predict a $34$ °C day: `model.predict([[34 - 30]])`. Print it rounded.', code: 'print(round(model.predict([[34 - 30]])[0]))', expect: '88', hint: 'Run it as it is.', solution: 'print(round(model.predict([[34 - 30]])[0]))', done: '$88$ bottles. `fit` learns; `predict` uses what was learned. Those two words are the heart of scikit-learn.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'Two knobs, one bowl.',
          body: 'Weights and bias, the loss bowl, and `fit` / `predict`. Next: more features than temperature.',
        },
      ],
    },
  ],
};
