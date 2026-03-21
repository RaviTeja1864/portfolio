/* ===== RAVI TEJA PORTFOLIO - SCRIPT.JS ===== */

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverables = document.querySelectorAll('a, button, .service-card, .project-card, .filter-btn, .skill-pill, .stat-pill, .float-chip');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
document.addEventListener('mousedown', () => cursor.classList.add('clicked'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicked'));

// ===== TYPEWRITER =====
const phrases = [
  'builds Full-Stack Web Apps',
  'loves Django REST APIs',
  'crafts React Interfaces',
  'dockerizes Everything 🐳',
  'automates with n8n 🤖',
  'ships Production Code 🚀',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter');

function typeLoop() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typeEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typeEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}
typeLoop();

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
    : (spans[0].style.transform = '',
       spans[1].style.opacity = '',
       spans[2].style.transform = '');
});
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  navLinks.classList.remove('open');
}));

// ===== AOS SCROLL ANIMATIONS =====
const aosElements = document.querySelectorAll('[data-aos]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), parseFloat(delay) * 1000);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
aosElements.forEach(el => observer.observe(el));

// ===== SKILL BAR ANIMATIONS =====
const skillBars = document.querySelectorAll('.bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      setTimeout(() => { entry.target.style.width = width + '%'; }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'all 0.4s ease';
      if (show) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 400);
      }
    });
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Sending... ⏳';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent! 🎉';
    btn.style.background = 'var(--accent-green)';
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      btn.style.background = '';
      e.target.reset();
    }, 3000);
  }, 1500);
});

// ===== SMOOTH SCROLL for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CARD TILT EFFECT =====
document.querySelectorAll('.service-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ===== FLOATING CHIPS interactive =====
document.querySelectorAll('.float-chip').forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.background = 'rgba(233,84,32,0.2)';
    chip.style.borderColor = 'rgba(233,84,32,0.6)';
    chip.style.transform = 'scale(1.1)';
    chip.style.zIndex = '10';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.background = '';
    chip.style.borderColor = '';
    chip.style.transform = '';
    chip.style.zIndex = '';
  });
});

// ===== MARQUEE PAUSE ON HOVER =====
const marqueeInner = document.getElementById('marqueeInner');
const marqueeInner2 = document.getElementById('marqueeInner2');
if (marqueeInner) {
  marqueeInner.closest('.marquee-track')?.addEventListener('mouseenter', () => marqueeInner.style.animationPlayState = 'paused');
  marqueeInner.closest('.marquee-track')?.addEventListener('mouseleave', () => marqueeInner.style.animationPlayState = 'running');
}
if (marqueeInner2) {
  marqueeInner2.closest('.marquee-track')?.addEventListener('mouseenter', () => marqueeInner2.style.animationPlayState = 'paused');
  marqueeInner2.closest('.marquee-track')?.addEventListener('mouseleave', () => marqueeInner2.style.animationPlayState = 'running');
}

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.why-stat-n').forEach(n => {
        const text = n.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        if (!isNaN(num)) animateCounter(n, num, suffix);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.why-stats').forEach(el => statObserver.observe(el));

console.log('%c Ravi Teja Portfolio 🚀', 'color: #E95420; font-size: 20px; font-weight: bold;');
console.log('%c Built with ❤️ in Bengaluru', 'color: #772953; font-size: 14px;');
