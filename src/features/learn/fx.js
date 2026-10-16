// Little moments of delight: particle bursts, end-of-lesson confetti, haptic taps.
// All skip themselves when the user prefers reduced motion.

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function palette() {
  const css = getComputedStyle(document.documentElement);
  return ['--primary', '--good', '--tut-yellow', '--tut-c2', '--tut-c3']
    .map((v) => css.getPropertyValue(v).trim())
    .filter(Boolean);
}

function particles(x, y, count, spread, life) {
  if (reduced()) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'tut-confetti';
  document.body.append(canvas);
  const dpr = window.devicePixelRatio || 1;
  const W = (canvas.width = window.innerWidth * dpr);
  const H = (canvas.height = window.innerHeight * dpr);
  const g = canvas.getContext('2d');
  const colors = palette();
  const bits = Array.from({ length: count }, () => {
    const a = Math.random() * Math.PI * 2;
    const v = (2 + Math.random() * spread) * dpr;
    return {
      x: x * dpr,
      y: y * dpr,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - spread * 0.6 * dpr,
      s: (4 + Math.random() * 5) * dpr,
      r: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.4,
      c: colors[Math.floor(Math.random() * colors.length)] || '#2563eb',
      round: Math.random() < 0.4,
    };
  });
  const t0 = performance.now();
  const frame = (t) => {
    const k = (t - t0) / life;
    g.clearRect(0, 0, W, H);
    for (const p of bits) {
      p.vy += 0.38 * dpr;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      g.save();
      g.globalAlpha = Math.max(0, 1 - k * k);
      g.translate(p.x, p.y);
      g.rotate(p.r);
      g.fillStyle = p.c;
      if (p.round) {
        g.beginPath();
        g.arc(0, 0, p.s / 2.4, 0, 7);
        g.fill();
      } else g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      g.restore();
    }
    if (k < 1) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}

export function burstAt(el, count = 18) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  particles(r.left + r.width / 2, r.top + r.height / 2, count, 7, 900);
}

export function confetti() {
  particles(window.innerWidth / 2, window.innerHeight * 0.4, 150, 15, 1900);
}

export function buzz(pattern) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // Vibration isn't available everywhere; it's only a nicety.
  }
}
