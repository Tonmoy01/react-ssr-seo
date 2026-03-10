import React from "react";
import { safeJsonLdSerialize } from "../utils/index.js";

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  nonce?: string;
}

/**
 * Renders a <script type="application/ld+json"> tag with safely serialized JSON-LD.
 * SSR-safe: no browser globals used.
 */
export function JsonLd({ data, nonce }: JsonLdProps): React.ReactElement {
  return React.createElement("script", {
    type: "application/ld+json",
    nonce,
    dangerouslySetInnerHTML: {
      __html: safeJsonLdSerialize(data),
    },
  });
}
