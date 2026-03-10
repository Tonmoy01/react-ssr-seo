import { createSEOConfig } from "react-ssr-seo";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | Acme Blog",
  description: "Acme Blog — Insights on technology and design.",
  canonical: "https://acme.com",
  openGraph: {
    siteName: "Acme Blog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@acmeblog",
  },
});

export const SITE_URL = "https://acme.com";
