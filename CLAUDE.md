# CLAUDE.md — wedding site (amorenruinas.com)

Live wedding website served by GitHub Pages from `main` — guests are actively using it,
and pushing to main publishes immediately. Treat every push as a production deploy.
(`vercel.json` is an empty leftover; GitHub Pages is the real host.)

- **Never edit the root HTML/CSS/JS directly.** Stage all changes in `edits/` (parallel
  copies of the site files), let JM review, then promote to root in a
  "Promote edits to live" commit.
- **Always give JM the simplest way to see a change without touching production.**
  Default to a local preview and hand him the command or the opened page. Never deploy
  anywhere — GitHub Pages or Vercel — just so he can look at something. Deploying is a
  separate step that needs an explicit go-ahead.
  - For the main site, the local preview is `open edits/index.html`, or
    `python3 -m http.server -d edits 8000` for a real server at
    http://localhost:8000. `edits/imgs` and `edits/favicon.svg` are gitignored
    symlinks to the root copies so `edits/` renders standalone; recreate them with
    `cd edits && ln -sfn ../imgs imgs && ln -sfn ../favicon.svg favicon.svg`.
- Content is bilingual (EN/ES). Any copy change must be applied in both languages —
  check for the paired string before considering an edit done.
