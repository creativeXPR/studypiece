// Course usage, counted for free. Opening a course (its page, tutorial, lessons or a test) is
// tallied on this device per course and day; the tally rides along with the user-record write
// the app already makes every time it starts (AuthProvider), so it costs no extra Firestore
// writes. The admin page reads it from the user records it already loads, so no extra reads.
import { increment } from 'firebase/firestore';
import { dayKey } from './dates';
import { readJSON, writeJSON } from './storage';

const KEY = 'studypiece.usage.pending';
const SEEN = 'studypiece.usage.seen';
// Moving around inside one course (course page → tutorial → lesson) counts as one visit.
const VISIT_GAP = 30 * 60 * 1000;

export function recordVisit(code) {
  if (!code) return;
  const now = Date.now();
  const seen = readJSON(SEEN) ?? {};
  if (now - (seen[code] ?? 0) < VISIT_GAP) return;
  seen[code] = now;
  writeJSON(SEEN, seen);
  const pending = readJSON(KEY) ?? {};
  const day = dayKey();
  pending[code] = { ...pending[code], [day]: (pending[code]?.[day] ?? 0) + 1 };
  writeJSON(KEY, pending);
}

// The tally to send, shaped for a merge into users/{uid}:
// { courseUse: { 'COS 202': { '2026-11-08': increment(2) } } }. Null when there is nothing.
export function pendingUsage() {
  const pending = readJSON(KEY) ?? {};
  const codes = Object.keys(pending);
  if (!codes.length) return null;
  const courseUse = {};
  for (const code of codes) {
    courseUse[code] = {};
    for (const [day, n] of Object.entries(pending[code])) courseUse[code][day] = increment(n);
  }
  return { snapshot: pending, courseUse };
}

// After a successful write, remove exactly what was sent (visits counted meanwhile stay).
export function clearSentUsage(snapshot) {
  const pending = readJSON(KEY) ?? {};
  for (const [code, days] of Object.entries(snapshot)) {
    for (const [day, n] of Object.entries(days)) {
      const left = (pending[code]?.[day] ?? 0) - n;
      if (left > 0) pending[code][day] = left;
      else if (pending[code]) delete pending[code][day];
    }
    if (pending[code] && !Object.keys(pending[code]).length) delete pending[code];
  }
  writeJSON(KEY, pending);
}
