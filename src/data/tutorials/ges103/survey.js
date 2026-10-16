// GES 103 · Chapter 6 · Lesson 1: methodology, types of data, questionnaire, interview, observation, secondary sources (notes 6.1–6.8).

const HOOK = [
  ['Send everyone an online questionnaire', 'Quick and quantitative', 'Great for numbers from many people, but it reaches only internet users, and answers are limited to what you ask.'],
  ['Interview a few students in depth', 'Rich and qualitative', 'Deep meanings and reasons, but from a small number of people.'],
  ['Quietly sit in the cafeteria and watch', 'Observation', 'Behaviour in its natural setting, but slow, and hard to generalise from.'],
  ['Use the university’s official records', 'Secondary data', 'Cheap and unobtrusive, but limited in scope and possibly altered.'],
];

export default {
  id: 'survey',
  title: 'Run your own survey',
  covers: 'Two methodological camps, types of data, questionnaires, interviews, observation, secondary sources',
  minutes: 15,
  sections: [
    {
      name: 'Camps & data',
      terms: [
        ['Positivism vs interpretive', 'Positivism applies natural-science methods (quantitative). The humanistic/interpretive camp says humans differ from nature (qualitative).'],
        ['Methodological pluralism', 'Combining both: triangulation (cross-check), complementarity (dovetail), facilitation (one method helps another).'],
        ['Data vs information', 'Data = raw facts or records. Information = data assembled, processed and interpreted (Ogundipe et al. 2006).'],
        ['Primary vs secondary data', 'Primary: collected first-hand. Secondary: already collected by others (government, WHO, UN, ECOWAS).'],
      ],
      screens: [
        {
          type: 'story',
          art: 'survey',
          eyebrow: 'Chapter 6 · Lesson 1',
          title: 'Run your own survey',
          body: 'The Dean wants to know why so many students skip the cafeteria and eat at roadside bukas instead. You’ve been asked to find out.\n\nSounds simple. But how you collect the data decides what you can find.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'survey',
          poll: 'hook',
          prompt: 'What would you do first?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'A reasonable start.',
          pollBody: 'Every option on that list is a real research method, with real strengths and weaknesses. By the end you’ll know which to pick, and when to combine them.',
        },
        {
          type: 'reveal',
          eyebrow: 'Two camps',
          title: 'Sociologists disagree about how to study people.',
          body: 'Comte first called sociology “social physics”. Not everyone agreed.',
          cards: [
            { title: 'Positivism (scientific)', text: 'Apply the **methods of the natural sciences** to society. Data is **quantitative**: numbers and statistics.' },
            { title: 'Humanistic / interpretive', text: 'Studying humans is **fundamentally different** from studying nature. Data is **qualitative**: words and meanings.' },
            { title: 'Methodological pluralism', text: 'Combine both. **Triangulation** cross-checks findings; **complementarity** covers different aspects; **facilitation** uses one method to help another.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which kind of data is each of these?',
          buckets: [
            { id: 'pq', label: 'Primary · quantitative' },
            { id: 'pl', label: 'Primary · qualitative' },
            { id: 'sq', label: 'Secondary' },
          ],
          items: [
            { text: 'Your own questionnaire scores from 300 students', bucket: 'pq', why: '**Your own numerical survey data** is primary and quantitative.' },
            { text: 'Transcripts of your interviews with buka owners', bucket: 'pl', why: '**Interview transcripts you collected** are primary and qualitative.' },
            { text: 'NBS food-price statistics', bucket: 'sq', why: '**Statistics collected by the NBS** are secondary data.' },
            { text: 'A WHO report on student nutrition', bucket: 'sq', why: '**A report already produced by WHO** is secondary data.' },
          ],
          explain: 'Secondary data saves time and money and gives access to history, but its reliability and validity can be questionable.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'You run focus groups first, and use what students say to write better questionnaire items. Which form of methodological pluralism is this?',
          options: [
            { text: 'Triangulation', why: 'Triangulation uses both methods to cross-check the same findings.' },
            { text: 'Complementarity', why: 'Complementarity uses two strategies to cover different aspects of a study.' },
            { text: 'Facilitation', correct: true, why: 'One method (interviews) helps build another (the questionnaire). That’s facilitation.' },
            { text: 'Positivism', why: 'Positivism is one camp, not a way of combining them.' },
          ],
          explain: 'And remember: **data** is the raw record; **information** is data assembled, processed and interpreted.',
        },
        {
          type: 'bridge',
          title: 'Camps and data: sorted.',
          recap: [
            '**Positivism** = quantitative; **interpretive** = qualitative; **pluralism** = triangulation, complementarity, facilitation.',
            '**Primary** data you collect; **secondary** data others collected. Data is raw; information is processed.',
          ],
          why: 'Most student projects start with a questionnaire. It looks easy, but it’s full of traps.',
        },
      ],
    },
    {
      name: 'Questionnaires',
      terms: [
        ['Questionnaire', 'The same questions, in the same order, answered by sampled respondents.'],
        ['Open-ended vs closed', 'Open: respondents use their own words (more valid, must be recoded). Closed: pick from options, e.g. a Likert scale.'],
        ['Double-barrelled question', 'Asks two things at once, e.g. “friendship developed because of nearness and shared experience.”'],
        ['Reactivity', 'Respondents give the answers they think the researcher wants.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Questionnaires',
          title: 'Two types of question',
          body: 'All respondents get the same questions in the same order.',
          cards: [
            { title: 'Open-ended', text: 'Respondents answer **in their own words**. More valid, but answers must be **recoded into numbers**, so “lazy researchers” avoid them. Needed when a topic is new.' },
            { title: 'Closed (fixed-choice)', text: 'Respondents **pick from given options**: a **Likert scale** (strongly agree → strongly disagree) or a score range (1–10). Weakness: their real answer may not be on the list.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Spot the flaw',
          prompt: 'Your draft asks: “Do you avoid the cafeteria because the food is expensive and tasteless?” What’s wrong with it?',
          options: [
            { text: 'Nothing. It’s clear.', why: 'A student who finds it expensive but tasty can’t answer honestly.' },
            { text: 'It’s double-barrelled: it asks about price and taste at once.', correct: true, why: 'Split it into two questions: one on price, one on taste.' },
            { text: 'It’s open-ended.', why: 'It’s actually a yes/no closed question.' },
            { text: 'It uses a Likert scale.', why: 'There’s no scale here.' },
          ],
          explain: 'Your notes’ example of a double-barrelled item: “friendship developed because of nearness and shared experience.”',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'How should you administer it? Match each method to its main strength or weakness.',
          buckets: [
            { id: 'i', label: 'Interviewer-administered' },
            { id: 'p', label: 'Postal' },
            { id: 'e', label: 'E-mail' },
            { id: 'w', label: 'Internet (web form)' },
          ],
          items: [
            { text: 'Works for the elderly or those who can’t fill forms, but risks interviewer bias', bucket: 'i', why: '**Reading questions aloud** helps those who can’t fill forms, but the interviewer can bias answers.' },
            { text: 'Cheap for wide areas, but returns are rarely above 50%, sometimes below 25%', bucket: 'p', why: '**Low return rates** are the classic postal problem.' },
            { text: 'Good for sensitive questions like HIV status, but reaches only internet users', bucket: 'e', why: '**Privacy for sensitive topics** is e-mail’s strength.' },
            { text: 'Newest and easiest; incentives like recharge cards help', bucket: 'w', why: '**Web forms with incentives** are the newest method.' },
          ],
          explain: 'The common problem with all of them: **less privileged people are left out**, which hurts reliability and validity.',
        },
        {
          type: 'multi',
          eyebrow: 'Think deeper',
          prompt: 'Which of these are disadvantages of questionnaires listed in your notes?',
          options: [
            { text: 'Reactivity: people give answers they think you want', correct: true, why: '**Reactivity** is listed.' },
            { text: 'Researcher’s imposition: your assumptions distort the concepts', correct: true, why: '**Researcher’s imposition** is listed.' },
            { text: 'Respondents can’t give information you didn’t ask for', correct: true, why: '**No room for unasked information** is listed, which makes new hypotheses harder.' },
            { text: 'They are slow to analyse', why: '**It’s the opposite**: SPSS makes analysis fast. That’s an advantage.' },
          ],
          explain: 'Advantages include: lots of data quickly, fast analysis with SPSS, objectivity, easy comparison and large, representative samples.',
        },
        {
          type: 'bridge',
          title: 'Questionnaires: done.',
          recap: [
            '**Open** (own words, valid, recode) vs **closed** (options, Likert). Avoid **double-barrelled** questions.',
            'Postal: low returns. E-mail: sensitive topics. Web: incentives. All miss the less privileged.',
          ],
          why: 'Questionnaires give you breadth. To understand why students really choose bukas, you need to talk to them, or watch them.',
        },
      ],
    },
    {
      name: 'Interviews & observation',
      terms: [
        ['Structured vs unstructured interview', 'Structured: fixed, ordered questions (probing allowed). Unstructured: natural conversation guided by topics.'],
        ['IDI, KII, FGD', 'In-depth interview (few people, deep); key informant interview (knowledgeable insider); focus group discussion (7–12 people, moderator).'],
        ['Participant vs non-participant observation', 'Participant: the observer joins the group (ethnography). Non-participant: watches without joining.'],
        ['Overt vs covert', 'Overt: identity revealed. Covert: hidden; conflicts with informed consent.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Interviews',
          title: 'Three interview tools',
          body: 'Interviews range from **structured** (fixed questions, probing allowed) to **unstructured** (a natural conversation guided by topics). Most sit in between.',
          cards: [
            { title: 'In-depth interview (IDI)', text: 'Intensive one-on-one interviews with a **small number** of people. Example: **Ifá priests** describing the Ifá therapy system.' },
            { title: 'Key informant interview (KII)', text: 'A **knowledgeable insider** gives information that’s hard to get directly, often on sensitive topics. Example: a pimp in a study of prostitution.' },
            { title: 'Focus group discussion (FGD)', text: 'A group interview led by a **moderator**: **7 to 12 participants**. Stresses interaction and joint meaning (Bryman 2001); more natural than face-to-face interviews (Wilkinson 2004).' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'You want to understand how buka owners decide prices, and one veteran owner knows everyone in the trade. Which tool fits best?',
          options: [
            { text: 'A focus group of 20 owners', why: 'Too many: a focus group has 7 to 12 participants.' },
            { text: 'A key informant interview with the veteran owner', correct: true, why: 'An insider who can explain what’s hard to see directly is a key informant.' },
            { text: 'A postal questionnaire', why: 'You’d lose the depth an insider can give.' },
            { text: 'Covert observation', why: 'There’s no need to hide, and covert work raises consent problems.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Observation',
          prompt: 'Which type of observation is each of these?',
          buckets: [
            { id: 'n', label: 'Non-participant', hint: 'watches only' },
            { id: 'po', label: 'Participant, overt', hint: 'joins, identity known' },
            { id: 'pc', label: 'Participant, covert', hint: 'joins, identity hidden' },
          ],
          items: [
            { text: 'Watching market women trade from across the road', bucket: 'n', why: '**Watching without joining** is non-participant observation.' },
            { text: 'Watching a protest march from the sidelines', bucket: 'n', why: '**Observing protesters without joining** is non-participant.' },
            { text: 'Malinowski living among the Trobriand Islanders, openly as a researcher', bucket: 'po', why: '**Joining openly** is overt participant observation, the main method in ethnography.' },
            { text: 'A criminologist posing as a prisoner', bucket: 'pc', why: '**Hiding one’s identity** is covert, and conflicts with informed consent.' },
          ],
          explain: 'Your notes add that people usually return to normal behaviour after about **3–6 months** of being observed.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Observation has “high ecological validity” but is seen as unscientific. Why both?',
          options: [
            { text: 'It’s done in labs, but labs are fake.', why: 'Observation happens in natural settings, not labs.' },
            { text: 'It captures behaviour in its natural setting, but a study of a small group over months can’t be replicated.', correct: true, why: 'Real-world validity comes at the cost of replication, which science values.' },
            { text: 'It uses only numbers.', why: 'Observation is mainly qualitative.' },
            { text: 'Observers never write anything down.', why: 'They record systematically.' },
          ],
          explain: 'Interviews, by comparison, reach larger samples than observation, let you clarify misunderstood words and get higher response rates than questionnaires, but face interviewer bias.',
        },
        {
          type: 'bridge',
          title: 'Interviews and observation: clear.',
          recap: [
            '**IDI** (few, deep), **KII** (insider), **FGD** (7–12, moderator). Structured vs unstructured.',
            'Observation: **participant vs non-participant**, **overt vs covert**. Natural, valid, but slow and hard to replicate.',
          ],
          why: 'Sometimes someone has already collected the data you need. Last stop: secondary sources.',
        },
      ],
    },
    {
      name: 'Secondary sources',
      terms: [
        ['Official statistics', 'NBS, NHIS, NPC; WHO, UN, UNESCO, AU, ECOWAS. Unobtrusive, cheap, generalisable; limited scope, may be altered.'],
        ['Historical documents', 'Needed to study change over time (Weber on religion and capitalism); subjective bias of authors.'],
        ['Life documents', 'Letters, diaries, autobiographies: rich insight, but small, unrepresentative samples.'],
        ['Mass media', 'Newspapers and online content: little scrutiny, questionable authority, outdated, ideological slant.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'Secondary sources',
          prompt: 'Four kinds of secondary source. Match each example or feature.',
          buckets: [
            { id: 'o', label: 'Official statistics' },
            { id: 'h', label: 'Historical documents' },
            { id: 'l', label: 'Life documents' },
            { id: 'm', label: 'Mass media' },
          ],
          items: [
            { text: 'NBS, NPC and WHO data; what Durkheim used for Suicide', bucket: 'o', why: '**NBS, NPC, WHO and Durkheim’s suicide statistics** are official statistics.' },
            { text: 'Unobtrusive (no reactivity), cheap, covers large populations', bucket: 'o', why: '**No reactivity and large coverage** are the strengths of official statistics.' },
            { text: 'What Weber relied on to link religion and capitalism', bucket: 'h', why: '**Weber’s religion-and-capitalism work** used historical documents.' },
            { text: 'Letters, diaries and autobiographies', bucket: 'l', why: '**Personal writings** are life documents.' },
            { text: 'Rich insight, but small and unrepresentative', bucket: 'l', why: '**Rich but unrepresentative** describes life documents.' },
            { text: 'Little scrutiny before release; possible ideological slant', bucket: 'm', why: '**Little scrutiny and slant** are the weaknesses of mass media.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why do your notes say that without historical documents, sociology “would be static”?',
          options: [
            { text: 'Because they are the cheapest source.', why: 'Cost isn’t the point.' },
            { text: 'Because they are needed to study social change over time.', correct: true, why: 'Without records of the past, you can only study the present.' },
            { text: 'Because they are always unbiased.', why: 'They carry the subjective or ideological bias of their authors.' },
            { text: 'Because they replace fieldwork.', why: 'They complement fieldwork rather than replace it.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Secondary sources: covered.',
          recap: [
            '**Official statistics** (cheap, unobtrusive, may be altered), **historical documents** (change over time, biased authors).',
            '**Life documents** (rich, unrepresentative), **mass media** (little scrutiny, slant).',
          ],
          why: 'Back to the buka mystery. Time to design the study properly.',
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
          title: 'What would you do first?',
          body: 'Every answer from the start was a real method. Here’s the trade-off each one makes.',
          rows: HOOK,
          after: 'The best studies often combine methods. That’s methodological pluralism.',
        },
        {
          type: 'story',
          art: 'survey',
          eyebrow: 'Case file',
          title: 'The buka study',
          body: 'You now have a budget, three weeks and a team of four. Design the study.\n\nFive questions, getting harder.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: 'You want numbers from as many students as possible, analysed quickly in SPSS. Which method?',
          options: [
            { text: 'A closed-question questionnaire', correct: true, why: 'Large samples, fast SPSS analysis and easy comparison are the questionnaire’s strengths.' },
            { text: 'In-depth interviews', why: 'IDIs give depth from a few people, not numbers from many.' },
            { text: 'Covert observation', why: 'Slow, small-scale and ethically risky.' },
            { text: 'Life documents', why: 'Diaries won’t give you numbers from hundreds of students.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: 'You want to discuss the topic with a group and see how students react to each other’s views. How many should you invite?',
          options: [
            { text: '2 to 4', why: 'Too few for a focus group.' },
            { text: '7 to 12', correct: true, why: 'A focus group has a minimum of 7 and a maximum of 12 participants.' },
            { text: '20 to 30', why: 'Too many to discuss properly.' },
            { text: 'As many as possible', why: 'Focus groups have a set range.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'In interviews, students say they eat at bukas for the taste. But when you watch, most choose whichever spot has the shortest queue. Which problem with interviews has observation revealed?',
          options: [
            { text: 'Responses may be inaccurate: people can misremember or give socially acceptable answers.', correct: true, why: 'Your notes list inaccurate responses (lies, forgetting) as an interview weakness. Observation is harder to fake.' },
            { text: 'Interviews are too expensive.', why: 'Cost isn’t what the contrast shows.' },
            { text: 'Observation is always wrong.', why: 'Here it caught something interviews missed.' },
            { text: 'The questionnaire was double-barrelled.', why: 'The contrast is between interviews and observation.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'You compare the questionnaire results, the interviews and the observation to check whether they agree. What is this called?',
          options: [
            { text: 'Facilitation', why: 'Facilitation uses one method to build another.' },
            { text: 'Triangulation', correct: true, why: 'Using several methods to cross-check findings is triangulation.' },
            { text: 'Reactivity', why: 'Reactivity is a respondent problem, not a design strategy.' },
            { text: 'Coding', why: 'Coding turns responses into numbers or categories.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'A teammate suggests sending the questionnaire only by e-mail to save time. Which concerns from your notes apply?',
          options: [
            { text: 'It reaches only internet users.', correct: true, why: '**E-mail reaches only internet users.**' },
            { text: 'Return rates tend to be low.', correct: true, why: '**Low return** is listed for e-mail.' },
            { text: 'Less privileged students are likely to be left out, hurting reliability and validity.', correct: true, why: '**Leaving out the less privileged** is the common problem across methods.' },
            { text: 'E-mail can’t handle sensitive questions.', why: '**It’s the opposite**: e-mail is good for sensitive questions.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can design a study.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
