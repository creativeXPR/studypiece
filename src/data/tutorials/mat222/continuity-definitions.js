// MAT 222 · Reused as part of a larger lesson (see index.js): continuity at a point vs uniform continuity on an interval (2 + 2 marks).

export default {
  id: 'continuity-definitions',
  title: 'Continuous vs uniformly continuous',
  covers: 'the two definitions, and why the order of “for all x₀” and “there exists δ” matters',
  minutes: 15,
  sections: [
    {
      name: 'At a point',
      terms: [
        ['Continuous at $x_0 \\in I$', '$\\forall \\varepsilon > 0\\ \\exists \\delta > 0$ such that $x \\in I,\\ |x - x_0| < \\delta \\implies |f(x) - f(x_0)| < \\varepsilon$. Here δ may depend on ε **and** $x_0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Continuity · 4 marks',
          title: 'Two definitions that look almost the same',
          body: '“Let $f$ be a function defined on an interval $I$. When is $f$ said to be (i) continuous at a point $x_0 \\in I$? (ii) uniformly continuous on $I$?”\n\nThe two definitions use the same symbols. The whole difference is **where δ is chosen**: before or after the point. Get that right and you have both marks for (ii).',
          cta: 'Start with (i)',
        },
        {
          type: 'story',
          eyebrow: '(i) Continuous at a point · 2 marks',
          title: 'The limit equals the value',
          body: '$f$ is **continuous at $x_0 \\in I$** if for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that\n$$|f(x) - f(x_0)| < \\varepsilon \\quad \\text{whenever } x \\in I \\text{ and } |x - x_0| < \\delta.$$\n\nEquivalently: $\\lim_{x\\to x_0} f(x) = f(x_0)$.\n\nThe point $x_0$ is **fixed first**. Then ε is given. Then δ is found, so δ may depend on **both** ε and $x_0$.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'In the definition of continuity at $x_0$, δ is allowed to depend on…',
          options: [
            { text: 'ε only', why: 'The point $x_0$ is already fixed, so δ may use it too.' },
            { text: 'ε and $x_0$', correct: true, why: 'Both are known before δ is chosen. That freedom is exactly what uniform continuity takes away.' },
            { text: 'ε, $x_0$ and $x$', why: 'Never $x$: δ is chosen before we look at any particular $x$.' },
            { text: 'Nothing; δ is a fixed number', why: 'Then it couldn’t shrink as ε shrinks.' },
          ],
        },
        {
          type: 'bridge',
          title: '(i): stated.',
          recap: [
            '$\\forall \\varepsilon\\ \\exists \\delta$: $|x - x_0| < \\delta \\implies |f(x) - f(x_0)| < \\varepsilon$.',
            'δ may depend on ε and on the point $x_0$.',
          ],
          why: 'Now (ii): what if one δ has to serve every point at once?',
        },
      ],
    },
    {
      name: 'Uniformly',
      terms: [
        ['Uniformly continuous on $I$', '$\\forall \\varepsilon > 0\\ \\exists \\delta > 0$ such that $x, y \\in I,\\ |x - y| < \\delta \\implies |f(x) - f(y)| < \\varepsilon$. Here δ depends on ε **only**.'],
        ['Heine–Cantor theorem', 'A function continuous on a closed, bounded interval $[a, b]$ is uniformly continuous there.'],
      ],
      screens: [
        {
          type: 'story',
          asides: [
            { label: 'Note', text: 'Be careful: uniform continuity depends on the domain. $\\frac1x$ is uniformly continuous on $[1, 2]$, but not on $(0, 1]$.' },
          ],
          eyebrow: '(ii) Uniformly continuous · 2 marks',
          title: 'One δ for the whole interval',
          body: '$f$ is **uniformly continuous on $I$** if for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that\n$$|f(x) - f(y)| < \\varepsilon \\quad \\text{whenever } x, y \\in I \\text{ and } |x - y| < \\delta.$$\n\nNow δ is chosen **before** the points $x, y$. So it can depend on ε only, and must work everywhere in $I$ at once.',
        },
        {
          type: 'sort',
          eyebrow: 'Spot the difference',
          prompt: 'Which definition does each statement describe?',
          buckets: [
            { id: 'c', label: 'Continuous at every point' },
            { id: 'u', label: 'Uniformly continuous' },
          ],
          items: [
            { text: '$\\forall x_0 \\in I\\ \\forall \\varepsilon > 0\\ \\exists \\delta > 0\\ \\forall x$ …', bucket: 'c', why: '**δ comes after $x_0$**, so it may change from point to point.' },
            { text: '$\\forall \\varepsilon > 0\\ \\exists \\delta > 0\\ \\forall x, y \\in I$ …', bucket: 'u', why: '**δ comes before the points**, so one δ serves them all.' },
            { text: 'δ may depend on ε and the point', bucket: 'c', why: '**Pointwise**: each point may need its own δ.' },
            { text: 'δ depends on ε alone', bucket: 'u', why: '**Uniform**: the same δ everywhere.' },
            { text: 'A property of $f$ at a single point', bucket: 'c', why: '**Continuity is local**: it is defined point by point.' },
            { text: 'A property of $f$ on a whole set', bucket: 'u', why: '**Uniform continuity is global**: it makes no sense at a single point.' },
          ],
          explain: 'Same symbols, different order. Moving “there exists δ” in front of the points is what makes it uniform.',
        },
        {
          type: 'custom',
          widget: 'uniformDelta',
          eyebrow: 'See the difference',
          title: 'How big can δ be?',
          body: 'Both functions are continuous on $(0, 1]$. Fix $\\varepsilon = 0.5$ and slide the point $x_0$. The bars show the **largest δ that works** at that point.',
        },
        {
          type: 'story',
          eyebrow: 'What you just saw',
          title: '$\\frac{1}{x}$ is continuous on $(0, 1]$, but not uniformly',
          body: 'For $f(x) = \\frac1x$ the largest workable δ at $x_0$ is $\\frac{\\varepsilon x_0^2}{1 + \\varepsilon x_0}$, which **shrinks to 0** as $x_0 \\to 0$. Any single δ you pick fails at points close enough to $0$.\n\nFor $g(x) = 3x$, $|g(x) - g(y)| = 3|x - y|$, so $\\delta = \\frac{\\varepsilon}{3}$ works **everywhere**. That inequality is a Lipschitz condition, the subject of the next lesson.',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Uniformly continuous on $I$ ⟹ continuous at every point of $I$.', correct: true, why: '**Uniform ⟹ continuous**: take $y = x_0$ in the uniform definition.' },
            { text: 'Continuous at every point of $I$ ⟹ uniformly continuous on $I$.', why: '**False in general**: $\\frac1x$ on $(0, 1]$ is a counterexample.' },
            { text: 'Continuous on a closed bounded interval $[a, b]$ ⟹ uniformly continuous there.', correct: true, why: '**Heine–Cantor theorem.** The trouble with $\\frac1x$ came from the open end at 0.' },
            { text: '$x^2$ is uniformly continuous on all of $\\mathbb{R}$.', why: '**False**: $|x^2 - y^2| = |x + y|\\,|x - y|$, and $|x + y|$ is unbounded, so no single δ works.' },
          ],
        },
        {
          type: 'bridge',
          title: '(ii): stated.',
          recap: [
            'Uniform: $\\forall \\varepsilon\\ \\exists \\delta\\ \\forall x, y \\in I$: $|x - y| < \\delta \\implies |f(x) - f(y)| < \\varepsilon$.',
            'Uniform ⟹ continuous, not conversely (e.g. $\\frac1x$ on $(0, 1]$).',
          ],
          why: 'Here is the answer, ready to write.',
        },
      ],
    },
    {
      name: 'Exam answer',
      screens: [
        {
          type: 'story',
          asides: [
            { label: 'Exam tip', text: 'Often examined: define continuity at a point and uniform continuity side by side.' },
          ],
          eyebrow: 'Model answer · 4 marks',
          title: 'Write this',
          body: '**(i)** $f$ is continuous at $x_0 \\in I$ if for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $|f(x) - f(x_0)| < \\varepsilon$ for all $x \\in I$ with $|x - x_0| < \\delta$. (Equivalently, $\\lim_{x\\to x_0}f(x) = f(x_0)$.)\n\n**(ii)** $f$ is uniformly continuous on $I$ if for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $|f(x) - f(y)| < \\varepsilon$ for all $x, y \\in I$ with $|x - y| < \\delta$.\n\nIn (i), δ may depend on ε and $x_0$; in (ii), δ depends on ε alone and works for every pair of points in $I$.',
          note: 'The last sentence isn’t strictly required, but it shows the examiner you understand the difference.',
        },
        {
          type: 'finish',
          title: 'You can tell them apart.',
          body: 'Key terms from this lesson, ready for revision.',
        },
      ],
    },
  ],
};
