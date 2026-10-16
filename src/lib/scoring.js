export const OPTION_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

export function scoreSection(section, answers = []) {
  let correct = 0;
  let skipped = 0;
  section.questions.forEach((q, i) => {
    const picked = answers[i];
    if (picked === null || picked === undefined) skipped++;
    else if (picked === q.answer) correct++;
  });
  const total = section.questions.length;
  return {
    correct,
    skipped,
    wrong: total - correct - skipped,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0,
  };
}

export function scoreSession(session) {
  const sections = session.sections.map((s) => ({
    section: s,
    ...scoreSection(s, session.answers[s.key]),
  }));
  const correct = sections.reduce((n, s) => n + s.correct, 0);
  const total = sections.reduce((n, s) => n + s.total, 0);
  return {
    sections,
    correct,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0,
  };
}

// 'correct' | 'wrong' | 'skipped'
export function questionStatus(question, picked) {
  if (picked === null || picked === undefined) return 'skipped';
  return picked === question.answer ? 'correct' : 'wrong';
}

export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
}
