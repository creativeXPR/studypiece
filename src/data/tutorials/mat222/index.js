// MAT 222 interactive tutorial. For now: a quick review of limits and continuity; the full
// course (functions, limits, continuity, differentiation, Riemann integration) is coming.
import limitDefinition from './limit-definition';
import limitUnique from './limit-unique';
import epsilonDeltaProof from './epsilon-delta-proof';
import threeConditions from './three-conditions';
import continuityDefinitions from './continuity-definitions';
import lipschitz from './lipschitz';
import sin2xOverX from './sin2x-over-x';

export default {
  code: 'MAT 222',
  title: 'Real analysis: limits, continuity and beyond',
  chapters: [
    {
      n: 1,
      title: 'Quick review: Limits of functions',
      by: 'The ε-δ definition, uniqueness, an ε-δ proof, conditions for continuity',
      lessons: [limitDefinition, limitUnique, epsilonDeltaProof, threeConditions],
    },
    {
      n: 2,
      title: 'Quick review: Continuity and uniform continuity',
      by: 'Continuity vs uniform continuity, Lipschitz functions, removable discontinuities',
      lessons: [continuityDefinitions, lipschitz, sin2xOverX],
    },
  ],
};
