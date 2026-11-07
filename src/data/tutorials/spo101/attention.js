// SPO 101 · Text, embeddings and transformers · Lesson 4: attention (each word weighs every other
// word), softmax turning scores into weights, the transformer block, and what GPT stands for.
import { attentionScene } from './text-scenes';

export default {
  id: 'attention',
  title: 'Attention and transformers',
  covers: 'Context and ambiguity, attention weights, softmax, the transformer block, GPT, context windows',
  minutes: 14,
  sections: [
    {
      name: 'Looking at the whole sentence',
      terms: [
        ['Attention', 'A step where each token scores every other token for relevance and mixes in information from the most relevant ones.'],
        ['Softmax', 'Turns a list of scores into weights that are all positive and add up to 1.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What is the single training task of a GPT-style language model?',
          options: [
            { text: 'Predict the next token', correct: true, why: 'Everything else is learned as a side effect of that goal.' },
            { text: 'Answer questions correctly', why: 'That comes later, built on next-token prediction.' },
            { text: 'Translate languages', why: 'It can, but that isn’t the training task.' },
            { text: 'Count words', why: 'Our toy model counted; real ones learn with neural networks.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 8 · Lesson 4',
          title: 'Context changes meaning',
          body: '“A **cold** zobo” and “I have a **cold**”: the same word, different meanings. Your toy model only looked at the one word before. Real understanding needs the **whole** sentence.\n\nIn 2017, researchers at Google published a paper called “Attention Is All You Need”, introducing the ==transformer==. Its key idea, ==attention==, lets every word look at every other word and decide which ones matter for its meaning.',
        },
        attentionScene,
        {
          type: 'story',
          eyebrow: 'How the weights are made',
          title: 'Scores, then softmax',
          body: 'For the word “it”, attention computes a **score** for every other word (using their embeddings: how well they match what “it” is looking for).\n\nScores can be any numbers, so they pass through ==softmax==, which turns them into **weights**: all positive, adding up to $1$, with the biggest score getting the biggest share.\n\nThen “it” takes a weighted mix of the other words’ information: $62\\%$ from “bottle”, $12\\%$ from “cooler”, and so on. Its embedding now “knows” what it refers to.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Softmax by hand',
          body: '`math.exp` makes every score positive (bigger scores grow much bigger); dividing by the total makes them add up to $1$.',
          graph: {
            tasks: [
              { ask: 'Run it: three scores for what “it” could refer to.', code: 'import math\n\nwords = ["bottle", "cooler", "because"]\nscores = [3.0, 1.4, 0.2]\n\ntotal = sum(math.exp(s) for s in scores)\nfor w, s in zip(words, scores):\n    print(w, round(math.exp(s) / total, 2))', expect: 'bottle 0.79\ncooler 0.16\nbecause 0.05', hint: 'Run it as it is.', solution: 'import math\n\nwords = ["bottle", "cooler", "because"]\nscores = [3.0, 1.4, 0.2]\n\ntotal = sum(math.exp(s) for s in scores)\nfor w, s in zip(words, scores):\n    print(w, round(math.exp(s) / total, 2))', done: 'Weights adding to (about) $1$, mostly on “bottle”.' },
              { ask: 'Swap the scores of bottle and cooler (“too small”) and run again.', code: 'scores = [3.0, 1.4, 0.2]\ntotal = sum(math.exp(s) for s in scores)\nfor w, s in zip(words, scores):\n    print(w, round(math.exp(s) / total, 2))', expect: 'bottle 0.16\ncooler 0.79\nbecause 0.05', hint: 'Make the first line `scores = [1.4, 3.0, 0.2]`.', solution: 'scores = [1.4, 3.0, 0.2]\ntotal = sum(math.exp(s) for s in scores)\nfor w, s in zip(words, scores):\n    print(w, round(math.exp(s) / total, 2))', done: 'Now “cooler” gets most of the attention. The same softmax also turns a language model’s final scores into next-token probabilities.' },
            ],
          },
        },
      ],
    },
    {
      name: 'The transformer',
      terms: [
        ['Transformer', 'A network built from repeated blocks of attention plus small neuron layers. The design behind modern LLMs.'],
        ['GPT', 'Generative Pre-trained Transformer: generates text, is pre-trained on huge amounts of text, and is built from transformer blocks.'],
        ['Context window', 'The maximum number of tokens a model can attend to at once.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'How a GPT-style model produces the next token:',
          items: [
            'Split the text into tokens and look up each token’s embedding',
            'Attention: each token mixes in information from the earlier tokens that matter',
            'Neuron layers: each token’s numbers are processed further',
            'Repeat attention + neuron layers in many stacked blocks (dozens of them)',
            'Turn the final numbers into a probability for every possible next token (softmax)',
          ],
          explain: 'Then a token is picked, added to the text, and the whole thing runs again for the next one.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'What does the “T” in GPT stand for?',
          options: [
            { text: 'Transformer', correct: true, why: 'Generative Pre-trained Transformer.' },
            { text: 'Text', why: 'Close in spirit, but it names the architecture.' },
            { text: 'Token', why: 'Tokens are its input, but the T is the architecture.' },
            { text: 'Training', why: 'The P (pre-trained) covers training.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'In attention, every token looks at every other token. What happens to the work as the text gets twice as long?',
          options: [
            { text: 'Roughly four times as much attention work: twice the tokens, each looking at twice as many', correct: true, why: 'This is why very long context windows are expensive, and a big research topic.' },
            { text: 'Exactly the same work', why: 'More tokens means more pairs to score.' },
            { text: 'Half the work', why: 'It grows, it doesn’t shrink.' },
            { text: 'Twice the work', why: 'Each of twice as many tokens looks at twice as many others: about four times.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'The architecture in one breath',
          body: '**“It’s a decoder-only transformer: token embeddings, then stacked blocks of self-attention and feed-forward layers, trained on next-token prediction, with a 128k-token context window.”**\n\n“Self-attention” is attention within one text; “feed-forward layers” are the neuron layers; “decoder-only” is the GPT family’s design. You now know what each piece does.',
        },
        {
          type: 'finish',
          title: 'You understand transformers.',
          body: 'Tokens, embeddings, next-word prediction, attention. Next chapter: how real LLMs are made and used.',
        },
      ],
    },
  ],
};
