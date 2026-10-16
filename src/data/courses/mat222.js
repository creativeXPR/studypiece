// MAT 222 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MAT 222",
  "title": "Limits and continuity",
  "sets": [
    {
      "id": "QS001",
      "title": "Limits and continuity",
      "questions": [
        {
          "question": "In the ε-δ definition of $\\lim_{x\\to x_0}F(x) = l$, which statement is correct?",
          "options": [
            "For every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $0 < |x - x_0| < \\delta \\implies |F(x) - l| < \\varepsilon$",
            "There exists $\\delta > 0$ such that for every $\\varepsilon > 0$, $0 < |x - x_0| < \\delta \\implies |F(x) - l| < \\varepsilon$",
            "For every $\\delta > 0$ there exists $\\varepsilon > 0$ such that $|F(x) - l| < \\varepsilon \\implies |x - x_0| < \\delta$",
            "$F(x_0) = l$"
          ],
          "answer": 0,
          "explanation": "ε is chosen first and δ is found in response, so δ may depend on ε. Swapping the quantifiers would force one δ to work for every ε, and the limit never depends on the value $F(x_0)$."
        },
        {
          "question": "Why does the definition of $\\lim_{x\\to x_0}F(x)$ require $0 < |x - x_0|$?",
          "options": [
            "So that the value of $F$ at $x_0$ plays no part in the limit",
            "So that δ is always less than 1",
            "Because $|x - x_0|$ can be negative",
            "So that $F$ is continuous at $x_0$"
          ],
          "answer": 0,
          "explanation": "Excluding $x = x_0$ means only the behaviour of $F$ near $x_0$ counts. $F$ need not even be defined at $x_0$, as with $\\frac{\\sin x}{x}$ at $0$."
        },
        {
          "question": "In proving that a limit is unique, assume $F(x) \\to l_1$ and $F(x) \\to l_2$ with $l_1 \\neq l_2$. Which ε gives the contradiction $|l_1 - l_2| < |l_1 - l_2|$?",
          "options": [
            "$\\varepsilon = \\frac{1}{2}|l_1 - l_2|$",
            "$\\varepsilon = |l_1 - l_2|$",
            "$\\varepsilon = 1$",
            "$\\varepsilon = 2|l_1 - l_2|$"
          ],
          "answer": 0,
          "explanation": "By the triangle inequality, $|l_1 - l_2| \\le |F(x) - l_1| + |F(x) - l_2| < 2\\varepsilon$. With $\\varepsilon = \\frac12|l_1 - l_2|$ this reads $|l_1 - l_2| < |l_1 - l_2|$, which is impossible."
        },
        {
          "question": "Evaluate $\\lim_{x\\to 2}\\dfrac{x^3 + 1}{x - 3}$.",
          "options": [
            "$-9$",
            "$9$",
            "$\\frac{7}{5}$",
            "The limit does not exist"
          ],
          "answer": 0,
          "explanation": "The denominator is non-zero at $x = 2$, so substitute: $\\frac{8 + 1}{2 - 3} = \\frac{9}{-1} = -9$."
        },
        {
          "question": "In the ε-δ proof that $\\lim_{x\\to 2}\\frac{x^3 + 1}{x - 3} = -9$, one obtains $|F(x) + 9| < 50|x - 2|$ whenever $|x - 2| < \\frac12$. Which δ completes the proof?",
          "options": [
            "$\\delta = \\min\\left(\\frac12, \\frac{\\varepsilon}{50}\\right)$",
            "$\\delta = \\frac{\\varepsilon}{50}$",
            "$\\delta = \\max\\left(\\frac12, \\frac{\\varepsilon}{50}\\right)$",
            "$\\delta = 50\\varepsilon$"
          ],
          "answer": 0,
          "explanation": "δ must satisfy both requirements: $\\delta \\le \\frac12$ so that the bound $50|x - 2|$ is valid, and $\\delta \\le \\frac{\\varepsilon}{50}$ so that $50|x - 2| < \\varepsilon$. The minimum does both."
        },
        {
          "question": "Which of the following is NOT one of the three conditions for $F$ to be continuous at $x_0$?",
          "options": [
            "$F$ is differentiable at $x_0$",
            "$F(x_0)$ is defined",
            "$\\lim_{x\\to x_0}F(x)$ exists",
            "$\\lim_{x\\to x_0}F(x) = F(x_0)$"
          ],
          "answer": 0,
          "explanation": "Continuity needs: $F(x_0)$ defined, the limit exists, and the limit equals $F(x_0)$. Differentiability is a stronger property; $|x|$ is continuous but not differentiable at $0$."
        },
        {
          "question": "What is the key difference between continuity at every point of $I$ and uniform continuity on $I$?",
          "options": [
            "In uniform continuity, δ depends only on ε and works at every point of the interval at once",
            "In uniform continuity, ε depends on δ",
            "Uniform continuity only applies to polynomials",
            "In uniform continuity, δ may depend on the point $x_0$"
          ],
          "answer": 0,
          "explanation": "For continuity at $x_0$, δ may depend on ε and $x_0$. For uniform continuity, a single δ (depending on ε alone) must work for every pair $x, y \\in I$ with $|x - y| < \\delta$."
        },
        {
          "question": "Which function is continuous on $(0, 1]$ but NOT uniformly continuous there?",
          "options": [
            "$f(x) = \\frac{1}{x}$",
            "$f(x) = 3x$",
            "$f(x) = x^2$",
            "$f(x) = \\sin x$"
          ],
          "answer": 0,
          "explanation": "For $\\frac1x$, the largest δ that works at $x_0$ is $\\frac{\\varepsilon x_0^2}{1 + \\varepsilon x_0}$, which tends to 0 as $x_0 \\to 0$, so no single δ serves the whole interval. The other three are Lipschitz on $(0, 1]$, hence uniformly continuous."
        },
        {
          "question": "If $|f(x) - f(y)| \\le k|x - y|$ for all $x, y \\in I$, with $k > 0$, which δ shows that $f$ is uniformly continuous on $I$?",
          "options": [
            "$\\delta = \\frac{\\varepsilon}{k}$",
            "$\\delta = k\\varepsilon$",
            "$\\delta = \\varepsilon + k$",
            "$\\delta = \\varepsilon^2$"
          ],
          "answer": 0,
          "explanation": "If $|x - y| < \\frac{\\varepsilon}{k}$ then $|f(x) - f(y)| \\le k|x - y| < \\varepsilon$. Since δ does not depend on $x$ or $y$, the continuity is uniform."
        },
        {
          "question": "Let $f(x) = \\frac{\\sin 2x}{x}$ for $x \\neq 0$ and $f(0) = 1$. What kind of discontinuity does $f$ have at $x = 0$?",
          "options": [
            "Removable, since $\\lim_{x\\to0}f(x) = 2 \\neq f(0)$",
            "Jump, since the left and right limits differ",
            "Essential, since the limit does not exist",
            "None; $f$ is continuous at $0$"
          ],
          "answer": 0,
          "explanation": "$\\lim_{x\\to0}\\frac{\\sin 2x}{x} = 2\\lim_{u\\to0}\\frac{\\sin u}{u} = 2$. The limit exists but differs from $f(0) = 1$, so the discontinuity is removable: setting $f(0) = 2$ makes $f$ continuous."
        }
      ]
    }
  ]
}
