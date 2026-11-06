// MTH 205 shared pictures. One matrix, A = (2 1; 1 2), runs through the whole course: its grid
// motion (Ch 0), its eigenvectors (1, 1) and (−1, 1) (Ch 2), its diagonal form diag(3, 1) (Ch 3),
// its perpendicular eigenvectors (Ch 4) and its quadratic form's ellipse (Ch 5). The shear
// (2 1; 0 2) is the matrix that cannot be diagonalized (Ch 6). Matrices are [a, b, c, d] =
// (a b; c d), so î lands on (a, c) and ĵ on (b, d).
export const ID = [1, 0, 0, 1];
export const A = [2, 1, 1, 2];
export const A2 = [5, 4, 4, 5];
export const SHEAR = [2, 1, 0, 2];
export const ROT90 = [0, -1, 1, 0];

export const det = (M) => M[0] * M[3] - M[1] * M[2];
export const minusL = (M, l) => [M[0] - l, M[1], M[2], M[3] - l];

export const iHat = (more) => ({ id: 'i', vec: [1, 0], kind: 'b', label: 'î', ...more });
export const jHat = (more) => ({ id: 'j', vec: [0, 1], kind: 'd', label: 'ĵ', ...more });
export const SQUARE = [[0, 0], [1, 0], [1, 1], [0, 1]];

export const circle = (cx, cy, r, n = 40) => Array.from({ length: n }, (_, k) => [cx + r * Math.cos((2 * Math.PI * k) / n), cy + r * Math.sin((2 * Math.PI * k) / n)]);
