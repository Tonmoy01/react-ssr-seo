import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function ReactGuidePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "React Guide",
    description:
      "Learn how to use react-ssr-seo-toolkit in a React application with Express SSR, including project structure, layouts, and multi-page SEO.",
    canonical: buildCanonicalUrl(SITE_URL, "/react-guide"),
  });

  return (
    <Document pageConfig={pageConfig} activeRoute="/react-guide">
      <div className="page-header">
        <h1>React + Express SSR Guide</h1>
        <p>
          Complete guide to using react-ssr-seo-toolkit in a React application
          with server-side rendering via Express, Fastify, or any Node.js server.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        {/* Overview */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">1</span>
            How it works
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            In a React + Express SSR setup, your Express server renders React components
            to HTML strings using <code>renderToString</code>. The key architecture is:
          </p>
          <ul style={{ color: "#64748b", marginBottom: "1rem", paddingLeft: "1.5rem", lineHeight: "1.9" }}>
            <li><strong>Document component</strong> handles <code>{"<html>"}</code>, <code>{"<head>"}</code>, <code>{"<SEOHead>"}</code>, and <code>{"<body>"}</code></li>
            <li><strong>Page components</strong> only return content and provide SEO config — they never write document-level tags</li>
            <li><strong>Server</strong> matches routes and renders the correct page component</li>
            <li><strong>Shared config</strong> defines site-wide SEO defaults that every page inherits</li>
          </ul>
          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                This is the same Document pattern used by Next.js, Remix, and React Router.
                Your pages focus on content. The Document handles the HTML shell.
              </p>
            </div>
          </div>
        </div>

        {/* Project Structure */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">2</span>
            Project structure
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Here is the recommended file organization. Notice that only the Document
            file deals with <code>{"<html>"}</code> and <code>{"<head>"}</code> tags.
          </p>
          <div className="folder-structure">
            <span className="folder">my-react-app/</span><br />
            {"├── "}<span className="folder">src/</span><br />
            {"│   ├── "}<span className="file">server.tsx</span>{"            "}<span className="comment">{"  # Express entry point, routes"}</span><br />
            {"│   ├── "}<span className="folder">config/</span><br />
            {"│   │   └── "}<span className="file">seo.ts</span>{"            "}<span className="comment">{"  # Site-wide SEO defaults"}</span><br />
            {"│   ├── "}<span className="folder">components/</span><br />
            {"│   │   └── "}<span className="file">Document.tsx</span>{"        "}<span className="comment">{"  # <html>, <head>, <SEOHead>, <body>"}</span><br />
            {"│   └── "}<span className="folder">pages/</span><br />
            {"│       ├── "}<span className="file">HomePage.tsx</span>{"      "}<span className="comment">{"  # Content only — no <html> tags"}</span><br />
            {"│       ├── "}<span className="file">AboutPage.tsx</span>{"     "}<span className="comment">{"  # Content only"}</span><br />
            {"│       ├── "}<span className="file">BlogListPage.tsx</span>{"  "}<span className="comment">{"  # Content only"}</span><br />
            {"│       └── "}<span className="file">BlogPostPage.tsx</span>{"  "}<span className="comment">{"  # Content only + JSON-LD"}</span><br />
            {"├── "}<span className="file">package.json</span><br />
            {"└── "}<span className="file">tsconfig.json</span>
          </div>
        </div>

        {/* Step 3: Shared Config */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">3</span>
            Create shared SEO config
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            This file holds site-wide defaults. Every page inherits these values
            and only overrides what it needs. Create it once, import it everywhere.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">src/config/seo.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import { createSEOConfig } from "react-ssr-seo-toolkit";

// Site-wide SEO defaults — every page inherits these
export const siteConfig = createSEOConfig({
  titleTemplate: "%s | My App",      // %s is replaced with page title
  description: "My React application with great SEO.",
  openGraph: {
    siteName: "My App",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@myapp",
  },
});

export const SITE_URL = "https://myapp.com";`}</pre>
          </div>
          <div className="callout callout-info">
            <div className="callout-icon">i</div>
            <div className="callout-content">
              <p>
                <strong>Why a shared config?</strong> Instead of repeating <code>siteName</code>,{" "}
                <code>twitter.site</code>, etc. on every page, you define them once here.
                Pages only set their own <code>title</code>, <code>description</code>, and <code>canonical</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: Document */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">4</span>
            Create the Document component
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The Document is the <strong>only file</strong> that writes <code>{"<html>"}</code>,{" "}
            <code>{"<head>"}</code>, and <code>{"<body>"}</code>. It receives the page's SEO
            config and optional JSON-LD schemas, and renders everything.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">src/components/Document.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import React from "react";
import { SEOHead, JsonLd } from "react-ssr-seo-toolkit";
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

        {/* All SEO meta tags are rendered here */}
        <SEOHead {...seo} />

        {/* JSON-LD structured data from the page */}
        {schemas?.map((schema, i) => (
          <JsonLd key={i} data={schema} />
        ))}

        <link rel="stylesheet" href="/styles.css" />
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
          <div className="callout callout-warning">
            <div className="callout-icon">!</div>
            <div className="callout-content">
              <p>
                <strong>Important:</strong> Only the Document writes <code>{"<html>"}</code> and{" "}
                <code>{"<head>"}</code>. Page components should never include these tags.
                If you see <code>{"<html>"}</code> inside a page file, that is a mistake.
              </p>
            </div>
          </div>
        </div>

        {/* Step 5: Page Components */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">5</span>
            Write page components
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Each page component follows a simple pattern: merge the site config with
            page-specific SEO, pass it to the Document, and render content.
            <strong> No {"<html>"}, {"<head>"}, or {"<body>"} tags.</strong>
          </p>

          {/* Home Page */}
          <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>Home Page</h3>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">src/pages/HomePage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import React from "react";
import {
  mergeSEOConfig,
  createOrganizationSchema,
  createWebsiteSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function HomePage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: SITE_URL,
    openGraph: {
      title: "My App — Welcome",
      url: SITE_URL,
      images: [{ url: \`\${SITE_URL}/og-home.jpg\`, width: 1200, height: 630 }],
    },
  });

  // JSON-LD schemas for the home page
  const schemas = [
    createOrganizationSchema({
      name: "My App",
      url: SITE_URL,
      logo: \`\${SITE_URL}/logo.png\`,
    }),
    createWebsiteSchema({
      name: "My App",
      url: SITE_URL,
      description: "My React application.",
    }),
  ];

  return (
    <Document seo={seo} schemas={schemas}>
      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
    </Document>
  );
}`}</pre>
          </div>

          {/* About Page */}
          <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>About Page</h3>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">src/pages/AboutPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our mission and team.",
    canonical: buildCanonicalUrl(SITE_URL, "/about"),
    openGraph: {
      title: "About Us — My App",
      description: "Learn about our mission and team.",
      url: buildCanonicalUrl(SITE_URL, "/about"),
    },
  });

  // No JSON-LD needed for a simple about page
  return (
    <Document seo={seo}>
      <h1>About Us</h1>
      <p>Our mission is to build great software.</p>
    </Document>
  );
}`}</pre>
          </div>

          {/* Blog Post */}
          <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>Blog Post with JSON-LD</h3>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">src/pages/BlogPostPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import React from "react";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

// In a real app, this data comes from a database or CMS
const post = {
  title: "Getting Started with SSR SEO",
  excerpt: "Learn how to add SEO to your server-rendered React app.",
  content: "Full article content here...",
  author: "Jane Doe",
  date: "2025-06-15",
  slug: "getting-started-ssr-seo",
};

export function BlogPostPage() {
  const url = buildCanonicalUrl(SITE_URL, \`/blog/\${post.slug}\`);

  const seo = mergeSEOConfig(siteConfig, {
    title: post.title,
    description: post.excerpt,
    canonical: url,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  });

  const schemas = [
    createArticleSchema({
      headline: post.title,
      url,
      datePublished: post.date,
      author: [{ name: post.author }],
      publisher: { name: "My App", logo: \`\${SITE_URL}/logo.png\` },
      images: [\`\${SITE_URL}/images/\${post.slug}.jpg\`],
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: buildCanonicalUrl(SITE_URL, "/blog") },
      { name: post.title, url },
    ]),
  ];

  return (
    <Document seo={seo} schemas={schemas}>
      <article>
        <h1>{post.title}</h1>
        <p>By {post.author} on {post.date}</p>
        <p>{post.content}</p>
      </article>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Step 6: Server */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">6</span>
            Set up the Express server
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The server imports each page component and renders it for the matching route.
            Each page already includes the Document internally, so the server just calls{" "}
            <code>renderToString</code> and sends the result.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">src/server.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { BlogPostPage } from "./pages/BlogPostPage";

const app = express();

// Serve static files (CSS, images, etc.)
app.use(express.static("public"));

// Each page component includes Document internally.
// The server just renders and sends the HTML.
app.get("/", (req, res) => {
  const html = renderToString(<HomePage />);
  res.send(\`<!DOCTYPE html>\${html}\`);
});

app.get("/about", (req, res) => {
  const html = renderToString(<AboutPage />);
  res.send(\`<!DOCTYPE html>\${html}\`);
});

app.get("/blog/:slug", (req, res) => {
  // In a real app, pass req.params.slug to fetch data
  const html = renderToString(<BlogPostPage />);
  res.send(\`<!DOCTYPE html>\${html}\`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});`}</pre>
          </div>
        </div>

        {/* Step 7: Output */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">7</span>
            What gets rendered
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            When a user visits <code>/about</code>, the server renders the AboutPage component.
            Because the Document wraps it, the final HTML output includes all SEO tags:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Final HTML output for /about</span>
              <span className="code-header-lang">HTML</span>
            </div>
            <pre>{`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />

    <!-- Generated by SEOHead -->
    <title>About Us | My App</title>
    <meta name="description" content="Learn about our mission and team." />
    <link rel="canonical" href="https://myapp.com/about" />
    <meta property="og:title" content="About Us — My App" />
    <meta property="og:description" content="Learn about our mission and team." />
    <meta property="og:url" content="https://myapp.com/about" />
    <meta property="og:site_name" content="My App" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@myapp" />

    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <nav><!-- shared navigation --></nav>
    <main>
      <h1>About Us</h1>
      <p>Our mission is to build great software.</p>
    </main>
    <footer><!-- shared footer --></footer>
  </body>
</html>`}</pre>
          </div>
        </div>

        {/* Summary */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Summary
          </h2>
          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Responsibility</th>
                  <th>Writes {"<html>"}?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>config/seo.ts</code></td>
                  <td>Site-wide SEO defaults (title template, OG, Twitter)</td>
                  <td>No</td>
                </tr>
                <tr>
                  <td><code>components/Document.tsx</code></td>
                  <td>HTML shell, {"<head>"}, {"<SEOHead>"}, {"<JsonLd>"}, nav, footer</td>
                  <td><strong>Yes — the only file that does</strong></td>
                </tr>
                <tr>
                  <td><code>pages/*.tsx</code></td>
                  <td>Merge SEO config, create schemas, return content inside Document</td>
                  <td>No — never</td>
                </tr>
                <tr>
                  <td><code>server.tsx</code></td>
                  <td>Match routes, render pages with renderToString, send HTML</td>
                  <td>No (just adds {"<!DOCTYPE html>"})</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Steps */}
        <div className="demo-section">
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="/multi-page" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Multi-Page Usage</h3>
              <p>See a full multi-page app with home, listings, details, and dashboard pages.</p>
            </a>
            <a href="/recipes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Recipes</h3>
              <p>Copy-paste ready examples for common page types.</p>
            </a>
            <a href="/common-mistakes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Common Mistakes</h3>
              <p>Avoid the most frequent errors when setting up SEO.</p>
            </a>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>See it in action:</strong> This entire demo site is built with React + Express SSR
              using react-ssr-seo-toolkit. Right-click → View Page Source on any page to inspect the
              generated SEO tags.
            </p>
          </div>
        </div>
      </div>
    </Document>
  );
}
