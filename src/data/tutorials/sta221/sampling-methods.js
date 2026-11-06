// STA 221 · Sampling · Lesson 2: census versus sample, de facto and de jure enumeration, when
// sampling is unavoidable, and the random and non-random sampling methods, shown step by step.
import { rng } from './stat';

// 60 students in a 10 × 6 grid (the sampling frame, numbered 1–60). Rows 0–2 are first-years (30),
// rows 3–4 second-years (20), row 5 final-years (10). Hostels are 2 × 5 blocks.
const UNITS = Array.from({ length: 60 }, (_, k) => {
  const row = Math.floor(k / 10);
  const col = k % 10;
  return { k, row, col, p: [52 + 26 * col, 38 + 28 * row], stratum: row < 3 ? 0 : row < 5 ? 1 : 2 };
});
const pickRandom = (list, n, seed) => {
  const r = rng(seed);
  const pool = [...list];
  const out = [];
  while (out.length < n) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0].k);
  return out;
};
const SRS = pickRandom(UNITS, 12, 7);
const STRAT = [...pickRandom(UNITS.filter((u) => u.stratum === 0), 6, 3), ...pickRandom(UNITS.filter((u) => u.stratum === 1), 4, 5), ...pickRandom(UNITS.filter((u) => u.stratum === 2), 2, 9)];
const CLUSTER = UNITS.filter((u) => u.row >= 2 && u.row <= 3 && u.col >= 5).map((u) => u.k);
const SYST = UNITS.filter((u) => (u.k + 1) % 5 === 3).map((u) => u.k);
const CONV = UNITS.filter((u) => u.row === 0 && u.col < 6).map((u) => u.k);
const BANDS = [[22, 3], [106, 2], [162, 1]]; // [top y, rows] of each year group

const scene = {
  aria: 'Sixty numbered students; each sampling method lights up the 12 it picks',
  steps: [
    { say: 'To survey students we first need a **list** of all of them, numbered: the **sampling frame**. Here, $60$ students. Each one is a **sampling unit**. We want a sample of $12$.' },
    { say: '**Simple random sampling:** put all $60$ numbers in a hat and draw $12$. Every student has the **same chance**.' },
    { say: 'Now notice: the students fall into **groups that differ**: $30$ first-years, $20$ second-years, $10$ final-years. A simple random draw might miss the final-years altogether.' },
    { say: '**Stratified sampling:** sample from **every** group (stratum), in proportion to its size: $\\frac{30}{60} \\times 12 = 6$, then $4$, then $2$. Every group is represented.' },
    { say: 'Another way to see the same students: they live in $6$ hostels of $10$. Visiting $60$ scattered students is costly; visiting one hostel is cheap.' },
    { say: '**Cluster sampling:** pick **whole** hostels (clusters) at random and survey **everyone** in them. Here one hostel gives our $12$… well, $10$, close enough to show the idea.' },
    { say: '**Systematic sampling:** go down the numbered list. Step size $k = \\frac{N}{n} = \\frac{60}{12} = 5$. Pick a random start, say $3$, then every $5$th: $3, 8, 13, 18, \\dots$' },
    { say: 'All four are **random** methods: chance decides who is picked. Compare **convenience** sampling: asking whoever is nearest (the front row). Quick, but those students may not be typical: **bias**.' },
  ],
  draw: (step) => {
    const chosen = new Set([[], SRS, [], STRAT, [], CLUSTER, SYST, CONV][step]);
    const shapes = [];
    BANDS.forEach(([y, rows], i) => shapes.push({ id: `band${i}`, bar: [36, y + rows * 28], w: 272, h: step >= 2 && step <= 3 ? rows * 28 : 0, kind: ['a', 'b', 'c'][i], o: step >= 2 && step <= 3 ? 1 : 0, delay: i * 120 }));
    ['1st years', '2nd years', 'Final'].forEach((label, i) => shapes.push({ id: `bl${i}`, text: [312, BANDS[i][0] + 16], label, kind: ['a', 'b', 'c'][i], size: 9, anchor: 'start', o: step >= 2 && step <= 3 ? 1 : 0 }));
    for (const x of [39, 169, 299]) shapes.push({ id: `cx${x}`, line: [x, 24, x, 192], kind: 's', dash: true, o: step >= 4 && step <= 5 ? 1 : 0 });
    for (const y of [24, 80, 136, 192]) shapes.push({ id: `cy${y}`, line: [39, y, 299, y], kind: 's', dash: true, o: step >= 4 && step <= 5 ? 1 : 0 });
    UNITS.forEach((u) => {
      const on = chosen.has(u.k);
      shapes.push({ id: `u${u.k}`, dot: u.p, r: on ? 7 : 5, kind: on ? (step === 7 ? 'c' : 'd') : 's', delay: on ? (step === 6 ? u.k * 25 : (u.k % 12) * 30) : 0 });
      shapes.push({ id: `n${u.k}`, text: [u.p[0], u.p[1] + 3.5], label: String(u.k + 1), kind: 'a', size: 7, o: step === 0 || step === 6 ? 1 : 0 });
    });
    const counts = ['', '12 drawn at random', '', '6 + 4 + 2 = 12', '', 'one whole hostel', 'every 5th from 3', 'nearest 6: convenience'][step];
    shapes.push({ id: 'count', text: [170, 222], label: counts, kind: 'd', size: 12, o: counts ? 1 : 0 });
    return shapes;
  },
};

export default {
  id: 'sampling-methods',
  title: 'Census and sampling methods',
  covers: 'Sampling frame and unit, kinds of population, census versus sample, de facto and de jure enumeration, when sampling is unavoidable, random and non-random sampling methods',
  minutes: 15,
  sections: [
    {
      name: 'Sampling methods',
      terms: [
        ['Sampling frame / unit', 'A complete numbered list of the population / one thing we select from it.'],
        ['Kinds of population', 'Finite or infinite; real or hypothetical (e.g. all possible tosses of a coin).'],
        ['Census', 'A complete count of every member of the population: complete, but costly, slow and sometimes impossible.'],
        ['De facto enumeration', 'A census that counts each person **where they are found** at the census moment (e.g. census night), wherever they usually live.'],
        ['De jure enumeration', 'A census that counts each person at their **usual place of residence**, even if they were away at the census moment.'],
        ['When sampling is unavoidable', 'Destroyed by testing, Infinite population, Rush (short time), Tight resources, Changing population, Scattered units: "DIRT CS".'],
        ['Simple random', 'Every unit has an equal chance (with or without replacement). Needs a full frame.'],
        ['Stratified', 'Groups differ from each other but are alike inside: sample from **every** stratum, $n_h = \\frac{N_h}{N}n$.'],
        ['Cluster', 'Many similar groups spread over an area: pick **some** clusters, study the units in them.'],
        ['Systematic', 'Units in order: random start, then every $k$th unit, $k = \\frac Nn$. Beware hidden cycles.'],
        ['Multi-stage', 'Sample in stages: states, then local governments, then households.'],
        ['Non-random', 'Quota, judgement (purposive), convenience: quick but may be biased.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The mean $\\bar x$ of a sample of $20$ students is a',
          options: [
            { text: 'statistic: worked out from a sample, and it changes from sample to sample', correct: true, why: 'Parameter ↔ population, statistic ↔ sample.' },
            { text: 'parameter: it describes the population', why: 'Only a number from the **whole** population is a parameter.' },
            { text: 'population', why: 'The population is the group, not a number.' },
            { text: 'fixed number that never changes', why: 'You saw $\\bar x$ change with each new sample.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Sampling · Lesson 2',
          title: 'Count everyone, or just some?',
          body: 'A ==census== counts everyone. It is complete but expensive, slow, and sometimes impossible. Sampling is unavoidable when any of these holds (**DIRT CS**):\n\n**D**estroyed: testing ruins the unit (bulb lifetimes, crash tests).\n**I**nfinite population.\n**R**ush: results needed quickly.\n**T**ight resources: money and trained staff.\n**C**hanging: the population moves (fish, traffic).\n**S**cattered: units spread widely.',
        },
        {
          type: 'reveal',
          eyebrow: 'Counting a population',
          title: 'De facto or de jure?',
          body: 'A population census can count people in two ways. Picture a trader from Ibadan who is visiting Lagos on census night.',
          cards: [
            { title: 'De facto', text: 'Count people **where they are** at the census moment. The trader is counted in **Lagos**. Simple and quick, with little double counting, but places with many visitors (hotels, hospitals, markets) look bigger than they really are.' },
            { title: 'De jure', text: 'Count people at their **usual residence**. The trader is counted in **Ibadan**. Gives the "permanent" population used for planning, but needs a clear rule for "usual residence" and risks people being missed or counted twice.' },
            { title: 'Memory trick', text: '**De facto** = "in fact": where you actually are. **De jure** = "by law": where you belong (your usual home).' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A nurse who lives in Ibadan spent census night on duty at a hospital in Oyo. The census counts her in Ibadan. This is',
          options: [
            { text: 'de jure enumeration', correct: true, why: 'She is counted at her usual place of residence.' },
            { text: 'de facto enumeration', why: 'De facto would count her where she actually was: the hospital in Oyo.' },
            { text: 'cluster sampling', why: 'A census counts everyone; it is not a sample.' },
            { text: 'quota sampling', why: 'No quotas or sampling are involved.' },
          ],
        },
        {
          type: 'custom',
          widget: 'scene',
          eyebrow: 'See it',
          title: 'Four ways to choose 12 students',
          graph: scene,
          asides: [{ label: 'Memory trick', text: 'Stratified = **some from every** group (a buffet plate with a bit of each dish). Cluster = **all from some** groups (finish a few whole dishes).' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'A school of $1{,}200$: $500$ JSS, $400$ SSS science, $300$ SSS arts. Sample $60$.',
          body: '**(a) Systematic, random start 7.** $k = \\frac{1200}{60} = 20$: students $7, 27, 47, 67, \\dots$\n\n**(b) Stratified, proportional allocation** $n_h = \\frac{N_h}{N}n$:\n$$\\text{JSS} = \\tfrac{500}{1200}(60) = 25, \\quad \\text{science} = 20, \\quad \\text{arts} = 15.$$\nCheck: $25 + 20 + 15 = 60$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A register lists $840$ farmers; a systematic sample of $35$ starts at farmer $9$. The first three chosen are',
          options: [
            { text: '$9, 33, 57$', correct: true, why: '$k = \\frac{840}{35} = 24$.' },
            { text: '$9, 44, 79$', why: 'Add $k = \\frac Nn = 24$, not $n = 35$.' },
            { text: '$24, 48, 72$', why: 'Start at the random start, $9$.' },
            { text: '$9, 18, 27$', why: 'The step is $k = 24$.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Non-random methods',
          title: 'Quick, cheap, and possibly biased',
          cards: [
            { title: 'Quota', text: 'Fill set numbers (30 men, 20 women) but the interviewer chooses who. Unlike stratified sampling, the choice within groups is **not** random.' },
            { title: 'Judgement', text: 'The investigator picks the units he or she thinks are typical. Only as good as the judgement.' },
            { title: 'Convenience', text: 'Whoever is easiest to reach. The easiest method, and the most likely to mislead.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Name the method',
          prompt: 'A national survey picks states, then local governments in them, then households. This is',
          options: [
            { text: 'multi-stage sampling', correct: true, why: 'Sampling happens in stages, from large units down to households.' },
            { text: 'stratified sampling', why: 'Stratified samples from **every** group; here only some states are chosen at each stage.' },
            { text: 'systematic sampling', why: 'There is no "every $k$th unit" here.' },
            { text: 'quota sampling', why: 'Quota sampling is non-random; each stage here is chosen at random.' },
          ],
        },
        {
          type: 'finish',
          title: 'Sampling methods: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
