// SPO 101 · Neural networks · Lesson 2: layers of neurons, width and depth, why bends add up to any
// curve, deep learning, and the kinds of networks for images and text.
import { bendsScene } from './nn-scenes';

export default {
  id: 'layers',
  title: 'Stacking layers',
  covers: 'Layers, width and depth, networks as flexible curve-drawers, deep learning, CNNs and transformers',
  minutes: 12,
  sections: [
    {
      name: 'Layers',
      terms: [
        ['Layer', 'A row of neurons that all read the same inputs. Each layer’s outputs are the next layer’s inputs.'],
        ['Hidden layer', 'A layer between the input and the output.'],
        ['Deep learning', 'Machine learning with networks of many layers.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What are the three steps inside a neuron?',
          options: [
            { text: 'Multiply inputs by weights and add, add a bias, apply a bend', correct: true, why: 'Weighted sum, bias, activation.' },
            { text: 'Sort, count, average', why: 'That’s data summarising, not a neuron.' },
            { text: 'Ask a yes/no question, then split', why: 'That is a decision tree.' },
            { text: 'Find the nearest centre', why: 'That’s k-means.' },
          ],
        },
        bendsScene,
        {
          type: 'story',
          eyebrow: 'The shape of a network',
          title: 'Inputs, hidden layers, output',
          body: 'A neural network arranges neurons in ==layers==:\n\n**Input layer:** the features (the hour; or temperature, rain, market).\n**Hidden layers:** rows of neurons, each reading every output of the layer before.\n**Output layer:** the prediction (bottles).\n\n**Width** is how many neurons a layer has. **Depth** is how many layers there are. Networks with many layers are “deep”, hence ==deep learning==. Deeper layers can combine the bends of earlier layers into far richer shapes.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A network has 3 inputs, one hidden layer of 4 neurons, and 1 output. How many weights connect the inputs to the hidden layer?',
          options: [
            { text: '12', correct: true, why: 'Every one of the 4 neurons has a weight for each of the 3 inputs: $3 \\times 4 = 12$ (plus 4 biases).' },
            { text: '7', why: 'That adds instead of multiplying: each neuron needs its own weight per input.' },
            { text: '4', why: 'Each neuron has 3 weights, not 1.' },
            { text: '3', why: 'That’s only one neuron’s worth.' },
          ],
          explain: 'Counting like this, very large networks quickly reach billions of ==parameters==, the number quoted for language models.',
        },
      ],
    },
    {
      name: 'Networks for every kind of data',
      terms: [
        ['CNN (convolutional network)', 'A network for images: small detectors slide across the picture looking for edges, then shapes, then objects.'],
        ['Transformer', 'A network for sequences such as text, built around attention (Chapter 8). It powers modern language models.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Same parts, different layouts',
          title: 'Three famous architectures',
          cards: [
            { title: 'Plain (fully connected)', text: 'Every neuron reads every output of the layer before. Good for small tables of numbers, like Ade’s.' },
            { title: 'CNN, for images', text: 'Small pattern detectors slide across a photo. Early layers find edges, middle layers shapes, late layers whole objects (a bottle, a face).' },
            { title: 'Transformer, for text', text: 'Each word looks at every other word to decide what matters (attention). The “T” in GPT. Also used for images, sound and more.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'For Ade’s 30-row table of sales, which is likely to work best?',
          options: [
            { text: 'A simple model such as linear regression or boosted trees', correct: true, why: 'Neural networks shine with lots of data and rich inputs (images, text). On small tables, simpler models usually win and are easier to explain.' },
            { text: 'A huge transformer', why: 'Far too many knobs for 30 rows: it would overfit.' },
            { text: 'A CNN', why: 'CNNs are built for images.' },
            { text: 'Always the deepest network available', why: 'Deeper isn’t automatically better, especially with little data.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Describing a network',
          body: '**“It’s a small fully connected network: three inputs, two hidden layers of 16 ReLU units, and one output, about 350 parameters.”**\n\nSaying the inputs, the layers, the activation and the parameter count is the standard way to describe a network, from a tiny one like this to one with billions of parameters.',
        },
        {
          type: 'finish',
          title: 'You understand layers.',
          body: 'Width, depth, and the main architectures. Next: how all those knobs actually get trained.',
        },
      ],
    },
  ],
};
