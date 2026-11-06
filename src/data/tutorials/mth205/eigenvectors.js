// MTH 205 · Eigenvalues · Lesson 2: eigenvectors and eigenvalues. Built on the warm-up matrix
// A = (2 1; 1 2): most arrows leave their line, two only stretch (×3 along (1, 1), ×1 along
// (−1, 1)). Then why det(A − λI) = 0 finds them (A − λI must squash the plane), the
// characteristic polynomial, eigenspaces as null spaces, and the λ^k lemma, each as a proof walk.
import { A, A2, ID, minusL, det } from './la';

const S = 1.2 / Math.SQRT2;
const ARROWS = Array.from({ length: 8 }, (_, k) => {
  const t = (k * Math.PI) / 8;
  return [1.2 * Math.cos(t), 1.2 * Math.sin(t)];
});
const EIG3 = 2; // ARROWS[2] points along (1, 1): stretched ×3
const EIG1 = 6; // ARROWS[6] points along (−1, 1): left alone, ×1

export default {
  id: 'eigenvectors',
  title: 'Eigenvectors and eigenvalues',
  covers: 'Eigenvectors as directions a transformation only stretches, eigenvalues as the stretch factors, the definition for a linear map and for a matrix, why eigenvalues solve det(A − λI) = 0, the characteristic polynomial, eigenspaces as null spaces of A − λI, and the eigenvalues of powers',
  minutes: 22,
  sections: [
    {
      name: 'Directions that only stretch',
      terms: [
        ['Eigenvector', 'A vector $v \\neq 0$ that a transformation keeps on its own line: $Av = \\lambda v$.'],
        ['Eigenvalue', 'The stretch factor $\\lambda$ along an eigenvector. Negative $\\lambda$ means the arrow is flipped back along its line; $\\lambda = 0$ means it is crushed to $0$.'],
        ['Definition', 'For linear $T: V \\to V$ over a field $\\mathbb F$: $\\lambda \\in \\mathbb F$ is an eigenvalue of $T$ if $T(v) = \\lambda v$ for some $v \\neq 0$; such $v$ is an eigenvector (characteristic vector).'],
        ['Eigenspace', '$E_\\lambda$: all eigenvectors for $\\lambda$, together with $0$. It is a whole line (or plane, …) through the origin.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Under $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, the vector $\\hat\\imath$ lands on',
          options: [
            { text: '$(2, 1)$', correct: true, why: 'The first column is where $\\hat\\imath$ lands.' },
            { text: '$(1, 2)$', why: 'That is where $\\hat\\jmath$ lands (second column).' },
            { text: '$(2, 2)$', why: 'Read the first column: $(2, 1)$.' },
            { text: '$(1, 0)$', why: '$A$ moves $\\hat\\imath$: read the first column.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Eigenvalues · Lesson 2',
          title: 'Does anything survive the motion?',
          body: 'When $A$ moves the plane, almost every arrow gets **turned**: it ends up pointing somewhere new.\n\nAlmost. Let’s go looking for the arrows that don’t turn: the ones that end up on the **same line** they started on. They turn out to be the most useful vectors in this whole course.',
          cta: 'Go looking',
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Watch',
          title: 'Eight arrows, one motion',
          graph: {
            steps: [
              { say: 'Here are eight arrows, each sitting on its own dashed line. Our old friend $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ is about to move them.' },
              { say: 'Watch each arrow against its dashed line.', action: { label: 'Apply A' } },
              { say: 'Most arrows were knocked **off** their line. But two weren’t. The arrow along $(1, 1)$ stayed on its line and got $3$ times longer. The arrow along $(-1, 1)$ didn’t move at all: stretched $1$ time.' },
              { say: 'These special arrows are the ==eigenvectors== of $A$, and their stretch factors, $3$ and $1$, are its ==eigenvalues==. In one line: $Av = \\lambda v$. ("Eigen" is German for "own": each keeps its own line.)' },
              { say: 'And it isn’t just those two arrows: **every** vector on the $(1, 1)$ line is stretched $\\times 3$, and every vector on the $(-1, 1)$ line stays put. Each line is an ==eigenspace==.' },
            ],
            draw: (step, presses) => {
              const moved = step > 1 || (step === 1 && presses > 0);
              const items = ARROWS.map((v, k) => ({ id: `l${k}`, span: v, fixed: true, kind: 's', o: step >= 2 && k !== EIG3 && k !== EIG1 ? 0.12 : 0.35 }));
              ARROWS.forEach((v, k) => {
                const special = step >= 2 && (k === EIG3 || k === EIG1);
                items.push({ id: `a${k}`, vec: v, kind: special ? (k === EIG3 ? 'e' : 'c') : 's', o: step >= 2 && !special ? 0.3 : 1 });
              });
              if (step >= 3) items.push({ id: 't3', text: [3 * S + 0.2, 3 * S - 0.5], label: '×3', kind: 'e', fixed: true }, { id: 't1', text: [-S - 0.45, S + 0.25], label: '×1', kind: 'c', fixed: true });
              if (step >= 4) items.push({ id: 'e3', span: [1, 1], kind: 'e', fixed: true }, { id: 'e1', span: [-1, 1], kind: 'c', fixed: true });
              return { M: moved ? A : ID, R: 4, items };
            },
          },
        },
        {
          type: 'choice',
          eyebrow: 'Predict',
          prompt: 'The quarter turn $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ rotates the plane by $90°$. Which arrows stay on their own line?',
          options: [
            { text: 'None: every arrow is turned', correct: true, why: 'A rotation turns **every** direction, so it has no real eigenvectors. (Its eigenvalues are the complex numbers $\\pm i$.)' },
            { text: 'Only $\\hat\\imath$', why: '$\\hat\\imath$ is turned to point up: off its line.' },
            { text: 'Every arrow', why: 'A rotation turns them all; none keeps its line.' },
            { text: 'Arrows along $(1, 1)$', why: 'That line is turned to $(-1, 1)$: a different line.' },
          ],
        },
        {
          type: 'custom',
          widget: 'planeLab',
          eyebrow: 'Play with it',
          title: 'Hunt for eigen-lines',
          body: 'The purple dashed lines are the eigen-directions of whatever matrix you build. Try the buttons, then drag $\\hat\\imath$ and $\\hat\\jmath$ yourself. When do the lines disappear? When do they merge?',
          graph: {
            M: A,
            show: { det: true, eigen: true },
            presets: [
              { label: 'A', M: A },
              { label: 'Stretch', M: [3, 0, 0, 1] },
              { label: 'Shear', M: [1, 1, 0, 1] },
              { label: 'Quarter turn', M: [0, -1, 1, 0] },
              { label: 'Squash', M: [1, 1, 1, 1] },
            ],
          },
        },
        {
          type: 'multi',
          eyebrow: 'Exam style',
          prompt: 'Which statements are true?',
          options: [
            { text: 'Any nonzero multiple of an eigenvector is an eigenvector (same $\\lambda$)', correct: true, why: '**True:** it sits on the same line, so it is stretched the same way: $A(kv) = kAv = \\lambda(kv)$.' },
            { text: 'An eigenvalue can be $0$', correct: true, why: '**True:** $Av = 0v = 0$ means $A$ crushes that line to $0$, which happens exactly when $\\det A = 0$.' },
            { text: 'The zero vector is an eigenvector', why: '**False:** $A0 = \\lambda 0$ for **every** $\\lambda$, so it would tell us nothing. The definition insists $v \\neq 0$.' },
            { text: 'The shear $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ has only one eigen-direction', correct: true, why: '**True:** only the $x$-axis slides along itself; every other line tilts. (Remember this one: it is the reason Jordan form exists.)' },
            { text: 'Every real $2 \\times 2$ matrix has a real eigenvalue', why: '**False:** the quarter turn has none.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Eigenvectors: seen.',
          recap: ['An eigenvector keeps its own line: $Av = \\lambda v$, $v \\neq 0$.', 'The eigenvalue is the stretch factor along it.', 'All of them for one $\\lambda$ (plus $0$) form the eigenspace.'],
          why: 'Next: how to **find** them without drawing.',
        },
      ],
    },
    {
      name: 'Finding them',
      terms: [
        ['Key rewrite', '$Av = \\lambda v \\iff (A - \\lambda I)v = 0$.'],
        ['Characteristic equation', '$|A - \\lambda I| = 0$. Its roots are exactly the eigenvalues.'],
        ['Characteristic polynomial', '$P_A(\\lambda) = |A - \\lambda I|$, of degree $n$ for an $n \\times n$ matrix. For $2 \\times 2$: $\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A$.'],
        ['Eigenspace', '$E_\\lambda$ = null space of $A - \\lambda I$: solve the homogeneous system $(A - \\lambda I)v = 0$.'],
        ['Quick checks', 'Sum of eigenvalues $= \\operatorname{tr}A$; product $= \\det A$. A triangular matrix’s eigenvalues are its diagonal entries.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'An idea',
          title: 'Hunting with a squash test',
          graph: {
            steps: [
              { say: 'We want $v \\neq 0$ with $Av = \\lambda v$. Move everything to one side: $Av - \\lambda v = 0$, which is $(A - \\lambda I)v = 0$. So for each guess $\\lambda$, picture the matrix $A - \\lambda I$ and ask: **does it crush some nonzero arrow to $0$?**' },
              { say: 'Guess $\\lambda = 2$: $A - 2I = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$. It just flips the plane over. Nothing nonzero lands on $0$, so $2$ is not an eigenvalue.', action: { label: 'Try λ = 2' } },
              { say: 'Guess $\\lambda = 3$: $A - 3I = \\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix}$. The plane collapses onto a line, and the whole $(1, 1)$ line is crushed to $0$. Found one: $3$ **is** an eigenvalue, with eigenvectors along $(1, 1)$.', action: { label: 'Try λ = 3' } },
              { say: 'Guess $\\lambda = 1$: $A - I = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$ collapses too, crushing the $(-1, 1)$ line. That’s the other one.', action: { label: 'Try λ = 1' } },
              { say: 'See the pattern? $\\lambda$ works exactly when $A - \\lambda I$ **squashes the plane flat**. And squashing flat is what $\\det = 0$ means. So, no guessing needed: the eigenvalues are the solutions of $\\det(A - \\lambda I) = 0$.' },
            ],
            draw: (step, presses) => {
              const l = step >= 3 && presses >= 3 ? 1 : step >= 2 && presses >= 2 ? 3 : step >= 1 && presses >= 1 ? 2 : 0;
              const M = minusL(A, l);
              const items = [
                { id: 'u', vec: [1, 1], kind: 'e', label: l === 0 ? '(1, 1)' : '' },
                { id: 'w', vec: [-1, 1], kind: 'c', label: l === 0 ? '(−1, 1)' : '' },
              ];
              return { M, R: 4, items, note: `$\\lambda = ${l}: \\quad \\det(A - ${l}I) = ${det(M)}$${det(M) === 0 ? '  ✓' : ''}` };
            },
          },
        },
        {
          type: 'story',
          eyebrow: 'Now with algebra',
          title: 'The same search on paper',
          body: '$$|A - \\lambda I| = \\begin{vmatrix} 2 - \\lambda & 1 \\\\ 1 & 2 - \\lambda \\end{vmatrix} = (2 - \\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 1)(\\lambda - 3).$$\nThis is the ==characteristic polynomial==; setting it to $0$ gives $\\lambda = 1, 3$, the two we saw.\n\nTo find the eigenvectors, solve $(A - \\lambda I)v = 0$, a homogeneous system, exactly as in Chapter 1:\n**$\\lambda = 3$:** $-x + y = 0$, so $v = k(1, 1)$.\n**$\\lambda = 1$:** $x + y = 0$, so $v = k(1, -1)$.\nThe eigenspace $E_\\lambda$ is the **null space** of $A - \\lambda I$: the line that gets crushed.',
          asides: [{ label: 'Quick check', text: 'Eigenvalues add up to the trace ($1 + 3 = 2 + 2$) and multiply to the determinant ($1 \\times 3 = 3$). Use this to catch slips in the exam.' }],
        },
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'The squash test, as a proof',
          body: 'Exams love this theorem: "$\\lambda$ is an eigenvalue of $A$ if and only if $|A - \\lambda I| = 0$". You already know why. Let’s just walk it slowly.',
          graph: {
            steps: [
              { say: 'Start from what an eigenvalue **is**: $\\lambda$ is an eigenvalue exactly when some arrow $v \\neq 0$ is only stretched, $Av = \\lambda v$. Here $v = (1, 1)$, $\\lambda = 3$.' },
              { say: 'Bring everything to one side. Since $\\lambda v$ is the same as $\\lambda I v$, the statement $Av = \\lambda v$ is the same as $(A - \\lambda I)v = 0$.' },
              { say: 'Now look at what $A - \\lambda I$ does to $v$: it crushes it to $0$.', action: { label: 'Apply A − 3I' } },
              { say: 'A matrix that crushes a **nonzero** arrow to $0$ has squashed the plane: it can’t be undone, it is ==singular==.' },
              { say: 'And squashed means zero area: $|A - \\lambda I| = 0$. Every link went both ways, so $\\lambda$ is an eigenvalue $\\iff |A - \\lambda I| = 0$. That’s the whole proof.' },
            ],
            draw: (step, presses) => {
              const crushed = step > 2 || (step === 2 && presses > 0);
              const items = [{ id: 'v', vec: [1, 1], kind: 'e', label: crushed ? '' : step >= 1 ? 'λv = Av' : 'v' }];
              if (step <= 1) items.push({ id: 'g', vec: [1, 1], kind: 's', fixed: true, o: 0.5 });
              return { M: crushed ? minusL(A, 3) : step >= 1 ? A : ID, R: 4, items, note: crushed ? '$(A - 3I)v = 0$, $\\;|A - 3I| = 0$' : undefined };
            },
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove: $\\lambda$ is an eigenvalue of $A \\in M_n(\\mathbb F)$ if and only if $|A - \\lambda I_n| = 0$. Put the lines in the order you watched.',
          items: [
            '$\\lambda$ is an eigenvalue of $A$ $\\iff$ there is $v \\neq 0$ with $Av = \\lambda v$.',
            '$\\iff Av - \\lambda I_n v = 0$ for some $v \\neq 0$.',
            '$\\iff (A - \\lambda I_n)v = 0$ has a nonzero solution.',
            '$\\iff A - \\lambda I_n$ is singular.',
            '$\\iff |A - \\lambda I_n| = 0$. ∎',
          ],
        },
        {
          type: 'custom',
          widget: 'calc',
          eyebrow: 'Your turn',
          title: 'Find the eigenvalues and eigenvectors of $B = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$.',
          body: 'Work it on paper first, then enter each step. A wrong step shows a hint.',
          graph: {
            steps: [
              { ask: '$\\operatorname{tr} B = $', answer: 7, tol: 0, hint: 'Add the diagonal: $4 + 3$.' },
              { ask: '$\\det B = $', answer: 10, tol: 0, hint: '$4 \\cdot 3 - 1 \\cdot 2$.' },
              { ask: 'So $|B - \\lambda I| = \\lambda^2 - 7\\lambda + 10$. Larger eigenvalue $= $', answer: 5, tol: 0, hint: 'Factorise: $(\\lambda - 5)(\\lambda - 2)$.' },
              { ask: 'Smaller eigenvalue $= $', answer: 2, tol: 0, hint: 'The roots are $5$ and $2$.' },
              { ask: 'For $\\lambda = 5$, an eigenvector is $(1, y)$ with $y = $', answer: 1, tol: 0, hint: '$B - 5I = \\begin{pmatrix} -1 & 1 \\\\ 2 & -2 \\end{pmatrix}$: $-x + y = 0$.' },
              { ask: 'For $\\lambda = 2$, an eigenvector is $(1, y)$ with $y = $', answer: -2, tol: 0, hint: '$B - 2I = \\begin{pmatrix} 2 & 1 \\\\ 2 & 1 \\end{pmatrix}$: $2x + y = 0$.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'The eigenvalues of $\\begin{pmatrix} 5 & 0 & 0 \\\\ 2 & -1 & 0 \\\\ 7 & 3 & 4 \\end{pmatrix}$ are',
          options: [
            { text: '$5, -1, 4$', correct: true, why: 'Triangular, so $|A - \\lambda I| = (5 - \\lambda)(-1 - \\lambda)(4 - \\lambda)$: the diagonal entries.' },
            { text: '$5, 2, 7$', why: 'That is the first column. For a triangular matrix read the **diagonal**.' },
            { text: '$8$ only', why: '$8$ is the trace, the **sum** of the eigenvalues.' },
            { text: '$-20$ only', why: '$-20$ is the determinant, the **product** of the eigenvalues.' },
          ],
        },
      ],
    },
    {
      name: 'Powers and why it matters',
      terms: [
        ['Powers', 'If $Av = \\lambda v$ then $A^k v = \\lambda^k v$: same eigenvector, eigenvalue $\\lambda^k$.'],
        ['Polynomials', 'More generally $p(A)v = p(\\lambda)v$, e.g. $(A^3 - A)v = (\\lambda^3 - \\lambda)v$.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'plane',
          eyebrow: 'Why is that true?',
          title: 'Apply it twice',
          body: 'If $A$ stretches an arrow by $3$, what does $A$ applied twice do to it? Guess first, then watch.',
          graph: {
            steps: [
              { say: 'Take the eigenvector $v$ along $(1, 1)$, with $Av = 3v$.' },
              { say: 'Apply $A$ once: $v$ stays on its line and becomes $3$ times longer.', action: { label: 'Apply A' } },
              { say: 'Apply $A$ again. It’s still on the same line, so $A$ treats it the same way: another $\\times 3$. In symbols: $A^2v = A(Av) = A(3v) = 3(Av) = 3 \\cdot 3v = 9v$.', action: { label: 'Apply A again' } },
              { say: 'Nothing special about $3$ or about "twice". Each extra $A$ just multiplies by $\\lambda$ again (that is the induction step: $A^{k+1}v = A(\\lambda^k v) = \\lambda^k Av = \\lambda^{k+1} v$). So $A^k v = \\lambda^k v$: same eigenvector, eigenvalue $\\lambda^k$. That’s the proof.' },
            ],
            draw: (step, presses) => {
              const n = step >= 2 && presses >= 2 ? 2 : step >= 1 && presses >= 1 ? 1 : 0;
              return {
                M: n === 2 ? A2 : n === 1 ? A : ID,
                R: 5,
                items: [{ id: 'line', span: [1, 1], kind: 'e', fixed: true, o: 0.5 }, { id: 'v', vec: [0.5, 0.5], kind: 'e', label: ['v', '3v', '9v'][n] }],
                note: `$\\times ${[1, 3, 9][n]}$`,
              };
            },
          },
        },
        {
          type: 'order',
          eyebrow: 'Now say it the exam way',
          prompt: 'Prove: if $\\lambda$ is an eigenvalue of $T: V \\to V$, then $\\lambda^k$ is an eigenvalue of $T^k$ for every $k \\in \\mathbb N$.',
          items: [
            'Let $v \\neq 0$ with $T(v) = \\lambda v$.',
            'Then $T^2(v) = T(T(v)) = T(\\lambda v) = \\lambda T(v) = \\lambda^2 v$.',
            'Suppose $T^k(v) = \\lambda^k v$. Then $T^{k+1}(v) = T(\\lambda^k v) = \\lambda^k T(v) = \\lambda^{k+1} v$.',
            'By induction $T^k(v) = \\lambda^k v$ with $v \\neq 0$, so $\\lambda^k$ is an eigenvalue of $T^k$. ∎',
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Exam style',
          prompt: 'If $2$ is an eigenvalue of $A$, which number must be an eigenvalue of $A^3 - A$?',
          options: [
            { text: '$6$', correct: true, why: 'Same eigenvector $v$: $(A^3 - A)v = 2^3v - 2v = 6v$.' },
            { text: '$8$', why: 'That is for $A^3$ alone. Subtract the $Av = 2v$ part.' },
            { text: '$2$', why: 'Apply the polynomial to $\\lambda$: $2^3 - 2$.' },
            { text: '$4$', why: 'Compute $\\lambda^3 - \\lambda$ with $\\lambda = 2$.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Why it matters',
          title: 'Where eigenvectors take us next',
          cards: [
            { title: 'Easy powers (Ch 3)', text: 'Along eigenvectors, $A^{100}$ is just "stretch by $\\lambda^{100}$". Diagonalization turns that into a formula for $A^k$.' },
            { title: 'The natural axes (Ch 3)', text: 'Use the eigenvectors as your grid and $A$ becomes pure stretching: the diagonal matrix $\\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$.' },
            { title: 'Symmetric matrices (Ch 4–5)', text: 'Notice $(1, 1) \\perp (-1, 1)$? For symmetric matrices the eigen-directions are always perpendicular: the principal axes of an ellipse.' },
            { title: 'When they run out (Ch 6)', text: 'The shear has too few eigen-directions to make a grid. Jordan form is the best we can do then.' },
          ],
        },
        {
          type: 'finish',
          title: 'Eigenvectors and eigenvalues: done.',
          body: 'Key ideas, ready for revision:',
        },
      ],
    },
  ],
};
