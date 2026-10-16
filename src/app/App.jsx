import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthProvider';
import { TestProvider, useTest } from './TestProvider';
import AuthPage from '../features/auth/AuthPage';
import OnboardingPage from '../features/onboarding/OnboardingPage';
import SelectTestPage from '../features/select-test/SelectTestPage';
import TestPage from '../features/test/TestPage';
import ResultsPage from '../features/results/ResultsPage';
import ReviewPage from '../features/review/ReviewPage';
import CoursePage from '../features/course/CoursePage';
import TestIntroPage from '../features/course/TestIntroPage';
import ProfilePage from '../features/profile/ProfilePage';
import AppShell from './AppShell';
import AdminPage from '../features/admin/AdminPage';
import TutorialHomePage from '../features/learn/TutorialHomePage';
import LessonPage from '../features/learn/LessonPage';

function FullScreenLoader() {
  return (
    <div className="fullscreen-center">
      <div className="spinner" aria-label="Loading" />
    </div>
  );
}

// A shared test link opened while signed out should land on that test after
// sign-in (and onboarding), so the original location rides along in `state.from`.
function RequireAuth() {
  const { user, needsOnboarding } = useAuth();
  const location = useLocation();
  const from = location.state?.from ?? location;
  if (user === undefined) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace state={{ from }} />;
  if (needsOnboarding && location.pathname !== '/onboarding') return <Navigate to="/onboarding" replace state={{ from }} />;
  return <Outlet />;
}

function GuestOnly() {
  const { user } = useAuth();
  const location = useLocation();
  if (user === undefined) return <FullScreenLoader />;
  return user ? <Navigate to={location.state?.from ?? '/'} replace state={{ from: location.state?.from }} /> : <Outlet />;
}

// /test needs a running test; /results and /review need a submitted one.
function RequireSession({ submitted }) {
  const { session } = useTest();
  if (!session) return <Navigate to="/" replace />;
  if (submitted && !session.submittedAt) return <Navigate to="/test" replace />;
  if (!submitted && session.submittedAt) return <Navigate to="/results" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TestProvider>
          <Routes>
            <Route element={<GuestOnly />}>
              <Route path="/login" element={<AuthPage />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              {/* Lessons are full-screen: no tab bar while learning. */}
              <Route path="/learn/:courseId/:lessonId" element={<LessonPage />} />
              <Route element={<AppShell />}>
                <Route path="/" element={<SelectTestPage />} />
                <Route path="/course/:courseId" element={<CoursePage />} />
                <Route path="/course/:courseId/:setId" element={<TestIntroPage />} />
                <Route path="/learn/:courseId" element={<TutorialHomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route element={<RequireSession submitted={false} />}>
                  <Route path="/test" element={<TestPage />} />
                </Route>
                <Route element={<RequireSession submitted />}>
                  <Route path="/results" element={<ResultsPage />} />
                  <Route path="/review" element={<ReviewPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TestProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
