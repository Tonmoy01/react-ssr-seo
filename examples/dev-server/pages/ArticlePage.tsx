import React from "react";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
} from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Layout } from "../components/Layout.js";

export function ArticlePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components, how they work, and why they matter for modern web development.",
    canonical: buildCanonicalUrl(SITE_URL, "/blog/react-server-components"),
    openGraph: {
      title: "Understanding React Server Components",
      description: "A deep dive into RSC architecture.",
      type: "article",
      url: `${SITE_URL}/blog/react-server-components`,
      images: [
        {
          url: `${SITE_URL}/images/rsc.jpg`,
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
      image: `${SITE_URL}/images/rsc.jpg`,
    },
  });

  const schemas = [
    createArticleSchema({
      headline: "Understanding React Server Components",
      url: `${SITE_URL}/blog/react-server-components`,
      description: "A deep dive into RSC architecture.",
      datePublished: "2025-06-15",
      dateModified: "2025-07-01",
      author: [
        { name: "Jane Doe", url: `${SITE_URL}/authors/jane` },
        { name: "John Smith" },
      ],
      publisher: { name: "Acme Store", logo: `${SITE_URL}/logo.png` },
      images: [`${SITE_URL}/images/rsc.jpg`],
      section: "Technology",
      keywords: ["React", "Server Components", "SSR", "RSC"],
    }),
    createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      {
        name: "React Server Components",
        url: `${SITE_URL}/blog/react-server-components`,
      },
    ]),
  ];

  return (
    <Layout pageConfig={pageConfig} schemas={schemas} activeRoute="/article">
      <div className="page-header">
        <h1>Article Page Demo</h1>
        <p>
          Article schema with multiple authors, breadcrumbs, OG article type, and Twitter creator card.
        </p>
        <div className="page-tags" style={{ marginTop: "0.75rem" }}>
          <span className="tag">Article Schema</span>
          <span className="tag">Breadcrumbs</span>
          <span className="tag">Open Graph</span>
          <span className="tag">Twitter Card</span>
        </div>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>
        {/* Preview */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>Preview</h2>
          <p className="section-subtitle">
            This is how the article page renders — with all SEO tags in the HTML source.
          </p>

          <article>
            <div className="card card-elevated">
              <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                Home / Blog / React Server Components
              </p>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                Understanding React Server Components
              </h2>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1rem" }}>
                By Jane Doe &amp; John Smith &middot; June 15, 2025 &middot; Updated July 1, 2025
              </p>
              <p>
                React Server Components represent a fundamental shift in how we
                think about rendering in React applications. This article explores
                the architecture, benefits, and practical considerations of adopting
                RSC in your projects.
              </p>
              <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                <span className="tag">React</span>
                <span className="tag">Server Components</span>
                <span className="tag">SSR</span>
                <span className="tag">RSC</span>
              </div>
            </div>
          </article>
        </div>

        {/* SEO Tags Generated */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            SEO Tags Generated
          </h2>
          <p className="section-subtitle">
            View Page Source to verify these. Here's what react-ssr-seo renders for this page:
          </p>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated meta tags</span>
              <span className="code-header-lang">HTML</span>
            </div>
            <pre>{`<!-- Title with template -->
<title>Understanding React Server Components | Acme Store</title>
<meta name="description" content="A deep dive into React Server Components..." />
<link rel="canonical" href="https://acmestore.com/blog/react-server-components" />

<!-- Open Graph (Article type) -->
<meta property="og:title" content="Understanding React Server Components" />
<meta property="og:description" content="A deep dive into RSC architecture." />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://acmestore.com/blog/react-server-components" />
<meta property="og:image" content="https://acmestore.com/images/rsc.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Acme Store" />

<!-- Twitter Card with creator -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@acmestore" />
<meta name="twitter:creator" content="@janedoe" />
<meta name="twitter:title" content="Understanding React Server Components" />
<meta name="twitter:description" content="A deep dive into RSC architecture." />
<meta name="twitter:image" content="https://acmestore.com/images/rsc.jpg" />`}</pre>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated JSON-LD structured data</span>
              <span className="code-header-lang">JSON-LD</span>
            </div>
            <pre>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Understanding React Server Components",
  "url": "https://acmestore.com/blog/react-server-components",
  "description": "A deep dive into RSC architecture.",
  "datePublished": "2025-06-15",
  "dateModified": "2025-07-01",
  "author": [
    { "@type": "Person", "name": "Jane Doe", "url": ".../authors/jane" },
    { "@type": "Person", "name": "John Smith" }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "Acme Store",
    "logo": { "@type": "ImageObject", "url": ".../logo.png" }
  },
  "articleSection": "Technology",
  "keywords": ["React", "Server Components", "SSR", "RSC"]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://acmestore.com" },
    { "position": 2, "name": "Blog", "item": "https://acmestore.com/blog" },
    { "position": 3, "name": "React Server Components", "item": "..." }
  ]
}
</script>`}</pre>
          </div>
        </div>

        {/* Source Code */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Source Code
          </h2>
          <p className="section-subtitle">
            Here's the exact code used to build this page:
          </p>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">ArticlePage.tsx — SEO config</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
  SEOHead,
  JsonLd,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo";

// 1. Merge page config with site defaults
const pageConfig = mergeSEOConfig(siteConfig, {
  title: "Understanding React Server Components",
  description: "A deep dive into React Server Components...",
  canonical: buildCanonicalUrl(SITE_URL, "/blog/react-server-components"),
  openGraph: {
    title: "Understanding React Server Components",
    description: "A deep dive into RSC architecture.",
    type: "article",
    url: \`\${SITE_URL}/blog/react-server-components\`,
    images: [{
      url: \`\${SITE_URL}/images/rsc.jpg\`,
      width: 1200,
      height: 630,
      alt: "React Server Components diagram",
    }],
  },
  twitter: {
    creator: "@janedoe",
    image: \`\${SITE_URL}/images/rsc.jpg\`,
  },
});

// 2. Create structured data schemas
const articleSchema = createArticleSchema({
  headline: "Understanding React Server Components",
  url: \`\${SITE_URL}/blog/react-server-components\`,
  description: "A deep dive into RSC architecture.",
  datePublished: "2025-06-15",
  dateModified: "2025-07-01",
  author: [
    { name: "Jane Doe", url: \`\${SITE_URL}/authors/jane\` },
    { name: "John Smith" },
  ],
  publisher: { name: "Acme Store", logo: \`\${SITE_URL}/logo.png\` },
  images: [\`\${SITE_URL}/images/rsc.jpg\`],
  section: "Technology",
  keywords: ["React", "Server Components", "SSR", "RSC"],
});

const breadcrumb = createBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Blog", url: \`\${SITE_URL}/blog\` },
  { name: "React Server Components", url: \`\${SITE_URL}/blog/react-server-components\` },
]);

// 3. Render in JSX
<head>
  <SEOHead {...pageConfig} />
  <JsonLd data={articleSchema} />
  <JsonLd data={breadcrumb} />
</head>`}</pre>
          </div>
        </div>

        {/* Key Features Used */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Features Demonstrated
          </h2>
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="card">
              <h3>mergeSEOConfig</h3>
              <p>Deep-merges page config with site defaults. Arrays are replaced, not concatenated.</p>
            </div>
            <div className="card">
              <h3>createArticleSchema</h3>
              <p>Generates Article JSON-LD with multiple authors, publisher, dates, and keywords.</p>
            </div>
            <div className="card">
              <h3>createBreadcrumbSchema</h3>
              <p>Generates BreadcrumbList JSON-LD with ordered navigation items.</p>
            </div>
            <div className="card">
              <h3>Twitter Creator</h3>
              <p>Sets a per-article Twitter creator handle, separate from the site handle.</p>
            </div>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>Right-click → View Page Source</strong> to see all the Article
              meta tags, Open Graph article type, Twitter card with creator, and
              both JSON-LD scripts (Article + BreadcrumbList) in the actual HTML.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
