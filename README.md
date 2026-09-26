# StudyPiece

CBT practice for undergraduate courses: pick question sets, take a timed test, see your score, then review every answer with its explanation.

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Sign-in is Google via the existing Firebase project `quick-cbt`. Any domain the app is served from must be listed in that project under Authentication → Settings → Authorized domains (add `studypiece.web.app`).

## Deploy (Firebase Hosting)

```bash
npm run build
firebase deploy --only hosting --project <your-hosting-project-id>
```

`firebase.json` serves `dist/` with an SPA fallback. Set `SITE_URL` before building if the site moves off `https://studypiece.web.app`, since link-preview images need absolute URLs.

## Structure

```
src/
  app/              App (routes + guards), AuthProvider, TestProvider
  features/
    auth/           Google sign-in
    onboarding/     Department + level (also used for "Edit profile")
    select-test/    Home: course list with search / "For you"
    course/         Course page (sets, random mix) and test intro page
    test/           Timed test, palette, keyboard shortcuts
    results/        Score summary per section
    review/         Check answers with explanations
  lib/              Shared: firebase, MathText (KaTeX), scoring, sharing, UI pieces
  data/
    courses/        One file per course, auto-registered
    departments.js  Department list + course-code prefixes per department
scripts/
  linkPreviews.js   Build step: per-course/per-set HTML + preview images for WhatsApp
```

## Adding a course

**To generate questions with an AI, see [docs/adding-questions.md](docs/adding-questions.md).** It has a ready-made prompt, a self-check prompt, and the steps below.

Create `src/data/courses/<code>.json` (or `.js`). Every file in that folder (except `index.js`) is picked up automatically. Files that share a `code` are merged, so `ges201-extra.json` adds sets to GES 201. Run `npm run check` after adding or editing questions.

```js
export default {
  code: 'BIO 101',          // "<PREFIX> <NUMBER>", first digit = level
  title: 'General Biology', // optional
  sets: [
    {
      id: 'QS001',
      title: 'Cell structure', // optional, defaults to "Set 1", "Set 2", ...
      questions: [
        {
          question: 'Which organelle is the site of aerobic respiration?',
          options: ['Ribosome', 'Mitochondrion', 'Golgi body', 'Lysosome'],
          answer: 1, // 0-based index; options display as I, II, III, IV
          explanation: 'Aerobic respiration (Krebs cycle and oxidative phosphorylation) happens in the mitochondrion...',
        },
      ],
    },
  ],
};
```

- Math goes between `$...$` (inline) or `$$...$$` (display) and is rendered with KaTeX. Escape backslashes in JS strings: `'$\\frac{a}{b}$'`.
- Text is rendered as plain text (no HTML).
- Explanations may refer to options by their labels (I–IV).

A course shows under **For you** when its prefix is in the student's department list (`data/departments.js`) and its level matches. Every course is always reachable through search or **All courses**.

## Links

| URL | Page |
|---|---|
| `/course/ges201` | Course page: all sets, random mix, share buttons |
| `/course/ges201/qs003` | One test: info, duration, shuffle options, Start |

Course ids are the code without spaces, lowercased. Set ids are the set `id`, lowercased. Someone who opens a shared link while signed out is sent back to it after signing in.

WhatsApp and other apps don't run JavaScript, so `npm run build` writes a static `index.html` with Open Graph tags plus a 1200×630 image (`dist/og/…png`) for every course and set. Each link then shows its own preview card.

## How a test works

- Randomisation: "Shuffle question order" and "Shuffle answer options" are both on by default and remembered per browser. Options that refer to other options ("Both II and III", "All of the above"), or whose explanation names an option label, keep their original order. Random mix draws N questions from every set of the course. Retake reshuffles.
- The test is saved in `localStorage` per user, so a reload or accidental close resumes where it left off. The timer counts down to a fixed end time and auto-submits.
- Keys: `1–4` / `A–D` answer, `←` `→` move, `F` flag.
