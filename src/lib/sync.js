// The app's one sync engine, plus moving data saved by older versions into it.
import { useSyncExternalStore } from 'react';
import { db } from './firebase';
import { createSyncEngine } from './syncEngine';

const memory = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  key: () => null,
  length: 0,
};

function browserStorage() {
  try {
    return window.localStorage;
  } catch {
    return memory;
  }
}

export const sync = createSyncEngine({
  db,
  storage: browserStorage(),
  isOnline: () => navigator.onLine !== false,
});

const OLD_ITEM_AT = 1; // older than anything on the account, so the account copy wins

function takeOld(key) {
  const storage = browserStorage();
  try {
    const raw = storage.getItem(key);
    if (raw === null) return null;
    storage.removeItem(key);
    return raw;
  } catch {
    return null;
  }
}

function json(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function oldKeys(start) {
  const storage = browserStorage();
  const out = [];
  try {
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      if (k?.startsWith(start)) out.push(k);
    }
  } catch {
    // Storage unavailable: nothing to move.
  }
  return out;
}

// Before syncing, lesson results and code drafts belonged to the browser rather than an
// account. They move to whoever signs in first, and the old keys are removed.
function moveOldData(uid) {
  for (const k of oldKeys('studypiece.learn.')) {
    const value = json(takeOld(k));
    if (value) sync.set('lessons', k.slice('studypiece.learn.'.length), value, { at: value.at ?? OLD_ITEM_AT });
  }
  for (const k of oldKeys(`studypiece.lessonrun.${uid}.`)) {
    const value = json(takeOld(k));
    if (!value) continue;
    const { at, ...run } = value;
    sync.set('runs', k.slice(`studypiece.lessonrun.${uid}.`.length), run, { at: at ?? OLD_ITEM_AT });
  }
  for (const k of oldKeys('studypiece.jv.')) {
    const code = takeOld(k);
    if (code !== null) sync.set('drafts', k.slice('studypiece.jv.'.length), code, { at: OLD_ITEM_AT });
  }
  const shuffle = json(takeOld('studypiece.shuffle'));
  if (shuffle) sync.set('prefs', 'shuffle', shuffle, { at: OLD_ITEM_AT });
  const rate = json(takeOld('studypiece.speechRate'));
  if (rate) sync.set('prefs', 'speechRate', rate, { at: OLD_ITEM_AT });

  const session = json(takeOld(`studypiece.session.${uid}`));
  if (session) {
    const { config, sections, startedAt, endsAt, answers, flags, cursor, submittedAt } = session;
    sync.set('testPaper', 'current', { config, sections, startedAt, endsAt }, { at: startedAt });
    sync.set('testState', 'current', { startedAt, answers, flags, cursor, submittedAt }, { at: startedAt });
  }
}

export function startSync(uid) {
  sync.start(uid);
  moveOldData(uid);
}

export function stopSync() {
  sync.stop();
}

/** Tries to send waiting changes before signing out, without blocking for long. */
export function flushSync(ms = 3000) {
  return Promise.race([sync.flush(), new Promise((resolve) => setTimeout(resolve, ms))]);
}

/** Re-renders a component when another device's data arrives. */
export function useSyncRevision() {
  return useSyncExternalStore(sync.subscribe, sync.revision);
}
