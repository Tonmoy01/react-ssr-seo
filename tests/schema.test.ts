import { describe, it, expect } from "vitest";
import {
  createOrganizationSchema,
  createWebsiteSchema,
  createBreadcrumbSchema,
  createArticleSchema,
  createProductSchema,
  createFAQSchema,
  composeSchemas,
} from "../src/schema/index.js";

describe("createOrganizationSchema", () => {
  it("creates basic organization schema", () => {
    const schema = createOrganizationSchema({
      name: "Acme Inc",
      url: "https://acme.com",
    });
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Acme Inc");
    expect(schema["@context"]).toBe("https://schema.org");
  });

  it("includes optional fields", () => {
    const schema = createOrganizationSchema({
      name: "Acme",
      url: "https://acme.com",
      logo: "https://acme.com/logo.png",
      sameAs: ["https://twitter.com/acme"],
    });
    expect(schema.logo).toBe("https://acme.com/logo.png");
    expect(schema.sameAs).toEqual(["https://twitter.com/acme"]);
  });
});

describe("createWebsiteSchema", () => {
  it("creates website schema with search action", () => {
    const schema = createWebsiteSchema({
      name: "Acme",
      url: "https://acme.com",
      searchUrl: "https://acme.com/search",
    });
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.potentialAction).toBeDefined();
  });
});

describe("createBreadcrumbSchema", () => {
  it("creates breadcrumb list", () => {
    const schema = createBreadcrumbSchema([
      { name: "Home", url: "https://example.com" },
      { name: "Blog", url: "https://example.com/blog" },
      { name: "Post", url: "https://example.com/blog/post" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    const items = schema.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(3);
    expect(items[0].position).toBe(1);
    expect(items[2].position).toBe(3);
    expect(items[1].name).toBe("Blog");
  });
});

describe("createArticleSchema", () => {
  it("creates article schema", () => {
    const schema = createArticleSchema({
      headline: "My Article",
      url: "https://example.com/article",
      author: { name: "John Doe" },
      datePublished: "2025-01-01",
    });
    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe("My Article");
    expect(schema.datePublished).toBe("2025-01-01");
    const authors = schema.author as Array<Record<string, string>>;
    expect(authors[0].name).toBe("John Doe");
  });

  it("handles multiple authors", () => {
    const schema = createArticleSchema({
      headline: "Co-authored",
      url: "https://example.com/article",
      author: [
        { name: "Alice" },
        { name: "Bob", url: "https://bob.com" },
      ],
    });
    const authors = schema.author as Array<Record<string, string>>;
    expect(authors).toHaveLength(2);
    expect(authors[1].url).toBe("https://bob.com");
  });
});

describe("createProductSchema", () => {
  it("creates product schema with offer", () => {
    const schema = createProductSchema({
      name: "Widget",
      url: "https://example.com/widget",
      price: 29.99,
      priceCurrency: "USD",
      availability: "InStock",
    });
    expect(schema["@type"]).toBe("Product");
    const offer = schema.offers as Record<string, unknown>;
    expect(offer.price).toBe(29.99);
    expect(offer.availability).toBe("https://schema.org/InStock");
  });

  it("includes aggregate rating", () => {
    const schema = createProductSchema({
      name: "Widget",
      url: "https://example.com/widget",
      ratingValue: 4.5,
      reviewCount: 120,
    });
    const rating = schema.aggregateRating as Record<string, unknown>;
    expect(rating.ratingValue).toBe(4.5);
    expect(rating.reviewCount).toBe(120);
  });
});

describe("createFAQSchema", () => {
  it("creates FAQ schema", () => {
    const schema = createFAQSchema([
      { question: "What is this?", answer: "A test." },
      { question: "Why?", answer: "Because." },
    ]);
    expect(schema["@type"]).toBe("FAQPage");
    const entities = schema.mainEntity as Array<Record<string, unknown>>;
    expect(entities).toHaveLength(2);
    expect(entities[0].name).toBe("What is this?");
  });
});

describe("composeSchemas", () => {
  it("composes multiple schemas into a graph", () => {
    const org = createOrganizationSchema({ name: "A", url: "https://a.com" });
    const site = createWebsiteSchema({ name: "A", url: "https://a.com" });
    const composed = composeSchemas(org, site);
    expect(composed["@context"]).toBe("https://schema.org");
    const graph = composed["@graph"] as Array<Record<string, unknown>>;
    expect(graph).toHaveLength(2);
    // Individual schemas in graph should not have @context
    expect(graph[0]["@context"]).toBeUndefined();
  });
});
