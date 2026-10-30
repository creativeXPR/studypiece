import { useEffect, useMemo, useState } from 'react';
import { courses } from '../../data/courses';
import { forYouEnd, isNewCourse, onForYou } from '../../data/forYou';
import { addDays, dayKey, formatDay } from '../../lib/dates';
import { clearForYouDate, setForYouDate, watchForYou } from '../../lib/forYouStore';

const saveError = (err) =>
  err.code === 'permission-denied'
    ? 'This account can’t change that. Sign in with an admin Google account.'
    : `Couldn’t save: ${err.message}`;

function statusOf(course, entries, today) {
  const set = entries?.[course.code];
  if (set) return today <= set ? `On For you for everyone through ${formatDay(set)}` : `Removed: its date ended on ${formatDay(set)}`;
  if (isNewCourse(course, today)) return `On For you automatically, as a new course, through ${formatDay(forYouEnd(course))}`;
  return 'Only for its own department and level';
}

function CourseRow({ course, entries, today }) {
  const on = onForYou(course, entries, today);
  const end = forYouEnd(course, entries);
  const [draft, setDraft] = useState(on ? end : '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const hasDate = !!entries?.[course.code];
  const canSave = !!draft && draft >= today && draft !== entries?.[course.code];

  const act = async (fn) => {
    setBusy(true);
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(saveError(err));
    }
    setBusy(false);
  };

  return (
    <li className={`foryou-row${on ? ' on' : ''}`}>
      <div className="foryou-info">
        <strong>{course.code}</strong> {course.title && <span className="muted">{course.title}</span>}
        <p className="muted small">{statusOf(course, entries, today)}</p>
        {error && <p className="foryou-error small" role="alert">{error}</p>}
      </div>
      <div className="foryou-controls">
        <label>
          <span className="muted small">Show until</span>
          <input className="input input-date" type="date" value={draft} min={today} onChange={(e) => setDraft(e.target.value)} />
        </label>
        <button className="btn btn-primary btn-sm" disabled={busy || !canSave} onClick={() => act(() => setForYouDate(course.code, draft))}>
          Save
        </button>
        {on && (
          <button className="btn btn-outline btn-sm" disabled={busy} onClick={() => act(() => setForYouDate(course.code, dayKey(addDays(new Date(), -1))))}>
            Remove now
          </button>
        )}
        {hasDate && (
          <button className="btn btn-ghost btn-sm" disabled={busy} onClick={() => act(() => clearForYouDate(course.code))}>
            Clear date
          </button>
        )}
      </div>
    </li>
  );
}

export default function ForYouAdmin() {
  const [entries, setEntries] = useState(null);
  useEffect(() => watchForYou(setEntries), []);
  const today = dayKey();

  // Courses showing for everyone come first.
  const sorted = useMemo(
    () => [...courses].sort((a, b) => onForYou(b, entries, today) - onForYou(a, entries, today)),
    [entries, today],
  );

  return (
    <section className="card foryou-admin">
      <h2 className="card-title">“For you” courses</h2>
      <p className="muted small">
        Pick a date to show a course to every student, whatever their department or level. It comes off after that day.
        Students always keep the courses for their own department and level.
      </p>
      {!entries ? (
        <div className="spinner" aria-label="Loading" />
      ) : (
        <ul className="foryou-list">
          {sorted.map((course) => (
            <CourseRow key={`${course.code}|${forYouEnd(course, entries)}`} course={course} entries={entries} today={today} />
          ))}
        </ul>
      )}
    </section>
  );
}
