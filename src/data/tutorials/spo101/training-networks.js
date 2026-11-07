// SPO 101 · Neural networks · Lesson 3: training a network. Forward pass, loss, backpropagation as
// blame passed backwards, gradient descent on every knob, epochs and batches, GPUs and PyTorch.
// The code cell trains a real one-hidden-layer network in NumPy.
import { HOURS, SALES } from './nn-scenes';

const SETUP = `import numpy as np
hours = np.array([${HOURS.join(', ')}])
sales = np.array([${SALES.join(', ')}])

def train(neurons, steps=4000, learning_rate=0.1, show=False):
    rng = np.random.default_rng(3)
    x = ((hours - 13) / 6).reshape(-1, 1)
    y = (sales / 15).reshape(-1, 1)
    W1 = rng.normal(0, 1, (1, neurons)); b1 = rng.normal(0, 1, neurons)
    W2 = rng.normal(0, 1, (neurons, 1)) / np.sqrt(neurons); b2 = np.zeros(1)
    for step in range(steps):
        z = x @ W1 + b1                 # forward: weighted sums
        h = np.maximum(0, z)            # ReLU bends
        out = h @ W2 + b2               # output neuron
        err = out - y
        if show and step % 1000 == 0:
            print("step", step, "loss", round(float((err ** 2).mean()), 4))
        g_out = 2 * err / len(x)        # backward: blame on the output
        gW2 = h.T @ g_out; gb2 = g_out.sum(0)
        g_z = (g_out @ W2.T) * (z > 0)  # blame passed back through the bends
        gW1 = x.T @ g_z; gb1 = g_z.sum(0)
        W1 -= learning_rate * gW1; b1 -= learning_rate * gb1
        W2 -= learning_rate * gW2; b2 -= learning_rate * gb2
    guesses = (np.maximum(0, x @ W1 + b1) @ W2 + b2).ravel() * 15
    return round(float(np.abs(guesses - sales).mean()), 1)`;

export default {
  id: 'training-networks',
  title: 'Training a network',
  covers: 'Forward pass, loss, backpropagation, gradient descent on every weight, epochs and batches, GPUs, PyTorch',
  minutes: 15,
  sections: [
    {
      name: 'Passing the blame backwards',
      terms: [
        ['Forward pass', 'Running inputs through the network, layer by layer, to get a prediction.'],
        ['Backpropagation', 'Working backwards from the error to find how much each weight contributed, so every weight knows which way to move.'],
        ['Epoch', 'One full pass of training over the whole dataset.'],
        ['Batch', 'A small group of examples used for one training step.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Why do networks need many neurons to follow Ade’s hourly sales?',
          options: [
            { text: 'Each neuron adds one bend, and the curve needs several bends', correct: true, why: 'More neurons, more bends, closer fit (and more risk of overfitting).' },
            { text: 'Each neuron remembers one hour', why: 'Neurons add bends; they don’t store individual hours.' },
            { text: 'More neurons make it run faster', why: 'More neurons mean more work, not less.' },
            { text: 'They don’t: one neuron is enough', why: 'One neuron gives one bend, which can’t follow the dip and the evening rush.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 7 · Lesson 3',
          title: 'Same idea, more knobs',
          body: 'How are a network’s knobs set? Exactly like Ade’s line: **gradient descent**. Measure the loss, find which way each knob should move to lower it, take a small step, repeat.\n\nThe new problem: a network has thousands (or billions) of knobs, tangled together through layers. Nudging each one separately to measure its slope, as you did for two knobs, would take forever.',
        },
        {
          type: 'story',
          eyebrow: 'The key trick',
          title: 'Backpropagation: blame flows backwards',
          body: 'Think of a kitchen team: the cook, the assistant who chopped, the person who bought the ingredients. A customer complains the soup is too salty. The blame is passed backwards: how much was the cook’s seasoning? How much the stock the assistant made?\n\n==Backpropagation== does this with numbers. Starting from the error at the output, it works backwards layer by layer, giving each weight its share of the blame. **In one backward sweep**, every knob learns which way to move. That efficiency is what made deep learning possible.',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'One training step of a neural network:',
          items: [
            'Forward pass: feed a batch of examples through the layers to get predictions',
            'Compute the loss: how wrong the predictions are',
            'Backward pass: backpropagate the blame to every weight',
            'Update: move every weight a small step downhill (learning rate × slope)',
          ],
          explain: 'Repeat for every batch; one pass through all the data is an ==epoch==. Big models train for many epochs over enormous datasets.',
        },
      ],
    },
    {
      name: 'Train one yourself',
      terms: [
        ['NumPy', 'The Python library for fast maths on whole arrays of numbers at once.'],
        ['PyTorch', 'The most widely used library for building and training neural networks. It does backpropagation automatically.'],
        ['GPU', 'A graphics chip that does thousands of multiplications at once, which makes training large networks practical.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'A real network, trained in your browser',
          body: '`train(n)` builds a network with one hidden layer of `n` ReLU neurons, trains it with backpropagation for 4,000 steps on the hourly sales, and returns the average miss in bottles. You don’t need to read its insides; use it like any function.',
          graph: {
            packages: ['numpy'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it with `show=True` to watch the loss fall during training (one neuron).', code: 'print(train(1, show=True))', match: 'step 3000[\\s\\S]*\\n\\d', hint: 'Run it as it is.', solution: 'print(train(1, show=True))', done: 'The loss falls, then stalls: one bend can’t follow the day. Average miss about $3$ bottles.' },
              { ask: 'Compare networks with 3, 8 and 32 neurons.', code: 'for n in [3, 8, 32]:\n    print(n, "neurons: average miss", train(n))', match: '^3 neurons[\\s\\S]*32 neurons: average miss 0\\.\\d$', hint: 'Run it as it is. It takes a few seconds.', solution: 'for n in [3, 8, 32]:\n    print(n, "neurons: average miss", train(n))', done: 'More neurons, more bends, smaller misses: about $1.1$, $0.7$, $0.5$.' },
              { ask: 'Now break it: train 8 neurons with a learning rate of `3.0`.', code: 'print(train(8, learning_rate=3.0))', match: 'nan|\\d{3,}', hint: 'Run it as it is.', solution: 'print(train(8, learning_rate=3.0))', done: '`nan` means “not a number”: the steps were so big that the numbers blew up. The same overshooting you saw with Ade’s line, now in a network.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Real tools',
          title: 'PyTorch and GPUs',
          body: 'Nobody writes backpropagation by hand for real work. ==PyTorch== (and its rival JAX) let you describe the layers, and they work out the backward pass automatically. A small network looks like:\n\n`model = nn.Sequential(nn.Linear(1, 32), nn.ReLU(), nn.Linear(32, 1))`\n\nThat is: 1 input, a layer of 32 neurons, ReLU bends, 1 output, just like your `train(32)`.\n\nTraining big networks means billions of multiplications per step, so they run on ==GPUs==, chips that do thousands of multiplications at once. Access to GPUs is a major cost in modern AI.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'During training, the training loss keeps falling but the validation loss starts rising. What should you do?',
          options: [
            { text: 'Stop training around where validation loss was lowest (early stopping)', correct: true, why: 'Rising validation loss means the network has started memorising: overfitting. Keep the version from the best validation point.' },
            { text: 'Train much longer', why: 'That deepens the overfitting.' },
            { text: 'Raise the learning rate', why: 'That risks blowing up, and doesn’t address memorising.' },
            { text: 'Ignore validation; training loss is what counts', why: 'Training loss measures memory; validation measures learning.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Talking about training runs',
          body: '**“We trained for 20 epochs with a batch size of 64 and a learning rate of 0.001, using early stopping on validation loss. Training took two hours on one GPU.”**\n\nEvery word is now yours: epochs, batches, learning rate, validation loss, early stopping, GPU.',
        },
        {
          type: 'finish',
          title: 'You trained a neural network.',
          body: 'Forward pass, loss, backpropagation, gradient descent, and the real tools. Next chapter: how networks read text.',
        },
      ],
    },
  ],
};
