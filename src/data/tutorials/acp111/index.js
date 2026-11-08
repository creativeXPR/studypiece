// ACP 111 interactive tutorial: Academic Papers. Each chapter takes one published paper and teaches
// it from zero: what it claims, why it is true, and how to check, explain, cite and extend it.
// Chapter 1: Cheng, Kinlaw and Nguyen, "The Reciprocal Sum of Even Pseudoprimes" (2026).
import fermatLiars from './fermat-liars';
import fingerprint from './fingerprint';
import smallSums from './small-sums';
import fiveGroups from './five-groups';
import usingThePaper from './using-the-paper';

export default {
  code: 'ACP 111',
  title: 'Academic Papers',
  chapters: [
    {
      n: 1,
      title: 'The Reciprocal Sum of Even Pseudoprimes',
      by: 'Xuyan Cheng, Paul Kinlaw and Duc Nguyen, J. Integer Sequences (2026)',
      lessons: [fermatLiars, fingerprint, smallSums, fiveGroups, usingThePaper],
    },
  ],
};
