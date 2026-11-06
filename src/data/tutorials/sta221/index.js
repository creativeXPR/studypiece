// STA 221 interactive tutorial: Statistical Inference, following the course notes section by
// section. Chapter 0 is an optional start for students with no statistics; every other chapter
// ends with an exam practice lesson. Pictures use GraphLab and SpaceLab (bare mode).
import meanAndSpread from './mean-and-spread';
import normalCurve from './normal-curve';
import populationsAndSamples from './populations-and-samples';
import samplingMethods from './sampling-methods';
import samplingDistributions from './sampling-distributions';
import centralLimit from './central-limit';
import examSampling from './exam-sampling';
import confidenceIntervals from './confidence-intervals';
import proportions from './proportions';
import goodEstimators from './good-estimators';
import examEstimation from './exam-estimation';
import testingIdeas from './testing-ideas';
import zTests from './z-tests';
import examTesting from './exam-testing';
import chiSquareDistribution from './chi-square-distribution';
import goodnessOfFit from './goodness-of-fit';
import contingencyTables from './contingency-tables';
import examChiSquare from './exam-chi-square';
import experimentalDesign from './experimental-design';
import oneWayAnova from './one-way-anova';
import twoWayAnova from './two-way-anova';
import examAnova from './exam-anova';
import correlation from './correlation';
import regression from './regression';
import examRegression from './exam-regression';

export default {
  code: 'STA 221',
  title: 'Statistical Inference',
  chapters: [
    {
      n: 0,
      title: 'Statistics from Zero',
      by: 'Averages, spread and the normal curve',
      optional: true,
      hint: 'New to statistics? Start here for the basics.',
      lessons: [meanAndSpread, normalCurve],
    },
    { n: 1, title: 'Sampling', by: 'Methods, sampling distributions and the Central Limit Theorem', lessons: [populationsAndSamples, samplingMethods, samplingDistributions, centralLimit, examSampling] },
    { n: 2, title: 'Estimation', by: 'Confidence intervals, proportions and good estimators', lessons: [confidenceIntervals, proportions, goodEstimators, examEstimation] },
    { n: 3, title: 'Hypothesis Testing', by: 'Errors, power and z tests', lessons: [testingIdeas, zTests, examTesting] },
    { n: 4, title: 'Chi-Square', by: 'The distribution, goodness of fit and contingency tables', lessons: [chiSquareDistribution, goodnessOfFit, contingencyTables, examChiSquare] },
    { n: 5, title: 'Analysis of Variance', by: 'Experimental design, one-way and two-way ANOVA', lessons: [experimentalDesign, oneWayAnova, twoWayAnova, examAnova] },
    { n: 6, title: 'Correlation and Regression', by: 'Association, r and the least squares line', lessons: [correlation, regression, examRegression] },
  ],
};
