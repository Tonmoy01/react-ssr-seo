import React from "react";
import { SEOHead, JsonLd, createSEOConfig } from "../../../src/index.js";

interface DocumentProps {
  children: React.ReactNode;
  pageConfig: ReturnType<typeof createSEOConfig>;
  schemas?: Record<string, unknown>[];
  activeRoute?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/getting-started", label: "Getting Started" },
  { href: "/react-guide", label: "React Guide" },
  { href: "/nextjs-guide", label: "Next.js Guide" },
  { href: "/multi-page", label: "Multi-Page" },
  { href: "/recipes", label: "Recipes" },
  { href: "/common-mistakes", label: "Mistakes & FAQ" },
  { href: "/api", label: "API Reference" },
];

export function Document({ children, pageConfig, schemas, activeRoute }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
        {schemas?.map((s, i) => (
          <JsonLd key={i} data={s} />
        ))}
        <style
          dangerouslySetInnerHTML={{
            __html: CSS_STYLES,
          }}
        />
      </head>
      <body>
        <div id="root">
          {/* Navigation */}
          <nav className="navbar">
            <div className="nav-inner">
              <a href="/" className="nav-brand">
                <span className="nav-logo">{"{ }"}</span>
                <span>react-ssr-seo-toolkit</span>
              </a>
              <div className="nav-links">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`nav-link${activeRoute === link.href ? " nav-link-active" : ""}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="https://github.com/Tonmoy01/react-ssr-seo-toolkit"
                className="nav-github"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </nav>

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="site-footer">
            <div className="container">
              <div className="footer-grid">
                <div className="footer-col">
                  <h4 className="footer-heading">react-ssr-seo-toolkit</h4>
                  <p className="footer-text">
                    Framework-agnostic SEO utilities for React SSR applications.
                    Zero dependencies. Fully typed. SSR-safe.
                  </p>
                </div>
                <div className="footer-col">
                  <h4 className="footer-heading">Documentation</h4>
                  <div className="footer-links">
                    <a href="/getting-started">Getting Started</a>
                    <a href="/react-guide">React Guide</a>
                    <a href="/nextjs-guide">Next.js Guide</a>
                    <a href="/multi-page">Multi-Page Usage</a>
                    <a href="/recipes">Recipes</a>
                    <a href="/common-mistakes">Common Mistakes</a>
                    <a href="/faq-docs">FAQ</a>
                    <a href="/api">API Reference</a>
                  </div>
                </div>
                <div className="footer-col">
                  <h4 className="footer-heading">Live Demos</h4>
                  <div className="footer-links">
                    <a href="/article">Article SEO</a>
                    <a href="/product">Product SEO</a>
                    <a href="/faq">FAQ Schema</a>
                    <a href="/noindex">No-Index</a>
                    <a href="https://github.com/Tonmoy01/react-ssr-seo-toolkit" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.npmjs.com/package/react-ssr-seo-toolkit" target="_blank" rel="noopener noreferrer">npm</a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>MIT License. Built for the React SSR ecosystem.</p>
                <p className="footer-hint">
                  Right-click anywhere and select "View Page Source" to inspect all SEO tags rendered by this library.
                </p>
              </div>
            </div>
          </footer>
        </div>
        <script dangerouslySetInnerHTML={{ __html: CLIENT_NAV_SCRIPT }} />
      </body>
    </html>
  );
}

/* ── Client-side navigation (PJAX-style) ────────────────────── */
const CLIENT_NAV_SCRIPT = `
(function() {
  // Inject copy buttons into all code blocks
  function addCopyButtons() {
    var blocks = document.querySelectorAll('.code-block');
    blocks.forEach(function(block) {
      if (block.querySelector('.copy-btn')) return;
      var header = block.querySelector('.code-header');
      if (!header) return;
      var btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', function() {
        var pre = block.querySelector('pre');
        if (!pre) return;
        var text = pre.textContent || '';
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(function() {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
      header.appendChild(btn);
    });
  }

  function navigate(url) {
    fetch(url)
      .then(function(r) { return r.text(); })
      .then(function(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        document.title = doc.title;

        // Update head meta tags (SEO tags, etc.)
        var oldHead = document.head;
        var newHead = doc.head;
        // Remove old meta/link tags (keep style and script)
        Array.from(oldHead.querySelectorAll('meta, link[rel="canonical"], link[rel="alternate"]'))
          .forEach(function(el) { el.remove(); });
        // Add new meta/link tags
        Array.from(newHead.querySelectorAll('meta, link[rel="canonical"], link[rel="alternate"]'))
          .forEach(function(el) { oldHead.appendChild(el); });

        // Swap page content
        var newRoot = doc.getElementById('root');
        if (newRoot) {
          document.getElementById('root').innerHTML = newRoot.innerHTML;
        }

        // Scroll to top
        window.scrollTo(0, 0);

        // Re-inject copy buttons after content swap
        addCopyButtons();
      });
  }

  // Intercept internal link clicks
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    // Skip external links, new tabs, and modified clicks
    if (link.target === '_blank') return;
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;
    var url = new URL(link.href, location.origin);
    if (url.origin !== location.origin) return;

    // Handle hash/anchor links — manually scroll to target
    var href = link.getAttribute('href');
    if ((url.pathname === location.pathname && url.hash) || (href && href.charAt(0) === '#')) {
      e.preventDefault();
      var hash = url.hash || href;
      var el = document.getElementById(hash.substring(1));
      if (el) {
        var top = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: top, behavior: 'smooth' });
        history.replaceState(null, '', url.pathname + hash);
      }
      return;
    }

    e.preventDefault();
    if (url.pathname === location.pathname) return;
    history.pushState(null, '', url.pathname);
    navigate(url.pathname);
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function() {
    navigate(location.pathname);
  });

  // Copy to clipboard for [data-copy] elements
  document.addEventListener('click', function(e) {
    var el = e.target.closest('[data-copy]');
    if (!el) return;
    var text = el.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(function() {
      el.classList.add('copied');
      setTimeout(function() { el.classList.remove('copied'); }, 2000);
    });
  });

  // Initialize copy buttons on first load
  addCopyButtons();
})();
`;

/* ── CSS ─────────────────────────────────────────────────────── */
const CSS_STYLES = `
/* ── Reset & Base ──────────────────────────────────── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --c-bg: #f8fafc;
  --c-surface: #ffffff;
  --c-surface-alt: #f1f5f9;
  --c-border: #e2e8f0;
  --c-text: #0f172a;
  --c-text-secondary: #64748b;
  --c-text-muted: #94a3b8;
  --c-primary: #6d28d9;
  --c-primary-light: #8b5cf6;
  --c-primary-bg: #ede9fe;
  --c-primary-text: #5b21b6;
  --c-accent: #06b6d4;
  --c-success: #059669;
  --c-success-bg: #d1fae5;
  --c-success-text: #065f46;
  --c-warning-bg: #fef3c7;
  --c-warning-border: #f59e0b;
  --c-code-bg: #1e293b;
  --c-code-text: #e2e8f0;
  --radius: 12px;
  --radius-sm: 8px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  line-height: 1.7;
  color: var(--c-text);
  background: var(--c-bg);
  -webkit-font-smoothing: antialiased;
}

/* ── Layout ────────────────────────────────────────── */
.container { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }
.narrow-container { max-width: 860px; margin: 0 auto; padding: 0 1.5rem; }

/* ── Navigation ────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.97);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.nav-inner {
  width: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  height: 64px;
  gap: 1.5rem;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.05rem;
  white-space: nowrap;
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  font-family: var(--font-mono);
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex: 1;
  overflow-x: auto;
  scrollbar-width: none;
}
.nav-links::-webkit-scrollbar { display: none; }

.nav-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.nav-link:hover { color: #fff; background: rgba(255,255,255,0.08); }

.nav-link-active {
  color: #fff;
  background: rgba(139, 92, 246, 0.25);
}

.nav-github {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.375rem 1rem;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 6px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.nav-github:hover { color: #fff; border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }

/* ── Hero Section ──────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #1e1b4b 100%);
  padding: 5rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(6,182,212,0.1) 0%, transparent 50%);
  animation: heroGlow 15s ease-in-out infinite alternate;
}

@keyframes heroGlow {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-5%, 5%); }
}

.hero-inner { position: relative; z-index: 1; max-width: 800px; margin: 0 auto; }

.hero-badge {
  display: inline-block;
  background: rgba(139,92,246,0.2);
  border: 1px solid rgba(139,92,246,0.3);
  color: #c4b5fd;
  padding: 0.3rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.hero h1 {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 1.25rem;
  letter-spacing: -0.025em;
}

.hero h1 .gradient-text {
  background: linear-gradient(135deg, #a78bfa, #67e8f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.15rem;
  color: #c7d2fe;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  color: #fff;
  box-shadow: 0 4px 14px rgba(109,40,217,0.35);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  box-shadow: 0 6px 20px rgba(109,40,217,0.45);
  transform: translateY(-1px);
}

.btn-secondary {
  background: rgba(255,255,255,0.08);
  color: #e2e8f0;
  border: 1px solid rgba(255,255,255,0.15);
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.12);
  border-color: rgba(255,255,255,0.25);
  transform: translateY(-1px);
}

.hero-install {
  margin-top: 2.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 0.65rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: #a5b4fc;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  position: relative;
}

.hero-install:hover { border-color: rgba(255,255,255,0.25); background: rgba(0,0,0,0.4); }

.hero-install .prompt { color: #67e8f9; }

.hero-install .copy-hint {
  color: rgba(255,255,255,0.4);
  font-size: 0.75rem;
  font-family: var(--font-sans);
  margin-left: 0.5rem;
  transition: opacity 0.2s;
}

.hero-install:hover .copy-hint { color: rgba(255,255,255,0.6); }

.hero-install.copied .copy-hint { display: none; }

.hero-install.copied::after {
  content: 'Copied!';
  color: #34d399;
  font-size: 0.75rem;
  font-family: var(--font-sans);
  margin-left: 0.5rem;
}

/* ── Page Header ───────────────────────────────────── */
.page-header {
  background: linear-gradient(135deg, #1e1b4b, #312e81);
  padding: 3.5rem 1.5rem 3rem;
  margin-bottom: 3rem;
}

.page-header h1 {
  color: #fff;
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  max-width: 800px;
  margin: 0 auto;
}

.page-header p {
  color: #c7d2fe;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0.5rem auto 0;
}

.page-header .page-tags { margin-top: 1rem; max-width: 800px; margin-left: auto; margin-right: auto; }

/* ── Section ───────────────────────────────────────── */
.section { padding: 4rem 0; }
.section-alt { background: var(--c-surface); }

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.section-subtitle {
  color: var(--c-text-secondary);
  font-size: 1.05rem;
  margin-bottom: 2rem;
}

/* ── Cards ─────────────────────────────────────────── */
.card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card-elevated {
  box-shadow: var(--shadow);
}

.card h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 0.5rem;
}

.card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--c-text);
  margin-bottom: 0.35rem;
}

.card p {
  color: var(--c-text-secondary);
  font-size: 0.95rem;
}

/* ── Feature Grid ──────────────────────────────────── */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.feature-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: var(--c-primary-light);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  font-family: var(--font-mono);
  margin-bottom: 1rem;
  color: #fff;
}

.icon-purple { background: linear-gradient(135deg, #7c3aed, #6d28d9); }
.icon-cyan { background: linear-gradient(135deg, #06b6d4, #0891b2); }
.icon-green { background: linear-gradient(135deg, #059669, #047857); }
.icon-orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
.icon-pink { background: linear-gradient(135deg, #ec4899, #db2777); }
.icon-blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }

.feature-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--c-text);
}

.feature-card p {
  color: var(--c-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ── Code Blocks ───────────────────────────────────── */
.code-block {
  background: var(--c-code-bg);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 1rem 0;
  box-shadow: var(--shadow);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.code-header-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
}

.code-header-lang {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #64748b;
  background: rgba(255,255,255,0.06);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 600;
}

.copy-btn {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: #94a3b8;
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-left: auto;
}

.copy-btn:hover {
  background: rgba(255,255,255,0.15);
  color: #e2e8f0;
  border-color: rgba(255,255,255,0.25);
}

.copy-btn.copied {
  background: rgba(52, 211, 153, 0.15);
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.3);
}

/* ── Folder Structure ─────────────────────────────── */
.folder-structure {
  background: var(--c-code-bg);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1rem 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--c-code-text);
  box-shadow: var(--shadow);
}

.folder-structure .folder {
  color: #67e8f9;
  font-weight: 600;
}

.folder-structure .file {
  color: #e2e8f0;
}

.folder-structure .comment {
  color: #64748b;
  font-style: italic;
}

pre {
  padding: 1.25rem;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--c-code-text);
  margin: 0;
}

pre code { background: none; padding: 0; font-size: inherit; }

/* Inline code */
code {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--c-surface-alt);
  color: var(--c-primary);
  padding: 0.15rem 0.45rem;
  border-radius: 5px;
  border: 1px solid var(--c-border);
}

/* ── Tags / Badges ─────────────────────────────────── */
.tag {
  display: inline-block;
  background: var(--c-primary-bg);
  color: var(--c-primary-text);
  padding: 0.2rem 0.65rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0.15rem;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.75rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge-success { background: var(--c-success-bg); color: var(--c-success-text); }
.badge-warning { background: var(--c-warning-bg); color: #92400e; }
.badge-info { background: #dbeafe; color: #1e40af; }

.price {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--c-success);
}

/* ── Callout / Hint ────────────────────────────────── */
.callout {
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.callout-info {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
}

.callout-info .callout-icon { color: #2563eb; }

.callout-warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
}

.callout-warning .callout-icon { color: #d97706; }

.callout-tip {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
}

.callout-tip .callout-icon { color: #16a34a; }

.callout-source {
  background: linear-gradient(135deg, #ede9fe, #dbeafe);
  border: 1px solid #c4b5fd;
}

.callout-icon {
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.callout-content { flex: 1; }
.callout-content p { color: var(--c-text); font-size: 0.9rem; }

/* ── Demo Page Layout ──────────────────────────────── */
.demo-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 0 4rem;
}

@media (min-width: 900px) {
  .demo-layout-side {
    grid-template-columns: 1fr 1fr;
  }
}

.demo-preview { }
.demo-code { }

.demo-section {
  margin-bottom: 2.5rem;
  scroll-margin-top: 5rem;
}

.demo-section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.demo-section-title .step {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  background: var(--c-primary);
  color: #fff;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
}

/* ── Steps ─────────────────────────────────────────── */
.steps {
  list-style: none;
  counter-reset: step;
}

.steps li {
  counter-increment: step;
  padding: 1.25rem 1.5rem 1.25rem 3.5rem;
  position: relative;
  margin-bottom: 0.75rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
}

.steps li::before {
  content: counter(step);
  position: absolute;
  left: 1.25rem;
  top: 1.3rem;
  width: 24px;
  height: 24px;
  background: var(--c-primary);
  color: #fff;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.steps li h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.steps li p {
  color: var(--c-text-secondary);
  font-size: 0.9rem;
}

/* ── Table ─────────────────────────────────────────── */
.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 1rem 0;
}

.api-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  background: var(--c-surface-alt);
  border-bottom: 2px solid var(--c-border);
  font-weight: 700;
  color: var(--c-text);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.api-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--c-border);
  vertical-align: top;
}

.api-table td code {
  white-space: nowrap;
}

.api-table tr:hover td {
  background: rgba(109,40,217,0.02);
}

/* ── Framework Logos Grid ──────────────────────────── */
.framework-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.framework-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--c-text);
  transition: all 0.2s ease;
}

.framework-badge:hover {
  border-color: var(--c-primary-light);
  box-shadow: var(--shadow);
}

/* ── Stats Row ─────────────────────────────────────── */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.stat-card {
  text-align: center;
  padding: 1.25rem;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--c-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--c-text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

/* ── Footer ────────────────────────────────────────── */
.site-footer {
  background: #0f172a;
  color: #94a3b8;
  padding: 3rem 0 2rem;
  margin-top: 4rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.footer-heading {
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.footer-text {
  font-size: 0.85rem;
  line-height: 1.7;
  color: #94a3b8;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.15s;
}

.footer-links a:hover { color: #c4b5fd; }

.footer-bottom {
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.8rem;
}

.footer-hint {
  margin-top: 0.5rem;
  color: #64748b;
  font-style: italic;
}

/* ── Utilities ─────────────────────────────────────── */
a { color: var(--c-primary); }
a:hover { color: var(--c-primary-light); }

.text-center { text-align: center; }
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.gap-1 { gap: 0.5rem; }
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.inline-flex { display: inline-flex; }

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 768px) {
  .hero { padding: 3rem 1rem; }
  .hero h1 { font-size: 1.75rem; }
  .page-header { padding: 2.5rem 1rem 2rem; }
  .page-header h1 { font-size: 1.5rem; }
  .nav-links { display: none; }
  .footer-grid { grid-template-columns: 1fr; }
  .feature-grid { grid-template-columns: 1fr; }
}

/* ── Syntax Highlighting (basic) ───────────────────── */
.kw { color: #c084fc; }   /* keyword: import, from, const, export */
.fn { color: #67e8f9; }   /* function name */
.str { color: #86efac; }  /* string */
.cm { color: #64748b; }   /* comment */
.num { color: #fbbf24; }  /* number */
.prop { color: #93c5fd; } /* property */
.tag { display: inline; background: none; color: #f472b6; padding: 0; margin: 0; border-radius: 0; font-size: inherit; font-weight: inherit; }
.attr { color: #a5b4fc; } /* attribute */
.punc { color: #94a3b8; } /* punctuation */
`;
