/**
 * React Router 7 SSR Example
 *
 * In React Router 7 with SSR (framework mode), you can use
 * `meta` exports on routes and render tags in the document head.
 *
 * This example shows how to use react-ssr-seo with
 * React Router 7's SSR document flow.
 */

import React from "react";
import {
  SEOHead,
  createSEOConfig,
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
  createOrganizationSchema,
  createBreadcrumbSchema,
  noIndex,
} from "react-ssr-seo";

// ─── Site-wide config ─────────────────────────────────────────

const siteConfig = createSEOConfig({
  titleTemplate: "%s — Acme",
  description: "Acme — Building the future of the web.",
  openGraph: {
    siteName: "Acme",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@acme",
  },
});

// ─── Home Page ────────────────────────────────────────────────

export function HomePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: "https://acme.com",
    openGraph: {
      title: "Acme — Building the future of the web",
      url: "https://acme.com",
    },
    jsonLd: createOrganizationSchema({
      name: "Acme",
      url: "https://acme.com",
      logo: "https://acme.com/logo.png",
      sameAs: [
        "https://twitter.com/acme",
        "https://github.com/acme",
      ],
    }),
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
      </head>
      <body>
        <h1>Welcome to Acme</h1>
      </body>
    </html>
  );
}

// ─── Article Page ─────────────────────────────────────────────

export function ArticlePage() {
  const article = {
    title: "React Router 7 Deep Dive",
    description: "Everything you need to know about RR7 with SSR.",
    slug: "react-router-7-deep-dive",
    date: "2025-08-01",
    author: "John Smith",
    image: "https://acme.com/images/rr7.jpg",
  };

  const pageConfig = mergeSEOConfig(siteConfig, {
    title: article.title,
    description: article.description,
    canonical: buildCanonicalUrl("https://acme.com", `/blog/${article.slug}`),
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: buildCanonicalUrl("https://acme.com", `/blog/${article.slug}`),
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      title: article.title,
      description: article.description,
      image: article.image,
    },
    jsonLd: [
      createArticleSchema({
        headline: article.title,
        url: buildCanonicalUrl("https://acme.com", `/blog/${article.slug}`),
        description: article.description,
        datePublished: article.date,
        author: { name: article.author },
        images: [article.image],
      }),
      createBreadcrumbSchema([
        { name: "Home", url: "https://acme.com" },
        { name: "Blog", url: "https://acme.com/blog" },
        { name: article.title, url: buildCanonicalUrl("https://acme.com", `/blog/${article.slug}`) },
      ]),
    ],
    alternates: [
      { hreflang: "en", href: `https://acme.com/blog/${article.slug}` },
      { hreflang: "es", href: `https://acme.com/es/blog/${article.slug}` },
    ],
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
      </head>
      <body>
        <article>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </article>
      </body>
    </html>
  );
}

// ─── 404 / No-index page ─────────────────────────────────────

export function NotFoundPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Page Not Found",
    robots: noIndex(),
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <SEOHead {...pageConfig} />
      </head>
      <body>
        <h1>404 — Not Found</h1>
      </body>
    </html>
  );
}
