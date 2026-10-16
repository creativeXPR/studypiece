// Grid of numbered question buttons. `getState(i)` returns a list of state
// class names for question i (e.g. ['answered', 'flagged'] or ['wrong']).
export default function QuestionPalette({ count, current, getState, onSelect, visible }) {
  return (
    <div className="palette" role="list">
      {Array.from({ length: count }, (_, i) => {
        if (visible && !visible(i)) return null;
        const states = getState(i);
        return (
          <button
            key={i}
            role="listitem"
            className={['palette-cell', i === current && 'current', ...states].filter(Boolean).join(' ')}
            onClick={() => onSelect(i)}
            aria-label={`Question ${i + 1}${states.length ? ` (${states.join(', ')})` : ''}`}
            aria-current={i === current ? 'true' : undefined}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
