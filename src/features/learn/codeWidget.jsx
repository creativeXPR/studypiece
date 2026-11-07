// Code cell: real Python in the browser (Pyodide, loaded once from a CDN on first use), for
// learners writing their first lines of code. Each task shows an editor with starter code; the big
// button runs it. A task passes when its printed output equals `expect` or fits the regular
// expression `match`, or when the Python expression `test` is true afterwards (or, with `error`,
// when the run stops with that error, for tasks that show a mistake on purpose). A miss shows the
// hint; after two misses "Show me" puts the solution in the editor. Tasks share one namespace, so
// later tasks can use earlier variables; `setup` is Python run quietly first (say, data or a
// function from an earlier screen).
//
// config: { tasks: [{ ask, code, expect?, match?, test?, error?, hint, solution, done? }], setup?, packages?: ['numpy'] }
import { useEffect, useRef, useState } from 'react';
import { Inline } from './Rich';

const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let pyodidePromise = null;

function loadPython() {
  if (!pyodidePromise) {
    pyodidePromise = new Promise((resolve, reject) => {
      const start = () => window.loadPyodide({ indexURL: PYODIDE }).then(resolve, reject);
      if (window.loadPyodide) return start();
      const s = document.createElement('script');
      s.src = `${PYODIDE}pyodide.js`;
      s.onload = start;
      s.onerror = () => reject(new Error('Could not download Python. Check your internet connection.'));
      document.head.appendChild(s);
    }).catch((e) => {
      pyodidePromise = null;
      throw e;
    });
  }
  return pyodidePromise;
}

// Plain-English tips for the errors beginners meet first.
const TIPS = [
  [/SyntaxError: unterminated string|EOL while scanning/, 'A quote mark is missing: text needs a quote at **both** ends, like `"hello"`.'],
  [/SyntaxError: '\(' was never closed|unexpected EOF/, 'A bracket was opened but never closed: count your `(` and `)`.'],
  [/IndentationError/, 'The spaces at the start of a line matter in Python. Lines inside a loop or function are indented by 4 spaces.'],
  [/SyntaxError/, 'Python couldn’t read the line. Check brackets, quote marks and colons.'],
  [/NameError: name '(\w+)' is not defined/, 'Python doesn’t know the name **$1** yet. Check the spelling (capitals matter) or give it a value first.'],
  [/TypeError: can only concatenate str/, 'You joined text and a number with `+`. Use a comma in `print(...)`, or turn the number into text with `str(...)`.'],
  [/TypeError/, 'Two things of different kinds (like text and a number) were combined in a way Python doesn’t allow.'],
  [/ZeroDivisionError/, 'Something was divided by zero.'],
];
const tipFor = (msg) => {
  for (const [rx, tip] of TIPS) {
    const m = msg.match(rx);
    if (m) return tip.replace('$1', m[1] ?? '');
  }
  return null;
};
const lastLine = (msg) => msg.trim().split('\n').filter(Boolean).at(-1) ?? msg;
const tidy = (s) => s.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

export function CodeCell({ api, config: g, index }) {
  const [py, setPy] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [at, setAt] = useState(0);
  const [code, setCode] = useState(g.tasks[0].code ?? '');
  const [out, setOut] = useState(null); // { text, error, tip, ok }
  const [busy, setBusy] = useState(false);
  const [misses, setMisses] = useState(0);
  const [log, setLog] = useState([]);
  const ns = useRef(null);
  const outRef = useRef(null);
  const task = g.tasks[at];
  const finished = at >= g.tasks.length;

  useEffect(() => {
    let live = true;
    loadPython()
      .then(async (p) => {
        if (g.packages?.length) await p.loadPackage(g.packages);
        if (!live) return;
        ns.current = p.globals.get('dict')();
        if (g.setup) await p.runPythonAsync(g.setup, { globals: ns.current });
        setPy(p);
      })
      .catch((e) => live && setLoadError(e.message));
    return () => {
      live = false;
    };
  }, [g.packages, g.setup]);

  const run = async () => {
    if (!py || busy) return;
    setBusy(true);
    const lines = [];
    py.setStdout({ batched: (s) => lines.push(s) });
    py.setStderr({ batched: (s) => lines.push(s) });
    let error = null;
    try {
      await py.runPythonAsync(code, { globals: ns.current });
    } catch (e) {
      error = lastLine(String(e.message ?? e));
    }
    const text = lines.join('\n');
    let ok = false;
    if (task.error) ok = Boolean(error?.includes(task.error));
    else if (!error) {
      if (task.expect !== undefined) ok = tidy(text) === tidy(task.expect);
      else if (task.match) ok = new RegExp(task.match).test(tidy(text));
      else if (task.test) {
        try {
          ok = py.runPython(`bool(${task.test})`, { globals: ns.current }) === true;
        } catch {
          ok = false;
        }
      } else ok = true;
    }
    setOut({ text, error, tip: error ? tipFor(error) : null, ok });
    if (!ok) {
      api.record(index, false);
      setMisses((m) => m + 1);
    }
    setBusy(false);
  };

  // Bring a fresh result into view: on a phone it lands below the editor.
  useEffect(() => {
    if (out) outRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [out]);

  const nextTask = (shown) => {
    setLog((l) => [...l, { ask: task.ask, code, shown }]);
    const n = at + 1;
    setAt(n);
    setOut(null);
    setMisses(0);
    if (n < g.tasks.length) setCode(g.tasks[n].code ?? '');
  };

  useEffect(() => {
    if (finished) {
      api.record(index, true);
      api.done();
      return;
    }
    if (out?.ok) {
      api.setAction(at === g.tasks.length - 1 ? 'Finish' : 'Next task', true, () => nextTask(false));
      return;
    }
    const show = misses >= 2 ? { label: 'Show me', fn: () => { setCode(task.solution); setOut(null); } } : undefined;
    api.setAction(py ? (busy ? 'Running…' : 'Run') : 'Starting Python…', Boolean(py) && !busy && code.trim() !== '', run, show);
  });

  const onKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const { selectionStart: s, selectionEnd: t } = el;
      const v = code.slice(0, s) + '    ' + code.slice(t);
      setCode(v);
      requestAnimationFrame(() => el.setSelectionRange(s + 4, s + 4));
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      run();
    }
  };

  return (
    <div className="tut-codecell">
      {log.length > 0 && (
        <ol className="tut-calc-log">
          {log.map((l, i) => (
            <li key={i} className={l.shown ? 'shown' : ''}>
              <span className="tut-calc-ask"><Inline text={l.ask} /></span>
              <span className="tut-calc-said">{l.shown ? 'shown' : '✓'}</span>
            </li>
          ))}
        </ol>
      )}
      {!finished && (
        <div className="tut-code-task" key={at}>
          <p className="tut-calc-num">Task {at + 1} of {g.tasks.length}</p>
          <p className="tut-calc-q"><Inline text={task.ask} /></p>
          <textarea
            className="tut-code-editor"
            value={code}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            rows={Math.max(3, code.split('\n').length + 1)}
            onChange={(e) => { setCode(e.target.value); setOut(null); }}
            onKeyDown={onKey}
            aria-label="Python code"
          />
          {!py && !loadError && (
            <p className="tut-code-status">
              {g.packages?.length
                ? `Starting Python and loading ${g.packages.join(', ')}… (the first time can take up to half a minute)`
                : 'Starting Python in your browser… (the first time takes a few seconds)'}
            </p>
          )}
          {loadError && <p className="tut-calc-hint" role="status"><b>Python couldn’t start.</b> {loadError}</p>}
          {out && (
            <div ref={outRef} className={`tut-code-out${out.error ? ' err' : out.ok ? ' ok' : ''}`} role="status">
              <span className="tut-code-label">Output</span>
              <pre>{out.error ?? (out.text || '(nothing was printed)')}</pre>
              {out.tip && !out.ok && <p className="tut-code-tip"><Inline text={out.tip} /></p>}
              {out.ok && <p className="tut-code-good"><Inline text={task.done ?? 'That works!'} /></p>}
              {!out.ok && <p className="tut-code-tip"><b>Not quite.</b> <Inline text={task.hint} /></p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
