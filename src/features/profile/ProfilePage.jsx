import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/AuthProvider';
import AppFooter from '../../lib/AppFooter';
import AppHeader from '../../lib/AppHeader';
import { isAdminUser } from '../../lib/admins';
import { ChevronRight, LogoutIcon, MoonIcon, ShieldIcon, SunIcon } from '../../lib/icons';
import { SyncCard } from '../../lib/SyncControls';
import useTheme from '../../lib/useTheme';

function initials(name) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || '?'
  );
}

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();
  const [theme, , setTheme] = useTheme();
  const navigate = useNavigate();
  const name = profile?.username || user?.displayName || 'Student';

  return (
    <>
      <AppHeader />
      <main className="page page-narrow profile-page">
        <section className="profile-hero">
          <div className="profile-avatar">
            {user?.photoURL ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" /> : initials(name)}
          </div>
          <div>
            <h1>{name}</h1>
            <p className="muted small">{user?.email}</p>
          </div>
        </section>

        <section className="card list-card">
          <div className="list-row">
            <span className="muted">Department</span>
            <span className="capitalize">{profile?.department || '—'}</span>
          </div>
          <div className="list-row">
            <span className="muted">Level</span>
            <span>{profile?.level ? `${profile.level} Level` : '—'}</span>
          </div>
          <button
            type="button"
            className="list-row list-action"
            onClick={() => navigate('/onboarding', { state: { from: '/profile' } })}
          >
            <span>Edit department & level</span>
            <ChevronRight size={18} className="muted" />
          </button>
        </section>

        <section className="card list-card">
          <div className="list-row">
            <span>Appearance</span>
            <div className="segmented" role="radiogroup" aria-label="Appearance">
              <button
                type="button"
                role="radio"
                aria-checked={theme === 'light'}
                className={theme === 'light' ? 'active' : ''}
                onClick={() => setTheme('light')}
              >
                <SunIcon size={15} /> Light
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={theme === 'dark'}
                className={theme === 'dark' ? 'active' : ''}
                onClick={() => setTheme('dark')}
              >
                <MoonIcon size={15} /> Dark
              </button>
            </div>
          </div>
          {isAdminUser(user) && (
            <Link to="/admin" className="list-row list-action">
              <span className="list-icon-label">
                <ShieldIcon size={18} /> Admin dashboard
              </span>
              <ChevronRight size={18} className="muted" />
            </Link>
          )}
        </section>

        <SyncCard />

        <button type="button" className="btn btn-outline btn-block btn-lg signout-btn" onClick={signOut}>
          <LogoutIcon size={18} /> Sign out
        </button>

        <AppFooter />
      </main>
    </>
  );
}
