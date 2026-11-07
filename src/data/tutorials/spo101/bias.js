// SPO 101 · Responsible AI · Lesson 1: fairness and bias. How models inherit gaps and history from
// their data, measuring performance per group, and what teams do about it.

const SETUP = `results = [
    # (area, model said "approve", customer actually repaid)
    ("Ikeja", 1, 1), ("Ikeja", 1, 1), ("Ikeja", 0, 0), ("Ikeja", 1, 1), ("Ikeja", 1, 0),
    ("Ikeja", 1, 1), ("Ikeja", 0, 0), ("Ikeja", 1, 1), ("Ikeja", 1, 1), ("Ikeja", 0, 1),
    ("Oja", 0, 1), ("Oja", 0, 1), ("Oja", 1, 1), ("Oja", 0, 0), ("Oja", 0, 1),
    ("Oja", 0, 1), ("Oja", 1, 1), ("Oja", 0, 0), ("Oja", 0, 1), ("Oja", 0, 1),
]`;
const CHECK = `for area in ["Ikeja", "Oja"]:
    good_payers = 0
    approved = 0
    for a, said, repaid in results:
        if a == area and repaid == 1:
            good_payers = good_payers + 1
            if said == 1:
                approved = approved + 1
    print(area, "good payers approved:", approved, "of", good_payers)`;

export default {
  id: 'bias',
  title: 'Fairness and bias',
  covers: 'Where bias comes from, measuring performance per group, real cases, what teams do about it',
  minutes: 14,
  sections: [
    {
      name: 'Bias comes from data',
      terms: [
        ['Bias (in AI)', 'A model treating some groups of people systematically worse than others.'],
        ['Representative data', 'Data that covers all the kinds of people and situations the model will meet.'],
        ['Proxy', 'A feature that stands in for a sensitive one, such as a home area standing in for ethnicity or income.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What is a hallucination?',
          options: [
            { text: 'A fluent, confident answer that is false', correct: true, why: 'Likely-sounding text isn’t always true text.' },
            { text: 'A model refusing to answer', why: 'That’s a refusal.' },
            { text: 'A slow response', why: 'Speed has nothing to do with it.' },
            { text: 'A spelling mistake', why: 'Hallucinations are about false content.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 10 · Responsible AI',
          title: 'A loan app for traders',
          body: 'A company builds a model to approve small loans for market traders like Ade. It learns from past loans, most of which were given in **Ikeja**, where the company started. Few loans were ever given in **Oja**.\n\nThe model learns that “Oja” rarely appears among approved loans, and starts treating it as a warning sign, even for traders who would repay.\n\nNobody wrote “reject Oja”. The model learned it from the data’s history. This is how most AI ==bias== happens.',
        },
        {
          type: 'reveal',
          eyebrow: 'Where bias creeps in',
          title: 'Four common sources',
          cards: [
            { title: 'Missing groups', text: 'Few examples of some people. Face-recognition systems were found to make far more mistakes on darker-skinned women, who were scarce in the training photos.' },
            { title: 'Unfair history', text: 'Past decisions were biased, and the model copies them: a hiring model trained on past hires learns past preferences.' },
            { title: 'Proxies', text: 'Removing “ethnicity” isn’t enough if “home area” or “first language” carries the same information.' },
            { title: 'Who is measured', text: 'Testing only on the majority group hides failures elsewhere. One overall score can look great while one group suffers.' },
          ],
        },
      ],
    },
    {
      name: 'Measuring it',
      terms: [
        ['Fairness audit', 'Checking a model’s performance separately for each group of people it affects.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'Audit the loan model',
          body: '`results` lists 20 past customers: their area, whether the model approved them, and whether they actually repaid. For each area, count the **good payers** and how many the model approved.',
          graph: {
            setup: SETUP,
            tasks: [
              { ask: 'Run the audit.', code: CHECK, expect: 'Ikeja good payers approved: 6 of 7\nOja good payers approved: 2 of 8', hint: 'Run it as it is.', solution: CHECK, done: 'Good payers from Ikeja are approved 86% of the time; from Oja, only 25%. Same reliability, very different treatment. The overall accuracy never showed this.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'The team removes the “area” column and retrains. The gap stays. What is the likely reason?',
          options: [
            { text: 'Another feature, such as the market’s name or phone prefix, still acts as a proxy for area', correct: true, why: 'Deleting a column rarely deletes the information. Fixes usually need better data and per-group checks.' },
            { text: 'The computer didn’t notice the change', why: 'It retrained without the column; the information came in another way.' },
            { text: 'Oja traders really are worse payers', why: 'The audit shows similar repayment; the model’s treatment differs.' },
            { text: 'Fairness can’t be measured', why: 'You just measured it.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'What teams do',
          prompt: 'Which are real ways to reduce bias?',
          options: [
            { text: 'Collect more and better data from under-represented groups', correct: true, why: '**Yes:** often the most effective fix.' },
            { text: 'Report performance for each group, not just overall', correct: true, why: '**Yes:** you can’t fix what you don’t measure.' },
            { text: 'Keep a human in the loop for high-stakes decisions, with a way to appeal', correct: true, why: '**Yes:** especially for loans, jobs, health and policing.' },
            { text: 'Assume the model is neutral because it is maths', why: '**No:** the maths faithfully learns whatever the data contains.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Raising fairness in a discussion',
          body: 'Good questions that are always welcome:\n\n**“Was performance broken down by group, for example by region, gender or language?”**\n**“Is the training data representative of the people this will be used on?”**\n**“What happens to someone the model gets wrong: can they appeal?”**\n\nFor African contexts, the second question matters especially: many models are trained mostly on data from elsewhere.',
        },
        {
          type: 'finish',
          title: 'You can spot and measure bias.',
          body: 'Bias comes from data and history; measure per group; fix with data, checks and people. Next: privacy, safety and the law.',
        },
      ],
    },
  ],
};
