import { useState } from 'react';

// Rounds the axis top up to a clean number whose half is also a whole number,
// since these are counts of people (4, 6, 8, 10, 20, 40, 60, …).
function niceMax(value) {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return [1, 2, 4, 6, 8, 10].map((m) => m * magnitude).find((v) => v >= value && (v / 2) % 1 === 0);
}

/** Single-series column chart: one bar per bucket, hover/focus tooltip, table fallback. */
export default function SignInChart({ buckets, weekly }) {
  const [active, setActive] = useState(null);
  const max = niceMax(Math.max(1, ...buckets.map((b) => b.count)));
  const ticks = [max, max / 2, 0];
  // Label only the first, middle and last bucket; the tooltip and table carry the rest.
  const labelled = new Set([0, Math.floor((buckets.length - 1) / 2), buckets.length - 1]);
  const peak = buckets.reduce((best, b, i) => (b.count > (buckets[best]?.count ?? -1) ? i : best), 0);

  return (
    <div className="chart">
      <div className="chart-plot">
        <div className="chart-grid" aria-hidden="true">
          {ticks.map((t) => (
            <div key={t} className="chart-gridline">
              <span>{t.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="chart-bars" role="list" aria-label={weekly ? 'Users signed in per week' : 'Users signed in per day'}>
          {buckets.map((b, i) => (
            <div
              key={b.key}
              role="listitem"
              tabIndex={0}
              className={`chart-col${active === i ? ' active' : ''}`}
              aria-label={`${b.label}: ${b.count} user${b.count === 1 ? '' : 's'}`}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <div className="chart-bar" style={{ height: `${(b.count / max) * 100}%` }} />
              {i === peak && b.count > 0 && buckets.length > 1 && (
                <span className="chart-peak" style={{ '--peak': `${(b.count / max) * 100}%` }}>
                  {b.count}
                </span>
              )}
              {active === i && (
                <div className={`chart-tooltip${i > buckets.length / 2 ? ' left' : ''}`} role="tooltip">
                  <strong>{b.count.toLocaleString()}</strong> user{b.count === 1 ? '' : 's'}
                  <span>{b.label}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="chart-xaxis" aria-hidden="true">
        {buckets.map((b, i) => (
          <span key={b.key}>{labelled.has(i) ? b.short : ''}</span>
        ))}
      </div>
      <details className="chart-table">
        <summary>Show as table</summary>
        <table className="results-table">
          <thead>
            <tr>
              <th>{weekly ? 'Week' : 'Day'}</th>
              <th className="num">Users signed in</th>
            </tr>
          </thead>
          <tbody>
            {buckets.map((b) => (
              <tr key={b.key}>
                <td>{b.label}</td>
                <td className="num">{b.count.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
