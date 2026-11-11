import { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../app/AuthProvider';
import { findLesson, getLoadedTutorial, getTutorial, lessonPath, loadTutorial, tutorialPath } from '../../data/tutorials';
import CourseLoading from '../../lib/CourseLoading';
import useLoaded from '../../lib/useLoaded';
import LessonPlayer from './LessonPlayer';
import { preloadPython } from './python';
import './learn.css';

// The libraries used by these lessons' code screens, or null when they have no code screens.
function codePackages(lessons = []) {
  const cells = lessons
    .flatMap((l) => l?.sections ?? [])
    .flatMap((s) => s.screens)
    .filter((s) => s.widget === 'code');
  return cells.length ? [...new Set(cells.flatMap((s) => s.graph?.packages ?? []))] : null;
}

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { user } = useAuth();
  const tutorial = getTutorial(courseId);
  // The catalogue says whether the lesson exists; its screens come with the tutorial's download.
  const listed = tutorial ? findLesson(tutorial, lessonId) : null;
  const { data: full, error, retry } = useLoaded(listed ? tutorial.slug : null, getLoadedTutorial, loadTutorial);
  const found = full ? findLesson(full, lessonId) : null;
  const next = found?.next;
  const nextLesson = useMemo(
    () => (next ? { title: next.title, href: lessonPath(tutorial.slug, next.id) } : null),
    [next, tutorial],
  );

  // Python for code screens (see ./python): a lesson that has code screens makes sure its own
  // libraries are loaded or loading straight away; then, once the first screen is up, the rest of
  // the course's libraries load in the background, so later lessons open ready too. Moving between
  // lessons keeps what was loaded, and nothing is downloaded twice.
  useEffect(() => {
    if (!full) return undefined;
    const mine = codePackages([findLesson(full, lessonId)?.lesson]);
    const all = codePackages(full.chapters.flatMap((c) => c.lessons));
    if (mine) preloadPython(mine);
    if (!all) return undefined;
    const timer = setTimeout(() => preloadPython(all), 1500);
    return () => clearTimeout(timer);
  }, [full, lessonId]);

  if (!tutorial) return <Navigate to="/" replace />;
  if (!listed) return <Navigate to={tutorialPath(tutorial.slug)} replace />;
  if (!found) {
    const ready = tutorial.chapters.flatMap((c) => c.lessons).filter((l) => l.ready).length;
    return <CourseLoading code={tutorial.code} title={tutorial.title} what="lessons" amount={ready} error={error} onRetry={retry} />;
  }

  return (
    <LessonPlayer
      key={found.lesson.id}
      lesson={found.lesson}
      courseSlug={tutorial.slug}
      homeHref={tutorialPath(tutorial.slug)}
      nextLesson={nextLesson}
      uid={user?.uid}
    />
  );
}
