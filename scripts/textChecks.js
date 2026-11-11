// Text checks shared by checkQuestions.js and checkLessons.js: maths that KaTeX can't render,
// a "$" used as a currency sign, and wording that points at source notes.
import katex from 'katex';

// Same marks as src/lib/MathText.jsx: code first, so a "$" inside code is safe.
const MARK_PATTERN = /```\n?([\s\S]+?)\n?```|`([^`\n]+)`|\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

// Two plain words in a row inside maths usually means the "$" pair was money, as in "₦4.5/$1, and it was ₦192/$1".
const stripCommands = (tex) => tex.replace(/\\(?:text|textbf|mathrm|operatorname|mbox|textit)\s*\{[^}]*\}/g, ' ').replace(/\\[a-zA-Z]+/g, ' ');
const PLAIN_WORDS = /\b[a-zA-Z]{3,},? (?:and|the|was|it|is|of|to|by|for|with)\b/;

// Lessons and questions stay general; they never refer to the material they were built from.
const NOTES = /\b(?:your|the|these) notes\b(?! panel| drawer| tab)/i;

export function checkText(text, warn) {
  if (typeof text !== 'string' || !text) return;
  for (const m of text.matchAll(MARK_PATTERN)) {
    const tex = m[3] ?? m[4];
    if (tex === undefined) continue;
    const consoleWarn = console.warn;
    console.warn = () => {}; // KaTeX's notes about font metrics for symbols like ₦
    try {
      katex.renderToString(tex, { displayMode: m[3] !== undefined, throwOnError: true, strict: 'ignore' });
    } catch (err) {
      console.warn = consoleWarn;
      warn(`maths can't be drawn: "${tex.slice(0, 50)}" (${err.message.split('\n')[0].replace(/^KaTeX parse error: /, '').slice(0, 70)})`);
      continue;
    }
    console.warn = consoleWarn;
    if (PLAIN_WORDS.test(stripCommands(tex))) warn(`maths contains plain words, so a "$" may be a currency sign: "${tex.slice(0, 50)}"`);
  }
  if (NOTES.test(text)) warn(`mentions the notes: "${text.match(new RegExp(`.{0,30}${NOTES.source}.{0,20}`, 'i'))[0]}"`);
}
