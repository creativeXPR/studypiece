// GES 103 · Chapter 2 · Lesson 1: why government exists and how it is formed (notes 2 intro, 2.1–2.4).

const HOOK = [
  ['Nothing. We’d sort ourselves out', 'Optimistic', 'Finer: man is deficient in wisdom, virtue, strength and resources compared with his growing wants.'],
  ['Deals would collapse. People would cheat', 'Contract enforcement', 'Most deals are between strangers, so the temptation to double-cross is high.'],
  ['Shared things like light and roads would fall apart', 'Collective action', 'Everyone wants the benefit; few volunteer to pay for it.'],
  ['The rich would get richer, the poor poorer', 'Social welfare', 'Redistribution needs legitimate coercion, because the rich resist it.'],
];

export default {
  id: 'need-government',
  title: 'Why we need government',
  covers: 'Purposes, components, Finer, Laver’s three roles, routes to power',
  minutes: 14,
  sections: [
    {
      name: 'What government does',
      terms: [
        ['Two purposes of the state', 'Maintenance of order and promotion of citizens’ welfare.'],
        ['Three basic jobs', 'Rule making (legislature), rule application (executive), rule adjudication (judiciary).'],
        ['Three components', 'Government makes and enforces decisions; is the ultimate source of coercion; is normally seen as legitimate.'],
        ['Herman Finer (1956)', 'Government is “man’s unending adventure”: his heaviest burden and his supreme hope of liberation from individual feebleness.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'generator',
          eyebrow: 'Chapter 2 · Lesson 1',
          title: 'Why we need government',
          body: 'It’s 9 pm. NEPA has taken light again, and the hall generator is silent because nobody bought fuel.\n\nSomeone in the corridor jokes: “If there was no government at all, would it even be worse than this?”',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'generator',
          poll: 'hook',
          prompt: 'Imagine a country with no government at all. What would go wrong first?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Good instinct.',
          pollBody: 'Three of those answers are exactly the three roles a political scientist named Michael Laver gives government. We’ll come back to yours.',
        },
        {
          type: 'story',
          eyebrow: 'Purposes',
          title: 'The modern state has two primary purposes.',
          body: '**1. Maintenance of order.**\n\n**2. Promotion of citizens’ welfare.**\n\nTo do that, government has three basic jobs: ==rule making== (legislature), ==rule application== (executive) and ==rule adjudication== (judiciary). How separate those three are depends on the doctrine of **separation of powers**.',
        },
        {
          type: 'sort',
          eyebrow: 'Warm-up',
          prompt: 'Which basic job of government is each of these?',
          buckets: [
            { id: 'm', label: 'Rule making', hint: 'legislature' },
            { id: 'a', label: 'Rule application', hint: 'executive' },
            { id: 'j', label: 'Rule adjudication', hint: 'judiciary' },
          ],
          items: [
            { text: 'The National Assembly passes a new cybercrime law.', bucket: 'm', why: '**Passing a law** is rule making, the legislature’s job.' },
            { text: 'Police arrest suspects under the new cybercrime law.', bucket: 'a', why: '**Enforcing the law** is rule application, the executive’s job.' },
            { text: 'A court decides whether a suspect actually broke the law.', bucket: 'j', why: '**Judging a case** is rule adjudication, the judiciary’s job.' },
            { text: 'A ministry rolls out a new national ID policy.', bucket: 'a', why: '**Implementing policy** is rule application.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Three components',
          title: 'What makes government different from any other body?',
          cards: [
            { title: '1. It decides', text: 'Government exists to **make and enforce decisions**: the highest, most formal level of collective decision-making.' },
            { title: '2. It can coerce', text: 'Government is the **ultimate source of coercion**. It holds the monopoly of force to enforce collective decisions.' },
            { title: '3. It is legitimate', text: 'Its conduct is **normally seen as legitimate**: people accept it is right for government to demand obedience.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Herman Finer (1956) called government “man’s unending adventure”. Why, according to your notes, is government indispensable?',
          options: [
            { text: 'Because politicians need jobs.', why: 'Finer’s argument is about human weakness, not careers.' },
            { text: 'Because man is deficient in wisdom, virtue, strength and resources compared with his growing wants.', correct: true, why: 'Government is his heaviest burden and also his supreme hope of liberation from individual feebleness.' },
            { text: 'Because every society has a king.', why: 'Finer isn’t talking about monarchy.' },
            { text: 'Because government is never temporary.', why: 'Governments change all the time. Finer’s point is that people always need one.' },
          ],
          explain: 'Finer: a complete act of government converts the will of some people into the behaviour of others. It has two parts: the **process of politics** and the **process of administration**.',
        },
        {
          type: 'bridge',
          title: 'Purposes and components: done.',
          recap: [
            'Two purposes: **order** and **welfare**. Three jobs: rule **making**, **application**, **adjudication**.',
            'Government **decides**, can **coerce**, and is seen as **legitimate**. Finer: man’s unending adventure.',
          ],
          why: 'Finer says why we need government in general. Michael Laver gets specific: three problems people simply can’t solve on their own.',
        },
      ],
    },
    {
      name: 'Laver’s three roles',
      terms: [
        ['Contract enforcement', 'Most deals are between strangers, so the temptation to double-cross is high; government enforces contracts.'],
        ['Collective action', 'A project benefits everyone but nobody wants to pay; costs and benefits can’t be limited to those who pay.'],
        ['Social welfare', 'Redistribution from rich to poor, which needs legitimate coercion because the rich resist it.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Michael Laver (in Rowe, 1969)',
          title: 'Three things only government can reliably do',
          cards: [
            { title: 'Contract enforcement', text: 'People who trust each other, in small close communities, may not need it. But **most deals involve strangers**, so the temptation to double-cross is high.' },
            { title: 'Collective action', text: 'A project **benefits everyone, but no one wants to pay** for it. Left alone, social costs rise and social benefits fall.' },
            { title: 'Social welfare', text: 'Redistributing from rich to poor. The rich resist, arguing inequality drives efficiency, so it needs **legitimate coercion**.' },
          ],
        },
        {
          type: 'custom',
          widget: 'collectiveAction',
          eyebrow: 'Collective action',
          title: 'Will the generator run tonight?',
          body: 'Fuel costs ₦5,000 a night. Ten rooms share the generator, so each owes ₦500. Try it with voluntary payment first, then with an enforced hall levy.',
        },
        {
          type: 'multi',
          eyebrow: 'Apply it',
          prompt: 'Which of these are part of the collective-action problem, according to your notes?',
          options: [
            { text: 'Almost all private actions have public consequences.', correct: true, why: '**Private actions with public consequences** are the starting point of the problem.' },
            { text: 'Costs and benefits spread indiscriminately: excluding one person excludes everyone.', correct: true, why: '**You can’t switch off the light for one free-rider** without switching it off for all.' },
            { text: 'People won’t keep bearing private costs for social benefit voluntarily.', correct: true, why: '**Voluntary contributions dry up**, as the generator showed.' },
            { text: 'Everyone always pays their fair share if asked politely.', why: '**If that were true**, there would be no problem to solve.' },
          ],
          explain: 'The result: social costs rise and social benefits fall, so government steps in.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which of Laver’s roles is government playing in each case?',
          buckets: [
            { id: 'c', label: 'Contract enforcement' },
            { id: 'a', label: 'Collective action' },
            { id: 'w', label: 'Social welfare' },
          ],
          items: [
            { text: 'A court forces a landlord to return a student’s caution fee as their agreement said.', bucket: 'c', why: '**Making the landlord keep the agreement** is contract enforcement.' },
            { text: 'An online seller who took payment but never delivered is made to refund.', bucket: 'c', why: '**Enforcing a deal between strangers** is contract enforcement.' },
            { text: 'Government taxes everyone to build a road nobody would fund alone.', bucket: 'a', why: '**A shared road everyone benefits from** is collective action.' },
            { text: 'Mosquito spraying for the whole town, paid for from taxes.', bucket: 'a', why: '**Spraying protects everyone**, payers or not: collective action.' },
            { text: 'Higher taxes on the rich fund free school meals for poor children.', bucket: 'w', why: '**Moving resources from rich to poor** is social welfare.' },
            { text: 'Monthly cash transfers to the poorest households.', bucket: 'w', why: '**Redistribution to the poor** is social welfare.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why does Laver say redistribution needs legitimate coercion, rather than simply asking the rich to give?',
          options: [
            { text: 'Because the poor don’t want help.', why: 'The resistance comes from the other side.' },
            { text: 'Because the rich resist, arguing that inequality drives efficiency, so voluntary giving won’t be enough.', correct: true, why: 'Without coercion that people accept as legitimate, redistribution wouldn’t happen at the scale needed.' },
            { text: 'Because charities are illegal.', why: 'Nothing in the notes says that.' },
            { text: 'Because only courts can move money.', why: 'Redistribution is done by government through policy and taxes, not only courts.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Laver: understood.',
          recap: [
            '**Contract enforcement**: deals between strangers tempt people to double-cross.',
            '**Collective action**: everyone wants the benefit, nobody wants the cost. **Welfare**: redistribution needs legitimate coercion.',
          ],
          why: 'We know why government exists. But how does a government actually come to power? There are democratic routes, and three non-democratic ones.',
        },
      ],
    },
    {
      name: 'Routes to power',
      terms: [
        ['Democracy', 'Government by the whole population or eligible members, usually through elected representatives.'],
        ['8 steps to democratic government', 'Delimitation, voter registration, party registration and nomination, balloting, counting and results, litigation, swearing-in, cabinet formation.'],
        ['Non-democratic modes', 'Imperialistic mode, military coup (coup d’état), election rigging.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'assembly',
          eyebrow: 'The democratic method',
          title: 'Democracy: government by the whole population, usually through elected representatives.',
          body: 'Your notes list **13 democratic principles**: citizen participation, political equality, political tolerance, accountability and transparency, political competition, free and fair elections, separation of powers, respect for human rights, rule of law, periodic elections, neutrality of state institutions, popular sovereignty and secret balloting.\n\nThe process of getting there has ==eight steps==.',
        },
        {
          type: 'order',
          eyebrow: 'Apply it',
          prompt: 'Put the eight steps of forming a democratic government in order.',
          items: [
            'Delimitation of constituencies',
            'Registration of voters',
            'Registration of parties and nomination of candidates',
            'Balloting (secret or open)',
            'Counting votes and declaring results',
            'Litigation: legal settlement of election disputes',
            'Swearing-in of winners',
            'Formation of cabinet, per the constitution',
          ],
          hint: 'Draw the map, register voters, register parties, vote, count, settle disputes in court, swear in, then form the cabinet.',
        },
        {
          type: 'reveal',
          eyebrow: 'Non-democratic methods',
          title: 'Three ways to take power without a fair vote',
          cards: [
            { title: 'Imperialistic mode', text: 'Imperial powers set up quasi-governments in colonies: governors appointed unilaterally, with powerless councils. Example: **pre-independence Nigeria**.' },
            { title: 'Military coup', text: 'Rule “through the barrel of the gun”: the **fastest** route to power and the **most dangerous**. Always illegal, because it suspends the constitution that created the army.' },
            { title: 'Election rigging', text: 'Falsifying leadership selection so a favoured party takes power. Nigerian examples: the **1965 Western Region** election (NNDP) and the **1983** national election (NPN).' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which of these are causes of military coups listed in your notes?',
          options: [
            { text: 'Poor leadership', correct: true, why: '**Poor leadership** is listed.' },
            { text: 'Corruption', correct: true, why: '**Corruption** is listed.' },
            { text: 'Societal violence', correct: true, why: '**Societal violence** is listed.' },
            { text: 'Military ambition', correct: true, why: '**Military ambition** is listed.' },
            { text: 'Free and fair elections', why: '**Free and fair elections** are a democratic principle, not a cause of coups.' },
          ],
          note: 'Your notes list Nigeria 1998–99 among coup examples. In fact, General Abdulsalami Abubakar took over in 1998 after Sani Abacha died in office, not through a coup. The other examples (Thailand 2014, Burkina Faso 2015, Mali 2012 and so on) are standard.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why do your notes say a military coup is always illegal, even if the government it removes was corrupt?',
          options: [
            { text: 'Because soldiers are not allowed to vote.', why: 'Voting rights aren’t the issue.' },
            { text: 'Because it suspends the very constitution that created the army.', correct: true, why: 'The army exists under the constitution. Overthrowing that constitution destroys the legal basis of its own authority.' },
            { text: 'Because coups are always slow.', why: 'The notes say the opposite: a coup is the fastest route to power.' },
            { text: 'Because the UN must approve every government.', why: 'That’s not the reason given.' },
          ],
          explain: 'Link to Chapter 1: power taken this way lacks legitimacy, so it must lean on force.',
        },
        {
          type: 'bridge',
          title: 'Routes to power: mapped.',
          recap: [
            'Democracy: **13 principles**, **8 steps** from delimitation to cabinet formation.',
            'Non-democratic: **imperialistic mode**, **coup** (fastest, most dangerous, always illegal), **rigging** (1965 Western Region, 1983).',
          ],
          why: 'Time to apply all of it to one messy election.',
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
          title: 'A country with no government: what goes wrong?',
          body: 'Here’s where each answer from the start fits.',
          rows: HOOK,
          after: 'Three of the four answers are Laver’s roles. The first is Finer’s point in reverse: people on their own lack the wisdom, virtue, strength and resources they need.',
        },
        {
          type: 'story',
          art: 'assembly',
          eyebrow: 'Case file',
          title: 'The Republic of Kanto votes',
          body: 'Kanto is holding its first general election in years. A lot happens between registration day and the swearing-in.\n\nFour questions, getting harder.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'After the results, a losing candidate files a petition, and a tribunal decides the dispute. Which of the eight steps is this, and what comes right after it?',
          options: [
            { text: 'Balloting, followed by counting', why: 'Balloting is the voting itself. The petition comes after results are declared.' },
            { text: 'Litigation, followed by the swearing-in of winners', correct: true, why: 'Settling election disputes in court is step 6. Step 7 is swearing in the winners.' },
            { text: 'Delimitation, followed by voter registration', why: 'Delimitation draws constituency boundaries. It’s the first step, long before any petition.' },
            { text: 'Cabinet formation, followed by litigation', why: 'Cabinet formation is the very last step.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'In one region, officials secretly change the result sheets so the ruling party wins. Which mode is this, and which Nigerian example matches it?',
          options: [
            { text: 'A military coup, like 1966', why: 'No soldiers took power. The vote itself was falsified.' },
            { text: 'Election rigging, like the 1965 Western Region election', correct: true, why: 'Falsifying leadership selection is rigging. The 1965 Western Region (NNDP) and 1983 (NPN) elections are the notes’ examples.' },
            { text: 'The imperialistic mode, like pre-independence Nigeria', why: 'No foreign power appointed anyone.' },
            { text: 'Collective action, like a road project', why: 'Collective action is one of Laver’s roles, not a way of taking power.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'The new government passes a law that every business must honour written agreements, with courts to enforce them. Which of Laver’s roles is this?',
          options: [
            { text: 'Social welfare', why: 'Nothing is being redistributed.' },
            { text: 'Collective action', why: 'This isn’t about funding a shared good.' },
            { text: 'Contract enforcement', correct: true, why: 'Making people honour agreements, especially between strangers, is contract enforcement.' },
            { text: 'Rule adjudication only', why: 'Courts do adjudicate, but the role Laver names is contract enforcement.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Kanto’s army chief says: “If the new government fails, we’ll step in and fix things.” Which replies use this lesson correctly?',
          options: [
            { text: 'A coup would be illegal, because it suspends the constitution that created the army.', correct: true, why: '**Coups are always illegal** for exactly this reason.' },
            { text: 'A coup is the fastest route to power, but also the most dangerous.', correct: true, why: '**Fastest and most dangerous** is how the notes describe it.' },
            { text: 'Government by force would still be democratic if it fixed things.', why: '**Democracy is government by the people** through elected representatives. Force is a non-democratic mode.' },
            { text: 'Power taken by force tends to lack legitimacy, so it has to lean on coercion.', correct: true, why: '**This links back to Chapter 1**: power without legitimacy needs force to survive.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know why government exists.',
          body: 'Here are the key ideas. They’re also in your notes drawer during every lesson.',
        },
      ],
    },
  ],
};
