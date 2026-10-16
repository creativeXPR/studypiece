import { useState } from 'react';
import { readJSON, writeJSON } from './storage';

const KEY = 'studypiece.shuffle';
const DEFAULTS = { shuffle: true, shuffleOptions: true };

// Remembers the student's randomisation choices between tests.
export default function useShufflePrefs() {
  const [prefs, setPrefs] = useState(() => ({ ...DEFAULTS, ...readJSON(KEY, {}) }));
  const update = (patch) =>
    setPrefs((p) => {
      const next = { ...p, ...patch };
      writeJSON(KEY, next);
      return next;
    });
  return [prefs, update];
}
