import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthProvider';
import { useTest } from '../../app/TestProvider';
import { coursePath, courses } from '../../data/courses';
import { prefixesFor } from '../../data/departments';
import { findLesson, getTutorial, lessonPath } from '../../data/tutorials';
import LearnChooser from '../learn/LearnChooser';
import { clearRun, listRuns } from '../learn/progress';
import ConfirmDialog from '../../lib/ConfirmDialog';
import AppHeader from '../../lib/AppHeader';
import { ChevronRight, SearchIcon } from '../../lib/icons';

export default function SelectTestPage() {
  const { profile, user } = useAuth();
  const { session, clearTest } = useTest();
  const navigate = useNavigate();

  const myCourses = useMemo(() => {
    const prefixes = prefixesFor(profile?.department);
    return courses.filter(
      (c) => c.showToAll || (prefixes.includes(c.prefix) && String(c.level) === profile?.level),
    );
  }, [profile]);

  const [scope, setScope] = useState(myCourses.length ? 'mine' : 'all');
  const [search, setSearch] = useState('');
  const [chooser, setChooser] = useState(null);
  const [confirm, setConfirm] = useState(null); // 'test' | 'lesson' | null
  const [runsVersion, setRunsVersion] = useState(0);

  // The most recent lesson left part-way through (saved like a running test).
  const lessonRun = useMemo(() => {
    for (const run of listRuns(user?.uid)) {
      const tutorial = getTutorial(run.courseSlug);
      const found = tutorial && findLesson(tutorial, run.lessonId);
      if (found) return { ...run, tutorial, lesson: found.lesson };
    }
    return null;
    // runsVersion re-reads storage after a discard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, runsVersion]);

  const query = search.trim().toLowerCase().replace(/\s+/g, '');
  const visibleCourses = query
    ? courses.filter((c) => `${c.slug}${c.title}`.toLowerCase().replace(/\s+/g, '').includes(query))
    : scope === 'mine'
      ? myCourses
      : courses;

  const activeTest = session && !session.submittedAt ? session : null;

  return (
    <>
      <AppHeader />
      <main className="page select-page">
        {activeTest && (
          <div className="banner">
            <div>
              <strong>You have a test in progress.</strong>
              <span className="muted"> {activeTest.sections.map((s) => s.label).join(', ')}</span>
            </div>
            <div className="banner-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirm('test')}>
                Discard
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/test')}>
                Resume
              </button>
            </div>
          </div>
        )}
        {lessonRun && (
          <div className="banner">
            <div>
              <strong>You have a lesson in progress.</strong>
              <span className="muted">
                {' '}
                {lessonRun.tutorial.code} · {lessonRun.lesson.title} (screen {lessonRun.idx + 1} of {lessonRun.total})
              </span>
            </div>
            <div className="banner-actions">
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirm('lesson')}>
                Discard
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate(lessonPath(lessonRun.courseSlug, lessonRun.lessonId))}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {session?.submittedAt && (
          <div className="banner banner-quiet">
            <span>Your last result is still available.</span>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/results')}>
              View result
            </button>
          </div>
        )}

        <div className="page-heading">
          <h1>Courses</h1>
          <p className="muted">Open a course to see its question sets. Every set has its own link you can share.</p>
        </div>

        <div className="toolbar">
          <div className="search">
            <SearchIcon />
            <input
              className="input"
              type="search"
              placeholder="Search all courses, e.g. GES 201"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {!query && (
            <div className="segmented" role="tablist">
              <button role="tab" aria-selected={scope === 'mine'} className={scope === 'mine' ? 'active' : ''} onClick={() => setScope('mine')}>
                For you
              </button>
              <button role="tab" aria-selected={scope === 'all'} className={scope === 'all' ? 'active' : ''} onClick={() => setScope('all')}>
                All courses
              </button>
            </div>
          )}
        </div>

        <div className="course-list">
          {visibleCourses.map((course) => (
            <Link
              key={course.code}
              to={coursePath(course)}
              className="course-card course-link"
              onClick={(e) => {
                // Courses with a tutorial ask first: learn, or practise?
                if (!getTutorial(course.slug)) return;
                e.preventDefault();
                setChooser(course);
              }}
            >
              <div>
                <h2 className="course-code">
                  {course.code}
                  {getTutorial(course.slug) && <span className="course-tag">Tutorial</span>}
                </h2>
                {course.title && <p className="course-title">{course.title}</p>}
                <p className="muted small">
                  {course.sets.length} set{course.sets.length === 1 ? '' : 's'} · {course.questionCount} questions
                </p>
              </div>
              <ChevronRight className="muted" />
            </Link>
          ))}
          {visibleCourses.length === 0 && (
            <div className="empty">
              {query ? (
                <p>No course matches “{search}”.</p>
              ) : (
                <>
                  <p>
                    No courses for <span className="capitalize">{profile?.department}</span>, {profile?.level} level yet.
                  </p>
                  <button className="btn btn-outline btn-sm" onClick={() => setScope('all')}>
                    Browse all courses
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <ConfirmDialog
        open={!!confirm}
        title={confirm === 'lesson' ? 'Discard lesson progress?' : 'Discard your test?'}
        confirmLabel="Discard"
        danger
        onConfirm={() => {
          if (confirm === 'lesson') {
            clearRun(user?.uid, lessonRun.courseSlug, lessonRun.lessonId);
            setRunsVersion((v) => v + 1);
          } else {
            clearTest();
          }
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      >
        {confirm === 'lesson'
          ? 'You will start this lesson from the beginning next time. Lessons you have finished stay finished.'
          : 'Your answers and remaining time for this test will be lost.'}
      </ConfirmDialog>
      {chooser && <LearnChooser course={chooser} tutorial={getTutorial(chooser.slug)} onClose={() => setChooser(null)} />}
    </>
  );
}
