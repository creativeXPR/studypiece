import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../app/TestProvider';
import AppHeader from '../../lib/AppHeader';
import ConfirmDialog from '../../lib/ConfirmDialog';
import MathText from '../../lib/MathText';
import QuestionPalette from '../../lib/QuestionPalette';
import SectionTabs from '../../lib/SectionTabs';
import { OPTION_LABELS } from '../../lib/scoring';
import { ChevronLeft, ChevronRight, FlagIcon } from '../../lib/icons';
import Timer from './Timer';

const KEY_TO_OPTION = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 };

export default function TestPage() {
  const { session, answer, toggleFlag, setCursor, submit } = useTest();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { section: sectionIndex, index } = session.cursor;
  const section = session.sections[sectionIndex];
  const question = section.questions[index];
  const answers = session.answers[section.key];
  const flags = session.flags[section.key];
  const picked = answers[index];
  const isLast = index === section.questions.length - 1;
  const isLastSection = sectionIndex === session.sections.length - 1;

  const unanswered = session.sections.reduce(
    (n, s) => n + session.answers[s.key].filter((a) => a === null).length,
    0,
  );

  const finish = useCallback(() => {
    submit();
    navigate('/results', { replace: true });
  }, [submit, navigate]);

  const go = useCallback(
    (delta) => {
      const next = index + delta;
      if (next >= 0 && next < section.questions.length) setCursor({ index: next });
      else if (next >= section.questions.length && !isLastSection) setCursor({ section: sectionIndex + 1, index: 0 });
      else if (next < 0 && sectionIndex > 0)
        setCursor({ section: sectionIndex - 1, index: session.sections[sectionIndex - 1].questions.length - 1 });
    },
    [index, section, sectionIndex, isLastSection, session.sections, setCursor],
  );

  useEffect(() => {
    function onKey(e) {
      if (confirmOpen || e.ctrlKey || e.metaKey || e.altKey || e.target.matches('input, textarea, select')) return;
      const key = e.key.toLowerCase();
      if (key in KEY_TO_OPTION && KEY_TO_OPTION[key] < question.options.length) answer(section.key, index, KEY_TO_OPTION[key]);
      else if (key === 'arrowright' || key === 'n') go(1);
      else if (key === 'arrowleft' || key === 'p') go(-1);
      else if (key === 'f') toggleFlag(section.key, index);
      else return;
      e.preventDefault();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [confirmOpen, question, section.key, index, answer, go, toggleFlag]);

  return (
    <>
      <AppHeader>
        <Timer endsAt={session.endsAt} onExpire={finish} />
      </AppHeader>

      <main className="page test-page">
        <SectionTabs
          sections={session.sections}
          current={sectionIndex}
          onSelect={(i) => setCursor({ section: i, index: 0 })}
          meta={(s) => `${session.answers[s.key].filter((a) => a !== null).length}/${s.questions.length}`}
        />

        <div className="test-layout">
          <article className="card question-card">
            <div className="question-meta">
              <span>
                Question {index + 1} of {section.questions.length}
              </span>
              <button
                className={`flag-btn ${flags[index] ? 'active' : ''}`}
                onClick={() => toggleFlag(section.key, index)}
                aria-pressed={flags[index]}
              >
                <FlagIcon size={16} /> {flags[index] ? 'Flagged' : 'Flag'}
              </button>
            </div>

            <MathText as="p" className="question-text" text={question.question} />

            <div className="options" role="radiogroup" aria-label="Options">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  role="radio"
                  aria-checked={picked === i}
                  className={`option ${picked === i ? 'selected' : ''}`}
                  onClick={() => answer(section.key, index, i)}
                >
                  <span className="option-label">{OPTION_LABELS[i]}</span>
                  <MathText className="option-text" text={option} />
                </button>
              ))}
            </div>

            <div className="question-actions">
              <button className="btn btn-outline" onClick={() => go(-1)} disabled={index === 0 && sectionIndex === 0}>
                <ChevronLeft /> Previous
              </button>
              {picked !== null && (
                <button className="btn btn-ghost btn-sm" onClick={() => answer(section.key, index, null)}>
                  Clear answer
                </button>
              )}
              {isLast && isLastSection ? (
                <button className="btn btn-primary" onClick={() => setConfirmOpen(true)}>
                  Submit
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => go(1)}>
                  Next <ChevronRight />
                </button>
              )}
            </div>
          </article>

          <aside className="card side-card">
            <div className="side-head">
              <span className="field-label">{section.label}</span>
              <span className="muted small">
                {answers.filter((a) => a !== null).length} answered
              </span>
            </div>
            <QuestionPalette
              count={section.questions.length}
              current={index}
              onSelect={(i) => setCursor({ index: i })}
              getState={(i) => [answers[i] !== null && 'answered', flags[i] && 'flagged'].filter(Boolean)}
            />
            <div className="legend">
              <span><i className="dot dot-answered" /> Answered</span>
              <span><i className="dot dot-flagged" /> Flagged</span>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setConfirmOpen(true)}>
              Submit test
            </button>
            <p className="muted small keys-hint">Keys: 1–4 or A–D to answer · ← → to move · F to flag</p>
          </aside>
        </div>
      </main>

      <ConfirmDialog
        open={confirmOpen}
        title="Submit test?"
        confirmLabel="Submit"
        cancelLabel="Keep going"
        onConfirm={finish}
        onCancel={() => setConfirmOpen(false)}
      >
        {unanswered > 0 ? (
          <p>
            You have <strong>{unanswered}</strong> unanswered question{unanswered === 1 ? '' : 's'}. You can’t change answers after submitting.
          </p>
        ) : (
          <p>All questions answered. You can’t change answers after submitting.</p>
        )}
      </ConfirmDialog>
    </>
  );
}
