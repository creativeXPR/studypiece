// GES 103 · Chapter 11 · Lesson 4: population, destructive and positive human impacts, revision (notes 11.10–11.12).

const HOOK = [
  ['Mostly harmful', 'Half the story', 'Pollution, deforestation and extinction are real, but so are afforestation and conservation.'],
  ['Mostly helpful', 'Half the story', 'Conservation and renewables help, but destructive impacts are serious and widespread.'],
  ['Both, depending on what we choose', 'Your notes’ answer', 'Human activities have both positive and negative effects on the environment.'],
  ['People don’t really affect nature', 'Not supported', 'More people means more environmental impact, for better or worse.'],
];

export default {
  id: 'footprint',
  title: 'Our footprint',
  covers: 'Population, destructive human impacts, positive human impacts',
  minutes: 13,
  sections: [
    {
      name: 'Population',
      terms: [
        ['Population', 'The total number of people in an area at a specific time; described by absolute size and density (man–land ratio).'],
        ['Natural increase', 'Births minus deaths.'],
        ['Net migration', 'Immigration minus emigration. Globally irrelevant, since all moves stay within the world.'],
        ['World population (World Bank 2018)', '1990: 5.288 bn; 2000: 6.122 bn; 2010: 6.933 bn; 2017: 7.53 bn.'],
      ],
      screens: [
        {
          type: 'story',
          art: 'earth',
          eyebrow: 'Chapter 11 · Lesson 4',
          title: 'Our footprint',
          body: 'In 1990 there were about 5.3 billion people on Earth. By 2017 there were over 7.5 billion.\n\nEvery one of them eats, builds, travels and throws things away. What does that do to the planet?',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'earth',
          poll: 'hook',
          prompt: 'Overall, is human impact on the environment…',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Keep that in mind.',
          pollBody: 'This lesson covers both sides. We’ll see if your answer holds up.',
        },
        {
          type: 'order',
          eyebrow: 'World population (World Bank 2018)',
          prompt: 'Match the years to the growing population, in order.',
          items: [
            '1990: 5.288 billion',
            '2000: 6.122 billion',
            '2010: 6.933 billion',
            '2017: 7.53 billion',
          ],
          hint: 'Earliest year first. The population grows every time.',
          explain: 'That’s more than 2.2 billion extra people in 27 years. More people means more environmental impact.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'A town records 900 births, 300 deaths, 200 people moving in and 500 moving out in one year. What is its population change?',
          options: [
            { text: '+600', why: 'That’s only natural increase (900 − 300). Migration also changes the population.' },
            { text: '+300', correct: true, why: 'Natural increase (900 − 300 = +600) plus net migration (200 − 500 = −300) gives +300.' },
            { text: '−300', why: 'That’s only net migration.' },
            { text: '+1,900', why: 'Deaths and emigration reduce the population.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why do your notes say migration doesn’t matter for global population?',
          options: [
            { text: 'Because nobody migrates any more.', why: 'Millions migrate every year.' },
            { text: 'Because every move stays within the world: one country’s emigrant is another’s immigrant.', correct: true, why: 'At world level, migration cancels out. Only births and deaths change the total.' },
            { text: 'Because migrants aren’t counted.', why: 'They’re counted, just in a different country.' },
            { text: 'Because migration only affects cities.', why: 'It affects countries too, but cancels out globally.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Population: counted.',
          recap: [
            'Population is described by **size** and **density** (man–land ratio). Change = **natural increase + net migration**.',
            'World: **5.288 bn (1990)** → **7.53 bn (2017)**. Globally, migration cancels out.',
          ],
          why: 'More people, more impact. First, the damage.',
        },
      ],
    },
    {
      name: 'The damage',
      terms: [
        ['Destructive impacts', 'Pollution, overconsumption, hunting and new predators, mining, transport, deforestation.'],
        ['Overconsumption', 'Resource use outpacing the ecosystem’s sustainable capacity, causing degradation and loss of resources.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Destructive impacts',
          title: 'Six ways humans damage the environment',
          cards: [
            { title: 'Pollution', text: 'Of land, air and water, from fossil fuels, vehicle exhaust and factory gases.' },
            { title: 'Overconsumption', text: 'Using resources faster than the ecosystem can sustain, causing degradation and loss.' },
            { title: 'Hunting and predators', text: 'Hunting, and introducing new predators, drive species to **extinction**.' },
            { title: 'Mining', text: 'Erosion, **sinkholes**, biodiversity loss, and contamination of soil and water.' },
            { title: 'Transport', text: 'A big petroleum user: air pollution (nitrous oxides, particulates) and CO₂, contributing to **global warming**.' },
            { title: 'Deforestation', text: 'Erosion, habitat and biodiversity loss, and the loss of oxygen producers and CO₂ absorbers.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which destructive impact is each Nigerian example?',
          buckets: [
            { id: 'mi', label: 'Mining' },
            { id: 'tr', label: 'Transport' },
            { id: 'de', label: 'Deforestation' },
            { id: 'ov', label: 'Overconsumption' },
          ],
          items: [
            { text: 'Abandoned tin pits on the Jos Plateau, eroding and filling with water', bucket: 'mi', why: '**Abandoned mining pits** cause erosion and contamination.' },
            { text: 'Lagos traffic jams pumping out exhaust fumes', bucket: 'tr', why: '**Vehicle exhaust** is a transport impact.' },
            { text: 'Forest cleared for timber and farmland', bucket: 'de', why: '**Clearing forest** is deforestation.' },
            { text: 'Fishing a lake faster than the fish can breed', bucket: 'ov', why: '**Using a resource faster than it renews** is overconsumption.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why is deforestation a double blow for the climate?',
          options: [
            { text: 'Trees are noisy.', why: 'That’s not the issue.' },
            { text: 'It removes oxygen producers and CO₂ absorbers, and often causes erosion and habitat loss as well.', correct: true, why: 'Fewer trees means less CO₂ taken out of the air, plus soil and biodiversity losses.' },
            { text: 'It only affects animals, not climate.', why: 'Losing CO₂ absorbers affects the climate directly.' },
            { text: 'It increases rainfall everywhere.', why: 'That isn’t in your notes, and it isn’t the main effect.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The damage: listed.',
          recap: [
            '**Pollution, overconsumption, hunting and predators, mining, transport, deforestation.**',
            'Transport and deforestation both feed **global warming**: more CO₂ released, fewer trees to absorb it.',
          ],
          why: 'It’s not all bad news. Your notes list ten ways people protect and improve the environment.',
        },
      ],
    },
    {
      name: 'The repair',
      terms: [
        ['Positive impacts', 'Afforestation, water and soil conservation, conserving flora and fauna, renewable energy, removing invasive species, enforcing laws, selective breeding, domestication, introducing new species.'],
        ['Soil conservation', 'Contour ploughing, terrace farming, crop rotation, windbreaks, shelter belts.'],
        ['Water conservation', 'Not dumping waste in rivers, rainwater harvesting, watershed management, drip irrigation.'],
      ],
      screens: [
        {
          type: 'sort',
          eyebrow: 'Positive impacts',
          prompt: 'Which kind of conservation is each practice?',
          buckets: [
            { id: 's', label: 'Soil conservation' },
            { id: 'w', label: 'Water conservation' },
            { id: 'f', label: 'Conserving flora and fauna' },
          ],
          items: [
            { text: 'Contour ploughing across a slope', bucket: 's', why: '**Contour ploughing** protects soil.' },
            { text: 'Terrace farming on hillsides', bucket: 's', why: '**Terracing** is soil conservation.' },
            { text: 'Shelter belts of trees around farms', bucket: 's', why: '**Shelter belts and windbreaks** protect soil from wind.' },
            { text: 'Harvesting rainwater from rooftops', bucket: 'w', why: '**Rainwater harvesting** conserves water.' },
            { text: 'Drip irrigation', bucket: 'w', why: '**Drip irrigation** saves water.' },
            { text: 'National parks and wildlife sanctuaries', bucket: 'f', why: '**Parks and sanctuaries** conserve plants and animals.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Apply it',
          prompt: 'Which of these are positive human impacts listed in your notes?',
          options: [
            { text: 'Afforestation: planting trees to improve air quality', correct: true, why: '**Afforestation** is listed.' },
            { text: 'Renewable energy: solar, biofuels, wind', correct: true, why: '**Renewables** are listed.' },
            { text: 'Removing invasive species by planting indigenous trees', correct: true, why: '**Removing invasive species** is listed.' },
            { text: 'Selective breeding for better crop yields', correct: true, why: '**Selective breeding** is listed.' },
            { text: 'Introducing new predators to control prey', why: '**New predators drive extinction.** That’s on the destructive list.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Your notes give rubber as an example of introducing a new plant species. Where was it taken from, and where to?',
          options: [
            { text: 'From Brazil’s Amazon Basin to Malaysia', correct: true, why: 'That’s the notes’ example of a successful introduced species.' },
            { text: 'From Nigeria to Brazil', why: 'Rubber comes from the Amazon.' },
            { text: 'From Malaysia to Brazil', why: 'It went the other way.' },
            { text: 'From Ghana to India', why: 'Not the example in your notes.' },
          ],
          note: 'Your text calls Malaysia “the world’s largest rubber producer”. That was true for decades, but **Thailand** has been the largest producer for many years now. Give the text’s answer in this course’s exam if asked.',
        },
        {
          type: 'bridge',
          title: 'The repair: listed.',
          recap: [
            'Afforestation, **water** and **soil** conservation, parks and sanctuaries, **renewables**, removing invasive species.',
            'Also: enforcing laws, selective breeding, domestication, introducing new species (rubber: Brazil → Malaysia).',
          ],
          why: 'Last case of the whole course. Make it count.',
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
          title: 'Is human impact harmful or helpful?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: 'Your notes’ revision point: human activities have **both positive and negative effects**. Which one wins depends on our choices.',
        },
        {
          type: 'story',
          art: 'earth',
          eyebrow: 'Case file',
          title: 'The Green Campus plan',
          body: 'Your university has asked students to propose a plan to shrink its environmental footprint. Your committee reviews five proposals.\n\nThe final question covers the whole chapter.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 5',
          prompt: 'Proposal 1: plant 5,000 trees across campus. Which positive impact is this, and what does it improve, according to your notes?',
          options: [
            { text: 'Afforestation, which improves air quality', correct: true, why: 'Planting trees is afforestation, and your notes say it improves air quality.' },
            { text: 'Domestication, which protects animals', why: 'Domestication protects animals from predators.' },
            { text: 'Selective breeding, which improves yields', why: 'That’s about crops and livestock.' },
            { text: 'Mining, which creates jobs', why: 'Mining is on the destructive list.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 5',
          prompt: 'Proposal 2: put solar panels on every hostel roof to cut generator use. What does it replace, and why does that help?',
          options: [
            { text: 'It replaces fossil-fuel generators with renewable energy, cutting pollution and CO₂.', correct: true, why: 'Renewable energy is a positive impact; burning fuel causes pollution and adds CO₂.' },
            { text: 'It replaces trees with metal.', why: 'Panels go on roofs, not in place of trees.' },
            { text: 'It increases mining.', why: 'Solar panels reduce reliance on burning fuel.' },
            { text: 'It has no environmental effect.', why: 'Cutting generator use reduces pollution.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 5',
          prompt: 'Proposal 3: stop the campus clinic dumping waste into the stream, and harvest rainwater for gardens. Which kind of conservation?',
          options: [
            { text: 'Soil conservation', why: 'These practices protect water.' },
            { text: 'Water conservation', correct: true, why: 'Not dumping waste in rivers and harvesting rainwater are both water conservation.' },
            { text: 'Conserving flora and fauna', why: 'It may help wildlife indirectly, but these are water measures.' },
            { text: 'Selective breeding', why: 'Nothing is being bred.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 4 of 5',
          prompt: 'Proposal 4: a student argues: “Campus growth doesn’t matter, because students just move here from elsewhere in Nigeria.” Which idea does this misuse?',
          options: [
            { text: 'Migration cancels out globally, but locally it still raises population and impact.', correct: true, why: 'Migration nets to zero for the world, but for the campus, more people means more impact.' },
            { text: 'Natural increase is always negative.', why: 'Natural increase can be positive or negative. That isn’t the point here.' },
            { text: 'Density never changes.', why: 'More people in the same area means higher density.' },
            { text: 'Population is measured only by size.', why: 'Size and density both matter.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 5 of 5',
          prompt: 'Your committee writes a summary. Which statements belong in it?',
          options: [
            { text: 'The environmental system includes the atmosphere, lithosphere, hydrosphere and biosphere.', correct: true, why: '**The four spheres** are the environmental system.' },
            { text: 'The human–environment relationship is a two-way interaction.', correct: true, why: '**Two-way interaction** is a revision point.' },
            { text: 'Human activities have both positive and negative effects.', correct: true, why: '**Both effects** is the chapter’s closing point.' },
            { text: 'The environment only means the natural world, not settlements or roads.', why: '**Cultural components** like settlements and roads are part of the environment too.' },
          ],
        },
        {
          type: 'finish',
          title: 'You’ve reached the end of GES 103.',
          body: 'That’s the last lesson in the course: politics, government, sociology, research methods, psychology and the environment. Key terms from this lesson below.',
        },
      ],
    },
  ],
};
