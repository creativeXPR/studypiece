// MTH 205 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MTH 205",
  "updated": "2026-11-06",
  "title": "Linear Algebra II",
  "sets": [
    {
      "id": "QS001",
      "title": "Matrices as motions",
      "questions": [
        {
          "question": "The first column of a $2 \\times 2$ matrix $A$ is",
          "options": [
            "where $A$ sends $\\hat\\jmath$",
            "where $A$ sends $\\hat\\imath$",
            "the first coordinate of every output",
            "the area scale factor"
          ],
          "answer": 1,
          "explanation": "Column $j$ is the image of the $j$-th basis vector."
        },
        {
          "question": "A transformation is linear when, in pictures,",
          "options": [
            "every vector keeps its length",
            "every vector keeps its direction",
            "grid lines stay straight, parallel and evenly spaced, and the origin stays fixed",
            "the plane is never squashed"
          ],
          "answer": 2,
          "explanation": "That is $T(u + v) = T(u) + T(v)$ and $T(ku) = kT(u)$ drawn."
        },
        {
          "question": "$\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} = $",
          "options": [
            "$\\begin{pmatrix} 4 \\\\ 5 \\end{pmatrix}$",
            "$\\begin{pmatrix} 5 \\\\ 4 \\end{pmatrix}$",
            "$\\begin{pmatrix} 3 \\\\ 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 4 \\\\ 1 \\end{pmatrix}$"
          ],
          "answer": 1,
          "explanation": "$2\\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} + 1\\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$."
        },
        {
          "question": "The matrix that rotates the plane a quarter turn anticlockwise is",
          "options": [
            "$\\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}$",
            "$\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$"
          ],
          "answer": 2,
          "explanation": "$\\hat\\imath \\to (0, 1)$, $\\hat\\jmath \\to (-1, 0)$."
        },
        {
          "question": "The determinant of a $2 \\times 2$ matrix measures",
          "options": [
            "the factor by which it scales every area",
            "the length of its first column",
            "the angle it rotates through",
            "the number of its nonzero entries"
          ],
          "answer": 0,
          "explanation": "A negative sign means the plane is also flipped."
        },
        {
          "question": "$\\det A = 0$ means",
          "options": [
            "$A$ squashes the plane onto a line or a point",
            "$A$ rotates the plane",
            "$A$ flips the plane",
            "$A$ is the identity"
          ],
          "answer": 0,
          "explanation": "Zero area: some nonzero vector is crushed to $0$."
        },
        {
          "question": "$\\det\\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix} = -3$ tells us the transformation",
          "options": [
            "triples areas and flips orientation",
            "shrinks areas to a third",
            "squashes the plane",
            "rotates by $3$ radians"
          ],
          "answer": 0,
          "explanation": "Size $3$, sign negative."
        },
        {
          "question": "$\\det\\begin{pmatrix} 4 & 6 \\\\ 2 & 3 \\end{pmatrix} = $",
          "options": [
            "$0$",
            "$24$",
            "$-24$",
            "$12$"
          ],
          "answer": 0,
          "explanation": "The columns are parallel: $(6, 3) = \\frac32(4, 2)$."
        },
        {
          "question": "A region of area $3$ is moved by a matrix with determinant $-4$. The image has area",
          "options": [
            "$-12$",
            "$12$",
            "$7$",
            "$\\frac34$"
          ],
          "answer": 1,
          "explanation": "Area scales by $|\\det| = 4$."
        },
        {
          "question": "The product $AB$ means",
          "options": [
            "apply $B$ first, then $A$",
            "apply $A$ first, then $B$",
            "apply $A$ and $B$ at the same time",
            "average the two motions"
          ],
          "answer": 0,
          "explanation": "Read right to left, like $f(g(x))$."
        },
        {
          "question": "For square matrices, $\\det(AB) = $",
          "options": [
            "$\\det A + \\det B$",
            "$\\det(BA)^{-1}$",
            "$\\det A \\cdot \\det B$",
            "$\\det A - \\det B$"
          ],
          "answer": 2,
          "explanation": "Area factors multiply."
        },
        {
          "question": "In general, matrix multiplication is",
          "options": [
            "commutative",
            "only defined for diagonal matrices",
            "not commutative: $AB \\neq BA$",
            "the same as adding entries"
          ],
          "answer": 2,
          "explanation": "A turn then a shear differs from a shear then a turn."
        },
        {
          "question": "$A^{-1}$ exists exactly when",
          "options": [
            "$\\det A = 0$",
            "$A$ is symmetric",
            "every entry of $A$ is nonzero",
            "$\\det A \\neq 0$"
          ],
          "answer": 3,
          "explanation": "A squash can’t be undone."
        },
        {
          "question": "$\\begin{pmatrix} 3 & 1 \\\\ 5 & 2 \\end{pmatrix}^{-1} = $",
          "options": [
            "$\\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} -2 & 1 \\\\ 5 & -3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & -1 \\\\ -5 & 3 \\end{pmatrix}$"
          ],
          "answer": 3,
          "explanation": "$\\det = 1$: swap $a, d$, negate $b, c$."
        },
        {
          "question": "$(AB)^{-1} = $",
          "options": [
            "$B^{-1}A^{-1}$",
            "$A^{-1}B^{-1}$",
            "$AB^{-1}$",
            "$(BA)^{-1}$ only if $A = B$"
          ],
          "answer": 0,
          "explanation": "Undo the last motion first."
        },
        {
          "question": "$(AB)^T = $",
          "options": [
            "$A^TB^T$",
            "$AB$",
            "$B^TA^T$",
            "$(A^T)^{-1}B^T$"
          ],
          "answer": 2,
          "explanation": "Transposes reverse the order, like inverses."
        },
        {
          "question": "If $\\det A = 5$ then $\\det(A^{-1}) = $",
          "options": [
            "$5$",
            "$\\frac15$",
            "$-5$",
            "$25$"
          ],
          "answer": 1,
          "explanation": "$\\det A\\det A^{-1} = \\det I = 1$."
        },
        {
          "question": "The set of invertible $n \\times n$ matrices over $\\mathbb F$ is denoted",
          "options": [
            "$GL_n(\\mathbb F)$",
            "$M_n(\\mathbb F)$",
            "$O_n(\\mathbb F)$",
            "$\\mathcal B(V)$"
          ],
          "answer": 0,
          "explanation": "The general linear group."
        },
        {
          "question": "The shear $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$ has determinant",
          "options": [
            "$0$",
            "$2$",
            "$-1$",
            "$1$: it slants squares but keeps their area"
          ],
          "answer": 3,
          "explanation": "$1 \\cdot 1 - 1 \\cdot 0$."
        },
        {
          "question": "A linear map $T: \\mathbb R^2 \\to \\mathbb R^2$ is completely determined by",
          "options": [
            "$T(0)$",
            "$T(\\hat\\imath)$ alone",
            "$T(\\hat\\imath)$ and $T(\\hat\\jmath)$",
            "its determinant"
          ],
          "answer": 2,
          "explanation": "$T(x\\hat\\imath + y\\hat\\jmath) = xT(\\hat\\imath) + yT(\\hat\\jmath)$."
        },
        {
          "question": "In proving $T(x\\hat\\imath + y\\hat\\jmath) = xT(\\hat\\imath) + yT(\\hat\\jmath)$, the two properties used are",
          "options": [
            "symmetry and positivity",
            "associativity and commutativity",
            "invertibility and orthogonality",
            "additivity and homogeneity"
          ],
          "answer": 3,
          "explanation": "Linearity = keeps sums and keeps scaling."
        },
        {
          "question": "$\\det(kA)$ for a $2 \\times 2$ matrix equals",
          "options": [
            "$k\\det A$",
            "$k^2\\det A$",
            "$\\det A$",
            "$2k\\det A$"
          ],
          "answer": 1,
          "explanation": "Each of the two dimensions is stretched by $k$."
        },
        {
          "question": "The matrix $\\begin{pmatrix} 3 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
          "options": [
            "rotates by $30°$",
            "shears the plane",
            "squashes the plane",
            "stretches horizontally by $3$ and leaves vertical lengths alone"
          ],
          "answer": 3,
          "explanation": "$\\hat\\imath \\to 3\\hat\\imath$, $\\hat\\jmath \\to \\hat\\jmath$."
        },
        {
          "question": "$\\det A^T = $",
          "options": [
            "$-\\det A$",
            "$\\frac{1}{\\det A}$",
            "$(\\det A)^2$",
            "$\\det A$"
          ],
          "answer": 3,
          "explanation": "Transposing doesn’t change the determinant."
        },
        {
          "question": "Which matrix flips the plane over the $x$-axis?",
          "options": [
            "$\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
            "$\\begin{pmatrix} -1 & 0 \\\\ 0 & -1 \\end{pmatrix}$"
          ],
          "answer": 1,
          "explanation": "$\\hat\\imath$ stays, $\\hat\\jmath \\to -\\hat\\jmath$."
        }
      ]
    },
    {
      "id": "QS002",
      "title": "Systems of linear equations",
      "questions": [
        {
          "question": "A system $AX = 0$ is called",
          "options": [
            "non-homogeneous",
            "inconsistent",
            "homogeneous",
            "augmented"
          ],
          "answer": 2,
          "explanation": "All constants are zero."
        },
        {
          "question": "A homogeneous system is always consistent because",
          "options": [
            "$X = 0$ is always a solution",
            "its determinant is nonzero",
            "it has more unknowns than equations",
            "its rank equals $n$"
          ],
          "answer": 0,
          "explanation": "The trivial solution."
        },
        {
          "question": "The solutions of $AX = 0$ are, geometrically,",
          "options": [
            "all outputs of $A$",
            "the columns of $A$",
            "the eigenvalues of $A$",
            "the vectors $A$ crushes to $0$ (the null space)"
          ],
          "answer": 3,
          "explanation": "Also called the solution space or kernel."
        },
        {
          "question": "A homogeneous system in $n$ unknowns with coefficient rank $r$ has a solution space of dimension",
          "options": [
            "$n - r$",
            "$r$",
            "$n$",
            "$n + r$"
          ],
          "answer": 0,
          "explanation": "Dimensions in = survive ($r$) + crushed ($n - r$)."
        },
        {
          "question": "If $r = n$ in a homogeneous system, then",
          "options": [
            "there are infinitely many solutions",
            "there is no solution",
            "only the trivial solution exists",
            "there are exactly $n$ solutions"
          ],
          "answer": 2,
          "explanation": "No free variables."
        },
        {
          "question": "A homogeneous system with $3$ equations and $5$ unknowns",
          "options": [
            "has only the trivial solution",
            "may be inconsistent",
            "always has a non-trivial solution",
            "has exactly one solution"
          ],
          "answer": 2,
          "explanation": "$r \\le 3 < 5$."
        },
        {
          "question": "A basis of the solution space of $x + y + z + w = 0$, $2x + 3y - z + w = 0$, $3x + 4y + 2w = 0$ is",
          "options": [
            "$\\{(1, 1, 1, 1)\\}$",
            "$\\{(-4, 3, 1, 0)\\}$",
            "$\\{(-4, 3, 1, 0), (-2, 1, 0, 1)\\}$",
            "$\\{(4, -3, 1, 0), (2, -1, 0, 1)\\}$"
          ],
          "answer": 2,
          "explanation": "Rank $2$, free $z, w$: $y = 3z + w$, $x = -4z - 2w$."
        },
        {
          "question": "$x + 2y - z = 0$, $2x + 5y + z = 0$, $x + 3y + 2z = 0$ has solution space spanned by",
          "options": [
            "$(1, 1, 1)$",
            "$(-7, 3, 0)$",
            "$(0, 0, 0)$ only",
            "$(7, -3, 1)$"
          ],
          "answer": 3,
          "explanation": "Rank $2$: $y = -3z$, $x = -2y + z = 7z$."
        },
        {
          "question": "The augmented matrix of $AX = B$ is",
          "options": [
            "$A^T$",
            "$(A|B)$",
            "$(B|A)$",
            "$A^{-1}B$"
          ],
          "answer": 1,
          "explanation": "$A$ with the column $B$ attached."
        },
        {
          "question": "$AX = B$ is consistent if and only if",
          "options": [
            "$\\operatorname{rank}A = \\operatorname{rank}(A|B)$",
            "$\\operatorname{rank}A < \\operatorname{rank}(A|B)$",
            "$\\det A = 0$",
            "$B = 0$"
          ],
          "answer": 0,
          "explanation": "$B$ adds no new direction: it is in the column space."
        },
        {
          "question": "Geometrically, $AX = B$ has a solution exactly when",
          "options": [
            "$B$ lies in the column space of $A$",
            "$B$ lies in the null space of $A$",
            "$B$ is an eigenvector of $A$",
            "$B$ is perpendicular to the columns of $A$"
          ],
          "answer": 0,
          "explanation": "The column space is everything $A$ can reach."
        },
        {
          "question": "If $X_p$ solves $AX = B$, every solution has the form",
          "options": [
            "$X_p \\cdot X_h$",
            "$X_p + X_h$ with $AX_h = 0$",
            "$kX_p$",
            "$X_p - B$"
          ],
          "answer": 1,
          "explanation": "$A(X - X_p) = B - B = 0$."
        },
        {
          "question": "A system with two different solutions has",
          "options": [
            "exactly two solutions",
            "infinitely many solutions",
            "no other solutions",
            "a unique solution after all"
          ],
          "answer": 1,
          "explanation": "$X_p + t(X_1 - X_2)$ works for all $t$."
        },
        {
          "question": "In echelon form, a row $(0 \\; 0 \\; 0 \\mid 5)$ shows the system is",
          "options": [
            "consistent with a unique solution",
            "homogeneous",
            "consistent with infinitely many solutions",
            "inconsistent"
          ],
          "answer": 3,
          "explanation": "It says $0 = 5$."
        },
        {
          "question": "For $kx + y + z = 1$, $x + ky + z = 1$, $x + y + kz = 1$, $\\det A = $",
          "options": [
            "$(k - 1)^2(k + 2)$",
            "$(k + 1)^2(k - 2)$",
            "$k^3 - 1$",
            "$(k - 1)(k + 2)$"
          ],
          "answer": 0,
          "explanation": "Expand and factor."
        },
        {
          "question": "In that system, $k = -2$ gives",
          "options": [
            "a unique solution",
            "infinitely many solutions",
            "no solution",
            "the trivial solution"
          ],
          "answer": 2,
          "explanation": "Rows of $A$ add to $0$ but the right sides add to $3$."
        },
        {
          "question": "In that system, $k = 1$ gives",
          "options": [
            "infinitely many solutions",
            "no solution",
            "a unique solution",
            "exactly three solutions"
          ],
          "answer": 0,
          "explanation": "All three equations are $x + y + z = 1$."
        },
        {
          "question": "$x + y + z = 6$, $x + 2y + 3z = 10$, $x + 2y + \\lambda z = \\mu$ has no solution when",
          "options": [
            "$\\lambda \\neq 3$",
            "$\\lambda = 3$, $\\mu \\neq 10$",
            "$\\lambda = 3$, $\\mu = 10$",
            "$\\mu = 0$"
          ],
          "answer": 1,
          "explanation": "The last echelon row is $(0, 0, \\lambda - 3 \\mid \\mu - 10)$."
        },
        {
          "question": "If $|A| \\neq 0$, $AX = B$ has the unique solution",
          "options": [
            "$X = A^{-1}B$",
            "$X = BA^{-1}$",
            "$X = A^TB$",
            "$X = |A|B$"
          ],
          "answer": 0,
          "explanation": "Premultiply by $A^{-1}$."
        },
        {
          "question": "In proving uniqueness of $X = A^{-1}B$, from $AX_1 = AX_2$ one concludes $X_1 = X_2$ by",
          "options": [
            "postmultiplying by $A^{-1}$",
            "premultiplying by $A^{-1}$",
            "taking determinants",
            "transposing"
          ],
          "answer": 1,
          "explanation": "$A^{-1}AX_1 = A^{-1}AX_2$."
        },
        {
          "question": "$5x - y = 7$, $3x + 2y = 12$ has solution",
          "options": [
            "$x = 3$, $y = 2$",
            "$x = 1$, $y = -2$",
            "$x = 2$, $y = -3$",
            "$x = 2$, $y = 3$"
          ],
          "answer": 3,
          "explanation": "$|A| = 13$, $X = \\frac{1}{13}(26, 39)$."
        },
        {
          "question": "Cramer’s rule gives $x_i = $",
          "options": [
            "$\\frac{D}{D_i}$",
            "$\\frac{D_i}{D}$, with $D_i$ the determinant with column $i$ replaced by $B$",
            "$D_i - D$",
            "$\\frac{D_i}{D}$, with row $i$ replaced by $B$"
          ],
          "answer": 1,
          "explanation": "Replace the **column** of the unknown."
        },
        {
          "question": "Cramer’s rule cannot be used when",
          "options": [
            "$B$ has negative entries",
            "the system is $3 \\times 3$",
            "a solution is $0$",
            "$D = 0$"
          ],
          "answer": 3,
          "explanation": "You would divide by zero."
        },
        {
          "question": "For $2x - y + 3z = 2$, $x + 3y - z = 11$, $2x - 2y + 5z = 3$: $D = 9$ and $D_y = 45$, so $y = $",
          "options": [
            "$\\frac15$",
            "$-5$",
            "$5$",
            "$36$"
          ],
          "answer": 2,
          "explanation": "$\\frac{45}{9}$."
        },
        {
          "question": "Geometrically, Cramer’s rule works because",
          "options": [
            "determinants are always positive",
            "$A$ is orthogonal",
            "$B$ is an eigenvector",
            "the area built from the unknown vector is multiplied by $\\det A$ under the motion"
          ],
          "answer": 3,
          "explanation": "Area $y$ becomes $Dy$, which is also $D_y$."
        }
      ]
    },
    {
      "id": "QS003",
      "title": "Similar matrices and eigenvalues",
      "questions": [
        {
          "question": "$B$ is similar to $A$ if",
          "options": [
            "$B = P^TAP$ for some invertible $P$",
            "$AB = BA$",
            "$B = P^{-1}AP$ for some invertible $P$",
            "$B = A^T$"
          ],
          "answer": 2,
          "explanation": "Same transformation, different basis."
        },
        {
          "question": "Geometrically, similar matrices",
          "options": [
            "have the same entries",
            "describe the same linear transformation in different bases",
            "are always diagonal",
            "have the same eigenvectors"
          ],
          "answer": 1,
          "explanation": "$P$ translates between the two languages."
        },
        {
          "question": "Similarity is reflexive because",
          "options": [
            "$A = A^T$",
            "$A = A^{-1}$",
            "$A = I^{-1}AI$",
            "$\\det A = \\det A$"
          ],
          "answer": 2,
          "explanation": "No translation needed."
        },
        {
          "question": "If $B = P^{-1}AP$, then $A = $",
          "options": [
            "$P^{-1}BP$",
            "$P^TBP$",
            "$BP$",
            "$PBP^{-1}$"
          ],
          "answer": 3,
          "explanation": "Translate back: so similarity is symmetric."
        },
        {
          "question": "If $B = P^{-1}AP$ and $C = Q^{-1}BQ$, then $C = $",
          "options": [
            "$(QP)^{-1}A(QP)$",
            "$P^{-1}Q^{-1}AQP$",
            "$(PQ)^{-1}A(PQ)$",
            "$(PQ)A(PQ)^{-1}$"
          ],
          "answer": 2,
          "explanation": "Two translators in a row are one: transitivity."
        },
        {
          "question": "Similar matrices always have the same",
          "options": [
            "eigenvectors",
            "characteristic polynomial",
            "entries",
            "columns"
          ],
          "answer": 1,
          "explanation": "$|P^{-1}AP - \\lambda I| = |P^{-1}||A - \\lambda I||P|$."
        },
        {
          "question": "The key step showing similar matrices share the characteristic polynomial is",
          "options": [
            "$P^{-1}AP = A$",
            "$|P| = 1$",
            "$(P^{-1})^T = P$",
            "$P^{-1}AP - \\lambda I = P^{-1}(A - \\lambda I)P$"
          ],
          "answer": 3,
          "explanation": "$\\lambda I = P^{-1}(\\lambda I)P$."
        },
        {
          "question": "$A$ and $A^T$ have the same characteristic polynomial because",
          "options": [
            "$A^T = A$",
            "$A^T = A^{-1}$",
            "$|(A - \\lambda I)^T| = |A - \\lambda I|$",
            "$|A^T| = -|A|$"
          ],
          "answer": 2,
          "explanation": "And $(A - \\lambda I)^T = A^T - \\lambda I$."
        },
        {
          "question": "An eigenvector of $A$ is a vector $v$ that",
          "options": [
            "is sent to $0$",
            "is nonzero and only stretched by $A$: $Av = \\lambda v$",
            "has length $1$",
            "is perpendicular to $Av$"
          ],
          "answer": 1,
          "explanation": "It stays on its own line."
        },
        {
          "question": "Why must an eigenvector be nonzero?",
          "options": [
            "Because $A0 = \\lambda 0$ for every $\\lambda$, which would make every number an eigenvalue",
            "Because $0$ has no direction",
            "Because $\\det A \\neq 0$",
            "Because eigenvalues are nonzero"
          ],
          "answer": 0,
          "explanation": "The definition insists $v \\neq 0$."
        },
        {
          "question": "$\\lambda$ is an eigenvalue of $A$ iff",
          "options": [
            "$|A| = \\lambda$",
            "$A - \\lambda I$ is invertible",
            "$\\operatorname{tr}A = \\lambda$",
            "$|A - \\lambda I| = 0$"
          ],
          "answer": 3,
          "explanation": "$A - \\lambda I$ must crush some $v \\neq 0$."
        },
        {
          "question": "The eigenvalues of $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ are",
          "options": [
            "$1$ and $3$",
            "$2$ and $2$",
            "$2$ and $3$",
            "$-1$ and $3$"
          ],
          "answer": 0,
          "explanation": "$\\lambda^2 - 4\\lambda + 3$."
        },
        {
          "question": "An eigenvector of $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ for $\\lambda = 3$ is",
          "options": [
            "$(1, 1)$",
            "$(1, -1)$",
            "$(1, 0)$",
            "$(2, 1)$"
          ],
          "answer": 0,
          "explanation": "$A(1, 1) = (3, 3)$."
        },
        {
          "question": "The eigenvalues of $\\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$ are",
          "options": [
            "$5$ and $2$",
            "$4$ and $3$",
            "$7$ and $10$",
            "$6$ and $1$"
          ],
          "answer": 0,
          "explanation": "$\\lambda^2 - 7\\lambda + 10$."
        },
        {
          "question": "The eigenvalues of $\\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$ are",
          "options": [
            "$1$ and $2$",
            "$4$ and $-1$",
            "$3$ and $1$",
            "$-4$ and $1$"
          ],
          "answer": 1,
          "explanation": "$\\lambda^2 - 3\\lambda - 4$."
        },
        {
          "question": "For a $2 \\times 2$ matrix, $|A - \\lambda I| = $",
          "options": [
            "$\\lambda^2 + (\\operatorname{tr}A)\\lambda + \\det A$",
            "$\\lambda^2 - \\det A$",
            "$\\lambda^2 - (\\operatorname{tr}A)\\lambda + \\det A$",
            "$\\lambda - \\operatorname{tr}A$"
          ],
          "answer": 2,
          "explanation": "Sum of eigenvalues $=$ trace, product $=$ determinant."
        },
        {
          "question": "The eigenvalues of a triangular matrix are",
          "options": [
            "its first row",
            "its first column",
            "the row sums",
            "its diagonal entries"
          ],
          "answer": 3,
          "explanation": "$|A - \\lambda I|$ is the product of $(a_{ii} - \\lambda)$."
        },
        {
          "question": "The quarter-turn rotation $\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$ has",
          "options": [
            "no real eigenvalues",
            "eigenvalue $1$",
            "eigenvalue $0$",
            "every real number as an eigenvalue"
          ],
          "answer": 0,
          "explanation": "Every direction is turned; $\\lambda = \\pm i$."
        },
        {
          "question": "$0$ is an eigenvalue of $A$ iff",
          "options": [
            "$A$ is singular",
            "$A$ is invertible",
            "$A$ is symmetric",
            "$A = 0$"
          ],
          "answer": 0,
          "explanation": "$Av = 0$ for some $v \\neq 0$."
        },
        {
          "question": "The eigenspace $E_\\lambda$ is",
          "options": [
            "the column space of $A$",
            "the set of eigenvalues",
            "the span of the rows of $A$",
            "the null space of $A - \\lambda I$"
          ],
          "answer": 3,
          "explanation": "Solve $(A - \\lambda I)v = 0$."
        },
        {
          "question": "If $Av = \\lambda v$, then $A^kv = $",
          "options": [
            "$k\\lambda v$",
            "$\\lambda v$",
            "$\\lambda^kv$",
            "$\\lambda^kv^k$"
          ],
          "answer": 2,
          "explanation": "Each extra $A$ multiplies by $\\lambda$ again."
        },
        {
          "question": "If $2$ is an eigenvalue of $A$, then an eigenvalue of $A^2 + A$ is",
          "options": [
            "$4$",
            "$6$",
            "$2$",
            "$8$"
          ],
          "answer": 1,
          "explanation": "$4 + 2$."
        },
        {
          "question": "An $n \\times n$ matrix has, counted with multiplicity over $\\mathbb C$,",
          "options": [
            "at most $n - 1$",
            "exactly $n^2$",
            "at least $n + 1$",
            "exactly $n$ eigenvalues"
          ],
          "answer": 3,
          "explanation": "The characteristic polynomial has degree $n$."
        },
        {
          "question": "The eigenvalues of $\\begin{pmatrix} -1 & -1 & 1 \\\\ -4 & 2 & 4 \\\\ -1 & 1 & 5 \\end{pmatrix}$ are",
          "options": [
            "$-1, 2, 5$",
            "$-2, 2, 6$",
            "$1, 2, 3$",
            "$-2, -2, 6$"
          ],
          "answer": 1,
          "explanation": "Trace $6$, determinant $-24$."
        },
        {
          "question": "If $Av = \\lambda v$ and $B = P^{-1}AP$, an eigenvector of $B$ is",
          "options": [
            "$P^{-1}v$",
            "$Pv$",
            "$v$",
            "$P^Tv$"
          ],
          "answer": 0,
          "explanation": "$B(P^{-1}v) = P^{-1}Av = \\lambda P^{-1}v$."
        }
      ]
    },
    {
      "id": "QS004",
      "title": "Cayley–Hamilton and minimal polynomials",
      "questions": [
        {
          "question": "The Cayley–Hamilton theorem says",
          "options": [
            "every matrix is diagonalizable",
            "$\\det(AB) = \\det A\\det B$",
            "every eigenvalue is real",
            "every square matrix satisfies its own characteristic equation"
          ],
          "answer": 3,
          "explanation": "$P_A(A) = 0$."
        },
        {
          "question": "For $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, Cayley–Hamilton gives",
          "options": [
            "$A^2 + 4A + 3I = 0$",
            "$A^2 - 4A + 3I = 0$",
            "$A^2 - 3I = 0$",
            "$A^2 - 4A = 0$"
          ],
          "answer": 1,
          "explanation": "$P_A(\\lambda) = \\lambda^2 - 4\\lambda + 3$."
        },
        {
          "question": "Geometrically, $(A - I)(A - 3I) = 0$ for $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ because",
          "options": [
            "$A$ is the identity",
            "$A$ is singular",
            "$A$ is a rotation",
            "each factor crushes one eigen-direction, and together they crush everything"
          ],
          "answer": 3,
          "explanation": "$A - 3I$ flattens onto the $\\lambda = 1$ line; $A - I$ crushes that line."
        },
        {
          "question": "From $A^2 - 3A - 4I = 0$, $A^{-1} = $",
          "options": [
            "$\\frac14(A - 3I)$",
            "$\\frac14(3I - A)$",
            "$A - 3I$",
            "$\\frac13(A - 4I)$"
          ],
          "answer": 0,
          "explanation": "$A(A - 3I) = 4I$."
        },
        {
          "question": "From $A^2 = 3A + 4I$, $A^3 = $",
          "options": [
            "$13A + 12I$",
            "$9A + 4I$",
            "$3A^2 + 4$",
            "$12A + 13I$"
          ],
          "answer": 0,
          "explanation": "$A^3 = 3A^2 + 4A = 3(3A + 4I) + 4A$."
        },
        {
          "question": "For $A = \\begin{pmatrix} 3 & 1 \\\\ 2 & 2 \\end{pmatrix}$, $A^{-1} = \\frac14(5I - A) = $",
          "options": [
            "$\\frac14\\begin{pmatrix} 2 & 1 \\\\ 2 & 3 \\end{pmatrix}$",
            "$\\frac14\\begin{pmatrix} 2 & -1 \\\\ -2 & 3 \\end{pmatrix}$",
            "$\\frac14\\begin{pmatrix} 3 & -1 \\\\ -2 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & -1 \\\\ -2 & 3 \\end{pmatrix}$"
          ],
          "answer": 1,
          "explanation": "$P_A = \\lambda^2 - 5\\lambda + 4$."
        },
        {
          "question": "Why can’t you prove Cayley–Hamilton by putting $\\lambda = A$ into $|A - \\lambda I|$?",
          "options": [
            "That gives the number $|A - A| = 0$, but $P_A(A)$ is a matrix",
            "Because $A$ may be singular",
            "Because $\\lambda$ must be real",
            "It is a valid proof"
          ],
          "answer": 0,
          "explanation": "The adjugate proof compares coefficients instead."
        },
        {
          "question": "A polynomial is monic if",
          "options": [
            "its constant term is $1$",
            "all its coefficients are $1$",
            "it has degree $1$",
            "its leading coefficient is $1$"
          ],
          "answer": 3,
          "explanation": "E.g. $x^2 - 3x + 2$."
        },
        {
          "question": "Which polynomial is NOT monic?",
          "options": [
            "$x^3 + x^2 + 1$",
            "$2x + 1$",
            "$x^2 - 1$",
            "$x + 2$"
          ],
          "answer": 1,
          "explanation": "Its leading coefficient is $2$."
        },
        {
          "question": "The minimal polynomial of $A$ is",
          "options": [
            "the characteristic polynomial",
            "any polynomial with $m(A) = 0$",
            "the monic polynomial of least degree with $m(A) = 0$",
            "the polynomial of least degree with $m(0) = 0$"
          ],
          "answer": 2,
          "explanation": "Monic, least degree, kills $A$."
        },
        {
          "question": "The minimal polynomial always",
          "options": [
            "equals the characteristic polynomial",
            "has degree $n$",
            "divides the characteristic polynomial",
            "has only one root"
          ],
          "answer": 2,
          "explanation": "By Cayley–Hamilton and the division algorithm."
        },
        {
          "question": "In the proof that $m \\mid f$ whenever $f(A) = 0$, we write $f = mq + r$ and show",
          "options": [
            "$q(A) = 0$",
            "$m(A) \\neq 0$",
            "$\\deg r > \\deg m$",
            "$r(A) = 0$, so $r = 0$ by minimality"
          ],
          "answer": 3,
          "explanation": "A nonzero $r$ of smaller degree would contradict minimality."
        },
        {
          "question": "The minimal and characteristic polynomials have",
          "options": [
            "the same degree always",
            "no common factors",
            "the same irreducible factors",
            "opposite signs"
          ],
          "answer": 2,
          "explanation": "Every eigenvalue is a root of $m$."
        },
        {
          "question": "The minimal polynomial of $\\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$ is",
          "options": [
            "$(\\lambda - 1)^2(\\lambda - 4)$",
            "$\\lambda - 4$",
            "$(\\lambda - 1)(\\lambda - 4)$",
            "$(\\lambda - 2)^3$"
          ],
          "answer": 2,
          "explanation": "$(A - I)(A - 4I) = 0$ already."
        },
        {
          "question": "The minimal polynomial of $\\begin{pmatrix} 2 & 2 & -5 \\\\ 3 & 7 & -15 \\\\ 1 & 2 & -4 \\end{pmatrix}$ (characteristic $(\\lambda - 1)^2(\\lambda - 3)$) is",
          "options": [
            "$(\\lambda - 1)(\\lambda - 3)$",
            "$(\\lambda - 1)^2(\\lambda - 3)$",
            "$\\lambda - 3$",
            "$(\\lambda - 1)^2$"
          ],
          "answer": 0,
          "explanation": "$(A - I)(A - 3I) = 0$."
        },
        {
          "question": "If $P_A = (\\lambda - 2)^3(\\lambda + 1)$, which can NOT be the minimal polynomial?",
          "options": [
            "$(\\lambda - 2)(\\lambda + 1)$",
            "$(\\lambda - 2)^3$",
            "$(\\lambda - 2)^2(\\lambda + 1)$",
            "$(\\lambda - 2)^3(\\lambda + 1)$"
          ],
          "answer": 1,
          "explanation": "It misses the factor $\\lambda + 1$."
        },
        {
          "question": "The minimal polynomial of $I_n$ is",
          "options": [
            "$(\\lambda - 1)^n$",
            "$\\lambda - 1$",
            "$\\lambda$",
            "$\\lambda^n - 1$"
          ],
          "answer": 1,
          "explanation": "$I - I = 0$."
        },
        {
          "question": "The minimal polynomial of the shear $\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$ is",
          "options": [
            "$\\lambda - 2$",
            "$(\\lambda - 2)(\\lambda + 2)$",
            "$\\lambda^2$",
            "$(\\lambda - 2)^2$"
          ],
          "answer": 3,
          "explanation": "$A - 2I \\neq 0$ but $(A - 2I)^2 = 0$."
        },
        {
          "question": "If $m(\\lambda) = \\lambda^2 - 4\\lambda + 3$, then $A^3$ reduces to",
          "options": [
            "$13A - 12I$",
            "$4A - 3I$",
            "$16A - 9I$",
            "$A + 12I$"
          ],
          "answer": 0,
          "explanation": "$\\lambda^3 = (\\lambda + 4)m(\\lambda) + 13\\lambda - 12$."
        },
        {
          "question": "If the constant term of $m(\\lambda)$ is nonzero, then",
          "options": [
            "$A$ is singular",
            "$A$ is invertible",
            "$A$ is diagonal",
            "$A$ is nilpotent"
          ],
          "answer": 1,
          "explanation": "$0$ is not a root, so $0$ is not an eigenvalue."
        },
        {
          "question": "A matrix is diagonalizable iff its minimal polynomial",
          "options": [
            "equals its characteristic polynomial",
            "has degree $1$",
            "has a nonzero constant term",
            "has no repeated factors (and splits)"
          ],
          "answer": 3,
          "explanation": "Each $A - \\lambda I$ kills its eigenspace in one go."
        },
        {
          "question": "Verifying Cayley–Hamilton for $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$: $A^2 = $",
          "options": [
            "$\\begin{pmatrix} 7 & 6 \\\\ 9 & 10 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 4 \\\\ 9 & 4 \\end{pmatrix}$",
            "$\\begin{pmatrix} 7 & 9 \\\\ 6 & 10 \\end{pmatrix}$",
            "$\\begin{pmatrix} 5 & 6 \\\\ 9 & 8 \\end{pmatrix}$"
          ],
          "answer": 0,
          "explanation": "Then $A^2 - 3A - 4I = 0$."
        },
        {
          "question": "In the adjugate proof of Cayley–Hamilton, the starting identity is",
          "options": [
            "$(A - \\lambda I)\\operatorname{adj}(A - \\lambda I) = P_A(\\lambda)I$",
            "$A\\operatorname{adj}A = I$",
            "$\\det(A - \\lambda I) = 0$",
            "$A^n = 0$"
          ],
          "answer": 0,
          "explanation": "$M\\operatorname{adj}M = |M|I$ with $M = A - \\lambda I$."
        },
        {
          "question": "A minimal polynomial of degree $1$, $m = \\lambda - c$, means",
          "options": [
            "$A = 0$",
            "$A$ is a Jordan block",
            "$A = cI$",
            "$A$ has $n$ distinct eigenvalues"
          ],
          "answer": 2,
          "explanation": "$A - cI = 0$."
        },
        {
          "question": "If $m_A(\\lambda) = \\lambda^2$, then $A$",
          "options": [
            "is invertible",
            "is the identity",
            "is nonzero but $A^2 = 0$ (nilpotent)",
            "is zero"
          ],
          "answer": 2,
          "explanation": "$\\lambda$ alone does not kill $A$."
        }
      ]
    },
    {
      "id": "QS005",
      "title": "Diagonalization",
      "questions": [
        {
          "question": "$A$ is diagonalizable if",
          "options": [
            "it is diagonal",
            "its determinant is nonzero",
            "it is symmetric",
            "it is similar to a diagonal matrix"
          ],
          "answer": 3,
          "explanation": "$P^{-1}AP = D$ for some invertible $P$."
        },
        {
          "question": "An $n \\times n$ matrix is diagonalizable iff it has",
          "options": [
            "$n$ linearly independent eigenvectors",
            "$n$ distinct eigenvalues",
            "nonzero determinant",
            "a symmetric form"
          ],
          "answer": 0,
          "explanation": "They become the columns of $P$."
        },
        {
          "question": "In $P^{-1}AP = D$, the columns of $P$ are",
          "options": [
            "eigenvalues of $A$",
            "eigenvectors of $A$",
            "rows of $A$",
            "columns of $D$"
          ],
          "answer": 1,
          "explanation": "$AP = PD$ column by column: $AP_i = \\lambda_iP_i$."
        },
        {
          "question": "In $P^{-1}AP = D$, the diagonal of $D$ holds",
          "options": [
            "the eigenvectors",
            "the diagonal of $A$",
            "the eigenvalues in increasing order always",
            "the eigenvalues, in the order of the columns of $P$"
          ],
          "answer": 3,
          "explanation": "Column $i$ of $P$ goes with $D_{ii}$."
        },
        {
          "question": "$AP = PD$ is equivalent to $P^{-1}AP = D$ because",
          "options": [
            "$P$ is invertible",
            "$D$ is diagonal",
            "$A$ is invertible",
            "$P$ is orthogonal"
          ],
          "answer": 0,
          "explanation": "Multiply on the left by $P^{-1}$."
        },
        {
          "question": "If $P^{-1}AP = D$ then $A^k = $",
          "options": [
            "$P^kDP^{-k}$",
            "$PD^kP^{-1}$",
            "$D^k$",
            "$P^{-1}D^kP$"
          ],
          "answer": 1,
          "explanation": "The translators cancel in pairs."
        },
        {
          "question": "Geometrically, diagonalizing $A$ means",
          "options": [
            "choosing the eigenvectors as a grid, in which $A$ only stretches",
            "rotating $A$ until it is symmetric",
            "removing the off-diagonal entries of $A$",
            "finding the inverse of $A$"
          ],
          "answer": 0,
          "explanation": "In the eigen-grid, every grid line maps to itself."
        },
        {
          "question": "Eigenvectors belonging to distinct eigenvalues are",
          "options": [
            "orthogonal",
            "equal",
            "linearly independent",
            "zero"
          ],
          "answer": 2,
          "explanation": "Orthogonal only for symmetric matrices."
        },
        {
          "question": "An $n \\times n$ matrix with $n$ distinct eigenvalues is",
          "options": [
            "never diagonalizable",
            "always diagonalizable",
            "diagonalizable only if symmetric",
            "singular"
          ],
          "answer": 1,
          "explanation": "$n$ independent eigenvectors."
        },
        {
          "question": "The geometric multiplicity of $\\lambda$ is",
          "options": [
            "its multiplicity as a root of $P_A$",
            "$\\dim E_\\lambda = n - \\operatorname{rank}(A - \\lambda I)$",
            "$\\operatorname{rank}(A - \\lambda I)$",
            "always equal to $1$"
          ],
          "answer": 1,
          "explanation": "The number of independent eigenvectors for $\\lambda$."
        },
        {
          "question": "For every eigenvalue,",
          "options": [
            "GM $>$ AM",
            "GM $=$ AM always",
            "$1 \\le$ GM $\\le$ AM",
            "GM $= 0$ is possible"
          ],
          "answer": 2,
          "explanation": "An eigenvalue has at least one eigenvector."
        },
        {
          "question": "$A$ is diagonalizable iff its characteristic polynomial splits and",
          "options": [
            "all eigenvalues are distinct",
            "all eigenvalues are positive",
            "$\\det A \\neq 0$",
            "GM $=$ AM for every eigenvalue"
          ],
          "answer": 3,
          "explanation": "Then the eigenvectors fill the space."
        },
        {
          "question": "The shear $\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$ is not diagonalizable because",
          "options": [
            "its determinant is $4$",
            "it has no eigenvalues",
            "$\\lambda = 2$ has AM $= 2$ but GM $= 1$",
            "it is upper triangular"
          ],
          "answer": 2,
          "explanation": "Only the $x$-axis stays on its line."
        },
        {
          "question": "$\\begin{pmatrix} 1 & 0 & 0 \\\\ 1 & 2 & 0 \\\\ -3 & 5 & 2 \\end{pmatrix}$ is",
          "options": [
            "not diagonalizable: $\\operatorname{rank}(A - 2I) = 2$, so GM$(2) = 1 <$ AM $= 2$",
            "diagonalizable: it is triangular",
            "diagonalizable: its eigenvalues are $1, 2, 2$",
            "not diagonalizable: it is singular"
          ],
          "answer": 0,
          "explanation": "Only $2$ independent eigenvectors in $\\mathbb R^3$."
        },
        {
          "question": "$\\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix}$ is diagonalizable because",
          "options": [
            "GM$(1) = 2 =$ AM$(1)$ and GM$(4) = 1 =$ AM$(4)$",
            "its eigenvalues are distinct",
            "its determinant is $4$",
            "it is not diagonalizable"
          ],
          "answer": 0,
          "explanation": "$B - I$ has rank $1$."
        },
        {
          "question": "The eigenvalues of $\\begin{pmatrix} -1 & 4 & -2 \\\\ -3 & 4 & 0 \\\\ -3 & 1 & 3 \\end{pmatrix}$ are",
          "options": [
            "$-1, 4, 3$",
            "$1, 1, 4$",
            "$0, 2, 4$",
            "$1, 2, 3$"
          ],
          "answer": 3,
          "explanation": "Trace $6$, determinant $6$."
        },
        {
          "question": "For that matrix, an eigenvector for $\\lambda = 2$ is",
          "options": [
            "$(2, 3, 3)$",
            "$(1, 1, 1)$",
            "$(1, 3, 4)$",
            "$(2, 1, 0)$"
          ],
          "answer": 0,
          "explanation": "$A(2, 3, 3) = (4, 6, 6)$."
        },
        {
          "question": "For $B = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$, a diagonalizing $P$ is",
          "options": [
            "$\\begin{pmatrix} 1 & 1 \\\\ 1 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 5 & 0 \\\\ 0 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 1 \\\\ 1 & -2 \\end{pmatrix}$"
          ],
          "answer": 3,
          "explanation": "Eigenvectors $(1, 1)$ for $5$ and $(1, -2)$ for $2$."
        },
        {
          "question": "For $B = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$, the top-left entry of $B^5$ is",
          "options": [
            "$1024$",
            "$3125$",
            "$2094$",
            "$1031$"
          ],
          "answer": 2,
          "explanation": "$\\frac{2 \\cdot 5^5 + 2^5}{3}$."
        },
        {
          "question": "For $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 2 \\end{pmatrix}$, $A^3 = $",
          "options": [
            "$\\begin{pmatrix} 1 & 8 \\\\ 27 & 8 \\end{pmatrix}$",
            "$\\begin{pmatrix} 7 & 6 \\\\ 9 & 10 \\end{pmatrix}$",
            "$\\begin{pmatrix} 25 & 26 \\\\ 39 & 38 \\end{pmatrix}$",
            "$\\begin{pmatrix} 64 & 0 \\\\ 0 & -1 \\end{pmatrix}$"
          ],
          "answer": 2,
          "explanation": "$PD^3P^{-1}$ with $D = \\operatorname{diag}(4, -1)$."
        },
        {
          "question": "Which is diagonalizable over $\\mathbb R$?",
          "options": [
            "$\\begin{pmatrix} 5 & 1 \\\\ 0 & 5 \\end{pmatrix}$",
            "$\\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 4 \\\\ 0 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$"
          ],
          "answer": 2,
          "explanation": "Distinct eigenvalues $1, 3$."
        },
        {
          "question": "The proof that eigenvectors for $\\lambda_1 \\neq \\lambda_2$ are independent applies $A$ to $a_1v_1 + a_2v_2 = 0$ and subtracts",
          "options": [
            "$A$ times the original equation",
            "the original equation squared",
            "$\\lambda_1\\lambda_2$ times $v_1$",
            "$\\lambda_2$ times the original equation"
          ],
          "answer": 3,
          "explanation": "Leaving $a_1(\\lambda_1 - \\lambda_2)v_1 = 0$."
        },
        {
          "question": "In the procedure for diagonalizing, the first step is to",
          "options": [
            "find the eigenvalues and enough independent eigenvectors",
            "compute $P^{-1}$",
            "make $A$ symmetric",
            "row-reduce $A$ to the identity"
          ],
          "answer": 0,
          "explanation": "Then form $P$ and $D$."
        },
        {
          "question": "A quick way to check $P^{-1}AP = D$ without inverting $P$ is to verify",
          "options": [
            "$PA = DP$",
            "$AP = PD$",
            "$\\det P = \\det D$",
            "$P^T = P^{-1}$"
          ],
          "answer": 1,
          "explanation": "Multiply out both sides."
        },
        {
          "question": "If $A$ is diagonalizable with eigenvalues $1$ and $-1$, then $A^2 = $",
          "options": [
            "$-I$",
            "$I$",
            "$A$",
            "$0$"
          ],
          "answer": 1,
          "explanation": "$PD^2P^{-1} = PIP^{-1}$."
        }
      ]
    },
    {
      "id": "QS006",
      "title": "Inner products and orthogonality",
      "questions": [
        {
          "question": "The dot product $u \\cdot v$ equals, geometrically,",
          "options": [
            "$|u|$ times the signed length of the shadow of $v$ on $u$",
            "the area of the parallelogram on $u$ and $v$",
            "the angle between $u$ and $v$",
            "$|u| + |v|$"
          ],
          "answer": 0,
          "explanation": "Zero shadow means perpendicular."
        },
        {
          "question": "$\\langle u, v \\rangle = 0$ means $u$ and $v$ are",
          "options": [
            "parallel",
            "equal",
            "orthogonal",
            "unit vectors"
          ],
          "answer": 2,
          "explanation": "Perpendicular in that inner product."
        },
        {
          "question": "Which is NOT an axiom of a real inner product?",
          "options": [
            "$\\langle u, v \\rangle = \\langle v, u \\rangle$",
            "$\\langle ku, v \\rangle = k\\langle u, v \\rangle$",
            "$\\langle u, v \\rangle \\ge 0$ for all $u, v$",
            "$\\langle v, v \\rangle \\ge 0$, with equality iff $v = 0$"
          ],
          "answer": 2,
          "explanation": "Only $\\langle v, v \\rangle$ must be non-negative."
        },
        {
          "question": "The norm of $v$ is",
          "options": [
            "$\\langle v, v \\rangle$",
            "$\\sqrt{\\langle v, v \\rangle}$",
            "$\\langle v, v \\rangle^2$",
            "$|v_1| + |v_2|$"
          ],
          "answer": 1,
          "explanation": "For the dot product, the usual length."
        },
        {
          "question": "$\\|(1, 2, 2)\\| = $",
          "options": [
            "$3$",
            "$5$",
            "$9$",
            "$\\sqrt5$"
          ],
          "answer": 0,
          "explanation": "$\\sqrt{1 + 4 + 4}$."
        },
        {
          "question": "The distance $d(u, v)$ is",
          "options": [
            "$\\|u\\| - \\|v\\|$",
            "$\\|u - v\\|$",
            "$\\langle u, v \\rangle$",
            "$\\|u + v\\|$"
          ],
          "answer": 1,
          "explanation": "Length of the difference."
        },
        {
          "question": "$\\langle u, v \\rangle = u_1v_1 - u_2v_2$ is not an inner product on $\\mathbb R^2$ because",
          "options": [
            "it is not symmetric",
            "it is not additive",
            "$\\langle 0, 0 \\rangle \\neq 0$",
            "$\\langle (0, 1), (0, 1) \\rangle = -1 < 0$"
          ],
          "answer": 3,
          "explanation": "Positivity fails."
        },
        {
          "question": "$\\langle u, v \\rangle = Au \\cdot Av$ is an inner product when",
          "options": [
            "$A$ is symmetric",
            "$A$ is invertible",
            "$A$ is singular",
            "$A$ is diagonal with a zero entry"
          ],
          "answer": 1,
          "explanation": "Otherwise some $v \\neq 0$ has $\\langle v, v \\rangle = 0$."
        },
        {
          "question": "With $\\langle u, v \\rangle = Au \\cdot Av$, $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$, $\\langle \\hat\\imath, \\hat\\jmath \\rangle = $",
          "options": [
            "$0$",
            "$2$",
            "$1$",
            "$-1$"
          ],
          "answer": 2,
          "explanation": "$(1, 0) \\cdot (1, 1)$: so here $\\hat\\imath$, $\\hat\\jmath$ are not orthogonal."
        },
        {
          "question": "A set is orthonormal if",
          "options": [
            "its vectors are pairwise orthogonal and each has norm $1$",
            "its vectors are pairwise orthogonal",
            "each vector has norm $1$",
            "it spans the space"
          ],
          "answer": 0,
          "explanation": "Orthogonal plus unit."
        },
        {
          "question": "An orthogonal set of nonzero vectors is always",
          "options": [
            "a spanning set",
            "orthonormal",
            "linearly independent",
            "of size $n$"
          ],
          "answer": 2,
          "explanation": "Dot a dependence relation with each $v_j$."
        },
        {
          "question": "The projection of $v$ on $w$ is",
          "options": [
            "$\\frac{\\langle v, w \\rangle}{\\langle v, v \\rangle}v$",
            "$\\langle v, w \\rangle w$",
            "$v - w$",
            "$\\frac{\\langle v, w \\rangle}{\\langle w, w \\rangle}w$"
          ],
          "answer": 3,
          "explanation": "The shadow of $v$ along $w$."
        },
        {
          "question": "Gram–Schmidt on $(1, 1), (1, 3)$ gives $w_2 = $",
          "options": [
            "$(-1, 1)$",
            "$(1, -1)$",
            "$(0, 2)$",
            "$(2, 4)$"
          ],
          "answer": 0,
          "explanation": "$(1, 3) - 2(1, 1)$."
        },
        {
          "question": "Gram–Schmidt on $(1, 1, 1), (0, 1, 1)$ gives $w_2 = $",
          "options": [
            "$\\left(-\\frac23, \\frac13, \\frac13\\right)$",
            "$(0, 1, 1)$",
            "$\\left(\\frac23, -\\frac13, -\\frac13\\right)$",
            "$(-1, 0, 0)$"
          ],
          "answer": 0,
          "explanation": "$v_2 - \\frac23 w_1$."
        },
        {
          "question": "In Gram–Schmidt, $w_2 = v_2 - cw_1$ is orthogonal to $w_1$ because",
          "options": [
            "$v_2$ was already orthogonal to $w_1$",
            "$w_1$ has norm $1$",
            "$c = \\frac{\\langle v_2, w_1 \\rangle}{\\langle w_1, w_1 \\rangle}$ makes $\\langle w_2, w_1 \\rangle = 0$",
            "$c = 0$"
          ],
          "answer": 2,
          "explanation": "$\\langle v_2, w_1 \\rangle - c\\langle w_1, w_1 \\rangle = 0$."
        },
        {
          "question": "A square matrix $A$ is orthogonal if",
          "options": [
            "$A^T = A$",
            "$\\det A = 0$",
            "$A^2 = I$",
            "$A^TA = I$"
          ],
          "answer": 3,
          "explanation": "Equivalently $A^{-1} = A^T$."
        },
        {
          "question": "The columns of an orthogonal matrix are",
          "options": [
            "orthogonal but not unit",
            "orthonormal",
            "all equal",
            "linearly dependent"
          ],
          "answer": 1,
          "explanation": "Entry $(i, j)$ of $A^TA$ is column $i \\cdot$ column $j$."
        },
        {
          "question": "An orthogonal matrix preserves",
          "options": [
            "inner products, lengths and angles",
            "only lengths, not angles",
            "only areas",
            "nothing in general"
          ],
          "answer": 0,
          "explanation": "$Au \\cdot Av = u^TA^TAv = u \\cdot v$."
        },
        {
          "question": "The determinant of an orthogonal matrix is",
          "options": [
            "$\\pm 1$",
            "$0$",
            "any real number",
            "$2$"
          ],
          "answer": 0,
          "explanation": "$(\\det A)^2 = \\det(A^TA) = 1$."
        },
        {
          "question": "$\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$ is",
          "options": [
            "symmetric",
            "singular",
            "a shear",
            "orthogonal (a rotation)"
          ],
          "answer": 3,
          "explanation": "Columns are orthonormal; $\\det = 1$."
        },
        {
          "question": "A real matrix is orthogonally diagonalizable iff it is",
          "options": [
            "orthogonal",
            "symmetric",
            "invertible",
            "triangular"
          ],
          "answer": 1,
          "explanation": "The spectral theorem."
        },
        {
          "question": "Eigenvectors of a real symmetric matrix belonging to distinct eigenvalues are",
          "options": [
            "parallel",
            "equal",
            "never orthogonal",
            "orthogonal"
          ],
          "answer": 3,
          "explanation": "Move $A$ across the dot product."
        },
        {
          "question": "In the proof that a symmetric $A$ has orthogonal eigenvectors, symmetry is used in",
          "options": [
            "$Av_1 = \\lambda_1v_1$",
            "$\\lambda_1 \\neq \\lambda_2$",
            "$Av_1 \\cdot v_2 = v_1 \\cdot Av_2$",
            "$v_1 \\neq 0$"
          ],
          "answer": 2,
          "explanation": "$v_1^TA^Tv_2 = v_1^TAv_2$."
        },
        {
          "question": "An orthogonal $P$ with $P^TAP$ diagonal, for $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, is",
          "options": [
            "$\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$",
            "$\\frac{1}{\\sqrt2}\\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$",
            "$\\frac12\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$"
          ],
          "answer": 1,
          "explanation": "Unit eigenvectors as columns: a $45°$ rotation."
        },
        {
          "question": "To orthogonally diagonalize a symmetric matrix with a repeated eigenvalue, inside that eigenspace you must",
          "options": [
            "choose any basis without changes",
            "use only one eigenvector",
            "discard the eigenspace",
            "apply Gram–Schmidt and normalise"
          ],
          "answer": 3,
          "explanation": "Different eigenspaces are already orthogonal; one eigenspace’s basis may not be."
        }
      ]
    },
    {
      "id": "QS007",
      "title": "Bilinear and quadratic forms",
      "questions": [
        {
          "question": "A bilinear form on $V$ is a map $B: V \\times V \\to \\mathbb F$ that is",
          "options": [
            "linear in each variable when the other is fixed",
            "linear in the pair $(u, v)$",
            "symmetric and positive",
            "always an inner product"
          ],
          "answer": 0,
          "explanation": "$B(au_1 + bu_2, v) = aB(u_1, v) + bB(u_2, v)$, and similarly in $v$."
        },
        {
          "question": "Which is bilinear on $\\mathbb R^2$?",
          "options": [
            "$B(u, v) = u_1v_1 + 1$",
            "$B(u, v) = 3u_1v_2 - u_2v_2$",
            "$B(u, v) = u_1^2v_2$",
            "$B(u, v) = u_1 + v_1$"
          ],
          "answer": 1,
          "explanation": "Every term is an entry of $u$ times an entry of $v$."
        },
        {
          "question": "For any bilinear $B$, $B(0, u) = $",
          "options": [
            "$1$",
            "$B(u, u)$",
            "$0$",
            "$u$"
          ],
          "answer": 2,
          "explanation": "$B(0, u) = B(0 \\cdot 0, u) = 0 \\cdot B(0, u)$."
        },
        {
          "question": "The determinant $B(u, v) = u_1v_2 - u_2v_1$ measures",
          "options": [
            "the length of $u + v$",
            "the angle between $u$ and $v$",
            "the dot product",
            "the signed area of the parallelogram on $u$ and $v$"
          ],
          "answer": 3,
          "explanation": "Linear in each side: a bilinear form."
        },
        {
          "question": "The matrix of a bilinear form in the basis $\\{v_1, \\dots, v_n\\}$ has entries",
          "options": [
            "$a_{ij} = B(v_i, v_i)$",
            "$a_{ij} = v_i \\cdot v_j$",
            "$a_{ij} = B(v_j)$",
            "$a_{ij} = B(v_i, v_j)$"
          ],
          "answer": 3,
          "explanation": "Then $B(u, v) = [u]^TA[v]$."
        },
        {
          "question": "The standard matrix of $2u_1v_1 + 3u_1v_2 + 4u_2v_1 - u_2v_2$ is",
          "options": [
            "$\\begin{pmatrix} 2 & 4 \\\\ 3 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 7 \\\\ 0 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 3.5 \\\\ 3.5 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 3 \\\\ 4 & -1 \\end{pmatrix}$"
          ],
          "answer": 3,
          "explanation": "$a_{12}$ is the coefficient of $u_1v_2$."
        },
        {
          "question": "For that form, the matrix in the basis $\\{(1, 1), (1, -1)\\}$ is",
          "options": [
            "$\\begin{pmatrix} 8 & 4 \\\\ 2 & -6 \\end{pmatrix}$",
            "$\\begin{pmatrix} 8 & 2 \\\\ 4 & -6 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 3 \\\\ 4 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 6 & 4 \\\\ 2 & -8 \\end{pmatrix}$"
          ],
          "answer": 0,
          "explanation": "$B(v_1, v_1) = 8$, $B(v_1, v_2) = 4$, $B(v_2, v_1) = 2$, $B(v_2, v_2) = -6$."
        },
        {
          "question": "If $\\dim V = n$, then $\\dim\\mathcal B(V) = $",
          "options": [
            "$n$",
            "$n^2$",
            "$2n$",
            "$\\frac{n(n + 1)}{2}$"
          ],
          "answer": 1,
          "explanation": "$\\psi_\\alpha: \\mathcal B(V) \\to M_{n \\times n}(\\mathbb F)$ is an isomorphism."
        },
        {
          "question": "Under a change of basis, the matrix of a bilinear form changes as",
          "options": [
            "$P^{-1}AP$ (similarity)",
            "$PAP^T$ only if $P$ is orthogonal",
            "$P^TAP$ (congruence)",
            "$A^T$"
          ],
          "answer": 2,
          "explanation": "Both inputs are translated in; the output is a number."
        },
        {
          "question": "$B$ is congruent to $A$ if",
          "options": [
            "$B = P^{-1}AP$",
            "$B = A^T$",
            "$AB = I$",
            "$B = P^TAP$ for some invertible $P$"
          ],
          "answer": 3,
          "explanation": "Congruence is for bilinear forms."
        },
        {
          "question": "A bilinear form is symmetric iff",
          "options": [
            "its matrix in a basis is symmetric",
            "its matrix is diagonal",
            "$B(u, u) = 0$ for all $u$",
            "it is an inner product"
          ],
          "answer": 0,
          "explanation": "$a_{ij} = B(v_i, v_j) = B(v_j, v_i) = a_{ji}$."
        },
        {
          "question": "A bilinear form with $B(u, u) = 0$ for all $u$ is called",
          "options": [
            "alternating",
            "symmetric",
            "diagonalizable",
            "positive definite"
          ],
          "answer": 0,
          "explanation": "Like the area form."
        },
        {
          "question": "$B(u, v) = -B(v, u)$ for all $u, v$ defines a",
          "options": [
            "symmetric form",
            "skew-symmetric form",
            "quadratic form",
            "diagonal form"
          ],
          "answer": 1,
          "explanation": "The determinant form is skew-symmetric."
        },
        {
          "question": "A diagonalizable bilinear form is always",
          "options": [
            "alternating",
            "symmetric",
            "skew-symmetric",
            "zero"
          ],
          "answer": 1,
          "explanation": "Diagonal matrices are symmetric."
        },
        {
          "question": "The characteristic of $\\mathbb Z_2$ is",
          "options": [
            "$0$",
            "$1$",
            "infinite",
            "$2$"
          ],
          "answer": 3,
          "explanation": "$1 + 1 = 0$."
        },
        {
          "question": "Every symmetric bilinear form is diagonalizable when",
          "options": [
            "$\\operatorname{char}\\mathbb F = 2$",
            "$\\operatorname{char}\\mathbb F \\neq 2$",
            "$\\dim V = 1$ only",
            "$\\mathbb F = \\mathbb Z_2$"
          ],
          "answer": 1,
          "explanation": "The proof divides by $2$."
        },
        {
          "question": "Over $\\mathbb Z_2$, $B(u, v) = u_1v_2 + u_2v_1$ is",
          "options": [
            "diagonalizable",
            "not symmetric",
            "symmetric but not diagonalizable",
            "zero"
          ],
          "answer": 2,
          "explanation": "$B(u, u) = 2u_1u_2 = 0$, but $B \\neq 0$."
        },
        {
          "question": "A quadratic form comes from a symmetric bilinear form by",
          "options": [
            "$q(v) = B(v, 0)$",
            "$q(v) = B(v, v)^2$",
            "$q(v) = B(v, v)$",
            "$q(v) = \\sqrt{B(v, v)}$"
          ],
          "answer": 2,
          "explanation": "Same vector in both slots."
        },
        {
          "question": "The symmetric matrix of $q = 5x^2 - 6xy + 8y^2$ is",
          "options": [
            "$\\begin{pmatrix} 5 & -3 \\\\ -3 & 8 \\end{pmatrix}$",
            "$\\begin{pmatrix} 5 & -6 \\\\ -6 & 8 \\end{pmatrix}$",
            "$\\begin{pmatrix} 5 & -6 \\\\ 0 & 8 \\end{pmatrix}$",
            "$\\begin{pmatrix} 5 & 0 \\\\ 0 & 8 \\end{pmatrix}$"
          ],
          "answer": 0,
          "explanation": "Off-diagonal: half the cross coefficient."
        },
        {
          "question": "The quadratic form of $\\begin{pmatrix} 4 & -5 & 7 \\\\ -5 & -6 & 8 \\\\ 7 & 8 & 9 \\end{pmatrix}$ has $yz$-coefficient",
          "options": [
            "$16$",
            "$8$",
            "$-5$",
            "$9$"
          ],
          "answer": 0,
          "explanation": "$2a_{23} = 16$."
        },
        {
          "question": "Polarization recovers $B$ from $q$ by",
          "options": [
            "$B(u, v) = q(u)q(v)$",
            "$B(u, v) = q(u + v)$",
            "$B(u, v) = \\frac12\\big(q(u + v) - q(u) - q(v)\\big)$",
            "$B(u, v) = q(u) - q(v)$"
          ],
          "answer": 2,
          "explanation": "Needs $\\operatorname{char}\\mathbb F \\neq 2$."
        },
        {
          "question": "$q = 2x^2 + 2xy + 2y^2$ reduces to principal axes as",
          "options": [
            "$2X^2 + 2Y^2$",
            "$4X^2$",
            "$3X^2 + Y^2$",
            "$X^2 + 3Y^2 + XY$"
          ],
          "answer": 2,
          "explanation": "The eigenvalues of $\\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ are $3, 1$."
        },
        {
          "question": "In the reduction $x = PX$ of $q = x^TAx$, the new coefficients are",
          "options": [
            "the eigenvalues of $A$",
            "the entries of $P$",
            "the diagonal of $A$",
            "all equal to $1$"
          ],
          "answer": 0,
          "explanation": "$q = X^T(P^TAP)X$."
        },
        {
          "question": "$q = 3X^2 - 2Y^2 = 6$ is",
          "options": [
            "an ellipse",
            "a circle",
            "a parabola",
            "a hyperbola"
          ],
          "answer": 3,
          "explanation": "Coefficients of opposite sign."
        },
        {
          "question": "The principal axes of $q = 2x^2 + 2xy + 2y^2 = 3$ lie along",
          "options": [
            "the $x$- and $y$-axes",
            "$(1, 1)$ and $(-1, 1)$",
            "$(2, 1)$ and $(1, 2)$",
            "$(1, 0)$ and $(1, 1)$"
          ],
          "answer": 1,
          "explanation": "The eigenvectors of the matrix of $q$."
        }
      ]
    },
    {
      "id": "QS008",
      "title": "Jordan canonical form",
      "questions": [
        {
          "question": "A Jordan block $J_k(\\lambda)$ has",
          "options": [
            "$\\lambda$ everywhere",
            "$1$ on the diagonal, $\\lambda$ above it",
            "$\\lambda$ on the diagonal, $1$ just above it, $0$ elsewhere",
            "$\\lambda$ on the diagonal, $1$ just below it, $0$ elsewhere"
          ],
          "answer": 2,
          "explanation": "E.g. $\\begin{pmatrix} \\lambda & 1 \\\\ 0 & \\lambda \\end{pmatrix}$."
        },
        {
          "question": "A generalized eigenvector for $\\lambda$ is $v \\neq 0$ with",
          "options": [
            "$Av = \\lambda v$ only",
            "$(A - \\lambda I)^pv = 0$ for some $p \\ge 1$",
            "$Av = 0$",
            "$(A - \\lambda I)v \\neq 0$ for all $p$"
          ],
          "answer": 1,
          "explanation": "Crushed eventually."
        },
        {
          "question": "For the shear $\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$, $N = A - 2I$ sends $\\hat\\jmath$ to",
          "options": [
            "$\\hat\\imath$",
            "$0$",
            "$\\hat\\jmath$",
            "$2\\hat\\jmath$"
          ],
          "answer": 0,
          "explanation": "$N = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$: the chain $\\hat\\jmath \\to \\hat\\imath \\to 0$."
        },
        {
          "question": "The generalized eigenspace $K_\\lambda$ is",
          "options": [
            "$\\{v : Tv = \\lambda v\\}$",
            "$\\{v : (T - \\lambda I)^pv = 0 \\text{ for some } p\\}$",
            "$\\{v : Tv = 0\\}$",
            "the column space of $T - \\lambda I$"
          ],
          "answer": 1,
          "explanation": "It contains $E_\\lambda$."
        },
        {
          "question": "A subspace $W$ is $T$-invariant if",
          "options": [
            "$T(w) = w$ for all $w \\in W$",
            "$T(W) \\subseteq W$",
            "$T(W) = V$",
            "$W \\cap T(W) = \\{0\\}$"
          ],
          "answer": 1,
          "explanation": "$T$ never leaves $W$."
        },
        {
          "question": "$K_\\lambda$ is $T$-invariant because",
          "options": [
            "$T$ is invertible",
            "$K_\\lambda = E_\\lambda$",
            "$\\lambda \\neq 0$",
            "$T$ commutes with $(T - \\lambda I)^p$"
          ],
          "answer": 3,
          "explanation": "$(T - \\lambda I)^pTv = T(T - \\lambda I)^pv = 0$."
        },
        {
          "question": "If the characteristic polynomial splits, $\\dim K_\\lambda$ equals",
          "options": [
            "the geometric multiplicity of $\\lambda$",
            "$1$",
            "the algebraic multiplicity of $\\lambda$",
            "$n$"
          ],
          "answer": 2,
          "explanation": "And $K_\\lambda = \\ker(T - \\lambda I)^m$."
        },
        {
          "question": "The number of Jordan blocks for $\\lambda$ equals",
          "options": [
            "the algebraic multiplicity",
            "$\\operatorname{rank}(A - \\lambda I)$",
            "the size of the largest block",
            "$\\dim E_\\lambda = n - \\operatorname{rank}(A - \\lambda I)$"
          ],
          "answer": 3,
          "explanation": "One eigenvector per chain."
        },
        {
          "question": "With $r_k = \\operatorname{rank}(A - \\lambda I)^k$ and $r_0 = n$, the number of $\\lambda$-blocks of size $\\ge k$ is",
          "options": [
            "$r_{k-1} - r_k$",
            "$r_k - r_{k-1}$",
            "$r_k$",
            "$n - r_k$"
          ],
          "answer": 0,
          "explanation": "Each application of $A - \\lambda I$ removes one row of the dot diagram."
        },
        {
          "question": "The Jordan form of $\\begin{pmatrix} 3 & 1 \\\\ -1 & 1 \\end{pmatrix}$ is",
          "options": [
            "$\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 3 & 1 \\\\ 0 & 1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$"
          ],
          "answer": 3,
          "explanation": "$(\\lambda - 2)^2$, $\\operatorname{rank}(A - 2I) = 1$: one block."
        },
        {
          "question": "For $A = \\begin{pmatrix} 3 & 1 \\\\ -1 & 1 \\end{pmatrix}$ with $v_2 = (1, 0)$, the chain gives $v_1 = $",
          "options": [
            "$(1, 0)$",
            "$(0, 1)$",
            "$(3, -1)$",
            "$(1, -1)$"
          ],
          "answer": 3,
          "explanation": "$v_1 = (A - 2I)v_2$, the first column of $A - 2I$."
        },
        {
          "question": "In $Q$ (with $Q^{-1}AQ = J$), each Jordan chain is written",
          "options": [
            "eigenvector first: $(v_1, v_2, \\dots, v_s)$",
            "top vector first: $(v_s, \\dots, v_1)$",
            "in any order",
            "as rows"
          ],
          "answer": 0,
          "explanation": "Then $Av_i = \\lambda v_i + v_{i-1}$ gives the $1$ above the diagonal."
        },
        {
          "question": "$A$ is $3 \\times 3$ with only eigenvalue $2$ and $\\operatorname{rank}(A - 2I) = 2$. Its Jordan form is",
          "options": [
            "$J_2(2) \\oplus J_1(2)$",
            "$\\operatorname{diag}(2, 2, 2)$",
            "$J_3(2)$",
            "$J_1(2) \\oplus J_1(2) \\oplus J_1(2)$"
          ],
          "answer": 2,
          "explanation": "GM $= 1$: one block of size $3$."
        },
        {
          "question": "$A$ is $3 \\times 3$ with only eigenvalue $1$, $\\operatorname{rank}(A - I) = 1$, $(A - I)^2 = 0$. Its Jordan form is",
          "options": [
            "$J_3(1)$",
            "$I_3$",
            "$J_2(1) \\oplus J_1(1)$",
            "$J_2(1) \\oplus J_2(1)$"
          ],
          "answer": 2,
          "explanation": "Two blocks, one of size $\\ge 2$, total $3$."
        },
        {
          "question": "A $5 \\times 5$ nilpotent matrix with ranks $r_1 = 3$, $r_2 = 1$, $r_3 = 0$ has blocks of sizes",
          "options": [
            "$3, 1, 1$",
            "$3$ and $2$",
            "$2, 2, 1$",
            "$5$"
          ],
          "answer": 1,
          "explanation": "$2$ blocks, $2$ of size $\\ge 2$, $1$ of size $\\ge 3$."
        },
        {
          "question": "The minimal polynomial exponent of $(\\lambda - \\lambda_i)$ equals",
          "options": [
            "the number of blocks for $\\lambda_i$",
            "the algebraic multiplicity always",
            "$1$ always",
            "the size of the largest Jordan block for $\\lambda_i$"
          ],
          "answer": 3,
          "explanation": "A size-$s$ block needs $(J - \\lambda I)^s = 0$."
        },
        {
          "question": "Characteristic $(\\lambda - 3)^4$, minimal $(\\lambda - 3)^2$. A possible Jordan form is",
          "options": [
            "$J_2(3) \\oplus J_2(3)$",
            "$J_3(3) \\oplus J_1(3)$",
            "$J_4(3)$",
            "$\\operatorname{diag}(3, 3, 3, 3)$"
          ],
          "answer": 0,
          "explanation": "Largest block $2$, total $4$."
        },
        {
          "question": "A matrix is diagonalizable iff every Jordan block is",
          "options": [
            "$1 \\times 1$",
            "$2 \\times 2$",
            "of the same size",
            "nonzero"
          ],
          "answer": 0,
          "explanation": "Then $J$ is diagonal."
        },
        {
          "question": "$T$ is diagonalizable iff its characteristic polynomial splits and, for each $\\lambda$,",
          "options": [
            "$K_\\lambda = V$",
            "$E_\\lambda = \\{0\\}$",
            "$E_\\lambda = K_\\lambda$",
            "$\\lambda \\neq 0$"
          ],
          "answer": 2,
          "explanation": "Nothing needs a second application of $T - \\lambda I$."
        },
        {
          "question": "Two matrices with the same characteristic polynomial",
          "options": [
            "always have the same Jordan form",
            "are always similar",
            "may have different Jordan forms",
            "are always diagonalizable"
          ],
          "answer": 2,
          "explanation": "$J_2(3)$ vs $\\operatorname{diag}(3, 3)$."
        },
        {
          "question": "Two matrices are similar iff",
          "options": [
            "they have the same Jordan form (up to block order)",
            "they have the same determinant",
            "they have the same trace",
            "they have the same characteristic polynomial"
          ],
          "answer": 0,
          "explanation": "The Jordan form is a complete similarity invariant (when it exists)."
        },
        {
          "question": "The Jordan form exists for every real matrix",
          "options": [
            "always, over $\\mathbb R$",
            "never over $\\mathbb R$",
            "only for symmetric matrices",
            "only if its characteristic polynomial splits over $\\mathbb R$; over $\\mathbb C$ it always exists"
          ],
          "answer": 3,
          "explanation": "A rotation has no real eigenvalues."
        },
        {
          "question": "For $A = \\begin{pmatrix} 5 & -1 \\\\ 4 & 1 \\end{pmatrix}$, the Jordan form is",
          "options": [
            "$\\begin{pmatrix} 5 & 0 \\\\ 0 & 1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 3 & 1 \\\\ 0 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 3 & 0 \\\\ 0 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 4 & 1 \\\\ 0 & 2 \\end{pmatrix}$"
          ],
          "answer": 1,
          "explanation": "Trace $6$, det $9$: $(\\lambda - 3)^2$; rank$(A - 3I) = 1$."
        },
        {
          "question": "$A$ is $4 \\times 4$, $P_A = (\\lambda - 1)(\\lambda - 2)(\\lambda - 4)^2$, $\\operatorname{rank}(A - 4I) = 3$. Then $J = $",
          "options": [
            "$\\operatorname{diag}\\big(1, 2, J_2(4)\\big)$",
            "$\\operatorname{diag}(1, 2, 4, 4)$",
            "$J_4(4)$",
            "$\\operatorname{diag}\\big(J_2(1), J_2(4)\\big)$"
          ],
          "answer": 0,
          "explanation": "GM$(4) = 1$: one block of size $2$."
        },
        {
          "question": "In a Jordan chain, the vector $v_1$ at the bottom is",
          "options": [
            "the zero vector",
            "an eigenvector",
            "not an eigenvector",
            "orthogonal to the others"
          ],
          "answer": 1,
          "explanation": "$(A - \\lambda I)v_1 = 0$, $v_1 \\neq 0$."
        }
      ]
    },
    {
      "id": "QS009",
      "title": "Exam focus",
      "questions": [
        {
          "question": "State what it means for $A, B \\in M_n(\\mathbb F)$ to be similar.",
          "options": [
            "$B = P^TAP$ for some invertible $P$",
            "$A$ and $B$ have the same eigenvalues",
            "$B = P^{-1}AP$ for some $P \\in GL_n(\\mathbb F)$",
            "$AB = BA$"
          ],
          "answer": 2,
          "explanation": "Same eigenvalues is necessary but not sufficient."
        },
        {
          "question": "Prove: similarity is transitive. The key line is",
          "options": [
            "$C = PQAQ^{-1}P^{-1}$",
            "$C = A$",
            "$C = (PQ)A(PQ)^T$",
            "$C = Q^{-1}(P^{-1}AP)Q = (PQ)^{-1}A(PQ)$"
          ],
          "answer": 3,
          "explanation": "Then $PQ \\in GL_n(\\mathbb F)$."
        },
        {
          "question": "Prove $\\lambda$ eigenvalue $\\Rightarrow$ $\\lambda^k$ eigenvalue of $T^k$. The induction step is",
          "options": [
            "$T^{k+1}v = T(\\lambda^kv) = \\lambda^kT(v) = \\lambda^{k+1}v$",
            "$T^{k+1}v = (k + 1)\\lambda v$",
            "$T^{k+1}v = T^kv + Tv$",
            "$T^{k+1}v = \\lambda T^k$"
          ],
          "answer": 0,
          "explanation": "Linearity lets $\\lambda^k$ out."
        },
        {
          "question": "In proving “diagonalizable $\\Rightarrow$ $n$ independent eigenvectors”, the eigenvectors are",
          "options": [
            "the columns of $P$",
            "the rows of $D$",
            "the columns of $D$",
            "the rows of $P^{-1}$ only"
          ],
          "answer": 0,
          "explanation": "$AP = PD$ column by column."
        },
        {
          "question": "For a homogeneous system, the solution space has dimension $n - r$. In an exam this is justified by",
          "options": [
            "Cramer’s rule",
            "the determinant being zero",
            "one basis vector per free variable: $n - r$ free variables",
            "the rank being $n$"
          ],
          "answer": 2,
          "explanation": "$r$ leading variables, $n - r$ free."
        },
        {
          "question": "The solutions of $x + 3y - 3z = 0$, $2x - 3y + z = 0$, $3x - 2y + 2z = 0$ are",
          "options": [
            "a line through the origin",
            "only $x = y = z = 0$",
            "a plane",
            "none"
          ],
          "answer": 1,
          "explanation": "$|A| = -22 \\neq 0$."
        },
        {
          "question": "$x + 2y + z = 3$, $2x + 5y - z = -4$, $3x - 2y - z = 5$ has solution",
          "options": [
            "$(1, 1, 0)$",
            "$(2, -1, 3)$",
            "$(-2, 1, 3)$",
            "$(3, -1, 2)$"
          ],
          "answer": 1,
          "explanation": "$D = -28$, $D_x = -56$, $D_y = 28$, $D_z = -84$."
        },
        {
          "question": "The eigenvalues of $\\begin{pmatrix} 4 & 1 \\\\ -2 & 1 \\end{pmatrix}$ are",
          "options": [
            "$2$ and $3$",
            "$4$ and $1$",
            "$-2$ and $-3$",
            "$5$ and $6$"
          ],
          "answer": 0,
          "explanation": "$\\lambda^2 - 5\\lambda + 6$."
        },
        {
          "question": "By Cayley–Hamilton, for $A = \\begin{pmatrix} 4 & 1 \\\\ -2 & 1 \\end{pmatrix}$, $A^{-1} = $",
          "options": [
            "$\\frac16\\begin{pmatrix} 4 & 1 \\\\ -2 & 1 \\end{pmatrix}$",
            "$\\frac16\\begin{pmatrix} 1 & -1 \\\\ 2 & 4 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & -1 \\\\ 2 & 4 \\end{pmatrix}$",
            "$\\frac15\\begin{pmatrix} 1 & 1 \\\\ -2 & 4 \\end{pmatrix}$"
          ],
          "answer": 1,
          "explanation": "$A^{-1} = \\frac16(5I - A)$."
        },
        {
          "question": "The minimal polynomial of $\\begin{pmatrix} 3 & 1 & 1 \\\\ 1 & 3 & 1 \\\\ 1 & 1 & 3 \\end{pmatrix}$ is",
          "options": [
            "$(\\lambda - 2)^2(\\lambda - 5)$",
            "$\\lambda - 5$",
            "$(\\lambda - 2)(\\lambda - 5)$",
            "$(\\lambda - 3)^3$"
          ],
          "answer": 2,
          "explanation": "$(A - 2I)(A - 5I) = 0$."
        },
        {
          "question": "Gram–Schmidt on $(1, 0, 1), (1, 1, 0)$ gives $w_2 = $",
          "options": [
            "$(0, 1, -1)$",
            "$(1, 1, 0)$",
            "$\\left(-\\frac12, 1, \\frac12\\right)$",
            "$\\left(\\frac12, 1, -\\frac12\\right)$"
          ],
          "answer": 3,
          "explanation": "$v_2 - \\frac12 w_1$."
        },
        {
          "question": "Define an inner product space.",
          "options": [
            "A real vector space with a rule $\\langle u, v \\rangle$ that is symmetric, additive, homogeneous and positive definite",
            "A vector space with a determinant",
            "A vector space where every pair of vectors is orthogonal",
            "A vector space with a bilinear form"
          ],
          "answer": 0,
          "explanation": "All four axioms."
        },
        {
          "question": "Show $\\langle u, v \\rangle = Au \\cdot Av$ ($A$ invertible) is positive definite: if $\\langle v, v \\rangle = 0$ then",
          "options": [
            "$v$ is a unit vector",
            "$A = 0$",
            "$\\det A = 0$",
            "$Av = 0$, so $v = A^{-1}0 = 0$"
          ],
          "answer": 3,
          "explanation": "$\\langle v, v \\rangle = \\|Av\\|^2$."
        },
        {
          "question": "The matrix of $u_1v_1 + 2u_1v_2 - u_2v_2$ in the basis $\\{(1, 0), (1, 1)\\}$ is",
          "options": [
            "$\\begin{pmatrix} 1 & 2 \\\\ 0 & -1 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 1 \\\\ 3 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 3 \\\\ 1 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 3 \\\\ 1 & 1 \\end{pmatrix}$"
          ],
          "answer": 2,
          "explanation": "$a_{ij} = B(v_i, v_j)$."
        },
        {
          "question": "$q = 3x^2 + 2xy + 3y^2$ reduces to",
          "options": [
            "$3X^2 + 3Y^2$",
            "$5X^2 + Y^2$",
            "$4X^2 - 2Y^2$",
            "$4X^2 + 2Y^2$"
          ],
          "answer": 3,
          "explanation": "Eigenvalues of $\\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}$."
        },
        {
          "question": "The Jordan form of $\\begin{pmatrix} 1 & 1 \\\\ -1 & 3 \\end{pmatrix}$ is",
          "options": [
            "$\\begin{pmatrix} 1 & 0 \\\\ 0 & 3 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 0 \\\\ 0 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$",
            "$\\begin{pmatrix} 1 & 1 \\\\ 0 & 3 \\end{pmatrix}$"
          ],
          "answer": 2,
          "explanation": "$(\\lambda - 2)^2$, $\\operatorname{rank}(A - 2I) = 1$."
        },
        {
          "question": "Prove that the eigenspace $E_\\lambda$ is $T$-invariant: for $v \\in E_\\lambda$,",
          "options": [
            "$Tv = v$",
            "$T(Tv) = 0$",
            "$Tv \\perp v$",
            "$T(Tv) = T(\\lambda v) = \\lambda(Tv)$, so $Tv \\in E_\\lambda$"
          ],
          "answer": 3,
          "explanation": "$Tv$ is again in the eigenspace."
        },
        {
          "question": "Which statement about a real symmetric matrix is FALSE?",
          "options": [
            "All its eigenvalues are real",
            "It is orthogonally diagonalizable",
            "Eigenvectors for different eigenvalues are orthogonal",
            "Its eigenvectors for the same eigenvalue are always orthogonal"
          ],
          "answer": 3,
          "explanation": "Within one eigenspace you must apply Gram–Schmidt."
        },
        {
          "question": "The geometric meaning of $\\det(A - \\lambda I) = 0$ is",
          "options": [
            "$A - \\lambda I$ squashes the space, so some nonzero vector is only stretched by $A$",
            "$A$ is a rotation by $\\lambda$",
            "$A$ has determinant $\\lambda$",
            "$A$ is the identity"
          ],
          "answer": 0,
          "explanation": "Squashed $\\iff$ a nonzero vector is crushed $\\iff (A - \\lambda I)v = 0$."
        },
        {
          "question": "Why is $P^TAP$, not $P^{-1}AP$, the change-of-basis rule for bilinear forms?",
          "options": [
            "Because $P$ is always orthogonal",
            "Both inputs are translated into the old basis, and the output is a number needing no translation",
            "Because bilinear forms are linear maps",
            "Because $A$ is symmetric"
          ],
          "answer": 1,
          "explanation": "$B(u, v) = (P[u]')^TA(P[v]')$."
        },
        {
          "question": "If $A$ is orthogonal, $A^{-1} = $",
          "options": [
            "$A$",
            "$-A$",
            "$A^T$",
            "$\\frac{1}{\\det A}A$"
          ],
          "answer": 2,
          "explanation": "$A^TA = I$."
        },
        {
          "question": "A $3 \\times 3$ matrix has $P_A = -(\\lambda - 4)^2(\\lambda + 1)$. It is diagonalizable iff",
          "options": [
            "$\\operatorname{rank}(A - 4I) = 2$",
            "$\\operatorname{rank}(A - 4I) = 1$",
            "$\\det A = 16$",
            "$A$ is triangular"
          ],
          "answer": 1,
          "explanation": "GM$(4) = 3 - \\operatorname{rank}$ must be $2$."
        },
        {
          "question": "$\\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$ is",
          "options": [
            "nilpotent and not diagonalizable",
            "diagonalizable",
            "invertible",
            "orthogonal"
          ],
          "answer": 0,
          "explanation": "$N^2 = 0$ but $N \\neq 0$: a single Jordan block $J_2(0)$."
        },
        {
          "question": "The trace and determinant of a matrix with eigenvalues $1, 2, 3$ are",
          "options": [
            "$6$ and $5$",
            "$6$ and $6$",
            "$5$ and $6$",
            "$3$ and $6$"
          ],
          "answer": 1,
          "explanation": "Sum and product."
        },
        {
          "question": "The essence of diagonalization, Gram–Schmidt and Jordan form is the same idea:",
          "options": [
            "choosing a basis in which the transformation is as simple as possible",
            "computing determinants faster",
            "avoiding eigenvalues",
            "making every matrix symmetric"
          ],
          "answer": 0,
          "explanation": "Diagonal when possible, orthonormal when symmetric, Jordan blocks otherwise."
        }
      ]
    }
  ]
};
