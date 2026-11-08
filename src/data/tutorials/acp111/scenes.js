// ACP 111 · pictures for the even-pseudoprime paper: powers of 2 going round a clock (mod 7, then
// mod 73), a sum that keeps growing beside one that settles, how much each even pseudoprime adds,
// and the paper's final budget filling up to its bound.

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (n) => String(n).replace(/\d/g, (d) => SUP[d]);

// Powers of 2 on a clock with m hours. `upto(step)` says how many powers are shown at each step.
function clock(m, upto, labels) {
  const cx = 170;
  const cy = 128;
  const R = 100;
  const at = (r) => {
    const a = (2 * Math.PI * r) / m - Math.PI / 2;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  };
  const powers = [];
  let v = 1;
  for (let k = 1; k <= 12; k++) {
    v = (v * 2) % m;
    powers.push(v);
  }
  return (step) => {
    const n = upto[step];
    const rim = Array.from({ length: 73 }, (_, i) => [cx + R * Math.cos((2 * Math.PI * i) / 72), cy + R * Math.sin((2 * Math.PI * i) / 72)]);
    const items = [{ id: 'rim', curve: rim, kind: 's', o: 0.25 }];
    for (let r = 0; r < m; r++) {
      const hit = powers.slice(0, n).includes(r);
      items.push({ id: `h${r}`, dot: at(r), r: hit ? (m > 20 ? 5 : 8) : m > 20 ? 2.5 : 5, kind: hit ? 'a' : 's', o: hit ? 1 : 0.6 });
      if (labels) {
        const [x, y] = at(r);
        items.push({ id: `l${r}`, text: [cx + (x - cx) * 1.2, cy + (y - cy) * 1.2 + 5], label: String(r), kind: hit ? 'a' : 's', size: 15 });
      }
    }
    for (let k = 0; k < 12; k++) {
      const from = k === 0 ? at(1) : at(powers[k - 1]);
      const to = at(powers[k]);
      items.push({ id: `j${k}`, line: [...from, ...to], kind: 'c', o: k < n ? 0.85 : 0 });
    }
    const last = n ? powers[n - 1] : 1;
    items.push({ id: 'now', text: [cx, cy + 6], label: n ? `2${sup(n)} ≡ ${last}` : `mod ${m}`, kind: 'e', size: 18 });
    return items;
  };
}

export const clockSeven = {
  type: 'custom',
  widget: 'scene',
  eyebrow: 'See it',
  title: 'Powers of 2 on a 7-hour clock',
  graph: {
    aria: 'Powers of 2 moving round a clock with 7 positions',
    steps: [
      { say: 'Working **mod 7** means keeping only the remainder after dividing by $7$, like a clock with hours $0$ to $6$.' },
      { say: '$2^1 = 2$. Land on hour $2$.' },
      { say: '$2^2 = 4$. Hour $4$.' },
      { say: '$2^3 = 8 = 7 + 1$. Past $6$ we wrap round: hour $1$.' },
      { say: 'Doubling again repeats the loop $2 \\to 4 \\to 1$. Powers of $2$ **cycle**, here every $3$ steps.' },
      { say: 'Seven doublings: $2^7 = 128 = 18 \\cdot 7 + 2$, so $2^7 \\equiv 2 \\pmod 7$. Back on hour $2$, as Fermat’s theorem promises for the prime $7$.' },
    ],
    draw: clock(7, [0, 1, 2, 3, 6, 7], true),
  },
};

export const clockSeventyThree = {
  type: 'custom',
  widget: 'scene',
  eyebrow: 'See it',
  title: 'The cycle of 2 mod 73',
  graph: {
    aria: 'Powers of 2 moving round a clock with 73 positions',
    steps: [
      { say: 'The same game on a $73$-hour clock, for the prime $73$ that divides $161038$.' },
      { say: '$2, 4, 8, 16, 32, 64$: six doublings, no wrap yet.' },
      { say: '$2^7 = 128 \\equiv 55$, then $2^8 \\equiv 110 \\equiv 37$, then $2^9 \\equiv 74 \\equiv 1$. Back to $1$ after **9** steps.' },
      { say: 'So powers of $2$ mod $73$ repeat every $9$ steps. This period is the **order** of $2$ mod $73$, written $\\ell_2(73) = 9$. Notice $9$ divides $73 - 1 = 72$.' },
    ],
    draw: clock(73, [0, 6, 9, 9], false),
  },
};

// Bars of 1/n (or 1/n²) for n = 1..12, with a running-total column on the right.
function terms(step) {
  const square = step >= 2;
  const items = [];
  let total = 0;
  for (let n = 1; n <= 12; n++) {
    const t = square ? 1 / (n * n) : 1 / n;
    total += t;
    items.push({ id: `b${n}`, bar: [22 + (n - 1) * 19, 225], w: 14, h: t * 120, kind: square ? 'b' : 'a', delay: n * 30 });
    items.push({ id: `n${n}`, text: [29 + (n - 1) * 19, 242], label: String(n), kind: 's', size: 10 });
  }
  const grow = step === 1 || step === 3;
  const shownTotal = step === 1 ? total : 1.645;
  items.push({ id: 'tot', bar: [272, 225], w: 34, h: grow ? shownTotal * 52 : 0, kind: square ? 'b' : 'a' });
  items.push({ id: 'totl', text: [289, grow ? 225 - shownTotal * 52 - 8 : 210], label: step === 1 ? 'grows forever' : step === 3 ? 'settles at 1.645' : '', kind: 'e', size: 11, o: grow ? 1 : 0 });
  items.push({ id: 'cap', text: [289, 242], label: 'total', kind: 's', size: 10 });
  items.push({ id: 'what', text: [125, 26], label: square ? 'terms 1/n²' : 'terms 1/n', kind: square ? 'b' : 'a', size: 15 });
  items.push({ id: 'cap1', line: [266, 30, 266, 230], kind: 's', o: 0.35 });
  return items;
}

export const twoSums = {
  type: 'custom',
  widget: 'scene',
  eyebrow: 'See it',
  title: 'One sum explodes, one settles',
  graph: {
    aria: 'Bars for 1 over n and 1 over n squared, with their running totals',
    steps: [
      { say: 'Here are the terms $1, \\tfrac12, \\tfrac13, \\tfrac14, \\dots$ Each is smaller than the last.' },
      { say: 'Yet their running total **never stops growing**: it passes $3$ after $11$ terms and $10$ after $12{,}367$. Shrinking terms are not enough.' },
      { say: 'Now square them: $1, \\tfrac14, \\tfrac19, \\tfrac1{16}, \\dots$ These shrink **much faster**.' },
      { say: 'This total settles at about $1.645$, however many terms you add. Infinitely many terms, finite sum: the squares are **sparse** enough.' },
    ],
    draw: terms,
  },
};

// How much the first even pseudoprimes add to the sum up to 10^16 (0.0000118853…).
const SMALL = 0.0000118853;
const PARTS = [
  { id: 'p1', n: '161038', v: 1 / 161038, kind: 'a' },
  { id: 'p2', n: '215326', v: 1 / 215326, kind: 'b' },
  { id: 'p3', n: '2568226', v: 1 / 2568226, kind: 'c' },
  { id: 'p4', n: 'the other 2042', v: SMALL - 1 / 161038 - 1 / 215326 - 1 / 2568226, kind: 'd' },
];
function shares(step) {
  const items = [];
  const W = 300;
  let x = 20;
  PARTS.forEach((p, i) => {
    const w = (p.v / SMALL) * W;
    const on = step >= i;
    items.push({ id: `${p.id}b`, bar: [x, 130], w: Math.max(w - 2, 1.5), h: 40, kind: p.kind, o: on ? 1 : 0, delay: 100 });
    items.push({ id: `${p.id}t`, text: i < 2 ? [x + w / 2, 80] : [170, 165 + (i - 2) * 22], label: `${i < 3 ? '1/' : ''}${p.n}: ${Math.round((p.v / SMALL) * 100)}%`, kind: p.kind, size: i < 2 ? 12 : 11, o: on ? 1 : 0 });
    x += w;
  });
  items.push({ id: 'total', text: [170, 40], label: 'all even pseudoprimes up to 10¹⁶: 0.0000118853', kind: 's', size: 12 });
  items.push({ id: 'tail', text: [170, 225], label: 'beyond 10¹⁶: infinitely many, never listed', kind: 'e', size: 12, o: step >= 4 ? 1 : 0 });
  items.push({ id: 'q', text: [170, 245], label: 'their share must be bounded, not computed', kind: 'e', size: 12, o: step >= 4 ? 1 : 0 });
  return items;
}

export const firstLiars = {
  type: 'custom',
  widget: 'scene',
  eyebrow: 'See it',
  title: 'Who contributes to the sum',
  graph: {
    aria: 'A bar split into the contributions of the first even pseudoprimes',
    steps: [
      { say: 'The whole bar is the sum of $1/N$ over **every** even pseudoprime up to $10^{16}$, all $2045$ of them: $0.0000118853\\ldots$ The first one, $1/161038$, is already **52%** of it.' },
      { say: 'Add $1/215326$: together the first two make **91%**.' },
      { say: 'The third, $1/2568226$, adds about $3\\%$ more. Each new one is much bigger, so it adds much less.' },
      { say: 'The remaining $2042$ numbers share the last **5%**. The sum is dominated by its first terms.' },
      { say: 'Beyond $10^{16}$ there are infinitely many more, and no list. Their total can’t be computed, only **bounded**. That is what most of the paper does.' },
    ],
    draw: shares,
  },
};

// The final budget as a stacked column: each piece of the proof adds its share.
const BUDGET = [
  { id: 's', v: 0.000012, kind: 's', label: 'small range 0.000012' },
  { id: 'a1', v: 0.003138, kind: 'a', label: 'A₁ smooth 0.003138' },
  { id: 'a2', v: 0.00007, kind: 'b', label: 'A₂ computed 0.000070' },
  { id: 't1', v: 0.000925, kind: 'c', label: 'A₃–A₅, k ≤ 130: 0.000925' },
  { id: 't2', v: 0.000535, kind: 'd', label: 'A₃–A₅, k ≥ 131: 0.000535' },
  { id: 't3', v: 0.001185, kind: 'e', label: 'A₃–A₅, p > zₖ: 0.001185' },
];
const PX = 35000; // pixels per unit of the sum: 0.006 → 210 px
function budget(step) {
  const items = [];
  let base = 240;
  const shown = Math.min(step + 1, BUDGET.length);
  BUDGET.forEach((b, i) => {
    const h = b.v * PX;
    const on = i < shown;
    items.push({ id: b.id, bar: [60, base], w: 70, h: on ? Math.max(h, 1.5) : 0, kind: b.kind, delay: 80 });
    const ly = i === 0 ? base + 12 : base - h / 2 + 4;
    items.push({ id: `${b.id}l`, text: [142, i === 2 ? ly + 9 : ly], label: b.label, kind: b.kind, size: 11, anchor: 'start', o: on ? 1 : 0 });
    base -= h;
  });
  const y59 = 240 - 0.0059 * PX;
  const done = step >= BUDGET.length;
  items.push({ id: 'lim', line: [40, y59, 150, y59], kind: 'e', o: done ? 1 : 0, dash: true });
  items.push({ id: 'liml', text: [36, y59 + 4], label: '0.0059', kind: 'e', size: 12, anchor: 'end', o: done ? 1 : 0 });
  items.push({ id: 'sum', text: [95, 18], label: done ? 'total 0.005865 < 0.0059' : 'adding up the pieces', kind: done ? 'e' : 's', size: 13 });
  return items;
}

export const budgetScene = {
  type: 'custom',
  widget: 'scene',
  eyebrow: 'See it',
  title: 'The budget fills up',
  graph: {
    aria: 'A stacked column adding the six pieces of the bound',
    steps: [
      { say: 'Start with the part that is known exactly: everything up to $10^{16}$, just $0.000012$. Too thin to see.' },
      { say: '$\\mathcal A_1$, numbers with only small prime factors: $0.003138$. More than half the final bound.' },
      { say: '$\\mathcal A_2$, settled by a direct computer sum: only $0.000070$.' },
      { say: 'Now the analytic groups $\\mathcal A_3$ to $\\mathcal A_5$ for $39 \\le k \\le 130$: $0.000925$.' },
      { say: 'The same groups for $k \\ge 131$: $0.000535$.' },
      { say: 'And every $k$ when $p > z_k$, where only Proposition 11 applies: $0.001185$.' },
      { say: 'Total $0.005865$, just under $0.0059$. Every even pseudoprime is counted in some piece, so the whole infinite sum is below $0.0059$.' },
    ],
    draw: budget,
  },
};
