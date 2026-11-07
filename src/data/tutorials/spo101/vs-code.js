// SPO 101 · Setting up your own PC · Lesson 2: VS Code. What an editor is, installing it and the
// Python extension, opening a folder, writing and running a file, the built-in terminal, getting
// unstuck with error messages.

export default {
  id: 'vs-code',
  title: 'VS Code',
  covers: 'Code editors, installing VS Code and the Python extension, folders and files, running code, the built-in terminal, choosing the interpreter',
  minutes: 12,
  sections: [
    {
      name: 'An editor for code',
      terms: [
        ['Code editor', 'A program for writing code, with colours, suggestions and error highlighting. Like a word processor for programs.'],
        ['VS Code', 'Visual Studio Code: a free, very popular code editor from Microsoft, for Windows, Mac and Linux.'],
        ['Extension', 'An add-on that teaches VS Code new skills, such as understanding Python.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'Which command checks which Python version is installed (on Windows)?',
          options: [
            { text: '`python --version`', correct: true, why: 'On Mac and Linux, `python3 --version`.' },
            { text: '`print(version)`', why: 'That is Python code, not a terminal command.' },
            { text: '`cd python`', why: '`cd` changes folder.' },
            { text: '`install python`', why: 'Not a real command.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 12 · Lesson 2',
          title: 'Why not Notepad?',
          body: 'You could write `.py` files in Notepad, but a ==code editor== helps enormously: it colours the code so it’s easy to read, suggests names as you type, underlines mistakes before you run, and runs your program with one click.\n\n==VS Code== is free and used by a large share of programmers worldwide.',
        },
        {
          type: 'order',
          eyebrow: 'Install it',
          prompt: 'Setting up VS Code for Python, in order:',
          items: [
            'Download VS Code from code.visualstudio.com and install it (accept the defaults)',
            'Open VS Code and click the Extensions icon on the left (four small squares), or press Ctrl + Shift + X',
            'Search for “Python” and install the one published by Microsoft',
            'Choose File → Open Folder, and open your `ml-projects` folder',
          ],
          explain: 'Always open a **folder**, not a single file: your project’s files, data and settings live together there.',
        },
      ],
    },
    {
      name: 'Write and run',
      terms: [
        ['Interpreter', 'The Python program that actually runs your code. VS Code needs to know which one to use.'],
        ['Integrated terminal', 'A terminal inside VS Code, already in your project folder. Open it with Terminal → New Terminal.'],
      ],
      screens: [
        {
          type: 'reveal',
          eyebrow: 'Around the window',
          title: 'The parts of VS Code',
          cards: [
            { title: 'Explorer (left)', text: 'Your folder’s files. The “new file” icon at the top creates one: name it `kiosk.py`.' },
            { title: 'Editor (middle)', text: 'Where you type. Unsaved files show a dot on their tab; save with Ctrl + S (Cmd + S on Mac).' },
            { title: 'Run button (top right)', text: 'The ▷ triangle runs the current Python file. The output appears in the terminal below.' },
            { title: 'Terminal (bottom)', text: 'Terminal → New Terminal opens one already inside your folder. You’ll use it to install packages.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Try it on your PC',
          title: 'Ade’s first file',
          body: 'Create `kiosk.py`, type this, save, and press ▷:\n\n`temps = [26, 30, 34]`\n`for t in temps:`\n`    print(t, "degrees: guess", 10 * (t - 25))`\n\nYou should see three lines of output in the terminal panel. Everything you learned in this course works the same on your own computer.',
        },
        {
          type: 'choice',
          eyebrow: 'Troubleshoot',
          prompt: 'VS Code says “Select a Python interpreter” or runs the wrong Python. What do you do?',
          options: [
            { text: 'Press Ctrl + Shift + P, type “Python: Select Interpreter”, and pick your installed Python', correct: true, why: 'This tells VS Code which Python to use. You’ll do it again for each virtual environment (next lesson).' },
            { text: 'Reinstall Windows', why: 'Far too drastic: just select the interpreter.' },
            { text: 'Rename the file to `.txt`', why: 'It must stay `.py`.' },
            { text: 'Uninstall VS Code', why: 'It only needs to be told which Python to use.' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'You changed `kiosk.py` and pressed ▷, but the output didn’t change. Most likely?',
          options: [
            { text: 'The file wasn’t saved: look for the dot on its tab and press Ctrl + S', correct: true, why: 'Unsaved changes aren’t in the file yet. (You can switch on File → Auto Save.)' },
            { text: 'Python caches old results forever', why: 'It runs the saved file each time.' },
            { text: 'The ▷ button only works once', why: 'It works every time.' },
            { text: 'You must restart the computer', why: 'Just save.' },
          ],
        },
        {
          type: 'finish',
          title: 'You have a real coding setup.',
          body: 'VS Code, the Python extension, folders, running files and the terminal. Next: installing libraries like pandas, the tidy way.',
        },
      ],
    },
  ],
};
