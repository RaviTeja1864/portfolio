import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-scroll-reveal]');
  
  revealElements.forEach(el => {
    // 1. Recursive word splitter to preserve HTML tags
    function wrapWords(node) {
      if (node.nodeType === 3) {
        const text = node.nodeValue;
        const words = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();
        
        words.forEach(word => {
          if (word.match(/^\s+$/)) {
            fragment.appendChild(document.createTextNode(word));
          } else if (word) {
            const span = document.createElement('span');
            span.className = 'scroll-word';
            span.textContent = word;
            fragment.appendChild(span);
          }
        });
        if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === 1) {
        const children = Array.from(node.childNodes);
        children.forEach(wrapWords);
      }
    }

    if (!el.dataset.wrapped) {
      wrapWords(el);
      el.dataset.wrapped = 'true';
    }

    const words = el.querySelectorAll('.scroll-word');

    // 2. Container Rotation Animation
    gsap.fromTo(el, 
      { transformOrigin: '0% 50%', rotate: 3 },
      {
        rotate: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom 80%',
          scrub: true
        }
      }
    );

    // 3. Word Animation (Opacity + Blur)
    if (words.length > 0) {
      gsap.fromTo(words,
        { opacity: 0.1, filter: 'blur(8px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=10%',
            end: 'bottom 70%',
            scrub: true
          }
        }
      );
    }
  });

  // 4. Background Orbs Parallax & Vanish
  gsap.to('.orb-1', {
    y: -400,
    opacity: 0,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom center',
      scrub: 1.5
    }
  });

  gsap.to('.orb-3', {
    y: -200,
    opacity: 0,
    ease: 'power1.out',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom center',
      scrub: 1.2
    }
  });
}

export function initScrollFloat(selector = '[data-scroll-float]', options = {}) {
  const elements = document.querySelectorAll(selector);
  
  elements.forEach((el, index) => {
    // Basic setup if not wrapped
    if (!el.dataset.floatWrapped) {
      const text = el.innerHTML;
      el.innerHTML = '';
      
      const wrapper = document.createElement('div');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.innerHTML = text;
      el.appendChild(wrapper);
      el.dataset.floatWrapped = 'true';
    }

    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: options.animationDuration || 1,
        ease: options.ease || 'back.out(1.7)',
        delay: index * (options.stagger || 0.1),
        scrollTrigger: {
          trigger: el,
          start: options.scrollStart || 'top 90%',
          end: options.scrollEnd || 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}
