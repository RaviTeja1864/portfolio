import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <span className="logo-text">RT</span>
            <span className="logo-dot"></span>
          </div>
          <p className="footer-tagline">Building digital experiences that make a difference.</p>
          <nav className="footer-nav">
            <a href="#home">Home</a>
            <a href="#blogs">Blogs</a>
            <a href="#resume">Resume</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Ravi Teja. All Rights Reserved.</p>
          <p>Made with ❤️ in Bengaluru, India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
