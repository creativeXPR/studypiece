// SPO 101 · Joining the conversation · Lesson 1: how ML papers are laid out, a 20-minute reading
// method, reading results tables and figures, and walking through a sample abstract.

export default {
  id: 'reading-papers',
  title: 'Reading a paper',
  covers: 'Where papers live, the parts of a paper, a 20-minute reading method, results tables, separating claims from evidence',
  minutes: 14,
  sections: [
    {
      name: 'How papers work',
      terms: [
        ['Paper', 'A written report of research: the question, the method, the experiments and the results.'],
        ['arXiv', 'A free website where most ML papers appear first, often before formal review (“preprints”).'],
        ['Abstract', 'The short summary at the top of a paper.'],
        ['Ablation', 'An experiment that removes one part of a method to see how much that part matters.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What is prompt injection?',
          options: [
            { text: 'Hidden instructions inside content an AI reads, trying to hijack it', correct: true, why: 'Content should be treated as data, not orders.' },
            { text: 'Writing a very long prompt', why: 'Length isn’t the issue.' },
            { text: 'A way to speed up a model', why: 'It is an attack, not an optimisation.' },
            { text: 'Fine-tuning on prompts', why: 'That’s instruction tuning.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 11 · Joining the conversation',
          title: 'The field talks in papers',
          body: 'New ideas in ML arrive as ==papers==, usually posted free on ==arXiv== (say “archive”), then discussed on social media, in reading groups and at conferences such as NeurIPS, ICML, ICLR and, for Africa, the **Deep Learning Indaba**. **Hugging Face Papers** lists notable new ones each day.\n\nYou don’t need to follow every equation. Most of the value of a paper can be had in 20 minutes, if you know where to look.',
        },
        {
          type: 'reveal',
          eyebrow: 'Anatomy',
          title: 'The parts of an ML paper',
          cards: [
            { title: 'Abstract', text: 'The whole story in one paragraph: problem, idea, main result. Read first.' },
            { title: 'Introduction', text: 'Why the problem matters and a list of “our contributions”. Read the last paragraph closely.' },
            { title: 'Method', text: 'How it works, often with a diagram (Figure 1). Look at the diagram before the maths.' },
            { title: 'Experiments and results', text: 'Tables comparing the new method with older ones (baselines) on test sets. The evidence lives here.' },
            { title: 'Ablations and limitations', text: 'Which parts really matter, and where the method fails. The most honest section.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'A 20-minute method',
          prompt: 'Put the reading steps in order:',
          items: [
            'Read the title and abstract: what is claimed?',
            'Look at Figure 1 and the main results table',
            'Read the introduction’s list of contributions',
            'Check the baselines, the datasets and the limitations',
            'Write one sentence: what they did, and how well it worked',
          ],
          explain: 'Only then decide whether the method section is worth a deeper read.',
        },
      ],
    },
    {
      name: 'Practice on an example',
      screens: [
        {
          type: 'story',
          eyebrow: 'A sample abstract (invented for practice)',
          title: 'KioskCast',
          body: '“Street vendors lose income from stock-outs and waste. We present **KioskCast**, a gradient-boosted tree model that forecasts daily drink demand from weather forecasts, market days and recent sales. On data from 40 kiosks over 6 months, KioskCast reduces mean absolute error by **31%** compared with a linear regression baseline, and by **58%** compared with vendors’ own estimates. An ablation shows rain forecasts contribute most of the gain. Performance drops for kiosks with less than a month of history.”',
        },
        {
          type: 'choice',
          eyebrow: 'Read it',
          prompt: 'What is the main claim?',
          options: [
            { text: 'A boosted-tree model forecasts kiosk demand with 31% lower error than linear regression', correct: true, why: 'That is the headline: method, task and measured improvement over a baseline.' },
            { text: 'Street vendors lose income', why: 'That is the motivation, not the claim.' },
            { text: 'Rain is important', why: 'That is a supporting finding (the ablation).' },
            { text: 'Gradient boosting is always best', why: 'They claim it for this task and data only.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Read it',
          prompt: 'Which detail does the abstract give about the method’s **limits**?',
          options: [
            { text: 'It works worse for kiosks with less than a month of history', correct: true, why: 'A limitation stated up front: a good sign of honesty.' },
            { text: 'It used 40 kiosks', why: 'That describes the data, not a limit (though it is a small sample, worth noting).' },
            { text: 'It beats vendors’ estimates by 58%', why: 'That’s a result.' },
            { text: 'None is given', why: 'The last sentence states one.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Think like a reviewer',
          prompt: 'Which questions would you want answered in the full paper?',
          options: [
            { text: 'Were the test months later than the training months?', correct: true, why: '**Good:** checks for leakage with time-ordered data (Chapter 5).' },
            { text: 'Were all 40 kiosks in one city, and would it work elsewhere?', correct: true, why: '**Good:** asks whether the data is representative.' },
            { text: 'Is the data or code available to check the results?', correct: true, why: '**Good:** reproducibility.' },
            { text: 'What font was the paper written in?', why: '**Not useful:** it doesn’t affect whether the claim holds.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Summarising a paper',
          body: 'The one-sentence summary that works in any reading group:\n\n**“They forecast kiosk demand with boosted trees, cutting error 31% versus linear regression on 40 kiosks; the gain comes mostly from rain forecasts, and it struggles for new kiosks. I’d want to see it on other cities.”**\n\nWhat they did, how well, why it worked, a limit, and your own question. That is how you take part.',
        },
        {
          type: 'finish',
          title: 'You can read a paper.',
          body: 'Where papers live, how they are laid out, and how to pull out the claim and the evidence. Next: asking good questions.',
        },
      ],
    },
  ],
};
