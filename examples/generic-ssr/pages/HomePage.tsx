import React from "react";
import {
  SEOHead,
  JsonLd,
  mergeSEOConfig,
  createWebsiteSchema,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo.js";

export function HomePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: SITE_URL,
  });

  const websiteSchema = createWebsiteSchema({
    name: "MyShop",
    url: SITE_URL,
    description: "Quality products at great prices.",
    searchUrl: `${SITE_URL}/search`,
    searchQueryParam: "q",
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <h1>Welcome to MyShop</h1>
      </body>
    </html>
  );
}
