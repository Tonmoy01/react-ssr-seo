<div align="center">

<br />

<img src="https://img.shields.io/badge/react--ssr--seo--toolkit-v1.0.4-000000?style=for-the-badge&labelColor=000000" alt="react-ssr-seo-toolkit" />

<br />
<br />

# `react-ssr-seo-toolkit`

### The Complete SEO Toolkit for React SSR Applications

<br />

[![npm](https://img.shields.io/npm/v/react-ssr-seo-toolkit?style=for-the-badge&logo=npm&logoColor=white&color=CB3837)](https://www.npmjs.com/package/react-ssr-seo-toolkit)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
&nbsp;
[![License](https://img.shields.io/npm/l/react-ssr-seo-toolkit?style=for-the-badge&color=blue)](./LICENSE)
&nbsp;
[![Bundle](https://img.shields.io/bundlephobia/minzip/react-ssr-seo-toolkit?style=for-the-badge&label=size&color=success)](https://bundlephobia.com/package/react-ssr-seo-toolkit)

<br />

**Meta Tags** &bull; **Open Graph** &bull; **Twitter Cards** &bull; **JSON-LD** &bull; **Canonical URLs** &bull; **Hreflang** &bull; **Robots**

All in one package. Zero dependencies. Fully typed. SSR-safe.

<br />

[Live Demo](https://react-ssr-seo.tonmoykhan.site/) &nbsp;&nbsp;|&nbsp;&nbsp; [Get Started](#-get-started) &nbsp;&nbsp;|&nbsp;&nbsp; [Examples](#-real-world-examples) &nbsp;&nbsp;|&nbsp;&nbsp; [API](#-api-reference) &nbsp;&nbsp;|&nbsp;&nbsp; [Frameworks](#-framework-integration)

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
npm install react-ssr-seo-toolkit
```

> **Requires:** `react >= 18.0.0` as a peer dependency. Zero other dependencies.

<br />

### 2. Project Structure

The key idea: **pages never write `<html>` or `<head>` tags** — that's handled by a Document component, just like in Next.js or any modern React framework.

```
my-app/
├── config/
│   └── seo.ts              ← site-wide SEO defaults
├── components/
│   └── Document.tsx         ← handles <html>, <head>, <SEOHead>, <body>
├── pages/
│   ├── HomePage.tsx         ← just content + SEO config (no <html> tags!)
│   ├── AboutPage.tsx
│   └── BlogPost.tsx
├── server.tsx               ← Express / SSR entry point
└── package.json
```

<br />

### 3. Create Site Config (once)

This file holds defaults that every page inherits. Pages override only what they need.

```tsx
// config/seo.ts
import { createSEOConfig } from "react-ssr-seo-toolkit";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | MySite",              // auto-appends " | MySite" to every page title
  description: "Default site description for SEO.",
  openGraph: { siteName: "MySite", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", site: "@mysite" },
});

export const SITE_URL = "https://mysite.com";
```

> **Tip:** `titleTemplate` uses `%s` as a placeholder. Setting `title: "About"` renders as `About | MySite`.

<br />

### 3.5. Create a Document Component

The Document handles `<html>`, `<head>`, `<SEOHead>`, and `<body>` — so pages never have to.

```tsx
// components/Document.tsx
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <SEOHead {...seo} />
        {schemas?.map((schema, i) => <JsonLd key={i} data={schema} />)}
      </head>
      <body>
        <nav>{/* shared navigation */}</nav>
        <main>{children}</main>
        <footer>{/* shared footer */}</footer>
      </body>
    </html>
  );
}
```

> This is the same pattern used by Next.js (`layout.tsx`), Remix (`root.tsx`), and React Router's root component. We call it `Document` to distinguish it from route-level layouts.

<br />

### 4. Add to Any Page

Merge the shared config with page-specific values. **No `<html>` or `<head>` tags needed** — the Document handles that.

```tsx
// pages/AboutPage.tsx
import { mergeSEOConfig, buildCanonicalUrl } from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our company and mission.",
    canonical: buildCanonicalUrl(SITE_URL, "/about"),
  });

  return (
    <Document seo={seo}>
      <h1>About Us</h1>
      <p>Our story...</p>
    </Document>
  );
}
```

**That's it.** You now have full SEO on every page. Keep reading for structured data and framework examples.

<br />

---

<br />

## Real-World Examples

> Every example below is **copy-paste ready**. Just change the URLs and content.

<br />

### Blog / Article Page

```tsx
// pages/BlogPost.tsx
import {
  mergeSEOConfig, buildCanonicalUrl,
  createArticleSchema, createBreadcrumbSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function BlogPostPage() {
  // ── Page SEO ──────────────────────────────────────────────
  const seo = mergeSEOConfig(siteConfig, {
    title: "How to Build an SSR App",
    description: "A complete guide to building server-rendered React apps with proper SEO.",
    canonical: buildCanonicalUrl(SITE_URL, "/blog/ssr-guide"),
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

  // ── Render — no <html> or <head> tags! ────────────────────
  return (
    <Document seo={seo} schemas={[article, breadcrumbs]}>
      <article>
        <h1>How to Build an SSR App</h1>
        <p>Your article content here...</p>
      </article>
    </Document>
  );
}
```

<br />

### Generated HTML Output

```html
<head>
  <!-- Basic -->
  <title>How to Build an SSR App | My Blog</title>
  <meta name="description" content="A complete guide to building server-rendered React apps..." />
  <link rel="canonical" href="https://myblog.com/blog/ssr-guide" />

  <!-- Open Graph -->
  <meta property="og:title" content="How to Build an SSR App" />
  <meta property="og:description" content="A complete guide to SSR with React." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://myblog.com/blog/ssr-guide" />
  <meta property="og:site_name" content="My Blog" />
  <meta property="og:image" content="https://myblog.com/images/ssr-guide.jpg" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@myblog" />
  <meta name="twitter:title" content="How to Build an SSR App" />

  <!-- JSON-LD -->
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article",...}</script>
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"BreadcrumbList",...}</script>
</head>
```

<br />

---

<br />

### E-Commerce Product Page

```tsx
import {
  mergeSEOConfig, buildCanonicalUrl,
  createProductSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

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

  const url = buildCanonicalUrl(SITE_URL, "/products/ergonomic-keyboard");

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

  return (
    <Document seo={seo} schemas={[schema]}>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
    </Document>
  );
}
```

<br />

---

<br />

### FAQ Page

```tsx
import {
  mergeSEOConfig, buildCanonicalUrl, createFAQSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

function FAQPage() {
  const faqs = [
    { question: "What payment methods do you accept?", answer: "Visa, MasterCard, PayPal, Apple Pay." },
    { question: "How long does shipping take?", answer: "Standard: 3-5 business days." },
    { question: "What is your return policy?", answer: "30-day money-back guarantee." },
  ];

  const seo = mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description: "Frequently asked questions about our products and services.",
    canonical: buildCanonicalUrl(SITE_URL, "/faq"),
  });

  return (
    <Document seo={seo} schemas={[createFAQSchema(faqs)]}>
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, i) => (
        <details key={i}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </Document>
  );
}
```

<br />

---

<br />

### Homepage (Organization + Website Schema)

```tsx
import {
  mergeSEOConfig,
  createOrganizationSchema, createWebsiteSchema,
} from "react-ssr-seo-toolkit";
import { siteConfig } from "../config/seo";
import { Document } from "../components/Document";

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
    <Document seo={seo} schemas={[org, site]}>
      <h1>Welcome to Acme</h1>
    </Document>
  );
}
```

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
    { hreflang: "x-default", href: "https://mysite.com/products" },
  ],
});

// Generates:
// <link rel="alternate" hreflang="en" href="https://mysite.com/en/products" />
// <link rel="alternate" hreflang="es" href="https://mysite.com/es/products" />
// ...
```

<br />

---

<br />

### No-Index Pages (Admin, Login, Drafts)

```tsx
import { mergeSEOConfig, noIndex, noIndexNoFollow } from "react-ssr-seo-toolkit";

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
import { composeSchemas, createOrganizationSchema, createWebsiteSchema, JsonLd } from "react-ssr-seo-toolkit";

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

```tsx
// app/blog/[slug]/page.tsx
import {
  buildTitle, buildDescription, buildCanonicalUrl,
  createArticleSchema, safeJsonLdSerialize,
} from "react-ssr-seo-toolkit";

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

<br />

### Next.js Pages Router

```tsx
// pages/about.tsx — no <html> tags, Next.js handles that
import Head from "next/head";
import { SEOHead, mergeSEOConfig } from "react-ssr-seo-toolkit";
import { siteConfig } from "../config/seo";

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

<br />

### React Router 7 SSR

```tsx
// app/root.tsx — only the root layout writes <html>
import { Outlet, useMatches } from "react-router";
import { SEOHead } from "react-ssr-seo-toolkit";

export default function Root() {
  const matches = useMatches();
  const seo = matches.at(-1)?.data?.seo;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {seo && <SEOHead {...seo} />}
      </head>
      <body>
        <Outlet />
      </body>
    </html>
  );
}
```

```tsx
// app/routes/about.tsx — page just provides SEO data + content
import { mergeSEOConfig, buildCanonicalUrl } from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";

export function loader() {
  return {
    seo: mergeSEOConfig(siteConfig, {
      title: "About",
      canonical: buildCanonicalUrl(SITE_URL, "/about"),
    }),
  };
}

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
    </main>
  );
}
```

<br />

### Express + React SSR

```tsx
// server.tsx — renders page components that include Document internally
import express from "express";
import { renderToString } from "react-dom/server";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";

const app = express();

app.get("/", (req, res) => {
  const html = renderToString(<HomePage />);
  res.send(`<!DOCTYPE html>${html}`);
});

app.get("/products/:id", (req, res) => {
  const product = getProduct(req.params.id);
  const html = renderToString(<ProductPage product={product} />);
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(3000);
```

```tsx
// pages/ProductPage.tsx — no <html> tags, Document handles that
import { mergeSEOConfig, createProductSchema } from "react-ssr-seo-toolkit";
import { siteConfig } from "../config/seo";
import { Document } from "../components/Document";

export function ProductPage({ product }) {
  const seo = mergeSEOConfig(siteConfig, {
    title: product.name,
    description: product.description,
    canonical: product.url,
  });

  const schema = createProductSchema({
    name: product.name,
    url: product.url,
    price: product.price,
  });

  return (
    <Document seo={seo} schemas={[schema]}>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
    </Document>
  );
}
```

<br />

---

<br />

## API Reference

### Config Builders

| Function | What It Does |
|---|---|
| `createSEOConfig(config?)` | Create a normalized SEO config. Use for site-wide defaults. |
| `mergeSEOConfig(base, override)` | Deep-merge site config with page-level overrides. Arrays are replaced, not concatenated. |
| `normalizeSEOConfig(config)` | Trim strings, normalize URLs, clean up a config object. |

<br />

### Metadata Helpers

| Function | Example | Result |
|---|---|---|
| `buildTitle(title, template)` | `buildTitle("About", "%s \| MySite")` | `"About \| MySite"` |
| `buildDescription(desc, maxLen)` | `buildDescription("Long text...", 160)` | Truncated at 160 chars |
| `buildCanonicalUrl(base, path)` | `buildCanonicalUrl("https://x.com", "/about")` | `"https://x.com/about"` |
| `buildRobotsDirectives(config)` | `buildRobotsDirectives({ index: false })` | `"noindex, follow"` |
| `noIndex()` | `noIndex()` | `{ index: false, follow: true }` |
| `noIndexNoFollow()` | `noIndexNoFollow()` | `{ index: false, follow: false }` |
| `buildOpenGraph(config)` | `buildOpenGraph({ title: "Hi" })` | `[{ property: "og:title", content: "Hi" }]` |
| `buildTwitterMetadata(config)` | `buildTwitterMetadata({ card: "summary" })` | `[{ name: "twitter:card", content: "summary" }]` |
| `buildAlternateLinks(alternates)` | `buildAlternateLinks([{ hreflang: "en", href: "..." }])` | `[{ rel: "alternate", hreflang: "en", href: "..." }]` |

<br />

### JSON-LD Schema Generators

All return a plain object with `@context: "https://schema.org"` and `@type` set.

| Function | Schema Type | Use Case |
|---|---|---|
| `createOrganizationSchema(input)` | Organization | Company info, logo, social links, contact |
| `createWebsiteSchema(input)` | WebSite | Site name, sitelinks searchbox |
| `createArticleSchema(input)` | Article | Blog posts, news articles, authors, dates |
| `createProductSchema(input)` | Product | E-commerce: price, brand, SKU, ratings, availability |
| `createBreadcrumbSchema(items)` | BreadcrumbList | Navigation hierarchy |
| `createFAQSchema(items)` | FAQPage | FAQ pages with question + answer pairs |
| `composeSchemas(...schemas)` | @graph | Combine multiple schemas into one JSON-LD block |

<br />

### Utilities

| Function | What It Does |
|---|---|
| `safeJsonLdSerialize(data)` | Serialize JSON-LD safely — escapes `<`, `>`, `&` to prevent XSS |
| `normalizeUrl(url)` | Trim whitespace, remove trailing slashes |
| `buildFullUrl(base, path?)` | Combine base URL with path |
| `omitEmpty(obj)` | Remove keys with `undefined`, `null`, or empty string values |
| `deepMerge(base, override)` | Deep-merge two objects (arrays replaced, not concatenated) |

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
  ]}
  additionalLinkTags={[
    { rel: "icon", href: "/favicon.ico" },
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
} from "react-ssr-seo-toolkit";
```

<br />

---

<br />

## Live Demo

The repo includes a **working Express SSR demo** with every feature:

```bash
git clone https://github.com/Tonmoy01/react-ssr-seo-toolkit.git
cd react-ssr-seo-toolkit
npm install
npm run demo
```

Then visit [http://localhost:3000](http://localhost:3000):

| URL | Page | SEO Features |
|---|---|---|
| `/` | Home | Organization + Website schema, hreflang, OG images |
| `/getting-started` | Getting Started | Installation guide with copy-paste examples |
| `/article` | Article | Article schema, breadcrumbs, multiple authors, Twitter cards |
| `/product` | Product | Product schema, pricing, ratings, availability |
| `/faq` | FAQ | FAQPage schema with Q&A pairs |
| `/noindex` | No-Index | Robots noindex directive |
| `/api` | API Reference | Complete function and type documentation |

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

### "Cannot find module 'react-ssr-seo-toolkit'"

Ensure the package is installed and your bundler supports the `exports` field in `package.json`. If using an older bundler, try importing from `react-ssr-seo-toolkit/dist/index.js` directly.

### Hydration mismatch warnings

`<SEOHead>` produces deterministic output. If you see hydration warnings, ensure the same config object is used on both server and client. Avoid using `Date.now()` or random values in your SEO config.

### JSON-LD not appearing in page source

Make sure `<JsonLd>` is inside `<head>` and rendered during SSR — not in a client-only `useEffect`.

### TypeScript errors

All types are exported. Import them directly:

```tsx
import type { SEOConfig, OpenGraphConfig } from "react-ssr-seo-toolkit";
```

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
