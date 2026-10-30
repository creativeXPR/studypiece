import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Splits on $$...$$ (display) and $...$ (inline) math, and on ```...``` (block) and
// `...` (inline) code. Everything else stays plain text, so stray "<" or ">" in question
// text can never be parsed as HTML. Code is matched first, so a $ inside code is safe.
const MARK_PATTERN = /```\n?([\s\S]+?)\n?```|`([^`\n]+)`|\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;

function parse(text) {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(MARK_PATTERN)) {
    if (match.index > last) parts.push({ type: 'text', value: text.slice(last, match.index) });
    last = match.index + match[0].length;
    if (match[1] !== undefined) {
      parts.push({ type: 'codeblock', value: match[1] });
      continue;
    }
    if (match[2] !== undefined) {
      parts.push({ type: 'code', value: match[2] });
      continue;
    }
    const display = match[3] !== undefined;
    const html = katex.renderToString(display ? match[3] : match[4], {
      displayMode: display,
      throwOnError: false,
    });
    parts.push({ type: 'math', html, display });
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export default function MathText({ text, as: Tag = 'span', className }) {
  const parts = useMemo(() => parse(String(text ?? '')), [text]);
  const hasBlock = parts.some((part) => part.type === 'codeblock');
  const Wrapper = hasBlock && Tag === 'p' ? 'div' : hasBlock && Tag === 'span' ? 'div' : Tag;
  return (
    // A code block can't sit inside a paragraph.
    <Wrapper className={['math-text', className].filter(Boolean).join(' ')}>
      {parts.map((part, i) => {
        if (part.type === 'text') return part.value;
        if (part.type === 'code') return <code key={i} className="text-code">{part.value}</code>;
        if (part.type === 'codeblock') return <pre key={i} className="text-codeblock">{part.value}</pre>;
        return (
          <span
            key={i}
            className={part.display ? 'math-block' : undefined}
            dangerouslySetInnerHTML={{ __html: part.html }}
          />
        );
      })}
    </Wrapper>
  );
}
