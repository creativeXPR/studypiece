// SPO 101 · Setting up your own PC · Lesson 1: what installing Python means, the terminal explained
// from zero, installing on Windows (the PATH box), Mac and Linux, and checking it works.

export default {
  id: 'install-python',
  title: 'Installing Python',
  covers: 'What an installation is, the terminal, installing Python on Windows, Mac and Linux, checking the version, running a file',
  minutes: 14,
  sections: [
    {
      name: 'Before you start',
      terms: [
        ['Terminal', 'A window where you type commands to the computer instead of clicking. Also called the command line, Command Prompt or PowerShell on Windows.'],
        ['Command', 'One instruction typed in the terminal, run by pressing Enter.'],
        ['Folder (directory)', 'A place on the computer that holds files. The terminal is always “in” one folder.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'In the mock talk, why was testing only on the same 25 shops a concern?',
          options: [
            { text: 'New shops and cities may write differently, so the 94% might not carry over', correct: true, why: 'Test data should look like where the model will be used.' },
            { text: '25 is an unlucky number', why: 'The issue is representativeness.' },
            { text: 'Testing is unnecessary', why: 'Testing is essential.' },
            { text: 'The model was too small', why: 'Size wasn’t the issue raised.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 12 · Your own PC',
          title: 'Moving out of the browser',
          body: 'So far, Python ran inside this app. For real projects you’ll want it on your own computer: it’s faster, works offline, and can open your own files.\n\n**Installing** Python means downloading the Python program and putting it on your computer so other programs (and you) can use it. It is free and takes about ten minutes.\n\nYou need a **laptop or desktop** (Windows, Mac or Linux). Phones aren’t suitable; for those, Google Colab (Lesson 4) runs in the browser.',
        },
        {
          type: 'story',
          eyebrow: 'A new window',
          title: 'Meet the terminal',
          body: 'Programmers often control the computer by **typing** instead of clicking, in a window called the ==terminal==.\n\nYou type a ==command== and press **Enter**; the computer runs it and prints a reply below. Then it waits for the next command.\n\n**Windows:** press the Windows key, type `cmd` (Command Prompt) or `PowerShell`, press Enter.\n**Mac:** press Cmd + Space, type `Terminal`, press Enter.\n**Linux:** press Ctrl + Alt + T.\n\nIt looks plain and old-fashioned. That’s fine: you only need a handful of commands.',
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'You type a command in the terminal. What runs it?',
          options: [
            { text: 'Pressing Enter', correct: true, why: 'Type, press Enter, read the reply.' },
            { text: 'Clicking on it', why: 'The terminal works by keyboard.' },
            { text: 'It runs while you type', why: 'Nothing happens until you press Enter.' },
            { text: 'Closing the window', why: 'That would stop it.' },
          ],
        },
      ],
    },
    {
      name: 'Install and check',
      terms: [
        ['PATH', 'The list of folders where the computer looks for programs when you type their name in the terminal.'],
        ['Version', 'Which release of Python you have, such as 3.12.4. Use Python 3.10 or newer.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Windows',
          prompt: 'Installing Python on Windows, in order:',
          items: [
            'Go to python.org, open Downloads and download the latest Python 3 for Windows',
            'Open the downloaded installer',
            'On the first screen, tick “Add python.exe to PATH” at the bottom',
            'Click “Install Now” and wait for it to finish',
            'Open a new Command Prompt and type `python --version`',
          ],
          explain: 'The PATH tick box is the step most people miss. Without it, typing `python` in the terminal gives “not recognized”. If that happens, run the installer again, choose Modify, and tick the box (or use the `py` command, which also works on Windows).',
        },
        {
          type: 'reveal',
          eyebrow: 'Mac and Linux',
          title: 'Other systems',
          cards: [
            { title: 'Mac', text: 'Download the macOS installer from python.org and run it. In Terminal, the command is `python3` (not `python`): type `python3 --version`.' },
            { title: 'Linux', text: 'Python 3 is usually already installed. Check with `python3 --version`. On Ubuntu, add the extras with `sudo apt install python3-pip python3-venv`.' },
            { title: 'What success looks like', text: 'The terminal replies with something like `Python 3.12.4`. Any version from 3.10 up is fine for this course.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Your first file',
          title: 'Running a program from a file',
          body: 'In this app you typed code into a box. On your PC, code lives in **files** ending in `.py`.\n\n**1.** Make a folder, for example `ml-projects`, in your Documents.\n**2.** Inside it, create a file called `hello.py` containing `print("Hello from my own computer!")` (the next lesson sets up a proper editor for this).\n**3.** In the terminal, move into the folder with `cd`, short for “change directory”:\n\n`cd Documents/ml-projects`\n\n**4.** Run the file:\n\n`python hello.py`\n\n(On Mac and Linux: `python3 hello.py`.)',
        },
        {
          type: 'choice',
          eyebrow: 'Troubleshoot',
          prompt: 'On Windows you type `python --version` and get “python is not recognized as an internal or external command”. Most likely cause?',
          options: [
            { text: 'Python isn’t on the PATH: the “Add python.exe to PATH” box wasn’t ticked', correct: true, why: 'Rerun the installer, choose Modify, tick it; or try `py --version`. Then open a **new** terminal window.' },
            { text: 'Your computer is too old', why: 'It’s a settings issue, not age.' },
            { text: 'You need to buy Python', why: 'Python is free.' },
            { text: 'You must type it in capitals', why: 'Commands are lowercase.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'The terminal says it can’t find `hello.py`, but the file exists. What’s the likely problem?',
          options: [
            { text: 'The terminal is in a different folder: `cd` into the folder that holds the file first', correct: true, why: 'The terminal looks for files in its current folder.' },
            { text: 'Python is broken', why: 'Python ran, but couldn’t find the file where it looked.' },
            { text: 'The file must be called `hello.txt`', why: 'Python files end in `.py`.' },
            { text: 'Files can’t be run from the terminal', why: 'That’s exactly how they are run.' },
          ],
        },
        {
          type: 'finish',
          title: 'Python is on your computer.',
          body: 'The terminal, installing, checking the version, and running a file. Next: a proper code editor, VS Code.',
        },
      ],
    },
  ],
};
