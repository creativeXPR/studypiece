// Every tutorial with all its lessons, keyed by slug, for the build scripts and the
// catalogue (scripts/catalog.js). The app never imports this: it reads the catalogue and loads
// one tutorial at a time through ./index.js. A new tutorial folder must be added here.
import { shapeTutorial } from '../courseShape.js';
import acp111 from './acp111';
import cos202 from './cos202';
import ges103 from './ges103';
import mat222 from './mat222';
import mth209 from './mth209';
import mth205 from './mth205';
import mth210 from './mth210';
import spo101 from './spo101';
import sta221 from './sta221';

const folders = { acp111, cos202, ges103, mat222, mth205, mth209, mth210, spo101, sta221 };

// Tutorials keyed by slug, each lesson marked `ready` and the tutorial its folder name.
export const tutorials = Object.fromEntries(
  Object.entries(folders).map(([folder, t]) => {
    const tutorial = shapeTutorial(t);
    return [tutorial.slug, { ...tutorial, folder }];
  }),
);
