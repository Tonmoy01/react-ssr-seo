import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function FAQDocsPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description:
      "Frequently asked questions about react-ssr-seo-toolkit — setup, usage, framework support, and troubleshooting.",
    canonical: buildCanonicalUrl(SITE_URL, "/faq-docs"),
  });

  return (
    <Document pageConfig={pageConfig} activeRoute="/faq-docs">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>
          Common questions about react-ssr-seo-toolkit and how it works.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        {/* General */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            General
          </h2>
        </div>

        <div className="demo-section">
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>What does react-ssr-seo-toolkit do?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              It provides builder functions, React components, and JSON-LD schema generators
              to add complete SEO support to server-rendered React applications. It handles
              meta tags (title, description, canonical), Open Graph tags, Twitter Cards,
              JSON-LD structured data, hreflang links, and robots directives.
            </p>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Does it work with client-side rendered (CSR) apps?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>No, not for SEO purposes.</strong> Search engines read the initial HTML
              response. In a client-side only app (Create React App, Vite SPA without SSR),
              the HTML is mostly empty and JavaScript fills it in later. Search engines may not
              execute your JavaScript reliably. You need server-side rendering (SSR) for SEO
              meta tags to be effective. The toolkit is designed specifically for SSR.
            </p>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>What frameworks does it support?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              It is <strong>framework-agnostic</strong>. It works with any setup that
              server-renders React, including:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "#64748b", lineHeight: "1.9" }}>
              <li><strong>Next.js</strong> — App Router and Pages Router</li>
              <li><strong>React Router 7</strong> — with SSR mode</li>
              <li><strong>Remix</strong></li>
              <li><strong>Express + React</strong> — custom SSR server</li>
              <li><strong>Astro</strong> — with React integration</li>
              <li>Any Node.js server using <code>renderToString</code> or <code>renderToPipeableStream</code></li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Does it have any dependencies?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Zero dependencies.</strong> The only peer dependency is React {">"}= 18.0.0.
              There are no other runtime dependencies.
            </p>
          </div>

          <div className="card">
            <h2>Is it TypeScript only?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              No. The package is written in TypeScript and ships with complete type definitions,
              but it works perfectly in JavaScript projects too. You just don't get type checking
              and autocomplete without TypeScript.
            </p>
          </div>
        </div>

        {/* Setup & Configuration */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Setup &amp; Configuration
          </h2>
        </div>

        <div className="demo-section">
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Where do I put the shared SEO config?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Create a <code>config/seo.ts</code> (or <code>lib/seo.ts</code> in Next.js) file
              at the root of your source directory. This file exports <code>siteConfig</code>{" "}
              (created with <code>createSEOConfig</code>) and <code>SITE_URL</code>. Every
              page imports from this file.
            </p>
            <div className="code-block">
              <pre>{`// config/seo.ts
import { createSEOConfig } from "react-ssr-seo-toolkit";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | My Site",
  openGraph: { siteName: "My Site" },
  twitter: { card: "summary_large_image" },
});

export const SITE_URL = "https://mysite.com";`}</pre>
            </div>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Do I use this in the layout or in each page?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Both, but they do different things:</strong>
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "#64748b", lineHeight: "1.9" }}>
              <li><strong>Document</strong> — Renders <code>{"<SEOHead>"}</code> and <code>{"<JsonLd>"}</code> inside <code>{"<head>"}</code>. This is where the actual HTML tags are generated.</li>
              <li><strong>Page</strong> — Calls <code>mergeSEOConfig</code> to build the SEO config and creates any JSON-LD schemas. Passes these to the Document as props.</li>
            </ul>
            <p style={{ marginTop: "0.5rem", color: "#64748b" }}>
              The page decides <em>what</em> to render. The Document decides <em>where</em> to render it.
            </p>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>How do I reuse SEO config across all pages?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Use <code>mergeSEOConfig(siteConfig, pageOverrides)</code> in every page.
              The site config provides defaults (title template, site name, Twitter handle).
              The page only overrides what it needs (title, description, canonical).
              Everything else is inherited automatically.
            </p>
          </div>

          <div className="card">
            <h2>What is the titleTemplate and how does %s work?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              The <code>titleTemplate</code> is a string like <code>"%s | My Site"</code>.
              When you set <code>title: "About"</code> on a page, <code>buildTitle("About", "%s | My Site")</code>{" "}
              produces <code>"About | My Site"</code>. The <code>%s</code> is replaced with
              the page title. If no template is set, the title is used as-is.
            </p>
          </div>
        </div>

        {/* Framework-Specific */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Framework-Specific
          </h2>
        </div>

        <div className="demo-section">
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>How do I use this with Next.js App Router?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              In Next.js App Router, do <strong>not</strong> use <code>{"<SEOHead>"}</code>.
              Instead, use the builder functions (<code>mergeSEOConfig</code>, <code>buildTitle</code>,{" "}
              <code>buildCanonicalUrl</code>) inside <code>generateMetadata</code> to produce
              Next.js's <code>Metadata</code> format. For JSON-LD, use <code>safeJsonLdSerialize</code>{" "}
              in the page component body. See the <a href="/nextjs-guide">Next.js Guide</a> for details.
            </p>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Can I use {"<SEOHead>"} with Next.js Pages Router?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Yes. In the Pages Router, wrap <code>{"<SEOHead>"}</code> inside Next.js's{" "}
              <code>{"<Head>"}</code> component from <code>next/head</code>:
            </p>
            <div className="code-block">
              <pre>{`import Head from "next/head";
import { SEOHead } from "react-ssr-seo-toolkit";

<Head>
  <SEOHead {...seo} />
</Head>`}</pre>
            </div>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>How does it work with React Router 7?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Place <code>{"<SEOHead>"}</code> in your <code>root.tsx</code> layout. Route
              components return their SEO config via the <code>loader</code> function, and
              the root layout reads it via <code>useMatches</code>. See the{" "}
              <a href="/getting-started">Getting Started</a> guide for the complete React Router example.
            </p>
          </div>

          <div className="card">
            <h2>Does it work with Remix?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Yes. Remix and React Router 7 SSR use the same architecture. The <code>root.tsx</code>{" "}
              layout renders <code>{"<SEOHead>"}</code>, and route components provide SEO data
              via their <code>loader</code> functions.
            </p>
          </div>
        </div>

        {/* Components & Functions */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Components &amp; Functions
          </h2>
        </div>

        <div className="demo-section">
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>What is the difference between {"<SEOHead>"} and {"<JsonLd>"}?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              <code>{"<SEOHead>"}</code> renders meta tags (title, description, OG, Twitter,
              canonical, robots, hreflang). <code>{"<JsonLd>"}</code> renders a single
              JSON-LD <code>{"<script>"}</code> tag for structured data. They serve different
              purposes and are typically used together in the Document.
            </p>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>When should I use the schema generators vs. the components?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Schema generators</strong> (<code>createArticleSchema</code>, <code>createProductSchema</code>, etc.)
              create plain JavaScript objects representing JSON-LD data. <strong>Components</strong>{" "}
              (<code>{"<JsonLd>"}</code>) render those objects as HTML <code>{"<script>"}</code> tags.
              Use the generators to create the data, then pass it to the component for rendering.
            </p>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>What does mergeSEOConfig do exactly?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              It deep-merges two <code>SEOConfig</code> objects. The second argument overrides
              the first. Nested objects (like <code>openGraph</code>) are merged recursively.
              Arrays (like <code>alternates</code>, <code>images</code>) are replaced, not concatenated.
              This means you can set site-wide defaults and only override specific fields per page.
            </p>
          </div>

          <div className="card">
            <h2>What does composeSchemas do?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              <code>composeSchemas(schema1, schema2, ...)</code> combines multiple JSON-LD
              schema objects into a single object with a <code>@graph</code> array. Instead
              of multiple <code>{"<script>"}</code> tags, you get one clean <code>{"<script>"}</code>{" "}
              tag containing all schemas. Both approaches are valid for search engines.
            </p>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Troubleshooting
          </h2>
        </div>

        <div className="demo-section">
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>My meta tags are not showing up in page source</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Check these things in order:
            </p>
            <ol style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "#64748b", lineHeight: "1.9" }}>
              <li>Are you using SSR? Meta tags must be server-rendered. View the page source (not DevTools Elements) to see what the server actually sends.</li>
              <li>Is <code>{"<SEOHead>"}</code> rendered inside <code>{"<head>"}</code> in your Document?</li>
              <li>Are you passing the correct config to <code>{"<SEOHead>"}</code>? Log it to verify.</li>
              <li>In Next.js App Router, are you using <code>generateMetadata</code> instead of <code>{"<SEOHead>"}</code>?</li>
            </ol>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>I see hydration mismatch errors</h2>
            <p style={{ marginTop: "0.5rem" }}>
              react-ssr-seo-toolkit is designed to produce deterministic output with no
              hydration mismatches. If you see hydration errors, check:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "#64748b", lineHeight: "1.9" }}>
              <li>Are you using <code>Date.now()</code> or <code>Math.random()</code> in your SEO config? These produce different values on server and client.</li>
              <li>Are you reading browser-only APIs (<code>window.location</code>) in the SEO config? Use server-provided values instead.</li>
              <li>The toolkit itself does not access any browser globals — the issue is likely in your config values.</li>
            </ul>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2>Google is not showing my JSON-LD rich results</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Rich results (star ratings, FAQ dropdowns, etc.) are not guaranteed even with
              correct JSON-LD. Check:
            </p>
            <ol style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "#64748b", lineHeight: "1.9" }}>
              <li>Validate your JSON-LD with Google's Rich Results Test tool</li>
              <li>Ensure all required fields are present for the schema type</li>
              <li>Google may take days to weeks to process and display rich results</li>
              <li>Not all schema types are eligible for rich results in all regions</li>
            </ol>
          </div>

          <div className="card">
            <h2>Can I use this with Content Security Policy (CSP)?</h2>
            <p style={{ marginTop: "0.5rem" }}>
              Yes. Both <code>{"<SEOHead>"}</code> and <code>{"<JsonLd>"}</code> accept an
              optional <code>nonce</code> prop. Pass your CSP nonce to allow the JSON-LD
              script tags:
            </p>
            <div className="code-block">
              <pre>{`<SEOHead {...seo} nonce={cspNonce} />
<JsonLd data={schema} nonce={cspNonce} />`}</pre>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="demo-section">
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="/getting-started" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Getting Started</h3>
              <p>Step-by-step setup guide.</p>
            </a>
            <a href="/common-mistakes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Common Mistakes</h3>
              <p>Avoid frequent setup errors.</p>
            </a>
            <a href="/api" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>API Reference</h3>
              <p>Complete function and type docs.</p>
            </a>
          </div>
        </div>

      </div>
    </Document>
  );
}
