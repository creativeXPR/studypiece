// SPO 101 · Yes-or-no questions and groups · Lesson 2: decision trees as learned if-questions,
// depth and overfitting, random forests and gradient boosting.
import { treeScene } from './class-scenes';
import { MONTH_DF_PY } from './kiosk-data';

const SETUP = `${MONTH_DF_PY}\ndf["busy"] = (df["bottles"] >= 60).astype(int)`;
const FIT = `from sklearn.tree import DecisionTreeClassifier, export_text

features = ["temp", "rain", "market"]
tree = DecisionTreeClassifier(max_depth=2, random_state=0)
tree.fit(df[features], df["busy"])
print(export_text(tree, feature_names=features))`;

export default {
  id: 'trees',
  title: 'Decision trees and forests',
  covers: 'Decision trees as learned questions, depth and overfitting, random forests, gradient boosting',
  minutes: 14,
  sections: [
    {
      name: 'Learned questions',
      terms: [
        ['Decision tree', 'A model that predicts by asking a learned series of yes/no questions about the features.'],
        ['Depth', 'How many questions a tree may ask in a row. Deeper trees fit more detail, and overfit more easily.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does logistic regression output before any threshold is applied?',
          options: [
            { text: 'A probability between 0 and 1', correct: true, why: 'The S-curve squeezes the weighted sum into a chance.' },
            { text: 'A number of bottles', why: 'That’s linear regression.' },
            { text: 'A group name', why: 'That’s clustering.' },
            { text: 'Always 0 or 1', why: 'That’s after the threshold.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 6 · Lesson 2',
          title: 'A game of twenty questions',
          body: 'Remember Ade’s hand-written `if` rules? A ==decision tree== **learns** its own `if` questions from the data.\n\nIt asks one question, splits the days into two piles, then asks another question about each pile, and so on. Each question is chosen to make the piles as “pure” as possible (all busy, or all quiet).\n\nTrees handle curves, thresholds and combinations (hot **and** dry) that a straight line can’t.',
        },
        treeScene,
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Grow a tree',
          body: 'The month table has a new column `busy` ($1$ if $60$+ bottles). `max_depth=2` allows two questions in a row (`random_state=0` just makes ties break the same way every run). `export_text` prints the tree as indented rules: `|---` lines are the questions, `class: 1` means busy.',
          graph: {
            packages: ['pandas', 'scikit-learn'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it and read the rules.', code: FIT, test: 'tree.get_depth() == 2', hint: 'Run it as it is.', solution: FIT, done: 'The same two questions as the picture: hotter than $32$, then rain.' },
              { ask: 'Use the tree: is a $34$ °C rainy, non-market day busy?', code: 'day = pd.DataFrame({"temp": [34], "rain": [1], "market": [0]})\nprint(tree.predict(day)[0])', expect: '0', hint: 'Run it as it is.', solution: 'day = pd.DataFrame({"temp": [34], "rain": [1], "market": [0]})\nprint(tree.predict(day)[0])', done: '$0$: hot, but rain wins. Follow the rules by hand and you get the same answer: trees are easy to explain.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'What happens if the tree may ask 30 questions in a row on Ade’s 30 days?',
          options: [
            { text: 'It can give every day its own leaf: perfect on training days, poor on new ones', correct: true, why: 'Unlimited depth lets a tree memorise. Limiting depth is how you control overfitting in trees.' },
            { text: 'It becomes perfect on new days too', why: 'Memorising doesn’t carry over to new days.' },
            { text: 'It refuses to train', why: 'It trains happily, and overfits.' },
            { text: 'Nothing changes', why: 'More depth means more, finer questions.' },
          ],
        },
      ],
    },
    {
      name: 'Many trees',
      terms: [
        ['Random forest', 'Many trees, each trained on a random sample of rows and features, voting together.'],
        ['Gradient boosting', 'Trees built one after another, each correcting the mistakes of those before. XGBoost and LightGBM are famous versions.'],
        ['Ensemble', 'Several models combined into one prediction.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The wisdom of crowds',
          title: 'Forests and boosting',
          body: 'One tree is easy to read but jumpy: change a few days and it may ask completely different questions.\n\nA ==random forest== grows hundreds of trees, each on a random sample of the days and features, and lets them **vote**. Individual trees’ mistakes cancel out.\n\n==Gradient boosting== builds trees **one after another**, each one focusing on the mistakes the previous trees still make.\n\nOn tables of data (sales, loans, sensor readings), boosted trees are often the best models available, frequently beating neural networks.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'A forest’s trees each see a random sample of the data', correct: true, why: '**True:** that’s the “random” in random forest, and it makes the trees disagree usefully.' },
            { text: 'Boosting builds each tree to fix earlier trees’ mistakes', correct: true, why: '**True:** that’s the core idea.' },
            { text: 'A single deep tree is the most reliable choice', why: '**False:** single deep trees overfit; ensembles are more reliable.' },
            { text: 'Tree ensembles are strong on tabular data', correct: true, why: '**True:** they win many competitions on tables.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'At a Kaggle meetup',
          body: '**“For tabular data we started with a logistic regression baseline, then a gradient-boosted tree model, which improved recall from 0.62 to 0.81 on the validation set.”**\n\n==Kaggle== is the website where people compete to build the best models on shared datasets. You’ll hear “XGBoost” and “LightGBM” constantly there.',
        },
        {
          type: 'finish',
          title: 'You know trees and forests.',
          body: 'Learned questions, depth, forests and boosting. Next: learning without any labels at all.',
        },
      ],
    },
  ],
};
