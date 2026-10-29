// MAT 222 · Mean value theorems · Lesson 4: Taylor's theorem and L'Hôpital's rule.

export default {
  id: 'taylor-lhopital',
  title: 'Taylor’s theorem and L’Hôpital’s rule',
  covers: 'Taylor polynomials and series, Taylor’s theorem with Lagrange remainder and proof, sin x and ln(1 + x), Tₙ for (1 + x)⁻², L’Hôpital’s rule',
  minutes: 24,
  sections: [
    {
      name: 'Taylor polynomials and Taylor’s theorem',
      terms: [
        ['Taylor polynomial', '$T_n(x) = \\sum_{k=0}^{n} \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k$, the degree-$n$ polynomial matching $f$ and its first $n$ derivatives at $x_0$.'],
        ['Taylor’s theorem', 'If $f$ has $n + 1$ derivatives on an open interval $I \\ni x_0$, then for $x \\in I$, $f(x) = T_n(x) + R_n(x)$ with $R_n(x) = \\frac{f^{(n+1)}(c)}{(n + 1)!}(x - x_0)^{n+1}$ for some $c$ between $x_0$ and $x$.'],
        ['Taylor series', '$\\sum_{k=0}^{\\infty} \\frac{f^{(k)}(x_0)}{k!}(x - x_0)^k$. It equals $f(x)$ exactly when $R_n(x) \\to 0$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Mean value theorems · Lesson 4',
          title: 'Copy a function with a polynomial',
          body: 'If $f(x) = \\sum a_k (x - x_0)^k$, putting $x = x_0$ gives $a_0 = f(x_0)$; differentiating once gives $a_1 = f\'(x_0)$; twice gives $2a_2 = f\'\'(x_0)$; in general $a_k = \\frac{f^{(k)}(x_0)}{k!}$.\n\nSo the best degree-$n$ copy of $f$ near $x_0$ is the ==Taylor polynomial==\n$$T_n(x) = f(x_0) + f\'(x_0)(x - x_0) + \\frac{f\'\'(x_0)}{2!}(x - x_0)^2 + \\cdots + \\frac{f^{(n)}(x_0)}{n!}(x - x_0)^n.$$',
          cta: 'Watch it hug the curve',
        },
        {
          type: 'custom',
          widget: 'taylor',
          eyebrow: 'See it',
          title: 'Taylor polynomials of $\\sin x$',
        },
        {
          type: 'story',
          eyebrow: 'The theorem',
          title: 'How big is the error?',
          body: '**Taylor’s theorem.** Let $f$ have $n + 1$ derivatives on an open interval $I$ containing $x_0$. For $x \\ne x_0$ in $I$ there is $c$ between $x_0$ and $x$ with\n$$f(x) = T_n(x) + \\frac{f^{(n+1)}(c)}{(n + 1)!}(x - x_0)^{n+1}.$$\nThe last term is the ==Lagrange remainder== $R_n(x)$. With $n = 0$ this is exactly the MVT.',
        },
        {
          type: 'story',
          eyebrow: 'Exam answer',
          title: 'Prove Taylor’s theorem',
          body: 'Fix $x \\ne x_0$ and define $M$ by $f(x) = T_n(x) + M(x - x_0)^{n+1}$. We show $M = \\frac{f^{(n+1)}(c)}{(n + 1)!}$ for some $c$.\n\nLet $g(t) = f(t) - T_n(t) - M(t - x_0)^{n+1}$. Since $T_n^{(k)}(x_0) = f^{(k)}(x_0)$ for $k \\le n$,\n$$g(x_0) = g\'(x_0) = \\cdots = g^{(n)}(x_0) = 0, \\quad \\text{and } g(x) = 0 \\text{ by the choice of } M.$$\nRolle on $[x_0, x]$ gives $c_1$ with $g\'(c_1) = 0$; Rolle on $[x_0, c_1]$ gives $c_2$ with $g\'\'(c_2) = 0$; repeating $n + 1$ times gives $c$ between $x_0$ and $x$ with $g^{(n+1)}(c) = 0$. But $T_n^{(n+1)} = 0$, so\n$$0 = g^{(n+1)}(c) = f^{(n+1)}(c) - (n + 1)!\\,M. \\ \\blacksquare$$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'For $f(x) = \\ln(1 + x)$ about $x_0 = 1$, what is $T_2(x)$?',
          options: [
            { text: '$\\ln 2 + \\frac12(x - 1) - \\frac18(x - 1)^2$', correct: true, why: '$f(1) = \\ln 2$, $f\'(1) = \\frac12$, $f\'\'(1) = -\\frac14$, and $\\frac{-1/4}{2!} = -\\frac18$.' },
            { text: '$\\ln 2 + \\frac12(x - 1) - \\frac14(x - 1)^2$', why: 'Divide $f\'\'(1)$ by $2!$.' },
            { text: '$x - \\frac{x^2}{2}$', why: 'That is the expansion about $0$, not about $1$.' },
            { text: '$\\ln 2 + (x - 1) - (x - 1)^2$', why: 'Check: $f\'(x) = \\frac{1}{1 + x}$, so $f\'(1) = \\frac12$.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Worked exam question',
          title: '$f(x) = (1 + x)^{-2}$: Taylor polynomial about $x_0 = \\frac12$',
          body: '$f^{(k)}(x) = (-1)^k (k + 1)!\\,(1 + x)^{-(k+2)}$, so\n$$\\frac{f^{(k)}(\\tfrac12)}{k!} = (-1)^k (k + 1)\\left(\\tfrac32\\right)^{-(k+2)} = (-1)^k (k + 1)\\left(\\tfrac23\\right)^{k+2}.$$\nHence\n$$T_n(x) = \\sum_{k=0}^{n} (-1)^k (k + 1)\\left(\\frac23\\right)^{k+2}\\left(x - \\frac12\\right)^k.$$\nThe same method gives $\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots$ for all $x$, since $|R_n(x)| \\le \\frac{|x|^{n+1}}{(n + 1)!} \\to 0$.',
        },
        {
          type: 'bridge',
          title: 'Taylor: proved.',
          recap: ['$T_n$ matches $f$ and its first $n$ derivatives at $x_0$.', 'Error $= \\frac{f^{(n+1)}(c)}{(n+1)!}(x - x_0)^{n+1}$; proof by Rolle $n + 1$ times.'],
          why: 'One last use of these ideas: limits of the form $\\frac00$.',
        },
      ],
    },
    {
      name: 'L’Hôpital’s rule',
      terms: [
        ['L’Hôpital’s rule', 'If $f(x_0) = g(x_0) = 0$, $f, g$ differentiable near $x_0$, $g\' \\ne 0$ near $x_0$ (except possibly at $x_0$) and $\\lim \\frac{f\'}{g\'} = L$, then $\\lim_{x \\to x_0} \\frac{f(x)}{g(x)} = L$.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'The rule',
          title: 'Replace a $\\frac00$ ratio by a ratio of slopes',
          body: 'Near $x_0$, with $f(x_0) = g(x_0) = 0$, both functions look like their tangent lines: $f(x) \\approx f\'(x_0)(x - x_0)$ and $g(x) \\approx g\'(x_0)(x - x_0)$. So\n$$\\frac{f(x)}{g(x)} \\approx \\frac{f\'(x_0)}{g\'(x_0)}.$$\n**Proof.** For $x \\ne x_0$ near $x_0$, Cauchy’s MVT on $[x_0, x]$ gives $c$ between them with\n$$\\frac{f(x)}{g(x)} = \\frac{f(x) - f(x_0)}{g(x) - g(x_0)} = \\frac{f\'(c)}{g\'(c)}.$$\nAs $x \\to x_0$, $c \\to x_0$, so the ratio tends to $\\lim \\frac{f\'}{g\'} = L$. $\\blacksquare$',
        },
        {
          type: 'choice',
          eyebrow: 'Your turn',
          prompt: 'Evaluate $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$.',
          options: [
            { text: '$\\frac12$', correct: true, why: '$\\frac00$: L’Hôpital gives $\\frac{\\sin x}{2x}$, still $\\frac00$; again gives $\\frac{\\cos x}{2} \\to \\frac12$.' },
            { text: '$0$', why: 'One application gives $\\frac{\\sin x}{2x} \\to \\frac12$, not $0$.' },
            { text: '$1$', why: 'Don’t forget the $2$ from $(x^2)\' = 2x$.' },
            { text: 'Does not exist', why: 'Both limits along the way exist.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Check yourself',
          prompt: 'Which statements are true?',
          options: [
            { text: 'L’Hôpital needs the $\\frac00$ (or $\\frac\\infty\\infty$) form first.', correct: true, why: '**Check the form**: $\\lim_{x \\to 0} \\frac{x + 1}{x + 2} = \\frac12$, but $\\frac{(x + 1)\'}{(x + 2)\'} = 1$.' },
            { text: 'You differentiate the quotient $\\frac fg$.', why: '**No**: differentiate top and bottom separately.' },
            { text: 'Its proof uses Cauchy’s MVT.', correct: true, why: '**Yes**: that is the link in the chain.' },
            { text: 'It can be applied repeatedly.', correct: true, why: '**Yes**, as long as each new ratio is still $\\frac00$ or $\\frac\\infty\\infty$.' },
          ],
        },
        {
          type: 'finish',
          title: 'The mean value chain: complete.',
          body: 'Fermat ⇒ Rolle ⇒ MVT ⇒ Cauchy ⇒ Taylor and L’Hôpital. Key terms, ready for revision:',
        },
      ],
    },
  ],
};
