// ─── Open Graph ───────────────────────────────────────────────

export type OpenGraphType =
  | "website"
  | "article"
  | "product"
  | "profile"
  | "book"
  | "music.song"
  | "music.album"
  | "video.movie"
  | "video.episode"
  | (string & {});

export interface OpenGraphImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  type?: string;
}

export interface OpenGraphConfig {
  title?: string;
  description?: string;
  url?: string;
  siteName?: string;
  type?: OpenGraphType;
  locale?: string;
  images?: OpenGraphImage[];
}

// ─── Twitter ──────────────────────────────────────────────────

export type TwitterCardType =
  | "summary"
  | "summary_large_image"
  | "app"
  | "player";

export interface TwitterConfig {
  card?: TwitterCardType;
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

// ─── Robots ───────────────────────────────────────────────────

export interface RobotsConfig {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  notranslate?: boolean;
  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number;
}

// ─── Alternate / Hreflang ─────────────────────────────────────

export interface AlternateLink {
  hreflang: string;
  href: string;
}

// ─── SEO Config ───────────────────────────────────────────────

export interface SEOConfig {
  title?: string;
  titleTemplate?: string;
  description?: string;
  canonical?: string;
  robots?: RobotsConfig;
  openGraph?: OpenGraphConfig;
  twitter?: TwitterConfig;
  alternates?: AlternateLink[];
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    hreflang?: string;
    type?: string;
    sizes?: string;
  }>;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

// ─── JSON-LD / Schema.org ─────────────────────────────────────

export interface JSONLDBase {
  "@context"?: string;
  "@type": string;
  [key: string]: unknown;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface OrganizationSchemaInput {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
    areaServed?: string | string[];
    availableLanguage?: string | string[];
  };
}

export interface WebsiteSchemaInput {
  name: string;
  url: string;
  description?: string;
  searchUrl?: string;
  searchQueryParam?: string;
}

export interface ArticleSchemaInput {
  headline: string;
  url: string;
  description?: string;
  images?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  } | Array<{
    name: string;
    url?: string;
  }>;
  publisher?: {
    name: string;
    logo?: string;
  };
  section?: string;
  keywords?: string[];
}

export interface ProductSchemaInput {
  name: string;
  url: string;
  description?: string;
  images?: string[];
  brand?: string;
  sku?: string;
  gtin?: string;
  price?: number | string;
  priceCurrency?: string;
  availability?:
    | "InStock"
    | "OutOfStock"
    | "PreOrder"
    | "Discontinued"
    | (string & {});
  ratingValue?: number;
  reviewCount?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
