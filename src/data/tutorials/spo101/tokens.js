// SPO 101 · Text, embeddings and transformers · Lesson 1: turning text into numbers. Words,
// sub-word tokens, a vocabulary of IDs (with a first look at dictionaries), and why tokens matter.

export default {
  id: 'tokens',
  title: 'Tokens',
  covers: 'Text as numbers, splitting into tokens, sub-word tokens, vocabularies and IDs, dictionaries, token counts and cost',
  minutes: 14,
  sections: [
    {
      name: 'Text into pieces',
      terms: [
        ['Token', 'A piece of text a language model reads or writes: a word, part of a word, or punctuation.'],
        ['Tokeniser', 'The tool that splits text into tokens and turns each into a number.'],
        ['Vocabulary', 'The full list of tokens a model knows, each with its own ID number.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does backpropagation do?',
          options: [
            { text: 'Passes the blame for the error backwards so every weight knows which way to move', correct: true, why: 'One backward sweep gives every knob its slope.' },
            { text: 'Runs inputs forwards to get a prediction', why: 'That’s the forward pass.' },
            { text: 'Splits the data into training and test sets', why: 'That happens before training.' },
            { text: 'Chooses the number of layers', why: 'That’s a design decision made by people.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 8 · How computers read',
          title: 'Ade’s phone is full of messages',
          body: 'Ade now takes orders on his phone: “please keep two cold zobo for me”, “do you have cold water?”. He would love a helper that reads them.\n\nBut models only work with **numbers**. So the first step for any text model is to cut the text into pieces called ==tokens== and give each piece an ID number. The tool that does this is a ==tokeniser==.',
        },
        {
          type: 'reveal',
          eyebrow: 'How text gets cut',
          title: 'Three ways to split “unbelievably cold!”',
          cards: [
            { title: 'Letters', text: '`u n b e l i e v …`: few kinds of piece, but sentences become very long, and single letters carry little meaning.' },
            { title: 'Whole words', text: '`unbelievably` `cold` `!`: short, but the vocabulary would need every word ever, including typos and new slang.' },
            { title: 'Sub-words (what LLMs use)', text: '`un` `believ` `ably` ` cold` `!`: common words stay whole, rare words split into familiar parts. A vocabulary of about 50,000–200,000 tokens covers everything.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A brand-new slang word appears. Why can a sub-word tokeniser still handle it?',
          options: [
            { text: 'It breaks the word into smaller pieces it already knows', correct: true, why: 'Any word can be spelled from sub-word pieces, down to single characters if needed.' },
            { text: 'It adds the word to its vocabulary automatically', why: 'The vocabulary is fixed when the model is built.' },
            { text: 'It skips unknown words', why: 'Skipping would lose information; it splits them instead.' },
            { text: 'It can’t', why: 'Sub-word tokenisers can encode any text.' },
          ],
        },
      ],
    },
    {
      name: 'A vocabulary in Python',
      terms: [
        ['Dictionary', 'A Python collection of pairs, key and value, in curly brackets: `{"zobo": 0, "cold": 1}`. Look up a value with `d["zobo"]`.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Split a message',
          body: '`.lower()` makes everything lowercase; `.split()` cuts text at the spaces into a list of words. Text functions like these come after a dot.',
          graph: {
            tasks: [
              { ask: 'Run it.', code: 'message = "Please keep two cold zobo for me"\nwords = message.lower().split()\nprint(words)\nprint(len(words), "tokens")', expect: "['please', 'keep', 'two', 'cold', 'zobo', 'for', 'me']\n7 tokens", hint: 'Run it as it is.', solution: 'message = "Please keep two cold zobo for me"\nwords = message.lower().split()\nprint(words)\nprint(len(words), "tokens")', done: 'A list of word tokens. Real tokenisers are smarter, but the idea is the same.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Giving words numbers',
          title: 'Dictionaries',
          body: 'To turn tokens into numbers we need a lookup table: “please” is 0, “keep” is 1, and so on. Python’s ==dictionary== is exactly that:\n\n`vocab = {"please": 0, "keep": 1}`\n\nCurly brackets hold **key: value** pairs. `vocab["keep"]` looks up a key and gives its value, `1`. `vocab["two"] = 2` adds a new pair. `"two" in vocab` asks whether a key is there (`True` or `False`).',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Build a vocabulary',
          body: 'Each new word gets the next free number: the size of the vocabulary so far. `not in` asks “is it missing?”.',
          graph: {
            tasks: [
              { ask: 'Run it: build the vocabulary from two messages, then turn the second message into IDs.', code: 'messages = ["please keep two cold zobo", "do you have cold water"]\nvocab = {}\nfor m in messages:\n    for w in m.split():\n        if w not in vocab:\n            vocab[w] = len(vocab)\n\nprint(vocab)\nprint([vocab[w] for w in "do you have cold water".split()])', expect: "{'please': 0, 'keep': 1, 'two': 2, 'cold': 3, 'zobo': 4, 'do': 5, 'you': 6, 'have': 7, 'water': 8}\n[5, 6, 7, 3, 8]", hint: 'Run it as it is. The last line is a short way to look up every word.', solution: 'messages = ["please keep two cold zobo", "do you have cold water"]\nvocab = {}\nfor m in messages:\n    for w in m.split():\n        if w not in vocab:\n            vocab[w] = len(vocab)\n\nprint(vocab)\nprint([vocab[w] for w in "do you have cold water".split()])', done: '“cold” appears in both messages but got one ID, 3. The model only ever sees numbers like `[5, 6, 7, 3, 8]`.' },
              { ask: 'Look up the ID of “zobo”.', code: 'print()', expect: '4', hint: '`print(vocab["zobo"])`.', solution: 'print(vocab["zobo"])' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Why tokens matter',
          title: 'Tokens are the unit of everything',
          body: 'Language models are measured in tokens. A rough guide: in English, **100 tokens ≈ 75 words**.\n\n**Cost:** paid AI services charge per token read and written.\n**Context window:** a model can only look at so many tokens at once (from a few thousand to over a million).\n**Fairness:** languages less common in training data (including many African languages) often split into **more** tokens per word, so they cost more and fit less in the window.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'The same message in Yoruba uses twice as many tokens as in English. What follows?',
          options: [
            { text: 'It costs about twice as much to process and takes twice as much of the context window', correct: true, why: 'Pricing and limits are per token, so tokenisers tuned mostly on English disadvantage other languages. Building better tokenisers and data for African languages is an active area of research.' },
            { text: 'Nothing: tokens are free', why: 'Paid services charge per token.' },
            { text: 'The model understands it twice as well', why: 'More tokens doesn’t mean better understanding.' },
            { text: 'Yoruba can’t be tokenised', why: 'Any text can be tokenised, just less efficiently.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know what tokens are.',
          body: 'Text becomes tokens, tokens become IDs. Next: turning IDs into meaningful positions, embeddings.',
        },
      ],
    },
  ],
};
