import React from "react";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createFAQSchema,
} from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";

const faqs = [
  {
    question: "What is react-ssr-seo-toolkit?",
    answer:
      "A framework-agnostic SEO utility library for React SSR applications. It provides meta tag builders, Open Graph & Twitter Card support, JSON-LD structured data generators, and React components — all with zero dependencies and full TypeScript support.",
  },
  {
    question: "Does it work with Next.js?",
    answer:
      "Yes! Use the builder functions (buildTitle, buildOpenGraph, etc.) with Next.js generateMetadata, or use the SEOHead component in Pages Router. JSON-LD can be rendered via the JsonLd component or safeJsonLdSerialize utility.",
  },
  {
    question: "Does it work with React Router 7?",
    answer:
      "Yes. Use the SEOHead component in your root/layout SSR document component. All functions are SSR-safe and work with React Router's server-side rendering.",
  },
  {
    question: "Is it SSR-safe?",
    answer:
      "Absolutely. No browser globals (window, document) are used. All output is deterministic and hydration-safe, meaning no mismatches between server and client renders.",
  },
  {
    question: "Does it support JSON-LD structured data?",
    answer:
      "Yes. It includes generators for Organization, Website, Article, Product, Breadcrumb, and FAQ schemas. You can compose multiple schemas using composeSchemas() for a single @graph-based script tag.",
  },
  {
    question: "What schemas are supported?",
    answer:
      "Organization, WebSite, Article, Product, BreadcrumbList, and FAQPage. Each has a dedicated generator function (createOrganizationSchema, createArticleSchema, etc.) that returns a properly structured JSON-LD object.",
  },
  {
    question: "Does it have any dependencies?",
    answer:
      "Zero. The only peer dependency is React >= 18.0.0. The library itself has no runtime dependencies, keeping your bundle lightweight.",
  },
  {
    question: "Can I use it without React?",
    answer:
      'The core builder functions (buildTitle, buildOpenGraph, buildCanonicalUrl, etc.) and schema generators work without React. Import from "react-ssr-seo-toolkit/schema" for tree-shaken schema-only usage.',
  },
];

export function meta() {
  return mergeSEOConfig(siteConfig, {
    title: "FAQ",
    description:
      "Frequently asked questions about react-ssr-seo-toolkit — installation, framework support, schemas, and more.",
    canonical: buildCanonicalUrl(SITE_URL, "/faq"),
  });
}

export const handle = { activeRoute: "/faq", schemas: [createFAQSchema(faqs)] };

export default function FAQPage() {
  return (
    <>
      <div className="page-header">
        <h1>FAQ Page Demo</h1>
        <p>
          FAQPage schema with question/answer pairs that appear as rich results
          in Google Search.
        </p>
        <div className="page-tags" style={{ marginTop: "0.75rem" }}>
          <span className="tag">FAQPage Schema</span>
          <span className="tag">Rich Results</span>
          <span className="tag">Google Search</span>
        </div>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>
        {/* FAQ Items */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            These questions are also rendered as FAQPage structured data for search engines.
          </p>

          {faqs.map((faq, i) => (
            <div className="card" key={i} style={{ marginBottom: "0.75rem" }}>
              <h2 style={{ fontSize: "1.05rem" }}>{faq.question}</h2>
              <p style={{ marginTop: "0.5rem" }}>{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* SEO Tags */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            SEO Tags Generated
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated JSON-LD structured data</span>
              <span className="code-header-lang">JSON-LD</span>
            </div>
            <pre>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is react-ssr-seo-toolkit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A framework-agnostic SEO utility library..."
      }
    },
    {
      "@type": "Question",
      "name": "Does it work with Next.js?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Use the builder functions..."
      }
    },
    // ... more Q&A pairs
  ]
}
</script>`}</pre>
          </div>

          <div className="callout callout-info">
            <div className="callout-icon">i</div>
            <div className="callout-content">
              <p>
                <strong>Rich Results:</strong> When Google detects valid FAQPage
                structured data, it can display expandable question/answer snippets
                directly in search results, increasing your page's visibility and
                click-through rate.
              </p>
            </div>
          </div>
        </div>

        {/* Source Code */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Source Code
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">FAQPage.tsx</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildCanonicalUrl,
  createFAQSchema,
  SEOHead,
  JsonLd,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../config/seo";

// Define your FAQ data
const faqs = [
  {
    question: "What is react-ssr-seo-toolkit?",
    answer: "A framework-agnostic SEO utility library...",
  },
  {
    question: "Does it work with Next.js?",
    answer: "Yes! Use the builder functions with generateMetadata...",
  },
  // ... more Q&A pairs
];

// Create page config
const pageConfig = mergeSEOConfig(siteConfig, {
  title: "FAQ",
  description: "Frequently asked questions about react-ssr-seo-toolkit.",
  canonical: buildCanonicalUrl(SITE_URL, "/faq"),
});

// Generate FAQPage schema — just pass your Q&A array!
const faqSchema = createFAQSchema(faqs);

// Render
<head>
  <SEOHead {...pageConfig} />
  <JsonLd data={faqSchema} />
</head>

// Display your FAQs
{faqs.map((faq, i) => (
  <div key={i}>
    <h2>{faq.question}</h2>
    <p>{faq.answer}</p>
  </div>
))}`}</pre>
          </div>
        </div>

        {/* Features */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Features Demonstrated
          </h2>
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <div className="card">
              <h3>createFAQSchema</h3>
              <p>Takes a simple array of {`{ question, answer }`} objects and generates valid FAQPage JSON-LD.</p>
            </div>
            <div className="card">
              <h3>Rich Results</h3>
              <p>FAQPage schema enables expandable Q&A snippets in Google Search results.</p>
            </div>
            <div className="card">
              <h3>Simple API</h3>
              <p>Just pass your existing FAQ data — no manual schema construction needed.</p>
            </div>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>Right-click → View Page Source</strong> to see the FAQPage
              JSON-LD schema with all {faqs.length} question/answer pairs in the
              actual HTML.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
