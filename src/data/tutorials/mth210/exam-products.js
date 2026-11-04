// MTH 210 · Products · Exam practice: worked exam-style questions on chapter 2, including the
// tetrahedron question from a first test.
export default {
  id: 'exam-products',
  title: 'Exam practice: products',
  covers: 'Exam-style questions: angles, projections, work, triangle area, moments, tetrahedron volume with an unknown, coplanar vectors',
  minutes: 16,
  sections: [
    {
      name: 'Dot and cross product questions',
      terms: [
        ['Triangle area', '$\\frac12\\|\\vec{PQ} \\times \\vec{PR}\\|$ for a triangle $PQR$.'],
        ['Work with several forces', '$W = (\\vec F_1 + \\vec F_2 + \\cdots) \\cdot \\vec d$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1',
          title: 'Find the angle between $\\vec a = \\vec i + 2\\vec j - \\vec k$ and $\\vec b = 2\\vec i - \\vec j + 3\\vec k$.',
          body: '**Step 1.** $\\vec a \\cdot \\vec b = 2 - 2 - 3 = -3$.\n\n**Step 2.** $\\|\\vec a\\| = \\sqrt{1 + 4 + 1} = \\sqrt6$, $\\|\\vec b\\| = \\sqrt{4 + 1 + 9} = \\sqrt{14}$.\n\n**Step 3.** $\\cos\\theta = \\dfrac{-3}{\\sqrt6\\sqrt{14}} = \\dfrac{-3}{\\sqrt{84}} \\approx -0.3273$, so $\\theta \\approx 109.11°$.\n\nThe negative cosine gives an **obtuse** angle. Do not drop the sign.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2',
          title: 'Find the area of the triangle with vertices $P(1, -1, 0)$, $Q(2, 1, -1)$, $R(-1, 1, 2)$.',
          body: '**Step 1 · Two sides from $P$.** $\\vec{PQ} = (1, 2, -1)$, $\\vec{PR} = (-2, 2, 2)$.\n\n**Step 2 · Cross.**\n$$\\vec{PQ} \\times \\vec{PR} = \\begin{vmatrix}\\vec i & \\vec j & \\vec k \\\\ 1 & 2 & -1 \\\\ -2 & 2 & 2\\end{vmatrix} = \\vec i(4 + 2) - \\vec j(2 - 2) + \\vec k(2 + 4) = (6, 0, 6).$$\n**Step 3 · Half the length.** Area $= \\frac12\\sqrt{36 + 36} = \\frac12 \\cdot 6\\sqrt2 = 3\\sqrt2 \\approx 4.24$ square units.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Find the area of the triangle with vertices $O(0, 0, 0)$, $A(2, 0, 0)$, $B(0, 3, 0)$.',
          options: [
            { text: '$3$', correct: true, why: '$\\vec{OA} \\times \\vec{OB} = (0, 0, 6)$; half its length is $3$.' },
            { text: '$6$', why: 'That is the parallelogram. A triangle is half.' },
            { text: '$\\frac{\\sqrt{13}}{2}$', why: 'That is half the length of $\\vec{AB}$, a side, not an area.' },
            { text: '$1$', why: 'Use $\\frac12\\|\\vec{OA} \\times \\vec{OB}\\|$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Find the scalar and vector projections of $\\vec b = 2\\vec i + 2\\vec j + \\vec k$ onto $\\vec a = 4\\vec i - \\vec j + 2\\vec k$.',
          body: '$\\vec b \\cdot \\vec a = 8 - 2 + 2 = 8$ and $\\|\\vec a\\|^2 = 16 + 1 + 4 = 21$.\n$$\\operatorname{comp}_{\\vec a}\\vec b = \\frac{8}{\\sqrt{21}} \\approx 1.746, \\qquad \\operatorname{proj}_{\\vec a}\\vec b = \\frac{8}{21}(4, -1, 2) = \\left(\\tfrac{32}{21}, -\\tfrac{8}{21}, \\tfrac{16}{21}\\right).$$',
        },
        {
          type: 'choice',
          eyebrow: 'Twist',
          prompt: '$\\vec F = 8\\vec i - 4\\vec j + 2\\vec k$ N moves a particle through $\\vec d = 3\\vec i + \\vec j - 2\\vec k$ m. The force is halved and the displacement doubled. The new work is',
          options: [
            { text: '$16$ J, unchanged', correct: true, why: 'Original $W = 24 - 4 - 4 = 16$ J, and $\\left(\\frac12\\vec F\\right) \\cdot (2\\vec d) = \\vec F \\cdot \\vec d$.' },
            { text: '$32$ J', why: 'The $\\frac12$ and the $2$ cancel.' },
            { text: '$8$ J', why: 'Doubling the displacement doubles the work back.' },
            { text: '$64$ J', why: 'Halving the force halves the work.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Dot and cross: practised.',
          recap: ['Keep the sign of a negative cosine.', 'Triangle = half the cross product length.'],
          why: 'Now the three-vector questions.',
        },
      ],
    },
    {
      name: 'Triple product questions',
      terms: [
        ['Volume from vertices', 'Take three edges from one vertex, then $V = \\frac16|\\det|$.'],
        ['Coplanar value', 'Set the determinant to $0$ and solve for the unknown.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 4 · from a first test',
          title: 'Find the volume of the tetrahedron with vertices $A = 2\\vec i - \\vec j$, $B = 3\\vec i + 4\\vec j + p\\vec k$, $C = 5\\vec i + 7\\vec j + 2\\vec k$, $D = 2(\\vec i + \\vec j + \\vec k)$.',
          body: '**Step 1 · Edges from $A$.** $A = (2, -1, 0)$, $D = (2, 2, 2)$:\n$$\\vec{AB} = (1, 5, p),\\quad \\vec{AC} = (3, 8, 2),\\quad \\vec{AD} = (0, 3, 2).$$\n**Step 2 · Determinant.**\n$$\\begin{vmatrix}1 & 5 & p \\\\ 3 & 8 & 2 \\\\ 0 & 3 & 2\\end{vmatrix} = 1(16 - 6) - 5(6 - 0) + p(9 - 0) = 9p - 20.$$\n**Step 3 · Volume.**\n$$V = \\frac16|9p - 20| \\text{ cubic units}.$$\nThe points are coplanar when $p = \\frac{20}{9}$.',
          asides: [{ label: 'Exam tip', text: 'Write $D = 2(\\vec i + \\vec j + \\vec k)$ out as $(2, 2, 2)$ before subtracting. Keep the absolute value: a volume is never negative.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'For which $\\lambda$ are $\\vec a = (2, -1, 1)$, $\\vec b = (1, 2, -3)$, $\\vec c = (3, \\lambda, 5)$ coplanar?',
          options: [
            { text: '$\\lambda = -4$', correct: true, why: 'The determinant is $2(10 + 3\\lambda) + (5 + 9) + (\\lambda - 6) = 7\\lambda + 28 = 0$.' },
            { text: '$\\lambda = 4$', why: 'Solve $7\\lambda + 28 = 0$: $\\lambda = -4$.' },
            { text: '$\\lambda = 0$', why: 'At $\\lambda = 0$ the determinant is $28$.' },
            { text: 'No value', why: 'The determinant is linear in $\\lambda$, so one value makes it $0$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 5',
          title: 'Show that the tetrahedron with edges $\\vec A = (2, 1, -1)$, $\\vec B = (1, 3, 2)$, $\\vec C = (3, -1, 1)$ has half the volume of the one with edges $\\vec A + \\vec B$, $\\vec B + \\vec C$, $\\vec C + \\vec A$.',
          body: '$$V_1 = \\frac16\\begin{vmatrix}2 & 1 & -1 \\\\ 1 & 3 & 2 \\\\ 3 & -1 & 1\\end{vmatrix} = \\frac16(10 + 5 + 10) = \\frac{25}{6}.$$\n$\\vec A + \\vec B = (3, 4, 1)$, $\\vec B + \\vec C = (4, 2, 3)$, $\\vec C + \\vec A = (5, 0, 0)$:\n$$V_2 = \\frac16\\begin{vmatrix}3 & 4 & 1 \\\\ 4 & 2 & 3 \\\\ 5 & 0 & 0\\end{vmatrix} = \\frac16(60 - 10) = \\frac{50}{6}.$$\nSo $V_1 : V_2 = 1 : 2$. In general $(\\vec A + \\vec B) \\cdot [(\\vec B + \\vec C) \\times (\\vec C + \\vec A)] = 2\\,\\vec A \\cdot (\\vec B \\times \\vec C)$.',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 6',
          title: 'A force along $A(1, -2, 4)$ to $B(5, 2, 3)$. Find its moment about $P(-2, 3, 5)$.',
          body: '$\\vec F = \\vec{AB} = (4, 4, -1)$, $\\vec r = \\vec{PA} = (3, -5, -1)$.\n$$\\vec M_P = \\vec r \\times \\vec F = \\vec i(5 + 4) - \\vec j(-3 + 4) + \\vec k(12 + 20) = 9\\vec i - \\vec j + 32\\vec k.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'A force of $6$ N acts along $\\vec d = \\vec i + 2\\vec j + 2\\vec k$ at $A(1, 0, 0)$. The force vector is',
          options: [
            { text: '$2\\vec i + 4\\vec j + 4\\vec k$', correct: true, why: '$\\vec F = 6\\dfrac{\\vec d}{\\|\\vec d\\|} = 6 \\cdot \\frac13(1, 2, 2)$.' },
            { text: '$6\\vec i + 12\\vec j + 12\\vec k$', why: 'That has size $18$. Use the unit vector along $\\vec d$.' },
            { text: '$\\vec i + 2\\vec j + 2\\vec k$', why: 'That has size $3$, not $6$.' },
            { text: '$6\\vec i$', why: 'The force acts along $\\vec d$, not along $\\vec{OA}$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 2 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
