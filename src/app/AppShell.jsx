import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { isAdminUser } from '../lib/admins';
import { BookIcon, PanelIcon, ShieldIcon, TimerIcon, UserIcon } from '../lib/icons';
import { readJSON, writeJSON } from '../lib/storage';
import { useAuth } from './AuthProvider';
import { useTest } from './TestProvider';

const COLLAPSE_KEY = 'studypiece.railCollapsed';

// Which tab a path belongs to; screens in the same tab cross-fade, moves
// between tabs don't slide (tabs swap, they don't push).
function tabOf(pathname) {
  if (pathname === '/' || pathname.startsWith('/course') || pathname.startsWith('/learn')) return 'courses';
  if (['/test', '/results', '/review'].includes(pathname)) return 'test';
  if (pathname.startsWith('/profile') || pathname.startsWith('/onboarding')) return 'profile';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'other';
}

function NavItem({ to, icon: Icon, label, active, disabled, live, onClick }) {
  if (disabled) {
    return (
      <span className="nav-item disabled" aria-disabled="true" title={`${label}: start a test first`}>
        <Icon size={20} />
        <span className="nav-label">{label}</span>
      </span>
    );
  }
  return (
    <NavLink
      to={to}
      className={() => `nav-item${active ? ' active' : ''}`}
      aria-current={active ? 'page' : undefined}
      title={label}
      onClick={onClick}
    >
      <span className="nav-icon">
        <Icon size={20} />
        {live && <i className="nav-live" aria-label="Test in progress" />}
      </span>
      <span className="nav-label">{label}</span>
    </NavLink>
  );
}

/**
 * Signed-in app frame: bottom tab bar on phones, icon rail on tablets,
 * labelled rail on desktop (all CSS — the tree never changes on resize).
 * Also owns screen transitions and scroll-to-top between screens.
 */
export default function AppShell() {
  const { user } = useAuth();
  const { session } = useTest();
  const { pathname } = useLocation();
  const navType = useNavigationType();
  const [collapsed, setCollapsed] = useState(() => readJSON(COLLAPSE_KEY, false));
  const first = useRef(true);
  const [transition, setTransition] = useState({ key: pathname, dir: 'none' });

  // Pick the animation for this screen: back (browser/phone back) slides
  // from the left, everything else from the right; a tab switch just fades.
  if (transition.key !== pathname) {
    const sameTab = tabOf(transition.key) === tabOf(pathname);
    setTransition({ key: pathname, dir: !sameTab ? 'swap' : navType === 'POP' ? 'back' : 'forward' });
  }

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (navType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, navType]);

  const tab = tabOf(pathname);
  const running = session && !session.submittedAt;
  const testTarget = running ? '/test' : session?.submittedAt ? '/results' : null;

  function toggleRail() {
    setCollapsed((c) => {
      writeJSON(COLLAPSE_KEY, !c);
      return !c;
    });
  }

  return (
    <div className={`shell${collapsed ? ' rail-collapsed' : ''}`}>
      <nav className="app-nav" aria-label="Main">
        <Link to="/" className="nav-brand" aria-label="StudyPiece home">
          <span className="brand-mark">SP</span>
          <span className="nav-brand-name">StudyPiece</span>
        </Link>
        <div className="nav-items">
          <NavItem to="/" icon={BookIcon} label="Courses" active={tab === 'courses'} />
          <NavItem
            to={testTarget ?? '/'}
            icon={TimerIcon}
            label="Test"
            active={tab === 'test'}
            disabled={!testTarget}
            live={running}
          />
          <NavItem to="/profile" icon={UserIcon} label="Profile" active={tab === 'profile'} />
          {isAdminUser(user) && <NavItem to="/admin" icon={ShieldIcon} label="Admin" active={tab === 'admin'} />}
        </div>
        <button
          type="button"
          className="rail-toggle"
          onClick={toggleRail}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PanelIcon size={16} />
        </button>
      </nav>

      <div className={`screen enter-${transition.dir}`} key={pathname}>
        <Outlet />
      </div>
    </div>
  );
}
