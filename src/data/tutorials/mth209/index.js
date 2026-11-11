// MTH 209 interactive tutorial, rebuilt (2026-11-11): every topic sits under one of four ideas, and
// every lesson has two parts: understand it on a simple case, then apply it to an exam-sized one.
// The plan, sources and template are in docs/mth209-rebuild.md.
import courseMap from './course-map';
import errorTypes from './error-types';
import errorPropagation from './error-propagation';
import binomial from './binomial';
import taylor from './taylor';
import specialSeries from './special-series';
import bisection from './bisection';
import regulaFalsi from './regula-falsi';
import linearIteration from './linear-iteration';
import newtonRaphson from './newton-raphson';
import secant from './secant';
import matrixInverse from './matrix-inverse';
import lu from './lu';
import gaussian from './gaussian';
import simpleIteration from './simple-iteration';
import gaussSeidel from './gauss-seidel';
import fixedPointSystems from './fixed-point-systems';
import newtonSystems from './newton-systems';
import differences from './differences';
import operators from './operators';
import linearInterpolation from './linear-interpolation';
import lagrange from './lagrange';
import ivp from './ivp';
import euler from './euler';
import mockExam from './mock-exam';

export default {
  code: 'MTH 209',
  title: 'Numerical Analysis',
  chapters: [
    { n: 0, title: 'The Map', by: 'Why we approximate, and how the four ideas connect', lessons: [courseMap] },
    {
      n: 1,
      title: 'Idea A: How Wrong, and Why Approximating Works',
      by: 'Errors and series',
      lessons: [
        errorTypes,
        errorPropagation,
        binomial,
        taylor,
        specialSeries,
      ],
    },
    {
      n: 2,
      title: 'Idea B: Finding Where Things Balance',
      by: 'Roots of equations, linear and non-linear systems',
      lessons: [
        bisection,
        regulaFalsi,
        linearIteration,
        newtonRaphson,
        secant,
        matrixInverse,
        lu,
        gaussian,
        simpleIteration,
        gaussSeidel,
        fixedPointSystems,
        newtonSystems,
      ],
    },
    {
      n: 3,
      title: 'Idea C: Rebuilding a Function from a Table',
      by: 'Finite differences and interpolation',
      lessons: [
        differences,
        operators,
        linearInterpolation,
        lagrange,
      ],
    },
    {
      n: 4,
      title: 'Idea D: Following Change Step by Step',
      by: 'Initial value problems',
      lessons: [
        ivp,
        euler,
      ],
    },
    { n: 5, title: 'Mock Exam', by: 'A timed paper in the lecturer’s style', lessons: [mockExam] },
  ],
};
