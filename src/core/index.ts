import type {
  SEOConfig,
  OpenGraphConfig,
  TwitterConfig,
  RobotsConfig,
  AlternateLink,
} from "../types/index.js";
import { deepMerge, normalizeUrl } from "../utils/index.js";

// ─── Config builder ───────────────────────────────────────────

/**
 * Create an SEO config with sensible defaults.
 */
export function createSEOConfig(config: SEOConfig = {}): SEOConfig {
  return normalizeSEOConfig(config);
}

/**
 * Deep-merge a base SEO config with page-level overrides.
 * Useful for combining a global site config with per-page config.
 */
export function mergeSEOConfig(
  base: SEOConfig,
  override: SEOConfig
): SEOConfig {
  const merged = deepMerge(base, override);

  // Arrays should be replaced, not deep-merged
  if (override.alternates !== undefined) {
    merged.alternates = override.alternates;
  }
  if (override.additionalMetaTags !== undefined) {
    merged.additionalMetaTags = override.additionalMetaTags;
  }
  if (override.additionalLinkTags !== undefined) {
    merged.additionalLinkTags = override.additionalLinkTags;
  }
  if (override.jsonLd !== undefined) {
    merged.jsonLd = override.jsonLd;
  }

  return normalizeSEOConfig(merged);
}

/**
 * Normalize an SEO config: trim strings, normalize URLs, remove empties.
 */
export function normalizeSEOConfig(config: SEOConfig): SEOConfig {
  const normalized: SEOConfig = { ...config };

  if (normalized.title) {
    normalized.title = normalized.title.trim();
  }
  if (normalized.description) {
    normalized.description = normalized.description.trim();
  }
  if (normalized.canonical) {
    normalized.canonical = normalizeUrl(normalized.canonical);
  }

  return normalized;
}

// ─── Title ────────────────────────────────────────────────────

/**
 * Build a title string, optionally applying a template.
 * Template uses `%s` as the placeholder for the page title.
 *
 * @example
 * buildTitle("About", "%s | MySite") // "About | MySite"
 * buildTitle("Home") // "Home"
 */
export function buildTitle(title?: string, template?: string): string {
  if (!title) return "";
  const trimmed = title.trim();
  if (!template) return trimmed;
  return template.replace(/%s/g, trimmed);
}

/**
 * Build a description, truncating at a max length if specified.
 */
export function buildDescription(
  description?: string,
  maxLength?: number
): string {
  if (!description) return "";
  const trimmed = description.trim();
  if (!maxLength || trimmed.length <= maxLength) return trimmed;
  return trimmed.slice(0, maxLength).trimEnd() + "…";
}

// ─── Canonical URL ────────────────────────────────────────────

/**
 * Build a canonical URL from a base URL and optional path.
 */
export function buildCanonicalUrl(
  baseUrl: string,
  path?: string
): string {
  const normalizedBase = normalizeUrl(baseUrl);
  if (!path || path === "/") return normalizedBase;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedBase + normalizeUrl(normalizedPath);
}

// ─── Robots ───────────────────────────────────────────────────

/**
 * Build a robots meta content string from a config.
 *
 * @example
 * buildRobotsDirectives({ index: true, follow: true }) // "index, follow"
 * buildRobotsDirectives({ index: false, follow: false, noarchive: true })
 * // "noindex, nofollow, noarchive"
 */
export function buildRobotsDirectives(config?: RobotsConfig): string {
  if (!config) return "";

  const directives: string[] = [];

  if (config.index === false) directives.push("noindex");
  else if (config.index === true) directives.push("index");

  if (config.follow === false) directives.push("nofollow");
  else if (config.follow === true) directives.push("follow");

  if (config.noarchive) directives.push("noarchive");
  if (config.nosnippet) directives.push("nosnippet");
  if (config.noimageindex) directives.push("noimageindex");
  if (config.notranslate) directives.push("notranslate");

  if (config.maxSnippet !== undefined)
    directives.push(`max-snippet:${config.maxSnippet}`);
  if (config.maxImagePreview)
    directives.push(`max-image-preview:${config.maxImagePreview}`);
  if (config.maxVideoPreview !== undefined)
    directives.push(`max-video-preview:${config.maxVideoPreview}`);

  return directives.join(", ");
}

// ─── Convenience helpers ──────────────────────────────────────

/**
 * Create a noindex/nofollow robots config.
 */
export function noIndexNoFollow(): RobotsConfig {
  return { index: false, follow: false };
}

/**
 * Create a noindex robots config that still allows following links.
 */
export function noIndex(): RobotsConfig {
  return { index: false, follow: true };
}

// ─── Open Graph ───────────────────────────────────────────────

/**
 * Build Open Graph meta tag entries from config.
 * Returns an array of { property, content } pairs.
 */
export function buildOpenGraph(
  config?: OpenGraphConfig
): Array<{ property: string; content: string }> {
  if (!config) return [];

  const tags: Array<{ property: string; content: string }> = [];

  const simple: Array<[keyof OpenGraphConfig, string]> = [
    ["title", "og:title"],
    ["description", "og:description"],
    ["url", "og:url"],
    ["siteName", "og:site_name"],
    ["type", "og:type"],
    ["locale", "og:locale"],
  ];

  for (const [key, property] of simple) {
    const value = config[key];
    if (typeof value === "string" && value.trim()) {
      tags.push({ property, content: value.trim() });
    }
  }

  if (config.images) {
    for (const image of config.images) {
      if (!image.url) continue;
      tags.push({ property: "og:image", content: image.url });
      if (image.alt) tags.push({ property: "og:image:alt", content: image.alt });
      if (image.width)
        tags.push({
          property: "og:image:width",
          content: String(image.width),
        });
      if (image.height)
        tags.push({
          property: "og:image:height",
          content: String(image.height),
        });
      if (image.type)
        tags.push({ property: "og:image:type", content: image.type });
    }
  }

  return tags;
}

// ─── Twitter ──────────────────────────────────────────────────

/**
 * Build Twitter card meta tag entries from config.
 * Returns an array of { name, content } pairs.
 */
export function buildTwitterMetadata(
  config?: TwitterConfig
): Array<{ name: string; content: string }> {
  if (!config) return [];

  const tags: Array<{ name: string; content: string }> = [];

  if (config.card) tags.push({ name: "twitter:card", content: config.card });
  if (config.site) tags.push({ name: "twitter:site", content: config.site });
  if (config.creator)
    tags.push({ name: "twitter:creator", content: config.creator });
  if (config.title)
    tags.push({ name: "twitter:title", content: config.title });
  if (config.description)
    tags.push({ name: "twitter:description", content: config.description });
  if (config.image)
    tags.push({ name: "twitter:image", content: config.image });
  if (config.imageAlt)
    tags.push({ name: "twitter:image:alt", content: config.imageAlt });

  return tags;
}

// ─── Hreflang ─────────────────────────────────────────────────

/**
 * Build alternate link entries for hreflang from an array of alternates.
 * Returns an array of { rel, hreflang, href } suitable for <link> tags.
 */
export function buildAlternateLinks(
  alternates?: AlternateLink[]
): Array<{ rel: string; hreflang: string; href: string }> {
  if (!alternates || alternates.length === 0) return [];
  return alternates.map((alt) => ({
    rel: "alternate",
    hreflang: alt.hreflang,
    href: normalizeUrl(alt.href),
  }));
}
