import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';

// Client config is public by design; access is enforced by Firestore rules.
const firebaseConfig = {
  apiKey: 'AIzaSyA1PaZu6BZb0mTSbBLe97XPj8U06uUPkOw',
  authDomain: 'quick-cbt.firebaseapp.com',
  projectId: 'quick-cbt',
  storageBucket: 'quick-cbt.firebasestorage.app',
  messagingSenderId: '584031052691',
  appId: '1:584031052691:web:7ae42c7ed36694c6af7e66',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Local cache lets the profile load on a flaky connection.
export const db = initializeFirestore(app, { localCache: persistentLocalCache() });
