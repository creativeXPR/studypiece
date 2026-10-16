// MAT 222 interactive tutorial: worked solutions to past Questions 1 and 4 (limits and continuity).
import limitDefinition from './limit-definition';
import limitUnique from './limit-unique';
import epsilonDeltaProof from './epsilon-delta-proof';
import threeConditions from './three-conditions';
import continuityDefinitions from './continuity-definitions';
import lipschitz from './lipschitz';
import sin2xOverX from './sin2x-over-x';

export default {
  code: 'MAT 222',
  title: 'Limits and continuity, solved step by step',
  chapters: [
    {
      n: 1,
      title: 'Question 1: Limits of functions',
      by: '15 marks',
      lessons: [limitDefinition, limitUnique, epsilonDeltaProof, threeConditions],
    },
    {
      n: 4,
      title: 'Question 4: Continuity and uniform continuity',
      by: '15 marks',
      lessons: [continuityDefinitions, lipschitz, sin2xOverX],
    },
  ],
};
