// GES 103 · Chapter 5 · Lesson 1: the word, why sociology emerged, pioneers, definitions (notes 5.1–5.4).

const HOOK = [
  ['To study famous people', 'Not quite', 'Sociology studies human society and interaction, ordinary people included.'],
  ['To fix the problems of a fast-changing world', 'Exactly right', 'Sociology was “a discipline birthed from social crises to solve social crises.”'],
  ['Because universities needed more subjects', 'Not the reason', 'It was born from real upheavals, not timetables.'],
  ['To replace religion', 'Not the reason', 'Comte did want science instead of metaphysics, but the push came from social crises.'],
];

export default {
  id: 'born-from-crisis',
  title: 'Born from crisis',
  covers: 'Origins, the four upheavals, pioneers, definitions',
  minutes: 13,
  sections: [
    {
      name: 'The word',
      terms: [
        ['Sociology (word)', 'Latin socius (“companion, associate”) + Greek logia (“study of”): the study of associations.'],
        ['Sociology (definition)', 'The scientific study of human society; of human interactions and relationships; of social groups.'],
        ['Auguste Comte', 'French philosopher who coined “sociology”; father of sociology; founder of positive philosophy; called it the apex of all sciences.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'factory',
          eyebrow: 'Chapter 5 · Lesson 1',
          title: 'Born from crisis',
          body: 'Britain and Western Europe, about 200 years ago. Factories rise overnight. Families leave their farms for crowded cities. Children work 14-hour shifts. Kings are toppled.\n\nThinkers looked at the chaos and asked a new question.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'factory',
          poll: 'hook',
          prompt: 'Why do you think sociology was invented in the first place?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Interesting.',
          pollBody: 'Your notes have a memorable one-line answer. You’ll see it in a few screens.',
        },
        {
          type: 'story',
          eyebrow: 'The word',
          title: 'Sociology: the study of associations.',
          body: 'The word joins Latin ==socius== (“companion” or “associate”) and Greek ==logia== (“study of”).\n\nIt was coined by the French philosopher **Auguste Comte**, who called sociology the **apex of all sciences**. He is the **“father of sociology”** and founder of **positive philosophy**.\n\nBut the idea is older than the name: societies have always passed on culture, arts, customs and traditions.',
        },
        {
          type: 'choice',
          eyebrow: 'Warm-up',
          prompt: 'Literally, “sociology” means the study of…',
          options: [
            { text: 'Associations', correct: true, why: 'Socius means companion or associate; logia means study of.' },
            { text: 'The mind', why: 'That’s psychology: psyche + logos.' },
            { text: 'Government', why: 'That’s closer to political science.' },
            { text: 'Ancient cultures', why: 'That’s closer to archaeology or anthropology.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The word: defined.',
          recap: [
            '**Socius** (Latin, companion) + **logia** (Greek, study of) = the study of associations.',
            '**Auguste Comte** coined it: father of sociology, founder of positive philosophy, “apex of all sciences”.',
          ],
          why: 'Comte named it in the 19th century, but why then? Four huge upheavals made it necessary.',
        },
      ],
    },
    {
      name: 'Four upheavals',
      terms: [
        ['Four upheavals', 'Industrial Revolution (Great Britain), French Revolution (1789), the Enlightenment, advances in natural science and technology.'],
        ['Birthed from crises', 'Sociology was “a discipline birthed from social crises to solve social crises.”'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: '18th and 19th centuries',
          title: 'Four upheavals that created sociology',
          body: 'They happened in Great Britain and Western Europe, especially Germany and France.',
          cards: [
            { title: '1. Industrial Revolution', text: 'Began in **Great Britain**. Industrial production replaced farm and craft work.' },
            { title: '2. French Revolution', text: 'The political revolution of **1789**. Republics began replacing monarchies.' },
            { title: '3. The Enlightenment', text: 'A movement of reason and new ideas about people and society.' },
            { title: '4. Science and technology', text: '**Advances in natural science and technology** that showed how powerful systematic methods could be.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'The upheavals changed society, and caused new problems. Sort each into change or problem.',
          buckets: [
            { id: 'c', label: 'Change', hint: 'what the upheavals brought' },
            { id: 'p', label: 'Social problem', hint: 'what followed' },
          ],
          items: [
            { text: 'Industrial production', bucket: 'c', why: '**Industrial production** was one of the big changes.' },
            { text: 'Republics replacing monarchies', bucket: 'c', why: '**Republics replacing monarchies** was a change, from the French Revolution.' },
            { text: 'City life replacing rural life', bucket: 'c', why: '**Urbanisation** was a change.' },
            { text: 'Child labour', bucket: 'p', why: '**Child labour** was one of the social problems.' },
            { text: 'Crime and poverty', bucket: 'p', why: '**Crime and poverty** were social problems.' },
            { text: 'Misery and war', bucket: 'p', why: '**Misery and war** are listed among the problems.' },
          ],
          explain: 'Pioneers wanted to use the methods of the natural sciences to understand and solve these crises.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Your notes call sociology “a discipline birthed from social crises to solve social crises.” What does that mean?',
          options: [
            { text: 'Sociology causes social crises.', why: 'It’s the reverse: the crises came first.' },
            { text: 'It emerged because upheavals created social problems, and pioneers wanted scientific methods to understand and solve them.', correct: true, why: 'The crises created both the need and the purpose.' },
            { text: 'It was only interested in wars.', why: 'War was one problem among many: child labour, crime, poverty, misery.' },
            { text: 'It only studies people in crisis.', why: 'It studies all of society. The crises explain why it began.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The upheavals: clear.',
          recap: [
            '**Industrial Revolution** (Britain), **French Revolution** (1789), **Enlightenment**, **science and technology**.',
            'They brought factories, republics and cities, plus child labour, crime, poverty, misery and war.',
          ],
          why: 'Who were the people who tried to make sense of it all? Meet the six pioneers your exam expects you to know.',
        },
      ],
    },
    {
      name: 'Pioneers',
      terms: [
        ['Pioneers', 'Comte (1798–1857, French), Martineau (1802–1876, British), Marx (1818–1883, German), Spencer (1820–1893, British), Durkheim (1858–1917, French), Weber (1864–1920, German).'],
        ['Durkheim', 'Social facts; the study of Suicide.'],
        ['Weber', 'Social action.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Pioneers',
          prompt: 'Put the six pioneers in order of birth, oldest first.',
          items: [
            'Auguste Comte (1798–1857)',
            'Harriet Martineau (1802–1876)',
            'Karl Marx (1818–1883)',
            'Herbert Spencer (1820–1893)',
            'Émile Durkheim (1858–1917)',
            'Max Weber (1864–1920)',
          ],
          hint: 'Use the birth years in brackets.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Sort the pioneers by nationality.',
          buckets: [
            { id: 'f', label: 'French' },
            { id: 'b', label: 'British' },
            { id: 'g', label: 'German' },
          ],
          items: [
            { text: 'Auguste Comte', bucket: 'f', why: '**Comte** was a French philosopher.' },
            { text: 'Émile Durkheim', bucket: 'f', why: '**Durkheim** was French.' },
            { text: 'Harriet Martineau', bucket: 'b', why: '**Martineau** was British.' },
            { text: 'Herbert Spencer', bucket: 'b', why: '**Spencer** was British.' },
            { text: 'Karl Marx', bucket: 'g', why: '**Marx** was a German philosopher and economic historian.' },
            { text: 'Max Weber', bucket: 'g', why: '**Weber** was German.' },
          ],
          explain: 'Two French, two British, two German. An easy way to remember them in pairs.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which pioneer is linked to “social facts” and a famous study of suicide?',
          options: [
            { text: 'Max Weber', why: 'Weber is linked to social action.' },
            { text: 'Émile Durkheim', correct: true, why: 'Durkheim studied social facts, and his book Suicide showed social patterns in a seemingly individual act.' },
            { text: 'Herbert Spencer', why: 'Spencer isn’t linked to social facts in your notes.' },
            { text: 'Harriet Martineau', why: 'Martineau is listed as a British pioneer, not for social facts.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Pioneers: in place.',
          recap: [
            'French: **Comte, Durkheim**. British: **Martineau, Spencer**. German: **Marx, Weber**.',
            '**Durkheim**: social facts, Suicide. **Weber**: social action.',
          ],
          why: 'Each pioneer defined sociology differently. Before we compare their definitions, we need to know what “society” itself means.',
        },
      ],
    },
    {
      name: 'Definitions',
      terms: [
        ['Society (Stockard 1997)', 'A group in a bounded territory sharing a common way of life (culture).'],
        ['Society (Hobbs & Blank 1975)', 'A large grouping sharing a common culture, with all the institutions needed to meet basic needs.'],
        ['Society (Giddens 1994)', 'A system of interrelationships connecting individuals together.'],
        ['Abraham (1977)', 'Many definitions don’t make sociology vague; they all stress a special way of looking at social behaviour.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'What is society?',
          prompt: 'Three definitions of “society”. Match each to its author.',
          buckets: [
            { id: 's', label: 'Stockard (1997)' },
            { id: 'h', label: 'Hobbs and Blank (1975)' },
            { id: 'g', label: 'Giddens (1994)' },
          ],
          items: [
            { text: 'A group of people in a bounded territory who share a common way of life', bucket: 's', why: '**A bounded territory and a common way of life** is Stockard.' },
            { text: 'A large human grouping with a common culture and all the institutions needed to meet basic needs', bucket: 'h', why: '**Institutions to meet basic needs** is Hobbs and Blank.' },
            { text: 'A system of interrelationships that connects individuals together', bucket: 'g', why: '**A system of interrelationships** is Giddens.' },
          ],
          explain: 'The shared way of life in Stockard’s definition has a name: **culture**.',
        },
        {
          type: 'sort',
          eyebrow: 'Defining sociology',
          prompt: 'Who defined sociology this way?',
          buckets: [
            { id: 'c', label: 'Comte' },
            { id: 'w', label: 'Weber' },
            { id: 'd', label: 'Durkheim' },
            { id: 'g', label: 'Giddens' },
          ],
          items: [
            { text: 'The study of social statics (order) and social dynamics (change)', bucket: 'c', why: '**Statics and dynamics** is Comte.' },
            { text: '“The science of human association”, an abstract science that discovers social laws', bucket: 'c', why: '**Discovering social laws** is Comte’s 1839 and 1851 definition.' },
            { text: 'The interpretive understanding of social action, to reach a causal explanation', bucket: 'w', why: '**Interpretive understanding of social action** is Weber.' },
            { text: 'The study of social facts, explained by other social facts', bucket: 'd', why: '**Social facts** is Durkheim.' },
            { text: 'The scientific study of society and social relationships, based on empirical research', bucket: 'g', why: '**Empirical, scientific study of social relationships** is Giddens.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'For Weber, what turns behaviour into “social action”?',
          options: [
            { text: 'It happens in public.', why: 'Location isn’t the test.' },
            { text: 'The actor attaches subjective meaning to it, and it takes account of other people’s behaviour.', correct: true, why: 'Meaning plus orientation toward others makes it social action.' },
            { text: 'It is recorded in official statistics.', why: 'That’s closer to Durkheim’s social facts.' },
            { text: 'It is done by a group, never an individual.', why: 'An individual can perform social action if it’s meaningful and oriented to others.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Soroka (1992) calls sociology a “debunking science”. What does that mean?',
          options: [
            { text: 'It proves other sciences wrong.', why: 'It’s about looking beneath explanations of social life, not attacking other sciences.' },
            { text: 'It looks beneath official and common-sense explanations, without making value judgements.', correct: true, why: 'Debunking means digging under the surface story, while staying neutral.' },
            { text: 'It only studies lies and rumours.', why: 'It studies all social life.' },
            { text: 'It replaces facts with opinions.', why: 'It does the opposite.' },
          ],
          explain: 'Abraham (1977): having many definitions doesn’t make sociology vague. They all stress **a special way of looking at social behaviour**.',
        },
        {
          type: 'bridge',
          title: 'Definitions: matched.',
          recap: [
            'Society: **Stockard** (shared way of life), **Hobbs and Blank** (institutions for basic needs), **Giddens** (interrelationships).',
            'Sociology: **Comte** (statics and dynamics, social laws), **Weber** (social action), **Durkheim** (social facts), **Soroka** (debunking).',
          ],
          why: 'Let’s test it all on a case.',
        },
      ],
    },
    {
      name: 'Case file',
      screens: [
        {
          type: 'recall',
          poll: 'hook',
          eyebrow: 'Back to the start',
          title: 'Why was sociology invented?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'Remember the line: ==a discipline birthed from social crises to solve social crises.==',
        },
        {
          type: 'story',
          art: 'factory',
          eyebrow: 'Case file',
          title: 'Three researchers, one city',
          body: 'Lagos is growing fast: new estates, packed buses, rising rents, more street hawkers. Three researchers each study it in their own way.\n\nFour questions. Each one asks a little more.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'Researcher A asks: “What keeps Lagos society stable, and what is changing it?” Whose definition is she using?',
          options: [
            { text: 'Comte: social statics and social dynamics', correct: true, why: 'Order (statics) and change (dynamics) is Comte’s definition.' },
            { text: 'Weber: social action', why: 'Weber focuses on the meaning people attach to their actions.' },
            { text: 'Durkheim: social facts', why: 'Durkheim focuses on group-level patterns, studied objectively.' },
            { text: 'Stockard: a definition of society', why: 'Stockard defined society, not sociology.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'Researcher B interviews hawkers to understand what selling in traffic means to them and how they react to each other. Whose approach is this?',
          options: [
            { text: 'Durkheim', why: 'Durkheim would study group patterns objectively, not personal meanings.' },
            { text: 'Weber', correct: true, why: 'Understanding the subjective meaning of action that takes account of others is Weber’s social action.' },
            { text: 'Comte', why: 'Comte looked for social laws.' },
            { text: 'Martineau', why: 'Martineau isn’t linked to this approach in your notes.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'Researcher C compares crime rates across Lagos neighbourhoods and explains them using population density and unemployment rates. Whose approach is this?',
          options: [
            { text: 'Weber’s interpretive understanding', why: 'C isn’t asking what crime means to individuals.' },
            { text: 'Durkheim’s social facts, explained by other social facts', correct: true, why: 'Group-level patterns (crime rates) explained by other group-level patterns (density, unemployment) is Durkheim.' },
            { text: 'Soroka’s debunking with value judgements', why: 'Debunking avoids value judgements, and this isn’t debunking.' },
            { text: 'Comte’s positive philosophy only', why: 'The specific method of explaining social facts with social facts is Durkheim’s.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Lagos’s rapid change looks a lot like the 19th-century upheavals. Which parallels hold, according to your notes?',
          options: [
            { text: 'Rural life giving way to city life', correct: true, why: '**Urbanisation** was one of the 19th-century changes.' },
            { text: 'New social problems like crime and poverty', correct: true, why: '**Crime and poverty** followed the upheavals.' },
            { text: 'A need to use scientific methods to understand and solve problems', correct: true, why: '**Using natural-science methods** on social crises is why sociology began.' },
            { text: 'Republics being replaced by monarchies', why: '**It went the other way**: republics replaced monarchies.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know where sociology came from.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
