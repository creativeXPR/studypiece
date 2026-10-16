// GES 103 · Chapter 11 · Lesson 1: the environment, the environmental system, atmosphere, lithosphere (notes 11.1–11.4).

const HOOK = [
  ['Oxygen', 'Not the biggest', 'Oxygen is about 21%. Vital for us, but not the main gas.'],
  ['Nitrogen', 'Correct', 'Nitrogen makes up about 78% of the air by volume.'],
  ['Carbon dioxide', 'Far from it', 'CO₂ is only about 0.04%, tiny but very important for the greenhouse effect.'],
  ['Water vapour', 'Not the biggest', 'About 1% at sea level; 0.4% over the whole atmosphere.'],
];

export default {
  id: 'sky-to-rock',
  title: 'From sky to rock',
  covers: 'The environment and its system, the atmosphere, the lithosphere',
  minutes: 14,
  sections: [
    {
      name: 'The environment',
      terms: [
        ['Environment', 'From French environner, “to encircle”. The conditions surrounding an organism or group (Cunningham and Saigo 1999).'],
        ['Natural vs cultural components', 'Natural: climate, terrain, vegetation, soils, rivers. Cultural: settlements, roads, farms.'],
        ['Environmental system', 'Life (biosphere) interacting with the abiotic atmosphere, hydrosphere and lithosphere.'],
        ['System', '“A set of interconnected parts which function together as a complex whole” (Smithson et al. 2008).'],
      ],
      screens: [
        {
          type: 'story',
          art: 'earth',
          eyebrow: 'Chapter 11 · Lesson 1',
          title: 'From sky to rock',
          body: 'Take one deep breath. That air is part of a system that runs from the edge of space down to the rock beneath your feet.\n\nIn this lesson we travel from the sky to the ground, one sphere at a time.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          art: 'earth',
          poll: 'hook',
          prompt: 'Quick guess: which gas makes up most of the air you just breathed?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Locked in.',
          pollBody: 'Most people guess wrong on this one. You’ll find out in the atmosphere section.',
        },
        {
          type: 'story',
          eyebrow: 'The environment',
          title: '“Environment” comes from the French environner: to encircle.',
          body: 'Cunningham and Saigo (1999) define it as (1) the circumstances or conditions that surround an organism or group, and (2) the social or cultural conditions that affect an individual or community.\n\n==Environmental science== studies human–environment interaction. It is interdisciplinary: natural sciences, social sciences and the humanities.',
        },
        {
          type: 'sort',
          eyebrow: 'Warm-up',
          prompt: 'Natural or cultural component of the environment?',
          buckets: [
            { id: 'n', label: 'Natural' },
            { id: 'c', label: 'Cultural', hint: 'made by people' },
          ],
          items: [
            { text: 'Rainfall and humidity (climate)', bucket: 'n', why: '**Climate** is natural.' },
            { text: 'Hills, valleys and swamps (terrain)', bucket: 'n', why: '**Terrain** is natural.' },
            { text: 'The River Niger', bucket: 'n', why: '**Rivers** are natural.' },
            { text: 'A new housing estate', bucket: 'c', why: '**Settlements** are cultural.' },
            { text: 'The Lagos–Ibadan expressway', bucket: 'c', why: '**Roads** are cultural.' },
            { text: 'A cocoa farm', bucket: 'c', why: '**Farms** are cultural: people made them.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'The environmental system',
          prompt: 'Energy drives the environmental system. Which of these are processes your notes say energy drives?',
          options: [
            { text: 'Photosynthesis, moving energy from abiotic to biotic parts', correct: true, why: '**Photosynthesis** moves energy from non-living to living components.' },
            { text: 'Wind', correct: true, why: '**Wind** is an abiotic process driven by energy.' },
            { text: 'Weathering of rock into soil', correct: true, why: '**Weathering** is driven by energy.' },
            { text: 'Mountain building by tectonic forces', correct: true, why: '**Mountain building** is driven by energy.' },
            { text: 'Rivers flowing uphill', why: '**Gravity pulls water downhill**, not up.' },
          ],
          explain: 'People who study these systems (biologists, biogeographers, botanists, zoologists) are called **environmentalists**.',
        },
        {
          type: 'bridge',
          title: 'The environment: defined.',
          recap: [
            '**Environment**: from environner, to encircle. **Natural** (climate, terrain, rivers) vs **cultural** (settlements, roads, farms).',
            'The **environmental system**: the biosphere interacting with the atmosphere, hydrosphere and lithosphere.',
          ],
          why: 'Let’s start at the top of the system: the layer of gas wrapped around the planet.',
        },
      ],
    },
    {
      name: 'Atmosphere',
      terms: [
        ['Atmosphere', 'The layer of gases around Earth, held by gravity. About 480 km thick, but most of it lies within 16 km.'],
        ['Composition', 'Nitrogen 78%, oxygen 21%, argon 0.93%, CO₂ 0.04%, water vapour ~1% at sea level. Mixed, not chemically combined.'],
        ['Five layers', 'Troposphere, stratosphere, mesosphere, thermosphere, exosphere (“Tall Students May Take Exams”).'],
        ['Environmental lapse rate', 'In the troposphere, temperature falls about 4–6°C per km, because it is heated mainly from the surface.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Why the atmosphere matters',
          title: 'Five jobs the atmosphere does',
          cards: [
            { title: '1. Air', text: 'It contains the **air we breathe**.' },
            { title: '2. Pressure', text: 'Its pressure lets **liquid water** exist on the surface.' },
            { title: '3. UV shield', text: 'It **absorbs ultraviolet** solar radiation.' },
            { title: '4. Warmth', text: 'It warms the surface by retaining heat: the **greenhouse effect**.' },
            { title: '5. Steady temperatures', text: 'It reduces the gap between day and night temperatures (**diurnal temperature variation**).' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Composition',
          prompt: 'Rank the gases in dry air from largest share to smallest.',
          items: [
            'Nitrogen (78%)',
            'Oxygen (21%)',
            'Argon (0.93%)',
            'Carbon dioxide (0.04%)',
          ],
          hint: 'The percentages are in brackets.',
          explain: 'The gases are **mixed, not chemically combined**. Water vapour varies: about 1% at sea level, 0.4% over the whole atmosphere.',
        },
        {
          type: 'custom',
          widget: 'atmosphere',
          eyebrow: 'Five layers',
          title: 'Fly up through the atmosphere.',
          body: 'From the ground up: troposphere, stratosphere, mesosphere, thermosphere, exosphere. Memory aid: ==Tall Students May Take Exams==.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Why does temperature fall as you climb through the troposphere?',
          options: [
            { text: 'Because you get further from the sun.', why: 'A few kilometres makes no difference to your distance from the sun.' },
            { text: 'Because the troposphere is heated mainly from the Earth’s surface.', correct: true, why: 'The ground absorbs sunlight and warms the air from below, so higher air is cooler.' },
            { text: 'Because the stratosphere absorbs all the heat.', why: 'In the stratosphere, temperature actually rises with height.' },
            { text: 'Because there’s no air there.', why: 'There’s plenty of air in the troposphere: most of the atmosphere lies within 16 km.' },
          ],
          note: 'Your notes give the environmental lapse rate as about **4–6°C per km**. The commonly quoted average is about **6.5°C per km**. Use the notes’ figure in this course’s exam.',
        },
        {
          type: 'multi',
          eyebrow: 'Think deeper',
          prompt: 'Which statements about the atmosphere’s structure are true, according to your notes?',
          options: [
            { text: 'The homosphere, with uniform composition, reaches up to about 80 km.', correct: true, why: '**Homosphere to 80 km**, heterosphere above (Ajayi 2013).' },
            { text: 'Air pressure and density decrease with altitude.', correct: true, why: '**Thinner air higher up** is stated in the notes.' },
            { text: 'The Kármán line, about 100 km up, marks the boundary with outer space.', correct: true, why: '**The Kármán line** is about 100 km (62 miles).' },
            { text: 'Temperature falls with height in the stratosphere.', why: '**In the stratosphere, temperature rises with height.**' },
          ],
        },
        {
          type: 'bridge',
          title: 'Atmosphere: explored.',
          recap: [
            'Nitrogen **78%**, oxygen **21%**, argon **0.93%**, CO₂ **0.04%**. Most of the air lies within **16 km**.',
            'Layers: **Tall Students May Take Exams**. Troposphere cools with height; stratosphere warms. Kármán line ~100 km.',
          ],
          why: 'Now drop down to the solid ground under the air: the lithosphere.',
        },
      ],
    },
    {
      name: 'Lithosphere',
      terms: [
        ['Lithosphere', 'The rigid outer shell: crust plus uppermost mantle, about 100 km thick, above the plastic asthenosphere.'],
        ['Oceanic vs continental crust', 'Oceanic: 5–10 km, basalt, ~3.0 g/cm³. Continental: 20–70 km, lighter granite, ~2.7 g/cm³.'],
        ['Pedosphere', 'The uppermost part of the lithosphere, which reacts with the other spheres through soil formation.'],
        ['Main elements', 'Oxygen 47%, silicon 28%, aluminium 8%, iron 5%, calcium 4%, sodium 3%, potassium 3%, magnesium 2%.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Lithosphere',
          title: 'The lithosphere is Earth’s rigid outer shell.',
          body: 'It is the **crust plus the uppermost part of the mantle**, bounded by the atmosphere above and the **asthenosphere** (the plastic upper mantle) below.\n\nAbout **100 km** thick: thickest under continents, thinnest at mid-ocean ridges and rift valleys. It is the zone of earthquakes, volcanoes, mountain building and continental drift. ==Tectonic plates== float on the mantle, moved slowly by convection currents.',
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Oceanic or continental crust?',
          buckets: [
            { id: 'o', label: 'Oceanic crust' },
            { id: 'c', label: 'Continental crust' },
          ],
          items: [
            { text: '5–10 km thick', bucket: 'o', why: '**Thin (5–10 km)** is oceanic crust.' },
            { text: 'Made of basalt', bucket: 'o', why: '**Basalt** is oceanic.' },
            { text: 'Density about 3.0 g/cm³', bucket: 'o', why: '**Denser (~3.0)** is oceanic.' },
            { text: '20–70 km thick', bucket: 'c', why: '**Thick (20–70 km)** is continental.' },
            { text: 'Mainly lighter granite', bucket: 'c', why: '**Granite** is continental.' },
            { text: 'Density about 2.7 g/cm³', bucket: 'c', why: '**Lighter (~2.7)** is continental.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Apply it',
          prompt: 'Rank the four most common elements in the lithosphere, largest first.',
          items: [
            'Oxygen (47%)',
            'Silicon (28%)',
            'Aluminium (8%)',
            'Iron (5%)',
          ],
          hint: 'Percentages are in brackets.',
          explain: 'Then calcium 4%, sodium 3%, potassium 3% and magnesium 2%.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Your notes call the lithosphere “the main source of pollutants and a permanent accumulator”. Why?',
          options: [
            { text: 'Because it is made of plastic.', why: 'The asthenosphere is “plastic” in the sense of flowing slowly. That has nothing to do with pollution.' },
            { text: 'Raw materials are extracted from it, and pollutants build up in it, through natural sources like volcanoes and human ones like burning fossil fuels.', correct: true, why: 'It is both where pollution starts (extraction) and where it accumulates.' },
            { text: 'Because it is the thinnest sphere.', why: 'Thickness isn’t the reason.' },
            { text: 'Because no life touches it.', why: 'About 1 km of it interacts with the biosphere, for example through aquifers.' },
          ],
          explain: 'The **pedosphere**, its uppermost part, reacts chemically with the other spheres through soil formation.',
        },
        {
          type: 'bridge',
          title: 'Lithosphere: grounded.',
          recap: [
            'Crust + uppermost mantle, ~100 km, above the **asthenosphere**. Plates moved by mantle convection.',
            'Oceanic crust: thin basalt, ~3.0. Continental: thick granite, ~2.7. Oxygen 47%, silicon 28%.',
          ],
          why: 'Time for a case that crosses the sky and the rock.',
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
          title: 'Which gas is most of the air?',
          body: 'Here’s how each guess from the start compares.',
          rows: HOOK,
          after: 'Nearly four out of every five breaths you take are nitrogen.',
        },
        {
          type: 'story',
          art: 'earth',
          eyebrow: 'Case file',
          title: 'A flight from Lagos to Abuja',
          body: 'You’re on a morning flight. The plane climbs to about 11 km, cruises, then lands. A geography student sits beside you asking questions.\n\nFour questions, getting harder.',
          cta: 'Open the case',
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 1 of 4',
          prompt: 'At about 11 km up, which layer is the plane most likely in, given your notes?',
          options: [
            { text: 'Troposphere', correct: true, why: 'The troposphere is 7–20 km thick, so 11 km is very likely still inside it.' },
            { text: 'Mesosphere', why: 'That’s the third layer up, far above any airliner.' },
            { text: 'Exosphere', why: 'That’s the outermost layer, fading into space.' },
            { text: 'Above the Kármán line', why: 'The Kármán line is about 100 km up: space.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 2 of 4',
          prompt: 'It’s 30°C on the ground in Lagos. Using your notes’ lapse rate, roughly how cold would the air outside be 5 km up?',
          options: [
            { text: 'About 25–28°C', why: 'That would be a lapse rate of under 1°C per km.' },
            { text: 'About 0–10°C', correct: true, why: '5 km × 4–6°C per km = 20–30°C colder: roughly 0–10°C.' },
            { text: 'About 60°C', why: 'Temperature falls with height in the troposphere, it doesn’t rise.' },
            { text: 'Exactly 30°C', why: 'The troposphere cools with height.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Case file · 3 of 4',
          prompt: 'The student asks why the air outside is too thin to breathe at cruising height. What do your notes say?',
          options: [
            { text: 'Air pressure and density decrease with altitude.', correct: true, why: 'Higher up there is less air pressing down, so it’s thinner.' },
            { text: 'Oxygen turns into nitrogen at height.', why: 'The gases are mixed, not chemically changing.' },
            { text: 'The plane is in the heterosphere.', why: 'The homosphere reaches about 80 km. The plane is far below that.' },
            { text: 'The stratosphere has no oxygen at all.', why: 'That’s not what the notes say, and the plane is in the troposphere anyway.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Case file · 4 of 4',
          prompt: 'Flying over the Atlantic coast, the student asks about the ground and seabed below. Which statements are true?',
          options: [
            { text: 'The crust under the ocean is thinner and denser than under the land.', correct: true, why: '**Oceanic crust**: 5–10 km, ~3.0 g/cm³. Continental: 20–70 km, ~2.7.' },
            { text: 'Oceanic crust is mainly basalt; continental crust is mainly granite.', correct: true, why: '**Basalt vs granite** is right.' },
            { text: 'The lithosphere rests on the plastic asthenosphere.', correct: true, why: '**The asthenosphere** lies below the lithosphere.' },
            { text: 'Continental crust is thinnest at mid-ocean ridges.', why: '**Mid-ocean ridges are under the ocean.** That’s where the lithosphere is thinnest.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know the sky and the rock.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
