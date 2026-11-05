// STA 221 · Sampling · Lesson 1: the vocabulary of inference, census versus sample, when sampling
// is unavoidable, and the random and non-random sampling methods.
import { rng } from './stat';

// 60 units in a 10 × 6 grid. Rows 0–2 are stratum A (30), rows 3–4 stratum B (20), row 5 stratum C (10).
const UNITS = Array.from({ length: 60 }, (_, k) => {
  const row = Math.floor(k / 10);
  const col = k % 10;
  return { k, row, col, p: [-3.6 + 0.8 * col, 2.2 - 0.8 * row, 0], stratum: row < 3 ? 0 : row < 5 ? 1 : 2 };
});
const pickRandom = (list, n, seed) => {
  const r = rng(seed);
  const pool = [...list];
  const out = [];
  while (out.length < n) out.push(pool.splice(Math.floor(r() * pool.length), 1)[0].k);
  return out;
};
const PICKS = [
  pickRandom(UNITS, 12, 7),
  [...pickRandom(UNITS.filter((u) => u.stratum === 0), 6, 3), ...pickRandom(UNITS.filter((u) => u.stratum === 1), 4, 5), ...pickRandom(UNITS.filter((u) => u.stratum === 2), 2, 9)],
  UNITS.filter((u) => u.row >= 2 && u.row <= 3 && u.col >= 5).map((u) => u.k),
  UNITS.filter((u) => (u.k + 1) % 5 === 3).map((u) => u.k),
];
const box = (x0, y0, x1, y1) => [[x0, y0, 0], [x1, y0, 0], [x1, y1, 0], [x0, y1, 0]];
const STRATA = [box(-4, 2.6, 4, 0.2), box(-4, 0.2, 4, -1.4), box(-4, -1.4, 4, -2.2)];

export default {
  id: 'sampling-methods',
  title: 'Populations, samples and sampling methods',
  covers: 'Statistical inference, population, sample, sampling unit and frame, parameter and statistic, estimator and estimate, kinds of population, census versus sample, when sampling is unavoidable, random and non-random sampling methods',
  minutes: 15,
  sections: [
    {
      name: 'The vocabulary',
      terms: [
        ['Statistical inference', 'Drawing conclusions about a population from a sample, using probability to say how reliable they are. Two jobs: **estimation** and **hypothesis testing**.'],
        ['Population / sample', 'The whole group we care about / the part we actually observe.'],
        ['Sampling unit / frame', 'One thing we select / a complete numbered list of all units.'],
        ['Parameter / statistic', 'A number describing the population ($\\mu, \\sigma^2, p$) / a function of the sample with no unknown parameters ($\\bar x, s^2, \\hat p$).'],
        ['Estimator / estimate', 'The rule (e.g. "use $\\bar x$") / the number it gives for one sample (e.g. $\\bar x = 25$).'],
        ['Kinds of population', 'Finite or infinite; real (existent) or hypothetical (e.g. all possible tosses of a coin).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Sampling · Lesson 1',
          title: 'From a small part to the whole',
          body: 'You want the average rent of every two-bedroom flat in a city. You can’t visit them all, so you visit $60$ and use them to say something about **all** flats, with a measure of how sure you are. That is ==statistical inference==.\n\nIt has two jobs:\n**Estimation:** "the mean rent is about ₦85,000, give or take ₦4,000".\n**Hypothesis testing:** "is the claim that the mean is ₦75,000 believable?"',
        },
        {
          type: 'story',
          eyebrow: 'Memory trick',
          title: 'P–P and S–S',
          body: '**P**arameter goes with **P**opulation; **S**tatistic goes with **S**ample.\n\nMean: $\\mu$ vs $\\bar x$. Variance: $\\sigma^2$ vs $s^2$. Proportion: $p$ vs $\\hat p$. Size: $N$ vs $n$.\n\nGreek letters for parameters, English letters for statistics.\n\n**Estimator vs estimate:** the estimator is the recipe ("add and divide by $n$"); the estimate is the cake ("$25.3$").',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: '"$38\\%$ of $400$ voters polled support a candidate." The $38\\%$ is',
          options: [
            { text: 'a statistic, $\\hat p = 0.38$', correct: true, why: 'It comes from a sample of $400$, not from all voters. It estimates the parameter $p$.' },
            { text: 'a parameter, $p = 0.38$', why: 'A parameter would need **every** voter.' },
            { text: 'a sampling frame', why: 'A frame is the list of units, not a result.' },
            { text: 'a census', why: 'A census counts the whole population.' },
          ],
          explain: 'One test settles it: was it computed from everybody (parameter) or from some (statistic)?',
        },
        {
          type: 'choice',
          eyebrow: 'Watch this one',
          prompt: 'Is $\\sum(x_i - \\mu)^2$ a statistic when $\\mu$ is unknown?',
          options: [
            { text: 'No: a statistic may not contain unknown parameters', correct: true, why: 'You cannot compute it from the sample alone. $\\sum(x_i - \\bar x)^2$ **is** a statistic.' },
            { text: 'Yes: it is computed from sample values', why: 'It also needs $\\mu$, which is unknown.' },
            { text: 'Yes, it is the sample variance', why: 'The sample variance uses $\\bar x$, not $\\mu$.' },
            { text: 'Only for large samples', why: 'Sample size does not matter here.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Vocabulary: set.',
          recap: ['Parameter ↔ population, statistic ↔ sample.', 'Estimator = rule, estimate = number.', 'Inference = estimation + hypothesis testing.'],
          why: 'Next: how to pick a sample fairly.',
        },
      ],
    },
    {
      name: 'Sampling methods',
      terms: [
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
          type: 'story',
          eyebrow: 'Census or sample?',
          title: 'When a census is out',
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
          widget: 'space',
          eyebrow: 'See it',
          title: 'Four random methods, one population',
          body: 'Sixty units in three strata (shaded bands). The red dots are the sample each method picks.',
          graph: {
            R: 4, bare: true,
            views: ['Simple random', 'Stratified', 'Cluster', 'Systematic'],
            draw: (P, v) => {
              const chosen = new Set(PICKS[v]);
              const items = v === 1 ? STRATA.map((poly, i) => ({ poly, kind: ['a', 'b', 'c'][i] })) : [];
              if (v === 2) {
                for (const x of [-4, 0, 4]) items.push({ seg: [[x, 2.6, 0], [x, -2.2, 0]], kind: 's', dash: true });
                for (const y of [2.6, 1, -0.6, -2.2]) items.push({ seg: [[-4, y, 0], [4, y, 0]], kind: 's', dash: true });
              }
              for (const u of UNITS) items.push({ pt: u.p, kind: chosen.has(u.k) ? 'd' : 's' });
              return items;
            },
            read: (P, v) => [
              '**Simple random:** $12$ units drawn by chance, like names from a hat. Every unit had the same chance.',
              '**Stratified:** some from **every** stratum, in proportion to size: $6 + 4 + 2 = 12$.',
              '**Cluster:** the area is cut into $6$ clusters of $10$; one whole cluster is chosen at random.',
              '**Systematic:** $k = \\frac{60}{12} = 5$; random start $3$, then every $5$th unit: $3, 8, 13, \\dots$',
            ][v],
            need: 4,
            action: 'Look at all four methods',
          },
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
