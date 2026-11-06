// MTH 205 · Warm-up · Lesson 1: what a matrix does. Vectors as recipes in î and ĵ, a matrix as a
// motion of the grid whose columns are where î and ĵ land, why that fixes every vector (proof
// walk), and the determinant as the factor by which every area changes.
import { A, ID, SQUARE, circle, det, iHat, jHat } from './la';

const SQUASH = [1, 2, 0.5, 1];
const FLIP = [1, 2, 2, 1];

export default {
  id: 'matrices-move-space',
  title: 'What a matrix does',
  covers: 'Vectors as combinations of î and ĵ, a matrix as a linear motion of the plane, columns as the images of the basis vectors, why a linear map is fixed by them, the determinant as the area scale factor, det = 0 as squashing, negative det as flipping',
  minutes: 16,
  sections: [
    {
      name: 'A matrix is a motion',
      terms: [
        ['Linear transformation', 'A map $T$ with $T(u + w) = T(u) + T(w)$ and $T(ku) = kT(u)$. Picture: grid lines stay straight, parallel and evenly spaced, and the origin stays fixed.'],
        ['Columns of a matrix', 'The first column is where $\\hat\\imath$ lands, the second is where $\\hat\\jmath$ lands.'],
        ['Matrix times vector', '$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = x\\begin{pmatrix} a \\\\ c \\end{pmatrix} + y\\begin{pmatrix} b \\\\ d \\end{pmatrix}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Warm-up · Lesson 1',
          title: 'Every matrix in this course is a motion',
          body: 'Linear algebra is easy to drown in: rows, columns, determinants, eigen-this, Jordan-that. But almost every idea in it is a **picture** of one thing: a matrix **moving space**.\n\nLearn to see that motion and you will know what each definition means, why each theorem is true, and how each proof goes. That is the plan for this whole course.',
          cta: 'Show me the plane',
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Vectors are recipes',
          graph: {
            steps: [
              { say: 'This is the plane. The arrow $v$ goes $2$ across and $1$ up: $v = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$.' },
              { say: 'Two special arrows: $\\hat\\imath$ (one step right, green) and $\\hat\\jmath$ (one step up, red).' },
              { say: '$v$ is a **recipe** in them: walk $2$ lots of $\\hat\\imath$, then $1$ lot of $\\hat\\jmath$. So $v = 2\\hat\\imath + 1\\hat\\jmath$. Every vector in the plane has such a recipe.' },
              { say: 'Now let a matrix $A$ **move** the whole plane. Watch the grid: lines stay **straight**, **parallel** and **evenly spaced**, and the origin stays put. A motion like that is called ==linear==.', action: { label: 'Apply A' } },
              { say: 'Where did $\\hat\\imath$ and $\\hat\\jmath$ land? $\\hat\\imath \\to (2, 1)$ and $\\hat\\jmath \\to (1, 2)$. Write those two landing spots as columns and you have the matrix: $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$.' },
              { say: 'The recipe survives the move: $v$ is still $2$ of (new $\\hat\\imath$) plus $1$ of (new $\\hat\\jmath$). So $Av = 2\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} + 1\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 4 \\end{pmatrix}$. That is all matrix multiplication is.' },
            ],
            draw: (step, presses) => {
              const moved = step > 3 || (step === 3 && presses > 0);
              const items = [];
              if (step === 2 || step === 5) items.push({ id: 'ii', vec: [2, 0], kind: 'b', w: 3.4 }, { id: 'jj', from: [2, 0], vec: [2, 1], kind: 'd', w: 3.4 });
              if (step >= 1) items.push(iHat(), jHat());
              items.push({ id: 'v', vec: [2, 1], kind: 'a', label: step === 5 ? '' : moved ? 'Av' : 'v' });
              if (step === 4) items.push({ id: 'ti', text: [2.55, 0.75], label: '(2, 1)', kind: 'b', fixed: true }, { id: 'tj', text: [0.6, 2.35], label: '(1, 2)', kind: 'd', fixed: true });
              if (step === 5) items.push({ id: 'tv', text: [4.4, 4.5], label: 'Av = (5, 4)', kind: 'a', fixed: true });
              return { M: moved ? A : ID, R: moved ? 5 : 3.5, items };
            },
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'Under $B = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$, where does $\\hat\\imath$ land?',
          options: [
            { text: '$(0, 1)$', correct: true, why: 'The first column is where $\\hat\\imath$ lands. Pointing right becomes pointing up: $B$ turns the plane a quarter turn.' },
            { text: '$(-1, 0)$', why: 'That is the **second** column: where $\\hat\\jmath$ lands.' },
            { text: '$(0, -1)$', why: 'Read the first column top to bottom: $(0, 1)$.' },
            { text: '$(1, 0)$', why: 'That would mean $\\hat\\imath$ doesn’t move. Read the first column.' },
          ],
        },
        {
          type: 'custom',
          widget: 'planeLab',
          eyebrow: 'Your turn',
          title: 'Build a quarter turn',
          body: 'Drag the tips of $\\hat\\imath$ (green) and $\\hat\\jmath$ (red). The matrix updates as you go: its columns are always where they land.',
          graph: {
            show: { det: false, eigen: false },
            goal: { text: 'Make the matrix that **rotates the plane a quarter turn anticlockwise**.', test: (M) => M[0] === 0 && M[1] === -1 && M[2] === 1 && M[3] === 0 },
          },
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Two arrows decide everything',
          body: 'A curious thing just happened: we only looked at where $\\hat\\imath$ and $\\hat\\jmath$ went, yet we knew where $v$ went. Let’s see why that always works.',
          graph: {
            steps: [
              { say: 'Here’s the question. Suppose all you know about a linear map $T$ is where $\\hat\\imath$ and $\\hat\\jmath$ land. Could you say where **every** vector lands?' },
              { say: 'Take any vector, say $v$. It is just a walk: two green steps, then one red step. In symbols, $v = 2\\hat\\imath + 1\\hat\\jmath$, and in general $v = x\\hat\\imath + y\\hat\\jmath$.' },
              { say: 'Now move the plane and keep your eye on the walk. It stays a walk, piece joined to piece. That is exactly what "linear maps keep sums" means: $T(v) = T(2\\hat\\imath) + T(\\hat\\jmath)$.', action: { label: 'Apply T' } },
              { say: 'Notice the two green steps: still **equal** after the move. Evenly spaced grid lines say precisely this: $T(2\\hat\\imath) = 2T(\\hat\\imath)$, "linear maps keep scaling".' },
              { say: 'So the walk after the move is $x$ steps of the new $\\hat\\imath$ and $y$ steps of the new $\\hat\\jmath$: $T(v) = xT(\\hat\\imath) + yT(\\hat\\jmath)$. Yes, two arrows decide everything. And that’s the whole proof: you just watched it happen.' },
            ],
            draw: (step, presses) => {
              const moved = step > 2 || (step === 2 && presses > 0);
              const items = [iHat({ o: step === 0 ? 1 : 0.45 }), jHat({ o: step === 0 ? 1 : 0.45 })];
              if (step >= 1) {
                items.push({ id: 's1', vec: [1, 0], kind: 'b', w: 3.6 }, { id: 's2', from: [1, 0], vec: [2, 0], kind: 'b', w: 3.6 }, { id: 's3', from: [2, 0], vec: [2, 1], kind: 'd', w: 3.6 });
                items.push({ id: 'v', vec: [2, 1], kind: 'a', label: moved ? 'T(v)' : 'v', o: step === 3 ? 0.4 : 1 });
              }
              return { M: moved ? A : ID, R: moved ? 4.5 : 3.5, items };
            },
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'The same idea in exam words: "a linear map $T: \\mathbb R^2 \\to \\mathbb R^2$ is determined by $T(\\hat\\imath)$ and $T(\\hat\\jmath)$". Put the lines in the order you watched them.',
          items: [
            'Let $v \\in \\mathbb R^2$ and write $v = x\\hat\\imath + y\\hat\\jmath$.',
            'By additivity, $T(v) = T(x\\hat\\imath) + T(y\\hat\\jmath)$.',
            'By homogeneity, $T(x\\hat\\imath) = xT(\\hat\\imath)$ and $T(y\\hat\\jmath) = yT(\\hat\\jmath)$.',
            'Hence $T(v) = xT(\\hat\\imath) + yT(\\hat\\jmath)$, which depends only on $T(\\hat\\imath)$ and $T(\\hat\\jmath)$. ∎',
          ],
        },
        {
          type: 'bridge',
          title: 'A matrix is a motion.',
          recap: ['Columns = where $\\hat\\imath$ and $\\hat\\jmath$ land.', '$Av$ = the same recipe, using the new $\\hat\\imath$ and $\\hat\\jmath$.', 'Linear = straight, parallel, evenly spaced, origin fixed.'],
          why: 'Next: one number that says how much the motion stretches area.',
        },
      ],
    },
    {
      name: 'The determinant',
      terms: [
        ['Determinant', 'The factor by which a transformation scales every area. For $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ it is $ad - bc$.'],
        ['det = 0', 'The plane is squashed onto a line (or point). Some nonzero vector lands on $0$; the matrix has no inverse (it is ==singular==).'],
        ['Negative det', 'The plane is flipped over (orientation reversed). The size of the determinant is still the area factor.'],
        ['Product rule', '$\\det(AB) = \\det A \\cdot \\det B$: doing two motions multiplies their area factors.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'The second column of a matrix is',
          options: [
            { text: 'where $\\hat\\jmath$ lands', correct: true, why: 'First column: $\\hat\\imath$. Second column: $\\hat\\jmath$.' },
            { text: 'where $\\hat\\imath$ lands', why: 'That is the first column.' },
            { text: 'the second coordinate of every output', why: 'That is the second **row** of the result, not a column of the matrix.' },
            { text: 'the area of the unit square', why: 'Area is the determinant, coming up now.' },
          ],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'How much does area grow?',
          graph: {
            steps: [
              { say: 'Shade the unit square sitting on $\\hat\\imath$ and $\\hat\\jmath$. Its area is $1$. Add a small disc too.' },
              { say: 'Apply $A$. The square becomes a parallelogram, the disc an ellipse. Because grid squares all stay equal, **every** region grows by the same factor.', action: { label: 'Apply A' } },
              { say: 'That one factor is the ==determinant==. For $A$ it is $3$, and the formula agrees: $\\det A = ad - bc = 2 \\cdot 2 - 1 \\cdot 1 = 3$.' },
              { say: 'A new matrix: its columns $\\begin{pmatrix} 1 \\\\ 0.5 \\end{pmatrix}$ and $\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$ point the **same way**. The whole plane is flattened onto one line: area $\\to 0$, so $\\det = 1 - 1 = 0$.', action: { label: 'Squash' } },
              { say: 'Flattened, a whole line of vectors (dashed) lands on the single point $0$. You can’t undo that: no inverse. This picture is the reason behind "$\\det A = 0 \\iff A$ is singular $\\iff Av = 0$ for some $v \\neq 0$".' },
              { say: 'One more: columns $\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$, $\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}$. Now $\\hat\\jmath$ ends up **clockwise** of $\\hat\\imath$: the plane was flipped over like a page. $\\det = 1 - 4 = -3$: area $\\times 3$, and the minus sign means "flipped".', action: { label: 'Flip' } },
            ],
            draw: (step, presses) => {
              const M = step >= 5 && presses >= 3 ? FLIP : step >= 3 && presses >= 2 ? SQUASH : step >= 1 && presses >= 1 ? A : ID;
              const d = det(M);
              const items = [
                { id: 'sq', poly: SQUARE, kind: d < 0 ? 'd' : 'c' },
                { id: 'disc', poly: circle(-1.4, 1.2, 0.45), kind: 'a' },
                iHat(),
                jHat(),
              ];
              if (step === 4) items.push({ id: 'null', span: [2, -1], kind: 'e', fixed: true }, { id: 'nt', text: [2.3, -1.6], label: 'all → 0', kind: 'e', fixed: true });
              const note = step === 0 ? 'area = 1' : `area $\\times ${Math.abs(d)}$${d < 0 ? ', flipped' : ''} $\\quad (\\det = ${d})$`;
              return { M, R: 4, items, note };
            },
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'Without calculating: $\\det\\begin{pmatrix} 3 & 6 \\\\ 1 & 2 \\end{pmatrix} = $',
          options: [
            { text: '$0$', correct: true, why: 'The second column $(6, 2)$ is twice the first $(3, 1)$: both basis vectors land on the same line, so the plane is flattened. Check: $3 \\cdot 2 - 6 \\cdot 1 = 0$.' },
            { text: '$12$', why: 'Look at the columns: $(6, 2) = 2(3, 1)$. Same direction means flat.' },
            { text: '$-12$', why: 'The columns are parallel, so the area factor is $0$.' },
            { text: '$6$', why: 'Parallel columns squash the plane: $\\det = 0$.' },
          ],
        },
        {
          type: 'custom',
          widget: 'planeLab',
          eyebrow: 'Your turn',
          title: 'Squash the plane',
          body: 'The amber square is the image of the unit square: its area is $|\\det A|$.',
          graph: {
            M: A,
            show: { det: true, eigen: false },
            goal: { text: 'Drag $\\hat\\imath$ or $\\hat\\jmath$ until the plane is **flat**: $\\det A = 0$.', test: (M) => Math.abs(M[0] * M[3] - M[1] * M[2]) < 1e-9 },
          },
        },
        {
          type: 'reveal',
          eyebrow: 'Why it matters',
          title: 'The determinant runs through the whole course',
          cards: [
            { title: 'Solving systems (Ch 1)', text: '$Ax = b$ has exactly one solution when $\\det A \\neq 0$: nothing is squashed, so the motion can be undone, $x = A^{-1}b$.' },
            { title: 'Eigenvalues (Ch 2)', text: 'We will find eigenvalues by asking when $A - \\lambda I$ squashes the plane: $\\det(A - \\lambda I) = 0$.' },
            { title: 'Product rule', text: 'Do $B$, then $A$: areas scale by $\\det B$, then by $\\det A$. So $\\det(AB) = \\det A\\det B$, and similar matrices $P^{-1}AP$ have the same determinant as $A$.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'For a square matrix $A$, which statements are **equivalent** to $\\det A = 0$?',
          options: [
            { text: 'The columns of $A$ are linearly dependent', correct: true, why: '**Yes:** the basis vectors land on a smaller space, so the plane is flattened.' },
            { text: '$Ax = 0$ has a solution $x \\neq 0$', correct: true, why: '**Yes:** flattening crushes a whole line onto $0$.' },
            { text: '$A$ has no inverse', correct: true, why: '**Yes:** a squash can’t be undone.' },
            { text: '$A$ is the zero matrix', why: '**No:** $\\begin{pmatrix} 1 & 2 \\\\ 0.5 & 1 \\end{pmatrix}$ has $\\det = 0$ but isn’t zero.' },
            { text: 'Every entry of $A$ is positive', why: '**No:** signs of entries say nothing by themselves.' },
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'A region of area $5$ is moved by $B = \\begin{pmatrix} 3 & 1 \\\\ 2 & 4 \\end{pmatrix}$.',
          body: 'Work it on paper first, then enter each step.',
          graph: {
            steps: [
              { ask: '$\\det B = $', answer: 10, tol: 0, hint: '$ad - bc = 3 \\cdot 4 - 1 \\cdot 2$.' },
              { ask: 'Area of the image $= $', answer: 50, tol: 0, hint: 'Every area is multiplied by $|\\det B|$.' },
              { ask: '$\\det(B^2) = $', answer: 100, tol: 0, hint: 'Two moves: the factors multiply, $\\det(B)\\det(B)$.' },
            ],
          },
        },
        {
          type: 'finish',
          title: 'What a matrix does: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
