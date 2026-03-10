import { describe, it, expect } from "vitest";
import {
  safeJsonLdSerialize,
  omitEmpty,
  deepMerge,
  normalizeUrl,
  buildFullUrl,
} from "../src/utils/index.js";

describe("safeJsonLdSerialize", () => {
  it("serializes basic objects", () => {
    const result = safeJsonLdSerialize({ "@type": "Organization", name: "Acme" });
    expect(result).toContain('"@type"');
    expect(result).toContain('"Acme"');
  });

  it("escapes HTML-breaking characters", () => {
    const result = safeJsonLdSerialize({ name: "</script><script>alert(1)" });
    expect(result).not.toContain("</script>");
    expect(result).toContain("\\u003c");
  });

  it("omits undefined and null values", () => {
    const result = safeJsonLdSerialize({ a: 1, b: undefined, c: null });
    expect(result).toContain('"a"');
    expect(result).not.toContain('"b"');
    expect(result).not.toContain('"c"');
  });

  it("returns {} for undefined input", () => {
    expect(safeJsonLdSerialize(undefined)).toBe("{}");
  });
});

describe("omitEmpty", () => {
  it("removes undefined, null, and empty strings", () => {
    const result = omitEmpty({
      a: "hello",
      b: "",
      c: undefined,
      d: null,
      e: 0,
      f: false,
    });
    expect(result).toEqual({ a: "hello", e: 0, f: false });
  });
});

describe("deepMerge", () => {
  it("merges nested objects", () => {
    const result = deepMerge(
      { a: { b: 1, c: 2 }, d: 3 },
      { a: { b: 10 } }
    );
    expect(result).toEqual({ a: { b: 10, c: 2 }, d: 3 });
  });

  it("replaces arrays instead of merging", () => {
    const result = deepMerge({ tags: [1, 2] }, { tags: [3] });
    expect(result.tags).toEqual([3]);
  });
});

describe("normalizeUrl", () => {
  it("strips trailing slashes", () => {
    expect(normalizeUrl("https://example.com/")).toBe("https://example.com");
  });

  it("keeps root slash", () => {
    expect(normalizeUrl("/")).toBe("/");
  });

  it("trims whitespace", () => {
    expect(normalizeUrl("  https://example.com  ")).toBe("https://example.com");
  });
});

describe("buildFullUrl", () => {
  it("combines base and path", () => {
    expect(buildFullUrl("https://example.com", "/about")).toBe(
      "https://example.com/about"
    );
  });

  it("returns base for root path", () => {
    expect(buildFullUrl("https://example.com", "/")).toBe(
      "https://example.com"
    );
  });
});
