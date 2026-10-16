// GES 103 · Chapter 9 · Lesson 1: what psychologists do, definition and goals, origins (notes 9.1–9.3).

const HOOK = [
  ['Yes. They can see right through you', 'A myth', 'One psychology course won’t let you analyse people or uncover hidden personality.'],
  ['Only if they’re clinical psychologists', 'Still a myth', 'Clinical psychology is the best-known branch, but no psychologist reads minds from small samples of behaviour.'],
  ['No. They study behaviour scientifically', 'Exactly right', 'Psychologists observe, analyse and evaluate behaviour. That’s science, not mind-reading.'],
  ['Only with special tests', 'Partly', 'Psychological testing is real, but it isn’t mind-reading. Be sceptical of anyone who claims to read personality quickly.'],
];

export default {
  id: 'psychologists',
  title: 'What psychologists really do',
  covers: 'What psychologists do, definition and goals, origins, Wundt’s laboratory',
  minutes: 13,
  sections: [
    {
      name: 'The myth',
      terms: [
        ['What psychologists do', 'Observe, analyse and evaluate behaviour. Psychology is both a science and a profession (Halpern 2003).'],
        ['Overt vs covert behaviour', 'Overt: manifest, observable. Covert: concealed, internal (thinking, remembering).'],
      ],
      screens: [
        {
          type: 'story',
          art: 'lab',
          eyebrow: 'Chapter 9 · Lesson 1',
          title: 'What psychologists really do',
          body: 'At a family party, your aunt hears you’re taking a psychology course. She narrows her eyes: “So you can read my mind now? Tell me what I’m thinking!”\n\nEveryone laughs. But plenty of people really believe it.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'lab',
          poll: 'hook',
          prompt: 'Can a psychologist read your mind?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Let’s test that.',
          pollBody: 'Your notes have a strong opinion about this exact myth. We’ll come back to your answer.',
        },
        {
          type: 'story',
          eyebrow: 'What psychologists do',
          title: 'Psychologists observe, analyse and evaluate behaviour.',
          body: 'They ask questions like: why do people conform, or not? Why do we forget, or remember? Why do some employees engage in counterproductive work behaviour?\n\n==Myth alert:== one psychology course won’t let you analyse people, uncover hidden personality or control them. Be **sceptical** of anyone who claims to read personality from small samples of behaviour.\n\nPsychology is both a **science** and a **profession** (Halpern 2003): researchers, teachers, and practitioners in mental health, education, business, sports, law and medicine.',
        },
        {
          type: 'sort',
          eyebrow: 'Warm-up',
          prompt: 'Behaviour can be overt or covert. Sort these.',
          buckets: [
            { id: 'o', label: 'Overt', hint: 'observable' },
            { id: 'c', label: 'Covert', hint: 'hidden, internal' },
          ],
          items: [
            { text: 'Eating jollof rice', bucket: 'o', why: '**Eating** can be seen: overt.' },
            { text: 'Laughing at a joke', bucket: 'o', why: '**Laughing** is observable: overt.' },
            { text: 'Remembering your WAEC results', bucket: 'c', why: '**Remembering** happens inside: covert.' },
            { text: 'Silently deciding what to say', bucket: 'c', why: '**Thinking** is internal: covert.' },
          ],
          explain: 'Behaviour is **anything you do**, from sleeping and dreaming to reading and gambling (Leary 2004).',
        },
        {
          type: 'bridge',
          title: 'The myth: busted.',
          recap: [
            'Psychologists **observe, analyse and evaluate** behaviour. No mind-reading.',
            'Behaviour is **overt** (observable) or **covert** (internal). Psychology is a science and a profession.',
          ],
          why: 'So if psychology isn’t mind-reading, what exactly is it? Its definition has changed a lot over the centuries.',
        },
      ],
    },
    {
      name: 'Definition & goals',
      terms: [
        ['Psychology (word)', 'Greek psyche (mind or soul) + logos (study). Originally “the study of the mind or soul”.'],
        ['Psychology (modern)', 'The scientific study of behaviour and mental processes (of humans and animals).'],
        ['Four goals', 'Describe, explain, predict and control behaviour.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Definition',
          title: 'Psychology: from “study of the soul” to science.',
          body: 'The word joins Greek ==psyche== (mind or soul) and ==logos== (study). It started as “the study of the mind or soul”, then became the study of the spirit, of consciousness, and later the science of behaviour.\n\nThe modern definition: **the scientific study of behaviour and mental processes.** Why both? Because the mind can’t be studied directly.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Why does the modern definition include behaviour, not just the mind?',
          options: [
            { text: 'Because the mind doesn’t exist.', why: 'The definition still includes mental processes.' },
            { text: 'Because the mind can’t be studied directly, so psychologists study behaviour too.', correct: true, why: 'Observable behaviour is the window into mental processes.' },
            { text: 'Because animals have no minds.', why: 'Psychology studies both human and animal behaviour and mental processes.' },
            { text: 'Because behaviour is easier to spell.', why: 'Nice try.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Like every science, psychology has four goals. Which goal is each study pursuing?',
          buckets: [
            { id: 'd', label: 'Describe' },
            { id: 'e', label: 'Explain' },
            { id: 'p', label: 'Predict' },
            { id: 'c', label: 'Control' },
          ],
          items: [
            { text: 'Recording how often first-years feel homesick', bucket: 'd', why: '**Recording what happens** is description.' },
            { text: 'Finding out why homesickness peaks in week three', bucket: 'e', why: '**Finding causes** is explanation.' },
            { text: 'Forecasting which students are likely to struggle', bucket: 'p', why: '**Forecasting** is prediction.' },
            { text: 'Designing a buddy scheme that reduces homesickness', bucket: 'c', why: '**Changing behaviour** is control.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Definition and goals: set.',
          recap: [
            '**Psyche** (mind/soul) + **logos** (study). Modern: the scientific study of **behaviour and mental processes**.',
            'Four goals: **describe, explain, predict, control**.',
          ],
          why: 'Your notes say psychology “has a long past but a short history.” Let’s see what that means.',
        },
      ],
    },
    {
      name: 'Long past, short history',
      terms: [
        ['“Long past, short history”', 'People asked psychological questions for centuries, but scientific psychology began only in 1879.'],
        ['Dualism (Descartes)', 'Mind and body are separate but linked; the mind controls the body’s movements, sensations and perceptions.'],
        ['Wilhelm Wundt (1879)', 'First psychology laboratory, Leipzig, Germany: birth of modern scientific psychology; “father of psychology”.'],
        ['Introspection', '“Looking inward”: probing one’s own reactions. Wundt’s approach: experimental self-observation.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'A long past',
          prompt: 'Put the milestones on the road to scientific psychology in order.',
          items: [
            'Greek thinkers decide people’s lives are ruled by their own minds, not the gods (5th–6th centuries BC)',
            'Copernicus: the Earth is not the centre of the universe (mid-1500s)',
            'Galileo confirms Copernicus with a telescope (1564–1642)',
            '17th-century philosophers popularise dualism; Descartes links mind and body (1596–1650)',
            'The 19th century: cells, the periodic table, atomic physics',
            'Wundt opens the first psychology laboratory in Leipzig (1879)',
          ],
          hint: 'Ancient Greece, then the 1500s, then the 1600s, then the 1800s.',
          explain: 'The 19th-century habit of reducing complex things to simple parts (Hilgard 1987) set the stage for Wundt.',
        },
        {
          type: 'custom',
          widget: 'reaction',
          eyebrow: 'Wundt’s lab, 1879',
          title: 'Be Wundt’s subject.',
          body: 'Wundt measured reactions to **stimuli** (lights, sounds, weights). A stimulus is any physical energy that triggers a sensory response. Try three trials.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Wundt combined trained introspection with objective measurement. What did he call this approach?',
          options: [
            { text: 'Psychoanalysis', why: 'That’s Freud, much later.' },
            { text: 'Experimental self-observation', correct: true, why: 'Introspection (looking inward) plus objective measurement of reactions.' },
            { text: 'Behaviourism', why: 'Behaviourism rejects introspection entirely.' },
            { text: 'Free association', why: 'That’s Freud’s method.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'How did Descartes’ view of mind and body differ from earlier 17th-century dualism?',
          options: [
            { text: 'He said the mind and body are the same thing.', why: 'That would be monism. Descartes kept them distinct.' },
            { text: 'He said mind and body are linked and influence each other, with the mind controlling movement, sensation and perception.', correct: true, why: 'Separate, but in constant two-way contact.' },
            { text: 'He said there is no mind, only a body.', why: 'He believed in the mind.' },
            { text: 'He said the gods control both.', why: 'The Greeks had already moved away from that.' },
          ],
        },
        {
          type: 'bridge',
          title: 'History: traced.',
          recap: [
            'Greeks → Copernicus → Galileo → dualism and Descartes → 19th-century science → **Wundt, Leipzig, 1879**.',
            'Wundt: **father of psychology**; measured reactions to stimuli; **introspection**; experimental self-observation.',
          ],
          why: 'Back to your aunt’s question, with the science behind you.',
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
          title: 'Can a psychologist read your mind?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'Next time someone asks you to read their mind, tell them psychology is the scientific study of behaviour and mental processes, and that you’re sceptical of anyone who claims otherwise.',
        },
        {
          type: 'story',
          art: 'lab',
          eyebrow: 'Case file',
          title: 'The “personality reader”',
          body: 'A man at the motor park sells “instant personality readings” for ₦500. He watches you for ten seconds and tells you your whole character.\n\nFour questions. Each asks a little more.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'What does your notes’ advice say about him?',
          options: [
            { text: 'Trust him if he sounds confident.', why: 'Confidence isn’t evidence.' },
            { text: 'Be sceptical of anyone claiming to read personality from small samples of behaviour.', correct: true, why: 'Ten seconds of watching is exactly the kind of small sample your notes warn about.' },
            { text: 'He must be a clinical psychologist.', why: 'Clinical psychologists diagnose and treat disorders. They don’t do ten-second readings.' },
            { text: 'He’s using Wundt’s method.', why: 'Wundt used careful observation and measurement, not guesses.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'He says: “I can tell what you’re thinking right now.” Thinking is which kind of behaviour?',
          options: [
            { text: 'Overt', why: 'Overt behaviour can be observed directly.' },
            { text: 'Covert', correct: true, why: 'Thinking is hidden and internal, which is exactly why it can’t be read by looking at someone.' },
            { text: 'Not behaviour at all', why: 'Your notes count covert events like thinking as behaviour.' },
            { text: 'A stimulus', why: 'A stimulus is physical energy that triggers a sensory response.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'A real psychologist wants to forecast which motor-park drivers are most likely to have accidents. Which of psychology’s four goals is that?',
          options: [
            { text: 'Describe', why: 'Describing records what happens. This looks ahead.' },
            { text: 'Explain', why: 'Explaining finds causes.' },
            { text: 'Predict', correct: true, why: 'Forecasting future behaviour is prediction.' },
            { text: 'Control', why: 'Control would mean changing their behaviour.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'How would a scientific psychologist study the drivers differently from the “personality reader”?',
          options: [
            { text: 'Careful observation and measurement, as Wundt began', correct: true, why: '**Systematic observation and measurement** started with Wundt.' },
            { text: 'Studying behaviour to understand mental processes, since the mind can’t be studied directly', correct: true, why: '**Behaviour as the window** into mental processes is the modern definition.' },
            { text: 'Aiming to describe, explain, predict and control behaviour', correct: true, why: '**The four goals** guide scientific psychology.' },
            { text: 'Reading each driver’s mind in ten seconds', why: '**That’s the myth** the lesson busted.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know what psychology really is.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
