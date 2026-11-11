// Vite plugin: the catalogue the app starts with, as the module "virtual:studypiece-catalog".
// It holds every course and tutorial without their questions and lesson screens (names, set
// titles, counts, lesson titles), so the first page loads fast. Each course's questions and
// each tutorial's lessons are then downloaded on their own when needed (src/data/*/index.js).
// It is computed from src/data/*/all.js at build time, and again in dev whenever data changes.
import path from 'node:path';
import { runnerImport } from 'vite';

const ID = 'virtual:studypiece-catalog';
const RESOLVED = `\0${ID}`;

const omit = (obj, key) => Object.fromEntries(Object.entries(obj).filter(([k]) => k !== key));

async function buildCatalog(root) {
  const load = (file) => runnerImport(path.join(root, file), { configFile: false, logLevel: 'error' }).then((r) => r.module);
  const [{ courses, courseFiles }, { tutorials }] = await Promise.all([load('src/data/courses/all.js'), load('src/data/tutorials/all.js')]);
  const courseCatalog = courses.map((c) => ({ ...c, files: courseFiles[c.code], sets: c.sets.map((s) => omit(s, 'questions')) }));
  const tutorialCatalog = Object.fromEntries(
    Object.entries(tutorials).map(([slug, t]) => [
      slug,
      { ...t, chapters: t.chapters.map((ch) => ({ ...ch, lessons: ch.lessons.map((l) => omit(l, 'sections')) })) },
    ]),
  );
  return `export const courseCatalog = ${JSON.stringify(courseCatalog)};\nexport const tutorialCatalog = ${JSON.stringify(tutorialCatalog)};\n`;
}

export default function catalog() {
  let root = process.cwd();
  let cached = null;
  return {
    name: 'studypiece-catalog',
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      return id === ID ? RESOLVED : null;
    },
    load(id) {
      if (id !== RESOLVED) return null;
      cached ??= buildCatalog(root);
      return cached;
    },
    // In dev, a changed course or lesson file rebuilds the catalogue and reloads the page.
    configureServer(server) {
      const dataDir = path.join(root, 'src/data');
      const refresh = (file) => {
        if (!path.resolve(file).startsWith(dataDir)) return;
        cached = null;
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('change', refresh);
      server.watcher.on('add', refresh);
      server.watcher.on('unlink', refresh);
    },
  };
}
