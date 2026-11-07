// SPO 101 interactive tutorial: Introduction to Machine Learning, a StudyPiece Original for
// complete beginners. One everyday story (Ade's cold-drink kiosk) runs through the course, and the
// Python is typed and run in the browser.
import whatIsMl from './what-is-ml';
import mlAroundYou from './ml-around-you';
import firstProgram from './first-program';
import numbersAndNames from './numbers-and-names';
import listsAndLoops from './lists-and-loops';
import decisions from './decisions';
import functions from './functions';
import tables from './tables';
import lookingAtData from './looking-at-data';
import messyData from './messy-data';
import fittingALine from './fitting-a-line';
import twoKnobs from './two-knobs';
import manyFeatures from './many-features';
import trainTest from './train-test';
import overfitting from './overfitting';
import metrics from './metrics';
import classification from './classification';
import trees from './trees';
import clustering from './clustering';
import neurons from './neurons';
import layers from './layers';
import trainingNetworks from './training-networks';
import tokens from './tokens';
import embeddings from './embeddings';
import nextWord from './next-word';
import attention from './attention';
import howLlmsMade from './how-llms-made';
import promptingRag from './prompting-rag';
import checkingLlms from './checking-llms';
import bias from './bias';
import privacySafety from './privacy-safety';
import readingPapers from './reading-papers';
import goodQuestions from './good-questions';
import community from './community';
import mockConference from './mock-conference';
import installPython from './install-python';
import vsCode from './vs-code';
import packages from './packages';
import notebooks from './notebooks';
import gitGithub from './git-github';
import capstoneBuild from './capstone-build';
import capstoneShare from './capstone-share';

export default {
  code: 'SPO 101',
  title: 'Introduction to Machine Learning',
  chapters: [
    { n: 1, title: 'What Machine Learning Is', by: 'Learning from examples, the words of the field, the kinds of learning', lessons: [whatIsMl, mlAroundYou] },
    { n: 2, title: 'Python from Zero', by: 'Your first programs, typed and run in the browser', lessons: [firstProgram, numbersAndNames, listsAndLoops, decisions, functions] },
    { n: 3, title: 'Data', by: 'Tables, pictures and cleaning', lessons: [tables, lookingAtData, messyData] },
    { n: 4, title: 'Fitting a Line', by: 'Parameters, loss, gradient descent and linear regression', lessons: [fittingALine, twoKnobs, manyFeatures] },
    { n: 5, title: 'Is It Any Good?', by: 'Testing models honestly', lessons: [trainTest, overfitting, metrics] },
    { n: 6, title: 'Yes-or-No Questions and Groups', by: 'Classification, decision trees and clustering', lessons: [classification, trees, clustering] },
    { n: 7, title: 'Neural Networks', by: 'Neurons, layers and backpropagation', lessons: [neurons, layers, trainingNetworks] },
    { n: 8, title: 'Text, Embeddings and Transformers', by: 'How computers read', lessons: [tokens, embeddings, nextWord, attention] },
    { n: 9, title: 'Large Language Models in Practice', by: 'How LLMs are made, used and checked', lessons: [howLlmsMade, promptingRag, checkingLlms] },
    { n: 10, title: 'Responsible AI', by: 'Fairness, privacy, safety and the law', lessons: [bias, privacySafety] },
    { n: 11, title: 'Joining the Conversation', by: 'Papers, questions, community and a mock conference', lessons: [readingPapers, goodQuestions, community, mockConference] },
    { n: 12, title: 'Setting Up Your Own PC', by: 'Python, VS Code, packages, notebooks and Git', lessons: [installPython, vsCode, packages, notebooks, gitGithub] },
    { n: 13, title: 'Capstone', by: 'Build it, publish it, present it', lessons: [capstoneBuild, capstoneShare] },
  ],
};
