// SPO 101 · LLMs in practice · Lesson 1: how a chatbot is made. Pretraining on next-token
// prediction, instruction tuning, learning from human feedback, open and closed models, scale.

export default {
  id: 'how-llms-made',
  title: 'How LLMs are made',
  covers: 'Pretraining, fine-tuning on instructions, learning from human feedback, open and closed models, the cost of scale',
  minutes: 13,
  sections: [
    {
      name: 'Three stages',
      terms: [
        ['Pretraining', 'Training a model on a huge amount of general text to predict the next token. The expensive first stage.'],
        ['Base model', 'The model after pretraining: it continues text, but doesn’t yet behave like a helpful assistant.'],
        ['Fine-tuning', 'Further training of a pretrained model on a smaller, specific dataset.'],
        ['RLHF', 'Reinforcement learning from human feedback: people compare answers, and the model learns to give the kind they prefer.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does attention let each token do?',
          options: [
            { text: 'Weigh every other token and mix in information from the relevant ones', correct: true, why: 'That’s how “it” works out whether it means the bottle or the cooler.' },
            { text: 'Look only at the previous token', why: 'That was the toy counting model.' },
            { text: 'Skip unimportant words entirely', why: 'Every token gets a weight; some just get very small ones.' },
            { text: 'Choose the learning rate', why: 'Attention is part of the model, not of training settings.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 9 · LLMs in practice',
          title: 'From text predictor to assistant',
          body: 'A chatbot like ChatGPT, Claude or Gemini is built in stages.\n\n**1. Pretraining.** A huge transformer learns to predict the next token on trillions of tokens of text: websites, books, code. This takes thousands of GPUs for weeks or months. The result, a ==base model==, knows a lot but just continues text. Ask it a question and it might reply with more questions.\n\n**2. Instruction tuning.** It is ==fine-tuned== on many examples of instructions and good answers, so it learns to respond helpfully.\n\n**3. Learning from feedback.** People compare pairs of answers and pick the better one; the model is trained towards preferred answers (==RLHF== and related methods). This shapes helpfulness, tone and safety.',
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'The stages of building a chat assistant:',
          items: [
            'Collect and clean a huge text dataset',
            'Pretrain a transformer on next-token prediction',
            'Fine-tune on examples of instructions and good answers',
            'Train on human preferences between answers',
            'Test for quality and safety, then release',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A base model is given “What is the capital of Ghana?”. What might it plausibly do?',
          options: [
            { text: 'Continue with more quiz questions, like a list on a web page', correct: true, why: 'A base model continues text in a likely way. Text that starts with a question is often followed by more questions. Instruction tuning teaches it to answer.' },
            { text: 'Always answer “Accra” politely', why: 'That assistant behaviour comes from the later stages.' },
            { text: 'Refuse to respond', why: 'It always produces a continuation.' },
            { text: 'Ask for clarification like an assistant', why: 'That is learned in instruction tuning.' },
          ],
        },
      ],
    },
    {
      name: 'Models in the wild',
      terms: [
        ['Open-weight model', 'A model whose trained parameters are published, so anyone can download, run and fine-tune it (Llama, Mistral, Qwen, Gemma).'],
        ['Closed model', 'A model used only through a company’s app or paid API, without access to its weights.'],
        ['API', 'A way for programs to send requests to a service, for example sending a prompt and receiving the model’s reply.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Two ways to use a model',
          title: 'Open and closed',
          cards: [
            { title: 'Closed models', text: 'Used through an app or a paid ==API==. Usually the most capable; no hardware needed; but your data goes to the provider and you can’t change the model.' },
            { title: 'Open-weight models', text: 'Download the weights from **Hugging Face** and run them yourself. Full control and privacy, can be fine-tuned on your data; needs your own GPUs for the big ones.' },
            { title: 'Hugging Face', text: 'The main website for sharing models, datasets and demos. A central meeting place of the ML community.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A Lagos hospital wants a model to summarise patient notes, which must not leave its servers. What fits best?',
          options: [
            { text: 'An open-weight model run on the hospital’s own servers', correct: true, why: 'The data never leaves the building, and the model can be fine-tuned on medical language.' },
            { text: 'Any free public chatbot website', why: 'Patient data would leave the hospital, which is a privacy and legal problem.' },
            { text: 'No model can help', why: 'Open-weight models can run privately.' },
            { text: 'The biggest closed model, because it’s the best', why: 'Capability doesn’t solve the requirement that data stays in-house.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Scale',
          title: 'Why size matters, and costs',
          body: 'Researchers found that LLMs improve fairly predictably as you increase **parameters, data and compute** together. These patterns are called ==scaling laws==, and they explain the race to build ever larger models and data centres.\n\nBut bigger means costlier to train and to run, and uses more electricity and water. A lot of current work goes into making **small** models nearly as good (distillation, better data), so they can run cheaply, even on a phone.',
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Describing a model',
          body: '**“It’s an open-weight 8-billion-parameter model, instruction-tuned, which we fine-tuned on 5,000 customer messages and run on a single GPU.”**\n\nSize, open or closed, how it was adapted, where it runs: the four facts people want first about any model.',
        },
        {
          type: 'finish',
          title: 'You know how LLMs are made.',
          body: 'Pretraining, instruction tuning, human feedback; open and closed models. Next: getting good answers, and grounding them in your own documents.',
        },
      ],
    },
  ],
};
