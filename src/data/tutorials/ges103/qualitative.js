// GES 103 · Chapter 6 · Lesson 4: qualitative analysis (notes 6.15).

const HOOK = [
  ['Count how often each newspaper mentions it', 'Formal content analysis', 'Counting themes gives numbers. Good, but it can miss meaning.'],
  ['Read closely for each paper’s hidden bias', 'Thematic analysis', 'Uncovers ideological bias, the meaning beneath the words.'],
  ['Study the words and images they use', 'Textual analysis', 'Linguistic devices and signs (semiotics) that shape interpretation.'],
  ['Ask readers how the coverage affected them', 'Audience analysis', 'Studies audience responses to media content.'],
];

export default {
  id: 'qualitative',
  title: 'Reading between the lines',
  covers: 'Content analysis, Pawson’s four approaches, patterns, cross-case analysis, grounded theory, coding',
  minutes: 13,
  sections: [
    {
      name: 'Content analysis',
      terms: [
        ['Qualitative analysis', 'Interpreting non-numerical observations to find meanings and patterns; inseparable from the guiding theory.'],
        ['Content analysis', 'Studying recorded communication to find hidden meaning: “Who says what, to whom, why, how and with what effect?” (Babbie 2000).'],
        ['Pawson’s four approaches (1995)', 'Formal (counts), thematic (ideological bias), textual (signs, semiotics), audience (responses).'],
      ],
      screens: [
        {
          type: 'story',
          art: 'newsstand',
          eyebrow: 'Chapter 6 · Lesson 4',
          title: 'Reading between the lines',
          body: 'Back at the newspaper stand. This time you’re not arguing, you’re researching: how do Nigerian newspapers cover the debate on **restructuring**?\n\nYou have a year of front pages. Numbers won’t capture everything here.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'newsstand',
          poll: 'hook',
          prompt: 'How would you start analysing a year of newspaper coverage?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Noted.',
          pollBody: 'Each of those is one of Ray Pawson’s four approaches to content analysis. We’ll come back to yours.',
        },
        {
          type: 'story',
          eyebrow: 'Content analysis',
          title: '“Who says what, to whom, why, how and with what effect?”',
          body: 'That’s Babbie’s (2000) summary of ==content analysis==: studying recorded communication (newspapers, books, paintings, speeches, web pages) to find hidden meaning.\n\n**Coding** turns raw content into standard categories, for example classifying editorials as propagandistic or not.\n\nQualitative analysis is typical of field and historical research. Data collection and analysis are inseparable from the guiding theory.',
        },
        {
          type: 'sort',
          eyebrow: 'Ray Pawson (1995)',
          prompt: 'Four approaches to content analysis. Match each study.',
          buckets: [
            { id: 'f', label: 'Formal', hint: 'counts themes' },
            { id: 't', label: 'Thematic', hint: 'ideological bias' },
            { id: 'x', label: 'Textual', hint: 'signs and language' },
            { id: 'a', label: 'Audience', hint: 'responses' },
          ],
          items: [
            { text: 'Rating every editorial from very liberal to very conservative and counting each', bucket: 'f', why: '**Rating and counting** gives numerical results: formal content analysis.' },
            { text: 'Uncovering one paper’s consistent political bias in its coverage', bucket: 't', why: '**Revealing the author’s ideological bias** is thematic analysis.' },
            { text: 'Studying how cult slang shapes how readers interpret a story', bucket: 'x', why: '**Linguistic devices and signs** (semiotics) are textual analysis.' },
            { text: 'Surveying readers on how the coverage changed their views', bucket: 'a', why: '**Audience responses** are audience analysis.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Content analysis: covered.',
          recap: [
            '**Content analysis**: who says what, to whom, why, how, with what effect (Babbie). Coding creates categories.',
            '**Pawson**: formal (counts), thematic (bias), textual (semiotics), audience (responses).',
          ],
          why: 'Once you have categories, you look for patterns across your data and across your cases.',
        },
      ],
    },
    {
      name: 'Finding patterns',
      terms: [
        ['Six ways to find patterns', 'Lofland and Lofland (1995): frequency, magnitude, structures, process, causes, consequences.'],
        ['Cross-case analysis', 'Miles and Huberman (1994): variable-oriented (one variable across cases) vs case-oriented (each case in detail).'],
        ['Grounded theory (GTM)', 'Glaser and Strauss: an inductive approach; theories are generated from the data, not deduced beforehand.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Lofland and Lofland (1995)',
          title: 'Six ways to find patterns',
          body: 'Your notes use quarrels between workplace friends as the example.',
          cards: [
            { title: 'Frequency', text: 'How **often** do quarrels happen?' },
            { title: 'Magnitude', text: 'How **serious** are they?' },
            { title: 'Structures', text: 'What **types** of quarrel are there?' },
            { title: 'Process', text: 'How do they **unfold** over time?' },
            { title: 'Causes', text: 'What **triggers** them?' },
            { title: 'Consequences', text: 'What happens **afterwards**?' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'You track how a restructuring story develops across a week: the first report, the reactions, the follow-ups. Which of Lofland and Lofland’s six is this?',
          options: [
            { text: 'Frequency', why: 'Frequency asks how often, not how it unfolds.' },
            { text: 'Process', correct: true, why: 'How something unfolds over time is process.' },
            { text: 'Magnitude', why: 'Magnitude is about size or seriousness.' },
            { text: 'Consequences', why: 'Consequences are the results, not the sequence.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Miles and Huberman (1994)',
          prompt: 'Cross-case analysis comes in two forms. Sort these.',
          buckets: [
            { id: 'v', label: 'Variable-oriented' },
            { id: 'c', label: 'Case-oriented' },
          ],
          items: [
            { text: 'Explains one variable, such as editorial tone, across all 20 newspapers', bucket: 'v', why: '**One variable across many cases** is variable-oriented.' },
            { text: 'Compares how ownership relates to bias across every paper', bucket: 'v', why: '**A relationship traced across cases** is variable-oriented.' },
            { text: 'Studies one newspaper’s coverage in full detail before moving to the next', bucket: 'c', why: '**Each case in detail** is case-oriented.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'In grounded theory (Glaser and Strauss), where does the theory come from?',
          options: [
            { text: 'It is chosen before collecting any data, then tested.', why: 'That’s deductive, the opposite of grounded theory.' },
            { text: 'It is generated from the data itself: an inductive approach.', correct: true, why: 'The theory is “grounded” in the data, not deduced beforehand.' },
            { text: 'It is copied from official statistics.', why: 'Grounded theory builds from qualitative data.' },
            { text: 'It comes from SPSS output.', why: 'SPSS is for quantitative analysis.' },
          ],
          explain: 'Link back to Chapter 5: grounded theory is **inductive** (particular → general).',
        },
        {
          type: 'bridge',
          title: 'Patterns: found.',
          recap: [
            '**Lofland and Lofland**: frequency, magnitude, structures, process, causes, consequences.',
            '**Miles and Huberman**: variable- vs case-oriented. **Grounded theory** (Glaser and Strauss): inductive, theory from data.',
          ],
          why: 'The heart of qualitative analysis is coding. It happens in three rounds.',
        },
      ],
    },
    {
      name: 'Coding',
      terms: [
        ['Open coding', 'Name the main concepts in the data (e.g. employer, pay increase, time of service).'],
        ['Axial coding', 'Re-code for more analytic concepts (e.g. perceived fairness, power relation).'],
        ['Selective coding', 'The central code everything links to (e.g. employer–employee relation).'],
        ['Memoing and concept mapping', 'Notes on each code’s meaning and relationships; a graphical display of concepts and links (Babbie 2000).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Coding',
          title: 'One sentence, three rounds of coding.',
          body: 'Your notes’ example. A worker says:\n\n==“My employer will consider a pay increase after a year.”==\n\nCoding classifies each unit of data. **The concept is the organising principle.** Watch the codes get more analytical each round.',
        },
        {
          type: 'order',
          eyebrow: 'Apply it',
          prompt: 'Put the three rounds of coding in order, with their codes for that sentence.',
          items: [
            '**Open coding**: employer, pay increase, time of service',
            '**Axial coding**: perceived fairness, power relation',
            '**Selective coding**: the employer–employee relation',
          ],
          hint: 'From the plain concepts in the sentence, to analytic ideas, to the single central code.',
          explain: 'Each round climbs from what was said to what it means.',
        },
        {
          type: 'order',
          eyebrow: 'Apply it',
          prompt: 'Put the whole process of qualitative analysis in order.',
          items: [
            '**Coding**: classify each unit of data',
            '**Memoing**: write notes on each code’s meaning and relationships',
            '**Concept mapping** (optional): a graphical display of concepts and their links',
          ],
          hint: 'Code first, write about the codes, then draw how they connect.',
          explain: 'The final report is built from the memos.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which of these are software packages for qualitative analysis named in your notes?',
          options: [
            { text: 'NVivo', correct: true, why: '**NVivo** is one of the two most popular.' },
            { text: 'ATLAS.ti', correct: true, why: '**ATLAS.ti** is one of the two most popular.' },
            { text: 'The Ethnograph', correct: true, why: '**The Ethnograph** is listed.' },
            { text: 'SPSS', why: '**SPSS** is for quantitative analysis.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Coding: cracked.',
          recap: [
            '**Open** (plain concepts) → **axial** (analytic concepts) → **selective** (the central code).',
            'Coding → **memoing** → **concept mapping**. Most popular software: **ATLAS.ti and NVivo**.',
          ],
          why: 'Finish the restructuring study, and Chapter 6.',
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
          title: 'How would you analyse a year of coverage?',
          body: 'Each answer from the start is one of Pawson’s approaches.',
          rows: HOOK,
          after: 'A strong study often combines approaches: count first (formal), then read closely (thematic).',
        },
        {
          type: 'story',
          art: 'newsstand',
          eyebrow: 'Case file',
          title: 'The restructuring study',
          body: 'You’ve collected every front page and editorial on restructuring from five national papers. Time to analyse.\n\nFour questions. The last one combines quantitative and qualitative ideas.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'An editorial says: “Federal might crushes the regions.” You code it first as “federal government” and “regions”, then later as “centre–periphery conflict”. What have you just done?',
          options: [
            { text: 'Open coding, then axial coding', correct: true, why: 'Naming the plain concepts is open coding. Re-coding them as an analytic concept is axial coding.' },
            { text: 'Selective coding twice', why: 'Selective coding finds the single central code. You’re not there yet.' },
            { text: 'Data entry into SPSS', why: 'That’s quantitative preparation.' },
            { text: 'Audience analysis', why: 'You’re analysing the text, not reader responses.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'You didn’t start with a theory. After coding hundreds of editorials, a theory about regional ownership and editorial tone emerges. Which approach is this?',
          options: [
            { text: 'Grounded theory', correct: true, why: 'A theory generated inductively from the data is grounded theory (Glaser and Strauss).' },
            { text: 'Positivism with a fixed hypothesis', why: 'You didn’t begin with a hypothesis.' },
            { text: 'Formal content analysis only', why: 'Counting alone wouldn’t generate a theory like this.' },
            { text: 'Covert observation', why: 'You’re analysing documents, not observing people.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'You study each of the five papers in depth, one at a time, before comparing them. Which kind of cross-case analysis?',
          options: [
            { text: 'Variable-oriented', why: 'Variable-oriented follows one variable across all cases.' },
            { text: 'Case-oriented', correct: true, why: 'Studying each case in detail is case-oriented (Miles and Huberman).' },
            { text: 'Multivariate', why: 'Multivariate is a quantitative term for several variables at once.' },
            { text: 'Paired-samples', why: 'That’s a t-test design.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Your supervisor suggests combining your qualitative coding with a count of how many editorials took each side. Which ideas from Chapter 6 does this involve?',
          options: [
            { text: 'Formal content analysis', correct: true, why: '**Counting** positions is formal content analysis.' },
            { text: 'Methodological pluralism', correct: true, why: '**Combining qualitative and quantitative** is methodological pluralism.' },
            { text: 'A frequency distribution of editorial positions', correct: true, why: '**Counts and percentages per position** form a frequency distribution.' },
            { text: 'A paired-samples t-test', why: '**Nothing is measured twice** on the same subjects.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 6 complete.',
          body: 'From questionnaires to coding: you can design, describe and analyse research. Key terms below.',
        },
      ],
    },
  ],
};
