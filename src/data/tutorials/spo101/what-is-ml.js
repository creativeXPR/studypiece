// SPO 101 · What machine learning is · Lesson 1: learning a rule from examples.
import { notebookScene } from './kiosk-scenes';

export default {
  id: 'what-is-ml',
  title: 'What machine learning is',
  covers: 'Learning a rule from examples, everyday ML, features, labels, models, training and prediction',
  minutes: 12,
  sections: [
    {
      name: 'Learning from examples',
      screens: [
        {
          type: 'story',
          eyebrow: 'Lesson 1',
          title: 'Ade’s kiosk',
          body: 'Ade sells cold drinks from a kiosk outside a busy market. Every morning he buys bottles from the supplier.\n\nBuy **too few** and he sells out by noon and loses customers. Buy **too many** and his money sits in crates of warm drinks.\n\nTomorrow’s forecast is $34$ °C. How many bottles should he buy?',
          cta: 'Help Ade',
        },
        {
          type: 'choice',
          poll: 'hunch',
          prompt: 'How would you decide how many bottles Ade should buy?',
          options: [
            { text: 'Guess from gut feeling' },
            { text: 'Buy the same as yesterday' },
            { text: 'Look at past days with similar weather' },
            { text: 'Ask another seller' },
          ],
          pollTitle: 'Noted.',
          pollBody: 'Looking at past days is exactly what machine learning does, only carefully and with numbers. Let’s open Ade’s notebook.',
        },
        notebookScene,
        {
          type: 'story',
          eyebrow: 'The big idea',
          title: 'Rules versus examples',
          body: 'In **ordinary programming**, a person writes the rule: “if it is hotter than 30 °C, buy 80 bottles.” The computer just follows it.\n\nIn ==machine learning==, nobody writes the rule. We give the computer **examples** (past temperatures together with the sales that really happened), and it works out the rule itself.\n\nThat matters when the rule is too hard to write by hand: what makes an email spam, which face is yours, which word comes next in a sentence.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which of these learned its behaviour from examples?',
          options: [
            { text: 'A phone keyboard that suggests your next word', correct: true, why: 'It learned from huge amounts of text which words tend to follow which, and from what **you** usually type.' },
            { text: 'A calculator adding two numbers', why: 'Addition is a fixed rule a person programmed. Nothing is learned.' },
            { text: 'An alarm clock ringing at 6:00', why: 'It follows the time you set: a rule, not learning.' },
            { text: 'A light switch', why: 'No data, no learning: just a circuit.' },
          ],
        },
        {
          type: 'multi',
          eyebrow: 'Spot it',
          prompt: 'Which of these everyday things use machine learning?',
          options: [
            { text: 'Unlocking a phone with your face', correct: true, why: '**ML:** trained on many photos of faces to tell yours from others.' },
            { text: 'The spam folder in your email', correct: true, why: '**ML:** trained on emails people marked as spam or not spam.' },
            { text: 'A map app’s arrival time in traffic', correct: true, why: '**ML:** learned from millions of past trips how long roads take at each hour.' },
            { text: 'Songs or videos recommended for you', correct: true, why: '**ML:** learned from what people like you watched and skipped.' },
            { text: 'A microwave’s countdown timer', why: '**Not ML:** it counts down the time you typed.' },
            { text: 'Converting kilometres to miles', why: '**Not ML:** a fixed formula, multiply by $0.621$.' },
          ],
        },
        {
          type: 'bridge',
          title: 'The big idea: learned, not written.',
          recap: [
            'Machine learning finds a rule from **examples** instead of a person writing it.',
            'Ade’s examples: past days of temperature and bottles sold. His learned rule: a line.',
          ],
          why: 'Next: the handful of words everyone in the field uses for these parts.',
        },
      ],
    },
    {
      name: 'The words people use',
      terms: [
        ['Data', 'The examples we learn from. For Ade: one row per day.'],
        ['Feature', 'An input the model looks at, such as the temperature.'],
        ['Label', 'The answer we want the model to give, such as bottles sold.'],
        ['Model', 'The learned rule that turns features into a prediction, such as Ade’s line.'],
        ['Training', 'Adjusting the model so its predictions match the examples as closely as possible.'],
        ['Prediction', 'The model’s answer for a new case. Using a trained model is also called inference.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Six words',
          title: 'Open each word, using Ade’s kiosk',
          cards: [
            { title: 'Data', text: 'His notebook: twelve days, one row per day.' },
            { title: 'Feature', text: 'The **input**: the day’s temperature.' },
            { title: 'Label', text: 'The **answer** we want: bottles sold.' },
            { title: 'Model', text: 'The rule linking them: the straight line.' },
            { title: 'Training', text: 'Finding the line that fits the dots best.' },
            { title: 'Prediction', text: 'Using the line for a new day: $34$ °C gives about $89$ bottles.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'A spam filter learns from thousands of emails, each marked “spam” or “not spam”. What is the **label**?',
          options: [
            { text: '“Spam” or “not spam”', correct: true, why: 'The label is the answer we want the model to give for each example.' },
            { text: 'The words in the email', why: 'Those are **features**: the inputs the model looks at.' },
            { text: 'The spam filter itself', why: 'That’s the **model**.' },
            { text: 'The thousands of emails', why: 'That’s the **data**, features and labels together.' },
          ],
        },
        {
          type: 'order',
          eyebrow: 'Put it in order',
          prompt: 'The steps of almost every machine-learning project:',
          items: [
            'Collect examples, with the answers (labels)',
            'Choose a kind of model, such as a straight line',
            'Train it: adjust it until it fits the examples',
            'Check it on examples it has never seen',
            'Use it to make predictions on new cases',
          ],
          explain: 'Step 4 is the one beginners skip, and experts never do. A model that only works on the days it was trained on is useless for tomorrow.',
        },
        {
          type: 'choice',
          eyebrow: 'Think deeper',
          prompt: 'Ade’s line was learned from days between $26$ and $36$ °C. During the cold season someone asks it about a $15$ °C day. Should he trust the answer?',
          options: [
            { text: 'No: the model never saw days like that, so its answer is a guess', correct: true, why: 'The line predicts a **negative** number of bottles there, which is impossible. Models are only reliable on cases similar to their training data.' },
            { text: 'Yes: the line goes on forever, so it works for any temperature', why: 'A line can be extended, but the pattern it learned may not hold out there. Here it even predicts fewer than zero bottles.' },
            { text: 'Yes, if the computer is powerful enough', why: 'More computing power doesn’t create knowledge about days it never saw.' },
            { text: 'Only if he rounds the answer', why: 'Rounding doesn’t fix a prediction made far outside the data.' },
          ],
          explain: 'This is one of the most useful questions to ask about any model, in any meeting: **“What data was it trained on, and does my case look like it?”**',
        },
        {
          type: 'story',
          eyebrow: 'Say it like a pro',
          title: 'One sentence to remember',
          body: '**“Machine learning is getting a computer to learn a pattern from examples, so it can make predictions about new cases.”**\n\nYou can now say what a feature, a label, a model and training are, and ask the question every good practitioner asks: “Was it tested on data it hadn’t seen?”',
        },
        {
          type: 'finish',
          title: 'You know what machine learning is.',
          body: 'Next: the different kinds of machine learning, and how AI, ML and chatbots fit together.',
        },
      ],
    },
  ],
};
