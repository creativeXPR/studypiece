// GES 103 · Chapter 2 · Lesson 3: classifying governments (notes 2.6–2.9).

const HOOK = [
  ['One strong leader who decides fast', 'Monarchy, or tyranny', 'Aristotle: rule by one is good if it serves all (monarchy), corrupt if it serves the ruler (tyranny).'],
  ['A small council of the wisest people', 'Aristocracy, or oligarchy', 'Rule by a few is good if it serves all (aristocracy), corrupt if it serves themselves (oligarchy).'],
  ['Everyone votes on everything', 'Polity, or “democracy”', 'Rule by many for all is polity, Aristotle’s best. Rule by many for themselves was his worst.'],
  ['Whatever works, as long as it serves everyone', 'Aristotle’s real test', 'He cared about two things: who rules, and in whose interest.'],
];

export default {
  id: 'design-country',
  title: 'Design a country',
  covers: 'Six criteria; Aristotle’s six forms; unitary, federal, confederal; presidential, parliamentary, dual',
  minutes: 15,
  sections: [
    {
      name: 'Who rules?',
      terms: [
        ['Six criteria for classifying', 'Size of ruling class; power distribution; relationship of organs; ideology; elite behaviour; other forms.'],
        ['Aristotle’s criteria', 'Who rules (one, few, many) and in whose interest (all vs self).'],
        ['Good forms', 'Monarchy (one), aristocracy (few), polity (many): rule for all.'],
        ['Corrupt forms', 'Tyranny (one), oligarchy (few), democracy in Aristotle’s sense (many): rule for self.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'island',
          eyebrow: 'Chapter 2 · Lesson 3',
          title: 'Design a country',
          body: 'A new island nation, the Coral Isles, has just won independence. Its founders have asked you to help design its government.\n\nThere are a lot of choices. Political scientists have six ways of classifying them.',
          cta: 'Let’s design',
        },
        {
          type: 'choice',
          art: 'island',
          poll: 'hook',
          prompt: 'First instinct: who should rule the Coral Isles?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Noted.',
          pollBody: 'Aristotle classified governments 2,400 years ago, and his scheme lasted nearly 25 centuries. We’ll see where your answer lands.',
        },
        {
          type: 'reveal',
          eyebrow: 'The six criteria',
          title: 'Six ways to classify a government',
          body: 'Classical contributors: Plato, Aristotle, and the Romans Polybius and Cicero.',
          cards: [
            { title: '1. Who rules', text: 'Size of the ruling class and public involvement: **Aristotle’s six forms**.' },
            { title: '2. Power distribution', text: '**Unitary, federal, confederal.**' },
            { title: '3. Relationship of organs', text: '**Presidential, parliamentary, dual executive.**' },
            { title: '4. Ideology', text: '**Capitalism, socialism, communism.**' },
            { title: '5. Elite behaviour', text: 'Consociational and centrifugal democracy (**Lijphart**).' },
            { title: '6. Other forms', text: 'Fascism, feudalism, theocracy, totalitarianism, colonialism, militarism.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Aristotle’s grid',
          prompt: 'Aristotle asked who rules, and in whose interest. Put each form in its cell.',
          buckets: [
            { id: '1g', label: 'One, for all' },
            { id: '1c', label: 'One, for self' },
            { id: 'fg', label: 'Few, for all' },
            { id: 'fc', label: 'Few, for self' },
            { id: 'mg', label: 'Many, for all' },
            { id: 'mc', label: 'Many, for self' },
          ],
          items: [
            { text: 'Monarchy', bucket: '1g', why: '**Monarchy**: one ruler, in the interest of all.' },
            { text: 'Tyranny', bucket: '1c', why: '**Tyranny**: one ruler, for himself.' },
            { text: 'Aristocracy', bucket: 'fg', why: '**Aristocracy**: “government of the best”, a few ruling for all.' },
            { text: 'Oligarchy', bucket: 'fc', why: '**Oligarchy**: a privileged few ruling for themselves.' },
            { text: 'Polity', bucket: 'mg', why: '**Polity**: constitutional rule of many for all, Aristotle’s best form.' },
            { text: 'Democracy (Aristotle’s sense)', bucket: 'mc', why: '**Democracy**, to Aristotle, meant the many ruling for themselves: his worst form.' },
          ],
          explain: 'Each “good” form has a corrupt twin: monarchy → tyranny, aristocracy → oligarchy, polity → democracy.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which of Aristotle’s forms best fits each example from your notes?',
          buckets: [
            { id: 'm', label: 'Monarchy' },
            { id: 't', label: 'Tyranny' },
            { id: 'a', label: 'Aristocracy' },
          ],
          items: [
            { text: 'Jordan and Morocco’s kings', bucket: 'm', why: '**Jordan and Morocco** are the notes’ monarchy examples.' },
            { text: 'Traditional African kingdoms', bucket: 'm', why: '**Traditional African societies** appear under monarchy.' },
            { text: 'Idi Amin in Uganda', bucket: 't', why: '**Idi Amin** is a notes example of tyranny: one person ruling for himself.' },
            { text: 'Sani Abacha in Nigeria', bucket: 't', why: '**Abacha** is listed under tyranny.' },
            { text: 'The rich using their wealth for the common good', bucket: 'a', why: '**Wealth used for the common good** is how the notes describe aristocracy in practice.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Aristotle called democracy his worst form, yet today it’s the most desired. How do your notes explain this?',
          options: [
            { text: 'Aristotle was simply wrong about everything.', why: 'His scheme lasted nearly 25 centuries.' },
            { text: 'The meaning of “democracy” has changed. To Aristotle it meant the many ruling for themselves; his good version was “polity”.', correct: true, why: 'Modern democracy, with a constitution and rule for all, is closer to what Aristotle called polity.' },
            { text: 'Democracy used to mean rule by one person.', why: 'It always meant rule by the many.' },
            { text: 'Aristotle never mentioned democracy.', why: 'He did, as the corrupt form of rule by many.' },
          ],
          note: 'Akindele et al. (1998) give a different version: legitimate = monarchy, aristocracy, **democracy**; corrupt = tyranny, oligarchy, **mobocracy** (rule by the mob: violence, disorder, hooliganism).',
        },
        {
          type: 'bridge',
          title: 'Who rules: decided.',
          recap: [
            'Aristotle asked **who rules** (one, few, many) and **in whose interest** (all or self).',
            'Good: **monarchy, aristocracy, polity**. Corrupt: **tyranny, oligarchy, democracy** (his sense). Akindele swaps in mobocracy.',
          ],
          why: 'The Coral Isles have several islands. Should power sit in the capital, or be shared with each island?',
        },
      ],
    },
    {
      name: 'Where power sits',
      terms: [
        ['Unitary', 'One central government; units exist at its mercy. Ghana, Britain, France, Kenya.'],
        ['Federal', 'Constitution divides power between independent, coordinate levels (Wheare). Nigeria, USA, Brazil, India, Germany.'],
        ['Confederal', 'League of sovereign states with a weak centre; least stable, prone to secession.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'powerDistribution',
          eyebrow: 'Power distribution',
          title: 'Move the power between the centre and the units.',
          body: 'Try all three patterns and watch what happens to the centre, the units and the links between them.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Unitary, federal or confederal? Sort each feature.',
          buckets: [
            { id: 'u', label: 'Unitary' },
            { id: 'f', label: 'Federal' },
            { id: 'c', label: 'Confederal' },
          ],
          items: [
            { text: 'Units have no legal existence or taxing power of their own', bucket: 'u', why: '**Units at the centre’s mercy** describes a unitary state.' },
            { text: 'Adopted by homogeneous peoples in small countries', bucket: 'u', why: '**Homogeneity and small size** are reasons for a unitary system.' },
            { text: 'A constitution divides power between independent, coordinate levels', bucket: 'f', why: '**Wheare’s definition** is federalism.' },
            { text: 'Nigeria: FG, 36 states, 774 LGAs, FCT', bucket: 'f', why: '**Nigeria** is the notes’ main federal example.' },
            { text: 'Units keep their sovereignty; the centre is weak', bucket: 'c', why: '**Sovereign units with a weak centre** is a confederation.' },
            { text: 'The least stable form, prone to secession', bucket: 'c', why: '**Instability and secession** are the confederal weakness.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'What is the key difference between a federation and a confederation?',
          options: [
            { text: 'A federation has more states.', why: 'Number of units isn’t the difference.' },
            { text: 'A confederation is a league of sovereign states; a federation creates a new state, and the units give up sovereignty.', correct: true, why: 'In a confederation, sovereignty stays with the units. In a federation, it passes to the new state.' },
            { text: 'Only confederations have constitutions.', why: 'Federations are defined by a constitution dividing power.' },
            { text: 'They are the same thing with different names.', why: 'They differ on where sovereignty sits.' },
          ],
          note: 'Your notes list **Canada 1867** as a confederation. Canada called its 1867 union “Confederation”, but it actually created a **federation**. Your notes’ other examples (USA 1781–1789, Germany 1815) are true confederations.',
        },
        {
          type: 'multi',
          eyebrow: 'Think deeper',
          prompt: 'The Coral Isles have many ethnic groups, fear invasion, and share one colonial history. Which of these are reasons your notes give for choosing federalism?',
          options: [
            { text: 'Heterogeneous people', correct: true, why: '**A diverse population** favours federalism.' },
            { text: 'Fear of insecurity and need for common defence', correct: true, why: '**Security and common defence** are listed reasons.' },
            { text: 'Common colonial heritage', correct: true, why: '**A shared colonial past** is listed.' },
            { text: 'A small, homogeneous population', why: '**Homogeneity and small size** point to a unitary state instead.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Power distribution: placed.',
          recap: [
            '**Unitary**: one centre, units at its mercy. **Federal**: constitution divides power (Wheare). **Confederal**: sovereign units, weak centre.',
            'Federation creates a new state; confederation is a league of sovereign states.',
          ],
          why: 'Last design decision: how should the Coral Isles’ executive and legislature relate to each other?',
        },
      ],
    },
    {
      name: 'How organs relate',
      terms: [
        ['Presidential', 'President is head of state and government, elected for a fixed term. USA, Nigeria, Ghana.'],
        ['Parliamentary (Westminster)', 'Ceremonial head of state; PM leads from the majority party. Collective responsibility, fusion of powers. Britain, Japan.'],
        ['Dual executive', 'Mix of both: President appoints PM; PM runs day-to-day government. France is the main example.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Institutional structure',
          title: 'Three ways to arrange the executive',
          cards: [
            { icon: 'executive', title: 'Presidential', text: 'The **President is both head of state and head of government**, chief executive and Commander-in-Chief, elected for a fixed term. The most common type today, especially in new African democracies.' },
            { icon: 'legislature', title: 'Parliamentary', text: 'From Britain, “**the mother of parliamentary democracy**”. A ceremonial head of state plus a **Prime Minister** with real power, picked from the majority party. Features: **collective responsibility** and **fusion of powers**.' },
            { title: 'Dual executive', text: 'Combines the two. **France** is the main example: the President appoints the PM, controls the armed forces and chairs cabinet; the PM and ministers run day-to-day government.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Presidential, parliamentary or dual? Sort each feature.',
          buckets: [
            { id: 'p', label: 'Presidential' },
            { id: 'w', label: 'Parliamentary' },
            { id: 'd', label: 'Dual' },
          ],
          items: [
            { text: 'Head of state and head of government are the same person', bucket: 'p', why: '**One person in both roles** is presidential.' },
            { text: 'Treaties need the advice and consent of two-thirds of the legislature', bucket: 'p', why: '**Two-thirds legislative consent for treaties** is a presidential feature.' },
            { text: 'Collective responsibility and fusion of powers', bucket: 'w', why: '**Collective responsibility and fusion** are parliamentary features.' },
            { text: 'Cabinet is picked from members of Parliament', bucket: 'w', why: '**Ministers drawn from Parliament** is parliamentary.' },
            { text: 'The President appoints the PM and can dissolve the Assembly', bucket: 'd', why: '**A President appointing a PM** is the dual executive (France).' },
            { text: 'Adopted because of political instability in France', bucket: 'd', why: '**French instability** is why the dual model was adopted.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Under the 1960 and 1963 constitutions, which system did Nigeria use?',
          options: [
            { text: 'Presidential', why: 'Nigeria went presidential later, in the Second Republic.' },
            { text: 'Parliamentary (Westminster)', correct: true, why: 'Nigeria’s First Republic followed the British parliamentary model.' },
            { text: 'Dual executive', why: 'That’s the French model.' },
            { text: 'Confederal', why: 'Confederal describes power distribution, not how the executive and legislature relate.' },
          ],
          explain: 'Nigeria’s President was elected directly in the Second and Fourth Republics. The USA elects its President indirectly, through an electoral college.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'In a parliamentary system, how does someone become Prime Minister?',
          options: [
            { text: 'They win a separate national vote for PM.', why: 'That’s closer to electing a president.' },
            { text: 'The leader of the majority party is invited to form a government, becomes PM, and picks the cabinet from Parliament.', correct: true, why: 'That’s the Westminster path to power, and why executive and legislature are fused.' },
            { text: 'The monarch picks anyone they like.', why: 'The head of state is ceremonial and invites the majority leader.' },
            { text: 'The Supreme Court appoints them.', why: 'Courts play no part in choosing a PM.' },
          ],
          note: 'Your notes say the French President serves **seven years** and is elected by an **electoral college**. Since 2002 the term has been **five years**, and the President has been **directly elected since 1962**. For this course’s exam, give the textbook answer, but know the current facts.',
        },
        {
          type: 'bridge',
          title: 'Organ relationships: sorted.',
          recap: [
            '**Presidential**: one person heads state and government; fixed term. USA, Nigeria, Ghana.',
            '**Parliamentary**: ceremonial head, PM from majority, fusion of powers. **Dual**: France, President plus PM.',
          ],
          why: 'You’ve got every tool. Time to finish designing the Coral Isles.',
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
          title: 'Who should rule the Coral Isles?',
          body: 'Here’s how Aristotle would classify each answer from the start.',
          rows: HOOK,
          after: 'Notice that every option has a good and a corrupt version. Aristotle’s second question, “in whose interest?”, decides which.',
        },
        {
          type: 'story',
          art: 'island',
          eyebrow: 'Case file',
          title: 'The founders vote',
          body: 'The founders debate for a week. Here’s what they choose, and a few things that go wrong along the way.\n\nFive questions. The last two are the toughest in the lesson.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: 'They choose a written constitution that divides power between a national government and each island, with neither able to abolish the other. What have they created?',
          options: [
            { text: 'A unitary state', why: 'In a unitary state the islands would exist at the centre’s mercy.' },
            { text: 'A federation', correct: true, why: 'Power divided by a constitution between independent, coordinate levels is Wheare’s federation.' },
            { text: 'A confederation', why: 'In a confederation the islands would stay sovereign, with a weak centre.' },
            { text: 'A polity', why: 'Polity is one of Aristotle’s forms, about who rules. This question is about where power sits.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: 'They want one leader to be both head of state and head of government, elected for a fixed term. Which system is that?',
          options: [
            { text: 'Presidential', correct: true, why: 'One person in both roles, for a fixed term, is presidential.' },
            { text: 'Parliamentary', why: 'Parliamentary splits the roles between a ceremonial head of state and a PM.' },
            { text: 'Dual executive', why: 'The dual executive has both a President and a PM.' },
            { text: 'Monarchy', why: 'A monarch inherits the role and doesn’t serve a fixed term.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'Ten years later, the President rewrites the constitution to stay forever and uses the treasury for his family. In Aristotle’s terms, what has happened?',
          options: [
            { text: 'Monarchy has become aristocracy.', why: 'The number of rulers hasn’t changed.' },
            { text: 'Rule by one in the interest of all has become rule by one for himself: tyranny.', correct: true, why: 'Same number of rulers, different interest served. That’s the move from the good form to its corrupt twin.' },
            { text: 'It has become a polity.', why: 'Polity is rule by many for all.' },
            { text: 'Nothing has changed, because he is still elected.', why: 'He has stopped serving everyone. That changes the classification.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'Two islands threaten to leave, saying: “We joined as sovereign partners, and we can walk away.” Which system are they describing, and what is its weakness?',
          options: [
            { text: 'Federal, whose weakness is over-centralisation', why: 'In a federation the units gave up sovereignty, so they can’t claim it back like this.' },
            { text: 'Confederal, the least stable form and prone to secession', correct: true, why: 'Sovereign partners who can walk away is a confederation, and secession is exactly its weakness.' },
            { text: 'Unitary, with no weakness', why: 'In a unitary state the units have no sovereignty at all.' },
            { text: 'Parliamentary, with collective responsibility', why: 'That describes how organs relate, not where sovereignty sits.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'The founders now want a parliamentary system instead. Which features should they expect?',
          options: [
            { text: 'A ceremonial head of state separate from the Prime Minister', correct: true, why: '**A ceremonial head plus a PM** is parliamentary.' },
            { text: 'Collective responsibility of the cabinet', correct: true, why: '**Collective responsibility** is a parliamentary feature.' },
            { text: 'Fusion of executive and legislative powers', correct: true, why: '**Fusion of powers** is a parliamentary feature.' },
            { text: 'A President elected for a fixed term who is also head of government', why: '**That’s presidential**, the system they’re replacing.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can classify any government.',
          body: 'Key terms from this lesson. One more lesson completes Chapter 2.',
        },
      ],
    },
  ],
};
