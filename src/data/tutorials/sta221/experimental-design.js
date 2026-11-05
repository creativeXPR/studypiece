// STA 221 · ANOVA · Lesson 1: experimental design. Terms, the three principles (randomisation,
// replication, local control), the completely randomised and randomised block designs, and how to
// tell from a table whether it needs one-way or two-way ANOVA.
import { rng } from './stat';

const KIND = { A: 'a', B: 'b', C: 'c' };
const shuffle = (list, seed) => {
  const r = rng(seed);
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const CRD = shuffle(['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C'], 17);
const RBD = [0, 1, 2, 3].flatMap((r) => shuffle(['A', 'B', 'C'], 30 + r));
const plot = (k) => {
  const x = -1.7 + 1.7 * (k % 3);
  const y = 1.9 - 1.3 * Math.floor(k / 3);
  return { x, y, poly: [[x - 0.75, y - 0.55, 0], [x + 0.75, y - 0.55, 0], [x + 0.75, y + 0.55, 0], [x - 0.75, y + 0.55, 0]] };
};

export default {
  id: 'experimental-design',
  title: 'Experimental design',
  covers: 'Experimental unit, treatment, factor, response, experimental error, the principles of randomisation, replication and local control, the completely randomised design and the randomised block design, telling a one-way table from a two-way table',
  minutes: 14,
  sections: [
    {
      name: 'Principles',
      terms: [
        ['Experiment', 'A study in which we **apply** treatments to units and measure the response, rather than just observe.'],
        ['Experimental unit', 'The thing a treatment is applied to: a plot of land, an animal, a student.'],
        ['Experimental error', 'The variation between units that receive the same treatment.'],
        ['Randomisation', 'Assign treatments to units by chance, so no treatment is favoured and the errors are independent.'],
        ['Replication', 'Apply each treatment to several units, so the error can be measured and averaged out.'],
        ['Local control', 'Group similar units into **blocks** and compare treatments within each block, so a nuisance factor is removed from the error.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'ANOVA · Lesson 1',
          title: 'Plan the experiment before collecting the data',
          body: 'To compare three fertilisers we **apply** them to plots of land (the ==experimental units==) and measure the yield (the **response**). Plots given the same fertiliser still differ a little: that is ==experimental error==.\n\nA good design follows three principles:\n**Randomisation:** decide by chance which plot gets which fertiliser.\n**Replication:** give each fertiliser to several plots.\n**Local control:** if plots differ (one side of the field is wetter), group alike plots into blocks.',
          cta: 'See the field',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Two ways to lay out the same field',
          body: 'Twelve plots, three fertilisers (A, B, C), each used four times. A stream runs along the top of the field, so the top plots are wetter.',
          graph: {
            R: 3.6, bare: true,
            views: ['Completely randomised', 'Randomised blocks'],
            draw: (P, v) => {
              const labels = v ? RBD : CRD;
              const items = [{ curve: (t) => [t, 3.05 + 0.12 * Math.sin(3 * t), 0], from: -2.6, to: 2.6, kind: 'a' }];
              if (v) for (let r = 0; r < 4; r++) items.push({ seg: [[-2.6, 1.25 - 1.3 * r, 0], [2.6, 1.25 - 1.3 * r, 0]], kind: 's', dash: true });
              labels.forEach((t, k) => {
                const p = plot(k);
                items.push({ poly: p.poly, kind: KIND[t] }, { text: [p.x, p.y - 0.12, 0], label: t, kind: KIND[t] });
              });
              return items;
            },
            read: (P, v) => (v
              ? '**Randomised block design (RBD):** each row is a block of alike plots, and every fertiliser appears **once in every block**, in random order. The wet top row affects A, B and C equally. Analyse with **two-way** ANOVA.'
              : '**Completely randomised design (CRD):** fertilisers are spread over the whole field at random. Simple, but if one fertiliser lands mostly in the wet rows it gets an unfair boost, and that shows up as error. Analyse with **one-way** ANOVA.'),
            need: 2,
            action: 'Compare both layouts',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Giving each fertiliser to four plots instead of one is the principle of',
          options: [
            { text: 'replication', correct: true, why: 'Repeating a treatment lets us measure the experimental error and average it out.' },
            { text: 'randomisation', why: 'Randomisation is about **which** plots get which treatment, by chance.' },
            { text: 'local control', why: 'Local control means grouping alike units into blocks.' },
            { text: 'blocking the stream', why: 'That would be local control, not repetition.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Principles: set.',
          recap: ['Randomisation, replication, local control.', 'CRD → one-way ANOVA; RBD → two-way ANOVA.'],
          why: 'The exam may hand you a table and ask which ANOVA it needs.',
        },
      ],
    },
    {
      name: 'One-way or two-way?',
      terms: [
        ['Completely randomised design (CRD)', 'Treatments assigned to units completely at random. Analysed by **one-way** ANOVA. Group sizes may differ.'],
        ['Randomised block design (RBD)', 'Units grouped into blocks; every treatment once in each block, at random. Analysed by **two-way** ANOVA.'],
        ['Telling the table', 'Rows are only repeats (unlabelled or "Obs 1, 2, …", often unequal lengths) → one-way. Rows are a second factor (block, day, batch, ability group, plot), one value in every cell → two-way.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Reading the table',
          title: 'Ask: do the rows mean anything?',
          cards: [
            { title: 'One-way', text: 'Columns are treatments; the numbers down a column are just repeats. Row order doesn’t matter, and columns can have different lengths. E.g. Method 1: $70, 75, 68, 77, 80$; Method 2: $65, 60, 72, 63$.' },
            { title: 'Two-way', text: 'Rows are labelled with a second factor (Block 1–4, Monday–Friday, Machine 1–3) and every row has exactly one value per treatment. E.g. Block 1: $45, 52, 48$; Block 2: $40, 47, 46$.' },
            { title: 'Quick check', text: 'Unequal column lengths → it can only be one-way. Named rows with a full grid → two-way.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Yields of four maize varieties are recorded on each of five blocks of land, one plot per variety per block. Which analysis?',
          options: [
            { text: 'Two-way ANOVA (varieties and blocks)', correct: true, why: 'Rows are blocks, a second factor, with one value in every cell: a randomised block design.' },
            { text: 'One-way ANOVA', why: 'That would throw the block effect into the error.' },
            { text: 'A χ² test of independence', why: 'Yields are measurements, not counts.' },
            { text: 'Correlation', why: 'We are comparing means of several groups.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Scores of students taught by three methods: Method 1 has $5$ students, Method 2 has $4$, Method 3 has $6$. Which analysis?',
          options: [
            { text: 'One-way ANOVA', correct: true, why: 'Unequal group sizes and no second factor: a completely randomised design.' },
            { text: 'Two-way ANOVA', why: 'There are no blocks; the rows are just different students.' },
            { text: 'Two-way ANOVA with $6$ blocks', why: 'Columns of different lengths can’t form blocks.' },
            { text: 'A z test for two means', why: 'There are three groups: use ANOVA.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'The procedure',
          prompt: 'Put the steps for constructing an ANOVA in order.',
          items: [
            'Decide one-way or two-way from the design, and write the model.',
            'State the assumptions and the hypotheses.',
            'Compute totals, the correction factor and the sums of squares.',
            'Fill the ANOVA table: df, mean squares and F.',
            'Compare F with the table value and conclude in words.',
          ],
        },
        {
          type: 'finish',
          title: 'Experimental design: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
