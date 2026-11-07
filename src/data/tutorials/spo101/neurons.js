// SPO 101 · Neural networks · Lesson 1: a neuron as weighted sum + bias + bend (ReLU), and two
// neurons combining into a shape no straight line can make. Written in plain Python.
import { neuronScene } from './nn-scenes';

export default {
  id: 'neurons',
  title: 'From a line to a neuron',
  covers: 'A neuron: weights, bias and an activation (ReLU); combining neurons to make curves',
  minutes: 13,
  sections: [
    {
      name: 'One neuron',
      terms: [
        ['Neuron', 'A tiny unit that multiplies its inputs by weights, adds a bias, and applies a bend (activation).'],
        ['Activation function', 'The bend applied to a neuron’s sum. Without it, stacked neurons would still only make straight lines.'],
        ['ReLU', 'The most common activation: negative values become 0, positive values pass through. `max(0, z)`.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'k-means is an example of which kind of learning?',
          options: [
            { text: 'Unsupervised: it finds groups without labels', correct: true, why: 'No answers were given; it discovered the groups.' },
            { text: 'Supervised', why: 'Supervised learning needs labels.' },
            { text: 'Reinforcement', why: 'There is no trial-and-reward loop.' },
            { text: 'Regression', why: 'It groups points rather than predicting numbers.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 7 · Neural networks',
          title: 'Not a brain, a building block',
          body: 'Neural networks power image recognition, translation and chatbots. The name comes from a loose comparison with brain cells, but a ==neuron== in a network is very simple:\n\n**1.** Multiply each input by a weight and add them up.\n**2.** Add a bias.\n**3.** Apply a **bend**.\n\nSteps 1 and 2 are exactly Ade’s linear regression. Step 3 is the new part, and it changes everything.',
        },
        neuronScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'What does ReLU do to the numbers $-4$, $0$ and $3$?',
          options: [
            { text: '$0$, $0$, $3$', correct: true, why: 'Below zero becomes zero; anything else passes through unchanged.' },
            { text: '$4$, $0$, $3$', why: 'It doesn’t flip the sign; it flattens negatives to $0$.' },
            { text: '$-4$, $0$, $0$', why: 'It’s the negatives that become $0$, not the positives.' },
            { text: '$0$, $1$, $1$', why: 'Positive values keep their size.' },
          ],
        },
      ],
    },
    {
      name: 'Neurons in Python',
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Build a neuron',
          body: '`max(0, z)` picks the larger of $0$ and `z`: that is ReLU in one line.',
          graph: {
            tasks: [
              { ask: 'Run it: a neuron with weight $1.5$ and bias $-10.5$ (so it bends at 7 o’clock). What does it give at 11 o’clock?', code: 'def relu(z):\n    return max(0, z)\n\ndef neuron(x, weight, bias):\n    return relu(weight * x + bias)\n\nprint(neuron(11, 1.5, -10.5))', expect: '6.0', hint: 'Run it as it is.', solution: 'def relu(z):\n    return max(0, z)\n\ndef neuron(x, weight, bias):\n    return relu(weight * x + bias)\n\nprint(neuron(11, 1.5, -10.5))', done: '$1.5 \\times 11 - 10.5 = 6$, positive, so it passes through.' },
              { ask: 'Try 6 o’clock: before the bend.', code: 'print(neuron(6, 1.5, -10.5))', expect: '0', hint: 'Run it as it is.', solution: 'print(neuron(6, 1.5, -10.5))', done: '$1.5 \\times 6 - 10.5 = -1.5$, so ReLU makes it $0$: the neuron is “off”.' },
              { ask: 'Combine two neurons to make the lunchtime peak: the first rises from 7, the second (weight $3$, bias $-39$) is subtracted from 13. Print the result at 13 and at 16 o’clock.', code: 'def peak(x):\n    return neuron(x, 1.5, -10.5) - neuron(x, 3, -39)\n\nprint(peak(13), peak(16))', expect: '9.0 4.5', hint: 'Run it as it is.', solution: 'def peak(x):\n    return neuron(x, 1.5, -10.5) - neuron(x, 3, -39)\n\nprint(peak(13), peak(16))', done: 'Up to $9$ at lunchtime, back down to $4.5$ by 4 pm: a shape no single straight line can make.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why is the bend essential? What if neurons had no activation at all?',
          options: [
            { text: 'Adding up straight lines only ever gives another straight line, however many you use', correct: true, why: 'Without bends, a huge network collapses into one big linear regression. The bends are what let networks draw curves.' },
            { text: 'Training would be slower but just as powerful', why: 'It would be much **less** powerful: only straight lines.' },
            { text: 'Nothing would change', why: 'Everything would: no curves at all.' },
            { text: 'The network would refuse to run', why: 'It runs; it just can’t represent curves.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know what a neuron is.',
          body: 'Weighted sum, bias, bend. Next: stacking many neurons into layers.',
        },
      ],
    },
  ],
};
