// ==============================
// CONFIGURACIÓN
// ==============================
// Número de WhatsApp con código de país, sin "+" ni espacios
const WHATSAPP_NUMBER = '573023770710';

// ==============================
// IDIOMAS (ES / EN)
// ==============================
const I18N = {
  es: {
    'nav.bio': 'Quién soy',
    'nav.tra': 'Dónde he tocado',
    'nav.events': 'Próximos eventos',
    'nav.contact': 'Booking',
    'bio.title': 'SOY',
    'bio.body': 'Explorador sonoro desde 2012, mi ADN mezcla el Urban World Music con la profunda herencia del Pacífico colombiano. Esta visión única, sumada a mi rol como miembro de <a href="https://www.instagram.com/puntoparlante/" target="_blank" rel="noopener noreferrer">Punto Parlante</a> y ganador del premio a Mejor DJ Urbano 2022, me ha llevado a comandar los shows en vivo de artistas nominados al Latin Grammy como <a href="https://www.instagram.com/dawerxdamper/" target="_blank" rel="noopener noreferrer">Dawer x Damper</a> y ganadores del Latin Billboard como <a href="https://www.instagram.com/venestimusic/" target="_blank" rel="noopener noreferrer">Venesti</a>, y a ser residente del club n.º 1 de Colombia, <a href="https://www.instagram.com/lapergolaclandestina/" target="_blank" rel="noopener noreferrer">La Pérgola Clandestina</a>.',
    'tra.title': 'SE HAN HECHO VAINAS',
    'tra.festivals': 'Festivales',
    'tra.intl': 'Internacionales',
    'tra.nat': 'Nacionales',
    'tra.residency': '8 años de residencia en La Pérgola Clandestina',
    'events.title': 'LO QUE SE VIENE',
    'events.body': 'Próximamente. Las nuevas fechas se anuncian en <a href="https://www.instagram.com/wins_thedeejaay/" target="_blank" rel="noopener noreferrer">Instagram</a>.',
    'contact.wa': 'Escríbeme por WhatsApp',
    'contact.or': 'O por correo:',
    'footer.rights': '© 2026 WINS THE DJ. Todos los derechos reservados.',
    'footer.terms': 'Términos & Privacidad',
    'play.label': 'PLAY SET',
    'play.pause': 'PAUSA',
    'play.aria': 'Reproducir set en SoundCloud',
    'play.pauseAria': 'Pausar set en SoundCloud',
    'close': 'Cerrar',
    'toggleAria': 'Switch to English',
    'wa.text': 'Hola Wins, me interesa bookearte para un evento. ¿Me compartes disponibilidad y tarifas?',
    'meta.title': 'WINS THE DJ | DJ & Urban World Music',
    'meta.desc': 'Wins The DJ – DJ y productor del Pacífico colombiano. Urban World Music, festivales, clubes y shows en vivo.'
  },
  en: {
    'nav.bio': 'About me',
    'nav.tra': 'Where I\'ve played',
    'nav.events': 'Upcoming events',
    'nav.contact': 'Booking',
    'bio.title': 'I AM',
    'bio.body': 'Sonic explorer since 2012. My sound blends Urban World Music with the deep heritage of Colombia\'s Pacific coast. That vision, along with my role as a member of <a href="https://www.instagram.com/puntoparlante/" target="_blank" rel="noopener noreferrer">Punto Parlante</a> and winning Best Urban DJ 2022, has led me to run the live shows of Latin Grammy-nominated artists like <a href="https://www.instagram.com/dawerxdamper/" target="_blank" rel="noopener noreferrer">Dawer x Damper</a> and Latin Billboard winners like <a href="https://www.instagram.com/venestimusic/" target="_blank" rel="noopener noreferrer">Venesti</a>, and to be resident at Colombia\'s number one club, <a href="https://www.instagram.com/lapergolaclandestina/" target="_blank" rel="noopener noreferrer">La Pérgola Clandestina</a>.',
    'tra.title': 'WHAT\'S BEEN DONE',
    'tra.festivals': 'Festivals',
    'tra.intl': 'International',
    'tra.nat': 'National',
    'tra.residency': '8-year residency at La Pérgola Clandestina',
    'events.title': 'COMING UP',
    'events.body': 'Coming soon. New dates are announced on <a href="https://www.instagram.com/wins_thedeejaay/" target="_blank" rel="noopener noreferrer">Instagram</a>.',
    'contact.wa': 'Message me on WhatsApp',
    'contact.or': 'Or by email:',
    'footer.rights': '© 2026 WINS THE DJ. All rights reserved.',
    'footer.terms': 'Terms & Privacy',
    'play.label': 'PLAY SET',
    'play.pause': 'PAUSE',
    'play.aria': 'Play set on SoundCloud',
    'play.pauseAria': 'Pause set on SoundCloud',
    'close': 'Close',
    'toggleAria': 'Cambiar a español',
    'wa.text': 'Hi Wins, I\'d like to book you for an event. Could you share your availability and rates?',
    'meta.title': 'WINS THE DJ | DJ & Urban World Music',
    'meta.desc': 'Wins The DJ – DJ and producer from Colombia\'s Pacific coast. Urban World Music, festivals, clubs and live shows.'
  }
};

let currentLang = 'es';
const t = key => (I18N[currentLang] && I18N[currentLang][key]) || key;

function applyLang(lang) {
  currentLang = I18N[lang] ? lang : 'es';
  document.documentElement.lang = currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('.close-button').forEach(el => {
    el.setAttribute('aria-label', t('close'));
  });

  // Botón de idioma: muestra el idioma al que cambia
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.textContent = currentLang === 'es' ? 'EN' : 'ES';
    toggle.setAttribute('aria-label', t('toggleAria'));
  }

  // WhatsApp con mensaje prellenado en el idioma actual
  const wa = document.getElementById('waBtn');
  if (wa) {
    wa.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(t('wa.text'));
  }

  document.title = t('meta.title');
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', t('meta.desc'));

  try { localStorage.setItem('lang', currentLang); } catch (e) {}
  document.dispatchEvent(new Event('langchange'));
}

(function initLang() {
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  const browser = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  applyLang(saved || browser);

  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => applyLang(currentLang === 'es' ? 'en' : 'es'));
  }
})();

// ==============================
// PANELES
// ==============================
const buttons = document.querySelectorAll('.buttons button');
const panels  = document.querySelectorAll('.panel');
const body    = document.body;
let lastTrigger = null;

function resetPanels() {
  buttons.forEach(b => b.classList.remove('active'));
  panels.forEach(p => p.classList.remove('show'));
  body.classList.remove('panel-open');
}

function closeAllPanels() {
  const trigger = lastTrigger;
  lastTrigger = null;
  resetPanels();
  if (trigger) trigger.focus();
}

function openPanel(id, button) {
  const panel = document.getElementById(id);
  if (!panel) return;

  resetPanels();
  lastTrigger = button;

  panel.classList.add('show');
  button.classList.add('active');
  body.classList.add('panel-open');

  // Reinicia la animación escalonada de las listas
  panel.querySelectorAll('li').forEach((li, i) => {
    li.style.setProperty('--i', i);
    li.style.animation = 'none';
    void li.offsetHeight; // fuerza reflow
    li.style.animation = '';
  });

  const content = panel.querySelector('.panel-content');
  if (content) content.scrollTop = 0;

  const closeBtn = panel.querySelector('.close-button');
  if (closeBtn) closeBtn.focus();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.panel;
    const panel = document.getElementById(id);
    if (!panel) return;
    if (panel.classList.contains('show')) closeAllPanels();
    else openPanel(id, button);
  });
});

panels.forEach(panel => {
  // Clic en el fondo
  panel.addEventListener('click', e => {
    if (e.target === panel) closeAllPanels();
  });
  // Botón X
  const closeBtn = panel.querySelector('.close-button');
  if (closeBtn) closeBtn.addEventListener('click', closeAllPanels);
});

document.addEventListener('keydown', e => {
  const open = document.querySelector('.panel.show');
  if (!open) return;

  if (e.key === 'Escape') {
    closeAllPanels();
    return;
  }

  // Mantiene el foco dentro del panel abierto
  if (e.key === 'Tab') {
    const focusables = open.querySelectorAll('a[href], button:not([disabled])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// ==============================
// SOUNDCLOUD
// ==============================
(function () {
  const btn     = document.getElementById('scPlayBtn');
  const label   = document.getElementById('scPlayText');
  const iframe  = document.getElementById('scWidget');
  if (!btn || !iframe) return;

  let widget = null;
  let ready = false;
  let playing = false;
  let pendingPlay = false;

  function setState(isPlaying) {
    playing = isPlaying;
    btn.classList.toggle('playing', isPlaying);
    btn.setAttribute('aria-pressed', String(isPlaying));
    btn.setAttribute('aria-label', isPlaying ? t('play.pauseAria') : t('play.aria'));
    label.textContent = isPlaying ? t('play.pause') : t('play.label');
  }

  // Actualiza el texto del botón si cambia el idioma
  document.addEventListener('langchange', () => setState(playing));

  function initWidget() {
    if (widget) return; // evita duplicar los bind
    widget = SC.Widget(iframe);

    widget.bind(SC.Widget.Events.READY, () => {
      ready = true;
      if (pendingPlay) {
        pendingPlay = false;
        widget.play();
      }
    });
    widget.bind(SC.Widget.Events.PLAY,   () => setState(true));
    widget.bind(SC.Widget.Events.PAUSE,  () => setState(false));
    widget.bind(SC.Widget.Events.FINISH, () => setState(false));
  }

  function waitForSC() {
    if (typeof SC !== 'undefined' && SC.Widget) initWidget();
    else setTimeout(waitForSC, 100);
  }

  btn.addEventListener('click', () => {
    if (!ready) {
      pendingPlay = true; // se reproduce apenas el widget esté listo
      waitForSC();
      return;
    }
    if (playing) widget.pause();
    else widget.play();
  });

  setState(false);
  waitForSC();
})();
