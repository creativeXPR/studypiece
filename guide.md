# StudyPiece: handover guide

This guide is for another AI, or a developer, picking up StudyPiece. It covers what the app is, how it's built, how we work on it, and what's still open. It was written on 2026-11-04, at commit `3216869`, with a clean working tree.

Read this first, then `README.md` (setup and course format) and `docs/adding-questions.md` (writing questions).

---

## 1. What StudyPiece is

A study app for university students, mostly from the University of Ibadan. It's live at **https://studypiece.web.app**.

- **Practice (CBT):** students pick a course, take timed tests from question sets, see their score, then review every answer with its explanation. Speech can read questions and answers aloud.
- **Learn (tutorials):** interactive, story-driven lessons for some courses, with questions, drag-and-drop, graphs, widgets and, for Java, a code editor that really runs code.
- **Accounts:** Google sign-in, or email and password. Each student sets a department and level, which picks the courses shown under "For you".

**Stack:** React 19, Vite 8, React Router 7, Firebase (Auth, Firestore, Hosting), KaTeX for maths and CodeMirror 6 for code. The Firebase project is **`quick-cbt`**, with hosting site **`studypiece`**.

---

## 2. How to work on it (the owner's rules)

These come from the owner and matter more than anything else here.

1. **Commit, deploy and push only when the owner says so**, usually with the words "Deploy and push". Building and testing locally is always fine.
2. **Lessons and questions must read as general teaching material.** Never say content came from "your notes", a "class example" or handwriting, and never point out mistakes in the source. Recompute every number and silently use the correct value. Report source errors to the owner in chat, never in the app.
3. **Port 5173 belongs to another app (PeraForm).** Run StudyPiece on another port, for example `npx vite --port 5181 --strictPort` (that's what `.claude/launch.json` uses).
4. **This PC has little RAM.** A Java process has crashed it before. Don't start heavy things you don't need, and don't kill other projects' servers. A shared Firestore emulator usually runs on port 8080, and it belongs to other projects too.
5. **Owner's notes carry margin marks:** "Note:" and "Exam Notice". They only show in the page photos, often sideways or upside down, so look at every page as a picture and zoom into the margins. "Exam Notice" points are top priority: add them to lessons as tips and also test them in practice questions, because the owner said "the exam definitely can".
6. **When the owner says "stop, we have to discuss"**, stop all work, including background commands, and just talk. Don't write plans or code until they say so.
7. **Write plainly.** The owner is a student and wants short, clear answers.

### Deploying

```bash
npm run lint && npm run check && npm run build
firebase deploy --only hosting --project quick-cbt          # add firestore:rules when rules change
git add .firebase/hosting.ZGlzdA.cache
git commit -m "Update Firebase hosting cache after deploy"
git push origin main
```

- **Deploy flow:** the content commit comes first, then the deploy, then the cache commit, then the push. Retry the deploy on network errors, since this connection is slow (about 47 KB/s) and drops out.
- **Commit messages:** end them with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- **Checking it's live:** fetch the site's JavaScript bundles and look for a new string, as the past sessions did.

---

## 3. Code map

```
src/
  main.jsx, index.css
  app/
    App.jsx            routes and guards (RequireAuth, GuestOnly, RequireSession)
    AppShell.jsx       tab bar on phones, side rail on desktop
    AuthProvider.jsx   sign-in, profile (users/{uid}), favourites, starts and stops sync
    TestProvider.jsx   the running test, which syncs as testPaper and testState
  features/
    auth/ onboarding/ profile/ admin/
    select-test/       home: For you, Favourites, All courses; resume banners; sync reminder
    course/            course page, test intro, starting a test
    test/ results/ review/
    learn/             tutorials (see section 5)
  lib/
    firebase.js        Firebase setup, with a persistent local cache
    sync.js, syncEngine.js, SyncControls.jsx, sync.css   account sync (section 7)
    MathText.jsx       KaTeX, plus `code` and fenced code blocks
    CourseBanner.jsx, bannerArt.js, banner.css   a generated banner for each course
    forYouStore.js     admin "For you" dates (config/forYou)
    speech.js          read-aloud, which skips programs
    storage.js         localStorage helpers that never throw
  data/
    courses/           question banks, one file per course, registered automatically
    tutorials/         lessons, one folder per course; register in tutorials/index.js
    forYou.js          New, Featured and For you rules
    departments.js     department list and course-code prefixes
scripts/
  checkQuestions.js    `npm run check`, which validates every question file
  linkPreviews.js      build step: link-preview pages and images for WhatsApp
java-runner/           Cloud Run service that compiles and runs students' Java (section 6)
public/java/           files for the optional in-browser Java (CheerpJ)
java-src/Driver.java   source for public/java/driver.jar
docs/adding-questions.md
```

### Routes

| Path | Page |
|---|---|
| `/login` | sign in |
| `/onboarding` | department and level |
| `/` | home |
| `/course/:courseId` | a course's sets |
| `/course/:courseId/:setId` | test intro |
| `/test`, `/results`, `/review` | the running test |
| `/learn/:courseId` | tutorial home |
| `/learn/:courseId/:lessonId` | a lesson, full screen |
| `/profile` | profile and sync |
| `/admin` | admin only |

- **Admins:** listed in `src/lib/admins.js` and in `firestore.rules`.
- **Slugs:** come from course codes, for example `MAT 222` becomes `mat222` (`src/data/slugs.js`).

---

## 4. Courses and practice questions

- **Files:** each file in `src/data/courses/` is `{ code, title, updated: 'YYYY-MM-DD', sets: [{ id: 'QS001', title, questions: [...] }] }`. A question is `{ question, options: [4], answer: index, explanation }`.
- **Merging:** files that share a `code` merge into one course.
- **Validation:** always run `npm run check`.
- **Standard size:** 25 questions per set.
- **Maths:** goes between `$...$` (KaTeX). Inside JSON strings, backslashes are doubled.
- **Shuffling:** options are shuffled unless an option says "Both II and III", "All of the above" and so on, or the explanation names an option by label. Avoid those, and spread correct answers across positions.
- **"New" tag:** a course shows as **New** for 30 days after its `updated` date. Don't bump `updated` unless the owner wants that.

**Current courses:**

| Course | Status |
|---|---|
| COS 102, GES 103, GES 201, GST 111, GST 112, MAT 142, MTH 103, STA 121 | Question banks |
| MAT 222 | Real Analysis II: 9 sets (QS001–QS008 plus QS009 "Exam focus") and a tutorial |
| MTH 209 | Numerical Analysis: 9 sets (including QS009 "Exam focus") and a tutorial |
| MTH 210 | Vector Analysis: 7 sets (one per chapter plus QS007 "Exam focus") and a tutorial of 20 lessons in 6 chapters, each chapter ending with an exam practice lesson |
| STA 221 | Statistical Inference: 7 sets (one per chapter plus QS007 "Exam focus") and a tutorial of 24 lessons: an optional "Statistics from Zero" chapter and six chapters, each ending with an exam practice lesson. Extra content (de jure and de facto enumeration, three points of interest, sufficiency, applications of testing, experimental design, ANOVA models) follows the course's area-of-concentration list |
| COS 202 | Advanced OOP in Java: 9 sets of 25 and a tutorial |
| GES 103 | Also has a tutorial |


### For you, Favourites and admin
- **For you:** shows the student's own department and level courses, plus new courses for 30 days.
- **Admin control:** the admin page can pin a course to For you until a date (Firestore `config/forYou`, `{ courses: { 'MAT 222': 'YYYY-MM-DD' } }`). That date replaces the 30-day rule, and pinned courses that aren't new get a "Featured" tag.
- **Favourites:** students star courses, stored as `favourites` on `users/{uid}`, and they appear under a Favourites tab.

---

## 5. Tutorials (Learn)

- **Where lessons live:** `src/data/tutorials/<slug>/`, with one file per lesson and an `index.js` listing chapters `{ n, title, by, lessons: [...] }`.
- **Optional chapters:** a chapter can be `optional: true` with a `hint`. It then shows as a collapsed, highlighted box, stays out of the main "Start/Continue" path and doesn't count in the progress ring. COS 202's chapter 0, "Intro to Java", works this way.
- **Lesson shape:** `{ id, title, covers, minutes, sections: [{ name, terms: [[term, meaning]], screens: [...] }] }`. The last screen is `finish`.
- **Unfinished lessons:** a lesson with no `sections` shows as "Coming soon".

### Screen types
- **General screens** (`src/features/learn/screens.jsx`): `story`, `choice` (and `poll`), `multi`, `sort`, `order`, `reveal`, `bridge`, `recall`, `custom` (a widget) and `finish`.
- **Java screens** (`src/features/learn/java/`, loaded only when needed): `code`, `bug`, `predict`, `fill`, `better`, `trace` (steps through a program showing memory and screen) and `flow` (a live flowchart).
- **Widgets and graphs:** `src/features/learn/widgets.jsx` and `analysisWidgets.jsx`. Use `widget: 'graph'` with a `graph: {...}` config for a configurable graph.
- **Animated scenes (STA 221, the house style for teaching):** `src/features/learn/sceneWidget.jsx`, `widget: 'scene'`. A scene is a list of steps (`say` text, optional `action` button) and a `draw(step, presses)` function returning keyed shapes (dots, bars, lines, text, curves, areas); CSS transitions animate each shape from step to step, and the lesson's big button becomes Next. Lessons are built intuition-first: picture → name → symbol → formula, then questions; scenes continue from the previous lesson's picture. STA 221's shared data (the 400 students, their study hours and scores, pile and axis helpers, the hypothesis-test claim) lives in `src/data/tutorials/sta221/campus.js`.
- **3D vectors and fields (MTH 210):** `src/features/learn/vectorWidgets.jsx`. `widget: 'space'` draws 3D axes the student can drag to turn, with arrows, points, lines, shaded polygons and curves from a `draw(P, v)` function; `widget: 'field'` draws a 2D vector field and/or shaded scalar field with contour lines and a tap-to-move probe. Both take `params` (sliders), `views`, `read`, `need` and `action`. Helpers for the configs are in `src/data/tutorials/mth210/vec.js`.

### Text marks
- **Marks:** `**bold**`, `==term==` and `` `code` ``. A blank line starts a new paragraph.
- **Maths:** `$...$`. Never put `**` or `==` inside maths, and never put bold right next to a backtick.

### Tips on screens
- **Format:** `asides: [{ label: 'Exam tip' | 'Tip' | 'Note', text }]` on story, choice and reveal screens.
- **Colours:** amber for Exam tip, blue for Tip, grey for Note.
- **Older field:** the single `note` field still shows as "Heads up".
- **What's there:** MAT 222 and MTH 209 carry the owner's exam marks this way.

### Progress
Lesson results and the place inside a lesson use the sync store (section 7). Resume works like a running test.

### Checking a lesson without signing in
Make a temporary `learn-preview.tmp.html` and `src/learn-preview.tmp.jsx` that render `LessonPlayer` inside `BrowserRouter` with `uid="preview"`. Drive it with headless Chrome over CDP, and delete the temp files afterwards. The in-app browser pane slows down when it's hidden, so past sessions used headless Chrome.

---

## 6. COS 202 and the Java runner

The COS 202 tutorial has 36 lessons in 11 chapters:
- **Chapter 0, "Intro to Java":** optional, for complete beginners. It has 9 `java-*` lessons built from the COS 201 notes.
- **Chapter 1, "Java Toolkit":** the start of the main course.
- **Chapters 2–10:** recursion through Swing and the "Exam Lab".

Code screens validate a student's code with tests, then show the model solution, so students compare their steps.

### Running code
- **Server (the normal path):** Cloud Run service `java-runner` in `europe-west1`, at `https://java-runner-584031052691.europe-west1.run.app`. It accepts a Firebase sign-in token, or the test key in the gitignored `java-runner/.runner-key`, which must never be committed or printed.
- **Sandbox:** OpenJDK 17 under Security Manager rules (`sandbox.policy`). It runs as `nobody`, with file and process limits, and no network.
- **Swing:** windows come back as pictures, drawn with Xvfb.
- **Limits and redeploying:** 30 runs a minute per user, and at most 2 instances. Redeploy with `bash java-runner/deploy.sh`.
- **In-browser Java (CheerpJ):** only the optional "Try it live" uses this. It's slow on the owner's connection and still experimental.

### Test harness
`src/features/learn/java/harness.js`. Test kinds:
- `expr`: the value of an expression.
- `body`: a block of code to run.
- `check`: a condition that must hold.
- `throws`: the exception it must throw.
- `main`/`out`: what the program prints.
- `src`: a pattern that must, or must not, appear in the source.

Input tasks feed keyboard input with `System.setIn(...)` inside a `body` test.

### How past sessions verified lessons
- **Locally:** they compiled every snippet, solution and fixed bug with a local JDK.
- **On the live runner:** they ran every model solution against its tests.

---

## 7. Account sync

- **What syncs:** lesson results, the place inside a lesson, the running test, Java code drafts, shuffle settings and speech rate.
- **What stays on the device:** theme and the collapsed sidebar.
- **Code:** `src/lib/syncEngine.js` holds the engine and merge rules. `src/lib/sync.js` is the app's copy of it, and also moves older saved data to the first account that signs in on a device.

### How it works
- **Reading and writing:** screens use `sync.get/list/set/remove(bucket, key)`, and `useSyncRevision()` re-renders a screen when merged data arrives. New study data should go in a bucket rather than raw localStorage.
- **Where it's stored:** Firestore `users/{uid}/sync/{lessons|runs|drafts|prefs|testPaper|testState}`, each shaped `{ entries: { key: { at, s, del } } }`.
- **Rules:** only the student can read or write their own data, and only those six buckets are allowed (`firestore.rules`).

### Sync is manual (the owner's decision)
Nothing moves until the student presses a sync button:
- a floating "Sync progress" button on every lesson's finish screen;
- a "Sync progress" row on the profile page;
- a reminder banner on home, with **Later** and **Sync now**.

The owner plans to charge for automatic sync later. `createSyncEngine({ auto: true })` is that background mode: it's built and tested but switched off.

### Merge rules
| Item | Rule |
|---|---|
| **A lesson in progress** (a "session") | The copy with the **most progress** (furthest screen) wins, even if older. A deliberate "start over" is kept unless the other copy was worked on after it. |
| **A finished lesson** | It stays finished, and keeps the best score. |
| **A test** | A submitted test stays submitted; otherwise the latest change wins. |
| **Drafts and settings** | The latest change wins. |

### Testing sync
- **Project:** use the Firestore emulator on 8080 with project `demo-studypiece-sync`, so other projects on the emulator are untouched.
- **Two simulated devices:** the old session scratchpad has `scan/synctest.mjs`.
- **The real app in two Chrome profiles:** use temporary stand-ins for `AuthProvider` and `firebase` through a temporary Vite config. Delete them afterwards.

**Not yet confirmed:** sync has not been tried with a real sign-in on the owner's devices.

---

## 8. Firestore data and rules

| Path | Use | Access |
|---|---|---|
| `users/{uid}` | profile: department, level, name, favourites, login days | own record; admins can list |
| `users/{uid}/sync/{bucket}` | synced study data | own data only |
| `config/forYou` | admin For you dates | signed-in students read; admins write |

Everything else is closed. The `ex-cbt` and `examiner` apps once used their own named databases in this project.

To dry-run rules without deploying, call the `firebaserules` REST `:test` endpoint with a gcloud token. Past sessions did this before deploying rules.

---

## 9. Open items and pending decisions

1. **Dawn (AI) in StudyPiece, still being discussed. Don't build it yet.**
   - Dawn is the owner's AI, used in their "Quality Tools" apps (PeraForm, HyperCBT) on the `quality-toolsx` project. Students pay for credits there after their free credits run out or expire.
   - **How it works there:** the shared function `aiRun` reserves credits, runs Gemini through Vertex AI, then charges what was used. Wallets live in a `billing` database. 1 credit = ₦20 with a 2.5× markup, there are Paystack packs, and credits expire 12 months after the last top-up. Code is in `C:\Users\IAR\Documents\code\peraform\functions\billing` and `functions\ai`, and HyperCBT is in `..\ex-cbt`.
   - **Decided so far:** StudyPiece keeps **its own wallet on `quick-cbt`**, and new students get **3 free credits**, then buy.
   - **Not decided:** what Dawn does for students, pricing and packs, whether free credits expire, and payments.
   - **Watch out:** with PeraForm's reservation sizes, 3 credits would allow only one Standard run, so StudyPiece needs smaller reservations. "Best" quality costs more than 3 credits.
2. **STA 221:** the notes have been analysed and a 65-page notes PDF made (`C:\Users\IAR\Downloads\STA221_notes.pdf`) from the lecturer's compiled notes; the tutorial and question bank follow it. No past papers have been seen yet: if the owner sends some, add them to the exam practice lessons and the Exam focus set.
3. **Unconfirmed on real devices:**
   - real sign-in with the Java runner and with sync;
   - saving a For you date to the real database;
   - the Intro to Java chapter on a phone;
   - the collapsible chapter on a real phone;
   - "Try it live" (CheerpJ).
4. **Consistent systems (MTH 209):** the owner's notebook says a system with more unknowns than equations isn't "consistent". That's mathematically wrong, so the app keeps the correct definition (at least one solution). The owner may check with their lecturer.
5. **Old runner images:** three old runner images in Artifact Registry cost about $0.04 a month, and can be deleted at the next runner deploy if the owner agrees.
6. **Spending limit:** the owner set the Blaze plan limit at about $0.4. Keep database reads and writes small.

---

## 10. Where things are on this PC

- **Repo:** `C:\Users\IAR\Documents\code\studypiece`.
- **Source notes and past papers:** in `C:\Users\IAR\Downloads`: course PDFs, WhatsApp zips of notebook photos, COS 201 and COS 202 slides, and the MAT 222 and MTH 209 papers.
- **Persistent AI notes:** `C:\Users\IAR\.claude\projects\C--Users-IAR-Documents-code-studypiece\memory\`, with more detail per course. Start with `MEMORY.md`.
