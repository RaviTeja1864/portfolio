import React, { useState, useEffect, useRef } from 'react';
import { createIcons, icons } from 'lucide';
import { blogPosts } from '../data/blogsData';

const BlogReader = ({ slug, onClose }) => {
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const readerRef = useRef(null);

  useEffect(() => {
    if (slug) {
      const foundPost = blogPosts.find(p => p.slug === slug);
      setPost(foundPost);
      document.body.style.overflow = 'hidden';
      // Initialize icons
      setTimeout(() => createIcons({ icons }), 100);
    } else {
      document.body.style.overflow = '';
      setPost(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [slug]);

  const handleScroll = () => {
    if (readerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = readerRef.current;
      const scrollTotal = scrollHeight - clientHeight;
      setProgress((scrollTop / scrollTotal) * 100);
    }
  };

  const handleShare = (platform) => {
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
          alert('Copied!');
        });
        return;
      default:
        break;
    }

    if (shareUrl) window.open(shareUrl, '_blank');
    setShareMenuOpen(false);
  };

  if (!post) return null;

  return (
    <div className={`blog-reader ${post ? 'active' : ''}`} id="blogReader">
      <div className="reader-overlay" id="readerOverlay" onClick={onClose}></div>
      <div className="reader-container glass-card" ref={readerRef} onScroll={handleScroll}>
        <div className="reading-progress-bar" id="readerProgress" style={{ width: `${progress}%` }}></div>
        <button className="close-reader" id="closeReader" onClick={onClose}><i data-lucide="x"></i></button>

        <div className="reader-hero" id="readerHero" style={{ backgroundImage: `url('${post.heroImage}')` }}>
          <div className="reader-hero-overlay"></div>
          <div className="reader-hero-content">
            <span className="reader-category" id="readerCategory">{post.category}</span>
            <h2 className="reader-title" id="readerTitle">{post.title}</h2>
            <p className="reader-meta"><span id="readerDate">{post.date}</span> • <span id="readerTime">{post.readTime}</span></p>
          </div>
        </div>

        <div className="reader-layout">
          <aside className="reader-sidebar">
            <button className={`side-btn ${liked ? 'liked' : ''}`} title="Like" onClick={() => setLiked(!liked)}>
              <span className="material-symbols-outlined">favorite</span>
            </button>
            <button className={`side-btn ${saved ? 'saved' : ''}`} title="Bookmark" onClick={() => setSaved(!saved)}>
              <span className="material-symbols-outlined">bookmark</span>
            </button>
            <div className="share-wrapper">
              <button className="side-btn" id="shareBtn" title="Share" onClick={() => setShareMenuOpen(!shareMenuOpen)}>
                <i data-lucide="share-2"></i>
              </button>
              <div className={`share-menu ${shareMenuOpen ? 'active' : ''}`} id="shareMenu">
                <button onClick={() => handleShare('linkedin')} className="share-option">
                  <img src="https://img.icons8.com/color/48/linkedin.png" alt="LinkedIn" /> <span>LinkedIn</span>
                </button>
                <button onClick={() => handleShare('twitter')} className="share-option">
                  <img src="https://img.icons8.com/color/48/twitterx.png" alt="Twitter" /> <span>Twitter</span>
                </button>
                <button onClick={() => handleShare('whatsapp')} className="share-option">
                  <img src="https://img.icons8.com/color/48/whatsapp.png" alt="WhatsApp" /> <span>WhatsApp</span>
                </button>
                <button onClick={() => handleShare('telegram')} className="share-option">
                  <img src="https://img.icons8.com/color/48/telegram-app.png" alt="Telegram" /> <span>Telegram</span>
                </button>
                <button onClick={() => handleShare('copy')} className="share-option">
                  <i data-lucide="copy"></i> <span>Copy Link</span>
                </button>
              </div>
            </div>
          </aside>

          <div className="reader-main">
            <div className="reader-content" id="readerContent" dangerouslySetInnerHTML={{ __html: post.content }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogReader;
