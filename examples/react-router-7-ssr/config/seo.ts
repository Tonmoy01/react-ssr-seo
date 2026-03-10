import { createSEOConfig } from "react-ssr-seo";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s — Acme",
  description: "Acme — Building the future of the web.",
  openGraph: {
    siteName: "Acme",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@acme",
  },
});

export const SITE_URL = "https://acme.com";
