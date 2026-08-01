const WHATSAPP = '+201038360794';

function openWhatsApp(msg) {
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ==========================================
   INTRO SCREEN
   ========================================== */
const introEl = document.getElementById('intro');
const loaderBar = document.getElementById('loader-bar');
const enterBtn = document.getElementById('enter-btn');
const introSub = document.getElementById('intro-sub');

const introPhrases = [
  '> loading dark_code.app ...',
  '> system ready ✓',
  '> click button to enter',
];

let introReady = false;
let introDone = false;

function enterSite() {
  if (introDone) return;
  introDone = true;
  introEl.classList.add('hidden');
  document.getElementById('site').classList.add('visible');
  document.body.classList.remove('no-scroll');
  startMainEffects();
  animateCounters();
}

// Auto-enter disabled: site opens ONLY when the welcome button is pressed
setTimeout(() => {
  introReady = true;
  enterBtn.classList.add('glow-on');
}, 3400);

enterBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  enterSite();
});

// Typing intro phrases
function typePhrase(el, text, speed, cb) {
  let i = 0;
  const interval = setInterval(() => {
    i++;
    el.innerHTML = text.slice(0, i) + '<span class="caret">_</span>';
    if (i >= text.length) { clearInterval(interval); setTimeout(cb, 300); }
  }, speed);
}

// Loader bar animation
let loadPct = 0;
const loadTimer = setInterval(() => {
  loadPct += Math.random() * 14;
  if (loadPct >= 100) { loadPct = 100; clearInterval(loadTimer); }
  loaderBar.style.width = loadPct + '%';
}, 180);

// Intro canvas (particles)
const introCanvas = document.getElementById('intro-canvas');
const introCtx = introCanvas.getContext('2d');
let introParticles = [];

function sizeIntroCanvas() {
  introCanvas.width = introCanvas.offsetWidth;
  introCanvas.height = introCanvas.offsetHeight;
}
sizeIntroCanvas();
window.addEventListener('resize', sizeIntroCanvas);

for (let i = 0; i < 70; i++) {
  introParticles.push({
    x: Math.random() * introCanvas.width,
    y: Math.random() * introCanvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    r: Math.random() * 2.2 + 0.8,
  });
}

function animateIntroCanvas() {
  introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
  const colors = ['rgba(0,240,255,', 'rgba(139,92,246,', 'rgba(255,45,149,'];
  introParticles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > introCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > introCanvas.height) p.vy *= -1;

    introParticles.forEach((p2, j) => {
      if (j <= i) return;
      const dx = p.x - p2.x, dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        introCtx.strokeStyle = colors[(i + j) % 3] + (1 - dist / 130) * 0.15 + ')';
        introCtx.lineWidth = 1;
        introCtx.beginPath();
        introCtx.moveTo(p.x, p.y);
        introCtx.lineTo(p2.x, p2.y);
        introCtx.stroke();
      }
    });
    const c = colors[i % 3];
    introCtx.fillStyle = c + '0.7)';
    introCtx.beginPath();
    introCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    introCtx.fill();
  });
  requestAnimationFrame(animateIntroCanvas);
}
animateIntroCanvas();

// Phrase sequencing
typePhrase(introSub, introPhrases[0], 28, () => {
  typePhrase(introSub, introPhrases[1], 28, () => {
    typePhrase(introSub, introPhrases[2], 35, () => {
      introReady = true;
      enterBtn.classList.add('glow-on');
    });
  });
});

/* ==========================================
   MAIN BACKGROUND EFFECTS
   ========================================== */
let mainStarted = false;

function startMainEffects() {
  if (mainStarted) return;
  mainStarted = true;
  initNetworkCanvas();
  initCodeRain();
  initCursorGlow();
}

/* ---- Network Canvas (advanced) ---- */
const netCanvas = document.getElementById('network-canvas');
const netCtx = netCanvas.getContext('2d');
let netParticles = [];
let mouse = { x: -9999, y: -9999 };

function sizeNetCanvas() {
  netCanvas.width = window.innerWidth;
  netCanvas.height = window.innerHeight;
}
sizeNetCanvas();
window.addEventListener('resize', sizeNetCanvas);

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

function createNetParticles() {
  const count = Math.min(120, Math.floor(window.innerWidth / 14));
  netParticles = [];
  for (let i = 0; i < count; i++) {
    netParticles.push({
      x: Math.random() * netCanvas.width,
      y: Math.random() * netCanvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.8 + 1,
      c: ['#00f0ff', '#8b5cf6', '#ff2d95', '#00ff88'][Math.floor(Math.random() * 4)],
    });
  }
}
createNetParticles();
window.addEventListener('resize', createNetParticles);

function animateNetwork() {
  netCtx.clearRect(0, 0, netCanvas.width, netCanvas.height);

  // mouse connection radius
  netParticles.forEach((p) => {
    const dmx = p.x - mouse.x, dmy = p.y - mouse.y;
    const dm = Math.sqrt(dmx * dmx + dmy * dmy);
    if (dm < 180) {
      netCtx.strokeStyle = `rgba(0, 240, 255, ${(1 - dm / 180) * 0.5})`;
      netCtx.lineWidth = 1.2;
      netCtx.beginPath();
      netCtx.moveTo(p.x, p.y);
      netCtx.lineTo(mouse.x, mouse.y);
      netCtx.stroke();
    }
  });

  for (let i = 0; i < netParticles.length; i++) {
    const p = netParticles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > netCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > netCanvas.height) p.vy *= -1;

    for (let j = i + 1; j < netParticles.length; j++) {
      const q = netParticles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        const alpha = (1 - dist / 110) * 0.35;
        netCtx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        netCtx.lineWidth = 0.8;
        netCtx.beginPath();
        netCtx.moveTo(p.x, p.y);
        netCtx.lineTo(q.x, q.y);
        netCtx.stroke();
      }
    }

    netCtx.fillStyle = p.c;
    netCtx.shadowColor = p.c;
    netCtx.shadowBlur = 8;
    netCtx.beginPath();
    netCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    netCtx.fill();
    netCtx.shadowBlur = 0;
  }
  requestAnimationFrame(animateNetwork);
}

function initNetworkCanvas() {
  animateNetwork();
}

/* ---- Code Rain ---- */
function initCodeRain() {
  const container = document.getElementById('code-rain');
  const chars = '010101{}[]();+=</>$$#@!*_&?~%^\\';
  const cols = 8;
  for (let i = 0; i < cols; i++) {
    const span = document.createElement('span');
    span.style.animationDuration = (Math.random() * 10 + 12) + 's';
    span.style.animationDelay = (Math.random() * -15) + 's';
    let text = '';
    for (let j = 0; j < 40; j++) {
      text += chars[Math.floor(Math.random() * chars.length)] + '\n';
    }
    span.textContent = text;
    span.style.opacity = Math.random() * 0.4 + 0.1;
    container.appendChild(span);
  }
}

/* ---- Cursor Glow ---- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  glow.style.display = 'block';
  let tx = 0, ty = 0, x = 0, y = 0;
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
}

/* ==========================================
   TYPED CODE (hero window)
   ========================================== */
const codeLines = [
  { text: '// Welcome to Dark Code', color: '#6a7a9a' },
  { text: 'const developer = {', color: '#00f0ff' },
  { text: "  name: 'DARK CODE',", color: '#c9d1d9' },
  { text: "  skill: 'Programming',", color: '#c9d1d9' },
  { text: '  services: [', color: '#00f0ff' },
  { text: "    'WhatsApp Bots',", color: '#ff2d95' },
  { text: "    'Telegram Bots',", color: '#ff2d95' },
  { text: "    'Websites',", color: '#ff2d95' },
  { text: "    'HTML Trends',", color: '#ff2d95' },
  { text: "    'Custom Tools'", color: '#ff2d95' },
  { text: '  ],', color: '#c9d1d9' },
  { text: '  price: "symbolic 😉",', color: '#00ff88' },
  { text: '  available: true', color: '#00ff88' },
  { text: '};', color: '#00f0ff' },
  { text: '// Thank you for visiting!', color: '#6a7a9a' },
];

function typeCode() {
  const el = document.getElementById('typed-code');
  let lineIdx = 0, charIdx = 0;
  el.innerHTML = '';

  function tick() {
    if (lineIdx >= codeLines.length) return;
    const line = codeLines[lineIdx];
    charIdx++;
    el.innerHTML =
      codeLines.slice(0, lineIdx).map(l => `<span style="color:${l.color}">${l.text}</span>`).join('\n') +
      (lineIdx > 0 ? '\n' : '') +
      `<span style="color:${line.color}">${line.text.slice(0, charIdx)}</span>` +
      '<span class="code-caret">|</span>';

    if (charIdx >= line.text.length) {
      charIdx = 0;
      lineIdx++;
      setTimeout(tick, 160);
    } else {
      setTimeout(tick, 28);
    }
  }
  tick();
}

/* ==========================================
   HEADER SCROLL + REVEAL + COUNTERS
   ========================================== */
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.service-card, .price-card, .why-card, .section-head, .hero-code-window');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  revealObserver.observe(el);
});

// Counters
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = +el.dataset.count;
    const dur = 1500;
    const start = performance.now();
    (function update(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(p * target);
      if (p < 1) requestAnimationFrame(update);
      else el.textContent = target;
    })(start);
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

/* Start typing after intro completes */
setTimeout(() => {
  if (!introDone) {
    const check = setInterval(() => {
      if (introDone) {
        clearInterval(check);
        typeCode();
      }
    }, 300);
  }
}, 100);
