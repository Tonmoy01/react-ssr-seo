import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import {
  SEOHead,
  JsonLd,
  createSEOConfig,
  mergeSEOConfig,
  buildCanonicalUrl,
  createOrganizationSchema,
  createWebsiteSchema,
  createArticleSchema,
  createProductSchema,
  createBreadcrumbSchema,
  createFAQSchema,
  noIndex,
} from "../src/index.js";

const app = express();
const PORT = 3000;

const siteConfig = createSEOConfig({
  titleTemplate: "%s | Acme Store",
  description: "Acme Store — Quality products and insights.",
  openGraph: {
    siteName: "Acme Store",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@acmestore",
  },
});

// ─── Layout wrapper ───────────────────────────────────────────

function Layout({
  children,
  pageConfig,
  schemas,
}: {
  children: React.ReactNode;
  pageConfig: ReturnType<typeof createSEOConfig>;
  schemas?: Record<string, unknown>[];
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
        {schemas?.map((s, i) => (
          <JsonLd key={i} data={s} />
        ))}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #1a1a2e; background: #f8f9fa; }
              .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
              nav { background: #1a1a2e; padding: 1rem 2rem; }
              nav a { color: #e8e8e8; text-decoration: none; margin-right: 1.5rem; font-weight: 500; }
              nav a:hover { color: #7c3aed; }
              h1 { color: #1a1a2e; margin-bottom: 1rem; font-size: 2rem; }
              h2 { color: #374151; margin: 1.5rem 0 0.5rem; }
              .card { background: white; border-radius: 8px; padding: 1.5rem; margin: 1rem 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
              .tag { display: inline-block; background: #ede9fe; color: #7c3aed; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; margin: 2px; }
              .price { font-size: 1.5rem; font-weight: bold; color: #059669; }
              .badge { display: inline-block; background: #d1fae5; color: #065f46; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; }
              code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9rem; }
              pre { background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; font-size: 0.85rem; }
              .hint { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin: 1rem 0; border-radius: 0 8px 8px 0; }
              footer { text-align: center; padding: 2rem; color: #6b7280; font-size: 0.9rem; }
            `,
          }}
        />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/article">Article</a>
          <a href="/product">Product</a>
          <a href="/faq">FAQ</a>
          <a href="/noindex">No-Index</a>
        </nav>
        <div className="container">{children}</div>
        <footer>
          react-ssr-seo — View Page Source to inspect SEO tags
        </footer>
      </body>
    </html>
  );
}

// ─── Pages ────────────────────────────────────────────────────

function HomePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: "https://acmestore.com",
    openGraph: {
      title: "Acme Store — Quality products and insights",
      url: "https://acmestore.com",
      images: [
        {
          url: "https://acmestore.com/og-home.jpg",
          width: 1200,
          height: 630,
          alt: "Acme Store",
        },
      ],
    },
    alternates: [
      { hreflang: "en", href: "https://acmestore.com" },
      { hreflang: "es", href: "https://acmestore.com/es" },
      { hreflang: "fr", href: "https://acmestore.com/fr" },
    ],
  });

  const schemas = [
    createOrganizationSchema({
      name: "Acme Store",
      url: "https://acmestore.com",
      logo: "https://acmestore.com/logo.png",
      sameAs: ["https://twitter.com/acme", "https://github.com/acme"],
    }),
    createWebsiteSchema({
      name: "Acme Store",
      url: "https://acmestore.com",
      description: "Quality products and insights.",
      searchUrl: "https://acmestore.com/search",
    }),
  ];

  return (
    <Layout pageConfig={pageConfig} schemas={schemas}>
      <h1>Welcome to Acme Store</h1>
      <div className="hint">
        <strong>Right-click → View Page Source</strong> to see all the SEO tags,
        Open Graph meta, Twitter cards, hreflang links, and JSON-LD structured
        data rendered by <code>react-ssr-seo</code>.
      </div>
      <div className="card">
        <h2>What this demo shows</h2>
        <p>Each page demonstrates different SEO features:</p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>
            <a href="/">Home</a> — Organization + Website schema, hreflang, OG
            images
          </li>
          <li>
            <a href="/article">Article</a> — Article schema, breadcrumbs,
            author, dates
          </li>
          <li>
            <a href="/product">Product</a> — Product schema with pricing,
            ratings, availability
          </li>
          <li>
            <a href="/faq">FAQ</a> — FAQPage schema
          </li>
          <li>
            <a href="/noindex">No-Index</a> — Robots noindex directive
          </li>
        </ul>
      </div>
    </Layout>
  );
}

function ArticlePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components, how they work, and why they matter for modern web development.",
    canonical: buildCanonicalUrl("https://acmestore.com", "/blog/react-server-components"),
    openGraph: {
      title: "Understanding React Server Components",
      description: "A deep dive into RSC architecture.",
      type: "article",
      url: "https://acmestore.com/blog/react-server-components",
      images: [
        {
          url: "https://acmestore.com/images/rsc.jpg",
          width: 1200,
          height: 630,
          alt: "React Server Components diagram",
        },
      ],
    },
    twitter: {
      title: "Understanding React Server Components",
      description: "A deep dive into RSC architecture.",
      creator: "@janedoe",
      image: "https://acmestore.com/images/rsc.jpg",
    },
  });

  const schemas = [
    createArticleSchema({
      headline: "Understanding React Server Components",
      url: "https://acmestore.com/blog/react-server-components",
      description: "A deep dive into RSC architecture.",
      datePublished: "2025-06-15",
      dateModified: "2025-07-01",
      author: [
        { name: "Jane Doe", url: "https://acmestore.com/authors/jane" },
        { name: "John Smith" },
      ],
      publisher: { name: "Acme Store", logo: "https://acmestore.com/logo.png" },
      images: ["https://acmestore.com/images/rsc.jpg"],
      section: "Technology",
      keywords: ["React", "Server Components", "SSR", "RSC"],
    }),
    createBreadcrumbSchema([
      { name: "Home", url: "https://acmestore.com" },
      { name: "Blog", url: "https://acmestore.com/blog" },
      { name: "React Server Components", url: "https://acmestore.com/blog/react-server-components" },
    ]),
  ];

  return (
    <Layout pageConfig={pageConfig} schemas={schemas}>
      <article>
        <h1>Understanding React Server Components</h1>
        <p style={{ color: "#6b7280" }}>
          By Jane Doe & John Smith · June 15, 2025
        </p>
        <div className="card">
          <p>
            React Server Components represent a fundamental shift in how we
            think about rendering in React applications. This article explores
            the architecture, benefits, and practical considerations.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <span className="tag">React</span>
            <span className="tag">Server Components</span>
            <span className="tag">SSR</span>
            <span className="tag">RSC</span>
          </div>
        </div>
        <div className="hint">
          View source to see: <code>Article</code> schema with multiple authors,{" "}
          <code>BreadcrumbList</code> schema, OG article type, and Twitter card
          with creator.
        </div>
      </article>
    </Layout>
  );
}

function ProductPage() {
  const product = {
    name: "Ergonomic Mechanical Keyboard",
    slug: "ergonomic-keyboard",
    description:
      "Premium split mechanical keyboard with Cherry MX Brown switches. Designed for all-day comfort.",
    price: 189.99,
    image: "https://acmestore.com/images/keyboard.jpg",
    brand: "Acme Peripherals",
    sku: "ACME-KB-001",
    inStock: true,
    rating: 4.7,
    reviewCount: 342,
  };

  const url = buildCanonicalUrl("https://acmestore.com", `/products/${product.slug}`);

  const pageConfig = mergeSEOConfig(siteConfig, {
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
    twitter: {
      title: product.name,
      description: product.description,
      image: product.image,
    },
  });

  const schemas = [
    createProductSchema({
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
    }),
    createBreadcrumbSchema([
      { name: "Home", url: "https://acmestore.com" },
      { name: "Products", url: "https://acmestore.com/products" },
      { name: product.name, url },
    ]),
  ];

  return (
    <Layout pageConfig={pageConfig} schemas={schemas}>
      <h1>{product.name}</h1>
      <div className="card">
        <p>{product.description}</p>
        <div style={{ marginTop: "1rem" }}>
          <span className="price">${product.price}</span>{" "}
          <span className="badge">In Stock</span>
        </div>
        <p style={{ marginTop: "0.5rem", color: "#6b7280" }}>
          Brand: {product.brand} · SKU: {product.sku} · Rating: {product.rating}
          /5 ({product.reviewCount} reviews)
        </p>
      </div>
      <div className="hint">
        View source to see: <code>Product</code> schema with Offer, Brand,
        AggregateRating, and <code>BreadcrumbList</code>.
      </div>
    </Layout>
  );
}

function FAQPage() {
  const faqs = [
    { question: "What is react-ssr-seo?", answer: "A framework-agnostic SEO utility library for React SSR applications." },
    { question: "Does it work with Next.js?", answer: "Yes! Use the builder functions with generateMetadata or the SEOHead component." },
    { question: "Does it work with React Router 7?", answer: "Yes. Use the SEOHead component in your root/layout SSR document." },
    { question: "Is it SSR-safe?", answer: "Absolutely. No browser globals are used. All output is deterministic and hydration-safe." },
    { question: "Does it support JSON-LD?", answer: "Yes. It includes generators for Organization, Website, Article, Product, Breadcrumb, and FAQ schemas." },
  ];

  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description: "Frequently asked questions about react-ssr-seo.",
    canonical: buildCanonicalUrl("https://acmestore.com", "/faq"),
  });

  const schemas = [createFAQSchema(faqs)];

  return (
    <Layout pageConfig={pageConfig} schemas={schemas}>
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, i) => (
        <div className="card" key={i}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
      <div className="hint">
        View source to see: <code>FAQPage</code> schema with Question +
        Answer pairs.
      </div>
    </Layout>
  );
}

function NoIndexPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Internal Page",
    description: "This page should not be indexed by search engines.",
    robots: noIndex(),
  });

  return (
    <Layout pageConfig={pageConfig}>
      <h1>No-Index Page</h1>
      <div className="card">
        <p>This page has <code>noindex, follow</code> set in the robots meta tag.</p>
        <p>Search engines will not index this page but will follow its links.</p>
      </div>
      <div className="hint">
        View source to see: <code>&lt;meta name="robots" content="noindex, follow"&gt;</code>
      </div>
    </Layout>
  );
}

// ─── Routes ───────────────────────────────────────────────────

const routes: Record<string, () => React.ReactElement> = {
  "/": HomePage,
  "/article": ArticlePage,
  "/product": ProductPage,
  "/faq": FAQPage,
  "/noindex": NoIndexPage,
};

app.get("/{*splat}", (req, res) => {
  const Page = routes[req.path];
  if (!Page) {
    res.status(404).send("Not found");
    return;
  }
  const html = renderToString(<Page />);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT, () => {
  console.log(`\n  SEO Demo Server running at:\n`);
  console.log(`  → http://localhost:${PORT}         (Home)`);
  console.log(`  → http://localhost:${PORT}/article  (Article)`);
  console.log(`  → http://localhost:${PORT}/product  (Product)`);
  console.log(`  → http://localhost:${PORT}/faq      (FAQ)`);
  console.log(`  → http://localhost:${PORT}/noindex  (No-Index)`);
  console.log(`\n  Right-click → View Page Source to inspect SEO tags\n`);
});
