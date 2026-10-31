import { readJSON, writeJSON } from '../../lib/storage';

// Lesson completion is kept per browser, like the shuffle preferences.
const key = (courseSlug, lessonId) => `studypiece.learn.${courseSlug}.${lessonId}`;

export function getProgress(courseSlug, lessonId) {
  return readJSON(key(courseSlug, lessonId));
}

export function saveProgress(courseSlug, lessonId, score, of) {
  const prev = getProgress(courseSlug, lessonId) ?? {};
  writeJSON(key(courseSlug, lessonId), {
    done: true,
    score,
    of,
    best: Math.max(prev.best ?? 0, score),
    at: Date.now(),
  });
}

export function lessonsDone(tutorial) {
  // Optional chapters don't count, so skipping them still reaches 100%.
  const ready = tutorial.chapters.filter((c) => !c.optional).flatMap((c) => c.lessons).filter((l) => l.sections);
  const done = ready.filter((l) => getProgress(tutorial.slug, l.id)?.done).length;
  return { done, total: ready.length };
}

// ---------------------------------------------------------------------------
// Lessons in progress: where you are inside a lesson, saved per signed-in user
// on this device (same as a running test), so leaving the app and coming back
// resumes at the same screen with the same score so far.
// ---------------------------------------------------------------------------
const RUN_PREFIX = 'studypiece.lessonrun.';
const runKey = (uid, courseSlug, lessonId) => `${RUN_PREFIX}${uid}.${courseSlug}.${lessonId}`;

/** { idx, total, results, mem, at } or null */
export function getRun(uid, courseSlug, lessonId) {
  return uid ? readJSON(runKey(uid, courseSlug, lessonId)) : null;
}

export function saveRun(uid, courseSlug, lessonId, run) {
  if (uid) writeJSON(runKey(uid, courseSlug, lessonId), { ...run, at: Date.now() });
}

export function clearRun(uid, courseSlug, lessonId) {
  if (uid) writeJSON(runKey(uid, courseSlug, lessonId), null);
}

/** Every lesson this user has in progress, newest first: [{ courseSlug, lessonId, ...run }]. */
export function listRuns(uid) {
  if (!uid) return [];
  const prefix = `${RUN_PREFIX}${uid}.`;
  const runs = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith(prefix)) continue;
      const [courseSlug, ...rest] = k.slice(prefix.length).split('.');
      const run = readJSON(k);
      if (run) runs.push({ courseSlug, lessonId: rest.join('.'), ...run });
    }
  } catch {
    // Storage unavailable: nothing to resume.
  }
  return runs.sort((a, b) => b.at - a.at);
}
