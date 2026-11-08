import { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import AppHeader from '../../lib/AppHeader';
import { addDays, dayKey, parseDay } from '../../lib/dates';
import { courses } from '../../data/courses';
import { courseStats, normalizeUser, summarize } from './adminStats';
import FeedbackAdmin from './FeedbackAdmin';
import ForYouAdmin from './ForYouAdmin';
import { isUnlocked, lock } from './adminUnlock';
import PasskeyGate from './PasskeyGate';
import SignInChart from './SignInChart';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'users', label: 'Users' },
  { id: 'foryou', label: 'For you' },
];
// Tabs that depend on the date range show the range bar.
const RANGED = new Set(['overview', 'courses', 'users']);

const PRESETS = [
  { id: 'today', label: 'Today', days: 1 },
  { id: '7', label: '7 days', short: '7d', days: 7 },
  { id: '30', label: '30 days', short: '30d', days: 30 },
  { id: '90', label: '90 days', short: '90d', days: 90 },
  { id: 'custom', label: 'Custom' },
];

const PAGE_SIZE = 50;
const TAB_KEY = 'studypiece.admin.tab';

function presetRange(days) {
  const today = new Date();
  return { from: dayKey(addDays(today, -(days - 1))), to: dayKey(today) };
}

async function fetchUsers() {
  const snap = await getDocs(collection(db, 'users'));
  // StudyPiece keys users by auth uid; ids with "@" are email-keyed records
  // left in this database by an older app, not StudyPiece accounts.
  return snap.docs.filter((d) => !d.id.includes('@')).map((d) => normalizeUser(d.id, d.data()));
}

const loadError = (err) =>
  err.code === 'permission-denied'
    ? 'This account isn’t allowed to view all users. Sign in with an admin Google account to see the dashboard.'
    : `Couldn't load users: ${err.message}`;

const formatDateTime = (date) =>
  date ? date.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—';

const fmt = (n, digits = 0) => n.toLocaleString(undefined, { maximumFractionDigits: digits });

function readTab() {
  try {
    const saved = sessionStorage.getItem(TAB_KEY);
    return TABS.some((t) => t.id === saved) ? saved : 'overview';
  } catch {
    return 'overview';
  }
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  return (
    <>
      <AppHeader />
      {unlocked ? (
        <Dashboard
          onLock={() => {
            lock();
            setUnlocked(false);
          }}
        />
      ) : (
        <PasskeyGate onUnlock={() => setUnlocked(true)} />
      )}
    </>
  );
}

function Dashboard({ onLock }) {
  const [tab, setTab] = useState(readTab);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState('7');
  const [range, setRange] = useState(() => presetRange(7));

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setUsers(await fetchUsers());
    } catch (err) {
      setError(loadError(err));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let ignore = false;
    fetchUsers()
      .then((list) => !ignore && setUsers(list))
      .catch((err) => !ignore && setError(loadError(err)))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  const choose = (id) => {
    setTab(id);
    try {
      sessionStorage.setItem(TAB_KEY, id);
    } catch {
      /* private mode: the tab just isn't remembered */
    }
  };

  const validRange = range.from && range.to && range.from <= range.to;
  const stats = useMemo(() => (users && validRange ? summarize(users, range.from, range.to) : null), [users, range, validRange]);
  const perCourse = useMemo(
    () => (users && validRange ? courseStats(users, range.from, range.to, courses.map((c) => ({ code: c.code, title: c.title }))) : null),
    [users, range, validRange],
  );

  const rangeLabel = validRange
    ? range.from === range.to
      ? parseDay(range.from).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
      : `${parseDay(range.from).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} – ${parseDay(range.to).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`
    : 'Pick a valid range';

  const needsUsers = RANGED.has(tab);

  return (
    <main className="page adm">
      <header className="adm-top">
        <h1>Admin</h1>
        <div className="adm-top-actions">
          {needsUsers && (
            <button className="btn btn-ghost btn-sm" onClick={load} disabled={loading}>
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={onLock}>
            Lock
          </button>
        </div>
      </header>

      <nav className="adm-tabs" role="tablist" aria-label="Admin sections">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'active' : ''} onClick={() => choose(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>

      {needsUsers && (
        <div className="adm-range">
          <div className="adm-presets" role="group" aria-label="Time frame">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                aria-pressed={preset === p.id}
                className={preset === p.id ? 'active' : ''}
                onClick={() => {
                  setPreset(p.id);
                  if (p.days) setRange(presetRange(p.days));
                }}
              >
                {p.short ? (
                  <>
                    <span className="adm-long">{p.label}</span>
                    <span className="adm-short" aria-hidden="true">
                      {p.short}
                    </span>
                  </>
                ) : (
                  p.label
                )}
              </button>
            ))}
          </div>
          {preset === 'custom' ? (
            <div className="adm-dates">
              <input className="input input-date" type="date" aria-label="From" value={range.from} max={range.to} onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))} />
              <span className="muted">–</span>
              <input className="input input-date" type="date" aria-label="To" value={range.to} min={range.from} max={dayKey()} onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))} />
            </div>
          ) : (
            <span className="muted small">{rangeLabel}</span>
          )}
        </div>
      )}

      {needsUsers && error && (
        <p className="adm-error" role="alert">
          {error}
        </p>
      )}
      {needsUsers && !error && !stats && <div className="spinner" aria-label="Loading" />}

      {tab === 'overview' && stats && <Overview stats={stats} />}
      {tab === 'courses' && perCourse && <Courses rows={perCourse} />}
      {tab === 'users' && stats && <Users stats={stats} />}
      {tab === 'feedback' && <FeedbackAdmin />}
      {tab === 'foryou' && <ForYouAdmin />}
    </main>
  );
}

function Overview({ stats }) {
  const tiles = [
    ['Signed in', fmt(stats.active.length)],
    ['New accounts', fmt(stats.newUsers)],
    ['Daily average', fmt(stats.dailyAverage, 1)],
    ['Registered', fmt(stats.total)],
  ];
  return (
    <>
      <dl className="adm-stats">
        {tiles.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <section className="adm-section">
        <h2 className="adm-h">{stats.weekly ? 'Signed in per week' : 'Signed in per day'}</h2>
        <SignInChart buckets={stats.buckets} weekly={stats.weekly} />
      </section>
      <p className="muted small adm-note">
        {stats.trackedSince
          ? `Daily sign-ins are recorded from ${parseDay(stats.trackedSince).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}. `
          : 'Daily sign-ins are recorded from this update onwards. '}
        Before that, only each user's most recent visit is known.
      </p>
    </>
  );
}

function Courses({ rows }) {
  const used = rows.filter((r) => r.visits || r.everStudents || r.raters);
  const quiet = rows.length - used.length;
  return (
    <section className="adm-section">
      {used.length === 0 ? (
        <p className="muted adm-empty">No course visits recorded yet. Visits appear after students next open the app.</p>
      ) : (
        <div className="table-scroll">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Course</th>
                <th className="num">Students</th>
                <th className="num">Visits</th>
                <th className="num col-perday">Per day</th>
                <th className="num">Rating</th>
              </tr>
            </thead>
            <tbody>
              {used.map((r) => (
                <tr key={r.code}>
                  <td className="adm-course">
                    <strong>{r.code}</strong>
                    {r.title && <span className="muted adm-sub">{r.title}</span>}
                  </td>
                  <td className="num">{fmt(r.students)}</td>
                  <td className="num">{fmt(r.visits)}</td>
                  <td className="num col-perday">{fmt(r.perDay, 1)}</td>
                  <td className="num">{r.rating ? `${fmt(r.rating, 1)} ★ (${r.raters})` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="muted small adm-note">
        A visit is a student opening a course, its tutorial or a test, counted once per half hour. Visits reach this page the
        next time that student opens the app, at no extra cost. Ratings are averaged over all time.
        {quiet > 0 && ` ${quiet} course${quiet === 1 ? ' has' : 's have'} no visits or ratings yet.`}
      </p>
    </section>
  );
}

function Users({ stats }) {
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);
  const q = search.trim().toLowerCase();
  const list = stats.active.filter((u) => !q || `${u.name} ${u.email} ${u.department} ${u.level}`.toLowerCase().includes(q));

  return (
    <section className="adm-section">
      <div className="adm-section-head">
        <p className="muted small">
          {fmt(list.length)} active user{list.length === 1 ? '' : 's'}
        </p>
        <input
          className="input adm-search"
          type="search"
          placeholder="Search name, email, department"
          aria-label="Search users"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShown(PAGE_SIZE);
          }}
        />
      </div>
      {list.length === 0 ? (
        <p className="muted adm-empty">No users {q ? 'match that search' : 'signed in during this time frame'}.</p>
      ) : (
        <div className="table-scroll">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="col-email">Email</th>
                <th className="col-dept">Department</th>
                <th className="col-level">Level</th>
                <th>Last active</th>
              </tr>
            </thead>
            <tbody>
              {list.slice(0, shown).map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td className="col-email muted">{u.email}</td>
                  <td className="col-dept capitalize">{u.department || '—'}</td>
                  <td className="col-level">{u.level || '—'}</td>
                  <td className="muted">{formatDateTime(u.lastActive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {list.length > shown && (
        <button className="btn btn-ghost btn-sm adm-more" onClick={() => setShown((n) => n + PAGE_SIZE)}>
          Show {Math.min(PAGE_SIZE, list.length - shown)} more
        </button>
      )}
    </section>
  );
}
