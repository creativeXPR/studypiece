// MAT 222 interactive tutorial: Real Analysis II, from functions to the Fundamental Theorem.
// Several lessons are built from smaller parts with joinLesson (see join.js).
import topology from './topology';
import functions from './functions';
import mappings from './mappings';
import clusterLimit from './cluster-limit';
import epsilonDeltaProof from './epsilon-delta-proof';
import sequentialLimits from './sequential-limits';
import limitsInfinity from './limits-infinity';
import continuity from './continuity';
import discontinuities from './discontinuities';
import monotone from './monotone';
import extremeValue from './extreme-value';
import intermediateValue from './intermediate-value';
import uniformLipschitz from './uniform-lipschitz';
import derivative from './derivative';
import derivativeRules from './derivative-rules';
import fermatRolle from './fermat-rolle';
import meanValue from './mean-value';
import mvtConsequences from './mvt-consequences';
import taylorLhopital from './taylor-lhopital';
import partitionsSums from './partitions-sums';
import riemannIntegral from './riemann-integral';
import integrabilityTests from './integrability-tests';
import integrableClasses from './integrable-classes';
import integralProperties from './integral-properties';
import riemannSums from './riemann-sums';
import ftc from './ftc';

export default {
  code: 'MAT 222',
  title: 'Real Analysis II',
  chapters: [
    { n: 0, title: 'Warm-up: Sets in ℝ', by: 'Open, closed and compact sets', lessons: [topology] },
    { n: 1, title: 'Functions and Mappings', by: 'Images, pre-images, inverses and composition', lessons: [functions, mappings] },
    { n: 2, title: 'Limits', by: 'ε-δ, sequences, limits at and to infinity', lessons: [clusterLimit, epsilonDeltaProof, sequentialLimits, limitsInfinity] },
    { n: 3, title: 'Continuity', by: 'Definitions, discontinuities, monotone functions', lessons: [continuity, discontinuities, monotone] },
    { n: 4, title: 'Continuity on Closed Intervals', by: 'Extreme values, intermediate values, uniform and Lipschitz continuity', lessons: [extremeValue, intermediateValue, uniformLipschitz] },
    { n: 5, title: 'Differentiation', by: 'The derivative and its rules', lessons: [derivative, derivativeRules] },
    { n: 6, title: 'The Mean Value Theorems and Taylor', by: 'Fermat, Rolle, MVT, Cauchy, Taylor, L’Hôpital', lessons: [fermatRolle, meanValue, mvtConsequences, taylorLhopital] },
    { n: 7, title: 'The Riemann Integral', by: 'Sums, integrals, criteria and integrable classes', lessons: [partitionsSums, riemannIntegral, integrabilityTests, integrableClasses] },
    { n: 8, title: 'Properties and the Fundamental Theorem', by: 'Properties, Riemann sums, FTC, substitution and parts', lessons: [integralProperties, riemannSums, ftc] },
  ],
};
