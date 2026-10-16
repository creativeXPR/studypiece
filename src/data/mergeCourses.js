// Several files may share a course code (e.g. ges201.js + ges201-extra.json);
// their sets are combined into one course, in file-name order.
// Shared by the app and the Node build/check scripts.
export function mergeCourses(list) {
  const byCode = new Map();
  for (const course of list) {
    const existing = byCode.get(course.code);
    if (existing) {
      existing.sets = [...existing.sets, ...course.sets];
      existing.title ||= course.title;
    } else {
      byCode.set(course.code, { ...course, sets: [...course.sets] });
    }
  }
  return [...byCode.values()];
}
