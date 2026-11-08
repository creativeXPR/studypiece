// Widgets for ACP (academic papers) lessons.
//
// fermat: a Fermat-test bench. The student types a number (or taps a preset) and sees 2^N mod N,
// the verdict (fails = surely composite; passes = prime or a liar) and the prime factors. With
// `fingerprint`, each odd prime factor of an even liar also shows p mod 8, the order of 2 mod p and
// N mod p·order, the facts a paper proves about them. The screen is done once every kind listed in
// `need` has been seen: 'fail', 'prime', 'liar' (an odd pseudoprime), 'even' (an even pseudoprime).
//
// config: { presets: [numbers], need: [kinds], fingerprint?: true, max?: largest N allowed }
import { useEffect, useState } from 'react';
import { Inline } from './Rich';

const LIMIT = 1e12;

function powMod(base, exp, mod) {
  let r = 1n;
  let b = BigInt(base) % BigInt(mod);
  let e = BigInt(exp);
  const m = BigInt(mod);
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return Number(r);
}

function factor(n) {
  const out = [];
  let rest = n;
  for (let p = 2; p * p <= rest; p += p === 2 ? 1 : 2) {
    while (rest % p === 0) {
      out.push(p);
      rest /= p;
    }
  }
  if (rest > 1) out.push(rest);
  return out;
}

// Order of 2 mod an odd prime p: the smallest k with 2^k ≡ 1. It divides p − 1, so try divisors.
function order2(p) {
  const q = p - 1;
  const divs = [];
  for (let d = 1; d * d <= q; d++) {
    if (q % d === 0) divs.push(d, q / d);
  }
  return divs.sort((a, b) => a - b).find((d) => powMod(2, d, p) === 1);
}

function judge(n) {
  const r = powMod(2, n, n);
  const f = factor(n);
  const prime = f.length === 1;
  let kind = 'fail';
  if (r === 2 % n) kind = prime ? 'prime' : n % 2 === 0 ? 'even' : 'liar';
  return { n, r, f, kind };
}

const VERDICT = {
  fail: ['Fails the test', 'So $N$ is certainly **composite**.'],
  prime: ['Passes', '$N$ is **prime**, as the test suggests.'],
  liar: ['Passes, but composite', 'A **pseudoprime**: a composite that fools the test.'],
  even: ['Passes, but even', 'An **even pseudoprime**: one of the rare even liars.'],
};
const LABEL = { fail: 'a failure', prime: 'a prime', liar: 'a liar', even: 'an even liar' };

const fmt = (n) => n.toLocaleString('en-US');

export function FermatBench({ api, config: g }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [seen, setSeen] = useState([]);
  const need = g.need ?? [];
  const max = g.max ?? LIMIT;
  const complete = need.every((k) => seen.includes(k));

  const run = (raw) => {
    const n = Number(String(raw).replace(/[,\s]/g, ''));
    if (!Number.isInteger(n) || n < 3 || n > max) {
      setError(`Enter a whole number from 3 to ${fmt(max)}.`);
      setResult(null);
      return;
    }
    const res = judge(n);
    setError('');
    setValue(String(n));
    setResult(res);
    setSeen((s) => (s.includes(res.kind) ? s : [...s, res.kind]));
  };

  useEffect(() => {
    if (complete) api.done();
    else api.setAction('Test it', value.trim() !== '', () => run(value));
  });

  const odd = result ? [...new Set(result.f.filter((p) => p !== 2))] : [];
  return (
    <div className="tut-fermat">
      <div className="tut-fermat-row">
        <input
          className="tut-calc-input"
          inputMode="numeric"
          autoComplete="off"
          placeholder="A number N"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim()) run(value);
          }}
          aria-label="Number to test"
        />
      </div>
      {g.presets && (
        <div className="tut-fermat-chips" role="group" aria-label="Try these">
          {g.presets.map((n) => (
            <button key={n} type="button" className={result?.n === n ? 'on' : ''} onClick={() => run(n)}>
              {fmt(n)}
            </button>
          ))}
        </div>
      )}
      {error && <p className="tut-calc-hint" role="status">{error}</p>}
      {result && (
        <div className={`tut-fermat-out ${result.kind}`} role="status" key={result.n}>
          <p className="tut-fermat-calc">
            <Inline text={`$2^{${result.n}} \\bmod ${result.n} = ${result.r}$`} />
          </p>
          <p className="tut-fermat-verdict">
            <b>{VERDICT[result.kind][0]}.</b> <Inline text={VERDICT[result.kind][1]} />
          </p>
          <p className="tut-fermat-factors">
            <Inline text={`$${result.n} = ${result.f.join(' \\cdot ')}$`} />
          </p>
          {g.fingerprint && result.kind === 'even' && (
            <table className="tut-fermat-table">
              <thead>
                <tr>
                  <th>p</th>
                  <th>p mod 8</th>
                  <th>order of 2</th>
                  <th>N mod p·order</th>
                </tr>
              </thead>
              <tbody>
                {odd.map((p) => {
                  const l = order2(p);
                  return (
                    <tr key={p}>
                      <td>{fmt(p)}</td>
                      <td>{p % 8}</td>
                      <td>{l}</td>
                      <td>{fmt(result.n % (p * l))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
      {need.length > 0 && (
        <ul className="tut-fermat-goals" aria-label="Find these">
          {need.map((k) => (
            <li key={k} className={seen.includes(k) ? 'got' : ''}>
              {seen.includes(k) ? '✓ ' : ''}Find {LABEL[k]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
