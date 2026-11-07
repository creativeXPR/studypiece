// SPO 101 · What machine learning is · Lesson 2: the kinds of learning (supervised, unsupervised,
// reinforcement, generative), how AI, ML, deep learning and LLMs nest, and what "learning" costs.

export default {
  id: 'ml-around-you',
  title: 'Kinds of machine learning',
  covers: 'Supervised, unsupervised and reinforcement learning, generative AI, and how AI, ML, deep learning and LLMs fit together',
  minutes: 12,
  sections: [
    {
      name: 'Three ways to learn',
      terms: [
        ['Supervised learning', 'Learning from examples that come with the right answers (labels).'],
        ['Unsupervised learning', 'Finding patterns or groups in data that has no labels.'],
        ['Reinforcement learning', 'Learning by trial and error, from rewards and penalties.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In Ade’s notebook, the temperature is the feature. What is the **label**?',
          options: [
            { text: 'Bottles sold', correct: true, why: 'The label is the answer we want the model to give.' },
            { text: 'The straight line', why: 'That is the model.' },
            { text: 'The notebook', why: 'That is the data.' },
            { text: 'Tomorrow’s forecast', why: 'That’s a new input to predict for.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Lesson 2',
          title: 'Not all learning looks the same',
          body: 'Ade’s line learned from days where he knew **both** the temperature and the answer (bottles sold). That is only one way a machine can learn.\n\nThink of how people learn: from a teacher who marks your answers, by noticing patterns on your own, or by trying things and seeing what works. Machine learning has the same three flavours.',
        },
        {
          type: 'reveal',
          eyebrow: 'Three flavours',
          title: 'Open each one',
          cards: [
            { title: 'Supervised', text: 'Learning with a teacher: every example has the right answer. **Ade’s kiosk:** temperature → bottles sold. **Elsewhere:** emails marked spam or not; X-rays marked by doctors.' },
            { title: 'Unsupervised', text: 'No answers given; the computer finds structure by itself. **Ade’s kiosk:** grouping customers by what and when they buy, without being told the groups. **Elsewhere:** grouping news stories by topic.' },
            { title: 'Reinforcement', text: 'Learning by trial and error, guided by a score. **Ade’s kiosk:** trying different prices each day and keeping what earns more. **Elsewhere:** game-playing programs, robots learning to walk.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Sort it',
          prompt: 'A bank has thousands of past loans, each marked “repaid” or “not repaid”, and trains a model to judge new applications. Which kind is this?',
          options: [
            { text: 'Supervised', correct: true, why: 'Every past example has the answer (repaid or not): learning with a teacher.' },
            { text: 'Unsupervised', why: 'The examples do have labels.' },
            { text: 'Reinforcement', why: 'It learns from a fixed set of labelled examples, not trial and reward.' },
            { text: 'None: banks use fixed rules', why: 'Many lenders use exactly this kind of model.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Sort it',
          prompt: 'A shop has a list of everything each customer bought, with no labels, and wants to discover kinds of shoppers. Which kind is this?',
          options: [
            { text: 'Unsupervised', correct: true, why: 'No answers are given; the groups are discovered. This is called clustering (Chapter 6).' },
            { text: 'Supervised', why: 'There are no labels to learn from.' },
            { text: 'Reinforcement', why: 'There is no trial-and-reward loop here.' },
            { text: 'It can’t be done without labels', why: 'Finding groups without labels is exactly what unsupervised learning does.' },
          ],
        },
      ],
    },
    {
      name: 'AI, ML, deep learning, LLMs',
      terms: [
        ['Artificial intelligence (AI)', 'The broad goal of making computers do things that seem to need intelligence.'],
        ['Deep learning', 'Machine learning with neural networks of many layers.'],
        ['Generative AI', 'Models that create new text, images or sound, rather than only labelling or predicting a number.'],
        ['Large language model (LLM)', 'A huge neural network trained on text to predict the next word; the engine of chatbots.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Words in the news',
          title: 'Circles inside circles',
          body: 'People mix these words up, so here is how they fit:\n\n**AI** is the biggest circle: any way of making computers act intelligently, including hand-written rules.\n\n**Machine learning** sits inside it: AI that learns from data.\n\n**Deep learning** sits inside ML: learning with large neural networks (Chapter 7).\n\n**Large language models** sit inside deep learning: networks trained on huge amounts of text (Chapters 8 and 9). ChatGPT, Claude and Gemini are built on them.',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'From the broadest idea to the most specific:',
          items: ['Artificial intelligence', 'Machine learning', 'Deep learning', 'Large language models'],
          explain: 'Each is a special case of the one before it.',
        },
        {
          type: 'multi',
          eyebrow: 'Spot it',
          prompt: 'Which of these are **generative** AI (they create something new)?',
          options: [
            { text: 'A chatbot writing a reply', correct: true, why: '**Generative:** it produces new text.' },
            { text: 'An app turning a description into a picture', correct: true, why: '**Generative:** it creates an image.' },
            { text: 'A spam filter', why: '**Not generative:** it labels emails, it doesn’t create them.' },
            { text: 'Ade’s line predicting 89 bottles', why: '**Not generative:** it predicts a number.' },
            { text: 'A voice assistant reading text aloud in a natural voice', correct: true, why: '**Generative:** it creates new audio.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'What it takes',
          title: 'Three ingredients',
          body: 'Every machine-learning system, from Ade’s line to a chatbot, needs the same three ingredients:\n\n**Data:** the examples to learn from.\n**A model:** a recipe with adjustable numbers (Ade’s has one; big chatbots have hundreds of billions).\n**Compute:** computer power to adjust those numbers. Small models train on a laptop in seconds; the largest take thousands of specialised chips for months.\n\nWhen people at a conference argue about AI, they are usually arguing about one of these three.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A company says its new model is better “because it is bigger”. Which follow-up question is most useful?',
          options: [
            { text: '“Better at what, measured how, and compared with what?”', correct: true, why: 'Size alone proves nothing. A useful claim names the task, the test and the comparison. You’ll practise this in Chapter 5.' },
            { text: '“How many parameters exactly?”', why: 'Interesting, but it doesn’t tell you if it is better.' },
            { text: '“What programming language is it written in?”', why: 'Almost certainly Python, and it doesn’t affect quality.' },
            { text: '“Is it AI or ML?”', why: 'Both: an ML model is a kind of AI.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can map the field.',
          body: 'Supervised, unsupervised, reinforcement; AI ⊃ ML ⊃ deep learning ⊃ LLMs; data, model and compute. Next chapter: Python from zero.',
        },
      ],
    },
  ],
};
