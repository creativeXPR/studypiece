// GES 103 · Chapter 9 · Lesson 3: subfields and contributions of psychology (notes 9.7–9.8).

const HOOK = [
  ['A clinical psychologist', 'Possibly', 'Clinical psychologists diagnose and treat mental disorders and personal problems.'],
  ['A counselling psychologist', 'Also possible', 'Counselling psychologists help with everyday problems and life adjustment.'],
  ['An industrial/organisational psychologist', 'Not for this', 'I/O psychologists work on people at work: hiring, teams, productivity.'],
  ['A forensic psychologist', 'Not for this', 'Forensic psychologists work on crime, prisons and the courts.'],
];

export default {
  id: 'psych-at-work',
  title: 'Psychology at work',
  covers: 'Pure vs applied psychology, the subfields, contributions of psychology',
  minutes: 12,
  sections: [
    {
      name: 'Pure & applied',
      terms: [
        ['Pure / basic psychology', 'Does research and builds theories and models.'],
        ['Applied psychology', 'Applies psychological principles to practical problems.'],
        ['Clinical vs counselling', 'Clinical: diagnosis and treatment of mental disorders. Counselling: everyday problems and life adjustment.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'lab',
          eyebrow: 'Chapter 9 · Lesson 3',
          title: 'Psychology at work',
          body: 'Your friend Zainab has felt stressed and unsettled since moving to a new city for her first job. She isn’t ill, she just can’t seem to adjust.\n\nShe wants to see “a psychologist”. But there are many kinds.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'lab',
          poll: 'hook',
          prompt: 'Which kind of psychologist should Zainab see?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Hold that thought.',
          pollBody: 'Two answers are close, but one fits her situation better. You’ll see why.',
        },
        {
          type: 'sort',
          eyebrow: 'Two divisions',
          prompt: 'Psychology has pure (basic) and applied branches. Sort these activities.',
          buckets: [
            { id: 'p', label: 'Pure / basic', hint: 'builds theory' },
            { id: 'a', label: 'Applied', hint: 'solves problems' },
          ],
          items: [
            { text: 'Running lab experiments to build a theory of memory', bucket: 'p', why: '**Building theories through research** is pure psychology.' },
            { text: 'Developing a new model of how attention works', bucket: 'p', why: '**Models** come from pure research.' },
            { text: 'Helping a company reduce staff burnout', bucket: 'a', why: '**Solving a practical workplace problem** is applied.' },
            { text: 'Designing a programme to help prisoners reintegrate', bucket: 'a', why: '**Practical rehabilitation** is applied.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'What’s the key difference between clinical and counselling psychology?',
          options: [
            { text: 'Clinical treats mental disorders; counselling helps with everyday problems and life adjustment.', correct: true, why: 'Clinical works with disorders (in hospitals, prisons, clinics); counselling helps ordinary people cope, often in schools or industry.' },
            { text: 'They are exactly the same.', why: 'Your notes list them as separate subfields.' },
            { text: 'Counselling only works in courts.', why: 'That’s closer to forensic psychology.' },
            { text: 'Clinical only studies animals.', why: 'Clinical psychology works with people.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Pure and applied: split.',
          recap: [
            '**Pure/basic** builds theories and models. **Applied** solves practical problems.',
            '**Clinical**: mental disorders. **Counselling**: everyday problems and adjustment.',
          ],
          why: 'Clinical and counselling are just two of twelve subfields in your notes. Let’s place the rest.',
        },
      ],
    },
    {
      name: 'Subfields',
      terms: [
        ['School vs educational', 'School: children’s educational needs. Educational: teaching and learning, tests, methods.'],
        ['I/O psychology', 'People at work: right person for the job, teams, pay, productivity and satisfaction.'],
        ['Social, developmental, forensic', 'Influence of others; change across the lifespan; crime, prisons and courts.'],
        ['Cross-cultural, environmental, experimental, health', 'Behaviour across cultures; effects of the environment; controlled lab research; behaviour and health.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Who would take each case?',
          buckets: [
            { id: 'sc', label: 'School' },
            { id: 'ed', label: 'Educational' },
            { id: 'io', label: 'Industrial / Organisational' },
            { id: 'fo', label: 'Forensic' },
          ],
          items: [
            { text: 'Identifying a pupil’s learning needs and advising her teachers', bucket: 'sc', why: '**Identifying a child’s educational needs** and advising teachers is school psychology.' },
            { text: 'Evaluating whether a new teaching method improves memory', bucket: 'ed', why: '**Evaluating teaching methods** is educational psychology.' },
            { text: 'Devising a fair university entrance test', bucket: 'ed', why: '**Devising tests** is educational psychology.' },
            { text: 'Picking the right person for a bank manager role', bucket: 'io', why: '**The right person for the right job** is I/O psychology.' },
            { text: 'Designing bonuses that boost productivity and satisfaction', bucket: 'io', why: '**Pay, bonuses and productivity** are I/O topics.' },
            { text: 'Helping select police candidates', bucket: 'fo', why: '**Selecting police candidates** is forensic psychology.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'More subfields. Who studies each?',
          buckets: [
            { id: 'so', label: 'Social' },
            { id: 'dv', label: 'Developmental' },
            { id: 'en', label: 'Environmental' },
            { id: 'he', label: 'Health' },
          ],
          items: [
            { text: 'Why students change their opinion when the whole class disagrees', bucket: 'so', why: '**Thoughts shaped by other people** is social psychology.' },
            { text: 'How thinking changes from childhood to old age', bucket: 'dv', why: '**Change across the lifespan** is developmental psychology.' },
            { text: 'How overcrowding in hostels affects stress', bucket: 'en', why: '**Effects of overcrowding** are environmental psychology.' },
            { text: 'How behaviour helps people recover after surgery', bucket: 'he', why: '**Behaviour that aids recovery** is health psychology.' },
          ],
          explain: 'Also on the list: **cross-cultural** (comparing behaviour across cultures) and **experimental** (controlled lab research on sensation, learning, motivation and emotion).',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A researcher compares how Yoruba, Hausa and British students handle exam stress. Which subfield, and which other subfield is it close to?',
          options: [
            { text: 'Cross-cultural psychology, which is close to social psychology', correct: true, why: 'Comparing behaviour across cultures is cross-cultural psychology, which your notes describe as close to social psychology.' },
            { text: 'Forensic psychology, close to clinical', why: 'No crime or courts are involved.' },
            { text: 'Experimental psychology, close to environmental', why: 'It compares cultures, not controlled lab conditions.' },
            { text: 'School psychology, close to I/O', why: 'It isn’t about a child’s learning needs.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Subfields: placed.',
          recap: [
            '**School, educational, I/O, forensic**: children’s needs, teaching and tests, work, crime and courts.',
            '**Social, developmental, environmental, health, cross-cultural, experimental**: others, lifespan, surroundings, health, cultures, the lab.',
          ],
          why: 'What has all this actually done for the world? Your notes list five contributions.',
        },
      ],
    },
    {
      name: 'Contributions',
      terms: [
        ['Contributions (Shenge and Adu 2017)', 'Military, psychological testing, teaching and learning, the world of work, health and well-being.'],
        ['Military contribution', 'Hovland, Lumsdaine and Sheffield (1949) helped train pilots to overcome fear and return to combat.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Shenge and Adu (2017)',
          title: 'Five contributions of psychology',
          cards: [
            { title: 'Military', text: '**Hovland, Lumsdaine and Sheffield (1949)** helped train pilots to overcome fear and return to combat.' },
            { title: 'Testing', text: 'Psychological **testing and assessment**, pioneered by **Kasschau and Lewin**.' },
            { title: 'Teaching and learning', text: 'Knowing **what to teach** learners of different ages.' },
            { title: 'World of work', text: '**More humanised** workplaces.' },
            { title: 'Health', text: 'Health and well-being, giving rise to **health psychology**.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Who helped train pilots to overcome fear and return to combat?',
          options: [
            { text: 'Kasschau and Lewin', why: 'They pioneered psychological testing.' },
            { text: 'Hovland, Lumsdaine and Sheffield (1949)', correct: true, why: 'That’s psychology’s military contribution.' },
            { text: 'Wertheimer, Köhler and Koffka', why: 'They founded Gestalt psychology.' },
            { text: 'Shenge and Adu', why: 'They wrote the list of contributions (2017).' },
          ],
        },
        {
          type: 'bridge',
          title: 'Contributions: noted.',
          recap: [
            '**Military** (Hovland, Lumsdaine, Sheffield 1949), **testing** (Kasschau and Lewin).',
            '**Teaching and learning**, **humanised workplaces**, **health psychology**.',
          ],
          why: 'Final case: send each person to the right psychologist.',
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
          title: 'Who should Zainab see?',
          body: 'Here’s how each answer from the start fits.',
          rows: HOOK,
          after: 'Zainab isn’t ill; she’s struggling to adjust. That makes **counselling psychology** the best fit, though a clinical psychologist would help if things got worse.',
        },
        {
          type: 'story',
          eyebrow: 'Case file',
          title: 'The referral desk',
          body: 'You’re volunteering at a university referral desk. Five people arrive with five very different needs.\n\nThe last question is the trickiest.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: 'A hospital needs someone to diagnose and treat a patient with a serious mental disorder.',
          options: [
            { text: 'Clinical psychologist', correct: true, why: 'Diagnosis and treatment of mental disorders is clinical psychology.' },
            { text: 'Educational psychologist', why: 'Educational psychology focuses on teaching and learning.' },
            { text: 'Environmental psychologist', why: 'That’s about the effects of surroundings.' },
            { text: 'Experimental psychologist', why: 'Experimental psychologists do controlled lab research.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: 'A court wants help understanding a witness’s reliability.',
          options: [
            { text: 'Forensic psychologist', correct: true, why: 'Courtroom dynamics are forensic psychology.' },
            { text: 'Health psychologist', why: 'Health psychology is about behaviour and health.' },
            { text: 'School psychologist', why: 'School psychology deals with children’s educational needs.' },
            { text: 'Developmental psychologist', why: 'Development across the lifespan isn’t the issue.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'A telecom company’s staff are unhappy and productivity is falling.',
          options: [
            { text: 'Industrial/organisational psychologist', correct: true, why: 'Productivity and satisfaction at work are I/O psychology.' },
            { text: 'Cross-cultural psychologist', why: 'The issue is the workplace, not comparing cultures.' },
            { text: 'Clinical psychologist', why: 'Nobody has been diagnosed with a disorder.' },
            { text: 'Pure psychologist', why: 'They need a practical solution, which is applied work.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'A flood has displaced a community. Researchers want to study its psychological effects.',
          options: [
            { text: 'Environmental psychologist', correct: true, why: 'Effects of the environment, including disasters, are environmental psychology.' },
            { text: 'Forensic psychologist', why: 'No crime is involved.' },
            { text: 'Educational psychologist', why: 'This isn’t about teaching or learning.' },
            { text: 'I/O psychologist', why: 'It isn’t about the workplace.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'A parent says: “My 7-year-old struggles to read, and I wonder if it’s normal for his age.” Which subfields could genuinely help?',
          options: [
            { text: 'School psychology: identifying his educational needs and advising teachers', correct: true, why: '**School psychologists** identify children’s learning needs.' },
            { text: 'Developmental psychology: what’s typical at each age', correct: true, why: '**Developmental psychologists** study change across the lifespan, including children.' },
            { text: 'Forensic psychology', why: '**No crime or court** is involved.' },
            { text: 'Industrial/organisational psychology', why: '**This isn’t a workplace issue.**' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 9 complete.',
          body: 'From Wundt’s lab to the referral desk: you know what psychology is and where it works. Key terms below.',
        },
      ],
    },
  ],
};
