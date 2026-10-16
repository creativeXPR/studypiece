// MTH 209 · Finite differences · Lesson 1: forward, backward and central differences.

const Y = 'For $x = 0, 0.1, \\ldots, 0.5$: $y_0 = 0.05$, $y_1 = 0.11$, $y_2 = 0.26$, $y_3 = 0.35$, $y_4 = 0.49$, $y_5 = 0.67$.';

export default {
  id: 'difference-operators',
  title: 'Forward, backward and central differences',
  covers: 'Δ, ∇ and δ; higher differences in terms of ordinates; difference tables; derivative estimates',
  minutes: 18,
  sections: [
    {
      name: 'The three operators',
      terms: [
        ['Equal spacing', 'Values $f_k = f(x_k)$ at $x_k = x_0 + kh$, $k = 0, 1, 2, \\ldots$'],
        ['Forward difference', '$\\Delta f_k = f_{k+1} - f_k$'],
        ['Backward difference', '$\\nabla f_k = f_k - f_{k-1}$'],
        ['Central difference', '$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Finite differences · Lesson 1',
          title: 'Differences reveal a table’s secrets',
          body: 'Look at $1, 4, 9, 16, 25$. Their differences are $3, 5, 7, 9$, and the differences of **those** are $2, 2, 2$: constant. That tells you the data come from a quadratic.\n\n==Finite differences== are used when we have a table of values $f(x)$ at **equal intervals** $h$ in $x$. We write\n$$x_k = x_0 + kh,\\qquad f_k = f(x_k),\\qquad k = 0, 1, 2, \\ldots$$',
          cta: 'Meet the operators',
        },
        {
          type: 'reveal',
          eyebrow: 'Three operators',
          title: 'Which way does it look?',
          cards: [
            { title: 'Forward Δ', text: '$\\Delta f_k = f_{k+1} - f_k$. Looks **ahead**. $\\Delta f_0 = f_1 - f_0$.' },
            { title: 'Backward ∇', text: '$\\nabla f_k = f_k - f_{k-1}$. Looks **behind**. $\\nabla f_1 = f_1 - f_0$.' },
            { title: 'Central δ', text: '$\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$. Looks **both ways**, half a step each. $\\delta f_{\\frac12} = f_1 - f_0$.' },
          ],
          note: 'The same number $f_1 - f_0$ is called $\\Delta f_0$, $\\nabla f_1$ or $\\delta f_{\\frac12}$: only the label changes.',
        },
        {
          type: 'story',
          eyebrow: 'Higher differences',
          title: 'Differences of differences',
          body: '$$\\begin{aligned} \\Delta^2 f_k &= \\Delta(\\Delta f_k) = \\Delta f_{k+1} - \\Delta f_k \\\\ &= (f_{k+2} - f_{k+1}) - (f_{k+1} - f_k) \\\\ &= f_{k+2} - 2f_{k+1} + f_k. \\end{aligned}$$\n\nDoing it once more:\n$$\\Delta^3 f_k = f_{k+3} - 3f_{k+2} + 3f_{k+1} - f_k.$$\n\nThe coefficients are the **binomial coefficients** $1, 3, 3, 1$ with alternating signs. Similarly $\\nabla^2 f_k = f_k - 2f_{k-1} + f_{k-2}$ and $\\delta^2 f_k = f_{k+1} - 2f_k + f_{k-1}$.',
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: Y + ' Find $\\Delta y_3$.',
          options: [
            { text: '$0.14$', correct: true, why: '$\\Delta y_3 = y_4 - y_3 = 0.49 - 0.35 = 0.14$.' },
            { text: '$0.09$', why: 'That’s $y_3 - y_2 = \\nabla y_3$.' },
            { text: '$0.18$', why: 'That’s $y_5 - y_4 = \\Delta y_4$.' },
            { text: '$0.84$', why: 'Subtract, don’t add.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Apply it',
          prompt: 'Same table. Find $\\Delta^3 y_2 = y_5 - 3y_4 + 3y_3 - y_2$.',
          options: [
            { text: '$-0.01$', correct: true, why: '$0.67 - 3(0.49) + 3(0.35) - 0.26 = 0.67 - 1.47 + 1.05 - 0.26 = -0.01$.' },
            { text: '$0.01$', why: 'Check the signs: $+y_5 - 3y_4 + 3y_3 - y_2$.' },
            { text: '$0.13$', why: 'Use the coefficients $1, -3, 3, -1$.' },
            { text: '$0.41$', why: 'That’s $y_5 - y_2$, which isn’t a third difference.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Operators: defined.',
          recap: [
            '$\\Delta f_k = f_{k+1} - f_k$, $\\nabla f_k = f_k - f_{k-1}$, $\\delta f_k = f_{k+\\frac12} - f_{k-\\frac12}$.',
            '$\\Delta^n$ uses binomial coefficients with alternating signs.',
          ],
          why: 'In practice we put all the differences into one table.',
        },
      ],
    },
    {
      name: 'Difference tables',
      terms: [
        ['Difference table', 'Columns $x$, $y$, $\\Delta y$, $\\Delta^2 y$, …; each entry is the entry below-left minus the entry above-left.'],
        ['Forward = backward, relabelled', '$\\Delta^n y_k = \\nabla^n y_{k+n}$, e.g. $\\Delta^3 y_1 = \\nabla^3 y_4$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Building a table',
          title: '$x$: $9$ to $14$, $y$: $5.0, 5.4, 6.0, 6.8, 7.5, 8.1$',
          body: '$$\\begin{array}{c|c|c|c|c|c|c} x & y & \\Delta y & \\Delta^2 y & \\Delta^3 y & \\Delta^4 y & \\Delta^5 y \\\\ \\hline 9 & 5.0 & 0.4 & 0.2 & 0.0 & -0.3 & 0.6 \\\\ 10 & 5.4 & 0.6 & 0.2 & -0.3 & 0.3 & \\\\ 11 & 6.0 & 0.8 & -0.1 & 0.0 & & \\\\ 12 & 6.8 & 0.7 & -0.1 & & & \\\\ 13 & 7.5 & 0.6 & & & & \\\\ 14 & 8.1 & & & & & \\end{array}$$\n\nEach column has one entry fewer. Each entry is (next value) $-$ (this value) in the column to its left.',
        },
        {
          type: 'choice',
          eyebrow: 'Read the table',
          prompt: 'In the same table, $\\nabla^2 y_5$ (the backward second difference at $x = 14$) equals which forward difference?',
          options: [
            { text: '$\\Delta^2 y_3 = -0.1$', correct: true, why: '$\\nabla^2 y_5 = y_5 - 2y_4 + y_3 = \\Delta^2 y_3$: both use $y_3, y_4, y_5$. Value: $8.1 - 15.0 + 6.8 = -0.1$.' },
            { text: '$\\Delta^2 y_5$', why: '$\\Delta^2 y_5$ would need $y_6, y_7$, which don’t exist.' },
            { text: '$\\Delta^2 y_0 = 0.2$', why: 'That uses $y_0, y_1, y_2$, at the other end of the table.' },
            { text: '$\\Delta y_4 = 0.6$', why: 'That’s a first difference.' },
          ],
          explain: 'In general $\\Delta^n y_k = \\nabla^n y_{k+n}$. The **numbers** in a backward table are the same; only the labels move.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'The values of $x^3$ at $x = 1, 2, 3, 4, 5$ are $1, 8, 27, 64, 125$. What are the third differences?',
          options: [
            { text: 'All $6$', correct: true, why: '$\\Delta$: $7, 19, 37, 61$. $\\Delta^2$: $12, 18, 24$. $\\Delta^3$: $6, 6$. For a degree-$n$ polynomial with $h = 1$, the $n$-th differences are constant ($3! = 6$ here).' },
            { text: 'All $0$', why: 'That’s the fourth differences.' },
            { text: '$12, 18, 24$', why: 'That’s the second differences.' },
            { text: 'They keep changing', why: 'For a polynomial they become constant.' },
          ],
        },
        {
          type: 'bridge',
          title: 'Tables: built.',
          recap: [
            'Each column is differences of the column before; one fewer entry each time.',
            'Degree-$n$ polynomial: $n$-th differences constant, higher ones zero.',
          ],
          why: 'Last: using differences to estimate a derivative.',
        },
      ],
    },
    {
      name: 'Estimating a derivative',
      screens: [
        {
          type: 'story',
          eyebrow: 'Example',
          title: 'Approximate $f\'(3)$ for $f(x) = x^2 + 2x$ ($h = 1$)',
          body: '**Forward:** $\\Delta f(x) = f(x + 1) - f(x) = (x^2 + 4x + 3) - (x^2 + 2x) = 2x + 3$, so $\\Delta f(3) = 9$.\n\n**Backward:** $\\nabla f(x) = f(x) - f(x - 1) = (x^2 + 2x) - (x^2 - 1) = 2x + 1$, so $\\nabla f(3) = 7$.\n\n**Central:** $\\delta f(x) = f(x + \\frac12) - f(x - \\frac12) = (x^2 + 3x + \\frac54) - (x^2 + x - \\frac34) = 2x + 2$, so $\\delta f(3) = 8$.',
        },
        {
          type: 'choice',
          eyebrow: 'Compare',
          prompt: 'The true derivative is $f\'(x) = 2x + 2$, so $f\'(3) = 8$. Which estimate is exact?',
          options: [
            { text: 'Forward ($9$)', why: 'It overshoots by 1.' },
            { text: 'Backward ($7$)', why: 'It undershoots by 1.' },
            { text: 'Central ($8$)', correct: true, why: 'The central difference is symmetric about $x$, so the errors of the forward and backward estimates cancel. For a quadratic it is exact.' },
            { text: 'None of them', why: 'One of them is exact here.' },
          ],
          explain: 'In general the central difference is more accurate than forward or backward differences with the same step.',
        },
        {
          type: 'finish',
          title: 'You can take differences.',
          body: 'Next: the shift operator $E$ and Newton’s forward and backward formulas.',
        },
      ],
    },
  ],
};
