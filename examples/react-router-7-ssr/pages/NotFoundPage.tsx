import React from "react";
import { mergeSEOConfig, noIndex } from "react-ssr-seo";
import { siteConfig } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function NotFoundPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Page Not Found",
    robots: noIndex(),
  });

  return (
    <Document pageConfig={pageConfig}>
      <h1>404 — Not Found</h1>
    </Document>
  );
}
