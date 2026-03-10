import React from "react";
import {
  SEOHead,
  JsonLd,
  mergeSEOConfig,
  buildCanonicalUrl,
  createProductSchema,
  createBreadcrumbSchema,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo.js";

export interface Product {
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

export function ProductPage({ product }: { product: Product }) {
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
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
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
