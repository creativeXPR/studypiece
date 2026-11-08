// ACP 111 · Even pseudoprimes · Lesson 5: explaining, checking, citing and extending the paper:
// a two-minute summary, common misreadings, reproducing its first numbers in Python, open questions,
// and how to cite it.
import { AUTHORS, CITE } from './paper';

export default {
  id: 'using-the-paper',
  title: 'Using the paper',
  covers: 'Explaining it in two minutes, misreadings to avoid, checking it in Python, citing it, and what could come next',
  minutes: 12,
  sections: [
    {
      name: 'Say it right',
      terms: [
        ['Explicit bound', 'A bound with actual numbers, like $0.0059$, rather than “some constant”.'],
        ['Upper bound', 'A number the true value is proved to be below. It need not be close.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which group gives the biggest piece of the final bound?',
          options: [
            { text: '$\\mathcal A_1$, the smooth numbers: $0.003138$', correct: true, why: 'More than half of $0.005865$.' },
            { text: '$\\mathcal A_2$, the computed primes', why: 'Only $0.000070$.' },
            { text: 'The small range up to $10^{16}$', why: 'Only $0.000012$: the known part is tiny.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Two minutes',
          title: 'Explain it to anyone',
          body: '“Fermat’s test calls $N$ probably prime when $2^N \\equiv 2 \\pmod N$. Some composites pass anyway, and a few of them are even, the first being $161038$. There are infinitely many, but **Cheng, Kinlaw and Nguyen** prove they are so sparse that their reciprocals add up to less than $0.0059$.\n\nThey add up the known ones to $10^{16}$, then use the fact that each prime factor $p$ traps $N$ in one class mod $p\\,\\ell_2(p)$. Splitting the rest into five groups by the size of that order bounds everything. Together with the odd ones, all base-2 pseudoprimes have reciprocal sum below $0.1$.”',
        },
        {
          type: 'multi',
          eyebrow: 'Spot the misreadings',
          prompt: 'Which statements about the paper are **accurate**?',
          options: [
            { text: 'The reciprocal sum lies between $0.000011$ and $0.0059$', correct: true, why: 'That is Theorem 1.' },
            { text: 'The proof combines computer calculation with analytic estimates', correct: true, why: 'The small range and $\\mathcal A_2$ are computed; the rest is analysis.' },
            { text: 'The reciprocal sum equals $0.0059$', why: 'It is an upper bound. The true value is probably only a little above $0.0000119$.' },
            { text: 'There are only finitely many even pseudoprimes', why: 'Infinitely many (Beeger, 1951); their reciprocals still add to a finite total.' },
          ],
        },
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Check it yourself',
          title: 'Reproduce the first numbers',
          body: 'Python’s `pow(2, N, N)` works out $2^N \\bmod N$ quickly. You can check the paper’s starting facts in a few lines.',
          graph: {
            tasks: [
              { ask: 'Run it: every even $N$ below $300{,}000$ that passes the test.', code: 'evens = [N for N in range(4, 300000, 2) if pow(2, N, N) == 2]\nprint(evens)', expect: '[161038, 215326]', hint: 'Run it as it is.', solution: 'evens = [N for N in range(4, 300000, 2) if pow(2, N, N) == 2]\nprint(evens)', done: 'The first two even pseudoprimes, exactly as listed in the paper.' },
              { ask: 'Add up their reciprocals: print `sum(1 / N for N in evens)`.', code: 'print()', match: '^1\\.0853', hint: 'Inside `print( )` put `sum(1 / N for N in evens)`.', solution: 'print(sum(1 / N for N in evens))', done: 'About $0.0000108538$: already $91\\%$ of the whole small range.' },
              { ask: 'Find the order of $2$ mod $73$ and mod $1103$. Run the function.', code: 'def order2(p):\n    k, x = 1, 2 % p\n    while x != 1:\n        x = x * 2 % p\n        k += 1\n    return k\n\nprint(order2(73), order2(1103))', expect: '9 29', hint: 'Run it as it is.', solution: 'def order2(p):\n    k, x = 1, 2 % p\n    while x != 1:\n        x = x * 2 % p\n        k += 1\n    return k\n\nprint(order2(73), order2(1103))', done: 'Both odd, as Lemma 2 demands. Try `161038 % (73 * 9)` next: you get $73$.' },
            ],
          },
        },
      ],
    },
    {
      name: 'Build on it',
      terms: [
        ['Citation', 'A reference that lets readers find the exact paper: authors, title, journal, volume, year, article.'],
        ['Open problem', 'A natural question the paper leaves unanswered, often the start of new research.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'What could come next',
          title: 'Open directions',
          cards: [
            { title: 'Tighten the bound', text: 'The bound is about $500$ times the known part. Sharper smooth-number estimates for $\\mathcal A_1$ would shrink it most.' },
            { title: 'Start the tail later', text: 'A longer computed list (beyond $10^{16}$) would let the analytic part begin at a larger $k$, where every estimate is smaller.' },
            { title: 'Other bases and tests', text: 'Even pseudoprimes to base $3$, or for other primality tests, invite the same method.' },
            { title: 'Counting', text: 'How many even pseudoprimes are there up to $x$? The reciprocal sum is a weaker but explicit cousin of that question.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Think like a researcher',
          prompt: 'You want to lower the bound $0.0059$ the most. Which piece should you attack first?',
          options: [
            { text: 'The smooth-number group $\\mathcal A_1$', correct: true, why: 'It is $0.003138$ of $0.005865$, over half the budget.' },
            { text: 'The small range up to $10^{16}$', why: 'It is already exact, and only $0.000012$.' },
            { text: 'Group $\\mathcal A_2$', why: 'It contributes only $0.000070$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Give credit',
          title: 'How to cite it',
          body: `Whenever you use the result, name the authors and the paper:\n\n**${CITE}.**\n\nIn a talk, put the authors on your first slide. In writing, cite Theorem 1 by number (“by Theorem 1 of Cheng, Kinlaw and Nguyen”) and say which facts you checked yourself.`,
          asides: [{ label: 'Tip', text: 'A four-slide talk: the question (Fermat liars), the result ($0.0059$), the key idea (one class mod $p\\,\\ell_2(p)$), and the budget picture.' }],
        },
        {
          type: 'order',
          eyebrow: 'For the next paper',
          prompt: 'A good order for reading any maths paper:',
          items: [
            'Read the abstract and the main theorem: what exactly is claimed?',
            'Check the claim on a small example by hand or by computer',
            'Read the lemma statements and see how they fit together',
            'Map the proof: which pieces, which tools, which numbers',
            'Only then work through the detailed estimates you need',
          ],
          explain: 'You did exactly this in this unit: claim, example, lemmas, proof map, details.',
        },
        {
          type: 'finish',
          title: 'You’re ready to use this paper.',
          body: `You can explain it, check it, follow its proof, cite it and see where it could go next. All credit for the result goes to ${AUTHORS}.`,
        },
      ],
    },
  ],
};
