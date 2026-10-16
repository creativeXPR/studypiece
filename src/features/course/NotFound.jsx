import { Link } from 'react-router-dom';
import AppHeader from '../../lib/AppHeader';

export default function NotFound() {
  return (
    <>
      <AppHeader />
      <main className="page page-narrow">
        <div className="card empty">
          <h1>Test not found</h1>
          <p>This link may be mistyped, or the test was renamed.</p>
          <Link to="/" className="btn btn-primary">
            Browse courses
          </Link>
        </div>
      </main>
    </>
  );
}
