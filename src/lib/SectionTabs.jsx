import { useEffect, useRef } from 'react';

// Horizontal tabs, one per test section. Hidden when there's only one section.
export default function SectionTabs({ sections, current, onSelect, meta }) {
  const ref = useRef(null);

  // On narrow screens the active tab can sit off-screen in the scroll strip.
  useEffect(() => {
    ref.current?.children[current]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current]);

  if (sections.length < 2) return null;
  return (
    <div className="section-tabs" role="tablist" ref={ref}>
      {sections.map((s, i) => (
        <button
          key={s.key}
          role="tab"
          aria-selected={i === current}
          className={`section-tab ${i === current ? 'active' : ''}`}
          onClick={() => onSelect(i)}
        >
          <span>{s.label}</span>
          {meta && <span className="section-tab-meta">{meta(s)}</span>}
        </button>
      ))}
    </div>
  );
}
