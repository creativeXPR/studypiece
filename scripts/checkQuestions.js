// `npm run check` — validates every course file before it reaches students.
// Errors (exit 1) would break the app or the answer key; warnings are worth a look.
import { loadCourses } from './loadCourses.js';

const LABEL_PREFIX = /^\s*(I|II|III|IV|[A-Da-d])[.)]\s/;
const POSITIONAL_OPTION = /\b(both|all|none|neither)\b.*\b(above|below|I|II|III|IV)\b|\b(I|II|III|IV)\s+(and|&|or)\s+(I|II|III|IV)\b/i;
const LABEL_IN_EXPLANATION = /\boptions?\s+\(?(I|II|III|IV|[A-D])\b|\((I|II|III|IV)\)/;

const errors = [];
const warnings = [];
let questionTotal = 0;

let files;
try {
  files = await loadCourses();
} catch (err) {
  console.error(`✖ Could not read a course file: ${err.message}`);
  console.error('  Usually a JSON syntax problem: a missing comma, a trailing comma, or an unescaped " or \\.');
  process.exit(1);
}

const setIdsByCode = new Map();

for (const { file, course } of files) {
  const at = (where, msg) => `${file} › ${where}: ${msg}`;

  if (!course || typeof course !== 'object') {
    errors.push(`${file}: file must contain a course object`);
    continue;
  }
  if (typeof course.code !== 'string' || !course.code.trim()) errors.push(at('code', 'missing course code, e.g. "GES 201"'));
  else if (!/^[A-Z]{3} \d{3}$/.test(course.code)) warnings.push(at('code', `"${course.code}" is not in "ABC 123" form`));
  if (!Array.isArray(course.sets) || course.sets.length === 0) {
    errors.push(at('sets', 'must be a non-empty list'));
    continue;
  }

  const seenIds = setIdsByCode.get(course.code) ?? new Map();
  setIdsByCode.set(course.code, seenIds);

  course.sets.forEach((set, si) => {
    const where = `set ${set?.id ?? si + 1}`;
    if (typeof set?.id !== 'string' || !set.id.trim()) return errors.push(at(where, 'missing "id", e.g. "QS010"'));
    if (seenIds.has(set.id)) errors.push(at(where, `id "${set.id}" already used in ${seenIds.get(set.id)}`));
    seenIds.set(set.id, file);
    if (!/^[A-Za-z0-9-]+$/.test(set.id)) errors.push(at(where, 'id may only contain letters, digits and "-" (it becomes part of the link)'));
    if (!Array.isArray(set.questions) || set.questions.length === 0) return errors.push(at(where, 'needs a non-empty "questions" list'));
    if (set.questions.length !== 25) warnings.push(at(where, `has ${set.questions.length} questions (25 is the standard)`));

    const seenQuestions = new Set();
    set.questions.forEach((q, qi) => {
      questionTotal++;
      const w = `${where} Q${qi + 1}`;
      if (typeof q?.question !== 'string' || !q.question.trim()) return errors.push(at(w, 'missing "question" text'));
      if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 6)
        return errors.push(at(w, '"options" must be a list of 2–6 strings'));
      if (q.options.some((o) => typeof o !== 'string' || !o.trim())) errors.push(at(w, 'every option must be non-empty text'));
      if (new Set(q.options.map((o) => String(o).trim())).size !== q.options.length)
        errors.push(at(w, 'two options are identical'));
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
        errors.push(at(w, `"answer" must be a whole number from 0 to ${q.options.length - 1} (got ${JSON.stringify(q.answer)})`));
      if (typeof q.explanation !== 'string' || !q.explanation.trim()) errors.push(at(w, 'missing "explanation"'));

      if (q.options.some((o) => LABEL_PREFIX.test(o))) warnings.push(at(w, 'options start with a label like "A." or "II." — the app adds labels itself'));
      if (q.options.some((o) => POSITIONAL_OPTION.test(o))) warnings.push(at(w, 'option refers to other options ("Both II and III", "All of the above"); its options won\'t be shuffled'));
      if (LABEL_IN_EXPLANATION.test(q.explanation ?? '')) warnings.push(at(w, 'explanation names an option by label; its options won\'t be shuffled'));
      for (const text of [q.question, ...q.options, q.explanation ?? '']) {
        if ((String(text).replace(/\\\$/g, '').match(/\$/g) || []).length % 2) {
          warnings.push(at(w, 'odd number of "$" — a math expression is not closed'));
          break;
        }
      }
      const key = q.question.trim() + '|' + q.options.join('|');
      if (seenQuestions.has(key)) warnings.push(at(w, 'duplicate of an earlier question in this set'));
      seenQuestions.add(key);
    });
  });
}

for (const w of warnings) console.log(`⚠ ${w}`);
for (const e of errors) console.log(`✖ ${e}`);
console.log(
  `\n${files.length} files · ${questionTotal} questions · ${errors.length} error${errors.length === 1 ? '' : 's'} · ${warnings.length} warning${warnings.length === 1 ? '' : 's'}`,
);
process.exit(errors.length ? 1 : 0);
