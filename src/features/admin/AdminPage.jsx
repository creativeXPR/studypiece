import { useCallback, useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import AppHeader from '../../lib/AppHeader';
import { addDays, dayKey, parseDay } from '../../lib/dates';
import { normalizeUser, summarize } from './adminStats';
import ForYouAdmin from './ForYouAdmin';
import { isUnlocked, lock } from './adminUnlock';
import PasskeyGate from './PasskeyGate';
import SignInChart from './SignInChart';

const PRESETS = [
  { id: 'today', label: 'Today', days: 1 },
  { id: '7', label: '7 days', days: 7 },
  { id: '30', label: '30 days', days: 30 },
  { id: '90', label: '90 days', days: 90 },
  { id: 'custom', label: 'Custom' },
];

const PAGE_SIZE = 50;

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
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState('7');
  const [range, setRange] = useState(() => presetRange(7));
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState(PAGE_SIZE);

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

  const validRange = range.from && range.to && range.from <= range.to;
  const stats = useMemo(
    () => (users && validRange ? summarize(users, range.from, range.to) : null),
    [users, range, validRange],
  );

  const query = search.trim().toLowerCase();
  const list = (stats?.active ?? []).filter(
    (u) => !query || `${u.name} ${u.email} ${u.department} ${u.level}`.toLowerCase().includes(query),
  );

  function choosePreset(p) {
    setPreset(p.id);
    setShown(PAGE_SIZE);
    if (p.days) setRange(presetRange(p.days));
  }

  const rangeLabel = validRange
    ? range.from === range.to
      ? parseDay(range.from).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })
      : `${parseDay(range.from).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} – ${parseDay(range.to).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`
    : '';

  return (
    <main className="page admin-page">
      <div className="admin-head">
        <div>
          <h1>Admin</h1>
          <p className="muted small">Who's been using StudyPiece</p>
        </div>
        <div className="admin-actions">
          <button className="btn btn-outline btn-sm" onClick={load} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onLock}>
            Lock
          </button>
        </div>
      </div>

      <ForYouAdmin />

      <div className="admin-filters">
        <div className="segmented" role="tablist" aria-label="Time frame">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={preset === p.id}
              className={preset === p.id ? 'active' : ''}
              onClick={() => choosePreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>
        {preset === 'custom' && (
          <div className="date-range">
            <label>
              <span className="muted small">From</span>
              <input
                className="input input-date"
                type="date"
                value={range.from}
                max={range.to}
                onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))}
              />
            </label>
            <label>
              <span className="muted small">To</span>
              <input
                className="input input-date"
                type="date"
                value={range.to}
                min={range.from}
                max={dayKey()}
                onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))}
              />
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="card empty" role="alert">
          <p>{error}</p>
        </div>
      )}
      {!error && !stats && (
        <div className="fullscreen-center">
          <div className="spinner" aria-label="Loading" />
        </div>
      )}

      {stats && (
        <>
          <p className="muted small admin-range">{rangeLabel}</p>
          <div className="stat-grid">
            <div className="card stat-tile">
              <span className="stat-label">Users signed in</span>
              <span className="stat-value">{stats.active.length.toLocaleString()}</span>
            </div>
            <div className="card stat-tile">
              <span className="stat-label">New accounts</span>
              <span className="stat-value">{stats.newUsers.toLocaleString()}</span>
            </div>
            <div className="card stat-tile">
              <span className="stat-label">Daily average</span>
              <span className="stat-value">{stats.dailyAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
            </div>
            <div className="card stat-tile">
              <span className="stat-label">Total registered</span>
              <span className="stat-value">{stats.total.toLocaleString()}</span>
            </div>
          </div>

          <section className="card">
            <h2 className="card-title">{stats.weekly ? 'Users signed in per week' : 'Users signed in per day'}</h2>
            <SignInChart buckets={stats.buckets} weekly={stats.weekly} />
          </section>

          <section className="card">
            <div className="admin-list-head">
              <h2 className="card-title">
                Active users <span className="muted">({list.length.toLocaleString()})</span>
              </h2>
              <input
                className="input admin-search"
                type="search"
                placeholder="Search name, email, department"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShown(PAGE_SIZE);
                }}
              />
            </div>
            {list.length === 0 ? (
              <p className="muted empty">No users {query ? 'match that search' : 'signed in during this time frame'}.</p>
            ) : (
              <div className="table-scroll">
                <table className="results-table admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th className="col-dept">Department</th>
                      <th className="col-level">Level</th>
                      <th>Last active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.slice(0, shown).map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td className="cell-email">{u.email}</td>
                        <td className="col-dept capitalize">{u.department || '—'}</td>
                        <td className="col-level">{u.level || '—'}</td>
                        <td className="cell-date">{formatDateTime(u.lastActive)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {list.length > shown && (
              <button className="btn btn-outline btn-sm admin-more" onClick={() => setShown((n) => n + PAGE_SIZE)}>
                Show {Math.min(PAGE_SIZE, list.length - shown)} more
              </button>
            )}
          </section>

          <p className="muted small admin-note">
            {stats.trackedSince
              ? `Daily sign-ins are recorded from ${parseDay(stats.trackedSince).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}. `
              : 'Daily sign-ins are recorded from this update onwards. '}
            Before that, only each user's most recent visit is known, so older periods show who was last active then.
          </p>
        </>
      )}
    </main>
  );
}
