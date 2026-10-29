// The StudyPiece logo: a whole with one piece lifted out, and "SP" (artwork in logoArt.js).
import { useId } from 'react';
import { brandMarkSvg } from './logoArt';

export default function BrandMark({ large = false }) {
  // Each copy needs its own gradient ids: if two copies shared them, a copy inside a hidden
  // container (the side rail on phones) would own the gradients and the visible one would
  // render without colour.
  const id = `sp${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <span
      className={`brand-mark${large ? ' brand-mark-lg' : ''}`}
      aria-hidden="true"
      // Fixed markup from logoArt.js, no user input.
      dangerouslySetInnerHTML={{ __html: brandMarkSvg({ id }) }}
    />
  );
}
