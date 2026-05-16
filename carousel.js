/* ===== VANILLA JS 3D CAROUSEL ===== */

document.addEventListener('DOMContentLoaded', () => {
  const carouselWrapper = document.getElementById('carouselWrapper');
  if (!carouselWrapper) return;

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

  const baseWidth = 320;
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const GAP = 16;
  const trackItemOffset = itemWidth + GAP;
  
  // Create DOM
  carouselWrapper.innerHTML = `
    <div class="carousel-container round" id="carouselContainer" style="width: ${baseWidth}px; height: ${baseWidth}px; border-radius: 50%;">
      <div class="carousel-track" id="carouselTrack" style="width: ${itemWidth}px; gap: ${GAP}px;">
        ${ITEMS.map((item, index) => `
          <div class="carousel-item round" data-index="${index}" style="width: ${itemWidth}px; height: ${itemWidth}px; border-radius: 50%;">
            <div class="carousel-item-header round">
              <span class="carousel-icon-container"><span class="material-symbols-outlined carousel-icon">${item.icon}</span></span>
            </div>
            <div class="carousel-item-content">
              <div class="carousel-item-title">${item.title}</div>
              <p class="carousel-item-description">${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="carousel-indicators-container round">
        <div class="carousel-indicators" id="carouselIndicators">
          ${ITEMS.map((_, index) => `<div class="carousel-indicator ${index === 0 ? 'active' : 'inactive'}" data-index="${index}"></div>`).join('')}
        </div>
      </div>
    </div>
  `;

  const track = document.getElementById('carouselTrack');
  const itemsNodes = track.querySelectorAll('.carousel-item');
  const indicatorsNodes = document.querySelectorAll('.carousel-indicator');
  
  let currentPosition = 0;
  const maxPosition = ITEMS.length - 1;
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;
  
  const updateCarousel = (animate = true) => {
    track.style.transition = animate ? 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none';
    const xPos = -(currentPosition * trackItemOffset) + dragOffset;
    track.style.transform = `translateX(${xPos}px)`;
    
    // IMPORTANT: The perspective origin logic from React Bits
    track.style.perspective = '1000px';
    track.style.perspectiveOrigin = `${currentPosition * trackItemOffset + itemWidth / 2}px 50%`;
    
    // Update items 3D rotation
    itemsNodes.forEach((node, index) => {
      const nodeX = -(index * trackItemOffset);
      const diff = xPos - nodeX;
      
      let rotateY = (diff / trackItemOffset) * -90;
      if (rotateY > 90) rotateY = 90;
      if (rotateY < -90) rotateY = -90;
      
      node.style.transform = `rotateY(${rotateY}deg)`;
      node.style.transition = animate ? 'transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none';
    });

    // Update indicators
    indicatorsNodes.forEach((ind, i) => {
      if (i === currentPosition) {
        ind.classList.add('active');
        ind.classList.remove('inactive');
        ind.style.transform = 'scale(1.2)';
      } else {
        ind.classList.remove('active');
        ind.classList.add('inactive');
        ind.style.transform = 'scale(1)';
      }
    });
  };

  updateCarousel(false);

  // AutoPlay
  let autoplayTimer;
  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      if (!isDragging) {
        currentPosition = currentPosition >= maxPosition ? 0 : currentPosition + 1;
        updateCarousel(true);
      }
    }, 3000);
  };
  const stopAutoplay = () => clearInterval(autoplayTimer);

  startAutoplay();
  
  const container = document.getElementById('carouselContainer');
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);

  // Dragging logic
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAutoplay();
    track.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragOffset = e.clientX - startX;
    updateCarousel(false);
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    
    if (dragOffset < -50 && currentPosition < maxPosition) {
      currentPosition++;
    } else if (dragOffset > 50 && currentPosition > 0) {
      currentPosition--;
    }
    
    dragOffset = 0;
    updateCarousel(true);
    startAutoplay();
  });
  
  // Touch support
  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    stopAutoplay();
  });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    dragOffset = e.touches[0].clientX - startX;
    updateCarousel(false);
  });
  window.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    if (dragOffset < -50 && currentPosition < maxPosition) {
      currentPosition++;
    } else if (dragOffset > 50 && currentPosition > 0) {
      currentPosition--;
    }
    dragOffset = 0;
    updateCarousel(true);
    startAutoplay();
  });

  // Indicators click
  indicatorsNodes.forEach((ind, i) => {
    ind.addEventListener('click', () => {
      currentPosition = i;
      updateCarousel(true);
    });
  });
});
