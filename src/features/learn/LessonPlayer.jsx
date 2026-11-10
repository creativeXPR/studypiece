import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookIcon, BulbIcon, CheckIcon, ChevronLeft, XIcon } from '../../lib/icons';
import { buzz } from './fx';
import { clearRun, getProgress, getRun, saveProgress, saveRun } from './progress';
import { Inline, Rich, Terms } from './Rich';
import { JAVA_SCREENS } from './java/lazyScreens';
import { SCREENS } from './screens';

// Widgets that check an answer stay required (they offer "Show me" instead). Scenes never block.
const REQUIRED_WIDGETS = new Set(['calc', 'code', 'mockClock', 'scene', 'plane']);

// The questions reached so far (up to and including the current screen), each with its answer and
// the student's first try, for the Questions tab of the notes drawer.
function askedSoFar(screens, upto, results) {
  const out = [];
  screens.slice(0, upto + 1).forEach((s, i) => {
    const prompt = s.prompt || s.title || '';
    let answer = [];
    if (s.type === 'choice' && !s.poll) {
      const o = s.options.find((x) => x.correct);
      if (o) answer = [`**${o.text}**${o.why ? `. ${o.why}` : ''}`];
    } else if (s.type === 'multi') answer = s.options.filter((x) => x.correct).map((x) => `**${x.text}**`);
    else if (s.type === 'order') answer = s.items.map((t, k) => `${k + 1}. ${t}`);
    else if (s.type === 'sort') answer = s.items.map((t) => `${t.text} → **${s.buckets.find((b) => b.id === t.bucket)?.label}**`);
    else if (s.type === 'custom' && s.widget === 'calc') answer = s.graph.steps.map((st) => `${st.ask} **${st.options ? st.options[st.answer] : st.answer}**`);
    if (answer.length) out.push({ i, prompt, answer, ok: results[i] });
  });
  return out;
}

// Hands-on pictures and flip cards can be skipped; on a replay of a finished lesson, anything can.
function canSkip(s, replay) {
  if (s.type === 'finish') return false;
  return replay || s.type === 'reveal' || (s.type === 'custom' && !REQUIRED_WIDGETS.has(s.widget));
}

/**
 * Runs one lesson: a list of sections, each a run of screens.
 * Full-screen (no tab bar) so the learner stays in the flow; the X goes back to the tutorial.
 */
export default function LessonPlayer({ lesson, courseSlug, homeHref, nextLesson, uid }) {
  const navigate = useNavigate();
  const { screens, offsets } = useMemo(() => {
    const list = [];
    const offs = [];
    lesson.sections.forEach((sec, si) => {
      offs.push(list.length);
      sec.screens.forEach((s) => list.push({ ...s, sec: si }));
    });
    return { screens: list, offsets: offs };
  }, [lesson]);
  const total = screens.length;

  // Resume where this user left off (like a running test). A save from an older
  // version of the lesson with fewer screens is still usable; past the end is not.
  const [saved] = useState(() => {
    const run = getRun(uid, courseSlug, lesson.id);
    return run && run.idx > 0 && run.idx < total ? run : null;
  });

  const [idx, setIdx] = useState(saved?.idx ?? 0);
  const [dir, setDir] = useState(1);
  const [run, setRun] = useState(0);
  const [action, setActionState] = useState({ label: 'Continue', enabled: false, secondary: null, finished: false });
  // A finished lesson opens for review: its first-try answers and score are kept, every screen
  // can be skipped, and nothing is saved as "in progress". Only "Redo lesson" starts it afresh.
  const [record] = useState(() => getProgress(courseSlug, lesson.id));
  const [replay, setReplay] = useState(() => !!record?.done);
  const [review, setReview] = useState(() => !!record?.done && !saved);
  const reviewing = useRef(review);
  const [sheet, setSheet] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notesTab, setNotesTab] = useState('terms');
  const [asked, setAsked] = useState([]);
  const actionFn = useRef(null);
  const secondaryFn = useRef(null);
  const results = useRef(saved?.results ?? (review ? { ...record.results } : {}));
  const mem = useRef(saved?.mem ?? (review ? { ...record.mem } : {}));
  const stageRef = useRef(null);

  // Saves the current spot. The finish screen clears the run instead (it calls
  // complete(), which runs before this component's effects), and an untouched
  // first screen isn't worth keeping.
  const idxRef = useRef(idx);
  const persist = useCallback(() => {
    const at = idxRef.current;
    if (reviewing.current || screens[at]?.type === 'finish') return;
    if (at === 0 && !Object.keys(results.current).length) {
      clearRun(uid, courseSlug, lesson.id);
      return;
    }
    saveRun(uid, courseSlug, lesson.id, { idx: at, total, results: results.current, mem: mem.current });
  }, [uid, courseSlug, lesson.id, screens, total]);

  useEffect(() => {
    idxRef.current = idx;
    persist();
  }, [idx, persist]);

  const api = useMemo(() => {
    const a = {
      sections: lesson.sections,
      nextLesson,
      get mem() {
        return mem.current;
      },
      remember(key, value) {
        mem.current[key] = value;
        persist();
      },
      setAction(label, enabled, fn, secondary) {
        if (fn) actionFn.current = fn;
        secondaryFn.current = secondary?.fn ?? null;
        const sec = secondary?.label ?? null;
        // Finished = the big button simply moves on, so there is nothing left to skip.
        const finished = enabled && actionFn.current === a.next;
        setActionState((s) =>
          s.label === label && s.enabled === enabled && s.secondary === sec && s.finished === finished ? s : { label, enabled, secondary: sec, finished },
        );
      },
      done(label) {
        a.setAction(label || 'Continue', true, a.next);
      },
      next() {
        setSheet(null);
        setDir(1);
        setIdx((i) => Math.min(i + 1, total - 1));
      },
      record(i, ok) {
        if (!(i in results.current)) results.current[i] = ok;
        persist();
      },
      feedback(opts) {
        setSheet(opts);
        buzz(opts.tone === 'good' ? 15 : opts.tone === 'bad' ? [30, 50, 30] : 0);
      },
      score() {
        const v = Object.values(results.current);
        return { right: v.filter(Boolean).length, graded: v.length };
      },
      complete() {
        const { right, graded } = a.score();
        saveProgress(courseSlug, lesson.id, right, graded, { results: results.current, mem: mem.current });
        clearRun(uid, courseSlug, lesson.id);
      },
      exit() {
        navigate(homeHref);
      },
      goNextLesson() {
        if (nextLesson) navigate(nextLesson.href);
      },
      restart() {
        reviewing.current = false;
        setReview(false);
        setReplay(false);
        clearRun(uid, courseSlug, lesson.id);
        results.current = {};
        mem.current = {};
        setSheet(null);
        setDir(1);
        setIdx(0);
        setRun((r) => r + 1);
      },
    };
    return a;
  }, [lesson, nextLesson, courseSlug, homeHref, navigate, total, persist, uid]);

  // A lesson with code exercises wakes the Java runner early, while the learner reads.
  const hasCode = useMemo(() => screens.some((x) => x.type === 'code'), [screens]);
  useEffect(() => {
    if (hasCode) import('./java/runner').then((m) => m.wakeRunner());
  }, [hasCode]);

  const back = () => {
    if (idx === 0) return;
    setSheet(null);
    setDir(-1);
    setIdx(idx - 1);
  };

  const continueSheet = () => {
    const then = sheet?.then;
    setSheet(null);
    then?.();
  };

  // New screen: back to the top, focus its heading for screen readers.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (idx > 0) stageRef.current?.querySelector('.tut-title')?.focus({ preventScroll: true });
  }, [idx, run]);

  // Enter = the big button, from anywhere that isn't itself a control.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && notesOpen) setNotesOpen(false);
      if (e.key !== 'Enter' || notesOpen || e.target.closest?.('button, a, input, textarea, [contenteditable]')) return;
      if (sheet) continueSheet();
      else if (action.enabled) actionFn.current?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const s = screens[idx];
  const Screen = SCREENS[s.type] ?? JAVA_SCREENS[s.type];
  const cur = s.sec;
  const unlocked = lesson.sections.slice(0, cur + 1).filter((x) => x.terms?.length);
  const noteCount = unlocked.reduce((n, x) => n + x.terms.length, 0);
  const openNotes = () => {
    setAsked(askedSoFar(screens, idx, results.current));
    setNotesOpen(true);
  };

  return (
    <div className="tut">
      <header className="tut-top">
        <div className="tut-top-in">
          <Link to={homeHref} className="tut-iconbtn" aria-label="Exit lesson">
            <XIcon size={20} />
          </Link>
          <button type="button" className="tut-iconbtn" onClick={back} disabled={idx === 0} aria-label="Previous screen">
            <ChevronLeft size={20} />
          </button>
          <div className="tut-track">
            <div className="tut-sec-row">
              <span className="tut-sec-name" key={cur}>{lesson.sections[cur].name}</span>
              <span className="tut-count">
                {idx + 1}/{total}
              </span>
            </div>
            <div className="tut-progress" role="progressbar" aria-label="Lesson progress" aria-valuemin={1} aria-valuemax={total} aria-valuenow={idx + 1}>
              {lesson.sections.map((sec, si) => (
                <div key={si} className={`tut-group${si === cur ? ' active' : ''}`} style={{ flex: sec.screens.length }}>
                  {sec.screens.map((_, k) => {
                    const g = offsets[si] + k;
                    return <span key={k} className={`tut-seg${g < idx ? ' done' : g === idx ? ' now' : ''}`}><i /></span>;
                  })}
                </div>
              ))}
            </div>
          </div>
          <button type="button" className="tut-iconbtn tut-notes-btn" onClick={openNotes} aria-label="Open your notes">
            <BookIcon size={20} />
            {noteCount > 0 && <span className="tut-notes-count" key={noteCount}>{noteCount}</span>}
          </button>
        </div>
      </header>

      {review && (
        <div className="tut-review" role="note">
          <span>
            Reviewing: your answers{record.of ? ` and score (${record.best}/${record.of})` : ''} are kept.
          </span>
          <button type="button" onClick={api.restart}>
            Redo lesson
          </button>
        </div>
      )}

      <main className="tut-stage" ref={stageRef}>
        <section className={`tut-screen ${dir < 0 ? 'from-left' : 'from-right'}`} key={`${run}-${idx}`}>
          <Suspense fallback={<p className="tut-hint">Loading…</p>}>
            <Screen s={s} index={idx} api={api} />
          </Suspense>
        </section>
      </main>

      {sheet ? (
        <div className={`tut-sheet ${sheet.tone || 'neutral'}`} role="status" aria-live="polite">
          <div className="tut-bar-in">
            <div className="tut-sheet-head">
              <span className="tut-sheet-icon">
                {sheet.tone === 'good' ? <CheckIcon size={20} strokeWidth={3} /> : sheet.tone === 'bad' ? <XIcon size={20} strokeWidth={3} /> : <BulbIcon size={20} />}
              </span>
              <h3>{sheet.title}</h3>
            </div>
            {sheet.body && <div className="tut-sheet-body">{sheet.body}</div>}
            <button type="button" className="tut-btn" onClick={continueSheet} autoFocus>
              {sheet.label || 'Continue'}
            </button>
          </div>
        </div>
      ) : (
        <footer className="tut-bar">
          <div className="tut-bar-in">
            <button
              key={action.enabled ? `on-${run}-${idx}` : 'off'}
              type="button"
              className={`tut-btn${action.enabled ? ' ready' : ''}`}
              disabled={!action.enabled}
              onClick={() => actionFn.current?.()}
            >
              {action.label}
            </button>
            {action.secondary ? (
              <button type="button" className="tut-btn ghost" onClick={() => secondaryFn.current?.()}>
                {action.secondary}
              </button>
            ) : (
              !action.finished &&
              canSkip(s, replay) && (
                <button type="button" className="tut-btn ghost" onClick={api.next}>
                  Skip
                </button>
              )
            )}
          </div>
        </footer>
      )}

      {notesOpen && (
        <>
          <div className="tut-scrim" onClick={() => setNotesOpen(false)} />
          <aside className="tut-drawer" aria-label="Your notes so far">
            <div className="tut-drawer-head">
              <h3>Your notes so far</h3>
              <button type="button" className="tut-iconbtn" onClick={() => setNotesOpen(false)} aria-label="Close notes" autoFocus>
                <XIcon size={20} />
              </button>
            </div>
            <div className="tut-drawer-tabs" role="tablist" aria-label="Notes">
              <button type="button" role="tab" aria-selected={notesTab === 'terms'} className={notesTab === 'terms' ? 'on' : ''} onClick={() => setNotesTab('terms')}>
                Terms
              </button>
              <button type="button" role="tab" aria-selected={notesTab === 'questions'} className={notesTab === 'questions' ? 'on' : ''} onClick={() => setNotesTab('questions')}>
                Questions{asked.length ? ` (${asked.length})` : ''}
              </button>
            </div>
            <div className="tut-drawer-body">
              {notesTab === 'questions' ? (
                asked.length ? (
                  <ol className="tut-asked">
                    {asked.map((q) => (
                      <li key={q.i} className={q.ok === true ? 'right' : q.ok === false ? 'wrong' : ''}>
                        <p className="tut-asked-q">
                          {q.ok === true ? '✓ ' : q.ok === false ? '✗ ' : ''}
                          <Inline text={q.prompt} />
                        </p>
                        {q.answer.map((a) => (
                          <p key={a} className="tut-asked-a">
                            <Inline text={a} />
                          </p>
                        ))}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <Rich text="Questions appear here once you reach them." className="tut-hint" />
                )
              ) : unlocked.length ? (
                unlocked.map((x) => (
                  <section key={x.name}>
                    <h4>{x.name}</h4>
                    <Terms terms={x.terms} />
                  </section>
                ))
              ) : (
                <Rich text="Definitions appear here as you learn them." className="tut-hint" />
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
