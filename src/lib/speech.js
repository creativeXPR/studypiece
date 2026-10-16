// Text-to-speech on the browser's built-in voices (Web Speech API).

export const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

const GREEK = 'alpha beta gamma delta epsilon theta lambda mu pi rho sigma tau phi chi psi omega'.split(' ');

const LATEX_WORDS = {
  times: ' times ',
  cdot: ' times ',
  div: ' divided by ',
  pm: ' plus or minus ',
  le: ' less than or equal to ',
  leq: ' less than or equal to ',
  ge: ' greater than or equal to ',
  geq: ' greater than or equal to ',
  neq: ' not equal to ',
  approx: ' approximately ',
  infty: ' infinity ',
  int: ' the integral of ',
  sum: ' the sum of ',
  to: ' to ',
  rightarrow: ' gives ',
  Rightarrow: ' implies ',
  therefore: ' therefore ',
  ldots: ' and so on ',
  cdots: ' and so on ',
  circ: ' degrees ',
  log: ' log ',
  ln: ' natural log ',
  sin: ' sine ',
  cos: ' cosine ',
  tan: ' tan ',
};

// Turns one LaTeX expression into words a voice can read.
function latexToWords(tex) {
  let s = tex
    .replace(/\\int_\{?([^{}\s^]+)\}?\^\{?([^{}\s]+)\}?/g, ' the integral from $1 to $2 of ')
    .replace(/\\sum_\{([^{}]*)\}\^\{?([^{}\s]+)\}?/g, ' the sum from $1 to $2 of ');
  // Innermost-first so nested fractions and roots unwrap correctly.
  for (let i = 0; i < 10; i++) {
    const before = s;
    s = s
      .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, ' ($1 over $2) ')
      .replace(/\\sqrt\{([^{}]*)\}/g, ' the square root of ($1) ')
      .replace(/\^\{\\circ\}|\^\\circ/g, ' degrees ')
      .replace(/\^\{?2\}?(?![0-9])/g, ' squared ')
      .replace(/\^\{?3\}?(?![0-9])/g, ' cubed ')
      .replace(/\^\{([^{}]*)\}/g, ' to the power ($1) ')
      .replace(/\^(\w)/g, ' to the power $1 ')
      .replace(/_\{([^{}]*)\}/g, ' $1 ')
      .replace(/_(\w)/g, ' $1 ')
      .replace(/\\(?:text|mathrm|mathbf|operatorname|vec|overline|bar|hat)\{([^{}]*)\}/g, ' $1 ');
    if (s === before) break;
  }
  return s
    .replace(/\\left|\\right|\\[,;:! ]|\\quad|\\qquad/g, ' ')
    .replace(/\\%/g, ' percent ')
    .replace(/\\([A-Za-z]+)/g, (_, cmd) => LATEX_WORDS[cmd] ?? (GREEK.includes(cmd.toLowerCase()) ? ` ${cmd} ` : ` ${cmd} `))
    .replace(/[{}]/g, ' ')
    .replace(/=/g, ' equals ')
    .replace(/</g, ' less than ')
    .replace(/>/g, ' greater than ')
    .replace(/\+/g, ' plus ')
    .replace(/(^|\s|\()-/g, '$1 minus ')
    .replace(/(\w|\))\s*-\s*(?=[\w(])/g, '$1 minus ')
    .replace(/\*/g, ' times ')
    .replace(/\//g, ' over ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Converts question/answer text (with $…$ math and intonation arrows) into plain speech.
export function toSpeakable(text) {
  return String(text ?? '')
    .replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (_, display, inline) => ` ${latexToWords(display ?? inline)} `)
    .replace(/↗↘/g, ' rise-fall on ')
    .replace(/↘↗/g, ' fall-rise on ')
    .replace(/↗/g, ' rising on ')
    .replace(/↘/g, ' falling on ')
    .replace(/[“”"]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Chrome stops speaking long utterances after ~15s, so text goes out sentence by sentence.
function chunk(text) {
  const parts = [];
  for (const sentence of text.split(/(?<=[.!?;:])\s+/)) {
    if (sentence.length <= 180) {
      if (sentence) parts.push(sentence);
      continue;
    }
    let rest = sentence;
    while (rest.length > 180) {
      const cut = rest.lastIndexOf(',', 180) > 60 ? rest.lastIndexOf(',', 180) + 1 : rest.lastIndexOf(' ', 180);
      parts.push(rest.slice(0, cut > 0 ? cut : 180));
      rest = rest.slice(cut > 0 ? cut : 180).trim();
    }
    if (rest) parts.push(rest);
  }
  return parts;
}

let generation = 0;

/**
 * Speaks `text`, replacing anything currently being read.
 * Resolves true when it finished, false if it was stopped or replaced.
 */
export function speak(text, { rate = 1 } = {}) {
  if (!speechSupported) return Promise.resolve(false);
  const id = ++generation;
  window.speechSynthesis.cancel();
  const parts = chunk(toSpeakable(text));
  return new Promise((resolve) => {
    let i = 0;
    const next = () => {
      if (id !== generation) return resolve(false);
      if (i >= parts.length) return resolve(true);
      const utterance = new SpeechSynthesisUtterance(parts[i++]);
      utterance.rate = rate;
      utterance.lang = 'en-GB';
      utterance.onend = next;
      utterance.onerror = () => resolve(false);
      try {
        window.speechSynthesis.speak(utterance);
      } catch {
        resolve(false); // a broken speech engine must not leave free flow hanging
      }
    };
    // A short gap after cancel() avoids a Chrome bug where the next utterance is dropped.
    setTimeout(next, 60);
  });
}

export function stopSpeaking() {
  generation++;
  if (speechSupported) window.speechSynthesis.cancel();
}
