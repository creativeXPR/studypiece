// Keeps a signed-in student's study data the same on all their devices.
// This device's storage stays the source of truth for the screen, so everything works offline.
// Each item carries the time it last changed. Items merge one by one (see mergeEntry), so
// work done on two devices, even offline, combines when they reconnect.
import { collection, doc, onSnapshot, runTransaction, serverTimestamp } from 'firebase/firestore';

// users/{uid}/sync/{bucket}: { entries: { key: { at, s, del } }, updatedAt }.
// `s` is the value as JSON, because Firestore can't store nested arrays.
export const BUCKETS = ['lessons', 'runs', 'drafts', 'prefs', 'testPaper', 'testState'];

const MAX_DOC = 900_000; // Firestore's limit is about 1 MiB a document
const TOMBSTONE_DAYS = 60;
const SLOW_MS = 10_000; // at most one upload per 10 s while working
const FAST_MS = 1_500; // finishing a lesson or submitting a test goes up sooner
const RETRY_MS = 30_000;

const newer = (a, b) => {
  if (a.at !== b.at) return a.at > b.at ? a : b;
  if (!!a.del !== !!b.del) return a.del ? a : b;
  return (a.s ?? '') >= (b.s ?? '') ? a : b;
};

const same = (a, b) => a === b || (!!a && !!b && a.at === b.at && a.s === b.s && !!a.del === !!b.del);

const parse = (entry) => {
  try {
    return entry.s ? JSON.parse(entry.s) : null;
  } catch {
    return null;
  }
};

/** The merged result of one item from two devices. Applying it twice changes nothing. */
export function mergeEntry(bucket, a, b) {
  if (!a) return b ?? null;
  if (!b || same(a, b)) return a;
  const latest = newer(a, b);
  const at = Math.max(a.at, b.at);
  if (a.del || b.del) return latest;

  // A finished lesson stays finished, and the best score is kept from either device.
  if (bucket === 'lessons') {
    const older = latest === a ? b : a;
    const top = parse(latest);
    const other = parse(older);
    if (!top || !other) return latest;
    const merged = { ...top, done: !!(top.done || other.done), best: Math.max(top.best ?? 0, other.best ?? 0) };
    return { at, s: JSON.stringify(merged) };
  }

  // A submitted test stays submitted, even if the other device kept going offline.
  if (bucket === 'testState') {
    const x = parse(a);
    const y = parse(b);
    if (x && y && x.startedAt === y.startedAt && !!x.submittedAt !== !!y.submittedAt) {
      return { at, s: x.submittedAt ? a.s : b.s };
    }
  }
  return latest;
}

function mergeMaps(bucket, one, two) {
  const out = {};
  for (const k of new Set([...Object.keys(one), ...Object.keys(two)])) out[k] = mergeEntry(bucket, one[k], two[k]);
  return out;
}

const mapsEqual = (a, b) => {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every((k) => same(a[k], b[k]));
};

// Old "deleted" markers are dropped so documents don't grow forever.
function prune(map, now) {
  const limit = now - TOMBSTONE_DAYS * 86_400_000;
  return Object.fromEntries(Object.entries(map).filter(([, e]) => !(e.del && e.at < limit)));
}

// Keeps the newest items that fit one document. What's left out stays on this device.
function fit(map) {
  if (JSON.stringify(map).length <= MAX_DOC) return map;
  const out = {};
  let size = 2;
  for (const [k, e] of Object.entries(map).sort((x, y) => y[1].at - x[1].at)) {
    const len = k.length + JSON.stringify(e).length + 6;
    if (size + len > MAX_DOC) continue;
    out[k] = e;
    size += len;
  }
  return out;
}

export function createSyncEngine({ db, storage, isOnline = () => true, now = Date.now, slowMs = SLOW_MS, fastMs = FAST_MS }) {
  let uid = null;
  let unsubscribe = null;
  let timer = null;
  let timerAt = Infinity;
  let pushing = null;
  let revision = 0;
  const dirty = new Set();
  const listeners = new Set();

  const prefix = (bucket) => `studypiece.sync.${uid ?? 'anon'}.${bucket}.`;

  function readRaw(bucket, key) {
    try {
      const raw = storage.getItem(prefix(bucket) + key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeRaw(bucket, key, entry) {
    try {
      storage.setItem(prefix(bucket) + key, JSON.stringify(entry));
    } catch {
      // Storage full or blocked: the item may still reach the account copy.
    }
  }

  function readAll(bucket) {
    const start = prefix(bucket);
    const out = {};
    try {
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (!k?.startsWith(start)) continue;
        const e = JSON.parse(storage.getItem(k));
        if (e) out[k.slice(start.length)] = e;
      }
    } catch {
      // Storage unavailable: nothing to read.
    }
    return out;
  }

  const notify = () => {
    revision++;
    listeners.forEach((fn) => fn());
  };

  function schedule(bucket, delay) {
    if (!uid) return;
    if (bucket) dirty.add(bucket);
    if (!dirty.size) return;
    const when = now() + delay;
    if (timer && timerAt <= when) return;
    clearTimeout(timer);
    timerAt = when;
    timer = setTimeout(() => {
      timer = null;
      timerAt = Infinity;
      flush();
    }, delay);
  }

  // Brings remote items into this device's storage. True when anything on screen may change.
  function applyLocal(bucket, remote) {
    let changed = false;
    for (const [k, e] of Object.entries(remote)) {
      const mine = readRaw(bucket, k);
      const merged = mergeEntry(bucket, mine, e);
      if (!same(merged, mine)) {
        writeRaw(bucket, k, merged);
        changed = true;
      }
    }
    return changed;
  }

  async function pushBucket(bucket) {
    const forUid = uid;
    const ref = doc(db, 'users', forUid, 'sync', bucket);
    let result = {};
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(ref);
      const remote = snap.data()?.entries ?? {};
      result = mergeMaps(bucket, remote, readAll(bucket));
      const next = fit(prune(result, now()));
      if (!mapsEqual(next, remote)) tx.set(ref, { entries: next, updatedAt: serverTimestamp() });
    });
    if (uid === forUid && applyLocal(bucket, result)) notify();
  }

  /** Uploads waiting changes. Resolves when finished; failures are kept for a retry. */
  function flush() {
    if (!uid || !dirty.size || !isOnline()) return Promise.resolve();
    if (pushing) return pushing;
    const buckets = [...dirty];
    dirty.clear();
    pushing = (async () => {
      let failed = false;
      for (const bucket of buckets) {
        try {
          await pushBucket(bucket);
        } catch (err) {
          failed = true;
          dirty.add(bucket);
          console.warn('Sync will retry:', err.message);
        }
      }
      pushing = null;
      if (dirty.size) schedule(null, failed ? RETRY_MS : fastMs);
    })();
    return pushing;
  }

  function onRemote(snapshot) {
    let changed = false;
    const remote = {};
    snapshot.docs.forEach((d) => {
      if (!BUCKETS.includes(d.id)) return;
      remote[d.id] = d.data().entries ?? {};
      if (applyLocal(d.id, remote[d.id])) changed = true;
    });
    // Once the server has answered, send up anything it doesn't have yet.
    if (!snapshot.metadata.fromCache) {
      for (const bucket of BUCKETS) {
        const local = readAll(bucket);
        if (!mapsEqual(fit(prune(mergeMaps(bucket, remote[bucket] ?? {}, local), now())), remote[bucket] ?? {})) {
          schedule(bucket, fastMs);
        }
      }
    }
    if (changed) notify();
  }

  const onOnline = () => schedule(null, fastMs);
  const onVisibility = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') flush();
    else onOnline();
  };

  return {
    /** Starts syncing for this account. Call before its data is read. */
    start(nextUid) {
      if (uid === nextUid) return;
      this.stop();
      uid = nextUid;
      if (!db) return;
      unsubscribe = onSnapshot(
        collection(db, 'users', uid, 'sync'),
        { includeMetadataChanges: true },
        onRemote,
        (err) => console.warn('Sync is paused:', err.message),
      );
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('online', onOnline);
        window.addEventListener('pagehide', flush);
        document.addEventListener('visibilitychange', onVisibility);
      }
    },

    stop() {
      unsubscribe?.();
      unsubscribe = null;
      clearTimeout(timer);
      timer = null;
      timerAt = Infinity;
      dirty.clear();
      uid = null;
      if (typeof window !== 'undefined' && window.removeEventListener) {
        window.removeEventListener('online', onOnline);
        window.removeEventListener('pagehide', flush);
        document.removeEventListener('visibilitychange', onVisibility);
      }
    },

    flush,

    get(bucket, key) {
      const e = readRaw(bucket, key);
      return e && !e.del ? parse(e) : null;
    },

    /** When the item last changed, or 0. */
    changedAt(bucket, key) {
      const e = readRaw(bucket, key);
      return e && !e.del ? e.at : 0;
    },

    /** Every live item in a bucket: [{ key, value, at }]. */
    list(bucket) {
      return Object.entries(readAll(bucket))
        .filter(([, e]) => !e.del)
        .map(([key, e]) => ({ key, value: parse(e), at: e.at }));
    },

    /** Saves a value. An unchanged value keeps its time, so opening something isn't "newer". */
    set(bucket, key, value, { fast = false, at } = {}) {
      const s = JSON.stringify(value);
      const prev = readRaw(bucket, key);
      if (prev && !prev.del && prev.s === s) return;
      writeRaw(bucket, key, { at: at ?? Math.max(now(), (prev?.at ?? 0) + 1), s });
      schedule(bucket, fast ? fastMs : slowMs);
    },

    remove(bucket, key) {
      const prev = readRaw(bucket, key);
      if (!prev || prev.del) return;
      writeRaw(bucket, key, { at: Math.max(now(), prev.at + 1), del: true });
      schedule(bucket, fastMs);
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    revision: () => revision,
  };
}
