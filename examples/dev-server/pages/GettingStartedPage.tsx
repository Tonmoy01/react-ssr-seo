import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Layout } from "../components/Layout.js";

export function GettingStartedPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Getting Started",
    description:
      "Learn how to install and use react-ssr-seo to add complete SEO support to your React SSR application.",
    canonical: buildCanonicalUrl(SITE_URL, "/getting-started"),
  });

  return (
    <Layout pageConfig={pageConfig} activeRoute="/getting-started">
      <div className="page-header">
        <h1>Getting Started</h1>
        <p>
          Install react-ssr-seo and add production-ready SEO to your app in minutes.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>
        {/* Installation */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">1</span>
            Installation
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Install the package using your preferred package manager:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">npm</span>
              <span className="code-header-lang">shell</span>
            </div>
            <pre>{`npm install react-ssr-seo`}</pre>
          </div>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">yarn</span>
              <span className="code-header-lang">shell</span>
            </div>
            <pre>{`yarn add react-ssr-seo`}</pre>
          </div>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pnpm</span>
              <span className="code-header-lang">shell</span>
            </div>
            <pre>{`pnpm add react-ssr-seo`}</pre>
          </div>
          <div className="callout callout-info">
            <div className="callout-icon">i</div>
            <div className="callout-content">
              <p>
                <strong>Peer dependency:</strong> React &gt;= 18.0.0 is required.
                The package has zero other dependencies.
              </p>
            </div>
          </div>
        </div>

        {/* Site Config */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">2</span>
            Create a Site Config
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Define shared SEO defaults for your entire site. This config will be merged
            with page-specific overrides.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">config/seo.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import { createSEOConfig } from "react-ssr-seo";

// Shared base config — reused across all pages
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
                <strong>titleTemplate</strong> uses <code>%s</code> as a placeholder.
                When a page sets <code>title: "About"</code>, it renders as{" "}
                <code>About | My Site</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Basic Page */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">3</span>
            Build Your First SEO Page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Use <code>mergeSEOConfig</code> to combine your base config with page-specific
            values, then render with the <code>{"<SEOHead>"}</code> component.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/About.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  SEOHead,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo";

export function AboutPage() {
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

  return (
    <html>
      <head>
        <SEOHead {...seo} />
      </head>
      <body>
        <h1>About Us</h1>
        <p>Our story...</p>
      </body>
    </html>
  );
}`}</pre>
          </div>
          <h3 style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            This generates the following HTML tags:
          </h3>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated &lt;head&gt; output</span>
              <span className="code-header-lang">HTML</span>
            </div>
            <pre>{`<title>About Us | My Site</title>
<meta name="description" content="Learn about our mission and team." />
<link rel="canonical" href="https://mysite.com/about" />
<meta property="og:title" content="About Us — My Site" />
<meta property="og:description" content="Learn about our mission and team." />
<meta property="og:url" content="https://mysite.com/about" />
<meta property="og:site_name" content="My Site" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@mysite" />`}</pre>
          </div>
        </div>

        {/* Adding JSON-LD */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">4</span>
            Add JSON-LD Structured Data
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Use the built-in schema generators to add structured data for rich search results.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Adding article schema</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  createArticleSchema,
  createBreadcrumbSchema,
  JsonLd,
} from "react-ssr-seo";

// In your component:
const articleSchema = createArticleSchema({
  headline: "My Blog Post",
  url: "https://mysite.com/blog/my-post",
  datePublished: "2025-06-15",
  dateModified: "2025-07-01",
  author: [{ name: "Jane Doe", url: "https://mysite.com/authors/jane" }],
  publisher: { name: "My Site", logo: "https://mysite.com/logo.png" },
  images: ["https://mysite.com/images/post.jpg"],
});

const breadcrumb = createBreadcrumbSchema([
  { name: "Home", url: "https://mysite.com" },
  { name: "Blog", url: "https://mysite.com/blog" },
  { name: "My Blog Post", url: "https://mysite.com/blog/my-post" },
]);

// In JSX:
<head>
  <SEOHead {...seo} />
  <JsonLd data={articleSchema} />
  <JsonLd data={breadcrumb} />
</head>`}</pre>
          </div>
        </div>

        {/* Framework Guides */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">5</span>
            Framework Integration
          </h2>

          {/* Next.js */}
          <div className="card card-elevated" style={{ marginBottom: "1rem" }}>
            <h2>Next.js (App Router)</h2>
            <p style={{ marginBottom: "1rem" }}>
              Use the builder functions with <code>generateMetadata</code> and
              render JSON-LD directly in your page component.
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-header-title">app/blog/[slug]/page.tsx</span>
                <span className="code-header-lang">TSX</span>
              </div>
              <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  buildTitle,
  buildOpenGraph,
  createArticleSchema,
  safeJsonLdSerialize,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "@/config/seo";
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  const seo = mergeSEOConfig(siteConfig, {
    title: post.title,
    description: post.excerpt,
    canonical: buildCanonicalUrl(SITE_URL, \`/blog/\${post.slug}\`),
  });

  return {
    title: buildTitle(seo.title!, seo.titleTemplate),
    description: seo.description,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: seo.canonical,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPage({ params }) {
  const post = await getPost(params.slug);

  const schema = createArticleSchema({
    headline: post.title,
    url: buildCanonicalUrl(SITE_URL, \`/blog/\${post.slug}\`),
    datePublished: post.date,
    author: [{ name: post.author }],
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdSerialize(schema),
        }}
      />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}</pre>
            </div>
          </div>

          {/* React Router 7 */}
          <div className="card card-elevated" style={{ marginBottom: "1rem" }}>
            <h2>React Router 7 SSR</h2>
            <p style={{ marginBottom: "1rem" }}>
              Use the <code>{"<SEOHead>"}</code> component in your Document (root layout).
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-header-title">root.tsx</span>
                <span className="code-header-lang">TSX</span>
              </div>
              <pre>{`import { SEOHead, JsonLd, mergeSEOConfig } from "react-ssr-seo";
import { siteConfig } from "./config/seo";

export default function Root() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: "https://mysite.com",
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport"
          content="width=device-width, initial-scale=1" />
        <SEOHead {...seo} />
      </head>
      <body>
        {/* Your app content */}
      </body>
    </html>
  );
}`}</pre>
            </div>
          </div>

          {/* Express */}
          <div className="card card-elevated">
            <h2>Express / Generic SSR</h2>
            <p style={{ marginBottom: "1rem" }}>
              Use <code>renderToString</code> with the SEOHead component for any
              Express-based SSR setup.
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-header-title">server.tsx</span>
                <span className="code-header-lang">TSX</span>
              </div>
              <pre>{`import express from "express";
import { renderToString } from "react-dom/server";
import { SEOHead, mergeSEOConfig } from "react-ssr-seo";
import { siteConfig } from "./config/seo";

const app = express();

app.get("/", (req, res) => {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Home",
  });

  const html = renderToString(
    <html>
      <head>
        <SEOHead {...seo} />
      </head>
      <body>
        <h1>Welcome</h1>
      </body>
    </html>
  );

  res.send(\`<!DOCTYPE html>\${html}\`);
});

app.listen(3000);`}</pre>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">6</span>
            Explore More
          </h2>
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="/article" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Article Demo</h3>
              <p>See Article schema, breadcrumbs, and Twitter cards in action.</p>
            </a>
            <a href="/product" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Product Demo</h3>
              <p>Product schema with pricing, ratings, and availability.</p>
            </a>
            <a href="/faq" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>FAQ Demo</h3>
              <p>FAQPage schema that appears as rich results in Google.</p>
            </a>
            <a href="/api" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>API Reference</h3>
              <p>Complete documentation of all functions and types.</p>
            </a>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>This very page has SEO tags!</strong> Right-click and select "View
              Page Source" to see the title template, description, canonical URL,
              Open Graph, and Twitter Card meta tags generated by react-ssr-seo.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
