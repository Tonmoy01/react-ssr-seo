import type {
  JSONLDBase,
  BreadcrumbItem,
  OrganizationSchemaInput,
  WebsiteSchemaInput,
  ArticleSchemaInput,
  ProductSchemaInput,
  FAQItem,
} from "../types/index.js";

const CONTEXT = "https://schema.org";

// ─── Organization ─────────────────────────────────────────────

export function createOrganizationSchema(
  input: OrganizationSchemaInput
): JSONLDBase {
  const schema: JSONLDBase = {
    "@context": CONTEXT,
    "@type": "Organization",
    name: input.name,
    url: input.url,
  };

  if (input.logo) schema.logo = input.logo;
  if (input.description) schema.description = input.description;
  if (input.sameAs?.length) schema.sameAs = input.sameAs;

  if (input.contactPoint) {
    const cp: Record<string, unknown> = {
      "@type": "ContactPoint",
    };
    if (input.contactPoint.telephone)
      cp.telephone = input.contactPoint.telephone;
    if (input.contactPoint.contactType)
      cp.contactType = input.contactPoint.contactType;
    if (input.contactPoint.email) cp.email = input.contactPoint.email;
    if (input.contactPoint.areaServed)
      cp.areaServed = input.contactPoint.areaServed;
    if (input.contactPoint.availableLanguage)
      cp.availableLanguage = input.contactPoint.availableLanguage;
    schema.contactPoint = cp;
  }

  return schema;
}

// ─── Website ──────────────────────────────────────────────────

export function createWebsiteSchema(input: WebsiteSchemaInput): JSONLDBase {
  const schema: JSONLDBase = {
    "@context": CONTEXT,
    "@type": "WebSite",
    name: input.name,
    url: input.url,
  };

  if (input.description) schema.description = input.description;

  if (input.searchUrl) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${input.searchUrl}?${input.searchQueryParam ?? "q"}={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    };
  }

  return schema;
}

// ─── Breadcrumb ───────────────────────────────────────────────

export function createBreadcrumbSchema(items: BreadcrumbItem[]): JSONLDBase {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Article ──────────────────────────────────────────────────

export function createArticleSchema(input: ArticleSchemaInput): JSONLDBase {
  const schema: JSONLDBase = {
    "@context": CONTEXT,
    "@type": "Article",
    headline: input.headline,
    url: input.url,
  };

  if (input.description) schema.description = input.description;
  if (input.images?.length) schema.image = input.images;
  if (input.datePublished) schema.datePublished = input.datePublished;
  if (input.dateModified) schema.dateModified = input.dateModified;
  if (input.section) schema.articleSection = input.section;
  if (input.keywords?.length) schema.keywords = input.keywords;

  if (input.author) {
    const authors = Array.isArray(input.author)
      ? input.author
      : [input.author];
    schema.author = authors.map((a) => {
      const person: Record<string, string> = {
        "@type": "Person",
        name: a.name,
      };
      if (a.url) person.url = a.url;
      return person;
    });
  }

  if (input.publisher) {
    const pub: Record<string, unknown> = {
      "@type": "Organization",
      name: input.publisher.name,
    };
    if (input.publisher.logo) {
      pub.logo = {
        "@type": "ImageObject",
        url: input.publisher.logo,
      };
    }
    schema.publisher = pub;
  }

  return schema;
}

// ─── Product ──────────────────────────────────────────────────

export function createProductSchema(input: ProductSchemaInput): JSONLDBase {
  const schema: JSONLDBase = {
    "@context": CONTEXT,
    "@type": "Product",
    name: input.name,
    url: input.url,
  };

  if (input.description) schema.description = input.description;
  if (input.images?.length) schema.image = input.images;
  if (input.brand) {
    schema.brand = { "@type": "Brand", name: input.brand };
  }
  if (input.sku) schema.sku = input.sku;
  if (input.gtin) schema.gtin = input.gtin;

  if (input.price !== undefined) {
    const offer: Record<string, unknown> = {
      "@type": "Offer",
      price: input.price,
      priceCurrency: input.priceCurrency ?? "USD",
    };
    if (input.availability) {
      offer.availability = `https://schema.org/${input.availability}`;
    }
    schema.offers = offer;
  }

  if (input.ratingValue !== undefined) {
    const rating: Record<string, unknown> = {
      "@type": "AggregateRating",
      ratingValue: input.ratingValue,
    };
    if (input.reviewCount !== undefined) rating.reviewCount = input.reviewCount;
    schema.aggregateRating = rating;
  }

  return schema;
}

// ─── FAQ ──────────────────────────────────────────────────────

export function createFAQSchema(items: FAQItem[]): JSONLDBase {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Schema composition ───────────────────────────────────────

/**
 * Compose multiple JSON-LD schemas into a single @graph array.
 * Useful for embedding multiple structured data blocks in one script tag.
 */
export function composeSchemas(...schemas: JSONLDBase[]): JSONLDBase {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    "@graph": schemas.map(({ "@context": _ctx, ...rest }) => rest),
  };
}
