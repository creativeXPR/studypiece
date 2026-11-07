// SPO 101 · LLMs in practice · Lesson 2: prompting well (role, context, examples, format) and
// retrieval-augmented generation: find the relevant documents, put them in the prompt, then answer.

const DOCS = [
  'Prices: zobo 300 naira, fanta 350 naira, water 150 naira, coke 350 naira.',
  'Opening hours: 7am to 8pm every day except Sunday, when the kiosk opens at 1pm.',
  'Crates: a crate holds 12 bottles. Crate orders get 10 percent off if booked a day ahead.',
  'Delivery: free delivery for orders of 2 crates or more within the market.',
];
const SETUP = `documents = [\n${DOCS.map((d) => `    "${d}",`).join('\n')}\n]`;
const RETRIEVE = `def score(question, document):
    q = set(question.lower().replace("?", "").split())
    d = set(document.lower().replace(".", "").replace(",", "").replace(":", "").split())
    return len(q & d)                       # how many words they share

def retrieve(question):
    return max(documents, key=lambda doc: score(question, doc))

print(retrieve("How much is a crate of zobo?"))`;
const PROMPT = `question = "When do you open on Sunday?"
context = retrieve(question)
prompt = "You are Ade's kiosk assistant. Answer using only this information: "
prompt = prompt + context + " Question: " + question
print(prompt)`;

export default {
  id: 'prompting-rag',
  title: 'Prompting and RAG',
  covers: 'Writing good prompts, few-shot examples, retrieval-augmented generation, retrieving with embeddings, why grounding helps',
  minutes: 15,
  sections: [
    {
      name: 'Prompting',
      terms: [
        ['Prompt', 'The text you give a language model: instructions, context and the question.'],
        ['Few-shot prompting', 'Including a few worked examples in the prompt to show the model what you want.'],
        ['System prompt', 'Standing instructions given to a chatbot before the conversation (its role and rules).'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What does instruction tuning add to a base model?',
          options: [
            { text: 'It learns to follow instructions and answer helpfully', correct: true, why: 'Pretraining gives knowledge; instruction tuning gives assistant behaviour.' },
            { text: 'It learns the meaning of words for the first time', why: 'That happens in pretraining.' },
            { text: 'It makes the model bigger', why: 'Fine-tuning adjusts existing weights.' },
            { text: 'It removes the need for tokens', why: 'Tokens are always needed.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 9 · Lesson 2',
          title: 'A good prompt is a good brief',
          body: 'Ade’s nephew sets up a chatbot to answer customers. His first prompt: “answer customer questions”. The answers are vague, sometimes wrong.\n\nAn LLM predicts a likely continuation of **your** text, so the text you give it matters enormously. A good ==prompt== reads like a clear brief to a new employee.',
        },
        {
          type: 'reveal',
          eyebrow: 'Four ingredients',
          title: 'What a strong prompt contains',
          cards: [
            { title: 'Role', text: '“You are the assistant for Ade’s cold-drink kiosk at Oja market.”' },
            { title: 'Context', text: 'The facts it needs: prices, opening hours, delivery rules. Models don’t know your business.' },
            { title: 'Examples', text: 'One or two sample questions with ideal answers (==few-shot prompting==). Showing beats telling.' },
            { title: 'Format and limits', text: '“Answer in two sentences, in friendly English. If the answer isn’t in the information, say you’ll ask Ade.”' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which instruction best reduces made-up answers?',
          options: [
            { text: '“Use only the information below; if it isn’t there, say you don’t know.”', correct: true, why: 'It gives the model a safe way out instead of inventing something likely-sounding.' },
            { text: '“Be very confident.”', why: 'That encourages confident inventions.' },
            { text: '“Answer every question no matter what.”', why: 'That forces guesses when the facts are missing.' },
            { text: '“Use long answers.”', why: 'Length doesn’t make answers truer.' },
          ],
        },
      ],
    },
    {
      name: 'Retrieval-augmented generation',
      terms: [
        ['RAG', 'Retrieval-augmented generation: find the documents relevant to a question, put them in the prompt, then let the model answer from them.'],
        ['Vector database', 'A store of document embeddings that can quickly find the ones closest to a question’s embedding.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Too much to paste',
          title: 'Look it up first, then answer',
          body: 'Ade’s information grows: prices, hours, crate deals, delivery, supplier contacts. Pasting everything into every prompt is slow and costly.\n\n==RAG== (retrieval-augmented generation) does what a sensible person does: **look up** the relevant page first, **then** answer from it.\n\n**1. Retrieve:** find the documents most related to the question.\n**2. Augment:** put them into the prompt.\n**3. Generate:** the model answers, grounded in those documents.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'A tiny retriever',
          body: 'Ade’s four information notes are in `documents`. This retriever scores each note by **how many words it shares** with the question (`set` keeps unique words; `&` keeps the words in both). Real systems compare embeddings instead, so “price” also matches “cost”.',
          graph: {
            setup: SETUP,
            tasks: [
              { ask: 'Run it: which note answers a crate question?', code: RETRIEVE, expect: 'Crates: a crate holds 12 bottles. Crate orders get 10 percent off if booked a day ahead.', hint: 'Run it as it is.', solution: RETRIEVE, done: 'It found the crate note. That note would go into the prompt.' },
              { ask: 'Build the full prompt for a Sunday question. Run it and read what the model would receive.', code: PROMPT, match: 'Sunday, when the kiosk opens at 1pm\\. Question: When do you open on Sunday\\?', hint: 'Run it as it is.', solution: PROMPT, done: 'Role, the retrieved fact, and the question. Any LLM given this prompt can answer correctly: 1pm.' },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Why RAG is popular',
          prompt: 'Which are real advantages of RAG?',
          options: [
            { text: 'Answers can use private or recent information the model was never trained on', correct: true, why: '**Yes:** update the documents and the answers update, with no retraining.' },
            { text: 'Answers can cite their source document', correct: true, why: '**Yes:** users can check where an answer came from.' },
            { text: 'It reduces made-up answers when the facts are in the documents', correct: true, why: '**Yes:** grounded answers hallucinate less, though not never.' },
            { text: 'It guarantees every answer is correct', why: '**No:** retrieval can pick the wrong document, and the model can still misread it.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'The chatbot answers a price question wrongly. The retrieved document was the opening-hours note. Where is the fault?',
          options: [
            { text: 'In retrieval: the right document was never shown to the model', correct: true, why: 'When a RAG system fails, check retrieval first. Improving the search often fixes more than changing the model.' },
            { text: 'The model is too small', why: 'Even the best model can’t answer from the wrong page.' },
            { text: 'The temperature was too high', why: 'The model never saw the prices.' },
            { text: 'The tokeniser', why: 'Tokenisation isn’t the issue here.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Describing a RAG system',
          body: '**“We embed the documents into a vector database, retrieve the top three chunks for each question, and prompt the model to answer only from them, citing the source. Most errors we found were retrieval misses, not generation errors.”**',
        },
        {
          type: 'finish',
          title: 'You can ground an LLM.',
          body: 'Prompting, few-shot examples and RAG. Next: checking whether an LLM’s answers can be trusted.',
        },
      ],
    },
  ],
};
