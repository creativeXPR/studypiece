// SPO 101 · Is it any good? · Lesson 3: scoring yes/no predictions. The four outcomes (confusion
// matrix), accuracy and how it misleads on rare events, precision and recall, and which to favour.
import { MONTH_PY } from './kiosk-data';

const SETUP = `${MONTH_PY}
actual = [1 if b >= 80 else 0 for b in bottles]       # 1 = sold out (he stocks 80)
predicted = [1 if t >= 34 else 0 for t in temp]       # the rule's warning`;

export default {
  id: 'metrics',
  title: 'Choosing a score',
  covers: 'True and false positives and negatives, accuracy and its trap, precision and recall, picking the right score',
  minutes: 15,
  sections: [
    {
      name: 'Four kinds of right and wrong',
      terms: [
        ['Classification', 'Predicting a category (sold out or not) rather than a number.'],
        ['True / false positive', 'A “yes” prediction that was right / wrong.'],
        ['True / false negative', 'A “no” prediction that was right / wrong.'],
        ['Confusion matrix', 'The table counting all four outcomes.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Training error is tiny but test error is huge. What is this called?',
          options: [
            { text: 'Overfitting', correct: true, why: 'The model memorised the training data, noise included.' },
            { text: 'Underfitting', why: 'Underfitting is bad on training data too.' },
            { text: 'Leakage', why: 'Leakage makes test scores look too good, not too bad.' },
            { text: 'Regularisation', why: 'That is a cure for overfitting.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 5 · Lesson 3',
          title: 'A yes-or-no question',
          body: 'Ade stocks $80$ bottles. On busy days he **sells out** and turns customers away. He wants a warning the evening before: “tomorrow you’ll sell out, buy more.”\n\nThis is a ==classification== task: the answer is a category (sold out: yes or no), not a number. A first rule: **warn if the forecast is $34$ °C or more.**\n\nHow do you score a yes-or-no predictor? Counting misses in bottles no longer makes sense.',
        },
        {
          type: 'reveal',
          eyebrow: 'Every prediction lands in one box',
          title: 'Four outcomes',
          cards: [
            { title: 'True positive', text: 'Warned, and he **did** sell out. The warning paid off. (4 days)' },
            { title: 'False positive', text: 'Warned, but he **didn’t** sell out: a false alarm, extra stock left over. (1 day)' },
            { title: 'False negative', text: 'No warning, but he **did** sell out: a missed alarm, lost customers. (1 day)' },
            { title: 'True negative', text: 'No warning, and no sell-out. Correctly quiet. (24 days)' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The obvious score',
          title: 'Accuracy, and its trap',
          body: '==Accuracy== is the share of predictions that were right: $\\frac{4 + 24}{30} = 93\\%$. Sounds great.\n\nBut consider a lazy rule: **never warn.** It is right on all $25$ days he didn’t sell out, and wrong on the $5$ he did: accuracy $\\frac{25}{30} = 83\\%$. Still sounds fine, yet it is **useless**: it never catches a single sell-out.\n\nWhen the thing you care about is **rare** (sell-outs, fraud, disease), accuracy flatters lazy models.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A fraud detector reports “99.9% accuracy”. Fraud happens in 1 of every 1,000 payments. What should you ask?',
          options: [
            { text: '“How many of the actual frauds does it catch?”', correct: true, why: 'Saying “not fraud” every time already scores 99.9%. The real question is about the rare cases. That is recall, next.' },
            { text: '“Can you get it to 100%?”', why: 'Even 100% might hide a useless model if measured carelessly; ask about the frauds caught.' },
            { text: 'Nothing: 99.9% is excellent', why: 'Here 99.9% is what doing nothing scores.' },
            { text: '“How fast is it?”', why: 'Speed doesn’t tell you if it works.' },
          ],
        },
      ],
    },
    {
      name: 'Precision and recall',
      terms: [
        ['Precision', 'Of the times the model said “yes”, the share that were right. High precision: few false alarms.'],
        ['Recall', 'Of the actual “yes” cases, the share the model caught. High recall: few missed cases.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Two better questions',
          title: 'Precision and recall',
          body: '==Precision== asks: **when it warns, how often is it right?**\nTrue positives ÷ all warnings $= \\frac{4}{4 + 1} = 80\\%$.\n\n==Recall== asks: **of the real sell-outs, how many did it catch?**\nTrue positives ÷ all real sell-outs $= \\frac{4}{4 + 1} = 80\\%$.\n\nThe lazy “never warn” rule has recall $0\\%$: it catches nothing. Its $83\\%$ accuracy hid that completely.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Count the outcomes',
          body: 'The lists `actual` (1 = sold out) and `predicted` (1 = warned) are loaded, one value per day. `and` means **both** questions must be `True`.',
          graph: {
            setup: SETUP,
            tasks: [
              { ask: 'Run it: count the true positives.', code: 'tp = 0\nfor a, p in zip(actual, predicted):\n    if a == 1 and p == 1:\n        tp = tp + 1\nprint(tp)', expect: '4', hint: 'Run it as it is.', solution: 'tp = 0\nfor a, p in zip(actual, predicted):\n    if a == 1 and p == 1:\n        tp = tp + 1\nprint(tp)' },
              { ask: 'Count the **false positives**: warned (`p == 1`) but did not sell out (`a == 0`).', code: 'fp = 0\nfor a, p in zip(actual, predicted):\n    if :\n        fp = fp + 1\nprint(fp)', expect: '1', hint: 'The question is `a == 0 and p == 1`.', solution: 'fp = 0\nfor a, p in zip(actual, predicted):\n    if a == 0 and p == 1:\n        fp = fp + 1\nprint(fp)' },
              { ask: 'Precision is `tp / (tp + fp)`. Print it.', code: 'print()', expect: '0.8', hint: '`print(tp / (tp + fp))`.', solution: 'print(tp / (tp + fp))', done: '$0.8$: 80% of its warnings were right.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Which matters more?',
          prompt: 'A test screens people for a serious but treatable disease. A positive result leads to a cheap follow-up check. Which should it favour?',
          options: [
            { text: 'High recall: miss as few real cases as possible', correct: true, why: 'A missed case (false negative) is very costly; a false alarm only costs a follow-up check.' },
            { text: 'High precision: avoid false alarms at all costs', why: 'Here false alarms are cheap and missed cases are dangerous.' },
            { text: 'Accuracy only', why: 'With a rare disease, accuracy hides missed cases.' },
            { text: 'It doesn’t matter', why: 'The costs of the two mistakes are very different.' },
          ],
          explain: 'A spam filter is the opposite: a real email wrongly hidden (false positive) is worse than one spam getting through, so it favours precision. **The right score depends on what each mistake costs.**',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Ade loses ₦300 profit per customer turned away, but extra stock keeps fine until the next day. What should his warning favour?',
          options: [
            { text: 'Recall: catch nearly every sell-out, accepting some false alarms', correct: true, why: 'A false alarm costs little (stock keeps); a missed sell-out loses sales.' },
            { text: 'Precision: only warn when certain', why: 'He would miss sell-outs, which is the costly mistake here.' },
            { text: 'Never warn', why: 'Recall 0: every sell-out is missed.' },
            { text: 'Accuracy', why: 'Sell-outs are rare, so accuracy would flatter a lazy rule.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Talking about classifiers',
          body: '**“The classes are imbalanced, so accuracy is misleading. We report precision and recall, and since a missed sell-out costs more than a false alarm, we tuned for recall.”**\n\nYou’ll also hear the ==F1 score==, which combines precision and recall into one number, and ==ROC-AUC==, which measures how well a model ranks yes-cases above no-cases. Same idea: choose the score that matches the costs.',
        },
        {
          type: 'finish',
          title: 'You can choose a score.',
          body: 'Confusion matrix, accuracy’s trap, precision and recall. Next chapter: models that learn yes-or-no answers, trees and groups.',
        },
      ],
    },
  ],
};
