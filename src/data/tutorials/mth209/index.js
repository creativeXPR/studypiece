// MTH 209 interactive tutorial: Numerical Analysis, rebuilt as a map and four parts
// (see docs/mth209-rebuild.md).
// (A lesson entry without `sections` shows as "Coming soon".)
import courseMap from './course-map';
import errors from './errors';
import errorSpread from './error-spread';
import taylor from './taylor';
import standardSeries from './standard-series';
import examFoundations from './exam-foundations';
import bracketing from './bracketing';
import linearIteration from './linear-iteration';
import newtonSecant from './newton-secant';
import examEquations from './exam-equations';
import matrixInverse from './matrix-inverse';
import eliminationLu from './elimination-lu';
import linearIterative from './linear-iterative';
import examLinearSystems from './exam-linear-systems';
import nonlinearSystems from './nonlinear-systems';
import newtonSystems from './newton-systems';
import examNonlinear from './exam-nonlinear';
import differenceOperators from './difference-operators';
import operators from './operators';
import newtonDifferenceFormulas from './newton-difference-formulas';
import centralDifferences from './central-differences';
import examDifferences from './exam-differences';
import lagrange from './lagrange';
import examInterpolation from './exam-interpolation';
import ivpIntro from './ivp-intro';
import ivpUnique from './ivp-unique';
import euler from './euler';
import taylorMethod from './taylor-method';
import examIvp from './exam-ivp';
import mockExam from './mock-exam';

export default {
  code: 'MTH 209',
  title: 'Numerical Analysis',
  chapters: [
    {
      n: 0,
      title: 'The Map',
      by: 'What the course is for, and the four jobs it teaches',
      lessons: [courseMap],
    },
    {
      n: 'A',
      title: 'Foundations',
      by: 'Errors and how they spread; Taylor and the standard series',
      lessons: [errors, errorSpread, taylor, standardSeries, examFoundations],
    },
    {
      n: 'B',
      title: 'Solving',
      by: 'Equations, linear systems and non-linear systems',
      lessons: [
        bracketing,
        linearIteration,
        newtonSecant,
        examEquations,
        matrixInverse,
        eliminationLu,
        linearIterative,
        examLinearSystems,
        nonlinearSystems,
        newtonSystems,
        examNonlinear,
      ],
    },
    {
      n: 'C',
      title: 'Data',
      by: 'Finite differences, Newton and Everett formulas, interpolation and its error',
      lessons: [differenceOperators, operators, newtonDifferenceFormulas, centralDifferences, examDifferences, lagrange, examInterpolation],
    },
    {
      n: 'D',
      title: 'Change',
      by: 'Initial value problems, Euler and the Taylor series method',
      lessons: [ivpIntro, ivpUnique, euler, taylorMethod, examIvp],
    },
    {
      n: 'E',
      title: 'Mock Exam',
      by: 'Six written questions on a 60-minute clock',
      lessons: [mockExam],
    },
  ],
};
