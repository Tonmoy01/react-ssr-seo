import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function RecipesPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Recipes",
    description:
      "Copy-paste ready SEO recipes for common page types: blog posts, products, FAQs, e-commerce, dashboards, and more.",
    canonical: buildCanonicalUrl(SITE_URL, "/recipes"),
  });

  return (
    <Document pageConfig={pageConfig} activeRoute="/recipes">
      <div className="page-header">
        <h1>Copy-Paste Recipes</h1>
        <p>
          Ready-to-use code examples for common page types. Copy, paste, and
          customize for your project.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        <div className="callout callout-info" style={{ marginBottom: "2rem" }}>
          <div className="callout-icon">i</div>
          <div className="callout-content">
            <p>
              All recipes assume you have a shared <code>config/seo.ts</code> with{" "}
              <code>siteConfig</code> and <code>SITE_URL</code>, and a <code>Document</code>{" "}
              component. See <a href="/getting-started">Getting Started</a> for setup.
            </p>
          </div>
        </div>

        {/* Recipe 1 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            1. Simple static page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Good for About, Contact, Terms, Privacy pages.
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
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our mission, team, and values.",
    canonical: buildCanonicalUrl(SITE_URL, "/about"),
  });

  return (
    <Document seo={seo}>
      <h1>About Us</h1>
      <p>Our story and mission...</p>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Recipe 2 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            2. Blog article with structured data
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
    twitter: {
      title: post.title,
      description: post.excerpt,
      image: post.image,
    },
  });

  const schemas = [
    createArticleSchema({
      headline: post.title,
      url,
      datePublished: post.publishDate,
      dateModified: post.updateDate,
      author: post.authors,
      publisher: { name: "My Blog", logo: \`\${SITE_URL}/logo.png\` },
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
        <p>By {post.authors.map(a => a.name).join(", ")}</p>
        <div>{post.content}</div>
      </article>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Recipe 3 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            3. Product detail page
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/ProductDetailPage.tsx</span>
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

export function ProductDetailPage({ product }) {
  const url = buildCanonicalUrl(SITE_URL, \`/products/\${product.slug}\`);

  const seo = mergeSEOConfig(siteConfig, {
    title: product.name,
    description: \`\$\${product.price} — \${product.description}\`,
    canonical: url,
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      type: "product",
      images: [{ url: product.image, width: 1200, height: 630 }],
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
      brand: product.brand,
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
      <p>\${product.price}</p>
      <p>{product.description}</p>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Recipe 4 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            4. FAQ page with rich results
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

const faqs = [
  { question: "What is your return policy?", answer: "30-day money-back guarantee." },
  { question: "How long is shipping?", answer: "5-7 business days standard." },
  { question: "Do you ship internationally?", answer: "Yes, to 50+ countries." },
];

export function FAQPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description: "Answers to frequently asked questions.",
    canonical: buildCanonicalUrl(SITE_URL, "/faq"),
  });

  return (
    <Document seo={seo} schemas={[createFAQSchema(faqs)]}>
      <h1>FAQ</h1>
      {faqs.map((faq, i) => (
        <div key={i}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Recipe 5 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            5. Dynamic route with API data
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">server.tsx (Express route)</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`app.get("/blog/:slug", async (req, res) => {
  const post = await fetchPostBySlug(req.params.slug);

  if (!post) {
    res.status(404).send("Not found");
    return;
  }

  const html = renderToString(<BlogPostPage post={post} />);
  res.send(\`<!DOCTYPE html>\${html}\`);
});`}</pre>
          </div>
        </div>

        {/* Recipe 6 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            6. Private / noindex page
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/DashboardPage.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  noIndex,
  noIndexNoFollow,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";
import { Document } from "../components/Document";

export function DashboardPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "Dashboard",
    canonical: buildCanonicalUrl(SITE_URL, "/dashboard"),
    // noindex but still follow links:
    robots: noIndex(),
    // noindex AND nofollow:
    // robots: noIndexNoFollow(),
  });

  return (
    <Document seo={seo}>
      <h1>Dashboard</h1>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Recipe 7 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            7. Multi-language page with hreflang
          </h2>
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
    { hreflang: "de", href: \`\${SITE_URL}/de\` },
    { hreflang: "x-default", href: SITE_URL },
  ],
});
// Renders <link rel="alternate" hreflang="..." href="..." /> for each`}</pre>
          </div>
        </div>

        {/* Recipe 8 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            8. Composing multiple schemas
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Using composeSchemas</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  createOrganizationSchema,
  createWebsiteSchema,
  composeSchemas,
} from "react-ssr-seo-toolkit";

const org = createOrganizationSchema({ name: "My Co", url: "https://myco.com" });
const site = createWebsiteSchema({ name: "My Co", url: "https://myco.com" });

// Option 1: Separate schemas (multiple <script> tags)
<Document seo={seo} schemas={[org, site]}> ... </Document>

// Option 2: Composed @graph (single <script> tag)
const composed = composeSchemas(org, site);
<Document seo={seo} schemas={[composed]}> ... </Document>`}</pre>
          </div>
        </div>

        {/* Recipe 9 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            9. Custom meta and link tags
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Custom tags example</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`const seo = mergeSEOConfig(siteConfig, {
  title: "My Page",
  additionalMetaTags: [
    { name: "author", content: "Jane Doe" },
    { name: "theme-color", content: "#6d28d9" },
    { property: "fb:app_id", content: "123456789" },
  ],
  additionalLinkTags: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "icon", href: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  ],
});`}</pre>
          </div>
        </div>

        {/* Recipe 10 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            10. Next.js App Router page
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            See the <a href="/nextjs-guide">Next.js Guide</a> for the full setup.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">app/blog/[slug]/page.tsx (Next.js)</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig, buildTitle, buildCanonicalUrl,
  createArticleSchema, safeJsonLdSerialize,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const seo = mergeSEOConfig(siteConfig, {
    title: post.title,
    description: post.excerpt,
  });

  return {
    title: buildTitle(seo.title!, seo.titleTemplate),
    description: seo.description,
    alternates: { canonical: buildCanonicalUrl(SITE_URL, \`/blog/\${slug}\`) },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  const schema = createArticleSchema({
    headline: post.title,
    url: buildCanonicalUrl(SITE_URL, \`/blog/\${slug}\`),
    datePublished: post.date,
    author: [{ name: post.author }],
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(schema) }}
      />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}`}</pre>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>All functions used in these recipes</strong> are documented in the{" "}
              <a href="/api">API Reference</a>. See the <a href="/article">Article Demo</a>,{" "}
              <a href="/product">Product Demo</a>, and <a href="/faq">FAQ Demo</a> for
              live working examples.
            </p>
          </div>
        </div>
      </div>
    </Document>
  );
}
