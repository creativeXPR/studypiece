import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTest } from '../../app/TestProvider';
import { coursePath, getCourseBySlug, getSet, setPath } from '../../data/courses';
import AppHeader from '../../lib/AppHeader';
import ShareButtons from '../../lib/ShareButtons';
import ShuffleToggles from '../../lib/ShuffleToggles';
import useShufflePrefs from '../../lib/useShufflePrefs';
import { ChevronLeft, ChevronRight, ClockIcon } from '../../lib/icons';
import NotFound from './NotFound';
import useStartTest from './useStartTest';

export default function TestIntroPage() {
  const { courseId, setId } = useParams();
  const course = getCourseBySlug(courseId);
  const set = getSet(course, setId);
  const { session } = useTest();
  const navigate = useNavigate();
  const { start, dialog } = useStartTest();
  const [duration, setDuration] = useState(set?.questions.length ?? 25);
  const [prefs, setPrefs] = useShufflePrefs();

  if (!set) return <NotFound />;

  const index = course.sets.indexOf(set);
  const next = course.sets[index + 1];
  const inProgress =
    session &&
    !session.submittedAt &&
    session.config.items.length === 1 &&
    session.config.items[0].course === course.code &&
    session.config.items[0].setId === set.id;

  const begin = () =>
    start({ items: [{ course: course.code, kind: 'set', setId: set.id }], durationMin: duration, ...prefs });

  return (
    <>
      <AppHeader />
      <main className="page page-narrow">
        <Link to={coursePath(course)} className="back-link">
          <ChevronLeft size={16} /> {course.code}
        </Link>

        <section className="card intro-card">
          <p className="field-label">
            {course.code} · Set {index + 1} of {course.sets.length}
          </p>
          <h1>{set.title}</h1>
          {course.title && <p className="muted">{course.title}</p>}

          <div className="intro-stats">
            <div>
              <strong>{set.questions.length}</strong>
              <span className="muted small">questions</span>
            </div>
            <label className="intro-duration">
              <span className="intro-duration-input">
                <ClockIcon size={16} />
                <input
                  type="number"
                  min="1"
                  max="600"
                  value={duration}
                  onChange={(e) => setDuration(Math.max(1, Number(e.target.value) || 1))}
                  aria-label="Duration in minutes"
                />
              </span>
              <span className="muted small">minutes</span>
            </label>
          </div>

          <ShuffleToggles prefs={prefs} onChange={setPrefs} />

          {inProgress ? (
            <div className="intro-actions">
              <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate('/test')}>
                Resume test
              </button>
              <button className="btn btn-ghost btn-block" onClick={begin}>
                Start over
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-lg btn-block" onClick={begin}>
              Start test
            </button>
          )}

          <div className="intro-footer">
            <span className="muted small">Share this test</span>
            <ShareButtons
              path={setPath(course, set)}
              text={`${course.code} · ${set.title}: ${set.questions.length}-question practice test`}
            />
          </div>
        </section>

        {next && (
          <Link to={setPath(course, next)} className="next-set">
            <span className="muted small">Next set</span>
            <span>
              {next.title} <ChevronRight size={16} />
            </span>
          </Link>
        )}
      </main>
      {dialog}
    </>
  );
}
