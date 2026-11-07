// SPO 101 · Setting up your own PC · Lesson 5: version control. What Git does, commits, GitHub,
// the first push, .gitignore, README files, and the easier click-based route in VS Code.

export default {
  id: 'git-github',
  title: 'Git and GitHub',
  covers: 'Version control, commits, GitHub repositories, pushing code, .gitignore, README files, using Git from VS Code',
  minutes: 14,
  sections: [
    {
      name: 'Saving history',
      terms: [
        ['Git', 'A version-control tool: it records snapshots of your project so you can see changes and go back.'],
        ['Repository (repo)', 'A project folder tracked by Git, with its full history.'],
        ['Commit', 'One saved snapshot, with a short message describing the change.'],
      ],
      screens: [
        {
          type: 'choice',
          eyebrow: 'Quick recall',
          prompt: 'How do you get a free GPU in Google Colab?',
          options: [
            { text: 'Runtime → Change runtime type → choose a GPU', correct: true, why: 'Within the free limits.' },
            { text: 'Buy a graphics card', why: 'Colab lends you one in the cloud.' },
            { text: 'Install CUDA on your phone', why: 'Not needed: it all runs in Google’s data centre.' },
            { text: 'It isn’t possible', why: 'Colab offers free GPU time.' },
          ],
        },
        {
          type: 'story',
          eyebrow: 'Chapter 12 · Lesson 5',
          title: '`final_v2_REAL_final.py`',
          body: 'Without a system, projects become a mess of copies: `kiosk.py`, `kiosk_old.py`, `kiosk_final_v2.py`. Which one worked?\n\n==Git== solves this. It records **snapshots** of your project, called ==commits==, each with a message like “add rain feature”. You can see what changed, when and why, and go back to any snapshot.\n\nAlmost every software and ML team uses Git.',
        },
        {
          type: 'order',
          eyebrow: 'First time',
          prompt: 'Setting up Git and making a first commit (in the terminal, inside your project folder):',
          items: [
            'Install Git from git-scm.com (accept the defaults)',
            'Tell Git who you are: `git config --global user.name "Your Name"` and the same with `user.email`',
            'Start tracking the folder: `git init`',
            'Choose what to save: `git add .` (the dot means “everything here”)',
            'Save the snapshot: `git commit -m "First version of kiosk model"`',
          ],
          explain: 'After this, the everyday loop is just: change files → `git add .` → `git commit -m "what changed"`.',
        },
        {
          type: 'story',
          eyebrow: 'What not to save',
          title: '.gitignore',
          body: 'Some things shouldn’t go into Git: the `.venv` folder (large, rebuildable), big data files, and **secrets** like passwords or API keys.\n\nList them in a file named `.gitignore` in the project folder, one per line:\n\n`.venv/`\n`data/raw/`\n`.env`\n\nGit then ignores them. Never commit a password or API key: once pushed to GitHub, consider it leaked and change it.',
        },
      ],
    },
    {
      name: 'Sharing on GitHub',
      terms: [
        ['GitHub', 'A website that hosts Git repositories online, for backup, sharing and collaboration.'],
        ['Push', 'Sending your commits from your computer up to GitHub.'],
        ['README', 'The front page of a repository (`README.md`): what the project is, how to run it, results.'],
      ],
      screens: [
        {
          type: 'order',
          eyebrow: 'Put it online',
          prompt: 'Publishing your project on GitHub, in order:',
          items: [
            'Create a free account at github.com',
            'Click New repository, give it a name (e.g. `kiosk-forecast`), and create it without adding files',
            'Copy the commands GitHub shows under “push an existing repository”',
            'Paste them in your terminal: they link your folder to GitHub (`git remote add origin ...`) and push',
            'Refresh the page: your files and history are online',
          ],
          explain: 'GitHub will ask you to sign in the first time you push; follow the browser prompt.',
        },
        {
          type: 'story',
          eyebrow: 'The easy way',
          title: 'Git without typing',
          body: 'VS Code has Git built in: the **Source Control** icon on the left (a branching line) shows changed files. Type a message, click **Commit**, then **Sync Changes** to push. “Publish to GitHub” can even create the repository for you.\n\nGitHub Desktop is another click-based option. Use whichever you like; the ideas (commit, push) are the same.',
        },
        {
          type: 'reveal',
          eyebrow: 'Your project’s front page',
          title: 'What a good README contains',
          cards: [
            { title: 'What and why', text: '“Forecasts daily drink sales at a market kiosk from weather and market days, to reduce sell-outs.”' },
            { title: 'How to run it', text: '`pip install -r requirements.txt` then `python train.py`.' },
            { title: 'Results, honestly', text: '“Test MAE 5.9 bottles (6 held-out days) versus 47.6 for an always-average baseline.”' },
            { title: 'Limits and next steps', text: '“Only 30 days of data from one kiosk; untested in the rainy season.”' },
          ],
        },
        {
          type: 'choice',
          eyebrow: 'Check yourself',
          prompt: 'You accidentally committed and pushed a file containing an API key. What should you do first?',
          options: [
            { text: 'Revoke the key and create a new one, then remove it from the code and add the file to .gitignore', correct: true, why: 'Deleting the file later doesn’t remove it from the history, and bots scan GitHub for keys within minutes. The key must be replaced.' },
            { text: 'Delete the file and push again; that’s enough', why: 'The key is still in the history.' },
            { text: 'Make the repository name less obvious', why: 'The key is still public.' },
            { text: 'Nothing: nobody reads new repositories', why: 'Automated scanners do, quickly.' },
          ],
        },
        {
          type: 'finish',
          title: 'Your setup is complete.',
          body: 'Python, VS Code, packages, notebooks, Git and GitHub: the same toolkit professionals use. Last chapter: your capstone project.',
        },
      ],
    },
  ],
};
