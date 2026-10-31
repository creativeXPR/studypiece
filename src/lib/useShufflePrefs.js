import { useState } from 'react';
import { sync, useSyncRevision } from './sync';

const KEY = 'shuffle';
const DEFAULTS = { shuffle: true, shuffleOptions: true };

// Remembers the student's randomisation choices between tests.
export default function useShufflePrefs() {
  const [, rerender] = useState(0);
  useSyncRevision();
  const prefs = { ...DEFAULTS, ...sync.get('prefs', KEY) };
  const update = (patch) => {
    sync.set('prefs', KEY, { ...prefs, ...patch });
    rerender((n) => n + 1);
  };
  return [prefs, update];
}
