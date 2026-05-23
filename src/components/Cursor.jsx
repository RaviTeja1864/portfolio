import React, { useEffect } from 'react';

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
      if (cursorDot) {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Hover effects
    const attachHoverEffects = () => {
      const hoverables = document.querySelectorAll('a, button, .service-card, .project-card, .filter-btn, .skill-pill, .stat-pill, .float-chip');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor?.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor?.classList.remove('hovered'));
      });
    };

    const handleMouseDown = () => cursor?.classList.add('clicked');
    const handleMouseUp = () => cursor?.classList.remove('clicked');

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Slight delay to allow DOM to render
    setTimeout(attachHoverEffects, 500);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-dot" id="cursorDot"></div>
    </>
  );
};

export default Cursor;
