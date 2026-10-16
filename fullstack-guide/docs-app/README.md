# Docs app (built from the template)

A minimal Google Docs–style app: a sidebar of your documents and a page you type on, with autosave.

What changed compared with `../template`:

- `index.html`: the `#app-view` section now has a sidebar (`#doc-list`) and an editor (`#title`, `#page`).
- `style.css`: a two-column grid and a white "paper" page.
- `app.js`: sections 1–5 are the template unchanged; section 6 creates, opens and autosaves documents.
- `firestore.rules`: the collection is called `docs` instead of `items`.

Run it: paste your config into `app.js`, then open `index.html` with VS Code's Live Server
(ES modules do not load from `file://`). Ctrl+B / Ctrl+I already work inside the page.
