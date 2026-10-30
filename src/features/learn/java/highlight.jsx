import { Fragment } from 'react';
import { javaLines } from './tokens';

export function LineTokens({ tokens }) {
  if (!tokens.length) return '​';
  return tokens.map((t, i) => (t.cls ? <span key={i} className={t.cls}>{t.text}</span> : <Fragment key={i}>{t.text}</Fragment>));
}

// A plain block of highlighted code. `marks` maps 1-based line numbers to a class.
export function CodeBlock({ code, marks = {}, numbers = true, className = '' }) {
  const lines = javaLines(code);
  return (
    <pre className={`jv-code ${numbers ? 'numbered' : ''} ${className}`}>
      {lines.map((tokens, i) => (
        <div key={i} className={`jv-line ${marks[i + 1] || ''}`}>
          {numbers && <span className="jv-ln">{i + 1}</span>}
          <code><LineTokens tokens={tokens} /></code>
        </div>
      ))}
    </pre>
  );
}
