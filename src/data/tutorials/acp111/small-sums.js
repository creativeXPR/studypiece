// ACP 111 · Even pseudoprimes · Lesson 3: why an infinite sum can be finite, how much the first even
// pseudoprimes contribute, the split into a computed part and a bounded tail, and how Lemma 2 turns
// the tail into a sum over primes of 1/(p·order).
import { firstLiars, twoSums } from './scenes';

export default {
  id: 'small-sums',
  title: 'Can an infinite sum stay small?',
  covers: 'Sparse sets, the computed small range, windows e^k to e^(k+1), and the sum over primes the proof needs',
  minutes: 12,
  sections: [
    {
      name: 'Sparse sets',
      terms: [
        ['Converges', 'An infinite sum converges when its running total settles at a finite value.'],
        ['Small range', 'All even pseudoprimes up to $10^{16}$: listed by computer, so their reciprocals are simply added.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which prime **cannot** divide an even pseudoprime?',
          options: [
            { text: '$17$, since its order $8$ is even', correct: true, why: 'Lemma 2 needs an odd order, even though $17 \\equiv 1 \\pmod 8$.' },
            { text: '$73$', why: '$73$ divides $161038$.' },
            { text: '$23$', why: '$23$ divides $215326$.' },
            { text: '$1103$', why: '$1103$ divides $161038$.' },
          ],
        },
        twoSums,
        {
          type: 'choice',
          eyebrow: 'Which ones settle?',
          prompt: 'For which set does $\\sum 1/N$ grow **forever**?',
          options: [
            { text: 'The primes $2, 3, 5, 7, \\dots$', correct: true, why: 'Euler showed $\\tfrac12 + \\tfrac13 + \\tfrac15 + \\dots$ diverges: primes are common enough. Pseudoprimes are much rarer.' },
            { text: 'The squares $1, 4, 9, 16, \\dots$', why: 'That’s the $1/n^2$ sum: it settles at about $1.645$.' },
            { text: 'The powers of two $1, 2, 4, 8, \\dots$', why: '$1 + \\tfrac12 + \\tfrac14 + \\dots = 2$.' },
          ],
        },
        firstLiars,
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'How much do the first two give?',
          graph: {
            steps: [
              { ask: '$1/161038$ in millionths (that is, times $10^6$), to two decimals?', answer: 6.21, tol: 0.02, hint: '$10^6 / 161038 \\approx 6.2$.' },
              { ask: '$1/215326$ in millionths?', answer: 4.64, tol: 0.02, hint: '$10^6 / 215326$.' },
              { ask: 'The whole small range is $11.8853$ millionths. What percentage do these two make?', answer: 91, tol: 1, hint: '$(6.21 + 4.64) / 11.8853 \\times 100$.' },
            ],
            after: 'About $91\\%$ from just two numbers. That is why the lower bound $0.000011$ is so easy: it comes from the list alone.',
          },
        },
      ],
    },
    {
      name: 'Bounding the tail',
      terms: [
        ['Window', 'The range $e^k < N \\le e^{k+1}$. The paper bounds each window, then adds over $k \\ge 36$.'],
        ['Residue class', 'All numbers with the same remainder mod $m$, like $73, 730, 1387, \\dots \\pmod{657}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The strategy',
          title: 'Compute the start, bound the rest',
          body: '**Small range**, $N \\le 10^{16}$: add the known list. That gives $0.0000118853\\ldots$\n\n**Large range**, $N > e^{36} \\approx 4.3 \\times 10^{15}$: no list exists, so prove an upper bound. The two ranges overlap, so nothing is missed.\n\nThe large range is cut into **windows** $e^k < N \\le e^{k+1}$, one for each $k \\ge 36$. Each window is bounded separately, then the bounds are added.',
        },
        {
          type: 'story',
          eyebrow: 'The key estimate',
          title: 'One class, one window, about $1/m$',
          body: 'Take the numbers $\\equiv 73 \\pmod{657}$. In any window $e^k < N \\le e^{k+1}$ there are about $\\tfrac{e^{k+1} - e^k}{657}$ of them, and their reciprocals add to about\n\n$$\\int_{e^k}^{e^{k+1}} \\frac{dt}{657\\,t} = \\frac{1}{657}.$$\n\nThe window spans one unit of $\\log t$, so a class mod $m$ contributes about $\\tfrac1m$ per window. The paper makes this exact (**Proposition 11**): at most $\\tfrac{2}{p\\,\\ell_2(p)}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Put it together',
          prompt: 'Lemma 2 traps $N$ in the class $p \\bmod p\\,\\ell_2(p)$. So in one window, the even pseudoprimes with largest prime $p$ add up to about…',
          options: [
            { text: '$\\dfrac{1}{p\\,\\ell_2(p)}$', correct: true, why: 'One class mod $m = p\\,\\ell_2(p)$ gives about $1/m$ per window.' },
            { text: '$\\dfrac{1}{p}$', why: 'That ignores the order: the class is mod $p\\,\\ell_2(p)$, which is much bigger than $p$.' },
            { text: '$\\ell_2(p)$', why: 'A large order makes the class **sparser**, so it should be in the denominator.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'What is left to prove',
          title: 'A sum over primes',
          body: 'The whole problem now comes down to showing that\n\n$$\\sum_{p} \\frac{1}{p\\,\\ell_2(p)}$$\n\nis small over the primes that matter. **Big order** helps: the term is tiny. **Small order** is dangerous, but primes with small order are **rare** (they must divide $2^m - 1$ for a small $m$).\n\nThat tension shapes the whole proof: group the primes by the size of $\\ell_2(p)$.',
        },
        {
          type: 'sort',
          eyebrow: 'Know your tools',
          prompt: 'Which tool does which job?',
          buckets: [
            { id: 'count', label: 'Counting' },
            { id: 'sum', label: 'Summing' },
          ],
          items: [
            { text: 'Dusart’s bounds on $\\pi(x)$, the number of primes up to $x$', bucket: 'count', why: 'They say **how many** primes there are below $x$.' },
            { text: 'Lemma 10: primes with small order are few', bucket: 'count', why: 'It bounds **how many** such primes lie below $x$.' },
            { text: 'Partial summation', bucket: 'sum', why: 'It turns a count into a bound on a **sum** of $1/p$-type terms.' },
            { text: 'Rankin’s trick for smooth numbers', bucket: 'sum', why: 'It bounds the **sum** of $1/n$ over numbers with only small prime factors.' },
          ],
        },
        {
          type: 'finish',
          title: 'You have the strategy.',
          body: 'Compute up to $10^{16}$, then bound each window using one residue class per prime. What remains is a sum of $1/(p\\,\\ell_2(p))$. Next: the five groups and the final budget.',
        },
      ],
    },
  ],
};
