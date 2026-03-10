import { describe, it, expect } from "vitest";
import {
  buildTitle,
  buildDescription,
  buildCanonicalUrl,
  buildRobotsDirectives,
  buildOpenGraph,
  buildTwitterMetadata,
  buildAlternateLinks,
  createSEOConfig,
  mergeSEOConfig,
  noIndex,
  noIndexNoFollow,
} from "../src/core/index.js";

describe("buildTitle", () => {
  it("returns empty string for no title", () => {
    expect(buildTitle()).toBe("");
    expect(buildTitle("")).toBe("");
  });

  it("returns title as-is without template", () => {
    expect(buildTitle("About")).toBe("About");
  });

  it("applies template with %s placeholder", () => {
    expect(buildTitle("About", "%s | MySite")).toBe("About | MySite");
  });

  it("trims whitespace", () => {
    expect(buildTitle("  About  ")).toBe("About");
  });
});

describe("buildDescription", () => {
  it("returns empty string for no description", () => {
    expect(buildDescription()).toBe("");
  });

  it("truncates at maxLength and adds ellipsis", () => {
    const long = "A".repeat(200);
    const result = buildDescription(long, 160);
    expect(result.length).toBeLessThanOrEqual(161); // 160 + ellipsis char
    expect(result.endsWith("…")).toBe(true);
  });

  it("does not truncate short descriptions", () => {
    expect(buildDescription("Short text", 160)).toBe("Short text");
  });
});

describe("buildCanonicalUrl", () => {
  it("normalizes base URL and strips trailing slashes", () => {
    expect(buildCanonicalUrl("https://example.com/")).toBe(
      "https://example.com"
    );
  });

  it("combines base and path", () => {
    expect(buildCanonicalUrl("https://example.com", "/about")).toBe(
      "https://example.com/about"
    );
  });

  it("handles path without leading slash", () => {
    expect(buildCanonicalUrl("https://example.com", "about")).toBe(
      "https://example.com/about"
    );
  });

  it("returns base for root path", () => {
    expect(buildCanonicalUrl("https://example.com", "/")).toBe(
      "https://example.com"
    );
  });
});

describe("buildRobotsDirectives", () => {
  it("returns empty string for undefined", () => {
    expect(buildRobotsDirectives()).toBe("");
  });

  it("builds index, follow", () => {
    expect(buildRobotsDirectives({ index: true, follow: true })).toBe(
      "index, follow"
    );
  });

  it("builds noindex, nofollow", () => {
    expect(buildRobotsDirectives({ index: false, follow: false })).toBe(
      "noindex, nofollow"
    );
  });

  it("includes advanced directives", () => {
    const result = buildRobotsDirectives({
      index: true,
      follow: true,
      noarchive: true,
      maxSnippet: 150,
      maxImagePreview: "large",
    });
    expect(result).toContain("noarchive");
    expect(result).toContain("max-snippet:150");
    expect(result).toContain("max-image-preview:large");
  });

  it("convenience helpers work", () => {
    expect(buildRobotsDirectives(noIndex())).toBe("noindex, follow");
    expect(buildRobotsDirectives(noIndexNoFollow())).toBe("noindex, nofollow");
  });
});

describe("buildOpenGraph", () => {
  it("returns empty array for undefined", () => {
    expect(buildOpenGraph()).toEqual([]);
  });

  it("builds basic OG tags", () => {
    const tags = buildOpenGraph({
      title: "My Page",
      description: "A description",
      url: "https://example.com",
      type: "website",
    });
    expect(tags).toContainEqual({ property: "og:title", content: "My Page" });
    expect(tags).toContainEqual({ property: "og:type", content: "website" });
  });

  it("builds image tags", () => {
    const tags = buildOpenGraph({
      images: [
        { url: "https://example.com/img.jpg", alt: "Alt text", width: 1200, height: 630 },
      ],
    });
    expect(tags).toContainEqual({
      property: "og:image",
      content: "https://example.com/img.jpg",
    });
    expect(tags).toContainEqual({
      property: "og:image:alt",
      content: "Alt text",
    });
    expect(tags).toContainEqual({
      property: "og:image:width",
      content: "1200",
    });
  });

  it("omits empty string values", () => {
    const tags = buildOpenGraph({ title: "", description: "Valid" });
    expect(tags.find((t) => t.property === "og:title")).toBeUndefined();
    expect(tags.find((t) => t.property === "og:description")).toBeDefined();
  });
});

describe("buildTwitterMetadata", () => {
  it("returns empty array for undefined", () => {
    expect(buildTwitterMetadata()).toEqual([]);
  });

  it("builds twitter tags", () => {
    const tags = buildTwitterMetadata({
      card: "summary_large_image",
      site: "@mysite",
      title: "Title",
    });
    expect(tags).toContainEqual({
      name: "twitter:card",
      content: "summary_large_image",
    });
    expect(tags).toContainEqual({ name: "twitter:site", content: "@mysite" });
  });
});

describe("buildAlternateLinks", () => {
  it("returns empty array for undefined", () => {
    expect(buildAlternateLinks()).toEqual([]);
  });

  it("builds hreflang links", () => {
    const links = buildAlternateLinks([
      { hreflang: "en", href: "https://example.com/en/" },
      { hreflang: "fr", href: "https://example.com/fr/" },
    ]);
    expect(links).toHaveLength(2);
    expect(links[0]).toEqual({
      rel: "alternate",
      hreflang: "en",
      href: "https://example.com/en",
    });
  });
});

describe("createSEOConfig / mergeSEOConfig", () => {
  it("creates a config", () => {
    const config = createSEOConfig({ title: "Test" });
    expect(config.title).toBe("Test");
  });

  it("merges configs with override", () => {
    const base = createSEOConfig({
      title: "Site",
      description: "Base description",
      openGraph: { siteName: "MySite" },
    });
    const page = { title: "Page Title", openGraph: { title: "OG Page" } };
    const merged = mergeSEOConfig(base, page);
    expect(merged.title).toBe("Page Title");
    expect(merged.description).toBe("Base description");
    expect(merged.openGraph?.siteName).toBe("MySite");
    expect(merged.openGraph?.title).toBe("OG Page");
  });
});
