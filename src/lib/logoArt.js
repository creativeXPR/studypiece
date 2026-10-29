// The StudyPiece mark: a whole circle (all of the course) with one slice lifted out (the
// piece you study now), and "SP" on the whole. Drawn with soft gradients and a gentle shadow
// under the lifted piece, like modern app icons, rather than flat fills. Plain SVG markup so
// the app, the favicon, the app icons and the link-preview cards all draw the same shape.

// 64 × 64 box. The whole is a circle of radius 25 centred at (29, 35) with its top-right
// quarter cut away; that quarter, nudged up and right, is the piece.
const WHOLE = 'M29 35 L29 10 A25 25 0 1 0 54 35 Z';
const PIECE = 'M33.5 30.5 L33.5 5.5 A25 25 0 0 1 58.5 30.5 Z';

const BLUE = { light: '#5b9bff', mid: '#2f6df0', dark: '#1a47c9' };
const AMBER = { light: '#ffd75e', mid: '#fbbc22', dark: '#f08c00' };

/**
 * The mark alone. `id` keeps gradient ids unique if the markup is pasted into a bigger SVG.
 * `onLight: false` swaps to a white whole for use on a coloured background (icons, cards).
 */
export function brandMarkSvg({ id = 'sp', onLight = true, textColor, size } = {}) {
  const whole = onLight ? BLUE : { light: '#ffffff', mid: '#f3f6ff', dark: '#d9e3ff' };
  const text = textColor ?? (onLight ? '#ffffff' : BLUE.mid);
  const dims = size ? `width="${size}" height="${size}" ` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" ${dims}viewBox="0 0 64 64" role="presentation">
  <defs>
    <linearGradient id="${id}-w" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
      <stop offset="0" stop-color="${whole.light}"/><stop offset="0.55" stop-color="${whole.mid}"/><stop offset="1" stop-color="${whole.dark}"/>
    </linearGradient>
    <linearGradient id="${id}-p" x1="0.1" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="${AMBER.light}"/><stop offset="0.6" stop-color="${AMBER.mid}"/><stop offset="1" stop-color="${AMBER.dark}"/>
    </linearGradient>
    <linearGradient id="${id}-h" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="${id}-s" x="-30%" y="-30%" width="160%" height="170%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.6"/>
      <feOffset dx="0" dy="1.8" result="b"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <g filter="url(#${id}-s)">
    <path d="${WHOLE}" fill="url(#${id}-w)"/>
    <path d="M29 10 A25 25 0 0 0 4.6 30 L29 30 Z" fill="url(#${id}-h)"/>
  </g>
  <g filter="url(#${id}-s)">
    <path d="${PIECE}" fill="url(#${id}-p)"/>
    <path d="M33.5 5.5 A25 25 0 0 1 52 13.5 L33.5 18 Z" fill="#ffffff" fill-opacity="0.28"/>
  </g>
  <text x="27" y="50.6" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="18.5" font-weight="800" letter-spacing="-0.5" fill="#000000" fill-opacity="0.18">SP</text>
  <text x="27" y="49.5" text-anchor="middle" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="18.5" font-weight="800" letter-spacing="-0.5" fill="${text}">SP</text>
</svg>`;
}

/**
 * The blue mark in a square app icon. `background: null` leaves it transparent; platforms that
 * can't show transparency (iOS home screen, maskable icons) get a solid colour instead.
 */
export function brandIconSvg({ size = 512, padding = 0.06, background = null } = {}) {
  const inner = size * (1 - padding * 2);
  const offset = size * padding;
  const mark = brandMarkSvg({ id: 'ic' }).replace(/^<svg[^>]*>|<\/svg>$/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${background ? `<rect width="${size}" height="${size}" fill="${background}"/>` : ''}
  <g transform="translate(${offset} ${offset}) scale(${inner / 64})">${mark}</g>
</svg>`;
}
