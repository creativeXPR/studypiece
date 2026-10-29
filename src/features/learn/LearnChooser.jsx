import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { coursePath } from '../../data/courses';
import { tutorialPath } from '../../data/tutorials';
import CourseBanner from '../../lib/CourseBanner';
import { ChevronRight, TimerIcon, XIcon } from '../../lib/icons';
import { lessonsDone } from './progress';
import './learn.css';

/**
 * Opened from the course list for courses that have a tutorial:
 * learn the material step by step, or go straight to timed practice.
 */
export default function LearnChooser({ course, tutorial, onClose }) {
  const navigate = useNavigate();
  const { done, total } = lessonsDone(tutorial);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="chooser-backdrop" onClick={onClose}>
      <div className="chooser" role="dialog" aria-modal="true" aria-labelledby="chooser-title" onClick={(e) => e.stopPropagation()}>
        <div className="chooser-grab" aria-hidden="true" />
        <div className="chooser-head">
          <div>
            <p className="muted small">{course.title}</p>
            <h2 id="chooser-title">{course.code}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <XIcon />
          </button>
        </div>
        <CourseBanner code={course.code} size="strip" />
        <p className="muted">How do you want to study today?</p>

        <div className="chooser-options">
          <button className="chooser-option learn" onClick={() => navigate(tutorialPath(tutorial.slug))} autoFocus>
            <span className="chooser-art" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <rect x="10" y="14" width="44" height="36" rx="8" className="ch-card" />
                <path d="M20 26h24M20 33h16" className="ch-line" />
                <circle cx="46" cy="44" r="10" className="ch-dot" />
                <path d="M42 44l3 3 5-6" className="ch-tick" />
              </svg>
            </span>
            <span className="chooser-text">
              <strong>Tutorial</strong>
              <span className="muted small">Learn it step by step, with stories, visuals and questions along the way.</span>
              <span className="chooser-meta">
                <span className="chooser-badge">New</span>
                {done ? `${done} of ${total} lessons done` : `${total} lessons ready`}
              </span>
            </span>
            <ChevronRight className="chooser-chev" />
          </button>

          <button className="chooser-option practice" onClick={() => navigate(coursePath(course))}>
            <span className="chooser-art" aria-hidden="true">
              <TimerIcon size={30} />
            </span>
            <span className="chooser-text">
              <strong>Practice questions</strong>
              <span className="muted small">Timed CBT sets with scores and explanations.</span>
              <span className="chooser-meta">
                {course.sets.length} sets · {course.questionCount} questions
              </span>
            </span>
            <ChevronRight className="chooser-chev" />
          </button>
        </div>
      </div>
    </div>
  );
}
