// Live Swing windows: runs Java in the browser with CheerpJ (a JVM compiled to
// WebAssembly). It is a large download, so it loads only when a learner asks to try a
// window live; everything else goes to the Java runner server (runner.js).
// javac itself is a Java program: public/java/javac.jar holds the JDK 8 compiler,
// trimmed to the classes javac needs, and driver.jar compiles and runs in one call.
//
// One JVM serves the whole page, so runs are queued one after another. Each run gets
// its own output folder, so classes from an earlier run never leak into a later one.

import { PRELOAD } from './preload';

const LOADER = 'https://cjrtnc.leaningtech.com/4.3/loader.js';
const CLASSPATH = '/app/java/driver.jar:/app/java/javac.jar';

let booting = null;
let queue = Promise.resolve();
let runNo = 0;
let consoleEl = null;
let displayHost = null;
const listeners = new Set();
let status = { state: 'idle', done: 0, total: 0 };

function setStatus(next) {
  status = { ...status, ...next };
  listeners.forEach((fn) => fn(status));
}

export function javaStatus() {
  return status;
}

export function onJavaStatus(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Could not load the Java runtime. Check your connection.'));
    document.head.appendChild(s);
  });
}

// CheerpJ writes System.out and System.err to the element with id "console".
function ensureConsole() {
  if (consoleEl) return consoleEl;
  consoleEl = document.createElement('pre');
  consoleEl.id = 'console';
  consoleEl.hidden = true;
  document.body.appendChild(consoleEl);
  return consoleEl;
}

export function bootJava() {
  if (!booting) {
    setStatus({ state: 'loading' });
    booting = (async () => {
      ensureConsole();
      if (!window.cheerpjInit) await loadScript(LOADER);
      await window.cheerpjInit({
        status: 'none',
        preloadResources: PRELOAD,
        preloadProgress: (done, total) => setStatus({ done, total }),
      });
      displayHost = document.createElement('div');
      displayHost.className = 'jv-display';
      window.cheerpjCreateDisplay(-1, -1, displayHost);
      setStatus({ state: 'ready' });
    })().catch((e) => {
      booting = null;
      setStatus({ state: 'error', error: e.message });
      throw e;
    });
  }
  return booting;
}

// Swing windows draw into one shared display; a screen borrows it while it is shown.
export function borrowDisplay(parent) {
  if (!displayHost || !parent) return () => {};
  parent.appendChild(displayHost);
  return () => {
    if (displayHost.parentNode === parent) parent.removeChild(displayHost);
  };
}

function addFile(path, text) {
  const add = window.cheerpOSAddStringFile || window.cheerpjAddStringFile;
  add(path, new TextEncoder().encode(text));
}

// Watches the console while `fn` runs; `onOutput` gets the text so far.
async function capture(fn, onOutput) {
  const el = ensureConsole();
  el.textContent = '';
  const obs = onOutput ? new MutationObserver(() => onOutput(el.textContent)) : null;
  obs?.observe(el, { childList: true, subtree: true, characterData: true });
  try {
    const code = await fn();
    return { code, text: el.textContent };
  } finally {
    obs?.disconnect();
    onOutput?.(el.textContent);
  }
}

function enqueue(job) {
  const p = queue.then(job, job);
  queue = p.catch(() => {});
  return p;
}

async function readFile(path) {
  try {
    return await (await window.cjFileBlob(path)).text();
  } catch {
    return null;
  }
}

/**
 * One trip through the driver (java-src/Driver.java): compile `files` into a fresh
 * folder and, if that worked, run `mainClass` with `arg`. Source files live flat in
 * /str/ (CheerpJ's in-memory files), so each name must be the class's file name.
 */
async function drive(files, mainClass, arg, onOutput) {
  const dir = `/files/r${++runNo}`;
  const paths = Object.entries(files).map(([name, src]) => {
    addFile(`/str/${name}`, src);
    return `/str/${name}`;
  });
  const t = performance.now();
  const { text } = await capture(() => window.cheerpjRunMain('Driver', CLASSPATH, dir, mainClass || '-', arg || '-', ...paths), onOutput);
  const javac = (await readFile(`${dir}/javac.txt`)) ?? '1\nThe compiler did not run.';
  const nl = javac.indexOf('\n');
  return {
    compiled: javac.slice(0, nl).trim() === '0',
    log: javac.slice(nl + 1).split('/str/').join(''),
    out: text,
    dir,
    ms: Math.round(performance.now() - t),
  };
}

/** Compiles, then runs `mainClass`. Output streams to `onOutput`. */
export function runJava(files, mainClass, { onOutput } = {}) {
  return enqueue(async () => {
    await bootJava();
    onOutput?.('');
    return drive(files, mainClass, null, onOutput);
  });
}

/** Compiles the files plus a generated test class, runs it, and reads its JSON report. */
export function testJava(files, testSource) {
  return enqueue(async () => {
    await bootJava();
    const report = `/files/report${runNo + 1}.json`;
    const r = await drive({ ...files, '__Tests.java': testSource }, '__Tests', report);
    if (!r.compiled) return r;
    const json = await readFile(report);
    try {
      return { ...r, results: JSON.parse(json) };
    } catch {
      return { ...r, results: null };
    }
  });
}
