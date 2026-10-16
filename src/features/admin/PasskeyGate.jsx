import { useState } from 'react';
import { checkPasskey, rememberUnlock } from './adminUnlock';

export default function PasskeyGate({ onUnlock }) {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setChecking(true);
    const ok = await checkPasskey(passkey);
    setChecking(false);
    if (!ok) {
      setError('Wrong passkey.');
      return;
    }
    rememberUnlock();
    onUnlock();
  }

  return (
    <main className="page page-narrow auth-page">
      <form className="card form-card" onSubmit={handleSubmit}>
        <h1>Admin</h1>
        <p className="muted">Enter the admin passkey to view usage.</p>
        <input
          className="input"
          type="password"
          placeholder="Passkey"
          autoComplete="current-password"
          value={passkey}
          onChange={(e) => {
            setPasskey(e.target.value);
            setError('');
          }}
          autoFocus
        />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary btn-lg" disabled={checking || !passkey}>
          Unlock
        </button>
      </form>
    </main>
  );
}
