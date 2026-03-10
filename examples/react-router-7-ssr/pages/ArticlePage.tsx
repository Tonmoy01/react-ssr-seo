import React from "react";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function ArticlePage() {
  const article = {
    title: "React Router 7 Deep Dive",
    description: "Everything you need to know about RR7 with SSR.",
    slug: "react-router-7-deep-dive",
    date: "2025-08-01",
    author: "John Smith",
    image: `${SITE_URL}/images/rr7.jpg`,
  };

  const pageConfig = mergeSEOConfig(siteConfig, {
    title: article.title,
    description: article.description,
    canonical: buildCanonicalUrl(SITE_URL, `/blog/${article.slug}`),
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: buildCanonicalUrl(SITE_URL, `/blog/${article.slug}`),
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
        url: buildCanonicalUrl(SITE_URL, `/blog/${article.slug}`),
        description: article.description,
        datePublished: article.date,
        author: { name: article.author },
        images: [article.image],
      }),
      createBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: article.title, url: buildCanonicalUrl(SITE_URL, `/blog/${article.slug}`) },
      ]),
    ],
    alternates: [
      { hreflang: "en", href: `${SITE_URL}/blog/${article.slug}` },
      { hreflang: "es", href: `${SITE_URL}/es/blog/${article.slug}` },
    ],
  });

  return (
    <Document pageConfig={pageConfig}>
      <article>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
      </article>
    </Document>
  );
}
