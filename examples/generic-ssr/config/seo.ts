import { createSEOConfig } from "react-ssr-seo";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | MyShop",
  description: "MyShop — Quality products at great prices.",
  openGraph: {
    siteName: "MyShop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@myshop",
  },
});

export const SITE_URL = "https://myshop.com";
