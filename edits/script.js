/* ─── Language Toggle ─────────────────────────────────────────── */

let currentLang = 'en';

function setLang(lang, persistHash = false) {
  currentLang = lang;

  // Update all translated elements. Some data-* values contain inline
  // markup (<strong>, <em>), so use innerHTML when markup is present.
  // Content is static and author-controlled — no injection risk.
  document.querySelectorAll('[data-en]').forEach(el => {
    const val = el.dataset[lang] || el.dataset.en;
    if (val.includes('<')) el.innerHTML = val;
    else el.textContent = val;
  });

  // Update button states
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');
  document.getElementById('btn-es').setAttribute('aria-pressed', lang === 'es');

  // Update <html lang>
  document.documentElement.lang = lang;

  // Persist in URL hash (enables shareable links). Only do this on an
  // explicit user-driven toggle — never on page load or internal
  // re-renders, or it clobbers section anchors like #rsvp.
  if (persistHash) {
    history.replaceState(null, '', lang === 'en' ? '#' : '#' + lang);
  }
}

// Read hash on load
(function init() {
  const hash = location.hash.replace('#', '').toLowerCase();
  setLang(hash === 'es' ? 'es' : 'en');

  // If the hash points at a section (e.g. #rsvp from another page's nav),
  // scroll there once the page has fully loaded — the hero image and
  // schedule list render after this point and shift layout below them.
  if (hash && hash !== 'es') {
    window.addEventListener('load', () => {
      document.getElementById(hash)?.scrollIntoView({ block: 'start' });
    });
  }
})();

/* ─── Events Data Model ───────────────────────────────────────── */

const EVENTS = [
  {
    id: 'welcome',
    date: '20270221',
    dateEnd: '20270222',
    title_en: 'The Encounter',
    title_es: 'El Encuentro',
    subtitle_en: 'Welcome Cocktail',
    subtitle_es: 'Cóctel de Bienvenida',
    time_en: 'Evening',
    time_es: 'Por la noche',
    location_en: 'La Antigua, venue to be announced',
    location_es: 'La Antigua, lugar por anunciar',
    attire_en: 'Festive garden casual',
    attire_es: 'Casual festivo de jardín',
    description_en: 'A relaxed cocktail to welcome everyone arriving from afar.',
    description_es: 'Un cóctel relajado para dar la bienvenida a quienes llegan desde lejos.',
  },
  {
    id: 'wedding',
    date: '20270222',
    dateEnd: '20270223',
    title_en: 'By Fire',
    title_es: 'Por Fuego',
    subtitle_en: 'Wedding Ceremony, Dinner & Dancing',
    subtitle_es: 'Ceremonia de Boda, Cena y Baile',
    time_en: 'Afternoon into night',
    time_es: 'Desde la tarde hasta la noche',
    location_en: 'Ruins of the Convent of Santa Clara, La Antigua',
    location_es: 'Las Ruinas del Convento de Santa Clara, La Antigua',
    attire_en: 'Festive garden cocktail',
    attire_es: 'Cóctel festivo de jardín',
    description_en: 'A ceremony at the Santa Clara ruins, followed by cocktails, dinner, and dancing late into the night.',
    description_es: 'Una ceremonia en las Ruinas de Santa Clara, seguida de cóctel, cena y baile hasta entrada la noche.',
    isPrimary: true,
  },
  {
    id: 'brunch',
    date: '20270223',
    dateEnd: '20270224',
    title_en: 'The Beginning',
    title_es: 'El Principio',
    subtitle_en: 'Farewell Brunch',
    subtitle_es: 'Brunch de Despedida',
    time_en: 'Early afternoon',
    time_es: 'Primera hora de la tarde',
    location_en: 'La Antigua, venue to be announced',
    location_es: 'La Antigua, lugar por anunciar',
    attire_en: 'Casual',
    attire_es: 'Casual',
    description_en: 'Coffee, a traditional Guatemalan breakfast, and goodbyes before everyone heads home.',
    description_es: 'Café, desayuno guatemalteco tradicional y despedidas antes de que todos regresen a casa.',
  },
];

const PRIMARY_EVENT = EVENTS.find(e => e.isPrimary) || EVENTS[0];

function fmtDate(yyyymmdd, lang) {
  const y = +yyyymmdd.slice(0, 4);
  const m = +yyyymmdd.slice(4, 6) - 1;
  const d = +yyyymmdd.slice(6, 8);
  return new Date(y, m, d).toLocaleDateString(
    lang === 'es' ? 'es-ES' : 'en-US',
    { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
  );
}

/* ─── Countdown ───────────────────────────────────────────────── */

(function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  const y = +PRIMARY_EVENT.date.slice(0, 4);
  const m = +PRIMARY_EVENT.date.slice(4, 6) - 1;
  const d = +PRIMARY_EVENT.date.slice(6, 8);
  const wedding = new Date(y, m, d);

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.round((wedding - today) / 86400000);

  if (diff < 0) {
    el.hidden = true;
  } else if (diff === 0) {
    el.dataset.en = 'Today';
    el.dataset.es = 'Hoy';
    el.textContent = currentLang === 'es' ? 'Hoy' : 'Today';
  } else {
    const enText = diff === 1 ? '1 day away' : `${diff} days away`;
    const esText = diff === 1 ? 'falta 1 día' : `faltan ${diff} días`;
    el.dataset.en = enText;
    el.dataset.es = esText;
    el.textContent = currentLang === 'es' ? esText : enText;
  }
})();

/* ─── Calendar Helpers ────────────────────────────────────────── */

function buildICS(evt) {
  const title = evt.isPrimary
    ? "Morgan & Juanma's Wedding"
    : `Morgan & Juanma: ${evt.title_en} (${evt.subtitle_en})`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Morgan & Juanma//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${evt.id}-morgan-juanma@wedding`,
    `DTSTART;VALUE=DATE:${evt.date}`,
    `DTEND;VALUE=DATE:${evt.dateEnd}`,
    `SUMMARY:${title}`,
    `LOCATION:${evt.location_en}`,
    `DESCRIPTION:${evt.description_en}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return lines.join('\r\n');
}

function downloadICS(evt) {
  const ics = buildICS(evt);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `morgan-juanma-${evt.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function googleUrl(evt) {
  const title = evt.isPrimary
    ? "Morgan & Juanma's Wedding"
    : `Morgan & Juanma: ${evt.title_en} (${evt.subtitle_en})`;
  const params = new URLSearchParams({
    action:   'TEMPLATE',
    text:     title,
    dates:    `${evt.date}/${evt.dateEnd}`,
    location: evt.location_en,
    details:  evt.description_en,
    sf:       'true',
    output:   'xml',
  });
  return `https://calendar.google.com/calendar/r/eventedit?${params}`;
}

/* ─── Schedule Rendering ──────────────────────────────────────── */

(function renderSchedule() {
  const list = document.getElementById('schedule-list');
  if (!list) return;

  list.innerHTML = EVENTS.map(evt => `
    <article class="schedule-item">
      <div class="schedule-date">
        <span data-en="${fmtDate(evt.date, 'en')}" data-es="${fmtDate(evt.date, 'es')}">${fmtDate(evt.date, 'en')}</span>
      </div>
      <h3 class="schedule-title">
        <span data-en="${evt.subtitle_en}" data-es="${evt.subtitle_es}">${evt.subtitle_en}</span>
      </h3>
      <p class="schedule-meta">
        <span data-en="${evt.time_en}" data-es="${evt.time_es}">${evt.time_en}</span>
        <span class="schedule-sep" aria-hidden="true">·</span>
        <span data-en="${evt.attire_en}" data-es="${evt.attire_es}">${evt.attire_en}</span>
      </p>
      <p class="schedule-location">
        <span data-en="${evt.location_en}" data-es="${evt.location_es}">${evt.location_en}</span>
      </p>
      <div class="schedule-actions">
        <div class="cal-dropdown">
          <button class="cal-link cal-toggle" type="button" aria-haspopup="true" aria-expanded="false">
            <span data-en="Add to Calendar" data-es="Agregar al calendario">Add to Calendar</span>
          </button>
          <div class="cal-menu" hidden>
            <a class="cal-menu-item" href="${googleUrl(evt)}" target="_blank" rel="noopener">
              <span data-en="Google Calendar" data-es="Google Calendar">Google Calendar</span>
            </a>
            <button class="cal-menu-item" type="button" data-event-id="${evt.id}">
              <span data-en="Apple / Outlook" data-es="Apple / Outlook">Apple / Outlook</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  list.querySelectorAll('.cal-menu-item[data-event-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const evt = EVENTS.find(e => e.id === btn.dataset.eventId);
      if (evt) downloadICS(evt);
      btn.closest('.cal-dropdown')?.querySelector('.cal-toggle')?.setAttribute('aria-expanded', 'false');
      btn.closest('.cal-menu')?.setAttribute('hidden', '');
    });
  });

  list.querySelectorAll('.cal-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = toggle.nextElementSibling;
      const isOpen = !menu.hidden;
      list.querySelectorAll('.cal-menu').forEach(m => m.hidden = true);
      list.querySelectorAll('.cal-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        menu.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('click', () => {
    list.querySelectorAll('.cal-menu').forEach(m => m.hidden = true);
    list.querySelectorAll('.cal-toggle').forEach(t => t.setAttribute('aria-expanded', 'false'));
  });

  // Re-apply current language to freshly rendered nodes
  if (typeof setLang === 'function') setLang(currentLang);
})();

/* ─── Nav Scroll-Spy ─────────────────────────────────────────── */

(function initScrollSpy() {
  const links = document.querySelectorAll('.site-nav-list a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const linkById = new Map();
  links.forEach(a => linkById.set(a.getAttribute('href').slice(1), a));

  const sections = Array.from(linkById.keys())
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach(a => a.removeAttribute('aria-current'));
    const a = linkById.get(id);
    if (a) a.setAttribute('aria-current', 'true');
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) setActive(visible[0].target.id);
  }, {
    rootMargin: '-40% 0px -50% 0px',
    threshold: [0, 0.25, 0.5, 1],
  });

  sections.forEach(s => observer.observe(s));
})();

/* ─── Optional Hero Image ────────────────────────────────────── */
// To enable the hero photo, set HERO_SRC to the image path or URL.
// Leave as empty string to hide it.
const HERO_SRC = '../imgs/ProposalHydra0062.jpg';

(function initHero() {
  if (!HERO_SRC) return;
  const figure = document.getElementById('hero');
  const img    = document.getElementById('hero-img');
  if (!figure || !img) return;
  img.src      = HERO_SRC;
  figure.hidden = false;
  figure.removeAttribute('aria-hidden');
})();

/* ─── Click-to-Play Videos (Our Love Story) ─────────────────── */
(function initVideoTap() {
  document.querySelectorAll('.photo-box.video-tap').forEach(box => {
    const video = box.querySelector('video');
    const btn   = box.querySelector('.play-btn');
    if (!video || !btn) return;
    btn.addEventListener('click', () => {
      video.controls = true;
      video.play();
      box.classList.add('is-playing');
    });
  });
})();
