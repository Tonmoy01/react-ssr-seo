/**
 * Safely serialize a value to JSON for use in a <script> tag.
 * Escapes characters that could break out of script context.
 */
export function safeJsonLdSerialize(data: unknown): string {
  const json = JSON.stringify(data, (_key, value) => {
    if (value === undefined || value === null) return undefined;
    return value;
  });

  if (!json) return "{}";

  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Strip undefined/null values from an object (shallow).
 */
export function omitEmpty<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of Object.keys(obj) as Array<keyof T>) {
    const val = obj[key];
    if (val !== undefined && val !== null && val !== "") {
      result[key] = val;
    }
  }
  return result;
}

/**
 * Deep-merge two objects. Arrays are replaced, not concatenated.
 */
export function deepMerge<T>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base } as Record<string, unknown>;
  const overrideObj = override as Record<string, unknown>;
  const baseObj = base as Record<string, unknown>;

  for (const key of Object.keys(overrideObj)) {
    const overrideVal = overrideObj[key];
    const baseVal = baseObj[key];

    if (overrideVal === undefined) continue;

    if (
      overrideVal !== null &&
      typeof overrideVal === "object" &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>
      );
    } else {
      result[key] = overrideVal;
    }
  }

  return result as T;
}

/**
 * Normalize a URL by trimming whitespace and removing trailing slashes
 * (except for root "/").
 */
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (trimmed === "/" || trimmed === "") return trimmed;
  return trimmed.replace(/\/+$/, "");
}

/**
 * Build a full canonical URL from a base and a path.
 */
export function buildFullUrl(base: string, path?: string): string {
  const normalizedBase = normalizeUrl(base);
  if (!path || path === "/") return normalizedBase;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedBase + normalizeUrl(normalizedPath);
}
