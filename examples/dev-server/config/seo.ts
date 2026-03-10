import { createSEOConfig } from "../../../src/index.js";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | react-ssr-seo",
  description:
    "Framework-agnostic SEO utilities for React SSR applications. Meta tags, Open Graph, JSON-LD, and more.",
  openGraph: {
    siteName: "react-ssr-seo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@reactssrseo",
  },
});

export const SITE_URL = "https://react-ssr-seo.dev";
