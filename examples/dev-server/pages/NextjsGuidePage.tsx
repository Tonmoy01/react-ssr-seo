import React from "react";
import { mergeSEOConfig, buildCanonicalUrl } from "../../../src/index.js";
import { siteConfig, SITE_URL } from "../config/seo.js";
import { Document } from "../components/Document.js";

export function NextjsGuidePage() {
  const pageConfig = mergeSEOConfig(siteConfig, {
    title: "Next.js Guide",
    description:
      "Learn how to use react-ssr-seo-toolkit with Next.js App Router and Pages Router, including generateMetadata, JSON-LD, and dynamic routes.",
    canonical: buildCanonicalUrl(SITE_URL, "/nextjs-guide"),
  });

  return (
    <Document pageConfig={pageConfig} activeRoute="/nextjs-guide">
      <div className="page-header">
        <h1>Next.js Integration Guide</h1>
        <p>
          How to use react-ssr-seo-toolkit with Next.js App Router and Pages Router.
          Covers metadata, JSON-LD, dynamic routes, and multi-page setup.
        </p>
      </div>

      <div className="narrow-container" style={{ paddingBottom: "4rem" }}>

        {/* Overview */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">1</span>
            How Next.js SEO differs
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            Next.js has its own metadata system. Instead of rendering <code>{"<SEOHead>"}</code>
            in a layout, you use Next.js's <code>generateMetadata</code> function combined with
            the toolkit's builder functions. Here's what to use where:
          </p>
          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>What</th>
                  <th>Where</th>
                  <th>How</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Title, description, OG, Twitter</td>
                  <td><code>generateMetadata()</code> in each page</td>
                  <td>Use <code>mergeSEOConfig</code>, <code>buildTitle</code>, <code>buildCanonicalUrl</code></td>
                </tr>
                <tr>
                  <td>JSON-LD structured data</td>
                  <td>Page component body</td>
                  <td>Use schema generators + <code>safeJsonLdSerialize</code></td>
                </tr>
                <tr>
                  <td>Robots directives</td>
                  <td><code>generateMetadata()</code></td>
                  <td>Use <code>noIndex()</code>, <code>buildRobotsDirectives()</code></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="callout callout-warning">
            <div className="callout-icon">!</div>
            <div className="callout-content">
              <p>
                <strong>Do not</strong> use <code>{"<SEOHead>"}</code> in Next.js App Router pages.
                Next.js manages <code>{"<head>"}</code> through <code>generateMetadata</code>.
                Use the toolkit's <em>builder functions</em> to generate the metadata values,
                then return them in Next.js's format.
              </p>
            </div>
          </div>
        </div>

        {/* App Router Section */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Next.js App Router
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            The App Router (Next.js 13+) is the recommended approach.
          </p>
        </div>

        {/* File Structure */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">2</span>
            Project structure (App Router)
          </h2>
          <div className="folder-structure">
            <span className="folder">my-nextjs-app/</span><br />
            {"├── "}<span className="folder">app/</span><br />
            {"│   ├── "}<span className="file">layout.tsx</span>{"           "}<span className="comment">{"  # Root layout (Next.js handles <html>)"}</span><br />
            {"│   ├── "}<span className="file">page.tsx</span>{"             "}<span className="comment">{"  # Home page"}</span><br />
            {"│   ├── "}<span className="folder">about/</span><br />
            {"│   │   └── "}<span className="file">page.tsx</span>{"         "}<span className="comment">{"  # About page"}</span><br />
            {"│   ├── "}<span className="folder">blog/</span><br />
            {"│   │   ├── "}<span className="file">page.tsx</span>{"         "}<span className="comment">{"  # Blog listing page"}</span><br />
            {"│   │   └── "}<span className="folder">[slug]/</span><br />
            {"│   │       └── "}<span className="file">page.tsx</span>{"     "}<span className="comment">{"  # Individual blog post"}</span><br />
            {"│   ├── "}<span className="folder">products/</span><br />
            {"│   │   ├── "}<span className="file">page.tsx</span>{"         "}<span className="comment">{"  # Product listing"}</span><br />
            {"│   │   └── "}<span className="folder">[id]/</span><br />
            {"│   │       └── "}<span className="file">page.tsx</span>{"     "}<span className="comment">{"  # Product detail"}</span><br />
            {"│   └── "}<span className="folder">dashboard/</span><br />
            {"│       └── "}<span className="file">page.tsx</span>{"         "}<span className="comment">{"  # Dashboard (noindex)"}</span><br />
            {"├── "}<span className="folder">lib/</span><br />
            {"│   └── "}<span className="file">seo.ts</span>{"              "}<span className="comment">{"  # Shared SEO config"}</span><br />
            {"├── "}<span className="file">next.config.js</span><br />
            {"└── "}<span className="file">package.json</span>
          </div>
        </div>

        {/* Shared Config */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">3</span>
            Shared SEO config
          </h2>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">lib/seo.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import { createSEOConfig } from "react-ssr-seo-toolkit";

export const siteConfig = createSEOConfig({
  titleTemplate: "%s | My Blog",
  description: "A blog about web development and React.",
  openGraph: {
    siteName: "My Blog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@myblog",
  },
});

export const SITE_URL = "https://myblog.com";`}</pre>
          </div>
        </div>

        {/* Root Layout */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">4</span>
            Root layout
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            In Next.js App Router, the root layout provides the HTML shell.
            <strong> You do not need {"<SEOHead>"} here</strong> because Next.js
            injects metadata from <code>generateMetadata</code> automatically.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">app/layout.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`// Next.js root layout — handles <html> and <body>
// Metadata is injected automatically by Next.js
// from each page's generateMetadata() function

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>{/* Shared navigation */}</nav>
        <main>{children}</main>
        <footer>{/* Shared footer */}</footer>
      </body>
    </html>
  );
}`}</pre>
          </div>
          <div className="callout callout-info">
            <div className="callout-icon">i</div>
            <div className="callout-content">
              <p>
                Notice there is no <code>{"<head>"}</code> tag in the layout. Next.js
                manages the <code>{"<head>"}</code> automatically based on each page's{" "}
                <code>generateMetadata</code> export.
              </p>
            </div>
          </div>
        </div>

        {/* Static Page */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">5</span>
            Static page with metadata
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            For static pages, use <code>mergeSEOConfig</code> to build your metadata,
            then map the values to Next.js's <code>Metadata</code> format.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">app/about/page.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildTitle,
  buildCanonicalUrl,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

// Build SEO config using the toolkit
const seo = mergeSEOConfig(siteConfig, {
  title: "About Us",
  description: "Learn about our team and mission.",
  canonical: buildCanonicalUrl(SITE_URL, "/about"),
});

// Export Next.js metadata
export const metadata: Metadata = {
  title: buildTitle(seo.title!, seo.titleTemplate),
  description: seo.description,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    siteName: seo.openGraph?.siteName,
    type: "website",
    locale: seo.openGraph?.locale,
  },
  twitter: {
    card: "summary_large_image",
    site: seo.twitter?.site,
  },
};

// Page component — just content, no <html> or <head>
export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Our team and mission...</p>
    </div>
  );
}`}</pre>
          </div>
        </div>

        {/* Dynamic Page */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">6</span>
            Dynamic page with generateMetadata
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            For dynamic routes, use <code>generateMetadata</code> as an async function
            to fetch data and build SEO config. Add JSON-LD in the page component body.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">app/blog/[slug]/page.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildTitle,
  buildCanonicalUrl,
  createArticleSchema,
  createBreadcrumbSchema,
  safeJsonLdSerialize,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

async function getPost(slug: string) {
  // Replace with your data fetching logic
  return {
    title: "My Blog Post",
    excerpt: "A short summary of the post.",
    content: "Full post content...",
    author: "Jane Doe",
    date: "2025-06-15",
    image: \`\${SITE_URL}/images/\${slug}.jpg\`,
    slug,
  };
}

// Dynamic metadata — runs on the server
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const url = buildCanonicalUrl(SITE_URL, \`/blog/\${slug}\`);

  const seo = mergeSEOConfig(siteConfig, {
    title: post.title,
    description: post.excerpt,
    canonical: url,
  });

  return {
    title: buildTitle(seo.title!, seo.titleTemplate),
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Page component — content + JSON-LD
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const url = buildCanonicalUrl(SITE_URL, \`/blog/\${slug}\`);

  const articleSchema = createArticleSchema({
    headline: post.title,
    url,
    datePublished: post.date,
    author: [{ name: post.author }],
    publisher: { name: "My Blog", logo: \`\${SITE_URL}/logo.png\` },
    images: [post.image],
  });

  const breadcrumb = createBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: buildCanonicalUrl(SITE_URL, "/blog") },
    { name: post.title, url },
  ]);

  return (
    <article>
      {/* JSON-LD rendered as script tags in the page body */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdSerialize(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLdSerialize(breadcrumb),
        }}
      />
      <h1>{post.title}</h1>
      <p>By {post.author} on {post.date}</p>
      <div>{post.content}</div>
    </article>
  );
}`}</pre>
          </div>
          <div className="callout callout-tip">
            <div className="callout-icon">TIP</div>
            <div className="callout-content">
              <p>
                In Next.js App Router, JSON-LD <code>{"<script>"}</code> tags can go
                anywhere in the page body — they don't need to be in <code>{"<head>"}</code>.
                Google reads them from anywhere in the document.
              </p>
            </div>
          </div>
        </div>

        {/* Noindex Dashboard */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">7</span>
            Dashboard page (noindex)
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            For pages that should not appear in search results (dashboards, admin panels),
            use the robots metadata field.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">app/dashboard/page.tsx</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,  // Tells search engines not to index this page
    follow: true,
  },
};

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Your private dashboard content.</p>
    </div>
  );
}`}</pre>
          </div>
        </div>

        {/* Reusable Helper */}
        <div className="demo-section">
          <h2 className="demo-section-title">
            <span className="step">8</span>
            Reusable metadata helper
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            To reduce repetition across pages, create a helper that converts
            the toolkit's <code>SEOConfig</code> into Next.js <code>Metadata</code>.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">lib/metadata.ts</span>
              <span className="code-header-lang">TypeScript</span>
            </div>
            <pre>{`import {
  mergeSEOConfig,
  buildTitle,
  buildCanonicalUrl,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "./seo";
import type { Metadata } from "next";
import type { SEOConfig } from "react-ssr-seo-toolkit";

/**
 * Converts toolkit SEOConfig into Next.js Metadata.
 * Use this in generateMetadata() or as a static export.
 */
export function buildMetadata(
  pageConfig: Partial<SEOConfig>,
  path?: string
): Metadata {
  const seo = mergeSEOConfig(siteConfig, {
    ...pageConfig,
    canonical: path
      ? buildCanonicalUrl(SITE_URL, path)
      : pageConfig.canonical,
  });

  return {
    title: buildTitle(seo.title ?? "", seo.titleTemplate),
    description: seo.description,
    alternates: seo.canonical
      ? { canonical: seo.canonical }
      : undefined,
    openGraph: {
      title: seo.openGraph?.title ?? seo.title,
      description: seo.openGraph?.description ?? seo.description,
      url: seo.canonical,
      siteName: seo.openGraph?.siteName,
      type: (seo.openGraph?.type as "website") ?? "website",
      locale: seo.openGraph?.locale,
    },
    twitter: {
      card: (seo.twitter?.card as "summary_large_image") ?? "summary_large_image",
      site: seo.twitter?.site,
      creator: seo.twitter?.creator,
    },
  };
}`}</pre>
          </div>
          <p style={{ color: "#64748b", marginTop: "1rem" }}>
            Now any page can generate metadata in one line:
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">app/about/page.tsx (simplified)</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import { buildMetadata } from "@/lib/metadata";

// One line generates all metadata!
export const metadata = buildMetadata({
  title: "About Us",
  description: "Learn about our team.",
}, "/about");

export default function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Our team and mission...</p>
    </div>
  );
}`}</pre>
          </div>
        </div>

        {/* Pages Router */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem", marginBottom: "1rem" }}>
            Next.js Pages Router
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1rem" }}>
            If you are using the Pages Router, you can use <code>{"<SEOHead>"}</code> via
            Next.js's <code>{"<Head>"}</code> component.
          </p>
          <div className="code-block">
            <div className="code-header">
              <span className="code-header-title">pages/about.tsx (Pages Router)</span>
              <span className="code-header-lang">TSX</span>
            </div>
            <pre>{`import Head from "next/head";
import {
  mergeSEOConfig,
  buildCanonicalUrl,
  SEOHead,
} from "react-ssr-seo-toolkit";
import { siteConfig, SITE_URL } from "../lib/seo";

export default function AboutPage() {
  const seo = mergeSEOConfig(siteConfig, {
    title: "About Us",
    description: "Learn about our team.",
    canonical: buildCanonicalUrl(SITE_URL, "/about"),
  });

  return (
    <>
      <Head>
        <SEOHead {...seo} />
      </Head>
      <div>
        <h1>About Us</h1>
        <p>Our team and mission...</p>
      </div>
    </>
  );
}`}</pre>
          </div>
        </div>

        {/* Summary */}
        <div className="demo-section">
          <h2 className="section-title" style={{ fontSize: "1.35rem" }}>
            Summary
          </h2>
          <div className="card card-elevated" style={{ overflowX: "auto" }}>
            <table className="api-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>App Router</th>
                  <th>Pages Router</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Meta tags</td>
                  <td><code>generateMetadata()</code> + builder functions</td>
                  <td><code>{"<Head><SEOHead /></Head>"}</code></td>
                </tr>
                <tr>
                  <td>JSON-LD</td>
                  <td><code>{"<script>"}</code> in page body + <code>safeJsonLdSerialize</code></td>
                  <td><code>{"<Head><JsonLd /></Head>"}</code> or in body</td>
                </tr>
                <tr>
                  <td>Document</td>
                  <td><code>app/layout.tsx</code> (no {"<SEOHead>"})</td>
                  <td><code>_app.tsx</code> / <code>_document.tsx</code></td>
                </tr>
                <tr>
                  <td>Dynamic data</td>
                  <td>Async <code>generateMetadata</code></td>
                  <td><code>getServerSideProps</code> / <code>getStaticProps</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Next Steps */}
        <div className="demo-section">
          <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            <a href="/multi-page" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Multi-Page Usage</h3>
              <p>See a full multi-page app pattern with multiple page types.</p>
            </a>
            <a href="/recipes" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>Recipes</h3>
              <p>Copy-paste examples for blogs, products, FAQs, and more.</p>
            </a>
            <a href="/api" className="feature-card" style={{ textDecoration: "none" }}>
              <h3>API Reference</h3>
              <p>Complete documentation of every function and type.</p>
            </a>
          </div>
        </div>

      </div>
    </Document>
  );
}
