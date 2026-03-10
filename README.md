# react-ssr-seo

Framework-agnostic SEO utilities, metadata builders, structured data helpers, and React components for server-rendered applications.

## Why?

Most SEO packages are either tightly coupled to Next.js or rely on browser-only APIs. `react-ssr-seo` gives you **clean, typed, SSR-safe** SEO primitives that work everywhere:

- **Next.js** App Router & Pages Router
- **React Router 7** with SSR
- **Express + React** custom SSR
- Any server-rendered React app

The core logic has **zero framework dependencies**. Use the utility functions standalone, or use the included `<SEOHead>` component to render tags directly.

## Supported Environments

| Environment | How it works |
|---|---|
| Next.js App Router | Use builders to construct `generateMetadata` return values + `safeJsonLdSerialize` for JSON-LD |
| Next.js Pages Router | Use `<SEOHead>` inside `<Head>` from `next/head` |
| React Router 7 SSR | Use `<SEOHead>` in your document/root component |
| Express + React SSR | Use `<SEOHead>` or builders directly in `renderToString` |
| Astro / Remix / Solid | Use the pure utility functions — no React required for core logic |

## Installation

```bash
npm install react-ssr-seo
# or
pnpm add react-ssr-seo
# or
yarn add react-ssr-seo
```

**Peer dependency:** `react >= 18.0.0`

## Quick Start

```tsx
import {
  SEOHead,
  createSEOConfig,
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
} from "react-ssr-seo";

// 1. Define site-wide defaults
const siteConfig = createSEOConfig({
  titleTemplate: "%s | MySite",
  openGraph: { siteName: "MySite", type: "website" },
  twitter: { card: "summary_large_image", site: "@mysite" },
});

// 2. Merge with page-level config
const pageConfig = mergeSEOConfig(siteConfig, {
  title: "About Us",
  description: "Learn about our company.",
  canonical: buildCanonicalUrl("https://mysite.com", "/about"),
});

// 3. Render in your SSR document
function Document() {
  return (
    <html>
      <head>
        <SEOHead {...pageConfig} />
      </head>
      <body>{/* ... */}</body>
    </html>
  );
}
```

## API Reference

### Config Builders

#### `createSEOConfig(config?)`
Create an SEO config with normalization applied.

#### `mergeSEOConfig(base, override)`
Deep-merge a site-wide config with page-level overrides. Arrays (alternates, additionalMetaTags) are replaced, not concatenated.

#### `normalizeSEOConfig(config)`
Trim strings, normalize URLs, clean up a config object.

### Metadata Helpers

#### `buildTitle(title?, template?)`
```ts
buildTitle("About", "%s | MySite") // "About | MySite"
```

#### `buildDescription(description?, maxLength?)`
Truncates at `maxLength` with an ellipsis if needed.

#### `buildCanonicalUrl(baseUrl, path?)`
```ts
buildCanonicalUrl("https://example.com", "/about") // "https://example.com/about"
```

#### `buildRobotsDirectives(config?)`
```ts
buildRobotsDirectives({ index: false, follow: true, noarchive: true })
// "noindex, follow, noarchive"
```

#### `noIndex()` / `noIndexNoFollow()`
Convenience helpers that return `RobotsConfig` objects.

#### `buildOpenGraph(config?)`
Returns `Array<{ property, content }>` for meta tags.

#### `buildTwitterMetadata(config?)`
Returns `Array<{ name, content }>` for meta tags.

#### `buildAlternateLinks(alternates?)`
Returns `Array<{ rel, hreflang, href }>` for link tags.

### Structured Data / JSON-LD

All schema helpers return a plain object with `@context` and `@type` set.

```ts
import {
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createArticleSchema,
  createProductSchema,
  createFAQSchema,
  composeSchemas,
} from "react-ssr-seo";
```

#### `createOrganizationSchema(input)`
```ts
createOrganizationSchema({
  name: "Acme Inc",
  url: "https://acme.com",
  logo: "https://acme.com/logo.png",
  sameAs: ["https://twitter.com/acme"],
});
```

#### `createWebsiteSchema(input)`
Supports optional site search action.

#### `createBreadcrumbSchema(items)`
```ts
createBreadcrumbSchema([
  { name: "Home", url: "https://example.com" },
  { name: "Blog", url: "https://example.com/blog" },
  { name: "Post Title", url: "https://example.com/blog/my-post" },
]);
```

#### `createArticleSchema(input)`
Supports single or multiple authors, publisher, dates, keywords.

#### `createProductSchema(input)`
Supports price/offer, brand, SKU, aggregate rating.

#### `createFAQSchema(items)`
```ts
createFAQSchema([
  { question: "What is this?", answer: "An awesome product." },
]);
```

#### `composeSchemas(...schemas)`
Combine multiple schemas into a single `@graph` array.

### Utilities

#### `safeJsonLdSerialize(data)`
Safely serialize JSON-LD for use in `<script>` tags. Escapes `<`, `>`, `&` to prevent injection.

#### `normalizeUrl(url)`
Trim and strip trailing slashes.

#### `buildFullUrl(base, path?)`
Combine base URL with path.

#### `omitEmpty(obj)` / `deepMerge(base, override)`
Object utility helpers.

### React Components

#### `<SEOHead>`
Renders all SEO tags as React elements. Place inside `<head>`.

```tsx
<SEOHead
  title="My Page"
  titleTemplate="%s | MySite"
  description="Page description"
  canonical="https://mysite.com/page"
  robots={{ index: true, follow: true }}
  openGraph={{
    title: "My Page",
    type: "website",
    images: [{ url: "https://mysite.com/og.jpg", width: 1200, height: 630 }],
  }}
  twitter={{
    card: "summary_large_image",
    site: "@mysite",
  }}
  alternates={[
    { hreflang: "en", href: "https://mysite.com/en/page" },
    { hreflang: "fr", href: "https://mysite.com/fr/page" },
  ]}
  jsonLd={createArticleSchema({ headline: "My Article", url: "..." })}
/>
```

#### `<JsonLd>`
Standalone JSON-LD script tag renderer.

```tsx
<JsonLd data={createProductSchema({ name: "Widget", url: "...", price: 29.99 })} />
```

## Framework Examples

### Next.js App Router

Use the builders to construct metadata and serialize JSON-LD:

```tsx
// app/blog/[slug]/page.tsx
import { buildTitle, buildCanonicalUrl, createArticleSchema, safeJsonLdSerialize } from "react-ssr-seo";

export function generateMetadata({ params }) {
  return {
    title: buildTitle("My Article", "%s | Blog"),
    alternates: { canonical: buildCanonicalUrl("https://mysite.com", `/blog/${params.slug}`) },
  };
}

export default function Page() {
  const schema = createArticleSchema({ headline: "My Article", url: "..." });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(schema) }} />
      <article>...</article>
    </>
  );
}
```

### React Router 7 SSR

Use `<SEOHead>` in your root/layout component:

```tsx
import { SEOHead, createSEOConfig, mergeSEOConfig } from "react-ssr-seo";

const siteConfig = createSEOConfig({ titleTemplate: "%s — MySite" });

export default function Root() {
  const pageConfig = mergeSEOConfig(siteConfig, { title: "Home" });
  return (
    <html>
      <head>
        <SEOHead {...pageConfig} />
      </head>
      <body>{/* outlet */}</body>
    </html>
  );
}
```

### Generic SSR (Express)

```tsx
import { renderToString } from "react-dom/server";
import { SEOHead, JsonLd, createProductSchema, mergeSEOConfig } from "react-ssr-seo";

function ProductPage({ product }) {
  return (
    <html>
      <head>
        <SEOHead title={product.name} description={product.description} />
        <JsonLd data={createProductSchema({ name: product.name, url: product.url, price: product.price })} />
      </head>
      <body><h1>{product.name}</h1></body>
    </html>
  );
}

app.get("/products/:id", (req, res) => {
  const html = renderToString(<ProductPage product={getProduct(req.params.id)} />);
  res.send(`<!DOCTYPE html>${html}`);
});
```

## Local Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Watch mode
npm run dev
```

## Publishing

```bash
# 1. Ensure clean build
npm run clean && npm run build

# 2. Run tests
npm test

# 3. Verify package contents
npm pack --dry-run

# 4. Publish
npm publish
```

## Troubleshooting

**"Cannot find module 'react-ssr-seo'"**
Ensure the package is installed and your bundler supports the `exports` field in package.json.

**Hydration mismatch warnings**
`<SEOHead>` produces deterministic output. If you see hydration warnings, ensure the same config is used on both server and client.

**JSON-LD not appearing in page source**
Make sure `<JsonLd>` or the JSON-LD `<script>` tag is inside `<head>` and rendered during SSR, not in a client-only effect.

**TypeScript errors with strict mode**
All types are exported. Import them directly:
```ts
import type { SEOConfig, OpenGraphConfig } from "react-ssr-seo";
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes with tests
4. Run `npm test` and `npm run lint`
5. Open a PR

## License

MIT
