// SPO 101 · Is it any good? · Lesson 2: overfitting and underfitting, the gap between training and
// test error, and the usual cures (more data, simpler models, regularisation, validation).
import { overfitScene } from './eval-scenes';

const SETUP = `import numpy as np
train_t = np.array([24, 26, 27, 29, 31, 33, 35, 37])
train_y = np.array([5, 30, 18, 50, 48, 82, 72, 112])
new_t = np.array([25, 28, 30, 32, 34, 36])
new_y = np.array([8, 28, 45, 63, 82, 98])

def errors(bendiness):
    knobs = np.polyfit(train_t - 30, train_y, bendiness)
    train_miss = np.abs(np.polyval(knobs, train_t - 30) - train_y).mean()
    new_miss = np.abs(np.polyval(knobs, new_t - 30) - new_y).mean()
    return round(float(train_miss), 1), round(float(new_miss), 1)`;

export default {
  id: 'overfitting',
  title: 'Overfitting',
  covers: 'Memorising versus learning, overfitting and underfitting, the train–test gap, model complexity, cures',
  minutes: 14,
  sections: [
    {
      name: 'Too good to be true',
      terms: [
        ['Overfitting', 'Learning the training examples so closely, noise included, that the model does worse on new data.'],
        ['Underfitting', 'A model too simple to capture the real pattern; it does badly on training and new data alike.'],
        ['Noise', 'Random ups and downs in data that no feature explains (a friend’s party nearby, a broken cooler).'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which score should you report for a model?',
          options: [
            { text: 'Its error on a test set it never trained on', correct: true, why: 'Only unseen data shows how it will do on new days.' },
            { text: 'Its error on the training set', why: 'That measures memory, and is usually too optimistic.' },
            { text: 'The number of parameters', why: 'That describes the model, not how good it is.' },
            { text: 'The training time', why: 'Useful to know, but it isn’t a quality score.' },
          ],
        },
        overfitScene,
        {
          type: 'story',
          eyebrow: 'What happened',
          title: 'It learned the noise',
          body: 'Every dataset has ==noise==: random ups and downs that no feature explains. A low day might be a broken cooler; a high day, a wedding nearby.\n\nThe bendy curve had so many knobs that it bent to fit every one of those accidents. It learned the **noise** instead of the **pattern**. That’s ==overfitting==.\n\nThe tell-tale sign: **training error much lower than test error**.',
        },
        {
          type: 'choice',
          eyebrow: 'Diagnose it',
          prompt: 'A model has training error $2$ and test error $40$. What is most likely going on?',
          options: [
            { text: 'Overfitting: it memorised the training data', correct: true, why: 'A big gap between training and test error is the classic sign.' },
            { text: 'Underfitting: the model is too simple', why: 'An underfit model does badly on training data too.' },
            { text: 'The model is excellent', why: 'Training error doesn’t matter if new data goes badly.' },
            { text: 'The test set is too large', why: 'A larger test set makes the score more reliable, not worse.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Turn up the bendiness',
          body: '`errors(n)` fits a curve with bendiness `n` (1 is a straight line; 7 can pass through all eight days) and returns the average miss on the training days and on the new days. It uses NumPy, the library for fast maths.',
          graph: {
            packages: ['numpy'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it for bendiness 1, 3 and 7. Watch both numbers.', code: 'for n in [1, 3, 7]:\n    print(n, errors(n))', expect: '1 (9.0, 4.2)\n3 (8.0, 4.9)\n7 (0.0, 29.7)', hint: 'Run it as it is.', solution: 'for n in [1, 3, 7]:\n    print(n, errors(n))', done: 'Training error falls to $0$ as the curve bends more, but the error on new days explodes. Simpler won.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Getting the balance right',
      terms: [
        ['Regularisation', 'A penalty during training that discourages extreme knob values, keeping models from bending too much.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Too simple, just right, too complex',
          title: 'Three models',
          cards: [
            { title: 'Underfit', text: 'A flat line at the average: misses the pattern entirely. Bad on training **and** new days.' },
            { title: 'Good fit', text: 'A straight rising line: captures the trend, ignores the noise. Similar error on training and new days.' },
            { title: 'Overfit', text: 'The bendy curve: perfect on training days, terrible on new ones.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Cures',
          prompt: 'Which of these help against overfitting?',
          options: [
            { text: 'Collecting more data', correct: true, why: '**Helps:** with more examples, noise averages out and is harder to memorise.' },
            { text: 'Using a simpler model (fewer knobs)', correct: true, why: '**Helps:** less room to bend around noise.' },
            { text: 'Regularisation: penalising extreme knob values', correct: true, why: '**Helps:** it keeps the model smooth. Used in almost all modern training.' },
            { text: 'Choosing the model by its validation score', correct: true, why: '**Helps:** you pick what generalises, not what memorises.' },
            { text: 'Training longer on the same small dataset', why: '**Usually hurts:** more time to memorise. Stopping early is itself a cure.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Large language models have billions of knobs. Why don’t they simply memorise everything?',
          options: [
            { text: 'They train on enormous amounts of text, and are regularised and checked on held-out data', correct: true, why: 'Data at that scale makes pure memorising much harder. Even so, they do memorise some text, which raises copyright and privacy questions (Chapter 10).' },
            { text: 'Because more knobs always means less overfitting', why: 'More knobs alone gives more room to memorise.' },
            { text: 'They do memorise everything', why: 'They generalise to questions never seen, though some memorisation happens.' },
            { text: 'Because text has no noise', why: 'Text is full of noise and errors.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Talking about fit',
          body: '**“Training error kept falling but validation error started rising after a point, so the model was overfitting. We stopped early and added regularisation.”**\n\nAnd the question to ask at any talk: **“How big was the gap between training and test performance?”**',
        },
        {
          type: 'finish',
          title: 'You can spot overfitting.',
          body: 'Noise versus pattern, the train–test gap, and the cures. Next: scoring yes-or-no predictions, where accuracy can lie.',
        },
      ],
    },
  ],
};
