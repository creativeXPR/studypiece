import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { coursePath, getCourseBySlug, setPath } from '../../data/courses';
import { getTutorial, tutorialPath } from '../../data/tutorials';
import AppHeader from '../../lib/AppHeader';
import ShareButtons from '../../lib/ShareButtons';
import ShuffleToggles from '../../lib/ShuffleToggles';
import useShufflePrefs from '../../lib/useShufflePrefs';
import { BulbIcon, ChevronLeft, ChevronRight } from '../../lib/icons';
import NotFound from './NotFound';
import useStartTest from './useStartTest';

export default function CoursePage() {
  const { courseId } = useParams();
  const course = getCourseBySlug(courseId);
  const { start, dialog } = useStartTest();
  const [mixCount, setMixCount] = useState(25);
  const [prefs, setPrefs] = useShufflePrefs();

  if (!course) return <NotFound />;

  const count = Math.min(mixCount, course.questionCount);
  const tutorial = getTutorial(course.slug);

  return (
    <>
      <AppHeader />
      <main className="page">
        <Link to="/" className="back-link">
          <ChevronLeft size={16} /> All courses
        </Link>

        <div className="course-hero">
          <div>
            <h1>{course.code}</h1>
            {course.title && <p className="course-title">{course.title}</p>}
            <p className="muted small">
              {course.sets.length} sets · {course.questionCount} questions
            </p>
          </div>
          <ShareButtons path={coursePath(course)} text={`${course.code} practice tests on StudyPiece`} />
        </div>

        {tutorial && (
          <Link to={tutorialPath(tutorial.slug)} className="course-tutorial-link">
            <span className="course-tutorial-icon"><BulbIcon size={20} /></span>
            <span>
              <strong>Learn it first with the interactive tutorial</strong>
              <span className="muted small">Short story-driven lessons with questions along the way.</span>
            </span>
            <ChevronRight className="muted" />
          </Link>
        )}

        <div className="set-list">
          {course.sets.map((set, i) => (
            <div key={set.id} className="set-card">
              <Link to={setPath(course, set)} className="set-card-main">
                <span className="set-number">{i + 1}</span>
                <div>
                  <h2 className="set-title">{set.title}</h2>
                  <p className="muted small">
                    {set.questions.length} questions · {set.questions.length} min
                  </p>
                </div>
                <ChevronRight className="muted set-chevron" />
              </Link>
              <ShareButtons
                compact
                path={setPath(course, set)}
                text={`${course.code} · ${set.title}: ${set.questions.length}-question practice test`}
              />
            </div>
          ))}
        </div>

        <section className="card mix-card">
          <div>
            <h2 className="set-title">Random mix</h2>
            <p className="muted small">Questions drawn at random from every set in {course.code}.</p>
            <ShuffleToggles prefs={prefs} onChange={setPrefs} showQuestionOrder={false} />
          </div>
          <div className="mix-controls">
            <input
              className="input input-sm"
              type="number"
              min="1"
              max={course.questionCount}
              value={count}
              onChange={(e) => setMixCount(Math.max(1, Number(e.target.value) || 1))}
              aria-label="Number of questions"
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                start({ items: [{ course: course.code, kind: 'mix', count }], durationMin: count, ...prefs })
              }
            >
              Start mix
            </button>
          </div>
        </section>
      </main>
      {dialog}
    </>
  );
}
