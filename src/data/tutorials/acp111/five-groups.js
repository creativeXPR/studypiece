// ACP 111 · Even pseudoprimes · Lesson 4: the cut-offs y_k and z_k, the five groups A1–A5 and how
// each is bounded (Rankin's trick, a direct sum, Lemma 10, Dusart's prime bounds), the mod-16
// sharpening, and the final budget 0.005865 < 0.0059.
import { budgetScene } from './scenes';

export default {
  id: 'five-groups',
  title: 'Five groups and the final budget',
  covers: 'The groups A1 to A5, smooth numbers, why small orders are rare, and adding up to 0.0059',
  minutes: 13,
  sections: [
    {
      name: 'The five groups',
      terms: [
        ['$P(N)$', 'The largest prime factor of $N$. The proof groups even pseudoprimes by it.'],
        ['$y$-smooth', 'Having every prime factor at most $y$.'],
        ['$y_k$, $z_k$', 'Cut-offs for the window $e^k < N \\le e^{k+1}$: $y_k = e^{1.56\\sqrt k}$ and $z_k = e^{k/2}/(2\\sqrt2)$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Even pseudoprimes in one window with largest prime $p$ add up to about…',
          options: [
            { text: '$1/(p\\,\\ell_2(p))$', correct: true, why: 'They all lie in one class mod $p\\,\\ell_2(p)$.' },
            { text: '$1/p$', why: 'The modulus is $p\\,\\ell_2(p)$, not $p$.' },
            { text: '$p\\,\\ell_2(p)$', why: 'It’s the reciprocal: bigger moduli mean sparser classes.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Two cut-offs',
          title: 'Where is the largest prime?',
          body: 'In the window $e^k < N \\le e^{k+1}$, let $p$ be the **largest prime factor** of $N$.\n\n• If $p \\le y_k = e^{1.56\\sqrt k}$, every factor of $N$ is small: $N$ is **smooth**. (For $k = 36$, $y_k \\approx 11600$.)\n• If $p \\le z_k = e^{k/2}/(2\\sqrt2)$, then $16\\,p\\,\\ell_2(p) \\le e^k$, so the mod 16 condition can be used inside the window.\n\nAbove $y_k$, the size of $\\ell_2(p)$ decides which group $N$ falls into.',
        },
        {
          type: 'story',
          eyebrow: 'The proof map',
          title: 'Five groups cover everything',
          body: 'Every even pseudoprime beyond $e^{36}$ lands in one group:\n\n• $\\mathcal A_1$, $p \\le y_k$: smooth numbers, Rankin’s trick, $< 0.003138$.\n• $\\mathcal A_2$, $p \\le 6.5 \\times 10^7$: added up by computer, $< 0.000070$.\n• $\\mathcal A_3$, $\\ell_2(p) \\le p^{0.4}$: tiny order, but such primes are rare (Lemma 10).\n• $\\mathcal A_4$, $\\ell_2(p) \\le p^{0.48}$: still rare, and each term is smaller.\n• $\\mathcal A_5$, $\\ell_2(p) > p^{0.48}$: each term is below $1/p^{1.48}$, which sums over all primes.',
        },
        {
          type: 'story',
          eyebrow: 'Group A₁',
          title: 'Rankin’s trick',
          body: 'Here $n = N/2$ is odd, almost squarefree and has only prime factors $\\le y$. To bound $\\sum 1/n$ over such $n$ beyond $x$, multiply every term by $(n/x)^s \\ge 1$ and then add **all** such $n$:\n\n$$\\sum_{n > x} \\frac1n \\le x^{-s} \\prod_{3 \\le p \\le y} \\Big(1 + \\frac{1}{p^{1-s}}\\Big).$$\n\nThe product is easy to compute, and $s$ is tuned for each window. Summed over all $k \\ge 36$ this gives $\\tfrac12(0.004024 + 0.002251) < 0.003138$.',
        },
        {
          type: 'choice',
          eyebrow: 'Why rare?',
          prompt: 'If $\\ell_2(p) = m$, then $p$ divides $2^m - 1$. Why does that make primes with **small** order rare?',
          options: [
            { text: 'Each $2^m - 1$ has only a few prime factors, and there are few small $m$', correct: true, why: 'Multiplying all such $p$ gives at most $\\prod (2^m - 1)$ over small odd $m$. That caps how many there can be: **Lemma 10** gives at most $0.00754\\,x^{0.8}$ below $x$.' },
            { text: 'Because small numbers are rarely prime', why: 'The point is about the order, not the size of $p$.' },
            { text: 'Because $2^m - 1$ is always prime', why: '$2^6 - 1 = 63$ is not prime, and the argument doesn’t need primality.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'A floor for the order',
          prompt: 'Since $p$ divides $2^{\\ell_2(p)} - 1$, which is always true?',
          options: [
            { text: '$\\ell_2(p) > \\log p / \\log 2$', correct: true, why: '$2^{\\ell_2(p)} - 1 \\ge p$, so $2^{\\ell_2(p)} > p$. Take logs. The paper uses this in $\\mathcal A_3$.' },
            { text: '$\\ell_2(p) > p / 2$', why: '$\\ell_2(73) = 9$, far below $36$.' },
            { text: '$\\ell_2(p) < \\log p$', why: 'It goes the other way: the order is at least about $\\log_2 p$.' },
          ],
        },
      ],
    },
    {
      name: 'The budget',
      terms: [
        ['Proposition 11', 'In one window, numbers $\\equiv p \\pmod{p\\,\\ell_2(p)}$ add at most $\\tfrac{2}{p\\,\\ell_2(p)}$.'],
        ['Proposition 12', 'With $N \\equiv 2$ or $14 \\pmod{16}$ also used, at most $\\tfrac{1}{4p\\,\\ell_2(p)}$ when $p \\le z_k$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'The mod 16 bonus',
          prompt: 'Proposition 12 improves $\\tfrac{2}{p\\,\\ell_2(p)}$ to $\\tfrac{1}{4p\\,\\ell_2(p)}$. Where does the factor $8$ come from?',
          options: [
            { text: 'Only $2$ of the $16$ classes mod $16$ are allowed', correct: true, why: 'By the Chinese remainder theorem, $N$ is in $2$ classes mod $16p\\,\\ell_2(p)$ instead of $16$: one eighth as many numbers.' },
            { text: 'From the factor $8$ in $p \\equiv \\pm1 \\pmod 8$ directly', why: 'Close, but the saving comes from the mod 16 condition on $N$ (Corollary 4), which follows from that fact.' },
            { text: 'It is a numerical accident', why: 'It’s exact: $\\tfrac{2}{16} = \\tfrac18$ of the class survives.' },
          ],
        },
        budgetScene,
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Check the arithmetic',
          graph: {
            steps: [
              { ask: 'Add the three analytic pieces: $0.000925 + 0.000535 + 0.001185$.', answer: 0.002645, tol: 0.000001, hint: 'Line up the decimals: $925 + 535 + 1185$ millionths.' },
              { ask: 'Now add $0.000012 + 0.003138 + 0.000070$ to that.', answer: 0.005865, tol: 0.000001, hint: '$2645 + 12 + 3138 + 70$ millionths.' },
              { ask: 'So the proven bound is…', options: ['$\\sum 1/N < 0.0059$', '$\\sum 1/N = 0.005865$', '$\\sum 1/N > 0.0059$'], answer: 0, hint: 'Every piece is an upper bound.' },
            ],
            after: 'Each piece is an upper bound, so the total is too. The true sum is far smaller; the bound just has to be **safe**.',
          },
        },
        {
          type: 'order',
          eyebrow: 'The whole proof',
          prompt: 'Put the proof of Theorem 1 in order:',
          items: [
            'Add the reciprocals of the known list up to $10^{16}$',
            'Prove the fingerprint: $N \\equiv p \\pmod{p\\,\\ell_2(p)}$, odd order, $\\pm1 \\pmod 8$',
            'Bound one residue class per window (Propositions 11 and 12)',
            'Split by largest prime and order into $\\mathcal A_1$ to $\\mathcal A_5$ and bound each',
            'Add every piece: $0.005865 < 0.0059$',
          ],
          explain: 'Facts first, then a counting estimate, then a case split, then arithmetic. Many “explicit bound” papers follow this shape.',
        },
        {
          type: 'finish',
          title: 'You can follow the proof.',
          body: 'Five groups, each controlled by one idea: smoothness, computation, rare small orders, or a fast-shrinking sum over primes. They add up to $0.005865 < 0.0059$. Last lesson: using the paper.',
        },
      ],
    },
  ],
};
