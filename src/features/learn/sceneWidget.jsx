// Scene: an animated, step-by-step picture. The lesson's big button becomes "Next"; each step
// redraws the same shapes in new places and CSS transitions move them there, so an idea is built
// up one small change at a time (dots gathering into a pile, a line sliding to a mean, …).
//
// config: {
//   steps: [{ say: text with $maths$ shown under the picture,
//             action?: { label, need?: presses before Next } }],   // a button inside the step
//   draw(step, presses) -> shapes, where `presses` counts every action press so far.
//   cta?: label for the final Continue }
// Shapes are keyed by `id`; keep returning a shape (with o: 0 to hide it) so it can animate back.
//   { id, dot: [x, y], r, kind, o, delay }          { id, vline: x, y1, y2, kind, o, dash }
//   { id, bar: [x, base], w, h, kind, o, delay }    { id, line: [x1, y1, x2, y2], kind, o, dash }
//   { id, text: [x, y], label, kind, o, size, anchor }
//   { id, curve: [[x, y], …], kind, o, dash }        { id, area: [[x, y], …], kind, o }  (fade, not move)
// Coordinates are in the 340 × 260 picture; kind is a colour: a | b | c | d | e | s.
import { useEffect, useState } from 'react';
import { Inline } from './Rich';

const T = 'transform 0.75s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.5s ease, fill 0.5s ease, stroke 0.5s ease';

function Shape({ s }) {
  const k = `k-${s.kind ?? 's'}`;
  const style = (transform) => ({ transform, opacity: s.o ?? 1, transition: T, transitionDelay: `${s.delay ?? 0}ms` });
  if (s.dot) return <circle r={s.r ?? 3} className={`sc-dot ${k}`} style={style(`translate(${s.dot[0]}px, ${s.dot[1]}px)`)} />;
  if (s.bar) return <rect x={0} y={0} width={s.w} height={1} className={`sc-bar ${k}`} style={style(`translate(${s.bar[0]}px, ${s.bar[1]}px) scaleY(${-Math.max(s.h, 0.001)})`)} />;
  if (s.vline !== undefined) {
    return (
      <g style={style(`translate(${s.vline}px, 0px)`)}>
        <line x1={0} x2={0} y1={s.y1} y2={s.y2} className={`sc-line ${k}${s.dash ? ' dash' : ''}`} />
      </g>
    );
  }
  if (s.curve) {
    return <polyline points={s.curve.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')} className={`sc-curve ${k}${s.dash ? ' dash' : ''}`} style={{ opacity: s.o ?? 1, transition: T, transitionDelay: `${s.delay ?? 0}ms` }} />;
  }
  if (s.area) {
    return <polygon points={s.area.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')} className={`sc-area ${k}`} style={{ opacity: s.o ?? 1, transition: T, transitionDelay: `${s.delay ?? 0}ms` }} />;
  }
  if (s.line) return <line x1={s.line[0]} y1={s.line[1]} x2={s.line[2]} y2={s.line[3]} className={`sc-line thin ${k}${s.dash ? ' dash' : ''}`} style={{ opacity: s.o ?? 1, transition: T }} />;
  if (s.text) {
    return (
      <text x={0} y={0} textAnchor={s.anchor ?? 'middle'} fontSize={s.size ?? 12} className={`sc-text ${k}`} style={style(`translate(${s.text[0]}px, ${s.text[1]}px)`)}>
        {s.label}
      </text>
    );
  }
  return null;
}

export function Scene({ api, config: g }) {
  const [step, setStep] = useState(0);
  const [presses, setPresses] = useState(0); // all action presses, passed to draw()
  const [here, setHere] = useState(0); // presses during the current step
  const s = g.steps[step];
  const need = s.action ? s.action.need ?? 2 : 0;
  const last = step === g.steps.length - 1;

  useEffect(() => {
    // Going back lands on a step already seen, so its button counts as pressed.
    const back = step > 0 ? { label: 'Back', fn: () => { setStep((n) => n - 1); setHere(Infinity); } } : undefined;
    // The big button can do the step's action too (all its presses at once), so it never blocks.
    if (here < need) api.setAction(s.action.label, true, () => { setPresses((p) => p + need - here); setHere(need); }, back);
    else if (last) api.setAction(g.cta ?? 'Continue', true, api.next, back);
    else api.setAction('Next', true, () => { setStep((n) => n + 1); setHere(0); }, back);
  }, [step, here, need, last, api, g.cta, s.action]);

  const shapes = g.draw(step, presses);
  return (
    <div className="tut-scene">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 260" role="img" aria-label={g.aria ?? 'Animated picture'}>
          {shapes.map((sh) => <Shape key={sh.id} s={sh} />)}
        </svg>
        <div className="tut-scene-steps" aria-hidden="true">
          {g.steps.map((_, i) => <span key={i} className={i === step ? 'on' : i < step ? 'past' : ''} />)}
        </div>
      </div>
      <p className="tut-scene-say" key={step} aria-live="polite"><Inline text={s.say} /></p>
      {s.action && (
        <button type="button" className="tut-scene-act" onClick={() => { setPresses((p) => p + 1); setHere((h) => h + 1); }}>
          {s.action.label}
        </button>
      )}
    </div>
  );
}
