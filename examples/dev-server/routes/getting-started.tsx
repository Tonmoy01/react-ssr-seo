import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";

export function meta() {
  return mergeSEOConfig(siteConfig, {
    title: "Getting Started",
    description:
      "Learn how to install and use react-ssr-seo-toolkit to add complete SEO support to your React SSR application.",
    canonical: buildCanonicalUrl(SITE_URL, "/getting-started"),
  });
}

export const handle = { activeRoute: "/getting-started" };

export default function GettingStartedPage() {
  return (
    <>
      <div className="page-header">
        <h1>Getting Started</h1>
        <p>
          Add production-ready SEO to your React SSR app in under 5 minutes.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        {/* Step 1: Install */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">1</span>
            Install the package
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Pick your package manager and run one command:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">npm</span>
              <span className="code-header-lang">shell</span>
            </div>
            <pre>{`npm install react-ssr-seo-toolkit`}</pre>
          </div>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">yarn</span>
              <span className="code-header-lang">shell</span>
            </div>
            <pre>{`yarn add react-ssr-seo-toolkit`}</pre>
          </div>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pnpm</span>
              <span className="code-header-lang">shell</span>
            </div>
            <pre>{`pnpm add react-ssr-seo-toolkit`}</pre>
          </div>
          <div className="callout callout-info">
            <div className="callout-icon">i</div>
            <div className="callout-content">
              <p>
                <strong>Peer dependency:</strong> React &gt;= 18.0.0 is required.
                Zero other dependencies.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Project Structure */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">2</span>
            Recommended project structure
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Here's a typical folder layout. The key idea:{" "}
            <strong>pages never write {"<html>"} or {"<head>"} tags</strong> — that's handled
            by the Document component, just like in Next.js or any modern React framework.
          </p>
          <div className="folder-structure">
            <span className="folder">my-app/</span><br />
            {"├── "}<span className="folder">config/</span><br />
            {"│   └── "}<span className="file">seo.ts</span>{"            "}<span className="comment">{"  # Site-wide SEO defaults"}</span><br />
            {"├── "}<span className="folder">components/</span><br />
            {"│   └── "}<span className="file">Document.tsx</span>{"       "}<span className="comment">{"  # Handles <html>, <head>, <SEOHead>, <body>"}</span><br />
            {"├── "}<span className="folder">pages/</span><br />
            {"│   ├── "}<span className="file">HomePage.tsx</span>{"      "}<span className="comment">{"  # Just content + SEO config"}</span><br />
            {"│   ├── "}<span className="file">AboutPage.tsx</span>{"    "}<span className="comment">{"  # No <html> tags here!"}</span><br />
            {"│   └── "}<span className="file">BlogPost.tsx</span><br />
            {"├── "}<span className="file">server.tsx</span>{"           "}<span className="comment">{"  # Express / SSR entry point"}</span><br />
            {"└── "}<span className="file">package.json</span>
          </div>
          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                This is the same pattern used by Next.js (<code>layout.tsx</code>),
                Remix (<code>root.tsx</code>), and React Router (<code>Root</code> component).
                Your pages only return content — the Document handles the HTML shell.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Site Config */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">3</span>
            Create a shared SEO config
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            This file holds defaults that every page inherits. Pages override only
            what they need.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">config/seo.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import { createSEOConfig } from "react-ssr-seo-toolkit";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | My Site",
  description: "Default site description for SEO.",
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
          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                <code>titleTemplate</code> uses <code>%s</code> as a placeholder.{" "}
                Setting <code>title: "About"</code> on a page renders as{" "}
                <code>About | My Site</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3.5: Document Component */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">3.5</span>
            Create a Document component
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The Document handles <code>{"<html>"}</code>, <code>{"<head>"}</code>,{" "}
            <code>{"<SEOHead>"}</code>, and <code>{"<body>"}</code> so your pages never have to.
            This is the same pattern used by Next.js <code>layout.tsx</code>, Remix <code>root.tsx</code>,
            and React Router's root component.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">components/Document.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import { SEOHead, JsonLd } from "react-ssr-seo-toolkit";
import type { SEOConfig } from "react-ssr-seo-toolkit";

interface DocumentProps {
  children: React.ReactNode;
  seo: SEOConfig;
  schemas?: Record<string, unknown>[];
}

export function Document({ children, seo, schemas }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* SEO tags are rendered here — pages don't need to */}
        <SEOHead {...seo} />

        {/* Render any JSON-LD schemas passed by the page */}
        {schemas?.map((schema, i) => (
          <JsonLd key={i} data={schema} />
        ))}
      </head>
      <body>
        <nav>{/* Your shared navigation */}</nav>
        <main>{children}</main>
        <footer>{/* Your shared footer */}</footer>
      </body>
    </html>
  );
}`}</pre>
          </div>
          <div className="callout callout-info">
            <div className="callout-icon">i</div>
            <div className="callout-content">
              <p>
                <strong>Key concept:</strong> The Document is the only file that writes{" "}
                <code>{"<html>"}</code> and <code>{"<head>"}</code>. Every page just provides
                its SEO config and content — the Document renders everything else.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: First Page */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">4</span>
            Build your first SEO page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Notice: <strong>no {"<html>"} or {"<head>"} tags here!</strong> The page just
            provides its SEO config and content. The Document handles the rest.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/AboutPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import { mergeSEOConfig, buildCanonicalUrl } from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function AboutPage() {
  // Merge site defaults with page-specific SEO
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our mission and team.",
    canonical: buildCanonicalUrl(SITE_URL, "/about"),
    openGraph: {
      title: "About Us — My Site",
      description: "Learn about our mission and team.",
      url: buildCanonicalUrl(SITE_URL, "/about"),
    },
  });

  // The Document renders <html>, <head>, <SEOHead>, and <body>
  // You only write your page content here
  return (
    <Document seo={seo}>
      <h1>About Us</h1>
      <p>Our story...</p>
    </Document>
  );
}`}</pre>
          </div>

          <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            How it works together:
          </h3>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The Document receives your SEO config and renders the full HTML document.
            Here's what the final output looks like:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Final HTML output</span>
              <span className="code-header-lang">HTML</span>
            </div>
            <pre>{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />

    <!-- Generated by SEOHead via Document -->
    <title>About Us | My Site</title>
    <meta name="description" content="Learn about our mission and team." />
    <link rel="canonical" href="https://mysite.com/about" />
    <meta property="og:title" content="About Us — My Site" />
    <meta property="og:description" content="Learn about our mission and team." />
    <meta property="og:url" content="https://mysite.com/about" />
    <meta property="og:site_name" content="My Site" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@mysite" />
  </head>
  <body>
    <nav><!-- shared navigation --></nav>
    <main>
      <h1>About Us</h1>
      <p>Our story...</p>
    </main>
    <footer><!-- shared footer --></footer>
  </body>
</html>`}</pre>
          </div>
        </div>

        {/* Step 5: JSON-LD */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">5</span>
            Add JSON-LD structured data
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Structured data helps Google show rich results (star ratings, FAQs,
            breadcrumbs, etc). Pass schemas to the Document — it renders them inside{" "}
            <code>{"<head>"}</code> for you:
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
  createBreadcrumbSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function BlogPost() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "My Blog Post",
    description: "A short summary of the post.",
    canonical: buildCanonicalUrl(SITE_URL, "/blog/my-post"),
  });

  // Create structured data schemas
  const articleSchema = createArticleSchema({
    headline: "My Blog Post",
    url: buildCanonicalUrl(SITE_URL, "/blog/my-post"),
    datePublished: "2025-06-15",
    dateModified: "2025-07-01",
    author: [
      { name: "Jane Doe", url: "https://mysite.com/authors/jane" },
    ],
    publisher: {
      name: "My Site",
      logo: "https://mysite.com/logo.png",
    },
    images: ["https://mysite.com/images/post.jpg"],
  });

  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: "https://mysite.com" },
    { name: "Blog", url: "https://mysite.com/blog" },
    { name: "My Blog Post", url: "https://mysite.com/blog/my-post" },
  ]);

  // Pass schemas to Document — it renders them in <head>
  return (
    <Document seo={seo} schemas={[articleSchema, breadcrumb]}>
      <article>
        <h1>My Blog Post</h1>
        <p>Post content here...</p>
      </article>
    </Document>
  );
}`}</pre>
          </div>
          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                Notice how the page never touches <code>{"<html>"}</code>,{" "}
                <code>{"<head>"}</code>, or <code>{"<SEOHead>"}</code> directly.
                It just defines <em>what</em> SEO data it needs — the Document handles <em>where</em> it goes.
              </p>
            </div>
          </div>
        </div>

        {/* Step 6: Framework Integration */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">6</span>
            Framework integration
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Every framework has a "layout" concept. The toolkit works with all of them.
            Choose your framework for a detailed guide:
          </p>

          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginBottom: "1.5rem" }}>
            <a href="/react-guide" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-blue">RC</div>
              <h3>React + Express SSR Guide</h3>
              <p>
                Complete guide with project structure, Document component, multi-page
                examples, server setup, and rendered HTML output.
              </p>
            </a>
            <a href="/nextjs-guide" className="feature-card" style={{ textDecoration: "none" }}>
              <div className="feature-icon icon-purple">NX</div>
              <h3>Next.js Integration Guide</h3>
              <p>
                App Router with generateMetadata, Pages Router with {"<Head>"}, dynamic
                routes, JSON-LD, and reusable metadata helpers.
              </p>
            </a>
          </div>

          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Here's a quick overview of how the pattern maps to each framework:
          </p>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Framework</th>
                  <th>Where {"<SEOHead>"} goes</th>
                  <th>Where JSON-LD goes</th>
                  <th>Guide</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Express SSR</strong></td>
                  <td>Document component (<code>{"<head>"}</code>)</td>
                  <td>Document component (<code>{"<head>"}</code>)</td>
                  <td><a href="/react-guide">React Guide</a></td>
                </tr>
                <tr>
                  <td><strong>Next.js App Router</strong></td>
                  <td>Not used — use <code>generateMetadata</code></td>
                  <td>Page body via <code>safeJsonLdSerialize</code></td>
                  <td><a href="/nextjs-guide">Next.js Guide</a></td>
                </tr>
                <tr>
                  <td><strong>Next.js Pages Router</strong></td>
                  <td>Inside <code>{"<Head>"}</code> from <code>next/head</code></td>
                  <td>Inside <code>{"<Head>"}</code> or page body</td>
                  <td><a href="/nextjs-guide">Next.js Guide</a></td>
                </tr>
                <tr>
                  <td><strong>React Router 7</strong></td>
                  <td><code>root.tsx</code> layout (<code>{"<head>"}</code>)</td>
                  <td><code>root.tsx</code> layout (<code>{"<head>"}</code>)</td>
                  <td><a href="/react-guide">React Guide</a></td>
                </tr>
                <tr>
                  <td><strong>Remix</strong></td>
                  <td><code>root.tsx</code> layout (<code>{"<head>"}</code>)</td>
                  <td><code>root.tsx</code> layout (<code>{"<head>"}</code>)</td>
                  <td><a href="/react-guide">React Guide</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Explore More */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">7</span>
            Explore more
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Continue learning with detailed guides and examples:
          </p>
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="/multi-page" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Multi-Page Usage</h3>
              <p>See a full app with home, listings, details, blog, and dashboard pages.</p>
            </a>
            <a href="/recipes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Recipes</h3>
              <p>Copy-paste ready code for 10+ common page types.</p>
            </a>
            <a href="/common-mistakes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Common Mistakes</h3>
              <p>Avoid the most frequent SEO setup errors with clear examples.</p>
            </a>
            <a href="/faq-docs" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>FAQ</h3>
              <p>Answers to common questions about frameworks, SSR, and components.</p>
            </a>
            <a href="/api" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>API Reference</h3>
              <p>Complete docs for every function, component, and type.</p>
            </a>
            <a href="/article" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Live Demos</h3>
              <p>Article, Product, FAQ, and No-Index pages with real SEO tags.</p>
            </a>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>This very page has SEO tags!</strong> Right-click and select "View
              Page Source" to inspect the meta tags generated by react-ssr-seo-toolkit.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
