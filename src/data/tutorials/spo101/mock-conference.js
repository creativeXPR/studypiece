// SPO 101 · Joining the conversation · Lesson 4: a mock conference. Follow a short (invented) talk,
// identify its claims and evidence, spot what's missing, choose a question, summarise it, and
// prepare your own one-minute introduction.

export default {
  id: 'mock-conference',
  title: 'Mock conference',
  covers: 'Following a talk, claims versus evidence, spotting gaps, asking a question, summarising, introducing yourself',
  minutes: 15,
  sections: [
    {
      name: 'The talk',
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What makes a help request likely to get a good answer?',
          options: [
            { text: 'What you did, the exact error, the code, and what you expected', correct: true, why: 'Specific and complete.' },
            { text: 'Marking it urgent', why: 'Urgency doesn’t help anyone answer.' },
            { text: 'Asking a very broad question', why: 'Narrow, specific questions get answers.' },
            { text: 'A blurry photo of the screen', why: 'Paste the text instead.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 11 · Lesson 4 · Mock conference',
          title: 'You’re in the audience',
          body: 'You’re at a community AI meetup. The next speaker, from a fictional start-up, gives a five-minute talk. Read it like a listener: what is claimed, what is the evidence, what is missing?\n\nThe next screens are the talk.',
          cta: 'Start the talk',
        },
        {
          type: 'story',
          eyebrow: 'The talk (1 of 2) · invented for practice',
          title: '“TalkPrice: WhatsApp orders, understood”',
          body: '“Small shops get dozens of WhatsApp orders a day in English, Pidgin and Yoruba. Typing them into a ledger takes hours.\n\nWe built **TalkPrice**: an open-weight language model, fine-tuned on **8,000 order messages** from **25 shops in Lagos**, that turns a message into a structured order: item, quantity, pickup time.\n\nOn a held-out set of 1,000 messages from the same shops, it extracts orders with **94% accuracy**, against **71%** for a general chatbot with a careful prompt.”',
        },
        {
          type: 'story',
          eyebrow: 'The talk (2 of 2)',
          title: '“…and what’s next”',
          body: '“Accuracy is **96% on English**, **93% on Pidgin** and **81% on Yoruba** messages, which are only 9% of our data. Most errors are quantities written in words.\n\nIt runs on a small server for about ₦40,000 a month. Shop owners say they save **two hours a day**.\n\nNext, we plan to expand to Ibadan and Kano, and we’re collecting more Yoruba and Hausa data. Our evaluation set is on Hugging Face. Thank you!”',
        },
      ],
    },
    {
      name: 'Your turn to engage',
      screens: [
        {
          type: 'choice',
          eyebrow: 'Follow it',
          prompt: 'What is the talk’s main claim?',
          options: [
            { text: 'A fine-tuned open model extracts orders from shop messages with 94% accuracy, well above a prompted general chatbot (71%)', correct: true, why: 'Method, task, result and baseline: the headline.' },
            { text: 'Small shops get many WhatsApp orders', why: 'That’s the motivation.' },
            { text: 'Yoruba is hard', why: 'That is one finding inside the results.' },
            { text: 'They will expand to Kano', why: 'That’s future plans.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Credit where due',
          prompt: 'Which parts of the talk are signs of good practice?',
          options: [
            { text: 'A held-out test set', correct: true, why: '**Good:** tested on messages kept apart from training.' },
            { text: 'A baseline (the prompted general chatbot)', correct: true, why: '**Good:** shows the fine-tuning adds something.' },
            { text: 'Results broken down by language', correct: true, why: '**Good:** a per-group view revealed the Yoruba gap.' },
            { text: 'Publishing the evaluation set', correct: true, why: '**Good:** others can check and compare.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Spot the gap',
          prompt: 'What is the biggest open question about the 94% figure?',
          options: [
            { text: 'The test messages came from the **same 25 shops**, so it may do worse in new shops and cities', correct: true, why: 'Same shops share customers, items and writing habits. Expanding to Ibadan and Kano is exactly where this matters.' },
            { text: 'Whether 94% rounds to 95%', why: 'Trivial.' },
            { text: 'Whether the model is a transformer', why: 'Almost certainly, and it doesn’t affect the gap.' },
            { text: 'Whether WhatsApp is popular', why: 'That isn’t in doubt.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Ask a question',
          prompt: 'You get the microphone. Which question is best?',
          options: [
            { text: '“Thank you, great to see the per-language breakdown. Have you tested on shops outside the 25 in training, and how did accuracy change?”', correct: true, why: 'Appreciative, specific, and goes straight at the biggest gap.' },
            { text: '“Why not use the biggest closed model instead?”', why: 'They compared against a general chatbot already; this ignores their evidence.' },
            { text: '“Isn’t 94% too low?”', why: 'Vague and negative; low compared with what?' },
            { text: '“How do I start my own start-up?”', why: 'Off topic for the talk.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Summarise it',
          prompt: 'A friend missed the talk. Which one-sentence summary is best?',
          options: [
            { text: '“They fine-tuned an open model on 8,000 Lagos shop orders: 94% accurate versus 71% for a prompted chatbot, weaker on Yoruba (81%), and not yet tested on new shops.”', correct: true, why: 'What, how well, compared with what, the weakness, and the open question.' },
            { text: '“AI can read WhatsApp now.”', why: 'Loses all the evidence and nuance.' },
            { text: '“They built an amazing app that saves two hours a day.”', why: 'Repeats a claim without the evidence or limits.' },
            { text: '“It was about Yoruba.”', why: 'Only one detail.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Introduce yourself',
          title: 'Your one-minute introduction',
          body: 'After talks, people chat. Have a short, honest introduction ready. A pattern:\n\n**Who:** “I’m Tunde, I’m learning machine learning.”\n**What you built:** “I trained a model that forecasts drink sales at a kiosk from weather and market days; it’s off by about 6 bottles a day.”\n**What interests you:** “I’m interested in tools for small traders, so your talk caught my attention.”\n**A question or offer:** “Would you be open to more Yoruba test messages? I could help collect some.”\n\nHonest, specific, curious, generous. That’s how you join the conversation.',
        },
        {
          type: 'finish',
          title: 'You can take part.',
          body: 'Follow the claim, weigh the evidence, spot the gap, ask kindly, summarise, introduce yourself. Next chapter: setting up the tools on your own computer.',
        },
      ],
    },
  ],
};
