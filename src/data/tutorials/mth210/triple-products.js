// MTH 210 · Products · Lesson 3: the scalar triple product (volume, coplanar test, linear
// independence) and the vector triple product.
import { O, add, det3, num } from './vec';

const A = [3, 0, 0];
const B = [1, 2.5, 0];
const cAt = (h) => [0.6, 0.8, h];

function box(a, b, c) {
  const ab = add(a, b);
  const ac = add(a, c);
  const bc = add(b, c);
  const abc = add(ab, c);
  const edges = [[a, ab], [b, ab], [c, ac], [c, bc], [ac, abc], [bc, abc], [a, ac], [b, bc], [ab, abc]];
  return [
    { poly: [O, a, ab, b], kind: 'c' },
    { poly: [c, ac, abc, bc], kind: 'c' },
    ...edges.map((seg) => ({ seg, kind: 's', thin: true })),
  ];
}

export default {
  id: 'triple-products',
  title: 'Triple products and independence',
  covers: 'Scalar triple product as a determinant, cyclic order, volume of a parallelepiped and tetrahedron, coplanar vectors, linear independence and bases, the vector triple product',
  minutes: 18,
  sections: [
    {
      name: 'The scalar triple product',
      terms: [
        ['Scalar triple product', '$\\vec a \\cdot (\\vec b \\times \\vec c) = \\begin{vmatrix}a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3\\end{vmatrix}$, a scalar.'],
        ['Cyclic order', '$\\vec a \\cdot (\\vec b \\times \\vec c) = \\vec b \\cdot (\\vec c \\times \\vec a) = \\vec c \\cdot (\\vec a \\times \\vec b)$; swapping two vectors changes the sign.'],
        ['Volumes', 'Parallelepiped: $V = |\\vec a \\cdot (\\vec b \\times \\vec c)|$. Tetrahedron: $V = \\frac16|\\vec a \\cdot (\\vec b \\times \\vec c)|$.'],
        ['Coplanar test', '$\\vec a, \\vec b, \\vec c$ lie in one plane $\\iff \\vec a \\cdot (\\vec b \\times \\vec c) = 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Products · Lesson 3',
          title: 'Three vectors, one number: a volume',
          body: 'Put the three vectors as the rows of a determinant:\n$$\\vec a \\cdot (\\vec b \\times \\vec c) = \\begin{vmatrix}a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3\\end{vmatrix}.$$\nIts size is the volume of the slanted box (==parallelepiped==) with edges $\\vec a, \\vec b, \\vec c$.',
          cta: 'Squash the box',
        },
        {
          type: 'custom',
          widget: 'space',
          eyebrow: 'See it',
          title: 'Flatten the box and the volume hits $0$',
          body: 'Lower $\\vec c$ (red) into the plane of $\\vec a$ and $\\vec b$. Switch to the tetrahedron, which uses the same three edges.',
          graph: {
            R: 4,
            params: [{ label: 'height of $\\vec c$', min: 0, max: 3, step: 0.25, value: 2 }],
            views: ['Parallelepiped', 'Tetrahedron'],
            draw: (P, v) => {
              const c = cAt(P[0]);
              const edges = [{ arrow: [O, A], kind: 'a', label: 'a' }, { arrow: [O, B], kind: 'b', label: 'b' }, { arrow: [O, c], kind: 'd', label: 'c' }];
              if (v) return [{ poly: [A, B, c], kind: 'e' }, { poly: [O, A, B], kind: 'c' }, { seg: [A, c], kind: 's', thin: true }, { seg: [B, c], kind: 's', thin: true }, { seg: [A, B], kind: 's', thin: true }, ...edges];
              return [...box(A, B, c), ...edges];
            },
            read: (P, v) => {
              const d = det3(A, B, cAt(P[0]));
              if (Math.abs(d) < 1e-9) return '$\\vec a \\cdot (\\vec b \\times \\vec c) = 0$: the vectors are **coplanar** (no volume)';
              return `$\\vec a \\cdot (\\vec b \\times \\vec c) = ${num(d)}$, so ${v ? `$V = \\tfrac16 \\times ${num(d)} = ${num(d / 6)}$` : `$V = ${num(d)}$`}`;
            },
            need: 4,
            action: 'Lower c all the way, then try the tetrahedron',
          },
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Tetrahedron with vertices $A(0, -1, -1)$, $B(4, 5, q)$, $C(3, 9, 4)$, $D(-4, 4, 4)$',
          body: '**Step 1 · Three edges from one vertex.** $\\vec{AB} = (4, 6, q + 1)$, $\\vec{AC} = (3, 10, 5)$, $\\vec{AD} = (-4, 5, 5)$.\n\n**Step 2 · Determinant.**\n$$\\begin{vmatrix}4 & 6 & q + 1 \\\\ 3 & 10 & 5 \\\\ -4 & 5 & 5\\end{vmatrix} = 4(25) - 6(35) + (q + 1)(55) = 55q - 55.$$\n**Step 3.** $V = \\frac16|55q - 55| = \\frac{55}{6}|q - 1|$.\n\nThe four points are **coplanar** when $V = 0$: $q = 1$.',
          asides: [{ label: 'Exam tip', text: 'Given four **vertices**, never use their position vectors directly: subtract to get three edges from the same corner.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Find the volume of the parallelepiped with edges $\\vec a = (1, 0, 0)$, $\\vec b = (1, 2, 0)$, $\\vec c = (1, 1, 3)$.',
          options: [
            { text: '$6$', correct: true, why: 'The determinant is $1(6 - 0) - 0 + 0 = 6$.' },
            { text: '$1$', why: 'That is $\\frac16$ of it: the tetrahedron.' },
            { text: '$-6$', why: 'Volume is the **absolute value**, and here the determinant is $+6$ anyway.' },
            { text: '$3$', why: 'Expand the full determinant: $1(2 \\cdot 3 - 0 \\cdot 1) = 6$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Volume: set.',
          recap: ['$\\vec a \\cdot (\\vec b \\times \\vec c)$ is a $3 \\times 3$ determinant.', 'Box volume = its size; tetrahedron = $\\frac16$ of that.', 'Zero means coplanar.'],
          why: 'Coplanar has another name in this course: linearly dependent.',
        },
      ],
    },
    {
      name: 'Linear independence',
      terms: [
        ['Linearly dependent', 'Some non-trivial combination $\\lambda_1\\vec v_1 + \\lambda_2\\vec v_2 + \\lambda_3\\vec v_3 = \\vec 0$ exists, i.e. one vector is a combination of the others.'],
        ['Linearly independent', 'Only $\\lambda_1 = \\lambda_2 = \\lambda_3 = 0$ gives $\\vec 0$.'],
        ['Determinant test', 'Three vectors in $\\mathbb R^3$ are independent $\\iff$ their determinant is **not** $0$.'],
        ['Geometric meaning', 'Two vectors: independent $\\iff$ not parallel. Three: independent $\\iff$ not coplanar, and then they form a **basis** of $\\mathbb R^3$.'],
        ['Too many vectors', 'More vectors than the dimension (e.g. three in $\\mathbb R^2$) are always dependent. Any set containing $\\vec 0$ is dependent.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Same test, new name',
          title: 'Dependent = flat',
          body: 'Vectors are ==linearly dependent== when one is a combination of the others. Geometrically:\n\n**Two vectors** are dependent when they are **parallel**.\n**Three vectors** are dependent when they are **coplanar**: exactly when the box in the last picture had no volume.\n\nSo the test is the triple product again:\n$$\\begin{vmatrix}\\vec v_1 \\\\ \\vec v_2 \\\\ \\vec v_3\\end{vmatrix} = 0 \\iff \\text{dependent}.$$',
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Are $(1, 2, 3)$, $(2, 1, 4)$, $(3, 0, 5)$ independent?',
          body: '$$\\begin{vmatrix}1 & 2 & 3 \\\\ 2 & 1 & 4 \\\\ 3 & 0 & 5\\end{vmatrix} = 1(5 - 0) - 2(10 - 12) + 3(0 - 3) = 5 + 4 - 9 = 0.$$\nThe determinant is $0$: **linearly dependent**. Indeed $(3, 0, 5) = 2(2, 1, 4) - (1, 2, 3)$.',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Do $(1, 2, 0)$, $(0, 1, 3)$, $(2, 0, 1)$ form a basis for $\\mathbb R^3$?',
          options: [
            { text: 'Yes: the determinant is $13 \\ne 0$', correct: true, why: '$1(1 - 0) - 2(0 - 6) + 0 = 13$. Non-coplanar, so independent: a basis.' },
            { text: 'No: the determinant is $0$', why: 'Expand again: $1(1) - 2(-6) = 13$.' },
            { text: 'No: one of them has a zero component', why: 'A zero component does not make a set dependent; the **zero vector** would.' },
            { text: 'It depends on their lengths', why: 'Only the determinant matters.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'Show that $\\vec a = (1, 2)$, $\\vec b = (3, 1)$, $\\vec c = (5, 4)$ are dependent',
          body: 'Three vectors in $\\mathbb R^2$ are always dependent. To show it, find $\\lambda, \\mu$ with $\\vec c = \\lambda\\vec a + \\mu\\vec b$:\n$$(5, 4) = (\\lambda + 3\\mu,\\ 2\\lambda + \\mu) \\Rightarrow \\lambda + 3\\mu = 5,\\ 2\\lambda + \\mu = 4.$$\nSo $\\lambda = 1$, $\\mu = \\frac43$: $\\vec c = \\vec a + \\frac43\\vec b$. **Dependent.**',
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which sets are linearly **dependent**?',
          options: [
            { text: '$(2, 1, 0)$, $(1, -1, 3)$, $(3, 0, 3)$', correct: true, why: 'Determinant $0$; the third is the sum of the first two.' },
            { text: '$(1, 0, 0)$, $(0, 1, 0)$, $(1, 1, 0)$', correct: true, why: 'All lie in the $xy$-plane: $\\vec c = \\vec a + \\vec b$.' },
            { text: '$(2, -1)$, $(1, 3)$, $(5, 5)$', correct: true, why: 'Three vectors in $\\mathbb R^2$ are always dependent.' },
            { text: '$(2, 1, 2)$, $(2, -1, 1)$, $(1, 2, -1)$', why: 'Determinant $11 \\ne 0$: **independent**.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Independence: set.',
          recap: ['Dependent = parallel (two) or coplanar (three).', 'Test: determinant $= 0$.'],
          why: 'Last piece: a cross product inside a cross product.',
        },
      ],
    },
    {
      name: 'The vector triple product',
      terms: [
        ['Vector triple product', '$\\vec a \\times (\\vec b \\times \\vec c) = \\vec b(\\vec a \\cdot \\vec c) - \\vec c(\\vec a \\cdot \\vec b)$ ("BAC minus CAB").'],
        ['Other bracket', '$(\\vec a \\times \\vec b) \\times \\vec c = \\vec b(\\vec a \\cdot \\vec c) - \\vec a(\\vec b \\cdot \\vec c)$. The cross product is **not associative**.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The formula',
          title: 'BAC minus CAB',
          body: '$$\\vec a \\times (\\vec b \\times \\vec c) = \\vec b\\,(\\vec a \\cdot \\vec c) - \\vec c\\,(\\vec a \\cdot \\vec b).$$\nRead it as "**b**(**a**·**c**) minus **c**(**a**·**b**)": BAC − CAB.\n\nFor the other bracket, flip the order first: $(\\vec a \\times \\vec b) \\times \\vec c = -\\vec c \\times (\\vec a \\times \\vec b) = \\vec b(\\vec a \\cdot \\vec c) - \\vec a(\\vec b \\cdot \\vec c)$.',
          asides: [{ label: 'Exam tip', text: 'This formula is the key to solving vector equations in the next chapter.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Use BAC − CAB to find $\\vec i \\times (\\vec j \\times \\vec k)$.',
          options: [
            { text: '$\\vec 0$', correct: true, why: '$\\vec j(\\vec i \\cdot \\vec k) - \\vec k(\\vec i \\cdot \\vec j) = \\vec j(0) - \\vec k(0) = \\vec 0$. Check: $\\vec j \\times \\vec k = \\vec i$ and $\\vec i \\times \\vec i = \\vec 0$.' },
            { text: '$\\vec i$', why: '$\\vec j \\times \\vec k = \\vec i$, then $\\vec i \\times \\vec i = \\vec 0$.' },
            { text: '$\\vec k$', why: 'Apply BAC − CAB: both dot products are $0$.' },
            { text: '$-\\vec i$', why: 'Both terms vanish.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Brackets matter',
          prompt: 'Find $(\\vec i \\times \\vec i) \\times \\vec j$ and $\\vec i \\times (\\vec i \\times \\vec j)$.',
          options: [
            { text: '$\\vec 0$ and $-\\vec j$', correct: true, why: '$\\vec i \\times \\vec i = \\vec 0$; and $\\vec i \\times \\vec k = -\\vec j$. Different answers: not associative.' },
            { text: 'Both $\\vec 0$', why: '$\\vec i \\times \\vec j = \\vec k$, and $\\vec i \\times \\vec k = -\\vec j \\ne \\vec 0$.' },
            { text: 'Both $-\\vec j$', why: '$\\vec i \\times \\vec i = \\vec 0$, so the first is $\\vec 0$.' },
            { text: '$\\vec 0$ and $\\vec j$', why: '$\\vec k \\times \\vec i = \\vec j$, so $\\vec i \\times \\vec k = -\\vec j$.' },
          ],
        },
        {
          type: 'finish',
          title: 'Triple products: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
