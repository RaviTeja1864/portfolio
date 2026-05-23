import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Blogs from './components/Blogs';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import Background from './components/Background';
import { initScrollReveal, initScrollFloat } from './utils/animations';
import { createIcons, icons } from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lucide icons
    createIcons({ icons });

    // Initialize GSAP scroll animations
    initScrollReveal();
    initScrollFloat();

    // Initialize AOS-like IntersectionObserver for elements with data-aos
    const aosElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    aosElements.forEach(el => observer.observe(el));

    // Prevent Zoom
    const preventZoom = (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
        e.preventDefault();
      }
    };
    const preventWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', preventZoom);
    window.addEventListener('wheel', preventWheelZoom, { passive: false });

    console.log('%c Ravi Teja Portfolio 🚀', 'color: #E95420; font-size: 20px; font-weight: bold;');
    console.log('%c Built with ❤️ in Bengaluru', 'color: #772953; font-size: 14px;');

    return () => {
      window.removeEventListener('keydown', preventZoom);
      window.removeEventListener('wheel', preventWheelZoom);
      aosElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Cursor />
      <Background />
      <Navbar />
      <Hero />
      <Blogs />
      <Resume />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
