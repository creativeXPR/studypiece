import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import useTheme from './useTheme';
import FeedbackDialog from './FeedbackDialog';
import { ChatIcon, MoonIcon, SunIcon } from './icons';
import { readJSON, writeJSON } from './storage';

// Remembered on this device: whether the feedback button has been opened, and whether its
// one-time hint has been shown.
const OPENED = 'studypiece.feedback.opened';
const HINTED = 'studypiece.feedback.hinted';

// Top bar: brand (hidden beside the rail on wider screens), a centre slot for
// screen-specific controls (timer, back to results), feedback and the theme toggle.
// Account actions live on the Profile tab.
export default function AppHeader({ children }) {
  const [theme, toggleTheme] = useTheme();
  const [feedback, setFeedback] = useState(false);
  const [opened, setOpened] = useState(() => !!readJSON(OPENED));
  // The hint appears once per device, on a calm screen (not beside a test timer), then fades.
  // It counts as shown only when the fade finishes, so a quick page change doesn't swallow it.
  const [hint, setHint] = useState(() => !children && !readJSON(OPENED) && !readJSON(HINTED));
  const hintDone = () => {
    writeJSON(HINTED, true);
    setHint(false);
  };

  const openFeedback = () => {
    setFeedback(true);
    if (!opened) {
      setOpened(true);
      writeJSON(OPENED, true);
    }
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Link to="/" className="brand">
          <BrandMark />
          <span className="brand-name">StudyPiece</span>
        </Link>
        <div className="header-slot">{children}</div>
        <div className="header-actions">
          <button className="icon-btn feedback-btn" onClick={openFeedback} aria-label="Send feedback" title="Send feedback">
            <ChatIcon />
            {!opened && <span className="feedback-dot" aria-hidden="true" />}
            {hint && !opened && (
              <span className="feedback-hint" aria-hidden="true" onAnimationEnd={hintDone}>
                New: tell us what you think
              </span>
            )}
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
      <FeedbackDialog open={feedback} onClose={() => setFeedback(false)} />
    </header>
  );
}
