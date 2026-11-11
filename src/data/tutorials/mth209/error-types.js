// MTH 209 · Idea A, lesson 1: types and classification of error. Part 1 builds absolute, relative
// and percentage error and the three sources (blunder, round-off, truncation) on simple numbers;
// Part 2 applies them to exam-style definitions, rounding against chopping, and a final check.

export default {
  id: 'error-types',
  title: 'How wrong is an answer?',
  covers: 'Absolute, relative and percentage error; blunders, round-off and truncation; rounding to d decimal places',
  minutes: 12,
  sections: [
    {
      name: 'Understand',
      terms: [
        ['Absolute error', '$|X - x|$: how far the approximation $x$ is from the true value $X$.'],
        ['Relative error', '$\\dfrac{|X - x|}{|X|}$: the absolute error compared with the size of the true value. Times $100$ gives the percentage error.'],
        ['Blunder (gross error)', 'A human mistake, such as copying $0.5791$ as $0.5971$.'],
        ['Round-off error', 'Error from keeping only a limited number of digits, as in $\\tfrac23 \\approx 0.667$.'],
        ['Truncation error', 'Error from cutting an infinite process short, such as stopping a series after a few terms.'],
      ],
      steps: [
        'Name the true value $X$ and the approximation $x$.',
        'Absolute error: $|X - x|$.',
        'Relative error: $|X - x| \\div |X|$. Percentage error: relative error $\\times 100$.',
        'Classify the source: blunder (a human slip), round-off (digits kept), or truncation (a process cut short).',
        '“Correct to $d$ decimal places” means $|X - x| \\le \\tfrac12 \\times 10^{-d}$.',
      ],
      examples: [
        {
          title: '$\\tfrac23 \\approx 0.667$',
          question: 'Find the absolute, relative and percentage error when $\\tfrac23$ is written as $0.667$.',
          steps: ['$X = \\tfrac23 = 0.666666\\ldots$, $x = 0.667$.', 'Absolute error $= |0.666666\\ldots - 0.667| = 0.000333$.', 'Relative error $= 0.000333 \\div 0.666666 = 0.0005$.', 'Percentage error $= 0.05\\%$.'],
          answer: 'Absolute $0.000333$, relative $0.0005$, percentage $0.05\\%$. A round-off error.',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Idea A · Lesson 1',
          title: 'Every method gives an approximation',
          body: 'Every method in this course gives an **approximate** answer. So before any method, we need a way to say **how wrong** an answer is.\n\nThat is this lesson: measuring error, and naming where it comes from. Everything after it (series, root finding, iteration) reports its accuracy in exactly these terms.',
        },
        {
          type: 'story',
          eyebrow: 'The idea',
          title: 'How far off, and compared with what?',
          body: 'Being $1$ cm off when measuring a $10$ cm pencil is bad. Being $1$ cm off on a $100$ m road is excellent.\n\nThe same miss of $1$ cm is the **absolute error**. Comparing it with the size of the thing measured gives the **relative error**: $\\tfrac{1}{10} = 10\\%$ for the pencil, $\\tfrac{1}{10\\,000} = 0.01\\%$ for the road. Relative error is what tells you whether an answer is good.',
        },
        {
          type: 'story',
          eyebrow: 'The steps',
          title: 'Measuring any error',
          body: '1. Name the true value $X$ and the approximation $x$.\n2. **Absolute error** $= |X - x|$.\n3. **Relative error** $= \\dfrac{|X - x|}{|X|}$, and **percentage error** $=$ relative $\\times 100$.\n4. **Classify the source:** a blunder (a human slip), round-off (only some digits kept), or truncation (an endless process cut short).\n\nThese steps are saved under **Steps** in your notes.',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: '$\\tfrac23$ written as $0.667$',
          body: '**Step 1.** $X = \\tfrac23 = 0.666666\\ldots$ and $x = 0.667$.\n\n**Step 2.** Absolute error $= |0.666666\\ldots - 0.667| = 0.000333$.\n\n**Step 3.** Relative error $= 0.000333 \\div 0.666666 = 0.0005$, which is $0.05\\%$.\n\n**Step 4.** Only three digits were kept, so this is a **round-off** error.',
          asides: [{ label: 'Exam tip', text: 'Write $\\tfrac23 \\approx 0.667$, never $\\tfrac23 = 0.667$. The “$\\approx$” is part of a correct answer.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: '$\\tfrac18$ written as $0.13$',
          graph: {
            steps: [
              { ask: 'Absolute error, $|0.125 - 0.13|$?', answer: 0.005, tol: 0.0001, hint: 'Subtract and drop the sign.' },
              { ask: 'Relative error, absolute error $\\div 0.125$?', answer: 0.04, tol: 0.0005, hint: '$0.005 \\div 0.125$.' },
              { ask: 'Percentage error?', answer: 4, tol: 0.05, hint: 'Relative error $\\times 100$.' },
            ],
            after: 'Absolute $0.005$, relative $0.04$, percentage $4\\%$. Small in absolute terms, but large compared with $0.125$.',
          },
        },
        {
          type: 'sort',
          eyebrow: 'Classify',
          prompt: 'Where does each error come from?',
          buckets: [
            { id: 'b', label: 'Blunder' },
            { id: 'r', label: 'Round-off' },
            { id: 't', label: 'Truncation' },
          ],
          items: [
            { text: 'Copying $0.5791$ as $0.5971$', bucket: 'b', why: 'A human slip: digits swapped.' },
            { text: 'Storing $\\tfrac13$ as $0.333$', bucket: 'r', why: 'Only three digits kept.' },
            { text: 'Using $1 + x + \\tfrac{x^2}{2}$ for $e^x$', bucket: 't', why: 'An infinite series cut after three terms.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'What can be asked',
          title: 'The kinds of question',
          body: '• **Define:** absolute error, relative error, and what “rounded to $d$ decimal places” means.\n• **Outline:** the types of error common in calculations, with an example of each.\n• **Compute:** the absolute, relative or percentage error of a given approximation.\n• **Compare:** rounding against chopping, and which one is “correct to $d$ dp”.\n\nPart 2 does each on exam-sized numbers.',
        },
      ],
    },
    {
      name: 'Apply',
      steps: [
        'Definitions: write each one with symbols. For example, “absolute error $|X - x|$, where $X$ is the true value and $x$ the approximation”.',
        'Outlining types: name all three (blunder, round-off, truncation) and give one example of each.',
        'Rounding to $d$ dp: if the first dropped digit is $5$ or more, add $1$ to the last kept digit. Chopping just drops the digits.',
        'Rounded values satisfy $|X - x| \\le \\tfrac12 \\times 10^{-d}$; chopped values only satisfy $|X - x| < 10^{-d}$.',
        'Common mistakes: dividing by the approximation instead of the true value; calling chopped digits a truncation error (they are round-off).',
      ],
      examples: [
        {
          title: '$\\pi \\approx \\tfrac{22}{7}$',
          question: 'Find the absolute and relative error of $\\tfrac{22}{7}$ as an approximation to $\\pi = 3.14159265$.',
          steps: ['$x = \\tfrac{22}{7} = 3.14285714$.', 'Absolute error $= |3.14159265 - 3.14285714| = 0.00126449$.', 'Relative error $= 0.00126449 \\div 3.14159265 = 0.000402$, about $0.04\\%$.'],
          answer: 'Absolute $0.00126$, relative $0.000402$ ($0.04\\%$).',
        },
        {
          title: '$e$ to 4 dp: rounding against chopping',
          question: 'Write $e = 2.718281828$ to 4 dp by rounding and by chopping. Find each absolute error. Which is correct to 4 dp?',
          steps: ['Rounding: the fifth digit is $8 \\ge 5$, so $2.7183$. Error $= 0.0000182$.', 'Chopping: drop the digits, giving $2.7182$. Error $= 0.0000818$.', 'Correct to 4 dp needs error $\\le \\tfrac12 \\times 10^{-4} = 0.00005$.', 'Only the rounded value passes.'],
          answer: 'Rounded $2.7183$ (correct to 4 dp); chopped $2.7182$ (not).',
        },
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question',
          title: 'Define, then show it working',
          body: 'A typical question: “Let $X$ be the true value of a number and $x$ its approximation. Define (i) the absolute error, (ii) the relative error, (iii) what it means to say $X$ has been rounded to $d$ decimal places.”\n\n**What the examiner wants:** each definition with symbols, $|X - x|$ and $\\dfrac{|X - x|}{|X|}$, and for (iii) the bound $|X - x| \\le \\tfrac12 \\times 10^{-d}$. A short numerical example earns full marks.',
          asides: [{ label: 'Exam tip', text: 'For “outline the types of error”, name all three (blunder, round-off, truncation) and give one example of each.' }],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Guided',
          title: '$e = 2.718281828$ to 4 dp',
          graph: {
            steps: [
              { ask: 'Round $e$ to 4 dp.', answer: 2.7183, tol: 0.00001, hint: 'The fifth decimal is $8$, so round the fourth up.' },
              { ask: 'Absolute error of the rounded value, $|2.718281828 - 2.7183|$?', answer: 0.0000182, tol: 0.000001, hint: 'Subtract carefully: it is about $1.8 \\times 10^{-5}$.' },
              { ask: 'Chopped to 4 dp, $e$ becomes…?', answer: 2.7182, tol: 0.00001, hint: 'Just drop the digits after the fourth.' },
              { ask: 'Which value is correct to 4 dp (error $\\le 0.00005$)?', options: ['The rounded $2.7183$', 'The chopped $2.7182$', 'Both'], answer: 0, hint: 'The chopped error is $0.0000818$.' },
            ],
            after: 'Rounding keeps the error within half a unit of the last digit; chopping can be off by almost a whole unit.',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Spot the mistake',
          prompt: 'A student writes: “$\\pi \\approx 3.14$ has a **truncation** error, because digits were cut off.” What is wrong?',
          options: [
            { text: 'Dropping digits is round-off; truncation means cutting an infinite process short', correct: true, why: 'Truncation is about a process (a series, an iteration). Keeping fewer digits is round-off.' },
            { text: 'Nothing; cutting digits is truncation', why: 'That is the common mix-up. It is round-off.' },
            { text: 'It is a blunder', why: 'No mistake was made; the digits were dropped on purpose.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Final question',
          title: '$\\sqrt3 = 1.7320508$ written as $1.73$',
          graph: {
            steps: [
              { ask: 'Absolute error?', answer: 0.0020508, tol: 0.000002, hint: '$1.7320508 - 1.73$.' },
              { ask: 'Relative error (to 4 significant figures)?', answer: 0.001184, tol: 0.000002, hint: 'Divide by $1.7320508$.' },
              { ask: 'Is $1.73$ correct to 2 dp?', options: ['Yes, $0.00205 \\le 0.005$', 'No, the error is too big'], answer: 0, hint: 'Compare with $\\tfrac12 \\times 10^{-2} = 0.005$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'You can measure how wrong an answer is.',
          body: '**Summary:** absolute error $|X - x|$; relative error $|X - x|/|X|$; three sources (blunder, round-off, truncation); and “correct to $d$ dp” means within $\\tfrac12 \\times 10^{-d}$.\n\n**Next:** what happens to these errors when approximate numbers are **added, multiplied or divided**. That is error propagation, and it uses everything here.',
        },
      ],
    },
  ],
};
