import React from "react";
import type { SEOConfig } from "../types/index.js";
import {
  buildTitle,
  buildRobotsDirectives,
  buildOpenGraph,
  buildTwitterMetadata,
  buildAlternateLinks,
} from "../core/index.js";
import { safeJsonLdSerialize } from "../utils/index.js";

export interface SEOHeadProps extends SEOConfig {
  /**
   * Optional nonce for CSP-compatible script tags.
   */
  nonce?: string;
}

/**
 * Generic SSR-safe React component that renders SEO-related tags.
 *
 * Renders: title, meta description, canonical link, robots meta,
 * Open Graph tags, Twitter tags, alternate/hreflang links,
 * additional meta/link tags, and JSON-LD scripts.
 *
 * Designed to be placed inside a <head> element in SSR apps.
 * Does NOT use any browser globals — fully SSR-compatible.
 */
export function SEOHead({
  title,
  titleTemplate,
  description,
  canonical,
  robots,
  openGraph,
  twitter,
  alternates,
  additionalMetaTags,
  additionalLinkTags,
  jsonLd,
  nonce,
}: SEOHeadProps): React.ReactElement {
  const elements: React.ReactElement[] = [];
  let key = 0;
  const k = () => `seo-${key++}`;

  // Title
  const resolvedTitle = buildTitle(title, titleTemplate);
  if (resolvedTitle) {
    elements.push(React.createElement("title", { key: k() }, resolvedTitle));
  }

  // Description
  if (description?.trim()) {
    elements.push(
      React.createElement("meta", {
        key: k(),
        name: "description",
        content: description.trim(),
      })
    );
  }

  // Canonical
  if (canonical?.trim()) {
    elements.push(
      React.createElement("link", {
        key: k(),
        rel: "canonical",
        href: canonical.trim(),
      })
    );
  }

  // Robots
  const robotsContent = buildRobotsDirectives(robots);
  if (robotsContent) {
    elements.push(
      React.createElement("meta", {
        key: k(),
        name: "robots",
        content: robotsContent,
      })
    );
  }

  // Open Graph
  const ogTags = buildOpenGraph(openGraph);
  for (const tag of ogTags) {
    elements.push(
      React.createElement("meta", {
        key: k(),
        property: tag.property,
        content: tag.content,
      })
    );
  }

  // Twitter
  const twitterTags = buildTwitterMetadata(twitter);
  for (const tag of twitterTags) {
    elements.push(
      React.createElement("meta", {
        key: k(),
        name: tag.name,
        content: tag.content,
      })
    );
  }

  // Hreflang alternates
  const altLinks = buildAlternateLinks(alternates);
  for (const link of altLinks) {
    elements.push(
      React.createElement("link", {
        key: k(),
        rel: link.rel,
        hrefLang: link.hreflang,
        href: link.href,
      })
    );
  }

  // Additional meta tags
  if (additionalMetaTags) {
    for (const meta of additionalMetaTags) {
      const props: Record<string, string> = { content: meta.content };
      if (meta.name) props.name = meta.name;
      if (meta.property) props.property = meta.property;
      elements.push(React.createElement("meta", { key: k(), ...props }));
    }
  }

  // Additional link tags
  if (additionalLinkTags) {
    for (const link of additionalLinkTags) {
      elements.push(React.createElement("link", { key: k(), ...link }));
    }
  }

  // JSON-LD
  if (jsonLd) {
    const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
    for (const schema of schemas) {
      elements.push(
        React.createElement("script", {
          key: k(),
          type: "application/ld+json",
          nonce,
          dangerouslySetInnerHTML: {
            __html: safeJsonLdSerialize(schema),
          },
        })
      );
    }
  }

  return React.createElement(React.Fragment, null, ...elements);
}
