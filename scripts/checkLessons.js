// `npm run check` (second half) — validates every interactive tutorial lesson.
// Lesson files import each other without extensions, so they load through Vite.
// Errors (exit 1) would break a screen; warnings are worth a look.
import { createServer } from 'vite';
import { checkText } from './textChecks.js';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const errors = [];
const warnings = [];
let lessonTotal = 0;
let screenTotal = 0;

// Screen types the player knows: src/features/learn/screens.jsx and the Java screens.
const TYPES = new Set([
  'story', 'choice', 'multi', 'sort', 'order', 'reveal', 'recall', 'bridge', 'custom', 'finish',
  'code', 'trace', 'predict', 'bug', 'fill', 'better', 'flow',
]);

function walkText(value, warn) {
  if (typeof value === 'string') checkText(value, warn);
  else if (Array.isArray(value)) value.forEach((v) => walkText(v, warn));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => walkText(v, warn));
}

function checkScreen(s, err) {
  if (!TYPES.has(s.type)) return err(`unknown screen type "${s.type}"`);
  if (s.type === 'choice' && !s.poll) {
    const right = (s.options || []).filter((o) => o.correct).length;
    if (right !== 1) err(`choice has ${right} correct options (needs exactly 1, or "poll")`);
  }
  if (s.type === 'multi' && !(s.options || []).some((o) => o.correct)) err('multi has no correct option');
  if (s.type === 'sort') {
    const ids = new Set((s.buckets || []).map((b) => b.id));
    for (const it of s.items || []) if (!ids.has(it.bucket)) err(`sort item goes to "${it.bucket}", which is not a bucket`);
  }
  if (s.type === 'reveal' && !(s.cards || []).length) err('reveal has no cards');
  if (s.type === 'custom' && s.widget === 'calc') {
    (s.graph?.steps || []).forEach((st, i) => {
      if (st.options) {
        if (!Number.isInteger(st.answer) || st.answer < 0 || st.answer >= st.options.length) err(`calc step ${i + 1}: answer ${st.answer} is not an option number`);
      } else if (typeof st.answer !== 'number' || Number.isNaN(st.answer)) err(`calc step ${i + 1}: answer is not a number`);
    });
  }
}

try {
  const { tutorials } = await server.ssrLoadModule('/src/data/tutorials/all.js');
  for (const tut of Object.values(tutorials)) {
    const seen = new Set();
    for (const chapter of tut.chapters) {
      for (const lesson of chapter.lessons || []) {
        lessonTotal++;
        const where = `${tut.code} › ${lesson.id}`;
        if (seen.has(lesson.id)) errors.push(`${where}: lesson id used twice`);
        seen.add(lesson.id);
        const screens = (lesson.sections || []).flatMap((sec) => sec.screens || []);
        screenTotal += screens.length;
        if (!screens.length) errors.push(`${where}: no screens`);
        screens.forEach((s, i) => checkScreen(s, (msg) => errors.push(`${where} #${i + 1}: ${msg}`)));
        walkText(lesson, (msg) => warnings.push(`${where}: ${msg}`));
      }
    }
  }
} finally {
  await server.close();
}

for (const w of warnings) console.log(`⚠ ${w}`);
for (const e of errors) console.log(`✖ ${e}`);
console.log(
  `\n${lessonTotal} lessons · ${screenTotal} screens · ${errors.length} error${errors.length === 1 ? '' : 's'} · ${warnings.length} warning${warnings.length === 1 ? '' : 's'}`,
);
process.exit(errors.length ? 1 : 0);
