import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckIcon, XIcon } from '../../../lib/icons';
import { burstAt } from '../fx';
import { Inline, Rich } from '../Rich';
import CodeEditor from './CodeEditor';
import { explainError } from './explain';
import { buildTests, fileNameFor, judge, mainClassOf, parseLog } from './harness';
import { CodeBlock, LineTokens } from './highlight';
import { javaLines } from './tokens';
import { runJava, swingJava, testJava, wakeRunner } from './runner';
import './java.css';

// Java screen types, used by programming courses:
//   code     write and run, checked by hidden tests, then compared with a model solution
//   bug      find each faulty line, say if it is a syntax or semantic error, pick the fix
//   predict  read code, choose what it prints
//   fill     drop keywords into the gaps
//   better   code that works but is clumsy: choose the cleaner version
// Every screen gets { s, index, api } like the others (see screens.jsx).

const PRAISE = ['Correct!', 'Spot on!', 'Exactly.', 'Nailed it.', 'Sharp eyes.'];
const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];

function shuffled(n) {
  const r = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function Head({ s }) {
  return (
    <>
      {s.eyebrow && <p className="tut-eyebrow">{s.eyebrow}</p>}
      {(s.title || s.prompt) && (
        <h2 className="tut-title" tabIndex={-1}>
          <Inline text={s.title || s.prompt} />
        </h2>
      )}
      <Rich text={s.body} />
    </>
  );
}

function Explain({ parts }) {
  return parts.filter(Boolean).map((t, i) => <Rich key={i} text={t} className="tut-sheet-text" />);
}

const store = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* private mode: drafts just aren't kept */
    }
  },
};

function hash(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (h * 33) ^ text.charCodeAt(i);
  return (h >>> 0).toString(36);
}

/* ---------------- compile errors, explained ---------------- */
function CompileErrors({ errors, onlyTests, testLabel }) {
  if (onlyTests) {
    const e = errors[0];
    return (
      <div className="jv-errors">
        <p className="jv-err-head">Your code compiles, but the checker can’t use it yet.</p>
        <p>
          {e.symbol ? (
            <>It looks for <code>{e.symbol}</code>{e.location ? <> in <code>{e.location}</code></> : null}, which your code doesn’t have. Check the name, the parameters and the return type the task asks for.</>
          ) : (
            <>{testLabel ? <>While checking “{testLabel}”: </> : null}<code>{e.msg}</code>. Your method may have a different name, parameters or return type than the task asks for.</>
          )}
        </p>
      </div>
    );
  }
  return (
    <div className="jv-errors">
      <p className="jv-err-head">
        {errors.length} compile error{errors.length > 1 ? 's' : ''}: Java stopped before running anything.
      </p>
      {errors.slice(0, 4).map((e, i) => {
        const help = explainError(e.msg);
        return (
          <div key={i} className="jv-err">
            <p><b>Line {e.line}</b> · <code>{e.msg}</code></p>
            {e.code && <pre className="jv-err-src">{e.code}{'\n'}{e.caret}</pre>}
            {help && <p className="jv-err-help"><Inline text={help} /></p>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Swing: a picture from the server, live on request ---------------- */
// The runner sends back a picture of each window straight away. "Try it live" loads a
// JVM into the page (CheerpJ, a big one-time download) so the window can be clicked.
function SwingWindow({ code, images, busy }) {
  const slot = useRef(null);
  const release = useRef(() => {});
  const [live, setLive] = useState(null); // { state: 'loading' | 'running' | 'ready' | 'error', pct, error }

  useEffect(() => () => release.current(), []);

  const goLive = async () => {
    setLive({ state: 'loading', pct: 0 });
    try {
      const cj = await import('./cheerpj');
      const off = cj.onJavaStatus((st) => setLive((l) => (l?.state === 'loading' ? { ...l, pct: st.total ? Math.round((st.done / st.total) * 100) : 0 } : l)));
      await cj.bootJava();
      off();
      release.current();
      release.current = cj.borrowDisplay(slot.current);
      setLive({ state: 'running' });
      const r = await cj.runJava({ [fileNameFor(code)]: code }, mainClassOf(code));
      setLive(r.compiled ? { state: 'ready' } : { state: 'error', error: 'Your code doesn’t compile yet. Fix it, press Run, then try live again.' });
    } catch (e) {
      setLive({ state: 'error', error: e.message });
    }
  };

  const showLive = live && live.state !== 'error';
  return (
    <div className="jv-window-box">
      <div className={`jv-window${showLive ? ' live' : ''}`} aria-label="Your program’s window">
        {showLive ? (
          <div className="jv-live" ref={slot}>
            {live.state === 'loading' && (
              <div className="jv-boot" role="status">
                <span>Loading live Java{live.pct ? ` · ${live.pct}%` : '…'}</span>
                <small>A one-time download. The picture works without it.</small>
                <i style={{ '--p': `${live.pct}%` }} />
              </div>
            )}
          </div>
        ) : images?.length ? (
          <div className="jv-shots">
            {images.map((src, i) => (
              <img key={i} src={`data:image/png;base64,${src}`} alt={i ? 'A dialog your program opened' : 'Your program’s window'}
                onLoad={(e) => (e.currentTarget.style.width = `${e.currentTarget.naturalWidth / 2}px`)} />
            ))}
          </div>
        ) : (
          <p className="jv-window-empty">{busy ? 'Opening your window…' : 'Press ▶ Run to see your window here.'}</p>
        )}
      </div>
      {live?.state === 'error' && <p className="jv-window-note err">{live.error}</p>}
      {images?.length > 0 && !showLive && (
        <p className="jv-window-note">
          This is a picture of your window.{' '}
          <button type="button" className="jv-link" onClick={goLive}>Try it live</button> to click and type in it (one-time download).
        </p>
      )}
      {showLive && (
        <p className="jv-window-note">
          Live window, running on your device with <a href="https://cheerpj.com" target="_blank" rel="noreferrer">CheerpJ</a>.
        </p>
      )}
    </div>
  );
}

/* ---------------- model solution, step by step ---------------- */
function SolutionCompare({ mine, solution, solved }) {
  const [step, setStep] = useState(0);
  const [tab, setTab] = useState('model');
  const steps = solution.steps || [];
  const marks = {};
  const cur = steps[step];
  if (cur?.lines) for (let l = cur.lines[0]; l <= (cur.lines[1] ?? cur.lines[0]); l++) marks[l] = 'hl';
  return (
    <section className="jv-compare" aria-label="Compare with the model solution">
      <header>
        <p className="tut-eyebrow">{solved ? 'Now compare' : 'Model solution'}</p>
        <h3>{solved ? 'Your code next to the model answer' : 'Study it, then try again'}</h3>
        <div className="jv-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'mine'} onClick={() => setTab('mine')}>Your code</button>
          <button type="button" role="tab" aria-selected={tab === 'model'} onClick={() => setTab('model')}>Model</button>
        </div>
      </header>
      <div className={`jv-compare-grid show-${tab}`}>
        <div className="jv-pane mine">
          <span className="jv-pane-tag">Yours</span>
          <CodeBlock code={mine} />
        </div>
        <div className="jv-pane model">
          <span className="jv-pane-tag">Model</span>
          <CodeBlock code={solution.code} marks={marks} />
        </div>
      </div>
      {steps.length > 0 && (
        <ol className="jv-steps">
          {steps.map((st, i) => (
            <li key={i}>
              <button type="button" className={i === step ? 'on' : ''} onClick={() => { setStep(i); setTab('model'); }}>
                <span className="jv-step-n">{i + 1}</span>
                <span>
                  <Inline text={st.text} />
                  {st.lines && <small>Line{st.lines[1] && st.lines[1] !== st.lines[0] ? `s ${st.lines[0]}–${st.lines[1]}` : ` ${st.lines[0]}`}</small>}
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
      {solution.note && <Rich text={solution.note} className="jv-compare-note" />}
    </section>
  );
}

/* ---------------- write and run ---------------- */
function CodeScreen({ s, index, api }) {
  const key = `studypiece.jv.${hash((s.title || '') + s.starter)}`;
  const [code, setCode] = useState(() => store.get(key) ?? s.starter);
  const [panel, setPanel] = useState(null); // { kind: 'out' | 'errors' | 'tests' | 'busy' | 'note', ... }
  const [shots, setShots] = useState(null);
  const [results, setResults] = useState({});
  const [fails, setFails] = useState(0);
  const [hints, setHints] = useState(0);
  const [solved, setSolved] = useState(false);
  const [showSol, setShowSol] = useState(false);
  const [busy, setBusy] = useState(null); // 'run' | 'check'
  const editor = useRef(null);
  const compareRef = useRef(null);
  const tests = s.tests || [];
  const shownTests = tests.map((t, i) => ({ t, i })).filter(({ t }) => !t.hidden);
  const hiddenCount = tests.length - shownTests.length;

  useEffect(() => wakeRunner(), []);

  const onChange = (v) => {
    setCode(v);
    store.set(key, v);
  };

  const files = () => ({ [fileNameFor(code)]: code });

  const run = async () => {
    const main = mainClassOf(code);
    if (!main) {
      setPanel({ kind: 'note', text: 'There’s no `main` method to run. Press **Check my code** to test your methods instead.' });
      return;
    }
    setBusy('run');
    setPanel(s.swing ? null : { kind: 'busy', text: 'Running…' });
    try {
      const r = s.swing ? await swingJava(files(), main) : await runJava(files(), main, { stdin: s.stdin });
      if (!r.compiled) {
        setPanel({ kind: 'errors', errors: parseLog(r.log) });
        return;
      }
      if (s.swing) setShots(r.images || []);
      const stopped = r.timedOut ? `${r.out ? '\n' : ''}⏱ Stopped: it was still running after ${s.swing ? 12 : 10} seconds. Is there a loop that never ends?` : '';
      if (!s.swing || r.out || stopped) setPanel({ kind: 'out', text: (r.out || '') + stopped });
      else setPanel(null);
    } catch (e) {
      setPanel({ kind: 'note', text: e.message });
    } finally {
      setBusy(null);
    }
  };

  const finish = () => {
    setSolved(true);
    api.done('Continue');
    setTimeout(() => compareRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  };

  const check = async () => {
    setBusy('check');
    setPanel({ kind: 'busy', text: 'Compiling and running the checks…' });
    try {
      const { src, lineOf } = buildTests(tests);
      const needJava = tests.some((t) => !t.src);
      const r = needJava ? await testJava(files(), src) : { compiled: true, results: [] };
      if (!r.compiled) {
        const errors = parseLog(r.log);
        const mine = errors.filter((e) => e.file !== '__Tests.java');
        const onlyTests = mine.length === 0 && errors.length > 0;
        const label = onlyTests ? tests[lineOf[errors[0].line]]?.label : null;
        setPanel({ kind: 'errors', errors: onlyTests ? errors : mine, onlyTests, testLabel: label });
        setResults({});
        api.record(index, false);
        setFails((f) => f + 1);
        return;
      }
      const res = {};
      tests.forEach((t, i) => (res[i] = judge(t, r.results?.find((row) => row.i === i), code)));
      setResults(res);
      const failed = Object.values(res).filter((x) => !x.ok).length;
      api.record(index, failed === 0);
      setPanel(r.timedOut ? { kind: 'note', text: 'The checks ran out of time. Look for a loop or recursion that never stops.' } : { kind: 'tests' });
      if (!failed) {
        burstAt(compareRef.current, 30);
        api.feedback({
          tone: 'good',
          title: `All ${tests.length} checks pass!`,
          body: <Explain parts={[s.explain || (s.solution ? 'Now compare your steps with the model answer below.' : null)]} />,
          then: finish,
        });
      } else {
        setFails((f) => f + 1);
        const hiddenFail = tests.some((t, i) => t.hidden && !res[i].ok);
        api.feedback({
          tone: 'bad',
          title: `${tests.length - failed} of ${tests.length} checks pass`,
          label: 'Back to the code',
          body: <Explain parts={[hiddenFail ? 'A hidden check failed too: think about edge cases (0, negatives, empty input).' : 'The red checks say what went wrong.']} />,
        });
      }
    } catch (e) {
      setPanel({ kind: 'note', text: e.message });
    } finally {
      setBusy(null);
    }
  };

  useEffect(() => {
    if (solved) return;
    const reveal = s.solution && fails >= 3 && !showSol ? { label: 'Show solution', fn: () => { setShowSol(true); setTimeout(() => compareRef.current?.scrollIntoView({ behavior: 'smooth' }), 80); } } : undefined;
    api.setAction(busy === 'check' ? 'Checking…' : 'Check my code', !busy, check, reveal);
  });

  const reset = () => {
    editor.current?.setValue(s.starter);
    setPanel(null);
    setShots(null);
  };

  return (
    <div className="jv-wide">
      <Head s={s} />
      <div className="jv-lab">
        <aside className="jv-side">
          <h3 className="jv-side-head">Checks</h3>
          <ul className="jv-tests">
            {shownTests.map(({ t, i }) => {
              const r = results[i];
              return (
                <li key={i} className={r ? (r.ok ? 'pass' : 'fail') : ''}>
                  <span className="jv-dot">{r ? r.ok ? <CheckIcon size={13} strokeWidth={3} /> : <XIcon size={13} strokeWidth={3} /> : null}</span>
                  <span>
                    <Inline text={t.label || t.expr || 'Check'} />
                    {r && !r.ok && r.msg && <pre className="jv-test-msg">{r.msg}</pre>}
                  </span>
                </li>
              );
            })}
            {hiddenCount > 0 && (
              <li className={`hidden ${tests.some((t, i) => t.hidden && results[i]) ? (tests.every((t, i) => !t.hidden || results[i]?.ok) ? 'pass' : 'fail') : ''}`}>
                <span className="jv-dot" />
                <span>+ {hiddenCount} hidden check{hiddenCount > 1 ? 's' : ''} (edge cases)</span>
              </li>
            )}
          </ul>
          {s.hints?.length > 0 && !solved && (
            <div className="jv-hints">
              {s.hints.slice(0, hints).map((h, i) => (
                <p key={i} className="jv-hint"><b>Hint {i + 1}</b> <Inline text={h} /></p>
              ))}
              {hints < s.hints.length && (
                <button type="button" className="jv-link" onClick={() => setHints((n) => n + 1)}>
                  {hints ? 'Another hint' : 'Need a hint?'} ({hints}/{s.hints.length})
                </button>
              )}
            </div>
          )}
        </aside>

        <div className="jv-main">
          <div className="jv-toolbar">
            <span className="jv-file">{fileNameFor(code)}</span>
            <button type="button" className="jv-tool" onClick={reset} disabled={!!busy}>Reset</button>
            <button type="button" className="jv-tool run" onClick={run} disabled={!!busy}>{busy === 'run' ? 'Running…' : '▶ Run'}</button>
          </div>
          <CodeEditor ref={editor} value={code} onChange={onChange} />
          {s.swing && <SwingWindow code={code} images={shots} busy={busy === 'run'} />}
          {panel && (
            <div className={`jv-out ${panel.kind}`} aria-live="polite">
              {panel.kind === 'busy' && <p className="jv-muted jv-working">{panel.text}</p>}
              {panel.kind === 'note' && <Rich text={panel.text} className="jv-note" />}
              {panel.kind === 'out' && (
                <>
                  <span className="jv-out-tag">Output</span>
                  <pre>{panel.text || '(no output)'}</pre>
                </>
              )}
              {panel.kind === 'errors' && <CompileErrors errors={panel.errors} onlyTests={panel.onlyTests} testLabel={panel.testLabel} />}
              {panel.kind === 'tests' && <p className="jv-muted">Results are in the checklist{Object.values(results).every((r) => r.ok) ? '. All green!' : '.'}</p>}
            </div>
          )}
        </div>
      </div>
      {(solved || showSol) && s.solution && (
        <div ref={compareRef}>
          <SolutionCompare mine={code} solution={s.solution} solved={solved} />
        </div>
      )}
      {!(solved || showSol) && <div ref={compareRef} />}
    </div>
  );
}

/* ---------------- bug hunt ---------------- */
function indentOf(line) {
  return line.match(/^\s*/)[0];
}

// Two steps, like the exam: find each faulty line and say what kind of error it is,
// then fix the lines that really are wrong. (Showing fixes earlier would give away
// which lines are faulty.)
function BugScreen({ s, index, api }) {
  const lines = useMemo(() => s.code.replace(/\n$/, '').split('\n'), [s.code]);
  const tokens = useMemo(() => javaLines(s.code.replace(/\n$/, '')), [s.code]);
  const byLine = useMemo(() => Object.fromEntries(s.errors.map((e) => [e.line, e])), [s.errors]);
  const fixOrder = useMemo(() => Object.fromEntries(s.errors.map((e) => [e.line, shuffled(e.fixes?.length || 0)])), [s.errors]);
  const hasFixes = s.errors.some((e) => e.fixes);
  const [phase, setPhase] = useState('find'); // find → fix → done
  const [kinds, setKinds] = useState({}); // line -> 'syntax' | 'semantic' | null
  const [fixes, setFixes] = useState({}); // line -> option index
  const [open, setOpen] = useState(null);
  const [marks, setMarks] = useState({}); // line -> 'right' | 'wrong'
  const slips = useRef(0);
  const boxRef = useRef(null);
  const syntax = s.errors.filter((e) => e.kind === 'syntax').length;
  const flagged = Object.keys(kinds).map(Number);
  const done = phase === 'done';

  const toggle = (l) => {
    if (phase !== 'find' || marks[l] === 'right') return;
    if (l in kinds && open === l) {
      setKinds((k) => {
        const n = { ...k };
        delete n[l];
        return n;
      });
      setOpen(null);
    } else {
      if (!(l in kinds)) setKinds((k) => ({ ...k, [l]: null }));
      setOpen(l);
    }
    setMarks((m) => ({ ...m, [l]: undefined }));
  };

  const finish = () => {
    setPhase('done');
    setOpen(null);
    api.record(index, slips.current === 0);
    burstAt(boxRef.current, 28);
    api.feedback({
      tone: 'good',
      title: slips.current === 0 ? 'Every bug caught!' : 'All fixed.',
      body: (
        <ul className="tut-sheet-list">
          {s.errors.map((e) => (
            <li key={e.line}><b>Line {e.line} ({e.kind}).</b> <Inline text={e.why} /></li>
          ))}
        </ul>
      ),
      then: () => api.done(),
    });
  };

  const checkFind = () => {
    const m = {};
    const notes = [];
    flagged.forEach((l) => {
      const e = byLine[l];
      if (!e) {
        m[l] = 'wrong';
        notes.push(`Line ${l} is fine as written.`);
      } else if (kinds[l] !== e.kind) {
        m[l] = 'wrong';
        notes.push(`Line ${l} does have an error, but think again about its kind.`);
      } else m[l] = 'right';
    });
    setMarks(m);
    setOpen(null);
    if (flagged.every((l) => m[l] === 'right')) {
      if (hasFixes) {
        setPhase('fix');
        api.feedback({ tone: 'good', title: `All ${s.errors.length} found!`, label: 'Now fix them', body: <Explain parts={['Pick the correct version of each faulty line.']} /> });
      } else finish();
      return;
    }
    slips.current += 1;
    api.feedback({
      tone: 'bad',
      title: 'Not all bugs found yet',
      label: 'Keep hunting',
      body: <ul className="tut-sheet-list">{notes.map((n, i) => <li key={i}><Inline text={n} /></li>)}</ul>,
      then: () => {
        setKinds((k) => {
          const n = {};
          Object.entries(k).forEach(([l, v]) => {
            if (m[l] === 'right') n[l] = v;
            else if (byLine[l]) n[l] = null;
          });
          return n;
        });
        setMarks((old) => Object.fromEntries(Object.entries(old).filter(([, v]) => v === 'right')));
      },
    });
  };

  const checkFix = () => {
    const wrong = s.errors.filter((e) => e.fixes && fixes[e.line] !== 0);
    if (!wrong.length) return finish();
    slips.current += 1;
    api.feedback({
      tone: 'bad',
      title: `${wrong.length} fix${wrong.length > 1 ? 'es' : ''} still wrong`,
      label: 'Try again',
      body: <ul className="tut-sheet-list">{wrong.map((e) => <li key={e.line}>Line {e.line}: that change doesn’t solve it.</li>)}</ul>,
      then: () => setFixes((f) => Object.fromEntries(Object.entries(f).filter(([l, v]) => !byLine[l]?.fixes || v === 0))),
    });
  };

  useEffect(() => {
    if (phase === 'find') {
      const left = s.errors.length - flagged.length;
      const ready = left === 0 && flagged.every((l) => kinds[l]);
      const label = left > 0 ? `Flag ${left} more line${left > 1 ? 's' : ''}` : left < 0 ? `Too many flagged (${-left} extra)` : ready ? 'Check' : 'Choose a kind for each flagged line';
      api.setAction(label, ready, checkFind);
    } else if (phase === 'fix') {
      const ready = s.errors.every((e) => !e.fixes || fixes[e.line] != null);
      api.setAction(ready ? 'Check fixes' : 'Pick a fix for each line', ready, checkFix);
    }
  });

  const fixedLine = (l) => {
    const e = byLine[l];
    const text = e?.fixes ? e.fixes[0] : e?.fix;
    return text == null ? null : indentOf(lines[l - 1]) + text.trim();
  };

  return (
    <>
      <Head s={s} />
      <p className="jv-bug-count">
        <b>{s.errors.length} error{s.errors.length > 1 ? 's' : ''}</b> · {syntax} syntax, {s.errors.length - syntax} semantic
      </p>
      <p className="tut-hint">
        {phase === 'find' ? 'Tap a line to flag it, then say what kind of error it is.' : phase === 'fix' ? 'Now choose the correct version of each faulty line.' : 'Fixed lines are shown in green.'}
      </p>
      <div className="jv-code jv-bug numbered" ref={boxRef}>
        {lines.map((line, i) => {
          const l = i + 1;
          const e = byLine[l];
          const flaggedHere = l in kinds;
          const state = done && e ? 'right' : marks[l] || (flaggedHere ? 'flag' : '');
          return (
            <div key={l} className="jv-bug-row">
              <button type="button" className={`jv-line jv-tap ${state}`} onClick={() => toggle(l)} aria-pressed={flaggedHere} disabled={phase !== 'find'}>
                <span className="jv-ln">{l}</span>
                <code><LineTokens tokens={tokens[i] || []} /></code>
                {flaggedHere && <span className="jv-flag">{kinds[l] === 'syntax' ? 'syntax' : kinds[l] === 'semantic' ? 'semantic' : '🐞'}</span>}
              </button>
              {done && fixedLine(l) && (
                <div className="jv-line fixed">
                  <span className="jv-ln">✓</span>
                  <code><LineTokens tokens={javaLines(fixedLine(l))[0]} /></code>
                </div>
              )}
              {phase === 'find' && flaggedHere && open === l && (
                <div className="jv-bug-panel">
                  <div className="jv-seg" role="group" aria-label="Kind of error">
                    {['syntax', 'semantic'].map((k) => (
                      <button key={k} type="button" className={kinds[l] === k ? 'on' : ''} onClick={() => { setKinds((x) => ({ ...x, [l]: k })); setOpen(null); }}>
                        {k === 'syntax' ? 'Syntax error' : 'Semantic error'}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="jv-link" onClick={() => toggle(l)}>Unflag this line</button>
                </div>
              )}
              {phase === 'fix' && e?.fixes && (
                <div className="jv-bug-panel">
                  <span className="jv-pane-tag">Fix line {l}</span>
                  <div className="jv-fixes">
                    {fixOrder[l].map((fi) => (
                      <button key={fi} type="button" className={`jv-fix${fixes[l] === fi ? ' on' : ''}`} onClick={() => setFixes((f) => ({ ...f, [l]: fi }))}>
                        <code><LineTokens tokens={javaLines(e.fixes[fi].trim())[0]} /></code>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <details className="jv-legend">
        <summary>Syntax or semantic?</summary>
        <p><b>Syntax error:</b> breaks Java’s grammar, so the code won’t compile (a missing <code>;</code>, a misspelt keyword).</p>
        <p><b>Semantic error:</b> the code compiles, but it doesn’t do what it should, because the logic or meaning is wrong (a wrong condition, the wrong variable, a missing base case).</p>
      </details>
    </>
  );
}

/* ---------------- predict the output ---------------- */
function Terminal({ text }) {
  const lines = String(text).split('\n');
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= lines.length) return undefined;
    const t = setTimeout(() => setN((x) => x + 1), n === 0 ? 250 : 180);
    return () => clearTimeout(t);
  }, [n, lines.length]);
  return (
    <pre className="jv-term" aria-label="Program output">
      <span className="jv-term-tag">$ java Main</span>
      {'\n'}
      {lines.slice(0, n).join('\n')}
      {n < lines.length && <span className="jv-caret" />}
    </pre>
  );
}

function PredictScreen({ s, index, api }) {
  const [order] = useState(() => shuffled(s.options.length));
  const [sel, setSel] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState(null);
  const tries = useRef(0);
  const btns = useRef([]);

  const check = () => {
    tries.current += 1;
    const o = s.options[sel];
    if (o.correct) {
      setRight(sel);
      api.record(index, tries.current === 1);
      burstAt(btns.current[sel]);
      api.feedback({ tone: 'good', title: tries.current === 1 ? praise() : 'Got it.', body: <Explain parts={[o.why, s.explain]} />, then: () => api.done() });
    } else {
      api.record(index, false);
      setWrong((w) => [...w, sel]);
      setSel(null);
      api.feedback({ tone: 'bad', title: 'Not quite.', label: 'Trace it again', body: <Explain parts={[o.why || 'Step through the code one line at a time.']} /> });
    }
  };

  useEffect(() => {
    if (right === null) api.setAction('Check', sel !== null, check);
  });

  const answer = s.options.find((o) => o.correct)?.out ?? '';
  return (
    <>
      <Head s={s} />
      <CodeBlock code={s.code} />
      {right !== null ? (
        <Terminal text={answer} />
      ) : (
        <>
          <p className="tut-hint">{s.ask || 'Pick the exact output, line by line.'}</p>
          <div className="jv-outs" role="group">
            {order.map((i, k) => {
              const cls = wrong.includes(i) ? 'wrong' : sel === i ? 'sel' : '';
              return (
                <button key={i} ref={(el) => (btns.current[i] = el)} type="button" className={`jv-outopt ${cls}`} style={{ '--i': k }}
                  disabled={wrong.includes(i)} aria-pressed={sel === i} onClick={() => setSel(i)}>
                  <pre>{s.options[i].out}</pre>
                </button>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

/* ---------------- keyword fill ---------------- */
function parseFill(code) {
  const answers = [];
  const lines = code.replace(/\n$/, '').split('\n').map((line) =>
    line.split(/(\[\[[^\]]+\]\])/).filter(Boolean).map((part) => {
      const m = part.match(/^\[\[(.+)\]\]$/);
      if (!m) return { text: part };
      answers.push(m[1]);
      return { blank: answers.length - 1 };
    }),
  );
  return { lines, answers };
}

function FillScreen({ s, index, api }) {
  const { lines, answers } = useMemo(() => parseFill(s.code), [s.code]);
  const [bank] = useState(() => {
    const words = [...new Set([...answers, ...(s.bank || [])])];
    return shuffled(words.length).map((i) => words[i]);
  });
  const [vals, setVals] = useState(() => answers.map(() => null));
  const [active, setActive] = useState(0);
  const [marks, setMarks] = useState({});
  const [solved, setSolved] = useState(false);
  const tries = useRef(0);
  const boxRef = useRef(null);
  const full = vals.every((v) => v !== null);

  const put = (w) => {
    if (solved) return;
    const target = vals[active] === null || marks[active] !== 'right' ? active : vals.findIndex((v) => v === null);
    if (target < 0 || marks[target] === 'right') return;
    const next = vals.map((v, i) => (i === target ? w : v));
    setVals(next);
    setMarks((m) => ({ ...m, [target]: undefined }));
    const after = next.findIndex((v, i) => v === null && i > target);
    setActive(after >= 0 ? after : next.findIndex((v) => v === null));
  };

  const check = () => {
    tries.current += 1;
    const m = {};
    vals.forEach((v, i) => (m[i] = v === answers[i] ? 'right' : 'wrong'));
    const ok = Object.values(m).every((x) => x === 'right');
    api.record(index, ok);
    setMarks(m);
    if (ok) {
      setSolved(true);
      burstAt(boxRef.current, 24);
      api.feedback({ tone: 'good', title: tries.current === 1 ? praise() : 'All filled.', body: <Explain parts={[s.explain]} />, then: () => api.done() });
    } else {
      const bad = Object.keys(m).filter((i) => m[i] === 'wrong').length;
      api.feedback({
        tone: 'bad',
        title: `${bad} gap${bad > 1 ? 's' : ''} to fix`,
        label: 'Try again',
        body: <Explain parts={[s.hint || 'The red gaps are cleared so you can try again.']} />,
        then: () => {
          setVals((vs) => vs.map((v, i) => (m[i] === 'right' ? v : null)));
          setActive(Number(Object.keys(m).find((i) => m[i] === 'wrong')));
        },
      });
    }
  };

  useEffect(() => {
    if (!solved) api.setAction(full ? 'Check' : `${vals.filter((v) => v === null).length} gap${vals.filter((v) => v === null).length > 1 ? 's' : ''} left`, full, check);
  });

  return (
    <>
      <Head s={s} />
      <pre className="jv-code numbered jv-fill" ref={boxRef}>
        {lines.map((parts, li) => (
          <div key={li} className="jv-line">
            <span className="jv-ln">{li + 1}</span>
            <code>
              {parts.map((p, k) =>
                p.blank === undefined ? (
                  <LineTokens key={k} tokens={javaLines(p.text)[0]} />
                ) : (
                  <button key={k} type="button" className={`jv-gap ${marks[p.blank] || ''}${active === p.blank && !solved ? ' active' : ''}${vals[p.blank] ? ' filled' : ''}`}
                    disabled={solved || marks[p.blank] === 'right'}
                    onClick={() => {
                      if (vals[p.blank] !== null) setVals((vs) => vs.map((v, i) => (i === p.blank ? null : v)));
                      setActive(p.blank);
                    }}>
                    {vals[p.blank] ?? '  '}
                  </button>
                ),
              )}
            </code>
          </div>
        ))}
      </pre>
      {!solved && (
        <div className="jv-bank" role="group" aria-label="Keywords">
          {bank.map((w, i) => (
            <button key={w} type="button" className="tut-chip jv-chip" style={{ '--i': i }} onClick={() => put(w)}>{w}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- the better way ---------------- */
function BetterScreen({ s, index, api }) {
  const [order] = useState(() => shuffled(s.options.length));
  const [sel, setSel] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState(null);
  const tries = useRef(0);
  const btns = useRef([]);

  const check = () => {
    tries.current += 1;
    const o = s.options[sel];
    if (o.correct) {
      setRight(sel);
      api.record(index, tries.current === 1);
      burstAt(btns.current[sel]);
      api.feedback({
        tone: 'good',
        title: 'Cleaner.',
        body: (
          <>
            <Explain parts={[o.why]} />
            {s.points?.length > 0 && <ul className="tut-sheet-list">{s.points.map((p, i) => <li key={i}><Inline text={p} /></li>)}</ul>}
          </>
        ),
        then: () => api.done(),
      });
    } else {
      api.record(index, false);
      setWrong((w) => [...w, sel]);
      setSel(null);
      api.feedback({ tone: 'bad', title: 'Not this one.', label: 'Try another', body: <Explain parts={[o.why]} /> });
    }
  };

  useEffect(() => {
    if (right === null) api.setAction('Check', sel !== null, check);
  });

  return (
    <>
      <Head s={s} />
      <div className="jv-before">
        <span className="jv-pane-tag">Works, but…</span>
        <CodeBlock code={s.code} />
      </div>
      <p className="tut-hint">{s.ask || 'Which version is better?'}</p>
      <div className="jv-betters" role="group">
        {order.map((i, k) => {
          const cls = right === i ? 'right' : wrong.includes(i) ? 'wrong' : sel === i ? 'sel' : '';
          return (
            <button key={i} ref={(el) => (btns.current[i] = el)} type="button" className={`jv-better ${cls}`} style={{ '--i': k }}
              disabled={right !== null || wrong.includes(i)} aria-pressed={sel === i} onClick={() => setSel(i)}>
              <span className="jv-pane-tag">Option {String.fromCharCode(65 + k)}</span>
              <CodeBlock code={s.options[i].code} numbers={false} />
            </button>
          );
        })}
      </div>
    </>
  );
}

export { BetterScreen, BugScreen, CodeScreen, FillScreen, PredictScreen };
