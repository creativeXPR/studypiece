# MTH 209 handwritten notes: examples, solution layout, exam notices

A reference for the MTH 209 rebuild (see `mth209-rebuild.md`). It records every worked example in the owner's handwritten notes: how each question was set, how the class solution was laid out, the checked answer, and the lecturer's exam notices. Every number was rechecked in Python on 2026-11-11.

**Sources (photos, not in the repo):**
- **Notebook A:** `C:\Users\IAR\Downloads\WhatsApp Unknown 2026-10-09 at 23.37.08\`. 25 pages: the start of phase two, systems of linear equations.
- **Notebook B:** `C:\Users\IAR\Downloads\WhatsApp Unknown 2026-11-11 at 12.26.34.zip`. 37 photos with many duplicates, some upside down: non-linear systems, Newton's method, IVPs, Euler.
- **Notebook C:** `C:\Users\IAR\Downloads\WhatsApp Unknown 2026-11-11 at 13.18.03.zip`. 6 photos: regula falsi and the secant method, each derived and worked through an example.
- **No handwritten notes exist** for bisection, linear iteration, Newton-Raphson, interpolation, errors, finite differences or approximations. Use `Downloads\MAT 251-1.pdf` and the past papers (`MTH209_PQ.pdf`, `MTH209_questions.pdf`).

Lessons must stay general: never say "your notes" in the app, and fix slips silently.

---

## Exam notices (the lecturer's marked points)

| Notice | Where | Use in lessons |
|---|---|---|
| **If told which method to use, use only that method.** "You must be informed the method to use; do not use any other method if you are told to use a given method." | A, p6 (matrix inverse) | Course-wide Exam tip; repeat in every exam lesson. |
| **Answers to 2 decimal places;** fractions give a better approximation than rounded decimals. | A, p15 (LU) | Exam tip in the linear-systems lessons; show the cost of rounding early (LU example below). |
| **Be ready to define a consistent system.** | A, p1 | Teach the correct definition: at least one solution. The notes' "n ≤ k" rule is wrong; don't teach it. |
| **Newton's stopping test:** stop when ‖x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾‖ < ε. If even one component's change is still above ε, keep going. If no ε is given, use 10⁻³. Carry plenty of digits while computing, then give the answer to 2 dp. | B, Newton pages | Exam tip in non-linear systems. |
| **Define an IVP:** a differential equation together with its initial condition(s). The number of initial conditions equals the order of the equation. | B, IVP intro | Exam tip in Part D. |
| **Euler:** the answer is a set of approximations at the mesh points, not one formula. Number of mesh points: n = (b − a)/h. | B, Euler | Exam tip in Euler. |
| **Never write 1/3 = 0.33;** write 1/3 ≈ 0.33. | B, Taylor page | Exam tip in errors or series. |
| **Always check an IVP has a unique solution before solving it numerically** (unlike in a methods course). | B, uniqueness theorem | Note in Part D. |

---

## Equations: regula falsi and secant (Notebook C)

### Regula falsi (false position): derived, solved
- **Derivation layout:**
  1. Take the chord through (a, f(a)) and (b, f(b)): y − f(a) = [(f(b) − f(a))/(b − a)](x − a).
  2. The new estimate c is where the chord crosses the x-axis (y = 0). Rearrange to c = a − f(a)(b − a)/(f(b) − f(a)), which simplifies to **c = (a f(b) − b f(a)) / (f(b) − f(a))**.
  3. As in bisection, the sign of f(c) decides whether the root is in [a, c] or [c, b]. Update the bracket and repeat until successive values of c agree to the required accuracy.
- **Question:** "Find the root of f(x) = x³ − 5x + 1 lying between x = 0 and x = 1 using the regula falsi method, correct to 3 dp."
- **Solution layout:**
  1. Verify the root lies between 0 and 1: f(0) = 1 > 0 and f(1) = −3 < 0. By the intermediate value theorem, a root lies between them.
  2. a = 0, b = 1. Compute c and f(c), keep the half with the sign change, and repeat. Each step is written as "c = …, f(c) = …, thus [a, c]".
- **Checked:**
  - c₁ = 0.25, f = −0.234375, keep [0, 0.25];
  - c₂ = 0.2025316, f = −0.0043506, keep [0, 0.2025316];
  - c₃ = 0.2016543, f = **−0.0000715** (the notes drop the minus sign);
  - root **0.20164**, so **0.202 to 3 dp**.
- **Notes' closing remark:** "notice how the last 2 answers are around 0.202". Two agreeing iterates is the stopping rule.

### Secant method: derived, solved
- **Derivation layout:**
  1. Start from Newton-Raphson, xₙ₊₁ = xₙ − f(xₙ)/f′(xₙ).
  2. Replace f′(xₙ) by the backward-difference approximation (f(xₙ) − f(xₙ₋₁))/(xₙ − xₙ₋₁).
  3. This gives **xₙ₊₁ = xₙ − f(xₙ)(xₙ − xₙ₋₁) / (f(xₙ) − f(xₙ₋₁))**, for n ≥ 1.
- **Notes' remarks:**
  - The secant method is a simplification of Newton's method that needs no derivative.
  - It works like Newton, but it does not need f(x₀) and f(x₁) to have opposite signs. That is the difference from regula falsi.
  - It needs two starting guesses x₀ and x₁, and it keeps updating the pair by dropping the oldest estimate, whatever its sign.
- **Question:** "Find the root of x³ − 5x − 40 = 0 near x = 4 using the secant method, correct to 3 sf. Use x₀ = 3, x₁ = 4."
- **Solution layout:**
  1. f(x₀) = 27 − 15 − 40 = −28 and f(x₁) = 64 − 20 − 40 = 4.
  2. Apply the formula for n = 1, 2, 3, writing out each substitution.
  3. Round each result to 3 sf, and stop when two successive rounded values agree.
- **Checked:**
  - x₂ = 4 − 4(1)/32 = **3.875** (the notes write 3.88 at 3 sf but rightly keep 3.875 for the next step), f = −1.189453;
  - x₃ = **3.903651**, f = −0.032515;
  - x₄ = **3.904456**;
  - x₃ and x₄ both round to **3.90**, so the root is 3.90 to 3 sf (exact 3.904449).
- **Lesson point:** round only the reported value; carry the full value into the next step.

### What this adds to the picture
- Both examples follow the same layout: verify a sign change (regula falsi only), state the formula, then a table of iterations with the function value at each step, and stop when two successive values agree at the required precision.
- Precision is stated in the question: 3 dp for regula falsi, 3 sf for secant.
- **Comparison point the lecturer stresses:** regula falsi keeps a bracket (safe), while secant drops the oldest point regardless of sign (faster, but not guaranteed). Expect "compare the methods" questions.

---

## Systems of linear equations (Notebook A)

**How the topic is introduced**
- "Second phase of the course": linear systems, non-linear systems, IVPs in ODEs, numerical differentiation/integration. The last is not on the official topic list, so it is not taught.
- The five methods: matrix inverse, LU (lower and upper triangular), Gaussian, simple iteration (SIM), Gauss-Seidel (GSM).
- General n×n form a₁₁x₁ + … + a₁ₙxₙ = b₁, …: aᵢⱼ are the coefficients, xᵢ the unknowns, bᵢ the constants, and n×n is the order of the system.
- Prerequisite: matrix operations.
- Motivating illustration, **never solved:** concrete from cement, granite and sand mixed in 3 batches in fixed proportions (batch 1 is 1/8, 3/8, 4/8; batch 2 is 2/10, 5/10, 3/10; batch 3 is 2/5, 3/5, 0). Find the amount x₁, x₂, x₃ of each batch for 10 m³. The target amounts aren't legible. If used, write a complete version and solve it.

### Consistency (example with a wrong conclusion)
- **Question style:** "Is the system 2x + 4y + 3z = 2, 4x + y + 6z = 3 consistent?"
- **Notes' solution:** count unknowns n = 3 and equations k = 2; "3 ≠ 2, hence not consistent". **This is wrong:** the system has infinitely many solutions, so it is consistent.
- **Correct teaching:** consistent means at least one solution; inconsistent means none. Check with row reduction or ranks.

### Matrix inverse method (fully solved)
- **Question:** "Solve 2x₁ + 3x₂ + 4x₃ = 0, x₁ − 2x₂ + x₃ = 3, 2x₁ − x₂ + 3x₃ = 1 using the matrix inverse method."
- **Solution layout:**
  1. Write AX = B with A, X and B shown.
  2. det A by cofactor expansion along row 1: 2(−5) − 3(1) + 4(3) = −1.
  3. Write Aᵀ.
  4. Find the cofactors of Aᵀ and apply the sign matrix to get adj A.
  5. A⁻¹ = adj A / det A = [[5, 13, −11], [1, 2, −2], [−3, −8, 7]].
  6. X = A⁻¹B, multiplied out row by row.
- **Answer:** x₁ = 28, x₂ = 4, x₃ = −17.

### LU factorisation (solved; rounding slip)
- **Question:** the same system ("from last class example"), by the lower and upper triangular factorisation method.
- **Solution layout:**
  1. A = LU, with L unit lower triangular (1s on the diagonal) and U upper triangular.
  2. Multiply L by U and equate entries with A in order: u₁₁ = 2, u₁₂ = 3, u₁₃ = 4; l₂₁ = 1/2; u₂₂ = −2 − (1/2)(3) = −7/2; u₂₃ = −1; l₃₁ = 1; l₃₂ = 8/7 ≈ 1.14; u₃₃ = 1/7.
  3. Solve LY = B by forward substitution: y = (0, 3, −17/7).
  4. Solve UX = Y by back substitution.
- **Notes' slip:** u₃₃ was rounded to 0.14 (exact 1/7 ≈ 0.142857) and y₃ to −2.42. That gave x = (28.31, 4.06, −17.2) instead of the exact (28, 4, −17). The lecturer's remark on that page: keep fractions, because it is a better approximation. **Use this as the lesson's demonstration of round-off.**
- **Notes' advice:** "very meticulous, be careful"; "L is always 1s on the diagonal".

### Gaussian elimination (general derivation; example unfinished)
- **Layout of the derivation (4×4 with an augmented column aᵢ₅):**
  1. If a₁₁ ≠ 0, divide row 1 by a₁₁: b₁ⱼ = a₁ⱼ/a₁₁.
  2. Eliminate x₁ from rows 2–4: aᵢⱼ⁽¹⁾ = aᵢⱼ − aᵢ₁b₁ⱼ.
  3. Repeat with a₂₂⁽¹⁾ as the pivot, then a₃₃⁽²⁾.
  4. This gives an upper triangular system x₁ + b₁₂x₂ + … = b₁₅, x₂ + … = b₂₅, x₃ + b₃₄x₄ = b₃₅, a₄₄⁽³⁾x₄ = a₄₅⁽³⁾.
  5. Back-substitute.
- **Example (marked "Complete this!"):** 2.0x₁ + 1.0x₂ − 0.1x₃ + 1.0x₄ = 2.7; 0.4x₁ + 0.5x₂ + 4.0x₃ **− 8.5**x₄ = 21.9; 0.3x₁ − 1.0x₂ + 1.0x₃ + 5.2x₄ = −3.9; 1.0x₁ + 0.2x₂ + 2.5x₃ − 1.0x₄ = 9.9.
  - The notes stop after the first elimination step, with two slips:
    - they lose the sign of −8.5, so a₂₄⁽¹⁾ should be −8.7, not 8.3;
    - they write a₃₂⁽¹⁾ = 0, but it is −1.0 − (0.3)(0.5) = −1.15.
  - **Full solution:**
    - Stage 1: b₁ⱼ = (0.5, −0.05, 0.5, 1.35). Row 2: 0.3, 4.02, −8.7, 21.36. Row 3: −1.15, 1.015, 5.05, −4.305. Row 4: −0.3, 2.55, −1.5, 8.55.
    - Stage 2: b₂ⱼ = (13.4, −29, 71.2).
    - Stage 3: b₃₄ = −1.7230, b₃₅ = 4.7230; a₄₄⁽³⁾ = 1.12, a₄₅⁽³⁾ = −1.12.
    - **x = (1, 2, 3, −1).**

### Simple iteration method, SIM (fully solved)
- **Theory layout:**
  - Write AX = B as X = CX + F with cᵢⱼ = −aᵢⱼ/aᵢᵢ (aᵢᵢ ≠ 0), then iterate X⁽ᵏ⁺¹⁾ = CX⁽ᵏ⁾ + F.
  - **Convergence condition:** α = maxᵢ Σⱼ|cᵢⱼ| < 1 (rows), or β = maxⱼ Σᵢ|cᵢⱼ| < 1 (columns).
  - **Error estimate:** |xᵢ − xᵢ⁽ᵏ⁾| ≤ α/(1−α)·max|xⱼ⁽ᵏ⁾ − xⱼ⁽ᵏ⁻¹⁾|, or with β.
- **Question:** "Solve by SIM: 20.9x₁ + 1.2x₂ + 2.1x₃ + 0.9x₄ = 21.70; 1.2x₁ + 21.2x₂ + 1.5x₃ + 2.5x₄ = 27.46; 2.1x₁ + 1.5x₂ + 19.8x₃ + 1.3x₄ = 28.76; 0.9x₁ + 2.5x₂ + 1.3x₃ + 32.1x₄ = 49.72."
- **Solution layout:**
  1. Note the diagonal entries dominate.
  2. Rewrite each equation for its own unknown: x₁ = (21.70 − 1.2x₂ − 2.1x₃ − 0.9x₄)/20.9, and so on.
  3. X⁽⁰⁾ = F = (1.04, 1.30, 1.45, 1.55).
  4. Check the row sums: 0.20, 0.24, 0.25, 0.15, so α ≈ 0.25 < 1.
  5. Iterate to 2 dp: X⁽¹⁾ = (0.75, 0.95, 1.14, 1.36); X⁽²⁾ = (0.81, 1.01, 1.21, 1.41).
  6. Compute the differences and the error bound.
  7. Continue until consecutive iterates agree to 2 dp.
- **Checked iterates:** X⁽³⁾ = (0.7979, 0.9977, 1.1975, 1.3983), X⁽⁴⁾ = (0.8004, 1.0005, 1.2005, 1.4003), X⁽⁵⁾ = (0.7999, 0.9999, 1.1999, 1.3999). **Solution (0.8, 1.0, 1.2, 1.4).** The notes miscopy X⁽⁵⁾ as "(0.7999, 0.9999, 7.1999, 1.3499)".
- **Notes' tip:** an easy way to confirm convergence is to check that X⁽ᵏ⁻¹⁾ = X⁽ᵏ⁾ at 2 dp.

### Gauss-Seidel method, GSM (introduction only)
- Same as SIM, but each new xᵢ⁽ᵏ⁾ is used straight away for the remaining unknowns in the same sweep.
- **No example in the notes.** Write one; the SIM system above works well and shows GSM converging faster.

---

## Systems of non-linear equations (Notebook B)

**How the topic is introduced**
- Motivation (Example 1, **not solved**): the pressure needed to sink a circular plate of radius r a distance d into soil is given by non-linear equations.
- Form: fᵢ(x₁, …, xₙ) = 0 for i = 1..n, written F(x) = (f₁, …, fₙ)ᵀ = 0 with F: ℝⁿ → ℝⁿ.
- Requirement: F must be continuous, with a limit and partial derivatives, on its domain.
- **Fixed point:** G(p) = p. Example: f(x) = x² has fixed points 0 and 1.
- **Theorem 1:** if G is continuous on D and G(x) ∈ D for every x ∈ D, then G has a fixed point in D.
- **Theorem 2 (fixed-point theorem):** if also |∂gᵢ/∂xⱼ| ≤ K/n on D with K < 1, then the fixed point is unique. Any x⁽⁰⁾ ∈ D converges under x⁽ᵏ⁾ = G(x⁽ᵏ⁻¹⁾), and ‖x⁽ᵏ⁾ − p‖∞ ≤ Kᵏ/(1−K)·‖x⁽¹⁾ − x⁽⁰⁾‖∞.
- **Reminder:** for several variables we take partial derivatives, not ordinary ones.

### Fixed-point iteration (solved)
- **Question (Example 2/3, set in 3 parts):** for 3x₁ − cos(x₂x₃) − ½ = 0; x₁² − 81(x₂ + 0.1)² + sin x₃ + 1.06 = 0; e^(−x₁x₂) + 20x₃ + (10π − 3)/3 = 0:
  1. Place the system in fixed-point form by solving the i-th equation for xᵢ.
  2. Show there is a unique solution on D = {−1 ≤ xᵢ ≤ 1}.
  3. Use x⁽⁰⁾ = (0.1, 0.1, −0.1)ᵀ and iterate until accurate to within 10⁻⁵ in the ℓ∞ norm.
- **Solution layout:**
  1. g₁ = cos(x₂x₃)/3 + 1/6; g₂ = √(x₁² + sin x₃ + 1.06)/9 − 0.1; g₃ = −e^(−x₁x₂)/20 − (10π − 3)/60.
  2. Bound each gᵢ on D: |g₁| ≤ 0.50, |g₂| ≤ 0.09, |g₃| ≤ 0.61. So G(x) ∈ D, which satisfies Theorem 1.
  3. Bound each partial derivative: ∂g₁/∂x₂ and ∂g₁/∂x₃ ≤ 0.281; ∂g₂/∂x₁ ≤ 0.238; ∂g₂/∂x₃ ≤ 0.119; ∂g₃/∂x₁ and ∂g₃/∂x₂ ≤ 0.14; the diagonal partials are 0.
  4. K/n = 0.281 with n = 3, so K = 0.843 < 1: a unique fixed point by Theorem 2.
  5. Iterate.
- **Checked iterates:**
  - x⁽¹⁾ = (0.499983, 0.009441, −0.523101)
  - x⁽²⁾ = (0.499996, 0.000026, −0.523363)
  - x⁽³⁾ = (0.500000, 0.000012, −0.523598)
  - It converges to **(0.5, 0, −π/6 = −0.523599)**; the change falls below 10⁻⁵ by k = 5.
- **Notes' explanation:** the side notes (capital X for a vector, "which bound do we use: the maximum point") show where students got confused. The lesson should explain the bounding step slowly.

### Newton's method for systems (first step solved, then answer only)
- **Theory layout:**
  - Jacobian J(x) = [∂fᵢ/∂xⱼ]. If J is non-singular, x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − J⁻¹(x⁽ᵏ⁾)F(x⁽ᵏ⁾), for k = 0, 1, … (k starts from 0).
  - Stop when ‖x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾‖ ≤ ε (standard ε = 10⁻³).
- **Question:** "Solve by Newton's method: x₁² + x₂² + x₃² = 1, 2x₁² + x₂² − 4x₃ = 0, 3x₁² − 4x₂ + x₃² = 0, with x⁽⁰⁾ = (0.5, 0.5, 0.5)ᵀ."
- **Solution layout:**
  1. Write F(x) and J(x) symbolically.
  2. Evaluate: F(x⁽⁰⁾) = (−0.25, −1.25, −1.0) and J(x⁽⁰⁾) = [[1, 1, 1], [2, 1, −4], [3, −4, 1]].
  3. det J = −40; J⁻¹ by adjoint = −(1/40)·[[−15, −5, −5], [−14, −2, 6], [−11, 7, −1]].
  4. x⁽¹⁾ = x⁽⁰⁾ − J⁻¹F = **(0.875, 0.5, 0.375)**.
  5. "Repeat the same procedure."
- **The notes only state x⁽³⁾ ≈ (0.78521, 0.49662, 0.36992).** Checked iterates:
  - x⁽²⁾ = (0.789817, 0.496622, 0.369932)
  - x⁽³⁾ = (0.785210, 0.496611, 0.369923)
  - x⁽⁴⁾ = (0.785197, 0.496611, 0.369923)
- The lesson should show iteration 2 in full and the stopping test at each step.

---

## Initial value problems (Notebook B)

**How the topic is introduced**
- An IVP is a differential equation, or a system of them, with values specified at the initial point.
- Two types of solution: general and particular. An initial condition picks out the particular solution.
- Example: the pendulum θ″ + (g/L)sin θ = 0, with θ(0) = π and θ′(0) = π/2 given as initial values.
- The number of initial conditions equals the order of the equation.
- Three problem types:
  1. A first-order IVP y′ = f(x, y), a ≤ x ≤ b, y(a) = α.
  2. A system of first-order equations, yᵢ′ = fᵢ(x, y₁, …, yₙ), with yᵢ(a) = αᵢ.
  3. An n-th order equation y⁽ⁿ⁾ = f(x, y, …, y⁽ⁿ⁻¹⁾), with n initial conditions.
- **Convex set:** D ⊂ ℝ² is convex if the segment between any two points of D stays in D, i.e. (1−λ)(x₁, y₁) + λ(x₂, y₂) ∈ D for λ ∈ [0, 1]. The notes draw a disc (convex) and a kidney shape (not convex).
- **Lipschitz condition:** |f(x, y₁) − f(x, y₂)| ≤ L|y₁ − y₂|; L is the Lipschitz constant.
- **Theorem:** if D is convex and |∂f/∂y| ≤ L on D, then f is Lipschitz in y with constant L.
- **Existence and uniqueness:** if D = {a ≤ x ≤ b, −∞ < y < ∞}, f is continuous on D and Lipschitz in y, then the IVP has a unique solution.
- **Well-posed:** a unique solution exists, and small changes in the problem (perturbation δ(x) and δ₀, with |δ| < ε) change the solution by at most kε.

### Lipschitz example (solved)
- **Question:** "Show that f(x, y) = |xy| satisfies a Lipschitz condition on D = {1 ≤ x ≤ 2, −3 ≤ y ≤ 4}."
- **Solution layout:** |f(x, y₁) − f(x, y₂)| = ||x||y₁| − |x||y₂|| ≤ |x||y₁ − y₂| ≤ 2|y₁ − y₂|.
- **Answer:** L = 2. The notes' margin is muddled ("≤ 1… although ≤ 2 was said, confirm"). Teach L = 2, the largest |x| on D.

### Uniqueness example (solved)
- **Question:** "Show that there is a unique solution to the IVP y′ = 1 + x sin(xy), 0 ≤ x ≤ 2, y(0) = 0."
- **Solution layout:**
  1. Hold x fixed and treat it as a constant in y.
  2. ∂f/∂y = x² cos(xy).
  3. |x² cos(xy)| ≤ 4 on D, since x ≤ 2 and |cos| ≤ 1.
  4. So f is Lipschitz with L = 4, and the theorem gives a unique solution.

### Euler's method (solved; one slip)
- **Derivation layout:**
  1. Split [a, b] into n equal steps h = (b − a)/n, with mesh points xᵢ = a + ih.
  2. Expand y(xᵢ + h) by Taylor.
  3. Truncate after the h term.
  4. This gives yᵢ₊₁ = yᵢ + h f(xᵢ, yᵢ), y₀ = α (the Euler scheme). The dropped terms are the truncation error.
- **Question:** "Solve the IVP by Euler's approximation: y′ = y − x² + 1, 0 ≤ x ≤ 2, y(0) = 0.5, using h = 0.5."
- **Solution layout:**
  1. Mesh points x₀ = 0, x₁ = 0.5, x₂ = 1.0, x₃ = 1.5, x₄ = 2.0 (n = (b−a)/h = 4).
  2. List y₁ = ?, y₂ = ?, y₃ = ?, y₄ = ?.
  3. Apply the scheme step by step.
- **Checked:** y₁ = 1.25, y₂ = 2.25, **y₃ = 3.375** (the notes write 3.325), y₄ = 4.4375. Exact solution (x+1)² − 0.5eˣ, which is 5.3055 at x = 2.
- **Notes' suggestion:** "solve the DE by the usual methods, get the exact solution, and check the difference". This makes a good error-comparison screen.

---

## Approximations (Notebook B, one line only)
- On the Euler/Taylor page: the general Taylor expansion of y(x + ih), and the binomial (1 + x)ⁿ = Σ C(n, r)xʳ.
- **Practice prompt, not solved:** "Try expanding (x + y)⁴ and (x + y)⁻⁴ using binomial expansion."
  - (x + y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴.
  - (x + y)⁻⁴ = x⁻⁴(1 + y/x)⁻⁴ = x⁻⁴(1 − 4(y/x) + 10(y/x)² − 20(y/x)³ + …), valid for |y/x| < 1.
- Everything else for this topic comes from standard material and the past papers.

---

## What the notes show about the lecturer's questions

- **Questions name the method** ("using the matrix inverse method", "by SIM", "by Newton's method", "by Euler's approximation") and often reuse the previous example to compare methods.
- **Multi-part questions:** (1) rewrite into the method's form, (2) prove a condition (convergence, unique fixed point, Lipschitz or uniqueness), (3) iterate from a given start to a given tolerance.
- **Tolerances and precision are stated:** 2 dp, 10⁻⁵ in the ℓ∞ norm, ε = 10⁻³. The answer is expected with the stopping check shown.
- **"Show that" proofs:** bound a derivative on D, name the constant (K, L, α or β), then cite the theorem.
- **Definitions are examinable:** consistent system, fixed point, convex set, Lipschitz condition, IVP, well-posed.

---

# Past questions (lecturer papers)

**Source:** `Downloads\MTH209_PQ.pdf`. These are scanned University of Ibadan papers for **MAT 251 Numerical Methods**, the course's earlier code, set by the same lecturer (signed DAD):
- 2021/22 first-semester test (7 Dec 2022, 1 hr);
- 2021/22 examination (31 Jan 2023, 3 hrs: one question from Part A, three from Part B);
- 2020/21 examination (13 Jul 2021, 2 hrs: three questions);
- 2015/16 examination (23 Jul 2016, 3 hrs: four questions, at least two per section).

**`Downloads\MTH209_questions.pdf` is not a lecturer paper.** It is a 15-question practice set on linear systems (3 per method, with solutions and quick tips), built from the notes in an earlier session. It is useful for the exam lessons, but don't treat it as evidence of what the lecturer sets.

Answers marked ✓ were checked in Python on 2026-11-11.

## What gets asked, topic by topic

| Topic | Questions (paper) | Style |
|---|---|---|
| **Finite differences: operators** | Define Δ, ∇, δ; derive Δ⁴f, ∇⁴f, δ⁴f or δ³f (2021, 2022T, 2023). Define E and prove Δ = E − 1, E² = (Δ+1)², δ = E^½∇ = E^−½Δ, δ² = ∇Δ, DE = ED (2021, 2022T, 2023). | **Asked in every paper.** Pure derivation and proof; memorise the operator algebra. |
| **Finite differences: tables** | Difference table for f = x³ on 5.0–5.5 with h = 0.1; find Δ³, Δ⁴, Δ⁵ (2022T). Table for f = (x−1)(x+5)/((x+2)(x+1)), h = 0.1, i = 0..8, up to Δ⁵ to 6 dp (2023). Use central differences to approximate f′ for f = t² + 2t at t = −3 (2021). | Build the table neatly; know that a cubic's Δ³ is constant (6h³ = 0.006) and its Δ⁴ = Δ⁵ = 0 ✓. f′(−3) = −4 exactly, since central differences are exact for quadratics ✓. |
| **Equations: locating roots** | Table of values of 2x³ − 7x + 2 for x ∈ {−2..2} (2022T). Which of [−4,−3], [4,5], [0,1], [2,3] hold roots of x³ − 10x + 4 (2021). | Sign changes. 2022T: f(−2) = 0 exactly, so −2 is a root, with others in (0,1) and (1,2): 0.2929 and 1.7071 ✓. 2021: roots in [−4,−3], [0,1], [2,3] (−3.346, 0.4067, 2.9392) ✓. |
| **Equations: iteration** | Build iteration formulas for 2x³ − 7x + 2 = 0 from x₀ = 1 and/or 2 to 3 dp, "state observations" (2022T). Write suitable iteration formulas for sin x + x − 1 = 0 (2021). For x³ − 4x² + x − 10 from x₀ = 4, decide which of xₙ₊₁ = 10 − xₙ³ + 4xₙ² and xₙ₊₁ = (4xₙ² − xₙ + 10)/xₙ² works, to 5 sf, and give reasons when not (2016). | **Observations matter:** say which formula converges and why, using \|g′\| < 1. 2022T: x = (2x³+2)/7 → 0.293 and x = ∛((7x−2)/2) → 1.707 ✓. 2021: x = 1 − sin x → 0.5109 ✓. 2016: formula (i) diverges (10, −590, …); (ii) converges to 4.30691 ✓. |
| **Equations: Newton-Raphson** | Newton for 2x³ − 7x + 2, discuss observations (2022T). Show Newton for xᵏeˣ = 0 gives xₙ₊₁ = ((k−1)xₙ + xₙ²)/(k + xₙ); from x₀ = 1 find x₅ to 6 dp for k = 1 and k = 2; explain why one converges faster (2016). | 2022T: from x₀ = 1 Newton **jumps to −2**, not the root near 1.7; from x₀ = 2 it gives 1.7071 ✓. 2016: k = 1 gives x₅ = 0.000000 (simple root, fast); k = 2 gives x₅ = 0.072003 (double root, only linear) ✓. |
| **Errors** | Outline the types of approximation error (2021). Error in a sum, difference and product (2021). Define absolute error, relative error and "rounded to d decimal places" (2016). Show the relative-error bounds for a product and a quotient (2016). Evaluate x² − 2 + 1/x² at x = 1.473 with a maximum round-off estimate (0.6306 ✓); evaluate 2.362 × 1.76/(1.46 × 0.785) = 3.6272 ✓ and give limits (2016). | Definitions plus "show that" proofs plus one numerical error-bound question. |
| **Approximations** | Find a, b with e⁻ˣ ≈ (1 + ax)/(1 + bx) for small x: a = −½, b = ½ (2022T). Expand 2ˣ by writing it as e^(x ln 2) (2022T). Expand (2 + (1 + ½x)⁶)/(2 + 3x) to x³ using binomial series (2016). State the series for tan⁻¹x and ln(1 + x), then evaluate tan⁻¹(0.2) = 0.197 and ln(1.1) = 0.095 to 3 dp ✓ (2016). | Series manipulation and matching coefficients; standard expansions are expected from memory. |
| **Interpolation** | Quadratic interpolating polynomial for ln x from (2, 0.69315), (2.5, 0.91629), (3, 1.09861); approximate ln 2.7 and give the error to 5 dp (2023): P₂(2.7) = 0.99412, true 0.99325, error −0.00086 ✓. Linear interpolation for sin(1.15) from x₀ = 1.0 with each other table point in turn, giving the error and relative error each time; then Lagrange with n = 2 and 3 (2016; sin 1.15 = 0.9128 ✓). Everett's formula fᵣ = (1−r)f₀ + rf₁ + E₂δ²f₀ + …: find E₂, F₂, E₄, F₄, E₆, F₆, then use it for y(1.60) from a √x table (2016). | Compute and compare; Lagrange is the core. Everett's formula is beyond the MTH 209 list; mention it at most. |
| **Linear systems** | Express 2a + 3b + c = 9, a + 2b + 3c = 6, 3a + b + 2c = 8 as AX = B, solve for X, then find the eigenvalues and eigenvectors of A "if any" (2021): X = (35/18, 29/18, 5/18) ✓. Eigenvalues 6 (eigenvector (1,1,1)) and ±i√3, which are complex: "if any" means only one is real. | The eigen part is MTH 205 material; keep it as a stretch. |
| **IVPs** | Euler for y′ = −y²/(1 + x), y(0) = 1: estimate y(0.2) to 5 dp (2023). The step isn't stated: h = 0.1 gives 0.82636, h = 0.2 gives 0.80000; exact 1/(1 + ln 1.2) = 0.84579 ✓. Taylor series solution of y′ = −xy, y(0) = 1, to 4 dp at x = 0.0..0.5 (2021): exact e^(−x²/2) gives 1, 0.9950, 0.9802, 0.9560, 0.9231, 0.8825 ✓. Taylor method for y′ = 3x + y², y(1) = 1.2: find y(1.1) (2016). | Euler and the Taylor-series method. If h isn't given, state your choice and why. |
| **Beyond the MTH 209 list** | Runge-Kutta orders 2–4 and why higher orders are needed (2021, 2023). Trapezium rule for ∫₀¹x² dx with 8 intervals, its error term, and the n needed for error ≤ 10⁻⁶ (2016). Sketch the polynomial through (2,5), (3,2), (4,5) (2016). | Numerical integration and Runge-Kutta are on the older MAT 251 syllabus, not the official MTH 209 topic list. Cover them in at most one "you may also see" screen; don't build lessons on them. |

## Patterns in the lecturer's papers

- **Finite-difference operators appear in every paper,** often word-for-word the same (derive Δ⁴, ∇⁴, δ⁴; prove the five E identities). This is the most predictable question on the course; drill it until it's automatic.
- **"State your observations"** follows every iteration or Newton question: whether it converges, how fast, which root it finds, and why (using \|g′\|, simple vs double roots, a poor starting point).
- **Precision is always specified:** 3 dp, 5 sf, 6 dp or 5 dp. Carry two extra digits and round at the end.
- **Questions build on each other:** "From 2(a)(iii) above…", "Using the formula in 3(a)…", "Using 4(a)(i)…". The first part is usually a definition or derivation, then you apply it.
- **Tables are expected:** a table of values to find sign changes, difference tables, and iteration tables.
- **Lecturer papers cover phase 1 heavily** (differences, equations, errors, series, interpolation). Phase 2 (linear and non-linear systems, IVPs) appears in the papers only as the 2021 linear system and the Euler/Taylor IVP questions. The handwritten notes and their exam notices are the main evidence for phase 2.
