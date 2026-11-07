// SPO 101 · Text, embeddings and transformers · Lesson 3: a language model is a next-word
// predictor. Build one from Ade's messages by counting word pairs, generate text greedily and by
// sampling, and see why scale turns this into a chatbot.

const MSGS = [
  'is the zobo cold today', 'please keep two cold zobo for me', 'do you have cold water', 'is the fanta cold',
  'i want two cold fanta', 'please keep one crate of water for me', 'do you have zobo today', 'the water is cold',
  'i want one cold coke', 'keep the coke for me', 'two cold zobo please', 'i want cold zobo',
];
const SETUP = `messages = [\n${MSGS.map((m) => `    "${m}",`).join('\n')}\n]`;
const COUNT = `following = {}
for m in messages:
    words = m.split()
    for a, b in zip(words, words[1:]):      # each word with the one after it
        if a not in following:
            following[a] = {}
        following[a][b] = following[a].get(b, 0) + 1

print(following["cold"])`;
const GREEDY = `word = "please"
sentence = [word]
for step in range(6):
    options = following[word]
    word = max(options, key=options.get)    # the most frequent next word
    sentence.append(word)
print(" ".join(sentence))`;
const SAMPLE = `import random
word = "i"
sentence = [word]
for step in range(6):
    if word not in following:
        break
    options = following[word]
    word = random.choices(list(options), weights=list(options.values()))[0]
    sentence.append(word)
print(" ".join(sentence))`;

export default {
  id: 'next-word',
  title: 'Predicting the next word',
  covers: 'Language models as next-word predictors, counting word pairs, greedy generation and sampling, temperature, scaling up',
  minutes: 15,
  sections: [
    {
      name: 'The whole trick',
      terms: [
        ['Language model', 'A model that, given some text, gives a probability for every possible next token.'],
        ['Generation', 'Producing text by repeatedly predicting a next token, adding it, and predicting again.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In an embedding space, what does it mean if two words are close together?',
          options: [
            { text: 'They are used in similar ways, so their meanings are related', correct: true, why: 'Closeness is learned from similar contexts.' },
            { text: 'They are spelled similarly', why: 'Spelling plays no part.' },
            { text: 'They have similar ID numbers', why: 'IDs are arbitrary labels.' },
            { text: 'They always appear next to each other', why: 'They appear in similar **contexts**, not necessarily together.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 8 · Lesson 3',
          title: 'Finish this sentence',
          body: '“Please keep two cold ___.” You probably thought **zobo**, **drinks** or **water**, not **elephants**. You just did what a ==language model== does: predict the next word.\n\nThat is the whole job of ChatGPT-style models: given the text so far, give a probability for every possible next token. To write a reply, pick a token, add it to the text, and predict again. And again.\n\nLet’s build a tiny one from Ade’s messages, by counting.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Count what follows what',
          body: 'Ade’s 12 messages are loaded in `messages`. For every pair of neighbouring words, count how often the second follows the first. `following["cold"]` will be a dictionary of the words seen after “cold” and their counts. (`.get(b, 0)` means “the count so far, or 0 if none yet”.)',
          graph: {
            setup: SETUP,
            tasks: [
              { ask: 'Run it: what follows “cold”?', code: COUNT, expect: "{'today': 1, 'zobo': 3, 'water': 1, 'fanta': 1, 'coke': 1}", hint: 'Run it as it is.', solution: COUNT, done: 'After “cold”: “zobo” 3 times, others once. As probabilities: zobo $\\frac{3}{7} \\approx 43\\%$. That **is** a (tiny) language model.' },
              { ask: 'What follows “please”?', code: 'print()', expect: "{'keep': 2}", hint: '`print(following["please"])`.', solution: 'print(following["please"])' },
            ],
          },
        },
      ],
    },
    {
      name: 'Writing text',
      terms: [
        ['Greedy decoding', 'Always picking the single most likely next token.'],
        ['Sampling', 'Picking the next token at random, in proportion to its probability.'],
        ['Temperature', 'A setting for sampling: low is safe and repetitive, high is varied and riskier.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Generate a sentence',
          body: 'The `following` counts are rebuilt for you. `max(options, key=options.get)` picks the word with the biggest count. `.append` adds to the end of a list; `" ".join(...)` glues words with spaces.',
          graph: {
            setup: `${SETUP}\n${COUNT.replace('\n\nprint(following["cold"])', '')}`,
            tasks: [
              { ask: 'Run it: always take the most likely next word (greedy).', code: GREEDY, test: 'True', hint: 'Run it as it is.', solution: GREEDY, done: 'It starts sensibly, then gets stuck going round in a loop. Always choosing the top word makes text repetitive.' },
              { ask: 'Now **sample**: choose the next word at random, weighted by the counts. Run it several times (press Run again): the sentence changes.', code: SAMPLE, test: 'len(sentence) >= 2', hint: 'Run it as it is, a few times.', solution: SAMPLE, done: 'Different every time, and more natural. Chatbots sample too, which is why the same question can get different answers.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A chatbot setting called **temperature** is turned close to 0. What happens?',
          options: [
            { text: 'It nearly always picks the most likely token: consistent but bland answers', correct: true, why: 'Low temperature acts like greedy decoding. Higher temperature spreads the chances out: more creative, more mistakes.' },
            { text: 'It runs more slowly', why: 'Temperature changes the choices, not the speed.' },
            { text: 'It refuses to answer', why: 'It answers, just very predictably.' },
            { text: 'Its answers become random letters', why: 'That would be a very **high** temperature.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'From counting to ChatGPT',
          title: 'Same goal, vastly bigger',
          body: 'Your model only looks at **one** previous word, and learned from 12 messages. A modern LLM:\n\n**reads thousands of previous tokens**, not one, so it can follow a whole conversation;\n**learns from trillions of tokens** of text, not 12 messages;\n**uses a neural network** with billions of parameters instead of a count table, so it can handle sentences it has never seen.\n\nBut the training goal is the same simple one: **predict the next token**. Grammar, facts, reasoning and style are all learned as side effects of getting that one task right.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'An LLM writes a confident, fluent, completely false “fact”. Given how it works, why can this happen?',
          options: [
            { text: 'It is trained to produce likely-sounding text, which is not the same as checking the truth', correct: true, why: 'Plausible and true usually overlap, but not always. This failure is called ==hallucination== (Chapter 9).' },
            { text: 'It is lying on purpose', why: 'It has no intent; it continues text in a likely way.' },
            { text: 'Its tokeniser broke', why: 'Tokenisation is fine; the issue is likely versus true.' },
            { text: 'This can’t happen to large models', why: 'It happens to all of them, less often in better ones.' },
          ],
        },
        {
          type: 'finish',
          title: 'You built a language model.',
          body: 'Next-word prediction, greedy decoding, sampling and temperature. Next: attention, the idea that lets models use the whole sentence.',
        },
      ],
    },
  ],
};
