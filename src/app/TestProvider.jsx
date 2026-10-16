import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getCourse } from '../data/courses';
import { readJSON, writeJSON } from '../lib/storage';
import { useAuth } from './AuthProvider';

const TestContext = createContext(null);

const sessionKey = (uid) => `studypiece.session.${uid}`;

function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Reordering options would break options that point at other options ("Both II
// and III", "All of the above") or explanations that name options by label.
const POSITIONAL_OPTION = /\b(both|all|none|neither)\b.*\b(above|below|I|II|III|IV)\b|\b(I|II|III|IV)\s+(and|&|or)\s+(I|II|III|IV)\b/i;
const LABEL_IN_EXPLANATION = /\boptions?\s+\(?(I|II|III|IV)\b|\((I|II|III|IV)\)|\b(I|II|III|IV)\s*&\s*(I|II|III|IV)\b/;

function canShuffleOptions(q) {
  return !q.options.some((o) => POSITIONAL_OPTION.test(o)) && !LABEL_IN_EXPLANATION.test(q.explanation ?? '');
}

function shuffleOptions(q) {
  if (!canShuffleOptions(q)) return q;
  const order = shuffled(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
}

// A section is one tab in the test: a whole question set, or a random mix drawn
// from every set of a course. Questions are copied in so a reload (or a later
// edit to the question bank) can't change a test that's already underway.
function buildSection(item, { shuffle, shuffleOptions: mixOptions }) {
  const course = getCourse(item.course);
  const prepare = (list) => (mixOptions ? list.map(shuffleOptions) : list);
  if (item.kind === 'mix') {
    const pool = course.sets.flatMap((set) =>
      set.questions.map((q, i) => ({ ...q, ref: `${set.title} · Q${i + 1}` })),
    );
    return {
      key: `${course.code}|mix`,
      label: `${course.code} · Mixed`,
      questions: prepare(shuffled(pool).slice(0, item.count)),
    };
  }
  const set = course.sets.find((s) => s.id === item.setId);
  const questions = set.questions.map((q, i) => ({ ...q, ref: `${set.title} · Q${i + 1}` }));
  return {
    key: `${course.code}|${set.id}`,
    label: `${course.code} · ${set.title}`,
    questions: prepare(shuffle ? shuffled(questions) : questions),
  };
}

function createSession(config) {
  const sections = config.items.map((item) => buildSection(item, config));
  const startedAt = Date.now();
  return {
    config,
    sections,
    answers: Object.fromEntries(sections.map((s) => [s.key, s.questions.map(() => null)])),
    flags: Object.fromEntries(sections.map((s) => [s.key, s.questions.map(() => false)])),
    cursor: { section: 0, index: 0 },
    startedAt,
    endsAt: startedAt + config.durationMin * 60_000,
    submittedAt: null,
  };
}

export function TestProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid;
  const [session, setSession] = useState(() => (uid ? readJSON(sessionKey(uid)) : null));
  const [loadedFor, setLoadedFor] = useState(uid);

  // Switching accounts: load that user's session instead of keeping the last one.
  if (loadedFor !== uid) {
    setLoadedFor(uid);
    setSession(uid ? readJSON(sessionKey(uid)) : null);
  }

  useEffect(() => {
    if (uid) writeJSON(sessionKey(uid), session);
  }, [uid, session]);

  const update = useCallback((fn) => setSession((s) => (s ? fn(s) : s)), []);

  const value = {
    session,
    startTest: useCallback((config) => setSession(createSession(config)), []),
    clearTest: useCallback(() => setSession(null), []),
    setCursor: useCallback((cursor) => update((s) => ({ ...s, cursor: { ...s.cursor, ...cursor } })), [update]),
    answer: useCallback(
      (sectionKey, index, option) =>
        update((s) => {
          if (s.submittedAt) return s;
          const list = [...s.answers[sectionKey]];
          list[index] = option; // null clears the answer
          return { ...s, answers: { ...s.answers, [sectionKey]: list } };
        }),
      [update],
    ),
    toggleFlag: useCallback(
      (sectionKey, index) =>
        update((s) => {
          const list = [...s.flags[sectionKey]];
          list[index] = !list[index];
          return { ...s, flags: { ...s.flags, [sectionKey]: list } };
        }),
      [update],
    ),
    submit: useCallback(
      () =>
        update((s) =>
          s.submittedAt
            ? s
            : { ...s, submittedAt: Math.min(Date.now(), s.endsAt), cursor: { section: 0, index: 0 } },
        ),
      [update],
    ),
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTest() {
  return useContext(TestContext);
}
