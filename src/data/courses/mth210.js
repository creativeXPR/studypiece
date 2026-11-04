// MTH 210 question bank.
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

export default {
  "code": "MTH 210",
  "updated": "2026-11-04",
  "title": "Vector Analysis",
  "sets": [
    {
      "id": "QS001",
      "title": "Vector basics",
      "questions": [
        {
          "question": "Which of these is a vector?",
          "options": [
            "The mass of a bag: $5$ kg",
            "The temperature of a room: $28$ °C",
            "The velocity of a car: $60$ km/h due east",
            "The length of a test: $1$ hour"
          ],
          "answer": 2,
          "explanation": "A vector has a magnitude and a direction; only the velocity has a direction."
        },
        {
          "question": "Which of these is a scalar?",
          "options": [
            "Force",
            "Displacement",
            "Velocity",
            "Temperature"
          ],
          "answer": 3,
          "explanation": "Temperature has size only. The others have a direction."
        },
        {
          "question": "$\\|2\\vec i - \\vec j + 2\\vec k\\| = $",
          "options": [
            "$\\sqrt7$",
            "$5$",
            "$9$",
            "$3$"
          ],
          "answer": 3,
          "explanation": "$\\sqrt{4 + 1 + 4} = \\sqrt9 = 3$. Square every component, including the negative one."
        },
        {
          "question": "$\\|3\\vec i + 4\\vec j\\| = $",
          "options": [
            "$7$",
            "$25$",
            "$5$",
            "$1$"
          ],
          "answer": 2,
          "explanation": "$\\sqrt{9 + 16} = 5$."
        },
        {
          "question": "For $A(1, 2, 0)$ and $B(4, -1, 2)$, $\\vec{AB} = $",
          "options": [
            "$-3\\vec i + 3\\vec j - 2\\vec k$",
            "$5\\vec i + \\vec j + 2\\vec k$",
            "$3\\vec i + \\vec j + 2\\vec k$",
            "$3\\vec i - 3\\vec j + 2\\vec k$"
          ],
          "answer": 3,
          "explanation": "Terminal minus initial: $B - A = (3, -3, 2)$. The negative is $\\vec{BA}$."
        },
        {
          "question": "For $A(2, -1, 3)$ and $B(5, 4, -2)$, $\\vec{AB} = $",
          "options": [
            "$3\\vec i + 5\\vec j - 5\\vec k$",
            "$7\\vec i + 3\\vec j + \\vec k$",
            "$-3\\vec i - 5\\vec j + 5\\vec k$",
            "$3\\vec i + 3\\vec j - 5\\vec k$"
          ],
          "answer": 0,
          "explanation": "$(5 - 2, 4 + 1, -2 - 3) = (3, 5, -5)$."
        },
        {
          "question": "For $A(1, -2, 3)$ and $B(4, 2, -9)$, $\\|\\vec{AB}\\| = $",
          "options": [
            "$169$",
            "$\\sqrt{19}$",
            "$13$",
            "$11$"
          ],
          "answer": 2,
          "explanation": "$\\vec{AB} = (3, 4, -12)$ and $\\sqrt{9 + 16 + 144} = \\sqrt{169} = 13$."
        },
        {
          "question": "The zero vector",
          "options": [
            "has magnitude $1$",
            "always points along the $x$-axis",
            "is the same as the number $0$",
            "has magnitude $0$ and no definite direction"
          ],
          "answer": 3,
          "explanation": "Its initial and terminal points coincide, so it has no direction. It is still a vector, $\\vec 0 = 0\\vec i + 0\\vec j + 0\\vec k$."
        },
        {
          "question": "Compared with $\\vec a$, the vector $-\\vec a$ has",
          "options": [
            "magnitude $-\\|\\vec a\\|$",
            "the same direction and a smaller magnitude",
            "the same magnitude and the opposite direction",
            "a direction perpendicular to $\\vec a$"
          ],
          "answer": 2,
          "explanation": "The negative vector is the additive inverse: $\\vec a + (-\\vec a) = \\vec 0$, and $|-\\vec a| = |\\vec a|$."
        },
        {
          "question": "The vectors $(2, 3, 4)$ and $(2, 3, -4)$",
          "options": [
            "are equal",
            "have the same magnitude but are not equal",
            "are parallel",
            "are negatives of each other"
          ],
          "answer": 1,
          "explanation": "Both have length $\\sqrt{29}$, but equal vectors need every component equal; the $z$-components differ."
        },
        {
          "question": "A position vector is",
          "options": [
            "a free vector",
            "always a unit vector",
            "a bound vector starting at the origin",
            "the zero vector"
          ],
          "answer": 2,
          "explanation": "$\\vec{OP}$ is tied to the origin, so it is a bound vector."
        },
        {
          "question": "Which is a free vector?",
          "options": [
            "A force applied at a door knob",
            "A displacement of $20$ km north",
            "The position vector of a point $P$",
            "A force acting at one point of a rigid body"
          ],
          "answer": 1,
          "explanation": "A free vector has no fixed position: $20$ km north is the same anywhere."
        },
        {
          "question": "The unit vector in the direction of $2\\vec i - 3\\vec j + 6\\vec k$ is",
          "options": [
            "$\\frac15(2\\vec i - 3\\vec j + 6\\vec k)$",
            "$\\frac{1}{49}(2\\vec i - 3\\vec j + 6\\vec k)$",
            "$\\frac17(2\\vec i - 3\\vec j + 6\\vec k)$",
            "$2\\vec i - 3\\vec j + 6\\vec k$"
          ],
          "answer": 2,
          "explanation": "$\\|\\vec a\\| = \\sqrt{4 + 9 + 36} = 7$; divide every component by $7$."
        },
        {
          "question": "The unit vector along $3\\vec i + 4\\vec k$ is",
          "options": [
            "$\\frac35\\vec i + \\frac45\\vec k$",
            "$\\frac37\\vec i + \\frac47\\vec k$",
            "$3\\vec i + 4\\vec k$",
            "$\\frac15\\vec i + \\frac15\\vec k$"
          ],
          "answer": 0,
          "explanation": "The length is $\\sqrt{9 + 16} = 5$."
        },
        {
          "question": "The direction cosines of $(2, -1, 2)$ are",
          "options": [
            "$\\frac23, -\\frac13, \\frac23$",
            "$\\frac25, -\\frac15, \\frac25$",
            "$2, -1, 2$",
            "$\\frac29, -\\frac19, \\frac29$"
          ],
          "answer": 0,
          "explanation": "Divide each component by $\\|\\vec a\\| = 3$."
        },
        {
          "question": "For any direction cosines $l, m, n$, $l^2 + m^2 + n^2 = $",
          "options": [
            "$1$",
            "$0$",
            "$3$",
            "the length of the vector"
          ],
          "answer": 0,
          "explanation": "$(l, m, n)$ is the unit vector $\\hat a$, whose length is $1$."
        },
        {
          "question": "Can $\\frac12, \\frac12, \\frac12$ be the direction cosines of a vector?",
          "options": [
            "Yes, they are each between $-1$ and $1$",
            "No, because their squares add to $\\frac34$",
            "Yes, for a vector of length $\\frac12$",
            "Only for a vector in the $xy$-plane"
          ],
          "answer": 1,
          "explanation": "Direction cosines must satisfy $l^2 + m^2 + n^2 = 1$."
        },
        {
          "question": "A vector has direction ratios $2 : -3 : 6$ and magnitude $14$. It is",
          "options": [
            "$28\\vec i - 42\\vec j + 84\\vec k$",
            "$2\\vec i - 3\\vec j + 6\\vec k$",
            "$\\frac27\\vec i - \\frac37\\vec j + \\frac67\\vec k$",
            "$4\\vec i - 6\\vec j + 12\\vec k$"
          ],
          "answer": 3,
          "explanation": "$\\sqrt{4 + 9 + 36} = 7$, so the unit vector is $\\frac17(2, -3, 6)$; multiply by $14$."
        },
        {
          "question": "A vector makes $45°$ with the $x$-axis and $60°$ with the $y$-axis. Its angle with the $z$-axis is",
          "options": [
            "$75°$",
            "$60°$ or $120°$",
            "$30°$",
            "$90°$"
          ],
          "answer": 1,
          "explanation": "$\\cos^2\\gamma = 1 - \\frac12 - \\frac14 = \\frac14$, so $\\cos\\gamma = \\pm\\frac12$."
        },
        {
          "question": "The direction cosines of the line from $A(2, -1, 3)$ to $B(7, 3, -5)$ are",
          "options": [
            "$\\frac{1}{17}(5, 4, -8)$",
            "$\\frac{1}{\\sqrt{89}}(9, 2, -2)$",
            "$\\frac{1}{\\sqrt{105}}(5, 4, 8)$",
            "$\\frac{1}{\\sqrt{105}}(5, 4, -8)$"
          ],
          "answer": 3,
          "explanation": "$\\vec{AB} = (5, 4, -8)$ and $\\sqrt{25 + 16 + 64} = \\sqrt{105}$."
        },
        {
          "question": "If $n = \\cos\\gamma \\approx -0.781$, then $\\gamma \\approx$",
          "options": [
            "$38.67°$",
            "$141.33°$",
            "$-38.67°$",
            "$51.33°$"
          ],
          "answer": 1,
          "explanation": "A negative cosine gives an obtuse angle: $\\cos^{-1}(-0.781) \\approx 141.33°$."
        },
        {
          "question": "The unit vector parallel to the resultant of $\\vec a = 2\\vec i + 4\\vec j - 5\\vec k$ and $\\vec b = \\vec i + 2\\vec j + 3\\vec k$ is",
          "options": [
            "$\\frac17(3\\vec i + 6\\vec j - 2\\vec k)$",
            "$\\frac{1}{11}(3\\vec i + 6\\vec j - 2\\vec k)$",
            "$\\frac{1}{\\sqrt{69}}(\\vec i + 2\\vec j - 8\\vec k)$",
            "$\\frac{1}{\\sqrt7}(3\\vec i + 6\\vec j - 2\\vec k)$"
          ],
          "answer": 0,
          "explanation": "$\\vec a + \\vec b = (3, 6, -2)$ with length $\\sqrt{49} = 7$."
        },
        {
          "question": "$\\vec i$, $\\vec j$, $\\vec k$ are",
          "options": [
            "three zero vectors",
            "the unit vectors along the $x$, $y$ and $z$ axes",
            "any three perpendicular vectors of length $2$",
            "the direction cosines of every vector"
          ],
          "answer": 1,
          "explanation": "$\\vec i = (1, 0, 0)$, $\\vec j = (0, 1, 0)$, $\\vec k = (0, 0, 1)$."
        },
        {
          "question": "The angle between $\\vec a = 4\\vec i - 4\\vec j + 2\\vec k$ and the $y$-axis is",
          "options": [
            "obtuse",
            "acute",
            "a right angle",
            "zero"
          ],
          "answer": 0,
          "explanation": "$m = -\\frac46 = -\\frac23 < 0$, so the angle is more than $90°$."
        },
        {
          "question": "The magnitude of a vector can be",
          "options": [
            "zero or positive, never negative",
            "any real number",
            "only positive",
            "only $1$"
          ],
          "answer": 0,
          "explanation": "It is a square root of a sum of squares."
        }
      ]
    },
    {
      "id": "QS002",
      "title": "Dot and cross products",
      "questions": [
        {
          "question": "$(1, 2, 2) \\cdot (3, 0, 4) = $",
          "options": [
            "$(3, 0, 8)$",
            "$15$",
            "$7$",
            "$11$"
          ],
          "answer": 3,
          "explanation": "$3 + 0 + 8 = 11$: the dot product is a number."
        },
        {
          "question": "The angle between $(1, 2, 2)$ and $(3, 0, 4)$ is about",
          "options": [
            "$47.17°$",
            "$11°$",
            "$42.83°$",
            "$90°$"
          ],
          "answer": 2,
          "explanation": "$\\cos\\theta = \\frac{11}{3 \\times 5} = \\frac{11}{15}$."
        },
        {
          "question": "For non-zero vectors, $\\vec a \\cdot \\vec b = 0$ means",
          "options": [
            "$\\vec a$ and $\\vec b$ are parallel",
            "$\\vec a = \\vec b$",
            "one of them must be $\\vec 0$",
            "$\\vec a$ and $\\vec b$ are perpendicular"
          ],
          "answer": 3,
          "explanation": "$\\|\\vec a\\|\\|\\vec b\\|\\cos\\theta = 0$ forces $\\cos\\theta = 0$."
        },
        {
          "question": "For which $t$ are $(2, t, 1)$ and $(1, 2, -4)$ perpendicular?",
          "options": [
            "$t = -1$",
            "$t = 2$",
            "$t = 1$",
            "$t = 0$"
          ],
          "answer": 2,
          "explanation": "$2 + 2t - 4 = 0$."
        },
        {
          "question": "$\\vec i \\cdot \\vec i = $",
          "options": [
            "$0$",
            "$\\vec k$",
            "$1$",
            "$\\vec i$"
          ],
          "answer": 2,
          "explanation": "A unit vector dotted with itself gives $1 \\cdot 1 \\cdot \\cos 0 = 1$."
        },
        {
          "question": "$\\vec i \\cdot \\vec j = $",
          "options": [
            "$1$",
            "$0$",
            "$\\vec k$",
            "$-1$"
          ],
          "answer": 1,
          "explanation": "The axes are perpendicular."
        },
        {
          "question": "$\\vec a \\cdot \\vec a = $",
          "options": [
            "$\\|\\vec a\\|$",
            "$\\|\\vec a\\|^2$",
            "$0$",
            "$2\\|\\vec a\\|$"
          ],
          "answer": 1,
          "explanation": "The angle with itself is $0$."
        },
        {
          "question": "If $\\vec a \\cdot \\vec b < 0$, the angle between $\\vec a$ and $\\vec b$ is",
          "options": [
            "obtuse",
            "acute",
            "a right angle",
            "zero"
          ],
          "answer": 0,
          "explanation": "$\\cos\\theta < 0$ for $90° < \\theta \\le 180°$."
        },
        {
          "question": "The scalar projection of $\\vec b = (2, 2, 1)$ onto $\\vec a = (4, -1, 2)$ is",
          "options": [
            "$\\frac83$",
            "$\\frac{8}{21}$",
            "$8$",
            "$\\frac{8}{\\sqrt{21}}$"
          ],
          "answer": 3,
          "explanation": "$\\frac{\\vec b \\cdot \\vec a}{\\|\\vec a\\|} = \\frac{8}{\\sqrt{21}}$: divide by the length of the vector you project onto."
        },
        {
          "question": "The vector projection of $\\vec a = (3, -2, 4)$ onto $\\vec b = (1, 5, -1)$ is",
          "options": [
            "$-\\frac{11}{\\sqrt{27}}(1, 5, -1)$",
            "$\\frac{11}{27}(1, 5, -1)$",
            "$-\\frac{11}{29}(3, -2, 4)$",
            "$-\\frac{11}{27}(1, 5, -1)$"
          ],
          "answer": 3,
          "explanation": "$\\frac{\\vec a \\cdot \\vec b}{\\|\\vec b\\|^2}\\vec b$ with $\\vec a \\cdot \\vec b = -11$ and $\\|\\vec b\\|^2 = 27$."
        },
        {
          "question": "$\\vec F = 2\\vec i + \\vec j + 3\\vec k$ N moves a particle through $\\vec d = 4\\vec i - \\vec j + 2\\vec k$ m. The work done is",
          "options": [
            "$15$ J",
            "$13$ J",
            "$9$ J",
            "$(8, -1, 6)$ J"
          ],
          "answer": 1,
          "explanation": "$W = \\vec F \\cdot \\vec d = 8 - 1 + 6 = 13$."
        },
        {
          "question": "$\\vec F = 6\\vec i - 2\\vec j + 3\\vec k$ N moves a particle from $A(1, -2, 3)$ to $B(5, 1, 7)$. The work done is",
          "options": [
            "$30$ J",
            "$49$ J",
            "$42$ J",
            "$18$ J"
          ],
          "answer": 0,
          "explanation": "$\\vec d = B - A = (4, 3, 4)$, so $W = 24 - 6 + 12 = 30$."
        },
        {
          "question": "Forces $4\\vec i + 3\\vec j - 3\\vec k$ and $3\\vec i + \\vec j - \\vec k$ move a particle from $(1, 2, 1)$ to $(5, 4, 1)$. The total work is",
          "options": [
            "$22$ J",
            "$36$ J",
            "$28$ J",
            "$44$ J"
          ],
          "answer": 1,
          "explanation": "Resultant $(7, 4, -4)$, displacement $(4, 2, 0)$: $28 + 8 = 36$. $22$ J is the first force alone."
        },
        {
          "question": "A force is halved and the displacement doubled (same directions). The work done",
          "options": [
            "doubles",
            "halves",
            "is unchanged",
            "is four times as much"
          ],
          "answer": 2,
          "explanation": "$\\left(\\frac12\\vec F\\right) \\cdot (2\\vec d) = \\vec F \\cdot \\vec d$."
        },
        {
          "question": "$(1, 2, 3) \\times (0, 1, -1) = $",
          "options": [
            "$(-5, 1, 1)$",
            "$(-5, -1, 1)$",
            "$(5, -1, -1)$",
            "$(0, 2, -3)$"
          ],
          "answer": 0,
          "explanation": "$\\vec i(-2 - 3) - \\vec j(-1 - 0) + \\vec k(1 - 0)$. Watch the minus on the $\\vec j$ term."
        },
        {
          "question": "$\\vec i \\times \\vec j = $",
          "options": [
            "$\\vec k$",
            "$-\\vec k$",
            "$\\vec 0$",
            "$1$"
          ],
          "answer": 0,
          "explanation": "Cyclic order $i \\to j \\to k$ gives $+$."
        },
        {
          "question": "$\\vec j \\times \\vec i = $",
          "options": [
            "$-\\vec k$",
            "$\\vec k$",
            "$\\vec 0$",
            "$0$"
          ],
          "answer": 0,
          "explanation": "Reversing the order flips the sign."
        },
        {
          "question": "For any vectors, $\\vec a \\times \\vec b = $",
          "options": [
            "$\\vec b \\times \\vec a$",
            "$-(\\vec b \\times \\vec a)$",
            "$\\vec a \\cdot \\vec b$",
            "$\\vec 0$"
          ],
          "answer": 1,
          "explanation": "The cross product is anti-commutative."
        },
        {
          "question": "For non-zero vectors, $\\vec a \\times \\vec b = \\vec 0$ means",
          "options": [
            "$\\vec a$ and $\\vec b$ are perpendicular",
            "$\\vec a$ and $\\vec b$ have equal lengths",
            "$\\vec a \\cdot \\vec b = 0$",
            "$\\vec a$ and $\\vec b$ are parallel"
          ],
          "answer": 3,
          "explanation": "$\\|\\vec a\\|\\|\\vec b\\|\\sin\\theta = 0$ forces $\\theta = 0°$ or $180°$."
        },
        {
          "question": "$\\|\\vec a \\times \\vec b\\| = $",
          "options": [
            "$\\|\\vec a\\|\\|\\vec b\\|\\sin\\theta$",
            "$\\|\\vec a\\|\\|\\vec b\\|\\cos\\theta$",
            "$\\|\\vec a\\| + \\|\\vec b\\|$",
            "$\\vec a \\cdot \\vec b$"
          ],
          "answer": 0,
          "explanation": "The cross product length uses $\\sin\\theta$; the dot product uses $\\cos\\theta$."
        },
        {
          "question": "The area of the parallelogram with sides $\\vec i + 2\\vec j + 2\\vec k$ and $2\\vec i - \\vec j$ is",
          "options": [
            "$45$",
            "$\\frac{3\\sqrt5}{2}$",
            "$3\\sqrt5$",
            "$5$"
          ],
          "answer": 2,
          "explanation": "$\\vec a \\times \\vec b = (2, 4, -5)$, length $\\sqrt{45} = 3\\sqrt5$. Half of it would be a triangle."
        },
        {
          "question": "The area of the triangle with vertices $P(1, -1, 0)$, $Q(2, 1, -1)$, $R(-1, 1, 2)$ is",
          "options": [
            "$3\\sqrt2$",
            "$6\\sqrt2$",
            "$72$",
            "$3$"
          ],
          "answer": 0,
          "explanation": "$\\vec{PQ} \\times \\vec{PR} = (6, 0, 6)$, and half its length is $3\\sqrt2$."
        },
        {
          "question": "The moment about $P$ of a force $\\vec F$ acting at $A$ is",
          "options": [
            "$\\vec F \\times \\vec{PA}$",
            "$\\vec{PA} \\cdot \\vec F$",
            "$\\vec{AP} \\times \\vec{PA}$",
            "$\\vec{PA} \\times \\vec F$"
          ],
          "answer": 3,
          "explanation": "$\\vec M_P = \\vec r \\times \\vec F$ with $\\vec r$ from the pivot to the point of action."
        },
        {
          "question": "A force along $A(1, -2, 4)$ to $B(5, 2, 3)$ has moment about $P(-2, 3, 5)$ equal to",
          "options": [
            "$-9\\vec i + \\vec j - 32\\vec k$",
            "$9\\vec i - \\vec j + 32\\vec k$",
            "$9\\vec i + \\vec j + 32\\vec k$",
            "$12\\vec i - 20\\vec j + \\vec k$"
          ],
          "answer": 1,
          "explanation": "$\\vec r = \\vec{PA} = (3, -5, -1)$, $\\vec F = \\vec{AB} = (4, 4, -1)$, $\\vec r \\times \\vec F = (9, -1, 32)$."
        },
        {
          "question": "$\\vec a \\times \\vec b$ is perpendicular to",
          "options": [
            "$\\vec a$ only",
            "neither $\\vec a$ nor $\\vec b$",
            "both $\\vec a$ and $\\vec b$",
            "$\\vec a + \\vec b$ only when they are equal"
          ],
          "answer": 2,
          "explanation": "That is its defining direction (right-hand rule)."
        }
      ]
    },
    {
      "id": "QS003",
      "title": "Triple products, independence and vector equations",
      "questions": [
        {
          "question": "$\\vec a \\cdot (\\vec b \\times \\vec c)$ equals",
          "options": [
            "$(\\vec a \\times \\vec b) \\times \\vec c$",
            "$\\|\\vec a\\|\\|\\vec b\\|\\|\\vec c\\|$",
            "the vector $\\vec a(\\vec b \\cdot \\vec c)$",
            "the determinant with rows $\\vec a$, $\\vec b$, $\\vec c$"
          ],
          "answer": 3,
          "explanation": "Expanding the determinant along its first row gives exactly $\\vec a \\cdot (\\vec b \\times \\vec c)$."
        },
        {
          "question": "$\\vec a \\cdot (\\vec b \\times \\vec c) = $",
          "options": [
            "$\\vec b \\cdot (\\vec c \\times \\vec a)$",
            "$\\vec b \\cdot (\\vec a \\times \\vec c)$",
            "$-\\vec c \\cdot (\\vec a \\times \\vec b)$",
            "$\\vec a \\cdot (\\vec c \\times \\vec b)$"
          ],
          "answer": 0,
          "explanation": "Cyclic order $a \\to b \\to c \\to a$ leaves it unchanged; swapping two vectors changes the sign."
        },
        {
          "question": "Swapping two of the vectors in a scalar triple product",
          "options": [
            "leaves it unchanged",
            "makes it zero",
            "doubles it",
            "changes its sign"
          ],
          "answer": 3,
          "explanation": "Swapping two rows of a determinant changes its sign."
        },
        {
          "question": "The volume of the parallelepiped with edges $(1, 0, 0)$, $(1, 2, 0)$, $(1, 1, 3)$ is",
          "options": [
            "$1$",
            "$6$",
            "$3$",
            "$-6$"
          ],
          "answer": 1,
          "explanation": "The determinant is $1(6 - 0) = 6$; volume is its absolute value."
        },
        {
          "question": "The volume of the tetrahedron with edges $(1, 0, 0)$, $(1, 2, 0)$, $(1, 1, 3)$ from one vertex is",
          "options": [
            "$6$",
            "$1$",
            "$3$",
            "$\\frac13$"
          ],
          "answer": 1,
          "explanation": "$\\frac16 \\times 6 = 1$."
        },
        {
          "question": "$\\vec a \\cdot (\\vec b \\times \\vec c) = 0$ means $\\vec a$, $\\vec b$, $\\vec c$ are",
          "options": [
            "coplanar",
            "mutually perpendicular",
            "all parallel",
            "unit vectors"
          ],
          "answer": 0,
          "explanation": "Zero volume: the box is flat."
        },
        {
          "question": "The vectors $(1, 2, 3)$, $(2, 4, 6)$, $(1, 0, 1)$",
          "options": [
            "form a box of volume $6$",
            "are linearly independent",
            "form a basis for $\\mathbb R^3$",
            "are coplanar"
          ],
          "answer": 3,
          "explanation": "The determinant is $4 + 8 - 12 = 0$; indeed $(2, 4, 6) = 2(1, 2, 3)$."
        },
        {
          "question": "For which $\\lambda$ are $(2, -1, 1)$, $(1, 2, -3)$, $(3, \\lambda, 5)$ coplanar?",
          "options": [
            "$\\lambda = 4$",
            "$\\lambda = 0$",
            "$\\lambda = -4$",
            "$\\lambda = 28$"
          ],
          "answer": 2,
          "explanation": "The determinant is $7\\lambda + 28$."
        },
        {
          "question": "The tetrahedron with vertices $A(0, -1, -1)$, $B(4, 5, q)$, $C(3, 9, 4)$, $D(-4, 4, 4)$ has volume",
          "options": [
            "$55|q - 1|$",
            "$\\frac{55}{6}|q - 1|$",
            "$\\frac{55}{6}|q + 1|$",
            "$\\frac16|55q|$"
          ],
          "answer": 1,
          "explanation": "Edges from $A$: $(4, 6, q + 1)$, $(3, 10, 5)$, $(-4, 5, 5)$; the determinant is $55q - 55$."
        },
        {
          "question": "The points $A(0, -1, -1)$, $B(4, 5, q)$, $C(3, 9, 4)$, $D(-4, 4, 4)$ are coplanar when",
          "options": [
            "$q = 1$",
            "$q = -1$",
            "$q = 0$",
            "$q = 55$"
          ],
          "answer": 0,
          "explanation": "The volume $\\frac{55}{6}|q - 1|$ is zero."
        },
        {
          "question": "The vectors $(1, 2, 3)$, $(2, 1, 4)$, $(3, 0, 5)$ are",
          "options": [
            "linearly dependent",
            "linearly independent",
            "a basis for $\\mathbb R^3$",
            "mutually perpendicular"
          ],
          "answer": 0,
          "explanation": "The determinant is $5 + 4 - 9 = 0$; $(3, 0, 5) = 2(2, 1, 4) - (1, 2, 3)$."
        },
        {
          "question": "For $(1, 2, 0)$, $(0, 1, 3)$, $(2, 0, 1)$:",
          "options": [
            "the determinant is $0$, so they are dependent",
            "the determinant is $11$, so they form a basis",
            "the determinant is $13$, so they form a basis",
            "the determinant is $-1$, so they are dependent"
          ],
          "answer": 2,
          "explanation": "$1(1 - 0) - 2(0 - 6) + 0 = 13 \\ne 0$."
        },
        {
          "question": "Three vectors in $\\mathbb R^2$ are",
          "options": [
            "always linearly independent",
            "independent when no two are parallel",
            "always linearly dependent",
            "independent when they have different lengths"
          ],
          "answer": 2,
          "explanation": "More vectors than the dimension are always dependent."
        },
        {
          "question": "Two non-zero vectors are linearly independent exactly when they are",
          "options": [
            "not parallel",
            "perpendicular",
            "of equal length",
            "unit vectors"
          ],
          "answer": 0,
          "explanation": "Dependent means one is a multiple of the other."
        },
        {
          "question": "Any set of vectors containing $\\vec 0$ is",
          "options": [
            "linearly independent",
            "a basis",
            "coplanar only in $\\mathbb R^2$",
            "linearly dependent"
          ],
          "answer": 3,
          "explanation": "$1 \\cdot \\vec 0 = \\vec 0$ is a non-trivial combination."
        },
        {
          "question": "$\\vec a \\times (\\vec b \\times \\vec c) = $",
          "options": [
            "$\\vec c(\\vec a \\cdot \\vec b) - \\vec b(\\vec a \\cdot \\vec c)$",
            "$\\vec a(\\vec b \\cdot \\vec c) - \\vec b(\\vec a \\cdot \\vec c)$",
            "$(\\vec a \\times \\vec b) \\times \\vec c$",
            "$\\vec b(\\vec a \\cdot \\vec c) - \\vec c(\\vec a \\cdot \\vec b)$"
          ],
          "answer": 3,
          "explanation": "BAC minus CAB."
        },
        {
          "question": "$\\vec i \\times (\\vec i \\times \\vec j) = $",
          "options": [
            "$-\\vec j$",
            "$\\vec j$",
            "$\\vec 0$",
            "$\\vec k$"
          ],
          "answer": 0,
          "explanation": "$\\vec i \\times \\vec j = \\vec k$ and $\\vec i \\times \\vec k = -\\vec j$."
        },
        {
          "question": "$(\\vec i \\times \\vec i) \\times \\vec j = $",
          "options": [
            "$-\\vec j$",
            "$\\vec 0$",
            "$\\vec k$",
            "$\\vec j$"
          ],
          "answer": 1,
          "explanation": "$\\vec i \\times \\vec i = \\vec 0$. Compare $\\vec i \\times (\\vec i \\times \\vec j) = -\\vec j$: the cross product is not associative."
        },
        {
          "question": "Solving $2\\vec x + \\vec y = 5\\vec i + \\vec j$ and $\\vec x - 2\\vec y = \\vec i - 7\\vec j$ gives $\\vec x = $",
          "options": [
            "$\\frac35\\vec i + 3\\vec j$",
            "$11\\vec i - 5\\vec j$",
            "$\\frac{11}{5}\\vec i - \\vec j$",
            "$\\frac{11}{5}\\vec i + \\vec j$"
          ],
          "answer": 2,
          "explanation": "Twice the first plus the second: $5\\vec x = 11\\vec i - 5\\vec j$."
        },
        {
          "question": "$\\vec x \\times \\vec a = \\vec b$ can have a solution only if",
          "options": [
            "$\\vec a \\times \\vec b = \\vec 0$",
            "$\\|\\vec a\\| = \\|\\vec b\\|$",
            "$\\vec a \\cdot \\vec b = 0$",
            "$\\vec a = \\vec b$"
          ],
          "answer": 2,
          "explanation": "$\\vec x \\times \\vec a$ is always perpendicular to $\\vec a$."
        },
        {
          "question": "When it exists, the general solution of $\\vec x \\times \\vec a = \\vec b$ is",
          "options": [
            "$\\vec x = \\dfrac{\\vec b \\times \\vec a}{\\|\\vec a\\|^2} + \\lambda\\vec a$",
            "$\\vec x = \\dfrac{\\vec a \\times \\vec b}{\\|\\vec a\\|^2} + \\lambda\\vec a$",
            "$\\vec x = \\dfrac{\\vec a \\times \\vec b}{\\|\\vec a\\|} + \\lambda\\vec b$",
            "$\\vec x = \\dfrac{\\vec a \\cdot \\vec b}{\\|\\vec a\\|^2}\\vec a$"
          ],
          "answer": 1,
          "explanation": "Cross with $\\vec a$ and use BAC − CAB; $\\vec b \\times \\vec a$ has the wrong sign."
        },
        {
          "question": "The unique $\\vec x$ with $\\vec x \\cdot (\\vec i + \\vec j) = 3$ and $\\vec x \\times (\\vec i + \\vec j) = \\vec i - \\vec j + 2\\vec k$ is",
          "options": [
            "$\\frac52\\vec i + \\frac12\\vec j - \\vec k$",
            "$\\frac12\\vec i + \\frac52\\vec j - \\vec k$",
            "$\\frac52\\vec i + \\frac12\\vec j + \\vec k$",
            "$5\\vec i + \\vec j - 2\\vec k$"
          ],
          "answer": 0,
          "explanation": "$\\vec x = \\frac{3\\vec a + \\vec a \\times \\vec b}{\\|\\vec a\\|^2} = \\frac{(3, 3, 0) + (2, -2, -2)}{2}$."
        },
        {
          "question": "The equation $\\vec x \\times (\\vec i + \\vec k) = \\vec j - \\vec k$",
          "options": [
            "has exactly one solution",
            "has the solution $\\vec x = \\vec j$",
            "has no solution",
            "is solved by every $\\vec x$"
          ],
          "answer": 2,
          "explanation": "$(\\vec i + \\vec k) \\cdot (\\vec j - \\vec k) = -1 \\ne 0$."
        },
        {
          "question": "Solving $3\\vec x + (\\vec x \\cdot \\vec b)\\vec a = \\vec c$ with $\\vec a = \\vec i - \\vec k$, $\\vec b = 2\\vec j + \\vec k$, $\\vec c = 6\\vec i + 3\\vec j$ gives",
          "options": [
            "$\\vec x = 2\\vec i + \\vec j$",
            "$\\vec x = \\vec i + \\vec j - \\vec k$",
            "$\\vec x = 3\\vec i + 3\\vec j + 3\\vec k$",
            "$\\vec x = \\vec i + \\vec j + \\vec k$"
          ],
          "answer": 3,
          "explanation": "Dot with $\\vec b$: $2(\\vec b \\cdot \\vec x) = 6$, so $\\vec b \\cdot \\vec x = 3$; then $3\\vec x = \\vec c - 3\\vec a = (3, 3, 3)$."
        },
        {
          "question": "If $p\\vec x + q\\vec y = \\vec a$ and $\\vec x \\times \\vec y = \\vec b$, then $\\vec a \\cdot \\vec b = $",
          "options": [
            "$\\|\\vec a\\|\\|\\vec b\\|$",
            "$0$",
            "$1$",
            "$p + q$"
          ],
          "answer": 1,
          "explanation": "$\\vec x \\times \\vec y$ is perpendicular to both $\\vec x$ and $\\vec y$, so to any combination of them."
        }
      ]
    },
    {
      "id": "QS004",
      "title": "Lines and planes",
      "questions": [
        {
          "question": "The line through $(1, 2, -3)$ parallel to $(3, -2, 4)$ is",
          "options": [
            "$\\frac{x + 1}{3} = \\frac{y + 2}{-2} = \\frac{z - 3}{4}$",
            "$\\frac{x - 1}{3} = \\frac{y - 2}{-2} = \\frac{z + 3}{4}$",
            "$\\frac{x - 3}{1} = \\frac{y + 2}{2} = \\frac{z - 4}{-3}$",
            "$\\frac{x - 1}{3} = \\frac{y - 2}{2} = \\frac{z + 3}{4}$"
          ],
          "answer": 1,
          "explanation": "Numerators give the point, denominators the direction."
        },
        {
          "question": "Does $(4, 0, 1)$ lie on $\\frac{x - 1}{3} = \\frac{y - 2}{-2} = \\frac{z + 3}{4}$?",
          "options": [
            "No",
            "Yes, at $\\lambda = 1$",
            "Yes, at $\\lambda = 3$",
            "Yes, at $\\lambda = -1$"
          ],
          "answer": 1,
          "explanation": "All three fractions equal $1$."
        },
        {
          "question": "Does $(7, 4, 0)$ lie on $\\vec r = (1, -2, -3) + \\lambda(2, 3, 1)$?",
          "options": [
            "Yes, at $\\lambda = 3$",
            "Yes, at $\\lambda = 2$",
            "Yes, at $\\lambda = -3$",
            "No: $x$ and $z$ need $\\lambda = 3$ but $y$ needs $\\lambda = 2$"
          ],
          "answer": 3,
          "explanation": "One $\\lambda$ must fit all three components."
        },
        {
          "question": "The locus $\\frac{3x + 1}{2} = \\frac{2 - y}{3} = \\frac{2z + 4}{5}$ is the line through",
          "options": [
            "$(1, 2, 4)$ parallel to $(2, 3, 5)$",
            "$(-1, 2, -4)$ parallel to $(2, -3, 5)$",
            "$\\left(-\\frac13, -2, -2\\right)$ parallel to $(2, 3, 5)$",
            "$\\left(-\\frac13, 2, -2\\right)$ parallel to $(4, -18, 15)$"
          ],
          "answer": 3,
          "explanation": "Set each fraction to $\\lambda$: $x = -\\frac13 + \\frac23\\lambda$, $y = 2 - 3\\lambda$, $z = -2 + \\frac52\\lambda$; the direction is $\\frac16(4, -18, 15)$."
        },
        {
          "question": "$\\vec a = (1, -2, 4)$, $\\vec b = (6, 3, -1)$ and $2\\vec{AP} = 3\\vec{PB}$. Then $\\vec r_P = $",
          "options": [
            "$(3, 0, 2)$",
            "$(7, 1, 3)$",
            "$(4, 1, 1)$",
            "$(5, 5, -5)$"
          ],
          "answer": 2,
          "explanation": "$5\\vec r = 2\\vec a + 3\\vec b = (20, 5, 5)$. $(3, 0, 2)$ swaps the weights."
        },
        {
          "question": "Skew lines are lines that",
          "options": [
            "are not parallel and never meet",
            "are parallel",
            "meet at a right angle",
            "lie in one plane"
          ],
          "answer": 0,
          "explanation": "They pass each other in space."
        },
        {
          "question": "$\\vec r_1 = (4, 2, -6) + \\mu(-8, 1, -2)$ and $\\vec r_2 = (-2, 1, -2) + \\lambda(-9, 2, 5)$ are",
          "options": [
            "intersecting at $\\mu = 3$",
            "skew",
            "parallel",
            "the same line"
          ],
          "answer": 1,
          "explanation": "Two equations give $\\lambda = 2$, $\\mu = 3$, but the $z$-equation gives $-12 \\ne 8$."
        },
        {
          "question": "The distance from $A(5, 4, 1)$ to the line $\\frac{x - 6}{5} = \\frac{y + 15}{1} = \\frac{z - 14}{8}$ is",
          "options": [
            "$441$",
            "$\\sqrt{21}$",
            "$9$",
            "$21$"
          ],
          "answer": 3,
          "explanation": "$\\frac{\\|\\vec{P_0A} \\times \\vec d\\|}{\\|\\vec d\\|} = \\sqrt{\\frac{39690}{90}} = \\sqrt{441}$."
        },
        {
          "question": "The line through $(-3, 2, 5)$ perpendicular to the $xy$-plane has direction",
          "options": [
            "$\\vec i$",
            "$\\vec i + \\vec j$",
            "$(-3, 2, 5)$",
            "$\\vec k$"
          ],
          "answer": 3,
          "explanation": "Perpendicular to the $xy$-plane means parallel to the $z$-axis."
        },
        {
          "question": "A normal to $3x - 2y + z + 1 = 0$ is",
          "options": [
            "$(1, 1, 1)$",
            "$(-3, 2, 1)$",
            "$(3, -2, 1)$",
            "$(3, -2, 1, 1)$"
          ],
          "answer": 2,
          "explanation": "The coefficients of $x$, $y$, $z$."
        },
        {
          "question": "The plane through $P(1, -2, 3)$ normal to $\\frac{x - 1}{4} = \\frac{y + 1}{-1} = \\frac z2$ is",
          "options": [
            "$4x - y + 2z - 12 = 0$",
            "$4x - y + 2z = 0$",
            "$x - 2y + 3z = 12$",
            "$4x - y + 2z + 12 = 0$"
          ],
          "answer": 0,
          "explanation": "$\\vec n = (4, -1, 2)$: $4(x - 1) - (y + 2) + 2(z - 3) = 0$."
        },
        {
          "question": "The plane through $A(1, 1, -2)$, $B(2, 5, 3)$, $C(-2, -1, 3)$ is",
          "options": [
            "$3x - 2y + z - 1 = 0$",
            "$x + y - 2z = 6$",
            "$3x - 2y + z + 1 = 0$",
            "$30x - 20y + 10z = 0$"
          ],
          "answer": 2,
          "explanation": "$\\vec n = \\vec{AB} \\times \\vec{AC} = (30, -20, 10) \\propto (3, -2, 1)$, and $3 - 2 - 2 = -1$."
        },
        {
          "question": "The plane through $(1, 2, 3)$, $(4, 1, 0)$, $(2, 5, -1)$ is",
          "options": [
            "$13x + 9y + 10z = 0$",
            "$x + 2y + 3z = 14$",
            "$13x + 9y + 10z = 61$",
            "$13x + 9y + 10z = 52$"
          ],
          "answer": 2,
          "explanation": "Normal $(3, -1, -3) \\times (1, 3, -4) = (13, 9, 10)$; substitute $(1, 2, 3)$."
        },
        {
          "question": "The plane through $A(1, 1, 2)$, $B(2, -5, 3)$, $C(2, 1, 3)$ has Cartesian equation",
          "options": [
            "$z - x = 1$",
            "$x - z = 1$",
            "$x + z = 3$",
            "$-6x + 6z = 0$"
          ],
          "answer": 0,
          "explanation": "$\\vec n = (1, -6, 1) \\times (1, 0, 1) = (-6, 0, 6)$, and $-1 + 2 = 1$."
        },
        {
          "question": "The line $\\frac{x - 1}{3} = \\frac{y + 2}{4} = \\frac{z - 5}{12}$ meets $2x - 6y + 3z = 8$ at",
          "options": [
            "$\\left(-\\frac52, -\\frac{20}{3}, -9\\right)$",
            "$\\left(\\frac92, \\frac83, 19\\right)$",
            "$(1, -2, 5)$",
            "$\\left(-\\frac32, -\\frac{16}{3}, -7\\right)$"
          ],
          "answer": 0,
          "explanation": "$29 + 18t = 8$ gives $t = -\\frac76$."
        },
        {
          "question": "The angle $\\theta$ between a line (direction $\\vec d$) and a plane (normal $\\vec n$) satisfies",
          "options": [
            "$\\cos\\theta = \\frac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\|\\vec n\\|}$",
            "$\\tan\\theta = \\frac{\\|\\vec d \\times \\vec n\\|}{\\vec d \\cdot \\vec n}$",
            "$\\theta = \\vec d \\cdot \\vec n$",
            "$\\sin\\theta = \\frac{|\\vec d \\cdot \\vec n|}{\\|\\vec d\\|\\|\\vec n\\|}$"
          ],
          "answer": 3,
          "explanation": "$\\vec n$ is at $90°$ to the plane, so the cosine with $\\vec n$ is the sine with the plane."
        },
        {
          "question": "The acute angle between $\\frac{x - 1}{3} = \\frac{y + 2}{4} = \\frac{z - 3}{12}$ and $2x - 6y + 3z = 8$ is about",
          "options": [
            "$78.59°$",
            "$0.20°$",
            "$11.41°$",
            "$90°$"
          ],
          "answer": 2,
          "explanation": "$\\sin\\theta = \\frac{18}{13 \\times 7}$. $78.59°$ is the angle with the normal."
        },
        {
          "question": "$\\frac{x + 1}{2} = \\frac{y - 3}{-1} = \\frac z4$ meets $2x - y + 4z - 7 = 0$ at",
          "options": [
            "$(-1, 3, 0)$",
            "$\\left(\\frac17, \\frac{17}{7}, \\frac{16}{7}\\right)$",
            "$\\left(\\frac{15}{7}, \\frac{11}{7}, \\frac{32}{7}\\right)$",
            "$\\left(\\frac47, \\frac{17}{7}, \\frac{16}{7}\\right)$"
          ],
          "answer": 1,
          "explanation": "$21t - 12 = 0$, so $t = \\frac47$."
        },
        {
          "question": "The acute angle between $\\frac{x + 1}{2} = \\frac{y - 3}{-1} = \\frac z4$ and $2x - y + 4z - 7 = 0$ is",
          "options": [
            "$0°$",
            "$90°$",
            "$45°$",
            "$60°$"
          ],
          "answer": 1,
          "explanation": "The direction $(2, -1, 4)$ equals the normal: the line is perpendicular to the plane."
        },
        {
          "question": "The planes $x - y + z + 8 = 0$ and $3x + 2y - z - 1 = 0$ are",
          "options": [
            "perpendicular",
            "parallel",
            "at $45°$",
            "the same plane"
          ],
          "answer": 0,
          "explanation": "$\\vec n_1 \\cdot \\vec n_2 = 3 - 2 - 1 = 0$."
        },
        {
          "question": "The acute angle between $5x - y - 2z = 5$ and $y = 0$ is about",
          "options": [
            "$79.48°$",
            "$10.52°$",
            "$63.43°$",
            "$90°$"
          ],
          "answer": 0,
          "explanation": "$\\cos\\theta = \\frac{1}{\\sqrt{30}}$."
        },
        {
          "question": "The line where $x - y + z - 3 = 0$ meets $x + y - 2z + 1 = 0$ has direction",
          "options": [
            "$(1, 3, 2)$",
            "$(2, 0, -1)$",
            "$(1, -1, -2)$",
            "$(1, -3, 2)$"
          ],
          "answer": 0,
          "explanation": "$\\vec n_1 \\times \\vec n_2 = (1, -1, 1) \\times (1, 1, -2) = (1, 3, 2)$."
        },
        {
          "question": "The distance from $P(2, -1, 4)$ to $3x - 2y + 6z - 12 = 0$ is",
          "options": [
            "$\\frac{32}{7}$",
            "$20$",
            "$\\frac{20}{7}$",
            "$\\frac{20}{49}$"
          ],
          "answer": 2,
          "explanation": "$\\frac{|6 + 2 + 24 - 12|}{\\sqrt{49}}$."
        },
        {
          "question": "The acute angle between $3x - 2y + 6z = 12$ and $2x - y + 2z = 5$ is about",
          "options": [
            "$72.25°$",
            "$17.75°$",
            "$0.95°$",
            "$0°$"
          ],
          "answer": 1,
          "explanation": "$\\cos\\theta = \\frac{20}{7 \\times 3} = \\frac{20}{21}$."
        },
        {
          "question": "$\\vec r(t) = t(3\\vec i + \\vec j - 2\\vec k)$ meets the plane $(\\vec r - \\vec i) \\cdot (2\\vec i - 3\\vec j + \\vec k) = 0$ at",
          "options": [
            "$(3, 1, -2)$",
            "$(1, 0, 0)$",
            "$(-6, -2, 4)$",
            "$(6, 2, -4)$"
          ],
          "answer": 3,
          "explanation": "$\\vec r \\cdot (2, -3, 1) = t = 2$."
        }
      ]
    },
    {
      "id": "QS005",
      "title": "Vector calculus",
      "questions": [
        {
          "question": "For $\\phi = x^2 + y^2 + xz$, $\\nabla\\phi = $",
          "options": [
            "$(2x + z,\\ 2y,\\ z)$",
            "$(2x + z,\\ 2y,\\ x)$",
            "$(2x,\\ 2y,\\ xz)$",
            "$2x + 2y + x$"
          ],
          "answer": 1,
          "explanation": "$\\frac{\\partial}{\\partial z}(xz) = x$ and $\\frac{\\partial}{\\partial x}(xz) = z$."
        },
        {
          "question": "For $\\phi = x^2 + y^2 + xz$, $\\nabla\\phi$ at $(2, -1, 3)$ is",
          "options": [
            "$(7, -2, 2)$",
            "$(7, -2, 3)$",
            "$(4, -2, 2)$",
            "$(5, -2, 2)$"
          ],
          "answer": 0,
          "explanation": "$(2 \\cdot 2 + 3,\\ 2(-1),\\ 2)$."
        },
        {
          "question": "For $\\phi = x^2 + y^2 + xz$, the directional derivative at $(2, -1, 3)$ along $\\vec i + 2\\vec j + \\vec k$ is",
          "options": [
            "$5$",
            "$\\sqrt6$",
            "$\\frac{5}{\\sqrt6}$",
            "$\\frac{9}{\\sqrt6}$"
          ],
          "answer": 2,
          "explanation": "$(7, -2, 2) \\cdot \\frac{(1, 2, 1)}{\\sqrt6} = \\frac{5}{\\sqrt6}$. Always use a unit vector."
        },
        {
          "question": "For $\\phi = 3x^2y - y^3z^2$, $\\nabla\\phi$ at $(1, -2, -1)$ is",
          "options": [
            "$-12\\vec i + 9\\vec j - 16\\vec k$",
            "$12\\vec i - 9\\vec j + 16\\vec k$",
            "$-12\\vec i - 9\\vec j - 16\\vec k$",
            "$-12\\vec i - 9\\vec j + 16\\vec k$"
          ],
          "answer": 2,
          "explanation": "$\\nabla\\phi = (6xy,\\ 3x^2 - 3y^2z^2,\\ -2y^3z)$."
        },
        {
          "question": "The directional derivative of $\\phi = 4e^{2x - y + z}$ at $(1, 1, -1)$ towards $(-3, 5, 6)$ is",
          "options": [
            "$\\frac{20}{9}$",
            "$-20$",
            "$-\\frac{20}{9}$",
            "$-\\frac{20}{81}$"
          ],
          "answer": 2,
          "explanation": "$\\nabla\\phi = (8, -4, 4)$ and $\\hat a = \\frac19(-4, 4, 7)$."
        },
        {
          "question": "The greatest rate of change of $\\phi = x^2y^3z^6$ at $(1, 1, 1)$ is",
          "options": [
            "$11$",
            "$7$",
            "$49$",
            "$\\sqrt{14}$"
          ],
          "answer": 1,
          "explanation": "$\\|\\nabla\\phi\\| = \\|(2, 3, 6)\\| = 7$."
        },
        {
          "question": "$\\nabla\\phi$ points in the direction in which $\\phi$",
          "options": [
            "decreases fastest",
            "increases fastest",
            "stays constant",
            "is zero"
          ],
          "answer": 1,
          "explanation": "Its length is that fastest rate; it is perpendicular to the level surfaces."
        },
        {
          "question": "With $\\vec r = x\\vec i + y\\vec j + z\\vec k$ and $r = \\|\\vec r\\|$, $\\nabla r^2 = $",
          "options": [
            "$2\\vec r$",
            "$\\vec r$",
            "$2r$",
            "$2$"
          ],
          "answer": 0,
          "explanation": "$\\nabla(x^2 + y^2 + z^2) = (2x, 2y, 2z)$."
        },
        {
          "question": "$\\nabla\\left(\\frac1r\\right) = $",
          "options": [
            "$\\frac{\\vec r}{r^3}$",
            "$-\\frac{1}{r^2}$",
            "$-\\frac{\\vec r}{r^3}$",
            "$-\\frac{\\vec r}{r^2}$"
          ],
          "answer": 2,
          "explanation": "$\\nabla r^n = nr^{n - 2}\\vec r$ with $n = -1$."
        },
        {
          "question": "$\\nabla(\\ln r) = $",
          "options": [
            "$\\frac{\\vec r}{r}$",
            "$\\frac1r$",
            "$-\\frac{\\vec r}{r^2}$",
            "$\\frac{\\vec r}{r^2}$"
          ],
          "answer": 3,
          "explanation": "$\\frac{\\partial}{\\partial x}\\left(\\frac12\\ln(x^2 + y^2 + z^2)\\right) = \\frac{x}{r^2}$."
        },
        {
          "question": "For $\\vec A = x^2z^2\\vec i - 2y^2z^2\\vec j + xy^2z\\vec k$, $\\nabla \\cdot \\vec A$ at $(1, -1, 1)$ is",
          "options": [
            "$-1$",
            "$3$",
            "$7$",
            "$5$"
          ],
          "answer": 2,
          "explanation": "$2xz^2 - 4yz^2 + xy^2 = 2 + 4 + 1$."
        },
        {
          "question": "A vector field $\\vec V$ is solenoidal when",
          "options": [
            "$\\nabla \\cdot \\vec V = 0$",
            "$\\nabla \\times \\vec V = \\vec 0$",
            "$\\vec V = \\nabla\\phi$",
            "$\\nabla^2\\vec V = \\vec 0$"
          ],
          "answer": 0,
          "explanation": "No sources or sinks: zero divergence."
        },
        {
          "question": "$\\vec V = (3x - 4y)\\vec i + (3z - 4y)\\vec j + (2x + \\lambda z)\\vec k$ is solenoidal when",
          "options": [
            "$\\lambda = -1$",
            "$\\lambda = 7$",
            "$\\lambda = 0$",
            "$\\lambda = 1$"
          ],
          "answer": 3,
          "explanation": "$3 - 4 + \\lambda = 0$."
        },
        {
          "question": "$\\nabla \\cdot (x\\vec i) = $",
          "options": [
            "$1$",
            "$0$",
            "$x$",
            "$\\vec i$"
          ],
          "answer": 0,
          "explanation": "$\\frac{\\partial x}{\\partial x} = 1$."
        },
        {
          "question": "$\\nabla \\times (-y\\vec i + x\\vec j) = $",
          "options": [
            "$2\\vec k$",
            "$\\vec 0$",
            "$-2\\vec k$",
            "$2$"
          ],
          "answer": 0,
          "explanation": "$\\vec k\\left(\\frac{\\partial x}{\\partial x} - \\frac{\\partial(-y)}{\\partial y}\\right) = 2\\vec k$."
        },
        {
          "question": "For $\\vec A = x^2z^2\\vec i - 2y^2z^2\\vec j + xy^2z\\vec k$, $\\nabla \\times \\vec A$ at $(1, -1, 1)$ is",
          "options": [
            "$2\\vec i + \\vec j$",
            "$-2\\vec i + \\vec j$",
            "$2\\vec i - \\vec j$",
            "$7\\vec k$"
          ],
          "answer": 0,
          "explanation": "$\\nabla \\times \\vec A = (2xyz + 4y^2z)\\vec i + (2x^2z - y^2z)\\vec j$."
        },
        {
          "question": "$\\vec F$ is irrotational when",
          "options": [
            "$\\nabla \\cdot \\vec F = 0$",
            "$\\nabla^2\\vec F = \\vec 0$",
            "$\\nabla \\times \\vec F = \\vec 0$",
            "$\\|\\vec F\\| = 1$"
          ],
          "answer": 2,
          "explanation": "No rotation: zero curl."
        },
        {
          "question": "$\\vec V = (-4x - 3y + \\alpha z)\\vec i + (\\beta x + 3y + 5z)\\vec j + (4x + \\gamma y + 3z)\\vec k$ is irrotational when",
          "options": [
            "$\\alpha = -4,\\ \\beta = 3,\\ \\gamma = -5$",
            "$\\alpha = 4,\\ \\beta = -3,\\ \\gamma = 5$",
            "$\\alpha = 4,\\ \\beta = 3,\\ \\gamma = 5$",
            "$\\alpha = 3,\\ \\beta = -4,\\ \\gamma = 5$"
          ],
          "answer": 1,
          "explanation": "$\\nabla \\times \\vec V = (\\gamma - 5)\\vec i - (4 - \\alpha)\\vec j + (\\beta + 3)\\vec k$."
        },
        {
          "question": "A potential for $\\vec F = (6xy + z^3)\\vec i + (3x^2 - z)\\vec j + (3xz^2 - y)\\vec k$ is",
          "options": [
            "$3x^2y + xz^3 + C$",
            "$6xy + z^3 - yz + C$",
            "$x^2y + xz^3 - yz + C$",
            "$3x^2y + xz^3 - yz + C$"
          ],
          "answer": 3,
          "explanation": "Check: $\\phi_x = 6xy + z^3$, $\\phi_y = 3x^2 - z$, $\\phi_z = 3xz^2 - y$."
        },
        {
          "question": "For any smooth $\\phi$, $\\nabla \\times (\\nabla\\phi) = $",
          "options": [
            "$\\nabla^2\\phi$",
            "$\\vec 0$",
            "$\\nabla\\phi$",
            "$1$"
          ],
          "answer": 1,
          "explanation": "Mixed partials cancel: curl grad is zero."
        },
        {
          "question": "For any smooth $\\vec A$, $\\nabla \\cdot (\\nabla \\times \\vec A) = $",
          "options": [
            "$\\nabla^2\\vec A$",
            "$\\nabla \\times \\vec A$",
            "$\\|\\vec A\\|$",
            "$0$"
          ],
          "answer": 3,
          "explanation": "div curl is zero."
        },
        {
          "question": "For $\\vec r \\ne \\vec 0$, $\\nabla^2\\left(\\frac1r\\right) = $",
          "options": [
            "$-\\frac{1}{r^3}$",
            "$3$",
            "$\\frac{1}{r^2}$",
            "$0$"
          ],
          "answer": 3,
          "explanation": "$\\nabla \\cdot \\left(-\\frac{\\vec r}{r^3}\\right) = 0$: $\\frac1r$ is harmonic."
        },
        {
          "question": "$\\nabla \\cdot \\vec r = $",
          "options": [
            "$0$",
            "$1$",
            "$r$",
            "$3$"
          ],
          "answer": 3,
          "explanation": "$\\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial z}{\\partial z} = 3$."
        },
        {
          "question": "For $\\phi = 6x^3y^2z$, $\\nabla^2\\phi = $",
          "options": [
            "$18x^2y^2z + 12x^3yz + 6x^3y^2$",
            "$36xy^2z + 12x^3z$",
            "$36xy^2z$",
            "$36xy^2z + 12x^3z + 6x^3$"
          ],
          "answer": 1,
          "explanation": "$\\phi_{xx} = 36xy^2z$, $\\phi_{yy} = 12x^3z$, $\\phi_{zz} = 0$."
        },
        {
          "question": "If $\\vec F$ and $\\vec G$ are irrotational, then $\\vec F \\times \\vec G$ is",
          "options": [
            "solenoidal",
            "irrotational",
            "zero",
            "a gradient"
          ],
          "answer": 0,
          "explanation": "$\\nabla \\cdot (\\vec F \\times \\vec G) = \\vec G \\cdot (\\nabla \\times \\vec F) - \\vec F \\cdot (\\nabla \\times \\vec G) = 0$."
        }
      ]
    },
    {
      "id": "QS006",
      "title": "Curves and the Serret–Frenet formulas",
      "questions": [
        {
          "question": "The domain of $\\vec r(t) = \\sqrt{2 - t}\\,\\vec i + \\ln(t + 3)\\,\\vec j + e^t\\vec k$ is",
          "options": [
            "$(-3, 2]$",
            "$[-3, 2]$",
            "$(-3, 2)$",
            "$(-\\infty, 2]$"
          ],
          "answer": 0,
          "explanation": "$t \\le 2$ from the root, $t > -3$ from the log."
        },
        {
          "question": "The domain of $\\vec r(t) = 3\\tan t\\,\\vec i + 4\\sec t\\,\\vec j + 5t\\,\\vec k$ is",
          "options": [
            "all real $t$",
            "all $t$ except $k\\pi$",
            "all $t$ except $\\frac\\pi2(2k + 1)$, $k \\in \\mathbb Z$",
            "$t > 0$"
          ],
          "answer": 2,
          "explanation": "$\\tan$ and $\\sec$ need $\\cos t \\ne 0$."
        },
        {
          "question": "The graph of $\\vec r(t) = 4\\cos t\\,\\vec i + 3\\sin t\\,\\vec j$, $0 \\le t \\le 2\\pi$, is",
          "options": [
            "the ellipse $\\frac{x^2}{16} + \\frac{y^2}{9} = 1$",
            "a circle of radius $4$",
            "the hyperbola $\\frac{x^2}{16} - \\frac{y^2}{9} = 1$",
            "the ellipse $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$"
          ],
          "answer": 0,
          "explanation": "$\\left(\\frac x4\\right)^2 + \\left(\\frac y3\\right)^2 = \\cos^2t + \\sin^2t = 1$."
        },
        {
          "question": "As $t$ increases, $4\\cos t\\,\\vec i + 3\\sin t\\,\\vec j$ traces its ellipse",
          "options": [
            "clockwise",
            "anticlockwise",
            "back and forth",
            "from left to right only"
          ],
          "answer": 1,
          "explanation": "At $t = 0$ it is at $(4, 0)$, at $t = \\frac\\pi2$ at $(0, 3)$."
        },
        {
          "question": "The curve $\\vec r(t) = 4\\cos t\\,\\vec i + 4\\sin t\\,\\vec j + t\\,\\vec k$ is",
          "options": [
            "a circle",
            "an ellipse",
            "a straight line",
            "a helix"
          ],
          "answer": 3,
          "explanation": "A circle of radius $4$ lifted steadily by the $\\vec k$-component."
        },
        {
          "question": "$4\\cos(t^2)\\,\\vec i + 3\\sin(t^2)\\,\\vec j$, $0 \\le t \\le \\sqrt{2\\pi}$, traces",
          "options": [
            "a different, smaller ellipse",
            "half of that ellipse",
            "the same ellipse as $4\\cos t\\,\\vec i + 3\\sin t\\,\\vec j$",
            "a spiral"
          ],
          "answer": 2,
          "explanation": "Put $s = t^2$, which runs from $0$ to $2\\pi$: a reparametrization."
        },
        {
          "question": "A vector function tracing $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$ is",
          "options": [
            "$3\\cos t\\,\\vec i + 5\\sin t\\,\\vec j$",
            "$9\\cos t\\,\\vec i + 25\\sin t\\,\\vec j$",
            "$5\\cos t\\,\\vec i + 3\\sin t\\,\\vec j$",
            "$3\\sec t\\,\\vec i + 5\\tan t\\,\\vec j$"
          ],
          "answer": 0,
          "explanation": "$\\left(\\frac x3\\right)^2 + \\left(\\frac y5\\right)^2 = 1$."
        },
        {
          "question": "A vector function tracing $x^2 + y^2 = 4$ is",
          "options": [
            "$2\\cos t\\,\\vec i + 2\\sin t\\,\\vec j$",
            "$4\\cos t\\,\\vec i + 4\\sin t\\,\\vec j$",
            "$\\cos t\\,\\vec i + \\sin t\\,\\vec j$",
            "$2\\sec t\\,\\vec i + 2\\tan t\\,\\vec j$"
          ],
          "answer": 0,
          "explanation": "Radius $2$."
        },
        {
          "question": "A vector function tracing $\\frac{x^2}{25} - \\frac{y^2}{16} = 1$ is",
          "options": [
            "$5\\cos t\\,\\vec i + 4\\sin t\\,\\vec j$",
            "$25\\sec t\\,\\vec i + 16\\tan t\\,\\vec j$",
            "$4\\sec t\\,\\vec i + 5\\tan t\\,\\vec j$",
            "$5\\sec t\\,\\vec i + 4\\tan t\\,\\vec j$"
          ],
          "answer": 3,
          "explanation": "Match $\\sec^2t - \\tan^2t = 1$."
        },
        {
          "question": "A vector function for $y = x^2 - 3x$ is",
          "options": [
            "$(t^2 - 3t)\\,\\vec i + t\\,\\vec j$",
            "$t^2\\,\\vec i - 3t\\,\\vec j$",
            "$\\cos t\\,\\vec i + \\sin t\\,\\vec j$",
            "$t\\,\\vec i + (t^2 - 3t)\\,\\vec j$"
          ],
          "answer": 3,
          "explanation": "Put $x = t$."
        },
        {
          "question": "The graph of $\\vec r(t) = t\\,\\vec i + t^3\\,\\vec j$ is",
          "options": [
            "the curve $x = y^3$",
            "the line $y = 3x$",
            "the curve $y = x^3$",
            "the parabola $y = x^2$"
          ],
          "answer": 2,
          "explanation": "$x = t$, $y = t^3$."
        },
        {
          "question": "$\\lim_{t \\to 3}\\left[(t^2 - 3t + 4)\\vec i + (4t + 3)\\vec j\\right] = $",
          "options": [
            "$22\\vec i + 15\\vec j$",
            "$4\\vec i + 12\\vec j$",
            "$4\\vec i + 15\\vec j$",
            "$19$"
          ],
          "answer": 2,
          "explanation": "Component by component: $9 - 9 + 4$ and $12 + 3$."
        },
        {
          "question": "$\\lim_{t \\to 3}\\left[\\frac{2t - 4}{t + 1}\\vec i + \\frac{t}{t^2 + 1}\\vec j + (4t - 3)\\vec k\\right] = $",
          "options": [
            "$\\frac12\\vec i + \\frac34\\vec j + 9\\vec k$",
            "$2\\vec i + \\frac{3}{10}\\vec j + 9\\vec k$",
            "$\\frac12\\vec i + \\frac{3}{10}\\vec j + 9\\vec k$",
            "$\\frac12\\vec i + \\frac{3}{10}\\vec j + 15\\vec k$"
          ],
          "answer": 2,
          "explanation": "$\\frac24$, $\\frac{3}{10}$, $12 - 3$."
        },
        {
          "question": "$\\lim_{t \\to 2}\\left[\\sqrt{t^2 + 3t - 1}\\,\\vec i - (4t - 3)\\,\\vec j - \\sin\\frac{(t + 1)\\pi}{2}\\,\\vec k\\right] = $",
          "options": [
            "$3\\vec i - 5\\vec j - \\vec k$",
            "$3\\vec i - 5\\vec j + \\vec k$",
            "$9\\vec i - 5\\vec j + \\vec k$",
            "$3\\vec i + 5\\vec j + \\vec k$"
          ],
          "answer": 1,
          "explanation": "$\\sqrt9 = 3$, $-(8 - 3) = -5$, $-\\sin\\frac{3\\pi}{2} = 1$."
        },
        {
          "question": "$\\vec r(t)$ is continuous at $t = a$ when",
          "options": [
            "$\\vec r(a)$ exists",
            "$\\vec r(a)$ exists, $\\lim_{t \\to a}\\vec r(t)$ exists, and they are equal",
            "the limit exists",
            "every component is a polynomial"
          ],
          "answer": 1,
          "explanation": "All three conditions are needed."
        },
        {
          "question": "$3\\tan t\\,\\vec i + 4\\sec t\\,\\vec j + 5t\\,\\vec k$ is not continuous at $t = \\frac\\pi2$ because",
          "options": [
            "$\\vec r\\left(\\frac\\pi2\\right)$ does not exist",
            "$5t$ is not continuous",
            "the limit is $\\vec 0$",
            "$\\sec t$ is never continuous"
          ],
          "answer": 0,
          "explanation": "$\\tan$ and $\\sec$ are undefined at $\\frac\\pi2$."
        },
        {
          "question": "The unit tangent of $\\vec r(t) = (\\cos t, \\sin t, t)$ is",
          "options": [
            "$\\frac{1}{\\sqrt2}(-\\sin t, \\cos t, 1)$",
            "$(-\\sin t, \\cos t, 1)$",
            "$(-\\cos t, -\\sin t, 0)$",
            "$\\frac{1}{\\sqrt2}(\\cos t, \\sin t, t)$"
          ],
          "answer": 0,
          "explanation": "$\\vec r\\,' = (-\\sin t, \\cos t, 1)$ has length $\\sqrt2$."
        },
        {
          "question": "The curvature of $\\vec r(t)$ is",
          "options": [
            "$\\kappa = \\frac{\\|\\vec r\\,' \\times \\vec r\\,''\\|}{\\|\\vec r\\,'\\|^2}$",
            "$\\kappa = \\frac{\\|\\vec r\\,' \\times \\vec r\\,''\\|}{\\|\\vec r\\,'\\|^3}$",
            "$\\kappa = \\frac{(\\vec r\\,' \\times \\vec r\\,'') \\cdot \\vec r\\,'''}{\\|\\vec r\\,'\\|^3}$",
            "$\\kappa = \\|\\vec r\\,''\\|$"
          ],
          "answer": 1,
          "explanation": "$\\kappa = \\left\\|\\frac{d\\vec u}{ds}\\right\\|$ works out to this."
        },
        {
          "question": "The torsion of $\\vec r(t)$ is",
          "options": [
            "$\\tau = \\frac{\\|\\vec r\\,' \\times \\vec r\\,''\\|}{\\|\\vec r\\,'\\|^3}$",
            "$\\tau = \\frac{(\\vec r\\,' \\times \\vec r\\,'') \\cdot \\vec r\\,'''}{\\|\\vec r\\,'\\|^3}$",
            "$\\tau = \\|\\vec r\\,'''\\|$",
            "$\\tau = \\frac{(\\vec r\\,' \\times \\vec r\\,'') \\cdot \\vec r\\,'''}{\\|\\vec r\\,' \\times \\vec r\\,''\\|^2}$"
          ],
          "answer": 3,
          "explanation": "The triple product over the squared length of the cross product."
        },
        {
          "question": "The first Serret–Frenet formula is",
          "options": [
            "$\\frac{d\\vec u}{ds} = \\tau\\vec n$",
            "$\\frac{d\\vec u}{ds} = \\kappa\\vec b$",
            "$\\frac{d\\vec u}{ds} = -\\kappa\\vec n$",
            "$\\frac{d\\vec u}{ds} = \\kappa\\vec n$"
          ],
          "answer": 3,
          "explanation": "The tangent turns towards the principal normal at rate $\\kappa$."
        },
        {
          "question": "$\\frac{d\\vec b}{ds} = $",
          "options": [
            "$\\tau\\vec n$",
            "$-\\tau\\vec n$",
            "$\\kappa\\vec n$",
            "$-\\tau\\vec u$"
          ],
          "answer": 1,
          "explanation": "$\\frac{d\\vec b}{ds}$ is perpendicular to $\\vec b$ and $\\vec u$, so it is along $\\vec n$."
        },
        {
          "question": "$\\frac{d\\vec n}{ds} = $",
          "options": [
            "$\\kappa\\vec u - \\tau\\vec b$",
            "$-\\kappa\\vec u - \\tau\\vec b$",
            "$-\\kappa\\vec u + \\tau\\vec b$",
            "$\\tau\\vec u + \\kappa\\vec b$"
          ],
          "answer": 2,
          "explanation": "Differentiate $\\vec n = \\vec b \\times \\vec u$."
        },
        {
          "question": "The curvature of the helix $\\vec r(t) = (\\cos t, \\sin t, t)$ is",
          "options": [
            "$1$",
            "$\\frac{1}{\\sqrt2}$",
            "$0$",
            "$\\frac12$"
          ],
          "answer": 3,
          "explanation": "$\\kappa = \\frac{a}{a^2 + c^2}$ with $a = c = 1$."
        },
        {
          "question": "For $x = t$, $y = t^2$, $z = \\frac23t^3$ at $t = 0$:",
          "options": [
            "$\\kappa = 2$, $\\tau = 0$",
            "$\\kappa = \\tau = 2$",
            "$\\kappa = \\tau = 0$",
            "$\\kappa = \\tau = 1$"
          ],
          "answer": 1,
          "explanation": "$\\kappa = \\tau = \\frac{2}{(1 + 2t^2)^2}$."
        },
        {
          "question": "A curve lying in a single plane has torsion",
          "options": [
            "$\\tau = 0$",
            "$\\tau = \\kappa$",
            "$\\tau = 1$",
            "$\\tau = \\frac1\\kappa$"
          ],
          "answer": 0,
          "explanation": "It never twists out of its plane: $\\vec b$ is constant."
        }
      ]
    },
    {
      "id": "QS007",
      "title": "Exam focus",
      "questions": [
        {
          "question": "Solve for $\\vec x$: $3\\vec x - 2\\vec y = 4\\vec i - \\vec j + 5\\vec k$ and $\\vec x + \\vec y = 3\\vec i + 2\\vec j - \\vec k$.",
          "options": [
            "$\\vec x = 10\\vec i + 3\\vec j + 3\\vec k$",
            "$\\vec x = \\vec i + \\frac75\\vec j - \\frac85\\vec k$",
            "$\\vec x = 2\\vec i - \\frac35\\vec j + \\frac35\\vec k$",
            "$\\vec x = 2\\vec i + \\frac35\\vec j + \\frac35\\vec k$"
          ],
          "answer": 3,
          "explanation": "Add twice the second to the first: $5\\vec x = (10, 3, 3)$."
        },
        {
          "question": "From the same system ($3\\vec x - 2\\vec y = 4\\vec i - \\vec j + 5\\vec k$, $\\vec x + \\vec y = 3\\vec i + 2\\vec j - \\vec k$), $\\vec y = $",
          "options": [
            "$2\\vec i + \\frac35\\vec j + \\frac35\\vec k$",
            "$\\vec i + \\frac75\\vec j - \\frac85\\vec k$",
            "$\\vec i - \\frac75\\vec j + \\frac85\\vec k$",
            "$5\\vec i + 7\\vec j - 8\\vec k$"
          ],
          "answer": 1,
          "explanation": "$\\vec y = (3, 2, -1) - \\left(2, \\frac35, \\frac35\\right)$."
        },
        {
          "question": "Given $p\\vec x + q\\vec y = \\vec a$ and $\\vec x \\times \\vec y = \\vec b$, why is $\\vec a \\cdot \\vec b = 0$?",
          "options": [
            "$\\vec x \\times \\vec y$ is perpendicular to both $\\vec x$ and $\\vec y$",
            "$\\vec x$ and $\\vec y$ are perpendicular",
            "$p$ and $q$ are zero",
            "$\\vec a$ is a unit vector"
          ],
          "answer": 0,
          "explanation": "$\\vec a \\cdot \\vec b = p\\,\\vec x \\cdot (\\vec x \\times \\vec y) + q\\,\\vec y \\cdot (\\vec x \\times \\vec y) = 0 + 0$."
        },
        {
          "question": "The tetrahedron with vertices $A = 2\\vec i - \\vec j$, $B = 3\\vec i + 4\\vec j + p\\vec k$, $C = 5\\vec i + 7\\vec j + 2\\vec k$, $D = 2(\\vec i + \\vec j + \\vec k)$ has volume",
          "options": [
            "$|9p - 20|$",
            "$\\frac16|9p + 20|$",
            "$\\frac16|9p - 20|$",
            "$\\frac16|p - 20|$"
          ],
          "answer": 2,
          "explanation": "Edges from $A$: $(1, 5, p)$, $(3, 8, 2)$, $(0, 3, 2)$; determinant $10 - 30 + 9p$."
        },
        {
          "question": "For the same four points, they are coplanar when $p = $",
          "options": [
            "$-\\frac{20}{9}$",
            "$20$",
            "$\\frac{9}{20}$",
            "$\\frac{20}{9}$"
          ],
          "answer": 3,
          "explanation": "$9p - 20 = 0$."
        },
        {
          "question": "The line $\\frac{x + 1}{2} = \\frac{y - 3}{-1} = \\frac z4$ meets the plane $2x - y + 4z - 7 = 0$ at",
          "options": [
            "$(-1, 3, 0)$",
            "$\\left(\\frac17, \\frac{17}{7}, \\frac{16}{7}\\right)$",
            "$\\left(\\frac17, \\frac{11}{7}, \\frac{16}{7}\\right)$",
            "$(1, 2, 4)$"
          ],
          "answer": 1,
          "explanation": "$2(-1 + 2t) - (3 - t) + 16t - 7 = 21t - 12 = 0$."
        },
        {
          "question": "The acute angle between $\\frac{x + 1}{2} = \\frac{y - 3}{-1} = \\frac z4$ and $2x - y + 4z - 7 = 0$ is",
          "options": [
            "$90°$",
            "$0°$",
            "$30°$",
            "$60°$"
          ],
          "answer": 0,
          "explanation": "$\\vec d = \\vec n = (2, -1, 4)$, so $\\sin\\theta = 1$."
        },
        {
          "question": "A vector parametric equation of the plane through $A(1, 1, 2)$, $B(2, -5, 3)$, $C(2, 1, 3)$ is",
          "options": [
            "$\\vec r = (1, 1, 2) + s(2, -5, 3) + t(2, 1, 3)$",
            "$\\vec r = (1, 1, 2) + s(1, -6, 1) + t(1, 0, 1)$",
            "$\\vec r = s(1, -6, 1) + t(1, 0, 1)$",
            "$\\vec r = (1, 1, 2) + s(-6, 0, 6)$"
          ],
          "answer": 1,
          "explanation": "A point plus two edges from it. The second option uses position vectors instead of edges."
        },
        {
          "question": "The unit vector in the direction of $\\vec{AB}$ for $A(1, -2, 3)$, $B(4, 2, -9)$ is",
          "options": [
            "$\\frac{1}{13}(3, 4, -12)$",
            "$\\frac{1}{13}(5, 0, -6)$",
            "$\\frac{1}{169}(3, 4, -12)$",
            "$\\frac{1}{11}(3, 4, -12)$"
          ],
          "answer": 0,
          "explanation": "$\\vec{AB} = (3, 4, -12)$, length $13$."
        },
        {
          "question": "The direction cosines of $3\\vec i - 6\\vec j + 2\\vec k$ are",
          "options": [
            "$\\frac3{11}, -\\frac6{11}, \\frac2{11}$",
            "$3, -6, 2$",
            "$\\frac37, \\frac67, \\frac27$",
            "$\\frac37, -\\frac67, \\frac27$"
          ],
          "answer": 3,
          "explanation": "Length $\\sqrt{49} = 7$."
        },
        {
          "question": "The angle between $\\vec i + 2\\vec j - \\vec k$ and $2\\vec i - \\vec j + 3\\vec k$ is about",
          "options": [
            "$70.89°$",
            "$19.11°$",
            "$109.11°$",
            "$90°$"
          ],
          "answer": 2,
          "explanation": "$\\cos\\theta = \\frac{-3}{\\sqrt6\\sqrt{14}} \\approx -0.327$: obtuse."
        },
        {
          "question": "For $\\phi = x^2yz - 4xyz^2$, the directional derivative at $(1, 3, 1)$ along $2\\vec i - \\vec j - 2\\vec k$ is",
          "options": [
            "$33$",
            "$-11$",
            "$11$",
            "$\\frac{11}{3}$"
          ],
          "answer": 2,
          "explanation": "$\\nabla\\phi = (-6, -3, -21)$ and $\\hat a = \\frac13(2, -1, -2)$."
        },
        {
          "question": "The line of intersection of $2x - y + z = 4$ and $x + 2y - z = 1$ is",
          "options": [
            "$\\vec r = (2, -1, 1) + t(1, 2, -1)$",
            "$\\vec r = \\left(\\frac95, -\\frac25, 0\\right) + t(-1, 3, 5)$",
            "$\\vec r = \\left(\\frac95, -\\frac25, 0\\right) + t(3, 1, 0)$",
            "$\\vec r = (4, 1, 0) + t(-1, 3, 5)$"
          ],
          "answer": 1,
          "explanation": "A point from $z = 0$; direction $\\vec n_1 \\times \\vec n_2$."
        },
        {
          "question": "The general solution of $\\vec x \\times (2\\vec i - \\vec j + \\vec k) = \\vec i + 3\\vec j + \\vec k$ is",
          "options": [
            "$\\frac16(4\\vec i + \\vec j - 7\\vec k) + \\lambda(2\\vec i - \\vec j + \\vec k)$",
            "$\\frac16(-4\\vec i - \\vec j + 7\\vec k) + \\lambda(\\vec i + 3\\vec j + \\vec k)$",
            "no solution",
            "$\\frac16(-4\\vec i - \\vec j + 7\\vec k) + \\lambda(2\\vec i - \\vec j + \\vec k)$"
          ],
          "answer": 3,
          "explanation": "$\\vec a \\cdot \\vec b = 0$, $\\vec a \\times \\vec b = (-4, -1, 7)$, $\\|\\vec a\\|^2 = 6$."
        },
        {
          "question": "For $\\vec r(t) = 3\\cos t\\,\\vec i + 3\\sin t\\,\\vec j + 4t\\,\\vec k$, the curvature and torsion are",
          "options": [
            "$\\kappa = \\frac{3}{25}$, $\\tau = \\frac{4}{25}$",
            "$\\kappa = \\frac{4}{25}$, $\\tau = \\frac{3}{25}$",
            "$\\kappa = \\frac35$, $\\tau = \\frac45$",
            "$\\kappa = \\frac13$, $\\tau = 0$"
          ],
          "answer": 0,
          "explanation": "$\\kappa = \\frac{a}{a^2 + c^2}$, $\\tau = \\frac{c}{a^2 + c^2}$ with $a = 3$, $c = 4$."
        },
        {
          "question": "The area of the triangle $O(0, 0, 0)$, $A(2, 0, 0)$, $B(0, 3, 0)$ is",
          "options": [
            "$3$",
            "$6$",
            "$\\frac{\\sqrt{13}}{2}$",
            "$5$"
          ],
          "answer": 0,
          "explanation": "$\\frac12\\|(0, 0, 6)\\|$."
        },
        {
          "question": "A force $\\vec F = 2\\vec j$ acts at $A(1, 0, 0)$. Its moment about the origin is",
          "options": [
            "$-2\\vec k$",
            "$2\\vec k$",
            "$2$",
            "$\\vec 0$"
          ],
          "answer": 1,
          "explanation": "$\\vec i \\times 2\\vec j = 2\\vec k$."
        },
        {
          "question": "Forces $4\\vec i + 3\\vec j - 3\\vec k$ and $3\\vec i + \\vec j - \\vec k$ move a particle from $(1, 2, 1)$ to $(5, 4, 1)$. The work done is",
          "options": [
            "$32$ J",
            "$22$ J",
            "$14$ J",
            "$36$ J"
          ],
          "answer": 3,
          "explanation": "$(7, 4, -4) \\cdot (4, 2, 0) = 36$."
        },
        {
          "question": "$\\vec V = (x + 3y)\\vec i + (y - 2z)\\vec j + (x + az)\\vec k$ is solenoidal when",
          "options": [
            "$a = 2$",
            "$a = 0$",
            "$a = -2$",
            "$a = -1$"
          ],
          "answer": 2,
          "explanation": "$1 + 1 + a = 0$."
        },
        {
          "question": "A potential for $\\vec F = 2xy\\,\\vec i + (x^2 + z)\\,\\vec j + y\\,\\vec k$ is",
          "options": [
            "$x^2y + z + C$",
            "$2xy + x^2 + z + y$",
            "$x^2y + xz + C$",
            "$x^2y + yz + C$"
          ],
          "answer": 3,
          "explanation": "$\\phi_x = 2xy$, $\\phi_y = x^2 + z$, $\\phi_z = y$ ✓."
        },
        {
          "question": "$\\vec r_1 = (1, 0, 0) + s(1, 1, 0)$ and $\\vec r_2 = (0, 1, 0) + t(1, -1, 0)$ meet at",
          "options": [
            "$(0, 1, 0)$",
            "$(1, 0, 0)$",
            "$(2, 1, 0)$",
            "They are skew"
          ],
          "answer": 1,
          "explanation": "$1 + s = t$ and $s = 1 - t$ give $t = 1$, $s = 0$; the $z$-equation $0 = 0$ holds."
        },
        {
          "question": "A unit vector perpendicular to both $(1, 1, 0)$ and $(0, 1, 1)$ is",
          "options": [
            "$\\frac{1}{\\sqrt3}(1, 1, 1)$",
            "$(1, -1, 1)$",
            "$\\frac{1}{\\sqrt3}(1, -1, 1)$",
            "$\\frac12(1, 2, 1)$"
          ],
          "answer": 2,
          "explanation": "$(1, 1, 0) \\times (0, 1, 1) = (1, -1, 1)$, length $\\sqrt3$."
        },
        {
          "question": "The scalar projection of $(3, -2, 4)$ onto $(1, 5, -1)$ is",
          "options": [
            "$-\\frac{11}{27}$",
            "$\\frac{11}{\\sqrt{27}}$",
            "$-\\frac{11}{\\sqrt{27}}$",
            "$-\\frac{11}{\\sqrt{29}}$"
          ],
          "answer": 2,
          "explanation": "$\\frac{-11}{\\|(1, 5, -1)\\|}$."
        },
        {
          "question": "$(\\vec a \\times \\vec b) \\times \\vec c = $",
          "options": [
            "$\\vec b(\\vec a \\cdot \\vec c) - \\vec a(\\vec b \\cdot \\vec c)$",
            "$\\vec b(\\vec a \\cdot \\vec c) - \\vec c(\\vec a \\cdot \\vec b)$",
            "$\\vec a(\\vec b \\cdot \\vec c) - \\vec b(\\vec a \\cdot \\vec c)$",
            "$\\vec a \\times (\\vec b \\times \\vec c)$"
          ],
          "answer": 0,
          "explanation": "$(\\vec a \\times \\vec b) \\times \\vec c = -\\vec c \\times (\\vec a \\times \\vec b)$, then BAC − CAB."
        },
        {
          "question": "The angle between the line $\\frac{x - 1}{3} = \\frac{y + 2}{4} = \\frac{z - 3}{12}$ and the plane $2x - 6y + 3z = 8$ uses",
          "options": [
            "$\\sin\\theta = \\frac{18}{91}$",
            "$\\cos\\theta = \\frac{18}{91}$",
            "$\\sin\\theta = \\frac{18}{20}$",
            "$\\tan\\theta = \\frac{18}{91}$"
          ],
          "answer": 0,
          "explanation": "$\\vec d \\cdot \\vec n = 18$, $\\|\\vec d\\| = 13$, $\\|\\vec n\\| = 7$; line–plane angles use sine."
        }
      ]
    }
  ]
};
