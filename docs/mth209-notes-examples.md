# MTH 209 handwritten notes: examples, solution layout, exam notices

A reference for the MTH 209 rebuild (see `mth209-rebuild.md`). It records every worked example in the owner's handwritten notes: how each question was set, how the class solution was laid out, the checked answer, and the lecturer's exam notices. Every number was rechecked in Python on 2026-11-11.

**Sources (photos, not in the repo):**
- **Notebook A:** `C:\Users\IAR\Downloads\WhatsApp Unknown 2026-10-09 at 23.37.08\`. 25 pages: the start of phase two, systems of linear equations.
- **Notebook B:** `C:\Users\IAR\Downloads\WhatsApp Unknown 2026-11-11 at 12.26.34.zip`. 37 photos with many duplicates, some upside down: non-linear systems, Newton's method, IVPs, Euler.
- **No handwritten notes exist** for equations, interpolation, errors, finite differences or approximations. Use `Downloads\MAT 251-1.pdf` and the past papers (`MTH209_PQ.pdf`, `MTH209_questions.pdf`).

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
- **Example (marked "Complete this!"):** 2.0x₁ + 1.0x₂ − 0.1x₃ + 1.0x₄ = 2.7; 0.4x₁ + 0.5x₂ + 4.0x₃ + 8.5x₄ = 21.9; 0.3x₁ − 1.0x₂ + 1.0x₃ + 5.2x₄ = −3.9; 1.0x₁ + 0.2x₂ + 2.5x₃ − 1.0x₄ = 9.9 (as read from the photo).
  - The notes stop after the first elimination step: a₂₂ = 0.3, a₂₃ = 4.02, a₂₄ = 8.3, a₂₅ = 21.36 (these check out).
  - Solving the system as read gives (−2.626, 8.2517, 4.4066, 0.1409). Those values are unusual for a class example, so **re-read the photo before using it**, or replace it with a fresh example.

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
