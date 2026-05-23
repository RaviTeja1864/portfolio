import React, { useState, useRef } from 'react';
import gsap from 'gsap';

const Contact = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [buttonText, setButtonText] = useState('Send Message 🚀');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const formRef = useRef(null);
  const triggerRef = useRef(null);

  const showForm = () => {
    setFormVisible(true);
    const tl = gsap.timeline();
    tl.to(triggerRef.current, {
      duration: 0.4,
      opacity: 0,
      scale: 0.9,
      y: -20,
      ease: 'power2.inOut',
      display: 'none'
    })
    .set(formRef.current, { display: 'block' })
    .fromTo(formRef.current, 
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
  };

  const hideForm = () => {
    const tl = gsap.timeline();
    tl.to(formRef.current, {
      duration: 0.4,
      opacity: 0,
      y: 20,
      scale: 0.98,
      ease: 'power2.inOut',
      display: 'none'
    })
    .set(triggerRef.current, { display: 'block' })
    .to(triggerRef.current, {
      duration: 0.4,
      opacity: 1,
      scale: 1,
      y: 0,
      ease: 'back.out(1.2)',
      clearProps: 'all'
    });
    setFormVisible(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Sending...');
    setButtonDisabled(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/meerwgya', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setButtonText('Message Sent!');
        e.target.reset();
        setTimeout(() => {
          setButtonText('Send Message 🚀');
          setButtonDisabled(false);
          hideForm();
        }, 4000);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      setButtonText('Failed — Try Again');
      setButtonDisabled(false);
      setTimeout(() => {
        setButtonText('Send Message 🚀');
      }, 3000);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="section-container">
        <div className="section-tag">// contact_me</div>
        <div className="section-header">
          <h2 className="section-title" data-scroll-reveal>Have an Awesome Project <span className="accent">Idea?</span></h2>
          <p className="section-sub" data-scroll-reveal>Let's build something great together. I'm open to internships, freelance projects, and full-time opportunities.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-left" data-aos="fade-right">
            <h3>Let's Connect</h3>
            <p>Whether you have a project in mind, want to collaborate, or just want to say hello — my inbox is always open!</p>
            <div className="contact-info">
              <a href="mailto:bethuraviteja.in@gmail.com" className="contact-item">
                <span className="contact-item-icon"><i data-lucide="mail" style={{ color: '#6366f1' }}></i></span>
                <span>bethuraviteja.in@gmail.com</span>
              </a>
              <div className="contact-item">
                <span className="contact-item-icon"><i data-lucide="map-pin" style={{ color: '#ef4444' }}></i></span>
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-item-icon"><i data-lucide="graduation-cap" style={{ color: '#6366f1' }}></i></span>
                <span>Jain University Global Campus</span>
              </div>
            </div>
            <div className="contact-socials">
              <a href="https://github.com/RaviTeja1864" target="_blank" rel="noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ravi-teja-18678a228/" target="_blank" rel="noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://x.com/RAVITEJA_1864" target="_blank" rel="noreferrer" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="contact-right" data-aos="fade-left">
            <div className="contact-form-wrapper">
              <div className="connect-trigger-container" id="connectTrigger" ref={triggerRef}>
                <button className="connect-btn-large" id="showFormBtn" onClick={showForm}>
                  <div className="btn-ring"></div>
                  <div className="btn-icon">
                    <span className="material-symbols-outlined">chat_bubble</span>
                  </div>
                  <span className="btn-text">Start a Conversation</span>
                  <span className="btn-subtext">Typically responds within 24 hours</span>
                </button>
              </div>

              <form 
                className="contact-form" 
                id="contactForm" 
                ref={formRef}
                style={{ display: 'none', opacity: 0, transform: 'translateY(30px)' }}
                onSubmit={handleSubmit}
              >
                <button type="button" className="form-close-btn" id="hideFormBtn" title="Go Back" onClick={hideForm}>
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div className="form-header">
                  <h3>Send a Message</h3>
                  <p>I'll get back to you as soon as possible.</p>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" placeholder="Project / Opportunity / Hello" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="5" name="message" placeholder="Tell me about your project or opportunity..." required></textarea>
                </div>
                <button type="submit" className="btn-primary btn-full" disabled={buttonDisabled}>
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
