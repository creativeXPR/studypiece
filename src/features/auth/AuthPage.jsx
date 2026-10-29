import { useState } from 'react';
import { useAuth } from '../../app/AuthProvider';
import AppHeader from '../../lib/AppHeader';
import BrandMark from '../../lib/BrandMark';
import { GoogleIcon } from '../../lib/icons';

const ERROR_MESSAGES = {
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'Your browser blocked the sign-in popup. Allow popups for this site and try again.',
  'auth/network-request-failed': 'No internet connection. Check your network and try again.',
  'auth/unauthorized-domain': 'This site isn’t authorised for sign-in yet. Add its domain in Firebase → Authentication → Settings.',
  'auth/invalid-credential': 'Wrong email or password.',
  'auth/invalid-login-credentials': 'Wrong email or password.',
  'auth/wrong-password': 'Wrong email or password.',
  'auth/user-not-found': 'No account uses that email. Create one instead?',
  'auth/invalid-email': 'That email address doesn’t look right.',
  'auth/missing-password': 'Enter your password.',
  'auth/email-already-in-use': 'An account already uses that email. Sign in instead.',
  'auth/weak-password': 'Use a password of at least 6 characters.',
  'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
  'auth/operation-not-allowed': 'Email sign-in isn’t switched on yet. Enable Email/Password in Firebase → Authentication → Sign-in method.',
};

const messageFor = (err) => ERROR_MESSAGES[err?.code] || 'Something went wrong. Please try again.';

export default function AuthPage() {
  const { signIn, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const isSignUp = mode === 'signup';

  async function run(action) {
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await action();
    } catch (err) {
      setError(messageFor(err));
      setBusy(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignUp && !name.trim()) return setError('Enter your name.');
    if (!email.trim()) return setError('Enter your email.');
    if (!password) return setError('Enter your password.');
    run(() => (isSignUp ? signUpWithEmail(name, email, password) : signInWithEmail(email, password)));
  }

  async function handleReset() {
    if (!email.trim()) return setError('Type your email above first, then tap “Forgot password?”.');
    setBusy(true);
    setError('');
    try {
      await resetPassword(email);
      setNotice(`Password reset link sent to ${email.trim()}. Check your inbox (and spam).`);
    } catch (err) {
      setError(messageFor(err));
    }
    setBusy(false);
  }

  function switchMode(next) {
    setMode(next);
    setError('');
    setNotice('');
  }

  return (
    <>
      <AppHeader />
      <main className="page page-narrow auth-page">
        <div className="card auth-card">
          <BrandMark large />
          <h1>StudyPiece</h1>
          <p className="muted">CBT practice for your university courses: timed tests, instant scores, and a full explanation for every answer.</p>

          <button className="btn btn-outline btn-block btn-lg" onClick={() => run(signIn)} disabled={busy}>
            <GoogleIcon /> Continue with Google
          </button>

          <div className="auth-divider">
            <span>or use email</span>
          </div>

          <div className="segmented auth-tabs" role="tablist">
            <button role="tab" aria-selected={!isSignUp} className={!isSignUp ? 'active' : ''} onClick={() => switchMode('signin')}>
              Sign in
            </button>
            <button role="tab" aria-selected={isSignUp} className={isSignUp ? 'active' : ''} onClick={() => switchMode('signup')}>
              Create account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {isSignUp && (
              <input
                className="input"
                type="text"
                placeholder="Full name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              className="input"
              type="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder={isSignUp ? 'Password (at least 6 characters)' : 'Password'}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={busy}>
              {busy ? 'Please wait…' : isSignUp ? 'Create account' : 'Sign in'}
            </button>
            {!isSignUp && (
              <button type="button" className="link-btn" onClick={handleReset} disabled={busy}>
                Forgot password?
              </button>
            )}
          </form>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          {notice && (
            <p className="form-notice" role="status">
              {notice}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
