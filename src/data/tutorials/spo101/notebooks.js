// SPO 101 · Setting up your own PC · Lesson 4: notebooks. Cells and outputs, Jupyter in VS Code,
// Google Colab in the browser with a free GPU, and when to use notebooks versus .py files.

export default {
  id: 'notebooks',
  title: 'Notebooks and Colab',
  covers: 'Notebooks and cells, Jupyter in VS Code, Google Colab and free GPUs, Kaggle notebooks, notebooks versus scripts',
  minutes: 11,
  sections: [
    {
      name: 'Code in cells',
      terms: [
        ['Notebook', 'A document mixing code cells, their outputs (tables, charts) and notes. Files end in `.ipynb`.'],
        ['Jupyter', 'The open-source notebook system. “Jupyter notebook” is the standard format.'],
        ['Kernel', 'The running Python behind a notebook; it remembers variables between cells.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'What is a virtual environment for?',
          options: [
            { text: 'Giving each project its own private set of packages', correct: true, why: 'So projects needing different versions don’t break each other.' },
            { text: 'Running Python in the cloud', why: 'It lives in your project folder on your PC.' },
            { text: 'Making code run faster', why: 'It’s about keeping packages separate.' },
            { text: 'Hiding your code', why: 'It doesn’t hide anything.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 12 · Lesson 4',
          title: 'You’ve been using notebooks already',
          body: 'The code screens in this course worked like a ==notebook==: small pieces of code you run one at a time, each with its output right below, and later pieces remembering earlier variables.\n\nReal notebooks (==Jupyter== notebooks, files ending in `.ipynb`) add notes, tables and charts in between. Data scientists use them for exploring data and sharing analyses, and most tutorials and Kaggle solutions are notebooks.',
        },
        {
          type: 'reveal',
          eyebrow: 'Three ways to use notebooks',
          title: 'Pick one',
          cards: [
            { title: 'In VS Code', text: 'Install the **Jupyter** extension, create a file ending in `.ipynb`, choose your `.venv` as the kernel, and run cells with Shift + Enter.' },
            { title: 'Google Colab', text: 'colab.research.google.com: notebooks in the browser with a Google account. Nothing to install, pandas and scikit-learn included, works on low-end laptops.' },
            { title: 'Kaggle notebooks', text: 'Built into Kaggle, next to its datasets and competitions, also with free GPU time each week.' },
          ],
        },
      ],
    },
    {
      name: 'Free GPUs and good habits',
      terms: [
        ['Runtime', 'In Colab, the computer your notebook runs on. You can switch it to one with a GPU.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Borrowed power',
          title: 'A GPU for free',
          body: 'Training neural networks needs a GPU, which most laptops lack. Colab lends you one: **Runtime → Change runtime type → choose a GPU** (such as “T4 GPU”) → Save.\n\nFree GPU time has limits, and the session resets after a while of inactivity, so **save your work to Google Drive** or download it. Files you upload to a Colab session disappear when it ends.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'In a notebook, cell 3 uses a variable made in cell 2. You restart the kernel and run only cell 3. What happens?',
          options: [
            { text: 'An error: after a restart the kernel has forgotten everything, so run cell 2 first', correct: true, why: 'Restarting clears memory. A good habit: “Restart and Run All” to check the notebook works top to bottom.' },
            { text: 'It works: notebooks remember forever', why: 'The memory lives in the kernel, which restarting clears.' },
            { text: 'Cell 2 runs automatically', why: 'Cells run only when you run them.' },
            { text: 'The notebook is deleted', why: 'The file stays; only memory is cleared.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Choosing',
          prompt: 'When is a `.py` file better than a notebook?',
          options: [
            { text: 'For code that must run reliably again and again, such as an app or a training script', correct: true, why: 'Notebooks are great for exploring and explaining; scripts are better for reusable, tested, version-controlled code.' },
            { text: 'Never', why: 'Professional projects use both.' },
            { text: 'Only on Mac', why: 'Both work everywhere.' },
            { text: 'When you want charts', why: 'Charts are a notebook strength.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Try it',
          title: 'Your first Colab notebook',
          body: '**1.** Open colab.research.google.com and choose “New notebook”.\n**2.** In the first cell type `print("Hello from Colab")` and press Shift + Enter.\n**3.** In a new cell, paste Ade’s month lists from Chapter 3 and build the DataFrame.\n**4.** Run `df.plot.scatter(x="temp", y="bottles")`: a real chart appears below.\n**5.** File → Save a copy in Drive.\n\nYou now have a free, GPU-capable lab in your browser.',
        },
        {
          type: 'finish',
          title: 'You can work in notebooks.',
          body: 'Jupyter, Colab, kernels and free GPUs. Last setup step: saving and sharing your work with Git and GitHub.',
        },
      ],
    },
  ],
};
