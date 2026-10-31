import { useEffect, useRef, useState } from 'react';
import { Art, CardIcon } from './art';
import { burstAt, buzz, confetti } from './fx';
import { Inline, Rich, Terms } from './Rich';
import { WIDGETS } from './widgets';
import { SyncFab } from '../../lib/SyncControls';
import { CheckIcon } from '../../lib/icons';

// Screen types. Every screen gets { s, index, api }:
//   api.setAction(label, enabled, fn)  – the big bottom button
//   api.done(label)                    – enable Continue
//   api.next()                         – go to the next screen
//   api.record(index, ok)              – first-try result for scoring (first call wins)
//   api.feedback({ tone, title, body, label, then }) – the spring-up sheet
//   api.remember(key, value) / api.mem – answers kept for later screens (polls)

const PRAISE = ['Correct!', 'Spot on!', 'Exactly.', 'Nailed it.', 'Yes!', 'Sharp.'];
const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];
const LETTERS = 'ABCDEFG';

function shuffled(list) {
  const r = list.map((_, i) => i);
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function Head({ s }) {
  return (
    <>
      {s.art && (
        <div className="tut-art">
          <Art name={s.art} />
        </div>
      )}
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

const ASIDE_TONE = { 'Exam tip': 'exam', Tip: 'tip', Note: 'plain' };

function Aside({ label, text }) {
  return (
    <aside className={`tut-headsup ${ASIDE_TONE[label] ?? ''}`}>
      <b>{label}</b>
      <span>
        <Inline text={text} />
      </span>
    </aside>
  );
}

// `note` is the older single heads-up; `asides` holds labelled tips and notes.
function Note({ s }) {
  return (
    <>
      {s.note && <Aside label="Heads up" text={s.note} />}
      {s.asides?.map((a) => <Aside key={a.text} label={a.label} text={a.text} />)}
    </>
  );
}

function Explain({ parts }) {
  return parts.filter(Boolean).map((t, i) => <Rich key={i} text={t} className="tut-sheet-text" />);
}

/* ---------------- story ---------------- */
function Story({ s, api }) {
  useEffect(() => api.done(s.cta), [api, s.cta]);
  return (
    <>
      <Head s={s} />
      <Note s={s} />
    </>
  );
}

/* ---------------- single choice / poll ---------------- */
function Choice({ s, index, api }) {
  const [sel, setSel] = useState(null);
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState(null);
  const [locked, setLocked] = useState(false);
  const tries = useRef(0);
  const btns = useRef([]);
  const finished = right !== null || locked;

  const check = () => {
    const o = s.options[sel];
    if (s.poll) {
      api.remember(s.poll, sel);
      setLocked(true);
      api.feedback({ tone: 'neutral', title: s.pollTitle || 'Noted.', body: <Rich text={s.pollBody} className="tut-sheet-text" />, then: api.next });
      return;
    }
    tries.current += 1;
    if (o.correct) {
      setRight(sel);
      api.record(index, tries.current === 1);
      burstAt(btns.current[sel]);
      api.feedback({ tone: 'good', title: tries.current === 1 ? praise() : 'Got it.', body: <Explain parts={[o.why, s.explain]} />, then: api.next });
    } else {
      api.record(index, false);
      setWrong((w) => [...w, sel]);
      setSel(null);
      api.feedback({ tone: 'bad', title: 'Not quite.', label: 'Try again', body: <Explain parts={[o.why || 'Have another look at the question.']} /> });
    }
  };

  useEffect(() => {
    if (!finished) api.setAction(s.poll ? 'Lock it in' : 'Check', sel !== null, check);
  });

  // 1–4 / A–D pick an option, like the timed test.
  useEffect(() => {
    if (finished) return;
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, [contenteditable]')) return;
      const k = e.key.toUpperCase();
      const i = /^[1-7]$/.test(k) ? Number(k) - 1 : LETTERS.indexOf(k);
      if (i >= 0 && i < s.options.length && !wrong.includes(i)) setSel(i);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finished, s.options.length, wrong]);

  return (
    <>
      <Head s={s} />
      <div className="tut-options" role="group">
        {s.options.map((o, i) => {
          const cls = right === i ? 'right' : wrong.includes(i) ? 'wrong' : sel === i ? 'sel' : '';
          return (
            <button key={i} ref={(el) => (btns.current[i] = el)} type="button" className={`tut-opt ${cls}`}
              style={{ '--i': i }} aria-pressed={sel === i} disabled={finished || wrong.includes(i)}
              onClick={() => setSel(i)}>
              <span className="tut-key">{LETTERS[i]}</span>
              <span>
                <Inline text={o.text} />
              </span>
            </button>
          );
        })}
      </div>
      <Note s={s} />
    </>
  );
}

/* ---------------- select all that apply ---------------- */
function Multi({ s, index, api }) {
  const [picked, setPicked] = useState([]);
  const [marks, setMarks] = useState({});
  const [needChange, setNeedChange] = useState(false);
  const [solved, setSolved] = useState(false);
  const tries = useRef(0);
  const listRef = useRef(null);

  const toggle = (i) => {
    setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
    setMarks((m) => ({ ...m, [i]: undefined }));
    setNeedChange(false);
  };

  const check = () => {
    tries.current += 1;
    const next = {};
    const mistakes = [];
    s.options.forEach((o, i) => {
      if (picked.includes(i) && !o.correct) { next[i] = 'wrong'; mistakes.push(o.why); }
      if (!picked.includes(i) && o.correct) { next[i] = 'missed'; mistakes.push(o.why); }
    });
    api.record(index, mistakes.length === 0);
    if (!mistakes.length) {
      setSolved(true);
      burstAt(listRef.current, 24);
      api.feedback({ tone: 'good', title: tries.current === 1 ? 'Perfect set!' : 'Got them all.', body: <Explain parts={[s.explain]} />, then: api.next });
    } else {
      setMarks(next);
      setNeedChange(true);
      api.feedback({
        tone: 'bad',
        title: `${mistakes.length} to fix`,
        label: 'Try again',
        body: (
          <ul className="tut-sheet-list">
            {mistakes.map((m, i) => (
              <li key={i}><Inline text={m} /></li>
            ))}
          </ul>
        ),
      });
    }
  };

  useEffect(() => {
    if (!solved) api.setAction(needChange ? 'Change your selection' : 'Check', !needChange && picked.length > 0, check);
  });

  return (
    <>
      <Head s={s} />
      <p className="tut-hint">Select all that apply.</p>
      <div className="tut-options" ref={listRef}>
        {s.options.map((o, i) => {
          const on = picked.includes(i);
          const cls = solved ? (o.correct ? 'right' : '') : marks[i] || (on ? 'sel' : '');
          return (
            <button key={i} type="button" className={`tut-opt multi ${cls}`} style={{ '--i': i }}
              aria-pressed={on} disabled={solved} onClick={() => toggle(i)}>
              <span className="tut-key box">{(on || (solved && o.correct)) && <CheckIcon size={15} />}</span>
              <span><Inline text={o.text} /></span>
            </button>
          );
        })}
      </div>
    </>
  );
}

/* ---------------- sort into buckets ---------------- */
function Sort({ s, index, api }) {
  const [order] = useState(() => shuffled(s.items));
  const [place, setPlace] = useState({});
  const [result, setResult] = useState({});
  const [picked, setPicked] = useState(null);
  const [lands, setLands] = useState({});
  const [over, setOver] = useState(null);
  const binsRef = useRef(null);
  const suppress = useRef(false);
  const drag = useRef(null);

  const placedCount = Object.values(place).filter(Boolean).length;
  const all = placedCount === s.items.length;

  const putIn = (i, bucket) => {
    setPlace((p) => ({ ...p, [i]: bucket }));
    setLands((l) => ({ ...l, [i]: (l[i] || 0) + 1 }));
    setPicked(null);
  };

  const check = () => {
    const res = {};
    const wrong = [];
    s.items.forEach((it, i) => {
      res[i] = place[i] === it.bucket ? 'right' : 'wrong';
      if (res[i] === 'wrong') wrong.push(i);
    });
    setResult(res);
    api.record(index, wrong.length === 0);
    if (!wrong.length) {
      burstAt(binsRef.current, 30);
      api.feedback({ tone: 'good', title: 'All sorted!', body: <Explain parts={[s.explain]} />, then: api.next });
    } else {
      api.feedback({
        tone: 'bad',
        title: `${s.items.length - wrong.length} of ${s.items.length} in the right place`,
        label: 'Fix the red ones',
        body: (
          <ul className="tut-sheet-list">
            {wrong.map((i) => (
              <li key={i}><Inline text={s.items[i].why} /></li>
            ))}
          </ul>
        ),
        then: () => {
          setPlace((p) => {
            const n = { ...p };
            wrong.forEach((i) => (n[i] = null));
            return n;
          });
          setResult((r) => {
            const n = { ...r };
            wrong.forEach((i) => delete n[i]);
            return n;
          });
        },
      });
    }
  };

  useEffect(() => {
    const done = Object.keys(result).length === s.items.length && Object.values(result).every((v) => v === 'right');
    if (!done) api.setAction(all ? 'Check' : `${s.items.length - placedCount} left to sort`, all, check);
  });

  const binAt = (x, y) => document.elementsFromPoint(x, y).find((n) => n.dataset?.bin)?.dataset.bin;

  const chip = (i) => {
    const locked = result[i] === 'right';
    return (
      <button
        key={`${i}-${lands[i] || 0}`}
        type="button"
        className={`tut-chip${picked === i ? ' picked' : ''}${result[i] ? ` ${result[i]}` : ''}${lands[i] ? ' landed' : ''}`}
        style={{ '--i': order.indexOf(i) }}
        onClick={() => {
          if (suppress.current || locked) return;
          setPicked((p) => (p === i ? null : i));
        }}
        onPointerDown={(e) => {
          if (locked || e.button > 0) return;
          drag.current = { i, x: e.clientX, y: e.clientY, moving: false };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || d.i !== i) return;
          const dx = e.clientX - d.x;
          const dy = e.clientY - d.y;
          if (!d.moving && Math.hypot(dx, dy) > 7) {
            d.moving = true;
            e.currentTarget.classList.add('dragging');
          }
          if (!d.moving) return;
          e.currentTarget.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.max(-5, Math.min(5, dx / 25))}deg) scale(1.04)`;
          setOver(binAt(e.clientX, e.clientY) ?? null);
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          if (d && d.i === i && d.moving) {
            const el = e.currentTarget;
            el.style.transform = '';
            el.classList.remove('dragging');
            const b = binAt(e.clientX, e.clientY);
            if (b === 'tray') setPlace((p) => ({ ...p, [i]: null }));
            else if (b) putIn(i, b);
            setOver(null);
            suppress.current = true;
            setTimeout(() => (suppress.current = false), 0);
          }
          drag.current = null;
        }}
        onPointerCancel={(e) => {
          e.currentTarget.style.transform = '';
          e.currentTarget.classList.remove('dragging');
          setOver(null);
          drag.current = null;
        }}
      >
        <Inline text={s.items[i].text} />
      </button>
    );
  };

  const tray = order.filter((i) => !place[i]);

  return (
    <>
      <Head s={s} />
      <div className={`tut-sort${picked !== null ? ' picking' : ''}`}>
        <p className="tut-hint">Tap a card, then tap the group it belongs to. You can also drag.</p>
        <div
          className={`tut-tray${tray.length ? '' : ' empty'}`}
          data-bin="tray"
          onClick={(e) => {
            if (e.target === e.currentTarget && picked !== null && place[picked]) setPlace((p) => ({ ...p, [picked]: null }));
          }}
        >
          {tray.length ? tray.map(chip) : <span className="tut-hint">All placed. Press Check when you’re ready.</span>}
        </div>
        <div className="tut-bins" ref={binsRef}>
          {s.buckets.map((b) => (
            <div
              key={b.id}
              data-bin={b.id}
              className={`tut-bin${over === b.id ? ' over' : ''}`}
              onClick={(e) => {
                if (e.target.closest('.tut-chip')) return;
                if (picked !== null) putIn(picked, b.id);
              }}
            >
              <button type="button" className="tut-bin-head" onClick={() => picked !== null && putIn(picked, b.id)}>
                <strong>{b.label}</strong>
                {b.hint && <small>{b.hint}</small>}
              </button>
              <div className="tut-bin-body">{order.filter((i) => place[i] === b.id).map(chip)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------- put in order ---------------- */
function Order({ s, index, api }) {
  const n = s.items.length;
  const [pool] = useState(() => shuffled(s.items));
  const [slots, setSlots] = useState(() => Array(n).fill(null));
  const [marks, setMarks] = useState({});
  const [solved, setSolved] = useState(false);
  const listRef = useRef(null);
  const full = slots.every((x) => x !== null);

  const add = (i) => {
    setSlots((sl) => {
      const k = sl.indexOf(null);
      if (k < 0) return sl;
      const next = [...sl];
      next[k] = i;
      return next;
    });
  };
  const remove = (k) => {
    if (solved || marks[k] === 'right') return;
    setSlots((sl) => sl.map((x, j) => (j === k ? null : x)));
    setMarks((m) => ({ ...m, [k]: undefined }));
  };

  const check = () => {
    const m = {};
    let right = 0;
    slots.forEach((item, k) => {
      m[k] = item === k ? 'right' : 'wrong';
      if (item === k) right++;
    });
    setMarks(m);
    api.record(index, right === n);
    if (right === n) {
      setSolved(true);
      burstAt(listRef.current, 26);
      api.feedback({ tone: 'good', title: 'Perfect order!', body: <Explain parts={[s.explain]} />, then: api.next });
    } else {
      api.feedback({
        tone: 'bad',
        title: `${right} of ${n} in the right spot`,
        label: 'Rearrange',
        body: <Explain parts={['The green ones are locked in. The red ones go back so you can try again.', s.hint]} />,
        then: () => {
          setSlots((sl) => sl.map((x, k) => (m[k] === 'right' ? x : null)));
          setMarks((old) => Object.fromEntries(Object.entries(old).filter(([, v]) => v === 'right')));
        },
      });
    }
  };

  useEffect(() => {
    if (!solved) api.setAction(full ? 'Check order' : `${slots.filter((x) => x === null).length} left to place`, full, check);
  });

  return (
    <>
      <Head s={s} />
      <ol className="tut-slots" ref={listRef}>
        {slots.map((item, k) => (
          <li key={k}>
            <button type="button" className={`tut-slot${item === null ? ' empty' : ''}${marks[k] ? ` ${marks[k]}` : ''}${solved ? ' right' : ''}`}
              onClick={() => item !== null && remove(k)} disabled={item === null || solved || marks[k] === 'right'}
              style={{ '--i': k }}>
              <span className="tut-slot-n">{s.labels?.[k] ?? k + 1}</span>
              <span key={item ?? 'empty'} className="tut-slot-text">
                {item === null ? (s.slotHint || 'Tap a card below') : <Inline text={s.items[item]} />}
              </span>
            </button>
          </li>
        ))}
      </ol>
      {!solved && (
        <div className="tut-pool">
          {pool.filter((i) => !slots.includes(i)).map((i) => (
            <button key={i} type="button" className="tut-chip" style={{ '--i': pool.indexOf(i) }} onClick={() => add(i)}>
              <Inline text={s.items[i]} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ---------------- flip cards ---------------- */
function Reveal({ s, api }) {
  const [open, setOpen] = useState([]);
  const [seen, setSeen] = useState([]);
  useEffect(() => {
    const left = s.cards.length - seen.length;
    if (!left) api.done();
    else api.setAction(seen.length ? `${left} more to open` : `Open all ${s.cards.length} cards`, false);
  }, [seen, s.cards.length, api]);

  return (
    <>
      <Head s={s} />
      <div className="tut-reveal">
        {s.cards.map((c, i) => (
          <button key={i} type="button" className={`tut-flip${open.includes(i) ? ' open' : ''}`} style={{ '--i': i }}
            aria-expanded={open.includes(i)}
            onClick={() => {
              setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
              setSeen((v) => (v.includes(i) ? v : [...v, i]));
            }}>
            <span className="tut-flip-in">
              <span className="tut-face front">
                {c.icon && <CardIcon name={c.icon} />}
                <strong>{c.title}</strong>
                <small>Tap to reveal</small>
              </span>
              <span className="tut-face back">
                <strong>{c.title}</strong>
                <span><Inline text={c.text} /></span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <Note s={s} />
    </>
  );
}

/* ---------------- section checkpoint ---------------- */
function Bridge({ s, api }) {
  const stamp = useRef(null);
  const sec = api.sections[s.sec];
  const next = api.sections[s.sec + 1];
  useEffect(() => {
    api.done(s.cta || (next ? `On to ${next.name}` : 'Continue'));
    const t = setTimeout(() => burstAt(stamp.current, 26), 380);
    buzz(20);
    return () => clearTimeout(t);
  }, [api, s.cta, next]);

  return (
    <div className="tut-bridge">
      <div className="tut-stamp" ref={stamp} aria-hidden="true">
        <CheckIcon size={44} strokeWidth={3} />
      </div>
      <p className="tut-eyebrow">
        Part {s.sec + 1} of {api.sections.length} complete · {sec.name}
      </p>
      <h2 className="tut-title" tabIndex={-1}><Inline text={s.title} /></h2>
      <div className="tut-recap">
        {s.recap.map((r, i) => (
          <div key={i} className="tut-recap-row" style={{ '--i': i + 3 }}>
            <span className="tut-tick"><CheckIcon size={13} strokeWidth={3.2} /></span>
            <span><Inline text={r} /></span>
          </div>
        ))}
      </div>
      {s.why && (
        <div className="tut-why">
          <b>Why we’re moving on</b>
          <Rich text={s.why} className="tut-why-text" />
        </div>
      )}
      {next && (
        <p className="tut-next-up">
          Next up <span>{next.name}</span>
        </p>
      )}
    </div>
  );
}

/* ---------------- callback to an earlier poll ---------------- */
function Recall({ s, api }) {
  const mine = api.mem[s.poll];
  useEffect(() => api.done(), [api]);
  return (
    <>
      <Head s={s} />
      <div className="tut-recall">
        {s.rows.map(([answer, idea, detail], i) => (
          <div key={i} className={i === mine ? 'mine' : ''} style={{ '--i': i }}>
            <q><Inline text={answer} /></q>
            <em>{idea}</em>
            <small><Inline text={detail} /></small>
          </div>
        ))}
      </div>
      <Rich text={s.after} />
    </>
  );
}

/* ---------------- custom widget ---------------- */
function Custom({ s, api }) {
  const Widget = WIDGETS[s.widget];
  return (
    <>
      <Head s={s} />
      {Widget && <Widget api={api} config={s.graph} />}
    </>
  );
}

/* ---------------- end of lesson ---------------- */
function Finish({ s, api }) {
  const [shown, setShown] = useState(0);
  const { right, graded } = api.score();
  useEffect(() => {
    api.complete();
    confetti();
    buzz([20, 40, 20]);
    if (api.nextLesson) {
      api.setAction(`Next: ${api.nextLesson.title}`, true, api.goNextLesson, { label: 'Back to tutorial', fn: api.exit });
    } else {
      api.setAction('Back to tutorial', true, api.exit, { label: 'Replay lesson', fn: api.restart });
    }
  }, [api]);
  useEffect(() => {
    if (shown >= right) return;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 70);
    return () => clearTimeout(t);
  }, [shown, right]);

  const terms = api.sections.flatMap((x) => x.terms || []);
  return (
    <div className="tut-finish">
      <Art name={s.art || 'badge'} />
      <p className="tut-eyebrow">Lesson complete</p>
      <h2 className="tut-title" tabIndex={-1}><Inline text={s.title} /></h2>
      <div className="tut-scoreline">
        <span>{shown}</span>/{graded}
        <small>right on the first try</small>
      </div>
      <Rich text={s.body} />
      {terms.length > 0 && <Terms terms={terms} />}
      <SyncFab />
    </div>
  );
}

export const SCREENS = {
  story: Story,
  choice: Choice,
  multi: Multi,
  sort: Sort,
  order: Order,
  reveal: Reveal,
  bridge: Bridge,
  recall: Recall,
  custom: Custom,
  finish: Finish,
};
