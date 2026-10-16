// MAT 222 · Question 4(b): a Lipschitz function is uniformly continuous (5 marks).

export default {
  id: 'lipschitz',
  title: 'Lipschitz ⟹ uniformly continuous',
  covers: 'Question 4(b): prove |f(x) − f(y)| ≤ k|x − y| makes f uniformly continuous, with δ = ε/k',
  minutes: 12,
  sections: [
    {
      name: 'The idea',
      terms: [
        ['Lipschitz condition', '$|f(x) - f(y)| \\le k|x - y|$ for all $x, y \\in I$, for some constant $k \\ge 0$ (the Lipschitz constant).'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Question 4(b) · 5 marks',
          title: 'Prove that $f$ is uniformly continuous',
          body: '“Let $f$ be defined on a bounded interval $I$ on which it satisfies\n$$|f(x) - f(y)| \\le k|x - y|, \\quad \\forall x, y \\in I,\\ k \\in \\mathbb{R}_+.$$\nProve that $f$ is uniformly continuous on $I$.”\n\nThis inequality is called a ==Lipschitz condition==. It says the slope of any chord of the graph is at most $k$ in size: the function can’t change faster than $k$ times the input change.',
          cta: 'What do we need to show?',
        },
        {
          type: 'story',
          eyebrow: 'The target',
          title: 'Write down what “uniformly continuous” demands',
          body: 'Always start a proof by writing the definition you must satisfy. We need:\n\n$$\\forall\\, \\varepsilon > 0\\ \\exists\\, \\delta > 0:\\quad x, y \\in I,\\ |x - y| < \\delta \\implies |f(x) - f(y)| < \\varepsilon.$$\n\nThe Lipschitz inequality already turns $|f(x) - f(y)|$ into $k|x - y|$. So it is enough to make $k|x - y| < \\varepsilon$.',
        },
        {
          type: 'choice',
          eyebrow: 'Scratch work',
          prompt: 'Suppose $k > 0$. Which δ guarantees $k|x - y| < \\varepsilon$ whenever $|x - y| < \\delta$?',
          options: [
            { text: '$\\delta = k\\varepsilon$', why: 'Then $k|x - y| < k \\cdot k\\varepsilon = k^2\\varepsilon$, which is bigger than ε when $k > 1$.' },
            { text: '$\\delta = \\dfrac{\\varepsilon}{k}$', correct: true, why: '$|x - y| < \\frac{\\varepsilon}{k} \\implies k|x - y| < \\varepsilon$. Any smaller positive δ, like $\\frac{\\varepsilon}{2k}$, would also work.' },
            { text: '$\\delta = \\varepsilon + k$', why: 'Too big: $k(\\varepsilon + k)$ is larger than ε.' },
            { text: 'It depends on $x$, so no single δ exists.', why: 'Look again: $\\frac{\\varepsilon}{k}$ involves no $x$ or $y$ at all. That is what makes it **uniform**.' },
          ],
        },
        {
          type: 'bridge',
          title: 'δ: found.',
          recap: [
            '$\\delta = \\frac{\\varepsilon}{k}$ depends only on ε, never on $x$ or $y$.',
            'That is precisely the “one δ for the whole interval” of uniform continuity.',
          ],
          why: 'Now the written proof, plus one edge case most students miss.',
        },
      ],
    },
    {
      name: 'The proof',
      screens: [
        {
          type: 'story',
          eyebrow: 'The proof · case k > 0',
          title: 'Four lines',
          body: 'Let $\\varepsilon > 0$ be given, and choose $\\delta = \\dfrac{\\varepsilon}{k} > 0$.\n\nLet $x, y \\in I$ with $|x - y| < \\delta$. Then\n$$|f(x) - f(y)| \\le k|x - y| < k\\delta = k \\cdot \\frac{\\varepsilon}{k} = \\varepsilon.$$\n\nSince δ depends only on ε (not on $x$ or $y$), $f$ is uniformly continuous on $I$. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Edge case',
          prompt: 'If $\\mathbb{R}_+$ includes $0$, the constant could be $k = 0$. Then $\\frac{\\varepsilon}{k}$ is undefined. What do you write?',
          options: [
            { text: 'The theorem fails for $k = 0$.', why: 'It still holds. The function is just very simple in this case.' },
            { text: 'If $k = 0$, then $|f(x) - f(y)| \\le 0$, so $f$ is constant, and any δ (say $\\delta = 1$) works.', correct: true, why: 'A constant function has $|f(x) - f(y)| = 0 < \\varepsilon$ for all $x, y$. One line covers it.' },
            { text: 'Use $\\delta = \\varepsilon$ for every $k$.', why: 'That only works when $k \\le 1$.' },
            { text: 'Ignore it; examiners don’t care.', why: 'A one-line remark shows care and protects your marks.' },
          ],
          explain: 'A neat alternative avoids the cases entirely: take $\\delta = \\frac{\\varepsilon}{k + 1}$. Then $|f(x) - f(y)| \\le k|x - y| < \\frac{k\\varepsilon}{k + 1} < \\varepsilon$ for every $k \\ge 0$.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'The question says $I$ is **bounded**. Where did the proof use that?',
          options: [
            { text: 'In choosing δ.', why: '$\\delta = \\frac{\\varepsilon}{k}$ doesn’t mention $I$ at all.' },
            { text: 'Nowhere. A Lipschitz function is uniformly continuous on any interval, bounded or not.', correct: true, why: 'The proof never used boundedness. For example, $f(x) = 3x$ is Lipschitz with $k = 3$ on all of $\\mathbb{R}$, and uniformly continuous there.' },
            { text: 'To make sure $f$ is bounded.', why: 'Boundedness of $f$ plays no role in the proof.' },
            { text: 'To apply the Heine–Cantor theorem.', why: 'We didn’t need Heine–Cantor (which also needs a **closed** interval).' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the proof in order.',
          items: [
            'Let $\\varepsilon > 0$ be given.',
            'Choose $\\delta = \\frac{\\varepsilon}{k} > 0$ (if $k = 0$, $f$ is constant and any δ works).',
            'Let $x, y \\in I$ with $|x - y| < \\delta$.',
            'Then $|f(x) - f(y)| \\le k|x - y| < k\\delta = \\varepsilon$.',
            'δ depends on ε only, so $f$ is uniformly continuous on $I$.',
          ],
          hint: 'Given ε → choose δ → take any two points → apply the inequality → conclude.',
          explain: 'Five lines for five marks.',
        },
        {
          type: 'bridge',
          title: 'Proof: complete.',
          recap: [
            '$\\delta = \\frac{\\varepsilon}{k}$: then $|f(x) - f(y)| \\le k|x - y| < \\varepsilon$.',
            'Handle $k = 0$ (constant function), or use $\\delta = \\frac{\\varepsilon}{k+1}$.',
          ],
          why: 'The model answer, exactly as you would write it.',
        },
      ],
    },
    {
      name: 'Exam answer',
      screens: [
        {
          type: 'story',
          eyebrow: 'Model answer · 5 marks',
          title: 'Write this',
          body: '**Proof.** We must show: for every $\\varepsilon > 0$ there is $\\delta > 0$ such that $|f(x) - f(y)| < \\varepsilon$ for all $x, y \\in I$ with $|x - y| < \\delta$.\n\nIf $k = 0$ then $|f(x) - f(y)| \\le 0$ for all $x, y$, so $f$ is constant and any $\\delta > 0$ works.\n\nSuppose $k > 0$. Let $\\varepsilon > 0$ and put $\\delta = \\frac{\\varepsilon}{k} > 0$. For any $x, y \\in I$ with $|x - y| < \\delta$,\n$$|f(x) - f(y)| \\le k|x - y| < k\\delta = \\varepsilon.$$\n\nSince δ depends only on ε and not on $x$ or $y$, $f$ is uniformly continuous on $I$. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'You can prove it.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
