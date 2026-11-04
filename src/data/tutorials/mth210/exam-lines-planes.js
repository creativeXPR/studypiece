// MTH 210 · Lines and Planes · Exam practice, including question 2 of a first test.
export default {
  id: 'exam-lines-planes',
  title: 'Exam practice: lines and planes',
  covers: 'Exam-style questions: line meets plane and the angle, plane through three points in parametric form, skew lines, angles between planes, line of intersection',
  minutes: 16,
  sections: [
    {
      name: 'From a first test',
      terms: [
        ['Line meets plane', 'Parametric line → substitute → solve for $t$ → put $t$ back.'],
        ['Plane through A, B, C', '$\\vec r = \\vec a + s\\,\\vec{AB} + t\\,\\vec{AC}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 1 · from a first test',
          title: 'For the line $\\frac{x + 1}{2} = \\frac{y - 3}{-1} = \\frac z4$ and the plane $2x - y + 4z - 7 = 0$: (i) find their point of intersection; (ii) hence find the acute angle between them.',
          body: '**(i) Step 1 · Parametric.** $x = -1 + 2t$, $y = 3 - t$, $z = 4t$.\n\n**Step 2 · Substitute.** $2(-1 + 2t) - (3 - t) + 4(4t) - 7 = 0 \\Rightarrow -12 + 21t = 0 \\Rightarrow t = \\frac47$.\n\n**Step 3 · Put back.** $x = -1 + \\frac87 = \\frac17$, $y = 3 - \\frac47 = \\frac{17}{7}$, $z = \\frac{16}{7}$:\n$$\\left(\\tfrac17, \\tfrac{17}{7}, \\tfrac{16}{7}\\right).$$\nCheck: $\\frac{2 - 17 + 64 - 49}{7} = 0$ ✓.\n\n**(ii)** $\\vec d = (2, -1, 4)$ and $\\vec n = (2, -1, 4)$: the **same vector**.\n$$\\sin\\theta = \\frac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\|\\vec n\\|} = \\frac{21}{21} = 1 \\Rightarrow \\theta = 90°.$$\nThe line is **perpendicular** to the plane.',
          asides: [{ label: 'Exam tip', text: 'Spot it early: when the direction equals the normal (or a multiple), the angle is $90°$ with no calculation.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Where does $\\frac{x - 2}{1} = \\frac{y + 1}{2} = \\frac{z - 3}{-1}$ meet $x + 2y - z + 5 = 0$?',
          options: [
            { text: '$\\left(\\frac53, -\\frac53, \\frac{10}{3}\\right)$', correct: true, why: '$(2 + t) + 2(-1 + 2t) - (3 - t) + 5 = 2 + 6t = 0$, so $t = -\\frac13$.' },
            { text: '$\\left(\\frac73, -\\frac13, \\frac83\\right)$', why: 'That uses $t = +\\frac13$. Solve $2 + 6t = 0$.' },
            { text: '$(2, -1, 3)$', why: 'That is the line’s point at $t = 0$: check it in the plane: $2 - 2 - 3 + 5 = 2 \\ne 0$.' },
            { text: 'They do not meet', why: '$\\vec d \\cdot \\vec n = 1 + 4 + 1 = 6 \\ne 0$, so they meet.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 2 · from a first test',
          title: 'Find the vector equation of the plane through $A(1, 1, 2)$, $B(2, -5, 3)$ and $C(2, 1, 3)$ in vector parametric form.',
          body: '**Step 1 · Two edges from $A$.** $\\vec{AB} = (1, -6, 1)$, $\\vec{AC} = (1, 0, 1)$.\n\n**Step 2 · Write it down.**\n$$\\vec r = (\\vec i + \\vec j + 2\\vec k) + s(\\vec i - 6\\vec j + \\vec k) + t(\\vec i + \\vec k), \\quad s, t \\in \\mathbb R.$$\n**Extra (Cartesian form).** $\\vec n = \\vec{AB} \\times \\vec{AC} = (-6, 0, 6) \\propto (-1, 0, 1)$, so $-x + z = -1 + 2$:\n$$z - x = 1.$$\nCheck: $B$: $3 - 2 = 1$ ✓; $C$: $3 - 2 = 1$ ✓.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Which is a vector parametric equation of the plane through $P(0, 1, 0)$, $Q(1, 1, 0)$, $R(0, 1, 2)$?',
          options: [
            { text: '$\\vec r = \\vec j + s\\vec i + t(2\\vec k)$', correct: true, why: '$\\vec{PQ} = (1, 0, 0)$, $\\vec{PR} = (0, 0, 2)$.' },
            { text: '$\\vec r = s\\vec i + t\\vec j + \\vec k$', why: 'Start at a point of the plane ($P$) and use two edges.' },
            { text: '$\\vec r = \\vec j + s(\\vec i + \\vec j) + t(2\\vec k + \\vec j)$', why: 'Those are position vectors of $Q$ and $R$, not edges from $P$.' },
            { text: '$\\vec r = \\vec j + s\\vec i$', why: 'A plane needs two direction vectors.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Test questions: practised.',
          recap: ['Meeting point, then the angle with $\\sin$.', 'Parametric plane: a point plus two edges.'],
          why: 'More of the usual questions.',
        },
      ],
    },
    {
      name: 'More exam questions',
      terms: [
        ['Skew test', 'Solve two component equations; if the third fails and the directions are not parallel, the lines are skew.'],
        ['Plane–plane angle', '$\\cos\\theta = \\dfrac{|\\vec n_1 \\cdot \\vec n_2|}{\\|\\vec n_1\\|\\|\\vec n_2\\|}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Exam question 3',
          title: 'Find the perpendicular distance from $P(2, -1, 4)$ to $3x - 2y + 6z - 12 = 0$, and the acute angle between this plane and $2x - y + 2z = 5$.',
          body: '**Distance.**\n$$D = \\frac{|3(2) - 2(-1) + 6(4) - 12|}{\\sqrt{9 + 4 + 36}} = \\frac{20}{7} \\approx 2.86.$$\n**Angle.** $\\vec n_1 = (3, -2, 6)$, $\\|\\vec n_1\\| = 7$; $\\vec n_2 = (2, -1, 2)$, $\\|\\vec n_2\\| = 3$; $\\vec n_1 \\cdot \\vec n_2 = 6 + 2 + 12 = 20$.\n$$\\cos\\theta = \\frac{20}{21} \\Rightarrow \\theta \\approx 17.75°.$$',
        },
        {
          type: 'story',
          eyebrow: 'Exam question 4',
          title: 'Find the vector equation of the line of intersection of $2x - y + z = 4$ and $x + 2y - z = 1$.',
          body: '**A point.** Put $z = 0$: $2x - y = 4$, $x + 2y = 1$, so $x = \\frac95$, $y = -\\frac25$.\n\n**Direction.** $(2, -1, 1) \\times (1, 2, -1) = (-1, 3, 5)$.\n$$\\vec r = \\left(\\tfrac95, -\\tfrac25, 0\\right) + t(-1, 3, 5), \\quad t \\in \\mathbb R.$$',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'The planes $x - y + z + 8 = 0$ and $3x + 2y - z - 1 = 0$ are',
          options: [
            { text: 'perpendicular', correct: true, why: '$\\vec n_1 \\cdot \\vec n_2 = 3 - 2 - 1 = 0$.' },
            { text: 'parallel', why: '$(1, -1, 1)$ is not a multiple of $(3, 2, -1)$.' },
            { text: 'at $45°$', why: 'Compute $\\vec n_1 \\cdot \\vec n_2$ first: it is $0$.' },
            { text: 'the same plane', why: 'Different normals, so different planes.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Exam question 5',
          title: 'Show that $\\vec r_1 = (4, 2, -6) + \\mu(-8, 1, -2)$ and $\\vec r_2 = (-2, 1, -2) + \\lambda(-9, 2, 5)$ do not meet.',
          body: '**Not parallel:** $(-8, 1, -2) \\ne k(-9, 2, 5)$.\n\n**Equate:** $4 - 8\\mu = -2 - 9\\lambda$, $2 + \\mu = 1 + 2\\lambda$, $-6 - 2\\mu = -2 + 5\\lambda$.\n\nFrom the second, $\\mu = 2\\lambda - 1$; the first gives $\\lambda = 2$, $\\mu = 3$.\n\n**Third:** $-6 - 6 = -12$ but $-2 + 10 = 8$. Contradiction, so no common point: the lines are **skew**.',
        },
        {
          type: 'choice',
          eyebrow: 'Same type',
          prompt: 'Find the line through $A(-3, 2, 5)$ perpendicular to the $xy$-plane.',
          options: [
            { text: '$\\vec r = (-3, 2, 5) + \\lambda(0, 0, 1)$', correct: true, why: 'Perpendicular to the $xy$-plane means parallel to the $z$-axis, direction $\\vec k$.' },
            { text: '$\\vec r = (-3, 2, 5) + \\lambda(1, 1, 0)$', why: 'That direction lies **in** the $xy$-plane.' },
            { text: '$\\vec r = (-3, 2, 0) + \\lambda(-3, 2, 5)$', why: 'Use the point $A$ and the direction $\\vec k$.' },
            { text: '$z = 5$', why: 'That is a plane, not a line.' },
          ],
        },
        {
          type: 'finish',
          title: 'Chapter 4 exam practice: done.',
          body: 'Formulas to remember:',
        },
      ],
    },
  ],
};
