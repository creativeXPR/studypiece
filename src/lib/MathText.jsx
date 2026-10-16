import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Splits on $$...$$ (display) and $...$ (inline). Everything else stays plain text,
// so stray "<" or ">" in question text can never be parsed as HTML.
const MATH_PATTERN = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

function parse(text) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(MATH_PATTERN)) {
    if (match.index > last) parts.push({ type: 'text', value: text.slice(last, match.index) });
    const display = match[1] !== undefined;
    const html = katex.renderToString(display ? match[1] : match[2], {
      displayMode: display,
      throwOnError: false,
    });
    parts.push({ type: 'math', html, display });
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export default function MathText({ text, as: Tag = 'span', className }) {
  const parts = useMemo(() => parse(String(text ?? '')), [text]);
  return (
    <Tag className={['math-text', className].filter(Boolean).join(' ')}>
      {parts.map((part, i) =>
        part.type === 'text' ? (
          part.value
        ) : (
          <span
            key={i}
            className={part.display ? 'math-block' : undefined}
            dangerouslySetInnerHTML={{ __html: part.html }}
          />
        ),
      )}
    </Tag>
  );
}
