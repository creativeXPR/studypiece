// SPO 101 · Setting up your own PC · Lesson 3: packages and environments. pip, virtual environments
// (why, create, activate), installing the ML libraries, and requirements.txt.

export default {
  id: 'packages',
  title: 'Packages and environments',
  covers: 'pip, installing pandas and scikit-learn, virtual environments, activating them, requirements.txt',
  minutes: 13,
  sections: [
    {
      name: 'Installing libraries',
      terms: [
        ['pip', 'Python’s package installer. `pip install pandas` downloads and installs pandas.'],
        ['PyPI', 'The Python Package Index: the online store (free) that pip downloads packages from.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In VS Code, why open a whole folder rather than one file?',
          options: [
            { text: 'A project’s files, data and settings live together in its folder', correct: true, why: 'VS Code, the terminal and Python all work relative to that folder.' },
            { text: 'VS Code can’t open single files', why: 'It can, but folders work better for projects.' },
            { text: 'Folders run faster', why: 'Speed isn’t the reason.' },
            { text: 'It hides your files', why: 'It shows them in the Explorer.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 12 · Lesson 3',
          title: 'Libraries don’t come with Python',
          body: 'In this app, pandas and scikit-learn were loaded for you. On your PC, you install them with ==pip==, Python’s package installer, typed in the terminal:\n\n`pip install pandas scikit-learn matplotlib`\n\npip downloads them from ==PyPI==, a free public store of over half a million Python packages, and installs them. Then `import pandas as pd` works in your files.\n\n(On Mac and Linux, use `pip3`, or `python3 -m pip install ...`.)',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'Your file says `import pandas as pd`, and running it gives `ModuleNotFoundError: No module named \'pandas\'`. What fixes it?',
          options: [
            { text: 'Run `pip install pandas` in the terminal (in the right environment)', correct: true, why: 'The library isn’t installed where this Python looks for it.' },
            { text: 'Change it to `import Pandas`', why: 'Names are lowercase; the problem is that it isn’t installed.' },
            { text: 'Delete the import line', why: 'Then every `pd.` line fails.' },
            { text: 'Restart the computer', why: 'Installing is what’s needed.' },
          ],
        },
      ],
    },
    {
      name: 'Virtual environments',
      terms: [
        ['Virtual environment', 'A private set of installed packages for one project, so projects don’t interfere with each other.'],
        ['Activate', 'Switching the terminal into a virtual environment, so `python` and `pip` use that project’s packages.'],
        ['requirements.txt', 'A file listing a project’s packages, so anyone can install the same set with one command.'],
      ],
      screens: [
        {
          type: 'story',
          eyebrow: 'Keeping projects apart',
          title: 'One toolbox per project',
          body: 'Imagine two projects: an old one needing pandas version 1, a new one needing version 2. Installed globally, only one version can exist, and one project breaks.\n\nA ==virtual environment== is a private toolbox for one project: its own Python packages, kept inside the project folder in a sub-folder usually called `.venv`. Professionals make one for every project.',
        },
        {
          type: 'order',
          eyebrow: 'The routine',
          prompt: 'Setting up a new project’s environment, in order (in VS Code’s terminal, inside the project folder):',
          items: [
            'Create it: `python -m venv .venv`',
            'Activate it: `.venv\\Scripts\\activate` on Windows, or `source .venv/bin/activate` on Mac and Linux',
            'Check the prompt now starts with `(.venv)`',
            'Install the project’s packages: `pip install pandas scikit-learn`',
            'In VS Code, select the `.venv` interpreter (Ctrl + Shift + P → Python: Select Interpreter)',
          ],
          explain: 'If PowerShell refuses to run the activate script, switch VS Code’s terminal to **Command Prompt** (the ∨ arrow next to the + in the terminal panel) and activate there.',
        },
        {
          type: 'story',
          eyebrow: 'Sharing the recipe',
          title: 'requirements.txt',
          body: 'To let someone else (or future you) rebuild your environment, save the list of packages:\n\n`pip freeze > requirements.txt`\n\nThis writes every installed package and its version into a file. Anyone can then run:\n\n`pip install -r requirements.txt`\n\nand get the same toolbox. Put `requirements.txt` in your project, but **not** the `.venv` folder itself: it’s large and easy to rebuild.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'You open a new terminal and `import sklearn` fails, though you installed it yesterday. Most likely?',
          options: [
            { text: 'The virtual environment isn’t activated in this new terminal', correct: true, why: 'Activation lasts only for that terminal session. Activate again (VS Code often does it for you once the interpreter is selected).' },
            { text: 'Packages expire after a day', why: 'They stay installed.' },
            { text: 'scikit-learn was deleted', why: 'It’s still in `.venv`; the terminal is just using a different Python.' },
            { text: 'You need a new computer', why: 'Just activate the environment.' },
          ],
        },
        {
          type: 'finish',
          title: 'You can manage packages.',
          body: 'pip, PyPI, virtual environments and requirements.txt. Next: notebooks, on your PC and free in the cloud.',
        },
      ],
    },
  ],
};
