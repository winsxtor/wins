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
    btn.setAttribute('aria-label', isPlaying ? 'Pausar set en SoundCloud' : 'Reproducir set en SoundCloud');
    label.textContent = isPlaying ? 'PAUSA' : 'PLAY SET';
  }

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

  waitForSC();
})();
