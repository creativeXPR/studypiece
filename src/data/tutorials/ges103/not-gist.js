// GES 103 · Chapter 5 · Lesson 2: what sociology is not, the sociological imagination, scientific method (notes 5.5–5.7).

const HOOK = [
  ['Yes. They’re discussing society', 'Not by your notes', 'Two problems: they speak from a self-centred, individual view, and there is no methodised knowledge.'],
  ['No. It’s just opinions with no method', 'Exactly', 'Sociology needs a system of methodised knowledge: science.'],
  ['Only if a graduate is speaking', 'Not the test', 'Qualifications don’t matter. Method does.'],
  ['Yes, if they mention statistics', 'Not enough', 'Quoting a number isn’t a scientific method. Sociologists test their ideas systematically.'],
];

export default {
  id: 'not-gist',
  title: 'Not newspaper-stand gist',
  covers: 'What sociology is not, the sociological imagination, scientific method',
  minutes: 13,
  sections: [
    {
      name: 'What it isn’t',
      terms: [
        ['Not newspaper-stand gist', 'Two reasons: a self-centred, individual perspective, and no system of methodised knowledge.'],
        ['Not armchair sociology', 'Trying to understand society by common sense, without scientific methods. Sociologists “get up from their armchairs” and test theories.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'newsstand',
          eyebrow: 'Chapter 5 · Lesson 2',
          title: 'Not newspaper-stand gist',
          body: '7 am at the newspaper stand by the junction. Mr. Adio reads a headline about rising school fees and declares: “It’s because young people of today are lazy!” Baba Sule disagrees loudly.\n\nTen minutes of passionate debate about society. No one has bought a paper.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'newsstand',
          poll: 'hook',
          prompt: 'Is this morning debate at the newspaper stand sociology?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Keep that answer in mind.',
          pollBody: 'Your notes use this exact Nigerian scene to explain what sociology is NOT.',
        },
        {
          type: 'reveal',
          eyebrow: 'What sociology is not',
          title: 'Two things sociology is not',
          cards: [
            { title: 'Newspaper-stand gist', text: 'Not sociology, for two reasons: (1) people speak from a **self-centred, individual perspective**; (2) there is **no system of methodised knowledge**.' },
            { title: 'Armchair sociology', text: 'Trying to understand society through **common sense**, without scientific methods. Sociologists “**get up from their armchairs**” and test theories.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Sociology, or not? Sort each of these.',
          buckets: [
            { id: 's', label: 'Sociology', hint: 'method + evidence' },
            { id: 'n', label: 'Not sociology', hint: 'opinion or common sense' },
          ],
          items: [
            { text: 'Surveying 500 households to see how fee increases affect school enrolment', bucket: 's', why: '**A systematic survey** is methodised knowledge.' },
            { text: 'Testing a theory about youth unemployment against national data', bucket: 's', why: '**Testing a theory against data** is getting up from the armchair.' },
            { text: '“Young people are lazy. Everybody knows that.”', bucket: 'n', why: '**“Everybody knows”** is common sense, not tested knowledge.' },
            { text: 'A heated debate at the junction, based on what each man has seen in his own life', bucket: 'n', why: '**Speaking from personal experience only** is the self-centred perspective your notes warn about.' },
            { text: 'Explaining crime from a comfortable chair, without ever collecting data', bucket: 'n', why: '**No data collected** is literally armchair sociology.' },
          ],
        },
        {
          type: 'bridge',
          title: 'What it isn’t: clear.',
          recap: [
            '**Not newspaper-stand gist**: self-centred individual views; no methodised knowledge.',
            '**Not armchair sociology**: common sense without testing. Sociologists get up and test theories.',
          ],
          why: 'Mr. Adio blamed individuals. A sociologist named C. Wright Mills showed why that’s usually the wrong place to look.',
        },
      ],
    },
    {
      name: 'Sociological imagination',
      terms: [
        ['Sociological imagination', 'C. Wright Mills (1959): seeing the structure of society and individual lives at the same time.'],
        ['Personal trouble vs public issue', 'One person losing a job is a private trouble; rising unemployment rates make it a public issue.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'C. Wright Mills (1916–1962)',
          title: 'The sociological imagination',
          body: 'In 1959, Mills described the ability to study ==“the structure of society” and “individual lives” at the same time==.\n\nIt links **personal troubles** to **public issues**. Individual problems make sense only in the context of wider social forces.',
        },
        {
          type: 'custom',
          widget: 'imagination',
          eyebrow: 'Try it',
          title: 'Zoom out from one life to the whole society.',
          body: 'Slide from Tunde to the country and watch how the story changes.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Private trouble or public issue?',
          buckets: [
            { id: 't', label: 'Private trouble', hint: 'one person' },
            { id: 'i', label: 'Public issue', hint: 'a wider pattern' },
          ],
          items: [
            { text: 'Kemi can’t find a job after NYSC.', bucket: 't', why: '**One person’s job search** is a private trouble.' },
            { text: 'Graduate unemployment rises across the country.', bucket: 'i', why: '**A nationwide rise** is a public issue.' },
            { text: 'Your uncle’s marriage breaks down.', bucket: 't', why: '**One marriage ending** is a private trouble.' },
            { text: 'Divorce rates climb steadily over twenty years.', bucket: 'i', why: '**A rising rate** is a public issue.' },
          ],
          explain: 'The same event can be both. The sociological imagination sees the trouble and the issue at once.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'The sociological imagination combines two families of theory. Which?',
          options: [
            { text: 'Structural theories (functionalism and Marxism) with interactionist theories', correct: true, why: 'Structure (society) plus interaction (individual lives) is exactly Mills’s double vision.' },
            { text: 'Psychology with biology', why: 'Mills is combining sociological theories, not other sciences.' },
            { text: 'Divine origin with social contract', why: 'Those are theories of the state from Chapter 1.' },
            { text: 'Capitalism with socialism', why: 'Those are ideologies, not sociological theories.' },
          ],
          explain: 'Your notes add that the sociological imagination **removes bias, stereotypes and ethnocentrism**.',
        },
        {
          type: 'bridge',
          title: 'Imagination: switched on.',
          recap: [
            '**Mills (1959)**: see the structure of society and individual lives at the same time.',
            'One person jobless = **private trouble**; rising unemployment = **public issue**. Combines structural and interactionist theory.',
          ],
          why: 'Seeing patterns is a start. To claim something is true, sociology uses the scientific method.',
        },
      ],
    },
    {
      name: 'Scientific method',
      terms: [
        ['Positivism', 'Comte: using the scientific method to study society; rejects metaphysical explanations. End product: a law.'],
        ['Four steps', 'Characterisation, hypothesis, prediction, experiment (repeated in cycles).'],
        ['Inductive vs deductive', 'Inductive: observe first, then theorise (particular → general). Deductive: theory first, then specific claims (general → particular).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Positivism',
          title: 'Studying society scientifically is called positivism.',
          body: 'It comes from **Comte**. Positivism rejected metaphysical explanations in favour of systematic observation and experiment. Its end product is ==a law==, and its aim is to **explain and predict** social phenomena.\n\nThe method involves observation, hypothesis, deductions and theories. If a prediction is correct, the theory survives. If not, it’s modified or discarded.',
        },
        {
          type: 'order',
          eyebrow: 'Apply it',
          prompt: 'Put the four steps of the scientific method in order.',
          items: [
            '**Characterisation**: observation and measurement',
            '**Hypothesis**: a proposed explanation',
            '**Prediction**: logical deduction from the hypothesis',
            '**Experiment**: testing (in social science, often other data analysis)',
          ],
          hint: 'Observe, explain, predict, test.',
          explain: 'The steps repeat in cycles. Each test can send you back to observe again.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Inductive or deductive?',
          buckets: [
            { id: 'i', label: 'Inductive', hint: 'particular → general' },
            { id: 'd', label: 'Deductive', hint: 'general → particular' },
          ],
          items: [
            { text: 'Observe and collect data first, then form a theory', bucket: 'i', why: '**Data first, theory later** is inductive.' },
            { text: 'Scupin and DeCorse (1995)', bucket: 'i', why: '**Scupin and DeCorse** are cited for the inductive method.' },
            { text: 'Start from a general theory, then derive specific claims to test', bucket: 'd', why: '**Theory first** is deductive.' },
            { text: 'Dooley (1995)', bucket: 'd', why: '**Dooley** is cited for the deductive method.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A researcher predicts that students who live off campus will attend fewer lectures. The data shows no difference. What should happen to the theory?',
          options: [
            { text: 'Keep it anyway, because it seemed sensible.', why: 'That’s common sense overriding evidence, the armchair mistake.' },
            { text: 'Modify or discard it, because the prediction failed.', correct: true, why: 'In the scientific method, a theory survives only while its predictions hold.' },
            { text: 'Change the data to fit.', why: 'Never. That isn’t science.' },
            { text: 'Declare it a law.', why: 'A law needs predictions that hold, not ones that fail.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Method: mastered.',
          recap: [
            '**Positivism** (Comte): science over metaphysics; end product a **law**; explain and predict.',
            'Steps: **characterisation → hypothesis → prediction → experiment**. Inductive (data first) vs deductive (theory first).',
          ],
          why: 'Back to the newspaper stand, with everything you now know.',
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
          title: 'Is newspaper-stand debate sociology?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'The gist at the junction can raise good questions. Sociology starts when someone tests them.',
        },
        {
          type: 'story',
          art: 'newsstand',
          eyebrow: 'Case file',
          title: 'Turning gist into research',
          body: 'A sociology student overhears Mr. Adio’s claim that rising school fees are “because young people are lazy”. She decides to investigate properly.\n\nFour questions, getting harder.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'Why is Mr. Adio’s claim not sociology?',
          options: [
            { text: 'Because it’s about young people.', why: 'Young people are a perfectly good topic.' },
            { text: 'It comes from his individual perspective, with no methodised knowledge behind it.', correct: true, why: 'Those are the two reasons your notes give.' },
            { text: 'Because he isn’t a lecturer.', why: 'Who says it doesn’t matter. How it’s known does.' },
            { text: 'Because it might be true.', why: 'Even a true claim isn’t sociology without method.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'She first spends weeks recording fees, enrolment and family incomes, and only then proposes an explanation. Which method is this?',
          options: [
            { text: 'Deductive', why: 'Deductive starts from a theory. She started from data.' },
            { text: 'Inductive', correct: true, why: 'Collecting data first and then forming a theory moves from particular to general.' },
            { text: 'Armchair', why: 'She left the armchair to collect data.' },
            { text: 'Metaphysical', why: 'Positivism rejects metaphysical explanations.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'Her hypothesis: “Fees rose because government funding to schools fell.” Which step of the scientific method comes next?',
          options: [
            { text: 'Characterisation', why: 'That was the observation she already did.' },
            { text: 'Prediction: deduce what should be true if the hypothesis is right', correct: true, why: 'After the hypothesis comes a prediction, for example that schools with the biggest funding cuts raised fees the most.' },
            { text: 'Declare a law immediately', why: 'A law comes only after predictions survive testing.' },
            { text: 'Skip to cabinet formation', why: 'That’s Chapter 2’s election steps.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'She concludes that one family’s struggle with fees is part of a national pattern. Which ideas from this lesson is she using?',
          options: [
            { text: 'The sociological imagination', correct: true, why: '**Linking a private trouble to a public issue** is Mills’s sociological imagination.' },
            { text: 'Positivism', correct: true, why: '**Testing explanations with evidence** is the positivist approach.' },
            { text: 'Armchair sociology', why: '**She collected data**, so this isn’t armchair sociology.' },
            { text: 'The newspaper-stand method', why: '**That isn’t a method.** That’s the point.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can tell sociology from gist.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
