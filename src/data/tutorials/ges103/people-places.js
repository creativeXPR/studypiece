// GES 103 · Chapter 11 · Lesson 3: human environment, economic activities, location theories, markets (notes 11.7–11.9).

const HOOK = [
  ['The soil and climate decide', 'Environmental determinism', 'The view that people are passive products of nature. Dominant in classical times.'],
  ['The farmer decides, within what the land allows', 'Possibilism', 'People choose within environmental limits. More accepted today.'],
  ['Whatever sells for the most money', 'Von Thünen’s insight', 'Land goes to the highest bidder: the use that pays the most rent there.'],
  ['The government decides', 'Sometimes', 'In some systems (China, in your notes) government controls farming. Policy is one factor among several.'],
];

export default {
  id: 'people-places',
  title: 'People and places',
  covers: 'Human environment, economic activities from primary to quinary, Von Thünen, industrial location, markets, determinism vs possibilism',
  minutes: 15,
  sections: [
    {
      name: 'Economic activities',
      terms: [
        ['Human environment', 'The complex continuum of matter and conditions surrounding humans; a two-way interaction.'],
        ['Primary to quinary', 'Primary: extracting. Secondary: adding value. Tertiary: services. Quaternary: knowledge. Quinary: top decision-makers.'],
        ['Spatial organisation', 'The overall pattern of how space is used: towns, farms, roads, markets, schools, hospitals.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'market',
          eyebrow: 'Chapter 11 · Lesson 3',
          title: 'People and places',
          body: 'Drive out of any Nigerian city and the land changes: vegetable plots near the edge, then cassava and yam farms, then open grazing land further out.\n\nThat pattern isn’t random.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'market',
          poll: 'hook',
          prompt: 'What decides what a farmer grows on a plot of land?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Good thinking.',
          pollBody: 'Three of those answers are famous theories. We’ll come back to yours.',
        },
        {
          type: 'story',
          eyebrow: 'The human environment',
          title: 'People and environment shape each other.',
          body: 'The human–environment relationship is ==a two-way interaction==: we change the environment, and those changes affect how we see things and behave.\n\nSociety’s impact depends on **population size, social organisation, values, technology, wealth, education and knowledge**.\n\nSettlements are rural or urban, classified by population size, economic activities and spatial characteristics. **Economic activities** are the activities people do to earn income.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Five levels of economic activity. Place each job.',
          buckets: [
            { id: 'p', label: 'Primary', hint: 'extract' },
            { id: 's', label: 'Secondary', hint: 'add value' },
            { id: 't', label: 'Tertiary', hint: 'services, trade' },
            { id: 'q', label: 'Quaternary', hint: 'knowledge' },
            { id: 'x', label: 'Quinary', hint: 'top decisions' },
          ],
          items: [
            { text: 'A fisherman on the Niger', bucket: 'p', why: '**Fishing** extracts a resource: primary.' },
            { text: 'A tin miner in Jos', bucket: 'p', why: '**Mining** is primary.' },
            { text: 'A cement factory worker', bucket: 's', why: '**Manufacturing** adds value: secondary.' },
            { text: 'A bricklayer on a building site', bucket: 's', why: '**Construction** is secondary.' },
            { text: 'A bank cashier', bucket: 't', why: '**Banking services** are tertiary.' },
            { text: 'A danfo driver', bucket: 't', why: '**Transport** is tertiary.' },
            { text: 'A software developer', bucket: 'q', why: '**Software development** is the knowledge sector: quaternary.' },
            { text: 'A statistician', bucket: 'q', why: '**Statisticians** are quaternary.' },
            { text: 'A company CEO deciding strategy', bucket: 'x', why: '**Senior executives** are quinary: “gold collar”.' },
            { text: 'A top government official setting national policy', bucket: 'x', why: '**Top government officials** are quinary.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why can quaternary jobs be “outsourced” in a way primary jobs can’t?',
          options: [
            { text: 'They pay less.', why: 'Pay isn’t the reason.' },
            { text: 'They aren’t tied to resources or markets. A software developer can work from anywhere, but a miner must be where the mineral is.', correct: true, why: 'Knowledge work moves freely; extraction is tied to the location of the resource.' },
            { text: 'They don’t need computers.', why: 'They often depend on computers.' },
            { text: 'Governments ban outsourcing primary jobs.', why: 'It’s geography, not law.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Economic activities: ranked.',
          recap: [
            'The human environment is a **two-way interaction**. Impact depends on population, technology, wealth, values and more.',
            '**Primary** (extract) → **secondary** (add value) → **tertiary** (services) → **quaternary** (knowledge) → **quinary** (top decisions).',
          ],
          why: 'Agriculture is the classic primary activity. Why is land used the way it is? A German economist worked it out in 1826.',
        },
      ],
    },
    {
      name: 'Farms & factories',
      terms: [
        ['Factors in agriculture', 'Natural (climate, topography, soil), economic (market, transport, labour, capital), social (land ownership, inheritance), political (system, policies).'],
        ['Von Thünen (1826)', 'Crop prices shape the spatial pattern of farming. Land goes to the highest bidder.'],
        ['Economic rent', 'The surplus from using a better plot over a poorer one, with the same inputs.'],
        ['Industrial location theories', 'Weber (1909): least cost. Lösch (1939): profit maximisation, market area. Pred (1967): behavioural, “rational satisficing”.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'Factors in agriculture',
          prompt: 'Which kind of factor influences farming in each case?',
          buckets: [
            { id: 'n', label: 'Natural' },
            { id: 'e', label: 'Economic' },
            { id: 's', label: 'Social' },
            { id: 'p', label: 'Political' },
          ],
          items: [
            { text: 'Low rainfall limits what can grow', bucket: 'n', why: '**Climate** is a natural factor.' },
            { text: 'Steep slopes make ploughing hard', bucket: 'n', why: '**Topography** is natural.' },
            { text: 'A good road to the city market', bucket: 'e', why: '**Transport and markets** are economic.' },
            { text: 'Land passed down and divided among many children', bucket: 's', why: '**Land inheritance** is social.' },
            { text: 'Government subsidies on fertiliser', bucket: 'p', why: '**Subsidy policy** is political.' },
          ],
        },
        {
          type: 'custom',
          widget: 'vonThunen',
          eyebrow: 'Von Thünen (1826)',
          title: 'Land goes to the highest bidder.',
          body: 'Each crop pays a different rent depending on how far it is from the market. Change the price of cassava and watch the rings move.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'On a plot near the city, cassava would pay ₦50 rent and yam would pay ₦40. By Von Thünen’s idea, what is grown there?',
          options: [
            { text: 'Yam, because it is more traditional', why: 'Von Thünen’s model is about rent, not tradition.' },
            { text: 'Cassava, because land goes to the highest bidder', correct: true, why: 'Your notes’ own example: if cassava pays more than yam on a plot, cassava is grown there.' },
            { text: 'Both, split equally', why: 'The model says the higher bidder takes the plot.' },
            { text: 'Nothing, because the city is too close', why: 'Land near the market is the most valuable.' },
          ],
          explain: '**Economic rent** is the surplus from using a better plot over a poorer one with the same inputs.',
        },
        {
          type: 'sort',
          eyebrow: 'Industrial location',
          prompt: 'Three theories of where to build a factory. Match each idea.',
          buckets: [
            { id: 'w', label: 'Weber (1909)', hint: 'least cost' },
            { id: 'l', label: 'Lösch (1939)', hint: 'market area' },
            { id: 'p', label: 'Pred (1967)', hint: 'behavioural' },
          ],
          items: [
            { text: 'Build where total transport cost per unit is lowest.', bucket: 'w', why: '**Lowest transport cost** is Weber’s least-cost approach.' },
            { text: 'Build where you can monopolise the largest market area.', bucket: 'l', why: '**Maximum market area** is Lösch’s profit maximisation.' },
            { text: 'People are “rational satisficing” beings; information and ability shape their choices.', bucket: 'p', why: '**Satisficing** is Pred’s behavioural approach.' },
          ],
          explain: 'Most theories stress transport cost and individual entrepreneurs. Today, **globalisation and multinationals** also matter.',
        },
        {
          type: 'bridge',
          title: 'Farms and factories: located.',
          recap: [
            'Farming factors: **natural, economic, social, political**. **Von Thünen**: land to the highest bidder; economic rent.',
            'Industry: **Weber** (least cost), **Lösch** (market area), **Pred** (satisficing).',
          ],
          why: 'Farms and factories need somewhere to sell. In much of rural Nigeria, that market only opens every few days.',
        },
      ],
    },
    {
      name: 'Markets & views',
      terms: [
        ['Periodic markets', 'Rural markets in developing countries meeting every 3, 7 or 9 days (per the notes). Reasons: poor storage, poor transport, low population density.'],
        ['Stine (1962) and Christaller (1925)', 'Stine’s theory of periodic markets is based on Christaller’s Central Place Theory.'],
        ['Determinism vs possibilism', 'Determinism: man is a passive product of the environment. Possibilism: freedom to choose within environmental limits.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'market',
          eyebrow: 'Markets',
          title: 'Why do rural markets only open every few days?',
          body: 'Urban markets operate daily. Most rural markets in developing countries are ==periodic==, meeting every few days (your notes say every 3, 7 or 9 days).\n\nStine’s theory of periodic markets (1962) builds on **Christaller’s Central Place Theory** (1925), which explains the marketing functions cities provide to their hinterland.',
        },
        {
          type: 'multi',
          eyebrow: 'Apply it',
          prompt: 'Which reasons for periodic markets does your text give?',
          options: [
            { text: 'Poor storage', correct: true, why: '**Poor storage** is listed.' },
            { text: 'Poor transport', correct: true, why: '**Poor transport** is listed.' },
            { text: 'Low population density', correct: true, why: '**Low population density** is listed.' },
            { text: 'Traders prefer not to work', why: '**Not a reason in the notes.** Periodicity is about demand and distance.' },
          ],
          explain: 'Periodicity **concentrates demand** on specific days and **reduces the distance** buyers must travel.',
        },
        {
          type: 'sort',
          eyebrow: 'Two views',
          prompt: 'Environmental determinism or possibilism?',
          buckets: [
            { id: 'd', label: 'Determinism' },
            { id: 'p', label: 'Possibilism' },
          ],
          items: [
            { text: 'Man is a passive creature moulded by nature.', bucket: 'd', why: '**People as passive products of nature** is determinism.' },
            { text: 'Dominant in classical times, and seemed confirmed by Darwin’s Origin of Species', bucket: 'd', why: '**Classical dominance and Darwin** are linked to determinism.' },
            { text: 'People have freedom to choose within environmental limits.', bucket: 'p', why: '**Choice within limits** is possibilism.' },
            { text: 'More accepted today', bucket: 'p', why: '**Possibilism** is the more accepted view now.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Markets and views: settled.',
          recap: [
            '**Periodic markets**: poor storage, poor transport, low density. Stine (1962) builds on **Christaller** (1925).',
            '**Determinism** (passive, classical, Darwin) vs **possibilism** (choice within limits, accepted today).',
          ],
          why: 'Final case: plan a new farming settlement.',
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
          title: 'What decides what a farmer grows?',
          body: 'Each answer from the start matches a theory.',
          rows: HOOK,
          after: 'Most geographers today combine possibilism with economics: people choose within environmental limits, and prices shape those choices.',
        },
        {
          type: 'story',
          art: 'market',
          eyebrow: 'Case file',
          title: 'Planning Ilu-Tuntun',
          body: 'The state is planning a new farming settlement, Ilu-Tuntun, around a market town. You’re advising.\n\nFive questions. The last combines everything.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: 'Tomatoes sell for a high price but spoil fast and cost a lot to transport. Where should they be grown?',
          options: [
            { text: 'Close to the market town', correct: true, why: 'High transport cost means their rent falls fastest with distance, so they outbid other uses near the market.' },
            { text: 'As far away as possible', why: 'They’d spoil and cost too much to carry.' },
            { text: 'Anywhere, since distance doesn’t matter', why: 'In Von Thünen’s model, distance is everything.' },
            { text: 'Only on government land', why: 'The model is about rent, not ownership.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: 'A cassava-processing factory is planned. The investor wants the site where total transport cost per unit is lowest. Whose theory?',
          options: [
            { text: 'Lösch', why: 'Lösch focused on the largest market area.' },
            { text: 'Alfred Weber', correct: true, why: 'Lowest total transport cost per unit is Weber’s least-cost approach (1909).' },
            { text: 'Pred', why: 'Pred’s approach is behavioural.' },
            { text: 'Von Thünen', why: 'Von Thünen modelled agricultural land use, not factory sites.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'The factory turns raw cassava into garri for sale. Which level of economic activity is the factory?',
          options: [
            { text: 'Primary', why: 'Growing the cassava is primary. Processing it isn’t.' },
            { text: 'Secondary', correct: true, why: 'Processing raw materials into products adds value: secondary.' },
            { text: 'Tertiary', why: 'Tertiary is services and trade.' },
            { text: 'Quinary', why: 'Quinary is top decision-making.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'Ilu-Tuntun has poor roads, little storage and few people. How often should its market meet, and why?',
          options: [
            { text: 'Daily, like city markets', why: 'Low density and poor transport can’t sustain daily trading.' },
            { text: 'Periodically, every few days, to concentrate demand and reduce buyers’ travel', correct: true, why: 'Poor storage, poor transport and low density are exactly the conditions for periodic markets.' },
            { text: 'Never: people should travel to the city', why: 'That would mean huge distances for buyers.' },
            { text: 'Only once a year', why: 'Periodic markets meet every few days, not yearly.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'A planner says: “The swampy land means people here can only ever be fishermen.” Which responses use this lesson well?',
          options: [
            { text: 'That’s environmental determinism, treating people as passive products of nature.', correct: true, why: '**“Can only ever”** is the determinist view.' },
            { text: 'Possibilism says people can choose within the environment’s limits, e.g. rice farming or drainage.', correct: true, why: '**Choice within limits** is possibilism, the more accepted view today.' },
            { text: 'The relationship is two-way: people can also change the environment.', correct: true, why: '**Two-way interaction** is how your notes describe the human–environment relationship.' },
            { text: 'Darwin proved the planner right.', why: '**Darwin’s work only seemed to confirm determinism** in classical times. It’s no longer the accepted view.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can read a landscape.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
