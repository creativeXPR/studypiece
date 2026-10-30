import { deleteField, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// The admin's "For you" dates, in one Firestore document every signed-in student reads.
// Only admins can write it (see firestore.rules).
const ref = doc(db, 'config', 'forYou');

/** Calls back with { courseCode: 'YYYY-MM-DD' }, now and on every change. Returns an unsubscribe. */
export function watchForYou(onChange) {
  // If it can't be read, the automatic rule for new courses still applies.
  return onSnapshot(
    ref,
    (snap) => onChange(snap.data()?.courses ?? {}),
    () => onChange({}),
  );
}

export function setForYouDate(code, until) {
  return setDoc(ref, { courses: { [code]: until } }, { merge: true });
}

export function clearForYouDate(code) {
  return setDoc(ref, { courses: { [code]: deleteField() } }, { merge: true });
}
