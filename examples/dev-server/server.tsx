import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { HomePage } from "./pages/HomePage.js";
import { GettingStartedPage } from "./pages/GettingStartedPage.js";
import { ArticlePage } from "./pages/ArticlePage.js";
import { ProductPage } from "./pages/ProductPage.js";
import { FAQPage } from "./pages/FAQPage.js";
import { NoIndexPage } from "./pages/NoIndexPage.js";
import { APIReferencePage } from "./pages/APIReferencePage.js";

const app = express();
const PORT = 3000;

const routes: Record<string, () => React.ReactElement> = {
  "/": HomePage,
  "/getting-started": GettingStartedPage,
  "/article": ArticlePage,
  "/product": ProductPage,
  "/faq": FAQPage,
  "/noindex": NoIndexPage,
  "/api": APIReferencePage,
};

app.get("/{*splat}", (req, res) => {
  const Page = routes[req.path];
  if (!Page) {
    res.status(404).send("Not found");
    return;
  }
  const html = renderToString(<Page />);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>${html}`);
});

app.listen(PORT, () => {
  console.log(`
  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │   react-ssr-seo  Live Demo                      │
  │                                                 │
  │   http://localhost:${PORT}                        │
  │                                                 │
  ├─────────────────────────────────────────────────┤
  │                                                 │
  │   /                     Home (Landing)          │
  │   /getting-started      Installation Guide      │
  │   /article              Article SEO Demo        │
  │   /product              Product SEO Demo        │
  │   /faq                  FAQ Schema Demo         │
  │   /noindex              Robots Directives       │
  │   /api                  API Reference           │
  │                                                 │
  │   Right-click → View Page Source to inspect     │
  │   all SEO tags rendered by the library.         │
  │                                                 │
  └─────────────────────────────────────────────────┘
  `);
});
