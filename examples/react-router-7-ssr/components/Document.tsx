import React from "react";
import { SEOHead, createSEOConfig } from "react-ssr-seo";

interface DocumentProps {
  children: React.ReactNode;
  pageConfig: ReturnType<typeof createSEOConfig>;
}

export function Document({ children, pageConfig }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SEOHead {...pageConfig} />
      </head>
      <body>{children}</body>
    </html>
  );
}
