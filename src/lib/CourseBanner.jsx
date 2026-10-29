// A decorative banner for every course and tutorial, drawn as SVG.
// Known courses get a motif that matches their subject; any other course gets a
// pattern and colour picked from its code, so new courses get a banner automatically.
// Colours live in banner.css (one class per course), never in this file.
import './banner.css';

const W = 640;
const H = 160;

// Map an x/y in maths units onto the motif box (x 360..620, y 20..140).
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

function NumericalMethods() {
  // f(x) = x^3 - 2x - 2 near its root, with Newton tangent steps sliding into it.
  const box = { y0: -6, y1: 14 };
  const f = (x) => x ** 3 - 2 * x - 2;
  const sx = (x) => 360 + ((x - 0.6) / 2.2) * 260;
  const sy = (y) => 136 - ((y - box.y0) / (box.y1 - box.y0)) * 112;
  const steps = [2.6];
  for (let i = 0; i < 3; i++) {
    const x = steps[i];
    steps.push(x - f(x) / (3 * x * x - 2));
  }
  return (
    <g>
      <line x1="360" y1={sy(0)} x2="620" y2={sy(0)} className="bn-axis" />
      <polyline points={plot(f, 0.6, 2.8, box)} className="bn-curve" />
      {steps.slice(0, -1).map((x, i) => (
        <g key={x}>
          <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(f(x))} className="bn-dash" />
          <line x1={sx(x)} y1={sy(f(x))} x2={sx(steps[i + 1])} y2={sy(0)} className="bn-accent" />
          <circle cx={sx(x)} cy={sy(f(x))} r="4" className="bn-dot" />
        </g>
      ))}
      <circle cx={sx(steps[3])} cy={sy(0)} r="6" className="bn-star" />
      <text x="378" y="40" className="bn-label">xₙ₊₁ = xₙ − f/f′</text>
    </g>
  );
}

function Limits() {
  // A curve with a hole at x = a, the ε band around L and the δ band around a.
  const box = { y0: 0, y1: 10 };
  const f = (x) => 2 + 0.9 * x + 0.35 * Math.sin(2 * x);
  const sx = (x) => 360 + (x / 8) * 260;
  const sy = (y) => 136 - (y / 10) * 112;
  const a = 4.2;
  return (
    <g>
      <rect x={sx(a - 0.8)} y="24" width={sx(a + 0.8) - sx(a - 0.8)} height="112" className="bn-band" />
      <rect x="360" y={sy(f(a) + 0.9)} width="260" height={sy(f(a) - 0.9) - sy(f(a) + 0.9)} className="bn-band" />
      <line x1="360" y1="136" x2="620" y2="136" className="bn-axis" />
      <line x1="360" y1="24" x2="360" y2="136" className="bn-axis" />
      <polyline points={plot(f, 0, 8, box)} className="bn-curve" />
      <circle cx={sx(a)} cy={sy(f(a))} r="6" className="bn-hole" />
      <text x={sx(a) - 5} y="152" className="bn-label">a</text>
      <text x="340" y={sy(f(a)) + 4} className="bn-label">L</text>
      <text x="378" y="42" className="bn-label">ε–δ</text>
    </g>
  );
}

function Geometry() {
  const grid = [];
  for (let x = 380; x <= 620; x += 30) grid.push(<line key={`v${x}`} x1={x} y1="20" x2={x} y2="140" className="bn-grid" />);
  for (let y = 20; y <= 140; y += 30) grid.push(<line key={`h${y}`} x1="360" y1={y} x2="620" y2={y} className="bn-grid" />);
  return (
    <g>
      {grid}
      <line x1="380" y1="128" x2="610" y2="34" className="bn-curve" />
      <circle cx="530" cy="96" r="34" className="bn-ring" />
      <circle cx="440" cy="103.5" r="5" className="bn-dot" />
      <circle cx="560" cy="54.5" r="5" className="bn-dot" />
      <circle cx="500" cy="79" r="6" className="bn-star" />
      <text x="420" y="122" className="bn-label">A</text>
      <text x="566" y="48" className="bn-label">B</text>
    </g>
  );
}

function Finance() {
  const bars = [30, 38, 47, 58, 72, 90];
  return (
    <g>
      {bars.map((h, i) => (
        <rect key={i} x={380 + i * 36} y={136 - h} width="24" height={h} rx="4" className="bn-bar" />
      ))}
      <polyline points={plot((x) => 1.25 ** x, 0, 6, { left: 392, right: 590, top: 28, bottom: 118, y0: 0, y1: 4 })} className="bn-accent" />
      {[0, 1, 2].map((i) => (
        <ellipse key={i} cx="600" cy={130 - i * 9} rx="18" ry="6" className="bn-coin" />
      ))}
      <text x="380" y="40" className="bn-label">P(1 + r)ⁿ</text>
    </g>
  );
}

function Statistics() {
  const heights = [14, 30, 56, 80, 92, 78, 52, 28, 12];
  const bell = (x) => 96 * Math.exp(-((x - 4) ** 2) / 4.5);
  return (
    <g>
      {heights.map((h, i) => (
        <rect key={i} x={372 + i * 27} y={134 - h} width="23" height={h} className="bn-bar" />
      ))}
      <polyline points={plot(bell, -0.4, 8.4, { left: 372, right: 612, top: 30, bottom: 134, y0: 0, y1: 100 })} className="bn-curve" />
      <line x1="360" y1="134" x2="620" y2="134" className="bn-axis" />
      <text x="572" y="40" className="bn-label">μ, σ</text>
    </g>
  );
}

function Regression() {
  const pts = [[384, 120], [410, 112], [436, 104], [462, 98], [486, 84], [512, 80], [538, 66], [562, 60], [590, 46], [610, 40]];
  const jitter = [6, -8, 5, -4, 7, -6, 3, -7, 5, -3];
  return (
    <g>
      <line x1="360" y1="136" x2="620" y2="136" className="bn-axis" />
      <line x1="360" y1="24" x2="360" y2="136" className="bn-axis" />
      <line x1="372" y1="126" x2="616" y2="38" className="bn-accent" />
      {pts.map(([x, y], i) => (
        <circle key={x} cx={x} cy={y + jitter[i]} r="5" className="bn-dot" />
      ))}
      <text x="380" y="40" className="bn-label">ŷ = α + βx</text>
    </g>
  );
}

function Code() {
  return (
    <g>
      <rect x="380" y="26" width="226" height="112" rx="10" className="bn-panel" />
      <circle cx="396" cy="40" r="4" className="bn-dot" />
      <circle cx="410" cy="40" r="4" className="bn-star" />
      <circle cx="424" cy="40" r="4" className="bn-coin" />
      <text x="396" y="70" className="bn-code">{'int main() {'}</text>
      <text x="414" y="92" className="bn-code">{'print("Hi");'}</text>
      <text x="396" y="114" className="bn-code">{'}'}</text>
      <text x="540" y="122" className="bn-big">{'</>'}</text>
    </g>
  );
}

function Government() {
  const cols = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      <path d="M430 66 Q490 14 550 66Z" className="bn-fill" />
      <rect x="418" y="64" width="144" height="10" className="bn-fill" />
      {cols.map((i) => (
        <rect key={i} x={428 + i * 24} y="78" width="10" height="44" className="bn-fill" />
      ))}
      <rect x="410" y="122" width="160" height="12" className="bn-fill" />
      <line x1="490" y1="18" x2="490" y2="36" className="bn-curve" />
      <path d="M490 18 h18 v8 h-18Z" className="bn-flag" />
    </g>
  );
}

function Literature() {
  return (
    <g>
      <path d="M380 128 Q440 108 492 124 L492 44 Q440 28 380 48Z" className="bn-page" />
      <path d="M604 128 Q544 108 492 124 L492 44 Q544 28 604 48Z" className="bn-page" />
      {[60, 74, 88, 102].map((y) => (
        <g key={y}>
          <line x1="396" y1={y} x2="476" y2={y - 6} className="bn-line" />
          <line x1="508" y1={y - 6} x2="588" y2={y} className="bn-line" />
        </g>
      ))}
      <text x="430" y="24" className="bn-label">ˈphoto · phoˈtography</text>
    </g>
  );
}

function Grammar() {
  return (
    <g>
      <path d="M384 40 h120 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-84 l-20 18 v-18 h-16 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10Z" className="bn-panel" />
      <text x="400" y="78" className="bn-big">Aa</text>
      <path d="M520 70 h88 a10 10 0 0 1 10 10 v36 a10 10 0 0 1 -10 10 h-12 v16 l-18 -16 h-58 a10 10 0 0 1 -10 -10 v-36 a10 10 0 0 1 10 -10Z" className="bn-fill" />
      <text x="534" y="104" className="bn-label bn-ink">noun · verb</text>
    </g>
  );
}

function Heritage() {
  return (
    <g>
      <path d="M400 42 Q430 32 460 42 L440 86 L460 130 Q430 140 400 130 L420 86Z" className="bn-fill" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={406 + i * 12} y1="44" x2={406 + i * 12} y2="128" className="bn-line" />
      ))}
      <path d="M512 112 L520 70 L540 92 L556 60 L572 92 L592 70 L600 112Z" className="bn-crown" />
      <rect x="512" y="112" width="88" height="12" rx="3" className="bn-crown" />
      {[540, 556, 572].map((x) => (
        <circle key={x} cx={x} cy="104" r="4" className="bn-dot" />
      ))}
    </g>
  );
}

// Fallback for courses without a hand-made motif: concentric shapes picked from the code.
function Pattern({ seed }) {
  const shapes = [];
  for (let i = 0; i < 9; i++) {
    const x = 380 + ((seed * (i + 3)) % 230);
    const y = 30 + ((seed * (i + 7)) % 100);
    const r = 8 + ((seed + i * 13) % 26);
    shapes.push(i % 3 === 0
      ? <rect key={i} x={x - r} y={y - r} width={r * 2} height={r * 2} rx="6" className="bn-ring" />
      : <circle key={i} cx={x} cy={y} r={r} className={i % 3 === 1 ? 'bn-ring' : 'bn-band'} />);
  }
  return <g>{shapes}</g>;
}

const MOTIFS = {
  'MTH 209': NumericalMethods,
  'MAT 222': Limits,
  'MTH 103': Geometry,
  'MAT 142': Finance,
  'STA 121': Statistics,
  'STA 221': Regression,
  'COS 102': Code,
  'GES 103': Government,
  'GES 201': Literature,
  'GST 111': Grammar,
  'GST 112': Heritage,
};

function hash(text) {
  let h = 7;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return h;
}

export default function CourseBanner({ code, size = 'hero', className = '' }) {
  const Motif = MOTIFS[code];
  const seed = hash(code);
  const slug = code.toLowerCase().replace(/\s+/g, '');
  const tone = Motif ? `bn-${slug}` : `bn-auto bn-auto-${seed % 6}`;
  return (
    <div className={`course-banner course-banner-${size} ${tone} ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMaxYMid slice">
        <defs>
          <pattern id={`bn-dots-${slug}`} width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.6" className="bn-speck" />
          </pattern>
        </defs>
        <rect width="380" height={H} fill={`url(#bn-dots-${slug})`} />
        <circle cx="120" cy="170" r="110" className="bn-glow" />
        <circle cx="300" cy="-20" r="70" className="bn-glow" />
        {Motif ? <Motif /> : <Pattern seed={seed} />}
      </svg>
    </div>
  );
}
