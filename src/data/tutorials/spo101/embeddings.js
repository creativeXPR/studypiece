// SPO 101 · Text, embeddings and transformers · Lesson 2: embeddings as positions on a map of
// meaning, directions as relationships, similarity scores, and uses such as search.
import { embeddingScene } from './text-scenes';

const SETUP = `import math
vec = {
    "zobo": [0.9, 0.1, 0.2], "fanta": [0.85, 0.15, 0.1], "water": [0.8, 0.3, 0.1],
    "sunny": [0.1, 0.9, 0.1], "hot": [0.2, 0.85, 0.2], "rain": [0.05, 0.6, 0.7],
    "crate": [0.3, 0.05, 0.9], "bottle": [0.5, 0.05, 0.8],
}

def similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    return dot / (math.sqrt(sum(x * x for x in a)) * math.sqrt(sum(y * y for y in b)))`;

export default {
  id: 'embeddings',
  title: 'Embeddings',
  covers: 'Words as points, closeness as similarity, directions as relationships, similarity scores, semantic search',
  minutes: 13,
  sections: [
    {
      name: 'Meaning as position',
      terms: [
        ['Embedding', 'A list of numbers representing a word (or sentence, image, product), placed so that similar things are close together.'],
        ['Similarity', 'A score for how close two embeddings point: near 1 for very similar, near 0 for unrelated.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does a tokeniser do?',
          options: [
            { text: 'Cuts text into tokens and gives each an ID number', correct: true, why: 'Models only work with numbers, so this is always the first step.' },
            { text: 'Translates text into English', why: 'It only splits and numbers.' },
            { text: 'Corrects spelling', why: 'It splits whatever it is given, typos included.' },
            { text: 'Writes replies', why: 'That’s the model’s job, later.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 8 · Lesson 2',
          title: 'IDs carry no meaning',
          body: 'In the vocabulary, “zobo” was 4 and “water” was 8. Those numbers are just labels: 8 isn’t “twice” 4, and nothing says zobo and water are both drinks.\n\nSo each token ID is swapped for an ==embedding==: a list of numbers learned during training, placed so that words used in similar ways end up **close together**.',
        },
        embeddingScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'How does a model learn that “zobo” and “fanta” belong together?',
          options: [
            { text: 'They appear in similar sentences (“two cold ___ please”), so training moves them close', correct: true, why: '“You shall know a word by the company it keeps”: similar contexts, similar positions.' },
            { text: 'Someone labelled them both as drinks', why: 'No labels are needed; it comes from usage.' },
            { text: 'They have similar spellings', why: 'Spelling doesn’t matter: “zobo” and “fanta” look nothing alike.' },
            { text: 'Alphabetical order', why: 'Position comes from meaning, not the alphabet.' },
          ],
        },
      ],
    },
    {
      name: 'Measuring closeness',
      terms: [
        ['Semantic search', 'Finding documents by meaning rather than exact words, by comparing embeddings.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'How similar are two words?',
          body: 'Each word here has a tiny 3-number embedding (real ones have hundreds). `similarity(a, b)` gives near $1$ when two embeddings point the same way.',
          graph: {
            setup: SETUP,
            tasks: [
              { ask: 'Run it: zobo against fanta, then zobo against rain.', code: 'print(round(similarity(vec["zobo"], vec["fanta"]), 2))\nprint(round(similarity(vec["zobo"], vec["rain"]), 2))', expect: '0.99\n0.29', hint: 'Run it as it is.', solution: 'print(round(similarity(vec["zobo"], vec["fanta"]), 2))\nprint(round(similarity(vec["zobo"], vec["rain"]), 2))', done: 'Two drinks: $0.99$. A drink and the weather: $0.29$.' },
              { ask: 'Find the word most similar to “hot”: loop over every other word and keep the best score.', code: 'best_word = ""\nbest_score = 0\nfor w in vec:\n    if w != "hot":\n        s = similarity(vec["hot"], vec[w])\n        if s > best_score:\n            best_word = w\n            best_score = s\nprint(best_word)', expect: 'sunny', hint: 'Run it as it is. Looping over a dictionary gives its keys.', solution: 'best_word = ""\nbest_score = 0\nfor w in vec:\n    if w != "hot":\n        s = similarity(vec["hot"], vec[w])\n        if s > best_score:\n            best_word = w\n            best_score = s\nprint(best_word)', done: '“sunny”. This “find the nearest embedding” loop is the core of semantic search.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Where it’s used',
          prompt: 'Which of these rely on embeddings?',
          options: [
            { text: 'Searching help pages by meaning (“my drink is warm” finds “cooler not working”)', correct: true, why: '**Yes:** semantic search compares the embeddings of question and pages.' },
            { text: 'Recommending products similar to one you liked', correct: true, why: '**Yes:** products get embeddings too.' },
            { text: 'Every LLM reading its input', correct: true, why: '**Yes:** the first layer of a language model turns tokens into embeddings.' },
            { text: 'Adding up a list of numbers', why: '**No:** plain arithmetic.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Embeddings trained on old news articles place “nurse” closer to “she” and “engineer” closer to “he”. Why?',
          options: [
            { text: 'They copy patterns, including stereotypes, from the text they learned from', correct: true, why: 'Embeddings mirror their data. This was one of the first well-known demonstrations of bias in AI (Chapter 10).' },
            { text: 'It is a calculation error', why: 'The maths worked correctly on biased text.' },
            { text: 'It is a fact about those jobs', why: 'It reflects how the text talked about people, not who can do the job.' },
            { text: 'Embeddings can’t contain bias', why: 'They contain whatever patterns their training data had.' },
          ],
        },
        {
          type: 'finish',
          title: 'You understand embeddings.',
          body: 'Meaning becomes position; closeness becomes similarity. Next: models that predict the next word.',
        },
      ],
    },
  ],
};
