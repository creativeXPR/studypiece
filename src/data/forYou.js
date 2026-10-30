import { addDays, dayKey, parseDay } from '../lib/dates';

// Who sees what under "For you", beyond a student's own department and level.
//   Automatic: a course stays on everyone's list for 30 days after its `updated` date.
//   Admin: a date set on the admin page replaces that. The course shows for everyone
//   through that day, then comes off, even if it would still count as new.
// `entries` maps a course code to its last day: { 'COS 202': '2026-11-30' }.
const NEW_FOR_DAYS = 30;

function autoEnd(course) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(course.updated ?? '')) return null;
  return dayKey(addDays(parseDay(course.updated), NEW_FOR_DAYS - 1));
}

export function isNewCourse(course, today = dayKey()) {
  const end = autoEnd(course);
  return !!end && today <= end;
}

/** The last day a course shows for everyone, or null if it never does. */
export function forYouEnd(course, entries) {
  return entries?.[course.code] ?? autoEnd(course);
}

export function onForYou(course, entries, today = dayKey()) {
  const end = forYouEnd(course, entries);
  return !!end && today <= end;
}
