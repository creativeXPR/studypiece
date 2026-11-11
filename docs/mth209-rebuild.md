# MTH 209 rebuild: handoff

**Status (2026-11-11): COMPLETE and live.** All 24 lessons (map, Ideas A–D) plus the mock exam are in `src/data/tutorials/mth209/`. The question bank (`src/data/courses/mth209.js`, 225 questions) is grouped by idea, with the set ids kept. The previous tutorial (mth209classic) was removed on 2026-11-11 at the owner’s request. Future work: polish only; if adding lessons, follow the template below.

**Read first:** `docs/mth209-notes-examples.md`. It holds every worked example from the owner's handwritten notes (question style, solution layout, checked answers, slips to fix), the lecturer's exam notices, and the past-paper analysis with checked answers. Build lessons from it.

**Coverage rule:** the official topic list sets coverage. The lecturer can ask beyond the past papers, so never drop a subtopic.

## Outline: every topic under its idea (24 lessons, about 12 screens each)

**0. The map**: why we approximate, the four ideas, how they connect.

**Idea A: How wrong is an answer, and why does approximating work?**
1. Types and classification of error (absolute, relative, percentage; round-off, truncation, blunder; rounding to d dp)
2. Error propagation (sum, difference, product, quotient, functions; round-off limits)
3. Binomial expansion
4. Taylor and Maclaurin series
5. Exponential and special series (eˣ, 2ˣ = e^(x ln 2), ln(1+x), tan⁻¹x, matching coefficients as in e⁻ˣ ≈ (1+ax)/(1+bx))

**Idea B: Finding where things balance (solving)**
1. Locating roots (tables of signs), and bisection
2. Regula falsi
3. Linear iteration (|g′| < 1, "observations")
4. Newton-Raphson
5. Secant, and comparing the root methods
6. Linear systems: consistency and the matrix inverse method
7. LU factorisation
8. Gaussian elimination
9. Simple iteration
10. Gauss-Seidel
11. Non-linear systems: fixed points and the convergence condition
12. Newton's method for systems

**Idea C: Rebuilding a function from a table (data)**
1. Forward, backward and central differences, and difference tables
2. The operators E, Δ, ∇, δ and their identities (in every past paper)
3. Linear interpolation
4. Higher-degree interpolation (Lagrange; the interpolation error)

**Idea D: Following change step by step (IVPs)**
1. IVPs: definitions, convex sets, Lipschitz, uniqueness, well-posedness
2. Euler's method

**Mock exam**: a timed paper in the lecturer's style.

Afterwards, regroup the question bank by idea: 25 questions per idea, in the lecturer's styles.

## Lesson template (owner's spec)

**Part 1: Understand (simple case, like x² + y rather than cos 2x + y²)**
1. **Where we are:** the idea this sits under, and what the last lesson gave us.
2. **The idea** in plain words, with a picture where it helps.
3. **The steps:** a numbered recipe for solving any question on this concept, built from the idea.
4. **Worked simple example,** each step labelled with the recipe step it uses.
5. **Your turn** on a simple example (`calc` step check).
6. **The kinds of question that can be asked:** define, derive, compute to N dp, show that, state observations, compare methods.

**Part 2: Apply (exam size, like cos 2x)**
7. **Guided exam question,** solved step by step, with what the examiner wants at each step. Use past-paper or class examples.
8. **Common mistakes:** spot the error in a near-correct solution.
9. **Final question,** done on its own, checked step by step.
10. **Summary.**
11. **What's next,** and how it connects to this lesson (use a `finish` screen).

**Side panel:** each section can carry:
- `steps: [text…]`: the recipe, what the examiner wants, the mistakes;
- `examples: [{ title, question, steps: [text…], answer }]`: every worked example, solved in full.

They appear in the notes drawer's **Steps** and **Examples** tabs once the learner reaches that section, next to **Terms** and **Questions**. Put the recipe in Part 1's section, and the exam-sized worked solution in Part 2's.

## Exam notices (must appear as `asides: [{ label: 'Exam tip', text }]`)

- If a question names a method, use only that method.
- Answers to 2 dp unless told otherwise; fractions are more accurate than rounded decimals; carry full values and round only what you report.
- Define a consistent system: one with at least one solution. The notes' "n ≤ k" rule is wrong; don't teach it.
- Newton's stopping test for systems: every component's change must be ≤ ε; use 10⁻³ if no ε is given.
- Define an IVP: a differential equation with initial conditions; their number equals the order.
- Euler's answer is the values at the mesh points; n = (b − a)/h.
- Write 1/3 ≈ 0.33, never = 0.33.
- Check an IVP has a unique solution before solving it numerically.
- From the past papers: every iteration or Newton question asks you to **state your observations**; finite-difference operator proofs appear in every paper.

## Sources

| What | Where |
|---|---|
| Typed notes, phase 1 (bisection, iteration, Newton, errors, interpolation, differences, series) | `Downloads\MAT 251-1.pdf` (56 pp) |
| Typed notes, linear systems (including GSM) | `Downloads\MTH209_notes.pdf` (29 pp) |
| Handwritten: linear systems | `Downloads\WhatsApp Unknown 2026-10-09 at 23.37.08\` (25 photos) |
| Handwritten: non-linear systems, IVPs, Euler | `Downloads\WhatsApp Unknown 2026-11-11 at 12.26.34.zip` (37 photos) |
| Handwritten: regula falsi, secant | `Downloads\WhatsApp Unknown 2026-11-11 at 13.18.03.zip` (6 photos) |
| Lecturer past papers (MAT 251: 2016, 2021, 2022 test, 2023) | `Downloads\MTH209_PQ.pdf` (scanned) |
| Practice set built from the notes (not a lecturer paper) | `Downloads\MTH209_questions.pdf` |

The sources contain slips. **Recompute every number in Python;** never copy.

## House rules

- Teach intuition first. Keep lessons lean (about 12 screens). Screens must fit a 375×812 phone.
- Never say "your notes" in the app.
- Maths in `$…$` renders in titles, bodies, options, steps, asides and drawer text. It does **not** render in eyebrows, reveal-card titles, sort-bucket labels or scene text labels.
- There are no bullet lists in body text; use "•" lines.
- Visual widgets are skippable; questions stay required. Finished lessons open in review mode.

## Building and checking

- A lesson is `{ id, title, covers, minutes, sections: [{ name, terms, steps, examples, screens }] }`, registered in the tutorial's `index.js`.
- Screen types are in `src/features/learn/screens.jsx`: story, choice, multi, sort, order, reveal, recall, custom (`calc`, `scene`, `plane`, `graph`), finish.
- Check without signing in using a temporary harness:
  - Write `vite.harness.tmp.config.mjs`, aliasing `firebase/*` to the stand-ins in the old scratchpad `harness/` folder, and run it on port 5182.
  - Jump to a screen with `(await import('/src/lib/sync.js')).sync.set('runs', '<slug>.<lessonId>', { idx, total, results: {}, mem: {} })`, then reload.
  - Delete the config afterwards and restore `.claude/launch.json`.

## Deploy flow (only when the owner says so)

1. Run `npx eslint .`, then `npm run check`, then `npx vite build`.
2. `firebase deploy --only hosting --project quick-cbt`. Retry on network errors.
3. Commit `.firebase/hosting.ZGlzdA.cache`, then `git push`.
4. Confirm the live `index-*.js` matches `dist/assets`.
5. End commit messages with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
6. A deploy ships the whole working tree: commit or set aside unrelated edits first.
