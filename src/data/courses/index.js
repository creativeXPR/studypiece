// Every other .js or .json file in this folder is a course and is registered automatically.
// Format: { code, title, updated: 'YYYY-MM-DD', sets: [{ id, title?, questions }] }. See docs/adding-questions.md.
//
// The app starts with the catalogue only: every course and set without its questions, so
// `courses`, `getCourse` and `getSet` are instant and a set has `count` instead of questions.
// `loadCourse(code)` downloads one course's questions (its own small file) when a test needs them.
import { courseCatalog } from 'virtual:studypiece-catalog';
import { mergeCourses } from '../mergeCourses';
import { shapeCourse } from '../courseShape';

const files = import.meta.glob(['./*.js', './*.json', '!./index.js', '!./all.js'], { import: 'default' });

export const courses = courseCatalog;

export function getCourse(code) {
  return courses.find((c) => c.code === code);
}

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug?.toLowerCase());
}

export function getSet(course, slug) {
  return course?.sets.find((s) => s.slug === slug?.toLowerCase());
}

export const coursePath = (course) => `/course/${course.slug}`;
export const setPath = (course, set) => `/course/${course.slug}/${set.slug}`;

// Downloaded courses with their questions, by code. A failed download isn't kept, so it can be retried.
const loaded = new Map();
const pending = new Map();

// The full course if it has been downloaded already, otherwise undefined.
export const getLoadedCourse = (code) => loaded.get(code);

export function loadCourse(code) {
  if (loaded.has(code)) return Promise.resolve(loaded.get(code));
  if (!pending.has(code)) {
    const entry = getCourse(code);
    if (!entry) return Promise.reject(new Error(`No course ${code}`));
    const job = Promise.all(entry.files.map((file) => files[file]()))
      .then((parts) => {
        const course = shapeCourse(mergeCourses(parts)[0]);
        loaded.set(code, course);
        return course;
      })
      .finally(() => pending.delete(code));
    pending.set(code, job);
  }
  return pending.get(code);
}
