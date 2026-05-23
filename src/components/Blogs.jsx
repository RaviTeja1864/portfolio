import React, { useState } from 'react';
import { blogPosts } from '../data/blogsData';
import BlogReader from './BlogReader';

const Blogs = () => {
  const [activeSlug, setActiveSlug] = useState(null);

  const openReader = (e, slug) => {
    e.preventDefault();
    setActiveSlug(slug);
    if (window.location.hash !== '#/blog/' + slug) {
      window.history.pushState(null, null, '#/blog/' + slug);
    }
  };

  const closeReader = () => {
    setActiveSlug(null);
    if (window.location.hash.startsWith('#/blog/')) {
      window.history.replaceState(null, null, ' ');
    }
  };

  return (
    <section className="blogs" id="blogs">
      <div className="section-container">
        <div className="section-tag">// my_ideology</div>
        <div className="section-header">
          <h2 className="section-title" data-scroll-float>Latest <span className="accent">Insights</span> & Ideology</h2>
          <p className="section-sub" data-scroll-reveal>Exploring the intersection of clean code, AI, and impactful engineering</p>
        </div>

        <div className="menu-wrap">
          <nav className="menu" id="flowingMenu">
            {blogPosts.map(post => (
              <div className="menu__item" key={post.id}>
                <a className="menu__item-link" href={`#/blog/${post.slug}`} onClick={(e) => openReader(e, post.slug)}>
                  {post.title}
                </a>
                <div className="blog-hover-preview">
                  <img src={post.heroImage} alt={post.title} className="preview-img" loading="lazy" />
                  <div className="preview-content">
                    <span className="preview-category">{post.category}</span>
                    <p className="preview-excerpt">{post.excerpt}</p>
                    <div className="preview-meta">
                      <span><i data-lucide="calendar"></i> {post.date || 'May 2026'}</span>
                      <span className="meta-dot">•</span>
                      <span><i data-lucide="clock"></i> {post.readTime || '5 min read'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <BlogReader slug={activeSlug} onClose={closeReader} />
    </section>
  );
};

export default Blogs;
