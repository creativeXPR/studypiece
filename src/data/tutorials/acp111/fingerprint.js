// ACP 111 · Even pseudoprimes · Lesson 2: the order of 2 mod p and the paper's Lemma 2 (N ≡ p mod
// p·order, the order is odd, p ≡ ±1 mod 8, p ≤ N/14), Corollary 4 (N ≡ 2 or 14 mod 16) and Lemma 5
// (almost squarefree), each checked on 161038.
import { clockSeventyThree } from './scenes';

export default {
  id: 'fingerprint',
  title: 'The fingerprint of an even liar',
  covers: 'The order of 2 mod p, Lemma 2, the mod 8 and mod 16 facts, and why repeated primes are rare',
  minutes: 13,
  sections: [
    {
      name: 'The order of 2',
      terms: [
        ['Order of 2 mod p, $\\ell_2(p)$', 'The smallest $k \\ge 1$ with $2^k \\equiv 1 \\pmod p$: the length of the cycle of powers of $2$.'],
        ['Order rule', '$2^m \\equiv 1 \\pmod p$ exactly when $\\ell_2(p)$ divides $m$. Also $\\ell_2(p)$ always divides $p - 1$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which number is an **even pseudoprime**?',
          options: [
            { text: '$161038$', correct: true, why: 'The smallest one: $2^{161038} \\equiv 2$, yet it is even.' },
            { text: '$341$', why: '$341$ is a pseudoprime, but odd.' },
            { text: '$2$', why: '$2$ is prime, so it is not a liar.' },
            { text: '$161040$', why: 'It fails the test, so it is just composite.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'A cleaner equation',
          title: 'Halve everything',
          body: 'Write the even number as $N = 2n$. The test $2^{2n} \\equiv 2 \\pmod{2n}$ can be divided by $2$, which turns it into\n\n$$2^{2n-1} \\equiv 1 \\pmod n.$$\n\nThe left side is odd, so $n$ must be **odd**. For $161038$: $n = 80519 = 73 \\times 1103$. Now look at each prime $p$ dividing $n$ on its own.',
        },
        clockSeventyThree,
        {
          type: 'choice',
          eyebrow: 'Use the cycle',
          prompt: 'Powers of $2$ mod $73$ repeat every $9$ steps. When is $2^m \\equiv 1 \\pmod{73}$?',
          options: [
            { text: 'Exactly when $9$ divides $m$', correct: true, why: 'Every full lap of the cycle brings you back to $1$, and only full laps do. This is the **order rule**.' },
            { text: 'When $m$ is a multiple of $73$', why: 'The cycle length is $9$, not $73$.' },
            { text: 'When $m$ is odd', why: '$2^1 = 2$, not $1$. Only multiples of the cycle length work.' },
          ],
        },
      ],
    },
    {
      name: 'Lemma 2',
      terms: [
        ['Lemma 2', 'For each odd prime $p \\mid N \\in \\mathcal E$: $N \\equiv p \\pmod{p\\,\\ell_2(p)}$, $\\ell_2(p)$ is odd, $p \\equiv \\pm1 \\pmod 8$ and $p \\le N/14$.'],
        ['Corollary 4', 'Every even pseudoprime is $\\equiv 2$ or $14 \\pmod{16}$.'],
        ['Wieferich prime', 'A prime $p$ with $2^{p-1} \\equiv 1 \\pmod{p^2}$. Only $1093$ and $3511$ are known.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Lemma 2, step 1',
          prompt: 'If $p$ divides $n$, then $2^{2n-1} \\equiv 1 \\pmod p$, so $\\ell_2(p)$ divides $2n - 1$. What follows?',
          options: [
            { text: '$\\ell_2(p)$ is odd', correct: true, why: '$2n - 1$ is odd, and an odd number has only odd divisors. Check: $\\ell_2(73) = 9$, $\\ell_2(1103) = 29$.' },
            { text: '$\\ell_2(p)$ is even', why: 'It divides the odd number $2n - 1$, so it can’t be even.' },
            { text: '$\\ell_2(p) = p - 1$', why: 'It divides $p - 1$ but is usually smaller: $\\ell_2(73) = 9$, not $72$.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Lemma 2, step 2',
          prompt: 'Put the argument for $N \\equiv p \\pmod{p\\,\\ell_2(p)}$ in order:',
          items: [
            '$\\ell_2(p)$ divides $2n - 1$, so $N = 2n \\equiv 1 \\pmod{\\ell_2(p)}$',
            '$\\ell_2(p)$ divides $p - 1$, so $p \\equiv 1 \\pmod{\\ell_2(p)}$',
            'Hence $N \\equiv p \\pmod{\\ell_2(p)}$, and also $N \\equiv 0 \\equiv p \\pmod p$',
            '$p$ and $\\ell_2(p)$ share no factor, so the Chinese remainder theorem joins them: $N \\equiv p \\pmod{p\\,\\ell_2(p)}$',
          ],
          explain: 'This congruence is the paper’s main tool: once $p$ is fixed, $N$ is trapped in a single residue class.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Check it on 161038',
          title: 'Does the fingerprint fit?',
          graph: {
            steps: [
              { ask: 'With $p = 73$ and $\\ell_2(73) = 9$: what is $161038 \\bmod 657$?', answer: 73, hint: '$657 \\times 245 = 160965$. Subtract.' },
              { ask: 'What is $1103 \\bmod 8$?', answer: 7, hint: '$8 \\times 137 = 1096$.' },
              { ask: 'What is $161038 \\bmod 16$?', answer: 14, hint: '$16 \\times 10064 = 161024$.' },
            ],
            after: '$N \\equiv p \\pmod{p\\,\\ell_2(p)}$, $p \\equiv \\pm 1 \\pmod 8$ and $N \\equiv 14 \\pmod{16}$: exactly as Lemma 2 and Corollary 4 predict.',
          },
        },
        {
          type: 'story',
          eyebrow: 'Two more facts',
          title: 'Mod 8, then mod 16',
          body: '**$p \\equiv \\pm1 \\pmod 8$.** An odd order divides $\\tfrac{p-1}2$, so $2^{(p-1)/2} \\equiv 1$. By **Euler’s criterion** that happens only for $p \\equiv 1$ or $7 \\pmod 8$.\n\n**Corollary 4.** Multiply primes that are $\\pm1 \\pmod 8$ and you get $n \\equiv \\pm 1 \\pmod 8$, so $N = 2n \\equiv 2$ or $14 \\pmod{16}$. Only $2$ classes out of $16$ remain: the paper uses this to cut its estimates by a factor of $8$.',
        },
        {
          type: 'sort',
          eyebrow: 'Sort them',
          prompt: 'Could it divide an even liar?',
          buckets: [
            { id: 'yes', label: 'Possible' },
            { id: 'no', label: 'Impossible' },
          ],
          items: [
            { text: '$23$ (order $11$)', bucket: 'yes', why: '$23 \\equiv 7 \\pmod 8$ and its order is odd. It divides $215326$.' },
            { text: '$73$ (order $9$)', bucket: 'yes', why: '$73 \\equiv 1 \\pmod 8$, odd order. It divides $161038$.' },
            { text: '$13$ (order $12$)', bucket: 'no', why: '$13 \\equiv 5 \\pmod 8$, and its order is even.' },
            { text: '$17$ (order $8$)', bucket: 'no', why: '$17 \\equiv 1 \\pmod 8$, but its order $8$ is **even**. Both conditions are needed.' },
            { text: '$31$ (order $5$)', bucket: 'yes', why: '$31 \\equiv 7 \\pmod 8$, odd order. It divides $215326$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'fermat',
          eyebrow: 'Try it',
          title: 'Read the fingerprint',
          body: 'Test the next even liars. For each prime, check: $p \\bmod 8$ is $1$ or $7$, the order is odd, and the last column gives back $p$.',
          graph: { presets: [161038, 215326, 2568226], need: ['even'], fingerprint: true },
        },
        {
          type: 'story',
          eyebrow: 'The last two pieces',
          title: 'Not too big, rarely repeated',
          body: '**$p \\le N/14$.** Write $N = 2mp$. $m = 1$ is impossible (it would force $2 \\equiv 1 \\pmod p$), and $m = 3, 5$ are not $\\pm1 \\pmod 8$. So $m \\ge 7$.\n\n**Lemma 5.** If $p^2$ divides $N$, then $p$ is a **Wieferich prime**. The known ones are $1093$ and $3511$, and $1093 \\equiv 5 \\pmod 8$ is ruled out. So a repeated prime is at least $3511$: even pseudoprimes are “almost squarefree”.',
        },
        {
          type: 'finish',
          title: 'You can read the fingerprint.',
          body: 'Every odd prime $p$ in an even liar has odd order, is $\\pm1 \\pmod 8$, and traps $N$ in the class $p \\bmod p\\,\\ell_2(p)$. Next: how that turns into a bound on an infinite sum.',
        },
      ],
    },
  ],
};
