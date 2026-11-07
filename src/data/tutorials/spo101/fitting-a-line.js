// SPO 101 · Fitting a line · Lesson 1: a one-knob model, its misses and loss, gradient descent
// rolling down the loss valley, the learning rate, then training it for real in Python.
import { missesScene, stepSizeScene, valleyScene } from './kiosk-scenes';

const DATA = 'temps = [26, 27, 28, 29, 30, 30, 31, 32, 33, 34, 35, 36]\nbottles = [14, 18, 31, 38, 47, 53, 58, 71, 77, 92, 96, 108]\n\n';
const LOSS = `${DATA}def loss(w):
    total = 0
    for t, b in zip(temps, bottles):
        miss = b - w * (t - 25)
        total = total + miss ** 2
    return total / len(temps)

`;
const TRAIN = (rate, steps) => `w = 4
learning_rate = ${rate}

for step in range(${steps}):
    steepness = (loss(w + 0.001) - loss(w - 0.001)) / 0.002
    w = w - learning_rate * steepness
    print(step + 1, round(w, 2), round(loss(w)))`;

export default {
  id: 'fitting-a-line',
  title: 'Fitting a line',
  covers: 'Parameters, misses and loss, the loss valley, gradient descent and the learning rate, training in Python',
  minutes: 20,
  sections: [
    {
      name: 'How wrong is a line?',
      terms: [
        ['Parameter (weight)', 'A number inside the model that training adjusts. Ade’s model has one: the slope $w$.'],
        ['Loss', 'One number saying how wrong the model is on the examples. Training pushes it down.'],
        ['Mean squared error', 'A common loss: square every miss, then take the average.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In Ade’s kiosk data, what is the **feature** and what is the **label**?',
          options: [
            { text: 'Feature: temperature. Label: bottles sold', correct: true, why: 'The feature is the input the model looks at; the label is the answer we want it to give.' },
            { text: 'Feature: bottles sold. Label: temperature', why: 'The other way round: we use the temperature to predict the bottles.' },
            { text: 'Feature: the line. Label: the dots', why: 'The line is the **model**; the dots are the **data**.' },
            { text: 'Both are the forecast', why: 'The forecast is a new input we make a prediction for.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Fitting a line',
          title: 'A model with one knob',
          body: 'Ade’s model says: below $25$ °C almost nobody buys, and each degree above adds $w$ bottles.\n$$\\text{bottles} = w \\times (\\text{temperature} - 25)$$\n\n$w$ is a ==parameter==: a knob. Turn it up and the line gets steeper. His gut said $w = 10$.\n\n**Training** means letting the data choose $w$. To do that, we first need a way to score a line.',
          cta: 'Score some lines',
        },
        missesScene,
        {
          type: 'story',
          eyebrow: 'Turning misses into one number',
          title: 'Loss',
          body: 'For each day, the **miss** is what really sold minus what the line predicted.\n\nTo combine twelve misses into one score: **square** each miss, then take the **average**. This score is the ==loss==, and this recipe is called **mean squared error**:\n$$\\text{loss}(w) = \\text{average of } (\\text{actual} - \\text{predicted})^2$$\n\nA perfect line would score $0$. Lower is better.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why **square** the misses instead of just adding them up?',
          options: [
            { text: 'So misses above and below the line can’t cancel out, and big misses count extra', correct: true, why: 'A miss of $+20$ and one of $-20$ would add to $0$ and look perfect. Squared, they give $400 + 400$. Squaring also makes one big miss count more than several small ones.' },
            { text: 'To make the numbers smaller', why: 'Squaring makes misses bigger than 1 larger, not smaller.' },
            { text: 'Because computers can only add squares', why: 'Computers add any numbers. The reason is about what the score should mean.' },
            { text: 'It makes no difference', why: 'Try $+20$ and $-20$: added, they cancel to $0$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Score a line in Python',
          body: '`loss(w)` does what you just saw: a miss for each day, squared (`** 2`), then averaged. `zip` walks the two lists side by side.',
          graph: {
            tasks: [
              { ask: 'Run it to score Ade’s gut feeling, $w = 10$.', code: `${LOSS}print(loss(10))`, expect: '6.75', hint: 'Run it as it is.', solution: `${LOSS}print(loss(10))`, done: 'Small: his gut was good. But is $10$ the **best**?' },
              { ask: 'Score $w = 9$ and $w = 9.85$ too. Which is lowest?', code: 'print(loss(9))\nprint(loss(9.85))', test: 'True', hint: 'Run it as it is.', solution: 'print(loss(9))\nprint(loss(9.85))', done: '$9.85$ scores about $5.8$, lower than both $9$ and $10$. Trying values by hand works for one knob, but real models have millions. Next: a way to find the bottom automatically.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Rolling downhill',
      terms: [
        ['Gradient descent', 'Training by repeatedly measuring which way the loss goes down and taking a small step that way.'],
        ['Learning rate', 'How big each step is. Too small is slow; too big overshoots and can blow up.'],
      ],
      screens: [
        valleyScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'The ball is at $w = 14$, on the right-hand side of the valley. Which way does gradient descent move it?',
          options: [
            { text: 'Left, to a smaller $w$', correct: true, why: 'On the right side the ground rises to the right, so downhill is to the left: the line is too steep, so flatten it.' },
            { text: 'Right, to a larger $w$', why: 'That is uphill here: the loss would grow.' },
            { text: 'It stays where it is', why: 'It only stays put where the ground is flat: at the bottom.' },
            { text: 'It jumps straight to the bottom', why: 'It can only feel the slope where it stands, so it takes steps.' },
          ],
        },
        stepSizeScene,
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A training run’s loss goes **up** every step and soon becomes enormous. What is the first thing to try?',
          options: [
            { text: 'Make the learning rate smaller', correct: true, why: 'A loss that explodes is the classic sign of steps that are too big: each one overshoots further. A smaller learning rate is the first fix.' },
            { text: 'Make the learning rate bigger', why: 'Bigger steps overshoot even more.' },
            { text: 'Train for more steps', why: 'More steps in the wrong pattern only climb higher.' },
            { text: 'Collect more data', why: 'The data isn’t the problem; the step size is.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Train it for real',
          body: 'Ade’s data and `loss(w)` are already loaded. Each step nudges $w$ a tiny bit both ways to measure how steep the loss is, then steps downhill, printing the step, $w$ and the loss.',
          graph: {
            setup: LOSS,
            tasks: [
              { ask: 'Run it: start at $w = 4$ and take $10$ steps.', code: TRAIN(0.006, 10), test: 'abs(w - 9.85) < 0.05', hint: 'Run it as it is. If you changed it, use **Show me** to get it back.', solution: TRAIN(0.006, 10), done: 'Watch the loss fall each step as $w$ heads to $9.85$. You just trained a model with gradient descent.' },
              { ask: 'Make the steps too big: change the learning rate to `0.03` and run again.', code: TRAIN(0.006, 10), test: 'abs(w) > 100', hint: 'Change `learning_rate = 0.006` to `learning_rate = 0.03`.', solution: TRAIN(0.03, 10), done: 'The loss explodes, exactly as the ball flew out of the valley. Set it back to a small value and training works again.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'What you just did, in the field’s words',
          body: '**“I trained a linear regression with one parameter, using gradient descent on mean squared error. With a learning rate of $0.006$ it converged in about ten steps; at $0.03$ it diverged.”**\n\nEvery word in that sentence is now yours. The models behind chatbots are trained the same way, only with billions of knobs instead of one, so the valley has billions of directions.',
        },
        {
          type: 'finish',
          title: 'You trained your first model.',
          body: 'Next: two knobs (a slope and a starting value), and how to tell whether a model is actually any good.',
        },
      ],
    },
  ],
};
