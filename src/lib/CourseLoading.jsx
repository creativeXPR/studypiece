import { useEffect, useState } from 'react';
import { CheckIcon } from './icons';

// Shown while a course's questions or a tutorial's lessons download. It names the course,
// walks through the steps with a spinner on the current one, and fills a progress bar.
// A download can't report its own progress, so the bar eases towards 90% and the words
// change if it takes a while; the page appears the moment the download finishes.
// On a cached or fast connection it's never seen: it fades in only after a short delay.
//   code, title  the course ("MTH 209", "Numerical Analysis")
//   what         'questions' or 'lessons'; amount: how many, for the step text
//   error        a failed download: shows Try again, which calls onRetry
//   overlay      cover the page (when starting a test from a button)
export default function CourseLoading({ code, title, what = 'questions', amount, error, onRetry, overlay = false }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (error) return undefined;
    const started = Date.now();
    const timer = setInterval(() => setElapsed(Date.now() - started), 120);
    return () => clearInterval(timer);
  }, [error]);

  const found = elapsed > 350;
  const progress = error ? 0 : found ? 12 + 78 * (1 - Math.exp(-(elapsed - 350) / 2600)) : (elapsed / 350) * 12;
  const thing = what === 'lessons' ? 'lessons' : 'questions';
  const steps = [
    { label: `Finding ${code}`, state: found ? 'done' : 'active' },
    { label: `Downloading ${amount ? `${amount} ` : 'the '}${thing}`, state: found ? 'active' : 'waiting' },
    { label: what === 'lessons' ? 'Setting up your lesson' : 'Preparing your test', state: 'waiting' },
  ];
  const note =
    elapsed > 15000
      ? 'Still downloading. A slow or patchy connection can take a while; you can keep waiting.'
      : elapsed > 5000
        ? 'Taking a little longer than usual. This only happens the first time you open a course.'
        : `Getting ${code} ready for you.`;

  return (
    <div className={`cl-wrap${overlay ? ' cl-overlay' : ''}`}>
      <div className="cl-card" role="status" aria-live="polite">
        {error ? (
          <>
            <div className="cl-badge cl-badge-error" aria-hidden="true">!</div>
            <h2 className="cl-title">Couldn’t download {code}</h2>
            <p className="cl-note">Check your internet connection, then try again.</p>
            <div className="cl-actions">
              <button type="button" className="btn btn-primary" onClick={onRetry}>Try again</button>
              <button type="button" className="btn btn-ghost" onClick={() => window.location.reload()}>Reload page</button>
            </div>
          </>
        ) : (
          <>
            <div className="cl-spinner" aria-hidden="true">
              <span className="cl-code">{code.split(' ')[0]}</span>
            </div>
            <h2 className="cl-title">Opening {code}</h2>
            {title && <p className="cl-sub">{title}</p>}
            <div className="cl-bar" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </div>
            <ol className="cl-steps">
              {steps.map((s) => (
                <li key={s.label} className={`cl-step ${s.state}`}>
                  <span className="cl-dot">{s.state === 'done' ? <CheckIcon size={12} strokeWidth={3} /> : null}</span>
                  {s.label}
                </li>
              ))}
            </ol>
            <p className="cl-note">{note}</p>
          </>
        )}
      </div>
    </div>
  );
}
