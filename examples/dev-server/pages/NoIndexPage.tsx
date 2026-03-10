import React from "react";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  noIndex,
  noIndexNoFollow,
} from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Layout } from "../components/Layout.js";

export function NoIndexPage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Internal Page",
    description: "This page should not be indexed by search engines.",
    canonical: buildCanonicalUrl(SITE_URL, "/noindex"),
    robots: noIndex(),
  });

  return (
    <Layout pageConfig={pageConfig} activeRoute="/noindex">
      <div className="page-header">
        <h1>No-Index Page Demo</h1>
        <p>
          Robots directives for controlling search engine indexing behavior.
        </p>
        <div className="page-tags" style={{ marginTop: "0.75rem" }}>
          <span className="tag">Robots Meta</span>
          <span className="tag">noindex</span>
          <span className="tag">nofollow</span>
        </div>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>
        {/* Explanation */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            What is noindex?
          </h2>
          <p className="section-subtitle">
            The robots meta tag tells search engines whether to index a page and
            follow its links.
          </p>

          <div className="card card-elevated">
            <p>
              This page has{" "}
              <code>noindex, follow</code> set in its robots meta tag. This means:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem", color: "#64748b" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong style={{ color: "#0f172a" }}>noindex</strong> — Search engines
                will NOT include this page in search results
              </li>
              <li>
                <strong style={{ color: "#0f172a" }}>follow</strong> — Search engines
                WILL follow links on this page to discover other content
              </li>
            </ul>
          </div>

          <div className="callout callout-warning" style={{ marginTop: "1rem" }}>
            <div className="callout-icon">!</div>
            <div className="callout-content">
              <p>
                Common use cases for <strong>noindex</strong>: login pages, admin
                dashboards, internal tools, draft content, thank-you pages, paginated
                archives, and search result pages.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Tag */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            SEO Tag Generated
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Generated robots meta tag</span>
              <span className="code-header-lang">HTML</span>
            </div>
            <pre>{`<!-- noIndex() helper adds this meta tag -->
<meta name="robots" content="noindex, follow" />`}</pre>
          </div>
        </div>

        {/* Source Code */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Source Code
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">NoIndexPage.tsx</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  noIndex,
  SEOHead,
} from "react-ssr-seo";
import { siteConfig } from "../config/seo";

const pageConfig = mergeSEOConfig(siteConfig, {
  title: "Internal Page",
  description: "This page should not be indexed.",
  robots: noIndex(),  // { index: false, follow: true }
});

<head>
  <SEOHead {...pageConfig} />
</head>`}</pre>
          </div>
        </div>

        {/* All Robots Options */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            All Robots Options
          </h2>
          <p className="section-subtitle">
            react-ssr-seo provides helper functions and fine-grained control over robots directives.
          </p>

          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Helper / Option</th>
                  <th>Output</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>noIndex()</code></td>
                  <td><code>noindex, follow</code></td>
                  <td>Hide from search, follow links</td>
                </tr>
                <tr>
                  <td><code>noIndexNoFollow()</code></td>
                  <td><code>noindex, nofollow</code></td>
                  <td>Hide completely from search</td>
                </tr>
                <tr>
                  <td><code>{`{ noarchive: true }`}</code></td>
                  <td><code>noarchive</code></td>
                  <td>Prevent cached versions</td>
                </tr>
                <tr>
                  <td><code>{`{ nosnippet: true }`}</code></td>
                  <td><code>nosnippet</code></td>
                  <td>No text snippet in results</td>
                </tr>
                <tr>
                  <td><code>{`{ noimageindex: true }`}</code></td>
                  <td><code>noimageindex</code></td>
                  <td>Don't index images</td>
                </tr>
                <tr>
                  <td><code>{`{ maxSnippet: 150 }`}</code></td>
                  <td><code>max-snippet:150</code></td>
                  <td>Limit snippet length</td>
                </tr>
                <tr>
                  <td><code>{`{ maxImagePreview: "large" }`}</code></td>
                  <td><code>max-image-preview:large</code></td>
                  <td>Control image preview size</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Advanced Example */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Advanced: Custom Robots Config
          </h2>

          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">Fine-grained robots control</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import { mergeSEOConfig, noIndexNoFollow } from "react-ssr-seo";

// Option 1: Use the noIndexNoFollow helper
const loginPage = mergeSEOConfig(siteConfig, {
  title: "Login",
  robots: noIndexNoFollow(),
});
// Renders: <meta name="robots" content="noindex, nofollow" />

// Option 2: Fine-grained control
const archivePage = mergeSEOConfig(siteConfig, {
  title: "Archive",
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    maxSnippet: 200,
    maxImagePreview: "standard",
  },
});
// Renders: <meta name="robots" content="index, follow, noarchive,
//           max-snippet:200, max-image-preview:standard" />`}</pre>
          </div>
        </div>

        <div className="callout callout-source">
          <div className="callout-icon">VIEW</div>
          <div className="callout-content">
            <p>
              <strong>Right-click → View Page Source</strong> to see the{" "}
              <code>{`<meta name="robots" content="noindex, follow">`}</code>{" "}
              tag in the actual HTML of this page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
