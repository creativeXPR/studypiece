// Interactive tutorials, keyed by course slug ("GES 103" -> "ges103").
// A course with an entry here gets the Tutorial / Practice chooser and a /learn/<slug> page.
import { courseSlug } from '../slugs';
import ges103 from './ges103';
import mat222 from './mat222';
import mth209 from './mth209';

const list = [ges103, mat222, mth209].map((t) => ({ ...t, slug: courseSlug(t.code) }));

export const tutorials = Object.fromEntries(list.map((t) => [t.slug, t]));

export function getTutorial(slug) {
  return tutorials[slug?.toLowerCase()] ?? null;
}

export const tutorialPath = (slug) => `/learn/${slug}`;
export const lessonPath = (slug, lessonId) => `/learn/${slug}/${lessonId}`;

export function findLesson(tutorial, lessonId) {
  const all = tutorial.chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c.n })));
  const i = all.findIndex((l) => l.id === lessonId && l.sections);
  if (i < 0) return null;
  const next = all.slice(i + 1).find((l) => l.sections) ?? null;
  return { lesson: all[i], next };
}
