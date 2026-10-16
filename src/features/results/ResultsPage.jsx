import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTest } from '../../app/TestProvider';
import { coursePath, getCourse } from '../../data/courses';
import AppHeader from '../../lib/AppHeader';
import { formatDuration, scoreSession } from '../../lib/scoring';

function verdict(percent) {
  if (percent >= 70) return 'Excellent work.';
  if (percent >= 50) return 'Good. Review the ones you missed.';
  return 'Keep practising. The explanations will help.';
}

export default function ResultsPage() {
  const { session, startTest, clearTest } = useTest();
  const navigate = useNavigate();
  const result = useMemo(() => scoreSession(session), [session]);
  const timeUsed = (session.submittedAt - session.startedAt) / 1000;
  const tone = result.percent >= 70 ? 'good' : result.percent >= 50 ? 'ok' : 'low';

  function retake() {
    startTest(session.config);
    navigate('/test', { replace: true });
  }

  const course = getCourse(session.config.items[0].course);

  function newTest() {
    clearTest();
    navigate(course ? coursePath(course) : '/', { replace: true });
  }

  return (
    <>
      <AppHeader />
      <main className="page page-narrow results-page">
        <section className="card score-card">
          <div className={`score-ring ${tone}`} style={{ '--pct': result.percent }}>
            <span className="score-value">{result.percent}%</span>
          </div>
          <div>
            <h1>
              {result.correct} / {result.total} correct
            </h1>
            <p className="muted">{verdict(result.percent)}</p>
            <p className="muted small">Time used: {formatDuration(timeUsed)}</p>
          </div>
        </section>

        <section className="card">
          <table className="results-table">
            <thead>
              <tr>
                <th>Section</th>
                <th className="num">Correct</th>
                <th className="num">Wrong</th>
                <th className="num">Skipped</th>
                <th className="num">Score</th>
              </tr>
            </thead>
            <tbody>
              {result.sections.map((s) => (
                <tr key={s.section.key}>
                  <td>{s.section.label}</td>
                  <td className="num good-text">{s.correct}</td>
                  <td className="num bad-text">{s.wrong}</td>
                  <td className="num muted">{s.skipped}</td>
                  <td className="num">
                    <strong>{s.percent}%</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="results-actions">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/review')}>
            Check answers
          </button>
          <button className="btn btn-outline btn-lg" onClick={retake}>
            Retake
          </button>
          <button className="btn btn-ghost btn-lg" onClick={newTest}>
            {course ? `More ${course.code} tests` : 'New test'}
          </button>
        </div>
      </main>
    </>
  );
}
