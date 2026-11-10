# MTH 209 rebuild: handoff

Status (2026-11-10): **plan approved, nothing rebuilt yet.** Next step: build Lesson 0 (the map) and Part A, let the owner try them, then Parts B, C and D. Deploy and push after each part (flow at the bottom).

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
