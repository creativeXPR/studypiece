// Loads every course file (.js or .json) from src/data/courses for Node scripts.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Same order as the app: "ges201.js" before "ges201-extra.json".
const stem = (file) => file.replace(/\.(js|json)$/, '');

export const COURSES_DIR = path.resolve(import.meta.dirname, '../src/data/courses');

export async function loadCourses(dir = COURSES_DIR) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => (f.endsWith('.js') || f.endsWith('.json')) && f !== 'index.js')
    .sort((a, b) => stem(a).localeCompare(stem(b)));
  return Promise.all(
    files.map(async (file) => {
      const full = path.join(dir, file);
      try {
        const course = file.endsWith('.json')
          ? JSON.parse(fs.readFileSync(full, 'utf8'))
          : (await import(pathToFileURL(full).href)).default;
        return { file, course };
      } catch (err) {
        throw new Error(`${file}: ${err.message}`, { cause: err });
      }
    }),
  );
}
