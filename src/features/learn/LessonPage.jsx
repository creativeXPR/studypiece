import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../../app/AuthProvider';
import { findLesson, getTutorial, lessonPath, tutorialPath } from '../../data/tutorials';
import LessonPlayer from './LessonPlayer';
import './learn.css';

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { user } = useAuth();
  const tutorial = getTutorial(courseId);
  const found = tutorial ? findLesson(tutorial, lessonId) : null;
  const next = found?.next;
  const nextLesson = useMemo(
    () => (next ? { title: next.title, href: lessonPath(tutorial.slug, next.id) } : null),
    [next, tutorial],
  );

  if (!tutorial) return <Navigate to="/" replace />;
  if (!found) return <Navigate to={tutorialPath(tutorial.slug)} replace />;

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
