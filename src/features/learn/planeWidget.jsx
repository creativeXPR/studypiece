// Plane: linear algebra pictures. A matrix is drawn as what it does: the whole grid of the plane
// moves, î and ĵ land on the matrix's columns, and every vector or shape rides along. Moving from
// one matrix to the next blends the matrices themselves, (1 − t)·M₀ + t·M₁, so lines stay straight
// and evenly spaced all the way, exactly as a linear map must.
//
// plane (step-by-step, the lesson's big button becomes "Next", like Scene):
//   config: { steps: [{ say, action?: { label, need? } }], draw(step, presses) -> frame, cta?, dur? }
// planeLab (drag the tips of î and ĵ):
//   config: { M?, R?, vec?: [x, y], show?: { det, eigen, vec }, presets?: [{ label, M }],
//             goal?: { text, test(M) -> bool }, snap?: 0.5 }
// frame: { M: [a, b, c, d] (î → (a, c), ĵ → (b, d)), R?: half-height in units (default 4),
//          grid?: false to hide, ghost?: false to hide the faint original grid, note?: text,
//          items: [...] }
// items (input coordinates, carried by M unless fixed: true; keyed by id so they can animate):
//   { id, vec: [x, y], from?, kind, label }   arrow         { id, span: [x, y], kind }  line through 0
//   { id, poly: [[x, y], …], kind }           filled shape  { id, path: [[x, y], …], kind, closed }
//   { id, pt: [x, y], kind, label }           dot           { id, text: [x, y], label, kind }
//   { id, seg: [[x, y], [x, y]], kind, dash? } plain segment (dashed unless dash: false)
// kind is a colour: a blue | b green (î) | c amber | d red (ĵ) | e purple | s grey. o: opacity.
import { useEffect, useRef, useState } from 'react';
import { Inline } from './Rich';

const CX = 170;
const CY = 140;
const ID = [1, 0, 0, 1];
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const apply = (M, [x, y]) => [M[0] * x + M[1] * y, M[2] * x + M[3] * y];
const fmt = (v) => {
  const r = Math.round(v * 100) / 100;
  return Object.is(r, -0) ? '0' : String(r);
};

// Every item becomes { id, type, pts, kind, o, ... } so two frames can be blended point by point.
function norm(frame) {
  const items = (frame.items ?? []).map((it) => {
    const base = { ...it, o: it.o ?? 1 };
    if (it.vec) return { ...base, type: 'vec', pts: [it.from ?? [0, 0], it.vec] };
    if (it.span) return { ...base, type: 'span', pts: [it.span] };
    if (it.poly) return { ...base, type: 'poly', pts: it.poly };
    if (it.path) return { ...base, type: 'path', pts: it.path };
    if (it.pt) return { ...base, type: 'pt', pts: [it.pt] };
    if (it.seg) return { ...base, type: 'seg', pts: it.seg };
    return { ...base, type: 'text', pts: [it.text] };
  });
  return { M: frame.M ?? ID, R: frame.R ?? 4, grid: frame.grid ?? true, ghost: frame.ghost ?? true, note: frame.note, items };
}

function blend(a, b, t) {
  const M = b.M.map((v, i) => lerp(a.M[i], v, t));
  const items = b.items.map((it) => {
    const was = a.items.find((x) => x.id === it.id && x.type === it.type);
    if (!was || was.pts.length !== it.pts.length) return { ...it, o: it.o * t };
    return { ...it, o: lerp(was.o, it.o, t), pts: it.pts.map((p, i) => [lerp(was.pts[i][0], p[0], t), lerp(was.pts[i][1], p[1], t)]) };
  });
  if (t < 1) a.items.forEach((x) => { if (!b.items.some((y) => y.id === x.id)) items.push({ ...x, o: x.o * (1 - t) }); });
  return { ...b, M, R: lerp(a.R, b.R, t), items };
}

// Animate from whatever is on screen to `target` whenever the target changes.
function useTween(target, dur) {
  const [shown, setShown] = useState(target);
  const cur = useRef(target);
  const key = JSON.stringify(target);
  useEffect(() => {
    const to = JSON.parse(key);
    const from = cur.current;
    const still = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const ms = still ? 0 : dur;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const t = ms ? Math.min(1, (now - t0) / ms) : 1;
      const f = blend(from, to, ease(t));
      cur.current = f;
      setShown(f);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [key, dur]);
  return shown;
}

function Arrow({ a, b, kind, o, label, width = 2.6 }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return <circle cx={b[0]} cy={b[1]} r={3} className={`pl-dot k-${kind}`} style={{ opacity: o }} />;
  const ux = dx / len;
  const uy = dy / len;
  const h = Math.min(9, len * 0.45);
  const tip = `${b[0]},${b[1]} ${b[0] - ux * h - uy * h * 0.5},${b[1] - uy * h + ux * h * 0.5} ${b[0] - ux * h + uy * h * 0.5},${b[1] - uy * h - ux * h * 0.5}`;
  return (
    <g className={`k-${kind}`} style={{ opacity: o }}>
      <line x1={a[0]} y1={a[1]} x2={b[0] - ux * h * 0.8} y2={b[1] - uy * h * 0.8} className="pl-vec" style={{ strokeWidth: width }} />
      <polygon points={tip} className="pl-head" />
      {label && <text x={b[0] + ux * 10 + (Math.abs(uy) > 0.7 ? 9 : 0)} y={b[1] + uy * 10 + 4} className="pl-label" textAnchor="middle">{label}</text>}
    </g>
  );
}

function PlaneSvg({ f, handles, svgRef, onDown }) {
  const u = 132 / f.R;
  const S = ([x, y]) => [CX + x * u, CY - y * u];
  const G = Math.ceil(f.R * 3);
  const gridLines = (M, cls) => {
    const out = [];
    for (let k = -G; k <= G; k++) {
      const p = [S(apply(M, [k, -G])), S(apply(M, [k, G])), S(apply(M, [-G, k])), S(apply(M, [G, k]))];
      out.push(<line key={`v${k}`} x1={p[0][0]} y1={p[0][1]} x2={p[1][0]} y2={p[1][1]} className={`${cls}${k === 0 ? ' axis' : ''}`} />);
      out.push(<line key={`h${k}`} x1={p[2][0]} y1={p[2][1]} x2={p[3][0]} y2={p[3][1]} className={`${cls}${k === 0 ? ' axis' : ''}`} />);
    }
    return out;
  };
  const place = (it, p) => S(it.fixed ? p : apply(f.M, p));
  return (
    <svg ref={svgRef} viewBox="0 0 340 280" role="img" aria-label="The plane and a linear transformation" onPointerDown={onDown} style={handles ? { touchAction: 'none' } : undefined}>
      <defs><clipPath id="pl-clip"><rect x="0" y="0" width="340" height="280" rx="12" /></clipPath></defs>
      <g clipPath="url(#pl-clip)">
        <rect x="0" y="0" width="340" height="280" className="pl-bg" />
        {f.ghost && <g>{gridLines(ID, 'pl-ghost')}</g>}
        {f.grid && <g>{gridLines(f.M, 'pl-grid')}</g>}
        {f.items.filter((it) => it.type === 'poly').map((it) => (
          <polygon key={it.id} points={it.pts.map((p) => place(it, p).join(',')).join(' ')} className={`pl-poly k-${it.kind ?? 'c'}`} style={{ opacity: it.o }} />
        ))}
        {f.items.filter((it) => it.type === 'span').map((it) => {
          const d = it.fixed ? it.pts[0] : apply(f.M, it.pts[0]);
          const n = Math.hypot(d[0], d[1]);
          if (n < 1e-6) return <circle key={it.id} cx={CX} cy={CY} r={4} className={`pl-dot k-${it.kind ?? 'e'}`} style={{ opacity: it.o }} />;
          const L = (f.R * 4) / n;
          const a = S([-d[0] * L, -d[1] * L]);
          const b = S([d[0] * L, d[1] * L]);
          return <line key={it.id} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={`pl-span k-${it.kind ?? 'e'}`} style={{ opacity: it.o }} />;
        })}
        {f.items.filter((it) => it.type === 'seg').map((it) => {
          const a = place(it, it.pts[0]);
          const b = place(it, it.pts[1]);
          return <line key={it.id} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={`pl-seg k-${it.kind ?? 's'}${it.dash === false ? '' : ' dash'}`} style={{ opacity: it.o }} />;
        })}
        {f.items.filter((it) => it.type === 'path').map((it) => (
          <polyline key={it.id} points={[...it.pts, ...(it.closed ? [it.pts[0]] : [])].map((p) => place(it, p).join(',')).join(' ')} className={`pl-path k-${it.kind ?? 'a'}`} style={{ opacity: it.o }} />
        ))}
        {f.items.filter((it) => it.type === 'vec').map((it) => (
          <Arrow key={it.id} a={place(it, it.pts[0])} b={place(it, it.pts[1])} kind={it.kind ?? 'a'} o={it.o} label={it.label} width={it.w} />
        ))}
        {f.items.filter((it) => it.type === 'pt').map((it) => {
          const p = place(it, it.pts[0]);
          return (
            <g key={it.id} className={`k-${it.kind ?? 'a'}`} style={{ opacity: it.o }}>
              <circle cx={p[0]} cy={p[1]} r={it.r ?? 4} className="pl-dot" />
              {it.label && <text x={p[0] + 8} y={p[1] - 8} className="pl-label">{it.label}</text>}
            </g>
          );
        })}
        {f.items.filter((it) => it.type === 'text').map((it) => {
          const p = place(it, it.pts[0]);
          return <text key={it.id} x={p[0]} y={p[1]} className={`pl-label k-${it.kind ?? 's'}`} textAnchor={it.anchor ?? 'middle'} style={{ opacity: it.o, fontSize: it.size }}>{it.label}</text>;
        })}
        {handles?.map((h) => {
          const p = S(apply(f.M, h.at));
          return <circle key={h.id} cx={p[0]} cy={p[1]} r={13} className={`pl-handle k-${h.kind}`} />;
        })}
      </g>
    </svg>
  );
}

export function Plane({ api, config: g }) {
  const [step, setStep] = useState(0);
  const [presses, setPresses] = useState(0);
  const [here, setHere] = useState(0);
  const s = g.steps[step];
  const need = s.action ? s.action.need ?? 1 : 0;
  const last = step === g.steps.length - 1;

  useEffect(() => {
    const back = step > 0 ? { label: 'Back', fn: () => { setStep((n) => n - 1); setHere(Infinity); } } : undefined;
    if (here < need) api.setAction(`Tap “${s.action.label}”`, false, undefined, back);
    else if (last) api.setAction(g.cta ?? 'Continue', true, api.next, back);
    else api.setAction('Next', true, () => { setStep((n) => n + 1); setHere(0); }, back);
  }, [step, here, need, last, api, g.cta, s.action]);

  const f = useTween(norm(g.draw(step, presses)), g.dur ?? 1100);
  return (
    <div className="tut-plane">
      <div className="tut-graph-stage">
        <PlaneSvg f={f} />
        {f.note && <p className="tut-plane-note"><Inline text={f.note} /></p>}
        <div className="tut-scene-steps" aria-hidden="true">
          {g.steps.map((_, i) => <span key={i} className={i === step ? 'on' : i < step ? 'past' : ''} />)}
        </div>
      </div>
      <p className="tut-scene-say" key={step} aria-live="polite"><Inline text={s.say} /></p>
      {s.action && (
        // Disabled once the step's presses are done, so the picture never runs ahead of the words.
        <button type="button" className="tut-scene-act" disabled={here >= need} onClick={() => { setPresses((p) => p + 1); setHere((h) => h + 1); }}>
          {s.action.label}
        </button>
      )}
    </div>
  );
}

// Real eigenvalues of a 2 × 2 matrix and a direction for each (null when there are none).
function eigen2([a, b, c, d]) {
  const tr = a + d;
  const det = a * d - b * c;
  const disc = (tr * tr) / 4 - det;
  if (disc < -1e-9) return null;
  const r = Math.sqrt(Math.max(disc, 0));
  const ls = r < 1e-9 ? [tr / 2] : [tr / 2 + r, tr / 2 - r];
  return ls.map((l) => {
    if (Math.abs(b) > 1e-9) return { l, v: [b, l - a] };
    if (Math.abs(c) > 1e-9) return { l, v: [l - d, c] };
    return { l, v: Math.abs(l - a) < 1e-9 ? [1, 0] : [0, 1] };
  });
}

export function PlaneLab({ api, config: g }) {
  const [M, setM] = useState(g.M ?? ID);
  const [moves, setMoves] = useState(0);
  const [drag, setDrag] = useState(null);
  const svg = useRef(null);
  const R = g.R ?? 4;
  const snap = g.snap ?? 0.5;
  const show = g.show ?? { det: true, eigen: true };
  const met = g.goal ? g.goal.test(M) : moves > 0;

  useEffect(() => {
    if (met) api.done();
    else api.setAction(g.goal ? 'Reach the goal to continue' : 'Drag î or ĵ', false);
  }, [met, api, g.goal]);

  const det = M[0] * M[3] - M[1] * M[2];
  const eig = eigen2(M);
  const items = [];
  if (show.det) items.push({ id: 'sq', poly: [[0, 0], [1, 0], [1, 1], [0, 1]], kind: det < 0 ? 'd' : 'c' });
  if (show.eigen && eig && Math.abs(det) + Math.abs(M[1]) + Math.abs(M[2]) + Math.abs(M[0] - M[3]) > 1e-9) {
    eig.forEach((e, i) => items.push({ id: `e${i}`, span: e.v, fixed: true, kind: 'e' }));
  }
  if (g.vec) items.push({ id: 'v', vec: g.vec, kind: 'a', label: 'Av' });
  items.push({ id: 'i', vec: [1, 0], kind: 'b', label: 'î' }, { id: 'j', vec: [0, 1], kind: 'd', label: 'ĵ' });
  const f = useTween(norm({ M, R, items }), drag ? 0 : 600);

  const toWorld = (e) => {
    const r = svg.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 340;
    const y = ((e.clientY - r.top) / r.height) * 280;
    const u = 132 / R;
    return [(x - CX) / u, (CY - y) / u];
  };
  const down = (e) => {
    const p = toWorld(e);
    const di = Math.hypot(p[0] - M[0], p[1] - M[2]);
    const dj = Math.hypot(p[0] - M[1], p[1] - M[3]);
    const pick = Math.min(di, dj) < 0.9 * (R / 4) ? (di <= dj ? 'i' : 'j') : null;
    if (!pick) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag(pick);
  };
  const move = (e) => {
    if (!drag) return;
    const [x, y] = toWorld(e).map((v) => Math.max(-R, Math.min(R, Math.round(v / snap) * snap)));
    setM((m) => (drag === 'i' ? [x, m[1], y, m[3]] : [m[0], x, m[2], y]));
  };
  const up = () => {
    if (drag) setMoves((n) => n + 1);
    setDrag(null);
  };

  const mat = `A = \\begin{pmatrix} ${fmt(M[0])} & ${fmt(M[1])} \\\\ ${fmt(M[2])} & ${fmt(M[3])} \\end{pmatrix}`;
  const eigText = !eig ? 'no real eigenvalues (every direction turns)' : eig.map((e) => `$\\lambda = ${fmt(e.l)}$`).join(', ');
  return (
    <div className="tut-plane">
      {g.goal && <p className={`tut-plane-goal${met ? ' met' : ''}`}><Inline text={`${met ? '✓ ' : ''}${g.goal.text}`} /></p>}
      <div className="tut-graph-stage" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <PlaneSvg f={f} svgRef={svg} onDown={down} handles={[{ id: 'hi', at: [1, 0], kind: 'b' }, { id: 'hj', at: [0, 1], kind: 'd' }]} />
      </div>
      <div className="tut-plane-read">
        <span><Inline text={`$${mat}$`} /></span>
        <span>
          {show.det && <><Inline text={`$\\det A = ${fmt(det)}$`} />{Math.abs(det) < 1e-9 ? ' (flat!)' : det < 0 ? ' (flipped)' : ''}</>}
          {show.eigen && <><br /><Inline text={eigText} /></>}
        </span>
      </div>
      {g.presets && (
        <div className="tut-plane-presets">
          {g.presets.map((p) => (
            <button type="button" key={p.label} className="tut-chip" onClick={() => { setM(p.M); setMoves((n) => n + 1); }}>{p.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
