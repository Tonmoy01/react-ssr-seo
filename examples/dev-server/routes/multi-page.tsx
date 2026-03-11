import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";

export function meta() {
  return mergeSEOConfig(siteConfig, {
    title: "Multi-Page Usage",
    description:
      "Learn how to use react-ssr-seo-toolkit across multiple pages with shared config, page-specific SEO, dynamic data, and reusable patterns.",
    canonical: buildCanonicalUrl(SITE_URL, "/multi-page"),
  });
}

export const handle = { activeRoute: "/multi-page" };

export default function MultiPageUsagePage() {
  return (
    <>
      <div className="page-header">
        <h1>Multi-Page Application Usage</h1>
        <p>
          How to manage SEO across an entire application with multiple page types,
          shared configuration, and reusable patterns.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        {/* Overview */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            The pattern
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            In a real application, you have many different page types — home, listing, detail,
            dashboard, etc. Each needs different SEO data. The toolkit makes this easy with
            a three-layer approach:
          </p>
          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>What it does</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Site config</strong></td>
                  <td>Defaults inherited by every page</td>
                  <td>Title template, site name, Twitter handle</td>
                </tr>
                <tr>
                  <td><strong>2. Page config</strong></td>
                  <td>Overrides for a specific page</td>
                  <td>Title, description, canonical URL, OG image</td>
                </tr>
                <tr>
                  <td><strong>3. Structured data</strong></td>
                  <td>JSON-LD schemas for rich results</td>
                  <td>Article, Product, FAQ, Breadcrumb</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Example App */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Example: E-commerce application
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Here's a complete multi-page e-commerce app. All pages use the same shared config.
          </p>
        </div>

        {/* Shared Config */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">1</span>
            Shared config (used by all pages)
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">config/seo.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import { createSEOConfig } from "react-ssr-seo-toolkit";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | ShopMax",
  description: "Shop the best products online at ShopMax.",
  openGraph: {
    siteName: "ShopMax",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopmax",
  },
});

export const SITE_URL = "https://shopmax.com";`}</pre>
          </div>
        </div>

        {/* Home Page */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">2</span>
            Home page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The home page uses Organization and WebSite schemas for brand presence in search.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/HomePage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
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
      title: "ShopMax — Shop the Best Products Online",
      url: SITE_URL,
      images: [{ url: \`\${SITE_URL}/og-home.jpg\`, width: 1200, height: 630 }],
    },
  });

  const schemas = [
    createOrganizationSchema({
      name: "ShopMax",
      url: SITE_URL,
      logo: \`\${SITE_URL}/logo.png\`,
      sameAs: [
        "https://twitter.com/shopmax",
        "https://facebook.com/shopmax",
      ],
    }),
    createWebsiteSchema({
      name: "ShopMax",
      url: SITE_URL,
      description: "Shop the best products online.",
      searchUrl: \`\${SITE_URL}/search?q={search_term_string}\`,
    }),
  ];

  return (
    <Document seo={seo} schemas={schemas}>
      <h1>Welcome to ShopMax</h1>
      <p>Featured products, promotions, etc.</p>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Category Listing */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">3</span>
            Category / listing page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Listing pages show a collection of items with breadcrumb navigation.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/CategoryPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createBreadcrumbSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function CategoryPage({ category }) {
  const url = buildCanonicalUrl(SITE_URL, \`/category/\${category.slug}\`);

  const seo = mergeSEOConfig(siteConfig, {
    title: category.name,
    description: \`Browse \${category.productCount} \${category.name} products.\`,
    canonical: url,
    openGraph: {
      title: \`\${category.name} — ShopMax\`,
      description: category.description,
      url,
    },
  });

  const schemas = [
    createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: category.name, url },
    ]),
  ];

  return (
    <Document seo={seo} schemas={schemas}>
      <h1>{category.name}</h1>
      <p>{category.productCount} products</p>
      {/* Product grid */}
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Product Detail */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">4</span>
            Product detail page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Product pages need the richest SEO — product schema with pricing,
            ratings, availability, plus breadcrumbs.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/ProductPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createProductSchema,
  createBreadcrumbSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function ProductPage({ product }) {
  const url = buildCanonicalUrl(SITE_URL, \`/product/\${product.slug}\`);

  const seo = mergeSEOConfig(siteConfig, {
    title: product.name,
    description: product.description,
    canonical: url,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      type: "product",
      images: [{ url: product.image, width: 1200, height: 630 }],
    },
    twitter: {
      title: product.name,
      description: \`\$\${product.price} — \${product.description}\`,
      image: product.image,
    },
  });

  const schemas = [
    createProductSchema({
      name: product.name,
      url,
      description: product.description,
      images: [product.image],
      price: product.price,
      priceCurrency: product.currency,
      sku: product.sku,
      brand: "ShopMax",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: product.category.name, url: buildCanonicalUrl(SITE_URL, \`/category/\${product.category.slug}\`) },
      { name: product.name, url },
    ]),
  ];

  return (
    <Document seo={seo} schemas={schemas}>
      <h1>{product.name}</h1>
      <p>\${product.price} {product.currency}</p>
      <p>{product.description}</p>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Blog Post */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">5</span>
            Blog / article page
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/BlogPostPage.tsx</span>
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

export function BlogPostPage({ post }) {
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
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  });

  const schemas = [
    createArticleSchema({
      headline: post.title,
      url,
      datePublished: post.date,
      dateModified: post.updatedDate,
      author: [{ name: post.author.name, url: post.author.url }],
      publisher: { name: "ShopMax Blog", logo: \`\${SITE_URL}/logo.png\` },
      images: [post.image],
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
        <p>By {post.author.name} on {post.date}</p>
        <div>{post.content}</div>
      </article>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* FAQ Page */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">6</span>
            FAQ page
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/FAQPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createFAQSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

const faqItems = [
  { question: "What is your return policy?", answer: "30-day money-back guarantee." },
  { question: "How long does shipping take?", answer: "5-7 business days standard." },
  { question: "Do you ship internationally?", answer: "Yes, to 50+ countries." },
];

export function FAQHelpPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description: "Answers to common questions about shipping, returns, and more.",
    canonical: buildCanonicalUrl(SITE_URL, "/faq"),
  });

  return (
    <Document seo={seo} schemas={[createFAQSchema(faqItems)]}>
      <h1>Frequently Asked Questions</h1>
      {faqItems.map((item, i) => (
        <div key={i}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Dashboard (noindex) */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">7</span>
            Dashboard page (noindex)
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Internal pages like dashboards should not appear in search results.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/DashboardPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  noIndex,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function DashboardPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Dashboard",
    description: "Your account dashboard.",
    canonical: buildCanonicalUrl(SITE_URL, "/dashboard"),
    robots: noIndex(), // { index: false, follow: true }
  });

  return (
    <Document seo={seo}>
      <h1>Dashboard</h1>
      <p>Welcome back! Here are your stats.</p>
    </Document>
  );
}`}</pre>
          </div>
          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                <code>noIndex()</code> returns <code>{`{ index: false, follow: true }`}</code>.
                For fully private pages, use <code>noIndexNoFollow()</code> instead.
              </p>
            </div>
          </div>
        </div>

        {/* Reusable Helpers */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Reusable SEO helpers
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            As your app grows, extract repeated patterns into helpers:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">utils/seo-helpers.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createBreadcrumbSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import type { SEOConfig } from "react-ssr-seo-toolkit";

/** Creates page SEO config with canonical URL */
export function createPageSEO(
  path: string,
  overrides: Partial<SEOConfig>
) {
  return mergeSEOConfig(siteConfig, {
    ...overrides,
    canonical: buildCanonicalUrl(SITE_URL, path),
    openGraph: {
      ...overrides.openGraph,
      url: buildCanonicalUrl(SITE_URL, path),
    },
  });
}

/** Creates breadcrumb trail (Home is automatic) */
export function createBreadcrumbs(
  items: Array<{ name: string; path: string }>
) {
  return createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    ...items.map((item) => ({
      name: item.name,
      url: buildCanonicalUrl(SITE_URL, item.path),
    })),
  ]);
}`}</pre>
          </div>
          <p style={{ color: "#64748b", marginTop: "1rem" }}>
            Now pages become much simpler:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/AboutPage.tsx (using helpers)</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import { createPageSEO, createBreadcrumbs } from "../utils/seo-helpers";
import { Document } from "../components/Document";

export function AboutPage() {
  const seo = createPageSEO("/about", {
    title: "About Us",
    description: "Learn about our team.",
  });

  return (
    <Document seo={seo} schemas={[createBreadcrumbs([{ name: "About", path: "/about" }])]}>
      <h1>About Us</h1>
      <p>Our story...</p>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Multi-language */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Multi-language pages
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            For multi-language sites, use <code>alternates</code> for hreflang links:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Hreflang example</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`const seo = mergeSEOConfig(siteConfig, {
  title: "Home",
  canonical: SITE_URL,
  alternates: [
    { hreflang: "en", href: SITE_URL },
    { hreflang: "es", href: \`\${SITE_URL}/es\` },
    { hreflang: "fr", href: \`\${SITE_URL}/fr\` },
    { hreflang: "x-default", href: SITE_URL },
  ],
});
// Renders: <link rel="alternate" hreflang="en" href="..." />
//          <link rel="alternate" hreflang="es" href="..." /> etc.`}</pre>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Key takeaways
          </h2>
          <div className="card card-elevated">
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "2", color: "#64748b" }}>
              <li>Every page uses <code>mergeSEOConfig(siteConfig, pageOverrides)</code></li>
              <li>Site defaults are inherited automatically — pages only override what they need</li>
              <li>JSON-LD schemas are created per page and passed to the Document</li>
              <li>Use <code>noIndex()</code> for private pages like dashboards</li>
              <li>Extract reusable helpers as your app grows</li>
              <li>Only the Document writes <code>{"<html>"}</code> and <code>{"<head>"}</code></li>
            </ul>
          </div>
        </div>

        <div className="demo-section">
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="/recipes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Recipes</h3>
              <p>Copy-paste ready code for common page types.</p>
            </a>
            <a href="/common-mistakes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Common Mistakes</h3>
              <p>Avoid frequent SEO setup errors.</p>
            </a>
            <a href="/faq-docs" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>FAQ</h3>
              <p>Answers to common questions about the toolkit.</p>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
