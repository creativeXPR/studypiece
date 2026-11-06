// "Your turn" calculations: the student works an exam question one step at a time, typing each
// number (or choosing a decision). A wrong answer shows that step's hint; after two misses
// "Show me" reveals it. Finished steps stay listed as the student's working.
//
// config (on the screen's `graph`): {
//   steps: [{ ask: text with $maths$, answer: number, tol?: allowed error, hint: text, done?: text shown once solved }
//           | { ask, options: [text, …], answer: index, hint, done? }],
//   clock?: true to show the mock-exam clock started by the `mockClock` widget }
import { useEffect, useRef, useState } from 'react';
import { Inline } from './Rich';

const CLOCK_KEY = 'studypiece.mockClock';
const MOCK_MINUTES = 60;

function parse(raw) {
  const s = String(raw).replace(/[−–]/g, '-').replace(/[,\s]/g, '');
  if (!s) return NaN;
  const frac = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  return frac ? Number(frac[1]) / Number(frac[2]) : Number(s);
}

function readClock() {
  try {
    return Number(localStorage.getItem(CLOCK_KEY)) || null;
  } catch {
    return null;
  }
}

function Clock() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const start = readClock();
  if (!start) return null;
  const left = Math.max(0, MOCK_MINUTES * 60 - Math.floor((now - start) / 1000));
  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  return <p className={`tut-calc-clock${left < 300 ? ' low' : ''}`} aria-live="off">⏱ {left ? `${mm}:${ss} left` : 'Time is up: finish this question, then stop'}</p>;
}

export function Calc({ api, config: g, index }) {
  const [at, setAt] = useState(0);
  const [value, setValue] = useState('');
  const [pick, setPick] = useState(null);
  const [misses, setMisses] = useState(0);
  const [hint, setHint] = useState(null);
  const [log, setLog] = useState([]);
  const input = useRef(null);
  const step = g.steps[at];
  const finished = at >= g.steps.length;

  const advance = (shown) => {
    setLog((l) => [...l, { ask: step.ask, said: step.done ?? (step.options ? step.options[step.answer] : String(step.answer)), shown }]);
    setAt((n) => n + 1);
    setValue('');
    setPick(null);
    setMisses(0);
    setHint(null);
  };

  const check = () => {
    const ok = step.options
      ? pick === step.answer
      : Math.abs(parse(value) - step.answer) <= (step.tol ?? Math.max(Math.abs(step.answer) * 0.01, 0.005));
    if (ok) advance(false);
    else {
      api.record(index, false);
      setMisses((m) => m + 1);
      setHint(step.hint);
    }
  };

  useEffect(() => {
    if (finished) {
      api.record(index, true);
      api.done();
      return;
    }
    const ready = step.options ? pick !== null : value.trim() !== '';
    api.setAction('Check', ready, check, misses >= 2 ? { label: 'Show me', fn: () => advance(true) } : undefined);
  });

  useEffect(() => {
    if (!finished && !step.options) input.current?.focus({ preventScroll: true });
  }, [at, finished, step]);

  return (
    <div className="tut-calc">
      {g.clock && <Clock />}
      {log.length > 0 && (
        <ol className="tut-calc-log">
          {log.map((l, i) => (
            <li key={i} className={l.shown ? 'shown' : ''}>
              <span className="tut-calc-ask"><Inline text={l.ask} /></span>
              <span className="tut-calc-said"><Inline text={l.said} />{l.shown ? ' (shown)' : ' ✓'}</span>
            </li>
          ))}
        </ol>
      )}
      {!finished && (
        <div className="tut-calc-step" key={at}>
          <p className="tut-calc-num">Step {at + 1} of {g.steps.length}</p>
          <p className="tut-calc-q"><Inline text={step.ask} /></p>
          {step.options ? (
            <div className="tut-calc-opts">
              {step.options.map((o, i) => (
                <button key={i} type="button" className={pick === i ? 'on' : ''} onClick={() => { setPick(i); setHint(null); }}>
                  <Inline text={o} />
                </button>
              ))}
            </div>
          ) : (
            <input
              ref={input}
              className="tut-calc-input"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Your answer"
              value={value}
              onChange={(e) => { setValue(e.target.value); setHint(null); }}
              onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) check(); }}
              aria-label="Your answer"
            />
          )}
          {hint && <p className="tut-calc-hint" role="status"><b>Not quite.</b> <Inline text={hint} /></p>}
        </div>
      )}
      {finished && g.after && <p className="tut-calc-after"><Inline text={g.after} /></p>}
    </div>
  );
}

// The start of a mock exam: one button starts a 60-minute clock that the mock's Calc screens show.
export function MockClock({ api }) {
  const [start, setStart] = useState(readClock);
  useEffect(() => {
    if (start) api.done('Begin question 1');
    else api.setAction('Start the 60-minute clock', true, () => {
      const t = Date.now();
      try {
        localStorage.setItem(CLOCK_KEY, String(t));
      } catch {
        /* storage blocked: the mock still works, just without a clock */
      }
      setStart(t);
    });
  }, [start, api]);
  return (
    <div className="tut-calc">
      {start ? <Clock /> : <p className="tut-calc-q">When you are ready, start the clock. It keeps running while you move through the questions.</p>}
      {start && (
        <button type="button" className="tut-scene-act" onClick={() => {
          const t = Date.now();
          try { localStorage.setItem(CLOCK_KEY, String(t)); } catch { /* ignore */ }
          setStart(t);
        }}>Restart the clock</button>
      )}
    </div>
  );
}
