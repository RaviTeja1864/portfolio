import React, { useEffect, useRef } from 'react';

const phrases = [
  'builds Full-Stack Web Apps',
  'loves Django REST APIs',
  'crafts React Interfaces',
  'dockerizes Everything',
  'automates with n8n',
  'ships Production Code',
];

const Hero = () => {
  const typeRef = useRef(null);

  useEffect(() => {
    let phraseIdx = 0, charIdx = 0, deleting = false;
    let timeoutId;

    const typeLoop = () => {
      const current = phrases[phraseIdx];
      if (typeRef.current) {
        if (!deleting) {
          typeRef.current.textContent = current.substring(0, charIdx + 1);
          charIdx++;
          if (charIdx === current.length) {
            deleting = true;
            timeoutId = setTimeout(typeLoop, 1800);
            return;
          }
        } else {
          typeRef.current.textContent = current.substring(0, charIdx - 1);
          charIdx--;
          if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
          }
        }
      }
      timeoutId = setTimeout(typeLoop, deleting ? 50 : 80);
    };

    timeoutId = setTimeout(typeLoop, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-left" data-aos="fade-right">
          <div className="testimonial-badge">
            <div className="badge-avatar"><i data-lucide="star" style={{ fill: '#f59e0b', color: '#f59e0b', width: '18px', height: '18px' }}></i></div>
            <div className="badge-text">
              <span className="badge-quote">"Clean code, real impact."</span>
              <span className="badge-sub">Open to Opportunities</span>
            </div>
          </div>
          <p className="hero-greeting">Hello! I Am</p>
          <h1 className="hero-name">
            <span>Ravi</span>
            <span className="name-accent">Teja</span>
          </h1>
          <div className="hero-role">
            A Full-Stack Developer who
            <br />
            <span className="typewriter-wrap">
              <span className="typewriter" id="typewriter" ref={typeRef}></span><span className="type-cursor">|</span>
            </span>
          </div>
          <p className="hero-bio">
            Passionate about building clean, scalable, user-friendly web apps.<br />
            B.Tech ISE @ Jain University, Bengaluru · Graduating 2027
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn-primary">View Projects</a>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/RaviTeja1864" target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/ravi-teja-18678a228/" target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://x.com/RAVITEJA_1864" target="_blank" rel="noreferrer" className="social-icon" title="Twitter/X">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-right" data-aos="fade-left">
          <div className="avatar-wrapper">
            <div className="avatar-glow"></div>
            <div className="avatar-ring ring-1"></div>
            <div className="avatar-ring ring-2"></div>
            <div className="avatar-circle">
              <img src="/about.webp" alt="Ravi Teja" className="avatar-photo" />
            </div>
            <div className="float-chip chip-1"><img src="https://skillicons.dev/icons?i=py" alt="Python" /> Python</div>
            <div className="float-chip chip-2"><img src="https://skillicons.dev/icons?i=react" alt="React" /> React</div>
            <div className="float-chip chip-3"><img src="https://skillicons.dev/icons?i=django" alt="Django" /> Django</div>
            <div className="float-chip chip-4"><img src="https://skillicons.dev/icons?i=docker" alt="Docker" /> Docker</div>
            <div className="float-chip chip-5"><img src="https://skillicons.dev/icons?i=postgres" alt="PostgreSQL" /> PostgreSQL</div>
          </div>
          <div className="hero-stats">
            <div className="stat-pill"><span className="stat-n">5+</span><span className="stat-l">Projects</span></div>
            <div className="stat-pill"><span className="stat-n">10+</span><span className="stat-l">Tech Skills</span></div>
            <div className="stat-pill"><span className="stat-n">2027</span><span className="stat-l">Graduating</span></div>
          </div>
        </div>
      </div>
      <div className="scroll-down" onClick={scrollToAbout}>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
