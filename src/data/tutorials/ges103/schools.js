// GES 103 · Chapter 9 · Lesson 2: three philosophical issues, early schools, contemporary approaches (notes 9.4–9.6).

const HOOK = [
  ['They just didn’t study hard enough', 'Behavioural or humanistic?', 'A behaviourist looks at what they actually did; a humanist stresses their freedom to choose.'],
  ['Their brain chemistry or genes', 'The biological approach', 'Brain, nervous system, hormones and genetics.'],
  ['Hidden worries they aren’t aware of', 'Psychoanalysis', 'Freud: the unconscious mind drives behaviour.'],
  ['How they process and remember information', 'The cognitive approach', 'How we process, store and use information.'],
];

export default {
  id: 'schools',
  title: 'Big questions, rival schools',
  covers: 'Free will, mind–body, nature–nurture; structuralism, functionalism, Gestalt; six contemporary approaches',
  minutes: 14,
  sections: [
    {
      name: 'Big questions',
      terms: [
        ['Free will vs determinism', 'Behaviour freely chosen vs everything has a cause. Wegner (2002): free will is an illusion.'],
        ['Mind–body question', 'Dualism: mind is distinct from the brain. Monism: mind and brain are the same (Hergenhahn 2009).'],
        ['Nature vs nurture', 'Heredity vs environment and learning. Usually behaviour results from both.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'lab',
          eyebrow: 'Chapter 9 · Lesson 2',
          title: 'Big questions, rival schools',
          body: 'Ade studied all week, then froze in the GES 103 exam and failed.\n\nAsk five psychologists why, and you might get five different answers. That’s not confusion: each comes from a different school of thought.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'lab',
          poll: 'hook',
          prompt: 'Why do you think Ade froze?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Interesting choice.',
          pollBody: 'Every answer matches a real approach in psychology. By the end you’ll know which one you just used.',
        },
        {
          type: 'reveal',
          eyebrow: 'Three philosophical issues',
          title: 'Psychology inherited three big questions from Greek philosophy.',
          cards: [
            { title: 'Free will vs determinism', text: '**Free will**: behaviour is freely chosen. **Determinism**: everything has a cause, the view that guides scientists. **Wegner (2002)**: free will is an illusion; a conscious intention is more a prediction than a cause.' },
            { title: 'Mind–body', text: 'How can the brain’s physical, chemical and electrical activity explain thinking and feeling? **Dualism**: the mind is distinct from the brain but controls it. **Monism**: they are the same and inseparable (Hergenhahn 2009).' },
            { title: 'Nature vs nurture', text: 'How do **heredity** (nature) and **environment and learning** (nurture) interact in developing our abilities? Usually behaviour results from **both**.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which side of which debate is each statement on?',
          buckets: [
            { id: 'fw', label: 'Free will' },
            { id: 'de', label: 'Determinism' },
            { id: 'du', label: 'Dualism' },
            { id: 'mo', label: 'Monism' },
          ],
          items: [
            { text: '“I chose to study law. Nothing made me do it.”', bucket: 'fw', why: '**A freely chosen act** is the free-will view.' },
            { text: '“Every choice you make has causes, even if you can’t see them.”', bucket: 'de', why: '**Everything has a cause** is determinism.' },
            { text: '“The mind is something separate that steers the brain.”', bucket: 'du', why: '**Mind distinct from brain** is dualism.' },
            { text: '“The mind is simply what the brain does.”', bucket: 'mo', why: '**Mind and brain as one** is monism.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Twins raised apart both become excellent musicians, but only the one with music lessons plays professionally. What does this suggest about nature vs nurture?',
          options: [
            { text: 'Nature alone decides everything.', why: 'Then the lessons wouldn’t have mattered.' },
            { text: 'Nurture alone decides everything.', why: 'Then both twins wouldn’t share the talent.' },
            { text: 'Behaviour usually results from both heredity and environment.', correct: true, why: 'Shared genes gave the ability; different environments shaped how far it went.' },
            { text: 'It proves free will is an illusion.', why: 'That’s a different debate.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Big questions: framed.',
          recap: [
            '**Free will vs determinism** (Wegner: free will is an illusion). **Dualism vs monism**.',
            '**Nature vs nurture**: usually both.',
          ],
          why: 'Early psychologists split into schools over how to study the mind. The first fight was about breaking experience into parts.',
        },
      ],
    },
    {
      name: 'Early schools',
      terms: [
        ['Structuralism', 'Wundt; named by Titchener. Breaks conscious experience into basic elements; introspection. Criticised as narrow and subjective.'],
        ['Functionalism', 'William James, “father of psychology” in the USA. Focus on the functions of the mind and how we adapt.'],
        ['Gestalt', 'Wertheimer, Köhler, Koffka. “The whole is greater than the sum of its parts.”'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Early schools',
          title: 'Three early schools of thought',
          cards: [
            { title: 'Structuralism', text: '**Wundt** (1832–1920), carried to the USA and named by **Titchener**. Break conscious experience into basic elements: a perception is the sum of its parts. Method: **introspection**. Criticised as narrow and subjective, since introspectors gave conflicting reports.' },
            { title: 'Functionalism', text: '**William James** (1842–1910), “father of psychology” in the USA: first psychology class at Harvard (1875), first textbook, The Principles of Psychology (1890). Focus on the **functions** of the mind and how people **adapt**.' },
            { title: 'Gestalt', text: 'German psychologists **Wertheimer, Köhler and Koffka**. Gestalt = “form, pattern or whole”. Study thinking and perception as **whole units**. Opposed structuralism and behaviourism.' },
          ],
        },
        {
          type: 'custom',
          widget: 'gestalt',
          eyebrow: 'Gestalt',
          title: '“The whole is greater than the sum of its parts.”',
          body: 'Here are three identical parts. Line them up and see what your mind adds.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which early school does each statement belong to?',
          buckets: [
            { id: 's', label: 'Structuralism' },
            { id: 'f', label: 'Functionalism' },
            { id: 'g', label: 'Gestalt' },
          ],
          items: [
            { text: 'A perception is the sum of its basic elements.', bucket: 's', why: '**Breaking experience into elements** is structuralism.' },
            { text: 'Criticised because introspectors gave conflicting reports', bucket: 's', why: '**Conflicting introspective reports** were structuralism’s weakness.' },
            { text: 'Thinking and remembering exist because they help us survive and adapt.', bucket: 'f', why: '**The purpose of the mind** is functionalism.' },
            { text: 'William James and The Principles of Psychology (1890)', bucket: 'f', why: '**William James** founded functionalism.' },
            { text: 'We perceive whole patterns, not separate pieces.', bucket: 'g', why: '**Whole units** are Gestalt.' },
            { text: 'Wertheimer, Köhler and Koffka', bucket: 'g', why: '**These three** founded Gestalt psychology.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Structuralism and Gestalt make opposite claims about perception. What is the clash?',
          options: [
            { text: 'Structuralism says perception is the sum of its parts; Gestalt says the whole is greater than that sum.', correct: true, why: 'Gestalt rose partly in opposition to structuralism’s piece-by-piece approach.' },
            { text: 'Both say exactly the same thing.', why: 'They’re rivals for a reason.' },
            { text: 'Structuralism rejects introspection; Gestalt relies on it.', why: 'Structuralism is the school built on introspection.' },
            { text: 'Gestalt was founded by Wundt.', why: 'Wundt is linked to structuralism.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Early schools: mapped.',
          recap: [
            '**Structuralism** (Wundt, Titchener): elements, introspection. **Functionalism** (James): purpose and adaptation.',
            '**Gestalt** (Wertheimer, Köhler, Koffka): the whole is greater than the sum of its parts.',
          ],
          why: 'Today, psychologists use six main approaches. Each would explain Ade’s exam differently.',
        },
      ],
    },
    {
      name: 'Six approaches',
      terms: [
        ['Psychoanalysis', 'Freud: the unconscious mind; conscious experience is the “tip of the iceberg”. Method: free association.'],
        ['Behaviourism', 'Links between observable stimuli and responses; ignores unobservable mental processes.'],
        ['Humanistic', 'A reaction to behaviourism: freedom, personal growth, inner worth, self-fulfilment.'],
        ['Cognitive', 'How we process, store and use information.'],
        ['Biological', 'Brain, nervous system, hormones, genetics. Practitioners: psychobiologists.'],
        ['Sociocultural', 'The newest: cultural and ethnic similarities and differences.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Contemporary approaches',
          title: 'Six ways to explain behaviour',
          cards: [
            { title: 'Psychoanalysis', text: '**Sigmund Freud** (1856–1939). The **unconscious** mind drives us; conscious experience is only the “tip of the iceberg”. Primitive urges clash with society. Method: **free association**.' },
            { title: 'Behaviourism', text: 'Behaviour is explained by links between **observable stimuli and observable responses**. Studies only what can be observed and measured: actions, not thoughts.' },
            { title: 'Humanistic', text: 'A **reaction to behaviourism**. Each person has great freedom to direct their future, capacity for growth, inner worth and potential for self-fulfilment.' },
            { title: 'Cognitive', text: 'How we **process, store and use information**, and how this affects attention, perception, learning, memory, beliefs and feelings.' },
            { title: 'Biological', text: 'The impact of the **brain, nervous system, hormones and genetics**. Practitioners are called **psychobiologists**.' },
            { title: 'Sociocultural', text: 'The **newest** approach: the influence of **cultural and ethnic** similarities and differences on behaviour.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Six psychologists explain why Ade froze in the exam. Which approach is each using?',
          buckets: [
            { id: 'p', label: 'Psychoanalysis' },
            { id: 'b', label: 'Behaviourism' },
            { id: 'h', label: 'Humanistic' },
            { id: 'c', label: 'Cognitive' },
            { id: 'bi', label: 'Biological' },
            { id: 's', label: 'Sociocultural' },
          ],
          items: [
            { text: 'Buried childhood fears of failure surfaced under pressure.', bucket: 'p', why: '**Unconscious, buried fears** are psychoanalysis.' },
            { text: 'Ade was rewarded for cramming before, so he never practised under exam conditions.', bucket: 'b', why: '**Observable stimulus–response history** is behaviourism.' },
            { text: 'Ade can choose to grow from this and reach his potential next time.', bucket: 'h', why: '**Freedom and growth** are the humanistic view.' },
            { text: 'Anxiety overloaded his working memory, so he couldn’t retrieve what he’d stored.', bucket: 'c', why: '**Processing, storing and retrieving information** is cognitive.' },
            { text: 'A surge of stress hormones disrupted his thinking.', bucket: 'bi', why: '**Hormones and the nervous system** are biological.' },
            { text: 'In his community, failing an exam brings deep family shame, which raised the stakes.', bucket: 's', why: '**Cultural expectations** are the sociocultural approach.' },
          ],
          explain: 'Same event, six valid explanations. Each approach looks through a different lens.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why did humanistic psychology arise as a “reaction to behaviourism”?',
          options: [
            { text: 'Behaviourism focused too much on feelings.', why: 'Behaviourism ignores feelings and thoughts.' },
            { text: 'Behaviourism treated people as responses to stimuli, ignoring their freedom, inner worth and potential.', correct: true, why: 'Humanists insisted people direct their own futures.' },
            { text: 'Behaviourism used free association.', why: 'Free association is Freud’s method.' },
            { text: 'Behaviourism studied only animals.', why: 'It studied observable behaviour in humans and animals alike.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Six approaches: understood.',
          recap: [
            '**Psychoanalysis** (Freud, unconscious), **behaviourism** (stimulus–response), **humanistic** (freedom, growth).',
            '**Cognitive** (information), **biological** (brain, hormones, genes), **sociocultural** (culture; the newest).',
          ],
          why: 'Final case: classify the theories and the debates in one go.',
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
          title: 'Why did Ade freeze?',
          body: 'Each answer from the start lines up with an approach.',
          rows: HOOK,
          after: 'Psychologists often combine approaches. Ade’s freeze probably had biological, cognitive and sociocultural parts all at once.',
        },
        {
          type: 'story',
          art: 'lab',
          eyebrow: 'Case file',
          title: 'The phone addiction debate',
          body: 'Your hall is debating whether students are “addicted” to their phones. Each speaker takes a different line.\n\nFive questions, getting harder.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: 'Speaker 1: “Every notification is a reward, so we keep checking. Ignore thoughts. Just watch the behaviour.” Which approach?',
          options: [
            { text: 'Behaviourism', correct: true, why: 'Stimulus (notification), response (checking), and ignoring unobservable thoughts: classic behaviourism.' },
            { text: 'Psychoanalysis', why: 'Nothing about the unconscious here.' },
            { text: 'Humanistic', why: 'No talk of freedom or growth.' },
            { text: 'Gestalt', why: 'Gestalt is about perceiving wholes.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: 'Speaker 2: “Phones release dopamine in the brain, and some people are genetically more prone to compulsive use.” Which approach?',
          options: [
            { text: 'Cognitive', why: 'Cognitive is about information processing, not brain chemistry.' },
            { text: 'Biological', correct: true, why: 'Brain chemistry and genetics are the biological approach.' },
            { text: 'Sociocultural', why: 'No mention of culture.' },
            { text: 'Functionalism', why: 'Functionalism was an early school about the purpose of mental processes.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'Speaker 3: “In our culture, staying reachable on WhatsApp is a social duty. Ignoring messages is rude.” Which approach, and what’s special about it?',
          options: [
            { text: 'Sociocultural, the newest approach', correct: true, why: 'The influence of cultural norms on behaviour is sociocultural, which your notes call the newest approach.' },
            { text: 'Structuralism, the oldest school', why: 'Structuralism breaks experience into elements.' },
            { text: 'Psychoanalysis, based on free association', why: 'Nothing unconscious is being discussed.' },
            { text: 'Biological, based on hormones', why: 'This is about culture, not hormones.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'Speaker 4: “Nobody is forced to scroll. Every tap is a free choice.” Speaker 5: “Every tap has causes: habits, design, rewards.” Which debate is this?',
          options: [
            { text: 'Nature vs nurture', why: 'They’re not arguing about genes vs environment.' },
            { text: 'Free will vs determinism', correct: true, why: 'Free choice versus everything having a cause.' },
            { text: 'Dualism vs monism', why: 'They’re not arguing about mind and brain.' },
            { text: 'Structuralism vs Gestalt', why: 'That’s about parts and wholes in perception.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'Which statements about the debate are true?',
          options: [
            { text: 'Wegner (2002) would side more with Speaker 5.', correct: true, why: '**Wegner called free will an illusion**, which favours determinism.' },
            { text: 'A humanist would stress students’ capacity to choose and grow.', correct: true, why: '**Freedom and growth** are humanistic themes.' },
            { text: 'Different approaches can each explain part of the same behaviour.', correct: true, why: '**Approaches complement each other**, as with Ade’s exam.' },
            { text: 'Behaviourists would focus on students’ hidden thoughts.', why: '**Behaviourism ignores unobservable mental processes.**' },
          ],
        },
        {
          type: 'finish',
          title: 'You can think like six psychologists.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
