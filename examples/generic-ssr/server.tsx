/**
 * Generic React SSR Example (Express + ReactDOMServer)
 *
 * Shows how to use react-ssr-seo in a plain Node/Express
 * server-rendered React application without any framework.
 */

import React from "react";
import { renderToString } from "react-dom/server";
import {
  SEOHead,
  JsonLd,
  createSEOConfig,
  mergeSEOConfig,
  buildCanonicalUrl,
  createProductSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
} from "react-ssr-seo";

// ─── Site-wide config ─────────────────────────────────────────

const siteConfig = createSEOConfig({
  titleTemplate: "%s | MyShop",
  description: "MyShop — Quality products at great prices.",
  openGraph: {
    siteName: "MyShop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@myshop",
  },
});

// ─── Product Page Component ──────────────────────────────────

interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  sku: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

function ProductPage({ product }: { product: Product }) {
  const url = buildCanonicalUrl("https://myshop.com", `/products/${product.slug}`);

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

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://myshop.com" },
    { name: "Products", url: "https://myshop.com/products" },
    { name: product.name, url },
  ]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
        <JsonLd data={productSchema} />
        <JsonLd data={breadcrumbSchema} />
      </head>
      <body>
        <main>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>
            ${product.price} — {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </main>
      </body>
    </html>
  );
}

// ─── Express-style handler ────────────────────────────────────

/**
 * Example: how you'd use this in an Express route handler.
 *
 * app.get("/products/:slug", (req, res) => {
 *   const product = getProductBySlug(req.params.slug);
 *   const html = renderProductPage(product);
 *   res.status(200).send(`<!DOCTYPE html>${html}`);
 * });
 */
export function renderProductPage(product: Product): string {
  return renderToString(<ProductPage product={product} />);
}

// ─── Homepage example ─────────────────────────────────────────

function Homepage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: "https://myshop.com",
  });

  const websiteSchema = createWebsiteSchema({
    name: "MyShop",
    url: "https://myshop.com",
    description: "Quality products at great prices.",
    searchUrl: "https://myshop.com/search",
    searchQueryParam: "q",
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <h1>Welcome to MyShop</h1>
      </body>
    </html>
  );
}

export function renderHomepage(): string {
  return renderToString(<Homepage />);
}
