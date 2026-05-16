/* ===== RAVI TEJA PORTFOLIO - SCRIPT.JS ===== */

// ===== CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
  // Cursor dot follows instantly
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  // Ring follows with slight lag
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

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
  'dockerizes Everything',
  'automates with n8n',
  'ships Production Code',
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

// ===== CONTACT FORM REVEAL =====
const showFormBtn = document.getElementById('showFormBtn');
const hideFormBtn = document.getElementById('hideFormBtn');
const connectTrigger = document.getElementById('connectTrigger');
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (showFormBtn && hideFormBtn && connectTrigger && contactForm) {
  const tl = gsap.timeline({ paused: true });

  tl.to(connectTrigger, {
    duration: 0.4,
    opacity: 0,
    scale: 0.9,
    y: -20,
    ease: 'power2.inOut'
  })
  .set(connectTrigger, { display: 'none' })
  .set(contactForm, { display: 'block' })
  .fromTo(contactForm, 
    { opacity: 0, y: 20, scale: 0.98 },
    {
      duration: 0.5,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: 'back.out(1.2)',
      clearProps: 'will-change'
    }
  );

  showFormBtn.addEventListener('click', () => {
    contactForm.style.willChange = 'transform, opacity';
    tl.play();
  });

  hideFormBtn.addEventListener('click', () => {
    tl.reverse();
  });
}

// ===== CONTACT FORM — FORMSPREE =====
if (contactForm && submitBtn) {

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="animate-spin" style="width:16px;height:16px;vertical-align:middle;margin-left:5px;"></i>';
  lucide.createIcons();
  submitBtn.disabled = true;

  const formData = new FormData(contactForm);

  try {
    const response = await fetch('https://formspree.io/f/meerwgya', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      submitBtn.innerHTML = 'Message Sent! <i data-lucide="check-circle-2" style="width:16px;height:16px;vertical-align:middle;margin-left:5px;"></i>';
      submitBtn.style.background = 'var(--accent-green)';
      contactForm.reset();
      lucide.createIcons();
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message <i data-lucide="send" style="width:16px;height:16px;vertical-align:middle;margin-left:5px;"></i>';
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        lucide.createIcons();
      }, 4000);
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    submitBtn.innerHTML = 'Failed — Try Again <i data-lucide="x-circle" style="width:16px;height:16px;vertical-align:middle;margin-left:5px;"></i>';
    submitBtn.style.background = '#c0392b';
    submitBtn.disabled = false;
    lucide.createIcons();
    setTimeout(() => {
      submitBtn.innerHTML = 'Send Message <i data-lucide="send" style="width:16px;height:16px;vertical-align:middle;margin-left:5px;"></i>';
      submitBtn.style.background = '';
      lucide.createIcons();
    }, 3000);
  }
  });
}

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



// ===== PROJECT ARCHIVE MODAL =====
window.openProjectModal = function() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Manually trigger animations for cards inside the modal since it's fixed
    const cards = modal.querySelectorAll('[data-aos]');
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('aos-animate'), i * 150 + 100);
    });
  }
};

window.closeProjectModal = function() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset animations so they play again next time
    setTimeout(() => {
      const cards = modal.querySelectorAll('[data-aos]');
      cards.forEach(card => card.classList.remove('aos-animate'));
    }, 400); // Wait for modal close transition
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const closeProjBtn = document.getElementById('closeProjectModal');
  const projOverlay = document.getElementById('projectOverlay');
  if (closeProjBtn) closeProjBtn.onclick = window.closeProjectModal;
  if (projOverlay) projOverlay.onclick = window.closeProjectModal;

  /* ===== ANIMATED FOLDER PHYSICS ===== */
  const papers = document.querySelectorAll('.custom-folder .paper');
  papers.forEach(paper => {
    paper.addEventListener('mousemove', (e) => {
      const rect = paper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) * 0.15;
      const offsetY = (e.clientY - centerY) * 0.15;
      
      paper.style.setProperty('--magnet-x', `${offsetX}px`);
      paper.style.setProperty('--magnet-y', `${offsetY}px`);
    });

    paper.addEventListener('mouseleave', () => {
      paper.style.setProperty('--magnet-x', '0px');
      paper.style.setProperty('--magnet-y', '0px');
    });
  });
});

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const revealElements = document.querySelectorAll('[data-scroll-reveal]');

  revealElements.forEach(el => {
    // 1. Recursive word splitter to preserve HTML tags (like <span class="accent">)
    function wrapWords(node) {
      if (node.nodeType === 3) { // Text node
        const text = node.nodeValue;
        const words = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        
        words.forEach(word => {
          if (word.match(/^\s+$/)) {
            fragment.appendChild(document.createTextNode(word));
          } else if (word) {
            const span = document.createElement('span');
            span.className = 'scroll-word';
            span.textContent = word;
            fragment.appendChild(span);
          }
        });
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === 1) { // Element node
        const children = Array.from(node.childNodes);
        children.forEach(wrapWords);
      }
    }

    wrapWords(el);

    const words = el.querySelectorAll('.scroll-word');

    // 2. Container Rotation Animation
    gsap.fromTo(el, 
      { transformOrigin: '0% 50%', rotate: 3 },
      {
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom 80%',
          scrub: true
        }
      }
    );

    // 3. Word Animation (Opacity + Blur)
    gsap.fromTo(words,
      { opacity: 0.1, filter: 'blur(8px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom-=10%',
          end: 'bottom 70%',
          scrub: true
        }
      }
    );
  });

  // 4. Background Orbs Parallax & Vanish
  gsap.to('.orb-1', {
    y: -400,
    opacity: 0,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom center',
      scrub: 1.5
    }
  });

  gsap.to('.orb-3', {
    y: -200,
    opacity: 0,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom center',
      scrub: 1.2
    }
  });
}

// ===== PAGE LOAD ANIMATION =====
// ===== INITIALIZE ALL =====
window.addEventListener('load', () => {
  initScrollReveal();
  initScrollFloat('[data-scroll-float]', {
    animationDuration: 1,
    ease: 'back.inOut(2)',
    scrollStart: 'top bottom',
    scrollEnd: 'bottom 60%',
    stagger: 0.03
  });
  
  // Initialize Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Page Fade In
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});

// ===== PREVENT ZOOM =====
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
    e.preventDefault();
  }
});

window.addEventListener('wheel', (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
  }
}, { passive: false });

console.log('%c Ravi Teja Portfolio 🚀', 'color: #E95420; font-size: 20px; font-weight: bold;');
console.log('%c Built with ❤️ in Bengaluru', 'color: #772953; font-size: 14px;');
