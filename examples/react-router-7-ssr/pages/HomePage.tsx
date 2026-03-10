import React from "react";
import {
  mergeSEOConfig,
  createOrganizationSchema,
} from "react-ssr-seo";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function HomePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Home",
    canonical: SITE_URL,
    openGraph: {
      title: "Acme — Building the future of the web",
      url: SITE_URL,
    },
    jsonLd: createOrganizationSchema({
      name: "Acme",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [
        "https://twitter.com/acme",
        "https://github.com/acme",
      ],
    }),
  });

  return (
    <Document pageConfig={pageConfig}>
      <h1>Welcome to Acme</h1>
    </Document>
  );
}
