import { addDays, dayKey, parseDay, toDate } from '../../lib/dates';

// Firestore user doc -> the fields the admin page needs.
export function normalizeUser(id, data) {
  const lastActive = toDate(data.lastActive) ?? toDate(data.lastLoginAt) ?? toDate(data.signInAt);
  return {
    id,
    name: data.username || data.useremail || 'Unnamed',
    email: data.useremail || '',
    department: data.department || '',
    level: data.level ? String(data.level) : '',
    loginDays: Array.isArray(data.loginDays) ? data.loginDays : [],
    lastActive,
    lastActiveDay: lastActive ? dayKey(lastActive) : null,
    createdAt: toDate(data.createdAt),
    courseUse: cleanUse(data.courseUse),
    ratings: cleanRatings(data.ratings),
  };
}

// users/{uid}.courseUse is { code: { 'YYYY-MM-DD': visits } } (see lib/usage.js). Students write
// their own record, so anything malformed is dropped rather than trusted.
function cleanUse(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [code, days] of Object.entries(raw)) {
    if (!days || typeof days !== 'object') continue;
    const clean = {};
    for (const [day, n] of Object.entries(days)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(day) && Number.isFinite(n) && n > 0) clean[day] = Math.min(n, 500);
    }
    if (Object.keys(clean).length) out[code] = clean;
  }
  return out;
}

function cleanRatings(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const [code, stars] of Object.entries(raw)) if (Number.isInteger(stars) && stars >= 1 && stars <= 5) out[code] = stars;
  return out;
}

// Per course, for the chosen days: how many students opened it, how many visits that was,
// visits per day, and its star rating (all ratings, not just this period's).
export function courseStats(users, fromKey, toKey, catalogue) {
  const days = Math.max(1, daysBetween(fromKey, toKey).length);
  const rows = new Map(catalogue.map((c) => [c.code, { ...c, students: 0, visits: 0, everStudents: 0, stars: 0, raters: 0 }]));
  const row = (code) => {
    if (!rows.has(code)) rows.set(code, { code, title: '', students: 0, visits: 0, everStudents: 0, stars: 0, raters: 0 });
    return rows.get(code);
  };
  for (const user of users) {
    for (const [code, perDay] of Object.entries(user.courseUse)) {
      const r = row(code);
      r.everStudents++;
      let visits = 0;
      for (const [day, n] of Object.entries(perDay)) if (day >= fromKey && day <= toKey) visits += n;
      if (visits) {
        r.students++;
        r.visits += visits;
      }
    }
    for (const [code, stars] of Object.entries(user.ratings)) {
      const r = row(code);
      r.stars += stars;
      r.raters++;
    }
  }
  return [...rows.values()]
    .map((r) => ({ ...r, perDay: r.visits / days, rating: r.raters ? r.stars / r.raters : null }))
    .sort((a, b) => b.visits - a.visits || b.everStudents - a.everStudents || a.code.localeCompare(b.code));
}

export function daysBetween(fromKey, toKey) {
  const days = [];
  for (let d = parseDay(fromKey); dayKey(d) <= toKey; d = addDays(d, 1)) days.push(dayKey(d));
  return days;
}

// Days a user is known to have opened the app: recorded login days, plus their
// last-active day (the only signal for accounts from before login tracking).
function activeDays(user) {
  return user.lastActiveDay && !user.loginDays.includes(user.lastActiveDay)
    ? [...user.loginDays, user.lastActiveDay]
    : user.loginDays;
}

const SHORT = { month: 'short', day: 'numeric' };

export function summarize(users, fromKey, toKey) {
  const days = daysBetween(fromKey, toKey);
  const inRange = (key) => key >= fromKey && key <= toKey;

  const perDay = new Map(days.map((d) => [d, 0]));
  const active = [];
  for (const user of users) {
    const seen = activeDays(user).filter(inRange);
    if (seen.length) active.push(user);
    for (const d of new Set(seen)) perDay.set(d, perDay.get(d) + 1);
  }

  // Daily bars up to two months; weekly beyond that so bars stay readable.
  const weekly = days.length > 62;
  const buckets = [];
  for (let i = 0; i < days.length; i += weekly ? 7 : 1) {
    const span = days.slice(i, i + (weekly ? 7 : 1));
    const first = parseDay(span[0]);
    const last = parseDay(span[span.length - 1]);
    const ids = new Set();
    // Weekly buckets count each user once per week.
    if (weekly) {
      for (const user of active) if (activeDays(user).some((d) => span.includes(d))) ids.add(user.id);
    }
    buckets.push({
      key: span[0],
      label:
        span.length === 1
          ? first.toLocaleDateString(undefined, { weekday: 'short', ...SHORT })
          : `${first.toLocaleDateString(undefined, SHORT)} – ${last.toLocaleDateString(undefined, SHORT)}`,
      short: first.toLocaleDateString(undefined, SHORT),
      count: weekly ? ids.size : perDay.get(span[0]),
    });
  }

  const trackedDays = users.flatMap((u) => u.loginDays);
  const newUsers = users.filter((u) => u.createdAt && inRange(dayKey(u.createdAt)));

  return {
    active: active.sort((a, b) => (b.lastActive?.getTime() ?? 0) - (a.lastActive?.getTime() ?? 0)),
    newUsers: newUsers.length,
    total: users.length,
    dailyAverage: days.length ? [...perDay.values()].reduce((a, b) => a + b, 0) / days.length : 0,
    buckets,
    weekly,
    trackedSince: trackedDays.length ? trackedDays.reduce((a, b) => (a < b ? a : b)) : null,
  };
}
