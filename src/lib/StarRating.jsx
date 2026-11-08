import { useState } from 'react';
import { useAuth } from '../app/AuthProvider';
import { StarIcon } from './icons';

// The student's own 1–5 star rating of a course. Tapping the current rating clears it.
export default function StarRating({ code }) {
  const { profile, rateCourse } = useAuth();
  const rating = profile?.ratings?.[code] ?? 0;
  const [hover, setHover] = useState(0);
  const shown = hover || rating;

  return (
    <div className="star-rating">
      <span className="muted small">{rating ? 'Your rating' : 'Rate this course'}</span>
      <div className="stars" role="radiogroup" aria-label={`Rate ${code}`} onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className={`star${n <= shown ? ' on' : ''}`}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => rateCourse(code, n === rating ? 0 : n)}
          >
            <StarIcon size={22} />
          </button>
        ))}
      </div>
    </div>
  );
}
