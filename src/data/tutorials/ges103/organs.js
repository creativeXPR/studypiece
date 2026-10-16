// GES 103 · Chapter 2 · Lesson 2: executive, legislature, judiciary (notes 2.5).

const HOOK = [
  ['The President', 'Executive', 'Always visible, even under military rule, but the notes call the legislature the paramount organ.'],
  ['The National Assembly', 'Legislature', 'Garner: it “unquestionably occupies the paramount place”, the regulator of administration.'],
  ['The courts', 'Judiciary', 'The least harmful organ and “the last hope of the common man”, but not the most powerful.'],
  ['The army', 'Not an organ of government', 'The army falls under the executive. Ruling through it is a coup, not one of the three organs.'],
];

export default {
  id: 'organs',
  title: 'The three organs',
  covers: 'Executive, legislature, judiciary',
  minutes: 13,
  sections: [
    {
      name: 'The executive',
      terms: [
        ['Executive', 'Implements laws, policies and decisions: the President or head of government, ministers and the civil service.'],
        ['Temporary vs permanent executive', 'Temporary (political): President and cabinet. Permanent: career civil servants.'],
        ['Executive functions', 'Administration and law enforcement; external relations and defence; some legislation; control of the purse; prerogative of mercy.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'assembly',
          eyebrow: 'Chapter 2 · Lesson 2',
          title: 'The three organs',
          body: 'A proposal to ban commercial motorcycles (okada) in your state is making headlines. Over the next few months it will pass through every organ of government.\n\nBefore we follow it, a question.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          poll: 'hook',
          prompt: 'In a democracy, which organ do your notes say holds the paramount place?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'We’ll see.',
          pollBody: 'Most people guess the President. A political scientist named Garner had a different answer. Keep yours in mind.',
        },
        {
          type: 'reveal',
          eyebrow: 'The executive',
          title: 'The executive implements laws, policies and decisions.',
          body: 'It includes the President or head of government, ministers and the civil service.',
          cards: [
            { icon: 'executive', title: 'Temporary executive', text: 'The **political** executive: the President and cabinet ministers. They leave when their term ends.' },
            { title: 'Permanent executive', text: '**Career civil servants**. They stay, whoever wins the election.' },
            { title: 'Always visible', text: 'Even under military rule, the executive remains: the junta leader is **Head of State and Commander-in-Chief**.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Apply it',
          prompt: 'Which of these are functions of the executive, according to your notes?',
          options: [
            { text: 'General administration and law enforcement', correct: true, why: '**Administration and enforcement** are core executive functions.' },
            { text: 'External relations and defence', correct: true, why: '**External relations and defence** belong to the executive.' },
            { text: 'Control of the “purse”', correct: true, why: '**Control of the purse** is listed as an executive function.' },
            { text: 'The power to pardon (prerogative of mercy)', correct: true, why: '**The prerogative of mercy** is an executive power.' },
            { text: 'Judicial review of laws', why: '**Judicial review** belongs to the judiciary.' },
          ],
          explain: 'The executive also performs **some legislation**, even though making law is mainly the legislature’s job.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A new President is sworn in. Which part of the executive changes, and which stays?',
          options: [
            { text: 'Everyone changes, including civil servants.', why: 'Career civil servants are the permanent executive. They stay.' },
            { text: 'The temporary executive (President and ministers) changes; the permanent executive (civil servants) stays.', correct: true, why: 'Politicians come and go; the civil service provides continuity.' },
            { text: 'Nobody changes until the courts approve.', why: 'Courts don’t approve each new executive.' },
            { text: 'Only the civil servants change.', why: 'It’s the other way round.' },
          ],
          explain: 'Two forms of executive: **parliamentary/cabinet** (head of state and head of government are different people, e.g. Britain) and **presidential** (chief executive separated from the legislature). More on these in the next lesson.',
        },
        {
          type: 'bridge',
          title: 'The executive: clear.',
          recap: [
            'The executive **implements**: President or head of government, ministers, civil service.',
            '**Temporary** (political) vs **permanent** (civil servants). Always visible, even under military rule.',
          ],
          why: 'The executive carries out laws, but someone has to make them first. Meet the organ Garner ranked above all others.',
        },
      ],
    },
    {
      name: 'The legislature',
      terms: [
        ['Legislature', 'Makes laws and formulates policy. Garner: it “unquestionably occupies the paramount place” and is “the regulator of administration”.'],
        ['Unicameral vs bicameral', 'One chamber (unitary states; quick, cheaper) vs two chambers (federal states; checks and balances, but slower).'],
        ['Senate confirmation', 'In Nigeria and the USA, the Senate alone screens and confirms appointments such as ministers and ambassadors.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'assembly',
          eyebrow: 'The legislature',
          title: 'The legislature makes laws and formulates policy.',
          body: 'Garner wrote that the legislature ==“unquestionably occupies the paramount place”== and is “the regulator of administration”.\n\nIt’s also the organ **most vulnerable** to political instability: in a coup, it’s the first to go.\n\nOther roles (Okunade, 2001): it legitimises policies, represents the people, conveys their views to the executive, and is a forum for national debate.',
        },
        {
          type: 'sort',
          eyebrow: 'Warm-up',
          prompt: 'Same organ, different names. Match each legislature to its country.',
          buckets: [
            { id: 'uk', label: 'Britain' },
            { id: 'us', label: 'USA' },
            { id: 'jp', label: 'Japan' },
            { id: 'ng', label: 'Nigeria' },
          ],
          items: [
            { text: 'Parliament', bucket: 'uk', why: '**Parliament** is Britain’s legislature.' },
            { text: 'Congress', bucket: 'us', why: '**Congress** is the USA’s legislature.' },
            { text: 'Diet', bucket: 'jp', why: '**The Diet** is Japan’s legislature.' },
            { text: 'National Assembly', bucket: 'ng', why: '**The National Assembly** is Nigeria’s legislature.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'One chamber or two? Sort each feature.',
          buckets: [
            { id: 'u', label: 'Unicameral', hint: 'one chamber' },
            { id: 'b', label: 'Bicameral', hint: 'two chambers' },
          ],
          items: [
            { text: 'Usually found in unitary or centralised states', bucket: 'u', why: '**Unitary states** tend to have one chamber.' },
            { text: 'Uganda, Costa Rica, Portugal, Sweden', bucket: 'u', why: '**These four** are the notes’ unicameral examples.' },
            { text: 'Quick, handles emergencies, cheaper', bucket: 'u', why: '**Speed and low cost** are the advantages of one chamber.' },
            { text: 'Risk of hasty laws; easy to manipulate', bucket: 'u', why: '**Hasty laws** are the weakness of one chamber.' },
            { text: 'Nigeria (Senate + House of Reps), Britain (Lords + Commons), USA', bucket: 'b', why: '**These** are bicameral examples.' },
            { text: 'Checks and balances, thoroughness, informed input', bucket: 'b', why: '**A second chamber checking the first** is the bicameral advantage.' },
            { text: 'Expensive, and delays bills', bucket: 'b', why: '**Cost and delay** are the bicameral weaknesses.' },
            { text: 'Common in federal states and many democracies', bucket: 'b', why: '**Federal states** tend to have two chambers.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why is the legislature “the first to go” in a coup?',
          options: [
            { text: 'Because it has the fewest members.', why: 'Size isn’t the reason.' },
            { text: 'Because military rule governs by decree, with no need for an elected law-making body. The legislature is the organ most vulnerable to political instability.', correct: true, why: 'Soldiers keep an executive (the junta leader) and usually courts, but rule by decree removes the need for elected law-makers.' },
            { text: 'Because judges dissolve it.', why: 'Courts don’t dissolve legislatures in a coup.' },
            { text: 'Because it controls the army.', why: 'The army falls under the executive, not the legislature.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'The President nominates a new minister. In Nigeria, who screens and confirms the nominee?',
          options: [
            { text: 'Both chambers of the National Assembly together', why: 'Only one chamber does this.' },
            { text: 'The Senate alone', correct: true, why: 'In Nigeria and the USA, the upper house (Senate) alone screens and confirms appointments such as ministers and ambassadors.' },
            { text: 'The Supreme Court', why: 'Confirming appointments is a legislative job.' },
            { text: 'The civil service', why: 'Civil servants don’t confirm their own ministers.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The legislature: covered.',
          recap: [
            'Makes laws; **paramount** (Garner); most **vulnerable** to instability. Parliament, Congress, Diet, National Assembly.',
            '**Unicameral**: quick, cheap, hasty. **Bicameral**: checks and balances, slow, expensive. The Senate confirms appointments.',
          ],
          why: 'Laws are made and enforced. But who decides what they mean, and whether they’re allowed at all?',
        },
      ],
    },
    {
      name: 'The judiciary',
      terms: [
        ['Judiciary', 'The courts: interprets and applies the law and settles disputes. Topped by a Supreme Court.'],
        ['Judicial review', 'Courts can annul laws that conflict with the constitution or a higher norm.'],
        ['Judicial independence safeguards', 'Guaranteed tenure, competent judges, respect for rule of law, salaries from the Consolidated Fund.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'The judiciary',
          title: 'The courts interpret and apply the law, and settle disputes.',
          cards: [
            { icon: 'judiciary', title: 'Structure', text: 'Topped by a **Supreme Court**, the court of final appeal, with lower courts beneath it.' },
            { title: 'Reputation', text: 'Seen as the **least harmful** organ and **“the last hope of the common man.”**' },
            { title: 'Judicial review', text: 'Courts can **annul laws** that conflict with the constitution or a higher norm.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Apply it',
          prompt: 'The judiciary must be independent and impartial. Which of these are safeguards your notes list?',
          options: [
            { text: 'Guaranteed tenure for judges', correct: true, why: '**Guaranteed tenure** means judges can’t simply be sacked for unpopular rulings.' },
            { text: 'Appointment of competent judges', correct: true, why: '**Competent appointments** are listed.' },
            { text: 'Paying judges’ salaries from the Consolidated Fund', correct: true, why: '**Consolidated Fund salaries** mean the executive can’t starve judges into obedience.' },
            { text: 'Respect for the rule of law', correct: true, why: '**Rule of law** is listed.' },
            { text: 'Letting the President approve every judgment', why: '**Presidential approval** would destroy judicial independence.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why might paying judges from the Consolidated Fund protect their independence?',
          options: [
            { text: 'It makes judges richer than politicians.', why: 'The point isn’t the amount.' },
            { text: 'Their pay is guaranteed by law, so the executive or legislature can’t cut it to punish rulings they dislike.', correct: true, why: 'Secure pay, like secure tenure, removes a lever others could use to pressure judges.' },
            { text: 'It lets judges set their own salaries.', why: 'Judges don’t set their own pay.' },
            { text: 'It means judges work for the President.', why: 'It does the opposite: it shields them from the executive.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The judiciary: understood.',
          recap: [
            'Interprets law and settles disputes; Supreme Court on top; **“last hope of the common man”**.',
            '**Judicial review** annuls unconstitutional laws. Independence: tenure, competent judges, rule of law, Consolidated Fund.',
          ],
          why: 'Now let’s follow the okada ban through all three organs.',
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
          title: 'Which organ holds the paramount place?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'The executive is the most visible organ, but the notes, following Garner, give the paramount place to the legislature.',
        },
        {
          type: 'story',
          art: 'assembly',
          eyebrow: 'Case file',
          title: 'The okada ban',
          body: 'A state government wants commercial motorcycles off its roads. The bill is drafted, debated, signed, enforced and finally challenged in court.\n\nFour questions. Each one asks more of you.',
          cta: 'Open the case',
        },
        {
          type: 'order',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'Put the life of the okada ban in order.',
          items: [
            'The state House of Assembly debates and passes the bill.',
            'The Governor signs it into law.',
            'Ministries and police begin enforcing it.',
            'Riders challenge the law in court.',
            'The court rules on whether the law is constitutional.',
          ],
          hint: 'Make the law, sign it, apply it, challenge it, adjudicate it.',
          explain: 'Legislature (making), executive (applying), judiciary (adjudicating). All three organs in one story.',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'The court finds the ban conflicts with the constitution and annuls it. What is this power called?',
          options: [
            { text: 'Prerogative of mercy', why: 'That’s the executive’s power to pardon.' },
            { text: 'Judicial review', correct: true, why: 'Annulling a law that conflicts with the constitution is judicial review.' },
            { text: 'Control of the purse', why: 'That’s an executive function over money.' },
            { text: 'Delimitation', why: 'That’s drawing constituency boundaries.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'The Governor is furious and proposes cutting the judges’ salaries. Why can’t he easily do it?',
          options: [
            { text: 'Judges are paid from the Consolidated Fund, one of the safeguards of judicial independence.', correct: true, why: 'That’s exactly the protection the notes describe.' },
            { text: 'Judges work for the legislature.', why: 'Judges aren’t employees of the legislature.' },
            { text: 'The army protects judges’ pay.', why: 'Nothing to do with the army.' },
            { text: 'Governors have no control over money at all.', why: 'The executive does control the purse in general, which is why judges’ pay is shielded.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Which statements about the whole case are true?',
          options: [
            { text: 'The legislature made the law, the executive enforced it, and the judiciary interpreted it.', correct: true, why: '**All three organs** played their classic roles.' },
            { text: 'The riders went to the organ called “the last hope of the common man.”', correct: true, why: '**The judiciary** is described that way.' },
            { text: 'If a coup happened mid-case, the courts would be the first organ suspended.', why: '**The legislature** is the first to go in a coup.' },
            { text: 'The career civil servants in the ministry carrying out the ban are part of the permanent executive.', correct: true, why: '**Career civil servants** form the permanent executive, unlike the Governor and commissioners.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know the three organs inside out.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
