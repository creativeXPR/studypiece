# MTH 209 rebuild: handoff

Status (2026-11-10): **Lesson 0 and Part A are written and registered: errors, error-spread, taylor, standard-series, exam-foundations. Part A grew from 2 to 4 teaching lessons after a coverage audit against MAT 251-1.pdf (quotient proof, normalised chopping/rounding, 1/7 rounding, worked quotient and mixed examples, Taylor about a ≠ 0 (sin 51°), integrating a series, binomial theorem, (1+3x)^{3/2} validity, e and sinh/cosh, ln(1+5x+4x²), (e⁶−1)/e³ proof). Index regrouped; old Part A files deleted. Next: Part B — audit each part against the notes the same way before writing.**

Next steps:
1. Register `course-map.js` and write Part A, using the design and checked numbers below.
2. Regroup `index.js` into the four parts (see "Index regroup").
3. Let the owner try it, then rebuild Parts B, C and D.
4. Deploy and push after each part (flow at the bottom).

## Exam notices from the lecturer (must appear)

The lecturer marked these in the notes as exam points.
- **Use the method the question names.** If a question says "use Gauss-Seidel" or "by Newton-Raphson", only that method earns the marks. This applies to the whole course: it is already an Exam tip in `course-map.js`; repeat it in every exam lesson.
- **Define a consistent system:** one that has at least one solution (Part B, linear systems).
- **Newton's stopping test for systems:** stop when ‖x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾‖ ≤ ε, checking every component (Part B, non-linear systems).
- **Define an IVP:** a differential equation together with its initial conditions (Part D).

Show them as `asides: [{ label: 'Exam tip', text }]`. Each one also needs practice questions in the bank (set QS009 "Exam focus" already covers them).

## Lesson 0 (drafted)

`src/data/tutorials/mth209/course-map.js` is written but **not yet in `index.js`**. It covers why we approximate, engine 1 (the √2 iteration 1 → 1.5 → 1.416667 → 1.414216) and engine 2 (sin 0.5 ≈ 0.479167 against 0.479426). It also has the four-parts story, a sort into the four jobs, the lesson pattern with the exam tip, a check question and a finish screen. Review it, then register it as the first chapter.

## Part A design (numbers checked in Python)

**`errors.js`, "How wrong is an answer?"** Replaces `types-of-error.js` and `error-propagation.js`.
1. Bridge: every later method gives approximate answers, so first we learn to measure how wrong one is.
2. Absolute, relative and percentage error. Example: 2/3 ≈ 0.667 has absolute error 0.000333 and relative error 0.0005 (0.05%).
3. Step check: π ≈ 3.14 has absolute error 0.00159 and relative error 0.000507.
4. `roundingScene`.
5. Sources of error: blunder, round-off, truncation. Example: e^0.2 to 3 terms is 1.22 against 1.2214.
6. Sort these into the three sources: writing 0.5791 for 0.5971; keeping 2/3 as 0.667; stopping a series; stopping bisection after 10 steps.
7. Correct to d decimal places and significant figures: |x − X| ≤ ½×10⁻ᵈ.
8. Propagation. Sums: absolute errors add. Products and quotients: relative errors add. Functions: Δf ≈ |f′(X)|Δx, which bridges to the series lesson.
9. `productErrorScene`.
10. Step check: X₁ = 2.35 and X₂ = 1.26, each ±0.005. The sum's maximum error is 0.01. The product is 2.961, with relative error 0.006096 and absolute error 0.01805.
11. Choice: subtracting nearly equal numbers loses significance.
12. Finish.

**`series.js`, "Approximating with polynomials"** Replaces `binomial-expansion.js`, `taylor-maclaurin.js` and `exponential-series.js`.
1. Bridge: we can measure error; now the engine that makes approximation work and predicts its error.
2. `taylorScene`.
3. Taylor about a, Maclaurin (a = 0), and the remainder Rₙ = f⁽ⁿ⁺¹⁾(ξ)(x−a)ⁿ⁺¹/(n+1)!.
4. Step check: e^0.5 from 4 terms is 1.645833. The true value is 1.648721, so the error is 0.002888, and the remainder bound is 1.65·0.5⁴/24 = 0.004297.
5. The standard series: eˣ, sin x, cos x, ln(1+x) and (1+x)ⁿ, each with its range (|x| < 1 for the last two).
6. `binomialScene`.
7. Step check: √1.1 = (1+0.1)^½ ≈ 1 + 0.05 − 0.00125 + 0.0000625 = 1.0488125, against the true 1.0488088.
8. `expTermsScene`.
9. Choice: e^0.5 needs 6 terms for error below 10⁻⁴ (the partial sum is 1.648698).
10. Choice: why the (1+x)^½ series fails at x = 3.
11. Preview: Taylor drives Newton (Part B), finite differences (Part C) and Euler (Part D).
12. Finish.

Extra checked value: ln 1.2 = 0.182322; three terms give 0.182667.

**A exam lesson:** merge `exam-errors.js` and `exam-series.js` into `exam-foundations.js`, and add the "use the named method" tip.

## Index regroup

Turn the 8 chapters into: the map, A, B, C, D and the mock exam.
- **Until a part is rebuilt, keep its old lessons under the new part heading.** For example, B holds the equation, linear-system and non-linear lessons with their exam lessons.
- Delete old lesson files only once their replacements are registered. Git keeps their history.

## Why

A student's feedback, which the owner agrees with: the current MTH 209 tutorial (`src/data/tutorials/mth209/`, 8 chapters, 32 lessons) "dumps the notes". It follows the notes' order. It never says where the course is going, what a topic is for, or how it connects to the last topic and to the course as a whole. MTH 205 does this well; use it as the model.

The job: compress the resources into a few categories so each lesson hits the main idea fast, explains the what, why and how in plain words, then solves an example and links each step back to the idea. A student who finishes should be able to answer any question on the syllabus.

**Coverage rule:** the official topic list sets coverage. Past papers only set emphasis and question styles; the lecturer may ask beyond them. Never drop a subtopic. "Merge" means teaching methods that are one idea together.

## The course in one sentence

When the exact answer is out of reach, approximate it step by step, and know how wrong you might be.

- **Four jobs:** solving (where things balance), data (rebuild a function from a table), change (follow a rate step by step), and judging error.
- **Two engines:** Taylor series, and iterating until the answer settles. Say which one each lesson uses.

## Outline (about 23 lessons, each 12 screens or fewer)

**0. The map:** what numerical analysis is for, the four jobs, the two engines, and how the parts connect (about 8 screens; model it on MTH 205's opening).

**Part A: Foundations**
1. Errors: absolute, relative and percentage; round-off and truncation; significant figures; propagation through +, × and functions.
2. Series approximations: Taylor and Maclaurin, the remainder and how many terms; binomial expansion and the exponential series as cases.
3. A exam lesson.

**Part B: Solving**
1. Bracketing: table of signs, bisection, regula falsi, how many steps a given accuracy needs.
2. Linear iteration: x = g(x), the |g′| < 1 condition, cobwebs.
3. Newton-Raphson and secant: from Taylor; convergence, failure cases, comparing methods.
4. Linear systems, direct: inverse, Gaussian with row swaps, LU (Doolittle).
5. Linear systems, iterative: simple iteration (convergence test and error bound), Gauss-Seidel, choosing a method.
6. Non-linear systems: definitions, fixed points, the convergence condition (contraction theorem), Newton with the Jacobian.
7. B exam lesson.

**Part C: Data**
1. Finite differences: Δ, ∇, δ, E; difference tables; spotting an error in a table.
2. Newton forward and backward interpolation formulas.
3. Linear and Lagrange interpolation, plus the interpolation error.
4. C exam lesson.

**Part D: Change**
1. IVPs: general and particular solutions, types, Lipschitz, existence, uniqueness, well-posedness.
2. Euler's method: from Taylor; step size and error.
3. D exam lesson.

**Mock exam:** keep `mock-exam.js`.

## Detailed outline: Parts B–D (2026-11-10, after a coverage audit)

The Part A lesson was that 12 screens cannot hold two old lessons' worth of notes, so these parts are split finer than the outline above. Each lesson: bridge → problem → idea with a scene → method derived → worked notes example → step-checked "your turn" → quick recall. **Bold** = in the notes or past papers but missing from the current build. Recompute every number in Python.

**Part B: Solving** (8 teaching + 2 exam lessons). Bridge from A: an equation we can't solve exactly is an approximation problem; the two engines are iteration and Taylor.
1. `bracketing`: Bracket and halve (replaces bisection, regula-falsi). Table of signs and the intermediate (mid-value) value theorem; bisection with its three sign cases and the stopping rule (two values agree to the accuracy); notes example 5x² + 11x − 17 = 0 to 3 s.f.; **steps needed: n ≥ ln((b − a)/ε)/ln 2**; regula falsi c = (af(b) − bf(a))/(f(b) − f(a)) and why it's usually faster; your turn.
2. `fixed-point`: x = g(x) (replaces linear-iteration). Rearranging f(x) = 0; notes examples x² − 3x + 1 = 0 (x₀ = 0 → 0.382) and x³ − 5x + 1 = 0 (0.202); cobweb scene; **convergence needs |g′(x)| < 1 near the root, derived from the mean value theorem**; two rearrangements of one equation, one converging and one not; the observations exams ask for.
3. `newton-secant`: Newton-Raphson and secant (replaces newton-raphson, secant). Derived both from the tangent picture (notes) and from two Taylor terms (bridge to A3); x³ − 5x − 40 = 0 from x₀ = 4; cube root of 7; secant = Newton with f′ replaced by a difference, same equation from 3, 4; **failure cases (f′ ≈ 0, bad start, cycling), repeated roots, convergence speed: bisection < iteration < secant < Newton**; choosing a method.
4. `linear-direct`: Linear systems and the inverse (replaces matrix-inverse). General form, **consistent = has at least one solution (Exam tip)**, unique / none / infinitely many, direct vs iterative methods; AX = B, X = A⁻¹B with A⁻¹ = adj A/det A; the class 3 × 3 and the 2 × 2 example; concrete mixture; why the method fails when det A = 0.
5. `elimination-lu`: Gaussian elimination and LU (replaces gaussian, lu-factorisation). Successive elimination with b₁ⱼ = a₁ⱼ/a₁₁; **row interchange when a pivot is zero**; Doolittle A = LU with lᵢᵢ = 1, LY = B forward, UX = Y back; the class examples (split worked examples across reveal and calc screens; 4 × 4 shown, 3 × 3 practised).
6. `linear-iterative`: Simple iteration and Gauss-Seidel (replaces simple-iteration, gauss-seidel). X = CX + F with cᵢⱼ = −aᵢⱼ/aᵢᵢ, fᵢ = bᵢ/aᵢᵢ; **convergence test α = max row sum of |cᵢⱼ| < 1 and the error bound α/(1 − α) × (largest change)**; Gauss-Seidel uses each new value at once; class system by both; diagonal dominance; choosing a method.
7. `nonlinear-fixed`: Non-linear systems and fixed points (replaces nonlinear-systems). F(x) = 0 for F: ℝⁿ → ℝⁿ, definitions, fixed points, **the contraction (fixed-point) theorem with its conditions**, the 3 × 3 fixed-point iteration.
8. `nonlinear-newton`: Newton for systems (replaces newton-systems). Jacobian matrix, x⁽ᵏ⁺¹⁾ = x⁽ᵏ⁾ − J⁻¹F solved as J·Δ = −F; the 3 × 3 example; **stopping test ‖x⁽ᵏ⁾ − x⁽ᵏ⁻¹⁾‖ ≤ ε checking every component (Exam tip)**; Newton vs fixed point.
9. `exam-equations`: keep, refresh. Table of signs, constructing iteration formulas with observations, Newton with observations, repeated roots, transcendental equations, **"how many bisection steps", "show the iteration converges"**, named-method tip.
10. `exam-systems`: merge exam-linear-systems + exam-nonlinear. Consistency definition, inverse fails when singular, concrete mixture, Gaussian, LU, SIM/GSM with convergence conditions and error bound, fixed-point theorem, Jacobian Newton 3 × 3 with stopping test, named-method tip.

**Part C: Data** (4 teaching + 1 exam). Bridge: the solving methods needed f; now f is only a table, so rebuild it. Engine: Taylor rewritten with steps.
1. `differences`: Finite differences (replaces difference-operators). Δ, ∇, δ; difference tables; higher differences in ordinates; **spotting and correcting an error in a table (the error spreads as binomial coefficients 1, −3, 3, −1)**; polynomial of degree n ⇒ constant nth differences (x³ table); derivative estimates.
2. `operators`: The operator algebra (from newton-difference-formulas). E, Δ = E − 1, ∇ = 1 − E⁻¹, δ = E^½ − E^−½, δ² = Δ∇, E² = (Δ + 1)², DE = ED; the "prove" questions as order screens.
3. `newton-everett`: Interpolating from a table (from newton-difference-formulas). Newton forward (start of table) and backward (end of table), r = (x − x₀)/h; notes examples: population table, tan 0.12; **Everett's central formula with f(0.644) from the eˣ table (r = 0.4, s = 0.6), and when to use which formula**.
4. `lagrange`: Linear and Lagrange interpolation (replaces linear-interpolation, lagrange). P₁ through two points, (2, 3)–(5, 7), ln 2 ≈ 0.3584 with error 0.3347; quadratic by solving for a₀, a₁, a₂; Lagrange basis Lₖ(x); **the interpolation error term f⁽ⁿ⁺¹⁾(ξ)/(n+1)! × Π(x − xᵢ) and why more points usually help**; uneven spacing (Lagrange) vs even (Newton).
5. `exam-data`: merge exam-differences + exam-interpolation. Definitions, operator proofs, difference table, derivative, linear interpolation with errors, Lagrange degree 2 and 3, quadratic of ln x with its error, **an Everett and an error-in-table question**, named-method tip.

**Part D: Change** (3 teaching + 1 exam). Bridge: a rate is known, the function isn't; step along it. Engine: Taylor in steps.
1. `ivp-basics`: What an IVP is (replaces ivp-intro). General vs particular solutions, **IVP = a differential equation together with its initial conditions (Exam tip)**, the three kinds, convex sets, Lipschitz condition, |xy| on a rectangle.
2. `ivp-theory`: Existence, uniqueness, well-posedness (replaces ivp-unique). The theorem with conditions, y′ = 1 + x sin(xy), well-posed problems and perturbations.
3. `euler-taylor`: Euler and the Taylor series method (replaces euler). Mesh points, yᵢ₊₁ = yᵢ + hf(xᵢ, yᵢ) from Taylor, y′ = y − x² + 1 with h = 0.5, **the Taylor series method of order 2 (in exam-ivp but never taught)**, local vs global error, halving h.
4. `exam-change`: refresh exam-ivp. Euler to an accuracy, Taylor method, Lipschitz and the theorem, well-posedness, definitions, named-method tip.

**Mock exam:** keep, then re-check that its six questions still match the lesson wording and add one question from any topic the audit added.

**Not on the topic list (owner to confirm):** numerical integration in MAT 251-1.pdf §0.6 (integrating a series is already in A3; trapezium, composite trapezium, rectangular and Simpson's rules are not). If examined, add Part C lesson 6 `integration`.

## Teaching-lesson template

1. **Where we are:** a one-line bridge from the last lesson, plus which job on the map this lesson does.
2. **The problem:** why we need it, with a concrete case.
3. **The idea in plain words,** with a picture. Reuse the existing scenes.
4. **The method,** derived from the idea.
5. **A worked past-paper question,** step by step. Label each step with the idea it uses.
6. **Your turn:** a step-checked `calc` screen on a similar question.
7. **Quick recall.**

Exam lessons drill the lecturer's styles: derive, iterate to N decimal places, compare methods, state conditions, "show that". Include types beyond the past papers too.

## Sources (all still on disk)

- `C:\Users\IAR\Downloads\MAT 251-1.pdf`: bisection, iteration, Newton, errors, interpolation, finite differences.
- `MTH209_notes.pdf`: linear systems. `MTH209_questions.pdf`: practice exam.
- `MTH209_PQ.pdf`: past papers (MAT 251 UI papers 2016, 2021, 2022). `MTH209_Assignment.pdf` is not exam content.
- `Downloads\WhatsApp Image 2026-09-*.jpeg`: handwritten notes (secant, regula falsi, approximations, non-linear systems, IVP).
- These sources contain arithmetic slips. **Recompute every number in Python;** never copy.

## Reuse from the current build

- **Scenes:** `mth209/*-scenes.js`, with helpers in `mth209/plot.js`; widget `plane`.
- **Worked examples and exam lessons:** `exam-*.js`, `mock-exam.js`.
- **Question bank:** `src/data/courses/mth209.js` (9 sets). Keep it; retitle sets if the parts change.
- The auto-memory note `mth209-progress.md` lists the verified numbers for the non-linear and IVP examples.

## House rules (also in auto-memory)

- Teach intuition first: picture, then name, then symbol, then formula.
- Lean: about 12 screens, replace rather than add.
- Screens must fit the window: check at 375×812.
- Never mention "your notes" in the app.
- Maths in `$…$` renders in titles, bodies, options and steps, but **not** in eyebrows, reveal-card titles, sort-bucket labels or scene text labels. There are no bullet lists: use "•" lines.
- Visual widgets are skippable (`REQUIRED_WIDGETS` in `LessonPlayer.jsx`); questions stay required.

## Building and checking

- Register lessons in `src/data/tutorials/mth209/index.js`. A lesson is `{ id, title, covers, minutes, sections: [{ name, terms, screens }] }`.
- Screen types are in `src/features/learn/screens.jsx`.
- Check without Google sign-in using a temporary harness. Write `vite.harness.tmp.config.mjs`, which aliases `firebase/*` to in-memory stand-ins, and run it on port 5182. **Delete it afterwards and restore `.claude/launch.json`.**
- To jump to a screen in the harness: `(await import('/src/lib/sync.js')).sync.set('runs', 'mth209.<lessonId>', { idx, total, results: {}, mem: {} })`, then reload.
- Changing lesson ids resets students' progress on those lessons.

## Deploy flow (only when the owner says so)

1. Run `npx eslint .`, then `npm run check`, then `npx vite build`.
2. `firebase deploy --only hosting --project quick-cbt`. Retry if it fails; the network sometimes drops.
3. Commit `.firebase/hosting.ZGlzdA.cache`, then `git push`.
4. Confirm the live `index-*.js` matches `dist/assets`.
5. End commit messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
