// ACP 111 question bank (Academic Papers). Set QS001 tests the paper by Xuyan Cheng, Paul Kinlaw
// and Duc Nguyen, "The Reciprocal Sum of Even Pseudoprimes", J. Integer Sequences 29 (2026).
// Each question: options are shown as I–IV, `answer` is the 0-based index of the correct option.
// Math goes between $...$ (KaTeX).

const q = (question, options, answer, explanation) => ({ question, options, answer, explanation });

export default {
  code: 'ACP 111',
  updated: '2026-11-08',
  title: 'Academic Papers',
  sets: [
    {
      id: 'QS001',
      title: 'Even pseudoprimes (Cheng, Kinlaw and Nguyen, 2026)',
      questions: [
        q("A base-2 pseudoprime is", ["a composite $N$ with $2^N \\equiv 2 \\pmod N$", "a prime $p$ with $2^p \\equiv 2 \\pmod p$", "any $N$ with $2^N \\equiv 1 \\pmod N$", "a prime that divides $2^N - 2$"], 0, "It passes Fermat’s test without being prime. Primes always pass, so a pseudoprime is a composite “liar”."),
        q("The smallest even pseudoprime is", ["$341$", "$161038$", "$215326$", "$561$"], 1, "$161038 = 2 \\cdot 73 \\cdot 1103$. The numbers $341$ and $561$ are odd pseudoprimes."),
        q("Theorem 1 of the paper states that the sum of $1/N$ over all even pseudoprimes $N$ is", ["exactly $0.0059$", "infinite", "between $0.000011$ and $0.0059$", "below $0.0911$ but above $0.0059$"], 2, "Both are bounds: the lower one from the computed list, the upper one from the proof. $0.0911$ is the earlier bound for odd pseudoprimes."),
        q("Combining the paper with the earlier bound $0.0911$ for odd pseudoprimes shows that the reciprocal sum of all base-2 pseudoprimes is", ["exactly $0.097$", "infinite", "unknown", "less than $0.1$"], 3, "$0.0911 + 0.0059 < 0.1$, so all base-2 liars together have reciprocal sum below $0.1$."),
        q("$2^9 = 512$ leaves remainder $8$ on division by $9$. The Fermat test therefore shows that $9$ is", ["certainly composite", "probably prime", "a pseudoprime", "undecided"], 0, "Primes always give remainder $2$, so any other remainder proves $N$ is composite."),
        q("Who proved that there are infinitely many even pseudoprimes?", ["Fermat", "Beeger, in 1951", "Cheng, Kinlaw and Nguyen", "Euler"], 1, "Beeger proved it in 1951. The 2026 paper bounds how sparse they are."),
        q("Writing $N = 2n$, the condition $2^N \\equiv 2 \\pmod N$ for an even pseudoprime becomes", ["$2^{n} \\equiv 1 \\pmod n$", "$2^{2n} \\equiv 1 \\pmod n$", "$2^{2n-1} \\equiv 1 \\pmod n$ with $n > 1$", "$2^{n-1} \\equiv 1 \\pmod{2n}$"], 2, "Dividing $2^{2n} \\equiv 2$ by $2$ gives $2^{2n-1} \\equiv 1 \\pmod n$. It also forces $n$ to be odd."),
        q("The order $\\ell_2(p)$ of $2$ modulo a prime $p$ is", ["always $p - 1$", "the largest $k$ with $2^k \\equiv 1 \\pmod p$", "the number of digits of $2^p$", "the smallest $k \\ge 1$ with $2^k \\equiv 1 \\pmod p$"], 3, "It is the length of the cycle of powers of $2$. It always divides $p - 1$ but is often smaller, like $\\ell_2(73) = 9$."),
        q("What is $\\ell_2(73)$?", ["$9$", "$72$", "$36$", "$8$"], 0, "$2^9 = 512 = 7 \\cdot 73 + 1$, and no smaller power of $2$ is $1$ mod $73$."),
        q("Why must $\\ell_2(p)$ be odd for every odd prime $p$ dividing an even pseudoprime $N = 2n$?", ["Because $p$ is odd", "Because $\\ell_2(p)$ divides the odd number $2n - 1$", "Because $p \\equiv 1 \\pmod 8$", "Because $N$ is even"], 1, "From $2^{2n-1} \\equiv 1 \\pmod p$ the order divides $2n - 1$, and odd numbers have only odd divisors."),
        q("Lemma 2 says every odd prime $p$ dividing an even pseudoprime $N$ satisfies", ["$N \\equiv 1 \\pmod p$", "$N \\equiv 0 \\pmod{\\ell_2(p)}$", "$N \\equiv p \\pmod{p\\,\\ell_2(p)}$", "$N \\equiv p \\pmod{p^2}$"], 2, "$N \\equiv p$ both mod $p$ and mod $\\ell_2(p)$; these are coprime, so the Chinese remainder theorem joins them."),
        q("Check Lemma 2 on $N = 161038$ with $p = 73$, $\\ell_2(73) = 9$: what is $161038 \\bmod 657$?", ["$0$", "$1$", "$657$", "$73$"], 3, "$657 \\times 245 = 160965$ and $161038 - 160965 = 73$, exactly $p$."),
        q("Which prime can divide an even pseudoprime?", ["$23$ (order $11$)", "$17$ (order $8$)", "$13$ (order $12$)", "$5$ (order $4$)"], 0, "It needs $p \\equiv \\pm1 \\pmod 8$ and an odd order. $17 \\equiv 1 \\pmod 8$ fails because its order $8$ is even."),
        q("Every odd prime factor $p$ of an even pseudoprime satisfies", ["$p \\equiv 3 \\pmod 8$", "$p \\equiv \\pm 1 \\pmod 8$", "$p \\equiv 5 \\pmod 8$", "$p \\equiv 1 \\pmod 4$ only"], 1, "An odd order divides $(p-1)/2$, so $2^{(p-1)/2} \\equiv 1$; by Euler’s criterion that means $p \\equiv \\pm1 \\pmod 8$."),
        q("Corollary 4 says every even pseudoprime $N$ is", ["$\\equiv 0 \\pmod{16}$", "$\\equiv 1 \\pmod{16}$", "$\\equiv 2$ or $14 \\pmod{16}$", "$\\equiv 6 \\pmod{16}$"], 2, "$n = N/2$ is a product of primes $\\equiv \\pm1 \\pmod 8$, so $n \\equiv \\pm 1 \\pmod 8$ and $2n \\equiv 2$ or $14 \\pmod{16}$."),
        q("Lemma 5 says that if $p^2$ divides an even pseudoprime, then $p$ is", ["$2$", "less than $1093$", "a Mersenne prime", "a Wieferich prime, so at least $3511$"], 3, "Then $2^{p-1} \\equiv 1 \\pmod{p^2}$. The known Wieferich primes are $1093$ and $3511$, and $1093 \\equiv 5 \\pmod 8$ is ruled out."),
        q("How does the paper get the exact value $0.0000118853\\ldots$ for even pseudoprimes up to $10^{16}$?", ["By adding the reciprocals of the complete computed list", "By an integral estimate", "By Rankin’s trick", "By Lemma 10"], 0, "All $2045$ even pseudoprimes up to $10^{16}$ are known, so their reciprocals are simply added."),
        q("About what share of that small-range total comes from $161038$ and $215326$ alone?", ["About $10\\%$", "About $91\\%$", "About $50\\%$", "About $99.9\\%$"], 1, "$1/161038 + 1/215326 \\approx 0.0000108538$, about $91\\%$ of $0.0000118853$."),
        q("Why is the infinite sum $\\sum 1/n$ infinite while $\\sum 1/n^2$ is finite?", ["Because $1/n$ terms are negative", "Because $\\sum 1/n^2$ has fewer terms", "Because $1/n^2$ shrinks fast enough for the total to settle", "Because $\\sum 1/n$ starts at a larger number"], 2, "Both have infinitely many terms. Only fast enough shrinking (or a sparse enough set) keeps the total finite."),
        q("Numbers in one residue class mod $m$ lying in a window $e^k < N \\le e^{k+1}$ have reciprocals adding to about", ["$m$", "$e^k / m$", "$1/e^k$", "$1/m$"], 3, "There are about $(e^{k+1} - e^k)/m$ of them, and $\\int_{e^k}^{e^{k+1}} dt/(mt) = 1/m$."),
        q("In the paper’s case split, the group $\\mathcal A_1$ consists of even pseudoprimes whose largest prime factor is", ["at most $y_k = e^{1.56\\sqrt k}$ (smooth numbers)", "above $z_k$", "a prime with order above $p^{0.48}$", "exactly $73$"], 0, "These are smooth numbers, bounded with Rankin’s trick. They give $0.003138$, over half the final bound."),
        q("Why are primes with a small order $\\ell_2(p) = m$ rare (Lemma 10)?", ["Because they are all larger than $e^{36}$", "Because each divides $2^m - 1$, and the product of all such primes is at most $\\prod (2^m - 1)$ over small $m$", "Because small orders are always even", "Because of Dusart’s bounds"], 1, "Only a few primes can divide the few numbers $2^m - 1$ with small $m$. This caps their count at $0.00754\\,x^{0.8}$ below $x$."),
        q("Proposition 12 improves the bound $\\tfrac{2}{p\\,\\ell_2(p)}$ to $\\tfrac{1}{4p\\,\\ell_2(p)}$ by using", ["Lemma 5", "the prime number theorem", "$N \\equiv 2$ or $14 \\pmod{16}$", "the exponential integral"], 2, "Only $2$ of the $16$ classes mod $16$ remain, so one eighth of the numbers survive."),
        q("The six pieces of the final bound add up to", ["$0.003138$", "$0.0059$ exactly", "$0.000012$", "$0.005865$"], 3, "$0.000012 + 0.003138 + 0.000070 + 0.000925 + 0.000535 + 0.001185 = 0.005865 < 0.0059$."),
        q("To lower the bound $0.0059$ the most, which part of the proof should be improved first?", ["The smooth-number group $\\mathcal A_1$", "The small range up to $10^{16}$", "The group $\\mathcal A_2$", "The lower bound $0.000011$"], 0, "$\\mathcal A_1$ gives $0.003138$ of $0.005865$. The small range is already exact and tiny."),
      ],
    },
  ],
};
