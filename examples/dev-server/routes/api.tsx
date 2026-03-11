import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";

export function meta() {
  return mergeSEOConfig(siteConfig, {
    title: "API Reference",
    description:
      "Complete API reference for react-ssr-seo-toolkit — all functions, components, types, and schema generators.",
    canonical: buildCanonicalUrl(SITE_URL, "/api"),
  });
}

export const handle = { activeRoute: "/api" };

export default function APIReferencePage() {
  return (
    <>
      <div className="page-header">
        <h1>API Reference</h1>
        <p>
          Complete documentation of all functions, components, and types exported
          by react-ssr-seo-toolkit.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>
        {/* Table of Contents */}
        <div className="card card-elevated" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Contents</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.25rem 1.5rem" }}>
            <a href="#config-builders" style={{ fontSize: "0.9rem" }}>Config Builders</a>
            <a href="#metadata-helpers" style={{ fontSize: "0.9rem" }}>Metadata Helpers</a>
            <a href="#robots-helpers" style={{ fontSize: "0.9rem" }}>Robots Helpers</a>
            <a href="#open-graph-twitter" style={{ fontSize: "0.9rem" }}>Open Graph &amp; Twitter</a>
            <a href="#schema-generators" style={{ fontSize: "0.9rem" }}>Schema Generators</a>
            <a href="#components" style={{ fontSize: "0.9rem" }}>React Components</a>
            <a href="#utilities" style={{ fontSize: "0.9rem" }}>Utilities</a>
            <a href="#types" style={{ fontSize: "0.9rem" }}>TypeScript Types</a>
          </div>
        </div>

        {/* Config Builders */}
        <div className="demo-section" id="config-builders">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Config Builders
          </h2>
          <p className="section-subtitle">
            Functions for creating, merging, and normalizing SEO configuration objects.
          </p>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2><code>createSEOConfig(config?)</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              Creates a normalized SEO configuration object. Trims strings, normalizes URLs,
              and removes empty values.
            </p>
            <div className="code-block">
              <pre>{`import { createSEOConfig } from "react-ssr-seo-toolkit";

const config = createSEOConfig({
  titleTemplate: "%s | My Site",
  description: "My site description.",
  openGraph: { siteName: "My Site", type: "website" },
  twitter: { card: "summary_large_image", site: "@mysite" },
});`}</pre>
            </div>
          </div>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2><code>mergeSEOConfig(base, override)</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              Deep-merges two SEO configs. The override's values take precedence.
              Arrays are <strong>replaced</strong>, not concatenated.
            </p>
            <div className="code-block">
              <pre>{`import { mergeSEOConfig } from "react-ssr-seo-toolkit";

const pageConfig = mergeSEOConfig(siteConfig, {
  title: "About",
  description: "About our company.",
  openGraph: { title: "About Us" },
});
// siteConfig's twitter, titleTemplate etc. are preserved
// openGraph is deep-merged (siteName from base + title from override)`}</pre>
            </div>
          </div>

          <div className="card">
            <h2><code>normalizeSEOConfig(config)</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              Trims all string values, normalizes URLs (removes trailing slashes),
              and removes empty/undefined fields. Called internally by <code>createSEOConfig</code>.
            </p>
          </div>
        </div>

        {/* Metadata Helpers */}
        <div className="demo-section" id="metadata-helpers">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Metadata Helpers
          </h2>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>buildTitle(title, template?)</code></td>
                  <td>Applies title template</td>
                  <td><code>buildTitle("About", "%s | Site")</code> → <code>"About | Site"</code></td>
                </tr>
                <tr>
                  <td><code>buildDescription(desc, maxLen?)</code></td>
                  <td>Truncates with ellipsis (default 160 chars)</td>
                  <td><code>buildDescription("Long text...", 100)</code></td>
                </tr>
                <tr>
                  <td><code>buildCanonicalUrl(base, path)</code></td>
                  <td>Combines base URL + path</td>
                  <td><code>buildCanonicalUrl("https://site.com", "/about")</code></td>
                </tr>
                <tr>
                  <td><code>buildAlternateLinks(alternates)</code></td>
                  <td>Builds hreflang link tag data</td>
                  <td><code>{`buildAlternateLinks([{ hreflang: "en", href: "..." }])`}</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Robots */}
        <div className="demo-section" id="robots-helpers">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Robots Helpers
          </h2>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Returns</th>
                  <th>Renders As</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>buildRobotsDirectives(config)</code></td>
                  <td>Robots content string</td>
                  <td><code>"index, follow"</code> (or custom)</td>
                </tr>
                <tr>
                  <td><code>noIndex()</code></td>
                  <td><code>{`{ index: false, follow: true }`}</code></td>
                  <td><code>"noindex, follow"</code></td>
                </tr>
                <tr>
                  <td><code>noIndexNoFollow()</code></td>
                  <td><code>{`{ index: false, follow: false }`}</code></td>
                  <td><code>"noindex, nofollow"</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">RobotsConfig type</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`interface RobotsConfig {
  index?: boolean;        // default: true
  follow?: boolean;       // default: true
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  notranslate?: boolean;
  maxSnippet?: number;           // max-snippet:N
  maxImagePreview?: string;      // max-image-preview:value
  maxVideoPreview?: number;      // max-video-preview:N
}`}</pre>
          </div>
        </div>

        {/* Open Graph & Twitter */}
        <div className="demo-section" id="open-graph-twitter">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Open Graph &amp; Twitter
          </h2>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2><code>buildOpenGraph(config)</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              Builds an array of Open Graph meta tag objects from an <code>OpenGraphConfig</code>.
            </p>
            <div className="code-block">
              <pre>{`const ogTags = buildOpenGraph({
  title: "My Page",
  description: "Page description.",
  url: "https://mysite.com/page",
  siteName: "My Site",
  type: "article",
  locale: "en_US",
  images: [{
    url: "https://mysite.com/image.jpg",
    width: 1200,
    height: 630,
    alt: "Page image",
  }],
});
// Returns array of { property, content } objects`}</pre>
            </div>
          </div>

          <div className="card">
            <h2><code>buildTwitterMetadata(config)</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              Builds an array of Twitter Card meta tag objects.
            </p>
            <div className="code-block">
              <pre>{`const twitterTags = buildTwitterMetadata({
  card: "summary_large_image",
  site: "@mysite",
  creator: "@author",
  title: "My Page",
  description: "Page description.",
  image: "https://mysite.com/image.jpg",
  imageAlt: "Description of image",
});
// Returns array of { name, content } objects`}</pre>
            </div>
          </div>
        </div>

        {/* Schema Generators */}
        <div className="demo-section" id="schema-generators">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            JSON-LD Schema Generators
          </h2>
          <p className="section-subtitle">
            All generators return plain objects with <code>@context: "https://schema.org"</code>.
            Use with the <code>{"<JsonLd>"}</code> component or <code>safeJsonLdSerialize()</code>.
          </p>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Schema Type</th>
                  <th>Key Inputs</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>createOrganizationSchema(input)</code></td>
                  <td>Organization</td>
                  <td>name, url, logo, sameAs, contactPoint</td>
                </tr>
                <tr>
                  <td><code>createWebsiteSchema(input)</code></td>
                  <td>WebSite</td>
                  <td>name, url, description, searchUrl</td>
                </tr>
                <tr>
                  <td><code>createArticleSchema(input)</code></td>
                  <td>Article</td>
                  <td>headline, url, datePublished, author, publisher, images</td>
                </tr>
                <tr>
                  <td><code>createProductSchema(input)</code></td>
                  <td>Product</td>
                  <td>name, url, price, priceCurrency, brand, sku, availability</td>
                </tr>
                <tr>
                  <td><code>createBreadcrumbSchema(items)</code></td>
                  <td>BreadcrumbList</td>
                  <td>{`Array of { name, url }`}</td>
                </tr>
                <tr>
                  <td><code>createFAQSchema(items)</code></td>
                  <td>FAQPage</td>
                  <td>{`Array of { question, answer }`}</td>
                </tr>
                <tr>
                  <td><code>composeSchemas(...schemas)</code></td>
                  <td>@graph</td>
                  <td>Multiple schema objects → single @graph array</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Composing multiple schemas</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  createOrganizationSchema,
  createWebsiteSchema,
  composeSchemas,
  JsonLd,
} from "react-ssr-seo-toolkit";

const org = createOrganizationSchema({ name: "My Co", url: "..." });
const site = createWebsiteSchema({ name: "My Site", url: "..." });

// Combine into a single <script> tag with @graph
const composed = composeSchemas(org, site);

<JsonLd data={composed} />
// Renders: { "@context": "...", "@graph": [org, site] }`}</pre>
          </div>
        </div>

        {/* Components */}
        <div className="demo-section" id="components">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            React Components
          </h2>

          <div className="card" style={{ marginBottom: "1rem" }}>
            <h2><code>{"<SEOHead {...config} />"}</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              SSR-safe component that renders all SEO tags as React elements inside <code>{"<head>"}</code>.
              Renders <code>{"<title>"}</code>, <code>{"<meta>"}</code>, <code>{"<link>"}</code> tags
              for title, description, canonical, robots, Open Graph, Twitter, hreflang, and
              any additional meta/link tags.
            </p>
            <div className="code-block">
              <pre>{`import { SEOHead, mergeSEOConfig } from "react-ssr-seo-toolkit";

const seo = mergeSEOConfig(siteConfig, { title: "My Page" });

<head>
  <meta charSet="utf-8" />
  <SEOHead {...seo} />
  {/* Renders: <title>, <meta>, <link> tags */}
</head>`}</pre>
            </div>
            <div className="callout callout-info" style={{ marginBottom: 0 }}>
              <div className="callout-icon">i</div>
              <div className="callout-content">
                <p>
                  <strong>Props:</strong> All <code>SEOConfig</code> fields plus an optional <code>nonce</code> string
                  for Content Security Policy support on JSON-LD script tags.
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2><code>{"<JsonLd data={schema} nonce? />"}</code></h2>
            <p style={{ marginTop: "0.5rem" }}>
              Renders a single <code>{`<script type="application/ld+json">`}</code> tag with
              safely serialized JSON-LD data. Uses <code>safeJsonLdSerialize</code> internally
              to escape HTML-breaking characters.
            </p>
            <div className="code-block">
              <pre>{`import { JsonLd, createArticleSchema } from "react-ssr-seo-toolkit";

const schema = createArticleSchema({
  headline: "My Post",
  url: "https://mysite.com/post",
  datePublished: "2025-01-01",
  author: [{ name: "Author" }],
});

<head>
  <JsonLd data={schema} />
  {/* Renders: <script type="application/ld+json">...</script> */}
</head>`}</pre>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div className="demo-section" id="utilities">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Utilities
          </h2>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Function</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>safeJsonLdSerialize(data)</code></td>
                  <td>Serializes data to JSON and escapes HTML-breaking characters ({`<, >, &`}) for safe embedding in {`<script>`} tags</td>
                </tr>
                <tr>
                  <td><code>omitEmpty(obj)</code></td>
                  <td>Removes undefined, null, and empty string values from an object</td>
                </tr>
                <tr>
                  <td><code>deepMerge(base, override)</code></td>
                  <td>Recursively merges two objects. Arrays in override replace base arrays</td>
                </tr>
                <tr>
                  <td><code>normalizeUrl(url)</code></td>
                  <td>Trims whitespace and removes trailing slashes from a URL</td>
                </tr>
                <tr>
                  <td><code>buildFullUrl(base, path)</code></td>
                  <td>Alias for <code>buildCanonicalUrl</code> — combines base URL with a path</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Types */}
        <div className="demo-section" id="types">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            TypeScript Types
          </h2>
          <p className="section-subtitle">
            All types are exported from the main entry point. Import what you need for type annotations.
          </p>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Available type exports</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import type {
  // Main config
  SEOConfig,

  // Sub-configs
  OpenGraphConfig,
  OpenGraphImage,
  TwitterConfig,
  RobotsConfig,
  AlternateLink,

  // Schema inputs
  OrganizationSchemaInput,
  WebsiteSchemaInput,
  ArticleSchemaInput,
  ProductSchemaInput,
  FAQItem,
  BreadcrumbItem,
} from "react-ssr-seo-toolkit";`}</pre>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">SEOConfig — main configuration type</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`interface SEOConfig {
  title?: string;
  titleTemplate?: string;        // "%s | Site Name"
  description?: string;
  canonical?: string;
  robots?: RobotsConfig;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  alternates?: AlternateLink[];  // hreflang links
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    hreflang?: string;
    type?: string;
    sizes?: string;
  }>;
  jsonLd?: Record<string, unknown>
    | Array<Record<string, unknown>>;
}`}</pre>
          </div>
        </div>

        {/* Import Paths */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Import Paths
          </h2>
          <p className="section-subtitle">
            Three entry points for tree-shaking optimization.
          </p>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Import</th>
                  <th>Contents</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>"react-ssr-seo-toolkit"</code></td>
                  <td>Everything</td>
                  <td>Default — all types, builders, schemas, components</td>
                </tr>
                <tr>
                  <td><code>"react-ssr-seo-toolkit/schema"</code></td>
                  <td>Schema generators only</td>
                  <td>Lightweight import when you only need JSON-LD</td>
                </tr>
                <tr>
                  <td><code>"react-ssr-seo-toolkit/components"</code></td>
                  <td>React components only</td>
                  <td>When you only need SEOHead and JsonLd</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>This page also has SEO tags.</strong> Right-click → View Page Source
              to see the meta tags generated for this API Reference page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
