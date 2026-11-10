// MTH 209 · Part C · Lesson 3: the middle of a table and its mistakes. Everett's central-difference
// formula (the notes' e^0.644 example, from a recomputed eˣ table: the notes' entry for 0.63 is a
// rounding slip), choosing between Newton forward, backward and Everett, and finding and correcting
// a wrong entry from the pattern it leaves in the differences.
// Every number below was recomputed in Python (see docs/mth209-rebuild.md).

export default {
  id: 'central-differences',
  title: "Everett's formula, and errors in a table",
  covers: "Central differences, Everett's interpolation formula with s = 1 − r, choosing between Newton forward, Newton backward and Everett, how one wrong entry spreads through a difference table (binomial coefficients with alternating signs), and locating and correcting it",
  minutes: 16,
  sections: [
    {
      name: "Everett's formula",
      terms: [
        ["Everett's formula", "$f(x_0 + rh) = sf_0 + \\frac{s(s^2 - 1)}{3!}\\delta^2f_0 + \\frac{s(s^2 - 1)(s^2 - 4)}{5!}\\delta^4f_0 + \\cdots + rf_1 + \\frac{r(r^2 - 1)}{3!}\\delta^2f_1 + \\frac{r(r^2 - 1)(r^2 - 4)}{5!}\\delta^4f_1 + \\cdots$, with $s = 1 - r$."],
        ['Central second difference', '$\\delta^2f_k = f_{k+1} - 2f_k + f_{k-1}$: the second difference on the same row as $f_k$.'],
        ['Which formula', 'Near the start of a table: Newton forward. Near the end: Newton backward. In the middle: Everett.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part C · Lesson 4',
          title: 'The middle of the table',
          body: "Newton's forward formula reads the differences going **down** from the top of the table; the backward formula reads them going **up** from the bottom. For a value in the **middle**, both reach for differences far from $x$, and the terms shrink slowly.\n\nEverett's formula uses only the two rows that **bracket** $x$, with their **even** central differences $\\delta^2, \\delta^4, \\ldots$ It is linear interpolation plus corrections.",
          cta: 'Show me',
        },
        {
          type: 'story',
          eyebrow: 'The formula',
          title: 'Linear interpolation, then corrections',
          body: 'With $x = x_0 + rh$ between $x_0$ and $x_1 = x_0 + h$, and $s = 1 - r$:\n$$f(x) = \\underbrace{sf_0 + rf_1}_{\\text{linear}} + \\frac{s(s^2 - 1)}{3!}\\delta^2f_0 + \\frac{r(r^2 - 1)}{3!}\\delta^2f_1 + \\cdots$$\nThe next pair uses $\\delta^4$ with $\\frac{s(s^2 - 1)(s^2 - 4)}{5!}$ and $\\frac{r(r^2 - 1)(r^2 - 4)}{5!}$.\n\n• $\\delta^2f_0$ is the second difference on the **row of $x_0$**; $\\delta^2f_1$ on the **row of $x_1$**.\n• $r$ and $s$ swap roles between the two halves: the formula is symmetric.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Find $e^{0.644}$ from a table of $e^x$',
          body: '$$\\begin{array}{c|c|c|c} x & e^x & \\Delta & \\Delta^2 \\\\ \\hline 0.63 & 1.877611 & & \\\\ & & 0.018870 & \\\\ 0.64 & 1.896481 & & 0.000190 \\\\ & & 0.019060 & \\\\ 0.65 & 1.915541 & & 0.000191 \\\\ & & 0.019251 & \\\\ 0.66 & 1.934792 & & \\end{array}$$\n$x_0 = 0.64$, $h = 0.01$, so $r = 0.4$, $s = 0.6$, $\\delta^2f_0 = 0.000190$, $\\delta^2f_1 = 0.000191$.\n• Linear: $0.6(1.896481) + 0.4(1.915541) = 1.904105$\n• Corrections: $\\frac{0.6(0.36 - 1)}{6} = -0.064$ and $\\frac{0.4(0.16 - 1)}{6} = -0.056$\n• $1.904105 - 0.064(0.000190) - 0.056(0.000191) = 1.904082$ ✓',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Use Everett\'s formula to find $e^{0.627}$ from $f_0 = e^{0.62} = 1.858928$, $f_1 = e^{0.63} = 1.877611$, $\\delta^2f_0 = 0.000186$, $\\delta^2f_1 = 0.000187$.',
          graph: {
            steps: [
              { ask: '$r = \\frac{0.627 - 0.62}{0.01} = $', answer: 0.7, tol: 0.0001, hint: 'Then $s = 1 - r = 0.3$.' },
              { ask: 'Linear part $sf_0 + rf_1 = $ (6 d.p.)', answer: 1.872006, tol: 0.000002, hint: '$0.3(1.858928) + 0.7(1.877611)$.' },
              { ask: '$\\frac{s(s^2 - 1)}{6} = $ (4 d.p.)', answer: -0.0455, tol: 0.00005, hint: '$\\frac{0.3(0.09 - 1)}{6}$.' },
              { ask: '$\\frac{r(r^2 - 1)}{6} = $ (4 d.p.)', answer: -0.0595, tol: 0.00005, hint: '$\\frac{0.7(0.49 - 1)}{6}$.' },
              { ask: '$e^{0.627} \\approx$ (6 d.p.)', answer: 1.871987, tol: 0.000002, hint: '$1.872006 - 0.0455(0.000186) - 0.0595(0.000187)$.', done: 'True value $1.871986$: right to 6 d.p.' },
            ],
          },
        },
        {
          type: 'sort',
          eyebrow: 'Choose the formula',
          prompt: 'A table runs from $x = 1.0$ to $x = 2.0$ in steps of $0.1$. Which formula suits each value?',
          buckets: [
            { id: 'f', label: 'Newton forward' },
            { id: 'e', label: 'Everett' },
            { id: 'b', label: 'Newton backward' },
          ],
          items: [
            { text: '$f(1.03)$', bucket: 'f', why: '**Near the top**: the forward differences from $x_0 = 1.0$ are all available.' },
            { text: '$f(1.54)$', bucket: 'e', why: '**In the middle**: use the two rows $1.5$ and $1.6$ and their central differences.' },
            { text: '$f(1.97)$', bucket: 'b', why: '**Near the bottom**: the backward differences from $x_n = 2.0$.' },
            { text: '$f(1.46)$', bucket: 'e', why: '**In the middle** again: rows $1.4$ and $1.5$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Everett: set.',
          recap: [
            '$f(x) = sf_0 + rf_1$ plus $\\delta^2$, $\\delta^4$ corrections, $s = 1 - r$.',
            'Forward at the top, Everett in the middle, backward at the bottom.',
          ],
          why: 'Every formula trusts the table. Next: how to catch a wrong entry.',
        },
      ],
    },
    {
      name: 'Errors in a table',
      terms: [
        ['How an error spreads', 'An error $\\varepsilon$ in one entry gives $\\varepsilon, -\\varepsilon$ in $\\Delta$; $\\varepsilon, -2\\varepsilon, \\varepsilon$ in $\\Delta^2$; $\\varepsilon, -3\\varepsilon, 3\\varepsilon, -\\varepsilon$ in $\\Delta^3$: binomial coefficients with alternating signs.'],
        ['Finding it', 'Where the differences should be constant (or smooth), look for that pattern. Its centre points to the wrong entry, and its size gives $\\varepsilon$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'One mistake leaves a fingerprint',
          body: "Add an error $\\varepsilon$ to one entry and take differences. Only the differences that **use** that entry change:\n$$\\begin{array}{c|c|c|c} f & \\Delta & \\Delta^2 & \\Delta^3 \\\\ \\hline \\varepsilon & \\varepsilon,\\ -\\varepsilon & \\varepsilon,\\ -2\\varepsilon,\\ \\varepsilon & \\varepsilon,\\ -3\\varepsilon,\\ 3\\varepsilon,\\ -\\varepsilon \\end{array}$$\nThe coefficients are the **binomial coefficients with alternating signs**, and they **grow** with each column. So a slip too small to see in the values becomes obvious in the higher differences, where a polynomial's differences should be constant.",
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'A table of $x^3$ with one misprint',
          body: '$x = 1, \\ldots, 8$: $\\ 1, 8, 27, 64, 127, 216, 343, 512$\n\n• $\\Delta$: $7, 19, 37, 63, 89, 127, 169$\n• $\\Delta^2$: $12, 18, 26, 26, 38, 42$\n• $\\Delta^3$: $6, 8, 0, 12, 4$\n\nA cubic should have constant $\\Delta^3$. Most entries say $6$, so subtract $6$: $\\ 0, 2, -6, 6, -2$.\n\nThat is $2 \\times (1, -3, 3, -1)$: so $\\varepsilon = 2$, centred on the value $127$ at $x = 5$. **Correct it to $127 - 2 = 125$** $= 5^3$ ✓',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A table of a quadratic reads $1, 4, 9, 19, 25, 36, 49$ for $x = 1, \\ldots, 7$. Find and correct the wrong entry.',
          body: 'For a quadratic, $\\Delta^2$ should be constant.',
          graph: {
            steps: [
              { ask: 'First differences: $3, 5, 10, 6, 11, 13$. The middle second difference $6 - 10 = $', answer: -4, tol: 0.001, hint: 'The full $\\Delta^2$ row is $2, 5, -4, 5, 2$.' },
              { ask: 'Constant value it should be (from the ends)', answer: 2, tol: 0.001, hint: 'The first and last entries agree.' },
              { ask: 'Deviations are $0, 3, -6, 3, 0 = \\varepsilon(1, -2, 1)$, so $\\varepsilon = $', answer: 3, tol: 0.001, hint: 'Read it off the $1$ in the pattern.' },
              { ask: 'Corrected value of the entry at $x = 4$', answer: 16, tol: 0.001, hint: '$19 - 3$.', done: 'The table is $x^2$: $f(4) = 16$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'The third differences of a cubic table read $6, 6, 1, 21, -9, 11, 6$. What error is in the table?',
          options: [
            { text: '$\\varepsilon = -5$', correct: true, why: 'Deviations from 6: $0, 0, -5, 15, -15, 5, 0$, which is $-5 \\times (1, -3, 3, -1)$.' },
            { text: '$\\varepsilon = 15$', why: '$15$ is the $-3\\varepsilon$ entry, not $\\varepsilon$.' },
            { text: '$\\varepsilon = 5$', why: 'The pattern starts with $-5$, so $\\varepsilon = -5$: the entry is 5 too small.' },
          ],
          explain: 'Add 5 to the wrong entry to correct it.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: "State Everett's formula; explain how to detect an error in a table",
          body: "**Everett:** for $x = x_0 + rh$ between $x_0$ and $x_1$, with $s = 1 - r$,\n$f(x) = sf_0 + \\frac{s(s^2 - 1)}{3!}\\delta^2f_0 + \\cdots + rf_1 + \\frac{r(r^2 - 1)}{3!}\\delta^2f_1 + \\cdots$, using only even central differences on the rows of $x_0$ and $x_1$. It suits values in the middle of a table.\n\n**Error in a table:** an error $\\varepsilon$ in one entry appears in the $k$th differences as $\\varepsilon$ times the binomial coefficients of order $k$ with alternating signs. Form differences until they should be constant; the pattern's centre locates the entry and its size gives $\\varepsilon$; subtract $\\varepsilon$ to correct it.",
        },
        {
          type: 'finish',
          title: 'You can read the middle of a table, and check it.',
          body: "Everett's formula, choosing a formula, and finding a wrong entry. Next: interpolation when the points are not equally spaced.",
        },
      ],
    },
  ],
};
