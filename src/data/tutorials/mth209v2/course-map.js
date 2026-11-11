// MTH 209 · Lesson 0: the map. What numerical analysis is for, the four jobs (foundations,
// solving, data, change), the two engines behind almost every method (iterate until it settles;
// Taylor series), and how the course and its exam are laid out.

export default {
  id: 'course-map',
  title: 'The map: what this course is for',
  covers: 'Why approximate, the four jobs, the two engines, and how every part connects',
  minutes: 9,
  sections: [
    {
      name: 'Why approximate',
      terms: [
        ['Numerical analysis', 'Getting numbers out of maths problems that have no exact formula, step by step, and knowing how wrong the answer might be.'],
        ['Iterate', 'Repeat the same improving step, feeding each answer back in, until the answer stops changing.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'MTH 209 · Numerical Analysis',
          title: 'When the exact answer is out of reach',
          body: 'There is no formula that solves $x^5 - x - 1 = 0$. No formula gives $\\sqrt 2$ as a finished decimal. Yet calculators, bridges, weather forecasts and rockets all need these numbers.\n\nNumerical analysis is the craft of getting them anyway: **approximate the answer step by step, and know how wrong you might be.** That one sentence is the whole course.',
        },
        {
          type: 'choice',
          eyebrow: 'Guess first',
          prompt: 'How does a calculator find $\\sqrt 2$?',
          options: [
            { text: 'It improves a guess over and over until the digits stop changing', correct: true, why: 'Exactly. It runs a short loop, and that idea powers half this course.' },
            { text: 'It looks it up in a table of every square root', why: 'There are infinitely many inputs; no table holds them all.' },
            { text: 'It uses an exact formula for square roots', why: 'There is no finite formula giving the digits of $\\sqrt 2$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Engine 1',
          title: 'Iterate until it settles',
          body: 'Guess $x = 1$, then repeat $x \\leftarrow \\tfrac12\\big(x + \\tfrac2x\\big)$:\n\n$$1 \\to 1.5 \\to 1.416667 \\to 1.414216 \\to \\dots$$\n\nThree steps give $\\sqrt 2 = 1.41421\\ldots$ to five decimal places. Bisection, iteration, Newton’s method, Gauss-Seidel and fixed-point methods all work this way. The questions are always the same: **does it settle, how fast, and when do we stop?**',
        },
        {
          type: 'story',
          eyebrow: 'Engine 2',
          title: 'Near a point, a curve is almost a polynomial',
          body: 'Close to $x = 0$, the curve $\\sin x$ looks like $x - \\tfrac{x^3}{6}$. At $x = 0.5$ that gives $0.479167$; the true value is $0.479426$.\n\nThis is the **Taylor series**: swap a hard function for an easy polynomial, and the dropped terms tell you the error. Newton’s method, finite differences and Euler’s method are all Taylor in disguise.',
        },
      ],
    },
    {
      name: 'The four jobs',
      screens: [
        {
          type: 'story',
          eyebrow: 'The course at a glance',
          title: 'Four ideas, four parts of the course',
          body: '• **Idea A, how wrong and why it works:** how wrong is an answer (errors), and why approximating works (series).\n• **Idea B, solving:** find where things balance: one equation $f(x) = 0$, then linear systems, then non-linear systems.\n• **Idea C, data:** rebuild a function from a table of values: finite differences and interpolation.\n• **Idea D, change:** follow a rate of change step by step: initial value problems and Euler’s method.\n\nEvery lesson has two parts: understand it on a simple case, then apply it to an exam-sized question. A timed mock exam closes the course.',
        },
        {
          type: 'sort',
          eyebrow: 'Which job?',
          prompt: 'Which part handles each task?',
          buckets: [
            { id: 'a', label: 'A: how wrong' },
            { id: 'b', label: 'B: solving' },
            { id: 'c', label: 'C: data' },
            { id: 'd', label: 'D: change' },
          ],
          items: [
            { text: 'Digits of $3.1416$ correct for $\\pi$', bucket: 'a', why: 'Measuring error is Idea A.' },
            { text: 'Solve $x^3 - 2x - 5 = 0$', bucket: 'b', why: 'Finding where an expression balances is Idea B.' },
            { text: '2015 population from 2010 and 2020 data', bucket: 'c', why: 'Filling a gap in a table is interpolation, Idea C.' },
            { text: 'Tank level tomorrow from today’s drain rate', bucket: 'd', why: 'Stepping forward from a rate of change is Idea D.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'How each lesson runs',
          title: 'Same path every time',
          body: 'Every lesson starts by saying where it sits on this map. Then: the **problem**, the **idea** in plain words with a picture, the **method** built from that idea, a **past-exam question** solved step by step, and **your turn** on a similar one.\n\nBy the end you should be able to say *what* each method does, *why* it works, and *how* to carry it out on any question.',
          asides: [
            { label: 'Exam tip', text: 'If a question names a method (“use the Gauss-Seidel method”, “by Newton-Raphson”), you must use that method. A correct answer by another method can lose the marks.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Newton’s method, finite differences and Euler’s method all come from which idea?',
          options: [
            { text: 'Taylor series: a curve near a point is almost a polynomial', correct: true, why: 'Each one keeps the first few Taylor terms and drops the rest. You will see this in Ideas B, C and D.' },
            { text: 'Looking values up in tables', why: 'Tables are data (Idea C), but these methods are built from Taylor’s idea.' },
            { text: 'Solving with exact formulas', why: 'They exist precisely because exact formulas are out of reach.' },
          ],
        },
        {
          type: 'finish',
          title: 'You have the map.',
          body: 'One goal: approximate, and know how wrong. Two engines: iterate until it settles, and Taylor series. Four ideas: how wrong, solving, data, change. Next: Idea A, measuring how wrong an answer is.',
        },
      ],
    },
  ],
};
