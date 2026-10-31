import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  updateProfile,
} from 'firebase/auth';
import { arrayRemove, arrayUnion, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { dayKey } from '../lib/dates';
import { readJSON, writeJSON } from '../lib/storage';
import { startSync, stopSync } from '../lib/sync';

const AuthContext = createContext(null);

const profileKey = (uid) => `studypiece.profile.${uid}`;

// Firestore can hang on a bad connection; fall back to the cached profile.
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))]);
}

async function loadProfile(user) {
  const cached = readJSON(profileKey(user.uid));
  try {
    const snap = await withTimeout(getDoc(doc(db, 'users', user.uid)), 6000);
    const data = snap.exists() ? snap.data() : {};
    const profile = {
      username: data.username || user.displayName || '',
      department: (data.department || data.courseDepartment || cached?.department || '').toLowerCase(),
      level: String(data.level || cached?.level || ''),
      favourites: Array.isArray(data.favourites) ? data.favourites : cached?.favourites ?? [],
    };
    writeJSON(profileKey(user.uid), profile);
    return profile;
  } catch (err) {
    console.warn('Using cached profile:', err.message);
    return cached ?? { username: user.displayName || '', department: '', level: '', favourites: [] };
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still resolving
  const [profile, setProfile] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (u) => {
        if (!u) {
          stopSync();
          setProfile(null);
          setUser(null);
          return;
        }
        startSync(u.uid);
        setProfile(await loadProfile(u));
        setUser(u);
        // Base fields, same shape the previous app wrote.
        setDoc(
          doc(db, 'users', u.uid),
          {
            ...(u.displayName ? { username: u.displayName } : {}),
            useremail: u.email || '',
            userphoto: u.photoURL || '',
            userid: u.uid,
            lastActive: serverTimestamp(),
            // One entry per day the user opens the app (arrayUnion keeps it unique).
            loginDays: arrayUnion(dayKey()),
            ...(u.metadata?.creationTime ? { createdAt: new Date(u.metadata.creationTime) } : {}),
          },
          { merge: true },
        ).catch((err) => console.warn('Could not update user record:', err.message));
      }),
    [],
  );

  const signIn = useCallback(() => signInWithPopup(auth, googleProvider), []);
  const signInWithEmail = useCallback(
    (email, password) => signInWithEmailAndPassword(auth, email.trim(), password),
    [],
  );
  const resetPassword = useCallback((email) => sendPasswordResetEmail(auth, email.trim()), []);

  // Email accounts have no display name, so the one typed at sign-up is saved
  // to the auth profile, Firestore and local state.
  const signUpWithEmail = useCallback(async (name, email, password) => {
    const { user: created } = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const username = name.trim();
    await updateProfile(created, { displayName: username });
    setProfile((p) => ({ ...p, username }));
    setDoc(doc(db, 'users', created.uid), { username }, { merge: true }).catch((err) =>
      console.warn('Could not save name:', err.message),
    );
  }, []);
  const signOut = useCallback(() => fbSignOut(auth), []);

  const saveProfile = useCallback(
    async ({ department, level }) => {
      const next = { ...profile, department: department.trim().toLowerCase(), level: String(level) };
      writeJSON(profileKey(user.uid), next);
      setProfile(next);
      // Local copy is already saved, so a slow network shouldn't block the student.
      await withTimeout(
        setDoc(
          doc(db, 'users', user.uid),
          { department: next.department, level: next.level, category: 'u', updatedAt: serverTimestamp() },
          { merge: true },
        ),
        6000,
      ).catch((err) => console.warn('Profile saved locally only:', err.message));
    },
    [profile, user],
  );

  // Favourite courses (by code) follow the student across devices. The screen and local
  // copy update at once; Firestore catches up, even after being offline.
  const toggleFavourite = useCallback(
    (code) => {
      const current = profile?.favourites ?? [];
      const isFavourite = current.includes(code);
      const next = { ...profile, favourites: isFavourite ? current.filter((c) => c !== code) : [...current, code] };
      writeJSON(profileKey(user.uid), next);
      setProfile(next);
      setDoc(
        doc(db, 'users', user.uid),
        { favourites: isFavourite ? arrayRemove(code) : arrayUnion(code) },
        { merge: true },
      ).catch((err) => console.warn('Favourite saved locally only:', err.message));
    },
    [profile, user],
  );

  const needsOnboarding = !!user && (!profile?.department || !profile?.level);

  return (
    <AuthContext.Provider value={{
        user,
        profile,
        needsOnboarding,
        signIn,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        signOut,
        saveProfile,
        toggleFavourite,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
