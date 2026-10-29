// MAT 222 · Continuity on closed intervals · Lesson 2: Bolzano's intermediate value theorem.

export default {
  id: 'intermediate-value',
  title: 'Bolzano’s intermediate value theorem',
  covers: 'Bolzano’s lemma by bisection, the intermediate value theorem, roots of equations, f(I) is an interval, fixed points',
  minutes: 16,
  sections: [
    {
      name: 'Bolzano’s lemma',
      terms: [
        ['Bolzano’s lemma', 'If $f : [a, b] \\to \\mathbb{R}$ is continuous and $f(a) < 0 < f(b)$, there is $c \\in (a, b)$ with $f(c) = 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Continuity on closed intervals · Lesson 2',
          title: 'A continuous graph cannot jump over the axis',
          body: 'If a continuous $f$ is negative at $a$ and positive at $b$, the graph must cross $0$ somewhere between.\n\nThe proof is a **halving game**: keep halving $[a, b]$, always keeping a half where $f$ changes sign. The intervals shrink to a single point $c$, and continuity forces $f(c) = 0$.',
          cta: 'Play it',
        },
        {
          type: 'custom',
          widget: 'bisection',
          eyebrow: 'Play it',
          title: 'Halve until the root is trapped',
          body: '$f(x) = x^3 - x - 1$ on $[1, 2]$: $f(1) = -1 < 0 < 5 = f(2)$. The red dot is $f(a_n) < 0$, the green dot $f(b_n) > 0$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove Bolzano’s lemma',
          body: 'Let $a_1 = a$, $b_1 = b$. Given $[a_n, b_n]$, let $m = \\frac{a_n + b_n}{2}$. If $f(m) \\ge 0$ set $[a_{n+1}, b_{n+1}] = [a_n, m]$; otherwise set it to $[m, b_n]$. By induction:\n\n(i) $f(a_n) < 0 \\le f(b_n)$; (ii) $a_n$ is increasing and $b_n$ decreasing, both bounded in $[a, b]$; (iii) $b_n - a_n = 2^{1-n}(b - a) \\to 0$.\n\nMonotone bounded sequences converge: $a_n \\to c$, $b_n \\to d$, and $d - c = \\lim (b_n - a_n) = 0$, so $c = d \\in [a, b]$. By continuity,\n$$f(c) = \\lim f(a_n) \\le 0, \\qquad f(c) = \\lim f(b_n) \\ge 0,$$\nso $f(c) = 0$; and $c \\ne a, b$ since $f(a) < 0 < f(b)$. $\\blacksquare$',
        },
        {
          type: 'bridge',
          title: 'The lemma: proved.',
          recap: ['Halve, keep the sign change, repeat.', 'Both end sequences converge to one $c$ with $f(c) = 0$.'],
          why: 'Shift the graph up or down and the lemma becomes the full theorem.',
        },
      ],
    },
    {
      name: 'The intermediate value theorem',
      terms: [
        ['Intermediate value theorem', 'If $f : [a, b] \\to \\mathbb{R}$ is continuous and $y$ lies between $f(a)$ and $f(b)$, there is $c \\in (a, b)$ with $f(c) = y$.'],
        ['Corollary', 'A continuous function maps an interval onto an interval.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Theorem (Bolzano)',
          title: 'Every height in between is reached',
          body: '**IVT.** Let $f : [a, b] \\to \\mathbb{R}$ be continuous and $f(a) < y < f(b)$ (or $f(a) > y > f(b)$). Then there is $c \\in (a, b)$ with $f(c) = y$.\n\n**Proof.** If $f(a) < y < f(b)$, let $g(x) = f(x) - y$: then $g(a) < 0 < g(b)$, so by the lemma $g(c) = 0$, i.e. $f(c) = y$. If $f(a) > y > f(b)$, apply the lemma to $g(x) = y - f(x)$. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'How do you show $x^5 + x - 1 = 0$ has a root in $(0, 1)$?',
          options: [
            { text: '$f(0) = -1 < 0 < 1 = f(1)$ and $f$ is continuous (a polynomial), so the IVT gives a root', correct: true, why: 'State all three: continuity, the two signs, and the conclusion.' },
            { text: 'Solve it by factorising', why: 'It doesn’t factor nicely; the IVT proves existence without solving.' },
            { text: '$f(1) = 1 \\ne 0$, so there is no root', why: 'A value at one endpoint says nothing about the interior.' },
            { text: '$f$ is differentiable, so by Rolle it has a root', why: 'Rolle gives a zero of $f\'$, not of $f$.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Consequences',
          title: 'Three corollaries to know',
          cards: [
            { title: 'Images of intervals', text: 'If $f$ is continuous on an interval $I$, then $f(I)$ is an interval.' },
            { title: 'Fixed points', text: 'If $f : [0, 1] \\to [0, 1]$ is continuous, some $y$ has $f(y) = y$. Apply the IVT to $g(x) = f(x) - x$: $g(0) \\ge 0 \\ge g(1)$.' },
            { title: 'Odd-degree polynomials', text: 'Every real polynomial of odd degree has a real root: it is negative far left and positive far right (or vice versa).' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'The IVT needs $f$ continuous on the **closed** interval.', correct: true, why: '**Continuity at the ends** links $f(a)$, $f(b)$ to the inside.' },
            { text: 'The IVT says where the root is.', why: '**Existence only.** Bisection then locates it.' },
            { text: 'A function with a jump can skip a value.', correct: true, why: '**Yes**: $\\lfloor x \\rfloor$ on $[0, 1]$ never takes the value $\\frac12$.' },
            { text: 'If $f(a)$ and $f(b)$ have the same sign, there is no root.', why: '**Not so**: $x^2 - \\frac14$ on $[-1, 1]$ has two roots.' },
          ],
        },
        {
          type: 'finish',
          title: 'Intermediate values: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
