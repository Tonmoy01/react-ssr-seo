<div align="center">

<br />

<img src="https://img.shields.io/badge/react--ssr--seo-v1.0.0-000000?style=for-the-badge&labelColor=000000" alt="react-ssr-seo" />

<br />
<br />

# `react-ssr-seo`

### The Complete SEO Toolkit for React SSR Applications

<br />

[![npm](https://img.shields.io/npm/v/react-ssr-seo?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/react-ssr-seo)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
&nbsp;
[![License](https://img.shields.io/npm/l/react-ssr-seo?style=for-the-badge&color=blue)](./LICENSE)
&nbsp;
[![Bundle](https://img.shields.io/bundlephobia/minzip/react-ssr-seo?style=for-the-badge&label=size&color=success)](https://bundlephobia.com/package/react-ssr-seo)

<br />

**Meta Tags** &bull; **Open Graph** &bull; **Twitter Cards** &bull; **JSON-LD** &bull; **Canonical URLs** &bull; **Hreflang** &bull; **Robots**

All in one package. Zero dependencies. Fully typed. SSR-safe.

<br />

[Get Started](#-get-started) &nbsp;&nbsp;|&nbsp;&nbsp; [Examples](#-real-world-examples) &nbsp;&nbsp;|&nbsp;&nbsp; [API](#-api-reference) &nbsp;&nbsp;|&nbsp;&nbsp; [Frameworks](#-framework-integration)

<br />

---

</div>

<br />

## Why This Package?

<table>
<tr>
<td width="50%">

### The Problem

- Most SEO packages are **locked to Next.js**
- Many rely on **browser-only APIs** (`window`, `document`)
- JSON-LD usually needs a **separate package**
- Hard to get **type safety** across meta tags
- Hydration mismatches in SSR

</td>
<td width="50%">

### The Solution

- **Framework-agnostic** — works everywhere
- **Zero browser globals** — fully SSR-safe
- **JSON-LD built-in** — Article, Product, FAQ, Breadcrumb, Organization, Website
- **Full TypeScript** — every prop, every config
- **Deterministic output** — no hydration issues

</td>
</tr>
</table>

<br />

## Works With

<div align="center">

| | Framework | Integration |
|:---:|---|---|
| <img src="https://img.shields.io/badge/-Next.js-000?style=flat-square&logo=nextdotjs" /> | **Next.js App Router** | `generateMetadata()` + `safeJsonLdSerialize()` |
| <img src="https://img.shields.io/badge/-Next.js-000?style=flat-square&logo=nextdotjs" /> | **Next.js Pages Router** | `<SEOHead>` inside `next/head` |
| <img src="https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white" /> | **React Router 7 SSR** | `<SEOHead>` in root component |
| <img src="https://img.shields.io/badge/-Express-000?style=flat-square&logo=express" /> | **Express + React SSR** | `<SEOHead>` in `renderToString()` |
| <img src="https://img.shields.io/badge/-Remix-000?style=flat-square&logo=remix" /> | **Remix / Astro / Solid** | Pure utility functions (no React needed) |

</div>

<br />

---

<br />

## Get Started

### 1. Install

```bash
npm install react-ssr-seo
```

```bash
# or
pnpm add react-ssr-seo    # yarn add react-ssr-seo    # bun add react-ssr-seo
```

> **Requires:** `react >= 18.0.0` as peer dependency

<br />

### 2. Create Site Config (once)

```tsx
import { createSEOConfig } from "react-ssr-seo";

const siteConfig = createSEOConfig({
  titleTemplate: "%s | MySite",              // auto-appends " | MySite" to every page title
  openGraph: { siteName: "MySite", type: "website" },
  twitter: { card: "summary_large_image", site: "@mysite" },
});
```

<br />

### 3. Add to Any Page

```tsx
import { SEOHead, mergeSEOConfig, buildCanonicalUrl } from "react-ssr-seo";

function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our company and mission.",
    canonical: buildCanonicalUrl("https://mysite.com", "/about"),
  });

  return (
    <html>
      <head>
        <SEOHead {...seo} />
        {/* Renders: <title>, <meta>, <link>, <script type="application/ld+json"> */}
      </head>
      <body>
        <h1>About Us</h1>
      </body>
    </html>
  );
}
```

**Done.** That's all you need for basic SEO. Keep reading for real-world examples.

<br />

---

<br />

## Real-World Examples

> Every example below is **copy-paste ready**. Just change the URLs and content.

<br />

### Blog / Article Page

<details open>
<summary><strong>Click to expand full example</strong></summary>

```tsx
import {
  SEOHead, JsonLd,
  createSEOConfig, mergeSEOConfig, buildCanonicalUrl,
  createArticleSchema, createBreadcrumbSchema,
} from "react-ssr-seo";

// Site config (create once, reuse everywhere)
const siteConfig = createSEOConfig({
  titleTemplate: "%s | My Blog",
  openGraph: { siteName: "My Blog", type: "website" },
  twitter: { card: "summary_large_image", site: "@myblog" },
});

function BlogPostPage() {
  // ── Page SEO ──────────────────────────────────────────────
  const seo = mergeSEOConfig(siteConfig, {
    title: "How to Build an SSR App",
    description: "A complete guide to building server-rendered React apps with proper SEO.",
    canonical: buildCanonicalUrl("https://myblog.com", "/blog/ssr-guide"),
    openGraph: {
      title: "How to Build an SSR App",
      description: "A complete guide to SSR with React.",
      type: "article",
      url: "https://myblog.com/blog/ssr-guide",
      images: [{
        url: "https://myblog.com/images/ssr-guide.jpg",
        width: 1200, height: 630,
        alt: "SSR Guide Cover",
      }],
    },
    twitter: {
      title: "How to Build an SSR App",
      creator: "@authorhandle",
      image: "https://myblog.com/images/ssr-guide.jpg",
    },
  });

  // ── Structured Data ───────────────────────────────────────
  const article = createArticleSchema({
    headline: "How to Build an SSR App",
    url: "https://myblog.com/blog/ssr-guide",
    description: "A complete guide to SSR with React.",
    datePublished: "2025-06-15",
    dateModified: "2025-07-01",
    author: [
      { name: "Jane Doe", url: "https://myblog.com/authors/jane" },
      { name: "John Smith" },
    ],
    publisher: { name: "My Blog", logo: "https://myblog.com/logo.png" },
    images: ["https://myblog.com/images/ssr-guide.jpg"],
    section: "Technology",
    keywords: ["React", "SSR", "SEO"],
  });

  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: "https://myblog.com" },
    { name: "Blog", url: "https://myblog.com/blog" },
    { name: "How to Build an SSR App", url: "https://myblog.com/blog/ssr-guide" },
  ]);

  // ── Render ────────────────────────────────────────────────
  return (
    <html>
      <head>
        <SEOHead {...seo} />
        <JsonLd data={article} />
        <JsonLd data={breadcrumbs} />
      </head>
      <body>
        <article>
          <h1>How to Build an SSR App</h1>
          <p>Your article content here...</p>
        </article>
      </body>
    </html>
  );
}
```

</details>

<details>
<summary><strong>See the HTML output this generates</strong></summary>

```html
<head>
  <!-- Basic -->
  <title>How to Build an SSR App | My Blog</title>
  <meta name="description" content="A complete guide to building server-rendered React apps..." />
  <link rel="canonical" href="https://myblog.com/blog/ssr-guide" />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph (Facebook, LinkedIn, etc.) -->
  <meta property="og:title" content="How to Build an SSR App" />
  <meta property="og:description" content="A complete guide to SSR with React." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://myblog.com/blog/ssr-guide" />
  <meta property="og:site_name" content="My Blog" />
  <meta property="og:image" content="https://myblog.com/images/ssr-guide.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="SSR Guide Cover" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@myblog" />
  <meta name="twitter:creator" content="@authorhandle" />
  <meta name="twitter:title" content="How to Build an SSR App" />
  <meta name="twitter:image" content="https://myblog.com/images/ssr-guide.jpg" />

  <!-- JSON-LD: Article -->
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Article","headline":"How to Build an SSR App",...}
  </script>

  <!-- JSON-LD: Breadcrumbs -->
  <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[...]}
  </script>
</head>
```

</details>

<br />

---

<br />

### E-Commerce Product Page

<details open>
<summary><strong>Click to expand full example</strong></summary>

```tsx
import {
  SEOHead, JsonLd,
  createSEOConfig, mergeSEOConfig, buildCanonicalUrl,
  createProductSchema, createBreadcrumbSchema,
} from "react-ssr-seo";

const siteConfig = createSEOConfig({
  titleTemplate: "%s | Acme Store",
  openGraph: { siteName: "Acme Store", type: "website" },
  twitter: { card: "summary_large_image", site: "@acmestore" },
});

function ProductPage() {
  const product = {
    name: "Ergonomic Mechanical Keyboard",
    description: "Premium split keyboard with Cherry MX Brown switches.",
    price: 189.99,
    image: "https://acmestore.com/images/keyboard.jpg",
    brand: "Acme Peripherals",
    sku: "ACME-KB-001",
    inStock: true,
    rating: 4.7,
    reviewCount: 342,
  };

  const url = buildCanonicalUrl("https://acmestore.com", "/products/ergonomic-keyboard");

  // ── Page SEO ──────────────────────────────────────────────
  const seo = mergeSEOConfig(siteConfig, {
    title: product.name,
    description: product.description,
    canonical: url,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "product",
      url,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
    },
  });

  // ── Structured Data ───────────────────────────────────────
  const schema = createProductSchema({
    name: product.name,
    url,
    description: product.description,
    price: product.price,
    priceCurrency: "USD",
    availability: product.inStock ? "InStock" : "OutOfStock",
    brand: product.brand,
    sku: product.sku,
    images: [product.image],
    ratingValue: product.rating,
    reviewCount: product.reviewCount,
  });

  const breadcrumbs = createBreadcrumbSchema([
    { name: "Home", url: "https://acmestore.com" },
    { name: "Products", url: "https://acmestore.com/products" },
    { name: product.name, url },
  ]);

  return (
    <html>
      <head>
        <SEOHead {...seo} />
        <JsonLd data={schema} />
        <JsonLd data={breadcrumbs} />
      </head>
      <body>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price} — {product.inStock ? "In Stock" : "Out of Stock"}</p>
      </body>
    </html>
  );
}
```

</details>

<br />

---

<br />

### FAQ Page

<details open>
<summary><strong>Click to expand full example</strong></summary>

```tsx
import {
  SEOHead, JsonLd,
  mergeSEOConfig, buildCanonicalUrl, createFAQSchema,
} from "react-ssr-seo";

function FAQPage() {
  const faqs = [
    { question: "What payment methods do you accept?", answer: "Visa, MasterCard, PayPal, Apple Pay." },
    { question: "How long does shipping take?", answer: "Standard: 3-5 business days." },
    { question: "What is your return policy?", answer: "30-day money-back guarantee." },
  ];

  const seo = mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description: "Frequently asked questions about our products and services.",
    canonical: buildCanonicalUrl("https://mysite.com", "/faq"),
  });

  return (
    <html>
      <head>
        <SEOHead {...seo} />
        <JsonLd data={createFAQSchema(faqs)} />
      </head>
      <body>
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, i) => (
          <details key={i}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </body>
    </html>
  );
}
```

</details>

<br />

---

<br />

### Homepage (Organization + Website Schema)

<details>
<summary><strong>Click to expand full example</strong></summary>

```tsx
import {
  SEOHead, JsonLd,
  mergeSEOConfig,
  createOrganizationSchema, createWebsiteSchema,
} from "react-ssr-seo";

function HomePage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: "https://acme.com",
    openGraph: {
      title: "Acme — Building the future",
      url: "https://acme.com",
      images: [{ url: "https://acme.com/og-home.jpg", width: 1200, height: 630, alt: "Acme" }],
    },
  });

  const org = createOrganizationSchema({
    name: "Acme Inc",
    url: "https://acme.com",
    logo: "https://acme.com/logo.png",
    description: "Leading provider of quality products.",
    sameAs: [
      "https://twitter.com/acme",
      "https://linkedin.com/company/acme",
      "https://facebook.com/acme",
    ],
    contactPoint: {
      telephone: "+1-800-555-0199",
      contactType: "customer service",
      email: "support@acme.com",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
  });

  const site = createWebsiteSchema({
    name: "Acme Inc",
    url: "https://acme.com",
    description: "Leading provider of quality products.",
    searchUrl: "https://acme.com/search",  // enables Google sitelinks searchbox
  });

  return (
    <html>
      <head>
        <SEOHead {...seo} />
        <JsonLd data={org} />
        <JsonLd data={site} />
      </head>
      <body>
        <h1>Welcome to Acme</h1>
      </body>
    </html>
  );
}
```

</details>

<br />

---

<br />

### Multi-Language (Hreflang)

```tsx
const seo = mergeSEOConfig(siteConfig, {
  title: "Products",
  canonical: "https://mysite.com/products",
  alternates: [
    { hreflang: "en",        href: "https://mysite.com/en/products" },
    { hreflang: "es",        href: "https://mysite.com/es/products" },
    { hreflang: "fr",        href: "https://mysite.com/fr/products" },
    { hreflang: "de",        href: "https://mysite.com/de/products" },
    { hreflang: "x-default", href: "https://mysite.com/products" },
  ],
});

// Generates:
// <link rel="alternate" hreflang="en" href="https://mysite.com/en/products" />
// <link rel="alternate" hreflang="es" href="https://mysite.com/es/products" />
// <link rel="alternate" hreflang="fr" href="https://mysite.com/fr/products" />
// ...
```

<br />

---

<br />

### No-Index Pages (Admin, Login, Drafts)

```tsx
import { mergeSEOConfig, noIndex, noIndexNoFollow } from "react-ssr-seo";

// Login page: don't index, but follow links
const loginSeo = mergeSEOConfig(siteConfig, {
  title: "Login",
  robots: noIndex(),            // "noindex, follow"
});

// Admin page: don't index, don't follow
const adminSeo = mergeSEOConfig(siteConfig, {
  title: "Admin Dashboard",
  robots: noIndexNoFollow(),    // "noindex, nofollow"
});

// Fine-grained control
const archiveSeo = mergeSEOConfig(siteConfig, {
  title: "Archive",
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nosnippet: true,
    maxSnippet: 50,
    maxImagePreview: "standard",
  },
});
```

<br />

---

<br />

### Combine Multiple Schemas

```tsx
import { composeSchemas, createOrganizationSchema, createWebsiteSchema, JsonLd } from "react-ssr-seo";

// Merge into a single JSON-LD block with @graph array
const combined = composeSchemas(
  createOrganizationSchema({ name: "Acme", url: "https://acme.com" }),
  createWebsiteSchema({ name: "Acme", url: "https://acme.com" }),
);

<JsonLd data={combined} />

// Output: single <script> tag with {"@context":"https://schema.org","@graph":[...]}
```

<br />

---

<br />

## Framework Integration

### Next.js App Router

<details open>
<summary><strong>Using with <code>generateMetadata()</code></strong></summary>

```tsx
// app/blog/[slug]/page.tsx
import {
  buildTitle, buildDescription, buildCanonicalUrl,
  createArticleSchema, safeJsonLdSerialize,
} from "react-ssr-seo";

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: buildTitle(post.title, "%s | My Blog"),
    description: buildDescription(post.excerpt, 160),
    alternates: {
      canonical: buildCanonicalUrl("https://myblog.com", `/blog/${params.slug}`),
    },
    openGraph: {
      title: post.title,
      type: "article",
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
  };
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);

  const schema = createArticleSchema({
    headline: post.title,
    url: `https://myblog.com/blog/${params.slug}`,
    datePublished: post.date,
    author: { name: post.author },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(schema) }}
      />
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </>
  );
}
```

</details>

<br />

### Next.js Pages Router

<details>
<summary><strong>Using with <code>next/head</code></strong></summary>

```tsx
// pages/about.tsx
import Head from "next/head";
import { SEOHead, mergeSEOConfig } from "react-ssr-seo";

export default function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our mission.",
    canonical: "https://mysite.com/about",
  });

  return (
    <>
      <Head>
        <SEOHead {...seo} />
      </Head>
      <main>
        <h1>About Us</h1>
      </main>
    </>
  );
}
```

</details>

<br />

### React Router 7 SSR

<details>
<summary><strong>Using in root document</strong></summary>

```tsx
// app/root.tsx
import { SEOHead, JsonLd, createSEOConfig, mergeSEOConfig, createOrganizationSchema } from "react-ssr-seo";

const siteConfig = createSEOConfig({
  titleTemplate: "%s — Acme",
  openGraph: { siteName: "Acme", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", site: "@acme" },
});

export function HomePage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: "https://acme.com",
    jsonLd: createOrganizationSchema({
      name: "Acme",
      url: "https://acme.com",
      logo: "https://acme.com/logo.png",
    }),
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...seo} />
      </head>
      <body>
        <h1>Welcome to Acme</h1>
      </body>
    </html>
  );
}
```

</details>

<br />

### Express + React SSR

<details>
<summary><strong>Using with <code>renderToString()</code></strong></summary>

```tsx
import express from "express";
import { renderToString } from "react-dom/server";
import { SEOHead, JsonLd, createSEOConfig, mergeSEOConfig, createProductSchema } from "react-ssr-seo";

const app = express();

const siteConfig = createSEOConfig({
  titleTemplate: "%s | My Store",
  openGraph: { siteName: "My Store" },
});

function ProductPage({ product }) {
  const seo = mergeSEOConfig(siteConfig, {
    title: product.name,
    description: product.description,
    canonical: product.url,
  });

  return (
    <html>
      <head>
        <SEOHead {...seo} />
        <JsonLd data={createProductSchema({
          name: product.name,
          url: product.url,
          price: product.price,
        })} />
      </head>
      <body>
        <h1>{product.name}</h1>
        <p>${product.price}</p>
      </body>
    </html>
  );
}

app.get("/products/:id", (req, res) => {
  const product = getProduct(req.params.id);
  const html = renderToString(<ProductPage product={product} />);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(3000);
```

</details>

<br />

---

<br />

## API Reference

### Config Builders

<table>
<tr>
<th>Function</th>
<th>What It Does</th>
</tr>
<tr>
<td><code>createSEOConfig(config?)</code></td>
<td>Create a normalized SEO config. Use for site-wide defaults.</td>
</tr>
<tr>
<td><code>mergeSEOConfig(base, override)</code></td>
<td>Deep-merge site config with page-level overrides. Arrays are replaced, not concatenated.</td>
</tr>
<tr>
<td><code>normalizeSEOConfig(config)</code></td>
<td>Trim strings, normalize URLs, clean up a config object.</td>
</tr>
</table>

<br />

### Metadata Helpers

<table>
<tr>
<th>Function</th>
<th>Example</th>
<th>Result</th>
</tr>
<tr>
<td><code>buildTitle(title, template)</code></td>
<td><code>buildTitle("About", "%s | MySite")</code></td>
<td><code>"About | MySite"</code></td>
</tr>
<tr>
<td><code>buildDescription(desc, maxLen)</code></td>
<td><code>buildDescription("Long text...", 160)</code></td>
<td>Truncated at 160 chars with ellipsis</td>
</tr>
<tr>
<td><code>buildCanonicalUrl(base, path)</code></td>
<td><code>buildCanonicalUrl("https://x.com", "/about")</code></td>
<td><code>"https://x.com/about"</code></td>
</tr>
<tr>
<td><code>buildRobotsDirectives(config)</code></td>
<td><code>buildRobotsDirectives({ index: false, follow: true })</code></td>
<td><code>"noindex, follow"</code></td>
</tr>
<tr>
<td><code>noIndex()</code></td>
<td><code>noIndex()</code></td>
<td><code>{ index: false, follow: true }</code></td>
</tr>
<tr>
<td><code>noIndexNoFollow()</code></td>
<td><code>noIndexNoFollow()</code></td>
<td><code>{ index: false, follow: false }</code></td>
</tr>
<tr>
<td><code>buildOpenGraph(config)</code></td>
<td><code>buildOpenGraph({ title: "Hi" })</code></td>
<td><code>[{ property: "og:title", content: "Hi" }]</code></td>
</tr>
<tr>
<td><code>buildTwitterMetadata(config)</code></td>
<td><code>buildTwitterMetadata({ card: "summary" })</code></td>
<td><code>[{ name: "twitter:card", content: "summary" }]</code></td>
</tr>
<tr>
<td><code>buildAlternateLinks(alternates)</code></td>
<td><code>buildAlternateLinks([{ hreflang: "en", href: "..." }])</code></td>
<td><code>[{ rel: "alternate", hreflang: "en", href: "..." }]</code></td>
</tr>
</table>

<br />

### JSON-LD Schema Generators

> All return a plain object with `@context: "https://schema.org"` and `@type` set.

<table>
<tr>
<th>Function</th>
<th>Schema Type</th>
<th>Use Case</th>
</tr>
<tr>
<td><code>createOrganizationSchema(input)</code></td>
<td>Organization</td>
<td>Company info, logo, social links, contact</td>
</tr>
<tr>
<td><code>createWebsiteSchema(input)</code></td>
<td>WebSite</td>
<td>Site name, sitelinks searchbox</td>
</tr>
<tr>
<td><code>createArticleSchema(input)</code></td>
<td>Article</td>
<td>Blog posts, news articles, authors, dates</td>
</tr>
<tr>
<td><code>createProductSchema(input)</code></td>
<td>Product</td>
<td>E-commerce: price, brand, SKU, ratings, availability</td>
</tr>
<tr>
<td><code>createBreadcrumbSchema(items)</code></td>
<td>BreadcrumbList</td>
<td>Navigation hierarchy</td>
</tr>
<tr>
<td><code>createFAQSchema(items)</code></td>
<td>FAQPage</td>
<td>FAQ pages with question + answer pairs</td>
</tr>
<tr>
<td><code>composeSchemas(...schemas)</code></td>
<td>@graph</td>
<td>Combine multiple schemas into one JSON-LD block</td>
</tr>
</table>

<br />

### Utilities

<table>
<tr>
<th>Function</th>
<th>What It Does</th>
</tr>
<tr>
<td><code>safeJsonLdSerialize(data)</code></td>
<td>Serialize JSON-LD safely for <code>&lt;script&gt;</code> tags — escapes <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code> to prevent XSS</td>
</tr>
<tr>
<td><code>normalizeUrl(url)</code></td>
<td>Trim whitespace, remove trailing slashes</td>
</tr>
<tr>
<td><code>buildFullUrl(base, path?)</code></td>
<td>Combine base URL with path</td>
</tr>
<tr>
<td><code>omitEmpty(obj)</code></td>
<td>Remove keys with <code>undefined</code>, <code>null</code>, or empty string values</td>
</tr>
<tr>
<td><code>deepMerge(base, override)</code></td>
<td>Deep-merge two objects (arrays replaced, not concatenated)</td>
</tr>
</table>

<br />

### React Components

#### `<SEOHead>`

Renders all SEO tags as React elements. Place inside `<head>`.

```tsx
<SEOHead
  title="My Page"
  titleTemplate="%s | MySite"
  description="Page description here."
  canonical="https://mysite.com/page"
  robots={{ index: true, follow: true }}
  openGraph={{
    title: "My Page",
    description: "For social sharing.",
    type: "website",
    url: "https://mysite.com/page",
    siteName: "MySite",
    locale: "en_US",
    images: [{ url: "https://mysite.com/og.jpg", width: 1200, height: 630, alt: "Preview" }],
  }}
  twitter={{
    card: "summary_large_image",
    site: "@mysite",
    creator: "@author",
    title: "My Page",
    image: "https://mysite.com/twitter.jpg",
  }}
  alternates={[
    { hreflang: "en", href: "https://mysite.com/en/page" },
    { hreflang: "es", href: "https://mysite.com/es/page" },
  ]}
  additionalMetaTags={[
    { name: "author", content: "Jane Doe" },
    { property: "article:published_time", content: "2025-06-15" },
  ]}
  additionalLinkTags={[
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
  ]}
  jsonLd={createArticleSchema({ headline: "...", url: "..." })}
/>
```

#### `<JsonLd>`

Standalone JSON-LD `<script>` tag renderer.

```tsx
<JsonLd data={createProductSchema({ name: "Widget", url: "...", price: 29.99 })} />
```

<br />

### TypeScript Types

```tsx
import type {
  SEOConfig,
  OpenGraphConfig,
  OpenGraphImage,
  OpenGraphType,        // "website" | "article" | "product" | "profile" | ...
  TwitterConfig,
  TwitterCardType,      // "summary" | "summary_large_image" | "app" | "player"
  RobotsConfig,
  AlternateLink,
  JSONLDBase,
  BreadcrumbItem,
  OrganizationSchemaInput,
  WebsiteSchemaInput,
  ArticleSchemaInput,
  ProductSchemaInput,
  FAQItem,
  SEOHeadProps,
  JsonLdProps,
} from "react-ssr-seo";
```

<br />

---

<br />

## Live Demo

Try it locally — the repo includes a **working Express SSR demo** with 5 pages:

```bash
git clone https://github.com/Tonmoy01/react-ssr-seo.git
cd react-ssr-seo
npm install
npm run demo
```

Then open your browser:

<table>
<tr>
<th>URL</th>
<th>Page</th>
<th>SEO Features Demonstrated</th>
</tr>
<tr>
<td><code>localhost:3000</code></td>
<td>Home</td>
<td>Organization + Website schema, hreflang, OG images</td>
</tr>
<tr>
<td><code>localhost:3000/article</code></td>
<td>Article</td>
<td>Article schema, breadcrumbs, multiple authors, Twitter cards</td>
</tr>
<tr>
<td><code>localhost:3000/product</code></td>
<td>Product</td>
<td>Product schema, pricing, ratings, availability, breadcrumbs</td>
</tr>
<tr>
<td><code>localhost:3000/faq</code></td>
<td>FAQ</td>
<td>FAQPage schema with Q&A pairs</td>
</tr>
<tr>
<td><code>localhost:3000/noindex</code></td>
<td>No-Index</td>
<td>Robots noindex directive</td>
</tr>
</table>

> **Tip:** Right-click any page and **View Page Source** to see all SEO tags in the raw HTML.

<br />

---

<br />

## Development

```bash
npm install          # install dependencies
npm run build        # build the library
npm run dev          # watch mode (auto-rebuild)
npm test             # run tests
npm run test:watch   # tests in watch mode
npm run lint         # type check
npm run clean        # clean build output
npm run demo         # run demo server
```

<br />

---

<br />

## Troubleshooting

<details>
<summary><strong>"Cannot find module 'react-ssr-seo'"</strong></summary>

<br />

Ensure the package is installed and your bundler supports the `exports` field in `package.json`. If using an older bundler, try importing from `react-ssr-seo/dist/index.js` directly.
</details>

<details>
<summary><strong>Hydration mismatch warnings</strong></summary>

<br />

`<SEOHead>` produces deterministic output. If you see hydration warnings, ensure the same config object is used on both server and client. Avoid using `Date.now()` or random values in your SEO config.
</details>

<details>
<summary><strong>JSON-LD not appearing in page source</strong></summary>

<br />

Make sure `<JsonLd>` or `<script type="application/ld+json">` is inside `<head>` and rendered during SSR — not in a client-only `useEffect`.
</details>

<details>
<summary><strong>TypeScript errors</strong></summary>

<br />

All types are exported. Import them directly:

```tsx
import type { SEOConfig, OpenGraphConfig } from "react-ssr-seo";
```
</details>

<br />

---

<br />

## Contributing

1. Fork the repo
2. Create a feature branch — `git checkout -b feature/my-feature`
3. Make your changes with tests
4. Run `npm test && npm run lint`
5. Open a PR

<br />

---

<div align="center">

<br />

**MIT License** &bull; Made by [Tonmoy](https://github.com/Tonmoy01)

<br />

</div>
