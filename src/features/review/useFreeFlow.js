import { useEffect, useRef, useState } from 'react';
import { speak, stopSpeaking } from '../../lib/speech';

const PAUSE_BETWEEN_QUESTIONS_MS = 700;

/**
 * Free-flow reading: speaks each part of the current item in order, then calls
 * `advance()` to move on. Stops when `advance()` returns false (last item) or
 * when something else takes over the voice (e.g. reading a selection).
 *
 * `itemKey` identifies the current question; changing it (by advancing or by
 * the student jumping elsewhere) restarts reading at the new question.
 */
export default function useFreeFlow({ itemKey, parts, rate, advance }) {
  const [playing, setPlaying] = useState(false);
  const [phase, setPhase] = useState(null);
  const latest = useRef(null);
  useEffect(() => {
    latest.current = { parts, rate, advance };
  });

  useEffect(() => {
    if (!playing) return undefined;
    let cancelled = false;
    (async () => {
      for (const part of latest.current.parts) {
        if (!part.text) continue;
        setPhase(part.phase);
        const finished = await speak(part.text, { rate: latest.current.rate });
        if (cancelled) return;
        if (!finished) {
          setPlaying(false);
          setPhase(null);
          return;
        }
      }
      setPhase(null);
      await new Promise((resolve) => setTimeout(resolve, PAUSE_BETWEEN_QUESTIONS_MS));
      if (cancelled) return;
      if (!latest.current.advance()) setPlaying(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [playing, itemKey]);

  useEffect(() => () => stopSpeaking(), []);

  return {
    playing,
    phase,
    start: () => setPlaying(true),
    stop: () => {
      setPlaying(false);
      setPhase(null);
      stopSpeaking();
    },
  };
}
