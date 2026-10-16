import { useEffect, useRef, useState } from 'react';
import { ClockIcon } from '../../lib/icons';
import { formatDuration } from '../../lib/scoring';

// Counts down to a fixed timestamp, so reloading the page never resets the clock.
export default function Timer({ endsAt, onExpire }) {
  const [now, setNow] = useState(() => Date.now());
  const expired = useRef(false);
  const remaining = Math.max(0, (endsAt - now) / 1000);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining <= 0 && !expired.current) {
      expired.current = true;
      onExpire();
    }
  }, [remaining, onExpire]);

  const tone = remaining <= 60 ? 'danger' : remaining <= 300 ? 'warning' : '';

  return (
    <div className={`timer ${tone}`} role="timer" aria-label="Time remaining">
      <ClockIcon size={16} />
      {formatDuration(remaining)}
    </div>
  );
}
