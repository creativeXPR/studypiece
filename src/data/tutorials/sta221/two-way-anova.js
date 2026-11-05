// STA 221 · ANOVA · Lesson 2: two-way classification (randomised blocks): blocking, SSC, SSR, SSE,
// the two-way ANOVA table with two F tests.
const SCORES = [[45, 52, 48], [40, 47, 46], [50, 58, 52], [43, 51, 46]];
const GRAND = 578 / 12;
const blockMean = (b) => SCORES[b].reduce((s, x) => s + x, 0) / 3;
const y = (b, m, v) => (v ? SCORES[b][m] - blockMean(b) + GRAND : SCORES[b][m]);

export default {
  id: 'two-way-anova',
  title: 'Two-way ANOVA with blocks',
  covers: 'Randomised blocks, nuisance factors, SST = SSC + SSR + SSE, column (treatment) and row (block) sums of squares, error df (c − 1)(r − 1), the two-way table and its two F tests',
  minutes: 15,
  sections: [
    {
      name: 'Blocking',
      terms: [
        ['Block', 'A group of experimental units alike in a nuisance factor (soil fertility, ability level). Every treatment appears once in every block.'],
        ['Split', '$SST = SSC$ (treatments, columns) $+ SSR$ (blocks, rows) $+ SSE$ (error).'],
        ['Short-cuts', '$CF = \\frac{T^2}{rc}$; $SSC = \\frac{\\sum T_j^2}{r} - CF$; $SSR = \\frac{\\sum B_i^2}{c} - CF$; $SSE = SST - SSC - SSR$.'],
        ['df', 'Columns $c - 1$; rows $r - 1$; error $(c - 1)(r - 1)$; total $rc - 1$.'],
        ['Two F tests', '$F_1 = \\frac{MSC}{MSE}$ against $F_\\alpha(c - 1, (c-1)(r-1))$; $F_2 = \\frac{MSR}{MSE}$ against $F_\\alpha(r - 1, (c-1)(r-1))$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'ANOVA · Lesson 2',
          title: 'Take the nuisance out of the error',
          body: 'In a fertiliser trial, a stream along one side of the field makes nearby plots more fertile. One-way ANOVA lumps that into "random error", hiding the fertiliser effect.\n\nFix: cut the field into strips (==blocks==) parallel to the stream and use **every** fertiliser once in each strip. Now the block effect can be measured and removed from the error:\n$$SST = SSC + SSR + SSE.$$',
          cta: 'See the blocks',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Teaching methods in four ability blocks',
          body: 'Each line is one ability block; the three points are its scores under methods $1$, $2$, $3$. The lines are parallel but at different heights: that height difference is the block effect.',
          graph: {
            x: [0.6, 3.4], y: [36, 62], xs: [[1, 'Method 1'], [2, 'Method 2'], [3, 'Method 3']], ys: [[40], [50], [60]],
            views: ['Raw scores', 'Block effect removed'],
            segs: [0, 1, 2, 3].flatMap((b) => [0, 1].map((m) => ({ kind: 'main', at: (p, v) => [m + 1, y(b, m, v), m + 2, y(b, m + 1, v)] }))),
            dots: [0, 1, 2, 3].flatMap((b) => [0, 1, 2].map((m) => ({ kind: 'ok', at: (p, v) => [m + 1, y(b, m, v)] }))),
            read: (p, v) => (v
              ? 'With each block shifted to the same level, the lines almost coincide: what is left over (the error, $SSE = 8$) is tiny, so the method effect stands out ($F_1 = 42.25$).'
              : 'The blocks differ a lot ($SSR = 131$). Left in the error, that would hide the methods.'),
            need: 2,
            action: 'Remove the block effect',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Scores — Block 1: $45, 52, 48$; Block 2: $40, 47, 46$; Block 3: $50, 58, 52$; Block 4: $43, 51, 46$',
          body: '$c = 3$ methods, $r = 4$ blocks. Method totals $178, 208, 192$; block totals $145, 133, 160, 140$; $T = 578$; $\\sum x^2 = 28092$; $CF = \\frac{578^2}{12} = 27840.33$.\n\n$SST = 251.67$.\n$SSC = \\frac{178^2 + 208^2 + 192^2}{4} - CF = 112.67$.\n$SSR = \\frac{145^2 + 133^2 + 160^2 + 140^2}{3} - CF = 131.00$.\n$SSE = 251.67 - 112.67 - 131.00 = 8.00$.\n\nMethods: MS $56.33$, $F_1 = \\frac{56.33}{1.333} = 42.25 > F_{0.05}(2, 6) = 5.14$: methods differ.\nBlocks: MS $43.67$, $F_2 = 32.75 > F_{0.05}(3, 6) = 4.76$: blocks differ too, so blocking was worthwhile.',
          asides: [{ label: 'Memory trick', text: 'Columns = treatments, Rows = blocks, and the error df is the product: $(c - 1)(r - 1)$. Check: $(c - 1) + (r - 1) + (c - 1)(r - 1) = rc - 1$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Four maize varieties grown in five blocks. The error degrees of freedom are',
          options: [
            { text: '$12$', correct: true, why: '$(c - 1)(r - 1) = 3 \\times 4$.' },
            { text: '$16$', why: 'That is $n - k$ from one-way ANOVA. Two-way error df is $(c - 1)(r - 1)$.' },
            { text: '$19$', why: 'That is the total df, $rc - 1$.' },
            { text: '$7$', why: 'Multiply $(c - 1)$ and $(r - 1)$, don’t add them.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Watch this',
          prompt: 'Your two-way ANOVA gives $SSE = -3.2$. What does it mean?',
          options: [
            { text: 'An arithmetic error: recheck $CF$ and $\\sum x^2$', correct: true, why: 'Sums of squares can never be negative.' },
            { text: 'The blocks have no effect', why: 'A negative SS is impossible, whatever the data.' },
            { text: 'The treatments are all equal', why: 'SS cannot be negative.' },
            { text: 'Use the absolute value, $3.2$', why: 'Find the mistake instead.' },
          ],
        },
        {
          type: 'finish',
          title: 'Two-way ANOVA: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
