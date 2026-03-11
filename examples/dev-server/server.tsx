import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Document } from './components/Document.tsx';
import type { RouteModule } from './routes/types.ts';

// ── Route modules (React Router 7 convention) ──────────────
// Each route exports: meta(), handle, default Component
import * as indexRoute from './routes/_index.tsx';
import * as gettingStartedRoute from './routes/getting-started.tsx';
import * as reactGuideRoute from './routes/react-guide.tsx';
import * as nextjsGuideRoute from './routes/nextjs-guide.tsx';
import * as multiPageRoute from './routes/multi-page.tsx';
import * as recipesRoute from './routes/recipes.tsx';
import * as commonMistakesRoute from './routes/common-mistakes.tsx';
import * as faqDocsRoute from './routes/faq-docs.tsx';
import * as articleRoute from './routes/article.tsx';
import * as productRoute from './routes/product.tsx';
import * as faqRoute from './routes/faq.tsx';
import * as noindexRoute from './routes/noindex.tsx';
import * as apiRoute from './routes/api.tsx';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ── Route table ─────────────────────────────────────────────
// Maps URL paths to route modules — like React Router 7's
// route config but for a plain Express server.
const routes: Record<string, RouteModule> = {
  '/': indexRoute as unknown as RouteModule,
  '/getting-started': gettingStartedRoute as unknown as RouteModule,
  '/react-guide': reactGuideRoute as unknown as RouteModule,
  '/nextjs-guide': nextjsGuideRoute as unknown as RouteModule,
  '/multi-page': multiPageRoute as unknown as RouteModule,
  '/recipes': recipesRoute as unknown as RouteModule,
  '/common-mistakes': commonMistakesRoute as unknown as RouteModule,
  '/faq-docs': faqDocsRoute as unknown as RouteModule,
  '/article': articleRoute as unknown as RouteModule,
  '/product': productRoute as unknown as RouteModule,
  '/faq': faqRoute as unknown as RouteModule,
  '/noindex': noindexRoute as unknown as RouteModule,
  '/api': apiRoute as unknown as RouteModule,
};

// ── Request handler ─────────────────────────────────────────
// The root Document is applied HERE at the routing level,
// NOT inside each page component. This follows the same pattern
// as React Router 7's root.tsx with <Outlet />.
app.get('/{*splat}', (req, res) => {
  const route = routes[req.path];
  if (!route) {
    res.status(404).send('Not found');
    return;
  }

  // Extract route data (like RR7's loader + meta + handle)
  const pageConfig = route.meta();
  const schemas = route.handle?.schemas;
  const activeRoute = route.handle?.activeRoute;
  const Page = route.default ?? route.Component;

  // Root Document wraps every page — same as root.tsx in RR7
  const html = renderToString(
    <Document pageConfig={pageConfig} schemas={schemas} activeRoute={activeRoute}>
      <Page />
    </Document>
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT, () => {
  console.log(`
  ┌──────────────────────────────────────────────────────┐
  │                                                      │
  │   react-ssr-seo-toolkit  Live Demo                   │
  │                                                      │
  │   http://localhost:${PORT}                             │
  │                                                      │
  ├──────────────────────────────────────────────────────┤
  │                                                      │
  │   Documentation:                                     │
  │   /                     Home (Landing)               │
  │   /getting-started      Installation Guide           │
  │   /react-guide          React + Express SSR Guide    │
  │   /nextjs-guide         Next.js Integration Guide    │
  │   /multi-page           Multi-Page App Usage         │
  │   /recipes              Copy-Paste Recipes           │
  │   /common-mistakes      Common Mistakes & Gotchas    │
  │   /faq-docs             Frequently Asked Questions   │
  │   /api                  API Reference                │
  │                                                      │
  │   Live Demos:                                        │
  │   /article              Article SEO Demo             │
  │   /product              Product SEO Demo             │
  │   /faq                  FAQ Schema Demo              │
  │   /noindex              Robots Directives            │
  │                                                      │
  └──────────────────────────────────────────────────────┘
  `);
});
