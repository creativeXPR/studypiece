// ACP 111 · Even pseudoprimes · Lesson 1: remainders, Fermat's test, the composites that fool it,
// the rare even ones, and the question the paper answers.
import { CITE } from './paper';
import { clockSeven } from './scenes';

export default {
  id: 'fermat-liars',
  title: 'Fermat’s test and its liars',
  covers: 'Remainders, Fermat’s little theorem, pseudoprimes, the even ones, and the question the paper answers',
  minutes: 12,
  sections: [
    {
      name: 'A test for primes',
      terms: [
        ['Mod', '$a \\equiv b \\pmod m$ means $a$ and $b$ leave the same remainder when divided by $m$.'],
        ['Fermat’s little theorem', 'If $p$ is prime, then $a^p \\equiv a \\pmod p$ for every whole number $a$.'],
        ['Fermat test (base 2)', 'If $2^N \\not\\equiv 2 \\pmod N$, then $N$ is certainly composite.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'ACP 111 · Academic Papers',
          title: 'One paper, understood fully',
          body: `This unit walks you through a real research paper:\n\n**${CITE}**\n\nBy the end you can explain it, check its key facts, follow its proof, and cite or build on it. We start from remainders: no number theory needed.`,
          asides: [{ label: 'Note', text: 'All results belong to the authors. The paper is free on the Journal of Integer Sequences website.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Guess first',
          prompt: 'Can infinitely many positive numbers add up to less than $0.01$?',
          options: [
            { text: 'Yes, if they shrink fast enough', correct: true, why: 'Exactly what this paper shows for a special set of numbers. We’ll see why it’s possible in lesson 3.' },
            { text: 'No, infinitely many always add to infinity', why: 'Surprisingly not: $\\tfrac1{100} + \\tfrac1{200} + \\tfrac1{400} + \\dots = \\tfrac1{50}$, and smaller starts give smaller totals.' },
            { text: 'Only if some of them are negative', why: 'All the numbers here are positive, and the total can still be finite.' },
          ],
        },
        clockSeven,
        {
          type: 'story',
          eyebrow: 'Fermat’s little theorem',
          title: 'Primes always land back on 2',
          body: 'What happened on the 7-hour clock is a theorem. For any prime $p$:\n\n$$2^p \\equiv 2 \\pmod p.$$\n\nThat gives a quick **test** for a number $N$: work out $2^N \\bmod N$. If the answer is **not** $2$, then $N$ cannot be prime. Computers do this in a split second, even for numbers hundreds of digits long.',
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Test $N = 9$',
          graph: {
            steps: [
              { ask: 'Work out $2^9$.', answer: 512, hint: 'Double $1$ nine times: $2, 4, 8, \\dots$' },
              { ask: 'What is the remainder when $512$ is divided by $9$?', answer: 8, hint: '$9 \\times 56 = 504$. What is left?' },
              { ask: 'So what does the test say about $9$?', options: ['$9$ is certainly composite', '$9$ is probably prime', 'The test can’t tell'], answer: 0, hint: 'The remainder was not $2$.' },
            ],
            after: 'Correct, and indeed $9 = 3 \\times 3$. A failed test is **proof** of being composite.',
          },
        },
      ],
    },
    {
      name: 'Liars',
      terms: [
        ['Pseudoprime', 'A composite $N$ with $2^N \\equiv 2 \\pmod N$: it passes the test without being prime.'],
        ['Even pseudoprime', 'An even pseudoprime. The smallest is $161038$. The paper calls the set of them $\\mathcal E$.'],
        ['Reciprocal sum', 'The total of $1/N$ over a set of numbers. A finite total means the set is sparse.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'fermat',
          eyebrow: 'Try it',
          title: 'Catch a liar',
          body: 'Test some numbers. Passing doesn’t always mean prime: find one that **passes but is composite**.',
          graph: { presets: [7, 9, 91, 341, 561], need: ['fail', 'prime', 'liar'] },
        },
        {
          type: 'choice',
          eyebrow: 'What did 341 show?',
          prompt: '$2^{341} \\equiv 2 \\pmod{341}$, yet $341 = 11 \\times 31$. What does that make $341$?',
          options: [
            { text: 'A pseudoprime: composite but passing the test', correct: true, why: 'It’s the smallest one. Passing only means “probably prime”.' },
            { text: 'A prime, because it passed', why: 'It has factors $11$ and $31$, so it isn’t prime.' },
            { text: 'Proof that Fermat’s theorem is wrong', why: 'The theorem says primes pass. It never claimed only primes pass.' },
          ],
        },
        {
          type: 'custom',
          widget: 'fermat',
          eyebrow: 'Try it',
          title: 'The even liars',
          body: 'Even liars are far rarer: the first is beyond $160{,}000$. Test these neighbours and find it.',
          graph: { presets: [161036, 161038, 161040, 215326], need: ['even'] },
        },
        {
          type: 'story',
          eyebrow: 'What was known',
          title: 'Infinitely many, but how many?',
          body: 'The even pseudoprimes begin $161038,\\ 215326,\\ 2568226,\\ \\dots$\n\n• In **1951** Beeger proved there are **infinitely many**.\n• Computers have listed **all** of them up to $10^{16}$: just $2045$ numbers.\n\nSo they never run out, yet they are spread incredibly thin. How do you put a number on “thin”?',
        },
        {
          type: 'story',
          eyebrow: 'The paper’s question',
          title: 'Add up their reciprocals',
          body: 'Add $\\tfrac1N$ over **every** even pseudoprime $N$. If the set is sparse enough, the total is finite. Cheng, Kinlaw and Nguyen prove (their **Theorem 1**):\n\n$$0.000011 < \\sum_{N \\in \\mathcal E} \\frac1N < 0.0059.$$\n\nWith an earlier bound of $0.0911$ for the odd pseudoprimes, all base-2 liars together have reciprocal sum **below $0.1$**.',
          asides: [{ label: 'Tip', text: 'Read it as: “the even liars are so rare that even infinitely many of them add up to less than six thousandths.”' }],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'If $2^N \\not\\equiv 2 \\pmod N$, then $N$ is composite', correct: true, why: 'Primes always pass, so failing proves $N$ is not prime.' },
            { text: 'There are infinitely many even pseudoprimes', correct: true, why: 'Beeger proved it in 1951.' },
            { text: 'The paper shows the reciprocal sum **equals** $0.0059$', why: '$0.0059$ is an **upper bound**: the true value is below it.' },
            { text: 'Every number that passes the test is prime', why: '$341$ and $161038$ pass and are composite.' },
          ],
        },
        {
          type: 'finish',
          title: 'You know what the paper is about.',
          body: 'Fermat’s test, its liars, the rare even ones, and the bound $0.0059$ on their reciprocal sum. Next: the fingerprint every even liar must carry.',
        },
      ],
    },
  ],
};
