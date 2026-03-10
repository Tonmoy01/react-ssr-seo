/**
 * Generic React SSR Example (Express + ReactDOMServer)
 *
 * Shows how to use react-ssr-seo in a plain Node/Express
 * server-rendered React application without any framework.
 */

import { renderToString } from "react-dom/server";
import { ProductPage, Product } from "./pages/ProductPage.js";
import { HomePage } from "./pages/HomePage.js";

/**
 * Example: how you'd use this in an Express route handler.
 *
 * app.get("/products/:slug", (req, res) => {
 *   const product = getProductBySlug(req.params.slug);
 *   const html = renderProductPage(product);
 *   res.status(200).send(`<!DOCTYPE html>${html}`);
 * });
 */
export function renderProductPage(product: Product): string {
  return renderToString(<ProductPage product={product} />);
}

export function renderHomepage(): string {
  return renderToString(<HomePage />);
}
