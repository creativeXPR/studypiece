// MTH 209 · Part A · Lesson 1: how wrong is an answer? Absolute, relative and percentage error;
// the three sources (blunder, truncation, round-off); chopping vs symmetric rounding in normalised
// form; "correct to d decimal places" and significant figures; and a truncation error worked out.
// Error propagation is the next lesson (error-spread.js).
// Every number below was recomputed in Python (see docs/mth209-rebuild.md).
import { roundingScene } from './error-scenes';

export default {
  id: 'errors',
  title: 'How wrong is an answer?',
  covers: 'Absolute, relative and percentage error; gross, truncation and round-off errors; chopping and symmetric rounding with their error bounds; correct to d decimal places and n significant figures; the truncation error of a series',
  minutes: 14,
  sections: [
    {
      name: 'Measuring error',
      terms: [
        ['Absolute error', '$|\\varepsilon| = |x_t - X|$: the size of the gap between the true value $x_t$ and the approximation $X$.'],
        ['Relative error', '$\\dfrac{|x_t - X|}{|x_t|}$: absolute error ÷ true value. As a percentage: $\\times 100\\%$.'],
        ['Gross error (blunder)', 'A human mistake, such as writing $0.5791$ for $0.5971$.'],
        ['Truncation error', 'From replacing an infinite process by a finite one: stopping a series after a few terms, or an iteration after a few steps.'],
        ['Round-off error', 'From keeping only a limited number of digits, by chopping or symmetric rounding: $\\frac23 \\approx 0.667$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part A · Lesson 1',
          title: 'Before any method: how wrong is an answer?',
          body: 'Every method in this course gives an **approximate** answer: bisection stops after a few steps, a series stops after a few terms. So the first job on the map is a measuring tool.\n\nThis lesson answers two questions you will ask of every answer from now on: **how wrong is it**, and **where did the wrongness come from**?',
          cta: 'Measure it',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'Size of the gap, and size compared with the value',
          body: 'True value $x_t$, approximation $X$, error $\\varepsilon = x_t - X$:\n$$\\text{absolute error} = |x_t - X|,\\qquad \\text{relative error} = \\frac{|x_t - X|}{|x_t|}.$$\n\nExample: $\\frac23 \\approx 0.667$. The gap is $|0.666666\\ldots - 0.667| = 0.000333$, and compared with $\\frac23$ that is $0.0005$, or $0.05\\%$.\n\nWhy two measures? A 1 cm error is nothing on a road and huge on a screw. Relative error sees the difference.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$\\pi = 3.14159265\\ldots$ is approximated by $X = 3.14$.',
          body: 'Absolute error $|x_t - X|$, then relative error $\\frac{|x_t - X|}{|x_t|}$.',
          graph: {
            steps: [
              { ask: 'Absolute error (5 d.p.)', answer: 0.00159, tol: 0.00001, hint: '$3.1415927 - 3.14$.' },
              { ask: 'Relative error (6 d.p.)', answer: 0.000507, tol: 0.000002, hint: '$\\frac{0.0015927}{3.1415927}$.' },
              { ask: 'As a percentage (3 d.p.)', answer: 0.051, tol: 0.001, hint: '$0.000507 \\times 100$.', done: '$3.14$ is off by $0.00159$, about $0.05\\%$ of $\\pi$.' },
            ],
          },
        },
        {
          type: 'reveal',
          eyebrow: 'Where errors come from',
          title: 'Three sources',
          cards: [
            { title: 'Gross error (blunder)', text: 'A **mistake**: writing $0.5791$ for $0.5971$, pressing the wrong key. Cured by care and checking, not by maths.' },
            { title: 'Truncation', text: '**An infinite process replaced by a finite one**: $(1 + x)^{1/2} = 1 + \\frac12x - \\frac18x^2 + \\cdots$ stopped after 3 terms. The dropped terms are the error.' },
            { title: 'Round-off', text: '**Limited digits**: $\\frac23 = 0.6666\\ldots$ kept as $0.667$. Done by chopping or by symmetric rounding, and it can build up over a long calculation.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Which source of error is each one?',
          buckets: [
            { id: 'b', label: 'Blunder' },
            { id: 'r', label: 'Round-off' },
            { id: 't', label: 'Truncation' },
          ],
          items: [
            { text: 'Writing $0.5791$ for $0.5971$', bucket: 'b', why: '**Two digits swapped** is a human mistake.' },
            { text: 'Keeping $\\frac23$ as $0.667$', bucket: 'r', why: '**Limited digits**: round-off.' },
            { text: 'Using $e^x \\approx 1 + x + \\frac{x^2}{2}$', bucket: 't', why: '**The rest of the series is dropped**: truncation.' },
            { text: 'Stopping bisection after 10 steps', bucket: 't', why: '**A process that could go on forever, stopped early**: truncation.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Truncation, measured',
          title: 'Evaluate $e^{0.2}$ from the first 3 terms of $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$ and estimate the truncation error.',
          body: 'The truncation error is everything dropped: $\\frac{x^3}{3!} + \\frac{x^4}{4!} + \\cdots$',
          graph: {
            steps: [
              { ask: '$1 + 0.2 + \\frac{0.2^2}{2} = $', answer: 1.22, tol: 0.00001, hint: '$1 + 0.2 + 0.02$.' },
              { ask: 'First dropped term $\\frac{0.2^3}{6} = $ (6 d.p.)', answer: 0.001333, tol: 0.000002, hint: '$\\frac{0.008}{6}$.' },
              { ask: 'Next $\\frac{0.2^4}{24} = $ (7 d.p.)', answer: 0.0000667, tol: 0.0000002, hint: '$\\frac{0.0016}{24}$.' },
              { ask: 'Truncation error $\\approx$ (4 d.p.)', answer: 0.0014, tol: 0.00005, hint: '$0.001333 + 0.000067 + \\cdots$', done: 'Error $\\approx 0.0014 < 10^{-2}$: true $e^{0.2} = 1.2214$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Rounding and accuracy',
      terms: [
        ['Normalised form', 'Write $x_t = f_t \\times 10^E + g_t \\times 10^{E - d}$ with $0.1 \\le f_t < 1$ holding the $d$ kept digits and $0 \\le g_t < 1$ the rest.'],
        ['Chopping', 'Drop $g_t \\times 10^{E-d}$. Error $\\le 10^{E - d}$.'],
        ['Symmetric rounding', 'If $g_t \\ge 0.5$, add 1 to the last kept digit, then chop. Error $\\le \\frac12 \\times 10^{E - d}$.'],
        ['Correct to d decimal places', '$|x - x_d| \\le \\frac12 \\times 10^{-d}$: within half a unit of the last kept place.'],
        ['Significant figures', 'Counted from the first non-zero digit: $0.0034567$ to 3 s.f. is $0.00346$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Round-off, exactly',
          title: 'A 4-digit machine stores $72.32451$',
          body: 'Write the number in **normalised form**: $72.32451 = (0.7232 + 0.0000451) \\times 10^2$\n$$x_t = f_t \\times 10^E + g_t \\times 10^{E-d},\\quad f_t = 0.7232,\\ g_t = 0.451,\\ E = 2,\\ d = 4.$$\n\n• **Chopping** drops the tail: stores $72.32$, error $0.451 \\times 10^{-2} = 0.00451$. Since $g_t < 1$, chopping error $\\le 10^{E-d}$.\n• **Symmetric rounding** adds 1 to the last kept digit when $g_t \\ge 0.5$, then chops. Here $g_t = 0.451 < 0.5$, so it also stores $72.32$. Rounding error $\\le \\frac12 \\times 10^{E-d}$, half of chopping\'s.',
        },
        roundingScene,
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A 4-digit machine stores $x_t = 0.0386271$. Write $x_t = f_t \\times 10^E + g_t \\times 10^{E-d}$ and find the stored values.',
          body: 'Normalised: $0.0386271 = 0.386271 \\times 10^{-1}$, so $E = -1$, $d = 4$.',
          graph: {
            steps: [
              { ask: 'Chopped value', answer: 0.03862, tol: 0.0000001, hint: 'Keep 4 significant digits: $0.3862 \\times 10^{-1}$.' },
              { ask: '$g_t = $', answer: 0.71, tol: 0.001, hint: 'The tail $0.0000071 = 0.71 \\times 10^{-5}$.' },
              { ask: 'Rounded value', answer: 0.03863, tol: 0.0000001, hint: '$g_t \\ge 0.5$: add 1 to the last kept digit.' },
              { ask: 'Chopping error bound $10^{E-d} = $', answer: 0.00001, tol: 0.0000001, hint: '$10^{-1-4}$.', done: 'Rounding error $\\le \\frac12 \\times 10^{-5}$; actual $|0.0386271 - 0.03863| = 0.0000029$.' },
            ],
          },
        },
        {
          type: 'story',
          eyebrow: 'Accuracy, in words exams use',
          title: 'Correct to $d$ places, or $n$ significant figures',
          body: '$x_d$ is $x$ **rounded to $d$ decimal places** when\n$$|x - x_d| \\le \\tfrac12 \\times 10^{-d}.$$\nExample: $\\frac17 = 0.1428571\\ldots$\n• $d = 2$: $x_2 = 0.14$, error $0.0028571 \\le 0.005$ ✓\n• $d = 4$: $x_4 = 0.1429$, error $0.0000429 \\le 0.00005$ ✓\n\n**Significant figures** count from the first non-zero digit: $0.0034567$ to 3 s.f. is $0.00346$, error at most $\\frac12 \\times 10^{-5}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Quick check',
          prompt: 'A value is quoted as $24.5$, correct to 1 d.p. What is its maximum possible error?',
          options: [
            { text: '$0.05$', correct: true, why: 'Half a unit in the 1st decimal place: $\\frac12 \\times 10^{-1}$.' },
            { text: '$0.1$', why: 'That is a whole unit: the chopping bound, not rounding.' },
            { text: '$0.5$', why: 'That is half a unit in the units place, not the first decimal place.' },
            { text: '$0.005$', why: 'That would be 2 d.p.' },
          ],
          explain: 'This half unit is the input to every error-propagation question: next lesson.',
        },
        {
          type: 'finish',
          title: 'You can measure how wrong an answer is.',
          body: 'Absolute and relative error, the three sources, chopping and rounding, and what "correct to d places" means. Next: how errors spread through a calculation.',
        },
      ],
    },
  ],
};
