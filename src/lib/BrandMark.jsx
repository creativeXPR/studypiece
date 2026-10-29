// The StudyPiece logo: a whole with one piece lifted out, and "SP" (artwork in logoArt.js).
import { brandMarkSvg } from './logoArt';

const svg = brandMarkSvg({ id: 'sp-logo' });

export default function BrandMark({ large = false }) {
  return (
    <span
      className={`brand-mark${large ? ' brand-mark-lg' : ''}`}
      aria-hidden="true"
      // Fixed markup from logoArt.js, no user input.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
