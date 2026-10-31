// The student's ways to sync by hand: a button at the end of a lesson, a row on the
// profile page and a reminder on the home page.
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon, SyncIcon } from './icons';
import { sync, useSyncRevision } from './sync';
import './sync.css';

const PROBLEM = {
  offline: 'You’re offline. Connect to the internet, then sync.',
  error: 'Couldn’t finish syncing. Check your connection and try again.',
  'signed-out': 'Sign in to sync.',
};

const REMINDER_OFF = 'studypiece.syncReminderOff';

function useSyncNow() {
  const [state, setState] = useState('idle'); // idle | busy | done | offline | error | signed-out
  const run = async () => {
    setState('busy');
    const result = await sync.syncNow();
    setState(result.ok ? 'done' : result.reason);
  };
  return { state, run, problem: PROBLEM[state] };
}

const changes = (n) => `${n} unsynced change${n === 1 ? '' : 's'}`;

function ButtonContent({ state, idle = 'Sync now' }) {
  if (state === 'busy') return <><SyncIcon size={18} className="sync-spin" /> Syncing…</>;
  if (state === 'done') return <><CheckIcon size={18} /> Synced</>;
  return <><SyncIcon size={18} /> {idle}</>;
}

/** Floats at the end of every lesson. In a portal, so screen animations can't move it. */
export function SyncFab() {
  const { state, run, problem } = useSyncNow();
  return createPortal(
    <div className="sync-fab-wrap">
      {problem && <p className="sync-fab-note" role="alert">{problem}</p>}
      <button type="button" className={`sync-fab ${state}`} disabled={state === 'busy'} onClick={run} aria-live="polite">
        <ButtonContent state={state} idle="Sync progress" />
      </button>
    </div>,
    document.body,
  );
}

/** A row on the profile page. */
export function SyncCard() {
  const { state, run, problem } = useSyncNow();
  useSyncRevision();
  const { lastSyncAt, pending } = sync.status();
  const when = lastSyncAt
    ? `Last synced ${new Date(lastSyncAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}`
    : 'Not synced on this device yet';
  return (
    <section className="card list-card">
      <div className="list-row sync-row">
        <div className="sync-row-text">
          <span>Sync progress</span>
          <small className="muted">{pending ? `${changes(pending)} · ${when}` : when}</small>
          {problem && <small className="sync-problem" role="alert">{problem}</small>}
        </div>
        <button type="button" className="btn btn-primary btn-sm" disabled={state === 'busy'} onClick={run}>
          <ButtonContent state={state} idle="Sync" />
        </button>
      </div>
    </section>
  );
}

function reminderIsOff() {
  try {
    return sessionStorage.getItem(REMINDER_OFF) === '1';
  } catch {
    return false;
  }
}

/** On the home page, when this device has something to sync or has never synced. */
export function SyncReminder() {
  const { state, run, problem } = useSyncNow();
  const [off, setOff] = useState(reminderIsOff);
  useSyncRevision();
  const { lastSyncAt, pending } = sync.status();
  if (off || (lastSyncAt && !pending)) return null;

  const later = () => {
    setOff(true);
    try {
      sessionStorage.setItem(REMINDER_OFF, '1');
    } catch {
      // Storage blocked: it only stays hidden until the page reloads.
    }
  };

  return (
    <div className="banner sync-reminder">
      <div>
        <strong>{pending ? `You have ${changes(pending)}.` : 'Studied on another device?'}</strong>
        <span className="muted"> {pending ? 'Sync to continue on your other devices.' : 'Sync to bring your progress here.'}</span>
        {problem && <p className="sync-problem" role="alert">{problem}</p>}
      </div>
      <div className="banner-actions">
        <button type="button" className="btn btn-ghost btn-sm" onClick={later}>Later</button>
        <button type="button" className="btn btn-primary btn-sm" disabled={state === 'busy'} onClick={run}>
          <ButtonContent state={state} />
        </button>
      </div>
    </div>
  );
}
