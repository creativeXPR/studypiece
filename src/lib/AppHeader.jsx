import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import useTheme from './useTheme';
import { MoonIcon, SunIcon } from './icons';

// Top bar: brand (hidden beside the rail on wider screens), a centre slot for
// screen-specific controls (timer, back to results), and the theme toggle.
// Account actions live on the Profile tab.
export default function AppHeader({ children }) {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="brand">
          <BrandMark />
          <span className="brand-name">StudyPiece</span>
        </Link>
        <div className="header-slot">{children}</div>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
