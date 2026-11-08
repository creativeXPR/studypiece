// COS 202 · pictures of memory. Each scene is a list of states that the learner steps through:
// variables on the left (the stack), objects on the right (the heap) with arrows for references,
// and rows of cells for arrays. Items are keyed by name, so boxes and arrows glide between states.

const FRAME = (items, note) => ({ M: [1, 0, 0, 1], R: 5, grid: false, ghost: false, items, note });
const rect = (id, x, y, w, h, kind, o = 1) => ({ id, poly: [[x, y], [x + w, y], [x + w, y - h], [x, y - h]], kind, o });
const label = (id, x, y, text, kind = 's', size = 12, anchor = 'middle') => ({ id, text: [x, y], label: text, kind, size, anchor });

// state: {
//   stack: [{ name, value?, ref?, kind? }],         variables, top to bottom
//   heap: [{ id, type, fields: [[name, value]], kind?, fieldRefs?: { field: heapId } }],
//   cells: { values: [...], keys?: [...], y?, marks?: { name: index }, faded?: [i], kind?: [i, kind][] },
//   titles?: false to hide the "variables" / "objects" headings
// }
function draw(state) {
  const items = [];
  // With no objects to show, the variables (or stack frames) get the full width.
  const wide = !state.heap;
  const SX = wide ? -4.6 : -6.1;
  const SW = wide ? 9.2 : 4.2;
  const HX = 0.5;
  const HW = 5.5;
  const showTitles = state.titles !== false;
  if (state.stack && showTitles) items.push(label('t-stack', SX + SW / 2, 4.55, 'variables', 's', 11));
  if (state.heap && showTitles) items.push(label('t-heap', HX + HW / 2, 4.55, 'objects (heap)', 's', 11));

  const heapAt = {};
  let hy = 4.1;
  (state.heap ?? []).forEach((o) => {
    const h = 0.75 + 0.55 * o.fields.length;
    heapAt[o.id] = { y: hy, h };
    const k = o.kind ?? 'a';
    items.push(rect(`h-${o.id}`, HX, hy, HW, h, k));
    items.push(label(`hl-${o.id}`, HX + 0.25, hy - 0.5, o.type, k, 13, 'start'));
    o.fields.forEach(([f, v], i) => {
      items.push(label(`hf-${o.id}-${f}`, HX + 0.45, hy - 1.05 - 0.55 * i, `${f} = ${v}`, 's', 12, 'start'));
    });
    hy -= h + 0.35;
  });

  (state.stack ?? []).forEach((v, i) => {
    const y = 4.1 - i * 0.95;
    const k = v.kind ?? 's';
    items.push(rect(`s-${v.name}`, SX, y, SW, 0.75, k, 0.9));
    items.push(label(`sn-${v.name}`, SX + 0.2, y - 0.5, v.name, k === 's' ? 's' : k, 13, 'start'));
    if (v.ref) {
      const at = heapAt[v.ref];
      if (at) items.push({ id: `a-${v.name}`, vec: [HX - 0.05, at.y - 0.4], from: [SX + SW - 0.25, y - 0.38], kind: k === 's' ? 'a' : k });
      items.push({ id: `sd-${v.name}`, pt: [SX + SW - 0.25, y - 0.38], kind: k === 's' ? 'a' : k, r: 3 });
    } else if (v.value !== undefined) {
      items.push(label(`sv-${v.name}`, SX + SW - 0.2, y - 0.5, String(v.value), 'a', 13, 'end'));
    }
  });

  (state.heap ?? []).forEach((o) => {
    Object.entries(o.fieldRefs ?? {}).forEach(([f, target], i) => {
      const from = heapAt[o.id];
      const to = heapAt[target];
      const fi = o.fields.findIndex(([n]) => n === f);
      if (from && to) items.push({ id: `fa-${o.id}-${f}`, vec: [HX + HW - 0.1, to.y - 0.3], from: [HX + HW - 0.6, from.y - 1.0 - 0.55 * Math.max(fi, i)], kind: 'e' });
    });
  });

  if (state.cells) {
    const c = state.cells;
    const n = c.values.length;
    const w = Math.min(1.2, 11.6 / n);
    const x0 = -(n * w) / 2;
    const y = c.y ?? 0.8;
    const kinds = Object.fromEntries(c.kind ?? []);
    c.values.forEach((v, i) => {
      const key = c.keys?.[i] ?? i;
      const faded = c.faded?.includes(i);
      const k = kinds[i] ?? 'a';
      items.push(rect(`c-${key}`, x0 + i * w + 0.04, y, w - 0.08, 0.9, k, faded ? 0.25 : 1));
      items.push(label(`cv-${key}`, x0 + i * w + w / 2, y - 0.6, String(v), faded ? 's' : k, 13));
      items.push(label(`ci-${i}`, x0 + i * w + w / 2, y + 0.25, String(i), 's', 10));
    });
    Object.entries(c.marks ?? {}).forEach(([m, i], j) => {
      if (i === null || i === undefined) return;
      const x = x0 + i * w + w / 2;
      items.push({ id: `m-${m}`, vec: [x, y - 1.0], from: [x, y - 1.9 - 0.55 * (j % 2)], kind: 'e' });
      items.push(label(`ml-${m}`, x, y - 2.25 - 0.55 * (j % 2), m, 'e', 12));
    });
  }
  return items;
}

// Every point an item uses, to fit the picture to the frame.
const pointsOf = (it) => [it.text, it.pt, it.vec, it.from, ...(it.poly ?? []), ...(it.seg ?? [])].filter(Boolean);

// steps: [{ say, state, action? }]; the first has no action, each later one has its own button.
// The view is fitted once to everything any step draws (centred and zoomed in), so boxes are as
// large as the frame allows and nothing jumps between steps.
function memScene({ title, eyebrow = 'Watch', steps }) {
  const drawn = steps.map((s) => draw(s.state));
  const pts = drawn.flat().flatMap(pointsOf);
  const [x0, x1] = [Math.min(...pts.map((p) => p[0])) - 0.3, Math.max(...pts.map((p) => p[0])) + 0.3];
  const [y0, y1] = [Math.min(...pts.map((p) => p[1])) - 0.3, Math.max(...pts.map((p) => p[1])) + 0.3];
  const [cx, cy] = [(x0 + x1) / 2, (y0 + y1) / 2];
  // The plane shows about ±1.28 R across and ±1.05 R up.
  const R = Math.max((x1 - x0) / 2 / 1.28, (y1 - y0) / 2 / 1.05, 2.4);
  const shift = (p) => [p[0] - cx, p[1] - cy];
  const place = (it) => {
    const out = { ...it };
    ['text', 'pt', 'vec', 'from'].forEach((k) => { if (it[k]) out[k] = shift(it[k]); });
    if (it.poly) out.poly = it.poly.map(shift);
    if (it.seg) out.seg = it.seg.map(shift);
    return out;
  };
  return {
    type: 'custom',
    widget: 'plane',
    eyebrow,
    title,
    graph: {
      steps: steps.map((s, i) => ({ say: s.say, ...(i > 0 ? { action: { label: s.action ?? 'Next step' } } : {}) })),
      draw: (step, presses) => {
        const k = Math.min(presses, steps.length - 1);
        return { ...FRAME(drawn[k].map(place), steps[k].note), R };
      },
    },
  };
}

/* ---------------- Chapter 0 ---------------- */

export const valuesScene = memScene({
  title: 'Boxes and arrows',
  steps: [
    { say: '`int units = 3;` makes a box called `units` and puts the number 3 **inside** it. Primitive values (int, double, char, boolean) live right in their box.', state: { stack: [{ name: 'units', value: 3 }] } },
    { action: 'Make a String', say: '`String name = "Tobi";` is different. The text is an **object** stored elsewhere, in the heap. The box `name` holds only an **arrow** (a reference) to it.', state: { stack: [{ name: 'units', value: 3 }, { name: 'name', ref: 'str' }], heap: [{ id: 'str', type: 'String', fields: [['text', '"Tobi"']] }] } },
    { action: 'Copy both', say: '`int u2 = units;` copies the **number**: two separate 3s. `String n2 = name;` copies the **arrow**: two arrows to the same text. That difference, value versus reference, explains half of Java’s surprises.', state: { stack: [{ name: 'units', value: 3 }, { name: 'name', ref: 'str' }, { name: 'u2', value: 3, kind: 'c' }, { name: 'n2', ref: 'str', kind: 'c' }], heap: [{ id: 'str', type: 'String', fields: [['text', '"Tobi"']] }] } },
  ],
});

/* ---------------- Chapter 1 ---------------- */

export const arraysScene = memScene({
  title: 'An array is one object with numbered slots',
  steps: [
    { say: '`int[] scores = new int[3];` creates **one object** in the heap with three slots, all starting at `0`. The variable `scores` holds an arrow to it.', state: { stack: [{ name: 'scores', ref: 'arr' }], heap: [{ id: 'arr', type: 'int[3]', fields: [['[0]', 0], ['[1]', 0], ['[2]', 0]] }] } },
    { action: 'Fill it', say: '`scores[0] = 72; scores[1] = 58; scores[2] = 65;` writes into the slots. Positions start at 0, so the last one is `[2]`, which is `length - 1`.', state: { stack: [{ name: 'scores', ref: 'arr' }], heap: [{ id: 'arr', type: 'int[3]', fields: [['[0]', 72], ['[1]', 58], ['[2]', 65]] }] } },
    { action: 'Copy the variable', say: '`int[] copy = scores;` copies the **arrow**, not the slots. `copy[0] = 99;` changes the one shared array, so `scores[0]` is now 99 too. To really copy, use `scores.clone()` or `Arrays.copyOf`.', state: { stack: [{ name: 'scores', ref: 'arr' }, { name: 'copy', ref: 'arr', kind: 'c' }], heap: [{ id: 'arr', type: 'int[3]', fields: [['[0]', 99], ['[1]', 58], ['[2]', 65]] }] } },
  ],
});

/* ---------------- Chapter 2 ---------------- */

const frames = (list) => list.map(([name, value, kind]) => ({ name, value, kind }));
export const recursionScene = memScene({
  title: 'The call stack grows, then unwinds',
  steps: [
    { say: '`main` calls `fact(3)`. Each call gets its **own box** (a stack frame) with its own `n`, stacked on top of the caller.', state: { stack: frames([['main', 'fact(3)'], ['fact n=3', '3 × fact(2)', 'c']]), titles: false } },
    { action: 'Call deeper', say: '`fact(3)` can’t finish until `fact(2)` answers, which waits for `fact(1)`. The stack grows one frame per call.', state: { stack: frames([['main', 'fact(3)'], ['fact n=3', '3 × fact(2)'], ['fact n=2', '2 × fact(1)'], ['fact n=1', 'base case', 'b']]), titles: false } },
    { action: 'Hit the base case', say: '`fact(1)` is the **base case**: it returns 1 without calling again. Now the waiting frames can finish, top first.', state: { stack: frames([['main', 'fact(3)'], ['fact n=3', '3 × fact(2)'], ['fact n=2', '2 × 1 = 2', 'b']]), titles: false } },
    { action: 'Unwind', say: '`fact(2)` returns 2, so `fact(3)` returns `3 × 2 = 6` to `main`. Without a base case the stack would grow until Java throws `StackOverflowError`.', state: { stack: frames([['main', 'gets 6', 'b']]), titles: false } },
  ],
});

const IDS = ['C01', 'C04', 'C09', 'C12', 'C17', 'C21', 'C26', 'C30', 'C33'];
export const binarySearchScene = memScene({
  title: 'Halve the search every time',
  steps: [
    { say: 'Nine sorted matric numbers. Looking for **C26**. Binary search starts with `low = 0` and `high = 8`, and checks the middle.', state: { cells: { values: IDS, marks: { low: 0, high: 8 } }, titles: false } },
    { action: 'Check the middle', say: '`mid = (0 + 8) / 2 = 4`: C17. C26 is **bigger**, so it can only be to the right. Throw away the whole left half: `low = 5`.', state: { cells: { values: IDS, marks: { low: 5, mid: 4, high: 8 }, faded: [0, 1, 2, 3, 4] }, titles: false } },
    { action: 'Check again', say: '`mid = (5 + 8) / 2 = 6`: C26. Found at index 6 after **2** checks. Linear search would have needed 7. On a million sorted names, binary search needs about 20 checks.', state: { cells: { values: IDS, marks: { mid: 6 }, faded: [0, 1, 2, 3, 4, 5, 7, 8], kind: [[6, 'b']] }, titles: false } },
  ],
});

// Selection sort on five CGPAs, keyed so each value slides to its new place.
const SORT = [
  { v: [3.1, 4.5, 2.8, 4.0, 3.6], k: ['a', 'b', 'c', 'd', 'e'] },
  { v: [2.8, 4.5, 3.1, 4.0, 3.6], k: ['c', 'b', 'a', 'd', 'e'] },
  { v: [2.8, 3.1, 4.5, 4.0, 3.6], k: ['c', 'a', 'b', 'd', 'e'] },
  { v: [2.8, 3.1, 3.6, 4.0, 4.5], k: ['c', 'a', 'e', 'd', 'b'] },
];
const sortState = (i, extra = {}) => ({ cells: { values: SORT[i].v, keys: SORT[i].k, ...extra }, titles: false });
export const selectionSortScene = memScene({
  title: 'Selection sort, pass by pass',
  steps: [
    { say: 'Five CGPAs to sort, smallest first. Each pass **selects** the smallest value in the unsorted part and **swaps** it to the front of that part.', state: sortState(0) },
    { action: 'Pass 1', say: 'The smallest of all five is 2.8 (index 2). Swap it with index 0. Position 0 is now final.', state: sortState(1, { kind: [[0, 'b']] }) },
    { action: 'Pass 2', say: 'Smallest of indexes 1–4 is 3.1. Swap it into index 1.', state: sortState(2, { kind: [[0, 'b'], [1, 'b']] }) },
    { action: 'Passes 3 and 4', say: 'Pass 3 swaps 3.6 into index 2; pass 4 finds 4.0 already in place. With $n$ values there are $n - 1$ passes, and the sorted part grows by one each time.', state: sortState(3, { kind: [[0, 'b'], [1, 'b'], [2, 'b'], [3, 'b'], [4, 'b']] }) },
  ],
});

/* ---------------- Chapter 3 ---------------- */

export const objectsScene = memScene({
  title: 'Variables hold arrows to objects',
  steps: [
    { say: '`Student a = new Student("Tobi");` — `new` builds an object in the heap; `a` holds an arrow to it.', state: { stack: [{ name: 'a', ref: 's1' }], heap: [{ id: 's1', type: 'Student', fields: [['name', '"Tobi"'], ['cgpa', '0.0']] }] } },
    { action: 'A second student', say: '`Student b = new Student("Ada");` — a second `new`, a second object with its **own** fields.', state: { stack: [{ name: 'a', ref: 's1' }, { name: 'b', ref: 's2' }], heap: [{ id: 's1', type: 'Student', fields: [['name', '"Tobi"'], ['cgpa', '0.0']] }, { id: 's2', type: 'Student', fields: [['name', '"Ada"'], ['cgpa', '0.0']] }] } },
    { action: 'b = a', say: '`b = a;` copies the arrow. Now both point at Tobi; Ada’s object has **no arrows left**, so the garbage collector will reclaim it.', state: { stack: [{ name: 'a', ref: 's1' }, { name: 'b', ref: 's1', kind: 'c' }], heap: [{ id: 's1', type: 'Student', fields: [['name', '"Tobi"'], ['cgpa', '0.0']] }, { id: 's2', type: 'Student, unreachable', fields: [['name', '"Ada"'], ['cgpa', '0.0']], kind: 's' }] } },
    { action: 'b.cgpa = 4.2', say: '`b.cgpa = 4.2;` follows b’s arrow and changes **Tobi’s** object. So `a.cgpa` is 4.2 as well: two names, one object.', state: { stack: [{ name: 'a', ref: 's1' }, { name: 'b', ref: 's1', kind: 'c' }], heap: [{ id: 's1', type: 'Student', fields: [['name', '"Tobi"'], ['cgpa', '4.2']] }] } },
  ],
});

export const constructorScene = memScene({
  title: 'What new and the constructor do',
  steps: [
    { say: '`new Student("Tobi", 4.2)` first makes a blank object: every field gets its **default** (null, 0.0).', state: { stack: [{ name: 'this', ref: 's1', kind: 'e' }], heap: [{ id: 's1', type: 'Student', fields: [['name', 'null'], ['cgpa', '0.0']] }] } },
    { action: 'Run the constructor', say: 'Then the constructor runs with `this` pointing at the new object. `this.name = name;` copies the parameter into the field.', state: { stack: [{ name: 'this', ref: 's1', kind: 'e' }, { name: 'name', value: '"Tobi"' }, { name: 'cgpa', value: 4.2 }], heap: [{ id: 's1', type: 'Student', fields: [['name', '"Tobi"'], ['cgpa', '4.2']] }] } },
    { action: 'Hand it back', say: 'The constructor finishes, its parameters disappear, and `new` hands back the arrow, which `Student s =` stores.', state: { stack: [{ name: 's', ref: 's1' }], heap: [{ id: 's1', type: 'Student', fields: [['name', '"Tobi"'], ['cgpa', '4.2']] }] } },
  ],
});

/* ---------------- Chapter 4 ---------------- */

export const staticScene = memScene({
  title: 'One static field, shared by all',
  steps: [
    { say: 'Each `Student` object has its own `name`. But `static int count` belongs to the **class**: there is exactly one, however many objects exist.', state: { heap: [{ id: 'cls', type: 'class Student', fields: [['static count', 0]], kind: 'e' }] } },
    { action: 'new Student("Tobi")', say: 'The constructor does `count++`. One object, `count` is 1.', state: { stack: [{ name: 'a', ref: 's1' }], heap: [{ id: 'cls', type: 'class Student', fields: [['static count', 1]], kind: 'e' }, { id: 's1', type: 'Student', fields: [['name', '"Tobi"']] }] } },
    { action: 'Two more', say: 'Two more students, two more `count++`, all on the **same** shared field: `Student.count` is 3. That is why static fields suit totals and constants, and instance fields suit each object’s own data.', state: { stack: [{ name: 'a', ref: 's1' }, { name: 'b', ref: 's2' }, { name: 'c', ref: 's3' }], heap: [{ id: 'cls', type: 'class Student', fields: [['static count', 3]], kind: 'e' }, { id: 's1', type: 'Student', fields: [['name', '"Tobi"']] }, { id: 's2', type: 'Student', fields: [['name', '"Ada"']] }, { id: 's3', type: 'Student', fields: [['name', '"Femi"']] }] } },
  ],
});

/* ---------------- Chapter 5 ---------------- */

export const inheritanceScene = memScene({
  title: 'A Student object contains a Person part',
  steps: [
    { say: '`class Student extends Person`. A `Student` object is built in layers: first the **Person** part (its `name`), then the **Student** part (its `id` and `cgpa`).', state: { stack: [{ name: 's', ref: 'o' }], heap: [{ id: 'o', type: 'Student object', fields: [['Person: name', '"Tobi"'], ['id', '"C26"'], ['cgpa', '4.2']] }] } },
    { action: 'Person p = s', say: '`Person p = s;` is allowed because a Student **IS-A** Person. Same object, but through `p` Java only lets you call what **Person** declares.', state: { stack: [{ name: 's', ref: 'o' }, { name: 'p (Person)', ref: 'o', kind: 'c' }], heap: [{ id: 'o', type: 'Student object', fields: [['Person: name', '"Tobi"'], ['id', '"C26"'], ['cgpa', '4.2']] }] } },
    { action: 'Call p.describe()', say: 'If Student **overrides** `describe()`, then `p.describe()` still runs Student’s version: Java looks at the **object**, not the variable’s type. That is runtime polymorphism (dynamic dispatch).', state: { stack: [{ name: 's', ref: 'o' }, { name: 'p (Person)', ref: 'o', kind: 'c' }], heap: [{ id: 'o', type: 'Student object', fields: [['Person: name', '"Tobi"'], ['id', '"C26"'], ['cgpa', '4.2']], kind: 'b' }] } },
  ],
});

/* ---------------- Chapter 7 ---------------- */

const LIST = (vals, keys, extra = {}) => ({ cells: { values: vals, keys, ...extra }, titles: false });
export const arrayListScene = memScene({
  title: 'Removing from an ArrayList shifts the rest',
  steps: [
    { say: 'Tobi’s registered courses in an `ArrayList<String>`. Indexes 0 to 3; `size()` is 4.', state: LIST(['MTH', 'COS', 'STA', 'GST'], ['m', 'c', 's', 'g']) },
    { action: 'remove(1)', say: '`courses.remove(1)` takes out COS. Everything after it **slides left** to close the gap: STA is now index 1, GST index 2, and `size()` is 3.', state: LIST(['MTH', 'STA', 'GST'], ['m', 's', 'g']) },
    { action: 'add("PHY")', say: '`courses.add("PHY")` appends at the end. Unlike an array, an ArrayList grows and shrinks for you. Careful in loops: removing while counting up skips the item that slid into the gap.', state: LIST(['MTH', 'STA', 'GST', 'PHY'], ['m', 's', 'g', 'p'], { kind: [[3, 'b']] }) },
  ],
});

/* ---------------- Chapter 8 ---------------- */

export const exceptionScene = memScene({
  title: 'An exception climbs the stack',
  steps: [
    { say: '`main` calls `register()`, which calls `parseScore("7O")` (a letter O, not a zero). Three frames on the stack.', state: { stack: frames([['main  (has try/catch)', ''], ['register()', ''], ['parseScore("7O")', '']]), titles: false } },
    { action: 'Throw', say: '`Integer.parseInt("7O")` throws a `NumberFormatException`. `parseScore` has no `catch`, so its frame is **abandoned** and the exception moves to the caller.', state: { stack: frames([['main  (has try/catch)', ''], ['register()', 'exception arrives', 'd']]), titles: false } },
    { action: 'Keep climbing', say: '`register()` doesn’t catch it either, so it is abandoned too. The exception keeps climbing until a matching `catch`.', state: { stack: frames([['main  (has try/catch)', 'caught!', 'b']]), titles: false } },
    { action: 'Handle it', say: '`main`’s `catch (NumberFormatException e)` handles it, then `finally` runs, and the program carries on. If nobody catches it, the program stops and prints the stack trace.', state: { stack: frames([['main', 'prints "Bad score"', 'b']]), titles: false } },
  ],
});
