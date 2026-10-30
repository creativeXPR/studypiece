// Every other .js or .json file in this folder is a course and is registered automatically.
// Format: { code, title, updated: 'YYYY-MM-DD', sets: [{ id, title?, questions }] }. See docs/adding-questions.md.
import { mergeCourses } from '../mergeCourses';
import { courseSlug, setSlug } from '../slugs';

const modules = import.meta.glob(['./*.js', './*.json', '!./index.js'], { eager: true, import: 'default' });

function levelOf(code) {
  const digit = code.match(/\d/)?.[0];
  return digit ? Number(digit) * 100 : null;
}

// Sort by name without extension so "ges201.js" comes before "ges201-extra.json".
const stem = (file) => file.replace(/\.(js|json)$/, '');
const files = Object.keys(modules)
  .sort((a, b) => stem(a).localeCompare(stem(b)))
  .map((file) => modules[file]);

export const courses = mergeCourses(files)
  .map((course) => ({
    ...course,
    slug: courseSlug(course.code),
    prefix: course.code.split(' ')[0],
    level: course.level ?? levelOf(course.code),
    questionCount: course.sets.reduce((n, s) => n + s.questions.length, 0),
    sets: course.sets.map((set, i) => ({ ...set, slug: setSlug(set.id), title: set.title || `Set ${i + 1}` })),
  }))
  // Newest first: most recently updated courses on top, then by code.
  .sort((a, b) => (b.updated ?? '').localeCompare(a.updated ?? '') || a.code.localeCompare(b.code));

// A course added or updated this recently shows under "For you" for every student, with a "New" tag.
const NEW_FOR_DAYS = 30;

export function isNewCourse(course, now = Date.now()) {
  const updated = Date.parse(course.updated ?? '');
  return Number.isFinite(updated) && now - updated < NEW_FOR_DAYS * 86400000;
}

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
