import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../app/TestProvider';
import { getCourse, getLoadedCourse, loadCourse } from '../../data/courses';
import ConfirmDialog from '../../lib/ConfirmDialog';
import CourseLoading from '../../lib/CourseLoading';

// Starts a test, asking first if it would throw away one that's still running. A course's
// questions download on their own; passing `prefetchCode` starts that download as soon as the
// page opens, so the test usually begins at once. If they're still coming, a loading screen
// shows the progress, and a failed download can be retried.
export default function useStartTest(prefetchCode) {
  const { session, startTest } = useTest();
  const navigate = useNavigate();
  const [pending, setPending] = useState(null);
  const [loading, setLoading] = useState(null); // { config, options, error }

  useEffect(() => {
    if (prefetchCode) loadCourse(prefetchCode).catch(() => {}); // retried when the test starts
  }, [prefetchCode]);

  function launch(config, options) {
    startTest(config);
    navigate('/test', { replace: !!options.replace });
  }

  function begin(config, options = {}) {
    const codes = [...new Set(config.items.map((item) => item.course))];
    if (codes.every((code) => getLoadedCourse(code))) return launch(config, options);
    setLoading({ config, options, error: null });
    Promise.all(codes.map(loadCourse)).then(
      () => {
        setLoading(null);
        launch(config, options);
      },
      (error) => setLoading({ config, options, error }),
    );
  }

  function start(config) {
    if (session && !session.submittedAt) setPending(config);
    else begin(config);
  }

  const course = loading && getCourse(loading.config.items[0].course);
  const dialog = (
    <>
      <ConfirmDialog
        open={!!pending}
        title="Replace your test in progress?"
        confirmLabel="Start new test"
        danger
        onConfirm={() => {
          const config = pending;
          setPending(null);
          begin(config);
        }}
        onCancel={() => setPending(null)}
      >
        Your unfinished test ({session?.sections.map((s) => s.label).join(', ')}) and its answers will be discarded.
      </ConfirmDialog>
      {course && (
        <CourseLoading
          overlay
          code={course.code}
          title={course.title}
          what="questions"
          amount={course.questionCount}
          error={loading.error}
          onRetry={() => begin(loading.config, loading.options)}
        />
      )}
    </>
  );

  return { start, begin, dialog };
}
