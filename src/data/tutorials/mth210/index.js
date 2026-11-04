// MTH 210 interactive tutorial: Vector Analysis. Six chapters, each ending with an exam practice
// lesson. Pictures use the SpaceLab (3D) and FieldLab (2D fields) widgets in vectorWidgets.jsx.
import whatIsAVector from './what-is-a-vector';
import unitVectors from './unit-vectors';
import examBasics from './exam-basics';
import dotProduct from './dot-product';
import crossProduct from './cross-product';
import tripleProducts from './triple-products';
import examProducts from './exam-products';
import vectorEquations from './vector-equations';
import examEquations from './exam-equations';
import lines from './lines';
import planes from './planes';
import meetingAngles from './meeting-angles';
import examLinesPlanes from './exam-lines-planes';
import gradient from './gradient';
import divCurl from './div-curl';
import delRules from './del-rules';
import examCalculus from './exam-calculus';
import vectorFunctions from './vector-functions';
import serretFrenet from './serret-frenet';
import examCurves from './exam-curves';

export default {
  code: 'MTH 210',
  title: 'Vector Analysis',
  chapters: [
    { n: 1, title: 'Vector Basics', by: 'Vectors, types, unit vectors and direction cosines', lessons: [whatIsAVector, unitVectors, examBasics] },
    { n: 2, title: 'Products', by: 'Dot, cross and triple products, linear independence', lessons: [dotProduct, crossProduct, tripleProducts, examProducts] },
    { n: 3, title: 'Vector Equations', by: 'Solving for an unknown vector', lessons: [vectorEquations, examEquations] },
    { n: 4, title: 'Lines and Planes', by: 'Equations, intersections and angles', lessons: [lines, planes, meetingAngles, examLinesPlanes] },
    { n: 5, title: 'Vector Calculus', by: 'Gradient, divergence, curl and types of fields', lessons: [gradient, divCurl, delRules, examCalculus] },
    { n: 6, title: 'Curves', by: 'Vector functions and the Serret–Frenet formulas', lessons: [vectorFunctions, serretFrenet, examCurves] },
  ],
};
