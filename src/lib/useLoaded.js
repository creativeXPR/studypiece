import { useEffect, useState } from 'react';

// Waits for something downloaded on demand: `get(key)` returns it once it's there, `load(key)`
// fetches it. Returns { data, error, retry }; data is undefined until the download finishes.
export default function useLoaded(key, get, load) {
  const [attempt, setAttempt] = useState(0);
  const [failure, setFailure] = useState(null);
  const data = key ? get(key) : undefined;

  useEffect(() => {
    if (!key || get(key)) return undefined;
    let live = true;
    load(key).then(
      () => live && setFailure({ key, attempt, error: null }),
      (error) => live && setFailure({ key, attempt, error }),
    );
    return () => {
      live = false;
    };
  }, [key, attempt, get, load]);

  const error = failure && failure.key === key && failure.attempt === attempt ? failure.error : null;
  return { data, error, retry: () => setAttempt((n) => n + 1) };
}
