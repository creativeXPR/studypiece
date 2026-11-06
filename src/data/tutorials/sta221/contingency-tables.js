// STA 221 · Chi-Square · Lesson 3: contingency tables, the test of independence, Yates' correction
// for 2 × 2 tables, and the test of homogeneity.
const DATA = [
  { rows: [[30, 20, 50], [40, 25, 35]], exp: [[35, 22.5, 42.5], [35, 22.5, 42.5]], say: '$\\chi^2 = 4.631 < 5.991$ (df $= 2$): **accept** independence. The bars sit close to the dashes.' },
  { rows: [[10, 90], [25, 75]], exp: [[17.5, 82.5], [17.5, 82.5]], say: 'Yates: $\\chi^2 = 6.788 > 3.841$ (df $= 1$): **reject** independence. Vaccinated people were infected less often.' },
];

import { fmt } from './stat';

const OBS = [[30, 20, 50], [40, 25, 35]];
const EXP = [[35, 22.5, 42.5], [35, 22.5, 42.5]];
const CELLX = [78, 168, 258];
const ROWY = [92, 196];
// Dots for one cell: 10 across, stacked upwards from the row's base line.
const cellDots = (r, c) => Array.from({ length: OBS[r][c] }, (_, k) => [CELLX[c] - 20 + (k % 10) * 4.5, ROWY[r] - 4 - Math.floor(k / 10) * 4.5]);
const part = (r, c) => ((OBS[r][c] - EXP[r][c]) ** 2) / EXP[r][c];

const table = {
  aria: 'Two hundred students sorted into a two by three table of faculty and study time, compared with the counts expected if the two were unrelated',
  steps: [
    { say: '$200$ students, $100$ from Science and $100$ from Arts, say when they prefer to study: morning, afternoon or night. Each dot is a student, sorted into its cell.' },
    { say: 'Over everyone: $70$ morning, $45$ afternoon, $85$ night. That is $35\\%$, $22.5\\%$, $42.5\\%$ of the $200$.' },
    { say: 'If faculty made **no difference**, each faculty of $100$ would split the same way: $35$, $22.5$, $42.5$. These are the **expected** counts: $E = \\frac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}$.' },
    { say: 'Now compare each cell’s observed count with its expected count, exactly as with the die: $\\frac{(O - E)^2}{E}$ per cell.' },
    { say: 'Add all six: $\\chi^2 = 4.631$. Degrees of freedom: $(2 - 1)(3 - 1) = 2$, so the table value is $5.991$. $4.631 < 5.991$: **no significant evidence** that study time depends on faculty.' },
  ],
  draw: (step) => {
    const shapes = [];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        cellDots(r, c).forEach((p, k) => shapes.push({ id: `c${r}${c}-${k}`, dot: p, r: 1.8, kind: r ? 'b' : 'a', delay: k * 8 }));
        shapes.push({ id: `o${r}${c}`, text: [CELLX[c] + 2, ROWY[r] + 14], label: step >= 3 ? `${OBS[r][c]} vs ${EXP[r][c]}` : String(OBS[r][c]), kind: r ? 'b' : 'a', size: 11 });
        shapes.push({ id: `e${r}${c}`, text: [CELLX[c] + 2, ROWY[r] - 62], label: step >= 3 ? fmt(part(r, c), 3) : `E = ${EXP[r][c]}`, kind: 'd', size: 11, o: step >= 2 ? 1 : 0 });
      }
      shapes.push({ id: `row${r}`, text: [6, ROWY[r] - 20], label: r ? 'Arts' : 'Science', kind: r ? 'b' : 'a', size: 11, anchor: 'start' });
    }
    ['Morning', 'Afternoon', 'Night'].forEach((h, c) => shapes.push({ id: `col${c}`, text: [CELLX[c] + 2, 12], label: h, kind: 's', size: 11 }));
    [70, 45, 85].forEach((n, c) => shapes.push({ id: `tot${c}`, text: [CELLX[c] + 2, 236], label: `total ${n}`, kind: 'c', size: 11, o: step >= 1 ? 1 : 0 }));
    shapes.push({ id: 'chi', text: [170, 254], label: 'χ² = 4.631 < 5.991 (df 2)', kind: 'd', size: 12, o: step >= 4 ? 1 : 0 });
    return shapes;
  },
};

export default {
  id: 'contingency-tables',
  title: 'Contingency tables',
  covers: 'r × c contingency tables, expected frequencies E = row total × column total / grand total, the test of independence, df = (r − 1)(c − 1), Yates’ correction and the 2 × 2 shortcut, the test of homogeneity',
  minutes: 17,
  sections: [
    {
      name: 'Test of independence',
      terms: [
        ['Contingency table', 'An $r \\times c$ table of observed counts for two categorical variables, with row, column and grand totals.'],
        ['Expected frequency', '$E = \\dfrac{\\text{row total} \\times \\text{column total}}{\\text{grand total}}$ ("RC over G").'],
        ['Degrees of freedom', '$(r - 1)(c - 1)$.'],
        ['Check', 'The expected table has the same row and column totals as the observed one.'],
      ],
      screens: [
        { type: 'custom', widget: 'scene', eyebrow: 'Chi-Square · Lesson 3', title: 'Are two things related?', graph: table },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'Play with it',
          title: 'Observed bars against expected dashes',
          body: 'In each column, the left bar is the first row and the right bar the second; dashes mark the expected counts. Big gaps make a big $\\chi^2$.',
          graph: {
            x: [0.3, 3.7], y: [0, 100], xs: [[1], [2], [3]], ys: [[25], [50], [75], [100]],
            views: ['Study time × faculty', 'Infection × vaccination'],
            rects: [
              { kind: 'up', at: (p, v) => DATA[v].rows[0].map((o, j) => [j + 0.62, o, 0.36, o]) },
              { kind: 'tag', at: (p, v) => DATA[v].rows[1].map((o, j) => [j + 1.02, o, 0.36, o]) },
            ],
            segs: [0, 1, 2].flatMap((j) => [0, 1].map((i) => ({
              kind: 'guide',
              show: (p, v) => j < DATA[v].exp[i].length,
              at: (p, v) => { const e = DATA[v].exp[i][j] ?? 0; const x = j + 0.62 + 0.4 * i; return [x - 0.02, e, x + 0.38, e]; },
            }))),
            read: (p, v) => DATA[v].say,
            need: 2,
            action: 'Look at both tables',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Is preferred study time related to faculty? ($5\\%$)',
          body: '**1.** H₀: study time is independent of faculty. H₁: they are related.\n**2.** Expected: $35$, $22.5$, $42.5$ in both rows.\n**3.** $\\frac{(O - E)^2}{E}$ per cell: $0.7143, 0.2778, 1.3235$ (science) and the same for arts, so $\\chi^2 = 4.631$.\n**4.** df $= (2 - 1)(3 - 1) = 2$, $\\chi^2_{0.05}(2) = 5.991$. $4.631 < 5.991$: accept H₀.\n**5.** No significant evidence that study time depends on faculty.',
          asides: [{ label: 'Exam tip', text: 'Write the full $E$ table, the $\\frac{(O - E)^2}{E}$ table, df, the table value and the decision: each earns marks.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Opinion by gender: Male $60, 25, 15$; Female $40, 35, 25$ (each row totals $100$). The expected count for Male–Agree is',
          options: [
            { text: '$50$', correct: true, why: '$\\frac{100 \\times 100}{200}$: row total $100$, column total $60 + 40 = 100$.' },
            { text: '$60$', why: 'That is the observed count.' },
            { text: '$33.3$', why: 'Use row total × column total ÷ grand total.' },
            { text: '$30$', why: 'That is the Neutral column’s expected count ($\\frac{100 \\times 60}{200}$).' },
          ],
        },
        {
          type: 'bridge',
          title: 'Independence: set.',
          recap: ['$E = \\frac{RC}{G}$.', 'df $= (r - 1)(c - 1)$.', 'Reject when $\\chi^2$ exceeds the table value.'],
          why: 'Two variations: small $2 \\times 2$ tables, and comparing several populations.',
        },
      ],
    },
    {
      name: 'Yates and homogeneity',
      terms: [
        ['Yates’ correction', 'For $2 \\times 2$ tables: $\\chi^2 = \\sum\\dfrac{(|O - E| - 0.5)^2}{E}$. Conservative: harder to reach significance.'],
        ['2 × 2 shortcut', '$\\chi^2_{\\text{Yates}} = \\dfrac{n\\left(|ad - bc| - \\frac n2\\right)^2}{(a + b)(c + d)(a + c)(b + d)}$.'],
        ['Homogeneity', 'Several separate samples: do they share the same proportions? Same arithmetic as independence; the row (or column) totals are fixed by design.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Vaccinated: $10$ infected, $90$ not. Not vaccinated: $25$ infected, $75$ not. Yates’ test at $5\\%$.',
          body: '$E$: infected $= \\frac{100 \\times 35}{200} = 17.5$, not infected $= 82.5$ (both rows). Every $|O - E| = 7.5$, so $|O - E| - 0.5 = 7$:\n$$\\chi^2 = 49\\left(\\tfrac{1}{17.5} + \\tfrac{1}{82.5} + \\tfrac{1}{17.5} + \\tfrac{1}{82.5}\\right) = 6.788.$$\nShortcut: $\\frac{200(|750 - 2250| - 100)^2}{100 \\times 100 \\times 35 \\times 165} = 6.788$ ✓.\n\ndf $= 1$, $\\chi^2_{0.05}(1) = 3.841$. $6.788 > 3.841$: reject H₀; infection is related to vaccination.',
          asides: [{ label: 'Note', text: 'Without the correction we would get $7.792$: the same decision, but a less cautious number.' }],
        },
        {
          type: 'story',
          eyebrow: 'Homogeneity',
          title: '$100$ students from each of three schools. Pass: $70, 60, 80$; Fail: $30, 40, 20$. Same pass rate?',
          body: 'H₀: the three schools have the same pass rate.\n$E_{\\text{pass}} = \\frac{210 \\times 100}{300} = 70$, $E_{\\text{fail}} = 30$ in every school.\n$$\\chi^2 = 0 + \\tfrac{100}{70} + \\tfrac{100}{70} + 0 + \\tfrac{100}{30} + \\tfrac{100}{30} = 9.524.$$\ndf $= 2$, $\\chi^2_{0.05}(2) = 5.991$: reject H₀. The pass rates differ.',
          asides: [{ label: 'Tip', text: 'Independence or homogeneity? One sample cross-classified two ways → independence. Several samples drawn and compared → homogeneity.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Treatment: $18$ recovered, $12$ not. Placebo: $7$ recovered, $23$ not. With Yates’ correction, $\\chi^2 = $',
          options: [
            { text: '$6.857$: recovery is related to treatment', correct: true, why: '$E = 12.5$ and $17.5$; $|O - E| = 5.5$, so $5^2\\left(\\frac{2}{12.5} + \\frac{2}{17.5}\\right) = 6.857 > 3.841$.' },
            { text: '$8.297$: related', why: 'That is the **uncorrected** value. Subtract $0.5$ from each $|O - E|$ first.' },
            { text: '$6.857$: not related', why: '$6.857 > 3.841$ is in the critical region.' },
            { text: '$2.42$: not related', why: 'Square $(|O - E| - 0.5) = 5$ before dividing by $E$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Contingency tables: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
