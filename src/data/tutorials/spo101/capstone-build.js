// SPO 101 · Capstone · Lesson 1: a complete project end to end on Ade's month: the question, a
// look at the data, a time-ordered split, a baseline, three models compared honestly, and a final
// prediction, then planning your own project.
import { MONTH_DF_PY } from './kiosk-data';

const SETUP = `${MONTH_DF_PY}
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor`;
const SPLIT = `features = ["temp", "rain", "market"]
train = df.iloc[:24]
test = df.iloc[24:]

def test_error(model):
    model.fit(train[features], train["bottles"])
    guesses = model.predict(test[features])
    return round(float((test["bottles"] - guesses).abs().mean()), 1)

baseline = round(float((test["bottles"] - train["bottles"].mean()).abs().mean()), 1)
print("baseline:", baseline)`;
const COMPARE = `print("linear regression:", test_error(LinearRegression()))
print("decision tree:", test_error(DecisionTreeRegressor(max_depth=3, random_state=0)))
print("random forest:", test_error(RandomForestRegressor(n_estimators=200, random_state=0)))`;
const FINAL = `final = LinearRegression()
final.fit(df[features], df["bottles"])
tomorrow = pd.DataFrame({"temp": [33], "rain": [0], "market": [1]})
print("order about", round(final.predict(tomorrow)[0]), "bottles")`;

export default {
  id: 'capstone-build',
  title: 'Build a complete project',
  covers: 'An end-to-end project: question, data, split, baseline, comparing models, the final model, planning your own',
  minutes: 18,
  sections: [
    {
      name: 'Ade’s project, start to finish',
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What should never be committed to GitHub?',
          options: [
            { text: 'Passwords and API keys', correct: true, why: 'Keep secrets out of code; list secret files in `.gitignore`.' },
            { text: 'The README', why: 'The README is the project’s front page.' },
            { text: 'Your `.py` files', why: 'Those are the point of the repository.' },
            { text: '`requirements.txt`', why: 'It should be committed so others can install the packages.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 13 · Capstone',
          title: 'Everything, in one project',
          body: 'Time to put the whole course together on Ade’s month of data, the way a professional would:\n\n**1. The question:** how many bottles should Ade order for tomorrow?\n**2. The data:** 30 days of temperature, rain, market day and sales.\n**3. An honest test:** train on the first 24 days, test on the last 6.\n**4. A baseline** to beat.\n**5. Several models,** compared on the same test.\n**6. A final model,** retrained on all the data, used for tomorrow.',
          cta: 'Start',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Steps 1–4',
          title: 'Split and baseline',
          body: 'The month table `df` and the libraries are loaded. `test_error(model)` trains any model on the 24 training days and returns its average miss on the 6 test days.',
          graph: {
            packages: ['pandas', 'scikit-learn'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it: set up the split and score the always-average baseline.', code: SPLIT, expect: 'baseline: 47.6', hint: 'Run it as it is.', solution: SPLIT, done: 'Any model worth using must beat an average miss of $47.6$ bottles.' },
              { ask: 'Compare three models on the same test days.', code: COMPARE, match: '^linear regression: 5\\.9\\ndecision tree: \\d+\\.\\d\\nrandom forest: \\d+\\.\\d$', hint: 'Run it as it is. The forest takes a few seconds.', solution: COMPARE, done: 'The **simplest** model wins: linear regression misses by about $6$, the tree by about $12$, the forest by about $7$. With only 24 training days, flexible models overfit. Always compare; never assume fancier is better.' },
              { ask: 'Retrain the winner on **all 30 days** and predict tomorrow: $33$ °C, dry, market day.', code: FINAL, expect: 'order about 89 bottles', hint: 'Run it as it is.', solution: FINAL, done: 'About $89$ bottles. Using all the data for the final model is standard once the test has told you which model to trust.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why retrain the final model on all 30 days, after testing on 6?',
          options: [
            { text: 'The test already did its job (choosing the model and estimating its error); now more data makes a better model', correct: true, why: 'Report the test score you measured; deploy the model trained on everything.' },
            { text: 'To make the test score better', why: 'You can’t re-score on test days you trained on; the reported score stays the one measured before.' },
            { text: 'It is a mistake', why: 'It is standard practice.' },
            { text: 'Because the test days were wrong', why: 'They were fine; they just aren’t needed for testing any more.' },
          ],
        },
      ],
    },
    {
      name: 'Plan your own',
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Ideas close to home',
          title: 'Choose a project you care about',
          cards: [
            { title: 'Prices', text: 'Predict food prices at your local market from season and fuel price (collect a few months of data).' },
            { title: 'Language', text: 'Classify messages or tweets in Pidgin or Yoruba as positive or negative, with a Hugging Face model.' },
            { title: 'Your studies', text: 'Predict your quiz scores from hours studied and sleep; or cluster past questions by topic.' },
            { title: 'Public data', text: 'Pick a dataset from Kaggle or Hugging Face on health, farming or transport in Africa, and ask one clear question.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Your checklist',
          prompt: 'The project routine, in order:',
          items: [
            'Write the question in one sentence, and how you will measure success',
            'Collect or download the data; look at it and clean it',
            'Split it (by time if it is time-ordered) and keep the test set locked',
            'Score a simple baseline',
            'Try two or three models and compare them on the same validation data',
            'Score the chosen model once on the test set; write down the result and the limits',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Your first model beats the baseline by only a little. What is the professional reaction?',
          options: [
            { text: 'Report it honestly, then look at the errors and the data for ideas', correct: true, why: 'Small honest gains are real results. Looking at where it fails usually suggests the next feature or fix.' },
            { text: 'Keep tuning against the test set until it looks better', why: 'That turns the test into training data and the score into fiction.' },
            { text: 'Hide the baseline', why: 'The baseline is what makes the result meaningful.' },
            { text: 'Give up', why: 'This is the normal middle of every project.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can run a whole project.',
          body: 'Question, data, split, baseline, comparison, final model. Last lesson: publishing it and presenting it.',
        },
      ],
    },
  ],
};
