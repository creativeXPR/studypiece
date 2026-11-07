// SPO 101 · Yes-or-no questions and groups · Lesson 1: logistic regression as a line bent into an
// S, probabilities, thresholds, and scikit-learn's predict_proba.
import { sCurveScene } from './class-scenes';
import { MONTH_DF_PY } from './kiosk-data';

const SETUP = `${MONTH_DF_PY}\ndf["sold_out"] = (df["bottles"] >= 80).astype(int)`;
const FIT = `from sklearn.linear_model import LogisticRegression

model = LogisticRegression()
model.fit(df[["temp"]], df["sold_out"])

for t in [30, 34, 37]:
    day = pd.DataFrame({"temp": [t]})
    chance = model.predict_proba(day)[0][1]
    print(t, round(chance, 2))`;

export default {
  id: 'classification',
  title: 'Will it sell out?',
  covers: 'Classification, logistic regression as an S-curve, probabilities, thresholds and the precision–recall trade-off',
  minutes: 14,
  sections: [
    {
      name: 'Bending the line',
      terms: [
        ['Logistic regression', 'A classification model: a weighted sum of features squeezed through an S-curve into a probability between 0 and 1.'],
        ['Probability', 'A chance between 0 (never) and 1 (certain); 0.37 means 37%.'],
        ['Threshold', 'The cut-off probability above which the model says “yes”.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Recall answers which question?',
          options: [
            { text: 'Of the real “yes” cases, how many did the model catch?', correct: true, why: 'Recall = true positives ÷ all real positives.' },
            { text: 'When the model says “yes”, how often is it right?', why: 'That is precision.' },
            { text: 'What share of all predictions were right?', why: 'That is accuracy.' },
            { text: 'How fast is the model?', why: 'Recall is about catching the positives.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 6 · Yes-or-no questions',
          title: 'From a rule to a model',
          body: 'Ade’s warning rule (“warn at $34$ °C or more”) was hand-written. Now let a model learn it.\n\nFor yes-or-no questions, a simple and widely used model is ==logistic regression==. Despite its name, it is for **classification**. It still computes a weighted sum, like linear regression, but then squeezes it into a **probability**: a chance between $0$ and $1$.',
        },
        sCurveScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Ade lowers the threshold from 50% to 30%. What happens?',
          options: [
            { text: 'More warnings: more sell-outs caught (recall up), but more false alarms (precision down)', correct: true, why: 'A lower bar means warning on more days, catching more and wrongly warning more.' },
            { text: 'Fewer warnings', why: 'A lower bar is easier to pass, so there are more warnings.' },
            { text: 'The S-curve changes shape', why: 'The curve stays the same; only the cut-off moves.' },
            { text: 'Nothing changes', why: 'Different days now cross the cut-off.' },
          ],
          explain: 'Moving the threshold trades precision against recall. Choose it by the cost of each mistake, as in Chapter 5.',
        },
      ],
    },
    {
      name: 'In code',
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Learn the S-curve',
          body: 'The month table `df` is loaded with a new column `sold_out` ($1$ if he sold $80$+). `predict_proba` returns two chances per day: no and yes; `[0][1]` picks the first day’s “yes”.',
          graph: {
            packages: ['pandas', 'scikit-learn'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it: the chance of selling out at $30$, $34$ and $37$ °C.', code: FIT, expect: '30 0.01\n34 0.37\n37 0.94', hint: 'Run it as it is.', solution: FIT, done: 'The model learned the S from the data: almost no chance at $30$ °C, very likely at $37$ °C.' },
              { ask: 'At what chance does `model.predict` say “yes”? Run it for $35$ °C (chance $0.64$).', code: 'print(model.predict(pd.DataFrame({"temp": [35]}))[0])', expect: '1', hint: 'Run it as it is.', solution: 'print(model.predict(pd.DataFrame({"temp": [35]}))[0])', done: '`predict` uses a 50% threshold: $0.64$ is above it, so “yes” (1).' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A model says “70% chance of selling out” on 10 different days. If its probabilities are trustworthy, about how many of those days should actually sell out?',
          options: [
            { text: 'About 7', correct: true, why: 'Trustworthy probabilities are called **calibrated**: things given 70% happen about 70% of the time.' },
            { text: 'All 10', why: '70% isn’t certainty.' },
            { text: 'None', why: '70% means likely, not impossible.' },
            { text: 'Exactly 7, every time', why: 'Chance varies; about 7 on average.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Classifiers in a sentence',
          body: '**“We trained a logistic regression to predict sell-outs from temperature. It outputs a probability; we chose a threshold below 50% because missed sell-outs cost more than false alarms.”**\n\nThe same pattern, a score turned into a probability and then a decision, runs inside spam filters, medical tests, and even the final step of a language model choosing its next word.',
        },
        {
          type: 'finish',
          title: 'You can build a classifier.',
          body: 'Logistic regression, probabilities and thresholds. Next: models that learn a flowchart of questions.',
        },
      ],
    },
  ],
};
