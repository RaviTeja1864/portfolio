import React, { useState, useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';

const ITEMS = [
  {
    title: 'Full-Stack Product Engineering',
    description: 'Building production-ready MVPs from concept to deployment with a focus on scalability.',
    icon: 'architecture'
  },
  {
    title: 'Agentic AI Integration',
    description: 'Leveraging LLMs and frameworks like LangChain to build context-aware autonomous features.',
    icon: 'psychology'
  },
  {
    title: 'High-Performance Backends',
    description: 'Crafting robust, secure RESTful APIs optimized for speed and high-concurrency reliability.',
    icon: 'settings_suggest'
  },
  {
    title: 'Workflow Automation',
    description: 'Designing autonomous workflows to streamline complex operations and eliminate manual overhead.',
    icon: 'bolt'
  },
  {
    title: 'Cloud-Native DevOps',
    description: 'Implementing zero-downtime CI/CD pipelines with containerized environments.',
    icon: 'cloud'
  },
  {
    title: 'Strategic Design Systems',
    description: 'Creating scalable, component-based UIs that maintain a premium user experience.',
    icon: 'palette'
  }
];

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const trackRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const autoplayTimerRef = useRef(null);

  const baseWidth = 320;
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const GAP = 16;
  const trackItemOffset = itemWidth + GAP;
  const maxPosition = ITEMS.length - 1;

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimerRef.current = setInterval(() => {
      if (!isDragging) {
        setCurrentPosition(prev => prev >= maxPosition ? 0 : prev + 1);
      }
    }, 3000);
  };

  const stopAutoplay = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [isDragging]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX);
    stopAutoplay();
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    setDragOffset(clientX - startXRef.current);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -50 && currentPosition < maxPosition) {
      setCurrentPosition(prev => prev + 1);
    } else if (dragOffset > 50 && currentPosition > 0) {
      setCurrentPosition(prev => prev - 1);
    }
    setDragOffset(0);
    startAutoplay();
  };

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, dragOffset, currentPosition]);

  useEffect(() => {
    // Folder Physics
    const papers = document.querySelectorAll('.custom-folder .paper');
    papers.forEach(paper => {
      const handleMove = (e) => {
        const rect = paper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;
        paper.style.setProperty('--magnet-x', `${offsetX}px`);
        paper.style.setProperty('--magnet-y', `${offsetY}px`);
      };
      const handleLeave = () => {
        paper.style.setProperty('--magnet-x', '0px');
        paper.style.setProperty('--magnet-y', '0px');
      };
      paper.addEventListener('mousemove', handleMove);
      paper.addEventListener('mouseleave', handleLeave);
      return () => {
        paper.removeEventListener('mousemove', handleMove);
        paper.removeEventListener('mouseleave', handleLeave);
      };
    });
  }, []);

  const getTrackStyle = () => {
    const xPos = -(currentPosition * trackItemOffset) + dragOffset;
    return {
      width: `${itemWidth}px`,
      gap: `${GAP}px`,
      transform: `translateX(${xPos}px)`,
      transition: isDragging ? 'none' : 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      perspective: '1000px',
      perspectiveOrigin: `${currentPosition * trackItemOffset + itemWidth / 2}px 50%`
    };
  };

  const getItemStyle = (index) => {
    const xPos = -(currentPosition * trackItemOffset) + dragOffset;
    const nodeX = -(index * trackItemOffset);
    const diff = xPos - nodeX;
    let rotateY = (diff / trackItemOffset) * -90;
    if (rotateY > 90) rotateY = 90;
    if (rotateY < -90) rotateY = -90;
    return {
      width: `${itemWidth}px`,
      height: `${itemWidth}px`,
      borderRadius: '50%',
      transform: `rotateY(${rotateY}deg)`,
      transition: isDragging ? 'none' : 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };
  };

  return (
    <section className="projects" id="projects">
      <div className="section-container">
        <div className="section-tag">// my_projects</div>
        <div className="section-header">
          <h2 className="section-title" data-scroll-reveal>Let's Have a Look at <br /><span className="accent">My Projects</span></h2>
          <p className="section-sub" data-scroll-reveal>Real-world applications built with production-grade architecture</p>
        </div>

        <div className="projects-split-layout">
          {/* Left: 3D Carousel */}
          <div className="carousel-wrapper" id="carouselWrapper" data-aos="fade-right">
            <div 
              className="carousel-container round" 
              style={{ width: `${baseWidth}px`, height: `${baseWidth}px`, borderRadius: '50%' }}
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
            >
              <div 
                className="carousel-track" 
                ref={trackRef} 
                style={getTrackStyle()}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
              >
                {ITEMS.map((item, index) => (
                  <div key={index} className="carousel-item round" style={getItemStyle(index)}>
                    <div className="carousel-item-header round">
                      <span className="carousel-icon-container"><span className="material-symbols-outlined carousel-icon">{item.icon}</span></span>
                    </div>
                    <div className="carousel-item-content">
                      <div className="carousel-item-title">{item.title}</div>
                      <p className="carousel-item-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carousel-indicators-container round">
                <div className="carousel-indicators">
                  {ITEMS.map((_, index) => (
                    <div 
                      key={index} 
                      className={`carousel-indicator ${index === currentPosition ? 'active' : 'inactive'}`} 
                      style={{ transform: index === currentPosition ? 'scale(1.2)' : 'scale(1)' }}
                      onClick={() => setCurrentPosition(index)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Project Archive Folder */}
          <div className="project-folder-card glass-card" onClick={() => setModalOpen(true)} data-aos="fade-left">
            <div className="custom-folder" id="animatedFolder">
              <div className="folder">
                <div className="folder__back">
                  <div className="paper paper-1"></div>
                  <div className="paper paper-2"></div>
                  <div className="paper paper-3"></div>
                  <div className="folder__front">
                    <i data-lucide="star" className="star-icon" style={{ fill: '#f59e0b', color: '#f59e0b' }}></i>
                  </div>
                  <div className="folder__front right"></div>
                </div>
              </div>
            </div>
            <div className="folder-text-group">
              <div className="folder-content">
                <h3 className="folder-title">Project Archive</h3>
              </div>
              <div className="folder-action">
                <span className="view-text">View Projects</span>
                <i data-lucide="arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Projects;
