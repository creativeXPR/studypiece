# Adding questions with an AI

This takes about 10 minutes per course:

1. Give an AI (ChatGPT, Claude, Gemini…) **Prompt 1** plus your course notes. It replies with JSON.
2. Give it **Prompt 2** so it double-checks its own answer key.
3. Save the JSON into `src/data/courses/`, run `npm run check`, then try it in the app.

---

## Prompt 1: generate questions

Copy everything in the box. Fill in the four `[…]` lines, then paste your notes at the bottom.

````text
You are writing multiple-choice practice questions for a university CBT app.

COURSE CODE: [e.g. GES 201]
COURSE TITLE: [e.g. Use of English & Literature]
FIRST SET NUMBER: [e.g. 10 → ids start at QS010; use 1 for a brand-new course]
TOPICS / SETS WANTED: [e.g. "3 sets: 1) Word stress, 2) Intonation, 3) Poetry" or "as many sets as the notes support"]

OUTPUT FORMAT
Reply with ONE JSON object and nothing else (no commentary before or after), in a single ```json code block:

{
  "code": "GES 201",
  "title": "Use of English & Literature",
  "sets": [
    {
      "id": "QS010",
      "title": "Short topic name for this set",
      "questions": [
        {
          "question": "The question text?",
          "options": ["first option", "second option", "third option", "fourth option"],
          "answer": 1,
          "explanation": "Why the correct option is right, and why the tempting wrong ones are wrong."
        }
      ]
    }
  ]
}

FIELD RULES
- "code": exactly as given above, e.g. "GES 201" (3 capital letters, a space, 3 digits).
- "id": "QS" + 3 digits, counting up from the first set number: QS010, QS011, QS012…
- Each set has EXACTLY 25 questions and a short, specific "title" naming its topic.
- "options": exactly 4 strings. Do NOT start them with letters or numerals ("A.", "II)") — the app adds labels.
- "answer": the POSITION of the correct option, counting from 0.
  0 = first option, 1 = second, 2 = third, 3 = fourth.
- Spread the correct answer evenly across positions 0, 1, 2 and 3 (roughly equal counts per set). Never let one position dominate.
- "explanation": 2–4 sentences. Say why the correct option is right AND why the most tempting wrong option is wrong. Teach the rule or fact, not just the answer.

CONTENT RULES
- Use ONLY facts found in the notes below. If the notes are unclear or contradict themselves on a point, skip that point rather than guessing.
- Exactly one option must be correct. Wrong options must be plausible (common mistakes, near-misses), never silly.
- Options must be similar in length and style, so the answer isn't obvious from its length.
- NEVER write options that point at other options: no "All of the above", "None of the above", "Both A and B", "I and III".
- NEVER mention an option by its letter or number in the explanation ("Option B is correct"). Name the answer in words instead — the app shuffles the options.
- Mix question types: definitions, identify-the-example, apply-the-rule, odd-one-out, "which is NOT…", quotation → device/meaning, cause → effect.
- No duplicate or near-duplicate questions, within a set or across sets.
- Each question must make sense on its own (no "in the previous question…").

TEXT RULES
- Inside text, use curly quotes “ ” and ’ instead of straight " quotes, so the JSON stays valid.
- Math goes between $ … $ in LaTeX, with backslashes doubled: "$\\frac{1}{2}$", "$x^2$".
- Plain text only: no HTML, no Markdown (no **bold**).

BEFORE YOU ANSWER
For every question, re-derive the correct answer from the notes and confirm "answer" points at that option's position. Confirm each set has 25 questions and that answer positions are balanced.

If the whole output would be too long for one reply, output ONE set per reply as a complete JSON object in the same format (with "code" and a "sets" list holding just that set), then stop and wait for me to type "next".

NOTES:
[paste your course notes here]
````

---

## Prompt 2: have the AI check its own answer key

Send this in the same chat, straight after it gives you the JSON:

````text
Now audit the JSON you just wrote, question by question:
1. Solve each question yourself from the notes, without looking at "answer".
2. Check that "answer" is the position (0–3) of the option you got.
3. Check the explanation agrees with that option and does not mention option letters/numbers.
4. Check no option is "All/None of the above" or refers to other options.

List every problem you found as: set id, question number, what was wrong, what you changed.
Then output the full corrected JSON in the same format. If nothing was wrong, say so and output it unchanged.
````

AI can still get things wrong, especially calculations. Spot-check a few questions per set yourself, and pay closest attention to anything involving numbers.

---

## Adding it to the app

1. **Save the JSON** as a new file in `src/data/courses/`:
   - New course: name it after the code, e.g. `ges202.json`.
   - More sets for an existing course: use a new file with the same `"code"`, e.g. `ges201-extra.json` or `ges201-qs010.json`. Its sets are added to that course automatically. Just make sure the set ids don't repeat existing ones.
   - Copy only what's inside the ```json block, not the ``` fences.

2. **Check it**:
   ```bash
   npm run check
   ```
   - `✖` lines are errors and must be fixed. Each one names the file, set and question, e.g.
     `ges202.json › set QS003 Q7: "answer" must be a whole number from 0 to 3 (got 4)`.
   - `⚠` lines are warnings, worth a look but they won't break anything.
   - "Could not read a course file" means broken JSON: usually a missing or extra comma, or a straight `"` inside text. Paste the error back to the AI and ask it to fix the JSON.

3. **Try it**:
   ```bash
   npm run dev
   ```
   Open the course (e.g. `http://localhost:5173/course/ges202`), take a set, then use **Check answers** to read the explanations.

4. **Publish**:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
   The build creates the share links and WhatsApp previews for the new sets automatically.

---

## Format reference

| Field | Required | Meaning |
|---|---|---|
| `code` | yes | Course code, e.g. `"GES 201"`. It becomes the link `/course/ges201`, and its first digit is the level. |
| `title` | no | Course name shown under the code. |
| `showToAll` | no | `true` shows the course under **For you** for every student, whatever their department or level. |
| `sets[].id` | yes | e.g. `"QS010"`. It becomes the link `/course/ges201/qs010`. Must be unique within the course. |
| `sets[].title` | no | Topic of the set. Defaults to "Set 1", "Set 2"… |
| `question` | yes | The question text. |
| `options` | yes | 2–6 answer choices (4 is standard), with no "A." or "I." prefixes. |
| `answer` | yes | Position of the correct option, counting from 0: `0` = first, `3` = fourth. |
| `explanation` | yes | Shown on the Check answers page. |
