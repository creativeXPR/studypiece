// Interactive graphs for the MAT 222 (real analysis) tutorial: Riemann sums, the mean
// value theorem, bisection for the intermediate value theorem and Taylor polynomials.
// Same conventions as widgets.jsx: each receives the lesson api and calls api.done().
import { useEffect, useState } from 'react';
import { Inline } from './Rich';

// A plot box: maps maths coordinates into a 340 × 200 SVG.
function frame(x0, x1, y0, y1, { l = 34, t = 10, w = 296, h = 160 } = {}) {
  const X = (x) => l + ((x - x0) / (x1 - x0)) * w;
  const Y = (y) => t + ((y1 - y) / (y1 - y0)) * h;
  const path = (f, a = x0, b = x1, n = 160) => {
    const pts = [];
    for (let k = 0; k <= n; k++) {
      const x = a + ((b - a) * k) / n;
      pts.push(`${X(x).toFixed(1)},${Y(f(x)).toFixed(1)}`);
    }
    return pts.join(' ');
  };
  return { X, Y, path, l, t, w, h };
}

function Axes({ F, xs, ys }) {
  return (
    <>
      <line x1={F.l} y1={F.t + F.h} x2={F.l + F.w} y2={F.t + F.h} className="tut-avg-axis" />
      <line x1={F.l} y1={F.t} x2={F.l} y2={F.t + F.h} className="tut-avg-axis" />
      {xs.map(([v, s]) => (
        <text key={`x${v}`} x={F.X(v)} y={F.t + F.h + 15} fontSize="10" textAnchor="middle" className="tut-t-soft">{s ?? v}</text>
      ))}
      {ys.map(([v, s]) => (
        <text key={`y${v}`} x={F.l - 6} y={F.Y(v) + 3} fontSize="10" textAnchor="end" className="tut-t-soft">{s ?? v}</text>
      ))}
    </>
  );
}

// ---------- Riemann sums: f(x) = x² on [0, 1] ----------
export function RiemannSums({ api }) {
  const [n, setN] = useState(4);
  const [mode, setMode] = useState('both');
  const [seen, setSeen] = useState({ big: false, modes: new Set(['both']) });
  const F = frame(0, 1, 0, 1);
  const f = (x) => x * x;
  const h = 1 / n;
  let L = 0;
  let U = 0;
  let S = 0;
  const bars = [];
  for (let k = 1; k <= n; k++) {
    const a = (k - 1) * h;
    const b = k * h;
    const lo = f(a);
    const hi = f(b);
    const mid = f((a + b) / 2);
    L += lo * h;
    U += hi * h;
    S += mid * h;
    bars.push({ a, b, lo, hi, mid });
  }

  useEffect(() => {
    if (seen.big && seen.modes.size >= 3) api.done();
    else api.setAction(seen.modes.size < 3 ? 'Try all three views' : 'Push n up to 20 or more', false);
  }, [seen, api]);

  const pickMode = (m) => {
    setMode(m);
    setSeen((s) => ({ ...s, modes: new Set([...s.modes, m]) }));
  };
  const pickN = (v) => {
    setN(v);
    setSeen((s) => ({ ...s, big: s.big || v >= 20 }));
  };

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 195" role="img" aria-label={`Riemann sums of x squared on [0,1] with n = ${n}: lower ${L.toFixed(4)}, upper ${U.toFixed(4)}`}>
          {bars.map((r) => (
            <g key={r.a}>
              {(mode === 'upper' || mode === 'both') && (
                <rect x={F.X(r.a)} width={F.X(r.b) - F.X(r.a)} y={F.Y(r.hi)} height={F.Y(0) - F.Y(r.hi)} className="tut-rs-up" />
              )}
              {(mode === 'lower' || mode === 'both') && (
                <rect x={F.X(r.a)} width={F.X(r.b) - F.X(r.a)} y={F.Y(r.lo)} height={F.Y(0) - F.Y(r.lo)} className="tut-rs-low" />
              )}
              {mode === 'tag' && (
                <>
                  <rect x={F.X(r.a)} width={F.X(r.b) - F.X(r.a)} y={F.Y(r.mid)} height={F.Y(0) - F.Y(r.mid)} className="tut-rs-tag" />
                  {n <= 24 && <circle cx={F.X((r.a + r.b) / 2)} cy={F.Y(r.mid)} r="2.6" className="tut-graph-dot ok" />}
                </>
              )}
            </g>
          ))}
          <polyline points={F.path(f)} className="tut-graph-curve" />
          <Axes F={F} xs={[[0], [0.5, '½'], [1]]} ys={[[0], [1]]} />
        </svg>
        <p className="tut-graph-read" aria-live="polite" key={`${n}-${mode}`}>
          {mode === 'tag' ? (
            <>Tagged sum (midpoints) <strong>{S.toFixed(4)}</strong>: always between L and U.</>
          ) : (
            <>L = <strong>{L.toFixed(4)}</strong> · U = <strong>{U.toFixed(4)}</strong> · U − L = <strong>{(U - L).toFixed(4)}</strong></>
          )}
        </p>
      </div>
      <div className="tut-seg-control three" role="tablist">
        {[['lower', 'Lower'], ['upper', 'Upper'], ['tag', 'Tagged']].map(([m, label]) => (
          <button key={m} type="button" className={mode === m ? 'on' : ''} onClick={() => pickMode(m)}>{label}</button>
        ))}
      </div>
      <label className="tut-range-label" htmlFor="rs-n">
        <span>n (equal subintervals)</span>
        <output htmlFor="rs-n">{n}</output>
      </label>
      <input id="rs-n" className="tut-range" type="range" min="1" max="50" step="1" value={n} onChange={(e) => pickN(Number(e.target.value))} />
      <p className="tut-graph-note">
        <Inline text={`Here $U - L = \\frac1n$, which goes to $0$, so $\\int_0^1 x^2\\,dx = \\lim L = \\lim U = \\frac13 \\approx 0.3333$.`} />
      </p>
    </div>
  );
}

// ---------- Mean value theorem: f(x) = x³ − 3x² + 2x + 1 on [0, 3] ----------
const mvF = (x) => x ** 3 - 3 * x * x + 2 * x + 1;
const mvD = (x) => 3 * x * x - 6 * x + 2;
const MV_A = 0;
const MV_B = 3;
const MV_SLOPE = (mvF(MV_B) - mvF(MV_A)) / (MV_B - MV_A); // = 2, met inside (0, 3) at c = 2

export function MeanValue({ api }) {
  const [c, setC] = useState(1);
  const [found, setFound] = useState(false);
  const F = frame(-0.2, 3.2, -1, 8);
  const slope = mvD(c);
  const hit = Math.abs(slope - MV_SLOPE) < 0.15 && c > 0.05 && c < 2.95;

  useEffect(() => {
    if (found) api.done();
    else api.setAction('Slide c until the tangent is parallel to the chord', false);
  }, [found, api]);

  const move = (v) => {
    setC(v);
    if (Math.abs(mvD(v) - MV_SLOPE) < 0.15 && v > 0.05 && v < 2.95) setFound(true);
  };
  const tan = (x) => mvF(c) + slope * (x - c);
  const span = 0.7;

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 195" role="img" aria-label={`f(x) = x³ − 3x² + 2x + 1 on [0, 3]; tangent slope at c = ${c.toFixed(2)} is ${slope.toFixed(2)}, chord slope is 2`}>
          <polyline points={F.path(mvF, -0.15, 3.15)} className="tut-graph-curve" />
          <line x1={F.X(MV_A)} y1={F.Y(mvF(MV_A))} x2={F.X(MV_B)} y2={F.Y(mvF(MV_B))} className="tut-graph-guide" />
          <line x1={F.X(c - span)} y1={F.Y(tan(c - span))} x2={F.X(c + span)} y2={F.Y(tan(c + span))}
            className={`tut-graph-hit ${hit ? 'ok' : 'bad'}`} />
          <circle cx={F.X(MV_A)} cy={F.Y(mvF(MV_A))} r="3.5" className="tut-graph-hole" />
          <circle cx={F.X(MV_B)} cy={F.Y(mvF(MV_B))} r="3.5" className="tut-graph-hole" />
          <circle cx={F.X(c)} cy={F.Y(mvF(c))} r="4" className={`tut-graph-dot${hit ? ' ok' : ''}`} />
          <Axes F={F} xs={[[0, 'a = 0'], [1], [2], [3, 'b = 3']]} ys={[[0], [4], [8]]} />
        </svg>
        <p className={`tut-graph-read ${hit ? 'ok' : 'bad'}`} aria-live="polite">
          {hit ? (
            <><strong>Found it.</strong> At c = 2, f′(c) = 2 = (f(b) − f(a))/(b − a).</>
          ) : (
            <>Tangent slope <strong>{slope.toFixed(2)}</strong> · chord slope <strong>{MV_SLOPE.toFixed(2)}</strong></>
          )}
        </p>
      </div>
      <label className="tut-range-label" htmlFor="mv-c">
        <span>c, a point inside (0, 3)</span>
        <output htmlFor="mv-c">{c.toFixed(2)}</output>
      </label>
      <input id="mv-c" className="tut-range" type="range" min="0.05" max="2.95" step="0.01" value={c} onChange={(e) => move(Number(e.target.value))} />
      <p className="tut-graph-note">
        <Inline text="The dashed line is the chord from $(a, f(a))$ to $(b, f(b))$. The MVT promises a point where the tangent runs parallel to it." />
      </p>
    </div>
  );
}

// ---------- Bisection behind the intermediate value theorem: f(x) = x³ − x − 1 on [1, 2] ----------
const biF = (x) => x ** 3 - x - 1;

export function Bisection({ api }) {
  const [steps, setSteps] = useState([[1, 2]]);
  const [a, b] = steps[steps.length - 1];
  const F = frame(0.9, 2.1, -1.5, 5.5);
  const m = (a + b) / 2;

  useEffect(() => {
    if (steps.length >= 7) api.done();
    else api.setAction(`Halve the interval (${steps.length - 1} of 6)`, false);
  }, [steps, api]);

  const halve = () => {
    if (steps.length >= 12) return;
    setSteps((s) => [...s, biF(m) < 0 ? [m, b] : [a, m]]);
  };

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 195" role="img" aria-label={`Bisection on x³ − x − 1: current interval [${a.toFixed(4)}, ${b.toFixed(4)}]`}>
          <rect x={F.X(a)} width={Math.max(1, F.X(b) - F.X(a))} y={F.t} height={F.h} className="tut-graph-strip" />
          <line x1={F.l} y1={F.Y(0)} x2={F.l + F.w} y2={F.Y(0)} className="tut-graph-guide" />
          <polyline points={F.path(biF)} className="tut-graph-curve" />
          <circle cx={F.X(a)} cy={F.Y(biF(a))} r="4" className="tut-graph-dot" />
          <circle cx={F.X(b)} cy={F.Y(biF(b))} r="4" className="tut-graph-dot ok" />
          <Axes F={F} xs={[[1], [1.5], [2]]} ys={[[0], [5]]} />
        </svg>
        <p className="tut-graph-read" aria-live="polite" key={steps.length}>
          <Inline text={`$[a_{${steps.length}}, b_{${steps.length}}] = [${a.toFixed(4)},\\ ${b.toFixed(4)}]$, width $${(b - a).toFixed(4)}$. $f(a) < 0 < f(b)$ every time.`} />
        </p>
      </div>
      <button type="button" className="tut-event" onClick={halve}>
        <b>Halve it</b>
        <Inline text={`Midpoint $${m.toFixed(4)}$: $f = ${biF(m).toFixed(3)}$, so keep the half where the sign still changes.`} />
      </button>
      <p className="tut-graph-note">
        <Inline text="The left ends rise, the right ends fall, and the width halves each time: both sequences close in on one point $c$ with $f(c) = 0$ (here $c \approx 1.3247$)." />
      </p>
    </div>
  );
}

// ---------- Taylor polynomials of sin x about 0 ----------
function taylorSin(x, n) {
  let s = 0;
  let term = x;
  for (let k = 1; k <= n; k += 2) {
    s += term;
    term *= (-x * x) / ((k + 1) * (k + 2));
  }
  return s;
}

export function Taylor({ api }) {
  const [n, setN] = useState(1);
  const [seen, setSeen] = useState(new Set([1]));
  const F = frame(-7, 7, -2.2, 2.2);
  const err = Math.abs(Math.sin(3) - taylorSin(3, n));

  useEffect(() => {
    if (seen.size >= 4) api.done();
    else api.setAction('Raise the degree a few times', false);
  }, [seen, api]);

  const pick = (v) => {
    setN(v);
    setSeen((s) => new Set([...s, v]));
  };
  const clamp = (y) => Math.max(-2.6, Math.min(2.6, y));

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 195" role="img" aria-label={`sin x and its Taylor polynomial of degree ${n}`}>
          <line x1={F.l} y1={F.Y(0)} x2={F.l + F.w} y2={F.Y(0)} className="tut-graph-guide" />
          <polyline points={F.path(Math.sin)} className="tut-graph-curve" />
          <polyline points={F.path((x) => clamp(taylorSin(x, n)), -7, 7, 280)} className="tut-graph-hit ok" style={{ strokeWidth: 3 }} />
          <Axes F={F} xs={[[-6], [-3], [0], [3], [6]]} ys={[[-2], [0], [2]]} />
        </svg>
        <p className="tut-graph-read" aria-live="polite" key={n}>
          <Inline text={`Degree $${n}$: at $x = 3$ the error is $${err < 1e-4 ? err.toExponential(1) : err.toFixed(4)}$, below the bound $\\frac{3^{${n + 1}}}{${n + 1}!} = ${(3 ** (n + 1) / [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000][n + 1]).toFixed(4)}$.`} />
        </p>
      </div>
      <label className="tut-range-label" htmlFor="ty-n">
        <span>degree n of Tₙ</span>
        <output htmlFor="ty-n">{n}</output>
      </label>
      <input id="ty-n" className="tut-range" type="range" min="1" max="13" step="2" value={n} onChange={(e) => pick(Number(e.target.value))} />
      <p className="tut-graph-note">
        <Inline text="Blue is $\sin x$, green is $T_n(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$. Each extra pair of terms hugs the curve over a wider stretch, because $|R_n(x)| \le \frac{|x|^{n+1}}{(n+1)!} \to 0$." />
      </p>
    </div>
  );
}

// ---------- GraphLab: a graph each lesson configures through `graph` on its screen ----------
// config: { x: [x0, x1], y: [y0, y1], xs, ys: tick lists [[value, label?]],
//   param?: { label, min, max, step, value }, views?: [label, ...],
//   curves: [{ f(x, p, v), from?, to?, kind: 'main'|'alt'|'ok'|'bad'|'guide', show?(p, v), breaks?: [x where f jumps] }],
//   segs: [{ at(p, v) -> [x1, y1, x2, y2], kind, show? }],
//   rects: [{ at(p, v) -> [[x, y, w, h], ...] (maths coords, y = top), kind: 'low'|'up'|'tag'|'band'|'strip' }],
//   dots: [{ at(p, v) -> [x, y], kind: 'dot'|'ok'|'hole', show? }],
//   read(p, v) -> text with $maths$, ok?(p, v), goal?(p, v), need?: distinct settings to try,
//   action?: prompt shown until done, note?: text under the graph }
const KIND = { main: 'tut-graph-curve', alt: 'tut-gl-alt', ok: 'tut-graph-hit ok', bad: 'tut-graph-hit bad', guide: 'tut-graph-guide' };
const RECT = { low: 'tut-rs-low', up: 'tut-rs-up', tag: 'tut-rs-tag', band: 'tut-graph-band', strip: 'tut-graph-strip' };

function pieces(F, f, a, b, y0, y1, n = 240, breaks = []) {
  // Split the polyline wherever f is undefined or jumps, so discontinuities show as gaps.
  const out = [];
  let cur = [];
  let prev = null;
  let px = a;
  const span = y1 - y0;
  for (let k = 0; k <= n; k++) {
    const x = a + ((b - a) * k) / n;
    const y = f(x);
    const bad = !Number.isFinite(y) || y > y1 + span * 2 || y < y0 - span * 2;
    const crossed = k > 0 && breaks.some((t) => px < t && t <= x);
    px = x;
    if (bad || crossed || (prev !== null && Math.abs(y - prev) > span * 0.6)) {
      if (cur.length > 1) out.push(cur.join(' '));
      cur = [];
    }
    if (!bad) cur.push(`${F.X(x).toFixed(1)},${F.Y(y).toFixed(1)}`);
    prev = bad ? null : y;
  }
  if (cur.length > 1) out.push(cur.join(' '));
  return out;
}

export function GraphLab({ api, config: g }) {
  const clipId = `gl${g.x.join('').replace(/\W/g, '')}${g.y.join('').replace(/\W/g, '')}`;
  const [p, setP] = useState(g.param?.value ?? 0);
  const [v, setV] = useState(0);
  const [tried, setTried] = useState(() => new Set([`${g.param?.value ?? 0}|0`]));
  const F = frame(g.x[0], g.x[1], g.y[0], g.y[1]);
  const need = g.need ?? (g.goal ? 1 : 3);
  const reached = g.goal ? g.goal(p, v) : false;
  const ok = g.ok ? g.ok(p, v) : null;

  useEffect(() => {
    const doneNow = g.goal ? reached && tried.size >= need : tried.size >= need;
    if (doneNow) api.done();
    else api.setAction(g.action ?? (g.param ? `Move the ${g.param.label.split(' ')[0]} slider` : 'Try each view'), false);
  }, [tried, reached, need, api, g]);

  const places = String(g.param?.step ?? 1).split('.')[1]?.length ?? 0;
  const set = (raw, nv) => {
    const np = Number(raw.toFixed(places)); // keep slider values free of float noise like 0.30000000000000004
    setP(np);
    setV(nv);
    setTried((t) => new Set([...t, `${np}|${nv}`]));
  };
  const shown = (o) => !o.show || o.show(p, v);
  const fmt = (x) => (Math.abs(x) >= 100 || Number.isInteger(x) ? String(x) : x.toFixed(String(g.param?.step ?? 0.1).split('.')[1]?.length ?? 2));

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 195" role="img" aria-label={g.aria ?? 'Interactive graph'}>
          <defs>
            <clipPath id={clipId}><rect x={F.l} y={F.t - 4} width={F.w} height={F.h + 8} /></clipPath>
          </defs>
          <g clipPath={`url(#${clipId})`}>
            {(g.rects ?? []).filter(shown).flatMap((r, i) =>
              r.at(p, v).map(([x, y, w, h], j) => (
                <rect key={`r${i}-${j}`} x={F.X(x)} y={F.Y(y)} width={Math.max(0, F.X(x + w) - F.X(x))} height={Math.max(0, F.Y(y - h) - F.Y(y))} className={RECT[r.kind ?? 'band']} />
              )),
            )}
            {g.x[0] < 0 && g.x[1] > 0 && <line x1={F.X(0)} y1={F.t} x2={F.X(0)} y2={F.t + F.h} className="tut-avg-axis" />}
            {g.y[0] < 0 && g.y[1] > 0 && <line x1={F.l} y1={F.Y(0)} x2={F.l + F.w} y2={F.Y(0)} className="tut-avg-axis" />}
            {(g.curves ?? []).filter(shown).flatMap((c, i) =>
              pieces(F, (x) => c.f(x, p, v), c.from ?? g.x[0], c.to ?? g.x[1], g.y[0], g.y[1], c.n, c.breaks).map((pts, j) => (
                <polyline key={`c${i}-${j}`} points={pts} className={KIND[c.kind ?? 'main']} />
              )),
            )}
            {(g.segs ?? []).filter(shown).map((s, i) => {
              const [x1, y1, x2, y2] = s.at(p, v);
              return <line key={`s${i}`} x1={F.X(x1)} y1={F.Y(y1)} x2={F.X(x2)} y2={F.Y(y2)} className={KIND[s.kind ?? 'guide']} />;
            })}
          </g>
          {(g.dots ?? []).filter(shown).map((d, i) => {
            const [x, y] = d.at(p, v);
            if (!Number.isFinite(y)) return null;
            return <circle key={`d${i}`} cx={F.X(x)} cy={F.Y(y)} r={d.kind === 'hole' ? 3.8 : 4} className={d.kind === 'hole' ? 'tut-graph-hole' : `tut-graph-dot${d.kind === 'ok' ? ' ok' : ''}`} />;
          })}
          <Axes F={F} xs={g.xs ?? []} ys={g.ys ?? []} />
        </svg>
        {g.read && (
          <p className={`tut-graph-read${ok === null ? '' : ok ? ' ok' : ' bad'}`} aria-live="polite" key={`${p}|${v}`}>
            <Inline text={g.read(p, v)} />
          </p>
        )}
      </div>
      {g.views && (
        <div className={`tut-seg-control${g.views.length === 3 ? ' three' : ''}`} role="tablist">
          {g.views.map((label, i) => (
            <button key={label} type="button" className={v === i ? 'on' : ''} onClick={() => set(p, i)}>{label}</button>
          ))}
        </div>
      )}
      {g.param && (
        <>
          <label className="tut-range-label" htmlFor={`${clipId}-p`}>
            <span><Inline text={g.param.label} /></span>
            <output htmlFor={`${clipId}-p`}>{fmt(p)}</output>
          </label>
          <input id={`${clipId}-p`} className="tut-range" type="range" min={g.param.min} max={g.param.max} step={g.param.step} value={p}
            onChange={(e) => set(Number(e.target.value), v)} />
        </>
      )}
      {g.note && <p className="tut-graph-note"><Inline text={g.note} /></p>}
    </div>
  );
}
