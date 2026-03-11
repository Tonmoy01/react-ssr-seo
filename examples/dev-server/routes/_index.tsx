import React from "react";
import {
  mergeSEOConfig,
  createOrganizationSchema,
  createWebsiteSchema,
} from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";

// meta function
export function meta() {
  return mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: SITE_URL,
    openGraph: {
      title: "react-ssr-seo-toolkit — SEO Utilities for React SSR",
      url: SITE_URL,
      images: [
        {
          url: `${SITE_URL}/og-home.jpg`,
          width: 1200,
          height: 630,
          alt: "react-ssr-seo-toolkit",
        },
      ],
    },
    alternates: [
      { hreflang: "en", href: SITE_URL },
      { hreflang: "es", href: `${SITE_URL}/es` },
      { hreflang: "fr", href: `${SITE_URL}/fr` },
    ],
  });
}

export const handle = {
  activeRoute: "/",
  schemas: [
    createOrganizationSchema({
      name: "react-ssr-seo-toolkit",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        "https://github.com/Tonmoy01/react-ssr-seo-toolkit",
        "https://www.npmjs.com/package/react-ssr-seo-toolkit",
      ],
    }),
    createWebsiteSchema({
      name: "react-ssr-seo-toolkit",
      url: SITE_URL,
      description: "Framework-agnostic SEO utilities for React SSR applications.",
      searchUrl: `${SITE_URL}/search`,
    }),
  ],
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">Open Source &middot; MIT License</div>
          <h1>
            Complete SEO for
            <br />
            <span className="gradient-text">React SSR Applications</span>
          </h1>
          <p className="hero-desc">
            Meta tags, Open Graph, Twitter Cards, JSON-LD structured data,
            canonical URLs, hreflang, and robots directives — all in one
            zero-dependency, fully-typed, SSR-safe package.
          </p>
          <div className="hero-actions">
            <a href="/getting-started" className="btn btn-primary">
              Get Started
            </a>
            <a href="/api" className="btn btn-secondary">
              API Reference
            </a>
          </div>
          <div className="hero-install" data-copy="npm install react-ssr-seo-toolkit" title="Click to copy">
            <span className="prompt">$</span>
            <span>npm install react-ssr-seo-toolkit</span>
            <span className="copy-hint">click to copy</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-value">0</div>
              <div className="stat-label">Dependencies</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">100%</div>
              <div className="stat-label">TypeScript</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">SSR</div>
              <div className="stat-label">Safe</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">6+</div>
              <div className="stat-label">Frameworks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-3">
            <h2 className="section-title">Everything You Need for SEO</h2>
            <p className="section-subtitle">
              One library to handle all your SEO requirements in server-rendered
              React applications.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon icon-purple">OG</div>
              <h3>Open Graph &amp; Twitter Cards</h3>
              <p>
                Generate rich social sharing previews with full Open Graph and
                Twitter Card meta tag support. Control titles, descriptions,
                images, and card types.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-cyan">LD</div>
              <h3>JSON-LD Structured Data</h3>
              <p>
                Built-in schema generators for Organization, Website, Article,
                Product, FAQ, and Breadcrumb. Compose multiple schemas with
                @graph support.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-green">{"<>"}</div>
              <h3>React Components</h3>
              <p>
                Drop-in {"<SEOHead>"} and {"<JsonLd>"} components that render
                all SEO tags as React elements. No dangerouslySetInnerHTML
                needed for meta tags.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-orange">URL</div>
              <h3>Canonical &amp; Hreflang</h3>
              <p>
                Build canonical URLs, manage hreflang alternate links for
                multi-language sites, and control search engine crawling with
                fine-grained robots directives.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-pink">TS</div>
              <h3>Fully Typed</h3>
              <p>
                Complete TypeScript definitions for all functions, components,
                and configuration objects. Autocomplete-friendly with detailed
                JSDoc comments.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-blue">FW</div>
              <h3>Framework Agnostic</h3>
              <p>
                Works with Next.js (App &amp; Pages Router), React Router 7,
                Express, Remix, Astro, Solid, and any SSR setup. No framework
                lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-3">
            <h2 className="section-title">Quick Start</h2>
            <p className="section-subtitle">
              Get up and running in under 2 minutes.
            </p>
          </div>
          <div className="narrow-container">
            <ol className="steps">
              <li>
                <h3>Install the package</h3>
                <div className="code-block">
                  <pre>{`npm install react-ssr-seo-toolkit`}</pre>
                </div>
              </li>
              <li>
                <h3>Create your site config</h3>
                <p>
                  Define shared defaults once — title template, site name, Twitter handle, etc.
                </p>
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-header-title">config/seo.ts</span>
                    <span className="code-header-lang">TypeScript</span>
                  </div>
                  <pre>{`import { createSEOConfig } from "react-ssr-seo-toolkit";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | My Site",
  description: "My awesome website.",
  openGraph: {
    siteName: "My Site",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mysite",
  },
});

export const SITE_URL = "https://mysite.com";`}</pre>
                </div>
              </li>
              <li>
                <h3>Use it in your pages</h3>
                <p>
                  Each page merges its SEO config with the site defaults, then
                  renders inside the Document. The page never writes{" "}
                  <code>{"<html>"}</code> or <code>{"<head>"}</code> — the Document
                  handles that.
                </p>
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-header-title">pages/BlogPost.tsx</span>
                    <span className="code-header-lang">TSX</span>
                  </div>
                  <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function BlogPost() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "My First Post",
    description: "An introduction to react-ssr-seo-toolkit.",
    canonical: buildCanonicalUrl(SITE_URL, "/blog/my-first-post"),
  });

  const schema = createArticleSchema({
    headline: "My First Post",
    url: buildCanonicalUrl(SITE_URL, "/blog/my-first-post"),
    datePublished: "2025-06-15",
    author: [{ name: "Your Name" }],
  });

  // Document renders <html>, <head>, <SEOHead>, <JsonLd>, <body>
  // This page just provides config and content
  return (
    <Document seo={seo} schemas={[schema]}>
      <h1>My First Post</h1>
      <p>Post content goes here...</p>
    </Document>
  );
}`}</pre>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Framework Support */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-3">
            <h2 className="section-title">Works With Your Framework</h2>
            <p className="section-subtitle">
              Designed to integrate seamlessly into any React SSR setup.
            </p>
          </div>
          <div className="framework-grid">
            <div className="framework-badge">Next.js</div>
            <div className="framework-badge">React Router 7</div>
            <div className="framework-badge">Remix</div>
            <div className="framework-badge">Express SSR</div>
            <div className="framework-badge">Astro</div>
            <div className="framework-badge">Solid</div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-3">
            <h2 className="section-title">Comprehensive Documentation</h2>
            <p className="section-subtitle">
              Detailed guides for every framework and use case.
            </p>
          </div>
          <div className="feature-grid">
            <a href="/react-guide" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-blue">RC</div>
              <h3>React Guide</h3>
              <p>
                Complete React + Express SSR setup with project structure,
                Document pattern, and multi-page examples.
              </p>
            </a>
            <a href="/nextjs-guide" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-purple">NX</div>
              <h3>Next.js Guide</h3>
              <p>
                App Router and Pages Router integration with generateMetadata,
                dynamic routes, and JSON-LD.
              </p>
            </a>
            <a href="/multi-page" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-cyan">MP</div>
              <h3>Multi-Page Usage</h3>
              <p>
                Real-world patterns for home, listing, detail, blog, FAQ,
                and dashboard pages.
              </p>
            </a>
            <a href="/recipes" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-green">CP</div>
              <h3>Recipes</h3>
              <p>
                Copy-paste ready code for blogs, products, FAQs, multi-language,
                custom tags, and more.
              </p>
            </a>
            <a href="/common-mistakes" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-orange">GM</div>
              <h3>Common Mistakes</h3>
              <p>
                Avoid the 10 most common errors: wrong file placement,
                duplicate tags, missing canonicals, and more.
              </p>
            </a>
            <a href="/faq-docs" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-pink">FQ</div>
              <h3>FAQ</h3>
              <p>
                Answers about framework support, SSR requirements,
                component usage, and troubleshooting.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Live Demos */}
      <section className="section section-alt">
        <div className="container">
          <div className="text-center mb-3">
            <h2 className="section-title">Explore Live Demos</h2>
            <p className="section-subtitle">
              Each page below is a fully working example. View the page source to
              inspect the generated SEO tags.
            </p>
          </div>
          <div className="feature-grid">
            <a href="/article" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-purple">ART</div>
              <h3>Article Page</h3>
              <p>
                Article schema with multiple authors, breadcrumbs, OG article
                type, and Twitter creator card.
              </p>
            </a>
            <a href="/product" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-cyan">PRD</div>
              <h3>Product Page</h3>
              <p>
                Product schema with pricing, brand, availability,
                AggregateRating, and breadcrumbs.
              </p>
            </a>
            <a href="/faq" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-green">FAQ</div>
              <h3>FAQ Page</h3>
              <p>
                FAQPage schema with question/answer pairs that appear as rich
                results in Google Search.
              </p>
            </a>
            <a href="/noindex" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-orange">ROB</div>
              <h3>No-Index Page</h3>
              <p>
                Robots noindex directive for internal pages that should not
                appear in search results.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Source View CTA */}
      <section className="section section-alt">
        <div className="container">
          <div className="callout callout-source">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                <strong>Right-click on any page and select "View Page Source"</strong>{" "}
                to see all the SEO meta tags, Open Graph tags, Twitter Card tags,
                hreflang links, canonical URLs, robots directives, and JSON-LD
                structured data that this library generates. Every page in this
                demo is a real working example.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
