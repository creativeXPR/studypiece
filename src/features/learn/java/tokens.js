import { javaLanguage } from '@codemirror/lang-java';
import { classHighlighter, highlightCode } from '@lezer/highlight';

// Static Java colouring for read-only code (bug hunts, predict-the-output, solutions).
// It uses the same lezer parser and `tok-*` classes as the editor, so both look alike.
export function javaLines(code) {
  const lines = [[]];
  highlightCode(
    code,
    javaLanguage.parser.parse(code),
    classHighlighter,
    (text, cls) => lines[lines.length - 1].push({ text, cls }),
    () => lines.push([]),
  );
  return lines;
}
