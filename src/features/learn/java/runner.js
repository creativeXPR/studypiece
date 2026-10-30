// Talks to StudyPiece's Java runner (java-runner/, on Cloud Run). Only the source text
// goes up and only the output comes back, so runs are quick even on slow connections.
// Requests carry the learner's Firebase sign-in token; a dev key in localStorage
// (`studypiece.runnerKey`) works instead when testing without signing in.

const RUNNER = import.meta.env.VITE_JAVA_RUNNER || 'https://java-runner-584031052691.europe-west1.run.app';

let woken = false;

/** Starts the server early (a cold start takes a few seconds) while the learner reads. */
export function wakeRunner() {
  if (woken) return;
  woken = true;
  fetch(`${RUNNER}/health`, { cache: 'no-store' }).catch(() => {
    woken = false;
  });
}

async function headers() {
  const h = { 'Content-Type': 'application/json' };
  try {
    const key = localStorage.getItem('studypiece.runnerKey');
    if (key) h['X-Runner-Key'] = key;
  } catch {
    /* storage blocked: fall back to the sign-in token */
  }
  if (!h['X-Runner-Key']) {
    const { auth } = await import('../../../lib/firebase');
    const token = await auth.currentUser?.getIdToken();
    if (token) h.Authorization = `Bearer ${token}`;
  }
  return h;
}

async function post(body) {
  let res;
  try {
    res = await fetch(`${RUNNER}/run`, { method: 'POST', headers: await headers(), body: JSON.stringify(body) });
  } catch {
    throw new Error('Couldn’t reach the Java runner. Check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `The Java runner said no (${res.status}). Try again in a moment.`);
  return data;
}

/** Compiles and runs `main`. Resolves { compiled, log, out, timedOut, ms }. */
export function runJava(files, main, { stdin } = {}) {
  return post({ files, main, mode: 'run', stdin });
}

/** Compiles the files plus the generated test class and returns its report. */
export async function testJava(files, testSource) {
  const r = await post({ files: { ...files, '__Tests.java': testSource }, main: '__Tests', mode: 'test' });
  if (!r.compiled) return r;
  let results = null;
  try {
    results = JSON.parse(r.report);
  } catch {
    /* the test class crashed before writing its report */
  }
  return { ...r, results };
}

/** Runs a Swing program on the server's virtual display; `images` are PNG pictures of its windows. */
export function swingJava(files, main) {
  return post({ files, main, mode: 'swing' });
}
