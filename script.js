/* ═══════════════════════════════════════════════════
   PORTFOLIO — Fabio Neundlinger
   Lightweight JS: scroll reveals, cursor glow, i18n
   ═══════════════════════════════════════════════════ */

// ── i18n Texts ──
const texts = {
  de: {
    'hero.tagline': 'baut Tools die ihm das Leben erleichtern.',
    'about.label': 'Über mich',
    'about.lead': 'Ich bin Schüler an der HTL Leonding im Zweig IT & Medientechnik.',
    'about.body1': 'In der Schule lerne ich Java, Datenbanken und Netzwerke. Daneben baue ich ein AI-System das meinen Schulalltag steuert — von Moodle-Sync über Sprachassistent bis Gesichtserkennung.',
    'about.body2': 'Einen Schulplaner hab ich dreimal gebaut — als Webapp, als native SwiftUI-App, als CLI-Tool. Jedes Mal mit besserem Architektur-Verständnis, jedes Mal näher an dem was ich wirklich brauche.',
    'about.body3': 'Wenn ich nicht code, laufe ich, gehe ins Gym, fahre Rad oder schwimme. Oder ich löse LeetCode-Rätsel — zum Spaß.',
    'about.stack': 'Stack',
    'about.tools': 'Tools',
    'builds.label': 'Was ich baue',
    'builds.intro': 'Ich baue am liebsten Dinge die ein echtes Problem lösen. Lokale AI ist keine Spielerei — sondern Werkzeug.',
    'builds.ai': 'Lokale LLMs als echte Werkzeuge — Sprachassistent, Smart Scheduling, Gesichtserkennung. Alles läuft auf meinem Rechner.',
    'builds.native': 'SwiftUI-Apps im Apple-Ökosystem. Von AI-kuratiertem News-Feed bis Schulplaner.',
    'builds.web': 'React, Vanilla HTML/CSS/JS, Three.js. Von AI-gesteuerten 3D-Simulationen bis framework-freien Kunden-Websites.',
    'builds.cv': 'OpenCV, Haar Cascades, Gesichtserkennung. Computer Vision Schritt für Schritt lernen, von Grund auf.',
    'contact.label': 'Kontakt',
    'contact.email': 'Email auf Anfrage',
    'contact.emailText': 'Klicke unten um meine Email-Adresse zu kopieren.',
    'contact.copied': 'Kopiert!',
  },
  en: {
    'hero.tagline': 'builds tools that make his life easier.',
    'about.label': 'About',
    'about.lead': "I'm a student at HTL Leonding studying IT & Media Technology.",
    'about.body1': 'At school I learn Java, databases and networking. On the side I build an AI system that runs my school life — from Moodle sync to voice assistant to face recognition.',
    'about.body2': "I've built the same school planner three times — as a web app, a native SwiftUI app, a CLI tool. Each time with better architecture, each time closer to what I actually need.",
    'about.body3': "When I'm not coding, I run, hit the gym, cycle or swim. Or I solve LeetCode puzzles — for fun.",
    'about.stack': 'Stack',
    'about.tools': 'Tools',
    'builds.label': 'What I Build',
    'builds.intro': "I like building things that solve a real problem. Local AI isn't a gimmick — it's a tool.",
    'builds.ai': 'Local LLMs as real tools — voice assistant, smart scheduling, face recognition. Everything runs on my machine.',
    'builds.native': 'SwiftUI apps in the Apple ecosystem. From AI-curated news feeds to school planning tools.',
    'builds.web': 'React, vanilla HTML/CSS/JS, Three.js. From AI-driven 3D simulations to framework-free client sites.',
    'builds.cv': 'OpenCV, Haar Cascades, face recognition. Learning computer vision step by step, from scratch.',
    'contact.label': 'Contact',
    'contact.email': 'Email on request',
    'contact.emailText': 'Click below to copy my email address.',
    'contact.copied': 'Copied!',
  }
};

let currentLang = 'en';

// ── Language Switching ──
function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;

  document.querySelectorAll('.lang-opt').forEach(el => {
    el.classList.toggle('active', el.dataset.l === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (texts[lang][key]) {
      el.textContent = texts[lang][key];
    }
  });
}

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(currentLang === 'en' ? 'de' : 'en');
});

// ── Cursor Glow ──
const glow = document.querySelector('.cursor-glow');
let glowX = 0, glowY = 0, currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
  glowX = e.clientX;
  glowY = e.clientY;
});

function updateGlow() {
  currentX += (glowX - currentX) * 0.08;
  currentY += (glowY - currentY) * 0.08;
  glow.style.left = currentX + 'px';
  glow.style.top = currentY + 'px';
  requestAnimationFrame(updateGlow);
}
updateGlow();

// ── Scroll Reveal (IntersectionObserver) ──
const revealElements = document.querySelectorAll('.reveal-up');
const buildCards = document.querySelectorAll('.build-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));
buildCards.forEach(el => revealObserver.observe(el));

// ── Magnetic Hover Effect ──
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s var(--ease-out)';
    setTimeout(() => { el.style.transition = ''; }, 400);
  });
});

// ── Parallax Depth on Hero Constellation ──
const heroConstellation = document.querySelector('.hero-constellation');
if (heroConstellation) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroConstellation.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ── Hide scroll hint on scroll ──
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
  let hidden = false;
  window.addEventListener('scroll', () => {
    if (!hidden && window.scrollY > 100) {
      scrollHint.style.opacity = '0';
      scrollHint.style.transition = 'opacity 0.6s';
      hidden = true;
    }
  }, { passive: true });
}

// ── Smooth Background Constellation Scaling ──
const bgConst = document.querySelector('.bg-constellation');
if (bgConst) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrolled / docHeight, 1);
    bgConst.style.transform = `scale(${1 + progress * 0.3})`;
  }, { passive: true });
}

// ── Email Modal ──
const emailModal = document.getElementById('emailModal');
const emailReveal = document.getElementById('emailReveal');
const emailClose = document.getElementById('emailClose');
const emailCopy = document.getElementById('emailCopy');

emailReveal.addEventListener('click', () => {
  emailModal.classList.add('active');
  emailModal.setAttribute('aria-hidden', 'false');
});

function closeModal() {
  emailModal.classList.remove('active');
  emailModal.setAttribute('aria-hidden', 'true');
}

emailClose.addEventListener('click', closeModal);
emailModal.addEventListener('click', (e) => {
  if (e.target === emailModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

emailCopy.addEventListener('click', () => {
  navigator.clipboard.writeText('Neundlinger.Fabio@gmail.com').then(() => {
    emailCopy.classList.add('copied');
    setTimeout(() => emailCopy.classList.remove('copied'), 2000);
  });
});

// ── Init ──
setLang('en');
