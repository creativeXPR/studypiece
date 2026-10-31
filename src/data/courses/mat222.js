// MAT 222 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MAT 222",
  "updated": "2026-10-29",
  "title": "Real Analysis II",
  "sets": [
    {
      "id": "QS001",
      "title": "Sets in ℝ, functions and mappings",
      "questions": [
        {
          "question": "A set $S \\subseteq \\mathbb{R}$ is open when",
          "options": [
            "for each $x \\in S$ there is $\\varepsilon > 0$ with $(x - \\varepsilon, x + \\varepsilon) \\subseteq S$",
            "$S$ has no smallest element",
            "$S$ contains all its limit points",
            "$S$ is bounded"
          ],
          "answer": 0,
          "explanation": "That is the definition: every point has an ε-interval around it inside $S$. Containing all limit points describes closed sets."
        },
        {
          "question": "Which set is open in $\\mathbb{R}$?",
          "options": [
            "$(0, 1)$",
            "$[0, 1]$",
            "$\\{0\\}$",
            "$[0, 1)$"
          ],
          "answer": 0,
          "explanation": "Around each point of $(0, 1)$ an interval fits. The others fail at $0$ (or $1$)."
        },
        {
          "question": "$\\bigcap_{n=1}^{\\infty} \\left(-\\frac1n, 1 + \\frac1n\\right) = [0, 1]$ shows that",
          "options": [
            "open sets are closed",
            "$[0, 1]$ is open",
            "an infinite intersection of open sets need not be open",
            "every intersection of open sets is open"
          ],
          "answer": 2,
          "explanation": "Each $(-\\frac1n, 1 + \\frac1n)$ is open but the intersection $[0, 1]$ is not. Only finite intersections of open sets are guaranteed open."
        },
        {
          "question": "The limit points of $\\{\\frac1n : n \\in \\mathbb{N}\\}$ are",
          "options": [
            "none",
            "$\\{\\frac1n : n \\in \\mathbb{N}\\}$",
            "$\\{0, 1\\}$",
            "$\\{0\\}$"
          ],
          "answer": 3,
          "explanation": "The points pile up only at $0$; each $\\frac1n$ is isolated."
        },
        {
          "question": "A set $S \\subseteq \\mathbb{R}$ is closed if and only if",
          "options": [
            "it has finitely many points",
            "it is bounded",
            "its complement is closed",
            "it contains all its limit points"
          ],
          "answer": 3,
          "explanation": "Closed means the complement is open, which is equivalent to containing every limit point."
        },
        {
          "question": "The Heine–Borel theorem says $K \\subseteq \\mathbb{R}$ is compact if and only if",
          "options": [
            "$K$ is closed and bounded",
            "$K$ is finite",
            "$K$ is open and bounded",
            "$K$ is an interval"
          ],
          "answer": 0,
          "explanation": "In $\\mathbb{R}$, compactness (every open cover has a finite subcover) is equivalent to being closed and bounded."
        },
        {
          "question": "Which set is compact?",
          "options": [
            "$(0, 1]$",
            "$\\{0\\} \\cup \\{\\frac1n : n \\in \\mathbb{N}\\}$",
            "$\\mathbb{Q} \\cap [0, 1]$",
            "$[0, \\infty)$"
          ],
          "answer": 1,
          "explanation": "It is bounded and contains its only limit point $0$, so it is closed. The others are not closed or not bounded."
        },
        {
          "question": "$\\bigcup_{n} \\left[\\frac1n, 1\\right] = (0, 1]$ shows that",
          "options": [
            "$(0, 1]$ is closed",
            "an infinite union of closed sets need not be closed",
            "every union of closed sets is closed",
            "closed sets are open"
          ],
          "answer": 1,
          "explanation": "Each $[\\frac1n, 1]$ is closed, but the union misses its limit point $0$."
        },
        {
          "question": "A relation $f \\subseteq X \\times Y$ is a function $X \\to Y$ when",
          "options": [
            "each $x \\in X$ appears in exactly one pair $(x, y) \\in f$",
            "each $y \\in Y$ appears in exactly one pair",
            "$X = Y$",
            "$f$ is finite"
          ],
          "answer": 0,
          "explanation": "Every input must have one and only one output."
        },
        {
          "question": "Are $f(x) = x$ on $\\mathbb{R}$ and $g(x) = \\frac{x^2}{x}$ on $\\mathbb{R} \\setminus \\{0\\}$ equal functions?",
          "options": [
            "Only at $x = 0$",
            "Yes, they agree wherever both are defined",
            "Yes, $\\frac{x^2}{x} = x$",
            "No, their domains differ"
          ],
          "answer": 3,
          "explanation": "Equal functions need the same domain and the same value at every point."
        },
        {
          "question": "For $f(x) = x^2$, the image $f([-1, 2])$ is",
          "options": [
            "$[0, 2]$",
            "$[1, 4]$",
            "$[0, 4]$",
            "$[-1, 4]$"
          ],
          "answer": 2,
          "explanation": "Over $[-1, 2]$, $x^2$ takes every value from $0$ (at $x = 0$) up to $4$ (at $x = 2$)."
        },
        {
          "question": "For $f(x) = x^2$ on $\\mathbb{R}$, $f^{-1}([1, 4])$ is",
          "options": [
            "$[-2, -1] \\cup [1, 2]$",
            "$[1, 16]$",
            "undefined, as $f$ has no inverse",
            "$[1, 2]$"
          ],
          "answer": 0,
          "explanation": "$1 \\le x^2 \\le 4 \\iff 1 \\le |x| \\le 2$. Pre-images exist for every function."
        },
        {
          "question": "The characteristic function $\\chi_E$ of a set $E$ is defined by",
          "options": [
            "$\\chi_E(x) = x$ for $x \\in E$",
            "$\\chi_E(x) = 0$ if $x \\in E$, $1$ otherwise",
            "$\\chi_E(x) = |x|$",
            "$\\chi_E(x) = 1$ if $x \\in E$ and $0$ if $x \\notin E$"
          ],
          "answer": 3,
          "explanation": "It records membership: $1$ inside $E$, $0$ outside."
        },
        {
          "question": "$f : X \\to Y$ is injective when",
          "options": [
            "every $y$ has at least one preimage",
            "$f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$",
            "$f(X) = Y$",
            "$X = Y$"
          ],
          "answer": 1,
          "explanation": "Different inputs give different outputs. $f(X) = Y$ is surjectivity."
        },
        {
          "question": "$f : X \\to Y$ is surjective when",
          "options": [
            "$X \\subseteq Y$",
            "$f(X) = Y$",
            "$f$ is continuous",
            "$f(x_1) = f(x_2) \\Rightarrow x_1 = x_2$"
          ],
          "answer": 1,
          "explanation": "Every element of the codomain is hit."
        },
        {
          "question": "$f(x) = x^3$ as a map $\\mathbb{R} \\to \\mathbb{R}$ is",
          "options": [
            "bijective",
            "surjective but not injective",
            "injective but not surjective",
            "neither"
          ],
          "answer": 0,
          "explanation": "Every real number has exactly one real cube root."
        },
        {
          "question": "$f(x) = e^x$ as a map $\\mathbb{R} \\to \\mathbb{R}$ is",
          "options": [
            "neither",
            "bijective",
            "surjective but not injective",
            "injective but not surjective"
          ],
          "answer": 3,
          "explanation": "$e^x$ is strictly increasing (injective) but never takes values $\\le 0$."
        },
        {
          "question": "A mapping $f : X \\to Y$ has an inverse $f^{-1} : Y \\to X$ exactly when",
          "options": [
            "$f$ is surjective",
            "$f$ is injective",
            "$f$ is bijective",
            "$f$ is continuous"
          ],
          "answer": 2,
          "explanation": "Surjectivity gives existence of a preimage, injectivity its uniqueness."
        },
        {
          "question": "With $f(x) = x + 1$ and $g(x) = x^2$, $(g \\circ f)(x) =$",
          "options": [
            "$(x + 1)^2$",
            "$x^2 + 1$",
            "$x^2 + x$",
            "$2x + 1$"
          ],
          "answer": 0,
          "explanation": "$g \\circ f$ applies $f$ first: $g(f(x)) = (x + 1)^2$."
        },
        {
          "question": "Which statement about composition is true?",
          "options": [
            "It is associative but not in general commutative",
            "It is neither",
            "It is commutative but not associative",
            "It is both associative and commutative"
          ],
          "answer": 0,
          "explanation": "$h \\circ (g \\circ f) = (h \\circ g) \\circ f$, but $g \\circ f \\ne f \\circ g$ in general."
        },
        {
          "question": "If $f : X \\to Y$, $g : Y \\to X$ and $g \\circ f = e_X$, then",
          "options": [
            "$f = g$",
            "$f$ is surjective and $g$ is injective",
            "$f$ is injective and $g$ is surjective",
            "both are bijective"
          ],
          "answer": 2,
          "explanation": "$g(f(x)) = x$ shows every $x$ is hit by $g$, and $f(x_1) = f(x_2)$ forces $x_1 = x_2$."
        },
        {
          "question": "An equivalence relation is",
          "options": [
            "symmetric only",
            "reflexive and transitive only",
            "reflexive, symmetric and transitive",
            "injective and surjective"
          ],
          "answer": 2,
          "explanation": "Equality and parallelism of lines are examples."
        },
        {
          "question": "The pre-image $f^{-1}(B)$ is defined for",
          "options": [
            "only injective $f$",
            "only bijective $f$",
            "only continuous $f$",
            "every function $f$"
          ],
          "answer": 3,
          "explanation": "$f^{-1}(B) = \\{x : f(x) \\in B\\}$ needs no inverse function."
        },
        {
          "question": "For $A \\subseteq X$, the restriction $f|_A$ is",
          "options": [
            "the inverse of $f$ on $A$",
            "$f$ with codomain $A$",
            "the image $f(A)$",
            "the function on $A$ that agrees with $f$ there"
          ],
          "answer": 3,
          "explanation": "$f$ is then called an extension of $f|_A$."
        },
        {
          "question": "The first projection $\\mathrm{Pr}_1 : X_1 \\times X_2 \\to X_1$ is",
          "options": [
            "$(x_1, x_2) \\mapsto x_1$",
            "$x_1 \\mapsto (x_1, x_1)$",
            "$(x_1, x_2) \\mapsto x_2$",
            "$(x_1, x_2) \\mapsto (x_1, 0)$"
          ],
          "answer": 0,
          "explanation": "It picks out the first coordinate."
        }
      ]
    },
    {
      "id": "QS002",
      "title": "Limits",
      "questions": [
        {
          "question": "$c$ is a cluster point of $S$ when",
          "options": [
            "$c \\in S$",
            "$c$ is the largest element of $S$",
            "some interval around $c$ contains no point of $S$",
            "every interval $(c - \\varepsilon, c + \\varepsilon)$ contains a point of $S$ other than $c$"
          ],
          "answer": 3,
          "explanation": "Points of $S$ come arbitrarily close to $c$; $c$ itself need not be in $S$."
        },
        {
          "question": "The cluster points of $(0, 1)$ are",
          "options": [
            "none",
            "$(0, 1)$",
            "$[0, 1]$",
            "$\\{0, 1\\}$"
          ],
          "answer": 2,
          "explanation": "Every point of $(0, 1)$ and both end points are approached by points of the set."
        },
        {
          "question": "The set of cluster points of $\\mathbb{Q}$ is",
          "options": [
            "$\\mathbb{Z}$",
            "$\\mathbb{R}$",
            "$\\emptyset$",
            "$\\mathbb{Q}$"
          ],
          "answer": 1,
          "explanation": "Rationals crowd every real number."
        },
        {
          "question": "$\\lim_{x \\to c} f(x) = L$ means",
          "options": [
            "$|f(x) - L| < \\delta$ whenever $|x - c| < \\varepsilon$",
            "$f(c) = L$",
            "for every $\\varepsilon > 0$ there is $\\delta > 0$ with $|f(x) - L| < \\varepsilon$ whenever $x \\in S$, $0 < |x - c| < \\delta$",
            "there is $\\varepsilon > 0$ such that for all $\\delta > 0$, $|f(x) - L| < \\varepsilon$"
          ],
          "answer": 2,
          "explanation": "ε comes first (any tolerance), δ is found after it."
        },
        {
          "question": "Why does the limit definition require $0 < |x - c|$?",
          "options": [
            "To make δ positive",
            "The value $f(c)$, if it exists, plays no part in the limit",
            "Because $f$ is never defined at $c$",
            "To make the limit unique"
          ],
          "answer": 1,
          "explanation": "The limit describes behaviour near $c$, not at $c$."
        },
        {
          "question": "To prove $\\lim_{x \\to 1}(x^2 + 4x) = 5$, a suitable δ is",
          "options": [
            "$\\min\\{1, 7\\varepsilon\\}$",
            "$\\varepsilon$",
            "$\\min\\{1, \\frac\\varepsilon7\\}$",
            "$\\frac\\varepsilon5$"
          ],
          "answer": 2,
          "explanation": "$|x^2 + 4x - 5| = |x - 1||x + 5|$; with $|x - 1| < 1$, $|x + 5| < 7$, so $|x - 1| < \\frac\\varepsilon7$ suffices."
        },
        {
          "question": "In the proof that a limit is unique, which ε is used?",
          "options": [
            "$\\varepsilon = 1$",
            "$\\varepsilon = \\frac{|L_1 - L_2|}{2}$",
            "$\\varepsilon = \\delta$",
            "$\\varepsilon = |L_1 - L_2|$"
          ],
          "answer": 1,
          "explanation": "Then $|L_1 - L_2| \\le |L_1 - f(x)| + |f(x) - L_2| < 2\\varepsilon = |L_1 - L_2|$, a contradiction."
        },
        {
          "question": "$\\lim_{x \\to 2} \\frac{x^3 + 1}{x - 3} =$",
          "options": [
            "$-9$",
            "$9$",
            "It does not exist",
            "$-3$"
          ],
          "answer": 0,
          "explanation": "The function is continuous at $2$: $\\frac{8 + 1}{2 - 3} = -9$."
        },
        {
          "question": "For $\\lim_{x \\to c} x^2 = c^2$, a working δ is",
          "options": [
            "$\\frac\\varepsilon2$",
            "$\\varepsilon^2$",
            "$\\min\\left\\{1, \\frac{\\varepsilon}{2|c| + 1}\\right\\}$",
            "$\\frac{\\varepsilon}{2c}$"
          ],
          "answer": 2,
          "explanation": "With $|x - c| < 1$, $|x + c| < 2|c| + 1$, so $|x^2 - c^2| < (2|c| + 1)\\delta \\le \\varepsilon$."
        },
        {
          "question": "The sequential criterion says $\\lim_{x \\to c} f(x) = L$ if and only if",
          "options": [
            "$f(x_n) \\to L$ for some sequence $x_n \\to c$",
            "$f(n) \\to L$",
            "$f(x_n) \\to L$ for every sequence $x_n \\in S \\setminus \\{c\\}$ with $x_n \\to c$",
            "$f(c) = L$"
          ],
          "answer": 2,
          "explanation": "Every sequence, not just one."
        },
        {
          "question": "Why does $\\lim_{x \\to 0} \\sin\\frac1x$ not exist?",
          "options": [
            "$\\sin$ is not continuous",
            "$x_n = \\frac{1}{n\\pi}$ gives values $\\to 0$, $y_n = \\frac{1}{2n\\pi + \\pi/2}$ gives values $\\to 1$",
            "$\\sin\\frac1x$ is unbounded",
            "$0$ is not a cluster point"
          ],
          "answer": 1,
          "explanation": "Two sequences tending to $0$ with different limits of $f$."
        },
        {
          "question": "$\\lim_{x \\to 0} x\\sin\\frac1x =$",
          "options": [
            "$1$",
            "It does not exist",
            "$0$",
            "$\\infty$"
          ],
          "answer": 2,
          "explanation": "$-|x| \\le x\\sin\\frac1x \\le |x|$; squeeze."
        },
        {
          "question": "For $f = 1$ on $\\mathbb{Q}$ and $0$ elsewhere, $\\lim_{x \\to x_0} f(x)$",
          "options": [
            "exists at no $x_0$",
            "equals $\\frac12$ everywhere",
            "exists at rational $x_0$ only",
            "exists at irrational $x_0$ only"
          ],
          "answer": 0,
          "explanation": "Rational and irrational sequences to $x_0$ give values $1$ and $0$."
        },
        {
          "question": "If $\\lim f = 3$ and $\\lim g = -2$ as $x \\to c$, then $\\lim (fg + f) =$",
          "options": [
            "$3$",
            "$1$",
            "$-3$",
            "$-6$"
          ],
          "answer": 2,
          "explanation": "$3 \\cdot (-2) + 3 = -3$ by the algebra of limits."
        },
        {
          "question": "The quotient rule $\\lim \\frac fg = \\frac{\\lim f}{\\lim g}$ needs",
          "options": [
            "$\\lim f \\ne 0$",
            "$\\lim g \\ne 0$",
            "$g$ bounded",
            "$f$ continuous"
          ],
          "answer": 1,
          "explanation": "Division by a zero limit is not allowed."
        },
        {
          "question": "If $f(x) \\le g(x)$ near $c$ and both limits exist, then",
          "options": [
            "$\\lim f \\le \\lim g$",
            "nothing follows",
            "$\\lim f < \\lim g$",
            "$\\lim f = \\lim g$"
          ],
          "answer": 0,
          "explanation": "Strict inequality can be lost: $-x^2 < x^2$ for $x \\ne 0$, but both limits are $0$."
        },
        {
          "question": "$\\lim_{x \\to c} f(x) = L$ if and only if",
          "options": [
            "the left-hand limit exists",
            "$f(c) = L$",
            "both one-sided limits exist and equal $L$",
            "the right-hand limit equals $L$"
          ],
          "answer": 2,
          "explanation": "Left and right must agree."
        },
        {
          "question": "$\\lim_{x \\to 0} \\frac{|x|}{x}$",
          "options": [
            "does not exist",
            "$= 1$",
            "$= 0$",
            "$= -1$"
          ],
          "answer": 0,
          "explanation": "Right limit $1$, left limit $-1$."
        },
        {
          "question": "For $\\lim_{x \\to \\infty} \\frac{1}{|x| + 1} = 0$, given ε a suitable threshold is",
          "options": [
            "$M = \\varepsilon$",
            "$M = \\varepsilon - 1$",
            "$M = \\frac1\\varepsilon - 1$",
            "$M = \\frac1\\varepsilon + 1$"
          ],
          "answer": 2,
          "explanation": "For $x \\ge M$, $\\frac{1}{x + 1} \\le \\frac{1}{M + 1} = \\varepsilon$."
        },
        {
          "question": "$\\lim_{x \\to \\infty} \\frac{2x^3 - x^2}{x^3 + 2x^2 + 1} =$",
          "options": [
            "$0$",
            "$2$",
            "$\\infty$",
            "$1$"
          ],
          "answer": 1,
          "explanation": "Divide by $x^3$: $\\frac{2 - 1/x}{1 + 2/x + 1/x^3} \\to 2$."
        },
        {
          "question": "$\\lim_{x \\to \\infty} f(x) = \\infty$ means",
          "options": [
            "$f$ is unbounded",
            "for every $N$ there is $M$ with $f(x) > N$ whenever $x \\ge M$",
            "for some $N$, $f(x) > N$ for all $x$",
            "$f$ is increasing"
          ],
          "answer": 1,
          "explanation": "Beat every height eventually. Unbounded alone is not enough."
        },
        {
          "question": "To show $\\frac{1 + x^2}{1 + x} \\to \\infty$, given $N$ take",
          "options": [
            "$M = N$",
            "$M = \\sqrt N$",
            "$M = \\frac1N$",
            "$M = \\max\\{2N + 1, 1\\}$"
          ],
          "answer": 3,
          "explanation": "For $x \\ge 1$, $\\frac{1 + x^2}{1 + x} \\ge \\frac{x}{2}$, which exceeds $N$ once $x > 2N$."
        },
        {
          "question": "$\\lim_{x \\to 2} \\frac{x^3 + 3x^2 - 4x - 12}{x - 2} =$",
          "options": [
            "$20$",
            "$0$",
            "$12$",
            "It does not exist"
          ],
          "answer": 0,
          "explanation": "$x^3 + 3x^2 - 4x - 12 = (x + 3)(x - 2)(x + 2)$, so the limit is $(5)(4) = 20$."
        },
        {
          "question": "$\\lim_{x \\to -1} \\frac{x^3 + 1}{(x + 1)^3} =$",
          "options": [
            "$1$",
            "$0$",
            "$3$",
            "$+\\infty$"
          ],
          "answer": 3,
          "explanation": "It equals $\\frac{x^2 - x + 1}{(x + 1)^2}$, whose top tends to $3 > 0$ and bottom to $0^+$."
        },
        {
          "question": "$\\lim_{x \\to 0} x^2\\cos\\frac1x =$",
          "options": [
            "$0$",
            "$1$",
            "It does not exist",
            "$-1$"
          ],
          "answer": 0,
          "explanation": "$-x^2 \\le x^2\\cos\\frac1x \\le x^2$; squeeze."
        }
      ]
    },
    {
      "id": "QS003",
      "title": "Continuity",
      "questions": [
        {
          "question": "$f$ is continuous at $c \\in S$ when",
          "options": [
            "$\\lim_{x \\to c} f(x)$ exists",
            "for every $\\varepsilon > 0$ there is $\\delta > 0$ with $|f(x) - f(c)| < \\varepsilon$ whenever $x \\in S$, $|x - c| < \\delta$",
            "$f(c)$ is defined",
            "$f$ is bounded near $c$"
          ],
          "answer": 1,
          "explanation": "The target is the actual value $f(c)$."
        },
        {
          "question": "The three conditions for continuity at a cluster point $c$ are",
          "options": [
            "$f(c)$ is defined, $\\lim_{x \\to c} f(x)$ exists, and they are equal",
            "$f$ is bounded, monotone and differentiable",
            "$f(c) > 0$ and the limit exists",
            "the left limit exists and equals the right limit"
          ],
          "answer": 0,
          "explanation": "All three are needed."
        },
        {
          "question": "If $c \\in S$ is not a cluster point of $S$, then any $f : S \\to \\mathbb{R}$ is",
          "options": [
            "differentiable at $c$",
            "discontinuous at $c$",
            "undefined at $c$",
            "continuous at $c$"
          ],
          "answer": 3,
          "explanation": "A small δ leaves only $x = c$, where $|f(x) - f(c)| = 0$."
        },
        {
          "question": "$f$ is continuous at $c$ if and only if",
          "options": [
            "$f$ is monotone near $c$",
            "$f(x_n) \\to f(c)$ for every sequence $x_n \\in S$ with $x_n \\to c$",
            "$f(c) = 0$",
            "$f(x_n) \\to f(c)$ for one sequence"
          ],
          "answer": 1,
          "explanation": "The sequential criterion for continuity."
        },
        {
          "question": "Why is $f(x) = -1$ ($x < 0$), $1$ ($x \\ge 0$) discontinuous at $0$?",
          "options": [
            "$f(0)$ is undefined",
            "$f$ is unbounded",
            "$x_n = \\frac1n$ gives $f(x_n) \\to 1$",
            "$x_n = -\\frac1n \\to 0$ but $f(x_n) = -1 \\not\\to f(0) = 1$"
          ],
          "answer": 3,
          "explanation": "One bad sequence is enough."
        },
        {
          "question": "Every polynomial is",
          "options": [
            "continuous at every point of $\\mathbb{R}$",
            "discontinuous at its roots",
            "continuous only where it is positive",
            "continuous only on $[0, \\infty)$"
          ],
          "answer": 0,
          "explanation": "Built from $x$ and constants with sums and products."
        },
        {
          "question": "The inequality $|\\sin x - \\sin c| \\le |x - c|$ shows that",
          "options": [
            "$\\sin$ is differentiable",
            "$\\sin$ is periodic",
            "$\\sin$ is bounded",
            "$\\sin$ is continuous (indeed Lipschitz)"
          ],
          "answer": 3,
          "explanation": "Take $\\delta = \\varepsilon$."
        },
        {
          "question": "If $g$ is continuous at $c$ and $f$ is continuous at $g(c)$, then",
          "options": [
            "$f + g$ is continuous at $g(c)$",
            "nothing follows",
            "$g \\circ f$ is continuous at $c$",
            "$f \\circ g$ is continuous at $c$"
          ],
          "answer": 3,
          "explanation": "$x_n \\to c \\Rightarrow g(x_n) \\to g(c) \\Rightarrow f(g(x_n)) \\to f(g(c))$."
        },
        {
          "question": "If $f$, $g$ are continuous at $c$, $\\frac fg$ is continuous at $c$ provided",
          "options": [
            "$g(c) \\ne 0$",
            "$g(c) > 0$",
            "always",
            "$f(c) \\ne 0$"
          ],
          "answer": 0,
          "explanation": "The quotient must be defined at $c$."
        },
        {
          "question": "How should $f(x) = \\frac{x^2 - x - 6}{x + 2}$ be defined at $x = -2$ to be continuous there?",
          "options": [
            "$f(-2) = -5$",
            "$f(-2) = 0$",
            "$f(-2) = -6$",
            "It cannot be made continuous"
          ],
          "answer": 0,
          "explanation": "$\\frac{(x - 3)(x + 2)}{x + 2} = x - 3 \\to -5$."
        },
        {
          "question": "$f(x) = \\frac{\\sin 2x}{x}$ for $x \\ne 0$, $f(0) = 1$ has at $0$",
          "options": [
            "a jump discontinuity",
            "an infinite discontinuity",
            "a removable discontinuity",
            "no discontinuity"
          ],
          "answer": 2,
          "explanation": "The limit is $2 \\ne 1$; redefining $f(0) = 2$ removes it."
        },
        {
          "question": "$f(x) = -x^2 + 4$ ($x \\le 3$), $4x - 8$ ($x > 3$) has at $x = 3$",
          "options": [
            "a jump discontinuity",
            "a removable discontinuity",
            "no discontinuity",
            "an infinite discontinuity"
          ],
          "answer": 0,
          "explanation": "Left limit $-5$, right limit $4$."
        },
        {
          "question": "$f(x) = \\frac{1}{x - 3}$ (with $f(3) = 0$) has at $3$",
          "options": [
            "a jump discontinuity",
            "an infinite discontinuity",
            "a removable discontinuity",
            "no discontinuity"
          ],
          "answer": 1,
          "explanation": "The values blow up near $3$."
        },
        {
          "question": "$\\sin\\frac1x$ (with $f(0) = 0$) at $0$ has",
          "options": [
            "a removable discontinuity",
            "an oscillating (essential) discontinuity",
            "a jump",
            "no discontinuity"
          ],
          "answer": 1,
          "explanation": "No one-sided limit exists."
        },
        {
          "question": "Where is $f(x) = x^2 - 1$ ($x$ irrational), $0$ ($x$ rational) continuous?",
          "options": [
            "Nowhere",
            "Only at rational points",
            "Everywhere",
            "Only at $x = \\pm1$"
          ],
          "answer": 3,
          "explanation": "Continuity needs $x^2 - 1 = 0$ so both formulas agree in the limit."
        },
        {
          "question": "If $f$ is continuous at $c$ and $f(c) > 0$, then",
          "options": [
            "$f(x) > 0$ for all $x$ near $c$",
            "$f'(c) > 0$",
            "$f$ is increasing near $c$",
            "$f(x) > 0$ for all $x$"
          ],
          "answer": 0,
          "explanation": "Sign-preserving property: take $\\varepsilon = f(c)$."
        },
        {
          "question": "If $f : \\mathbb{R} \\to \\mathbb{R}$ is continuous, $Z = \\{x : f(x) = 0\\}$ is",
          "options": [
            "closed",
            "finite",
            "bounded",
            "open"
          ],
          "answer": 0,
          "explanation": "If $x_n \\in Z$ and $x_n \\to x$, then $f(x) = \\lim f(x_n) = 0$."
        },
        {
          "question": "$f$ is increasing on $S$ when",
          "options": [
            "$x < y \\Rightarrow f(x) < f(y)$ only",
            "$f' > 0$",
            "$x < y \\Rightarrow f(x) \\le f(y)$",
            "$f(x) \\ge 0$"
          ],
          "answer": 2,
          "explanation": "Strictly increasing uses $<$."
        },
        {
          "question": "$f$ is strictly decreasing when",
          "options": [
            "$x < y \\Rightarrow f(x) > f(y)$",
            "$f(x) < 0$",
            "$x < y \\Rightarrow f(x) \\ge f(y)$",
            "$f' \\le 0$"
          ],
          "answer": 0,
          "explanation": "Strict inequality, reversed."
        },
        {
          "question": "For increasing $f$, $\\lim_{x \\to c^-} f(x) =$",
          "options": [
            "$\\sup\\{f(x) : x < c\\}$",
            "$\\inf\\{f(x) : x < c\\}$",
            "$\\sup\\{f(x) : x > c\\}$",
            "$f(c)$"
          ],
          "answer": 0,
          "explanation": "Approaching from the left, the values climb to their supremum."
        },
        {
          "question": "A monotone function can only have",
          "options": [
            "infinite discontinuities inside its domain",
            "jump discontinuities",
            "removable discontinuities",
            "oscillating discontinuities"
          ],
          "answer": 1,
          "explanation": "One-sided limits always exist (sup and inf)."
        },
        {
          "question": "For $\\lfloor x \\rfloor$, the left limit at $x = 3$ is",
          "options": [
            "$2$",
            "It does not exist",
            "$4$",
            "$3$"
          ],
          "answer": 0,
          "explanation": "Just below $3$, $\\lfloor x \\rfloor = 2$."
        },
        {
          "question": "For increasing $f$ on $S$ with $\\infty$ a cluster point, $\\lim_{x \\to \\infty} f(x) =$",
          "options": [
            "$f(0)$",
            "$\\sup\\{f(x) : x \\in S\\}$",
            "$0$",
            "$\\inf\\{f(x) : x \\in S\\}$"
          ],
          "answer": 1,
          "explanation": "It may be $+\\infty$ if the values are unbounded."
        },
        {
          "question": "If $f, g : \\mathbb{R} \\to \\mathbb{R}$ are continuous and $f(r) = g(r)$ for all rationals $r$, then",
          "options": [
            "$f = g$ only on $\\mathbb{Q}$",
            "$f = g$ on $\\mathbb{R}$",
            "nothing follows",
            "$f - g$ is constant"
          ],
          "answer": 1,
          "explanation": "For irrational $x$ take rationals $r_n \\to x$: $f(x) = \\lim f(r_n) = \\lim g(r_n) = g(x)$."
        },
        {
          "question": "$f(x) = \\frac1x$ on $(0, \\infty)$ is",
          "options": [
            "discontinuous at $0$",
            "continuous only on $[1, \\infty)$",
            "continuous at every point of its domain",
            "not continuous"
          ],
          "answer": 2,
          "explanation": "$0$ is not in the domain, so there is nothing to fail there."
        }
      ]
    },
    {
      "id": "QS004",
      "title": "Continuity on closed intervals",
      "questions": [
        {
          "question": "The boundedness theorem says",
          "options": [
            "a bounded function is continuous",
            "a continuous $f$ on $(a, b)$ is bounded",
            "a continuous $f : [a, b] \\to \\mathbb{R}$ is bounded",
            "every function on $[a, b]$ is bounded"
          ],
          "answer": 2,
          "explanation": "Closed and bounded domain plus continuity."
        },
        {
          "question": "The Bolzano–Weierstrass theorem says",
          "options": [
            "every convergent sequence is monotone",
            "every sequence converges",
            "every bounded sequence has a convergent subsequence",
            "every bounded sequence converges"
          ],
          "answer": 2,
          "explanation": "It drives the boundedness and extreme value proofs."
        },
        {
          "question": "Which bounded function on $[0, 1]$ attains neither its supremum nor its infimum?",
          "options": [
            "$f(x) = x$ for $0 < x < 1$, $f(0) = f(1) = \\frac12$",
            "$f(x) = x$",
            "$f(x) = x^2$",
            "$f(x) = 1$"
          ],
          "answer": 0,
          "explanation": "Sup $1$ and inf $0$ are approached but never reached. (It is discontinuous at $0$ and $1$.)"
        },
        {
          "question": "The extreme value theorem says a continuous $f$ on $[a, b]$",
          "options": [
            "attains an absolute maximum and an absolute minimum",
            "is differentiable",
            "is monotone",
            "has a root"
          ],
          "answer": 0,
          "explanation": "Bounds exist and are attained."
        },
        {
          "question": "Why does $f(x) = x$ on $(0, 1)$ have no maximum?",
          "options": [
            "$f$ is not continuous",
            "$f$ is not differentiable",
            "The interval is not closed",
            "$f$ is unbounded"
          ],
          "answer": 2,
          "explanation": "The supremum $1$ is not in the domain."
        },
        {
          "question": "The maximum and minimum of $\\sqrt{1 - x^2}$ on $[-1, 1]$ are",
          "options": [
            "$1$ and none",
            "$1$ at $x = 1$",
            "$0$ at $x = 0$",
            "$1$ at $x = 0$ and $0$ at $x = \\pm1$"
          ],
          "answer": 3,
          "explanation": "Continuous on a closed interval, so both are attained."
        },
        {
          "question": "In the proof of the extreme value theorem, after finding $f(x_n) \\to \\sup f$ we use",
          "options": [
            "Rolle's theorem",
            "the MVT",
            "the IVT",
            "Bolzano–Weierstrass to extract a convergent subsequence, then continuity"
          ],
          "answer": 3,
          "explanation": "The limit point $d$ lies in $[a, b]$ and $f(d) = \\sup f$."
        },
        {
          "question": "Bolzano's lemma: if $f$ is continuous on $[a, b]$ and $f(a) < 0 < f(b)$, then",
          "options": [
            "$f(c) = 0$ for some $c \\in (a, b)$",
            "$f'(c) = 0$ for some $c$",
            "$f$ is increasing",
            "$f(c) = 0$ for exactly one $c$"
          ],
          "answer": 0,
          "explanation": "Existence, not uniqueness."
        },
        {
          "question": "In the bisection proof, after $n$ steps the interval length is",
          "options": [
            "$2^n(b - a)$",
            "$\\frac{b - a}{n^2}$",
            "$\\frac{b - a}{n}$",
            "$2^{1 - n}(b - a)$"
          ],
          "answer": 3,
          "explanation": "Each step halves the length, starting from $b - a$."
        },
        {
          "question": "Why does $x^5 + x - 1 = 0$ have a root in $(0, 1)$?",
          "options": [
            "$f(1) = 1$",
            "$f$ is increasing",
            "$f'(x) > 0$",
            "$f(0) = -1 < 0 < 1 = f(1)$ and $f$ is continuous"
          ],
          "answer": 3,
          "explanation": "The intermediate value theorem."
        },
        {
          "question": "On $[0, 1]$, $\\lfloor x \\rfloor$ never takes the value $\\frac12$. This shows",
          "options": [
            "the IVT is false",
            "$\\lfloor x \\rfloor$ is unbounded",
            "the IVT needs continuity",
            "$[0, 1]$ is not closed"
          ],
          "answer": 2,
          "explanation": "$\\lfloor x \\rfloor$ jumps at $1$."
        },
        {
          "question": "If $f : [0, 1] \\to [0, 1]$ is continuous, then",
          "options": [
            "$f(y) = y$ for some $y \\in [0, 1]$",
            "$f$ is increasing",
            "$f(0) = 0$",
            "$f$ is onto"
          ],
          "answer": 0,
          "explanation": "Apply the IVT to $g(x) = f(x) - x$: $g(0) \\ge 0 \\ge g(1)$."
        },
        {
          "question": "If $f$ is continuous on an interval $I$, then $f(I)$ is",
          "options": [
            "an interval",
            "finite",
            "a closed interval",
            "an open set"
          ],
          "answer": 0,
          "explanation": "A corollary of the IVT."
        },
        {
          "question": "Every real polynomial of odd degree",
          "options": [
            "is bounded",
            "is increasing",
            "has exactly one real root",
            "has at least one real root"
          ],
          "answer": 3,
          "explanation": "It takes both signs, so the IVT applies."
        },
        {
          "question": "$f$ is uniformly continuous on $E$ when",
          "options": [
            "$f$ is differentiable on $E$",
            "$f$ is continuous at each point of $E$",
            "$f$ is bounded on $E$",
            "for every $\\varepsilon > 0$ there is $\\delta > 0$ with $|f(x) - f(y)| < \\varepsilon$ for all $x, y \\in E$ with $|x - y| < \\delta$"
          ],
          "answer": 3,
          "explanation": "One δ works for all points."
        },
        {
          "question": "The difference between continuity and uniform continuity is that",
          "options": [
            "in uniform continuity δ depends only on ε, not on the point",
            "there is no difference",
            "uniform continuity needs differentiability",
            "continuity needs a closed interval"
          ],
          "answer": 0,
          "explanation": "The order of quantifiers changes."
        },
        {
          "question": "$f(x) = \\frac1x$ on $(0, 1)$ is",
          "options": [
            "discontinuous",
            "uniformly continuous",
            "continuous but not uniformly continuous",
            "Lipschitz"
          ],
          "answer": 2,
          "explanation": "Near $0$ the needed δ shrinks to $0$."
        },
        {
          "question": "Every continuous $f : [a, b] \\to \\mathbb{R}$ is",
          "options": [
            "differentiable",
            "monotone",
            "Lipschitz",
            "uniformly continuous"
          ],
          "answer": 3,
          "explanation": "Proved by contrapositive with Bolzano–Weierstrass."
        },
        {
          "question": "For $f(x) = x^2$ on $[0, 2]$, a δ for uniform continuity is",
          "options": [
            "none exists",
            "$\\frac\\varepsilon2$",
            "$\\frac\\varepsilon4$",
            "$\\varepsilon^2$"
          ],
          "answer": 2,
          "explanation": "$|x^2 - y^2| = |x + y||x - y| \\le 4|x - y|$."
        },
        {
          "question": "$f(x) = x^2$ on $\\mathbb{R}$ is",
          "options": [
            "continuous but not uniformly continuous",
            "uniformly continuous",
            "Lipschitz",
            "discontinuous"
          ],
          "answer": 0,
          "explanation": "$|x^2 - y^2| = |x + y||x - y|$; the factor $|x + y|$ is unbounded."
        },
        {
          "question": "$f$ satisfies a Lipschitz condition on an interval when",
          "options": [
            "$|f(x) - f(y)| \\le k|x - y|$ for every pair of points $x, y$ of the interval, for some constant $k$",
            "$|f(x)| \\le k$",
            "$|f(x) - f(y)| \\le k$",
            "$f$ is differentiable"
          ],
          "answer": 0,
          "explanation": "Differences bounded by a constant times the distance."
        },
        {
          "question": "A Lipschitz function with constant $k > 0$ is uniformly continuous, with",
          "options": [
            "$\\delta = \\frac\\varepsilon k$",
            "$\\delta = \\varepsilon$",
            "$\\delta = k\\varepsilon$",
            "$\\delta = \\frac k\\varepsilon$"
          ],
          "answer": 0,
          "explanation": "$|f(x) - f(y)| \\le k|x - y| < k\\delta = \\varepsilon$."
        },
        {
          "question": "$f(x) = \\sqrt x$ on $[1, \\infty)$ is Lipschitz with constant",
          "options": [
            "$\\frac12$",
            "$1$",
            "It is not Lipschitz",
            "$2$"
          ],
          "answer": 0,
          "explanation": "$|\\sqrt x - \\sqrt y| = \\frac{|x - y|}{\\sqrt x + \\sqrt y} \\le \\frac12|x - y|$."
        },
        {
          "question": "$f(x) = 3x + 2$ is Lipschitz with constant",
          "options": [
            "$2$",
            "$5$",
            "$1$",
            "$3$"
          ],
          "answer": 3,
          "explanation": "$|f(x) - f(y)| = 3|x - y|$."
        },
        {
          "question": "$|\\cos x - \\cos y| \\le |x - y|$ shows that $\\cos$ is",
          "options": [
            "periodic",
            "differentiable",
            "monotone",
            "Lipschitz, hence uniformly continuous"
          ],
          "answer": 3,
          "explanation": "Lipschitz with $k = 1$."
        }
      ]
    },
    {
      "id": "QS005",
      "title": "Differentiation",
      "questions": [
        {
          "question": "$f$ is differentiable at $x_0$ when",
          "options": [
            "$f(x_0)$ exists",
            "$f$ is continuous at $x_0$",
            "$\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$ exists",
            "$\\lim_{x \\to x_0} f(x) = f(x_0)$"
          ],
          "answer": 2,
          "explanation": "The Newton quotient has a limit."
        },
        {
          "question": "An equivalent form of $f'(x_0)$ is",
          "options": [
            "$\\lim_{h \\to 0} f(x_0 + h)$",
            "$\\lim_{h \\to 0} \\frac{f(h) - f(x_0)}{h}$",
            "$\\frac{f(x_0 + 1) - f(x_0)}{1}$",
            "$\\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h}$"
          ],
          "answer": 3,
          "explanation": "Put $x = x_0 + h$."
        },
        {
          "question": "From first principles, the derivative of $x^2$ at $x_0$ is",
          "options": [
            "$x_0$",
            "$2$",
            "$2x_0$",
            "$x_0^2$"
          ],
          "answer": 2,
          "explanation": "$\\frac{(x_0 + h)^2 - x_0^2}{h} = 2x_0 + h \\to 2x_0$."
        },
        {
          "question": "For $f(x) = \\sqrt x$, $x_0 > 0$, $f'(x_0) =$",
          "options": [
            "$2\\sqrt{x_0}$",
            "$\\frac{1}{2\\sqrt{x_0}}$",
            "$\\frac{1}{\\sqrt{x_0}}$",
            "$\\frac{\\sqrt{x_0}}{2}$"
          ],
          "answer": 1,
          "explanation": "Multiply by the conjugate: $\\frac{1}{\\sqrt x + \\sqrt{x_0}} \\to \\frac{1}{2\\sqrt{x_0}}$."
        },
        {
          "question": "The derivative of $x^n$ follows from",
          "options": [
            "$x^n - x_0^n = (x - x_0)\\sum_{k=0}^{n-1} x^{n-1-k}x_0^k$",
            "the binomial theorem only",
            "L'Hôpital's rule",
            "the MVT"
          ],
          "answer": 0,
          "explanation": "The quotient tends to $nx_0^{n-1}$."
        },
        {
          "question": "For $f(x) = x^2 + x$, $f'(2) =$",
          "options": [
            "$6$",
            "$4$",
            "$2x + 1$",
            "$5$"
          ],
          "answer": 3,
          "explanation": "$\\frac{(2 + h)^2 + (2 + h) - 6}{h} = 5 + h$."
        },
        {
          "question": "If $f$ is differentiable at $x_0$, then",
          "options": [
            "$f$ is differentiable near $x_0$",
            "$f'$ is continuous at $x_0$",
            "$f(x_0) = 0$",
            "$f$ is continuous at $x_0$"
          ],
          "answer": 3,
          "explanation": "$f(x) - f(x_0) = \\frac{f(x) - f(x_0)}{x - x_0}(x - x_0) \\to f'(x_0) \\cdot 0$."
        },
        {
          "question": "Which function is continuous but not differentiable at $0$?",
          "options": [
            "$\\operatorname{sgn} x$",
            "$x^2$",
            "$x^3$",
            "$|x|$"
          ],
          "answer": 3,
          "explanation": "Left derivative $-1$, right derivative $1$."
        },
        {
          "question": "For $f(x) = |x|$, the left and right derivatives at $0$ are",
          "options": [
            "$1$ and $-1$",
            "$-1$ and $1$",
            "$0$ and $0$",
            "both $1$"
          ],
          "answer": 1,
          "explanation": "$\\frac{|h|}{h} = -1$ for $h < 0$, $1$ for $h > 0$."
        },
        {
          "question": "The signum function is not differentiable at $0$ because",
          "options": [
            "it is odd",
            "it is discontinuous there",
            "its derivative is $0$",
            "it is bounded"
          ],
          "answer": 1,
          "explanation": "Discontinuous ⇒ not differentiable."
        },
        {
          "question": "For $f(x) = x^2\\sin\\frac1x$ ($x \\ne 0$), $f(0) = 0$, $f'(0) =$",
          "options": [
            "$1$",
            "$\\infty$",
            "It does not exist",
            "$0$"
          ],
          "answer": 3,
          "explanation": "$\\left|\\frac{h^2\\sin(1/h)}{h}\\right| \\le |h| \\to 0$."
        },
        {
          "question": "$f(x) = \\sqrt[3]x$ at $0$ is",
          "options": [
            "differentiable with $f'(0) = 1$",
            "continuous but not differentiable",
            "differentiable with $f'(0) = 0$",
            "discontinuous"
          ],
          "answer": 1,
          "explanation": "The quotient $x^{-2/3} \\to \\infty$: a vertical tangent."
        },
        {
          "question": "In ε-δ form, $f'(x_0) = L$ means",
          "options": [
            "$|f'(x) - L| < \\delta$",
            "$|f(x) - L| < \\varepsilon$ when $|x - x_0| < \\delta$",
            "$|f(x) - f(x_0)| < \\varepsilon$",
            "for every $\\varepsilon > 0$ there is δ with $\\left|\\frac{f(x) - f(x_0)}{x - x_0} - L\\right| < \\varepsilon$ when $0 < |x - x_0| < \\delta$"
          ],
          "answer": 3,
          "explanation": "It is the limit definition applied to the Newton quotient."
        },
        {
          "question": "Weierstrass' function $\\sum a^n\\cos(b^n\\pi x)$ is",
          "options": [
            "discontinuous everywhere",
            "continuous everywhere, differentiable nowhere",
            "differentiable everywhere",
            "a polynomial"
          ],
          "answer": 1,
          "explanation": "A famous counterexample."
        },
        {
          "question": "The product rule says $(fg)'(x_0) =$",
          "options": [
            "$f'(x_0)g(x_0) - f(x_0)g'(x_0)$",
            "$f'(x_0)g'(x_0)$",
            "$f(x_0)g(x_0)$",
            "$f'(x_0)g(x_0) + f(x_0)g'(x_0)$"
          ],
          "answer": 3,
          "explanation": "Add and subtract a cross term."
        },
        {
          "question": "The quotient rule says $\\left(\\frac fg\\right)'(x_0) =$",
          "options": [
            "$\\frac{f'(x_0)g(x_0) + f(x_0)g'(x_0)}{g(x_0)}$",
            "$\\frac{f'(x_0)g(x_0) - f(x_0)g'(x_0)}{[g(x_0)]^2}$",
            "$\\frac{f(x_0)g'(x_0) - f'(x_0)g(x_0)}{[g(x_0)]^2}$",
            "$\\frac{f'(x_0)}{g'(x_0)}$"
          ],
          "answer": 1,
          "explanation": "Requires $g(x_0) \\ne 0$."
        },
        {
          "question": "In the proof of the product rule, $f(x) \\to f(x_0)$ because",
          "options": [
            "of the MVT",
            "$f$ is a polynomial",
            "$g$ is continuous",
            "differentiable at $x_0$ implies continuous at $x_0$"
          ],
          "answer": 3,
          "explanation": "That is the key step."
        },
        {
          "question": "The chain rule says $(g \\circ f)'(x_0) =$",
          "options": [
            "$g(f'(x_0))$",
            "$g'(f(x_0))\\,f'(x_0)$",
            "$g'(x_0)f'(x_0)$",
            "$g'(f'(x_0))$"
          ],
          "answer": 1,
          "explanation": "Rates multiply."
        },
        {
          "question": "$\\frac{d}{dx}\\sin(x^2) =$",
          "options": [
            "$\\cos(x^2)$",
            "$2x\\sin(x^2)$",
            "$2x\\cos(x^2)$",
            "$\\cos(2x)$"
          ],
          "answer": 2,
          "explanation": "Chain rule with inner function $x^2$."
        },
        {
          "question": "For $f(x) = \\frac{x^3}{x^2 - 1}$, $f'(x) =$",
          "options": [
            "$\\frac{3x^2}{2x}$",
            "$\\frac{x^4 + 3x^2}{(x^2 - 1)^2}$",
            "$\\frac{3x^2(x^2 - 1)}{(x^2 - 1)^2}$",
            "$\\frac{x^4 - 3x^2}{(x^2 - 1)^2}$"
          ],
          "answer": 3,
          "explanation": "$\\frac{3x^2(x^2 - 1) - x^3(2x)}{(x^2 - 1)^2} = \\frac{x^4 - 3x^2}{(x^2 - 1)^2}$."
        },
        {
          "question": "The inverse function rule gives $(f^{-1})'(y_0) =$",
          "options": [
            "$\\frac{1}{f'(x_0)}$ where $y_0 = f(x_0)$",
            "$\\frac{1}{f'(y_0)}$",
            "$-f'(x_0)$",
            "$f'(x_0)$"
          ],
          "answer": 0,
          "explanation": "Needs $f$ strictly monotone, continuous, and $f'(x_0) \\ne 0$."
        },
        {
          "question": "Using the inverse function rule, $(\\sin^{-1})'(y) =$",
          "options": [
            "$\\frac{1}{\\sqrt{1 - y^2}}$",
            "$\\cos(\\sin^{-1}y)$",
            "$-\\frac{1}{\\sqrt{1 - y^2}}$",
            "$\\frac{1}{\\cos y}$"
          ],
          "answer": 0,
          "explanation": "$\\frac{1}{\\cos x}$ with $\\sin x = y$, and $\\cos x = \\sqrt{1 - y^2}$."
        },
        {
          "question": "Why is $f^{-1}(y) = \\sqrt[3]y$ not differentiable at $0$, though $f(x) = x^3$ is?",
          "options": [
            "$x^3$ is not continuous",
            "$\\sqrt[3]y$ is not continuous",
            "$x^3$ is not monotone",
            "$f'(0) = 0$, so $\\frac{1}{f'(0)}$ is undefined"
          ],
          "answer": 3,
          "explanation": "The rule needs $f'(x_0) \\ne 0$."
        },
        {
          "question": "The inverse function rule applied to $e^x$ gives $(\\ln y)' =$",
          "options": [
            "$e^y$",
            "$\\frac1y$",
            "$\\ln y$",
            "$\\frac{1}{e^y}$"
          ],
          "answer": 1,
          "explanation": "$\\frac{1}{e^x}$ with $e^x = y$."
        },
        {
          "question": "For a constant $\\lambda$, $(\\lambda f)'(x_0) =$",
          "options": [
            "$\\lambda f'(x_0)$",
            "$f'(\\lambda x_0)$",
            "$0$",
            "$\\lambda + f'(x_0)$"
          ],
          "answer": 0,
          "explanation": "Constants factor out of limits."
        }
      ]
    },
    {
      "id": "QS006",
      "title": "The mean value theorems and Taylor",
      "questions": [
        {
          "question": "$f$ has a local maximum at $x_0$ when",
          "options": [
            "$f(x) \\le f(x_0)$ for all $x$",
            "$f(x) \\le f(x_0)$ for all $x$ in some open interval around $x_0$",
            "$f(x_0) > 0$",
            "$f'(x_0) = 0$"
          ],
          "answer": 1,
          "explanation": "Local means on a neighbourhood only."
        },
        {
          "question": "Fermat's theorem says that if $f$ has a local extremum at an interior point $x_0$ and is differentiable there, then",
          "options": [
            "$f''(x_0) = 0$",
            "$f'(x_0) = 0$",
            "$f$ is constant",
            "$f(x_0) = 0$"
          ],
          "answer": 1,
          "explanation": "Right quotient $\\le 0$, left quotient $\\ge 0$."
        },
        {
          "question": "$f(x) = x^3$ has $f'(0) = 0$. This shows that",
          "options": [
            "$f'(x_0) = 0$ does not guarantee an extremum",
            "$x^3$ has a minimum at $0$",
            "$x^3$ is not differentiable",
            "Fermat's theorem is false"
          ],
          "answer": 0,
          "explanation": "Fermat gives a necessary, not sufficient, condition."
        },
        {
          "question": "$f(x) = x$ on $[0, 1]$ has its maximum at $1$ with $f'(1) = 1 \\ne 0$. Why is there no contradiction with Fermat?",
          "options": [
            "Fermat only applies to minima",
            "$f$ is not differentiable",
            "$1$ is an endpoint, not an interior point",
            "$f$ is not continuous"
          ],
          "answer": 2,
          "explanation": "Fermat needs an interior point."
        },
        {
          "question": "A critical point of a differentiable $f$ is a point where",
          "options": [
            "$f''(x_0) = 0$",
            "$f'(x_0) = 0$",
            "$f(x_0) = 0$",
            "$f$ is discontinuous"
          ],
          "answer": 1,
          "explanation": "Every interior local extremum is a critical point."
        },
        {
          "question": "Rolle's theorem requires",
          "options": [
            "$f$ monotone",
            "$f(a) = f(b) = 0$ only",
            "$f$ differentiable on $[a, b]$ only",
            "$f$ continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$"
          ],
          "answer": 3,
          "explanation": "Then $f'(c) = 0$ for some $c \\in (a, b)$."
        },
        {
          "question": "For $f(x) = x^4 - 4x^3 + 3x^2 + 2$ on $[1, 3]$, Rolle's theorem gives $c =$",
          "options": [
            "$2$",
            "$0$",
            "$\\frac{3 - \\sqrt3}{2}$",
            "$\\frac{3 + \\sqrt3}{2}$"
          ],
          "answer": 3,
          "explanation": "$f'(x) = 2x(2x^2 - 6x + 3)$; the only root in $(1, 3)$ is $\\frac{3 + \\sqrt3}{2} \\approx 2.366$."
        },
        {
          "question": "Rolle's theorem does not apply to $\\sin(\\frac\\pi2x)$ on $[-3, 3]$ because",
          "options": [
            "$f$ has no critical points",
            "$f$ is not continuous",
            "$f(-3) = 1 \\ne -1 = f(3)$",
            "$f$ is not differentiable"
          ],
          "answer": 2,
          "explanation": "The end values differ."
        },
        {
          "question": "The mean value theorem says there is $c \\in (a, b)$ with",
          "options": [
            "$f(c) = \\frac{f(a) + f(b)}{2}$",
            "$f'(c) = \\frac{f(b) - f(a)}{b - a}$",
            "$f'(c) = 0$",
            "$f(c) = 0$"
          ],
          "answer": 1,
          "explanation": "Tangent parallel to the chord."
        },
        {
          "question": "For $f(x) = x^2$ on $[1, 3]$, the MVT gives $c =$",
          "options": [
            "$1.5$",
            "$\\sqrt5$",
            "$2$",
            "$4$"
          ],
          "answer": 2,
          "explanation": "Chord slope $4 = 2c$."
        },
        {
          "question": "Geometrically, the MVT says",
          "options": [
            "the area under the graph equals $f(b) - f(a)$",
            "the function has a maximum",
            "some tangent is parallel to the chord from $(a, f(a))$ to $(b, f(b))$",
            "the graph is a straight line"
          ],
          "answer": 2,
          "explanation": "In motion: instantaneous speed equals average speed somewhere."
        },
        {
          "question": "The MVT is proved by applying Rolle to",
          "options": [
            "$h(x) = f(x) - [m(x - a) + f(a)]$, $m$ the chord slope",
            "$h(x) = f(x)g(x)$",
            "$h(x) = f(x) - f(a)$",
            "$h(x) = f'(x)$"
          ],
          "answer": 0,
          "explanation": "$h(a) = h(b) = 0$."
        },
        {
          "question": "Cauchy's mean value theorem gives $c \\in (a, b)$ with",
          "options": [
            "$f'(c)g'(c) = 0$",
            "$f'(c) = g'(c)$",
            "$f'(c)[g(b) - g(a)] = g'(c)[f(b) - f(a)]$",
            "$f(c) = g(c)$"
          ],
          "answer": 2,
          "explanation": "With $g(x) = x$ it is the ordinary MVT."
        },
        {
          "question": "For $f(x) = x^2$, $g(x) = \\arctan x$ on $[0, 1]$, the Cauchy MVT point $c$ satisfies",
          "options": [
            "$c^3 + c = \\frac2\\pi$, giving $c \\approx 0.507$",
            "no such $c$ exists",
            "$c = \\frac\\pi4$",
            "$c = \\frac12$"
          ],
          "answer": 0,
          "explanation": "$2c \\cdot \\frac\\pi4 = \\frac{1}{1 + c^2} \\cdot 1$, i.e. $c(1 + c^2) = \\frac2\\pi$."
        },
        {
          "question": "If $f'(x) = 0$ for all $x \\in (a, b)$ ($f$ continuous on $[a, b]$), then",
          "options": [
            "$f$ is constant on $[a, b]$",
            "$f = 0$",
            "nothing follows",
            "$f$ is linear"
          ],
          "answer": 0,
          "explanation": "MVT on $[a, x]$ gives $f(x) = f(a)$."
        },
        {
          "question": "If $f' = g'$ on $(a, b)$, then",
          "options": [
            "$f - g$ is linear",
            "$f = g + C$ for a constant $C$",
            "$f = g$",
            "$f = Cg$"
          ],
          "answer": 1,
          "explanation": "Apply the previous result to $f - g$."
        },
        {
          "question": "If $f'(x) > 0$ on $(a, b)$ ($f$ continuous on $[a, b]$), then $f$ is",
          "options": [
            "convex",
            "positive",
            "constant",
            "strictly increasing on $[a, b]$"
          ],
          "answer": 3,
          "explanation": "MVT: $f(y) - f(x) = f'(c)(y - x) > 0$."
        },
        {
          "question": "If $f'$ changes from $+$ to $-$ at $x_0$, then $f$ has at $x_0$",
          "options": [
            "a local minimum",
            "a discontinuity",
            "a local maximum",
            "no extremum"
          ],
          "answer": 2,
          "explanation": "The first-derivative test."
        },
        {
          "question": "If $|f(x) - f(y)| \\le (x - y)^2$ for all $x, y$, then $f$ is",
          "options": [
            "increasing",
            "constant",
            "linear",
            "Lipschitz but not differentiable"
          ],
          "answer": 1,
          "explanation": "The Newton quotient is at most $|x - y| \\to 0$, so $f' = 0$."
        },
        {
          "question": "If $m_1 \\le f'(x) \\le M_1$ on $(a, b)$, then",
          "options": [
            "$m_1(b - a) \\le f(b) - f(a) \\le M_1(b - a)$",
            "$f$ is constant",
            "$m_1 \\le f(b) - f(a) \\le M_1$",
            "$m_1 = M_1$"
          ],
          "answer": 0,
          "explanation": "From $f(b) - f(a) = f'(c)(b - a)$."
        },
        {
          "question": "The Taylor polynomial of degree $n$ about $x_0$ is",
          "options": [
            "$f(x_0) + f'(x_0)x$",
            "$\\sum_{k=0}^n \\frac{f(x_0)}{k!}x^k$",
            "$\\sum_{k=0}^n f^{(k)}(x_0)(x - x_0)^k$",
            "$T_n(x) = \\sum_{k=0}^n \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k$"
          ],
          "answer": 3,
          "explanation": "It matches $f$ and its first $n$ derivatives at $x_0$."
        },
        {
          "question": "The Lagrange remainder in Taylor's theorem is",
          "options": [
            "$f(x) - f(x_0)$",
            "$\\frac{f^{(n+1)}(x_0)}{n!}$",
            "$\\frac{f^{(n)}(x_0)}{n!}(x - x_0)^n$",
            "$R_n(x) = \\frac{f^{(n+1)}(c)}{(n + 1)!}(x - x_0)^{n+1}$, $c$ between $x_0$ and $x$"
          ],
          "answer": 3,
          "explanation": "With $n = 0$ it is the MVT."
        },
        {
          "question": "If $f$ is a polynomial of degree at most $n$, its Taylor polynomial $T_n$ about any point",
          "options": [
            "equals $f$ exactly",
            "approximates $f$ only near $x_0$",
            "has degree $n + 1$",
            "is zero"
          ],
          "answer": 0,
          "explanation": "$f^{(n+1)} = 0$, so the remainder vanishes."
        },
        {
          "question": "For $f(x) = (1 + x)^{-2}$ about $x_0 = \\frac12$, the coefficient of $(x - \\frac12)^k$ in $T_n$ is",
          "options": [
            "$(k + 1)\\left(\\frac32\\right)^{k+2}$",
            "$\\frac{(-1)^k}{k!}$",
            "$(-1)^k\\left(\\frac23\\right)^k$",
            "$(-1)^k(k + 1)\\left(\\frac23\\right)^{k+2}$"
          ],
          "answer": 3,
          "explanation": "$\\frac{f^{(k)}(\\frac12)}{k!} = (-1)^k(k + 1)\\left(\\frac32\\right)^{-(k+2)}$."
        },
        {
          "question": "Using L'Hôpital's rule, $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} =$",
          "options": [
            "$\\frac12$",
            "$1$",
            "It does not exist",
            "$0$"
          ],
          "answer": 0,
          "explanation": "Twice: $\\frac{\\sin x}{2x} \\to \\frac{\\cos x}{2} \\to \\frac12$."
        }
      ]
    },
    {
      "id": "QS007",
      "title": "The Riemann integral",
      "questions": [
        {
          "question": "A partition of $[a, b]$ is",
          "options": [
            "a sequence converging to $b$",
            "any infinite subset of $[a, b]$",
            "a set of disjoint open intervals",
            "a finite set $\\{x_0, \\dots, x_n\\}$ with $a = x_0 < x_1 < \\cdots < x_n = b$"
          ],
          "answer": 3,
          "explanation": "Finitely many ordered points from $a$ to $b$."
        },
        {
          "question": "The gauge (norm) $\\|\\pi\\|$ of a partition is",
          "options": [
            "the length of its shortest subinterval",
            "the length of its longest subinterval",
            "$b - a$",
            "the number of points"
          ],
          "answer": 1,
          "explanation": "$\\|\\pi\\| = \\max_k (x_k - x_{k-1})$."
        },
        {
          "question": "$\\pi^*$ is a refinement of $\\pi$ when",
          "options": [
            "$\\pi^*$ has fewer points",
            "$\\pi \\subseteq \\pi^*$",
            "$\\pi^* \\subseteq \\pi$",
            "$\\|\\pi^*\\| = \\|\\pi\\|$"
          ],
          "answer": 1,
          "explanation": "It keeps every point of $\\pi$ and may add more."
        },
        {
          "question": "The lower Riemann sum is",
          "options": [
            "$\\sum f(x_k)\\Delta x_k$",
            "$\\sum m_k$",
            "$L(f, \\pi) = \\sum m_k\\Delta x_k$, $m_k = \\inf_{[x_{k-1}, x_k]} f$",
            "$\\sum M_k\\Delta x_k$"
          ],
          "answer": 2,
          "explanation": "Infimum on each piece times its length."
        },
        {
          "question": "For any partition, $L(f, \\pi) \\le U(f, \\pi)$ because",
          "options": [
            "$f$ is increasing",
            "$\\Delta x_k$ is small",
            "$f$ is continuous",
            "$m_k \\le M_k$ on each subinterval"
          ],
          "answer": 3,
          "explanation": "Inf is at most sup."
        },
        {
          "question": "If $m \\le f \\le M$ on $[a, b]$, then for every partition",
          "options": [
            "$L(f, \\pi) = U(f, \\pi)$",
            "$m(b - a) \\le L(f, \\pi) \\le U(f, \\pi) \\le M(b - a)$",
            "$U(f, \\pi) \\le m(b - a)$",
            "$m \\le L(f, \\pi) \\le M$"
          ],
          "answer": 1,
          "explanation": "Since $\\sum \\Delta x_k = b - a$."
        },
        {
          "question": "If $\\pi^*$ refines $\\pi$, then",
          "options": [
            "$L(f, \\pi^*) = L(f, \\pi)$",
            "$L(f, \\pi^*) \\le L(f, \\pi)$",
            "$L(f, \\pi) \\le L(f, \\pi^*) \\le U(f, \\pi^*) \\le U(f, \\pi)$",
            "$U(f, \\pi^*) \\ge U(f, \\pi)$"
          ],
          "answer": 2,
          "explanation": "An inf over a smaller set is larger; a sup over a smaller set is smaller."
        },
        {
          "question": "Why is $L(f, \\pi_1) \\le U(f, \\pi_2)$ for any two partitions?",
          "options": [
            "Because $\\pi_1 \\subseteq \\pi_2$",
            "Because $f$ is continuous",
            "Use the common refinement $\\pi_1 \\cup \\pi_2$",
            "It is false in general"
          ],
          "answer": 2,
          "explanation": "$L(\\pi_1) \\le L(\\pi_1 \\cup \\pi_2) \\le U(\\pi_1 \\cup \\pi_2) \\le U(\\pi_2)$."
        },
        {
          "question": "The completeness axiom says",
          "options": [
            "every non-empty subset of $\\mathbb{R}$ bounded above has a supremum in $\\mathbb{R}$",
            "every bounded sequence converges",
            "every subset of $\\mathbb{R}$ is bounded",
            "$\\mathbb{Q}$ is complete"
          ],
          "answer": 0,
          "explanation": "It guarantees the lower and upper integrals exist."
        },
        {
          "question": "The lower integral $\\underline{\\int_a^b} f$ is",
          "options": [
            "$\\sup\\{L(f, \\pi) : \\pi \\text{ a partition}\\}$",
            "$\\inf\\{L(f, \\pi)\\}$",
            "$\\sup\\{U(f, \\pi)\\}$",
            "$L(f, \\pi)$ for $n = 1$"
          ],
          "answer": 0,
          "explanation": "The best lower approximation."
        },
        {
          "question": "A bounded $f$ is Riemann integrable on $[a, b]$ when",
          "options": [
            "$f$ is continuous",
            "$f$ is monotone",
            "$L(f, \\pi) = U(f, \\pi)$ for some $\\pi$",
            "its lower and upper integrals are equal"
          ],
          "answer": 3,
          "explanation": "The common value is $\\int_a^b f$."
        },
        {
          "question": "For a constant $f(x) = c$, $\\int_a^b c\\,dx =$",
          "options": [
            "$b - a$",
            "$c(b - a)$",
            "$0$",
            "$c$"
          ],
          "answer": 1,
          "explanation": "Every $L$ and $U$ equal $c(b - a)$."
        },
        {
          "question": "For $f(x) = x^2$ on $[0, 1]$ with $\\pi_n$ uniform, $U(f, \\pi_n) =$",
          "options": [
            "$\\frac{n + 1}{2n}$",
            "$\\frac13$",
            "$\\frac{(n + 1)(2n + 1)}{6n^2}$",
            "$\\frac{(n - 1)(2n - 1)}{6n^2}$"
          ],
          "answer": 2,
          "explanation": "$\\frac{1}{n^3}\\sum_{k=1}^n k^2 = \\frac{n(n + 1)(2n + 1)}{6n^3}$."
        },
        {
          "question": "For $f(x) = x^2$ on $[0, 1]$ with $\\pi_n$ uniform, $U(f, \\pi_n) - L(f, \\pi_n) =$",
          "options": [
            "$0$",
            "$\\frac1n$",
            "$\\frac13$",
            "$\\frac{1}{n^2}$"
          ],
          "answer": 1,
          "explanation": "Telescoping: $\\frac1n(f(1) - f(0))$."
        },
        {
          "question": "$\\int_0^1 x^2\\,dx$ from the definition equals",
          "options": [
            "$\\frac13$",
            "$1$",
            "$\\frac12$",
            "$\\frac23$"
          ],
          "answer": 0,
          "explanation": "$\\lim U(f, \\pi_n) = \\lim\\left(\\frac13 + \\frac{1}{2n} + \\frac{1}{6n^2}\\right)$."
        },
        {
          "question": "Riemann's criterion: a bounded $f$ is integrable if and only if",
          "options": [
            "$U(f, \\pi) - L(f, \\pi) < \\varepsilon$ for one fixed $\\varepsilon$",
            "$f$ is continuous",
            "$U(f, \\pi) = L(f, \\pi)$ for every $\\pi$",
            "for every $\\varepsilon > 0$ some partition has $U(f, \\pi) - L(f, \\pi) < \\varepsilon$"
          ],
          "answer": 3,
          "explanation": "One good partition per ε."
        },
        {
          "question": "The sequential criterion: $f$ is integrable if and only if",
          "options": [
            "$U(f, \\pi_n) \\to 0$",
            "$L(f, \\pi_n) \\to 0$",
            "some sequence of partitions has $U(f, \\pi_n) - L(f, \\pi_n) \\to 0$, and then $\\int f = \\lim U(f, \\pi_n)$",
            "$\\|\\pi_n\\| \\to 0$"
          ],
          "answer": 2,
          "explanation": "It proves integrability and computes the integral."
        },
        {
          "question": "For increasing $f$ on $[a, b]$ and the uniform partition $\\pi_n$, $U(f, \\pi_n) - L(f, \\pi_n) =$",
          "options": [
            "$0$",
            "$f(b) - f(a)$",
            "$\\frac{b - a}{n}$",
            "$[f(b) - f(a)]\\frac{b - a}{n}$"
          ],
          "answer": 3,
          "explanation": "A telescoping sum."
        },
        {
          "question": "Using $\\pi_n = \\{\\frac{2i}{n}\\}$, $\\int_0^2 (x^2 + x)\\,dx =$",
          "options": [
            "$6$",
            "$\\frac{20}{3}$",
            "$\\frac{14}{3}$",
            "$\\frac83$"
          ],
          "answer": 2,
          "explanation": "$\\frac83 + 2 = \\frac{14}{3}$."
        },
        {
          "question": "Darboux's criterion (Odadare's criterion) is stated in terms of",
          "options": [
            "partitions with small gauge $\\|\\pi\\| < \\delta$",
            "tags only",
            "the derivative of $f$",
            "refinements only"
          ],
          "answer": 0,
          "explanation": "Every sufficiently fine partition has $U - L < \\varepsilon$."
        },
        {
          "question": "Class A of integrable functions on $[a, b]$ is",
          "options": [
            "monotone functions",
            "continuous functions",
            "differentiable functions",
            "step functions only"
          ],
          "answer": 0,
          "explanation": "Proof: telescoping with a fine partition."
        },
        {
          "question": "The proof that continuous functions on $[a, b]$ are integrable uses",
          "options": [
            "uniform continuity on $[a, b]$",
            "monotonicity",
            "Taylor's theorem",
            "the MVT"
          ],
          "answer": 0,
          "explanation": "Small pieces make $M_k - m_k < \\frac{\\varepsilon}{b - a}$."
        },
        {
          "question": "A bounded function on $[a, b]$ with finitely many discontinuities is",
          "options": [
            "never integrable",
            "integrable only if monotone",
            "Riemann integrable",
            "continuous"
          ],
          "answer": 2,
          "explanation": "Class C: isolate each discontinuity in a tiny piece."
        },
        {
          "question": "The Dirichlet function ($1$ on $\\mathbb{Q}$, $0$ otherwise) on $[0, 1]$",
          "options": [
            "is not integrable: $U = 1$ and $L = 0$ for every partition",
            "is unbounded",
            "is integrable with integral $0$",
            "is integrable with integral $1$"
          ],
          "answer": 0,
          "explanation": "Every subinterval contains rationals and irrationals."
        },
        {
          "question": "$\\int_{-1}^{3} \\lfloor x \\rfloor\\,dx =$",
          "options": [
            "$6$",
            "$3$",
            "$4$",
            "$2$"
          ],
          "answer": 3,
          "explanation": "$-1 + 0 + 1 + 2$ over unit pieces."
        }
      ]
    },
    {
      "id": "QS008",
      "title": "Properties, Riemann sums and the FTC",
      "questions": [
        {
          "question": "For bounded $f$ and $c \\in (a, b)$, $f \\in \\mathcal{R}[a, b]$ if and only if",
          "options": [
            "$f(c) = 0$",
            "$f \\in \\mathcal{R}[a, c]$ and $f \\in \\mathcal{R}[c, b]$",
            "$f$ is continuous at $c$",
            "$f \\in \\mathcal{R}[a, c]$ only"
          ],
          "answer": 1,
          "explanation": "And then $\\int_a^b = \\int_a^c + \\int_c^b$."
        },
        {
          "question": "By convention, $\\int_a^a f(x)\\,dx =$",
          "options": [
            "$0$",
            "$1$",
            "$f(a)$",
            "undefined"
          ],
          "answer": 0,
          "explanation": "A single point has length $0$."
        },
        {
          "question": "By convention, $\\int_b^a f =$",
          "options": [
            "$\\int_a^b f$",
            "$0$",
            "$-\\int_a^b f$",
            "$\\frac{1}{\\int_a^b f}$"
          ],
          "answer": 2,
          "explanation": "This keeps additivity true for any order of end points."
        },
        {
          "question": "If $f, g \\in \\mathcal{R}[a, b]$, then $\\int_a^b (f + g) =$",
          "options": [
            "$\\int_a^b f + \\int_a^b g$",
            "$\\max\\{\\int f, \\int g\\}$",
            "$\\int_a^b f \\cdot \\int_a^b g$",
            "it may not exist"
          ],
          "answer": 0,
          "explanation": "Linearity."
        },
        {
          "question": "For any partition, $U(f + g, \\pi)$",
          "options": [
            "$= U(f, \\pi) + U(g, \\pi)$ always",
            "$\\ge U(f, \\pi) + U(g, \\pi)$",
            "$= U(f, \\pi)U(g, \\pi)$",
            "$\\le U(f, \\pi) + U(g, \\pi)$"
          ],
          "answer": 3,
          "explanation": "$\\sup(f + g) \\le \\sup f + \\sup g$ on each piece."
        },
        {
          "question": "For $\\lambda < 0$, $U(\\lambda f, \\pi) =$",
          "options": [
            "$L(f, \\pi)$",
            "$|\\lambda|U(f, \\pi)$",
            "$\\lambda U(f, \\pi)$",
            "$\\lambda L(f, \\pi)$"
          ],
          "answer": 3,
          "explanation": "Multiplying by a negative number swaps sup and inf."
        },
        {
          "question": "If $f(x) \\le g(x)$ on $[a, b]$, then",
          "options": [
            "$\\int_a^b f \\le \\int_a^b g$",
            "nothing follows",
            "$\\int_a^b f = \\int_a^b g$",
            "$\\int_a^b f < \\int_a^b g$"
          ],
          "answer": 0,
          "explanation": "The order property."
        },
        {
          "question": "For integrable $f$,",
          "options": [
            "$|f|$ need not be integrable",
            "$\\left|\\int_a^b f\\right| = \\int_a^b |f|$",
            "$\\left|\\int_a^b f\\right| \\ge \\int_a^b |f|$",
            "$\\left|\\int_a^b f\\right| \\le \\int_a^b |f|$"
          ],
          "answer": 3,
          "explanation": "From $-|f| \\le f \\le |f|$."
        },
        {
          "question": "$f = 1$ on $\\mathbb{Q}$, $-1$ otherwise, on $[0, 1]$ shows that",
          "options": [
            "$f$ integrable implies $|f|$ integrable",
            "$f$ is continuous",
            "$|f|$ integrable does not imply $f$ integrable",
            "$\\int f = 0$"
          ],
          "answer": 2,
          "explanation": "$|f| = 1$ is integrable; $f$ has $U = 1$, $L = -1$."
        },
        {
          "question": "If $f \\in \\mathcal{R}[a, b]$ and $|f(x)| \\ge \\delta > 0$ on $[a, b]$, then",
          "options": [
            "$\\frac1f$ is unbounded",
            "$\\frac1f$ is integrable on $[a, b]$",
            "$\\int \\frac1f = \\frac{1}{\\int f}$",
            "$f$ is continuous"
          ],
          "answer": 1,
          "explanation": "$\\frac1f$ is bounded by $\\frac1\\delta$ and its oscillation is controlled."
        },
        {
          "question": "Which shows $\\int fg \\ne \\int f \\cdot \\int g$ in general?",
          "options": [
            "$\\int_0^1 x = \\frac12$",
            "$\\int_0^1 1 \\cdot 1 = 1$",
            "$\\int_0^1 x \\cdot x\\,dx = \\frac13$ but $\\frac12 \\cdot \\frac12 = \\frac14$",
            "$\\int_0^1 0 = 0$"
          ],
          "answer": 2,
          "explanation": "Products do not split."
        },
        {
          "question": "A tag for a partition $\\pi$ is",
          "options": [
            "a refinement of $\\pi$",
            "the endpoint $b$",
            "a choice of one point $\\xi_k$ in each subinterval $[x_{k-1}, x_k]$",
            "the gauge of $\\pi$"
          ],
          "answer": 2,
          "explanation": "Tags give the heights of the Riemann sum."
        },
        {
          "question": "The Riemann sum of $f$ for $(\\pi, \\xi)$ is",
          "options": [
            "$\\sum M_k\\Delta x_k$",
            "$\\sum f(\\xi_k)\\Delta x_k$",
            "$\\sum \\xi_k\\Delta x_k$",
            "$\\sum f(x_k)$"
          ],
          "answer": 1,
          "explanation": "Height at the tag times width."
        },
        {
          "question": "For any tag $\\xi$,",
          "options": [
            "$L(f, \\pi) \\le S(f, \\pi, \\xi) \\le U(f, \\pi)$",
            "$S(f, \\pi, \\xi) < L(f, \\pi)$",
            "$S$ need not be between $L$ and $U$",
            "$S(f, \\pi, \\xi) = U(f, \\pi)$"
          ],
          "answer": 0,
          "explanation": "Since $m_k \\le f(\\xi_k) \\le M_k$."
        },
        {
          "question": "For integrable $f$, $\\left|S(f, \\pi, \\xi) - \\int_a^b f\\right| \\le$",
          "options": [
            "$\\|\\pi\\|$",
            "$U(f, \\pi) - L(f, \\pi)$",
            "$L(f, \\pi)$",
            "$\\int_a^b |f|$"
          ],
          "answer": 1,
          "explanation": "Both numbers lie in $[L, U]$."
        },
        {
          "question": "The convergence theorem for Riemann sums says",
          "options": [
            "$S(f, \\pi, \\xi) \\to \\int_a^b f$ as $\\|\\pi\\| \\to 0$, for every choice of tags",
            "only for midpoint tags",
            "only for continuous $f$",
            "$S \\to 0$"
          ],
          "answer": 0,
          "explanation": "Uniform in the tags."
        },
        {
          "question": "$\\lim_{n \\to \\infty} \\frac1n\\sum_{k=1}^n \\left(\\frac kn\\right)^2 =$",
          "options": [
            "$1$",
            "$\\frac12$",
            "$\\frac13$",
            "$\\infty$"
          ],
          "answer": 2,
          "explanation": "A Riemann sum for $\\int_0^1 x^2\\,dx$."
        },
        {
          "question": "For integrable $f$, $\\lim_{n \\to \\infty} \\frac{b - a}{n}\\sum_{k=1}^n f\\!\\left(a + \\frac{k(b - a)}{n}\\right) =$",
          "options": [
            "$U(f, \\pi_n)$",
            "$\\int_a^b f(x)\\,dx$",
            "$f(b) - f(a)$",
            "$\\frac{f(a) + f(b)}{2}$"
          ],
          "answer": 1,
          "explanation": "Right-end tags on uniform partitions."
        },
        {
          "question": "FTC I (integral of a derivative) says: if $F' = f$ and $f$ is integrable, then",
          "options": [
            "$\\int_a^b f = F(b) - F(a)$",
            "$F = f$",
            "$\\int_a^b F = f(b) - f(a)$",
            "$\\int_a^b f = F(a) - F(b)$"
          ],
          "answer": 0,
          "explanation": "Proved with the MVT on each subinterval."
        },
        {
          "question": "FTC II says: if $G(x) = \\int_a^x g$ and $g$ is continuous at $c$, then",
          "options": [
            "$G'(c) = g(c)$",
            "$G'(c) = 0$",
            "$G$ is constant",
            "$G(c) = g'(c)$"
          ],
          "answer": 0,
          "explanation": "Differentiating an integral returns the integrand."
        },
        {
          "question": "If $G(x) = \\int_1^x \\frac{\\sin t}{t}\\,dt$, then $G'(\\pi) =$",
          "options": [
            "$\\frac1\\pi$",
            "$\\pi$",
            "$-1$",
            "$0$"
          ],
          "answer": 3,
          "explanation": "$G'(x) = \\frac{\\sin x}{x}$ and $\\sin\\pi = 0$."
        },
        {
          "question": "If $g$ is integrable with $|g| \\le M$, then $G(x) = \\int_a^x g$ satisfies",
          "options": [
            "$G$ is constant",
            "$|G(x) - G(y)| \\le M|x - y|$",
            "$G' = g$ everywhere",
            "$|G| \\le M$"
          ],
          "answer": 1,
          "explanation": "So $G$ is Lipschitz, hence continuous."
        },
        {
          "question": "The MVT for integrals: if $g$ is continuous on $[a, b]$, there is $c$ with",
          "options": [
            "$\\int_a^b g = (b - a)g(c)$",
            "$g'(c) = 0$",
            "$\\int_a^b g = 0$",
            "$\\int_a^b g = g(b) - g(a)$"
          ],
          "answer": 0,
          "explanation": "$g(c)$ is the average value of $g$."
        },
        {
          "question": "Integration by parts gives $\\int_0^1 xe^x\\,dx =$",
          "options": [
            "$e$",
            "$\\frac e2$",
            "$1$",
            "$e - 1$"
          ],
          "answer": 2,
          "explanation": "$[xe^x]_0^1 - \\int_0^1 e^x = e - (e - 1) = 1$."
        },
        {
          "question": "With the substitution $u = \\sin x$, $\\int_0^{\\pi/2} \\sin x\\cos x\\,dx =$",
          "options": [
            "$0$",
            "$\\frac12$",
            "$1$",
            "$\\frac\\pi4$"
          ],
          "answer": 1,
          "explanation": "$\\int_0^1 u\\,du = \\frac12$."
        }
      ]
    },
    {
      "id": "QS009",
      "title": "Exam focus",
      "questions": [
        {
          "question": "Besides stating and proving, what else should you prepare for in an exam?",
          "options": [
            "Only memorising the names of theorems",
            "Only computing numerical integrals",
            "Analysing a given function or result",
            "Nothing else"
          ],
          "answer": 2,
          "explanation": "Exams cover the major things: state, prove and analyse."
        },
        {
          "question": "A theorem in this course has a name. In an exam you could be asked to",
          "options": [
            "state it or prove it",
            "state it, but never prove it",
            "prove it, but never state it",
            "give its name only"
          ],
          "answer": 0,
          "explanation": "Any named theorem or lemma can be asked. Learn the statement and the proof."
        },
        {
          "question": "When your proof uses a named theorem, what should you write?",
          "options": [
            "The name alone is enough",
            "Neither: just use the result",
            "The page where it appears",
            "Its name, then the theorem written out"
          ],
          "answer": 3,
          "explanation": "The name alone is not enough. Give the name, then write the theorem."
        },
        {
          "question": "A good written proof is",
          "options": [
            "mostly English, with few symbols",
            "mathematically consistent, with enough words to establish it",
            "only symbols, with no words at all",
            "as long as possible, to show effort"
          ],
          "answer": 1,
          "explanation": "Use less English, but enough to establish the result."
        },
        {
          "question": "State Rolle’s theorem: $f$ continuous on $[a, b]$, differentiable on $(a, b)$, and",
          "options": [
            "$f(a) = f(b)$ ⇒ $f'(c) = 0$ for every $c \\in (a, b)$",
            "$f(a) = f(b)$ ⇒ $f'(c) = 0$ for some $c \\in (a, b)$",
            "$f(a) = 0$ ⇒ $f(c) = 0$ for some $c \\in (a, b)$",
            "$f(a) \\ne f(b)$ ⇒ $f'(c) = 0$ for some $c \\in (a, b)$"
          ],
          "answer": 1,
          "explanation": "Equal end values give at least one interior point with a horizontal tangent."
        },
        {
          "question": "State Fermat’s theorem: if $f$ has a local extremum at an interior point $x_0$ and",
          "options": [
            "$f$ is continuous at $x_0$, then $f'(x_0) = 0$",
            "$f'(x_0) = 0$, then $f$ is constant",
            "$f$ is differentiable at $x_0$, then $f''(x_0) = 0$",
            "$f$ is differentiable at $x_0$, then $f'(x_0) = 0$"
          ],
          "answer": 3,
          "explanation": "Differentiability at $x_0$ is needed: $|x|$ has a minimum at 0 but no derivative there."
        },
        {
          "question": "State the mean value theorem: $f$ continuous on $[a, b]$ and differentiable on $(a, b)$ ⇒ for some $c \\in (a, b)$,",
          "options": [
            "$f'(c) = \\frac{f(b) - f(a)}{b - a}$",
            "$f(c) = \\frac{f(b) - f(a)}{b - a}$",
            "$f'(c) = f(b) - f(a)$",
            "$f'(c) = \\frac{f(b) + f(a)}{2}$"
          ],
          "answer": 0,
          "explanation": "Some tangent is parallel to the chord joining the end points."
        },
        {
          "question": "State Cauchy’s mean value theorem, with $g'$ non-zero on $(a, b)$: for some $c \\in (a, b)$,",
          "options": [
            "$\\frac{f(c)}{g(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}$",
            "$f'(c)g'(c) = \\frac{f(b) - f(a)}{g(b) - g(a)}$",
            "$\\frac{f'(c)}{g'(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}$",
            "$\\frac{f'(c)}{g'(c)} = \\frac{f(b)}{g(b)}$"
          ],
          "answer": 2,
          "explanation": "The same point $c$ serves both functions. Taking $g(x) = x$ gives the ordinary MVT."
        },
        {
          "question": "State the Heine–Cantor theorem: a continuous function on a closed, bounded interval is",
          "options": [
            "differentiable there",
            "monotone there",
            "Lipschitz continuous there",
            "uniformly continuous there"
          ],
          "answer": 3,
          "explanation": "$\\sqrt x$ on $[0, 1]$ is uniformly continuous but not Lipschitz, so the theorem can’t promise more."
        },
        {
          "question": "State Darboux’s theorem: if $f$ is differentiable on $[a, b]$ and $r$ lies strictly between $f'(a)$ and $f'(b)$, then",
          "options": [
            "$f'(c) = r$ for some $c \\in (a, b)$",
            "$f(c) = r$ for some $c \\in (a, b)$",
            "$f'$ is continuous on $[a, b]$",
            "$f'(c) = r$ for every $c \\in (a, b)$"
          ],
          "answer": 0,
          "explanation": "Derivatives have the intermediate value property, even when they are not continuous."
        },
        {
          "question": "What separates Darboux’s criterion (Odadare’s criterion) from Riemann’s ε-criterion?",
          "options": [
            "It needs $U - L < \\varepsilon$ for one partition only, not every one",
            "It applies only to continuous functions",
            "It needs $U - L < \\varepsilon$ for every fine enough partition, not just one",
            "It needs $f$ to be unbounded"
          ],
          "answer": 2,
          "explanation": "Riemann’s criterion asks for some partition. Darboux’s (Odadare’s) asks for every partition with $\\|\\pi\\| < \\delta$."
        },
        {
          "question": "Which of these is not one of the four ways to confirm that $f$ is Riemann integrable?",
          "options": [
            "Using the definition",
            "Showing that $f$ is differentiable at one point",
            "Using the ε-criterion",
            "Using the limit criterion"
          ],
          "answer": 1,
          "explanation": "The four ways are the definition, the ε-criterion, the limit criterion and Darboux’s (Odadare’s) criterion. Which you use depends on the question."
        },
        {
          "question": "A question gives the partition $\\pi_n = \\{\\frac in\\}$ of $[0, 1]$. Which test should you reach for?",
          "options": [
            "The limit criterion",
            "Fermat’s theorem",
            "Rolle’s theorem",
            "The sandwich rule for sequences alone"
          ],
          "answer": 0,
          "explanation": "When $n$ is present, use the limit criterion: show $U(f, \\pi_n) - L(f, \\pi_n) \\to 0$."
        },
        {
          "question": "For the uniform partition of $[0, 2]$ into $n$ pieces, $\\|\\pi_n\\| =$",
          "options": [
            "$\\frac1n$",
            "$2n$",
            "$\\frac{n}{2}$",
            "$\\frac2n$"
          ],
          "answer": 3,
          "explanation": "$\\|\\pi_n\\| = \\frac{b - a}{n}$, so $\\|\\pi_n\\| \\to 0$ exactly when $n \\to \\infty$."
        },
        {
          "question": "Which is the valid way to choose δ in an ε-δ proof?",
          "options": [
            "$\\delta = \\frac{\\varepsilon}{|x + 2|}$, using a varying bound",
            "$\\delta = \\min(1, \\frac{\\varepsilon}{4})$, using a constant bound",
            "$\\delta = \\varepsilon x$, using a varying bound",
            "$\\delta = x - 1$, using a varying bound"
          ],
          "answer": 1,
          "explanation": "Never use a variable as your bound. For $\\lim_{x \\to 1}$ with $|x - 1| < 1$, $|x + 2| < 4$ gives a constant to divide by."
        },
        {
          "question": "In the statement $a \\Leftrightarrow b$, $b$ is",
          "options": [
            "sufficient for $a$, but not necessary",
            "necessary for $a$, but not sufficient",
            "both sufficient and necessary for $a$",
            "neither sufficient nor necessary for $a$"
          ],
          "answer": 2,
          "explanation": "$b \\Rightarrow a$ makes $b$ sufficient, and $a \\Rightarrow b$ makes $b$ necessary."
        },
        {
          "question": "Which statement about Riemann integrability on $[a, b]$ is true?",
          "options": [
            "Bounded ⇒ integrable ⇒ continuous",
            "Integrable ⇒ continuous ⇒ bounded",
            "Continuous ⇒ integrable ⇒ bounded",
            "Bounded ⇒ continuous ⇒ integrable"
          ],
          "answer": 2,
          "explanation": "Neither converse holds. A step function is integrable but not continuous, and the Dirichlet function is bounded but not integrable."
        },
        {
          "question": "Which function shows that continuity is not necessary for integrability?",
          "options": [
            "$f(x) = x^2$ on $[0, 1]$",
            "A step function on $[0, 1]$",
            "The Dirichlet function on $[0, 1]$",
            "$f(x) = \\frac1x$ on $(0, 1]$"
          ],
          "answer": 1,
          "explanation": "A step function has finitely many discontinuities and is integrable. The Dirichlet function is not integrable."
        },
        {
          "question": "$\\pi$ is a partition of $[a, b]$. Which of these is a refinement of $\\pi$?",
          "options": [
            "Only $\\pi$ with many extra points",
            "Only partitions with fewer points",
            "Only uniform partitions",
            "$\\pi$ itself, or $\\pi$ with one extra point"
          ],
          "answer": 3,
          "explanation": "A refinement contains every point of $\\pi$. One extra point is enough, and $\\pi$ refines itself."
        },
        {
          "question": "A Riemann sum $S(f, \\pi, \\xi)$ differs from $U(f, \\pi)$ and $L(f, \\pi)$ because it",
          "options": [
            "uses tags, with no sup or inf",
            "needs $f$ to be continuous",
            "works only on uniform partitions",
            "uses the sup on every subinterval"
          ],
          "answer": 0,
          "explanation": "With no sup or inf, it can be written for any function. An integrable function still turns out to be bounded."
        },
        {
          "question": "For $f(x) = |x|$ at $0$, the null sequences $h_n = \\frac1n$ and $h_n = -\\frac1n$ give difference quotients tending to",
          "options": [
            "$0$ and $0$, so $f'(0) = 0$",
            "$1$ and $-1$, so $f'(0)$ does not exist",
            "$1$ and $1$, so $f'(0) = 1$",
            "$\\infty$ and $\\infty$, so $f'(0)$ does not exist"
          ],
          "answer": 1,
          "explanation": "Two null sequences with different limits show that the limit of the difference quotient does not exist."
        },
        {
          "question": "Let $f(x) = x^2\\sin\\frac1x$ for $x \\ne 0$, with $f(0) = 0$. Which is true?",
          "options": [
            "$f'(0) = 0$, but $f'$ is not continuous at $0$",
            "$f'(0)$ does not exist",
            "$f'(0) = 0$, and $f'$ is continuous at $0$",
            "$f$ is not continuous at $0$"
          ],
          "answer": 0,
          "explanation": "$\\left|\\frac{f(h)}{h}\\right| \\le |h| \\to 0$, so $f'(0) = 0$. But $f'(x) = 2x\\sin\\frac1x - \\cos\\frac1x$ has no limit at 0."
        },
        {
          "question": "Which function on $[0, 1]$ satisfies the MVT but not Rolle’s theorem?",
          "options": [
            "$f(x) = x(1 - x)$",
            "$f(x) = 5$",
            "$f(x) = x$",
            "$f(x) = \\sin(\\pi x)$"
          ],
          "answer": 2,
          "explanation": "$f(0) \\ne f(1)$ rules out Rolle, while the MVT still gives $f'(c) = 1$. Rolle’s conditions always imply the MVT’s, but the converse fails."
        },
        {
          "question": "On which domain is $f(x) = \\frac1x$ uniformly continuous?",
          "options": [
            "$(0, 1]$",
            "$(0, 2)$",
            "$(0, \\infty)$",
            "$[1, 2]$"
          ],
          "answer": 3,
          "explanation": "Uniform continuity depends on the domain. Near 0 the function gets too steep, while $[1, 2]$ is closed and bounded."
        },
        {
          "question": "Using the ε definition, $f'(c) = L$ means: for every $\\varepsilon > 0$ there is $\\delta > 0$ such that $0 < |x - c| < \\delta$ implies",
          "options": [
            "$\\left|\\frac{f(x) - f(c)}{x - c} - L\\right| < \\varepsilon$",
            "$|f(x) - f(c)| < \\varepsilon$",
            "$\\left|\\frac{f(x) - f(c)}{x - c}\\right| < \\varepsilon$",
            "$|f(x) - L| < \\varepsilon$"
          ],
          "answer": 0,
          "explanation": "The quantity kept within ε is the gap between the difference quotient and $L$. Be ready to compute a derivative from this definition too."
        }
      ]
    }
  ]
};
