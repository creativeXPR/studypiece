// How a course and a tutorial look once loaded. Shared by the app (src/data/*/index.js), the
// full copies the build scripts read (src/data/*/all.js) and the catalogue (scripts/catalog.js).
import { courseSlug, setSlug } from './slugs.js';

function levelOf(code) {
  const digit = code.match(/\d/)?.[0];
  return digit ? Number(digit) * 100 : null;
}

// A merged course file, with its links, level and set titles filled in.
export function shapeCourse(course) {
  return {
    ...course,
    slug: courseSlug(course.code),
    prefix: course.code.split(' ')[0],
    level: course.level ?? levelOf(course.code),
    questionCount: course.sets.reduce((n, s) => n + s.questions.length, 0),
    sets: course.sets.map((set, i) => ({ ...set, slug: setSlug(set.id), title: set.title || `Set ${i + 1}`, count: set.questions.length })),
  };
}

// Newest first: most recently updated courses on top, then by code.
export const byNewest = (a, b) => (b.updated ?? '').localeCompare(a.updated ?? '') || a.code.localeCompare(b.code);

// A tutorial with its link name, and every lesson marked ready once it has screens.
export function shapeTutorial(tutorial) {
  return {
    ...tutorial,
    slug: tutorial.slug ?? courseSlug(tutorial.code),
    chapters: tutorial.chapters.map((c) => ({ ...c, lessons: c.lessons.map((l) => ({ ...l, ready: !!l.sections })) })),
  };
}
