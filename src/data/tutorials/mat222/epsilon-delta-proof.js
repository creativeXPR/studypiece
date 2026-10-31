// MAT 222 · Reused as part of a larger lesson (see index.js): prove lim_{x→2} (x³ + 1)/(x − 3) = −9 from the ε-δ definition (5 marks).

export default {
  id: 'epsilon-delta-proof',
  title: 'Proving a limit with ε and δ',
  covers: 'lim (x³+1)/(x−3) = −9 as x → 2, from scratch work to finished proof',
  minutes: 20,
  sections: [
    {
      name: 'Scratch work',
      terms: [
        ['Scratch work', 'The rough working where you find δ. It is not part of the written proof, but the proof is impossible without it.'],
        ['Factor theorem', 'If $p(a) = 0$ for a polynomial $p$, then $(x - a)$ is a factor of $p(x)$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Limits of functions · 5 marks',
          title: 'Show that $\\lim_{x\\to 2}\\dfrac{x^3+1}{x-3} = -9$',
          body: 'Every ε-δ limit proof has **two stages**:\n\n**1. Scratch work.** Work backwards from $|F(x) - l| < \\varepsilon$ to find a δ that does the job.\n\n**2. The proof.** Start from “Let $\\varepsilon > 0$”, state your δ, and show it works.\n\nWe’ll do the scratch work first, slowly.',
          cta: 'Start the scratch work',
        },
        {
          type: 'choice',
          eyebrow: 'Step 0 · Check the claim',
          prompt: 'The function is a quotient of polynomials and $2 - 3 \\neq 0$. What do you get by substituting $x = 2$?',
          options: [
            { text: '$-9$', correct: true, why: '$\\frac{2^3 + 1}{2 - 3} = \\frac{9}{-1} = -9$. Good: the claimed limit is the value at $x = 2$, which tells us the algebra below will factor neatly.' },
            { text: '$9$', why: 'Watch the denominator: $2 - 3 = -1$.' },
            { text: '$\\frac75$', why: 'That is the value at $x = -2$.' },
            { text: 'Undefined', why: 'The denominator only vanishes at $x = 3$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Step 1 · Write out |F(x) − l|',
          title: 'Combine into a single fraction',
          body: 'We need to make $|F(x) - (-9)| = |F(x) + 9|$ small. Put it over a common denominator:\n\n$$\\left|\\frac{x^3+1}{x-3} + 9\\right| = \\left|\\frac{x^3 + 1 + 9(x-3)}{x-3}\\right| = \\frac{|x^3 + 9x - 26|}{|x - 3|}.$$\n\nThe numerator must vanish at $x = 2$ (since $F(2) = -9$). Check: $8 + 18 - 26 = 0$. ✓',
        },
        {
          type: 'choice',
          eyebrow: 'Step 2 · Factor',
          prompt: 'Since $x = 2$ is a root, $(x - 2)$ is a factor. Which factorisation of $x^3 + 9x - 26$ is correct?',
          options: [
            { text: '$(x - 2)(x^2 + 2x + 13)$', correct: true, why: 'Expand: $x^3 + 2x^2 + 13x - 2x^2 - 4x - 26 = x^3 + 9x - 26$. ✓' },
            { text: '$(x - 2)(x^2 - 2x + 13)$', why: 'Expanding gives $x^3 - 4x^2 + 17x - 26$. The $x^2$ terms don’t cancel.' },
            { text: '$(x + 2)(x^2 - 2x + 13)$', why: '$x = -2$ isn’t a root: $-8 - 18 - 26 \\neq 0$.' },
            { text: '$(x - 2)(x^2 + 2x - 13)$', why: 'The constant would be $+26$, not $-26$.' },
          ],
          explain: 'Long division or comparing coefficients gets you there: $x^3 + 0x^2 + 9x - 26 = (x - 2)(x^2 + bx + c)$ gives $b - 2 = 0$ and $-2c = -26$.',
        },
        {
          type: 'story',
          eyebrow: 'Step 3 · Spot what you control',
          title: 'One factor is $|x - 2|$. Bound the rest.',
          body: 'So\n$$|F(x) + 9| = |x - 2| \\cdot \\frac{|x^2 + 2x + 13|}{|x - 3|}.$$\n\nWe control $|x - 2|$: that is exactly what δ restricts. The other factor, $\\frac{|x^2+2x+13|}{|x-3|}$, changes with $x$. If we can show it is **less than some constant** $M$ near $x = 2$, then\n$$|F(x) + 9| < M\\,|x - 2|,$$\nand we just need $|x - 2| < \\frac{\\varepsilon}{M}$.',
        },
        {
          type: 'bridge',
          title: 'Scratch work: half done.',
          recap: [
            '$|F(x) + 9| = |x - 2| \\cdot \\dfrac{|x^2+2x+13|}{|x-3|}$.',
            'Goal: find a constant $M$ that bounds the fraction near $x = 2$.',
          ],
          why: 'Bounding that fraction is the heart of the question, and where most marks are won or lost.',
        },
      ],
    },
    {
      name: 'Taming the fraction',
      terms: [
        ['A first restriction on δ', 'Start with $\\delta \\le$ some fixed number (here $\\frac12$) to keep $x$ in a safe interval where the extra factor can be bounded.'],
        ['$\\delta = \\min(\\tfrac12, \\tfrac{\\varepsilon}{50})$', 'The δ for Q1(c). The $\\frac12$ keeps $x$ away from $3$; the $\\frac{\\varepsilon}{50}$ makes $50|x-2| < \\varepsilon$.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Step 4 · Keep x away from trouble',
          prompt: 'We first insist $|x - 2| < \\delta \\le$ some number. Why is $\\frac12$ a good choice and $1$ a bad one?',
          options: [
            { text: 'With $|x - 2| < 1$, $x$ can get close to $3$, where $x - 3 \\to 0$ and the fraction blows up.', correct: true, why: '$|x - 2| < 1$ allows $x \\in (1, 3)$, right up to the zero of the denominator. With $\\frac12$, $x \\in (\\frac32, \\frac52)$ stays a safe distance from $3$.' },
            { text: '$1$ is too big to be a δ.', why: 'Any positive number can be a δ. The problem is specifically the denominator.' },
            { text: 'Smaller is always better.', why: 'Any number below $1$ would do; $\\frac12$ just keeps the arithmetic clean.' },
            { text: 'It makes the numerator negative.', why: '$x^2 + 2x + 13 = (x + 1)^2 + 12 > 0$ always.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Step 5 · The denominator',
          title: 'Bound $\\frac{1}{|x - 3|}$ from above',
          body: 'If $|x - 2| < \\frac12$, then $\\frac32 < x < \\frac52$. So\n$$3 - x > 3 - \\tfrac52 = \\tfrac12 \\implies |x - 3| > \\tfrac12 \\implies \\frac{1}{|x - 3|} < 2.$$\n\nA **lower** bound on the denominator gives an **upper** bound on the fraction.',
        },
        {
          type: 'story',
          asides: [
            { label: 'Tip', text: 'Never use a variable as your bound. Choose a constant, because nothing can be bounded by a value that keeps changing.' },
          ],
          eyebrow: 'Step 6 · The numerator',
          title: 'Bound $|x^2 + 2x + 13|$ from above',
          body: 'If $\\frac32 < x < \\frac52$, then $|x| < \\frac52$. By the triangle inequality,\n$$|x^2 + 2x + 13| \\le |x|^2 + 2|x| + 13 < \\tfrac{25}{4} + 5 + 13 = \\tfrac{97}{4} < 25.$$\n\nRounding up to $25$ is allowed (we only need **an** upper bound) and keeps the numbers simple.',
        },
        {
          type: 'choice',
          eyebrow: 'Step 7 · Put it together',
          prompt: 'For $|x - 2| < \\frac12$ we have $|x^2+2x+13| < 25$ and $\\frac{1}{|x - 3|} < 2$. So $|F(x) + 9| < \\;?\\; \\cdot |x - 2|$.',
          options: [
            { text: '$25$', why: 'Don’t forget the factor $2$ from the denominator.' },
            { text: '$50$', correct: true, why: '$|F(x) + 9| = |x - 2| \\cdot |x^2+2x+13| \\cdot \\frac{1}{|x-3|} < |x - 2| \\cdot 25 \\cdot 2 = 50|x - 2|$.' },
            { text: '$12.5$', why: 'Multiply by $2$, don’t divide: $\\frac{1}{|x-3|} < 2$.' },
            { text: '$\\frac{97}{4}$', why: 'That’s only the numerator bound.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Step 8 · Choose δ',
          title: 'Two demands, one δ: take the minimum',
          body: 'We now want $50|x - 2| < \\varepsilon$, i.e. $|x - 2| < \\frac{\\varepsilon}{50}$. But Step 7 only holds when $|x - 2| < \\frac12$. So δ must satisfy **both**:\n$$\\boxed{\\delta = \\min\\left(\\tfrac12,\\ \\tfrac{\\varepsilon}{50}\\right)}$$\n\nThe $\\frac12$ makes the bound $M = 50$ valid; the $\\frac{\\varepsilon}{50}$ makes $50|x - 2|$ smaller than ε.',
        },
        {
          type: 'custom',
          widget: 'epsilonDelta',
          eyebrow: 'See it work',
          title: 'Try to beat the challenger',
          body: 'The yellow band is $-9 \\pm \\varepsilon$; the blue strip is $2 \\pm \\delta$. A δ **works** when the graph over the strip stays inside the band. Find a δ that fails, one that works, then change ε and press **Use the proof’s δ**.',
        },
        {
          type: 'bridge',
          title: 'δ: found.',
          recap: [
            '$|x-2| < \\frac12 \\implies |x - 3| > \\frac12$ and $|x^2+2x+13| < 25$, so $|F(x)+9| < 50|x-2|$.',
            '$\\delta = \\min(\\frac12, \\frac{\\varepsilon}{50})$.',
          ],
          why: 'The scratch work is done. Now write the proof the way it is marked: forwards, from “Let ε > 0”.',
        },
      ],
    },
    {
      name: 'Write the proof',
      screens: [
        {
          type: 'order',
          eyebrow: 'Rebuild the proof',
          prompt: 'Put the written proof in order.',
          items: [
            'Let $\\varepsilon > 0$ be given.',
            'Choose $\\delta = \\min(\\frac12, \\frac{\\varepsilon}{50})$.',
            'Suppose $0 < |x - 2| < \\delta$. Then $\\frac32 < x < \\frac52$.',
            'So $|x - 3| > \\frac12$ and $|x^2 + 2x + 13| < 25$.',
            'Hence $|F(x) + 9| = \\frac{|x-2|\\,|x^2+2x+13|}{|x-3|} < 50|x - 2|$.',
            'And $50|x - 2| < 50 \\cdot \\frac{\\varepsilon}{50} = \\varepsilon$.',
          ],
          hint: 'The proof runs forwards: given ε → choose δ → assume x is close → bound → conclude.',
          explain: 'Notice the proof uses the scratch work in reverse order.',
        },
        {
          type: 'multi',
          eyebrow: 'Common mistakes',
          prompt: 'Which of these are mistakes in an ε-δ proof?',
          options: [
            { text: 'Choosing $\\delta = \\frac{\\varepsilon}{50}$ without the $\\frac12$.', correct: true, why: '**Without the ½**, a large ε gives a large δ, $x$ can get near $3$, and the bound $50$ no longer holds.' },
            { text: 'Letting δ depend on $x$, e.g. $\\delta = \\frac{\\varepsilon|x - 3|}{25}$.', correct: true, why: '**δ may depend on ε (and $x_0$), never on $x$**: it must be fixed before $x$ is chosen.' },
            { text: 'Starting the proof with “Assume $|F(x) + 9| < \\varepsilon$”.', correct: true, why: '**That is the conclusion**, not the starting point. Starting there is circular.' },
            { text: 'Rounding $\\frac{97}{4}$ up to $25$.', why: '**Rounding an upper bound up** is always allowed: a bigger upper bound is still an upper bound.' },
          ],
        },
        {
          type: 'story',
          asides: [
            { label: 'Exam tip', text: 'A proof must be mathematically consistent. Use less English, but enough to establish the result.' },
          ],
          eyebrow: 'Model answer · 5 marks',
          title: 'Write this',
          body: '**Proof.** Let $F(x) = \\frac{x^3 + 1}{x - 3}$, $x \\neq 3$. For $x \\neq 3$,\n$$|F(x) + 9| = \\frac{|x^3 + 9x - 26|}{|x - 3|} = \\frac{|x - 2|\\,|x^2 + 2x + 13|}{|x - 3|}.$$\n\nLet $\\varepsilon > 0$ and choose $\\delta = \\min\\left(\\frac12, \\frac{\\varepsilon}{50}\\right)$. Suppose $0 < |x - 2| < \\delta$. Then $\\frac32 < x < \\frac52$, so\n$|x - 3| > \\frac12$ and $|x^2 + 2x + 13| \\le |x|^2 + 2|x| + 13 < \\frac{25}{4} + 5 + 13 < 25$.\n\nTherefore\n$$|F(x) + 9| < \\frac{25\\,|x - 2|}{1/2} = 50|x - 2| < 50 \\cdot \\frac{\\varepsilon}{50} = \\varepsilon.$$\n\nHence $\\lim_{x\\to 2}\\frac{x^3+1}{x-3} = -9$. $\\blacksquare$',
        },
        {
          type: 'finish',
          title: 'You can write an ε-δ proof.',
          body: 'The recipe works for any rational function: factor out $|x - x_0|$, restrict δ to keep away from zeros of the denominator, bound the rest by $M$, then take $\\delta = \\min(\\text{restriction}, \\frac{\\varepsilon}{M})$.',
        },
      ],
    },
  ],
};
