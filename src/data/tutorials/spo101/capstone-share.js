// SPO 101 · Capstone · Lesson 2: publishing and presenting. A demo on Hugging Face Spaces with
// Gradio, a README, a five-minute talk, a short post, and where to go next.

export default {
  id: 'capstone-share',
  title: 'Publish and present',
  covers: 'A Gradio demo on Hugging Face Spaces, the README, a five-minute talk, sharing online, next steps',
  minutes: 14,
  sections: [
    {
      name: 'Make it usable',
      terms: [
        ['Demo', 'A small app that lets anyone try your model, without installing anything.'],
        ['Gradio', 'A Python library that turns a function into a web page with inputs and outputs, in a few lines.'],
        ['Hugging Face Spaces', 'Free hosting for ML demos; each Space gets its own web link.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In the capstone, which model did best on Ade’s 6 test days, and why?',
          options: [
            { text: 'Linear regression: with only 24 training days, simpler models overfit less', correct: true, why: 'Flexible models need more data to beat simple ones.' },
            { text: 'The random forest, because forests always win', why: 'Not here: it overfit the small dataset.' },
            { text: 'The deepest tree', why: 'It did worst.' },
            { text: 'The baseline', why: 'All three models beat it easily.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 13 · Lesson 2',
          title: 'A link anyone can try',
          body: 'A result in a notebook convinces few people. A **link** where anyone can type tomorrow’s weather and see a prediction is memorable.\n\n==Gradio== turns a Python function into a small web page:\n\n`import gradio as gr`\n`def order(temp, rain, market):`\n`    return round(final.predict(...)[0])`\n`gr.Interface(order, ["number", "checkbox", "checkbox"], "number").launch()`\n\nThe last line builds a page with a number box, two tick boxes and an output. Upload the code and your model to a ==Hugging Face Space== and it gets a public web address.',
        },
        {
          type: 'order',
          eyebrow: 'Publish a Space',
          prompt: 'Putting your demo online, in order:',
          items: [
            'Save the trained model to a file and put it with your Gradio code in `app.py`',
            'List the packages in `requirements.txt`',
            'On huggingface.co, create a new Space and choose Gradio',
            'Upload `app.py`, `requirements.txt` and the model file',
            'Wait for it to build, then share the link',
          ],
          explain: 'Link the Space from your GitHub README and the README from the Space, so people can find both the demo and the code.',
        },
      ],
    },
    {
      name: 'Tell the story',
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Five minutes, five slides',
          title: 'A talk structure that works',
          cards: [
            { title: '1. The problem (30 s)', text: '“Ade sells out on hot market days and wastes stock on rainy ones.” A real person and a real cost.' },
            { title: '2. The data (45 s)', text: '“30 days: temperature, rain, market day, sales.” One chart (the rain scatter).' },
            { title: '3. The method (60 s)', text: '“Linear regression, trained on 24 days, tested on the last 6; compared with a tree and a forest.”' },
            { title: '4. The results (90 s)', text: '“Off by 6 bottles a day versus 48 for guessing the average. Simple beat fancy here.” Show the table.' },
            { title: '5. Limits and next (45 s)', text: '“One kiosk, one month, no rainy season yet. Next: more kiosks.” Then invite questions.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Which results sentence is best for a talk?',
          options: [
            { text: '“On six later days it never saw, it was off by about 6 bottles a day; always guessing the average was off by 48.”', correct: true, why: 'Plain words, an honest test, and a baseline for scale.' },
            { text: '“Our model is very accurate.”', why: 'No number, no test, no comparison.' },
            { text: '“The MSE on the training set was 31.”', why: 'Training error, and a score most listeners can’t picture.' },
            { text: '“It uses 4 parameters.”', why: 'Describes the model, not how well it works.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Share it',
          title: 'A short post',
          body: 'A post on LinkedIn, X or a community Discord, in your own words:\n\n**“I just finished my first ML project: forecasting daily drink sales at a market kiosk from weather and market days. A simple linear regression was off by about 6 bottles a day on held-out days, against 48 for guessing the average, and it beat a random forest on this small dataset. Biggest lesson: always check a baseline. Demo: [link] · Code: [link]. Feedback welcome!”**\n\nWhat you built, the honest result, one lesson learned, links, an invitation. Small and real beats big and vague.',
        },
        {
          type: 'multi',
          eyebrow: 'The whole course',
          prompt: 'Which can you now do?',
          options: [
            { text: 'Explain features, labels, training, loss and gradient descent in plain words', correct: true, why: '**Yes:** Chapters 1 and 4.' },
            { text: 'Load, clean, explore and model a table of data in Python', correct: true, why: '**Yes:** Chapters 2 to 6.' },
            { text: 'Test a model honestly and choose the right score', correct: true, why: '**Yes:** Chapter 5.' },
            { text: 'Explain neural networks, embeddings, attention and how LLMs are built and checked', correct: true, why: '**Yes:** Chapters 7 to 9.' },
            { text: 'Ask good questions about data, fairness and evidence at any talk', correct: true, why: '**Yes:** Chapters 10 and 11.' },
            { text: 'Set up Python, VS Code, notebooks and GitHub on your own PC', correct: true, why: '**Yes:** Chapter 12.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Where next',
          title: 'Keep going',
          body: 'You have the foundations and the vocabulary. Good next steps:\n\n**Practise:** a Kaggle beginner competition (Titanic), then one on a topic you care about.\n**Go deeper:** fast.ai’s free “Practical Deep Learning” course; Andrew Ng’s Machine Learning Specialization; Andrej Karpathy’s “Neural Networks: Zero to Hero” videos (you’ll build a small GPT).\n**Belong:** join an IndabaX, Data Science Nigeria or Masakhane event, and post your capstone.\n\nRead a little, build a lot, and share what you learn.',
        },
        {
          type: 'finish',
          title: 'You finished Introduction to Machine Learning.',
          body: 'From your first `print` to training models, reading papers and presenting results. Welcome to the conversation.',
        },
      ],
    },
  ],
};
