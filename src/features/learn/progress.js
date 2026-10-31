import { sync } from '../../lib/sync';

// Lesson results and places follow the signed-in student across devices (lib/syncEngine.js).
const itemKey = (courseSlug, lessonId) => `${courseSlug}.${lessonId}`;

export function getProgress(courseSlug, lessonId) {
  return sync.get('lessons', itemKey(courseSlug, lessonId));
}

export function saveProgress(courseSlug, lessonId, score, of) {
  const prev = getProgress(courseSlug, lessonId) ?? {};
  sync.set(
    'lessons',
    itemKey(courseSlug, lessonId),
    {
      done: true,
      score,
      of,
      best: Math.max(prev.best ?? 0, score),
      at: Date.now(),
    },
    { fast: true },
  );
}

export function lessonsDone(tutorial) {
  // Optional chapters don't count, so skipping them still reaches 100%.
  const ready = tutorial.chapters.filter((c) => !c.optional).flatMap((c) => c.lessons).filter((l) => l.sections);
  const done = ready.filter((l) => getProgress(tutorial.slug, l.id)?.done).length;
  return { done, total: ready.length };
}

// ---------------------------------------------------------------------------
// Lessons in progress: where you are inside a lesson, so coming back on any
// device resumes at the same screen with the same score so far.
// ---------------------------------------------------------------------------

/** { idx, total, results, mem, at } or null */
export function getRun(uid, courseSlug, lessonId) {
  if (!uid) return null;
  const key = itemKey(courseSlug, lessonId);
  const run = sync.get('runs', key);
  return run ? { ...run, at: sync.changedAt('runs', key) } : null;
}

export function saveRun(uid, courseSlug, lessonId, run) {
  if (uid) sync.set('runs', itemKey(courseSlug, lessonId), run);
}

export function clearRun(uid, courseSlug, lessonId) {
  if (uid) sync.remove('runs', itemKey(courseSlug, lessonId));
}

/** Every lesson this user has in progress, newest first: [{ courseSlug, lessonId, ...run }]. */
export function listRuns(uid) {
  if (!uid) return [];
  return sync
    .list('runs')
    .filter((item) => item.value)
    .map(({ key, value, at }) => {
      const [courseSlug, ...rest] = key.split('.');
      return { courseSlug, lessonId: rest.join('.'), ...value, at };
    })
    .sort((a, b) => b.at - a.at);
}
