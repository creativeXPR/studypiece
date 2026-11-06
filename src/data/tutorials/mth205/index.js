// MTH 205 interactive tutorial: Linear Algebra II. Geometry first: every matrix is a motion of the
// plane (planeWidget.jsx), one running matrix A = (2 1; 1 2) carries through eigenvectors,
// diagonalization, orthogonal diagonalization and quadratic forms, and the shear (2 1; 0 2) leads
// to Jordan form. Proofs are walked through as pictures before the exam-style version. Each
// chapter ends with an exam practice lesson; Chapter 7 is a timed mock exam.
import matricesMoveSpace from './matrices-move-space';
import combiningAndUndoing from './combining-and-undoing';
import homogeneousSystems from './homogeneous-systems';
import nonhomogeneousSystems from './nonhomogeneous-systems';
import inverseAndCramer from './inverse-and-cramer';
import examSystems from './exam-systems';
import similarMatrices from './similar-matrices';
import eigenvectors from './eigenvectors';
import cayleyHamilton from './cayley-hamilton';
import examEigen from './exam-eigen';
import diagonalization from './diagonalization';
import diagonalizingSteps from './diagonalizing-steps';
import examDiagonalization from './exam-diagonalization';
import innerProducts from './inner-products';
import gramSchmidt from './gram-schmidt';
import orthogonalDiagonalization from './orthogonal-diagonalization';
import examInnerProducts from './exam-inner-products';
import bilinearForms from './bilinear-forms';
import symmetricBilinear from './symmetric-bilinear';
import quadraticForms from './quadratic-forms';
import examForms from './exam-forms';
import jordanBlocks from './jordan-blocks';
import findingJordanForm from './finding-jordan-form';
import examJordan from './exam-jordan';
import mockExam from './mock-exam';

export default {
  code: 'MTH 205',
  title: 'Linear Algebra II',
  chapters: [
    {
      n: 0,
      title: 'The Picture',
      by: 'Matrices as motions, determinants, products and inverses',
      hint: 'Start here: every later idea is built on this picture.',
      lessons: [matricesMoveSpace, combiningAndUndoing],
    },
    { n: 1, title: 'Systems of Linear Equations', by: 'Homogeneous and non-homogeneous systems, inverse method, Cramer’s rule', lessons: [homogeneousSystems, nonhomogeneousSystems, inverseAndCramer, examSystems] },
    { n: 2, title: 'Eigenvalues and Eigenvectors', by: 'Similar matrices, characteristic polynomial, Cayley–Hamilton, minimal polynomial', lessons: [similarMatrices, eigenvectors, cayleyHamilton, examEigen] },
    { n: 3, title: 'Diagonalization', by: 'When and how a matrix becomes diagonal', lessons: [diagonalization, diagonalizingSteps, examDiagonalization] },
    { n: 4, title: 'Inner Product Spaces', by: 'Norms, orthogonality, Gram–Schmidt, orthogonal diagonalization', lessons: [innerProducts, gramSchmidt, orthogonalDiagonalization, examInnerProducts] },
    { n: 5, title: 'Bilinear and Quadratic Forms', by: 'Matrices of forms, congruence, symmetric forms, principal axes', lessons: [bilinearForms, symmetricBilinear, quadraticForms, examForms] },
    { n: 6, title: 'Jordan Canonical Form', by: 'Jordan blocks, generalized eigenvectors and how to find J', lessons: [jordanBlocks, findingJordanForm, examJordan] },
    { n: 7, title: 'Mock Exam', by: 'Six written questions with proofs on a 60-minute clock', lessons: [mockExam] },
  ],
};
