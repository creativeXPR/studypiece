import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../app/TestProvider';
import { coursePath, getCourse } from '../../data/courses';
import AppHeader from '../../lib/AppHeader';
import MathText from '../../lib/MathText';
import QuestionPalette from '../../lib/QuestionPalette';
import SectionTabs from '../../lib/SectionTabs';
import { OPTION_LABELS, questionStatus, scoreSection } from '../../lib/scoring';
import { BulbIcon, CheckIcon, ChevronLeft, ChevronRight, PlayIcon, StopIcon, XIcon } from '../../lib/icons';
import { speechSupported } from '../../lib/speech';
import { readJSON, writeJSON } from '../../lib/storage';
import SelectionReader from './SelectionReader';
import useFreeFlow from './useFreeFlow';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'wrong', label: 'Wrong' },
  { id: 'skipped', label: 'Skipped' },
  { id: 'correct', label: 'Correct' },
  { id: 'flagged', label: 'Flagged' },
];

const STATUS_TEXT = { correct: 'Correct', wrong: 'Wrong', skipped: 'Not answered' };
const SPOKEN_LABELS = ['one', 'two', 'three', 'four', 'five', 'six'];
const RATES = [0.75, 1, 1.25, 1.5];
const RATE_KEY = 'studypiece.speechRate';

export default function ReviewPage() {
  const { session } = useTest();
  const navigate = useNavigate();
  const [sectionIndex, setSectionIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(0);
  const [rate, setRate] = useState(() => readJSON(RATE_KEY, 1));
  const contentRef = useRef(null);

  const course = getCourse(session.config.items[0].course);
  const section = session.sections[sectionIndex];
  const answers = session.answers[section.key];
  const flags = session.flags[section.key];
  const statuses = useMemo(
    () => section.questions.map((q, i) => questionStatus(q, answers[i])),
    [section, answers],
  );
  const score = scoreSection(section, answers);

  // Question indexes in section `s` that pass the current filter.
  const matchesIn = (s) => {
    const sec = session.sections[s];
    const secAnswers = session.answers[sec.key];
    const secFlags = session.flags[sec.key];
    return sec.questions
      .map((_, i) => i)
      .filter(
        (i) =>
          filter === 'all' ||
          (filter === 'flagged' ? secFlags[i] : questionStatus(sec.questions[i], secAnswers[i]) === filter),
      );
  };
  const visible = matchesIn(sectionIndex);
  const matches = (i) => visible.includes(i);
  // Changing the filter can hide the selected question; fall back to the first match.
  const index = visible.includes(selected) ? selected : (visible[0] ?? 0);
  const position = visible.indexOf(index);

  const step = (delta) => {
    const next = visible[position + delta];
    if (next !== undefined) setSelected(next);
  };

  useEffect(() => {
    function onKey(e) {
      if (e.target.matches('input, textarea, select')) return;
      if (e.key === 'ArrowRight' || e.key === 'n') step(1);
      else if (e.key === 'ArrowLeft' || e.key === 'p') step(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const question = section.questions[index];
  const picked = answers[index];
  const status = statuses[index];

  // Free flow: question → answer → explanation, then the next matching question,
  // continuing into later sections until the last one.
  const flow = useFreeFlow({
    itemKey: `${sectionIndex}:${index}`,
    rate,
    parts: question
      ? [
          { phase: 'question', text: `Question ${index + 1}. ${question.question}` },
          {
            phase: 'answer',
            text:
              `The answer is option ${SPOKEN_LABELS[question.answer]}: ${question.options[question.answer]}.` +
              (picked !== null && picked !== undefined && picked !== question.answer
                ? ` You chose option ${SPOKEN_LABELS[picked]}.`
                : ''),
          },
          { phase: 'explanation', text: question.explanation ? `Explanation. ${question.explanation}` : '' },
        ]
      : [],
    advance: () => {
      const next = visible[position + 1];
      if (next !== undefined) {
        setSelected(next);
        return true;
      }
      for (let s = sectionIndex + 1; s < session.sections.length; s++) {
        const first = matchesIn(s)[0];
        if (first !== undefined) {
          setSectionIndex(s);
          setSelected(first);
          return true;
        }
      }
      return false;
    },
  });

  // Keep whatever is being read on screen.
  useEffect(() => {
    if (flow.phase) contentRef.current?.querySelector('.reading')?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [flow.phase, index]);

  const reading = (phase) => (flow.phase === phase ? ' reading' : '');

  function changeRate(value) {
    setRate(value);
    writeJSON(RATE_KEY, value);
  }

  function countFor(id) {
    if (id === 'all') return section.questions.length;
    if (id === 'flagged') return flags.filter(Boolean).length;
    return score[id];
  }

  return (
    <>
      <AppHeader>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/results')}>
          <ChevronLeft size={16} /> Results
        </button>
      </AppHeader>

      <main className="page test-page">
        <SectionTabs
          sections={session.sections}
          current={sectionIndex}
          onSelect={(i) => {
            setSectionIndex(i);
            setSelected(0);
          }}
          meta={(s) => `${scoreSection(s, session.answers[s.key]).percent}%`}
        />

        {speechSupported && (
          <div className="listen-bar">
            {flow.playing ? (
              <button className="btn btn-primary btn-sm" onClick={flow.stop}>
                <StopIcon size={16} /> Stop reading
              </button>
            ) : (
              <button className="btn btn-outline btn-sm" onClick={flow.start} disabled={visible.length === 0}>
                <PlayIcon size={16} /> Free flow
              </button>
            )}
            <div className="rate-select">
              <span className="muted small">Speed</span>
              <div className="speed-pills" role="radiogroup" aria-label="Reading speed">
                {RATES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={rate === r}
                    className={rate === r ? 'active' : ''}
                    onClick={() => changeRate(r)}
                  >
                    {r}×
                  </button>
                ))}
              </div>
            </div>
            <span className="muted small listen-hint">
              {flow.playing ? 'Reading question, answer, then explanation…' : 'Tip: select any text to hear it read aloud.'}
            </span>
          </div>
        )}

        <div className="filters" role="tablist" aria-label="Filter questions">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              className={`filter-chip ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span className="filter-count">{countFor(f.id)}</span>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="card empty">
            <p>No {FILTERS.find((f) => f.id === filter).label.toLowerCase()} questions in this section.</p>
          </div>
        ) : (
          <div className="test-layout">
            <article className="card question-card" ref={contentRef}>
              <div className="question-meta">
                <span>
                  Question {index + 1} of {section.questions.length}
                  <span className="muted small"> · {question.ref}</span>
                </span>
                <span className={`status-pill ${status}`}>{STATUS_TEXT[status]}</span>
              </div>

              <MathText as="p" className={`question-text${reading('question')}`} text={question.question} />

              <div className="options">
                {question.options.map((option, i) => {
                  const isAnswer = i === question.answer;
                  const isPicked = i === picked;
                  const tone = isAnswer ? 'correct' : isPicked ? 'wrong' : '';
                  return (
                    <div key={i} className={`option review ${tone}${isAnswer ? reading('answer') : ''}`}>
                      <span className="option-label">{OPTION_LABELS[i]}</span>
                      <MathText className="option-text" text={option} />
                      {isAnswer && (
                        <span className="option-tag">
                          <CheckIcon size={14} /> {isPicked ? 'Your answer' : 'Correct answer'}
                        </span>
                      )}
                      {isPicked && !isAnswer && (
                        <span className="option-tag">
                          <XIcon size={14} /> Your answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {question.explanation && (
                <div className={`explanation${reading('explanation')}`}>
                  <p className="explanation-title">
                    <BulbIcon size={16} /> Explanation
                  </p>
                  <MathText as="p" text={question.explanation} />
                </div>
              )}

              <div className="question-actions">
                <button className="btn btn-outline" onClick={() => step(-1)} disabled={position <= 0}>
                  <ChevronLeft /> Previous
                </button>
                <span className="muted small">
                  {position + 1} / {visible.length}
                </span>
                <button className="btn btn-primary" onClick={() => step(1)} disabled={position >= visible.length - 1}>
                  Next <ChevronRight />
                </button>
              </div>
            </article>

            <aside className="card side-card">
              <div className="side-head">
                <span className="field-label">{section.label}</span>
                <span className="muted small">
                  {score.correct}/{score.total} · {score.percent}%
                </span>
              </div>
              <QuestionPalette
                count={section.questions.length}
                current={index}
                onSelect={setSelected}
                visible={matches}
                getState={(i) => [statuses[i], flags[i] && 'flagged'].filter(Boolean)}
              />
              <div className="legend">
                <span><i className="dot dot-correct" /> Correct</span>
                <span><i className="dot dot-wrong" /> Wrong</span>
                <span><i className="dot dot-skipped" /> Skipped</span>
              </div>
              <button className="btn btn-outline btn-block" onClick={() => navigate(course ? coursePath(course) : '/')}>
                {course ? `More ${course.code} tests` : 'New test'}
              </button>
            </aside>
          </div>
        )}
      </main>
      {speechSupported && <SelectionReader containerRef={contentRef} rate={rate} />}
    </>
  );
}
