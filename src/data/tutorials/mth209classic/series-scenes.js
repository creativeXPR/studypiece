// MTH 209 · Chapter 5 pictures. Partial sums of the binomial series for (1 + x)⁻¹, settling down
// inside |x| < 1 and blowing up outside; Taylor (Maclaurin) polynomials of sin x hugging the curve
// further and further from 0; and the terms of the exponential series shrinking to nothing.
import { frame, view } from './plot';

const partial = (n) => (x) => {
  let s = 0;
  let t = 1;
  for (let k = 0; k <= n; k++) {
    s += t;
    t *= -x;
  }
  return s;
};

export const binomialScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Where an infinite series can be trusted',
  graph: {
    steps: [
      { say: 'The curve is $\\frac{1}{1 + x} = (1 + x)^{-1}$. Its binomial series is $1 - x + x^2 - x^3 + \\cdots$. Watch the sums of more and more terms.' },
      { say: 'Two terms, $1 - x$: a line, right only near $x = 0$.', action: { label: '2 terms' } },
      { say: 'Four terms, then eight: inside the shaded band $-1 < x < 1$ the sums hug the curve closer and closer…', action: { label: 'More terms', need: 2 } },
      { say: '…but outside it they swing wildly and **never** settle: the terms $x^n$ grow instead of shrinking. That is why the binomial series for a negative or fractional power is only valid for $|x| < 1$.' },
    ],
    draw: (step, presses) => {
      const v = view(-1.8, 1.8, -3, 5);
      const n = [0, 1, 3, 7][Math.min(presses, 3)];
      const items = [
        { id: 'band', poly: [v.P(-1, -3), v.P(1, -3), v.P(1, 5), v.P(-1, 5)], kind: 'b', o: step >= 2 ? 0.25 : 0 },
        ...v.axis([-1, 1]),
        v.graph((x) => 1 / (1 + x), 'f', 's', -0.86, 1.8),
        v.graph(partial(n), 'ps', 'c'),
      ];
      return frame(items, `${n + 1} term${n ? 's' : ''}`);
    },
  },
};

const sinTaylor = (deg) => (x) => {
  let s = 0;
  for (let k = 1; k <= deg; k += 2) s += ((k % 4 === 1 ? 1 : -1) * x ** k) / [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880][k];
  return s;
};

export const taylorScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Copying a curve from one point',
  graph: {
    steps: [
      { say: 'Here is $\\sin x$. At $x = 0$ we know its value ($0$), slope ($1$), curvature ($0$) and so on. Can a polynomial copy it?' },
      { say: 'Match the value and slope: $x$. Right near $0$, then it wanders off.', action: { label: 'Degree 1' } },
      { say: 'Also match the third derivative: $x - \\frac{x^3}{3!}$. It now follows the curve over the first hump.', action: { label: 'Degree 3' } },
      { say: 'Degree $5$, then $7$: each extra term extends the stretch where the copy is good. That is the Maclaurin series: $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$, built entirely from derivatives at one point.', action: { label: 'Degrees 5 and 7', need: 2 } },
    ],
    draw: (step, presses) => {
      const v = view(-6.3, 6.3, -2.2, 2.2);
      const deg = [0, 1, 3, 5, 7][Math.min(presses, 4)];
      const items = [...v.axis([-3, 3]), v.graph(Math.sin, 'sin', 's')];
      if (deg) items.push(v.graph(sinTaylor(deg), 'tp', 'c'));
      return frame(items, deg ? `degree ${deg}` : undefined);
    },
  },
};

export const expTermsScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'Terms that shrink to nothing',
  graph: {
    steps: [
      { say: 'The series for $e^{0.5}$: $1 + 0.5 + \\frac{0.5^2}{2!} + \\frac{0.5^3}{3!} + \\cdots$. Draw each term as a bar.', action: { label: 'Draw the terms' } },
      { say: 'Each bar is the previous one times $\\frac{x}{n}$: here $\\frac{0.5}{n}$, smaller every time. By the 6th term the bars are invisible, and the running total has stopped moving at $1.64872$.' },
      { say: 'Because $n!$ eventually beats any $x^n$, this happens for **every** $x$: the exponential series converges everywhere. (A large $x$ just needs more terms before the bars start shrinking.)' },
    ],
    draw: (step, presses) => {
      const v = view(-0.6, 8, -0.15, 1.15);
      const terms = Array.from({ length: 8 }, (_, n) => 0.5 ** n / [1, 1, 2, 6, 24, 120, 720, 5040][n]);
      const items = [...v.axis([0, 1, 2, 3, 4, 5, 6, 7])];
      terms.forEach((t, n) => {
        const h = presses >= 1 ? t : 0;
        items.push({ id: `b${n}`, poly: [v.P(n - 0.3, 0), v.P(n + 0.3, 0), v.P(n + 0.3, h), v.P(n - 0.3, h)], kind: 'a' });
      });
      let sum = 0;
      terms.forEach((t) => { sum += t; });
      return frame(items, presses >= 1 ? `sum of 8 terms $= ${sum.toFixed(5)}$, $\\;e^{0.5} = 1.64872$` : undefined);
    },
  },
};
