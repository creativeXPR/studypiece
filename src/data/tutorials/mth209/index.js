// MTH 209 interactive tutorial: Numerical Methods, one chapter per course topic.
// (A lesson entry without `sections` shows as "Coming soon".)
import bisection from './bisection';
import regulaFalsi from './regula-falsi';
import linearIteration from './linear-iteration';
import newtonRaphson from './newton-raphson';
import secant from './secant';
import linearInterpolation from './linear-interpolation';
import lagrange from './lagrange';
import typesOfError from './types-of-error';
import errorPropagation from './error-propagation';
import differenceOperators from './difference-operators';
import newtonDifferenceFormulas from './newton-difference-formulas';
import matrixInverse from './matrix-inverse';
import luFactorisation from './lu-factorisation';
import gaussian from './gaussian';
import simpleIteration from './simple-iteration';
import gaussSeidel from './gauss-seidel';

export default {
  code: 'MTH 209',
  title: 'Numerical Methods',
  chapters: [
    {
      n: 1,
      title: 'Solutions of Algebraic and Transcendental Equations',
      by: 'Bisection, Regula Falsi, linear iteration, Newton-Raphson, secant',
      lessons: [bisection, regulaFalsi, linearIteration, newtonRaphson, secant],
    },
    {
      n: 2,
      title: 'Interpolation',
      by: 'Linear and higher degree interpolation',
      lessons: [linearInterpolation, lagrange],
    },
    {
      n: 3,
      title: 'Error Analysis',
      by: 'Types, classification and propagation of errors',
      lessons: [typesOfError, errorPropagation],
    },
    {
      n: 4,
      title: 'Finite Differences',
      by: 'Forward, backward and central differences',
      lessons: [differenceOperators, newtonDifferenceFormulas],
    },
    {
      n: 5,
      title: 'Systems of Linear Equations',
      by: 'Direct and iterative methods',
      lessons: [matrixInverse, luFactorisation, gaussian, simpleIteration, gaussSeidel],
    },
    {
      n: 6,
      title: 'Systems of Non-Linear Equations',
      by: 'Fixed points, iteration and Newton’s method',
      lessons: [
        { id: 'nonlinear-systems', title: 'Definitions, fixed points and convergence', covers: 'Non-linear systems, fixed point iteration, condition for convergence' },
        { id: 'newton-systems', title: 'Newton’s method for systems', covers: 'The Jacobian and Newton’s iteration for two equations' },
      ],
    },
    {
      n: 7,
      title: 'Initial Value Problems in ODEs',
      by: 'Numerical solution of y′ = f(x, y), y(x₀) = y₀',
      lessons: [
        { id: 'ivp-intro', title: 'Initial value problems', covers: 'Euler’s method and related methods for y′ = f(x, y)' },
      ],
    },
  ],
};
