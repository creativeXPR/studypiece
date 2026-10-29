// MAT 222 · Reused as part of a larger lesson (see index.js): the ε-δ definition of the limit of a function (2 marks).

const HOOK = [
  ['$F(x_0) = l$', 'Not the definition', 'The limit ignores $F(x_0)$ completely. $F$ need not even be defined at $x_0$.'],
  ['$F(x)$ gets closer to $l$ as $x$ gets closer to $x_0$', 'Close, but vague', '“Gets closer” can be true without ever arriving: $x^2$ gets closer to $-1$ as $x \\to 0$, yet the limit is $0$.'],
  ['We can make $F(x)$ as close to $l$ as we like by taking $x$ close enough to $x_0$', 'Exactly the idea', 'This is the sentence the ε-δ definition turns into symbols: “as close as we like” is ε, “close enough” is δ.'],
  ['$F(x)$ never actually equals $l$', 'Not required', 'It may or may not equal $l$. A constant function equals its limit everywhere.'],
];

export default {
  id: 'limit-definition',
  title: 'The ε-δ definition of a limit',
  covers: 'what “F has limit l at x₀” means, symbol by symbol',
  minutes: 12,
  sections: [
    {
      name: 'The idea',
      terms: [
        ['Limit point of $X$', 'A point $x_0$ such that every interval $(x_0 - \\delta, x_0 + \\delta)$ contains a point of $X$ other than $x_0$. It need not belong to $X$.'],
        ['ε (epsilon)', 'The output tolerance: how close to $l$ we demand $F(x)$ to be. Any positive number, chosen first.'],
        ['δ (delta)', 'The input tolerance: how close to $x_0$ the input must be. Found after ε, and may depend on it.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Limits of functions · 2 marks',
          title: 'When does $F$ have a limit $l$?',
          body: '“Let $F : X \\to \\mathbb{R}$, $X \\subset \\mathbb{R}$. Using the ε-δ definition, when is $F$ said to have a limit $l$ in $\\mathbb{R}$?”\n\nTwo marks means two things: the definition stated **correctly**, with the quantifiers **in the right order**. This lesson builds it so you never have to memorise it blindly.',
          cta: 'Let’s go',
        },
        {
          type: 'choice',
          poll: 'hook',
          prompt: 'In plain words, which sentence best captures $\\lim_{x \\to x_0} F(x) = l$?',
          options: HOOK.map(([text]) => ({ text })),
          pollTitle: 'Hold that thought.',
          pollBody: 'By the end of this lesson you’ll see exactly which sentence turns into the definition.',
        },
        {
          type: 'story',
          eyebrow: 'A game of two players',
          title: 'Challenger names ε. You answer with δ.',
          body: 'Picture a game. The **challenger** names a tolerance $\\varepsilon > 0$: “I want $F(x)$ within $\\varepsilon$ of $l$.”\n\nYou must reply with a $\\delta > 0$: “Fine: just keep $x$ within $\\delta$ of $x_0$ (but not equal to $x_0$).”\n\nIf you can **always** reply, however tiny ε is, then $l$ is the limit. If there is even one ε you cannot answer, it is not.',
        },
        {
          type: 'reveal',
          eyebrow: 'The pieces',
          title: 'Five symbols, five jobs',
          cards: [
            { title: 'ε > 0', text: 'The output band: we want $|F(x) - l| < \\varepsilon$. Chosen **first**, by the challenger, and can be any positive number.' },
            { title: 'δ > 0', text: 'The input window: we restrict to $|x - x_0| < \\delta$. Chosen **second**, so it may depend on ε.' },
            { title: '0 < |x − x₀|', text: 'Means $x \\neq x_0$. The value $F(x_0)$, if it exists at all, plays **no part** in the limit.' },
            { title: 'x ∈ X', text: 'We only test inputs where $F$ is defined.' },
            { title: 'x₀ a limit point', text: 'Points of $X$ come arbitrarily close to $x_0$, so “$x$ close to $x_0$” is never an empty promise.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The idea: in place.',
          recap: [
            '**ε** is the output tolerance, chosen first. **δ** is the input tolerance, found second.',
            '**$0 < |x - x_0|$** means the value at $x_0$ itself doesn’t matter.',
          ],
          why: 'Now we write it as the examiner wants it: one precise sentence.',
        },
      ],
    },
    {
      name: 'The definition',
      terms: [
        ['Limit of $F$ at $x_0$', '$\\lim_{x\\to x_0} F(x) = l$ if for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that for all $x \\in X$, $0 < |x - x_0| < \\delta \\implies |F(x) - l| < \\varepsilon$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The definition',
          title: 'Say it in symbols',
          body: 'Let $x_0$ be a limit point of $X$. We say $F$ has limit $l$ as $x \\to x_0$, written $\\lim_{x\\to x_0}F(x) = l$, if\n\n$$\\forall\\, \\varepsilon > 0\\ \\ \\exists\\, \\delta > 0 \\ \\text{ such that } \\ x \\in X,\\ 0 < |x - x_0| < \\delta \\implies |F(x) - l| < \\varepsilon.$$\n\nRead it aloud: “for **every** epsilon there **exists** a delta such that whenever $x$ is within delta of $x_0$ (and not equal to it), $F(x)$ is within epsilon of $l$.”',
        },
        {
          type: 'order',
          eyebrow: 'Build it',
          prompt: 'Put the definition together in the right order.',
          items: [
            'Let $x_0$ be a limit point of $X$.',
            'For every $\\varepsilon > 0$',
            'there exists $\\delta > 0$',
            'such that for all $x \\in X$ with $0 < |x - x_0| < \\delta$,',
            'we have $|F(x) - l| < \\varepsilon$.',
          ],
          hint: 'ε always comes before δ: the challenge before the response.',
          explain: 'That is the full answer to 1(a).',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Why does the definition say $0 < |x - x_0|$ instead of just $|x - x_0| < \\delta$?',
          options: [
            { text: 'To make δ smaller.', why: 'It doesn’t change the size of δ at all.' },
            { text: 'So that the value $F(x_0)$ (which may not even exist) has no say in the limit.', correct: true, why: 'Excluding $x = x_0$ means only the behaviour **near** $x_0$ counts. That is why $\\frac{\\sin x}{x}$ can have a limit at $0$ though it isn’t defined there.' },
            { text: 'Because $|x - x_0|$ could be negative.', why: 'An absolute value is never negative. The “$0 <$” rules out equality.' },
            { text: 'It’s just a convention; it changes nothing.', why: 'It matters: without it, a function with a “wrong” value at $x_0$ would have no limit there.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'A student writes “there exists $\\delta > 0$ such that for every $\\varepsilon > 0$ …”. What goes wrong?',
          options: [
            { text: 'Nothing; the order of quantifiers doesn’t matter.', why: 'Order matters a lot. Swapping changes the meaning.' },
            { text: 'One δ would have to work for every ε at once, which forces $F(x) = l$ for all $x$ near $x_0$.', correct: true, why: 'If $|F(x) - l| < \\varepsilon$ for **every** ε, then $|F(x) - l| = 0$. That describes a function that is constant near $x_0$, not a limit.' },
            { text: 'It makes ε depend on δ, which is fine.', why: 'It would be fine only for constant functions. The whole point is that δ may depend on ε.' },
            { text: 'It only matters for continuous functions.', why: 'It matters for every limit.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements about the definition are true?',
          options: [
            { text: 'δ is allowed to depend on ε.', correct: true, why: '**δ depends on ε**: a stricter challenge usually needs a smaller window.' },
            { text: '$x_0$ must belong to $X$.', why: '**$x_0$ need only be a limit point** of $X$. Think of $\\frac{\\sin x}{x}$ at $0$.' },
            { text: 'If a certain δ works, any smaller positive δ also works.', correct: true, why: '**Shrinking δ** only removes inputs, so the conclusion still holds.' },
            { text: 'We only need to check one small value of ε, like 0.001.', why: '**Every ε > 0** must be answerable, not one.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Definition: stated.',
          recap: [
            '$\\forall \\varepsilon > 0\\ \\exists \\delta > 0$: $0 < |x - x_0| < \\delta,\\ x \\in X \\implies |F(x) - l| < \\varepsilon$.',
            'ε first, δ second; δ may depend on ε; $x = x_0$ is excluded.',
          ],
          why: 'Last step: the answer exactly as you’d write it in the exam.',
        },
      ],
    },
    {
      name: 'Exam answer',
      screens: [
        {
          type: 'recall',
          poll: 'hook',
          eyebrow: 'Back to the start',
          title: 'Which sentence was the limit?',
          body: 'Here’s how each answer from the start holds up.',
          rows: HOOK,
          after: '“As close as we like” became **for every ε > 0**. “Close enough” became **there exists δ > 0**.',
        },
        {
          type: 'story',
          eyebrow: 'Model answer · 2 marks',
          title: 'Write this',
          body: 'Let $F : X \\to \\mathbb{R}$, $X \\subset \\mathbb{R}$, and let $x_0$ be a limit point of $X$. $F$ is said to have a limit $l \\in \\mathbb{R}$ as $x$ tends to $x_0$, written $\\lim_{x \\to x_0} F(x) = l$, if for every $\\varepsilon > 0$ there exists $\\delta > 0$ (depending on ε) such that\n\n$$|F(x) - l| < \\varepsilon \\quad \\text{whenever } x \\in X \\text{ and } 0 < |x - x_0| < \\delta.$$',
          note: 'Marks are usually lost for writing “there exists δ” before “for every ε”, or for dropping the “$0 <$”.',
        },
        {
          type: 'finish',
          title: 'You can define a limit.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
