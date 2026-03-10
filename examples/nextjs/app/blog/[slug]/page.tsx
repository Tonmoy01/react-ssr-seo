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
  mergeSEOConfig,
  safeJsonLdSerialize,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../../../config/seo.js";

// ─── Page-level metadata (Next.js generateMetadata) ──────────

export async function generateMetadata(): Promise<Metadata> {
  // In a real app, you'd fetch article data here
  const article = {
    title: "Understanding React Server Components",
    description: "A deep dive into RSC architecture and how it changes SSR.",
    slug: "understanding-rsc",
    publishedAt: "2025-06-15",
    author: "Jane Doe",
    image: `${SITE_URL}/images/rsc-article.jpg`,
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
    url: `${SITE_URL}/blog/understanding-rsc`,
    description: "A deep dive into RSC architecture.",
    datePublished: "2025-06-15",
    author: { name: "Jane Doe", url: `${SITE_URL}/authors/jane` },
    publisher: { name: "Acme Blog", logo: `${SITE_URL}/logo.png` },
    images: [`${SITE_URL}/images/rsc-article.jpg`],
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "Understanding RSC", url: `${SITE_URL}/blog/understanding-rsc` },
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
