// MAT 222 · Quick review: a limit, if it exists, is unique (5 marks).

export default {
  id: 'limit-unique',
  title: 'A limit is unique',
  covers: 'proof by contradiction with ε = |l₁ − l₂|/2 and the triangle inequality',
  minutes: 15,
  sections: [
    {
      name: 'Strategy',
      terms: [
        ['Triangle inequality', '$|a - b| \\le |a - c| + |c - b|$ for any real $a, b, c$. Put a convenient middle term $c$ between two numbers you want to compare.'],
        ['Proof by contradiction', 'Assume the opposite of what you want, and derive something impossible.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Limits of functions · 5 marks',
          title: 'Can a function have two limits?',
          body: '“Given $F$ as defined above and $x_0 \\in X$. Prove that the limit of $F$ is unique.”\n\nIn other words: if $\\lim_{x\\to x_0}F(x) = l_1$ and $\\lim_{x\\to x_0}F(x) = l_2$, then $l_1 = l_2$.\n\nThe picture says it all: $F(x)$ can’t be squeezed into a tiny band around $l_1$ **and** a tiny band around $l_2$ at the same time, if the two bands don’t overlap.',
          cta: 'Show me the plan',
        },
        {
          type: 'story',
          eyebrow: 'The plan',
          title: 'Assume two limits. Pick bands that don’t overlap.',
          body: '**1.** Suppose, for contradiction, $l_1 \\neq l_2$.\n\n**2.** Choose ε so small that the bands $(l_1 - \\varepsilon, l_1 + \\varepsilon)$ and $(l_2 - \\varepsilon, l_2 + \\varepsilon)$ can’t both contain the same number.\n\n**3.** Find one $x$ close to $x_0$ where $F(x)$ is in both bands anyway. Contradiction.\n\nThe tool that links $l_1$, $l_2$ and $F(x)$ is the **triangle inequality**, with $F(x)$ as the middle term:\n\n$$|l_1 - l_2| \\le |l_1 - F(x)| + |F(x) - l_2|.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Which ε makes the bands around $l_1$ and $l_2$ just fail to overlap?',
          options: [
            { text: '$\\varepsilon = 1$', why: 'If $l_1$ and $l_2$ are closer than 2 apart, bands of width 1 overlap. ε must depend on the gap.' },
            { text: '$\\varepsilon = \\dfrac{|l_1 - l_2|}{2}$', correct: true, why: 'Half the gap. Then $\\varepsilon + \\varepsilon = |l_1 - l_2|$, which is exactly what the contradiction needs.' },
            { text: '$\\varepsilon = |l_1 - l_2|$', why: 'Then we would only get $|l_1 - l_2| < 2|l_1 - l_2|$, which is true, not a contradiction.' },
            { text: '$\\varepsilon = 0$', why: 'ε must be strictly positive.' },
          ],
          explain: 'And since $l_1 \\neq l_2$, this ε is **strictly positive**, so the definition of a limit applies to it.',
        },
        {
          type: 'bridge',
          title: 'Strategy: set.',
          recap: [
            'Assume $l_1 \\neq l_2$ and take $\\varepsilon = \\frac{|l_1 - l_2|}{2} > 0$.',
            'Use the triangle inequality with $F(x)$ in the middle.',
          ],
          why: 'Now the proof itself, one line at a time.',
        },
      ],
    },
    {
      name: 'The proof',
      terms: [
        ['$\\delta = \\min(\\delta_1, \\delta_2)$', 'The standard way to make one $x$ satisfy two conditions at once: it is no bigger than either δ.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Step 1 of 4',
          title: 'Assume two different limits',
          body: 'Suppose $\\lim_{x\\to x_0}F(x) = l_1$ and $\\lim_{x\\to x_0}F(x) = l_2$, and suppose $l_1 \\neq l_2$.\n\nLet $$\\varepsilon = \\frac{|l_1 - l_2|}{2} > 0.$$',
        },
        {
          type: 'story',
          eyebrow: 'Step 2 of 4',
          title: 'Use the definition twice',
          body: 'Since $F(x) \\to l_1$, there is $\\delta_1 > 0$ such that\n$$x \\in X,\\ 0 < |x - x_0| < \\delta_1 \\implies |F(x) - l_1| < \\varepsilon.$$\n\nSince $F(x) \\to l_2$, there is $\\delta_2 > 0$ such that\n$$x \\in X,\\ 0 < |x - x_0| < \\delta_2 \\implies |F(x) - l_2| < \\varepsilon.$$\n\nSame ε, but possibly **different** δs.',
        },
        {
          type: 'choice',
          eyebrow: 'Step 3 of 4',
          prompt: 'We want one $x$ that satisfies **both** conditions. Which δ should we use?',
          options: [
            { text: '$\\delta = \\max(\\delta_1, \\delta_2)$', why: 'Too big: an $x$ within the larger δ may be outside the smaller one, so one of the two conditions may fail.' },
            { text: '$\\delta = \\min(\\delta_1, \\delta_2)$', correct: true, why: 'If $0 < |x - x_0| < \\min(\\delta_1, \\delta_2)$, then $x$ is within $\\delta_1$ **and** within $\\delta_2$, so both conclusions hold.' },
            { text: '$\\delta = \\delta_1 + \\delta_2$', why: 'Bigger than both. Neither condition is guaranteed.' },
            { text: '$\\delta = \\varepsilon$', why: 'δ comes from the definition, not from ε directly.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Step 3 of 4',
          prompt: 'With $\\delta = \\min(\\delta_1, \\delta_2)$, why is there definitely some $x \\in X$ with $0 < |x - x_0| < \\delta$?',
          options: [
            { text: 'Because $x_0 \\in X$.', why: 'That gives $x = x_0$, but we need $x \\neq x_0$.' },
            { text: 'Because $x_0$ is a limit point of $X$: every interval around $x_0$ contains points of $X$ other than $x_0$.', correct: true, why: 'This is exactly why the definition of a limit asks $x_0$ to be a limit point. Without such an $x$, both conditions would be empty promises and **every** number would be a “limit”.' },
            { text: 'Because δ is positive.', why: 'Positivity alone isn’t enough: if $X$ had no points near $x_0$, the interval would contain none.' },
            { text: 'We don’t need such an $x$.', why: 'We do: the contradiction is built from one actual value $F(x)$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Step 4 of 4',
          title: 'Squeeze and contradict',
          body: 'Take such an $x$. Then both $|F(x) - l_1| < \\varepsilon$ and $|F(x) - l_2| < \\varepsilon$. By the triangle inequality,\n$$\\begin{aligned} |l_1 - l_2| &= |(l_1 - F(x)) + (F(x) - l_2)| \\\\ &\\le |F(x) - l_1| + |F(x) - l_2| \\\\ &< \\varepsilon + \\varepsilon = 2\\varepsilon = |l_1 - l_2|. \\end{aligned}$$\n\nSo $|l_1 - l_2| < |l_1 - l_2|$: a number strictly less than itself. **Impossible.**\n\nHence our assumption was false, and $l_1 = l_2$. The limit is unique. $\\blacksquare$',
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the proof in order.',
          items: [
            'Suppose $F(x) \\to l_1$ and $F(x) \\to l_2$ as $x \\to x_0$, with $l_1 \\neq l_2$.',
            'Let $\\varepsilon = \\frac{|l_1 - l_2|}{2} > 0$.',
            'Get $\\delta_1$ for $l_1$ and $\\delta_2$ for $l_2$ from the definition.',
            'Let $\\delta = \\min(\\delta_1, \\delta_2)$ and pick $x \\in X$ with $0 < |x - x_0| < \\delta$.',
            'Then $|l_1 - l_2| \\le |F(x) - l_1| + |F(x) - l_2| < 2\\varepsilon = |l_1 - l_2|$.',
            'Contradiction, so $l_1 = l_2$.',
          ],
          hint: 'Assume → choose ε → two δs → combine them → triangle inequality → conclude.',
          explain: 'Six lines, five marks: each line is worth writing out in full.',
        },
        {
          type: 'bridge',
          title: 'Proof: complete.',
          recap: [
            'Two limits, $\\varepsilon = \\frac{|l_1 - l_2|}{2}$, $\\delta = \\min(\\delta_1, \\delta_2)$.',
            'Triangle inequality gives $|l_1 - l_2| < |l_1 - l_2|$: contradiction.',
          ],
          why: 'One more way to see it, then the model answer.',
        },
      ],
    },
    {
      name: 'Exam answer',
      screens: [
        {
          type: 'story',
          eyebrow: 'Another route',
          title: 'Without contradiction',
          body: 'You can also prove it directly. Take **any** $\\varepsilon > 0$ and repeat steps 2–4 to get\n$$|l_1 - l_2| < 2\\varepsilon.$$\n\nSo the fixed number $|l_1 - l_2| \\ge 0$ is smaller than every positive number $2\\varepsilon$. The only such number is $0$, so $l_1 = l_2$.\n\nEither version earns full marks. Use the one you can write without hesitation.',
        },
        {
          type: 'multi',
          eyebrow: 'Mark check',
          prompt: 'Which of these would an examiner want to see?',
          options: [
            { text: 'A clear statement of the assumption $l_1 \\neq l_2$.', correct: true, why: '**The assumption** is what you contradict, so it must be written down.' },
            { text: 'A specific, positive ε (half the gap).', correct: true, why: '**A concrete ε** shows you know the definition must be applied to a particular tolerance.' },
            { text: 'The choice $\\delta = \\min(\\delta_1, \\delta_2)$.', correct: true, why: '**Taking the minimum** is how both conditions hold together.' },
            { text: 'A graph of $F$.', why: '**A sketch** can help you think, but it isn’t a proof and earns no marks on its own.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Model answer · 5 marks',
          title: 'Write this',
          body: '**Proof.** Suppose $\\lim_{x\\to x_0}F(x) = l_1$ and $\\lim_{x\\to x_0}F(x) = l_2$ with $l_1 \\neq l_2$. Let $\\varepsilon = \\frac{1}{2}|l_1 - l_2| > 0$.\n\nThere exist $\\delta_1, \\delta_2 > 0$ such that for $x \\in X$:\n$0 < |x - x_0| < \\delta_1 \\implies |F(x) - l_1| < \\varepsilon$, and\n$0 < |x - x_0| < \\delta_2 \\implies |F(x) - l_2| < \\varepsilon$.\n\nLet $\\delta = \\min(\\delta_1, \\delta_2)$. Since $x_0$ is a limit point of $X$, choose $x \\in X$ with $0 < |x - x_0| < \\delta$. Then\n$$|l_1 - l_2| \\le |l_1 - F(x)| + |F(x) - l_2| < \\varepsilon + \\varepsilon = |l_1 - l_2|,$$\nwhich is impossible. Hence $l_1 = l_2$, and the limit is unique. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'You can prove uniqueness.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
