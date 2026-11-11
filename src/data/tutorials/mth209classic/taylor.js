// MTH 209 · Part A · Lesson 3: Taylor's theorem. Copying a curve at a point, Taylor about a and
// Maclaurin about 0 with the remainder E_n, deriving a series from derivatives, how many terms an
// accuracy needs, expanding about a ≠ 0 (sin 51° about 45° with its error), and integrating
// term by term. Every number below was recomputed in Python (see docs/mth209-rebuild.md).
import { expTermsScene, taylorScene } from './series-scenes';

export default {
  id: 'taylor',
  title: 'Taylor series: copying a curve',
  covers: "Taylor's theorem about a point a and Maclaurin's about 0, the remainder E_n as truncation error, deriving the series of sin x and ln(1 + x), how many terms an accuracy needs, expanding about a ≠ 0 with an error estimate, and evaluating an integral from a Maclaurin series",
  minutes: 16,
  sections: [
    {
      name: "Taylor's theorem",
      terms: [
        ["Taylor's theorem", "$f(x) = f(a) + (x - a)f'(a) + \\frac{(x - a)^2}{2!}f''(a) + \\cdots + \\frac{(x - a)^n}{n!}f^{(n)}(a) + E_n(x)$, when $f$ has continuous derivatives up to $f^{(n)}$ on $[a, x]$ and $f^{(n+1)}$ exists."],
        ['Remainder', "$E_n(x) = \\frac{(x - a)^{n+1}}{(n+1)!}f^{(n+1)}(\\xi)$ for some $\\xi$ between $a$ and $x$: the truncation error."],
        ['Step form', "Put $x = a + h$: $f(a + h) = f(a) + hf'(a) + \\frac{h^2}{2!}f''(a) + \\cdots$"],
        ["Maclaurin's theorem", "The case $a = 0$: $f(x) = f(0) + xf'(0) + \\frac{x^2}{2!}f''(0) + \\cdots$"],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part A · Lesson 3',
          title: 'Hard functions, easy polynomials',
          body: "A calculator cannot \"know\" $e^{0.5}$ or $\\sin 51^\\circ$. It can only add and multiply. So it swaps the function for a **polynomial** that copies it near a point where everything is known.\n\nYou met the first step last lesson: $f(x + \\varepsilon) \\approx f(x) + \\varepsilon f'(x)$. Keep going and you get Taylor's theorem, with its own error term built in.",
          cta: 'Build one',
        },
        taylorScene,
        {
          type: 'story',
          eyebrow: 'The method',
          title: 'Match the value, the slope, the bend…',
          body: "Make a polynomial agree with $f$ at $a$: same value, same slope, same second derivative, and so on. That forces\n$$f(x) = f(a) + (x - a)f'(a) + \\frac{(x - a)^2}{2!}f''(a) + \\cdots + \\frac{(x - a)^n}{n!}f^{(n)}(a) + E_n(x).$$\n• **Condition:** $f$ continuous with continuous derivatives up to $f^{(n)}$, and $f^{(n+1)}$ existing.\n• **Remainder:** $E_n(x) = \\frac{(x - a)^{n+1}}{(n+1)!}f^{(n+1)}(\\xi)$, $\\xi$ between $a$ and $x$.\n• With $x = a + h$ it reads $f(a + h) = f(a) + hf'(a) + \\cdots$; with $a = 0$ it is **Maclaurin's** theorem.",
        },
        {
          type: 'reveal',
          eyebrow: 'Worked: derive a series',
          title: 'The Maclaurin series of sin x',
          cards: [
            { title: 'Derivatives', text: "$f = \\sin x$, $f' = \\cos x$, $f'' = -\\sin x$, $f''' = -\\cos x$, then the cycle repeats." },
            { title: 'Values at 0', text: "$f(0) = 0$, $f'(0) = 1$, $f''(0) = 0$, $f'''(0) = -1$, $f^{(4)}(0) = 0$, $f^{(5)}(0) = 1$, …" },
            { title: 'Substitute into Maclaurin', text: '$\\sin x = 0 + x + 0 - \\dfrac{x^3}{3!} + 0 + \\dfrac{x^5}{5!} - \\cdots = x - \\dfrac{x^3}{3!} + \\dfrac{x^5}{5!} - \\cdots$, valid for every $x$.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: "For $f(x) = \\ln(1 + x)$: $f'(x) = \\frac{1}{1+x}$, $f''(x) = -\\frac{1}{(1+x)^2}$, $f'''(x) = \\frac{2}{(1+x)^3}$. What is the $x^3$ term of its Maclaurin series?",
          options: [
            { text: '$\\frac{x^3}{3}$', correct: true, why: "$\\frac{x^3}{3!}f'''(0) = \\frac{x^3}{6} \\times 2 = \\frac{x^3}{3}$." },
            { text: '$\\frac{2x^3}{3}$', why: 'Remember to divide by $3! = 6$, not by 3.' },
            { text: '$\\frac{x^3}{6}$', why: "$f'''(0) = 2$, so the 6 halves to 3." },
            { text: '$-\\frac{x^3}{3}$', why: "$f'''(0) = +2$: the signs alternate $+, -, +$." },
          ],
          explain: '$\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\cdots$, valid for $-1 < x \\le 1$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'The remainder at work',
          title: 'Estimate $e^{0.5}$ with 4 terms of $e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots$, then bound the error with $E_3$.',
          body: 'True value: $e^{0.5} = 1.648721$.',
          graph: {
            steps: [
              { ask: '$1 + 0.5 + \\frac{0.25}{2} + \\frac{0.125}{6} = $ (6 d.p.)', answer: 1.645833, tol: 0.000002, hint: '$1 + 0.5 + 0.125 + 0.020833$.' },
              { ask: 'Actual error $1.648721 - 1.645833 = $ (6 d.p.)', answer: 0.002888, tol: 0.000003, hint: 'Subtract.' },
              { ask: 'Bound: $E_3 = \\frac{0.5^4}{4!}e^{\\xi} \\le \\frac{0.0625}{24} \\times 1.65 = $ (6 d.p.)', answer: 0.004297, tol: 0.000003, hint: '$e^{\\xi} < e^{0.5} < 1.65$.', done: 'The true error $0.0029$ sits inside the bound $0.0043$, as the remainder promises.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Using the series',
      terms: [
        ['How many terms', 'Add terms until the remainder (or, for shrinking alternating terms, the first omitted term) is below the accuracy asked for.'],
        ['Choosing $a$', 'Expand about a nearby point where $f$ and its derivatives are known, so $x - a$ is small.'],
        ['Integrating a series', 'Replace the integrand by its Maclaurin series and integrate term by term: $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}$.'],
      ],
      screens: [
        expTermsScene,
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'How many terms of $e^x$ are needed for $e^{0.5}$ with error below $0.0001$?',
          options: [
            { text: '4 terms', why: '$1.645833$: error $0.0029$, far too big.' },
            { text: '5 terms', why: '$1.648438$: error $0.00028$, still above $0.0001$.' },
            { text: '6 terms', correct: true, why: '$1.648698$: error $0.000023$, below $0.0001$.' },
            { text: '10 terms', why: 'Works, but 6 already do.' },
          ],
          explain: 'Each term is the last one times $\\frac{x}{n}$, so they shrink fast: stop once the error is below the target.',
        },
        {
          type: 'story',
          eyebrow: 'Worked: expand about a ≠ 0',
          title: '$\\sin 51^\\circ$ from $\\sin 45^\\circ$',
          body: "$51^\\circ$ is far from 0 but close to $45^\\circ$, where $\\sin 45^\\circ = \\cos 45^\\circ = \\frac{\\sqrt2}{2}$. So expand about $a = 45^\\circ$:\n$$\\sin x = \\sin a + (x - a)\\cos a - \\frac{(x - a)^2}{2!}\\sin a - \\frac{(x - a)^3}{3!}\\cos\\xi.$$\nThe last term is the remainder $E_2$, with $\\xi$ between $a$ and $x$.\n\n**Angles must be in radians:** $x - a = 6^\\circ = \\frac{\\pi}{30} = 0.104720$.",
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Evaluate $\\sin 51^\\circ$ from the first 3 terms about 45°, and estimate the error.',
          body: '$\\frac{\\sqrt2}{2} = 0.707107$, $h = \\frac{\\pi}{30} = 0.104720$.',
          graph: {
            steps: [
              { ask: '$h\\cos 45^\\circ = $ (6 d.p.)', answer: 0.074048, tol: 0.000002, hint: '$0.104720 \\times 0.707107$.' },
              { ask: '$\\frac{h^2}{2}\\sin 45^\\circ = $ (6 d.p.)', answer: 0.003877, tol: 0.000002, hint: '$\\frac{0.010966}{2} \\times 0.707107$.' },
              { ask: '$\\sin 51^\\circ \\approx 0.707107 + 0.074048 - 0.003877 = $ (4 d.p.)', answer: 0.7773, tol: 0.00006, hint: 'Add.' },
              { ask: 'Error $\\le \\frac{h^3}{3!} \\times 1 = $ (6 d.p.)', answer: 0.000191, tol: 0.000002, hint: "$|\\cos\\xi| \\le 1$; $\\frac{0.0011484}{6}$.", done: '$\\sin 51^\\circ = 0.777$ to 3 d.p. (true $0.777146$).' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Integrating a series',
          title: 'Evaluate $\\displaystyle\\int_0^1 \\frac{\\sin\\theta}{\\theta}\\,d\\theta$ correct to 3 s.f. using the Maclaurin series.',
          body: '$\\frac{\\sin\\theta}{\\theta} = 1 - \\frac{\\theta^2}{3!} + \\frac{\\theta^4}{5!} - \\cdots$ has no antiderivative in closed form, but each term does.',
          graph: {
            steps: [
              { ask: '$\\int_0^1 \\frac{\\theta^2}{6}\\,d\\theta = \\frac{1}{18} = $ (6 d.p.)', answer: 0.055556, tol: 0.000002, hint: '$\\frac{\\theta^3}{18}$ from 0 to 1.' },
              { ask: '$\\int_0^1 \\frac{\\theta^4}{120}\\,d\\theta = \\frac{1}{600} = $ (6 d.p.)', answer: 0.001667, tol: 0.000002, hint: '$\\frac{\\theta^5}{600}$ from 0 to 1.' },
              { ask: '$1 - \\frac{1}{18} + \\frac{1}{600} = $ (3 s.f.)', answer: 0.946, tol: 0.0005, hint: '$0.946111$; the next term $\\frac{1}{35280}$ is too small to change 3 s.f.', done: '$\\int_0^1 \\frac{\\sin\\theta}{\\theta}\\,d\\theta \\approx 0.946$' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can copy a curve with a polynomial.',
          body: "Taylor's and Maclaurin's theorems, the remainder, and how many terms to keep. Taylor also drives Newton-Raphson (Part B), finite differences (Part C) and Euler's method (Part D). Next: the standard series and how to combine them.",
        },
      ],
    },
  ],
};
