/* ===== BLENDED BLOG LIST - WITH ID CARD PREVIEW ===== */

class BlogList {
  constructor(containerId, posts) {
    this.container = document.getElementById(containerId);
    this.posts = posts;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    console.log('Rendering blog list with', this.posts.length, 'posts');
    this.container.innerHTML = this.posts.map(post => `
      <div class="menu__item">
        <a class="menu__item-link" href="#/blog/${post.slug}" onclick="window.openReader('${post.slug}')">
          ${post.title}
        </a>
        <div class="blog-hover-preview">
          <img src="${post.heroImage}" alt="${post.title}" class="preview-img" loading="lazy">
          <div class="preview-content">
            <span class="preview-category">${post.category}</span>
            <p class="preview-excerpt">${post.excerpt}</p>
            <div class="preview-meta">
              <span><i data-lucide="calendar"></i> ${post.date || 'May 2026'}</span>
              <span class="meta-dot">•</span>
              <span><i data-lucide="clock"></i> ${post.readTime || '5 min read'}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
    
    // Refresh icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

window.addEventListener('load', () => {
  const menuContainer = document.getElementById('flowingMenu');
  if (menuContainer && typeof blogPosts !== 'undefined') {
    new BlogList('flowingMenu', blogPosts);
  }
});
