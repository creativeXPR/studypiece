// SPO 101 · Yes-or-no questions and groups · Lesson 3: unsupervised learning. k-means clustering on
// customer visits, choosing k, scaling features, and what clusters are used for.
import { HOUR, QTY, kmeansScene } from './class-scenes';

const SETUP = `hour = [${HOUR.join(', ')}]\nbottles = [${QTY.join(', ')}]\nvisits = [[h, b] for h, b in zip(hour, bottles)]`;
const FIT = `from sklearn.cluster import KMeans

model = KMeans(n_clusters=3, n_init=10, random_state=0)
model.fit(visits)

for centre in model.cluster_centers_:
    print(round(centre[0], 1), "o'clock,", round(centre[1], 1), "bottles")`;

export default {
  id: 'clustering',
  title: 'Finding groups',
  covers: 'Unsupervised learning, k-means clustering, choosing k, scaling features, uses of clusters',
  minutes: 13,
  sections: [
    {
      name: 'No labels',
      terms: [
        ['Clustering', 'Grouping examples so that similar ones end up together, with no labels given.'],
        ['k-means', 'A clustering method: place k centres, assign each point to its nearest centre, move centres to the middle of their points, repeat.'],
        ['Centroid', 'The centre (average point) of a cluster.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What is a random forest?',
          options: [
            { text: 'Many decision trees, trained on random samples, voting together', correct: true, why: 'Their individual mistakes tend to cancel out.' },
            { text: 'One very deep tree', why: 'That is a single tree, which overfits easily.' },
            { text: 'A clustering method', why: 'It is a supervised ensemble of trees.' },
            { text: 'A tree with random questions', why: 'Each tree still learns its questions; only its sample of data is random.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 6 · Lesson 3',
          title: 'Who are Ade’s customers?',
          body: 'Ade wonders whether to offer a crate discount, and to whom. For a week he notes each visit: the **hour** and the **bottles bought**. Nobody tells him what kinds of customer exist. There are no labels.\n\nFinding groups in unlabelled data is ==clustering==, the most common kind of **unsupervised** learning.',
        },
        kmeansScene,
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which step of k-means moves the centres?',
          options: [
            { text: 'Each centre moves to the average position of the points assigned to it', correct: true, why: 'Then points are reassigned to the nearest centre, and the two steps repeat until nothing changes.' },
            { text: 'Centres move towards the biggest point', why: 'They move to the average of their points.' },
            { text: 'Centres never move', why: 'Moving them is half of the method.' },
            { text: 'A human drags them', why: 'The algorithm moves them itself.' },
          ],
        },
      ],
    },
    {
      name: 'In practice',
      terms: [
        ['Scaling', 'Putting features on comparable ranges before measuring distances, so one feature doesn’t dominate.'],
      ],
      screens: [
        {
          type: 'custom',
          widget: 'code',
          eyebrow: 'Try it',
          title: 'k-means with scikit-learn',
          body: '`visits` holds one `[hour, bottles]` pair per visit. `n_init=10` tries 10 different starting positions and keeps the best, because a bad start can get stuck.',
          graph: {
            packages: ['scikit-learn'],
            setup: SETUP,
            tasks: [
              { ask: 'Run it: the centre of each group.', code: FIT, test: 'len(model.cluster_centers_) == 3', hint: 'Run it as it is.', solution: FIT, done: 'Three centres: about 13:18 with 2 bottles, 8:30 with 7, and 18:12 with 1.6. The order the groups come out in doesn’t matter.' },
              { ask: 'Which group would a 9 o’clock visit buying 6 bottles join? Print the group number.', code: 'print(model.predict([[9, 6]])[0])', test: 'True', hint: 'Run it as it is.', solution: 'print(model.predict([[9, 6]])[0])', done: 'It joins the morning traders’ group, the one whose centre is near 8:30 and 7 bottles.' },
            ],
          },
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'You must choose $k$, the number of groups. What happens with $k = 22$ on these 22 visits?',
          options: [
            { text: 'Every visit is its own group: perfectly tight, completely useless', correct: true, why: 'Choosing $k$ is a judgement: enough groups to be useful, few enough to mean something. Plots of how tightness improves with $k$ (the “elbow”) help.' },
            { text: 'It finds the perfect grouping', why: 'One group per point tells you nothing.' },
            { text: 'k-means refuses', why: 'It will run, giving singleton groups.' },
            { text: 'It finds 3 groups anyway', why: 'k-means always makes exactly k groups.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'A hidden trap',
          title: 'Distances depend on units',
          body: 'k-means measures distance. If hours ran from 0 to 24 but spending were in naira (0 to 3,000), the naira would dominate every distance and the hour would barely count.\n\nThat’s why practitioners ==scale== features first, putting each on a similar range (for example, subtracting the mean and dividing by the spread). Here hours (7 to 19) and bottles (1 to 8) are already on similar ranges.',
        },
        {
          type: 'multi',
          eyebrow: 'Where it’s used',
          prompt: 'Which are typical uses of clustering?',
          options: [
            { text: 'Grouping customers to tailor offers', correct: true, why: '**Yes:** customer segmentation, like Ade’s.' },
            { text: 'Grouping news articles by topic', correct: true, why: '**Yes:** often on text embeddings (Chapter 8).' },
            { text: 'Spotting unusual transactions that fit no group', correct: true, why: '**Yes:** anomaly detection.' },
            { text: 'Predicting tomorrow’s exact sales', why: '**No:** that needs labels: regression.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'Presenting clusters',
          body: '**“k-means with k = 3 on visit time and quantity found three segments: morning bulk buyers, lunchtime singles, and evening students. We then offered a crate discount only to the first group.”**\n\nAnd the fair question to ask anyone presenting clusters: **“How did you choose k, and are the groups stable if you rerun it?”**',
        },
        {
          type: 'finish',
          title: 'You can find groups.',
          body: 'Unsupervised learning, k-means, choosing k and scaling. Next chapter: neural networks.',
        },
      ],
    },
  ],
};
