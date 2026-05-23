import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a className="nav-logo" href="#home" onClick={(e) => handleSmoothScroll(e, 'home')}>
          <span className="logo-text">RT</span>
          <span className="logo-dot"></span>
        </a>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <li><a href="#home" className={`nav-link ${activeNav === 'home' ? 'active' : ''}`} onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a></li>
          <li><a href="#blogs" className={`nav-link ${activeNav === 'blogs' ? 'active' : ''}`} onClick={(e) => handleSmoothScroll(e, 'blogs')}>Blogs</a></li>
          <li><a href="#resume" className={`nav-link ${activeNav === 'resume' ? 'active' : ''}`} onClick={(e) => handleSmoothScroll(e, 'resume')}>Resume</a></li>
          <li><a href="#projects" className={`nav-link ${activeNav === 'projects' ? 'active' : ''}`} onClick={(e) => handleSmoothScroll(e, 'projects')}>Projects</a></li>
          <li><a href="#contact" className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`} onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a></li>
        </ul>
        <div className="nav-actions">
          <a href="/resume.pdf" download="RaviTeja_Resume.pdf" className="resume-btn">
            <i data-lucide="download" style={{ width: '16px', height: '16px', marginRight: '4px' }}></i> Resume
          </a>
          <a href="mailto:bethuraviteja.in@gmail.com" className="hire-btn">Hire Me</a>
          <button className="hamburger" id="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}></span>
            <span style={menuOpen ? { opacity: 0 } : {}}></span>
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}}></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
