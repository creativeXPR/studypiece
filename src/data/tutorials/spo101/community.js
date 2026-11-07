// SPO 101 · Joining the conversation · Lesson 3: where the ML community gathers (online and in
// Africa), how to belong quickly, asking for help well, and sharing your work.

export default {
  id: 'community',
  title: 'Finding your people',
  covers: 'Hugging Face, Kaggle, GitHub, Discord, African ML communities and conferences, asking for help, sharing work',
  minutes: 12,
  sections: [
    {
      name: 'Where people gather',
      terms: [
        ['Kaggle', 'A website for data-science competitions, shared datasets and notebooks, with active discussion forums.'],
        ['GitHub', 'The main website for sharing code. Projects have “issues” where people report problems and discuss changes.'],
        ['Open source', 'Software whose code is public, so anyone can use it, study it and contribute.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which question checks whether a result can be trusted by others?',
          options: [
            { text: '“Are the code and data available so others can reproduce it?”', correct: true, why: 'Reproducibility lets others check the work.' },
            { text: '“How long did it take?”', why: 'Effort isn’t evidence.' },
            { text: '“Who funded the GPUs?”', why: 'Worth knowing sometimes, but not a reproducibility check.' },
            { text: '“Was it fun?”', why: 'Nice to ask, but not about trust.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Online',
          title: 'Five places to join',
          cards: [
            { title: 'Hugging Face', text: 'Models, datasets and demo apps (“Spaces”). The daily Papers page. Make an account, follow people, try models in the browser.' },
            { title: 'Kaggle', text: 'Competitions with leaderboards, free datasets and notebooks (with free GPUs). Start with “Titanic”, the classic first competition.' },
            { title: 'GitHub', text: 'Where the code lives. Star projects you use; read their issues to see real problems.' },
            { title: 'Discord and Slack groups', text: 'Chat communities for courses, libraries and research groups. Many beginners’ questions get answered within hours.' },
            { title: 'X (Twitter) and LinkedIn', text: 'Where researchers announce papers and discuss them. Follow a few people whose work you like.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'In Africa and in person',
          title: 'Communities close to home',
          cards: [
            { title: 'Deep Learning Indaba', text: 'Africa’s largest ML gathering, held in a different African country each year, with local “IndabaX” events in many countries, including Nigeria.' },
            { title: 'Data Science Nigeria', text: 'Training programmes, bootcamps and an active community of Nigerian data scientists.' },
            { title: 'Masakhane', text: 'A grassroots research community building language technology for African languages. Contributors include many volunteers.' },
            { title: 'Google Developer Groups and university clubs', text: 'Local meetups, study jams and talks. A good first room to walk into.' },
          ],
        },
      ],
    },
    {
      name: 'How to belong',
      screens: [
        {
          type: 'story',
          eyebrow: 'Chapter 11 · Lesson 3',
          title: 'Belonging is mostly doing',
          body: 'People belong to a community by **taking part**, not by knowing everything. Four habits get you there fast:\n\n**Share small, real work.** A short post: what you built, the honest result, one thing you learned.\n**Help someone a step behind you.** Answer a beginner question you now understand.\n**Ask good questions** (last lesson), in public, so others learn too.\n**Make one small contribution.** Fix a typo in a library’s documentation, improve an example, or report a clear bug.',
        },
        {
          type: 'choice',
          eyebrow: 'Asking for help',
          prompt: 'Which help request is most likely to get a quick, useful answer?',
          options: [
            { text: '“I’m fitting LinearRegression on a 30-row table. `model.fit(X, y)` gives ValueError: Expected 2D array. Here are my 3 lines of code. I expected it to train. What am I missing?”', correct: true, why: 'It says what you did, the exact error, the code, and what you expected. (The answer: `X` needs double brackets.)' },
            { text: '“My code doesn’t work, please help urgently!!”', why: 'Nobody can help without the code and error.' },
            { text: '“Can someone teach me machine learning?”', why: 'Too broad for a forum; ask about a specific step.' },
            { text: 'A photo of the screen taken with a phone, no text', why: 'Hard to read and impossible to copy. Paste the text.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'A first month',
          prompt: 'A sensible order for your first steps in the community:',
          items: [
            'Make accounts on Hugging Face, Kaggle and GitHub',
            'Try a few models in the browser on Hugging Face',
            'Submit to a beginner Kaggle competition',
            'Put a small project on GitHub with a clear README',
            'Post about it, and help one person with a question',
          ],
          explain: 'The capstone at the end of this course takes you through the last two steps.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'You post your first project and an expert points out a mistake in your test split. Best response?',
          options: [
            { text: 'Thank them, fix it, and post the corrected result', correct: true, why: 'Openly correcting work builds more respect than being right the first time. Everyone in the field has done this.' },
            { text: 'Delete the post', why: 'You lose the lesson and the conversation.' },
            { text: 'Argue that it doesn’t matter', why: 'A leaky test split does matter (Chapter 5).' },
            { text: 'Ignore it', why: 'Engaging is how you grow and get known.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know where to go.',
          body: 'Online hubs, African communities, and the habits that make you belong. Next: a mock conference to practise everything.',
        },
      ],
    },
  ],
};
