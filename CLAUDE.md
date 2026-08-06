# CLAUDE.md — wedding site (amorenruinas.com)

Live wedding website served by GitHub Pages from `main` — guests are actively using it,
and pushing to main publishes immediately. Treat every push as a production deploy.
(`vercel.json` is an empty leftover; GitHub Pages is the real host.)

- **Never edit the root HTML/CSS/JS directly.** Stage all changes in `edits/` (parallel
  copies of the site files), let JM review, then promote to root in a
  "Promote edits to live" commit.
- Content is bilingual (EN/ES). Any copy change must be applied in both languages —
  check for the paired string before considering an edit done.
