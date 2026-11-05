// STA 221 · Hypothesis Testing · Lesson 2: the five-step recipe and the large-sample z tests for one
// mean, two means, one proportion and two proportions, with p-values.
import { fmt, normalPdf, shade } from './stat';

const f = (x) => normalPdf(x);
const reject = (z, v) => (v === 0 ? Math.abs(z) > 1.96 : v === 1 ? z > 1.645 : z < -1.645);

export default {
  id: 'z-tests',
  title: 'The five-step test and z tests',
  covers: 'The five-step recipe, z tests for one mean, two means, one proportion and two proportions (pooled p̄), one- and two-tailed decisions, p-values, conclusions in context',
  minutes: 17,
  sections: [
    {
      name: 'The five steps',
      terms: [
        ['Five steps', '1 Hypotheses · 2 $\\alpha$ and critical value · 3 Test statistic · 4 Decision · 5 Conclusion in words.'],
        ['One mean', '$z = \\dfrac{\\bar x - \\mu_0}{\\sigma/\\sqrt n}$ (use $s$ if $\\sigma$ unknown).'],
        ['p-value', 'The chance, if H₀ were true, of a result at least as extreme as the one seen. Reject H₀ when p-value $< \\alpha$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Hypothesis Testing · Lesson 2',
          title: 'One recipe for every test in this course',
          body: '**1 · Hypotheses.** H₀ (with "$=$") and H₁.\n**2 · Level and critical value** from the table.\n**3 · Test statistic** from the data.\n**4 · Decision:** in the critical region? Reject H₀. Otherwise accept it.\n**5 · Conclusion** in the words of the question.\n\nThe same five steps work for $z$ tests here, and later for $\\chi^2$ and ANOVA. Every statistic has the same shape:\n$$\\frac{\\text{observed} - \\text{expected}}{\\text{standard error}}.$$',
          cta: 'Try the decision',
        },
        {
          type: 'custom',
          widget: 'graph',
          eyebrow: 'See it',
          title: 'Is the test statistic in the critical region?',
          body: 'The shaded tails are the $5\\%$ critical region. Move the observed $z$ (the dot). Switch between two-tailed and one-tailed tests.',
          graph: {
            x: [-3.6, 3.6], y: [0, 0.45], xs: [[-3], [-1.96, '−1.96'], [0], [1.96, '1.96'], [3]], ys: [],
            param: { label: 'observed $z$', min: -3.5, max: 3.5, step: 0.05, value: 1.8 },
            views: ['Two-tailed (≠)', 'Right-tailed (>)', 'Left-tailed (<)'],
            rects: [{ kind: 'up', at: (z, v) => (v === 0 ? [...shade(f, -3.6, -1.96, 30), ...shade(f, 1.96, 3.6, 30)] : v === 1 ? shade(f, 1.645, 3.6, 40) : shade(f, -3.6, -1.645, 40)) }],
            curves: [{ f }],
            dots: [{ kind: 'dot', at: (z) => [z, 0.02], show: (z, v) => reject(z, v) }, { kind: 'ok', at: (z) => [z, 0.02], show: (z, v) => !reject(z, v) }],
            ok: (z, v) => !reject(z, v),
            read: (z, v) => `Critical value ${v === 0 ? '$\\pm 1.96$' : v === 1 ? '$1.645$' : '$-1.645$'}; $z = ${fmt(z, 2)}$: ${reject(z, v) ? '**reject H₀**' : '**accept H₀**'}`,
            need: 5,
            action: 'Put z = 1.80 in each view',
          },
          asides: [{ label: 'Note', text: '$z = 1.80$ is accepted two-tailed but rejected right-tailed. The one-tailed test puts all $5\\%$ in one tail, so its critical value is closer to $0$.' }],
        },
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'A machine should fill $500$ ml, $\\sigma = 12$. $36$ bottles average $496$ ml. Has it drifted? ($5\\%$, then $1\\%$)',
          body: '**1.** H₀: $\\mu = 500$, H₁: $\\mu \\ne 500$ (drifted: either way).\n**2.** $\\alpha = 0.05$: reject if $|z| > 1.96$.\n**3.** $z = \\frac{496 - 500}{12/\\sqrt{36}} = \\frac{-4}{2} = -2.00$.\n**4.** $|-2.00| > 1.96$: reject H₀.\n**5.** At $5\\%$ there is evidence the mean fill is no longer $500$ ml.\n\nAt $1\\%$ the critical value is $2.58$ and $2.00 < 2.58$: accept H₀. Stronger proof is needed at $1\\%$.\n\n**p-value:** $2(1 - \\Phi(2.00)) = 0.0456 < 0.05$.',
          asides: [{ label: 'Exam tip', text: 'Never write "H₀ is proved true". Accepting H₀ only means the evidence is not strong enough to reject it.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Bags should weigh $80$ kg, $\\sigma = 12$. $49$ bags average $83.6$ kg. At $5\\%$ (two-tailed):',
          options: [
            { text: '$z = 2.10$: reject H₀', correct: true, why: '$z = \\frac{3.6}{12/7} = 2.10 > 1.96$. (At $1\\%$, $2.10 < 2.58$: accept.)' },
            { text: '$z = 0.30$: accept H₀', why: 'Divide by $\\sigma/\\sqrt n = \\frac{12}{7}$, not by $12$.' },
            { text: '$z = 2.10$: accept H₀', why: '$2.10$ is beyond $1.96$: it is in the critical region.' },
            { text: '$z = 14.7$: reject H₀', why: 'Use $\\sqrt{49} = 7$, not $49$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The recipe: set.',
          recap: ['Five steps, every time.', 'Choose the tail from the question’s wording, before looking at the data.'],
          why: 'Now the other three $z$ tests.',
        },
      ],
    },
    {
      name: 'Means and proportions',
      terms: [
        ['Two means', '$z = \\dfrac{\\bar x_1 - \\bar x_2}{\\sqrt{\\sigma_1^2/n_1 + \\sigma_2^2/n_2}}$.'],
        ['One proportion', '$z = \\dfrac{\\hat p - p_0}{\\sqrt{p_0q_0/n}}$.'],
        ['Two proportions', '$z = \\dfrac{\\hat p_1 - \\hat p_2}{\\sqrt{\\bar p\\bar q\\left(\\frac{1}{n_1} + \\frac{1}{n_2}\\right)}}$, pooled $\\bar p = \\dfrac{x_1 + x_2}{n_1 + n_2}$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Worked example',
          title: 'A company claims $60\\%$ prefer its product. $108$ of $200$ do. Test at $5\\%$ (a) against $p \\ne 0.6$; (b) against $p < 0.6$.',
          body: '$\\hat p = 0.54$, SE $= \\sqrt{\\frac{0.6 \\times 0.4}{200}} = 0.03464$, $z = \\frac{0.54 - 0.60}{0.03464} = -1.73$.\n\n**(a)** Two-tailed: $|-1.73| < 1.96$: accept H₀. The data fit $60\\%$.\n**(b)** Left-tailed: $-1.73 < -1.645$: reject H₀. Fewer than $60\\%$ prefer it.\n\nSame data, different conclusions: that is why H₁ comes from the wording, not the data.',
          asides: [{ label: 'Tip', text: 'For a proportion test, the SE uses the **claimed** $p_0$ from H₀, not $\\hat p$.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'A supplier claims at most $10\\%$ defective. $39$ of $300$ are defective. The right test is',
          options: [
            { text: 'H₁: $p > 0.10$, $z = 1.73 > 1.645$: reject the claim', correct: true, why: '$\\hat p = 0.13$, SE $= \\sqrt{\\frac{0.1 \\times 0.9}{300}} = 0.01732$. The claim is only challenged by **more** defectives.' },
            { text: 'H₁: $p \\ne 0.10$, $z = 1.73 < 1.96$: accept', why: '"At most $10\\%$" is one-sided: only too many defectives breaks it.' },
            { text: 'H₁: $p < 0.10$: accept', why: 'Fewer defectives would not contradict "at most $10\\%$".' },
            { text: 'H₁: $p > 0.10$, $z = 0.23$: accept', why: 'Divide by the SE: $\\frac{0.03}{0.01732} = 1.73$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Two samples',
          title: 'School A: $n = 60$, $\\bar x = 68$, $s = 10$. School B: $n = 50$, $\\bar x = 64$, $s = 12$.',
          body: 'SE $= \\sqrt{\\frac{100}{60} + \\frac{144}{50}} = 2.1323$; $z = \\frac{68 - 64}{2.1323} = 1.88$.\n\n**Is there a difference?** (H₁: $\\ne$) $1.88 < 1.96$: accept H₀, no significant difference.\n**Is A higher?** (H₁: $>$) $1.88 > 1.645$: reject H₀, A’s mean is higher.\n\n**Two proportions.** Town P: $45$ of $150$; town Q: $30$ of $150$. Pooled $\\bar p = \\frac{75}{300} = 0.25$, SE $= \\sqrt{0.25 \\times 0.75 \\times \\frac{2}{150}} = 0.05$, $z = \\frac{0.30 - 0.20}{0.05} = 2.00 > 1.96$: the proportions differ.',
          asides: [{ label: 'Note', text: 'H₀ says $p_1 = p_2$, so we pool both samples into one estimate $\\bar p$ of that common proportion.' }],
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'In a two-proportion test with $x_1 = 45$, $n_1 = 150$, $x_2 = 30$, $n_2 = 150$, the pooled $\\bar p$ is',
          options: [
            { text: '$0.25$', correct: true, why: '$\\frac{45 + 30}{150 + 150} = \\frac{75}{300}$.' },
            { text: '$0.50$', why: 'Add the counts and divide by the total sample, $300$.' },
            { text: '$0.10$', why: 'That is the difference $\\hat p_1 - \\hat p_2$.' },
            { text: '$0.30$', why: 'That is $\\hat p_1$ alone.' },
          ],
        },
        {
          type: 'reveal',
          eyebrow: 'Applications of hypothesis testing',
          title: 'One recipe, many questions',
          body: 'The same five steps answer every "is this claim believable?" question in the course:',
          cards: [
            { title: 'A mean', text: 'Is the machine still filling $500$ ml? $z$ test for one mean.' },
            { title: 'Two means', text: 'Do two schools score differently? $z$ test for two means.' },
            { title: 'Proportions', text: 'Is the defect rate above $10\\%$? Do two towns differ? $z$ tests for proportions.' },
            { title: 'A variance', text: 'Has the machine become less consistent? $\\chi^2 = \\frac{(n-1)s^2}{\\sigma_0^2}$.' },
            { title: 'Counts', text: 'Is the die fair? Are two attributes related? $\\chi^2$ goodness of fit and independence.' },
            { title: 'Several means', text: 'Do three fertilisers give the same yield? ANOVA $F$ test.' },
          ],
          asides: [{ label: 'Exam tip', text: 'Asked for "applications of hypothesis testing"? Name the test, the hypothesis it checks and a one-line real example, as on these cards.' }],
        },
        {
          type: 'finish',
          title: 'z tests: done.',
          body: 'Key terms, ready for revision:',
        },
      ],
    },
  ],
};
