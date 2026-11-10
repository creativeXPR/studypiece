// MTH 209 · Part B · Lesson 3: Newton-Raphson and the secant method. Newton derived from the
// tangent and from two Taylor terms; the notes' x³ − 5x − 40 = 0; failure cases and repeated roots;
// the secant method as Newton with a difference slope; comparing speeds. Replaces newton-raphson.js
// and secant.js. Numbers recomputed in Python.
import { newtonFailScene, newtonScene, secantScene } from './equation-scenes';

export default {
  id: 'newton-secant',
  title: 'Newton-Raphson and the secant method',
  covers: 'Newton-Raphson derived from the tangent and from Taylor series, choosing x₀, the cube root of 7, when Newton fails (flat tangents, bad starts, repeated roots), the secant method as Newton with a backward-difference slope, and comparing the speed of all the root-finding methods',
  minutes: 18,
  sections: [
    {
      name: 'Newton-Raphson',
      terms: [
        ['Newton-Raphson', '$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$: follow the tangent at $x_n$ down to the axis.'],
        ['Quadratic convergence', 'Near a simple root the number of correct digits roughly doubles each step.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Part B · Lesson 3',
          title: 'Use the slope as well as the value',
          body: '**Where we are:** iteration works when $|g\'| < 1$, and the smaller $|g\'|$, the faster. Bracketing ignores the shape of $f$ entirely.\n\n**The idea:** near the root, a smooth curve looks like its **tangent**. Solve the tangent instead of the curve, then repeat from the new point. This is the first engine meeting the second: Taylor (Part A) gives the tangent, iteration repeats it.',
          cta: 'Show me',
        },
        newtonScene,
        {
          type: 'story',
          eyebrow: 'The method, derived twice',
          title: 'From the tangent, or from Taylor',
          body: '**Tangent picture:** the tangent at $P(x_0, f(x_0))$ has slope $f\'(x_0)$ and drops $f(x_0)$ to the axis, so it meets the axis $h = \\frac{f(x_0)}{f\'(x_0)}$ to the left: $x_1 = x_0 - \\frac{f(x_0)}{f\'(x_0)}$.\n\n**Taylor (Part A):** keep two terms, $f(x_0 + h) \\approx f(x_0) + hf\'(x_0)$, and ask for $f(x_0 + h) = 0$: $h = -\\frac{f(x_0)}{f\'(x_0)}$. Same step.\n\nRepeat from each new point:\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}.$$',
        },
        {
          type: 'story',
          eyebrow: 'Worked example (notes)',
          title: 'Root of $x^3 - 5x - 40 = 0$ to 3 s.f.',
          body: '• **Locate (table of signs):** $f(3) = -28$, $f(4) = 4$, so a root lies in $(3, 4)$.\n• **Choose $x_0$ (the tangent idea needs a close start):** $|f(4)| = 4$ is much smaller than $|f(3)| = 28$, so start at $x_0 = 4$.\n• **Build the step:** $f\'(x) = 3x^2 - 5$, so $x_{n+1} = x_n - \\frac{x_n^3 - 5x_n - 40}{3x_n^2 - 5}$.\n• **Iterate:** $x_1 = 4 - \\frac{4}{43} = 3.906977$, $x_2 = 3.904451$, $x_3 = 3.904449$.\n• **Stop:** $x_2$ and $x_3$ agree, root $\\approx 3.90$.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Use Newton-Raphson to find $\\sqrt[3]{7}$, the root of $x^3 - 7 = 0$, from $x_0 = 2$.',
          body: 'With $f\'(x) = 3x^2$ the step simplifies to $x_{n+1} = \\frac{2x_n^3 + 7}{3x_n^2}$.',
          graph: {
            steps: [
              { ask: '$x_1 = \\frac{16 + 7}{12} = $ (6 d.p.)', answer: 1.916667, tol: 0.000002, hint: '$\\frac{23}{12}$.' },
              { ask: '$x_2 = $ (6 d.p.)', answer: 1.912938, tol: 0.000003, hint: '$\\frac{2(1.916667)^3 + 7}{3(1.916667)^2}$.' },
              { ask: '$x_3 = $ (6 d.p.)', answer: 1.912931, tol: 0.000003, hint: 'Once more.', done: '$\\sqrt[3]{7} = 1.913$: correct digits roughly double each step.' },
            ],
          },
        },
        newtonFailScene,
        {
          type: 'story',
          eyebrow: 'Limits',
          title: 'When the tangent idea breaks',
          body: 'The method trusts the tangent, so it fails where the tangent is a bad guide:\n• **$f\'(x_n) \\approx 0$:** a flat tangent meets the axis far away, or never.\n• **Bad start:** far from the root the curve is not like its tangent; iterates can jump to another root or cycle.\n• **Repeated root:** the curve only touches the axis. For $f = x^2e^x$ (double root at 0) from $x_0 = 1$, $x_5 = 0.072$; for $f = xe^x$ (simple root) $x_5 = 0.000000$. Convergence drops from quadratic to linear.\n\nCost: $f\'$ is needed at every step.',
        },
      ],
    },
    {
      name: 'The secant method',
      terms: [
        ['Secant method', '$x_{n+1} = x_n - f(x_n)\\dfrac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$: Newton with $f\'$ replaced by the slope through the last two points.'],
        ['Speed', 'Bisection, regula falsi and linear iteration: linear. Secant: order about 1.6. Newton: order 2.'],
      ],
      screens: [
        secantScene,
        {
          type: 'story',
          eyebrow: 'The idea, then the method',
          title: 'Newton without the derivative',
          body: 'If $f\'$ is hard to find, use the next best thing: the slope of the line through the last two points (a **backward difference**):\n$$f\'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}.$$\nPut it into Newton\'s formula:\n$$x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})},\\quad n \\ge 1.$$\n• It needs **two** starts, $x_0$ and $x_1$, with **any** signs (unlike regula falsi, it keeps no bracket).\n• Nearly as fast as Newton, with no derivative; but with no bracket it can wander off.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Worked (notes), then your turn',
          title: 'Secant method for $x^3 - 5x - 40 = 0$ with $x_0 = 3$, $x_1 = 4$.',
          body: '$f(3) = -28$, $f(4) = 4$.',
          graph: {
            steps: [
              { ask: '$x_2 = 4 - 4 \\cdot \\frac{4 - 3}{4 - (-28)} = $', answer: 3.875, tol: 0.0001, hint: '$4 - \\frac{4}{32}$.' },
              { ask: '$f(x_2) = $ (6 d.p.)', answer: -1.189453, tol: 0.000002, hint: '$3.875^3 - 5(3.875) - 40$.' },
              { ask: '$x_3 = $ (6 d.p.)', answer: 3.903651, tol: 0.000003, hint: 'Use the two newest points, $(4, 4)$ and $(3.875, -1.189453)$.', done: 'Next, $x_4 = 3.904456$: closing in on $3.904449$.' },
            ],
          },
        },
        {
          type: 'custom',
          widget: 'rootRace',
          eyebrow: 'Compare them',
          title: 'Four methods, one equation',
          body: 'All four are solving $x^3 - 5x - 40 = 0$ (root $3.904449$). Step each method and watch how fast the error falls.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Derive Newton-Raphson and the secant formula; compare the methods',
          body: '**Newton-Raphson:** the tangent at $(x_0, f(x_0))$ meets the axis where $f(x_0) + (x - x_0)f\'(x_0) = 0$, so $x_1 = x_0 - \\frac{f(x_0)}{f\'(x_0)}$; repeating gives $x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}$.\n\n**Secant:** replace $f\'(x_n)$ by $\\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$ to get $x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$, $n \\ge 1$. Two starting values, no derivative.\n\n**Compare:** bisection and regula falsi always converge but slowly; Newton is fastest (quadratic) but needs $f\'$ and a good start; the secant method is nearly as fast without $f\'$.',
        },
        {
          type: 'finish',
          title: 'You can solve one equation four ways.',
          body: 'Next: exam practice on equations, then many equations at once. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
