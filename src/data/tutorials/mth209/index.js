// MTH 209 interactive tutorial: Numerical Analysis, one chapter per course topic.
// (A lesson entry without `sections` shows as "Coming soon".)
import bisection from './bisection';
import regulaFalsi from './regula-falsi';
import linearIteration from './linear-iteration';
import newtonRaphson from './newton-raphson';
import secant from './secant';
import examEquations from './exam-equations';
import linearInterpolation from './linear-interpolation';
import lagrange from './lagrange';
import examInterpolation from './exam-interpolation';
import typesOfError from './types-of-error';
import errorPropagation from './error-propagation';
import examErrors from './exam-errors';
import differenceOperators from './difference-operators';
import newtonDifferenceFormulas from './newton-difference-formulas';
import examDifferences from './exam-differences';
import matrixInverse from './matrix-inverse';
import luFactorisation from './lu-factorisation';
import gaussian from './gaussian';
import simpleIteration from './simple-iteration';
import gaussSeidel from './gauss-seidel';
import examLinearSystems from './exam-linear-systems';
import binomialExpansion from './binomial-expansion';
import taylorMaclaurin from './taylor-maclaurin';
import exponentialSeries from './exponential-series';
import examSeries from './exam-series';
import nonlinearSystems from './nonlinear-systems';
import newtonSystems from './newton-systems';
import examNonlinear from './exam-nonlinear';
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
      n: 1,
      title: 'Solutions of Algebraic and Transcendental Equations',
      by: 'Bisection, Regula Falsi, linear iteration, Newton-Raphson, secant',
      lessons: [bisection, regulaFalsi, linearIteration, newtonRaphson, secant, examEquations],
    },
    {
      n: 2,
      title: 'Interpolation',
      by: 'Linear and higher degree interpolation',
      lessons: [linearInterpolation, lagrange, examInterpolation],
    },
    {
      n: 3,
      title: 'Error Analysis',
      by: 'Types, classification and propagation of errors',
      lessons: [typesOfError, errorPropagation, examErrors],
    },
    {
      n: 4,
      title: 'Finite Differences',
      by: 'Forward, backward and central differences',
      lessons: [differenceOperators, newtonDifferenceFormulas, examDifferences],
    },
    {
      n: 5,
      title: 'Approximations',
      by: 'Binomial expansion, Taylor, Maclaurin and exponential series',
      lessons: [binomialExpansion, taylorMaclaurin, exponentialSeries, examSeries],
    },
    {
      n: 6,
      title: 'Systems of Linear Equations',
      by: 'Direct and iterative methods',
      lessons: [matrixInverse, luFactorisation, gaussian, simpleIteration, gaussSeidel, examLinearSystems],
    },
    {
      n: 7,
      title: 'Systems of Non-Linear Equations',
      by: 'Fixed points, iteration and Newton’s method',
      lessons: [nonlinearSystems, newtonSystems, examNonlinear],
    },
    {
      n: 8,
      title: 'Initial Value Problems in ODEs',
      by: 'Unique solutions, the Lipschitz condition and Euler’s method',
      lessons: [ivpIntro, ivpUnique, euler, examIvp],
    },
    {
      n: 9,
      title: 'Mock Exam',
      by: 'Six written questions on a 60-minute clock',
      lessons: [mockExam],
    },
  ],
};
