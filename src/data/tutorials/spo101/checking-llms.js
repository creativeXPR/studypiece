// SPO 101 · LLMs in practice · Lesson 3: can you trust the answers? Hallucinations, building your
// own evaluation set, benchmarks and their limits, judging with people or models, red-teaming.

const SETUP = `tests = [
    ("How much is zobo?", "300", "Zobo is 300 naira."),
    ("Do you open on Sunday?", "1pm", "Yes, from 1pm on Sundays."),
    ("How many bottles in a crate?", "12", "A crate holds 12 bottles."),
    ("Is delivery free for one crate?", "no", "Yes, delivery is always free!"),
    ("Do you sell bread?", "don't know", "Yes, fresh bread every morning."),
    ("What is the crate discount?", "10", "Crates get 10 percent off if booked a day ahead."),
]`;
const SCORE = `passed = 0
for question, must_contain, answer in tests:
    if must_contain.lower() in answer.lower():
        passed = passed + 1
    else:
        print("FAILED:", question, "->", answer)
print(passed, "of", len(tests), "passed")`;

export default {
  id: 'checking-llms',
  title: 'Checking LLM answers',
  covers: 'Hallucinations, evaluation sets, benchmarks and contamination, human and model judges, red-teaming',
  minutes: 14,
  sections: [
    {
      name: 'Trust, but verify',
      terms: [
        ['Hallucination', 'A fluent, confident answer that is false or unsupported.'],
        ['Evaluation set', 'A fixed list of test questions with known good answers, used to score a system the same way every time.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In RAG, what happens before the model writes its answer?',
          options: [
            { text: 'Relevant documents are retrieved and put into the prompt', correct: true, why: 'Retrieve, augment, generate.' },
            { text: 'The model is retrained', why: 'RAG needs no retraining; that is its appeal.' },
            { text: 'The question is translated', why: 'No translation step is needed.' },
            { text: 'Nothing', why: 'Retrieval comes first.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 9 · Lesson 3',
          title: 'Fluent is not the same as true',
          body: 'Ade’s chatbot told a customer that delivery is always free. It isn’t: only for 2 crates or more. Another customer was told the kiosk sells bread. It doesn’t.\n\nThese are ==hallucinations==: fluent, confident, wrong. They happen because the model produces **likely** text, and a confident “Yes, of course!” is very likely text.\n\nYou can’t judge a chatbot by chatting with it for five minutes. You need a fixed test.',
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Build an evaluation set',
          body: '`tests` holds six questions, each with a word the right answer **must** contain, and the chatbot’s actual answer. Each item is in round brackets: a ==tuple==, a fixed group of values. The loop unpacks each into three names. `in` checks whether one piece of text appears inside another.',
          graph: {
            setup: SETUP,
            tasks: [
              { ask: 'Run it: score the chatbot.', code: SCORE, expect: 'FAILED: Is delivery free for one crate? -> Yes, delivery is always free!\nFAILED: Do you sell bread? -> Yes, fresh bread every morning.\n4 of 6 passed', hint: 'Run it as it is.', solution: SCORE, done: '4 of 6, and the failures show exactly where to look. Change the prompt or retrieval, rerun the same tests, and compare. That loop is how real teams improve LLM systems.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Why keep the evaluation set **fixed** instead of asking new questions each time?',
          options: [
            { text: 'So scores before and after a change can be compared fairly', correct: true, why: 'Same questions, same scoring: any difference comes from your change.' },
            { text: 'Because new questions are harder to type', why: 'The point is fair comparison.' },
            { text: 'Fixed sets catch every possible mistake', why: 'No set catches everything; keep adding cases you find.' },
            { text: 'The model learns the answers', why: 'The model isn’t trained on them; you test with them.' },
          ],
        },
      ],
    },
    {
      name: 'Benchmarks and judges',
      terms: [
        ['Benchmark', 'A widely shared test set used to compare models, such as maths problems or exam questions.'],
        ['Contamination', 'When benchmark questions leaked into a model’s training data, inflating its score.'],
        ['Red-teaming', 'Deliberately trying to make a system fail or misbehave, to find weaknesses before users do.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'How models are compared',
          title: 'Four ways to judge',
          cards: [
            { title: 'Benchmarks', text: 'Shared tests (school maths, science exams, coding puzzles). Easy to compare, but they can saturate (everyone scores 90%+) or leak into training data.' },
            { title: 'Human ratings', text: 'People compare two answers blind and pick the better. Slow and costly, but closest to what users feel. Public “arenas” rank models this way.' },
            { title: 'Model as judge', text: 'A strong LLM grades answers against a rubric. Fast and cheap; must itself be checked against human judgements.' },
            { title: 'Red-teaming', text: 'People try hard to break the system: trick questions, harmful requests, attempts to override its instructions.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A new model scores 98% on a famous five-year-old benchmark. What should a careful listener wonder?',
          options: [
            { text: 'Whether the benchmark’s questions were in its training data (contamination)', correct: true, why: 'Old public benchmarks are all over the internet. A model may have memorised the answers, the exam-paper problem from Chapter 5.' },
            { text: 'Nothing: 98% settles it', why: 'Scores on leaked or saturated tests can mislead.' },
            { text: 'Whether 98% rounds to 100%', why: 'The worry is about fairness, not rounding.' },
            { text: 'Whether the model is open-weight', why: 'That doesn’t affect contamination.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'A healthy habit',
          prompt: 'You are about to rely on a chatbot answer for something important. Which are sensible checks?',
          options: [
            { text: 'Ask for its sources and open them', correct: true, why: '**Yes:** and check the source really says it.' },
            { text: 'Check key facts and numbers elsewhere', correct: true, why: '**Yes:** especially names, dates, figures and citations.' },
            { text: 'Ask the same question again and see if it changes', correct: true, why: '**Yes:** an answer that changes from run to run is a warning sign.' },
            { text: 'Trust it because it sounds certain', why: '**No:** confidence and correctness are unrelated.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Evaluation talk',
          body: '**“We built a 200-question evaluation set from real customer messages. The baseline prompt passed 71%; adding retrieval raised it to 89%. Most remaining failures are questions our documents don’t cover, where it should say it doesn’t know.”**\n\nAnd at any LLM talk, ask: **“How did you evaluate it, and could the test data have leaked into training?”**',
        },
        {
          type: 'finish',
          title: 'You can evaluate an LLM.',
          body: 'Hallucinations, evaluation sets, benchmarks, judges and red-teaming. Next chapter: using AI responsibly.',
        },
      ],
    },
  ],
};
