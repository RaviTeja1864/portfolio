const blogPosts = [
  {
    id: 1,
    slug: "optimizing-human-intelligence",
    title: "Optimizing Human Intelligence with AI",
    category: "AI & Innovation",
    date: "May 15, 2026",
    readTime: "5 min read",
    excerpt: "Exploring the critical importance of thinking before using AI to maintain cognitive ownership.",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    height: 600,
    content: `
      <p>Every time I jump straight into AI to solve a problem, something feels off. I get an answer. Sometimes it's even a good answer. But when I'm done, I feel strangely empty. Like I arrived somewhere without remembering the journey. Like I was handed a result I don't fully own.</p>
      
      <p>That feeling nagged at me for a while. Then I figured out what it was and it changed how I use AI completely.</p>

      <h2>The problem with going to AI first</h2>
      <p>When you open an AI tool before you've thought about a problem yourself, your brain switches into a passive mode. It stops generating. It stops struggling. It just waits like an early commuter on a platform waiting for the train to arrive and carry it somewhere.</p>
      
      <p>You get the output. You move on. But here's what you don't get: understanding. Context. The memory of the decisions you made. The awareness of why this solution works and not another one.</p>
      
      <p>Your brain was there. But it was a passenger, not a driver.</p>

      <blockquote>"Every time I used AI instantly, my brain never knew what I was doing. It was just sitting there waiting for the expected output. That's not how it works."</blockquote>

      <h2>The horse and rider metaphor for AI</h2>
      <p>Solving a problem without AI is like a man walking toward his destination. It's slower. It takes effort. But he knows every turn he made, every shortcut he took, every road he crossed. When he arrives, he owns that journey completely.</p>
      
      <p>AI is like a horse. Faster. More powerful. More efficient. The same destination, in a fraction of the time.</p>

      <p>But here's where most people get it wrong. They sit on the horse and say: "Take me to my destination." And the horse runs somewhere. Maybe the right place. Maybe not. And even if it's the right place, the rider has no idea how they got there. They don't know the roads. They can't retrace the path. They can't navigate next time without the horse doing it again.</p>

      <p><strong>If AI is the horse, you are the rider.</strong> Your job is to hold the reins. To know the direction. To navigate the roads. To make the decisions about which turn to take. The horse gives you speed and power but only you can give it direction.</p>

      <h2>What "thinking first" actually looks like in practice</h2>
      <p>This isn't about avoiding AI. I use it constantly. But my process has changed:</p>
      <ul>
        <li>Before I open any AI tool, I spend time—even just 5–10 minutes—writing down what I actually understand about the problem.</li>
        <li>I try to come up with at least one rough idea or direction myself, even if it's imperfect.</li>
        <li>Then I bring that to AI not as a blank question, but as a starting point to refine, challenge, or expand.</li>
        <li>When the AI gives me something, I ask myself: do I actually understand this? Could I explain it to someone else?</li>
      </ul>

      <h2>Why this matters more in 2026 than ever before</h2>
      <p>AI tools in 2026 are extraordinarily capable. They can write, code, research, plan, design faster and often better than we can alone. That's not a threat. That's incredible.</p>
      
      <p>But there's a real risk hiding inside that capability: the slow erosion of our own thinking muscles. If we consistently outsource the hard part—the struggle, the confusion, the working it out—we lose something important. We become dependent riders who don't know the road.</p>

      <h3>Final thought</h3>
      <p>Think first. Then ride. That's how you arrive somewhere and remember how you got there.</p>
      
      <div class="blog-tags">
        <span>#artificial-intelligence</span>
        <span>#productivity</span>
        <span>#learning</span>
        <span>#critical-thinking</span>
        <span>#technology</span>
      </div>
    `
  },
  {
    id: 2,
    slug: "philosophy-of-clean-code",
    title: "The Philosophy of Clean Code",
    category: "Engineering",
    date: "May 10, 2026",
    readTime: "4 min read",
    excerpt: "Why writing readable code is more important than clever code.",
    heroImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
    height: 450,
    content: "Content pending..."
  },
  {
    id: 3,
    slug: "architecting-scalable-systems",
    title: "Architecting Scalable Systems",
    category: "Architecture",
    date: "May 05, 2026",
    readTime: "8 min read",
    excerpt: "Building systems that grow with your user base.",
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    height: 700,
    content: "Content pending..."
  },
  {
    id: 4,
    slug: "design-systems",
    title: "The Anatomy of a Design System",
    category: "Design",
    date: "May 01, 2026",
    readTime: "5 min read",
    excerpt: "Bridging the gap between engineering and design.",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    height: 500,
    content: "Content pending..."
  },
  {
    id: 5,
    slug: "microservices-vs-monolith",
    title: "Microservices vs Monolith",
    category: "Architecture",
    date: "April 28, 2026",
    readTime: "7 min read",
    excerpt: "When to split your application.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    height: 650,
    content: "Content pending..."
  },
  {
    id: 6,
    slug: "future-of-devops",
    title: "The Future of DevOps",
    category: "Cloud",
    date: "April 20, 2026",
    readTime: "6 min read",
    excerpt: "Moving beyond CI/CD into AIOps.",
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    height: 550,
    content: "Content pending..."
  }
];

// 1. Rendering & Masonry Logic
let hasMounted = false;

async function preloadImages(urls) {
  await Promise.all(urls.map(src => new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = () => resolve();
  })));
}

function getColumns(width) {
  if (width >= 1500) return 4;
  if (width >= 1000) return 3;
  if (width >= 600) return 2;
  return 1;
}

function calculateGrid(containerWidth) {
  const columns = getColumns(containerWidth);
  const columnWidth = containerWidth / columns;
  const colHeights = new Array(columns).fill(0);

  return blogPosts.map(post => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    const x = columnWidth * col;
    const y = colHeights[col];
    const h = post.height / 2; // Scaled for design

    colHeights[col] += h;
    return { ...post, x, y, w: columnWidth, h };
  });
}

async function renderBlogs() {
  const container = document.getElementById('blogsGrid');
  if (!container) return;

  // Initial render (invisible skeletons)
  container.innerHTML = blogPosts.map(post => `
    <article class="masonry-item" data-key="${post.id}" style="opacity: 0;">
      <div class="masonry-card">
         <img src="${post.heroImage}" class="masonry-img" loading="lazy" />
         <div class="masonry-overlay">
            <div class="masonry-content">
              <span class="blog-category">${post.category}</span>
              <h3 class="blog-title">${post.title}</h3>
              <button onclick="window.openReader('${post.slug}')" class="read-more">Read Article →</button>
            </div>
          </div>
      </div>
    </article>
  `).join('');

  // Preload and then Animate
  await preloadImages(blogPosts.map(p => p.heroImage));
  updateGrid();

  // Setup Resize Observer
  const ro = new ResizeObserver(() => updateGrid());
  ro.observe(container);

  // Setup Hover Effects via delegation
  container.addEventListener('mouseenter', handleHover, true);
  container.addEventListener('mouseleave', handleHover, true);
}

function updateGrid() {
  const container = document.getElementById('blogsGrid');
  if (!container) return;

  const width = container.offsetWidth;
  const grid = calculateGrid(width);

  // Update container height
  const maxH = Math.max(...grid.map(i => i.y + i.h));
  container.style.height = `${maxH}px`;

  grid.forEach((item, index) => {
    const el = container.querySelector(`[data-key="${item.id}"]`);
    if (!el) return;

    const animationProps = {
      x: item.x,
      y: item.y,
      width: item.w,
      height: item.h,
      duration: 0.6,
      ease: 'power3.out'
    };

    if (!hasMounted) {
      // Entrance Animation
      gsap.fromTo(el, {
        opacity: 0,
        y: window.innerHeight + 100,
        filter: 'blur(10px)'
      }, {
        opacity: 1,
        ...animationProps,
        filter: 'blur(0px)',
        delay: index * 0.05,
        duration: 0.8
      });
    } else {
      // Reflow Animation
      gsap.to(el, animationProps);
    }
  });

  hasMounted = true;
}

function handleHover(e) {
  const item = e.target.closest('.masonry-item');
  if (!item) return;

  const isEnter = e.type === 'mouseenter';

  gsap.to(item, {
    scale: isEnter ? 0.96 : 1,
    duration: 0.3,
    ease: 'power2.out'
  });

  const img = item.querySelector('.masonry-img');
  if (img) {
    gsap.to(img, {
      filter: isEnter ? 'grayscale(0%)' : 'grayscale(100%)',
      duration: 0.4
    });
  }
}

// 2. Reader Functions
window.openReader = function (slug) {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return;

  const reader = document.getElementById('blogReader');
  const readerContainer = reader.querySelector('.reader-container');
  if (!reader) return;

  // Set Content
  document.getElementById('readerCategory').textContent = post.category;
  document.getElementById('readerDate').textContent = post.date;
  document.getElementById('readerTime').textContent = post.readTime || '5 min read';
  document.getElementById('readerTitle').textContent = post.title;
  document.getElementById('readerContent').innerHTML = post.content;
  document.getElementById('readerHero').style.backgroundImage = `url('${post.heroImage}')`;

  // Reset Progress & Interactions
  document.getElementById('readerProgress').style.width = '0%';
  readerContainer.scrollTop = 0;
  document.querySelectorAll('.side-btn').forEach(btn => btn.classList.remove('liked', 'saved'));

  reader.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (window.location.hash !== '#/blog/' + slug) {
    history.pushState(null, null, '#/blog/' + slug);
  }
};

window.closeReader = function () {
  const reader = document.getElementById('blogReader');
  if (reader) reader.classList.remove('active');
  document.body.style.overflow = '';

  if (window.location.hash.startsWith('#/blog/')) {
    history.replaceState(null, null, ' ');
  }
};

// 3. Social & Interaction Logic
window.toggleLike = function (btn) {
  btn.classList.toggle('liked');
};

window.toggleSave = function (btn) {
  btn.classList.toggle('saved');
};

window.toggleShareMenu = function (btn) {
  const menu = document.getElementById('shareMenu');
  menu.classList.toggle('active');
  
  // Close menu when clicking outside
  const closeMenu = (e) => {
    if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      menu.classList.remove('active');
      document.removeEventListener('click', closeMenu);
    }
  };
  if (menu.classList.contains('active')) {
    setTimeout(() => document.addEventListener('click', closeMenu), 10);
  }
};

window.shareTo = function (platform) {
  const slug = window.location.hash.replace('#/blog/', '');
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return;

  const url = window.location.href;
  const text = encodeURIComponent(post.title);
  let shareUrl = '';

  switch (platform) {
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent('Check out this article: ' + post.title + ' — ' + url)}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`;
      break;
    case 'copy':
      navigator.clipboard.writeText(url).then(() => {
        const copyBtn = document.querySelector('.share-option:last-child');
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i data-lucide="check"></i> <span>Copied!</span>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        setTimeout(() => {
          copyBtn.innerHTML = originalHtml;
          if (typeof lucide !== 'undefined') lucide.createIcons();
          document.getElementById('shareMenu').classList.remove('active');
        }, 2000);
      });
      return;
  }

  if (shareUrl) window.open(shareUrl, '_blank');
  document.getElementById('shareMenu').classList.remove('active');
};

// 4. Initialize & Event Listeners
function initBlogs() {
  renderBlogs();
  checkHash();

  window.addEventListener('hashchange', checkHash);

  const closeBtn = document.getElementById('closeReader');
  const overlay = document.getElementById('readerOverlay');
  if (closeBtn) closeBtn.onclick = window.closeReader;
  if (overlay) overlay.onclick = window.closeReader;

  const readerContainer = document.querySelector('.reader-container');
  if (readerContainer) {
    readerContainer.addEventListener('scroll', () => {
      const progressBar = document.getElementById('readerProgress');
      const scrollTotal = readerContainer.scrollHeight - readerContainer.clientHeight;
      const scrollPosition = readerContainer.scrollTop;
      const progress = (scrollPosition / scrollTotal) * 100;
      progressBar.style.width = progress + '%';
    });
  }
}

function checkHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#/blog/')) {
    const slug = hash.replace('#/blog/', '');
    window.openReader(slug);
  } else {
    window.closeReader();
  }
}

// initBlogs();
// Keep reader functionality active
window.addEventListener('load', () => {
  checkHash();
  window.addEventListener('hashchange', checkHash);
  
  const closeBtn = document.getElementById('closeReader');
  const overlay = document.getElementById('readerOverlay');
  if (closeBtn) closeBtn.onclick = window.closeReader;
  if (overlay) overlay.onclick = window.closeReader;

  const readerContainer = document.querySelector('.reader-container');
  if (readerContainer) {
    readerContainer.addEventListener('scroll', () => {
      const progressBar = document.getElementById('readerProgress');
      const scrollTotal = readerContainer.scrollHeight - readerContainer.clientHeight;
      const scrollPosition = readerContainer.scrollTop;
      const progress = (scrollPosition / scrollTotal) * 100;
      progressBar.style.width = progress + '%';
    });
  }
});
