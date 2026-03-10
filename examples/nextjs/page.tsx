/**
 * Next.js App Router Example
 *
 * In Next.js App Router, you export a `generateMetadata` function
 * and use the built-in <Script> or inline <script> for JSON-LD.
 *
 * This example shows how to use react-ssr-seo to build
 * the metadata object and JSON-LD schemas.
 */

import type { Metadata } from "next";
import {
  buildTitle,
  buildDescription,
  buildCanonicalUrl,
  buildOpenGraph,
  buildTwitterMetadata,
  createArticleSchema,
  createBreadcrumbSchema,
  createSEOConfig,
  mergeSEOConfig,
  safeJsonLdSerialize,
} from "react-ssr-seo";

// ─── Site-wide defaults ───────────────────────────────────────

const siteConfig = createSEOConfig({
  titleTemplate: "%s | Acme Blog",
  description: "Acme Blog — Insights on technology and design.",
  canonical: "https://acme.com",
  openGraph: {
    siteName: "Acme Blog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@acmeblog",
  },
});

// ─── Page-level metadata (Next.js generateMetadata) ──────────

export async function generateMetadata(): Promise<Metadata> {
  // In a real app, you'd fetch article data here
  const article = {
    title: "Understanding React Server Components",
    description: "A deep dive into RSC architecture and how it changes SSR.",
    slug: "understanding-rsc",
    publishedAt: "2025-06-15",
    author: "Jane Doe",
    image: "https://acme.com/images/rsc-article.jpg",
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
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      title: article.title,
      description: article.description,
      image: article.image,
    },
  });

  // Build the Next.js Metadata object from our config
  const ogTags = buildOpenGraph(pageConfig.openGraph);
  const twitterTags = buildTwitterMetadata(pageConfig.twitter);

  return {
    title: buildTitle(pageConfig.title, pageConfig.titleTemplate),
    description: buildDescription(pageConfig.description, 160),
    alternates: {
      canonical: pageConfig.canonical,
    },
    openGraph: {
      title: ogTags.find((t) => t.property === "og:title")?.content,
      description: ogTags.find((t) => t.property === "og:description")?.content,
      url: ogTags.find((t) => t.property === "og:url")?.content,
      siteName: ogTags.find((t) => t.property === "og:site_name")?.content,
      type: "article",
      images: pageConfig.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTags.find((t) => t.name === "twitter:title")?.content,
      description: twitterTags.find((t) => t.name === "twitter:description")?.content,
      images: pageConfig.twitter?.image ? [pageConfig.twitter.image] : undefined,
    },
  };
}

// ─── Page component with JSON-LD ─────────────────────────────

export default function ArticlePage() {
  const articleSchema = createArticleSchema({
    headline: "Understanding React Server Components",
    url: "https://acme.com/blog/understanding-rsc",
    description: "A deep dive into RSC architecture.",
    datePublished: "2025-06-15",
    author: { name: "Jane Doe", url: "https://acme.com/authors/jane" },
    publisher: { name: "Acme Blog", logo: "https://acme.com/logo.png" },
    images: ["https://acme.com/images/rsc-article.jpg"],
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://acme.com" },
    { name: "Blog", url: "https://acme.com/blog" },
    { name: "Understanding RSC", url: "https://acme.com/blog/understanding-rsc" },
  ]);

  return (
    <>
      {/* JSON-LD via inline script (Next.js compatible) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(breadcrumbSchema) }}
      />

      <article>
        <h1>Understanding React Server Components</h1>
        <p>A deep dive into RSC architecture and how it changes SSR.</p>
      </article>
    </>
  );
}
