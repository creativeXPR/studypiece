// Beginner screens: `trace` steps through a program line by line, showing what is in memory
// and on the screen; `flow` is a flowchart whose path lights up as the input changes.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Inline, Rich } from '../Rich';
import { CodeBlock } from './highlight';
import './java.css';
import './trace.css';

function Head({ s }) {
  return (
    <>
      {s.eyebrow && <p className="tut-eyebrow">{s.eyebrow}</p>}
      <h2 className="tut-title" tabIndex={-1}><Inline text={s.title} /></h2>
      <Rich text={s.body} />
    </>
  );
}

// A frame is { line, note, set: { name: value }, drop: ['name'], print: 'one line of output' }.
// These add up as the steps go on, so each frame states only what changed.
export function TraceScreen({ s, api }) {
  const [at, setAt] = useState(0);
  const panels = useRef(null);
  const frame = s.frames[at];
  const last = at === s.frames.length - 1;

  const { vars, out } = useMemo(() => {
    const vars = {};
    const out = [];
    s.frames.slice(0, at + 1).forEach((f) => {
      Object.assign(vars, f.set);
      f.drop?.forEach((n) => delete vars[n]);
      if (f.print !== undefined) out.push(f.print);
    });
    return { vars, out };
  }, [s.frames, at]);

  // The lesson's main button does the stepping, so it stays in reach on a phone.
  useEffect(() => {
    if (last) api.done(s.cta);
    else api.setAction('Next step', true, () => setAt((n) => n + 1));
  }, [last, api, s.cta]);

  useEffect(() => {
    if (at > 0) panels.current?.scrollIntoView({ block: 'nearest' });
  }, [at]);

  const names = Object.keys(vars);

  return (
    <>
      <Head s={s} />
      <div className="jt-trace">
        <CodeBlock code={s.code} marks={{ [frame.line]: 'hl' }} />
        <p className="jt-note" aria-live="polite"><Inline text={frame.note} /></p>
        <div className="jt-steps">
          <span className="jt-count">Step {at + 1} of {s.frames.length}</span>
          <button type="button" className="jv-link" disabled={at === 0} onClick={() => setAt(at - 1)}>Step back</button>
        </div>
        <div className="jt-panels" ref={panels}>
          <section className="jt-panel" aria-label="Memory">
            <h3>Memory</h3>
            {names.length === 0 && <p className="jt-empty">Nothing stored yet</p>}
            <div className="jt-vars">
              {names.map((n) => (
                <div key={`${n}-${vars[n]}`} className={`jt-var${frame.set && n in frame.set ? ' fresh' : ''}`}>
                  <span className="jt-val">{String(vars[n])}</span>
                  <span className="jt-name">{n}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="jt-panel jt-screen" aria-label="Screen">
            <h3>Screen</h3>
            <pre>{out.join('\n')}</pre>
          </section>
        </div>
      </div>
    </>
  );
}

function Arrow({ pts, on, head = true }) {
  const [x, y] = pts[pts.length - 1];
  return (
    <g className={`jf-arrow${on ? ' on' : ''}`}>
      <polyline points={pts.map((p) => p.join(',')).join(' ')} />
      {head && <polygon points={`${x - 4},${y - 6} ${x + 4},${y - 6} ${x},${y}`} />}
    </g>
  );
}

// The pass mark example, using all four standard shapes.
export function FlowScreen({ s, api }) {
  const [score, setScore] = useState(55);
  const [seen, setSeen] = useState({ pass: true, fail: false });
  const pass = score >= 40;

  useEffect(() => {
    if (seen.pass && seen.fail) api.done(s.cta);
    else api.setAction('Drag the score below 40', false);
  }, [seen, api, s.cta]);

  const pick = (v) => {
    setScore(v);
    setSeen((old) => ({ pass: old.pass || v >= 40, fail: old.fail || v < 40 }));
  };

  return (
    <>
      <Head s={s} />
      <div className="jt-flow">
        <svg viewBox="0 0 340 336" role="img" aria-label={`Flowchart. The score ${score} takes the ${pass ? 'yes' : 'no'} path and prints ${pass ? 'PASS' : 'FAIL'}.`}>
          <Arrow on pts={[[170, 36], [170, 56]]} />
          <Arrow on pts={[[170, 84], [170, 102]]} />
          <Arrow on={pass} pts={[[92, 136], [65, 136], [65, 182]]} />
          <Arrow on={!pass} pts={[[248, 136], [275, 136], [275, 182]]} />
          <Arrow on={pass} head={false} pts={[[65, 214], [65, 240], [170, 240]]} />
          <Arrow on={!pass} head={false} pts={[[275, 214], [275, 240], [170, 240]]} />
          <Arrow on pts={[[170, 240], [170, 252]]} />
          <Arrow on pts={[[170, 280], [170, 300]]} />

          <g className="jf-node on">
            <rect x="125" y="8" width="90" height="28" rx="14" />
            <text x="170" y="26">START</text>
          </g>
          <g className="jf-node on">
            <polygon points="108,84 122,56 232,56 218,84" />
            <text x="170" y="74">INPUT score</text>
          </g>
          <g className="jf-node on">
            <polygon points="170,102 248,136 170,170 92,136" />
            <text x="170" y="140">score &gt;= 40 ?</text>
          </g>
          <text x="78" y="128" className="jf-tag">Yes</text>
          <text x="262" y="128" className="jf-tag">No</text>
          <g className={`jf-node${pass ? ' on' : ''}`}>
            <rect x="8" y="182" width="114" height="32" rx="3" />
            <text x="65" y="202">result = "PASS"</text>
          </g>
          <g className={`jf-node${pass ? '' : ' on'}`}>
            <rect x="218" y="182" width="114" height="32" rx="3" />
            <text x="275" y="202">result = "FAIL"</text>
          </g>
          <g className="jf-node on">
            <polygon points="98,280 112,252 242,252 228,280" />
            <text x="170" y="270">PRINT {pass ? 'PASS' : 'FAIL'}</text>
          </g>
          <g className="jf-node on">
            <rect x="125" y="300" width="90" height="28" rx="14" />
            <text x="170" y="318">END</text>
          </g>
        </svg>
        <label className="jt-slider">
          <span>score = <strong>{score}</strong></span>
          <input type="range" min="0" max="100" value={score} onChange={(e) => pick(Number(e.target.value))} />
        </label>
        <ul className="jf-legend">
          <li><b className="oval" /> Oval: start or end</li>
          <li><b className="para" /> Parallelogram: input or output</li>
          <li><b className="rect" /> Rectangle: a process</li>
          <li><b className="dia" /> Diamond: a yes/no decision</li>
        </ul>
      </div>
    </>
  );
}
