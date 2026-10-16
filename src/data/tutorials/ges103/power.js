// GES 103 · Chapter 1 · Lesson 2: power, influence, authority, legitimacy (notes 1.9).

const HOOK = [
  ['He can report us and get us punished', 'Power (domination)', 'An explicit command, backed by the threat of sanctions.'],
  ['It’s his job. Hall rules give him the right', 'Legal-rational authority', 'People obey the office and the written rules.'],
  ['Everyone respects Baba Bello', 'Charismatic authority', 'Obedience rests on the person’s own qualities.'],
  ['That’s just how it has always been in this hall', 'Traditional authority', 'Obedience rests on custom.'],
];

export default {
  id: 'power',
  title: 'Who’s really in charge?',
  covers: 'Power, influence, authority, legitimacy',
  minutes: 12,
  sections: [
    {
      name: 'Power',
      terms: [
        ['Power', 'A gets B to do what B would not otherwise do.'],
        ['Force', 'Physical manipulation: assault, confinement.'],
        ['Domination', 'Explicit command or request. Also called controlling power.'],
        ['Manipulation', 'Influence without stating the wish, through symbols. Major form: propaganda.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'hall',
          eyebrow: 'Chapter 1 · Lesson 2',
          title: 'Who’s really in charge?',
          body: 'It’s election week in your hall of residence. Posters are going up, the hall WhatsApp group won’t stop buzzing, and everyone suddenly has opinions about who should run things.\n\nBefore Friday’s vote, let’s work out what it actually means to be in charge.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'porter',
          poll: 'hook',
          prompt: 'Mr. Bello, the hall porter, announces lights out in the common room by midnight. 300 students obey. Why?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Hold that thought.',
          pollBody: 'Political scientists have a name for every one of those answers. By the end of this lesson you’ll know all four, and we’ll come back to yours.',
        },
        {
          type: 'story',
          art: 'powerAB',
          eyebrow: 'Power',
          title: 'A has power over B if A can get B to do something B would not otherwise do.',
          body: 'Read the last part again: ==would not otherwise do==. Power is measured by the change it causes. If B was going to do it anyway, no power was used.',
        },
        {
          type: 'choice',
          eyebrow: 'Warm-up',
          prompt: 'Seyi had already decided to vote for Bisi. Tolu tells Seyi, “Vote for Bisi.” On Friday, Seyi votes for Bisi. Did Tolu exercise power over Seyi?',
          options: [
            { text: 'Yes. Seyi did exactly what Tolu said.', why: 'Doing what someone says isn’t enough. Ask whether Seyi’s behaviour actually changed.' },
            { text: 'No. Seyi would have voted for Bisi anyway.', correct: true, why: 'Seyi’s vote didn’t change, so Tolu’s words had no effect. No change, no power.' },
            { text: 'Only if Tolu is older than Seyi.', why: 'Age isn’t part of the definition. Power is about getting B to do what B would not otherwise do.' },
            { text: 'Yes, because they are friends.', why: 'Friendship doesn’t create power by itself. What matters is whether Seyi’s behaviour changed.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Power',
          title: 'Power comes in three forms',
          body: 'Open each card. You’ll need these on the next screen.',
          cards: [
            { icon: 'force', title: 'Force', text: 'Physical manipulation: assault, confinement, blocking someone’s way.' },
            { icon: 'domination', title: 'Domination', text: 'An explicit command or request: “Do this.” Also called **controlling power**.' },
            { icon: 'manipulation', title: 'Manipulation', text: 'Shaping behaviour without saying what you want, often through symbols. **Propaganda** is its major form.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it · Campaign week',
          prompt: 'Campaign week gets messy. Sort each scene by the form of power being used.',
          buckets: [
            { id: 'f', label: 'Force', hint: 'physical' },
            { id: 'd', label: 'Domination', hint: 'explicit command' },
            { id: 'm', label: 'Manipulation', hint: 'hidden, through symbols' },
          ],
          items: [
            { text: 'Thugs lock a rival’s supporters in a room until voting closes.', bucket: 'f', why: '**Locking people in a room** is confinement, which is physical: force.' },
            { text: 'Security physically blocks a student from entering the voting hall.', bucket: 'f', why: '**Blocking a student’s way** acts on their body: force.' },
            { text: 'The Hall Warden orders: “All posters off the walls by 6 pm.”', bucket: 'd', why: '**The Warden’s order** states exactly what he wants. An explicit command is domination.' },
            { text: 'The electoral committee announces: “Nomination forms must be in by Friday.”', bucket: 'd', why: '**The committee’s announcement** is an explicit instruction: domination.' },
            { text: 'A candidate’s flyer shows him beside a famous alumnus, hinting at an endorsement that never happened.', bucket: 'm', why: '**The flyer** never says “vote for me because of him”. The photo does the work. Using symbols is manipulation.' },
            { text: 'A campaign team floods the hall WhatsApp group with memes painting a rival as anti-student.', bucket: 'm', why: '**The memes** are propaganda that never states its aim: the major form of manipulation.' },
          ],
          explain: 'Force acts on bodies. Domination says what it wants. Manipulation hides what it wants.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which form of power can work without the target ever being told what you want?',
          options: [
            { text: 'Force', why: 'Force is physical. The target knows exactly what is being done to them.' },
            { text: 'Domination', why: 'Domination is explicit: the command is stated out loud.' },
            { text: 'Manipulation', correct: true, why: 'Manipulation influences behaviour without making the wish explicit. That’s why propaganda is its major form.' },
            { text: 'None of them. Power always has to be explicit.', why: 'One of the three forms works precisely by staying hidden.' },
          ],
        },
        {
          type: 'bridge',
          title: 'You’ve got power down.',
          recap: [
            '**Power**: A gets B to do something B would not otherwise do.',
            '**Force** acts on bodies, **domination** says what it wants, **manipulation** hides what it wants.',
          ],
          why: 'Not everyone who changes what you do can punish you. A popular senior can get you to try a new jollof spot with no threat at all. That’s a different idea: influence.',
        },
      ],
    },
    {
      name: 'Influence',
      terms: [
        ['Influence', 'A relationship without sanctions, coercion or force.'],
        ['Manifest influence', 'Explicit: A’s action directly changes B’s behaviour.'],
        ['Potential influence', 'Implicit: indirect or unspoken influence.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'venn',
          eyebrow: 'Influence',
          title: 'Influence is a relationship without sanctions, coercion or force.',
          body: 'Your notes put it this way: ==power implies influence, but influence does not imply force.== Here’s how the two fit together.',
        },
        {
          type: 'reveal',
          eyebrow: 'Influence',
          title: 'Influence comes in two types',
          cards: [
            { icon: 'manifest', title: 'Manifest (explicit)', text: 'A’s action directly changes B’s behaviour. Your course rep says “Wear white on Friday,” and the class shows up in white.' },
            { icon: 'potential', title: 'Potential (implicit)', text: 'Indirect or unspoken influence. Example from your notes: the National Assembly weighing a group’s interests before passing a law.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Before passing a new ₦1,500 sports levy, the SUG quietly considers how the faculty reps will react, though no rep has said a word. What do the reps have here?',
          options: [
            { text: 'Manifest influence', why: 'In manifest influence, A’s action directly changes B’s behaviour. The reps haven’t done or said anything yet.' },
            { text: 'Potential influence', correct: true, why: 'The reps shape the decision without acting at all. Their influence is indirect and unspoken, just like the National Assembly example.' },
            { text: 'Force', why: 'Nobody is being physically made to do anything.' },
            { text: 'Domination', why: 'Domination needs an explicit command. No rep has given one.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Think deeper',
          prompt: 'Which of these are influence without power?',
          options: [
            { text: 'Your roommate’s glowing review makes you try a new barber.', correct: true, why: '**The roommate’s review** changes your behaviour with no sanction attached: influence without power.' },
            { text: 'The Warden says anyone who misses the hall meeting will be fined.', why: '**The Warden’s fine** is a sanction. Influence backed by a sanction is power.' },
            { text: 'The SUG president’s speech convinces you to register to vote, and nothing happens if you don’t.', correct: true, why: '**The SUG speech** persuades without any penalty: influence without power.' },
            { text: 'A lecturer announces that late submissions will score zero.', why: '**The zero for late work** is a sanction, so this is power (and also influence).' },
          ],
          explain: 'The test is simple: is there a sanction? If yes, it’s power. If no, it’s influence alone.',
        },
        {
          type: 'bridge',
          title: 'Influence: understood.',
          recap: [
            '**Influence** works without sanctions or force. Power implies influence, but influence does not imply force.',
            '**Manifest** influence is direct and explicit. **Potential** influence is indirect and unspoken.',
          ],
          why: 'Power and influence explain how people get others to act. But why do people obey some leaders willingly, without fear? That’s authority.',
        },
      ],
    },
    {
      name: 'Authority',
      terms: [
        ['Authority', 'Obedience because people believe you have the right to direct them.'],
        ['Traditional', 'Rests on custom and tradition (monarch, chief).'],
        ['Charismatic', 'Rests on extraordinary personal qualities. Followers: disciples.'],
        ['Legal (rational-legal)', 'Rests on the supremacy of law and the constitution.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Authority',
          title: 'Authority is a superior form of power.',
          body: 'With authority, people act because they **believe you have the right** to direct them, not because they fear you.\n\nYour notes describe it as a chain: ==Authority → respect → legitimacy → power==.\n\nThe sociologist **Max Weber** said people grant authority for three different reasons.',
        },
        {
          type: 'reveal',
          eyebrow: 'Max Weber’s classification',
          title: 'Three types of authority',
          cards: [
            { icon: 'traditional', title: 'Traditional', text: 'Rests on the sanctity of **custom and tradition**. “It has always been so.” A monarch or a chief.' },
            { icon: 'charismatic', title: 'Charismatic', text: 'Rests on **extraordinary personal qualities**. Followers are called **disciples**. Awolowo, Nkrumah, Nyerere, Mandela.' },
            { icon: 'legal', title: 'Legal (rational-legal)', text: 'Rests on the **supremacy of law**. People obey the rules, laws and constitution, not the person.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Why do people obey? Sort each case by Weber’s type of authority.',
          buckets: [
            { id: 't', label: 'Traditional', hint: 'custom' },
            { id: 'c', label: 'Charismatic', hint: 'personal qualities' },
            { id: 'l', label: 'Legal', hint: 'rules and law' },
          ],
          items: [
            { text: 'The Olubadan settles a land dispute between two families, and both accept his ruling.', bucket: 't', why: '**The Olubadan** is obeyed because of custom and tradition: traditional authority.' },
            { text: 'A new village head inherits the title from his father, and the village obeys him.', bucket: 't', why: '**Inheriting a title** by custom is traditional authority.' },
            { text: 'Thousands answer Nelson Mandela’s call for reconciliation because of who he is.', bucket: 'c', why: '**Mandela** is followed for his extraordinary personal qualities: charismatic authority.' },
            { text: 'Awolowo’s devoted followers back any plan he announces.', bucket: 'c', why: '**Awolowo’s followers**, like disciples, follow the person himself: charismatic authority.' },
            { text: 'Candidates accept INEC’s results because the Electoral Act gives INEC that role.', bucket: 'l', why: '**INEC’s role** comes from the law: legal-rational authority.' },
            { text: 'Students keep the hall curfew because it’s in the hall constitution, whoever the porter is.', bucket: 'l', why: '**The hall constitution** is a written rule, obeyed regardless of the person: legal-rational authority.' },
          ],
          explain: 'Custom, the person, or the rules. That’s Weber’s whole classification.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Amaka, a hugely popular SUG president, graduates. Her successor takes office under the SUG constitution. Students obey him, though few find him inspiring. What does the successor mainly rely on?',
          options: [
            { text: 'Charismatic authority, passed on from Amaka', why: 'Charisma rests on a person’s own qualities. It can’t be handed over, and few find the successor inspiring.' },
            { text: 'Legal-rational authority', correct: true, why: 'Students obey the office the constitution created, not the person in it.' },
            { text: 'Traditional authority', why: 'Nothing here rests on custom or inheritance. The office comes from a written constitution.' },
            { text: 'No authority at all, only force', why: 'Nobody is being forced. Students accept his right to the office.' },
          ],
          explain: 'This is why organisations write constitutions: charisma leaves with the leader, but legal authority stays with the office.',
        },
        {
          type: 'bridge',
          title: 'Authority: sorted.',
          recap: [
            '**Authority** is a superior form of power: people obey because they believe you have the right.',
            'Weber’s three types: **traditional** (custom), **charismatic** (the person), **legal** (the rules).',
          ],
          why: 'All three types depend on one thing: people believing the leader has the right to rule. What happens when that belief grows or collapses?',
        },
      ],
    },
    {
      name: 'Legitimacy',
      terms: [['Legitimacy', 'The belief in the right to rule. Through it, power becomes authority.']],
      screens: [
        {
          type: 'custom',
          widget: 'legitimacy',
          eyebrow: 'Legitimacy',
          title: 'Through legitimacy, power becomes authority.',
          body: '==Legitimacy== is the belief that a person or government has the right to rule and make binding decisions. Dayo just won the hall election. See what happens as students’ belief in Dayo rises and falls.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'A government seen as dishonest loses legitimacy. According to your notes, what do governments do to keep it?',
          options: [
            { text: 'Follow public opinion', correct: true, why: 'Governments track and follow public opinion because legitimacy lives in what people believe.' },
            { text: 'Use more force', why: 'Force can get obedience, but that’s power without legitimacy. It doesn’t make people believe you have the right to rule.' },
            { text: 'Shut down the opposition’s WhatsApp groups', why: 'Silencing critics doesn’t change what people believe about your right to rule. It usually makes things worse.' },
            { text: 'Extend their own term in office', why: 'Staying longer doesn’t create belief in your right to rule.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'After a coup, a general controls the army and the radio station. People obey his decrees out of fear, and most believe he has no right to rule. What does the general have?',
          options: [
            { text: 'Legal-rational authority, because he issues decrees', why: 'Decrees aren’t enough. A coup suspends the constitution, so there is no lawful basis for his rule.' },
            { text: 'Power without legitimacy', correct: true, why: 'He can make people act (power), but they don’t believe he has the right to rule, so it never becomes authority.' },
            { text: 'Charismatic authority', why: 'People obey out of fear, not devotion to his personal qualities.' },
            { text: 'Influence without power', why: 'Fear of sanctions is exactly what makes this power.' },
          ],
          explain: 'You’ll meet this again in Chapter 2: military rule is the fastest route to power, but the most dangerous.',
        },
        {
          type: 'bridge',
          title: 'Legitimacy: locked in.',
          recap: [
            '**Legitimacy** is the belief that someone has the right to rule.',
            'With it, power becomes authority. Without it, obedience has to be forced. Governments follow public opinion to keep it.',
          ],
          why: 'You now have all four ideas. Time to bring them together and test them.',
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
          title: 'So why did 300 students obey Mr. Bello?',
          body: 'Each answer from the start of the lesson matches an idea you now know.',
          rows: HOOK,
          after: 'Real life is usually a mix. The more students obey for the last three reasons, the less Mr. Bello needs the first.',
        },
        {
          type: 'story',
          art: 'hall',
          eyebrow: 'Case file',
          title: 'Election night',
          body: 'The results are in: Dayo wins by 14 votes. But Femi, the outgoing chair, refuses to hand over.\n\nOver the next three days, a lot happens. Use everything you’ve learned to make sense of it. The questions get harder as you go.',
          cta: 'Open the case',
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'Which of Femi’s moves are manipulation?',
          options: [
            { text: 'He posts an old photo of Dayo at a rival hall’s party, captioned “Where his loyalty lies 👀”.', correct: true, why: '**The party photo** never says “don’t accept Dayo”. It works through suggestion: manipulation.' },
            { text: 'He orders the porters: “Nobody enters the hall office.”', why: '**The order to the porters** is an explicit command: domination.' },
            { text: 'He changes his profile picture to the hall crest beside the word “Continuity”.', correct: true, why: '**The crest and “Continuity”** use symbols to shape opinion without stating the wish: manipulation.' },
            { text: 'His friends stand shoulder to shoulder in front of the office door.', why: '**Blocking the door with their bodies** is physical: force.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'The porters obey Femi’s order, but only while he’s watching, and they complain about him afterwards. What best describes Femi’s position now?',
          options: [
            { text: 'Charismatic authority', why: 'The porters aren’t devoted to Femi. They grumble as soon as he leaves.' },
            { text: 'Traditional authority', why: 'Nothing about this rests on custom.' },
            { text: 'Power without legitimacy', correct: true, why: 'Femi can still make people act, but they no longer believe he has the right to. Remember the grumbling students on the legitimacy meter.' },
            { text: 'Potential influence', why: 'Femi is giving explicit orders and being obeyed. That’s more than unspoken influence.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'The Dean of Students writes: “Under the hall constitution, Dayo is chair from Monday.” Femi hands over the same day. Why did the Dean’s letter work when Femi’s orders didn’t?',
          options: [
            { text: 'The Dean used more force than Femi.', why: 'The Dean used no force at all. It was just a letter.' },
            { text: 'The Dean has legal-rational authority. Everyone accepts the constitution gives that office the right to decide.', correct: true, why: 'The letter worked because people believe the Dean’s office has the right to rule on this. That belief is legitimacy, resting on law.' },
            { text: 'The Dean is more charismatic than Femi.', why: 'Nothing in the case is about the Dean’s personal qualities. The letter cites the constitution.' },
            { text: 'The Dean manipulated Femi.', why: 'The Dean stated exactly what should happen and why. Nothing was hidden.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Which statement about the whole episode is most accurate?',
          options: [
            { text: 'Femi had influence but never had power.', why: 'Femi’s orders were obeyed, at least while he watched. That is power.' },
            { text: 'Femi’s power faded because it lost legitimacy, while the Dean’s authority held because it rested on law.', correct: true, why: 'This ties the lesson together: power without legitimacy has to be propped up, while authority rooted in law is accepted.' },
            { text: 'Dayo’s win gave him traditional authority.', why: 'Dayo’s right comes from an election under a constitution: legal-rational, not traditional.' },
            { text: 'Manipulation is a type of authority.', why: 'Manipulation is a form of power. Weber’s types of authority are traditional, charismatic and legal.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know who’s really in charge.',
          body: 'Save these. They come up again and again in GES 103.',
        },
      ],
    },
  ],
};
