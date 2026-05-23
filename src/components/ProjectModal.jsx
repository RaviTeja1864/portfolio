import React, { useState, useEffect } from 'react';
import { createIcons, icons } from 'lucide';
import { projectsData } from '../data/projectsData';

const ProjectModal = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        createIcons({ icons });
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredProjects = projectsData.filter(p => filter === 'all' || p.category === filter);

  if (!isOpen) return null;

  return (
    <div className={`project-modal ${isOpen ? 'active' : ''}`} id="projectModal">
      <div className="reader-overlay" id="projectOverlay" onClick={onClose}></div>
      <div className="project-modal-container glass-card">
        <button className="close-reader" id="closeProjectModal" onClick={onClose}><i data-lucide="x"></i></button>
        <div className="project-modal-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Project <span className="accent">Archive</span></h2>
        </div>
        <div className="project-modal-content">
          <div className="project-filter">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-btn ${filter === 'live' ? 'active' : ''}`} onClick={() => setFilter('live')}>Live</button>
            <button className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>Upcoming</button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="project-card glass-card aos-animate" 
                data-category={project.category} 
                style={{ '--delay': project.delay }}
              >
                <div className="project-img">
                  <div className="project-img-placeholder" style={{ background: project.gradient }}>
                    {project.imgIcon ? (
                      <span className="proj-icon">
                        <img src={project.imgIcon} alt={project.title} style={{ width: '80px', height: '80px' }} />
                      </span>
                    ) : (
                      <span className="proj-icon">
                        <i data-lucide={project.lucideIcon} style={{ color: project.lucideColor || '#fff' }}></i>
                      </span>
                    )}
                  </div>
                  <div className="project-overlay">
                    {project.category === 'live' ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="proj-link-btn">View on GitHub →</a>
                    ) : (
                      <span className="coming-soon-tag">Coming Soon</span>
                    )}
                  </div>
                </div>
                <div className="project-body">
                  <span className={`project-badge ${project.category}-badge`}>
                    {project.category === 'live' ? 'Live' : 'Upcoming'}
                  </span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                  {project.category === 'live' ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="project-link">View Project →</a>
                  ) : (
                    <span className="project-link muted">In Development...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
