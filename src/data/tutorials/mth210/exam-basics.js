// MTH 210 · Vector Basics · Exam practice: worked exam-style questions on chapter 1.
export default {
  id: 'exam-basics',
  title: 'Exam practice: vector basics',
  covers: 'Exam-style questions: the vector between two points, magnitude, unit vectors, direction cosines and angles, the resultant, equal vectors',
  minutes: 12,
  sections: [
    {
      name: 'Exam questions',
      terms: [
        ['Unit vector along AB', '$\\dfrac{\\vec{AB}}{\\|\\vec{AB}\\|}$ with $\\vec{AB} = B - A$.'],
        ['Resultant', 'The sum of the vectors: $\\vec R = \\vec a + \\vec b$.'],
        ['Missing angle', 'From $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'Given $A(1, -2, 3)$ and $B(4, 2, -9)$, find $\\vec{AB}$, $\\|\\vec{AB}\\|$ and the unit vector in the direction of $\\vec{AB}$.',
          body: '**Step 1 · Terminal minus initial.** $\\vec{AB} = (4 - 1)\\vec i + (2 + 2)\\vec j + (-9 - 3)\\vec k = 3\\vec i + 4\\vec j - 12\\vec k$.\n\n**Step 2 · Magnitude.** $\\|\\vec{AB}\\| = \\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$.\n\n**Step 3 · Divide.** $\\hat u = \\dfrac{1}{13}(3\\vec i + 4\\vec j - 12\\vec k) = \\dfrac{3}{13}\\vec i + \\dfrac{4}{13}\\vec j - \\dfrac{12}{13}\\vec k$.',
          asides: [{ label: 'Exam tip', text: 'Check your unit vector: $\\frac{9 + 16 + 144}{169} = 1$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Find the unit vector in the direction of $\\vec{PQ}$ for $P(2, 1, -1)$ and $Q(4, -1, 0)$.',
          options: [
            { text: '$\\frac13(2\\vec i - 2\\vec j + \\vec k)$', correct: true, why: '$\\vec{PQ} = (2, -2, 1)$, length $\\sqrt{9} = 3$.' },
            { text: '$\\frac13(-2\\vec i + 2\\vec j - \\vec k)$', why: 'That points from $Q$ to $P$.' },
            { text: '$\\frac17(6\\vec i + 0\\vec j - \\vec k)$', why: 'Subtract the points, do not add them.' },
            { text: '$2\\vec i - 2\\vec j + \\vec k$', why: 'Divide by the length $3$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'Find the direction cosines and direction angles of $\\vec a = 3\\vec i - 6\\vec j + 2\\vec k$.',
          body: '**Step 1.** $\\|\\vec a\\| = \\sqrt{9 + 36 + 4} = \\sqrt{49} = 7$.\n\n**Step 2 · Cosines.** $(l, m, n) = \\left(\\frac37, -\\frac67, \\frac27\\right)$. Check: $\\frac{9 + 36 + 4}{49} = 1$.\n\n**Step 3 · Angles.**\n$\\alpha = \\cos^{-1}\\frac37 \\approx 64.62°$, $\\beta = \\cos^{-1}\\left(-\\frac67\\right) \\approx 149.00°$, $\\gamma = \\cos^{-1}\\frac27 \\approx 73.40°$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Find the unit vector parallel to the resultant of $\\vec a = 2\\vec i + 4\\vec j - 5\\vec k$ and $\\vec b = \\vec i + 2\\vec j + 3\\vec k$.',
          body: '**Step 1 · Resultant.** $\\vec R = \\vec a + \\vec b = 3\\vec i + 6\\vec j - 2\\vec k$.\n\n**Step 2.** $\\|\\vec R\\| = \\sqrt{9 + 36 + 4} = 7$.\n\n**Step 3.** $\\hat R = \\dfrac17(3\\vec i + 6\\vec j - 2\\vec k)$.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'A vector makes $45°$ with the $x$-axis and $60°$ with the $y$-axis. Find its angle with the $z$-axis.',
          options: [
            { text: '$60°$ or $120°$', correct: true, why: '$\\cos^2\\gamma = 1 - \\frac12 - \\frac14 = \\frac14$, so $\\cos\\gamma = \\pm\\frac12$.' },
            { text: '$75°$', why: 'The angles do not add to $180°$; their **cosines squared** add to $1$.' },
            { text: '$30°$', why: '$\\cos^2 30° = \\frac34$, too big: the total would pass $1$.' },
            { text: 'It cannot be found', why: 'Use $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Are $(2, 3, 4)$ and $(2, 3, -4)$ equal vectors? Are $(2, 3, 4)$ and $(-2, 3, 4)$?',
          body: 'All three have the **same magnitude**, $\\sqrt{4 + 9 + 16} = \\sqrt{29}$.\n\nBut equal vectors need **every component equal**. The $z$-components of the first pair differ ($4$ and $-4$), and the $x$-components of the second pair differ ($2$ and $-2$).\n\n**Neither pair is equal.** Equal magnitude alone is not enough.',
        },
        {
          type: 'multi',
          eyebrow: 'Quick check',
          prompt: 'Which are true for $\\vec a = 4\\vec i - 4\\vec j + 2\\vec k$?',
          options: [
            { text: '$\\|\\vec a\\| = 6$', correct: true, why: '$\\sqrt{16 + 16 + 4} = 6$.' },
            { text: 'Its direction cosines are $\\frac23, -\\frac23, \\frac13$.', correct: true, why: 'Divide each component by $6$.' },
            { text: 'It makes an acute angle with the $y$-axis.', why: '$m = -\\frac23 < 0$: the angle is **obtuse**.' },
            { text: '$-\\vec a$ has magnitude $-6$.', why: 'Magnitudes are never negative: $|-\\vec a| = 6$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 1 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
