// SPO 101 · Is it any good? · Lesson 1: testing on unseen data, train / validation / test sets,
// mean absolute error, baselines, and data leakage.
import { trainTestScene } from './eval-scenes';
import { MONTH_DF_PY } from './kiosk-data';

const SPLIT = `from sklearn.linear_model import LinearRegression

train = df.iloc[:24]   # rows 0 to 23
test = df.iloc[24:]    # rows 24 to 29
features = ["temp", "rain", "market"]

model = LinearRegression()
model.fit(train[features], train["bottles"])
guesses = model.predict(test[features])

misses = (test["bottles"] - guesses).abs()
print(round(misses.mean(), 1))`;

export default {
  id: 'train-test',
  title: 'Train and test',
  covers: 'Why models must be tested on unseen data, train / validation / test sets, mean absolute error, baselines, leakage',
  minutes: 15,
  sections: [
    {
      name: 'The honest score',
      terms: [
        ['Training set', 'The examples a model learns from.'],
        ['Test set', 'Examples kept aside and used only once, at the end, to measure how well the model works on new data.'],
        ['Generalisation', 'Doing well on new examples, not just the ones learned from.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The rain weight is $-16.4$. What does the model do on a rainy day?',
          options: [
            { text: 'Predicts about 16 fewer bottles than on a dry day with the same temperature and market', correct: true, why: 'Holding the other features fixed, rain subtracts $16.4$.' },
            { text: 'Predicts −16.4 bottles', why: 'It subtracts $16.4$ from the rest of the prediction.' },
            { text: 'Ignores the rain', why: 'A non-zero weight means rain changes the prediction.' },
            { text: 'Refuses to predict', why: 'It always predicts.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 5 · Is it any good?',
          title: 'The student who memorised the answers',
          body: 'A student gets the past exam questions and memorises every answer. On those exact questions they score $100\\%$. Have they learned the subject? You can’t tell until you give them **new** questions.\n\nModels are the same. A model checked on the days it learned from will look better than it really is. What we care about is how it does on days it has **never seen**, such as tomorrow. That ability is called ==generalisation==.',
        },
        trainTestScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Why must the test days stay locked away during training?',
          options: [
            { text: 'If the model learns from them, the test no longer measures performance on new data', correct: true, why: 'Then the test score would be optimistic, like an exam the student had already seen.' },
            { text: 'To make training faster', why: 'That’s a small side effect, not the reason.' },
            { text: 'Because test data is lower quality', why: 'It is the same kind of data, just held back.' },
            { text: 'They don’t: you can train on everything and test on everything', why: 'Then the score measures memory, not generalisation.' },
          ],
        },
      ],
    },
    {
      name: 'Scoring in practice',
      terms: [
        ['Mean absolute error (MAE)', 'The average size of the misses, ignoring whether they were too high or too low.'],
        ['Baseline', 'A deliberately simple model (such as always predicting the average) that any real model must beat.'],
        ['Data leakage', 'When information from the test set, or from the future, sneaks into training and makes scores look better than reality.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'A score people understand',
          title: 'Mean absolute error',
          body: 'For training we squared the misses (it makes the maths smooth). For **reporting**, a friendlier score is the ==mean absolute error== (MAE): the average miss, ignoring direction.\n\n“MAE of 6 bottles” means: on a typical new day, the prediction is off by about 6 bottles. Anyone can understand that, which matters when you present results.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Train on 24, test on 6',
          body: '`df.iloc[:24]` takes rows by position: everything before row 24. `df.iloc[24:]` takes row 24 onwards. `.abs()` drops the minus signs from the misses.',
          graph: {
            packages: ['pandas', 'scikit-learn'],
            setup: MONTH_DF_PY,
            tasks: [
              { ask: 'Run it: the model’s MAE on the 6 test days.', code: SPLIT, expect: '5.9', hint: 'Run it as it is.', solution: SPLIT, done: 'On days it never saw, the model is off by about 6 bottles. That is the number to report.' },
              { ask: 'Now the **baseline**: always guess the training days’ average. Run it.', code: 'average = train["bottles"].mean()\nprint(round((test["bottles"] - average).abs().mean(), 1))', expect: '47.6', hint: 'Run it as it is.', solution: 'average = train["bottles"].mean()\nprint(round((test["bottles"] - average).abs().mean(), 1))', done: 'The baseline misses by about $48$; the model by about $6$. The model really has learned something.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Someone reports: “Our model has an error of only 12!” What should you ask first?',
          options: [
            { text: '“Measured on which data, and what does a simple baseline get?”', correct: true, why: 'An error means nothing without knowing it was on unseen data and what the easy alternative scores.' },
            { text: '“Which library did you use?”', why: 'Libraries rarely change whether a result is meaningful.' },
            { text: '“Could it be 11?”', why: 'Small differences matter less than whether the test was fair.' },
            { text: 'Nothing: 12 is small', why: '12 bottles might be good or terrible depending on the baseline.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Three piles',
          title: 'Train, validation, test',
          cards: [
            { title: 'Training set', text: 'Usually most of the data. The model learns its knobs from it.' },
            { title: 'Validation set', text: 'Used while building, to choose between models and settings (like the learning rate). Each peek slightly tunes your choices to it.' },
            { title: 'Test set', text: 'Opened **once**, at the very end, for the score you report. If you keep tuning against it, it stops being a fair test.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Spot the leak',
          prompt: 'Which of these is **data leakage**?',
          options: [
            { text: 'Predicting tomorrow’s sales using a feature “sold out today?” that is only known at closing time', correct: true, why: 'At prediction time (the morning) that information doesn’t exist yet. The model looks brilliant in testing and fails in real use.' },
            { text: 'Training on 24 days and testing on 6 others', why: 'That is the correct, leak-free setup.' },
            { text: 'Using temperature from the weather forecast', why: 'The forecast is available in the morning, so it’s fair.' },
            { text: 'Cleaning the data before training', why: 'Cleaning is good practice, as long as test answers don’t guide it.' },
          ],
          explain: 'With time-ordered data, test on **later** days than you train on, as here: the past predicts the future, never the other way round.',
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Reporting a result honestly',
          body: '**“On a held-out test set of six later days, the model’s mean absolute error was 5.9 bottles, against 47.6 for an always-the-average baseline.”**\n\nThat one sentence answers the questions every careful listener has: tested on what, scored how, compared with what.',
        },
        {
          type: 'finish',
          title: 'You can test a model honestly.',
          body: 'Training and test sets, MAE, baselines and leakage. Next: what happens when a model memorises instead of learning.',
        },
      ],
    },
  ],
};
