// Course banner artwork as plain SVG markup, shared by the app (CourseBanner.jsx) and the
// build step that draws link-preview images (scripts/linkPreviews.js), so a shared link
// shows the same banner as the course page. No JSX or CSS here: it must run in Node too.
// Known courses get a motif matching their subject; any other code gets a pattern and one
// of six palettes picked from the code, so new courses get a banner automatically.

const PALETTES = {
  'MTH 209': ['#4338ca', '#7c3aed', '#fde047'],
  'MAT 222': ['#0f766e', '#14b8a6', '#fde68a'],
  'MTH 103': ['#1d4ed8', '#0ea5e9', '#fde047'],
  'MAT 142': ['#166534', '#65a30d', '#facc15'],
  'STA 121': ['#c2410c', '#f59e0b', '#fef08a'],
  'STA 221': ['#be123c', '#f43f5e', '#fde68a'],
  'COS 102': ['#0f172a', '#334155', '#34d399'],
  'COS 202': ['#7c2d12', '#c2410c', '#fde68a'],
  'GES 103': ['#92400e', '#d97706', '#22c55e'],
  'GES 201': ['#7e22ce', '#c026d3', '#fde047'],
  'GST 111': ['#0e7490', '#06b6d4', '#fde047'],
  'GST 112': ['#065f46', '#047857', '#fbbf24'],
  StudyPiece: ['#1d4ed8', '#4f46e5', '#fde047'],
};

const AUTO = [
  ['#1e40af', '#6366f1', '#fde047'],
  ['#9d174d', '#db2777', '#fde68a'],
  ['#115e59', '#0d9488', '#fde047'],
  ['#9a3412', '#ea580c', '#fef08a'],
  ['#3f6212', '#65a30d', '#fde047'],
  ['#581c87', '#9333ea', '#fde68a'],
];

function hash(text) {
  let h = 7;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return h;
}

export function bannerColors(code) {
  const [from, to, accent] = PALETTES[code] ?? AUTO[hash(code) % AUTO.length];
  return { from, to, accent };
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Drawing helpers. Every style is an attribute, so the markup renders the same in a browser and in resvg.
function kit(c, { labels }) {
  const W = '#ffffff';
  return {
    line: (x1, y1, x2, y2, st) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${st}/>`,
    poly: (pts, st) => `<polyline points="${pts}" ${st}/>`,
    circle: (cx, cy, r, st) => `<circle cx="${cx}" cy="${cy}" r="${r}" ${st}/>`,
    rect: (x, y, w, h, st, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${st}/>`,
    path: (d, st) => `<path d="${d}" ${st}/>`,
    text: (x, y, t, st) => (labels ? `<text x="${x}" y="${y}" ${st}>${esc(t)}</text>` : ''),
    axis: `stroke="${W}" stroke-opacity="0.45" stroke-width="2"`,
    grid: `stroke="${W}" stroke-opacity="0.12" stroke-width="1"`,
    curve: `fill="none" stroke="${W}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"`,
    accent: `fill="none" stroke="${c.accent}" stroke-width="3" stroke-linecap="round"`,
    dash: `stroke="${W}" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 4"`,
    dot: `fill="${W}"`,
    star: `fill="${c.accent}"`,
    hole: `fill="${c.to}" stroke="${W}" stroke-width="3"`,
    band: `fill="${W}" fill-opacity="0.13"`,
    ring: `fill="none" stroke="${W}" stroke-opacity="0.55" stroke-width="2.5"`,
    bar: `fill="${W}" fill-opacity="0.28"`,
    coin: `fill="${c.accent}" stroke="#000" stroke-opacity="0.15" stroke-width="1"`,
    solid: `fill="${W}" fill-opacity="0.85"`,
    panel: `fill="#000" fill-opacity="0.22" stroke="${W}" stroke-opacity="0.25" stroke-width="1.5"`,
    page: `fill="${W}" fill-opacity="0.9"`,
    ink: `stroke="#000" stroke-opacity="0.18" stroke-width="2.5" stroke-linecap="round"`,
    label: `fill="${W}" fill-opacity="0.9" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="15" font-weight="600"`,
    labelDark: `fill="#0f172a" fill-opacity="0.75" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="15" font-weight="600"`,
    code: `fill="#a7f3d0" font-family="Consolas, ui-monospace, monospace" font-size="15"`,
    big: `fill="${W}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="34" font-weight="800"`,
  };
}

// Map a maths function onto the motif box (x 360..620, y 24..136 by default).
function plot(fn, x0, x1, { left = 360, right = 620, top = 24, bottom = 136, y0, y1 }) {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const x = x0 + ((x1 - x0) * i) / 60;
    const px = left + ((x - x0) / (x1 - x0)) * (right - left);
    const py = bottom - ((fn(x) - y0) / (y1 - y0)) * (bottom - top);
    pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
  }
  return pts.join(' ');
}

const MOTIFS = {
  // Numerical methods: f(x) = x³ − 2x − 2 with Newton tangent steps sliding into the root.
  'MTH 209': (k) => {
    const box = { y0: -6, y1: 14 };
    const f = (x) => x ** 3 - 2 * x - 2;
    const sx = (x) => 360 + ((x - 0.6) / 2.2) * 260;
    const sy = (y) => 136 - ((y - box.y0) / (box.y1 - box.y0)) * 112;
    const steps = [2.6];
    for (let i = 0; i < 3; i++) steps.push(steps[i] - f(steps[i]) / (3 * steps[i] ** 2 - 2));
    let s = k.line(360, sy(0), 620, sy(0), k.axis) + k.poly(plot(f, 0.6, 2.8, box), k.curve);
    for (let i = 0; i < 3; i++) {
      const x = steps[i];
      s += k.line(sx(x), sy(0), sx(x), sy(f(x)), k.dash);
      s += k.line(sx(x), sy(f(x)), sx(steps[i + 1]), sy(0), k.accent);
      s += k.circle(sx(x), sy(f(x)), 4, k.dot);
    }
    return s + k.circle(sx(steps[3]), sy(0), 6, k.star) + k.text(378, 40, 'xₙ₊₁ = xₙ − f/f′', k.label);
  },

  // Limits: a curve with a hole at x = a, the ε band around L and the δ band around a.
  'MAT 222': (k) => {
    // Real analysis end to end: Riemann rectangles under a curve (integration), a tangent
    // (differentiation) and a hollow point with its ε band (limits and continuity).
    const f = (x) => 2 + 0.9 * x + 0.35 * Math.sin(2 * x);
    const sx = (x) => 360 + (x / 8) * 260;
    const sy = (y) => 136 - (y / 10) * 112;
    let s = '';
    for (let i = 0; i < 6; i++) {
      const x0 = 0.4 + i * 0.6;
      const h = f(x0 + 0.3);
      s += k.rect(sx(x0), sy(h), sx(x0 + 0.6) - sx(x0) - 2, sy(0) - sy(h), k.bar, 2);
    }
    const a = 6.2;
    s += k.rect(360, sy(f(a) + 0.8), 260, sy(f(a) - 0.8) - sy(f(a) + 0.8), k.band);
    s += k.line(360, 136, 620, 136, k.axis) + k.line(360, 24, 360, 136, k.axis);
    s += k.poly(plot(f, 0, 8, { y0: 0, y1: 10 }), k.curve);
    const t = 4.6;
    const m = 0.9 + 0.7 * Math.cos(2 * t);
    s += k.line(sx(t - 1.1), sy(f(t) - 1.1 * m), sx(t + 1.1), sy(f(t) + 1.1 * m), k.accent);
    s += k.circle(sx(t), sy(f(t)), 4.5, k.star);
    s += k.circle(sx(a), sy(f(a)), 6, k.hole);
    return s + k.text(378, 42, 'lim · d/dx · ∫', k.label);
  },

  // Coordinate geometry: a grid, a line through A and B, its midpoint and a circle.
  'MTH 103': (k) => {
    let s = '';
    for (let x = 380; x <= 620; x += 30) s += k.line(x, 20, x, 140, k.grid);
    for (let y = 20; y <= 140; y += 30) s += k.line(360, y, 620, y, k.grid);
    return (
      s + k.line(380, 128, 610, 34, k.curve) + k.circle(530, 96, 34, k.ring) +
      k.circle(440, 103.5, 5, k.dot) + k.circle(560, 54.5, 5, k.dot) + k.circle(500, 79, 6, k.star) +
      k.text(420, 122, 'A', k.label) + k.text(566, 48, 'B', k.label)
    );
  },

  // Financial maths: compound growth bars, the growth curve and a stack of coins.
  'MAT 142': (k) => {
    let s = '';
    [30, 38, 47, 58, 72, 90].forEach((h, i) => { s += k.rect(380 + i * 36, 136 - h, 24, h, k.bar, 4); });
    s += k.poly(plot((x) => 1.25 ** x, 0, 6, { left: 392, right: 590, top: 28, bottom: 118, y0: 0, y1: 4 }), k.accent);
    for (let i = 0; i < 3; i++) s += `<ellipse cx="600" cy="${130 - i * 9}" rx="18" ry="6" ${k.coin}/>`;
    return s + k.text(380, 40, 'P(1 + r)ⁿ', k.label);
  },

  // Statistics: a histogram with the bell curve over it.
  'STA 121': (k) => {
    let s = '';
    [14, 30, 56, 80, 92, 78, 52, 28, 12].forEach((h, i) => { s += k.rect(372 + i * 27, 134 - h, 23, h, k.bar); });
    const bell = (x) => 96 * Math.exp(-((x - 4) ** 2) / 4.5);
    return (
      s + k.poly(plot(bell, -0.4, 8.4, { left: 372, right: 612, top: 30, bottom: 134, y0: 0, y1: 100 }), k.curve) +
      k.line(360, 134, 620, 134, k.axis) + k.text(572, 40, 'μ, σ', k.label)
    );
  },

  // Statistical inference: a scatter plot with its regression line.
  'STA 221': (k) => {
    const pts = [[384, 126], [410, 104], [436, 109], [462, 94], [486, 91], [512, 74], [538, 69], [562, 53], [590, 51], [610, 37]];
    let s = k.line(360, 136, 620, 136, k.axis) + k.line(360, 24, 360, 136, k.axis) + k.line(372, 126, 616, 38, k.accent);
    for (const [x, y] of pts) s += k.circle(x, y, 5, k.dot);
    return s + k.text(380, 40, 'ŷ = α + βx', k.label);
  },

  // Programming: a code window.
  'COS 102': (k) =>
    k.rect(380, 26, 226, 112, k.panel, 10) +
    k.circle(396, 40, 4, k.dot) + k.circle(410, 40, 4, k.star) + k.circle(424, 40, 4, k.coin) +
    k.text(396, 70, 'int main() {', k.code) + k.text(414, 92, 'print("Hi");', k.code) + k.text(396, 114, '}', k.code) +
    k.text(540, 122, '</>', k.big),

  // Object-oriented Java: a class hierarchy beside a line of code.
  'COS 202': (k) =>
    k.rect(420, 22, 120, 30, k.panel, 7) + k.text(458, 42, 'Shape', k.code) +
    k.line(480, 52, 480, 68, k.axis) + k.line(410, 68, 550, 68, k.axis) + k.line(410, 68, 410, 82, k.axis) + k.line(550, 68, 550, 82, k.axis) +
    k.rect(358, 82, 104, 30, k.panel, 7) + k.text(384, 102, 'Circle', k.code) +
    k.rect(498, 82, 104, 30, k.panel, 7) + k.text(524, 102, 'Square', k.code) +
    k.text(392, 136, 'class Circle extends Shape', k.code),

  // Government and society: a domed parliament building with a flag.
  'GES 103': (k) => {
    let s = k.path('M430 66 Q490 14 550 66Z', k.solid) + k.rect(418, 64, 144, 10, k.solid);
    for (let i = 0; i < 6; i++) s += k.rect(428 + i * 24, 78, 10, 44, k.solid);
    return s + k.rect(410, 122, 160, 12, k.solid) + k.line(490, 18, 490, 36, k.curve) + k.path('M490 18 h18 v8 h-18Z', k.star);
  },

  // English and literature: an open book with stress marks.
  'GES 201': (k) => {
    let s = k.path('M380 128 Q440 108 492 124 L492 44 Q440 28 380 48Z', k.page) + k.path('M604 128 Q544 108 492 124 L492 44 Q544 28 604 48Z', k.page);
    for (const y of [60, 74, 88, 102]) s += k.line(396, y, 476, y - 6, k.ink) + k.line(508, y - 6, 588, y, k.ink);
    return s + k.text(430, 24, 'ˈphoto · phoˈtography', k.label);
  },

  // Grammar: two speech bubbles.
  'GST 111': (k) =>
    k.path('M384 40 h120 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-84 l-20 18 v-18 h-16 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10Z', k.panel) +
    k.text(400, 78, 'Aa', k.big) +
    k.path('M520 70 h88 a10 10 0 0 1 10 10 v36 a10 10 0 0 1 -10 10 h-12 v16 l-18 -16 h-58 a10 10 0 0 1 -10 -10 v-36 a10 10 0 0 1 10 -10Z', k.solid) +
    k.text(534, 104, 'noun · verb', k.labelDark),

  // Nigerian peoples and culture: a talking drum and a crown.
  'GST 112': (k) => {
    let s = k.path('M400 42 Q430 32 460 42 L440 86 L460 130 Q430 140 400 130 L420 86Z', k.solid);
    for (let i = 0; i < 5; i++) s += k.line(406 + i * 12, 44, 406 + i * 12, 128, k.ink);
    s += k.path('M512 112 L520 70 L540 92 L556 60 L572 92 L592 70 L600 112Z', k.star) + k.rect(512, 112, 88, 12, k.star, 3);
    for (const x of [540, 556, 572]) s += k.circle(x, 104, 4, k.dot);
    return s;
  },
};

// Fallback for courses without a hand-made motif: shapes placed from the code's hash.
function pattern(k, seed) {
  let s = '';
  for (let i = 0; i < 9; i++) {
    const x = 380 + ((seed * (i + 3)) % 230);
    const y = 30 + ((seed * (i + 7)) % 100);
    const r = 8 + ((seed + i * 13) % 26);
    s += i % 3 === 0 ? k.rect(x - r, y - r, r * 2, r * 2, k.ring, 6) : k.circle(x, y, r, i % 3 === 1 ? k.ring : k.band);
  }
  return s;
}

/** The motif alone, drawn in a 640 × 160 box (it occupies x 360–620). */
export function bannerMotif(code, { labels = true } = {}) {
  const c = bannerColors(code);
  const k = kit(c, { labels });
  return MOTIFS[code] ? MOTIFS[code](k) : pattern(k, hash(code));
}

/** Background gradient, dot texture and soft glows for a box of the given size. */
export function bannerBackdrop(code, w, h, id) {
  const c = bannerColors(code);
  return `<defs>
  <linearGradient id="${id}-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c.from}"/><stop offset="1" stop-color="${c.to}"/></linearGradient>
  <pattern id="${id}-d" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.6" fill="#fff" fill-opacity="0.16"/></pattern>
</defs>
<rect width="${w}" height="${h}" fill="url(#${id}-g)"/>
<rect width="${w * 0.6}" height="${h}" fill="url(#${id}-d)"/>
<circle cx="${w * 0.19}" cy="${h * 1.06}" r="${h * 0.69}" fill="#fff" fill-opacity="0.07"/>
<circle cx="${w * 0.47}" cy="${-h * 0.12}" r="${h * 0.44}" fill="#fff" fill-opacity="0.07"/>`;
}

/** The full 640 × 160 banner used in the app. */
export function bannerSvg(code, id = `bn-${code.toLowerCase().replace(/\s+/g, '')}`) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 160" preserveAspectRatio="xMaxYMid slice" role="presentation">${bannerBackdrop(code, 640, 160, id)}${bannerMotif(code)}</svg>`;
}
