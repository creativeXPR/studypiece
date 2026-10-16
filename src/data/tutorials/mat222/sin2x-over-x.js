// MAT 222 · Question 4(c): continuity of sin 2x / x (value 1 at 0), and classifying the discontinuity (6 marks).

export default {
  id: 'sin2x-over-x',
  title: 'Discuss the continuity of sin 2x / x',
  covers: 'Question 4(c): continuity away from 0, the limit at 0, and a removable discontinuity',
  minutes: 18,
  sections: [
    {
      name: 'Away from 0',
      terms: [
        ['Algebra of continuous functions', 'Sums, products and quotients (where the denominator is non-zero) of continuous functions are continuous.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Question 4(c) · 6 marks',
          title: 'Discuss the continuity of $f$',
          body: '$$f(x) = \\begin{cases} \\dfrac{\\sin 2x}{x}, & x \\neq 0 \\\\ 1, & x = 0 \\end{cases}$$\n\n“Discuss the continuity of the function and classify the discontinuity if it exists.”\n\n“Discuss” means cover **every** point of $\\mathbb{R}$. A piecewise function only has a problem where the pieces meet, so the plan is:\n\n**1.** Points $x \\neq 0$. **2.** The limit at $0$. **3.** Compare with $f(0)$. **4.** Classify.',
          cta: 'Start with x ≠ 0',
        },
        {
          type: 'choice',
          eyebrow: 'Step 1 · x ≠ 0',
          prompt: 'Why is $f$ continuous at every $x_0 \\neq 0$?',
          options: [
            { text: 'Because $f(x_0)$ is defined there.', why: 'Being defined is only condition 1 of 3.' },
            { text: '$\\sin 2x$ and $x$ are continuous, and a quotient of continuous functions is continuous wherever the denominator is non-zero.', correct: true, why: 'Near any $x_0 \\neq 0$, $f(x) = \\frac{\\sin 2x}{x}$ with $x \\neq 0$, so the quotient rule for continuous functions applies.' },
            { text: 'Because $\\sin$ is bounded.', why: 'Boundedness doesn’t give continuity.' },
            { text: 'It isn’t; $f$ is discontinuous everywhere.', why: 'The only suspicious point is $x = 0$, where the formula changes.' },
          ],
        },
        {
          type: 'bridge',
          title: 'x ≠ 0: continuous.',
          recap: [
            '$f$ is continuous on $\\mathbb{R} \\setminus \\{0\\}$ (quotient of continuous functions, non-zero denominator).',
          ],
          why: 'Everything now hinges on $x = 0$.',
        },
      ],
    },
    {
      name: 'At x = 0',
      terms: [
        ['Standard limit', '$\\lim_{u\\to 0}\\frac{\\sin u}{u} = 1$, proved by squeezing: $\\cos u < \\frac{\\sin u}{u} < 1$ for $0 < |u| < \\frac{\\pi}{2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Step 2 · The key limit',
          title: 'Rewrite to use $\\frac{\\sin u}{u} \\to 1$',
          body: 'You may quote the standard limit\n$$\\lim_{u\\to 0}\\frac{\\sin u}{u} = 1.$$\n\nOur fraction has $\\sin 2x$ on top but only $x$ underneath. Multiply and divide by $2$ to make them match:\n$$\\frac{\\sin 2x}{x} = 2 \\cdot \\frac{\\sin 2x}{2x}.$$\n\nNow let $u = 2x$. As $x \\to 0$, $u \\to 0$ too.',
        },
        {
          type: 'choice',
          eyebrow: 'Step 2 · Compute',
          prompt: 'So $\\displaystyle\\lim_{x\\to 0}\\frac{\\sin 2x}{x} = \\;?$',
          options: [
            { text: '$1$', why: 'That’s $f(0)$, and the limit of $\\frac{\\sin x}{x}$. Here there’s an extra factor $2$.' },
            { text: '$2$', correct: true, why: '$\\lim_{x\\to0} 2 \\cdot \\frac{\\sin 2x}{2x} = 2 \\cdot \\lim_{u\\to 0}\\frac{\\sin u}{u} = 2 \\cdot 1 = 2$.' },
            { text: '$0$', why: '$\\sin 2x \\to 0$, but so does $x$. A “$\\frac00$” form needs work, not a guess.' },
            { text: 'It doesn’t exist.', why: 'It does; both one-sided limits equal $2$ (the function is even).' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Why sin u / u → 1',
          title: 'If the examiner wants it proved',
          body: 'For $0 < u < \\frac{\\pi}{2}$, comparing areas of a triangle, a sector and a larger triangle in the unit circle gives\n$$\\sin u < u < \\tan u.$$\n\nDivide through by $\\sin u > 0$ and take reciprocals:\n$$\\cos u < \\frac{\\sin u}{u} < 1.$$\n\nAs $u \\to 0^+$, $\\cos u \\to 1$, so by the **squeeze (sandwich) theorem** $\\frac{\\sin u}{u} \\to 1$. Since $\\frac{\\sin u}{u}$ is even, the same holds as $u \\to 0^-$.',
          note: 'Usually you may quote this standard limit. Include the squeeze argument if the question says “prove” or “from first principles”.',
        },
        {
          type: 'custom',
          widget: 'removable',
          eyebrow: 'See it',
          title: 'Zoom in on $x = 0$',
          body: 'The graph heads to height $2$, but the given value $f(0) = 1$ sits below the hole. Zoom in to watch $f(x)$ approach $2$, then repair the function.',
        },
        {
          type: 'choice',
          eyebrow: 'Step 3 · Compare',
          prompt: '$\\lim_{x\\to 0}f(x) = 2$ and $f(0) = 1$. What can you conclude?',
          options: [
            { text: '$f$ is continuous at $0$.', why: 'Condition 3 fails: the limit and the value differ.' },
            { text: '$f$ is discontinuous at $0$, because $\\lim_{x\\to0}f(x) = 2 \\neq 1 = f(0)$.', correct: true, why: 'Conditions 1 and 2 hold ($f(0)$ is defined, the limit exists), but condition 3 fails.' },
            { text: '$f$ is discontinuous at $0$ because $\\frac{\\sin 2x}{x}$ is undefined there.', why: 'The question defines $f(0) = 1$, so $f$ **is** defined at $0$. The problem is that the value is wrong.' },
            { text: 'We can’t tell without a graph.', why: 'The limit and the value are all we need.' },
          ],
        },
        {
          type: 'bridge',
          title: 'x = 0: discontinuous.',
          recap: [
            '$\\lim_{x\\to0}\\frac{\\sin 2x}{x} = 2 \\cdot \\lim_{u\\to0}\\frac{\\sin u}{u} = 2$.',
            '$f(0) = 1 \\neq 2$, so $f$ is discontinuous at $0$.',
          ],
          why: 'Last mark-earner: what **kind** of discontinuity is it?',
        },
      ],
    },
    {
      name: 'Classify',
      terms: [
        ['Removable discontinuity', '$\\lim_{x\\to x_0}f(x)$ exists but differs from $f(x_0)$ (or $f(x_0)$ is undefined). Redefining $f(x_0)$ as the limit makes $f$ continuous.'],
        ['Jump discontinuity (first kind)', 'Both one-sided limits exist but are different.'],
        ['Essential discontinuity (second kind)', 'At least one one-sided limit does not exist (infinite or oscillating).'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Types of discontinuity',
          title: 'Three kinds',
          cards: [
            { title: 'Removable', text: 'The limit **exists** but $\\neq f(x_0)$, or $f(x_0)$ is undefined. A single misplaced or missing point: fix it by redefining $f(x_0)$.' },
            { title: 'Jump (1st kind)', text: 'Left and right limits both exist but are **different**. The graph steps up or down, as with $\\lfloor x \\rfloor$ at integers.' },
            { title: 'Essential (2nd kind)', text: 'A one-sided limit **does not exist**: it is infinite (like $\\frac1x$ at $0$) or oscillates (like $\\sin\\frac1x$ at $0$).' },
          ],
        },
        {
          type: 'sort',
          eyebrow: 'Apply it',
          prompt: 'Classify the discontinuity at the given point.',
          buckets: [
            { id: 'r', label: 'Removable' },
            { id: 'j', label: 'Jump' },
            { id: 'e', label: 'Essential' },
          ],
          items: [
            { text: 'Our $f$ at $x = 0$', bucket: 'r', why: '**Limit 2 exists**, value is 1: removable.' },
            { text: '$\\frac{x^2 - 1}{x - 1}$ at $x = 1$', bucket: 'r', why: '**Limit is 2**, the function is just undefined at 1: removable.' },
            { text: '$\\lfloor x \\rfloor$ at $x = 1$', bucket: 'j', why: '**Left limit 0, right limit 1**: a jump.' },
            { text: '$\\frac{|x|}{x}$ at $x = 0$', bucket: 'j', why: '**Left limit −1, right limit 1**: a jump.' },
            { text: '$\\frac{1}{x}$ at $x = 0$', bucket: 'e', why: '**One-sided limits are infinite**: essential.' },
            { text: '$\\sin\\frac{1}{x}$ at $x = 0$', bucket: 'e', why: '**Oscillates** between −1 and 1 forever: essential.' },
          ],
          explain: 'Ask two questions: do both one-sided limits exist? Are they equal?',
        },
        {
          type: 'choice',
          eyebrow: 'Step 4 · Repair',
          prompt: 'How would you redefine $f$ to make it continuous everywhere?',
          options: [
            { text: 'Set $f(0) = 0$.', why: 'The limit at $0$ is $2$, not $0$.' },
            { text: 'Set $f(0) = 2$.', correct: true, why: 'Then $\\lim_{x\\to0}f(x) = 2 = f(0)$, so all three conditions hold and $f$ is continuous on all of $\\mathbb{R}$. That is what “removable” means.' },
            { text: 'Remove $0$ from the domain.', why: 'That avoids the question; the discontinuity is removable precisely because we can **define** $f(0)$ correctly.' },
            { text: 'It can’t be repaired.', why: 'Removable discontinuities are exactly the repairable ones.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Model answer · 6 marks',
          title: 'Write this',
          body: '**For $x \\neq 0$:** $f(x) = \\frac{\\sin 2x}{x}$ is a quotient of continuous functions with non-zero denominator, so $f$ is continuous at every $x \\neq 0$.\n\n**At $x = 0$:** $f(0) = 1$ is defined, and\n$$\\lim_{x\\to 0} f(x) = \\lim_{x\\to 0}\\frac{\\sin 2x}{x} = \\lim_{x\\to 0} 2\\cdot\\frac{\\sin 2x}{2x} = 2\\lim_{u\\to 0}\\frac{\\sin u}{u} = 2 \\cdot 1 = 2,$$\nwhere $u = 2x$. So the limit exists, but $\\lim_{x\\to0}f(x) = 2 \\neq 1 = f(0)$. Hence $f$ is **discontinuous at $x = 0$** and continuous everywhere else.\n\n**Classification:** since the limit at $0$ exists (and is finite) but is not equal to $f(0)$, the discontinuity is **removable**. Redefining $f(0) = 2$ makes $f$ continuous on $\\mathbb{R}$.',
        },
        {
          type: 'finish',
          title: 'Question 4: done.',
          body: 'You’ve now worked through every part of Questions 1 and 4. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
