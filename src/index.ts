// Types
export type {
  SEOConfig,
  OpenGraphConfig,
  OpenGraphImage,
  OpenGraphType,
  TwitterConfig,
  TwitterCardType,
  RobotsConfig,
  AlternateLink,
  JSONLDBase,
  BreadcrumbItem,
  OrganizationSchemaInput,
  WebsiteSchemaInput,
  ArticleSchemaInput,
  ProductSchemaInput,
  FAQItem,
} from "./types/index.js";

// Core SEO builders
export {
  createSEOConfig,
  mergeSEOConfig,
  normalizeSEOConfig,
  buildTitle,
  buildDescription,
  buildCanonicalUrl,
  buildRobotsDirectives,
  buildOpenGraph,
  buildTwitterMetadata,
  buildAlternateLinks,
  noIndex,
  noIndexNoFollow,
} from "./core/index.js";

// Schema / JSON-LD generators
export {
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createArticleSchema,
  createProductSchema,
  createFAQSchema,
  composeSchemas,
} from "./schema/index.js";

// Utilities
export {
  safeJsonLdSerialize,
  omitEmpty,
  deepMerge,
  normalizeUrl,
  buildFullUrl,
} from "./utils/index.js";

// React components
export { SEOHead } from "./components/SEOHead.js";
export { JsonLd } from "./components/JsonLd.js";
export type { SEOHeadProps } from "./components/SEOHead.js";
export type { JsonLdProps } from "./components/JsonLd.js";
