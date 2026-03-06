/* ─── Language Toggle ─────────────────────────────────────────── */

let currentLang = 'en';

function setLang(lang) {
  currentLang = lang;

  // Update all translated elements
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.en;
  });

  // Update button states
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
  document.getElementById('btn-es').setAttribute('aria-pressed', lang === 'es');

  // Update <html lang>
  document.documentElement.lang = lang;

  // Persist in URL hash (enables shareable links)
  history.replaceState(null, '', lang === 'en' ? '#' : '#' + lang);
}

// Read hash on load
(function init() {
  const hash = location.hash.replace('#', '').toLowerCase();
  if (hash === 'es') {
    setLang('es');
  } else {
    setLang('en');
  }
})();

/* ─── Countdown ───────────────────────────────────────────────── */

(function initCountdown() {
  const wedding = new Date('2027-02-22T00:00:00');
  const el = document.getElementById('countdown');

  function render() {
    const now = new Date();
    // Compare calendar dates only (ignore time-of-day)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(wedding.getFullYear(), wedding.getMonth(), wedding.getDate());
    const diff = Math.round((target - today) / 86400000);

    if (diff < 0) {
      // Wedding has passed — hide the element entirely
      el.hidden = true;
    } else if (diff === 0) {
      el.dataset.en = 'Today';
      el.dataset.es = 'Hoy';
      el.textContent = currentLang === 'es' ? 'Hoy' : 'Today';
    } else {
      el.dataset.en = `${diff} days away`;
      el.dataset.es = `${diff} días`;
      el.textContent = currentLang === 'es' ? `${diff} días` : `${diff} days away`;
    }
  }

  render();
})();

/* ─── Calendar Helpers ────────────────────────────────────────── */

const EVENT = {
  title:    "Morgan & Juanma's Wedding",
  date:     '20270222',          // YYYYMMDD (all-day)
  dateEnd:  '20270223',          // exclusive end for all-day ICS events
  location: 'Convento Santa Clara, 2nd Avenue North and 2nd Street East, Antigua, Antigua Guatemala, Guatemala',
  description: 'Formal invitation and details to follow.',
};

function buildICS() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Morgan & Juanma//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${EVENT.date}`,
    `DTEND;VALUE=DATE:${EVENT.dateEnd}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${EVENT.location}`,
    `DESCRIPTION:${EVENT.description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

function downloadICS(filename) {
  const ics = buildICS();
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function addToGoogle() {
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     EVENT.title,
    dates:    `${EVENT.date}/${EVENT.dateEnd}`,
    location: EVENT.location,
    details:  EVENT.description,
    sf:       'true',
    output:   'xml',
  });
  window.open(`https://calendar.google.com/calendar/r/eventedit?${params}`, '_blank', 'noopener');
}

function addToApple() {
  downloadICS('morgan-juanma-wedding.ics');
}

function addToOutlook() {
  downloadICS('morgan-juanma-wedding.ics');
}

/* ─── Optional Hero Image ────────────────────────────────────── */
// To enable the hero photo, set HERO_SRC to the image path or URL.
// Leave as empty string to hide it.
const HERO_SRC = 'ProposalHydra0062.JPG';

(function initHero() {
  if (!HERO_SRC) return;
  const figure = document.getElementById('hero');
  const img    = document.getElementById('hero-img');
  img.src      = HERO_SRC;
  figure.hidden = false;
  figure.removeAttribute('aria-hidden');
})();
