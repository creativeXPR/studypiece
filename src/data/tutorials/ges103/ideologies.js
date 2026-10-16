// GES 103 · Chapter 2 · Lesson 4: ideology, elite behaviour, other forms, Nigeria's military rulers (notes 2.10–2.13).

const HOOK = [
  ['A presidential democracy', 'Correct, but only one label', 'That describes how Nigeria’s organs relate and who rules. There are more criteria.'],
  ['A federal state', 'Correct, but only one label', 'That describes where power sits. There are more criteria.'],
  ['A capitalist country', 'Correct, but only one label', 'That describes the ideology. There are more criteria.'],
  ['All of the above', 'The notes’ answer', 'Most countries combine forms. Nigeria today = a federal, capitalist, presidential democracy.'],
];

export default {
  id: 'ideologies',
  title: 'Ideologies and other forms',
  covers: 'Capitalism, socialism, communism, Lijphart, fascism to militarism, Nigeria’s military heads of state',
  minutes: 15,
  sections: [
    {
      name: 'Ideology',
      terms: [
        ['Capitalism', 'Private ownership of the means of production, distribution and exchange; prices and markets. USA, Canada, Germany, Japan.'],
        ['Socialism', 'Essential industries publicly owned and controlled by the state for equal opportunity. USSR 1917, China 1949, Cuba 1959.'],
        ['Communism', 'Marx and Engels: workers’ revolution, community ownership, classless society in theory; an advanced stage of socialism.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'assembly',
          eyebrow: 'Chapter 2 · Lesson 4',
          title: 'Ideologies and other forms',
          body: 'Your exam asks you to classify Nigeria. You know it has a President. You know it has 36 states.\n\nBut is that the full answer?',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          poll: 'hook',
          prompt: 'How would you classify Nigeria’s government today?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Hold that thought.',
          pollBody: 'There’s a precise answer in your notes. By the end of this lesson you’ll be able to build it yourself.',
        },
        {
          type: 'reveal',
          eyebrow: 'State ideology',
          title: 'Three ideologies',
          cards: [
            { title: 'Capitalism', text: '**Private ownership** of the means of production, distribution and exchange; prices and markets. European origins, peaked in the 19th century, unchallenged until World War I. Promotes freedom and multi-party systems.' },
            { title: 'Socialism', text: 'Essential industries **publicly owned and controlled by the state** for equal opportunity and benefit. Lenin: workers receive the full product of their labour.' },
            { title: 'Communism', text: 'Doctrine of **Karl Marx and Friedrich Engels**: overthrow capitalism through workers’ revolution; the community owns property. Theory: a **classless society**. Practice: coercive, authoritarian regimes.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Capitalism, socialism or communism? Sort each statement.',
          buckets: [
            { id: 'k', label: 'Capitalism' },
            { id: 's', label: 'Socialism' },
            { id: 'c', label: 'Communism' },
          ],
          items: [
            { text: 'Prices are set by markets, and businesses are privately owned.', bucket: 'k', why: '**Markets and private ownership** are capitalism.' },
            { text: 'USA, Canada, Germany and Japan', bucket: 'k', why: '**These four** are the notes’ capitalist examples.' },
            { text: 'The state owns essential industries for equal opportunity.', bucket: 's', why: '**State ownership of essential industries** is socialism.' },
            { text: 'Remnants today: Cuba, Vietnam, Tanzania', bucket: 's', why: '**Cuba, Vietnam and Tanzania** are listed as socialist remnants.' },
            { text: 'Overthrow capitalism through a workers’ revolution.', bucket: 'c', why: '**Workers’ revolution** is the communist doctrine of Marx and Engels.' },
            { text: 'A classless society, at least in theory', bucket: 'c', why: '**The classless society** is communism’s goal.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Apply it',
          prompt: 'Put these socialist states in the order they began.',
          items: [
            'USSR, after the Bolshevik revolution (1917)',
            'Albania (1944)',
            'North Korea (1948)',
            'China (1949)',
            'Cuba (1959)',
            'Cambodia and Laos (1975)',
          ],
          hint: 'The years are in brackets. Start with 1917.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Your notes say Britain sits “midway between capitalism and socialism”. Why?',
          options: [
            { text: 'Because Britain has a monarch.', why: 'Monarchy is about who rules, not ideology.' },
            { text: 'Because it is a welfare state: a market economy with strong public provision.', correct: true, why: 'Private markets plus public welfare puts Britain between the two.' },
            { text: 'Because it was communist after 1991.', why: 'Britain was never communist.' },
            { text: 'Because it has two chambers in Parliament.', why: 'Bicameralism has nothing to do with ideology.' },
          ],
          explain: 'Communism is an **advanced stage of socialism**. After the USSR collapsed in 1991, leftover parties became **neo-communist** parties.',
        },
        {
          type: 'bridge',
          title: 'Ideology: placed.',
          recap: [
            '**Capitalism**: private ownership and markets. **Socialism**: state owns essential industries.',
            '**Communism**: Marx and Engels, workers’ revolution, classless in theory, authoritarian in practice. Britain is midway.',
          ],
          why: 'Ideology is about the economy. Arend Lijphart looked at something else: how a country’s elites behave toward each other.',
        },
      ],
    },
    {
      name: 'Elites & other forms',
      terms: [
        ['Lijphart’s types', 'Consociational, de-politicised, centripetal and centrifugal democracy, from elite behaviour and society.'],
        ['Fascism', 'Dictatorship, central control of private enterprise, repression, terror, extreme nationalism. Mussolini, Hitler.'],
        ['Totalitarianism', 'All of life subordinated to the rulers; a dictator controlling a party. Stalin, Mao, Kim Il Sung.'],
        ['Theocracy', '“Government by a god”: laws seen as divine, clergy rule.'],
        ['Militarism', 'Rule by the armed forces through decrees and edicts. Nigeria from 15 January 1966.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Arend Lijphart',
          title: 'Elites can cooperate or fight. Societies can be united or divided.',
          body: 'Combine the two and you get four types of democracy.',
          cards: [
            { title: 'Consociational', text: 'Brings the **elites of different groups together**.' },
            { title: 'De-politicised', text: 'Based on **agreement on basic things**.' },
            { title: 'Centripetal', text: 'The **centre pools all groups together**.' },
            { title: 'Centrifugal', text: 'Groups each try to **pull the centre to themselves**.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'In a divided country, every ethnic party tries to drag the national government toward its own region. Which of Lijphart’s types is this?',
          options: [
            { text: 'Consociational', why: 'Consociational democracy brings elites together. Here they pull apart.' },
            { text: 'Centripetal', why: 'Centripetal means the centre pools groups together.' },
            { text: 'Centrifugal', correct: true, why: 'Each group pulling the centre toward itself is centrifugal democracy.' },
            { text: 'De-politicised', why: 'De-politicised democracy rests on agreement on basics, which is missing here.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Other forms',
          prompt: 'Your notes list six other forms of government. Match each description.',
          buckets: [
            { id: 'fa', label: 'Fascism' },
            { id: 'fe', label: 'Feudalism' },
            { id: 'th', label: 'Theocracy' },
            { id: 'to', label: 'Totalitarianism' },
            { id: 'co', label: 'Colonialism' },
            { id: 'mi', label: 'Militarism' },
          ],
          items: [
            { text: 'Extreme nationalism and terror; Mussolini’s Italy (1922)', bucket: 'fa', why: '**Mussolini and extreme nationalism** point to fascism.' },
            { text: 'Power comes from control of land; Western European nobility', bucket: 'fe', why: '**Power from land tenure** is feudalism.' },
            { text: '“Government by a god”: clergy rule; Khomeini’s Iran', bucket: 'th', why: '**Clergy ruling by divine law** is theocracy.' },
            { text: 'All social, economic and spiritual life subordinated to the rulers; Stalin’s USSR', bucket: 'to', why: '**Total control of every part of life** is totalitarianism.' },
            { text: 'One country takes political control of another, often by force', bucket: 'co', why: '**Foreign political control** is colonialism.' },
            { text: 'Rule by the armed forces through decrees and edicts', bucket: 'mi', why: '**Rule by decree from the military** is militarism.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'What separates totalitarianism from an ordinary dictatorship, according to your notes?',
          options: [
            { text: 'Totalitarian rulers are always elected.', why: 'They’re not.' },
            { text: 'It subordinates all social, economic, cultural and spiritual life to the rulers: a higher form of despotism.', correct: true, why: 'Total control of every sphere of life, usually through a dictator controlling a party, is what makes it totalitarian.' },
            { text: 'It only controls the army.', why: 'It controls far more than the army.' },
            { text: 'It allows many political parties.', why: 'It typically allows one party only.' },
          ],
          note: 'Your notes list Egypt, Ethiopia and Liberia as never colonised. **Egypt** was under British control (a protectorate from 1882 to 1922), so the usual answer is **Ethiopia and Liberia**. Give the textbook answer in this course’s exam if asked.',
        },
        {
          type: 'bridge',
          title: 'Elites and other forms: covered.',
          recap: [
            'Lijphart: **consociational, de-politicised, centripetal, centrifugal**.',
            'Other forms: **fascism, feudalism, theocracy, totalitarianism, colonialism, militarism**.',
          ],
          why: 'Militarism isn’t abstract for Nigeria. From 1966 to 1999, it was ruled by soldiers for most years. Your exam expects you to know who ruled when.',
        },
      ],
    },
    {
      name: 'Nigeria’s military era',
      terms: [
        ['Nigeria’s military heads of state', 'Ironsi, Gowon, Murtala Mohammed, Obasanjo, Buhari, Babangida, Abacha, Abubakar.'],
        ['Nigeria today', 'A federal, capitalist, presidential democracy. Most countries combine forms.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Militarism in Nigeria',
          prompt: 'Put Nigeria’s military heads of state in order, from the first coup in 1966 to the return to civilian rule in 1999.',
          items: [
            'J.T.U. Aguiyi-Ironsi (Jan 1966 – July 1966)',
            'Yakubu Gowon (29 July 1966 – 1975)',
            'Murtala Ramat Mohammed (1975 – 13 Feb 1976)',
            'Olusegun Obasanjo (1976 – 1 Oct 1979)',
            'Muhammadu Buhari (31 Dec 1983 – 27 Aug 1985)',
            'Ibrahim Badamasi Babangida (1985 – 27 Aug 1993)',
            'Sani Abacha (Nov 1993 – 8 June 1998)',
            'Abdulsalami Abubakar (1998 – 29 May 1999)',
          ],
          hint: 'Use the dates in brackets. Ironsi toppled Tafawa Balewa in January 1966.',
          explain: 'Note the gap between 1979 and 1983: civilian rule under the Second Republic, ended by Buhari’s coup.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Who handed power to a civilian government on 1 October 1979?',
          options: [
            { text: 'Yakubu Gowon', why: 'Gowon was removed in 1975.' },
            { text: 'Murtala Mohammed', why: 'Murtala was killed in February 1976.' },
            { text: 'Olusegun Obasanjo', correct: true, why: 'Obasanjo handed over on 1 October 1979, starting the Second Republic.' },
            { text: 'Abdulsalami Abubakar', why: 'Abubakar handed over on 29 May 1999.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Your notes say most forms (aristocracy, oligarchy, fascism, feudalism, theocracy, colonialism and others) are now largely antiquated. What do most countries do instead?',
          options: [
            { text: 'Pick one pure form and stick to it.', why: 'The notes say the opposite.' },
            { text: 'Combine forms across the different criteria.', correct: true, why: 'A single country can be federal, capitalist and presidential all at once.' },
            { text: 'Return to Aristotle’s six forms only.', why: 'Aristotle’s scheme is just one of six criteria.' },
            { text: 'Avoid having any government type.', why: 'Every state has some form of government.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The military era: in order.',
          recap: [
            'Ironsi → Gowon → Murtala → Obasanjo → (civilian 1979–83) → Buhari → Babangida → Abacha → Abubakar.',
            'Most countries **combine forms**. Many classic forms are now antiquated.',
          ],
          why: 'Last step: classify a country across every criterion at once, the way your exam expects.',
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
          title: 'So how do you classify Nigeria?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'The full answer from your notes: Nigeria today is a ==federal, capitalist, presidential democracy==.',
        },
        {
          type: 'story',
          eyebrow: 'Case file',
          title: 'Classify three countries',
          body: 'Your exam often describes a country and asks you to classify it. Here are three. Use every criterion from Chapter 2.\n\nFour questions. The last combines everything.',
          cta: 'Open the case',
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'Which labels together describe Nigeria today, according to your notes?',
          options: [
            { text: 'Federal', correct: true, why: '**Federal**: power divided between the FG, 36 states, 774 LGAs and the FCT.' },
            { text: 'Capitalist', correct: true, why: '**Capitalist** is Nigeria’s ideology in the notes.' },
            { text: 'Presidential', correct: true, why: '**Presidential**: one person is head of state and head of government.' },
            { text: 'Democracy', correct: true, why: '**Democracy**: government through elected representatives.' },
            { text: 'Confederal', why: '**Nigeria’s states are not sovereign**, so it isn’t confederal.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'Country A: the clergy make laws they say come from God, and a single religious leader has the final say. What form is this?',
          options: [
            { text: 'Fascism', why: 'Fascism is defined by extreme nationalism and central control of enterprise, not divine law.' },
            { text: 'Theocracy', correct: true, why: 'Laws seen as divine and clergy in charge: “government by a god”.' },
            { text: 'Feudalism', why: 'Feudalism rests on control of land.' },
            { text: 'Polity', why: 'Polity is rule by many for all.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'Country B: soldiers seized power, suspended the constitution and now rule by decree. Which form is this, and which Chapter 2 idea explains why it’s illegal?',
          options: [
            { text: 'Militarism; a coup is always illegal because it suspends the constitution that created the army.', correct: true, why: 'Rule by the armed forces through decrees is militarism, and the coup that started it is illegal for exactly this reason.' },
            { text: 'Theocracy; soldiers claim divine authority.', why: 'Nothing here is religious.' },
            { text: 'Confederalism; the regions are sovereign.', why: 'That’s about power distribution, not who seized power.' },
            { text: 'Parliamentary; soldiers sit in parliament.', why: 'Military rule usually removes the legislature first.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Country C: a President who heads both state and government; a constitution that divides power with regions; private businesses and markets; elected leaders. Which labels fit?',
          options: [
            { text: 'Presidential', correct: true, why: '**One person heading state and government** is presidential.' },
            { text: 'Federal', correct: true, why: '**A constitution dividing power with regions** is federal.' },
            { text: 'Capitalist', correct: true, why: '**Private businesses and markets** are capitalism.' },
            { text: 'Democracy', correct: true, why: '**Elected leaders** make it a democracy.' },
            { text: 'Unitary', why: '**Power divided with the regions** rules out unitary.' },
          ],
          explain: 'Country C has the same classification as Nigeria. That’s how you answer “classify this country” in the exam: one label per criterion.',
        },
        {
          type: 'finish',
          title: 'Chapter 2 complete.',
          body: 'You can now classify any government on every criterion. Key terms below.',
        },
      ],
    },
  ],
};
