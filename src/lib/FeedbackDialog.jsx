import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../app/AuthProvider';
import { getCourseBySlug } from '../data/courses';
import { getTutorial } from '../data/tutorials';
import { db } from './firebase';

export const FEEDBACK_MAX = 2000;

// The course a page belongs to (/course/:slug… or /learn/:slug…), if any.
function courseOnPage(pathname) {
  const slug = pathname.match(/^\/(?:course|learn)\/([^/]+)/)?.[1];
  return slug ? (getCourseBySlug(slug)?.code ?? getTutorial(slug)?.code ?? '') : '';
}

// A short message to the StudyPiece team. Each one is a single document in `feedback`,
// which only admins can read (see firestore.rules).
export default function FeedbackDialog({ open, onClose }) {
  const { user, profile } = useAuth();
  const { pathname } = useLocation();
  const course = courseOnPage(pathname);
  const [message, setMessage] = useState('');
  const [aboutCourse, setAboutCourse] = useState(true);
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const text = message.trim();
  const close = () => {
    if (state === 'sent') {
      setMessage('');
      setState('idle');
    }
    onClose();
  };

  const send = async (e) => {
    e.preventDefault();
    if (!text || !user || state === 'sending') return;
    setState('sending');
    setError('');
    try {
      await addDoc(collection(db, 'feedback'), {
        uid: user.uid,
        name: profile?.username || user.displayName || '',
        email: user.email || '',
        message: text.slice(0, FEEDBACK_MAX),
        course: course && aboutCourse ? course : '',
        page: pathname,
        createdAt: serverTimestamp(),
      });
      setState('sent');
    } catch (err) {
      setState('error');
      setError(err.code === 'permission-denied' ? 'Please sign in again, then try once more.' : 'It didn’t send. Check your connection and try again.');
    }
  };

  // Rendered into <body>: the sticky header would otherwise trap the fixed backdrop.
  return createPortal(
    <div className="dialog-backdrop" onClick={close}>
      <div className="dialog feedback-dialog" role="dialog" aria-modal="true" aria-labelledby="feedback-title" onClick={(e) => e.stopPropagation()}>
        {state === 'sent' ? (
          <>
            <h2 id="feedback-title">Thank you</h2>
            <p className="dialog-body muted">Your message reached the StudyPiece team. It helps us make the next lesson better.</p>
            <div className="dialog-actions">
              <button className="btn btn-primary" onClick={close} autoFocus>
                Done
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={send}>
            <h2 id="feedback-title">Send feedback</h2>
            <p className="muted small">A bug, a confusing screen, a course you’d like: tell us anything.</p>
            <textarea
              className="input feedback-text"
              value={message}
              maxLength={FEEDBACK_MAX}
              rows={5}
              placeholder="What’s on your mind?"
              onChange={(e) => setMessage(e.target.value)}
              aria-label="Your feedback"
              autoFocus
            />
            <div className="feedback-meta">
              {course ? (
                <label className="feedback-check">
                  <input type="checkbox" checked={aboutCourse} onChange={(e) => setAboutCourse(e.target.checked)} />
                  <span>About {course}</span>
                </label>
              ) : (
                <span />
              )}
              <span className="muted small">
                {message.length}/{FEEDBACK_MAX}
              </span>
            </div>
            {state === 'error' && (
              <p className="feedback-error small" role="alert">
                {error}
              </p>
            )}
            <div className="dialog-actions">
              <button type="button" className="btn btn-ghost" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={!text || state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}
