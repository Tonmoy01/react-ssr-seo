import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";

export function meta() {
  return mergeSEOConfig(siteConfig, {
    title: "Common Mistakes",
    description:
      "Common mistakes and gotchas when using react-ssr-seo-toolkit, and how to avoid them.",
    canonical: buildCanonicalUrl(SITE_URL, "/common-mistakes"),
  });
}

export const handle = { activeRoute: "/common-mistakes" };

export default function CommonMistakesPage() {
  return (
    <>
      <div className="page-header">
        <h1>Common Mistakes &amp; Gotchas</h1>
        <p>
          Avoid these frequent errors when setting up SEO in your React application.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        {/* Mistake 1 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            1. Writing {"<html>"} and {"<head>"} in page components
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Page components should <strong>never</strong> include document-level tags.
            These belong in the Document component only.
          </p>

          <div className="code-block" style={{ border: "2px solid #fca5a5" }}>
            <div className="code-header">
              <span className="code-header-title">WRONG — page writes {"<html>"} tags</span>
              <span className="code-header-lang" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>BAD</span>
            </div>
            <pre>{`// pages/AboutPage.tsx — DO NOT DO THIS
export function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, { title: "About" });
  return (
    <html>          {/* WRONG */}
      <head>        {/* WRONG */}
        <SEOHead {...seo} />
      </head>
      <body>        {/* WRONG */}
        <h1>About</h1>
      </body>
    </html>
  );
}`}</pre>
          </div>

          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">CORRECT — page returns content inside Document</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`// pages/AboutPage.tsx — CORRECT
export function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, { title: "About" });
  return (
    <Document seo={seo}>
      <h1>About</h1>
    </Document>
  );
}`}</pre>
          </div>

          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                <strong>Rule:</strong> If you are writing <code>{"<html>"}</code> or{" "}
                <code>{"<head>"}</code> inside a <code>pages/</code> file, it is wrong.
                Only the Document file should have these.
              </p>
            </div>
          </div>
        </div>

        {/* Mistake 2 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            2. Using {"<SEOHead>"} in Next.js App Router pages
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Next.js App Router manages <code>{"<head>"}</code> automatically. Use{" "}
            <code>generateMetadata</code> instead.
          </p>

          <div className="code-block" style={{ border: "2px solid #fca5a5" }}>
            <div className="code-header">
              <span className="code-header-title">WRONG — SEOHead in App Router</span>
              <span className="code-header-lang" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>BAD</span>
            </div>
            <pre>{`// app/about/page.tsx — DO NOT DO THIS
export default function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, { title: "About" });
  return (
    <div>
      <SEOHead {...seo} />  {/* WRONG in App Router */}
      <h1>About</h1>
    </div>
  );
}`}</pre>
          </div>

          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">CORRECT — use generateMetadata</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`// app/about/page.tsx — CORRECT
import { mergeSEOConfig, buildTitle } from "react-ssr-seo-toolkit";
import type { Metadata } from "next";

const seo = mergeSEOConfig(siteConfig, { title: "About" });

export const metadata: Metadata = {
  title: buildTitle(seo.title!, seo.titleTemplate),
  description: seo.description,
};

export default function AboutPage() {
  return <div><h1>About</h1></div>;
}`}</pre>
          </div>
        </div>

        {/* Mistake 3 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            3. Forgetting to merge with site config
          </h2>

          <div className="code-block" style={{ border: "2px solid #fca5a5" }}>
            <div className="code-header">
              <span className="code-header-title">WRONG — creating config from scratch</span>
              <span className="code-header-lang" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>BAD</span>
            </div>
            <pre>{`// Loses all site defaults!
const seo = createSEOConfig({
  title: "About Us",
  description: "About page.",
});
// Missing: titleTemplate, openGraph.siteName, twitter.site, etc.`}</pre>
          </div>

          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">CORRECT — merge with site config</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`const seo = mergeSEOConfig(siteConfig, {
  title: "About Us",
  description: "About page.",
});
// Inherits titleTemplate, openGraph.siteName, twitter.site, etc.`}</pre>
          </div>
        </div>

        {/* Mistake 4 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            4. Not setting canonical URLs
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Without canonical URLs, search engines may index duplicate content.
          </p>

          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">Always set canonical</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`const seo = mergeSEOConfig(siteConfig, {
  title: "About",
  description: "About page.",
  canonical: buildCanonicalUrl(SITE_URL, "/about"),
});`}</pre>
          </div>
        </div>

        {/* Mistake 5 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            5. Using JSON.stringify for JSON-LD
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            <code>JSON.stringify</code> can create XSS vulnerabilities with characters like{" "}
            <code>{"<"}</code>, <code>{">"}</code>, <code>{"&"}</code>.
          </p>

          <div className="code-block" style={{ border: "2px solid #fca5a5" }}>
            <div className="code-header">
              <span className="code-header-title">WRONG — unsafe serialization</span>
              <span className="code-header-lang" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>BAD</span>
            </div>
            <pre>{`<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>`}</pre>
          </div>

          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">CORRECT — use safe methods</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`// Option 1: JsonLd component (recommended)
<JsonLd data={schema} />

// Option 2: safeJsonLdSerialize for manual rendering
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: safeJsonLdSerialize(schema) }}
/>`}</pre>
          </div>
        </div>

        {/* Mistake 6 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            6. Duplicate SEO tags
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Do not render <code>{"<SEOHead>"}</code> in both the Document and the page.
          </p>

          <div className="code-block" style={{ border: "2px solid #fca5a5" }}>
            <div className="code-header">
              <span className="code-header-title">WRONG — SEOHead in both places</span>
              <span className="code-header-lang" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>BAD</span>
            </div>
            <pre>{`// Document already renders <SEOHead />
export function AboutPage() {
  return (
    <Document seo={seo}>
      <SEOHead {...seo} />  {/* DUPLICATE! */}
      <h1>About</h1>
    </Document>
  );
}`}</pre>
          </div>
        </div>

        {/* Mistake 7 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            7. Hardcoding URLs
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Hardcoded URLs cause trailing slash and protocol inconsistencies.
          </p>

          <div className="code-block" style={{ border: "2px solid #fca5a5" }}>
            <div className="code-header">
              <span className="code-header-title">WRONG — hardcoded URLs</span>
              <span className="code-header-lang" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444" }}>BAD</span>
            </div>
            <pre>{`canonical: "https://mysite.com/about/"  // Trailing slash
openGraph: { url: "http://mysite.com/about" }  // Wrong protocol`}</pre>
          </div>

          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">CORRECT — use buildCanonicalUrl</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`const url = buildCanonicalUrl(SITE_URL, "/about");
// Consistent: no trailing slash, correct protocol
const seo = mergeSEOConfig(siteConfig, {
  canonical: url,
  openGraph: { url },
});`}</pre>
          </div>
        </div>

        {/* Mistake 8 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            8. SSR/CSR confusion
          </h2>
          <div className="callout callout-warning">
            <div className="callout-icon">!</div>
            <div className="callout-content">
              <p>
                <strong>SEO tags must be server-rendered.</strong> In a client-side only app
                (Create React App, Vite SPA without SSR), search engines won't see your meta tags.
                You need SSR (Express, Next.js, React Router SSR, etc.) for this to work.
              </p>
            </div>
          </div>
        </div>

        {/* Mistake 9 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            9. Missing Open Graph images
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Without OG images, shared links look plain on social media.
          </p>
          <div className="code-block" style={{ border: "2px solid #86efac" }}>
            <div className="code-header">
              <span className="code-header-title">Always include OG images</span>
              <span className="code-header-lang" style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}>GOOD</span>
            </div>
            <pre>{`openGraph: {
  images: [{
    url: "https://mysite.com/og-image.jpg",
    width: 1200,   // Recommended: 1200x630
    height: 630,
    alt: "Description of the image",
  }],
}`}</pre>
          </div>
        </div>

        {/* Mistake 10 */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", color: "#dc2626" }}>
            10. Not testing your SEO output
          </h2>
          <div className="card card-elevated">
            <ul style={{ paddingLeft: "1.5rem", lineHeight: "2.2", color: "#64748b" }}>
              <li><strong>View Page Source</strong> — Right-click → "View Page Source" to check the raw HTML</li>
              <li><strong>Google Rich Results Test</strong> — Validate JSON-LD structured data</li>
              <li><strong>Facebook Sharing Debugger</strong> — Test social sharing preview</li>
              <li><strong>Twitter Card Validator</strong> — Preview Twitter Card appearance</li>
              <li><strong>Google Search Console</strong> — Monitor indexing and errors</li>
            </ul>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Quick reference: What goes where
          </h2>
          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Should contain</th>
                  <th>Should NOT contain</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>config/seo.ts</code></td>
                  <td><code>createSEOConfig</code>, <code>SITE_URL</code></td>
                  <td>Page-specific data</td>
                </tr>
                <tr>
                  <td><code>Document.tsx</code></td>
                  <td><code>{"<html>"}</code>, <code>{"<head>"}</code>, <code>{"<SEOHead>"}</code>, <code>{"<JsonLd>"}</code></td>
                  <td>Page-specific content</td>
                </tr>
                <tr>
                  <td><code>pages/*.tsx</code></td>
                  <td><code>mergeSEOConfig</code>, schemas, content in <code>{"<Document>"}</code></td>
                  <td><code>{"<html>"}</code>, <code>{"<head>"}</code>, <code>{"<SEOHead>"}</code></td>
                </tr>
                <tr>
                  <td><code>server.tsx</code></td>
                  <td><code>renderToString</code>, route matching</td>
                  <td>SEO config, meta tags</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>Need more help?</strong> Check the <a href="/faq-docs">FAQ</a> or
              the <a href="/api">API Reference</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
