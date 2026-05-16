/**
 * ScrollFloat - Vanilla JS version of React Bits ScrollFloat component
 * Integrates with GSAP and ScrollTrigger
 */

function initScrollFloat(selector, options = {}) {
  const {
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'center bottom+=50%',
    scrollEnd = 'bottom bottom-=40%',
    stagger = 0.03
  } = options;

  const elements = document.querySelectorAll(selector);
  
  elements.forEach(el => {
    // 1. Split text into characters while preserving HTML tags
    function wrapChars(node) {
      if (node.nodeType === 3) { // Text node
        const text = node.nodeValue;
        const chars = text.split('');
        const fragment = document.createDocumentFragment();
        
        chars.forEach(char => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = char === ' ' ? '\u00A0' : char;
          fragment.appendChild(span);
        });
        node.parentNode.replaceChild(fragment, node);
      } else if (node.nodeType === 1) { // Element node
        const children = Array.from(node.childNodes);
        children.forEach(wrapChars);
      }
    }

    wrapChars(el);
    el.classList.add('scroll-float');

    const charElements = el.querySelectorAll('.char');

    gsap.fromTo(
      charElements,
      {
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  });
}
