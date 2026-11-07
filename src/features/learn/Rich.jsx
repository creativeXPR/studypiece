import MathText from '../../lib/MathText';

// Tutorial text is plain strings with three light marks, so content files never hold HTML:
//   **bold**   ==highlighted term==   `code`   and a blank line starts a new paragraph.
// A paragraph of lines that are each one `code` span is shown as a code block.
// Math goes between $...$ or $$...$$ (KaTeX), as in question files; a single newline
// inside text containing math is kept as a line break, for proofs written line by line.

const MARK = /(`[^`]+`|\*\*[^*]+\*\*|==[^=]+==)/g;

const plain = (s, key) => (s.includes('$') ? <MathText key={key} text={s} /> : s);

export function Inline({ text }) {
  if (text == null) return null;
  return String(text)
    .split(MARK)
    .map((part, i) => {
      if (part.length > 2 && part.startsWith('`') && part.endsWith('`')) return <code key={i} className="tut-code">{part.slice(1, -1)}</code>;
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{plain(part.slice(2, -2))}</strong>;
      if (part.startsWith('==') && part.endsWith('==')) return <mark key={i} className="tut-term">{plain(part.slice(2, -2))}</mark>;
      return plain(part, i);
    });
}

// A paragraph made only of whole-line `code` spans is shown as a code block, indentation kept.
const CODE_BLOCK = /^`[^`\n]*`(\n`[^`\n]*`)*$/;

export function Rich({ text, className = 'tut-body' }) {
  if (!text) return null;
  return (
    <div className={className}>
      {String(text)
        .split(/\n\n+/)
        .map((p, i) =>
          CODE_BLOCK.test(p) ? (
            <pre key={i} className="tut-pre">{p.split('\n').map((l) => l.slice(1, -1)).join('\n')}</pre>
          ) : (
            <p key={i}>
              <Inline text={p} />
            </p>
          ),
        )}
    </div>
  );
}

export function Terms({ terms }) {
  return (
    <dl className="tut-terms">
      {terms.map(([t, d]) => (
        <div key={t}>
          <dt><Inline text={t} /></dt>
          <dd><Inline text={d} /></dd>
        </div>
      ))}
    </dl>
  );
}
