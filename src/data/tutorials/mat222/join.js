// Builds one lesson out of several parts. Every part's closing "finish" screen is dropped
// except the last, so the learner sees a single finish at the very end.
export function joinLesson(meta, ...parts) {
  const sections = parts.flatMap((p) => p.sections ?? p);
  const lastWithFinish = sections.findLastIndex((s) => s.screens.some((sc) => sc.type === 'finish'));
  return {
    ...meta,
    sections: sections.map((s, i) => ({
      ...s,
      screens: i === lastWithFinish ? s.screens : s.screens.filter((sc) => sc.type !== 'finish'),
    })),
  };
}
