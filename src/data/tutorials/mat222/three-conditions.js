// MAT 222 · Quick review: the three conditions for continuity at a point (3 marks).

export default {
  id: 'three-conditions',
  title: 'Three conditions for continuity',
  covers: 'defined at x₀, limit exists, limit equals the value',
  minutes: 10,
  sections: [
    {
      name: 'The conditions',
      terms: [
        ['Continuity at $x_0$', '$F$ is continuous at $x_0$ if (1) $F(x_0)$ is defined, (2) $\\lim_{x\\to x_0}F(x)$ exists, and (3) $\\lim_{x\\to x_0}F(x) = F(x_0)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Continuity at a point · 3 marks',
          title: 'Three conditions, three marks',
          body: '“Let $F : X \\subset \\mathbb{R} \\to \\mathbb{R}$. State the three conditions $F$ must satisfy to be continuous.”\n\nThink of drawing the graph near $x_0$ without lifting your pen. Three things can stop you: there is **no point** at $x_0$, the graph **doesn’t settle** on one height, or it settles on a height but the point is **somewhere else**.',
          cta: 'Show me the three',
        },
        {
          type: 'reveal',
          eyebrow: 'Continuity at x₀',
          title: 'All three must hold',
          cards: [
            { title: '1 · Defined', text: '$F(x_0)$ exists, i.e. $x_0 \\in X$. There is a point on the graph at $x_0$.' },
            { title: '2 · Limit exists', text: '$\\lim_{x\\to x_0}F(x)$ exists (and is finite). Near $x_0$, the graph settles on one height.' },
            { title: '3 · They agree', text: '$\\lim_{x\\to x_0}F(x) = F(x_0)$. The point sits exactly where the graph is heading.' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'For each function, which condition is the **first** to fail at the given point?',
          buckets: [
            { id: 'c1', label: '1 fails', hint: 'not defined' },
            { id: 'c2', label: '2 fails', hint: 'no limit' },
            { id: 'c3', label: '3 fails', hint: 'limit ≠ value' },
            { id: 'ok', label: 'Continuous' },
          ],
          items: [
            { text: '$\\frac{x^2 - 4}{x - 2}$ at $x_0 = 2$', bucket: 'c1', why: '**Not defined at 2** (division by zero), even though the limit is 4.' },
            { text: '$\\lfloor x \\rfloor$ (floor) at $x_0 = 1$', bucket: 'c2', why: '**Left limit 0, right limit 1**: no single limit, though $\\lfloor 1 \\rfloor = 1$ is defined.' },
            { text: '$\\frac{\\sin 2x}{x}$, with value $1$ at $x_0 = 0$', bucket: 'c3', why: '**Limit is 2, value is 1.** You’ll meet it again in a later lesson.' },
            { text: '$x^2$ at $x_0 = 3$', bucket: 'ok', why: '**Polynomials are continuous everywhere**: $\\lim_{x\\to3}x^2 = 9 = 3^2$.' },
            { text: '$|x|$ at $x_0 = 0$', bucket: 'ok', why: '**$|x|$ has a corner at 0 but no gap**: limit $0$, value $0$.' },
          ],
          explain: 'Check them in order: a failure at condition 1 makes conditions 2 and 3 meaningless to ask about.',
        },
        {
          type: 'story',
          eyebrow: 'In ε-δ form',
          title: 'All three in one line',
          body: 'Put the three conditions together and use the ε-δ definition of the limit with $l = F(x_0)$:\n\n$$\\forall\\, \\varepsilon > 0\\ \\exists\\, \\delta > 0:\\quad x \\in X,\\ |x - x_0| < \\delta \\implies |F(x) - F(x_0)| < \\varepsilon.$$\n\nNotice the “$0 <$” is gone. At $x = x_0$ the difference is $|F(x_0) - F(x_0)| = 0 < \\varepsilon$ anyway, so there is no need to exclude it.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: '$F(x_0)$ is defined and $\\lim_{x\\to x_0}F(x)$ exists. Is $F$ continuous at $x_0$?',
          options: [
            { text: 'Yes, always.', why: 'Two out of three isn’t enough. The limit and the value must also be equal.' },
            { text: 'Only if $\\lim_{x\\to x_0}F(x) = F(x_0)$.', correct: true, why: 'Condition 3. A function like Q4(c)’s has a limit (2) and a value (1) that disagree.' },
            { text: 'Only if $F$ is a polynomial.', why: 'Many non-polynomials are continuous; the test is the three conditions.' },
            { text: 'No, never.', why: 'If the limit equals the value, it is continuous.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Model answer · 3 marks',
          title: 'Write this',
          body: '$F$ is continuous at a point $x_0 \\in X$ if:\n\n**(i)** $F(x_0)$ is defined;\n\n**(ii)** $\\lim_{x\\to x_0}F(x)$ exists;\n\n**(iii)** $\\lim_{x\\to x_0}F(x) = F(x_0)$.\n\n$F$ is continuous on $X$ if it is continuous at every point of $X$.',
        },
        {
          type: 'finish',
          title: 'Limits: reviewed.',
          body: 'You can now define a limit, prove it is unique, run an ε-δ proof and test continuity. Next up: continuity and uniform continuity.',
        },
      ],
    },
  ],
};
