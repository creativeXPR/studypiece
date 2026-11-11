// SPO 101 · Chapter 8 pictures: words as points on a map where similar words sit together (with a
// direction meaning "capital of"), and attention: the word "it" looking back at the other words,
// with the strongest links changing when one word of the sentence changes.
import { frame } from '../plot';

const WORDS = [
  ['zobo', [-4.2, 2.6], 'c'], ['fanta', [-3.2, 3.4], 'c'], ['coke', [-2.6, 2.5], 'c'], ['water', [-3.8, 1.5], 'c'],
  ['sunny', [2.4, 3.2], 'd'], ['hot', [3.4, 2.4], 'd'], ['rain', [2.2, 0.9], 'd'],
  ['bottle', [-1.0, -0.6], 'e'], ['crate', [-0.2, -1.4], 'e'], ['cooler', [-1.6, -1.6], 'e'],
];
const CITIES = [['Nigeria', [0.6, -2.6]], ['Abuja', [3.4, -1.7]], ['Ghana', [1.0, -4.3]], ['Accra', [3.8, -3.4]]];

export const embeddingScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'A map of meanings',
  graph: {
    steps: [
      { say: 'An ==embedding== gives every word a position, a list of numbers. Here each word gets just two numbers, so we can draw it as a point on a map.' },
      { say: 'Training places words that appear in similar sentences **close together**. Drinks gather in one corner, weather words in another, containers in a third. Nobody told the model these groups; it learned them from how words are used.', action: { label: 'Show the groups' } },
      { say: 'Directions carry meaning too. The step from **Nigeria** to **Abuja** is almost the same as from **Ghana** to **Accra**: the direction means “capital of”. So Abuja − Nigeria + Ghana lands near Accra.', action: { label: 'Show a direction' } },
      { say: 'Real embeddings use hundreds or thousands of numbers per word, not two, so they can hold many kinds of similarity at once. But the idea is the same: **meaning becomes position**.' },
    ],
    draw: (step, presses) => {
      const items = [];
      WORDS.forEach(([w, p, k], i) => {
        items.push({ id: `w${i}`, pt: p, kind: presses >= 1 ? k : 's', r: 4 });
        items.push({ id: `l${i}`, text: [p[0], p[1] + 0.35], label: w, kind: presses >= 1 ? k : 's', size: 12 });
      });
      if (presses >= 1) {
        items.push({ id: 'g1', text: [-3.4, 4.3], label: 'drinks', kind: 'c', size: 11 }, { id: 'g2', text: [2.9, 4.0], label: 'weather', kind: 'd', size: 11 }, { id: 'g3', text: [-2.7, -2.3], label: 'containers', kind: 'e', size: 11 });
      }
      if (presses >= 2) {
        CITIES.forEach(([w, p], i) => {
          items.push({ id: `c${i}`, pt: p, kind: 'a', r: 4 }, { id: `cl${i}`, text: [p[0], p[1] + 0.35], label: w, kind: 'a', size: 12 });
        });
        items.push({ id: 'v1', vec: [3.4, -1.7], from: [0.6, -2.6], kind: 'b' }, { id: 'v2', vec: [3.8, -3.4], from: [1.0, -4.3], kind: 'b' });
      }
      return { M: [1, 0, 0, 1], R: 5, grid: false, ghost: false, items, note: presses >= 2 ? 'same direction: “capital of”' : 'each word is a point' };
    },
  },
};

const S1 = ['The', 'bottle', 'did', 'not', 'fit', 'in', 'the', 'cooler', 'because', 'it', 'was', 'too', 'big'];
const W1 = [0.02, 0.62, 0.02, 0.03, 0.06, 0.01, 0.01, 0.12, 0.03, 0, 0.02, 0.02, 0.04];
const W2 = [0.02, 0.12, 0.02, 0.03, 0.06, 0.01, 0.01, 0.62, 0.03, 0, 0.02, 0.02, 0.04];
const xs = (i) => -5.9 + i * 0.98;

export const attentionScene = {
  type: 'custom',
  widget: 'plane',
  eyebrow: 'Watch',
  title: 'What does “it” mean?',
  graph: {
    steps: [
      { say: 'Read the sentence. What does **it** refer to: the bottle or the cooler? You know instantly: the bottle, because it was too **big**.' },
      { say: 'A transformer answers this with ==attention==. The word “it” scores every other word for relevance; the thicker the line, the more “it” pays attention. Here it looks mostly at **bottle**.', action: { label: 'Show attention' } },
      { say: 'Change one word: “too **small**”. Now the strongest link from “it” jumps to **cooler**. The meaning of “it” is worked out from the whole sentence, every time.', action: { label: 'Change big to small' } },
      { say: 'Every word does this, not just “it”, in many layers at once. That is the heart of the ==transformer==, the design behind GPT and every modern chatbot.' },
    ],
    draw: (step, presses) => {
      const small = presses >= 2;
      const words = small ? [...S1.slice(0, 12), 'small'] : S1;
      const wts = small ? W2 : W1;
      // The sentence runs along the top in two staggered rows; "it" sits below, with one line up
      // to every other word, as thick and dark as its attention weight.
      const rowY = (i) => (i % 2 ? 1.6 : 2.5);
      const items = words.map((w, i) => ({ id: `t${i}`, text: [xs(i), rowY(i)], label: w, kind: i === 9 ? 'e' : 's', size: 12 }));
      items.push({ id: 'it', text: [xs(9), -2.6], label: '“it”', kind: 'e', size: 15 });
      if (presses >= 1) {
        wts.forEach((a, i) => {
          if (i === 9) return;
          items.push({ id: `a${i}`, seg: [[xs(9), -2.1], [xs(i), rowY(i) - 0.35]], kind: 'e', dash: false, o: Math.min(1, 0.1 + a * 1.5), w: 1 + a * 9 });
        });
      }
      return frame(items, presses >= 1 ? `“it” attends most to “${small ? 'cooler' : 'bottle'}”` : 'one sentence, one ambiguous word');
    },
  },
};
