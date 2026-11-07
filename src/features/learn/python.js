// Python in the browser (Pyodide, from a CDN), downloaded once per visit and shared by every code
// cell. Three layers make sure it is there when needed:
//   1. Opening any lesson of a course with code screens starts loading Python and every library
//      the course uses, in the background (LessonPage).
//   2. A lesson with code screens immediately makes sure its own libraries are loaded or loading.
//   3. Each code screen calls ensurePython() again before it runs anything: whatever is missing or
//      failed earlier is loaded now, and every library is checked to really be importable.
// Everything is cached, so the layers never download anything twice; a failure is forgotten so the
// next attempt starts fresh.

const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let pyodidePromise = null;

// A stalled download (connection hanging rather than failing) would otherwise wait forever; after
// the limit it counts as failed, so the next attempt starts afresh and the learner can try again.
// Anything that does arrive later is still kept by the browser for that next attempt.
const PYTHON_LIMIT = 90_000;
const PACKAGE_LIMIT = 150_000;
const withLimit = (promise, ms, message) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms))]);
const SLOW = 'The download is taking too long. Check your internet connection and try again.';
const packagePromises = {};
const status = { python: 'idle', packages: {} };

export function loadPython() {
  if (!pyodidePromise) {
    status.python = 'loading';
    const loading = new Promise((resolve, reject) => {
      const start = () => window.loadPyodide({ indexURL: PYODIDE }).then(resolve, reject);
      if (window.loadPyodide) return start();
      document.querySelectorAll('script[data-pyodide]').forEach((old) => old.remove());
      const s = document.createElement('script');
      s.src = `${PYODIDE}pyodide.js`;
      s.dataset.pyodide = '';
      s.onload = start;
      s.onerror = () => reject(new Error('Could not download Python. Check your internet connection and try again.'));
      document.head.appendChild(s);
    });
    pyodidePromise = withLimit(loading, PYTHON_LIMIT, SLOW).then(
      (py) => {
        status.python = 'ready';
        loadedBy = py;
        return py;
      },
      (e) => {
        status.python = 'failed';
        pyodidePromise = null;
        throw e;
      },
    );
  }
  return pyodidePromise;
}

// Pyodide's loadPackage reports some failures only in the console, so each package is confirmed
// in py.loadedPackages afterwards; a package that didn't arrive counts as failed.
// A stalled package download keeps Pyodide's internal package lock, so later tries on the same
// instance would queue behind it forever. After a timeout the instance is dropped: the next try
// starts a fresh Python (its files come from the browser cache) with nothing stuck in front of it.
let loadedBy = null;
function dropPython(py) {
  if (loadedBy !== py) return;
  loadedBy = null;
  pyodidePromise = null;
  status.python = 'idle';
  Object.keys(packagePromises).forEach((name) => delete packagePromises[name]);
}

export function loadPackages(py, names = []) {
  return Promise.all(
    names.map((name) => {
      if (!packagePromises[name]) {
        status.packages[name] = 'loading';
        const p = withLimit(py.loadPackage(name), PACKAGE_LIMIT, SLOW)
          .then(() => {
            if (!py.loadedPackages[name]) throw new Error(`Could not download ${name}. Check your internet connection and try again.`);
            status.packages[name] = 'ready';
          })
          .catch((e) => {
            status.packages[name] = 'failed';
            if (packagePromises[name] === p) delete packagePromises[name];
            if (e.message === SLOW) dropPython(py);
            throw e;
          });
        packagePromises[name] = p;
      }
      return packagePromises[name];
    }),
  );
}

// Python plus these packages, ready to use. Safe to call any number of times.
export async function ensurePython(packages = []) {
  const py = await loadPython();
  await loadPackages(py, packages);
  return py;
}

// Background version for preloading. A failure (say, the connection dropped) is tried again once
// the browser is back online; code screens also retry and report it themselves.
export function preloadPython(packages = []) {
  ensurePython(packages).catch(() => {
    window.addEventListener('online', () => preloadPython(packages), { once: true });
  });
}

// What has loaded so far (for checks and testing).
export const pythonStatus = () => JSON.parse(JSON.stringify(status));
