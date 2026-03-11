import type { createSEOConfig } from "../../../src/index.js";

/**
 * Route module interface — follows React Router 7 conventions.
 *
 * Each route exports:
 *  - meta()     → SEO config for this page
 *  - handle     → additional route data (schemas, activeRoute)
 *  - Component  → the page content (no Document wrapping)
 */
export interface RouteModule {
  meta: () => ReturnType<typeof createSEOConfig>;
  handle?: {
    schemas?: Record<string, unknown>[];
    activeRoute?: string;
  };
  default?: () => React.ReactElement;
  Component?: () => React.ReactElement;
}
