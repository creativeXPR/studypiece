// MTH 209 · Mock Exam (closes the four-idea course): six written questions across the course on a 60-minute clock. For each:
// the question (answer it on paper), a step check of the key numbers, then a model answer with the
// points that earn marks.

const question = (n, text, note) => ({ type: 'story', eyebrow: 'Mock exam', title: `Question ${n}`, body: `${text}${note ? `\n\n${note}` : ''}\n\nWrite your full answer on paper, then check it.`, cta: 'Check my answer' });
const check = (steps) => ({ type: 'custom', widget: 'calc', eyebrow: 'Check the key numbers', title: 'Enter your answers step by step', graph: { clock: true, steps } });
const model = (title, body) => ({ type: 'story', eyebrow: 'Model answer', title, body });

export default {
  id: 'mock-exam',
  title: 'Mock exam',
  covers: 'Six exam-style written questions covering root-finding, interpolation, errors and finite differences, series, linear systems and initial value problems, on a 60-minute clock, with step checks and model answers',
  minutes: 60,
  sections: [
    {
      name: 'Before you start',
      terms: [
        ['Exam method', 'State the method and formula, show a table of iterations, and state your observations.'],
        ['Use the stated method', 'If a question names a method, another method earns no method marks.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Mock exam',
          title: 'Six questions, one hour, like the real thing',
          body: 'This mock covers the whole course. For each question:\n\n**1.** Answer it **on paper**, with full working and tables, as in the exam.\n\n**2.** Enter your key numbers step by step to check them.\n\n**3.** Compare with the **model answer** and its marking points.\n\nAim to finish within **60 minutes**.',
          asides: [{ label: 'Exam tip', text: 'Keep a calculator in radians, carry at least two more decimal places than asked, and round only at the end.' }],
        },
        { type: 'custom', widget: 'mockClock', eyebrow: 'Ready?', title: 'Start the clock' },
        { type: 'bridge', title: 'Clock running.', recap: ['Answer on paper first.', 'Then check the numbers and read the model answer.'], why: 'Question 1 is next.' },
      ],
    },
    {
      name: 'Questions 1–2',
      terms: [
        ['Newton-Raphson', '$x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)}$.'],
        ['Lagrange', '$P_n(x) = \\sum y_kL_k(x)$.'],
      ],
      screens: [
        question(1, '(a) Show that $x^3 - 4x - 9 = 0$ has a root in $[2, 3]$.\n\n(b) Do three steps of the bisection method.\n\n(c) Use Newton-Raphson from $x_0 = 3$ to find the root to 4 d.p. Comment on the two methods.'),
        check([
          { ask: '$f(2) = $', answer: -9, tol: 0, hint: '$8 - 8 - 9$.' },
          { ask: '$f(3) = $', answer: 6, tol: 0, hint: '$27 - 12 - 9$.' },
          { ask: 'Third bisection midpoint $c_3 = $', answer: 2.625, tol: 0.0001, hint: '$2.5$ ($f < 0$), $2.75$ ($f > 0$), then $2.625$.' },
          { ask: 'Newton $x_1 = 3 - \\frac{6}{23} = $ (5 d.p.)', answer: 2.73913, tol: 0.00002, hint: '$f\'(3) = 27 - 4 = 23$.' },
          { ask: 'Root (4 d.p.)', answer: 2.7065, tol: 0.00006, hint: '$x_2 = 2.706998$, $x_3 = 2.706528$.' },
        ]),
        model('Question 1', '**(a)** $f(2) = -9 < 0$, $f(3) = 6 > 0$ and $f$ is continuous, so by the intermediate value theorem a root lies in $(2, 3)$.\n\n**(b)** $c_1 = 2.5$, $f = -3.375$ → $[2.5, 3]$; $c_2 = 2.75$, $f = 0.797$ → $[2.5, 2.75]$; $c_3 = 2.625$, $f = -1.412$ → $[2.625, 2.75]$.\n\n**(c)** $x_1 = 2.73913$, $x_2 = 2.706998$, $x_3 = 2.706528$: root $\\approx 2.7065$.\n\n**Observation:** bisection halves the bracket each step (slow but sure); Newton roughly doubles the correct digits each step (fast, but needs $f\'$ and a good start).\n\n**Marks for:** the sign change and theorem; a bisection table; the Newton formula and table; the comparison.'),
        question(2, '(a) Use Lagrange interpolation through $(1, 0)$, $(2, 0.6931)$, $(4, 1.3863)$ (values of $\\ln x$) to estimate $\\ln 3$.\n\n(b) Find the error, given $\\ln 3 = 1.09861$, and comment.'),
        check([
          { ask: '$L_0(3) = \\frac{(3 - 2)(3 - 4)}{(1 - 2)(1 - 4)} = $ (4 d.p.)', answer: -0.3333, tol: 0.0002, hint: '$\\frac{-1}{3}$.' },
          { ask: '$L_1(3) = $', answer: 1, tol: 0.0002, hint: '$\\frac{(2)(-1)}{(1)(-2)}$.' },
          { ask: '$L_2(3) = $ (4 d.p.)', answer: 0.3333, tol: 0.0002, hint: '$\\frac{(2)(1)}{(3)(2)}$.' },
          { ask: '$P_2(3) = $ (4 d.p.)', answer: 1.1552, tol: 0.0002, hint: '$0 + 0.6931 + \\frac{1.3863}{3}$.' },
          { ask: 'Error (5 d.p.)', answer: -0.05659, tol: 0.0001, hint: '$1.09861 - 1.1552$.' },
        ]),
        model('Question 2', '**(a)** $L_0(3) = -\\frac13$, $L_1(3) = 1$, $L_2(3) = \\frac13$, so $P_2(3) = 0(-\\frac13) + 0.6931(1) + 1.3863(\\frac13) = 1.1552$.\n\n**(b)** Error $= 1.09861 - 1.1552 = -0.0566$ (an overestimate, relative error about $5\\%$). The nodes are spread out ($1$ to $4$) where $\\ln x$ bends, so a quadratic copies it only roughly; closer nodes would do better.\n\n**Marks for:** each $L_k$; the sum; the error with sign; the comment.'),
        { type: 'bridge', title: 'Two down.', recap: ['Roots and interpolation done.'], why: 'Next: differences and series.' },
      ],
    },
    {
      name: 'Questions 3–4',
      terms: [
        ['Forward formula', '$f_r = f_0 + r\\Delta f_0 + \\frac{r(r - 1)}{2!}\\Delta^2f_0 + \\cdots$'],
        ['Product error', 'Max error $\\approx |X_1|\\varepsilon_2 + |X_2|\\varepsilon_1$.'],
      ],
      screens: [
        question(3, '(a) Construct the difference table for $f(x) = x^3 - x$ at $x = 0, 1, 2, 3, 4$ and comment on $\\Delta^3$.\n\n(b) By first defining the shift operator $E$, prove that $\\Delta = E - 1$ and $\\delta^2 = \\nabla\\Delta$.\n\n(c) $6.42$ (2 d.p.) and $3.1$ (1 d.p.) are rounded values. Find the maximum error in their product.'),
        check([
          { ask: '$\\Delta^2 f_0 = $', answer: 6, tol: 0, hint: 'Values $0, 0, 6, 24, 60$; $\\Delta$: $0, 6, 18, 36$.' },
          { ask: '$\\Delta^3 f$ (constant) $= $', answer: 6, tol: 0, hint: '$12 - 6$, $18 - 12$.' },
          { ask: 'In operator form, $\\delta^2 = E + c + E^{-1}$. What is $c$?', answer: -2, tol: 0, hint: '$(E^{\\frac12} - E^{-\\frac12})^2$.' },
          { ask: 'Max error in $6.42 \\times 3.1$ (4 d.p.)', answer: 0.3365, tol: 0.0003, hint: '$6.42(0.05) + 3.1(0.005)$.' },
        ]),
        model('Question 3', '**(a)** $f$: $0, 0, 6, 24, 60$; $\\Delta$: $0, 6, 18, 36$; $\\Delta^2$: $6, 12, 18$; $\\Delta^3$: $6, 6$; $\\Delta^4$: $0$. Third differences are constant ($= 3! \\times 1^3$) because $f$ is a cubic.\n\n**(b)** Define $Ef_k = f_{k+1}$. Then $\\Delta f_k = f_{k+1} - f_k = (E - 1)f_k$ for every $f_k$, so $\\Delta = E - 1$. Likewise $\\nabla = 1 - E^{-1}$ and $\\delta = E^{\\frac12} - E^{-\\frac12}$, so $\\nabla\\Delta = (1 - E^{-1})(E - 1) = E - 2 + E^{-1} = (E^{\\frac12} - E^{-\\frac12})^2 = \\delta^2$. ∎\n\n**(c)** $6.42 \\times 3.1 = 19.902$, max error $6.42(0.05) + 3.1(0.005) = 0.3365$: the value lies in $19.902 \\pm 0.34$.\n\n**Marks for:** the full table; the observation; the definitions before the proofs; the error rule.'),
        question(4, '(a) Expand $(1 + x)^{1/2}$ up to $x^3$ and state when it is valid.\n\n(b) Use the exponential series to evaluate $e^{0.1}$ to 5 d.p.'),
        check([
          { ask: 'Coefficient of $x$', answer: 0.5, tol: 0.0001, hint: '$n = \\frac12$.' },
          { ask: 'Coefficient of $x^2$', answer: -0.125, tol: 0.0001, hint: '$\\frac{\\frac12(-\\frac12)}{2}$.' },
          { ask: 'Coefficient of $x^3$', answer: 0.0625, tol: 0.0001, hint: '$\\frac{\\frac12(-\\frac12)(-\\frac32)}{6}$.' },
          { ask: '$e^{0.1}$ (5 d.p.)', answer: 1.10517, tol: 0.000006, hint: '$1 + 0.1 + 0.005 + 0.000167 + 0.000004$.' },
        ]),
        model('Question 4', '**(a)** $(1 + x)^{1/2} = 1 + \\frac12x - \\frac18x^2 + \\frac1{16}x^3 - \\cdots$, valid for $|x| < 1$.\n\n**(b)** $e^{0.1} = 1 + 0.1 + \\frac{0.01}{2} + \\frac{0.001}{6} + \\frac{0.0001}{24} + \\cdots = 1.105171$; the next term ($\\approx 8 \\times 10^{-8}$) cannot change the 5th place: $e^{0.1} = 1.10517$.\n\n**Marks for:** the general term pattern; validity; enough terms with a reason to stop.'),
        { type: 'bridge', title: 'Four down.', recap: ['Differences, errors and series done.'], why: 'Last: systems and an IVP.' },
      ],
    },
    {
      name: 'Questions 5–6',
      terms: [
        ['Gauss-Seidel', 'Use each new value as soon as it is computed.'],
        ['Euler', '$y_{i+1} = y_i + hf(x_i, y_i)$.'],
      ],
      screens: [
        question(5, 'Solve $5x_1 + x_2 + x_3 = 7$, $x_1 + 4x_2 + x_3 = 6$, $x_1 + x_2 + 3x_3 = 5$ by the Gauss-Seidel method from $x^{(0)} = 0$: (a) justify convergence; (b) perform two iterations (4 d.p.).'),
        check([
          { ask: '$x_1^{(1)} = $', answer: 1.4, tol: 0.0001, hint: '$\\frac75$.' },
          { ask: '$x_2^{(1)} = $ (4 d.p.)', answer: 1.15, tol: 0.0001, hint: '$\\frac{6 - 1.4}{4}$.' },
          { ask: '$x_3^{(1)} = $ (4 d.p.)', answer: 0.8167, tol: 0.0001, hint: '$\\frac{5 - 1.4 - 1.15}{3}$.' },
          { ask: '$x_1^{(2)} = $ (4 d.p.)', answer: 1.0067, tol: 0.0001, hint: '$\\frac{7 - 1.15 - 0.8167}{5}$.' },
          { ask: '$x_3^{(2)} = $ (4 d.p.)', answer: 0.9831, tol: 0.0002, hint: '$x_2^{(2)} = 1.0442$, then $\\frac{5 - 1.0067 - 1.0442}{3}$.' },
        ]),
        model('Question 5', '**(a)** Each diagonal coefficient dominates its row: $\\frac{1 + 1}{5} = 0.4$, $\\frac{1 + 1}{4} = 0.5$, $\\frac{1 + 1}{3} \\approx 0.67$, all $< 1$, so the method converges from any start.\n\n**(b)**\n$$\\begin{array}{c|ccc} k & x_1 & x_2 & x_3 \\\\ \\hline 1 & 1.4 & 1.15 & 0.8167 \\\\ 2 & 1.0067 & 1.0442 & 0.9831 \\end{array}$$\nThe iterates approach the exact solution $(1, 1, 1)$.\n\n**Marks for:** the convergence condition; using **new** values at once; a clean table.'),
        question(6, 'For $y\' = x + y$, $y(0) = 1$, $0 \\le x \\le 1$: (a) show the IVP has a unique solution; (b) use Euler’s method with $h = 0.1$ to estimate $y(0.3)$, and compare with the exact $y = 2e^x - x - 1$.'),
        check([
          { ask: 'Lipschitz constant $L$ from $\\left|\\frac{\\partial f}{\\partial y}\\right|$', answer: 1, tol: 0, hint: '$f = x + y$: $\\frac{\\partial f}{\\partial y} = 1$.' },
          { ask: '$y_1 = $', answer: 1.1, tol: 0.0001, hint: '$1 + 0.1(0 + 1)$.' },
          { ask: '$y_2 = $', answer: 1.22, tol: 0.0001, hint: '$1.1 + 0.1(0.1 + 1.1)$.' },
          { ask: '$y_3 \\approx y(0.3) = $', answer: 1.362, tol: 0.0001, hint: '$1.22 + 0.1(0.2 + 1.22)$.' },
          { ask: 'Exact $y(0.3)$ (4 d.p.)', answer: 1.3997, tol: 0.0001, hint: '$2e^{0.3} - 1.3$.' },
        ]),
        model('Question 6', '**(a)** $f(x, y) = x + y$ is continuous on $D = \\{0 \\le x \\le 1, -\\infty < y < \\infty\\}$ and $\\left|\\frac{\\partial f}{\\partial y}\\right| = 1$, so $f$ is Lipschitz in $y$ with $L = 1$ on the convex set $D$. By the existence and uniqueness theorem the IVP has a unique solution.\n\n**(b)** $y_1 = 1.1$, $y_2 = 1.22$, $y_3 = 1.362$. Exact $y(0.3) = 1.3997$; error $0.0377$. Euler follows tangents that are slightly off, so the error grows step by step; a smaller $h$ would reduce it roughly in proportion.\n\n**Marks for:** continuity **and** Lipschitz; the theorem named; the Euler table; the comparison.'),
        {
          type: 'story',
          eyebrow: 'Done',
          title: 'How did it go?',
          body: 'Go back over any step you got wrong or had to be shown: each points to the lesson to revisit. When you can do all six on time, you are ready.\n\nFor timed multiple-choice practice, take the **Exam focus** set in Practice.',
        },
        { type: 'finish', title: 'Mock exam: done.', body: 'Methods used:' },
      ],
    },
  ],
};
