# Ravi Teja — Portfolio 🚀

A high-performance, modern, and interactive portfolio built with React.js and Vite. It features 3D CSS animations, custom cursors, dynamic components, and heavily optimized WebP assets for a lightning-fast premium user experience.

## 🔗 Live Preview
👉 https://portfolio-raviteja.vercel.app/

## 📂 File Structure

```text
portfolio/
├── src/
│   ├── components/
│   │   ├── Background.jsx      # Global animated 3D background orb grid
│   │   ├── BlogReader.jsx      # Full-screen modal to read blog posts
│   │   ├── Blogs.jsx           # Flowing text menu for latest insights
│   │   ├── Contact.jsx         # Formspree integrated contact form
│   │   ├── Cursor.jsx          # Custom interactive mouse follower
│   │   ├── ErrorBoundary.jsx   # Global error handling for React
│   │   ├── Footer.jsx          # Simple site footer
│   │   ├── Hero.jsx            # Landing section with typewriter effect
│   │   ├── Navbar.jsx          # Glassmorphism top navigation
│   │   ├── ProjectModal.jsx    # Filterable project archive grid
│   │   ├── Projects.jsx        # 3D interactive project carousel
│   │   └── Resume.jsx          # Timeline-based experience section
│   ├── data/
│   │   ├── blogsData.js        # Content data for blogs
│   │   └── projectsData.js     # Content data for projects
│   ├── utils/
│   │   └── animations.js       # Core GSAP scrolling and float animations
│   ├── App.jsx                 # Main layout and animation initiator
│   ├── index.css               # Global styles and design system
│   └── main.jsx                # React DOM entry point
├── public/
│   ├── about.webp              # Highly optimized headshot
│   └── hero.webp               # Highly optimized hero graphic
├── index.html                  # Vite HTML entry point
├── package.json                # Project dependencies
└── vite.config.js              # Vite bundler configuration
```

## 🧩 Key Technologies & Components

This project takes advantage of the following tech stack and libraries:

- **React.js 18**: Core framework for modular, component-based UI.
- **Vite**: Blazing fast build tool and development server.
- **GSAP (GreenSock)**: Used extensively in `animations.js` and `App.jsx` for ScrollTrigger, parallax reveals, and smooth DOM transitions.
- **Lucide React**: Clean, lightweight SVG icon system.
- **Formspree**: Handles the backend submission logic for the `Contact.jsx` form.
- **Vanilla CSS (No Tailwind)**: Advanced CSS techniques used for 3D perspective transforms (`Projects.jsx`), glassmorphism, and custom scrollbars.
