//© RM - Código libre no comercial

// Cargar el SVG y animar los corazones
fetch('Img/treelove.svg')
  .then(res => res.text())
  .then(svgText => {
    const container = document.getElementById('tree-container');
    container.innerHTML = svgText;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const allPaths = Array.from(svg.querySelectorAll('path'));
    allPaths.forEach(path => {
      path.style.stroke = '#222';
      path.style.strokeWidth = '2.5';
      path.style.fillOpacity = '0';
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.transition = 'none';
    });

    setTimeout(() => {
      allPaths.forEach((path, i) => {
        path.style.transition = stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s;
        path.style.strokeDashoffset = 0;
        setTimeout(() => {
          path.style.fillOpacity = '1';
          path.style.stroke = '';
          path.style.strokeWidth = '';
        }, 1200 + i * 80);
      });

      const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500;
      setTimeout(() => {
        svg.classList.add('move-and-scale');
        setTimeout(() => {
          showDedicationText();
          startFloatingObjects();
          playBackgroundMusic();
        }, 1200);
      }, totalDuration);
    }, 50);

    const heartPaths = allPaths.filter(el => {
      const style = el.getAttribute('style') || '';
      return style.includes('#FC6F58') || style.includes('#C1321F');
    });
    heartPaths.forEach(path => {
      path.classList.add('animated-heart');
    });
  })
  .catch(err => {
    console.warn("⚠ No se pudo cargar el SVG:", err);
    showDedicationText();
    startFloatingObjects();
  });

// --- FUNCIONES ---

function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Texto de dedicatoria
function showDedicationText() {
  let text = getURLParam('text');
  if (!text) {
    text = A la dueña de mi amor AM:\n\nEres la más hermosa casualidad de mi vida.\n\nTe amo con calma, con certeza.\n\nMi amor ya es todo tuyo y siempre lo será.\n\n Te amo preciosa.;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma
function showSignature() {
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con todo mi amor, RM";
  signature.classList.add('visible');
}

// Pétalos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let count = 0;
  function spawn() {
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = ${Math.random() * 90 + 2}%;
    el.style.top = ${100 + Math.random() * 10}%;
    el.style.opacity = 0.7 + Math.random() * 0.3;
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;
    setTimeout(() => {
      el.style.transition = transform ${duration}ms linear, opacity 1.2s;
      el.style.transform = translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg);
      el.style.opacity = 0.2;
    }, 30);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration + 2000);

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500);
    else setTimeout(spawn, 1200 + Math.random() * 1200);
  }
  spawn();
}

// Cuenta regresiva SIEMPRE ACTIVA y con ajuste automático de año
function showCountdown() {
  const container = document.getElementById('countdown');
  if (!container) {
    console.error("⚠ No se encontró el elemento #countdown");
    return;
  }

  // 🔹 CONFIGURA TUS FECHAS AQUÍ
  let startDate = new Date(2019, 0, 1); // Año, mes(0=enero), día que se conocieron
  let eventMonth = 0; // Enero = 0, Febrero = 1, ...
  let eventDay = 1;   // Día del aniversario

  function update() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let eventDate = new Date(currentYear, eventMonth, eventDay, 0, 0, 0);

    // Si el aniversario de este año ya pasó, poner el próximo
    if (eventDate.getTime() < now.getTime()) {
      eventDate = new Date(currentYear + 1, eventMonth, eventDay, 0, 0, 0);
    }

    // Calcular días desde que se conocieron
    let diff = now - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Calcular tiempo restante
    let eventDiff = eventDate - now;
    let eventDays = Math.floor(eventDiff / (1000 * 60 * 60 * 24));
    let eventHours = Math.floor((eventDiff / (1000 * 60 * 60)) % 24);
    let eventMinutes = Math.floor((eventDiff / (1000 * 60)) % 60);
    let eventSeconds = Math.floor((eventDiff / 1000) % 60);

    container.innerHTML =
      Llevamos de conocernos "01/01/2019": <b>${days}</b> días<br> +
      Nuestro aniversario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>;
    container.classList.add('visible');
  }

  update();
  setInterval(update, 1000);
}

// Música
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;
  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🔊 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(255,255,255,0.85)';
    btn.style.border = 'none';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.1em';
    btn.style.cursor = 'pointer';
    document.body.appendChild(btn);
  }
  audio.volume = 0.7;
  audio.loop = true;
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    btn.textContent = '▶️ Música';
  });
  btn.onclick = () => {
    if (audio.paused) {
      audio.play();
      btn.textContent = '🔊 Música';
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}

// --- EJECUTAR AL CARGAR ---
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
  showCountdown(); // ✅ Siempre se ejecuta
});
