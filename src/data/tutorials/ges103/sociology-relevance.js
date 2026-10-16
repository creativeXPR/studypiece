// GES 103 · Chapter 5 · Lesson 3: focus of sociology, levels of analysis, relevance (notes 5.8–5.9).

const HOOK = [
  ['Nothing. It’s purely personal', 'Durkheim disagrees', 'Suicide rates differ between countries and groups in stable patterns. Society shapes even this act.'],
  ['A little, through family pressure', 'On the right track', 'Family ties are one form of integration into groups, Durkheim’s key factor.'],
  ['A lot. Society shapes it', 'Durkheim’s finding', 'The degree of integration into social groups affects suicide rates.'],
  ['It depends only on biology', 'Not sociology’s answer', 'Sociology looks for social causes, beyond individual biology.'],
];

export default {
  id: 'sociology-relevance',
  title: 'What sociologists study, and why',
  covers: 'Social interaction, Durkheim’s Suicide, levels of analysis, relevance',
  minutes: 13,
  sections: [
    {
      name: 'The focus',
      terms: [
        ['Social interaction', 'The focal point of sociology (Hobbs and Blank 1975): behaviour between two or more people that is given meaning.'],
        ['Durkheim’s Suicide (1897)', 'Even an “individual” act is shaped by social factors; key factor: degree of integration into social groups.'],
        ['Units of interaction', 'Social groups, social relationships (roles, dyads), social organisations, territorial organisations.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Chapter 5 · Lesson 3',
          title: 'What sociologists study, and why',
          body: 'Some things feel completely personal: falling in love, choosing a course, even taking one’s own life.\n\nIn 1897, Émile Durkheim set out to show that even the most personal act follows social patterns.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          poll: 'hook',
          prompt: 'How much do you think society influences whether someone takes their own life?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'A sensitive question. Thanks for answering.',
          pollBody: 'Durkheim’s answer changed the subject. We’ll look at it shortly, and come back to yours.',
        },
        {
          type: 'story',
          eyebrow: 'The focus',
          title: 'Sociology’s focal point is social interaction.',
          body: 'Hobbs and Blank (1975): ==behaviour between two or more people that is given meaning==.\n\nUnlike psychology, which focuses on the individual, sociology studies individual behaviour **only as part of wider patterns**.',
        },
        {
          type: 'custom',
          widget: 'durkheim',
          eyebrow: 'Durkheim’s Suicide (1897)',
          title: 'Predict, then reveal.',
          body: 'Durkheim compared suicide rates between groups and countries. Make a prediction for each pair.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Sociologists study four units of interaction. Place each example.',
          buckets: [
            { id: 'g', label: 'Social groups' },
            { id: 'r', label: 'Social relationships' },
            { id: 'o', label: 'Social organisations' },
            { id: 't', label: 'Territorial organisations' },
          ],
          items: [
            { text: 'A family', bucket: 'g', why: '**The family** is a social group.' },
            { text: 'Your circle of close friends (peer group)', bucket: 'g', why: '**Peer groups** are social groups.' },
            { text: 'Roles, like lecturer and student', bucket: 'r', why: '**Roles** are social relationships.' },
            { text: 'A dyad: a pair, such as two best friends', bucket: 'r', why: '**Dyads** are social relationships.' },
            { text: 'Governments, corporations and schools', bucket: 'o', why: '**Governments, corporations and schools** are social organisations.' },
            { text: 'A community', bucket: 't', why: '**Communities** are territorial organisations.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The focus: set.',
          recap: [
            'Sociology’s focal point is **social interaction**: meaningful behaviour between two or more people.',
            '**Durkheim’s Suicide (1897)**: even an individual act follows social patterns. Key factor: integration into groups.',
          ],
          why: 'Durkheim worked with national statistics. Others study a single conversation. These are different levels of analysis.',
        },
      ],
    },
    {
      name: 'Levels & areas',
      terms: [
        ['Macro-sociology', 'Large-scale phenomena (class, structure, population); statistics and empirical studies.'],
        ['Micro-sociology', 'Face-to-face interaction; small-scale, interpretive; used by symbolic interactionists.'],
        ['Meso level', 'In between micro and macro (some scholars).'],
        ['Areas of focus', 'Social organisation and order, social control, social change, social processes, social groups, social problems.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Levels of analysis',
          title: 'Zoomed out, zoomed in, and in between',
          cards: [
            { title: 'Macro-sociology', text: '**Large-scale** phenomena: social class, group relations, social structure, population. Uses **statistical analysis** and empirical studies.' },
            { title: 'Micro-sociology', text: '**Face-to-face** interaction and interpersonal relationships. Small-scale, **interpretive** methods; used by **symbolic interactionists**.' },
            { title: 'Meso level', text: '**In between** micro and macro, according to some scholars.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Macro or micro? Sort each study.',
          buckets: [
            { id: 'M', label: 'Macro', hint: 'large-scale' },
            { id: 'm', label: 'Micro', hint: 'face-to-face' },
          ],
          items: [
            { text: 'How social class shapes university admission across Nigeria', bucket: 'M', why: '**Class across a whole country** is macro.' },
            { text: 'Population growth and its effect on housing nationwide', bucket: 'M', why: '**Population** is a macro topic.' },
            { text: 'How two roommates negotiate sharing a small room', bucket: 'm', why: '**A face-to-face relationship** is micro.' },
            { text: 'How a lecturer and students interact during a tutorial', bucket: 'm', why: '**Interaction in one room** is micro.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Areas of focus',
          prompt: 'Which area of sociology does each topic belong to?',
          buckets: [
            { id: 'c', label: 'Social control', hint: 'keeping order' },
            { id: 'ch', label: 'Social change', hint: 'how society shifts' },
            { id: 'p', label: 'Social problems', hint: 'social pathologies' },
          ],
          items: [
            { text: 'How hall residents pressure each other to keep quiet hours', bucket: 'c', why: '**Members influencing each other to keep order** is social control.' },
            { text: 'How mobile phones changed courtship', bucket: 'ch', why: '**An invention reshaping behaviour** is social change.' },
            { text: 'How a social movement changes laws', bucket: 'ch', why: '**Movements** are one of the drivers of social change.' },
            { text: 'Delinquency, addiction and urban poverty', bucket: 'p', why: '**These** are listed among social problems.' },
          ],
          explain: 'Social change comes through **inventions, cultural diffusion, conflict and movements**.',
        },
        {
          type: 'bridge',
          title: 'Levels and areas: mapped.',
          recap: [
            '**Macro** (large-scale, statistics), **micro** (face-to-face, interpretive), **meso** (in between).',
            'Areas: organisation and order, **control**, **change**, processes, groups, **problems**.',
          ],
          why: 'So what’s the point of all this? Your notes list ten ways sociology is relevant, and one that matters most.',
        },
      ],
    },
    {
      name: 'Relevance',
      terms: [
        ['No “human nature” (Ogunbameru)', 'How we think, feel and behave is shaped by socialisation.'],
        ['Peter Berger (1966)', 'Invitation to Sociology: our situation is socially constructed, not natural or inevitable.'],
        ['Most significant relevance', 'Sociology brought science to the study of society.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Relevance',
          title: 'Why sociology matters',
          body: 'Ten reasons, grouped into three.',
          cards: [
            { title: 'Understand yourself', text: 'Culture and **socialisation** shape you. Ogunbameru: there is **no such thing as “human nature.”** Giddens: **self-enlightenment** helps us influence society and respond to policy.' },
            { title: 'Understand society', text: '**Berger** (Invitation to Sociology, 1966): our situation is **socially constructed**, not natural or inevitable. Understand structures like class, race, family, economy and religion.' },
            { title: 'Change society', text: 'Solve social problems (Zerihun 2005), inform social policy, help with international conflict, open careers, and keep us up to date: Giddens’s “**social adequacy**”.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Berger described women in a Cairo community who saw some illnesses as “fatal”: fated and unavoidable. What point was he making?',
          options: [
            { text: 'Illness is always fatal in Egypt.', why: 'It’s about how people understood illness, not medical fact.' },
            { text: 'What seems natural or inevitable is often socially constructed.', correct: true, why: 'Their belief that nothing could be done was itself a social product, and sociology lets us see that.' },
            { text: 'Women should not see doctors.', why: 'That’s not the point at all.' },
            { text: 'Religion causes illness.', why: 'Berger is talking about social construction, not causes of illness.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Sociology opens careers. Your notes also name two applied branches. Sort them.',
          buckets: [
            { id: 'c', label: 'Careers' },
            { id: 'a', label: 'Applied branches' },
          ],
          items: [
            { text: 'Social work', bucket: 'c', why: '**Social work** is a listed career.' },
            { text: 'Personnel / HR', bucket: 'c', why: '**HR** is a listed career.' },
            { text: 'Community planning', bucket: 'c', why: '**Community planning** is a listed career.' },
            { text: 'Industrial sociology (in engineering)', bucket: 'a', why: '**Industrial sociology** applies sociology to engineering and industry.' },
            { text: 'Rural sociology (in agriculture)', bucket: 'a', why: '**Rural sociology** applies sociology to agriculture.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Of all ten, which do your notes call the most significant relevance of sociology?',
          options: [
            { text: 'It provides careers in HR.', why: 'Useful, but not the most significant.' },
            { text: 'It brought science to the study of society.', correct: true, why: 'That’s the notes’ answer, and it ties back to Comte’s positivism.' },
            { text: 'It helps with international problems.', why: 'Important, but not named as the most significant.' },
            { text: 'It keeps us updated on modern situations.', why: 'That’s Giddens’s social adequacy, not the top point.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Relevance: established.',
          recap: [
            'Understand yourself (**no human nature**; self-enlightenment), society (**Berger**: socially constructed), and solve problems.',
            'Most significant: sociology **brought science to the study of society**.',
          ],
          why: 'Final case: use every part of Chapter 5.',
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
          title: 'How much does society shape suicide?',
          body: 'Here’s how Durkheim would answer each response from the start.',
          rows: HOOK,
          after: 'Durkheim’s lesson: look for **social** causes, even behind the most personal acts. If you or someone you know is struggling, talking to someone you trust, or a counsellor, really helps.',
        },
        {
          type: 'story',
          eyebrow: 'Case file',
          title: 'Loneliness on campus',
          body: 'Your university counselling unit notices more first-year students reporting loneliness. They ask the sociology department to study it.\n\nFour questions. The last brings the chapter together.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'One team compares loneliness rates across all hostels using survey statistics. Which level of analysis is this?',
          options: [
            { text: 'Micro', why: 'Micro studies face-to-face interaction in small settings.' },
            { text: 'Macro', correct: true, why: 'Rates across a whole population, using statistics, is macro analysis.' },
            { text: 'Meso, because hostels are buildings', why: 'Meso sits between, but statistical rates across a population are classically macro.' },
            { text: 'Not sociology', why: 'It’s a classic sociological study.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'They find first-years who joined a fellowship, club or study group report less loneliness. Whose classic finding does this echo?',
          options: [
            { text: 'Weber’s social action', why: 'Weber focuses on meaning, not integration rates.' },
            { text: 'Durkheim’s integration into social groups', correct: true, why: 'Belonging to groups protecting people is Durkheim’s key factor from Suicide.' },
            { text: 'Comte’s social statics', why: 'Statics is about order and what persists, not group membership.' },
            { text: 'Mills’s armchair method', why: 'Mills didn’t have an armchair method. Armchair sociology is what sociologists avoid.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'A second team sits in on hostel common rooms and records how new students start (or fail to start) conversations. Which level, and which theorists favour it?',
          options: [
            { text: 'Macro, used by demographers', why: 'Watching individual conversations is small-scale.' },
            { text: 'Micro, with interpretive methods favoured by symbolic interactionists', correct: true, why: 'Face-to-face interaction studied interpretively is micro-sociology.' },
            { text: 'Macro, with statistical methods', why: 'There are no statistics here, just close observation.' },
            { text: 'Psychology, because it’s about individuals', why: 'They’re studying interaction between people, which is sociology’s focus.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'The university uses the findings to fund more student clubs. Which forms of sociology’s relevance does this show?',
          options: [
            { text: 'Solving social problems', correct: true, why: '**Loneliness** is a social problem being addressed.' },
            { text: 'Informing social policy', correct: true, why: '**Funding clubs** is a policy based on research.' },
            { text: 'Bringing science to the study of society', correct: true, why: '**Using surveys and observation** instead of guesses is science applied to society.' },
            { text: 'Proving “human nature” is fixed', why: '**Ogunbameru says there’s no such thing as human nature.** Behaviour is shaped by socialisation.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 5 complete.',
          body: 'You know what sociology studies, at what levels, and why it matters. Key terms below.',
        },
      ],
    },
  ],
};
