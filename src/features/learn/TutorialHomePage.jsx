import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../app/AuthProvider';
import { coursePath, getCourseBySlug } from '../../data/courses';
import { getTutorial, lessonPath } from '../../data/tutorials';
import AppHeader from '../../lib/AppHeader';
import CourseBanner from '../../lib/CourseBanner';
import ConfirmDialog from '../../lib/ConfirmDialog';
import { useSyncRevision } from '../../lib/sync';
import { CheckIcon, ChevronLeft, ChevronRight, ClockIcon, TimerIcon } from '../../lib/icons';
import NotFound from '../course/NotFound';
import { clearRun, getProgress, getRun, lessonsDone, listRuns } from './progress';
import './learn.css';

export default function TutorialHomePage() {
  const { courseId } = useParams();
  const tutorial = getTutorial(courseId);
  const course = getCourseBySlug(courseId);
  const { user } = useAuth();
  const uid = user?.uid;
  const navigate = useNavigate();
  useSyncRevision();
  const [startOver, setStartOver] = useState(null); // lesson to restart, pending confirmation
  if (!tutorial) return <NotFound />;

  const { done, total } = lessonsDone(tutorial);
  const allLessons = tutorial.chapters.flatMap((c) => c.lessons);
  // A lesson left part-way through comes first, like a test in progress.
  const resume = listRuns(uid)
    .filter((r) => r.courseSlug === tutorial.slug)
    .map((run) => ({ run, lesson: allLessons.find((l) => l.id === run.lessonId && l.sections) }))
    .find((x) => x.lesson);
  // An optional chapter only joins the path once the student has started it.
  const started = (ch) => ch.lessons.some((l) => getProgress(tutorial.slug, l.id)?.done || getRun(uid, tutorial.slug, l.id));
  const finished = (ch) => ch.lessons.every((l) => getProgress(tutorial.slug, l.id)?.done);
  const path = tutorial.chapters.filter((c) => !c.optional || started(c)).flatMap((c) => c.lessons);
  const upNext = resume?.lesson ?? path.find((l) => l.sections && !getProgress(tutorial.slug, l.id)?.done);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <AppHeader />
      <main className="page learn-home">
        <Link to="/" className="back-link">
          <ChevronLeft size={16} /> All courses
        </Link>

        <CourseBanner code={tutorial.code} />

        <section className="learn-hero">
          <div className="learn-hero-text">
            <p className="tut-eyebrow">Interactive tutorial</p>
            <h1>{tutorial.code}</h1>
            <p className="muted">{tutorial.title}. Short, story-driven lessons that build up one idea at a time, with questions along the way.</p>
          </div>
          <div className="learn-ring" style={{ '--pct': pct }} aria-label={`${done} of ${total} lessons complete`}>
            <span>
              <span className="learn-ring-num">
                <strong>{done}</strong>/{total}
              </span>
              <small>lessons</small>
            </span>
          </div>
        </section>

        <div className="learn-actions">
          {resume ? (
            <>
              <Link to={lessonPath(tutorial.slug, resume.lesson.id)} className="btn btn-primary btn-lg learn-continue">
                Resume: {resume.lesson.title} ({resume.run.idx + 1}/{resume.run.total}) <ChevronRight size={18} />
              </Link>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStartOver(resume.lesson)}>
                Start over
              </button>
            </>
          ) : upNext ? (
            <Link to={lessonPath(tutorial.slug, upNext.id)} className="btn btn-primary btn-lg learn-continue">
              {allLessons.some((l) => getProgress(tutorial.slug, l.id)?.done) ? 'Continue' : 'Start'}: {upNext.title} <ChevronRight size={18} />
            </Link>
          ) : (
            <p className="learn-alldone">
              <CheckIcon size={18} /> You’ve finished every available lesson. More are on the way.
            </p>
          )}
          {course && (
            <Link to={coursePath(course)} className="btn btn-outline btn-lg">
              <TimerIcon size={18} /> Practice questions
            </Link>
          )}
        </div>

        <div className="learn-chapters">
          {tutorial.chapters.map((ch) => {
            const ready = ch.lessons.filter((l) => l.sections).length;
            const list = (
                <ol className="learn-lessons">
                  {ch.lessons.map((l, i) => {
                    const rec = l.sections ? getProgress(tutorial.slug, l.id) : null;
                    const run = l.sections ? getRun(uid, tutorial.slug, l.id) : null;
                    const state = !l.sections
                      ? 'soon'
                      : run
                        ? 'progress'
                        : rec?.done
                          ? 'done'
                          : upNext?.id === l.id
                            ? 'next'
                            : 'ready';
                    const inner = (
                      <>
                        <span className="learn-dot">{state === 'done' ? <CheckIcon size={16} strokeWidth={3} /> : i + 1}</span>
                        <span className="learn-les-text">
                          <strong>{l.title}</strong>
                          <small className="muted">{l.covers}</small>
                        </span>
                        <span className={`learn-pill ${state}`}>
                          {state === 'soon' ? 'Soon' : state === 'progress' ? `In progress · ${run.idx + 1}/${run.total}` : state === 'done' ? `${rec.best}/${rec.of}` : (
                            <>
                              <ClockIcon size={13} /> {l.minutes} min
                            </>
                          )}
                        </span>
                      </>
                    );
                    return (
                      <li key={l.id}>
                        {l.sections ? (
                          <Link to={lessonPath(tutorial.slug, l.id)} className={`learn-les ${state}`}>{inner}</Link>
                        ) : (
                          <div className="learn-les soon" aria-disabled="true">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ol>
            );
            if (ch.optional) {
              return (
                <details key={ch.n} className="learn-chapter learn-optional" open={started(ch) && !finished(ch)}>
                  <summary className="learn-ch-head">
                    <span className="learn-ch-num">{ch.n}</span>
                    <div>
                      <h2>{ch.title}</h2>
                      <p className="learn-optional-hint">{ch.hint}</p>
                      <p className="muted small">
                        {ch.by} · {ch.lessons.length} short lessons
                      </p>
                    </div>
                    <ChevronRight className="learn-optional-chevron" size={20} />
                  </summary>
                  {list}
                </details>
              );
            }
            return (
              <section key={ch.n} className="learn-chapter">
                <header className="learn-ch-head">
                  <span className="learn-ch-num">{ch.n}</span>
                  <div>
                    <h2>{ch.title}</h2>
                    <p className="muted small">
                      {ch.by} · {ready ? `${ready} of ${ch.lessons.length} lessons ready` : 'Coming soon'}
                    </p>
                  </div>
                </header>
                {list}
              </section>
            );
          })}
        </div>
      </main>
      <ConfirmDialog
        open={!!startOver}
        title="Start this lesson over?"
        confirmLabel="Start over"
        danger
        onConfirm={() => {
          clearRun(uid, tutorial.slug, startOver.id);
          navigate(lessonPath(tutorial.slug, startOver.id));
        }}
        onCancel={() => setStartOver(null)}
      >
        Your place and score in “{startOver?.title}” will go back to the beginning.
      </ConfirmDialog>
    </>
  );
}
