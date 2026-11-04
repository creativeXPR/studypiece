// Interactive pictures for the MTH 210 (vector analysis) tutorial. Same conventions as
// analysisWidgets.jsx: each widget gets the lesson api plus a `config` from its screen.
//
// SpaceLab ('space'): 3D axes the learner can drag to turn, with arrows, points, lines,
// shaded polygons and curves drawn from the config.
//   config: { R: axis length, floor?: draw a grid on the xy-plane, flat?: top-down xy view,
//     params?: [{ label, min, max, step, value }], views?: [label, ...],
//     draw(P, v) -> items, where P is the list of slider values and v the view index. Items:
//       { arrow: [from, to], kind, label, mid?: label at the middle }   { seg: [from, to], kind, dash }
//       { poly: [p1, p2, ...], kind }        { curve: f(t) -> [x, y, z], from, to, kind, dash }
//       { pt: p, kind, label }               { text: p, label, kind }
//     kind: 'a' | 'b' | 'c' | 'd' | 'e' | 's' (colours, 's' is soft grey).
//     read(P, v) -> text with $maths$, ok?(P, v), goal?(P, v), need?: settings to try,
//     action?: prompt shown until done, note?: text under the picture }
//
// FieldLab ('field'): a 2D vector field and/or a scalar field on a rectangle.
//   config: { x: [x0, x1], y: [y0, y1], n?: arrows per row, F?(x, y, P, v) -> [fx, fy],
//     phi?(x, y, P, v) (shaded, with contour lines), levels?: number of contour lines,
//     probe?: [x, y] (the learner taps to move it), params, views,
//     read(P, v, probe) -> text, ok, goal, need, action, note }
import { useEffect, useId, useRef, useState } from 'react';
import { Inline } from './Rich';

const W = 340;
const H = 250;

function camera(yaw, pitch, scale) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return ([x, y, z]) => {
    const u = x * cy + y * sy; // towards the viewer, before tilting
    const w = -x * sy + y * cy; // to the right
    return [W / 2 + w * scale, H / 2 + 6 - (z * cp - u * sp) * scale];
  };
}

function head(a, b, size = 9) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  if (len < 2) return null;
  const ux = dx / len;
  const uy = dy / len;
  const s = Math.min(size, len * 0.6);
  const bx = b[0] - ux * s;
  const by = b[1] - uy * s;
  return {
    tail: [b[0] - ux * s * 0.7, b[1] - uy * s * 0.7],
    pts: `${b[0].toFixed(1)},${b[1].toFixed(1)} ${(bx - uy * s * 0.5).toFixed(1)},${(by + ux * s * 0.5).toFixed(1)} ${(bx + uy * s * 0.5).toFixed(1)},${(by - ux * s * 0.5).toFixed(1)}`,
  };
}

const xy = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;

function useSettings(g, P, v, extra = '') {
  const key = `${P.join(',')}|${v}${extra}`;
  const [tried, setTried] = useState(() => new Set([key]));
  // Record each new setting while rendering (React's pattern for state derived from props).
  if (!tried.has(key)) {
    const next = new Set([...tried, key]);
    setTried(next);
    return next;
  }
  return tried;
}

function Controls({ g, P, setP, v, setV, id }) {
  return (
    <>
      {g.views && (
        <div className={`tut-seg-control${g.views.length === 3 ? ' three' : g.views.length === 4 ? ' four' : ''}`} role="tablist">
          {g.views.map((label, i) => (
            <button key={label} type="button" className={v === i ? 'on' : ''} onClick={() => setV(i)}>{label}</button>
          ))}
        </div>
      )}
      {(g.params ?? []).map((q, i) => {
        const places = String(q.step ?? 1).split('.')[1]?.length ?? 0;
        return (
          <div key={q.label}>
            <label className="tut-range-label" htmlFor={`${id}-${i}`}>
              <span><Inline text={q.label} /></span>
              <output htmlFor={`${id}-${i}`}>{P[i].toFixed(places)}</output>
            </label>
            <input id={`${id}-${i}`} className="tut-range" type="range" min={q.min} max={q.max} step={q.step ?? 1} value={P[i]}
              onChange={(e) => {
                const next = [...P];
                next[i] = Number(Number(e.target.value).toFixed(places));
                setP(next);
              }} />
          </div>
        );
      })}
      {g.note && <p className="tut-graph-note"><Inline text={g.note} /></p>}
    </>
  );
}

function useDone(api, g, tried, reached, fallback) {
  const need = g.need ?? (g.goal ? 1 : fallback);
  useEffect(() => {
    const doneNow = g.goal ? reached && tried.size >= need : tried.size >= need;
    if (doneNow) api.done();
    else api.setAction(g.action ?? 'Try a few settings', false);
  }, [tried, reached, need, api, g]);
}

// ---------- SpaceLab ----------
export function SpaceLab({ api, config: g }) {
  const id = useId();
  const [P, setP] = useState(() => (g.params ?? []).map((q) => q.value));
  const [v, setV] = useState(0);
  const [turn, setTurn] = useState({ yaw: g.yaw ?? 0.55, pitch: g.pitch ?? 0.38, moved: 0 });
  const drag = useRef(null);
  const tried = useSettings(g, P, v, turn.moved ? '|turned' : '');
  const reached = g.goal ? g.goal(P, v) : false;
  const ok = g.ok ? g.ok(P, v) : null;
  const choices = (g.params?.length ? 1 : 0) + (g.views?.length ? 1 : 0);
  useDone(api, g, tried, reached, choices ? 3 : g.flat ? 1 : 2);

  const R = g.R ?? 4;
  const proj = g.flat ? camera(-Math.PI / 2, Math.PI / 2, 108 / R) : camera(turn.yaw, turn.pitch, 96 / R);
  const items = g.draw(P, v);

  const down = (e) => {
    if (g.flat) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, yaw: turn.yaw, pitch: turn.pitch };
  };
  const move = (e) => {
    const d = drag.current;
    if (!d) return;
    const yaw = d.yaw - (e.clientX - d.x) * 0.012;
    const pitch = Math.max(-0.35, Math.min(1.5, d.pitch + (e.clientY - d.y) * 0.012));
    setTurn((t) => ({ yaw, pitch, moved: t.moved + 1 }));
  };
  const up = () => { drag.current = null; };

  const axes = [];
  const axisNames = g.flat ? ['x', 'y'] : ['x', 'y', 'z'];
  axisNames.forEach((name, i) => {
    const end = [0, 0, 0];
    end[i] = R * 1.12;
    const neg = [0, 0, 0];
    neg[i] = -R * (g.negAxes === false ? 0 : 0.8);
    const o = proj([0, 0, 0]);
    const e = proj(end);
    const h = head(o, e, 7);
    axes.push(
      <g key={name}>
        <line x1={o[0]} y1={o[1]} x2={proj(neg)[0]} y2={proj(neg)[1]} className="tut-sp-axis neg" />
        <line x1={o[0]} y1={o[1]} x2={h ? h.tail[0] : e[0]} y2={h ? h.tail[1] : e[1]} className="tut-sp-axis" />
        {h && <polygon points={h.pts} className="tut-sp-axhead" />}
        <text x={e[0] + (e[0] >= o[0] ? 5 : -12)} y={e[1] + (i === 2 ? -4 : 12)} className="tut-sp-axt">{name}</text>
      </g>,
    );
  });

  const grid = [];
  if (g.floor || g.flat) {
    const m = Math.floor(R);
    for (let k = -m; k <= m; k++) {
      if (k === 0) continue;
      const a = proj([k, -R, 0]);
      const b = proj([k, R, 0]);
      const c = proj([-R, k, 0]);
      const d = proj([R, k, 0]);
      grid.push(<line key={`gx${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className="tut-sp-grid" />);
      grid.push(<line key={`gy${k}`} x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} className="tut-sp-grid" />);
    }
  }

  const layer = (pick) => items.map((it, i) => (pick(it) ? draw(it, i) : null));
  function draw(it, i) {
    const k = `k-${it.kind ?? 'a'}`;
    if (it.poly) {
      return <polygon key={i} points={it.poly.map((p) => xy(proj(p))).join(' ')} className={`tut-sp-poly ${k}`} />;
    }
    if (it.seg) {
      const [a, b] = it.seg.map(proj);
      return <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={`tut-sp-line ${k}${it.dash ? ' dash' : ''}${it.thin ? ' thin' : ''}`} />;
    }
    if (it.curve) {
      const n = it.n ?? 160;
      const pts = [];
      for (let j = 0; j <= n; j++) pts.push(xy(proj(it.curve(it.from + ((it.to - it.from) * j) / n))));
      return <polyline key={i} points={pts.join(' ')} className={`tut-sp-line ${k}${it.dash ? ' dash' : ''}`} />;
    }
    if (it.arrow) {
      const [a, b] = it.arrow.map(proj);
      const h = head(a, b);
      return (
        <g key={i}>
          <line x1={a[0]} y1={a[1]} x2={h ? h.tail[0] : b[0]} y2={h ? h.tail[1] : b[1]} className={`tut-sp-line ${k}`} />
          {h && <polygon points={h.pts} className={`tut-sp-head ${k}`} />}
          {it.label && !it.mid && <text x={b[0] + 6} y={b[1] - 6} className={`tut-sp-lab ${k}`}>{it.label}</text>}
          {it.label && it.mid && (
            <text x={(a[0] + b[0]) / 2 + 8} y={(a[1] + b[1]) / 2 + 4} className={`tut-sp-lab ${k}`}>{it.label}</text>
          )}
        </g>
      );
    }
    if (it.pt) {
      const a = proj(it.pt);
      return (
        <g key={i}>
          <circle cx={a[0]} cy={a[1]} r={4.5} className={`tut-sp-pt ${k}`} />
          {it.label && <text x={a[0] + 7} y={a[1] - 7} className={`tut-sp-lab ${k}`}>{it.label}</text>}
        </g>
      );
    }
    if (it.text) {
      const a = proj(it.text);
      return <text key={i} x={a[0]} y={a[1]} textAnchor="middle" className={`tut-sp-lab ${k}`}>{it.label}</text>;
    }
    return null;
  }

  return (
    <div className={`tut-graph tut-sp${g.flat ? ' flat' : ''}`}>
      <div className="tut-graph-stage">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={g.aria ?? '3D picture of vectors'}
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
          {grid}
          {layer((it) => it.poly)}
          {axes}
          {layer((it) => it.seg || it.curve)}
          {layer((it) => it.arrow)}
          {layer((it) => it.pt || it.text)}
        </svg>
        {!g.flat && <p className="tut-sp-hint">Drag the picture to turn it</p>}
        {g.read && (
          <p className={`tut-graph-read${ok === null ? '' : ok ? ' ok' : ' bad'}`} aria-live="polite">
            <Inline text={g.read(P, v)} />
          </p>
        )}
      </div>
      <Controls g={g} P={P} setP={setP} v={v} setV={setV} id={id} />
    </div>
  );
}

// ---------- FieldLab ----------
function contours(F, phi, x0, x1, y0, y1, levels, nx = 36, ny = 28) {
  const vals = [];
  for (let j = 0; j <= ny; j++) {
    const row = [];
    for (let i = 0; i <= nx; i++) row.push(phi(x0 + ((x1 - x0) * i) / nx, y0 + ((y1 - y0) * j) / ny));
    vals.push(row);
  }
  const at = (i, j) => [x0 + ((x1 - x0) * i) / nx, y0 + ((y1 - y0) * j) / ny];
  const segs = [];
  for (const c of levels) {
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const corners = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]];
        const pts = [];
        for (let e = 0; e < 4; e++) {
          const [ia, ja] = corners[e];
          const [ib, jb] = corners[(e + 1) % 4];
          const va = vals[ja][ia] - c;
          const vb = vals[jb][ib] - c;
          if (!Number.isFinite(va) || !Number.isFinite(vb) || (va > 0) === (vb > 0)) continue;
          const t = va / (va - vb);
          const pa = at(ia, ja);
          const pb = at(ib, jb);
          pts.push([pa[0] + (pb[0] - pa[0]) * t, pa[1] + (pb[1] - pa[1]) * t]);
        }
        if (pts.length >= 2) segs.push([pts[0], pts[1]]);
        if (pts.length === 4) segs.push([pts[2], pts[3]]);
      }
    }
  }
  return segs.map(([a, b]) => `M${F.X(a[0]).toFixed(1)},${F.Y(a[1]).toFixed(1)}L${F.X(b[0]).toFixed(1)},${F.Y(b[1]).toFixed(1)}`).join('');
}

export function FieldLab({ api, config: g }) {
  const id = useId();
  const [P, setP] = useState(() => (g.params ?? []).map((q) => q.value));
  const [v, setV] = useState(0);
  const [probe, setProbe] = useState(g.probe ?? null);
  const tried = useSettings(g, P, v, probe ? `|${probe.map((t) => t.toFixed(1)).join(',')}` : '');
  const reached = g.goal ? g.goal(P, v, probe) : false;
  const ok = g.ok ? g.ok(P, v, probe) : null;
  useDone(api, g, tried, reached, 3);

  const [x0, x1] = g.x;
  const [y0, y1] = g.y;
  const F = { l: 14, t: 8, w: W - 28, h: H - 22 };
  F.X = (x) => F.l + ((x - x0) / (x1 - x0)) * F.w;
  F.Y = (y) => F.t + ((y1 - y) / (y1 - y0)) * F.h;
  const toMath = (sx, sy) => [x0 + ((sx - F.l) / F.w) * (x1 - x0), y1 - ((sy - F.t) / F.h) * (y1 - y0)];

  const phi = g.phi ? (x, y) => g.phi(x, y, P, v) : null;
  const vec = g.F ? (x, y) => g.F(x, y, P, v) : null;

  // Shading: a coarse grid of cells, blue for positive values and amber for negative ones.
  const cells = [];
  let path = '';
  if (phi) {
    const cx = 24;
    const cy = 18;
    const grid = [];
    let big = 0;
    for (let j = 0; j < cy; j++) {
      for (let i = 0; i < cx; i++) {
        const val = phi(x0 + ((i + 0.5) * (x1 - x0)) / cx, y0 + ((j + 0.5) * (y1 - y0)) / cy);
        grid.push([i, j, val]);
        if (Number.isFinite(val)) big = Math.max(big, Math.abs(val));
      }
    }
    for (const [i, j, val] of grid) {
      if (!Number.isFinite(val) || !big) continue;
      cells.push(
        <rect key={`${i}-${j}`} x={F.l + (i * F.w) / cx} y={F.t + F.h - ((j + 1) * F.h) / cy} width={F.w / cx + 0.4} height={F.h / cy + 0.4}
          className={val >= 0 ? 'tut-fl-heat pos' : 'tut-fl-heat neg'} style={{ opacity: 0.05 + 0.4 * (Math.abs(val) / big) }} />,
      );
    }
    const lo = Math.min(...grid.map((c) => c[2]).filter(Number.isFinite));
    const hi = Math.max(...grid.map((c) => c[2]).filter(Number.isFinite));
    const n = g.levels ?? 7;
    const levels = Array.from({ length: n }, (_, k) => lo + ((hi - lo) * (k + 1)) / (n + 1));
    path = contours(F, phi, x0, x1, y0, y1, levels);
  }

  const arrows = [];
  if (vec) {
    const n = g.n ?? 9;
    const m = Math.round((n * F.h) / F.w);
    const pts = [];
    let big = 0;
    for (let j = 0; j < m; j++) {
      for (let i = 0; i < n; i++) {
        const x = x0 + ((i + 0.5) * (x1 - x0)) / n;
        const y = y0 + ((j + 0.5) * (y1 - y0)) / m;
        const [fx, fy] = vec(x, y);
        const mag = Math.hypot(fx, fy);
        if (Number.isFinite(mag)) big = Math.max(big, mag);
        pts.push([x, y, fx, fy, mag]);
      }
    }
    const cell = Math.min(F.w / n, F.h / m) * 0.82;
    for (const [x, y, fx, fy, mag] of pts) {
      if (!Number.isFinite(mag) || mag < 1e-9 || !big) continue;
      const len = cell * (0.3 + 0.7 * Math.sqrt(mag / big));
      const ux = fx / mag;
      const uy = fy / mag;
      const a = [F.X(x) - (ux * len) / 2, F.Y(y) + (uy * len) / 2];
      const b = [F.X(x) + (ux * len) / 2, F.Y(y) - (uy * len) / 2];
      const h = head(a, b, 6);
      arrows.push(
        <g key={`${x}-${y}`}>
          <line x1={a[0]} y1={a[1]} x2={h ? h.tail[0] : b[0]} y2={h ? h.tail[1] : b[1]} className="tut-fl-arrow" />
          {h && <polygon points={h.pts} className="tut-fl-arrowhead" />}
        </g>,
      );
    }
  }

  let probeMark = null;
  if (probe) {
    const c = [F.X(probe[0]), F.Y(probe[1])];
    let arrow = null;
    if (g.probeArrow) {
      const [fx, fy] = g.probeArrow(probe[0], probe[1], P, v);
      const mag = Math.hypot(fx, fy);
      if (mag > 1e-9) {
        const len = 34;
        const b = [c[0] + (fx / mag) * len, c[1] - (fy / mag) * len];
        const h = head(c, b, 9);
        arrow = (
          <g>
            <line x1={c[0]} y1={c[1]} x2={h ? h.tail[0] : b[0]} y2={h ? h.tail[1] : b[1]} className="tut-sp-line k-d" />
            {h && <polygon points={h.pts} className="tut-sp-head k-d" />}
          </g>
        );
      }
    }
    probeMark = (
      <g className="tut-sp">
        {arrow}
        <circle cx={c[0]} cy={c[1]} r={5} className="tut-sp-pt k-d" />
      </g>
    );
  }

  const tap = (e) => {
    if (!g.probe) return;
    const box = e.currentTarget.getBoundingClientRect();
    const sx = ((e.clientX - box.left) / box.width) * W;
    const sy = ((e.clientY - box.top) / box.height) * H;
    const [mx, my] = toMath(sx, sy);
    const snap = (t) => Math.round(t * 2) / 2;
    setProbe([Math.max(x0, Math.min(x1, snap(mx))), Math.max(y0, Math.min(y1, snap(my)))]);
  };

  return (
    <div className="tut-graph tut-fl">
      <div className="tut-graph-stage">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={g.aria ?? 'Field picture'} onPointerDown={tap} style={{ cursor: g.probe ? 'crosshair' : 'default' }}>
          <rect x={F.l} y={F.t} width={F.w} height={F.h} className="tut-fl-box" />
          {cells}
          {x0 < 0 && x1 > 0 && <line x1={F.X(0)} y1={F.t} x2={F.X(0)} y2={F.t + F.h} className="tut-sp-axis neg" />}
          {y0 < 0 && y1 > 0 && <line x1={F.l} y1={F.Y(0)} x2={F.l + F.w} y2={F.Y(0)} className="tut-sp-axis neg" />}
          {path && <path d={path} className="tut-fl-level" />}
          {arrows}
          {probeMark}
        </svg>
        {g.probe && <p className="tut-sp-hint">Tap the picture to move the red point</p>}
        {g.read && (
          <p className={`tut-graph-read${ok === null ? '' : ok ? ' ok' : ' bad'}`} aria-live="polite">
            <Inline text={g.read(P, v, probe)} />
          </p>
        )}
      </div>
      <Controls g={g} P={P} setP={setP} v={v} setV={setV} id={id} />
    </div>
  );
}
