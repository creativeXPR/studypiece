// MTH 209 · Part C · Lesson 3: Newton's forward and backward formulas from E^r = (1 + Δ)^r. The operator
// algebra itself is now operators.js.
import { newtonFormulaScene } from './difference-scenes';

export default {
  id: 'newton-difference-formulas',
  title: 'Newton’s forward and backward formulas',
  covers: 'Newton’s forward and backward difference formulas from E^r = (1 + Δ)^r and the binomial series, why they interpolate, when to use each, and the population example',
  minutes: 16,
  sections: [
    {
      name: 'Newton’s formulas',
      terms: [
        ['Newton forward difference formula', '$f_r = f_0 + r\\Delta f_0 + \\frac{r(r-1)}{2!}\\Delta^2f_0 + \\frac{r(r-1)(r-2)}{3!}\\Delta^3f_0 + \\cdots$, where $x = x_0 + rh$.'],
        ['Newton backward difference formula', '$f_r = f_n + r\\nabla f_n + \\frac{r(r+1)}{2!}\\nabla^2f_n + \\frac{r(r+1)(r+2)}{3!}\\nabla^3f_n + \\cdots$, where $x = x_n + rh$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In operator form, $E = $',
          options: [
            { text: '$1 + \\Delta$', correct: true, why: 'From $\\Delta = E - 1$.' },
            { text: '$1 - \\nabla$', why: 'That is $E^{-1}$.' },
            { text: '$\\Delta - 1$', why: 'Rearrange $\\Delta = E - 1$.' },
            { text: '$\\delta^2$', why: '$\\delta^2 = \\Delta\\nabla$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Part C · Lesson 3',
          title: 'One curve through the whole table',
          body: '**Where we are:** with $E = 1 + \\Delta$, a table step is algebra. **The problem:** estimate $f$ **between** table points, at $x = x_0 + rh$ with $r$ a fraction.\n\n**The idea:** $f(x_0 + rh) = E^rf_0 = (1 + \\Delta)^rf_0$. Expand with the **binomial series** (Part A):\n$$f_r = f_0 + r\\Delta f_0 + \\frac{r(r - 1)}{2!}\\Delta^2f_0 + \\cdots$$\n**Why it interpolates:** stop after $\\Delta^n$ and you have a polynomial in $r$ of degree $n$. At $r = 0, 1, \\ldots, n$ the binomial series is finite and exact, so the polynomial passes through every table point used. Between them it is the natural smooth guess.',
          cta: 'Show me',
        },
        {
          type: 'story',
          eyebrow: 'Forward formula',
          title: 'Expand $(1 + \\Delta)^r$',
          body: 'To estimate $f$ at $x = x_0 + rh$ (with $r$ not necessarily a whole number), use $f_r = E^rf_0 = (1 + \\Delta)^rf_0$ and the binomial expansion:\n$$f_r = f_0 + r\\Delta f_0 + \\frac{r(r - 1)}{2!}\\Delta^2f_0 + \\frac{r(r - 1)(r - 2)}{3!}\\Delta^3f_0 + \\cdots$$\n\nThis is ==Newton’s forward difference formula==. It uses the **top diagonal** of the difference table, so use it near the **start** of the table.',
        },
        {
          type: 'story',
          eyebrow: 'Backward formula',
          title: 'Expand $(1 - \\nabla)^{-r}$',
          body: 'From $\\nabla = 1 - E^{-1}$: $E^{-1} = 1 - \\nabla$, so $E^r = (1 - \\nabla)^{-r}$:\n$$f_r = f_n + r\\nabla f_n + \\frac{r(r + 1)}{2!}\\nabla^2f_n + \\frac{r(r + 1)(r + 2)}{3!}\\nabla^3f_n + \\cdots$$\nwith $x = x_n + rh$ (so $r < 0$ inside the table).\n\nThis is ==Newton’s backward difference formula==. It uses the **bottom diagonal**, so use it near the **end** of the table.',
        },
        newtonFormulaScene,
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Population of a town',
          body: '$$\\begin{array}{c|c|c|c|c|c} \\text{Year} & y & \\Delta y & \\Delta^2 y & \\Delta^3 y & \\Delta^4 y \\\\ \\hline 1891 & 46 & 20 & -5 & 2 & -3 \\\\ 1901 & 66 & 15 & -3 & -1 & \\\\ 1911 & 81 & 12 & -4 & & \\\\ 1921 & 93 & 8 & & & \\\\ 1931 & 101 & & & & \\end{array}$$\n\nEstimate the population in **1895** and in **1925**. Here $h = 10$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Estimate the 1895 population with Newton’s forward formula, $r = 0.4$, top diagonal $46, 20, -5, 2, -3$.',
          body: '$f_r = f_0 + r\\Delta f_0 + \\frac{r(r - 1)}{2!}\\Delta^2f_0 + \\frac{r(r - 1)(r - 2)}{3!}\\Delta^3f_0 + \\frac{r(r - 1)(r - 2)(r - 3)}{4!}\\Delta^4f_0$.',
          graph: {
            steps: [
              { ask: '$r\\Delta f_0 = $', answer: 8, tol: 0.001, hint: '$0.4 \\times 20$.' },
              { ask: '$\\frac{r(r - 1)}{2}\\Delta^2f_0 = $', answer: 0.6, tol: 0.001, hint: '$\\frac{0.4(-0.6)}{2}(-5)$.' },
              { ask: '$\\frac{r(r - 1)(r - 2)}{6}\\Delta^3f_0 = $', answer: 0.128, tol: 0.0005, hint: '$\\frac{0.4(-0.6)(-1.6)}{6}(2)$.' },
              { ask: '$\\frac{r(r - 1)(r - 2)(r - 3)}{24}\\Delta^4f_0 = $', answer: 0.1248, tol: 0.0005, hint: '$\\frac{0.4(-0.6)(-1.6)(-2.6)}{24}(-3)$.' },
              { ask: 'Population in 1895 (thousand, 2 d.p.)', answer: 54.85, tol: 0.006, hint: '$46 + 8 + 0.6 + 0.128 + 0.1248$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: '1925 · backward formula',
          prompt: 'Use the backward formula from $x_n = 1931$ with the bottom diagonal $101, 8, -4, -1, -3$. What is $r$, and the estimate?',
          options: [
            { text: '$r = -0.6$, estimate $96.84$', correct: true, why: '$1925 = 1931 + 10r \\implies r = -0.6$. Then $101 - 4.8 + 0.48 + 0.056 + 0.1008 = 96.84$.' },
            { text: '$r = 0.6$, estimate $105.8$', why: '1925 is **before** 1931, so $r$ is negative.' },
            { text: '$r = 0.4$, estimate $97.41$', why: 'That comes from expanding about 1921 with fewer differences. The question asks for the backward formula from 1931, which uses the whole bottom diagonal.' },
            { text: '$r = -6$, estimate $53$', why: 'Divide the gap by $h = 10$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'The forward formula uses $\\frac{r(r - 1)}{2!}$; the backward formula uses $\\frac{r(r + 1)}{2!}$.', correct: true, why: '**Forward: $(1 + \\Delta)^r$. Backward: $(1 - \\nabla)^{-r}$**, which flips the signs.' },
            { text: 'Use the forward formula near the start of a table and the backward formula near the end.', correct: true, why: '**Each uses the differences nearest its own end**, which keeps $|r|$ small and the terms shrinking.' },
            { text: 'For data from a cubic, terms beyond $\\Delta^3$ are zero.', correct: true, why: '**Fourth and higher differences of a cubic vanish**, so the formula is exact.' },
            { text: '$r$ is always a whole number.', why: '**$r = \\frac{x - x_0}{h}$** is usually a fraction: that’s the point of interpolating.' },
          ],
        },
        {
          type: 'finish',
          title: 'Newton’s formulas: done.',
          body: 'Next: Everett’s formula for the middle of a table, and catching a wrong entry. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
