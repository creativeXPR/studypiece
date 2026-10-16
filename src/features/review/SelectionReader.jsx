import { useEffect, useState } from 'react';
import { speak, stopSpeaking } from '../../lib/speech';
import { SpeakerIcon, StopIcon } from '../../lib/icons';

// Selected text with KaTeX swapped back to its $…$ source, so math is read as words.
function readableSelection(selection) {
  const range = selection.getRangeAt(0).cloneRange();
  const startMath = range.startContainer.parentElement?.closest('.katex');
  const endMath = range.endContainer.parentElement?.closest('.katex');
  if (startMath) range.setStartBefore(startMath);
  if (endMath) range.setEndAfter(endMath);
  const fragment = range.cloneContents();
  for (const math of fragment.querySelectorAll('.katex')) {
    const tex = math.querySelector('annotation')?.textContent;
    math.replaceWith(document.createTextNode(tex ? ` $${tex}$ ` : math.textContent));
  }
  return fragment.textContent.replace(/\s+/g, ' ').trim();
}

/** Floating "Read aloud" button for text selected inside `containerRef`. */
export default function SelectionReader({ containerRef, rate }) {
  const [target, setTarget] = useState(null); // { text, top, left }
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const selection = window.getSelection();
        const container = containerRef.current;
        if (!selection || selection.isCollapsed || !selection.rangeCount || !container) return setTarget(null);
        const range = selection.getRangeAt(0);
        if (!container.contains(range.commonAncestorContainer)) return setTarget(null);
        const text = readableSelection(selection);
        if (!text) return setTarget(null);
        const rect = range.getBoundingClientRect();
        // Touch screens show their own menu above a selection, so go below there.
        const below = window.matchMedia('(pointer: coarse)').matches || rect.top < 90;
        setTarget({
          text,
          top: below ? rect.bottom + 10 : rect.top - 46,
          left: Math.min(Math.max(rect.left + rect.width / 2, 70), window.innerWidth - 70),
        });
      });
    };
    document.addEventListener('selectionchange', update);
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('selectionchange', update);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [containerRef]);

  if (!target) return null;

  async function handleClick() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    await speak(target.text, { rate });
    setSpeaking(false);
  }

  return (
    <button
      type="button"
      className="selection-reader"
      style={{ top: target.top, left: target.left }}
      // Keep the selection alive: a normal mousedown would clear it before the click.
      onMouseDown={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      {speaking ? <StopIcon size={16} /> : <SpeakerIcon size={16} />}
      {speaking ? 'Stop' : 'Read aloud'}
    </button>
  );
}
