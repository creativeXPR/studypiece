// MTH 210 · Vector Basics · Lesson 1: scalars and vectors, directed line segments, notation,
// position vectors and the types of vectors.
import { O, guides, mul, norm, num, sub, tup } from './vec';

const A = [2, -1, 3];
const B = [5, 4, -2];

export default {
  id: 'what-is-a-vector',
  title: 'What a vector is',
  covers: 'Scalars and vectors, directed line segments, notation, magnitude, position vectors, the vector between two points, zero, negative, equal, free and bound vectors',
  minutes: 14,
  sections: [
    {
      name: 'Scalars, vectors and arrows',
      terms: [
        ['Scalar', 'A quantity with **magnitude only**: mass, length, time, temperature.'],
        ['Vector', 'A quantity with **magnitude and direction**: force, velocity, displacement.'],
        ['Directed line segment', 'An arrow from an initial point $P$ to a terminal point $Q$: $\\vec{PQ} = Q - P$ (terminal minus initial).'],
        ['Magnitude', '$\\|\\vec a\\| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$ for $\\vec a = a_1\\vec i + a_2\\vec j + a_3\\vec k$. Never negative.'],
        ['Position vector', 'The arrow from the origin $O$ to a point: $\\vec{OP} = x\\vec i + y\\vec j + z\\vec k$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Vector Basics · Lesson 1',
          title: 'Size alone, or size and direction?',
          body: 'A ==scalar== is just a size: $5$ kg, $30$ °C, $2$ hours.\n\nA ==vector== has a size **and** a direction: "$20$ km **north**", a push of $10$ N **to the left**.\n\nWe draw a vector as an arrow, a ==directed line segment==, from an **initial point** $P$ to a **terminal point** $Q$:\n$$\\vec{PQ} = Q - P \\quad\\text{(terminal minus initial).}$$',
          cta: 'Build one',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'A vector in 3D',
          body: 'Every vector in space is built from three steps along the axes: $a_1$ along $x$, $a_2$ along $y$, $a_3$ along $z$. The unit arrows of the axes are $\\vec i, \\vec j, \\vec k$.',
          graph: {
            R: 4, floor: true,
            params: [
              { label: '$a_1$ (along $x$)', min: -4, max: 4, step: 1, value: 3 },
              { label: '$a_2$ (along $y$)', min: -4, max: 4, step: 1, value: 2 },
              { label: '$a_3$ (along $z$)', min: -4, max: 4, step: 1, value: 3 },
            ],
            draw: (P) => [...guides(P), { arrow: [O, P], kind: 'a', label: 'a' }],
            read: (P) => `$\\vec a = ${P[0]}\\vec i ${P[1] < 0 ? '-' : '+'} ${Math.abs(P[1])}\\vec j ${P[2] < 0 ? '-' : '+'} ${Math.abs(P[2])}\\vec k$, $\\|\\vec a\\| = \\sqrt{${P[0] ** 2 + P[1] ** 2 + P[2] ** 2}}${Number.isInteger(norm(P)) ? '' : ` \\approx ${num(norm(P))}`}$`,
            need: 4,
            action: 'Move the sliders, then drag to turn the picture',
          },
          asides: [{ label: 'Tip', text: 'Writing it down: $\\vec a$, $\\underline a$ or bold $\\mathbf a$ all mean the same vector. Its length is $\\|\\vec a\\|$ or $|\\vec a|$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\|\\vec a\\|$ for $\\vec a = 2\\vec i - \\vec j + 2\\vec k$.',
          options: [
            { text: '$3$', correct: true, why: '$\\sqrt{4 + 1 + 4} = \\sqrt9 = 3$.' },
            { text: '$\\sqrt7$', why: 'Square every component, including the negative one: $(-1)^2 = 1$, so it is $\\sqrt{4 + 1 + 4}$.' },
            { text: '$3$ and $-3$', why: 'A magnitude is never negative.' },
            { text: '$5$', why: 'That is $2 + 1 + 2$. Square, add, then take the square root.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Sort them out',
          prompt: 'Which of these is a **vector**?',
          options: [
            { text: 'The velocity of a car: $60$ km/h due east', correct: true, why: 'It has a size ($60$ km/h) and a direction (east).' },
            { text: 'The mass of a bag: $5$ kg', why: 'Mass has no direction: a scalar.' },
            { text: 'The temperature of a room: $28$ °C', why: 'Temperature is a scalar.' },
            { text: 'The time of a test: $1$ hour', why: 'Time is a scalar.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Position vectors',
          title: 'From one point to another',
          body: 'The ==position vector== of a point $P(x, y, z)$ is the arrow from the origin: $\\vec{OP} = x\\vec i + y\\vec j + z\\vec k$.\n\nFor two points $A$ and $B$, go back to the origin and out again:\n$$\\vec{AB} = \\vec{OB} - \\vec{OA} = (x_2 - x_1)\\vec i + (y_2 - y_1)\\vec j + (z_2 - z_1)\\vec k.$$\n**Example.** $A(2, -1, 3)$, $B(5, 4, -2)$: $\\vec{AB} = (5 - 2)\\vec i + (4 + 1)\\vec j + (-2 - 3)\\vec k = 3\\vec i + 5\\vec j - 5\\vec k$.',
          cta: 'See the triangle',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: '$\\vec{AB} = \\vec b - \\vec a$',
          body: 'Switch views to build $\\vec{AB}$ from the two position vectors.',
          graph: {
            R: 5,
            views: ['Position vectors', 'Add AB'],
            draw: (P, v) => [
              { arrow: [O, A], kind: 'a', label: 'a', mid: true },
              { arrow: [O, B], kind: 'b', label: 'b', mid: true },
              { pt: A, kind: 'a', label: 'A' },
              { pt: B, kind: 'b', label: 'B' },
              ...(v ? [{ arrow: [A, B], kind: 'd', label: 'AB', mid: true }] : []),
            ],
            read: (P, v) => (v ? `$\\vec{AB} = \\vec b - \\vec a = ${tup(sub(B, A))}$, length $\\sqrt{59}$` : `$\\vec a = ${tup(A)}$, $\\vec b = ${tup(B)}$`),
            need: 2,
            action: 'Switch to "Add AB"',
          },
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find $\\vec{AB}$ for $A(1, 2, 0)$ and $B(4, -1, 2)$.',
          options: [
            { text: '$3\\vec i - 3\\vec j + 2\\vec k$', correct: true, why: 'Terminal minus initial: $(4 - 1, -1 - 2, 2 - 0)$.' },
            { text: '$-3\\vec i + 3\\vec j - 2\\vec k$', why: 'That is $\\vec{BA} = A - B$. For $\\vec{AB}$, take $B - A$.' },
            { text: '$5\\vec i + \\vec j + 2\\vec k$', why: 'That adds the points. Subtract instead.' },
            { text: '$3\\vec i + \\vec j + 2\\vec k$', why: 'Check the $y$ part: $-1 - 2 = -3$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Arrows: set.',
          recap: ['A vector has size and direction; a scalar has size only.', '$\\|\\vec a\\| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$.', '$\\vec{AB} = B - A$ (terminal minus initial).'],
          why: 'Next: the kinds of vectors you will be asked to name.',
        },
      ],
    },
    {
      name: 'Types of vectors',
      terms: [
        ['Zero (null) vector', '$\\vec 0 = 0\\vec i + 0\\vec j + 0\\vec k$, magnitude $0$, no definite direction. The additive identity: $\\vec a + \\vec 0 = \\vec a$.'],
        ['Negative vector', '$-\\vec a$: same magnitude, opposite direction. $\\vec a + (-\\vec a) = \\vec 0$ (additive inverse).'],
        ['Equal vectors', 'Same magnitude **and** same direction; in components, every component is equal.'],
        ['Free vector', 'Not tied to a position, e.g. a displacement of $20$ km north.'],
        ['Bound vector', 'Tied to a position, e.g. a force on a door, or a position vector (starts at $O$).'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Equal, negative and parallel',
          body: 'Each view shows $\\vec a$ in blue and another vector in green.',
          graph: {
            R: 4,
            views: ['Equal', 'Negative', 'Parallel', 'Same length'],
            draw: (P, v) => {
              const a = [2, 2, 2];
              const s = [0, -2.5, 0];
              const other = [a, mul(-1, a), mul(0.5, a), [2, 2, -2]][v];
              return [{ arrow: [O, a], kind: 'a', label: 'a' }, { arrow: [s, [s[0] + other[0], s[1] + other[1], s[2] + other[2]]], kind: 'b', label: ['a (moved)', '−a', '½a', 'b'][v] }];
            },
            read: (P, v) => [
              'Moved, but the **same length and direction**: equal vectors. Position does not matter.',
              '**Same length, opposite direction**: $-\\vec a$. And $\\vec a + (-\\vec a) = \\vec 0$.',
              'A scalar multiple $k\\vec a$ is **parallel** to $\\vec a$ (here $k = \\frac12$).',
              '$(2, 2, 2)$ and $(2, 2, -2)$ have the **same length** $\\sqrt{12}$ but different directions: **not equal**.',
            ][v],
            need: 4,
            action: 'Look at all four views',
          },
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: '$(2, 3, 4)$ and $(2, 3, -4)$ are equal vectors because they have the same magnitude.', why: '**Same magnitude is not enough**: the $z$-components differ, so the directions differ.' },
            { text: 'The zero vector has no definite direction.', correct: true, why: 'Its initial and terminal points coincide.' },
            { text: '$|-\\vec a| = |\\vec a|$.', correct: true, why: 'A negative vector has the **same magnitude**, opposite direction.' },
            { text: 'A position vector is a bound vector.', correct: true, why: 'It is tied to the origin.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Name the type',
          title: 'Five types, one line each',
          cards: [
            { title: 'Zero', text: '$\\vec 0$: magnitude $0$, every component $0$, no direction.' },
            { title: 'Negative', text: '$-\\vec a$: same size, opposite way. $\\vec F + (-\\vec F) = \\vec 0$.' },
            { title: 'Equal', text: 'Same size and direction, wherever they start.' },
            { title: 'Free', text: 'Can be moved anywhere: a displacement, the velocity of a car.' },
            { title: 'Bound', text: 'Fixed to a point: a force on a rigid body, a position vector.' },
          ],
        },
        {
          type: 'finish',
          title: 'What a vector is: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
