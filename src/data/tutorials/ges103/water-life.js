// GES 103 · Chapter 11 · Lesson 2: hydrosphere, water cycle, biosphere, ecosystems (notes 11.5–11.6).

const HOOK = [
  ['About half', 'Way too high', 'Only 2.5% of Earth’s water is fresh, and most of that is frozen or underground.'],
  ['About a tenth', 'Still far too high', 'Even all fresh water is just 2.5%.'],
  ['About 2.5%', 'That’s all fresh water', 'Close, but most fresh water is ice or groundwater. The easy-to-reach part is far smaller.'],
  ['Much less than 1%', 'Correct', 'Lakes, reservoirs and rivers hold just 0.3% of fresh water: a tiny fraction of all water.'],
];

export default {
  id: 'water-life',
  title: 'Water and life',
  covers: 'Hydrosphere, the water cycle, biosphere, ecosystems',
  minutes: 13,
  sections: [
    {
      name: 'Hydrosphere',
      terms: [
        ['Hydrosphere', 'All water in solid, liquid and gas states, plus dissolved elements (Rodrigue 2017).'],
        ['Earth’s surface', '71% water, 29% land.'],
        ['Total water', '≈1.386 billion km³ (UNESCO 1998): 97.5% salt, 2.5% fresh.'],
        ['Fresh water', '68.9% ice and permanent snow; 30.8% groundwater; 0.3% in lakes, reservoirs and rivers.'],
        ['Ocean salinity', '≈35 g of salt per kg (3.5%).'],
      ],
      screens: [
        {
          type: 'story',
          art: 'earth',
          eyebrow: 'Chapter 11 · Lesson 2',
          title: 'Water and life',
          body: 'From space, Earth looks like a water planet: about **71%** of its surface is water.\n\nSo why do some communities walk kilometres for a bucket of clean water?',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'earth',
          poll: 'hook',
          prompt: 'Guess: what share of all Earth’s water is in easily accessible lakes, reservoirs and rivers?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Let’s measure it.',
          pollBody: 'In a moment you’ll shrink all of Earth’s water down, step by step, and see for yourself.',
        },
        {
          type: 'story',
          eyebrow: 'Hydrosphere',
          title: 'The hydrosphere is all of Earth’s water.',
          body: 'Solid, liquid and gas, plus dissolved elements like sodium, magnesium, calcium, chloride and sulphate (Rodrigue 2017). It includes groundwater, rivers, lakes and water in the air.\n\nEarth’s surface: ==71% water, 29% land.== One breakdown: 97% oceans, 2% ice at the poles, 1% rivers, lakes, groundwater and vapour.',
        },
        {
          type: 'custom',
          widget: 'waterShrink',
          eyebrow: 'How much can we use?',
          title: 'Shrink all of Earth’s water.',
          body: 'Start with every drop on the planet, about 1.386 billion km³. Remove what we can’t easily use, one step at a time.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Where is most of Earth’s fresh water?',
          options: [
            { text: 'In rivers and lakes', why: 'Only 0.3% of fresh water is in easily accessible lakes, reservoirs and rivers.' },
            { text: 'Locked in ice and permanent snow', correct: true, why: '68.9% of fresh water is ice and permanent snow.' },
            { text: 'In the atmosphere', why: 'Atmospheric water is a tiny share.' },
            { text: 'In the oceans', why: 'Ocean water is salt water.' },
          ],
          explain: 'Groundwater holds most of the rest: **30.8%**. Average ocean salinity is about **35 g per kg (3.5%)**.',
        },
        {
          type: 'bridge',
          title: 'Hydrosphere: measured.',
          recap: [
            '**71%** water surface. Total ≈ **1.386 billion km³**: **97.5% salt**, **2.5% fresh**.',
            'Fresh water: **68.9%** ice and snow, **30.8%** groundwater, **0.3%** lakes, reservoirs, rivers.',
          ],
          why: 'Water doesn’t stay put. It moves between reservoirs in a constant cycle.',
        },
      ],
    },
    {
      name: 'Water cycle',
      terms: [
        ['Hydrological (water) cycle', 'Moves water between reservoirs; driven by solar energy (insolation) and gravity; takes hours to thousands of years.'],
        ['Accumulator and vector', 'The hydrosphere accumulates pollutants and carries (spreads) them.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Hydrological cycle',
          prompt: 'Put one journey through the water cycle in order, starting at sea.',
          items: [
            'The sun heats the ocean, and water evaporates.',
            'Water vapour rises and cools into clouds.',
            'Water falls as rain (precipitation).',
            'Rainwater soaks into soil and groundwater, or runs into rivers.',
            'Gravity carries river water back to the ocean.',
          ],
          hint: 'Evaporate, condense, fall, soak or run off, return.',
          explain: 'The cycle is driven by **solar energy (insolation) and gravity**, and a single loop can take hours or thousands of years. **Most evaporation comes from the oceans.**',
        },
        {
          type: 'multi',
          eyebrow: 'Apply it',
          prompt: 'Which of these are reservoirs the water cycle moves water between?',
          options: [
            { text: 'Atmospheric moisture', correct: true, why: '**Moisture in the air** is a reservoir.' },
            { text: 'Groundwater and aquifers', correct: true, why: '**Groundwater and aquifers** are reservoirs.' },
            { text: 'Ice caps', correct: true, why: '**Ice caps** are reservoirs.' },
            { text: 'Soil', correct: true, why: '**Soil** holds water too.' },
            { text: 'Basalt rock in the deep mantle', why: '**The deep mantle** isn’t one of the reservoirs listed.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Your notes call the hydrosphere an “accumulator of pollutants and vector of diffusion”. What does “vector” mean here?',
          options: [
            { text: 'Water makes pollution disappear.', why: 'It does the opposite: it carries pollution.' },
            { text: 'Water carries pollutants and spreads them from place to place.', correct: true, why: 'A vector is a carrier. Rivers and currents spread pollution far from its source.' },
            { text: 'Water is a mathematical arrow.', why: 'Right word, wrong meaning here.' },
            { text: 'Only salt water can be polluted.', why: 'Fresh water is polluted too, often more directly.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Water cycle: flowing.',
          recap: [
            'Evaporate → condense → precipitate → soak/run off → return. Driven by **insolation and gravity**.',
            'Most evaporation is from the **oceans**. Water **accumulates** and **carries** pollutants.',
          ],
          why: 'Wherever water, air and rock meet, there’s life. That’s the biosphere.',
        },
      ],
    },
    {
      name: 'Biosphere',
      terms: [
        ['Biosphere', 'The layer of Earth where life exists; the basis of ecology. No life has been found elsewhere.'],
        ['Where life lives', 'On land: from 3 m below ground to 30 m above. At sea: surface to about 200 m deep.'],
        ['Ecosystem', 'Living organisms and non-living parts interacting with each other and their physical environment.'],
        ['Three ecosystem components', 'Biotic (living), abiotic (non-living), dead organic matter.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Biosphere',
          title: 'The biosphere is the layer of Earth where life exists.',
          body: 'It is unique: no life has been found anywhere else. Its study is the basis of **ecology**.\n\nLife depends on the sun: ==photosynthesis turns carbon dioxide into sugars and releases oxygen.==\n\nMost land life lives between **3 m below ground and 30 m above**. Most sea life lives from the surface down to about **200 m**. The biosphere is made of **biomes**, areas with similar plants and animals such as deserts and coral reefs.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'An ecosystem has three components. Sort these parts of a forest ecosystem.',
          buckets: [
            { id: 'b', label: 'Biotic', hint: 'living' },
            { id: 'a', label: 'Abiotic', hint: 'non-living' },
            { id: 'd', label: 'Dead organic matter' },
          ],
          items: [
            { text: 'Iroko trees', bucket: 'b', why: '**Trees** are living: biotic.' },
            { text: 'Monkeys and birds', bucket: 'b', why: '**Animals** are biotic.' },
            { text: 'Mineral soil', bucket: 'a', why: '**Mineral soil** is non-living: abiotic.' },
            { text: 'Air and rainwater', bucket: 'a', why: '**Air and water** are abiotic.' },
            { text: 'Fallen, rotting leaves', bucket: 'd', why: '**Rotting leaves** are dead organic matter.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Three types of ecosystem. Place each example.',
          buckets: [
            { id: 't', label: 'Terrestrial' },
            { id: 'q', label: 'Aquatic' },
            { id: 'm', label: 'Man-made' },
          ],
          items: [
            { text: 'A rainforest, dominated by flowering plants', bucket: 't', why: '**Land ecosystems** dominated by flowering plants are terrestrial.' },
            { text: 'A lagoon full of phytoplankton', bucket: 'q', why: '**Water ecosystems** with small plants like phytoplankton are aquatic.' },
            { text: 'A city', bucket: 'm', why: '**The city** is your notes’ example of a man-made ecosystem.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why does most sea life live within about 200 m of the surface?',
          options: [
            { text: 'The water is warmer in the deep sea.', why: 'The deep sea is cold, and that isn’t the main reason.' },
            { text: 'Photosynthesis needs light, and light fades with depth, so food production happens near the surface.', correct: true, why: 'Your notes: photosynthesis in water happens mainly at the ocean surface, where there’s light.' },
            { text: 'Fish are afraid of the dark.', why: 'It’s about energy, not fear.' },
            { text: 'There is no water below 200 m.', why: 'Oceans are kilometres deep.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Biosphere: alive.',
          recap: [
            'The **biosphere** is where life exists, based on **photosynthesis**. Land: 3 m below to 30 m above. Sea: to ~200 m.',
            'Ecosystem = **biotic + abiotic + dead organic matter**. Types: terrestrial, aquatic, man-made.',
          ],
          why: 'Final case: one river, three spheres.',
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
          title: 'How much of Earth’s water is easily accessible?',
          body: 'Here’s how each guess from the start compares.',
          rows: HOOK,
          after: 'If all of Earth’s water filled a 100-litre drum, the easily accessible fresh water would be about **one and a half teaspoons**.',
        },
        {
          type: 'story',
          eyebrow: 'Case file',
          title: 'The Ogun River study',
          body: 'A team studies a river that flows past farms and a city before reaching a coastal lagoon.\n\nFour questions. The last combines hydrosphere and biosphere.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'The river is fresh water that’s easy to reach. What share of Earth’s fresh water is in rivers, lakes and reservoirs like it?',
          options: [
            { text: '30.8%', why: 'That’s groundwater.' },
            { text: '68.9%', why: 'That’s ice and permanent snow.' },
            { text: '0.3%', correct: true, why: 'Just 0.3% of fresh water is in easily accessible lakes, reservoirs and rivers.' },
            { text: '97.5%', why: 'That’s the share of all water that is salty.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'Fertiliser from upstream farms turns up in the lagoon far downstream. Which property of the hydrosphere does this show?',
          options: [
            { text: 'It is a vector: it carries pollutants from place to place.', correct: true, why: 'Water carried the fertiliser all the way to the lagoon.' },
            { text: 'It has 3.5% salinity.', why: 'That’s the ocean’s average salt content.' },
            { text: 'It covers 29% of the surface.', why: 'Water covers 71%. Land covers 29%.' },
            { text: 'It makes oxygen.', why: 'Plants make oxygen through photosynthesis.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'The lagoon has algae, fish, mud, water and decaying plant matter. Together, interacting, they form…',
          options: [
            { text: 'A biome', why: 'A biome is a large area with similar plants and animals, like a desert. One lagoon is an ecosystem.' },
            { text: 'An aquatic ecosystem', correct: true, why: 'Living and non-living parts interacting in water: an aquatic ecosystem.' },
            { text: 'The lithosphere', why: 'The lithosphere is the rocky shell, only one part of this.' },
            { text: 'A man-made ecosystem', why: 'The lagoon is natural.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Which statements about the river and lagoon are true?',
          options: [
            { text: 'The algae and fish are biotic; the mud and water are abiotic.', correct: true, why: '**Living vs non-living** is right.' },
            { text: 'The decaying plant matter is the third ecosystem component.', correct: true, why: '**Dead organic matter** is the third component.' },
            { text: 'Solar energy and gravity keep water moving through the river system.', correct: true, why: '**Insolation and gravity** drive the water cycle.' },
            { text: 'Most of the lagoon’s life will be found deep below 200 m.', why: '**Most aquatic life lives near the surface**, where light allows photosynthesis.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know water and life.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
