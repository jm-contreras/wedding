# Save the Date — Site Spec

## Overview

A static single-page site announcing Morgan & Juanma's wedding. Bilingual (English/Spanish). Hosted on GitHub Pages. No frameworks — plain HTML, CSS, and vanilla JS.

## Content

### English

> **Save the Date**
>
> **Morgan & Juanma**
>
> Monday, February 22, 2027
> Antigua, Guatemala
>
> We're celebrating our wedding surrounded by ruins, volcanoes, and the people we love most. Formal invitation and travel details to follow.
>
> [Add to Google Calendar] [Add to Apple Calendar] [Add to Outlook]

### Spanish

> **Reserva la Fecha**
>
> **Morgan & Juanma**
>
> Lunes 22 de febrero de 2027
> Antigua, Guatemala
>
> Celebraremos nuestra boda rodeados de ruinas, volcanes y las personas que más queremos. La invitación formal y los detalles de viaje vendrán pronto.
>
> [Agregar a Google Calendar] [Agregar a Apple Calendar] [Agregar a Outlook]

## Features

### Language Toggle
- "EN | ES" text toggle in the top-right corner
- Default language: English
- Toggles all page text simultaneously
- No flag icons (flags represent countries, not languages — three countries in play here)
- Persist selection via URL hash (e.g., `#es`) so links can be shared in either language

### Add to Calendar
- Three buttons: Google Calendar, Apple Calendar, Outlook
- Google Calendar: opens a `calendar.google.com/calendar/r/eventedit` URL with prefilled params
- Apple Calendar / Outlook: generates and downloads a `.ics` file
- Calendar event details:
  - **Title**: "Morgan & Juanma's Wedding"
  - **Date**: Monday, February 22, 2027
  - **Location**: Santa Clara ruins, Antigua, Guatemala
  - **Description**: "Formal invitation and details to follow."
  - **All-day event**: Yes

### Optional: Hero Image
- Support an optional hero image (photo of the couple) at the top
- If no image is provided, the layout should still look complete without it

## Design Direction

### Visual Style
- Warm earth tones: terracotta (#C2703E), sage (#9CAF88), cream (#F5F0E8), gold (#C9A84C)
- Background: cream or warm off-white
- Text: dark warm gray or charcoal — not pure black
- Clean, generous whitespace — let the simplicity do the work
- Semi-formal but not stiff

### Typography
- Use a clean serif for the couple's names (e.g., Playfair Display, Cormorant Garamond)
- Use a clean sans-serif for body text and buttons (e.g., Inter, Source Sans Pro)
- Import from Google Fonts

### Layout
- Mobile-first, fully responsive
- Centered single-column layout
- Content vertically centered on viewport (or near-centered with breathing room)
- Calendar buttons styled consistently, not default browser buttons
- Language toggle is unobtrusive but clearly visible

### Animation
- Minimal. A subtle fade-in on load is fine. No parallax, no scroll effects, no confetti.

## Technical Notes

- Static site: `index.html` + optional `style.css` and `script.js` (or all inline — builder's choice)
- No build step, no bundler, no framework
- Host on GitHub Pages from `main` branch, root directory
- All assets (fonts, etc.) loaded from CDNs — no local dependencies
- Semantic HTML
- Accessible: proper contrast ratios, alt text on images, keyboard-navigable toggle and buttons

## What This Site Is NOT

- Not the wedding website — no RSVP, no travel info, no schedule, no registry
- No branding (no "Amor Entre Ruinas" name, no monogram, no chapter titles — save that for later)
- No analytics or tracking (unless you want to add later)

## Repo & File Structure

This is the wedding website repo — the save-the-date is the first version of the site. It will evolve to include RSVP, travel info, schedule, etc. Name the repo accordingly (e.g., `wedding`, `amor-entre-ruinas`, or whatever you want the GitHub Pages URL slug to be).

```
[repo-name]/
├── index.html
├── style.css (optional, can be inline)
├── script.js (optional, can be inline)
└── README.md
```

Future pages (travel, RSVP, schedule) can be added as separate HTML files or sections within index.html. No need to plan that architecture now — just be aware this repo is the long-term home.

## Distribution Plan (Not Part of the Site Build)

- **Digital**: Text or WhatsApp most guests a short message + link. Email as fallback.
- **Physical cards** (~20-30 households): Immediate family on both sides. Same copy as the site. Include QR code linking to the site. Design in Canva or similar, print via Minted/Artifact Uprising/local shop.
- **Message templates**:
  - EN: "We're getting married! Monday, February 22, 2027 in Antigua, Guatemala. Save the date — formal invitation and details to follow. [link]"
  - ES: "¡Nos casamos! Lunes 22 de febrero de 2027 en Antigua, Guatemala. Reserva la fecha — la invitación formal viene pronto. [link]"
