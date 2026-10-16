import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthProvider';
import AppHeader from '../../lib/AppHeader';
import { DEPARTMENTS, LEVELS } from '../../data/departments';

export default function OnboardingPage() {
  const { user, profile, needsOnboarding, saveProfile } = useAuth();
  const navigate = useNavigate();
  const from = useLocation().state?.from;
  const [department, setDepartment] = useState(profile?.department || '');
  const [level, setLevel] = useState(profile?.level || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const firstName = (profile?.username || user?.displayName || '').split(' ')[0];

  async function handleSubmit(e) {
    e.preventDefault();
    if (!department.trim()) return setError('Enter your department.');
    if (!level) return setError('Choose your level.');
    setSaving(true);
    await saveProfile({ department, level });
    navigate(from ?? '/', { replace: true });
  }

  return (
    <>
      <AppHeader />
      <main className="page page-narrow">
        <form className="card form-card" onSubmit={handleSubmit}>
          <h1>{needsOnboarding ? `Welcome${firstName ? `, ${firstName}` : ''}` : 'Edit profile'}</h1>
          <p className="muted">Your department and level decide which courses show up first. You can still search every course.</p>

          <label className="field">
            <span className="field-label">Department</span>
            <input
              className="input capitalize"
              list="department-list"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. computer science"
              autoComplete="off"
            />
            <datalist id="department-list">
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </label>

          <div className="field">
            <span className="field-label">Level</span>
            <div className="segmented" role="radiogroup" aria-label="Level">
              {LEVELS.map((l) => (
                <button
                  type="button"
                  key={l}
                  role="radio"
                  aria-checked={level === l}
                  className={level === l ? 'active' : ''}
                  onClick={() => setLevel(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="form-actions">
            {!needsOnboarding && (
              <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
                Cancel
              </button>
            )}
            <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
              {saving ? 'Saving…' : needsOnboarding ? 'Continue' : 'Save'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
