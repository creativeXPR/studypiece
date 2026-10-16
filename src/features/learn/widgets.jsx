import { useEffect, useId, useRef, useState } from 'react';
import { burstAt } from './fx';
import { Inline } from './Rich';

// One-off interactive pieces used by `type: 'custom'` screens (`widget: 'venn'`).
// Each gets the lesson api and calls api.done() once the learner has explored enough.

function Venn({ api }) {
  const [active, setActive] = useState(null);
  const [seen, setSeen] = useState([]);
  const info = {
    power: {
      title: 'Power',
      text: 'Influence backed by sanctions. B complies because A can punish or reward. Example: the Hall Warden fines anyone who skips the hall meeting, so everyone attends.',
    },
    inf: {
      title: 'Influence without power',
      text: 'No threat, no force. B changes because of A anyway. Example: a popular final-year student raves about a new jollof spot, and half the hall eats there by Friday. Nobody would be punished for not going.',
    },
  };

  useEffect(() => {
    if (seen.length === 2) api.done();
    else api.setAction(seen.length ? 'Now tap the other zone' : 'Tap both zones', false);
  }, [seen, api]);

  const pick = (k) => {
    setActive(k);
    setSeen((s) => (s.includes(k) ? s : [...s, k]));
  };
  const keys = (k) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(k);
    }
  };

  return (
    <div className="tut-venn">
      <svg viewBox="0 0 360 230" role="group" aria-label="Diagram: power sits inside the larger circle of influence">
        <g className={`tut-zone${active === 'inf' ? ' on' : ''}`} tabIndex={0} role="button" aria-label="Influence zone"
          onClick={() => pick('inf')} onKeyDown={keys('inf')}>
          <circle cx="180" cy="115" r="104" className="tut-f-soft tut-s" strokeDasharray="6 5" />
          <text x="180" y="44" fontSize="14" textAnchor="middle" className="tut-t">INFLUENCE</text>
        </g>
        <g className={`tut-zone${active === 'power' ? ' on' : ''}`} tabIndex={0} role="button" aria-label="Power zone"
          onClick={(e) => { e.stopPropagation(); pick('power'); }} onKeyDown={keys('power')}>
          <circle cx="180" cy="138" r="52" className="tut-f-yellow tut-s" strokeDasharray="6 5" />
          <text x="180" y="136" fontSize="14" textAnchor="middle" className="tut-t">POWER</text>
          <text x="180" y="154" fontSize="10" textAnchor="middle" className="tut-t-soft">has sanctions</text>
        </g>
      </svg>
      <div className="tut-panel" aria-live="polite" key={active ?? 'none'}>
        {active ? (
          <>
            <strong>{info[active].title}.</strong> {info[active].text}
          </>
        ) : (
          'Tap each zone to see what lives there.'
        )}
      </div>
    </div>
  );
}

function LegitimacyMeter({ api }) {
  const N = 24;
  const [value, setValue] = useState(60);
  const [touched, setTouched] = useState(false);
  const anim = useRef(0);

  useEffect(() => {
    if (touched) api.done();
    else api.setAction('Move the slider or trigger an event', false);
  }, [touched, api]);
  useEffect(() => () => cancelAnimationFrame(anim.current), []);

  const animateTo = (target) => {
    cancelAnimationFrame(anim.current);
    const from = value;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 700);
      setValue(Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) anim.current = requestAnimationFrame(step);
    };
    anim.current = requestAnimationFrame(step);
    setTouched(true);
  };

  const willing = Math.round((N * value) / 100);
  const refuse = value < 50 ? Math.min(N - willing, Math.round(((50 - value) / 50) * N * 0.6)) : 0;
  const state =
    value >= 70
      ? ['Authority', 'Most students follow Dayo willingly. No threats needed: power has become authority.']
      : value >= 35
        ? ['Shaky', 'Students comply, but many grumble. Dayo now leans on warnings and fines to get things done.']
        : ['Power without legitimacy', 'Few believe Dayo has the right to lead. Obedience has to be forced, and some students openly refuse.'];

  return (
    <div className="tut-meter">
      <div className="tut-crowd" aria-hidden="true">
        {Array.from({ length: N }, (_, i) => (
          <span key={i} className={`tut-stu ${i < willing ? 'w' : i < N - refuse ? 'g' : 'r'}`} />
        ))}
      </div>
      <p className="tut-state" aria-live="polite">
        <strong>{state[0]}</strong>
        {state[1]}
      </p>
      <label className="tut-range-label" htmlFor="legit">
        <span>How much do students believe Dayo has the right to lead?</span>
        <output htmlFor="legit">{value}%</output>
      </label>
      <input id="legit" className="tut-range" type="range" min="0" max="100" value={value}
        onChange={(e) => { setValue(Number(e.target.value)); setTouched(true); }} />
      <div className="tut-events">
        <button type="button" className="tut-event down" onClick={() => animateTo(Math.max(5, value - 45))}>
          <b>Event</b>₦2.4m in hall dues goes missing under Dayo’s watch
        </button>
        <button type="button" className="tut-event up" onClick={() => animateTo(Math.min(100, value + 30))}>
          <b>Event</b>Dayo holds a town hall and drops the unpopular gate fee
        </button>
      </div>
      <div className="tut-legend">
        <span style={{ '--c': 'var(--good)' }}>obeys willingly</span>
        <span style={{ '--c': 'var(--tut-yellow)' }}>obeys, grumbling</span>
        <span style={{ '--c': 'var(--bad)' }}>refuses</span>
      </div>
    </div>
  );
}

const ELEMENTS = [
  { id: 'population', label: 'Population', kind: 'Physical', missing: 'No people, no state. Just empty land.' },
  { id: 'territory', label: 'Defined territory', kind: 'Physical', missing: 'A people with no land of their own, like a group living in exile, is not yet a state.' },
  { id: 'government', label: 'Functional government', kind: 'Spiritual', missing: 'Without government, “the soul of the state”, nothing can be decided or enforced.' },
  { id: 'sovereignty', label: 'Sovereignty', kind: 'Spiritual', missing: 'If a foreign power has the final say, it is a colony or dependency, not a sovereign state.' },
];

function StateBuilder({ api }) {
  const [on, setOn] = useState([]);
  const flagRef = useRef(null);
  const complete = on.length === ELEMENTS.length;

  useEffect(() => {
    if (complete) {
      burstAt(flagRef.current, 30);
      api.done();
    } else api.setAction(`Add ${ELEMENTS.length - on.length} more element${ELEMENTS.length - on.length === 1 ? '' : 's'}`, false);
  }, [complete, on.length, api]);

  const firstMissing = ELEMENTS.find((e) => !on.includes(e.id));
  const toggle = (id) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  return (
    <div className="tut-builder">
      <div className={`tut-build-stage${complete ? ' complete' : ''}`}>
        <svg viewBox="0 0 320 150" role="img" aria-label={complete ? 'A complete state' : 'An incomplete state'}>
          <rect width="320" height="150" className="tut-f-sea" />
          <g className={`tut-layer${on.includes('territory') ? ' in' : ''}`}>
            <ellipse cx="160" cy="112" rx="120" ry="28" className="tut-f-sand tut-s" />
            <path d="M80 104 Q110 60 140 102Z M170 104 Q200 70 236 104Z" className="tut-f-ground tut-s" />
          </g>
          <g className={`tut-layer${on.includes('population') ? ' in' : ''}`}>
            {[110, 135, 185, 210].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy="98" r="5" className={i % 2 ? 'tut-f-skin2' : 'tut-f-skin1'} />
                <rect x={x - 6} y="104" width="12" height="9" rx="4" className={['tut-f-c1', 'tut-f-c2', 'tut-f-c3', 'tut-f-c1'][i]} />
              </g>
            ))}
          </g>
          <g className={`tut-layer${on.includes('government') ? ' in' : ''}`}>
            <rect x="146" y="70" width="28" height="22" className="tut-f-wall tut-s" />
            <path d="M142 70 L160 58 L178 70Z" className="tut-f-primary tut-s" />
          </g>
          <g ref={flagRef} className={`tut-layer${on.includes('sovereignty') ? ' in' : ''}`}>
            <path d="M160 58 V22" className="tut-s" strokeWidth="2.5" />
            <path d="M160 22 h30 l-6 8 6 8 h-30z" className="tut-f-yellow tut-s tut-wave" />
          </g>
        </svg>
        <p className="tut-build-status" aria-live="polite">
          {complete ? (
            <><strong>It’s a state.</strong> All four elements are present.</>
          ) : (
            <><strong>Not a state yet.</strong> {firstMissing.missing}</>
          )}
        </p>
      </div>
      <div className="tut-toggles">
        {ELEMENTS.map((e) => (
          <button key={e.id} type="button" className={`tut-toggle${on.includes(e.id) ? ' on' : ''}`}
            aria-pressed={on.includes(e.id)} onClick={() => toggle(e.id)}>
            <span className="tut-toggle-dot" />
            <span>
              <strong>{e.label}</strong>
              <small>{e.kind} element</small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

const NEIGHBOURS = ['Tolu', 'Seyi', 'Bisi', 'Kunle', 'Ada', 'Femi', 'Zainab', 'Chidi', 'Ife'];
const FUEL_COST = 5000;
const SHARE = 500;

// Laver's collective-action problem: everyone wants the generator on, few chip in voluntarily.
function CollectiveAction({ api }) {
  const [mode, setMode] = useState('voluntary');
  const [youPay, setYouPay] = useState(true);
  const [night, setNight] = useState(0);
  const [tried, setTried] = useState(['voluntary']);
  const barRef = useRef(null);

  // Voluntary nights: 2–4 neighbours pay, rotating so it feels lived-in, not random.
  const payers = mode === 'levy' ? NEIGHBOURS.length : 2 + (night % 3);
  const neighbourPays = (i) => mode === 'levy' || (i * 7 + night * 3) % NEIGHBOURS.length < payers;
  const paidCount = NEIGHBOURS.filter((_, i) => neighbourPays(i)).length + (mode === 'levy' || youPay ? 1 : 0);
  const collected = paidCount * SHARE;
  const lightsOn = collected >= FUEL_COST;

  useEffect(() => {
    if (tried.length === 2) api.done();
    else api.setAction('Now try the hall levy', false);
  }, [tried, api]);
  useEffect(() => {
    if (lightsOn) burstAt(barRef.current, 16);
  }, [lightsOn]);

  const pick = (m) => {
    setMode(m);
    setTried((t) => (t.includes(m) ? t : [...t, m]));
  };

  return (
    <div className="tut-ca">
      <div className="tut-seg-control" role="tablist" aria-label="How is fuel paid for?">
        <button type="button" role="tab" aria-selected={mode === 'voluntary'} className={mode === 'voluntary' ? 'on' : ''} onClick={() => pick('voluntary')}>
          Voluntary
        </button>
        <button type="button" role="tab" aria-selected={mode === 'levy'} className={mode === 'levy' ? 'on' : ''} onClick={() => pick('levy')}>
          Hall levy (enforced)
        </button>
      </div>

      <div className={`tut-ca-stage${lightsOn ? ' on' : ''}`}>
        <div className="tut-ca-people">
          <span className={`tut-ca-person you ${mode === 'levy' || youPay ? 'paid' : 'skip'}`}>
            <i />You
          </span>
          {NEIGHBOURS.map((n, i) => (
            <span key={n} className={`tut-ca-person ${neighbourPays(i) ? 'paid' : 'skip'}`}>
              <i />{n}
            </span>
          ))}
        </div>
        <div className="tut-ca-bar" ref={barRef} aria-hidden="true">
          <span style={{ width: `${Math.min(100, (collected / FUEL_COST) * 100)}%` }} />
        </div>
        <p className="tut-ca-status" aria-live="polite">
          <strong>
            ₦{collected.toLocaleString()} of ₦{FUEL_COST.toLocaleString()}
          </strong>{' '}
          {lightsOn
            ? mode === 'levy'
              ? 'Everyone pays, so the generator runs. Nobody can free-ride.'
              : 'Enough tonight, but only because a few people carried everyone.'
            : `Not enough fuel. Lights out for all ${NEIGHBOURS.length + 1} rooms, including those who paid.`}
        </p>
      </div>

      {mode === 'voluntary' && (
        <div className="tut-ca-controls">
          <button type="button" className={`tut-toggle${youPay ? ' on' : ''}`} aria-pressed={youPay} onClick={() => setYouPay((v) => !v)}>
            <span className="tut-toggle-dot" />
            <span>
              <strong>You chip in ₦{SHARE}</strong>
              <small>{youPay ? 'You’re paying' : 'You’re free-riding'}</small>
            </span>
          </button>
          <button type="button" className="tut-event" onClick={() => setNight((n) => n + 1)}>
            <b>Next night</b>See who pays this time
          </button>
        </div>
      )}
    </div>
  );
}

const DISTRIBUTION = {
  unitary: {
    label: 'Unitary',
    centre: 90,
    where: 'One central government holds the power. Units are only deconcentrated: no legal existence or taxing power of their own, and they exist at the centre’s mercy.',
    why: 'Homogeneous people, small size, willingness to drop differences.',
    examples: 'Ghana, Britain, France, Kenya',
    weakness: null,
  },
  federal: {
    label: 'Federal',
    centre: 55,
    where: 'The constitution divides power between levels. Each is independent and coordinate in its own sphere (K.C. Wheare, 1953).',
    why: 'Fear of insecurity, heterogeneous people, geographical contiguity, common colonial heritage, even development, common defence.',
    examples: 'Nigeria (FG, 36 states, 774 LGAs, FCT), USA, Brazil, India, Germany',
    weakness: 'Over-centralisation at the centre.',
  },
  confederal: {
    label: 'Confederal',
    centre: 20,
    where: 'A league of sovereign states with a weak centre. The units keep their sovereignty and can walk away.',
    why: 'Cooperation, more autonomy for units, even development.',
    examples: 'USA under the Articles of Confederation (1781–1789), German confederation (1815)',
    weakness: 'The least stable and weakest form; prone to secession.',
  },
};

function PowerDistribution({ api }) {
  const [form, setForm] = useState('unitary');
  const [seen, setSeen] = useState(['unitary']);
  const d = DISTRIBUTION[form];

  useEffect(() => {
    if (seen.length === 3) api.done();
    else api.setAction(`Try ${3 - seen.length} more`, false);
  }, [seen, api]);

  const pick = (f) => {
    setForm(f);
    setSeen((s) => (s.includes(f) ? s : [...s, f]));
  };
  const unitR = form === 'unitary' ? 0.7 : form === 'federal' ? 1 : 1.25;
  const centreR = form === 'unitary' ? 1.35 : form === 'federal' ? 1 : 0.6;

  return (
    <div className="tut-pd">
      <div className="tut-seg-control three" role="tablist" aria-label="Pattern of power distribution">
        {Object.entries(DISTRIBUTION).map(([k, v]) => (
          <button key={k} type="button" role="tab" aria-selected={form === k} className={form === k ? 'on' : ''} onClick={() => pick(k)}>
            {v.label}
          </button>
        ))}
      </div>
      <div className={`tut-pd-stage ${form}`}>
        <svg viewBox="0 0 320 170" role="img" aria-label={`${d.label}: the centre holds about ${d.centre}% of the power`}>
          {[[60, 50], [260, 50], [60, 130], [260, 130]].map(([x, y], i) => (
            <g key={i} className={`tut-pd-unit${form === 'confederal' && i === 1 ? ' drift' : ''}`}>
              <line x1="160" y1="90" x2={x} y2={y} className={`tut-pd-link ${form}`} />
              <g transform={`translate(${x} ${y})`}>
                <circle r="22" className="tut-f-c1 tut-s tut-pd-grow" style={{ transform: `scale(${unitR})` }} />
              </g>
            </g>
          ))}
          <g transform="translate(160 90)">
            <g className="tut-pd-grow" style={{ transform: `scale(${centreR})` }}>
              <circle r="30" className="tut-f-primary tut-s" />
              <text y="4" fontSize="11" textAnchor="middle" className="tut-t-white">CENTRE</text>
            </g>
          </g>
          {form === 'federal' && (
            <g className="tut-pd-const">
              <rect x="112" y="140" width="96" height="22" rx="5" className="tut-f-yellow tut-s" />
              <text x="160" y="155" fontSize="10" textAnchor="middle" className="tut-t">CONSTITUTION</text>
            </g>
          )}
        </svg>
        <div className="tut-pd-bars" aria-hidden="true">
          <span>Centre</span>
          <div className="tut-pd-bar"><i style={{ width: `${d.centre}%` }} /></div>
          <span>Units</span>
          <div className="tut-pd-bar units"><i style={{ width: `${100 - d.centre}%` }} /></div>
        </div>
      </div>
      <dl className="tut-pd-facts" key={form}>
        <div><dt>Where power sits</dt><dd>{d.where}</dd></div>
        <div><dt>Why adopted</dt><dd>{d.why}</dd></div>
        <div><dt>Examples</dt><dd>{d.examples}</dd></div>
        {d.weakness && <div><dt>Weakness</dt><dd>{d.weakness}</dd></div>}
      </dl>
    </div>
  );
}

const ZOOM = [
  { label: 'Tunde', count: 1, jobless: 1, text: 'Tunde, a graduate in Ibadan, lost his job. He blames himself: “Maybe I’m just not good enough.”', tag: 'Private trouble' },
  { label: 'His street', count: 12, jobless: 4, text: 'Three of his neighbours are also out of work, all with good degrees.', tag: 'Hmm…' },
  { label: 'His city', count: 48, jobless: 15, text: 'Across the city, thousands of graduates are job hunting at the same time.', tag: 'A pattern' },
  { label: 'The country', count: 120, jobless: 38, text: 'Unemployment is rising nationwide. The cause lies in the economy and society, not in Tunde’s character.', tag: 'Public issue' },
];

// C. Wright Mills: personal troubles only make sense against wider social forces.
function Imagination({ api }) {
  const [stop, setStop] = useState(0);
  const [maxSeen, setMaxSeen] = useState(0);
  const z = ZOOM[stop];

  useEffect(() => {
    if (maxSeen === ZOOM.length - 1) api.done();
    else api.setAction('Zoom all the way out', false);
  }, [maxSeen, api]);

  const go = (v) => {
    setStop(v);
    setMaxSeen((m) => Math.max(m, v));
  };

  return (
    <div className="tut-zoom">
      <div className="tut-zoom-stage">
        <span className={`tut-zoom-tag${stop === ZOOM.length - 1 ? ' issue' : ''}`} key={z.tag}>{z.tag}</span>
        <div className={`tut-zoom-dots n${stop}`} aria-hidden="true">
          {Array.from({ length: z.count }, (_, i) => (
            // (i * 7) % count shuffles evenly (7 shares no factor with any count), so jobless dots scatter like a crowd.
            <i key={`${stop}-${i}`} className={(i * 7) % z.count < z.jobless ? 'j' : ''} style={{ '--i': i }} />
          ))}
        </div>
        <p className="tut-zoom-text" aria-live="polite" key={stop}>{z.text}</p>
      </div>
      <label className="tut-range-label" htmlFor="zoom">
        <span>Zoom out</span>
        <output htmlFor="zoom">{z.label}</output>
      </label>
      <input id="zoom" className="tut-range" type="range" min="0" max={ZOOM.length - 1} step="1" value={stop}
        onChange={(e) => go(Number(e.target.value))} />
      <div className="tut-zoom-ticks" aria-hidden="true">
        {ZOOM.map((s, i) => (
          <button key={s.label} type="button" tabIndex={-1} className={i === stop ? 'on' : ''} onClick={() => go(i)}>{s.label}</button>
        ))}
      </div>
      <p className="tut-hint">Illustration only, not real figures.</p>
    </div>
  );
}

const DURKHEIM = [
  { q: 'Who had the higher suicide rate?', a: 'Married people', b: 'Unmarried people', higher: 'b', why: 'Unmarried people had higher rates. Marriage ties a person into a group: family, obligations, belonging.' },
  { q: 'Which country had the higher suicide rate, according to your notes?', a: 'England', b: 'France', higher: 'a', why: 'Your notes report England higher than France. Rates differed between countries in stable, measurable ways.' },
];

// Durkheim's Suicide (1897): even the most "individual" act follows social patterns.
function Durkheim({ api }) {
  const [answers, setAnswers] = useState({});
  const done = Object.keys(answers).length === DURKHEIM.length;
  const barsRef = useRef([]);

  useEffect(() => {
    if (done) api.done();
    else api.setAction('Make both predictions', false);
  }, [done, api]);

  const predict = (k, side) => {
    if (answers[k]) return;
    setAnswers((a) => ({ ...a, [k]: side }));
    if (side === DURKHEIM[k].higher) burstAt(barsRef.current[k], 14);
  };

  return (
    <div className="tut-dk">
      {DURKHEIM.map((d, k) => {
        const ans = answers[k];
        return (
          <div key={k} className="tut-dk-card" style={{ '--i': k }}>
            <p className="tut-dk-q"><strong>{d.q}</strong></p>
            <div className="tut-dk-bars" ref={(el) => (barsRef.current[k] = el)}>
              {['a', 'b'].map((side) => (
                <button key={side} type="button" disabled={!!ans}
                  className={`tut-dk-bar${ans ? ' shown' : ''}${ans === side ? ' picked' : ''}${ans && d.higher === side ? ' high' : ''}`}
                  onClick={() => predict(k, side)}>
                  <span className="tut-dk-fill" />
                  <span className="tut-dk-label">{d[side]}</span>
                  {ans && <small>{d.higher === side ? 'Higher' : 'Lower'}</small>}
                </button>
              ))}
            </div>
            {ans && (
              <p className={`tut-dk-result ${ans === d.higher ? 'good' : 'bad'}`}>
                <strong>{ans === d.higher ? 'You predicted it.' : 'Not what you expected.'}</strong> {d.why}
              </p>
            )}
          </div>
        );
      })}
      {done && (
        <p className="tut-state">
          <strong>Durkheim’s key factor</strong>The degree of integration into social groups.
        </p>
      )}
    </div>
  );
}

/* ---------- chapter 6: statistics ---------- */
const AGE_MIN = 16;
const AGE_MAX = 40;

function stats(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const median = sorted[Math.floor(sorted.length / 2)];
  const counts = {};
  values.forEach((v) => (counts[v] = (counts[v] || 0) + 1));
  const top = Math.max(...Object.values(counts));
  const modes = top > 1 ? Object.keys(counts).filter((k) => counts[k] === top).map(Number) : [];
  return { sorted, mean, median, modes, range: sorted.at(-1) - sorted[0] };
}

// The notes' worked example (ages 22, 18, 32, 18, 25), made editable.
function Averages({ api }) {
  const [ages, setAges] = useState([22, 18, 32, 18, 25]);
  const [moves, setMoves] = useState(0);
  const st = stats(ages);
  const reachedExtreme = ages.includes(AGE_MAX);

  useEffect(() => {
    if (moves >= 3 || reachedExtreme) api.done();
    else api.setAction('Change a few ages first', false);
  }, [moves, reachedExtreme, api]);

  const bump = (i, d) => {
    setAges((a) => a.map((v, k) => (k === i ? Math.max(AGE_MIN, Math.min(AGE_MAX, v + d)) : v)));
    setMoves((m) => m + 1);
  };

  const x = (v) => 20 + ((v - AGE_MIN) / (AGE_MAX - AGE_MIN)) * 300;
  const stacks = {};

  return (
    <div className="tut-avg">
      <div className="tut-avg-stage">
        <svg viewBox="0 0 340 120" role="img" aria-label={`Ages on a number line. Mean ${st.mean.toFixed(1)}, median ${st.median}`}>
          <line x1="20" y1="80" x2="320" y2="80" className="tut-avg-axis" />
          {[16, 20, 24, 28, 32, 36, 40].map((t) => (
            <g key={t}>
              <line x1={x(t)} y1="77" x2={x(t)} y2="83" className="tut-avg-axis" />
              <text x={x(t)} y="98" fontSize="10" textAnchor="middle" className="tut-t-soft">{t}</text>
            </g>
          ))}
          {ages.map((v, i) => {
            stacks[v] = (stacks[v] || 0) + 1;
            return <circle key={i} cx={x(v)} cy={80 - stacks[v] * 13} r="6" className="tut-avg-dot" />;
          })}
          <g className="tut-avg-mark mean" style={{ transform: `translateX(${x(st.mean)}px)` }}>
            <path d="M0 104 l-6 10 h12z" /><text y="22" fontSize="10" textAnchor="middle">mean</text>
          </g>
          <g className="tut-avg-mark median" style={{ transform: `translateX(${x(st.median)}px)` }}>
            <path d="M0 104 l-6 10 h12z" /><text y="10" fontSize="10" textAnchor="middle">median</text>
          </g>
        </svg>
      </div>
      <div className="tut-avg-people">
        {ages.map((v, i) => (
          <div key={i} className="tut-avg-person">
            <button type="button" aria-label={`Make person ${i + 1} younger`} onClick={() => bump(i, -1)} disabled={v <= AGE_MIN}>−</button>
            <strong key={v}>{v}</strong>
            <button type="button" aria-label={`Make person ${i + 1} older`} onClick={() => bump(i, 1)} disabled={v >= AGE_MAX}>+</button>
          </div>
        ))}
      </div>
      <dl className="tut-avg-stats">
        <div className="mean"><dt>Mean</dt><dd key={st.mean}>{Number.isInteger(st.mean) ? st.mean : st.mean.toFixed(1)}</dd></div>
        <div className="median"><dt>Median</dt><dd key={st.median}>{st.median}</dd></div>
        <div className="mode"><dt>Mode</dt><dd key={st.modes.join()}>{st.modes.length ? st.modes.join(', ') : 'none'}</dd></div>
        <div><dt>Range</dt><dd key={st.range}>{st.range}</dd></div>
      </dl>
      <p className="tut-hint">Ranked: {st.sorted.join(', ')}. Try pushing one person up to {AGE_MAX} and compare how far the mean and the median move.</p>
    </div>
  );
}

const MU = 30;

function curvePoints(sd, from, to) {
  const pts = [];
  for (let v = from; v <= to + 0.001; v += 0.5) {
    const y = 160 - 600 * (1 / sd) * Math.exp(-((v - MU) ** 2) / (2 * sd * sd));
    pts.push([10 + (v / 60) * 320, y]);
  }
  return pts;
}

// Standard deviation: about 68% within ±1 SD, 95% within ±2, nearly all within ±3.
function BellCurve({ api }) {
  const [sd, setSd] = useState(10);
  const [band, setBand] = useState(1);
  const [seen, setSeen] = useState([1]);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    if (moved && seen.length === 3) api.done();
    else api.setAction(!moved ? 'Move the slider' : 'Look at all three bands', false);
  }, [moved, seen, api]);

  const lo = Math.max(0, MU - band * sd);
  const hi = Math.min(60, MU + band * sd);
  const line = curvePoints(sd, 0, 60).map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
  const area = curvePoints(sd, lo, hi);
  const areaPath = `M${area[0][0]},160 ` + area.map(([px, py]) => `L${px.toFixed(1)},${py.toFixed(1)}`).join(' ') + ` L${area.at(-1)[0]},160 Z`;
  const pct = { 1: '68%', 2: '95%', 3: '99.7%' }[band];
  const pick = (b) => {
    setBand(b);
    setSeen((s) => (s.includes(b) ? s : [...s, b]));
  };

  return (
    <div className="tut-bell">
      <div className="tut-bell-stage">
        <svg viewBox="0 0 340 190" role="img" aria-label={`Normal curve, mean 30, standard deviation ${sd}; ${pct} of cases between ${MU - band * sd} and ${MU + band * sd}`}>
          <path d={areaPath} className={`tut-bell-area b${band}`} />
          <polyline points={line} className="tut-bell-line" />
          <line x1="10" y1="160" x2="330" y2="160" className="tut-avg-axis" />
          {[0, 10, 20, 30, 40, 50, 60].map((t) => (
            <text key={t} x={10 + (t / 60) * 320} y="176" fontSize="10" textAnchor="middle" className="tut-t-soft">{t}</text>
          ))}
          <line x1="170" y1="20" x2="170" y2="160" className="tut-bell-mean" />
          <text x="170" y="14" fontSize="10" textAnchor="middle" className="tut-t">mean 30</text>
        </svg>
        <p className="tut-bell-read" aria-live="polite" key={`${band}-${sd}`}>
          <strong>{pct}</strong> of people are aged <strong>{MU - band * sd}–{MU + band * sd}</strong>
          {band === 3 && ' (in practice, nearly everyone)'}
        </p>
      </div>
      <div className="tut-seg-control three" role="tablist" aria-label="Band">
        {[1, 2, 3].map((b) => (
          <button key={b} type="button" role="tab" aria-selected={band === b} className={band === b ? 'on' : ''} onClick={() => pick(b)}>
            ±{b} SD
          </button>
        ))}
      </div>
      <label className="tut-range-label" htmlFor="sd">
        <span>Standard deviation</span>
        <output htmlFor="sd">{sd} years</output>
      </label>
      <input id="sd" className="tut-range" type="range" min="4" max="14" value={sd}
        onChange={(e) => { setSd(Number(e.target.value)); setMoved(true); }} />
      <p className="tut-hint">Smaller SD: ages cluster tightly around 30. Larger SD: they spread out.</p>
    </div>
  );
}

const TESTS = {
  pearson: { name: 'Pearson correlation (r)', use: 'Strength and direction of the relationship between two continuous variables.', alt: 'Spearman’s rank order correlation (rho)' },
  partial: { name: 'Partial correlation', use: 'Pearson correlation while controlling for a confounding variable.', alt: null },
  regression: { name: 'Multiple regression', use: 'How well several independent variables predict one continuous dependent variable. Sample size rule: N > 50 + 8m.', alt: null },
  logistic: { name: 'Logistic regression', use: 'Predicts a categorical dependent variable. Sensitive to multicollinearity.', alt: null },
  factor: { name: 'Factor analysis', use: 'Condenses many items into a few factors, for scale development. Needs about 150+ cases.', alt: null },
  chi: { name: 'Chi-square', use: 'Relationship between two categorical variables. Every cell’s expected frequency should be at least 5.', alt: 'It is already non-parametric' },
  indT: { name: 'Independent-samples t-test', use: 'Compares the means of two different groups.', alt: 'Mann-Whitney U' },
  pairedT: { name: 'Paired-samples t-test', use: 'The same group measured twice, e.g. before and after.', alt: 'Wilcoxon signed rank' },
  anova1: { name: 'One-way between-groups ANOVA', use: 'Compares means of three or more different groups. Post hoc tests show where the difference is.', alt: 'Kruskal-Wallis' },
  anovaRm: { name: 'One-way repeated-measures ANOVA', use: 'The same group measured on three or more occasions.', alt: 'Friedman test' },
  anova2: { name: 'Two-way ANOVA', use: 'Two independent variables on one dependent variable: main effects plus interaction effect.', alt: null },
  manova: { name: 'MANOVA', use: 'Groups compared on several related dependent variables at once.', alt: null },
  ancova: { name: 'ANCOVA', use: 'Compares groups after statistically removing a confounding covariate.', alt: null },
};

const TREE = {
  start: { q: 'What do you want to explore?', options: [['A relationship between variables', 'rel'], ['Differences between groups', 'diff']] },
  rel: { q: 'What exactly?', options: [['How two continuous variables move together', 'rel2'], ['Predict one continuous outcome from several predictors', '=regression'], ['Predict a categorical outcome', '=logistic'], ['Condense many questionnaire items into a few factors', '=factor']] },
  rel2: { q: 'Do you need to control for a third, confounding variable?', options: [['No', '=pearson'], ['Yes', '=partial']] },
  diff: { q: 'What are you comparing?', options: [['Counts across categories (two categorical variables)', '=chi'], ['The means of two groups or occasions', 'two'], ['The means of three or more groups or occasions', 'three'], ['Something more complex', 'complex']] },
  two: { q: 'Different people in each group, or the same people measured twice?', options: [['Different people', '=indT'], ['Same people, twice', '=pairedT']] },
  three: { q: 'Different people in each group, or the same people on each occasion?', options: [['Different people', '=anova1'], ['Same people, repeatedly', '=anovaRm']] },
  complex: { q: 'Which situation?', options: [['Two independent variables, one outcome', '=anova2'], ['Several related outcomes at once', '=manova'], ['Remove the effect of a covariate', '=ancova']] },
};

function TestFinder({ api }) {
  const [path, setPath] = useState([]);
  const [found, setFound] = useState([]);
  const resultRef = useRef(null);
  const node = path.length ? path.at(-1).next : 'start';
  const result = node.startsWith('=') ? TESTS[node.slice(1)] : null;

  useEffect(() => {
    if (found.length >= 2) api.done();
    else api.setAction(found.length ? 'Find one more test' : 'Find a test', false);
  }, [found, api]);
  useEffect(() => {
    if (result) burstAt(resultRef.current, 16);
  }, [result]);

  const choose = (label, next) => {
    setPath((p) => [...p, { label, next }]);
    if (next.startsWith('=')) setFound((f) => (f.includes(next) ? f : [...f, next]));
  };

  return (
    <div className="tut-tf">
      {path.length > 0 && (
        <ol className="tut-tf-trail">
          {path.map((p, i) => (
            <li key={i}>
              <button type="button" onClick={() => setPath((old) => old.slice(0, i))}>{p.label}</button>
            </li>
          ))}
        </ol>
      )}
      {result ? (
        <div className="tut-tf-result" ref={resultRef} key={node}>
          <p className="tut-eyebrow">Use this test</p>
          <h3>{result.name}</h3>
          <p>{result.use}</p>
          {result.alt && <p className="tut-tf-alt"><strong>Non-parametric alternative:</strong> {result.alt}</p>}
          <button type="button" className="tut-event" onClick={() => setPath([])}>
            <b>Start over</b>Try another research question
          </button>
        </div>
      ) : (
        <div className="tut-tf-q" key={node}>
          <p className="tut-tf-question">{TREE[node].q}</p>
          <div className="tut-options">
            {TREE[node].options.map(([label, next], i) => (
              <button key={label} type="button" className="tut-opt" style={{ '--i': i }} onClick={() => choose(label, next)}>
                <span className="tut-key">{'ABCD'[i]}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="tut-hint">Tests found: {found.length}. Tap any step in the trail to go back.</p>
    </div>
  );
}

/* ---------- chapter 9: psychology ---------- */

// Wundt's lab measured the time between a stimulus and a response. So can we.
function Reaction({ api }) {
  const [phase, setPhase] = useState('idle');
  const [times, setTimes] = useState([]);
  const t0 = useRef(0);
  const timer = useRef(0);
  const padRef = useRef(null);
  const TRIALS = 3;
  const finished = times.length >= TRIALS;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (finished) {
      burstAt(padRef.current, 20);
      api.done();
    } else api.setAction(`Complete ${TRIALS - times.length} more trial${TRIALS - times.length === 1 ? '' : 's'}`, false);
  }, [finished, times.length, api]);

  const press = () => {
    if (finished) return;
    if (phase === 'idle' || phase === 'result' || phase === 'early') {
      setPhase('waiting');
      timer.current = setTimeout(() => {
        t0.current = performance.now();
        setPhase('go');
      }, 1200 + Math.random() * 1800);
    } else if (phase === 'waiting') {
      clearTimeout(timer.current);
      setPhase('early');
    } else if (phase === 'go') {
      setTimes((t) => [...t, Math.round(performance.now() - t0.current)]);
      setPhase('result');
    }
  };

  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;
  const label = {
    idle: ['Tap to start', 'Wait for the light to turn green, then tap as fast as you can.'],
    waiting: ['Wait for green…', 'Don’t tap yet.'],
    go: ['TAP NOW!', ''],
    early: ['Too soon!', 'You reacted before the stimulus. Tap to try again.'],
    result: [`${times.at(-1)} ms`, finished ? 'All trials done.' : 'Tap for the next trial.'],
  }[phase];

  return (
    <div className="tut-rt">
      <button type="button" ref={padRef} className={`tut-rt-pad ${phase}`} onPointerDown={press}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); press(); } }}>
        <span className="tut-rt-light" aria-hidden="true" />
        <strong>{label[0]}</strong>
        {label[1] && <small>{label[1]}</small>}
      </button>
      <div className="tut-rt-trials" aria-live="polite">
        {Array.from({ length: TRIALS }, (_, i) => (
          <span key={i} className={times[i] ? 'done' : ''}>
            Trial {i + 1}: <strong>{times[i] ? `${times[i]} ms` : '—'}</strong>
          </span>
        ))}
      </div>
      {finished && (
        <p className="tut-state">
          <strong>Your average: {avg} ms</strong>
          The light was the <b>stimulus</b>; your tap was the <b>response</b>. Wundt measured exactly this kind of reaction, alongside trained introspection.
        </p>
      )}
    </div>
  );
}

// Gestalt: "the whole is greater than the sum of its parts" (a Kanizsa triangle).
// Big pieces close together make the illusion strong: radius 38, corners 58 from the centre.
const KANIZSA = [[160, 42], [210.2, 129], [109.8, 129]];

function Gestalt({ api }) {
  const [aligned, setAligned] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) api.done();
    else api.setAction('Line up the pieces', false);
  }, [seen, api]);

  const cx = 160;
  const cy = 100;
  const toggle = () => {
    setAligned((a) => !a);
    setSeen(true);
  };

  return (
    <div className="tut-gs">
      <div className={`tut-gs-stage${aligned ? ' aligned' : ''}`}>
        <svg viewBox="0 0 320 180" role="img" aria-label={aligned ? 'Three cut-out circles whose gaps line up, so a white triangle seems to appear' : 'Three cut-out circles pointing in different directions'}>
          {KANIZSA.map(([x, y], i) => {
            const toward = (Math.atan2(cy - y, cx - x) * 180) / Math.PI;
            const turn = aligned ? toward : toward + 180 + i * 40;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M0 0 L32.9 -19 A38 38 0 1 0 32.9 19 Z" className="tut-gs-piece" style={{ transform: `rotate(${turn}deg)` }} />
              </g>
            );
          })}
          <polygon points={KANIZSA.map((p) => p.join(',')).join(' ')} className="tut-gs-ghost" />
        </svg>
      </div>
      <button type="button" className={`tut-toggle${aligned ? ' on' : ''}`} aria-pressed={aligned} onClick={toggle}>
        <span className="tut-toggle-dot" />
        <span>
          <strong>{aligned ? 'Pieces lined up' : 'Line up the pieces'}</strong>
          <small>{aligned ? 'See a triangle? None was drawn.' : 'Each piece is just a circle with a slice missing.'}</small>
        </span>
      </button>
      {seen && (
        <p className="tut-state" key={String(aligned)}>
          <strong>{aligned ? 'Your mind built the whole.' : 'Just parts again.'}</strong>
          {aligned
            ? 'There is no triangle on the screen, only three cut circles. You perceive the whole pattern at once.'
            : 'Turn the pieces away and the triangle disappears, even though the parts are identical.'}
        </p>
      )}
    </div>
  );
}

/* ---------- chapter 11: environment ---------- */
const LAYERS = [
  { name: 'Exosphere', letter: 'E', fact: 'The outermost layer, fading into space.' },
  { name: 'Thermosphere', letter: 'T', fact: 'The fourth layer up, above the Kármán line (about 100 km), the imaginary boundary with outer space.' },
  { name: 'Mesosphere', letter: 'M', fact: 'The middle layer, third from the ground. The homosphere (uniform air) reaches up to about 80 km.' },
  { name: 'Stratosphere', letter: 'S', fact: 'The second layer. Here, temperature rises with height.' },
  { name: 'Troposphere', letter: 'T', fact: 'The lowest layer, 7–20 km thick, and the most important for life. Heated mainly from the surface, so temperature falls with height: the environmental lapse rate.' },
];

function Atmosphere({ api }) {
  const [at, setAt] = useState(4);
  const [seen, setSeen] = useState([4]);

  useEffect(() => {
    if (seen.length === LAYERS.length) api.done();
    else api.setAction(`Visit ${LAYERS.length - seen.length} more layer${LAYERS.length - seen.length === 1 ? '' : 's'}`, false);
  }, [seen, api]);

  const go = (i) => {
    setAt(i);
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
  };
  const L = LAYERS[at];

  return (
    <div className="tut-atm">
      <div className="tut-atm-stage">
        <div className="tut-atm-column">
          {LAYERS.map((l, i) => (
            <button key={l.name} type="button" className={`tut-atm-layer l${i}${at === i ? ' on' : ''}${seen.includes(i) ? ' seen' : ''}`} onClick={() => go(i)}>
              <span>{l.name}</span>
              {i === 1 && <i className="tut-atm-karman">Kármán line ~100 km</i>}
            </button>
          ))}
          <span className="tut-atm-balloon" style={{ top: `${at * 20 + 10}%` }} aria-hidden="true" />
        </div>
        <div className="tut-atm-info" aria-live="polite" key={at}>
          <p className="tut-eyebrow">Layer {5 - at} of 5</p>
          <h3>{L.name}</h3>
          <p>{L.fact}</p>
        </div>
      </div>
      <p className="tut-atm-mnemonic" aria-label="Memory aid: Tall Students May Take Exams">
        {['Tall', 'Students', 'May', 'Take', 'Exams'].map((w, i) => (
          <span key={w} className={4 - i === at ? 'on' : ''}><b>{w[0]}</b>{w.slice(1)}</span>
        ))}
      </p>
      <p className="tut-hint">Not to scale. Tap a layer, from the ground up.</p>
    </div>
  );
}

const WATER = [
  { label: 'All water on Earth', share: 1, note: 'About 1.386 billion km³ (UNESCO 1998). Imagine it all poured into a 100-litre drum.', amount: '100 litres' },
  { label: 'Remove the salt water', share: 0.025, note: '97.5% is salt water. Only 2.5% is fresh.', amount: '2.5 litres' },
  { label: 'Remove ice and snow', share: 0.025 * 0.311, note: '68.9% of fresh water is locked in ice and permanent snow. Most of what’s left (30.8%) is groundwater.', amount: 'about 0.78 litres' },
  { label: 'Keep only lakes, reservoirs and rivers', share: 0.025 * 0.003, note: 'Just 0.3% of fresh water is in easily accessible lakes, reservoirs and rivers.', amount: '7.5 millilitres, about one and a half teaspoons' },
];

function WaterShrink({ api }) {
  const [step, setStep] = useState(0);
  const dropRef = useRef(null);
  const last = step === WATER.length - 1;

  useEffect(() => {
    if (last) {
      burstAt(dropRef.current, 14);
      api.done();
    } else api.setAction('Keep shrinking the water', false);
  }, [last, api]);

  const w = WATER[step];
  // Area matches the share, with a minimum size so the last drop stays visible.
  const size = Math.max(6, Math.sqrt(w.share) * 200);

  return (
    <div className="tut-water">
      <div className="tut-water-stage">
        <span className="tut-water-blob" ref={dropRef} style={{ width: size, height: size }} />
        <div className="tut-water-read" aria-live="polite" key={step}>
          <strong>{w.amount}</strong>
          <span>{w.note}</span>
        </div>
      </div>
      <ol className="tut-water-steps">
        {WATER.map((s, i) => (
          <li key={s.label}>
            <button type="button" className={i === step ? 'on' : i < step ? 'done' : ''} onClick={() => setStep(i)} disabled={i > step + 1}>
              {s.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

// Von Thünen: land goes to the highest bidder. Rent = price − transport cost × distance.
const VT_CROPS = [
  { id: 'veg', name: 'Vegetables', perKm: 20, cls: 'v' },
  { id: 'cassava', name: 'Cassava', perKm: 6, cls: 'c' },
  { id: 'graze', name: 'Grazing', perKm: 2, cls: 'g' },
];

function VonThunen({ api }) {
  const [cassava, setCassava] = useState(60);
  const [moved, setMoved] = useState(false);
  const prices = { veg: 100, cassava, graze: 30 };

  useEffect(() => {
    if (moved) api.done();
    else api.setAction('Change the price of cassava', false);
  }, [moved, api]);

  // Who wins each 0.05 km step from the city out to 15 km? (Fine steps keep boundaries accurate.)
  const STEP = 0.05;
  const bands = [];
  for (let k = 0; k < 15 / STEP; k++) {
    const d = k * STEP;
    let best = null;
    let bestRent = 0;
    VT_CROPS.forEach((c) => {
      const rent = prices[c.id] - c.perKm * d;
      if (rent > bestRent) { bestRent = rent; best = c; }
    });
    const prev = bands.at(-1);
    const to = (k + 1) * STEP; // same expression as the next band's `from`, so shared edges print identically
    if (prev && prev.crop === best) prev.to = to;
    else bands.push({ crop: best, from: d, to });
  }
  const R = (km) => 8 + km * 9;

  return (
    <div className="tut-vt">
      <div className="tut-vt-stage">
        <svg viewBox="0 0 300 300" role="img" aria-label="Rings of land use around a central market town">
          {[...bands].reverse().map((b) => (
            <circle key={`${b.from}-${b.crop?.id ?? 'none'}`} cx="150" cy="150" r={R(b.to)} className={`tut-vt-ring ${b.crop ? b.crop.cls : 'none'}`} />
          ))}
          <circle cx="150" cy="150" r="9" className="tut-f-roof tut-s" />
          <text x="150" y="132" fontSize="10" textAnchor="middle" className="tut-t tut-vt-label">MARKET</text>
        </svg>
        <ul className="tut-vt-legend">
          {bands.filter((b) => b.crop).map((b) => (
            <li key={b.crop.id} className={b.crop.cls}>
              <i /> <strong>{b.crop.name}</strong> {b.from.toFixed(1)}–{b.to.toFixed(1)} km
            </li>
          ))}
          {!bands.some((b) => b.crop?.id === 'cassava') && <li className="c muted"><i /> <strong>Cassava</strong> outbid everywhere</li>}
        </ul>
      </div>
      <label className="tut-range-label" htmlFor="cassava">
        <span>Market price of cassava</span>
        <output htmlFor="cassava">₦{cassava}</output>
      </label>
      <input id="cassava" className="tut-range" type="range" min="35" max="95" value={cassava}
        onChange={(e) => { setCassava(Number(e.target.value)); setMoved(true); }} />
      <p className="tut-hint">Vegetables sell high but spoil and cost a lot to carry; grazing pays little but costs almost nothing to move. Each plot goes to whichever use can pay the most rent there.</p>
    </div>
  );
}

/* ---------- MAT 222: limits and continuity ---------- */

// f(x) = (x³ + 1)/(x − 3) near x = 2, where the limit is −9 (Q1c).
// The learner picks ε, then tries δs: a δ works when the whole graph over the
// punctured strip 0 < |x − 2| < δ stays inside the band −9 ± ε.
const fQ1 = (x) => (x ** 3 + 1) / (x - 3);
const ED = { x0: 1.5, x1: 2.5, y0: -24, y1: 2, l: 34, t: 10, w: 296, h: 170 };
const edX = (x) => ED.l + ((x - ED.x0) / (ED.x1 - ED.x0)) * ED.w;
const edY = (y) => ED.t + ((ED.y1 - y) / (ED.y1 - ED.y0)) * ED.h;
const safeDelta = (eps) => Math.min(0.5, eps / 50);

function fits(eps, delta) {
  // 400 sample points strictly inside (2 − δ, 2 + δ), never x = 2 itself.
  for (let k = 1; k <= 400; k++) {
    const x = 2 - delta + (2 * delta * k) / 401;
    if (Math.abs(fQ1(x) + 9) >= eps) return false;
  }
  return true;
}

function curve(from, to) {
  const pts = [];
  const n = 160;
  for (let k = 0; k <= n; k++) {
    const x = from + ((to - from) * k) / n;
    pts.push(`${edX(x).toFixed(1)},${edY(fQ1(x)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function EpsilonDelta({ api }) {
  const clip = useId();
  const [eps, setEps] = useState(6);
  const [delta, setDelta] = useState(0.3);
  // The starting δ already fails, so the first job is finding one that works.
  const [seen, setSeen] = useState(() => ({ eps: false, pass: fits(6, 0.3), fail: !fits(6, 0.3) }));
  const ok = fits(eps, delta);
  const safe = safeDelta(eps);

  useEffect(() => {
    if (seen.eps && seen.pass && seen.fail) api.done();
    else api.setAction(!seen.fail ? 'Find a δ that fails' : !seen.pass ? 'Find a δ that works' : 'Now change ε', false);
  }, [seen, api]);

  const tryValues = (e, d) => {
    setEps(e);
    setDelta(d);
    const good = fits(e, d);
    setSeen((s) => ({ eps: s.eps || e !== eps, pass: s.pass || good, fail: s.fail || !good }));
  };

  const top = Math.min(ED.y1, -9 + eps);
  const bottom = Math.max(ED.y0, -9 - eps);

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 205" role="img" aria-label={`Graph of (x³+1)/(x−3) near x = 2. ε = ${eps}, δ = ${delta.toFixed(3)}: ${ok ? 'works' : 'fails'}`}>
          <defs>
            <clipPath id={clip}>
              <rect x={ED.l} y={ED.t} width={ED.w} height={ED.h} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clip})`}>
            <rect x={ED.l} width={ED.w} y={edY(top)} height={edY(bottom) - edY(top)} className="tut-graph-band" />
            <rect x={edX(2 - delta)} width={edX(2 + delta) - edX(2 - delta)} y={ED.t} height={ED.h} className="tut-graph-strip" />
            <polyline points={curve(ED.x0, ED.x1)} className="tut-graph-curve" />
            <polyline points={curve(2 - delta, 2 + delta)} className={`tut-graph-hit ${ok ? 'ok' : 'bad'}`} />
            <line x1={edX(2 - safe)} x2={edX(2 - safe)} y1={ED.t} y2={ED.t + ED.h} className="tut-graph-guide" />
            <line x1={edX(2 + safe)} x2={edX(2 + safe)} y1={ED.t} y2={ED.t + ED.h} className="tut-graph-guide" />
          </g>
          <circle cx={edX(2)} cy={edY(-9)} r="4" className="tut-graph-hole" />
          <line x1={ED.l} y1={ED.t + ED.h} x2={ED.l + ED.w} y2={ED.t + ED.h} className="tut-avg-axis" />
          <line x1={ED.l} y1={ED.t} x2={ED.l} y2={ED.t + ED.h} className="tut-avg-axis" />
          {[1.5, 2, 2.5].map((t) => (
            <text key={t} x={edX(t)} y={ED.t + ED.h + 16} fontSize="10" textAnchor="middle" className="tut-t-soft">{t}</text>
          ))}
          {[0, -9, -20].map((t) => (
            <text key={t} x={ED.l - 6} y={edY(t) + 3} fontSize="10" textAnchor="end" className="tut-t-soft">{t}</text>
          ))}
        </svg>
        <p className={`tut-graph-read ${ok ? 'ok' : 'bad'}`} aria-live="polite" key={`${eps}-${delta}`}>
          {ok ? (
            <><strong>δ works.</strong> Every x with 0 &lt; |x − 2| &lt; {delta.toFixed(3)} lands within {eps} of −9.</>
          ) : (
            <><strong>δ fails.</strong> Some x within {delta.toFixed(3)} of 2 lands outside the band. Shrink δ.</>
          )}
        </p>
      </div>
      <label className="tut-range-label" htmlFor="ed-eps">
        <span>ε (the band around −9)</span>
        <output htmlFor="ed-eps">{eps}</output>
      </label>
      <input id="ed-eps" className="tut-range" type="range" min="0.5" max="12" step="0.5" value={eps}
        onChange={(e) => tryValues(Number(e.target.value), delta)} />
      <label className="tut-range-label" htmlFor="ed-delta">
        <span>δ (the strip around 2)</span>
        <output htmlFor="ed-delta">{delta.toFixed(3)}</output>
      </label>
      <input id="ed-delta" className="tut-range" type="range" min="0.005" max="0.5" step="0.005" value={delta}
        onChange={(e) => tryValues(eps, Number(e.target.value))} />
      <button type="button" className="tut-event" onClick={() => tryValues(eps, safe)}>
        <b>Use the proof’s δ</b>
        <Inline text={`$\\delta = \\min(\\tfrac12, \\tfrac{\\varepsilon}{50}) = ${safe.toFixed(3)}$ (the dashed lines)`} />
      </button>
    </div>
  );
}

// Continuity vs uniform continuity: with ε = 0.5 fixed, how big may δ be at x₀?
// 1/x on (0, 1]: δ = εx₀²/(1 + εx₀) shrinks to 0. 3x: δ = ε/3 at every point.
const UD_EPS = 0.5;
const UD_MAX = 0.35;

function UniformDelta({ api }) {
  const [x0, setX0] = useState(0.6);
  const [ends, setEnds] = useState({ low: false, high: false });
  const recip = (UD_EPS * x0 * x0) / (1 + UD_EPS * x0);
  const line = UD_EPS / 3;

  useEffect(() => {
    if (ends.low && ends.high) api.done();
    else api.setAction(!ends.low ? 'Slide x₀ close to 0' : 'Slide x₀ back up near 1', false);
  }, [ends, api]);

  const move = (v) => {
    setX0(v);
    setEnds((e) => ({ low: e.low || v <= 0.08, high: e.high || (e.low && v >= 0.8) }));
  };

  const bar = (label, value, cls) => (
    <div className={`tut-ud-row ${cls}`}>
      <span className="tut-ud-name"><Inline text={label} /></span>
      <span className="tut-ud-track">
        <span className="tut-ud-fill" style={{ width: `${Math.max(0.6, (value / UD_MAX) * 100)}%` }} />
      </span>
      <output className="tut-ud-val">{value < 0.01 ? value.toFixed(5) : value.toFixed(3)}</output>
    </div>
  );

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <p className="tut-hint">
          Largest δ that works at <Inline text={`$x_0 = ${x0.toFixed(2)}$`} />, with <Inline text="$\varepsilon = 0.5$" />
        </p>
        {bar('$f(x) = 1/x$', recip, 'recip')}
        {bar('$g(x) = 3x$', line, 'line')}
        <p className="tut-graph-read" aria-live="polite" key={x0 <= 0.08 ? 'low' : 'mid'}>
          {x0 <= 0.08
            ? <>Near 0, <strong>1/x</strong> needs a tiny δ. No single δ serves every point: not uniformly continuous.</>
            : <><strong>3x</strong> uses the same δ = ε/3 everywhere: uniformly continuous.</>}
        </p>
      </div>
      <label className="tut-range-label" htmlFor="ud-x0">
        <span>The point x₀</span>
        <output htmlFor="ud-x0">{x0.toFixed(2)}</output>
      </label>
      <input id="ud-x0" className="tut-range" type="range" min="0.02" max="1" step="0.01" value={x0}
        onChange={(e) => move(Number(e.target.value))} />
    </div>
  );
}

// Q4c: sin 2x / x has a hole at (0, 2) while f(0) = 1. Zoom in, then repair it.
const ZOOM_X = [0.5, 0.1, 0.01, 0.001];
const RM = { x0: -6, x1: 6, y0: -0.8, y1: 2.4, l: 10, t: 10, w: 320, h: 150 };
const rmX = (x) => RM.l + ((x - RM.x0) / (RM.x1 - RM.x0)) * RM.w;
const rmY = (y) => RM.t + ((RM.y1 - y) / (RM.y1 - RM.y0)) * RM.h;
const sinc2 = (x) => Math.sin(2 * x) / x;

function sincPath() {
  const pts = [];
  for (let k = 0; k <= 240; k++) {
    const x = RM.x0 + ((RM.x1 - RM.x0) * k) / 240;
    pts.push(`${rmX(x).toFixed(1)},${rmY(x === 0 ? 2 : sinc2(x)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function Removable({ api }) {
  const [shown, setShown] = useState(0);
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    if (fixed) api.done();
    else api.setAction(shown < ZOOM_X.length ? 'Zoom in on x = 0' : 'Repair the function', false);
  }, [shown, fixed, api]);

  return (
    <div className="tut-graph">
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 175" role="img" aria-label={fixed ? 'Graph of sin 2x over x with f(0) redefined as 2: no gap' : 'Graph of sin 2x over x: a hole at (0, 2) and a separate dot at (0, 1)'}>
          <line x1={RM.l} y1={rmY(0)} x2={RM.l + RM.w} y2={rmY(0)} className="tut-avg-axis" />
          <line x1={rmX(0)} y1={RM.t} x2={rmX(0)} y2={RM.t + RM.h} className="tut-avg-axis" />
          <polyline points={sincPath()} className="tut-graph-curve" />
          {!fixed && <circle cx={rmX(0)} cy={rmY(2)} r="4.5" className="tut-graph-hole" />}
          <circle key={fixed ? 'fixed' : 'orig'} cx={rmX(0)} cy={rmY(fixed ? 2 : 1)} r="4.5" className={`tut-graph-dot${fixed ? ' ok' : ''}`} />
          <text x={rmX(0) + 8} y={rmY(2) - 4} fontSize="10" className="tut-t-soft">2</text>
          <text x={rmX(0) + 8} y={rmY(1) + 4} fontSize="10" className="tut-t-soft">1</text>
        </svg>
      </div>
      <table className="tut-limtable">
        <thead>
          <tr><th>x</th><th>sin 2x / x</th></tr>
        </thead>
        <tbody>
          {ZOOM_X.slice(0, shown).map((x) => (
            <tr key={x}><td>{x}</td><td>{sinc2(x).toFixed(7)}</td></tr>
          ))}
          <tr className="tut-limtable-f0"><td>0</td><td>{fixed ? '2 (redefined)' : '1 (given)'}</td></tr>
        </tbody>
      </table>
      {shown < ZOOM_X.length ? (
        <button type="button" className="tut-event" onClick={() => setShown((n) => n + 1)}>
          <b>Zoom in</b>Try x = {ZOOM_X[shown]}{shown === 0 ? ' (negative x gives the same values: the function is even)' : ''}
        </button>
      ) : (
        <button type="button" className="tut-event" onClick={() => setFixed((f) => !f)}>
          <b>{fixed ? 'Undo' : 'Repair it'}</b>{fixed ? 'Put f(0) = 1 back' : 'Redefine f(0) = 2, the value of the limit'}
        </button>
      )}
    </div>
  );
}

/* ---------- MTH 209: root-finding race ---------- */

// Four methods on f(x) = x³ − 5x − 40 (root 3.904449). Each step is precomputed; the learner
// steps one method at a time and sees its construction (midpoint, chord or tangent) on the graph.
const fR = (x) => x ** 3 - 5 * x - 40;
const dfR = (x) => 3 * x * x - 5;
const ROOT = (() => {
  let x = 4;
  for (let i = 0; i < 30; i++) x -= fR(x) / dfR(x);
  return x;
})();
const RR = { x0: 2.9, x1: 4.1, y0: -32, y1: 12, l: 30, t: 8, w: 300, h: 150 };
const rrX = (x) => RR.l + ((x - RR.x0) / (RR.x1 - RR.x0)) * RR.w;
const rrY = (y) => RR.t + ((RR.y1 - y) / (RR.y1 - RR.y0)) * RR.h;

function raceSteps(method, n = 6) {
  const steps = [];
  if (method === 'newton') {
    let x = 4;
    for (let i = 0; i < n; i++) {
      const next = x - fR(x) / dfR(x);
      steps.push({ x: next, from: [x], kind: 'tangent' });
      x = next;
    }
  } else if (method === 'secant') {
    let a = 3, b = 4;
    for (let i = 0; i < n; i++) {
      if (Math.abs(fR(b) - fR(a)) < 1e-12) break;
      const next = b - fR(b) * (b - a) / (fR(b) - fR(a));
      steps.push({ x: next, from: [a, b], kind: 'chord' });
      a = b; b = next;
    }
  } else {
    let a = 3, b = 4;
    for (let i = 0; i < n; i++) {
      const c = method === 'bisection' ? (a + b) / 2 : (a * fR(b) - b * fR(a)) / (fR(b) - fR(a));
      steps.push({ x: c, from: [a, b], kind: method === 'bisection' ? 'mid' : 'chord' });
      if (fR(a) * fR(c) < 0) b = c;
      else a = c;
    }
  }
  return steps;
}

const RACE = [
  { id: 'bisection', name: 'Bisection', start: 'a = 3, b = 4' },
  { id: 'falsi', name: 'Regula Falsi', start: 'a = 3, b = 4' },
  { id: 'secant', name: 'Secant', start: 'x₀ = 3, x₁ = 4' },
  { id: 'newton', name: 'Newton', start: 'x₀ = 4' },
];
const RACE_STEPS = Object.fromEntries(RACE.map((m) => [m.id, raceSteps(m.id)]));

function racePath() {
  const pts = [];
  for (let k = 0; k <= 120; k++) {
    const x = RR.x0 + ((RR.x1 - RR.x0) * k) / 120;
    pts.push(`${rrX(x).toFixed(1)},${rrY(fR(x)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function RootRace({ api }) {
  const clip = useId();
  const [method, setMethod] = useState('bisection');
  const [shown, setShown] = useState({ bisection: 0, falsi: 0, secant: 0, newton: 0 });
  const steps = RACE_STEPS[method];
  const count = shown[method];
  const last = count ? steps[count - 1] : null;
  const allTried = RACE.every((m) => shown[m.id] >= 3);

  useEffect(() => {
    if (allTried) api.done();
    else api.setAction('Take 3 steps with each method', false);
  }, [allTried, api]);

  const step = () => setShown((s) => ({ ...s, [method]: Math.min(s[method] + 1, steps.length) }));

  let construction = null;
  if (last?.kind === 'tangent') {
    const [x] = last.from;
    construction = <line x1={rrX(x)} y1={rrY(fR(x))} x2={rrX(last.x)} y2={rrY(0)} className="tut-race-con" />;
  } else if (last?.kind === 'chord') {
    const [a, b] = last.from;
    construction = <line x1={rrX(a)} y1={rrY(fR(a))} x2={rrX(b)} y2={rrY(fR(b))} className="tut-race-con" />;
  } else if (last?.kind === 'mid') {
    const [a, b] = last.from;
    construction = <rect x={rrX(a)} y={RR.t} width={rrX(b) - rrX(a)} height={RR.h} className="tut-graph-strip" />;
  }

  return (
    <div className="tut-graph">
      <div className="tut-seg-control four" role="tablist" aria-label="Method">
        {RACE.map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={method === m.id} className={method === m.id ? 'on' : ''} onClick={() => setMethod(m.id)}>
            {m.name}
          </button>
        ))}
      </div>
      <div className="tut-graph-stage">
        <svg viewBox="0 0 340 180" role="img" aria-label={`Graph of x³ − 5x − 40 between 2.9 and 4.1, ${RACE.find((m) => m.id === method).name}, ${count} steps`}>
          <defs>
            <clipPath id={clip}>
              <rect x={RR.l} y={RR.t} width={RR.w} height={RR.h} />
            </clipPath>
          </defs>
          <line x1={RR.l} y1={rrY(0)} x2={RR.l + RR.w} y2={rrY(0)} className="tut-avg-axis" />
          <g clipPath={`url(#${clip})`}>
            {construction}
            <polyline points={racePath()} className="tut-graph-curve" />
          </g>
          {steps.slice(0, count).map((s, i) => (
            <circle key={i} cx={rrX(s.x)} cy={rrY(0)} r={i === count - 1 ? 4.5 : 3} className={`tut-race-pt${i === count - 1 ? ' now' : ''}`} />
          ))}
          {[3, 3.5, 4].map((t) => (
            <text key={t} x={rrX(t)} y={RR.t + RR.h + 16} fontSize="10" textAnchor="middle" className="tut-t-soft">{t}</text>
          ))}
        </svg>
      </div>
      <table className="tut-limtable tut-race-table">
        <thead>
          <tr><th>n</th><th>estimate</th><th>error</th></tr>
        </thead>
        <tbody>
          {steps.slice(0, count).map((s, i) => (
            <tr key={`${method}-${i}`}>
              <td>{i + 1}</td>
              <td>{s.x.toFixed(6)}</td>
              <td>{Math.abs(s.x - ROOT) < 5e-8 ? '< 0.0000001' : Math.abs(s.x - ROOT).toFixed(7)}</td>
            </tr>
          ))}
          {!count && (
            <tr><td colSpan={3} className="tut-hint">Start: {RACE.find((m) => m.id === method).start}</td></tr>
          )}
        </tbody>
      </table>
      <button type="button" className="tut-event" onClick={step} disabled={count >= steps.length}>
        <b>{count >= steps.length ? 'Converged' : `Step ${count + 1}`}</b>
        {method === 'bisection' ? 'Take the midpoint of the bracket' : method === 'falsi' ? 'Chord through (a, f(a)) and (b, f(b))' : method === 'secant' ? 'Chord through the last two points' : 'Tangent at the latest point'}
      </button>
    </div>
  );
}

export const WIDGETS = {
  rootRace: RootRace,
  epsilonDelta: EpsilonDelta,
  uniformDelta: UniformDelta,
  removable: Removable,
  reaction: Reaction,
  gestalt: Gestalt,
  atmosphere: Atmosphere,
  waterShrink: WaterShrink,
  vonThunen: VonThunen,
  averages: Averages,
  bellCurve: BellCurve,
  testFinder: TestFinder,
  imagination: Imagination,
  durkheim: Durkheim,
  venn: Venn,
  legitimacy: LegitimacyMeter,
  stateBuilder: StateBuilder,
  collectiveAction: CollectiveAction,
  powerDistribution: PowerDistribution,
};
