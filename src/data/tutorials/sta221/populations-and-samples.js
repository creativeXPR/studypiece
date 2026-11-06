// STA 221 · Sampling · Lesson 1 (intuition-first pilot): a population as a pile of dots (its
// distribution), the mean as the balance point, parameter vs statistic, a sample and its wobble,
// estimator vs estimate, and what statistical inference is for. Built on the animated Scene widget.
import { HOURS, MU, X, axis, fmt1, pile, sampleOf } from './campus';

const grid = (i) => [22 + 15.5 * (i % 20), 14 + 10 * Math.floor(i / 20)];

const PILE_A = pile(HOURS, 190);
const LABELLED = [17, 143, 262, 371];
const BAND = [6, 16];
const IN_BAND = HOURS.filter((h) => h >= BAND[0] && h <= BAND[1]).length;

const sceneA = {
  aria: 'Four hundred dots, one per student, gathering into a pile over a number line of study hours',
  steps: [
    { say: 'Meet a university with **400 students**. Each dot is one student.' },
    { say: `Every student studies some number of **hours a week**. Here are four of them: ${LABELLED.map((i) => `$${HOURS[i]}$`).join(', ')} hours.` },
    { say: 'Let’s **sort** them. Slide every student onto a number line at their hours, and stack students who share the same number.' },
    { say: `This shape is the **distribution** of study hours. Read it like a skyline: **tall** where many students are, **low** where few are. Most students (${IN_BAND} of 400) study between $${BAND[0]}$ and $${BAND[1]}$ hours; only a handful study $25$ or more.` },
    { say: `Where would this pile **balance** on a finger? At the **mean** of all 400 students: $${fmt1(MU)}$ hours.` },
    { say: 'A number that describes the **whole population**, like this mean, is called a **parameter**. There is only one population, so there is only one value. We write it $\\mu$ ("mew").' },
  ],
  draw: (step) => {
    const sorted = step >= 2;
    const shapes = HOURS.map((h, i) => ({
      id: `p${i}`,
      dot: sorted ? PILE_A[i] : grid(i),
      r: sorted ? 1.8 : 3,
      kind: step === 1 && LABELLED.includes(i) ? 'd' : 'a',
      o: 1,
      delay: step === 2 ? h * 22 : step === 0 ? i * 2 : 0,
    }));
    LABELLED.forEach((i, j) => shapes.push({ id: `lab${j}`, text: [grid(i)[0], grid(i)[1] - 6], label: `${HOURS[i]} h`, kind: 'd', size: 11, o: step === 1 ? 1 : 0 }));
    shapes.push(...axis('a', 190, sorted ? 1 : 0));
    shapes.push({ id: 'band', bar: [X(BAND[0] - 0.5), 190], w: X(BAND[1] + 0.5) - X(BAND[0] - 0.5), h: 120, kind: 'c', o: step === 3 ? 1 : 0 });
    shapes.push({ id: 'mu', vline: X(MU), y1: 60, y2: 196, kind: 'd', o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 'fulcrum', text: [X(MU), 207], label: '▲', kind: 'd', size: 13, o: step === 4 ? 1 : 0 });
    shapes.push({ id: 'mulab', text: [X(MU), 52], label: step >= 5 ? `μ = ${fmt1(MU)}` : `mean = ${fmt1(MU)}`, kind: 'd', size: 13, o: step >= 4 ? 1 : 0 });
    return shapes;
  },
};

const PILE_TOP = pile(HOURS, 112, { step: 3.2, gap: 2.4 });
const sceneB = {
  aria: 'Twenty students chosen from the pile, pulled down onto their own number line with their own mean',
  steps: [
    { say: 'Here is the whole population again, with its mean $\\mu$. The problem: in real life we **can’t ask all 400**. It takes too much time and money.' },
    { say: 'So we ask just **20 students**, chosen at random. They light up.' },
    { say: 'These 20 are our **sample**. Pull them down and stack them on their own line: this is the **sample’s distribution**.' },
    { say: 'The sample has its own balance point, its mean. A number worked out **from a sample** is called a **statistic**. We write this one $\\bar x$ ("x-bar").' },
    { say: 'Compare them. The dashed line is $\\mu$, carried down. $\\bar x$ is close to $\\mu$, but not equal: the sample is only part of the pile.' },
    { say: 'Ask a **different** 20 students. Tap the button a few times. Watch $\\bar x$. Does $\\mu$ ever move?', action: { label: 'Ask 20 different students', need: 3 } },
    { say: 'So: the **parameter** $\\mu$ is **fixed**, but usually **unknown** (we never see the whole pile). The **statistic** $\\bar x$ is **known** (we worked it out), but it **wobbles** from sample to sample. Using the wobbly $\\bar x$ to learn about the fixed $\\mu$ is what this course is about.' },
  ],
  draw: (step, presses) => {
    const chosen = sampleOf(step >= 5 ? presses : 0);
    const pick = new Set(chosen);
    const hours = chosen.map((i) => HOURS[i]);
    const xbar = hours.reduce((s, h) => s + h, 0) / hours.length;
    const low = pile(hours, 232, { cols: 1, step: 6.5 });
    const shapes = HOURS.map((h, i) => ({ id: `p${i}`, dot: PILE_TOP[i], r: 1.6, kind: step >= 1 && pick.has(i) ? 'd' : 'a', o: step >= 1 && !pick.has(i) ? 0.35 : 1 }));
    shapes.push(...axis('top', 112));
    shapes.push({ id: 'mu', vline: X(MU), y1: 34, y2: 116, kind: 'a' });
    shapes.push({ id: 'mulab', text: [X(MU), 28], label: `μ = ${fmt1(MU)}`, kind: 'a', size: 12 });
    // Sample dots: one per slot, starting on top of their student in the pile.
    chosen.forEach((i, j) => shapes.push({ id: `s${j}`, dot: step >= 2 ? low[j] : PILE_TOP[i], r: 3, kind: 'd', o: step >= 2 ? 1 : 0, delay: step === 2 ? j * 40 : 0 }));
    shapes.push(...axis('low', 232, step >= 2 ? 1 : 0));
    shapes.push({ id: 'mudash', vline: X(MU), y1: 116, y2: 236, kind: 'a', dash: true, o: step >= 4 ? 1 : 0 });
    shapes.push({ id: 'xbar', vline: X(xbar), y1: 168, y2: 236, kind: 'd', o: step >= 3 ? 1 : 0 });
    shapes.push({ id: 'xbarlab', text: [X(xbar), 162], label: `x̄ = ${fmt1(xbar)}`, kind: 'd', size: 12, o: step >= 3 ? 1 : 0 });
    return shapes;
  },
};

const sceneC = {
  aria: 'The same rule applied to different samples gives different numbers',
  steps: [
    { say: 'One more pair of words. To get $\\bar x$ we followed a **rule**: "add up the sample’s hours and divide by how many". The rule is called the **estimator**.' },
    { say: 'The number the rule gives for **this** sample is the **estimate**. New sample, same rule, different estimate. Tap and see.', action: { label: 'Ask 20 different students', need: 2 } },
    { say: 'Think of a **recipe** and a **cake**: the estimator is the recipe (always the same); the estimate is the cake you baked today (a bit different each time).' },
  ],
  draw: (step, presses) => {
    const chosen = sampleOf(100 + presses);
    const hours = chosen.map((i) => HOURS[i]);
    const xbar = hours.reduce((s, h) => s + h, 0) / hours.length;
    const low = pile(hours, 200, { cols: 1, step: 6.5 });
    return [
      { id: 'rule', text: [170, 34], label: 'Rule: add the 20 values, divide by 20', kind: 'e', size: 13 },
      { id: 'rulecap', text: [170, 54], label: '(the estimator)', kind: 'e', size: 11 },
      ...hours.map((h, j) => ({ id: `s${j}`, dot: low[j], r: 3, kind: 'd', delay: j * 25 })),
      ...axis('low', 200),
      { id: 'xbar', vline: X(xbar), y1: 92, y2: 204, kind: 'd' },
      { id: 'xbarlab', text: [X(xbar), 84], label: `x̄ = ${fmt1(xbar)}  (the estimate)`, kind: 'd', size: 12 },
      { id: 'cake', text: [170, 250], label: '🍰', kind: 's', size: 16, o: step === 2 ? 1 : 0 },
    ];
  },
};

export default {
  id: 'populations-and-samples',
  title: 'Populations, samples and their distributions',
  covers: 'A population pictured as a distribution, the mean as its balance point, parameter and statistic, a sample and its own distribution, how a statistic wobbles from sample to sample, estimator and estimate, what statistical inference does',
  minutes: 14,
  sections: [
    {
      name: 'The whole pile',
      terms: [
        ['Population', 'Every member of the group we care about, e.g. all 400 students.'],
        ['Distribution', 'How the values are spread out: the shape of the pile when you stack everyone on a number line.'],
        ['Mean', 'The balance point of the pile: add all the values and divide by how many.'],
        ['Parameter', 'A number describing the whole population, such as its mean $\\mu$. Fixed, but usually unknown.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'scene',
          eyebrow: 'Sampling · Lesson 1',
          title: 'Every student, in one picture',
          graph: sceneA,
        },
        {
          type: 'choice',
          eyebrow: 'Think about it',
          prompt: 'Next week, a new student who studies $30$ hours joins the university. What happens to $\\mu$?',
          options: [
            { text: 'It moves a little to the right', correct: true, why: 'A new dot on the far right tips the balance point slightly right. $\\mu$ only changes when the **population itself** changes.' },
            { text: 'It stays exactly the same', why: 'The population has changed: one more dot, far to the right, shifts the balance point.' },
            { text: 'It jumps to $30$', why: 'One student out of 401 only nudges the balance point.' },
            { text: 'It moves to the left', why: 'The new dot is on the right, so the balance point moves right.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The population: set.',
          recap: ['Stack everyone on a number line: that shape is the **distribution**.', 'Its balance point is the mean $\\mu$, a **parameter**.'],
          why: 'But we almost never get to see the whole pile.',
        },
      ],
    },
    {
      name: 'A small handful',
      terms: [
        ['Sample', 'The part of the population we actually look at, e.g. 20 students chosen at random.'],
        ['Statistic', 'A number worked out from a sample, such as its mean $\\bar x$. Known, but changes from sample to sample.'],
        ['Estimator / estimate', 'The rule (e.g. "average the sample") / the number it gives for one particular sample.'],
        ['Statistical inference', 'Using a sample to learn about the population, and saying how sure we are.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'scene',
          eyebrow: 'See it',
          title: 'Twenty students out of four hundred',
          graph: sceneB,
        },
        {
          type: 'choice',
          eyebrow: 'Think about it',
          prompt: 'Two classmates each ask a different random 20 students. Will they get the same $\\bar x$?',
          options: [
            { text: 'Almost certainly not, but both will be near $\\mu$', correct: true, why: 'Different students, different pile, different balance point. Both wobble around the same $\\mu$.' },
            { text: 'Yes, always', why: 'You just saw $\\bar x$ change with every new sample.' },
            { text: 'Yes, both will equal $\\mu$', why: 'A sample is only part of the pile, so $\\bar x$ is rarely exactly $\\mu$.' },
            { text: 'No, and they will tell us nothing about $\\mu$', why: 'They wobble, but they land near $\\mu$: that is why samples are useful.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Sort it out',
          prompt: 'A poll of $400$ voters finds that $38\\%$ support a candidate. Is $38\\%$ a parameter or a statistic?',
          options: [
            { text: 'A statistic: it comes from a sample of voters', correct: true, why: 'Only $400$ voters were asked, not every voter. It estimates the true proportion in the whole population.' },
            { text: 'A parameter: it describes voters', why: 'It describes the $400$ asked, not all voters.' },
            { text: 'Neither', why: 'Any number worked out from a sample is a statistic.' },
            { text: 'Both', why: 'The test is simple: from everyone → parameter; from some → statistic.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'The fine print',
          title: 'A statistic must be something you can actually work out',
          body: 'Here is the catch in the definition. A **statistic** is worked out **from the sample alone**. If a formula needs $\\mu$, which we don’t know, we can’t compute it from our 20 students, so it is **not** a statistic.\n\n$\\bar x$, $\\sum(x - \\bar x)^2$: only need the sample → statistics.\n$\\bar x - \\mu$, $\\sum(x - \\mu)^2$: need the unknown $\\mu$ → **not** statistics.',
        },
        {
          type: 'choice',
          eyebrow: 'Watch this one',
          prompt: 'Is $\\sum(x_i - \\mu)^2$ a statistic when $\\mu$ is unknown?',
          options: [
            { text: 'No: it needs the unknown $\\mu$, so the sample alone can’t give it', correct: true, why: 'A statistic may not contain unknown parameters. $\\sum(x_i - \\bar x)^2$ **is** a statistic.' },
            { text: 'Yes: it uses the sample values', why: 'It also needs $\\mu$, which we don’t know.' },
            { text: 'Yes, it is the sample variance', why: 'The sample variance uses $\\bar x$, not $\\mu$.' },
            { text: 'Only for large samples', why: 'Sample size does not matter; the unknown $\\mu$ does.' },
          ],
        },
        {
          type: 'custom',
          widget: 'scene',
          eyebrow: 'Two more words',
          title: 'The recipe and the cake',
          graph: sceneC,
        },
        {
          type: 'story',
          eyebrow: 'Putting it together',
          title: 'What statistical inference does',
          body: 'We want a fact about the **population** (a parameter, like $\\mu$) but can only see a **sample**. So we use a **statistic** (like $\\bar x$) to learn about the parameter, and we say **how sure** we are, because the statistic wobbles. That is ==statistical inference==.\n\nIt has two jobs:\n**Estimation:** "about how big is $\\mu$?" (e.g. "about $13$ hours, give or take $1$").\n**Hypothesis testing:** "is a claim about $\\mu$ believable?" (e.g. "students study $20$ hours a week").',
          asides: [{ label: 'Memory trick', text: '**P**arameter ↔ **P**opulation; **S**tatistic ↔ **S**ample. Greek letters ($\\mu$, $\\sigma$, $p$) for parameters, English letters ($\\bar x$, $s$, $\\hat p$) for statistics.' }],
        },
        {
          type: 'finish',
          title: 'Populations and samples: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
