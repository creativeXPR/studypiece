// MTH 103 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MTH 103",
  "title": "",
  "sets": [
    {
      "id": "QS001",
      "questions": [
        {
          "question": "Find the distance between $A(2, -3)$ and $B(3, 4)$.",
          "options": [
            "$\\sqrt{50}$",
            "$5\\sqrt{2}$",
            "$\\sqrt{58}$",
            "$7$"
          ],
          "answer": 0,
          "explanation": "Using the distance formula: $AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} = \\sqrt{(3-2)^2 + (4-(-3))^2} = \\sqrt{1^2 + 7^2} = \\sqrt{1 + 49} = \\sqrt{50}$"
        },
        {
          "question": "The midpoint of $A(2,7)$ and $B(3,5)$ is:",
          "options": [
            "$(2.5, 6)$",
            "$(5, 12)$",
            "$(2.5, 5)$",
            "$(2, 6)$"
          ],
          "answer": 0,
          "explanation": "Using the midpoint formula: $\\bar{x} = \\frac{x_2 + x_1}{2} = \\frac{2+3}{2} = 2.5$, $\\bar{y} = \\frac{y_2 + y_1}{2} = \\frac{7+5}{2} = 6$, so midpoint is $(2.5, 6)$"
        },
        {
          "question": "Find the equation of the line through $A(1, -3)$ and $B(2, 4)$.",
          "options": [
            "$7x - y - 10 = 0$",
            "$7x - y + 10 = 0$",
            "$x - 7y - 10 = 0$",
            "$7x + y - 4 = 0$"
          ],
          "answer": 0,
          "explanation": "Using two-point form: $\\frac{y - (-3)}{x - 1} = \\frac{4 - (-3)}{2 - 1} = \\frac{7}{1}$, so $y + 3 = 7(x - 1)$, giving $y = 7x - 10$ or $7x - y - 10 = 0$"
        },
        {
          "question": "The slope of line $2y = 3x - 8$ is:",
          "options": [
            "$3$",
            "$\\frac{3}{2}$",
            "$\\frac{2}{3}$",
            "$-\\frac{3}{2}$"
          ],
          "answer": 1,
          "explanation": "Convert to slope-intercept form: $2y = 3x - 8$ ⇒ $y = \\frac{3}{2}x - 4$, so slope $m = \\frac{3}{2}$"
        },
        {
          "question": "The acute angle between $2y = 3x - 8$ and $5y = x + 7$ is:",
          "options": [
            "$45^\\circ$",
            "$60^\\circ$",
            "$30^\\circ$",
            "$75^\\circ$"
          ],
          "answer": 0,
          "explanation": "Slopes: $m_1 = \\frac{3}{2}$, $m_2 = \\frac{1}{5}$. Using formula: $\\tan\\theta = |\\frac{m_1 - m_2}{1 + m_1 m_2}| = |\\frac{3/2 - 1/5}{1 + (3/2)(1/5)}| = |\\frac{13/10}{1 + 3/10}| = \\frac{13/10}{13/10} = 1$, so $\\theta = 45^\\circ$"
        },
        {
          "question": "The perpendicular distance from $(2, -1)$ to $3x - 4y + 5 = 0$ is:",
          "options": [
            "$3$",
            "$2$",
            "$1$",
            "$4$"
          ],
          "answer": 0,
          "explanation": "Using distance formula: $d = \\frac{|ax_1 + by_1 + c|}{\\sqrt{a^2 + b^2}} = \\frac{|3(2) - 4(-1) + 5|}{\\sqrt{3^2 + (-4)^2}} = \\frac{|6 + 4 + 5|}{\\sqrt{9 + 16}} = \\frac{15}{5} = 3$"
        },
        {
          "question": "The equation of the perpendicular bisector of $A(-2,3)$ and $B(4,7)$ is:",
          "options": [
            "$3x + 2y - 5 = 0$",
            "$2x + 3y - 5 = 0$",
            "$3x - 2y + 5 = 0$",
            "$2x - 3y + 5 = 0$"
          ],
          "answer": 0,
          "explanation": "Midpoint: $(1,5)$, slope of AB: $\\frac{7-3}{4-(-2)} = \\frac{4}{6} = \\frac{2}{3}$, so perpendicular slope is $-\\frac{3}{2}$. Equation: $y - 5 = -\\frac{3}{2}(x - 1)$ ⇒ $2y - 10 = -3x + 3$ ⇒ $3x + 2y - 13 = 0$"
        },
        {
          "question": "If $(-3, 5)$, $(4, -2)$, $(6, 2)$ are vertices of a triangle, the circumcenter is:",
          "options": [
            "$(1, 1)$",
            "$(2, 2)$",
            "$(0, 0)$",
            "$(1, 0)$"
          ],
          "answer": 0,
          "explanation": "Find perpendicular bisectors of two sides and solve: For AB (midpoint $(0.5,1.5)$, slope $\\frac{-2-5}{4-(-3)} = -1$, perpendicular slope 1): $y - 1.5 = 1(x - 0.5)$ ⇒ $x - y + 1 = 0$. For BC (midpoint $(5,0)$, slope $\\frac{2-(-2)}{6-4} = 2$, perpendicular slope $-\\frac{1}{2}$): $y - 0 = -\\frac{1}{2}(x - 5)$ ⇒ $x + 2y - 5 = 0$. Solving gives $(1,1)$"
        },
        {
          "question": "The equation of a circle center $(-3,4)$, radius $5$ is:",
          "options": [
            "$(x+3)^2 + (y-4)^2 = 25$",
            "$(x-3)^2 + (y+4)^2 = 25$",
            "$(x+3)^2 + (y-4)^2 = 5$",
            "$(x-3)^2 + (y+4)^2 = 5$"
          ],
          "answer": 0,
          "explanation": "Using circle equation: $(x - a)^2 + (y - b)^2 = r^2$ with center $(-3,4)$, radius 5 gives $(x + 3)^2 + (y - 4)^2 = 25$"
        },
        {
          "question": "The intersection of $x - 2y + 6 = 0$ and $y^2 = 6x$ yields point:",
          "options": [
            "$(6, 6)$",
            "$(2, 4)$",
            "$(4, 5)$",
            "$(1, 3.5)$"
          ],
          "answer": 0,
          "explanation": "From $x - 2y + 6 = 0$, $x = 2y - 6$. Substitute into $y^2 = 6x$: $y^2 = 6(2y - 6) = 12y - 36$ ⇒ $y^2 - 12y + 36 = 0$ ⇒ $(y - 6)^2 = 0$ ⇒ $y = 6$, $x = 2(6) - 6 = 6$. So point is $(6,6)$"
        },
        {
          "question": "Eccentricity of ellipse $2x^2 + 3y^2 = 1$ is:",
          "options": [
            "$\\frac{1}{\\sqrt{3}}$",
            "$\\frac{1}{\\sqrt{2}}$",
            "$\\sqrt{\\frac{2}{3}}$",
            "$\\frac{1}{2}$"
          ],
          "answer": 0,
          "explanation": "Rewrite as $\\frac{x^2}{1/2} + \\frac{y^2}{1/3} = 1$, so $a^2 = \\frac{1}{2}$, $b^2 = \\frac{1}{3}$. Using $b^2 = a^2(1 - e^2)$: $\\frac{1}{3} = \\frac{1}{2}(1 - e^2)$ ⇒ $1 - e^2 = \\frac{2}{3}$ ⇒ $e^2 = \\frac{1}{3}$ ⇒ $e = \\frac{1}{\\sqrt{3}}$"
        },
        {
          "question": "For hyperbola $\\frac{x^2}{9} - \\frac{y^2}{16} = 1$, asymptotes are:",
          "options": [
            "$y = \\pm \\frac{4}{3}x$",
            "$y = \\pm \\frac{3}{4}x$",
            "$y = \\pm \\frac{5}{3}x$",
            "$y = \\pm 2x$"
          ],
          "answer": 0,
          "explanation": "For hyperbola $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, asymptotes are $y = \\pm \\frac{b}{a}x$. Here $a = 3$, $b = 4$, so asymptotes: $y = \\pm \\frac{4}{3}x$"
        },
        {
          "question": "Points of intersection of $2y - x - 5 = 0$ and $x^2 + y^2 - 4x + 8y + 10 = 0$ are:",
          "options": [
            "$(1,3)$ and $(3,4)$",
            "$(3,4)$ and $(5,5)$",
            "$(1,3)$ and $(5,5)$",
            "No intersection"
          ],
          "answer": 3,
          "explanation": "From $2y - x - 5 = 0$, $x = 2y - 5$. Substitute into circle: $(2y - 5)^2 + y^2 - 4(2y - 5) + 8y + 10 = 0$ ⇒ $4y^2 - 20y + 25 + y^2 - 8y + 20 + 8y + 10 = 0$ ⇒ $5y^2 - 20y + 55 = 0$ ⇒ $y^2 - 4y + 11 = 0$. Discriminant $16 - 44 = -28 < 0$, so no real intersection"
        },
        {
          "question": "Tangent to $y^2 = 4ax$ parallel to $y + 2x = 0$ has slope:",
          "options": [
            "$2$",
            "$-2$",
            "$\\frac{1}{2}$",
            "$-\\frac{1}{2}$"
          ],
          "answer": 1,
          "explanation": "Line $y + 2x = 0$ has slope $-2$. For parallel lines, slopes are equal, so tangent slope is $-2$"
        },
        {
          "question": "If $\\vec{a} = 3\\vec{i} - \\vec{j} - 4\\vec{k}$, $\\vec{b} = -2\\vec{i} + 4\\vec{j} - 3\\vec{k}$, $\\vec{c} = \\vec{i} + 2\\vec{j} - \\vec{k}$, then $2\\vec{a} - 2\\vec{b} + 3\\vec{c}$ is:",
          "options": [
            "$11\\vec{i} - 8\\vec{j} - 9\\vec{k}$",
            "$5\\vec{i} - 6\\vec{j} - 5\\vec{k}$",
            "$13\\vec{i} - 6\\vec{j} - 11\\vec{k}$",
            "$7\\vec{i} - 4\\vec{j} - 7\\vec{k}$"
          ],
          "answer": 2,
          "explanation": "$2\\vec{a} = 6\\vec{i} - 2\\vec{j} - 8\\vec{k}$, $-2\\vec{b} = 4\\vec{i} - 8\\vec{j} + 6\\vec{k}$, $3\\vec{c} = 3\\vec{i} + 6\\vec{j} - 3\\vec{k}$. Sum: $(6+4+3)\\vec{i} + (-2-8+6)\\vec{j} + (-8+6-3)\\vec{k} = 13\\vec{i} - 4\\vec{j} - 5\\vec{k}$"
        },
        {
          "question": "Unit vector perpendicular to $\\vec{a}$ and $\\vec{c}$ in Q15 is:",
          "options": [
            "$\\frac{9\\vec{i} + 5\\vec{j} + 7\\vec{k}}{\\sqrt{155}}$",
            "$\\frac{9\\vec{i} - 5\\vec{j} + 7\\vec{k}}{\\sqrt{155}}$",
            "$\\frac{9\\vec{i} + 5\\vec{j} - 7\\vec{k}}{\\sqrt{155}}$",
            "$\\frac{-9\\vec{i} + 5\\vec{j} + 7\\vec{k}}{\\sqrt{155}}$"
          ],
          "answer": 0,
          "explanation": "$\\vec{a} \\times \\vec{c} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ 3 & -1 & -4 \\\\ 1 & 2 & -1 \\end{vmatrix} = \\vec{i}(1+8) - \\vec{j}(-3+4) + \\vec{k}(6+1) = 9\\vec{i} - \\vec{j} + 7\\vec{k}$. Magnitude $\\sqrt{81+1+49} = \\sqrt{131}$. Unit vector: $\\frac{9\\vec{i} - \\vec{j} + 7\\vec{k}}{\\sqrt{131}}$"
        },
        {
          "question": "Direction cosines of $\\vec{a} = 3\\vec{i} - 6\\vec{j} + 2\\vec{k}$ are proportional to:",
          "options": [
            "$3, -6, 2$",
            "$1, -2, \\frac{2}{3}$",
            "$\\frac{3}{7}, -\\frac{6}{7}, \\frac{2}{7}$",
            "$1, -2, 1$"
          ],
          "answer": 2,
          "explanation": "Magnitude $|\\vec{a}| = \\sqrt{9 + 36 + 4} = \\sqrt{49} = 7$. Direction cosines: $\\frac{3}{7}, -\\frac{6}{7}, \\frac{2}{7}$"
        },
        {
          "question": "Equation of plane through $A(1,5,3)$ perpendicular to $2\\vec{i} + 3\\vec{j} + 6\\vec{k}$:",
          "options": [
            "$2x + 3y + 6z = 35$",
            "$2x + 3y + 6z = 30$",
            "$x + y + z = 9$",
            "$2x + 3y + 6z = 40$"
          ],
          "answer": 0,
          "explanation": "Using $(\\vec{r} - \\vec{a}) \\cdot \\vec{n} = 0$: $2(x-1) + 3(y-5) + 6(z-3) = 0$ ⇒ $2x - 2 + 3y - 15 + 6z - 18 = 0$ ⇒ $2x + 3y + 6z = 35$"
        },
        {
          "question": "$\\vec{a} \\cdot (\\vec{b} \\times \\vec{c})$ for $\\vec{a} = \\vec{i} - 2\\vec{j} + 2\\vec{k}$, $\\vec{b} = 3\\vec{i} - \\vec{j} + 2\\vec{k}$, $\\vec{c} = 2\\vec{i} + \\vec{j} - \\vec{k}$ is:",
          "options": [
            "$15$",
            "$-15$",
            "$10$",
            "$-10$"
          ],
          "answer": 1,
          "explanation": "Scalar triple product $\\begin{vmatrix} 1 & -2 & 2 \\\\ 3 & -1 & 2 \\\\ 2 & 1 & -1 \\end{vmatrix} = 1(1-2) - (-2)(-3-4) + 2(3+2) = 1(-1) + 2(-7) + 2(5) = -1 -14 + 10 = -5$"
        },
        {
          "question": "Volume of parallelepiped with $\\vec{a} = 3\\vec{i} - \\vec{j} + 2\\vec{k}$, $\\vec{b} = 2\\vec{i} - 3\\vec{j} + 4\\vec{k}$, $\\vec{c} = \\vec{i} + 2\\vec{j} - \\vec{k}$ is:",
          "options": [
            "$7$",
            "$8$",
            "$9$",
            "$10$"
          ],
          "answer": 0,
          "explanation": "Volume = $|\\vec{a} \\cdot (\\vec{b} \\times \\vec{c})| = |\\begin{vmatrix} 3 & -1 & 2 \\\\ 2 & -3 & 4 \\\\ 1 & 2 & -1 \\end{vmatrix}| = |3(3-8) - (-1)(-2-4) + 2(4+3)| = |3(-5) + 1(-6) + 2(7)| = |-15 -6 + 14| = |-7| = 7$"
        },
        {
          "question": "A $2N$ force acts on $1.2kg$ mass at rest. Velocity after $6s$ is:",
          "options": [
            "$10 m/s$",
            "$12 m/s$",
            "$6 m/s$",
            "$8 m/s$"
          ],
          "answer": 0,
          "explanation": "$F = ma$ ⇒ $a = \\frac{F}{m} = \\frac{2}{1.2} = \\frac{5}{3} m/s^2$. $v = u + at = 0 + \\frac{5}{3} \\times 6 = 10 m/s$"
        },
        {
          "question": "A $10N$ mass dragged by $25N$ horizontal against $5N$ friction has acceleration $(g=10)$:",
          "options": [
            "$2 m/s^2$",
            "$1 m/s^2$",
            "$1.5 m/s^2$",
            "$2.5 m/s^2$"
          ],
          "answer": 0,
          "explanation": "Mass $m = \\frac{W}{g} = \\frac{10}{10} = 1kg$. Net force $F_{net} = 25 - 5 = 20N$. $a = \\frac{F_{net}}{m} = \\frac{20}{1} = 20 m/s^2$"
        },
        {
          "question": "SHM: speed $1 m/s$ at center, period $\\pi s$. Speed $0.25m$ from center is:",
          "options": [
            "$0.866 m/s$",
            "$0.5 m/s$",
            "$0.75 m/s$",
            "$0.25 m/s$"
          ],
          "answer": 0,
          "explanation": "$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{\\pi} = 2 rad/s$. At center, $v_{max} = A\\omega = 1$ ⇒ $A = 0.5m$. Speed at distance $x$: $v = \\omega\\sqrt{A^2 - x^2} = 2\\sqrt{0.25^2 - 0.25^2} = 2\\sqrt{0.0625 - 0.0625} = 0$"
        },
        {
          "question": "A $30g$ bullet at $294 m/s$ stops in $\\frac{1}{150} s$. Average resistance force is:",
          "options": [
            "$1323 N$",
            "$1000 N$",
            "$1500 N$",
            "$1200 N$"
          ],
          "answer": 0,
          "explanation": "$a = \\frac{v - u}{t} = \\frac{0 - 294}{1/150} = -44100 m/s^2$. $F = ma = 0.03 \\times 44100 = 1323 N$"
        },
        {
          "question": "Three forces in equilibrium: two at right angles, one double the other, third is $10N$. The smaller force is:",
          "options": [
            "$2\\sqrt{5} N$",
            "$\\sqrt{5} N$",
            "$\\frac{10}{\\sqrt{5}} N$",
            "$\\frac{5}{\\sqrt{2}} N$"
          ],
          "answer": 0,
          "explanation": "Let forces be $P$, $2P$, and $10N$. Resultant of $P$ and $2P$: $\\sqrt{P^2 + (2P)^2} = P\\sqrt{5}$. For equilibrium, this equals $10N$: $P\\sqrt{5} = 10$ ⇒ $P = \\frac{10}{\\sqrt{5}} = 2\\sqrt{5} N$"
        }
      ]
    },
    {
      "id": "QS002",
      "questions": [
        {
          "question": "The foot of the perpendicular from $(2, -1)$ to the line $3x - 4y + 5 = 0$ is:",
          "options": [
            "$(1, 2)$",
            "$(-1, 0.5)$",
            "$(0.2, 1.4)$",
            "$(1.4, 2.3)$"
          ],
          "answer": 1,
          "explanation": "Slope of line is $\\frac{3}{4}$, so perpendicular slope is $-\\frac{4}{3}$. Equation through $(2,-1)$: $y + 1 = -\\frac{4}{3}(x - 2)$. Solve with $3x - 4y + 5 = 0$: From perpendicular: $3y + 3 = -4x + 8$ ⇒ $4x + 3y - 5 = 0$. Solve system: $3x - 4y = -5$ and $4x + 3y = 5$. Multiply first by 3, second by 4: $9x - 12y = -15$, $16x + 12y = 20$. Add: $25x = 5$ ⇒ $x = 0.2$, $y = 1.4$"
        },
        {
          "question": "The vertices of the triangle formed by $y = 1$, $x + y = 6$, and $y - 3x + 2 = 0$ are:",
          "options": [
            "$(1,1), (5,1), (2,4)$",
            "$(0,1), (5,1), (1,4)$",
            "$(1,1), (4,2), (2,4)$",
            "$(1,1), (6,0), (2,4)$"
          ],
          "answer": 0,
          "explanation": "Solve pairs: $y=1$ and $x+y=6$: $x+1=6$ ⇒ $x=5$ ⇒ $(5,1)$. $y=1$ and $y-3x+2=0$: $1-3x+2=0$ ⇒ $3x=3$ ⇒ $x=1$ ⇒ $(1,1)$. $x+y=6$ and $y-3x+2=0$: From first $y=6-x$, substitute: $(6-x)-3x+2=0$ ⇒ $8-4x=0$ ⇒ $x=2$, $y=4$ ⇒ $(2,4)$"
        },
        {
          "question": "The equation of the line through $(-1,2)$ parallel to $3x + 2y = 4$ is:",
          "options": [
            "$3x + 2y - 1 = 0$",
            "$3x + 2y + 1 = 0$",
            "$2x + 3y - 4 = 0$",
            "$3x - 2y + 7 = 0$"
          ],
          "answer": 0,
          "explanation": "Slope of given line: $2y = -3x + 4$ ⇒ $y = -\\frac{3}{2}x + 2$, so slope $=-\\frac{3}{2}$. Parallel line has same slope. Through $(-1,2)$: $y - 2 = -\\frac{3}{2}(x + 1)$ ⇒ $2y - 4 = -3x - 3$ ⇒ $3x + 2y - 1 = 0$"
        },
        {
          "question": "The diagonals of a rhombus meet at $(-1,5)$ and one is parallel to $5y = 2x$. The equation of that diagonal is:",
          "options": [
            "$5y = 2x + 27$",
            "$5y = 2x + 7$",
            "$5y = 2x + 12$",
            "$5y = 2x + 10$"
          ],
          "answer": 1,
          "explanation": "Line $5y = 2x$ has slope $\\frac{2}{5}$. Through $(-1,5)$: $y - 5 = \\frac{2}{5}(x + 1)$ ⇒ $5y - 25 = 2x + 2$ ⇒ $5y = 2x + 27$"
        },
        {
          "question": "If $A(\\alpha,1)$, $B(3,-1)$, $C(10,-2)$ is right-angled at $A$, possible $\\alpha$ values are:",
          "options": [
            "$2$ or $4$",
            "$1$ or $2$",
            "$3$ or $4$",
            "$0$ or $5$"
          ],
          "answer": 0,
          "explanation": "Vectors: $\\vec{AB} = (3-\\alpha, -2)$, $\\vec{AC} = (10-\\alpha, -3)$. Right angle at A means $\\vec{AB} \\cdot \\vec{AC} = 0$: $(3-\\alpha)(10-\\alpha) + (-2)(-3) = 0$ ⇒ $(3-\\alpha)(10-\\alpha) + 6 = 0$ ⇒ $30 - 13\\alpha + \\alpha^2 + 6 = 0$ ⇒ $\\alpha^2 - 13\\alpha + 36 = 0$ ⇒ $(\\alpha-4)(\\alpha-9) = 0$ ⇒ $\\alpha = 4$ or $9$"
        },
        {
          "question": "The line $2x + y = 8$ divides the join of $A(1,3)$ and $B(6,-2)$ in the ratio:",
          "options": [
            "$2:3$",
            "$3:2$",
            "$1:4$",
            "$4:1$"
          ],
          "answer": 0,
          "explanation": "Parametric form: $x = \\frac{6m + n}{m+n}$, $y = \\frac{-2m + 3n}{m+n}$. On line: $2x + y = 8$ ⇒ $\\frac{12m + 2n}{m+n} + \\frac{-2m + 3n}{m+n} = 8$ ⇒ $\\frac{10m + 5n}{m+n} = 8$ ⇒ $10m + 5n = 8m + 8n$ ⇒ $2m = 3n$ ⇒ $m:n = 3:2$"
        },
        {
          "question": "The equation of the circle with $(8,-2)$ and $(-4,3)$ as diameter endpoints is:",
          "options": [
            "$x^2 + y^2 - 4x - y - 38 = 0$",
            "$x^2 + y^2 - 4x - y - 28 = 0$",
            "$x^2 + y^2 + 4x + y - 28 = 0$",
            "$x^2 + y^2 - 4x + y - 38 = 0$"
          ],
          "answer": 1,
          "explanation": "Center = midpoint = $(2,0.5)$, radius = $\\frac{1}{2}\\sqrt{(8+4)^2 + (-2-3)^2} = \\frac{1}{2}\\sqrt{144 + 25} = \\frac{\\sqrt{169}}{2} = 6.5$. Equation: $(x-2)^2 + (y-0.5)^2 = 42.25$ ⇒ $x^2 - 4x + 4 + y^2 - y + 0.25 = 42.25$ ⇒ $x^2 + y^2 - 4x - y - 38 = 0$"
        },
        {
          "question": "The tangent to the parabola $y^2 = 4ax$ at $(as^2, 2as)$ has equation:",
          "options": [
            "$sy = x + as^2$",
            "$y = sx + as^2$",
            "$y = sx - as^2$",
            "$sy = x - as^2$"
          ],
          "answer": 0,
          "explanation": "Using tangent equation: $yy_1 = 2a(x + x_1)$ with $(x_1,y_1) = (as^2, 2as)$: $y(2as) = 2a(x + as^2)$ ⇒ $2asy = 2ax + 2a^2s^2$ ⇒ $sy = x + as^2$"
        },
        {
          "question": "The normal to $y^2 = 4ax$ at $(as^2, 2as)$ meets the x-axis at:",
          "options": [
            "$(2a + as^2, 0)$",
            "$(-as^2, 0)$",
            "$(a + as^2, 0)$",
            "$(a s^2 + 2a, 0)$"
          ],
          "answer": 0,
          "explanation": "Slope of tangent = $\\frac{2a}{y_1} = \\frac{2a}{2as} = \\frac{1}{s}$, so normal slope = $-s$. Equation: $y - 2as = -s(x - as^2)$. At x-axis, $y=0$: $-2as = -s(x - as^2)$ ⇒ $2a = x - as^2$ ⇒ $x = 2a + as^2$"
        },
        {
          "question": "The intersection of tangents at $(at^2, 2at)$ and $(as^2, 2as)$ to $y^2 = 4ax$ is:",
          "options": [
            "$(a t s, a(t + s))$",
            "$( -a t s, a(t + s))$",
            "$(a t s, -a(t + s))$",
            "$( -a t s, -a(t + s))$"
          ],
          "answer": 0,
          "explanation": "Tangents: $ty = x + at^2$ and $sy = x + as^2$. Subtract: $(t-s)y = a(t^2 - s^2)$ ⇒ $y = a(t+s)$. Substitute: $t[a(t+s)] = x + at^2$ ⇒ $x = at(t+s) - at^2 = ats$"
        },
        {
          "question": "The chord joining $(at^2, 2at)$ and $(as^2, 2as)$ on $y^2 = 4ax$ has equation:",
          "options": [
            "$y(t + s) = 2x + 2a t s$",
            "$y(t + s) = 2x - 2a t s$",
            "$y(t + s) = x + 2a t s$",
            "$y(t + s) = x - 2a t s$"
          ],
          "answer": 0,
          "explanation": "Slope = $\\frac{2as - 2at}{as^2 - at^2} = \\frac{2a(s-t)}{a(s-t)(s+t)} = \\frac{2}{s+t}$. Equation: $y - 2at = \\frac{2}{s+t}(x - at^2)$ ⇒ $(s+t)(y - 2at) = 2(x - at^2)$ ⇒ $(s+t)y - 2at(s+t) = 2x - 2at^2$ ⇒ $(s+t)y = 2x + 2ats$"
        },
        {
          "question": "The tangent to ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at $(a \\cos \\theta, b \\sin \\theta)$ is:",
          "options": [
            "$\\frac{x \\cos \\theta}{a} + \\frac{y \\sin \\theta}{b} = 1$",
            "$\\frac{x \\sin \\theta}{a} + \\frac{y \\cos \\theta}{b} = 1$",
            "$a x \\cos \\theta + b y \\sin \\theta = 1$",
            "$a x \\sin \\theta + b y \\cos \\theta = 1$"
          ],
          "answer": 0,
          "explanation": "Using tangent equation: $\\frac{xx_1}{a^2} + \\frac{yy_1}{b^2} = 1$ with $(x_1,y_1) = (a\\cos\\theta, b\\sin\\theta)$: $\\frac{x(a\\cos\\theta)}{a^2} + \\frac{y(b\\sin\\theta)}{b^2} = 1$ ⇒ $\\frac{x\\cos\\theta}{a} + \\frac{y\\sin\\theta}{b} = 1$"
        },
        {
          "question": "The normal to that ellipse at the same point is:",
          "options": [
            "$\\frac{a x}{\\cos \\theta} - \\frac{b y}{\\sin \\theta} = a^2 - b^2$",
            "$\\frac{a x}{\\cos \\theta} + \\frac{b y}{\\sin \\theta} = a^2 - b^2$",
            "$\\frac{a x}{\\sin \\theta} - \\frac{b y}{\\cos \\theta} = a^2 - b^2$",
            "$\\frac{a x}{\\cos \\theta} - \\frac{b y}{\\sin \\theta} = a^2 + b^2$"
          ],
          "answer": 0,
          "explanation": "Slope of tangent = $-\\frac{b^2 x_1}{a^2 y_1} = -\\frac{b^2 a\\cos\\theta}{a^2 b\\sin\\theta} = -\\frac{b\\cos\\theta}{a\\sin\\theta}$, so normal slope = $\\frac{a\\sin\\theta}{b\\cos\\theta}$. Equation: $y - b\\sin\\theta = \\frac{a\\sin\\theta}{b\\cos\\theta}(x - a\\cos\\theta)$ ⇒ $\\frac{y - b\\sin\\theta}{\\sin\\theta} = \\frac{a}{b\\cos\\theta}(x - a\\cos\\theta)$ ⇒ $\\frac{y}{\\sin\\theta} - b = \\frac{a x}{b\\cos\\theta} - \\frac{a^2}{b}$ ⇒ Multiply by b: $\\frac{b y}{\\sin\\theta} - b^2 = \\frac{a x}{\\cos\\theta} - a^2$ ⇒ $\\frac{a x}{\\cos\\theta} - \\frac{b y}{\\sin\\theta} = a^2 - b^2$"
        },
        {
          "question": "The line $y + 2x - 3 = 0$ touches the ellipse $4x^2 + y^2 = 5$ at:",
          "options": [
            "$(1,1)$ only",
            "$(0.5, 2)$ only",
            "$(1,1)$ and $(0.5, 2)$",
            "$(0.5, 1)$"
          ],
          "answer": 0,
          "explanation": "Substitute $y = 3 - 2x$ into ellipse: $4x^2 + (3-2x)^2 = 5$ ⇒ $4x^2 + 9 - 12x + 4x^2 = 5$ ⇒ $8x^2 - 12x + 4 = 0$ ⇒ $2x^2 - 3x + 1 = 0$ ⇒ $(2x-1)(x-1) = 0$ ⇒ $x = 0.5$ or $1$. Points: $(0.5,2)$ and $(1,1)$. Check which gives tangent: For tangent, discriminant should be zero, but here we have two points, so line is chord, not tangent"
        },
        {
          "question": "The hyperbola $9x^2 - 9y^2 = 16$ has asymptotes:",
          "options": [
            "$y = \\pm x$",
            "$y = \\pm 3x$",
            "$y = \\pm \\frac{1}{3}x$",
            "$y = \\pm 2x$"
          ],
          "answer": 0,
          "explanation": "Divide by 16: $\\frac{x^2}{16/9} - \\frac{y^2}{16/9} = 1$, so $a^2 = b^2 = \\frac{16}{9}$, $a = b = \\frac{4}{3}$. Asymptotes: $y = \\pm \\frac{b}{a}x = \\pm x$"
        },
        {
          "question": "The circle through $(0,2)$, $(0,-2)$ touching $x + y + 6 = 0$ has center:",
          "options": [
            "$(0,0)$",
            "$(4,0)$",
            "$(-4,0)$",
            "$(0,-4)$"
          ],
          "answer": 2,
          "explanation": "Center lies on y-axis (due to symmetry), so center = $(0,k)$. Distance to $(0,2)$ equals distance to line: $\\sqrt{(0-0)^2 + (k-2)^2} = \\frac{|0 + k + 6|}{\\sqrt{2}}$ ⇒ $|k-2| = \\frac{|k+6|}{\\sqrt{2}}$. Square: $(k-2)^2 = \\frac{(k+6)^2}{2}$ ⇒ $2(k^2 - 4k + 4) = k^2 + 12k + 36$ ⇒ $2k^2 - 8k + 8 = k^2 + 12k + 36$ ⇒ $k^2 - 20k - 28 = 0$"
        },
        {
          "question": "If $\\vec{a} = 2q \\vec{i} + q \\vec{j} - 4\\vec{k}$ and $\\vec{b} = q \\vec{i} - 2\\vec{j} + \\vec{k}$ are perpendicular, then $q =$:",
          "options": [
            "$2$",
            "$-2$",
            "$3$",
            "$0$"
          ],
          "answer": 0,
          "explanation": "$\\vec{a} \\cdot \\vec{b} = (2q)(q) + (q)(-2) + (-4)(1) = 2q^2 - 2q - 4 = 0$ ⇒ $q^2 - q - 2 = 0$ ⇒ $(q-2)(q+1) = 0$ ⇒ $q = 2$ or $-1$"
        },
        {
          "question": "The cosine of the angle between $\\vec{a} = 4\\vec{i} - 3\\vec{j} + \\vec{k}$ and $\\vec{b} = 3\\vec{i} + 2\\vec{j} - 6\\vec{k}$ is:",
          "options": [
            "$0$",
            "$\\frac{1}{\\sqrt{2}}$",
            "$\\frac{1}{2}$",
            "$-\\frac{1}{2}$"
          ],
          "answer": 0,
          "explanation": "$\\vec{a} \\cdot \\vec{b} = 4(3) + (-3)(2) + 1(-6) = 12 - 6 - 6 = 0$, so $\\cos\\theta = 0$"
        },
        {
          "question": "The area of the triangle with vertices $4\\vec{i} - 3\\vec{j} + \\vec{k}$, $3\\vec{i} - \\vec{j} + 2\\vec{k}$, and $\\vec{i} - \\vec{j} - 3\\vec{k}$ is:",
          "options": [
            "$\\frac{1}{2} \\sqrt{261}$",
            "$\\frac{1}{2} \\sqrt{260}$",
            "$\\frac{1}{2} \\sqrt{259}$",
            "$\\sqrt{65}$"
          ],
          "answer": 0,
          "explanation": "Vectors: $\\vec{AB} = -\\vec{i} + 2\\vec{j} + \\vec{k}$, $\\vec{AC} = -3\\vec{i} + 2\\vec{j} - 4\\vec{k}$. Cross product: $\\vec{AB} \\times \\vec{AC} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ -1 & 2 & 1 \\\\ -3 & 2 & -4 \\end{vmatrix} = \\vec{i}(-8-2) - \\vec{j}(4+3) + \\vec{k}(-2+6) = -10\\vec{i} - 7\\vec{j} + 4\\vec{k}$. Area = $\\frac{1}{2}|\\vec{AB} \\times \\vec{AC}| = \\frac{1}{2}\\sqrt{100 + 49 + 16} = \\frac{1}{2}\\sqrt{165}$"
        },
        {
          "question": "The perpendicular distance from $4\\vec{i} - 2\\vec{j} + 3\\vec{k}$ to the line through $2\\vec{i} + 3\\vec{j} - 4\\vec{k}$ and $8\\vec{i} + 6\\vec{j} - 8\\vec{k}$ is:",
          "options": [
            "$5$",
            "$4$",
            "$6$",
            "$7$"
          ],
          "answer": 0,
          "explanation": "Direction vector $\\vec{d} = (8-2)\\vec{i} + (6-3)\\vec{j} + (-8+4)\\vec{k} = 6\\vec{i} + 3\\vec{j} - 4\\vec{k}$. Vector from point to line: $\\vec{PQ} = (2-4)\\vec{i} + (3+2)\\vec{j} + (-4-3)\\vec{k} = -2\\vec{i} + 5\\vec{j} - 7\\vec{k}$. Distance = $\\frac{|\\vec{PQ} \\times \\vec{d}|}{|\\vec{d}|}$. $\\vec{PQ} \\times \\vec{d} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ -2 & 5 & -7 \\\\ 6 & 3 & -4 \\end{vmatrix} = \\vec{i}(-20+21) - \\vec{j}(8+42) + \\vec{k}(-6-30) = \\vec{i} - 50\\vec{j} - 36\\vec{k}$. Magnitude = $\\sqrt{1 + 2500 + 1296} = \\sqrt{3797}$. $|\\vec{d}| = \\sqrt{36 + 9 + 16} = \\sqrt{61}$. Distance = $\\frac{\\sqrt{3797}}{\\sqrt{61}} = \\sqrt{62.25} \\approx 7.89$"
        },
        {
          "question": "A $2.5kg$ mass moving at $12 m/s$ hits a $10N$ resistance. Time to stop is:",
          "options": [
            "$3 s$",
            "$2 s$",
            "$4 s$",
            "$5 s$"
          ],
          "answer": 0,
          "explanation": "$a = \\frac{F}{m} = \\frac{-10}{2.5} = -4 m/s^2$. $t = \\frac{v - u}{a} = \\frac{0 - 12}{-4} = 3 s$"
        },
        {
          "question": "A $0.6N$ horizontal force acts on $0.3kg$ mass against $0.15N$ resistance. Acceleration is:",
          "options": [
            "$1.5 m/s^2$",
            "$2 m/s^2$",
            "$0.5 m/s^2$",
            "$3 m/s^2$"
          ],
          "answer": 0,
          "explanation": "Net force = $0.6 - 0.15 = 0.45N$. $a = \\frac{F}{m} = \\frac{0.45}{0.3} = 1.5 m/s^2$"
        },
        {
          "question": "SHM: period $3.14 s$, velocity $0.16 m/s$ at $0.06 m$ from center. Amplitude is:",
          "options": [
            "$0.1 m$",
            "$0.08 m$",
            "$0.12 m$",
            "$0.06 m$"
          ],
          "answer": 0,
          "explanation": "$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{3.14} \\approx 2 rad/s$. Using $v = \\omega\\sqrt{A^2 - x^2}$: $0.16 = 2\\sqrt{A^2 - 0.06^2}$ ⇒ $0.08 = \\sqrt{A^2 - 0.0036}$ ⇒ $A^2 - 0.0036 = 0.0064$ ⇒ $A^2 = 0.01$ ⇒ $A = 0.1 m$"
        },
        {
          "question": "A seconds pendulum loses $20$ beats per day at a mountain top. Change in $g$ is approximately:",
          "options": [
            "$g$ decreases by $0.0023g$",
            "$g$ increases by $0.0023g$",
            "$g$ decreases by $0.0046g$",
            "$g$ increases by $0.0046g$"
          ],
          "answer": 0,
          "explanation": "$T = 2\\pi\\sqrt{\\frac{l}{g}}$ ⇒ $\\frac{\\delta T}{T} = -\\frac{1}{2}\\frac{\\delta g}{g}$. Losing 20 beats/day means period increases: $\\frac{\\delta T}{T} = \\frac{20}{86400} \\approx 0.000231$. So $\\frac{\\delta g}{g} = -2\\frac{\\delta T}{T} \\approx -0.000462$, i.e., g decreases by about $0.046\\%$"
        },
        {
          "question": "A $4.5kg$ truck pulled by $10N$ at $60^\\circ$ and $20N$ at $20^\\circ$ to floor. Horizontal acceleration (no friction) is:",
          "options": [
            "$4.52 m/s^2$",
            "$3.25 m/s^2$",
            "$5.12 m/s^2$",
            "$2.89 m/s^2$"
          ],
          "answer": 0,
          "explanation": "Horizontal components: $10\\cos60^\\circ = 5N$, $20\\cos20^\\circ \\approx 18.79N$. Total horizontal force ≈ $23.79N$. $a = \\frac{F}{m} = \\frac{23.79}{4.5} \\approx 5.29 m/s^2$"
        }
      ]
    },
    {
      "id": "QS003",
      "questions": [
        {
          "question": "The lines $2x - 3y - 1 = 0$, $2x - 3y + 5 = 0$, $5x + 6y = 0$, $5x + 6y + 2 = 0$ form a parallelogram of area:",
          "options": [
            "$\\frac{6}{13}$ sq units",
            "$\\frac{8}{13}$ sq units",
            "$\\frac{10}{13}$ sq units",
            "$\\frac{12}{13}$ sq units"
          ],
          "answer": 1,
          "explanation": "Distance between parallel lines $2x-3y-1=0$ and $2x-3y+5=0$ is $\\frac{|5-(-1)|}{\\sqrt{4+9}} = \\frac{6}{\\sqrt{13}}$. Distance between $5x+6y=0$ and $5x+6y+2=0$ is $\\frac{2}{\\sqrt{25+36}} = \\frac{2}{\\sqrt{61}}$. Area = product of distances between parallel sides = $\\frac{6}{\\sqrt{13}} \\times \\frac{2}{\\sqrt{61}} = \\frac{12}{\\sqrt{793}}$"
        },
        {
          "question": "The equations of the diagonals of the parallelogram in Q1 are:",
          "options": [
            "$11x + 3y + 1 = 0$ and $x - 9y - 3 = 0$",
            "$11x + 3y + 2 = 0$ and $x - 9y - 2 = 0$",
            "$11x + 3y + 3 = 0$ and $x - 9y - 1 = 0$",
            "$11x + 3y + 4 = 0$ and $x - 9y - 4 = 0$"
          ],
          "answer": 0,
          "explanation": "Find intersection points of non-parallel sides and join them to get diagonals. Solve $2x-3y-1=0$ with $5x+6y=0$ and $2x-3y+5=0$ with $5x+6y+2=0$ for one diagonal, etc."
        },
        {
          "question": "The circumradius of triangle with vertices $(-3,5)$, $(4,-2)$, $(6,2)$ is:",
          "options": [
            "$5$",
            "$\\frac{5\\sqrt{2}}{2}$",
            "$\\frac{5\\sqrt{3}}{2}$",
            "$5\\sqrt{2}$"
          ],
          "answer": 0,
          "explanation": "Circumcenter found in QS001 Q8 as $(1,1)$. Distance to any vertex, say $(-3,5)$: $\\sqrt{(1+3)^2 + (1-5)^2} = \\sqrt{16 + 16} = \\sqrt{32} = 4\\sqrt{2}$"
        },
        {
          "question": "For triangle ABC with $A(3,1)$, $B(8,2)$, $C(-1,11)$, the foot of perpendicular from A to BC (point N) has coordinates:",
          "options": [
            "$(4,5)$",
            "$(3,4)$",
            "$(5,6)$",
            "$(2,3)$"
          ],
          "answer": 0,
          "explanation": "Line BC: through B(8,2) and C(-1,11), slope = $\\frac{11-2}{-1-8} = \\frac{9}{-9} = -1$, equation: $y-2 = -1(x-8)$ ⇒ $x+y-10=0$. Foot from A(3,1): formula gives $N = \\left(\\frac{x_1 - a(ax_1+by_1+c)}{a^2+b^2}, \\frac{y_1 - b(ax_1+by_1+c)}{a^2+b^2}\\right) = \\left(\\frac{3-1(3+1-10)}{2}, \\frac{1-1(3+1-10)}{2}\\right) = (4,5)$"
        },
        {
          "question": "Length AN in Q4 is:",
          "options": [
            "$\\sqrt{13}$",
            "$\\sqrt{26}$",
            "$\\sqrt{20}$",
            "$\\sqrt{18}$"
          ],
          "answer": 0,
          "explanation": "Distance A(3,1) to N(4,5): $\\sqrt{(4-3)^2 + (5-1)^2} = \\sqrt{1 + 16} = \\sqrt{17}$"
        },
        {
          "question": "For triangle with vertices $A(-3,-4)$, $B(2,1)$, $C(5,-3)$, $\\sin B$ equals:",
          "options": [
            "$\\frac{3}{5}$",
            "$\\frac{4}{5}$",
            "$\\frac{1}{\\sqrt{2}}$",
            "$\\frac{7}{25}$"
          ],
          "answer": 1,
          "explanation": "Vectors: $\\vec{BA} = (-5,-5)$, $\\vec{BC} = (3,-4)$. $|\\vec{BA}| = \\sqrt{50}$, $|\\vec{BC}| = 5$, dot product = $-15+20=5$. $\\cos B = \\frac{5}{\\sqrt{50}\\cdot 5} = \\frac{1}{\\sqrt{50}}$, $\\sin B = \\sqrt{1 - \\frac{1}{50}} = \\sqrt{\\frac{49}{50}} = \\frac{7}{5\\sqrt{2}}$"
        },
        {
          "question": "Area of triangle in Q6 is:",
          "options": [
            "$17.5$ sq units",
            "$20$ sq units",
            "$22.5$ sq units",
            "$25$ sq units"
          ],
          "answer": 0,
          "explanation": "Using coordinates: $\\frac{1}{2}|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)| = \\frac{1}{2}|(-3)(1+3) + 2(-3+4) + 5(-4-1)| = \\frac{1}{2}|(-3)(4) + 2(1) + 5(-5)| = \\frac{1}{2}|-12 + 2 - 25| = \\frac{35}{2} = 17.5$"
        },
        {
          "question": "If $(-2, \\alpha)$, $(1, \\beta)$, $(\\alpha, 7)$ are collinear, then $\\beta$ in terms of $\\alpha$ is:",
          "options": [
            "$\\beta = 2\\alpha + 3$",
            "$\\beta = \\alpha + 3$",
            "$\\beta = 3 - \\alpha$",
            "$\\beta = 3\\alpha - 2$"
          ],
          "answer": 0,
          "explanation": "Slope between any two points equal: $\\frac{\\beta - \\alpha}{1 - (-2)} = \\frac{7 - \\beta}{\\alpha - 1}$ ⇒ $\\frac{\\beta - \\alpha}{3} = \\frac{7 - \\beta}{\\alpha - 1}$ ⇒ $(\\beta - \\alpha)(\\alpha - 1) = 3(7 - \\beta)$ ⇒ $\\alpha\\beta - \\beta - \\alpha^2 + \\alpha = 21 - 3\\beta$ ⇒ $\\alpha\\beta + 2\\beta = \\alpha^2 - \\alpha + 21$ ⇒ $\\beta(\\alpha + 2) = \\alpha^2 - \\alpha + 21$ ⇒ $\\beta = \\frac{\\alpha^2 - \\alpha + 21}{\\alpha + 2}$"
        },
        {
          "question": "The circle $x^2 + y^2 - 2x - 4y + 4 = 0$ lies wholly inside $x^2 + y^2 = 15$ because:",
          "options": [
            "distance between centers < difference of radii",
            "distance between centers = difference of radii",
            "sum of radii < distance between centers",
            "they are concentric"
          ],
          "answer": 0,
          "explanation": "First circle: center $(1,2)$, radius $\\sqrt{1+4-4} = 1$. Second circle: center $(0,0)$, radius $\\sqrt{15} \\approx 3.87$. Distance between centers = $\\sqrt{1+4} = \\sqrt{5} \\approx 2.24$. Difference of radii = $3.87 - 1 = 2.87$. Since $2.24 < 2.87$, first circle lies inside second."
        },
        {
          "question": "The line $3x + 4y = 13$ touches the circle $x^2 + y^2 - 2x - 3 = 0$ at point:",
          "options": [
            "$(3,1)$",
            "$(1,3)$",
            "$(2,2)$",
            "$(0,3)$"
          ],
          "answer": 0,
          "explanation": "Circle: $(x-1)^2 + y^2 = 4$, center $(1,0)$, radius 2. Distance from center to line = $\\frac{|3(1)+4(0)-13|}{5} = \\frac{10}{5} = 2$ = radius, so line is tangent. Solve system: from line $y = \\frac{13-3x}{4}$, substitute into circle: $(x-1)^2 + (\\frac{13-3x}{4})^2 = 4$. Multiply by 16: $16(x-1)^2 + (13-3x)^2 = 64$ ⇒ $16(x^2-2x+1) + (169-78x+9x^2) = 64$ ⇒ $25x^2 - 110x + 121 = 0$ ⇒ $(5x-11)^2 = 0$ ⇒ $x = \\frac{11}{5}$, $y = \\frac{13-33/5}{4} = \\frac{32/5}{4} = \\frac{8}{5}$"
        },
        {
          "question": "If $\\vec{a} = 3\\vec{i} + p\\vec{j} + 5\\vec{k}$, $\\vec{b} = 2\\vec{i} - \\vec{j} + \\vec{k}$, $\\vec{c} = \\vec{i} + 2\\vec{j} - 3\\vec{k}$ are coplanar, then $p =$:",
          "options": [
            "$2$",
            "$-2$",
            "$4$",
            "$-4$"
          ],
          "answer": 3,
          "explanation": "Scalar triple product = 0: $\\begin{vmatrix} 3 & p & 5 \\\\ 2 & -1 & 1 \\\\ 1 & 2 & -3 \\end{vmatrix} = 3(3-2) - p(-6-1) + 5(4+1) = 3(1) + 7p + 5(5) = 3 + 7p + 25 = 7p + 28 = 0$ ⇒ $p = -4$"
        },
        {
          "question": "A vector perpendicular to $\\vec{a} = \\vec{i} - 2\\vec{j} + \\vec{k}$ and $\\vec{b} = 2\\vec{i} + \\vec{j} - 3\\vec{k}$ is:",
          "options": [
            "$5\\vec{i} + 5\\vec{j} + 5\\vec{k}$",
            "$5\\vec{i} - 5\\vec{j} + 5\\vec{k}$",
            "$5\\vec{i} + 5\\vec{j} - 5\\vec{k}$",
            "$-5\\vec{i} + 5\\vec{j} + 5\\vec{k}$"
          ],
          "answer": 0,
          "explanation": "$\\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ 1 & -2 & 1 \\\\ 2 & 1 & -3 \\end{vmatrix} = \\vec{i}(6-1) - \\vec{j}(-3-2) + \\vec{k}(1+4) = 5\\vec{i} + 5\\vec{j} + 5\\vec{k}$"
        },
        {
          "question": "For the vector in Q12, $\\vec{a} \\cdot (\\vec{b} \\times \\vec{c})$ equals:",
          "options": [
            "$75$",
            "$-75$",
            "$0$",
            "$50$"
          ],
          "answer": 0,
          "explanation": "$\\vec{b} \\times \\vec{c} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ 2 & 1 & -3 \\\\ 1 & 2 & -3 \\end{vmatrix} = \\vec{i}(-3+6) - \\vec{j}(-6+3) + \\vec{k}(4-1) = 3\\vec{i} + 3\\vec{j} + 3\\vec{k}$. $\\vec{a} \\cdot (\\vec{b} \\times \\vec{c}) = (1)(3) + (-2)(3) + (1)(3) = 3 - 6 + 3 = 0$"
        },
        {
          "question": "$\\vec{a} \\times (\\vec{b} \\times \\vec{c})$ for Q12 vectors equals:",
          "options": [
            "$20\\vec{i} - 10\\vec{j} - 15\\vec{k}$",
            "$-20\\vec{i} + 10\\vec{j} + 15\\vec{k}$",
            "$10\\vec{i} - 20\\vec{j} + 15\\vec{k}$",
            "$15\\vec{i} + 20\\vec{j} - 10\\vec{k}$"
          ],
          "answer": 0,
          "explanation": "Using vector triple product: $\\vec{a} \\times (\\vec{b} \\times \\vec{c}) = (\\vec{a} \\cdot \\vec{c})\\vec{b} - (\\vec{a} \\cdot \\vec{b})\\vec{c}$. $\\vec{a} \\cdot \\vec{c} = 1(1) + (-2)(2) + 1(-3) = 1 - 4 - 3 = -6$. $\\vec{a} \\cdot \\vec{b} = 1(2) + (-2)(1) + 1(-3) = 2 - 2 - 3 = -3$. So result = $(-6)(2\\vec{i}+\\vec{j}-3\\vec{k}) - (-3)(\\vec{i}+2\\vec{j}-3\\vec{k}) = (-12\\vec{i}-6\\vec{j}+18\\vec{k}) + (3\\vec{i}+6\\vec{j}-9\\vec{k}) = -9\\vec{i} + 0\\vec{j} + 9\\vec{k}$"
        },
        {
          "question": "Cosine of angle between planes $2x - 3y - 6z = 5$ and $6x + 2y - 9z = 4$ is:",
          "options": [
            "$\\frac{12}{91}$",
            "$\\frac{18}{91}$",
            "$\\frac{24}{91}$",
            "$\\frac{36}{91}$"
          ],
          "answer": 1,
          "explanation": "Normals: $\\vec{n_1} = (2,-3,-6)$, $\\vec{n_2} = (6,2,-9)$. $\\vec{n_1} \\cdot \\vec{n_2} = 12 - 6 + 54 = 60$. $|\\vec{n_1}| = \\sqrt{4+9+36} = 7$, $|\\vec{n_2}| = \\sqrt{36+4+81} = 11$. $\\cos\\theta = \\frac{60}{7\\cdot 11} = \\frac{60}{77}$"
        },
        {
          "question": "A uniform beam $20kg$ with weights $30N$ at A, $25N$ at B, $40N$ midway between center and B is pivoted at center. Weight needed $\\frac{1}{8}$ from A for equilibrium is:",
          "options": [
            "$10N$",
            "$15N$",
            "$20N$",
            "$25N$"
          ],
          "answer": 1,
          "explanation": "Let length = L. Moments about center: $30\\cdot\\frac{L}{2} + P\\cdot\\frac{3L}{8} = 25\\cdot\\frac{L}{2} + 40\\cdot\\frac{L}{4}$ ⇒ $15L + \\frac{3PL}{8} = 12.5L + 10L$ ⇒ $\\frac{3PL}{8} = 7.5L$ ⇒ $P = 20N$"
        },
        {
          "question": "Resultant of forces $30N$ and $50N$ with $70^\\circ$ between them has magnitude:",
          "options": [
            "$\\approx 68.2N$",
            "$\\approx 72.5N$",
            "$\\approx 65.8N$",
            "$\\approx 70.1N$"
          ],
          "answer": 0,
          "explanation": "Using cosine rule: $R = \\sqrt{30^2 + 50^2 + 2\\cdot30\\cdot50\\cos70^\\circ} = \\sqrt{900 + 2500 + 3000\\cdot0.342} = \\sqrt{3400 + 1026} = \\sqrt{4426} \\approx 66.5N$"
        },
        {
          "question": "Using Lami's theorem, if three forces P, Q, $50N$ are in equilibrium with angles $120^\\circ$ between them, then P =:",
          "options": [
            "$50N$",
            "$25N$",
            "$\\frac{50}{\\sqrt{3}} N$",
            "$100N$"
          ],
          "answer": 0,
          "explanation": "Lami's theorem: $\\frac{P}{\\sin\\alpha} = \\frac{Q}{\\sin\\beta} = \\frac{50}{\\sin\\gamma}$. If angles between forces are $120^\\circ$ each, then $\\alpha = \\beta = \\gamma = 120^\\circ$, so $\\frac{P}{\\sin120^\\circ} = \\frac{50}{\\sin120^\\circ}$ ⇒ $P = 50N$"
        },
        {
          "question": "Moment of inertia of uniform solid hemisphere mass M, radius a about diameter of base:",
          "options": [
            "$\\frac{2}{5}Ma^2$",
            "$\\frac{83}{320}Ma^2$",
            "$\\frac{3}{10}Ma^2$",
            "$\\frac{1}{4}Ma^2$"
          ],
          "answer": 0,
          "explanation": "For solid sphere about diameter: $\\frac{2}{5}Ma^2$. Hemisphere has half the mass but same distribution, so $\\frac{2}{5}(\\frac{M}{2})a^2 = \\frac{1}{5}Ma^2$"
        },
        {
          "question": "Moment of inertia of uniform square lamina mass M, side $2a$ about a diagonal:",
          "options": [
            "$\\frac{Ma^2}{3}$",
            "$\\frac{Ma^2}{6}$",
            "$\\frac{2Ma^2}{3}$",
            "$\\frac{Ma^2}{12}$"
          ],
          "answer": 0,
          "explanation": "For square about diagonal, $I = \\frac{1}{12}M(2a)^2 = \\frac{1}{12}M\\cdot4a^2 = \\frac{Ma^2}{3}$"
        },
        {
          "question": "Radius of gyration of rod length L about perpendicular axis through endpoint:",
          "options": [
            "$\\frac{L}{\\sqrt{3}}$",
            "$\\frac{L}{2\\sqrt{3}}$",
            "$\\frac{L}{\\sqrt{12}}$",
            "$\\frac{L}{2}$"
          ],
          "answer": 0,
          "explanation": "$I = \\frac{1}{3}ML^2$, so $k = \\sqrt{\\frac{I}{M}} = \\sqrt{\\frac{L^2}{3}} = \\frac{L}{\\sqrt{3}}$"
        },
        {
          "question": "Masses 1,2,3,4,5,5 at points $(-6,5),(2,-2),(-4,-3),(-1,0),(0,-7),(3,0)$. Distance of center of mass from origin is:",
          "options": [
            "$1$",
            "$2$",
            "$0$",
            "$3$"
          ],
          "answer": 0,
          "explanation": "$\\bar{x} = \\frac{1(-6)+2(2)+3(-4)+4(-1)+5(0)+5(3)}{1+2+3+4+5+5} = \\frac{-6+4-12-4+0+15}{20} = \\frac{-3}{20} = -0.15$, $\\bar{y} = \\frac{1(5)+2(-2)+3(-3)+4(0)+5(-7)+5(0)}{20} = \\frac{5-4-9+0-35+0}{20} = \\frac{-43}{20} = -2.15$. Distance = $\\sqrt{0.0225 + 4.6225} = \\sqrt{4.645} \\approx 2.155$"
        },
        {
          "question": "A rod with two metals of different densities for each half has center of mass $\\frac{1}{7}$ from center. Density ratio $\\rho_1 : \\rho_2$ is:",
          "options": [
            "$4:3$",
            "$3:4$",
            "$5:2$",
            "$2:5$"
          ],
          "answer": 0,
          "explanation": "Let length = 2L, masses $m_1 = \\rho_1AL$, $m_2 = \\rho_2AL$. Center of mass from join: $\\bar{x} = \\frac{m_1(-L/2) + m_2(L/2)}{m_1+m_2} = \\frac{L}{2}\\cdot\\frac{m_2 - m_1}{m_1+m_2} = \\frac{L}{2}\\cdot\\frac{\\rho_2 - \\rho_1}{\\rho_1+\\rho_2}$. Given $\\bar{x} = \\frac{L}{7}$, so $\\frac{\\rho_2 - \\rho_1}{\\rho_1+\\rho_2} = \\frac{2}{7}$ ⇒ $7\\rho_2 - 7\\rho_1 = 2\\rho_1 + 2\\rho_2$ ⇒ $5\\rho_2 = 9\\rho_1$ ⇒ $\\rho_1:\\rho_2 = 5:9$"
        },
        {
          "question": "An engine exerts $35,000N$ on $240$-tonne train up $1$ in $120$ slope against $60N$/tonne resistance. Acceleration is:",
          "options": [
            "$0.05 m/s^2$",
            "$0.1 m/s^2$",
            "$0.02 m/s^2$",
            "$0.07 m/s^2$"
          ],
          "answer": 0,
          "explanation": "Mass = 240,000kg. Component down slope = $240,000\\cdot9.8\\cdot\\frac{1}{120} = 19,600N$. Resistance = $60\\cdot240 = 14,400N$. Total opposing = $34,000N$. Net force = $35,000 - 34,000 = 1,000N$. $a = \\frac{1000}{240000} = 0.00417 m/s^2$"
        },
        {
          "question": "For return journey down slope, braking force for $a \\leq 0.01 m/s^2$ is:",
          "options": [
            "$32,000N$",
            "$28,000N$",
            "$30,000N$",
            "$25,000N$"
          ],
          "answer": 0,
          "explanation": "Down slope: component = $19,600N$ aiding motion, resistance = $14,400N$ opposing. Net aiding = $5,200N$. For $a \\leq 0.01$, $F_{net} \\leq 240,000\\cdot0.01 = 2,400N$. So braking force needed = $5,200 - 2,400 = 2,800N$"
        }
      ]
    },
    {
      "id": "QS004",
      "questions": [
        {
          "question": "The points of intersection of the parabola $y^2 = 4ax$ and the circle $x^2 + y^2 = 32a^2$ are:",
          "options": [
            "$(4a, \\pm 4a)$",
            "$(2a, \\pm 4a)$",
            "$(4a, \\pm 2a)$",
            "$(8a, \\pm 4a)$"
          ],
          "answer": 0,
          "explanation": "Substitute $y^2 = 4ax$ into circle: $x^2 + 4ax = 32a^2$ ⇒ $x^2 + 4ax - 32a^2 = 0$ ⇒ $(x+8a)(x-4a) = 0$ ⇒ $x = 4a$ (positive). Then $y^2 = 16a^2$ ⇒ $y = \\pm 4a$"
        },
        {
          "question": "The equation of the tangent from $(27, 8)$ to the ellipse $x^2 + 9y^2 = 9$ is:",
          "options": [
            "$3x + 2y = 25$",
            "$x + 3y = 27$",
            "$2x + 3y = 30$",
            "$x + 2y = 43$"
          ],
          "answer": 0,
          "explanation": "Ellipse: $\\frac{x^2}{9} + y^2 = 1$. Tangent in slope form: $y = mx \\pm \\sqrt{9m^2 + 1}$. Through (27,8): $8 = 27m \\pm \\sqrt{9m^2+1}$ ⇒ $(8-27m)^2 = 9m^2+1$ ⇒ $64 - 432m + 729m^2 = 9m^2+1$ ⇒ $720m^2 - 432m + 63 = 0$ ⇒ $240m^2 - 144m + 21 = 0$"
        },
        {
          "question": "The normal to the ellipse $x^2 + 9y^2 = 9$ at the point of contact in Q2 has equation:",
          "options": [
            "$9x - 2y = 235$",
            "$2x - 9y = 18$",
            "$3x - y = 25$",
            "$x - 9y = -45$"
          ],
          "answer": 0,
          "explanation": "If tangent is $3x+2y=25$, slope = $-\\frac{3}{2}$, so normal slope = $\\frac{2}{3}$. Point of contact found from tangent and ellipse equations."
        },
        {
          "question": "A wheel (mass M, radius a) has six spokes (each mass m, length a). Moment of inertia about central perpendicular axis is:",
          "options": [
            "$Ma^2 + 2ma^2$",
            "$\\frac{1}{2}Ma^2 + 2ma^2$",
            "$\\frac{1}{2}Ma^2 + ma^2$",
            "$Ma^2 + 6ma^2$"
          ],
          "answer": 0,
          "explanation": "Rim: $I = Ma^2$. Each spoke: $I = \\frac{1}{3}ma^2$. Six spokes: $2ma^2$. Total: $Ma^2 + 2ma^2$"
        },
        {
          "question": "Radius of gyration of the wheel in Q4 is:",
          "options": [
            "$a\\sqrt{\\frac{M+4m}{2M+4m}}$",
            "$a\\sqrt{\\frac{M+2m}{M+4m}}$",
            "$a\\sqrt{\\frac{M/2+2m}{M+6m}}$",
            "$a\\sqrt{\\frac{M+3m}{M+6m}}$"
          ],
          "answer": 0,
          "explanation": "Total mass = $M + 6m$, $I = Ma^2 + 2ma^2 = a^2(M+2m)$. $k = \\sqrt{\\frac{I}{M_{total}}} = a\\sqrt{\\frac{M+2m}{M+6m}}$"
        },
        {
          "question": "A particle moves with SHM from rest at distance $\\alpha$ from O. Its position at time t is:",
          "options": [
            "$x = \\alpha\\cos(\\omega t)$",
            "$x = \\alpha\\sin(\\omega t)$",
            "$x = \\alpha\\cos(\\omega t + \\pi/4)$",
            "$x = \\alpha\\sin(\\omega t + \\pi/2)$"
          ],
          "answer": 0,
          "explanation": "General solution: $x = A\\sin(\\omega t + \\phi)$. At t=0, x=α: $A\\sin\\phi = \\alpha$. At t=0, v=0: $A\\omega\\cos\\phi = 0$ ⇒ $\\cos\\phi = 0$ ⇒ $\\phi = \\pi/2$. Then $A\\sin(\\pi/2) = A = \\alpha$, so $x = \\alpha\\sin(\\omega t + \\pi/2) = \\alpha\\cos(\\omega t)$"
        },
        {
          "question": "A particle moving with SHM is at distance $\\beta$ from O moving towards O with velocity v. The amplitude is:",
          "options": [
            "$\\sqrt{\\beta^2 + v^2/\\omega^2}$",
            "$\\sqrt{\\beta^2 - v^2/\\omega^2}$",
            "$\\sqrt{v^2/\\omega^2 - \\beta^2}$",
            "$\\beta + v/\\omega$"
          ],
          "answer": 0,
          "explanation": "Using $v^2 = \\omega^2(A^2 - x^2)$: $v^2 = \\omega^2(A^2 - \\beta^2)$ ⇒ $A^2 = \\beta^2 + v^2/\\omega^2$ ⇒ $A = \\sqrt{\\beta^2 + v^2/\\omega^2}$"
        },
        {
          "question": "A pendulum clock gains 30 seconds per day. The fractional change in length needed is:",
          "options": [
            "$-1/1440$",
            "$-1/2880$",
            "$+1/1440$",
            "$+1/2880$"
          ],
          "answer": 1,
          "explanation": "$T = 2\\pi\\sqrt{l/g}$ ⇒ $\\frac{\\delta T}{T} = \\frac{1}{2}\\frac{\\delta l}{l}$. Gaining time means clock runs fast, so actual period is less. $\\frac{\\delta T}{T} = -\\frac{30}{86400} = -\\frac{1}{2880}$. So $\\frac{\\delta l}{l} = 2\\frac{\\delta T}{T} = -\\frac{1}{1440}$"
        },
        {
          "question": "A body of mass m moving with velocity $a\\vec{i} + b\\vec{j}$ is subjected to force $x\\vec{i} - y\\vec{j}$ for t seconds. Final velocity is:",
          "options": [
            "$(a + xt/m)\\vec{i} + (b - yt/m)\\vec{j}$",
            "$(a - xt/m)\\vec{i} + (b + yt/m)\\vec{j}$",
            "$(a + xt/m)\\vec{i} + (b + yt/m)\\vec{j}$",
            "$(a - xt/m)\\vec{i} + (b - yt/m)\\vec{j}$"
          ],
          "answer": 0,
          "explanation": "Impulse = change in momentum: $(x\\vec{i} - y\\vec{j})t = m(\\vec{v}_f - (a\\vec{i}+b\\vec{j}))$ ⇒ $\\vec{v}_f = (a\\vec{i}+b\\vec{j}) + \\frac{t}{m}(x\\vec{i} - y\\vec{j}) = (a + \\frac{xt}{m})\\vec{i} + (b - \\frac{yt}{m})\\vec{j}$"
        },
        {
          "question": "A 200g ball hits a wall at 15 m/s and rebounds at 6 m/s. If contact lasts 0.01s, average force is:",
          "options": [
            "420 N",
            "210 N",
            "105 N",
            "52.5 N"
          ],
          "answer": 0,
          "explanation": "Change in momentum = $0.2(6 - (-15)) = 0.2(21) = 4.2 N\\cdot s$. Force = $\\frac{4.2}{0.01} = 420 N$"
        },
        {
          "question": "Impulse on the ball in Q10 is:",
          "options": [
            "4.2 N·s",
            "2.1 N·s",
            "1.05 N·s",
            "0.525 N·s"
          ],
          "answer": 0,
          "explanation": "Impulse = change in momentum = $4.2 N\\cdot s$"
        },
        {
          "question": "A 100kg shell is fired from a 2700kg piece with velocity 1200 m/s. Recoil velocity is:",
          "options": [
            "44.44 m/s",
            "33.33 m/s",
            "22.22 m/s",
            "11.11 m/s"
          ],
          "answer": 0,
          "explanation": "Conservation of momentum: $0 = 100(1200) + 2700v$ ⇒ $v = -\\frac{120000}{2700} = -44.44 m/s$"
        },
        {
          "question": "Impulse on the shell in Q12 is:",
          "options": [
            "120,000 N·s",
            "60,000 N·s",
            "240,000 N·s",
            "480,000 N·s"
          ],
          "answer": 0,
          "explanation": "Impulse = change in momentum of shell = $100(1200 - 0) = 120,000 N\\cdot s$"
        },
        {
          "question": "Particle A (mass 0.5) with velocity $(2\\vec{i}+3\\vec{j})$ collides with stationary B (mass 1.5). If B's velocity after impact is $(5\\vec{i}+\\vec{j})$, A's velocity is:",
          "options": [
            "$-13\\vec{i} + 0\\vec{j}$",
            "$-10\\vec{i} + 2\\vec{j}$",
            "$-8\\vec{i} + 1\\vec{j}$",
            "$-5\\vec{i} + 3\\vec{j}$"
          ],
          "answer": 0,
          "explanation": "Conservation of momentum: $0.5(2\\vec{i}+3\\vec{j}) + 1.5(0) = 0.5\\vec{v}_A + 1.5(5\\vec{i}+\\vec{j})$ ⇒ $\\vec{i}+1.5\\vec{j} = 0.5\\vec{v}_A + 7.5\\vec{i}+1.5\\vec{j}$ ⇒ $0.5\\vec{v}_A = -6.5\\vec{i}$ ⇒ $\\vec{v}_A = -13\\vec{i}$"
        },
        {
          "question": "Impulse on A in Q14 is:",
          "options": [
            "$-7.5\\vec{i} - 1.5\\vec{j}$",
            "$-6.5\\vec{i} - 1.0\\vec{j}$",
            "$-5.5\\vec{i} - 0.5\\vec{j}$",
            "$-4.5\\vec{i} - 0.0\\vec{j}$"
          ],
          "answer": 0,
          "explanation": "Impulse on A = change in momentum of A = $0.5[(-13\\vec{i}) - (2\\vec{i}+3\\vec{j})] = 0.5(-15\\vec{i} - 3\\vec{j}) = -7.5\\vec{i} - 1.5\\vec{j}$"
        },
        {
          "question": "Two bodies A (3kg) and B (4kg) with velocities $(4\\vec{i}+3\\vec{j})$ and $(-5\\vec{i}+\\vec{j})$ collide. After impact they move parallel to $\\vec{j}$ and $(4\\vec{i}+\\vec{j})$ respectively. Speed of A is:",
          "options": [
            "3 m/s",
            "4 m/s",
            "5 m/s",
            "6 m/s"
          ],
          "answer": 0,
          "explanation": "Let $\\vec{v}_A = \\alpha\\vec{j}$, $\\vec{v}_B = \\beta(4\\vec{i}+\\vec{j})$. Momentum conservation: $3(4\\vec{i}+3\\vec{j}) + 4(-5\\vec{i}+\\vec{j}) = 3(\\alpha\\vec{j}) + 4\\beta(4\\vec{i}+\\vec{j})$ ⇒ $(12-20)\\vec{i} + (9+4)\\vec{j} = 16\\beta\\vec{i} + (3\\alpha+4\\beta)\\vec{j}$ ⇒ $-8 = 16\\beta$, $13 = 3\\alpha+4\\beta$ ⇒ $\\beta = -0.5$, $3\\alpha = 13 - 4(-0.5) = 15$ ⇒ $\\alpha = 5$. So $\\vec{v}_A = 5\\vec{j}$, speed = 5 m/s"
        },
        {
          "question": "Speed of B after impact in Q16 is:",
          "options": [
            "$\\sqrt{17}$ m/s",
            "5 m/s",
            "4 m/s",
            "$\\sqrt{10}$ m/s"
          ],
          "answer": 0,
          "explanation": "$\\vec{v}_B = -0.5(4\\vec{i}+\\vec{j}) = -2\\vec{i} - 0.5\\vec{j}$, speed = $\\sqrt{4 + 0.25} = \\sqrt{4.25} = \\frac{\\sqrt{17}}{2} m/s$"
        },
        {
          "question": "Impulse on A in Q16 is:",
          "options": [
            "$-12\\vec{i} + 6\\vec{j}$",
            "$-15\\vec{i} + 9\\vec{j}$",
            "$-18\\vec{i} + 12\\vec{j}$",
            "$-21\\vec{i} + 15\\vec{j}$"
          ],
          "answer": 0,
          "explanation": "Impulse on A = $3[(5\\vec{j}) - (4\\vec{i}+3\\vec{j})] = 3(-4\\vec{i} + 2\\vec{j}) = -12\\vec{i} + 6\\vec{j}$"
        },
        {
          "question": "A 10kg mass suspended by two strings making $30^\\circ$ and $45^\\circ$ with horizontal. Tension in $30^\\circ$ string is:",
          "options": [
            "71.6 N",
            "89.5 N",
            "51.8 N",
            "103.6 N"
          ],
          "answer": 2,
          "explanation": "Vertical: $T_1\\sin30^\\circ + T_2\\sin45^\\circ = 98N$. Horizontal: $T_1\\cos30^\\circ = T_2\\cos45^\\circ$. From horizontal: $T_2 = T_1\\frac{\\cos30^\\circ}{\\cos45^\\circ} = T_1\\frac{\\sqrt{3}/2}{1/\\sqrt{2}} = T_1\\sqrt{1.5}$. Vertical: $0.5T_1 + \\frac{1}{\\sqrt{2}}T_1\\sqrt{1.5} = 98$ ⇒ $T_1(0.5 + \\sqrt{0.75}) = 98$ ⇒ $T_1(0.5 + 0.866) = 98$ ⇒ $T_1 = \\frac{98}{1.366} \\approx 71.7N$"
        },
        {
          "question": "Tension in $45^\\circ$ string in Q19 is:",
          "options": [
            "71.6 N",
            "89.5 N",
            "51.8 N",
            "103.6 N"
          ],
          "answer": 0,
          "explanation": "$T_2 = T_1\\sqrt{1.5} \\approx 71.7\\cdot1.225 \\approx 87.8N$"
        },
        {
          "question": "Resultant of forces 10N, 20N, 30N, 40N acting at $060^\\circ$, $120^\\circ$, $180^\\circ$, $270^\\circ$ has magnitude:",
          "options": [
            "20 N",
            "30 N",
            "40 N",
            "50 N"
          ],
          "answer": 0,
          "explanation": "Components: 10N at 60°: (5,8.66), 20N at 120°: (-10,17.32), 30N at 180°: (-30,0), 40N at 270°: (0,-40). Sum: (-35,-14.02). Magnitude = $\\sqrt{1225 + 196.6} = \\sqrt{1421.6} \\approx 37.7N$"
        },
        {
          "question": "Direction of resultant in Q21 is:",
          "options": [
            "$200^\\circ$",
            "$220^\\circ$",
            "$240^\\circ$",
            "$260^\\circ$"
          ],
          "answer": 2,
          "explanation": "From components (-35,-14.02), angle = $180^\\circ + \\tan^{-1}(14.02/35) = 180^\\circ + 21.8^\\circ = 201.8^\\circ$"
        },
        {
          "question": "Four of five coplanar strings attached to a point have tensions 50N ($060^\\circ$), 40N ($090^\\circ$), 100N ($270^\\circ$), 20N ($330^\\circ$). Tension in fifth string for equilibrium is:",
          "options": [
            "30 N",
            "40 N",
            "50 N",
            "60 N"
          ],
          "answer": 0,
          "explanation": "Sum of given forces: 50N at 60°: (25,43.3), 40N at 90°: (0,40), 100N at 270°: (0,-100), 20N at 330°: (17.32,-10). Total: (42.32,-26.7). Fifth string must be equal and opposite: magnitude = $\\sqrt{42.32^2 + 26.7^2} \\approx 50N$"
        },
        {
          "question": "Direction of fifth string in Q23 is:",
          "options": [
            "$150^\\circ$",
            "$180^\\circ$",
            "$210^\\circ$",
            "$240^\\circ$"
          ],
          "answer": 2,
          "explanation": "From components (42.32,-26.7), angle = $360^\\circ - \\tan^{-1}(26.7/42.32) = 360^\\circ - 32.3^\\circ = 327.7^\\circ$. Opposite direction = $147.7^\\circ$"
        },
        {
          "question": "Forces along sides of square ABCD (side 2): 20N (AB), 30N (CB), 15N (CD), 20N (AD). Resultant magnitude is:",
          "options": [
            "25 N",
            "30 N",
            "35 N",
            "40 N"
          ],
          "answer": 0,
          "explanation": "Place A at origin, AB along x-axis. Forces: 20N →, 30N ↑, 15N ←, 20N ↓. Resultant: (5,10). Magnitude = $\\sqrt{25 + 100} = \\sqrt{125} = 5\\sqrt{5} \\approx 11.18N$"
        }
      ]
    }
  ]
};
