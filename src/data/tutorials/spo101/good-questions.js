// SPO 101 · Joining the conversation · Lesson 2: a toolkit of questions that make anyone useful in
// ML discussions, practised on realistic claims, plus how to disagree well.

export default {
  id: 'good-questions',
  title: 'Asking good questions',
  covers: 'The question toolkit (data, baseline, test, metric, failures, cost, people), practising on claims, disagreeing well',
  minutes: 13,
  sections: [
    {
      name: 'The toolkit',
      terms: [
        ['Reproducibility', 'Whether others can repeat the work and get the same results, using the shared data and code.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In a paper, which section shows how much each part of the method matters?',
          options: [
            { text: 'The ablations', correct: true, why: 'They remove one part at a time and measure the effect.' },
            { text: 'The abstract', why: 'It summarises; it doesn’t test parts.' },
            { text: 'The title', why: 'The title only names the work.' },
            { text: 'The references', why: 'References list other papers.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 11 · Lesson 2',
          title: 'You don’t need to know everything',
          body: 'At a meetup, Ade’s nephew listens to experts and worries he has nothing to add. But some of the most valued contributions in any ML discussion aren’t facts. They are **good questions**.\n\nEverything you’ve learned in this course turns into a short toolkit of questions that apply to almost any model, paper or product.',
        },
        {
          type: 'reveal',
          eyebrow: 'Seven questions',
          title: 'The toolkit',
          cards: [
            { title: 'Data', text: '“Where did the data come from, and does it represent the people this will be used on?”' },
            { title: 'Baseline', text: '“What does a simple approach score?” (Chapter 5)' },
            { title: 'Test', text: '“Was it tested on data kept apart from training, with no leakage?”' },
            { title: 'Metric', text: '“Why this score? What do the mistakes cost?” (accuracy versus precision and recall)' },
            { title: 'Failures', text: '“Where does it fail, and for whom?” (per-group results)' },
            { title: 'Cost', text: '“What does it cost to train and run, and is that worth the gain?”' },
            { title: 'Reproducibility', text: '“Are the code and data available so others can check?”' },
          ],
        },
      ],
    },
    {
      name: 'Practise on claims',
      screens: [
        {
          type: 'choice',
          eyebrow: 'Claim 1',
          prompt: '“Our crop-disease app is 97% accurate.” Which question adds the most?',
          options: [
            { text: '“How often does it catch the disease when it’s really there, and was it tested on farms other than the ones in training?”', correct: true, why: 'Recall plus a fair test: if diseased leaves are rare, 97% accuracy can hide many misses, and farms differ.' },
            { text: '“Is it written in Python?”', why: 'Doesn’t affect whether it works.' },
            { text: '“Can it reach 100%?”', why: 'First establish what 97% actually means.' },
            { text: '“How many layers does it have?”', why: 'Architecture doesn’t tell you if the claim holds.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Claim 2',
          prompt: '“Our new model beats GPT-level models on our benchmark.” Which question adds the most?',
          options: [
            { text: '“Is the benchmark public, and could its questions be in your training data?”', correct: true, why: 'Contamination and home-made tests are the commonest reasons such claims don’t hold up.' },
            { text: '“What colour is your logo?”', why: 'Irrelevant.' },
            { text: '“How long did you work on it?”', why: 'Effort isn’t evidence.' },
            { text: '“Is it bigger?”', why: 'Size doesn’t settle quality.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Claim 3',
          prompt: '“We trained on 10,000 job applications and the model picks the best candidates.” Which question adds the most?',
          options: [
            { text: '“How was ‘best’ defined in the labels, and have you compared outcomes across groups such as gender and region?”', correct: true, why: 'If the labels were past hiring decisions, the model learns past preferences, including unfair ones (Chapter 10).' },
            { text: '“Could you use 20,000 applications?”', why: 'More of the same biased labels won’t fix the definition of “best”.' },
            { text: '“Which GPU did you use?”', why: 'Hardware doesn’t affect fairness.' },
            { text: '“Is it faster than people?”', why: 'Speed isn’t the main risk here.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Tone matters',
          title: 'Disagreeing well',
          body: 'Good questions land best when they are **curious, specific and kind**:\n\n**Instead of** “Your test is flawed.”\n**Try** “I may have missed it: were the test kiosks separate from the training ones?”\n\n**Instead of** “That won’t work in Nigeria.”\n**Try** “I’m curious how it does on data from West Africa. Have you tried, or would you be open to it?”\n\nAssume good faith, ask about evidence, and offer help when you can. People remember those who make discussions better.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'After a talk, which question is best phrased?',
          options: [
            { text: '“Thanks, really interesting. How did performance vary between the kiosks with little history and the rest?”', correct: true, why: 'Appreciative, specific, and about the evidence.' },
            { text: '“Why didn’t you just use a neural network?”', why: 'Sounds dismissive and assumes the answer.' },
            { text: '“Isn’t this all obvious?”', why: 'Unkind and unspecific.' },
            { text: '“Let me tell you about my own project for five minutes.”', why: 'That’s a talk, not a question.' },
          ],
        },
        {
          type: 'finish',
          title: 'You have a question toolkit.',
          body: 'Data, baseline, test, metric, failures, cost, reproducibility, asked kindly. Next: where the ML community gathers, and how to belong.',
        },
      ],
    },
  ],
};
