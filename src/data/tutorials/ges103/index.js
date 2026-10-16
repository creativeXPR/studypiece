// GES 103 interactive tutorial: every chapter in the study notes, as playable lessons.
// (A lesson entry without `sections` would show as "Coming soon".)
import politics from './politics';
import power from './power';
import state from './state';
import needGovernment from './need-government';
import organs from './organs';
import designCountry from './design-country';
import ideologies from './ideologies';
import bornFromCrisis from './born-from-crisis';
import notGist from './not-gist';
import sociologyRelevance from './sociology-relevance';
import survey from './survey';
import describingData from './describing-data';
import whichTest from './which-test';
import qualitative from './qualitative';
import psychologists from './psychologists';
import schools from './schools';
import psychAtWork from './psych-at-work';
import skyToRock from './sky-to-rock';
import waterLife from './water-life';
import peoplePlaces from './people-places';
import footprint from './footprint';

export default {
  code: 'GES 103',
  title: 'Politics, society, the mind and the environment',
  chapters: [
    {
      n: 1,
      title: 'The Study of Politics and the Concept of Government',
      by: 'S.A. Lafenwa',
      lessons: [politics, power, state],
    },
    {
      n: 2,
      title: 'Organisation and Classification of Government',
      by: 'S.A. Lafenwa',
      lessons: [needGovernment, organs, designCountry, ideologies],
    },
    {
      n: 5,
      title: 'Definition, Focus and Relevance of Sociology',
      by: 'Patricia Taiwo',
      lessons: [bornFromCrisis, notGist, sociologyRelevance],
    },
    {
      n: 6,
      title: 'Basic Methods in Data Collection and Analysis',
      by: 'P.A. Taiwo and A.S. Omolawal',
      lessons: [survey, describingData, whichTest, qualitative],
    },
    {
      n: 9,
      title: 'Psychology: Man and His World',
      by: 'A.O. Taiwo, S.K. Balogun et al.',
      lessons: [psychologists, schools, psychAtWork],
    },
    {
      n: 11,
      title: 'The Physical and Human Environment',
      by: 'Y.C. Akinyemi and O. Oladiran',
      lessons: [skyToRock, waterLife, peoplePlaces, footprint],
    },
  ],
};
