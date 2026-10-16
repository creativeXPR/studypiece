export default function ShuffleToggles({ prefs, onChange, showQuestionOrder = true }) {
  return (
    <div className="shuffle-toggles">
      {showQuestionOrder && (
        <label className="checkbox">
          <input type="checkbox" checked={prefs.shuffle} onChange={(e) => onChange({ shuffle: e.target.checked })} />
          Shuffle question order
        </label>
      )}
      <label className="checkbox">
        <input
          type="checkbox"
          checked={prefs.shuffleOptions}
          onChange={(e) => onChange({ shuffleOptions: e.target.checked })}
        />
        Shuffle answer options
      </label>
    </div>
  );
}
