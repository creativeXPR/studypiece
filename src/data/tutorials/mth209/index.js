// MTH 209 interactive tutorial: Numerical Analysis, rebuilt as a map and four parts
// (see docs/mth209-rebuild.md). Parts B–D still hold the earlier lessons until each is rebuilt.
// (A lesson entry without `sections` shows as "Coming soon".)
import courseMap from './course-map';
import errors from './errors';
import errorSpread from './error-spread';
import taylor from './taylor';
import standardSeries from './standard-series';
import examFoundations from './exam-foundations';
import bisection from './bisection';
import regulaFalsi from './regula-falsi';
import linearIteration from './linear-iteration';
import newtonRaphson from './newton-raphson';
import secant from './secant';
import examEquations from './exam-equations';
import matrixInverse from './matrix-inverse';
import luFactorisation from './lu-factorisation';
import gaussian from './gaussian';
import simpleIteration from './simple-iteration';
import gaussSeidel from './gauss-seidel';
import examLinearSystems from './exam-linear-systems';
import nonlinearSystems from './nonlinear-systems';
import newtonSystems from './newton-systems';
import examNonlinear from './exam-nonlinear';
import differenceOperators from './difference-operators';
import newtonDifferenceFormulas from './newton-difference-formulas';
import examDifferences from './exam-differences';
import linearInterpolation from './linear-interpolation';
import lagrange from './lagrange';
import examInterpolation from './exam-interpolation';
import ivpIntro from './ivp-intro';
import ivpUnique from './ivp-unique';
import euler from './euler';
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
        bisection,
        regulaFalsi,
        linearIteration,
        newtonRaphson,
        secant,
        examEquations,
        matrixInverse,
        luFactorisation,
        gaussian,
        simpleIteration,
        gaussSeidel,
        examLinearSystems,
        nonlinearSystems,
        newtonSystems,
        examNonlinear,
      ],
    },
    {
      n: 'C',
      title: 'Data',
      by: 'Finite differences and interpolation',
      lessons: [differenceOperators, newtonDifferenceFormulas, examDifferences, linearInterpolation, lagrange, examInterpolation],
    },
    {
      n: 'D',
      title: 'Change',
      by: 'Initial value problems and Euler’s method',
      lessons: [ivpIntro, ivpUnique, euler, examIvp],
    },
    {
      n: 'E',
      title: 'Mock Exam',
      by: 'Six written questions on a 60-minute clock',
      lessons: [mockExam],
    },
  ],
};
