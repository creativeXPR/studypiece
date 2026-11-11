// Interactive tutorials, keyed by course slug ("GES 103" -> "ges103").
// A course with an entry here gets the Tutorial / Practice chooser and a /learn/<slug> page.
//
// The app starts with the catalogue only: chapters and lessons without their screens, each
// lesson marked `ready` when it has them. `loadTutorial(slug)` downloads one tutorial's lessons.
// A new tutorial folder is registered in ./all.js.
import { tutorialCatalog } from 'virtual:studypiece-catalog';
import { shapeTutorial } from '../courseShape';

const folders = import.meta.glob('./*/index.js', { import: 'default' });

export const tutorials = tutorialCatalog;

export function getTutorial(slug) {
  return tutorials[slug?.toLowerCase()] ?? null;
}

// The previous, complete version of a tutorial that is being rebuilt (it sets `classicOf`).
export function classicFor(slug) {
  return Object.values(tutorials).find((t) => t.classicOf === slug?.toLowerCase()) ?? null;
}

export const tutorialPath = (slug) => `/learn/${slug}`;
export const lessonPath = (slug, lessonId) => `/learn/${slug}/${lessonId}`;

// Works on the catalogue entry and on a downloaded tutorial (which has each lesson's screens).
export function findLesson(tutorial, lessonId) {
  const all = tutorial.chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, chapter: c.n })));
  const i = all.findIndex((l) => l.id === lessonId && l.ready);
  if (i < 0) return null;
  const next = all.slice(i + 1).find((l) => l.ready) ?? null;
  return { lesson: all[i], next };
}

// Downloaded tutorials with their lesson screens, by slug. A failed download isn't kept.
const loaded = new Map();
const pending = new Map();

// The full tutorial if it has been downloaded already, otherwise undefined.
export const getLoadedTutorial = (slug) => loaded.get(slug?.toLowerCase());

export function loadTutorial(slug) {
  const key = slug?.toLowerCase();
  if (loaded.has(key)) return Promise.resolve(loaded.get(key));
  if (!pending.has(key)) {
    const entry = getTutorial(key);
    if (!entry) return Promise.reject(new Error(`No tutorial ${slug}`));
    const job = folders[`./${entry.folder}/index.js`]()
      .then((raw) => {
        const tutorial = { ...shapeTutorial(raw), folder: entry.folder };
        loaded.set(key, tutorial);
        return tutorial;
      })
      .finally(() => pending.delete(key));
    pending.set(key, job);
  }
  return pending.get(key);
}
