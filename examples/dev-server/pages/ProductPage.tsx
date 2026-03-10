import React from "react";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createProductSchema,
  createBreadcrumbSchema,
} from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Layout } from "../components/Layout.js";

export function ProductPage() {
  const product = {
    name: "Ergonomic Mechanical Keyboard",
    slug: "ergonomic-keyboard",
    description:
      "Premium split mechanical keyboard with Cherry MX Brown switches. Designed for all-day comfort and maximum productivity.",
    price: 189.99,
    image: `${SITE_URL}/images/keyboard.jpg`,
    brand: "Acme Peripherals",
    sku: "ACME-KB-001",
    inStock: true,
    rating: 4.7,
    reviewCount: 342,
  };

  const url = buildCanonicalUrl(SITE_URL, `/products/${product.slug}`);

  const pageConfig = mergeSEOConfig(siteConfig, {
    title: product.name,
    description: product.description,
    canonical: url,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "product",
      url,
      images: [
        { url: product.image, width: 800, height: 800, alt: product.name },
      ],
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
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      { name: product.name, url },
    ]),
  ];

  return (
    <Layout pageConfig={pageConfig} schemas={schemas} activeRoute="/product">
      <div className="page-header">
        <h1>Product Page Demo</h1>
        <p>
          Product schema with pricing, brand, availability, ratings, and breadcrumbs.
        </p>
        <div className="page-tags" style={{ marginTop: "0.75rem" }}>
          <span className="tag">Product Schema</span>
          <span className="tag">Offer</span>
          <span className="tag">AggregateRating</span>
          <span className="tag">Breadcrumbs</span>
        </div>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>
        {/* Preview */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>Preview</h2>
          <p className="section-subtitle">
            A product listing with all the SEO data rendered in the HTML source.
          </p>

          <div className="card card-elevated">
            <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              Home / Products / {product.name}
            </p>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              {product.name}
            </h2>
            <p style={{ marginBottom: "1rem" }}>{product.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              <span className="price">${product.price}</span>
              <span className="badge badge-success">In Stock</span>
            </div>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", color: "#64748b", fontSize: "0.9rem" }}>
              <span>Brand: <strong style={{ color: "#0f172a" }}>{product.brand}</strong></span>
              <span>SKU: <strong style={{ color: "#0f172a" }}>{product.sku}</strong></span>
              <span>Rating: <strong style={{ color: "#0f172a" }}>{product.rating}/5</strong> ({product.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* SEO Tags */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            SEO Tags Generated
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated meta tags</span>
              <span className="code-header-lang">HTML</span>
            </div>
            <pre>{`<title>Ergonomic Mechanical Keyboard | Acme Store</title>
<meta name="description" content="Premium split mechanical keyboard..." />
<link rel="canonical" href="https://acmestore.com/products/ergonomic-keyboard" />

<!-- Open Graph (Product type) -->
<meta property="og:title" content="Ergonomic Mechanical Keyboard" />
<meta property="og:description" content="Premium split mechanical keyboard..." />
<meta property="og:type" content="product" />
<meta property="og:url" content="https://acmestore.com/products/ergonomic-keyboard" />
<meta property="og:image" content="https://acmestore.com/images/keyboard.jpg" />
<meta property="og:image:width" content="800" />
<meta property="og:image:height" content="800" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@acmestore" />
<meta name="twitter:title" content="Ergonomic Mechanical Keyboard" />
<meta name="twitter:image" content="https://acmestore.com/images/keyboard.jpg" />`}</pre>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated JSON-LD structured data</span>
              <span className="code-header-lang">JSON-LD</span>
            </div>
            <pre>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Ergonomic Mechanical Keyboard",
  "url": "https://acmestore.com/products/ergonomic-keyboard",
  "description": "Premium split mechanical keyboard...",
  "sku": "ACME-KB-001",
  "brand": { "@type": "Brand", "name": "Acme Peripherals" },
  "image": ["https://acmestore.com/images/keyboard.jpg"],
  "offers": {
    "@type": "Offer",
    "price": 189.99,
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.7,
    "reviewCount": 342
  }
}
</script>`}</pre>
          </div>
        </div>

        {/* Source Code */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Source Code
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">ProductPage.tsx</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createProductSchema,
  createBreadcrumbSchema,
  SEOHead,
  JsonLd,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo";

const product = {
  name: "Ergonomic Mechanical Keyboard",
  slug: "ergonomic-keyboard",
  description: "Premium split mechanical keyboard...",
  price: 189.99,
  image: \`\${SITE_URL}/images/keyboard.jpg\`,
  brand: "Acme Peripherals",
  sku: "ACME-KB-001",
  inStock: true,
  rating: 4.7,
  reviewCount: 342,
};

const url = buildCanonicalUrl(SITE_URL, \`/products/\${product.slug}\`);

// 1. Page SEO config
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
});

// 2. Product schema with pricing & ratings
const productSchema = createProductSchema({
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

// 3. Breadcrumb navigation
const breadcrumb = createBreadcrumbSchema([
  { name: "Home", url: SITE_URL },
  { name: "Products", url: \`\${SITE_URL}/products\` },
  { name: product.name, url },
]);

// 4. Render
<head>
  <SEOHead {...pageConfig} />
  <JsonLd data={productSchema} />
  <JsonLd data={breadcrumb} />
</head>`}</pre>
          </div>
        </div>

        {/* Features */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Features Demonstrated
          </h2>
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="card">
              <h3>createProductSchema</h3>
              <p>Generates Product JSON-LD with Offer, Brand, and AggregateRating sub-types.</p>
            </div>
            <div className="card">
              <h3>Dynamic Data</h3>
              <p>SEO config built from product data — works with any CMS or database.</p>
            </div>
            <div className="card">
              <h3>OG Product Type</h3>
              <p>Open Graph type set to "product" for rich e-commerce sharing previews.</p>
            </div>
            <div className="card">
              <h3>Availability</h3>
              <p>InStock/OutOfStock availability mapped to schema.org values automatically.</p>
            </div>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>Right-click → View Page Source</strong> to see the Product
              schema with Offer, Brand, AggregateRating, and BreadcrumbList in
              the actual HTML.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
