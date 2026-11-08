import { useCallback, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import ConfirmDialog from '../../lib/ConfirmDialog';
import { TrashIcon } from '../../lib/icons';
import { toDate } from '../../lib/dates';

// Newest first; one page is plenty for reading and keeps reads low.
const PAGE = 50;

const loadError = (err) =>
  err.code === 'permission-denied' ? 'This account can’t read feedback. Sign in with an admin Google account.' : `Couldn’t load feedback: ${err.message}`;

async function fetchFeedback() {
  const snap = await getDocs(query(collection(db, 'feedback'), orderBy('createdAt', 'desc'), limit(PAGE)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data(), createdAt: toDate(d.data().createdAt) }));
}

const when = (date) =>
  date ? date.toLocaleString(undefined, { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : '';

export default function FeedbackAdmin() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      setItems(await fetchFeedback());
    } catch (err) {
      setError(loadError(err));
    }
    setBusy(false);
  }, []);

  useEffect(() => {
    let ignore = false;
    fetchFeedback()
      .then((list) => !ignore && setItems(list))
      .catch((err) => !ignore && setError(loadError(err)));
    return () => {
      ignore = true;
    };
  }, []);

  const remove = async () => {
    const item = deleting;
    setDeleting(null);
    try {
      await deleteDoc(doc(db, 'feedback', item.id));
      setItems((list) => list.filter((x) => x.id !== item.id));
    } catch (err) {
      setError(`Couldn’t delete: ${err.message}`);
    }
  };

  return (
    <section className="adm-section">
      <div className="adm-section-head">
        <p className="muted small">{items ? `${items.length}${items.length === PAGE ? '+' : ''} message${items.length === 1 ? '' : 's'}, newest first` : ' '}</p>
        <button className="btn btn-ghost btn-sm" onClick={load} disabled={busy}>
          {busy ? 'Loading…' : 'Refresh'}
        </button>
      </div>
      {error && (
        <p className="adm-error small" role="alert">
          {error}
        </p>
      )}
      {!items && !error && <div className="spinner" aria-label="Loading" />}
      {items?.length === 0 && <p className="muted adm-empty">No feedback yet.</p>}
      {items?.length > 0 && (
        <ul className="adm-feedback">
          {items.map((f) => (
            <li key={f.id}>
              <p className="adm-feedback-msg">{f.message}</p>
              <div className="adm-feedback-meta muted small">
                <span>{f.name || 'Unnamed'}</span>
                {f.email && <span>{f.email}</span>}
                {f.course && <span className="adm-tag">{f.course}</span>}
                <span>{when(f.createdAt)}</span>
                <button className="icon-btn adm-delete" aria-label="Delete this message" title="Delete" onClick={() => setDeleting(f)}>
                  <TrashIcon size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ConfirmDialog
        open={!!deleting}
        title="Delete this message?"
        confirmLabel="Delete"
        danger
        onConfirm={remove}
        onCancel={() => setDeleting(null)}
      >
        <p className="muted">It is removed for good.</p>
      </ConfirmDialog>
    </section>
  );
}
