// MTH 209 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MTH 209",
  "title": "Numerical Methods",
  "sets": [
    {
      "id": "QS001",
      "title": "Solving equations: bisection to secant",
      "questions": [
        {
          "question": "The bisection method is based on which theorem?",
          "options": [
            "Taylor's theorem",
            "The intermediate (mid) value theorem",
            "The mean value theorem for integrals",
            "Rolle's theorem"
          ],
          "answer": 1,
          "explanation": "If $f$ is continuous on $[a, b]$ and $f(a)f(b) < 0$, the intermediate (mid) value theorem guarantees at least one root between $a$ and $b$. Bisection keeps halving that bracket."
        },
        {
          "question": "For $f(x) = 5x^2 + 11x - 17$, $f(1) = -1$ and $f(2) = 25$. What can you conclude?",
          "options": [
            "$x = 1$ is a root",
            "There are exactly two roots in $[1, 2]$",
            "There is no root in $[1, 2]$",
            "There is a root between $x = 1$ and $x = 2$"
          ],
          "answer": 3,
          "explanation": "$f$ is continuous and changes sign from negative to positive between 1 and 2, so at least one root lies in $(1, 2)$. (In fact the root is about $1.047$.)"
        },
        {
          "question": "Bisecting $[1, 2]$ for $f(x) = 5x^2 + 11x - 17$ gives $c = 1.5$ with $f(1.5) = 10.75$. What is the next interval?",
          "options": [
            "$[1.25, 1.75]$",
            "$[0, 1.5]$",
            "$[1, 1.5]$",
            "$[1.5, 2]$"
          ],
          "answer": 2,
          "explanation": "$f(1) < 0$ and $f(1.5) > 0$, so the sign change (and the root) is in $[1, 1.5]$. Keep the half where the signs still differ."
        },
        {
          "question": "Starting with an interval of length 1, how long is the bracketing interval after 3 bisections?",
          "options": [
            "$0.5$",
            "$0.125$",
            "$0.0625$",
            "$0.25$"
          ],
          "answer": 1,
          "explanation": "Each bisection halves the interval: $1 \\to 0.5 \\to 0.25 \\to 0.125 = 2^{-3}$."
        },
        {
          "question": "Starting from an interval of length 1, what is the least number of bisections needed to make the interval shorter than $0.001$?",
          "options": [
            "$10$",
            "$1000$",
            "$8$",
            "$9$"
          ],
          "answer": 0,
          "explanation": "We need $2^{-n} < 0.001$, i.e. $2^n > 1000$. Since $2^9 = 512$ and $2^{10} = 1024$, $n = 10$."
        },
        {
          "question": "In the Regula Falsi (false position) method, the new estimate $c$ from the bracket $[a, b]$ is",
          "options": [
            "$c = \\dfrac{a f(a) - b f(b)}{f(a) - f(b)}$",
            "$c = a - \\dfrac{f(a)}{f'(a)}$",
            "$c = \\dfrac{a f(b) - b f(a)}{f(b) - f(a)}$",
            "$c = \\dfrac{a + b}{2}$"
          ],
          "answer": 2,
          "explanation": "$c$ is where the secant line through $(a, f(a))$ and $(b, f(b))$ crosses the $x$-axis: $c = \\frac{a f(b) - b f(a)}{f(b) - f(a)}$. The midpoint is bisection; $a - f(a)/f'(a)$ is Newton-Raphson."
        },
        {
          "question": "Use Regula Falsi on $f(x) = x^3 - 5x + 1$ with $a = 0$, $b = 1$. What is the first estimate $c$?",
          "options": [
            "$0.25$",
            "$0.75$",
            "$0.5$",
            "$0.2$"
          ],
          "answer": 0,
          "explanation": "$f(0) = 1$, $f(1) = -3$. So $c = \\frac{0(-3) - 1(1)}{-3 - 1} = \\frac{-1}{-4} = 0.25$."
        },
        {
          "question": "Continuing Regula Falsi on $x^3 - 5x + 1 = 0$: $f(0.25) = -0.2344$, so the bracket becomes $[0, 0.25]$. What is the next estimate (4 d.p.)?",
          "options": [
            "$0.2016$",
            "$0.2344$",
            "$0.1250$",
            "$0.2025$"
          ],
          "answer": 3,
          "explanation": "$c = \\frac{0 \\cdot f(0.25) - 0.25 \\cdot f(0)}{f(0.25) - f(0)} = \\frac{-0.25}{-0.2344 - 1} = \\frac{-0.25}{-1.2344} = 0.2025$. The root is $0.2016$ (4 d.p.)."
        },
        {
          "question": "Regula Falsi is described as combining",
          "options": [
            "the guaranteed convergence of bisection with the speed of linear interpolation",
            "the speed of Newton-Raphson with the simplicity of the secant method",
            "two Newton-Raphson steps per iteration",
            "Taylor series with bisection"
          ],
          "answer": 0,
          "explanation": "Like bisection it always keeps a bracket $[a, b]$ with a sign change (so it cannot lose the root), but it picks the point by linear interpolation instead of the midpoint, which is usually faster."
        },
        {
          "question": "To solve $f(x) = 0$ by linear (fixed-point) iteration, we first",
          "options": [
            "rearrange the equation as $x = g(x)$ and iterate $x_{n+1} = g(x_n)$",
            "draw the secant through two points",
            "differentiate $f$",
            "halve an interval containing the root"
          ],
          "answer": 0,
          "explanation": "Linear iteration rewrites $f(x) = 0$ as $x = g(x)$, picks $x_0$, and repeats $x_{n+1} = g(x_n)$ until successive values agree."
        },
        {
          "question": "For $x^2 - 3x + 1 = 0$, use $x_{n+1} = \\frac{1}{3}(1 + x_n^2)$ with $x_0 = 0$. What are $x_1$ and $x_2$ (4 d.p.)?",
          "options": [
            "$x_1 = 0.3333,\\ x_2 = 0.3333$",
            "$x_1 = 0.3704,\\ x_2 = 0.3791$",
            "$x_1 = 0.3333,\\ x_2 = 0.3704$",
            "$x_1 = 1,\\ x_2 = 0.6667$"
          ],
          "answer": 2,
          "explanation": "$x_1 = \\frac13(1 + 0) = 0.3333$; $x_2 = \\frac13(1 + 0.3333^2) = \\frac13(1.1111) = 0.3704$. The iterates go on to $0.382$."
        },
        {
          "question": "The iteration $x_{n+1} = g(x_n)$ converges to a root $\\alpha$ (for $x_0$ close enough) if",
          "options": [
            "$g(\\alpha) = 0$",
            "$|g'(x)| > 1$ near $\\alpha$",
            "$|g'(x)| < 1$ near $\\alpha$",
            "$g'(\\alpha) = 1$"
          ],
          "answer": 2,
          "explanation": "Near the root, errors are multiplied by roughly $g'(\\alpha)$ each step, so they shrink when $|g'(x)| < 1$ in a neighbourhood of $\\alpha$."
        },
        {
          "question": "Which rearrangement of $x^2 - 3x + 1 = 0$ converges to the root $0.382$ from $x_0 = 0$?",
          "options": [
            "$x = \\frac{1}{3}(1 + x^2)$",
            "$x = \\sqrt{3x - 1}$",
            "$x = x^2 - 2x + 1$",
            "$x = 3 - \\frac{1}{x}$"
          ],
          "answer": 0,
          "explanation": "For $g(x) = \\frac13(1 + x^2)$, $g'(x) = \\frac{2x}{3} \\approx 0.25$ at $0.382$, so $|g'| < 1$. For $3 - \\frac1x$, $|g'| = \\frac{1}{x^2} \\approx 6.9$; for $x^2 - 2x + 1$, $|g'| = |2x - 2| \\approx 1.24$; and $\\sqrt{3x - 1}$ isn't even defined at $x_0 = 0$."
        },
        {
          "question": "The Newton-Raphson iteration for $f(x) = 0$ is",
          "options": [
            "$x_{n+1} = x_n + \\dfrac{f(x_n)}{f'(x_n)}$",
            "$x_{n+1} = \\dfrac{x_n + x_{n-1}}{2}$",
            "$x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$",
            "$x_{n+1} = x_n - \\dfrac{f'(x_n)}{f(x_n)}$"
          ],
          "answer": 2,
          "explanation": "The tangent at $(x_n, f(x_n))$ has slope $f'(x_n)$ and crosses the $x$-axis at $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$."
        },
        {
          "question": "Geometrically, one Newton-Raphson step from $x_n$ moves to the point where",
          "options": [
            "the chord through $(a, f(a))$ and $(b, f(b))$ meets the $x$-axis",
            "the tangent to $y = f(x)$ at $x_n$ meets the $x$-axis",
            "the midpoint of the interval lies",
            "the curve has a turning point"
          ],
          "answer": 1,
          "explanation": "Newton-Raphson replaces the curve by its tangent line at $x_n$ and takes the tangent's $x$-intercept as the next approximation."
        },
        {
          "question": "Apply Newton-Raphson to $f(x) = x^3 - 5x - 40$ with $x_0 = 4$. What is $x_1$ (3 d.p.)?",
          "options": [
            "$3.875$",
            "$3.907$",
            "$4.093$",
            "$3.904$"
          ],
          "answer": 1,
          "explanation": "$f(4) = 64 - 20 - 40 = 4$ and $f'(x) = 3x^2 - 5$, so $f'(4) = 43$. Then $x_1 = 4 - \\frac{4}{43} = 3.907$. ($3.875$ is the secant/Regula Falsi first step.)"
        },
        {
          "question": "Use Newton-Raphson on $x^2 - 10 = 0$ with $x_0 = 3$. What is $x_1$ (4 d.p.)?",
          "options": [
            "$3.3333$",
            "$3.1667$",
            "$3.1623$",
            "$3.1250$"
          ],
          "answer": 1,
          "explanation": "$x_1 = 3 - \\frac{9 - 10}{2(3)} = 3 + \\frac16 = 3.1667$. One more step gives $3.1623 \\approx \\sqrt{10}$."
        },
        {
          "question": "Newton-Raphson for $\\sqrt[3]{7}$ uses $f(x) = x^3 - 7$. Which iteration does this give?",
          "options": [
            "$x_{n+1} = x_n - \\dfrac{3x_n^2}{x_n^3 - 7}$",
            "$x_{n+1} = \\dfrac{7}{x_n^2}$",
            "$x_{n+1} = \\dfrac{2x_n^3 + 7}{3x_n^2}$",
            "$x_{n+1} = \\dfrac{x_n^3 + 7}{3x_n^2}$"
          ],
          "answer": 2,
          "explanation": "$x_{n+1} = x_n - \\frac{x_n^3 - 7}{3x_n^2} = \\frac{3x_n^3 - x_n^3 + 7}{3x_n^2} = \\frac{2x_n^3 + 7}{3x_n^2}$. From $x_0 = 2$ it gives $1.9167, 1.9129, \\dots$"
        },
        {
          "question": "Newton-Raphson runs into trouble when",
          "options": [
            "$f(x_n)$ is very small",
            "$f'(x_n) = 0$ or is very close to 0",
            "$x_n$ is negative",
            "the root is irrational"
          ],
          "answer": 1,
          "explanation": "Dividing by $f'(x_n) \\approx 0$ sends $x_{n+1}$ very far away: the tangent is (almost) horizontal and meets the $x$-axis far from the root, or not at all."
        },
        {
          "question": "The secant method's iteration is",
          "options": [
            "$x_{n+1} = \\dfrac{x_n + x_{n-1}}{2}$",
            "$x_{n+1} = x_n - f(x_n)\\dfrac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$",
            "$x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$",
            "$x_{n+1} = x_n - f(x_n)\\dfrac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$"
          ],
          "answer": 1,
          "explanation": "Newton-Raphson with $f'(x_n)$ replaced by the slope $\\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$ gives $x_{n+1} = x_n - f(x_n)\\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$."
        },
        {
          "question": "The secant method is obtained from Newton-Raphson by",
          "options": [
            "using the second derivative",
            "halving the step each time",
            "always keeping a sign change",
            "replacing $f'(x_n)$ with a backward difference approximation using $x_n$ and $x_{n-1}$"
          ],
          "answer": 3,
          "explanation": "$f'(x_n) \\approx \\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}}$, the slope through the last two points. No derivative is needed."
        },
        {
          "question": "Use the secant method on $x^3 - 5x - 40 = 0$ with $x_0 = 3$, $x_1 = 4$. What is $x_2$?",
          "options": [
            "$3.5$",
            "$3.904$",
            "$3.875$",
            "$3.907$"
          ],
          "answer": 2,
          "explanation": "$f(3) = -28$, $f(4) = 4$. $x_2 = 4 - 4\\cdot\\frac{4 - 3}{4 - (-28)} = 4 - \\frac{4}{32} = 3.875$."
        },
        {
          "question": "What is the main difference between the secant method and Regula Falsi?",
          "options": [
            "The secant method uses the midpoint",
            "Regula Falsi needs $f'(x)$",
            "The secant method always uses the two latest points; Regula Falsi keeps two points whose function values have opposite signs",
            "There is no difference"
          ],
          "answer": 2,
          "explanation": "Both use the same chord formula. Regula Falsi keeps a bracket (guaranteed, sometimes slow); the secant method drops the oldest point (faster, but it can lose the root)."
        },
        {
          "question": "Close to a simple root, which method usually converges fastest?",
          "options": [
            "Linear iteration with $|g'| \\approx 0.9$",
            "Newton-Raphson",
            "Regula Falsi",
            "Bisection"
          ],
          "answer": 1,
          "explanation": "Newton-Raphson converges quadratically (the number of correct digits roughly doubles each step). Secant is a little slower (order about 1.6); bisection and linear iteration are linear."
        },
        {
          "question": "For $f(x) = x^3 - 5x - 40$, $f(3) = -28$ and $f(4) = 4$. Why is $x_0 = 4$ a sensible Newton-Raphson starting value?",
          "options": [
            "Because $4$ is an integer",
            "Because $f(4) > 0$ is required",
            "Because $f'(4) = 0$",
            "Because $|f(4)|$ is much smaller than $|f(3)|$, so the root is probably nearer 4"
          ],
          "answer": 3,
          "explanation": "$|f(4)| = 4$ is much smaller than $|f(3)| = 28$, so the curve is closer to zero at 4. Indeed the root is $3.904$."
        }
      ]
    },
    {
      "id": "QS002",
      "title": "Interpolation",
      "questions": [
        {
          "question": "Interpolation is the process of",
          "options": [
            "rounding numbers to fewer digits",
            "differentiating tabulated data",
            "finding a formula (often a polynomial) whose graph passes through a given set of points",
            "finding the roots of a polynomial"
          ],
          "answer": 2,
          "explanation": "Given points $(x_0, y_0), \\dots, (x_n, y_n)$, interpolation finds a function (usually a polynomial) with $P(x_i) = y_i$, then uses it to estimate values in between."
        },
        {
          "question": "The linear interpolating polynomial through $(x_0, y_0)$ and $(x_1, y_1)$ is",
          "options": [
            "$P_1(x) = \\dfrac{x - x_1}{x_1 - x_0}y_0 + \\dfrac{x - x_0}{x_1 - x_0}y_1$",
            "$P_1(x) = \\dfrac{y_0 + y_1}{2}$",
            "$P_1(x) = \\dfrac{x_1 - x}{x_1 - x_0}y_0 + \\dfrac{x - x_0}{x_1 - x_0}y_1$",
            "$P_1(x) = y_0 + \\dfrac{x_1 - x_0}{y_1 - y_0}(x - x_0)$"
          ],
          "answer": 2,
          "explanation": "$P_1(x) = \\frac{x_1 - x}{x_1 - x_0}y_0 + \\frac{x - x_0}{x_1 - x_0}y_1$. Check: at $x = x_0$ it gives $y_0$; at $x = x_1$ it gives $y_1$."
        },
        {
          "question": "Find $P_1(3.5)$ for the data points $(2, 3)$ and $(5, 7)$.",
          "options": [
            "$5$",
            "$5.5$",
            "$4.5$",
            "$6$"
          ],
          "answer": 0,
          "explanation": "$P_1(3.5) = \\frac{5 - 3.5}{3}(3) + \\frac{3.5 - 2}{3}(7) = 0.5(3) + 0.5(7) = 5$. ($3.5$ is the midpoint, so we get the average of 3 and 7.)"
        },
        {
          "question": "Simplify the linear interpolant through $(2, 3)$ and $(5, 7)$.",
          "options": [
            "$P_1(x) = \\dfrac{3x + 4}{4}$",
            "$P_1(x) = \\dfrac{4x + 1}{3}$",
            "$P_1(x) = 4x - 5$",
            "$P_1(x) = \\dfrac{4x - 1}{3}$"
          ],
          "answer": 1,
          "explanation": "Slope $= \\frac{7 - 3}{5 - 2} = \\frac43$, so $P_1(x) = 3 + \\frac43(x - 2) = \\frac{9 + 4x - 8}{3} = \\frac{4x + 1}{3}$. Check: $P_1(5) = 21/3 = 7$."
        },
        {
          "question": "Given $(0.82, 2.270500)$ and $(0.83, 2.293319)$, find $P_1(0.826)$ (4 d.p.).",
          "options": [
            "$2.2819$",
            "$2.2842$",
            "$2.2933$",
            "$2.2871$"
          ],
          "answer": 1,
          "explanation": "$P_1(0.826) = \\frac{0.004}{0.01}(2.270500) + \\frac{0.006}{0.01}(2.293319) = 0.4(2.270500) + 0.6(2.293319) = 0.90820 + 1.37599 = 2.2842$."
        },
        {
          "question": "Using linear interpolation between $(1, 0)$ and $(6, 1.7918)$ for $y = \\ln x$, the estimate of $\\ln 2$ is",
          "options": [
            "$0.4479$",
            "$0.2986$",
            "$0.3584$",
            "$0.6931$"
          ],
          "answer": 2,
          "explanation": "$P_1(2) = \\frac{6 - 2}{5}(0) + \\frac{2 - 1}{5}(1.7918) = 0.3584$."
        },
        {
          "question": "The true value of $\\ln 2$ is $0.6931$. What is the relative error of the estimate $0.3584$ (to 1 d.p.)?",
          "options": [
            "$33.5\\%$",
            "$93.4\\%$",
            "$51.7\\%$",
            "$48.3\\%$"
          ],
          "answer": 3,
          "explanation": "Error $= 0.6931 - 0.3584 = 0.3347$. Relative error $= \\frac{0.3347}{0.6931} \\times 100\\% = 48.3\\%$. Interpolating over the wide interval $[1, 6]$ is very inaccurate for a curved function."
        },
        {
          "question": "How could the linear estimate of $\\ln 2$ be improved most simply?",
          "options": [
            "Use points further apart, e.g. $(1, 0)$ and $(10, 2.3026)$",
            "Use points closer to $x = 2$, e.g. $(1, 0)$ and $(4, 1.3863)$",
            "Use the midpoint of $[1, 6]$",
            "Round $\\ln 6$ to 2 d.p."
          ],
          "answer": 1,
          "explanation": "A straight line approximates a curve better over a shorter interval. With $(1, 0)$ and $(4, 1.3863)$ we get $0.4621$, much closer to $0.6931$. A higher-degree polynomial helps too."
        },
        {
          "question": "Through $n + 1$ data points with distinct $x$-values, the interpolating polynomial has degree",
          "options": [
            "always 2",
            "at most $n$",
            "at least $n + 1$",
            "exactly $n + 1$"
          ],
          "answer": 1,
          "explanation": "There is a unique polynomial of degree at most $n$ through $n + 1$ points: 2 points give a line, 3 points a quadratic (or less), and so on."
        },
        {
          "question": "The Lagrange basis polynomials $L_k(x)$ for nodes $x_0, \\dots, x_n$ satisfy",
          "options": [
            "$L_k(x_j) = y_k$",
            "$L_k(x_j) = 0$ for every $j$",
            "$L_k(x_j) = 1$ if $j = k$ and $0$ if $j \\neq k$",
            "$L_k(x_j) = x_j$"
          ],
          "answer": 2,
          "explanation": "$L_k$ is built to be 1 at its own node and 0 at every other node. That's why $P_n(x) = \\sum y_k L_k(x)$ passes through every point."
        },
        {
          "question": "For any set of nodes, $L_0(x) + L_1(x) + \\cdots + L_n(x)$ equals",
          "options": [
            "$n$",
            "$1$",
            "$0$",
            "$x$"
          ],
          "answer": 1,
          "explanation": "Interpolating the constant data $y_k = 1$ gives $\\sum L_k(x)$; the unique interpolant of a constant is that constant, so the sum is 1 for every $x$."
        },
        {
          "question": "Find the quadratic $P_2(x) = a_0 + a_1 x + a_2 x^2$ through $(1, 4)$, $(2, 0)$ and $(3, 12)$.",
          "options": [
            "$P_2(x) = 8 - 4x + x^2$",
            "$P_2(x) = 4 + 2x - 2x^2$",
            "$P_2(x) = 24 - 28x + 8x^2$",
            "$P_2(x) = 12 - 8x + 4x^2$"
          ],
          "answer": 2,
          "explanation": "Solve $a_0 + a_1 + a_2 = 4$, $a_0 + 2a_1 + 4a_2 = 0$, $a_0 + 3a_1 + 9a_2 = 12$ to get $a_0 = 24$, $a_1 = -28$, $a_2 = 8$. Check: $24 - 56 + 32 = 0$ at $x = 2$."
        },
        {
          "question": "Using $P_2(x) = 24 - 28x + 8x^2$ (through $(1, 4)$, $(2, 0)$, $(3, 12)$), estimate the value at $x = 2.5$.",
          "options": [
            "$6$",
            "$4$",
            "$8$",
            "$2$"
          ],
          "answer": 1,
          "explanation": "$P_2(2.5) = 24 - 70 + 8(6.25) = 24 - 70 + 50 = 4$."
        },
        {
          "question": "For nodes $x_0 = 1$, $x_1 = 2$, $x_2 = 3$, the Lagrange basis polynomial $L_0(x)$ is",
          "options": [
            "$-(x - 1)(x - 3)$",
            "$\\dfrac{(x - 2)(x - 3)}{2}$",
            "$\\dfrac{(x - 1)(x - 2)}{2}$",
            "$(x - 2)(x - 3)$"
          ],
          "answer": 1,
          "explanation": "$L_0(x) = \\frac{(x - x_1)(x - x_2)}{(x_0 - x_1)(x_0 - x_2)} = \\frac{(x - 2)(x - 3)}{(-1)(-2)} = \\frac{(x - 2)(x - 3)}{2}$."
        },
        {
          "question": "For nodes $1, 2, 3$, the Lagrange basis polynomial $L_1(x)$ is",
          "options": [
            "$\\dfrac{(x - 1)(x - 2)}{2}$",
            "$(x - 1)(x - 3)$",
            "$\\dfrac{(x - 2)(x - 3)}{2}$",
            "$-(x - 1)(x - 3)$"
          ],
          "answer": 3,
          "explanation": "$L_1(x) = \\frac{(x - 1)(x - 3)}{(2 - 1)(2 - 3)} = \\frac{(x - 1)(x - 3)}{-1} = -(x - 1)(x - 3)$."
        },
        {
          "question": "The quadratic through $(0, 1)$, $(1, 3)$ and $(2, 7)$ is evaluated at $x = 1.5$. The result is",
          "options": [
            "$4.75$",
            "$4.5$",
            "$5$",
            "$5.25$"
          ],
          "answer": 0,
          "explanation": "The data fit $P_2(x) = x^2 + x + 1$ (check: 1, 3, 7). So $P_2(1.5) = 2.25 + 1.5 + 1 = 4.75$."
        },
        {
          "question": "Quadratic interpolation through $(1, 1)$, $(2, 8)$, $(3, 27)$ (from $y = x^3$) gives $P_2(2.5) = 16$. The true value is $2.5^3 = 15.625$. Why is there an error?",
          "options": [
            "A quadratic cannot exactly reproduce a cubic",
            "The points are not equally spaced",
            "Interpolation is always exact",
            "Lagrange's formula was misapplied"
          ],
          "answer": 0,
          "explanation": "Three points determine a quadratic, which can match the cubic only at the nodes. Between them there is an interpolation error (here $0.375$)."
        },
        {
          "question": "The points $(0, 0)$, $(1, 1)$, $(3, 9)$ lie on $y = x^2$. Quadratic interpolation through them gives $P_2(2) = $",
          "options": [
            "$4$",
            "$5$",
            "$4.5$",
            "$3$"
          ],
          "answer": 0,
          "explanation": "The data come from a quadratic, and the interpolant of degree $\\le 2$ through 3 points is unique, so $P_2(x) = x^2$ exactly and $P_2(2) = 4$."
        },
        {
          "question": "Estimate $\\sqrt{5}$ by linear interpolation between $(4, 2)$ and $(9, 3)$.",
          "options": [
            "$2.236$",
            "$2.2$",
            "$2.25$",
            "$2.5$"
          ],
          "answer": 1,
          "explanation": "$P_1(5) = \\frac{9 - 5}{5}(2) + \\frac{5 - 4}{5}(3) = 1.6 + 0.6 = 2.2$. The true value is $2.236$."
        },
        {
          "question": "Linear interpolation between $(10, 5)$ and $(20, 15)$ gives the value at $x = 12$ as",
          "options": [
            "$7.5$",
            "$7$",
            "$12$",
            "$6$"
          ],
          "answer": 1,
          "explanation": "Slope $= \\frac{15 - 5}{10} = 1$, so $P_1(12) = 5 + 1(12 - 10) = 7$."
        },
        {
          "question": "To find $P_2(x) = a_0 + a_1x + a_2x^2$ through $(1, 4)$, $(2, 0)$, $(3, 12)$, which equation comes from the point $(2, 0)$?",
          "options": [
            "$a_0 + 2a_1 + 2a_2 = 0$",
            "$a_0 + 2a_1 + 4a_2 = 0$",
            "$2a_0 + a_1 + a_2 = 0$",
            "$a_0 + 4a_1 + 2a_2 = 0$"
          ],
          "answer": 1,
          "explanation": "Substitute $x = 2$, $P_2(2) = 0$: $a_0 + a_1(2) + a_2(2)^2 = a_0 + 2a_1 + 4a_2 = 0$."
        },
        {
          "question": "Using an interpolating polynomial to estimate a value outside the range of the given $x$-values is called",
          "options": [
            "bisection",
            "truncation",
            "interpolation",
            "extrapolation"
          ],
          "answer": 3,
          "explanation": "Inside the data range it is interpolation; outside it is extrapolation, which is usually much less reliable."
        },
        {
          "question": "For nodes $1, 2, 3$ at $x = 2.5$: $L_0 = -0.125$, $L_1 = 0.75$, $L_2 = 0.375$. With $y$-values $4, 0, 12$, what is $P_2(2.5)$?",
          "options": [
            "$12.375$",
            "$4$",
            "$4.5$",
            "$-0.5$"
          ],
          "answer": 1,
          "explanation": "$P_2(2.5) = 4(-0.125) + 0(0.75) + 12(0.375) = -0.5 + 0 + 4.5 = 4$, matching $24 - 28x + 8x^2$ at $2.5$. Note $-0.125 + 0.75 + 0.375 = 1$."
        },
        {
          "question": "How many Lagrange basis polynomials, and of what degree, are used for interpolation through 4 points?",
          "options": [
            "1 polynomial of degree 3",
            "4 polynomials, each of degree 3",
            "4 polynomials, each of degree 4",
            "3 polynomials, each of degree 4"
          ],
          "answer": 1,
          "explanation": "One basis polynomial per node, so 4. Each $L_k$ is a product of 3 linear factors $(x - x_j)$, $j \\neq k$, so it has degree 3."
        },
        {
          "question": "Which statement about the linear interpolant $P_1$ through $(x_0, y_0)$ and $(x_1, y_1)$ is always true?",
          "options": [
            "$P_1$ is exact for every function",
            "$P_1$ has degree 2",
            "$P_1(x) = y_0 y_1$",
            "$P_1(x_0) = y_0$ and $P_1(x_1) = y_1$"
          ],
          "answer": 3,
          "explanation": "By construction the line passes through both data points. It is exact for linear functions only."
        }
      ]
    },
    {
      "id": "QS003",
      "title": "Error analysis",
      "questions": [
        {
          "question": "Writing $0.5791$ when the value you actually obtained was $0.5971$ is an example of",
          "options": [
            "truncation error",
            "gross error (blunder or mistake)",
            "propagated error",
            "round-off error"
          ],
          "answer": 1,
          "explanation": "A gross error (blunder) is a human mistake such as copying digits in the wrong order. It is not caused by the method or by rounding."
        },
        {
          "question": "Truncation error arises when",
          "options": [
            "a computer runs out of memory",
            "two nearly equal numbers are added",
            "an infinite process is replaced by a finite one",
            "a number is copied incorrectly"
          ],
          "answer": 2,
          "explanation": "For example, stopping the series $(1 + x)^{1/2} = 1 + \\frac12 x - \\frac18 x^2 + \\cdots$ after a few terms. The discarded terms are the truncation error."
        },
        {
          "question": "Round-off error is caused by",
          "options": [
            "choosing the wrong method",
            "misreading a table",
            "representing numbers with a limited number of digits",
            "using too few terms of a series"
          ],
          "answer": 2,
          "explanation": "Most numbers (like $\\frac23 = 0.6666\\ldots$) have infinitely many digits and must be rounded or chopped to fit, e.g. $0.667$."
        },
        {
          "question": "On a machine that keeps 4 significant digits, chopping $72.32451$ gives",
          "options": [
            "$72.30$",
            "$72.3245$",
            "$72.32$",
            "$72.33$"
          ],
          "answer": 2,
          "explanation": "Chopping simply drops the extra digits: $72.32|451 \\to 72.32$. The chopping error is $0.00451$."
        },
        {
          "question": "Round $0.666666$ to 3 decimal places by chopping and by symmetric rounding.",
          "options": [
            "Both give $0.666$",
            "Chopping: $0.667$; rounding: $0.666$",
            "Both give $0.667$",
            "Chopping: $0.666$; rounding: $0.667$"
          ],
          "answer": 3,
          "explanation": "Chopping drops the digits: $0.666$. Symmetric rounding adds 1 to the last kept digit because the first discarded digit (6) is $\\ge 5$: $0.667$."
        },
        {
          "question": "If $x_t$ is the true value and $X$ an approximation, the absolute error is",
          "options": [
            "$x_t \\cdot X$",
            "$x_t + X$",
            "$|x_t - X|$",
            "$\\dfrac{|x_t - X|}{|x_t|}$"
          ],
          "answer": 2,
          "explanation": "Absolute error $|\\varepsilon| = |x_t - X|$, the size of the difference regardless of sign."
        },
        {
          "question": "Relative error is defined as",
          "options": [
            "$\\dfrac{|\\text{true value}|}{\\text{absolute error}}$",
            "absolute error $\\times$ true value",
            "true value $-$ absolute error",
            "$\\dfrac{\\text{absolute error}}{|\\text{true value}|}$"
          ],
          "answer": 3,
          "explanation": "Relative error $= \\frac{|x_t - X|}{|x_t|}$. It measures the error compared with the size of the quantity, often given as a percentage."
        },
        {
          "question": "$\\frac23$ is approximated by $0.667$. What is the absolute error?",
          "options": [
            "$3.3 \\times 10^{-4}$",
            "$5.0 \\times 10^{-4}$",
            "$6.7 \\times 10^{-4}$",
            "$3.3 \\times 10^{-3}$"
          ],
          "answer": 0,
          "explanation": "$|0.666666\\ldots - 0.667| = 0.000333\\ldots \\approx 3.3 \\times 10^{-4}$. (The relative error is $\\frac{0.000333}{0.6667} = 5 \\times 10^{-4}$.)"
        },
        {
          "question": "$\\pi = 3.14159\\ldots$ is approximated by $3.14$. The relative error is about",
          "options": [
            "$0.5\\%$",
            "$0.051\\%$",
            "$1.6\\%$",
            "$0.0016$"
          ],
          "answer": 1,
          "explanation": "Absolute error $= 0.00159$. Relative error $= \\frac{0.00159}{3.14159} = 0.000507 \\approx 0.051\\%$."
        },
        {
          "question": "A number $x$ is said to be correct (rounded) to $d$ decimal places, giving $x_d$, if",
          "options": [
            "$|x - x_d| = 0$",
            "$|x - x_d| \\le 10^{d}$",
            "$|x - x_d| \\le \\frac12 \\times 10^{d}$",
            "$|x - x_d| \\le \\frac12 \\times 10^{-d}$"
          ],
          "answer": 3,
          "explanation": "Rounding to $d$ decimal places makes an error of at most half a unit in the $d$-th place: $|x - x_d| \\le \\frac12 \\times 10^{-d}$."
        },
        {
          "question": "$\\frac17 = 0.142857\\ldots$ is rounded to 2 decimal places as $0.14$. Which check is correct?",
          "options": [
            "$|0.142857 - 0.14| = 0.002857 \\le 0.0005$",
            "$|0.142857 - 0.14| = 0.02857 \\le 0.05$",
            "$|0.142857 - 0.14| = 0.002857 \\le 0.005$",
            "$0.14$ is not correct to 2 d.p."
          ],
          "answer": 2,
          "explanation": "The error is $0.002857$ and the bound for 2 d.p. is $\\frac12 \\times 10^{-2} = 0.005$. Since $0.002857 \\le 0.005$, $0.14$ is correct to 2 d.p."
        },
        {
          "question": "$24.5$ is a number correct to 1 decimal place. What is the magnitude of its maximum possible error?",
          "options": [
            "$0.5$",
            "$0.005$",
            "$0.1$",
            "$0.05$"
          ],
          "answer": 3,
          "explanation": "Correct to 1 d.p. means the error is at most $\\frac12 \\times 10^{-1} = 0.05$."
        },
        {
          "question": "The numbers $3.14$ (2 d.p.) and $2.718$ (3 d.p.) are added. What is the maximum possible absolute error in the sum?",
          "options": [
            "$0.00025$",
            "$0.005$",
            "$0.0055$",
            "$0.0005$"
          ],
          "answer": 2,
          "explanation": "In a sum, the absolute errors add: $0.005 + 0.0005 = 0.0055$."
        },
        {
          "question": "The numbers $5.43$ (2 d.p.) and $2.1$ (1 d.p.) are subtracted. The maximum possible absolute error in $5.43 - 2.1$ is",
          "options": [
            "$0.055$",
            "$0.05$",
            "$0.005$",
            "$0.045$"
          ],
          "answer": 0,
          "explanation": "For a difference the worst case still adds the absolute errors: $|\\varepsilon_1 - \\varepsilon_2| \\le |\\varepsilon_1| + |\\varepsilon_2| = 0.005 + 0.05 = 0.055$."
        },
        {
          "question": "When two approximate numbers are multiplied, the relative error of the product is approximately",
          "options": [
            "the difference of the absolute errors",
            "zero",
            "the product of the relative errors",
            "the sum of the relative errors"
          ],
          "answer": 3,
          "explanation": "$x_1x_2 - X_1X_2 \\approx X_1\\varepsilon_2 + X_2\\varepsilon_1$, so dividing by $X_1X_2$ gives relative error $\\approx \\frac{\\varepsilon_1}{X_1} + \\frac{\\varepsilon_2}{X_2}$."
        },
        {
          "question": "In deriving the error of a product $(X_1 + \\varepsilon_1)(X_2 + \\varepsilon_2)$, the term $\\varepsilon_1\\varepsilon_2$ is neglected because",
          "options": [
            "it is always zero",
            "it is always negative",
            "it cancels with $X_1X_2$",
            "it is the product of two small errors, so it is much smaller than the other terms"
          ],
          "answer": 3,
          "explanation": "If $\\varepsilon_1, \\varepsilon_2$ are small (say $10^{-3}$), then $\\varepsilon_1\\varepsilon_2 \\approx 10^{-6}$ is negligible compared with $X_1\\varepsilon_2$ and $X_2\\varepsilon_1$."
        },
        {
          "question": "For a quotient $\\frac{x_1}{x_2}$, the maximum relative error is bounded by",
          "options": [
            "$\\dfrac{|\\varepsilon_1|}{|\\varepsilon_2|}$",
            "$\\dfrac{|\\varepsilon_1|}{X_1} + \\dfrac{|\\varepsilon_2|}{X_2}$",
            "$\\dfrac{|\\varepsilon_1|}{X_1} - \\dfrac{|\\varepsilon_2|}{X_2}$",
            "$|\\varepsilon_1| \\cdot |\\varepsilon_2|$"
          ],
          "answer": 1,
          "explanation": "Just as for a product, the relative errors add in the worst case: $\\left|\\frac{\\varepsilon_1}{X_1}\\right| + \\left|\\frac{\\varepsilon_2}{X_2}\\right|$."
        },
        {
          "question": "Evaluate $\\frac{24.5}{12.37}$ and its maximum possible error, given the numbers are correct to the digits shown.",
          "options": [
            "$2.053 \\pm 0.005$",
            "$1.98 \\pm 0.0005$",
            "$1.981 \\pm 0.05$",
            "$1.981 \\pm 0.005$"
          ],
          "answer": 3,
          "explanation": "$\\frac{24.5}{12.37} = 1.9806$. Errors: $0.05$ and $0.005$. Max error $= \\left(\\frac{0.05}{24.5} + \\frac{0.005}{12.37}\\right)1.9806 = 0.0048 \\approx 0.005$."
        },
        {
          "question": "$2.36$ and $1.76$ are each correct to 2 d.p. Their product is $4.1536$. What is the maximum possible absolute error in the product (3 d.p.)?",
          "options": [
            "$0.010$",
            "$0.021$",
            "$0.005$",
            "$0.041$"
          ],
          "answer": 1,
          "explanation": "Relative error $\\le \\frac{0.005}{2.36} + \\frac{0.005}{1.76} = 0.00212 + 0.00284 = 0.00496$. Absolute error $\\le 4.1536 \\times 0.00496 = 0.0206 \\approx 0.021$."
        },
        {
          "question": "$e^{0.2}$ is estimated by the first three terms of $e^x = 1 + x + \\frac{x^2}{2!} + \\cdots$. What are the estimate and the truncation error (approximately)?",
          "options": [
            "$1.2$; $0.02$",
            "$1.22$; $0.0014$",
            "$1.2214$; $0$",
            "$1.22$; $0.014$"
          ],
          "answer": 1,
          "explanation": "$1 + 0.2 + \\frac{0.04}{2} = 1.22$. The neglected terms $\\frac{0.2^3}{6} + \\frac{0.2^4}{24} + \\cdots \\approx 0.00133 + 0.00007 = 0.0014$. ($e^{0.2} = 1.2214$.)"
        },
        {
          "question": "For chopping, the error bound is $10^{E - d}$. For symmetric rounding of the same number, the error bound is",
          "options": [
            "$2 \\times 10^{E - d}$",
            "$\\frac12 \\times 10^{E - d}$",
            "$10^{E + d}$",
            "the same, $10^{E - d}$"
          ],
          "answer": 1,
          "explanation": "Symmetric rounding never moves the number by more than half a unit in the last place, so its bound is half the chopping bound: $\\frac12 \\times 10^{E - d}$."
        },
        {
          "question": "The normalised floating-point form of $72.32451$ is",
          "options": [
            "$0.7232451 \\times 10^{-2}$",
            "$0.7232451 \\times 10^{2}$",
            "$7.232451 \\times 10^{1}$",
            "$72.32451 \\times 10^{0}$"
          ],
          "answer": 1,
          "explanation": "Normalised form puts the decimal point before the first non-zero digit: $0.7232451 \\times 10^2$."
        },
        {
          "question": "Subtracting two nearly equal approximate numbers (e.g. $1.2345 - 1.2341$) is dangerous because",
          "options": [
            "the result is always zero",
            "truncation error appears",
            "the relative error of the result can become very large",
            "the absolute error becomes very large"
          ],
          "answer": 2,
          "explanation": "The absolute errors still add, but the result ($0.0004$) is tiny, so the error relative to it is huge. This is called loss of significant digits."
        },
        {
          "question": "Which type of error decreases when more terms of a series are used?",
          "options": [
            "Truncation error",
            "Blunder",
            "Round-off error",
            "Gross error"
          ],
          "answer": 0,
          "explanation": "Truncation error comes from the terms left out, so keeping more terms reduces it. (Round-off can actually grow with more arithmetic.)"
        },
        {
          "question": "To evaluate $x^2 - 2 + \\frac{1}{x^2}$ at $x = 1.473$ with less arithmetic (and less round-off), first write it as",
          "options": [
            "$(x + \\frac1x)^2$, giving $4.6306$",
            "$(x - 1)^2$, giving $0.2237$",
            "$(x - \\frac1x)^2$, giving $0.6306$",
            "$x^2 - \\frac{1}{x^2}$, giving $1.7088$"
          ],
          "answer": 2,
          "explanation": "$x^2 - 2 + \\frac1{x^2} = \\left(x - \\frac1x\\right)^2$. With $x = 1.473$: $\\frac1x = 0.67889$, $x - \\frac1x = 0.79411$, squared $= 0.6306$."
        }
      ]
    },
    {
      "id": "QS004",
      "title": "Finite differences",
      "questions": [
        {
          "question": "The forward difference operator $\\Delta$ is defined by",
          "options": [
            "$\\Delta f_k = f_{k+1} + f_k$",
            "$\\Delta f_k = f_k - f_{k-1}$",
            "$\\Delta f_k = f_{k+1} - f_k$",
            "$\\Delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$"
          ],
          "answer": 2,
          "explanation": "Forward looks ahead: $\\Delta f_k = f_{k+1} - f_k$. Backward is $\\nabla f_k = f_k - f_{k-1}$; central is $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$."
        },
        {
          "question": "The backward difference operator $\\nabla$ is defined by",
          "options": [
            "$\\nabla f_k = f_{k+1} - 2f_k + f_{k-1}$",
            "$\\nabla f_k = f_{k-1} - f_k$",
            "$\\nabla f_k = f_k - f_{k-1}$",
            "$\\nabla f_k = f_{k+1} - f_k$"
          ],
          "answer": 2,
          "explanation": "Backward looks behind: $\\nabla f_k = f_k - f_{k-1}$."
        },
        {
          "question": "The central difference operator $\\delta$ is defined by",
          "options": [
            "$\\delta f_k = f_{k+1} - f_{k-1}$",
            "$\\delta f_k = f_k - f_{k-1}$",
            "$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$",
            "$\\delta f_k = \\frac12(f_{k+1} + f_{k-1})$"
          ],
          "answer": 2,
          "explanation": "The central difference is centred on $x_k$, using the half-step points: $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$."
        },
        {
          "question": "In terms of ordinates, $\\Delta^2 f_k$ equals",
          "options": [
            "$f_{k+2} - f_k$",
            "$f_{k+2} - 2f_{k+1} + f_k$",
            "$f_{k+2} + 2f_{k+1} + f_k$",
            "$f_{k+1} - 2f_k + f_{k-1}$"
          ],
          "answer": 1,
          "explanation": "$\\Delta^2 f_k = \\Delta f_{k+1} - \\Delta f_k = (f_{k+2} - f_{k+1}) - (f_{k+1} - f_k) = f_{k+2} - 2f_{k+1} + f_k$."
        },
        {
          "question": "In terms of ordinates, $\\Delta^3 f_k$ equals",
          "options": [
            "$f_{k+3} + 3f_{k+2} + 3f_{k+1} + f_k$",
            "$f_{k+3} - 3f_{k+2} + 3f_{k+1} - f_k$",
            "$f_{k+3} - 2f_{k+2} + f_{k+1}$",
            "$f_{k+3} - f_k$"
          ],
          "answer": 1,
          "explanation": "The coefficients are the binomial coefficients $1, 3, 3, 1$ with alternating signs: $f_{k+3} - 3f_{k+2} + 3f_{k+1} - f_k$."
        },
        {
          "question": "For the table $x$: $0, 0.1, 0.2, 0.3, 0.4, 0.5$ and $y$: $0.05, 0.11, 0.26, 0.35, 0.49, 0.67$ (so $y_0 = 0.05, \\dots, y_5 = 0.67$), find $\\Delta y_3$.",
          "options": [
            "$0.35$",
            "$0.09$",
            "$0.18$",
            "$0.14$"
          ],
          "answer": 3,
          "explanation": "$\\Delta y_3 = y_4 - y_3 = 0.49 - 0.35 = 0.14$."
        },
        {
          "question": "For the table $x$: $0, 0.1, 0.2, 0.3, 0.4, 0.5$ and $y$: $0.05, 0.11, 0.26, 0.35, 0.49, 0.67$ (so $y_0 = 0.05, \\dots, y_5 = 0.67$), find $\\Delta^3 y_2$.",
          "options": [
            "$-0.13$",
            "$-0.01$",
            "$0.13$",
            "$0.01$"
          ],
          "answer": 1,
          "explanation": "$\\Delta^3 y_2 = y_5 - 3y_4 + 3y_3 - y_2 = 0.67 - 1.47 + 1.05 - 0.26 = -0.01$."
        },
        {
          "question": "The relation between the forward difference operator $\\Delta$ and the shift operator $E$ is",
          "options": [
            "$\\Delta = E + 1$",
            "$\\Delta = E^{\\frac12} - E^{-\\frac12}$",
            "$\\Delta = 1 - E^{-1}$",
            "$\\Delta = E - 1$"
          ],
          "answer": 3,
          "explanation": "$\\Delta f_k = f_{k+1} - f_k = Ef_k - f_k = (E - 1)f_k$, so $\\Delta = E - 1$."
        },
        {
          "question": "The relation between the backward difference operator $\\nabla$ and $E$ is",
          "options": [
            "$\\nabla = E - 1$",
            "$\\nabla = 1 + E$",
            "$\\nabla = E^{-1} - 1$",
            "$\\nabla = 1 - E^{-1}$"
          ],
          "answer": 3,
          "explanation": "$\\nabla f_k = f_k - f_{k-1} = f_k - E^{-1}f_k = (1 - E^{-1})f_k$."
        },
        {
          "question": "In terms of $E$, the central difference operator is",
          "options": [
            "$\\delta = E - E^{-1}$",
            "$\\delta = \\frac12(E + E^{-1})$",
            "$\\delta = E^2 - 1$",
            "$\\delta = E^{\\frac12} - E^{-\\frac12}$"
          ],
          "answer": 3,
          "explanation": "$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12} = E^{\\frac12}f_k - E^{-\\frac12}f_k$."
        },
        {
          "question": "Which identity is true?",
          "options": [
            "$\\Delta = \\nabla$",
            "$\\delta = \\Delta\\nabla$",
            "$\\delta^2 = \\Delta\\nabla$",
            "$\\delta^2 = \\Delta + \\nabla$"
          ],
          "answer": 2,
          "explanation": "$\\delta^2 = (E^{\\frac12} - E^{-\\frac12})^2 = E - 2 + E^{-1} = (E - 1)(1 - E^{-1}) = \\Delta\\nabla$."
        },
        {
          "question": "The values of $y = x^3$ at $x = 1, 2, 3, 4, 5$ are $1, 8, 27, 64, 125$. The third differences are",
          "options": [
            "$12, 18, 24$",
            "all equal to $0$",
            "$7, 19, 37$",
            "all equal to $6$"
          ],
          "answer": 3,
          "explanation": "First differences: $7, 19, 37, 61$. Second: $12, 18, 24$. Third: $6, 6$. For a polynomial of degree $n$ (with $h = 1$), the $n$-th differences are constant ($n! \\times$ leading coefficient $= 3! = 6$)."
        },
        {
          "question": "For $f(x) = x^2$ with step $h = 1$, $\\Delta^2 f(x)$ equals",
          "options": [
            "$2$",
            "$2x$",
            "$1$",
            "$0$"
          ],
          "answer": 0,
          "explanation": "$\\Delta^2 x^2 = (x + 2)^2 - 2(x + 1)^2 + x^2 = 2$. The second differences of a quadratic are constant."
        },
        {
          "question": "For $f(x) = x^2 + 2x$ with $h = 1$, the forward difference $\\Delta f(3) = f(4) - f(3)$ equals",
          "options": [
            "$7$",
            "$24$",
            "$8$",
            "$9$"
          ],
          "answer": 3,
          "explanation": "$\\Delta f(x) = f(x + 1) - f(x) = 2x + 3$, so $\\Delta f(3) = 9$. (Check: $f(4) - f(3) = 24 - 15 = 9$.)"
        },
        {
          "question": "For $f(x) = x^2 + 2x$ with $h = 1$, the backward difference $\\nabla f(3)$ equals",
          "options": [
            "$9$",
            "$7$",
            "$8$",
            "$15$"
          ],
          "answer": 1,
          "explanation": "$\\nabla f(x) = f(x) - f(x - 1) = 2x + 1$, so $\\nabla f(3) = 7$. (Check: $15 - 8 = 7$.)"
        },
        {
          "question": "For $f(x) = x^2 + 2x$, the true derivative at $x = 3$ is $8$. With $h = 1$, which difference gives exactly $8$?",
          "options": [
            "Forward difference",
            "Backward difference",
            "None of the three",
            "Central difference"
          ],
          "answer": 3,
          "explanation": "$\\delta f(3) = f(3.5) - f(2.5) = 19.25 - 11.25 = 8$. Forward gives 9 and backward 7; the central difference is exact for quadratics."
        },
        {
          "question": "Which relation between forward and backward differences is correct?",
          "options": [
            "$\\Delta^3 y_1 = \\nabla^3 y_2$",
            "$\\Delta^3 y_1 = \\nabla^3 y_4$",
            "$\\Delta^3 y_1 = \\nabla^3 y_1$",
            "$\\Delta y_1 = \\nabla y_0$"
          ],
          "answer": 1,
          "explanation": "In general $\\Delta^n y_k = \\nabla^n y_{k+n}$: both use exactly the ordinates $y_k, \\dots, y_{k+n}$. So $\\Delta^3 y_1 = \\nabla^3 y_4$."
        },
        {
          "question": "In Newton's forward difference formula $f_r = f_0 + r\\Delta f_0 + \\cdots$, the term in $\\Delta^2 f_0$ is",
          "options": [
            "$\\dfrac{r(r + 1)}{2!}\\Delta^2 f_0$",
            "$r^2\\Delta^2 f_0$",
            "$\\dfrac{r^2}{2}\\Delta^2 f_0$",
            "$\\dfrac{r(r - 1)}{2!}\\Delta^2 f_0$"
          ],
          "answer": 3,
          "explanation": "From $E^r = (1 + \\Delta)^r = 1 + r\\Delta + \\frac{r(r - 1)}{2!}\\Delta^2 + \\cdots$, the second-difference term is $\\frac{r(r - 1)}{2!}\\Delta^2 f_0$."
        },
        {
          "question": "In Newton's backward difference formula $f_r = f_n + r\\nabla f_n + \\cdots$, the term in $\\nabla^2 f_n$ is",
          "options": [
            "$\\dfrac{r(r + 1)}{2!}\\nabla^2 f_n$",
            "$\\dfrac{r(r - 1)}{2!}\\nabla^2 f_n$",
            "$r^2\\nabla^2 f_n$",
            "$-\\dfrac{r(r + 1)}{2!}\\nabla^2 f_n$"
          ],
          "answer": 0,
          "explanation": "$E^r = (1 - \\nabla)^{-r} = 1 + r\\nabla + \\frac{r(r + 1)}{2!}\\nabla^2 + \\cdots$, so the term is $\\frac{r(r + 1)}{2!}\\nabla^2 f_n$."
        },
        {
          "question": "Populations (thousands) are given for 1891, 1901, 1911, 1921, 1931. To estimate 1895 by Newton's forward formula from $x_0 = 1891$, what is $r$?",
          "options": [
            "$0.6$",
            "$-0.6$",
            "$4$",
            "$0.4$"
          ],
          "answer": 3,
          "explanation": "$x = x_0 + rh$ with $h = 10$: $1895 = 1891 + 10r$, so $r = 0.4$."
        },
        {
          "question": "Populations: 1891: 46, 1901: 66, 1911: 81, 1921: 93, 1931: 101. The forward differences from 1891 are $\\Delta = 20$, $\\Delta^2 = -5$, $\\Delta^3 = 2$, $\\Delta^4 = -3$. Newton's forward formula with $r = 0.4$ estimates the 1895 population as about",
          "options": [
            "$56.4$",
            "$52.8$",
            "$54.9$",
            "$58.0$"
          ],
          "answer": 2,
          "explanation": "$46 + 0.4(20) + \\frac{0.4(-0.6)}{2}(-5) + \\frac{0.4(-0.6)(-1.6)}{6}(2) + \\frac{0.4(-0.6)(-1.6)(-2.6)}{24}(-3) = 46 + 8 + 0.6 + 0.128 + 0.1248 = 54.85$."
        },
        {
          "question": "For the same population table, which formula is better for estimating the 1925 population, and why?",
          "options": [
            "Newton forward from 1891, because it uses the most data",
            "Newton backward from 1931, because 1925 is near the end of the table",
            "Neither; extrapolation is required",
            "Newton forward from 1931"
          ],
          "answer": 1,
          "explanation": "Use the backward formula near the end of a table (here $r = \\frac{1925 - 1931}{10} = -0.6$) and the forward formula near the start. The estimate is $96.84$."
        },
        {
          "question": "The shift operator $E$ acts as",
          "options": [
            "$Ef_k = f_{k-1}$",
            "$Ef_k = f_{k+1}$ and $E^j f_k = f_{k+j}$",
            "$Ef_k = kf_k$",
            "$Ef_k = f_k + 1$"
          ],
          "answer": 1,
          "explanation": "$E$ shifts one step forward: $Ef_k = f_{k+1}$, $E^{-1}f_k = f_{k-1}$, $E^j f_k = f_{k+j}$."
        },
        {
          "question": "For a polynomial of degree $n$ tabulated at equal steps, which differences are zero?",
          "options": [
            "The $n$-th differences",
            "No differences are ever zero",
            "The $(n + 1)$-th and all higher differences",
            "The first differences"
          ],
          "answer": 2,
          "explanation": "The $n$-th differences are constant, so the $(n + 1)$-th and higher differences are zero. That is why Newton's formulas reproduce polynomials exactly."
        },
        {
          "question": "For $x$: $9, 10, 11, 12, 13, 14$ and $y$: $5.0, 5.4, 6.0, 6.8, 7.5, 8.1$, what is $\\Delta^2 y_0$?",
          "options": [
            "$1.0$",
            "$0.4$",
            "$0.2$",
            "$0.6$"
          ],
          "answer": 2,
          "explanation": "$\\Delta y_0 = 0.4$, $\\Delta y_1 = 0.6$, so $\\Delta^2 y_0 = 0.6 - 0.4 = 0.2$. (Equivalently $y_2 - 2y_1 + y_0 = 6.0 - 10.8 + 5.0 = 0.2$.)"
        }
      ]
    },
    {
      "id": "QS005",
      "title": "Systems of linear equations",
      "questions": [
        {
          "question": "Which of these methods for solving $AX = B$ is iterative rather than direct?",
          "options": [
            "Gauss-Seidel method",
            "Gaussian elimination",
            "LU factorisation",
            "Matrix inverse method"
          ],
          "answer": 0,
          "explanation": "Matrix inverse, LU and Gaussian are direct: they finish in a fixed number of steps. Simple iteration and Gauss-Seidel produce a sequence of approximations that converges to the answer."
        },
        {
          "question": "The matrix inverse method $X = A^{-1}B$ fails when",
          "options": [
            "$B = 0$",
            "$A$ is symmetric",
            "$\\det A < 0$",
            "$\\det A = 0$"
          ],
          "answer": 3,
          "explanation": "$A^{-1} = \\frac{1}{\\det A}\\operatorname{adj}A$ exists only if $\\det A \\neq 0$. If $\\det A = 0$, $A$ is singular and the system has no unique solution."
        },
        {
          "question": "For the system $2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$, what is $\\det A$?",
          "options": [
            "$-5$",
            "$13$",
            "$1$",
            "$-1$"
          ],
          "answer": 3,
          "explanation": "$\\det A = 2\\begin{vmatrix}-2 & 1\\\\ -1 & 3\\end{vmatrix} - 3\\begin{vmatrix}1 & 1\\\\ 2 & 3\\end{vmatrix} + 4\\begin{vmatrix}1 & -2\\\\ 2 & -1\\end{vmatrix} = 2(-5) - 3(1) + 4(3) = -1$."
        },
        {
          "question": "Solve $2x_1 + 3x_2 + 4x_3 = 0$, $x_1 - 2x_2 + x_3 = 3$, $2x_1 - x_2 + 3x_3 = 1$.",
          "options": [
            "$x_1 = 28,\\ x_2 = 4,\\ x_3 = -17$",
            "$x_1 = -28,\\ x_2 = -4,\\ x_3 = 17$",
            "$x_1 = 1,\\ x_2 = 2,\\ x_3 = -1$",
            "$x_1 = 28,\\ x_2 = -4,\\ x_3 = -17$"
          ],
          "answer": 0,
          "explanation": "With $\\det A = -1$, $A^{-1} = -\\operatorname{adj}A$ and $X = A^{-1}B = (28, 4, -17)^T$. Check eq. 2: $28 - 8 - 17 = 3$ ✓."
        },
        {
          "question": "Solve $2x + 4y = 0$, $2x + 3y = 4$ by the matrix inverse method.",
          "options": [
            "$x = -8,\\ y = 4$",
            "$x = 4,\\ y = -2$",
            "$x = 8,\\ y = -4$",
            "$x = 2,\\ y = -1$"
          ],
          "answer": 2,
          "explanation": "$\\det A = 6 - 8 = -2$, $A^{-1} = \\frac{1}{-2}\\begin{pmatrix}3 & -4\\\\ -2 & 2\\end{pmatrix}$, so $X = \\frac{1}{-2}\\begin{pmatrix}-16\\\\ 8\\end{pmatrix} = \\begin{pmatrix}8\\\\ -4\\end{pmatrix}$."
        },
        {
          "question": "The adjoint $\\operatorname{adj}A$ of a square matrix $A$ is",
          "options": [
            "$\\frac{1}{\\det A}A$",
            "the transpose of the matrix of cofactors",
            "$A^T$",
            "the matrix of minors"
          ],
          "answer": 1,
          "explanation": "Find every cofactor $C_{ij} = (-1)^{i+j}M_{ij}$, then transpose. Equivalently, take the cofactors of $A^T$."
        },
        {
          "question": "For a $3 \\times 3$ matrix, what sign does the cofactor $C_{12}$ carry relative to the minor $M_{12}$?",
          "options": [
            "$-$",
            "It is always zero",
            "It depends on $\\det A$",
            "$+$"
          ],
          "answer": 0,
          "explanation": "$C_{12} = (-1)^{1+2}M_{12} = -M_{12}$. The sign pattern is $\\begin{smallmatrix}+ & - & +\\\\ - & + & -\\\\ + & - & +\\end{smallmatrix}$."
        },
        {
          "question": "The inverse of $\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}$ (when $ad - bc \\neq 0$) is",
          "options": [
            "$\\dfrac{1}{ad - bc}\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix}$",
            "$\\dfrac{1}{ad + bc}\\begin{pmatrix}d & b\\\\ c & a\\end{pmatrix}$",
            "$\\dfrac{1}{ad - bc}\\begin{pmatrix}a & -b\\\\ -c & d\\end{pmatrix}$",
            "$\\begin{pmatrix}d & -b\\\\ -c & a\\end{pmatrix}$"
          ],
          "answer": 0,
          "explanation": "Swap the diagonal entries, change the sign of the off-diagonal entries, and divide by the determinant $ad - bc$."
        },
        {
          "question": "In the LU (Doolittle) method, $A = LU$ where",
          "options": [
            "$U$ has 1s on its diagonal and $L$ is upper triangular",
            "$L$ is lower triangular with 1s on its diagonal and $U$ is upper triangular",
            "both $L$ and $U$ are diagonal",
            "$L$ is upper triangular and $U$ is lower triangular"
          ],
          "answer": 1,
          "explanation": "Fixing $l_{ii} = 1$ makes the factorisation unique: there are $n^2$ equations, and this leaves exactly $n^2$ unknowns."
        },
        {
          "question": "After factorising $A = LU$, the system $AX = B$ is solved by",
          "options": [
            "solving $UY = B$ by back substitution, then $LX = Y$",
            "solving $LY = B$ by forward substitution, then $UX = Y$ by back substitution",
            "inverting $L$ and $U$",
            "Gauss-Seidel iteration on $L$"
          ],
          "answer": 1,
          "explanation": "$AX = LUX = B$. Put $Y = UX$: first $LY = B$ (forward substitution, $y_1$ first), then $UX = Y$ (back substitution, $x_n$ first)."
        },
        {
          "question": "For $A = \\begin{pmatrix}2 & 3 & 4\\\\ 1 & -2 & 1\\\\ 2 & -1 & 3\\end{pmatrix}$, Doolittle's LU gives $u_{11} = 2$, $u_{12} = 3$, $l_{21} = \\frac12$. What is $u_{22}$?",
          "options": [
            "$\\frac72$",
            "$-2$",
            "$-\\frac72$",
            "$-\\frac12$"
          ],
          "answer": 2,
          "explanation": "$a_{22} = l_{21}u_{12} + u_{22}$, so $-2 = \\frac12(3) + u_{22}$, giving $u_{22} = -2 - \\frac32 = -\\frac72$."
        },
        {
          "question": "For the same matrix, $l_{31} = 1$, $u_{12} = 3$ and $u_{22} = -\\frac72$. What is $l_{32}$?",
          "options": [
            "$\\frac87$",
            "$\\frac{8}{3}$",
            "$-\\frac87$",
            "$\\frac47$"
          ],
          "answer": 0,
          "explanation": "$a_{32} = l_{31}u_{12} + l_{32}u_{22}$: $-1 = 3 - \\frac72 l_{32}$, so $\\frac72 l_{32} = 4$ and $l_{32} = \\frac87$."
        },
        {
          "question": "If $A = LU$ with $L$ having 1s on its diagonal, then $\\det A$ equals",
          "options": [
            "$l_{21}l_{32}\\cdots$",
            "$\\det L$",
            "$1$",
            "$u_{11}u_{22}\\cdots u_{nn}$"
          ],
          "answer": 3,
          "explanation": "$\\det A = \\det L \\det U = 1 \\times (u_{11}u_{22}\\cdots u_{nn})$. For example, if $u_{11} = 2$, $u_{22} = -\\frac72$, $u_{33} = \\frac17$: $2 \\cdot (-\\frac72) \\cdot \\frac17 = -1$ ✓."
        },
        {
          "question": "What is the main practical advantage of LU factorisation?",
          "options": [
            "It always converges faster than Gauss-Seidel",
            "It works when $\\det A = 0$",
            "Once $A = LU$ is found, each new right-hand side $B$ needs only two quick substitutions",
            "It never needs any division"
          ],
          "answer": 2,
          "explanation": "The expensive part is factorising $A$. For a new $B$, just redo $LY = B$ and $UX = Y$."
        },
        {
          "question": "$A = \\begin{pmatrix}2 & 1 & 1\\\\ 4 & 3 & 3\\\\ 8 & 7 & 9\\end{pmatrix}$ has $L = \\begin{pmatrix}1 & 0 & 0\\\\ 2 & 1 & 0\\\\ 4 & 3 & 1\\end{pmatrix}$, $U = \\begin{pmatrix}2 & 1 & 1\\\\ 0 & 1 & 1\\\\ 0 & 0 & 2\\end{pmatrix}$. Solve $AX = (3, 7, 19)^T$.",
          "options": [
            "$X = (1, 1, 1)^T$",
            "$X = (3, 1, 4)^T$",
            "$X = (2, -1, 1)^T$",
            "$X = (1, -1, 2)^T$"
          ],
          "answer": 3,
          "explanation": "$LY = B$: $y_1 = 3$, $y_2 = 7 - 6 = 1$, $y_3 = 19 - 12 - 3 = 4$. $UX = Y$: $x_3 = 2$, $x_2 = 1 - 2 = -1$, $x_1 = \\frac{3 + 1 - 2}{2} = 1$."
        },
        {
          "question": "In the Gaussian method, the first step divides equation (1) by $a_{11}$, giving coefficients",
          "options": [
            "$b_{1j} = \\dfrac{a_{11}}{a_{1j}}$",
            "$b_{1j} = a_{1j} - a_{11}$",
            "$b_{1j} = \\dfrac{a_{1j}}{a_{11}}$",
            "$b_{1j} = a_{1j}a_{11}$"
          ],
          "answer": 2,
          "explanation": "Dividing row 1 by the pivot $a_{11}$ makes its leading coefficient 1: $b_{1j} = \\frac{a_{1j}}{a_{11}}$."
        },
        {
          "question": "The Gaussian elimination formula for the new coefficients after eliminating $x_1$ is",
          "options": [
            "$a^{(1)}_{ij} = a_{ij} + a_{i1}b_{1j}$",
            "$a^{(1)}_{ij} = a_{ij}b_{1j}$",
            "$a^{(1)}_{ij} = \\dfrac{a_{ij}}{a_{i1}}$",
            "$a^{(1)}_{ij} = a_{ij} - a_{i1}b_{1j}$"
          ],
          "answer": 3,
          "explanation": "Multiply the normalised row 1 by $a_{i1}$ and subtract it from row $i$: new $=$ old $-$ (column entry) $\\times$ (pivot-row entry)."
        },
        {
          "question": "During Gaussian elimination the pivot $a_{11}$ is zero. What should you do?",
          "options": [
            "Stop: the system has no solution",
            "Interchange equation (1) with a lower equation whose $x_1$ coefficient is non-zero (preferably the largest)",
            "Divide by a small number instead",
            "Set $x_1 = 0$"
          ],
          "answer": 1,
          "explanation": "Swapping equations does not change the solution. Choosing the largest available pivot (partial pivoting) also keeps rounding errors small."
        },
        {
          "question": "In a $4 \\times 4$ Gaussian elimination, $a_{24} = -8.5$, $a_{21} = 0.4$ and $b_{14} = 0.5$. What is $a^{(1)}_{24}$?",
          "options": [
            "$8.7$",
            "$-8.7$",
            "$-8.3$",
            "$-8.5$"
          ],
          "answer": 1,
          "explanation": "$a^{(1)}_{24} = a_{24} - a_{21}b_{14} = -8.5 - 0.4(0.5) = -8.7$. Subtracting $0.2$ makes it more negative."
        },
        {
          "question": "In the method of simple iteration, writing $AX = B$ as $X = CX + F$ gives",
          "options": [
            "$c_{ij} = \\dfrac{a_{ij}}{a_{ii}}$, $f_i = b_i$",
            "$c_{ij} = a_{ij}$, $f_i = b_i$",
            "$c_{ij} = -a_{ii}a_{ij}$, $f_i = a_{ii}b_i$",
            "$c_{ij} = -\\dfrac{a_{ij}}{a_{ii}}\\ (i \\neq j)$, $c_{ii} = 0$, $f_i = \\dfrac{b_i}{a_{ii}}$"
          ],
          "answer": 3,
          "explanation": "Solve equation $i$ for $x_i$: $x_i = \\frac{1}{a_{ii}}\\left(b_i - \\sum_{j \\neq i} a_{ij}x_j\\right)$. So $c_{ij} = -\\frac{a_{ij}}{a_{ii}}$ and $f_i = \\frac{b_i}{a_{ii}}$."
        },
        {
          "question": "A sufficient condition for simple iteration (and Gauss-Seidel) to converge for any starting vector is",
          "options": [
            "$\\det A > 1$",
            "$\\sum_j |c_{ij}| \\le \\alpha < 1$ for every row $i$",
            "$\\sum_j |c_{ij}| > 1$ for some row",
            "all $b_i$ are positive"
          ],
          "answer": 1,
          "explanation": "Row sums (or column sums) of $|c_{ij}|$ below 1 guarantee convergence. In practice: each diagonal coefficient must dominate the others in its row."
        },
        {
          "question": "For the system $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$, what is $\\alpha$, the largest row sum of $|c_{ij}|$?",
          "options": [
            "$0.4$",
            "$0.3$",
            "$1.2$",
            "$0.2$"
          ],
          "answer": 0,
          "explanation": "Row sums: $\\frac{1 + 1}{10} = 0.2$, $\\frac{2 + 1}{10} = 0.3$, $\\frac{2 + 2}{10} = 0.4$. So $\\alpha = 0.4 < 1$ and the iteration converges."
        },
        {
          "question": "Apply one simple-iteration step to $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$ from $x^{(0)} = (0, 0, 0)^T$.",
          "options": [
            "$x^{(1)} = (1.2, 1.06, 0.948)^T$",
            "$x^{(1)} = (1, 1, 1)^T$",
            "$x^{(1)} = (12, 13, 14)^T$",
            "$x^{(1)} = (1.2, 1.3, 1.4)^T$"
          ],
          "answer": 3,
          "explanation": "With all old values 0: $x_1 = \\frac{12}{10} = 1.2$, $x_2 = \\frac{13}{10} = 1.3$, $x_3 = \\frac{14}{10} = 1.4$. ($(1.2, 1.06, 0.948)$ is the Gauss-Seidel step.)"
        },
        {
          "question": "Apply one Gauss-Seidel step to $10x_1 + x_2 + x_3 = 12$, $2x_1 + 10x_2 + x_3 = 13$, $2x_1 + 2x_2 + 10x_3 = 14$ from $x^{(0)} = (0, 0, 0)^T$.",
          "options": [
            "$x^{(1)} = (1.2, 1.06, 1.4)^T$",
            "$x^{(1)} = (1.2, 1.06, 0.948)^T$",
            "$x^{(1)} = (1.2, 1.3, 1.4)^T$",
            "$x^{(1)} = (1, 1, 1)^T$"
          ],
          "answer": 1,
          "explanation": "$x_1 = 1.2$; $x_2 = \\frac{13 - 2(1.2)}{10} = 1.06$ (uses the new $x_1$); $x_3 = \\frac{14 - 2(1.2) - 2(1.06)}{10} = 0.948$. The exact solution is $(1, 1, 1)$."
        },
        {
          "question": "What is the key difference between Gauss-Seidel and simple iteration?",
          "options": [
            "Gauss-Seidel needs $\\det A$",
            "Simple iteration is a direct method",
            "Gauss-Seidel uses each new value $x_i^{(k+1)}$ as soon as it is computed",
            "Gauss-Seidel does not need a starting vector"
          ],
          "answer": 2,
          "explanation": "Simple iteration builds all of $x^{(k+1)}$ from $x^{(k)}$. Gauss-Seidel uses the newest values immediately, so it usually converges in fewer iterations."
        }
      ]
    }
  ]
};
