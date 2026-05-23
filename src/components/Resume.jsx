import React from 'react';

const Resume = () => {
  return (
    <section className="resume" id="resume">
      <div className="section-container">
        <div className="section-tag">// my_resume</div>
        <div className="section-header">
          <h2 className="section-title">Work <span className="accent">Experience</span></h2>
        </div>
        <div className="resume-grid">
          <div className="resume-col" data-aos="fade-right">
            <h3 className="resume-col-title"><i data-lucide="graduation-cap" style={{ color: '#6366f1' }}></i> Technical Foundation</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">Junior College</span>
                  <h4>Science & Computer Stream</h4>
                  <p>Narayana Junior College</p>
                  <p className="timeline-loc">📍 Karnataka, India</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">University</span>
                  <h4>B.Tech — Information Science & Engineering</h4>
                  <p>Jain University Global Campus</p>
                  <p className="timeline-loc"><i data-lucide="map-pin" style={{ color: '#ef4444', width: '14px', height: '14px' }}></i> Bengaluru, Karnataka</p>
                </div>
              </div>
            </div>
          </div>
          <div className="resume-col" data-aos="fade-left">
            <h3 className="resume-col-title"><i data-lucide="briefcase" style={{ color: '#6366f1' }}></i> Experience</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">2023 – 2024</span>
                  <h4>Independent AI Researcher</h4>
                  <p>Self-Directed · Remote</p>
                  <p className="timeline-desc">AI Architectures, FAISS, LLM Integration</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content glass-card">
                  <span className="timeline-date">Currently · 2024 – Present</span>
                  <h4>Self-Taught Full-Stack Developer</h4>
                  <p>Independent · Bengaluru</p>
                  <p className="timeline-desc">Django, React, Docker, GitHub Actions</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot active"></div>
                <div className="timeline-content glass-card highlight-card">
                  <span className="timeline-date active-badge">2024 – Present</span>
                  <h4>Project Lead — Solo-Bot</h4>
                  <p>Open Source · <a href="https://github.com/RaviTeja1864/Solo-Bot" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>GitHub Repo</a></p>
                  <p className="timeline-desc">AI Study Platform • Groq, FastEmbed, Supabase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
