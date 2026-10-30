import { lazy } from 'react';

// Java screens load on demand, so courses without code never download the editor.
const load = (name) => lazy(() => import('./codeScreens').then((m) => ({ default: m[name] })));

export const JAVA_SCREENS = {
  code: load('CodeScreen'),
  bug: load('BugScreen'),
  predict: load('PredictScreen'),
  fill: load('FillScreen'),
  better: load('BetterScreen'),
};
